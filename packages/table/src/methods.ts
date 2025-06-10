import XEUtils from 'xe-utils'
import { getTpImg, isPx, isScale, hasClass, addClass, removeClass, getEventTargetNode, getPaddingTopBottomSize, setScrollTop, setScrollLeft, toCssUnit, hasControlKey } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex, hasChildrenList, getFuncText, isEnableConf, formatText, eqEmptyValue } from '../../ui/src/utils'
import { VxeUI } from '../../ui'
import Cell from './cell'
import { getRowUniqueId, clearTableAllStatus, toFilters, getRowkey, getRowid, rowToVisible, colToVisible, getCellValue, setCellValue, handleRowidOrRow, handleFieldOrColumn, toTreePathSeq, restoreScrollLocation, getRootColumn, getColReMinWidth, createHandleUpdateRowId, createHandleGetRowId, getRefElem } from './util'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'

import type { VxeTableDefines, VxeColumnPropTypes, VxeTableEmits, ValueOf, TableReactData, VxeTableConstructor, VxeToolbarConstructor, TableInternalData, VxeGridConstructor, GridPrivateMethods, VxeTablePrivateMethods, VxeTooltipInstance, VxeTablePropTypes } from '../../../types'

const { getConfig, getI18n, renderer, formats, interceptor, createEvent } = VxeUI

const browseObj = XEUtils.browse()

const supportMaxRow = 5e6
const customStorageKey = 'VXE_CUSTOM_STORE'
const maxYHeight = 5e6
const maxXWidth = 5e6

function eqCellValue (row1: any, row2: any, field: any) {
  const val1 = XEUtils.get(row1, field)
  const val2 = XEUtils.get(row2, field)
  if (eqEmptyValue(val1) && eqEmptyValue(val2)) {
    return true
  }
  if (XEUtils.isString(val1) || XEUtils.isNumber(val1)) {
    return ('' + val1) === ('' + val2)
  }
  return XEUtils.isEqual(val1, val2)
}

function getNextSortOrder ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, column: any) {
  const sortOpts = $xeTable.computeSortOpts
  const { orders = [] } = sortOpts
  const currOrder = column.order || null
  const oIndex = orders.indexOf(currOrder) + 1
  return orders[oIndex < orders.length ? oIndex : 0]
}

const getCustomStorageMap = (id?: any) => {
  const version = getConfig().version
  const rest = XEUtils.toStringJSON(localStorage.getItem(customStorageKey) || '')
  const maps = rest && rest._v === version ? rest : { _v: version }
  return (id ? maps[id] : maps) || {}
}

const setCustomStorageMap = (id: any, data: any) => {
  const version = getConfig().version
  const maps = getCustomStorageMap()
  maps[id] = data || undefined
  maps._v = version
  localStorage.setItem(customStorageKey, XEUtils.toJSONString(maps))
}

const getRecoverRowMaps = ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, keyMaps: any) => {
  const internalData = $xeTable as unknown as TableInternalData

  const { fullAllDataRowIdData } = internalData
  const restKeys: any = {}
  XEUtils.each(keyMaps, (row, rowid) => {
    if (fullAllDataRowIdData[rowid]) {
      restKeys[rowid] = row
    }
  })
  return restKeys
}

function handleReserveRow ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, reserveRowMap: any) {
  const internalData = $xeTable as unknown as TableInternalData

  const { fullDataRowIdData } = internalData
  const reserveList: any[] = []
  XEUtils.each(reserveRowMap, (item, rowid) => {
    if (fullDataRowIdData[rowid] && reserveList.indexOf(fullDataRowIdData[rowid].row) === -1) {
      reserveList.push(fullDataRowIdData[rowid].row)
    }
  })
  return reserveList
}

function handleVirtualXVisible ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { isScrollXBig, scrollXWidth } = reactData
  const { elemStore, visibleColumn, fullColumnIdData } = internalData
  const leftFixedWidth = $xeTable.computeLeftFixedWidth
  const rightFixedWidth = $xeTable.computeRightFixedWidth
  const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
  if (bodyScrollElem) {
    const clientWidth = bodyScrollElem.clientWidth
    let scrollLeft = bodyScrollElem.scrollLeft
    if (isScrollXBig) {
      scrollLeft = Math.ceil((scrollXWidth - clientWidth) * Math.min(1, (scrollLeft / (maxXWidth - clientWidth))))
    }
    const startLeft = scrollLeft + leftFixedWidth
    const endLeft = scrollLeft + clientWidth - rightFixedWidth
    let leftIndex = 0
    let rightIndex = visibleColumn.length
    while (leftIndex < rightIndex) {
      const cIndex = Math.floor((leftIndex + rightIndex) / 2)
      const column = visibleColumn[cIndex]
      const colid = column.id
      const colRest = fullColumnIdData[colid] || {}
      if (colRest.oLeft <= startLeft) {
        leftIndex = cIndex + 1
      } else {
        rightIndex = cIndex
      }
    }
    let visibleSize = 0
    const toVisibleIndex = leftIndex === visibleColumn.length ? leftIndex : Math.max(0, leftIndex < visibleColumn.length ? leftIndex - 2 : 0)
    for (let cIndex = toVisibleIndex, cLen = visibleColumn.length; cIndex < cLen; cIndex++) {
      const column = visibleColumn[cIndex]
      const colid = column.id
      const colRest = fullColumnIdData[colid] || {}
      visibleSize++
      if (colRest.oLeft > endLeft || visibleSize >= 60) {
        break
      }
    }
    return { toVisibleIndex: Math.max(0, toVisibleIndex), visibleSize: Math.max(1, visibleSize) }
  }
  return { toVisibleIndex: 0, visibleSize: 6 }
}

function handleCustomRestore ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, storeData: VxeTableDefines.CustomStoreData) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  let { collectColumn } = internalData
  const { resizableData, sortData, visibleData, fixedData } = storeData
  let hasCustomSort = false
  // 处理还原
  if (resizableData || sortData || visibleData || fixedData) {
    XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn) => {
      const colKey = column.getKey()
      // 支持一级
      if (!parentColumn) {
        if (fixedData && fixedData[colKey] !== undefined) {
          column.fixed = fixedData[colKey]
        }
        if (sortData && XEUtils.isNumber(sortData[colKey])) {
          hasCustomSort = true
          column.renderSortNumber = sortData[colKey]
        }
      }
      if (resizableData && XEUtils.isNumber(resizableData[colKey])) {
        column.resizeWidth = resizableData[colKey]
      }
      if (visibleData && XEUtils.isBoolean(visibleData[colKey])) {
        column.visible = visibleData[colKey]
      }
    })
    // 如果自定义了顺序
    if (hasCustomSort) {
      collectColumn = XEUtils.orderBy(collectColumn, 'renderSortNumber')
      internalData.collectColumn = collectColumn
      internalData.tableFullColumn = getColumnList(collectColumn)
    }
    reactData.isCustomStatus = true
  } else {
    reactData.isCustomStatus = false
  }
}

/**
 * 还原自定义列操作状态
 */
function restoreCustomStorage ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable

  const { customConfig } = props
  const tableId = $xeTable.computeTableId
  const customOpts = $xeTable.computeCustomOpts
  const { storage, restoreStore } = customOpts
  const isAllCustom = storage === true
  const storageOpts: VxeTableDefines.VxeTableCustomStorageObj = isAllCustom ? {} : Object.assign({}, storage || {})
  const isCustomResizable = isAllCustom || storageOpts.resizable
  const isCustomVisible = isAllCustom || storageOpts.visible
  const isCustomFixed = isAllCustom || storageOpts.fixed
  const isCustomSort = isAllCustom || storageOpts.sort
  if ((customConfig ? isEnableConf(customOpts) : customOpts.enabled) && (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort)) {
    if (!tableId) {
      errLog('vxe.error.reqProp', ['id'])
      return
    }
    const storeData: VxeTableDefines.CustomStoreData = getCustomStorageMap(tableId)
    if (restoreStore) {
      return Promise.resolve(
        restoreStore({ $table: $xeTable, id: tableId, type: 'restore', storeData })
      ).then(storeData => {
        if (!storeData) {
          return
        }
        return handleCustomRestore($xeTable, storeData)
      }).catch(e => e)
    } else {
      return handleCustomRestore($xeTable, storeData)
    }
  }
}

/**
 * 更新数据列的 Map
 * 牺牲数据组装的耗时，用来换取使用过程中的流畅
 */
function cacheColumnMap ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { tableFullColumn, collectColumn } = internalData
  const fullColumnIdData: Record<string, VxeTableDefines.ColumnCacheItem> = internalData.fullColumnIdData = {}
  const fullColumnFieldData: Record<string, VxeTableDefines.ColumnCacheItem> = internalData.fullColumnFieldData = {}
  const mouseOpts = $xeTable.computeMouseOpts
  const expandOpts = $xeTable.computeExpandOpts
  const columnOpts = $xeTable.computeColumnOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const { isCrossDrag, isSelfToChildDrag } = columnDragOpts
  const customOpts = $xeTable.computeCustomOpts
  const { storage } = customOpts
  const rowOpts = $xeTable.computeRowOpts
  const isGroup = collectColumn.some(hasChildrenList)
  let isAllOverflow = !!props.showOverflow
  let rowGroupColumn: VxeTableDefines.ColumnInfo | undefined
  let expandColumn: VxeTableDefines.ColumnInfo | undefined
  let treeNodeColumn: VxeTableDefines.ColumnInfo | undefined
  let checkboxColumn: VxeTableDefines.ColumnInfo | undefined
  let radioColumn: VxeTableDefines.ColumnInfo | undefined
  let htmlColumn: VxeTableDefines.ColumnInfo | undefined
  let hasFixed: VxeColumnPropTypes.Fixed | undefined
  const handleFunc = (column: VxeTableDefines.ColumnInfo, index: number, items: VxeTableDefines.ColumnInfo[], path?: string[], parentColumn?: VxeTableDefines.ColumnInfo) => {
    const { id: colid, field, fixed, type, treeNode, rowGroupNode } = column
    const rest = { $index: -1, _index: -1, column, colid, index, items, parent: parentColumn || null, width: 0, oLeft: 0 }
    if (field) {
      if (fullColumnFieldData[field]) {
        errLog('vxe.error.colRepet', ['field', field])
      }
      fullColumnFieldData[field] = rest
    } else {
      if ((storage && !type) || (columnOpts.drag && (isCrossDrag || isSelfToChildDrag))) {
        errLog('vxe.error.reqProp', [`${column.getTitle() || type || ''} -> column.field=?`])
      }
    }
    if (!hasFixed && fixed) {
      hasFixed = fixed
    }
    if (!htmlColumn && type === 'html') {
      htmlColumn = column
    }
    if (treeNode) {
      if (treeNodeColumn) {
        warnLog('vxe.error.colRepet', ['tree-node', treeNode])
      }
      if (!treeNodeColumn) {
        treeNodeColumn = column
      }
    }
    if (rowGroupNode) {
      if (treeNodeColumn) {
        warnLog('vxe.error.colRepet', ['row-group-node', rowGroupNode])
      }
      if (!rowGroupColumn) {
        rowGroupColumn = column
      }
    }
    if (type === 'expand') {
      if (expandColumn) {
        warnLog('vxe.error.colRepet', ['type', type])
      }
      if (!expandColumn) {
        expandColumn = column
      }
    }
    if (type === 'checkbox') {
      if (checkboxColumn) {
        warnLog('vxe.error.colRepet', ['type', type])
      }
      if (!checkboxColumn) {
        checkboxColumn = column
      }
    } else if (type === 'radio') {
      if (radioColumn) {
        warnLog('vxe.error.colRepet', ['type', type])
      }
      if (!radioColumn) {
        radioColumn = column
      }
    }
    if (isAllOverflow && column.showOverflow === false) {
      isAllOverflow = false
    }
    if (fullColumnIdData[colid]) {
      errLog('vxe.error.colRepet', ['colId', colid])
    }
    fullColumnIdData[colid] = rest
  }

  if (isGroup) {
    XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn, nodes) => {
      column.level = nodes.length
      handleFunc(column, index, items, path, parentColumn)
    })
  } else {
    tableFullColumn.forEach(handleFunc)
  }

  if ((expandColumn && expandOpts.mode !== 'fixed') && mouseOpts.area) {
    errLog('vxe.error.errConflicts', ['mouse-config.area', 'column.type=expand'])
  }

  if (htmlColumn) {
    if (!columnOpts.useKey) {
      errLog('vxe.error.reqProp', ['column-config.useKey & column.type=html'])
    }
    if (!rowOpts.useKey) {
      errLog('vxe.error.reqProp', ['row-config.useKey & column.type=html'])
    }
  }

  reactData.isGroup = isGroup
  reactData.rowGroupColumn = rowGroupColumn
  reactData.treeNodeColumn = treeNodeColumn
  reactData.expandColumn = expandColumn
  reactData.isAllOverflow = isAllOverflow
}

function updateScrollXStatus ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, fullColumn?: any[]) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const virtualXOpts = $xeTable.computeVirtualXOpts
  const allCols = fullColumn || internalData.tableFullColumn
  // 如果gt为0，则总是启用
  const scrollXLoad = !!virtualXOpts.enabled && virtualXOpts.gt > -1 && (virtualXOpts.gt === 0 || virtualXOpts.gt < allCols.length)
  reactData.scrollXLoad = scrollXLoad
  return scrollXLoad
}

function updateScrollYStatus ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, fullData?: any[]) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const virtualYOpts = $xeTable.computeVirtualYOpts
  const treeOpts = $xeTable.computeTreeOpts
  const { transform } = treeOpts
  const allList = fullData || internalData.tableFullData
  // 如果gt为0，则总是启用
  const scrollYLoad = (transform || !treeConfig) && !!virtualYOpts.enabled && virtualYOpts.gt > -1 && (virtualYOpts.gt === 0 || virtualYOpts.gt < allList.length)
  reactData.scrollYLoad = scrollYLoad
  return scrollYLoad
}

/**
 * 展开与收起树节点
 * @param rows
 * @param expanded
 * @returns
 */
function handleBaseTreeExpand ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, rows: any[], expanded: boolean) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { treeNodeColumn } = reactData
  const { fullAllDataRowIdData, tableFullTreeData, treeExpandedMaps, treeExpandLazyLoadedMaps } = internalData
  const treeOpts = $xeTable.computeTreeOpts
  const { reserve, lazy, accordion, toggleMethod } = treeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
  const result: any[] = []
  const columnIndex = $xeTable.getColumnIndex(treeNodeColumn)
  const $columnIndex = $xeTable.getVMColumnIndex(treeNodeColumn)
  const { handleGetRowId } = createHandleGetRowId($xeTable)
  let validRows = toggleMethod ? rows.filter((row: any) => toggleMethod({ $table: $xeTable, expanded, column: treeNodeColumn, columnIndex, $columnIndex, row })) : rows
  if (accordion) {
    validRows = validRows.length ? [validRows[validRows.length - 1]] : []
    // 同一级只能展开一个
    const matchObj = XEUtils.findTree(tableFullTreeData, item => item === validRows[0], { children: childrenField })
    if (matchObj) {
      matchObj.items.forEach(item => {
        const rowid = handleGetRowId(item)
        if (treeExpandedMaps[rowid]) {
          delete treeExpandedMaps[rowid]
        }
      })
    }
  }
  if (expanded) {
    validRows.forEach((row: any) => {
      const rowid = handleGetRowId(row)
      if (!treeExpandedMaps[rowid]) {
        const rowRest = fullAllDataRowIdData[rowid]
        if (rowRest) {
          const isLoad = lazy && row[hasChildField] && !rowRest.treeLoaded && !treeExpandLazyLoadedMaps[rowid]
          // 是否使用懒加载
          if (isLoad) {
            result.push(handleAsyncTreeExpandChilds($xeTable, row))
          } else {
            if (row[childrenField] && row[childrenField].length) {
              treeExpandedMaps[rowid] = row
            }
          }
        }
      }
    })
  } else {
    validRows.forEach(item => {
      const rowid = handleGetRowId(item)
      if (treeExpandedMaps[rowid]) {
        delete treeExpandedMaps[rowid]
      }
    })
  }
  if (reserve) {
    validRows.forEach((row: any) => handleTreeExpandReserve($xeTable, row, expanded))
  }
  reactData.treeExpandedFlag++
  return Promise.all(result).then(() => {
    return $xeTable.recalculate()
  })
}

/**
 * 虚拟树的展开与收起
 * @param rows
 * @param expanded
 * @returns
 */
function handleVirtualTreeExpand ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, rows: any[], expanded: boolean) {
  const reactData = $xeTable as unknown as TableReactData

  return handleBaseTreeExpand($xeTable, rows, expanded).then(() => {
    handleVirtualTreeToList($xeTable)
    $xeTable.handleTableData()
    reactData.treeExpandedFlag++
    updateAfterDataIndex($xeTable)
    return $xeTable.$nextTick()
  }).then(() => {
    return $xeTable.recalculate(true)
  }).then(() => {
    setTimeout(() => {
      $xeTable.updateCellAreas()
    }, 30)
  })
}

/**
 * 展开与收起行分组节点
 * @param rows
 * @param expanded
 * @returns
 */
function handleRowGroupBaseExpand ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, rows: any[], expanded: boolean) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { fullAllDataRowIdData, tableFullGroupData, rowGroupExpandedMaps } = internalData
  const aggregateOpts = $xeTable.computeAggregateOpts
  const { mapChildrenField, accordion } = aggregateOpts
  const { handleGetRowId } = createHandleGetRowId($xeTable)
  let validRows = rows
  if (mapChildrenField) {
    if (accordion) {
      validRows = validRows.length ? [validRows[validRows.length - 1]] : []
      // 同一级只能展开一个
      const matchObj = XEUtils.findTree(tableFullGroupData, item => getRowid($xeTable, item) === getRowid($xeTable, validRows[0]), { children: mapChildrenField })
      if (matchObj) {
        matchObj.items.forEach(item => {
          const rowid = handleGetRowId(item)
          if (rowGroupExpandedMaps[rowid]) {
            delete rowGroupExpandedMaps[rowid]
          }
        })
      }
    }
    if (expanded) {
      validRows.forEach((row) => {
        const rowid = handleGetRowId(row)
        if (!rowGroupExpandedMaps[rowid]) {
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            if (row[mapChildrenField] && row[mapChildrenField].length) {
              rowGroupExpandedMaps[rowid] = row
            }
          }
        }
      })
    } else {
      validRows.forEach(item => {
        const rowid = handleGetRowId(item)
        if (rowGroupExpandedMaps[rowid]) {
          delete rowGroupExpandedMaps[rowid]
        }
      })
    }
  }
  reactData.rowGroupExpandedFlag++
  return $xeTable.recalculate()
}

/**
 * 行分组的展开与收起
 * @param rows
 * @param expanded
 * @returns
 */
function handleRowGroupVirtualExpand ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, rows: any[], expanded: boolean) {
  const reactData = $xeTable as unknown as TableReactData

  return handleRowGroupBaseExpand($xeTable, rows, expanded).then(() => {
    handleVirtualTreeToList($xeTable)
    $xeTable.handleTableData()
    reactData.rowGroupExpandedFlag++
    updateAfterDataIndex($xeTable)
    return $xeTable.$nextTick()
  }).then(() => {
    return $xeTable.recalculate(true)
  }).then(() => {
    setTimeout(() => {
      $xeTable.updateCellAreas()
    }, 30)
  })
}

function updateAfterListIndex ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const { afterFullData, fullDataRowIdData, fullAllDataRowIdData } = internalData
  const { handleGetRowId } = createHandleGetRowId($xeTable)
  const fullMaps: Record<string, any> = {}
  afterFullData.forEach((row, index) => {
    const rowid = handleGetRowId(row)
    const rowRest = fullAllDataRowIdData[rowid]
    const seq = index + 1
    if (rowRest) {
      if (!treeConfig) {
        rowRest.seq = seq
      }
      rowRest._index = index
    } else {
      const rest = { row, rowid, seq, index: -1, $index: -1, _index: index, treeIndex: -1, items: [], parent: null, level: 0, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
      fullAllDataRowIdData[rowid] = rest
      fullDataRowIdData[rowid] = rest
    }
    fullMaps[rowid] = row
  })
  internalData.afterFullRowMaps = fullMaps
}

/**
 * 预编译
 * 对渲染中的数据提前解析序号及索引。牺牲提前编译耗时换取渲染中额外损耗，使运行时更加流畅
 */
function updateAfterDataIndex ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const { fullDataRowIdData, fullAllDataRowIdData, afterFullData, afterTreeFullData } = internalData
  const treeOpts = $xeTable.computeTreeOpts
  const { transform } = treeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  const fullMaps: Record<string, any> = {}
  if (treeConfig) {
    const { handleGetRowId } = createHandleGetRowId($xeTable)
    XEUtils.eachTree(afterTreeFullData, (row, index, items, path) => {
      const rowid = handleGetRowId(row)
      const rowRest = fullAllDataRowIdData[rowid]
      const seq = path.map((num, i) => i % 2 === 0 ? (Number(num) + 1) : '.').join('')
      if (rowRest) {
        rowRest.seq = seq
        rowRest.treeIndex = index
      } else {
        const rest = { row, rowid, seq, index: -1, $index: -1, _index: -1, treeIndex: -1, items: [], parent: null, level: 0, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
        fullAllDataRowIdData[rowid] = rest
        fullDataRowIdData[rowid] = rest
      }
      fullMaps[rowid] = row
    }, { children: transform ? treeOpts.mapChildrenField : childrenField })
    if (transform) {
      afterFullData.forEach((row, index) => {
        const rowid = handleGetRowId(row)
        const rowRest = fullAllDataRowIdData[rowid]
        const seq = index + 1
        if (rowRest) {
          if (!treeConfig) {
            rowRest.seq = seq
          }
          rowRest._index = index
        }
      })
    }
    internalData.afterFullRowMaps = fullMaps
  } else {
    updateAfterListIndex($xeTable)
  }
}

/**
 * 如果为虚拟树、行分组、则将树结构拍平
 * @returns
 */
function handleVirtualTreeToList ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const { isRowGroupStatus } = reactData
  const { fullAllDataRowIdData, treeExpandedMaps, rowGroupExpandedMaps } = internalData
  const aggregateOpts = $xeTable.computeAggregateOpts
  const treeOpts = $xeTable.computeTreeOpts
  const { handleGetRowId } = createHandleGetRowId($xeTable)
  const fullData: any[] = []
  const expandMaps: {
    [key: string]: number
  } = {}
  if (treeConfig && treeOpts.transform) {
    const childrenField = treeOpts.children || treeOpts.childrenField
    XEUtils.eachTree(internalData.afterTreeFullData, (row, index, items, path, parentRow) => {
      const rowid = handleGetRowId(row)
      const parentRowid = handleGetRowId(parentRow)
      if (!parentRow || (expandMaps[parentRowid] && treeExpandedMaps[parentRowid])) {
        const rowRest = fullAllDataRowIdData[rowid]
        if (rowRest) {
          rowRest._index = fullData.length
        }
        expandMaps[rowid] = 1
        fullData.push(row)
      }
    }, { children: childrenField })
    internalData.afterFullData = fullData
    updateScrollYStatus($xeTable, fullData)
    return fullData
  } else if (isRowGroupStatus) {
    const { childrenField } = aggregateOpts
    XEUtils.eachTree(internalData.afterGroupFullData, (row, index, items, path, parentRow) => {
      const rowid = handleGetRowId(row)
      const parentRowid = handleGetRowId(parentRow)
      if (!parentRow || (expandMaps[parentRowid] && rowGroupExpandedMaps[parentRowid])) {
        const rowRest = fullAllDataRowIdData[rowid]
        if (rowRest) {
          rowRest._index = fullData.length
        }
        expandMaps[rowid] = 1
        fullData.push(row)
      }
    }, { children: childrenField })
    internalData.afterFullData = fullData
    updateScrollYStatus($xeTable, fullData)
    return fullData
  }
  return internalData.afterFullData
}

/**
 * 编译处理后全量的表格数据
 * 如果存在筛选条件，继续处理
 */
function updateAfterFullData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const { isRowGroupStatus } = reactData
  const { tableFullColumn, tableFullData, tableFullTreeData, tableFullGroupData } = internalData
  const filterOpts = $xeTable.computeFilterOpts
  const sortOpts = $xeTable.computeSortOpts
  const aggregateOpts = $xeTable.computeAggregateOpts
  const treeOpts = $xeTable.computeTreeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  const { transform, rowField, parentField, mapChildrenField } = treeOpts
  const { isEvery, remote: allRemoteFilter, filterMethod: allFilterMethod } = filterOpts
  const { remote: allRemoteSort, sortMethod: allSortMethod, multiple: sortMultiple, chronological } = sortOpts
  let tableData: any[] = []
  let tableTree: any[] = []

  // 处理数据
  if (!allRemoteFilter || !allRemoteSort) {
    const filterColumns: {
      column: VxeTableDefines.ColumnInfo
      valueList: any[]
      itemList: VxeTableDefines.FilterOption[]
    }[] = []
    let orderColumns: VxeTableDefines.SortCheckedParams[] = []
    tableFullColumn.forEach((column) => {
      const { field, sortable, order, filters } = column
      if (!allRemoteFilter && filters && filters.length) {
        const valueList: any[] = []
        const itemList: VxeTableDefines.FilterOption[] = []
        filters.forEach((item) => {
          if (item.checked) {
            itemList.push(item as VxeTableDefines.FilterOption)
            valueList.push(item.value)
          }
        })
        if (itemList.length) {
          filterColumns.push({ column, valueList, itemList })
        }
      }
      if (!allRemoteSort && sortable && order) {
        orderColumns.push({ column, field, property: field, order: order, sortTime: column.sortTime })
      }
    })
    if (sortMultiple && chronological && orderColumns.length > 1) {
      orderColumns = XEUtils.orderBy(orderColumns, 'sortTime')
    }

    // 处理筛选
    // 支持单列、多列、组合筛选
    if (!allRemoteFilter && filterColumns.length) {
      const handleFilter = (row: any) => {
        return filterColumns.every(({ column, valueList, itemList }) => {
          const { filterMethod, filterRender } = column
          const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
          const compFilterMethod = compConf ? (compConf.tableFilterMethod || compConf.filterMethod) : null
          const tdFilterMethod = compConf ? (compConf.tableFilterDefaultMethod || compConf.defaultTableFilterMethod || compConf.defaultFilterMethod) : null
          const cellValue = getCellValue(row, column)
          if (filterMethod) {
            return itemList.some((item) => filterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xeTable }))
          } else if (compFilterMethod) {
            return itemList.some((item) => compFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xeTable }))
          } else if (allFilterMethod) {
            return allFilterMethod({ $table: $xeTable, options: itemList, values: valueList, cellValue, row, column })
          } else if (tdFilterMethod) {
            return itemList.some((item) => tdFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xeTable }))
          }
          return valueList.indexOf(XEUtils.get(row, column.field)) > -1
        })
      }
      if (isRowGroupStatus) {
        // 行分组
        tableTree = XEUtils.searchTree(tableFullGroupData, handleFilter, {
          original: true,
          isEvery: true,
          children: aggregateOpts.mapChildrenField,
          mapChildren: aggregateOpts.childrenField
        })
        tableData = tableTree
      } else if (treeConfig && transform) {
        // 筛选虚拟树
        tableTree = XEUtils.searchTree(tableFullTreeData, handleFilter, {
          original: true,
          isEvery,
          children: mapChildrenField,
          mapChildren: childrenField
        })
        tableData = tableTree
      } else {
        tableData = treeConfig ? tableFullTreeData.filter(handleFilter) : tableFullData.filter(handleFilter)
        tableTree = tableData
      }
    } else {
      if (isRowGroupStatus) {
        // 还原行分组
        tableTree = XEUtils.searchTree(tableFullGroupData, () => true, {
          original: true,
          isEvery: true,
          children: aggregateOpts.mapChildrenField,
          mapChildren: aggregateOpts.childrenField
        })
        tableData = tableTree
      } else if (treeConfig && transform) {
        // 还原虚拟树
        tableTree = XEUtils.searchTree(tableFullTreeData, () => true, {
          original: true,
          isEvery,
          children: mapChildrenField,
          mapChildren: childrenField
        })
        tableData = tableTree
      } else {
        tableData = treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0)
        tableTree = tableData
      }
    }

    // 处理排序
    // 支持单列、多列、组合排序
    if (!allRemoteSort && orderColumns.length) {
      if (isRowGroupStatus) {
        // 行分组的排序
        if (allSortMethod) {
          const sortRests = allSortMethod({ data: tableTree, sortList: orderColumns, $table: $xeTable })
          tableTree = XEUtils.isArray(sortRests) ? sortRests : tableTree
        } else {
          const treeList = XEUtils.toTreeArray(tableTree, {
            key: aggregateOpts.rowField,
            parentKey: aggregateOpts.parentField,
            children: aggregateOpts.mapChildrenField
          })
          tableTree = XEUtils.toArrayTree(
            XEUtils.orderBy(treeList, orderColumns.map(({ column, order }) => [getOrderField($xeTable, column), order])),
            {
              key: aggregateOpts.rowField,
              parentKey: aggregateOpts.parentField,
              children: aggregateOpts.childrenField,
              mapChildren: aggregateOpts.mapChildrenField
            }
          )
        }
        tableData = tableTree
      } else if (treeConfig && transform) {
        // 虚拟树的排序
        if (allSortMethod) {
          const sortRests = allSortMethod({ data: tableTree, sortList: orderColumns, $table: $xeTable })
          tableTree = XEUtils.isArray(sortRests) ? sortRests : tableTree
        } else {
          const treeList = XEUtils.toTreeArray(tableTree, {
            children: mapChildrenField
          })
          tableTree = XEUtils.toArrayTree(
            XEUtils.orderBy(treeList, orderColumns.map(({ column, order }) => [getOrderField($xeTable, column), order])),
            {
              key: rowField,
              parentKey: parentField,
              children: childrenField,
              mapChildren: mapChildrenField
            }
          )
        }
        tableData = tableTree
      } else {
        if (allSortMethod) {
          const sortRests = allSortMethod({ data: tableData, sortList: orderColumns, $table: $xeTable })
          tableData = XEUtils.isArray(sortRests) ? sortRests : tableData
        } else {
          // 兼容 v4
          if (sortMultiple) {
            tableData = XEUtils.orderBy(tableData, orderColumns.map(({ column, order }) => [getOrderField($xeTable, column), order]))
          } else {
            const firstOrderColumn = orderColumns[0]
            let sortByConfs
            // 已废弃，兼容 v2，在 v4 中废弃， sortBy 不能为数组
            if (XEUtils.isArray((firstOrderColumn as any).sortBy)) {
              sortByConfs = (firstOrderColumn as any).sortBy.map((item: any) => [item, firstOrderColumn.order])
            }
            tableData = XEUtils.orderBy(tableData, sortByConfs || [firstOrderColumn].map(({ column, order }) => [getOrderField($xeTable, column), order]))
          }
          tableData = XEUtils.orderBy(tableData, orderColumns.map(({ column, order }) => [getOrderField($xeTable, column), order]))
        }
        tableTree = tableData
      }
    }
  } else {
    if (isRowGroupStatus) {
      // 还原行分组
      // 还原虚拟树
      tableTree = XEUtils.searchTree(tableFullGroupData, () => true, {
        original: true,
        isEvery: true,
        children: aggregateOpts.mapChildrenField,
        mapChildren: aggregateOpts.childrenField
      })
      tableData = tableTree
    } else if (treeConfig && transform) {
      // 还原虚拟树
      tableTree = XEUtils.searchTree(tableFullTreeData, () => true, {
        original: true,
        isEvery,
        children: mapChildrenField,
        mapChildren: childrenField
      })
      tableData = tableTree
    } else {
      tableData = treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0)
      tableTree = tableData
    }
  }
  internalData.afterFullData = tableData
  internalData.afterTreeFullData = tableTree
  internalData.afterGroupFullData = tableTree
  updateAfterDataIndex($xeTable)
}

function updateStyle ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { showHeaderOverflow: allColumnHeaderOverflow, showFooterOverflow: allColumnFooterOverflow, mouseConfig, spanMethod, footerSpanMethod } = props
  const { isGroup, currentRow, tableColumn, scrollXLoad, scrollYLoad, overflowX, scrollbarWidth, overflowY, scrollbarHeight, scrollXWidth, columnStore, editStore, isAllOverflow, expandColumn, isColLoading } = reactData
  const { visibleColumn, tableHeight, headerHeight, footerHeight, elemStore, customHeight, customMinHeight, customMaxHeight } = internalData
  const el = $xeTable.$refs.refElem as HTMLDivElement
  if (!el) {
    return
  }
  const containerList = ['main', 'left', 'right']
  const osbWidth = overflowY ? scrollbarWidth : 0
  const osbHeight = overflowX ? scrollbarHeight : 0
  const emptyPlaceholderElem = $xeTable.$refs.refEmptyPlaceholder as HTMLDivElement
  const mouseOpts = $xeTable.computeMouseOpts
  const expandOpts = $xeTable.computeExpandOpts
  const bodyWrapperElem = getRefElem(elemStore['main-body-wrapper'])
  const bodyTableElem = getRefElem(elemStore['main-body-table'])
  if (emptyPlaceholderElem) {
    emptyPlaceholderElem.style.top = `${headerHeight}px`
    emptyPlaceholderElem.style.height = bodyWrapperElem ? `${bodyWrapperElem.offsetHeight - osbHeight}px` : ''
  }

  let bodyHeight = 0
  let bodyMaxHeight = 0
  const bodyMinHeight = customMinHeight - headerHeight - footerHeight - osbHeight
  if (customMaxHeight) {
    bodyMaxHeight = Math.max(bodyMinHeight, customMaxHeight - headerHeight - footerHeight - osbHeight)
  }
  if (customHeight) {
    bodyHeight = customHeight - headerHeight - footerHeight - osbHeight
  }
  if (!bodyHeight) {
    if (bodyTableElem) {
      bodyHeight = bodyTableElem.clientHeight
    }
  }
  if (bodyHeight) {
    if (bodyMaxHeight) {
      bodyHeight = Math.min(bodyMaxHeight, bodyHeight)
    }
    bodyHeight = Math.max(bodyMinHeight, bodyHeight)
  }

  const scrollbarXToTop = $xeTable.$refs.computeScrollbarXToTop

  const xLeftCornerEl = $xeTable.$refs.refScrollXLeftCornerElem as HTMLDivElement
  const xRightCornerEl = $xeTable.$refs.refScrollXRightCornerElem as HTMLDivElement
  const scrollXVirtualEl = $xeTable.$refs.refScrollXVirtualElem as HTMLDivElement
  if (scrollXVirtualEl) {
    scrollXVirtualEl.style.height = `${osbHeight}px`
    scrollXVirtualEl.style.visibility = overflowX ? 'visible' : 'hidden'
  }
  const xWrapperEl = $xeTable.$refs.refScrollXWrapperElem as HTMLDivElement
  if (xWrapperEl) {
    xWrapperEl.style.left = scrollbarXToTop ? `${osbWidth}px` : ''
    xWrapperEl.style.width = `${el.clientWidth - osbWidth}px`
  }
  if (xLeftCornerEl) {
    xLeftCornerEl.style.width = scrollbarXToTop ? `${osbWidth}px` : ''
    xLeftCornerEl.style.display = scrollbarXToTop ? (overflowX && osbHeight ? 'block' : '') : ''
  }
  if (xRightCornerEl) {
    xRightCornerEl.style.width = scrollbarXToTop ? '' : `${osbWidth}px`
    xRightCornerEl.style.display = scrollbarXToTop ? '' : (overflowX && osbHeight ? 'block' : '')
  }

  const scrollYVirtualEl = $xeTable.$refs.refScrollYVirtualElem as HTMLDivElement
  if (scrollYVirtualEl) {
    scrollYVirtualEl.style.width = `${osbWidth}px`
    scrollYVirtualEl.style.height = `${bodyHeight + headerHeight + footerHeight}px`
    scrollYVirtualEl.style.visibility = overflowY ? 'visible' : 'hidden'
  }
  const yTopCornerEl = $xeTable.$refs.refScrollYTopCornerElem as HTMLDivElement
  if (yTopCornerEl) {
    yTopCornerEl.style.height = `${headerHeight}px`
    yTopCornerEl.style.display = overflowY && headerHeight ? 'block' : ''
  }
  const yWrapperEl = $xeTable.$refs.refScrollYWrapperElem as HTMLDivElement
  if (yWrapperEl) {
    yWrapperEl.style.height = `${bodyHeight}px`
    yWrapperEl.style.top = `${headerHeight}px`
  }
  const yBottomCornerEl = $xeTable.$refs.refScrollYBottomCornerElem as HTMLDivElement
  if (yBottomCornerEl) {
    yBottomCornerEl.style.height = `${footerHeight}px`
    yBottomCornerEl.style.top = `${headerHeight + bodyHeight}px`
    yBottomCornerEl.style.display = overflowY && footerHeight ? 'block' : ''
  }

  const rowExpandEl = $xeTable.$refs.refRowExpandElem as HTMLDivElement
  if (rowExpandEl) {
    rowExpandEl.style.height = `${bodyHeight}px`
    rowExpandEl.style.top = `${headerHeight}px`
  }

  containerList.forEach((name, index) => {
    const fixedType = index > 0 ? name : ''
    const layoutList = ['header', 'body', 'footer']
    const isFixedLeft = fixedType === 'left'
    let fixedColumn: VxeTableDefines.ColumnInfo[] = []
    let fixedWrapperElem: HTMLDivElement
    if (fixedType) {
      fixedColumn = isFixedLeft ? columnStore.leftList : columnStore.rightList
      fixedWrapperElem = (isFixedLeft ? $xeTable.$refs.refLeftContainer : $xeTable.$refs.refRightContainer) as HTMLDivElement
    }
    layoutList.forEach(layout => {
      const wrapperElem = getRefElem(elemStore[`${name}-${layout}-wrapper`])
      const currScrollElem = getRefElem(elemStore[`${name}-${layout}-scroll`])
      const tableElem = getRefElem(elemStore[`${name}-${layout}-table`])
      if (layout === 'header') {
        // 表头体样式处理
        // 横向滚动渲染
        let renderColumnList = tableColumn
        let isOptimizeMode = false

        if (isGroup) {
          renderColumnList = visibleColumn
        } else {
          // 如果是使用优化模式
          if (scrollXLoad && allColumnHeaderOverflow) {
            if (spanMethod || footerSpanMethod) {
              // 如果不支持优化模式
            } else {
              isOptimizeMode = true
            }
          }

          if (!isOptimizeMode || (!isColLoading && (fixedType || !overflowX))) {
            renderColumnList = visibleColumn
          }

          if (fixedType) {
            // 如果是使用优化模式
            if (isOptimizeMode) {
              renderColumnList = fixedColumn || []
            }
          }
        }

        const tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

        if (fixedType) {
          if (isGroup) {
            if (wrapperElem) {
              wrapperElem.style.width = scrollXWidth ? `${scrollXWidth}px` : ''
            }
          } else {
            if (isOptimizeMode) {
              if (wrapperElem) {
                wrapperElem.style.width = tWidth ? `${tWidth}px` : ''
              }
            } else {
              if (wrapperElem) {
                wrapperElem.style.width = scrollXWidth ? `${scrollXWidth}px` : ''
              }
            }
          }
        }

        if (currScrollElem) {
          currScrollElem.style.height = `${headerHeight}px`
        }

        if (tableElem) {
          tableElem.style.width = tWidth ? `${tWidth}px` : ''
        }
      } else if (layout === 'body') {
        if (currScrollElem) {
          currScrollElem.style.maxHeight = customMaxHeight ? `${bodyMaxHeight}px` : ''
          currScrollElem.style.height = customHeight ? `${bodyHeight}px` : ''
          currScrollElem.style.minHeight = `${bodyMinHeight}px`
        }

        // 如果是固定列
        if (fixedWrapperElem) {
          if (wrapperElem) {
            wrapperElem.style.top = `${headerHeight}px`
          }
          fixedWrapperElem.style.height = `${customHeight > 0 ? customHeight : (tableHeight + headerHeight + footerHeight + osbHeight)}px`
          fixedWrapperElem.style.width = `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, 0)}px`
        }

        let renderColumnList = tableColumn

        let isOptimizeMode = false
        // 如果是使用优化模式
        if (scrollXLoad || scrollYLoad || isAllOverflow) {
          if ((expandColumn && expandOpts.mode !== 'fixed') || spanMethod || footerSpanMethod) {
            // 如果不支持优化模式
          } else {
            isOptimizeMode = true
          }
        }

        if (fixedType) {
          renderColumnList = visibleColumn
          if (isOptimizeMode) {
            renderColumnList = fixedColumn || []
          }
        }

        const tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

        if (fixedType) {
          if (isOptimizeMode) {
            if (wrapperElem) {
              wrapperElem.style.width = tWidth ? `${tWidth}px` : ''
            }
          } else {
            if (wrapperElem) {
              wrapperElem.style.width = scrollXWidth ? `${scrollXWidth}px` : ''
            }
          }
        }

        if (tableElem) {
          tableElem.style.width = tWidth ? `${tWidth}px` : ''
          // 兼容性处理
          tableElem.style.paddingRight = osbWidth && fixedType && (browseObj.firefox || browseObj.safari) ? `${osbWidth}px` : ''
        }
        const emptyBlockElem = getRefElem(elemStore[`${name}-${layout}-emptyBlock`])
        if (emptyBlockElem) {
          emptyBlockElem.style.width = tWidth ? `${tWidth}px` : ''
        }
      } else if (layout === 'footer') {
        let renderColumnList = tableColumn
        let isOptimizeMode = false
        // 如果是使用优化模式
        if (scrollXLoad && allColumnFooterOverflow) {
          if (spanMethod || footerSpanMethod) {
            // 如果不支持优化模式
          } else {
            isOptimizeMode = true
          }
        }

        if (!isOptimizeMode || (!isColLoading && (fixedType || !overflowX))) {
          renderColumnList = visibleColumn
        }

        if (fixedType) {
          if (isOptimizeMode) {
            renderColumnList = fixedColumn || []
          }
        }

        const tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

        if (fixedType) {
          if (isOptimizeMode) {
            if (wrapperElem) {
              wrapperElem.style.width = tWidth ? `${tWidth}px` : ''
            }
          } else {
            if (wrapperElem) {
              wrapperElem.style.width = scrollXWidth ? `${scrollXWidth}px` : ''
            }
          }
        }

        if (currScrollElem) {
          currScrollElem.style.height = `${footerHeight}px`
          // 如果是固定列
          if (fixedWrapperElem) {
            if (wrapperElem) {
              wrapperElem.style.top = `${customHeight > 0 ? customHeight - footerHeight - osbHeight : tableHeight + headerHeight}px`
            }
          }
        }
        if (tableElem) {
          tableElem.style.width = tWidth ? `${tWidth}px` : ''
        }
      }
    })
  })
  if (currentRow) {
    $xeTable.setCurrentRow(currentRow)
  }
  if (mouseConfig && mouseOpts.selected && editStore.selected.row && editStore.selected.column) {
    $xeTable.addCellSelectedClass()
  }
  return $xeTable.$nextTick()
}

function checkValidate ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, type: any) {
  if ($xeTable.triggerValidate) {
    return $xeTable.triggerValidate(type)
  }
  return $xeTable.$nextTick()
}

/**
 * 当单元格发生改变时
 * 如果存在规则，则校验
 */
function handleChangeCell ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: Event, params: any) {
  checkValidate($xeTable, 'blur')
    .catch((e: any) => e)
    .then(() => {
      $xeTable.handleEdit(params, evnt)
        .then(() => checkValidate($xeTable, 'change'))
        .catch((e: any) => e)
    })
}

function handleDefaultSort ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable

  const { sortConfig } = props
  if (sortConfig) {
    const sortOpts = $xeTable.computeSortOpts
    let { defaultSort } = sortOpts
    if (defaultSort) {
      if (!XEUtils.isArray(defaultSort)) {
        defaultSort = [defaultSort]
      }
      if (defaultSort.length) {
        (sortConfig.multiple ? defaultSort : defaultSort.slice(0, 1)).forEach((item: any, index: number) => {
          const { field, order } = item
          if (field && order) {
            const column = $xeTable.getColumnByField(field)
            if (column && column.sortable) {
              column.order = order
              column.sortTime = Date.now() + index
            }
          }
        })
        if (!sortOpts.remote) {
          $xeTable.handleTableData(true).then(updateStyle)
        }
      }
    }
  }
}

/**
 * 处理默认勾选
 */
function handleDefaultSelectionChecked ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const internalData = $xeTable as unknown as TableInternalData

  const { checkboxConfig } = props
  if (checkboxConfig) {
    const { fullDataRowIdData } = internalData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkAll, checkRowKeys } = checkboxOpts
    if (checkAll) {
      handleCheckedAllCheckboxRow($xeTable, true, true)
    } else if (checkRowKeys) {
      const defSelection: any[] = []
      checkRowKeys.forEach((rowid: any) => {
        if (fullDataRowIdData[rowid]) {
          defSelection.push(fullDataRowIdData[rowid].row)
        }
      })
      handleCheckedCheckboxRow($xeTable, defSelection, true, true)
    }
  }
}

/**
 * 处理单选框默认勾选
 */
function handleDefaultRadioChecked ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const internalData = $xeTable as unknown as TableInternalData

  const { radioConfig } = props
  if (radioConfig) {
    const { fullDataRowIdData } = internalData
    const radioOpts = $xeTable.computeRadioOpts
    const { checkRowKey: rowid, reserve } = radioOpts
    if (rowid) {
      if (fullDataRowIdData[rowid]) {
        handleCheckedRadioRow(fullDataRowIdData[rowid].row, true)
      }
      if (reserve) {
        const rowkey = getRowkey($xeTable)
        internalData.radioReserveRow = { [rowkey]: rowid }
      }
    }
  }
}

/**
 * 处理默认展开行
 */
function handleDefaultRowExpand ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const internalData = $xeTable as unknown as TableInternalData

  const { expandConfig } = props
  if (expandConfig) {
    const { fullDataRowIdData } = internalData
    const expandOpts = $xeTable.computeExpandOpts
    const { expandAll, expandRowKeys } = expandOpts
    if (expandAll) {
      $xeTable.setAllRowExpand(true)
    } else if (expandRowKeys) {
      const defExpandeds: any[] = []
      expandRowKeys.forEach((rowid: any) => {
        if (fullDataRowIdData[rowid]) {
          defExpandeds.push(fullDataRowIdData[rowid].row)
        }
      })
      $xeTable.setRowExpand(defExpandeds, true)
    }
  }
}

function handleRadioReserveRow ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, row: any) {
  const internalData = $xeTable as unknown as TableInternalData

  const radioOpts = $xeTable.computeRadioOpts
  if (radioOpts.reserve) {
    internalData.radioReserveRow = row
  }
}

function handleCheckboxReserveRow ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, row: any, checked: boolean) {
  const internalData = $xeTable as unknown as TableInternalData

  const { checkboxReserveRowMap } = internalData
  const checkboxOpts = $xeTable.computeCheckboxOpts
  if (checkboxOpts.reserve) {
    const rowid = getRowid($xeTable, row)
    if (checked) {
      checkboxReserveRowMap[rowid] = row
    } else if (checkboxReserveRowMap[rowid]) {
      delete checkboxReserveRowMap[rowid]
    }
  }
}

function handleCheckedRadioRow ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, row: any, isForce?: boolean) {
  const reactData = $xeTable as unknown as TableReactData

  const radioOpts = $xeTable.computeRadioOpts
  const { checkMethod } = radioOpts
  if (row && (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row })))) {
    reactData.selectRadioRow = row
    handleRadioReserveRow($xeTable, row)
  }
  return $xeTable.$nextTick()
}

function handleCheckedCheckboxRow ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, rows: any[], value: boolean, isForce?: boolean) {
  if (rows && !XEUtils.isArray(rows)) {
    rows = [rows]
  }
  $xeTable.handleBatchSelectRows(rows, !!value, isForce)
  $xeTable.checkSelectionStatus()
  return $xeTable.$nextTick()
}

function handleCheckedAllCheckboxRow ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, checked: boolean, isForce?: boolean) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const { isRowGroupStatus } = reactData
  const { afterFullData, afterTreeFullData, afterGroupFullData, checkboxReserveRowMap, selectCheckboxMaps } = internalData
  const treeOpts = $xeTable.computeTreeOpts
  const aggregateOpts = $xeTable.computeAggregateOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  const checkboxOpts = $xeTable.computeCheckboxOpts
  const { checkField, reserve, checkMethod } = checkboxOpts
  const { handleGetRowId } = createHandleGetRowId($xeTable)
  // indeterminateField 仅支持读取
  const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
  const selectRowMaps: Record<string, any> = {}

  /**
   * 绑定属性方式（有污染）
   * 必须在行数据存在对应的属性，否则将不响应
   */
  if (checkField) {
    const checkValFn = (row: any) => {
      if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
        if (checked) {
          selectRowMaps[handleGetRowId(row)] = row
        }
        XEUtils.set(row, checkField, checked)
      }
      if ((treeConfig || isRowGroupStatus) && indeterminateField) {
        XEUtils.set(row, indeterminateField, false)
      }
    }
    // 如果存在选中方法
    // 如果方法成立，则更新值，否则忽略该数据
    if ((treeConfig || isRowGroupStatus)) {
      XEUtils.eachTree(afterFullData, checkValFn, { children: childrenField })
    } else {
      afterFullData.forEach(checkValFn)
    }
  } else {
    /**
     * 默认方式（无污染）
     * 无需任何属性，直接绑定
     */
    if (isRowGroupStatus) {
      if (checked) {
        /**
         * 如果是行分组勾选
         * 如果方法成立，则添加到临时集合中
         */
        XEUtils.eachTree(afterGroupFullData, (row) => {
          if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
            const rowid = handleGetRowId(row)
            selectRowMaps[rowid] = row
          }
        }, { children: aggregateOpts.mapChildrenField })
      } else {
        /**
         * 如果是树取消
         * 如果方法成立，则不添加到临时集合中
         */
        if (!isForce && checkMethod) {
          XEUtils.eachTree(afterGroupFullData, (row) => {
            const rowid = handleGetRowId(row)
            if (checkMethod({ $table: $xeTable, row }) ? false : selectCheckboxMaps[rowid]) {
              selectRowMaps[rowid] = row
            }
          }, { children: aggregateOpts.mapChildrenField })
        }
      }
    } else if (treeConfig) {
      if (checked) {
        /**
         * 如果是树勾选
         * 如果方法成立，则添加到临时集合中
         */
        XEUtils.eachTree(afterTreeFullData, (row) => {
          if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
            const rowid = handleGetRowId(row)
            selectRowMaps[rowid] = row
          }
        }, { children: childrenField })
      } else {
        /**
         * 如果是树取消
         * 如果方法成立，则不添加到临时集合中
         */
        if (!isForce && checkMethod) {
          XEUtils.eachTree(afterTreeFullData, (row) => {
            const rowid = handleGetRowId(row)
            if (checkMethod({ $table: $xeTable, row }) ? false : selectCheckboxMaps[rowid]) {
              selectRowMaps[rowid] = row
            }
          }, { children: childrenField })
        }
      }
    } else {
      if (checked) {
        /**
         * 如果是行勾选
         * 如果存在选中方法且成立或者本身已勾选，则添加到临时集合中
         * 如果不存在选中方法，则添加所有数据到临时集合中
         */
        if (!isForce && checkMethod) {
          afterFullData.forEach((row) => {
            const rowid = handleGetRowId(row)
            if (selectCheckboxMaps[rowid] || checkMethod({ $table: $xeTable, row })) {
              selectRowMaps[rowid] = row
            }
          })
        } else {
          afterFullData.forEach(row => {
            const rowid = handleGetRowId(row)
            selectRowMaps[rowid] = row
          })
        }
      } else {
        /**
         * 如果是行取消
         * 如果方法成立，则不添加到临时集合中；如果方法不成立则判断当前是否已勾选，如果已被勾选则添加到新集合中
         * 如果不存在选中方法，无需处理，临时集合默认为空
         */
        if (!isForce && checkMethod) {
          afterFullData.forEach((row) => {
            const rowid = handleGetRowId(row)
            if (checkMethod({ $table: $xeTable, row }) ? false : selectCheckboxMaps[rowid]) {
              selectRowMaps[rowid] = row
            }
          })
        }
      }
    }
  }
  if (reserve) {
    if (checked) {
      XEUtils.each(selectRowMaps, (row, rowid) => {
        checkboxReserveRowMap[rowid] = row
      })
    } else {
      afterFullData.forEach((row) => handleCheckboxReserveRow($xeTable, row, false))
    }
  }
  reactData.updateCheckboxFlag++
  internalData.selectCheckboxMaps = checkField ? {} : selectRowMaps

  reactData.isAllSelected = checked
  reactData.isIndeterminate = false
  internalData.treeIndeterminateRowMaps = {}
  $xeTable.checkSelectionStatus()
  return $xeTable.$nextTick()
}

// 还原展开、选中等相关状态
function handleReserveStatus ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const { expandColumn, currentRow, selectRadioRow } = reactData
  const { fullDataRowIdData, fullAllDataRowIdData, radioReserveRow, selectCheckboxMaps, treeExpandedMaps, rowExpandedMaps } = internalData
  const expandOpts = $xeTable.computeExpandOpts
  const treeOpts = $xeTable.computeTreeOpts
  const radioOpts = $xeTable.computeRadioOpts
  const checkboxOpts = $xeTable.computeCheckboxOpts
  // 单选框
  if (selectRadioRow && !fullAllDataRowIdData[getRowid($xeTable, selectRadioRow)]) {
    reactData.selectRadioRow = null // 刷新单选行状态
  }
  // 还原保留选中状态
  if (radioOpts.reserve && radioReserveRow) {
    const rowid = getRowid($xeTable, radioReserveRow)
    if (fullDataRowIdData[rowid]) {
      handleCheckedRadioRow($xeTable, fullDataRowIdData[rowid].row, true)
    }
  }
  // 复选框
  internalData.selectCheckboxMaps = getRecoverRowMaps($xeTable, selectCheckboxMaps) // 刷新多选行状态
  reactData.updateCheckboxFlag++
  // 还原保留选中状态
  if (checkboxOpts.reserve) {
    handleCheckedCheckboxRow($xeTable, handleReserveRow($xeTable, internalData.checkboxReserveRowMap), true, true)
  }
  if (currentRow && !fullAllDataRowIdData[getRowid($xeTable, currentRow)]) {
    reactData.currentRow = null // 刷新当前行状态
  }
  // 行展开
  internalData.rowExpandedMaps = expandColumn ? getRecoverRowMaps($xeTable, rowExpandedMaps) : {} // 刷新行展开状态
  reactData.rowExpandedFlag++
  // 还原保留状态
  if (expandColumn && expandOpts.reserve) {
    $xeTable.setRowExpand(handleReserveRow($xeTable, internalData.rowExpandedReserveRowMap), true)
  }
  // 树展开
  internalData.treeExpandedMaps = treeConfig ? getRecoverRowMaps($xeTable, treeExpandedMaps) : {} // 刷新树展开状态
  reactData.treeExpandedFlag++
  if (treeConfig && treeOpts.reserve) {
    $xeTable.setTreeExpand(handleReserveRow($xeTable, internalData.treeExpandedReserveRowMap), true)
  }
}

/**
 * 处理默认展开树节点
 */
const handleDefaultTreeExpand = ($xeTable: VxeTableConstructor) => {
  const props = $xeTable
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  if (treeConfig) {
    const { tableFullData } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const { expandAll, expandRowKeys } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    if (expandAll) {
      $xeTable.setAllTreeExpand(true)
    } else if (expandRowKeys) {
      const defExpandeds: any[] = []
      const rowkey = getRowkey($xeTable)
      expandRowKeys.forEach((rowid: any) => {
        const matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), { children: childrenField })
        if (matchObj) {
          defExpandeds.push(matchObj.item)
        }
      })
      $xeTable.setTreeExpand(defExpandeds, true)
    }
  }
}

const handleAsyncTreeExpandChilds = ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, row: any): Promise<void> => {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const treeOpts = $xeTable.computeTreeOpts
  const checkboxOpts = $xeTable.computeCheckboxOpts
  const { transform, loadMethod } = treeOpts
  const { checkStrictly } = checkboxOpts
  return new Promise<void>(resolve => {
    if (loadMethod) {
      const { fullAllDataRowIdData, treeExpandLazyLoadedMaps } = internalData
      const rowid = getRowid($xeTable, row)
      const rowRest = fullAllDataRowIdData[rowid]
      treeExpandLazyLoadedMaps[rowid] = row
      Promise.resolve(
        loadMethod({ $table: $xeTable, row })
      ).then((childRecords: any) => {
        if (rowRest) {
          rowRest.treeLoaded = true
        }
        if (treeExpandLazyLoadedMaps[rowid]) {
          delete treeExpandLazyLoadedMaps[rowid]
        }
        if (!XEUtils.isArray(childRecords)) {
          childRecords = []
        }
        if (childRecords) {
          return $xeTable.loadTreeChildren(row, childRecords).then(childRows => {
            const { treeExpandedMaps } = internalData
            if (childRows.length && !treeExpandedMaps[rowid]) {
              treeExpandedMaps[rowid] = row
            }
            reactData.treeExpandedFlag++
            // 如果当前节点已选中，则展开后子节点也被选中
            if (!checkStrictly && $xeTable.isCheckedByCheckboxRow(row)) {
              handleCheckedCheckboxRow($xeTable, childRows, true)
            }
            return $xeTable.$nextTick().then(() => {
              if (transform) {
                $xeTable.handleTableData()
                updateAfterDataIndex($xeTable)
                return $xeTable.$nextTick()
              }
            })
          })
        }
      }).catch(() => {
        const { treeExpandLazyLoadedMaps } = internalData
        if (rowRest) {
          rowRest.treeLoaded = false
        }
        if (treeExpandLazyLoadedMaps[rowid]) {
          delete treeExpandLazyLoadedMaps[rowid]
        }
      }).finally(() => {
        reactData.treeExpandedFlag++
        $xeTable.$nextTick().then(() => $xeTable.recalculate()).then(() => resolve())
      })
    } else {
      resolve()
    }
  })
}

const handleTreeExpandReserve = ($xeTable: VxeTableConstructor, row: any, expanded: boolean) => {
  const internalData = $xeTable as unknown as TableInternalData

  const { treeExpandedReserveRowMap } = internalData
  const treeOpts = $xeTable.computeTreeOpts
  if (treeOpts.reserve) {
    const rowid = getRowid($xeTable, row)
    if (expanded) {
      treeExpandedReserveRowMap[rowid] = row
    } else if (treeExpandedReserveRowMap[rowid]) {
      delete treeExpandedReserveRowMap[rowid]
    }
  }
}

const handleAsyncRowExpand = ($xeTable: VxeTableConstructor, row: any): Promise<void> => {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  return new Promise<void>(resolve => {
    const expandOpts = $xeTable.computeExpandOpts
    const { loadMethod } = expandOpts
    if (loadMethod) {
      const { fullAllDataRowIdData, rowExpandLazyLoadedMaps } = internalData
      const rowid = getRowid($xeTable, row)
      const rowRest = fullAllDataRowIdData[rowid]
      rowExpandLazyLoadedMaps[rowid] = row
      loadMethod({ $table: $xeTable, row, rowIndex: $xeTable.getRowIndex(row), $rowIndex: $xeTable.getVMRowIndex(row) }).then(() => {
        const { rowExpandedMaps } = internalData
        if (rowRest) {
          rowRest.expandLoaded = true
        }
        rowExpandedMaps[rowid] = row
        reactData.rowExpandedFlag++
      }).catch(() => {
        if (rowRest) {
          rowRest.expandLoaded = false
        }
      }).finally(() => {
        const { rowExpandLazyLoadedMaps } = internalData
        if (rowExpandLazyLoadedMaps[rowid]) {
          delete rowExpandLazyLoadedMaps[rowid]
        }
        reactData.rowExpandedFlag++
        $xeTable.$nextTick()
          .then(() => $xeTable.recalculate())
          .then(() => $xeTable.updateCellAreas())
          .then(() => resolve())
      })
    } else {
      resolve()
    }
  })
}

function calcVarRowHeightConfig ($xeTable: VxeTableConstructor, sizeKey: 'default' | 'medium' | 'small' | 'mini', sizeEl: Element) {
  const reactData = $xeTable as unknown as TableReactData

  const { rowHeightStore } = reactData
  if (sizeEl && sizeEl.clientHeight) {
    rowHeightStore[sizeKey] = sizeEl.clientHeight
  }
}

function computeRowHeight ($xeTable: VxeTableConstructor) {
  const reactData = $xeTable as unknown as TableReactData

  const { isAllOverflow } = reactData
  const tableHeader = $xeTable.$refs.refTableHeader
  const tableBody = $xeTable.$refs.refTableBody
  const tableBodyElem = tableBody ? (tableBody as any).$el as HTMLDivElement : null
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
  let rowHeight = 0
  if (isAllOverflow) {
    if (tableBodyElem) {
      const tableHeaderElem = tableHeader ? (tableHeader as any).$el as HTMLDivElement : null
      let firstTrElem
      firstTrElem = tableBodyElem.querySelector('tr')
      if (!firstTrElem && tableHeaderElem) {
        firstTrElem = tableHeaderElem.querySelector('tr')
      }
      if (firstTrElem) {
        rowHeight = firstTrElem.clientHeight
      }
    }
    if (!rowHeight) {
      rowHeight = defaultRowHeight
    }
  } else {
    rowHeight = defaultRowHeight
  }
  // 最低支持 18px 行高
  return Math.max(18, rowHeight)
}

function handleVirtualYVisible ($xeTable: VxeTableConstructor) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { isAllOverflow, expandColumn, isScrollYBig, scrollYHeight } = reactData
  const { elemStore, isResizeCellHeight, afterFullData, fullAllDataRowIdData } = internalData
  const rowOpts = $xeTable.computeRowOpts
  const cellOpts = $xeTable.computeCellOpts
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
  const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
  if (bodyScrollElem) {
    const clientHeight = bodyScrollElem.clientHeight
    let scrollTop = bodyScrollElem.scrollTop
    if (isScrollYBig) {
      scrollTop = Math.ceil((scrollYHeight - clientHeight) * Math.min(1, (scrollTop / (maxYHeight - clientHeight))))
    }
    const startTop = scrollTop
    const endTop = scrollTop + clientHeight
    let toVisibleIndex = -1
    let visibleSize = 0
    const isCustomCellHeight = isResizeCellHeight || cellOpts.height || rowOpts.height
    if (!isCustomCellHeight && !expandColumn && isAllOverflow) {
      toVisibleIndex = Math.floor(startTop / defaultRowHeight) - 1
      visibleSize = Math.ceil(clientHeight / defaultRowHeight) + 1
    } else {
      const { handleGetRowId } = createHandleGetRowId($xeTable)
      let leftIndex = 0
      let rightIndex = afterFullData.length
      while (leftIndex < rightIndex) {
        const rIndex = Math.floor((leftIndex + rightIndex) / 2)
        const row = afterFullData[rIndex]
        const rowid = handleGetRowId(row)
        const rowRest = fullAllDataRowIdData[rowid] || {}
        if (rowRest.oTop <= startTop) {
          leftIndex = rIndex + 1
        } else {
          rightIndex = rIndex
        }
      }
      toVisibleIndex = leftIndex === afterFullData.length ? leftIndex : Math.max(0, leftIndex < afterFullData.length ? leftIndex - 2 : 0)
      for (let rIndex = toVisibleIndex, rLen = afterFullData.length; rIndex < rLen; rIndex++) {
        const row = afterFullData[rIndex]
        const rowid = handleGetRowId(row)
        const rowRest = fullAllDataRowIdData[rowid] || {}
        visibleSize++
        if (rowRest.oTop > endTop || visibleSize >= 100) {
          break
        }
      }
    }
    return { toVisibleIndex: Math.max(0, toVisibleIndex), visibleSize: Math.max(6, visibleSize) }
  }
  return { toVisibleIndex: 0, visibleSize: 6 }
}

function calculateMergerOffsetIndex (list: any, offsetItem: any, type: any) {
  for (let mcIndex = 0, len = list.length; mcIndex < len; mcIndex++) {
    const mergeItem = list[mcIndex]
    const { startIndex, endIndex } = offsetItem
    const mergeStartIndex = mergeItem[type]
    const mergeSpanNumber = mergeItem[type + 'span']
    const mergeEndIndex = mergeStartIndex + mergeSpanNumber
    if (mergeStartIndex < startIndex && startIndex < mergeEndIndex) {
      offsetItem.startIndex = mergeStartIndex
    }
    if (mergeStartIndex < endIndex && endIndex < mergeEndIndex) {
      offsetItem.endIndex = mergeEndIndex
    }
    if (offsetItem.startIndex !== startIndex || offsetItem.endIndex !== endIndex) {
      mcIndex = -1
    }
  }
}

function buildMergeData (mergeConfigs: VxeTableDefines.MergeItem[]) {
  const mergeMaps: Record<string, VxeTableDefines.MergeCacheItem> = {}
  if (mergeConfigs && mergeConfigs.length) {
    for (let mIndex = 0; mIndex < mergeConfigs.length; mIndex++) {
      const { row: _rowIndex, col: _columnIndex, rowspan: mergeRowspan, colspan: mergeColspan } = mergeConfigs[mIndex]
      for (let i = 0; i < mergeRowspan; i++) {
        for (let j = 0; j < mergeColspan; j++) {
          mergeMaps[`${_rowIndex + i}:${_columnIndex + j}`] = !i && !j
            ? {
                rowspan: mergeRowspan,
                colspan: mergeColspan
              }
            : {
                rowspan: 0,
                colspan: 0
              }
        }
      }
    }
  }
  return mergeMaps
}

const handleBodyMerge = ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]) => {
  const internalData = $xeTable as unknown as TableInternalData

  const { fullAllDataRowIdData, fullColumnIdData, visibleColumn, afterFullData, mergeBodyList, mergeBodyMaps } = internalData
  if (merges) {
    const { handleGetRowId } = createHandleGetRowId($xeTable)
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    merges.forEach((item) => {
      let { row, col, rowspan, colspan } = item
      let mergeRowIndex = -1
      let mergeColumnIndex = -1
      if (XEUtils.isNumber(row)) {
        mergeRowIndex = row
      } else {
        const rowid = row ? handleGetRowId(row) : null
        const rowRest = rowid ? fullAllDataRowIdData[rowid] : null
        if (rowRest) {
          mergeRowIndex = rowRest._index
        }
      }
      if (XEUtils.isNumber(col)) {
        mergeColumnIndex = col
      } else {
        const colid = col ? col.id : null
        const colRest = colid ? fullColumnIdData[colid] : null
        if (colRest) {
          mergeColumnIndex = colRest._index
        }
      }
      if (mergeRowIndex > -1 && mergeColumnIndex > -1 && (rowspan || colspan)) {
        rowspan = XEUtils.toNumber(rowspan) || 1
        colspan = XEUtils.toNumber(colspan) || 1
        if (rowspan > 1 || colspan > 1) {
          const row = afterFullData[mergeRowIndex]
          const column = visibleColumn[mergeColumnIndex]
          let mergeItem = mergeBodyMaps[`${mergeRowIndex}:${mergeColumnIndex}`]
          if (mergeItem) {
            mergeItem.rowspan = rowspan
            mergeItem.colspan = colspan
            mergeItem._rowspan = rowspan
            mergeItem._colspan = colspan
          } else {
            mergeItem = {
              row: mergeRowIndex,
              col: mergeColumnIndex,
              rowspan,
              colspan,
              _row: row,
              _col: column,
              _rowspan: rowspan,
              _colspan: colspan
            }
            mergeBodyMaps[`${mergeRowIndex}:${mergeColumnIndex}`] = mergeItem
            mergeBodyList.push(mergeItem)
          }
        }
      }
    })
  }
}

const handleFooterMerge = ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]) => {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { footerTableData } = reactData
  const { mergeFooterList, mergeFooterMaps, fullColumnIdData } = internalData
  if (merges) {
    const { visibleColumn } = internalData
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    merges.forEach((item) => {
      let { row: margeRow, col: margeCol, rowspan, colspan } = item
      const mergeRowIndex = XEUtils.isNumber(margeRow) ? margeRow : -1
      let mergeColumnIndex = -1
      if (XEUtils.isNumber(margeCol)) {
        mergeColumnIndex = margeCol
      } else {
        const colid = margeCol ? margeCol.id : null
        const colRest = colid ? fullColumnIdData[colid] : null
        if (colRest) {
          mergeColumnIndex = colRest._index
        }
      }
      if (mergeRowIndex > -1 && mergeColumnIndex > -1 && (rowspan || colspan)) {
        rowspan = XEUtils.toNumber(rowspan) || 1
        colspan = XEUtils.toNumber(colspan) || 1
        if (rowspan > 1 || colspan > 1) {
          const row = footerTableData[mergeRowIndex]
          const column = visibleColumn[mergeColumnIndex]
          let mergeItem = mergeFooterMaps[`${mergeRowIndex}:${mergeColumnIndex}`]
          if (mergeItem) {
            mergeItem.rowspan = rowspan
            mergeItem.colspan = colspan
            mergeItem._rowspan = rowspan
            mergeItem._colspan = colspan
          } else {
            mergeItem = {
              row: mergeRowIndex,
              col: mergeColumnIndex,
              rowspan,
              colspan,
              _row: row,
              _col: column,
              _rowspan: rowspan,
              _colspan: colspan
            }
            mergeFooterMaps[`${mergeRowIndex}:${mergeColumnIndex}`] = mergeItem
            mergeFooterList.push(mergeItem)
          }
        }
      }
    })
  }
}

function removeBodyMerges ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]) {
  const internalData = $xeTable as unknown as TableInternalData

  const { mergeBodyList, fullColumnIdData, fullAllDataRowIdData, mergeBodyMaps } = internalData
  const rest: VxeTableDefines.MergeItem[] = []
  if (merges) {
    const { handleGetRowId } = createHandleGetRowId($xeTable)
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    merges.forEach((item) => {
      const { row: margeRow, col: margeCol } = item
      let mergeRowIndex = -1
      let mergeColumnIndex = -1
      if (XEUtils.isNumber(margeRow)) {
        mergeRowIndex = margeRow
      } else {
        const rowid = margeRow ? handleGetRowId(margeRow) : null
        const rowRest = rowid ? fullAllDataRowIdData[rowid] : null
        if (rowRest) {
          mergeRowIndex = rowRest._index
        }
      }
      if (XEUtils.isNumber(margeCol)) {
        mergeColumnIndex = margeCol
      } else {
        const colid = margeCol ? margeCol.id : null
        const colRest = colid ? fullColumnIdData[colid] : null
        if (colRest) {
          mergeColumnIndex = colRest._index
        }
      }
      const mcIndex = XEUtils.findIndexOf(mergeBodyList, item => (item.row === mergeRowIndex) && (item.col === mergeColumnIndex))
      if (mcIndex > -1) {
        const rItems = mergeBodyList.splice(mcIndex, 1)
        const item = rItems[0]
        if (item) {
          rest.push(rItems[0])
          if (mergeBodyMaps[`${mergeRowIndex}:${mergeColumnIndex}`]) {
            delete mergeBodyMaps[`${mergeRowIndex}:${mergeColumnIndex}`]
          }
        }
      }
    })
  }
  return rest
}

function removeFooterMerges ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]) {
  const internalData = $xeTable as unknown as TableInternalData

  const { mergeFooterList, fullColumnIdData, mergeFooterMaps } = internalData
  const rest: VxeTableDefines.MergeItem[] = []
  if (merges) {
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    merges.forEach((item) => {
      const { row: margeRow, col: margeCol } = item
      const mergeRowIndex = XEUtils.isNumber(margeRow) ? margeRow : -1
      let mergeColumnIndex = -1
      if (XEUtils.isNumber(margeCol)) {
        mergeColumnIndex = margeCol
      } else {
        const colid = margeCol ? margeCol.id : null
        const colRest = colid ? fullColumnIdData[colid] : null
        if (colRest) {
          mergeColumnIndex = colRest._index
        }
      }
      const mcIndex = XEUtils.findIndexOf(mergeFooterList, item => item.row === mergeRowIndex && item.col === mergeColumnIndex)
      if (mcIndex > -1) {
        const rItems = mergeFooterList.splice(mcIndex, 1)
        const item = rItems[0]
        if (item) {
          rest.push(item)
          if (mergeFooterMaps[`${mergeRowIndex}:${mergeColumnIndex}`]) {
            delete mergeFooterMaps[`${mergeRowIndex}:${mergeColumnIndex}`]
          }
        }
      }
    })
  }
  return rest
}

function handleSortEvent ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: Event | null, sortConfs: VxeTableDefines.SortConfs | VxeTableDefines.SortConfs[], isUpdate?: boolean) {
  const sortOpts = $xeTable.computeSortOpts
  const { multiple, remote, orders } = sortOpts
  if (!XEUtils.isArray(sortConfs)) {
    sortConfs = [sortConfs]
  }
  if (sortConfs && sortConfs.length) {
    if (!multiple) {
      sortConfs = [sortConfs[0]]
      clearAllSort($xeTable)
    }
    let firstColumn: any = null
    sortConfs.forEach((confs: any, index: number) => {
      let { field, order } = confs
      let column = field
      if (XEUtils.isString(field)) {
        column = $xeTable.getColumnByField(field)
      }
      if (!firstColumn) {
        firstColumn = column
      }
      if (column && column.sortable) {
        if (orders && orders.indexOf(order) === -1) {
          order = getNextSortOrder($xeTable, column)
        }
        if (column.order !== order) {
          column.order = order
        }
        column.sortTime = Date.now() + index
      }
    })
    if (isUpdate) {
      if (!remote) {
        $xeTable.handleTableData(true)
      }
    }
    if (evnt) {
      $xeTable.handleColumnSortEvent(evnt, firstColumn)
    }
    return $xeTable.$nextTick().then(() => {
      updateRowOffsetTop($xeTable)
      $xeTable.updateCellAreas()
      return updateStyle($xeTable)
    })
  }
  return $xeTable.$nextTick()
}

function clearAllSort ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const { tableFullColumn } = internalData
  tableFullColumn.forEach((column: any) => {
    column.order = null
  })
}

function calcTableHeight ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, key: 'height' | 'minHeight' | 'maxHeight') {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData

  const { parentHeight } = reactData
  const val = props[key]
  let num = 0
  if (val) {
    if (val === '100%' || val === 'auto') {
      num = parentHeight
    } else {
      const excludeHeight = $xeTable.getExcludeHeight()
      if (isScale(val)) {
        num = Math.floor((XEUtils.toInteger(val) || 1) / 100 * parentHeight)
      } else {
        num = XEUtils.toNumber(val)
      }
      num = Math.max(40, num - excludeHeight)
    }
  }
  return num
}

/**
 * 列宽算法，计算单元格列宽，动态分配可用剩余空间
 * 支持 px、%、固定 混合分配
 * 支持动态列表调整分配
 * 支持自动分配偏移量
 * 支持 width=60 width=60px width=10% min-width=60 min-width=60px min-width=10%
 */
function autoCellWidth ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { elemStore } = internalData
  const bodyWrapperElem = getRefElem(elemStore['main-body-wrapper'])
  if (!bodyWrapperElem) {
    return
  }
  const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
  if (!yHandleEl) {
    return
  }
  const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
  if (!xHandleEl) {
    return
  }
  let tWidth = 0
  const minCellWidth = 40 // 列宽最少限制 40px
  const bodyWidth = bodyWrapperElem.clientWidth
  let remainWidth = bodyWidth
  let meanWidth = remainWidth / 100
  const { fit } = props
  const { columnStore } = reactData
  const { resizeList, pxMinList, autoMinList, pxList, scaleList, scaleMinList, autoList, remainList } = columnStore
  // 最小宽
  pxMinList.forEach((column) => {
    const minWidth = XEUtils.toInteger(column.minWidth)
    tWidth += minWidth
    column.renderWidth = minWidth
  })
  // 最小自适应
  autoMinList.forEach((column) => {
    const scaleWidth = Math.max(60, XEUtils.toInteger(column.renderAutoWidth))
    tWidth += scaleWidth
    column.renderWidth = scaleWidth
  })
  // 最小百分比
  scaleMinList.forEach((column) => {
    const scaleWidth = Math.floor(XEUtils.toInteger(column.minWidth) * meanWidth)
    tWidth += scaleWidth
    column.renderWidth = scaleWidth
  })
  // 固定百分比
  scaleList.forEach((column) => {
    const scaleWidth = Math.floor(XEUtils.toInteger(column.width) * meanWidth)
    tWidth += scaleWidth
    column.renderWidth = scaleWidth
  })
  // 固定宽
  pxList.forEach((column) => {
    const width = XEUtils.toInteger(column.width)
    tWidth += width
    column.renderWidth = width
  })
  // 自适应宽
  autoList.forEach((column) => {
    const width = Math.max(60, XEUtils.toInteger(column.renderAutoWidth))
    tWidth += width
    column.renderWidth = width
  })
  // 调整了列宽
  resizeList.forEach((column) => {
    const width = XEUtils.toInteger(column.resizeWidth)
    tWidth += width
    column.renderWidth = width
  })
  remainWidth -= tWidth
  meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoMinList.length + remainList.length)) : 0
  if (fit) {
    if (remainWidth > 0) {
      scaleMinList.concat(pxMinList).concat(autoMinList).forEach((column) => {
        tWidth += meanWidth
        column.renderWidth += meanWidth
      })
    }
  } else {
    meanWidth = minCellWidth
  }
  // 剩余均分
  remainList.forEach((column) => {
    const width = Math.max(meanWidth, minCellWidth)
    column.renderWidth = width
    tWidth += width
  })
  if (fit) {
    /**
     * 偏移量算法
     * 如果所有列足够放的情况下，从最后动态列开始分配
     */
    const dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoMinList).concat(remainList)
    let dynamicSize = dynamicList.length - 1
    if (dynamicSize > 0) {
      let i = bodyWidth - tWidth
      if (i > 0) {
        while (i > 0 && dynamicSize >= 0) {
          i--
          dynamicList[dynamicSize--].renderWidth++
        }
        tWidth = bodyWidth
      }
    }
  }
  reactData.scrollXWidth = tWidth
  reactData.resizeWidthFlag++
  updateColumnOffsetLeft($xeTable)
  updateHeight($xeTable)
}

const calcCellAutoHeight = (rowRest: VxeTableDefines.RowCacheItem, wrapperEl: HTMLDivElement) => {
  const cellElemList = wrapperEl.querySelectorAll(`.vxe-cell--wrapper[rowid="${rowRest.rowid}"]`)
  let colHeight = rowRest.height
  for (let i = 0; i < cellElemList.length; i++) {
    const cellElem = cellElemList[i] as HTMLElement
    const tdEl = cellElem.parentElement as HTMLTableCellElement
    const topBottomPadding = Math.ceil(XEUtils.toNumber(tdEl.style.paddingTop) + XEUtils.toNumber(tdEl.style.paddingBottom))
    const cellHeight = cellElem ? cellElem.clientHeight : 0
    colHeight = Math.max(colHeight - topBottomPadding, Math.ceil(cellHeight))
  }
  return colHeight
}

const calcCellHeight = ($xeTable: VxeTableConstructor) => {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { tableData, isAllOverflow, scrollYLoad, scrollXLoad } = reactData
  const { fullAllDataRowIdData } = internalData
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
  const el = $xeTable.$refs.refElem as HTMLDivElement
  if (!isAllOverflow && scrollYLoad && el) {
    const { handleGetRowId } = createHandleGetRowId($xeTable)
    tableData.forEach(row => {
      const rowid = handleGetRowId(row)
      const rowRest = fullAllDataRowIdData[rowid]
      if (rowRest) {
        const height = calcCellAutoHeight(rowRest, el)
        rowRest.height = Math.max(defaultRowHeight, scrollXLoad ? Math.max(rowRest.height, height) : height)
      }
    })
    reactData.calcCellHeightFlag++
  }
}

function getOrderField ($xeTable: VxeTableConstructor, column: VxeTableDefines.ColumnInfo) {
  const { sortBy, sortType } = column
  return (row: any) => {
    let cellValue
    if (sortBy) {
      cellValue = XEUtils.isFunction(sortBy) ? sortBy({ row, column }) : XEUtils.get(row, sortBy)
    } else {
      cellValue = $xeTable.getCellLabel(row, column)
    }
    if (!sortType || sortType === 'auto') {
      return isNaN(cellValue) ? cellValue : XEUtils.toNumber(cellValue)
    } else if (sortType === 'number') {
      return XEUtils.toNumber(cellValue)
    } else if (sortType === 'string') {
      return XEUtils.toValueString(cellValue)
    }
    return cellValue
  }
}

function handleTargetEnterEvent ($xeTable: VxeTableConstructor, isClear: boolean) {
  const internalData = $xeTable as unknown as TableInternalData

  const $tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
  clearTimeout(internalData.tooltipTimeout)
  if (isClear) {
    $xeTable.closeTooltip()
  } else {
    if ($tooltip && $tooltip.setActived) {
      $tooltip.setActived(true)
    }
  }
}

function clearDragStatus ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData

  const { dragRow, dragCol } = reactData
  if (dragRow || dragCol) {
    clearColDropOrigin($xeTable)
    clearRowDropOrigin($xeTable)
    hideDropTip($xeTable)
    reactData.dragRow = null
    reactData.dragCol = null
    reactData.isDragColMove = false
    reactData.isDragRowMove = false
  }
}

function clearRowDropOrigin ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const el = $xeTable.$el
  if (el) {
    const clss = 'row--drag-origin'
    XEUtils.arrayEach(el.querySelectorAll(`.${clss}`), (elem) => {
      (elem as HTMLTableCellElement).draggable = false
      removeClass(elem, clss)
    })
  }
}

function updateRowDropOrigin ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, row: any) {
  const el = $xeTable.$el
  if (el) {
    const clss = 'row--drag-origin'
    const rowid = getRowid($xeTable, row)
    XEUtils.arrayEach(el.querySelectorAll(`[rowid="${rowid}"]`), (elem) => {
      addClass(elem, clss)
    })
  }
}

function updateRowDropTipContent ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, tdEl: HTMLElement) {
  const reactData = $xeTable as unknown as TableReactData
  const props = $xeTable

  const { dragConfig } = props
  const { dragRow } = reactData
  const rowDragOpts = $xeTable.computeRowDragOpts
  const { tooltipMethod } = rowDragOpts
  const rTooltipMethod = tooltipMethod || (dragConfig ? dragConfig.rowTooltipMethod : null)
  let tipContent = ''
  if (rTooltipMethod) {
    const rtParams = {
      $table: $xeTable,
      row: dragRow
    }
    tipContent = `${rTooltipMethod(rtParams) || ''}`
  } else {
    tipContent = getI18n('vxe.table.dragTip', [tdEl.textContent || ''])
  }
  reactData.dragTipText = tipContent
}

function updateColDropOrigin ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) {
  const el = $xeTable.$el as HTMLElement
  if (el) {
    const colQuerys: string[] = []
    XEUtils.eachTree([column], item => {
      colQuerys.push(`[colid="${item.id}"]`)
    })
    const clss = 'col--drag-origin'
    XEUtils.arrayEach(el.querySelectorAll(colQuerys.join(',')), (elem) => {
      addClass(elem, clss)
    })
  }
}

function clearColDropOrigin ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const el = $xeTable.$el as HTMLElement
  if (el) {
    const clss = 'col--drag-origin'
    XEUtils.arrayEach(el.querySelectorAll(`.${clss}`), (elem) => {
      (elem as HTMLTableCellElement).draggable = false
      removeClass(elem, clss)
    })
  }
}

function updateColDropTipContent ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, tdEl: HTMLElement) {
  const reactData = $xeTable as unknown as TableReactData

  const { dragCol } = reactData
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const { tooltipMethod } = columnDragOpts
  let tipContent = ''
  if (tooltipMethod) {
    const dtParams = {
      $table: $xeTable,
      column: dragCol as VxeTableDefines.ColumnInfo
    }
    tipContent = `${tooltipMethod(dtParams) || ''}`
  } else {
    tipContent = getI18n('vxe.table.dragTip', [tdEl.textContent || ''])
  }
  reactData.dragTipText = tipContent
}

function showDropTip ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: DragEvent | MouseEvent, trEl: HTMLElement | null, thEl: HTMLElement | null, showLine: boolean, dragPos: string) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const el = $xeTable.$refs.refElem as HTMLElement
  if (!el) {
    return
  }
  const { overflowX, scrollbarWidth, overflowY, scrollbarHeight } = reactData
  const { prevDragToChild } = internalData
  const wrapperRect = el.getBoundingClientRect()
  const osbWidth = overflowY ? scrollbarWidth : 0
  const osbHeight = overflowX ? scrollbarHeight : 0
  const tableWrapperWidth = el.clientWidth
  const tableWrapperHeight = el.clientHeight
  if (trEl) {
    const rdLineEl = $xeTable.$refs.refDragRowLineElem as HTMLElement
    if (rdLineEl) {
      if (showLine) {
        const scrollbarYToLeft = $xeTable.computeScrollbarYToLeft
        const trRect = trEl.getBoundingClientRect()
        let trHeight = trEl.clientHeight
        const offsetTop = Math.max(1, trRect.y - wrapperRect.y)
        if (offsetTop + trHeight > tableWrapperHeight - osbHeight) {
          trHeight = tableWrapperHeight - offsetTop - osbHeight
        }
        rdLineEl.style.display = 'block'
        rdLineEl.style.left = `${scrollbarYToLeft ? osbWidth : 0}px`
        rdLineEl.style.top = `${offsetTop}px`
        rdLineEl.style.height = `${trHeight}px`
        rdLineEl.style.width = `${tableWrapperWidth - osbWidth}px`
        rdLineEl.setAttribute('drag-pos', dragPos)
        rdLineEl.setAttribute('drag-to-child', prevDragToChild ? 'y' : 'n')
      } else {
        rdLineEl.style.display = ''
      }
    }
  } else if (thEl) {
    const cdLineEl = $xeTable.$refs.refDragColLineElem as HTMLElement
    if (cdLineEl) {
      if (showLine) {
        const scrollbarXToTop = $xeTable.computeScrollbarXToTop
        const leftContainerElem = $xeTable.$refs.refLeftContainer as HTMLDivElement
        const leftContainerWidth = leftContainerElem ? leftContainerElem.clientWidth : 0
        const rightContainerElem = $xeTable.$refs.refRightContainer as HTMLDivElement
        const rightContainerWidth = rightContainerElem ? rightContainerElem.clientWidth : 0
        const thRect = thEl.getBoundingClientRect()
        let thWidth = thEl.clientWidth
        const offsetTop = Math.max(0, thRect.y - wrapperRect.y)
        const startX = leftContainerWidth
        let offsetLeft = thRect.x - wrapperRect.x
        if (offsetLeft < startX) {
          thWidth -= startX - offsetLeft
          offsetLeft = startX
        }
        const endX = tableWrapperWidth - rightContainerWidth - (rightContainerWidth ? 0 : osbWidth)
        if (offsetLeft + thWidth > endX) {
          thWidth = endX - offsetLeft
        }
        cdLineEl.style.display = 'block'
        cdLineEl.style.top = `${offsetTop}px`
        cdLineEl.style.left = `${offsetLeft}px`
        cdLineEl.style.width = `${thWidth}px`
        if (prevDragToChild) {
          cdLineEl.style.height = `${thRect.height}px`
        } else {
          cdLineEl.style.height = `${tableWrapperHeight - offsetTop - (scrollbarXToTop ? 0 : osbHeight)}px`
        }
        cdLineEl.setAttribute('drag-pos', dragPos)
        cdLineEl.setAttribute('drag-to-child', prevDragToChild ? 'y' : 'n')
      } else {
        cdLineEl.style.display = ''
      }
    }
  }
  const rdTipEl = $xeTable.$refs.refDragTipElem as HTMLElement
  if (rdTipEl) {
    rdTipEl.style.display = 'block'
    rdTipEl.style.top = `${Math.min(el.clientHeight - el.scrollTop - rdTipEl.clientHeight, evnt.clientY - wrapperRect.y)}px`
    rdTipEl.style.left = `${Math.min(el.clientWidth - el.scrollLeft - rdTipEl.clientWidth - 16, evnt.clientX - wrapperRect.x)}px`
    rdTipEl.setAttribute('drag-status', showLine ? (prevDragToChild ? 'sub' : 'normal') : 'disabled')
  }
}

function hideDropTip ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const rdTipEl = $xeTable.$refs.refDragTipElem as HTMLDivElement
  const rdLineEl = $xeTable.$refs.refDragRowLineElem as HTMLDivElement
  const cdLineEl = $xeTable.$refs.refDragColLineElem as HTMLDivElement
  if (rdTipEl) {
    rdTipEl.style.display = ''
  }
  if (rdLineEl) {
    rdLineEl.style.display = ''
  }
  if (cdLineEl) {
    cdLineEl.style.display = ''
  }
}

/**
 * 处理显示 tooltip
 * @param {Event} evnt 事件
 * @param {Row} row 行对象
 */
function handleTooltip ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: MouseEvent, tdEl: HTMLTableCellElement, overflowElem: HTMLElement | null, tipElem: HTMLElement | null, params: any) {
  const reactData = $xeTable as unknown as TableReactData

  const tipOverEl = overflowElem || tdEl
  if (!tipOverEl) {
    return $xeTable.$nextTick()
  }
  params.cell = tdEl
  const { tooltipStore } = reactData
  const tooltipOpts = $xeTable.computeTooltipOpts
  const { column, row } = params
  const { showAll, contentMethod } = tooltipOpts
  const customContent = contentMethod ? contentMethod(params) : null
  const useCustom = contentMethod && !XEUtils.eqNull(customContent)
  const content = useCustom ? customContent : XEUtils.toString(column.type === 'html' ? tipOverEl.innerText : tipOverEl.textContent).trim()
  const isOver = tipOverEl.scrollWidth > tipOverEl.clientWidth
  if (content && (showAll || useCustom || isOver)) {
    Object.assign(tooltipStore, {
      row,
      column,
      visible: true,
      currOpts: {}
    })
    $xeTable.$nextTick(() => {
      const $tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
      if ($tooltip && $tooltip.open) {
        $tooltip.open(isOver ? tipOverEl : tipElem, formatText(content))
      }
    })
  }
  return $xeTable.$nextTick()
}

function handleScrollToRowColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, fieldOrColumn: string | VxeTableDefines.ColumnInfo | null, row?: any) {
  const internalData = $xeTable as unknown as TableInternalData

  const { fullColumnIdData } = internalData
  const column = handleFieldOrColumn($xeTable, fieldOrColumn)
  if (column && fullColumnIdData[column.id]) {
    return colToVisible($xeTable, column, row)
  }
  return $xeTable.$nextTick()
}

function handleRowExpandReserve ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, row: any, expanded: boolean) {
  const internalData = $xeTable as unknown as TableInternalData

  const { rowExpandedReserveRowMap } = internalData
  const expandOpts = $xeTable.computeExpandOpts
  if (expandOpts.reserve) {
    const rowid = getRowid($xeTable, row)
    if (expanded) {
      rowExpandedReserveRowMap[rowid] = row
    } else if (rowExpandedReserveRowMap[rowid]) {
      delete rowExpandedReserveRowMap[rowid]
    }
  }
}

function handleDefaultMergeCells ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable

  const { mergeCells } = props
  if (mergeCells) {
    $xeTable.setMergeCells(mergeCells)
  }
}

function handleDefaultMergeFooterItems ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable

  const { mergeFooterItems } = props
  if (mergeFooterItems) {
    $xeTable.setMergeFooterItems(mergeFooterItems)
  }
}

// 计算可视渲染相关数据
function computeScrollLoad ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  return $xeTable.$nextTick().then(() => {
    const { scrollXLoad, scrollYLoad } = reactData
    const { scrollXStore, scrollYStore } = internalData
    const virtualYOpts = $xeTable.computeVirtualYOpts
    const virtualXOpts = $xeTable.computeVirtualXOpts
    // 计算 X 逻辑
    if (scrollXLoad) {
      const { toVisibleIndex: toXVisibleIndex, visibleSize: visibleXSize } = handleVirtualXVisible($xeTable)
      const offsetXSize = Math.max(0, virtualXOpts.oSize ? XEUtils.toNumber(virtualXOpts.oSize) : 0)
      scrollXStore.preloadSize = XEUtils.toNumber(virtualXOpts.preSize)
      scrollXStore.offsetSize = offsetXSize
      scrollXStore.visibleSize = visibleXSize
      scrollXStore.endIndex = Math.max(scrollXStore.startIndex + scrollXStore.visibleSize + offsetXSize, scrollXStore.endIndex)
      scrollXStore.visibleStartIndex = Math.max(scrollXStore.startIndex, toXVisibleIndex)
      scrollXStore.visibleEndIndex = Math.min(scrollXStore.endIndex, toXVisibleIndex + visibleXSize)
      $xeTable.updateScrollXData().then(() => {
        loadScrollXData($xeTable)
      })
    } else {
      $xeTable.updateScrollXSpace()
    }
    // 计算 Y 逻辑
    const rowHeight = computeRowHeight($xeTable)

    ;(scrollYStore as any).rowHeight = rowHeight // 已废弃

    reactData.rowHeight = rowHeight
    const { toVisibleIndex: toYVisibleIndex, visibleSize: visibleYSize } = handleVirtualYVisible($xeTable)
    if (scrollYLoad) {
      const offsetYSize = Math.max(0, virtualYOpts.oSize ? XEUtils.toNumber(virtualYOpts.oSize) : 0)
      scrollYStore.preloadSize = XEUtils.toNumber(virtualYOpts.preSize)
      scrollYStore.offsetSize = offsetYSize
      scrollYStore.visibleSize = visibleYSize
      scrollYStore.endIndex = Math.max(scrollYStore.startIndex + visibleYSize + offsetYSize, scrollYStore.endIndex)
      scrollYStore.visibleStartIndex = Math.max(scrollYStore.startIndex, toYVisibleIndex)
      scrollYStore.visibleEndIndex = Math.min(scrollYStore.endIndex, toYVisibleIndex + visibleYSize)
      $xeTable.updateScrollYData().then(() => {
        loadScrollYData($xeTable)
      })
    } else {
      $xeTable.updateScrollYSpace()
    }
  })
}

function calcScrollbar ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { scrollXWidth, scrollYHeight } = reactData
  const { elemStore } = internalData
  const scrollbarOpts = $xeTable.computeScrollbarOpts
  const bodyWrapperElem = getRefElem(elemStore['main-body-wrapper'])
  const headerTableElem = getRefElem(elemStore['main-header-table'])
  const footerTableElem = getRefElem(elemStore['main-footer-table'])
  const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
  const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
  let overflowY = false
  let overflowX = false
  if (bodyWrapperElem) {
    overflowY = scrollYHeight > bodyWrapperElem.clientHeight
    if (yHandleEl) {
      reactData.scrollbarWidth = scrollbarOpts.width || (yHandleEl.offsetWidth - yHandleEl.clientWidth) || 14
    }
    reactData.overflowY = overflowY

    overflowX = scrollXWidth > bodyWrapperElem.clientWidth
    if (xHandleEl) {
      reactData.scrollbarHeight = scrollbarOpts.height || (xHandleEl.offsetHeight - xHandleEl.clientHeight) || 14
    }
    reactData.overflowX = overflowX

    const headerHeight = headerTableElem ? headerTableElem.clientHeight : 0
    const footerHeight = footerTableElem ? footerTableElem.clientHeight : 0
    internalData.tableHeight = bodyWrapperElem.offsetHeight
    internalData.headerHeight = headerHeight
    internalData.footerHeight = footerHeight

    reactData.parentHeight = Math.max(internalData.headerHeight + footerHeight + 20, $xeTable.getParentHeight())
  }
  if (overflowX) {
    $xeTable.checkScrolling()
  }
}

function handleRecalculateLayout ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, reFull: boolean) {
  const internalData = $xeTable as unknown as TableInternalData

  const el = $xeTable.$refs.refElem as HTMLDivElement
  internalData.rceRunTime = Date.now()
  if (!el || !el.clientWidth) {
    return $xeTable.$nextTick()
  }
  const varEl = $xeTable.$refs.refVarElem as HTMLDivElement
  if (varEl) {
    const [defEl, mediumEl, smallEl, miniEl] = varEl.children
    calcVarRowHeightConfig($xeTable, 'default', defEl)
    calcVarRowHeightConfig($xeTable, 'medium', mediumEl)
    calcVarRowHeightConfig($xeTable, 'small', smallEl)
    calcVarRowHeightConfig($xeTable, 'mini', miniEl)
  }
  calcCellWidth($xeTable)
  autoCellWidth($xeTable)
  calcScrollbar($xeTable)
  updateStyle($xeTable)
  updateRowExpandStyle($xeTable)
  return computeScrollLoad($xeTable).then(() => {
    // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
    calcCellWidth($xeTable)
    if (reFull) {
      autoCellWidth($xeTable)
    }
    calcScrollbar($xeTable)
    updateStyle($xeTable)
    if (reFull) {
      updateRowOffsetTop($xeTable)
    }
    updateRowExpandStyle($xeTable)
    if (reFull) {
      return computeScrollLoad($xeTable)
    }
  })
}

const handleUpdateRowGroup = ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, groupFields?: string[]) => {
  const reactData = $xeTable as unknown as TableReactData

  reactData.rowGroupList = groupFields
    ? (XEUtils.isArray(groupFields) ? groupFields : [groupFields]).map(field => {
        return {
          field
        }
      })
    : []
}

function handleeGroupSummary ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, aggList: VxeTableDefines.AggregateRowInfo[]) {
  const aggregateOpts = $xeTable.computeAggregateOpts
  const { mapChildrenField } = aggregateOpts
  if (mapChildrenField) {
    XEUtils.lastEach(aggList, aggRow => {
      let count = 0
      XEUtils.each(aggRow[mapChildrenField], (row: VxeTableDefines.AggregateRowInfo) => {
        if (row.isAggregate) {
          count += row.childCount || 0
        } else {
          count++
        }
      })
      aggRow.childCount = count
    })
    if ($xeTable.handlePivotTableAggregateData) {
      $xeTable.handlePivotTableAggregateData(aggList)
    }
  }
}

function updateGroupData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { aggregateConfig, rowGroupConfig } = props
  const { isRowGroupStatus } = reactData
  const { tableFullGroupData } = internalData
  const aggregateOpts = $xeTable.computeAggregateOpts
  const { mapChildrenField } = aggregateOpts
  if ((aggregateConfig || rowGroupConfig) && isRowGroupStatus) {
    const aggList: VxeTableDefines.AggregateRowInfo[] = []
    XEUtils.eachTree(tableFullGroupData, row => {
      if (row.isAggregate) {
        aggList.push(row)
      }
    }, { children: mapChildrenField })
    handleeGroupSummary($xeTable, aggList)
  }
}

function handleGroupData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, list: any[], rowGroups: VxeTableDefines.RowGroupItem[]) {
  let fullData = list
  let treeData = list
  if (rowGroups) {
    const aggregateOpts = $xeTable.computeAggregateOpts
    const { rowField, parentField, childrenField, mapChildrenField } = aggregateOpts
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField } = checkboxOpts
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
    const rgItem = rowGroups[0]
    if (rgItem && rowField && parentField && childrenField && mapChildrenField) {
      fullData = []
      treeData = []
      const groupField = rgItem.field
      const groupColumn = $xeTable.getColumnByField(groupField)
      const groupMaps: Record<string, any[]> = {}
      const aggList: VxeTableDefines.AggregateRowInfo[] = []
      const rowkey = getRowkey($xeTable)
      list.forEach((row) => {
        const cellValue = groupColumn ? $xeTable.getCellLabel(row, groupColumn) : XEUtils.get(row, groupField)
        const groupValue = XEUtils.eqNull(cellValue) ? '' : cellValue
        let childList = groupMaps[groupValue]
        if (!childList) {
          childList = []
          groupMaps[groupValue] = childList
        }
        if (row.isAggregate) {
          row.isAggregate = undefined
        }
        childList.push(row)
      })
      XEUtils.objectEach(groupMaps, (childList, groupValue) => {
        const { fullData: childFullData, treeData: childTreeData } = handleGroupData($xeTable, childList, rowGroups.slice(1))
        const aggRow: VxeTableDefines.AggregateRowInfo = {
          isAggregate: true,
          aggData: {},
          groupContent: groupValue,
          groupField,
          childCount: 0,
          [rowField]: getRowUniqueId(),
          [parentField]: null,
          [rowkey]: getRowUniqueId(),
          [childrenField]: childTreeData,
          [mapChildrenField]: childTreeData
        }
        if (checkField) {
          aggRow[checkField] = false
        }
        if (indeterminateField) {
          aggRow[indeterminateField] = false
        }
        aggList.push(aggRow)
        treeData.push(aggRow)
        fullData.push(aggRow)
        if (childFullData.length) {
          fullData.push(...childFullData)
        }
      })
      handleeGroupSummary($xeTable, aggList)
    }
  }
  return {
    treeData,
    fullData
  }
}

/**
 * 加载表格数据
 * @param {Array} datas 数据
 */
function loadTableData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, datas: any[], isReset: boolean) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { keepSource, treeConfig, aggregateConfig, rowGroupConfig } = props
  const { rowGroupList, scrollYLoad: oldScrollYLoad } = reactData
  const { scrollYStore, scrollXStore, lastScrollLeft, lastScrollTop } = internalData
  const rowOpts = $xeTable.computeRowOpts
  const treeOpts = $xeTable.computeTreeOpts
  const expandOpts = $xeTable.computeExpandOpts
  const { transform } = treeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  let treeData = []
  let fullData = datas ? datas.slice(0) : [] // 转为响应式数据
  if (fullData.length > supportMaxRow) {
    errLog('vxe.error.errMaxRow', [supportMaxRow])
  }
  if (treeConfig && rowGroupList.length) {
    errLog('vxe.error.noTree', ['aggregate-config'])
    return $xeTable.$nextTick()
  }
  if (rowOpts.drag && rowGroupList.length) {
    errLog('vxe.error.errConflicts', ['row-config.drag', 'aggregate-config'])
    return $xeTable.$nextTick()
  }
  let isRGroup = false
  if (treeConfig) {
    if (transform) {
      // 树结构自动转换
      if (!treeOpts.rowField) {
        errLog('vxe.error.reqProp', ['tree-config.rowField'])
      }
      if (!treeOpts.parentField) {
        errLog('vxe.error.reqProp', ['tree-config.parentField'])
      }
      if (!childrenField) {
        errLog('vxe.error.reqProp', ['tree-config.childrenField'])
      }
      if (!treeOpts.mapChildrenField) {
        errLog('vxe.error.reqProp', ['tree-config.mapChildrenField'])
      }
      if (childrenField === treeOpts.mapChildrenField) {
        errLog('vxe.error.errConflicts', ['tree-config.childrenField', 'tree-config.mapChildrenField'])
      }
      // fullData.forEach(row => {
      //   if (row[treeOpts.children] && row[treeOpts.children].length) {
      //     warnLog('vxe.error.errConflicts', ['tree-config.transform', `row.${treeOpts.children}`])
      //   }
      // })
      treeData = XEUtils.toArrayTree(fullData, {
        key: treeOpts.rowField,
        parentKey: treeOpts.parentField,
        children: childrenField,
        mapChildren: treeOpts.mapChildrenField
      })
      fullData = treeData.slice(0)
    } else {
      treeData = fullData.slice(0)
    }
  } else if ((aggregateConfig || rowGroupConfig) && rowGroupList.length) {
    const groupRest = handleGroupData($xeTable, fullData, rowGroupList)
    treeData = groupRest.treeData
    fullData = groupRest.fullData
    isRGroup = true
  }
  reactData.isRowGroupStatus = isRGroup
  scrollYStore.startIndex = 0
  scrollYStore.endIndex = 1
  scrollXStore.startIndex = 0
  scrollXStore.endIndex = 1
  internalData.cvCacheMaps = {}
  reactData.isRowLoading = true
  reactData.scrollVMLoading = false
  internalData.treeExpandedMaps = {}
  reactData.treeExpandedFlag++
  internalData.rowExpandedMaps = {}
  reactData.rowExpandedFlag++
  internalData.insertRowMaps = {}
  reactData.insertRowFlag++
  internalData.removeRowMaps = {}
  reactData.removeRowFlag++
  const sYLoad = updateScrollYStatus($xeTable, fullData)
  reactData.isDragColMove = false
  reactData.isDragRowMove = false
  // 全量数据
  internalData.tableFullData = fullData
  internalData.tableFullTreeData = isRGroup ? [] : treeData
  internalData.tableFullGroupData = isRGroup ? treeData : []
  // 缓存数据
  $xeTable.cacheRowMap(isReset)
  // 原始数据
  internalData.tableSynchData = datas
  if (isReset) {
    internalData.isResizeCellHeight = false
  }
  // 克隆原数据，用于显示编辑状态，与编辑值做对比
  if (keepSource) {
    $xeTable.cacheSourceMap(fullData)
  }
  if ($xeTable.clearCellAreas && props.mouseConfig) {
    $xeTable.clearCellAreas()
    $xeTable.clearCopyCellArea()
  }
  $xeTable.clearMergeCells()
  $xeTable.clearMergeFooterItems()
  $xeTable.handleTableData(true)
  $xeTable.updateFooter()
  $xeTable.handleUpdateBodyMerge()
  return $xeTable.$nextTick().then(() => {
    updateHeight($xeTable)
    updateStyle($xeTable)
  }).then(() => {
    computeScrollLoad($xeTable)
  }).then(() => {
    // 是否启用了虚拟滚动
    if (sYLoad) {
      scrollYStore.endIndex = scrollYStore.visibleSize
    }

    if (sYLoad) {
      if (reactData.expandColumn && expandOpts.mode !== 'fixed') {
        errLog('vxe.error.notConflictProp', ['column.type="expand', 'expand-config.mode="fixed"'])
      }
      // if (showOverflow) {
      //   if (!rowOpts.height) {
      //     const errColumn = internalData.tableFullColumn.find(column => column.showOverflow === false)
      //     if (errColumn) {
      //       errLog('vxe.error.errProp', [`column[field="${errColumn.field}"].show-overflow=false`, 'show-overflow=true'])
      //     }
      //   }
      // }

      if (!(props.height || props.maxHeight)) {
        errLog('vxe.error.reqProp', ['height | max-height | virtual-y-config={enabled: false}'])
      }
      // if (!props.showOverflow) {
      //   warnLog('vxe.error.reqProp', ['table.show-overflow'])
      // }
      if (props.spanMethod) {
        errLog('vxe.error.scrollErrProp', ['table.span-method'])
      }
    }

    handleReserveStatus($xeTable)
    $xeTable.checkSelectionStatus()
    return new Promise<void>(resolve => {
      $xeTable.$nextTick()
        .then(() => handleRecalculateLayout($xeTable, false))
        .then(() => {
          calcCellHeight($xeTable)
          updateRowOffsetTop($xeTable)
          return handleRecalculateLayout($xeTable, false)
        })
        .then(() => {
          let targetScrollLeft = lastScrollLeft
          let targetScrollTop = lastScrollTop
          const virtualXOpts = $xeTable.computeVirtualXOpts
          const virtualYOpts = $xeTable.computeVirtualYOpts
          // 是否在更新数据之后自动滚动重置滚动条
          if (virtualXOpts.scrollToLeftOnChange) {
            targetScrollLeft = 0
          }
          if (virtualYOpts.scrollToTopOnChange) {
            targetScrollTop = 0
          }
          reactData.isRowLoading = false
          handleRecalculateLayout($xeTable, false)
          // 是否变更虚拟滚动
          if (oldScrollYLoad === sYLoad) {
            restoreScrollLocation($xeTable, targetScrollLeft, targetScrollTop)
              .then(() => {
                calcCellHeight($xeTable)
                updateRowOffsetTop($xeTable)
                resolve()
              })
          } else {
            setTimeout(() => {
              restoreScrollLocation($xeTable, targetScrollLeft, targetScrollTop)
                .then(() => {
                  calcCellHeight($xeTable)
                  updateRowOffsetTop($xeTable)
                  resolve()
                })
            })
          }
        })
    })
  })
}

/**
 * 处理数据加载默认行为
 * 默认执行一次，除非被重置
 */
function handleLoadDefaults ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  handleDefaultSelectionChecked($xeTable)
  handleDefaultRadioChecked($xeTable)
  handleDefaultRowExpand($xeTable)
  handleDefaultTreeExpand($xeTable)
  handleDefaultMergeCells($xeTable)
  handleDefaultMergeFooterItems($xeTable)
  $xeTable.$nextTick(() => setTimeout(() => $xeTable.recalculate()))
}

/**
 * 处理初始化的默认行为
 * 只会执行一次
 */
function handleInitDefaults ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  handleDefaultSort($xeTable)
}

function handleTableColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { scrollXLoad } = reactData
  const { visibleColumn, scrollXStore, fullColumnIdData } = internalData
  const tableColumn = scrollXLoad ? visibleColumn.slice(scrollXStore.startIndex, scrollXStore.endIndex) : visibleColumn.slice(0)
  tableColumn.forEach((column, $index) => {
    const colid = column.id
    const colRest = fullColumnIdData[colid]
    if (colRest) {
      colRest.$index = $index
    }
  })
  reactData.tableColumn = tableColumn
}

function handleUpdateColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const columnList = XEUtils.orderBy(internalData.collectColumn, 'renderSortNumber')
  internalData.collectColumn = columnList
  const tableFullColumn = getColumnList(columnList)
  internalData.tableFullColumn = tableFullColumn
  cacheColumnMap($xeTable)
}

function loadScrollXData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { isScrollXBig } = reactData
  const { mergeBodyList, mergeFooterList, scrollXStore } = internalData
  const { preloadSize, startIndex, endIndex, offsetSize } = scrollXStore
  const { toVisibleIndex, visibleSize } = handleVirtualXVisible($xeTable)
  const offsetItem = {
    startIndex: Math.max(0, isScrollXBig ? toVisibleIndex - 1 : toVisibleIndex - 1 - offsetSize - preloadSize),
    endIndex: isScrollXBig ? toVisibleIndex + visibleSize : toVisibleIndex + visibleSize + offsetSize + preloadSize
  }
  scrollXStore.visibleStartIndex = toVisibleIndex - 1
  scrollXStore.visibleEndIndex = toVisibleIndex + visibleSize + 1
  calculateMergerOffsetIndex(mergeBodyList.concat(mergeFooterList), offsetItem, 'col')
  const { startIndex: offsetStartIndex, endIndex: offsetEndIndex } = offsetItem
  if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
    if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
      scrollXStore.startIndex = offsetStartIndex
      scrollXStore.endIndex = offsetEndIndex
      $xeTable.updateScrollXData()
    }
  }
  $xeTable.closeTooltip()
}

// 获取所有的列，排除分组
function getColumnList (columns: any[]) {
  const result: any[] = []
  columns.forEach((column) => {
    result.push(...(column.children && column.children.length ? getColumnList(column.children) : [column]))
  })
  return result
}

function parseColumns ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, isReset: boolean) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  // const { showOverflow } = props
  // const rowOpts = $xeTable.computeRowOpts
  const leftList: VxeTableDefines.ColumnInfo[] = []
  const centerList: VxeTableDefines.ColumnInfo[] = []
  const rightList: VxeTableDefines.ColumnInfo[] = []
  const { isGroup, columnStore } = reactData
  const { collectColumn, tableFullColumn, scrollXStore, fullColumnIdData } = internalData
  // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏
  if (isGroup) {
    const leftGroupList: VxeTableDefines.ColumnInfo[] = []
    const centerGroupList: VxeTableDefines.ColumnInfo[] = []
    const rightGroupList: VxeTableDefines.ColumnInfo[] = []
    XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn) => {
      const isColGroup = hasChildrenList(column)
      // 如果是分组，必须按组设置固定列，不允许给子列设置固定
      if (parentColumn && parentColumn.fixed) {
        column.fixed = parentColumn.fixed
      }
      if (parentColumn && column.fixed !== parentColumn.fixed) {
        errLog('vxe.error.groupFixed')
      }
      if (isColGroup) {
        column.visible = !!XEUtils.findTree(column.children, (subColumn) => hasChildrenList(subColumn) ? false : subColumn.visible)
      } else if (column.visible) {
        if (column.fixed === 'left') {
          leftList.push(column)
        } else if (column.fixed === 'right') {
          rightList.push(column)
        } else {
          centerList.push(column)
        }
      }
    })
    collectColumn.forEach((column) => {
      if (column.visible) {
        if (column.fixed === 'left') {
          leftGroupList.push(column)
        } else if (column.fixed === 'right') {
          rightGroupList.push(column)
        } else {
          centerGroupList.push(column)
        }
      }
    })
    reactData.tableGroupColumn = leftGroupList.concat(centerGroupList).concat(rightGroupList)
  } else {
    // 重新分配列
    tableFullColumn.forEach((column) => {
      if (column.visible) {
        if (column.fixed === 'left') {
          leftList.push(column)
        } else if (column.fixed === 'right') {
          rightList.push(column)
        } else {
          centerList.push(column)
        }
      }
    })
  }
  const visibleColumn = leftList.concat(centerList).concat(rightList)
  internalData.visibleColumn = visibleColumn
  updateColumnOffsetLeft($xeTable)
  const sXLoad = updateScrollXStatus($xeTable)
  reactData.hasFixedColumn = leftList.length > 0 || rightList.length > 0
  Object.assign(columnStore, { leftList, centerList, rightList })
  if (sXLoad) {
    // if (showOverflow) {
    //   if (!rowOpts.height) {
    //     const errColumn = internalData.tableFullColumn.find(column => column.showOverflow === false)
    //     if (errColumn) {
    //       errLog('vxe.error.errProp', [`column[field="${errColumn.field}"].show-overflow=false`, 'show-overflow=true'])
    //     }
    //   }
    // }
    // if (props.showHeader && !props.showHeaderOverflow) {
    //   warnLog('vxe.error.reqProp', ['show-header-overflow'])
    // }
    // if (props.showFooter && !props.showFooterOverflow) {
    //   warnLog('vxe.error.reqProp', ['show-footer-overflow'])
    // }
    if (props.spanMethod) {
      warnLog('vxe.error.scrollErrProp', ['span-method'])
    }
    if (props.footerSpanMethod) {
      warnLog('vxe.error.scrollErrProp', ['footer-span-method'])
    }
    if (isReset) {
      const { visibleSize } = handleVirtualXVisible($xeTable)
      scrollXStore.startIndex = 0
      scrollXStore.endIndex = visibleSize
      scrollXStore.visibleSize = visibleSize
      scrollXStore.visibleStartIndex = 0
      scrollXStore.visibleEndIndex = visibleSize
    }
  }
  // 如果列被显示/隐藏，则清除合并状态
  // 如果列被设置为固定，则清除合并状态
  if (visibleColumn.length !== internalData.visibleColumn.length || !internalData.visibleColumn.every((column, index) => column === visibleColumn[index])) {
    $xeTable.clearMergeCells()
    $xeTable.clearMergeFooterItems()
  }
  visibleColumn.forEach((column, index) => {
    const colid = column.id
    const colRest = fullColumnIdData[colid]
    if (colRest) {
      colRest._index = index
    }
  })
  handleTableColumn($xeTable)
  if (isReset) {
    return $xeTable.updateFooter().then(() => {
      return $xeTable.recalculate()
    }).then(() => {
      $xeTable.updateCellAreas()
      return $xeTable.recalculate()
    })
  }
  return $xeTable.updateFooter()
}

function initColumnSort ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const { collectColumn } = internalData
  collectColumn.forEach((column, index) => {
    const sortIndex = index + 1
    column.sortNumber = sortIndex
    column.renderSortNumber = sortIndex
  })
}

function handleColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, collectColumn: VxeTableDefines.ColumnInfo[]) {
  const $xeToolbar = $xeTable.$refs.$xeToolbar as VxeToolbarConstructor
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const expandOpts = $xeTable.computeExpandOpts
  internalData.collectColumn = collectColumn
  const tableFullColumn = getColumnList(collectColumn)
  internalData.tableFullColumn = tableFullColumn
  reactData.isColLoading = true
  reactData.isDragColMove = false
  initColumnSort($xeTable)
  return Promise.resolve(
    restoreCustomStorage($xeTable)
  ).then(() => {
    const { scrollXLoad, scrollYLoad, expandColumn } = reactData
    cacheColumnMap($xeTable)
    parseColumns($xeTable, true).then(() => {
      if (reactData.scrollXLoad) {
        loadScrollXData($xeTable)
      }
    })
    $xeTable.clearMergeCells()
    $xeTable.clearMergeFooterItems()
    $xeTable.handleTableData(true)
    $xeTable.handleAggregateSummaryData()

    if ((scrollXLoad || scrollYLoad) && (expandColumn && expandOpts.mode !== 'fixed')) {
      warnLog('vxe.error.scrollErrProp', ['column.type=expand'])
    }

    return $xeTable.$nextTick().then(() => {
      if ($xeToolbar) {
        $xeToolbar.syncUpdate({
          collectColumn: internalData.collectColumn,
          $table: $xeTable
        })
      }
      if ($xeTable.handleUpdateCustomColumn) {
        $xeTable.handleUpdateCustomColumn()
      }
      reactData.isColLoading = false
      return $xeTable.recalculate()
    })
  })
}

/**
 * 纵向 Y 可视渲染处理
 */
function loadScrollYData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { isAllOverflow, isScrollYBig } = reactData
  const { mergeBodyList, scrollYStore } = internalData
  const { preloadSize, startIndex, endIndex, offsetSize } = scrollYStore
  const autoOffsetYSize = isAllOverflow ? offsetSize : offsetSize + 1
  const { toVisibleIndex, visibleSize } = handleVirtualYVisible($xeTable)
  const offsetItem = {
    startIndex: Math.max(0, isScrollYBig ? toVisibleIndex - 1 : toVisibleIndex - 1 - offsetSize - preloadSize),
    endIndex: isScrollYBig ? (toVisibleIndex + visibleSize) : (toVisibleIndex + visibleSize + autoOffsetYSize + preloadSize)
  }
  scrollYStore.visibleStartIndex = toVisibleIndex - 1
  scrollYStore.visibleEndIndex = toVisibleIndex + visibleSize + 1
  calculateMergerOffsetIndex(mergeBodyList, offsetItem, 'row')
  const { startIndex: offsetStartIndex, endIndex: offsetEndIndex } = offsetItem
  if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
    if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
      scrollYStore.startIndex = offsetStartIndex
      scrollYStore.endIndex = offsetEndIndex
      $xeTable.updateScrollYData()
    }
  }
}

const createGetRowCacheProp = (prop: 'seq' | 'index' | '_index' | '$index') => {
  return function (this: VxeTableConstructor & VxeTablePrivateMethods, row: any) {
    const $xeTable = this
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData } = internalData
    if (row) {
      const rowid = getRowid($xeTable, row)
      const rowRest = fullAllDataRowIdData[rowid]
      if (rowRest) {
        return rowRest[prop]
      }
    }
    return -1
  }
}

const createGetColumnCacheProp = (prop: 'index' | '_index' | '$index') => {
  return function (this: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) {
    const $xeTable = this
    const internalData = $xeTable as unknown as TableInternalData

    const { fullColumnIdData } = internalData
    if (column) {
      const colRest = fullColumnIdData[column.id]
      if (colRest) {
        return colRest[prop]
      }
    }
    return -1
  }
}

function lazyScrollXData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const { lxTimeout, lxRunTime, scrollXStore } = internalData
  const { visibleSize } = scrollXStore
  const fpsTime = visibleSize > 26 ? 26 : (visibleSize > 16 ? 14 : 6)
  if (lxTimeout) {
    clearTimeout(lxTimeout)
  }
  if (!lxRunTime || lxRunTime + fpsTime < Date.now()) {
    internalData.lxRunTime = Date.now()
    loadScrollXData($xeTable)
  }
  internalData.lxTimeout = setTimeout(() => {
    internalData.lxTimeout = undefined
    internalData.lxRunTime = undefined
    loadScrollXData($xeTable)
  }, fpsTime)
}

function lazyScrollYData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const { lyTimeout, lyRunTime, scrollYStore } = internalData
  const { visibleSize } = scrollYStore
  const fpsTime = visibleSize > 30 ? 32 : (visibleSize > 20 ? 18 : 8)
  if (lyTimeout) {
    clearTimeout(lyTimeout)
  }
  if (!lyRunTime || lyRunTime + fpsTime < Date.now()) {
    internalData.lyRunTime = Date.now()
    loadScrollYData($xeTable)
  }
  internalData.lyTimeout = setTimeout(() => {
    internalData.lyTimeout = undefined
    internalData.lyRunTime = undefined
    loadScrollYData($xeTable)
  }, fpsTime)
}

function checkLastSyncScroll ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, isRollX: boolean, isRollY: boolean) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { scrollXLoad, scrollYLoad, isAllOverflow } = reactData
  const { lcsTimeout } = internalData
  if (lcsTimeout) {
    clearTimeout(lcsTimeout)
  }
  internalData.lcsTimeout = setTimeout(() => {
    internalData.lcsRunTime = Date.now()
    internalData.lcsTimeout = undefined
    internalData.intoRunScroll = false
    internalData.inVirtualScroll = false
    internalData.inWheelScroll = false
    internalData.inHeaderScroll = false
    internalData.inBodyScroll = false
    internalData.inFooterScroll = false
    internalData.scrollRenderType = ''
    if (!isAllOverflow) {
      calcCellHeight($xeTable)
      updateRowOffsetTop($xeTable)
    }
    if (isRollX && scrollXLoad) {
      $xeTable.updateScrollXData()
    }
    if (isRollY && scrollYLoad) {
      $xeTable.updateScrollYData().then(() => {
        if (!isAllOverflow) {
          calcCellHeight($xeTable)
          updateRowOffsetTop($xeTable)
        }
        $xeTable.updateScrollYSpace()
      })
    }
    $xeTable.updateCellAreas()
  }, 200)
}

const getWheelSpeed = (lastScrollTime: number) => {
  let multiple = 1
  const currTime = Date.now()
  if (lastScrollTime + 25 > currTime) {
    multiple = 1.18
  } else if (lastScrollTime + 30 > currTime) {
    multiple = 1.15
  } else if (lastScrollTime + 40 > currTime) {
    multiple = 1.12
  } else if (lastScrollTime + 55 > currTime) {
    multiple = 1.09
  } else if (lastScrollTime + 75 > currTime) {
    multiple = 1.06
  } else if (lastScrollTime + 100 > currTime) {
    multiple = 1.03
  }
  return multiple
}

const wheelScrollLeftTo = (scrollLeft: number, cb: (offsetLeft: number) => void) => {
  requestAnimationFrame(() => {
    cb(scrollLeft)
  })
}

const wheelScrollTopTo = (diffNum: number, cb: (progress: number) => void) => {
  const duration = Math.abs(diffNum)
  const startTime = performance.now()
  let countTop = 0
  const step = (timestamp: number) => {
    let progress = (timestamp - startTime) / duration
    if (progress > 1) {
      progress = 1
    }
    const easedProgress = Math.pow(progress, 2)
    const offsetTop = Math.floor((diffNum * easedProgress)) - countTop
    countTop += offsetTop
    cb(offsetTop)
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }
  requestAnimationFrame(step)
}

function updateHeight ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  internalData.customHeight = calcTableHeight($xeTable, 'height')
  internalData.customMinHeight = calcTableHeight($xeTable, 'minHeight')
  internalData.customMaxHeight = calcTableHeight($xeTable, 'maxHeight')

  // 如果启用虚拟滚动，默认高度
  if (reactData.scrollYLoad && !(internalData.customHeight || internalData.customMinHeight)) {
    internalData.customHeight = 300
  }
}

function calcColumnAutoWidth (column: VxeTableDefines.ColumnInfo, wrapperEl: HTMLDivElement) {
  const cellElemList = wrapperEl.querySelectorAll(`.vxe-cell--wrapper[colid="${column.id}"]`)
  let leftRightPadding = 0
  const firstCellEl = cellElemList[0]
  if (firstCellEl && firstCellEl.parentElement) {
    const cellStyle = getComputedStyle(firstCellEl.parentElement)
    leftRightPadding = Math.ceil(XEUtils.toNumber(cellStyle.paddingLeft) + XEUtils.toNumber(cellStyle.paddingRight))
  }
  let colWidth = column.renderAutoWidth - leftRightPadding
  for (let i = 0; i < cellElemList.length; i++) {
    const celEl = cellElemList[i] as HTMLDivElement
    colWidth = Math.max(colWidth, celEl ? Math.ceil(celEl.scrollWidth) + 4 : 0)
  }
  return colWidth + leftRightPadding
}

function calcCellWidth ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const autoWidthColumnList = $xeTable.computeAutoWidthColumnList
  const { fullColumnIdData } = internalData
  const el = $xeTable.$refs.refElem as HTMLDivElement
  if (el) {
    el.setAttribute('data-calc-col', 'Y')
    autoWidthColumnList.forEach(column => {
      const colid = column.id
      const colRest = fullColumnIdData[colid]
      const colWidth = calcColumnAutoWidth(column, el)
      if (colRest) {
        colRest.width = Math.max(colWidth, colRest.width)
      }
      column.renderAutoWidth = colWidth
    })
    $xeTable.analyColumnWidth()
    el.removeAttribute('data-calc-col')
  }
}

function handleUpdateColResize ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: MouseEvent, params: any) {
  $xeTable.analyColumnWidth()
  $xeTable.recalculate().then(() => {
    $xeTable.saveCustomStore('update:width')
    $xeTable.updateCellAreas()
    $xeTable.dispatchEvent('column-resizable-change', params, evnt)
    // 已废弃 resizable-change
    $xeTable.dispatchEvent('resizable-change', params, evnt)
    setTimeout(() => $xeTable.recalculate(true), 300)
  })
}

function handleUpdateRowResize ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: MouseEvent, params: any) {
  const reactData = $xeTable as unknown as TableReactData

  reactData.resizeHeightFlag++
  $xeTable.recalculate().then(() => {
    $xeTable.updateCellAreas()
    $xeTable.dispatchEvent('row-resizable-change', params, evnt)
    setTimeout(() => $xeTable.recalculate(true), 300)
  })
}

function updateColumnOffsetLeft ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const { visibleColumn, fullColumnIdData } = internalData
  let offsetLeft = 0
  for (let cIndex = 0, rLen = visibleColumn.length; cIndex < rLen; cIndex++) {
    const column = visibleColumn[cIndex]
    const colid = column.id
    const colRest = fullColumnIdData[colid]
    if (colRest) {
      colRest.oLeft = offsetLeft
    }
    offsetLeft += column.renderWidth
  }
}

function updateRowOffsetTop ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { expandColumn } = reactData
  const { afterFullData, fullAllDataRowIdData, rowExpandedMaps } = internalData
  const expandOpts = $xeTable.computeExpandOpts
  const rowOpts = $xeTable.computeRowOpts
  const cellOpts = $xeTable.computeCellOpts
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
  const { handleGetRowId } = createHandleGetRowId($xeTable)
  let offsetTop = 0
  for (let rIndex = 0, rLen = afterFullData.length; rIndex < rLen; rIndex++) {
    const row = afterFullData[rIndex]
    const rowid = handleGetRowId(row)
    const rowRest = fullAllDataRowIdData[rowid] || {}
    rowRest.oTop = offsetTop
    offsetTop += rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
    // 是否展开行
    if (expandColumn && rowExpandedMaps[rowid]) {
      offsetTop += rowRest.expandHeight || expandOpts.height || 0
    }
  }
}

function updateRowExpandStyle ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { expandColumn, scrollYLoad, scrollYTop, isScrollYBig } = reactData
  const expandOpts = $xeTable.computeExpandOpts
  const rowOpts = $xeTable.computeRowOpts
  const cellOpts = $xeTable.computeCellOpts
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
  const { mode } = expandOpts
  if (expandColumn && mode === 'fixed') {
    const { elemStore, fullAllDataRowIdData } = internalData
    const rowExpandEl = $xeTable.$refs.refRowExpandElem as HTMLDivElement
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    if (rowExpandEl && bodyScrollElem) {
      let isUpdateHeight = false
      XEUtils.arrayEach(rowExpandEl.children, reEl => {
        const expandEl = reEl as HTMLDivElement
        const rowid = expandEl.getAttribute('rowid') || ''
        const rowRest = fullAllDataRowIdData[rowid]
        if (rowRest) {
          const expandHeight = expandEl.offsetHeight + 1
          const trEl = bodyScrollElem.querySelector(`.vxe-body--row[rowid="${rowid}"]`) as HTMLTableCellElement
          let offsetTop = 0
          if (scrollYLoad) {
            if (isScrollYBig && trEl) {
              offsetTop = trEl.offsetTop + trEl.offsetHeight
            } else {
              offsetTop = rowRest.oTop + (rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight)
            }
          } else {
            if (trEl) {
              offsetTop = trEl.offsetTop + trEl.offsetHeight
            }
          }
          if (isScrollYBig) {
            offsetTop += scrollYTop
          }
          expandEl.style.top = toCssUnit(offsetTop)

          if (!isUpdateHeight) {
            if (rowRest.expandHeight !== expandHeight) {
              isUpdateHeight = true
            }
          }
          rowRest.expandHeight = expandHeight
        }
      })
      if (isUpdateHeight) {
        reactData.rowExpandHeightFlag++
        $xeTable.$nextTick(() => {
          updateRowOffsetTop($xeTable)
        })
      }
    }
  }
}

function handleRowExpandScroll ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const { elemStore } = internalData
  const rowExpandEl = $xeTable.$refs.refRowExpandElem as HTMLDivElement
  const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
  if (rowExpandEl && bodyScrollElem) {
    rowExpandEl.scrollTop = bodyScrollElem.scrollTop
  }
}

const Methods = {
  callSlot (slotFunc: any, params: any, h: any, vNodes: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    // const slots = $xeTable.$scopedSlots
    const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods

    if (slotFunc) {
      if ($xeGrid) {
        return $xeGrid.callSlot(slotFunc, params, h, vNodes)
      }
      // if (XEUtils.isString(slotFunc)) {
      //   slotFunc = slots[slotFunc] || null
      // }
      if (XEUtils.isFunction(slotFunc)) {
        return getSlotVNs(slotFunc.call(this, params, h, vNodes))
      }
    }
    return []
  },
  getEl () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return $xeTable.$refs.refElem as HTMLDivElement
  },
  /**
   * 获取父容器元素
   */
  getParentElem () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods

    const { $el } = this
    return $xeGrid ? $xeGrid.$el.parentNode : $el.parentNode
  },
  /**
   * 获取父容器的高度
   */
  getParentHeight () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods
    const props = $xeTable

    const { height } = props
    const el = $xeTable.$refs.refElem as HTMLDivElement
    if (el) {
      const parentElem = el.parentNode as HTMLElement
      const parentPaddingSize = height === '100%' || height === 'auto' ? getPaddingTopBottomSize(parentElem) : 0
      let parentWrapperHeight = 0
      if (parentElem) {
        if ($xeGrid && hasClass(parentElem, 'vxe-grid--table-wrapper')) {
          parentWrapperHeight = $xeGrid.getParentHeight()
        } else {
          parentWrapperHeight = parentElem.clientHeight
        }
      }
      return Math.floor(parentWrapperHeight - parentPaddingSize)
    }
    return 0
  },
  /**
   * 获取需要排除的高度
   * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
   * 如果存在表尾合计滚动条，则需要排除滚动条高度
   */
  getExcludeHeight () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods

    return $xeGrid ? $xeGrid.getExcludeHeight() : 0
  },
  /**
   * 重置表格的一切数据状态
   */
  clearAll () {
    return clearTableAllStatus(this)
  },
  handleUpdateRowGroup (groupFields: any[]) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    handleUpdateRowGroup($xeTable, groupFields)
  },
  /**
   * 同步 data 数据（即将废弃）
   * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   */
  syncData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    errLog('vxe.error.delFunc', ['syncData', 'getData'])
    return $xeTable.$nextTick().then(() => {
      reactData.tableData = []
      return $xeTable.$nextTick().then(() => loadTableData($xeTable, internalData.tableFullData, true))
    })
  },
  /**
   * 手动处理数据，用于手动排序与筛选
   * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
   */
  updateData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { scrollXLoad, scrollYLoad } = reactData
    return $xeTable.handleTableData(true).then(() => {
      $xeTable.updateFooter()
      if (scrollXLoad || scrollYLoad) {
        if (scrollXLoad) {
          $xeTable.updateScrollXSpace()
        }
        if (scrollYLoad) {
          $xeTable.updateScrollYSpace()
        }
        return $xeTable.refreshScroll()
      }
    }).then(() => {
      $xeTable.updateCellAreas()
      return $xeTable.recalculate(true)
    }).then(() => {
      // 存在滚动行为未结束情况
      setTimeout(() => $xeTable.recalculate(), 50)
    })
  },
  handleTableData (force: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { scrollYLoad } = reactData
    const { scrollYStore, fullDataRowIdData } = internalData
    let fullList: any[] = internalData.afterFullData
    // 是否进行数据处理
    if (force) {
      // 更新数据，处理筛选和排序
      updateAfterFullData($xeTable)
      // 如果为虚拟树，将树结构拍平
      fullList = handleVirtualTreeToList($xeTable)
    }
    const tableData = scrollYLoad ? fullList.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullList.slice(0)
    const visibleDataRowIdMaps: Record<string, any> = {}
    tableData.forEach((row, $index) => {
      const rowid = getRowid($xeTable, row)
      const rest = fullDataRowIdData[rowid]
      if (rest) {
        rest.$index = $index
      }
      visibleDataRowIdMaps[rowid] = row
    })
    reactData.tableData = tableData
    internalData.visibleDataRowIdData = visibleDataRowIdMaps
    return $xeTable.$nextTick()
  },
  /**
   * 加载表格数据
   * @param {Array} datas 数据
   */
  loadTableData (datas: any[], isReset: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return loadTableData($xeTable, datas, isReset)
  },
  /**
   * 重新加载数据，不会清空表格状态
   * @param {Array} datas 数据
   */
  loadData (datas: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const { initStatus } = this
    return loadTableData($xeTable, datas, false).then(() => {
      this.inited = true
      this.initStatus = true
      if (!initStatus) {
        handleLoadDefaults($xeTable)
      }
      return this.recalculate()
    })
  },
  /**
   * 重新加载数据，会清空表格状态
   * @param {Array} datas 数据
   */
  reloadData (datas: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return this.clearAll()
      .then(() => {
        this.inited = true
        this.initStatus = true
        return loadTableData($xeTable, datas, true)
      })
      .then(() => {
        handleLoadDefaults($xeTable)
        return this.recalculate()
      })
  },
  /**
   * 修改行数据
   */
  setRow (rows: any, record: any) {
    if (record) {
      let rest = rows
      if (!XEUtils.isArray(rows)) {
        rest = [rows]
      }
      rest.forEach((item:any) => Object.assign(item, record))
    }
    return this.$nextTick()
  },
  /**
   * 局部加载行数据并恢复到初始状态
   * 对于行数据需要局部更改的场景中可能会用到
   * @param {Row} row 行对象
   * @param {Object} record 新数据
   * @param {String} field 字段名
   */
  reloadRow (row: any, record: any, field: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { keepSource } = props
    const { tableData } = reactData
    const { sourceDataRowIdData } = internalData
    if (keepSource) {
      if ($xeTable.isAggregateRecord(row)) {
        return $xeTable.$nextTick()
      }
      const oRow = sourceDataRowIdData[getRowid($xeTable, row)]
      if (oRow && row) {
        if (field) {
          const newValue = XEUtils.clone(XEUtils.get(record || row, field), true)
          XEUtils.set(row, field, newValue)
          XEUtils.set(oRow, field, newValue)
        } else {
          const rowkey = getRowkey($xeTable)
          const rowid = getRowid($xeTable, row)
          const newRecord = XEUtils.clone(Object.assign({}, record), true)
          XEUtils.set(newRecord, rowkey, rowid)
          XEUtils.destructuring(oRow, Object.assign(row, newRecord))
        }
      }
      reactData.tableData = tableData.slice(0)
    } else {
      errLog('vxe.error.reqProp', ['keep-source'])
    }
    return $xeTable.$nextTick()
  },
  /**
   * 加载列配置
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  loadColumn (columns: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { lastScrollLeft, lastScrollTop } = internalData
    const collectColumn = XEUtils.mapTree(columns, column => Cell.createColumn($xeTable, column), { children: 'children' })
    return handleColumn($xeTable, collectColumn).then(() => {
      let targetScrollLeft = lastScrollLeft
      let targetScrollTop = lastScrollTop
      const virtualXOpts = $xeTable.computeVirtualXOpts
      const virtualYOpts = $xeTable.computeVirtualYOpts
      // 是否在更新数据之后自动滚动重置滚动条
      if (virtualXOpts.scrollToLeftOnChange) {
        targetScrollLeft = 0
      }
      if (virtualYOpts.scrollToTopOnChange) {
        targetScrollTop = 0
      }
      restoreScrollLocation($xeTable, targetScrollLeft, targetScrollTop)
    })
  },
  /**
   * 加载列配置并恢复到初始状态
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  reloadColumn (columns: any) {
    return this.clearAll().then(() => {
      return this.loadColumn(columns)
    })
  },
  handleColumn (collectColumn: any[]) {
    const $xeTable = this

    return handleColumn($xeTable, collectColumn)
  },
  /**
   * 更新数据行的 Map
   */
  cacheRowMap (isReset: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { isRowGroupStatus } = reactData
    const { fullAllDataRowIdData, tableFullData, tableFullTreeData, tableFullGroupData, treeExpandedMaps } = internalData
    const fullAllDataRowIdMaps: Record<string, VxeTableDefines.RowCacheItem> = isReset ? {} : { ...fullAllDataRowIdData } // 存在已删除数据
    const fullDataRowIdMaps: Record<string, VxeTableDefines.RowCacheItem> = {}

    const { handleUpdateRowId } = createHandleUpdateRowId($xeTable)
    const handleRowCache = (row: any, index: number, items: any, currIndex: number, parentRow: any, rowid: string, level: number, seq: string | number) => {
      let rowRest = fullAllDataRowIdMaps[rowid]
      if (!rowRest) {
        rowRest = { row, rowid, seq, index: -1, _index: -1, $index: -1, treeIndex: index, items, parent: parentRow, level, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
      }
      rowRest.treeLoaded = false
      rowRest.expandLoaded = false

      rowRest.row = row
      rowRest.items = items
      rowRest.parent = parentRow
      rowRest.level = level
      rowRest.index = currIndex
      rowRest.treeIndex = index

      fullDataRowIdMaps[rowid] = rowRest
      fullAllDataRowIdMaps[rowid] = rowRest
    }

    if (treeConfig) {
      const treeOpts = $xeTable.computeTreeOpts
      const { lazy } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
      XEUtils.eachTree(tableFullTreeData, (row, index, items, path, parentRow, nodes) => {
        const rowid = handleUpdateRowId(row)
        if (treeConfig && lazy) {
          if (row[hasChildField] && row[childrenField] === undefined) {
            row[childrenField] = null
          }
          if (treeExpandedMaps[rowid]) {
            if (!row[childrenField] || !row[childrenField].length) {
              delete treeExpandedMaps[rowid]
            }
          }
        }
        handleRowCache(row, index, items, parentRow ? -1 : index, parentRow, rowid, nodes.length - 1, toTreePathSeq(path))
      }, { children: childrenField })
    } else if (isRowGroupStatus) {
      const aggregateOpts = $xeTable.computeAggregateOpts
      const { mapChildrenField } = aggregateOpts
      XEUtils.eachTree(tableFullGroupData, (row, index, items, path, parentRow, nodes) => {
        const rowid = handleUpdateRowId(row)
        handleRowCache(row, index, items, parentRow ? -1 : index, parentRow, rowid, nodes.length - 1, toTreePathSeq(path))
      }, { children: mapChildrenField })
    } else {
      tableFullData.forEach((row, index, items) => {
        handleRowCache(row, index, items, index, null, handleUpdateRowId(row), 0, index + 1)
      })
    }

    internalData.fullDataRowIdData = fullDataRowIdMaps
    internalData.fullAllDataRowIdData = fullAllDataRowIdMaps
    reactData.treeExpandedFlag++
  },
  cacheSourceMap (fullData: any[]) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const treeOpts = $xeTable.computeTreeOpts
    const sourceData = XEUtils.clone(fullData, true)
    const { handleUpdateRowId } = createHandleUpdateRowId($xeTable)
    const sourceRowIdData: Record<string, any> = {}
    const handleSourceRow = (row: any) => {
      const rowid = handleUpdateRowId(row)
      sourceRowIdData[rowid] = row
    }
    // 源数据缓存
    if (treeConfig) {
      const childrenField = treeOpts.children || treeOpts.childrenField
      XEUtils.eachTree(sourceData, handleSourceRow, { children: treeOpts.transform ? treeOpts.mapChildrenField : childrenField })
    } else {
      sourceData.forEach(handleSourceRow)
    }
    internalData.sourceDataRowIdData = sourceRowIdData
    internalData.tableSourceData = sourceData
  },
  getParams () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable

    return props.params
  },
  loadTreeChildren (row: any, childRecords: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { keepSource } = props
    const { tableSourceData, fullDataRowIdData, fullAllDataRowIdData, sourceDataRowIdData } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, mapChildrenField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const parentRest = fullAllDataRowIdData[getRowid($xeTable, row)]
    const parentLevel = parentRest ? parentRest.level : 0
    return this.createData(childRecords).then((rows: any) => {
      if (keepSource) {
        const rowid = getRowid(this, row)
        const matchObj = XEUtils.findTree(tableSourceData, (item) => rowid === getRowid(this, item), { children: childrenField })
        if (matchObj) {
          matchObj.item[childrenField] = XEUtils.clone(rows, true)
        }
        rows.forEach((childRow: any) => {
          const rowid = getRowid(this, childRow)
          sourceDataRowIdData[rowid] = XEUtils.clone(childRow, true)
        })
      }
      XEUtils.eachTree(rows, (childRow, index, items, path, parentItem, nodes) => {
        const rowid = getRowid($xeTable, childRow)
        const parentRow = parentItem || parentRest.row
        const rest = { row: childRow, rowid, seq: -1, index, _index: -1, $index: -1, treeIndex: -1, items, parent: parentRow, level: parentLevel + nodes.length, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
        fullDataRowIdData[rowid] = rest
        fullAllDataRowIdData[rowid] = rest
      }, { children: childrenField })
      row[childrenField] = rows
      if (transform) {
        row[mapChildrenField] = XEUtils.clone(rows, false)
      }
      updateAfterDataIndex($xeTable)
      return rows
    })
  },
  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param {Element} tr 元素
   */
  getRowNode (tr: HTMLElement) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    if (tr) {
      const { fullAllDataRowIdData } = internalData
      const rowid = tr.getAttribute('rowid')
      if (rowid) {
        const rowRest = fullAllDataRowIdData[rowid]
        if (rowRest) {
          return {
            rowid: rowRest.rowid,
            item: rowRest.row,
            index: rowRest.index,
            items: rowRest.items,
            parent: rowRest.parent
          }
        }
      }
    }
    return null
  },
  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param {Element} cell 元素
   */
  getColumnNode (cell: HTMLElement) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    if (cell) {
      const { fullColumnIdData } = internalData
      const colid = cell.getAttribute('colid')
      if (colid) {
        const colRest = fullColumnIdData[colid]
        if (colRest) {
          return {
            colid: colRest.colid,
            item: colRest.column,
            index: colRest.index,
            items: colRest.items,
            parent: colRest.parent
          }
        }
      }
    }
    return null
  },
  /**
   * 根据 row 获取序号
   * @param {Row} row 行对象
   */
  getRowSeq: createGetRowCacheProp('seq'),
  /**
   * 根据 row 获取相对于 data 中的索引
   * @param {Row} row 行对象
   */
  getRowIndex: createGetRowCacheProp('index') as ((row: any) => number),
  /**
   * 根据 row 获取相对于当前数据中的索引
   * @param {Row} row 行对象
   */
  getVTRowIndex: createGetRowCacheProp('_index') as ((row: any) => number),
  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param {Row} row 行对象
   */
  getVMRowIndex: createGetRowCacheProp('$index') as ((row: any) => number),
  // 在 v3 中废弃
  _getRowIndex (row: any) {
    warnLog('vxe.error.delFunc', ['_getRowIndex', 'getVTRowIndex'])
    return this.getVTRowIndex(row)
  },
  // 在 v3 中废弃
  $getRowIndex (row: any) {
    warnLog('vxe.error.delFunc', ['$getRowIndex', 'getVMRowIndex'])
    return this.getVMRowIndex(row)
  },
  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param {ColumnInfo} column 列配置
   */
  getColumnIndex: createGetColumnCacheProp('index'),
  /**
   * 根据 column 获取相对于当前表格列中的索引
   * @param {ColumnInfo} column 列配置
   */
  getVTColumnIndex: createGetColumnCacheProp('_index'),
  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param {ColumnInfo} column 列配置
   */
  getVMColumnIndex: createGetColumnCacheProp('$index'),
  // 在 v3 中废弃
  _getColumnIndex (column: any) {
    warnLog('vxe.error.delFunc', ['_getColumnIndex', 'getVTColumnIndex'])
    return this.getVTColumnIndex(column)
  },
  // 在 v3 中废弃
  $getColumnIndex (column: any) {
    warnLog('vxe.error.delFunc', ['$getColumnIndex', 'getVMColumnIndex'])
    return this.getVMColumnIndex(column)
  },
  /**
   * 判断是否为索引列
   * @param {ColumnInfo} column 列配置
   */
  isSeqColumn (column: any) {
    return column && column.type === 'seq'
  },
  /**
   * 定义行数据中的列属性，如果不存在则定义
   * @param {Row} records 行数据
   */
  defineField (records: any[]) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const expandOpts = $xeTable.computeExpandOpts
    const treeOpts = $xeTable.computeTreeOpts
    const radioOpts = $xeTable.computeRadioOpts
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const rowkey = getRowkey($xeTable)
    if (!XEUtils.isArray(records)) {
      records = [records || {}]
    }
    return records.map((record) => {
      internalData.tableFullColumn.forEach(column => {
        const { field, editRender } = column
        if (field && !XEUtils.has(record, field)) {
          let cellValue = null
          if (editRender) {
            const { defaultValue } = editRender
            if (XEUtils.isFunction(defaultValue)) {
              cellValue = defaultValue({ column })
            } else if (!XEUtils.isUndefined(defaultValue)) {
              cellValue = defaultValue
            }
          }
          XEUtils.set(record, field, cellValue)
        }
      })
      const otherFields = [radioOpts.labelField, checkboxOpts.checkField, checkboxOpts.labelField, expandOpts.labelField]
      otherFields.forEach((key) => {
        if (key && eqEmptyValue(XEUtils.get(record, key))) {
          XEUtils.set(record, key, null)
        }
      })
      if (treeConfig && treeOpts.lazy && XEUtils.isUndefined(record[childrenField])) {
        record[childrenField] = null
      }
      // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数
      if (eqEmptyValue(XEUtils.get(record, rowkey))) {
        XEUtils.set(record, rowkey, getRowUniqueId())
      }
      return record
    })
  },
  /**
   * 创建 data 对象
   * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
   * @param {Array} records 新数据
   */
  createData (records: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return $xeTable.$nextTick().then(() => {
      return $xeTable.defineField(records)
    })
  },
  /**
   * 创建 Row|Rows 对象
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param {Array/Object} records 新数据
   */
  createRow (records: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const isArr = XEUtils.isArray(records)
    if (!isArr) {
      records = [records]
    }
    return $xeTable.createData(records).then((rows: any) => isArr ? rows : rows[0])
  },
  /**
   * 还原数据
   * 如果不传任何参数，则还原整个表格
   * 如果传 row 则还原一行
   * 如果传 rows 则还原多行
   * 如果还额外传了 field 则还原指定的单元格数据
   */
  revertData (rows: any, field: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { keepSource, treeConfig } = props
    const { fullAllDataRowIdData, fullDataRowIdData, tableSourceData, sourceDataRowIdData, tableFullData, afterFullData, removeRowMaps } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const { transform } = treeOpts
    const { handleGetRowId } = createHandleGetRowId($xeTable)
    if (!keepSource) {
      errLog('vxe.error.reqProp', ['keep-source'])
      return $xeTable.$nextTick()
    }
    let targetRows = rows
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        targetRows = [rows]
      }
    } else {
      targetRows = XEUtils.toArray($xeTable.getUpdateRecords())
    }
    let reDelFlag = false
    if (targetRows.length) {
      targetRows.forEach((item: any) => {
        const rowid = handleGetRowId(item)
        const rowRest = fullAllDataRowIdData[rowid]
        if (rowRest) {
          const row = rowRest.row
          if (!$xeTable.isInsertByRow(row)) {
            const oRow = sourceDataRowIdData[rowid]
            if (oRow && row) {
              if (field) {
                XEUtils.set(row, field, XEUtils.clone(XEUtils.get(oRow, field), true))
              } else {
                XEUtils.destructuring(row, XEUtils.clone(oRow, true))
              }
              if (!fullDataRowIdData[rowid] && $xeTable.isRemoveByRow(row)) {
                if (removeRowMaps[rowid]) {
                  delete removeRowMaps[rowid]
                }
                tableFullData.unshift(row)
                afterFullData.unshift(row)
                reDelFlag = true
              }
            }
          }
        }
      })
    }
    if (rows) {
      if (reDelFlag) {
        reactData.removeRowFlag++
        $xeTable.updateFooter()
        $xeTable.cacheRowMap(false)
        $xeTable.handleTableData(treeConfig && transform)
        if (!(treeConfig && transform)) {
          $xeTable.updateAfterDataIndex()
        }
        $xeTable.checkSelectionStatus()
        if (reactData.scrollYLoad) {
          $xeTable.updateScrollYSpace()
        }
      }
      return $xeTable.$nextTick().then(() => {
        $xeTable.updateCellAreas()
        return $xeTable.recalculate()
      })
    }
    return $xeTable.reloadData(tableSourceData)
  },
  /**
   * 清空单元格内容
   * 如果不创参数，则清空整个表格内容
   * 如果传 row 则清空一行内容
   * 如果传 rows 则清空多行内容
   * 如果还额外传了 field 则清空指定单元格内容
   * @param {Array/Row} rows 行数据
   * @param {String} field 字段名
   */
  clearData (rows: any, field: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { tableFullData, visibleColumn } = internalData
    if (!arguments.length) {
      rows = tableFullData
    } else if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    if (field) {
      rows.forEach((row: any) => XEUtils.set(row, field, null))
    } else {
      rows.forEach((row: any) => {
        visibleColumn.forEach((column: any) => {
          if (column.field) {
            setCellValue(row, column, null)
          }
        })
      })
    }
    return $xeTable.$nextTick()
  },
  getCellElement (row: any, fieldOrColumn: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { elemStore } = internalData
    const column = handleFieldOrColumn($xeTable, fieldOrColumn)
    if (!column) {
      return null
    }
    const rowid = getRowid($xeTable, row)
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
    const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
    let bodyElem
    if (column) {
      if (column.fixed) {
        if (column.fixed === 'left') {
          if (leftScrollElem) {
            bodyElem = leftScrollElem
          }
        } else {
          if (rightScrollElem) {
            bodyElem = rightScrollElem
          }
        }
      }
      if (!bodyElem) {
        bodyElem = bodyScrollElem
      }
      if (bodyElem) {
        return bodyElem.querySelector(`.vxe-body--row[rowid="${rowid}"] .${column.id}`)
      }
    }
    return null
  },
  getCellLabel (row: any, fieldOrColumn: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (!column) {
      return null
    }
    const formatter = column.formatter
    const cellValue = getCellValue(row, column)
    let cellLabel = cellValue
    if (formatter) {
      let formatData
      const { fullAllDataRowIdData } = internalData
      const rowid = getRowid($xeTable, row)
      const colid = column.id
      const rowRest = fullAllDataRowIdData[rowid]
      if (rowRest) {
        formatData = rowRest.formatData
        if (!formatData) {
          formatData = fullAllDataRowIdData[rowid].formatData = {}
        }
        if (rowRest && formatData[colid]) {
          if (formatData[colid].value === cellValue) {
            return formatData[colid].label
          }
        }
      }
      const formatParams = { cellValue, row, rowIndex: this.getRowIndex(row), column, columnIndex: this.getColumnIndex(column) }
      if (XEUtils.isString(formatter)) {
        const gFormatOpts = formats.get(formatter)
        const tcFormatMethod = gFormatOpts ? (gFormatOpts.tableCellFormatMethod || gFormatOpts.cellFormatMethod) : null
        cellLabel = tcFormatMethod ? tcFormatMethod(formatParams) : ''
      } else if (XEUtils.isArray(formatter)) {
        const gFormatOpts = formats.get(formatter[0])
        const tcFormatMethod = gFormatOpts ? (gFormatOpts.tableCellFormatMethod || gFormatOpts.cellFormatMethod) : null
        cellLabel = tcFormatMethod ? tcFormatMethod(formatParams, ...formatter.slice(1)) : ''
      } else {
        cellLabel = formatter(formatParams)
      }
      if (formatData) {
        formatData[colid] = { value: cellValue, label: cellLabel }
      }
    }
    return cellLabel
  },
  /**
   * 检查是否为临时行数据
   */
  isInsertByRow (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const rowid = getRowid($xeTable, row)
    return !!reactData.insertRowFlag && !!internalData.insertRowMaps[rowid]
  },
  isRemoveByRow (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const rowid = getRowid($xeTable, row)
    return !!reactData.removeRowFlag && !!internalData.removeRowMaps[rowid]
  },
  /**
   * 删除所有新增的临时数据
   */
  removeInsertRow () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { insertRowMaps } = internalData
    return $xeTable.remove(XEUtils.values(insertRowMaps))
  },
  /**
   * 检查行或列数据是否发生改变
   */
  isUpdateByRow (rowOrId: any, field?: string | null) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { keepSource } = props
    const { tableFullColumn, fullDataRowIdData, sourceDataRowIdData } = internalData
    if (keepSource) {
      const rowid = XEUtils.isString(rowOrId) || XEUtils.isNumber(rowOrId) ? rowOrId : getRowid($xeTable, rowOrId)
      const rowRest = fullDataRowIdData[rowid]
      // 新增的数据不需要检测
      if (!rowRest) {
        return false
      }
      const row = rowRest.row
      const oRow = sourceDataRowIdData[rowid]
      if (oRow) {
        if (arguments.length > 1) {
          return !eqCellValue(oRow, row, field as string)
        }
        for (let index = 0, len = tableFullColumn.length; index < len; index++) {
          const property = tableFullColumn[index].field
          if (property && !eqCellValue(oRow, row, property)) {
            return true
          }
        }
      }
    }
    return false
  },
  /**
   * 获取表格的可视列，也可以指定索引获取列
   * @param {Number} columnIndex 索引
   */
  getColumns (columnIndex: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { visibleColumn } = internalData
    return XEUtils.isUndefined(columnIndex) ? visibleColumn.slice(0) : visibleColumn[columnIndex]
  },
  /**
   * 根据列获取列的唯一主键
   */
  getColid (fieldOrColumn: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const column = handleFieldOrColumn($xeTable, fieldOrColumn)
    return column ? column.id : null
  },
  /**
   * 根据列的唯一主键获取列
   * @param {String} colid 列主键
   */
  getColumnById (colid: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fullColumnIdData } = internalData
    return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null
  },
  /**
   * 根据列的字段名获取列
   * @param {String} field 字段名
   */
  getColumnByField (field: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fullColumnFieldData } = internalData
    return fullColumnFieldData[field] ? fullColumnFieldData[field].column : null
  },
  getParentColumn (fieldOrColumn: any) {
    const fullColumnIdData = this.fullColumnIdData
    const column = handleFieldOrColumn(this, fieldOrColumn)
    return column && column.parentId && fullColumnIdData[column.parentId] ? fullColumnIdData[column.parentId].column : null
  },
  /**
   * 获取当前表格的列
   * 收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
   */
  getTableColumn () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    return {
      collectColumn: internalData.collectColumn.slice(0),
      fullColumn: internalData.tableFullColumn.slice(0),
      visibleColumn: internalData.visibleColumn.slice(0),
      tableColumn: reactData.tableColumn.slice(0)
    }
  },
  /**
   * 移动列到指定列的位置
   * @param fieldOrColumn
   * @param targetFieldOrColumn
   * @param options
   */
  moveColumnTo (fieldOrColumn: VxeTableDefines.ColumnInfo, targetFieldOrColumn: VxeTableDefines.ColumnInfo, options?: {
    isCrossDrag?: boolean
    dragToChild?: boolean;
    dragPos?: 'left' | 'right' | '' | null;
  }) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fullColumnIdData, visibleColumn } = internalData
    const { dragToChild, dragPos, isCrossDrag } = Object.assign({}, options)
    const dragCol = handleFieldOrColumn($xeTable, fieldOrColumn)
    let prevDragCol: VxeTableDefines.ColumnInfo | null = null
    const colRest = dragCol ? fullColumnIdData[dragCol.id] : null
    let defPos: 'left' | 'right' = 'left'
    if (XEUtils.isNumber(targetFieldOrColumn)) {
      if (colRest && targetFieldOrColumn) {
        let currList = colRest.items
        let offsetIndex = colRest._index + targetFieldOrColumn
        if (isCrossDrag) {
          currList = visibleColumn
          offsetIndex = colRest._index + targetFieldOrColumn
        }
        if (offsetIndex > 0 && offsetIndex < currList.length - 1) {
          prevDragCol = currList[offsetIndex]
        }
        if (targetFieldOrColumn > 0) {
          defPos = 'right'
        }
      }
    } else {
      prevDragCol = handleFieldOrColumn($xeTable, targetFieldOrColumn)
      const targetColRest = prevDragCol ? fullColumnIdData[prevDragCol.id] : null
      if (colRest && targetColRest) {
        if (targetColRest._index > colRest._index) {
          defPos = 'right'
        }
      }
    }
    return $xeTable.handleColDragSwapEvent(null, true, dragCol, prevDragCol, dragPos || defPos, dragToChild === true)
  },
  /**
   * 移动行到指定行的位置
   * @param rowidOrRow
   * @param targetRowidOrRow
   * @param options
   */
  moveRowTo (rowidOrRow: any, targetRowidOrRow: any, options?: {
    isCrossDrag?: boolean
    dragToChild?: boolean;
    dragPos?: 'top' | 'bottom' | '' | null;
  }) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { fullAllDataRowIdData, afterFullData } = internalData
    const { dragToChild, dragPos, isCrossDrag } = Object.assign({}, options)
    const treeOpts = $xeTable.computeTreeOpts
    const dragRow = handleRowidOrRow($xeTable, rowidOrRow)
    let prevDragRow: any = null
    let defPos: 'top' | 'bottom' = 'top'
    const rowRest = dragRow ? fullAllDataRowIdData[getRowid($xeTable, dragRow)] : null
    if (XEUtils.isNumber(targetRowidOrRow)) {
      if (rowRest && targetRowidOrRow) {
        let currList = afterFullData
        let offsetIndex = rowRest._index + targetRowidOrRow
        if (treeConfig) {
          currList = rowRest.items
          if (treeOpts.transform) {
            offsetIndex = rowRest.treeIndex + targetRowidOrRow
            if (isCrossDrag) {
              currList = afterFullData
              offsetIndex = rowRest._index + targetRowidOrRow
            }
          }
        }
        if (offsetIndex >= 0 && offsetIndex <= currList.length - 1) {
          prevDragRow = currList[offsetIndex]
        }
        if (targetRowidOrRow > 0) {
          defPos = 'bottom'
        }
      }
    } else {
      prevDragRow = handleRowidOrRow($xeTable, targetRowidOrRow)
      const targetRowRest = prevDragRow ? fullAllDataRowIdData[getRowid($xeTable, prevDragRow)] : null
      if (rowRest && targetRowRest) {
        if (targetRowRest._index > rowRest._index) {
          defPos = 'bottom'
        }
      }
    }
    return $xeTable.handleRowDragSwapEvent(null, true, dragRow, prevDragRow, dragPos || defPos, dragToChild === true)
  },
  /**
   * 获取表格的全量列
   */
  getFullColumns () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { collectColumn } = internalData
    return collectColumn.slice(0)
  },
  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData (rowIndex: any) {
    const tableSynchData = this.data || this.tableSynchData
    return XEUtils.isUndefined(rowIndex) ? tableSynchData.slice(0) : tableSynchData[rowIndex]
  },
  /**
   * 用于多选行，获取已选中的数据
   */
  getCheckboxRecords (isFull: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { updateCheckboxFlag } = reactData
    const { tableFullData, afterFullData, tableFullTreeData, fullDataRowIdData, afterFullRowMaps, selectCheckboxMaps } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { transform, mapChildrenField } = treeOpts
    const { checkField } = checkboxOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    let rowList: any[] = []
    if (updateCheckboxFlag) {
      if (checkField) {
        if (treeConfig) {
          const currTableData = isFull ? (transform ? tableFullTreeData : tableFullData) : (transform ? tableFullTreeData : afterFullData)
          rowList = XEUtils.filterTree(currTableData, row => XEUtils.get(row, checkField), { children: transform ? mapChildrenField : childrenField })
        } else {
          const currTableData = isFull ? tableFullData : afterFullData
          rowList = currTableData.filter((row) => XEUtils.get(row, checkField))
        }
      } else {
        const currMaps = isFull || (treeConfig && !transform) ? fullDataRowIdData : afterFullRowMaps
        XEUtils.each(selectCheckboxMaps, (row, rowid) => {
          if (currMaps[rowid]) {
            rowList.push(fullDataRowIdData[rowid].row)
          }
        })
      }
    }
    return rowList
  },
  /**
   * 预编译
   * 对渲染中的数据提前解析序号及索引。牺牲提前编译耗时换取渲染中额外损耗，使运行时更加流畅
   */
  updateAfterDataIndex () {
    const $xeTable = this

    updateAfterDataIndex($xeTable)
  },
  /**
   * 只对 tree-config 有效，获取行的子级
   */
  getTreeRowChildren (rowOrRowid: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { fullAllDataRowIdData } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, mapChildrenField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    if (rowOrRowid && treeConfig) {
      let rowid
      if (XEUtils.isString(rowOrRowid)) {
        rowid = rowOrRowid
      } else {
        rowid = getRowid($xeTable, rowOrRowid)
      }
      if (rowid) {
        const rest = fullAllDataRowIdData[rowid]
        const row = rest ? rest.row : null
        if (row) {
          return row[transform ? mapChildrenField : childrenField] || []
        }
      }
    }
    return []
  },
  /**
   * 只对 tree-config 有效，获取行的父级
   */
  getTreeParentRow (rowOrRowid: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { fullAllDataRowIdData } = internalData
    if (rowOrRowid && treeConfig) {
      let rowid
      if (XEUtils.isString(rowOrRowid)) {
        rowid = rowOrRowid
      } else {
        rowid = getRowid($xeTable, rowOrRowid)
      }
      if (rowid) {
        const rest = fullAllDataRowIdData[rowid]
        return rest ? rest.parent : null
      }
    }
    return null
  },
  getParentRow (rowOrRowid: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    warnLog('vxe.error.delFunc', ['getParentRow', 'getTreeParentRow'])
    return $xeTable.getTreeParentRow(rowOrRowid)
  },
  /**
   * 根据行的唯一主键获取行
   * @param {String/Number} rowid 行主键
   */
  getRowById (cellValue: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData } = internalData
    const rowid = XEUtils.eqNull(cellValue) ? '' : encodeURIComponent(cellValue)
    return fullAllDataRowIdData[rowid] ? fullAllDataRowIdData[rowid].row : null
  },
  /**
   * 根据行获取行的唯一主键
   * @param {Row} row 行对象
   */
  getRowid (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return getRowid($xeTable, row)
  },
  /**
   * 获取处理后的表格数据
   * 如果存在筛选条件，继续处理
   * 如果存在排序，继续处理
   */
  getTableData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { tableData, footerTableData } = reactData
    const { tableFullData, afterFullData, tableFullTreeData } = internalData
    return {
      fullData: props.treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0),
      visibleData: afterFullData.slice(0),
      tableData: tableData.slice(0),
      footerData: footerTableData.slice(0)
    }
  },
  /**
   * 获取表格的全量数据，如果是 tree-config 则返回带层级的树结构
   */
  getFullData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { tableFullData, tableFullTreeData } = internalData
    if (treeConfig) {
      const treeOpts = $xeTable.computeTreeOpts
      const { transform, mapChildrenField, rowField, parentField } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      if (transform) {
        return XEUtils.toArrayTree(
          XEUtils.toTreeArray(tableFullTreeData, {
            children: mapChildrenField
          }),
          {
            key: rowField,
            parentKey: parentField,
            children: childrenField,
            mapChildren: mapChildrenField
          }
        )
      }
      return tableFullTreeData.slice(0)
    }
    return tableFullData.slice(0)
  },
  /**
   * 处理数据加载默认行为
   * 默认执行一次，除非被重置
   */
  handleLoadDefaults () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    handleLoadDefaults($xeTable)
  },
  /**
   * 处理初始化的默认行为
   * 只会执行一次
   */
  handleInitDefaults () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    handleInitDefaults($xeTable)
  },
  /**
   * 设置为固定列
   */
  setColumnFixed (fieldOrColumn: any, fixed: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    let status = false
    const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
    const columnOpts = $xeTable.computeColumnOpts
    const isMaxFixedColumn = $xeTable.computeIsMaxFixedColumn
    for (let i = 0; i < cols.length; i++) {
      const item = cols[i]
      const column = handleFieldOrColumn($xeTable, item)
      const targetColumn = getRootColumn($xeTable, column as any)
      if (targetColumn && targetColumn.fixed !== fixed) {
        // 是否超过最大固定列数量
        if (!targetColumn.fixed && isMaxFixedColumn) {
          if (VxeUI.modal) {
            VxeUI.modal.message({
              status: 'error',
              content: getI18n('vxe.table.maxFixedCol', [columnOpts.maxFixedSize])
            })
          }
          return $xeTable.$nextTick()
        }
        XEUtils.eachTree([targetColumn], (column) => {
          column.fixed = fixed
          column.renderFixed = fixed
        })
        $xeTable.saveCustomStore('update:fixed')
        if (!status) {
          status = true
        }
      }
    }
    if (status) {
      return $xeTable.refreshColumn()
    }
    return $xeTable.$nextTick()
  },
  /**
   * 取消指定固定列
   */
  clearColumnFixed (fieldOrColumn: string | string[] | VxeTableDefines.ColumnInfo | VxeTableDefines.ColumnInfo[]) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    let status = false
    const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
    cols.forEach(item => {
      const column = handleFieldOrColumn($xeTable, item)
      const targetColumn = getRootColumn($xeTable, column as any)
      if (targetColumn && targetColumn.fixed) {
        XEUtils.eachTree([targetColumn], (column) => {
          column.fixed = null
          column.renderFixed = null
        })
        $xeTable.saveCustomStore('update:fixed')
        if (!status) {
          status = true
        }
      }
    })
    if (status) {
      return $xeTable.refreshColumn()
    }
    return $xeTable.$nextTick()
  },
  /**
   * 隐藏指定列
   */
  hideColumn (fieldOrColumn: string | string[] | VxeTableDefines.ColumnInfo | VxeTableDefines.ColumnInfo[]) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    let status = false
    const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
    cols.forEach(item => {
      const column = handleFieldOrColumn($xeTable, item)
      if (column && column.visible) {
        column.visible = false
        if (!status) {
          status = true
        }
      }
    })
    if (status) {
      return $xeTable.handleCustom()
    }
    return $xeTable.$nextTick()
  },
  /**
   * 显示指定列
   */
  showColumn (fieldOrColumn: string | string[] | VxeTableDefines.ColumnInfo | VxeTableDefines.ColumnInfo[]) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    let status = false
    const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
    cols.forEach(item => {
      const column = handleFieldOrColumn($xeTable, item)
      if (column && !column.visible) {
        column.visible = true
        if (!status) {
          status = true
        }
      }
    })
    if (status) {
      return $xeTable.handleCustom()
    }
    return $xeTable.$nextTick()
  },
  setColumnWidth (fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | VxeColumnPropTypes.Field[] | VxeTableDefines.ColumnInfo[], width: number | string) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { elemStore } = internalData
    let status = false
    const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
    let cWidth = XEUtils.toInteger(width)
    if (isScale(width)) {
      const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
      const bodyWidth = bodyScrollElem ? bodyScrollElem.clientWidth - 1 : 0
      cWidth = Math.floor(cWidth * bodyWidth)
    }
    if (cWidth) {
      cols.forEach(item => {
        const column = handleFieldOrColumn($xeTable, item)
        if (column) {
          column.resizeWidth = cWidth
          if (!status) {
            status = true
          }
        }
      })
      if (status) {
        return $xeTable.refreshColumn().then(() => {
          return { status }
        })
      }
    }
    return $xeTable.$nextTick().then(() => {
      return { status }
    })
  },
  getColumnWidth (fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      return column.renderWidth
    }
    return 0
  },
  /**
   * 手动重置列的显示隐藏、列宽拖动的状态；
   * 如果为 true 则重置所有状态
   * 如果已关联工具栏，则会同步更新
   */
  resetColumn (options?: boolean | {
    visible?: boolean
    resizable?: boolean
    fixed?: boolean
    order?: boolean
  }) {
    warnLog('vxe.error.delFunc', ['resetColumn', 'resetCustom'])
    return this.resetCustom(options)
  },
  handleCustom () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable

    const { mouseConfig } = props
    if (mouseConfig) {
      if ($xeTable.clearSelected) {
        $xeTable.clearSelected()
      }
      if ($xeTable.clearCellAreas) {
        $xeTable.clearCellAreas()
        $xeTable.clearCopyCellArea()
      }
    }
    $xeTable.analyColumnWidth()
    return $xeTable.refreshColumn(true)
  },
  /**
   * 还原自定义列操作状态
   */
  restoreCustomStorage () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable

    const { customConfig } = props
    const tableId = $xeTable.computeTableId
    const customOpts = $xeTable.computeCustomOpts
    const { storage, restoreStore } = customOpts
    const isAllCustom = storage === true
    const storageOpts: VxeTableDefines.VxeTableCustomStorageObj = isAllCustom ? {} : Object.assign({}, storage || {})
    const isCustomResizable = isAllCustom || storageOpts.resizable
    const isCustomVisible = isAllCustom || storageOpts.visible
    const isCustomFixed = isAllCustom || storageOpts.fixed
    const isCustomSort = isAllCustom || storageOpts.sort
    if ((customConfig ? isEnableConf(customOpts) : customOpts.enabled) && (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort)) {
      if (!tableId) {
        errLog('vxe.error.reqProp', ['id'])
        return
      }
      const storeData = getCustomStorageMap(tableId)
      if (restoreStore) {
        return Promise.resolve(
          restoreStore({ $table: $xeTable, id: tableId, type: 'restore', storeData })
        ).then(storeData => {
          if (!storeData) {
            return
          }
          return handleCustomRestore($xeTable, storeData)
        }).catch(e => e)
      } else {
        return handleCustomRestore($xeTable, storeData)
      }
    }
  },
  getCustomStoreData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { id } = props
    const customOpts = $xeTable.computeCustomOpts
    const { collectColumn } = internalData
    const { storage, checkMethod } = customOpts
    const isAllCustom = storage === true
    const storageOpts: VxeTableDefines.VxeTableCustomStorageObj = isAllCustom ? {} : Object.assign({}, storage || {})
    const isCustomResizable = isAllCustom || storageOpts.resizable
    const isCustomVisible = isAllCustom || storageOpts.visible
    const isCustomFixed = isAllCustom || storageOpts.fixed
    const isCustomSort = isAllCustom || storageOpts.sort
    const resizableData: Record<string, number> = {}
    const sortData: Record<string, number> = {}
    const visibleData: Record<string, boolean> = {}
    const fixedData: Record<string, VxeColumnPropTypes.Fixed> = {}
    const storeData: VxeTableDefines.CustomStoreData = {
      resizableData: undefined,
      sortData: undefined,
      visibleData: undefined,
      fixedData: undefined
    }
    if (!id) {
      errLog('vxe.error.reqProp', ['id'])
      return storeData
    }
    let hasResizable = 0
    let hasSort = 0
    let hasFixed = 0
    let hasVisible = 0
    XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn) => {
      const colKey = column.getKey()
      if (!colKey) {
        errLog('vxe.error.reqProp', [`${column.getTitle() || column.type || ''} -> column.field=?`])
        return
      }
      // 只支持一级
      if (!parentColumn) {
        if (isCustomSort) {
          hasSort = 1
          sortData[colKey] = column.renderSortNumber
        }
        if (isCustomFixed && column.fixed !== column.defaultFixed) {
          hasFixed = 1
          fixedData[colKey] = column.fixed
        }
      }
      if (isCustomResizable && column.resizeWidth) {
        hasResizable = 1
        resizableData[colKey] = column.renderWidth
      }
      if (isCustomVisible && (!checkMethod || checkMethod({ $table: $xeTable, column }))) {
        if (!column.visible && column.defaultVisible) {
          hasVisible = 1
          visibleData[colKey] = false
        } else if (column.visible && !column.defaultVisible) {
          hasVisible = 1
          visibleData[colKey] = true
        }
      }
    })
    if (hasResizable) {
      storeData.resizableData = resizableData
    }
    if (hasSort) {
      storeData.sortData = sortData
    }
    if (hasFixed) {
      storeData.fixedData = fixedData
    }
    if (hasVisible) {
      storeData.visibleData = visibleData
    }
    return storeData
  },
  saveCustomStore (type: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData

    const { customConfig } = props
    const tableId = $xeTable.computeTableId
    const customOpts = $xeTable.computeCustomOpts
    const { updateStore, storage } = customOpts
    const isAllCustom = storage === true
    const storageOpts = isAllCustom ? {} : Object.assign({}, storage || {})
    const isCustomResizable = isAllCustom || storageOpts.resizable
    const isCustomVisible = isAllCustom || storageOpts.visible
    const isCustomFixed = isAllCustom || storageOpts.fixed
    const isCustomSort = isAllCustom || storageOpts.sort
    if (type !== 'reset') {
      reactData.isCustomStatus = true
    }
    if ((customConfig ? isEnableConf(customOpts) : customOpts.enabled) && (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort)) {
      if (!tableId) {
        errLog('vxe.error.reqProp', ['id'])
        return this.$nextTick()
      }
      const storeData = type === 'reset'
        ? {
            resizableData: {},
            sortData: {},
            visibleData: {},
            fixedData: {}
          }
        : this.getCustomStoreData()
      if (updateStore) {
        return updateStore({
          $table: $xeTable,
          id: tableId,
          type,
          storeData
        })
      } else {
        setCustomStorageMap(tableId, type === 'reset' ? null : storeData)
      }
    }
    return this.$nextTick()
  },
  handleUpdateDataQueue () {
    this.upDataFlag++
  },
  handleRefreshColumnQueue () {
    this.reColumnFlag++
  },
  /**
   * 刷新列配置
   */
  refreshColumn (initSort?: boolean) {
    const $xeTable = this

    if (initSort) {
      handleUpdateColumn($xeTable)
    }
    return parseColumns($xeTable, true).then(() => {
      return this.refreshScroll()
    }).then(() => {
      return this.recalculate()
    })
  },
  /**
   * 指定列宽的列进行拆分
   */
  analyColumnWidth () {
    const { columnOpts } = this
    const { width: defaultWidth, minWidth: defaultMinWidth } = columnOpts
    const resizeList: any[] = []
    const pxList: any[] = []
    const pxMinList : any[] = []
    const autoMinList: any[] = []
    const scaleList : any[] = []
    const scaleMinList: any[] = []
    const autoList : any[] = []
    const remainList: any[] = []
    this.tableFullColumn.forEach((column: any) => {
      if (defaultWidth && !column.width) {
        column.width = defaultWidth
      }
      if (defaultMinWidth && !column.minWidth) {
        column.minWidth = defaultMinWidth
      }
      if (column.visible) {
        if (column.resizeWidth) {
          resizeList.push(column)
        } else if (column.width === 'auto') {
          autoList.push(column)
        } else if (isPx(column.width)) {
          pxList.push(column)
        } else if (isScale(column.width)) {
          scaleList.push(column)
        } else if (isPx(column.minWidth)) {
          pxMinList.push(column)
        } else if (column.minWidth === 'auto') {
          autoMinList.push(column)
        } else if (isScale(column.minWidth)) {
          scaleMinList.push(column)
        } else {
          remainList.push(column)
        }
      }
    })
    Object.assign(this.columnStore, { resizeList, pxList, pxMinList, autoMinList, scaleList, scaleMinList, autoList, remainList })
  },
  handleColResizeMousedownEvent (evnt: MouseEvent, fixedType: 'left' | 'right' | '', params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    evnt.stopPropagation()
    evnt.preventDefault()
    const { column } = params
    const { columnStore, overflowX, scrollbarHeight } = reactData
    const { elemStore, visibleColumn } = internalData
    const { leftList, rightList } = columnStore
    const resizableOpts = $xeTable.computeResizableOpts
    const osbHeight = overflowX ? scrollbarHeight : 0
    const tableEl = $xeTable.$refs.refElem as HTMLDivElement
    const leftContainerElem = $xeTable.$refs.refLeftContainer as HTMLDivElement
    const rightContainerElem = $xeTable.$refs.refRightContainer as HTMLDivElement
    const resizeBarElem = $xeTable.$refs.refColResizeBar as HTMLDivElement
    if (!resizeBarElem) {
      return
    }
    const isLeftFixed = fixedType === 'left'
    const isRightFixed = fixedType === 'right'
    const resizeTipElem = resizeBarElem.firstElementChild as HTMLDivElement
    const scrollbarXToTop = $xeTable.computeScrollbarXToTop
    const { clientX: dragClientX } = evnt
    const dragBtnElem = evnt.target as HTMLDivElement
    let resizeColumn = column
    if (column.children && column.children.length) {
      XEUtils.eachTree(column.children, childColumn => {
        resizeColumn = childColumn
      })
    }
    const cell = dragBtnElem.parentNode as HTMLTableCellElement
    const cellParams = Object.assign(params, { cell })
    let dragLeft = 0
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    if (!bodyScrollElem) {
      return
    }
    const tableRect = tableEl.getBoundingClientRect()
    const rightContainerRect = rightContainerElem ? rightContainerElem.getBoundingClientRect() : null
    const cellRect = cell.getBoundingClientRect()
    const dragBtnRect = dragBtnElem.getBoundingClientRect()

    const dragBtnWidth = dragBtnElem.clientWidth
    const dragBtnOffsetWidth = Math.floor(dragBtnWidth / 2)
    const dragPosLeft = dragBtnRect.x - tableRect.x + dragBtnOffsetWidth

    const minInterval = getColReMinWidth(cellParams) - dragBtnOffsetWidth // 列之间的最小间距
    const dragMinLeft = isRightFixed ? 0 : (cellRect.x - tableRect.x + dragBtnWidth + minInterval)
    const dragMaxLeft = cellRect.x - tableRect.x + cell.clientWidth - minInterval

    let fixedLeftRemainWidth = 0
    let fixedRightRemainWidth = 0
    if (isLeftFixed || isRightFixed) {
      let isMach = false
      const fixedColumn = isLeftFixed ? leftList : rightList
      for (let i = 0; i < fixedColumn.length; i++) {
        const item = fixedColumn[i]
        if (isMach) {
          fixedLeftRemainWidth += item.renderWidth
        } else {
          isMach = item.id === resizeColumn.id
          if (!isMach) {
            fixedRightRemainWidth += item.renderWidth
          }
        }
      }
    }

    // 处理拖动事件
    const updateEvent = (evnt: MouseEvent) => {
      evnt.stopPropagation()
      evnt.preventDefault()
      const tableHeight = tableEl.clientHeight
      const offsetX = evnt.clientX - dragClientX
      let left = dragPosLeft + offsetX

      if (isLeftFixed) {
        if (rightContainerRect) {
          left = Math.min(left, rightContainerRect.x - tableRect.x - fixedLeftRemainWidth - minInterval)
        }
      } else if (isRightFixed) {
        if (leftContainerElem) {
          left = Math.max(left, leftContainerElem.clientWidth + fixedRightRemainWidth + minInterval)
        }
        left = Math.min(left, dragMaxLeft)
      }

      dragLeft = Math.max(left, dragMinLeft)

      const resizeBarLeft = Math.max(1, dragLeft)
      resizeBarElem.style.left = `${resizeBarLeft}px`
      resizeBarElem.style.top = `${scrollbarXToTop ? osbHeight : 0}px`
      resizeBarElem.style.height = `${scrollbarXToTop ? tableHeight - osbHeight : tableHeight}px`
      if (resizableOpts.showDragTip && resizeTipElem) {
        resizeTipElem.textContent = getI18n('vxe.table.resizeColTip', [Math.floor(resizeColumn.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft))])
        const tableWrapperWidth = tableEl.clientWidth
        const resizeBarWidth = resizeBarElem.clientWidth
        const resizeTipWidth = resizeTipElem.clientWidth
        const resizeTipHeight = resizeTipElem.clientHeight
        let resizeTipLeft = -resizeTipWidth
        if (resizeBarLeft < resizeTipWidth + resizeBarWidth) {
          resizeTipLeft = 0
        } else if (resizeBarLeft > tableWrapperWidth) {
          resizeTipLeft += tableWrapperWidth - resizeBarLeft
        }
        resizeTipElem.style.left = `${resizeTipLeft}px`
        resizeTipElem.style.top = `${Math.min(tableHeight - resizeTipHeight, Math.max(0, evnt.clientY - tableRect.y - resizeTipHeight / 2))}px`
      }
      reactData.isDragResize = true
    }

    reactData.isDragResize = true
    addClass(tableEl, 'col-drag--resize')
    resizeBarElem.style.display = 'block'
    document.onmousemove = updateEvent
    document.onmouseup = function (evnt) {
      document.onmousemove = null
      document.onmouseup = null
      resizeBarElem.style.display = 'none'
      internalData._lastResizeTime = Date.now()

      setTimeout(() => {
        reactData.isDragResize = false
      }, 50)

      const resizeWidth = resizeColumn.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft)
      const resizeParams = { ...params, resizeWidth, resizeColumn }
      if (resizableOpts.dragMode === 'fixed') {
        visibleColumn.forEach(item => {
          if (item.id !== resizeColumn.id) {
            if (!item.resizeWidth) {
              item.resizeWidth = item.renderWidth
            }
          }
        })
      }

      if ($xeTable.handleColResizeCellAreaEvent) {
        $xeTable.handleColResizeCellAreaEvent(evnt, resizeParams)
      } else {
        resizeColumn.resizeWidth = resizeWidth
        handleUpdateColResize($xeTable, evnt, resizeParams)
      }
      removeClass(tableEl, 'col-drag--resize')
    }
    updateEvent(evnt)
    if ($xeTable.closeMenu) {
      $xeTable.closeMenu()
    }
  },
  handleColResizeDblclickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const resizableOpts = $xeTable.computeResizableOpts
    const { isDblclickAutoWidth } = resizableOpts
    const el = $xeTable.$refs.refElem as HTMLDivElement
    if (isDblclickAutoWidth && el) {
      evnt.stopPropagation()
      evnt.preventDefault()
      const { fullColumnIdData } = internalData
      const { column } = params
      let resizeColumn = column
      if (column.children && column.children.length) {
        XEUtils.eachTree(column.children, childColumn => {
          resizeColumn = childColumn
        })
      }
      const colid = resizeColumn.id
      const colRest = fullColumnIdData[colid]
      const dragBtnElem = evnt.target as HTMLDivElement
      const cell = dragBtnElem.parentNode as HTMLTableCellElement
      const cellParams = Object.assign(params, { cell })
      const colMinWidth = getColReMinWidth(cellParams)

      el.setAttribute('data-calc-col', 'Y')
      let resizeWidth = calcColumnAutoWidth(resizeColumn, el)
      el.removeAttribute('data-calc-col')
      if (colRest) {
        resizeWidth = Math.max(resizeWidth, colRest.width)
      }
      resizeWidth = Math.max(colMinWidth, resizeWidth)
      const resizeParams = { ...params, resizeWidth, resizeColumn }
      reactData.isDragResize = false
      internalData._lastResizeTime = Date.now()

      if ($xeTable.handleColResizeDblclickCellAreaEvent) {
        $xeTable.handleColResizeDblclickCellAreaEvent(evnt, resizeParams)
      } else {
        resizeColumn.resizeWidth = resizeWidth
        handleUpdateColResize($xeTable, evnt, resizeParams)
      }
    }
  },
  handleRowResizeMousedownEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    evnt.stopPropagation()
    evnt.preventDefault()
    const { row } = params
    const { overflowX, scrollbarWidth, overflowY, scrollbarHeight } = reactData
    const { elemStore, fullAllDataRowIdData } = internalData
    const osbWidth = overflowY ? scrollbarWidth : 0
    const osbHeight = overflowX ? scrollbarHeight : 0
    const scrollbarYToLeft = $xeTable.computeScrollbarYToLeft
    const resizableOpts = $xeTable.computeResizableOpts
    const rowOpts = $xeTable.computeRowOpts
    const cellOpts = $xeTable.computeCellOpts
    const tableEl = $xeTable.$refs.refElem as HTMLDivElement
    const resizeBarElem = $xeTable.$refs.refRowResizeBar as HTMLDivElement
    if (!resizeBarElem) {
      return
    }
    const { clientY: dragClientY } = evnt
    const resizeTipElem = resizeBarElem.firstElementChild as HTMLDivElement
    const dragBtnElem = evnt.currentTarget as HTMLDivElement
    const tdEl = dragBtnElem.parentNode as HTMLTableCellElement
    const trEl = tdEl.parentNode as HTMLTableCellElement
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    if (!bodyScrollElem) {
      return
    }
    const rowid = getRowid($xeTable, row)
    const rowRest = fullAllDataRowIdData[rowid]
    if (!rowRest) {
      return
    }
    const defaultRowHeight = $xeTable.computeDefaultRowHeight
    const currCellHeight = rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
    const tableRect = tableEl.getBoundingClientRect()
    const trRect = trEl.getBoundingClientRect()
    const targetOffsetY = dragClientY - trRect.y - trEl.clientHeight
    let resizeHeight = currCellHeight
    const cellEl = tdEl.querySelector('.vxe-cell')
    let cellMinHeight = 0
    if (cellEl) {
      const cellStyle = getComputedStyle(cellEl)
      cellMinHeight = Math.max(1, Math.ceil(XEUtils.toNumber(cellStyle.paddingTop) + XEUtils.toNumber(cellStyle.paddingBottom)))
    }
    const minTop = trRect.y - tableRect.y + cellMinHeight
    // 处理拖动事件
    const updateEvent = (evnt: MouseEvent) => {
      evnt.stopPropagation()
      evnt.preventDefault()
      const rtWidth = tableEl.clientWidth - osbWidth
      const tableHeight = tableEl.clientHeight - osbHeight
      let dragTop = evnt.clientY - tableRect.y - targetOffsetY
      if (dragTop < minTop) {
        dragTop = minTop
      } else {
        resizeHeight = Math.max(cellMinHeight, currCellHeight + evnt.clientY - dragClientY)
      }
      resizeBarElem.style.left = `${scrollbarYToLeft ? osbWidth : 0}px`
      resizeBarElem.style.top = `${dragTop}px`
      resizeBarElem.style.width = `${rtWidth}px`
      if (resizableOpts.showDragTip && resizeTipElem) {
        resizeTipElem.textContent = getI18n('vxe.table.resizeRowTip', [resizeHeight])
        const resizeTipWidth = resizeTipElem.clientWidth
        const resizeTipHeight = resizeTipElem.clientHeight
        let resizeBarLeft = Math.max(2, evnt.clientX - tableRect.x)
        let resizeBarTop = 0
        if (resizeBarLeft + resizeTipWidth >= rtWidth - 2) {
          resizeBarLeft = rtWidth - resizeTipWidth - 2
        }
        if (dragTop + resizeTipHeight >= tableHeight) {
          resizeBarTop = tableHeight - (dragTop + resizeTipHeight)
        }
        resizeTipElem.style.left = `${resizeBarLeft}px`
        resizeTipElem.style.top = `${resizeBarTop}px`
      }
      reactData.isDragResize = true
    }

    reactData.isDragResize = true
    addClass(tableEl, 'row-drag--resize')
    resizeBarElem.style.display = 'block'
    document.onmousemove = updateEvent
    document.onmouseup = function (evnt) {
      document.onmousemove = null
      document.onmouseup = null
      resizeBarElem.style.display = 'none'
      internalData._lastResizeTime = Date.now()

      setTimeout(() => {
        reactData.isDragResize = false
      }, 50)

      if (resizeHeight !== currCellHeight) {
        const resizeParams = { ...params, resizeHeight, resizeRow: row }
        internalData.isResizeCellHeight = true
        if ($xeTable.handleRowResizeCellAreaEvent) {
          $xeTable.handleRowResizeCellAreaEvent(evnt, resizeParams)
        } else {
          rowRest.resizeHeight = resizeHeight
          handleUpdateRowResize($xeTable, evnt, resizeParams)
          updateRowOffsetTop($xeTable)
        }
      }
      removeClass(tableEl, 'row-drag--resize')
    }
    updateEvent(evnt)
  },
  handleRowResizeDblclickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const resizableOpts = $xeTable.computeResizableOpts
    const { isDblclickAutoHeight } = resizableOpts
    const el = $xeTable.$refs.refElem as HTMLDivElement
    if (isDblclickAutoHeight && el) {
      evnt.stopPropagation()
      evnt.preventDefault()
      const { editStore } = reactData
      const { fullAllDataRowIdData } = internalData
      const { actived } = editStore
      const { row } = params
      const rowid = getRowid($xeTable, row)
      const rowRest = fullAllDataRowIdData[rowid]
      if (!rowRest) {
        return
      }
      const handleRsHeight = () => {
        const resizeHeight = calcCellAutoHeight(rowRest, el)
        const resizeParams = { ...params, resizeHeight, resizeRow: row }
        reactData.isDragResize = false
        internalData._lastResizeTime = Date.now()
        if ($xeTable.handleRowResizeDblclickCellAreaEvent) {
          $xeTable.handleRowResizeDblclickCellAreaEvent(evnt, resizeParams)
        } else {
          rowRest.resizeHeight = resizeHeight
          handleUpdateRowResize($xeTable, evnt, resizeParams)
        }
      }
      if (actived.row || actived.column) {
        $xeTable.clearEdit().then(handleRsHeight)
      } else {
        handleRsHeight()
      }
    }
  },
  setRowHeightConf (heightConf: Record<string, number>) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData } = internalData
    let status = false
    if (heightConf) {
      XEUtils.each(heightConf, (height, rowid) => {
        const rowRest = fullAllDataRowIdData[rowid]
        if (rowRest) {
          const rHeight = XEUtils.toInteger(height)
          if (rHeight) {
            rowRest.resizeHeight = rHeight
            if (!status) {
              status = true
            }
          }
        }
      })
      if (status) {
        internalData.isResizeCellHeight = true
        reactData.resizeHeightFlag++
      }
    }
    return $xeTable.$nextTick().then(() => {
      updateRowOffsetTop($xeTable)
      return { status }
    })
  },
  getRowHeightConf (isFull?: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData, afterFullData } = internalData
    const { handleGetRowId } = createHandleGetRowId($xeTable)
    const rowOpts = $xeTable.computeRowOpts
    const cellOpts = $xeTable.computeCellOpts
    const defaultRowHeight = $xeTable.computeDefaultRowHeight
    const rest: Record<string, number> = {}
    afterFullData.forEach(row => {
      const rowid = handleGetRowId(row)
      const rowRest = fullAllDataRowIdData[rowid]
      if (rowRest) {
        const resizeHeight = rowRest.resizeHeight
        if (resizeHeight || isFull) {
          const currCellHeight = resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
          rest[rowid] = currCellHeight
        }
      }
    })
    return rest
  },
  setRowHeight (rowOrId: any | any[], height: number) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData } = internalData
    let status = false
    const rows = XEUtils.isArray(rowOrId) ? rowOrId : [rowOrId]
    let rHeight = XEUtils.toInteger(height)
    if (isScale(height)) {
      const tableBody = $xeTable.$refs.refTableBody
      const bodyElem = tableBody ? (tableBody as any).$el as HTMLDivElement : null
      const bodyHeight = bodyElem ? bodyElem.clientHeight - 1 : 0
      rHeight = Math.floor(rHeight * bodyHeight)
    }
    if (rHeight) {
      const { handleGetRowId } = createHandleGetRowId($xeTable)
      rows.forEach(row => {
        const rowid = XEUtils.isString(row) || XEUtils.isNumber(row) ? row : handleGetRowId(row)
        const rowRest = fullAllDataRowIdData[rowid]
        if (rowRest) {
          rowRest.resizeHeight = rHeight
          if (!status) {
            status = true
          }
        }
      })
      if (status) {
        internalData.isResizeCellHeight = true
        reactData.resizeHeightFlag++
      }
    }
    return $xeTable.$nextTick()
  },
  getRowHeight (rowOrId: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData } = internalData
    const rowOpts = $xeTable.computeRowOpts
    const cellOpts = $xeTable.computeCellOpts
    const defaultRowHeight = $xeTable.computeDefaultRowHeight
    const rowid = XEUtils.isString(rowOrId) || XEUtils.isNumber(rowOrId) ? rowOrId : getRowid($xeTable, rowOrId)
    const rowRest = fullAllDataRowIdData[rowid]
    if (rowRest) {
      return rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
    }
    return 0
  },
  /**
   * 刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）
   */
  refreshScroll () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { elemStore, lastScrollLeft, lastScrollTop } = internalData
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
    const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    return new Promise<void>(resolve => {
      // 还原滚动条位置
      if (lastScrollLeft || lastScrollTop) {
        return restoreScrollLocation($xeTable, lastScrollLeft, lastScrollTop).then(() => {
          // 存在滚动行为未结束情况
          setTimeout(resolve, 10)
        })
      }
      internalData.intoRunScroll = true
      // 重置
      setScrollTop(yHandleEl, lastScrollTop)
      setScrollTop(bodyScrollElem, lastScrollTop)
      setScrollTop(leftScrollElem, lastScrollTop)
      setScrollTop(rightScrollElem, lastScrollTop)

      setScrollLeft(xHandleEl, lastScrollLeft)
      setScrollLeft(bodyScrollElem, lastScrollLeft)
      setScrollLeft(headerScrollElem, lastScrollLeft)
      setScrollLeft(footerScrollElem, lastScrollLeft)
      // 存在滚动行为未结束情况
      setTimeout(() => {
        internalData.intoRunScroll = false
        resolve()
      }, 10)
    })
  },
  /**
   * 重新渲染布局
   * 刷新布局
   */
  recalculate (reFull?: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    return new Promise<void>(resolve => {
      const { rceTimeout, rceRunTime } = internalData
      const resizeOpts = $xeTable.computeResizeOpts
      const refreshDelay = resizeOpts.refreshDelay || 20
      const el = $xeTable.$refs.refElem as HTMLElement
      if (el && el.clientWidth) {
        autoCellWidth($xeTable)
        updateRowExpandStyle($xeTable)
      }
      if (rceTimeout) {
        clearTimeout(rceTimeout)
        if (rceRunTime && rceRunTime + (refreshDelay - 5) < Date.now()) {
          resolve(
            handleRecalculateLayout($xeTable, !!reFull)
          )
        } else {
          $xeTable.$nextTick(() => {
            resolve()
          })
        }
      } else {
        resolve(
          handleRecalculateLayout($xeTable, !!reFull)
        )
      }
      internalData.rceTimeout = setTimeout(() => {
        internalData.rceTimeout = undefined
        handleRecalculateLayout($xeTable, !!reFull)
      }, refreshDelay)
    })
  },
  updateStyle () {
    const $xeTable = this

    return updateStyle($xeTable)
  },
  /**
   * 处理固定列的显示状态
   */
  checkScrolling () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { elemStore } = internalData
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const leftContainerElem = $xeTable.$refs.refLeftContainer as HTMLDivElement
    const rightContainerElem = $xeTable.$refs.refRightContainer as HTMLDivElement
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const bodtTargetEl = xHandleEl || bodyScrollElem
    if (bodtTargetEl) {
      if (leftContainerElem) {
        if (bodtTargetEl.scrollLeft > 0) {
          addClass(leftContainerElem, 'scrolling--middle')
        } else {
          removeClass(leftContainerElem, 'scrolling--middle')
        }
      }
      if (rightContainerElem) {
        if (bodtTargetEl.clientWidth < bodtTargetEl.scrollWidth - Math.ceil(bodtTargetEl.scrollLeft)) {
          addClass(rightContainerElem, 'scrolling--middle')
        } else {
          removeClass(rightContainerElem, 'scrolling--middle')
        }
      }
    }
  },
  preventEvent (evnt: any, type: any, args: any, next: any, end: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods

    let evntList = interceptor.get(type)

    // 兼容老版本
    if (!evntList.length && type === 'event.clearEdit') {
      evntList = interceptor.get('event.clearActived')
      if (evntList.length) {
        warnLog('vxe.error.delEvent', ['event.clearActived', 'event.clearEdit'])
      }
    }
    // 兼容老版本

    let rest = null
    let isStop = false
    for (let i = 0; i < evntList.length; i++) {
      const func = evntList[i]
      const fnRest = func(Object.assign({ $grid: $xeGrid, $table: $xeTable, $event: evnt }, args))
      if (fnRest === false) {
        isStop = true
        break
      } else if (fnRest && fnRest.status === false) {
        rest = fnRest.result
        isStop = true
        break
      }
    }
    if (!isStop) {
      if (next) {
        rest = next()
      }
    }
    if (end) {
      end()
    }
    return rest
  },
  /**
   * 全局按下事件处理
   */
  handleGlobalMousedownEvent (evnt: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods

    const { $el, $refs, $toolbar, mouseConfig, editStore, ctxMenuStore, editRules, editOpts, validOpts, areaOpts, filterStore, customStore, getRowNode } = this
    const { actived } = editStore
    const { customWrapper, refValidTooltip } = $refs
    const tableFilter = $refs.refTableFilter
    const tableMenu = $refs.refTableMenu
    // 筛选
    if (tableFilter) {
      if (getEventTargetNode(evnt, $el, 'vxe-cell--filter').flag) {
        // 如果点击了筛选按钮
      } else if (getEventTargetNode(evnt, tableFilter.$el).flag) {
        // 如果点击筛选容器
      } else {
        if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
          this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter)
        }
      }
    }
    // 自定义列
    if (customWrapper) {
      if (customStore.btnEl === evnt.target || getEventTargetNode(evnt, document.body, 'vxe-toolbar-custom-target').flag) {
        // 如果点击了自定义列按钮
      } else if (getEventTargetNode(evnt, customWrapper.$el).flag) {
        // 如果点击自定义列容器
      } else {
        if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
          this.preventEvent(evnt, 'event.clearCustom', {}, () => this.closeCustom())
        }
      }
    }

    // 如果已激活了编辑状态
    if (actived.row) {
      if (!(editOpts.autoClear === false)) {
        // 如果是激活状态，点击了单元格之外
        const cell = actived.args.cell
        if ((!cell || !getEventTargetNode(evnt, cell).flag)) {
          if (refValidTooltip && getEventTargetNode(evnt, refValidTooltip.$el).flag) {
            // 如果是激活状态，且点击了校验提示框
          } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
              // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
              this.preventEvent(evnt, 'event.clearEdit', actived.args, () => {
                let isClear
                if (editOpts.mode === 'row') {
                  const rowNode = getEventTargetNode(evnt, $el, 'vxe-body--row')
                  // row 方式，如果点击了不同行
                  isClear = rowNode.flag ? getRowNode(rowNode.targetElem).item !== actived.args.row : false
                } else {
                  // cell 方式，如果是非编辑列
                  isClear = !getEventTargetNode(evnt, $el, 'col--edit').flag
                }
                // 如果点击表头行，则清除激活状态
                if (!isClear) {
                  isClear = getEventTargetNode(evnt, $el, 'vxe-header--row').flag
                }
                // 如果点击表尾行，则清除激活状态
                if (!isClear) {
                  isClear = getEventTargetNode(evnt, $el, 'vxe-footer--row').flag
                }
                // 如果固定了高度且点击了行之外的空白处，则清除激活状态
                if (!isClear && this.height && !this.overflowY) {
                  const bodyWrapperElem = evnt.target
                  if (hasClass(bodyWrapperElem, 'vxe-table--body-wrapper')) {
                    isClear = evnt.offsetY < bodyWrapperElem.clientHeight
                  }
                }
                if (
                  isClear ||
                    // 如果点击了当前表格之外
                    !getEventTargetNode(evnt, $el).flag
                ) {
                  setTimeout(() => {
                    this.handleClearEdit(evnt).then(() => {
                      // 如果存在校验，点击了表格之外则清除
                      if (!this.isActivated && editRules && validOpts.autoClear) {
                        this.validErrorMaps = {}
                      }
                    })
                  })
                }
              })
            }
          }
        }
      }
    } else if (mouseConfig) {
      if (!getEventTargetNode(evnt, $el).flag && !($xeGrid && getEventTargetNode(evnt, $xeGrid.$el).flag) && !(tableMenu && getEventTargetNode(evnt, tableMenu.$el).flag) && !($toolbar && getEventTargetNode(evnt, $toolbar.$el).flag)) {
        if (this.clearSelected) {
          this.clearSelected()
        }
        if (areaOpts.autoClear) {
          if (this.getCellAreas) {
            const cellAreas = this.getCellAreas()
            if (cellAreas && cellAreas.length && !getEventTargetNode(evnt, document.body, 'vxe-table--ignore-areas-clear').flag) {
              this.preventEvent(evnt, 'event.clearAreas', {}, () => {
                this.clearCellAreas()
                this.clearCopyCellArea()
                this.emitEvent('clear-cell-area-selection', { cellAreas }, evnt)
              })
            }
          }
        }
      }
    }
    // 如果配置了快捷菜单且，点击了其他地方则关闭
    if (ctxMenuStore.visible && tableMenu && !getEventTargetNode(evnt, tableMenu.$el).flag) {
      this.closeMenu()
    }
    const isActivated = getEventTargetNode(evnt, ($xeGrid || this).$el).flag
    // 如果存在校验，点击了表格之外则清除
    if (!isActivated && editRules && validOpts.autoClear) {
      this.validErrorMaps = {}
    }
    // 最后激活的表格
    this.isActivated = isActivated
  },
  /**
   * 窗口失焦事件处理
   */
  handleGlobalBlurEvent () {
    this.closeFilter()
    this.closeMenu()
  },
  /**
   * 全局滚动事件
   */
  handleGlobalMousewheelEvent () {
    this.closeTooltip()
    this.closeMenu()
  },
  /**
   * 表格键盘事件
   */
  keydownEvent (evnt: any) {
    const { filterStore, ctxMenuStore, editStore, keyboardConfig, mouseConfig, mouseOpts, keyboardOpts } = this
    const { actived } = editStore
    const { keyCode } = evnt
    const isEsc = keyCode === 27
    if (isEsc) {
      this.preventEvent(evnt, 'event.keydown', null, () => {
        this.emitEvent('keydown-start', {}, evnt)
        if (keyboardConfig && mouseConfig && mouseOpts.area && this.handleKeyboardCellAreaEvent) {
          this.handleKeyboardCellAreaEvent(evnt)
        } else if (actived.row || filterStore.visible || ctxMenuStore.visible) {
          evnt.stopPropagation()
          // 如果按下了 Esc 键，关闭快捷菜单、筛选
          this.closeFilter()
          this.closeMenu()
          if (keyboardConfig && keyboardOpts.isEsc) {
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              const params = actived.args
              this.handleClearEdit(evnt)
              // 如果配置了选中功能，则为选中状态
              if (mouseConfig && mouseOpts.selected) {
                this.$nextTick(() => this.handleSelected(params, evnt))
              }
            }
          }
        }
        this.emitEvent('keydown', {}, evnt)
        this.emitEvent('keydown-end', {}, evnt)
      })
    }
  },
  /**
   * 全局键盘事件
   */
  handleGlobalKeydownEvent (evnt: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData
    const reactData = $xeTable as unknown as TableReactData
    const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods

    // 该行为只对当前激活的表格有效
    if (internalData.isActivated) {
      $xeTable.preventEvent(evnt, 'event.keydown', null, () => {
        const { mouseConfig, keyboardConfig, treeConfig, editConfig, highlightCurrentRow, highlightCurrentColumn } = props
        const { ctxMenuStore, editStore, currentRow } = reactData
        const { afterFullData } = internalData
        const isMenu = $xeTable.computeIsMenu
        const bodyMenu = $xeTable.computeBodyMenu
        const keyboardOpts = $xeTable.computeKeyboardOpts
        const mouseOpts = $xeTable.computeMouseOpts
        const editOpts = $xeTable.computeEditOpts
        const treeOpts = $xeTable.computeTreeOpts
        const menuList = $xeTable.computeMenuList
        const rowOpts = $xeTable.computeRowOpts
        const columnOpts = $xeTable.computeColumnOpts
        const { selected, actived } = editStore
        const { keyCode } = evnt
        const hasBackspaceKey = keyCode === 8
        const isTab = keyCode === 9
        const isEnter = keyCode === 13
        const isEsc = keyCode === 27
        const isSpacebar = keyCode === 32
        const isLeftArrow = keyCode === 37
        const isUpArrow = keyCode === 38
        const isRightArrow = keyCode === 39
        const isDwArrow = keyCode === 40
        const hasDeleteKey = keyCode === 46
        const isF2 = keyCode === 113
        const isContextMenu = keyCode === 93
        const isControlKey = hasControlKey(evnt)
        const hasShiftKey = evnt.shiftKey
        const hasAltKey = evnt.altKey
        const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
        const operCtxMenu = isMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow)
        const isEditStatus = isEnableConf(editConfig) && actived.column && actived.row
        const childrenField = treeOpts.children || treeOpts.childrenField
        const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
        if (operCtxMenu) {
          // 如果配置了右键菜单; 支持方向键操作、回车
          evnt.preventDefault()
          if (ctxMenuStore.showChild && hasChildrenList(ctxMenuStore.selected)) {
            $xeTable.moveCtxMenu(evnt, ctxMenuStore, 'selectChild', isLeftArrow, false, ctxMenuStore.selected.children)
          } else {
            $xeTable.moveCtxMenu(evnt, ctxMenuStore, 'selected', isRightArrow, true, menuList)
          }
        } else if (keyboardConfig && mouseConfig && mouseOpts.area && $xeTable.handleKeyboardCellAreaEvent) {
          $xeTable.handleKeyboardCellAreaEvent(evnt)
        } else if (isEsc) {
          // 如果按下了 Esc 键，关闭快捷菜单、筛选
          if ($xeTable.closeMenu) {
            $xeTable.closeMenu()
          }
          $xeTable.closeFilter()
          if (keyboardConfig && keyboardOpts.isEsc) {
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              const params = actived.args
              $xeTable.handleClearEdit(evnt)
              // 如果配置了选中功能，则为选中状态
              if (mouseOpts.selected) {
                $xeTable.$nextTick(() => $xeTable.handleSelected(params, evnt))
              }
            }
          }
        } else if (keyboardConfig && isSpacebar && keyboardOpts.isChecked && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'radio')) {
          // 空格键支持选中复选框
          evnt.preventDefault()
          if (selected.column.type === 'checkbox') {
            $xeTable.handleToggleCheckRowEvent(evnt, selected.args)
          } else {
            $xeTable.triggerRadioRowEvent(evnt, selected.args)
          }
        } else if (isF2 && isEnableConf(editConfig)) {
          if (!isEditStatus) {
            // 如果按下了 F2 键
            if (selected.row && selected.column) {
              evnt.stopPropagation()
              evnt.preventDefault()
              $xeTable.handleEdit(selected.args, evnt)
            }
          }
        } else if (isContextMenu) {
          // 如果按下上下文键
          internalData._keyCtx = selected.row && selected.column && bodyMenu.length
          clearTimeout(internalData.keyCtxTimeout)
          internalData.keyCtxTimeout = setTimeout(() => {
            internalData._keyCtx = false
          }, 1000)
        } else if (isEnter && !hasAltKey && keyboardConfig && keyboardOpts.isEnter && (selected.row || actived.row || (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow))) {
          const { isLastEnterAppendRow, beforeEnterMethod, enterMethod } = keyboardOpts
          // 退出选中
          if (isControlKey) {
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              const params = actived.args
              $xeTable.handleClearEdit(evnt)
              // 如果配置了选中功能，则为选中状态
              if (mouseConfig && mouseOpts.selected) {
                $xeTable.$nextTick(() => $xeTable.handleSelected(params, evnt))
              }
            }
          } else {
            // 如果是激活状态，退则出到上一行/下一行
            if (selected.row || actived.row) {
              const activeParams = selected.row ? selected.args : actived.args
              if (hasShiftKey) {
                if (keyboardOpts.enterToTab) {
                  $xeTable.moveTabSelected(activeParams, hasShiftKey, evnt)
                } else {
                  $xeTable.moveEnterSelected(activeParams, isLeftArrow, true, isRightArrow, false, evnt)
                }
              } else {
                if (keyboardOpts.enterToTab) {
                  $xeTable.moveTabSelected(activeParams, hasShiftKey, evnt)
                } else {
                  const activeRow = selected.row || actived.row
                  const activeColumn = selected.column || actived.column
                  const _rowIndex = $xeTable.getVTRowIndex(activeRow)
                  const etrParams = {
                    row: activeRow,
                    rowIndex: $xeTable.getRowIndex(activeRow),
                    $rowIndex: $xeTable.getVMRowIndex(activeRow),
                    _rowIndex,
                    column: activeColumn,
                    columnIndex: $xeTable.getColumnIndex(activeColumn),
                    $columnIndex: $xeTable.getVMColumnIndex(activeColumn),
                    _columnIndex: $xeTable.getVTColumnIndex(activeColumn),
                    $table: $xeTable
                  }
                  if (!beforeEnterMethod || beforeEnterMethod(etrParams) !== false) {
                    // 最后一行按下回车键，自动追加一行
                    if (isLastEnterAppendRow) {
                      if (_rowIndex >= afterFullData.length - 1) {
                        $xeTable.insertAt({}, -1).then(({ row: newRow }: any) => {
                          $xeTable.scrollToRow(newRow, selected.column)
                          $xeTable.handleSelected({ ...activeParams, row: newRow }, evnt)
                        })
                        $xeTable.dispatchEvent('enter-append-row', etrParams, evnt)
                        return
                      }
                    }
                    $xeTable.moveEnterSelected(activeParams, isLeftArrow, false, isRightArrow, true, evnt)
                    if (enterMethod) {
                      enterMethod(etrParams)
                    }
                  }
                }
              }
            } else if (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
              // 如果是树形表格当前行回车移动到子节点
              const childrens = currentRow[childrenField]
              if (childrens && childrens.length) {
                evnt.preventDefault()
                const targetRow = childrens[0]
                const params = {
                  $table: $xeTable,
                  row: targetRow,
                  rowIndex: $xeTable.getRowIndex(targetRow),
                  $rowIndex: $xeTable.getVMRowIndex(targetRow)
                }
                $xeTable.setTreeExpand(currentRow, true)
                  .then(() => $xeTable.scrollToRow(targetRow))
                  .then(() => $xeTable.triggerCurrentRowEvent(evnt, params))
              }
            }
          }
        } else if (operArrow && keyboardConfig && keyboardOpts.isArrow) {
          if (!isEditStatus) {
            // 如果按下了方向键
            if (mouseOpts.selected && selected.row && selected.column) {
              $xeTable.moveArrowSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt)
            } else {
              // 当前行按键上下移动
              if ((isUpArrow || isDwArrow) && (rowOpts.isCurrent || highlightCurrentRow)) {
                $xeTable.moveCurrentRow(isUpArrow, isDwArrow, evnt)
              }
              // 当前行按键左右移动
              if ((isLeftArrow || isRightArrow) && (columnOpts.isCurrent || highlightCurrentColumn)) {
                $xeTable.moveCurrentColumn(isLeftArrow, isRightArrow, evnt)
              }
            }
          }
        } else if (isTab && keyboardConfig && keyboardOpts.isTab) {
          // 如果按下了 Tab 键切换
          if (selected.row || selected.column) {
            $xeTable.moveTabSelected(selected.args, hasShiftKey, evnt)
          } else if (actived.row || actived.column) {
            $xeTable.moveTabSelected(actived.args, hasShiftKey, evnt)
          }
        } else if (keyboardConfig && keyboardOpts.isDel && hasDeleteKey && isEnableConf(editConfig) && (selected.row || selected.column)) {
          // 如果是删除键
          if (!isEditStatus) {
            const { delMethod } = keyboardOpts
            const params = {
              row: selected.row,
              rowIndex: $xeTable.getRowIndex(selected.row),
              column: selected.column,
              columnIndex: $xeTable.getColumnIndex(selected.column),
              $table: $xeTable,
              $grid: $xeGrid
            }
            // 是否被禁用
            if (!beforeEditMethod || beforeEditMethod(params)) {
              if (delMethod) {
                delMethod(params)
              } else {
                setCellValue(selected.row, selected.column, null)
              }
              // 如果按下 del 键，更新表尾数据
              $xeTable.updateFooter()
              $xeTable.dispatchEvent('cell-delete-value', params, evnt)
            }
          }
        } else if (hasBackspaceKey && keyboardConfig && keyboardOpts.isBack && isEnableConf(editConfig) && (selected.row || selected.column)) {
          if (!isEditStatus) {
            const { editMode, backMethod } = keyboardOpts
            // 如果是删除键
            if (keyboardOpts.isDel && isEnableConf(editConfig) && (selected.row || selected.column)) {
              const params = {
                row: selected.row,
                rowIndex: $xeTable.getRowIndex(selected.row),
                column: selected.column,
                columnIndex: $xeTable.getColumnIndex(selected.column),
                $table: $xeTable,
                $grid: $xeGrid
              }
              // 是否被禁用
              if (!beforeEditMethod || beforeEditMethod(params)) {
                if (backMethod) {
                  backMethod(params)
                } else {
                  // 追加方式与覆盖式
                  if (editMode !== 'insert') {
                    setCellValue(selected.row, selected.column, null)
                  }
                  $xeTable.handleEdit(selected.args, evnt)
                }
                $xeTable.dispatchEvent('cell-backspace-value', params, evnt)
              }
            }
          }
        } else if (hasBackspaceKey && keyboardConfig && treeConfig && keyboardOpts.isBack && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
          // 如果树形表格回退键关闭当前行返回父节点
          const { parent: parentRow } = XEUtils.findTree(internalData.afterTreeFullData, item => item === currentRow, { children: childrenField })
          if (parentRow) {
            evnt.preventDefault()
            const params = {
              row: parentRow,
              rowIndex: $xeTable.getRowIndex(parentRow),
              $rowIndex: $xeTable.getVMRowIndex(parentRow),
              $table: $xeTable,
              $grid: $xeGrid
            }
            $xeTable.setTreeExpand(parentRow, false)
              .then(() => $xeTable.scrollToRow(parentRow))
              .then(() => $xeTable.triggerCurrentRowEvent(evnt, params))
          }
        } else if (keyboardConfig && keyboardOpts.isEdit && !isControlKey && (isSpacebar || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222))) {
          const { editMethod } = keyboardOpts
          // 启用编辑后，空格键功能将失效
          // if (isSpacebar) {
          //   evnt.preventDefault()
          // }
          // 如果是按下非功能键之外允许直接编辑
          if (selected.column && selected.row && isEnableConf(selected.column.editRender)) {
            const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
            const params = {
              row: selected.row,
              rowIndex: $xeTable.getRowIndex(selected.row),
              column: selected.column,
              columnIndex: $xeTable.getColumnIndex(selected.column),
              $table: $xeTable,
              $grid: $xeGrid
            }
            if (!beforeEditMethod || beforeEditMethod(params)) {
              if (editMethod) {
                editMethod(params)
              } else {
                setCellValue(selected.row, selected.column, null)
                $xeTable.handleEdit(selected.args, evnt)
              }
            }
          }
        }
        $xeTable.dispatchEvent('keydown', {}, evnt)
      })
    }
  },
  handleGlobalPasteEvent (evnt: any) {
    const { isActivated, keyboardConfig, keyboardOpts, mouseConfig, mouseOpts, editStore, filterStore } = this
    const { actived } = editStore
    if (isActivated && !filterStore.visible) {
      if (!(actived.row || actived.column)) {
        if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && this.handlePasteCellAreaEvent) {
          this.handlePasteCellAreaEvent(evnt)
        }
      }
      this.emitEvent('paste', {}, evnt)
    }
  },
  handleGlobalCopyEvent (evnt: any) {
    const { isActivated, keyboardConfig, keyboardOpts, mouseConfig, mouseOpts, editStore, filterStore } = this
    const { actived } = editStore
    if (isActivated && !filterStore.visible) {
      if (!(actived.row || actived.column)) {
        if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && this.handleCopyCellAreaEvent) {
          this.handleCopyCellAreaEvent(evnt)
        }
      }
      this.emitEvent('copy', {}, evnt)
    }
  },
  handleGlobalCutEvent (evnt: any) {
    const { isActivated, keyboardConfig, keyboardOpts, mouseConfig, mouseOpts, editStore, filterStore } = this
    const { actived } = editStore
    if (isActivated && !filterStore.visible) {
      if (!(actived.row || actived.column)) {
        if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && this.handleCutCellAreaEvent) {
          this.handleCutCellAreaEvent(evnt)
        }
      }
      this.emitEvent('cut', {}, evnt)
    }
  },
  handleGlobalResizeEvent () {
    this.closeMenu()
    this.updateCellAreas()
    this.recalculate(true)
  },
  /**
   * 处理合并
   */
  handleUpdateBodyMerge () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { mergeBodyList } = internalData
    internalData.mergeBodyCellMaps = buildMergeData(mergeBodyList)
    reactData.mergeBodyFlag++
  },
  handleUpdateFooterMerge () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { mergeFooterList } = internalData
    internalData.mergeFooterCellMaps = buildMergeData(mergeFooterList)
    reactData.mergeFootFlag++
  },
  handleAggregateSummaryData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return updateGroupData($xeTable)
  },
  handleTargetLeaveEvent () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const tooltipOpts = $xeTable.computeTooltipOpts
    let $tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
    if ($tooltip && $tooltip.setActived) {
      $tooltip.setActived(false)
    }
    if (tooltipOpts.enterable) {
      internalData.tooltipTimeout = setTimeout(() => {
        $tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
        if ($tooltip && $tooltip.isActived && !$tooltip.isActived()) {
          $xeTable.closeTooltip()
        }
      }, tooltipOpts.leaveDelay)
    } else {
      $xeTable.closeTooltip()
    }
  },
  triggerHeaderTitleEvent (evnt: any, iconParams: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const tipContent = iconParams.content || (iconParams as any).message
    if (tipContent) {
      const { tooltipStore } = reactData
      const { column } = params
      const content = getFuncText(tipContent)
      handleTargetEnterEvent($xeTable, true)
      tooltipStore.row = null
      tooltipStore.column = column
      tooltipStore.visible = true
      tooltipStore.currOpts = iconParams
      $xeTable.$nextTick(() => {
        const $tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
        if ($tooltip && $tooltip.open) {
          $tooltip.open(evnt.currentTarget, content)
        }
      })
    }
  },
  /**
   * 触发表头 tooltip 事件
   */
  triggerHeaderTooltipEvent (evnt: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { tooltipStore } = reactData
    const { column } = params
    handleTargetEnterEvent($xeTable, true)
    const titleElem = evnt.currentTarget as HTMLDivElement
    if (!titleElem) {
      return
    }
    const cWrapperEl = titleElem.parentElement as HTMLDivElement
    if (!cWrapperEl) {
      return
    }
    const cellEl = cWrapperEl.parentElement as HTMLDivElement
    if (!cellEl) {
      return
    }
    const thEl = cellEl.parentElement as HTMLTableCellElement
    if (!thEl) {
      return
    }
    if (tooltipStore.column !== column || !tooltipStore.visible) {
      const ctEl = thEl.querySelector<HTMLElement>('.vxe-cell--title')
      handleTooltip($xeTable, evnt, thEl, (hasClass(thEl, 'col--ellipsis') ? ctEl : cWrapperEl) || cWrapperEl, ctEl || cellEl, params)
    }
  },
  /**
   * 触发单元格 tooltip 事件
   */
  triggerBodyTooltipEvent (evnt: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData

    const { editConfig } = props
    const { editStore } = reactData
    const { tooltipStore } = reactData
    const editOpts = $xeTable.computeEditOpts
    const { actived } = editStore
    const { row, column } = params
    const tdEl = evnt.currentTarget as HTMLTableCellElement
    handleTargetEnterEvent($xeTable, tooltipStore.column !== column || tooltipStore.row !== row)
    // 单元格处于编辑状态时不触发提示框
    if (column.editRender && isEnableConf(editConfig)) {
      // 如果是行编辑模式
      if (editOpts.mode === 'row' && actived.row === row) {
        return
      }
      // 如果是单元格编辑模式
      if (actived.row === row && actived.column === column) {
        return
      }
    }
    if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
      const ctEl = tdEl.querySelector<HTMLElement>('.vxe-cell--wrapper')
      let ovEl = null
      let tipEl = tdEl.querySelector<HTMLElement>(column.type === 'html' ? '.vxe-cell--html' : '.vxe-cell--label')
      if (column.treeNode) {
        ovEl = tdEl.querySelector<HTMLElement>('.vxe-tree-cell')
      }
      if (!tipEl) {
        tipEl = ctEl
      }
      handleTooltip($xeTable, evnt, tdEl, ovEl || ctEl, tipEl, params)
    }
  },
  /**
   * 触发表尾 tooltip 事件
   */
  triggerFooterTooltipEvent (evnt: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { column } = params
    const { tooltipStore } = reactData
    const tdEl = evnt.currentTarget as HTMLTableCellElement
    handleTargetEnterEvent($xeTable, tooltipStore.column !== column || !!tooltipStore.row)
    if (tooltipStore.column !== column || !tooltipStore.visible) {
      const ctEl = tdEl.querySelector<HTMLElement>('.vxe-cell--wrapper')
      let ovEl = null
      let tipEl = tdEl.querySelector<HTMLElement>(column.type === 'html' ? '.vxe-cell--html' : '.vxe-cell--label')
      if (column.type === 'html') {
        ovEl = tdEl.querySelector<HTMLElement>('.vxe-cell--html')
      }
      if (!tipEl) {
        tipEl = ctEl
      }
      handleTooltip($xeTable, evnt, tdEl, ovEl || ctEl, tipEl, params)
    }
  },
  openTooltip (target: HTMLElement, content: string | number) {
    const { $refs } = this
    const commTip = $refs.refCommTooltip
    if (commTip) {
      return commTip.open(target, content)
    }
    return this.$nextTick()
  },
  /**
   * 关闭 tooltip
   */
  closeTooltip () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { tooltipStore } = reactData
    const tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
    const commTip = $xeTable.$refs.refCommTooltip as VxeTooltipInstance
    if (tooltipStore.visible) {
      Object.assign(tooltipStore, {
        row: null,
        column: null,
        content: null,
        visible: false,
        currOpts: {}
      })
      if (tooltip) {
        tooltip.close()
      }
    }
    if (commTip) {
      commTip.close()
    }
    return this.$nextTick()
  },
  /**
   * 判断列头复选框是否被选中
   */
  isAllCheckboxChecked () {
    return this.isAllSelected
  },
  /**
   * 判断列头复选框是否被半选
   */
  isAllCheckboxIndeterminate () {
    return !this.isAllSelected && this.isIndeterminate
  },
  isCheckboxIndeterminate () {
    warnLog('vxe.error.delFunc', ['isCheckboxIndeterminate', 'isAllCheckboxIndeterminate'])
    return this.isAllCheckboxIndeterminate()
  },
  /**
   * 获取复选框半选状态的行数据
   */
  getCheckboxIndeterminateRecords (isFull: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { fullDataRowIdData, treeIndeterminateRowMaps } = internalData
    if (treeConfig) {
      const fullRest: any[] = []
      const defRest: any[] = []
      XEUtils.each(treeIndeterminateRowMaps, (item, rowid) => {
        if (item) {
          fullRest.push(item)
          if (fullDataRowIdData[rowid]) {
            defRest.push(item)
          }
        }
      })
      if (isFull) {
        return fullRest
      }
      return defRest
    }
    return []
  },
  handleCheckedCheckboxRow (rows: any[], value: boolean, isForce?: boolean) {
    const $xeTable = this

    return handleCheckedCheckboxRow($xeTable, rows, value, isForce)
  },
  /**
   * 用于多选行，设置行为选中状态，第二个参数为选中与否
   * @param {Array/Row} rows 行数据
   * @param {Boolean} value 是否选中
   */
  setCheckboxRow (rows: any, checked: any) {
    const $xeTable = this

    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    return handleCheckedCheckboxRow($xeTable, rows, checked, true)
  },
  setCheckboxRowKey (keys: any, checked: boolean) {
    const $xeTable = this
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData } = internalData
    if (keys && !XEUtils.isArray(keys)) {
      keys = [keys]
    }
    const rows: any = []
    keys.forEach((rowid: string) => {
      const rowRest = fullAllDataRowIdData[rowid]
      if (rowRest) {
        rows.push(rowRest.row)
      }
    })
    return handleCheckedCheckboxRow($xeTable, rows, checked, true)
  },
  isCheckedByCheckboxRow (row: any) {
    const $xeTable = this
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { updateCheckboxFlag } = reactData
    const { selectCheckboxMaps } = internalData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField } = checkboxOpts
    if (checkField) {
      return XEUtils.get(row, checkField)
    }
    return !!updateCheckboxFlag && !!selectCheckboxMaps[getRowid($xeTable, row)]
  },
  isCheckedByCheckboxRowKey (rowid: string) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { updateCheckboxFlag } = reactData
    const { fullAllDataRowIdData, selectCheckboxMaps } = internalData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField } = checkboxOpts
    if (checkField) {
      const rowRest = fullAllDataRowIdData[rowid]
      if (rowRest) {
        return XEUtils.get(rowRest.row, checkField)
      }
      return false
    }
    return !!updateCheckboxFlag && !!selectCheckboxMaps[rowid]
  },
  isIndeterminateByCheckboxRow (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { treeIndeterminateRowMaps } = internalData
    return !!treeIndeterminateRowMaps[getRowid($xeTable, row)] && !$xeTable.isCheckedByCheckboxRow(row)
  },
  isIndeterminateByCheckboxRowKey (rowid: string) {
    const $xeTable = this
    const internalData = $xeTable as unknown as TableInternalData

    const { treeIndeterminateRowMaps } = internalData
    return !!treeIndeterminateRowMaps[rowid] && !$xeTable.isCheckedByCheckboxRowKey(rowid)
  },
  /**
   * 切换选中
   * 多选，行选中事件
   */
  handleBatchSelectRows (rows: any[], checked: boolean, isForce?: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { isRowGroupStatus } = reactData
    const { selectCheckboxMaps } = internalData
    const aggregateOpts = $xeTable.computeAggregateOpts
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, mapChildrenField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField, checkStrictly, checkMethod } = checkboxOpts
    const { handleGetRowId } = createHandleGetRowId($xeTable)
    // indeterminateField 仅支持读取
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
    if (checkField) {
      // 树结构
      if ((treeConfig || isRowGroupStatus) && !checkStrictly) {
        // 更新子节点状态
        XEUtils.eachTree(rows, (row) => {
          if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
            XEUtils.set(row, checkField, checked)
            if (indeterminateField) {
              XEUtils.set(row, indeterminateField, false)
            }
            handleCheckboxReserveRow($xeTable, row, checked)
          }
        }, { children: transform ? mapChildrenField : childrenField })
        reactData.updateCheckboxFlag++
        return
      }
      // 列表
      rows.forEach(row => {
        if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
          XEUtils.set(row, checkField, checked)
          handleCheckboxReserveRow($xeTable, row, checked)
        }
      })
      reactData.updateCheckboxFlag++
      return
    }

    // 树结构
    if (!checkStrictly) {
      if (isRowGroupStatus) {
        // 更新行分组节点状态
        XEUtils.eachTree(rows, (row) => {
          const rowid = handleGetRowId(row)
          if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
            if (checked) {
              selectCheckboxMaps[rowid] = row
            } else {
              if (selectCheckboxMaps[rowid]) {
                delete selectCheckboxMaps[rowid]
              }
            }
            handleCheckboxReserveRow($xeTable, row, checked)
          }
        }, { children: aggregateOpts.mapChildrenField })
        reactData.updateCheckboxFlag++
        return
      } else if (treeConfig) {
        // 更新子节点状态
        XEUtils.eachTree(rows, (row) => {
          const rowid = handleGetRowId(row)
          if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
            if (checked) {
              selectCheckboxMaps[rowid] = row
            } else {
              if (selectCheckboxMaps[rowid]) {
                delete selectCheckboxMaps[rowid]
              }
            }
            handleCheckboxReserveRow($xeTable, row, checked)
          }
        }, { children: transform ? mapChildrenField : childrenField })
        reactData.updateCheckboxFlag++
        return
      }
    }

    // 列表
    rows.forEach(row => {
      const rowid = handleGetRowId(row)
      if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
        if (checked) {
          if (!selectCheckboxMaps[rowid]) {
            selectCheckboxMaps[rowid] = row
          }
        } else {
          if (selectCheckboxMaps[rowid]) {
            delete selectCheckboxMaps[rowid]
          }
        }
        handleCheckboxReserveRow($xeTable, row, checked)
        reactData.updateCheckboxFlag++
      }
    })
  },
  /**
   * 即将移除
   * @deprecated
   */
  handleSelectRow ({ row }: any, checked: boolean, isForce?: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    $xeTable.handleBatchSelectRows([row], checked, isForce)
  },
  handleToggleCheckRowEvent (evnt: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { selectCheckboxMaps } = internalData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField, trigger } = checkboxOpts
    const { row } = params
    if (trigger === 'manual') {
      return
    }
    let checked = false
    if (checkField) {
      checked = !XEUtils.get(row, checkField)
    } else {
      checked = !selectCheckboxMaps[getRowid($xeTable, row)]
    }
    if (evnt) {
      $xeTable.triggerCheckRowEvent(evnt, params, checked)
    } else {
      $xeTable.handleBatchSelectRows([row], checked)
      $xeTable.checkSelectionStatus()
    }
  },
  triggerCheckRowEvent (evnt: any, params: any, checked: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { row } = params
    const { isRowGroupStatus } = reactData
    const { afterFullData } = internalData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkMethod, trigger } = checkboxOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    if (checkboxOpts.isShiftKey && evnt.shiftKey && !(treeConfig || isRowGroupStatus)) {
      const checkboxRecords = $xeTable.getCheckboxRecords()
      if (checkboxRecords.length) {
        const firstRow = checkboxRecords[0]
        const _rowIndex = $xeTable.getVTRowIndex(row)
        const _firstRowIndex = $xeTable.getVTRowIndex(firstRow)
        if (_rowIndex !== _firstRowIndex) {
          $xeTable.setAllCheckboxRow(false)
          const rangeRows = _rowIndex < _firstRowIndex ? afterFullData.slice(_rowIndex, _firstRowIndex + 1) : afterFullData.slice(_firstRowIndex, _rowIndex + 1)
          $xeTable.$nextTick(() => {
            handleCheckedCheckboxRow($xeTable, rangeRows, true, false)
          })
          $xeTable.dispatchEvent('checkbox-range-select', Object.assign({ rangeRecords: rangeRows }, params), evnt)
          return
        }
      }
    }
    if (!checkMethod || checkMethod({ $table: $xeTable, row })) {
      $xeTable.handleBatchSelectRows([row], checked)
      $xeTable.checkSelectionStatus()
      $xeTable.dispatchEvent('checkbox-change', Object.assign({
        records: () => $xeTable.getCheckboxRecords(),
        reserves: () => $xeTable.getCheckboxReserveRecords(),
        indeterminates: () => $xeTable.getCheckboxIndeterminateRecords(),
        checked
      }, params), evnt)
    }
  },
  /**
   * 多选，切换某一行的选中状态
   */
  toggleCheckboxRow (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { selectCheckboxMaps } = internalData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField } = checkboxOpts
    const checked = checkField ? !XEUtils.get(row, checkField) : !selectCheckboxMaps[getRowid($xeTable, row)]
    $xeTable.handleBatchSelectRows([row], checked, true)
    $xeTable.checkSelectionStatus()
    return $xeTable.$nextTick()
  },
  /**
   * 用于多选行，设置所有行的选中状态
   * @param {Boolean} value 是否选中
   */
  setAllCheckboxRow (value: boolean) {
    const $xeTable = this

    return handleCheckedAllCheckboxRow($xeTable, value, true)
  },
  updateCheckboxStatus () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { isRowGroupStatus } = reactData
    const { afterTreeFullData, afterGroupFullData, selectCheckboxMaps, treeIndeterminateRowMaps } = internalData
    const aggregateOpts = $xeTable.computeAggregateOpts
    const treeOpts = $xeTable.computeTreeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField, checkStrictly, checkMethod } = checkboxOpts
    if (checkStrictly) {
      return
    }
    if (isRowGroupStatus || treeConfig) {
      const { handleGetRowId } = createHandleGetRowId($xeTable)
      const childRowMaps: Record<string, number> = {}
      const childRowList: any[][] = []

      if (isRowGroupStatus) {
        // 行分组
        const mapChildrenField = aggregateOpts.mapChildrenField
        if (mapChildrenField) {
          XEUtils.eachTree(afterGroupFullData, (row) => {
            const rowid = handleGetRowId(row)
            const childList = row[mapChildrenField]
            if (childList && childList.length && !childRowMaps[rowid]) {
              childRowMaps[rowid] = 1
              childRowList.unshift([row, rowid, childList])
            }
          }, { children: mapChildrenField })
        }
      } else if (treeConfig) {
        // 树结构
        const { transform, mapChildrenField } = treeOpts
        XEUtils.eachTree(afterTreeFullData, (row) => {
          const rowid = handleGetRowId(row)
          const childList = row[transform ? mapChildrenField : childrenField]
          if (childList && childList.length && !childRowMaps[rowid]) {
            childRowMaps[rowid] = 1
            childRowList.unshift([row, rowid, childList])
          }
        }, { children: transform ? mapChildrenField : childrenField })
      }

      childRowList.forEach(vals => {
        const row: string = vals[0]
        const rowid: string = vals[1]
        const childList: any[] = vals[2]
        let sLen = 0 // 已选
        let hLen = 0 // 半选
        let vLen = 0 // 有效行
        childList.forEach(
          checkMethod
            ? (item) => {
                const childRowid = handleGetRowId(item)
                const isSelect = checkField ? XEUtils.get(item, checkField) : selectCheckboxMaps[childRowid]
                if (checkMethod({ $table: $xeTable, row: item })) {
                  if (isSelect) {
                    sLen++
                  } else if (treeIndeterminateRowMaps[childRowid]) {
                    hLen++
                  }
                  vLen++
                } else {
                  if (isSelect) {
                    sLen++
                  } else if (treeIndeterminateRowMaps[childRowid]) {
                    hLen++
                  }
                }
              }
            : item => {
              const childRowid = handleGetRowId(item)
              const isSelect = checkField ? XEUtils.get(item, checkField) : selectCheckboxMaps[childRowid]
              if (isSelect) {
                sLen++
              } else if (treeIndeterminateRowMaps[childRowid]) {
                hLen++
              }
              vLen++
            }
        )
        const isSelected = sLen >= vLen
        const halfSelect = !isSelected && (sLen >= 1 || hLen >= 1)
        if (checkField) {
          XEUtils.set(row, checkField, isSelected)
        }
        if (isSelected) {
          if (!checkField) {
            selectCheckboxMaps[rowid] = row
          }
          if (treeIndeterminateRowMaps[rowid]) {
            delete treeIndeterminateRowMaps[rowid]
          }
        } else {
          if (!checkField) {
            if (selectCheckboxMaps[rowid]) {
              delete selectCheckboxMaps[rowid]
            }
          }
          if (halfSelect) {
            treeIndeterminateRowMaps[rowid] = row
          } else {
            if (treeIndeterminateRowMaps[rowid]) {
              delete treeIndeterminateRowMaps[rowid]
            }
          }
        }
      })
    }
    reactData.updateCheckboxFlag++
  },
  updateAllCheckboxStatus () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { isRowGroupStatus } = reactData
    const { afterFullData, afterTreeFullData, afterGroupFullData, checkboxReserveRowMap, selectCheckboxMaps, treeIndeterminateRowMaps } = internalData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField, checkMethod, showReserveStatus } = checkboxOpts
    const { handleGetRowId } = createHandleGetRowId($xeTable)

    let sLen = 0 // 已选
    let hLen = 0 // 半选
    let vLen = 0 // 有效行

    const rootList = (treeConfig ? afterTreeFullData : (isRowGroupStatus ? afterGroupFullData : afterFullData))
    rootList.forEach(checkMethod
      ? row => {
        const childRowid = handleGetRowId(row)
        const selected = checkField ? XEUtils.get(row, checkField) : selectCheckboxMaps[childRowid]
        if (checkMethod({ $table: $xeTable, row })) {
          if (selected) {
            sLen++
          } else if (treeIndeterminateRowMaps[childRowid]) {
            hLen++
          }
          vLen++
        } else {
          if (selected) {
            sLen++
          } else if (treeIndeterminateRowMaps[childRowid]) {
            hLen++
          }
        }
      }
      : row => {
        const childRowid = handleGetRowId(row)
        const selected = checkField ? XEUtils.get(row, checkField) : selectCheckboxMaps[childRowid]
        if (selected) {
          sLen++
        } else if (treeIndeterminateRowMaps[childRowid]) {
          hLen++
        }
        vLen++
      })

    const isSelected = rootList.length > 0 ? (vLen > 0 ? (sLen >= vLen) : (sLen >= rootList.length)) : false
    let halfSelect = !isSelected && (sLen >= 1 || hLen >= 1)

    // 如果复选框启用保留记录，当保留数据存在时显示半选
    if (!isSelected && !halfSelect && showReserveStatus) {
      halfSelect = !XEUtils.isEmpty(checkboxReserveRowMap)
    }

    reactData.isAllSelected = isSelected
    reactData.isIndeterminate = halfSelect
  },
  checkSelectionStatus () {
    const $xeTable = this

    $xeTable.updateCheckboxStatus()
    $xeTable.updateAllCheckboxStatus()
  },
  /**
   * 获取单选框保留选中的行
   */
  getRadioReserveRecord (isFull: any) {
    const { fullDataRowIdData, radioReserveRow, radioOpts, afterFullData, treeConfig, treeOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    if (radioOpts.reserve && radioReserveRow) {
      const rowid = getRowid(this, radioReserveRow)
      if (isFull) {
        if (!fullDataRowIdData[rowid]) {
          return radioReserveRow
        }
      } else {
        const rowkey = getRowkey(this)
        if (treeConfig) {
          const matchObj = XEUtils.findTree(afterFullData, row => rowid === XEUtils.get(row, rowkey), { children: childrenField })
          if (matchObj) {
            return radioReserveRow
          }
        } else {
          if (!afterFullData.some((row: any) => rowid === XEUtils.get(row, rowkey))) {
            return radioReserveRow
          }
        }
      }
    }
    return null
  },
  clearRadioReserve () {
    this.radioReserveRow = null
    return this.$nextTick()
  },
  /**
   * 获取复选框保留选中的行
   */
  getCheckboxReserveRecords (isFull: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { afterFullData, fullDataRowIdData, checkboxReserveRowMap } = internalData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const treeOpts = $xeTable.computeTreeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const reserveSelection: any[] = []
    if (checkboxOpts.reserve) {
      const { handleGetRowId } = createHandleGetRowId($xeTable)
      const afterFullIdMaps: { [key: string]: number } = {}
      if (treeConfig) {
        XEUtils.eachTree(afterFullData, row => {
          afterFullIdMaps[handleGetRowId(row)] = 1
        }, { children: childrenField })
      } else {
        afterFullData.forEach((row: any) => {
          afterFullIdMaps[handleGetRowId(row)] = 1
        })
      }
      XEUtils.each(checkboxReserveRowMap, (oldRow, oldRowid) => {
        if (oldRow) {
          if (isFull) {
            if (!fullDataRowIdData[oldRowid]) {
              reserveSelection.push(oldRow)
            }
          } else {
            if (!afterFullIdMaps[oldRowid]) {
              reserveSelection.push(oldRow)
            }
          }
        }
      })
    }
    return reserveSelection
  },
  clearCheckboxReserve () {
    this.checkboxReserveRowMap = {}
    return this.$nextTick()
  },
  handleCheckboxReserveRow (row: any, checked: any) {
    const { checkboxReserveRowMap, checkboxOpts } = this
    if (checkboxOpts.reserve) {
      const rowid = getRowid(this, row)
      if (checked) {
        checkboxReserveRowMap[rowid] = row
      } else if (checkboxReserveRowMap[rowid]) {
        delete checkboxReserveRowMap[rowid]
      }
    }
  },
  handleCheckAllEvent (evnt: any, value: any) {
    const $xeTable = this

    handleCheckedAllCheckboxRow($xeTable, value)
    if (evnt) {
      $xeTable.dispatchEvent('checkbox-all', {
        records: () => $xeTable.getCheckboxRecords(),
        reserves: () => $xeTable.getCheckboxReserveRecords(),
        indeterminates: () => $xeTable.getCheckboxIndeterminateRecords(),
        checked: value
      }, evnt)
    }
  },
  /**
   * 多选，选中所有事件
   */
  triggerCheckAllEvent (evnt: any, value: any) {
    const $xeTable = this

    const { checkboxOpts } = this
    const { trigger } = checkboxOpts
    if (trigger === 'manual') {
      return
    }
    if (evnt) {
      evnt.stopPropagation()
    }
    $xeTable.handleCheckAllEvent(evnt, value)
  },
  /**
   * 多选，切换所有行的选中状态
   */
  toggleAllCheckboxRow () {
    this.handleCheckAllEvent(null, !this.isAllSelected)
    return this.$nextTick()
  },
  /**
   * 用于多选行，手动清空用户的选择
   * 清空行为不管是否被禁用还是保留记录，都将彻底清空选中状态
   */
  clearCheckboxRow () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { tableFullData } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField, reserve } = checkboxOpts
    // indeterminateField 仅支持读取
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
    if (checkField) {
      const handleClearChecked = (item: any) => {
        if (treeConfig && indeterminateField) {
          XEUtils.set(item, indeterminateField, false)
        }
        XEUtils.set(item, checkField, false)
      }
      if (treeConfig) {
        XEUtils.eachTree(tableFullData, handleClearChecked, { children: childrenField })
      } else {
        tableFullData.forEach(handleClearChecked)
      }
    }
    if (reserve) {
      tableFullData.forEach((row) => this.handleCheckboxReserveRow(row, false))
    }
    reactData.isAllSelected = false
    reactData.isIndeterminate = false
    internalData.selectCheckboxMaps = {}
    internalData.treeIndeterminateRowMaps = {}
    reactData.updateCheckboxFlag++
    return this.$nextTick()
  },
  /**
   * 单选，行选中事件
   */
  triggerRadioRowEvent (evnt: Event, params: {
    row: any
  }) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { selectRadioRow: oldValue } = reactData
    const { row } = params
    const radioOpts = $xeTable.computeRadioOpts
    const { trigger, checkMethod } = radioOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    if (!checkMethod || checkMethod({ $table: $xeTable, row })) {
      let newValue = row
      let isChange = oldValue !== newValue
      if (isChange) {
        handleCheckedRadioRow($xeTable, newValue)
      } else if (!radioOpts.strict) {
        isChange = oldValue === newValue
        if (isChange) {
          newValue = null
          $xeTable.clearRadioRow()
        }
      }
      if (isChange) {
        $xeTable.dispatchEvent('radio-change', { oldValue, newValue, ...params }, evnt)
      }
    }
  },
  triggerCurrentColumnEvent (evnt: Event, params: {
    column: VxeTableDefines.ColumnInfo
  }) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { currentColumn: oldValue } = reactData
    const columnOpts = $xeTable.computeColumnOpts
    const currentColumnOpts = $xeTable.computeCurrentColumnOpts
    const beforeRowMethod = currentColumnOpts.beforeSelectMethod || columnOpts.currentMethod as any
    const { column: newValue } = params
    const { trigger } = currentColumnOpts
    if (trigger === 'manual') {
      return
    }
    const isChange = oldValue !== newValue
    if (!beforeRowMethod || beforeRowMethod({ column: newValue, $table: $xeTable })) {
      $xeTable.setCurrentColumn(newValue)
      if (isChange) {
        $xeTable.dispatchEvent('current-column-change', { oldValue, newValue, ...params }, evnt)
      }
    } else {
      $xeTable.dispatchEvent('current-column-disabled', params, evnt)
    }
  },
  triggerCurrentRowEvent (evnt: Event, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { currentRow: oldValue } = reactData
    const rowOpts = $xeTable.computeRowOpts
    const currentRowOpts = $xeTable.computeCurrentRowOpts
    const beforeRowMethod = currentRowOpts.beforeSelectMethod || rowOpts.currentMethod as any
    const { row: newValue } = params
    const { trigger } = currentRowOpts
    if (trigger === 'manual') {
      return
    }
    const isChange = oldValue !== newValue
    if (!beforeRowMethod || beforeRowMethod({ row: newValue, $table: $xeTable })) {
      $xeTable.setCurrentRow(newValue)
      if (isChange) {
        $xeTable.dispatchEvent('current-row-change', { oldValue, newValue, ...params }, evnt)
        // 已废弃
        $xeTable.dispatchEvent('current-change', { oldValue, newValue, ...params }, evnt)
      }
    } else {
      $xeTable.dispatchEvent('current-row-disabled', params, evnt)
    }
  },
  /**
   * 用于当前行，设置某一行为高亮状态
   * @param {Row} row 行对象
   */
  setCurrentRow (row: any) {
    const { $el, rowOpts } = this
    this.clearCurrentRow()
    // this.clearCurrentColumn()
    this.currentRow = row
    if (rowOpts.isCurrent || this.highlightCurrentRow) {
      if ($el) {
        XEUtils.arrayEach($el.querySelectorAll(`[rowid="${getRowid(this, row)}"]`), elem => addClass(elem, 'row--current'))
      }
    }
    return this.$nextTick()
  },
  isCheckedByRadioRow (row: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { selectRadioRow } = reactData
    if (row && selectRadioRow) {
      return $xeTable.eqRow(selectRadioRow, row)
    }
    return false
  },
  isCheckedByRadioRowKey (key: string) {
    const $xeTable = this
    const reactData = $xeTable

    const { selectRadioRow } = reactData
    if (selectRadioRow) {
      return key === getRowid($xeTable, selectRadioRow)
    }
    return false
  },
  /**
   * 用于单选行，设置某一行为选中状态
   * @param {Row} row 行对象
   */
  setRadioRow (row: any) {
    const $xeTable = this

    return handleCheckedRadioRow($xeTable, row, true)
  },
  /**
   * 用于单选行，设置某一行为选中状态
   * @param key 行主键
   */
  setRadioRowKey (rowid: any) {
    const $xeTable = this
    const internalData = $xeTable

    const { fullAllDataRowIdData } = internalData
    const rowRest = fullAllDataRowIdData[rowid]
    if (rowRest) {
      return handleCheckedRadioRow($xeTable, rowRest.row, true)
    }
    return $xeTable.$nextTick()
  },
  /**
   * 用于当前行，手动清空当前高亮的状态
   */
  clearCurrentRow () {
    const { $el } = this
    this.currentRow = null
    this.hoverRow = null
    if ($el) {
      XEUtils.arrayEach($el.querySelectorAll('.row--current'), elem => removeClass(elem, 'row--current'))
    }
    return this.$nextTick()
  },
  /**
   * 用于单选行，手动清空用户的选择
   */
  clearRadioRow () {
    this.selectRadioRow = null
    return this.$nextTick()
  },
  /**
   * 用于当前行，获取当前行的数据
   */
  getCurrentRecord () {
    return this.rowOpts.isCurrent || this.highlightCurrentRow ? this.currentRow : null
  },
  /**
   * 用于单选行，获取当已选中的数据
   */
  getRadioRecord (isFull?: boolean) {
    const { selectRadioRow, fullDataRowIdData, afterFullRowMaps } = this
    if (selectRadioRow) {
      const rowid = getRowid(this, selectRadioRow)
      if (isFull) {
        if (fullDataRowIdData[rowid]) {
          return selectRadioRow
        }
      } else {
        if (afterFullRowMaps[rowid]) {
          return selectRadioRow
        }
      }
    }
    return null
  },
  /**
   * 行 hover 事件
   */
  triggerHoverEvent (evnt: any, { row }: any) {
    this.setHoverRow(row)
  },
  setHoverRow (row: any) {
    const { $el } = this
    const rowid = getRowid(this, row)
    this.clearHoverRow()
    if ($el) {
      XEUtils.arrayEach($el.querySelectorAll(`.vxe-body--row[rowid="${rowid}"]`), elem => addClass(elem, 'row--hover'))
    }
    this.hoverRow = row
  },
  clearHoverRow () {
    const { $el } = this
    if ($el) {
      XEUtils.arrayEach($el.querySelectorAll('.vxe-body--row.row--hover'), elem => removeClass(elem, 'row--hover'))
    }
    this.hoverRow = null
  },
  triggerHeaderCellClickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { _lastResizeTime } = internalData
    const sortOpts = $xeTable.computeSortOpts
    const columnOpts = $xeTable.computeColumnOpts
    const currentColumnOpts = $xeTable.computeCurrentColumnOpts
    const { column } = params
    const cell = evnt.currentTarget
    const triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300
    const triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
    const triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
    if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
      $xeTable.triggerSortEvent(evnt, column, getNextSortOrder($xeTable, column))
    }
    $xeTable.dispatchEvent('header-cell-click', Object.assign({ triggerResizable, triggerSort, triggerFilter, cell }, params), evnt)
    if ((columnOpts.isCurrent || props.highlightCurrentColumn) && (!currentColumnOpts.trigger || ['header', 'default'].includes(currentColumnOpts.trigger))) {
      $xeTable.triggerCurrentColumnEvent(evnt, params)
    }
    return $xeTable.$nextTick()
  },
  triggerHeaderCellDblclickEvent (evnt: any, params: any) {
    this.emitEvent('header-cell-dblclick', Object.assign({ cell: evnt.currentTarget }, params), evnt)
  },
  getCurrentColumn () {
    return this.columnOpts.isCurrent || this.highlightCurrentColumn ? this.currentColumn : null
  },
  /**
   * 用于当前列，设置某列行为高亮状态
   * @param {ColumnInfo} fieldOrColumn 列配置
   */
  setCurrentColumn (fieldOrColumn: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData

    const { mouseConfig } = props
    const mouseOpts = $xeTable.computeMouseOpts
    const isMouseSelected = mouseConfig && mouseOpts.selected
    const column = handleFieldOrColumn($xeTable, fieldOrColumn)
    if (column) {
      $xeTable.clearCurrentColumn()
      reactData.currentColumn = column
    }
    return $xeTable.$nextTick().then(() => {
      // 更新状选中态
      if (isMouseSelected) {
        $xeTable.addCellSelectedClass()
      }
    })
  },
  /**
   * 用于当前列，手动清空当前高亮的状态
   */
  clearCurrentColumn () {
    this.currentColumn = null
    return this.$nextTick()
  },
  /**
   * 列点击事件
   * 如果是单击模式，则激活为编辑状态
   * 如果是双击模式，则单击后选中状态
   */
  triggerCellClickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData

    const { highlightCurrentRow, highlightCurrentColumn, editConfig } = props
    const { editStore, isDragResize } = reactData
    if (isDragResize) {
      return
    }
    const expandOpts = $xeTable.computeExpandOpts
    const editOpts = $xeTable.computeEditOpts
    const treeOpts = $xeTable.computeTreeOpts
    const radioOpts = $xeTable.computeRadioOpts
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const keyboardOpts = $xeTable.computeKeyboardOpts
    const aggregateOpts = $xeTable.computeAggregateOpts
    const rowOpts = $xeTable.computeRowOpts
    const columnOpts = $xeTable.computeColumnOpts
    const currentColumnOpts = $xeTable.computeCurrentColumnOpts
    const { actived, focused } = editStore
    const { row, column } = params
    const { type, treeNode, rowGroupNode } = column
    const isRadioType = type === 'radio'
    const isCheckboxType = type === 'checkbox'
    const isExpandType = type === 'expand'
    const cell = evnt.currentTarget as HTMLDivElement
    const triggerRadio = isRadioType && getEventTargetNode(evnt, cell, 'vxe-cell--radio').flag
    const triggerCheckbox = isCheckboxType && getEventTargetNode(evnt, cell, 'vxe-cell--checkbox').flag
    const triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, 'vxe-cell--tree-btn').flag
    const triggerExpandNode = isExpandType && getEventTargetNode(evnt, cell, 'vxe-table--expanded').flag
    const triggerRowGroupNode = isExpandType && getEventTargetNode(evnt, cell, 'vxe-row-group--node-btn').flag
    params = Object.assign({ cell, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode }, params)
    if (!triggerCheckbox && !triggerRadio) {
      // 如果是展开行
      if (!triggerExpandNode && (expandOpts.trigger === 'row' || (isExpandType && expandOpts.trigger === 'cell'))) {
        $xeTable.triggerRowExpandEvent(evnt, params)
      }
      // 如果是树形表格
      if ((treeOpts.trigger === 'row' || (treeNode && treeOpts.trigger === 'cell'))) {
        $xeTable.triggerTreeExpandEvent(evnt, params)
      }
      // 如果是行分组
      if ((aggregateOpts.trigger === 'row' || (rowGroupNode && aggregateOpts.trigger === 'cell'))) {
        $xeTable.triggerRowGroupExpandEvent(evnt, params)
      }
    }
    // 如果点击了树节点
    if (!triggerTreeNode) {
      if (!triggerExpandNode && !triggerRowGroupNode) {
        // 如果是当前行
        if (rowOpts.isCurrent || highlightCurrentRow) {
          if (!triggerCheckbox && !triggerRadio) {
            $xeTable.triggerCurrentRowEvent(evnt, params)
          }
        }
        // 如果是当前列
        if ((columnOpts.isCurrent || highlightCurrentColumn) && (!currentColumnOpts.trigger || ['cell', 'default'].includes(currentColumnOpts.trigger))) {
          if (!triggerCheckbox && !triggerRadio) {
            $xeTable.triggerCurrentColumnEvent(evnt, params)
          }
        }
        // 如果是单选框
        if (!triggerRadio && (radioOpts.trigger === 'row' || (isRadioType && radioOpts.trigger === 'cell'))) {
          $xeTable.triggerRadioRowEvent(evnt, params)
        }
        // 如果是复选框
        if (!triggerCheckbox && (checkboxOpts.trigger === 'row' || (isCheckboxType && checkboxOpts.trigger === 'cell'))) {
          $xeTable.handleToggleCheckRowEvent(evnt, params)
        }
      }
      // 如果设置了单元格选中功能，则不会使用点击事件去处理（只能支持双击模式）
      if (isEnableConf(editConfig)) {
        // 记录点击输入框聚焦状态
        if (keyboardOpts.arrowCursorLock && evnt && editOpts.mode === 'cell' && evnt.target && /^input|textarea$/i.test((evnt.target as HTMLElement).tagName)) {
          focused.column = column
          focused.row = row
        }
        if (editOpts.trigger === 'manual') {
          if (actived.args && actived.row === row && column !== actived.column) {
            handleChangeCell($xeTable, evnt, params)
          }
        } else if (!actived.args || row !== actived.row || column !== actived.column) {
          if (editOpts.trigger === 'click') {
            handleChangeCell($xeTable, evnt, params)
          } else if (editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row' && actived.row === row) {
              handleChangeCell($xeTable, evnt, params)
            }
          }
        }
      }
    }
    // 如果是双击编辑模式
    if (isEnableConf(editConfig) && editOpts.trigger === 'dblclick') {
      if (actived.row && actived.column) {
        if (editOpts.mode === 'row') {
          if (!$xeTable.eqRow(actived.row, row)) {
            $xeTable.handleClearEdit(evnt)
          }
        } else if (editOpts.mode === 'cell') {
          if (!$xeTable.eqRow(actived.row, row) || actived.column.id !== column.id) {
            $xeTable.handleClearEdit(evnt)
          }
        }
      }
    }
    $xeTable.dispatchEvent('cell-click', params, evnt)
  },
  /**
   * 列双击点击事件
   * 如果是双击模式，则激活为编辑状态
   */
  triggerCellDblclickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData

    const { editConfig } = props
    const { editStore, isDragResize } = reactData
    if (isDragResize) {
      return
    }
    const editOpts = $xeTable.computeEditOpts
    const { actived } = editStore
    const cell = evnt.currentTarget as HTMLDivElement
    params = Object.assign({ cell }, params)
    if (isEnableConf(editConfig) && editOpts.trigger === 'dblclick') {
      if (!actived.args || evnt.currentTarget !== actived.args.cell) {
        if (editOpts.mode === 'row') {
          checkValidate($xeTable, 'blur')
            .catch((e: any) => e)
            .then(() => {
              $xeTable.handleEdit(params, evnt)
                .then(() => checkValidate($xeTable, 'change'))
                .catch((e: any) => e)
            })
        } else if (editOpts.mode === 'cell') {
          $xeTable.handleEdit(params, evnt)
            .then(() => checkValidate($xeTable, 'change'))
            .catch((e: any) => e)
        }
      }
    }
    this.emitEvent('cell-dblclick', params, evnt)
  },
  handleColumnSortEvent (evnt: any, column: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable

    const { mouseConfig } = props
    const mouseOpts = $xeTable.computeMouseOpts
    const { field, sortable, order } = column
    if (sortable) {
      const params = { $table: $xeTable, $event: evnt, column, field, property: field, order, sortList: $xeTable.getSortColumns(), sortTime: column.sortTime }
      if (mouseConfig && mouseOpts.area && $xeTable.handleSortEvent) {
        $xeTable.handleSortEvent(evnt, params)
      }
      if (!order) {
        $xeTable.dispatchEvent('clear-sort', params, evnt)
      }
      $xeTable.dispatchEvent('sort-change', params, evnt)
    }
  },
  /**
   * 点击排序事件
   */
  triggerSortEvent (evnt: Event, column: VxeTableDefines.ColumnInfo, order: VxeTablePropTypes.SortOrder) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const sortOpts = $xeTable.computeSortOpts
    const { multiple, allowClear } = sortOpts
    const { field, sortable } = column
    if (sortable || (column as any).remoteSort) {
      if (!order || column.order === order) {
        if (allowClear) {
          $xeTable.clearSort(multiple ? column : null)
        }
      } else {
        $xeTable.sort({ field, order })
      }
      $xeTable.handleColumnSortEvent(evnt, column)
    }
  },
  handleCellRuleUpdateStatus (type: 'change' | 'blur', cellParams: {
    row: any
    column: VxeTableDefines.ColumnInfo
  }, cellValue?: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { validStore } = reactData
    const { row, column } = cellParams
    if ($xeTable.hasCellRules) {
      if ($xeTable.hasCellRules(type, row, column)) {
        const cell = $xeTable.getCellElement(row, column)
        if (cell) {
          const customVal = !XEUtils.isUndefined(cellValue)
          return $xeTable.validCellRules(type, row, column, cellValue)
            .then(() => {
              if (customVal && validStore.visible) {
                setCellValue(row, column, cellValue)
              }
              $xeTable.clearValidate(row, column)
            })
            .catch(({ rule }: any) => {
              if (customVal) {
                setCellValue(row, column, cellValue)
              }
              $xeTable.showValidTooltip({ rule, row, column, cell })
            })
        }
      }
    }
    return $xeTable.$nextTick()
  },
  /**
   * 表头单元格按下事件
   */
  triggerHeaderCellMousedownEvent (evnt: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable

    const { mouseConfig } = props
    const mouseOpts = $xeTable.computeMouseOpts
    const columnOpts = $xeTable.computeColumnOpts
    const columnDragOpts = $xeTable.computeColumnDragOpts
    const { trigger, isCrossDrag, isPeerDrag, disabledMethod } = columnDragOpts
    const cell = evnt.currentTarget
    const triggerInput = cell && cell.tagName && cell.tagName.toLowerCase() === 'input'
    const triggerCheckbox = getEventTargetNode(evnt, cell, 'vxe-cell--checkbox').flag
    const triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
    const triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
    let triggerDrag = false
    const isColDragCell = columnOpts.drag && trigger === 'cell'
    if (!(triggerInput || triggerCheckbox || triggerSort || triggerFilter)) {
      const { column } = params
      if (isColDragCell && !column.fixed && (isCrossDrag || isPeerDrag || !column.parentId) && !(disabledMethod && disabledMethod(params))) {
        triggerDrag = true
        $xeTable.handleHeaderCellDragMousedownEvent(evnt, params)
      }
    }
    if (!triggerDrag && mouseConfig && mouseOpts.area && $xeTable.handleHeaderCellAreaEvent) {
      $xeTable.handleHeaderCellAreaEvent(evnt, Object.assign({ cell, triggerSort, triggerFilter }, params))
    }
    $xeTable.focus()
    if ($xeTable.closeMenu) {
      $xeTable.closeMenu()
    }
  },
  /**
   * 单元格按下事件
   */
  triggerCellMousedownEvent (evnt: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const { column } = params
    const { type, treeNode } = column
    const isRadioType = type === 'radio'
    const isCheckboxType = type === 'checkbox'
    const isExpandType = type === 'expand'
    const rowOpts = $xeTable.computeRowOpts
    const rowDragOpts = $xeTable.computeRowDragOpts
    const { trigger, isCrossDrag, isPeerDrag, disabledMethod } = rowDragOpts
    const cell = evnt.currentTarget
    params.cell = cell
    const triggerInput = cell && cell.tagName && cell.tagName.toLowerCase() === 'input'
    const triggerRadio = isRadioType && getEventTargetNode(evnt, cell, 'vxe-cell--radio').flag
    const triggerCheckbox = isCheckboxType && getEventTargetNode(evnt, cell, 'vxe-cell--checkbox').flag
    const triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, 'vxe-cell--tree-btn').flag
    const triggerExpandNode = isExpandType && getEventTargetNode(evnt, cell, 'vxe-table--expanded').flag
    let isColDragCell = false
    if (rowOpts.drag) {
      isColDragCell = trigger === 'row' || (column.dragSort && trigger === 'cell')
    }
    let triggerDrag = false
    if (!(triggerInput || triggerRadio || triggerCheckbox || triggerTreeNode || triggerExpandNode)) {
      if (isColDragCell && (isCrossDrag || isPeerDrag || !params.level) && !(disabledMethod && disabledMethod(params))) {
        triggerDrag = true
        $xeTable.handleCellDragMousedownEvent(evnt, params)
      }
    }
    if (!triggerDrag && $xeTable.handleCellMousedownEvent) {
      $xeTable.handleCellMousedownEvent(evnt, params)
    }
    $xeTable.focus()
    $xeTable.closeFilter()
    if ($xeTable.closeMenu) {
      $xeTable.closeMenu()
    }
  },
  triggerCellMouseupEvent () {
    const $xeTable = this

    clearDragStatus($xeTable)
  },
  /**
   * 行拖拽
   */
  handleRowDragDragstartEvent (evnt: DragEvent) {
    if (evnt.dataTransfer) {
      evnt.dataTransfer.setDragImage(getTpImg(), 0, 0)
    }
  },
  handleRowDragSwapEvent (evnt: DragEvent | null, isSyncRow: boolean | undefined, dragRow: any, prevDragRow: any, prevDragPos: '' | 'top' | 'bottom' | 'left' | 'right' | undefined, prevDragToChild: boolean | undefined) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig, dragConfig } = props
    const rowDragOpts = $xeTable.computeRowDragOpts
    const { afterFullData, tableFullData, fullAllDataRowIdData } = internalData
    const { isPeerDrag, isCrossDrag, isSelfToChildDrag, dragEndMethod, dragToChildMethod } = rowDragOpts
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, rowField, mapChildrenField, parentField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const dEndMethod = dragEndMethod || (dragConfig ? dragConfig.dragEndMethod : null)
    const dragOffsetIndex = prevDragPos === 'bottom' ? 1 : 0
    const errRest = {
      status: false
    }
    if (prevDragRow && dragRow) {
      // 判断是否有拖动
      if (prevDragRow !== dragRow) {
        const dragParams = {
          oldRow: dragRow,
          newRow: prevDragRow,
          dragRow,
          dragPos: prevDragPos as 'top' | 'bottom',
          dragToChild: !!prevDragToChild,
          offsetIndex: dragOffsetIndex as 0 | 1
        }
        const isDragToChildFlag = isSelfToChildDrag && dragToChildMethod ? dragToChildMethod(dragParams) : prevDragToChild
        return Promise.resolve(dEndMethod ? dEndMethod(dragParams) : true).then((status) => {
          if (!status) {
            return errRest
          }

          let oafIndex = -1
          let nafIndex = -1
          // 如果为树结构
          if (treeConfig) {
            if (transform) {
              // 移出源位置
              const oldRowid = getRowid($xeTable, dragRow)
              const oldRest = fullAllDataRowIdData[oldRowid]
              const newRowid = getRowid($xeTable, prevDragRow)
              const newRest = fullAllDataRowIdData[newRowid]

              if (oldRest && newRest) {
                const { level: oldLevel } = oldRest
                const { level: newLevel } = newRest

                const oldAllMaps: Record<string, any> = {}
                XEUtils.eachTree([dragRow], item => {
                  oldAllMaps[getRowid($xeTable, item)] = item
                }, { children: mapChildrenField })

                let isSelfToChildStatus = false

                if (oldLevel && newLevel) {
                  // 子到子

                  if (isPeerDrag && !isCrossDrag) {
                    if (oldRest.row[parentField] !== newRest.row[parentField]) {
                      // 非同级
                      return errRest
                    }
                  } else {
                    if (!isCrossDrag) {
                      return errRest
                    }
                    if (oldAllMaps[newRowid]) {
                      isSelfToChildStatus = true
                      if (!(isCrossDrag && isSelfToChildDrag)) {
                        if (VxeUI.modal) {
                          VxeUI.modal.message({
                            status: 'error',
                            content: getI18n('vxe.error.treeDragChild')
                          })
                        }
                        return errRest
                      }
                    }
                  }
                } else if (oldLevel) {
                  // 子到根

                  if (!isCrossDrag) {
                    return errRest
                  }
                } else if (newLevel) {
                  // 根到子

                  if (!isCrossDrag) {
                    return errRest
                  }
                  if (oldAllMaps[newRowid]) {
                    isSelfToChildStatus = true
                    if (!(isCrossDrag && isSelfToChildDrag)) {
                      if (VxeUI.modal) {
                        VxeUI.modal.message({
                          status: 'error',
                          content: getI18n('vxe.error.treeDragChild')
                        })
                      }
                      return errRest
                    }
                  }
                } else {
                  // 根到根
                }

                const fullList = XEUtils.toTreeArray(internalData.afterTreeFullData, {
                  key: rowField,
                  parentKey: parentField,
                  children: mapChildrenField
                })

                // 移出
                const otfIndex = $xeTable.findRowIndexOf(fullList, dragRow)
                fullList.splice(otfIndex, 1)

                // 插入
                const ptfIndex = $xeTable.findRowIndexOf(fullList, prevDragRow)
                const ntfIndex = ptfIndex + dragOffsetIndex
                fullList.splice(ntfIndex, 0, dragRow)

                // 改变层级
                if (isSelfToChildStatus && (isCrossDrag && isSelfToChildDrag)) {
                  XEUtils.each(dragRow[childrenField], childRow => {
                    childRow[parentField] = dragRow[parentField]
                  })
                }
                dragRow[parentField] = isDragToChildFlag ? prevDragRow[rowField] : prevDragRow[parentField]

                internalData.tableFullTreeData = XEUtils.toArrayTree(fullList, {
                  key: rowField,
                  parentKey: parentField,
                  children: childrenField,
                  mapChildren: mapChildrenField
                })
              }
            }
          } else {
            // 移出
            oafIndex = $xeTable.findRowIndexOf(afterFullData, dragRow)
            const otfIndex = $xeTable.findRowIndexOf(tableFullData, dragRow)
            afterFullData.splice(oafIndex, 1)
            tableFullData.splice(otfIndex, 1)
            // 插入
            const pafIndex = $xeTable.findRowIndexOf(afterFullData, prevDragRow)
            const ptfIndex = $xeTable.findRowIndexOf(tableFullData, prevDragRow)
            nafIndex = pafIndex + dragOffsetIndex
            const ntfIndex = ptfIndex + dragOffsetIndex
            afterFullData.splice(nafIndex, 0, dragRow)
            tableFullData.splice(ntfIndex, 0, dragRow)
          }

          reactData.isDragRowMove = true
          $xeTable.handleTableData(treeConfig && transform)
          $xeTable.cacheRowMap(false)
          updateScrollYStatus($xeTable)
          if (!(treeConfig && transform)) {
            updateAfterDataIndex($xeTable)
          }
          $xeTable.checkSelectionStatus()
          if (reactData.scrollYLoad) {
            $xeTable.updateScrollYSpace()
          }

          if (evnt) {
            $xeTable.dispatchEvent('row-dragend', {
              oldRow: dragRow,
              newRow: prevDragRow,
              dragRow,
              dragPos: prevDragPos as any,
              dragToChild: isDragToChildFlag,
              offsetIndex: dragOffsetIndex,
              _index: {
                newIndex: nafIndex,
                oldIndex: oafIndex
              }
            }, evnt)
          }

          return $xeTable.$nextTick().then(() => {
            $xeTable.updateCellAreas()
            $xeTable.recalculate()
          }).then(() => {
            return {
              status: true
            }
          })
        }).catch(() => {
          return errRest
        })
      }
    }
    return Promise.resolve(errRest)
  },
  handleRowDragDragendEvent (evnt: DragEvent) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { fullAllDataRowIdData, prevDragToChild } = internalData
    const { dragRow } = reactData
    const treeOpts = $xeTable.computeTreeOpts
    const { lazy } = treeOpts
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const { prevDragRow, prevDragPos } = internalData

    if (treeConfig && lazy && prevDragToChild) {
      // 懒加载
      const newRowid = getRowid($xeTable, prevDragRow)
      const rowRest = fullAllDataRowIdData[newRowid]
      if (prevDragRow[hasChildField]) {
        if (rowRest && rowRest.treeLoaded) {
          $xeTable.handleRowDragSwapEvent(evnt, true, dragRow, prevDragRow, prevDragPos, prevDragToChild)
        }
      } else {
        $xeTable.handleRowDragSwapEvent(evnt, true, dragRow, prevDragRow, prevDragPos, prevDragToChild)
      }
    } else {
      $xeTable.handleRowDragSwapEvent(evnt, true, dragRow, prevDragRow, prevDragPos, prevDragToChild)
    }
    hideDropTip($xeTable)
    clearRowDropOrigin($xeTable)
    internalData.prevDragToChild = false
    reactData.dragRow = null
    reactData.dragCol = null
    setTimeout(() => {
      reactData.isDragRowMove = false
    }, 500)
  },
  handleRowDragDragoverEvent (evnt: DragEvent) {
    const $xeTable = this
    const props = $xeTable
    const internalData = $xeTable
    const reactData = $xeTable

    const { treeConfig } = props
    const { fullAllDataRowIdData } = internalData
    const { dragRow } = reactData
    const treeOpts = $xeTable.computeTreeOpts
    const { lazy, transform, parentField } = treeOpts
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const rowDragOpts = $xeTable.computeRowDragOpts
    const { isPeerDrag, isCrossDrag, isToChildDrag } = rowDragOpts
    if (!dragRow) {
      evnt.preventDefault()
      return
    }
    const isControlKey = hasControlKey(evnt)
    const trEl = evnt.currentTarget as HTMLElement
    const rowid = trEl.getAttribute('rowid') || ''
    const rest = fullAllDataRowIdData[rowid]
    if (rest) {
      const row = rest.row
      const rowid = getRowid($xeTable, row)
      const rowRest = fullAllDataRowIdData[rowid]
      evnt.preventDefault()
      const { dragRow } = reactData
      const offsetY = evnt.clientY - trEl.getBoundingClientRect().y
      const dragPos = offsetY < trEl.clientHeight / 2 ? 'top' : 'bottom'
      internalData.prevDragToChild = !!(treeConfig && transform && isToChildDrag && isControlKey)
      internalData.prevDragRow = row
      internalData.prevDragPos = dragPos
      if ($xeTable.eqRow(dragRow, row) ||
        (isControlKey && treeConfig && lazy && row[hasChildField] && rowRest && !rowRest.treeLoaded) ||
        (!isCrossDrag && treeConfig && transform && (isPeerDrag ? dragRow[parentField] !== row[parentField] : rest.level))
      ) {
        showDropTip($xeTable, evnt, trEl, null, false, dragPos)
        return
      }
      showDropTip($xeTable, evnt, trEl, null, true, dragPos)
      $xeTable.dispatchEvent('row-dragover', {
        oldRow: dragRow,
        targetRow: row,
        dragPos
      }, evnt)
    }
  },
  handleCellDragMousedownEvent (evnt: MouseEvent, params: any) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable

    evnt.stopPropagation()
    const { dragConfig } = props
    const rowDragOpts = $xeTable.computeRowDragOpts
    const { trigger, dragStartMethod } = rowDragOpts
    const { row } = params
    const dragEl = evnt.currentTarget as HTMLElement
    const tdEl = trigger === 'cell' || trigger === 'row' ? dragEl : dragEl.parentElement?.parentElement as HTMLElement
    const trEl = tdEl.parentElement as HTMLElement
    const dStartMethod = dragStartMethod || (dragConfig ? dragConfig.dragStartMethod : null)
    reactData.isDragRowMove = false
    clearRowDropOrigin($xeTable)
    if (dStartMethod && !dStartMethod(params)) {
      trEl.draggable = false
      reactData.dragRow = null
      reactData.dragCol = null
      hideDropTip($xeTable)
      return
    }
    reactData.dragRow = row
    reactData.dragCol = null
    trEl.draggable = true
    updateRowDropOrigin($xeTable, row)
    updateRowDropTipContent($xeTable, tdEl)
    $xeTable.dispatchEvent('row-dragstart', params, evnt)
  },
  handleCellDragMouseupEvent () {
    const $xeTable = this

    clearDragStatus($xeTable)
  },
  /**
   * 列拖拽
   */
  handleHeaderCellDragDragstartEvent (evnt: DragEvent) {
    if (evnt.dataTransfer) {
      evnt.dataTransfer.setDragImage(getTpImg(), 0, 0)
    }
  },
  handleColDragSwapColumn () {
    const $xeTable = this

    handleUpdateColumn($xeTable)
    parseColumns($xeTable, false).then(() => {
      $xeTable.updateCellAreas()
      $xeTable.saveCustomStore('update:sort')
    })
  },
  handleColDragSwapEvent (evnt: DragEvent | null, isSyncColumn: boolean | undefined, dragCol: VxeTableDefines.ColumnInfo | null | undefined, prevDragCol: VxeTableDefines.ColumnInfo | undefined, prevDragPos: '' | 'top' | 'bottom' | 'left' | 'right' | undefined, prevDragToChild: boolean | undefined) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable
    const internalData = $xeTable

    const { mouseConfig } = props
    const columnDragOpts = $xeTable.computeColumnDragOpts
    const { isPeerDrag, isCrossDrag, isSelfToChildDrag, isToChildDrag, dragEndMethod, dragToChildMethod } = columnDragOpts
    const { collectColumn } = internalData
    const dragOffsetIndex = prevDragPos === 'right' ? 1 : 0
    const errRest = {
      status: false
    }
    if (prevDragCol && dragCol) {
      // 判断是否有拖动
      if (prevDragCol !== dragCol) {
        const dragColumn = dragCol
        const newColumn = prevDragCol
        const dragParams = {
          oldColumn: dragColumn,
          newColumn,
          dragColumn,
          dragPos: prevDragPos as 'left' | 'right',
          dragToChild: !!prevDragToChild,
          offsetIndex: dragOffsetIndex as 0 | 1
        }
        const isDragToChildFlag = isSelfToChildDrag && dragToChildMethod ? dragToChildMethod(dragParams) : prevDragToChild
        return Promise.resolve(dragEndMethod ? dragEndMethod(dragParams) : true).then((status) => {
          if (!status) {
            return errRest
          }

          let oafIndex = -1
          let nafIndex = -1

          const oldAllMaps: Record<string, any> = {}
          XEUtils.eachTree([dragColumn], column => {
            oldAllMaps[column.id] = column
          })

          let isSelfToChildStatus = false

          if (dragColumn.parentId && newColumn.parentId) {
            // 子到子

            if (isPeerDrag && !isCrossDrag) {
              if (dragColumn.parentId !== newColumn.parentId) {
                // 非同级
                return errRest
              }
            } else {
              if (!isCrossDrag) {
                return errRest
              }

              if (oldAllMaps[newColumn.id]) {
                isSelfToChildStatus = true
                if (!(isCrossDrag && isSelfToChildDrag)) {
                  if (VxeUI.modal) {
                    VxeUI.modal.message({
                      status: 'error',
                      content: getI18n('vxe.error.treeDragChild')
                    })
                  }
                  return errRest
                }
              }
            }
          } else if (dragColumn.parentId) {
            // 子到根

            if (!isCrossDrag) {
              return errRest
            }
          } else if (newColumn.parentId) {
            // 根到子

            if (!isCrossDrag) {
              return errRest
            }
            if (oldAllMaps[newColumn.id]) {
              isSelfToChildStatus = true
              if (!(isCrossDrag && isSelfToChildDrag)) {
                if (VxeUI.modal) {
                  VxeUI.modal.message({
                    status: 'error',
                    content: getI18n('vxe.error.treeDragChild')
                  })
                }
                return errRest
              }
            }
          } else {
            // 根到根
          }

          const oldewMatchRest = XEUtils.findTree(collectColumn as VxeTableDefines.ColumnInfo[], item => item.id === dragColumn.id)

          // 改变层级
          if (isSelfToChildStatus && (isCrossDrag && isSelfToChildDrag)) {
            if (oldewMatchRest) {
              const { items: oCols, index: oIndex } = oldewMatchRest
              const childList = dragColumn.children || []
              childList.forEach(column => {
                column.parentId = dragColumn.parentId
              })
              oCols.splice(oIndex, 1, ...childList)
              dragColumn.children = []
            }
          } else {
            if (oldewMatchRest) {
              const { items: oCols, index: oIndex, parent: oParent } = oldewMatchRest
              oCols.splice(oIndex, 1)
              if (!oParent) {
                oafIndex = oIndex
              }
            }
          }

          const newMatchRest = XEUtils.findTree(collectColumn as VxeTableDefines.ColumnInfo[], item => item.id === newColumn.id)
          if (newMatchRest) {
            const { items: nCols, index: nIndex, parent: nParent } = newMatchRest
            // 转子级
            if ((isCrossDrag && isToChildDrag) && isDragToChildFlag) {
              dragColumn.parentId = newColumn.id
              newColumn.children = (newColumn.children || []).concat([dragColumn])
            } else {
              dragColumn.parentId = newColumn.parentId
              nCols.splice(nIndex + dragOffsetIndex, 0, dragColumn)
            }
            if (!nParent) {
              nafIndex = nIndex
            }
          }

          XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn) => {
            if (!parentColumn) {
              const sortIndex = index + 1
              column.renderSortNumber = sortIndex
            }
          })

          reactData.isDragColMove = true
          if (mouseConfig) {
            if ($xeTable.clearSelected) {
              $xeTable.clearSelected()
            }
            if ($xeTable.clearCellAreas) {
              $xeTable.clearCellAreas()
              $xeTable.clearCopyCellArea()
            }
          }

          if (evnt) {
            $xeTable.dispatchEvent('column-dragend', {
              oldColumn: dragColumn,
              newColumn,
              dragColumn,
              dragPos: prevDragPos,
              dragToChild: isDragToChildFlag,
              offsetIndex: dragOffsetIndex,
              _index: {
                newIndex: nafIndex,
                oldIndex: oafIndex
              }
            }, evnt)
          }

          if (isSyncColumn) {
            $xeTable.handleColDragSwapColumn()
          }

          return {
            status: true
          }
        }).catch(() => {
          return errRest
        })
      }
    }
    return Promise.resolve(errRest)
  },
  handleHeaderCellDragDragendEvent (evnt: DragEvent) {
    const $xeTable = this
    const reactData = $xeTable
    const internalData = $xeTable

    const { dragCol } = reactData
    const { prevDragCol, prevDragPos, prevDragToChild } = internalData
    $xeTable.handleColDragSwapEvent(evnt, true, dragCol, prevDragCol, prevDragPos, prevDragToChild)
    hideDropTip($xeTable)
    clearColDropOrigin($xeTable)
    internalData.prevDragToChild = false
    reactData.dragRow = null
    reactData.dragCol = null
    setTimeout(() => {
      reactData.isDragColMove = false
      $xeTable.recalculate().then(() => {
        loadScrollXData($xeTable)
      })
    }, 500)
  },
  handleHeaderCellDragDragoverEvent (evnt: DragEvent) {
    const $xeTable = this
    const reactData = $xeTable
    const internalData = $xeTable

    const { dragCol } = reactData
    const columnDragOpts = $xeTable.computeColumnDragOpts
    const { isToChildDrag, isPeerDrag, isCrossDrag } = columnDragOpts
    if (!dragCol) {
      evnt.preventDefault()
      return
    }
    const isControlKey = hasControlKey(evnt)
    const thEl = evnt.currentTarget as HTMLElement
    const colid = thEl.getAttribute('colid')
    const column = $xeTable.getColumnById(colid)
    if (column) {
      evnt.preventDefault()
      const { clientX } = evnt
      const offsetX = clientX - thEl.getBoundingClientRect().x
      const dragPos = offsetX < thEl.clientWidth / 2 ? 'left' : 'right'
      internalData.prevDragToChild = !!((isCrossDrag && isToChildDrag) && isControlKey)
      internalData.prevDragCol = column
      internalData.prevDragPos = dragPos
      if (column.fixed ||
        (dragCol && dragCol.id === column.id) ||
        (!isCrossDrag && (isPeerDrag ? dragCol.parentId !== column.parentId : column.parentId))
      ) {
        showDropTip($xeTable, evnt, null, thEl, false, dragPos)
        return
      }
      showDropTip($xeTable, evnt, null, thEl, true, dragPos)
      $xeTable.dispatchEvent('column-dragover', {
        oldColumn: dragCol,
        targetColumn: column,
        dragPos
      }, evnt)

      // 边缘滚动
      const el = $xeTable.$refs.refElem as HTMLElement
      if (!el) {
        return
      }
      const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
      const refTableBody = $xeTable.$refs.refTableBody
      const tableBodyElem = refTableBody ? refTableBody.$el as HTMLDivElement : null
      const scrollTargetEl = xHandleEl || tableBodyElem
      if (scrollTargetEl) {
        const wrapperRect = el.getBoundingClientRect()
        const tableWrapperWidth = el.clientWidth
        const leftContainerElem = $xeTable.$refs.refLeftContainer as HTMLDivElement
        const leftContainerWidth = leftContainerElem ? leftContainerElem.clientWidth : 0
        const rightContainerElem = $xeTable.$refs.refRightContainer as HTMLDivElement
        const rightContainerWidth = rightContainerElem ? rightContainerElem.clientWidth : 0
        const srartX = wrapperRect.x + leftContainerWidth
        const endX = wrapperRect.x + tableWrapperWidth - rightContainerWidth
        const distSize = 28
        const startDistSize = clientX - srartX
        const endDistSize = endX - clientX
        if (startDistSize > 0 && startDistSize <= distSize) {
          const scrollRatio = Math.floor(tableWrapperWidth / (startDistSize > distSize / 2 ? 240 : 120))
          scrollTargetEl.scrollLeft -= scrollRatio * (distSize - startDistSize)
        } else if (endDistSize > 0 && endDistSize <= distSize) {
          const scrollRatio = Math.floor(tableWrapperWidth / (endDistSize > distSize / 2 ? 240 : 120))
          scrollTargetEl.scrollLeft += scrollRatio * (distSize - endDistSize)
        }
      }
    }
  },
  handleHeaderCellDragMousedownEvent (evnt: MouseEvent, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    evnt.stopPropagation()
    const columnDragOpts = $xeTable.computeColumnDragOpts
    const { trigger, dragStartMethod } = columnDragOpts
    const { column } = params
    const dragEl = evnt.currentTarget as HTMLElement
    const thEl = trigger === 'cell' ? dragEl : dragEl.parentElement?.parentElement as HTMLElement
    reactData.isDragColMove = false
    clearColDropOrigin($xeTable)
    if (dragStartMethod && !dragStartMethod(params)) {
      thEl.draggable = false
      reactData.dragRow = null
      reactData.dragCol = null
      hideDropTip($xeTable)
      return
    }
    reactData.dragCol = column
    reactData.dragRow = null
    thEl.draggable = true
    updateColDropOrigin($xeTable, column)
    updateColDropTipContent($xeTable, thEl)
    $xeTable.dispatchEvent('column-dragstart', params, evnt)
  },
  handleHeaderCellDragMouseupEvent () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    clearColDropOrigin($xeTable)
    hideDropTip($xeTable)
    reactData.dragRow = null
    reactData.dragCol = null
    reactData.isDragColMove = false
  },
  setPendingRow (rows: any, status: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { handleGetRowId } = createHandleGetRowId($xeTable)
    const { pendingRowMaps } = internalData
    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    if (status) {
      rows.forEach((row: any) => {
        const rowid = handleGetRowId(row)
        if (rowid && !pendingRowMaps[rowid]) {
          pendingRowMaps[rowid] = row
        }
      })
    } else {
      rows.forEach((row: any) => {
        const rowid = handleGetRowId(row)
        if (rowid && pendingRowMaps[rowid]) {
          delete pendingRowMaps[rowid]
        }
      })
    }
    reactData.pendingRowFlag++
    return $xeTable.$nextTick()
  },
  togglePendingRow (rows: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { handleGetRowId } = createHandleGetRowId($xeTable)
    const { pendingRowMaps } = internalData
    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    rows.forEach((row: any) => {
      const rowid = handleGetRowId(row)
      if (rowid) {
        if (pendingRowMaps[rowid]) {
          delete pendingRowMaps[rowid]
        } else {
          pendingRowMaps[rowid] = row
        }
      }
    })
    reactData.pendingRowFlag++
    return $xeTable.$nextTick()
  },
  hasPendingByRow (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return $xeTable.isPendingByRow(row)
  },
  isPendingByRow (row: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { pendingRowMaps } = reactData
    const rowid = getRowid($xeTable, row)
    return !!pendingRowMaps[rowid]
  },
  getPendingRecords () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData, pendingRowMaps } = internalData
    const insertRecords: any[] = []
    XEUtils.each(pendingRowMaps, (row, rowid) => {
      if (fullAllDataRowIdData[rowid]) {
        insertRecords.push(row)
      }
    })
    return insertRecords
  },
  clearPendingRow () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    internalData.pendingRowMaps = {}
    reactData.pendingRowFlag++
    return $xeTable.$nextTick()
  },
  sort (sortConfs: any, sortOrder: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const sortOpts = $xeTable.computeSortOpts
    const { multiple, remote, orders } = sortOpts
    if (sortConfs) {
      if (XEUtils.isString(sortConfs)) {
        sortConfs = [
          { field: sortConfs, order: sortOrder }
        ]
      }
    }
    if (!XEUtils.isArray(sortConfs)) {
      sortConfs = [sortConfs]
    }
    if (sortConfs.length) {
      let firstSortColumn: any
      if (!multiple) {
        clearAllSort($xeTable)
      }
      (multiple ? sortConfs : [sortConfs[0]]).forEach((confs: any, index: any) => {
        let { field, order } = confs
        let column = field
        if (XEUtils.isString(field)) {
          column = $xeTable.getColumnByField(field)
        }
        if (column && (column.sortable || column.remoteSort)) {
          if (!firstSortColumn) {
            firstSortColumn = column
          }
          if (orders && orders.indexOf(order) === -1) {
            order = getNextSortOrder($xeTable, column)
          }
          if (column.order !== order) {
            column.order = order
          }
          column.sortTime = Date.now() + index
        }
      })
      // 如果是服务端排序，则跳过本地排序处理
      if (!remote || (firstSortColumn && firstSortColumn.remoteSort)) {
        $xeTable.handleTableData(true)
      }
      return $xeTable.$nextTick().then(() => {
        updateRowOffsetTop($xeTable)
        $xeTable.updateCellAreas()
        return updateStyle($xeTable)
      })
    }
    return $xeTable.$nextTick()
  },
  setSort (sortConfs: VxeTableDefines.SortConfs | VxeTableDefines.SortConfs[], isUpdate?: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    // 已废弃，即将去掉事件触发 new Event('click') -> null
    return handleSortEvent($xeTable, new Event('click'), sortConfs, isUpdate)
  },
  setSortByEvent (evnt: Event, sortConfs: VxeTableDefines.SortConfs | VxeTableDefines.SortConfs[], isUpdate?: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return handleSortEvent($xeTable, evnt, sortConfs, isUpdate)
  },
  /**
   * 清空指定列的排序条件
   * 如果为空则清空所有列的排序条件
   * @param {String} column 列或字段名
   */
  clearSort (fieldOrColumn: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const sortOpts = $xeTable.computeSortOpts
    if (fieldOrColumn) {
      const column = handleFieldOrColumn($xeTable, fieldOrColumn)
      if (column) {
        column.order = null
      }
    } else {
      clearAllSort($xeTable)
    }
    if (!sortOpts.remote) {
      $xeTable.handleTableData(true)
    }
    return $xeTable.$nextTick().then(() => {
      updateRowOffsetTop($xeTable)
      return updateStyle($xeTable)
    })
  },
  clearSortByEvent (evnt: Event, fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any> | null) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { tableFullColumn } = internalData
    const sortOpts = $xeTable.computeSortOpts
    const sortCols: VxeTableDefines.ColumnInfo[] = []
    let column: VxeTableDefines.ColumnInfo<any> | null = null
    if (evnt) {
      if (fieldOrColumn) {
        column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column) {
          column.order = null
        }
      } else {
        tableFullColumn.forEach((column) => {
          if (column.order) {
            column.order = null
            sortCols.push(column)
          }
        })
      }
      if (!sortOpts.remote) {
        $xeTable.handleTableData(true)
      }
      if (sortCols.length) {
        const params = { $table: $xeTable, $event: evnt, cols: sortCols, sortList: [] }
        $xeTable.dispatchEvent('clear-all-sort', params, evnt)
      } else if (column) {
        $xeTable.handleColumnSortEvent(evnt, column)
      }
    }
    return $xeTable.$nextTick().then(() => {
      updateRowOffsetTop($xeTable)
      return updateStyle($xeTable)
    })
  },
  // 在 v3 中废弃
  getSortColumn () {
    warnLog('vxe.error.delFunc', ['getSortColumn', 'getSortColumns'])
    return XEUtils.find(this.tableFullColumn, column => (column.sortable || column.remoteSort) && column.order)
  },
  isSort (fieldOrColumn: any) {
    if (fieldOrColumn) {
      const column = handleFieldOrColumn(this, fieldOrColumn)
      return column && column.sortable && !!column.order
    }
    return this.getSortColumns().length > 0
  },
  getSortColumns () {
    const { multiple, chronological } = this.sortOpts
    const sortList: any[] = []
    this.tableFullColumn.forEach((column: any) => {
      const { field, order } = column
      if ((column.sortable || column.remoteSort) && order) {
        sortList.push({ column, field, property: field, order, sortTime: column.sortTime })
      }
    })
    if (multiple && chronological && sortList.length > 1) {
      return XEUtils.orderBy(sortList, 'sortTime')
    }
    return sortList
  },
  setFilterByEvent (evnt: Event, fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>, options: VxeColumnPropTypes.FilterItem[], isUpdate?: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const column = handleFieldOrColumn($xeTable, fieldOrColumn)
    if (column && column.filters) {
      column.filters = toFilters(options || [])
      if (isUpdate) {
        return $xeTable.handleColumnConfirmFilter(column, evnt)
      }
    }
    return $xeTable.$nextTick()
  },
  /**
   * 关闭筛选
   * @param {Event} evnt 事件
   */
  closeFilter () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { filterStore } = reactData
    const { column, visible } = filterStore
    filterStore.isAllSelected = false
    filterStore.isIndeterminate = false
    filterStore.options = []
    filterStore.visible = false
    if (visible) {
      $xeTable.dispatchEvent('filter-visible', {
        column,
        field: column.field,
        property: column.field,
        filterList: () => $xeTable.getCheckedFilters(),
        visible: false
      }, null)
    }
    return $xeTable.$nextTick()
  },
  /**
   * 判断指定列是否为筛选状态，如果为空则判断所有列
   * @param {String} fieldOrColumn 字段名
   */
  isActiveFilterByColumn (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      return column.filters && column.filters.some((option: any) => option.checked)
    }
    return this.getCheckedFilters().length > 0
  },
  // 已废弃
  isFilter (fieldOrColumn: any) {
    return this.isActiveFilterByColumn(fieldOrColumn)
  },
  clearFilterByEvent (evnt: Event, fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any> | null) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { filterStore } = reactData
    const { tableFullColumn } = internalData
    const filterOpts = $xeTable.computeFilterOpts
    const filterCols: VxeTableDefines.ColumnInfo[] = []
    let column: VxeTableDefines.ColumnInfo<any> | null = null
    if (fieldOrColumn) {
      column = handleFieldOrColumn($xeTable, fieldOrColumn)
      if (column) {
        $xeTable.handleClearFilter(column)
      }
    } else {
      tableFullColumn.forEach(column => {
        if (column.filters) {
          filterCols.push(column)
          $xeTable.handleClearFilter(column)
        }
      })
    }
    if (!fieldOrColumn || column !== filterStore.column) {
      Object.assign(filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false
      })
    }
    if (!filterOpts.remote) {
      $xeTable.updateData()
    }
    if (filterCols.length) {
      const params = { $table: $xeTable, $event: evnt, cols: filterCols, filterList: [] }
      $xeTable.dispatchEvent('clear-all-filter', params, evnt)
    } else if (column) {
      $xeTable.dispatchEvent('clear-filter', { filterList: () => $xeTable.getCheckedFilters() }, evnt)
    }
    return $xeTable.$nextTick()
  },
  /**
   * 判断展开行是否懒加载完成
   * @param {Row} row 行对象
   */
  isRowExpandLoaded (row: any) {
    const $xeTable = this

    const { fullAllDataRowIdData } = this
    const rowRest = fullAllDataRowIdData[getRowid($xeTable, row)]
    return rowRest && !!rowRest.expandLoaded
  },
  clearRowExpandLoaded (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData, rowExpandLazyLoadedMaps } = internalData
    const expandOpts = $xeTable.computeExpandOpts
    const { lazy } = expandOpts
    const rowid = getRowid($xeTable, row)
    const rowRest = fullAllDataRowIdData[rowid]
    if (lazy && rowRest) {
      rowRest.expandLoaded = false
      delete rowExpandLazyLoadedMaps[rowid]
    }
    reactData.rowExpandedFlag++
    return $xeTable.$nextTick()
  },
  /**
   * 重新懒加载展开行，并展开内容
   * @param {Row} row 行对象
   */
  reloadRowExpand (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { rowExpandLazyLoadedMaps } = internalData
    const expandOpts = $xeTable.computeExpandOpts
    const { lazy } = expandOpts
    const rowid = getRowid(this, row)
    if (lazy && !rowExpandLazyLoadedMaps[rowid]) {
      $xeTable.clearRowExpandLoaded(row)
        .then(() => handleAsyncRowExpand($xeTable, row))
    }
    return $xeTable.$nextTick()
  },
  reloadExpandContent (row: any) {
    warnLog('vxe.error.delFunc', ['reloadExpandContent', 'reloadRowExpand'])
    // 即将废弃
    return this.reloadRowExpand(row)
  },
  /**
   * 展开行事件
   */
  triggerRowExpandEvent (evnt: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { expandColumn } = reactData
    const { rowExpandLazyLoadedMaps } = internalData
    const expandOpts = $xeTable.computeExpandOpts
    const { row } = params
    const { lazy, trigger } = expandOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    const rowid = getRowid($xeTable, row)
    if (!lazy || !rowExpandLazyLoadedMaps[rowid]) {
      const expanded = !$xeTable.isRowExpandByRow(row)
      const columnIndex = expandColumn ? $xeTable.getColumnIndex(expandColumn) : -1
      const $columnIndex = expandColumn ? $xeTable.getVMColumnIndex(expandColumn) : -1
      $xeTable.setRowExpand(row, expanded)
      $xeTable.dispatchEvent('toggle-row-expand', {
        expanded,
        column: expandColumn,
        columnIndex,
        $columnIndex,
        row,
        rowIndex: $xeTable.getRowIndex(row),
        $rowIndex: $xeTable.getVMRowIndex(row)
      }, evnt)
    }
  },
  /**
   * 切换展开行
   */
  toggleRowExpand (row: any) {
    return this.setRowExpand(row, !this.isRowExpandByRow(row))
  },
  /**
   * 设置所有行的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllRowExpand (expanded: any) {
    const { treeConfig, treeOpts, tableFullData, tableFullTreeData } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    let expandedRows = []
    if (treeConfig) {
      XEUtils.eachTree(tableFullTreeData, (row) => {
        expandedRows.push(row)
      }, { children: childrenField })
    } else {
      expandedRows = tableFullData
    }
    return this.setRowExpand(expandedRows, expanded)
  },
  /**
   * 设置展开行，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setRowExpand (rows: any, expanded: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { expandColumn } = reactData
    let { fullAllDataRowIdData, rowExpandedMaps, rowExpandLazyLoadedMaps } = internalData
    const { handleGetRowId } = createHandleGetRowId($xeTable)
    const expandOpts = $xeTable.computeExpandOpts
    const { reserve, lazy, accordion, toggleMethod } = expandOpts
    const lazyRests: any[] = []
    const columnIndex = expandColumn ? $xeTable.getColumnIndex(expandColumn) : -1
    const $columnIndex = expandColumn ? $xeTable.getVMColumnIndex(expandColumn) : -1
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (accordion) {
        // 只能同时展开一个
        rowExpandedMaps = {}
        internalData.rowExpandedMaps = rowExpandedMaps
        rows = rows.slice(rows.length - 1, rows.length)
      }
      const validRows: any[] = toggleMethod ? rows.filter((row: any) => toggleMethod({ $table: $xeTable, expanded, column: expandColumn as VxeTableDefines.ColumnInfo, columnIndex, $columnIndex, row, rowIndex: $xeTable.getRowIndex(row), $rowIndex: $xeTable.getVMRowIndex(row) })) : rows
      if (expanded) {
        validRows.forEach((row: any) => {
          const rowid = handleGetRowId(row)
          if (!rowExpandedMaps[rowid]) {
            const rowRest = fullAllDataRowIdData[rowid]
            const isLoad = lazy && !rowRest.expandLoaded && !rowExpandLazyLoadedMaps[rowid]
            if (isLoad) {
              lazyRests.push(handleAsyncRowExpand($xeTable, row))
            } else {
              rowExpandedMaps[rowid] = row
            }
          }
        })
      } else {
        validRows.forEach(item => {
          const rowid = handleGetRowId(item)
          if (rowExpandedMaps[rowid]) {
            delete rowExpandedMaps[rowid]
          }
        })
      }
      if (reserve) {
        validRows.forEach((row) => handleRowExpandReserve($xeTable, row, expanded))
      }
    }
    reactData.rowExpandedFlag++
    return Promise.all(lazyRests)
      .then(() => $xeTable.$nextTick())
      .then(() => $xeTable.recalculate(true))
      .then(() => {
        updateRowOffsetTop($xeTable)
        updateRowExpandStyle($xeTable)
        handleRowExpandScroll($xeTable)
        return $xeTable.updateCellAreas()
      })
  },
  /**
   * 判断行是否为展开状态
   * @param {Row} row 行对象
   */
  isRowExpandByRow (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { rowExpandedFlag } = reactData
    const { rowExpandedMaps } = internalData
    const rowid = getRowid(this, row)
    return !!rowExpandedFlag && !!rowExpandedMaps[rowid]
  },
  isExpandByRow (row: any) {
    warnLog('vxe.error.delFunc', ['isExpandByRow', 'isRowExpandByRow'])
    // 即将废弃
    return this.isRowExpandByRow(row)
  },
  /**
   * 手动清空展开行状态，数据会恢复成未展开的状态
   */
  clearRowExpand () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { tableFullData } = internalData
    const expandOpts = $xeTable.computeExpandOpts
    const { reserve } = expandOpts
    const expList = $xeTable.getRowExpandRecords()
    internalData.rowExpandedMaps = {}
    reactData.rowExpandedFlag++
    if (reserve) {
      tableFullData.forEach((row) => handleRowExpandReserve($xeTable, row, false))
    }
    return $xeTable.$nextTick().then(() => {
      if (expList.length) {
        return $xeTable.recalculate(true)
      }
    }).then(() => {
      updateRowOffsetTop($xeTable)
      updateRowExpandStyle($xeTable)
      handleRowExpandScroll($xeTable)
      return $xeTable.updateCellAreas()
    })
  },
  clearRowExpandReserve () {
    this.rowExpandedReserveRowMap = {}
    return this.$nextTick()
  },
  getRowExpandRecords () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const rest: any[] = []
    XEUtils.each(internalData.rowExpandedMaps, item => {
      if (item) {
        rest.push(item)
      }
    })
    return rest
  },
  setRowGroups (fieldOrColumns: (VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo)[] | VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | null) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { aggregateConfig, rowGroupConfig } = props
    if (!(aggregateConfig || rowGroupConfig)) {
      errLog('vxe.error.reqProp', ['aggregate-config'])
      return $xeTable.$nextTick()
    }
    if (fieldOrColumns) {
      handleUpdateRowGroup($xeTable, (XEUtils.isArray(fieldOrColumns) ? fieldOrColumns : [fieldOrColumns]).map(fieldOrColumn => {
        return XEUtils.isString(fieldOrColumn) ? fieldOrColumn : fieldOrColumn.field
      }))
      return loadTableData($xeTable, internalData.tableSynchData, true)
    }
    return $xeTable.$nextTick()
  },
  clearRowGroups () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { aggregateConfig, rowGroupConfig } = props
    if (!(aggregateConfig || rowGroupConfig)) {
      errLog('vxe.error.reqProp', ['aggregate-config'])
      return $xeTable.$nextTick()
    }
    handleUpdateRowGroup($xeTable, [])
    return loadTableData($xeTable, internalData.tableSynchData, true)
  },
  isRowGroupRecord (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    warnLog('vxe.error.delFunc', ['isRowGroupRecord', 'isAggregateRecord'])
    return $xeTable.isAggregateRecord(row)
  },
  isRowGroupExpandByRow (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    warnLog('vxe.error.delFunc', ['isRowGroupExpandByRow', 'isAggregateExpandByRow'])
    return $xeTable.isAggregateExpandByRow(row)
  },
  isAggregateRecord (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { isRowGroupStatus } = reactData
    return isRowGroupStatus && row.isAggregate
  },
  isAggregateExpandByRow (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { rowGroupExpandedFlag } = reactData
    const { rowGroupExpandedMaps } = internalData
    return !!rowGroupExpandedFlag && !!rowGroupExpandedMaps[getRowid($xeTable, row)]
  },
  setRowGroupExpand (rows: any, expanded: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      return handleRowGroupVirtualExpand($xeTable, rows, expanded)
    }
    return $xeTable.$nextTick()
  },
  setAllRowGroupExpand (expanded: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { tableFullGroupData } = internalData
    const aggregateOpts = $xeTable.computeAggregateOpts
    const { mapChildrenField } = aggregateOpts
    const rgExpandedMaps: Record<string, any> = {}
    if (expanded && mapChildrenField) {
      XEUtils.eachTree(tableFullGroupData, (row) => {
        if (row[mapChildrenField] && row[mapChildrenField].length) {
          rgExpandedMaps[getRowid($xeTable, row)] = row
        }
      }, { children: mapChildrenField })
    }
    internalData.rowGroupExpandedMaps = rgExpandedMaps
    handleVirtualTreeToList($xeTable)
    reactData.rowGroupExpandedFlag++
    return $xeTable.handleTableData()
  },
  clearRowGroupExpand () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    internalData.rowGroupExpandedMaps = {}
    handleVirtualTreeToList($xeTable)
    reactData.rowGroupExpandedFlag++
    return $xeTable.handleTableData()
  },
  getTreeExpandRecords () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const rest: any[] = []
    XEUtils.each(internalData.treeExpandedMaps, item => {
      if (item) {
        rest.push(item)
      }
    })
    return rest
  },
  /**
   * 内部方法、获取树表格状态
   * @deprecated
   * @private
   */
  getTreeStatus () {
    if (this.treeConfig) {
      return {
        config: this.treeOpts,
        rowExpandeds: this.getTreeExpandRecords()
      }
    }
    return null
  },
  /**
   * 判断树节点是否懒加载完成
   * @param {Row} row 行对象
   */
  isTreeExpandLoaded (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const { fullAllDataRowIdData } = this
    const rowRest = fullAllDataRowIdData[getRowid($xeTable, row)]
    return rowRest && !!rowRest.treeLoaded
  },
  clearTreeExpandLoaded (rows: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData, treeExpandedMaps } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const { transform } = treeOpts
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      rows.forEach((row: any) => {
        const rowid = getRowid($xeTable, row)
        const rowRest = fullAllDataRowIdData[rowid]
        if (rowRest) {
          rowRest.treeLoaded = false
          if (treeExpandedMaps[rowid]) {
            delete treeExpandedMaps[rowid]
          }
        }
      })
    } else {
      XEUtils.each(fullAllDataRowIdData, (rowRest) => {
        rowRest.treeLoaded = false
      })
    }
    internalData.treeExpandedMaps = {}
    if (transform) {
      handleVirtualTreeToList($xeTable)
      $xeTable.handleTableData()
    }
    reactData.treeExpandedFlag++
    return $xeTable.$nextTick()
  },
  /**
   * 重新懒加载树节点，并展开该节点
   * @param {Row} row 行对象
   */
  reloadTreeExpand (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeExpandLazyLoadedMaps } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, lazy } = treeOpts
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const rowid = getRowid($xeTable, row)
    if (lazy && row[hasChildField] && !treeExpandLazyLoadedMaps[rowid]) {
      return $xeTable.clearTreeExpandLoaded(row).then(() => {
        return handleAsyncTreeExpandChilds($xeTable, row)
      }).then(() => {
        if (transform) {
          handleVirtualTreeToList($xeTable)
          $xeTable.handleTableData()
        }
        reactData.treeExpandedFlag++
      }).then(() => {
        return $xeTable.recalculate()
      })
    }
    return $xeTable.$nextTick()
  },
  reloadTreeChilds (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    warnLog('vxe.error.delFunc', ['reloadTreeChilds', 'reloadTreeExpand'])
    // 即将废弃
    return $xeTable.reloadTreeExpand(row)
  },
  /**
   * 行分组事件
   */
  triggerRowGroupExpandEvent (evnt: any, params: VxeTableDefines.CellRenderBodyParams) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { rowGroupExpandedMaps } = internalData
    const aggregateOpts = $xeTable.computeAggregateOpts
    const { row, column } = params
    const { trigger } = aggregateOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    const rowid = getRowid($xeTable, row)
    const expanded = !rowGroupExpandedMaps[rowid]
    const columnIndex = $xeTable.getColumnIndex(column)
    const $columnIndex = $xeTable.getVMColumnIndex(column)
    $xeTable.setRowGroupExpand(row, expanded)
    $xeTable.dispatchEvent('toggle-row-group-expand', { expanded, column, columnIndex, $columnIndex, row }, evnt)
  },
  /**
   * 展开树节点事件
   */
  triggerTreeExpandEvent (evnt: any, params: VxeTableDefines.CellRenderBodyParams) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { treeExpandLazyLoadedMaps, treeEATime } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const { row, column } = params
    const { lazy, trigger, accordion } = treeOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    const rowid = getRowid(this, row)
    if (!lazy || !treeExpandLazyLoadedMaps[rowid]) {
      const expanded = !$xeTable.isTreeExpandByRow(row)
      const columnIndex = $xeTable.getColumnIndex(column)
      const $columnIndex = $xeTable.getVMColumnIndex(column)
      if (treeEATime) {
        clearTimeout(treeEATime)
      }
      $xeTable.setTreeExpand(row, expanded).then(() => {
        if (accordion) {
          internalData.treeEATime = setTimeout(() => {
            internalData.treeEATime = undefined
            $xeTable.scrollToRow(row)
          }, 30)
        }
      })
      $xeTable.dispatchEvent('toggle-tree-expand', { expanded, column, columnIndex, $columnIndex, row }, evnt)
    }
  },
  /**
   * 切换/展开树节点
   */
  toggleTreeExpand (row: any) {
    return this.setTreeExpand(row, !this.isTreeExpandByRow(row))
  },
  /**
   * 设置所有树节点的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllTreeExpand (expanded: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { tableFullData } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, lazy } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const expandeds: any[] = []
    XEUtils.eachTree(tableFullData, (row) => {
      const rowChildren = row[childrenField]
      if (lazy || (rowChildren && rowChildren.length)) {
        expandeds.push(row)
      }
    }, { children: childrenField })
    return $xeTable.setTreeExpand(expandeds, expanded).then(() => {
      if (transform) {
        handleVirtualTreeToList($xeTable)
        reactData.treeExpandedFlag++
        return $xeTable.recalculate()
      }
    })
  },
  /**
   * 设置展开树形节点，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setTreeExpand (rows: any | any[], expanded: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const { treeOpts } = this
    const { transform } = treeOpts
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (rows.length) {
        // 如果为虚拟树
        if (transform) {
          return handleVirtualTreeExpand($xeTable, rows, expanded)
        } else {
          return handleBaseTreeExpand($xeTable, rows, expanded)
        }
      }
    }
    return this.$nextTick()
  },
  /**
   * 判断行是否为树形节点展开状态
   * @param {Row} row 行对象
   */
  isTreeExpandByRow (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeExpandedFlag } = reactData
    const { treeExpandedMaps } = internalData
    return !!treeExpandedFlag && !!treeExpandedMaps[getRowid($xeTable, row)]
  },
  /**
   * 手动清空树形节点的展开状态，数据会恢复成未展开的状态
   */
  clearTreeExpand () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { tableFullTreeData } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const { transform, reserve } = treeOpts
    const expList = $xeTable.getTreeExpandRecords()
    internalData.treeExpandedMaps = {}
    if (reserve) {
      XEUtils.eachTree(tableFullTreeData, row => handleTreeExpandReserve($xeTable, row, false), { children: childrenField })
    }
    return $xeTable.handleTableData().then(() => {
      if (transform) {
        handleVirtualTreeToList($xeTable)
        $xeTable.handleTableData()
      }
      reactData.treeExpandedFlag++
    }).then(() => {
      if (expList.length) {
        $xeTable.recalculate()
      }
    })
  },
  clearTreeExpandReserve () {
    this.treeExpandedReserveRowMap = {}
    return this.$nextTick()
  },
  /**
   * 获取表格的滚动状态
   */
  getScroll () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { scrollXLoad, scrollYLoad } = reactData
    const { elemStore } = internalData
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    return {
      virtualX: scrollXLoad,
      virtualY: scrollYLoad,
      scrollTop: bodyScrollElem ? bodyScrollElem.scrollTop : 0,
      scrollLeft: bodyScrollElem ? bodyScrollElem.scrollLeft : 0
    }
  },
  handleScrollEvent (evnt: Event, isRollY: boolean, isRollX: boolean, scrollTop: number, scrollLeft: number, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { highlightHoverRow } = props
    const { lastScrollLeft, lastScrollTop } = internalData
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    if (!xHandleEl || !yHandleEl) {
      return
    }
    const rowOpts = $xeTable.computeRowOpts
    const validTip = $xeTable.$refs.refValidTooltip as VxeTooltipInstance
    const tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
    const bodyHeight = yHandleEl.clientHeight
    const bodyWidth = xHandleEl.clientWidth
    const scrollHeight = yHandleEl.scrollHeight
    const scrollWidth = xHandleEl.scrollWidth
    let isTop = false
    let isBottom = false
    let isLeft = false
    let isRight = false
    let direction = ''
    let isTopBoundary = false
    let isBottomBoundary = false
    let isLeftBoundary = false
    let isRightBoundary = false
    if (isRollX) {
      const xThreshold = $xeTable.computeScrollXThreshold
      isLeft = scrollLeft <= 0
      if (!isLeft) {
        isRight = scrollLeft + bodyWidth >= scrollWidth
      }
      if (scrollLeft > lastScrollLeft) {
        direction = 'right'
        if (scrollLeft + bodyWidth >= scrollWidth - xThreshold) {
          isRightBoundary = true
        }
      } else {
        direction = 'left'
        if (scrollLeft <= xThreshold) {
          isLeftBoundary = true
        }
      }
      $xeTable.checkScrolling()
      internalData.lastScrollLeft = scrollLeft
    }
    if (isRollY) {
      const yThreshold = $xeTable.computeScrollYThreshold
      isTop = scrollTop <= 0
      if (!isTop) {
        isBottom = scrollTop + bodyHeight >= scrollHeight
      }
      if (scrollTop > lastScrollTop) {
        direction = 'bottom'
        if (scrollTop + bodyHeight >= scrollHeight - yThreshold) {
          isBottomBoundary = true
        }
      } else {
        direction = 'top'
        if (scrollTop <= yThreshold) {
          isTopBoundary = true
        }
      }
      internalData.lastScrollTop = scrollTop
    }
    reactData.isDragColMove = false
    reactData.isDragRowMove = false
    reactData.lastScrollTime = Date.now()
    const evntParams = {
      scrollTop,
      scrollLeft,
      bodyHeight,
      bodyWidth,
      scrollHeight,
      scrollWidth,
      isX: isRollX,
      isY: isRollY,
      isTop,
      isBottom,
      isLeft,
      isRight,
      direction,
      ...params
    }
    updateRowExpandStyle($xeTable)
    checkLastSyncScroll($xeTable, isRollX, isRollY)
    if (isRollX) {
      $xeTable.closeFilter()
    }
    if (rowOpts.isHover || highlightHoverRow) {
      $xeTable.clearHoverRow()
    }
    if (validTip && validTip.reactData.visible) {
      validTip.close()
    }
    if (tooltip && tooltip.reactData.visible) {
      tooltip.close()
    }
    if (isBottomBoundary || isTopBoundary || isRightBoundary || isLeftBoundary) {
      $xeTable.dispatchEvent('scroll-boundary', evntParams, evnt)
    }
    $xeTable.dispatchEvent('scroll', evntParams, evnt)
  },
  /**
   * 横向 X 可视渲染事件处理
   */
  triggerScrollXEvent () {
    const $xeTable = this

    const virtualXOpts = $xeTable.computeVirtualXOpts
    if (virtualXOpts.immediate) {
      loadScrollXData($xeTable)
    } else {
      lazyScrollXData($xeTable)
    }
  },
  /**
   * 纵向 Y 可视渲染事件处理
   */
  triggerScrollYEvent () {
    const $xeTable = this

    const virtualYOpts = $xeTable.computeVirtualYOpts
    if (virtualYOpts.immediate) {
      loadScrollYData($xeTable)
    } else {
      lazyScrollYData($xeTable)
    }
  },
  triggerBodyScrollEvent (evnt: Event, fixedType: '' | 'left' | 'right') {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { scrollYLoad, scrollXLoad } = reactData
    const { elemStore, intoRunScroll, lastScrollTop, lastScrollLeft, inWheelScroll, inVirtualScroll, inHeaderScroll, inBodyScroll, scrollRenderType, inFooterScroll } = internalData
    if (inWheelScroll || inVirtualScroll || inHeaderScroll || inFooterScroll) {
      return
    }
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    const rowExpandEl = $xeTable.$refs.refRowExpandElem as HTMLDivElement
    if (intoRunScroll) {
      return
    }
    if (!bodyScrollElem) {
      return
    }
    if (!xHandleEl) {
      return
    }
    if (!yHandleEl) {
      return
    }
    if (inBodyScroll) {
      if (scrollRenderType !== fixedType) {
        return
      }
    }
    let scrollTop = yHandleEl.scrollTop
    let scrollLeft = xHandleEl.scrollLeft
    if (leftScrollElem && fixedType === 'left') {
      scrollTop = leftScrollElem.scrollTop
    } else if (rightScrollElem && fixedType === 'right') {
      scrollTop = rightScrollElem.scrollTop
    } else {
      scrollTop = bodyScrollElem.scrollTop
      scrollLeft = bodyScrollElem.scrollLeft
    }
    const isRollX = scrollLeft !== lastScrollLeft
    const isRollY = scrollTop !== lastScrollTop
    internalData.inBodyScroll = true
    internalData.scrollRenderType = fixedType
    if (isRollY) {
      if (fixedType === 'left') {
        setScrollTop(bodyScrollElem, scrollTop)
        setScrollTop(rightScrollElem, scrollTop)
      } else if (fixedType === 'right') {
        setScrollTop(bodyScrollElem, scrollTop)
        setScrollTop(leftScrollElem, scrollTop)
      } else {
        setScrollTop(leftScrollElem, scrollTop)
        setScrollTop(rightScrollElem, scrollTop)
      }
      setScrollTop(yHandleEl, scrollTop)
      setScrollTop(rowExpandEl, scrollTop)
      if (scrollYLoad) {
        $xeTable.triggerScrollYEvent(evnt)
      }
    }
    if (isRollX) {
      setScrollLeft(xHandleEl, scrollLeft)
      setScrollLeft(headerScrollElem, scrollLeft)
      setScrollLeft(footerScrollElem, scrollLeft)
      if (scrollXLoad) {
        $xeTable.triggerScrollXEvent(evnt)
      }
    }
    $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
      type: 'body',
      fixed: fixedType
    })
  },
  triggerHeaderScrollEvent (evnt: Event, fixedType: '' | 'left' | 'right') {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { scrollXLoad } = reactData
    const { elemStore, intoRunScroll, inWheelScroll, inVirtualScroll, inBodyScroll, inFooterScroll } = internalData
    if (inWheelScroll || inVirtualScroll || inBodyScroll || inFooterScroll) {
      return
    }
    if (intoRunScroll) {
      return
    }
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    if (!headerScrollElem) {
      return
    }
    if (!xHandleEl) {
      return
    }
    if (!yHandleEl) {
      return
    }
    const scrollTop = yHandleEl.scrollTop
    const scrollLeft = headerScrollElem.scrollLeft
    const isRollX = true
    const isRollY = false
    internalData.inHeaderScroll = true
    setScrollLeft(xHandleEl, scrollLeft)
    setScrollLeft(footerScrollElem, scrollLeft)
    setScrollLeft(bodyScrollElem, scrollLeft)
    if (scrollXLoad) {
      $xeTable.triggerScrollXEvent(evnt)
    }
    $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
      type: 'header',
      fixed: fixedType
    })
  },
  triggerFooterScrollEvent (evnt: Event, fixedType: '' | 'left' | 'right') {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { scrollXLoad } = reactData
    const { elemStore, intoRunScroll, inWheelScroll, inVirtualScroll, inHeaderScroll, inBodyScroll } = internalData
    if (inWheelScroll || inVirtualScroll || inHeaderScroll || inBodyScroll) {
      return
    }
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    if (intoRunScroll) {
      return
    }
    if (!footerScrollElem) {
      return
    }
    if (!xHandleEl) {
      return
    }
    if (!yHandleEl) {
      return
    }
    const scrollTop = yHandleEl.scrollTop
    const scrollLeft = footerScrollElem.scrollLeft
    const isRollX = true
    const isRollY = false
    internalData.inFooterScroll = true
    setScrollLeft(xHandleEl, scrollLeft)
    setScrollLeft(headerScrollElem, scrollLeft)
    setScrollLeft(bodyScrollElem, scrollLeft)
    if (scrollXLoad) {
      $xeTable.triggerScrollXEvent(evnt)
    }
    $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
      type: 'footer',
      fixed: fixedType
    })
  },
  triggerBodyWheelEvent (evnt: WheelEvent) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const tableProps = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { target, deltaY, deltaX, shiftKey } = evnt
    if (target && /^textarea$/i.test((target as HTMLElement).tagName)) {
      return
    }

    const { highlightHoverRow } = tableProps
    const { scrollXLoad, scrollYLoad, expandColumn } = reactData
    const leftFixedWidth = $xeTable.computeLeftFixedWidth
    const rightFixedWidth = $xeTable.computeRightFixedWidth
    if (!(leftFixedWidth || rightFixedWidth || expandColumn)) {
      return
    }

    const { elemStore, lastScrollTop, lastScrollLeft } = internalData
    const rowOpts = $xeTable.computeRowOpts
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
    const rowExpandEl = $xeTable.$refs.refRowExpandElem as HTMLDivElement
    if (!xHandleEl) {
      return
    }
    if (!yHandleEl) {
      return
    }
    if (!bodyScrollElem) {
      return
    }

    const wheelSpeed = getWheelSpeed(reactData.lastScrollTime)
    const deltaTop = shiftKey ? 0 : Math.ceil(deltaY * wheelSpeed)
    const deltaLeft = Math.ceil((shiftKey ? (deltaY || deltaX) : deltaX) * wheelSpeed)

    const isTopWheel = deltaTop < 0
    const currScrollTop = bodyScrollElem.scrollTop
    // 如果滚动位置已经是顶部或底部，则不需要触发
    if (isTopWheel ? currScrollTop <= 0 : currScrollTop >= bodyScrollElem.scrollHeight - bodyScrollElem.clientHeight) {
      return
    }

    const scrollTop = currScrollTop + deltaTop
    const scrollLeft = bodyScrollElem.scrollLeft + deltaLeft
    const isRollX = scrollLeft !== lastScrollLeft
    const isRollY = scrollTop !== lastScrollTop

    if (rowOpts.isHover || highlightHoverRow) {
      $xeTable.clearHoverRow()
    }
    // 用于鼠标纵向滚轮处理
    if (isRollX) {
      evnt.preventDefault()
      internalData.inWheelScroll = true
      if (browseObj.firefox || browseObj.safari) {
        const currLeftNum = scrollLeft
        setScrollLeft(xHandleEl, currLeftNum)
        setScrollLeft(bodyScrollElem, currLeftNum)
        setScrollLeft(headerScrollElem, currLeftNum)
        setScrollLeft(footerScrollElem, currLeftNum)
        if (scrollXLoad) {
          $xeTable.triggerScrollXEvent(evnt)
        }
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, bodyScrollElem.scrollTop, currLeftNum, {
          type: 'table',
          fixed: ''
        })
      } else {
        wheelScrollLeftTo(scrollLeft, (offsetLeft: number) => {
          const currLeftNum = offsetLeft
          setScrollLeft(xHandleEl, currLeftNum)
          setScrollLeft(bodyScrollElem, currLeftNum)
          setScrollLeft(headerScrollElem, currLeftNum)
          setScrollLeft(footerScrollElem, currLeftNum)
          if (scrollXLoad) {
            $xeTable.triggerScrollXEvent(evnt)
          }
          $xeTable.handleScrollEvent(evnt, isRollY, isRollX, bodyScrollElem.scrollTop, currLeftNum, {
            type: 'table',
            fixed: ''
          })
        })
      }
    }
    if (isRollY) {
      evnt.preventDefault()
      if (browseObj.firefox || browseObj.safari) {
        const currTopNum = scrollTop
        setScrollTop(yHandleEl, currTopNum)
        setScrollTop(bodyScrollElem, currTopNum)
        setScrollTop(leftScrollElem, currTopNum)
        setScrollTop(rightScrollElem, currTopNum)
        setScrollTop(rowExpandEl, currTopNum)
        if (scrollYLoad) {
          $xeTable.triggerScrollYEvent(evnt)
        }
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, currTopNum, bodyScrollElem.scrollLeft, {
          type: 'table',
          fixed: ''
        })
      } else {
        wheelScrollTopTo(scrollTop - currScrollTop, (offsetTop: number) => {
          const currTopNum = bodyScrollElem.scrollTop + offsetTop
          internalData.inWheelScroll = true
          setScrollTop(yHandleEl, currTopNum)
          setScrollTop(bodyScrollElem, currTopNum)
          setScrollTop(leftScrollElem, currTopNum)
          setScrollTop(rightScrollElem, currTopNum)
          setScrollTop(rowExpandEl, currTopNum)
          if (scrollYLoad) {
            $xeTable.triggerScrollYEvent(evnt)
          }
          $xeTable.handleScrollEvent(evnt, isRollY, isRollX, currTopNum, bodyScrollElem.scrollLeft, {
            type: 'table',
            fixed: ''
          })
        })
      }
    }
  },
  triggerVirtualScrollXEvent (evnt: Event) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { scrollXLoad } = reactData
    const { elemStore, inWheelScroll, lastScrollTop, inHeaderScroll, inBodyScroll, inFooterScroll } = internalData
    if (inHeaderScroll || inBodyScroll || inFooterScroll) {
      return
    }
    if (inWheelScroll) {
      return
    }
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    const wrapperEl = evnt.currentTarget as HTMLDivElement
    const { scrollLeft } = wrapperEl
    const yBodyEl = yHandleEl || bodyScrollElem
    let scrollTop = 0
    if (yBodyEl) {
      scrollTop = yBodyEl.scrollTop
    }
    const isRollX = true
    const isRollY = scrollTop !== lastScrollTop

    internalData.inVirtualScroll = true
    setScrollLeft(bodyScrollElem, scrollLeft)
    setScrollLeft(headerScrollElem, scrollLeft)
    setScrollLeft(footerScrollElem, scrollLeft)
    if (scrollXLoad) {
      $xeTable.triggerScrollXEvent(evnt)
    }
    $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
      type: 'table',
      fixed: ''
    })
  },
  triggerVirtualScrollYEvent (evnt: Event) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { scrollYLoad } = reactData
    const { elemStore, inWheelScroll, lastScrollLeft, inHeaderScroll, inBodyScroll, inFooterScroll } = internalData
    if (inHeaderScroll || inBodyScroll || inFooterScroll) {
      return
    }
    if (inWheelScroll) {
      return
    }
    const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
    const rowExpandEl = $xeTable.$refs.refRowExpandElem as HTMLDivElement
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const wrapperEl = evnt.currentTarget as HTMLDivElement
    const { scrollTop } = wrapperEl
    const xBodyEl = xHandleEl || bodyScrollElem
    let scrollLeft = 0
    if (xBodyEl) {
      scrollLeft = xBodyEl.scrollLeft
    }
    const isRollX = scrollLeft !== lastScrollLeft
    const isRollY = true

    internalData.inVirtualScroll = true
    setScrollTop(bodyScrollElem, scrollTop)
    setScrollTop(leftScrollElem, scrollTop)
    setScrollTop(rightScrollElem, scrollTop)
    setScrollTop(rowExpandEl, scrollTop)
    if (scrollYLoad) {
      $xeTable.triggerScrollYEvent(evnt)
    }
    $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
      type: 'table',
      fixed: ''
    })
  },
  updateScrollXData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { isAllOverflow } = reactData
    handleTableColumn($xeTable)
    $xeTable.updateScrollXSpace()
    return $xeTable.$nextTick().then(() => {
      handleTableColumn($xeTable)
      $xeTable.updateScrollXSpace()
      if (!isAllOverflow) {
        $xeTable.updateScrollYSpace()
      }
    })
  },
  // 更新横向 X 可视渲染上下剩余空间大小
  updateScrollXSpace () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { scrollXLoad, overflowX, scrollXWidth } = reactData
    const { visibleColumn, scrollXStore, elemStore, fullColumnIdData } = internalData
    const mouseOpts = $xeTable.computeMouseOpts
    const tableBody = $xeTable.$refs.refTableBody
    const tableBodyElem = tableBody ? (tableBody as any).$el as HTMLDivElement : null
    if (tableBodyElem) {
      const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
      const bodyTableElem = getRefElem(elemStore['main-body-table'])
      const headerTableElem = getRefElem(elemStore['main-header-table'])
      const footerTableElem = getRefElem(elemStore['main-footer-table'])

      let xSpaceLeft = 0
      const firstColumn = visibleColumn[scrollXStore.startIndex]
      if (firstColumn) {
        const colRest = fullColumnIdData[firstColumn.id] || {}
        xSpaceLeft = colRest.oLeft
      }

      let clientWidth = 0
      if (bodyScrollElem) {
        clientWidth = bodyScrollElem.clientWidth
      }
      // 虚拟渲染
      let isScrollXBig = false
      let ySpaceWidth = scrollXWidth
      if (scrollXWidth > maxXWidth) {
        // 触右
        if (bodyScrollElem && bodyTableElem && bodyScrollElem.scrollLeft + clientWidth >= maxXWidth) {
          xSpaceLeft = maxXWidth - bodyTableElem.clientWidth
        } else {
          xSpaceLeft = (maxXWidth - clientWidth) * (xSpaceLeft / (scrollXWidth - clientWidth))
        }
        ySpaceWidth = maxXWidth
        isScrollXBig = true
      }

      if (!(scrollXLoad && overflowX)) {
        xSpaceLeft = 0
      }

      if (headerTableElem) {
        headerTableElem.style.transform = headerTableElem.getAttribute('xvm') ? `translate(${xSpaceLeft}px, 0px)` : ''
      }
      if (bodyTableElem) {
        bodyTableElem.style.transform = `translate(${xSpaceLeft}px, ${reactData.scrollYTop || 0}px)`
      }
      if (footerTableElem) {
        footerTableElem.style.transform = footerTableElem.getAttribute('xvm') ? `translate(${xSpaceLeft}px, 0px)` : ''
      }

      const containerList = ['main']
      containerList.forEach(name => {
        const layoutList = ['header', 'body', 'footer']
        layoutList.forEach(layout => {
          const xSpaceElem = getRefElem(elemStore[`${name}-${layout}-xSpace`])
          if (xSpaceElem) {
            xSpaceElem.style.width = scrollXLoad ? `${ySpaceWidth}px` : ''
          }
        })
      })

      reactData.scrollXLeft = xSpaceLeft
      reactData.scrollXWidth = ySpaceWidth
      reactData.isScrollXBig = isScrollXBig
      const scrollXSpaceEl = $xeTable.$refs.refScrollXSpaceElem as HTMLDivElement
      if (scrollXSpaceEl) {
        scrollXSpaceEl.style.width = `${ySpaceWidth}px`
      }

      if (isScrollXBig && mouseOpts.area) {
        errLog('vxe.error.notProp', ['mouse-config.area'])
      }
      calcScrollbar($xeTable)
      return $xeTable.$nextTick(() => {
        updateStyle($xeTable)
      })
    }
  },
  updateScrollYData () {
    const $xeTable = this

    $xeTable.handleTableData()
    $xeTable.updateScrollYSpace()
    return $xeTable.$nextTick().then(() => {
      $xeTable.handleTableData()
      $xeTable.updateScrollYSpace()
    })
  },
  // 更新纵向 Y 可视渲染上下剩余空间大小
  updateScrollYSpace () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { isAllOverflow, scrollYLoad, expandColumn } = reactData
    const { scrollYStore, elemStore, isResizeCellHeight, afterFullData, fullAllDataRowIdData, rowExpandedMaps } = internalData
    const { startIndex } = scrollYStore
    const mouseOpts = $xeTable.computeMouseOpts
    const expandOpts = $xeTable.computeExpandOpts
    const rowOpts = $xeTable.computeRowOpts
    const cellOpts = $xeTable.computeCellOpts
    const defaultRowHeight = $xeTable.computeDefaultRowHeight
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const bodyTableElem = getRefElem(elemStore['main-body-table'])
    const leftBodyTableElem = getRefElem(elemStore['left-body-table'])
    const rightbodyTableElem = getRefElem(elemStore['right-body-table'])
    const containerList = ['main', 'left', 'right']
    let ySpaceTop = 0
    let scrollYHeight = 0
    let isScrollYBig = false
    if (scrollYLoad) {
      const isCustomCellHeight = isResizeCellHeight || cellOpts.height || rowOpts.height
      if (!isCustomCellHeight && !expandColumn && isAllOverflow) {
        scrollYHeight = afterFullData.length * defaultRowHeight
        if (scrollYHeight > maxYHeight) {
          isScrollYBig = true
        }
        ySpaceTop = Math.max(0, startIndex * defaultRowHeight)
      } else {
        const firstRow = afterFullData[startIndex]
        let rowid = getRowid($xeTable, firstRow)
        let rowRest = fullAllDataRowIdData[rowid] || {}
        ySpaceTop = (rowRest.oTop || 0)

        const lastRow = afterFullData[afterFullData.length - 1]
        rowid = getRowid($xeTable, lastRow)
        rowRest = fullAllDataRowIdData[rowid] || {}
        scrollYHeight = (rowRest.oTop || 0) + (rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight)
        // 是否展开行
        if (expandColumn && rowExpandedMaps[rowid]) {
          scrollYHeight += rowRest.expandHeight || expandOpts.height || 0
        }
        if (scrollYHeight > maxYHeight) {
          isScrollYBig = true
        }
      }
    } else {
      if (bodyTableElem) {
        scrollYHeight = bodyTableElem.clientHeight
      }
    }
    let clientHeight = 0
    if (bodyScrollElem) {
      clientHeight = bodyScrollElem.clientHeight
    }
    // 虚拟渲染
    let ySpaceHeight = scrollYHeight
    let scrollYTop = ySpaceTop
    if (isScrollYBig) {
      // 触底
      if (bodyScrollElem && bodyTableElem && bodyScrollElem.scrollTop + clientHeight >= maxYHeight) {
        scrollYTop = maxYHeight - bodyTableElem.clientHeight
      } else {
        scrollYTop = (maxYHeight - clientHeight) * (ySpaceTop / (scrollYHeight - clientHeight))
      }
      ySpaceHeight = maxYHeight
    }

    if (leftBodyTableElem) {
      leftBodyTableElem.style.transform = `translate(0px, ${scrollYTop}px)`
    }
    if (bodyTableElem) {
      bodyTableElem.style.transform = `translate(${reactData.scrollXLeft || 0}px, ${scrollYTop}px)`
    }
    if (rightbodyTableElem) {
      rightbodyTableElem.style.transform = `translate(0px, ${scrollYTop}px)`
    }

    containerList.forEach(name => {
      const layoutList = ['header', 'body', 'footer']
      layoutList.forEach(layout => {
        const ySpaceElem = getRefElem(elemStore[`${name}-${layout}-ySpace`])
        if (ySpaceElem) {
          ySpaceElem.style.height = ySpaceHeight ? `${ySpaceHeight}px` : ''
        }
      })
    })

    const scrollYSpaceEl = $xeTable.$refs.refScrollYSpaceElem as HTMLDivElement
    if (scrollYSpaceEl) {
      scrollYSpaceEl.style.height = ySpaceHeight ? `${ySpaceHeight}px` : ''
    }
    const rowExpandYSpaceEl = $xeTable.$refs.refRowExpandYSpaceElem as HTMLDivElement
    if (rowExpandYSpaceEl) {
      rowExpandYSpaceEl.style.height = ySpaceHeight ? `${ySpaceHeight}px` : ''
    }
    reactData.scrollYTop = scrollYTop
    reactData.scrollYHeight = scrollYHeight
    reactData.isScrollYBig = isScrollYBig

    if (isScrollYBig && mouseOpts.area) {
      errLog('vxe.error.notProp', ['mouse-config.area'])
    }
    calcScrollbar($xeTable)
    return $xeTable.$nextTick().then(() => {
      updateStyle($xeTable)
    })
  },
  updateScrollYStatus () {
    const $xeTable = this

    return updateScrollYStatus($xeTable)
  },
  /**
   * 如果有滚动条，则滚动到对应的位置
   * @param {Number} scrollLeft 左距离
   * @param {Number} scrollTop 上距离
   */
  scrollTo (scrollLeft: number | null, scrollTop?: number | null) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { elemStore } = internalData
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
    const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement

    internalData.intoRunScroll = true

    if (XEUtils.isNumber(scrollLeft)) {
      setScrollLeft(xHandleEl, scrollLeft)
      setScrollLeft(bodyScrollElem, scrollLeft)
      setScrollLeft(headerScrollElem, scrollLeft)
      setScrollLeft(footerScrollElem, scrollLeft)
      loadScrollXData($xeTable)
    }
    if (XEUtils.isNumber(scrollTop)) {
      setScrollTop(yHandleEl, scrollTop)
      setScrollTop(bodyScrollElem, scrollTop)
      setScrollTop(leftScrollElem, scrollTop)
      setScrollTop(rightScrollElem, scrollTop)
      loadScrollYData($xeTable)
    }
    if (reactData.scrollXLoad || reactData.scrollYLoad) {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          $xeTable.$nextTick(() => {
            internalData.intoRunScroll = false
            resolve()
          })
        }, 30)
      })
    }
    return $xeTable.$nextTick()
  },
  /**
   * 如果有滚动条，则滚动到对应的行
   * @param {Row} row 行对象
   * @param {ColumnInfo} column 列配置
   */
  scrollToRow (row: any, fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData

    const { isAllOverflow, scrollYLoad, scrollXLoad } = reactData
    const rest = []
    if (row) {
      if (props.treeConfig) {
        rest.push($xeTable.scrollToTreeRow(row))
      } else {
        rest.push(rowToVisible($xeTable, row))
      }
    }
    if (fieldOrColumn) {
      rest.push(handleScrollToRowColumn($xeTable, fieldOrColumn, row))
    }
    return Promise.all(rest).then(() => {
      if (row) {
        if (!isAllOverflow && (scrollYLoad || scrollXLoad)) {
          calcCellHeight($xeTable)
          calcCellWidth($xeTable)
        }
        return $xeTable.$nextTick()
      }
    })
  },
  /**
   * 如果有滚动条，则滚动到对应的列
   * @param {ColumnInfo} column 列配置
   */
  scrollToColumn (fieldOrColumn: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return handleScrollToRowColumn($xeTable, fieldOrColumn)
  },
  /**
   * 对于树形结构中，可以直接滚动到指定深层节点中
   * 对于某些特定的场景可能会用到，比如定位到某一节点
   * @param {Row} row 行对象
   */
  scrollToTreeRow (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { isRowGroupStatus } = reactData
    const { tableFullData } = internalData
    const rests: Promise<any>[] = []
    if (treeConfig || isRowGroupStatus) {
      const aggregateOpts = $xeTable.computeAggregateOpts
      const treeOpts = $xeTable.computeTreeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      const matchObj = XEUtils.findTree(tableFullData, item => $xeTable.eqRow(item, row), { children: isRowGroupStatus ? aggregateOpts.mapChildrenField : childrenField })
      if (matchObj) {
        const nodes = matchObj.nodes
        nodes.forEach((row, index) => {
          if (index < nodes.length - 1 && !$xeTable.isTreeExpandByRow(row)) {
            rests.push($xeTable.setTreeExpand(row, true))
          }
        })
      }
    }
    return Promise.all(rests).then(() => rowToVisible($xeTable, row))
  },
  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { elemStore, scrollXStore, scrollYStore } = internalData
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
    const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement

    internalData.intoRunScroll = true

    setScrollLeft(xHandleEl, 0)
    setScrollLeft(bodyScrollElem, 0)
    setScrollLeft(headerScrollElem, 0)
    setScrollLeft(footerScrollElem, 0)

    setScrollTop(yHandleEl, 0)
    setScrollTop(bodyScrollElem, 0)
    setScrollTop(leftScrollElem, 0)
    setScrollTop(rightScrollElem, 0)

    scrollXStore.startIndex = 0
    scrollXStore.visibleStartIndex = 0
    scrollXStore.endIndex = scrollXStore.visibleSize
    scrollXStore.visibleEndIndex = scrollXStore.visibleSize
    scrollYStore.startIndex = 0
    scrollYStore.visibleStartIndex = 0
    scrollYStore.endIndex = scrollYStore.visibleSize
    scrollYStore.visibleEndIndex = scrollYStore.visibleSize
    return $xeTable.$nextTick().then(() => {
      internalData.intoRunScroll = false
    })
  },
  /**
   * 更新表尾合计
   */
  updateFooter () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData
    const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods

    const { showFooter, footerData, footerMethod } = props
    const { visibleColumn, afterFullData } = internalData
    let footData = []
    if (showFooter && footerData && footerData.length) {
      footData = footerData.slice(0)
    } else if (showFooter && footerMethod) {
      footData = visibleColumn.length ? footerMethod({ columns: visibleColumn, data: afterFullData, $table: $xeTable, $grid: $xeGrid }) : []
    }
    reactData.footerTableData = footData
    $xeTable.handleUpdateFooterMerge()
    return $xeTable.$nextTick()
  },
  /**
   * 更新列状态 updateStatus({ row, column }, cellValue)
   * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
   * 如果单元格配置了校验规则，则会进行校验
   */
  updateStatus (slotParams: any, cellValue: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable

    return this.$nextTick().then(() => {
      const { editRules } = props
      if (slotParams && editRules) {
        return $xeTable.handleCellRuleUpdateStatus('change', slotParams, cellValue)
      }
    })
  },
  /**
   * 设置合并单元格
   * @param {TableMergeConfig[]} merges { row: Row|number, column: ColumnInfo|number, rowspan: number, colspan: number }
   */
  setMergeCells (merges: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable

    if (props.spanMethod) {
      errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
    }
    handleBodyMerge($xeTable, merges)
    $xeTable.handleUpdateBodyMerge()
    return $xeTable.$nextTick().then(() => {
      $xeTable.updateCellAreas()
      return updateStyle($xeTable)
    })
  },
  /**
   * 移除单元格合并
   * @param {TableMergeConfig[]} merges 多个或数组 [{row:Row|number, col:ColumnInfo|number}]
   */
  removeMergeCells (merges: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable

    if (props.spanMethod) {
      errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
    }
    const rest = removeBodyMerges($xeTable, merges)
    $xeTable.handleUpdateBodyMerge()
    return $xeTable.$nextTick().then(() => {
      $xeTable.updateCellAreas()
      updateStyle($xeTable)
      return rest
    })
  },
  /**
   * 获取所有被合并的单元格
   */
  getMergeCells () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    return internalData.mergeBodyList.slice(0)
  },
  /**
   * 清除所有单元格合并
   */
  clearMergeCells () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    internalData.mergeBodyList = []
    internalData.mergeBodyMaps = {}
    internalData.mergeBodyCellMaps = {}
    reactData.mergeBodyFlag++
    return $xeTable.$nextTick().then(() => {
      return updateStyle($xeTable)
    })
  },
  setMergeFooterItems (merges: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable

    if (props.footerSpanMethod) {
      errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
    }
    handleFooterMerge($xeTable, merges)
    $xeTable.handleUpdateFooterMerge()
    return $xeTable.$nextTick().then(() => {
      $xeTable.updateCellAreas()
      return updateStyle($xeTable)
    })
  },
  removeMergeFooterItems (merges: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable

    if (props.footerSpanMethod) {
      errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
    }
    const rest = removeFooterMerges($xeTable, merges)
    $xeTable.handleUpdateFooterMerge()
    return $xeTable.$nextTick().then(() => {
      $xeTable.updateCellAreas()
      updateStyle($xeTable)
      return rest
    })
  },
  /**
   * 获取所有被合并的表尾
   */
  getMergeFooterItems () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    return internalData.mergeFooterList.slice(0)
  },
  /**
   * 清除所有表尾合并
   */
  clearMergeFooterItems () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    internalData.mergeFooterList = []
    internalData.mergeFooterMaps = {}
    internalData.mergeFooterCellMaps = {}
    reactData.mergeFootFlag++
    return $xeTable.$nextTick().then(() => {
      return updateStyle($xeTable)
    })
  },
  updateZindex () {
    if (this.zIndex) {
      this.tZindex = this.zIndex
    } else if (this.tZindex < getLastZIndex()) {
      this.tZindex = nextZIndex()
    }
  },
  updateCellAreas () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable

    const { mouseConfig } = props
    const mouseOpts = $xeTable.computeMouseOpts
    if (mouseConfig && mouseOpts.area && $xeTable.handleRecalculateCellAreaEvent) {
      return $xeTable.handleRecalculateCellAreaEvent()
    }
    return $xeTable.$nextTick()
  },
  dispatchEvent (type: ValueOf<VxeTableEmits>, params: Record<string, any>, evnt: Event | null) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods

    $xeTable.$emit(type, createEvent(evnt, { $table: $xeTable, $grid: $xeGrid }, params))
  },
  // 已废弃，使用 dispatchEvent
  emitEvent (type: any, params: any, evnt: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods

    this.$emit(type, Object.assign({ $table: $xeTable, $grid: $xeGrid, $event: evnt }, params))
  },
  focus () {
    this.isActivated = true
    return this.$nextTick()
  },
  blur () {
    this.isActivated = false
    return this.$nextTick()
  },
  // 连接工具栏
  connect ($toolbar: any) {
    if ($toolbar && $toolbar.syncUpdate) {
      $toolbar.syncUpdate({ collectColumn: this.collectColumn, $table: this })
      this.$toolbar = $toolbar
    } else {
      errLog('vxe.error.barUnableLink')
    }
    return this.$nextTick()
  },

  /*************************
   * Publish methods
   *************************/
  /**
   * 已废弃，被 getCellElement 替换
   * @deprecated
   */
  getCell (row: any, column: any) {
    return this.getCellElement(row, column)
  },
  findRowIndexOf (list: any, row: any) {
    return row ? XEUtils.findIndexOf(list, item => this.eqRow(item, row)) : -1
  },
  eqRow (row1: any, row2: any) {
    if (row1 && row2) {
      if (row1 === row2) {
        return true
      }
      return getRowid(this, row1) === getRowid(this, row2)
    }
    return false
  },
  /*************************
   * Publish methods
   *************************/

  getSetupOptions () {
    return getConfig()
  }
} as any

// Module methods
const funcs = 'setFilter,openFilter,clearFilter,saveFilterPanel,saveFilterPanelByEvent,resetFilterPanel,resetFilterPanelByEvent,getCheckedFilters,updateFilterOptionStatus,closeMenu,setActiveCellArea,getActiveCellArea,getCellAreas,clearCellAreas,copyCellArea,cutCellArea,pasteCellArea,getCopyCellArea,getCopyCellAreas,clearCopyCellArea,setCellAreas,openFNR,openFind,openReplace,closeFNR,getSelectedCell,clearSelected,insert,insertAt,insertNextAt,insertChild,insertChildAt,insertChildNextAt,remove,removeCheckboxRow,removeRadioRow,removeCurrentRow,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearEdit,clearActived,getEditRecord,getActiveRecord,isEditByRow,isActiveByRow,setEditRow,setActiveRow,setEditCell,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,fullValidateField,validateField,openExport,closeExport,openPrint,closePrint,getPrintHtml,exportData,openImport,closeImport,importData,saveFile,readFile,importByFile,print,openCustom,closeCustom,saveCustom,cancelCustom,resetCustom,toggleCustomAllCheckbox,setCustomAllCheckbox'.split(',')

funcs.forEach(name => {
  Methods[name] = function (...args: any[]) {
    if (!this[`_${name}`]) {
      if ('openExport,openPrint,exportData,openImport,importData,saveFile,readFile,importByFile,print'.split(',').includes(name)) {
        errLog('vxe.error.reqModule', ['Export'])
      } else if ('fullValidate,validate'.split(',').includes(name)) {
        errLog('vxe.error.reqModule', ['Validator'])
      } else if ('setFilter,openFilter,clearFilter,getCheckedFilters'.split(',').includes(name)) {
        errLog('vxe.error.reqModule', ['Filter'])
      } else if ('insert,insertAt,insertNextAt,remove,removeCheckboxRow,removeRadioRow,removeCurrentRow,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,getEditRecord,getActiveRecord,isEditByRow,isActiveByRow,setEditRow,setActiveRow,setEditCell,setActiveCell'.split(',').includes(name)) {
        errLog('vxe.error.reqModule', ['Edit'])
      } else if ('openCustom'.split(',').includes(name)) {
        errLog('vxe.error.reqModule', ['Custom'])
      }
    }
    return this[`_${name}`] ? this[`_${name}`](...args) : null
  }
})

export default Methods
