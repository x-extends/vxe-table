import { CreateElement } from 'vue'
import { VxeUI } from '../../../ui'
import XEUtils from 'xe-utils'
import { parseFile } from '../../../ui/src/utils'
// import { errLog } from '../../../ui/src/log'

const { getI18n, getIcon } = VxeUI

export default {
  name: 'VxeTableImportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  components: {
    // VxeModal,
    // VxeRadio
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    selectName () {
      return `${this.storeData.filename}.${this.storeData.type}`
    },
    hasFile () {
      return this.storeData.file && this.storeData.type
    },
    parseTypeLabel () {
      const { storeData } = this
      const { type, typeList } = storeData
      if (type) {
        const selectItem = XEUtils.find(typeList, item => type === item.value)
        return selectItem ? selectItem.label : '*.*'
      }
      return `*.${typeList.map((item: any) => item.value).join(', *.')}`
    }
  } as any,
  render (this: any, h: CreateElement) {
    const { hasFile, parseTypeLabel, defaultOptions, storeData, selectName } = this
    return h('vxe-modal', {
      ref: 'modal',
      props: {
        value: storeData.visible,
        title: getI18n('vxe.import.impTitle'),
        width: 520,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: this.loading
      },
      on: {
        input (value: any) {
          storeData.visible = value
        },
        show: this.showEvent
      }
    }, [
      h('div', {
        class: 'vxe-export--panel'
      }, [
        h('table', {
          attrs: {
            cellspacing: 0,
            cellpadding: 0,
            border: 0
          }
        }, [
          h('tbody', [
            h('tr', [
              h('td', getI18n('vxe.import.impFile')),
              h('td', [
                hasFile
                  ? h('div', {
                    class: 'vxe-import-selected--file',
                    attrs: {
                      title: selectName
                    }
                  }, [
                    h('span', selectName),
                    h('i', {
                      class: getIcon().INPUT_CLEAR,
                      on: {
                        click: this.clearFileEvent
                      }
                    })
                  ])
                  : h('button', {
                    ref: 'fileBtn',
                    class: 'vxe-import-select--file',
                    attrs: {
                      type: 'button'
                    },
                    on: {
                      click: this.selectFileEvent
                    }
                  }, getI18n('vxe.import.impSelect'))
              ])
            ]),
            h('tr', [
              h('td', getI18n('vxe.import.impType')),
              h('td', parseTypeLabel)
            ]),
            h('tr', [
              h('td', getI18n('vxe.import.impMode')),
              h('td', [
                h('vxe-select', {
                  props: {
                    value: defaultOptions.mode,
                    options: storeData.modeList
                  },
                  on: {
                    input (value: any) {
                      defaultOptions.mode = value
                    }
                  }
                })
              ])
            ])
          ])
        ]),
        h('div', {
          class: 'vxe-export--panel-btns'
        }, [
          h('vxe-button', {
            on: {
              click: this.cancelEvent
            }
          }, getI18n('vxe.import.impCancel')),
          h('vxe-button', {
            props: {
              status: 'primary',
              disabled: !hasFile
            },
            on: {
              click: this.importEvent
            }
          }, getI18n('vxe.import.impConfirm'))
        ])
      ])
    ])
  },
  methods: {
    clearFileEvent () {
      Object.assign(this.storeData, {
        filename: '',
        sheetName: '',
        type: ''
      })
    },
    selectFileEvent () {
      const $xetable = this.$parent
      $xetable.readFile(this.defaultOptions).then((params: any) => {
        const { file } = params
        Object.assign(this.storeData, parseFile(file), { file })
      }).catch((e: any) => e)
    },
    showEvent () {
      this.$nextTick(() => {
        const { $refs } = this
        const targetElem = $refs.fileBtn
        if (targetElem) {
          targetElem.focus()
        }
      })
    },
    cancelEvent () {
      this.storeData.visible = false
    },
    importEvent () {
      const $xetable = this.$parent
      this.loading = true
      $xetable.importByFile(this.storeData.file, Object.assign({}, $xetable.importOpts, this.defaultOptions)).then(() => {
        this.loading = false
        this.storeData.visible = false
      }).catch(() => {
        this.loading = false
      })
    }
  } as any
}
