import { CreateElement } from 'vue'
import { VxeUI } from '../../../ui'
import XEUtils from 'xe-utils'
import { formatText } from '../../../ui/src/utils'
import { errLog } from '../../../ui/src/log'

import type { VxeModalComponent, VxeInputComponent, VxeCheckboxComponent, VxeSelectComponent, VxeButtonComponent } from 'vxe-pc-ui'
import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../../types'

const { getI18n, getIcon, globalMixins, renderEmptyElement } = VxeUI

export default {
  name: 'VxeTableExportPanel',
  mixins: [
    globalMixins.sizeMixin
  ],
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  components: {
    // VxeModal,
    // VxeInput,
    // VxeCheckbox,
    // VxeSelect,
    // VxeOption
  },
  inject: {
    $xeTable: {
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
    checkedAll () {
      return this.storeData.columns.every((column: any) => column.checked)
    },
    showSheet () {
      return ['html', 'xml', 'xlsx', 'pdf'].indexOf(this.defaultOptions.type) > -1
    },
    supportMerge () {
      const { storeData, defaultOptions } = this
      return !defaultOptions.original && defaultOptions.mode === 'current' && (storeData.isPrint || ['html', 'xlsx'].indexOf(defaultOptions.type) > -1)
    },
    // computeSupportGroup () {
    //   const { defaultOptions } = this
    //   return ['html', 'xlsx', 'csv', 'txt'].indexOf(defaultOptions.type) > -1
    // },
    supportStyle () {
      const { defaultOptions } = this
      return !defaultOptions.original && ['xlsx'].indexOf(defaultOptions.type) > -1
    }
  } as any,
  created (this: any) {
    const $xeTableExportPanel = this

    const VxeUIModalComponent = VxeUI.getComponent<VxeModalComponent>('VxeModal')
    const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')
    const VxeUISelectComponent = VxeUI.getComponent<VxeSelectComponent>('VxeSelect')
    const VxeUIInputComponent = VxeUI.getComponent<VxeInputComponent>('VxeInput')
    const VxeUICheckboxComponent = VxeUI.getComponent<VxeCheckboxComponent>('VxeCheckbox')

    $xeTableExportPanel.$nextTick(() => {
      if (!VxeUIModalComponent) {
        errLog('vxe.error.reqComp', ['vxe-modal'])
      }
      if (!VxeUIButtonComponent) {
        errLog('vxe.error.reqComp', ['vxe-button'])
      }
      if (!VxeUISelectComponent) {
        errLog('vxe.error.reqComp', ['vxe-select'])
      }
      if (!VxeUIInputComponent) {
        errLog('vxe.error.reqComp', ['vxe-input'])
      }
      if (!VxeUICheckboxComponent) {
        errLog('vxe.error.reqComp', ['vxe-checkbox'])
      }
    })
  },
  render (this: any, h: CreateElement) {
    const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
    const $xeGrid = $xeTable.$xeGrid

    const { _e, checkedAll, isAll: isAllChecked, isIndeterminate: isAllIndeterminate, showSheet, supportMerge, supportStyle, defaultOptions, storeData } = this
    const { hasTree, hasMerge, isPrint, hasColgroup, columns } = storeData
    const { isHeader } = defaultOptions
    // const supportGroup = this.computeSupportGroup
    const slots = defaultOptions.slots || {}
    const topSlot = slots.top
    const bottomSlot = slots.bottom
    const defaultSlot = slots.default
    const footerSlot = slots.footer
    const parameterSlot = slots.parameter
    const cols: any[] = []
    XEUtils.eachTree(columns, column => {
      const colTitle = formatText(column.getTitle(), 1)
      const isColGroup = column.children && column.children.length
      const isChecked = column.checked
      const indeterminate = column.halfChecked
      const isHtml = column.type === 'html'
      cols.push(
        h('li', {
          class: ['vxe-table-export--panel-column-option', `level--${column.level}`, {
            'is--group': isColGroup,
            'is--checked': isChecked,
            'is--indeterminate': indeterminate,
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
            class: ['vxe-checkbox--icon', indeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
          }),
          isHtml
            ? h('span', {
              key: '1',
              class: 'vxe-checkbox--label',
              domProps: {
                innerHTML: colTitle
              }
            })
            : h('span', {
              key: '0',
              class: 'vxe-checkbox--label'
            }, colTitle)
        ])
      )
    })
    return h('vxe-modal', {
      ref: 'modal',
      props: {
        id: 'VXE_EXPORT_MODAL',
        value: storeData.visible,
        title: getI18n(isPrint ? 'vxe.export.printTitle' : 'vxe.export.expTitle'),
        width: 660,
        minWidth: 500,
        minHeight: 400,
        mask: true,
        lockView: true,
        showFooter: true,
        escClosable: true,
        maskClosable: true,
        showMaximize: true,
        resize: true,
        loading: this.loading
      },
      on: {
        input (value: any) {
          storeData.visible = value
        },
        show: this.showEvent
      },
      scopedSlots: {
        default: () => {
          const params = {
            $table: $xeTable,
            $grid: $xeGrid,
            options: defaultOptions,
            columns,
            params: defaultOptions.params as any
          }
          const hasEmptyData = defaultOptions.mode === 'empty'

          return h('div', {
            class: 'vxe-table-export--panel'
          }, [
            topSlot
              ? h('div', {
                class: 'vxe-table-export--panel-top'
              }, $xeTable.callSlot(topSlot, params, h))
              : renderEmptyElement(this),
            h('div', {
              class: 'vxe-table-export--panel-body'
            }, defaultSlot
              ? $xeTable.callSlot(defaultSlot, params, h)
              : [
                  h('table', {
                    attrs: {
                      class: 'vxe-table-export--panel-table',
                      cellspacing: 0,
                      cellpadding: 0,
                      border: 0
                    }
                  }, [
                    h('tbody', [
                      [
                        isPrint
                          ? _e()
                          : h('tr', [
                            h('td', getI18n('vxe.export.expName')),
                            h('td', [
                              h('vxe-input', {
                                ref: 'filename',
                                props: {
                                  value: defaultOptions.filename,
                                  type: 'text',
                                  clearable: true,
                                  placeholder: getI18n('vxe.export.expNamePlaceholder')
                                },
                                on: {
                                  modelValue (value: any) {
                                    defaultOptions.filename = value
                                  }
                                }
                              })
                            ])
                          ]),
                        isPrint
                          ? _e()
                          : h('tr', [
                            h('td', getI18n('vxe.export.expType')),
                            h('td', [
                              h('vxe-select', {
                                props: {
                                  value: defaultOptions.type,
                                  options: storeData.typeList
                                },
                                on: {
                                  modelValue (value: any) {
                                    defaultOptions.type = value
                                  }
                                }
                              })
                            ])
                          ]),
                        isPrint || showSheet
                          ? h('tr', [
                            h('td', getI18n('vxe.export.expSheetName')),
                            h('td', [
                              h('vxe-input', {
                                ref: 'sheetname',
                                props: {
                                  value: defaultOptions.sheetName,
                                  type: 'text',
                                  clearable: true,
                                  placeholder: getI18n('vxe.export.expSheetNamePlaceholder')
                                },
                                on: {
                                  modelValue (value: any) {
                                    defaultOptions.sheetName = value
                                  }
                                }
                              })
                            ])
                          ])
                          : _e(),
                        h('tr', [
                          h('td', getI18n('vxe.export.expMode')),
                          h('td', [
                            h('vxe-select', {
                              props: {
                                value: defaultOptions.mode,
                                options: storeData.modeList
                              },
                              on: {
                                modelValue (value: any) {
                                  defaultOptions.mode = value
                                }
                              }
                            })
                          ])
                        ]),
                        h('tr', [
                          h('td', [getI18n('vxe.export.expColumn')]),
                          h('td', [
                            h('div', {
                              class: 'vxe-table-export--panel-column'
                            }, [
                              h('ul', {
                                class: 'vxe-table-export--panel-column-header'
                              }, [
                                h('li', {
                                  class: ['vxe-table-export--panel-column-option', {
                                    'is--checked': isAllChecked,
                                    'is--indeterminate': isAllIndeterminate
                                  }],
                                  attrs: {
                                    title: getI18n('vxe.table.allTitle')
                                  },
                                  on: {
                                    click: this.allColumnEvent
                                  }
                                }, [
                                  h('span', {
                                    class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                                  }),
                                  h('span', {
                                    class: 'vxe-checkbox--label'
                                  }, getI18n('vxe.export.expCurrentColumn'))
                                ])
                              ]),
                              h('ul', {
                                class: 'vxe-table-export--panel-column-body'
                              }, cols)
                            ])
                          ])
                        ]),
                        h('tr', [
                          h('td', getI18n('vxe.export.expOpts')),
                          parameterSlot
                            ? h('td', [
                              h('div', {
                                class: 'vxe-table-export--panel-option-row'
                              }, $xeTable.callSlot(parameterSlot, params, h))
                            ])
                            : h('td', [
                              h('div', {
                                class: 'vxe-table-export--panel-option-row'
                              }, [
                                h('vxe-checkbox', {
                                  props: {
                                    value: hasEmptyData || isHeader,
                                    disabled: hasEmptyData,
                                    title: getI18n('vxe.export.expHeaderTitle'),
                                    content: getI18n('vxe.export.expOptHeader')
                                  },
                                  on: {
                                    input (value: any) {
                                      defaultOptions.isHeader = value
                                    }
                                  }
                                }),
                                h('vxe-checkbox', {
                                  props: {
                                    value: isHeader ? defaultOptions.isTitle : false,
                                    disabled: !isHeader,
                                    title: getI18n('vxe.export.expTitleTitle'),
                                    content: getI18n('vxe.export.expOptTitle')
                                  },
                                  on: {
                                    input (value: any) {
                                      defaultOptions.isTitle = value
                                    }
                                  }
                                }),
                                h('vxe-checkbox', {
                                  props: {
                                    value: isHeader && hasColgroup && supportMerge ? defaultOptions.isColgroup : false,
                                    disabled: !isHeader || !hasColgroup || !supportMerge,
                                    title: getI18n('vxe.export.expColgroupTitle'),
                                    content: getI18n('vxe.export.expOptColgroup')
                                  },
                                  on: {
                                    input (value: any) {
                                      defaultOptions.isColgroup = value
                                    }
                                  }
                                })
                              ]),
                              h('div', {
                                class: 'vxe-table-export--panel-option-row'
                              }, [
                                h('vxe-checkbox', {
                                  props: {
                                    value: hasEmptyData ? false : defaultOptions.original,
                                    disabled: hasEmptyData,
                                    title: getI18n('vxe.export.expOriginalTitle'),
                                    content: getI18n('vxe.export.expOptOriginal')
                                  },
                                  on: {
                                    input (value: any) {
                                      defaultOptions.original = value
                                    }
                                  }
                                }),
                                h('vxe-checkbox', {
                                  props: {
                                    value: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false,
                                    disabled: hasEmptyData || !hasMerge || !supportMerge || !checkedAll,
                                    title: getI18n('vxe.export.expMergeTitle'),
                                    content: getI18n('vxe.export.expOptMerge')
                                  },
                                  on: {
                                    input (value: any) {
                                      defaultOptions.isMerge = value
                                    }
                                  }
                                }),
                                isPrint
                                  ? _e()
                                  : h('vxe-checkbox', {
                                    props: {
                                      value: supportStyle ? defaultOptions.useStyle : false,
                                      disabled: !supportStyle,
                                      title: getI18n('vxe.export.expUseStyleTitle'),
                                      content: getI18n('vxe.export.expOptUseStyle')
                                    },
                                    on: {
                                      input (value: any) {
                                        defaultOptions.useStyle = value
                                      }
                                    }
                                  }),
                                h('vxe-checkbox', {
                                  props: {
                                    value: hasTree ? defaultOptions.isAllExpand : false,
                                    disabled: hasEmptyData || !hasTree,
                                    title: getI18n('vxe.export.expAllExpandTitle'),
                                    content: getI18n('vxe.export.expOptAllExpand')
                                  },
                                  on: {
                                    input (value: any) {
                                      defaultOptions.isAllExpand = value
                                    }
                                  }
                                })
                              ]),

                              h('div', {
                                class: 'vxe-table-export--panel-option-row'
                              }, [
                                h('vxe-checkbox', {
                                  props: {
                                    value: defaultOptions.isFooter,
                                    disabled: !storeData.hasFooter,
                                    title: getI18n('vxe.export.expFooterTitle'),
                                    content: getI18n('vxe.export.expOptFooter')
                                  },
                                  on: {
                                    input (value: any) {
                                      defaultOptions.isFooter = value
                                    }
                                  }
                                })
                              ])
                            ])
                        ])
                      ]
                    ])
                  ])
                ]),
            bottomSlot
              ? h('div', {
                class: 'vxe-table-export--panel-bottom'
              }, $xeTable.callSlot(bottomSlot, params, h))
              : renderEmptyElement(this)
          ])
        },
        footer: () => {
          const params = {
            $table: $xeTable,
            $grid: $xeGrid,
            options: defaultOptions,
            columns,
            params: defaultOptions.params as any
          }
          return h('div', {
            class: 'vxe-table-export--panel-footer'
          }, footerSlot
            ? $xeTable.callSlot(footerSlot, params, h)
            : [
                h('div', {
                  class: 'vxe-table-export--panel-btns'
                }, [
                  h('vxe-button', {
                    props: {
                      content: getI18n('vxe.export.expCancel')
                    },
                    on: {
                      click: this.cancelEvent
                    }
                  }),
                  h('vxe-button', {
                    ref: 'confirmBtn',
                    props: {
                      status: 'primary',
                      content: getI18n(isPrint ? 'vxe.export.expPrint' : 'vxe.export.expConfirm')
                    },
                    on: {
                      click: this.confirmEvent
                    }
                  })
                ])
              ])
        }
      }
    })
  },
  methods: {
    changeOption (column: any) {
      const isChecked = !column.checked
      XEUtils.eachTree([column], (item) => {
        item.checked = isChecked
        item.halfChecked = false
      })
      this.handleOptionCheck(column)
      this.checkStatus()
    },
    handleOptionCheck (column: any) {
      const matchObj = XEUtils.findTree(this.storeData.columns as any[], item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.checked = parent.children.every((column: any) => column.checked)
          parent.halfChecked = !parent.checked && parent.children.some((column: any) => column.checked || column.halfChecked)
          this.handleOptionCheck(parent)
        }
      }
    },
    checkStatus () {
      const columns = this.storeData.columns
      this.isAll = columns.every((column: any) => column.disabled || column.checked)
      this.isIndeterminate = !this.isAll && columns.some((column: any) => !column.disabled && (column.checked || column.halfChecked))
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
    confirmEvent (evnt: any) {
      if (this.storeData.isPrint) {
        this.printEvent(evnt)
      } else {
        this.exportEvent(evnt)
      }
    },
    printEvent () {
      const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods

      this.storeData.visible = false
      $xeTable.print(Object.assign({}, $xeTable.printOpts, this.getExportOption()))
    },
    exportEvent () {
      const $xeTable = this.$xeTable
      const exportOpts = $xeTable.exportOpts

      this.loading = true
      $xeTable.exportData(Object.assign({}, exportOpts, this.getExportOption())).then(() => {
        this.loading = false
        this.storeData.visible = false
      }).catch(() => {
        this.loading = false
      })
    }
  } as any
}
