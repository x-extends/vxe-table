import GlobalConfig from '../../conf'
import { UtilTools } from '../../tools'

export default {
  name: 'VxeExportPanel',
  props: {
    exportParams: Object,
    exportStore: Object,
    exportOpts: Object
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
    }
  },
  render (h) {
    const { exportParams, exportStore, exportOpts, modeList } = this
    return h('vxe-modal', {
      res: 'modal',
      model: {
        value: exportStore.visible,
        callback (value) {
          exportStore.visible = value
        }
      },
      props: {
        title: GlobalConfig.i18n('vxe.toolbar.expTitle'),
        width: 520,
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
                  value: exportParams.filename
                },
                on: {
                  input (evnt) {
                    exportParams.filename = evnt.target.value
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
                    exportParams.type = evnt.target.value
                  }
                }
              }, exportOpts.types.map(type => {
                return h('option', {
                  attrs: {
                    value: type
                  },
                  domProps: {
                    selected: exportParams.type === type
                  }
                }, type)
              }))
            ])
          ]),
          h('tr', [
            h('td', GlobalConfig.i18n('vxe.toolbar.expMode')),
            h('td', [
              h('select', {
                on: {
                  change (evnt) {
                    exportStore.mode = evnt.target.value
                  }
                }
              }, modeList.map(item => {
                return h('option', {
                  attrs: {
                    value: item.value
                  },
                  domProps: {
                    selected: exportStore.mode === item.value
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
              }, exportStore.columns.map(column => {
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
                  value: exportParams.isHeader,
                  callback (value) {
                    exportParams.isHeader = value
                  }
                }
              }, GlobalConfig.i18n('vxe.toolbar.expOptHeader')),
              h('vxe-checkbox', {
                props: {
                  disabled: !exportStore.hasFooter
                },
                model: {
                  value: exportParams.isFooter,
                  callback (value) {
                    exportParams.isFooter = value
                  }
                }
              }, GlobalConfig.i18n('vxe.toolbar.expOptFooter')),
              h('vxe-checkbox', {
                props: {
                  disabled: exportStore.forceOriginal
                },
                model: {
                  value: exportParams.original,
                  callback (value) {
                    exportParams.original = value
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
      const { exportStore, exportParams } = this
      const options = Object.assign({
        columns: exportStore.columns.filter(column => column.checked)
      }, exportParams)
      if (!options.filename) {
        options.filename = GlobalConfig.i18n('vxe.toolbar.expTitle')
      }
      if (exportStore.mode === 'selected') {
        options.data = exportStore.selectRecords
      }
      exportStore.visible = false
      this.$emit('export', options)
    }
  }
}
