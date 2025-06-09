import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { isEnableConf } from '../../../ui/src/utils'
import { getCellValue, setCellValue, getRowid } from '../../src/util'
import { removeClass, addClass } from '../../../ui/src/dom'
import { warnLog, errLog } from '../../../ui/src/log'

import type { VxeTableConstructor, TableInternalData, VxeTableDefines, TableReactData, VxeTablePrivateMethods } from '../../../../types'

const { getConfig, renderer, getI18n } = VxeUI

const browseObj = XEUtils.browse()

function getEditColumnModel (row: any, column: VxeTableDefines.ColumnInfo) {
  const { model, editRender } = column
  if (editRender) {
    model.value = getCellValue(row, column)
    model.update = false
  }
}

function setEditColumnModel (row: any, column: VxeTableDefines.ColumnInfo) {
  const { model, editRender } = column
  if (editRender && model.update) {
    setCellValue(row, column, model.value)
    model.update = false
    model.value = null
  }
}

function removeCellSelectedClass ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const el = $xeTable.$refs.refElem as HTMLDivElement
  if (el) {
    const cell = el.querySelector('.col--selected')
    if (cell) {
      removeClass(cell, 'col--selected')
    }
  }
}

function syncActivedCell ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData

  const { editStore, tableColumn } = reactData
  const editOpts = $xeTable.computeEditOpts
  const { actived } = editStore
  const { row, column } = actived
  if (row || column) {
    if (editOpts.mode === 'row') {
      tableColumn.forEach((column) => setEditColumnModel(row, column))
    } else {
      setEditColumnModel(row, column)
    }
  }
}

function insertTreeRow ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, newRecords: any[], isAppend: boolean) {
  const internalData = $xeTable as unknown as TableInternalData

  const { tableFullTreeData, afterFullData, fullDataRowIdData, fullAllDataRowIdData } = internalData
  const treeOpts = $xeTable.computeTreeOpts
  const { rowField, parentField, mapChildrenField } = treeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  const funcName = isAppend ? 'push' : 'unshift'
  newRecords.forEach((item) => {
    const parentRowId = item[parentField]
    const rowid = getRowid($xeTable, item)
    const matchObj = parentRowId ? XEUtils.findTree(tableFullTreeData, (item) => parentRowId === item[rowField], { children: mapChildrenField }) : null
    if (matchObj) {
      const { item: parentRow } = matchObj
      const parentRest = fullAllDataRowIdData[getRowid($xeTable, parentRow)]
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
      mapChilds[funcName](item)
      const rest = { row: item, rowid, seq: -1, index: -1, _index: -1, $index: -1, treeIndex: -1, items: parentChilds, parent: parentRow, level: parentLevel + 1, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
      fullDataRowIdData[rowid] = rest
      fullAllDataRowIdData[rowid] = rest
    } else {
      if (parentRowId) {
        warnLog('vxe.error.unableInsert')
      }
      afterFullData[funcName](item)
      tableFullTreeData[funcName](item)
      const rest = { row: item, rowid, seq: -1, index: -1, _index: -1, $index: -1, treeIndex: -1, items: tableFullTreeData, parent: null, level: 0, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
      fullDataRowIdData[rowid] = rest
      fullAllDataRowIdData[rowid] = rest
    }
  })
}

function handleInsertRowAt ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, records: any[], targetRow: any, isInsertNextRow?: any) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const { tableFullTreeData, afterFullData, mergeBodyList, tableFullData, fullDataRowIdData, fullAllDataRowIdData, insertRowMaps } = internalData
  const treeOpts = $xeTable.computeTreeOpts
  const { transform, rowField, mapChildrenField } = treeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  if (!XEUtils.isArray(records)) {
    records = [records]
  }
  const newRecords: any[] = $xeTable.defineField(records.map(record => Object.assign(treeConfig && transform ? { [mapChildrenField]: [], [childrenField]: [] } : {}, record)))
  if (XEUtils.eqNull(targetRow)) {
  // 如果为虚拟树
    if (treeConfig && transform) {
      insertTreeRow($xeTable, newRecords, false)
    } else {
      newRecords.forEach(item => {
        const rowid = getRowid($xeTable, item)
        const rest = { row: item, rowid, seq: -1, index: -1, _index: -1, $index: -1, treeIndex: -1, items: afterFullData, parent: null, level: 0, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
        fullDataRowIdData[rowid] = rest
        fullAllDataRowIdData[rowid] = rest
        afterFullData.unshift(item)
        tableFullData.unshift(item)
      })
      // 刷新单元格合并
      mergeBodyList.forEach((mergeItem: any) => {
        const { row: mergeRowIndex } = mergeItem
        if (mergeRowIndex > 0) {
          mergeItem.row = mergeRowIndex + newRecords.length
        }
      })
    }
  } else {
    if (targetRow === -1) {
      // 如果为虚拟树
      if (treeConfig && transform) {
        insertTreeRow($xeTable, newRecords, true)
      } else {
        newRecords.forEach(item => {
          const rowid = getRowid($xeTable, item)
          const rest = { row: item, rowid, seq: -1, index: -1, _index: -1, $index: -1, treeIndex: -1, items: afterFullData, parent: null, level: 0, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
          fullDataRowIdData[rowid] = rest
          fullAllDataRowIdData[rowid] = rest
          afterFullData.push(item)
          tableFullData.push(item)
        })
        // 刷新单元格合并
        mergeBodyList.forEach((mergeItem: any) => {
          const { row: mergeRowIndex, rowspan: mergeRowspan } = mergeItem
          if (mergeRowIndex + mergeRowspan > afterFullData.length) {
            mergeItem.rowspan = mergeRowspan + newRecords.length
          }
        })
      }
    } else {
      // 如果为虚拟树
      if (treeConfig && transform) {
        const matchMapObj = XEUtils.findTree(tableFullTreeData, (item: any) => targetRow[rowField] === item[rowField], { children: mapChildrenField })
        if (matchMapObj) {
          const { parent: parentRow } = matchMapObj as any
          const parentMapChilds = parentRow ? parentRow[mapChildrenField] : tableFullTreeData
          const parentRest = fullAllDataRowIdData[getRowid($xeTable, parentRow)]
          const parentLevel = parentRest ? parentRest.level : 0
          newRecords.forEach((item: any, i: any) => {
            const rowid = getRowid($xeTable, item)
            if (item[treeOpts.parentField]) {
              if (parentRow && item[treeOpts.parentField] !== parentRow[rowField]) {
                errLog('vxe.error.errProp', [`${treeOpts.parentField}=${item[treeOpts.parentField]}`, `${treeOpts.parentField}=${parentRow[rowField]}`])
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
            const rest = { row: item, rowid, seq: -1, index: -1, _index: -1, $index: -1, treeIndex: -1, items: parentMapChilds, parent: parentRow, level: parentLevel + 1, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
            fullDataRowIdData[rowid] = rest
            fullAllDataRowIdData[rowid] = rest
          })

          // 源
          if (parentRow) {
            const matchObj = XEUtils.findTree(tableFullTreeData, (item: any) => targetRow[rowField] === item[rowField], { children: childrenField })
            if (matchObj) {
              const parentChilds = matchObj.items
              let targetIndex = matchObj.index
              if (isInsertNextRow) {
                targetIndex = targetIndex + 1
              }
              parentChilds.splice(targetIndex, 0, ...newRecords)
            }
          }
        } else {
          warnLog('vxe.error.unableInsert')
          insertTreeRow($xeTable, newRecords, true)
        }
      } else {
        if (treeConfig) {
          throw new Error(getI18n('vxe.error.noTree', ['insert']))
        }
        let afIndex = -1
        // 如果是可视索引
        if (XEUtils.isNumber(targetRow)) {
          if (targetRow < afterFullData.length) {
            afIndex = targetRow
          }
        } else {
          afIndex = $xeTable.findRowIndexOf(afterFullData, targetRow)
        }
        // 如果是插入指定行的下一行
        if (isInsertNextRow) {
          afIndex = Math.min(afterFullData.length, afIndex + 1)
        }
        if (afIndex === -1) {
          throw new Error(errLog('vxe.error.unableInsert'))
        }
        afterFullData.splice(afIndex, 0, ...newRecords)
        const tfIndex = $xeTable.findRowIndexOf(tableFullData, targetRow)
        if (tfIndex > -1) {
          tableFullData.splice(tfIndex + (isInsertNextRow ? 1 : 0), 0, ...newRecords)
        } else {
          tableFullData.push(...newRecords)
        }
        // 刷新单元格合并
        mergeBodyList.forEach((mergeItem: any) => {
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
  newRecords.forEach(newRow => {
    const rowid = getRowid($xeTable, newRow)
    insertRowMaps[rowid] = newRow
  })
  reactData.insertRowFlag++
  $xeTable.cacheRowMap(false)
  $xeTable.updateScrollYStatus()
  $xeTable.handleTableData(treeConfig && transform)
  if (!(treeConfig && transform)) {
    $xeTable.updateAfterDataIndex()
  }
  $xeTable.updateFooter()
  $xeTable.handleUpdateBodyMerge()
  $xeTable.checkSelectionStatus()
  if (reactData.scrollYLoad) {
    $xeTable.updateScrollYSpace()
  }
  return $xeTable.$nextTick().then(() => {
    $xeTable.updateCellAreas()
    return $xeTable.recalculate()
  }).then(() => {
    return {
      row: newRecords.length ? newRecords[newRecords.length - 1] : null,
      rows: newRecords
    }
  })
}

function handleInsertChildRowAt ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, records: any, parentRow: any, targetRow: any, isInsertNextRow?: boolean) {
  const props = $xeTable

  const { treeConfig } = props
  const treeOpts = $xeTable.computeTreeOpts
  const { transform, rowField, parentField } = treeOpts
  if (treeConfig && transform) {
    if (!XEUtils.isArray(records)) {
      records = [records]
    }
    return handleInsertRowAt($xeTable, records.map((item: any) => Object.assign({}, item, { [parentField]: parentRow[rowField] })), targetRow, isInsertNextRow)
  } else {
    errLog('vxe.error.errProp', ['tree-config.transform=false', 'tree-config.transform=true'])
  }
  return Promise.resolve({ row: null, rows: [] })
}

function handleClearEdit ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: Event | null, targetRow?: any) {
  const reactData = $xeTable as unknown as TableReactData

  const { editStore } = reactData
  const { actived, focused } = editStore
  const { row, column } = actived
  const validOpts = $xeTable.computeValidOpts
  if (row || column) {
    if (targetRow && getRowid($xeTable, targetRow) !== getRowid($xeTable, row)) {
      return $xeTable.$nextTick()
    }
    syncActivedCell($xeTable)
    actived.args = null
    actived.row = null
    actived.column = null
    $xeTable.updateFooter()
    $xeTable.dispatchEvent('edit-closed', {
      row,
      rowIndex: $xeTable.getRowIndex(row),
      $rowIndex: $xeTable.getVMRowIndex(row),
      column,
      columnIndex: $xeTable.getColumnIndex(column),
      $columnIndex: $xeTable.getVMColumnIndex(column)
    }, evnt || null)
  }
  focused.row = null
  focused.column = null
  if (validOpts.autoClear) {
    if (validOpts.msgMode !== 'full' || getConfig().cellVaildMode === 'obsolete') {
      if ($xeTable.clearValidate) {
        return $xeTable.clearValidate()
      }
    }
  }
  return $xeTable.$nextTick().then(() => $xeTable.updateCellAreas())
}

function handleEditActive ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, params: any, evnt: Event | null, isFocus: boolean, isPos: boolean) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const $xeGrid = $xeTable.$xeGrid

  const { editConfig, mouseConfig } = props
  const { editStore, tableColumn } = reactData
  const editOpts = $xeTable.computeEditOpts
  const { mode } = editOpts
  const { actived, focused } = editStore
  const { row, column } = params
  const { editRender } = column
  const cell = (params.cell || $xeTable.getCellElement(row, column))
  const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
  params.cell = cell
  if (cell && isEnableConf(editConfig) && isEnableConf(editRender)) {
    // 激活编辑
    if (!$xeTable.isPendingByRow(row) && !$xeTable.isAggregateRecord(row)) {
      if (actived.row !== row || (mode === 'cell' ? actived.column !== column : false)) {
        // 判断是否禁用编辑
        let type: 'edit-disabled' | 'edit-activated' = 'edit-disabled'
        if (!beforeEditMethod || beforeEditMethod({ ...params, $table: $xeTable, $grid: $xeGrid })) {
          if (mouseConfig) {
            $xeTable.clearSelected()
            if ($xeTable.clearCellAreas) {
              $xeTable.clearCellAreas()
              $xeTable.clearCopyCellArea()
            }
          }
          $xeTable.closeTooltip()
          if (actived.column) {
            handleClearEdit($xeTable, evnt)
          }
          type = 'edit-activated'
          column.renderHeight = cell.offsetHeight
          actived.args = params
          actived.row = row
          actived.column = column
          if (mode === 'row') {
            tableColumn.forEach((column: any) => getEditColumnModel(row, column))
          } else {
            getEditColumnModel(row, column)
          }
          const afterEditMethod = editOpts.afterEditMethod
          $xeTable.$nextTick(() => {
            if (isFocus) {
              $xeTable.handleFocus(params, evnt)
            }
            if (afterEditMethod) {
              afterEditMethod({ ...params, $table: $xeTable, $grid: $xeGrid })
            }
          })
        }
        $xeTable.dispatchEvent(type, {
          row,
          rowIndex: $xeTable.getRowIndex(row),
          $rowIndex: $xeTable.getVMRowIndex(row),
          column,
          columnIndex: $xeTable.getColumnIndex(column),
          $columnIndex: $xeTable.getVMColumnIndex(column)
        }, evnt)

        // v4已废弃
        if (type === 'edit-activated') {
          $xeTable.dispatchEvent('edit-actived', {
            row,
            rowIndex: $xeTable.getRowIndex(row),
            $rowIndex: $xeTable.getVMRowIndex(row),
            column,
            columnIndex: $xeTable.getColumnIndex(column),
            $columnIndex: $xeTable.getVMColumnIndex(column)
          }, evnt)
        }
      } else {
        const { column: oldColumn } = actived
        if (mouseConfig) {
          $xeTable.clearSelected()
          if ($xeTable.clearCellAreas) {
            $xeTable.clearCellAreas()
            $xeTable.clearCopyCellArea()
          }
        }
        if (oldColumn !== column) {
          const { model: oldModel } = oldColumn
          if (oldModel.update) {
            setCellValue(row, oldColumn, oldModel.value)
          }
          if ($xeTable.clearValidate) {
            $xeTable.clearValidate(row, column)
          }
        }
        column.renderHeight = cell.offsetHeight
        actived.args = params
        actived.column = column
        if (isPos) {
          setTimeout(() => {
            $xeTable.handleFocus(params, evnt)
          })
        }
      }
      focused.column = null
      focused.row = null
      $xeTable.focus()
    }
  }
  return $xeTable.$nextTick()
}

function handleEditCell ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, row: any, fieldOrColumn: string | VxeTableDefines.ColumnInfo, isPos: boolean) {
  const props = $xeTable
  const internalData = $xeTable as unknown as TableInternalData

  const { editConfig } = props
  const column = XEUtils.isString(fieldOrColumn) ? $xeTable.getColumnByField(fieldOrColumn) : fieldOrColumn
  if (row && column && isEnableConf(editConfig) && isEnableConf(column.editRender) && !$xeTable.isAggregateRecord(row)) {
    return Promise.resolve(isPos ? $xeTable.scrollToRow(row, column) : null).then(() => {
      const cell = $xeTable.getCellElement(row, column)
      if (cell) {
        handleEditActive($xeTable, {
          row,
          rowIndex: $xeTable.getRowIndex(row),
          column,
          columnIndex: $xeTable.getColumnIndex(column),
          cell,
          $table: $xeTable
        }, null, isPos, isPos)
        internalData._lastCallTime = Date.now()
      }
      return $xeTable.$nextTick()
    })
  }
  return $xeTable.$nextTick()
}

export default {
  methods: {
    /**
     * 往表格中插入临时数据
     *
     * @param {*} records
     */
    _insert (records: any) {
      return handleInsertRowAt(this, records, null)
    },
    /**
     * 往表格指定行中插入临时数据
     * 如果 row 为空则从插入到顶部
     * 如果 row 为 -1 则从插入到底部
     * 如果 row 为有效行则插入到该行的位置
     * @param {Object/Array} records 新的数据
     * @param {Row} targetRow 指定行
     * @returns
     */
    _insertAt (records: any, targetRow: any) {
      return handleInsertRowAt(this, records, targetRow)
    },
    _insertNextAt (records: any, targetRow: any) {
      return handleInsertRowAt(this, records, targetRow, true)
    },
    _insertChild (records: any, parentRow: any) {
      return handleInsertChildRowAt(this, records, parentRow, null)
    },
    _insertChildAt (records: any, parentRow: any, targetRow: any) {
      return handleInsertChildRowAt(this, records, parentRow, targetRow)
    },
    _insertChildNextAt (records: any, parentRow: any, targetRow: any) {
      return handleInsertChildRowAt(this, records, parentRow, targetRow, true)
    },
    /**
     * 删除指定行数据
     * 如果传 row 则删除一行
     * 如果传 rows 则删除多行
     * 如果为空则删除所有
     */
    _remove (rows: any[]) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { treeConfig } = props
      const { editStore } = reactData
      const { tableFullTreeData, selectCheckboxMaps, afterFullData, mergeBodyList, tableFullData, pendingRowMaps, insertRowMaps, removeRowMaps } = internalData
      const checkboxOpts = $xeTable.computeCheckboxOpts
      const treeOpts = $xeTable.computeTreeOpts
      const { transform, mapChildrenField } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      const { actived } = editStore
      const { checkField } = checkboxOpts
      let delList: any[] = []
      if (!rows) {
        rows = tableFullData
      } else if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      // 如果是新增，则保存记录
      rows.forEach(row => {
        if (!$xeTable.isInsertByRow(row)) {
          const rowid = getRowid($xeTable, row)
          removeRowMaps[rowid] = row
        }
      })
      // 如果绑定了多选属性，则更新状态
      if (!checkField) {
        rows.forEach((row) => {
          const rowid = getRowid(this, row)
          if (selectCheckboxMaps[rowid]) {
            delete selectCheckboxMaps[rowid]
          }
        })
        reactData.updateCheckboxFlag++
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
          rows.forEach((row: any) => {
            const tfIndex = this.findRowIndexOf(tableFullData, row)
            if (tfIndex > -1) {
              const rItems = tableFullData.splice(tfIndex, 1)
              delList.push(rItems[0])
            }
            const afIndex = this.findRowIndexOf(afterFullData, row)
            if (afIndex > -1) {
              // 刷新单元格合并
              mergeBodyList.forEach((mergeItem: any) => {
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
      if (actived.row && $xeTable.findRowIndexOf(rows, actived.row) > -1) {
        $xeTable.clearEdit()
      }
      // 从新增中移除已删除的数据
      rows.forEach((row: any) => {
        const rowid = getRowid($xeTable, row)
        if (insertRowMaps[rowid]) {
          delete insertRowMaps[rowid]
        }
        if (pendingRowMaps[rowid]) {
          delete pendingRowMaps[rowid]
        }
      })
      reactData.removeRowFlag++
      reactData.insertRowFlag++
      reactData.pendingRowFlag++
      $xeTable.cacheRowMap(false)
      $xeTable.handleTableData(treeConfig && transform)
      $xeTable.updateFooter()
      $xeTable.handleUpdateBodyMerge()
      if (!(treeConfig && transform)) {
        $xeTable.updateAfterDataIndex()
      }
      $xeTable.checkSelectionStatus()
      if (reactData.scrollYLoad) {
        $xeTable.updateScrollYSpace()
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
      return this.remove(this.getCheckboxRecords()).then((params: any) => {
        this.clearCheckboxRow()
        return params
      })
    },
    /**
     * 删除单选框选中的数据
     */
    _removeRadioRow () {
      const radioRecord = this.getRadioRecord()
      return this.remove(radioRecord || []).then((params: any) => {
        this.clearRadioRow()
        return params
      })
    },
    /**
     * 删除当前行选中的数据
     */
    _removeCurrentRow () {
      const currentRecord = this.getCurrentRecord()
      return this.remove(currentRecord || []).then((params: any) => {
        this.clearCurrentRow()
        return params
      })
    },
    /**
     * 获取表格数据集，包含新增、删除、修改
     */
    _getRecordset () {
      const removeRecords = this.getRemoveRecords()
      const pendingRecords = this.getPendingRecords()
      const delRecords = removeRecords.concat(pendingRecords)
      // 如果已经被删除，则无需放到更新数组
      const updateRecords = this.getUpdateRecords().filter((row: any) => {
        return !delRecords.some((item: any) => this.eqRow(item, row))
      })
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords,
        updateRecords,
        pendingRecords
      }
    },
    /**
     * 获取新增的临时数据
     */
    _getInsertRecords () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const internalData = $xeTable as unknown as TableInternalData

      const { fullAllDataRowIdData, insertRowMaps } = internalData
      const insertRecords: any[] = []
      XEUtils.each(insertRowMaps, (row, rowid) => {
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
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const internalData = $xeTable as unknown as TableInternalData

      const { removeRowMaps } = internalData
      const removeRecords: any[] = []
      XEUtils.each(removeRowMaps, (row) => {
        removeRecords.push(row)
      })
      return removeRecords
    },
    /**
     * 获取更新数据
     * 只精准匹配 row 的更改
     * 如果是树表格，子节点更改状态不会影响父节点的更新状态
     */
    _getUpdateRecords () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable
      const internalData = $xeTable as unknown as TableInternalData

      const { keepSource, treeConfig } = props
      const { tableFullData } = internalData
      const treeOpts = $xeTable.computeTreeOpts
      if (keepSource) {
        syncActivedCell($xeTable)
        if (treeConfig) {
          return XEUtils.filterTree(tableFullData, row => $xeTable.isUpdateByRow(row), treeOpts)
        }
        return tableFullData.filter((row) => $xeTable.isUpdateByRow(row))
      }
      return []
    },
    /**
     * 处理激活编辑
     */
    handleEdit (params: any, evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      return handleEditActive($xeTable, params, evnt, true, true)
    },
    /**
     * @deprecated
     */
    handleActived (params: any, evnt: any) {
      return this.handleEdit(params, evnt)
    },
    _getColumnModel (row: any, column: VxeTableDefines.ColumnInfo) {
      getEditColumnModel(row, column)
    },
    _setColumnModel (row: any, column: VxeTableDefines.ColumnInfo) {
      setEditColumnModel(row, column)
    },
    _syncActivedCell () {
      const $xeTable = this

      syncActivedCell($xeTable)
    },
    _clearActived (row: any) {
      warnLog('vxe.error.delFunc', ['clearActived', 'clearEdit'])
      // 即将废弃
      return this.clearEdit(row)
    },
    /**
     * 清除激活的编辑
     */
    _clearEdit (row: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      return handleClearEdit($xeTable, null, row)
    },
    /**
     * 取消编辑
     */
    handleClearEdit (evnt: Event | null, targetRow?: any) {
      const $xeTable = this

      return handleClearEdit($xeTable, evnt, targetRow)
    },
    _getActiveRecord () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      warnLog('vxe.error.delFunc', ['getActiveRecord', 'getEditRecord'])
      // 即将废弃
      return $xeTable.getEditRecord()
    },
    _getEditRecord () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { editStore } = reactData
      const { afterFullData } = internalData
      const el = $xeTable.$refs.refElem as HTMLDivElement
      const { args, row } = editStore.actived
      if (args && $xeTable.findRowIndexOf(afterFullData, row) > -1 && el.querySelectorAll('.vxe-body--column.col--active').length) {
        return Object.assign({}, args)
      }
      return null
    },
    _isActiveByRow (row: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      warnLog('vxe.error.delFunc', ['isActiveByRow', 'isEditByRow'])
      // 即将废弃
      return $xeTable.isEditByRow(row)
    },
    /**
     * 判断行是否为激活编辑状态
     * @param {Row} row 行对象
     */
    _isEditByRow (row: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { editStore } = reactData
      return editStore.actived.row === row
    },
    /**
     * 处理聚焦
     */
    handleFocus (params: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      const { row, column, cell } = params
      const { editRender } = column
      const editOpts = $xeTable.computeEditOpts
      if (isEnableConf(editRender)) {
        const compRender = renderer.get(editRender.name)
        let autoFocus = editRender.autofocus || editRender.autoFocus
        let autoSelect = editRender.autoSelect || editRender.autoselect
        let inputElem
        // 是否启用聚焦
        if (editOpts.autoFocus) {
          if (!autoFocus && compRender) {
            autoFocus = compRender.tableAutoFocus || compRender.tableAutofocus || (compRender as any).autoFocus || compRender.autofocus
          }
          if (!autoSelect && compRender) {
            autoSelect = compRender.tableAutoSelect || (compRender as any).autoSelect || compRender.autoselect
          }
          // 如果指定了聚焦 class
          if (XEUtils.isFunction(autoFocus)) {
            inputElem = autoFocus.call($xeTable, params)
          } else if (autoFocus) {
            if (autoFocus === true) {
              // 自动匹配模式，会自动匹配第一个可输入元素
              inputElem = cell.querySelector('input,textarea')
            } else {
              inputElem = cell.querySelector(autoFocus)
            }
            if (inputElem) {
              inputElem.focus()
            }
          }
        }
        if (inputElem) {
          if (autoSelect) {
            inputElem.select()
          } else {
            // 保持一致行为，光标移到末端
            if (browseObj.msie) {
              const textRange = inputElem.createTextRange()
              textRange.collapse(false)
              textRange.select()
            }
          }
        } else {
          // 是否自动定位
          if (editOpts.autoPos) {
            if (!column.fixed) {
              // 显示到可视区中
              $xeTable.scrollToRow(row, column)
            }
          }
        }
      }
    },
    _setActiveRow (row: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      warnLog('vxe.error.delFunc', ['setActiveRow', 'setEditRow'])
      // 即将废弃
      return $xeTable.setEditRow(row)
    },
    /**
     * 激活行编辑
     */
    _setEditRow (row: any, fieldOrColumn: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      let column = XEUtils.find(this.visibleColumn, column => isEnableConf(column.editRender))
      let isPos = false
      if (fieldOrColumn) {
        isPos = true
        if (fieldOrColumn !== true) {
          column = XEUtils.isString(fieldOrColumn) ? $xeTable.getColumnByField(fieldOrColumn) : fieldOrColumn
        }
      }
      return handleEditCell($xeTable, row, column, isPos)
    },
    _setActiveCell (row: any, fieldOrColumn: any) {
      warnLog('vxe.error.delFunc', ['setActiveCell', 'setEditCell'])
      // 即将废弃
      return this.setEditCell(row, fieldOrColumn)
    },
    /**
     * 激活单元格编辑
     */
    _setEditCell (row: any, fieldOrColumn: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      return handleEditCell($xeTable, row, fieldOrColumn, true)
    },
    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    _setSelectCell (row: any, fieldOrColumn: string | VxeTableDefines.ColumnInfo) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { tableData } = reactData
      const editOpts = $xeTable.computeEditOpts
      const column = XEUtils.isString(fieldOrColumn) ? $xeTable.getColumnByField(fieldOrColumn) : fieldOrColumn
      if (row && column && editOpts.trigger !== 'manual') {
        const rowIndex = $xeTable.findRowIndexOf(tableData, row)
        if (rowIndex > -1) {
          const cell = $xeTable.getCellElement(row, column)
          const params = {
            row,
            rowIndex,
            column,
            columnIndex: $xeTable.getColumnIndex(column),
            cell
          }
          $xeTable.handleSelected(params, {})
        }
      }
      return $xeTable.$nextTick()
    },
    /**
     * 处理选中源
     */
    handleSelected (params: any, evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable
      const reactData = $xeTable as unknown as TableReactData

      const { mouseConfig } = props
      const { editStore } = reactData
      const mouseOpts = $xeTable.computeMouseOpts
      const editOpts = $xeTable.computeEditOpts
      const { actived, selected } = editStore
      const { row, column } = params
      const isMouseSelected = mouseConfig && mouseOpts.selected
      const selectMethod = () => {
        if (isMouseSelected && (selected.row !== row || selected.column !== column)) {
          if (actived.row !== row || (editOpts.mode === 'cell' ? actived.column !== column : false)) {
            handleClearEdit($xeTable, evnt)
            $xeTable.clearSelected()
            if ($xeTable.clearCellAreas) {
              $xeTable.clearCellAreas()
              $xeTable.clearCopyCellArea()
            }
            selected.args = params
            selected.row = row
            selected.column = column
            if (isMouseSelected) {
              this.addCellSelectedClass()
            }
            $xeTable.focus()
            if (evnt) {
              $xeTable.dispatchEvent('cell-selected', params, evnt)
            }
          }
        }
        return $xeTable.$nextTick()
      }
      return selectMethod()
    },
    /**
     * 获取选中的单元格
     */
    _getSelectedCell () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { editStore } = reactData
      const { args, column } = editStore.selected
      if (args && column) {
        return Object.assign({}, args)
      }
      return null
    },
    /**
     * 清除所选中源状态
     */
    _clearSelected () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { editStore } = reactData
      const { selected } = editStore
      selected.row = null
      selected.column = null
      removeCellSelectedClass($xeTable)
      return $xeTable.$nextTick()
    },
    reColTitleSdCls () {
      const headerElem = this.elemStore['main-header-list']
      if (headerElem) {
        XEUtils.arrayEach(headerElem.querySelectorAll('.col--title-selected'), elem => removeClass(elem, 'col--title-selected'))
      }
    },
    addCellSelectedClass () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { editStore } = reactData
      const { selected } = editStore
      const { row, column } = selected
      removeCellSelectedClass($xeTable)
      if (row && column) {
        const cell = $xeTable.getCellElement(row, column)
        if (cell) {
          addClass(cell, 'col--selected')
        }
      }
    }
  } as any
} as any
