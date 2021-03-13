import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VxeModal from '../../modal/src/modal'
import VxeInput from '../../input/src/input'
import VxeCheckbox from '../../checkbox/src/checkbox'
import VxeSelect from '../../select/src/select'
import VxeOption from '../../select/src/option'
import { UtilTools } from '../../tools'

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
    checkedAll () {
      return this.storeData.columns.every(column => column.checked)
    },
    showSheet () {
      return ['html', 'xml', 'xlsx', 'pdf'].indexOf(this.defaultOptions.type) > -1
    },
    supportMerge () {
      const { storeData, defaultOptions } = this
      return !defaultOptions.original && defaultOptions.mode === 'current' && (storeData.isPrint || ['html', 'xlsx'].indexOf(defaultOptions.type) > -1)
    },
    supportStyle () {
      const { defaultOptions } = this
      return !defaultOptions.original && ['xlsx'].indexOf(defaultOptions.type) > -1
    }
  },
  render (h) {
    const { _e, checkedAll, isAll, isIndeterminate, showSheet, supportMerge, supportStyle, defaultOptions, storeData } = this
    const { hasTree, hasMerge, isPrint, hasColgroup } = storeData
    const { isHeader } = defaultOptions
    const cols = []
    XEUtils.eachTree(storeData.columns, column => {
      const colTitle = UtilTools.formatText(column.getTitle(), 1)
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
      props: {
        value: storeData.visible,
        title: GlobalConfig.i18n(isPrint ? 'vxe.export.printTitle' : 'vxe.export.expTitle'),
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: this.loading
      },
      on: {
        input (value) {
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
            [
              isPrint ? _e() : h('tr', [
                h('td', GlobalConfig.i18n('vxe.export.expName')),
                h('td', [
                  h('vxe-input', {
                    ref: 'filename',
                    props: {
                      value: defaultOptions.filename,
                      type: 'text',
                      clearable: true,
                      placeholder: GlobalConfig.i18n('vxe.export.expNamePlaceholder')
                    },
                    on: {
                      modelValue (value) {
                        defaultOptions.filename = value
                      }
                    }
                  })
                ])
              ]),
              isPrint ? _e() : h('tr', [
                h('td', GlobalConfig.i18n('vxe.export.expType')),
                h('td', [
                  h('vxe-select', {
                    props: {
                      value: defaultOptions.type
                    },
                    on: {
                      input (value) {
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
              isPrint || showSheet ? h('tr', [
                h('td', GlobalConfig.i18n('vxe.export.expSheetName')),
                h('td', [
                  h('vxe-input', {
                    ref: 'sheetname',
                    props: {
                      value: defaultOptions.sheetName,
                      type: 'text',
                      clearable: true,
                      placeholder: GlobalConfig.i18n('vxe.export.expSheetNamePlaceholder')
                    },
                    on: {
                      modelValue (value) {
                        defaultOptions.sheetName = value
                      }
                    }
                  })
                ])
              ]) : _e(),
              h('tr', [
                h('td', GlobalConfig.i18n('vxe.export.expMode')),
                h('td', [
                  h('vxe-select', {
                    props: {
                      value: defaultOptions.mode
                    },
                    on: {
                      input (value) {
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
                    }, cols)
                  ])
                ])
              ]),
              h('tr', [
                h('td', GlobalConfig.i18n('vxe.export.expOpts')),
                h('td', [
                  h('div', {
                    class: 'vxe-export--panel-option-row'
                  }, [
                    h('vxe-checkbox', {
                      props: {
                        value: isHeader,
                        title: GlobalConfig.i18n('vxe.export.expHeaderTitle'),
                        content: GlobalConfig.i18n('vxe.export.expOptHeader')
                      },
                      on: {
                        input (value) {
                          defaultOptions.isHeader = value
                        }
                      }
                    }),
                    h('vxe-checkbox', {
                      props: {
                        value: defaultOptions.isFooter,
                        disabled: !storeData.hasFooter,
                        title: GlobalConfig.i18n('vxe.export.expFooterTitle'),
                        content: GlobalConfig.i18n('vxe.export.expOptFooter')
                      },
                      on: {
                        input (value) {
                          defaultOptions.isFooter = value
                        }
                      }
                    }),
                    h('vxe-checkbox', {
                      props: {
                        value: defaultOptions.original,
                        title: GlobalConfig.i18n('vxe.export.expOriginalTitle'),
                        content: GlobalConfig.i18n('vxe.export.expOptOriginal')
                      },
                      on: {
                        input (value) {
                          defaultOptions.original = value
                        }
                      }
                    })
                  ]),
                  h('div', {
                    class: 'vxe-export--panel-option-row'
                  }, [
                    h('vxe-checkbox', {
                      props: {
                        value: isHeader && hasColgroup && supportMerge ? defaultOptions.isColgroup : false,
                        disabled: !isHeader || !hasColgroup || !supportMerge,
                        title: GlobalConfig.i18n('vxe.export.expColgroupTitle'),
                        content: GlobalConfig.i18n('vxe.export.expOptColgroup')
                      },
                      on: {
                        input (value) {
                          defaultOptions.isColgroup = value
                        }
                      }
                    }),
                    h('vxe-checkbox', {
                      props: {
                        value: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false,
                        disabled: !hasMerge || !supportMerge || !checkedAll,
                        title: GlobalConfig.i18n('vxe.export.expMergeTitle'),
                        content: GlobalConfig.i18n('vxe.export.expOptMerge')
                      },
                      on: {
                        input (value) {
                          defaultOptions.isMerge = value
                        }
                      }
                    }),
                    isPrint ? _e() : h('vxe-checkbox', {
                      props: {
                        value: supportStyle ? defaultOptions.useStyle : false,
                        disabled: !supportStyle,
                        title: GlobalConfig.i18n('vxe.export.expUseStyleTitle'),
                        content: GlobalConfig.i18n('vxe.export.expOptUseStyle')
                      },
                      on: {
                        input (value) {
                          defaultOptions.useStyle = value
                        }
                      }
                    }),
                    h('vxe-checkbox', {
                      props: {
                        value: hasTree ? defaultOptions.isAllExpand : false,
                        disabled: !hasTree,
                        title: GlobalConfig.i18n('vxe.export.expAllExpandTitle'),
                        content: GlobalConfig.i18n('vxe.export.expOptAllExpand')
                      },
                      on: {
                        input (value) {
                          defaultOptions.isAllExpand = value
                        }
                      }
                    })
                  ])
                ])
              ])
            ]
          ])
        ]),
        h('div', {
          class: 'vxe-export--panel-btns'
        }, [
          h('vxe-button', {
            props: {
              content: GlobalConfig.i18n('vxe.export.expCancel')
            },
            on: {
              click: this.cancelEvent
            }
          }),
          h('vxe-button', {
            ref: 'confirmBtn',
            props: {
              status: 'primary',
              content: GlobalConfig.i18n(isPrint ? 'vxe.export.expPrint' : 'vxe.export.expConfirm')
            },
            on: {
              click: this.confirmEvent
            }
          })
        ])
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
    },
    showEvent () {
      this.$nextTick(() => {
        const { $refs } = this
        const targetElem = $refs.filename || $refs.sheetname || $refs.confirmBtn
        if (targetElem) {
          targetElem.focus()
        }
      })
      this.checkStatus()
    },
    getExportOption () {
      const { checkedAll, storeData, defaultOptions, supportMerge } = this
      const { hasMerge, columns } = storeData
      const expColumns = XEUtils.searchTree(columns, column => column.checked, { children: 'children', mapChildren: 'childNodes', original: true })
      return Object.assign({}, defaultOptions, {
        columns: expColumns,
        isMerge: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false
      })
    },
    cancelEvent () {
      this.storeData.visible = false
    },
    confirmEvent (evnt) {
      if (this.storeData.isPrint) {
        this.printEvent(evnt)
      } else {
        this.exportEvent(evnt)
      }
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
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
