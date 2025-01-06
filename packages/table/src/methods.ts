import XEUtils from 'xe-utils'
import { browse, getTpImg, isPx, isScale, hasClass, addClass, removeClass, getEventTargetNode, getPaddingTopBottomSize, setScrollTop, setScrollLeft, isNodeElement } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex, hasChildrenList, getFuncText, isEnableConf, formatText, eqEmptyValue } from '../../ui/src/utils'
import { VxeUI } from '../../ui'
import Cell from './cell'
import { getRowUniqueId, clearTableAllStatus, getRowkey, getRowid, rowToVisible, colToVisible, getCellValue, setCellValue, handleFieldOrColumn, toTreePathSeq, restoreScrollLocation, getRootColumn, getColReMinWidth } from './util'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'

import type { VxeTableDefines, VxeColumnPropTypes, VxeTableEmits, ValueOf, TableReactData, VxeTableConstructor, TableInternalData, VxeTablePrivateMethods } from '../../../types'

const { getConfig, getI18n, renderer, formats, interceptor, createEvent } = VxeUI

const customStorageKey = 'VXE_CUSTOM_STORE'

// 获取所有的列，排除分组
const getColumnList = (columns: any[]) => {
  const result: any[] = []
  columns.forEach((column) => {
    result.push(...(column.children && column.children.length ? getColumnList(column.children) : [column]))
  })
  return result
}

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

function getNextSortOrder (_vm: any, column: any) {
  const orders = _vm.sortOpts.orders
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

const getRecoverRowMaps = (_vm: any, keyMaps: any) => {
  const { fullAllDataRowIdData } = _vm
  const restKeys: any = {}
  XEUtils.each(keyMaps, (row, rowid) => {
    if (fullAllDataRowIdData[rowid]) {
      restKeys[rowid] = row
    }
  })
  return restKeys
}

function handleReserveRow (_vm: any, reserveRowMap: any) {
  const { fullDataRowIdData } = _vm
  const reserveList: any[] = []
  XEUtils.each(reserveRowMap, (item, rowid) => {
    if (fullDataRowIdData[rowid] && reserveList.indexOf(fullDataRowIdData[rowid].row) === -1) {
      reserveList.push(fullDataRowIdData[rowid].row)
    }
  })
  return reserveList
}

function handleVirtualXVisible ($xeTable: any) {
  const internalData = $xeTable

  const { visibleColumn } = internalData
  const tableBody = $xeTable.$refs.tableBody
  const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
  if (tableBodyElem) {
    const { scrollLeft, clientWidth } = tableBodyElem
    const endWidth = scrollLeft + clientWidth
    let toVisibleIndex = -1
    let cWidth = 0
    let visibleSize = 0
    for (let colIndex = 0, colLen = visibleColumn.length; colIndex < colLen; colIndex++) {
      cWidth += visibleColumn[colIndex].renderWidth
      if (toVisibleIndex === -1 && scrollLeft < cWidth) {
        toVisibleIndex = colIndex
      }
      if (toVisibleIndex >= 0) {
        visibleSize++
        if (cWidth > endWidth) {
          break
        }
      }
    }
    return { toVisibleIndex: Math.max(0, toVisibleIndex), visibleSize: Math.max(6, visibleSize) }
  }
  return { toVisibleIndex: 0, visibleSize: 6 }
}

/**
   * 更新数据列的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
function cacheColumnMap ($xeTable: VxeTableConstructor) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { tableFullColumn, collectColumn } = internalData
  const fullColumnIdData: Record<string, VxeTableDefines.ColumnCacheItem> = internalData.fullColumnIdData = {}
  const fullColumnFieldData: Record<string, VxeTableDefines.ColumnCacheItem> = internalData.fullColumnFieldData = {}
  const mouseOpts = $xeTable.computeMouseOpts
  const columnOpts = $xeTable.computeColumnOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const { isCrossDrag, isSelfToChildDrag } = columnDragOpts
  const rowOpts = $xeTable.computeRowOpts
  const isGroup = collectColumn.some(hasChildrenList)
  let isAllOverflow = !!props.showOverflow
  let expandColumn: VxeTableDefines.ColumnInfo | undefined
  let treeNodeColumn: VxeTableDefines.ColumnInfo | undefined
  let checkboxColumn: VxeTableDefines.ColumnInfo | undefined
  let radioColumn: VxeTableDefines.ColumnInfo | undefined
  let htmlColumn: VxeTableDefines.ColumnInfo | undefined
  let hasFixed: VxeColumnPropTypes.Fixed | undefined
  const handleFunc = (column: VxeTableDefines.ColumnInfo, index: number, items: VxeTableDefines.ColumnInfo[], path?: string[], parentColumn?: VxeTableDefines.ColumnInfo) => {
    const { id: colid, field, fixed, type, treeNode } = column
    const rest = { $index: -1, _index: -1, column, colid, index, items, parent: parentColumn || null, width: 0 }
    if (field) {
      if (fullColumnFieldData[field]) {
        errLog('vxe.error.colRepet', ['field', field])
      }
      fullColumnFieldData[field] = rest
    } else {
      if (isCrossDrag || isSelfToChildDrag) {
        errLog('vxe.error.emptyProp', ['column.field'])
      }
    }
    if (!hasFixed && fixed) {
      hasFixed = fixed
    }
    if (!htmlColumn && type === 'html') {
      htmlColumn = column
    }
    if (treeNode) {
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (treeNodeColumn) {
          warnLog('vxe.error.colRepet', ['tree-node', treeNode])
        }
      }
      if (!treeNodeColumn) {
        treeNodeColumn = column
      }
    } else if (type === 'expand') {
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (expandColumn) {
          warnLog('vxe.error.colRepet', ['type', type])
        }
      }
      if (!expandColumn) {
        expandColumn = column
      }
    }
    if (process.env.VUE_APP_VXE_ENV === 'development') {
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

  if (process.env.VUE_APP_VXE_ENV === 'development') {
    if (expandColumn && mouseOpts.area) {
      errLog('vxe.error.errConflicts', ['mouse-config.area', 'column.type=expand'])
    }
  }

  if (process.env.VUE_APP_VXE_ENV === 'developmeznt') {
    if (htmlColumn) {
      if (!columnOpts.useKey) {
        errLog('vxe.error.reqProp', ['column-config.useKey & column.type=html'])
      }
      if (!rowOpts.useKey) {
        errLog('vxe.error.reqProp', ['row-config.useKey & column.type=html'])
      }
    }
  }

  reactData.isGroup = isGroup
  reactData.treeNodeColumn = treeNodeColumn
  reactData.expandColumn = expandColumn
  reactData.isAllOverflow = isAllOverflow
}

const updateScrollYStatus = ($xeTable: VxeTableConstructor, fullData?: any[]) => {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const sYOpts = $xeTable.computeSYOpts
  const treeOpts = $xeTable.computeTreeOpts
  const { transform } = treeOpts
  const allList = fullData || internalData.tableFullData
  // 如果gt为0，则总是启用
  const scrollYLoad = (transform || !treeConfig) && !!sYOpts.enabled && sYOpts.gt > -1 && (sYOpts.gt === 0 || sYOpts.gt < allList.length)
  reactData.scrollYLoad = scrollYLoad
  return scrollYLoad
}

/**
 * 如果为虚拟树，将树结构拍平
 * @returns
 */
function handleVirtualTreeToList ($xeTable: VxeTableConstructor) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const { treeExpandedMaps } = reactData
  const { fullAllDataRowIdData } = internalData
  const treeOpts = $xeTable.computeTreeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  if (treeConfig && treeOpts.transform) {
    const fullData: any[] = []
    const expandMaps: {
      [key: string]: number
    } = {}
    XEUtils.eachTree(internalData.afterTreeFullData, (row, index, items, path, parentRow) => {
      const rowid = getRowid($xeTable, row)
      const parentRowid = getRowid($xeTable, parentRow)
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
  }
  return internalData.afterFullData
}

function computeRowHeight ($xeTable: any) {
  const tableHeader = $xeTable.$refs.tableHeader
  const tableBody = $xeTable.$refs.tableBody
  const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
  const vSize = $xeTable.computeSize
  const rowHeightMaps = $xeTable.computeRowHeightMaps
  let rowHeight = 0
  if (tableBodyElem) {
    const tableHeaderElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
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
    rowHeight = rowHeightMaps[vSize || 'default']
  }
  // 最低支持 18px 行高
  return Math.max(18, rowHeight)
}

function handleVirtualYVisible ($xeTable: VxeTableConstructor) {
  const props = $xeTable
  const internalData = $xeTable as unknown as TableInternalData

  const { showOverflow } = props
  const { scrollYStore, afterFullData, fullAllDataRowIdData } = internalData
  const tableBody = $xeTable.$refs.tableBody
  const tableBodyElem = tableBody ? (tableBody as any).$el as HTMLDivElement : null
  const { rowHeight } = scrollYStore
  if (tableBodyElem) {
    const { scrollTop, clientHeight } = tableBodyElem
    const endHeight = scrollTop + clientHeight
    let toVisibleIndex = -1
    let offsetTop = 0
    let visibleSize = 0
    if (showOverflow) {
      toVisibleIndex = Math.floor(scrollTop / rowHeight)
      visibleSize = Math.ceil(clientHeight / rowHeight) + 1
    } else {
      for (let rIndex = 0, rLen = afterFullData.length; rIndex < rLen; rIndex++) {
        const row = afterFullData[rIndex]
        const rowid = getRowid($xeTable, row)
        const rowRest = fullAllDataRowIdData[rowid]
        if (!rowRest) {
          break
        }
        offsetTop += rowRest.height || rowHeight
        if (toVisibleIndex === -1 && scrollTop < offsetTop) {
          toVisibleIndex = rIndex
        }
        if (toVisibleIndex >= 0) {
          visibleSize++
          if (offsetTop > endHeight) {
            break
          }
        }
      }
    }
    return { toVisibleIndex: Math.max(0, toVisibleIndex), visibleSize: Math.max(8, visibleSize) }
  }
  return { toVisibleIndex: 0, visibleSize: 8 }
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

function setMerges (_vm: any, merges: any, mList: any, rowList: any) {
  if (merges) {
    const { treeConfig, visibleColumn } = _vm
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    if (treeConfig && merges.length) {
      errLog('vxe.error.noTree', ['merge-cells | merge-footer-items'])
    }
    merges.forEach((item: any) => {
      let { row, col, rowspan, colspan } = item
      if (rowList && XEUtils.isNumber(row)) {
        row = rowList[row]
      }
      if (XEUtils.isNumber(col)) {
        col = visibleColumn[col]
      }
      if ((rowList ? row : XEUtils.isNumber(row)) && col && (rowspan || colspan)) {
        rowspan = XEUtils.toNumber(rowspan) || 1
        colspan = XEUtils.toNumber(colspan) || 1
        if (rowspan > 1 || colspan > 1) {
          const mcIndex = XEUtils.findIndexOf(mList, item => item._row === row && item._col === col)
          const mergeItem = mList[mcIndex]
          if (mergeItem) {
            mergeItem.rowspan = rowspan
            mergeItem.colspan = colspan
            mergeItem._rowspan = rowspan
            mergeItem._colspan = colspan
          } else {
            const mergeRowIndex = rowList ? rowList.indexOf(row) : row
            const mergeColIndex = visibleColumn.indexOf(col)
            mList.push({
              row: mergeRowIndex,
              col: mergeColIndex,
              rowspan,
              colspan,
              _row: row,
              _col: col,
              _rowspan: rowspan,
              _colspan: colspan
            })
          }
        }
      }
    })
  }
}

function removeMerges (_vm: any, merges: any, mList: any, rowList: any) {
  const rest: any[] = []
  if (merges) {
    const { treeConfig, visibleColumn } = _vm
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    if (treeConfig && merges.length) {
      errLog('vxe.error.noTree', ['merge-cells | merge-footer-items'])
    }
    merges.forEach((item: any) => {
      let { row, col } = item
      if (rowList && XEUtils.isNumber(row)) {
        row = rowList[row]
      }
      if (XEUtils.isNumber(col)) {
        col = visibleColumn[col]
      }
      const mcIndex = XEUtils.findIndexOf(mList, item => item._row === row && item._col === col)
      if (mcIndex > -1) {
        const rItems = mList.splice(mcIndex, 1)
        rest.push(rItems[0])
      }
    })
  }
  return rest
}

function clearAllSort (_vm: any) {
  _vm.tableFullColumn.forEach((column: any) => {
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

  const tableHeader = $xeTable.$refs.tableHeader
  const tableBody = $xeTable.$refs.tableBody
  const tableFooter = $xeTable.$refs.tableFooter
  const bodyElem = tableBody ? (tableBody as any).$el as HTMLDivElement : null
  const headerElem = tableHeader ? (tableHeader as any).$el as HTMLDivElement : null
  const footerElem = tableFooter ? (tableFooter as any).$el as HTMLDivElement : null
  if (!bodyElem) {
    return
  }
  let tableWidth = 0
  const minCellWidth = 40 // 列宽最少限制 40px
  const bodyWidth = bodyElem.clientWidth - 1
  let remainWidth = bodyWidth
  let meanWidth = remainWidth / 100
  const { fit } = props
  const { columnStore } = reactData
  const { resizeList, pxMinList, autoMinList, pxList, scaleList, scaleMinList, autoList, remainList } = columnStore
  // 最小宽
  pxMinList.forEach((column) => {
    const minWidth = XEUtils.toInteger(column.minWidth)
    tableWidth += minWidth
    column.renderWidth = minWidth
  })
  // 最小自适应
  autoMinList.forEach((column) => {
    const scaleWidth = Math.max(60, XEUtils.toInteger(column.renderAutoWidth))
    tableWidth += scaleWidth
    column.renderWidth = scaleWidth
  })
  // 最小百分比
  scaleMinList.forEach((column) => {
    const scaleWidth = Math.floor(XEUtils.toInteger(column.minWidth) * meanWidth)
    tableWidth += scaleWidth
    column.renderWidth = scaleWidth
  })
  // 固定百分比
  scaleList.forEach((column) => {
    const scaleWidth = Math.floor(XEUtils.toInteger(column.width) * meanWidth)
    tableWidth += scaleWidth
    column.renderWidth = scaleWidth
  })
  // 固定宽
  pxList.forEach((column) => {
    const width = XEUtils.toInteger(column.width)
    tableWidth += width
    column.renderWidth = width
  })
  // 自适应宽
  autoList.forEach((column) => {
    const width = Math.max(60, XEUtils.toInteger(column.renderAutoWidth))
    tableWidth += width
    column.renderWidth = width
  })
  // 调整了列宽
  resizeList.forEach((column) => {
    const width = XEUtils.toInteger(column.resizeWidth)
    tableWidth += width
    column.renderWidth = width
  })
  remainWidth -= tableWidth
  meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoMinList.length + remainList.length)) : 0
  if (fit) {
    if (remainWidth > 0) {
      scaleMinList.concat(pxMinList).concat(autoMinList).forEach((column) => {
        tableWidth += meanWidth
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
    tableWidth += width
  })
  if (fit) {
    /**
     * 偏移量算法
     * 如果所有列足够放的情况下，从最后动态列开始分配
     */
    const dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoMinList).concat(remainList)
    let dynamicSize = dynamicList.length - 1
    if (dynamicSize > 0) {
      let odiffer = bodyWidth - tableWidth
      if (odiffer > 0) {
        while (odiffer > 0 && dynamicSize >= 0) {
          odiffer--
          dynamicList[dynamicSize--].renderWidth++
        }
        tableWidth = bodyWidth
      }
    }
  }
  const tableHeight = bodyElem.offsetHeight
  const overflowY = bodyElem.scrollHeight > bodyElem.clientHeight
  let scrollbarWidth = 0
  if (overflowY) {
    scrollbarWidth = Math.max(bodyElem.offsetWidth - bodyElem.clientWidth, 0)
  }
  reactData.scrollbarWidth = scrollbarWidth
  reactData.overflowY = overflowY
  internalData.tableWidth = tableWidth
  internalData.tableHeight = tableHeight
  let headerHeight = 0
  if (headerElem) {
    headerHeight = headerElem.clientHeight
    $xeTable.$nextTick(() => {
      // 检测是否同步滚动
      if (headerElem && bodyElem && headerElem.scrollLeft !== bodyElem.scrollLeft) {
        headerElem.scrollLeft = bodyElem.scrollLeft
      }
    })
  }
  internalData.headerHeight = headerHeight
  let overflowX = false
  let footerHeight = 0
  let scrollbarHeight = 0
  if (footerElem) {
    footerHeight = footerElem.offsetHeight
    overflowX = tableWidth > footerElem.clientWidth
    scrollbarHeight = Math.max(footerHeight - footerElem.clientHeight, 0)
  } else {
    overflowX = tableWidth > bodyWidth
    scrollbarHeight = Math.max(tableHeight - bodyElem.clientHeight, 0)
  }
  internalData.footerHeight = footerHeight
  reactData.overflowX = overflowX
  reactData.scrollbarHeight = scrollbarHeight
  updateHeight($xeTable)
  reactData.parentHeight = Math.max(internalData.headerHeight + footerHeight + 20, $xeTable.getParentHeight())
  if (overflowX) {
    $xeTable.checkScrolling()
  }
}

// const updateCellOffset = ($xeTable: VxeTableConstructor) => {
//   const internalData = $xeTable as unknown as TableInternalData

//   const { chTimeout, chRunTime } = internalData
//   if (chTimeout) {
//     clearTimeout(chTimeout)
//   }
//   if (!chRunTime || chRunTime + 10 < Date.now()) {
//     internalData.chRunTime = Date.now()
//   }
//   internalData.chTimeout = setTimeout(() => {
//     internalData.chRunTime = undefined
//     internalData.chTimeout = undefined
//   }, 80)
// }

const calcCellHeight = ($xeTable: VxeTableConstructor) => {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { showOverflow } = props
  const { tableData, scrollXLoad } = reactData
  const { fullAllDataRowIdData } = internalData
  const el = $xeTable.$refs.refElem as HTMLDivElement
  if (!showOverflow && el) {
    let paddingTop = 0
    let paddingBottom = 0
    let calcPadding = false
    tableData.forEach((row: any) => {
      const rowid = getRowid($xeTable, row)
      const rowRest = fullAllDataRowIdData[rowid]
      const cellList = el.querySelectorAll(`.vxe-body--row[rowid="${rowid}"]>.vxe-body--column>.vxe-cell`)
      if (rowRest && cellList.length) {
        let height = 0
        for (let i = 0; i < cellList.length; i++) {
          const cellElem = cellList[i] as HTMLElement
          const tdEl = cellElem.parentElement as HTMLTableCellElement
          if (!tdEl || !tdEl.clientWidth) {
            break
          }
          if (!calcPadding) {
            paddingTop = XEUtils.toNumber(getComputedStyle(tdEl).paddingTop)
            paddingBottom = XEUtils.toNumber(getComputedStyle(tdEl).paddingBottom)
            calcPadding = true
          }
          let cellHeight = paddingTop + paddingBottom
          if (cellElem) {
            cellHeight += cellElem.clientHeight
          }
          height = Math.max(height, cellHeight)
        }
        rowRest.height = scrollXLoad ? Math.max(rowRest.height, height) : height
      }
    })
  }
  // updateCellOffset($xeTable)
}

function getOrderField (_vm: any, column: any) {
  const { sortBy, sortType } = column
  return (row: any) => {
    let cellValue
    if (sortBy) {
      cellValue = XEUtils.isFunction(sortBy) ? sortBy({ row, column }) : XEUtils.get(row, sortBy)
    } else {
      cellValue = _vm.getCellLabel(row, column)
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

function clearDragStatus ($xeTable: any) {
  const reactData = $xeTable

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

function clearRowDropOrigin ($xeTable: any) {
  const el = $xeTable.$el
  if (el) {
    const clss = 'row--drag-origin'
    XEUtils.arrayEach(el.querySelectorAll(`.${clss}`), (elem) => {
      (elem as HTMLTableCellElement).draggable = false
      removeClass(elem, clss)
    })
  }
}

function updateRowDropOrigin ($xeTable: any, row: any) {
  const el = $xeTable.$el
  if (el) {
    const clss = 'row--drag-origin'
    const rowid = getRowid($xeTable, row)
    XEUtils.arrayEach(el.querySelectorAll(`[rowid="${rowid}"]`), (elem) => {
      addClass(elem, clss)
    })
  }
}

function updateRowDropTipContent ($xeTable: any, tdEl: HTMLElement) {
  const reactData = $xeTable
  const props = $xeTable

  const { dragConfig } = props
  const { dragRow } = reactData
  const rowDragOpts = $xeTable.computeRowDragOpts
  const { tooltipMethod } = rowDragOpts
  const rTooltipMethod = tooltipMethod || (dragConfig ? dragConfig.rowTooltipMethod : null)
  let tipContent = ''
  if (rTooltipMethod) {
    tipContent = `${rTooltipMethod({
          row: dragRow
        }) || ''}`
  } else {
    tipContent = getI18n('vxe.table.dragTip', [tdEl.textContent || ''])
  }
  reactData.dragTipText = tipContent
}

function updateColDropOrigin ($xeTable: any, column: VxeTableDefines.ColumnInfo) {
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

function clearColDropOrigin ($xeTable: any) {
  const el = $xeTable.$el as HTMLElement
  if (el) {
    const clss = 'col--drag-origin'
    XEUtils.arrayEach(el.querySelectorAll(`.${clss}`), (elem) => {
      (elem as HTMLTableCellElement).draggable = false
      removeClass(elem, clss)
    })
  }
}

function updateColDropTipContent ($xeTable: any, tdEl: HTMLElement) {
  const reactData = $xeTable

  const { dragCol } = reactData
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const { tooltipMethod } = columnDragOpts
  let tipContent = ''
  if (tooltipMethod) {
    tipContent = `${tooltipMethod({
      column: dragCol
    }) || ''}`
  } else {
    tipContent = getI18n('vxe.table.dragTip', [tdEl.textContent || ''])
  }
  reactData.dragTipText = tipContent
}

function showDropTip ($xeTable: any, evnt: DragEvent | MouseEvent, trEl: HTMLElement | null, thEl: HTMLElement | null, showLine: boolean, dragPos: string) {
  const reactData = $xeTable
  const internalData = $xeTable

  const el = $xeTable.$refs.refElem as HTMLElement
  if (!el) {
    return
  }
  const { scrollbarWidth, scrollbarHeight } = reactData
  const { prevDragToChild } = internalData
  const wrapperRect = el.getBoundingClientRect()
  const tableWidth = el.clientWidth
  const tableHeight = el.clientHeight
  if (trEl) {
    const rdLineEl = $xeTable.$refs.refDragRowLineElem as HTMLElement
    if (rdLineEl) {
      if (showLine) {
        const trRect = trEl.getBoundingClientRect()
        let trHeight = trEl.clientHeight
        const offsetTop = Math.max(1, trRect.y - wrapperRect.y)
        if (offsetTop + trHeight > tableHeight - scrollbarHeight) {
          trHeight = tableHeight - offsetTop - scrollbarHeight
        }
        rdLineEl.style.display = 'block'
        rdLineEl.style.top = `${offsetTop}px`
        rdLineEl.style.height = `${trHeight}px`
        rdLineEl.style.width = `${tableWidth - scrollbarWidth}px`
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
        const leftContainerElem = $xeTable.$refs.leftContainer as HTMLDivElement
        const leftContainerWidth = leftContainerElem ? leftContainerElem.clientWidth : 0
        const rightContainerElem = $xeTable.$refs.rightContainer as HTMLDivElement
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
        const endX = tableWidth - rightContainerWidth - (rightContainerWidth ? 0 : scrollbarWidth)
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
          cdLineEl.style.height = `${tableHeight - offsetTop - scrollbarHeight}px`
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

function hideDropTip ($xeTable: any) {
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

function handleScrollToRowColumn ($xeTable: VxeTableConstructor, fieldOrColumn: string | VxeTableDefines.ColumnInfo | null, row?: any) {
  const internalData = $xeTable as unknown as TableInternalData

  const { fullColumnIdData } = internalData
  const column = handleFieldOrColumn($xeTable, fieldOrColumn)
  if (column && fullColumnIdData[column.id]) {
    return colToVisible($xeTable, column, row)
  }
  return $xeTable.$nextTick()
}

// 计算可视渲染相关数据
function computeScrollLoad ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  return $xeTable.$nextTick().then(() => {
    const { scrollXLoad, scrollYLoad } = reactData
    const { scrollXStore, scrollYStore } = internalData
    const sYOpts = $xeTable.computeSYOpts
    const sXOpts = $xeTable.computeSXOpts
    // 计算 X 逻辑
    if (scrollXLoad) {
      const { visibleSize: visibleXSize } = handleVirtualXVisible($xeTable)
      const offsetXSize = Math.max(0, sXOpts.oSize ? XEUtils.toNumber(sXOpts.oSize) : (browse.edge ? 5 : 0))
      scrollXStore.offsetSize = offsetXSize
      scrollXStore.visibleSize = visibleXSize
      scrollXStore.endIndex = Math.max(scrollXStore.startIndex + scrollXStore.visibleSize + offsetXSize, scrollXStore.endIndex)
      $xeTable.updateScrollXData().then(() => {
        loadScrollXData($xeTable)
      })
    } else {
      $xeTable.updateScrollXSpace()
    }
    calcCellHeight($xeTable)
    // 计算 Y 逻辑
    const rowHeight = computeRowHeight($xeTable)
    scrollYStore.rowHeight = rowHeight
    reactData.rowHeight = rowHeight
    const { visibleSize: visibleYSize } = handleVirtualYVisible($xeTable)
    if (scrollYLoad) {
      const offsetYSize = Math.max(0, sYOpts.oSize ? XEUtils.toNumber(sYOpts.oSize) : (browse.edge ? 10 : 0))
      scrollYStore.offsetSize = offsetYSize
      scrollYStore.visibleSize = visibleYSize
      scrollYStore.endIndex = Math.max(scrollYStore.startIndex + visibleYSize + offsetYSize, scrollYStore.endIndex)
      $xeTable.updateScrollYData().then(() => {
        loadScrollYData($xeTable)
      })
    } else {
      $xeTable.updateScrollYSpace()
    }
    $xeTable.$nextTick(() => {
      ($xeTable as any).updateStyle()
    })
  })
}

function handleRecalculateLayout ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, reFull: boolean) {
  const internalData = $xeTable as unknown as TableInternalData

  const el = $xeTable.$refs.refElem as HTMLDivElement
  internalData.rceRunTime = Date.now()
  if (!el || !el.clientWidth) {
    return $xeTable.$nextTick()
  }
  calcCellWidth($xeTable)
  autoCellWidth($xeTable)
  return computeScrollLoad($xeTable).then(() => {
    if (reFull === true) {
      // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
      calcCellHeight($xeTable)
      calcCellWidth($xeTable)
      autoCellWidth($xeTable)
      return computeScrollLoad($xeTable)
    }
  })
}

function loadScrollXData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { mergeList, mergeFooterList } = reactData
  const { scrollXStore } = internalData
  const { startIndex, endIndex, offsetSize } = scrollXStore
  const { toVisibleIndex, visibleSize } = handleVirtualXVisible($xeTable)
  const offsetItem = {
    startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize),
    endIndex: toVisibleIndex + visibleSize + offsetSize
  }
  calculateMergerOffsetIndex(mergeList.concat(mergeFooterList), offsetItem, 'col')
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

/**
 * 纵向 Y 可视渲染处理
 */
function loadScrollYData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { showOverflow } = props
  const { mergeList } = reactData
  const { tableHeight, scrollYStore } = internalData
  const { startIndex, endIndex, offsetSize } = scrollYStore
  const offsetYSize = showOverflow ? offsetSize : offsetSize + Math.min(8, Math.ceil(tableHeight / 200))
  const { toVisibleIndex, visibleSize } = handleVirtualYVisible($xeTable)
  const offsetItem = {
    startIndex: Math.max(0, toVisibleIndex - 1 - offsetYSize),
    endIndex: toVisibleIndex + visibleSize + offsetYSize
  }
  calculateMergerOffsetIndex(mergeList, offsetItem, 'row')
  const { startIndex: offsetStartIndex, endIndex: offsetEndIndex } = offsetItem
  if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
    if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
      scrollYStore.startIndex = offsetStartIndex
      scrollYStore.endIndex = offsetEndIndex
      $xeTable.updateScrollYData()
    }
  }
}

function checkLastSyncScroll ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, isRollX: boolean, isRollY: boolean) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { scrollXLoad, scrollYLoad } = reactData
  const { lcsTimeout } = internalData
  if (lcsTimeout) {
    clearTimeout(lcsTimeout)
  }
  internalData.lcsTimeout = setTimeout(() => {
    internalData.lcsTimeout = undefined
    internalData.inVirtualScroll = false
    internalData.inBodyScroll = false
    internalData.bodyScrollType = ''
    internalData.inFooterScroll = false
    if (isRollX && scrollXLoad) {
      $xeTable.updateScrollXData().then(() => {
        loadScrollXData($xeTable)
      })
    }
    if (isRollY && scrollYLoad) {
      $xeTable.updateScrollYData().then(() => {
        loadScrollYData($xeTable)
      })
    }
    $xeTable.updateCellAreas()
  }, 200)
}

function updateHeight ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  internalData.customHeight = calcTableHeight($xeTable, 'height')
  internalData.customMinHeight = calcTableHeight($xeTable, 'minHeight')
  internalData.customMaxHeight = calcTableHeight($xeTable, 'maxHeight')
}

function calcColumnAutoWidth (column: VxeTableDefines.ColumnInfo, wrapperEl: HTMLDivElement) {
  const cellElList = wrapperEl.querySelectorAll(`.vxe-header--column.${column.id}>.vxe-cell,.vxe-body--column.${column.id}>.vxe-cell,.vxe-footer--column.${column.id}>.vxe-cell`)
  const firstCellEl = cellElList[0]
  let paddingSize = 0
  if (firstCellEl) {
    const cellStyle = getComputedStyle(firstCellEl)
    paddingSize = Math.floor(XEUtils.toNumber(cellStyle.paddingLeft) + XEUtils.toNumber(cellStyle.paddingRight)) + 2
  }
  let colWidth = column.renderAutoWidth - paddingSize
  XEUtils.arrayEach(cellElList, (itemEl) => {
    const cellEl = itemEl as HTMLElement
    const thElem = cellEl.parentElement as HTMLElement
    let titleWidth = 0
    if (`${thElem.tagName}`.toLowerCase() === 'th') {
      XEUtils.arrayEach(cellEl.children, (btnEl) => {
        titleWidth += (btnEl as HTMLElement).offsetWidth + 1
      })
    } else {
      const labelEl = cellEl.firstElementChild as HTMLElement
      if (labelEl) {
        titleWidth = labelEl.offsetWidth
      }
    }
    if (titleWidth) {
      colWidth = Math.max(colWidth, Math.ceil(titleWidth) + 4)
    }
  })
  return colWidth + paddingSize
}

function calcCellWidth ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const autoWidthColumnList = $xeTable.computeAutoWidthColumnList
  reactData.isCalcColumn = true
  return $xeTable.$nextTick().then(() => {
    const { fullColumnIdData } = internalData
    const el = $xeTable.$refs.refElem as HTMLDivElement
    if (el) {
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
    }
    reactData.isCalcColumn = false
  })
}

const Methods = {
  callSlot (slotFunc: any, params: any, h: any, vNodes: any) {
    if (slotFunc) {
      const { $xegrid } = this
      if ($xegrid) {
        return $xegrid.callSlot(slotFunc, params, h, vNodes)
      }
      if (XEUtils.isFunction(slotFunc)) {
        return getSlotVNs(slotFunc.call(this, params, h, vNodes))
      }
    }
    return []
  },
  /**
   * 获取父容器元素
   */
  getParentElem () {
    const { $el, $xegrid } = this
    return $xegrid ? $xegrid.$el.parentNode : $el.parentNode
  },
  /**
   * 获取父容器的高度
   */
  getParentHeight () {
    const { $el, $xegrid, height } = this
    const parentElem = $el.parentNode
    const parentPaddingSize = height === '100%' || height === 'auto' ? getPaddingTopBottomSize(parentElem) : 0
    return Math.floor($xegrid ? $xegrid.getParentHeight() : XEUtils.toNumber(getComputedStyle(parentElem).height) - parentPaddingSize)
  },
  /**
   * 获取需要排除的高度
   * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
   * 如果存在表尾合计滚动条，则需要排除滚动条高度
   */
  getExcludeHeight () {
    const { $xegrid } = this
    return $xegrid ? $xegrid.getExcludeHeight() : 0
  },
  /**
   * 重置表格的一切数据状态
   */
  clearAll () {
    return clearTableAllStatus(this)
  },
  /**
   * 同步 data 数据（即将废弃）
   * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   */
  syncData () {
    warnLog('vxe.error.delFunc', ['syncData', 'getData'])
    return this.$nextTick().then(() => {
      this.tableData = []
      return this.$nextTick().then(() => this.loadTableData(this.tableFullData))
    })
  },
  /**
   * 手动处理数据，用于手动排序与筛选
   * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
   */
  updateData () {
    const { scrollXLoad, scrollYLoad } = this
    return this.handleTableData(true).then(() => {
      this.updateFooter()
      if (scrollXLoad || scrollYLoad) {
        if (scrollXLoad) {
          this.updateScrollXSpace()
        }
        if (scrollYLoad) {
          this.updateScrollYSpace()
        }
        return this.refreshScroll()
      }
    }).then(() => {
      this.updateCellAreas()
      return this.recalculate(true)
    }).then(() => {
      // 存在滚动行为未结束情况
      setTimeout(() => this.recalculate(), 50)
    })
  },
  handleTableData (force: any) {
    const $xeTable = this

    const { scrollYLoad, scrollYStore, fullDataRowIdData, afterFullData } = this
    let fullList = afterFullData
    // 是否进行数据处理
    if (force) {
      // 更新数据，处理筛选和排序
      this.updateAfterFullData()
      // 如果为虚拟树，将树结构拍平
      fullList = handleVirtualTreeToList($xeTable)
    }
    const tableData = scrollYLoad ? fullList.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullList.slice(0)
    tableData.forEach((row: any, $index: any) => {
      const rowid = getRowid(this, row)
      const rest = fullDataRowIdData[rowid]
      if (rest) {
        rest.$index = $index
      }
    })
    this.tableData = tableData
    return this.$nextTick()
  },
  /**
   * 加载表格数据
   * @param {Array} datas 数据
   */
  loadTableData (datas: any) {
    const $xeTable = this

    const { keepSource, showOverflow, treeConfig, treeOpts, editStore, scrollYStore, scrollXStore, lastScrollLeft, lastScrollTop, scrollYLoad: oldScrollYLoad, sXOpts, sYOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const rowOpts = $xeTable.computeRowOpts
    let treeData = []
    let fullData = datas ? datas.slice(0) : []
    if (treeConfig) {
      // 树结构自动转换
      if (treeOpts.transform) {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (!treeOpts.rowField) {
            errLog('vxe.error.reqProp', ['table.tree-config.rowField'])
          }
          if (!treeOpts.parentField) {
            errLog('vxe.error.reqProp', ['table.tree-config.parentField'])
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
          //   if (row[childrenField] && row[childrenField].length) {
          //     warnLog('vxe.error.errConflicts', ['tree-config.transform', `row.${childrenField}`])
          //   }
          // })
        }
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
    }
    scrollYStore.startIndex = 0
    scrollYStore.endIndex = 1
    scrollXStore.startIndex = 0
    scrollXStore.endIndex = 1
    editStore.insertMaps = {}
    editStore.removeList = []
    editStore.removeMaps = {}
    const sYLoad = updateScrollYStatus($xeTable, fullData)
    this.isDragRowMove = false
    // 全量数据
    this.tableFullData = fullData
    this.tableFullTreeData = treeData
    // 缓存数据
    this.cacheRowMap(true)
    // 原始数据
    this.tableSynchData = datas
    // 克隆原数据，用于显示编辑状态，与编辑值做对比
    if (keepSource) {
      this.cacheSourceMap(fullData)
    }
    if (sYLoad) {
      if (showOverflow) {
        if (!rowOpts.height) {
          const errColumn = this.tableFullColumn.find((column: any) => column.showOverflow === false)
          if (errColumn) {
            errLog('vxe.error.errProp', [`column[field="${errColumn.field}"].show-overflow=false`, 'show-overflow=true'])
          }
        }
      }

      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (!(this.height || this.maxHeight)) {
          errLog('vxe.error.reqProp', ['table.height | table.max-height | table.scroll-y={enabled: false}'])
        }
        // if (!this.showOverflow) {
        //   warnLog('vxe.error.reqProp', ['table.show-overflow'])
        // }
        if (this.spanMethod) {
          warnLog('vxe.error.scrollErrProp', ['table.span-method'])
        }
      }
    }
    if (this.clearCellAreas && this.mouseConfig) {
      this.clearCellAreas()
      this.clearCopyCellArea()
    }
    this.clearMergeCells()
    this.clearMergeFooterItems()
    this.handleTableData(true)
    this.updateFooter()
    return this.$nextTick().then(() => {
      updateHeight($xeTable)
      this.updateStyle()
    }).then(() => {
      computeScrollLoad($xeTable)
    }).then(() => {
      // 是否启用了虚拟滚动
      if (sYLoad) {
        scrollYStore.endIndex = scrollYStore.visibleSize
      }
      this.handleReserveStatus()
      this.checkSelectionStatus()
      return new Promise(resolve => {
        this.$nextTick()
          .then(() => this.recalculate())
          .then(() => {
            let targetScrollLeft = lastScrollLeft
            let targetScrollTop = lastScrollTop
            // 是否在更新数据之后自动滚动重置滚动条
            if (sXOpts.scrollToLeftOnChange) {
              targetScrollLeft = 0
            }
            if (sYOpts.scrollToTopOnChange) {
              targetScrollTop = 0
            }
            // 是否变更虚拟滚动
            if (oldScrollYLoad === sYLoad) {
              restoreScrollLocation(this, targetScrollLeft, targetScrollTop).then(resolve)
            } else {
              setTimeout(() => restoreScrollLocation(this, targetScrollLeft, targetScrollTop).then(resolve))
            }
          })
      })
    })
  },
  /**
   * 重新加载数据，不会清空表格状态
   * @param {Array} datas 数据
   */
  loadData (datas: any) {
    const { initStatus } = this
    return this.loadTableData(datas).then(() => {
      this.inited = true
      this.initStatus = true
      if (!initStatus) {
        this.handleLoadDefaults()
      }
      return this.recalculate()
    })
  },
  /**
   * 重新加载数据，会清空表格状态
   * @param {Array} datas 数据
   */
  reloadData (datas: any) {
    return this.clearAll()
      .then(() => {
        this.inited = true
        this.initStatus = true
        return this.loadTableData(datas)
      })
      .then(() => {
        this.handleLoadDefaults()
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
    const { keepSource, tableSourceData, tableData } = this
    if (keepSource) {
      const rowIndex = this.getRowIndex(row)
      const oRow = tableSourceData[rowIndex]
      if (oRow && row) {
        if (field) {
          const newValue = XEUtils.get(record || row, field)
          XEUtils.set(row, field, newValue)
          XEUtils.set(oRow, field, newValue)
        } else {
          const newRecord = XEUtils.clone({ ...record }, true)
          XEUtils.destructuring(oRow, Object.assign(row, newRecord))
        }
      }
      this.tableData = tableData.slice(0)
    } else {
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        warnLog('vxe.error.reqProp', ['keep-source'])
      }
    }
    return this.$nextTick()
  },
  /**
   * 加载列配置
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  loadColumn (columns: any) {
    const collectColumn = XEUtils.mapTree(columns, column => Cell.createColumn(this, column), { children: 'children' })
    return this.handleColumn(collectColumn)
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
  initColumnSort  () {
    const { collectColumn } = this
    collectColumn.forEach((column: any, index: any) => {
      const sortIndex = index + 1
      column.sortNumber = sortIndex
      column.renderSortNumber = sortIndex
    })
  },
  handleColumn (collectColumn: any) {
    const $xeTable = this

    this.collectColumn = collectColumn
    const tableFullColumn = getColumnList(collectColumn)
    this.tableFullColumn = tableFullColumn
    this._isLoading = true
    this.isDragColMove = false
    this.initColumnSort()
    return Promise.resolve(
      this.restoreCustomStorage()
    ).then(() => {
      this._isLoading = false
      cacheColumnMap($xeTable)
      this.parseColumns(true).then(() => {
        if (this.scrollXLoad) {
          loadScrollXData($xeTable)
        }
      })
      this.clearMergeCells()
      this.clearMergeFooterItems()
      this.handleTableData(true)
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if ((this.scrollXLoad || this.scrollYLoad) && this.expandColumn) {
          warnLog('vxe.error.scrollErrProp', ['column.type=expand'])
        }
      }
      return this.$nextTick().then(() => {
        if (this.$toolbar) {
          this.$toolbar.syncUpdate({
            collectColumn: this.collectColumn,
            $table: this
          })
        }
        if ($xeTable.handleUpdateCustomColumn) {
          $xeTable.handleUpdateCustomColumn()
        }
        return this.recalculate()
      })
    })
  },
  /**
   * 更新数据行的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  cacheRowMap (isSource?: boolean) {
    const { treeConfig, treeOpts, tableFullData, fullAllDataRowIdData, tableFullTreeData } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const rowkey = getRowkey(this)
    const isLazy = treeConfig && treeOpts.lazy
    const fullAllDataRowIdMaps: Record<string, VxeTableDefines.RowCacheItem> = {}
    const fullDataRowIdMaps: Record<string, VxeTableDefines.RowCacheItem> = {}
    const handleCache = (row: any, index: any, items: any, path: any, parentRow: any, nodes: any) => {
      let rowid = getRowid(this, row)
      const seq = treeConfig && path ? toTreePathSeq(path) : index + 1
      const level = nodes ? nodes.length - 1 : 0
      if (eqEmptyValue(rowid)) {
        rowid = getRowUniqueId()
        XEUtils.set(row, rowkey, rowid)
      }
      if (isLazy && row[hasChildField] && XEUtils.isUndefined(row[childrenField])) {
        row[childrenField] = null
      }
      let cacheItem = fullAllDataRowIdData[rowid]
      if (!cacheItem) {
        cacheItem = { row, rowid, seq, index: -1, _index: -1, $index: -1, items, parent: parentRow, level, height: 0, oTop: 0 }
      }
      cacheItem.row = row
      cacheItem.items = items
      cacheItem.parent = parentRow
      cacheItem.level = level
      cacheItem.index = treeConfig && parentRow ? -1 : index
      if (isSource) {
        fullDataRowIdMaps[rowid] = cacheItem
      }
      fullAllDataRowIdMaps[rowid] = cacheItem
    }
    if (isSource) {
      this.fullDataRowIdData = fullDataRowIdMaps
    }
    this.fullAllDataRowIdData = fullAllDataRowIdMaps
    if (treeConfig) {
      XEUtils.eachTree(tableFullTreeData, handleCache, { children: childrenField })
    } else {
      tableFullData.forEach(handleCache)
    }
  },
  cacheSourceMap (fullData: any) {
    let { treeConfig, treeOpts, sourceDataRowIdData } = this
    const sourceData = XEUtils.clone(fullData, true)
    const rowkey = getRowkey(this)
    sourceDataRowIdData = this.sourceDataRowIdData = {}
    const handleSourceRow = (row: any) => {
      let rowid = getRowid(this, row)
      if (eqEmptyValue(rowid)) {
        rowid = getRowUniqueId()
        XEUtils.set(row, rowkey, rowid)
      }
      sourceDataRowIdData[rowid] = {
        row,
        rowid
      }
    }
    // 源数据缓存
    if (treeConfig) {
      const childrenField = treeOpts.children || treeOpts.childrenField
      XEUtils.eachTree(sourceData, handleSourceRow, { children: treeOpts.transform ? treeOpts.mapChildrenField : childrenField })
    } else {
      sourceData.forEach(handleSourceRow)
    }
    this.tableSourceData = sourceData
  },
  getParams () {
    return this.params
  },
  loadTreeChildren (row: any, childRecords: any) {
    const $xeTable = this

    const { keepSource, tableSourceData, treeOpts, fullDataRowIdData, fullAllDataRowIdData, sourceDataRowIdData } = this
    const { transform, mapChildrenField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const parentRest = fullAllDataRowIdData[getRowid($xeTable, row)]
    const parentLevel = parentRest ? parentRest.level : 0
    return this.createData(childRecords).then((rows: any) => {
      if (keepSource) {
        const rowid = getRowid(this, row)
        const matchObj = XEUtils.findTree(tableSourceData as any[], (item) => rowid === getRowid(this, item), { children: childrenField })
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
        const rest = { row: childRow, rowid, seq: -1, index, _index: -1, $index: -1, items, parent: parentRow, level: parentLevel + nodes.length, height: 0, oTop: 0 }
        fullDataRowIdData[rowid] = rest
        fullAllDataRowIdData[rowid] = rest
      }, { children: childrenField })
      row[childrenField] = rows
      if (transform) {
        row[mapChildrenField] = XEUtils.clone(rows, false)
      }
      this.updateAfterDataIndex()
      return rows
    })
  },
  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param {Element} tr 元素
   */
  getRowNode (tr: any) {
    if (tr) {
      const { fullAllDataRowIdData } = this
      const rowid = tr.getAttribute('rowid')
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
    return null
  },
  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param {Element} cell 元素
   */
  getColumnNode (cell: any) {
    if (cell) {
      const { fullColumnIdData } = this
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
  getRowSeq (row: any) {
    const { fullAllDataRowIdData } = this
    if (row) {
      const rowid = getRowid(this, row)
      const rest = fullAllDataRowIdData[rowid]
      if (rest) {
        return rest.seq
      }
    }
    return -1
  },
  /**
   * 根据 row 获取相对于 data 中的索引
   * @param {Row} row 行对象
   */
  getRowIndex (row: any) {
    const { fullAllDataRowIdData } = this
    if (row) {
      const rowid = getRowid(this, row)
      const rest = fullAllDataRowIdData[rowid]
      if (rest) {
        return rest.index
      }
    }
    return -1
  },
  /**
   * 根据 row 获取相对于当前数据中的索引
   * @param {Row} row 行对象
   */
  getVTRowIndex (row: any) {
    const { fullAllDataRowIdData } = this
    if (row) {
      const rowid = getRowid(this, row)
      const rest = fullAllDataRowIdData[rowid]
      if (rest) {
        return rest._index
      }
    }
    return -1
  },
  // 在 v3 中废弃
  _getRowIndex (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['_getRowIndex', 'getVTRowIndex'])
    }
    return this.getVTRowIndex(row)
  },
  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param {Row} row 行对象
   */
  getVMRowIndex (row: any) {
    const { fullAllDataRowIdData } = this
    if (row) {
      const rowid = getRowid(this, row)
      const rest = fullAllDataRowIdData[rowid]
      if (rest) {
        return rest.$index
      }
    }
    return -1
  },
  // 在 v3 中废弃
  $getRowIndex (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['$getRowIndex', 'getVMRowIndex'])
    }
    return this.getVMRowIndex(row)
  },
  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param {ColumnInfo} column 列配置
   */
  getColumnIndex (column: any) {
    const { fullColumnIdData } = this
    if (column) {
      const rest = fullColumnIdData[column.id]
      if (rest) {
        return rest.index
      }
    }
    return -1
  },
  /**
   * 根据 column 获取相对于当前表格列中的索引
   * @param {ColumnInfo} column 列配置
   */
  getVTColumnIndex (column: any) {
    const { fullColumnIdData } = this
    if (column) {
      const rest = fullColumnIdData[column.id]
      if (rest) {
        return rest._index
      }
    }
    return -1
  },
  // 在 v3 中废弃
  _getColumnIndex (column: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['_getColumnIndex', 'getVTColumnIndex'])
    }
    return this.getVTColumnIndex(column)
  },
  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param {ColumnInfo} column 列配置
   */
  getVMColumnIndex (column: any) {
    const { fullColumnIdData } = this
    if (column) {
      const rest = fullColumnIdData[column.id]
      if (rest) {
        return rest.$index
      }
    }
    return -1
  },
  // 在 v3 中废弃
  $getColumnIndex (column: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['$getColumnIndex', 'getVMColumnIndex'])
    }
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
  defineField (records: any) {
    const { radioOpts, checkboxOpts, treeConfig, treeOpts, expandOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const rowkey = getRowkey(this)
    if (!XEUtils.isArray(records)) {
      records = [records || {}]
    }
    return records.map((record: any) => {
      this.tableFullColumn.forEach((column: any) => {
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
    return this.$nextTick().then(() => {
      return this.defineField(records)
    })
  },
  /**
   * 创建 Row|Rows 对象
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param {Array/Object} records 新数据
   */
  createRow (records: any) {
    const isArr = XEUtils.isArray(records)
    if (!isArr) {
      records = [records]
    }
    return this.createData(records).then((rows: any) => isArr ? rows : rows[0])
  },
  // toOriginalRecords (rows: any[]) {
  //   const { treeConfig } = props
  //   const treeOpts = computeTreeOpts.value
  //   const { transform, mapChildrenField } = treeOpts
  //   const rowkey = getRowkey($xeTable)
  //   if (treeConfig) {
  //     if (transform) {
  //       return []
  //     }
  //     return []
  //   }
  //   return rows.map(item => {
  //     const obj = Object.assign({}, item)
  //     delete obj.rowkey
  //     return obj
  //   })
  // },
  /**
   * 还原数据
   * 如果不传任何参数，则还原整个表格
   * 如果传 row 则还原一行
   * 如果传 rows 则还原多行
   * 如果还额外传了 field 则还原指定的单元格数据
   */
  revertData (rows: any, field: any) {
    const { keepSource, tableSourceData, treeConfig } = this
    if (!keepSource) {
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        warnLog('vxe.error.reqProp', ['keep-source'])
      }
      return this.$nextTick()
    }
    let targetRows = rows
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        targetRows = [rows]
      }
    } else {
      targetRows = XEUtils.toArray(this.getUpdateRecords())
    }
    if (targetRows.length) {
      targetRows.forEach((row: any) => {
        if (!this.isInsertByRow(row)) {
          const rowIndex = this.getRowIndex(row)
          if (treeConfig && rowIndex === -1) {
            errLog('vxe.error.noTree', ['revertData'])
          }
          const oRow = tableSourceData[rowIndex]
          if (oRow && row) {
            if (field) {
              XEUtils.set(row, field, XEUtils.clone(XEUtils.get(oRow, field), true))
            } else {
              XEUtils.destructuring(row, XEUtils.clone(oRow, true))
            }
          }
        }
      })
    }
    if (rows) {
      return this.$nextTick()
    }
    return this.reloadData(tableSourceData)
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
    const { tableFullData, visibleColumn } = this
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
    return this.$nextTick()
  },
  getCellElement (row: any, fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (!column) {
      return null
    }
    const { $refs } = this
    const rowid = getRowid(this, row)
    let bodyElem = null
    if (column) {
      bodyElem = $refs[`${column.fixed || 'table'}Body`] || $refs.tableBody
    }
    if (bodyElem && bodyElem.$el) {
      return bodyElem.$el.querySelector(`.vxe-body--row[rowid="${rowid}"] .${column.id}`)
    }
    return null
  },
  getCellLabel (row: any, fieldOrColumn: any) {
    const $xeTable = this

    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (!column) {
      return null
    }
    const formatter = column.formatter
    const cellValue = getCellValue(row, column)
    let cellLabel = cellValue
    if (formatter) {
      let formatData
      const { fullAllDataRowIdData } = $xeTable
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
   * @param {Row} row 行对象
   */
  isInsertByRow (row: any) {
    const { editStore } = this
    const rowid = getRowid(this, row)
    return !!editStore.insertMaps[rowid]
  },
  /**
   * 删除所有新增的临时数据
   * @returns
   */
  removeInsertRow () {
    const $xeTable = this
    const reactData = $xeTable

    const { editStore } = reactData
    editStore.insertMaps = {}
    return $xeTable.remove($xeTable.getInsertRecords())
  },
  /**
   * 检查行或列数据是否发生改变
   * @param {Row} row 行对象
   * @param {String} field 字段名
   */
  isUpdateByRow (row: any, field: any) {
    const { tableFullColumn, keepSource, sourceDataRowIdData, fullDataRowIdData } = this
    if (keepSource) {
      const rowid = getRowid(this, row)
      // 新增的数据不需要检测
      if (!fullDataRowIdData[rowid]) {
        return false
      }
      const oldRest = sourceDataRowIdData[rowid]
      if (oldRest) {
        const oRow = oldRest.row
        if (arguments.length > 1) {
          return !eqCellValue(oRow, row, field)
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
    const columns = this.visibleColumn
    return XEUtils.isUndefined(columnIndex) ? columns.slice(0) : columns[columnIndex]
  },
  /**
   * 根据列获取列的唯一主键
   */
  getColid (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    return column ? column.id : null
  },
  /**
   * 根据列的唯一主键获取列
   * @param {String} colid 列主键
   */
  getColumnById (colid: any) {
    const fullColumnIdData = this.fullColumnIdData
    return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null
  },
  /**
   * 根据列的字段名获取列
   * @param {String} field 字段名
   */
  getColumnByField (field: any) {
    const fullColumnFieldData = this.fullColumnFieldData
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
    return {
      collectColumn: this.collectColumn.slice(0),
      fullColumn: this.tableFullColumn.slice(0),
      visibleColumn: this.visibleColumn.slice(0),
      tableColumn: this.tableColumn.slice(0)
    }
  },
  /**
   * 获取表格的全量列
   */
  getFullColumns () {
    const $xeTable = this
    const internalData = $xeTable

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
  getCheckboxRecords (isFull: any) {
    const { tableFullData, afterFullData, treeConfig, treeOpts, checkboxOpts, tableFullTreeData, afterTreeFullData, afterFullRowMaps } = this
    const { transform, mapChildrenField } = treeOpts
    const { checkField } = checkboxOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const currTableData = isFull ? (transform ? tableFullTreeData : tableFullData) : (transform ? afterTreeFullData : afterFullData)
    let rowList = []
    if (checkField) {
      if (treeConfig) {
        rowList = XEUtils.filterTree(currTableData, row => XEUtils.get(row, checkField), { children: transform ? mapChildrenField : childrenField })
      } else {
        rowList = currTableData.filter((row: any) => XEUtils.get(row, checkField))
      }
    } else {
      const { selectCheckboxMaps, fullDataRowIdData } = this
      XEUtils.each(selectCheckboxMaps, (row, rowid) => {
        if (isFull) {
          if (fullDataRowIdData[rowid]) {
            rowList.push(fullDataRowIdData[rowid].row)
          }
        } else {
          if (afterFullRowMaps[rowid]) {
            rowList.push(afterFullRowMaps[rowid])
          }
        }
      })
    }
    return rowList
  },
  /**
   * 获取处理后全量的表格数据
   * 如果存在筛选条件，继续处理
   */
  updateAfterFullData () {
    const { tableFullColumn, tableFullData, filterOpts, sortOpts, treeConfig, treeOpts, tableFullTreeData } = this
    const { remote: allRemoteFilter, filterMethod: allFilterMethod } = filterOpts
    const { remote: allRemoteSort, sortMethod: allSortMethod, multiple: sortMultiple, chronological } = sortOpts
    const { transform } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    let tableData: any[] = []
    let tableTree: any[] = []
    const filterColumns: any[] = []
    let orderColumns: any[] = []
    tableFullColumn.forEach((column: any) => {
      const { field, sortable, order, filters } = column
      if (!allRemoteFilter && filters && filters.length) {
        const valueList: any[] = []
        const itemList: any[] = []
        filters.forEach((item: any) => {
          if (item.checked) {
            itemList.push(item)
            valueList.push(item.value)
          }
        })
        if (itemList.length) {
          filterColumns.push({ column, valueList, itemList })
        }
      }
      if (!allRemoteSort && sortable && order) {
        orderColumns.push({ column, field, property: field, order, sortTime: column.sortTime })
      }
    })
    if (sortMultiple && chronological && orderColumns.length > 1) {
      orderColumns = XEUtils.orderBy(orderColumns, 'sortTime')
    }
    if (filterColumns.length) {
      const handleFilter = (row: any) => {
        return filterColumns.every(({ column, valueList, itemList }) => {
          if (valueList.length && !allRemoteFilter) {
            const { filterMethod, filterRender, field } = column
            const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
            const compFilterMethod = compConf ? (compConf.tableFilterMethod || compConf.filterMethod) : null
            const tdFilterMethod = compConf ? (compConf.tableFilterDefaultMethod || compConf.defaultTableFilterMethod || compConf.defaultFilterMethod) : null
            const cellValue = getCellValue(row, column)
            if (filterMethod) {
              return itemList.some((item: any) => filterMethod({ value: item.value, option: item, cellValue, row, column, $table: this }))
            } else if (compFilterMethod) {
              return itemList.some((item: any) => compFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: this }))
            } else if (allFilterMethod) {
              return allFilterMethod({ options: itemList, values: valueList, cellValue, row, column })
            } else if (tdFilterMethod) {
              return itemList.some((item: any) => tdFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: this }))
            }
            return valueList.indexOf(XEUtils.get(row, field)) > -1
          }
          return true
        })
      }
      if (treeConfig && transform) {
        // 筛选虚拟树
        tableTree = XEUtils.searchTree(tableFullTreeData, handleFilter, {
          original: true,
          isEvery: true,
          children: treeOpts.mapChildrenField,
          mapChildren: childrenField
        })
        tableData = tableTree
      } else {
        tableData = treeConfig ? tableFullTreeData.filter(handleFilter) : tableFullData.filter(handleFilter)
        tableTree = tableData
      }
    } else {
      if (treeConfig && transform) {
        // 还原虚拟树
        tableTree = XEUtils.searchTree(tableFullTreeData, () => true, {
          original: true,
          isEvery: true,
          children: treeOpts.mapChildrenField,
          mapChildren: childrenField
        })
        tableData = tableTree
      } else {
        tableData = treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0)
        tableTree = tableData
      }
    }
    const firstOrderColumn = orderColumns[0]
    if (!allRemoteSort && firstOrderColumn) {
      if (treeConfig && transform) {
        // 虚拟树和列表一样，只能排序根级节点
        if (allSortMethod) {
          const sortRests = allSortMethod({ data: tableTree, sortList: orderColumns, $table: this })
          tableTree = XEUtils.isArray(sortRests) ? sortRests : tableTree
        } else {
          tableTree = XEUtils.orderBy(tableTree, orderColumns.map(({ column, order }) => [getOrderField(this, column), order]))
        }
        tableData = tableTree
      } else {
        if (allSortMethod) {
          const sortRests = allSortMethod({ data: tableData, column: firstOrderColumn.column, property: firstOrderColumn.field, field: firstOrderColumn.field, order: firstOrderColumn.order, sortList: orderColumns, $table: this })
          tableData = XEUtils.isArray(sortRests) ? sortRests : tableData
        } else {
          // 兼容 v4
          if (sortMultiple) {
            tableData = XEUtils.orderBy(tableData, orderColumns.map(({ column, order }) => [getOrderField(this, column), order]))
          } else {
            // 兼容 v2，在 v4 中废弃， sortBy 不能为数组
            let sortByConfs
            if (XEUtils.isArray(firstOrderColumn.sortBy)) {
              sortByConfs = firstOrderColumn.sortBy.map((item: any) => [item, firstOrderColumn.order])
            }
            tableData = XEUtils.orderBy(tableData, sortByConfs || [firstOrderColumn].map(({ column, order }) => [getOrderField(this, column), order]))
          }
        }
        tableTree = tableData
      }
    }
    this.afterFullData = tableData
    this.afterTreeFullData = tableTree
    this.updateAfterDataIndex()
  },
  updateTreeDataIndex () {
    const $xeTable = this
    const props = $xeTable
    const internalData = $xeTable

    const { treeConfig } = props
    const { afterFullData, fullDataRowIdData, fullAllDataRowIdData } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    if (treeConfig) {
      if (treeOpts.transform) {
        afterFullData.forEach((row: any, index: number) => {
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            rowRest._index = index
          } else {
            const rest = { row, rowid, seq: '-1', index: -1, $index: -1, _index: index, items: [], parent: null, level: 0, height: 0, oTop: 0 }
            fullAllDataRowIdData[rowid] = rest
            fullDataRowIdData[rowid] = rest
          }
        })
      }
    }
  },
  /**
   * 预编译
   * 对渲染中的数据提前解析序号及索引。牺牲提前编译耗时换取渲染中额外损耗，使运行时更加流畅
   */
  updateAfterDataIndex () {
    const $xeTable = this
    const props = $xeTable
    const internalData = $xeTable

    const { treeConfig } = props
    const { afterFullData, fullDataRowIdData, fullAllDataRowIdData, afterTreeFullData } = internalData
    const treeOpts = $xeTable.computeTreeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const fullMaps: any = {}
    if (treeConfig) {
      XEUtils.eachTree(afterTreeFullData, (row, index, items, path) => {
        const rowid = getRowid($xeTable, row)
        const rowRest = fullAllDataRowIdData[rowid]
        const seq = path.map((num, i) => i % 2 === 0 ? (Number(num) + 1) : '.').join('')
        if (rowRest) {
          rowRest.seq = seq
          rowRest._index = index
        } else {
          const rest = { row, rowid, seq, index: -1, $index: -1, _index: index, items: [], parent: null, level: 0, height: 0, oTop: 0 }
          fullAllDataRowIdData[rowid] = rest
          fullDataRowIdData[rowid] = rest
        }
        fullMaps[rowid] = row
      }, { children: treeOpts.transform ? treeOpts.mapChildrenField : childrenField })
      $xeTable.updateTreeDataIndex()
    } else {
      afterFullData.forEach((row: any, index: number) => {
        const rowid = getRowid($xeTable, row)
        const rowRest = fullAllDataRowIdData[rowid]
        const seq = index + 1
        if (rowRest) {
          rowRest.seq = seq
          rowRest._index = index
        } else {
          const rest = { row, rowid, seq, index: -1, $index: -1, _index: index, items: [], parent: null, level: 0, height: 0, oTop: 0 }
          fullAllDataRowIdData[rowid] = rest
          fullDataRowIdData[rowid] = rest
        }
        fullMaps[rowid] = row
      })
    }
    this.afterFullRowMaps = fullMaps
  },
  /**
   * 只对 tree-config 有效，获取行的子级
   */
  getTreeRowChildren (rowOrRowid: any) {
    const $xeTable = this
    const props = $xeTable
    const internalData = $xeTable

    const { treeConfig } = props
    const { fullDataRowIdData } = internalData
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
        const rest = fullDataRowIdData[rowid]
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
    const { treeConfig, fullDataRowIdData } = this
    if (rowOrRowid && treeConfig) {
      let rowid
      if (XEUtils.isString(rowOrRowid)) {
        rowid = rowOrRowid
      } else {
        rowid = getRowid(this, rowOrRowid)
      }
      if (rowid) {
        const rest = fullDataRowIdData[rowid]
        return rest ? rest.parent : null
      }
    }
    return null
  },
  getParentRow (rowOrRowid: any) {
    const $xeTable = this

    warnLog('vxe.error.delFunc', ['getParentRow', 'getTreeParentRow'])
    return $xeTable.getTreeParentRow(rowOrRowid)
  },
  /**
   * 根据行的唯一主键获取行
   * @param {String/Number} rowid 行主键
   */
  getRowById (cellValue: any) {
    const fullDataRowIdData = this.fullDataRowIdData
    const rowid = XEUtils.eqNull(cellValue) ? '' : encodeURIComponent(cellValue)
    return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null
  },
  /**
   * 根据行获取行的唯一主键
   * @param {Row} row 行对象
   */
  getRowid (row: any) {
    const $xeTable = this

    const rowid = XEUtils.get(row, getRowkey($xeTable))
    return XEUtils.eqNull(rowid) ? '' : encodeURIComponent(rowid)
  },
  /**
   * 获取处理后的表格数据
   * 如果存在筛选条件，继续处理
   * 如果存在排序，继续处理
   */
  getTableData () {
    const { treeConfig, tableFullData, afterFullData, tableData, footerTableData, tableFullTreeData } = this
    return {
      fullData: treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0),
      visibleData: afterFullData.slice(0),
      tableData: tableData.slice(0),
      footerData: footerTableData.slice(0)
    }
  },
  /**
   * 获取表格的全量数据，如果是 tree-config 则返回带层级的树结构
   */
  getFullData () {
    const $xeTable = this
    const props = $xeTable
    const internalData = $xeTable

    const { treeConfig } = props
    const { tableFullData, tableFullTreeData } = internalData
    if (treeConfig) {
      const treeOpts = $xeTable.computeTreeOpts
      const { transform, mapChildrenField } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      if (transform) {
        return XEUtils.toArrayTree(
          XEUtils.toTreeArray(tableFullTreeData, {
            children: mapChildrenField
          }),
          { children: childrenField }
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
    if (this.checkboxConfig) {
      this.handleDefaultSelectionChecked()
    }
    if (this.radioConfig) {
      this.handleDefaultRadioChecked()
    }
    if (this.expandConfig) {
      this.handleDefaultRowExpand()
    }
    if (this.treeConfig) {
      this.handleDefaultTreeExpand()
    }
    if (this.mergeCells) {
      this.handleDefaultMergeCells()
    }
    if (this.mergeFooterItems) {
      this.handleDefaultMergeFooterItems()
    }
    this.$nextTick(() => setTimeout(this.recalculate))
  },
  /**
   * 处理初始化的默认行为
   * 只会执行一次
   */
  handleInitDefaults () {
    const { sortConfig } = this
    if (sortConfig) {
      this.handleDefaultSort()
    }
  },
  /**
   * 设置为固定列
   */
  setColumnFixed (fieldOrColumn: any, fixed: any) {
    const $xeTable = this

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
  clearColumnFixed (fieldOrColumn: any) {
    const $xeTable = this

    let status = false
    const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
    cols.forEach(item => {
      const column = handleFieldOrColumn($xeTable, item)
      const targetColumn = getRootColumn($xeTable, column as any)
      if (targetColumn && targetColumn.fixed) {
        XEUtils.eachTree([targetColumn], (column) => {
          column.fixed = null
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
  hideColumn (fieldOrColumn: any) {
    const $xeTable = this

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
  showColumn (fieldOrColumn: any) {
    const $xeTable = this

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
  setColumnWidth (fieldOrColumn: any, width: any) {
    const $xeTable = this

    let status = false
    const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
    cols.forEach(item => {
      const column = handleFieldOrColumn($xeTable, item)
      if (column) {
        const colWidth = XEUtils.toInteger(width)
        let rdWidth = colWidth
        if (isScale(width)) {
          const tableBody = $xeTable.$refs.tableBody
          const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
          const bodyWidth = bodyElem ? bodyElem.clientWidth - 1 : 0
          rdWidth = Math.floor(colWidth * bodyWidth)
        }
        column.resizeWidth = rdWidth
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
  getColumnWidth (fieldOrColumn: any) {
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
  resetColumn (options: any) {
    warnLog('vxe.error.delFunc', ['resetColumn', 'resetCustom'])
    return this.resetCustom(options)
  },
  handleCustom () {
    const { mouseConfig } = this
    if (mouseConfig) {
      if (this.clearSelected) {
        this.clearSelected()
      }
      if (this.clearCellAreas) {
        this.clearCellAreas()
        this.clearCopyCellArea()
      }
    }
    this.analyColumnWidth()
    return this.refreshColumn(true)
  },
  handleCustomRestore (storeData: any) {
    const $xetable = this
    const reactData = $xetable
    const internalData = $xetable

    let { collectColumn } = internalData
    const { resizableData, sortData, visibleData, fixedData } = storeData
    let hasCustomSort = false
    // 处理还原
    if (resizableData || sortData || visibleData || fixedData) {
      XEUtils.eachTree(collectColumn, (column, index, items, path, parentRow) => {
        const colKey = column.getKey()
        // 支持一级
        if (!parentRow) {
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
  },
  /**
   * 还原自定义列操作状态
   */
  restoreCustomStorage () {
    const { tableId, customConfig, customOpts } = this
    const { storage, restoreStore } = customOpts
    const isAllCustom = storage === true
    const storageOpts = isAllCustom ? {} : Object.assign({}, storage || {})
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
          restoreStore({ id: tableId, type: 'restore', storeData })
        ).then(storeData => {
          if (!storeData) {
            return
          }
          return this.handleCustomRestore(storeData)
        }).catch(e => e)
      } else {
        return this.handleCustomRestore(storeData)
      }
    }
  },
  getCustomStoreData () {
    const { id, customOpts, collectColumn } = this
    const { checkMethod } = customOpts
    const resizableData: any = {}
    const sortData: any = {}
    const visibleData: any = {}
    const fixedData: any = {}
    const storeData: any = {
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
    let hasFixedt = 0
    let hasVisible = 0
    XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn) => {
      // 只支持一级
      if (!parentColumn) {
        collectColumn.forEach((column: any) => {
          const colKey = column.getKey()
          if (colKey) {
            hasSort = 1
            sortData[colKey] = column.renderSortNumber
          }
        })
        if (column.fixed !== column.defaultFixed) {
          const colKey = column.getKey()
          if (colKey) {
            hasFixedt = 1
            fixedData[colKey] = column.fixed
          }
        }
      }
      if (column.resizeWidth) {
        const colKey = column.getKey()
        if (colKey) {
          hasResizable = 1
          resizableData[colKey] = column.renderWidth
        }
      }
      if (!checkMethod || checkMethod({ column })) {
        if (!column.visible && column.defaultVisible) {
          const colKey = column.getKey()
          if (colKey) {
            hasVisible = 1
            visibleData[colKey] = false
          }
        } else if (column.visible && !column.defaultVisible) {
          const colKey = column.getKey()
          if (colKey) {
            hasVisible = 1
            visibleData[colKey] = true
          }
        }
      }
    })
    if (hasResizable) {
      storeData.resizableData = resizableData
    }
    if (hasSort) {
      storeData.sortData = sortData
    }
    if (hasFixedt) {
      storeData.fixedData = fixedData
    }
    if (hasVisible) {
      storeData.visibleData = visibleData
    }
    return storeData
  },
  saveCustomStore (type: any) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable as TableReactData

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
    if (initSort) {
      this.handleUpdateColumn()
    }
    return this.parseColumns(true).then(() => {
      return this.refreshScroll()
    }).then(() => {
      return this.recalculate()
    })
  },
  /**
   * 刷新列信息
   * 将固定的列左边、右边分别靠边
   */
  parseColumns (isReset: boolean) {
    const $xeTable = this
    const props = $xeTable
    const internalData = $xeTable

    const { showOverflow } = props
    const rowOpts = $xeTable.computeRowOpts
    const leftList: any[] = []
    const centerList: any[] = []
    const rightList: any[] = []
    const { collectColumn, tableFullColumn, isGroup, columnStore, sXOpts, scrollXStore, fullColumnIdData } = this
    // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏
    if (isGroup) {
      const leftGroupList: any[] = []
      const centerGroupList: any[] = []
      const rightGroupList: any[] = []
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
          column.visible = !!XEUtils.findTree(column.children, (subColumn: any) => hasChildrenList(subColumn) ? null : subColumn.visible)
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
      collectColumn.forEach((column: any) => {
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
      this.tableGroupColumn = leftGroupList.concat(centerGroupList).concat(rightGroupList)
    } else {
      // 重新分配列
      tableFullColumn.forEach((column: any) => {
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
    // 如果gt为0，则总是启用
    const scrollXLoad = sXOpts.enabled && sXOpts.gt > -1 && (sXOpts.gt === 0 || sXOpts.gt <= tableFullColumn.length)
    this.hasFixedColumn = leftList.length > 0 || rightList.length > 0
    Object.assign(columnStore, { leftList, centerList, rightList })
    if (scrollXLoad) {
      if (showOverflow) {
        if (!rowOpts.height) {
          const errColumn = internalData.tableFullColumn.find((column: any) => column.showOverflow === false)
          if (errColumn) {
            errLog('vxe.error.errProp', [`column[field="${errColumn.field}"].show-overflow=false`, 'show-overflow=true'])
          }
        }
      }
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        // if (this.showHeader && !this.showHeaderOverflow) {
        //   warnLog('vxe.error.reqProp', ['show-header-overflow'])
        // }
        // if (this.showFooter && !this.showFooterOverflow) {
        //   warnLog('vxe.error.reqProp', ['show-footer-overflow'])
        // }
        if (this.spanMethod) {
          warnLog('vxe.error.scrollErrProp', ['span-method'])
        }
        if (this.footerSpanMethod) {
          warnLog('vxe.error.scrollErrProp', ['footer-span-method'])
        }
      }
      if (isReset) {
        const { visibleSize } = handleVirtualXVisible(this)
        scrollXStore.startIndex = 0
        scrollXStore.endIndex = visibleSize
        scrollXStore.visibleSize = visibleSize
      }
    }
    // 如果列被显示/隐藏，则清除合并状态
    // 如果列被设置为固定，则清除合并状态
    if (visibleColumn.length !== this.visibleColumn.length || !this.visibleColumn.every((column: any, index: any) => column === visibleColumn[index])) {
      this.clearMergeCells()
      this.clearMergeFooterItems()
    }
    this.scrollXLoad = scrollXLoad
    visibleColumn.forEach((column, index) => {
      const colid = column.id
      const colRest = fullColumnIdData[colid]
      if (colRest) {
        colRest._index = index
      }
    })
    this.visibleColumn = visibleColumn
    this.handleTableColumn()
    if (isReset) {
      return this.updateFooter().then(() => {
        return this.recalculate()
      }).then(() => {
        this.updateCellAreas()
        return this.recalculate()
      })
    }
    return this.updateFooter()
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
  handleResizeDblclickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const resizableOpts = $xeTable.computeResizableOpts
    const { isDblclickAutoWidth } = resizableOpts
    const el = $xeTable.$refs.refElem as HTMLDivElement
    if (isDblclickAutoWidth && el) {
      const { fullColumnIdData } = internalData
      const { column } = params
      const colid = column.id
      const colRest = fullColumnIdData[colid]
      const dragBtnElem = evnt.target as HTMLDivElement
      const cell = dragBtnElem.parentNode as HTMLTableCellElement
      const cellParams = Object.assign(params, { cell })
      const colMinWidth = getColReMinWidth(cellParams)
      let resizeWidth = calcColumnAutoWidth(column, el)
      if (colRest) {
        resizeWidth = Math.max(resizeWidth, colRest.width)
      }
      column.resizeWidth = Math.max(colMinWidth, resizeWidth)
      reactData._isResize = false
      internalData._lastResizeTime = Date.now()
      $xeTable.analyColumnWidth()
      $xeTable.recalculate(true).then(() => {
        $xeTable.saveCustomStore('update:visible')
        $xeTable.updateCellAreas()
        $xeTable.dispatchEvent('resizable-change', { ...params, resizeWidth }, evnt)
        setTimeout(() => $xeTable.recalculate(true), 300)
      })
    }
  },
  /**
   * 刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）
   */
  refreshScroll () {
    const { lastScrollLeft, lastScrollTop } = this
    const { $refs } = this
    const { tableBody, leftBody, rightBody, tableFooter } = $refs
    const tableBodyElem = tableBody ? tableBody.$el : null
    const leftBodyElem = leftBody ? leftBody.$el : null
    const rightBodyElem = rightBody ? rightBody.$el : null
    const tableFooterElem = tableFooter ? tableFooter.$el : null
    return new Promise(resolve => {
      // 还原滚动条位置
      if (lastScrollLeft || lastScrollTop) {
        return restoreScrollLocation(this, lastScrollLeft, lastScrollTop).then(() => {
          // 存在滚动行为未结束情况
          setTimeout(resolve, 30)
        })
      }
      // 重置
      setScrollTop(tableBodyElem, lastScrollTop)
      setScrollTop(leftBodyElem, lastScrollTop)
      setScrollTop(rightBodyElem, lastScrollTop)
      setScrollLeft(tableFooterElem, lastScrollLeft)
      // 存在滚动行为未结束情况
      setTimeout(resolve, 30)
    })
  },
  /**
   * 重新渲染布局
   * 刷新布局
   */
  recalculate (reFull?: boolean) {
    const $xeTable = this
    const internalData = $xeTable

    return new Promise<void>(resolve => {
      const { rceTimeout, rceRunTime } = internalData
      const resizeOpts = $xeTable.computeResizeOpts
      const refreshDelay = resizeOpts.refreshDelay || 20
      const el = $xeTable.$refs.refElem as HTMLElement
      if (el && el.clientWidth) {
        autoCellWidth($xeTable)
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

    let {
      $refs,
      isGroup,
      fullColumnIdData,
      tableColumn,
      customHeight,
      customMinHeight,
      customMaxHeight,
      border,
      headerHeight,
      showFooter,
      showOverflow: allColumnOverflow,
      showHeaderOverflow: allColumnHeaderOverflow,
      showFooterOverflow: allColumnFooterOverflow,
      footerHeight,
      tableHeight,
      tableWidth,
      scrollbarHeight,
      scrollbarWidth,
      scrollXLoad,
      scrollYLoad,
      overflowX,
      cellOffsetWidth,
      columnStore,
      elemStore,
      editStore,
      currentRow,
      mouseConfig,
      spanMethod,
      expandColumn,
      footerSpanMethod,
      isAllOverflow,
      visibleColumn
    } = $xeTable
    const containerList = ['main', 'left', 'right']
    const emptyPlaceholderElem = $refs.emptyPlaceholder
    const bodyWrapperElem = elemStore['main-body-wrapper']
    if (emptyPlaceholderElem) {
      emptyPlaceholderElem.style.top = `${headerHeight}px`
      emptyPlaceholderElem.style.height = bodyWrapperElem ? `${bodyWrapperElem.offsetHeight - scrollbarHeight}px` : ''
    }
    if (customHeight > 0) {
      if (showFooter) {
        customHeight += scrollbarHeight
      }
    }

    const scrollXVirtualEl = $xeTable.$refs.refScrollXVirtualElem
    if (scrollXVirtualEl) {
      scrollXVirtualEl.style.height = `${scrollbarHeight}px`
    }

    const scrollYVirtualEl = $xeTable.$refs.refScrollYVirtualElem
    if (scrollYVirtualEl) {
      let bodyHeight = 0
      let bodyMaxHeight = 0
      const bodyMinHeight = customMinHeight - headerHeight - footerHeight
      if (customMaxHeight) {
        bodyMaxHeight = customMaxHeight - headerHeight - footerHeight
        bodyMaxHeight = Math.max(bodyMinHeight, bodyMaxHeight)
      }
      if (customHeight) {
        bodyHeight = customHeight - headerHeight - footerHeight
        if (bodyMaxHeight) {
          bodyHeight = Math.min(bodyMaxHeight, bodyHeight)
        }
        bodyHeight = Math.max(bodyMinHeight, bodyHeight)
      }
      scrollYVirtualEl.style.top = `${headerHeight}px`
      scrollYVirtualEl.style.width = `${scrollbarWidth}px`
      scrollYVirtualEl.style.height = `${bodyHeight + (overflowX ? -Math.max(1, scrollbarHeight) : 0)}px`
    }

    containerList.forEach((name, index) => {
      const fixedType = index > 0 ? name : ''
      const layoutList = ['header', 'body', 'footer']
      const fixedColumn = columnStore[`${fixedType}List`]
      const fixedWrapperElem = $refs[`${fixedType}Container`]
      layoutList.forEach(layout => {
        const wrapperElem = elemStore[`${name}-${layout}-wrapper`]
        const tableElem = elemStore[`${name}-${layout}-table`]
        if (layout === 'header') {
          // 表头体样式处理
          // 横向滚动渲染
          let tWidth = tableWidth
          let renderColumnList = tableColumn

          if (isGroup) {
            renderColumnList = visibleColumn
          } else {
            if (fixedType) {
              // 如果是使用优化模式
              if (scrollXLoad || scrollYLoad || allColumnHeaderOverflow) {
                // 如果不支持优化模式
                if (spanMethod || footerSpanMethod) {
                  renderColumnList = visibleColumn
                } else {
                  renderColumnList = fixedColumn || []
                }
              } else {
                renderColumnList = visibleColumn
              }
            }
          }

          tWidth = renderColumnList.reduce((previous: any, column: any) => previous + column.renderWidth, 0)

          if (tableElem) {
            tableElem.style.width = tWidth ? `${tWidth + scrollbarWidth}px` : ''
            // 修复 IE 中高度无法自适应问题
            if (browse.msie) {
              XEUtils.arrayEach(tableElem.querySelectorAll('.vxe-resizable'), (resizeElem: any) => {
                resizeElem.style.height = `${resizeElem.parentNode.offsetHeight}px`
              })
            }
          }

          const repairElem = elemStore[`${name}-${layout}-repair`]
          if (repairElem) {
            repairElem.style.width = `${tableWidth}px`
          }

          const listElem = elemStore[`${name}-${layout}-list`]
          if (isGroup && listElem) {
            XEUtils.arrayEach(listElem.querySelectorAll('.col--group'), (thElem: HTMLTableRowElement) => {
              const colNode = this.getColumnNode(thElem)
              if (colNode) {
                const column = colNode.item
                const { showHeaderOverflow } = column
                const cellOverflow = XEUtils.isBoolean(showHeaderOverflow) ? showHeaderOverflow : allColumnHeaderOverflow
                const showEllipsis = cellOverflow === 'ellipsis'
                const showTitle = cellOverflow === 'title'
                const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
                const hasEllipsis = showTitle || showTooltip || showEllipsis
                let childWidth = 0
                let countChild = 0
                if (hasEllipsis) {
                  XEUtils.eachTree(column.children, item => {
                    if (!item.children || !column.children.length) {
                      countChild++
                    }
                    childWidth += item.renderWidth
                  })
                }
                thElem.style.width = hasEllipsis ? `${childWidth - countChild - (border ? 2 : 0)}px` : ''
              }
            })
          }
        } else if (layout === 'body') {
          const emptyBlockElem = elemStore[`${name}-${layout}-emptyBlock`]
          if (isNodeElement(wrapperElem)) {
            let bodyMaxHeight = 0
            const bodyMinHeight = customMinHeight - headerHeight - footerHeight
            if (customMaxHeight) {
              bodyMaxHeight = customMaxHeight - headerHeight - footerHeight
              // 如果是固定列
              if (fixedType) {
                bodyMaxHeight -= (showFooter ? 0 : scrollbarHeight)
              }
              bodyMaxHeight = Math.max(bodyMinHeight, bodyMaxHeight)
              wrapperElem.style.maxHeight = `${bodyMaxHeight}px`
            }
            if (customHeight) {
              let bodyHeight = customHeight - headerHeight - footerHeight
              // 如果是固定列
              if (fixedType) {
                bodyHeight -= (showFooter ? 0 : scrollbarHeight)
              }
              if (bodyMaxHeight) {
                bodyHeight = Math.min(bodyMaxHeight, bodyHeight)
              }
              wrapperElem.style.height = `${Math.max(bodyMinHeight, bodyHeight)}px`
            } else {
              wrapperElem.style.height = ''
            }
            wrapperElem.style.minHeight = `${bodyMinHeight}px`
          }

          // 如果是固定列
          if (fixedWrapperElem) {
            const isRightFixed = fixedType === 'right'
            const fixedColumn = columnStore[`${fixedType}List`]
            if (isNodeElement(wrapperElem)) {
              wrapperElem.style.top = `${headerHeight}px`
            }
            fixedWrapperElem.style.height = `${(customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1)}px`
            fixedWrapperElem.style.width = `${fixedColumn.reduce((previous: any, column: any) => previous + column.renderWidth, isRightFixed ? scrollbarWidth : 0)}px`
          }

          let tWidth = tableWidth
          let renderColumnList = tableColumn

          if (fixedType) {
            // 如果是使用优化模式
            if (scrollXLoad || scrollYLoad || (allColumnOverflow && isAllOverflow)) {
              // 如果不支持优化模式
              if (expandColumn || spanMethod || footerSpanMethod) {
                renderColumnList = visibleColumn
              } else {
                renderColumnList = fixedColumn || []
              }
            } else {
              renderColumnList = visibleColumn
            }
          }

          tWidth = renderColumnList.reduce((previous: any, column: any) => previous + column.renderWidth, 0)

          if (tableElem) {
            tableElem.style.width = tWidth ? `${tWidth}px` : ''
            // 兼容性处理
            tableElem.style.paddingRight = scrollbarWidth && fixedType && (browse['-moz'] || browse.safari) ? `${scrollbarWidth}px` : ''
          }
          if (emptyBlockElem) {
            emptyBlockElem.style.width = tWidth ? `${tWidth}px` : ''
          }
        } else if (layout === 'footer') {
          let tWidth = tableWidth
          let renderColumnList = tableColumn

          if (fixedType) {
            // 如果是使用优化模式
            if (scrollXLoad || scrollYLoad || allColumnFooterOverflow) {
              // 如果不支持优化模式
              if (spanMethod || footerSpanMethod) {
                renderColumnList = visibleColumn
              } else {
                renderColumnList = fixedColumn || []
              }
            } else {
              renderColumnList = visibleColumn
            }
          }

          tWidth = renderColumnList.reduce((previous: any, column: any) => previous + column.renderWidth, 0)

          if (isNodeElement(wrapperElem)) {
            // 如果是固定列
            if (fixedWrapperElem) {
              wrapperElem.style.top = `${customHeight > 0 ? customHeight - footerHeight : tableHeight + headerHeight}px`
            }
            wrapperElem.style.marginTop = `${-scrollbarHeight}px`
          }
          if (tableElem) {
            tableElem.style.width = tWidth ? `${tWidth + scrollbarWidth}px` : ''
          }
        }
        const colgroupElem = elemStore[`${name}-${layout}-colgroup`]
        if (colgroupElem) {
          XEUtils.arrayEach(colgroupElem.children, (colElem: any) => {
            const colid = colElem.getAttribute('name')
            if (colid === 'col_gutter') {
              colElem.style.width = `${scrollbarWidth}px`
            }
            if (fullColumnIdData[colid]) {
              const colRest = fullColumnIdData[colid]
              const column = colRest.column
              const { showHeaderOverflow, showFooterOverflow, showOverflow } = column
              let cellOverflow
              colElem.style.width = `${column.renderWidth}px`
              if (layout === 'header') {
                cellOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
              } else if (layout === 'footer') {
                cellOverflow = XEUtils.isUndefined(showFooterOverflow) || XEUtils.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow
              } else {
                cellOverflow = XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow) ? allColumnOverflow : showOverflow
              }
              const showEllipsis = cellOverflow === 'ellipsis'
              const showTitle = cellOverflow === 'title'
              const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
              let hasEllipsis = showTitle || showTooltip || showEllipsis
              const listElem = elemStore[`${name}-${layout}-list`]
              // 滚动的渲染不支持动态行高
              if (layout === 'header' || layout === 'footer') {
                if (scrollXLoad && !hasEllipsis) {
                  hasEllipsis = true
                }
              } else {
                if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
                  hasEllipsis = true
                }
              }
              if (listElem) {
                XEUtils.arrayEach(listElem.querySelectorAll(`.${column.id}`), (elem: any) => {
                  const colspan = parseInt(elem.getAttribute('colspan') || 1)
                  const cellElem = elem.querySelector('.vxe-cell')
                  let colWidth = column.renderWidth
                  if (cellElem) {
                    if (colspan > 1) {
                      const columnIndex = this.getColumnIndex(column)
                      for (let index = 1; index < colspan; index++) {
                        const nextColumn = this.getColumns(columnIndex + index)
                        if (nextColumn) {
                          colWidth += nextColumn.renderWidth
                        }
                      }
                    }
                    cellElem.style.width = hasEllipsis ? `${colWidth - (cellOffsetWidth * colspan)}px` : ''
                  }
                })
              }
            }
          })
        }
      })
    })
    if (currentRow) {
      this.setCurrentRow(currentRow)
    }
    if (mouseConfig && mouseConfig.selected && editStore.selected.row && editStore.selected.column) {
      this.addColSdCls()
    }
    return this.$nextTick()
  },
  /**
   * 处理固定列的显示状态
   */
  checkScrolling () {
    const $xeTable = this

    const { tableBody, leftContainer, rightContainer } = $xeTable.$refs
    const bodyElem = tableBody ? tableBody.$el : null
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const bodtTargetEl = xHandleEl || bodyElem
    if (bodtTargetEl) {
      if (leftContainer) {
        if (bodtTargetEl.scrollLeft > 0) {
          addClass(leftContainer, 'scrolling--middle')
        } else {
          removeClass(leftContainer, 'scrolling--middle')
        }
      }
      if (rightContainer) {
        if (bodtTargetEl.clientWidth < bodtTargetEl.scrollWidth - Math.ceil(bodtTargetEl.scrollLeft)) {
          addClass(rightContainer, 'scrolling--middle')
        } else {
          removeClass(rightContainer, 'scrolling--middle')
        }
      }
    }
  },
  preventEvent (evnt: any, type: any, args: any, next: any, end: any) {
    let evntList = interceptor.get(type)

    // 兼容老版本
    if (!evntList.length && type === 'event.clearEdit') {
      evntList = interceptor.get('event.clearActived')
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (evntList.length) {
          warnLog('vxe.error.delEvent', ['event.clearActived', 'event.clearEdit'])
        }
      }
    }
    // 兼容老版本

    let rest
    if (!evntList.some(func => func(Object.assign({ $grid: this.$xegrid, $table: this, $event: evnt }, args)) === false)) {
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
    const { $el, $refs, $xegrid, $toolbar, mouseConfig, editStore, ctxMenuStore, editRules, editOpts, validOpts, areaOpts, filterStore, customStore, getRowNode } = this
    const { actived } = editStore
    const { ctxWrapper, filterWrapper, customWrapper, validTip } = $refs
    // 筛选
    if (filterWrapper) {
      if (getEventTargetNode(evnt, $el, 'vxe-cell--filter').flag) {
        // 如果点击了筛选按钮
      } else if (getEventTargetNode(evnt, filterWrapper.$el).flag) {
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
          if (validTip && getEventTargetNode(evnt, validTip.$el).flag) {
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
      if (!getEventTargetNode(evnt, $el).flag && !($xegrid && getEventTargetNode(evnt, $xegrid.$el).flag) && !(ctxWrapper && getEventTargetNode(evnt, ctxWrapper.$el).flag) && !($toolbar && getEventTargetNode(evnt, $toolbar.$el).flag)) {
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
    if (ctxMenuStore.visible && ctxWrapper && !getEventTargetNode(evnt, ctxWrapper.$el).flag) {
      this.closeMenu()
    }
    const isActivated = getEventTargetNode(evnt, ($xegrid || this).$el).flag
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
    const $xeTable = this
    const internalData = $xeTable

    // 该行为只对当前激活的表格有效
    if (this.isActivated) {
      this.preventEvent(evnt, 'event.keydown', null, () => {
        const { afterFullData } = internalData
        const { filterStore, isCtxMenu, ctxMenuStore, editStore, editOpts, editConfig, mouseConfig, mouseOpts, keyboardConfig, keyboardOpts, treeConfig, treeOpts, highlightCurrentRow, currentRow, bodyCtxMenu, rowOpts } = this
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
        const hasMetaKey = evnt.metaKey
        const hasCtrlKey = evnt.ctrlKey
        const hasShiftKey = evnt.shiftKey
        const hasAltKey = evnt.altKey
        const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
        const operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow)
        const isEditStatus = isEnableConf(editConfig) && actived.column && actived.row
        const childrenField = treeOpts.children || treeOpts.childrenField
        const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
        if (filterStore.visible) {
          if (isEsc) {
            this.closeFilter()
          }
          return
        }
        if (operCtxMenu) {
          // 如果配置了右键菜单; 支持方向键操作、回车
          evnt.preventDefault()
          if (ctxMenuStore.showChild && hasChildrenList(ctxMenuStore.selected)) {
            this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children)
          } else {
            this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, this.ctxMenuList)
          }
        } else if (keyboardConfig && mouseConfig && mouseOpts.area && this.handleKeyboardCellAreaEvent) {
          this.handleKeyboardCellAreaEvent(evnt)
        } else if (keyboardConfig && isSpacebar && keyboardOpts.isChecked && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'radio')) {
          // 空格键支持选中复选框
          evnt.preventDefault()
          if (selected.column.type === 'checkbox') {
            this.handleToggleCheckRowEvent(evnt, selected.args)
          } else {
            this.triggerRadioRowEvent(evnt, selected.args)
          }
        } else if (isF2 && isEnableConf(editConfig)) {
          if (!isEditStatus) {
            // 如果按下了 F2 键
            if (selected.row && selected.column) {
              evnt.stopPropagation()
              evnt.preventDefault()
              this.handleEdit(selected.args, evnt)
            }
          }
        } else if (isContextMenu) {
          // 如果按下上下文键
          this._keyCtx = selected.row && selected.column && bodyCtxMenu.length
          clearTimeout(this.keyCtxTimeout)
          this.keyCtxTimeout = setTimeout(() => {
            this._keyCtx = false
          }, 1000)
        } else if (isEnter && !hasAltKey && keyboardConfig && keyboardOpts.isEnter && (selected.row || actived.row || (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow))) {
          const { isLastEnterAppendRow, beforeEnterMethod, enterMethod } = keyboardOpts
          // 退出选中
          if (hasCtrlKey) {
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              const params = actived.args
              this.handleClearEdit(evnt)
              // 如果配置了选中功能，则为选中状态
              if (mouseConfig && mouseOpts.selected) {
                this.$nextTick(() => this.handleSelected(params, evnt))
              }
            }
          } else {
            // 如果是激活状态，退则出到上一行/下一行
            if (selected.row || actived.row) {
              const activeParams = selected.row ? selected.args : actived.args
              if (hasShiftKey) {
                if (keyboardOpts.enterToTab) {
                  this.moveTabSelected(activeParams, hasShiftKey, evnt)
                } else {
                  this.moveSelected(activeParams, isLeftArrow, true, isRightArrow, false, evnt)
                }
              } else {
                if (keyboardOpts.enterToTab) {
                  this.moveTabSelected(activeParams, hasShiftKey, evnt)
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
                    this.moveSelected(activeParams, isLeftArrow, false, isRightArrow, true, evnt)
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
                const params = { $table: this, row: targetRow }
                this.setTreeExpand(currentRow, true)
                  .then(() => this.scrollToRow(targetRow))
                  .then(() => this.triggerCurrentRowEvent(evnt, params))
              }
            }
          }
        } else if (operArrow && keyboardConfig && keyboardOpts.isArrow) {
          if (!isEditStatus) {
            // 如果按下了方向键
            if (selected.row && selected.column) {
              this.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt)
            } else if ((isUpArrow || isDwArrow) && (rowOpts.isCurrent || highlightCurrentRow)) {
              // 当前行按键上下移动
              this.moveCurrentRow(isUpArrow, isDwArrow, evnt)
            }
          }
        } else if (isTab && keyboardConfig && keyboardOpts.isTab) {
          // 如果按下了 Tab 键切换
          if (selected.row || selected.column) {
            this.moveTabSelected(selected.args, hasShiftKey, evnt)
          } else if (actived.row || actived.column) {
            this.moveTabSelected(actived.args, hasShiftKey, evnt)
          }
        } else if (keyboardConfig && keyboardOpts.isDel && hasDeleteKey && isEnableConf(editConfig) && (selected.row || selected.column)) {
          // 如果是删除键
          if (!isEditStatus) {
            const { delMethod } = keyboardOpts
            const params = {
              row: selected.row,
              rowIndex: this.getRowIndex(selected.row),
              column: selected.column,
              columnIndex: this.getColumnIndex(selected.column),
              $table: this,
              $grid: this.$xegrid
            }
            // 是否被禁用
            if (!beforeEditMethod || beforeEditMethod(params)) {
              if (delMethod) {
                delMethod(params)
              } else {
                setCellValue(selected.row, selected.column, null)
              }
              // 如果按下 del 键，更新表尾数据
              this.updateFooter()
              this.emitEvent('cell-delete-value', params, evnt)
            }
          }
        } else if (hasBackspaceKey && keyboardConfig && keyboardOpts.isBack && isEnableConf(editConfig) && (selected.row || selected.column)) {
          if (!isEditStatus) {
            const { editMode, backMethod } = keyboardOpts
            // 如果是删除键
            if (keyboardOpts.isDel && isEnableConf(editConfig) && (selected.row || selected.column)) {
              const params = {
                row: selected.row,
                rowIndex: this.getRowIndex(selected.row),
                column: selected.column,
                columnIndex: this.getColumnIndex(selected.column),
                $table: this,
                $grid: this.$xegrid
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
                  this.handleEdit(selected.args, evnt)
                }
                this.emitEvent('cell-backspace-value', params, evnt)
              }
            }
          }
        } else if (hasBackspaceKey && keyboardConfig && treeConfig && keyboardOpts.isBack && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
          // 如果树形表格回退键关闭当前行返回父节点
          const { parent: parentRow } = XEUtils.findTree(this.afterTreeFullData, item => item === currentRow, { children: childrenField })
          if (parentRow) {
            evnt.preventDefault()
            const params = {
              row: parentRow,
              rowIndex: this.getRowIndex(parentRow),
              $rowIndex: this.getVMRowIndex(parentRow),
              $table: this,
              $grid: this.$xegrid
            }
            this.setTreeExpand(parentRow, false)
              .then(() => this.scrollToRow(parentRow))
              .then(() => this.triggerCurrentRowEvent(evnt, params))
          }
        } else if (keyboardConfig && keyboardOpts.isEdit && !hasCtrlKey && !hasMetaKey && (isSpacebar || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222))) {
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
              rowIndex: this.getRowIndex(selected.row),
              column: selected.column,
              columnIndex: this.getColumnIndex(selected.column),
              $table: this,
              $grid: this.$xegrid
            }
            if (!beforeEditMethod || beforeEditMethod(params)) {
              if (editMethod) {
                editMethod(params)
              } else {
                setCellValue(selected.row, selected.column, null)
                this.handleEdit(selected.args, evnt)
              }
            }
          }
        }
        this.emitEvent('keydown', {}, evnt)
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
  handleTargetEnterEvent (isClear: any) {
    const $tooltip = this.$refs.tooltip
    clearTimeout(this.tooltipTimeout)
    if (isClear) {
      this.closeTooltip()
    } else {
      if ($tooltip) {
        $tooltip.setActived(true)
      }
    }
  },
  handleTargetLeaveEvent () {
    const tooltipOpts = this.tooltipOpts
    let $tooltip = this.$refs.tooltip
    if ($tooltip) {
      $tooltip.setActived(false)
    }
    if (tooltipOpts.enterable) {
      this.tooltipTimeout = setTimeout(() => {
        $tooltip = this.$refs.tooltip
        if ($tooltip && !$tooltip.isActived()) {
          this.closeTooltip()
        }
      }, tooltipOpts.leaveDelay)
    } else {
      this.closeTooltip()
    }
  },
  triggerHeaderTitleEvent (evnt: any, iconParams: any, params: any) {
    const tipContent = iconParams.content || iconParams.message
    if (tipContent) {
      const { $refs, tooltipStore } = this
      const { column } = params
      const content = getFuncText(tipContent)
      this.handleTargetEnterEvent(true)
      tooltipStore.row = null
      tooltipStore.column = column
      tooltipStore.visible = true
      tooltipStore.currOpts = iconParams
      this.$nextTick(() => {
        const $tooltip = $refs.tooltip
        if ($tooltip) {
          $tooltip.open(evnt.currentTarget, content)
        }
      })
    }
  },
  /**
   * 触发表头 tooltip 事件
   */
  triggerHeaderTooltipEvent (evnt: any, params: any) {
    const { tooltipStore } = this
    const { column } = params
    const titleElem = evnt.currentTarget
    this.handleTargetEnterEvent(tooltipStore.column !== column || tooltipStore.row)
    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, titleElem, titleElem, null, params)
    }
  },
  /**
   * 触发单元格 tooltip 事件
   */
  triggerBodyTooltipEvent (evnt: any, params: any) {
    const { editConfig, editOpts, editStore, tooltipStore } = this
    const { actived } = editStore
    const { row, column } = params
    const cell = evnt.currentTarget
    this.handleTargetEnterEvent(tooltipStore.column !== column || tooltipStore.row !== row)
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
      let overflowElem
      let tipElem
      if (column.treeNode) {
        overflowElem = cell.querySelector('.vxe-tree-cell')
        if (column.type === 'html') {
          tipElem = cell.querySelector('.vxe-cell--html')
        }
      } else {
        tipElem = cell.querySelector(column.type === 'html' ? '.vxe-cell--html' : '.vxe-cell--label')
      }
      this.handleTooltip(evnt, cell, overflowElem || cell.children[0], tipElem, params)
    }
  },
  /**
   * 触发表尾 tooltip 事件
   */
  triggerFooterTooltipEvent (evnt: any, params: any) {
    const { column } = params
    const { tooltipStore } = this
    const cell = evnt.currentTarget
    this.handleTargetEnterEvent(true)
    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, cell, cell.querySelector('.vxe-cell--item') || cell.children[0], null, params)
    }
  },
  /**
   * 处理显示 tooltip
   * @param {Event} evnt 事件
   * @param {ColumnInfo} column 列配置
   * @param {Row} row 行对象
   */
  handleTooltip (evnt: any, cell: any, overflowElem: any, tipElem: any, params: any) {
    params.cell = cell
    const { $refs, tooltipOpts, tooltipStore } = this
    const { column, row } = params
    const { showAll, enabled, contentMethod } = tooltipOpts
    const customContent = contentMethod ? contentMethod(params) : null
    const useCustom = contentMethod && !XEUtils.eqNull(customContent)
    const content = useCustom ? customContent : (column.type === 'html' ? overflowElem.innerText : overflowElem.textContent).trim()
    const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth
    if (content && (showAll || enabled || useCustom || isCellOverflow)) {
      Object.assign(tooltipStore, {
        row,
        column,
        visible: true,
        currOpts: {}
      })
      this.$nextTick(() => {
        const $tooltip = $refs.tooltip
        if ($tooltip) {
          $tooltip.open(isCellOverflow ? overflowElem : (tipElem || overflowElem), formatText(content))
        }
      })
    }
    return this.$nextTick()
  },
  openTooltip (target: any, content: any) {
    const { $refs } = this
    const commTip = $refs.commTip
    if (commTip) {
      return commTip.open(target, content)
    }
    return this.$nextTick()
  },
  /**
   * 关闭 tooltip
   */
  closeTooltip () {
    const { $refs, tooltipStore } = this
    const tooltip = $refs.tooltip
    const commTip = $refs.commTip
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
    const { treeConfig, treeIndeterminateMaps, fullDataRowIdData } = this
    if (treeConfig) {
      const fullRest: any[] = []
      const defRest: any[] = []
      XEUtils.each(treeIndeterminateMaps, (item, rowid) => {
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
  /**
   * 处理默认勾选
   */
  handleDefaultSelectionChecked () {
    const { fullDataRowIdData, checkboxOpts } = this
    const { checkAll, checkRowKeys } = checkboxOpts
    if (checkAll) {
      this.handleCheckedAllCheckboxRow(true, true)
    } else if (checkRowKeys) {
      const defSelection: any[] = []
      checkRowKeys.forEach((rowid: any) => {
        if (fullDataRowIdData[rowid]) {
          defSelection.push(fullDataRowIdData[rowid].row)
        }
      })
      this.handleCheckedCheckboxRow(defSelection, true, true)
    }
  },
  handleCheckedCheckboxRow (rows: any, value: any, isForce: any) {
    const $xeTable = this

    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    $xeTable.handleBatchSelectRows(rows, !!value, isForce)
    $xeTable.checkSelectionStatus()
    return this.$nextTick()
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
    return $xeTable.handleCheckedCheckboxRow(rows, checked, true)
  },
  setCheckboxRowKey (keys: any, checked: boolean) {
    const $xeTable = this
    const internalData = $xeTable

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
    return $xeTable.handleCheckedCheckboxRow(rows, checked, true)
  },
  isCheckedByCheckboxRow (row: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { selectCheckboxMaps } = reactData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField } = checkboxOpts
    if (checkField) {
      return XEUtils.get(row, checkField)
    }
    return !!selectCheckboxMaps[getRowid($xeTable, row)]
  },
  isCheckedByCheckboxRowKey (rowid: string) {
    const $xeTable = this
    const reactData = $xeTable
    const internalData = $xeTable

    const { selectCheckboxMaps } = reactData
    const { fullAllDataRowIdData } = internalData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField } = checkboxOpts
    if (checkField) {
      const rowRest = fullAllDataRowIdData[rowid]
      if (rowRest) {
        return XEUtils.get(rowRest.row, checkField)
      }
      return false
    }
    return !!selectCheckboxMaps[rowid]
  },
  isIndeterminateByCheckboxRow (row: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { treeIndeterminateMaps } = reactData
    return !!treeIndeterminateMaps[getRowid($xeTable, row)] && !$xeTable.isCheckedByCheckboxRow(row)
  },
  isIndeterminateByCheckboxRowKey (rowid: string) {
    const $xeTable = this
    const reactData = $xeTable

    const { treeIndeterminateMaps } = reactData
    return !!treeIndeterminateMaps[rowid] && !$xeTable.isCheckedByCheckboxRowKey(rowid)
  },
  /**
   * 切换选中
   * 多选，行选中事件
   */
  handleBatchSelectRows (rows: any[], checked: boolean, isForce?: boolean) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable

    const { treeConfig } = props
    const { selectCheckboxMaps } = reactData
    const selectRowMaps = Object.assign({}, selectCheckboxMaps)
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, mapChildrenField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField, checkStrictly, checkMethod } = checkboxOpts
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
    if (checkField) {
      // 树结构
      if (treeConfig && !checkStrictly) {
        // 更新子节点状态
        XEUtils.eachTree(rows, (row) => {
          if (isForce || (!checkMethod || checkMethod({ row }))) {
            XEUtils.set(row, checkField, checked)
            if (indeterminateField) {
              XEUtils.set(row, indeterminateField, false)
            }
            $xeTable.handleCheckboxReserveRow(row, checked)
          }
        }, { children: transform ? mapChildrenField : childrenField })
        reactData.selectCheckboxMaps = selectRowMaps
        return
      } else {
        // 列表
        rows.forEach(row => {
          if (isForce || (!checkMethod || checkMethod({ row }))) {
            XEUtils.set(row, checkField, checked)
            $xeTable.handleCheckboxReserveRow(row, checked)
          }
        })
      }
      reactData.selectCheckboxMaps = selectRowMaps
      return
    }

    // 树结构
    if (treeConfig && !checkStrictly) {
      // 更新子节点状态
      XEUtils.eachTree(rows, (row) => {
        const rowid = getRowid($xeTable, row)
        if (isForce || (!checkMethod || checkMethod({ row }))) {
          if (checked) {
            selectRowMaps[rowid] = row
          } else {
            if (selectRowMaps[rowid]) {
              delete selectRowMaps[rowid]
            }
          }
          $xeTable.handleCheckboxReserveRow(row, checked)
        }
      }, { children: transform ? mapChildrenField : childrenField })
      reactData.selectCheckboxMaps = selectRowMaps
      return
    }

    // 列表
    rows.forEach(row => {
      const rowid = getRowid($xeTable, row)
      if (isForce || (!checkMethod || checkMethod({ row }))) {
        if (checked) {
          if (!selectRowMaps[rowid]) {
            selectRowMaps[rowid] = row
          }
        } else {
          if (selectRowMaps[rowid]) {
            delete selectRowMaps[rowid]
          }
        }
        $xeTable.handleCheckboxReserveRow(row, checked)
      }
    })
    reactData.selectCheckboxMaps = selectRowMaps
  },
  /**
   * 即将移除
   * @deprecated
   */
  handleSelectRow ({ row }: any, checked: boolean, isForce?: boolean) {
    const $xeTable = this

    $xeTable.handleBatchSelectRows([row], checked, isForce)
  },
  handleToggleCheckRowEvent (evnt: any, params: any) {
    const { selectCheckboxMaps, checkboxOpts } = this
    const { checkField, trigger } = checkboxOpts
    const { row } = params
    if (trigger === 'manual') {
      return
    }
    let checked = false
    if (checkField) {
      checked = !XEUtils.get(row, checkField)
    } else {
      checked = !selectCheckboxMaps[getRowid(this, row)]
    }
    if (evnt) {
      this.triggerCheckRowEvent(evnt, params, checked)
    } else {
      this.handleSelectRow(params, checked)
      this.checkSelectionStatus()
    }
  },
  triggerCheckRowEvent (evnt: any, params: any, checked: any) {
    const { checkboxOpts, afterFullData } = this
    const { checkMethod, trigger } = checkboxOpts
    const { row } = params
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    if (checkboxOpts.isShiftKey && evnt.shiftKey && !this.treeConfig) {
      const checkboxRecords = this.getCheckboxRecords()
      if (checkboxRecords.length) {
        const firstRow = checkboxRecords[0]
        const _rowIndex = this.getVTRowIndex(row)
        const _firstRowIndex = this.getVTRowIndex(firstRow)
        if (_rowIndex !== _firstRowIndex) {
          this.setAllCheckboxRow(false)
          const rangeRows = _rowIndex < _firstRowIndex ? afterFullData.slice(_rowIndex, _firstRowIndex + 1) : afterFullData.slice(_firstRowIndex, _rowIndex + 1)
          this.handleCheckedCheckboxRow(rangeRows, true, false)
          this.emitEvent('checkbox-range-select', Object.assign({ rangeRecords: rangeRows }, params), evnt)
          return
        }
      }
    }
    if (!checkMethod || checkMethod({ row })) {
      this.handleSelectRow(params, checked)
      this.checkSelectionStatus()
      this.emitEvent('checkbox-change', Object.assign({
        records: this.getCheckboxRecords(),
        reserves: this.getCheckboxReserveRecords(),
        indeterminates: this.getCheckboxIndeterminateRecords(),
        checked
      }, params), evnt)
    }
  },
  /**
   * 多选，切换某一行的选中状态
   */
  toggleCheckboxRow (row: any) {
    const $xeTable = this

    const { selectCheckboxMaps, checkboxOpts } = this
    const { checkField } = checkboxOpts
    const checked = checkField ? !XEUtils.get(row, checkField) : !selectCheckboxMaps[getRowid($xeTable, row)]
    $xeTable.handleBatchSelectRows([row], checked, true)
    $xeTable.checkSelectionStatus()
    return $xeTable.$nextTick()
  },
  handleCheckedAllCheckboxRow (checked: any, isForce: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { afterFullData, treeConfig, treeOpts, selectCheckboxMaps, checkboxReserveRowMap, checkboxOpts, afterFullRowMaps } = this
    const { checkField, reserve, checkStrictly, checkMethod } = checkboxOpts
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
    const childrenField = treeOpts.children || treeOpts.childrenField
    const selectRowMaps: any = {}

    // 疑惑！
    if (!treeConfig) {
      XEUtils.each(selectCheckboxMaps, (row, rowid) => {
        if (!afterFullRowMaps[rowid]) {
          selectRowMaps[rowid] = row
        }
      })
    }
    // 疑惑！

    if (checkStrictly) {
      this.isAllSelected = checked
    } else {
      /**
       * 绑定属性方式（高性能，有污染）
       * 必须在行数据存在对应的属性，否则将不响应
       */
      if (checkField) {
        const checkValFn = (row: any) => {
          if (isForce || (!checkMethod || checkMethod({ row }))) {
            if (checked) {
              selectRowMaps[getRowid(this, row)] = row
            }
            XEUtils.set(row, checkField, checked)
          }
          if (treeConfig && indeterminateField) {
            XEUtils.set(row, indeterminateField, false)
          }
        }
        // 如果存在选中方法
        // 如果方法成立，则更新值，否则忽略该数据
        if (treeConfig) {
          XEUtils.eachTree(afterFullData, checkValFn, { children: childrenField })
        } else {
          afterFullData.forEach(checkValFn)
        }
      } else {
        /**
         * 默认方式（低性能，无污染）
         * 无需任何属性，直接绑定
         */
        if (treeConfig) {
          if (checked) {
            /**
             * 如果是树勾选
             * 如果方法成立，则添加到临时集合中
             */
            XEUtils.eachTree(afterFullData, (row) => {
              if (isForce || (!checkMethod || checkMethod({ row }))) {
                selectRowMaps[getRowid(this, row)] = row
              }
            }, { children: childrenField })
          } else {
            /**
             * 如果是树取消
             * 如果方法成立，则不添加到临时集合中
             */
            if (!isForce && checkMethod) {
              XEUtils.eachTree(afterFullData, (row) => {
                const rowid = getRowid(this, row)
                if (checkMethod({ row }) ? 0 : selectCheckboxMaps[rowid]) {
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
              afterFullData.forEach((row: any) => {
                const rowid = getRowid(this, row)
                if (selectCheckboxMaps[rowid] || checkMethod({ row })) {
                  selectRowMaps[rowid] = row
                }
              })
            } else {
              afterFullData.forEach((row: any) => {
                selectRowMaps[getRowid(this, row)] = row
              })
            }
          } else {
            /**
             * 如果是行取消
             * 如果方法成立，则不添加到临时集合中；如果方法不成立则判断当前是否已勾选，如果已被勾选则添加到新集合中
             * 如果不存在选中方法，无需处理，临时集合默认为空
             */
            if (!isForce && checkMethod) {
              afterFullData.forEach((row: any) => {
                const rowid = getRowid(this, row)
                if (checkMethod({ row }) ? 0 : selectCheckboxMaps[rowid]) {
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
          afterFullData.forEach((row: any) => this.handleCheckboxReserveRow(row, false))
        }
      }
      this.selectCheckboxMaps = checkField ? {} : selectRowMaps
    }

    reactData.isAllSelected = checked
    reactData.isIndeterminate = false
    this.treeIndeterminateMaps = {}
    this.treeIndeterminateRowMaps = {}
    this.checkSelectionStatus()
    return this.$nextTick()
  },
  /**
   * 用于多选行，设置所有行的选中状态
   * @param {Boolean} value 是否选中
   */
  setAllCheckboxRow (value: any) {
    return this.handleCheckedAllCheckboxRow(value, true)
  },
  updateCheckboxStatus () {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable
    const internalData = $xeTable

    const { treeConfig } = props
    const { selectCheckboxMaps, treeIndeterminateMaps } = reactData
    const selectRowMaps = Object.assign({}, selectCheckboxMaps)
    const halfRowMaps = Object.assign({}, treeIndeterminateMaps)
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, mapChildrenField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField, checkStrictly, checkMethod } = checkboxOpts
    const { afterTreeFullData } = internalData
    if (checkStrictly) {
      return
    }
    // 树结构
    if (treeConfig) {
      const childRowMaps: Record<string, number> = {}
      const childRowList: any[][] = []
      XEUtils.eachTree(afterTreeFullData, (row: any) => {
        const rowid = getRowid($xeTable, row)
        const childList = row[transform ? mapChildrenField : childrenField]
        if (childList && childList.length && !childRowMaps[rowid]) {
          childRowMaps[rowid] = 1
          childRowList.unshift([row, rowid, childList])
        }
      }, { children: transform ? mapChildrenField : childrenField })
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
                const childRowid = getRowid($xeTable, item)
                const isSelect = checkField ? XEUtils.get(item, checkField) : selectRowMaps[childRowid]
                if (checkMethod({ row: item })) {
                  if (isSelect) {
                    sLen++
                  } else if (halfRowMaps[childRowid]) {
                    hLen++
                  }
                  vLen++
                } else {
                  if (isSelect) {
                    sLen++
                  } else if (halfRowMaps[childRowid]) {
                    hLen++
                  }
                }
              }
            : item => {
              const childRowid = getRowid($xeTable, item)
              const isSelect = checkField ? XEUtils.get(item, checkField) : selectRowMaps[childRowid]
              if (isSelect) {
                sLen++
              } else if (halfRowMaps[childRowid]) {
                hLen++
              }
              vLen++
            }
        )
        const isSelected = sLen >= vLen
        const halfSelect = !isSelected && (sLen >= 1 || hLen >= 1)
        if (checkField) {
          XEUtils.get(row, checkField, isSelected)
        }
        if (isSelected) {
          if (!checkField) {
            selectRowMaps[rowid] = row
          }
          if (halfRowMaps[rowid]) {
            delete halfRowMaps[rowid]
          }
        } else {
          if (!checkField) {
            if (selectRowMaps[rowid]) {
              delete selectRowMaps[rowid]
            }
          }
          if (halfSelect) {
            halfRowMaps[rowid] = row
          } else {
            if (halfRowMaps[rowid]) {
              delete halfRowMaps[rowid]
            }
          }
        }
      })
    }
    reactData.selectCheckboxMaps = selectRowMaps
    reactData.treeIndeterminateMaps = halfRowMaps
  },
  updateAllCheckboxStatus () {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable
    const internalData = $xeTable

    const { treeConfig } = props
    const { selectCheckboxMaps, treeIndeterminateMaps } = reactData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField, checkMethod } = checkboxOpts
    const { afterFullData, afterTreeFullData } = internalData

    let sLen = 0 // 已选
    let hLen = 0 // 半选
    let vLen = 0 // 有效行

    const rootList: any[] = (treeConfig ? afterTreeFullData : afterFullData)
    rootList.forEach(checkMethod
      ? row => {
        const childRowid = getRowid($xeTable, row)
        const selected = checkField ? XEUtils.get(row, checkField) : selectCheckboxMaps[childRowid]
        if (checkMethod({ row })) {
          if (selected) {
            sLen++
          } else if (treeIndeterminateMaps[childRowid]) {
            hLen++
          }
          vLen++
        } else {
          if (selected) {
            sLen++
          } else if (treeIndeterminateMaps[childRowid]) {
            hLen++
          }
        }
      }
      : row => {
        const childRowid = getRowid($xeTable, row)
        const selected = checkField ? XEUtils.get(row, checkField) : selectCheckboxMaps[childRowid]
        if (selected) {
          sLen++
        } else if (treeIndeterminateMaps[childRowid]) {
          hLen++
        }
        vLen++
      })

    const isSelected = sLen >= vLen
    const halfSelect = !isSelected && (sLen >= 1 || hLen >= 1)

    reactData.isAllSelected = isSelected
    reactData.isIndeterminate = halfSelect
  },
  checkSelectionStatus () {
    const $xeTable = this

    $xeTable.updateCheckboxStatus()
    $xeTable.updateAllCheckboxStatus()
  },
  // 还原展开、选中等相关状态
  handleReserveStatus () {
    const $xeTable = this

    const { expandColumn, treeOpts, treeConfig, fullDataRowIdData, fullAllDataRowIdData, currentRow, selectRadioRow, radioReserveRow, radioOpts, checkboxOpts, selectCheckboxMaps, rowExpandedMaps, treeExpandedMaps, expandOpts } = this
    // 单选框
    if (selectRadioRow && !fullAllDataRowIdData[getRowid($xeTable, selectRadioRow)]) {
      this.selectRadioRow = null // 刷新单选行状态
    }
    // 还原保留选中状态
    if (radioOpts.reserve && radioReserveRow) {
      const rowid = getRowid(this, radioReserveRow)
      if (fullDataRowIdData[rowid]) {
        this.handleCheckedRadioRow(fullDataRowIdData[rowid].row, true)
      }
    }
    // 复选框
    this.selectCheckboxMaps = getRecoverRowMaps(this, selectCheckboxMaps) // 刷新多选行状态
    // 还原保留选中状态
    if (checkboxOpts.reserve) {
      this.handleCheckedCheckboxRow(handleReserveRow(this, this.checkboxReserveRowMap), true, true)
    }
    if (currentRow && !this.fullAllDataRowIdData[getRowid($xeTable, currentRow)]) {
      this.currentRow = null // 刷新当前行状态
    }
    // 行展开
    this.rowExpandedMaps = expandColumn ? getRecoverRowMaps(this, rowExpandedMaps) : [] // 刷新行展开状态
    // 还原保留状态
    if (expandColumn && expandOpts.reserve) {
      this.setRowExpand(handleReserveRow(this, this.rowExpandedReserveRowMap), true)
    }
    // 树展开
    this.treeExpandedMaps = treeConfig ? getRecoverRowMaps(this, treeExpandedMaps) : [] // 刷新树展开状态
    if (treeConfig && treeOpts.reserve) {
      this.setTreeExpand(handleReserveRow(this, this.treeExpandedReserveRowMap), true)
    }
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
  handleRadioReserveRow (row: any) {
    const { radioOpts } = this
    if (radioOpts.reserve) {
      this.radioReserveRow = row
    }
  },
  /**
   * 获取复选框保留选中的行
   */
  getCheckboxReserveRecords (isFull: any) {
    const { fullDataRowIdData, afterFullData, checkboxReserveRowMap, checkboxOpts, treeConfig, treeOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const reserveSelection: any[] = []
    if (checkboxOpts.reserve) {
      const afterFullIdMaps: any = {}
      if (treeConfig) {
        XEUtils.eachTree(afterFullData, row => {
          afterFullIdMaps[getRowid(this, row)] = 1
        }, { children: childrenField })
      } else {
        afterFullData.forEach((row: any) => {
          afterFullIdMaps[getRowid(this, row)] = 1
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
    this.handleCheckedAllCheckboxRow(value)
    if (evnt) {
      this.emitEvent('checkbox-all', { records: this.getCheckboxRecords(), reserves: this.getCheckboxReserveRecords(), indeterminates: this.getCheckboxIndeterminateRecords(), checked: value }, evnt)
    }
  },
  /**
   * 多选，选中所有事件
   */
  triggerCheckAllEvent (evnt: any, value: any) {
    const { checkboxOpts } = this
    const { trigger } = checkboxOpts
    if (trigger === 'manual') {
      return
    }
    if (evnt) {
      evnt.stopPropagation()
    }
    this.handleCheckAllEvent(evnt, value)
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
    const { tableFullData, treeConfig, treeOpts, checkboxOpts } = this
    const { checkField, reserve } = checkboxOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
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
      tableFullData.forEach((row: any) => this.handleCheckboxReserveRow(row, false))
    }
    this.isAllSelected = false
    this.isIndeterminate = false
    this.selectCheckboxMaps = {}
    this.treeIndeterminateMaps = {}
    return this.$nextTick()
  },
  /**
   * 处理单选框默认勾选
   */
  handleDefaultRadioChecked () {
    const { radioOpts, fullDataRowIdData } = this
    const { checkRowKey: rowid, reserve } = radioOpts
    if (rowid) {
      if (fullDataRowIdData[rowid]) {
        this.handleCheckedRadioRow(fullDataRowIdData[rowid].row, true)
      }
      if (reserve) {
        const rowkey = getRowkey(this)
        this.radioReserveRow = { [rowkey]: rowid }
      }
    }
  },
  /**
   * 单选，行选中事件
   */
  triggerRadioRowEvent (evnt: Event, params: {
    row: any
  }) {
    const { selectRadioRow: oldValue, radioOpts } = this
    const { row } = params
    const { trigger } = radioOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    let newValue = row
    let isChange = oldValue !== newValue
    if (isChange) {
      this.handleCheckedRadioRow(newValue)
    } else if (!radioOpts.strict) {
      isChange = oldValue === newValue
      if (isChange) {
        newValue = null
        this.clearRadioRow()
      }
    }
    if (isChange) {
      this.emitEvent('radio-change', { oldValue, newValue, ...params }, evnt)
    }
  },
  triggerCurrentColumnEvent (evnt: Event, params: {
    column: VxeTableDefines.ColumnInfo
  }) {
    const $xeTable = this

    const columnOpts = $xeTable.computeColumnOpts
    const { currentMethod } = columnOpts
    const { column } = params
    if (!currentMethod || currentMethod({ column })) {
      $xeTable.setCurrentColumn(column)
    }
  },
  triggerCurrentRowEvent (evnt: Event, params: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { currentRow: oldValue } = reactData
    const rowOpts = $xeTable.computeRowOpts
    const { currentMethod } = rowOpts
    const { row: newValue } = params
    const isChange = oldValue !== newValue
    if (!currentMethod || currentMethod({ row: newValue })) {
      $xeTable.setCurrentRow(newValue)
      if (isChange) {
        $xeTable.dispatchEvent('current-change', { oldValue, newValue, ...params }, evnt)
      }
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
  handleCheckedRadioRow (row: any, isForce?: boolean) {
    const { radioOpts } = this
    const { checkMethod } = radioOpts
    if (row && (isForce || (!checkMethod || checkMethod({ row })))) {
      this.selectRadioRow = row
      this.handleRadioReserveRow(row)
    }
    return this.$nextTick()
  },
  /**
   * 用于单选行，设置某一行为选中状态
   * @param {Row} row 行对象
   */
  setRadioRow (row: any) {
    const $xeTable = this

    return $xeTable.handleCheckedRadioRow(row, true)
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
      return $xeTable.handleCheckedRadioRow(rowRest.row, true)
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
      XEUtils.arrayEach($el.querySelectorAll(`[rowid="${rowid}"]`), elem => addClass(elem, 'row--hover'))
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
  triggerHeaderCellClickEvent (evnt: any, params: any) {
    const { _lastResizeTime, sortOpts } = this
    const { column } = params
    const cell = evnt.currentTarget
    const triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300
    const triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
    const triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
    if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
      this.triggerSortEvent(evnt, column, getNextSortOrder(this, column))
    }
    this.emitEvent('header-cell-click', Object.assign({ triggerResizable, triggerSort, triggerFilter, cell }, params), evnt)
    if (this.columnOpts.isCurrent || this.highlightCurrentColumn) {
      this.triggerCurrentColumnEvent(evnt, params)
    }
    return this.$nextTick()
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
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      // this.clearCurrentRow()
      this.clearCurrentColumn()
      this.currentColumn = column
    }
    return this.$nextTick()
  },
  /**
   * 用于当前列，手动清空当前高亮的状态
   */
  clearCurrentColumn () {
    this.currentColumn = null
    return this.$nextTick()
  },
  checkValidate (type: any) {
    if (this.triggerValidate) {
      return this.triggerValidate(type)
    }
    return this.$nextTick()
  },
  /**
   * 当单元格发生改变时
   * 如果存在规则，则校验
   */
  handleChangeCell (evnt: Event, params: any) {
    this.checkValidate('blur')
      .catch((e: any) => e)
      .then(() => {
        this.handleEdit(params, evnt)
          .then(() => this.checkValidate('change'))
          .catch((e: any) => e)
      })
  },
  /**
   * 列点击事件
   * 如果是单击模式，则激活为编辑状态
   * 如果是双击模式，则单击后选中状态
   */
  triggerCellClickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams) {
    const $xeTable = this

    const { highlightCurrentRow, editStore, radioOpts, expandOpts, treeOpts, keyboardOpts, editConfig, editOpts, checkboxOpts, rowOpts } = this
    const { actived, focused } = editStore
    const { row, column } = params
    const { type, treeNode } = column
    const isRadioType = type === 'radio'
    const isCheckboxType = type === 'checkbox'
    const isExpandType = type === 'expand'
    const cell = evnt.currentTarget as HTMLDivElement
    const triggerRadio = isRadioType && getEventTargetNode(evnt, cell, 'vxe-cell--radio').flag
    const triggerCheckbox = isCheckboxType && getEventTargetNode(evnt, cell, 'vxe-cell--checkbox').flag
    const triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, 'vxe-tree--btn-wrapper').flag
    const triggerExpandNode = isExpandType && getEventTargetNode(evnt, cell, 'vxe-table--expanded').flag
    params = Object.assign({ cell, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode }, params)
    if (!triggerCheckbox && !triggerRadio) {
      // 如果是展开行
      if (!triggerExpandNode && (expandOpts.trigger === 'row' || (isExpandType && expandOpts.trigger === 'cell'))) {
        this.triggerRowExpandEvent(evnt, params)
      }
      // 如果是树形表格
      if ((treeOpts.trigger === 'row' || (treeNode && treeOpts.trigger === 'cell'))) {
        this.triggerTreeExpandEvent(evnt, params)
      }
    }
    // 如果点击了树节点
    if (!triggerTreeNode) {
      if (!triggerExpandNode) {
        // 如果是高亮行
        if (rowOpts.isCurrent || highlightCurrentRow) {
          if (!triggerCheckbox && !triggerRadio) {
            this.triggerCurrentRowEvent(evnt, params)
          }
        }
        // 如果是单选框
        if (!triggerRadio && (radioOpts.trigger === 'row' || (isRadioType && radioOpts.trigger === 'cell'))) {
          this.triggerRadioRowEvent(evnt, params)
        }
        // 如果是复选框
        if (!triggerCheckbox && (checkboxOpts.trigger === 'row' || (isCheckboxType && checkboxOpts.trigger === 'cell'))) {
          this.handleToggleCheckRowEvent(evnt, params)
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
            this.handleChangeCell(evnt, params)
          }
        } else if (!actived.args || row !== actived.row || column !== actived.column) {
          if (editOpts.trigger === 'click') {
            this.handleChangeCell(evnt, params)
          } else if (editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row' && actived.row === row) {
              this.handleChangeCell(evnt, params)
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
    this.emitEvent('cell-click', params, evnt)
  },
  /**
   * 列双击点击事件
   * 如果是双击模式，则激活为编辑状态
   */
  triggerCellDblclickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams) {
    const { editStore, editConfig, editOpts } = this
    const { actived } = editStore
    const cell = evnt.currentTarget as HTMLDivElement
    params = Object.assign({ cell }, params)
    if (isEnableConf(editConfig) && editOpts.trigger === 'dblclick') {
      if (!actived.args || evnt.currentTarget !== actived.args.cell) {
        if (editOpts.mode === 'row') {
          this.checkValidate('blur')
            .catch((e: any) => e)
            .then(() => {
              this.handleEdit(params, evnt)
                .then(() => this.checkValidate('change'))
                .catch((e: any) => e)
            })
        } else if (editOpts.mode === 'cell') {
          this.handleEdit(params, evnt)
            .then(() => this.checkValidate('change'))
            .catch((e: any) => e)
        }
      }
    }
    this.emitEvent('cell-dblclick', params, evnt)
  },
  handleDefaultSort () {
    const { sortConfig, sortOpts } = this
    let { defaultSort } = sortOpts
    if (defaultSort) {
      if (!XEUtils.isArray(defaultSort)) {
        defaultSort = [defaultSort]
      }
      if (defaultSort.length) {
        (sortConfig.multiple ? defaultSort : defaultSort.slice(0, 1)).forEach((item: any, index: any) => {
          const { field, order } = item
          if (field && order) {
            const column = this.getColumnByField(field)
            if (column && column.sortable) {
              column.order = order
              column.sortTime = Date.now() + index
            }
          }
        })
        if (!sortOpts.remote) {
          this.handleTableData(true).then(this.updateStyle)
        }
      }
    }
  },
  handleColumnSortEvent (evnt: any, column: any) {
    const $xeTable = this
    const props = $xeTable

    const { mouseConfig } = props
    const mouseOpts = $xeTable.computeMouseOpts
    const { field, sortable } = column
    if (sortable) {
      const params = { $table: $xeTable, $event: evnt, column, field, property: field, order: column.order, sortList: $xeTable.getSortColumns(), sortTime: column.sortTime }
      if (mouseConfig && mouseOpts.area && $xeTable.handleSortEvent) {
        $xeTable.handleSortEvent(evnt, params)
      }
      $xeTable.dispatchEvent('sort-change', params, evnt)
    }
  },
  /**
   * 点击排序事件
   */
  triggerSortEvent (evnt: any, column: any, order: any) {
    const $xeTable = this

    const sortOpts = $xeTable.computeSortOpts
    const { field, sortable, remoteSort } = column
    if (sortable || remoteSort) {
      if (!order || column.order === order) {
        $xeTable.clearSort(sortOpts.multiple ? column : null)
      } else {
        $xeTable.sort({ field, order })
      }
      $xeTable.handleColumnSortEvent(evnt, column)
    }
  },
  /**
   * 表头单元格按下事件
   */
  triggerHeaderCellMousedownEvent (evnt: any, params: any) {
    const $xeTable = this
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
    const $xeTable = this

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
    const triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, 'vxe-tree--btn-wrapper').flag
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
  handleRowDragDragendEvent (evnt: DragEvent) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable
    const internalData = $xeTable

    const { treeConfig, dragConfig } = props
    const rowDragOpts = $xeTable.computeRowDragOpts
    const { fullAllDataRowIdData, prevDragToChild } = internalData
    const { isPeerDrag, isCrossDrag, isSelfToChildDrag, dragEndMethod } = rowDragOpts
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, rowField, mapChildrenField, parentField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const { dragRow } = reactData
    const { afterFullData, tableFullData, prevDragRow, prevDragPos } = internalData
    const dEndMethod = dragEndMethod || (dragConfig ? dragConfig.dragEndMethod : null)
    const dragOffsetIndex = prevDragPos === 'bottom' ? 1 : 0
    if (prevDragRow && dragRow) {
      // 判断是否有拖动
      if (prevDragRow !== dragRow) {
        Promise.resolve(
          dEndMethod
            ? dEndMethod({
              oldRow: dragRow,
              newRow: prevDragRow,
              dragPos: prevDragPos as any,
              dragToChild: !!prevDragToChild,
              offsetIndex: dragOffsetIndex
            })
            : true
        ).then((status) => {
          if (!status) {
            return
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
                      return
                    }
                  } else {
                    if (!isCrossDrag) {
                      return
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
                        return
                      }
                    }
                  }
                } else if (oldLevel) {
                  // 子到根

                  if (!isCrossDrag) {
                    return
                  }
                } else if (newLevel) {
                  // 根到子

                  if (!isCrossDrag) {
                    return
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
                      return
                    }
                  }
                } else {
                  // 根到根
                }

                const fullList = XEUtils.toTreeArray(internalData.afterTreeFullData, { children: childrenField })

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
                dragRow[parentField] = prevDragToChild ? prevDragRow[rowField] : prevDragRow[parentField]

                internalData.tableFullTreeData = XEUtils.toArrayTree(fullList, {
                  key: treeOpts.rowField,
                  parentKey: treeOpts.parentField,
                  children: childrenField,
                  mapChildren: treeOpts.mapChildrenField
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
          $xeTable.cacheRowMap()
          updateScrollYStatus($xeTable)
          if (!(treeConfig && transform)) {
            $xeTable.updateAfterDataIndex()
          }
          $xeTable.checkSelectionStatus()
          if (reactData.scrollYLoad) {
            $xeTable.updateScrollYSpace()
          }
          $xeTable.$nextTick().then(() => {
            $xeTable.updateCellAreas()
            $xeTable.recalculate()
          })

          $xeTable.dispatchEvent('row-dragend', {
            oldRow: dragRow,
            newRow: prevDragRow,
            dragPos: prevDragPos,
            dragToChild: !!prevDragToChild,
            offsetIndex: dragOffsetIndex,
            _index: {
              newIndex: nafIndex,
              oldIndex: oafIndex
            }
          }, evnt)
        }).catch(() => {
        })
      }
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
    const { transform, parentField } = treeOpts
    const rowDragOpts = $xeTable.computeRowDragOpts
    const { isPeerDrag, isCrossDrag, isToChildDrag } = rowDragOpts
    if (!dragRow) {
      evnt.preventDefault()
      return
    }
    const hasCtrlKey = evnt.ctrlKey
    const trEl = evnt.currentTarget as HTMLElement
    const rowid = trEl.getAttribute('rowid') || ''
    const rest = fullAllDataRowIdData[rowid]
    if (rest) {
      const row = rest.row
      evnt.preventDefault()
      const { dragRow } = reactData
      const offsetY = evnt.clientY - trEl.getBoundingClientRect().y
      const dragPos = offsetY < trEl.clientHeight / 2 ? 'top' : 'bottom'
      if ($xeTable.eqRow(dragRow, row) ||
        (!isCrossDrag && treeConfig && transform && (isPeerDrag ? dragRow[parentField] !== row[parentField] : rest.level))
      ) {
        showDropTip($xeTable, evnt, trEl, null, false, dragPos)
        return
      }
      internalData.prevDragToChild = !!(treeConfig && transform && isToChildDrag && hasCtrlKey)
      internalData.prevDragRow = row
      internalData.prevDragPos = dragPos
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

    $xeTable.handleUpdateColumn()
    $xeTable.parseColumns(false).then(() => {
      $xeTable.updateCellAreas()
      $xeTable.saveCustomStore('update:sort')
    })
  },
  handleColDragSwapEvent (evnt: DragEvent, isSyncColumn: boolean | undefined, dragCol: VxeTableDefines.ColumnInfo | null | undefined, prevDragCol: VxeTableDefines.ColumnInfo | undefined, prevDragPos: '' | 'top' | 'bottom' | 'left' | 'right' | undefined, prevDragToChild: boolean | undefined) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable
    const internalData = $xeTable

    const { mouseConfig } = props
    const columnDragOpts = $xeTable.computeColumnDragOpts
    const { isPeerDrag, isCrossDrag, isSelfToChildDrag, isToChildDrag, dragEndMethod } = columnDragOpts
    const { collectColumn } = internalData
    const dragOffsetIndex = prevDragPos === 'right' ? 1 : 0
    if (prevDragCol && dragCol) {
      // 判断是否有拖动
      if (prevDragCol !== dragCol) {
        const oldColumn = dragCol
        const newColumn = prevDragCol
        return Promise.resolve(
          dragEndMethod
            ? dragEndMethod({
              oldColumn,
              newColumn,
              dragPos: prevDragPos as any,
              dragToChild: !!prevDragToChild,
              offsetIndex: dragOffsetIndex
            })
            : true
        ).then((status) => {
          if (!status) {
            return
          }

          let oafIndex = -1
          let nafIndex = -1

          const oldAllMaps: Record<string, any> = {}
          XEUtils.eachTree([oldColumn], column => {
            oldAllMaps[column.id] = column
          })

          let isSelfToChildStatus = false

          if (oldColumn.parentId && newColumn.parentId) {
            // 子到子

            if (isPeerDrag && !isCrossDrag) {
              if (oldColumn.parentId !== newColumn.parentId) {
                // 非同级
                return
              }
            } else {
              if (!isCrossDrag) {
                return
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
                  return
                }
              }
            }
          } else if (oldColumn.parentId) {
            // 子到根

            if (!isCrossDrag) {
              return
            }
          } else if (newColumn.parentId) {
            // 根到子

            if (!isCrossDrag) {
              return
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
                return
              }
            }
          } else {
            // 根到根
          }

          const oldewMatchRest = XEUtils.findTree(collectColumn as VxeTableDefines.ColumnInfo[], item => item.id === oldColumn.id)

          // 改变层级
          if (isSelfToChildStatus && (isCrossDrag && isSelfToChildDrag)) {
            if (oldewMatchRest) {
              const { items: oCols, index: oIndex } = oldewMatchRest
              const childList = oldColumn.children || []
              childList.forEach(column => {
                column.parentId = oldColumn.parentId
              })
              oCols.splice(oIndex, 1, ...childList)
              oldColumn.children = []
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
            if ((isCrossDrag && isToChildDrag) && prevDragToChild) {
              oldColumn.parentId = newColumn.id
              newColumn.children = (newColumn.children || []).concat([oldColumn])
            } else {
              oldColumn.parentId = newColumn.parentId
              nCols.splice(nIndex + dragOffsetIndex, 0, oldColumn)
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

          $xeTable.dispatchEvent('column-dragend', {
            oldColumn,
            newColumn,
            dragPos: prevDragPos,
            dragToChild: !!prevDragToChild,
            offsetIndex: dragOffsetIndex,
            _index: {
              newIndex: nafIndex,
              oldIndex: oafIndex
            }
          }, evnt)

          if (isSyncColumn) {
            $xeTable.handleColDragSwapColumn()
          }
        }).catch(() => {
        })
      }
    }
    return Promise.resolve()
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
    const hasCtrlKey = evnt.ctrlKey
    const thEl = evnt.currentTarget as HTMLElement
    const colid = thEl.getAttribute('colid')
    const column = $xeTable.getColumnById(colid)
    if (column) {
      evnt.preventDefault()
      const { clientX } = evnt
      const offsetX = clientX - thEl.getBoundingClientRect().x
      const dragPos = offsetX < thEl.clientWidth / 2 ? 'left' : 'right'
      if (column.fixed ||
        (dragCol && dragCol.id === column.id) ||
        (!isCrossDrag && (isPeerDrag ? dragCol.parentId !== column.parentId : column.parentId))
      ) {
        showDropTip($xeTable, evnt, null, thEl, false, dragPos)
        return
      }
      internalData.prevDragToChild = !!((isCrossDrag && isToChildDrag) && hasCtrlKey)
      internalData.prevDragCol = column
      internalData.prevDragPos = dragPos
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
      const tableBody = $xeTable.$refs.tableBody
      const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
      const scrollTargetEl = xHandleEl || tableBodyElem
      if (scrollTargetEl) {
        const wrapperRect = el.getBoundingClientRect()
        const tableWidth = el.clientWidth
        const leftContainerElem = $xeTable.$refs.leftContainer as HTMLDivElement
        const leftContainerWidth = leftContainerElem ? leftContainerElem.clientWidth : 0
        const rightContainerElem = $xeTable.$refs.rightContainer as HTMLDivElement
        const rightContainerWidth = rightContainerElem ? rightContainerElem.clientWidth : 0
        const srartX = wrapperRect.x + leftContainerWidth
        const endX = wrapperRect.x + tableWidth - rightContainerWidth
        const distSize = 28
        const startDistSize = clientX - srartX
        const endDistSize = endX - clientX
        if (startDistSize > 0 && startDistSize <= distSize) {
          const scrollRatio = Math.floor(tableWidth / (startDistSize > distSize / 2 ? 240 : 120))
          scrollTargetEl.scrollLeft -= scrollRatio * (distSize - startDistSize)
        } else if (endDistSize > 0 && endDistSize <= distSize) {
          const scrollRatio = Math.floor(tableWidth / (endDistSize > distSize / 2 ? 240 : 120))
          scrollTargetEl.scrollLeft += scrollRatio * (distSize - endDistSize)
        }
      }
    }
  },
  handleHeaderCellDragMousedownEvent (evnt: MouseEvent, params: any) {
    const $xeTable = this
    const reactData = $xeTable

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
    const $xeTable = this
    const reactData = $xeTable

    clearColDropOrigin($xeTable)
    hideDropTip($xeTable)
    reactData.dragRow = null
    reactData.dragCol = null
    reactData.isDragColMove = false
  },
  setPendingRow (rows: any, status: any) {
    const $xeTable = this
    const reactData = $xeTable

    const pendingMaps = Object.assign({}, reactData.pendingRowMaps)
    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    if (status) {
      rows.forEach((row: any) => {
        const rowid = getRowid($xeTable, row)
        if (rowid && !pendingMaps[rowid]) {
          pendingMaps[rowid] = row
        }
      })
    } else {
      rows.forEach((row: any) => {
        const rowid = getRowid($xeTable, row)
        if (rowid && pendingMaps[rowid]) {
          delete pendingMaps[rowid]
        }
      })
    }
    reactData.pendingRowMaps = pendingMaps
    return $xeTable.$nextTick()
  },
  togglePendingRow (rows: any) {
    const $xeTable = this
    const reactData = $xeTable

    const pendingMaps = Object.assign({}, reactData.pendingRowMaps)
    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    rows.forEach((row: any) => {
      const rowid = getRowid($xeTable, row)
      if (rowid) {
        if (pendingMaps[rowid]) {
          delete pendingMaps[rowid]
        } else {
          pendingMaps[rowid] = row
        }
      }
    })
    reactData.pendingRowMaps = pendingMaps
    return $xeTable.$nextTick()
  },
  getPendingRecords () {
    const $xeTable = this
    const reactData = $xeTable
    const internalData = $xeTable

    const { pendingRowMaps } = reactData
    const { fullAllDataRowIdData } = internalData
    const insertRecords: any[] = []
    XEUtils.each(pendingRowMaps, (row, rowid) => {
      if (fullAllDataRowIdData[rowid]) {
        insertRecords.push(row)
      }
    })
    return insertRecords
  },
  hasPendingByRow (row: any) {
    const { pendingRowMaps } = this
    const rowid = getRowid(this, row)
    return !!pendingRowMaps[rowid]
  },
  clearPendingRow () {
    this.pendingRowMaps = {}
    return this.$nextTick()
  },
  sort (sortConfs: any, sortOrder: any) {
    const { sortOpts } = this
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
        clearAllSort(this)
      }
      (multiple ? sortConfs : [sortConfs[0]]).forEach((confs: any, index: any) => {
        let { field, order } = confs
        let column = field
        if (XEUtils.isString(field)) {
          column = this.getColumnByField(field)
        }
        if (column && (column.sortable || column.remoteSort)) {
          if (!firstSortColumn) {
            firstSortColumn = column
          }
          if (orders.indexOf(order) === -1) {
            order = getNextSortOrder(this, column)
          }
          if (column.order !== order) {
            column.order = order
          }
          column.sortTime = Date.now() + index
        }
      })
      // 如果是服务端排序，则跳过本地排序处理
      if (!remote || (firstSortColumn && firstSortColumn.remoteSort)) {
        this.handleTableData(true)
      }
      return this.$nextTick().then(() => {
        this.updateCellAreas()
        return this.updateStyle()
      })
    }
    return this.$nextTick()
  },
  setSort (sortConfs: VxeTableDefines.SortConfs | VxeTableDefines.SortConfs[], isUpdate?: boolean) {
    const $xeTable = this

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
          if (orders.indexOf(order) === -1) {
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
        $xeTable.handleColumnSortEvent(new Event('click'), firstColumn)
      }
      return $xeTable.$nextTick().then(() => {
        $xeTable.updateCellAreas()
        return $xeTable.updateStyle()
      })
    }
    return $xeTable.$nextTick()
  },
  /**
   * 清空指定列的排序条件
   * 如果为空则清空所有列的排序条件
   * @param {String} column 列或字段名
   */
  clearSort (fieldOrColumn: any) {
    const { sortOpts } = this
    if (fieldOrColumn) {
      const column = handleFieldOrColumn(this, fieldOrColumn)
      if (column) {
        column.order = null
      }
    } else {
      clearAllSort(this)
    }
    if (!sortOpts.remote) {
      this.handleTableData(true)
    }
    return this.$nextTick().then(this.updateStyle)
  },
  // 在 v3 中废弃
  getSortColumn () {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['getSortColumn', 'getSortColumns'])
    }
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
  /**
   * 关闭筛选
   * @param {Event} evnt 事件
   */
  closeFilter () {
    const { filterStore } = this
    const { column, visible } = filterStore
    Object.assign(filterStore, {
      isAllSelected: false,
      isIndeterminate: false,
      options: [],
      visible: false
    })
    if (visible) {
      this.emitEvent('filter-visible', { column, field: column.field, property: column.field, filterList: this.getCheckedFilters(), visible: false }, null)
    }
    return this.$nextTick()
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
    const $xeTable = this as VxeTableConstructor
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const rExpandLazyLoadedMaps = { ...reactData.rowExpandLazyLoadedMaps }
    const { fullAllDataRowIdData } = internalData
    const expandOpts = $xeTable.computeExpandOpts
    const { lazy } = expandOpts
    const rowid = getRowid($xeTable, row)
    const rowRest = fullAllDataRowIdData[rowid]
    if (lazy && rowRest) {
      rowRest.expandLoaded = false
      delete rExpandLazyLoadedMaps[rowid]
    }
    reactData.rowExpandLazyLoadedMaps = rExpandLazyLoadedMaps
    return $xeTable.$nextTick()
  },
  /**
   * 重新懒加载展开行，并展开内容
   * @param {Row} row 行对象
   */
  reloadRowExpand (row: any) {
    const { expandOpts, rowExpandLazyLoadedMaps } = this
    const { lazy } = expandOpts
    const rowid = getRowid(this, row)
    if (lazy && !rowExpandLazyLoadedMaps[rowid]) {
      this.clearRowExpandLoaded(row)
        .then(() => this.handleAsyncRowExpand(row))
    }
    return this.$nextTick()
  },
  reloadExpandContent (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['reloadExpandContent', 'reloadRowExpand'])
    }
    // 即将废弃
    return this.reloadRowExpand(row)
  },
  /**
   * 展开行事件
   */
  triggerRowExpandEvent (evnt: any, params: any) {
    const { expandOpts, rowExpandLazyLoadedMaps, expandColumn: column } = this
    const { row } = params
    const { lazy, trigger } = expandOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    const rowid = getRowid(this, row)
    if (!lazy || !rowExpandLazyLoadedMaps[rowid]) {
      const expanded = !this.isRowExpandByRow(row)
      const columnIndex = this.getColumnIndex(column)
      const $columnIndex = this.getVMColumnIndex(column)
      this.setRowExpand(row, expanded)
      this.emitEvent('toggle-row-expand', { expanded, column, columnIndex, $columnIndex, row, rowIndex: this.getRowIndex(row), $rowIndex: this.getVMRowIndex(row) }, evnt)
    }
  },
  /**
   * 切换展开行
   */
  toggleRowExpand (row: any) {
    return this.setRowExpand(row, !this.isRowExpandByRow(row))
  },
  /**
   * 处理默认展开行
   */
  handleDefaultRowExpand () {
    const { expandOpts, fullDataRowIdData } = this
    const { expandAll, expandRowKeys } = expandOpts
    if (expandAll) {
      this.setAllRowExpand(true)
    } else if (expandRowKeys) {
      const defExpandeds: any[] = []
      expandRowKeys.forEach((rowid: any) => {
        if (fullDataRowIdData[rowid]) {
          defExpandeds.push(fullDataRowIdData[rowid].row)
        }
      })
      this.setRowExpand(defExpandeds, true)
    }
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
  handleAsyncRowExpand (row: any) {
    const $xeTable = this
    const reactData = $xeTable as TableReactData
    const internalData = $xeTable as TableInternalData

    return new Promise<void>(resolve => {
      const { expandOpts } = this
      const { loadMethod } = expandOpts
      if (loadMethod) {
        const { fullAllDataRowIdData } = internalData
        const rExpandLazyLoadedMaps = { ...reactData.rowExpandLazyLoadedMaps }
        const rowid = getRowid($xeTable, row)
        const rowRest = fullAllDataRowIdData[rowid]
        rExpandLazyLoadedMaps[rowid] = row
        reactData.rowExpandLazyLoadedMaps = rExpandLazyLoadedMaps
        loadMethod({ $table: $xeTable, row, rowIndex: $xeTable.getRowIndex(row), $rowIndex: $xeTable.getVMRowIndex(row) }).then(() => {
          const rExpandedMaps = { ...reactData.rowExpandedMaps }
          if (rowRest) {
            rowRest.expandLoaded = true
          }
          rExpandedMaps[rowid] = row
          reactData.rowExpandedMaps = rExpandedMaps
        }).catch(() => {
          if (rowRest) {
            rowRest.expandLoaded = false
          }
        }).finally(() => {
          const rExpandLazyLoadedMaps = { ...reactData.rowExpandLazyLoadedMaps }
          if (rExpandLazyLoadedMaps[rowid]) {
            delete rExpandLazyLoadedMaps[rowid]
          }
          reactData.rowExpandLazyLoadedMaps = rExpandLazyLoadedMaps
          $xeTable.$nextTick().then(() => $xeTable.recalculate()).then(() => resolve())
        })
      } else {
        resolve()
      }
    })
  },
  /**
   * 设置展开行，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setRowExpand (rows: any, expanded: any) {
    const { rowExpandedMaps, fullAllDataRowIdData, rowExpandLazyLoadedMaps, expandOpts, expandColumn: column } = this
    let rExpandedMaps = { ...rowExpandedMaps }
    const { reserve, lazy, accordion, toggleMethod } = expandOpts
    const lazyRests: any[] = []
    const columnIndex = this.getColumnIndex(column)
    const $columnIndex = this.getVMColumnIndex(column)
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (accordion) {
        // 只能同时展开一个
        rExpandedMaps = {}
        rows = rows.slice(rows.length - 1, rows.length)
      }
      const validRows = toggleMethod ? rows.filter((row: any) => toggleMethod({ expanded, column, columnIndex, $columnIndex, row, rowIndex: this.getRowIndex(row), $rowIndex: this.getVMRowIndex(row) })) : rows
      if (expanded) {
        validRows.forEach((row: any) => {
          const rowid = getRowid(this, row)
          if (!rExpandedMaps[rowid]) {
            const rowRest = fullAllDataRowIdData[rowid]
            const isLoad = lazy && !rowRest.expandLoaded && !rowExpandLazyLoadedMaps[rowid]
            if (isLoad) {
              lazyRests.push(this.handleAsyncRowExpand(row))
            } else {
              rExpandedMaps[rowid] = row
            }
          }
        })
      } else {
        validRows.forEach((item: any) => {
          const rowid = getRowid(this, item)
          if (rExpandedMaps[rowid]) {
            delete rExpandedMaps[rowid]
          }
        })
      }
      if (reserve) {
        validRows.forEach((row: any) => this.handleRowExpandReserve(row, expanded))
      }
    }
    this.rowExpandedMaps = rExpandedMaps
    return Promise.all(lazyRests).then(this.recalculate)
  },
  /**
   * 判断行是否为展开状态
   * @param {Row} row 行对象
   */
  isRowExpandByRow (row: any) {
    const { rowExpandedMaps } = this
    const rowid = getRowid(this, row)
    return !!rowExpandedMaps[rowid]
  },
  isExpandByRow (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['isExpandByRow', 'isRowExpandByRow'])
    }
    // 即将废弃
    return this.isRowExpandByRow(row)
  },
  /**
   * 手动清空展开行状态，数据会恢复成未展开的状态
   */
  clearRowExpand () {
    const { expandOpts, tableFullData } = this
    const { reserve } = expandOpts
    const expList = this.getRowExpandRecords()
    this.rowExpandedMaps = {}
    if (reserve) {
      tableFullData.forEach((row: any) => this.handleRowExpandReserve(row, false))
    }
    return this.$nextTick().then(() => {
      if (expList.length) {
        this.recalculate()
      }
    })
  },
  clearRowExpandReserve () {
    this.rowExpandedReserveRowMap = {}
    return this.$nextTick()
  },
  handleRowExpandReserve (row: any, expanded: any) {
    const { rowExpandedReserveRowMap, expandOpts } = this
    if (expandOpts.reserve) {
      const rowid = getRowid(this, row)
      if (expanded) {
        rowExpandedReserveRowMap[rowid] = row
      } else if (rowExpandedReserveRowMap[rowid]) {
        delete rowExpandedReserveRowMap[rowid]
      }
    }
  },
  getRowExpandRecords () {
    const rest: any[] = []
    XEUtils.each(this.rowExpandedMaps, item => {
      if (item) {
        rest.push(item)
      }
    })
    return rest
  },
  getTreeExpandRecords () {
    const rest: any[] = []
    XEUtils.each(this.treeExpandedMaps, item => {
      if (item) {
        rest.push(item)
      }
    })
    return rest
  },
  /**
   * 获取树表格状态
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
    const $xeTable = this

    const { fullAllDataRowIdData } = this
    const rowRest = fullAllDataRowIdData[getRowid($xeTable, row)]
    return rowRest && !!rowRest.treeLoaded
  },
  clearTreeExpandLoaded (rows: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const tExpandedMaps = { ...reactData.treeExpandedMaps }
    const { fullAllDataRowIdData } = internalData
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
          if (tExpandedMaps[rowid]) {
            delete tExpandedMaps[rowid]
          }
        }
      })
    }
    reactData.treeExpandedMaps = tExpandedMaps
    if (transform) {
      handleVirtualTreeToList($xeTable)
      return $xeTable.handleTableData()
    }
    return $xeTable.$nextTick()
  },
  /**
   * 重新懒加载树节点，并展开该节点
   * @param {Row} row 行对象
   */
  reloadTreeExpand (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const { treeOpts, treeExpandLazyLoadedMaps } = this
    const { transform, lazy } = treeOpts
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const rowid = getRowid(this, row)
    if (lazy && row[hasChildField] && !treeExpandLazyLoadedMaps[rowid]) {
      return this.clearTreeExpandLoaded(row).then(() => {
        return this.handleAsyncTreeExpandChilds(row)
      }).then(() => {
        if (transform) {
          handleVirtualTreeToList($xeTable)
          return this.handleTableData()
        }
      }).then(() => {
        return this.recalculate()
      })
    }
    return this.$nextTick()
  },
  reloadTreeChilds (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['reloadTreeChilds', 'reloadTreeExpand'])
    }
    // 即将废弃
    return this.reloadTreeExpand(row)
  },
  /**
   * 展开树节点事件
   */
  triggerTreeExpandEvent (evnt: any, params: any) {
    const { treeOpts, treeExpandLazyLoadedMaps } = this
    const { row, column } = params
    const { lazy, trigger } = treeOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    const rowid = getRowid(this, row)
    if (!lazy || !treeExpandLazyLoadedMaps[rowid]) {
      const expanded = !this.isTreeExpandByRow(row)
      const columnIndex = this.getColumnIndex(column)
      const $columnIndex = this.getVMColumnIndex(column)
      this.setTreeExpand(row, expanded)
      this.emitEvent('toggle-tree-expand', { expanded, column, columnIndex, $columnIndex, row }, evnt)
    }
  },
  /**
   * 切换/展开树节点
   */
  toggleTreeExpand (row: any) {
    return this.setTreeExpand(row, !this.isTreeExpandByRow(row))
  },
  /**
   * 处理默认展开树节点
   */
  handleDefaultTreeExpand () {
    const { treeConfig, treeOpts, tableFullData } = this
    if (treeConfig) {
      const { expandAll, expandRowKeys } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      if (expandAll) {
        this.setAllTreeExpand(true)
      } else if (expandRowKeys) {
        const defExpandeds: any[] = []
        const rowkey = getRowkey(this)
        expandRowKeys.forEach((rowid: any) => {
          const matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), { children: childrenField })
          if (matchObj) {
            defExpandeds.push(matchObj.item)
          }
        })
        this.setTreeExpand(defExpandeds, true)
      }
    }
  },
  handleAsyncTreeExpandChilds (row: any) {
    const $xeTable = this

    const { treeOpts, checkboxOpts } = this
    const { transform, loadMethod } = treeOpts
    const { checkStrictly } = checkboxOpts
    return new Promise<void>(resolve => {
      if (loadMethod) {
        const { treeExpandLazyLoadedMaps, fullAllDataRowIdData } = this
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
            return this.loadTreeChildren(row, childRecords).then((childRows: any[]) => {
              const { treeExpandedMaps } = this
              if (childRows.length && !treeExpandedMaps[rowid]) {
                treeExpandedMaps[rowid] = row
              }
              // 如果当前节点已选中，则展开后子节点也被选中
              if (!checkStrictly && this.isCheckedByCheckboxRow(row)) {
                this.handleCheckedCheckboxRow(childRows, true)
              }
              return this.$nextTick().then(() => {
                if (transform) {
                  this.handleTableData()
                  this.updateTreeDataIndex()
                  return this.$nextTick()
                }
              })
            })
          }
        }).catch(() => {
          const { treeExpandLazyLoadedMaps } = this
          if (rowRest) {
            rowRest.treeLoaded = false
          }
          if (treeExpandLazyLoadedMaps[rowid]) {
            delete treeExpandLazyLoadedMaps[rowid]
          }
        }).finally(() => {
          this.$nextTick().then(() => this.recalculate()).then(() => resolve())
        })
      } else {
        resolve()
      }
    })
  },
  /**
   * 设置所有树节点的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllTreeExpand (expanded: any) {
    const { tableFullData, treeOpts } = this
    const { lazy } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const expandeds: any[] = []
    XEUtils.eachTree(tableFullData, (row: any) => {
      const rowChildren = row[childrenField]
      if (lazy || (rowChildren && rowChildren.length)) {
        expandeds.push(row)
      }
    }, { children: childrenField })
    return this.setTreeExpand(expandeds, expanded)
  },
  /**
   * 默认，展开与收起树节点
   * @param rows
   * @param expanded
   * @returns
   */
  handleBaseTreeExpand (rows: any, expanded: any) {
    const { fullAllDataRowIdData, tableFullData, treeExpandedMaps, treeOpts, treeExpandLazyLoadedMaps, treeNodeColumn } = this
    const { reserve, lazy, accordion, toggleMethod } = treeOpts
    const treeTempExpandedMaps = { ...treeExpandedMaps }
    const childrenField = treeOpts.children || treeOpts.childrenField
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const result: any[] = []
    const columnIndex = this.getColumnIndex(treeNodeColumn)
    const $columnIndex = this.getVMColumnIndex(treeNodeColumn)
    let validRows = toggleMethod ? rows.filter((row: any) => toggleMethod({ expanded, column: treeNodeColumn, columnIndex, $columnIndex, row })) : rows
    if (accordion) {
      validRows = validRows.length ? [validRows[validRows.length - 1]] : []
      // 同一级只能展开一个
      const matchObj = XEUtils.findTree(tableFullData, item => item === validRows[0], { children: childrenField })
      if (matchObj) {
        matchObj.items.forEach(item => {
          const rowid = getRowid(this, item)
          if (treeTempExpandedMaps[rowid]) {
            delete treeTempExpandedMaps[rowid]
          }
        })
      }
    }
    if (expanded) {
      validRows.forEach((row: any) => {
        const rowid = getRowid(this, row)
        if (!treeTempExpandedMaps[rowid]) {
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            const isLoad = lazy && row[hasChildField] && !rowRest.treeLoaded && !treeExpandLazyLoadedMaps[rowid]
            // 是否使用懒加载
            if (isLoad) {
              result.push(this.handleAsyncTreeExpandChilds(row))
            } else {
              if (row[childrenField] && row[childrenField].length) {
                treeTempExpandedMaps[rowid] = row
              }
            }
          }
        }
      })
    } else {
      validRows.forEach((item: any) => {
        const rowid = getRowid(this, item)
        if (treeTempExpandedMaps[rowid]) {
          delete treeTempExpandedMaps[rowid]
        }
      })
    }
    if (reserve) {
      validRows.forEach((row: any) => this.handleTreeExpandReserve(row, expanded))
    }
    this.treeExpandedMaps = treeTempExpandedMaps
    return Promise.all(result).then(() => {
      return this.recalculate()
    })
  },
  /**
   * 虚拟树的展开与收起
   * @param rows
   * @param expanded
   * @returns
   */
  handleVirtualTreeExpand (rows: any[], expanded: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return this.handleBaseTreeExpand(rows, expanded).then(() => {
      handleVirtualTreeToList($xeTable)
      this.handleTableData()
      this.updateTreeDataIndex()
    }).then(() => {
      return this.recalculate()
    }).then(() => {
      setTimeout(() => {
        this.updateCellAreas()
      }, 30)
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
    const { treeOpts } = this
    const { transform } = treeOpts
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (rows.length) {
        // 如果为虚拟树
        if (transform) {
          return this.handleVirtualTreeExpand(rows, expanded)
        } else {
          return this.handleBaseTreeExpand(rows, expanded)
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
    const { treeExpandedMaps } = this
    return !!treeExpandedMaps[getRowid(this, row)]
  },
  /**
   * 手动清空树形节点的展开状态，数据会恢复成未展开的状态
   */
  clearTreeExpand () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const { treeOpts, tableFullData } = this
    const { transform, reserve } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const expList = this.getTreeExpandRecords()
    this.treeExpandedMaps = {}
    if (reserve) {
      XEUtils.eachTree(tableFullData, row => this.handleTreeExpandReserve(row, false), { children: childrenField })
    }
    return this.handleTableData().then(() => {
      if (transform) {
        handleVirtualTreeToList($xeTable)
        return this.handleTableData()
      }
    }).then(() => {
      if (expList.length) {
        this.recalculate()
      }
    })
  },
  clearTreeExpandReserve () {
    this.treeExpandedReserveRowMap = {}
    return this.$nextTick()
  },
  handleTreeExpandReserve (row: any, expanded: any) {
    const { treeExpandedReserveRowMap, treeOpts } = this
    if (treeOpts.reserve) {
      const rowid = getRowid(this, row)
      if (expanded) {
        treeExpandedReserveRowMap[rowid] = row
      } else if (treeExpandedReserveRowMap[rowid]) {
        delete treeExpandedReserveRowMap[rowid]
      }
    }
  },
  /**
   * 获取表格的滚动状态
   */
  getScroll () {
    const { $refs, scrollXLoad, scrollYLoad } = this
    const bodyElem = $refs.tableBody.$el
    return {
      virtualX: scrollXLoad,
      virtualY: scrollYLoad,
      scrollTop: bodyElem.scrollTop,
      scrollLeft: bodyElem.scrollLeft
    }
  },
  handleScrollEvent (evnt: Event, isRollY: boolean, isRollX: boolean, scrollTop: number, scrollLeft: number, params: any) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable
    const internalData = $xeTable

    const { highlightHoverRow } = props
    const { lastScrollLeft, lastScrollTop } = internalData
    const tableBody = $xeTable.$refs.tableBody
    const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
    const rowOpts = $xeTable.computeRowOpts
    const validTip = $xeTable.$refs.validTip
    const tooltip = $xeTable.$refs.tooltip
    const bodyHeight = bodyElem ? bodyElem.clientHeight : 0
    const bodyWidth = bodyElem ? bodyElem.clientWidth : 0
    const scrollHeight = bodyElem ? bodyElem.scrollHeight : 0
    const scrollWidth = bodyElem ? bodyElem.scrollWidth : 0
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
    checkLastSyncScroll($xeTable, isRollX, isRollY)
    if (rowOpts.isHover || highlightHoverRow) {
      $xeTable.clearHoverRow()
    }
    if (validTip && validTip.visible) {
      validTip.close()
    }
    if (tooltip && tooltip.visible) {
      tooltip.close()
    }

    if (isBottomBoundary || isTopBoundary || isRightBoundary || isLeftBoundary) {
      $xeTable.dispatchEvent('scroll-boundary', evntParams, evnt)
    }
    $xeTable.dispatchEvent('scroll', evntParams, evnt)
  },
  lazyScrollXData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { lxTimeout, lxRunTime, scrollXStore } = internalData
    const { visibleSize } = scrollXStore
    const fpsTime = Math.min(80, Math.floor(visibleSize * 3))
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
  },
  lazyScrollYData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { lyTimeout, lyRunTime, scrollYStore } = internalData
    const { visibleSize } = scrollYStore
    const fpsTime = Math.min(80, Math.floor(visibleSize))
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
  },
  /**
   * 横向 X 可视渲染事件处理
   */
  triggerScrollXEvent () {
    const $xeTable = this

    const sXOpts = $xeTable.computeSXOpts
    if (sXOpts.immediate) {
      loadScrollXData($xeTable)
    } else {
      $xeTable.lazyScrollXData()
    }
  },
  /**
   * 纵向 Y 可视渲染事件处理
   */
  triggerScrollYEvent () {
    const $xeTable = this

    const sYOpts = $xeTable.computeSYOpts
    if (sYOpts.immediate) {
      loadScrollYData($xeTable)
    } else {
      $xeTable.lazyScrollYData()
    }
  },
  scrollXEvent (evnt: Event) {
    const $xeTable = this
    const internalData = $xeTable

    const { intoRunScroll, inFooterScroll, inBodyScroll, lastScrollTop } = internalData
    if (!intoRunScroll) {
      if (inFooterScroll) {
        return
      }
      if (inBodyScroll) {
        return
      }
    }
    const tableHeader = $xeTable.$refs.tableHeader
    const tableBody = $xeTable.$refs.tableBody
    const tableFooter = $xeTable.$refs.tableFooter
    const bodyElem = tableBody.$el as HTMLDivElement
    const headerElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
    const footerElem = tableFooter ? tableFooter.$el as HTMLDivElement : null
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    const wrapperEl = evnt.currentTarget as HTMLDivElement
    const { scrollLeft } = wrapperEl
    const yBodyEl = yHandleEl || bodyElem
    let scrollTop = 0
    if (yBodyEl) {
      scrollTop = yBodyEl.scrollTop
    }
    const isRollX = true
    const isRollY = scrollTop !== lastScrollTop

    internalData.inVirtualScroll = true
    setScrollLeft(bodyElem, scrollLeft)
    setScrollLeft(headerElem, scrollLeft)
    setScrollLeft(footerElem, scrollLeft)
    $xeTable.triggerScrollXEvent(evnt)
    $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
      type: 'table',
      fixed: ''
    })
  },
  scrollYEvent (evnt: Event) {
    const $xeTable = this
    const internalData = $xeTable

    const { intoRunScroll, inFooterScroll, inBodyScroll, lastScrollLeft } = internalData
    if (!intoRunScroll) {
      if (inFooterScroll) {
        return
      }
      if (inBodyScroll) {
        return
      }
    }
    const tableBody = $xeTable.$refs.tableBody
    const leftBody = $xeTable.$refs.leftBody
    const rightBody = $xeTable.$refs.rightBody
    const bodyElem = tableBody.$el as HTMLDivElement
    const leftElem = leftBody ? leftBody.$el as HTMLDivElement : null
    const rightElem = rightBody ? rightBody.$el as HTMLDivElement : null
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const wrapperEl = evnt.currentTarget as HTMLDivElement
    const { scrollTop } = wrapperEl
    const xBodyEl = xHandleEl || bodyElem
    let scrollLeft = 0
    if (xBodyEl) {
      scrollLeft = xBodyEl.scrollLeft
    }
    const isRollX = scrollLeft !== lastScrollLeft
    const isRollY = true

    internalData.inVirtualScroll = true
    setScrollTop(bodyElem, scrollTop)
    setScrollTop(leftElem, scrollTop)
    setScrollTop(rightElem, scrollTop)
    $xeTable.triggerScrollYEvent(evnt)
    $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
      type: 'table',
      fixed: ''
    })
  },
  handleTableColumn () {
    const { scrollXLoad, visibleColumn, scrollXStore, fullColumnIdData } = this
    const tableColumn: any[] = scrollXLoad ? visibleColumn.slice(scrollXStore.startIndex, scrollXStore.endIndex) : visibleColumn.slice(0)
    tableColumn.forEach((column, $index) => {
      const colid = column.id
      const colRest = fullColumnIdData[colid]
      if (colRest) {
        colRest.$index = $index
      }
    })
    this.tableColumn = tableColumn
  },
  handleUpdateColumn () {
    const $xeTable = this as VxeTableConstructor
    const internalData = $xeTable as unknown as TableInternalData

    const columnList = XEUtils.orderBy(internalData.collectColumn, 'renderSortNumber')
    internalData.collectColumn = columnList
    const tableFullColumn = getColumnList(columnList)
    internalData.tableFullColumn = tableFullColumn
    cacheColumnMap($xeTable)
  },
  updateScrollXData () {
    const $xeTable = this
    const props = $xeTable

    const { showOverflow } = props
    $xeTable.handleTableColumn()
    calcCellHeight($xeTable)
    return $xeTable.$nextTick().then(() => {
      calcCellHeight($xeTable)
      $xeTable.handleTableColumn()
      $xeTable.updateScrollXSpace()
      if (!showOverflow) {
        $xeTable.updateScrollYSpace()
      }
    })
  },
  // 更新横向 X 可视渲染上下剩余空间大小
  updateScrollXSpace () {
    const $xeTable = this

    const { $refs, isGroup, elemStore, visibleColumn, scrollXStore, scrollXLoad, tableWidth, scrollbarWidth } = $xeTable
    const { tableHeader, tableBody, tableFooter } = $refs
    const tableBodyElem = tableBody ? tableBody.$el : null
    if (tableBodyElem) {
      const tableHeaderElem = tableHeader ? tableHeader.$el : null
      const tableFooterElem = tableFooter ? tableFooter.$el : null
      const headerElem = tableHeaderElem ? tableHeaderElem.querySelector('.vxe-table--header') : null
      const bodyElem = tableBodyElem.querySelector('.vxe-table--body')
      const footerElem = tableFooterElem ? tableFooterElem.querySelector('.vxe-table--footer') : null
      const leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous: any, column: any) => previous + column.renderWidth, 0)
      let marginLeft = ''
      if (scrollXLoad) {
        marginLeft = `${leftSpaceWidth}px`
      }
      if (headerElem) {
        headerElem.style.marginLeft = isGroup ? '' : marginLeft
      }
      bodyElem.style.marginLeft = marginLeft
      if (footerElem) {
        footerElem.style.marginLeft = marginLeft
      }
      const containerList = ['main']
      containerList.forEach(name => {
        const layoutList = ['header', 'body', 'footer']
        layoutList.forEach(layout => {
          const xSpaceElem = elemStore[`${name}-${layout}-xSpace`]
          if (xSpaceElem) {
            xSpaceElem.style.width = scrollXLoad ? `${tableWidth + (layout === 'header' ? scrollbarWidth : 0)}px` : ''
          }
        })
      })
      const scrollXSpaceEl = $xeTable.$refs.refScrollXSpaceElem
      if (scrollXSpaceEl) {
        scrollXSpaceEl.style.width = `${tableWidth + scrollbarWidth}px`
      }
      this.$nextTick(this.updateStyle)
    }
  },
  updateScrollYData () {
    const $xeTable = this

    $xeTable.handleTableData()
    calcCellHeight($xeTable)
    return $xeTable.$nextTick().then(() => {
      calcCellHeight($xeTable)
      $xeTable.handleTableData()
      $xeTable.updateScrollYSpace()
    })
  },
  // 更新纵向 Y 可视渲染上下剩余空间大小
  updateScrollYSpace () {
    const $xeTable = this

    const { showOverflow, elemStore, scrollYStore, scrollYLoad, afterFullData, fullAllDataRowIdData } = this
    const { startIndex, rowHeight } = scrollYStore
    let bodyHeight = 0
    let topSpaceHeight = 0
    const containerList = ['main', 'left', 'right']
    let marginTop = ''
    let ySpaceHeight = ''
    if (scrollYLoad) {
      if (showOverflow) {
        bodyHeight = afterFullData.length * rowHeight
        topSpaceHeight = Math.max(0, startIndex * rowHeight)
      } else {
        for (let i = 0; i < afterFullData.length; i++) {
          const row = afterFullData[i]
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            bodyHeight += rowRest.height || rowHeight
          }
        }
        for (let i = 0; i < startIndex; i++) {
          const row = afterFullData[i]
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            topSpaceHeight += rowRest.height || rowHeight
          }
        }
      }
      marginTop = `${topSpaceHeight}px`
      ySpaceHeight = `${bodyHeight}px`
    }
    containerList.forEach(name => {
      const layoutList = ['header', 'body', 'footer']
      const tableElem = elemStore[`${name}-body-table`]
      if (tableElem) {
        tableElem.style.marginTop = marginTop
      }
      layoutList.forEach(layout => {
        const ySpaceElem = elemStore[`${name}-${layout}-ySpace`]
        if (ySpaceElem) {
          ySpaceElem.style.height = ySpaceHeight
        }
      })
    })
    const scrollYSpaceEl = $xeTable.$refs.refScrollYSpaceElem
    if (scrollYSpaceEl) {
      scrollYSpaceEl.style.height = ySpaceHeight
    }
    this.$nextTick(this.updateStyle)
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
  scrollTo (scrollLeft: any, scrollTop: any) {
    const $xeTable = this
    const internalData = $xeTable

    const { $refs } = this
    const { tableBody, tableHeader, leftBody, rightBody, tableFooter } = $refs
    const tableBodyElem = tableBody ? tableBody.$el : null
    const leftBodyElem = leftBody ? leftBody.$el : null
    const rightBodyElem = rightBody ? rightBody.$el : null
    const tableHeaderElem = tableHeader ? tableHeader.$el : null
    const tableFooterElem = tableFooter ? tableFooter.$el : null
    internalData.intoRunScroll = true
    if (XEUtils.isNumber(scrollLeft)) {
      const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
      if (xHandleEl) {
        setScrollLeft(xHandleEl, scrollLeft)
      } else {
        setScrollLeft(tableBodyElem, scrollLeft)
        setScrollLeft(tableHeaderElem, scrollLeft)
        setScrollLeft(tableFooterElem, scrollLeft)
      }
    }
    if (XEUtils.isNumber(scrollTop)) {
      const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
      if (yHandleEl) {
        setScrollTop(yHandleEl, scrollTop)
      } else {
        setScrollTop(tableBodyElem, scrollTop)
        setScrollTop(leftBodyElem, scrollTop)
        setScrollTop(rightBodyElem, scrollTop)
      }
    }
    if (this.scrollXLoad || this.scrollYLoad) {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          $xeTable.$nextTick(() => {
            internalData.intoRunScroll = false
            resolve()
          })
        })
      })
    }
    return this.$nextTick()
  },
  /**
   * 如果有滚动条，则滚动到对应的行
   * @param {Row} row 行对象
   * @param {ColumnInfo} column 列配置
   */
  scrollToRow (row: any, fieldOrColumn: any) {
    const $xeTable = this

    const rest = []
    if (row) {
      if (this.treeConfig) {
        rest.push(this.scrollToTreeRow(row))
      } else {
        rest.push(rowToVisible(this, row))
      }
    }
    if (fieldOrColumn) {
      rest.push(handleScrollToRowColumn($xeTable, fieldOrColumn, row))
    }
    return Promise.all(rest)
  },
  /**
   * 如果有滚动条，则滚动到对应的列
   * @param {ColumnInfo} column 列配置
   */
  scrollToColumn (fieldOrColumn: any) {
    const $xeTable = this

    return handleScrollToRowColumn($xeTable, fieldOrColumn)
  },
  /**
   * 对于树形结构中，可以直接滚动到指定深层节点中
   * 对于某些特定的场景可能会用到，比如定位到某一节点
   * @param {Row} row 行对象
   */
  scrollToTreeRow (row: any) {
    const { tableFullData, treeConfig, treeOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const rests: any[] = []
    if (treeConfig) {
      const matchObj = XEUtils.findTree(tableFullData, item => item === row, { children: childrenField })
      if (matchObj) {
        const nodes = matchObj.nodes
        nodes.forEach((row, index) => {
          if (index < nodes.length - 1 && !this.isTreeExpandByRow(row)) {
            rests.push(this.setTreeExpand(row, true))
          }
        })
      }
    }
    return Promise.all(rests).then(() => rowToVisible(this, row))
  },
  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll () {
    const $xeTable = this
    const internalData = $xeTable

    const { scrollXStore, scrollYStore } = internalData
    const tableBody = $xeTable.$refs.tableBody
    const tableHeader = $xeTable.$refs.tableHeader
    const tableFooter = $xeTable.$refs.tableFooter
    const leftBody = $xeTable.$refs.leftBody
    const rightBody = $xeTable.$refs.rightBody
    const leftBodyElem = leftBody ? leftBody.$el as HTMLDivElement : null
    const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
    const rightBodyElem = rightBody ? rightBody.$el as HTMLDivElement : null
    const tableHeaderElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
    const tableFooterElem = tableFooter ? tableFooter.$el as HTMLDivElement : null
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    if (xHandleEl) {
      setScrollLeft(xHandleEl, 0)
    } else {
      setScrollLeft(tableBodyElem, 0)
      setScrollLeft(tableHeaderElem, 0)
      setScrollLeft(tableFooterElem, 0)
    }
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    if (yHandleEl) {
      setScrollTop(yHandleEl, 0)
    } else {
      setScrollTop(tableBodyElem, 0)
      setScrollTop(leftBodyElem, 0)
      setScrollTop(rightBodyElem, 0)
    }
    scrollXStore.startIndex = 0
    scrollXStore.endIndex = scrollXStore.visibleSize
    scrollYStore.startIndex = 0
    scrollYStore.endIndex = scrollYStore.visibleSize
    return $xeTable.$nextTick().then(() => {
      setScrollLeft(tableBodyElem, 0)
      setScrollLeft(tableHeaderElem, 0)
      setScrollLeft(tableFooterElem, 0)

      setScrollTop(tableBodyElem, 0)
      setScrollTop(leftBodyElem, 0)
      setScrollTop(rightBodyElem, 0)
    })
  },
  /**
   * 更新表尾合计
   */
  updateFooter () {
    const { showFooter, visibleColumn, footerData, footerMethod } = this
    let footData = []
    if (showFooter && footerData && footerData.length) {
      footData = footerData.slice(0)
    } else if (showFooter && footerMethod) {
      footData = visibleColumn.length ? footerMethod({ columns: visibleColumn, data: this.afterFullData, $table: this, $grid: this.$xegrid }) : []
    }
    this.footerTableData = footData
    return this.$nextTick()
  },
  /**
   * 更新列状态 updateStatus({ row, column }, cellValue)
   * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
   * 如果单元格配置了校验规则，则会进行校验
   */
  updateStatus (slotParams: any, cellValue: any) {
    const customVal = !XEUtils.isUndefined(cellValue)
    return this.$nextTick().then(() => {
      const { $refs, editRules, validStore } = this
      const tableBody = $refs.tableBody
      if (slotParams && tableBody && editRules) {
        const { row, column } = slotParams
        const type = 'change'
        if (this.hasCellRules) {
          if (this.hasCellRules(type, row, column)) {
            const cell = this.getCellElement(row, column)
            if (cell) {
              return this.validCellRules(type, row, column, cellValue)
                .then(() => {
                  if (customVal && validStore.visible) {
                    setCellValue(row, column, cellValue)
                  }
                  this.clearValidate(row, column)
                })
                .catch(({ rule }: any) => {
                  if (customVal) {
                    setCellValue(row, column, cellValue)
                  }
                  this.showValidTooltip({ rule, row, column, cell })
                })
            }
          }
        }
      }
    })
  },
  handleDefaultMergeCells () {
    this.setMergeCells(this.mergeCells)
  },
  /**
   * 设置合并单元格
   * @param {TableMergeConfig[]} merges { row: Row|number, column: ColumnInfo|number, rowspan: number, colspan: number }
   */
  setMergeCells (merges: any) {
    if (this.spanMethod) {
      errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
    }
    setMerges(this, merges, this.mergeList, this.afterFullData)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      return this.updateStyle()
    })
  },
  /**
   * 移除单元格合并
   * @param {TableMergeConfig[]} merges 多个或数组 [{row:Row|number, col:ColumnInfo|number}]
   */
  removeMergeCells (merges: any) {
    if (this.spanMethod) {
      errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
    }
    const rest = removeMerges(this, merges, this.mergeList, this.afterFullData)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      this.updateStyle()
      return rest
    })
  },
  /**
   * 获取所有被合并的单元格
   */
  getMergeCells () {
    return this.mergeList.slice(0)
  },
  /**
   * 清除所有单元格合并
   */
  clearMergeCells () {
    this.mergeList = []
    return this.$nextTick().then(() => {
      return this.updateStyle()
    })
  },
  handleDefaultMergeFooterItems () {
    this.setMergeFooterItems(this.mergeFooterItems)
  },
  setMergeFooterItems (merges: any) {
    if (this.footerSpanMethod) {
      errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
    }
    setMerges(this, merges, this.mergeFooterList, null)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      return this.updateStyle()
    })
  },
  removeMergeFooterItems (merges: any) {
    if (this.footerSpanMethod) {
      errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
    }
    const rest = removeMerges(this, merges, this.mergeFooterList, null)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      this.updateStyle()
      return rest
    })
  },
  /**
   * 获取所有被合并的表尾
   */
  getMergeFooterItems () {
    return this.mergeFooterList.slice(0)
  },
  /**
   * 清除所有表尾合并
   */
  clearMergeFooterItems () {
    this.mergeFooterList = []
    return this.$nextTick().then(() => {
      return this.updateStyle()
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
    if (this.mouseConfig && this.mouseOpts.area && this.handleRecalculateCellAreas) {
      return this.handleRecalculateCellAreas()
    }
    return this.$nextTick()
  },
  dispatchEvent (type: ValueOf<VxeTableEmits>, params: Record<string, any>, evnt: Event | null) {
    const $xeTable = this
    $xeTable.$emit(type, createEvent(evnt, { $table: $xeTable, $grid: $xeTable.$xegrid }, params))
  },
  // 已废弃，使用 dispatchEvent
  emitEvent (type: any, params: any, evnt: any) {
    this.$emit(type, Object.assign({ $table: this, $grid: this.$xegrid, $event: evnt }, params))
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
const funcs = 'setFilter,openFilter,clearFilter,saveFilterPanel,resetFilterPanel,getCheckedFilters,updateFilterOptionStatus,closeMenu,setActiveCellArea,getActiveCellArea,getCellAreas,clearCellAreas,copyCellArea,cutCellArea,pasteCellArea,getCopyCellArea,getCopyCellAreas,clearCopyCellArea,setCellAreas,openFNR,openFind,openReplace,closeFNR,getSelectedCell,clearSelected,insert,insertAt,insertNextAt,insertChild,insertChildAt,insertChildNextAt,remove,removeCheckboxRow,removeRadioRow,removeCurrentRow,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearEdit,clearActived,getEditRecord,getActiveRecord,isEditByRow,isActiveByRow,setEditRow,setActiveRow,setEditCell,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,fullValidateField,validateField,openExport,closeExport,openPrint,closePrint,getPrintHtml,exportData,openImport,closeImport,importData,saveFile,readFile,importByFile,print,openCustom,closeCustom,saveCustom,cancelCustom,resetCustom,toggleCustomAllCheckbox,setCustomAllCheckbox'.split(',')

funcs.forEach(name => {
  Methods[name] = function (...args: any[]) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      if (!this[`_${name}`]) {
        if ('openExport,openPrint,exportData,openImport,importData,saveFile,readFile,importByFile,print'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableExportModule'])
        } else if ('fullValidate,validate'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableValidatorModule'])
        } else if ('setFilter,openFilter,clearFilter,getCheckedFilters'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableFilterModule'])
        } else if ('insert,insertAt,insertNextAt,remove,removeCheckboxRow,removeRadioRow,removeCurrentRow,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,getEditRecord,getActiveRecord,isEditByRow,isActiveByRow,setEditRow,setActiveRow,setEditCell,setActiveCell'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableEditModule'])
        } else if ('openCustom'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableCustomModule'])
        }
      }
    }
    return this[`_${name}`] ? this[`_${name}`](...args) : null
  }
})

export default Methods
