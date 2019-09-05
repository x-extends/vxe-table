import XEUtils from 'xe-utils/methods/xe-utils'
import { UtilTools, DomTools } from '../../tools'

export default {
  // 处理 Tab 键移动
  moveTabSelected (args, evnt) {
    let { tableData, visibleColumn, editConfig, hasIndexColumn } = this
    let targetRow
    let targetRowIndex
    let targetColumn
    let targetColumnIndex
    let isShiftKey = evnt.shiftKey
    let params = Object.assign({}, args)
    let rowIndex = tableData.indexOf(params.row)
    let columnIndex = visibleColumn.indexOf(params.column)
    evnt.preventDefault()
    if (isShiftKey) {
      // 向左
      for (let len = columnIndex - 1; len >= 0; len--) {
        if (!hasIndexColumn(visibleColumn[len])) {
          targetColumnIndex = len
          targetColumn = visibleColumn[len]
          break
        }
      }
      if (!targetColumn && rowIndex > 0) {
        // 如果找不到从上一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
        targetRowIndex = rowIndex - 1
        targetRow = tableData[targetRowIndex]
        for (let len = visibleColumn.length - 1; len >= 0; len--) {
          if (!hasIndexColumn(visibleColumn[len])) {
            targetColumnIndex = len
            targetColumn = visibleColumn[len]
            break
          }
        }
      }
    } else {
      // 向右
      for (let index = columnIndex + 1; index < visibleColumn.length; index++) {
        if (!hasIndexColumn(visibleColumn[index])) {
          targetColumnIndex = index
          targetColumn = visibleColumn[index]
          break
        }
      }
      if (!targetColumn && rowIndex < tableData.length - 1) {
        // 如果找不到从下一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
        targetRowIndex = rowIndex + 1
        targetRow = tableData[targetRowIndex]
        for (let index = 0; index < visibleColumn.length; index++) {
          if (!hasIndexColumn(visibleColumn[index])) {
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
        if (editConfig.trigger === 'click' || editConfig.trigger === 'dblclick') {
          if (editConfig.mode === 'row') {
            this.handleActived(params, evnt)
          } else {
            this.handleSelected(params, evnt)
            this.scrollToRow(params.row, params.column)
          }
        }
      }
    }
  },
  // 处理当前行方向键移动
  moveCurrentRow (isUpArrow, isDwArrow, evnt) {
    let { currentRow, treeConfig, afterFullData } = this
    let targetRow
    evnt.preventDefault()
    if (treeConfig) {
      let { index, items } = XEUtils.findTree(afterFullData, item => item === currentRow, treeConfig)
      if (isUpArrow && index > 0) {
        targetRow = items[index - 1]
      } else if (isDwArrow && index < items.length - 1) {
        targetRow = items[index + 1]
      }
    } else {
      let rowIndex = afterFullData.indexOf(currentRow)
      if (isUpArrow && rowIndex > 0) {
        targetRow = afterFullData[rowIndex - 1]
      } else if (isDwArrow && rowIndex < afterFullData.length - 1) {
        targetRow = afterFullData[rowIndex + 1]
      }
    }
    if (targetRow) {
      let params = { $table: this, row: targetRow }
      this.scrollToRow(targetRow)
        .then(() => this.triggerCurrentRowEvent(evnt, params))
    }
  },
  // 处理可编辑方向键移动
  moveSelected (args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
    let { tableData, visibleColumn, hasIndexColumn } = this
    let params = Object.assign({}, args)
    evnt.preventDefault()
    if (isUpArrow && params.rowIndex) {
      params.rowIndex -= 1
      params.row = tableData[params.rowIndex]
    } else if (isDwArrow && params.rowIndex < tableData.length - 1) {
      params.rowIndex += 1
      params.row = tableData[params.rowIndex]
    } else if (isLeftArrow && params.columnIndex) {
      for (let len = params.columnIndex - 1; len >= 0; len--) {
        if (!hasIndexColumn(visibleColumn[len])) {
          params.columnIndex = len
          params.column = visibleColumn[len]
          break
        }
      }
    } else if (isRightArrow) {
      for (let index = params.columnIndex + 1; index < visibleColumn.length; index++) {
        if (!hasIndexColumn(visibleColumn[index])) {
          params.columnIndex = index
          params.column = visibleColumn[index]
          break
        }
      }
    }
    params.cell = DomTools.getCell(this, params)
    this.handleSelected(params, evnt)
    this.scrollToRow(params.row, params.column)
  },
  /**
   * 表头按下事件
   */
  triggerHeaderCellMousedownEvent (evnt, params) {
    let { $el, tableData, mouseConfig = {}, elemStore, handleChecked, handleHeaderChecked } = this
    let { button } = evnt
    let { column, cell } = params
    let isLeftBtn = button === 0
    let isIndex = column.type === 'index'
    if (isLeftBtn && mouseConfig.checked) {
      let headerList = elemStore['main-header-list'].children
      let bodyList = elemStore['main-body-list'].children
      if (isIndex) {
        this.handleAllChecked(evnt)
      } else {
        evnt.preventDefault()
        evnt.stopPropagation()
        this.clearSelected(evnt)
        this.clearHeaderChecked()
        this.clearIndexChecked()
        let domMousemove = document.onmousemove
        let domMouseup = document.onmouseup
        let startCell = bodyList[0].querySelector(`.${column.id}`)
        let updateEvent = XEUtils.throttle(function (evnt) {
          evnt.preventDefault()
          let { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-header--column')
          if (!flag) {
            let a = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
            flag = a.flag
            targetElem = a.targetElem
          }
          if (flag && !DomTools.hasClass(targetElem, 'col--index')) {
            let colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem)
            let endCell = bodyList[bodyList.length - 1].children[colIndex]
            let head = headerList[0].children[colIndex]
            handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(head), DomTools.getCellNodeIndex(cell)))
            handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(startCell), DomTools.getCellNodeIndex(endCell)))
          }
        }, 80, { leading: true, trailing: true })
        DomTools.addClass($el, 'c--checked')
        document.onmousemove = updateEvent
        document.onmouseup = function () {
          DomTools.removeClass($el, 'c--checked')
          document.onmousemove = domMousemove
          document.onmouseup = domMouseup
        }
        handleHeaderChecked([[cell]])
        if (bodyList.length) {
          let endCell = bodyList[bodyList.length - 1].querySelector(`.${column.id}`)
          let firstTrElem = bodyList[0]
          let lastTrElem = bodyList[bodyList.length - 1]
          let firstCell = firstTrElem.querySelector(`.col--index`)
          params.rowIndex = 0
          params.row = tableData[0]
          params.cell = DomTools.getCell(this, params)
          this.handleSelected(params, evnt)
          this.handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(lastTrElem.querySelector(`.col--index`))))
          this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(startCell), DomTools.getCellNodeIndex(endCell)))
        }
      }
      this.closeMenu()
    }
  },
  /**
   * 单元格按下事件
   */
  triggerCellMousedownEvent (evnt, params) {
    let {
      $el,
      visibleColumn,
      editStore,
      editConfig,
      handleSelected,
      mouseConfig = {},
      handleChecked,
      handleIndexChecked,
      handleHeaderChecked,
      elemStore
    } = this
    let { checked, actived } = editStore
    let { row, column, cell } = params
    let { button } = evnt
    let isLeftBtn = button === 0
    if (editConfig) {
      if (actived.row !== row || !(editConfig.mode === 'cell' && actived.column === column)) {
        if (isLeftBtn && mouseConfig.checked) {
          evnt.preventDefault()
          evnt.stopPropagation()
          this.clearHeaderChecked()
          this.clearIndexChecked()
          let domMousemove = document.onmousemove
          let domMouseup = document.onmouseup
          let startCellNode = DomTools.getCellNodeIndex(cell)
          let isIndex = column.type === 'index'
          let bodyList = elemStore['main-body-list'].children
          let headerList = elemStore['main-header-list'].children
          let cellLastElementChild = cell.parentNode.lastElementChild
          let cellFirstElementChild = cell.parentNode.firstElementChild
          let colIndex = [].indexOf.call(cell.parentNode.children, cell)
          let headStart = headerList[0].children[colIndex]
          let updateEvent = XEUtils.throttle(function (evnt) {
            evnt.preventDefault()
            let { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
            if (flag) {
              if (isIndex) {
                let firstCell = targetElem.parentNode.firstElementChild
                handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(cellLastElementChild)))
                handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cell)))
              } else if (!DomTools.hasClass(targetElem, 'col--index')) {
                let firstCell = targetElem.parentNode.firstElementChild
                let colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem)
                let head = headerList[0].children[colIndex]
                handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(head), DomTools.getCellNodeIndex(headStart)))
                handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cellFirstElementChild)))
                handleChecked(DomTools.getRowNodes(bodyList, startCellNode, DomTools.getCellNodeIndex(targetElem)))
              }
            }
          }, 80, { leading: true, trailing: true })
          document.onmousemove = updateEvent
          document.onmouseup = function (evnt) {
            document.onmousemove = domMousemove
            document.onmouseup = domMouseup
          }
          if (isIndex) {
            let firstCell = cell.parentNode.firstElementChild
            params.columnIndex++
            params.column = visibleColumn[params.columnIndex]
            params.cell = cell.nextElementSibling
            handleSelected(params, evnt)
            handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(cellLastElementChild)))
            handleHeaderChecked([headerList[0].querySelectorAll('.vxe-header--column:not(.col--index)')])
            handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cell)))
          } else {
            let firstCell = cell.parentNode.firstElementChild
            handleSelected(params, evnt)
            handleHeaderChecked([[headerList[0].querySelector(`.${column.id}`)]])
            handleIndexChecked([[firstCell]])
          }
          this.closeFilter()
          this.closeMenu()
        } else if (mouseConfig.selected) {
          // 除了双击其他都没有选中状态
          if (editConfig.trigger === 'dblclick') {
            // 如果不在所有选中的范围之内则重新选中
            if (!checked.rowNodes || !checked.rowNodes.some(list => list.includes(cell))) {
              handleSelected(params, evnt)
            }
          }
        }
      }
    } else if (mouseConfig.selected) {
      handleSelected(params, evnt)
    }
  },
  /**
   * 边角事件
   */
  // triggerCornerMousedownEvent (params, evnt) {
  //   evnt.preventDefault()
  //   evnt.stopPropagation()
  //   let { $el, tableData, visibleColumn, editStore, editConfig, handleTempChecked } = this
  //   let { checked } = editStore
  //   let { button } = evnt
  //   let isLeftBtn = button === 0
  //   let isRightBtn = button === 2
  //   if (isLeftBtn || isRightBtn) {
  //     if (editConfig && checked.rows.length && editConfig.trigger === 'dblclick') {
  //       let domMousemove = document.onmousemove
  //       let domMouseup = document.onmouseup
  //       let start = {
  //         rowIndex: tableData.indexOf(checked.rows[0]),
  //         columnIndex: visibleColumn.indexOf(checked.columns[0])
  //       }
  //       let updateEvent = XEUtils.throttle(function (evnt) {
  //         evnt.preventDefault()
  //         let { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
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
  /**
   * 清除所选中源状态
   */
  clearSelected (evnt) {
    let { editStore, elemStore } = this
    let { selected } = editStore
    selected.row = null
    selected.column = null
    let headerElem = elemStore['main-header-list']
    let bodyElem = elemStore['main-body-list']
    if (headerElem) {
      XEUtils.arrayEach(headerElem.querySelectorAll('.col--title-selected'), elem => DomTools.removeClass(elem, 'col--title-selected'))
    }
    XEUtils.arrayEach([bodyElem.querySelector('.col--selected')], elem => DomTools.removeClass(elem, 'col--selected'))
    return this.$nextTick()
  },
  /**
   * 清除所有选中状态
   */
  clearChecked (evnt) {
    let { $refs, editStore, mouseConfig } = this
    let { checked } = editStore
    if (mouseConfig && mouseConfig.checked) {
      let tableBody = $refs.tableBody
      checked.rows = []
      checked.columns = []
      checked.tRows = []
      checked.tColumns = []
      let { checkBorders } = tableBody.$refs
      checkBorders.style.display = 'none'
      XEUtils.arrayEach(tableBody.$el.querySelectorAll('.col--checked'), elem => DomTools.removeClass(elem, 'col--checked'))
    }
    return this.$nextTick()
  },
  getMouseCheckeds () {
    let { checked } = this.editStore
    let { rowNodes = [] } = checked
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
    let { checked } = this.editStore
    this.clearChecked()
    let cWidth = -2
    let cHeight = -2
    let offsetTop = 0
    let offsetLeft = 0
    XEUtils.arrayEach(rowNodes, (rows, rowIndex) => {
      let isTop = rowIndex === 0
      XEUtils.arrayEach(rows, (elem, colIndex) => {
        let isLeft = colIndex === 0
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
    let { checkBorders, checkTop, checkRight, checkBottom, checkLeft } = this.$refs.tableBody.$refs
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
    let { tableData, visibleColumn, mouseConfig = {}, elemStore } = this
    if (mouseConfig.checked) {
      evnt.preventDefault()
      let headerListElem = elemStore['main-header-list']
      let headerList = headerListElem.children
      let bodyList = elemStore['main-body-list'].children
      let column = visibleColumn.find(column => column.type === 'index') || visibleColumn[0]
      let cell = headerListElem.querySelector(`.${column.id}`)
      let firstTrElem = bodyList[0]
      let lastTrElem = bodyList[bodyList.length - 1]
      let firstCell = firstTrElem.querySelector(`.${column.id}`)
      let params = {
        $table: this,
        rowIndex: 0,
        row: tableData[0],
        column: visibleColumn.find(column => column.property)
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
    let { indexs } = this.editStore
    this.clearIndexChecked()
    XEUtils.arrayEach(rowNodes, rows => {
      XEUtils.arrayEach(rows, elem => {
        DomTools.addClass(elem, 'col--index-checked')
      })
    })
    indexs.rowNodes = rowNodes
  },
  clearIndexChecked () {
    let { elemStore } = this
    let bodyElem = elemStore['main-body-list']
    XEUtils.arrayEach(bodyElem.querySelectorAll('.col--index-checked'), elem => DomTools.removeClass(elem, 'col--index-checked'))
    return this.$nextTick()
  },
  handleHeaderChecked (rowNodes) {
    let { titles } = this.editStore
    this.clearHeaderChecked()
    XEUtils.arrayEach(rowNodes, rows => {
      XEUtils.arrayEach(rows, elem => {
        DomTools.addClass(elem, 'col--title-checked')
      })
    })
    titles.rowNodes = rowNodes
  },
  clearHeaderChecked () {
    let { elemStore } = this
    let headerElem = elemStore['main-header-list']
    if (headerElem) {
      XEUtils.arrayEach(headerElem.querySelectorAll('.col--title-checked'), elem => DomTools.removeClass(elem, 'col--title-checked'))
    }
    return this.$nextTick()
  },
  /**
   * 处理所有选中的临时选中
   */
  // handleTempChecked (start, end, evnt) {
  //   let { tableData, visibleColumn, editStore } = this
  //   let { checked } = editStore
  //   let { rows, tRows, columns, tColumns } = checked
  //   let { rowIndex: sRowIndex, columnIndex: sColumnIndex } = start
  //   let { rowIndex: eRowIndex, columnIndex: eColumnIndex } = end
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
  clearCopyed () {
    let { $refs, editStore, keyboardConfig } = this
    let { copyed } = editStore
    if (keyboardConfig && keyboardConfig.isCut) {
      let tableBody = $refs.tableBody
      let { copyBorders } = $refs.tableBody.$refs
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
  handleCopyed (cut, evnt) {
    let { tableData, tableColumn, editStore } = this
    let { copyed, checked } = editStore
    let rowNodes = checked.rowNodes
    this.clearCopyed()
    let cWidth = -3
    let cHeight = -3
    let offsetTop = 0
    let offsetLeft = 0
    let columns = []
    let rows = []
    if (rowNodes.length) {
      let firstRows = rowNodes[0]
      let { rowIndex, columnIndex } = DomTools.getCellNodeIndex(firstRows[0])
      columns = tableColumn.slice(columnIndex, columnIndex + firstRows.length)
      rows = tableData.slice(rowIndex, rowIndex + rowNodes.length)
    }
    XEUtils.arrayEach(rowNodes, (rows, rowIndex) => {
      let isTop = rowIndex === 0
      XEUtils.arrayEach(rows, (elem, colIndex) => {
        let isLeft = colIndex === 0
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
    let { copyBorders, copyTop, copyRight, copyBottom, copyLeft } = this.$refs.tableBody.$refs
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
  handlePaste (evnt) {
    let { tableData, visibleColumn, editStore, elemStore } = this
    let { copyed, selected } = editStore
    let { cut, rows, columns } = copyed
    if (rows.length && columns.length && selected.row && selected.column) {
      let { rowIndex, columnIndex } = selected.args
      XEUtils.arrayEach(rows, (row, rIndex) => {
        let offsetRow = tableData[rowIndex + rIndex]
        if (offsetRow) {
          XEUtils.arrayEach(columns, (column, cIndex) => {
            let offsetColumn = visibleColumn[columnIndex + cIndex]
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
      let bodyList = elemStore['main-body-list'].children
      let cell = selected.args.cell
      let trElem = cell.parentNode
      let colIndex = XEUtils.arrayIndexOf(trElem.children, cell)
      let rIndex = XEUtils.arrayIndexOf(bodyList, trElem)
      let targetTrElem = bodyList[rIndex + rows.length - 1]
      let targetCell = targetTrElem.children[colIndex + columns.length - 1]
      this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(cell), DomTools.getCellNodeIndex(targetCell)))
    }
  }
}
