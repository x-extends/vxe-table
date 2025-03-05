import { defineComponent, h, inject, ref, Ref, VNode, PropType, nextTick, TransitionGroup, createCommentVNode } from 'vue'
import { VxeUI } from '../../../ui'
import { formatText } from '../../../ui/src/utils'
import { getTpImg, addClass, removeClass } from '../../../ui/src/dom'
import { errLog } from '../../../ui/src/log'
import XEUtils from 'xe-utils'

import type { VxeModalComponent, VxeDrawerComponent, VxeButtonComponent, VxeRadioGroupComponent, VxeInputComponent, VxeButtonEvents } from 'vxe-pc-ui'
import type { VxeTableDefines, VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeColumnPropTypes } from '../../../../types'

const { getI18n, getIcon, renderEmptyElement } = VxeUI

export default defineComponent({
  name: 'TableCustomPanel',
  props: {
    customStore: {
      type: Object as PropType<VxeTableDefines.VxeTableCustomStoreObj>,
      default: () => ({})
    }
  },
  setup (props) {
    const VxeUIModalComponent = VxeUI.getComponent<VxeModalComponent>('VxeModal')
    const VxeUIDrawerComponent = VxeUI.getComponent<VxeDrawerComponent>('VxeDrawer')
    const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')
    const VxeUINumberInputComponent = VxeUI.getComponent<VxeInputComponent>('VxeNumberInput')
    const VxeUIRadioGroupComponent = VxeUI.getComponent<VxeRadioGroupComponent>('VxeRadioGroup')

    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { props: tableProps, reactData, internalData } = $xeTable
    const { computeCustomOpts, computeColumnDragOpts, computeColumnOpts, computeIsMaxFixedColumn, computeResizableOpts } = $xeTable.getComputeMaps()

    const refElem = ref() as Ref<HTMLDivElement>
    const bodyElemRef = ref() as Ref<HTMLDivElement>
    const refDragLineElem = ref() as Ref<HTMLDivElement>
    const refDragTipElem = ref() as Ref<HTMLDivElement>

    const dragColumnRef = ref<VxeTableDefines.ColumnInfo | null>()

    let prevDragCol: VxeTableDefines.ColumnInfo | undefined
    let prevDragToChild = false
    let prevDragPos: any

    const handleWrapperMouseenterEvent = (evnt: Event) => {
      const { customStore } = props
      customStore.activeWrapper = true
      $xeTable.customOpenEvent(evnt)
    }

    const handleWrapperMouseleaveEvent = (evnt: Event) => {
      const { customStore } = props
      customStore.activeWrapper = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          $xeTable.customCloseEvent(evnt)
        }
      }, 300)
    }

    const confirmCustomEvent: VxeButtonEvents.Click = ({ $event }) => {
      reactData.isCustomStatus = true
      $xeTable.saveCustom()
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('confirm', $event)
    }

    const cancelCloseEvent: VxeButtonEvents.Click = ({ $event }) => {
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('close', $event)
    }

    const cancelCustomEvent: VxeButtonEvents.Click = ({ $event }) => {
      $xeTable.cancelCustom()
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('cancel', $event)
    }

    const handleResetCustomEvent = (evnt: Event) => {
      $xeTable.resetCustom(true)
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('reset', evnt)
    }

    const resetCustomEvent: VxeButtonEvents.Click = ({ $event }) => {
      if (VxeUI.modal) {
        VxeUI.modal.confirm({
          content: getI18n('vxe.custom.cstmConfirmRestore'),
          className: 'vxe-table--ignore-clear',
          escClosable: true
        }).then(type => {
          if (type === 'confirm') {
            handleResetCustomEvent($event)
          }
        })
      } else {
        handleResetCustomEvent($event)
      }
    }

    const handleOptionCheck = (column: VxeTableDefines.ColumnInfo) => {
      const { customColumnList } = reactData
      const matchObj = XEUtils.findTree(customColumnList, item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.renderVisible = parent.children.every((column) => column.renderVisible)
          parent.halfVisible = !parent.renderVisible && parent.children.some((column) => column.renderVisible || column.halfVisible)
          handleOptionCheck(parent)
        }
      }
    }

    const changeCheckboxOption = (column: VxeTableDefines.ColumnInfo) => {
      const isChecked = !column.renderVisible
      const customOpts = computeCustomOpts.value
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
      handleOptionCheck(column)
      $xeTable.checkCustomStatus()
    }

    const changeColumnWidth = (column: VxeTableDefines.ColumnInfo) => {
      const customOpts = computeCustomOpts.value
      if (customOpts.immediate) {
        if (column.renderResizeWidth !== column.renderWidth) {
          column.resizeWidth = column.renderResizeWidth
          column.renderWidth = column.renderResizeWidth
          reactData.isCustomStatus = true
          $xeTable.handleCustom()
          $xeTable.saveCustomStore('update:width')
        }
      }
    }

    const changeFixedOption = (column: VxeTableDefines.ColumnInfo, colFixed: VxeColumnPropTypes.Fixed) => {
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const customOpts = computeCustomOpts.value
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
    }

    const allOptionEvent = () => {
      $xeTable.toggleCustomAllCheckbox()
    }

    const showDropTip = (evnt: DragEvent | MouseEvent, optEl: HTMLElement | null, showLine: boolean, dragPos: string) => {
      const el = bodyElemRef.value
      if (!el) {
        return
      }
      const wrapperRect = el.getBoundingClientRect()
      if (optEl) {
        const dragLineEl = refDragLineElem.value
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
      const dragTipEl = refDragTipElem.value
      if (dragTipEl) {
        dragTipEl.style.display = 'block'
        dragTipEl.style.top = `${Math.min(el.clientHeight + el.scrollTop - dragTipEl.clientHeight, evnt.clientY + el.scrollTop - wrapperRect.y)}px`
        dragTipEl.style.left = `${Math.min(el.clientWidth + el.scrollLeft - dragTipEl.clientWidth, evnt.clientX + el.scrollLeft - wrapperRect.x)}px`
        dragTipEl.setAttribute('drag-status', showLine ? (prevDragToChild ? 'sub' : 'normal') : 'disabled')
      }
    }

    const hideDropTip = () => {
      const dragTipEl = refDragTipElem.value
      const dragLineEl = refDragLineElem.value
      if (dragTipEl) {
        dragTipEl.style.display = ''
      }
      if (dragLineEl) {
        dragLineEl.style.display = ''
      }
    }

    const sortMousedownEvent = (evnt: DragEvent) => {
      const btnEl = evnt.currentTarget as HTMLElement
      const cellEl = btnEl.parentElement as HTMLElement
      const tdEl = cellEl.parentElement as HTMLElement
      const trEl = tdEl.parentElement as HTMLElement
      const colid = trEl.getAttribute('colid')
      const column = $xeTable.getColumnById(colid)
      trEl.draggable = true
      dragColumnRef.value = column
      addClass(trEl, 'active--drag-origin')
    }

    const sortMouseupEvent = (evnt: MouseEvent) => {
      const btnEl = evnt.currentTarget as HTMLElement
      const cellEl = btnEl.parentElement as HTMLElement
      const tdEl = cellEl.parentElement as HTMLElement
      const trEl = tdEl.parentElement as HTMLElement
      hideDropTip()
      trEl.draggable = false
      dragColumnRef.value = null
      removeClass(trEl, 'active--drag-origin')
    }

    const sortDragstartEvent = (evnt: DragEvent) => {
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage(getTpImg(), 0, 0)
      }
    }

    const sortDragendEvent = (evnt: DragEvent) => {
      const { mouseConfig } = tableProps
      const { customColumnList } = reactData
      const { collectColumn } = internalData
      const customOpts = computeCustomOpts.value
      const { immediate } = customOpts
      const trEl = evnt.currentTarget as HTMLElement
      const dragCol = dragColumnRef.value
      const columnDragOpts = computeColumnDragOpts.value
      const { isCrossDrag, isSelfToChildDrag, isToChildDrag, dragEndMethod } = columnDragOpts
      const dragOffsetIndex = prevDragPos === 'bottom' ? 1 : 0
      if (prevDragCol && dragCol) {
        // 判断是否有拖动
        if (prevDragCol !== dragCol) {
          const dragColumn = dragCol
          const newColumn = prevDragCol
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

              const oldewMatchRest = XEUtils.findTree(collectColumn, item => item.id === dragColumn.id)

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

              const newMatchRest = XEUtils.findTree(collectColumn, item => item.id === newColumn.id)
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

      hideDropTip()
      dragColumnRef.value = null
      trEl.draggable = false
      trEl.removeAttribute('drag-pos')
      removeClass(trEl, 'active--drag-target')
      removeClass(trEl, 'active--drag-origin')
    }

    const sortDragoverEvent = (evnt: DragEvent) => {
      const customOpts = computeCustomOpts.value
      const { immediate } = customOpts
      const columnDragOpts = computeColumnDragOpts.value
      const { isCrossDrag, isToChildDrag } = columnDragOpts
      const optEl = evnt.currentTarget as HTMLElement
      const hasCtrlKey = evnt.ctrlKey
      const colid = optEl.getAttribute('colid')
      const column = $xeTable.getColumnById(colid)
      const dragCol = dragColumnRef.value
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
          showDropTip(evnt, optEl, false, dragPos)
          return
        }
        prevDragToChild = !!((isCrossDrag && isToChildDrag) && hasCtrlKey && immediate)
        prevDragCol = column
        prevDragPos = dragPos
        showDropTip(evnt, optEl, true, dragPos)
      }
    }

    const renderDragTip = () => {
      const dragCol = dragColumnRef.value
      const columnDragOpts = computeColumnDragOpts.value
      return h('div', {}, [
        h('div', {
          ref: refDragLineElem,
          class: ['vxe-table-custom-popup--drag-line', {
            'is--guides': columnDragOpts.showGuidesStatus
          }]
        }),
        h('div', {
          ref: refDragTipElem,
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

    const renderSimplePanel = () => {
      const { customStore } = props
      const { isCustomStatus, customColumnList } = reactData
      const customOpts = computeCustomOpts.value
      const { immediate } = customOpts
      const columnDragOpts = computeColumnDragOpts.value
      const { maxHeight } = customStore
      const { checkMethod, visibleMethod, allowVisible, allowSort, allowFixed, trigger, placement } = customOpts
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const { isCrossDrag } = columnDragOpts
      const slots = customOpts.slots || {}
      const headerSlot = slots.header
      const topSlot = slots.top
      const bottomSlot = slots.bottom
      const defaultSlot = slots.default
      const footerSlot = slots.footer
      const colVNs: VNode[] = []
      const customWrapperOns: any = {}
      const isAllChecked = customStore.isAll
      const isAllIndeterminate = customStore.isIndeterminate
      // hover 触发
      if (trigger === 'hover') {
        customWrapperOns.onMouseenter = handleWrapperMouseenterEvent
        customWrapperOns.onMouseleave = handleWrapperMouseleaveEvent
      }
      const params = {
        $table: $xeTable,
        $grid: $xeTable.xegrid,
        columns: customColumnList,
        isAllChecked,
        isAllIndeterminate,
        isCustomStatus
      }
      XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
        const isVisible = visibleMethod ? visibleMethod({ column }) : true
        if (isVisible) {
          const isChecked = column.renderVisible
          const isIndeterminate = column.halfVisible
          const isColGroup = column.children && column.children.length
          const colTitle = formatText(column.getTitle(), 1)
          const isDisabled = checkMethod ? !checkMethod({ column }) : false
          const isHidden = !isChecked
          colVNs.push(
            h('li', {
              key: column.id,
              colid: column.id,
              class: ['vxe-table-custom--option', `level--${column.level}`, {
                'is--hidden': isDisabled || isHidden,
                'is--group': isColGroup
              }],
              onDragstart: sortDragstartEvent,
              onDragend: sortDragendEvent,
              onDragover: sortDragoverEvent
            }, [
              allowVisible
                ? h('div', {
                  class: ['vxe-table-custom--checkbox-option', {
                    'is--checked': isChecked,
                    'is--indeterminate': isIndeterminate,
                    'is--disabled': isDisabled
                  }],
                  title: getI18n('vxe.custom.setting.colVisible'),
                  onClick: () => {
                    if (!isDisabled) {
                      changeCheckboxOption(column)
                    }
                  }
                }, [
                  h('span', {
                    class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                  })
                ])
                : createCommentVNode(),
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
                      title: getI18n('vxe.custom.setting.sortHelpTip'),
                      ...(isDisabled || isHidden || column.renderFixed
                        ? {}
                        : {
                            onMousedown: sortMousedownEvent,
                            onMouseup: sortMouseupEvent
                          })
                    }, [
                      h('i', {
                        class: getIcon().TABLE_CUSTOM_SORT
                      })
                    ])
                  ])
                  : createCommentVNode(),
                column.type === 'html'
                  ? h('div', {
                    key: '1',
                    class: 'vxe-table-custom--checkbox-label',
                    innerHTML: colTitle
                  })
                  : h('div', {
                    key: '0',
                    class: 'vxe-table-custom--checkbox-label'
                  }, colTitle)
              ]),
              !parent && allowFixed
                ? h('div', {
                  class: 'vxe-table-custom--fixed-option'
                }, [
                  VxeUIButtonComponent
                    ? h(VxeUIButtonComponent, {
                      mode: 'text',
                      icon: column.renderFixed === 'left' ? getIcon().TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_LEFT,
                      status: column.renderFixed === 'left' ? 'primary' : '',
                      disabled: isDisabled || isHidden || (isMaxFixedColumn && !column.renderFixed),
                      title: getI18n(column.renderFixed === 'left' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedLeft'),
                      onClick: () => {
                        changeFixedOption(column, 'left')
                      }
                    })
                    : createCommentVNode(),
                  VxeUIButtonComponent
                    ? h(VxeUIButtonComponent, {
                      mode: 'text',
                      icon: column.renderFixed === 'right' ? getIcon().TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_RIGHT,
                      status: column.renderFixed === 'right' ? 'primary' : '',
                      disabled: isDisabled || isHidden || (isMaxFixedColumn && !column.renderFixed),
                      title: getI18n(column.renderFixed === 'right' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedRight'),
                      onClick: () => {
                        changeFixedOption(column, 'right')
                      }
                    })
                    : createCommentVNode()
                ])
                : createCommentVNode()
            ])
          )
        }
      })
      return h('div', {
        ref: refElem,
        key: 'simple',
        class: ['vxe-table-custom-wrapper', `placement--${placement}`, {
          'is--active': customStore.visible
        }],
        style: maxHeight && !['left', 'right'].includes(placement as string)
          ? {
              maxHeight: `${maxHeight}px`
            }
          : {}
      }, customStore.visible
        ? [
            h('div', {
              class: 'vxe-table-custom--header'
            }, headerSlot
              ? $xeTable.callSlot(headerSlot, params)
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
                          title: getI18n('vxe.table.allTitle'),
                          onClick: allOptionEvent
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
              ref: bodyElemRef,
              class: 'vxe-table-custom--body'
            }, [
              topSlot
                ? h('div', {
                  class: 'vxe-table-custom--panel-top'
                }, $xeTable.callSlot(topSlot, params))
                : renderEmptyElement($xeTable),
              defaultSlot
                ? h('div', {
                  class: 'vxe-table-custom--panel-body'
                }, $xeTable.callSlot(defaultSlot, params))
                : h(TransitionGroup, {
                  class: 'vxe-table-custom--panel-list',
                  name: 'vxe-table-custom--list',
                  tag: 'ul',
                  ...customWrapperOns
                }, {
                  default: () => colVNs
                }),
              bottomSlot
                ? h('div', {
                  class: 'vxe-table-custom--panel-bottom'
                }, $xeTable.callSlot(bottomSlot, params))
                : renderEmptyElement($xeTable),
              renderDragTip()
            ]),
            customOpts.showFooter
              ? h('div', {
                class: 'vxe-table-custom--footer'
              }, footerSlot
                ? $xeTable.callSlot(footerSlot, params)
                : [
                    h('div', {
                      class: 'vxe-table-custom--footer-buttons'
                    }, [
                      VxeUIButtonComponent
                        ? h(VxeUIButtonComponent, {
                          mode: 'text',
                          content: customOpts.resetButtonText || getI18n('vxe.table.customRestore'),
                          disabled: !isCustomStatus,
                          onClick: resetCustomEvent
                        })
                        : createCommentVNode(),
                      immediate
                        ? (VxeUIButtonComponent
                            ? h(VxeUIButtonComponent, {
                              mode: 'text',
                              content: customOpts.closeButtonText || getI18n('vxe.table.customClose'),
                              onClick: cancelCloseEvent
                            })
                            : createCommentVNode())
                        : (VxeUIButtonComponent
                            ? h(VxeUIButtonComponent, {
                              mode: 'text',
                              content: customOpts.cancelButtonText || getI18n('vxe.table.customCancel'),
                              onClick: cancelCustomEvent
                            })
                            : createCommentVNode()),
                      immediate
                        ? createCommentVNode()
                        : (VxeUIButtonComponent
                            ? h(VxeUIButtonComponent, {
                              mode: 'text',
                              status: 'primary',
                              content: customOpts.confirmButtonText || getI18n('vxe.table.customConfirm'),
                              onClick: confirmCustomEvent
                            })
                            : createCommentVNode())
                    ])
                  ])
              : null
          ]
        : [])
    }

    const renderPopupPanel = () => {
      const { customStore } = props
      const { resizable: allResizable } = tableProps
      const { isCustomStatus, customColumnList } = reactData
      const customOpts = computeCustomOpts.value
      const { immediate } = customOpts
      const columnDragOpts = computeColumnDragOpts.value
      const { mode, modalOptions, drawerOptions, allowVisible, allowSort, allowFixed, allowResizable, checkMethod, visibleMethod } = customOpts
      const columnOpts = computeColumnOpts.value
      const { maxFixedSize } = columnOpts
      const resizableOpts = computeResizableOpts.value
      const { minWidth: reMinWidth, maxWidth: reMaxWidth } = resizableOpts
      const modalOpts = Object.assign({}, modalOptions)
      const drawerOpts = Object.assign({}, drawerOptions)
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
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
        $grid: $xeTable.xegrid,
        columns: customColumnList,
        isAllChecked,
        isAllIndeterminate,
        isCustomStatus
      }
      XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
        const isVisible = visibleMethod ? visibleMethod({ column }) : true
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
          const isDisabled = checkMethod ? !checkMethod({ column }) : false
          const isHidden = !isChecked
          trVNs.push(
            h('tr', {
              key: column.id,
              colid: column.id,
              class: [`vxe-table-custom-popup--row level--${column.level}`, {
                'is--group': isColGroup
              }],
              onDragstart: sortDragstartEvent,
              onDragend: sortDragendEvent,
              onDragover: sortDragoverEvent
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
                    title: getI18n('vxe.custom.setting.colVisible'),
                    onClick: () => {
                      if (!isDisabled) {
                        changeCheckboxOption(column)
                      }
                    }
                  }, [
                    h('span', {
                      class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                    })
                  ])
                ])
                : createCommentVNode(),
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
                          title: getI18n('vxe.custom.setting.sortHelpTip'),
                          ...(isDisabled || isHidden || column.renderFixed
                            ? {}
                            : {
                                onMousedown: sortMousedownEvent,
                                onMouseup: sortMouseupEvent
                              })
                        }, [
                          h('i', {
                            class: getIcon().TABLE_CUSTOM_SORT
                          })
                        ])
                        : h('div', {
                          class: 'vxe-table-custom-popup--column-sort-placeholder'
                        }))
                    : createCommentVNode(),
                  column.type === 'html'
                    ? h('div', {
                      key: '1',
                      class: 'vxe-table-custom-popup--title',
                      innerHTML: colTitle
                    })
                    : h('div', {
                      key: '0',
                      class: 'vxe-table-custom-popup--title',
                      title: colTitle
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
                    : (
                        VxeUINumberInputComponent
                          ? h(VxeUINumberInputComponent, {
                            type: 'integer',
                            immediate: false,
                            disabled: isDisabled || isHidden,
                            modelValue: column.renderResizeWidth,
                            min: customMinWidth || undefined,
                            max: customMaxWidth || undefined,
                            'onUpdate:modelValue' (value: any) {
                              const width = Math.max(0, Number(value))
                              column.renderResizeWidth = width
                            },
                            onChange () {
                              changeColumnWidth(column)
                            }
                          })
                          : createCommentVNode()
                      )
                ])
                : createCommentVNode(),
              allowFixed
                ? h('td', {
                  class: 'vxe-table-custom-popup--column-item col--fixed'
                }, [
                  parent
                    ? h('span', '-')
                    : (
                        VxeUIRadioGroupComponent
                          ? h(VxeUIRadioGroupComponent, {
                            modelValue: column.renderFixed || '',
                            type: 'button',
                            size: 'mini',
                            disabled: isDisabled || isHidden,
                            options: [
                              { label: getI18n('vxe.custom.setting.fixedLeft'), value: 'left', disabled: isDisabled || isHidden || isMaxFixedColumn },
                              { label: getI18n('vxe.custom.setting.fixedUnset'), value: '', disabled: isDisabled || isHidden },
                              { label: getI18n('vxe.custom.setting.fixedRight'), value: 'right', disabled: isDisabled || isHidden || isMaxFixedColumn }
                            ],
                            'onUpdate:modelValue' (value: any) {
                              changeFixedOption(column, value)
                            }
                          })
                          : createCommentVNode()
                      )
                ])
                : createCommentVNode()
            ])
          )
        }
      })
      const scopedSlots: Record<string, any> = {
        default: () => {
          if (defaultSlot) {
            return $xeTable.callSlot(defaultSlot, params)
          }
          return h('div', {
            ref: bodyElemRef,
            class: 'vxe-table-custom-popup--body'
          }, [
            topSlot
              ? h('div', {
                class: 'vxe-table-custom-popup--table-top'
              }, $xeTable.callSlot(topSlot, params))
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
                    : createCommentVNode(),
                  h('col', {
                    class: 'vxe-table-custom-popup--table-col-title'
                  }),
                  allowResizable
                    ? h('col', {
                      class: 'vxe-table-custom-popup--table-col-width'
                    })
                    : createCommentVNode(),
                  allowFixed
                    ? h('col', {
                      class: 'vxe-table-custom-popup--table-col-fixed'
                    })
                    : createCommentVNode()
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
                          title: getI18n('vxe.table.allTitle'),
                          onClick: allOptionEvent
                        }, [
                          h('span', {
                            class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                          }),
                          h('span', {
                            class: 'vxe-checkbox--label'
                          }, getI18n('vxe.toolbar.customAll'))
                        ])
                      ])
                      : createCommentVNode(),
                    h('th', {}, getI18n('vxe.custom.setting.colTitle')),
                    allowResizable
                      ? h('th', {}, getI18n('vxe.custom.setting.colResizable'))
                      : createCommentVNode(),
                    allowFixed
                      ? h('th', {}, getI18n(`vxe.custom.setting.${maxFixedSize ? 'colFixedMax' : 'colFixed'}`, [maxFixedSize]))
                      : createCommentVNode()
                  ])
                ]),
                h(TransitionGroup, {
                  class: 'vxe-table-custom--panel-list',
                  tag: 'tbody',
                  name: 'vxe-table-custom--list'
                }, {
                  default: () => trVNs
                })
              ])
            ]),
            bottomSlot
              ? h('div', {
                class: 'vxe-table-custom-popup--table-bottom'
              }, $xeTable.callSlot(bottomSlot, params))
              : renderEmptyElement($xeTable),
            renderDragTip()
          ])
        },
        footer: () => {
          if (footerSlot) {
            return $xeTable.callSlot(footerSlot, params)
          }
          return h('div', {
            class: 'vxe-table-custom-popup--footer'
          }, [
            VxeUIButtonComponent
              ? h(VxeUIButtonComponent, {
                content: customOpts.resetButtonText || getI18n('vxe.custom.cstmRestore'),
                disabled: !isCustomStatus,
                onClick: resetCustomEvent
              })
              : createCommentVNode(),
            immediate
              ? (VxeUIButtonComponent
                  ? h(VxeUIButtonComponent, {
                    content: customOpts.closeButtonText || getI18n('vxe.table.customClose'),
                    onClick: cancelCloseEvent
                  })
                  : createCommentVNode())
              : (VxeUIButtonComponent
                  ? h(VxeUIButtonComponent, {
                    content: customOpts.cancelButtonText || getI18n('vxe.table.customCancel'),
                    onClick: cancelCustomEvent
                  })
                  : createCommentVNode()),
            immediate
              ? createCommentVNode()
              : (VxeUIButtonComponent
                  ? h(VxeUIButtonComponent, {
                    status: 'primary',
                    content: customOpts.confirmButtonText || getI18n('vxe.custom.cstmConfirm'),
                    onClick: confirmCustomEvent
                  })
                  : createCommentVNode())
          ])
        }
      }
      if (headerSlot) {
        scopedSlots.header = () => $xeTable.callSlot(headerSlot, params)
      }
      if (mode === 'drawer') {
        return VxeUIDrawerComponent
          ? h(VxeUIDrawerComponent, {
            key: 'drawer',
            className: ['vxe-table-custom-drawer-wrapper', 'vxe-table--ignore-clear', drawerOpts.className || ''].join(' '),
            modelValue: customStore.visible,
            title: drawerOpts.title || getI18n('vxe.custom.cstmTitle'),
            width: drawerOpts.width || Math.min(880, Math.floor(document.documentElement.clientWidth * 0.6)),
            position: drawerOpts.position,
            resize: !!drawerOpts.resize,
            escClosable: !!drawerOpts.escClosable,
            maskClosable: !!drawerOpts.maskClosable,
            destroyOnClose: true,
            showFooter: true,
            'onUpdate:modelValue' (value: any) {
              customStore.visible = value
            }
          }, scopedSlots)
          : createCommentVNode()
      }
      return VxeUIModalComponent
        ? h(VxeUIModalComponent, {
          key: 'modal',
          className: ['vxe-table-custom-modal-wrapper', 'vxe-table--ignore-clear', modalOpts.className || ''].join(' '),
          modelValue: customStore.visible,
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
          showFooter: true,
          'onUpdate:modelValue' (value: any) {
            customStore.visible = value
          }
        }, scopedSlots)
        : createCommentVNode()
    }

    const renderVN = () => {
      const customOpts = computeCustomOpts.value
      if (['modal', 'drawer', 'popup'].includes(`${customOpts.mode}`)) {
        return renderPopupPanel()
      }
      return renderSimplePanel()
    }

    nextTick(() => {
      const customOpts = computeCustomOpts.value
      const { mode } = customOpts
      if (!VxeUIModalComponent) {
        errLog('vxe.error.reqComp', ['vxe-modal'])
      }
      if (!VxeUIDrawerComponent && (mode === 'drawer')) {
        errLog('vxe.error.reqComp', ['vxe-drawer'])
      }
      if (!VxeUIButtonComponent) {
        errLog('vxe.error.reqComp', ['vxe-button'])
      }
      if (!VxeUINumberInputComponent) {
        errLog('vxe.error.reqComp', ['vxe-number-input'])
      }
      if (!VxeUIRadioGroupComponent) {
        errLog('vxe.error.reqComp', ['vxe-radio-group'])
      }
    })

    return renderVN
  }
})
