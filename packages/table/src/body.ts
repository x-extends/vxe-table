import { h, ref, Ref, PropType, inject, nextTick, onMounted, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { getOffsetSize, calcTreeLine, getRowid, createHandleGetRowId, getCellRestHeight } from './util'
import { updateCellTitle, getPropClass } from '../../ui/src/dom'
import { isEnableConf } from '../../ui/src/utils'
import { getSlotVNs } from '../../ui/src/vn'

import type { VxeTablePrivateMethods, VxeTableConstructor, VxeTableDefines, VxeComponentSlotType } from '../../../types'

const { getI18n, renderer, renderEmptyElement } = VxeUI

const renderType = 'body'

export default defineVxeComponent({
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
  setup (props) {
    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTablePrivateMethods)

    const { xID, props: tableProps, context: tableContext, reactData: tableReactData, internalData: tableInternalData } = $xeTable
    const { computeEditOpts, computeMouseOpts, computeCellOffsetWidth, computeAreaOpts, computeDefaultRowHeight, computeEmptyOpts, computeTooltipOpts, computeRadioOpts, computeExpandOpts, computeTreeOpts, computeCheckboxOpts, computeCellOpts, computeValidOpts, computeRowOpts, computeColumnOpts, computeRowDragOpts, computeResizableOpts, computeVirtualXOpts, computeVirtualYOpts } = $xeTable.getComputeMaps()

    const refElem = ref() as Ref<HTMLDivElement>
    const refBodyScroll = ref() as Ref<HTMLDivElement>
    const refBodyTable = ref() as Ref<HTMLTableElement>
    const refBodyColgroup = ref() as Ref<HTMLTableColElement>
    const refBodyTBody = ref() as Ref<HTMLTableSectionElement>
    const refBodyXSpace = ref() as Ref<HTMLDivElement>
    const refBodyYSpace = ref() as Ref<HTMLDivElement>
    const refBodyEmptyBlock = ref() as Ref<HTMLDivElement>

    // 滚动、拖动过程中不需要触发
    const isVMScrollProcess = () => {
      const { delayHover } = tableProps
      const { lastScrollTime, isDragResize } = tableReactData
      return !!(isDragResize || (lastScrollTime && Date.now() < lastScrollTime + (delayHover as number)))
    }

    const renderLine = (rowid: string, params: VxeTableDefines.CellRenderBodyParams, cellHeight: number): VxeComponentSlotType[] => {
      const { column } = params
      const { afterFullData } = tableInternalData
      const { treeConfig } = tableProps
      const treeOpts = computeTreeOpts.value
      const { slots, treeNode } = column
      const { fullAllDataRowIdData } = tableInternalData
      if (slots && (slots as any).line) {
        return $xeTable.callSlot((slots as any).line, params)
      }
      const rowRest = fullAllDataRowIdData[rowid]
      let rLevel = 0
      let prevRow = null
      if (rowRest) {
        rLevel = rowRest.level
        prevRow = rowRest.items[rowRest.treeIndex - 1]
      }
      if (treeConfig && treeNode && (treeOpts.showLine || treeOpts.line)) {
        return [
          h('div', {
            key: 'tl',
            class: 'vxe-tree--line-wrapper'
          }, [
            h('div', {
              class: 'vxe-tree--line',
              style: {
                height: `${getRowid($xeTable, afterFullData[0]) === rowid ? 1 : calcTreeLine(params, prevRow)}px`,
                bottom: `-${Math.floor(cellHeight / 2)}px`,
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
    const renderTdColumn = (
      seq: number | string,
      rowid: string,
      fixedType: 'left' | 'right' | '',
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
    ) => {
      const $xeGrid = $xeTable.xeGrid

      const { columnKey, resizable: allResizable, showOverflow: allShowOverflow, border, height, treeConfig, cellClassName: allCellClassName, cellStyle, align: allAlign, spanMethod, mouseConfig, editConfig, editRules, tooltipConfig, padding: allPadding } = tableProps
      const { tableData, dragRow, overflowX, currentColumn, scrollXLoad, scrollYLoad, mergeBodyFlag, calcCellHeightFlag, resizeHeightFlag, resizeWidthFlag, editStore, isAllOverflow, validErrorMaps } = tableReactData
      const { fullAllDataRowIdData, fullColumnIdData, mergeBodyCellMaps, visibleColumn, afterFullData, mergeBodyList, scrollXStore, scrollYStore } = tableInternalData
      const cellOpts = computeCellOpts.value
      const validOpts = computeValidOpts.value
      const checkboxOpts = computeCheckboxOpts.value
      const editOpts = computeEditOpts.value
      const tooltipOpts = computeTooltipOpts.value
      const resizableOpts = computeResizableOpts.value
      const virtualXOpts = computeVirtualXOpts.value
      const virtualYOpts = computeVirtualYOpts.value
      const { isAllColumnDrag, isAllRowDrag } = resizableOpts
      const rowOpts = computeRowOpts.value
      const rowDragOpts = computeRowDragOpts.value
      const defaultRowHeight = computeDefaultRowHeight.value
      const customCellHeight = calcCellHeightFlag ? (cellOpts.height || rowOpts.height) : 0
      const { disabledMethod: dragDisabledMethod, isCrossDrag, isPeerDrag } = rowDragOpts
      const columnOpts = computeColumnOpts.value
      const mouseOpts = computeMouseOpts.value
      const areaOpts = computeAreaOpts.value
      const cellOffsetWidth = computeCellOffsetWidth.value
      const { selectCellToRow } = areaOpts
      const { type, cellRender, editRender, align, showOverflow, className, treeNode, rowResize, padding, verticalAlign, slots } = column
      const { verticalAlign: allVerticalAlign } = cellOpts
      const { actived } = editStore
      const rowRest = fullAllDataRowIdData[rowid] || {}
      const colid = column.id
      const colRest = fullColumnIdData[colid] || {}
      const renderOpts = editRender || cellRender
      const compConf = renderOpts ? renderer.get(renderOpts.name) : null
      const compCellClassName = compConf ? (compConf.tableCellClassName || compConf.cellClassName) : null
      const compCellStyle = compConf ? (compConf.tableCellStyle || compConf.cellStyle) : ''
      const showAllTip = tooltipOpts.showAll
      const columnIndex = colRest.index
      const _columnIndex = colRest._index
      const isEdit = isEnableConf(editRender)
      const resizeHeight = resizeHeightFlag ? rowRest.resizeHeight : 0
      let fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX
      const isCellPadding = XEUtils.eqNull(padding) ? (allPadding === null ? cellOpts.padding : allPadding) : padding
      const cellOverflow = XEUtils.eqNull(showOverflow) ? allShowOverflow : showOverflow
      const showEllipsis = cellOverflow === 'ellipsis'
      const showTitle = cellOverflow === 'title'
      const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
      const hasEllipsis = isAllOverflow || showTitle || showTooltip || showEllipsis
      const showResizable = (XEUtils.isBoolean(column.resizable) ? column.resizable : (columnOpts.resizable || allResizable))
      const isCsHeight = !!customCellHeight
      const isRsHeight = resizeHeight > 0
      let isDirty
      const tdOns: any = {}
      const cellAlign = align || (compConf ? compConf.tableCellAlign : '') || allAlign
      const cellVerticalAlign = XEUtils.eqNull(verticalAlign) ? allVerticalAlign : verticalAlign
      const errorValidItem = validErrorMaps[`${rowid}:${colid}`]
      const showValidTip = editRules && validOpts.showMessage && (validOpts.message === 'default' ? (height || tableData.length > 1) : validOpts.message === 'inline')
      const tdAttrs: any = { colid }
      const cellParams: VxeTableDefines.CellRenderBodyParams & {
        $table: VxeTableConstructor<any> & VxeTablePrivateMethods
      } = {
        $table: $xeTable,
        $grid: $xeGrid,
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
        isDisabledDrag = !!(dragDisabledMethod && dragDisabledMethod(cellParams))
      }
      // hover 进入事件
      if (showTitle || showTooltip || showAllTip || tooltipConfig) {
        tdOns.onMouseenter = (evnt: MouseEvent) => {
          if (isVMScrollProcess()) {
            return
          }
          if (showTitle) {
            updateCellTitle(evnt.currentTarget, column)
          } else if (showTooltip || showAllTip) {
            // 如果配置了显示 tooltip
            $xeTable.triggerBodyTooltipEvent(evnt, cellParams)
          }
          $xeTable.dispatchEvent('cell-mouseenter', Object.assign({ cell: evnt.currentTarget }, cellParams), evnt)
        }
      }
      // hover 退出事件
      if (showTooltip || showAllTip || tooltipConfig) {
        tdOns.onMouseleave = (evnt: MouseEvent) => {
          if (isVMScrollProcess()) {
            return
          }
          if (showTooltip || showAllTip) {
            $xeTable.handleTargetLeaveEvent(evnt)
          }
          $xeTable.dispatchEvent('cell-mouseleave', Object.assign({ cell: evnt.currentTarget }, cellParams), evnt)
        }
      }
      // 按下事件处理
      if (isRowDragCell || checkboxOpts.range || mouseConfig) {
        tdOns.onMousedown = (evnt: MouseEvent) => {
          $xeTable.triggerCellMousedownEvent(evnt, cellParams)
        }
      }
      // 拖拽列事件
      if (isRowDragCell) {
        tdOns.onMouseup = $xeTable.triggerCellMouseupEvent
      }
      // 点击事件处理
      tdOns.onClick = (evnt: MouseEvent) => {
        $xeTable.triggerCellClickEvent(evnt, cellParams)
      }
      // 双击事件处理
      tdOns.onDblclick = (evnt: MouseEvent) => {
        $xeTable.triggerCellDblclickEvent(evnt, cellParams)
      }
      let isMergeCell = false
      let mergeColspan = 1
      let mergeRowspan = 1
      // 合并行或列
      if (mergeBodyFlag && mergeBodyList.length) {
        const spanRest = mergeBodyCellMaps[`${_rowIndex}:${_columnIndex}`]
        if (spanRest) {
          const { rowspan, colspan } = spanRest
          if (!rowspan || !colspan) {
            return renderEmptyElement($xeTable)
          }
          if (rowspan > 1) {
            isMergeCell = true
            mergeRowspan = rowspan
            tdAttrs.rowspan = rowspan
          }
          if (colspan > 1) {
            isMergeCell = true
            mergeColspan = colspan
            tdAttrs.colspan = colspan
          }
        }
      } else if (spanMethod) {
        // 自定义合并行或列的方法
        const { rowspan = 1, colspan = 1 } = spanMethod(cellParams) || {}
        if (!rowspan || !colspan) {
          return renderEmptyElement($xeTable)
        }
        if (rowspan > 1) {
          isMergeCell = true
          mergeRowspan = rowspan
          tdAttrs.rowspan = rowspan
        }
        if (colspan > 1) {
          isMergeCell = true
          mergeColspan = colspan
          tdAttrs.colspan = colspan
        }
      }
      // 如果被合并不可隐藏
      if (fixedHiddenColumn && isMergeCell) {
        if (tdAttrs.colspan > 1 || tdAttrs.rowspan > 1) {
          fixedHiddenColumn = false
        }
      }
      // 如果编辑列开启显示状态
      if (!fixedHiddenColumn && editConfig && (editRender || cellRender) && (editOpts.showStatus || editOpts.showUpdateStatus)) {
        isDirty = $xeTable.isUpdateByRow(row, column.field)
      }

      const isVNAutoHeight = scrollYLoad && !hasEllipsis
      let cellHeight = getCellRestHeight(rowRest, cellOpts, rowOpts, defaultRowHeight)

      const isLastColumn = $columnIndex === columns.length - 1
      const isAutoCellWidth = !column.resizeWidth && (column.minWidth === 'auto' || column.width === 'auto')

      let isVNPreEmptyStatus = false
      if (!isMergeCell) {
        if (!dragRow || getRowid($xeTable, dragRow) !== rowid) {
          if (scrollYLoad && !treeConfig && !virtualYOpts.immediate && (_rowIndex < scrollYStore.visibleStartIndex - scrollYStore.preloadSize || _rowIndex > scrollYStore.visibleEndIndex + scrollYStore.preloadSize)) {
            isVNPreEmptyStatus = true
          } else if (scrollXLoad && !virtualXOpts.immediate && !column.fixed && (_columnIndex < scrollXStore.visibleStartIndex - scrollXStore.preloadSize || _columnIndex > scrollXStore.visibleEndIndex + scrollXStore.preloadSize)) {
            isVNPreEmptyStatus = true
          }
        }
      }

      if (mergeRowspan > 1) {
        const mEndRow = afterFullData[_rowIndex + mergeRowspan - 1]
        if (mEndRow) {
          const meRowRest = fullAllDataRowIdData[getRowid($xeTable, mEndRow)]
          if (meRowRest) {
            cellHeight += meRowRest.oTop + getCellRestHeight(meRowRest, cellOpts, rowOpts, defaultRowHeight) - rowRest.oTop - getCellRestHeight(rowRest, cellOpts, rowOpts, defaultRowHeight)
          }
        }
      }

      const tcStyle: Record<string, string> = {}
      if (hasEllipsis && resizeWidthFlag) {
        let mergeColWidth = 0
        if (mergeColspan > 1) {
          for (let index = 1; index < mergeColspan; index++) {
            const nextColumn = visibleColumn[columnIndex + index]
            if (nextColumn) {
              mergeColWidth += nextColumn.renderWidth
            }
          }
        }
        tcStyle.width = `${column.renderWidth + mergeColWidth - cellOffsetWidth}px`
      }
      if (scrollYLoad || hasEllipsis || isCsHeight || isRsHeight) {
        tcStyle.height = `${cellHeight}px`
      } else {
        tcStyle.minHeight = `${cellHeight}px`
      }

      // console.log(lastScrollTime)

      const tdVNs: VxeComponentSlotType[] = []
      if (fixedHiddenColumn && isAllOverflow) {
        tdVNs.push(
          h('div', {
            key: 'tc',
            class: ['vxe-cell', {
              'c--title': showTitle,
              'c--tooltip': showTooltip,
              'c--ellipsis': showEllipsis
            }],
            style: tcStyle
          })
        )
      } else {
        // 渲染单元格
        if (treeConfig) {
          tdVNs.push(...renderLine(rowid, cellParams, cellHeight))
        }
        tdVNs.push(
          h('div', {
            key: 'tc',
            class: ['vxe-cell', {
              'c--title': showTitle,
              'c--tooltip': showTooltip,
              'c--ellipsis': showEllipsis
            }],
            style: tcStyle,
            title: showTitle ? $xeTable.getCellLabel(row, column) : null
          }, isVNPreEmptyStatus
            ? []
            : [
                h('div', {
                  colid,
                  rowid,
                  class: 'vxe-cell--wrapper vxe-body-cell--wrapper'
                }, column.renderCell(cellParams))
              ])
        )
        if (showValidTip && errorValidItem) {
          const errRule = errorValidItem.rule
          const validSlot = slots ? slots.valid : null
          const validParams = { ...cellParams, ...errorValidItem, rule: errorValidItem }
          tdVNs.push(
            h('div', {
              key: 'tcv',
              class: ['vxe-cell--valid-error-tip', getPropClass(validOpts.className, validParams)],
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
                  ? $xeTable.callSlot(validSlot, validParams)
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

      let showAreaRowStatus = false
      if (mouseConfig && mouseOpts.area && !_columnIndex && selectCellToRow) {
        showAreaRowStatus = true
      }

      if (!fixedHiddenColumn && showResizable && isAllColumnDrag) {
        tdVNs.push(
          h('div', {
            key: 'tcc',
            class: ['vxe-cell--col-resizable', {
              'is--line': !border || border === 'none'
            }],
            onMousedown: (evnt: MouseEvent) => $xeTable.handleColResizeMousedownEvent(evnt, fixedType, cellParams),
            onDblclick: (evnt: MouseEvent) => $xeTable.handleColResizeDblclickEvent(evnt, cellParams)
          })
        )
      }

      if ((rowResize || isAllRowDrag) && rowOpts.resizable) {
        tdVNs.push(
          h('div', {
            key: 'tcr',
            class: 'vxe-cell--row-resizable',
            onMousedown: (evnt: MouseEvent) => $xeTable.handleRowResizeMousedownEvent(evnt, cellParams),
            onDblclick: (evnt: MouseEvent) => $xeTable.handleRowResizeDblclickEvent(evnt, cellParams)
          })
        )
      }

      return h('td', {
        class: [
          'vxe-table--column vxe-body--column',
          colid,
          cellVerticalAlign ? `col--vertical-${cellVerticalAlign}` : '',
          cellAlign ? `col--${cellAlign}` : '',
          type ? `col--${type}` : '',
          {
            'col--last': isLastColumn,
            'col--tree-node': treeNode,
            'col--edit': isEdit,
            'col--ellipsis': hasEllipsis,
            'col--cs-height': isCsHeight,
            'col--rs-height': isRsHeight,
            'col--to-row': showAreaRowStatus,
            'col--auto-height': isVNAutoHeight,
            'fixed--width': !isAutoCellWidth,
            'fixed--hidden': fixedHiddenColumn,
            'is--padding': isCellPadding,
            'is--progress': (fixedHiddenColumn && isAllOverflow) || isVNPreEmptyStatus,
            'is--drag-cell': isRowDragCell && (isCrossDrag || isPeerDrag || !rowLevel),
            'is--drag-disabled': isDisabledDrag,
            'col--dirty': isDirty,
            'col--active': editConfig && isEdit && (actived.row === row && (actived.column === column || editOpts.mode === 'row')),
            'col--valid-error': !!errorValidItem,
            'col--current': currentColumn === column
          },
          getPropClass(compCellClassName, cellParams),
          getPropClass(className, cellParams),
          getPropClass(allCellClassName, cellParams)
        ],
        key: columnKey || scrollXLoad || scrollYLoad || columnOpts.useKey || rowOpts.useKey || columnOpts.drag ? colid : $columnIndex,
        ...tdAttrs,
        style: Object.assign({}, XEUtils.isFunction(compCellStyle) ? compCellStyle(cellParams) : compCellStyle, XEUtils.isFunction(cellStyle) ? cellStyle(cellParams) : cellStyle),
        ...tdOns
      }, isOptimizeMode && fixedHiddenColumn ? [] : tdVNs)
    }

    const renderRows = (fixedType: 'left' | 'right' | '', isOptimizeMode: boolean, tableData: any[], tableColumn: VxeTableDefines.ColumnInfo[]) => {
      const $xeGrid = $xeTable.xeGrid

      const { stripe, rowKey, highlightHoverRow, rowClassName, rowStyle, editConfig, treeConfig } = tableProps
      const { hasFixedColumn, treeExpandedFlag, scrollXLoad, scrollYLoad, isAllOverflow, rowExpandedFlag, expandColumn, selectRadioRow, pendingRowFlag, rowExpandHeightFlag, isRowGroupStatus } = tableReactData
      const { fullAllDataRowIdData, fullColumnIdData, treeExpandedMaps, pendingRowMaps, rowExpandedMaps } = tableInternalData
      const checkboxOpts = computeCheckboxOpts.value
      const radioOpts = computeRadioOpts.value
      const treeOpts = computeTreeOpts.value
      const editOpts = computeEditOpts.value
      const rowOpts = computeRowOpts.value
      const columnOpts = computeColumnOpts.value
      const { transform, seqMode } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      const rows: any[] = []
      const { handleGetRowId } = createHandleGetRowId($xeTable)
      const isDeepRow = treeConfig || isRowGroupStatus
      tableData.forEach((row, $rowIndex) => {
        const rowid = handleGetRowId(row)
        const rowRest = fullAllDataRowIdData[rowid] || {}
        let rowIndex = $rowIndex
        let rowLevel = 0
        let seq: string | number = -1
        let _rowIndex = -1
        const hasRowGroupAggregate = isRowGroupStatus && row.isAggregate
        const trOn: Record<string, any> = {}
        // 当前行事件
        if (rowOpts.isHover || highlightHoverRow) {
          trOn.onMouseenter = (evnt: MouseEvent) => {
            if (isVMScrollProcess()) {
              return
            }
            $xeTable.triggerHoverEvent(evnt, { row, rowIndex })
          }
          trOn.onMouseleave = () => {
            if (isVMScrollProcess()) {
              return
            }
            $xeTable.clearHoverRow()
          }
        }
        if (rowRest) {
          rowLevel = rowRest.level
          if (hasRowGroupAggregate || (treeConfig && transform && seqMode === 'increasing')) {
            seq = rowRest._index + 1
          } else {
            seq = rowRest.seq
          }
          rowIndex = rowRest.index
          _rowIndex = rowRest._index
        }
        const params = { $table: $xeTable, seq, rowid, fixed: fixedType, type: renderType, level: rowLevel, row, rowIndex, $rowIndex, _rowIndex }
        // 行是否被展开
        const isExpandRow = expandColumn && !!rowExpandedFlag && !!rowExpandedMaps[rowid]
        // 树节点是否被展开
        let isExpandTree = false
        let rowChildren = []
        let isNewRow = false
        if (editConfig) {
          isNewRow = $xeTable.isInsertByRow(row)
        }
        if (treeConfig && !scrollYLoad && !transform) {
          rowChildren = row[childrenField]
          isExpandTree = !!treeExpandedFlag && rowChildren && rowChildren.length > 0 && !!treeExpandedMaps[rowid]
        }
        // 拖拽行事件
        if (rowOpts.drag && !isRowGroupStatus && (!treeConfig || transform)) {
          trOn.onDragstart = $xeTable.handleRowDragDragstartEvent
          trOn.onDragend = $xeTable.handleRowDragDragendEvent
          trOn.onDragover = $xeTable.handleRowDragDragoverEvent
        }
        const trClass = [
          'vxe-body--row',
          isDeepRow ? `row--level-${rowLevel}` : '',
          {
            'row--stripe': stripe && (_rowIndex + 1) % 2 === 0,
            'is--new': isNewRow,
            'is--expand-row': isExpandRow,
            'is--expand-tree': isExpandTree,
            'row--new': isNewRow && (editOpts.showStatus || editOpts.showInsertStatus),
            'row--radio': radioOpts.highlight && $xeTable.eqRow(selectRadioRow, row),
            'row--checked': checkboxOpts.highlight && $xeTable.isCheckedByCheckboxRow(row),
            'row--pending': !!pendingRowFlag && !!pendingRowMaps[rowid],
            'row--group': hasRowGroupAggregate
          },
          getPropClass(rowClassName, params)
        ]
        const tdVNs = tableColumn.map((column, $columnIndex) => {
          return renderTdColumn(seq, rowid, fixedType, isOptimizeMode, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, tableColumn, tableData)
        })
        rows.push(
          h('tr', {
            class: trClass,
            rowid: rowid,
            style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(params) : rowStyle) : null,
            key: rowKey || scrollXLoad || scrollYLoad || rowOpts.useKey || rowOpts.drag || columnOpts.drag || isRowGroupStatus || treeConfig ? rowid : $rowIndex,
            ...trOn
          }, tdVNs)
        )
        // 如果行被展开了
        if (isExpandRow) {
          const expandOpts = computeExpandOpts.value
          const { height: expandHeight, padding, mode: expandMode } = expandOpts
          if (expandMode === 'fixed') {
            rows.push(
              h('tr', {
                class: 'vxe-body--row-expanded-place',
                key: `expand_${rowid}`,
                rowid
              }, [
                h('td', {
                  class: 'vxe-body--row-expanded-place-column',
                  colspan: tableColumn.length,
                  style: {
                    height: `${rowExpandHeightFlag ? (rowRest.expandHeight || expandHeight) : 0}px`
                  }
                })
              ])
            )
          } else {
            const cellStyle: any = {}
            if (expandHeight) {
              cellStyle.height = `${expandHeight}px`
            }
            if (treeConfig) {
              cellStyle.paddingLeft = `${(rowLevel * treeOpts.indent) + 30}px`
            }
            const { showOverflow } = expandColumn || {}
            const colid = expandColumn.id
            const colRest = fullColumnIdData[colid] || {}
            const hasEllipsis = XEUtils.eqNull(showOverflow) ? isAllOverflow : showOverflow
            let columnIndex = -1
            let $columnIndex = -1
            let _columnIndex = -1
            if (colRest) {
              columnIndex = colRest.index
              $columnIndex = colRest.$index
              _columnIndex = colRest._index
            }
            const expandParams: VxeTableDefines.CellRenderDataParams = {
              $grid: $xeGrid,
              $table: $xeTable,
              seq,
              column: expandColumn as VxeTableDefines.ColumnInfo,
              columnIndex,
              $columnIndex,
              _columnIndex,
              fixed: fixedType,
              type: renderType,
              level: rowLevel,
              row,
              rowid,
              rowIndex,
              $rowIndex,
              _rowIndex,
              isHidden: false,
              isEdit: false,
              visibleData: [],
              data: [],
              items: []
            }
            rows.push(
              h('tr', {
                class: ['vxe-body--expanded-row', {
                  'is--padding': padding
                }],
                key: `expand_${rowid}`
              }, [
                h('td', {
                  class: ['vxe-body--expanded-column', {
                    'fixed--hidden': fixedType && !hasFixedColumn,
                    'col--ellipsis': hasEllipsis
                  }],
                  colspan: tableColumn.length
                }, [
                  h('div', {
                    class: ['vxe-body--expanded-cell', {
                      'is--ellipsis': expandHeight
                    }],
                    style: cellStyle
                  }, [
                    expandColumn.renderData(expandParams)
                  ])
                ])
              ])
            )
          }
        }
        // 如果是树形表格
        if (isExpandTree) {
          rows.push(...renderRows(fixedType, isOptimizeMode, rowChildren, tableColumn))
        }
      })
      return rows
    }

    onMounted(() => {
      nextTick(() => {
        const { fixedType } = props
        const { elemStore } = tableInternalData
        const prefix = `${fixedType || 'main'}-body-`
        elemStore[`${prefix}wrapper`] = refElem
        elemStore[`${prefix}scroll`] = refBodyScroll
        elemStore[`${prefix}table`] = refBodyTable
        elemStore[`${prefix}colgroup`] = refBodyColgroup
        elemStore[`${prefix}list`] = refBodyTBody
        elemStore[`${prefix}xSpace`] = refBodyXSpace
        elemStore[`${prefix}ySpace`] = refBodyYSpace
        elemStore[`${prefix}emptyBlock`] = refBodyEmptyBlock
      })
    })

    onUnmounted(() => {
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
    })

    const renderVN = () => {
      const { slots } = tableContext
      const $xeGrid = $xeTable.xeGrid

      const { fixedColumn, fixedType, tableColumn } = props
      const { spanMethod, footerSpanMethod, mouseConfig } = tableProps
      const { isGroup, tableData, isColLoading, overflowX, scrollXLoad, scrollYLoad, isAllOverflow, expandColumn, dragRow, dragCol } = tableReactData
      const { visibleColumn, fullAllDataRowIdData, fullColumnIdData } = tableInternalData
      const emptyOpts = computeEmptyOpts.value
      const mouseOpts = computeMouseOpts.value
      const expandOpts = computeExpandOpts.value

      let renderDataList = tableData
      let renderColumnList = tableColumn as VxeTableDefines.ColumnInfo[]
      let isOptimizeMode = false
      // 如果是使用优化模式
      if (scrollXLoad || scrollYLoad || isAllOverflow) {
        if ((expandColumn && expandOpts.mode !== 'fixed') || spanMethod || footerSpanMethod) {
          // 如果不支持优化模式
        } else {
          isOptimizeMode = true
        }
      }

      if (!isColLoading && (fixedType || !overflowX)) {
        renderColumnList = visibleColumn
      }

      if (fixedType) {
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

      let emptyContent: string | VxeComponentSlotType | VxeComponentSlotType[]
      const emptySlot = slots ? slots.empty : null
      const emptyParams = { $table: $xeTable, $grid: $xeGrid }
      if (emptySlot) {
        emptyContent = $xeTable.callSlot(emptySlot, emptyParams)
      } else {
        const compConf = emptyOpts.name ? renderer.get(emptyOpts.name) : null
        const rtEmptyView = compConf ? (compConf.renderTableEmpty || compConf.renderTableEmptyView || compConf.renderEmpty) : null
        if (rtEmptyView) {
          emptyContent = getSlotVNs(rtEmptyView(emptyOpts, emptyParams))
        } else {
          emptyContent = tableProps.emptyText || getI18n('vxe.table.emptyText')
        }
      }

      const ons: Record<string, any> = {
        onScroll (evnt: Event) {
          $xeTable.triggerBodyScrollEvent(evnt, fixedType)
        }
      }

      return h('div', {
        ref: refElem,
        class: ['vxe-table--body-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
        xid: xID
      }, [
        h('div', {
          ref: refBodyScroll,
          class: 'vxe-table--body-inner-wrapper',
          ...ons
        }, [
          fixedType
            ? renderEmptyElement($xeTable)
            : h('div', {
              ref: refBodyXSpace,
              class: 'vxe-body--x-space'
            }),
          h('div', {
            ref: refBodyYSpace,
            class: 'vxe-body--y-space'
          }),
          h('table', {
            ref: refBodyTable,
            class: 'vxe-table--body',
            xid: xID,
            cellspacing: 0,
            cellpadding: 0,
            border: 0,
            xvm: isOptimizeMode ? '1' : null
          }, [
            /**
             * 列宽
             */
            h('colgroup', {
              ref: refBodyColgroup
            }, renderColumnList.map((column, $columnIndex) => {
              return h('col', {
                name: column.id,
                key: $columnIndex,
                style: {
                  width: `${column.renderWidth}px`
                }
              })
            })),
            /**
             * 内容
             */
            h('tbody', {
              ref: refBodyTBody
            }, renderRows(fixedType, isOptimizeMode, renderDataList, renderColumnList))
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
                      onMousedown (evnt: MouseEvent) {
                        if ($xeTable.triggerCellAreaExtendMousedownEvent) {
                          $xeTable.triggerCellAreaExtendMousedownEvent(evnt, { $table: $xeTable, fixed: fixedType, type: renderType })
                        }
                      }
                    })
                  ]
                : []),
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
              }),
              h('span', {
                class: 'vxe-table--cell-row-status-area'
              })
            ])
            : renderEmptyElement($xeTable),
          !fixedType
            ? h('div', {
              class: 'vxe-table--empty-block',
              ref: refBodyEmptyBlock
            }, [
              h('div', {
                class: 'vxe-table--empty-content'
              }, emptyContent)
            ])
            : renderEmptyElement($xeTable)
        ])
      ])
    }

    return renderVN
  }
})
