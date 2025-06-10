import XEUtils from 'xe-utils'
import { getRefElem } from '../../src/util'
import { hasClass, getAbsolutePos, addClass, removeClass, hasControlKey } from '../../../ui/src/dom'

import type { VxeTableConstructor, VxeTablePrivateMethods, VxeTableDefines, TableReactData, TableInternalData } from '../../../../types'

const browseObj = XEUtils.browse()

function getTargetOffset (target: any, container: any) {
  let offsetTop = 0
  let offsetLeft = 0
  const triggerCheckboxLabel = !browseObj.firefox && hasClass(target, 'vxe-checkbox--label')
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

function getCheckboxRangeRows ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: MouseEvent, params: any, targetTrElem: HTMLElement, trRect: DOMRect, offsetClientTop: number, moveRange: number) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { showOverflow } = props
  const { fullAllDataRowIdData, isResizeCellHeight } = internalData
  const rowOpts = $xeTable.computeRowOpts
  const cellOpts = $xeTable.computeCellOpts
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
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

function handleMoveSelected ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: any, args: any, isLeftArrow: boolean, isUpArrow: boolean, isRightArrow: boolean, isDwArrow: boolean) {
  const internalData = $xeTable as unknown as TableInternalData

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
  return params
}

export default {
  methods: {
    // 处理 Tab 键移动
    moveTabSelected (args: any, isLeft: any, evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable
      const internalData = $xeTable as unknown as TableInternalData

      const { editConfig } = props
      const { afterFullData, visibleColumn } = internalData
      const editOpts = $xeTable.computeEditOpts
      const rowOpts = $xeTable.computeRowOpts
      const currentRowOpts = $xeTable.computeCurrentRowOpts
      const columnOpts = $xeTable.computeColumnOpts
      const currentColumnOpts = $xeTable.computeCurrentColumnOpts
      let targetRow: any
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
        if (rowOpts.isCurrent && currentRowOpts.isFollowSelected) {
          $xeTable.triggerCurrentRowEvent(evnt, params)
        }
        if (columnOpts.isCurrent && currentColumnOpts.isFollowSelected) {
          $xeTable.triggerCurrentColumnEvent(evnt, params)
        }
        if (editConfig) {
          if (editOpts.trigger === 'click' || editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row') {
              $xeTable.handleEdit(params, evnt)
            } else {
              $xeTable.scrollToRow(params.row, params.column)
                .then(() => {
                  $xeTable.handleSelected(params, evnt)
                })
            }
          }
        } else {
          $xeTable.scrollToRow(params.row, params.column)
            .then(() => {
              $xeTable.handleSelected(params, evnt)
            })
        }
      }
    },
    // 处理当前行方向键移动
    moveCurrentRow (isUpArrow: boolean, isDwArrow: boolean, evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { treeConfig } = props
      const { currentRow } = reactData
      const { afterFullData } = internalData
      const treeOpts = $xeTable.computeTreeOpts
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
    moveCurrentColumn (isLeftArrow: boolean, isRightArrow: boolean, evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

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
    moveArrowSelected (args: any, isLeftArrow: boolean, isUpArrow: boolean, isRightArrow: boolean, isDwArrow: boolean, evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      const { highlightCurrentRow, highlightCurrentColumn } = props
      const rowOpts = $xeTable.computeRowOpts
      const currentRowOpts = $xeTable.computeCurrentRowOpts
      const columnOpts = $xeTable.computeColumnOpts
      const currentColumnOpts = $xeTable.computeCurrentColumnOpts
      const params = handleMoveSelected($xeTable, evnt, args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow)
      if (rowOpts.isCurrent || highlightCurrentRow) {
        if (currentRowOpts.isFollowSelected) {
          $xeTable.triggerCurrentRowEvent(evnt, params)
        } else {
          // 当前行按键上下移动
          if ((isUpArrow || isDwArrow) && (rowOpts.isCurrent || highlightCurrentRow)) {
            $xeTable.moveCurrentRow(isUpArrow, isDwArrow, evnt)
          }
        }
      }
      if (columnOpts.isCurrent || highlightCurrentColumn) {
        if (currentColumnOpts.isFollowSelected) {
          $xeTable.triggerCurrentColumnEvent(evnt, params)
        } else {
          // 当前行按键左右移动
          if ((isLeftArrow || isRightArrow) && (columnOpts.isCurrent || highlightCurrentColumn)) {
            $xeTable.moveCurrentColumn(isLeftArrow, isRightArrow, evnt)
          }
        }
      }
    },
    moveEnterSelected (args: any, isLeftArrow: boolean, isUpArrow: boolean, isRightArrow: boolean, isDwArrow: boolean, evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      const { highlightCurrentRow, highlightCurrentColumn } = props
      const rowOpts = $xeTable.computeRowOpts
      const currentRowOpts = $xeTable.computeCurrentRowOpts
      const columnOpts = $xeTable.computeColumnOpts
      const currentColumnOpts = $xeTable.computeCurrentColumnOpts
      const params = handleMoveSelected($xeTable, evnt, args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow)
      if (((rowOpts.isCurrent || highlightCurrentRow) && currentRowOpts.isFollowSelected)) {
        $xeTable.triggerCurrentRowEvent(evnt, params)
      }
      if ((columnOpts.isCurrent || highlightCurrentColumn) && currentColumnOpts.isFollowSelected) {
        $xeTable.triggerCurrentColumnEvent(evnt, params)
      }
    },
    // 处理可编辑方向键移动
    moveSelected (args: any, isLeftArrow: boolean, isUpArrow: boolean, isRightArrow: boolean, isDwArrow: boolean, evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      handleMoveSelected($xeTable, evnt, args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow)
    },
    handleCellMousedownEvent (evnt: any, params: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      const { editConfig, editOpts, handleSelected, checkboxConfig, checkboxOpts, mouseConfig, mouseOpts } = this
      if (mouseConfig && mouseOpts.area && $xeTable.triggerCellAreaMousedownEvent) {
        return $xeTable.triggerCellAreaMousedownEvent(evnt, params)
      } else {
        if (checkboxConfig && checkboxOpts.range) {
          this.handleCheckboxRangeEvent(evnt, params)
        }
        if (mouseConfig && mouseOpts.selected) {
          if (!editConfig || editOpts.mode === 'cell') {
            handleSelected(params, evnt)
          }
        }
      }
    },
    handleCheckboxRangeEvent (evnt: any, params: any) {
      const $xeTable = this
      const internalData = $xeTable

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
        const el = $xeTable.$refs.refElem as HTMLDivElement
        const disX = evnt.clientX
        const disY = evnt.clientY
        const checkboxRangeElem = bodyWrapperElem.querySelector('.vxe-table--checkbox-range') as HTMLElement
        const trElem = cell.parentNode
        const selectRecords = this.getCheckboxRecords()
        let lastRangeRows = []
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
        const triggerEvent = (type: any, evnt: any) => {
          this.emitEvent(`checkbox-range-${type}`, {
            records: () => this.getCheckboxRecords(),
            reserves: () => this.getCheckboxReserveRecords()
          }, evnt)
        }
        const handleChecked = (evnt: any) => {
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
          const rangeRows = getCheckboxRangeRows(this, evnt, params, trElem, trRect, offsetClientTop, offsetTop < marginSize ? -rangeHeight : rangeHeight)
          // 至少滑动 10px 才能有效匹配
          if (rangeHeight > 10 && rangeRows.length !== lastRangeRows.length) {
            const isControlKey = hasControlKey(evnt)
            lastRangeRows = rangeRows
            if (isControlKey) {
              rangeRows.forEach((row: any) => {
                $xeTable.handleBatchSelectRows([row], selectRecords.indexOf(row) === -1)
              })
            } else {
              this.setAllCheckboxRow(false)
              this.handleCheckedCheckboxRow(rangeRows, true, false)
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
        const startMouseScroll = (evnt: any) => {
          stopMouseScroll()
          mouseScrollTimeout = setTimeout(() => {
            if (mouseScrollTimeout) {
              const { scrollLeft, scrollTop, clientHeight, scrollHeight } = bodyWrapperElem
              const topSize = Math.ceil(mouseScrollSpaceSize * 50 / rowHeight)
              if (isMouseScrollDown) {
                if (scrollTop + clientHeight < scrollHeight) {
                  this.scrollTo(scrollLeft, scrollTop + topSize)
                  startMouseScroll(evnt)
                  handleChecked(evnt)
                } else {
                  stopMouseScroll()
                }
              } else {
                if (scrollTop) {
                  this.scrollTo(scrollLeft, scrollTop - topSize)
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
  } as any
}
