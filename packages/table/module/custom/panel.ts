import { h, inject, ref, Ref, provide, VNode, PropType, nextTick, TransitionGroup, reactive, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../../ui/src/comp'
import { VxeUI } from '../../../ui'
import { formatText } from '../../../ui/src/utils'
import { getTpImg, addClass, removeClass, hasControlKey } from '../../../ui/src/dom'
import { createComponentLog } from '../../../ui/src/log'
import XEUtils from 'xe-utils'

import type { VxeButtonEvents, VxeButtonDefines } from 'vxe-pc-ui'
import type { VxeTableDefines, VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeColumnPropTypes, VxeTableCustomPanelConstructor, TableCustomPanelReactData, TableCustomPanelInternalData, TableCustomPanelPrivateRef, TableCustomPanelPrivateComputed } from '../../../../types'

const { errLog } = createComponentLog('table')

const { getI18n, getIcon, renderEmptyElement } = VxeUI

export function createInternalData (): TableCustomPanelInternalData {
  return {
    // teleportTo: undefined,
    // prevDragCol: undefined,
    // prevDragGroupField: undefined,
    // prevDragAggFnColid: undefined,
    // prevDragToChild: false,
    // prevDragPos: null,
    // customDragTime: null
  }
}

export default defineVxeComponent({
  name: 'TableCustomPanel',
  props: {
    customStore: {
      type: Object as PropType<VxeTableDefines.VxeTableCustomStoreObj>,
      default: () => ({} as VxeTableDefines.VxeTableCustomStoreObj)
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
    const { computeSize, computeCustomOpts, computeColumnDragOpts, computeColumnOpts, computeIsMaxFixedColumn, computeResizableOpts, computeAggregateOpts } = $xeTable.getComputeMaps()

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

    let customPanelInternalData = createInternalData()

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
      $xeTable.dispatchEvent('custom-confirm', {}, $event)
      $xeTable.emitCustomEvent('close', $event)
      $xeTable.dispatchEvent('custom-close', {}, $event)
    }

    const cancelCloseEvent: VxeButtonEvents.Click = ({ $event }) => {
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('close', $event)
      $xeTable.dispatchEvent('custom-close', {}, $event)
    }

    const cancelCustomEvent: VxeButtonEvents.Click = ({ $event }) => {
      $xeTable.cancelCustom()
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('cancel', $event)
      $xeTable.dispatchEvent('custom-cancel', {}, $event)
      $xeTable.emitCustomEvent('close', $event)
      $xeTable.dispatchEvent('custom-close', {}, $event)
    }

    const handleResetCustomEvent = (evnt: Event) => {
      $xeTable.resetCustom(true)
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('reset', evnt)
      $xeTable.dispatchEvent('custom-reset', {}, evnt)
      $xeTable.emitCustomEvent('close', evnt)
      $xeTable.dispatchEvent('custom-close', {}, evnt)
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
        const { parent: parentItem } = matchObj
        if (parentItem.children && parentItem.children.length) {
          parentItem.renderVisible = parentItem.children.every((column) => column.renderVisible)
          parentItem.halfVisible = !parentItem.renderVisible && parentItem.children.some((column) => column.renderVisible || column.halfVisible)
          handleOptionCheck(parentItem)
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
      if (targetFixed !== null) {
        $xeTable.dispatchEvent('custom-fixed-change', { column, fixed: targetFixed }, evnt)
      }
    }

    const changeAlignOption = (column: VxeTableDefines.ColumnInfo, targetAlign: VxeColumnPropTypes.Align, colProperty: 'align' | 'headerAlign' | 'footerAlign', renderProperty: 'renderAlign' | 'renderHeaderAlign' | 'renderFooterAlign', eName: 'custom-align-change' | 'custom-header-align-change' | 'custom-footer-align-change', evnt: Event) => {
      const customOpts = computeCustomOpts.value
      if (customOpts.immediate) {
        column[colProperty] = targetAlign
        column[renderProperty] = targetAlign
        tableReactData.isCustomStatus = true
        $xeTable.handleCustom()
        $xeTable.saveCustomStore(`update:${colProperty}`)
      } else {
        column[renderProperty] = targetAlign
      }
      $xeTable.dispatchEvent(eName, { column, [colProperty]: targetAlign }, evnt)
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
      const { customDragTime } = customPanelInternalData
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage(getTpImg(), 0, 0)
      }
      if (customDragTime) {
        clearTimeout(customDragTime)
      }
      tableReactData.isCustomDragStatus = true
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
      const { isCrossDrag, isPeerDrag, isSelfToChildDrag, isToChildDrag, dragEndMethod } = columnDragOpts
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

                if (isPeerDrag && !isCrossDrag) {
                  if (dragColumn.parentId !== newColumn.parentId) {
                    // 非同级
                    return
                  }
                } else {
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

              XEUtils.eachTree(collectColumn, (column, index, items, path, parentItem) => {
                if (!parentItem) {
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

            const csParams = {
              oldColumn: dragColumn,
              newColumn,
              dragColumn,
              dragPos: prevDragPos,
              offsetIndex: dragOffsetIndex,
              _index: {
                newIndex: nafIndex,
                oldIndex: oafIndex
              }
            }
            $xeTable.dispatchEvent('custom-sort-change', csParams, evnt)
            $xeTable.dispatchEvent('column-dragend', csParams, evnt)

            if (immediate) {
              tableReactData.customColumnList = collectColumn.slice(0)
              $xeTable.handleColDragSwapColumn()
            }
            clearDragAnimateStatus()
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
      const { showSortDragButton, allowSort, immediate } = customOpts
      const columnDragOpts = computeColumnDragOpts.value
      const { isCrossDrag, isPeerDrag, isToChildDrag } = columnDragOpts
      const optEl = evnt.currentTarget as HTMLElement
      const isControlKey = hasControlKey(evnt)
      const colid = optEl.getAttribute('colid')
      const column = $xeTable.getColumnById(colid)
      const { dragCol } = customPanelReactData
      customPanelInternalData.prevDragGroupField = null
      customPanelInternalData.prevDragAggFnColid = null
      // 是否移入有效列
      if (column && (isCrossDrag || isPeerDrag || column.level === 1)) {
        evnt.preventDefault()
        const offsetY = evnt.clientY - optEl.getBoundingClientRect().y
        const dragPos = offsetY < optEl.clientHeight / 2 ? 'top' : 'bottom'
        if (
          !dragCol ||
          !(showSortDragButton && allowSort) ||
          (dragCol && dragCol.id === column.id) ||
          (!isCrossDrag && (isPeerDrag ? dragCol.parentId !== column.parentId : column.level > 1)) ||
          (!immediate && column.level > 1) ||
          (!isCrossDrag && (isPeerDrag ? dragCol.parentId !== column.parentId : dragCol.level > 1)) ||
          (!immediate && dragCol.level > 1)
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

    const clearDragAnimateStatus = () => {
      customPanelInternalData.customDragTime = setTimeout(() => {
        tableReactData.isCustomDragStatus = false
        customPanelInternalData.customDragTime = undefined
      }, 350)
    }

    const sortMoveUpEvent = (evntParame: VxeButtonDefines.ClickEventParams, column: VxeTableDefines.ColumnInfo) => {
      const { customColumnList } = tableReactData
      const matchObj = XEUtils.findTree(customColumnList, item => item === column)
      if (matchObj) {
        const { item, items, index } = matchObj
        if (index > 0) {
          tableReactData.isCustomDragStatus = true
          nextTick(() => {
            items.splice(index, 1)
            items.splice(index - 1, 0, item)
            clearDragAnimateStatus()
          })
        }
      }
    }

    const sortMoveDnEvent = (evntParame: VxeButtonDefines.ClickEventParams, column: VxeTableDefines.ColumnInfo) => {
      const { customColumnList } = tableReactData
      const matchObj = XEUtils.findTree(customColumnList, item => item === column)
      if (matchObj) {
        const { item, items, index } = matchObj
        if (index < items.length - 1) {
          tableReactData.isCustomDragStatus = true
          nextTick(() => {
            items.splice(index, 1)
            items.splice(index + 1, 0, item)
            clearDragAnimateStatus()
          })
        }
      }
    }

    const sortMoveTopEvent = (evntParame: VxeButtonDefines.ClickEventParams, column: VxeTableDefines.ColumnInfo) => {
      const { customColumnList } = tableReactData
      const matchObj = XEUtils.findTree(customColumnList, item => item === column)
      if (matchObj) {
        const { item, items, index, parent: parentItem } = matchObj
        if (parentItem || index > 0) {
          tableReactData.isCustomDragStatus = true
          nextTick(() => {
            item.parentId = null
            items.splice(index, 1)
            customColumnList.unshift(item)
            clearDragAnimateStatus()
          })
        }
      }
    }

    const sortMoveBottomEvent = (evntParame: VxeButtonDefines.ClickEventParams, column: VxeTableDefines.ColumnInfo) => {
      const { customColumnList } = tableReactData
      const matchObj = XEUtils.findTree(customColumnList, item => item === column)
      if (matchObj) {
        const { item, items, index, parent: parentItem } = matchObj
        if (parentItem || index < items.length - 1) {
          tableReactData.isCustomDragStatus = true
          nextTick(() => {
            item.parentId = null
            items.splice(index, 1)
            customColumnList.push(item)
            clearDragAnimateStatus()
          })
        }
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
      const $xeGantt = $xeTable.xeGantt
      const tableProps = $xeTable.props

      const { customStore } = props
      const { treeConfig, rowGroupConfig, aggregateConfig } = tableProps
      const { isCustomStatus, customColumnList, isCustomDragStatus } = tableReactData
      const customOpts = computeCustomOpts.value
      const columnDragOpts = computeColumnDragOpts.value
      const { defPopupStyle } = customStore
      const { immediate, checkMethod, visibleMethod, allowVisible, allowSort, allowFixed, allowGroup, allowValues, trigger, placement, showSortDragButton, showSortMoveButton, showSortPutButton } = customOpts
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const vSize = computeSize.value
      const { isCrossDrag, isPeerDrag } = columnDragOpts
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
        $gantt: $xeGantt,
        columns: customColumnList,
        isAllChecked,
        isAllIndeterminate,
        isCustomStatus
      }
      XEUtils.eachTree(customColumnList, (column, index, items, path, parentItem) => {
        const isVisible = visibleMethod ? visibleMethod({ $table: $xeTable, column }) : true
        if (isVisible) {
          const isChecked = column.renderVisible
          const isIndeterminate = column.halfVisible
          const isColGroup = column.children && column.children.length
          const colTitle = formatText(column.getTitle(), 1)
          const isDisabled = checkMethod ? !checkMethod({ $table: $xeTable, column }) : false
          const isHidden = !isChecked
          const showSortBtn = (isCrossDrag || isPeerDrag ? immediate : false) || column.level === 1
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
                : renderEmptyElement($xeTable),
              h('div', {
                class: 'vxe-table-custom--name-option'
              }, [
                (allowSort && showSortDragButton) || (allowGroup || allowValues)
                  ? (
                      showSortBtn || ((allowGroup || allowValues) && !isColGroup)
                        ? h('div', {
                          class: 'vxe-table-custom--sort-option'
                        }, [
                          h('span', {
                            class: ['vxe-table-custom--sort-btn', {
                              'is--disabled': isHidden
                            }],
                            title: getI18n('vxe.custom.setting.sortHelpTip'),
                            ...(isHidden
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
                        : renderEmptyElement($xeTable)
                    )
                  : renderEmptyElement($xeTable),
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
              showSortBtn && (showSortMoveButton || showSortPutButton)
                ? h('div', {
                  class: 'vxe-table-custom--move-btn-option'
                }, VxeUIButtonComponent
                  ? [
                      showSortMoveButton
                        ? h(VxeUIButtonComponent, {
                          mode: 'text',
                          icon: 'vxe-icon-arrows-up',
                          title: getI18n('vxe.custom.setting.moveUpTitle'),
                          disabled: index <= 0,
                          onClick (evntParame) {
                            sortMoveUpEvent(evntParame, column)
                          }
                        })
                        : renderEmptyElement($xeTable),
                      showSortMoveButton
                        ? h(VxeUIButtonComponent, {
                          mode: 'text',
                          icon: 'vxe-icon-arrows-down',
                          title: getI18n('vxe.custom.setting.moveDnTitle'),
                          disabled: index >= items.length - 1,
                          onClick (evntParame) {
                            sortMoveDnEvent(evntParame, column)
                          }
                        })
                        : renderEmptyElement($xeTable),
                      showSortPutButton && !parentItem
                        ? h(VxeUIButtonComponent, {
                          mode: 'text',
                          icon: 'vxe-icon-top',
                          title: getI18n('vxe.custom.setting.putTopTitle'),
                          disabled: index <= 0,
                          onClick (evntParame) {
                            sortMoveTopEvent(evntParame, column)
                          }
                        })
                        : renderEmptyElement($xeTable),
                      showSortPutButton && !parentItem
                        ? h(VxeUIButtonComponent, {
                          mode: 'text',
                          icon: 'vxe-icon-bottom',
                          title: getI18n('vxe.custom.setting.putBottomTitle'),
                          disabled: index >= items.length - 1,
                          onClick (evntParame) {
                            sortMoveBottomEvent(evntParame, column)
                          }
                        })
                        : renderEmptyElement($xeTable)
                    ]
                  : [])
                : renderEmptyElement($xeTable),
              !parentItem && allowFixed
                ? h('div', {
                  class: 'vxe-table-custom--fixed-option'
                }, VxeUIButtonComponent
                  ? [
                      h(VxeUIButtonComponent, {
                        mode: 'text',
                        icon: column.renderFixed === 'left' ? getIcon().TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_LEFT,
                        status: column.renderFixed === 'left' ? 'primary' : '',
                        disabled: isHidden || (isMaxFixedColumn && !column.renderFixed),
                        title: getI18n(column.renderFixed === 'left' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedLeft'),
                        onClick: ({ $event }) => {
                          changeFixedOption(column, 'left', $event)
                        }
                      }),
                      h(VxeUIButtonComponent, {
                        mode: 'text',
                        icon: column.renderFixed === 'right' ? getIcon().TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_RIGHT,
                        status: column.renderFixed === 'right' ? 'primary' : '',
                        disabled: isHidden || (isMaxFixedColumn && !column.renderFixed),
                        title: getI18n(column.renderFixed === 'right' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedRight'),
                        onClick: ({ $event }) => {
                          changeFixedOption(column, 'right', $event)
                        }
                      })
                    ]
                  : [])
                : renderEmptyElement($xeTable)
            ])
          )
        }
      })
      return h('div', {
        ref: refElem,
        key: 'simple',
        class: ['vxe-table-custom-wrapper', `placement--${placement}`, {
          [`size--${vSize}`]: vSize,
          'is--active': customStore.visible
        }],
        style: defPopupStyle
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
                      name: isCustomDragStatus ? 'vxe-table-custom--list' : '',
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
                            : renderEmptyElement($xeTable),
                          immediate
                            ? (VxeUIButtonComponent
                                ? h(VxeUIButtonComponent, {
                                  mode: 'text',
                                  content: customOpts.closeButtonText || getI18n('vxe.table.customClose'),
                                  onClick: cancelCloseEvent
                                })
                                : renderEmptyElement($xeTable))
                            : (VxeUIButtonComponent
                                ? h(VxeUIButtonComponent, {
                                  mode: 'text',
                                  content: customOpts.cancelButtonText || getI18n('vxe.table.customCancel'),
                                  onClick: cancelCustomEvent
                                })
                                : renderEmptyElement($xeTable)),
                          immediate
                            ? renderEmptyElement($xeTable)
                            : (VxeUIButtonComponent
                                ? h(VxeUIButtonComponent, {
                                  mode: 'text',
                                  status: 'primary',
                                  content: customOpts.confirmButtonText || getI18n('vxe.table.customConfirm'),
                                  onClick: confirmCustomEvent
                                })
                                : renderEmptyElement($xeTable))
                        ])
                      ])
                  : null
              ]),
              renderDragTip()
            ])
          ]
        : [])
    }

    const renderPopupBodys = () => {
      const { resizable: allResizable } = tableProps
      const { customColumnList } = tableReactData
      const customOpts = computeCustomOpts.value
      const columnDragOpts = computeColumnDragOpts.value
      const { immediate, showSortDragButton, showSortMoveButton, showSortPutButton, allowVisible, allowSort, allowFixed, allowAlign, allowHeaderAlign, allowFooterAlign, allowResizable, allowGroup, allowValues, checkMethod, visibleMethod } = customOpts
      const columnOpts = computeColumnOpts.value
      const resizableOpts = computeResizableOpts.value
      const { minWidth: reMinWidth, maxWidth: reMaxWidth } = resizableOpts
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const { isCrossDrag, isPeerDrag } = columnDragOpts

      const trVNs: VNode[] = []
      XEUtils.eachTree(customColumnList, (column, index, items, path, parentItem) => {
        const isVisible = visibleMethod ? visibleMethod({ $table: $xeTable, column }) : true
        if (isVisible) {
          // 默认继承调整宽度
          let customMinWidth = 0
          let customMaxWidth = 0
          if (allowResizable) {
            const resizeParams = {
              $table: $xeTable,
              column,
              columnIndex: $xeTable.getColumnIndex(column),
              $columnIndex: $xeTable.getVMColumnIndex(column),
              _columnIndex: $xeTable.getVTColumnIndex(column),
              rowIndex: -1,
              _rowIndex: -1,
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
          const showSortBtn = (isCrossDrag || isPeerDrag ? immediate : false) || column.level === 1

          const alignList = [
            { icon: getIcon().TABLE_CUSTOM_ALIGN_LEFT, value: 'left', title: getI18n('vxe.custom.setting.anLeftTitle'), disabled: isHidden },
            { icon: getIcon().TABLE_CUSTOM_ALIGN_CENTER, value: 'center', title: getI18n('vxe.custom.setting.anCenterTitle'), disabled: isHidden },
            { icon: getIcon().TABLE_CUSTOM_ALIGN_RIGHT, value: 'right', title: getI18n('vxe.custom.setting.anRightTitle'), disabled: isHidden }
          ]

          const tdVNs: VNode[] = []
          if (allowVisible) {
            tdVNs.push(
              h('td', {
                key: 'av',
                class: 'vxe-table-custom-popup--column-td col--visible'
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
            )
          }
          tdVNs.push(
            h('td', {
              key: 'at',
              class: 'vxe-table-custom-popup--column-td col--name'
            }, [
              h('div', {
                class: 'vxe-table-custom-popup--name'
              }, [
                (allowSort && showSortDragButton) || (allowGroup || allowValues)
                  ? (
                      showSortBtn || ((allowGroup || allowValues) && !isColGroup)
                        ? h('div', {
                          class: ['vxe-table-custom-popup--column-sort-btn', {
                            'is--disabled': isHidden
                          }],
                          title: getI18n('vxe.custom.setting.sortHelpTip'),
                          ...(isHidden
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
                        })
                    )
                  : renderEmptyElement($xeTable),
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
                  }, colTitle),
                showSortBtn && (showSortMoveButton || showSortPutButton)
                  ? h('div', {
                    class: 'vxe-table-custom-popup--move-btn'
                  }, VxeUIButtonComponent
                    ? [
                        showSortMoveButton
                          ? h(VxeUIButtonComponent, {
                            mode: 'text',
                            icon: 'vxe-icon-arrows-up',
                            title: getI18n('vxe.custom.setting.moveUpTitle'),
                            disabled: index <= 0,
                            onClick (evntParame) {
                              sortMoveUpEvent(evntParame, column)
                            }
                          })
                          : renderEmptyElement($xeTable),
                        showSortMoveButton
                          ? h(VxeUIButtonComponent, {
                            mode: 'text',
                            icon: 'vxe-icon-arrows-down',
                            title: getI18n('vxe.custom.setting.moveDnTitle'),
                            disabled: index >= items.length - 1,
                            onClick (evntParame) {
                              sortMoveDnEvent(evntParame, column)
                            }
                          })
                          : renderEmptyElement($xeTable),
                        showSortPutButton && !parentItem
                          ? h(VxeUIButtonComponent, {
                            mode: 'text',
                            icon: 'vxe-icon-top',
                            title: getI18n('vxe.custom.setting.putTopTitle'),
                            disabled: index <= 0,
                            onClick (evntParame) {
                              sortMoveTopEvent(evntParame, column)
                            }
                          })
                          : renderEmptyElement($xeTable),
                        showSortPutButton && !parentItem
                          ? h(VxeUIButtonComponent, {
                            mode: 'text',
                            icon: 'vxe-icon-bottom',
                            title: getI18n('vxe.custom.setting.putBottomTitle'),
                            disabled: index >= items.length - 1,
                            onClick (evntParame) {
                              sortMoveBottomEvent(evntParame, column)
                            }
                          })
                          : renderEmptyElement($xeTable)
                      ]
                    : [])
                  : renderEmptyElement($xeTable)
              ])
            ])
          )
          if (allowResizable) {
            tdVNs.push(
              h('td', {
                key: 'aw',
                class: 'vxe-table-custom-popup--column-td col--resizable'
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
                          disabled: isHidden,
                          modelValue: column.renderResizeWidth,
                          min: customMinWidth || 0,
                          max: customMaxWidth || 9999,
                          'onUpdate:modelValue' (value: any) {
                            const width = Math.max(0, Number(value))
                            column.renderResizeWidth = width
                          },
                          onChange () {
                            changeColumnWidth(column)
                          }
                        })
                        : renderEmptyElement($xeTable)
                    )
              ])
            )
          }
          if (allowFixed) {
            tdVNs.push(
              h('td', {
                key: 'af',
                class: 'vxe-table-custom-popup--column-td col--fixed'
              }, parentItem
                ? [h('span', '-')]
                : (VxeUIRadioGroupComponent
                    ? [
                        h(VxeUIButtonComponent, {
                          icon: column.renderFixed === 'left' ? getIcon().TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_LEFT,
                          status: column.renderFixed === 'left' ? 'primary' : '',
                          disabled: isHidden || (isMaxFixedColumn && !column.renderFixed),
                          title: getI18n(column.renderFixed === 'left' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedLeft'),
                          onClick: ({ $event }) => {
                            changeFixedOption(column, 'left', $event)
                          }
                        }),
                        h(VxeUIButtonComponent, {
                          icon: column.renderFixed === 'right' ? getIcon().TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_RIGHT,
                          status: column.renderFixed === 'right' ? 'primary' : '',
                          disabled: isHidden || (isMaxFixedColumn && !column.renderFixed),
                          title: getI18n(column.renderFixed === 'right' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedRight'),
                          onClick: ({ $event }) => {
                            changeFixedOption(column, 'right', $event)
                          }
                        })
                      ]
                    : []
                  )
              )
            )
          }
          if (allowAlign) {
            tdVNs.push(
              h('td', {
                key: 'aa',
                class: 'vxe-table-custom-popup--column-td col--align'
              }, VxeUIRadioGroupComponent
                ? [
                    h(VxeUIRadioGroupComponent, {
                      modelValue: column.renderAlign || '',
                      type: 'button',
                      strict: false,
                      disabled: isHidden,
                      options: alignList,
                      onChange ({ value, $event }) {
                        changeAlignOption(column, value, 'align', 'renderAlign', 'custom-align-change', $event)
                      }
                    })
                  ]
                : []
              )
            )
          }
          if (allowHeaderAlign) {
            tdVNs.push(
              h('td', {
                key: 'aha',
                class: 'vxe-table-custom-popup--column-td col--header-align'
              }, isColGroup
                ? [h('span', '-')]
                : (VxeUIRadioGroupComponent
                    ? [
                        h(VxeUIRadioGroupComponent, {
                          modelValue: column.renderHeaderAlign || '',
                          type: 'button',
                          strict: false,
                          disabled: isHidden,
                          options: alignList,
                          onChange ({ value, $event }) {
                            changeAlignOption(column, value, 'headerAlign', 'renderHeaderAlign', 'custom-header-align-change', $event)
                          }
                        })
                      ]
                    : []
                  )
              )
            )
          }
          if (allowFooterAlign) {
            tdVNs.push(
              h('td', {
                key: 'afa',
                class: 'vxe-table-custom-popup--column-td col--footer-align'
              }, isColGroup
                ? [h('span', '-')]
                : (VxeUIRadioGroupComponent
                    ? [
                        h(VxeUIRadioGroupComponent, {
                          modelValue: column.renderFooterAlign || '',
                          type: 'button',
                          strict: false,
                          disabled: isHidden,
                          options: alignList,
                          onChange ({ value, $event }) {
                            changeAlignOption(column, value, 'footerAlign', 'renderFooterAlign', 'custom-footer-align-change', $event)
                          }
                        })
                      ]
                    : []
                  )
              )
            )
          }

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
            }, tdVNs)
          )
        }
      })
      return trVNs
    }

    const renderPopupPanel = () => {
      const $xeGrid = $xeTable.xeGrid
      const $xeGantt = $xeTable.xeGantt

      const { customStore } = props
      const { treeConfig, rowGroupConfig, aggregateConfig } = tableProps
      const { isCustomStatus, customColumnList } = tableReactData
      const vSize = computeSize.value
      const customOpts = computeCustomOpts.value
      const aggregateOpts = computeAggregateOpts.value
      const { panePopupStyle } = customStore
      const { placement: aggPlacement } = aggregateOpts
      const { mode, immediate, modalOptions, drawerOptions, allowVisible, allowFixed, allowAlign, allowHeaderAlign, allowFooterAlign, allowResizable } = customOpts
      const columnOpts = computeColumnOpts.value
      const { maxFixedSize } = columnOpts
      const modalOpts = Object.assign({}, modalOptions)
      const drawerOpts = Object.assign({}, drawerOptions)
      const slots = customOpts.slots || {}
      const headerSlot = slots.header
      const topSlot = slots.top
      const bottomSlot = slots.bottom
      const defaultSlot = slots.default
      const footerSlot = slots.footer
      const isAllChecked = customStore.isAll
      const isAllIndeterminate = customStore.isIndeterminate
      const isAggRtBmLayout = aggPlacement === 'right' || aggPlacement === 'bottom'
      const params = {
        $table: $xeTable,
        $grid: $xeGrid,
        $gantt: $xeGantt,
        columns: customColumnList,
        isAllChecked,
        isAllIndeterminate,
        isCustomStatus
      }

      const colVNs: VNode[] = []
      const headVNs: VNode[] = []
      if (allowVisible) {
        colVNs.push(
          h('col', {
            key: 'av',
            class: 'vxe-table-custom-popup--column-col col--checkbox'
          })
        )
        headVNs.push(
          h('th', {
            key: 'av',
            class: 'vxe-table-custom-popup--column-th col--checkbox'
          }, [
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
              })
              // h('span', {
              //   class: 'vxe-checkbox--label'
              // }, getI18n('vxe.toolbar.customAll'))
            ])
          ])
        )
      }
      colVNs.push(
        h('col', {
          key: 'at',
          class: 'vxe-table-custom-popup--column-col col--title'
        })
      )
      headVNs.push(
        h('th', {
          key: 'at',
          class: 'vxe-table-custom-popup--column-th col--title'
        }, getI18n('vxe.custom.setting.colTitle'))
      )
      if (allowResizable) {
        colVNs.push(
          h('col', {
            key: 'aw',
            class: 'vxe-table-custom-popup--column-col col--width'
          })
        )
        headVNs.push(
          h('th', {
            key: 'aw',
            class: 'vxe-table-custom-popup--column-th col--width'
          }, getI18n('vxe.custom.setting.colResizable'))
        )
      }
      if (allowFixed) {
        colVNs.push(
          h('col', {
            key: 'af',
            class: 'vxe-table-custom-popup--column-col col--fixed'
          })
        )
        headVNs.push(
          h('th', {
            key: 'af',
            class: 'vxe-table-custom-popup--column-th col--fixed'
          }, getI18n(`vxe.custom.setting.${maxFixedSize ? 'colFixedMax' : 'colFixed'}`, [maxFixedSize]))
        )
      }
      if (allowAlign) {
        colVNs.push(
          h('col', {
            key: 'aa',
            class: 'vxe-table-custom-popup--column-col col--align'
          })
        )
        headVNs.push(
          h('th', {
            key: 'aa',
            class: 'vxe-table-custom-popup--column-th col--align'
          }, getI18n('vxe.custom.setting.colAlign'))
        )
      }
      if (allowHeaderAlign) {
        colVNs.push(
          h('col', {
            key: 'aha',
            class: 'vxe-table-custom-popup--column-col col--header-align'
          })
        )
        headVNs.push(
          h('th', {
            key: 'aha',
            class: 'vxe-table-custom-popup--column-th col--header-align'
          }, getI18n('vxe.custom.setting.colHeadAlign'))
        )
      }
      if (allowFooterAlign) {
        colVNs.push(
          h('col', {
            key: 'afa',
            class: 'vxe-table-custom-popup--column-col col--footer-align'
          })
        )
        headVNs.push(
          h('th', {
            key: 'afa',
            class: 'vxe-table-custom-popup--column-th col--footer-align'
          }, getI18n('vxe.custom.setting.colFootAlign'))
        )
      }

      const scopedSlots: Record<string, any> = {
        default: () => {
          return h('div', {
            ref: refBodyWrapperElem,
            class: ['vxe-table-custom-popup--body-wrapper', `agg-layout--${aggPlacement}`, {
              [`size--${vSize}`]: vSize
            }],
            style: panePopupStyle
          }, defaultSlot
            ? $xeTable.callSlot(defaultSlot, params)
            : [
                !isAggRtBmLayout && !treeConfig && (aggregateConfig || rowGroupConfig) && $xeTable.getPivotTableAggregatePopupPanel
                  ? h($xeTable.getPivotTableAggregatePopupPanel(), {
                    customStore
                  })
                  : renderEmptyElement($xeTable),
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
                      h('colgroup', {}, colVNs),
                      h('thead', {}, [
                        h('tr', {}, headVNs)
                      ]),
                      h(TransitionGroup, {
                        class: 'vxe-table-custom--panel-list',
                        tag: 'tbody',
                        name: 'vxe-table-custom--list'
                      }, {
                        default: () => renderPopupBodys()
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
                isAggRtBmLayout && !treeConfig && (aggregateConfig || rowGroupConfig) && $xeTable.getPivotTableAggregatePopupPanel
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
              : renderEmptyElement($xeTable),
            immediate
              ? (VxeUIButtonComponent
                  ? h(VxeUIButtonComponent, {
                    status: 'primary',
                    content: customOpts.closeButtonText || getI18n('vxe.table.customClose'),
                    onClick: cancelCloseEvent
                  })
                  : renderEmptyElement($xeTable))
              : (VxeUIButtonComponent
                  ? h(VxeUIButtonComponent, {
                    content: customOpts.cancelButtonText || getI18n('vxe.table.customCancel'),
                    onClick: cancelCustomEvent
                  })
                  : renderEmptyElement($xeTable)),
            immediate
              ? renderEmptyElement($xeTable)
              : (VxeUIButtonComponent
                  ? h(VxeUIButtonComponent, {
                    status: 'primary',
                    content: customOpts.confirmButtonText || getI18n('vxe.custom.cstmConfirm'),
                    onClick: confirmCustomEvent
                  })
                  : renderEmptyElement($xeTable))
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
          : renderEmptyElement($xeTable)
      }
      return VxeUIModalComponent
        ? h(VxeUIModalComponent, {
          key: 'modal',
          className: ['vxe-table-custom-modal-wrapper', 'vxe-table--ignore-clear', modalOpts.className || ''].join(' '),
          modelValue: customStore.visible,
          title: modalOpts.title || getI18n('vxe.custom.cstmTitle'),
          width: modalOpts.width || Math.min(1000, document.documentElement.clientWidth),
          minWidth: modalOpts.minWidth || 800,
          height: modalOpts.height || Math.min(680, document.documentElement.clientHeight),
          minHeight: modalOpts.minHeight || 400,
          showZoom: modalOpts.showZoom,
          showMaximize: modalOpts.showMaximize,
          showMinimize: modalOpts.showMinimize,
          mask: modalOpts.mask,
          lockView: modalOpts.lockView,
          resize: modalOpts.resize,
          transfer: modalOpts.transfer,
          escClosable: !!modalOpts.escClosable,
          maskClosable: !!modalOpts.maskClosable,
          destroyOnClose: true,
          showFooter: true,
          'onUpdate:modelValue' (value: any) {
            customStore.visible = value
          }
        }, scopedSlots)
        : renderEmptyElement($xeTable)
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

    onUnmounted(() => {
      customPanelInternalData = createInternalData()
    })

    provide('$xeTableCustomPanel', $xeTableCustomPanel)

    return $xeTableCustomPanel
  },
  render () {
    return this.renderVN()
  }
})
