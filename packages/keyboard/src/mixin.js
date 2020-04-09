import XEUtils from 'xe-utils/methods/xe-utils'
import { DomTools } from '../../tools'

export default {
  methods: {
    // 处理 Tab 键移动
    moveTabSelected (args, isLeft, evnt) {
      const { afterFullData, visibleColumn, editConfig, editOpts } = this
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
          targetColumnIndex = len
          targetColumn = visibleColumn[len]
          break
        }
        if (!targetColumn && rowIndex > 0) {
          // 如果找不到从上一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex - 1
          targetRow = afterFullData[targetRowIndex]
          for (let len = visibleColumn.length - 1; len >= 0; len--) {
            targetColumnIndex = len
            targetColumn = visibleColumn[len]
            break
          }
        }
      } else {
        // 向右
        for (let index = columnIndex + 1; index < visibleColumn.length; index++) {
          targetColumnIndex = index
          targetColumn = visibleColumn[index]
          break
        }
        if (!targetColumn && rowIndex < afterFullData.length - 1) {
          // 如果找不到从下一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex + 1
          targetRow = afterFullData[targetRowIndex]
          for (let index = 0; index < visibleColumn.length; index++) {
            targetColumnIndex = index
            targetColumn = visibleColumn[index]
            break
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
      const { afterFullData, visibleColumn } = this
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
          params.columnIndex = len
          params.column = visibleColumn[len]
          break
        }
      } else if (isRightArrow) {
        for (let index = params.columnIndex + 1; index < visibleColumn.length; index++) {
          params.columnIndex = index
          params.column = visibleColumn[index]
          break
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
     * 单元格按下事件
     */
    triggerCellMousedownEvent (evnt, params) {
      const { editConfig, editOpts, handleSelected, checkboxOpts, mouseOpts } = this
      const { button } = evnt
      const cell = evnt.currentTarget
      const isLeftBtn = button === 0
      params.cell = cell
      if (checkboxOpts.range) {
        if (isLeftBtn) {
          this.handleCheckboxRangeEvent(evnt, params)
        }
      }
      if (mouseOpts.selected) {
        if (!editConfig || editOpts.mode === 'cell') {
          handleSelected(params, evnt)
        }
      }
      this.isActivated = true
      this.closeFilter()
      this.closeMenu()
    },
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
      if (column.type === 'checkbox') {
        const disX = evnt.clientX
        const disY = evnt.clientY
        const checkboxRangeElem = this.$refs.checkboxRange
        const domMousemove = document.onmousemove
        const domMouseup = document.onmouseup
        const trEleme = cell.parentNode
        const { scrollTop, scrollLeft } = DomTools.getDomNode()
        const absPos = DomTools.getAbsolutePos(trEleme)
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
    }
  }
}
