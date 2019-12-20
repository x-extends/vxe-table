import GlobalConfig from '../../conf'
import XEUtils from 'xe-utils/methods/xe-utils'

export default {
  name: 'VxeExportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  data () {
    return {
      isAll: false,
      isIndeterminate: false,
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
      return ['html', 'xml', 'xlsx'].indexOf(this.defaultOptions.type) > -1
    }
  },
  render (h) {
    const { _e, isAll, isIndeterminate, showSheet, defaultOptions, storeData, modeList } = this
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
        escClosable: true,
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
              }, defaultOptions.types.map(item => {
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
            h('td', [GlobalConfig.i18n('vxe.toolbar.expColumn')]),
            h('td', [
              h('div', {
                class: 'vxe-export--panel-column'
              }, [
                h('vxe-checkbox', {
                  props: {
                    indeterminate: isIndeterminate,
                    title: GlobalConfig.i18n('vxe.table.allTitle')
                  },
                  model: {
                    value: isAll,
                    callback: (value) => {
                      this.isAll = value
                    }
                  },
                  on: {
                    change: this.allColumnEvent
                  }
                }, GlobalConfig.i18n('vxe.toolbar.expAllColumn')),
                h('ul', storeData.columns.map(column => {
                  let headerTitle = column.getTitle()
                  return h('li', {
                    class: {
                      'is--active': column.checked,
                      'is--disabled': column.disabled
                    },
                    attrs: {
                      title: headerTitle
                    },
                    on: {
                      click: () => {
                        if (!column.disabled) {
                          column.checked = !column.checked
                          this.checkStatus()
                        }
                      }
                    }
                  }, headerTitle)
                }))
              ])
            ])
          ]),
          h('tr', [
            h('td', GlobalConfig.i18n('vxe.toolbar.expOpts')),
            h('td', [
              h('vxe-checkbox', {
                props: {
                  title: GlobalConfig.i18n('vxe.toolbar.expHeaderTitle')
                },
                model: {
                  value: defaultOptions.isHeader,
                  callback (value) {
                    defaultOptions.isHeader = value
                  }
                }
              }, GlobalConfig.i18n('vxe.toolbar.expOptHeader')),
              h('vxe-checkbox', {
                props: {
                  disabled: !storeData.hasFooter,
                  title: GlobalConfig.i18n('vxe.toolbar.expFooterTitle')
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
                  title: GlobalConfig.i18n('vxe.toolbar.expOriginalTitle')
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
            on: {
              click: this.printEvent
            }
          }, GlobalConfig.i18n('vxe.toolbar.expPrint')),
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
    checkStatus () {
      let columns = this.storeData.columns
      this.isAll = this.storeData.columns.every(column => column.disabled || column.checked)
      this.isIndeterminate = !this.isAll && columns.some(column => !column.disabled && column.checked)
    },
    allColumnEvent () {
      let isAll = this.isAll
      this.storeData.columns.forEach(column => {
        if (!column.disabled) {
          column.checked = isAll
        }
      })
      this.checkStatus()
    },
    showEvent () {
      this.$nextTick(() => {
        this.$refs.filename.focus()
      })
      this.checkStatus()
    },
    getExportOption () {
      const { storeData, defaultOptions } = this
      const { $grid, $table } = this.$parent
      const comp = $grid || $table
      const selectRecords = storeData.selectRecords
      const opts = Object.assign({
        columns: storeData.columns.filter(column => column.checked)
      }, defaultOptions)
      if (storeData.mode === 'selected') {
        if (['html', 'pdf'].indexOf(defaultOptions.type) > -1 && comp.treeConfig) {
          opts.data = XEUtils.searchTree(comp.getTableData().fullData, item => selectRecords.indexOf(item) > -1, comp.getTreeStatus().config)
        } else {
          opts.data = selectRecords
        }
      }
      return opts
    },
    printEvent () {
      this.storeData.visible = false
      this.$emit('print', this.getExportOption())
    },
    exportEvent () {
      this.storeData.visible = false
      this.$emit('export', this.getExportOption())
    }
  }
}
