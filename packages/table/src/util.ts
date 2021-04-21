import { watch } from 'vue'
import XEUtils from 'xe-utils'
import { ColumnInfo } from './columnInfo'

import { VxeTableConstructor, VxeTablePrivateMethods, VxeTableDefines, VxeColumnProps } from '../../../types/all'

/**
 * 生成行的唯一主键
 */
export function getRowUniqueId () {
  return XEUtils.uniqueId('row_')
}

// 行主键 key
export function getRowkey ($xetable: VxeTableConstructor) {
  const { props } = $xetable
  const { rowId } = props
  return rowId || '_XID'
}

// 行主键 value
export function getRowid ($xetable: VxeTableConstructor, row: any) {
  const rowId = XEUtils.get(row, getRowkey($xetable))
  return rowId ? encodeURIComponent(rowId) : ''
}

export interface XEColumnInstance {
  column: ColumnInfo;
}

export const handleFieldOrColumn = ($xetable: VxeTableConstructor, fieldOrColumn: string | VxeTableDefines.ColumnInfo) => {
  if (fieldOrColumn) {
    return XEUtils.isString(fieldOrColumn) ? $xetable.getColumnByField(fieldOrColumn) : fieldOrColumn
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

function queryCellElement (cell: HTMLTableHeaderCellElement, selector: string) {
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

export function getCellValue (row: any, column: any) {
  return XEUtils.get(row, column.property)
}

export function setCellValue (row: any, column: any, value: any) {
  return XEUtils.set(row, column.property, value)
}

export function getPropClass (property: any, params: any) {
  return property ? XEUtils.isFunction(property) ? property(params) : property : ''
}

export function getColMinWidth (params: {
  $table: VxeTableConstructor & VxeTablePrivateMethods;
  column: VxeTableDefines.ColumnInfo;
  columnIndex: number;
  $columnIndex: number;
  $rowIndex: number;
  cell: HTMLTableHeaderCellElement;
}) {
  const { $table, column, cell } = params
  const { props: tableProps } = $table
  const { computeResizableOpts } = $table.getComputeMaps()
  const resizableOpts = computeResizableOpts.value
  const { minWidth } = resizableOpts
  if (minWidth) {
    const customMinWidth = XEUtils.isFunction(minWidth) ? minWidth(params) : minWidth
    if (customMinWidth !== 'auto') {
      return Math.max(1, XEUtils.toNumber(customMinWidth))
    }
  }
  const { showHeaderOverflow: allColumnHeaderOverflow } = tableProps
  const { showHeaderOverflow } = column
  const headOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
  const showEllipsis = headOverflow === 'ellipsis'
  const showTitle = headOverflow === 'title'
  const showTooltip = headOverflow === true || headOverflow === 'tooltip'
  const hasEllipsis = showTitle || showTooltip || showEllipsis
  const minTitleWidth = XEUtils.floor((XEUtils.toNumber(getComputedStyle(cell).fontSize) || 14) * 1.6)
  const paddingLeftRight = getPaddingLeftRightSize(cell) + getPaddingLeftRightSize(queryCellElement(cell, ''))
  let colMinWidth = minTitleWidth + paddingLeftRight
  if (hasEllipsis) {
    const checkboxIconWidth = getPaddingLeftRightSize(queryCellElement(cell, '--title>.vxe-cell--checkbox'))
    const requiredIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--required-icon'))
    const editIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--edit-icon'))
    const helpIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell-help-icon'))
    const sortIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--sort'))
    const filterIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--filter'))
    colMinWidth += checkboxIconWidth + requiredIconWidth + editIconWidth + helpIconWidth + filterIconWidth + sortIconWidth
  }
  return colMinWidth
}

export function isColumnInfo (column: any): column is ColumnInfo {
  return column && (column.constructor === ColumnInfo || column instanceof ColumnInfo)
}

export function createColumn ($xetable: VxeTableConstructor & VxeTablePrivateMethods, options: VxeColumnProps, renderOptions: any) {
  return isColumnInfo(options) ? options : new ColumnInfo($xetable, options, renderOptions)
}

export function watchColumn (props: any, column: ColumnInfo) {
  Object.keys(props).forEach(name => {
    watch(() => props[name], (value: any) => {
      column.update(name, value)
    })
  })
}

export function assemColumn ($xetable: VxeTableConstructor & VxeTablePrivateMethods, elem: HTMLElement, column: ColumnInfo, colgroup: XEColumnInstance | null) {
  const { reactData } = $xetable
  const { staticColumns } = reactData
  const parentElem = elem.parentNode
  const parentColumn = colgroup ? colgroup.column : null
  const parentCols = parentColumn ? parentColumn.children : staticColumns
  if (parentElem && parentCols) {
    parentCols.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, column)
    reactData.staticColumns = staticColumns.slice(0)
  }
}

export function destroyColumn ($xetable: VxeTableConstructor & VxeTablePrivateMethods, column: ColumnInfo) {
  const { reactData } = $xetable
  const { staticColumns } = reactData
  const matchObj = XEUtils.findTree(staticColumns, item => item.id === column.id, { children: 'children' })
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1)
  }
  reactData.staticColumns = staticColumns.slice(0)
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

export function clearTableDefaultStatus ($xetable: VxeTableConstructor & VxeTablePrivateMethods) {
  const { props, internalData } = $xetable
  internalData.initStatus = false
  $xetable.clearSort()
  $xetable.clearCurrentRow()
  $xetable.clearCurrentColumn()
  $xetable.clearRadioRow()
  $xetable.clearRadioReserve()
  $xetable.clearCheckboxRow()
  $xetable.clearCheckboxReserve()
  $xetable.clearRowExpand()
  $xetable.clearTreeExpand()
  $xetable.clearTreeExpandReserve()
  if ($xetable.clearFilter) {
    $xetable.clearFilter()
  }
  if ($xetable.clearSelected && (props.keyboardConfig || props.mouseConfig)) {
    $xetable.clearSelected()
  }
  if ($xetable.clearCellAreas && props.mouseConfig) {
    $xetable.clearCellAreas()
    $xetable.clearCopyCellArea()
  }
  return $xetable.clearScroll()
}

export function clearTableAllStatus ($xetable: VxeTableConstructor & VxeTablePrivateMethods) {
  if ($xetable.clearFilter) {
    $xetable.clearFilter()
  }
  return clearTableDefaultStatus($xetable)
}

export function rowToVisible ($xetable: VxeTableConstructor & VxeTablePrivateMethods, row: any) {
  const { reactData, internalData } = $xetable
  const { refTableBody } = $xetable.getRefMaps()
  const { scrollYLoad } = reactData
  const { afterFullData, scrollYStore } = internalData
  const tableBody = refTableBody.value
  const bodyElem = tableBody.$el as HTMLDivElement
  const trElem: HTMLTableRowElement | null = bodyElem.querySelector(`[rowid="${getRowid($xetable, row)}"]`)
  if (trElem) {
    const bodyHeight = bodyElem.clientHeight
    const bodySrcollTop = bodyElem.scrollTop
    const trOffsetParent = trElem.offsetParent as HTMLElement
    const trOffsetTop = trElem.offsetTop + (trOffsetParent ? trOffsetParent.offsetTop : 0)
    const trHeight = trElem.clientHeight
    // 检测行是否在可视区中
    if (trOffsetTop < bodySrcollTop || trOffsetTop > bodySrcollTop + bodyHeight) {
      // 向上定位
      return $xetable.scrollTo(null, trOffsetTop)
    } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
      // 向下定位
      return $xetable.scrollTo(null, bodySrcollTop + trHeight)
    }
  } else {
    // 如果是虚拟渲染跨行滚动
    if (scrollYLoad) {
      return $xetable.scrollTo(null, (afterFullData.indexOf(row) - 1) * scrollYStore.rowHeight)
    }
  }
  return Promise.resolve()
}

export function colToVisible ($xetable: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) {
  const { reactData, internalData } = $xetable
  const { refTableBody } = $xetable.getRefMaps()
  const { scrollXLoad } = reactData
  const { visibleColumn } = internalData
  const tableBody = refTableBody.value
  const bodyElem = tableBody.$el as HTMLDivElement
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
      return $xetable.scrollTo(tdOffsetLeft)
    } else if (tdOffsetLeft + tdWidth >= bodyWidth + bodySrcollLeft) {
      // 向右定位
      return $xetable.scrollTo(bodySrcollLeft + tdWidth)
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
      return $xetable.scrollTo(scrollLeft)
    }
  }
  return Promise.resolve()
}
