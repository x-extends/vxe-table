import { watch, reactive } from 'vue'
import XEUtils from 'xe-utils'
import { ColumnInfo } from './columnInfo'
import { isPx, isScale } from '../../ui/src/dom'

import type { VxeTableConstructor, VxeTablePrivateMethods, VxeTableDefines } from '../../../types'

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

export const convertHeaderColumnToRows = (originColumns: any): any[][] => {
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

export function restoreScrollLocation ($xeTable: VxeTableConstructor, scrollLeft: number, scrollTop: number) {
  const internalData = $xeTable.internalData

  return $xeTable.clearScroll().then(() => {
    if (scrollLeft || scrollTop) {
      // 重置最后滚动状态
      internalData.lastScrollLeft = 0
      internalData.lastScrollTop = 0

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
  })
}

/**
 * 生成行的唯一主键
 */
export function getRowUniqueId () {
  return XEUtils.uniqueId('row_')
}

// 行主键 key
export function getRowkey ($xeTable: VxeTableConstructor) {
  const { props } = $xeTable
  const { computeRowOpts } = $xeTable.getComputeMaps()
  const { rowId } = props
  const rowOpts = computeRowOpts.value
  return rowId || rowOpts.keyField || '_X_ROW_KEY'
}

// 行主键 value
export function getRowid ($xeTable: VxeTableConstructor, row: any) {
  const rowid = XEUtils.get(row, getRowkey($xeTable))
  if (XEUtils.eqNull(rowid)) {
    return ''
  }
  const type = typeof rowid
  return (type === 'number' || type === 'bigint') ? rowid : encodeURIComponent(rowid)
}

export interface XEColumnInstance {
  columnConfig: ColumnInfo;
}

export const handleFieldOrColumn = ($xeTable: VxeTableConstructor, fieldOrColumn: string | VxeTableDefines.ColumnInfo | null) => {
  if (fieldOrColumn) {
    return XEUtils.isString(fieldOrColumn) || XEUtils.isNumber(fieldOrColumn) ? $xeTable.getColumnByField(`${fieldOrColumn}`) : fieldOrColumn
  }
  return null
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

function getElementMarginWidth (elem: HTMLElement | null) {
  if (elem) {
    const computedStyle = getComputedStyle(elem)
    const marginLeft = XEUtils.toNumber(computedStyle.marginLeft)
    const marginRight = XEUtils.toNumber(computedStyle.marginRight)
    return elem.offsetWidth + marginLeft + marginRight
  }
  return 0
}

function queryCellElement (cell: HTMLTableCellElement, selector: string) {
  return cell.querySelector('.vxe-cell' + selector) as HTMLElement | null
}

export function toFilters (filters: any) {
  if (filters && XEUtils.isArray(filters)) {
    return filters.map(({ label, value, data, resetValue, checked }) => {
      return { label, value, data, resetValue, checked: !!checked, _checked: !!checked }
    })
  }
  return filters
}

export function toTreePathSeq (path: any[]) {
  return path.map((num, i) => i % 2 === 0 ? (Number(num) + 1) : '.').join('')
}

export function getCellValue (row: any, column: VxeTableDefines.ColumnInfo) {
  return XEUtils.get(row, column.field)
}

export function setCellValue (row: any, column: VxeTableDefines.ColumnInfo, value: any) {
  return XEUtils.set(row, column.field, value)
}

export function getRefElem (refEl: any) {
  if (refEl) {
    const rest = refEl.value
    if (rest) {
      return (rest.$el || rest) as HTMLElement
    }
  }
  return null
}

export function getCellHeight (height: number | 'unset' | undefined | null) {
  if (height === 'unset') {
    return 0
  }
  return height || 0
}

/**
 * 列宽拖动最大宽度
 * @param params
 * @returns
 */
export function getColReMaxWidth (params: {
  $table: VxeTableConstructor & VxeTablePrivateMethods;
  column: VxeTableDefines.ColumnInfo;
  columnIndex: number;
  $columnIndex: number;
  $rowIndex: number;
  cell: HTMLTableCellElement;
}) {
  const { $table } = params
  const { computeResizableOpts } = $table.getComputeMaps()
  const resizableOpts = computeResizableOpts.value
  const { maxWidth: reMaxWidth } = resizableOpts
  // 如果自定义调整宽度逻辑
  if (reMaxWidth) {
    const customMaxWidth = XEUtils.isFunction(reMaxWidth) ? reMaxWidth(params) : reMaxWidth
    if (customMaxWidth !== 'auto') {
      return Math.max(1, XEUtils.toNumber(customMaxWidth))
    }
  }
  return -1
}

/**
 * 列宽拖动最小宽度
 * @param params
 * @returns
 */
export function getColReMinWidth (params: {
  $table: VxeTableConstructor & VxeTablePrivateMethods;
  column: VxeTableDefines.ColumnInfo;
  columnIndex: number;
  $columnIndex: number;
  $rowIndex: number;
  cell: HTMLTableCellElement;
}) {
  const { $table, column, cell } = params
  const tableProps = $table.props
  const internalData = $table.internalData
  const { computeResizableOpts } = $table.getComputeMaps()
  const resizableOpts = computeResizableOpts.value
  const { minWidth: reMinWidth } = resizableOpts
  // 如果自定义调整宽度逻辑
  if (reMinWidth) {
    const customMinWidth = XEUtils.isFunction(reMinWidth) ? reMinWidth(params) : reMinWidth
    if (customMinWidth !== 'auto') {
      return Math.max(1, XEUtils.toNumber(customMinWidth))
    }
  }
  const { elemStore } = internalData
  const { showHeaderOverflow: allColumnHeaderOverflow } = tableProps
  const { showHeaderOverflow, minWidth: colMinWidth } = column
  const headOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
  const showEllipsis = headOverflow === 'ellipsis'
  const showTitle = headOverflow === 'title'
  const showTooltip = headOverflow === true || headOverflow === 'tooltip'
  const hasEllipsis = showTitle || showTooltip || showEllipsis
  const minTitleWidth = XEUtils.floor((XEUtils.toNumber(getComputedStyle(cell).fontSize) || 14) * 1.6)
  const paddingLeftRight = getPaddingLeftRightSize(cell) + getPaddingLeftRightSize(queryCellElement(cell, ''))
  let mWidth = minTitleWidth + paddingLeftRight
  // 默认最小宽处理
  if (hasEllipsis) {
    const dragIconWidth = getPaddingLeftRightSize(queryCellElement(cell, '>.vxe-cell--drag-handle'))
    const checkboxIconWidth = getPaddingLeftRightSize(queryCellElement(cell, '>.vxe-cell--checkbox'))
    const requiredIconWidth = getElementMarginWidth(queryCellElement(cell, '>.vxe-cell--required-icon'))
    const editIconWidth = getElementMarginWidth(queryCellElement(cell, '>.vxe-cell--edit-icon'))
    const prefixIconWidth = getElementMarginWidth(queryCellElement(cell, '>.vxe-cell-title-prefix-icon'))
    const suffixIconWidth = getElementMarginWidth(queryCellElement(cell, '>.vxe-cell-title-suffix-icon'))
    const sortIconWidth = getElementMarginWidth(queryCellElement(cell, '>.vxe-cell--sort'))
    const filterIconWidth = getElementMarginWidth(queryCellElement(cell, '>.vxe-cell--filter'))
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

export function isColumnInfo (column: any): column is ColumnInfo {
  return column && (column.constructor === ColumnInfo || column instanceof ColumnInfo)
}

export function createColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, options: VxeTableDefines.ColumnOptions | VxeTableDefines.ColumnInfo, renderOptions: any): any {
  return isColumnInfo(options) ? options : reactive(new ColumnInfo($xeTable, options, renderOptions))
}

export function watchColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, props: any, column: ColumnInfo) {
  Object.keys(props).forEach(name => {
    watch(() => props[name], (value: any) => {
      column.update(name, value)
      if ($xeTable) {
        if (name === 'filters') {
          $xeTable.setFilter(column as any, value)
          $xeTable.handleUpdateDataQueue()
        } else if (['visible', 'fixed', 'width', 'minWidth', 'maxWidth'].includes(name)) {
          $xeTable.handleRefreshColumnQueue()
        }
      }
    })
  })
}

export function assembleColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, elem: HTMLElement, column: ColumnInfo, colgroup: XEColumnInstance | null) {
  const { reactData } = $xeTable
  const { staticColumns } = reactData
  const parentElem = elem.parentNode
  const parentColumn = colgroup ? colgroup.columnConfig : null
  const parentCols = parentColumn ? parentColumn.children : staticColumns
  if (parentElem && parentCols) {
    parentCols.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, column)
    reactData.staticColumns = staticColumns.slice(0)
  }
}

export function destroyColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, column: ColumnInfo) {
  const { reactData } = $xeTable
  const { staticColumns } = reactData
  const matchObj = XEUtils.findTree(staticColumns, item => item.id === column.id, { children: 'children' })
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1)
  }
  reactData.staticColumns = staticColumns.slice(0)
}

export function getRootColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, column: ColumnInfo) {
  const { internalData } = $xeTable
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

const lineOffsetSizes = {
  mini: 3,
  small: 2,
  medium: 1
}

const countTreeExpand = (prevRow: any, params: VxeTableDefines.CellRenderBodyParams) => {
  let count = 1
  if (!prevRow) {
    return count
  }
  const { $table } = params
  const { computeTreeOpts } = $table.getComputeMaps()
  const treeOpts = computeTreeOpts.value
  const { transform, mapChildrenField } = treeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  const rowChildren = prevRow[transform ? mapChildrenField : childrenField]
  if (rowChildren && $table.isTreeExpandByRow(prevRow)) {
    for (let index = 0; index < rowChildren.length; index++) {
      count += countTreeExpand(rowChildren[index], params)
    }
  }
  return count
}

export const getOffsetSize = ($xeTable: VxeTableConstructor) => {
  const { computeSize } = $xeTable.getComputeMaps()
  const vSize = computeSize.value
  if (vSize) {
    return lineOffsetSizes[vSize] || 0
  }
  return 0
}

export function calcTreeLine (params: VxeTableDefines.CellRenderBodyParams, prevRow: any) {
  const { $table, row } = params
  const tableProps = $table.props
  const tableReactData = $table.reactData
  const tableInternalData = $table.internalData

  const { showOverflow } = tableProps
  const { scrollYLoad } = tableReactData
  const { fullAllDataRowIdData } = tableInternalData
  const { computeRowOpts, computeCellOpts, computeDefaultRowHeight } = $table.getComputeMaps()
  const rowOpts = computeRowOpts.value
  const cellOpts = computeCellOpts.value
  const defaultRowHeight = computeDefaultRowHeight.value
  const rowid = getRowid($table, row)
  const rowRest = fullAllDataRowIdData[rowid]
  const currCellHeight = rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
  let expandSize = 1
  if (prevRow) {
    expandSize = countTreeExpand(prevRow, params)
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

export function mergeBodyMethod (mergeList: VxeTableDefines.MergeItem[], _rowIndex: number, _columnIndex: number) {
  for (let mIndex = 0; mIndex < mergeList.length; mIndex++) {
    const { row: mergeRowIndex, col: mergeColIndex, rowspan: mergeRowspan, colspan: mergeColspan } = mergeList[mIndex]
    if (mergeColIndex > -1 && mergeRowIndex > -1 && mergeRowspan && mergeColspan) {
      if (mergeRowIndex === _rowIndex && mergeColIndex === _columnIndex) {
        return { rowspan: mergeRowspan, colspan: mergeColspan }
      }
      if (_rowIndex >= mergeRowIndex && _rowIndex < mergeRowIndex + mergeRowspan && _columnIndex >= mergeColIndex && _columnIndex < mergeColIndex + mergeColspan) {
        return { rowspan: 0, colspan: 0 }
      }
    }
  }
}

export function clearTableDefaultStatus ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const { props, internalData } = $xeTable
  internalData.initStatus = false
  $xeTable.clearSort()
  $xeTable.clearCurrentRow()
  $xeTable.clearCurrentColumn()
  $xeTable.clearRadioRow()
  $xeTable.clearRadioReserve()
  $xeTable.clearCheckboxRow()
  $xeTable.clearCheckboxReserve()
  $xeTable.clearRowExpand()
  $xeTable.clearTreeExpand()
  $xeTable.clearTreeExpandReserve()
  $xeTable.clearPendingRow()
  if ($xeTable.clearFilter) {
    $xeTable.clearFilter()
  }
  if ($xeTable.clearSelected && (props.keyboardConfig || props.mouseConfig)) {
    $xeTable.clearSelected()
  }
  if ($xeTable.clearCellAreas && props.mouseConfig) {
    $xeTable.clearCellAreas()
    $xeTable.clearCopyCellArea()
  }
  return $xeTable.clearScroll()
}

export function clearTableAllStatus ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  if ($xeTable.clearFilter) {
    $xeTable.clearFilter()
  }
  return clearTableDefaultStatus($xeTable)
}

export function rowToVisible ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, row: any) {
  const tableProps = $xeTable.props
  const reactData = $xeTable.reactData
  const internalData = $xeTable.internalData

  const { computeLeftFixedWidth, computeRightFixedWidth, computeRowOpts, computeCellOpts, computeDefaultRowHeight } = $xeTable.getComputeMaps()
  const { showOverflow } = tableProps
  const { scrollYLoad } = reactData
  const { elemStore, afterFullData, fullAllDataRowIdData, isResizeCellHeight } = internalData
  const rowOpts = computeRowOpts.value
  const cellOpts = computeCellOpts.value
  const defaultRowHeight = computeDefaultRowHeight.value
  const leftFixedWidth = computeLeftFixedWidth.value
  const rightFixedWidth = computeRightFixedWidth.value
  const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
  const rowid = getRowid($xeTable, row)
  if (bodyScrollElem) {
    const bodyHeight = bodyScrollElem.clientHeight
    const bodyScrollTop = bodyScrollElem.scrollTop
    const trElem: HTMLTableRowElement | null = bodyScrollElem.querySelector(`[rowid="${rowid}"]`)
    if (trElem) {
      const trOffsetParent = trElem.offsetParent as HTMLElement
      const trOffsetTop = trElem.offsetTop + (trOffsetParent ? trOffsetParent.offsetTop : 0)
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
        const rowRest = fullAllDataRowIdData[rowid] || {}
        const rHeight = rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
        for (let i = 0; i < afterFullData.length; i++) {
          const currRow = afterFullData[i]
          const currRowid = getRowid($xeTable, currRow)
          if (currRow === row || currRowid === rowid) {
            break
          }
          const currRowRest = fullAllDataRowIdData[currRowid] || {}
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
  const reactData = $xeTable.reactData
  const internalData = $xeTable.internalData

  const { computeLeftFixedWidth, computeRightFixedWidth } = $xeTable.getComputeMaps()
  const { scrollXLoad } = reactData
  const { elemStore, visibleColumn } = internalData
  const leftFixedWidth = computeLeftFixedWidth.value
  const rightFixedWidth = computeRightFixedWidth.value
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
      const tdOffsetParent = tdElem.offsetParent as HTMLElement
      const tdOffsetLeft = tdElem.offsetLeft + (tdOffsetParent ? tdOffsetParent.offsetLeft : 0)
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
