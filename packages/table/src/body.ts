import { PropType, CreateElement } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { isEnableConf, getClass } from '../../ui/src/utils'
import { getOffsetSize, calcTreeLine, mergeBodyMethod, getRowid } from './util'
import { updateCellTitle } from '../../ui/src/dom'
import { getSlotVNs } from '../../ui/src/vn'

import type { VxeTableConstructor, VxeTableDefines, TableInternalData, VxeTablePrivateMethods, TableReactData, VxeColumnPropTypes, VxeComponentStyleType } from '../../../types'

const { getI18n, renderer, renderEmptyElement } = VxeUI

const renderType = 'body'

// 滚动、拖动过程中不需要触发
const isVMScrollProcess = ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) => {
  const tableProps = $xeTable
  const tableReactData = $xeTable as unknown as TableReactData

  const { delayHover } = tableProps
  const { lastScrollTime, _isResize } = tableReactData
  return !!(_isResize || (lastScrollTime && Date.now() < lastScrollTime + (delayHover as number)))
}

function renderLine (h: CreateElement, _vm: any, params: VxeTableDefines.CellRenderBodyParams) {
  const $xeTable = _vm.$parent as VxeTableConstructor & VxeTablePrivateMethods
  const tableProps = $xeTable
  const tableInternalData = $xeTable as unknown as TableInternalData

  const { row, column } = params
  const { afterFullData } = tableInternalData
  const { treeConfig } = tableProps
  const treeOpts = $xeTable.computeTreeOpts
  const { slots, treeNode } = column
  const { fullAllDataRowIdData } = tableInternalData
  if (slots && (slots as any).line) {
    return $xeTable.callSlot((slots as any).line, params, h)
  }
  const rowid = getRowid($xeTable, row)
  const rest = fullAllDataRowIdData[rowid]
  let rLevel = 0
  let prevRow = null
  if (rest) {
    rLevel = rest.level
    prevRow = rest.items[rest._index - 1]
  }
  const isFirstRow = $xeTable.eqRow(afterFullData[0], row)
  if (treeConfig && treeNode && (treeOpts.showLine || treeOpts.line)) {
    return [
      h('div', {
        class: 'vxe-tree--line-wrapper'
      }, [
        h('div', {
          class: 'vxe-tree--line',
          style: {
            height: `${isFirstRow ? 1 : calcTreeLine(params, prevRow)}px`,
            left: `${(rLevel * treeOpts.indent) + (rLevel ? 2 - getOffsetSize($xeTable) : 0) + 16}px`
          }
        })
      ])
    ]
  }
  return []
}

/**
 * 渲染列
 */
function renderTdColumn (
  h: CreateElement,
  _vm: any,
  seq: number | string,
  rowid: string,
  fixedType: VxeColumnPropTypes.Fixed,
  isOptimizeMode: boolean,
  rowLevel: number,
  row: any,
  rowIndex: number,
  $rowIndex: number,
  _rowIndex: number,
  column: VxeTableDefines.ColumnInfo,
  $columnIndex: number,
  columns: VxeTableDefines.ColumnInfo[],
  items: any[]
) {
  const $xeTable = _vm.$parent as VxeTableConstructor & VxeTablePrivateMethods
  const tableProps = $xeTable
  const tableReactData = $xeTable as unknown as TableReactData
  const tableInternalData = $xeTable as unknown as TableInternalData

  const { fullAllDataRowIdData } = tableInternalData
  const { columnKey, height, showOverflow: allColumnOverflow, cellClassName: allCellClassName, cellStyle, align: allAlign, spanMethod, mouseConfig, editConfig, editRules, tooltipConfig } = tableProps
  const { tableData, overflowX, currentColumn, scrollXLoad, scrollYLoad, isCalcCellHeight, mergeList, editStore, isAllOverflow, validErrorMaps } = tableReactData
  const { afterFullData, scrollXStore, scrollYStore } = tableInternalData
  const cellOpts = $xeTable.computeCellOpts
  const validOpts = $xeTable.computeValidOpts
  const checkboxOpts = $xeTable.computeCheckboxOpts
  const editOpts = $xeTable.computeEditOpts
  const tooltipOpts = $xeTable.computeTooltipOpts
  const rowOpts = $xeTable.computeRowOpts
  const rowDragOpts = $xeTable.computeRowDragOpts
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
  const { disabledMethod: dragDisabledMethod, isCrossDrag, isPeerDrag } = rowDragOpts
  const columnOpts = $xeTable.computeColumnOpts
  const mouseOpts = $xeTable.computeMouseOpts
  const areaOpts = $xeTable.computeAreaOpts
  const { selectCellToRow } = areaOpts
  const { type, cellRender, editRender, align, showOverflow, className, treeNode, slots } = column
  const { verticalAlign } = cellOpts
  const { actived } = editStore
  const { height: customRHeight } = rowOpts
  const colid = column.id
  const renderOpts = editRender || cellRender
  const compConf = renderOpts ? renderer.get(renderOpts.name) : null
  const compCellClassName = compConf ? (compConf.tableCellClassName || compConf.cellClassName) : null
  const compCellStyle = compConf ? (compConf.tableCellStyle || compConf.cellStyle) : ''
  const showAllTip = tooltipOpts.showAll
  const columnIndex = $xeTable.getColumnIndex(column)
  const _columnIndex = $xeTable.getVTColumnIndex(column)
  const isEdit = isEnableConf(editRender)
  let fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX
  const cellOverflow = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
  const showEllipsis = cellOverflow === 'ellipsis'
  const showTitle = cellOverflow === 'title'
  const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
  // 如果表格加上 showOverflow 则不再支持列单独设置
  const hasEllipsis = allColumnOverflow || showTitle || showTooltip || showEllipsis
  let isDirty
  const tdOns: any = {}
  const rest = fullAllDataRowIdData[rowid]
  const cellAlign = align || (compConf ? compConf.tableCellAlign : '') || allAlign
  const errorValidItem = validErrorMaps[`${rowid}:${colid}`]
  const showValidTip = editRules && validOpts.showMessage && (validOpts.message === 'default' ? (height || tableData.length > 1) : validOpts.message === 'inline')
  const attrs: any = { colid }
  const params: VxeTableDefines.CellRenderBodyParams = {
    $table: $xeTable,
    $grid: $xeTable.xegrid,
    isEdit: false,
    seq,
    rowid,
    row,
    rowIndex,
    $rowIndex,
    _rowIndex,
    column,
    columnIndex,
    $columnIndex,
    _columnIndex,
    fixed: fixedType,
    type: renderType,
    isHidden: !!fixedHiddenColumn,
    level: rowLevel,
    visibleData: afterFullData,
    data: tableData,
    items
  }
  let isRowDragCell = false
  let isDisabledDrag = false
  if (rowOpts.drag) {
    isRowDragCell = rowDragOpts.trigger === 'row' || (column.dragSort && rowDragOpts.trigger === 'cell')
  }
  if (isRowDragCell) {
    isDisabledDrag = !!(dragDisabledMethod && dragDisabledMethod(params))
  }
  // hover 进入事件
  if (showTitle || showTooltip || showAllTip || tooltipConfig) {
    tdOns.mouseenter = (evnt: MouseEvent) => {
      if (isVMScrollProcess($xeTable)) {
        return
      }
      if (showTitle) {
        updateCellTitle(evnt.currentTarget, column)
      } else if (showTooltip || showAllTip) {
        // 如果配置了显示 tooltip
        $xeTable.triggerBodyTooltipEvent(evnt, params)
      }
      $xeTable.dispatchEvent('cell-mouseenter', Object.assign({ cell: evnt.currentTarget }, params), evnt)
    }
  }
  // hover 退出事件
  if (showTooltip || showAllTip || tooltipConfig) {
    tdOns.mouseleave = (evnt: MouseEvent) => {
      if (isVMScrollProcess($xeTable)) {
        return
      }
      if (showTooltip || showAllTip) {
        $xeTable.handleTargetLeaveEvent(evnt)
      }
      $xeTable.dispatchEvent('cell-mouseleave', Object.assign({ cell: evnt.currentTarget }, params), evnt)
    }
  }
  // 按下事件处理
  if (isRowDragCell || checkboxOpts.range || mouseConfig) {
    tdOns.mousedown = (evnt: MouseEvent) => {
      $xeTable.triggerCellMousedownEvent(evnt, params)
    }
  }
  // 拖拽列事件
  if (isRowDragCell) {
    tdOns.mouseup = $xeTable.triggerCellMouseupEvent
  }
  // 点击事件处理
  tdOns.click = (evnt: MouseEvent) => {
    $xeTable.triggerCellClickEvent(evnt, params)
  }
  // 双击事件处理
  tdOns.dblclick = (evnt: MouseEvent) => {
    $xeTable.triggerCellDblclickEvent(evnt, params)
  }
  // 合并行或列
  if (mergeList.length) {
    const spanRest = mergeBodyMethod(mergeList, _rowIndex, _columnIndex)
    if (spanRest) {
      const { rowspan, colspan } = spanRest
      if (!rowspan || !colspan) {
        return null
      }
      if (rowspan > 1) {
        attrs.rowspan = rowspan
      }
      if (colspan > 1) {
        attrs.colspan = colspan
      }
    }
  } else if (spanMethod) {
    // 自定义合并行或列的方法
    const { rowspan = 1, colspan = 1 } = spanMethod(params) || {}
    if (!rowspan || !colspan) {
      return null
    }
    if (rowspan > 1) {
      attrs.rowspan = rowspan
    }
    if (colspan > 1) {
      attrs.colspan = colspan
    }
  }
  // 如果被合并不可隐藏
  if (fixedHiddenColumn && mergeList) {
    if (attrs.colspan > 1 || attrs.rowspan > 1) {
      fixedHiddenColumn = false
    }
  }
  // 如果编辑列开启显示状态
  if (!fixedHiddenColumn && editConfig && (editRender || cellRender) && (editOpts.showStatus || editOpts.showUpdateStatus)) {
    isDirty = $xeTable.isUpdateByRow(row, column.field)
  }
  const tdVNs = []
  if (fixedHiddenColumn && (allColumnOverflow ? isAllOverflow : allColumnOverflow)) {
    tdVNs.push(
      h('div', {
        class: ['vxe-cell', {
          'c--title': showTitle,
          'c--tooltip': showTooltip,
          'c--ellipsis': showEllipsis
        }],
        style: {
          maxHeight: hasEllipsis && (customRHeight || defaultRowHeight) ? `${customRHeight || defaultRowHeight}px` : ''
        }
      })
    )
  } else {
    // 渲染单元格
    tdVNs.push(
      ...renderLine(h, _vm, params),
      h('div', {
        class: ['vxe-cell', {
          'c--title': showTitle,
          'c--tooltip': showTooltip,
          'c--ellipsis': showEllipsis
        }],
        style: {
          maxHeight: hasEllipsis && (customRHeight || defaultRowHeight) ? `${customRHeight || defaultRowHeight}px` : ''
        },
        attrs: {
          title: showTitle ? $xeTable.getCellLabel(row, column) : null
        }
      }, column.renderCell(h, params))
    )
    if (showValidTip && errorValidItem) {
      const errRule = errorValidItem.rule
      const validSlot = slots ? slots.valid : null
      const validParams = { ...params, ...errorValidItem, rule: errorValidItem }
      tdVNs.push(
        h('div', {
          class: ['vxe-cell--valid-error-tip', getClass(validOpts.className, errorValidItem)],
          style: errRule && errRule.maxWidth
            ? {
                width: `${errRule.maxWidth}px`
              }
            : undefined
        }, [
          h('div', {
            class: `vxe-cell--valid-error-wrapper vxe-cell--valid-error-theme-${validOpts.theme || 'normal'}`
          }, [
            validSlot
              ? $xeTable.callSlot(validSlot, validParams, h)
              : [
                  h('span', {
                    class: 'vxe-cell--valid-error-msg'
                  }, errorValidItem.content)
                ]
          ])
        ])
      )
    }
  }
  let cellHeight = ''
  const vnHeight = isCalcCellHeight ? rest.height : 0
  if (hasEllipsis) {
    if (customRHeight) {
      cellHeight = `${customRHeight}px`
    } else if (!isAllOverflow) {
      cellHeight = `${vnHeight || defaultRowHeight || 18}px`
    }
  } else {
    cellHeight = `${vnHeight || defaultRowHeight || 18}px`
  }

  if (mouseConfig && mouseOpts.area && selectCellToRow) {
    if (
      (!$columnIndex && selectCellToRow === true) ||
      (selectCellToRow === column.field)
    ) {
      tdVNs.push(
        h('div', {
          class: 'vxe-cell--area-status'
        })
      )
    }
  }
  const isLastColumn = $columnIndex === columns.length - 1
  const isAutoCellWidth = !column.resizeWidth && (column.minWidth === 'auto' || column.width === 'auto')

  let isPreLoadStatus = false
  if (scrollYLoad && (_rowIndex < scrollYStore.visibleStartIndex || _rowIndex > scrollYStore.visibleEndIndex)) {
    isPreLoadStatus = true
  } else if (scrollXLoad && !column.fixed && (_columnIndex < scrollXStore.visibleStartIndex || _columnIndex > scrollXStore.visibleEndIndex)) {
    isPreLoadStatus = true
  }

  return h('td', {
    class: [
      'vxe-body--column',
      column.id,
      {
        [`col--${cellAlign}`]: cellAlign,
        [`col--vertical-${verticalAlign}`]: verticalAlign,
        [`col--${type}`]: type,
        'col--last': isLastColumn,
        'col--tree-node': treeNode,
        'col--edit': isEdit,
        'col--ellipsis': hasEllipsis,
        'fixed--width': !isAutoCellWidth,
        'fixed--hidden': fixedHiddenColumn,
        'is--drag-cell': isRowDragCell && (isCrossDrag || isPeerDrag || !rowLevel),
        'is--drag-disabled': isDisabledDrag,
        'col--dirty': isDirty,
        'col--active': editConfig && isEdit && (actived.row === row && (actived.column === column || editOpts.mode === 'row')),
        'col--valid-error': !!errorValidItem,
        'col--current': currentColumn === column
      },
      getClass(compCellClassName, params),
      getClass(className, params),
      getClass(allCellClassName, params)
    ],
    key: columnKey || scrollXLoad || scrollYLoad || columnOpts.useKey || rowOpts.useKey || columnOpts.drag ? column.id : $columnIndex,
    attrs,
    style: Object.assign({
      height: cellHeight
    }, XEUtils.isFunction(compCellStyle) ? compCellStyle(params) : compCellStyle, XEUtils.isFunction(cellStyle) ? cellStyle(params) : cellStyle),
    on: tdOns
  }, isPreLoadStatus || (isOptimizeMode && fixedHiddenColumn) ? [] : tdVNs)
}

function renderRows (h: CreateElement, _vm: any, fixedType: VxeColumnPropTypes.Fixed, isOptimizeMode: boolean, tableData: any[], tableColumn: VxeTableDefines.ColumnInfo[]) {
  const $xeTable = _vm.$parent as VxeTableConstructor & VxeTablePrivateMethods
  const tableProps = $xeTable
  const tableReactData = $xeTable as unknown as TableReactData
  const tableInternalData = $xeTable as unknown as TableInternalData

  const { stripe, rowKey, highlightHoverRow, rowClassName, rowStyle, showOverflow: allColumnOverflow, editConfig, treeConfig } = tableProps
  const { hasFixedColumn, treeExpandedMaps, scrollXLoad, scrollYLoad, rowExpandedMaps, expandColumn, selectRadioRow, pendingRowMaps, isDragColMove } = tableReactData
  const { fullAllDataRowIdData } = tableInternalData
  const checkboxOpts = $xeTable.computeCheckboxOpts
  const radioOpts = $xeTable.computeRadioOpts
  const treeOpts = $xeTable.computeTreeOpts
  const editOpts = $xeTable.computeEditOpts
  const rowOpts = $xeTable.computeRowOpts
  const columnOpts = $xeTable.computeColumnOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const { transform, seqMode } = treeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  const rows: any[] = []
  tableData.forEach((row, $rowIndex) => {
    const trOn: Record<string, any> = {}
    let rowIndex = $rowIndex
    // 确保任何情况下 rowIndex 都精准指向真实 data 索引
    rowIndex = $xeTable.getRowIndex(row)
    // 当前行事件
    if (rowOpts.isHover || highlightHoverRow) {
      trOn.mouseenter = (evnt: MouseEvent) => {
        if (isVMScrollProcess($xeTable)) {
          return
        }
        $xeTable.triggerHoverEvent(evnt, { row, rowIndex })
      }
      trOn.mouseleave = () => {
        if (isVMScrollProcess($xeTable)) {
          return
        }
        $xeTable.clearHoverRow()
      }
    }
    const rowid = getRowid($xeTable, row)
    const rest = fullAllDataRowIdData[rowid]
    let rowLevel = 0
    let seq: string | number = -1
    let _rowIndex = 0
    if (rest) {
      rowLevel = rest.level
      if (treeConfig && transform && seqMode === 'increasing') {
        seq = rest._index + 1
      } else {
        seq = rest.seq
      }
      _rowIndex = rest._index
    }
    const params = { $table: $xeTable, seq, rowid, fixed: fixedType, type: renderType, level: rowLevel, row, rowIndex, $rowIndex, _rowIndex }
    // 行是否被展开
    const isExpandRow = expandColumn && !!rowExpandedMaps[rowid]
    // 树节点是否被展开
    let isExpandTree = false
    let rowChildren = []
    // 是否新增行
    let isNewRow = false
    if (editConfig) {
      isNewRow = $xeTable.isInsertByRow(row)
    }
    if (treeConfig && !scrollYLoad && !transform) {
      rowChildren = row[childrenField]
      isExpandTree = rowChildren && rowChildren.length && !!treeExpandedMaps[rowid]
    }
    // 拖拽行事件
    if (rowOpts.drag && (!treeConfig || transform)) {
      trOn.dragstart = $xeTable.handleRowDragDragstartEvent
      trOn.dragend = $xeTable.handleRowDragDragendEvent
      trOn.dragover = $xeTable.handleRowDragDragoverEvent
    }
    const trClass = [
      'vxe-body--row',
      treeConfig ? `row--level-${rowLevel}` : '',
      {
        'row--stripe': stripe && (_rowIndex + 1) % 2 === 0,
        'is--new': isNewRow,
        'is--expand-row': isExpandRow,
        'is--expand-tree': isExpandTree,
        'row--new': isNewRow && (editOpts.showStatus || editOpts.showInsertStatus),
        'row--radio': radioOpts.highlight && selectRadioRow === row,
        'row--checked': checkboxOpts.highlight && $xeTable.isCheckedByCheckboxRow(row),
        'row--pending': !!pendingRowMaps[rowid]
      },
      rowClassName ? (XEUtils.isFunction(rowClassName) ? rowClassName(params) : rowClassName) : ''
    ]
    const tdVNs = tableColumn.map((column: any, $columnIndex: any) => {
      return renderTdColumn(h, _vm, seq, rowid, fixedType, isOptimizeMode, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, tableColumn, tableData)
    })
    rows.push(
      columnOpts.drag && columnDragOpts.animation
        ? h('transition-group', {
          props: {
            tag: 'tr',
            name: `vxe-header--col-list${isDragColMove ? '' : '-disabled'}`
          },
          class: trClass,
          attrs: {
            rowid
          },
          style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(params) : rowStyle) as VxeComponentStyleType : undefined,
          key: rowKey || scrollXLoad || scrollYLoad || rowOpts.useKey || rowOpts.drag || columnOpts.drag || treeConfig ? rowid : $rowIndex,
          nativeOn: trOn
        }, tdVNs)
        : h('tr', {
          class: trClass,
          attrs: {
            rowid
          },
          style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(params) : rowStyle) as VxeComponentStyleType : undefined,
          key: rowKey || scrollXLoad || scrollYLoad || rowOpts.useKey || rowOpts.drag || columnOpts.drag || treeConfig ? rowid : $rowIndex,
          on: trOn
        }, tdVNs)
    )
    // 如果行被展开了
    if (isExpandRow) {
      const expandOpts = $xeTable.computeExpandOpts
      const { height: expandHeight, padding } = expandOpts
      const cellStyle: any = {}
      if (expandHeight) {
        cellStyle.height = `${expandHeight}px`
      }
      if (treeConfig) {
        cellStyle.paddingLeft = `${(rowLevel * treeOpts.indent) + 30}px`
      }
      const { showOverflow } = expandColumn
      const hasEllipsis = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
      const expandParams = { $table: $xeTable, seq, column: expandColumn, fixed: fixedType, type: renderType, level: rowLevel, row, rowIndex, $rowIndex, _rowIndex }
      rows.push(
        h('tr', {
          class: ['vxe-body--expanded-row', {
            'is--padding': padding
          }],
          key: `expand_${rowid}`,
          style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(expandParams) : rowStyle) as VxeComponentStyleType : undefined,
          on: trOn
        }, [
          h('td', {
            class: {
              'vxe-body--expanded-column': 1,
              'fixed--hidden': fixedType && !hasFixedColumn,
              'col--ellipsis': hasEllipsis
            },
            attrs: {
              colspan: tableColumn.length
            }
          }, [
            h('div', {
              class: {
                'vxe-body--expanded-cell': 1,
                'is--ellipsis': expandHeight
              },
              style: cellStyle
            }, [
              expandColumn.renderData(h, expandParams)
            ])
          ])
        ])
      )
    }
    // 如果是树形表格
    if (isExpandTree) {
      rows.push(...renderRows(h, _vm, fixedType, isOptimizeMode, rowChildren, tableColumn))
    }
  })
  return rows
}

export default {
  name: 'VxeTableBody',
  props: {
    tableData: Array as PropType<any[]>,
    tableColumn: Array as PropType<VxeTableDefines.ColumnInfo[]>,
    fixedColumn: Array as PropType<VxeTableDefines.ColumnInfo[]>,
    fixedType: {
      type: String as PropType<'right' | 'left' | ''>,
      default: ''
    }
  },
  mounted (this: any) {
    const _vm = this
    const props = _vm
    const $xeTable = _vm.$parent as VxeTableConstructor & VxeTablePrivateMethods
    const tableInternalData = $xeTable as unknown as TableInternalData

    const { fixedType } = props
    const { elemStore } = tableInternalData
    const prefix = `${fixedType || 'main'}-body-`
    elemStore[`${prefix}wrapper`] = _vm.$refs.refElem
    elemStore[`${prefix}scroll`] = _vm.$refs.refBodyScroll
    elemStore[`${prefix}table`] = _vm.$refs.refBodyTable
    elemStore[`${prefix}colgroup`] = _vm.$refs.refBodyColgroup
    elemStore[`${prefix}list`] = _vm.$refs.refBodyTBody
    elemStore[`${prefix}xSpace`] = _vm.$refs.refBodyXSpace
    elemStore[`${prefix}ySpace`] = _vm.$refs.refBodyYSpace
    elemStore[`${prefix}emptyBlock`] = _vm.$refs.refBodyEmptyBlock
  },
  destroyed (this: any) {
    const props = this
    const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods
    const tableInternalData = $xeTable as unknown as TableInternalData

    const { fixedType } = props
    const { elemStore } = tableInternalData
    const prefix = `${fixedType || 'main'}-body-`
    elemStore[`${prefix}wrapper`] = null
    elemStore[`${prefix}scroll`] = null
    elemStore[`${prefix}table`] = null
    elemStore[`${prefix}colgroup`] = null
    elemStore[`${prefix}list`] = null
    elemStore[`${prefix}xSpace`] = null
    elemStore[`${prefix}ySpace`] = null
    elemStore[`${prefix}emptyBlock`] = null
  },
  render (this: any, h: CreateElement) {
    const props = this
    const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods
    const tableProps = $xeTable
    const tableReactData = $xeTable as unknown as TableReactData
    const tableInternalData = $xeTable as unknown as TableInternalData

    const { xID, $scopedSlots } = $xeTable
    const { fixedColumn, fixedType, tableColumn } = props

    const { showOverflow: allColumnOverflow, spanMethod, footerSpanMethod, mouseConfig } = tableProps
    const { isGroup, tableData, scrollXLoad, scrollYLoad, isAllOverflow, isDragRowMove, expandColumn, dragRow, dragCol } = tableReactData
    const { visibleColumn, fullAllDataRowIdData, fullColumnIdData } = tableInternalData
    const rowOpts = $xeTable.computeRowOpts
    const emptyOpts = $xeTable.computeEmptyOpts
    const mouseOpts = $xeTable.computeMouseOpts
    const rowDragOpts = $xeTable.computeRowDragOpts
    const leftFixedWidth = $xeTable.computeLeftFixedWidth
    const rightFixedWidth = $xeTable.computeRightFixedWidth

    let renderDataList = tableData
    let renderColumnList = tableColumn as VxeTableDefines.ColumnInfo[]
    let isOptimizeMode = false
    // 如果是使用优化模式
    if (scrollXLoad || scrollYLoad || (allColumnOverflow && isAllOverflow)) {
      if (expandColumn || spanMethod || footerSpanMethod) {
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

    // 行拖拽
    if (scrollYLoad && dragRow) {
      if (renderDataList.length > 2) {
        const dRowRest = fullAllDataRowIdData[getRowid($xeTable, dragRow)]
        if (dRowRest) {
          const drIndex = dRowRest._index
          const firstRow = renderDataList[0]
          const lastRow = renderDataList[renderDataList.length - 1]
          const firstRowRest = fullAllDataRowIdData[getRowid($xeTable, firstRow)]
          const lastRowRest = fullAllDataRowIdData[getRowid($xeTable, lastRow)]
          if (firstRowRest && lastRowRest) {
            const frIndex = firstRowRest._index
            const lrIndex = lastRowRest._index
            if (drIndex < frIndex) {
              renderDataList = [dragRow].concat(renderDataList)
            } else if (drIndex > lrIndex) {
              renderDataList = renderDataList.concat([dragRow])
            }
          }
        }
      }
    }

    if (!fixedType && !isGroup) {
      // 列拖拽
      if (scrollXLoad && dragCol) {
        if (renderColumnList.length > 2) {
          const dCowRest = fullColumnIdData[dragCol.id]
          if (dCowRest) {
            const dcIndex = dCowRest._index
            const firstCol = renderColumnList[0]
            const lastCol = renderColumnList[renderColumnList.length - 1]
            const firstColRest = fullColumnIdData[firstCol.id]
            const lastColRest = fullColumnIdData[lastCol.id]
            if (firstColRest && lastColRest) {
              const fcIndex = firstColRest._index
              const lcIndex = lastColRest._index
              if (dcIndex < fcIndex) {
                renderColumnList = [dragCol].concat(renderColumnList)
              } else if (dcIndex > lcIndex) {
                renderColumnList = renderColumnList.concat([dragCol])
              }
            }
          }
        }
      }
    }

    let emptyContent
    if ($scopedSlots.empty) {
      emptyContent = $scopedSlots.empty.call(this, { $table: $xeTable, $grid: $xeTable.xegrid })
    } else {
      const compConf = emptyOpts.name ? renderer.get(emptyOpts.name) : null
      const rtEmptyView = compConf ? (compConf.renderTableEmpty || compConf.renderTableEmptyView || compConf.renderEmpty) : null
      if (rtEmptyView) {
        emptyContent = getSlotVNs(rtEmptyView.call(this, h, emptyOpts, { $table: $xeTable }))
      } else {
        emptyContent = tableProps.emptyText || getI18n('vxe.table.emptyText')
      }
    }

    const ons: Record<string, any> = {
      scroll (evnt: Event) {
        $xeTable.triggerBodyScrollEvent(evnt, fixedType)
      }
    }
    if (scrollYLoad || leftFixedWidth || rightFixedWidth) {
      ons.wheel = $xeTable.triggerBodyWheelEvent
    }

    return h('div', {
      ref: 'refElem',
      class: ['vxe-table--body-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      attrs: {
        xid: xID
      }
    }, [
      h('div', {
        ref: 'refBodyScroll',
        class: 'vxe-table--body-inner-wrapper',
        on: ons
      }, [
        fixedType
          ? renderEmptyElement($xeTable)
          : h('div', {
            ref: 'refBodyXSpace',
            class: 'vxe-body--x-space'
          }),
        h('div', {
          ref: 'refBodyYSpace',
          class: 'vxe-body--y-space'
        }),
        h('table', {
          ref: 'refBodyTable',
          class: 'vxe-table--body',
          attrs: {
            xid: xID,
            cellspacing: 0,
            cellpadding: 0,
            border: 0
          }
        }, [
        /**
         * 列宽
         */
          h('colgroup', {
            ref: 'refBodyColgroup'
          }, renderColumnList.map((column: any, $columnIndex: any) => {
            return h('col', {
              attrs: {
                name: column.id
              },
              key: $columnIndex
            })
          })),
          /**
         * 内容
         */
          rowOpts.drag && rowDragOpts.animation
            ? h('transition-group', {
              ref: 'refBodyTBody',
              props: {
                tag: 'tbody',
                name: `vxe-body--row-list${isDragRowMove ? '' : '-disabled'}`
              }
            }, renderRows(h, this, fixedType, isOptimizeMode, renderDataList, renderColumnList))
            : h('tbody', {
              ref: 'refBodyTBody'
            }, renderRows(h, this, fixedType, isOptimizeMode, renderDataList, renderColumnList))
        ]),
        h('div', {
          class: 'vxe-table--checkbox-range'
        }),
        mouseConfig && mouseOpts.area
          ? h('div', {
            class: 'vxe-table--cell-area'
          }, [
            h('span', {
              class: 'vxe-table--cell-main-area'
            }, mouseOpts.extension
              ? [
                  h('span', {
                    class: 'vxe-table--cell-main-area-btn',
                    on: {
                      mousedown (evnt: any) {
                        if ($xeTable.triggerCellAreaExtendMousedownEvent) {
                          $xeTable.triggerCellAreaExtendMousedownEvent(evnt, { $table: $xeTable, fixed: fixedType, type: renderType })
                        }
                      }
                    }
                  })
                ]
              : null),
            h('span', {
              class: 'vxe-table--cell-copy-area'
            }),
            h('span', {
              class: 'vxe-table--cell-extend-area'
            }),
            h('span', {
              class: 'vxe-table--cell-multi-area'
            }),
            h('span', {
              class: 'vxe-table--cell-active-area'
            })
          ])
          : renderEmptyElement($xeTable),
        !fixedType
          ? h('div', {
            class: 'vxe-table--empty-block',
            ref: 'emptyBlock'
          }, [
            h('div', {
              class: 'vxe-table--empty-content'
            }, emptyContent)
          ])
          : renderEmptyElement($xeTable)
      ])
    ])
  }
}
