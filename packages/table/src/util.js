import VXETable from '../../v-x-e-table'
import XEUtils from 'xe-utils'
import { DomTools } from '../../tools'

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

export function getColMinWidth (params) {
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
  const { $table } = params
  const rowChildren = prevRow[$table.treeOpts.children]
  let count = 1
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

export function calcTreeLine (params, items) {
  const { $table, $rowIndex } = params
  let expandSize = 1
  if ($rowIndex) {
    expandSize = countTreeExpand(items[$rowIndex - 1], params)
  }
  return $table.rowHeight * expandSize - ($rowIndex ? 1 : (12 - getOffsetSize($table)))
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
