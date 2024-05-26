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

export interface XEBodyScrollElement extends HTMLDivElement {
  _onscroll: ((evnt: Event) => void) | null;
}

export function restoreScrollLocation ($xeTable: VxeTableConstructor, scrollLeft: number, scrollTop: number) {
  const { internalData } = $xeTable
  return $xeTable.clearScroll().then(() => {
    if (scrollLeft || scrollTop) {
      // 重置最后滚动状态
      internalData.lastScrollLeft = 0
      internalData.lastScrollTop = 0
      // 还原滚动状态
      return $xeTable.scrollTo(scrollLeft, scrollTop)
    }
  })
}

export function removeScrollListener (scrollElem: XEBodyScrollElement | null) {
  if (scrollElem && scrollElem._onscroll) {
    scrollElem.onscroll = null
  }
}

export function restoreScrollListener (scrollElem: XEBodyScrollElement | null) {
  if (scrollElem && scrollElem._onscroll) {
    scrollElem.onscroll = scrollElem._onscroll
  }
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
  return XEUtils.eqNull(rowid) ? '' : encodeURIComponent(rowid)
}

export interface XEColumnInstance {
  column: ColumnInfo;
}

export const handleFieldOrColumn = ($xeTable: VxeTableConstructor, fieldOrColumn: string | VxeTableDefines.ColumnInfo | null) => {
  if (fieldOrColumn) {
    return XEUtils.isString(fieldOrColumn) ? $xeTable.getColumnByField(fieldOrColumn) : fieldOrColumn
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

function getElemenMarginWidth (elem: HTMLElement | null) {
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
  const { props: tableProps } = $table
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
    const checkboxIconWidth = getPaddingLeftRightSize(queryCellElement(cell, '--title>.vxe-cell--checkbox'))
    const requiredIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--required-icon'))
    const editIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--edit-icon'))
    const prefixIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell-title-prefix-icon'))
    const suffixIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell-title-suffix-icon'))
    const sortIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--sort'))
    const filterIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--filter'))
    mWidth += checkboxIconWidth + requiredIconWidth + editIconWidth + prefixIconWidth + suffixIconWidth + filterIconWidth + sortIconWidth
  }
  // 如果设置最小宽
  if (colMinWidth) {
    const { refTableBody } = $table.getRefMaps()
    const tableBody = refTableBody.value
    const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
    if (bodyElem) {
      if (isScale(colMinWidth)) {
        const bodyWidth = bodyElem.clientWidth - 1
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

export function assemColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, elem: HTMLElement, column: ColumnInfo, colgroup: XEColumnInstance | null) {
  const { reactData } = $xeTable
  const { staticColumns } = reactData
  const parentElem = elem.parentNode
  const parentColumn = colgroup ? colgroup.column : null
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
  const { reactData, internalData } = $xeTable
  const { refTableBody } = $xeTable.getRefMaps()
  const { scrollYLoad } = reactData
  const { afterFullData, scrollYStore } = internalData
  const tableBody = refTableBody.value
  const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
  if (bodyElem) {
    const trElem: HTMLTableRowElement | null = bodyElem.querySelector(`[rowid="${getRowid($xeTable, row)}"]`)
    if (trElem) {
      const bodyHeight = bodyElem.clientHeight
      const bodySrcollTop = bodyElem.scrollTop
      const trOffsetParent = trElem.offsetParent as HTMLElement
      const trOffsetTop = trElem.offsetTop + (trOffsetParent ? trOffsetParent.offsetTop : 0)
      const trHeight = trElem.clientHeight
      // 检测行是否在可视区中
      if (trOffsetTop < bodySrcollTop || trOffsetTop > bodySrcollTop + bodyHeight) {
        // 向上定位
        return $xeTable.scrollTo(null, trOffsetTop)
      } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
        // 向下定位
        return $xeTable.scrollTo(null, bodySrcollTop + trHeight)
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if (scrollYLoad) {
        return $xeTable.scrollTo(null, (afterFullData.indexOf(row) - 1) * scrollYStore.rowHeight)
      }
    }
  }
  return Promise.resolve()
}

export function colToVisible ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) {
  const { reactData, internalData } = $xeTable
  const { refTableBody } = $xeTable.getRefMaps()
  const { scrollXLoad } = reactData
  const { visibleColumn } = internalData
  const tableBody = refTableBody.value
  const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
  if (bodyElem) {
    const tdElem: HTMLTableCellElement | null = bodyElem.querySelector(`.${column.id}`)
    if (tdElem) {
      const bodyWidth = bodyElem.clientWidth
      const bodySrcollLeft = bodyElem.scrollLeft
      const tdOffsetParent = tdElem.offsetParent as HTMLElement
      const tdOffsetLeft = tdElem.offsetLeft + (tdOffsetParent ? tdOffsetParent.offsetLeft : 0)
      const tdWidth = tdElem.clientWidth
      // 检测行是否在可视区中
      if (tdOffsetLeft < bodySrcollLeft || tdOffsetLeft > bodySrcollLeft + bodyWidth) {
        // 向左定位
        return $xeTable.scrollTo(tdOffsetLeft)
      } else if (tdOffsetLeft + tdWidth >= bodyWidth + bodySrcollLeft) {
        // 向右定位
        return $xeTable.scrollTo(bodySrcollLeft + tdWidth)
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if (scrollXLoad) {
        let scrollLeft = 0
        for (let index = 0; index < visibleColumn.length; index++) {
          if (visibleColumn[index] === column) {
            break
          }
          scrollLeft += visibleColumn[index].renderWidth
        }
        return $xeTable.scrollTo(scrollLeft)
      }
    }
  }
  return Promise.resolve()
}
