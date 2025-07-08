import { h, ref, Ref, PropType, inject, nextTick, onMounted, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { updateCellTitle, getPropClass } from '../../ui/src/dom'
import { getCalcHeight } from './util'

import type { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeTableDefines } from '../../../types'

const { renderer, renderEmptyElement } = VxeUI

const renderType = 'footer'

export default defineVxeComponent({
  name: 'VxeTableFooter',
  props: {
    footerTableData: {
      type: Array as PropType<any[][]>,
      default: () => []
    },
    tableColumn: {
      type: Array as PropType<VxeTableDefines.ColumnInfo[]>,
      default: () => []
    },
    fixedColumn: {
      type: Array as PropType<VxeTableDefines.ColumnInfo[]>,
      default: () => []
    },
    fixedType: {
      type: String as PropType<'right' | 'left' | ''>,
      default: null
    }
  },
  setup (props) {
    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { xID, props: tableProps, reactData: tableReactData, internalData: tableInternalData } = $xeTable
    const { computeTooltipOpts, computeColumnOpts, computeCellOpts, computeFooterCellOpts, computeDefaultRowHeight, computeResizableOpts, computeVirtualXOpts } = $xeTable.getComputeMaps()

    const refElem = ref() as Ref<HTMLDivElement>
    const refFooterScroll = ref() as Ref<HTMLDivElement>
    const refFooterTable = ref() as Ref<HTMLTableElement>
    const refFooterColgroup = ref() as Ref<HTMLTableColElement>
    const refFooterTFoot = ref() as Ref<HTMLTableSectionElement>
    const refFooterXSpace = ref() as Ref<HTMLDivElement>

    const renderRows = (isOptimizeMode: boolean, tableColumn: VxeTableDefines.ColumnInfo[], footerTableData: any[], row: any, $rowIndex: number, _rowIndex: number) => {
      const $xeGrid = $xeTable.xeGrid

      const { fixedType } = props
      const { resizable: allResizable, border, footerCellClassName, footerCellStyle, footerAlign: allFooterAlign, footerSpanMethod, align: allAlign, columnKey, showFooterOverflow: allColumnFooterOverflow } = tableProps
      const { scrollXLoad, scrollYLoad, overflowX, currentColumn, mergeFootFlag } = tableReactData
      const { fullColumnIdData, mergeFooterList, mergeFooterCellMaps, scrollXStore } = tableInternalData
      const virtualXOpts = computeVirtualXOpts.value
      const tooltipOpts = computeTooltipOpts.value
      const resizableOpts = computeResizableOpts.value
      const { isAllColumnDrag } = resizableOpts
      const columnOpts = computeColumnOpts.value
      const defaultRowHeight = computeDefaultRowHeight.value
      const cellOpts = computeCellOpts.value
      const footerCellOpts = computeFooterCellOpts.value
      const currCellHeight = getCalcHeight(footerCellOpts.height) || defaultRowHeight

      return tableColumn.map((column, $columnIndex) => {
        const { type, showFooterOverflow, footerAlign, align, footerClassName, editRender, cellRender } = column
        const colid = column.id
        const colRest = fullColumnIdData[colid] || {}
        const renderOpts = editRender || cellRender
        const compConf = renderOpts ? renderer.get(renderOpts.name) : null
        const showAllTip = tooltipOpts.showAll
        const isColGroup = column.children && column.children.length
        const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
        const isPadding = XEUtils.isBoolean(footerCellOpts.padding) ? footerCellOpts.padding : cellOpts.padding
        const footOverflow = XEUtils.eqNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow
        const footAlign = footerAlign || (compConf ? compConf.tableFooterCellAlign : '') || allFooterAlign || align || (compConf ? compConf.tableCellAlign : '') || allAlign
        const showEllipsis = footOverflow === 'ellipsis'
        const showTitle = footOverflow === 'title'
        const showTooltip = footOverflow === true || footOverflow === 'tooltip'
        const hasEllipsis = showTitle || showTooltip || showEllipsis
        const showResizable = (XEUtils.isBoolean(column.resizable) ? column.resizable : (columnOpts.resizable || allResizable))
        const attrs: any = { colid }
        const tfOns: any = {}
        const columnIndex = colRest.index
        const _columnIndex = colRest._index
        const itemIndex = _columnIndex
        const cellParams: VxeTableDefines.CellRenderFooterParams & {
          $table: VxeTableConstructor<any> & VxeTablePrivateMethods
        } = {
          $table: $xeTable,
          $grid: $xeGrid,
          row,
          rowIndex: _rowIndex,
          _rowIndex,
          $rowIndex,
          column,
          columnIndex,
          $columnIndex,
          _columnIndex,
          itemIndex,
          items: row,
          fixed: fixedType,
          type: renderType,
          data: footerTableData
        }
        if (showTitle || showTooltip || showAllTip) {
          tfOns.onMouseenter = (evnt: MouseEvent) => {
            if (showTitle) {
              updateCellTitle(evnt.currentTarget, column)
            } else if (showTooltip || showAllTip) {
              $xeTable.triggerFooterTooltipEvent(evnt, cellParams)
            }
          }
        }
        if (showTooltip || showAllTip) {
          tfOns.onMouseleave = (evnt: MouseEvent) => {
            if (showTooltip || showAllTip) {
              $xeTable.handleTargetLeaveEvent(evnt)
            }
          }
        }
        tfOns.onClick = (evnt: MouseEvent) => {
          $xeTable.dispatchEvent('footer-cell-click', Object.assign({ cell: evnt.currentTarget }, cellParams), evnt)
        }
        tfOns.onDblclick = (evnt: MouseEvent) => {
          $xeTable.dispatchEvent('footer-cell-dblclick', Object.assign({ cell: evnt.currentTarget }, cellParams), evnt)
        }
        let isMergeCell = false
        // 合并行或列
        if (mergeFootFlag && mergeFooterList.length) {
          const spanRest = mergeFooterCellMaps[`${_rowIndex}:${_columnIndex}`]
          if (spanRest) {
            const { rowspan, colspan } = spanRest
            if (!rowspan || !colspan) {
              return null
            }
            if (rowspan > 1) {
              isMergeCell = true
              attrs.rowspan = rowspan
            }
            if (colspan > 1) {
              isMergeCell = true
              attrs.colspan = colspan
            }
          }
        } else if (footerSpanMethod) {
          // 自定义合并方法
          const { rowspan = 1, colspan = 1 } = footerSpanMethod(cellParams) || {}
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
        const isLastColumn = $columnIndex === tableColumn.length - 1
        const isAutoCellWidth = !column.resizeWidth && (column.minWidth === 'auto' || column.width === 'auto')

        let isVNPreEmptyStatus = false
        if (isOptimizeMode && !isMergeCell) {
          if (scrollXLoad && !column.fixed && !virtualXOpts.immediate && (_columnIndex < scrollXStore.visibleStartIndex - scrollXStore.preloadSize || _columnIndex > scrollXStore.visibleEndIndex + scrollXStore.preloadSize)) {
            isVNPreEmptyStatus = true
          }
        }

        const tcStyle: Record<string, string> = {}
        if (hasEllipsis) {
          tcStyle.height = `${currCellHeight}px`
        } else {
          tcStyle.minHeight = `${currCellHeight}px`
        }

        return h('td', {
          class: ['vxe-table--column vxe-footer--column', column.id, {
            [`col--${footAlign}`]: footAlign,
            [`col--${type}`]: type,
            'col--last': isLastColumn,
            'fixed--width': !isAutoCellWidth,
            'fixed--hidden': fixedHiddenColumn,
            'is--padding': isPadding,
            'col--ellipsis': hasEllipsis,
            'col--current': currentColumn === column
          }, getPropClass(footerClassName, cellParams), getPropClass(footerCellClassName, cellParams)],
          ...attrs,
          style: footerCellStyle ? (XEUtils.isFunction(footerCellStyle) ? footerCellStyle(cellParams) : footerCellStyle) : null,
          ...tfOns,
          key: columnKey || scrollXLoad || scrollYLoad || columnOpts.useKey || columnOpts.drag ? column.id : $columnIndex
        }, [
          h('div', {
            class: ['vxe-cell', {
              'c--title': showTitle,
              'c--tooltip': showTooltip,
              'c--ellipsis': showEllipsis
            }],
            style: tcStyle
          }, isVNPreEmptyStatus
            ? []
            : [
                h('div', {
                  colid,
                  class: 'vxe-cell--wrapper vxe-footer-cell--wrapper'
                }, column.renderFooter(cellParams))
              ]),
          /**
           * 列宽拖动
           */
          !fixedHiddenColumn && showResizable && isAllColumnDrag
            ? h('div', {
              class: ['vxe-cell--col-resizable', {
                'is--line': !border || border === 'none'
              }],
              onMousedown: (evnt: MouseEvent) => $xeTable.handleColResizeMousedownEvent(evnt, fixedType, cellParams),
              onDblclick: (evnt: MouseEvent) => $xeTable.handleColResizeDblclickEvent(evnt, cellParams)
            })
            : renderEmptyElement($xeTable)
        ])
      })
    }

    const renderHeads = (isOptimizeMode: boolean, renderColumnList: VxeTableDefines.ColumnInfo[]) => {
      const { fixedType, footerTableData } = props
      const { footerRowClassName, footerRowStyle } = tableProps

      return footerTableData.map((row, $rowIndex) => {
        const _rowIndex = $rowIndex
        const rowParams = { $table: $xeTable, row, _rowIndex, $rowIndex, fixed: fixedType, type: renderType }

        return h('tr', {
          key: $rowIndex,
          class: [
            'vxe-footer--row',
            footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName(rowParams) : footerRowClassName : ''
          ],
          style: footerRowStyle ? (XEUtils.isFunction(footerRowStyle) ? footerRowStyle(rowParams) : footerRowStyle) : null
        }, renderRows(isOptimizeMode, renderColumnList, footerTableData, row, $rowIndex, _rowIndex))
      })
    }

    const renderVN = () => {
      const { fixedType, fixedColumn, tableColumn } = props
      const { spanMethod, footerSpanMethod, showFooterOverflow: allColumnFooterOverflow } = tableProps
      const { visibleColumn, fullColumnIdData } = tableInternalData
      const { isGroup, isColLoading, overflowX, scrollXLoad, dragCol } = tableReactData

      let renderColumnList = tableColumn
      let isOptimizeMode = false
      // 如果是使用优化模式
      if (scrollXLoad && allColumnFooterOverflow) {
        if (spanMethod || footerSpanMethod) {
          // 如果不支持优化模式
        } else {
          isOptimizeMode = true
        }
      }

      if (!isOptimizeMode || (!isColLoading && (fixedType || !overflowX))) {
        renderColumnList = visibleColumn
      }

      if (fixedType) {
        if (isOptimizeMode) {
          renderColumnList = fixedColumn || []
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

      return h('div', {
        ref: refElem,
        class: ['vxe-table--footer-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
        xid: xID
      }, [
        h('div', {
          ref: refFooterScroll,
          class: 'vxe-table--footer-inner-wrapper',
          onScroll (evnt) {
            $xeTable.triggerFooterScrollEvent(evnt, fixedType)
          }
        }, [
          fixedType
            ? renderEmptyElement($xeTable)
            : h('div', {
              ref: refFooterXSpace,
              class: 'vxe-body--x-space'
            }),
          h('table', {
            ref: refFooterTable,
            class: 'vxe-table--footer',
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
              ref: refFooterColgroup
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
         * 底部
         */
            h('tfoot', {
              ref: refFooterTFoot
            }, renderHeads(isOptimizeMode, renderColumnList))
          ])
        ])
      ])
    }

    onMounted(() => {
      nextTick(() => {
        const { fixedType } = props
        const { elemStore } = tableInternalData
        const prefix = `${fixedType || 'main'}-footer-`
        elemStore[`${prefix}wrapper`] = refElem
        elemStore[`${prefix}scroll`] = refFooterScroll
        elemStore[`${prefix}table`] = refFooterTable
        elemStore[`${prefix}colgroup`] = refFooterColgroup
        elemStore[`${prefix}list`] = refFooterTFoot
        elemStore[`${prefix}xSpace`] = refFooterXSpace
      })
    })

    onUnmounted(() => {
      const { fixedType } = props
      const { elemStore } = tableInternalData
      const prefix = `${fixedType || 'main'}-footer-`
      elemStore[`${prefix}wrapper`] = null
      elemStore[`${prefix}scroll`] = null
      elemStore[`${prefix}table`] = null
      elemStore[`${prefix}colgroup`] = null
      elemStore[`${prefix}list`] = null
      elemStore[`${prefix}xSpace`] = null
    })

    return renderVN
  }
})
