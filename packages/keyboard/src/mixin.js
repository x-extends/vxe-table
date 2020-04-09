import XEUtils from 'xe-utils/methods/xe-utils'
import { UtilTools, DomTools } from '../../tools'

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
        params.cell = DomTools.getCell(this, params)
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
      let _rowIndex = this._getRowIndex(params.row)
      evnt.preventDefault()
      if (isUpArrow && _rowIndex) {
        _rowIndex -= 1
        params.row = afterFullData[_rowIndex]
      } else if (isDwArrow && _rowIndex < afterFullData.length - 1) {
        _rowIndex += 1
        params.row = afterFullData[_rowIndex]
      } else if (isLeftArrow && params.columnIndex) {
        for (let len = params.columnIndex - 1; len >= 0; len--) {
          if (!isSeqColumn(visibleColumn[len])) {
            params.columnIndex = len
            params.column = visibleColumn[len]
            break
          }
        }
      } else if (isRightArrow) {
        for (let index = params.columnIndex + 1; index < visibleColumn.length; index++) {
          if (!isSeqColumn(visibleColumn[index])) {
            params.columnIndex = index
            params.column = visibleColumn[index]
            break
          }
        }
      }
      if (params.rowIndex > -1) {
        params.rowIndex = _rowIndex
      }
      this.scrollToRow(params.row, params.column).then(() => {
        params.cell = DomTools.getCell(this, params)
        this.handleSelected(params, evnt)
      })
    },
    /**
     * 表头按下事件
     */
    triggerHeaderCellMousedownEvent (evnt, params) {
      const { $el, tableData, mouseConfig, mouseOpts, elemStore, handleChecked, handleHeaderChecked } = this
      const { button } = evnt
      const { column } = params
      const cell = evnt.currentTarget
      const isLeftBtn = button === 0
      // v3.0 废弃 type=index
      const isIndex = column.type === 'seq' || column.type === 'index'
      // 在 v3.0 中废弃 mouse-config.checked
      const isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked)
      params.cell = cell
      if (mouseConfig) {
        if (isMouseChecked) {
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
              params.cell = DomTools.getCell(this, params)
              this.handleSelected(params, evnt)
              this.handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(lastTrElem.querySelector('.col--seq'))))
              this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(startCell), DomTools.getCellNodeIndex(endCell)))
            }
          }
        }
      }
      this.isActivated = true
      this.closeMenu()
    },
    /**
     * 单元格按下事件
     */
    triggerCellMousedownEvent (evnt, params) {
      const {
        $el,
        visibleColumn,
        editStore,
        editConfig,
        editOpts,
        handleSelected,
        checkboxOpts,
        mouseConfig,
        mouseOpts,
        handleChecked,
        handleIndexChecked,
        handleHeaderChecked,
        elemStore
      } = this
      const { checked } = editStore
      const { column } = params
      const { button } = evnt
      const cell = evnt.currentTarget
      const isLeftBtn = button === 0
      // v3.0 废弃 type=index
      const isIndex = column.type === 'seq' || column.type === 'index'
      // 在 v3.0 中废弃 mouse-config.checked
      const isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked)
      params.cell = cell
      if (isMouseChecked) {
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
          const updateEvent = XEUtils.throttle(function (evnt) {
            const { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
            if (flag) {
              if (isIndex) {
                const firstCell = targetElem.parentNode.firstElementChild
                handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(cellLastElementChild)))
                handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cell)))
              } else if (!DomTools.hasClass(targetElem, 'col--seq')) {
                const firstCell = targetElem.parentNode.firstElementChild
                const colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem)
                const head = headerList[0].children[colIndex]
                handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(head), DomTools.getCellNodeIndex(headStart)))
                handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cellFirstElementChild)))
                handleChecked(DomTools.getRowNodes(bodyList, startCellNode, DomTools.getCellNodeIndex(targetElem)))
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
          handleSelected(params, evnt)
          handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(cellLastElementChild)))
          handleHeaderChecked([headerList[0].querySelectorAll('.vxe-header--column:not(.col--seq)')])
          handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cell)))
        } else {
          if (isLeftBtn) {
            const firstCell = cell.parentNode.firstElementChild
            handleSelected(params, evnt)
            handleHeaderChecked([[headerList[0].querySelector(`.${column.id}`)]])
            handleIndexChecked([[firstCell]])
          } else {
            if (mouseOpts.selected) {
              // 如果右键单元格不在所有选中的范围之内则重新选中
              if (!checked.rowNodes || !checked.rowNodes.some(list => list.indexOf(cell) > -1)) {
                handleSelected(params, evnt)
              }
            }
          }
        }
      } else {
        if (checkboxOpts.range) {
          if (isLeftBtn) {
            this.handleCheckboxRangeEvent(evnt, params)
          }
        }
        if (mouseOpts.selected) {
          if (!isIndex && (!editConfig || editOpts.mode === 'cell')) {
            handleSelected(params, evnt)
          }
        }
      }
      this.isActivated = true
      this.closeFilter()
      this.closeMenu()
    },
    /**
     * 边角事件
     */
    // triggerCornerMousedownEvent (params, evnt) {
    //   evnt.preventDefault()
    //   evnt.stopPropagation()
    //   const { $el, tableData, visibleColumn, editStore, editConfig, editOpts, handleTempChecked } = this
    //   const { checked } = editStore
    //   const { button } = evnt
    //   const isLeftBtn = button === 0
    //   const isRightBtn = button === 2
    //   if (isLeftBtn || isRightBtn) {
    //     if (editConfig && checked.rows.length && editOpts.trigger === 'dblclick') {
    //       const domMousemove = document.onmousemove
    //       const domMouseup = document.onmouseup
    //       const start = {
    //         rowIndex: tableData.indexOf(checked.rows[0]),
    //         columnIndex: visibleColumn.indexOf(checked.columns[0])
    //       }
    //       const updateEvent = XEUtils.throttle(function (evnt) {
    //         evnt.preventDefault()
    //         const { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
    //         if (flag) {
    //           handleTempChecked(start, DomTools.getCellIndexs(targetElem), evnt)
    //         }
    //       }, browse.msie ? 80 : 40, { leading: true, trailing: true })
    //       document.onmousemove = updateEvent
    //       document.onmouseup = function (evnt) {
    //         document.onmousemove = domMousemove
    //         document.onmouseup = domMouseup
    //         checked.rows = checked.tRows
    //         checked.columns = checked.tColumns
    //       }
    //     }
    //   }
    // },
    getCheckboxRangeResult (targetTrElem, moveRange) {
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
    handleCheckboxRangeEvent (evnt, params) {
      const { column, cell } = params
      // 在 v3.0 中废弃 type=selection
      if (['checkbox', 'selection'].indexOf(column.type) > -1) {
        const disX = evnt.clientX
        const disY = evnt.clientY
        const checkboxRangeElem = this.$refs.checkboxRange
        const domMousemove = document.onmousemove
        const domMouseup = document.onmouseup
        const trEleme = cell.parentNode
        const absPos = DomTools.getAbsolutePos(trEleme)
        const { scrollTop, scrollLeft } = DomTools.getDomNode()
        const selectRecords = this.getCheckboxRecords()
        let lastRangeRows = []
        this.updateZindex()
        document.onmousemove = evnt => {
          evnt.preventDefault()
          evnt.stopPropagation()
          const offsetLeft = evnt.clientX - disX
          const offsetTop = evnt.clientY - disY
          const rangeHeight = Math.abs(offsetTop)
          const rangeRows = this.getCheckboxRangeResult(trEleme, evnt.clientY - absPos.boundingTop)
          checkboxRangeElem.style.display = 'block'
          checkboxRangeElem.style.width = `${Math.abs(offsetLeft)}px`
          checkboxRangeElem.style.height = `${rangeHeight}px`
          checkboxRangeElem.style.left = `${scrollLeft + disX + (offsetLeft > 0 ? 0 : offsetLeft)}px`
          checkboxRangeElem.style.top = `${scrollTop + disY + (offsetTop > 0 ? 0 : offsetTop)}px`
          checkboxRangeElem.style.zIndex = `${this.tZindex}`
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
          }
        }
        document.onmouseup = () => {
          checkboxRangeElem.removeAttribute('style')
          document.onmousemove = domMousemove
          document.onmouseup = domMouseup
        }
      }
    },
    /**
     * 清除所有选中状态
     */
    _clearChecked () {
      const { $refs, editStore, mouseConfig, mouseOpts } = this
      const { checked } = editStore
      // 在 v3.0 中废弃 mouse-config.checked
      const isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked)
      if (isMouseChecked) {
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
      const isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked)
      if (isMouseChecked) {
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
        params.cell = DomTools.getCell(this, params)
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
     * 处理所有选中的临时选中
     */
    // handleTempChecked (start, end, evnt) {
    //   const { tableData, visibleColumn, editStore } = this
    //   const { checked } = editStore
    //   const { rows, tRows, columns, tColumns } = checked
    //   const { rowIndex: sRowIndex, columnIndex: sColumnIndex } = start
    //   const { rowIndex: eRowIndex, columnIndex: eColumnIndex } = end
    //   if (tRows.length > rows.length) {
    //     eColumnIndex = visibleColumn.indexOf(columns[columns.length - 1])
    //   } else if (tColumns.length > columns.length) {
    //     eRowIndex = tableData.indexOf(rows[rows.length - 1])
    //   }
    //   if (sRowIndex < eRowIndex) {
    //     // 向下
    //     checked.tRows = tableData.slice(sRowIndex, eRowIndex + 1)
    //   } else {
    //     // 向上
    //     sRowIndex += rows.length
    //     checked.tRows = tableData.slice(eRowIndex, sRowIndex)
    //   }
    //   if (sColumnIndex < eColumnIndex) {
    //     // 向右
    //     checked.tColumns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1)
    //   } else {
    //     // 向左
    //     sColumnIndex += columns.length
    //     checked.tColumns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex)
    //   }
    // },
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
