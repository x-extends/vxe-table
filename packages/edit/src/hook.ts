import { nextTick } from 'vue'
import XEUtils from 'xe-utils'
import { renderer } from '../../v-x-e-table'
import { isEnableConf } from '../../tools/utils'
import { getCellValue, setCellValue, getRowid } from '../../table/src/util'
import { browse, removeClass, addClass } from '../../tools/dom'
import { warnLog, errLog, getLog } from '../../tools/log'

import { VxeGlobalHooksHandles, TableEditMethods, TableEditPrivateMethods } from '../../../types/all'

const tableEditMethodKeys: (keyof TableEditMethods)[] = ['insert', 'insertAt', 'remove', 'removeCheckboxRow', 'removeRadioRow', 'removeCurrentRow', 'getRecordset', 'getInsertRecords', 'getRemoveRecords', 'getUpdateRecords', 'getEditRecord', 'getActiveRecord', 'getSelectedCell', 'clearEdit', 'clearActived', 'clearSelected', 'isEditByRow', 'isActiveByRow', 'setEditRow', 'setActiveRow', 'setEditCell', 'setActiveCell', 'setSelectCell']

const editHook: VxeGlobalHooksHandles.HookOptions = {
  setupTable ($xetable) {
    const { props, reactData, internalData } = $xetable
    const { refElem } = $xetable.getRefMaps()
    const { computeMouseOpts, computeEditOpts, computeCheckboxOpts, computeTreeOpts } = $xetable.getComputeMaps()

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
      const { rowField, parentField, children, mapChildren } = treeOpts
      const funcName = isAppend ? 'push' : 'unshift'
      newRecords.forEach(item => {
        const parentRowId = item[parentField]
        const rowid = getRowid($xetable, item)
        const matchObj = parentRowId ? XEUtils.findTree(tableFullTreeData, item => parentRowId === item[rowField], { children: mapChildren }) : null
        if (matchObj) {
          const { item: parentRow } = matchObj
          const parentRest = fullAllDataRowIdData[getRowid($xetable, parentRow)]
          const parentLevel = parentRest ? parentRest.level : 0
          let parentChilds = parentRow[children]
          if (!XEUtils.isArray(parentChilds)) {
            parentChilds = parentRow[children] = []
          }
          parentChilds[funcName](item)
          const rest = { row: item, rowid, seq: -1, index: -1, _index: -1, $index: -1, items: parentChilds, parent, level: parentLevel + 1 }
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

    editMethods = {
      /**
       * 往表格中插入临时数据
       *
       * @param {*} records
       */
      insert (records: any) {
        return editMethods.insertAt(records, null)
      },
      /**
       * 往表格指定行中插入临时数据
       * 如果 row 为空则从插入到顶部，如果为树结构，则插入到目标节点顶部
       * 如果 row 为 -1 则从插入到底部，如果为树结构，则插入到目标节点底部
       * 如果 row 为有效行则插入到该行的位置，如果为树结构，则有插入到效的目标节点该行的位置
       * @param {Object/Array} records 新的数据
       * @param {Row} row 指定行
       * @param {Boolean} isNext 指定行下面添加
       */
      insertAt (records: any, row: any, isNext: Boolean = false) {
        const { treeConfig } = props
        const { mergeList, editStore } = reactData
        const { tableFullTreeData, afterFullData, tableFullData, fullDataRowIdData, fullAllDataRowIdData } = internalData
        const treeOpts = computeTreeOpts.value
        const { transform, rowField, mapChildren } = treeOpts
        if (!XEUtils.isArray(records)) {
          records = [records]
        }
        const newRecords: any[] = records.map((record: any) => $xetable.defineField(Object.assign({}, record)))
        if (!row) {
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
              const matchObj = XEUtils.findTree(tableFullTreeData, item => row[rowField] === item[rowField], { children: mapChildren })
              if (matchObj) {
                const { parent: parentRow } = matchObj
                const parentChilds = matchObj.items
                const parentRest = fullAllDataRowIdData[getRowid($xetable, parentRow)]
                const parentLevel = parentRest ? parentRest.level : 0
                newRecords.forEach((item, i) => {
                  const rowid = getRowid($xetable, item)
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
                  parentChilds.splice(matchObj.index + i, 0, item)
                  const rest = { row: item, rowid, seq: -1, index: -1, _index: -1, $index: -1, items: parentChilds, parent: parentRow, level: parentLevel + 1 }
                  fullDataRowIdData[rowid] = rest
                  fullAllDataRowIdData[rowid] = rest
                })
              } else {
                if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                  warnLog('vxe.error.unableInsert')
                }
                insertTreeRow(newRecords, true)
              }
            } else {
              if (treeConfig) {
                throw new Error(getLog('vxe.error.noTree', ['insert']))
              }
              let afIndex = -1
              let fullIndex = -1
              // 如果是可视索引
              if (XEUtils.isNumber(row)) {
                if (row < afterFullData.length) {
                  afIndex = row
                  fullIndex = row
                }
              } else {
                afIndex = $xetable.findRowIndexOf(afterFullData, row)
                fullIndex = $xetable.findRowIndexOf(tableFullData, row)
              }
              if (afIndex === -1 || fullIndex === -1) {
                throw new Error(errLog('vxe.error.unableInsert'))
              }
              if (isNext) {
                afIndex = afIndex + 1
                fullIndex = fullIndex + 1
              }
              afterFullData.splice(afIndex, 0, ...newRecords)
              tableFullData.splice(fullIndex, 0, ...newRecords)
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
        editStore.insertList.unshift(...newRecords)
        $xetable.updateFooter()
        $xetable.cacheRowMap()
        $xetable.handleTableData(treeConfig && transform)
        if (!(treeConfig && transform)) {
          $xetable.updateAfterDataIndex()
        }
        $xetable.checkSelectionStatus()
        if (reactData.scrollYLoad) {
          $xetable.updateScrollYSpace()
        }
        return nextTick().then(() => {
          $xetable.updateCellAreas()
          return $xetable.recalculate()
        }).then(() => {
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
      remove (rows: any) {
        const { treeConfig } = props
        const { mergeList, editStore, selection } = reactData
        const { tableFullTreeData, afterFullData, tableFullData } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const treeOpts = computeTreeOpts.value
        const { transform } = treeOpts
        const { actived, removeList, insertList } = editStore
        const { checkField } = checkboxOpts
        let rest: any[] = []
        if (!rows) {
          rows = tableFullData
        } else if (!XEUtils.isArray(rows)) {
          rows = [rows]
        }
        // 如果是新增，则保存记录
        rows.forEach((row: any) => {
          if (!$xetable.isInsertByRow(row)) {
            removeList.push(row)
          }
        })
        // 如果绑定了多选属性，则更新状态
        if (!checkField) {
          rows.forEach((row: any) => {
            const sIndex = $xetable.findRowIndexOf(selection, row)
            if (sIndex > -1) {
              selection.splice(sIndex, 1)
            }
          })
        }
        // 从数据源中移除
        if (tableFullData === rows) {
          rows = rest = tableFullData.slice(0)
          internalData.tableFullData = []
          internalData.afterFullData = []
          $xetable.clearMergeCells()
        } else {
          // 如果为虚拟树
          if (treeConfig && transform) {
            rows.forEach((row: any) => {
              const rowid = getRowid($xetable, row)
              const matchObj = XEUtils.findTree(tableFullTreeData, item => rowid === getRowid($xetable, item), treeOpts)
              if (matchObj) {
                const rItems = matchObj.items.splice(matchObj.index, 1)
                rest.push(rItems[0])
              }
              const afIndex = $xetable.findRowIndexOf(afterFullData, row)
              if (afIndex > -1) {
                afterFullData.splice(afIndex, 1)
              }
            })
          } else {
            rows.forEach((row: any) => {
              const tfIndex = $xetable.findRowIndexOf(tableFullData, row)
              if (tfIndex > -1) {
                const rItems = tableFullData.splice(tfIndex, 1)
                rest.push(rItems[0])
              }
              const afIndex = $xetable.findRowIndexOf(afterFullData, row)
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
        if (actived.row && $xetable.findRowIndexOf(rows, actived.row) > -1) {
          editMethods.clearEdit()
        }
        // 从新增中移除已删除的数据
        rows.forEach((row: any) => {
          const iIndex = $xetable.findRowIndexOf(insertList, row)
          if (iIndex > -1) {
            insertList.splice(iIndex, 1)
          }
        })
        $xetable.updateFooter()
        $xetable.cacheRowMap()
        $xetable.handleTableData(treeConfig && transform)
        if (!(treeConfig && transform)) {
          $xetable.updateAfterDataIndex()
        }
        $xetable.checkSelectionStatus()
        if (reactData.scrollYLoad) {
          $xetable.updateScrollYSpace()
        }
        return nextTick().then(() => {
          $xetable.updateCellAreas()
          return $xetable.recalculate()
        }).then(() => {
          return { row: rest.length ? rest[rest.length - 1] : null, rows: rest }
        })
      },
      /**
       * 删除复选框选中的数据
       */
      removeCheckboxRow () {
        return editMethods.remove($xetable.getCheckboxRecords()).then((params: any) => {
          $xetable.clearCheckboxRow()
          return params
        })
      },
      /**
       * 删除单选框选中的数据
       */
      removeRadioRow () {
        const radioRecord = $xetable.getRadioRecord()
        return editMethods.remove(radioRecord || []).then((params: any) => {
          $xetable.clearRadioRow()
          return params
        })
      },
      /**
       * 删除当前行选中的数据
       */
      removeCurrentRow () {
        const currentRecord = $xetable.getCurrentRecord()
        return editMethods.remove(currentRecord || []).then((params: any) => {
          $xetable.clearCurrentRow()
          return params
        })
      },
      /**
       * 获取表格数据集，包含新增、删除、修改
       */
      getRecordset () {
        return {
          insertRecords: editMethods.getInsertRecords(),
          removeRecords: editMethods.getRemoveRecords(),
          updateRecords: editMethods.getUpdateRecords()
        }
      },
      /**
       * 获取新增的临时数据
       */
      getInsertRecords () {
        const { treeConfig } = props
        const { editStore } = reactData
        const { tableFullTreeData, tableFullData } = internalData
        const treeOpts = computeTreeOpts.value
        const insertList = editStore.insertList
        const insertRecords: any[] = []
        if (insertList.length) {
          // 如果为虚拟树
          if (treeConfig && treeOpts.transform) {
            insertList.forEach(row => {
              const rowid = getRowid($xetable, row)
              const matchObj = XEUtils.findTree(tableFullTreeData, item => rowid === getRowid($xetable, item), treeOpts)
              if (matchObj) {
                insertRecords.push(row)
              }
            })
          } else {
            insertList.forEach(row => {
              if ($xetable.findRowIndexOf(tableFullData, row) > -1) {
                insertRecords.push(row)
              }
            })
          }
        }
        return insertRecords
      },
      /**
       * 获取已删除的数据
       */
      getRemoveRecords () {
        const { editStore } = reactData
        return editStore.removeList
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
            return XEUtils.filterTree(tableFullData, row => $xetable.isUpdateByRow(row), treeOpts)
          }
          return tableFullData.filter((row: any) => $xetable.isUpdateByRow(row))
        }
        return []
      },
      getActiveRecord () {
        return this.getEditRecord()
      },
      getEditRecord () {
        const { editStore } = reactData
        const { afterFullData } = internalData
        const el = refElem.value
        const { args, row } = editStore.actived
        if (args && $xetable.findRowIndexOf(afterFullData, row) > -1 && el.querySelectorAll('.vxe-body--column.col--actived').length) {
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
        // if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        //   warnLog('vxe.error.delFunc', ['clearActived', 'clearEdit'])
        // }
        // 即将废弃
        return this.clearEdit(evnt)
      },
      /**
       * 清除激活的编辑
       */
      clearEdit (evnt) {
        const { editStore } = reactData
        const { actived } = editStore
        const { row, column } = actived
        if (row || column) {
          syncActivedCell()
          actived.args = null
          actived.row = null
          actived.column = null
          $xetable.updateFooter()
          $xetable.dispatchEvent('edit-closed', {
            row,
            rowIndex: $xetable.getRowIndex(row),
            $rowIndex: $xetable.getVMRowIndex(row),
            column,
            columnIndex: $xetable.getColumnIndex(column),
            $columnIndex: $xetable.getVMColumnIndex(column)
          }, evnt || null)
        }
        return $xetable.clearValidate ? $xetable.clearValidate() : nextTick()
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
        // if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        //   warnLog('vxe.error.delFunc', ['isActiveByRow', 'isEditByRow'])
        // }
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
        // if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        //   warnLog('vxe.error.delFunc', ['setActiveRow', 'setEditRow'])
        // }
        // 即将废弃
        return editMethods.setEditRow(row)
      },
      /**
       * 激活行编辑
       */
      setEditRow (row) {
        const { visibleColumn } = internalData
        return $xetable.setEditCell(row, XEUtils.find(visibleColumn, column => isEnableConf(column.editRender)))
      },
      setActiveCell (row, fieldOrColumn) {
        // if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        //   warnLog('vxe.error.delFunc', ['setActiveCell', 'setEditCell'])
        // }
        // 即将废弃
        return editMethods.setEditCell(row, fieldOrColumn)
      },
      /**
       * 激活单元格编辑
       */
      setEditCell (row, fieldOrColumn) {
        const { editConfig } = props
        const column = XEUtils.isString(fieldOrColumn) ? $xetable.getColumnByField(fieldOrColumn) : fieldOrColumn
        if (row && column && isEnableConf(editConfig) && isEnableConf(column.editRender)) {
          return $xetable.scrollToRow(row, column).then(() => {
            const cell = $xetable.getCell(row, column)
            if (cell) {
              editPrivateMethods.handleActived({
                row,
                rowIndex: $xetable.getRowIndex(row),
                column,
                columnIndex: $xetable.getColumnIndex(column),
                cell,
                $table: $xetable
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
        const column = XEUtils.isString(fieldOrColumn) ? $xetable.getColumnByField(fieldOrColumn) : fieldOrColumn
        if (row && column && editOpts.trigger !== 'manual') {
          const rowIndex = $xetable.findRowIndexOf(tableData, row)
          if (rowIndex > -1 && column) {
            const cell = $xetable.getCell(row, column)
            const params = {
              row,
              rowIndex,
              column,
              columnIndex: $xetable.getColumnIndex(column),
              cell
            }
            $xetable.handleSelected(params, {})
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
        const { actived } = editStore
        const { row, column } = params
        const { editRender } = column
        const cell = (params.cell || $xetable.getCell(row, column))
        const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
        params.cell = cell
        if (isEnableConf(editConfig) && isEnableConf(editRender) && cell) {
          if (actived.row !== row || (mode === 'cell' ? actived.column !== column : false)) {
            // 判断是否禁用编辑
            let type: 'edit-disabled' | 'edit-actived' = 'edit-disabled'
            if (!beforeEditMethod || beforeEditMethod({ ...params, $table: $xetable })) {
              if (mouseConfig) {
                editMethods.clearSelected()
                if ($xetable.clearCellAreas) {
                  $xetable.clearCellAreas()
                  $xetable.clearCopyCellArea()
                }
              }
              $xetable.closeTooltip()
              if (actived.column) {
                editMethods.clearEdit(evnt)
              }
              type = 'edit-actived'
              column.renderHeight = cell.offsetHeight
              actived.args = params
              actived.row = row
              actived.column = column
              if (mode === 'row') {
                tableColumn.forEach((column: any) => getEditColumnModel(row, column))
              } else {
                getEditColumnModel(row, column)
              }
              nextTick(() => {
                editPrivateMethods.handleFocus(params, evnt)
              })
            }
            $xetable.dispatchEvent(type, {
              row,
              rowIndex: $xetable.getRowIndex(row),
              $rowIndex: $xetable.getVMRowIndex(row),
              column,
              columnIndex: $xetable.getColumnIndex(column),
              $columnIndex: $xetable.getVMColumnIndex(column)
            }, evnt)
          } else {
            const { column: oldColumn } = actived
            if (mouseConfig) {
              editMethods.clearSelected()
              if ($xetable.clearCellAreas) {
                $xetable.clearCellAreas()
                $xetable.clearCopyCellArea()
              }
            }
            if (oldColumn !== column) {
              const { model: oldModel } = oldColumn
              if (oldModel.update) {
                setCellValue(row, oldColumn, oldModel.value)
              }
              if ($xetable.clearValidate) {
                $xetable.clearValidate()
              }
            }
            column.renderHeight = cell.offsetHeight
            actived.args = params
            actived.column = column
            setTimeout(() => {
              editPrivateMethods.handleFocus(params, evnt)
            })
          }
          $xetable.focus()
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
            $xetable.scrollToRow(row, column)
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
              if ($xetable.clearCellAreas) {
                $xetable.clearCellAreas()
                $xetable.clearCopyCellArea()
              }
              selected.args = params
              selected.row = row
              selected.column = column
              if (isMouseSelected) {
                editPrivateMethods.addCellSelectedClass()
              }
              $xetable.focus()
              if (evnt) {
                $xetable.dispatchEvent('cell-selected', params, evnt)
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
          const cell = $xetable.getCell(row, column)
          if (cell) {
            addClass(cell, 'col--selected')
          }
        }
      }
    }

    return { ...editMethods, ...editPrivateMethods }
  },
  setupGrid ($xegrid) {
    return $xegrid.extendTableMethods(tableEditMethodKeys)
  }
}

export default editHook
