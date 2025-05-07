import { CreateElement, VNode } from 'vue'
import { VxeUI } from '../../../ui'
import { formatText } from '../../../ui/src/utils'
import { getTpImg, addClass, removeClass, hasControlKey } from '../../../ui/src/dom'
import { errLog } from '../../../ui/src/log'
import XEUtils from 'xe-utils'

import type { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods, TableReactData, TableInternalData } from '../../../../types'
import type { VxeModalComponent, VxeDrawerComponent, VxeButtonComponent, VxeRadioGroupComponent, VxeInputComponent } from 'vxe-pc-ui'

const { getI18n, getIcon, renderEmptyElement } = VxeUI

function showDropTip (_vm: any, evnt: DragEvent | MouseEvent, optEl: HTMLElement | null, showLine: boolean, dragPos: string) {
  const { prevDragToChild } = _vm

  const el = _vm.$refs.bodyElemRef as HTMLDivElement
  if (!el) {
    return
  }
  const wrapperRect = el.getBoundingClientRect()
  if (optEl) {
    const dragLineEl = _vm.$refs.refDragLineElem as HTMLDivElement
    if (dragLineEl) {
      if (showLine) {
        const optRect = optEl.getBoundingClientRect()
        dragLineEl.style.display = 'block'
        dragLineEl.style.top = `${Math.max(1, optRect.y + el.scrollTop - wrapperRect.y)}px`
        dragLineEl.style.height = `${optRect.height}px`
        dragLineEl.style.width = `${optRect.width}px`
        dragLineEl.setAttribute('drag-pos', dragPos)
        dragLineEl.setAttribute('drag-to-child', prevDragToChild ? 'y' : 'n')
      } else {
        dragLineEl.style.display = ''
      }
    }
  }
  const dragTipEl = _vm.$refs.refDragTipElem as HTMLDivElement
  if (dragTipEl) {
    dragTipEl.style.display = 'block'
    dragTipEl.style.top = `${Math.min(el.clientHeight + el.scrollTop - dragTipEl.clientHeight, evnt.clientY + el.scrollTop - wrapperRect.y)}px`
    dragTipEl.style.left = `${Math.min(el.clientWidth + el.scrollLeft - dragTipEl.clientWidth, evnt.clientX + el.scrollLeft - wrapperRect.x)}px`
    dragTipEl.setAttribute('drag-status', showLine ? (prevDragToChild ? 'sub' : 'normal') : 'disabled')
  }
}

function hideDropTip (_vm: any) {
  const dragTipEl = _vm.$refs.refDragTipElem as HTMLDivElement
  const dragLineEl = _vm.$refs.refDragLineElem as HTMLDivElement
  if (dragTipEl) {
    dragTipEl.style.display = ''
  }
  if (dragLineEl) {
    dragLineEl.style.display = ''
  }
}

const renderDragTip = (h: CreateElement, _vm: any) => {
  const $xeTable = _vm.$xeTable

  const dragCol = $xeTable.dragColumnRef
  const columnDragOpts = $xeTable.computeColumnDragOpts
  return h('div', {}, [
    h('div', {
      ref: 'refDragLineElem',
      class: ['vxe-table-custom-popup--drag-line', {
        'is--guides': columnDragOpts.showGuidesStatus
      }]
    }),
    h('div', {
      ref: 'refDragTipElem',
      class: 'vxe-table-custom-popup--drag-tip'
    }, [
      h('div', {
        class: 'vxe-table-custom-popup--drag-tip-wrapper'
      }, [
        h('div', {
          class: 'vxe-table-custom-popup--drag-tip-status'
        }, [
          h('span', {
            class: ['vxe-table-custom-popup--drag-tip-normal-status', getIcon().TABLE_DRAG_STATUS_ROW]
          }),
          h('span', {
            class: ['vxe-table-custom-popup--drag-tip-sub-status', getIcon().TABLE_DRAG_STATUS_SUB_ROW]
          }),
          h('span', {
            class: ['vxe-table-custom-popup--drag-tip-disabled-status', getIcon().TABLE_DRAG_DISABLED]
          })
        ]),
        h('div', {
          class: 'vxe-table-custom-popup--drag-tip-content'
        }, getI18n('vxe.custom.cstmDragTarget', [dragCol && dragCol.type !== 'html' ? dragCol.getTitle() : '']))
      ])
    ])
  ])
}

const renderSimplePanel = (h: CreateElement, _vm: any) => {
  const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

  const props = _vm

  const $xeTable = _vm.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
  const reactData = $xeTable as unknown as TableReactData
  const $xeGrid = $xeTable.$xeGrid

  const { customStore } = props
  const { isCustomStatus, customColumnList } = reactData
  const customOpts = $xeTable.computeCustomOpts
  const { immediate } = customOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const { maxHeight } = customStore
  const { checkMethod, visibleMethod, allowVisible, allowSort, allowFixed, trigger, placement } = customOpts
  const isMaxFixedColumn = $xeTable.computeIsMaxFixedColumn
  const { isCrossDrag } = columnDragOpts
  const slots = customOpts.slots || {}
  const headerSlot = slots.header
  const topSlot = slots.top
  const bottomSlot = slots.bottom
  const defaultSlot = slots.default
  const footerSlot = slots.footer
  const colVNs: any[] = []
  const customWrapperOns: any = {}
  const isAllChecked = customStore.isAll
  const isAllIndeterminate = customStore.isIndeterminate
  // hover 触发
  if (trigger === 'hover') {
    customWrapperOns.mouseenter = _vm.handleWrapperMouseenterEvent
    customWrapperOns.mouseleave = _vm.handleWrapperMouseleaveEvent
  }
  const params = {
    $table: $xeTable,
    $grid: $xeGrid,
    columns: customColumnList,
    isAllChecked,
    isAllIndeterminate,
    isCustomStatus
  }
  XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
    const isVisible = visibleMethod ? visibleMethod({ $table: $xeTable, column }) : true
    if (isVisible) {
      const isChecked = column.renderVisible
      const isIndeterminate = column.halfVisible
      const isColGroup = column.children && column.children.length
      const colTitle = formatText(column.getTitle(), 1)
      const isDisabled = checkMethod ? !checkMethod({ $table: $xeTable, column }) : false
      const isHidden = !isChecked
      colVNs.push(
        h('li', {
          key: column.id,
          attrs: {
            colid: column.id
          },
          class: ['vxe-table-custom--option', `level--${column.level}`, {
            'is--hidden': isDisabled || isHidden,
            'is--group': isColGroup
          }],
          on: {
            dragstart: _vm.sortDragstartEvent,
            dragend: _vm.sortDragendEvent,
            dragover: _vm.sortDragoverEvent
          }
        }, [
          allowVisible
            ? h('div', {
              class: ['vxe-table-custom--checkbox-option', {
                'is--checked': isChecked,
                'is--indeterminate': isIndeterminate,
                'is--disabled': isDisabled
              }],
              attrs: {
                title: getI18n('vxe.custom.setting.colVisible')
              },
              on: {
                click: () => {
                  if (!isDisabled) {
                    _vm.changeCheckboxOption(column)
                  }
                }
              }
            }, [
              h('span', {
                class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
              })
            ])
            : renderEmptyElement($xeTable),
          h('div', {
            class: 'vxe-table-custom--name-option'
          }, [
            allowSort && ((isCrossDrag ? immediate : false) || column.level === 1)
              ? h('div', {
                class: 'vxe-table-custom--sort-option'
              }, [
                h('span', {
                  class: ['vxe-table-custom--sort-btn', {
                    'is--disabled': isDisabled || isHidden || column.renderFixed
                  }],
                  attrs: {
                    title: getI18n('vxe.custom.setting.sortHelpTip')
                  },
                  on: isDisabled || isHidden || column.renderFixed
                    ? {}
                    : {
                        mousedown: _vm.sortMousedownEvent,
                        mouseup: _vm.sortMouseupEvent
                      }
                }, [
                  h('i', {
                    class: getIcon().TABLE_CUSTOM_SORT
                  })
                ])
              ])
              : renderEmptyElement($xeTable),
            column.type === 'html'
              ? h('div', {
                key: '1',
                class: 'vxe-table-custom--checkbox-label',
                domProps: {
                  innerHTML: colTitle
                }
              })
              : h('div', {
                key: '0',
                class: 'vxe-table-custom--checkbox-label',
                attrs: {
                  title: colTitle
                }
              }, colTitle)
          ]),
          !parent && allowFixed
            ? h('div', {
              class: 'vxe-table-custom--fixed-option'
            }, [
              h(VxeUIButtonComponent, {
                props: {
                  mode: 'text',
                  icon: column.renderFixed === 'left' ? getIcon().TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_LEFT,
                  status: column.renderFixed === 'left' ? 'primary' : '',
                  disabled: isDisabled || isHidden || (isMaxFixedColumn && !column.renderFixed),
                  title: getI18n(column.renderFixed === 'left' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedLeft')
                },
                on: {
                  click: () => {
                    _vm.changeFixedOption(column, 'left')
                  }
                }
              }),
              h(VxeUIButtonComponent, {
                props: {
                  mode: 'text',
                  icon: column.renderFixed === 'right' ? getIcon().TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_RIGHT,
                  status: column.renderFixed === 'right' ? 'primary' : '',
                  disabled: isDisabled || isHidden || (isMaxFixedColumn && !column.renderFixed),
                  title: getI18n(column.renderFixed === 'right' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedRight')
                },
                on: {
                  click: () => {
                    _vm.changeFixedOption(column, 'right')
                  }
                }
              })
            ])
            : renderEmptyElement($xeTable)
        ])
      )
    }
  })
  return h('div', {
    key: 'simple',
    class: ['vxe-table-custom-wrapper', `placement--${placement}`, {
      'is--active': customStore.visible
    }],
    style: maxHeight && !['left', 'right'].includes(placement || '')
      ? {
          maxHeight: `${maxHeight}px`
        }
      : {}
  }, customStore.visible
    ? [
        h('div', {
          class: 'vxe-table-custom--header'
        }, headerSlot
          ? $xeTable.callSlot(headerSlot, params, h)
          : [
              h('ul', {
                class: 'vxe-table-custom--panel-list'
              }, [
                h('li', {
                  class: 'vxe-table-custom--option'
                }, [
                  allowVisible
                    ? h('div', {
                      class: ['vxe-table-custom--checkbox-option', {
                        'is--checked': isAllChecked,
                        'is--indeterminate': isAllIndeterminate
                      }],
                      attrs: {
                        title: getI18n('vxe.table.allTitle')
                      },
                      on: {
                        click: _vm.allOptionEvent
                      }
                    }, [
                      h('span', {
                        class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                      }),
                      h('span', {
                        class: 'vxe-checkbox--label'
                      }, getI18n('vxe.toolbar.customAll'))
                    ])
                    : h('span', {
                      class: 'vxe-checkbox--label'
                    }, getI18n('vxe.table.customTitle'))
                ])
              ])
            ]),
        h('div', {
          ref: 'bodyElemRef',
          class: 'vxe-table-custom--body'
        }, [
          topSlot
            ? h('div', {
              class: 'vxe-table-custom--panel-top'
            }, $xeTable.callSlot(topSlot, params, h))
            : renderEmptyElement($xeTable),
          defaultSlot
            ? h('div', {
              class: 'vxe-table-custom--panel-body'
            }, $xeTable.callSlot(defaultSlot, params, h))
            : h('transition-group', {
              class: 'vxe-table-custom--panel-list',
              props: {
                name: 'vxe-table-custom--list',
                tag: 'ul'
              },
              on: customWrapperOns
            }, colVNs),
          bottomSlot
            ? h('div', {
              class: 'vxe-table-custom--panel-bottom'
            }, $xeTable.callSlot(bottomSlot, params, h))
            : renderEmptyElement($xeTable),
          renderDragTip(h, _vm)
        ]),
        customOpts.showFooter
          ? h('div', {
            class: 'vxe-table-custom--footer'
          }, footerSlot
            ? $xeTable.callSlot(footerSlot, params, h)
            : [
                h('div', {
                  class: 'vxe-table-custom--footer-buttons'
                }, [
                  h(VxeUIButtonComponent, {
                    props: {
                      mode: 'text',
                      content: customOpts.resetButtonText || getI18n('vxe.table.customRestore'),
                      disabled: !isCustomStatus
                    },
                    on: {
                      click: _vm.resetCustomEvent
                    }
                  }),
                  immediate
                    ? h(VxeUIButtonComponent, {
                      props: {
                        mode: 'text',
                        content: customOpts.closeButtonText || getI18n('vxe.table.customClose')
                      },
                      on: {
                        click: _vm.cancelCloseEvent
                      }
                    })
                    : h(VxeUIButtonComponent, {
                      props: {
                        mode: 'text',
                        content: customOpts.resetButtonText || getI18n('vxe.table.customCancel')
                      },
                      on: {
                        click: _vm.cancelCustomEvent
                      }
                    }),
                  immediate
                    ? renderEmptyElement($xeTable)
                    : h(VxeUIButtonComponent, {
                      props: {
                        mode: 'text',
                        status: 'primary',
                        content: customOpts.confirmButtonText || getI18n('vxe.table.customConfirm')
                      },
                      on: {
                        click: _vm.confirmCustomEvent
                      }
                    })
                ])
              ])
          : null
      ]
    : [])
}

const renderPopupPanel = (h: CreateElement, _vm: any) => {
  const VxeUIModalComponent = VxeUI.getComponent<VxeModalComponent>('VxeModal')
  const VxeUIDrawerComponent = VxeUI.getComponent<VxeDrawerComponent>('VxeDrawer')
  const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')
  const VxeUINumberInputComponent = VxeUI.getComponent<VxeInputComponent>('VxeInput')
  const $xeTableCustomPanel = _vm

  const props = _vm

  const $xeTable = _vm.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
  const tableProps = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const $xeGrid = $xeTable.$xeGrid

  const { customStore } = props
  const { resizable: allResizable } = tableProps
  const { isCustomStatus, customColumnList } = reactData
  const customOpts = $xeTable.computeCustomOpts
  const { immediate } = customOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const { mode, modalOptions, drawerOptions, allowVisible, allowSort, allowFixed, allowResizable, checkMethod, visibleMethod } = customOpts
  const columnOpts = $xeTable.computeColumnOpts
  const { maxFixedSize } = columnOpts
  const resizableOpts = $xeTable.computeResizableOpts
  const { minWidth: reMinWidth, maxWidth: reMaxWidth } = resizableOpts
  const modalOpts = Object.assign({}, modalOptions)
  const drawerOpts = Object.assign({}, drawerOptions)
  const isMaxFixedColumn = $xeTable.computeIsMaxFixedColumn
  const { isCrossDrag } = columnDragOpts
  const slots = customOpts.slots || {}
  const headerSlot = slots.header
  const topSlot = slots.top
  const bottomSlot = slots.bottom
  const defaultSlot = slots.default
  const footerSlot = slots.footer
  const trVNs: VNode[] = []
  const isAllChecked = customStore.isAll
  const isAllIndeterminate = customStore.isIndeterminate
  const params = {
    $table: $xeTable,
    $grid: $xeGrid,
    columns: customColumnList,
    isAllChecked,
    isAllIndeterminate,
    isCustomStatus
  }
  XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
    const isVisible = visibleMethod ? visibleMethod({ $table: $xeTable, column }) : true
    if (isVisible) {
      // 默认继承调整宽度
      let customMinWidth = 0
      let customMaxWidth = 0
      if (allowResizable) {
        const resizeParams = {
          $table: $xeTable,
          column,
          columnIndex: index,
          $columnIndex: index,
          $rowIndex: -1
        }
        if (reMinWidth) {
          customMinWidth = XEUtils.toNumber(XEUtils.isFunction(reMinWidth) ? reMinWidth(resizeParams) : reMinWidth)
        }
        if (reMaxWidth) {
          customMaxWidth = XEUtils.toNumber(XEUtils.isFunction(reMaxWidth) ? reMaxWidth(resizeParams) : reMaxWidth)
        }
      }

      const isChecked = column.renderVisible
      const isIndeterminate = column.halfVisible
      const colTitle = formatText(column.getTitle(), 1)
      const isColGroup = column.children && column.children.length
      const isDisabled = checkMethod ? !checkMethod({ $table: $xeTable, column }) : false
      const isHidden = !isChecked
      trVNs.push(
        h('tr', {
          key: column.id,
          attrs: {
            colid: column.id
          },
          class: [`vxe-table-custom-popup--row level--${column.level}`, {
            'is--group': isColGroup
          }],
          on: {
            dragstart: _vm.sortDragstartEvent,
            dragend: _vm.sortDragendEvent,
            dragover: _vm.sortDragoverEvent
          }
        }, [
          allowVisible
            ? h('td', {
              class: 'vxe-table-custom-popup--column-item col--visible'
            }, [
              h('div', {
                class: ['vxe-table-custom--checkbox-option', {
                  'is--checked': isChecked,
                  'is--indeterminate': isIndeterminate,
                  'is--disabled': isDisabled
                }],
                attrs: {
                  title: getI18n('vxe.custom.setting.colVisible')
                },
                on: {
                  click: () => {
                    if (!isDisabled) {
                      _vm.changeCheckboxOption(column)
                    }
                  }
                }
              }, [
                h('span', {
                  class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                })
              ])
            ])
            : renderEmptyElement($xeTable),
          h('td', {
            class: 'vxe-table-custom-popup--column-item col--name'
          }, [
            h('div', {
              class: 'vxe-table-custom-popup--name'
            }, [
              allowSort
                ? ((isCrossDrag ? immediate : false) || column.level === 1
                    ? h('div', {
                      class: ['vxe-table-custom-popup--column-sort-btn', {
                        'is--disabled': isDisabled || isHidden || column.renderFixed
                      }],
                      attrs: {
                        title: getI18n('vxe.custom.setting.sortHelpTip')
                      },
                      on: (isDisabled || isHidden || column.renderFixed
                        ? {}
                        : {
                            mousedown: _vm.sortMousedownEvent,
                            mouseup: _vm.sortMouseupEvent
                          })
                    }, [
                      h('i', {
                        class: getIcon().TABLE_CUSTOM_SORT
                      })
                    ])
                    : h('div', {
                      class: 'vxe-table-custom-popup--column-sort-placeholder'
                    }))
                : renderEmptyElement($xeTable),
              column.type === 'html'
                ? h('div', {
                  key: '1',
                  class: 'vxe-table-custom-popup--title',
                  domProps: {
                    innerHTML: colTitle
                  }
                })
                : h('div', {
                  key: '0',
                  class: 'vxe-table-custom-popup--title',
                  attrs: {
                    title: colTitle
                  }
                }, colTitle)
            ])
          ]),
          allowResizable
            ? h('td', {
              class: 'vxe-table-custom-popup--column-item col--resizable'
            }, [
              (
                (column.children && column.children.length) ||
                !(XEUtils.isBoolean(column.resizable) ? column.resizable : (columnOpts.resizable || allResizable))
              )
                ? h('span', '-')
                : (VxeUINumberInputComponent
                    ? h(VxeUINumberInputComponent, {
                      props: {
                        type: 'integer',
                        immediate: false,
                        disabled: isDisabled || isHidden,
                        value: column.renderResizeWidth,
                        min: customMinWidth || undefined,
                        max: customMaxWidth || undefined
                      },
                      on: {
                        modelValue (value: any) {
                          column.renderResizeWidth = Math.max(0, Number(value))
                        },
                        change () {
                          _vm.changeColumnWidth(column)
                        }
                      }
                    })
                    : renderEmptyElement($xeTableCustomPanel)
                  )
            ])
            : renderEmptyElement($xeTable),
          allowFixed
            ? h('td', {
              class: 'vxe-table-custom-popup--column-item col--fixed'
            }, [
              parent
                ? h('span', '-')
                : h('vxe-radio-group', {
                  props: {
                    value: column.renderFixed || '',
                    type: 'button',
                    size: 'mini',
                    disabled: isDisabled || isHidden,
                    options: [
                      { label: getI18n('vxe.custom.setting.fixedLeft'), value: 'left', disabled: isDisabled || isHidden || isMaxFixedColumn },
                      { label: getI18n('vxe.custom.setting.fixedUnset'), value: '', disabled: isDisabled || isHidden },
                      { label: getI18n('vxe.custom.setting.fixedRight'), value: 'right', disabled: isDisabled || isHidden || isMaxFixedColumn }
                    ]
                  },
                  on: {
                    input (value: any) {
                      _vm.changeFixedOption(column, value)
                    }
                  }
                })
            ])
            : renderEmptyElement($xeTable)
        ])
      )
    }
  })
  const scopedSlots: Record<string, any> = {
    default: () => {
      if (defaultSlot) {
        return $xeTable.callSlot(defaultSlot, params, h)
      }
      return h('div', {
        ref: 'bodyElemRef',
        class: 'vxe-table-custom-popup--body'
      }, [
        topSlot
          ? h('div', {
            class: 'vxe-table-custom-popup--table-top'
          }, $xeTable.callSlot(topSlot, params, h))
          : renderEmptyElement($xeTable),
        h('div', {
          class: 'vxe-table-custom-popup--table-wrapper'
        }, [
          h('table', {}, [
            h('colgroup', {}, [
              allowVisible
                ? h('col', {
                  class: 'vxe-table-custom-popup--table-col-seq'
                })
                : renderEmptyElement($xeTable),
              h('col', {
                class: 'vxe-table-custom-popup--table-col-title'
              }),
              allowResizable
                ? h('col', {
                  class: 'vxe-table-custom-popup--table-col-width'
                })
                : renderEmptyElement($xeTable),
              allowFixed
                ? h('col', {
                  class: 'vxe-table-custom-popup--table-col-fixed'
                })
                : renderEmptyElement($xeTable)
            ]),
            h('thead', {}, [
              h('tr', {}, [
                allowVisible
                  ? h('th', {}, [
                    h('div', {
                      class: ['vxe-table-custom--checkbox-option', {
                        'is--checked': isAllChecked,
                        'is--indeterminate': isAllIndeterminate
                      }],
                      attrs: {
                        title: getI18n('vxe.table.allTitle')
                      },
                      on: {
                        click: _vm.allOptionEvent
                      }

                    }, [
                      h('span', {
                        class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                      }),
                      h('span', {
                        class: 'vxe-checkbox--label'
                      }, getI18n('vxe.toolbar.customAll'))
                    ])
                  ])
                  : renderEmptyElement($xeTable),
                h('th', {}, getI18n('vxe.custom.setting.colTitle')),
                allowResizable
                  ? h('th', {}, getI18n('vxe.custom.setting.colResizable'))
                  : renderEmptyElement($xeTable),
                allowFixed
                  ? h('th', {}, getI18n(`vxe.custom.setting.${maxFixedSize ? 'colFixedMax' : 'colFixed'}`, [maxFixedSize]))
                  : renderEmptyElement($xeTable)
              ])
            ]),
            h('transition-group', {
              class: 'vxe-table-custom--panel-list',
              props: {
                tag: 'tbody',
                name: 'vxe-table-custom--list'
              }
            }, trVNs)
          ])
        ]),
        bottomSlot
          ? h('div', {
            class: 'vxe-table-custom-popup--table-bottom'
          }, $xeTable.callSlot(bottomSlot, params, h))
          : renderEmptyElement($xeTable),
        renderDragTip(h, _vm)
      ])
    },
    footer: () => {
      if (footerSlot) {
        return $xeTable.callSlot(footerSlot, params, h)
      }
      return h('div', {
        class: 'vxe-table-custom-popup--footer'
      }, [
        h(VxeUIButtonComponent, {
          props: {
            content: customOpts.resetButtonText || getI18n('vxe.custom.cstmRestore'),
            disabled: !isCustomStatus
          },
          on: {
            click: _vm.resetCustomEvent
          }
        }),
        immediate
          ? h(VxeUIButtonComponent, {
            props: {
              content: customOpts.resetButtonText || getI18n('vxe.table.customClose')
            },
            on: {
              click: _vm.cancelCloseEvent
            }
          })
          : h(VxeUIButtonComponent, {
            props: {
              content: customOpts.resetButtonText || getI18n('vxe.custom.cstmCancel')
            },
            on: {
              click: _vm.cancelCustomEvent
            }
          }),
        immediate
          ? renderEmptyElement($xeTable)
          : h(VxeUIButtonComponent, {
            props: {
              status: 'primary',
              content: customOpts.confirmButtonText || getI18n('vxe.custom.cstmConfirm')
            },
            on: {
              click: _vm.confirmCustomEvent
            }
          })
      ])
    }
  }
  if (headerSlot) {
    scopedSlots.header = () => $xeTable.callSlot(headerSlot, params, h)
  }
  if (mode === 'drawer') {
    return VxeUIDrawerComponent
      ? h(VxeUIDrawerComponent, {
        key: 'drawer',
        props: {
          className: ['vxe-table-custom-drawer-wrapper', 'vxe-table--ignore-clear', drawerOpts.className || ''].join(' '),
          value: customStore.visible,
          title: drawerOpts.title || getI18n('vxe.custom.cstmTitle'),
          width: drawerOpts.width || Math.min(880, Math.floor(document.documentElement.clientWidth * 0.6)),
          position: drawerOpts.position,
          resize: !!drawerOpts.resize,
          escClosable: !!drawerOpts.escClosable,
          maskClosable: !!drawerOpts.maskClosable,
          destroyOnClose: true,
          showFooter: true
        },
        on: {
          input (value: any) {
            customStore.visible = value
          }
        },
        scopedSlots
      })
      : renderEmptyElement($xeTableCustomPanel)
  }
  return VxeUIModalComponent
    ? h(VxeUIModalComponent, {
      key: 'modal',
      props: {
        className: ['vxe-table-custom-popup-wrapper', 'vxe-table--ignore-clear', modalOpts.className || ''].join(' '),
        value: customStore.visible,
        title: modalOpts.title || getI18n('vxe.custom.cstmTitle'),
        width: modalOpts.width || Math.min(880, document.documentElement.clientWidth),
        minWidth: modalOpts.minWidth || 700,
        height: modalOpts.height || Math.min(680, document.documentElement.clientHeight),
        minHeight: modalOpts.minHeight || 400,
        showZoom: modalOpts.showZoom,
        showMaximize: modalOpts.showMaximize,
        showMinimize: modalOpts.showMinimize,
        mask: modalOpts.mask,
        lockView: modalOpts.lockView,
        resize: modalOpts.resize,
        escClosable: !!modalOpts.escClosable,
        maskClosable: !!modalOpts.maskClosable,
        destroyOnClose: true,
        showFooter: true
      },
      on: {
        input (value: any) {
          customStore.visible = value
        }
      },
      scopedSlots
    })
    : renderEmptyElement($xeTableCustomPanel)
}

export default {
  name: 'VxeTableCustomPanel',
  props: {
    customStore: {
      type: Object,
      default: () => ({})
    }
  },
  inject: {
    $xeTable: {
      default: null
    }
  },
  data () {
    return {
      prevDragCol: undefined,
      prevDragToChild: false,
      prevDragPos: null
    }
  },
  computed: {
  },
  created (this: any) {
    const VxeUIModalComponent = VxeUI.getComponent<VxeModalComponent>('VxeModal')
    const VxeUIDrawerComponent = VxeUI.getComponent<VxeDrawerComponent>('VxeDrawer')
    const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')
    const VxeUINumberInputComponent = VxeUI.getComponent<VxeInputComponent>('VxeNumberInput')
    const VxeUIRadioGroupComponent = VxeUI.getComponent<VxeRadioGroupComponent>('VxeRadioGroup')

    this.$nextTick(() => {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

      const { customOpts } = $xeTable
      const { mode } = customOpts
      if (!VxeUIModalComponent && (mode === 'modal')) {
        errLog('vxe.error.reqComp', ['vxe-modal'])
      }
      if (!VxeUIDrawerComponent && (mode === 'drawer')) {
        errLog('vxe.error.reqComp', ['vxe-drawer'])
      }
      if (!VxeUIButtonComponent) {
        errLog('vxe.error.reqComp', ['vxe-button'])
      }
      if (!VxeUINumberInputComponent) {
        errLog('vxe.error.reqComp', ['vxe-input'])
      }
      if (!VxeUIRadioGroupComponent) {
        errLog('vxe.error.reqComp', ['vxe-radio-group'])
      }
    })
  },
  render (this: any, h: CreateElement) {
    const $xeTable = this.$xeTable

    const customOpts = $xeTable.computeCustomOpts
    if (['modal', 'drawer', 'popup'].includes(`${customOpts.mode}`)) {
      return renderPopupPanel(h, this)
    }
    return renderSimplePanel(h, this)
  },
  methods: {
    handleWrapperMouseenterEvent (evnt: any) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

      const { customStore } = this
      customStore.activeWrapper = true
      $xeTable.customOpenEvent(evnt)
    },
    handleWrapperMouseleaveEvent  (evnt: any) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

      const { customStore } = this
      customStore.activeWrapper = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          $xeTable.customCloseEvent(evnt)
        }
      }, 300)
    },
    getStoreData () {
      return {}
    },
    confirmCustomEvent ({ $event }: any) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      reactData.isCustomStatus = true
      $xeTable.saveCustom()
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('confirm', $event)
    },
    cancelCloseEvent ({ $event }: any) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('close', $event)
    },
    cancelCustomEvent ({ $event }: any) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

      $xeTable.cancelCustom()
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('cancel', $event)
    },
    handleResetCustomEvent (evnt: any) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

      $xeTable.resetCustom(true)
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('reset', evnt)
    },
    resetCustomEvent  (evnt: any) {
      if (VxeUI.modal) {
        VxeUI.modal.confirm({
          content: getI18n('vxe.custom.cstmConfirmRestore'),
          className: 'vxe-table--ignore-clear',
          escClosable: true
        }).then(type => {
          if (type === 'confirm') {
            this.handleResetCustomEvent(evnt)
          }
        })
      } else {
        this.handleResetCustomEvent(evnt)
      }
    },
    resetPopupCustomEvent  (evnt: any) {
      if (VxeUI.modal) {
        VxeUI.modal.confirm({
          content: getI18n('vxe.custom.cstmConfirmRestore'),
          className: 'vxe-table--ignore-clear',
          escClosable: true
        }).then(type => {
          if (type === 'confirm') {
            this.resetCustomEvent(evnt)
          }
        })
      } else {
        this.resetCustomEvent(evnt)
      }
    },
    handleOptionCheck (column: any) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { customColumnList } = reactData
      const matchObj = XEUtils.findTree(customColumnList, item => item === column) as any
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every((column: any) => column.visible)
          parent.halfVisible = !parent.visible && parent.children.some((column: any) => column.visible || column.halfVisible)
          this.handleOptionCheck(parent)
        }
      }
    },
    changeCheckboxOption (column: any) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const customOpts = $xeTable.computeCustomOpts
      const isChecked = !column.renderVisible
      if (customOpts.immediate) {
        XEUtils.eachTree([column], (item) => {
          item.visible = isChecked
          item.renderVisible = isChecked
          item.halfVisible = false
        })
        reactData.isCustomStatus = true
        $xeTable.handleCustom()
        $xeTable.saveCustomStore('update:visible')
      } else {
        XEUtils.eachTree([column], (item) => {
          item.renderVisible = isChecked
          item.halfVisible = false
        })
      }
      this.handleOptionCheck(column)
      $xeTable.checkCustomStatus()
    },
    changeColumnWidth (column: VxeTableDefines.ColumnInfo) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const customOpts = $xeTable.computeCustomOpts
      if (customOpts.immediate) {
        if (column.renderResizeWidth !== column.renderWidth) {
          column.resizeWidth = column.renderResizeWidth
          column.renderWidth = column.renderResizeWidth
          reactData.isCustomStatus = true
          $xeTable.handleCustom()
          $xeTable.saveCustomStore('update:width')
        }
      }
    },
    changeFixedOption  (column: any, colFixed: any) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const isMaxFixedColumn = $xeTable.computeIsMaxFixedColumn
      const customOpts = $xeTable.computeCustomOpts
      if (customOpts.immediate) {
        if (column.renderFixed === colFixed) {
          XEUtils.eachTree([column], col => {
            col.fixed = ''
            col.renderFixed = ''
          })
        } else {
          if (!isMaxFixedColumn || column.renderFixed) {
            XEUtils.eachTree([column], col => {
              col.fixed = colFixed
              col.renderFixed = colFixed
            })
          }
        }
        reactData.isCustomStatus = true
        $xeTable.handleCustom()
        $xeTable.saveCustomStore('update:fixed')
      } else {
        if (column.renderFixed === colFixed) {
          XEUtils.eachTree([column], col => {
            col.renderFixed = ''
          })
        } else {
          if (!isMaxFixedColumn || column.renderFixed) {
            XEUtils.eachTree([column], col => {
              col.renderFixed = colFixed
            })
          }
        }
      }
    },
    allOptionEvent () {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

      $xeTable.toggleCustomAllCheckbox()
    },
    sortMousedownEvent (evnt: MouseEvent) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

      const btnEl = evnt.currentTarget as HTMLElement
      const cellEl = btnEl.parentElement as HTMLElement
      const tdEl = cellEl.parentElement as HTMLElement
      const trEl = tdEl.parentElement as HTMLElement
      const colid = trEl.getAttribute('colid')
      const column = $xeTable.getColumnById(colid)
      trEl.draggable = true
      this.dragCol = column
      addClass(trEl, 'active--drag-origin')
    },
    sortMouseupEvent  (evnt: MouseEvent) {
      const btnEl = evnt.currentTarget as HTMLElement
      const cellEl = btnEl.parentElement as HTMLElement
      const tdEl = cellEl.parentElement as HTMLElement
      const trEl = tdEl.parentElement as HTMLElement
      hideDropTip(this)
      trEl.draggable = false
      this.dragCol = null
      removeClass(trEl, 'active--drag-origin')
    },
    sortDragstartEvent (evnt: any) {
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage(getTpImg(), 0, 0)
      }
    },
    sortDragendEvent (evnt: any) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
      const tableProps = $xeTable
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { dragCol, prevDragPos, prevDragCol, prevDragToChild } = this

      const { mouseConfig } = tableProps
      const { customColumnList } = reactData
      const { collectColumn } = internalData
      const customOpts = $xeTable.computeCustomOpts
      const { immediate } = customOpts
      const trEl = evnt.currentTarget as HTMLElement
      const columnDragOpts = $xeTable.computeColumnDragOpts
      const { isCrossDrag, isSelfToChildDrag, isToChildDrag, dragEndMethod } = columnDragOpts
      const dragOffsetIndex = prevDragPos === 'bottom' ? 1 : 0
      if (prevDragCol && dragCol) {
        // 判断是否有拖动
        if (prevDragCol !== dragCol) {
          const dragColumn: VxeTableDefines.ColumnInfo = dragCol
          const newColumn: VxeTableDefines.ColumnInfo = prevDragCol
          Promise.resolve(
            dragEndMethod
              ? dragEndMethod({
                oldColumn: dragColumn,
                newColumn,
                dragColumn,
                dragPos: prevDragPos as any,
                dragToChild: !!prevDragToChild,
                offsetIndex: dragOffsetIndex
              })
              : true
          ).then((status) => {
            if (!status) {
              return
            }

            let oafIndex = -1
            let nafIndex = -1

            const oldAllMaps: Record<string, any> = {}
            XEUtils.eachTree([dragColumn], column => {
              oldAllMaps[column.id] = column
            })

            let isSelfToChildStatus = false

            // 只有实时拖拽支持跨层级
            if (immediate) {
              if (dragColumn.parentId && newColumn.parentId) {
              // 子到子

                if (!isCrossDrag) {
                  return
                }
                if (oldAllMaps[newColumn.id]) {
                  isSelfToChildStatus = true
                  if (!(isCrossDrag && isSelfToChildDrag)) {
                    if (VxeUI.modal) {
                      VxeUI.modal.message({
                        status: 'error',
                        content: getI18n('vxe.error.treeDragChild')
                      })
                    }
                    return
                  }
                }
              } else if (dragColumn.parentId) {
              // 子到根

                if (!isCrossDrag) {
                  return
                }
              } else if (newColumn.parentId) {
              // 根到子

                if (!isCrossDrag) {
                  return
                }
                if (oldAllMaps[newColumn.id]) {
                  isSelfToChildStatus = true
                  if (!(isCrossDrag && isSelfToChildDrag)) {
                    if (VxeUI.modal) {
                      VxeUI.modal.message({
                        status: 'error',
                        content: getI18n('vxe.error.treeDragChild')
                      })
                    }
                    return
                  }
                }
              } else {
              // 根到根
              }

              const oldewMatchRest = XEUtils.findTree(collectColumn as VxeTableDefines.ColumnInfo[], item => item.id === dragColumn.id)

              // 改变层级
              if (isSelfToChildStatus && (isCrossDrag && isSelfToChildDrag)) {
                if (oldewMatchRest) {
                  const { items: oCols, index: oIndex } = oldewMatchRest
                  const childList = dragColumn.children || []
                  childList.forEach(column => {
                    column.parentId = dragColumn.parentId
                  })
                  oCols.splice(oIndex, 1, ...childList)
                  dragColumn.children = []
                }
              } else {
                if (oldewMatchRest) {
                  const { items: oCols, index: oIndex, parent: oParent } = oldewMatchRest
                  oCols.splice(oIndex, 1)
                  if (!oParent) {
                    oafIndex = oIndex
                  }
                }
              }

              const newMatchRest = XEUtils.findTree(collectColumn as VxeTableDefines.ColumnInfo[], item => item.id === newColumn.id)
              if (newMatchRest) {
                const { items: nCols, index: nIndex, parent: nParent } = newMatchRest
                // 转子级
                if ((isCrossDrag && isToChildDrag) && prevDragToChild) {
                  dragColumn.parentId = newColumn.id
                  newColumn.children = (newColumn.children || []).concat([dragColumn])
                } else {
                  dragColumn.parentId = newColumn.parentId
                  nCols.splice(nIndex + dragOffsetIndex, 0, dragColumn)
                }
                if (!nParent) {
                  nafIndex = nIndex
                }
              }

              XEUtils.eachTree(collectColumn, (column, index, items, path, parent) => {
                if (!parent) {
                  const sortIndex = index + 1
                  column.renderSortNumber = sortIndex
                }
              })
            } else {
              oafIndex = XEUtils.findIndexOf(customColumnList, item => item.id === dragColumn.id)
              customColumnList.splice(oafIndex, 1)

              nafIndex = XEUtils.findIndexOf(customColumnList, item => item.id === newColumn.id)
              customColumnList.splice(nafIndex + dragOffsetIndex, 0, dragColumn)
            }

            reactData.isDragColMove = true
            if (mouseConfig) {
              if ($xeTable.clearSelected) {
                $xeTable.clearSelected()
              }
              if ($xeTable.clearCellAreas) {
                $xeTable.clearCellAreas()
                $xeTable.clearCopyCellArea()
              }
            }

            $xeTable.dispatchEvent('column-dragend', {
              oldColumn: dragColumn,
              newColumn,
              dragColumn,
              dragPos: prevDragPos,
              offsetIndex: dragOffsetIndex,
              _index: {
                newIndex: nafIndex,
                oldIndex: oafIndex
              }
            }, evnt)

            if (immediate) {
              reactData.customColumnList = collectColumn.slice(0)
              $xeTable.handleColDragSwapColumn()
            }
          }).catch(() => {
          })
        }
      }

      hideDropTip(this)
      this.dragCol.value = null
      trEl.draggable = false
      trEl.removeAttribute('drag-pos')
      removeClass(trEl, 'active--drag-target')
      removeClass(trEl, 'active--drag-origin')
    },
    sortDragoverEvent  (evnt: DragEvent) {
      const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

      const { dragCol } = this

      const customOpts = $xeTable.computeCustomOpts
      const { immediate } = customOpts
      const columnDragOpts = $xeTable.computeColumnDragOpts
      const { isCrossDrag, isToChildDrag } = columnDragOpts
      const optEl = evnt.currentTarget as HTMLElement
      const isControlKey = hasControlKey(evnt)
      const colid = optEl.getAttribute('colid')
      const column = $xeTable.getColumnById(colid)
      // 是否移入有效列
      if (column && (isCrossDrag || column.level === 1)) {
        evnt.preventDefault()
        const offsetY = evnt.clientY - optEl.getBoundingClientRect().y
        const dragPos = offsetY < optEl.clientHeight / 2 ? 'top' : 'bottom'
        if (
          (dragCol && dragCol.id === column.id) ||
          (!isCrossDrag && column.level > 1) ||
          (!immediate && column.level > 1) ||
          column.renderFixed
        ) {
          showDropTip(this, evnt, optEl, false, dragPos)
          return
        }
        this.prevDragToChild = !!((isCrossDrag && isToChildDrag) && isControlKey && immediate)
        this.prevDragCol = column
        this.prevDragPos = dragPos
        showDropTip(this, evnt, optEl, true, dragPos)
      }
    }
  } as any
}
