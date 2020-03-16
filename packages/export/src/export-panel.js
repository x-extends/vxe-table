import GlobalConfig from '../../conf'
import VxeModal from '../../modal/src/modal'
import VxeInput from '../../input/src/input'
import VxeCheckbox from '../../checkbox/src/checkbox'
import VxeSelect from '../../select/src/select'
import VxeOption from '../../select/src/option'

export default {
  name: 'VxeExportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  components: {
    VxeModal,
    VxeInput,
    VxeCheckbox,
    VxeSelect,
    VxeOption
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
                  h('vxe-input', {
                    ref: 'filename',
                    model: {
                      value: defaultOptions.filename,
                      callback (value) {
                        defaultOptions.filename = value
                      }
                    },
                    props: {
                      type: 'text',
                      clearable: true,
                      placeholder: GlobalConfig.i18n('vxe.export.expNamePlaceholder')
                    }
                  })
                ])
              ]),
              h('tr', [
                h('td', GlobalConfig.i18n('vxe.export.expType')),
                h('td', [
                  h('vxe-select', {
                    model: {
                      value: defaultOptions.type,
                      callback (value) {
                        defaultOptions.type = value
                      }
                    }
                  }, storeData.typeList.map(item => {
                    return h('vxe-option', {
                      props: {
                        value: item.value,
                        label: GlobalConfig.i18n(item.label)
                      }
                    })
                  }))
                ])
              ]),
              showSheet ? h('tr', [
                h('td', GlobalConfig.i18n('vxe.export.expSheetName')),
                h('td', [
                  h('vxe-input', {
                    model: {
                      value: defaultOptions.sheetName,
                      callback (value) {
                        defaultOptions.sheetName = value
                      }
                    },
                    props: {
                      type: 'text',
                      clearable: true,
                      placeholder: GlobalConfig.i18n('vxe.export.expSheetNamePlaceholder')
                    }
                  })
                ])
              ]) : _e(),
              h('tr', [
                h('td', GlobalConfig.i18n('vxe.export.expMode')),
                h('td', [
                  h('vxe-select', {
                    model: {
                      value: defaultOptions.mode,
                      callback (value) {
                        defaultOptions.mode = value
                      }
                    }
                  }, storeData.modeList.map(item => {
                    return h('vxe-option', {
                      props: {
                        value: item.value,
                        label: GlobalConfig.i18n(item.label)
                      }
                    })
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
                        }, GlobalConfig.i18n('vxe.export.expCurrentColumn'))
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
                        }, headerTitle)
                      ])
                    }))
                  ])
                ])
              ]),
              h('tr', [
                h('td', GlobalConfig.i18n('vxe.export.expOpts')),
                h('td', [
                  h('vxe-checkbox', {
                    model: {
                      value: defaultOptions.isHeader,
                      callback (value) {
                        defaultOptions.isHeader = value
                      }
                    },
                    props: {
                      title: GlobalConfig.i18n('vxe.export.expHeaderTitle')
                    }
                  }, GlobalConfig.i18n('vxe.export.expOptHeader')),
                  h('vxe-checkbox', {
                    model: {
                      value: defaultOptions.isFooter,
                      callback (value) {
                        defaultOptions.isFooter = value
                      }
                    },
                    props: {
                      disabled: !storeData.hasFooter,
                      title: GlobalConfig.i18n('vxe.export.expFooterTitle')
                    }
                  }, GlobalConfig.i18n('vxe.export.expOptFooter')),
                  h('vxe-checkbox', {
                    model: {
                      value: defaultOptions.original,
                      callback (value) {
                        defaultOptions.original = value
                      }
                    },
                    props: {
                      title: GlobalConfig.i18n('vxe.export.expOriginalTitle')
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
          defaultOptions.isPrint ? h('vxe-button', {
            on: {
              click: this.printEvent
            }
          }, GlobalConfig.i18n('vxe.export.expPrint')) : null,
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
