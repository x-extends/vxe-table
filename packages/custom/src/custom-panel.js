import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import VxeModal from '../../modal/src/modal'
import VxeInput from '../../input/src/input'
import VxeCheckbox from '../../checkbox/src/checkbox'

export default {
  name: 'VxeCustomPanel',
  props: {
    storeData: Object
  },
  components: {
    VxeModal,
    VxeInput,
    VxeCheckbox
  },
  data () {
    return {
      isAll: false,
      isIndeterminate: false,
      loading: false
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    const { storeData } = this
    const cols = []
    XEUtils.eachTree(storeData.columns, column => {
      const colTitle = column.getTitle()
      const isColGroup = column.children && column.children.length
      cols.push(
        h('li', {
          class: ['vxe-export--panel-column-option', `level--${column.level}`, {
            'is--group': isColGroup,
            'is--checked': column.checked,
            'is--indeterminate': column.halfChecked,
            'is--disabled': column.disabled
          }],
          attrs: {
            title: colTitle
          },
          on: {
            click: () => {
              if (!column.disabled) {
                this.changeOption(column)
              }
            }
          }
        }, [
          h('span', {
            class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
          }),
          h('span', {
            class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
          }),
          h('span', {
            class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
          }),
          h('span', {
            class: 'vxe-checkbox--label'
          }, colTitle)
        ])
      )
    })
    return h('vxe-modal', {
      res: 'modal',
      model: {
        value: storeData.visible,
        callback (value) {
          storeData.visible = value
        }
      },
      props: {
        title: GlobalConfig.i18n('vxe.export.expTitle'),
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: this.loading
      }
    }, [
      h('div', {
        class: 'vxe-custom--panel'
      }, [
        h('ul', {
          class: ''
        }, cols)
      ])
    ])
  },
  methods: {
    changeOption (column) {
      const isChecked = !column.checked
      XEUtils.eachTree([column], (item) => {
        item.checked = isChecked
        item.halfChecked = false
      })
      this.handleOptionCheck(column)
      this.checkStatus()
    },
    handleOptionCheck (column) {
      const matchObj = XEUtils.findTree(this.storeData.columns, item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.checked = parent.children.every(column => column.checked)
          parent.halfChecked = !parent.checked && parent.children.some(column => column.checked || column.halfChecked)
          this.handleOptionCheck(parent)
        }
      }
    },
    checkStatus () {
      const columns = this.storeData.columns
      this.isAll = columns.every(column => column.disabled || column.checked)
      this.isIndeterminate = !this.isAll && columns.some(column => !column.disabled && (column.checked || column.halfChecked))
    },
    allColumnEvent () {
      const isAll = !this.isAll
      XEUtils.eachTree(this.storeData.columns, column => {
        if (!column.disabled) {
          column.checked = isAll
          column.halfChecked = false
        }
      })
      this.isAll = isAll
      this.checkStatus()
    }
  }
}
