import { CreateElement, VNode, PropType } from 'vue'
import { defineVxeComponent } from '../../../ui/src/comp'
import { VxeUI } from '../../../ui'
import XEUtils from 'xe-utils'
import { formatText } from '../../../ui/src/utils'
import { errLog } from '../../../ui/src/log'

import type { VxeComponentSizeType } from 'vxe-pc-ui'
import type { VxeTableConstructor, VxeTablePrivateMethods, VxeTableDefines } from '../../../../types'

const { getI18n, getIcon, globalMixins, renderEmptyElement } = VxeUI

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeTableExportPanel',
  mixins: [
    globalMixins.sizeMixin
  ],
  props: {
    defaultOptions: {
      type: Object as PropType<VxeTableDefines.ExportParamsObj>,
      default: () => ({} as VxeTableDefines.ExportParamsObj)
    },
    storeData: {
      type: Object as PropType<VxeTableDefines.ExportStoreObj>,
      default: () => ({} as VxeTableDefines.ExportStoreObj)
    }
  },
  inject: {
    $xeTable: {
      default: null
    }
  },
  data () {
    const reactData = {
      isAll: false,
      isIndeterminate: false,
      loading: false
    }

    return {
      reactData
    }
  },
  computed: {
    ...({} as {
      computeSize(): VxeComponentSizeType
      $xeTable(): VxeTableConstructor & VxeTablePrivateMethods
    }),
    computeCheckedAll () {
      const $xeExportPanel = this
      const props = $xeExportPanel

      const { storeData } = props
      return storeData.columns.every((column) => column.checked)
    },
    computeShowSheet () {
      const $xeExportPanel = this
      const props = $xeExportPanel

      const { defaultOptions } = props
      return ['html', 'xml', 'xlsx', 'pdf'].indexOf(defaultOptions.type) > -1
    },
    computeSupportMerge () {
      const $xeExportPanel = this
      const props = $xeExportPanel

      const { storeData, defaultOptions } = props
      return !defaultOptions.original && defaultOptions.mode === 'current' && (storeData.isPrint || ['html', 'xlsx'].indexOf(defaultOptions.type) > -1)
    },
    // computeSupportGroup () {
    //   const $xeExportPanel = this
    //   const props = $xeExportPanel

    //   const { defaultOptions } = props
    //   return ['html', 'xlsx', 'csv', 'txt'].indexOf(defaultOptions.type) > -1
    // },
    computeSupportStyle () {
      const $xeExportPanel = this
      const props = $xeExportPanel

      const { defaultOptions } = props
      return !defaultOptions.original && ['xlsx'].indexOf(defaultOptions.type) > -1
    }
  },
  created () {
    const $xeTableExportPanel = this

    const VxeUIModalComponent = VxeUI.getComponent('VxeModal')
    const VxeUIButtonComponent = VxeUI.getComponent('VxeButton')
    const VxeUISelectComponent = VxeUI.getComponent('VxeSelect')
    const VxeUIInputComponent = VxeUI.getComponent('VxeInput')
    const VxeUICheckboxComponent = VxeUI.getComponent('VxeCheckbox')

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
  methods: {
    changeOption (column: any) {
      const $xeExportPanel = this

      const isChecked = !column.checked
      XEUtils.eachTree([column], (item) => {
        item.checked = isChecked
        item.halfChecked = false
      })
      $xeExportPanel.handleOptionCheck(column)
      $xeExportPanel.checkStatus()
    },
    handleOptionCheck (column: any) {
      const $xeExportPanel = this
      const props = $xeExportPanel

      const { storeData } = props
      const matchObj = XEUtils.findTree(storeData.columns as any[], item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.checked = parent.children.every((column: any) => column.checked)
          parent.halfChecked = !parent.checked && parent.children.some((column: any) => column.checked || column.halfChecked)
          $xeExportPanel.handleOptionCheck(parent)
        }
      }
    },
    checkStatus () {
      const $xeExportPanel = this
      const props = $xeExportPanel
      const reactData = $xeExportPanel.reactData

      const { storeData } = props
      const columns = storeData.columns
      reactData.isAll = columns.every((column: any) => column.disabled || column.checked)
      reactData.isIndeterminate = !reactData.isAll && columns.some((column: any) => !column.disabled && (column.checked || column.halfChecked))
    },
    allColumnEvent () {
      const $xeExportPanel = this
      const props = $xeExportPanel
      const reactData = $xeExportPanel.reactData

      const { storeData } = props
      const isAll = !reactData.isAll
      XEUtils.eachTree(storeData.columns, column => {
        if (!column.disabled) {
          column.checked = isAll
          column.halfChecked = false
        }
      })
      reactData.isAll = isAll
      $xeExportPanel.checkStatus()
    },
    showEvent () {
      const $xeExportPanel = this

      $xeExportPanel.$nextTick(() => {
        const targetElem = ($xeExportPanel.$refs.filename || $xeExportPanel.$refs.sheetname || $xeExportPanel.$refs.confirmBtn) as HTMLInputElement
        if (targetElem) {
          targetElem.focus()
        }
      })
      $xeExportPanel.checkStatus()
    },
    getExportOption (): VxeTableDefines.ExportParamsObj {
      const $xeExportPanel = this
      const props = $xeExportPanel

      const { storeData, defaultOptions } = props
      const { hasMerge, columns } = storeData
      const checkedAll = $xeExportPanel.computeCheckedAll
      const supportMerge = $xeExportPanel.computeSupportMerge
      const expColumns = XEUtils.searchTree(columns, column => column.checked, { children: 'children', mapChildren: 'childNodes', original: true })
      return Object.assign({}, defaultOptions, {
        columns: expColumns,
        isMerge: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false
      })
    },
    cancelEvent () {
      const $xeExportPanel = this
      const props = $xeExportPanel

      const { storeData } = props
      storeData.visible = false
    },
    confirmEvent () {
      const $xeExportPanel = this
      const props = $xeExportPanel

      const { storeData } = props
      if (storeData.isPrint) {
        $xeExportPanel.printEvent()
      } else {
        $xeExportPanel.exportEvent()
      }
    },
    printEvent () {
      const $xeExportPanel = this
      const props = $xeExportPanel
      const $xeTable = $xeExportPanel.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

      const { storeData } = props
      storeData.visible = false
      $xeTable.print(Object.assign({}, $xeTable.printOpts, $xeExportPanel.getExportOption()))
    },
    exportEvent () {
      const $xeExportPanel = this
      const props = $xeExportPanel
      const reactData = $xeExportPanel.reactData
      const $xeTable = $xeExportPanel.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

      const { storeData } = props
      const exportOpts = $xeTable.exportOpts
      reactData.loading = true
      $xeTable.exportData(Object.assign({}, exportOpts, $xeExportPanel.getExportOption())).then(() => {
        reactData.loading = false
        storeData.visible = false
      }).catch(() => {
        reactData.loading = false
      })
    },

    renderVN (h: CreateElement): VNode {
      const $xeExportPanel = this
      const props = $xeExportPanel
      const reactData = $xeExportPanel.reactData

      const $xeTable = $xeExportPanel.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
      const $xeGrid = $xeTable.$xeGrid
      const $xeGantt = $xeTable.$xeGantt

      const { defaultOptions, storeData } = props
      const { isAll: isAllChecked, isIndeterminate: isAllIndeterminate } = reactData
      const { hasTree, hasMerge, isPrint, hasColgroup, columns } = storeData
      const { isHeader } = defaultOptions
      const colVNs: VNode[] = []
      const checkedAll = $xeExportPanel.computeCheckedAll
      const showSheet = $xeExportPanel.computeShowSheet
      const supportMerge = $xeExportPanel.computeSupportMerge
      const supportStyle = $xeExportPanel.computeSupportStyle
      // const supportGroup = $xeExportPanel.computeSupportGroup
      const slots = defaultOptions.slots || {}
      const topSlot = slots.top
      const bottomSlot = slots.bottom
      const defaultSlot = slots.default
      const footerSlot = slots.footer
      const parameterSlot = slots.parameter
      XEUtils.eachTree(columns, column => {
        const colTitle = formatText(column.getTitle(), 1)
        const isColGroup = column.children && column.children.length
        const isChecked = column.checked
        const indeterminate = column.halfChecked
        const isHtml = column.type === 'html'
        colVNs.push(
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
                  $xeExportPanel.changeOption(column)
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
          loading: reactData.loading
        },
        on: {
          input (value: any) {
            storeData.visible = value
          },
          show: $xeExportPanel.showEvent
        },
        scopedSlots: {
          default (): VNode {
            const params = {
              $table: $xeTable,
              $grid: $xeGrid,
              $gantt: $xeGantt,
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
                : renderEmptyElement($xeTable),
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
                            ? renderEmptyElement($xeTable)
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
                            ? renderEmptyElement($xeTable)
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
                            : renderEmptyElement($xeTable),
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
                                      click: $xeExportPanel.allColumnEvent
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
                                }, colVNs)
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
                                    ? renderEmptyElement($xeTable)
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
                : renderEmptyElement($xeTable)
            ])
          },
          footer (): VNode {
            const params = {
              $table: $xeTable,
              $grid: $xeGrid,
              $gantt: $xeGantt,
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
                        click: $xeExportPanel.cancelEvent
                      }
                    }),
                    h('vxe-button', {
                      ref: 'confirmBtn',
                      props: {
                        status: 'primary',
                        content: getI18n(isPrint ? 'vxe.export.expPrint' : 'vxe.export.expConfirm')
                      },
                      on: {
                        click: $xeExportPanel.confirmEvent
                      }
                    })
                  ])
                ])
          }
        }
      })
    }
  },
  render (h: CreateElement) {
    return (this as any).renderVN(h)
  }
}) /* define-vxe-component end */
