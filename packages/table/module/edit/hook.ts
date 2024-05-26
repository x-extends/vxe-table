import { reactive, nextTick } from 'vue'
import XEUtils from 'xe-utils'
import { getConfig, renderer, hooks, log, getI18n } from '@vxe-ui/core'
import { isEnableConf } from '../../../ui/src/utils'
import { getCellValue, setCellValue, getRowid } from '../../src/util'
import { browse, removeClass, addClass } from '../../../ui/src/dom'

import type { TableEditMethods, TableEditPrivateMethods } from '../../../../types'

const tableEditMethodKeys: (keyof TableEditMethods)[] = ['insert', 'insertAt', 'insertNextAt', 'remove', 'removeCheckboxRow', 'removeRadioRow', 'removeCurrentRow', 'getRecordset', 'getInsertRecords', 'getRemoveRecords', 'getUpdateRecords', 'getEditRecord', 'getActiveRecord', 'getSelectedCell', 'clearEdit', 'clearActived', 'clearSelected', 'isEditByRow', 'isActiveByRow', 'setEditRow', 'setActiveRow', 'setEditCell', 'setActiveCell', 'setSelectCell']

hooks.add('tableEditModule', {
  setupTable ($xeTable) {
    const { props, reactData, internalData } = $xeTable
    const { refElem } = $xeTable.getRefMaps()
    const { computeMouseOpts, computeEditOpts, computeCheckboxOpts, computeTreeOpts } = $xeTable.getComputeMaps()

    let editMethods = {} as TableEditMethods
    let editPrivateMethods = {} as TableEditPrivateMethods

    const getEditColumnModel = (row: any, column: any) => {
      const { model, editRender } = column
      if (editRender) {
        model.value = getCellValue(row, column)
        model.update = false
      }
    }

    const setEditColumnModel = (row: any, column: any) => {
      const { model, editRender } = column
      if (editRender && model.update) {
        setCellValue(row, column, model.value)
        model.update = false
        model.value = null
      }
    }

    const removeCellSelectedClass = () => {
      const el = refElem.value
      if (el) {
        const cell = el.querySelector('.col--selected')
        if (cell) {
          removeClass(cell, 'col--selected')
        }
      }
    }

    function syncActivedCell () {
      const { editStore, tableColumn } = reactData
      const editOpts = computeEditOpts.value
      const { actived } = editStore
      const { row, column } = actived
      if (row || column) {
        if (editOpts.mode === 'row') {
          tableColumn.forEach((column: any) => setEditColumnModel(row, column))
        } else {
          setEditColumnModel(row, column)
        }
      }
    }

    function insertTreeRow (newRecords: any[], isAppend: boolean) {
      const { tableFullTreeData, afterFullData, fullDataRowIdData, fullAllDataRowIdData } = internalData
      const treeOpts = computeTreeOpts.value
      const { rowField, parentField, mapChildrenField } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      const funcName = isAppend ? 'push' : 'unshift'
      newRecords.forEach(item => {
        const parentRowId = item[parentField]
        const rowid = getRowid($xeTable, item)
        const matchObj = parentRowId ? XEUtils.findTree(tableFullTreeData, item => parentRowId === item[rowField], { children: mapChildrenField }) : null
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
          const rest = { row: item, rowid, seq: -1, index: -1, _index: -1, $index: -1, items: parentChilds, parent: parentRow, level: parentLevel + 1 }
          fullDataRowIdData[rowid] = rest
          fullAllDataRowIdData[rowid] = rest
        } else {
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            if (parentRowId) {
              log.warn('vxe.error.unableInsert')
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

    const handleInsertRowAt = (records: any, row: any, isInsertNextRow?: boolean) => {
      const { treeConfig } = props
      const { mergeList, editStore } = reactData
      const { tableFullTreeData, afterFullData, tableFullData, fullDataRowIdData, fullAllDataRowIdData } = internalData
      const treeOpts = computeTreeOpts.value
      const { transform, rowField, mapChildrenField } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      if (!XEUtils.isArray(records)) {
        records = [records]
      }
      const newRecords: any[] = reactive($xeTable.defineField(records.map((record: any) => Object.assign(treeConfig && transform ? { [mapChildrenField]: [], [childrenField]: [] } : {}, record))))
      if (XEUtils.eqNull(row)) {
        // 如果为虚拟树
        if (treeConfig && transform) {
          insertTreeRow(newRecords, false)
        } else {
          afterFullData.unshift(...newRecords)
          tableFullData.unshift(...newRecords)
          // 刷新单元格合并
          mergeList.forEach((mergeItem: any) => {
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
            insertTreeRow(newRecords, true)
          } else {
            afterFullData.push(...newRecords)
            tableFullData.push(...newRecords)
            // 刷新单元格合并
            mergeList.forEach((mergeItem: any) => {
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
              const parentRest = fullAllDataRowIdData[getRowid($xeTable, parentRow)]
              const parentLevel = parentRest ? parentRest.level : 0
              newRecords.forEach((item, i) => {
                const rowid = getRowid($xeTable, item)
                if (process.env.VUE_APP_VXE_ENV === 'development') {
                  if (item[treeOpts.parentField]) {
                    if (parentRow && item[treeOpts.parentField] !== parentRow[rowField]) {
                      log.err('vxe.error.errProp', [`${treeOpts.parentField}=${item[treeOpts.parentField]}`, `${treeOpts.parentField}=${parentRow[rowField]}`])
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
                  parentChilds.splice(targetIndex, 0, ...newRecords)
                }
              }
            } else {
              if (process.env.VUE_APP_VXE_ENV === 'development') {
                log.warn('vxe.error.unableInsert')
              }
              insertTreeRow(newRecords, true)
            }
          } else {
            if (treeConfig) {
              throw new Error(getI18n('vxe.error.noTree', ['insert']))
            }
            let afIndex = -1
            // 如果是可视索引
            if (XEUtils.isNumber(row)) {
              if (row < afterFullData.length) {
                afIndex = row
              }
            } else {
              afIndex = $xeTable.findRowIndexOf(afterFullData, row)
            }
            // 如果是插入指定行的下一行
            if (isInsertNextRow) {
              afIndex = Math.min(afterFullData.length, afIndex + 1)
            }
            if (afIndex === -1) {
              throw new Error(log.err('vxe.error.unableInsert'))
            }
            afterFullData.splice(afIndex, 0, ...newRecords)
            tableFullData.splice($xeTable.findRowIndexOf(tableFullData, row), 0, ...newRecords)
            // 刷新单元格合并
            mergeList.forEach((mergeItem: any) => {
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
      const { insertMaps } = editStore
      newRecords.forEach(newRow => {
        const rowid = getRowid($xeTable, newRow)
        insertMaps[rowid] = newRow
      })
      $xeTable.cacheRowMap()
      $xeTable.updateScrollYStatus()
      $xeTable.handleTableData(treeConfig && transform)
      if (!(treeConfig && transform)) {
        $xeTable.updateAfterDataIndex()
      }
      $xeTable.updateFooter()
      $xeTable.checkSelectionStatus()
      if (reactData.scrollYLoad) {
        $xeTable.updateScrollYSpace()
      }
      return nextTick().then(() => {
        $xeTable.updateCellAreas()
        return $xeTable.recalculate()
      }).then(() => {
        return {
          row: newRecords.length ? newRecords[newRecords.length - 1] : null,
          rows: newRecords
        }
      })
    }

    editMethods = {
      /**
       * 往表格中插入临时数据
       *
       * @param {*} records
       */
      insert (records: any) {
        return handleInsertRowAt(records, null)
      },
      /**
       * 往表格指定行中插入临时数据
       * 如果 row 为空则从插入到顶部，如果为树结构，则插入到目标节点顶部
       * 如果 row 为 -1 则从插入到底部，如果为树结构，则插入到目标节点底部
       * 如果 row 为有效行则插入到该行的位置，如果为树结构，则有插入到效的目标节点该行的位置
       * @param {Object/Array} records 新的数据
       * @param {Row} row 指定行
       */
      insertAt (records: any, row: any) {
        return handleInsertRowAt(records, row)
      },
      insertNextAt (records: any, row: any) {
        return handleInsertRowAt(records, row, true)
      },
      /**
       * 删除指定行数据
       * 如果传 row 则删除一行
       * 如果传 rows 则删除多行
       * 如果为空则删除所有
       */
      remove (rows: any) {
        const { treeConfig } = props
        const { mergeList, editStore, selectCheckboxMaps } = reactData
        const { tableFullTreeData, afterFullData, tableFullData } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const treeOpts = computeTreeOpts.value
        const { transform, mapChildrenField } = treeOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        const { actived, removeMaps, insertMaps } = editStore
        const { checkField } = checkboxOpts
        let delList: any[] = []
        if (!rows) {
          rows = tableFullData
        } else if (!XEUtils.isArray(rows)) {
          rows = [rows]
        }
        // 如果是新增，则保存记录
        rows.forEach((row: any) => {
          if (!$xeTable.isInsertByRow(row)) {
            const rowid = getRowid($xeTable, row)
            removeMaps[rowid] = row
          }
        })
        // 如果绑定了多选属性，则更新状态
        if (!checkField) {
          const selectRowMaps = { ...selectCheckboxMaps }
          rows.forEach((row: any) => {
            const rowid = getRowid($xeTable, row)
            if (selectRowMaps[rowid]) {
              delete selectRowMaps[rowid]
            }
          })
          reactData.selectCheckboxMaps = selectRowMaps
        }
        // 从数据源中移除
        if (tableFullData === rows) {
          rows = delList = tableFullData.slice(0)
          internalData.tableFullData = []
          internalData.afterFullData = []
          $xeTable.clearMergeCells()
        } else {
          // 如果为虚拟树
          if (treeConfig && transform) {
            rows.forEach((row: any) => {
              const rowid = getRowid($xeTable, row)
              const matchMapObj = XEUtils.findTree(tableFullTreeData, item => rowid === getRowid($xeTable, item), { children: mapChildrenField })
              if (matchMapObj) {
                const rItems = matchMapObj.items.splice(matchMapObj.index, 1)
                delList.push(rItems[0])
              }
              const matchObj = XEUtils.findTree(tableFullTreeData, item => rowid === getRowid($xeTable, item), { children: childrenField })
              if (matchObj) {
                matchObj.items.splice(matchObj.index, 1)
              }
              const afIndex = $xeTable.findRowIndexOf(afterFullData, row)
              if (afIndex > -1) {
                afterFullData.splice(afIndex, 1)
              }
            })
          } else {
            rows.forEach((row: any) => {
              const tfIndex = $xeTable.findRowIndexOf(tableFullData, row)
              if (tfIndex > -1) {
                const rItems = tableFullData.splice(tfIndex, 1)
                delList.push(rItems[0])
              }
              const afIndex = $xeTable.findRowIndexOf(afterFullData, row)
              if (afIndex > -1) {
                // 刷新单元格合并
                mergeList.forEach((mergeItem: any) => {
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
          editMethods.clearEdit()
        }
        // 从新增中移除已删除的数据
        rows.forEach((row: any) => {
          const rowid = getRowid($xeTable, row)
          if (insertMaps[rowid]) {
            delete insertMaps[rowid]
          }
        })
        $xeTable.updateFooter()
        $xeTable.cacheRowMap()
        $xeTable.handleTableData(treeConfig && transform)
        if (!(treeConfig && transform)) {
          $xeTable.updateAfterDataIndex()
        }
        $xeTable.checkSelectionStatus()
        if (reactData.scrollYLoad) {
          $xeTable.updateScrollYSpace()
        }
        return nextTick().then(() => {
          $xeTable.updateCellAreas()
          return $xeTable.recalculate()
        }).then(() => {
          return { row: delList.length ? delList[delList.length - 1] : null, rows: delList }
        })
      },
      /**
       * 删除复选框选中的数据
       */
      removeCheckboxRow () {
        return editMethods.remove($xeTable.getCheckboxRecords()).then((params: any) => {
          $xeTable.clearCheckboxRow()
          return params
        })
      },
      /**
       * 删除单选框选中的数据
       */
      removeRadioRow () {
        const radioRecord = $xeTable.getRadioRecord()
        return editMethods.remove(radioRecord || []).then((params: any) => {
          $xeTable.clearRadioRow()
          return params
        })
      },
      /**
       * 删除当前行选中的数据
       */
      removeCurrentRow () {
        const currentRecord = $xeTable.getCurrentRecord()
        return editMethods.remove(currentRecord || []).then((params: any) => {
          $xeTable.clearCurrentRow()
          return params
        })
      },
      /**
       * 获取表格数据集，包含新增、删除、修改、标记
       */
      getRecordset () {
        return {
          insertRecords: editMethods.getInsertRecords(),
          removeRecords: editMethods.getRemoveRecords(),
          updateRecords: editMethods.getUpdateRecords(),
          pendingRecords: $xeTable.getPendingRecords()
        }
      },
      /**
       * 获取新增的临时数据
       */
      getInsertRecords () {
        const { editStore } = reactData
        const { fullAllDataRowIdData } = internalData
        const { insertMaps } = editStore
        const insertRecords: any[] = []
        XEUtils.each(insertMaps, (row, rowid) => {
          if (fullAllDataRowIdData[rowid]) {
            insertRecords.push(row)
          }
        })
        return insertRecords
      },
      /**
       * 获取已删除的数据
       */
      getRemoveRecords () {
        const { editStore } = reactData
        const { removeMaps } = editStore
        const removeRecords: any[] = []
        XEUtils.each(removeMaps, (row) => {
          removeRecords.push(row)
        })
        return removeRecords
      },
      /**
       * 获取更新数据
       * 只精准匹配 row 的更改
       * 如果是树表格，子节点更改状态不会影响父节点的更新状态
       */
      getUpdateRecords () {
        const { keepSource, treeConfig } = props
        const { tableFullData } = internalData
        const treeOpts = computeTreeOpts.value
        if (keepSource) {
          syncActivedCell()
          if (treeConfig) {
            return XEUtils.filterTree(tableFullData, row => $xeTable.isUpdateByRow(row), treeOpts)
          }
          return tableFullData.filter((row: any) => $xeTable.isUpdateByRow(row))
        }
        return []
      },
      getActiveRecord () {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          log.warn('vxe.error.delFunc', ['getActiveRecord', 'getEditRecord'])
        }
        return this.getEditRecord()
      },
      getEditRecord () {
        const { editStore } = reactData
        const { afterFullData } = internalData
        const el = refElem.value
        const { args, row } = editStore.actived
        if (args && $xeTable.findRowIndexOf(afterFullData, row) > -1 && el.querySelectorAll('.vxe-body--column.col--active').length) {
          return Object.assign({}, args)
        }
        return null
      },
      /**
       * 获取选中的单元格
       */
      getSelectedCell () {
        const { editStore } = reactData
        const { args, column } = editStore.selected
        if (args && column) {
          return Object.assign({}, args)
        }
        return null
      },
      clearActived (evnt) {
        // 即将废弃
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          log.warn('vxe.error.delFunc', ['clearActived', 'clearEdit'])
        }
        return this.clearEdit(evnt)
      },
      /**
       * 清除激活的编辑
       */
      clearEdit (evnt) {
        const { editStore } = reactData
        const { actived, focused } = editStore
        const { row, column } = actived
        if (row || column) {
          syncActivedCell()
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
        if (getConfig().cellVaildMode === 'obsolete') {
          if ($xeTable.clearValidate) {
            return $xeTable.clearValidate()
          }
        }
        focused.row = null
        focused.column = null
        return nextTick()
      },
      /**
       * 清除所选中源状态
       */
      clearSelected () {
        const { editStore } = reactData
        const { selected } = editStore
        selected.row = null
        selected.column = null
        removeCellSelectedClass()
        return nextTick()
      },
      isActiveByRow (row) {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          log.warn('vxe.error.delFunc', ['isActiveByRow', 'isEditByRow'])
        }
        // 即将废弃
        return this.isEditByRow(row)
      },
      /**
       * 判断行是否为激活编辑状态
       * @param {Row} row 行对象
       */
      isEditByRow (row) {
        const { editStore } = reactData
        return editStore.actived.row === row
      },
      setActiveRow (row) {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          log.warn('vxe.error.delFunc', ['setActiveRow', 'setEditRow'])
        }
        // 即将废弃
        return editMethods.setEditRow(row)
      },
      /**
       * 激活行编辑
       */
      setEditRow (row, fieldOrColumn) {
        const { visibleColumn } = internalData
        let column: any = XEUtils.find(visibleColumn, column => isEnableConf(column.editRender))
        if (fieldOrColumn) {
          column = XEUtils.isString(fieldOrColumn) ? $xeTable.getColumnByField(fieldOrColumn) : fieldOrColumn
        }
        return $xeTable.setEditCell(row, column)
      },
      setActiveCell (row, fieldOrColumn) {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          log.warn('vxe.error.delFunc', ['setActiveCell', 'setEditCell'])
        }
        // 即将废弃
        return editMethods.setEditCell(row, fieldOrColumn)
      },
      /**
       * 激活单元格编辑
       */
      setEditCell (row, fieldOrColumn) {
        const { editConfig } = props
        const column = XEUtils.isString(fieldOrColumn) ? $xeTable.getColumnByField(fieldOrColumn) : fieldOrColumn
        if (row && column && isEnableConf(editConfig) && isEnableConf(column.editRender)) {
          return $xeTable.scrollToRow(row, column).then(() => {
            const cell = $xeTable.getCell(row, column)
            if (cell) {
              editPrivateMethods.handleActived({
                row,
                rowIndex: $xeTable.getRowIndex(row),
                column,
                columnIndex: $xeTable.getColumnIndex(column),
                cell,
                $table: $xeTable
              })
              internalData._lastCallTime = Date.now()
            }
            return nextTick()
          })
        }
        return nextTick()
      },
      /**
       * 只对 trigger=dblclick 有效，选中单元格
       */
      setSelectCell (row, fieldOrColumn) {
        const { tableData } = reactData
        const editOpts = computeEditOpts.value
        const column = XEUtils.isString(fieldOrColumn) ? $xeTable.getColumnByField(fieldOrColumn) : fieldOrColumn
        if (row && column && editOpts.trigger !== 'manual') {
          const rowIndex = $xeTable.findRowIndexOf(tableData, row)
          if (rowIndex > -1 && column) {
            const cell = $xeTable.getCell(row, column)
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
        return nextTick()
      }
    }

    editPrivateMethods = {
      /**
       * 处理激活编辑
       */
      handleActived (params, evnt) {
        const { editConfig, mouseConfig } = props
        const { editStore, tableColumn } = reactData
        const editOpts = computeEditOpts.value
        const { mode } = editOpts
        const { actived, focused } = editStore
        const { row, column } = params
        const { editRender } = column
        const cell = (params.cell || $xeTable.getCell(row, column))
        const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
        params.cell = cell
        if (cell && isEnableConf(editConfig) && isEnableConf(editRender)) {
          // 激活编辑
          if (!$xeTable.hasPendingByRow(row)) {
            if (actived.row !== row || (mode === 'cell' ? actived.column !== column : false)) {
              // 判断是否禁用编辑
              let type: 'edit-disabled' | 'edit-activated' = 'edit-disabled'
              if (!beforeEditMethod || beforeEditMethod({ ...params, $table: $xeTable, $grid: $xeTable.xegrid })) {
                if (mouseConfig) {
                  editMethods.clearSelected()
                  if ($xeTable.clearCellAreas) {
                    $xeTable.clearCellAreas()
                    $xeTable.clearCopyCellArea()
                  }
                }
                $xeTable.closeTooltip()
                if (actived.column) {
                  editMethods.clearEdit(evnt)
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
                nextTick(() => {
                  editPrivateMethods.handleFocus(params, evnt)
                  if (afterEditMethod) {
                    afterEditMethod({ ...params, $table: $xeTable, $grid: $xeTable.xegrid })
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
                editMethods.clearSelected()
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
              setTimeout(() => {
                editPrivateMethods.handleFocus(params, evnt)
              })
            }
            focused.column = null
            focused.row = null
            $xeTable.focus()
          }
        }
        return nextTick()
      },
      /**
       * 处理聚焦
       */
      handleFocus (params) {
        const { row, column, cell } = params
        const { editRender } = column
        if (isEnableConf(editRender)) {
          const compRender = renderer.get(editRender.name)
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
            $xeTable.scrollToRow(row, column)
          }
        }
      },
      /**
       * 处理选中源
       */
      handleSelected (params, evnt) {
        const { mouseConfig } = props
        const { editStore } = reactData
        const mouseOpts = computeMouseOpts.value
        const editOpts = computeEditOpts.value
        const { actived, selected } = editStore
        const { row, column } = params
        const isMouseSelected = mouseConfig && mouseOpts.selected
        const selectMethod = () => {
          if (isMouseSelected && (selected.row !== row || selected.column !== column)) {
            if (actived.row !== row || (editOpts.mode === 'cell' ? actived.column !== column : false)) {
              editMethods.clearEdit(evnt)
              editMethods.clearSelected()
              if ($xeTable.clearCellAreas) {
                $xeTable.clearCellAreas()
                $xeTable.clearCopyCellArea()
              }
              selected.args = params
              selected.row = row
              selected.column = column
              if (isMouseSelected) {
                editPrivateMethods.addCellSelectedClass()
              }
              $xeTable.focus()
              if (evnt) {
                $xeTable.dispatchEvent('cell-selected', params, evnt)
              }
            }
          }
          return nextTick()
        }
        return selectMethod()
      },
      addCellSelectedClass () {
        const { editStore } = reactData
        const { selected } = editStore
        const { row, column } = selected
        removeCellSelectedClass()
        if (row && column) {
          const cell = $xeTable.getCell(row, column)
          if (cell) {
            addClass(cell, 'col--selected')
          }
        }
      }
    }

    return { ...editMethods, ...editPrivateMethods }
  },
  setupGrid ($xeGrid) {
    return $xeGrid.extendTableMethods(tableEditMethodKeys)
  }
})
