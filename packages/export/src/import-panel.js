import GlobalConfig from '../../conf'
import { UtilTools } from '../../tools'

export default {
  name: 'VxeImportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
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
      if (storeData.type) {
        return GlobalConfig.i18n(`vxe.types.${storeData.type}`)
      }
      return ''
    }
  },
  render (h) {
    const { hasFile, parseTypeLabel, defaultOptions, storeData, selectName } = this
    return h('vxe-modal', {
      res: 'modal',
      model: {
        value: storeData.visible,
        callback (value) {
          storeData.visible = value
        }
      },
      props: {
        title: GlobalConfig.i18n('vxe.toolbar.impTitle'),
        width: 440,
        mask: true,
        lockView: true,
        showFooter: false,
        maskClosable: true
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
          h('tr', [
            h('td', GlobalConfig.i18n('vxe.toolbar.impFile')),
            h('td', [
              hasFile ? h('div', {
                class: 'vxe-import-selected--file',
                attrs: {
                  title: selectName
                }
              }, [
                h('span', selectName),
                h('i', {
                  class: GlobalConfig.icon.importRemove,
                  on: {
                    click: this.clearFileEvent
                  }
                })
              ]) : h('span', {
                class: 'vxe-import-select--file',
                on: {
                  click: this.selectFileEvent
                }
              }, GlobalConfig.i18n('vxe.toolbar.impSelect'))
            ])
          ]),
          h('tr', [
            h('td', GlobalConfig.i18n('vxe.toolbar.impType')),
            h('td', parseTypeLabel)
          ]),
          h('tr', [
            h('td', GlobalConfig.i18n('vxe.toolbar.impOpts')),
            h('td', [
              h('vxe-radio', {
                props: {
                  name: 'mode',
                  label: 'covering'
                },
                model: {
                  value: defaultOptions.mode,
                  callback (value) {
                    defaultOptions.mode = value
                  }
                }
              }, GlobalConfig.i18n('vxe.toolbar.impModeCovering')),
              h('vxe-radio', {
                props: {
                  name: 'mode',
                  label: 'append'
                },
                model: {
                  value: defaultOptions.mode,
                  callback (value) {
                    defaultOptions.mode = value
                  }
                }
              }, GlobalConfig.i18n('vxe.toolbar.impModeAppend'))
            ])
          ])
        ]),
        h('div', {
          class: 'vxe-export--panel-btns'
        }, [
          h('vxe-button', {
            props: {
              type: 'primary',
              disabled: !hasFile
            },
            on: {
              click: this.importEvent
            }
          }, GlobalConfig.i18n('vxe.toolbar.impConfirm'))
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
      const { $grid, $table } = this.$parent
      const comp = $grid || $table
      if (comp) {
        comp.readFile().then(evnt => {
          const file = evnt.target.files[0]
          Object.assign(this.storeData, UtilTools.parseFile(file), { file })
        })
      }
    },
    importEvent () {
      const { storeData, defaultOptions } = this
      const opts = Object.assign({}, defaultOptions)
      storeData.visible = false
      this.$emit('import', opts)
    }
  }
}
