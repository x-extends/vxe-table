import XEUtils from 'xe-utils'
import { browse, hasClass, getAbsolutePos, addClass, removeClass, getEventTargetNode } from '../../tools/dom'

import { VxeGlobalHooksHandles, TableKeyboardPrivateMethods } from '../../../types/all'

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

const tableKeyboardHook: VxeGlobalHooksHandles.HookOptions = {
  setupTable ($xetable) {
    const { props, reactData, internalData } = $xetable
    const { refElem } = $xetable.getRefMaps()
    const { computeEditOpts, computeCheckboxOpts, computeMouseOpts, computeTreeOpts } = $xetable.getComputeMaps()

    function getCheckboxRangeRows (params: any, targetTrElem: any, moveRange: any) {
      let countHeight = 0
      let rangeRows = []
      const isDown = moveRange > 0
      const moveSize = moveRange > 0 ? moveRange : (Math.abs(moveRange) + targetTrElem.offsetHeight)
      const { scrollYLoad } = reactData
      const { afterFullData, scrollYStore } = internalData
      if (scrollYLoad) {
        const _rowIndex = $xetable.getVTRowIndex(params.row)
        if (isDown) {
          rangeRows = afterFullData.slice(_rowIndex, _rowIndex + Math.ceil(moveSize / scrollYStore.rowHeight))
        } else {
          rangeRows = afterFullData.slice(_rowIndex - Math.floor(moveSize / scrollYStore.rowHeight) + 1, _rowIndex + 1)
        }
      } else {
        const siblingProp = isDown ? 'next' : 'previous'
        while (targetTrElem && countHeight < moveSize) {
          const rowNodeRest = $xetable.getRowNode(targetTrElem)
          if (rowNodeRest) {
            rangeRows.push(rowNodeRest.item)
            countHeight += targetTrElem.offsetHeight
            targetTrElem = targetTrElem[`${siblingProp}ElementSibling`]
          }
        }
      }
      return rangeRows
    }

    const handleCheckboxRangeEvent = (evnt: any, params: any) => {
      const { column, cell } = params
      if (column.type === 'checkbox') {
        const el = refElem.value
        const { elemStore } = internalData
        const disX = evnt.clientX
        const disY = evnt.clientY
        const bodyWrapperElem = elemStore[`${column.fixed || 'main'}-body-wrapper`] || elemStore['main-body-wrapper']
        const checkboxRangeElem = bodyWrapperElem.querySelector('.vxe-table--checkbox-range')
        const domMousemove = document.onmousemove
        const domMouseup = document.onmouseup
        const trElem = cell.parentNode
        const selectRecords = $xetable.getCheckboxRecords()
        let lastRangeRows = []
        const marginSize = 1
        const offsetRest = getTargetOffset(evnt.target, bodyWrapperElem)
        const startTop = offsetRest.offsetTop + evnt.offsetY
        const startLeft = offsetRest.offsetLeft + evnt.offsetX
        const startScrollTop = bodyWrapperElem.scrollTop
        const rowHeight = trElem.offsetHeight
        let mouseScrollTimeout: any = null
        let isMouseScrollDown: any = false
        let mouseScrollSpaceSize = 1
        const triggerEvent = (type: 'change' | 'start' | 'end', evnt: MouseEvent) => {
          $xetable.dispatchEvent(`checkbox-range-${type}` as 'checkbox-range-change' | 'checkbox-range-start' | 'checkbox-range-end', { records: $xetable.getCheckboxRecords(), reserves: $xetable.getCheckboxReserveRecords() }, evnt)
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
          const rangeRows = getCheckboxRangeRows(params, trElem, offsetTop < marginSize ? -rangeHeight : rangeHeight)
          // 至少滑动 10px 才能有效匹配
          if (rangeHeight > 10 && rangeRows.length !== lastRangeRows.length) {
            lastRangeRows = rangeRows
            if (evnt.ctrlKey) {
              rangeRows.forEach((row: any) => {
                $xetable.handleSelectRow({ row }, selectRecords.indexOf(row) === -1)
              })
            } else {
              $xetable.setAllCheckboxRow(false)
              $xetable.setCheckboxRow(rangeRows, true)
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
                  $xetable.scrollTo(scrollLeft, scrollTop + topSize)
                  startMouseScroll(evnt)
                  handleChecked(evnt)
                } else {
                  stopMouseScroll()
                }
              } else {
                if (scrollTop) {
                  $xetable.scrollTo(scrollLeft, scrollTop - topSize)
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
          document.onmousemove = domMousemove
          document.onmouseup = domMouseup
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
      if (mouseConfig && mouseOpts.area && $xetable.handleCellAreaEvent) {
        return $xetable.handleCellAreaEvent(evnt, params)
      } else {
        if (checkboxConfig && checkboxOpts.range) {
          handleCheckboxRangeEvent(evnt, params)
        }
        if (mouseConfig && mouseOpts.selected) {
          if (!editConfig || editOpts.mode === 'cell') {
            $xetable.handleSelected(params, evnt)
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
        const _rowIndex = $xetable.getVTRowIndex(params.row)
        const _columnIndex = $xetable.getVTColumnIndex(params.column)
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
          params.cell = $xetable.getCell(params.row, params.column)
          if (editConfig) {
            if (editOpts.trigger === 'click' || editOpts.trigger === 'dblclick') {
              if (editOpts.mode === 'row') {
                $xetable.handleActived(params, evnt)
              } else {
                $xetable.scrollToRow(params.row, params.column)
                  .then(() => $xetable.handleSelected(params, evnt))
              }
            }
          } else {
            $xetable.scrollToRow(params.row, params.column)
              .then(() => $xetable.handleSelected(params, evnt))
          }
        }
      },
      // 处理当前行方向键移动
      moveCurrentRow (isUpArrow, isDwArrow, evnt) {
        const { treeConfig } = props
        const { currentRow } = reactData
        const { afterFullData } = internalData
        const treeOpts = computeTreeOpts.value
        let targetRow
        evnt.preventDefault()
        if (currentRow) {
          if (treeConfig) {
            const { index, items } = XEUtils.findTree(afterFullData, item => item === currentRow, treeOpts)
            if (isUpArrow && index > 0) {
              targetRow = items[index - 1]
            } else if (isDwArrow && index < items.length - 1) {
              targetRow = items[index + 1]
            }
          } else {
            const _rowIndex = $xetable.getVTRowIndex(currentRow)
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
          const params = {
            $table: $xetable,
            row: targetRow,
            rowIndex: $xetable.getRowIndex(targetRow),
            $rowIndex: $xetable.getVMRowIndex(targetRow)
          }
          $xetable.scrollToRow(targetRow)
            .then(() => $xetable.triggerCurrentRowEvent(evnt, params))
        }
      },
      // 处理可编辑方向键移动
      moveSelected (args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
        const { afterFullData, visibleColumn } = internalData
        const params = Object.assign({}, args)
        const _rowIndex = $xetable.getVTRowIndex(params.row)
        const _columnIndex = $xetable.getVTColumnIndex(params.column)
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
        $xetable.scrollToRow(params.row, params.column).then(() => {
          params.cell = $xetable.getCell(params.row, params.column)
          $xetable.handleSelected(params, evnt)
        })
      },
      /**
       * 表头单元格按下事件
       */
      triggerHeaderCellMousedownEvent (evnt, params) {
        const { mouseConfig } = props
        const mouseOpts = computeMouseOpts.value
        if (mouseConfig && mouseOpts.area && $xetable.handleHeaderCellAreaEvent) {
          const cell = evnt.currentTarget
          const triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
          const triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
          $xetable.handleHeaderCellAreaEvent(evnt, Object.assign({ cell, triggerSort, triggerFilter }, params))
        }
        $xetable.focus()
        if ($xetable.closeMenu) {
          $xetable.closeMenu()
        }
      },
      /**
       * 单元格按下事件
       */
      triggerCellMousedownEvent (evnt, params) {
        const cell = evnt.currentTarget
        params.cell = cell
        handleCellMousedownEvent(evnt, params)
        $xetable.focus()
        $xetable.closeFilter()
        if ($xetable.closeMenu) {
          $xetable.closeMenu()
        }
      }
    }

    return keyboardMethods
  }
}

export default tableKeyboardHook
