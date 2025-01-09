import XEUtils from 'xe-utils'
import { ColumnInfo } from './columnInfo'
import { isScale, isPx } from '../../ui/src/dom'
import { warnLog, errLog } from '../../ui/src/log'

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

const lineOffsetSizes: any = {
  mini: 3,
  small: 2,
  medium: 1
}

export function restoreScrollLocation ($xeTable: any, scrollLeft: any, scrollTop: any) {
  const internalData = $xeTable

  return $xeTable.clearScroll().then(() => {
    if (scrollLeft || scrollTop) {
      // 重置最后滚动状态
      internalData.lastScrollLeft = 0
      internalData.lastScrollTop = 0

      internalData.inVirtualScroll = false
      internalData.inBodyScroll = false
      internalData.inFooterScroll = false
      internalData.bodyScrollType = ''
      // 还原滚动状态
      return $xeTable.scrollTo(scrollLeft, scrollTop)
    }
  })
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

// 行主键 key
export function getRowkey ($xetable: any) {
  return $xetable.rowOpts.keyField || $xetable.rowId || '_X_ROW_KEY'
}

// 行主键 value
export function getRowid ($xetable: any, row: any) {
  const rowid = XEUtils.get(row, getRowkey($xetable))
  return XEUtils.eqNull(rowid) ? '' : encodeURIComponent(rowid)
}

function getPaddingLeftRightSize (elem: any) {
  if (elem) {
    const computedStyle = getComputedStyle(elem)
    const paddingLeft = XEUtils.toNumber(computedStyle.paddingLeft)
    const paddingRight = XEUtils.toNumber(computedStyle.paddingRight)
    return paddingLeft + paddingRight
  }
  return 0
}

function getElementMarginWidth (elem: any) {
  if (elem) {
    const computedStyle = getComputedStyle(elem)
    const marginLeft = XEUtils.toNumber(computedStyle.marginLeft)
    const marginRight = XEUtils.toNumber(computedStyle.marginRight)
    return elem.offsetWidth + marginLeft + marginRight
  }
  return 0
}

export function handleFieldOrColumn (_vm: any, fieldOrColumn: any) {
  if (fieldOrColumn) {
    return XEUtils.isString(fieldOrColumn) ? _vm.getColumnByField(fieldOrColumn) : fieldOrColumn
  }
  return null
}

// 组装列配置
export function assembleColumn (_vm: any) {
  const { $el, $xetable, $xecolumn, columnConfig } = _vm
  const groupConfig = $xecolumn ? $xecolumn.columnConfig : null
  if (groupConfig) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      if ($xecolumn.$options._componentTag === 'vxe-table-column') {
        errLog('vxe.error.groupTag', [`<vxe-table-colgroup title=${$xecolumn.title} ...>`, `<vxe-table-column title=${$xecolumn.title} ...>`])
      } else if ($xecolumn.$options._componentTag === 'vxe-column') {
        warnLog('vxe.error.groupTag', [`<vxe-colgroup title=${$xecolumn.title} ...>`, `<vxe-column title=${$xecolumn.title} ...>`])
      }
    }
    if (!groupConfig.children) {
      groupConfig.children = []
    }
    groupConfig.children.splice(XEUtils.arrayIndexOf($xecolumn.$el.children, $el), 0, columnConfig)
  } else {
    $xetable.staticColumns.splice(XEUtils.arrayIndexOf($xetable.$refs.hideColumn.children, $el), 0, columnConfig)
  }
}

// 销毁列
export function destroyColumn (_vm: any) {
  const { $xetable, columnConfig } = _vm
  const matchObj = XEUtils.findTree($xetable.staticColumns, column => column === columnConfig)
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1)
  }
}

export function getRootColumn ($xetable: any, column: any) {
  const fullColumnIdData = $xetable.fullColumnIdData
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

function queryCellElement (cell: any, selector: any) {
  return cell.querySelector('.vxe-cell' + selector)
}

export function toFilters (filters: any) {
  if (filters && XEUtils.isArray(filters)) {
    return filters.map(({ label, value, data, resetValue, checked }) => {
      return { label, value, data, resetValue, checked: !!checked, _checked: !!checked }
    })
  }
  return filters
}

export function getColReMinWidth (params: any) {
  const { $table, column, cell } = params
  const { showHeaderOverflow: allColumnHeaderOverflow, resizableOpts } = $table
  const { minWidth } = resizableOpts
  // 如果自定义调整宽度逻辑
  if (minWidth) {
    const customMinWidth = XEUtils.isFunction(minWidth) ? minWidth(params) : minWidth
    if (customMinWidth !== 'auto') {
      return Math.max(1, XEUtils.toNumber(customMinWidth))
    }
  }
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
    const { tableBody } = $table.$refs
    const bodyElem = tableBody ? tableBody.$el : null
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

function countTreeExpand (prevRow: any, params: any) {
  let count = 1
  if (!prevRow) {
    return count
  }
  const { $table } = params
  const { treeOpts } = $table
  const childrenField = treeOpts.children || treeOpts.childrenField
  const rowChildren = prevRow[childrenField]
  if (rowChildren && $table.isTreeExpandByRow(prevRow)) {
    for (let index = 0; index < rowChildren.length; index++) {
      count += countTreeExpand(rowChildren[index], params)
    }
  }
  return count
}

export function getOffsetSize ($xetable: any) {
  const vSize = $xetable.computeSize
  return lineOffsetSizes[vSize] || 0
}

export function calcTreeLine (params: any, items: any, rIndex: any) {
  const { $table } = params
  let expandSize = 1
  if (rIndex) {
    expandSize = countTreeExpand(items[rIndex - 1], params)
  }
  return $table.rowHeight * expandSize - (rIndex ? 1 : (12 - getOffsetSize($table)))
}

export function mergeBodyMethod (mergeList: any, _rowIndex: any, _columnIndex: any) {
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

export function getCellValue (row: any, column: any) {
  return XEUtils.get(row, column.field)
}

export function setCellValue (row: any, column:any, value: any) {
  return XEUtils.set(row, column.field, value)
}

export function clearTableDefaultStatus (_vm: any) {
  _vm.initStatus = false
  _vm.clearSort()
  _vm.clearCurrentRow()
  _vm.clearCurrentColumn()
  _vm.clearRadioRow()
  _vm.clearRadioReserve()
  _vm.clearCheckboxRow()
  _vm.clearCheckboxReserve()
  _vm.clearRowExpand()
  _vm.clearTreeExpand()
  _vm.clearTreeExpandReserve()
  if (_vm.clearEdit) {
    _vm.clearEdit()
  }
  if (_vm.clearSelected && (_vm.keyboardConfig || _vm.mouseConfig)) {
    _vm.clearSelected()
  }
  if (_vm.clearCellAreas && _vm.mouseConfig) {
    _vm.clearCellAreas()
    _vm.clearCopyCellArea()
  }
  return _vm.clearScroll()
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

export function createColumn ($xeTable: any, options: any, renderOptions: any): any {
  return isColumnInfo(options) ? options : new ColumnInfo($xeTable, options, renderOptions)
}

export function rowToVisible ($xeTable: any, row: any) {
  const reactData = $xeTable
  const internalData = $xeTable
  const tableProps = $xeTable
  const { showOverflow } = tableProps
  const tableBody: any = $xeTable.$refs.tableBody
  const { columnStore, scrollYLoad } = reactData
  const { afterFullData, scrollYStore, fullAllDataRowIdData } = internalData
  const { rowHeight } = scrollYStore
  const { leftList, rightList } = columnStore
  const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
  const rowid = getRowid($xeTable, row)
  let offsetFixedLeft = 0
  leftList.forEach((item: any) => {
    offsetFixedLeft += item.renderWidth
  })
  let offsetFixedRight = 0
  rightList.forEach((item: any) => {
    offsetFixedRight += item.renderWidth
  })
  if (bodyElem) {
    const bodyHeight = bodyElem.clientHeight
    const bodyScrollTop = bodyElem.scrollTop
    const trElem: HTMLTableRowElement | null = bodyElem.querySelector(`[rowid="${rowid}"]`)
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
        if (showOverflow) {
          return $xeTable.scrollTo(null, ($xeTable.findRowIndexOf(afterFullData, row) - 1) * rowHeight)
        }
        let scrollTop = 0
        const rowRest = fullAllDataRowIdData[rowid]
        const rHeight = rowRest ? (rowRest.height || rowHeight) : rowHeight
        for (let i = 0; i < afterFullData.length; i++) {
          const currRow = afterFullData[i]
          const currRowid = getRowid($xeTable, currRow)
          if (currRow === row || currRowid === rowid) {
            break
          }
          const rowRest = fullAllDataRowIdData[currRowid]
          scrollTop += rowRest ? (rowRest.height || rowHeight) : rowHeight
        }
        if (scrollTop < bodyScrollTop) {
          return $xeTable.scrollTo(null, scrollTop - offsetFixedLeft - 1)
        }
        return $xeTable.scrollTo(null, (scrollTop + rHeight) - (bodyHeight - offsetFixedRight - 1))
      }
    }
  }
  return Promise.resolve()
}

export function colToVisible ($xeTable: any, column: any, row?: any) {
  const { columnStore, scrollXLoad, visibleColumn } = $xeTable
  const tableBody: any = $xeTable.$refs.tableBody
  const { leftList, rightList } = columnStore
  const bodyElem = tableBody ? tableBody.$el : null
  if (column.fixed) {
    return Promise.resolve()
  }
  let offsetFixedLeft = 0
  leftList.forEach((item: any) => {
    offsetFixedLeft += item.renderWidth
  })
  let offsetFixedRight = 0
  rightList.forEach((item: any) => {
    offsetFixedRight += item.renderWidth
  })
  if (bodyElem) {
    const bodyWidth = bodyElem.clientWidth
    const bodyScrollLeft = bodyElem.scrollLeft
    let tdElem: HTMLTableCellElement | null = null
    if (row) {
      const rowid = getRowid($xeTable, row)
      tdElem = bodyElem.querySelector(`[rowid="${rowid}"] .${column.id}`)
    }
    if (!tdElem) {
      tdElem = bodyElem.querySelector(`.${column.id}`)
    }
    if (tdElem) {
      const tdOffsetParent = tdElem.offsetParent as HTMLElement
      const tdOffsetLeft = tdElem.offsetLeft + (tdOffsetParent ? tdOffsetParent.offsetLeft : 0)
      const cellWidth = tdElem.clientWidth
      // 检测是否在可视区中
      if (tdOffsetLeft < (bodyScrollLeft + offsetFixedLeft)) {
        return $xeTable.scrollTo(tdOffsetLeft - offsetFixedLeft - 1)
      } else if ((tdOffsetLeft + cellWidth - bodyScrollLeft) > (bodyWidth - offsetFixedRight)) {
        return $xeTable.scrollTo((tdOffsetLeft + cellWidth) - (bodyWidth - offsetFixedRight - 1))
      }
    } else {
      // 检测是否在虚拟渲染可视区中
      if (scrollXLoad) {
        let scrollLeft = 0
        const cellWidth = column.renderWidth
        for (let i = 0; i < visibleColumn.length; i++) {
          if (visibleColumn[i] === column) {
            break
          }
          scrollLeft += visibleColumn[i].renderWidth
        }
        if (scrollLeft < bodyScrollLeft) {
          return $xeTable.scrollTo(scrollLeft - offsetFixedLeft - 1)
        }
        return $xeTable.scrollTo((scrollLeft + cellWidth) - (bodyWidth - offsetFixedRight - 1))
      }
    }
  }
  return Promise.resolve()
}
