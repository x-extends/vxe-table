import { h, inject, ref, Ref, provide, VNode, PropType, nextTick, TransitionGroup, createCommentVNode, reactive } from 'vue'
import { defineVxeComponent } from '../../../ui/src/comp'
import { VxeUI } from '../../../ui'
import { formatText } from '../../../ui/src/utils'
import { getTpImg, addClass, removeClass, hasControlKey } from '../../../ui/src/dom'
import { errLog } from '../../../ui/src/log'
import XEUtils from 'xe-utils'

import type { VxeButtonEvents } from 'vxe-pc-ui'
import type { VxeTableDefines, VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeColumnPropTypes, VxeTableCustomPanelConstructor, TableCustomPanelReactData, TableCustomPanelInternalData, TableCustomPanelPrivateRef, TableCustomPanelPrivateComputed } from '../../../../types'

const { getI18n, getIcon, renderEmptyElement } = VxeUI

export default defineVxeComponent({
  name: 'TableCustomPanel',
  props: {
    customStore: {
      type: Object as PropType<VxeTableDefines.VxeTableCustomStoreObj>,
      default: () => ({})
    }
  },
  setup (props, context) {
    const xID = XEUtils.uniqueId()

    const VxeUIModalComponent = VxeUI.getComponent('VxeModal')
    const VxeUIDrawerComponent = VxeUI.getComponent('VxeDrawer')
    const VxeUIButtonComponent = VxeUI.getComponent('VxeButton')
    const VxeUINumberInputComponent = VxeUI.getComponent('VxeNumberInput')
    const VxeUIRadioGroupComponent = VxeUI.getComponent('VxeRadioGroup')

    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { props: tableProps, reactData: tableReactData, internalData: tableInternalData } = $xeTable
    const { computeCustomOpts, computeColumnDragOpts, computeColumnOpts, computeIsMaxFixedColumn, computeResizableOpts } = $xeTable.getComputeMaps()

    const refElem = ref() as Ref<HTMLDivElement>
    const refBodyWrapperElem = ref() as Ref<HTMLDivElement>
    const refCustomBodyElem = ref() as Ref<HTMLDivElement>
    const refDragLineElem = ref() as Ref<HTMLDivElement>
    const refDragTipElem = ref() as Ref<HTMLDivElement>

    const customPanelReactData = reactive<TableCustomPanelReactData>({
      dragCol: null,
      dragGroupField: null,
      dragAggFnCol: null,
      dragTipText: ''
    })

    const customPanelInternalData: TableCustomPanelInternalData = {
      // prevDragCol: undefined,
      // prevDragGroupField: undefined,
      // prevDragAggFnColid: undefined,
      // prevDragToChild: false,
      // prevDragPos: null
    }

    const refMaps: TableCustomPanelPrivateRef = {
      refElem,
      refBodyWrapperElem,
      refCustomBodyElem,
      refDragLineElem,
      refDragTipElem
    }

    const computeMaps: TableCustomPanelPrivateComputed = {
    }

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
      tableReactData.isCustomStatus = true
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
      const { customColumnList } = tableReactData
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

    const changeCheckboxOption = (column: VxeTableDefines.ColumnInfo, evnt: MouseEvent) => {
      const isChecked = !column.renderVisible
      const customOpts = computeCustomOpts.value
      if (customOpts.immediate) {
        XEUtils.eachTree([column], (item) => {
          item.visible = isChecked
          item.renderVisible = isChecked
          item.halfVisible = false
        })
        tableReactData.isCustomStatus = true
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
      $xeTable.dispatchEvent('custom-visible-change', { column, checked: isChecked }, evnt)
    }

    const changeColumnWidth = (column: VxeTableDefines.ColumnInfo) => {
      const customOpts = computeCustomOpts.value
      if (customOpts.immediate) {
        if (column.renderResizeWidth !== column.renderWidth) {
          column.resizeWidth = column.renderResizeWidth
          column.renderWidth = column.renderResizeWidth
          tableReactData.isCustomStatus = true
          $xeTable.handleCustom()
          $xeTable.saveCustomStore('update:width')
        }
      }
    }

    const changeFixedOption = (column: VxeTableDefines.ColumnInfo, colFixed: VxeColumnPropTypes.Fixed, evnt: Event) => {
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const customOpts = computeCustomOpts.value
      let targetFixed: VxeColumnPropTypes.Fixed = null
      if (customOpts.immediate) {
        if (column.renderFixed === colFixed) {
          targetFixed = ''
          XEUtils.eachTree([column], col => {
            col.fixed = ''
            col.renderFixed = ''
          })
        } else {
          if (!isMaxFixedColumn || column.renderFixed) {
            targetFixed = colFixed
            XEUtils.eachTree([column], col => {
              col.fixed = colFixed
              col.renderFixed = colFixed
            })
          }
        }
        tableReactData.isCustomStatus = true
        $xeTable.handleCustom()
        $xeTable.saveCustomStore('update:fixed')
      } else {
        if (column.renderFixed === colFixed) {
          targetFixed = ''
          XEUtils.eachTree([column], col => {
            col.renderFixed = ''
          })
        } else {
          if (!isMaxFixedColumn || column.renderFixed) {
            targetFixed = colFixed
            XEUtils.eachTree([column], col => {
              col.renderFixed = colFixed
            })
          }
        }
      }
      if (!targetFixed !== null) {
        $xeTable.dispatchEvent('custom-fixed-change', { column, fixed: targetFixed }, evnt)
      }
    }

    const allOptionEvent = (evnt: MouseEvent) => {
      const { customStore } = tableReactData
      const isAll = !customStore.isAll
      $xeTable.toggleCustomAllCheckbox()
      $xeTable.dispatchEvent('custom-visible-all', { checked: isAll }, evnt)
    }

    const showDropTip = (evnt: DragEvent | MouseEvent, optEl: HTMLElement | null, showLine: boolean, dragPos: string) => {
      const bodyWrapperElem = refBodyWrapperElem.value
      if (!bodyWrapperElem) {
        return
      }
      const customBodyElem = refCustomBodyElem.value
      if (!customBodyElem) {
        return
      }
      const { prevDragToChild } = customPanelInternalData
      const bodyWrapperRect = bodyWrapperElem.getBoundingClientRect()
      const customBodyRect = customBodyElem.getBoundingClientRect()
      const dragLineEl = refDragLineElem.value
      if (optEl) {
        if (dragLineEl) {
          if (showLine) {
            const optRect = optEl.getBoundingClientRect()
            dragLineEl.style.display = 'block'
            dragLineEl.style.left = `${Math.max(0, customBodyRect.x - bodyWrapperRect.x)}px`
            dragLineEl.style.top = `${Math.max(1, optRect.y + bodyWrapperElem.scrollTop - bodyWrapperRect.y)}px`
            dragLineEl.style.height = `${optRect.height}px`
            dragLineEl.style.width = `${optRect.width}px`
            dragLineEl.setAttribute('drag-pos', dragPos)
            dragLineEl.setAttribute('drag-to-child', prevDragToChild ? 'y' : 'n')
          } else {
            dragLineEl.style.display = ''
          }
        }
      } else {
        if (dragLineEl) {
          dragLineEl.style.display = 'node'
        }
      }
      const dragTipEl = refDragTipElem.value
      if (dragTipEl) {
        dragTipEl.style.display = 'block'
        dragTipEl.style.top = `${Math.min(bodyWrapperElem.clientHeight + bodyWrapperElem.scrollTop - dragTipEl.clientHeight, evnt.clientY + bodyWrapperElem.scrollTop - bodyWrapperRect.y)}px`
        dragTipEl.style.left = `${Math.min(bodyWrapperElem.clientWidth + bodyWrapperElem.scrollLeft - dragTipEl.clientWidth, evnt.clientX + bodyWrapperElem.scrollLeft - bodyWrapperRect.x)}px`
        dragTipEl.setAttribute('drag-status', showLine ? (prevDragToChild ? 'sub' : 'normal') : 'disabled')
      }
    }

    const updateColDropTipContent = () => {
      const { dragCol } = customPanelReactData
      const columnDragOpts = computeColumnDragOpts.value
      const { tooltipMethod } = columnDragOpts
      let tipContent = ''
      if (tooltipMethod) {
        const dtParams = {
          $table: $xeTable,
          column: dragCol as VxeTableDefines.ColumnInfo
        }
        tipContent = `${tooltipMethod(dtParams) || ''}`
      } else {
        tipContent = getI18n('vxe.custom.cstmDragTarget', [dragCol && dragCol.type !== 'html' ? dragCol.getTitle() : ''])
      }
      customPanelReactData.dragTipText = tipContent
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
      customPanelReactData.dragCol = column
      customPanelReactData.dragGroupField = null
      customPanelReactData.dragAggFnCol = null
      updateColDropTipContent()
      addClass(trEl, 'active--drag-origin')
    }

    const sortMouseupEvent = (evnt: MouseEvent) => {
      const btnEl = evnt.currentTarget as HTMLElement
      const cellEl = btnEl.parentElement as HTMLElement
      const tdEl = cellEl.parentElement as HTMLElement
      const trEl = tdEl.parentElement as HTMLElement
      hideDropTip()
      trEl.draggable = false
      customPanelReactData.dragCol = null
      customPanelReactData.dragGroupField = null
      customPanelReactData.dragAggFnCol = null
      removeClass(trEl, 'active--drag-origin')
    }

    const sortDragstartEvent = (evnt: DragEvent) => {
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage(getTpImg(), 0, 0)
      }
      customPanelInternalData.prevDragGroupField = null
      customPanelInternalData.prevDragAggFnColid = null
    }

    const sortDragendEvent = (evnt: DragEvent) => {
      const { mouseConfig } = tableProps
      const { customColumnList } = tableReactData
      const { collectColumn } = tableInternalData
      const customOpts = computeCustomOpts.value
      const { immediate } = customOpts
      const trEl = evnt.currentTarget as HTMLElement
      const columnDragOpts = computeColumnDragOpts.value
      const { isCrossDrag, isSelfToChildDrag, isToChildDrag, dragEndMethod } = columnDragOpts
      const { dragCol } = customPanelReactData
      const { prevDragCol, prevDragGroupField, prevDragAggFnColid, prevDragPos, prevDragToChild } = customPanelInternalData
      const dragOffsetIndex = prevDragPos === 'bottom' ? 1 : 0

      if (prevDragGroupField || prevDragAggFnColid) {
        if ($xeTable.handlePivotTableAggregatePanelDragendEvent) {
          $xeTable.handlePivotTableAggregatePanelDragendEvent(evnt)
        }
      } else if (prevDragCol && dragCol) {
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
              tableReactData.customColumnList = collectColumn.slice(0)
              $xeTable.handleColDragSwapColumn()
            }
          }).catch(() => {
          })
        }
      }

      hideDropTip()
      customPanelReactData.dragCol = null
      customPanelReactData.dragGroupField = null
      customPanelReactData.dragAggFnCol = null
      customPanelInternalData.prevDragGroupField = null
      customPanelInternalData.prevDragAggFnColid = null
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
      const isControlKey = hasControlKey(evnt)
      const colid = optEl.getAttribute('colid')
      const column = $xeTable.getColumnById(colid)
      const { dragCol } = customPanelReactData
      customPanelInternalData.prevDragGroupField = null
      customPanelInternalData.prevDragAggFnColid = null
      // 是否移入有效列
      if (column && (isCrossDrag || column.level === 1)) {
        evnt.preventDefault()
        const offsetY = evnt.clientY - optEl.getBoundingClientRect().y
        const dragPos = offsetY < optEl.clientHeight / 2 ? 'top' : 'bottom'
        if (
          !dragCol ||
          (dragCol && dragCol.id === column.id) ||
          (!isCrossDrag && column.level > 1) ||
          (!immediate && column.level > 1) ||
          column.renderFixed
        ) {
          showDropTip(evnt, optEl, false, dragPos)
          return
        }
        customPanelInternalData.prevDragToChild = !!((isCrossDrag && isToChildDrag) && isControlKey && immediate)
        customPanelInternalData.prevDragCol = column
        customPanelInternalData.prevDragPos = dragPos
        showDropTip(evnt, optEl, true, dragPos)
      }
    }

    const renderDragTip = () => {
      const { dragTipText } = customPanelReactData
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
                class: ['vxe-table-custom-popup--drag-tip-group-status', getIcon().TABLE_DRAG_STATUS_AGG_GROUP]
              }),
              h('span', {
                class: ['vxe-table-custom-popup--drag-tip-values-status', getIcon().TABLE_DRAG_STATUS_AGG_VALUES]
              }),
              h('span', {
                class: ['vxe-table-custom-popup--drag-tip-disabled-status', getIcon().TABLE_DRAG_DISABLED]
              })
            ]),
            h('div', {
              class: 'vxe-table-custom-popup--drag-tip-content'
            }, `${dragTipText || ''}`)
          ])
        ])
      ])
    }

    const renderSimplePanel = () => {
      const $xeGrid = $xeTable.xeGrid
      const tableProps = $xeTable.props

      const { customStore } = props
      const { treeConfig, rowGroupConfig, aggregateConfig } = tableProps
      const { isCustomStatus, customColumnList } = tableReactData
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
                  onClick: (evnt: MouseEvent) => {
                    if (!isDisabled) {
                      changeCheckboxOption(column, evnt)
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
                      onClick: ({ $event }) => {
                        changeFixedOption(column, 'left', $event)
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
                      onClick: ({ $event }) => {
                        changeFixedOption(column, 'right', $event)
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
        style: maxHeight && !['left', 'right'].includes(placement || '')
          ? {
              maxHeight: `${maxHeight}px`
            }
          : {}
      }, customStore.visible
        ? [
            h('div', {
              ref: refBodyWrapperElem,
              class: 'vxe-table-custom-simple--body-wrapper'
            }, [
              !treeConfig && (aggregateConfig || rowGroupConfig) && $xeTable.getPivotTableAggregateSimplePanel
                ? h($xeTable.getPivotTableAggregateSimplePanel(), {
                  customStore
                })
                : renderEmptyElement($xeTable),
              h('div', {
                ref: refCustomBodyElem,
                class: 'vxe-table-custom--handle-wrapper'
              }, [
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
                    : renderEmptyElement($xeTable)
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
              ]),
              renderDragTip()
            ])
          ]
        : [])
    }

    const renderPopupPanel = () => {
      const $xeGrid = $xeTable.xeGrid

      const { customStore } = props
      const { treeConfig, rowGroupConfig, aggregateConfig, resizable: allResizable } = tableProps
      const { isCustomStatus, customColumnList } = tableReactData
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
                    onClick: (evnt: MouseEvent) => {
                      if (!isDisabled) {
                        changeCheckboxOption(column, evnt)
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
                            onChange ({ label, $event }) {
                              changeFixedOption(column, label, $event)
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
          return h('div', {
            ref: refBodyWrapperElem,
            class: 'vxe-table-custom-popup--body-wrapper'
          }, defaultSlot
            ? $xeTable.callSlot(defaultSlot, params)
            : [
                h('div', {
                  ref: refCustomBodyElem,
                  class: 'vxe-table-custom-popup--handle-wrapper'
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
                ]),
                !treeConfig && (aggregateConfig || rowGroupConfig) && $xeTable.getPivotTableAggregatePopupPanel
                  ? h($xeTable.getPivotTableAggregatePopupPanel(), {
                    customStore
                  })
                  : renderEmptyElement($xeTable)
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
        errLog('vxe.error.reqComp', ['vxe-number-input'])
      }
      if (!VxeUIRadioGroupComponent) {
        errLog('vxe.error.reqComp', ['vxe-radio-group'])
      }
    })

    const $xeTableCustomPanel: VxeTableCustomPanelConstructor = {
      xID,
      props,
      context,
      reactData: customPanelReactData,
      internalData: customPanelInternalData,
      xeTable: $xeTable,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps,
      renderVN
    }

    provide('$xeTableCustomPanel', $xeTableCustomPanel)

    return $xeTableCustomPanel
  },
  render () {
    return this.renderVN()
  }
})
