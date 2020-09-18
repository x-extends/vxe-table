import XEUtils from 'xe-utils/ctor'
import { UtilTools, DomTools } from '../../tools'

const browse = DomTools.browse

function getTargetOffset (target, container) {
  let offsetTop = 0
  let offsetLeft = 0
  const triggerCheckboxLabel = !browse.firefox && DomTools.hasClass(target, 'vxe-checkbox--label')
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

function getCheckboxRangeRows (_vm, params, targetTrElem, moveRange) {
  let countHeight = 0
  let rangeRows = []
  const isDown = moveRange > 0
  const moveSize = moveRange > 0 ? moveRange : (Math.abs(moveRange) + targetTrElem.offsetHeight)
  const { afterFullData, scrollYStore, scrollYLoad } = _vm
  if (scrollYLoad) {
    const _rowIndex = _vm._getRowIndex(params.row)
    if (isDown) {
      rangeRows = afterFullData.slice(_rowIndex, _rowIndex + Math.ceil(moveSize / scrollYStore.rowHeight))
    } else {
      rangeRows = afterFullData.slice(_rowIndex - Math.floor(moveSize / scrollYStore.rowHeight) + 1, _rowIndex + 1)
    }
  } else {
    const siblingProp = isDown ? 'next' : 'previous'
    while (targetTrElem && countHeight < moveSize) {
      rangeRows.push(_vm.getRowNode(targetTrElem).item)
      countHeight += targetTrElem.offsetHeight
      targetTrElem = targetTrElem[`${siblingProp}ElementSibling`]
    }
  }
  return rangeRows
}

export default {
  methods: {
    // 处理 Tab 键移动
    moveTabSelected (args, isLeft, evnt) {
      const { afterFullData, visibleColumn, editConfig, editOpts, isSeqColumn } = this
      let targetRow
      let targetRowIndex
      let targetColumn
      let targetColumnIndex
      const params = Object.assign({}, args)
      const rowIndex = afterFullData.indexOf(params.row)
      const columnIndex = visibleColumn.indexOf(params.column)
      evnt.preventDefault()
      if (isLeft) {
        // 向左
        for (let len = columnIndex - 1; len >= 0; len--) {
          if (!isSeqColumn(visibleColumn[len])) {
            targetColumnIndex = len
            targetColumn = visibleColumn[len]
            break
          }
        }
        if (!targetColumn && rowIndex > 0) {
          // 如果找不到从上一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex - 1
          targetRow = afterFullData[targetRowIndex]
          for (let len = visibleColumn.length - 1; len >= 0; len--) {
            if (!isSeqColumn(visibleColumn[len])) {
              targetColumnIndex = len
              targetColumn = visibleColumn[len]
              break
            }
          }
        }
      } else {
        // 向右
        for (let index = columnIndex + 1; index < visibleColumn.length; index++) {
          if (!isSeqColumn(visibleColumn[index])) {
            targetColumnIndex = index
            targetColumn = visibleColumn[index]
            break
          }
        }
        if (!targetColumn && rowIndex < afterFullData.length - 1) {
          // 如果找不到从下一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex + 1
          targetRow = afterFullData[targetRowIndex]
          for (let index = 0; index < visibleColumn.length; index++) {
            if (!isSeqColumn(visibleColumn[index])) {
              targetColumnIndex = index
              targetColumn = visibleColumn[index]
              break
            }
          }
        }
      }
      if (targetColumn) {
        if (targetRow) {
          params.rowIndex = targetRowIndex
          params.row = targetRow
        } else {
          params.rowIndex = rowIndex
        }
        params.columnIndex = targetColumnIndex
        params.column = targetColumn
        params.cell = this.getCell(params.row, params.column)
        if (editConfig) {
          if (editOpts.trigger === 'click' || editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row') {
              this.handleActived(params, evnt)
            } else {
              this.scrollToRow(params.row, params.column)
                .then(() => this.handleSelected(params, evnt))
            }
          }
        }
      }
    },
    // 处理当前行方向键移动
    moveCurrentRow (isUpArrow, isDwArrow, evnt) {
      const { currentRow, treeConfig, treeOpts, afterFullData } = this
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
          const _rowIndex = this._getRowIndex(currentRow)
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
    moveSelected (args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      const { afterFullData, visibleColumn, isSeqColumn } = this
      const params = Object.assign({}, args)
      const _rowIndex = this._getRowIndex(params.row)
      const _columnIndex = this._getColumnIndex(params.column)
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
        for (let len = _columnIndex - 1; len >= 0; len--) {
          if (!isSeqColumn(visibleColumn[len])) {
            params.columnIndex = len
            params.column = visibleColumn[len]
            break
          }
        }
      } else if (isRightArrow) {
        for (let index = _columnIndex + 1; index < visibleColumn.length; index++) {
          if (!isSeqColumn(visibleColumn[index])) {
            params.columnIndex = index
            params.column = visibleColumn[index]
            break
          }
        }
      }
      this.scrollToRow(params.row, params.column).then(() => {
        params.cell = this.getCell(params.row, params.column)
        this.handleSelected(params, evnt)
      })
    },
    /**
     * 表头按下事件
     */
    triggerHeaderCellMousedownEvent (evnt, params) {
      const { mouseConfig, mouseOpts } = this
      const cell = evnt.currentTarget
      const triggerSort = DomTools.getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
      const triggerFilter = DomTools.getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
      if (mouseConfig && mouseOpts.area && this.handleHeaderCellAreaEvent) {
        this.handleHeaderCellAreaEvent(evnt, Object.assign({ cell, triggerSort, triggerFilter }, params))
      } else if (mouseConfig && mouseOpts.checked) {
        this.handleHeaderCellCheckedEvent(evnt, Object.assign({ cell, triggerSort, triggerFilter }, params))
      }
      this.focus()
      this.closeMenu()
    },
    /**
     * 单元格按下事件
     */
    triggerCellMousedownEvent (evnt, params) {
      const cell = evnt.currentTarget
      params.cell = cell
      this.handleCellMousedownEvent(evnt, params)
      this.focus()
      this.closeFilter()
      this.closeMenu()
    },
    handleCellMousedownEvent (evnt, params) {
      const { mouseConfig, mouseOpts, checkboxConfig, checkboxOpts, editConfig, editOpts } = this
      const { column } = params
      if (mouseConfig && mouseOpts.area && this.handleCellAreaEvent) {
        this.handleCellAreaEvent(evnt, params)
      } else if (mouseConfig && mouseOpts.checked) {
        // 在 v3.0 中废弃 mouse-config.checked
        this.handleCheckedRangeEvent(evnt, params)
      } else {
        if (checkboxConfig && checkboxOpts.range) {
          this.handleCheckboxRangeEvent(evnt, params)
        }
        if (mouseConfig && mouseOpts.selected) {
          // v3.0 废弃 type=index
          if (!(column.type === 'seq' || column.type === 'index') && (!editConfig || editOpts.mode === 'cell')) {
            this.handleSelected(params, evnt)
          }
        }
      }
    },
    handleHeaderCellCheckedEvent (evnt, params) {
      const { $el, tableData, mouseConfig, mouseOpts, elemStore, handleChecked, handleHeaderChecked } = this
      const { button } = evnt
      const { column } = params
      const cell = evnt.currentTarget
      const isLeftBtn = button === 0
      // v3.0 废弃 type=index
      const isIndex = column.type === 'seq' || column.type === 'index'
      if (mouseConfig) {
        // 在 v3.0 中废弃 mouse-config.checked
        if (mouseOpts.checked) {
          const headerList = elemStore['main-header-list'].children
          const bodyList = elemStore['main-body-list'].children
          if (isIndex) {
            this.handleAllChecked(evnt)
          } else {
            this.clearSelected(evnt)
            this.clearHeaderChecked()
            this.clearIndexChecked()
            const startCell = bodyList[0].querySelector(`.${column.id}`)
            if (isLeftBtn) {
              const domMousemove = document.onmousemove
              const domMouseup = document.onmouseup
              const updateEvent = XEUtils.throttle(function (evnt) {
                let { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-header--column')
                if (!flag) {
                  const nodeRest = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
                  flag = nodeRest.flag
                  targetElem = nodeRest.targetElem
                }
                if (flag && !DomTools.hasClass(targetElem, 'col--seq')) {
                  const colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem)
                  const endCell = bodyList[bodyList.length - 1].children[colIndex]
                  const head = headerList[0].children[colIndex]
                  handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(head), DomTools.getCellNodeIndex(cell)))
                  handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(startCell), DomTools.getCellNodeIndex(endCell)))
                }
              }, 80, { leading: true, trailing: true })
              DomTools.addClass($el, 'c--checked')
              document.onmousemove = evnt => {
                evnt.preventDefault()
                evnt.stopPropagation()
                updateEvent(evnt)
              }
              document.onmouseup = function () {
                DomTools.removeClass($el, 'c--checked')
                document.onmousemove = domMousemove
                document.onmouseup = domMouseup
              }
            }
            handleHeaderChecked([[cell]])
            if (bodyList.length) {
              const endCell = bodyList[bodyList.length - 1].querySelector(`.${column.id}`)
              const firstTrElem = bodyList[0]
              const lastTrElem = bodyList[bodyList.length - 1]
              const firstCell = firstTrElem.querySelector('.col--seq')
              params.rowIndex = 0
              params.row = tableData[0]
              params.cell = this.getCell(params.row, params.column)
              this.handleSelected(params, evnt)
              this.handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(lastTrElem.querySelector('.col--seq'))))
              this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(startCell), DomTools.getCellNodeIndex(endCell)))
            }
          }
        }
      }
    },
    getCheckboxRangeRows (targetTrElem, moveRange) {
      let countHeight = 0
      const rangeRows = []
      const siblingProp = moveRange > 0 ? 'next' : 'previous'
      const moveSize = moveRange > 0 ? moveRange : (Math.abs(moveRange) + targetTrElem.offsetHeight)
      while (targetTrElem && countHeight < moveSize) {
        rangeRows.push(this.getRowNode(targetTrElem).item)
        countHeight += targetTrElem.offsetHeight
        targetTrElem = targetTrElem[`${siblingProp}ElementSibling`]
      }
      return rangeRows
    },
    handleCheckedRangeEvent (evnt, params) {
      const { $el, visibleColumn, editStore, mouseOpts, elemStore } = this
      const { checked } = editStore
      const { column } = params
      const { button } = evnt
      const cell = evnt.currentTarget
      const isLeftBtn = button === 0
      // v3.0 废弃 type=index
      const isIndex = column.type === 'seq' || column.type === 'index'
      this.clearHeaderChecked()
      this.clearIndexChecked()
      const bodyList = elemStore['main-body-list'].children
      const headerList = elemStore['main-header-list'].children
      const cellLastElementChild = cell.parentNode.lastElementChild
      const cellFirstElementChild = cell.parentNode.firstElementChild
      if (isLeftBtn) {
        const domMousemove = document.onmousemove
        const domMouseup = document.onmouseup
        const startCellNode = DomTools.getCellNodeIndex(cell)
        const colIndex = [].indexOf.call(cell.parentNode.children, cell)
        const headStart = headerList[0].children[colIndex]
        const updateEvent = XEUtils.throttle((evnt) => {
          const { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
          if (flag) {
            if (isIndex) {
              const firstCell = targetElem.parentNode.firstElementChild
              this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(cellLastElementChild)))
              this.handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cell)))
            } else if (!DomTools.hasClass(targetElem, 'col--seq')) {
              const firstCell = targetElem.parentNode.firstElementChild
              const colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem)
              const head = headerList[0].children[colIndex]
              this.handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(head), DomTools.getCellNodeIndex(headStart)))
              this.handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cellFirstElementChild)))
              this.handleChecked(DomTools.getRowNodes(bodyList, startCellNode, DomTools.getCellNodeIndex(targetElem)))
            }
          }
        }, 80, { leading: true, trailing: true })
        document.onmousemove = evnt => {
          evnt.preventDefault()
          evnt.stopPropagation()
          updateEvent(evnt)
        }
        document.onmouseup = function () {
          document.onmousemove = domMousemove
          document.onmouseup = domMouseup
        }
      }
      if (isIndex) {
        const firstCell = cell.parentNode.firstElementChild
        params.columnIndex++
        params.column = visibleColumn[params.columnIndex]
        params.cell = cell.nextElementSibling
        this.handleSelected(params, evnt)
        this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(cellLastElementChild)))
        this.handleHeaderChecked([headerList[0].querySelectorAll('.vxe-header--column:not(.col--seq)')])
        this.handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cell)))
      } else {
        if (isLeftBtn) {
          const firstCell = cell.parentNode.firstElementChild
          this.handleSelected(params, evnt)
          this.handleHeaderChecked([[headerList[0].querySelector(`.${column.id}`)]])
          this.handleIndexChecked([[firstCell]])
        } else {
          if (mouseOpts.selected) {
            // 如果右键单元格不在所有选中的范围之内则重新选中
            if (!checked.rowNodes || !checked.rowNodes.some(list => list.indexOf(cell) > -1)) {
              this.handleSelected(params, evnt)
            }
          }
        }
      }
    },
    handleCheckboxRangeEvent (evnt, params) {
      const { column, cell } = params
      const isLeftBtn = evnt.button === 0
      // 在 v3.0 中废弃 type=selection
      if (isLeftBtn && ['checkbox', 'selection'].indexOf(column.type) > -1) {
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
        let mouseScrollTimeout = null
        let isMouseScrollDown = false
        let mouseScrollSpaceSize = 1
        const triggerEvent = (type, evnt) => {
          this.emitEvent(`checkbox-range-${type}`, { records: this.getCheckboxRecords(), reserves: this.getCheckboxReserveRecords() }, evnt)
        }
        const handleChecked = (evnt) => {
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
          const rangeRows = getCheckboxRangeRows(this, params, trElem, offsetTop < marginSize ? -rangeHeight : rangeHeight)
          // 至少滑动 10px 才能有效匹配
          if (rangeHeight > 10 && rangeRows.length !== lastRangeRows.length) {
            lastRangeRows = rangeRows
            if (evnt.ctrlKey) {
              rangeRows.forEach(row => {
                this.handleSelectRow({ row }, selectRecords.indexOf(row) === -1)
              })
            } else {
              this.setAllCheckboxRow(false)
              this.setCheckboxRow(rangeRows, true)
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
        const startMouseScroll = (evnt) => {
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
        DomTools.addClass($el, 'drag--area')
        document.onmousemove = evnt => {
          evnt.preventDefault()
          evnt.stopPropagation()
          const { clientY } = evnt
          const { boundingTop } = DomTools.getAbsolutePos(bodyWrapperElem)
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
          DomTools.removeClass($el, 'drag--area')
          checkboxRangeElem.removeAttribute('style')
          document.onmousemove = domMousemove
          document.onmouseup = domMouseup
          triggerEvent('end', evnt)
        }
        triggerEvent('start', evnt)
      }
    },
    /**
     * 清除所有选中状态
     */
    _clearChecked () {
      const { $refs, editStore, mouseConfig, mouseOpts } = this
      const { checked } = editStore
      // 在 v3.0 中废弃 mouse-config.checked
      if (mouseConfig && mouseOpts.checked) {
        const tableBody = $refs.tableBody
        checked.rows = []
        checked.columns = []
        checked.tRows = []
        checked.tColumns = []
        const { checkBorders } = tableBody.$refs
        checkBorders.style.display = 'none'
        XEUtils.arrayEach(tableBody.$el.querySelectorAll('.col--checked'), elem => DomTools.removeClass(elem, 'col--checked'))
      }
      return this.$nextTick()
    },
    _getMouseSelecteds () {
      UtilTools.warn('vxe.error.delFunc', ['getMouseSelecteds', 'getSelectedCell'])
      return this.getSelectedCell()
    },
    _getMouseCheckeds () {
      // UtilTools.warn('vxe.error.delFunc', ['getMouseCheckeds', 'getSelectedRanges'])
      return this.getSelectedRanges()
    },
    /**
     * 获取选中的单元格
     */
    _getSelectedCell () {
      const { args, column } = this.editStore.selected
      if (args && column) {
        return Object.assign({}, args)
      }
      return null
    },
    /**
     * 获取所有选中的单元格
     */
    _getSelectedRanges () {
      const { checked } = this.editStore
      const { rowNodes = [] } = checked
      let columns = []
      let rows = []
      if (rowNodes && rowNodes.length) {
        rows = rowNodes.map(list => this.getRowNode(list[0].parentNode).item)
        columns = rowNodes[0].map(cell => this.getColumnNode(cell).item)
      }
      return {
        columns,
        rows,
        rowNodes
      }
    },
    /**
     * 处理所有选中
     */
    handleChecked (rowNodes) {
      const { checked } = this.editStore
      this.clearChecked()
      let cWidth = -2
      let cHeight = -2
      let offsetTop = 0
      let offsetLeft = 0
      XEUtils.arrayEach(rowNodes, (rows, rowIndex) => {
        const isTop = rowIndex === 0
        XEUtils.arrayEach(rows, (elem, colIndex) => {
          const isLeft = colIndex === 0
          if (isLeft && isTop) {
            offsetTop = elem.offsetTop
            offsetLeft = elem.offsetLeft
          }
          if (isTop) {
            cWidth += elem.offsetWidth
          }
          if (isLeft) {
            cHeight += elem.offsetHeight
          }
          DomTools.addClass(elem, 'col--checked')
        })
      })
      const { checkBorders, checkTop, checkRight, checkBottom, checkLeft } = this.$refs.tableBody.$refs
      checkBorders.style.display = 'block'
      Object.assign(checkTop.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft}px`,
        width: `${cWidth}px`
      })
      Object.assign(checkRight.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft + cWidth}px`,
        height: `${cHeight}px`
      })
      Object.assign(checkBottom.style, {
        top: `${offsetTop + cHeight}px`,
        left: `${offsetLeft}px`,
        width: `${cWidth}px`
      })
      Object.assign(checkLeft.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft}px`,
        height: `${cHeight}px`
      })
      checked.rowNodes = rowNodes
    },
    handleAllChecked (evnt) {
      const { tableData, visibleColumn, mouseConfig, mouseOpts, elemStore } = this
      // 在 v3.0 中废弃 mouse-config.checked
      if (mouseConfig && mouseOpts.checked) {
        evnt.preventDefault()
        const headerListElem = elemStore['main-header-list']
        const headerList = headerListElem.children
        const bodyList = elemStore['main-body-list'].children
        // v3.0 废弃 type=index
        const column = XEUtils.find(visibleColumn, column => column.type === 'seq' || column.type === 'index') || visibleColumn[0]
        const cell = headerListElem.querySelector(`.${column.id}`)
        const firstTrElem = bodyList[0]
        const lastTrElem = bodyList[bodyList.length - 1]
        const firstCell = firstTrElem.querySelector(`.${column.id}`)
        const params = {
          $table: this,
          rowIndex: 0,
          row: tableData[0],
          column: XEUtils.find(visibleColumn, column => column.property)
        }
        params.columnIndex = this.getColumnIndex(params.column)
        params.cell = this.getCell(params.row, params.column)
        this.handleSelected(params, evnt)
        this.handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(cell.nextElementSibling), DomTools.getCellNodeIndex(cell.parentNode.lastElementChild)))
        this.handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(lastTrElem.querySelector(`.${column.id}`))))
        this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(lastTrElem.lastElementChild)))
      }
    },
    handleIndexChecked (rowNodes) {
      const { indexs } = this.editStore
      this.clearIndexChecked()
      XEUtils.arrayEach(rowNodes, rows => {
        XEUtils.arrayEach(rows, elem => {
          DomTools.addClass(elem, 'col--seq-checked')
        })
      })
      indexs.rowNodes = rowNodes
    },
    _clearIndexChecked () {
      const { elemStore } = this
      const bodyElem = elemStore['main-body-list']
      XEUtils.arrayEach(bodyElem.querySelectorAll('.col--seq-checked'), elem => DomTools.removeClass(elem, 'col--seq-checked'))
      return this.$nextTick()
    },
    handleHeaderChecked (rowNodes) {
      const { titles } = this.editStore
      this.clearHeaderChecked()
      XEUtils.arrayEach(rowNodes, rows => {
        XEUtils.arrayEach(rows, elem => {
          DomTools.addClass(elem, 'col--title-checked')
        })
      })
      titles.rowNodes = rowNodes
    },
    _clearHeaderChecked () {
      const { elemStore } = this
      const headerElem = elemStore['main-header-list']
      if (headerElem) {
        XEUtils.arrayEach(headerElem.querySelectorAll('.col--title-checked'), elem => DomTools.removeClass(elem, 'col--title-checked'))
      }
      return this.$nextTick()
    },
    /**
     * 清空已复制的内容
     */
    _clearCopyed () {
      const { $refs, editStore, keyboardConfig } = this
      const { copyed } = editStore
      if (keyboardConfig && keyboardConfig.isCut) {
        const tableBody = $refs.tableBody
        const { copyBorders } = $refs.tableBody.$refs
        copyed.cut = false
        copyed.rows = []
        copyed.columns = []
        copyBorders.style.display = 'none'
        XEUtils.arrayEach(tableBody.$el.querySelectorAll('.col--copyed'), elem => DomTools.removeClass(elem, 'col--copyed'))
      }
      return this.$nextTick()
    },
    /**
     * 处理复制
     */
    handleCopyed (cut) {
      const { tableData, tableColumn, editStore } = this
      const { copyed, checked } = editStore
      const rowNodes = checked.rowNodes
      this.clearCopyed()
      let cWidth = -3
      let cHeight = -3
      let offsetTop = 0
      let offsetLeft = 0
      let columns = []
      let rows = []
      if (rowNodes.length) {
        const firstRows = rowNodes[0]
        const { rowIndex, columnIndex } = DomTools.getCellNodeIndex(firstRows[0])
        columns = tableColumn.slice(columnIndex, columnIndex + firstRows.length)
        rows = tableData.slice(rowIndex, rowIndex + rowNodes.length)
      }
      XEUtils.arrayEach(rowNodes, (rows, rowIndex) => {
        const isTop = rowIndex === 0
        XEUtils.arrayEach(rows, (elem, colIndex) => {
          const isLeft = colIndex === 0
          if (isLeft && isTop) {
            offsetTop = elem.offsetTop
            offsetLeft = elem.offsetLeft
          }
          if (isTop) {
            cWidth += elem.offsetWidth
          }
          if (isLeft) {
            cHeight += elem.offsetHeight
          }
          DomTools.addClass(elem, 'col--copyed')
        })
      })
      const { copyBorders, copyTop, copyRight, copyBottom, copyLeft } = this.$refs.tableBody.$refs
      copyBorders.style.display = 'block'
      Object.assign(copyTop.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft}px`,
        width: `${cWidth}px`
      })
      Object.assign(copyRight.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft + cWidth}px`,
        height: `${cHeight}px`
      })
      Object.assign(copyBottom.style, {
        top: `${offsetTop + cHeight}px`,
        left: `${offsetLeft}px`,
        width: `${cWidth}px`
      })
      Object.assign(copyLeft.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft}px`,
        height: `${cHeight}px`
      })
      copyed.cut = cut
      copyed.rows = rows
      copyed.columns = columns
      copyed.rowNodes = rowNodes
    },
    /**
     * 处理粘贴
     */
    handlePaste () {
      const { tableData, visibleColumn, editStore, elemStore } = this
      const { copyed, selected } = editStore
      const { cut, rows, columns } = copyed
      if (rows.length && columns.length && selected.row && selected.column) {
        const { rowIndex, columnIndex } = selected.args
        XEUtils.arrayEach(rows, (row, rIndex) => {
          const offsetRow = tableData[rowIndex + rIndex]
          if (offsetRow) {
            XEUtils.arrayEach(columns, (column, cIndex) => {
              const offsetColumn = visibleColumn[columnIndex + cIndex]
              if (offsetColumn) {
                UtilTools.setCellValue(offsetRow, offsetColumn, UtilTools.getCellValue(row, column))
              }
              if (cut) {
                UtilTools.setCellValue(row, column, null)
              }
            })
          }
        })
        if (cut) {
          this.clearCopyed()
        }
        const bodyList = elemStore['main-body-list'].children
        const cell = selected.args.cell
        const trElem = cell.parentNode
        const colIndex = XEUtils.arrayIndexOf(trElem.children, cell)
        const rIndex = XEUtils.arrayIndexOf(bodyList, trElem)
        const targetTrElem = bodyList[rIndex + rows.length - 1]
        const targetCell = targetTrElem.children[colIndex + columns.length - 1]
        this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(cell), DomTools.getCellNodeIndex(targetCell)))
      }
    }
  }
}
