import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { getRefElem } from '../../src/util'
import { browse, hasClass, getAbsolutePos, addClass, removeClass } from '../../../ui/src/dom'

import type { TableKeyboardPrivateMethods, VxeTableDefines } from '../../../../types'

const { hooks } = VxeUI

function getTargetOffset (target: any, container: any) {
  let offsetTop = 0
  let offsetLeft = 0
  const triggerCheckboxLabel = !browse.firefox && hasClass(target, 'vxe-checkbox--label')
  if (triggerCheckboxLabel) {
    const checkboxLabelStyle = getComputedStyle(target)
    offsetTop -= XEUtils.toNumber(checkboxLabelStyle.paddingTop)
    offsetLeft -= XEUtils.toNumber(checkboxLabelStyle.paddingLeft)
  }
  while (target && target !== container) {
    offsetTop += target.offsetTop
    offsetLeft += target.offsetLeft
    target = target.offsetParent
    if (triggerCheckboxLabel) {
      const checkboxStyle = getComputedStyle(target)
      offsetTop -= XEUtils.toNumber(checkboxStyle.paddingTop)
      offsetLeft -= XEUtils.toNumber(checkboxStyle.paddingLeft)
    }
  }
  return { offsetTop, offsetLeft }
}

hooks.add('tableKeyboardModule', {
  setupTable ($xeTable) {
    const { props, reactData, internalData } = $xeTable
    const { refElem } = $xeTable.getRefMaps()
    const { computeEditOpts, computeCheckboxOpts, computeMouseOpts, computeTreeOpts, computeRowOpts, computeCellOpts, computeDefaultRowHeight } = $xeTable.getComputeMaps()

    function getCheckboxRangeRows (evnt: MouseEvent, params: any, targetTrElem: HTMLElement, trRect: DOMRect, offsetClientTop: number, moveRange: number) {
      const { showOverflow } = props
      const { fullAllDataRowIdData, isResizeCellHeight } = internalData
      const rowOpts = computeRowOpts.value
      const cellOpts = computeCellOpts.value
      const defaultRowHeight = computeDefaultRowHeight.value
      const { row } = params
      let countHeight = 0
      let rangeRows: any[] = []
      let moveSize = 0
      const isDown = moveRange > 0
      const { scrollYLoad } = reactData
      const { afterFullData } = internalData
      if (isDown) {
        moveSize = offsetClientTop + moveRange
      } else {
        moveSize = (trRect.height - offsetClientTop) + Math.abs(moveRange)
      }
      if (scrollYLoad) {
        const _rowIndex = $xeTable.getVTRowIndex(row)
        const isCustomCellHeight = isResizeCellHeight || cellOpts.height || rowOpts.height
        if (!isCustomCellHeight && showOverflow) {
          if (isDown) {
            rangeRows = afterFullData.slice(_rowIndex, _rowIndex + Math.ceil(moveSize / defaultRowHeight))
          } else {
            rangeRows = afterFullData.slice(_rowIndex - Math.floor(moveSize / defaultRowHeight), _rowIndex + 1)
          }
        } else {
          if (isDown) {
            for (let i = _rowIndex; i < afterFullData.length; i++) {
              const item = afterFullData[i]
              const rowid = $xeTable.getRowid(item)
              const rowRest = fullAllDataRowIdData[rowid] || {}
              countHeight += rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
              rangeRows.push(item)
              if (countHeight > moveSize) {
                return rangeRows
              }
            }
          } else {
            for (let len = _rowIndex; len >= 0; len--) {
              const item = afterFullData[len]
              const rowid = $xeTable.getRowid(item)
              const rowRest = fullAllDataRowIdData[rowid] || {}
              countHeight += rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
              rangeRows.push(item)
              if (countHeight > moveSize) {
                return rangeRows
              }
            }
          }
        }
      } else {
        const siblingProp = isDown ? 'next' : 'previous'
        while (targetTrElem && countHeight < moveSize) {
          const rowNodeRest = $xeTable.getRowNode(targetTrElem)
          if (rowNodeRest) {
            rangeRows.push(rowNodeRest.item)
            countHeight += targetTrElem.offsetHeight
            targetTrElem = targetTrElem[`${siblingProp}ElementSibling`] as HTMLElement
          }
        }
      }
      return rangeRows
    }

    const handleCheckboxRangeEvent = (evnt: any, params: any) => {
      const { elemStore } = internalData
      const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
      const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
      const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
      const { column, cell } = params
      if (column.type === 'checkbox') {
        let bodyWrapperElem = bodyScrollElem as HTMLElement
        if (leftScrollElem && column.fixed === 'left') {
          bodyWrapperElem = leftScrollElem
        } else if (rightScrollElem && column.fixed === 'right') {
          bodyWrapperElem = rightScrollElem
        }
        if (!bodyWrapperElem) {
          return
        }
        const el = refElem.value
        const disX = evnt.clientX
        const disY = evnt.clientY
        const checkboxRangeElem = bodyWrapperElem.querySelector('.vxe-table--checkbox-range') as HTMLElement
        const trElem = cell.parentElement as HTMLElement
        const selectRecords = $xeTable.getCheckboxRecords()
        let lastRangeRows: any[] = []
        const marginSize = 1
        const offsetRest = getTargetOffset(evnt.target, bodyWrapperElem)
        const startTop = offsetRest.offsetTop + evnt.offsetY
        const startLeft = offsetRest.offsetLeft + evnt.offsetX
        const startScrollTop = bodyWrapperElem.scrollTop
        const rowHeight = trElem.offsetHeight
        const trRect = trElem.getBoundingClientRect()
        const offsetClientTop = disY - trRect.y
        let mouseScrollTimeout: any = null
        let isMouseScrollDown: any = false
        let mouseScrollSpaceSize = 1
        const triggerEvent = (type: 'change' | 'start' | 'end', evnt: MouseEvent) => {
          $xeTable.dispatchEvent(`checkbox-range-${type}` as 'checkbox-range-change' | 'checkbox-range-start' | 'checkbox-range-end', { records: $xeTable.getCheckboxRecords(), reserves: $xeTable.getCheckboxReserveRecords() }, evnt)
        }
        const handleChecked = (evnt: MouseEvent) => {
          const { clientX, clientY } = evnt
          const offsetLeft = clientX - disX
          const offsetTop = clientY - disY + (bodyWrapperElem.scrollTop - startScrollTop)
          let rangeHeight = Math.abs(offsetTop)
          let rangeWidth = Math.abs(offsetLeft)
          let rangeTop = startTop
          let rangeLeft = startLeft

          if (offsetTop < marginSize) {
            // 向上
            rangeTop += offsetTop
            if (rangeTop < marginSize) {
              rangeTop = marginSize
              rangeHeight = startTop
            }
          } else {
            // 向下
            rangeHeight = Math.min(rangeHeight, bodyWrapperElem.scrollHeight - startTop - marginSize)
          }
          if (offsetLeft < marginSize) {
            // 向左
            rangeLeft += offsetLeft
            if (rangeWidth > startLeft) {
              rangeLeft = marginSize
              rangeWidth = startLeft
            }
          } else {
            // 向右
            rangeWidth = Math.min(rangeWidth, bodyWrapperElem.clientWidth - startLeft - marginSize)
          }
          checkboxRangeElem.style.height = `${rangeHeight}px`
          checkboxRangeElem.style.width = `${rangeWidth}px`
          checkboxRangeElem.style.left = `${rangeLeft}px`
          checkboxRangeElem.style.top = `${rangeTop}px`
          checkboxRangeElem.style.display = 'block'
          const rangeRows = getCheckboxRangeRows(evnt, params, trElem, trRect, offsetClientTop, offsetTop < marginSize ? -rangeHeight : rangeHeight)
          // 至少滑动 10px 才能有效匹配
          if (rangeHeight > 10 && rangeRows.length !== lastRangeRows.length) {
            lastRangeRows = rangeRows
            if (evnt.ctrlKey) {
              rangeRows.forEach((row: any) => {
                $xeTable.handleBatchSelectRows([row], selectRecords.indexOf(row) === -1)
              })
            } else {
              $xeTable.setAllCheckboxRow(false)
              $xeTable.handleCheckedCheckboxRow(rangeRows, true, false)
            }
            triggerEvent('change', evnt)
          }
        }
        // 停止鼠标滚动
        const stopMouseScroll = () => {
          clearTimeout(mouseScrollTimeout)
          mouseScrollTimeout = null
        }
        // 开始鼠标滚动
        const startMouseScroll = (evnt: MouseEvent) => {
          stopMouseScroll()
          mouseScrollTimeout = setTimeout(() => {
            if (mouseScrollTimeout) {
              const { scrollLeft, scrollTop, clientHeight, scrollHeight } = bodyWrapperElem
              const topSize = Math.ceil(mouseScrollSpaceSize * 50 / rowHeight)
              if (isMouseScrollDown) {
                if (scrollTop + clientHeight < scrollHeight) {
                  $xeTable.scrollTo(scrollLeft, scrollTop + topSize)
                  startMouseScroll(evnt)
                  handleChecked(evnt)
                } else {
                  stopMouseScroll()
                }
              } else {
                if (scrollTop) {
                  $xeTable.scrollTo(scrollLeft, scrollTop - topSize)
                  startMouseScroll(evnt)
                  handleChecked(evnt)
                } else {
                  stopMouseScroll()
                }
              }
            }
          }, 50)
        }
        addClass(el, 'drag--range')
        document.onmousemove = evnt => {
          evnt.preventDefault()
          evnt.stopPropagation()
          const { clientY } = evnt
          const { boundingTop } = getAbsolutePos(bodyWrapperElem)
          // 如果超过可视区，触发滚动
          if (clientY < boundingTop) {
            isMouseScrollDown = false
            mouseScrollSpaceSize = boundingTop - clientY
            if (!mouseScrollTimeout) {
              startMouseScroll(evnt)
            }
          } else if (clientY > boundingTop + bodyWrapperElem.clientHeight) {
            isMouseScrollDown = true
            mouseScrollSpaceSize = clientY - boundingTop - bodyWrapperElem.clientHeight
            if (!mouseScrollTimeout) {
              startMouseScroll(evnt)
            }
          } else if (mouseScrollTimeout) {
            stopMouseScroll()
          }
          handleChecked(evnt)
        }
        document.onmouseup = (evnt) => {
          stopMouseScroll()
          removeClass(el, 'drag--range')
          checkboxRangeElem.removeAttribute('style')
          document.onmousemove = null
          document.onmouseup = null
          triggerEvent('end', evnt)
        }
        triggerEvent('start', evnt)
      }
    }

    const handleCellMousedownEvent = (evnt: any, params: any) => {
      const { editConfig, checkboxConfig, mouseConfig } = props
      const checkboxOpts = computeCheckboxOpts.value
      const mouseOpts = computeMouseOpts.value
      const editOpts = computeEditOpts.value
      if (mouseConfig && mouseOpts.area && ($xeTable as any).handleMousedownCellAreaEvent) {
        return ($xeTable as any).handleMousedownCellAreaEvent(evnt, params)
      } else {
        if (checkboxConfig && checkboxOpts.range) {
          handleCheckboxRangeEvent(evnt, params)
        }
        if (mouseConfig && mouseOpts.selected) {
          if (!editConfig || editOpts.mode === 'cell') {
            $xeTable.handleSelected(params, evnt)
          }
        }
      }
    }

    const keyboardMethods: TableKeyboardPrivateMethods = {
      // 处理 Tab 键移动
      moveTabSelected (args, isLeft, evnt) {
        const { editConfig } = props
        const { afterFullData, visibleColumn } = internalData
        const editOpts = computeEditOpts.value
        let targetRow
        let targetRowIndex: any
        let targetColumnIndex: any
        const params = Object.assign({}, args)
        const _rowIndex = $xeTable.getVTRowIndex(params.row)
        const _columnIndex = $xeTable.getVTColumnIndex(params.column)
        evnt.preventDefault()
        if (isLeft) {
          // 向左
          if (_columnIndex <= 0) {
            // 如果已经是第一列，则移动到上一行
            if (_rowIndex > 0) {
              targetRowIndex = _rowIndex - 1
              targetRow = afterFullData[targetRowIndex]
              targetColumnIndex = visibleColumn.length - 1
            }
          } else {
            targetColumnIndex = _columnIndex - 1
          }
        } else {
          if (_columnIndex >= visibleColumn.length - 1) {
            // 如果已经是第一列，则移动到上一行
            if (_rowIndex < afterFullData.length - 1) {
              targetRowIndex = _rowIndex + 1
              targetRow = afterFullData[targetRowIndex]
              targetColumnIndex = 0
            }
          } else {
            targetColumnIndex = _columnIndex + 1
          }
        }
        const targetColumn = visibleColumn[targetColumnIndex]
        if (targetColumn) {
          if (targetRow) {
            params.rowIndex = targetRowIndex
            params.row = targetRow
          } else {
            params.rowIndex = _rowIndex
          }
          params.columnIndex = targetColumnIndex
          params.column = targetColumn
          params.cell = $xeTable.getCellElement(params.row, params.column)
          if (editConfig) {
            if (editOpts.trigger === 'click' || editOpts.trigger === 'dblclick') {
              if (editOpts.mode === 'row') {
                $xeTable.handleEdit(params, evnt)
              } else {
                $xeTable.scrollToRow(params.row, params.column)
                  .then(() => $xeTable.handleSelected(params, evnt))
              }
            }
          } else {
            $xeTable.scrollToRow(params.row, params.column)
              .then(() => $xeTable.handleSelected(params, evnt))
          }
        }
      },
      // 处理当前行方向键移动
      moveCurrentRow (isUpArrow, isDwArrow, evnt) {
        const { treeConfig } = props
        const { currentRow } = reactData
        const { afterFullData } = internalData
        const treeOpts = computeTreeOpts.value
        const childrenField = treeOpts.children || treeOpts.childrenField
        let targetRow
        if (currentRow) {
          if (treeConfig) {
            const { index, items } = XEUtils.findTree(afterFullData, item => item === currentRow, { children: childrenField })
            if (isUpArrow && index > 0) {
              targetRow = items[index - 1]
            } else if (isDwArrow && index < items.length - 1) {
              targetRow = items[index + 1]
            }
          } else {
            const _rowIndex = $xeTable.getVTRowIndex(currentRow)
            if (isUpArrow && _rowIndex > 0) {
              targetRow = afterFullData[_rowIndex - 1]
            } else if (isDwArrow && _rowIndex < afterFullData.length - 1) {
              targetRow = afterFullData[_rowIndex + 1]
            }
          }
        } else {
          targetRow = afterFullData[0]
        }
        if (targetRow) {
          evnt.preventDefault()
          const params = {
            $table: $xeTable,
            row: targetRow,
            rowIndex: $xeTable.getRowIndex(targetRow),
            $rowIndex: $xeTable.getVMRowIndex(targetRow)
          }
          $xeTable.scrollToRow(targetRow)
            .then(() => $xeTable.triggerCurrentRowEvent(evnt, params))
        }
      },
      // 处理当前列方向键移动
      moveCurrentColumn (isLeftArrow, isRightArrow, evnt) {
        const { currentColumn } = reactData
        const { visibleColumn } = internalData
        let targetCol: VxeTableDefines.ColumnInfo | null = null
        if (currentColumn) {
          const _columnIndex = $xeTable.getVTColumnIndex(currentColumn)
          if (isLeftArrow && _columnIndex > 0) {
            targetCol = visibleColumn[_columnIndex - 1]
          } else if (isRightArrow && _columnIndex < visibleColumn.length - 1) {
            targetCol = visibleColumn[_columnIndex + 1]
          }
        } else {
          targetCol = visibleColumn[0]
        }
        if (targetCol) {
          evnt.preventDefault()
          const params = {
            $table: $xeTable,
            column: targetCol,
            columnIndex: $xeTable.getColumnIndex(targetCol),
            $columnIndex: $xeTable.getVMColumnIndex(targetCol)
          }
          $xeTable.scrollToColumn(targetCol)
            .then(() => $xeTable.triggerCurrentColumnEvent(evnt, params))
        }
      },
      // 处理可编辑方向键移动
      moveSelected (args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
        const { afterFullData, visibleColumn } = internalData
        const params = Object.assign({}, args)
        const _rowIndex = $xeTable.getVTRowIndex(params.row)
        const _columnIndex = $xeTable.getVTColumnIndex(params.column)
        evnt.preventDefault()
        if (isUpArrow && _rowIndex > 0) {
          // 移动到上一行
          params.rowIndex = _rowIndex - 1
          params.row = afterFullData[params.rowIndex]
        } else if (isDwArrow && _rowIndex < afterFullData.length - 1) {
          // 移动到下一行
          params.rowIndex = _rowIndex + 1
          params.row = afterFullData[params.rowIndex]
        } else if (isLeftArrow && _columnIndex) {
          // 移动到左侧单元格
          params.columnIndex = _columnIndex - 1
          params.column = visibleColumn[params.columnIndex]
        } else if (isRightArrow && _columnIndex < visibleColumn.length - 1) {
          // 移动到右侧单元格
          params.columnIndex = _columnIndex + 1
          params.column = visibleColumn[params.columnIndex]
        }
        $xeTable.scrollToRow(params.row, params.column).then(() => {
          params.cell = $xeTable.getCellElement(params.row, params.column)
          $xeTable.handleSelected(params, evnt)
        })
      },
      handleCellMousedownEvent
    }

    return keyboardMethods
  }
})
