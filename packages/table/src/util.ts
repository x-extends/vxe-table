import XEUtils from 'xe-utils'
import { ColumnInfo } from './columnInfo'
import { isScale, isPx, queryElement } from '../../ui/src/dom'
import { warnLog, errLog } from '../../ui/src/log'
import { eqEmptyValue } from '../../ui/src/utils'

import type { VxeTableDefines, VxeTableConstructor, TableReactData, TableInternalData, VxeTablePrivateMethods, VxeTablePropTypes } from '../../../types'

export function createInternalData (): TableInternalData {
  return {
    tZindex: 0,
    currKeyField: '',
    isCurrDeepKey: false,
    elemStore: {},
    // 存放横向 X 虚拟滚动相关的信息
    scrollXStore: {
      preloadSize: 0,
      offsetSize: 0,
      visibleSize: 0,
      visibleStartIndex: 0,
      visibleEndIndex: 0,
      startIndex: 0,
      endIndex: 0
    },
    // 存放纵向 Y 虚拟滚动相关信息
    scrollYStore: {
      preloadSize: 0,
      offsetSize: 0,
      visibleSize: 0,
      visibleStartIndex: 0,
      visibleEndIndex: 0,
      startIndex: 0,
      endIndex: 0
    },
    // 表格宽度
    tableWidth: 0,
    // 表格高度
    tableHeight: 0,
    customHeight: 0,
    customMinHeight: 0,
    customMaxHeight: 0,
    // 当前 hover 行
    hoverRow: null,
    // 最后滚动位置
    lastScrollLeft: 0,
    lastScrollTop: 0,
    // 单选框属性，已选中保留的行
    radioReserveRow: null,
    // 复选框属性，已选中保留的行集合
    checkboxReserveRowMap: {},
    // 行数据，已展开保留的行集合
    rowExpandedReserveRowMap: {},
    // 树结构数据，已展开保留的行集合
    treeExpandedReserveRowMap: {},
    // 树结构数据，不确定状态的集合
    treeIndeterminateRowMaps: {},
    // 列表完整数据、条件处理后
    tableFullData: [],
    afterFullData: [],
    afterTreeFullData: [],
    afterGroupFullData: [],
    // 列表条件处理后数据集合
    afterFullRowMaps: {},
    // 树结构完整数据、条件处理后
    tableFullTreeData: [],
    // 行分组全量数据、条件处理后
    tableFullGroupData: [],
    tableSynchData: [],
    tableSourceData: [],
    // 收集的列配置（带分组）
    collectColumn: [],
    // 完整所有列（不带分组）
    tableFullColumn: [],
    // 渲染所有列
    visibleColumn: [],

    // 全量数据集（包括当前和已删除）
    fullAllDataRowIdData: {},
    // 数据集（仅当前）
    fullDataRowIdData: {},
    // 数据集（仅可视）
    visibleDataRowIdData: {},
    // 渲染中缓存数据
    sourceDataRowIdData: {},
    fullColumnIdData: {},
    fullColumnFieldData: {},

    // 合并表头单元格的数据
    mergeHeaderList: [],
    mergeHeaderMaps: {},
    // 已合并单元格数据集合
    mergeHeaderCellMaps: {},
    // 合并单元格的数据
    mergeBodyList: [],
    mergeBodyMaps: {},
    // 已合并单元格数据集合
    mergeBodyCellMaps: {},
    // 合并表尾的数据
    mergeFooterList: [],
    mergeFooterMaps: {},
    // 已合并表尾数据集合
    mergeFooterCellMaps: {},

    // 已展开的行集合
    rowExpandedMaps: {},
    // 懒加载中的展开行的集合
    rowExpandLazyLoadedMaps: {},
    // 已展开的分组行
    rowGroupExpandedMaps: {},
    // 已展开树节点集合
    treeExpandedMaps: {},
    // 懒加载中的树节点的集合
    treeExpandLazyLoadedMaps: {},
    // 复选框属性，已选中的行集合
    selectCheckboxMaps: {},
    // 已标记的对象集
    pendingRowMaps: {},
    // 已新增的临时行
    insertRowMaps: {},
    // 已删除行
    removeRowMaps: {},

    cvCacheMaps: {},

    // 表头高度
    tHeaderHeight: 0,
    // 表体高度
    tBodyHeight: 0,
    // 表尾高度
    tFooterHeight: 0,

    teleportToWrapperElem: null,
    popupToWrapperElem: null,

    inited: false,
    tooltipTimeout: null,
    initStatus: false,
    isActivated: false
  }
}

const getAllConvertColumns = (columns: any, parentColumn?: any) => {
  const result: any[] = []
  columns.forEach((column: any) => {
    column.parentId = parentColumn ? parentColumn.id : null
    if (column.visible) {
      if (column.children && column.children.length && column.children.some((column: any) => column.visible)) {
        result.push(column)
        result.push(...getAllConvertColumns(column.children, column))
      } else {
        result.push(column)
      }
    }
  })
  return result
}

export const convertHeaderColumnToRows = (originColumns: any) => {
  let maxLevel = 1
  const traverse = (column: any, parent?: any) => {
    if (parent) {
      column.level = parent.level + 1
      if (maxLevel < column.level) {
        maxLevel = column.level
      }
    }
    if (column.children && column.children.length && column.children.some((column: any) => column.visible)) {
      let colSpan = 0
      column.children.forEach((subColumn: any) => {
        if (subColumn.visible) {
          traverse(subColumn, column)
          colSpan += subColumn.colSpan
        }
      })
      column.colSpan = colSpan
    } else {
      column.colSpan = 1
    }
  }

  originColumns.forEach((column: any) => {
    column.level = 1
    traverse(column)
  })

  const rows: any[] = []
  for (let i = 0; i < maxLevel; i++) {
    rows.push([])
  }

  const allColumns = getAllConvertColumns(originColumns)

  allColumns.forEach((column) => {
    if (column.children && column.children.length && column.children.some((column: any) => column.visible)) {
      column.rowSpan = 1
    } else {
      column.rowSpan = maxLevel - column.level + 1
    }
    rows[column.level - 1].push(column)
  })

  return rows
}

export function convertHeaderToGridRows (spanColumns: VxeTableDefines.ColumnInfo[][]) {
  const rSize = spanColumns.length
  const cSize = spanColumns[0].reduce((sum, cell) => sum + cell.colSpan, 0)

  const occupiedRows: boolean[][] = []
  const fullRows: any[][] = []
  for (let rIndex = 0; rIndex < rSize; rIndex++) {
    const oCols: boolean[] = []
    const dCols: string[] = []
    for (let cIndex = 0; cIndex < cSize; cIndex++) {
      oCols.push(false)
      dCols.push('')
    }
    occupiedRows.push(oCols)
    fullRows.push(dCols)
  }

  for (let rIndex = 0; rIndex < rSize; rIndex++) {
    let currColIndex = 0
    for (const column of spanColumns[rIndex]) {
      const { colSpan, rowSpan } = column
      let startColIndex = -1
      for (let ccIndex = currColIndex; ccIndex <= cSize - colSpan; ccIndex++) {
        let oFlag = true
        for (let csIndex = 0; csIndex < colSpan; csIndex++) {
          if (occupiedRows[rIndex][ccIndex + csIndex]) {
            oFlag = false
            break
          }
        }
        if (oFlag) {
          startColIndex = ccIndex
          break
        }
      }
      if (startColIndex === -1) {
        for (let j = 0; j <= cSize - colSpan; j++) {
          let oFlag = true
          for (let k = 0; k < colSpan; k++) {
            if (occupiedRows[rIndex][j + k]) {
              oFlag = false
              break
            }
          }
          if (oFlag) {
            startColIndex = j
            break
          }
        }
        if (startColIndex === -1) {
          // error
          break
        }
      }

      for (let srIndex = rIndex; srIndex < rIndex + rowSpan; srIndex++) {
        for (let scIndex = startColIndex; scIndex < startColIndex + colSpan; scIndex++) {
          occupiedRows[srIndex][scIndex] = true
          fullRows[srIndex][scIndex] = column
        }
      }
      currColIndex = startColIndex + colSpan
    }
  }
  return fullRows
}

export function restoreScrollLocation ($xeTable: VxeTableConstructor, scrollLeft: number, scrollTop: number) {
  const internalData = $xeTable as unknown as TableInternalData

  if (scrollLeft || scrollTop) {
    internalData.intoRunScroll = false
    internalData.inVirtualScroll = false
    internalData.inWheelScroll = false
    internalData.inHeaderScroll = false
    internalData.inBodyScroll = false
    internalData.inFooterScroll = false
    internalData.scrollRenderType = ''
    // 还原滚动状态
    return $xeTable.scrollTo(scrollLeft, scrollTop)
  }
  return $xeTable.clearScroll()
}

export function toTreePathSeq (path: any) {
  return path.map((num: any, i: any) => i % 2 === 0 ? (Number(num) + 1) : '.').join('')
}

/**
 * 生成行的唯一主键
 */
export function getRowUniqueId () {
  return XEUtils.uniqueId('row_')
}

export function hasDeepKey (rowKey: string) {
  return rowKey.indexOf('.') > -1
}

// 行主键 key
export function getRowkey ($xeTable: VxeTableConstructor) {
  const internalData = $xeTable as unknown as TableInternalData
  const { currKeyField } = internalData
  return currKeyField
}

// 行主键 value
export function getRowid ($xeTable: VxeTableConstructor, row: any) {
  const internalData = $xeTable as unknown as TableInternalData
  const { isCurrDeepKey, currKeyField } = internalData
  return row ? encodeRowid((isCurrDeepKey ? getDeepRowIdByKey : getFastRowIdByKey)(row, currKeyField)) : ''
}

export function createHandleUpdateRowId ($xeTable: VxeTableConstructor) {
  const internalData = $xeTable as unknown as TableInternalData
  const { isCurrDeepKey, currKeyField } = internalData
  const updateRId = isCurrDeepKey ? updateDeepRowKey : updateFastRowKey
  return {
    rowKey: currKeyField,
    handleUpdateRowId (row: any) {
      return row ? updateRId(row, currKeyField) : ''
    }
  }
}

export function createHandleGetRowId ($xeTable: VxeTableConstructor) {
  const internalData = $xeTable as unknown as TableInternalData
  const { isCurrDeepKey, currKeyField } = internalData
  const getRId = isCurrDeepKey ? getDeepRowIdByKey : getFastRowIdByKey
  return {
    rowKey: currKeyField,
    handleGetRowId (row: any) {
      return row ? encodeRowid(getRId(row, currKeyField)) : ''
    }
  }
}

// 编码行主键
export function encodeRowid (rowVal: string) {
  return XEUtils.eqNull(rowVal) ? '' : encodeURIComponent(rowVal)
}

function getDeepRowIdByKey (row: any, rowKey: string) {
  return XEUtils.get(row, rowKey)
}

export function updateDeepRowKey (row: any, rowKey: string) {
  let rowid = encodeRowid(getDeepRowIdByKey(row, rowKey))
  if (eqEmptyValue(rowid)) {
    rowid = getRowUniqueId()
    XEUtils.set(row, rowKey, rowid)
  }
  return rowid
}

function getFastRowIdByKey (row: any, rowKey: string) {
  return row[rowKey]
}

export function updateFastRowKey (row: any, rowKey: string) {
  let rowid = encodeRowid(getFastRowIdByKey(row, rowKey))
  if (eqEmptyValue(rowid)) {
    rowid = getRowUniqueId()
    row[rowKey] = rowid
  }
  return rowid
}

function getPaddingLeftRightSize (elem: HTMLElement | null) {
  if (elem) {
    const computedStyle = getComputedStyle(elem)
    const paddingLeft = XEUtils.toNumber(computedStyle.paddingLeft)
    const paddingRight = XEUtils.toNumber(computedStyle.paddingRight)
    return paddingLeft + paddingRight
  }
  return 0
}

function getElementMarginAndWidth (elem: HTMLElement | null) {
  if (elem) {
    const computedStyle = getComputedStyle(elem)
    const marginLeft = XEUtils.toNumber(computedStyle.marginLeft)
    const marginRight = XEUtils.toNumber(computedStyle.marginRight)
    return elem.offsetWidth + marginLeft + marginRight
  }
  return 0
}

export function getCalcHeight (height: number | 'unset' | undefined | null) {
  if (height === 'unset') {
    return 0
  }
  return height || 0
}

export function handleFieldOrColumn ($xeTable: VxeTableConstructor, fieldOrColumn: any) {
  if (fieldOrColumn) {
    return XEUtils.isString(fieldOrColumn) || XEUtils.isNumber(fieldOrColumn) ? $xeTable.getColumnByField(`${fieldOrColumn}`) : fieldOrColumn
  }
  return null
}

export function handleRowidOrRow ($xeTable: VxeTableConstructor, rowidOrRow: any) {
  if (rowidOrRow) {
    const rowid = XEUtils.isString(rowidOrRow) || XEUtils.isNumber(rowidOrRow) ? rowidOrRow : getRowid($xeTable, rowidOrRow)
    return $xeTable.getRowById(rowid)
  }
  return null
}

export function getCellRestHeight (rowRest: VxeTableDefines.RowCacheItem, cellOpts: VxeTablePropTypes.CellConfig, rowOpts: VxeTablePropTypes.RowConfig, defaultRowHeight: number) {
  return rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
}

// 组装列配置
export function assembleColumn (_vm: any) {
  const $xeTable = _vm.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
  const reactData = $xeTable as unknown as TableReactData
  const { staticColumns } = reactData

  const { $el, $xeColumn, columnConfig } = _vm
  const groupConfig = $xeColumn ? $xeColumn.columnConfig : null
  if (groupConfig) {
    if ($xeColumn.$options._componentTag === 'vxe-table-column') {
      errLog('vxe.error.groupTag', [`<vxe-table-colgroup title=${$xeColumn.title} ...>`, `<vxe-table-column title=${$xeColumn.title} ...>`])
    } else if ($xeColumn.$options._componentTag === 'vxe-column') {
      warnLog('vxe.error.groupTag', [`<vxe-colgroup title=${$xeColumn.title} ...>`, `<vxe-column title=${$xeColumn.title} ...>`])
    }
    if (!groupConfig.children) {
      groupConfig.children = []
    }
    columnConfig.defaultParentId = groupConfig.id
    groupConfig.children.splice(XEUtils.arrayIndexOf($xeColumn.$el.children, $el), 0, columnConfig)
  } else {
    staticColumns.splice(XEUtils.arrayIndexOf(($xeTable.$refs.hideColumn as any).children, $el), 0, columnConfig)
  }
}

// 销毁列
export function destroyColumn (_vm: any) {
  const $xeTable = _vm.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
  const reactData = $xeTable as unknown as TableReactData
  const { staticColumns } = reactData

  const { columnConfig } = _vm
  const matchObj = XEUtils.findTree(staticColumns, column => column === columnConfig)
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1)
  }
}

export function getRootColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, column: any) {
  const internalData = $xeTable as unknown as TableInternalData

  const { fullColumnIdData } = internalData
  if (!column) {
    return null
  }
  let parentColId = column.parentId
  while (fullColumnIdData[parentColId]) {
    const column = fullColumnIdData[parentColId].column
    parentColId = column.parentId
    if (!parentColId) {
      return column
    }
  }
  return column
}

export function toFilters (filters: any, colid?: string) {
  if (filters) {
    if (XEUtils.isArray(filters)) {
      return filters.map(({ label, value, data, resetValue, checked }) => {
        return { label, value, data, resetValue, checked: !!checked, _checked: !!checked, _colId: colid }
      })
    }
    return []
  }
  return filters
}

export function getColReMinWidth (params: any) {
  const { $table, column, cell } = params
  const internalData = $table
  const { showHeaderOverflow: allColumnHeaderOverflow, resizableOpts } = $table
  const { minWidth } = resizableOpts
  // 如果自定义调整宽度逻辑
  if (minWidth) {
    const customMinWidth = XEUtils.isFunction(minWidth) ? minWidth(params) : minWidth
    if (customMinWidth !== 'auto') {
      return Math.max(1, XEUtils.toNumber(customMinWidth))
    }
  }
  const { elemStore } = internalData
  const { showHeaderOverflow, minWidth: colMinWidth } = column
  const headOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
  const showEllipsis = headOverflow === 'ellipsis'
  const showTitle = headOverflow === 'title'
  const showTooltip = headOverflow === true || headOverflow === 'tooltip'
  const hasEllipsis = showTitle || showTooltip || showEllipsis
  const minTitleWidth = XEUtils.floor((XEUtils.toNumber(getComputedStyle(cell).fontSize) || 14) * 1.8)
  const paddingLeftRight = getPaddingLeftRightSize(cell) + getPaddingLeftRightSize(queryElement(cell, '.vxe-cell'))
  let mWidth = minTitleWidth + paddingLeftRight
  // 默认最小宽处理
  if (hasEllipsis) {
    const dragIconWidth = getElementMarginAndWidth(queryElement(cell, '.vxe-cell--drag-handle'))
    const checkboxIconWidth = getElementMarginAndWidth(queryElement(cell, '.vxe-cell--checkbox'))
    const requiredIconWidth = getElementMarginAndWidth(queryElement(cell, '.vxe-cell--required-icon'))
    const editIconWidth = getElementMarginAndWidth(queryElement(cell, '.vxe-cell--edit-icon'))
    const prefixIconWidth = getElementMarginAndWidth(queryElement(cell, '.vxe-cell-title-prefix-icon'))
    const suffixIconWidth = getElementMarginAndWidth(queryElement(cell, '.vxe-cell-title-suffix-icon'))
    const sortIconWidth = getElementMarginAndWidth(queryElement(cell, '.vxe-cell--sort'))
    const filterIconWidth = getElementMarginAndWidth(queryElement(cell, '.vxe-cell--filter'))
    mWidth += dragIconWidth + checkboxIconWidth + requiredIconWidth + editIconWidth + prefixIconWidth + suffixIconWidth + filterIconWidth + sortIconWidth
  }
  // 如果设置最小宽
  if (colMinWidth) {
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    if (bodyScrollElem) {
      if (isScale(colMinWidth)) {
        const bodyWidth = bodyScrollElem.clientWidth - 1
        const meanWidth = bodyWidth / 100
        return Math.max(mWidth, Math.floor(XEUtils.toInteger(colMinWidth) * meanWidth))
      } else if (isPx(colMinWidth)) {
        return Math.max(mWidth, XEUtils.toInteger(colMinWidth))
      }
    }
  }
  return mWidth
}

export function getFirstChildColumn (column: VxeTableDefines.ColumnInfo): VxeTableDefines.ColumnInfo {
  const { children } = column
  if (children && children.length) {
    return getFirstChildColumn(XEUtils.first(children))
  }
  return column
}

export function getLastChildColumn (column: VxeTableDefines.ColumnInfo): VxeTableDefines.ColumnInfo {
  const { children } = column
  if (children && children.length) {
    return getFirstChildColumn(XEUtils.last(children))
  }
  return column
}

const lineOffsetSizes: Record<string, any> = {
  mini: 3,
  small: 2,
  medium: 1,
  large: 0
}

function countTreeExpandSize (prevRow: any, params: VxeTableDefines.CellRenderBodyParams) {
  let count = 1
  if (!prevRow) {
    return count
  }
  const { $table } = params
  const reactData = $table as unknown as TableReactData
  const { treeExpandedFlag } = reactData
  const internalData = $table as unknown as TableInternalData
  const { treeExpandedMaps } = internalData
  const treeOpts = $table.computeTreeOpts
  const { transform, mapChildrenField } = treeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  const rowChildren = prevRow[transform ? mapChildrenField : childrenField]
  if (rowChildren && treeExpandedFlag && treeExpandedMaps[getRowid($table, prevRow)]) {
    for (let index = 0; index < rowChildren.length; index++) {
      count += countTreeExpandSize(rowChildren[index], params)
    }
  }
  return count
}

export function getOffsetSize ($xeTable: VxeTableConstructor) {
  const vSize = $xeTable.computeSize
  if (vSize) {
    return lineOffsetSizes[vSize] || 0
  }
  return 0
}

export function calcTreeLine (params: VxeTableDefines.CellRenderBodyParams, prevRow: any) {
  const { $table, row } = params
  const tableProps = $table
  const tableReactData = $table as unknown as TableReactData
  const tableInternalData = $table as unknown as TableInternalData

  const { showOverflow } = tableProps
  const { scrollYLoad } = tableReactData
  const { fullAllDataRowIdData } = tableInternalData
  const rowOpts = $table.computeRowOpts
  const cellOpts = $table.computeCellOpts
  const defaultRowHeight = $table.computeDefaultRowHeight
  const rowid = getRowid($table, row)
  const rowRest = fullAllDataRowIdData[rowid]
  const currCellHeight = rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
  let expandSize = 1
  if (prevRow) {
    expandSize = countTreeExpandSize(prevRow, params)
  }
  let cellHeight = currCellHeight
  const vnHeight = rowRest.height
  if (scrollYLoad) {
    if (!showOverflow) {
      cellHeight = vnHeight || currCellHeight
    }
  }
  return cellHeight * expandSize - (prevRow ? 1 : (12 - getOffsetSize($table)))
}

export function getCellValue (row: any, column: any) {
  return XEUtils.get(row, column.field)
}

export function setCellValue (row: any, column:any, value: any) {
  return XEUtils.set(row, column.field, value)
}

export function getRefElem (refEl: any) {
  if (refEl) {
    return (refEl.$el || refEl) as HTMLElement
  }
  return null
}

export function clearTableDefaultStatus ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const internalData = $xeTable as unknown as TableInternalData

  internalData.initStatus = false
  const actionList = [
    $xeTable.clearSort(),
    $xeTable.clearCurrentRow(),
    $xeTable.clearCurrentColumn(),
    $xeTable.clearRadioRow(),
    $xeTable.clearRadioReserve(),
    $xeTable.clearCheckboxRow(),
    $xeTable.clearCheckboxReserve(),
    $xeTable.clearRowExpand(),
    $xeTable.clearTreeExpand(),
    $xeTable.clearTreeExpandReserve(),
    $xeTable.clearPendingRow()
  ]
  if ($xeTable.clearFilter) {
    actionList.push(
      $xeTable.clearFilter()
    )
  }
  if ($xeTable.clearSelected && (props.keyboardConfig || props.mouseConfig)) {
    actionList.push(
      $xeTable.clearSelected()
    )
  }
  if ($xeTable.clearCellAreas && props.mouseConfig) {
    actionList.push(
      $xeTable.clearCellAreas(),
      $xeTable.clearCopyCellArea()
    )
  }
  return Promise.all(actionList).then(() => {
    return $xeTable.clearScroll()
  })
}

export function clearTableAllStatus (_vm: any) {
  if (_vm.clearFilter) {
    _vm.clearFilter()
  }
  return clearTableDefaultStatus(_vm)
}

export function isColumnInfo (column: any) {
  return column instanceof ColumnInfo
}

// 获取所有的列，排除分组
export function getColumnList (columns: VxeTableDefines.ColumnInfo[]) {
  const result: VxeTableDefines.ColumnInfo[] = []
  columns.forEach((column) => {
    result.push(...(column.children && column.children.length ? getColumnList(column.children) : [column]))
  })
  return result
}

export function createColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, options: any, renderOptions: any): any {
  return isColumnInfo(options) ? options : new ColumnInfo($xeTable, options, renderOptions)
}

export function rowToVisible ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, row: any) {
  const tableProps = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { showOverflow } = tableProps
  const { scrollYLoad, scrollYTop } = reactData
  const { elemStore, afterFullData, fullAllDataRowIdData, isResizeCellHeight } = internalData
  const rowOpts = $xeTable.computeRowOpts
  const cellOpts = $xeTable.computeCellOpts
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
  const leftFixedWidth = $xeTable.computeLeftFixedWidth
  const rightFixedWidth = $xeTable.computeRightFixedWidth
  const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
  const rowid = getRowid($xeTable, row)
  if (bodyScrollElem) {
    const bodyHeight = bodyScrollElem.clientHeight
    const bodyScrollTop = bodyScrollElem.scrollTop
    const trElem: HTMLTableRowElement | null = bodyScrollElem.querySelector(`[rowid="${rowid}"]`)
    if (trElem) {
      const trOffsetTop = trElem.offsetTop + (scrollYLoad ? scrollYTop : 0)
      const trHeight = trElem.clientHeight
      // 检测行是否在可视区中
      if (trOffsetTop < bodyScrollTop || trOffsetTop > bodyScrollTop + bodyHeight) {
        return $xeTable.scrollTo(null, trOffsetTop)
      } else if (trOffsetTop + trHeight >= bodyHeight + bodyScrollTop) {
        return $xeTable.scrollTo(null, bodyScrollTop + trHeight)
      }
    } else {
      // 如果是虚拟渲染滚动
      if (scrollYLoad) {
        const isCustomCellHeight = isResizeCellHeight || cellOpts.height || rowOpts.height
        if (!isCustomCellHeight && showOverflow) {
          return $xeTable.scrollTo(null, ($xeTable.findRowIndexOf(afterFullData, row) - 1) * defaultRowHeight)
        }
        let scrollTop = 0
        const rowRest = fullAllDataRowIdData[rowid]
        const rHeight = rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
        for (let i = 0; i < afterFullData.length; i++) {
          const currRow = afterFullData[i]
          const currRowid = getRowid($xeTable, currRow)
          if (currRow === row || currRowid === rowid) {
            break
          }
          const currRowRest = fullAllDataRowIdData[currRowid]
          scrollTop += currRowRest.resizeHeight || cellOpts.height || rowOpts.height || currRowRest.height || defaultRowHeight
        }
        if (scrollTop < bodyScrollTop) {
          return $xeTable.scrollTo(null, scrollTop - leftFixedWidth - 1)
        }
        return $xeTable.scrollTo(null, (scrollTop + rHeight) - (bodyHeight - rightFixedWidth - 1))
      }
    }
  }
  return Promise.resolve()
}

export function colToVisible ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo, row?: any) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { scrollXLoad, scrollXLeft } = reactData
  const { elemStore, visibleColumn } = internalData
  const leftFixedWidth = $xeTable.computeLeftFixedWidth
  const rightFixedWidth = $xeTable.computeRightFixedWidth
  const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
  if (column.fixed) {
    return Promise.resolve()
  }
  if (bodyScrollElem) {
    const bodyWidth = bodyScrollElem.clientWidth
    const bodyScrollLeft = bodyScrollElem.scrollLeft
    let tdElem: HTMLTableCellElement | null = null
    if (row) {
      const rowid = getRowid($xeTable, row)
      tdElem = bodyScrollElem.querySelector(`[rowid="${rowid}"] .${column.id}`)
    }
    if (!tdElem) {
      tdElem = bodyScrollElem.querySelector(`.${column.id}`)
    }
    if (tdElem) {
      const tdOffsetLeft = tdElem.offsetLeft + (scrollXLoad ? scrollXLeft : 0)
      const cellWidth = tdElem.clientWidth
      // 检测是否在可视区中
      if (tdOffsetLeft < (bodyScrollLeft + leftFixedWidth)) {
        return $xeTable.scrollTo(tdOffsetLeft - leftFixedWidth - 1)
      } else if ((tdOffsetLeft + cellWidth - bodyScrollLeft) > (bodyWidth - rightFixedWidth)) {
        return $xeTable.scrollTo((tdOffsetLeft + cellWidth) - (bodyWidth - rightFixedWidth - 1))
      }
    } else {
      // 检测是否在虚拟渲染可视区中
      if (scrollXLoad) {
        let scrollLeft = 0
        const cellWidth = column.renderWidth
        for (let i = 0; i < visibleColumn.length; i++) {
          const currCol = visibleColumn[i]
          if (currCol === column || currCol.id === column.id) {
            break
          }
          scrollLeft += currCol.renderWidth
        }
        if (scrollLeft < bodyScrollLeft) {
          return $xeTable.scrollTo(scrollLeft - leftFixedWidth - 1)
        }
        return $xeTable.scrollTo((scrollLeft + cellWidth) - (bodyWidth - rightFixedWidth - 1))
      }
    }
  }
  return Promise.resolve()
}
