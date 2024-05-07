import XEUtils from 'xe-utils'
import VXETable from '../../v-x-e-table'
import GlobalConfig from '../../v-x-e-table/src/conf'
import UtilTools, { isEnableConf } from '../../tools/utils'
import { getRowid } from '../../table/src/util'
import DomTools, { browse } from '../../tools/dom'
import { warnLog, errLog, getLog } from '../../tools/log'

function insertTreeRow (_vm, newRecords, isAppend) {
  const { tableFullTreeData, afterFullData, fullDataRowIdData, fullAllDataRowIdData, treeOpts } = _vm
  const { rowField, parentField, mapChildrenField } = treeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  const funcName = isAppend ? 'push' : 'unshift'
  newRecords.forEach(item => {
    const parentRowId = item[parentField]
    const rowid = getRowid(_vm, item)
    const matchObj = parentRowId ? XEUtils.findTree(tableFullTreeData, item => parentRowId === item[rowField], { children: mapChildrenField }) : null
    if (matchObj) {
      const { item: parentRow } = matchObj
      const parentRest = fullAllDataRowIdData[getRowid(_vm, parentRow)]
      const parentLevel = parentRest ? parentRest.level : 0
      let parentChilds = parentRow[childrenField]
      let mapChilds = parentRow[mapChildrenField]
      if (!XEUtils.isArray(parentChilds)) {
        parentChilds = parentRow[childrenField] = []
      }
      if (!XEUtils.isArray(mapChilds)) {
        mapChilds = parentRow[childrenField] = []
      }
      parentChilds[funcName](item)
      // 在开启懒加载的情况下，首次 insert row 会导致重复添加
      if (mapChilds !== parentChilds) {
        mapChilds[funcName](item)
      }
      const rest = { row: item, rowid, seq: -1, index: -1, _index: -1, $index: -1, items: parentChilds, parent: parentRow, level: parentLevel + 1 }
      fullDataRowIdData[rowid] = rest
      fullAllDataRowIdData[rowid] = rest
    } else {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (parentRowId) {
          warnLog('vxe.error.unableInsert')
        }
      }
      afterFullData[funcName](item)
      tableFullTreeData[funcName](item)
      const rest = { row: item, rowid, seq: -1, index: -1, _index: -1, $index: -1, items: tableFullTreeData, parent: null, level: 0 }
      fullDataRowIdData[rowid] = rest
      fullAllDataRowIdData[rowid] = rest
    }
  })
}

function handleInsertRowAt (_vm, records, row, isInsertNextRow) {
  const { tableFullTreeData, mergeList, afterFullData, editStore, tableFullData, treeConfig, fullDataRowIdData, fullAllDataRowIdData, treeOpts } = _vm
  const { transform, rowField, mapChildrenField } = treeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  if (!XEUtils.isArray(records)) {
    records = [records]
  }
  const newRecords = _vm.defineField(records.map(record => Object.assign(treeConfig && transform ? { [mapChildrenField]: [], [childrenField]: [] } : {}, record)))
  if (XEUtils.eqNull(row)) {
  // 如果为虚拟树
    if (treeConfig && transform) {
      insertTreeRow(_vm, newRecords, false)
    } else {
      afterFullData.unshift(...newRecords)
      tableFullData.unshift(...newRecords)
      // 刷新单元格合并
      mergeList.forEach(mergeItem => {
        const { row: mergeRowIndex } = mergeItem
        if (mergeRowIndex > 0) {
          mergeItem.row = mergeRowIndex + newRecords.length
        }
      })
    }
  } else {
    if (row === -1) {
      // 如果为虚拟树
      if (treeConfig && transform) {
        insertTreeRow(_vm, newRecords, true)
      } else {
        afterFullData.push(...newRecords)
        tableFullData.push(...newRecords)
        // 刷新单元格合并
        mergeList.forEach(mergeItem => {
          const { row: mergeRowIndex, rowspan: mergeRowspan } = mergeItem
          if (mergeRowIndex + mergeRowspan > afterFullData.length) {
            mergeItem.rowspan = mergeRowspan + newRecords.length
          }
        })
      }
    } else {
      // 如果为虚拟树
      if (treeConfig && transform) {
        const matchMapObj = XEUtils.findTree(tableFullTreeData, item => row[rowField] === item[rowField], { children: mapChildrenField })
        if (matchMapObj) {
          const { parent: parentRow } = matchMapObj
          const parentMapChilds = parentRow ? parentRow[mapChildrenField] : tableFullTreeData
          const parentRest = fullAllDataRowIdData[getRowid(_vm, parentRow)]
          const parentLevel = parentRest ? parentRest.level : 0
          newRecords.forEach((item, i) => {
            const rowid = getRowid(_vm, item)
            if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
              if (item[treeOpts.parentField]) {
                if (parentRow && item[treeOpts.parentField] !== parentRow[rowField]) {
                  errLog('vxe.error.errProp', [`${treeOpts.parentField}=${item[treeOpts.parentField]}`, `${treeOpts.parentField}=${parentRow[rowField]}`])
                }
              }
            }
            if (parentRow) {
              item[treeOpts.parentField] = parentRow[rowField]
            }
            let targetIndex = matchMapObj.index + i
            if (isInsertNextRow) {
              targetIndex = targetIndex + 1
            }
            parentMapChilds.splice(targetIndex, 0, item)
            const rest = { row: item, rowid, seq: -1, index: -1, _index: -1, $index: -1, items: parentMapChilds, parent: parentRow, level: parentLevel + 1 }
            fullDataRowIdData[rowid] = rest
            fullAllDataRowIdData[rowid] = rest
          })

          // 源
          if (parentRow) {
            const matchObj = XEUtils.findTree(tableFullTreeData, item => row[rowField] === item[rowField], { children: childrenField })
            if (matchObj) {
              const parentChilds = matchObj.items
              let targetIndex = matchObj.index
              if (isInsertNextRow) {
                targetIndex = targetIndex + 1
              }
              // 在开启懒加载的情况下，首次 insert row 会导致重复添加
              if (parentChilds !== parentMapChilds) {
                parentChilds.splice(targetIndex, 0, ...newRecords)
              }
            }
          }
        } else {
          if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
            warnLog('vxe.error.unableInsert')
          }
          insertTreeRow(_vm, newRecords, true)
        }
      } else {
        if (treeConfig) {
          throw new Error(getLog('vxe.error.noTree', ['insert']))
        }
        let afIndex = -1
        // 如果是可视索引
        if (XEUtils.isNumber(row)) {
          if (row < afterFullData.length) {
            afIndex = row
          }
        } else {
          afIndex = _vm.findRowIndexOf(afterFullData, row)
        }
        // 如果是插入指定行的下一行
        if (isInsertNextRow) {
          afIndex = Math.min(afterFullData.length, afIndex + 1)
        }
        if (afIndex === -1) {
          throw new Error(errLog('vxe.error.unableInsert'))
        }
        afterFullData.splice(afIndex, 0, ...newRecords)
        tableFullData.splice(_vm.findRowIndexOf(tableFullData, row), 0, ...newRecords)
        // 刷新单元格合并
        mergeList.forEach(mergeItem => {
          const { row: mergeRowIndex, rowspan: mergeRowspan } = mergeItem
          if (mergeRowIndex > afIndex) {
            mergeItem.row = mergeRowIndex + newRecords.length
          } else if (mergeRowIndex + mergeRowspan > afIndex) {
            mergeItem.rowspan = mergeRowspan + newRecords.length
          }
        })
      }
    }
  }
  const { insertList, insertMaps } = editStore
  newRecords.forEach(newRow => {
    const rowid = getRowid(_vm, newRow)
    insertMaps[rowid] = newRow
  })
  insertList.unshift(...newRecords)
  _vm.cacheRowMap()
  _vm.updateScrollYStatus()
  _vm.handleTableData(treeConfig && transform)
  if (!(treeConfig && transform)) {
    _vm.updateAfterDataIndex()
  }
  _vm.updateFooter()
  _vm.checkSelectionStatus()
  if (_vm.scrollYLoad) {
    _vm.updateScrollYSpace()
  }
  return _vm.$nextTick().then(() => {
    _vm.updateCellAreas()
    return _vm.recalculate()
  }).then(() => {
    return {
      row: newRecords.length ? newRecords[newRecords.length - 1] : null,
      rows: newRecords
    }
  })
}

export default {
  methods: {
    /**
     * 往表格中插入临时数据
     *
     * @param {*} records
     */
    _insert (records) {
      return handleInsertRowAt(this, records, null)
    },
    /**
     * 往表格指定行中插入临时数据
     * 如果 row 为空则从插入到顶部
     * 如果 row 为 -1 则从插入到底部
     * 如果 row 为有效行则插入到该行的位置
     * @param {Object/Array} records 新的数据
     * @param {Row} row 指定行
     * @returns
     */
    _insertAt (records, row) {
      return handleInsertRowAt(this, records, row)
    },
    _insertNextAt (records, row) {
      return handleInsertRowAt(this, records, row, true)
    },
    /**
     * 删除指定行数据
     * 如果传 row 则删除一行
     * 如果传 rows 则删除多行
     * 如果为空则删除所有
     */
    _remove (rows) {
      const { afterFullData, tableFullData, tableFullTreeData, treeConfig, mergeList, editStore, checkboxOpts, selectCheckboxMaps, isInsertByRow, treeOpts } = this
      const { transform, mapChildrenField } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      const { actived, removeList, insertList, insertMaps } = editStore
      const { checkField } = checkboxOpts
      let delList = []
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
      if (!checkField) {
        const selectRowMaps = { ...selectCheckboxMaps }
        rows.forEach((row) => {
          const rowid = getRowid(this, row)
          if (selectRowMaps[rowid]) {
            delete selectRowMaps[rowid]
          }
        })
        this.selectCheckboxMaps = selectRowMaps
      }
      // 从数据源中移除
      if (tableFullData === rows) {
        rows = delList = tableFullData.slice(0)
        this.tableFullData = []
        this.afterFullData = []
        this.clearMergeCells()
      } else {
        // 如果为虚拟树
        if (treeConfig && transform) {
          rows.forEach((row) => {
            const rowid = getRowid(this, row)
            const matchMapObj = XEUtils.findTree(tableFullTreeData, item => rowid === getRowid(this, item), { children: mapChildrenField })
            if (matchMapObj) {
              const rItems = matchMapObj.items.splice(matchMapObj.index, 1)
              delList.push(rItems[0])
            }
            const matchObj = XEUtils.findTree(tableFullTreeData, item => rowid === getRowid(this, item), { children: childrenField })
            if (matchObj) {
              matchObj.items.splice(matchObj.index, 1)
            }
            const afIndex = this.findRowIndexOf(afterFullData, row)
            if (afIndex > -1) {
              afterFullData.splice(afIndex, 1)
            }
          })
        } else {
          rows.forEach(row => {
            const tfIndex = this.findRowIndexOf(tableFullData, row)
            if (tfIndex > -1) {
              const rItems = tableFullData.splice(tfIndex, 1)
              delList.push(rItems[0])
            }
            const afIndex = this.findRowIndexOf(afterFullData, row)
            if (afIndex > -1) {
              // 刷新单元格合并
              mergeList.forEach(mergeItem => {
                const { row: mergeRowIndex, rowspan: mergeRowspan } = mergeItem
                if (mergeRowIndex > afIndex) {
                  mergeItem.row = mergeRowIndex - 1
                } else if (mergeRowIndex + mergeRowspan > afIndex) {
                  mergeItem.rowspan = mergeRowspan - 1
                }
              })
              afterFullData.splice(afIndex, 1)
            }
          })
        }
      }
      // 如果当前行被激活编辑，则清除激活状态
      if (actived.row && this.findRowIndexOf(rows, actived.row) > -1) {
        this.clearEdit()
      }
      // 从新增中移除已删除的数据
      rows.forEach(row => {
        const rowid = getRowid(this, row)
        const iIndex = this.findRowIndexOf(insertList, row)
        if (iIndex > -1) {
          insertList.splice(iIndex, 1)
        }
        delete insertMaps[rowid]
      })
      this.handleTableData(treeConfig && transform)
      if (!(treeConfig && transform)) {
        this.updateAfterDataIndex()
      }
      this.updateFooter()
      this.cacheRowMap()
      this.checkSelectionStatus()
      if (this.scrollYLoad) {
        this.updateScrollYSpace()
      }
      return this.$nextTick().then(() => {
        this.updateCellAreas()
        return this.recalculate()
      }).then(() => {
        return { row: delList.length ? delList[delList.length - 1] : null, rows: delList }
      })
    },
    /**
     * 删除复选框选中的数据
     */
    _removeCheckboxRow () {
      return this.remove(this.getCheckboxRecords()).then(params => {
        this.clearCheckboxRow()
        return params
      })
    },
    /**
     * 删除单选框选中的数据
     */
    _removeRadioRow () {
      const radioRecord = this.getRadioRecord()
      return this.remove(radioRecord || []).then(params => {
        this.clearRadioRow()
        return params
      })
    },
    /**
     * 删除当前行选中的数据
     */
    _removeCurrentRow () {
      const currentRecord = this.getCurrentRecord()
      return this.remove(currentRecord || []).then(params => {
        this.clearCurrentRow()
        return params
      })
    },
    /**
     * 获取表格数据集，包含新增、删除、修改
     */
    _getRecordset () {
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords(),
        pendingRecords: this.getPendingRecords()
      }
    },
    /**
     * 获取新增的临时数据
     */
    _getInsertRecords () {
      const { fullAllDataRowIdData } = this
      const insertList = this.editStore.insertList
      const insertRecords = []
      insertList.forEach(row => {
        const rowid = getRowid(this, row)
        if (fullAllDataRowIdData[rowid]) {
          insertRecords.push(row)
        }
      })
      return insertRecords
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
      const { keepSource, tableFullData, isUpdateByRow, treeConfig, treeOpts, editStore } = this
      if (keepSource) {
        const { actived } = editStore
        const { row, column } = actived
        if (row || column) {
          this._syncActivedCell()
        }
        if (treeConfig) {
          return XEUtils.filterTree(tableFullData, row => isUpdateByRow(row), treeOpts)
        }
        return tableFullData.filter(row => isUpdateByRow(row))
      }
      return []
    },
    /**
     * 处理激活编辑
     */
    handleActived (params, evnt) {
      const { editStore, editOpts, tableColumn, editConfig, mouseConfig } = this
      const { mode } = editOpts
      const { actived, focused } = editStore
      const { row, column } = params
      const { editRender } = column
      const cell = params.cell = (params.cell || this.getCell(row, column))
      const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
      if (cell && isEnableConf(editConfig) && isEnableConf(editRender)) {
        // 激活编辑
        if (!this.hasPendingByRow(row)) {
          if (actived.row !== row || (mode === 'cell' ? actived.column !== column : false)) {
            // 判断是否禁用编辑
            let type = 'edit-disabled'
            if (!beforeEditMethod || beforeEditMethod({ ...params, $table: this, $grid: this.$xegrid })) {
              if (mouseConfig) {
                this.clearSelected(evnt)
                this.clearCellAreas(evnt)
                this.clearCopyCellArea(evnt)
              }
              this.closeTooltip()
              if (actived.column) {
                this.clearEdit(evnt)
              }
              type = 'edit-activated'
              column.renderHeight = cell.offsetHeight
              actived.args = params
              actived.row = row
              actived.column = column
              if (mode === 'row') {
                tableColumn.forEach(column => this._getColumnModel(row, column))
              } else {
                this._getColumnModel(row, column)
              }
              const afterEditMethod = editOpts.afterEditMethod
              this.$nextTick(() => {
                this.handleFocus(params, evnt)
                if (afterEditMethod) {
                  afterEditMethod({ ...params, $table: this, $grid: this.$xegrid })
                }
              })
            }
            this.emitEvent(type, {
              row,
              rowIndex: this.getRowIndex(row),
              $rowIndex: this.getVMRowIndex(row),
              column,
              columnIndex: this.getColumnIndex(column),
              $columnIndex: this.getVMColumnIndex(column)
            }, evnt)

            // v4已废弃
            if (type === 'edit-activated') {
              this.emitEvent('edit-actived', {
                row,
                rowIndex: this.getRowIndex(row),
                $rowIndex: this.getVMRowIndex(row),
                column,
                columnIndex: this.getColumnIndex(column),
                $columnIndex: this.getVMColumnIndex(column)
              }, evnt)
            }
          } else {
            const { column: oldColumn } = actived
            if (mouseConfig) {
              this.clearSelected(evnt)
              this.clearCellAreas(evnt)
              this.clearCopyCellArea(evnt)
            }
            if (oldColumn !== column) {
              const { model: oldModel } = oldColumn
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
          focused.column = null
          focused.row = null
          this.focus()
        }
      }
      return this.$nextTick()
    },
    _getColumnModel (row, column) {
      const { model, editRender } = column
      if (editRender) {
        model.value = UtilTools.getCellValue(row, column)
        model.update = false
      }
    },
    _setColumnModel (row, column) {
      const { model, editRender } = column
      if (editRender && model.update) {
        UtilTools.setCellValue(row, column, model.value)
        model.update = false
        model.value = null
      }
    },
    _syncActivedCell () {
      const { tableColumn, editStore, editOpts } = this
      const { actived } = editStore
      const { row, column } = actived
      if (row || column) {
        if (editOpts.mode === 'row') {
          tableColumn.forEach(column => this._setColumnModel(row, column))
        } else {
          this._setColumnModel(row, column)
        }
      }
    },
    _clearActived (evnt) {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        warnLog('vxe.error.delFunc', ['clearActived', 'clearEdit'])
      }
      // 即将废弃
      return this.clearEdit(evnt)
    },
    /**
     * 清除激活的编辑
     */
    _clearEdit (evnt) {
      const { editStore } = this
      const { actived, focused } = editStore
      const { row, column } = actived
      if (row || column) {
        this._syncActivedCell()
        actived.args = null
        actived.row = null
        actived.column = null
        this.updateFooter()
        this.emitEvent('edit-closed', {
          row,
          rowIndex: this.getRowIndex(row),
          $rowIndex: this.getVMRowIndex(row),
          column,
          columnIndex: this.getColumnIndex(column),
          $columnIndex: this.getVMColumnIndex(column)
        }, evnt)
      }
      focused.row = null
      focused.column = null
      if (GlobalConfig.cellVaildMode === 'obsolete') {
        if (this.clearValidate) {
          return this.clearValidate()
        }
      }
      return this.$nextTick()
    },
    _getActiveRecord () {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        warnLog('vxe.error.delFunc', ['getActiveRecord', 'getEditRecord'])
      }
      // 即将废弃
      return this.getEditRecord()
    },
    _getEditRecord () {
      const { $el, editStore, afterFullData } = this
      const { actived } = editStore
      const { args, row } = actived
      if (args && this.findRowIndexOf(afterFullData, row) > -1 && $el.querySelectorAll('.vxe-body--column.col--active').length) {
        return Object.assign({}, args)
      }
      return null
    },
    _isActiveByRow (row) {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        warnLog('vxe.error.delFunc', ['isActiveByRow', 'isEditByRow'])
      }
      // 即将废弃
      return this.isEditByRow(row)
    },
    /**
     * 判断行是否为激活编辑状态
     * @param {Row} row 行对象
     */
    _isEditByRow (row) {
      return this.editStore.actived.row === row
    },
    /**
     * 处理聚焦
     */
    handleFocus (params) {
      const { row, column, cell } = params
      const { editRender } = column
      if (isEnableConf(editRender)) {
        const compRender = VXETable.renderer.get(editRender.name)
        let { autofocus, autoselect } = editRender
        let inputElem
        if (!autofocus && compRender) {
          autofocus = compRender.autofocus
        }
        if (!autoselect && compRender) {
          autoselect = compRender.autoselect
        }
        // 如果指定了聚焦 class
        if (XEUtils.isFunction(autofocus)) {
          inputElem = autofocus.call(this, params)
        } else if (autofocus) {
          inputElem = cell.querySelector(autofocus)
          if (inputElem) {
            inputElem.focus()
          }
        }
        if (inputElem) {
          if (autoselect) {
            inputElem.select()
          } else {
            // 保持一致行为，光标移到末端
            if (browse.msie) {
              const textRange = inputElem.createTextRange()
              textRange.collapse(false)
              textRange.select()
            }
          }
        } else {
          // 显示到可视区中
          this.scrollToRow(row, column)
        }
      }
    },
    _setActiveRow (row) {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        warnLog('vxe.error.delFunc', ['setActiveRow', 'setEditRow'])
      }
      // 即将废弃
      return this.setEditRow(row)
    },
    /**
     * 激活行编辑
     */
    _setEditRow (row, fieldOrColumn) {
      let column = XEUtils.find(this.visibleColumn, column => isEnableConf(column.editRender))
      if (fieldOrColumn) {
        column = XEUtils.isString(fieldOrColumn) ? this.getColumnByField(fieldOrColumn) : fieldOrColumn
      }
      return this.setEditCell(row, column)
    },
    _setActiveCell (row) {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        warnLog('vxe.error.delFunc', ['setActiveCell', 'setEditCell'])
      }
      // 即将废弃
      return this.setEditCell(row)
    },
    /**
     * 激活单元格编辑
     */
    _setEditCell (row, fieldOrColumn) {
      const { editConfig } = this
      const column = XEUtils.isString(fieldOrColumn) ? this.getColumnByField(fieldOrColumn) : fieldOrColumn
      if (row && column && isEnableConf(editConfig) && isEnableConf(column.editRender)) {
        return this.scrollToRow(row, true).then(() => {
          const cell = this.getCell(row, column)
          if (cell) {
            this.handleActived({ row, rowIndex: this.getRowIndex(row), column, columnIndex: this.getColumnIndex(column), cell, $table: this })
            this.lastCallTime = Date.now()
          }
        })
      }
      return this.$nextTick()
    },
    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    _setSelectCell (row, fieldOrColumn) {
      const { tableData, editOpts, visibleColumn } = this
      const column = XEUtils.isString(fieldOrColumn) ? this.getColumnByField(fieldOrColumn) : fieldOrColumn
      if (row && column && editOpts.trigger !== 'manual') {
        const rowIndex = this.findRowIndexOf(tableData, row)
        if (rowIndex > -1) {
          const cell = this.getCell(row, column)
          const params = { row, rowIndex, column, columnIndex: visibleColumn.indexOf(column), cell }
          this.handleSelected(params, {})
        }
      }
      return this.$nextTick()
    },
    /**
     * 处理选中源
     */
    handleSelected (params, evnt) {
      const { mouseConfig, mouseOpts, editOpts, editStore } = this
      const { actived, selected } = editStore
      const { row, column } = params
      const isMouseSelected = mouseConfig && mouseOpts.selected
      const selectMethod = () => {
        if (isMouseSelected && (selected.row !== row || selected.column !== column)) {
          if (actived.row !== row || (editOpts.mode === 'cell' ? actived.column !== column : false)) {
            this.clearEdit(evnt)
            this.clearSelected(evnt)
            this.clearCellAreas(evnt)
            this.clearCopyCellArea(evnt)
            selected.args = params
            selected.row = row
            selected.column = column
            if (isMouseSelected) {
              this.addColSdCls()
            }
            this.focus()
            if (evnt) {
              this.emitEvent('cell-selected', params, evnt)
            }
          }
        }
        return this.$nextTick()
      }
      return selectMethod()
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
     * 清除所选中源状态
     */
    _clearSelected () {
      const { selected } = this.editStore
      selected.row = null
      selected.column = null
      this.reColTitleSdCls()
      this.reColSdCls()
      return this.$nextTick()
    },
    reColTitleSdCls () {
      const headerElem = this.elemStore['main-header-list']
      if (headerElem) {
        XEUtils.arrayEach(headerElem.querySelectorAll('.col--title-selected'), elem => DomTools.removeClass(elem, 'col--title-selected'))
      }
    },
    reColSdCls () {
      const cell = this.$el.querySelector('.col--selected')
      if (cell) {
        DomTools.removeClass(cell, 'col--selected')
      }
    },
    addColSdCls () {
      const { selected } = this.editStore
      const { row, column } = selected
      this.reColSdCls()
      if (row && column) {
        const cell = this.getCell(row, column)
        if (cell) {
          DomTools.addClass(cell, 'col--selected')
        }
      }
    }
  }
}
