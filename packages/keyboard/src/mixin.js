import XEUtils from 'xe-utils/methods/xe-utils'
import { DomTools } from '../../tools'

export default {
  methods: {
    // 处理 Tab 键移动
    moveTabSelected (args, isLeft, evnt) {
      const { afterFullData, visibleColumn, editConfig, editOpts } = this
      let targetRow
      let targetRowIndex
      let targetColumnIndex
      const params = Object.assign({}, args)
      const _rowIndex = this._getRowIndex(params.row)
      const _columnIndex = this._getColumnIndex(params.column)
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
        // 移动到左侧单元格
        params.columnIndex = _columnIndex - 1
        params.column = visibleColumn[params.columnIndex]
      } else if (isRightArrow && _columnIndex < visibleColumn.length - 1) {
        // 移动到右侧单元格
        params.columnIndex = _columnIndex + 1
        params.column = visibleColumn[params.columnIndex]
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
