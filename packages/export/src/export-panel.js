import GlobalConfig from '../../conf'

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
      loading: false
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
    const { _e, isAll, isIndeterminate, showSheet, defaultOptions, storeData } = this
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
          h('tbody', [
            [
              h('tr', [
                h('td', GlobalConfig.i18n('vxe.export.expName')),
                h('td', [
                  h('input', {
                    ref: 'filename',
                    attrs: {
                      type: 'text',
                      placeholder: GlobalConfig.i18n('vxe.export.expNamePlaceholder')
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
                h('td', GlobalConfig.i18n('vxe.export.expType')),
                h('td', [
                  h('select', {
                    on: {
                      change (evnt) {
                        defaultOptions.type = evnt.target.value
                      }
                    }
                  }, storeData.typeList.map(item => {
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
                h('td', GlobalConfig.i18n('vxe.export.expSheetName')),
                h('td', [
                  h('input', {
                    attrs: {
                      type: 'text',
                      placeholder: GlobalConfig.i18n('vxe.export.expSheetNamePlaceholder')
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
                h('td', GlobalConfig.i18n('vxe.export.expMode')),
                h('td', [
                  h('select', {
                    on: {
                      change (evnt) {
                        defaultOptions.mode = evnt.target.value
                      }
                    }
                  }, storeData.modeList.map(item => {
                    return h('option', {
                      attrs: {
                        value: item.value
                      },
                      domProps: {
                        selected: defaultOptions.mode === item.value
                      }
                    }, GlobalConfig.i18n(item.label))
                  }))
                ])
              ]),
              h('tr', [
                h('td', [GlobalConfig.i18n('vxe.export.expColumn')]),
                h('td', [
                  h('div', {
                    class: 'vxe-export--panel-column'
                  }, [
                    h('ul', {
                      class: 'vxe-export--panel-column-header'
                    }, [
                      h('li', {
                        class: ['vxe-export--panel-column-option', {
                          'is--checked': isAll,
                          'is--indeterminate': isIndeterminate
                        }],
                        attrs: {
                          title: GlobalConfig.i18n('vxe.table.allTitle')
                        },
                        on: {
                          click: this.allColumnEvent
                        }
                      }, [
                        h('i', {
                          class: 'vxe-checkbox--icon'
                        }),
                        GlobalConfig.i18n('vxe.export.expCurrentColumn')
                      ])
                    ]),
                    h('ul', {
                      class: 'vxe-export--panel-column-body'
                    }, storeData.columns.map(column => {
                      const headerTitle = column.getTitle()
                      return h('li', {
                        class: ['vxe-export--panel-column-option', {
                          'is--checked': column.checked,
                          'is--disabled': column.disabled
                        }],
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
                      }, [
                        h('i', {
                          class: 'vxe-checkbox--icon'
                        }),
                        headerTitle
                      ])
                    }))
                  ])
                ])
              ]),
              h('tr', [
                h('td', GlobalConfig.i18n('vxe.export.expOpts')),
                h('td', [
                  h('vxe-checkbox', {
                    props: {
                      title: GlobalConfig.i18n('vxe.export.expHeaderTitle')
                    },
                    model: {
                      value: defaultOptions.isHeader,
                      callback (value) {
                        defaultOptions.isHeader = value
                      }
                    }
                  }, GlobalConfig.i18n('vxe.export.expOptHeader')),
                  h('vxe-checkbox', {
                    props: {
                      disabled: !storeData.hasFooter,
                      title: GlobalConfig.i18n('vxe.export.expFooterTitle')
                    },
                    model: {
                      value: defaultOptions.isFooter,
                      callback (value) {
                        defaultOptions.isFooter = value
                      }
                    }
                  }, GlobalConfig.i18n('vxe.export.expOptFooter')),
                  h('vxe-checkbox', {
                    props: {
                      title: GlobalConfig.i18n('vxe.export.expOriginalTitle')
                    },
                    model: {
                      value: defaultOptions.original,
                      callback (value) {
                        defaultOptions.original = value
                      }
                    }
                  }, GlobalConfig.i18n('vxe.export.expOptOriginal'))
                ])
              ])
            ]
          ])
        ]),
        h('div', {
          class: 'vxe-export--panel-btns'
        }, [
          h('vxe-button', {
            on: {
              click: this.printEvent
            }
          }, GlobalConfig.i18n('vxe.export.expPrint')),
          h('vxe-button', {
            props: {
              status: 'primary'
            },
            on: {
              click: this.exportEvent
            }
          }, GlobalConfig.i18n('vxe.export.expConfirm'))
        ])
      ])
    ])
  },
  methods: {
    checkStatus () {
      const columns = this.storeData.columns
      this.isAll = columns.every(column => column.disabled || column.checked)
      this.isIndeterminate = !this.isAll && columns.some(column => !column.disabled && column.checked)
    },
    allColumnEvent () {
      const isAll = !this.isAll
      this.storeData.columns.forEach(column => {
        if (!column.disabled) {
          column.checked = isAll
        }
      })
      this.isAll = isAll
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
      return Object.assign({
        columns: storeData.columns.filter(column => column.checked)
      }, defaultOptions)
    },
    printEvent () {
      const $xetable = this.$parent
      this.storeData.visible = false
      $xetable.print(Object.assign({}, $xetable.printOpts, this.getExportOption()))
    },
    exportEvent () {
      const $xetable = this.$parent
      this.loading = true
      $xetable.exportData(Object.assign({}, $xetable.exportOpts, this.getExportOption())).then(() => {
        this.loading = false
        this.storeData.visible = false
      })
    }
  }
}
