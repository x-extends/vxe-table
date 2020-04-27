import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import VxeModal from '../../modal/src/modal'
import VxeInput from '../../input/src/input'
import VxeCheckbox from '../../checkbox/src/checkbox'
import { UtilTools } from '../../tools'

export default {
  name: 'VxeCustomPanel',
  props: {
    storeData: Object,
    collectColumn: Array
  },
  components: {
    VxeModal,
    VxeInput,
    VxeCheckbox
  },
  inject: {
    $xetable: {
      default: null
    },
    $xegrid: {
      default: null
    }
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
    const { $xetable, isAll, isIndeterminate, storeData, collectColumn } = this
    const checkMethod = $xetable ? $xetable.customOpts.checkMethod : null
    const cols = []
    XEUtils.eachTree(collectColumn, column => {
      const colTitle = UtilTools.formatText(column.getTitle(), 1)
      const isColGroup = column.children && column.children.length
      const isDisabled = checkMethod ? !checkMethod({ column }) : false
      cols.push(
        h('li', {
          class: ['vxe-custom--panel-column-option', `level--${column.level}`, {
            'is--group': isColGroup,
            'is--checked': column.visible,
            'is--indeterminate': column.halfVisible,
            'is--disabled': isDisabled
          }],
          attrs: {
            title: colTitle
          },
          on: {
            click: () => {
              if (!isDisabled) {
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
        title: GlobalConfig.i18n('vxe.table.customTitle'),
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: this.loading
      },
      on: {
        activated: this.showEvent,
        deactivated: this.hideEvent
      }
    }, [
      h('div', {
        class: 'vxe-custom--panel'
      }, [
        h('div', {
          class: 'vxe-custom--panel-column'
        }, [
          h('ul', {
            class: 'vxe-custom--panel-column-header'
          }, [
            h('li', {
              class: ['vxe-custom--panel-column-option', {
                'is--checked': isAll,
                'is--indeterminate': isIndeterminate
              }],
              attrs: {
                title: GlobalConfig.i18n('vxe.table.customAll')
              },
              on: {
                click: this.allColumnEvent
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
              }, GlobalConfig.i18n('vxe.table.customAll'))
            ])
          ]),
          h('ul', {
            class: 'vxe-custom--panel-column-body'
          }, cols)
        ]),
        h('div', {
          class: 'vxe-custom--panel-btns'
        }, [
          h('vxe-button', {
            on: {
              click: this.resetCustomEvent
            }
          }, GlobalConfig.i18n('vxe.table.customRestore')),
          h('vxe-button', {
            props: {
              status: 'primary'
            },
            on: {
              click: this.customConfirmEvent
            }
          }, GlobalConfig.i18n('vxe.table.customConfirm'))
        ])
      ])
    ])
  },
  methods: {
    changeOption (column) {
      const isChecked = !column.visible
      XEUtils.eachTree([column], (item) => {
        item.visible = isChecked
        item.halfVisible = false
      })
      this.handleOptionCheck(column)
      if (this.custom && this.customOpts.immediate) {
        this.handleCustoms()
      }
      this.checkStatus()
    },
    handleOptionCheck (column) {
      const matchObj = XEUtils.findTree(this.collectColumn, item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every(column => column.visible)
          parent.halfVisible = !parent.visible && parent.children.some(column => column.visible || column.halfVisible)
          this.handleOptionCheck(parent)
        }
      }
    },
    checkStatus () {
      const { $xetable, collectColumn } = this
      const checkMethod = $xetable.customOpts.checkMethod
      this.isAll = collectColumn.every(column => (checkMethod ? !checkMethod({ column }) : false) || column.visible)
      this.isIndeterminate = !this.isAll && collectColumn.some(column => (!checkMethod || checkMethod({ column })) && (column.visible || column.halfVisible))
    },
    allColumnEvent () {
      const { $xetable, collectColumn } = this
      const checkMethod = $xetable.customOpts.checkMethod
      const isAll = !this.isAll
      XEUtils.eachTree(collectColumn, column => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = isAll
          column.halfVisible = false
        }
      })
      this.isAll = isAll
      this.checkStatus()
    },
    showEvent () {
      this.checkStatus()
    },
    hideEvent () {
      const { $xetable } = this
      $xetable.saveCustomVisible()
      $xetable.analyColumnWidth()
      $xetable.refreshColumn()
      this.emitCustomEvent('close')
    },
    customConfirmEvent (evnt) {
      const { storeData } = this
      storeData.visible = false
      this.emitCustomEvent('custom', evnt)
    },
    resetCustomEvent (evnt) {
      const { $xetable, collectColumn, storeData } = this
      const checkMethod = $xetable.customOpts.checkMethod
      XEUtils.eachTree(collectColumn, column => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = column.defaultVisible
          column.halfVisible = false
        }
        column.resizeWidth = 0
      })
      storeData.visible = false
      $xetable.saveCustomResizable(true)
      this.emitCustomEvent('reset', evnt)
    },
    emitCustomEvent (type, evnt) {
      const { $xetable, $xegrid } = this
      const comp = $xegrid || $xetable
      comp.$emit('custom', { type, $table: $xetable, $grid: $xegrid, $event: evnt })
    }
  }
}
