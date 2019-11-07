import GlobalConfig from '../../conf'
import { UtilTools } from '../../tools'

export default {
  name: 'VxeExportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object,
    typeList: Array
  },
  data () {
    return {
      modeList: [
        {
          value: 'all',
          label: 'vxe.toolbar.expAll'
        },
        {
          value: 'selected',
          label: 'vxe.toolbar.expSelected'
        }
      ]
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    showSheet () {
      return ['html', 'xml', 'xlsx'].includes(this.defaultOptions.type)
    }
  },
  render (h) {
    const { _e, showSheet, defaultOptions, storeData, typeList, modeList } = this
    return h('vxe-modal', {
      res: 'modal',
      model: {
        value: storeData.visible,
        callback (value) {
          storeData.visible = value
        }
      },
      props: {
        title: GlobalConfig.i18n('vxe.toolbar.expTitle'),
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        maskClosable: true
      },
      on: {
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
          h('tr', [
            h('td', GlobalConfig.i18n('vxe.toolbar.expName')),
            h('td', [
              h('input', {
                ref: 'filename',
                attrs: {
                  type: 'text',
                  placeholder: GlobalConfig.i18n('vxe.toolbar.expNamePlaceholder')
                },
                domProps: {
                  value: defaultOptions.filename
                },
                on: {
                  input (evnt) {
                    defaultOptions.filename = evnt.target.value
                  }
                }
              })
            ])
          ]),
          h('tr', [
            h('td', GlobalConfig.i18n('vxe.toolbar.expType')),
            h('td', [
              h('select', {
                on: {
                  change (evnt) {
                    defaultOptions.type = evnt.target.value
                  }
                }
              }, typeList.map(item => {
                return h('option', {
                  attrs: {
                    value: item.value
                  },
                  domProps: {
                    selected: defaultOptions.type === item.value
                  }
                }, GlobalConfig.i18n(item.label))
              }))
            ])
          ]),
          showSheet ? h('tr', [
            h('td', GlobalConfig.i18n('vxe.toolbar.expSheetName')),
            h('td', [
              h('input', {
                attrs: {
                  type: 'text',
                  placeholder: GlobalConfig.i18n('vxe.toolbar.expSheetNamePlaceholder')
                },
                domProps: {
                  value: defaultOptions.sheetName
                },
                on: {
                  input (evnt) {
                    defaultOptions.sheetName = evnt.target.value
                  }
                }
              })
            ])
          ]) : _e(),
          h('tr', [
            h('td', GlobalConfig.i18n('vxe.toolbar.expMode')),
            h('td', [
              h('select', {
                on: {
                  change (evnt) {
                    storeData.mode = evnt.target.value
                  }
                }
              }, modeList.map(item => {
                return h('option', {
                  attrs: {
                    value: item.value
                  },
                  domProps: {
                    selected: storeData.mode === item.value
                  }
                }, GlobalConfig.i18n(item.label))
              }))
            ])
          ]),
          h('tr', [
            h('td', GlobalConfig.i18n('vxe.toolbar.expColumn')),
            h('td', [
              h('ul', {
                class: 'vxe-export--panel-column'
              }, storeData.columns.map(column => {
                const { own, checked, type } = column
                return h('li', {
                  class: {
                    active: checked
                  },
                  on: {
                    click () {
                      column.checked = !checked
                    }
                  }
                }, UtilTools.getFuncText(own.title || own.label || (type === 'index' ? GlobalConfig.i18n('vxe.column.indexTitle') : '')))
              }))
            ])
          ]),
          h('tr', [
            h('td', GlobalConfig.i18n('vxe.toolbar.expOpts')),
            h('td', [
              h('vxe-checkbox', {
                model: {
                  value: defaultOptions.isHeader,
                  callback (value) {
                    defaultOptions.isHeader = value
                  }
                }
              }, GlobalConfig.i18n('vxe.toolbar.expOptHeader')),
              h('vxe-checkbox', {
                props: {
                  disabled: !storeData.hasFooter
                },
                model: {
                  value: defaultOptions.isFooter,
                  callback (value) {
                    defaultOptions.isFooter = value
                  }
                }
              }, GlobalConfig.i18n('vxe.toolbar.expOptFooter')),
              h('vxe-checkbox', {
                props: {
                  disabled: storeData.forceOriginal
                },
                model: {
                  value: defaultOptions.original,
                  callback (value) {
                    defaultOptions.original = value
                  }
                }
              }, GlobalConfig.i18n('vxe.toolbar.expOptOriginal'))
            ])
          ])
        ]),
        h('div', {
          class: 'vxe-export--panel-btns'
        }, [
          h('vxe-button', {
            props: {
              type: 'primary'
            },
            on: {
              click: this.exportEvent
            }
          }, GlobalConfig.i18n('vxe.toolbar.expConfirm'))
        ])
      ])
    ])
  },
  methods: {
    showEvent () {
      this.$nextTick(() => {
        this.$refs.filename.focus()
      })
    },
    exportEvent () {
      const { storeData, defaultOptions } = this
      const opts = Object.assign({
        columns: storeData.columns.filter(column => column.checked)
      }, defaultOptions)
      if (storeData.mode === 'selected') {
        opts.data = storeData.selectRecords
      }
      storeData.visible = false
      this.$emit('export', opts)
    }
  }
}
