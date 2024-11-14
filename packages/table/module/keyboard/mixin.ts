import XEUtils from 'xe-utils'
import { browse, hasClass, getAbsolutePos, addClass, removeClass, getEventTargetNode } from '../../../ui/src/dom'

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

function getCheckboxRangeRows ($xeTable: any, evnt: MouseEvent, params: any, targetTrElem: HTMLElement, trRect: DOMRect, offsetClientTop: number, moveRange: number) {
  const reactData = $xeTable
  const internalData = $xeTable

  let countHeight = 0
  let rangeRows: any[] = []
  let moveSize = 0
  const isDown = moveRange > 0
  const { scrollYLoad } = reactData
  const { afterFullData, scrollYStore } = internalData
  if (scrollYLoad) {
    if (isDown) {
      moveSize = offsetClientTop + moveRange
    } else {
      moveSize = (trRect.height - offsetClientTop) + Math.abs(moveRange)
    }
    const _rowIndex = $xeTable.getVTRowIndex(params.row)
    if (isDown) {
      rangeRows = afterFullData.slice(_rowIndex, _rowIndex + Math.ceil(moveSize / scrollYStore.rowHeight))
    } else {
      rangeRows = afterFullData.slice(_rowIndex - Math.floor(moveSize / scrollYStore.rowHeight), _rowIndex + 1)
    }
  } else {
    if (isDown) {
      moveSize = evnt.clientY - trRect.y
    } else {
      moveSize = trRect.y - evnt.clientY + trRect.height
    }
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

export default {
  methods: {
    // 处理 Tab 键移动
    moveTabSelected (args: any, isLeft: any, evnt: any) {
      const { afterFullData, visibleColumn, editConfig, editOpts } = this
      let targetRow
      let targetRowIndex
      let targetColumnIndex
      const params = Object.assign({}, args)
      const _rowIndex = this.getVTRowIndex(params.row)
      const _columnIndex = this.getVTColumnIndex(params.column)
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
        params.cell = this.getCellElement(params.row, params.column)
        if (editConfig) {
          if (editOpts.trigger === 'click' || editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row') {
              this.handleEdit(params, evnt)
            } else {
              this.scrollToRow(params.row, params.column)
                .then(() => this.handleSelected(params, evnt))
            }
          }
        } else {
          this.scrollToRow(params.row, params.column)
            .then(() => this.handleSelected(params, evnt))
        }
      }
    },
    // 处理当前行方向键移动
    moveCurrentRow (isUpArrow: any, isDwArrow: any, evnt: any) {
      const { currentRow, treeConfig, treeOpts, afterFullData } = this
      const childrenField = treeOpts.children || treeOpts.childrenField
      let targetRow
      evnt.preventDefault()
      if (currentRow) {
        if (treeConfig) {
          const { index, items } = XEUtils.findTree(afterFullData, item => item === currentRow, { children: childrenField })
          if (isUpArrow && index > 0) {
            targetRow = items[index - 1]
          } else if (isDwArrow && index < items.length - 1) {
            targetRow = items[index + 1]
          }
        } else {
          const _rowIndex = this.getVTRowIndex(currentRow)
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
        const params = { $table: this, row: targetRow }
        this.scrollToRow(targetRow)
          .then(() => this.triggerCurrentRowEvent(evnt, params))
      }
    },
    // 处理可编辑方向键移动
    moveSelected (args: any, isLeftArrow: any, isUpArrow: any, isRightArrow: any, isDwArrow: any, evnt: any) {
      const { afterFullData, visibleColumn } = this
      const params = Object.assign({}, args)
      const _rowIndex = this.getVTRowIndex(params.row)
      const _columnIndex = this.getVTColumnIndex(params.column)
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
      this.scrollToRow(params.row, params.column).then(() => {
        params.cell = this.getCellElement(params.row, params.column)
        this.handleSelected(params, evnt)
      })
    },
    /**
     * 表头单元格按下事件
     */
    triggerHeaderCellMousedownEvent (evnt: any, params: any) {
      const { mouseConfig, mouseOpts } = this
      if (mouseConfig && mouseOpts.area && this.handleHeaderCellAreaEvent) {
        const cell = evnt.currentTarget
        const triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
        const triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
        this.handleHeaderCellAreaEvent(evnt, Object.assign({ cell, triggerSort, triggerFilter }, params))
      }
      this.focus()
      this.closeMenu()
    },
    /**
     * 单元格按下事件
     */
    triggerCellMousedownEvent (evnt: any, params: any) {
      const cell = evnt.currentTarget
      params.cell = cell
      this.handleCellMousedownEvent(evnt, params)
      this.focus()
      this.closeFilter()
      this.closeMenu()
    },
    handleCellMousedownEvent (evnt: any, params: any) {
      const { editConfig, editOpts, handleSelected, checkboxConfig, checkboxOpts, mouseConfig, mouseOpts } = this
      if (mouseConfig && mouseOpts.area && this.handleCellAreaEvent) {
        return this.handleCellAreaEvent(evnt, params)
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
      const { column, cell } = params
      if (column.type === 'checkbox') {
        const { $el, elemStore } = this
        const disX = evnt.clientX
        const disY = evnt.clientY
        const bodyWrapperElem = elemStore[`${column.fixed || 'main'}-body-wrapper`] || elemStore['main-body-wrapper']
        const checkboxRangeElem = bodyWrapperElem.querySelector('.vxe-table--checkbox-range')
        const domMousemove = document.onmousemove
        const domMouseup = document.onmouseup
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
          this.emitEvent(`checkbox-range-${type}`, { records: this.getCheckboxRecords(), reserves: this.getCheckboxReserveRecords() }, evnt)
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
            lastRangeRows = rangeRows
            if (evnt.ctrlKey) {
              rangeRows.forEach((row: any) => {
                this.handleSelectRow({ row }, selectRecords.indexOf(row) === -1)
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
        addClass($el, 'drag--range')
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
          removeClass($el, 'drag--range')
          checkboxRangeElem.removeAttribute('style')
          document.onmousemove = domMousemove
          document.onmouseup = domMouseup
          triggerEvent('end', evnt)
        }
        triggerEvent('start', evnt)
      }
    }
  } as any
}
