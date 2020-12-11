import { watch } from 'vue'
import XEUtils from 'xe-utils/ctor'
import { ColumnInfo } from './columnInfo'

import { VxeTableConstructor } from '../../../types/vxe-table'

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

/**
 * 单元格的值为：'' | null | undefined 时都属于空值
 */
export function eqCellNull (cellValue: any) {
  return cellValue === '' || XEUtils.eqNull(cellValue)
}

export interface XEColumnInstance {
  column: ColumnInfo;
}

export function isEnableConf (conf: any): boolean {
  return conf && conf.enabled !== false
}

function getColFuncWidth (isExists: any, defaultWidth = 16) {
  return isExists ? defaultWidth : 0
}

export function getColMinWidth ($xetable: VxeTableConstructor, column: any) {
  const { computeMaps } = $xetable
  const { computeSortOpts, computeFilterOpts, computeEditOpts } = computeMaps
  const sortOpts = computeSortOpts.value
  const filterOpts = computeFilterOpts.value
  const editOpts = computeEditOpts.value
  const { type, filters, sortable, titleHelp, editRender } = column
  return 40 + getColFuncWidth(type === 'checkbox', 18) + getColFuncWidth(titleHelp, 18) + getColFuncWidth(filters && filterOpts.showIcon) + getColFuncWidth((sortable) && sortOpts.showIcon) + getColFuncWidth(isEnableConf(editRender) && editOpts.showIcon, 32)
}

export function isColumnInfo (column: any): column is ColumnInfo {
  return column && (column.constructor === ColumnInfo || column instanceof ColumnInfo)
}

export function createColumn ($xetable: VxeTableConstructor, options: any, renderOptions: any) {
  return isColumnInfo(options) ? options : new ColumnInfo($xetable, options, renderOptions)
}

export function watchColumn (props: any, column: ColumnInfo) {
  Object.keys(props).forEach(name => {
    watch(() => props[name], (value: any) => {
      column.update(name, value)
    })
  })
}

export function assemColumn ($xetable: VxeTableConstructor, $el: HTMLElement, column: ColumnInfo, colgroup?: XEColumnInstance | null) {
  const { reactData } = $xetable
  const { staticColumns } = reactData
  const parentElem = $el.parentNode
  const parentColumn = colgroup ? colgroup.column : null
  const parentCols = parentColumn ? parentColumn.children : staticColumns
  if (parentElem && parentCols) {
    parentCols.splice(XEUtils.arrayIndexOf(parentElem.children, $el), 0, column)
    reactData.staticColumns = staticColumns.slice(0)
  }
}

export function destroyColumn ($xetable: VxeTableConstructor, column: ColumnInfo) {
  const { reactData } = $xetable
  const { staticColumns } = reactData
  const matchObj = XEUtils.findTree(staticColumns, item => item.id === column.id, { children: 'children' })
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1)
  }
  reactData.staticColumns = staticColumns.slice(0)
}

export function mergeBodyMethod (mergeList: any[], _rowIndex: number, _columnIndex: number) {
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

export function clearTableDefaultStatus ($xetable: VxeTableConstructor) {
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

export function clearTableAllStatus ($xetable: VxeTableConstructor) {
  if ($xetable.clearFilter) {
    $xetable.clearFilter()
  }
  return clearTableDefaultStatus($xetable)
}

export function rowToVisible ($xetable: VxeTableConstructor, row: any) {
  const { reactData, internalData, refMaps } = $xetable
  const { refTableBody } = refMaps
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

export function colToVisible ($xetable: VxeTableConstructor, column: any) {
  const { reactData, internalData, refMaps } = $xetable
  const { refTableBody } = refMaps
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
