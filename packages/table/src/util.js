import VXETable from '../../v-x-e-table'
import XEUtils from 'xe-utils'
import { ColumnInfo } from './columnInfo'
import DomTools from '../../tools/dom'

const lineOffsetSizes = {
  mini: 3,
  small: 2,
  medium: 1
}

export function restoreScrollLocation (_vm, scrollLeft, scrollTop) {
  return _vm.clearScroll().then(() => {
    if (scrollLeft || scrollTop) {
      // 重置最后滚动状态
      _vm.lastScrollLeft = 0
      _vm.lastScrollTop = 0
      // 还原滚动状态
      return _vm.scrollTo(scrollLeft, scrollTop)
    }
  })
}

export function toTreePathSeq (path) {
  return path.map((num, i) => i % 2 === 0 ? (Number(num) + 1) : '.').join('')
}

export function removeScrollListener (scrollElem) {
  if (scrollElem && scrollElem._onscroll) {
    scrollElem.onscroll = null
  }
}

export function restoreScrollListener (scrollElem) {
  if (scrollElem && scrollElem._onscroll) {
    scrollElem.onscroll = scrollElem._onscroll
  }
}

// 行主键 key
export function getRowkey ($xetable) {
  return $xetable.rowOpts.keyField || $xetable.rowId || '_X_ROW_KEY'
}

// 行主键 value
export function getRowid ($xetable, row) {
  const rowid = XEUtils.get(row, getRowkey($xetable))
  return XEUtils.eqNull(rowid) ? '' : encodeURIComponent(rowid)
}

function getPaddingLeftRightSize (elem) {
  if (elem) {
    const computedStyle = getComputedStyle(elem)
    const paddingLeft = XEUtils.toNumber(computedStyle.paddingLeft)
    const paddingRight = XEUtils.toNumber(computedStyle.paddingRight)
    return paddingLeft + paddingRight
  }
  return 0
}

function getElemenMarginWidth (elem) {
  if (elem) {
    const computedStyle = getComputedStyle(elem)
    const marginLeft = XEUtils.toNumber(computedStyle.marginLeft)
    const marginRight = XEUtils.toNumber(computedStyle.marginRight)
    return elem.offsetWidth + marginLeft + marginRight
  }
  return 0
}

export function handleFieldOrColumn (_vm, fieldOrColumn) {
  if (fieldOrColumn) {
    return XEUtils.isString(fieldOrColumn) ? _vm.getColumnByField(fieldOrColumn) : fieldOrColumn
  }
  return null
}

function queryCellElement (cell, selector) {
  return cell.querySelector('.vxe-cell' + selector)
}

export function toFilters (filters) {
  if (filters && XEUtils.isArray(filters)) {
    return filters.map(({ label, value, data, resetValue, checked }) => {
      return { label, value, data, resetValue, checked: !!checked, _checked: !!checked }
    })
  }
  return filters
}

export function getColReMinWidth (params) {
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
    const checkboxIconWidth = getPaddingLeftRightSize(queryCellElement(cell, '--title>.vxe-cell--checkbox'))
    const requiredIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--required-icon'))
    const editIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--edit-icon'))
    const helpIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell-help-icon'))
    const sortIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--sort'))
    const filterIconWidth = getElemenMarginWidth(queryCellElement(cell, '>.vxe-cell--filter'))
    mWidth += checkboxIconWidth + requiredIconWidth + editIconWidth + helpIconWidth + filterIconWidth + sortIconWidth
  }
  // 如果设置最小宽
  if (colMinWidth) {
    const { tableBody } = $table.$refs
    const bodyElem = tableBody ? tableBody.$el : null
    if (bodyElem) {
      if (DomTools.isScale(colMinWidth)) {
        const bodyWidth = bodyElem.clientWidth - 1
        const meanWidth = bodyWidth / 100
        return Math.max(mWidth, Math.floor(XEUtils.toInteger(colMinWidth) * meanWidth))
      } else if (DomTools.isPx(colMinWidth)) {
        return Math.max(mWidth, XEUtils.toInteger(colMinWidth))
      }
    }
  }
  return mWidth
}

function countTreeExpand (prevRow, params) {
  let count = 1
  if (!prevRow) {
    return count
  }
  const { $table } = params
  const rowChildren = prevRow[$table.treeOpts.children]
  if ($table.isTreeExpandByRow(prevRow)) {
    for (let index = 0; index < rowChildren.length; index++) {
      count += countTreeExpand(rowChildren[index], params)
    }
  }
  return count
}

export function getOffsetSize ($xetable) {
  return lineOffsetSizes[$xetable.vSize] || 0
}

export function calcTreeLine (params, items, rIndex) {
  const { $table } = params
  let expandSize = 1
  if (rIndex) {
    expandSize = countTreeExpand(items[rIndex - 1], params)
  }
  return $table.rowHeight * expandSize - (rIndex ? 1 : (12 - getOffsetSize($table)))
}

export function mergeBodyMethod (mergeList, _rowIndex, _columnIndex) {
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

export function clearTableDefaultStatus (_vm) {
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
  if (_vm.clearActived && VXETable._edit) {
    _vm.clearActived()
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

export function clearTableAllStatus (_vm) {
  if (_vm.clearFilter && VXETable._filter) {
    _vm.clearFilter()
  }
  return clearTableDefaultStatus(_vm)
}

export function isColumnInfo (column) {
  return column instanceof ColumnInfo
}

export function getColumnConfig ($xetable, _vm, options) {
  return isColumnInfo(_vm) ? _vm : new ColumnInfo($xetable, _vm, options)
}

export function rowToVisible ($xetable, row) {
  const { tableBody } = $xetable.$refs
  const bodyElem = tableBody ? tableBody.$el : null
  if (bodyElem) {
    const trElem = bodyElem.querySelector(`[rowid="${getRowid($xetable, row)}"]`)
    if (trElem) {
      const bodyHeight = bodyElem.clientHeight
      const bodySrcollTop = bodyElem.scrollTop
      const trOffsetTop = trElem.offsetTop + (trElem.offsetParent ? trElem.offsetParent.offsetTop : 0)
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
      if ($xetable.scrollYLoad) {
        return $xetable.scrollTo(null, ($xetable.afterFullData.indexOf(row) - 1) * $xetable.scrollYStore.rowHeight)
      }
    }
  }
  return Promise.resolve()
}

export function colToVisible ($xetable, column) {
  const { tableBody } = $xetable.$refs
  const bodyElem = tableBody ? tableBody.$el : null
  if (bodyElem) {
    const tdElem = bodyElem.querySelector(`.${column.id}`)
    if (tdElem) {
      const bodyWidth = bodyElem.clientWidth
      const bodySrcollLeft = bodyElem.scrollLeft
      const tdOffsetLeft = tdElem.offsetLeft + (tdElem.offsetParent ? tdElem.offsetParent.offsetLeft : 0)
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
      if ($xetable.scrollXLoad) {
        const visibleColumn = $xetable.visibleColumn
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
  }
  return Promise.resolve()
}
