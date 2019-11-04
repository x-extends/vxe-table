import XEUtils from 'xe-utils/methods/xe-utils'
import { Renderer } from '../../v-x-e-table'
import { UtilTools, DomTools } from '../../tools'

var browse = DomTools.browse

export default {
  methods: {
    /**
     * 往表格中插入临时数据
     *
     * @param {*} records
     */
    _insert (records) {
      return this.insertAt(records)
    },
    /**
     * 往表格指定行中插入临时数据
     * 如果 row 为空则从插入到顶部
     * 如果 row 为 -1 则从插入到底部
     * 如果 row 为有效行则插入到该行的位置
     * @param {Object/Array} records 新的数据
     * @param {Row} row 指定行
     */
    _insertAt (records, row) {
      let { afterFullData, editStore, scrollYLoad, tableFullData, treeConfig } = this
      if (treeConfig) {
        throw new Error(UtilTools.getLog('vxe.error.noTree', ['insert']))
      }
      if (!XEUtils.isArray(records)) {
        records = [records]
      }
      let nowData = afterFullData
      let newRecords = records.map(record => this.defineField(Object.assign({}, record)))
      if (!row) {
        nowData.unshift.apply(nowData, newRecords)
        tableFullData.unshift.apply(tableFullData, newRecords)
      } else {
        if (row === -1) {
          nowData.push.apply(nowData, newRecords)
          tableFullData.push.apply(tableFullData, newRecords)
        } else {
          let targetIndex = nowData.indexOf(row)
          if (targetIndex === -1) {
            throw new Error(UtilTools.error('vxe.error.unableInsert'))
          }
          nowData.splice.apply(nowData, [targetIndex, 0].concat(newRecords))
          tableFullData.splice.apply(tableFullData, [tableFullData.indexOf(row), 0].concat(newRecords))
        }
      }
      [].unshift.apply(editStore.insertList, newRecords)
      this.handleTableData()
      this.updateCache()
      this.checkSelectionStatus()
      if (scrollYLoad) {
        this.updateScrollYSpace()
      }
      return this.$nextTick().then(() => {
        this.recalculate()
        return {
          row: newRecords.length ? newRecords[newRecords.length - 1] : null,
          rows: newRecords
        }
      })
    },
    /**
     * 删除指定行数据
     * 如果传 row 则删除一行
     * 如果传 rows 则删除多行
     * 如果为空则删除所有
     */
    _remove (rows) {
      let { afterFullData, tableFullData, editStore, treeConfig, selection, isInsertByRow, scrollYLoad } = this
      let { removeList, insertList } = editStore
      // 在 v3.0 中废弃 selectConfig
      let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
      let { checkField: property } = checkboxConfig
      let rest = []
      let nowData = afterFullData
      if (treeConfig) {
        throw new Error(UtilTools.getLog('vxe.error.noTree', ['remove']))
      }
      if (!rows) {
        rows = tableFullData
      } else if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      // 如果是新增，则保存记录
      rows.forEach(row => {
        if (!isInsertByRow(row)) {
          removeList.push(row)
        }
      })
      // 如果绑定了多选属性，则更新状态
      if (!property) {
        XEUtils.remove(selection, row => rows.indexOf(row) > -1)
      }
      // 从数据源中移除
      if (tableFullData === rows) {
        rows = tableFullData.slice(0)
        tableFullData.length = 0
        nowData.length = 0
      } else {
        rest = XEUtils.remove(tableFullData, row => rows.indexOf(row) > -1)
        XEUtils.remove(nowData, row => rows.indexOf(row) > -1)
      }
      // 从新增中移除已删除的数据
      XEUtils.remove(insertList, row => rows.indexOf(row) > -1)
      this.handleTableData()
      this.updateCache()
      this.checkSelectionStatus()
      if (scrollYLoad) {
        this.updateScrollYSpace()
      }
      return this.$nextTick().then(() => {
        this.recalculate()
        return { row: rows && rows.length ? rows[rows.length - 1] : null, rows: rest }
      })
    },
    /**
     * 删除选中数据
     */
    _removeSelecteds () {
      return this.remove(this.getSelectRecords()).then(params => {
        this.clearSelection()
        return params
      })
    },
    _revert () {
      UtilTools.warn('vxe.error.delFunc', ['revert', 'revertData'])
      return this.revertData.apply(this, arguments)
    },
    /**
     * 还原数据
     * 如果不传任何参数，则还原整个表格
     * 如果传 row 则还原一行
     * 如果传 rows 则还原多行
     * 如果还额外传了 field 则还原指定的单元格数据
     */
    _revertData (rows, field) {
      let { tableSourceData, getRowIndex } = this
      if (arguments.length) {
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        rows.forEach(row => {
          let rowIndex = getRowIndex(row)
          let oRow = tableSourceData[rowIndex]
          if (oRow && row) {
            if (field) {
              XEUtils.set(row, field, XEUtils.get(oRow, field))
            } else {
              XEUtils.destructuring(row, oRow)
            }
          }
        })
        return this.$nextTick()
      }
      return this.reloadData(tableSourceData)
    },
    /**
     * 获取表格数据集，包含新增、删除、修改
     */
    _getRecordset () {
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      }
    },
    /**
     * 获取新增的临时数据
     */
    _getInsertRecords () {
      return this.editStore.insertList
    },
    /**
     * 获取已删除的数据
     */
    _getRemoveRecords () {
      return this.editStore.removeList
    },
    /**
     * 获取更新数据
     * 只精准匹配 row 的更改
     * 如果是树表格，子节点更改状态不会影响父节点的更新状态
     */
    _getUpdateRecords () {
      let { tableFullData, isUpdateByRow, treeConfig } = this
      if (treeConfig) {
        return XEUtils.filterTree(tableFullData, row => isUpdateByRow(row), treeConfig)
      }
      return tableFullData.filter(row => isUpdateByRow(row))
    },
    /**
     * 处理激活编辑
     */
    handleActived (params, evnt) {
      let { editStore, editConfig, tableColumn } = this
      let { activeMethod } = editConfig
      let { actived } = editStore
      let { row, column, cell } = params
      let { editRender } = column
      if (editRender && cell) {
        if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
          // 判断是否禁用编辑
          let type = 'edit-disabled'
          if (!activeMethod || activeMethod(params)) {
            if (this.keyboardConfig || this.mouseConfig) {
              this.clearCopyed(evnt)
              this.clearChecked()
              this.clearSelected(evnt)
            }
            this.clostTooltip()
            this.clearActived(evnt)
            type = 'edit-actived'
            column.renderHeight = cell.offsetHeight
            actived.args = params
            actived.row = row
            actived.column = column
            if (editConfig.mode === 'row') {
              tableColumn.forEach(column => this._getColumnModel(row, column))
            } else {
              this._getColumnModel(row, column)
            }
            this.$nextTick(() => {
              this.handleFocus(params, evnt)
            })
          }
          UtilTools.emitEvent(this, type, [params, evnt])
        } else {
          let { column: oldColumn } = actived
          if (oldColumn !== column) {
            let { model: oldModel } = oldColumn
            if (oldModel.update) {
              UtilTools.setCellValue(row, oldColumn, oldModel.value)
            }
            this.clearValidate()
          }
          column.renderHeight = cell.offsetHeight
          actived.args = params
          actived.column = column
          setTimeout(() => {
            this.handleFocus(params, evnt)
          })
        }
      }
      return this.$nextTick()
    },
    _getColumnModel (row, column) {
      let { model, editRender } = column
      if (editRender) {
        model.value = UtilTools.getCellValue(row, column)
        model.update = false
      }
    },
    _setColumnModel (row, column) {
      let { model, editRender } = column
      if (editRender && model.update) {
        UtilTools.setCellValue(row, column, model.value)
        model.update = false
        model.value = null
      }
    },
    /**
     * 清除激活的编辑
     */
    _clearActived (evnt) {
      let { tableColumn, editStore, editConfig = {} } = this
      let { actived } = editStore
      let { args, row, column } = actived
      if (row || column) {
        if (editConfig.mode === 'row') {
          tableColumn.forEach(column => this._setColumnModel(row, column))
        } else {
          this._setColumnModel(row, column)
        }
        this.updateFooter()
        UtilTools.emitEvent(this, 'edit-closed', [args, evnt])
      }
      actived.args = null
      actived.row = null
      actived.column = null
      return this.clearValidate().then(this.recalculate)
    },
    _getActiveRow () {
      let { $el, editStore, tableData } = this
      let { args, row } = editStore.actived
      if (args && tableData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
        return Object.assign({}, args)
      }
      return null
    },
    // 在 v3.0 中废弃 hasActiveRow
    _hasActiveRow (row) {
      return this.isActiveByRow(row)
    },
    /**
     * 判断行是否为激活编辑状态
     * @param {Row} row 行对象
     */
    _isActiveByRow (row) {
      return this.editStore.actived.row === row
    },
    /**
     * 处理聚焦
     */
    handleFocus (params, evnt) {
      let { row, column, cell } = params
      let { editRender } = column
      if (editRender) {
        let compRender = Renderer.get(editRender.name)
        let { autofocus, autoselect } = editRender
        let inputElem
        // 如果指定了聚焦 class
        if (autofocus) {
          inputElem = cell.querySelector(autofocus)
        }
        // 渲染器的聚焦处理
        if (!inputElem && compRender && compRender.autofocus) {
          inputElem = cell.querySelector(compRender.autofocus)
        }
        if (inputElem) {
          inputElem[autoselect ? 'select' : 'focus']()
          if (browse.msie) {
            let textRange = inputElem.createTextRange()
            textRange.collapse(false)
            textRange.select()
          }
        } else {
          // 显示到可视区中
          this.scrollToRow(row, column)
        }
      }
    },
    /**
     * 激活行编辑
     */
    _setActiveRow (row) {
      return this.setActiveCell(row, this.visibleColumn.find(column => column.editRender).property)
    },
    /**
     * 激活单元格编辑
     */
    _setActiveCell (row, field) {
      return this.scrollToRow(row, true).then(() => {
        if (row && field) {
          let column = this.visibleColumn.find(column => column.property === field)
          if (column && column.editRender) {
            let cell = DomTools.getCell(this, { row, column })
            if (cell) {
              this.handleActived({ row, rowIndex: this.getRowIndex(row), column, columnIndex: this.getColumnIndex(column), cell, $table: this })
              this.lastCallTime = Date.now()
            }
          }
        }
        return this.$nextTick()
      })
    },
    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    _setSelectCell (row, field) {
      let { tableData, editConfig, visibleColumn } = this
      if (row && field && editConfig.trigger !== 'manual') {
        let column = visibleColumn.find(column => column.property === field)
        let rowIndex = tableData.indexOf(row)
        if (rowIndex > -1 && column) {
          let cell = DomTools.getCell(this, { row, rowIndex, column })
          let params = { row, rowIndex, column, columnIndex: visibleColumn.indexOf(column), cell }
          this.handleSelected(params, {})
        }
      }
      return this.$nextTick()
    },
    /**
     * 处理选中源
     */
    handleSelected (params, evnt) {
      let { mouseConfig = {}, editConfig, editStore, elemStore } = this
      let { actived, selected } = editStore
      let { row, column, cell } = params
      let selectMethod = () => {
        if ((mouseConfig.selected || mouseConfig.checked) && (selected.row !== row || selected.column !== column)) {
          if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
            if (this.keyboardConfig) {
              this.clearChecked(evnt)
              this.clearIndexChecked()
              this.clearHeaderChecked()
              this.clearSelected(evnt)
            }
            this.clearActived(evnt)
            selected.args = params
            selected.row = row
            selected.column = column
            if (mouseConfig.selected) {
              this.addColSdCls()
            }
            // 如果配置了批量选中功能，则为批量选中状态
            if (mouseConfig.checked) {
              let headerElem = elemStore['main-header-list']
              this.handleChecked([[cell]])
              if (headerElem) {
                this.handleHeaderChecked([[headerElem.querySelector(`.${column.id}`)]])
              }
              this.handleIndexChecked([[cell.parentNode.querySelector('.col--index')]])
            }
          }
        }
        return this.$nextTick()
      }
      return selectMethod()
    },
    /**
     * 清除所选中源状态
     */
    _clearSelected (evnt) {
      let { selected } = this.editStore
      selected.row = null
      selected.column = null
      this.reColTitleSdCls()
      this.reColSdCls()
      return this.$nextTick()
    },
    reColTitleSdCls () {
      let headerElem = this.elemStore['main-header-list']
      if (headerElem) {
        XEUtils.arrayEach(headerElem.querySelectorAll('.col--title-selected'), elem => DomTools.removeClass(elem, 'col--title-selected'))
      }
    },
    reColSdCls () {
      let bodyElem = this.elemStore['main-body-list']
      let cell = bodyElem.querySelector('.col--selected')
      if (cell) {
        DomTools.removeClass(cell, 'col--selected')
      }
    },
    addColSdCls () {
      let { selected } = this.editStore
      let { row, column } = selected
      if (row && column) {
        let cell = DomTools.getCell(this, { row, column })
        if (cell) {
          DomTools.addClass(cell, 'col--selected')
        }
      }
    }
  }
}
