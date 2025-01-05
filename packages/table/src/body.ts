import { CreateElement } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { isEnableConf, getClass } from '../../ui/src/utils'
import { getOffsetSize, calcTreeLine, mergeBodyMethod, getRowid } from './util'
import { updateCellTitle, setScrollTop, setScrollLeft } from '../../ui/src/dom'
import { getSlotVNs } from '../../ui/src/vn'

const { getI18n, renderer, renderEmptyElement } = VxeUI

const renderType = 'body'

// 滚动、拖动过程中不需要触发
function isVMScrollProcess ($xetable: any) {
  return $xetable._isResize || ($xetable.lastScrollTime && Date.now() < $xetable.lastScrollTime + $xetable.delayHover)
}

function renderLine (h: CreateElement, _vm: any, $xetable: any, params: any) {
  const { row, column } = params
  const { afterFullData, treeOpts, treeConfig, fullAllDataRowIdData } = $xetable
  const { slots, treeNode } = column
  const rowid = getRowid($xetable, row)
  const rest = fullAllDataRowIdData[rowid]
  let rLevel = 0
  let rIndex = 0
  let items = []
  if (rest) {
    rLevel = rest.level
    rIndex = rest._index
    items = rest.items
  }
  if (slots && slots.line) {
    return $xetable.callSlot(slots.line, params, h)
  }
  const isFirstRow = $xetable.eqRow(afterFullData[0], row)
  if (treeConfig && treeNode && (treeOpts.showLine || treeOpts.line)) {
    return [
      h('div', {
        class: 'vxe-tree--line-wrapper'
      }, [
        h('div', {
          class: 'vxe-tree--line',
          style: {
            height: `${isFirstRow ? 1 : calcTreeLine(params, items, rIndex)}px`,
            left: `${(rLevel * treeOpts.indent) + (rLevel ? 2 - getOffsetSize($xetable) : 0) + 16}px`
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
function renderColumn (h: any, _vm: any, $xeTable: any, seq: any, rowid: any, fixedType: any, rowLevel: any, row: any, rowIndex: any, $rowIndex: any, _rowIndex: any, column: any, $columnIndex: any, columns: any, items: any) {
  const {
    $listeners: tableListeners,
    fullAllDataRowIdData,
    afterFullData,
    tableData,
    height,
    columnKey,
    overflowX,
    sYOpts,
    scrollXLoad,
    scrollYLoad,
    isCalcCellHeight,
    highlightCurrentRow,
    showOverflow: allColumnOverflow,
    isAllOverflow,
    align: allAlign,
    currentColumn,
    cellClassName: allCellClassName,
    cellStyle,
    mergeList,
    spanMethod,
    radioOpts,
    checkboxOpts,
    expandOpts,
    treeOpts,
    tooltipOpts,
    mouseConfig,
    editConfig,
    editOpts,
    editRules,
    validOpts,
    editStore,
    tooltipConfig,
    rowOpts,
    columnOpts,
    mouseOpts,
    areaOpts,
    validErrorMaps
  } = $xeTable
  const rowDragOpts = $xeTable.computeRowDragOpts
  const { disabledMethod: dragDisabledMethod, isCrossDrag, isPeerDrag } = rowDragOpts
  const { selectCellToRow } = areaOpts
  const cellOpts = $xeTable.computeCellOpts
  const { type, cellRender, editRender, align, showOverflow, className, treeNode, slots } = column
  const { verticalAlign } = cellOpts
  const { actived } = editStore
  const { rHeight: scrollYRHeight } = sYOpts
  const { height: rowHeight } = rowOpts
  const renderOpts = editRender || cellRender
  const compConf = renderOpts ? renderer.get(renderOpts.name) : null
  const compCellClassName = compConf ? (compConf.tableCellClassName || compConf.cellClassName) : ''
  const compCellStyle = compConf ? (compConf.tableCellStyle || compConf.cellStyle) : ''
  const showAllTip = tooltipOpts.showAll || tooltipOpts.enabled
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
  let isDirty: any
  const tdOns: any = {}
  const rest = fullAllDataRowIdData[rowid]
  const cellAlign = align || (compConf ? compConf.tableCellAlign : '') || allAlign
  const errorValidItem = validErrorMaps[`${rowid}:${column.id}`]
  const showValidTip = editRules && validOpts.showMessage && (validOpts.message === 'default' ? (height || tableData.length > 1) : validOpts.message === 'inline')
  const attrs: any = { colid: column.id }
  const bindMouseenter = tableListeners['cell-mouseenter']
  const bindMouseleave = tableListeners['cell-mouseleave']
  const triggerDblclick = (editRender && editConfig && editOpts.trigger === 'dblclick')
  const params = { $table: $xeTable, $grid: $xeTable.$xegrid, isEdit: false, seq, rowid, row, rowIndex, $rowIndex, _rowIndex, column, columnIndex, $columnIndex, _columnIndex, fixed: fixedType, type: renderType, isHidden: fixedHiddenColumn, level: rowLevel, visibleData: afterFullData, data: tableData, items }
  let isRowDragCell = false
  let isDisabledDrag = false
  if (rowOpts.drag) {
    isRowDragCell = rowDragOpts.trigger === 'row' || (column.dragSort && rowDragOpts.trigger === 'cell')
  }
  if (isRowDragCell) {
    isDisabledDrag = !!(dragDisabledMethod && dragDisabledMethod(params))
  }
  // hover 进入事件
  if (showTitle || showTooltip || showAllTip || bindMouseenter || tooltipConfig) {
    tdOns.mouseenter = (evnt: any) => {
      if (isVMScrollProcess($xeTable)) {
        return
      }
      if (showTitle) {
        updateCellTitle(evnt.currentTarget, column)
      } else if (showTooltip || showAllTip) {
        // 如果配置了显示 tooltip
        $xeTable.triggerBodyTooltipEvent(evnt, params)
      }
      if (bindMouseenter) {
        $xeTable.emitEvent('cell-mouseenter', Object.assign({ cell: evnt.currentTarget }, params), evnt)
      }
    }
  }
  // hover 退出事件
  if (showTooltip || showAllTip || bindMouseleave || tooltipConfig) {
    tdOns.mouseleave = (evnt: any) => {
      if (isVMScrollProcess($xeTable)) {
        return
      }
      if (showTooltip || showAllTip) {
        $xeTable.handleTargetLeaveEvent(evnt)
      }
      if (bindMouseleave) {
        $xeTable.emitEvent('cell-mouseleave', Object.assign({ cell: evnt.currentTarget }, params), evnt)
      }
    }
  }
  // 按下事件处理
  if (isRowDragCell || checkboxOpts.range || mouseConfig) {
    tdOns.mousedown = (evnt: any) => {
      $xeTable.triggerCellMousedownEvent(evnt, params)
    }
  }
  // 拖拽列事件
  if (isRowDragCell) {
    tdOns.mouseup = $xeTable.triggerCellMouseupEvent
  }
  // 点击事件处理
  if ((rowOpts.isCurrent || highlightCurrentRow) ||
    tableListeners['cell-click'] ||
    (editRender && editConfig) ||
    (expandOpts.trigger === 'row' || (expandOpts.trigger === 'cell')) ||
    (radioOpts.trigger === 'row' || (column.type === 'radio' && radioOpts.trigger === 'cell')) ||
    (checkboxOpts.trigger === 'row' || (column.type === 'checkbox' && checkboxOpts.trigger === 'cell')) ||
    (treeOpts.trigger === 'row' || (column.treeNode && treeOpts.trigger === 'cell'))) {
    tdOns.click = (evnt: any) => {
      $xeTable.triggerCellClickEvent(evnt, params)
    }
  }
  // 双击事件处理
  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = (evnt: any) => {
      $xeTable.triggerCellDblclickEvent(evnt, params)
    }
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
          maxHeight: hasEllipsis && (scrollYRHeight || rowHeight) ? `${scrollYRHeight || rowHeight}px` : ''
        }
      })
    )
  } else {
    // 渲染单元格
    tdVNs.push(
      ...renderLine(h, _vm, $xeTable, params),
      h('div', {
        class: ['vxe-cell', {
          'c--title': showTitle,
          'c--tooltip': showTooltip,
          'c--ellipsis': showEllipsis
        }],
        style: {
          maxHeight: hasEllipsis && (scrollYRHeight || rowHeight) ? `${scrollYRHeight || rowHeight}px` : ''
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
            : null
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
    if (scrollYRHeight || rowHeight) {
      cellHeight = `${scrollYRHeight || rowHeight}px`
    } else if (!isAllOverflow) {
      cellHeight = `${vnHeight || rowHeight || 18}px`
    }
  } else {
    cellHeight = `${vnHeight || rowHeight || 18}px`
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
  const isAutoCellWidth = !column.resizeWidth && (column.minWidth === 'auto' || column.width === 'auto')

  return h('td', {
    class: [
      'vxe-body--column',
      column.id,
      {
        [`col--${cellAlign}`]: cellAlign,
        [`col--vertical-${verticalAlign}`]: verticalAlign,
        [`col--${type}`]: type,
        'col--last': $columnIndex === columns.length - 1,
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
  }, tdVNs)
}

function renderRows (h: CreateElement, _vm: any, $xeTable: any, fixedType: any, tableData: any, tableColumn: any) {
  const columnOpts = $xeTable.computeColumnOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const {
    stripe,
    rowKey,
    highlightHoverRow,
    rowClassName,
    rowStyle,
    editConfig,
    showOverflow: allColumnOverflow,
    treeConfig,
    treeOpts,
    expandOpts,
    editOpts,
    treeExpandedMaps,
    scrollXLoad,
    scrollYLoad,
    rowExpandedMaps,
    radioOpts,
    checkboxOpts,
    expandColumn,
    hasFixedColumn,
    fullAllDataRowIdData,
    rowOpts,
    pendingRowMaps,
    isDragColMove
  } = $xeTable
  const { transform, seqMode } = treeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  const rows: any[] = []
  tableData.forEach((row: any, $rowIndex: any) => {
    const trOn: any = {}
    let rowIndex = $rowIndex
    // 确保任何情况下 rowIndex 都精准指向真实 data 索引
    rowIndex = $xeTable.getRowIndex(row)
    // 当前行事件
    if (rowOpts.isHover || highlightHoverRow) {
      trOn.mouseenter = (evnt: any) => {
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
    let seq = -1
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
    const params = { $table: $xeTable, seq, rowid, fixed: fixedType, type: renderType, level: rowLevel, row, rowIndex, $rowIndex }
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
        'row--radio': radioOpts.highlight && $xeTable.selectRadioRow === row,
        'row--checked': checkboxOpts.highlight && $xeTable.isCheckedByCheckboxRow(row),
        'row--pending': !!pendingRowMaps[rowid]
      },
      rowClassName ? (XEUtils.isFunction(rowClassName) ? rowClassName(params) : rowClassName) : ''
    ]
    const tdVNs = tableColumn.map((column: any, $columnIndex: any) => {
      return renderColumn(h, _vm, $xeTable, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, tableColumn, tableData)
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
          style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(params) : rowStyle) : null,
          key: rowKey || scrollXLoad || scrollYLoad || rowOpts.useKey || rowOpts.drag || columnOpts.drag || treeConfig ? rowid : $rowIndex,
          nativeOn: trOn
        }, tdVNs)
        : h('tr', {
          class: trClass,
          attrs: {
            rowid
          },
          style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(params) : rowStyle) : null,
          key: rowKey || scrollXLoad || scrollYLoad || rowOpts.useKey || rowOpts.drag || columnOpts.drag || treeConfig ? rowid : $rowIndex,
          on: trOn
        }, tdVNs)
    )
    // 如果行被展开了
    if (isExpandRow) {
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
      const expandParams = { $table: $xeTable, seq, column: expandColumn, fixed: fixedType, type: renderType, level: rowLevel, row, rowIndex, $rowIndex }
      rows.push(
        h('tr', {
          class: ['vxe-body--expanded-row', {
            'is--padding': padding
          }],
          key: `expand_${rowid}`,
          style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(expandParams) : rowStyle) : null,
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
      rows.push(...renderRows(h, _vm, $xeTable, fixedType, rowChildren, tableColumn))
    }
  })
  return rows
}

export default {
  name: 'VxeTableBody',
  props: {
    tableData: Array,
    tableColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String
  },
  data () {
    return {
      wheelTime: null,
      wheelYSize: 0,
      wheelYInterval: 0,
      wheelYTotal: 0
    }
  },
  mounted (this: any) {
    const { $parent: $xetable, $el, $refs, fixedType } = this
    const { elemStore } = $xetable
    const prefix = `${fixedType || 'main'}-body-`
    elemStore[`${prefix}wrapper`] = $el
    elemStore[`${prefix}table`] = $refs.table
    elemStore[`${prefix}colgroup`] = $refs.colgroup
    elemStore[`${prefix}list`] = $refs.tbody
    elemStore[`${prefix}xSpace`] = $refs.xSpace
    elemStore[`${prefix}ySpace`] = $refs.ySpace
    elemStore[`${prefix}emptyBlock`] = $refs.emptyBlock
  },
  beforeDestroy (this: any) {
    clearTimeout(this.wheelTime)
  },
  destroyed (this: any) {
    const { $parent: $xetable, fixedType } = this
    const { elemStore } = $xetable
    const prefix = `${fixedType || 'main'}-body-`
    elemStore[`${prefix}wrapper`] = null
    elemStore[`${prefix}table`] = null
    elemStore[`${prefix}colgroup`] = null
    elemStore[`${prefix}list`] = null
    elemStore[`${prefix}xSpace`] = null
    elemStore[`${prefix}ySpace`] = null
    elemStore[`${prefix}emptyBlock`] = null
  },
  render (this: any, h: CreateElement) {
    const props = this
    const $xeTable = this.$parent
    const tableProps = $xeTable
    const tableReactData = $xeTable
    const tableInternalData = $xeTable

    const { tId, $scopedSlots } = $xeTable
    const { fixedColumn, fixedType, tableColumn } = props

    const { showOverflow: allColumnOverflow, spanMethod, footerSpanMethod, mouseConfig } = tableProps
    const { isGroup, tableData, scrollXLoad, scrollYLoad, isAllOverflow, isDragRowMove, expandColumn, dragRow, dragCol } = tableReactData
    const { visibleColumn, fullAllDataRowIdData, fullColumnIdData } = tableInternalData
    const rowOpts = $xeTable.computeRowOpts
    const sYOpts = $xeTable.computeSYOpts
    const emptyOpts = $xeTable.computeEmptyOpts
    const mouseOpts = $xeTable.computeMouseOpts
    const rowDragOpts = $xeTable.computeRowDragOpts

    let renderDataList = tableData
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
      emptyContent = $scopedSlots.empty.call(this, { $table: $xeTable, $grid: $xeTable.xegrid }, h)
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
      scroll: this.scrollEvent
    }
    if (sYOpts.mode === 'wheel') {
      ons.wheel = this.wheelEvent
    }

    return h('div', {
      ref: 'refElem',
      class: ['vxe-table--body-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      attrs: {
        xid: tId
      },
      on: ons
    }, [
      fixedType
        ? renderEmptyElement($xeTable)
        : h('div', {
          class: 'vxe-body--x-space',
          ref: 'xSpace'
        }),
      h('div', {
        class: 'vxe-body--y-space',
        ref: 'ySpace'
      }),
      h('table', {
        class: 'vxe-table--body',
        attrs: {
          xid: tId,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        ref: 'table'
      }, [
        /**
         * 列宽
         */
        h('colgroup', {
          ref: 'colgroup'
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
            props: {
              tag: 'tbody',
              name: `vxe-body--row-list${isDragRowMove ? '' : '-disabled'}`
            }
          }, renderRows(h, this, $xeTable, fixedType, renderDataList, renderColumnList))
          : h('tbody', {
            ref: 'tbody'
          }, renderRows(h, this, $xeTable, fixedType, renderDataList, renderColumnList))
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
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent (evnt: Event) {
      const $xeTable = this.$parent
      const tableInternalData = $xeTable

      const { fixedType } = this
      const { lastScrollTop, lastScrollLeft, inVirtualScroll, inBodyScroll, bodyScrollType, inFooterScroll } = tableInternalData
      if (inVirtualScroll) {
        return
      }
      if (inFooterScroll) {
        return
      }
      if (inBodyScroll) {
        if (bodyScrollType !== fixedType) {
          return
        }
      }
      const { tableHeader, tableBody, leftBody, rightBody, tableFooter } = $xeTable.$refs
      const scrollBodyElem = this.$el as HTMLDivElement
      const headerElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
      const footerElem = tableFooter ? tableFooter.$el as HTMLDivElement : null
      const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
      if (!bodyElem) {
        return
      }
      const leftElem = leftBody ? leftBody.$el as HTMLDivElement : null
      const rightElem = rightBody ? rightBody.$el as HTMLDivElement : null
      const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
      const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
      const scrollTop = scrollBodyElem.scrollTop
      const scrollLeft = bodyElem.scrollLeft
      const isRollX = scrollLeft !== lastScrollLeft
      const isRollY = scrollTop !== lastScrollTop
      tableInternalData.inBodyScroll = true
      tableInternalData.bodyScrollType = fixedType
      if (isRollY) {
        if (leftElem && fixedType === 'left') {
          setScrollTop(bodyElem, scrollTop)
          setScrollTop(rightElem, scrollTop)
        } else if (rightElem && fixedType === 'right') {
          setScrollTop(bodyElem, scrollTop)
          setScrollTop(leftElem, scrollTop)
        } else {
          setScrollTop(leftElem, scrollTop)
          setScrollTop(rightElem, scrollTop)
        }
        setScrollTop(yHandleEl, scrollTop)
        $xeTable.triggerScrollYEvent(evnt)
      }
      if (isRollX) {
        setScrollLeft(xHandleEl, scrollLeft)
        setScrollLeft(headerElem, scrollLeft)
        setScrollLeft(footerElem, scrollLeft)
        $xeTable.triggerScrollXEvent(evnt)
      }
      $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
        type: renderType,
        fixed: fixedType
      })
    },
    handleWheel (evnt: any, isTopWheel: any, deltaTop: any, isRollX: any, isRollY: any) {
      const { $parent: $xetable } = this
      const { $refs, elemStore, scrollYLoad, scrollXLoad } = $xetable
      const { tableBody, leftBody, rightBody } = $refs
      const bodyElem = tableBody.$el
      const leftElem = leftBody ? leftBody.$el : null
      const rightElem = rightBody ? rightBody.$el : null
      const remainSize = this.isPrevWheelTop === isTopWheel ? Math.max(0, this.wheelYSize - this.wheelYTotal) : 0
      const bodyYElem = elemStore['main-body-ySpace']
      const bodyXElem = elemStore['main-body-xSpace']
      const bodyHeight = scrollYLoad && bodyYElem ? bodyYElem.clientHeight : bodyElem.clientHeight
      const bodyWidth = scrollXLoad && bodyXElem ? bodyXElem.clientWidth : bodyElem.clientWidth
      this.isPrevWheelTop = isTopWheel
      this.wheelYSize = Math.abs(isTopWheel ? deltaTop - remainSize : deltaTop + remainSize)
      this.wheelYInterval = 0
      this.wheelYTotal = 0
      clearTimeout(this.wheelTime)
      const handleSmooth = () => {
        let { fixedType, wheelYTotal, wheelYSize, wheelYInterval } = this
        if (wheelYTotal < wheelYSize) {
          wheelYInterval = Math.max(5, Math.floor(wheelYInterval * 1.5))
          wheelYTotal = wheelYTotal + wheelYInterval
          if (wheelYTotal > wheelYSize) {
            wheelYInterval = wheelYInterval - (wheelYTotal - wheelYSize)
          }
          const { scrollTop, clientHeight, scrollHeight } = bodyElem
          const targetTop = scrollTop + (wheelYInterval * (isTopWheel ? -1 : 1))
          bodyElem.scrollTop = targetTop
          if (leftElem) {
            leftElem.scrollTop = targetTop
          }
          if (rightElem) {
            rightElem.scrollTop = targetTop
          }
          if (isTopWheel ? targetTop < scrollHeight - clientHeight : targetTop >= 0) {
            this.wheelTime = setTimeout(handleSmooth, 10)
          }
          this.wheelYTotal = wheelYTotal
          this.wheelYInterval = wheelYInterval
          $xetable.emitEvent('scroll', {
            type: renderType,
            fixed: fixedType,
            scrollTop: bodyElem.scrollTop,
            scrollLeft: bodyElem.scrollLeft,
            scrollHeight: bodyElem.scrollHeight,
            scrollWidth: bodyElem.scrollWidth,
            bodyHeight,
            bodyWidth,
            isX: isRollX,
            isY: isRollY
          }, evnt)
        }
      }
      handleSmooth()
    },
    /**
     * 滚轮处理
     */
    wheelEvent (evnt: any) {
      const { deltaY, deltaX } = evnt
      const { $el: scrollBodyElem, $parent: $xetable } = this
      const { $refs, highlightHoverRow, scrollYLoad, lastScrollTop, lastScrollLeft, rowOpts } = $xetable
      const { tableBody } = $refs
      const bodyElem = tableBody.$el

      const deltaTop = deltaY
      const deltaLeft = deltaX
      const isTopWheel = deltaTop < 0
      // 如果滚动位置已经是顶部或底部，则不需要触发
      if (isTopWheel ? scrollBodyElem.scrollTop <= 0 : scrollBodyElem.scrollTop >= scrollBodyElem.scrollHeight - scrollBodyElem.clientHeight) {
        return
      }

      const scrollTop = scrollBodyElem.scrollTop + deltaTop
      const scrollLeft = bodyElem.scrollLeft + deltaLeft
      const isRollX = scrollLeft !== lastScrollLeft
      const isRollY = scrollTop !== lastScrollTop

      // 用于鼠标纵向滚轮处理
      if (isRollY) {
        evnt.preventDefault()
        $xetable.lastScrollTop = scrollTop
        $xetable.lastScrollLeft = scrollLeft
        $xetable.lastScrollTime = Date.now()
        if (rowOpts.isHover || highlightHoverRow) {
          $xetable.clearHoverRow()
        }
        this.handleWheel(evnt, isTopWheel, deltaTop, isRollX, isRollY)
        if (scrollYLoad) {
          $xetable.triggerScrollYEvent(evnt)
        }
      }
    }
  } as any
}
