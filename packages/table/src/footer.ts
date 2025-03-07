import { defineComponent, TransitionGroup, h, ref, Ref, PropType, inject, nextTick, onMounted, onUnmounted } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { updateCellTitle, getPropClass } from '../../ui/src/dom'
import { getCellHeight } from './util'

import type { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeTableDefines } from '../../../types'

const { renderer, renderEmptyElement } = VxeUI

const renderType = 'footer'

function mergeFooterMethod (mergeFooterList: VxeTableDefines.MergeItem[], _rowIndex: number, _columnIndex: number) {
  for (let mIndex = 0; mIndex < mergeFooterList.length; mIndex++) {
    const { row: mergeRowIndex, col: mergeColIndex, rowspan: mergeRowspan, colspan: mergeColspan } = mergeFooterList[mIndex]
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

export default defineComponent({
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
    const { computeTooltipOpts, computeColumnOpts, computeColumnDragOpts, computeCellOpts, computeFooterCellOpts, computeDefaultRowHeight, computeResizableOpts } = $xeTable.getComputeMaps()

    const refElem = ref() as Ref<HTMLDivElement>
    const refFooterScroll = ref() as Ref<HTMLDivElement>
    const refFooterTable = ref() as Ref<HTMLTableElement>
    const refFooterColgroup = ref() as Ref<HTMLTableColElement>
    const refFooterTFoot = ref() as Ref<HTMLTableSectionElement>
    const refFooterXSpace = ref() as Ref<HTMLDivElement>

    const renderRows = (tableColumn: VxeTableDefines.ColumnInfo[], footerTableData: any[], row: any, $rowIndex: number, _rowIndex: number) => {
      const { fixedType } = props
      const { resizable: allResizable, border, footerCellClassName, footerCellStyle, footerAlign: allFooterAlign, footerSpanMethod, align: allAlign, columnKey, showFooterOverflow: allColumnFooterOverflow } = tableProps
      const { scrollXLoad, scrollYLoad, overflowX, currentColumn, mergeFooterList } = tableReactData
      const { scrollXStore } = tableInternalData
      const tooltipOpts = computeTooltipOpts.value
      const resizableOpts = computeResizableOpts.value
      const { isAllColumnDrag } = resizableOpts
      const columnOpts = computeColumnOpts.value
      const defaultRowHeight = computeDefaultRowHeight.value
      const cellOpts = computeCellOpts.value
      const footerCellOpts = computeFooterCellOpts.value
      const currCellHeight = getCellHeight(footerCellOpts.height || cellOpts.height) || defaultRowHeight

      return tableColumn.map((column, $columnIndex) => {
        const { type, showFooterOverflow, footerAlign, align, footerClassName, editRender, cellRender } = column
        const colid = column.id
        const renderOpts = editRender || cellRender
        const compConf = renderOpts ? renderer.get(renderOpts.name) : null
        const showAllTip = tooltipOpts.showAll
        const isColGroup = column.children && column.children.length
        const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
        const isPadding = XEUtils.isBoolean(footerCellOpts.padding) ? footerCellOpts.padding : cellOpts.padding
        const footOverflow = XEUtils.eqNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow
        const footAlign = footerAlign || (compConf ? compConf.tableFooterCellAlign : '') || allFooterAlign || align || (compConf ? compConf.tableCellAlign : '') || allAlign
        let showEllipsis = footOverflow === 'ellipsis'
        const showTitle = footOverflow === 'title'
        const showTooltip = footOverflow === true || footOverflow === 'tooltip'
        let hasEllipsis = showTitle || showTooltip || showEllipsis
        const showResizable = (XEUtils.isBoolean(column.resizable) ? column.resizable : (columnOpts.resizable || allResizable))
        const attrs: any = { colid }
        const tfOns: any = {}
        const columnIndex = $xeTable.getColumnIndex(column)
        const _columnIndex = $xeTable.getVTColumnIndex(column)
        const itemIndex = _columnIndex
        const cellParams: VxeTableDefines.CellRenderFooterParams & {
          $table: VxeTableConstructor<any> & VxeTablePrivateMethods
        } = {
          $table: $xeTable,
          $grid: $xeTable.xegrid,
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
        // 纵向虚拟滚动不支持动态行高
        if (scrollXLoad && !hasEllipsis) {
          showEllipsis = hasEllipsis = true
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
        if (mergeFooterList.length) {
          const spanRest = mergeFooterMethod(mergeFooterList, _rowIndex, _columnIndex)
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
        if (!isMergeCell) {
          if (scrollXLoad && !column.fixed && (_columnIndex < scrollXStore.visibleStartIndex - scrollXStore.preloadSize || _columnIndex > scrollXStore.visibleEndIndex + scrollXStore.preloadSize)) {
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
          class: ['vxe-footer--column', column.id, {
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
                  class: 'vxe-cell--wrapper'
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

    const renderHeads = (renderColumnList: VxeTableDefines.ColumnInfo[]) => {
      const { fixedType, footerTableData } = props
      const { footerRowClassName, footerRowStyle } = tableProps
      const { isColLoading, isDragColMove } = tableReactData
      const columnOpts = computeColumnOpts.value
      const columnDragOpts = computeColumnDragOpts.value

      return footerTableData.map((row, $rowIndex) => {
        const _rowIndex = $rowIndex
        const rowParams = { $table: $xeTable, row, _rowIndex, $rowIndex, fixed: fixedType, type: renderType }

        if (!isColLoading && columnOpts.drag && columnDragOpts.animation) {
          return h(TransitionGroup, {
            key: $rowIndex,
            name: `vxe-header--col-list${isDragColMove ? '' : '-disabled'}`,
            tag: 'tr',
            class: [
              'vxe-footer--row',
              footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName(rowParams) : footerRowClassName : ''
            ],
            style: footerRowStyle ? (XEUtils.isFunction(footerRowStyle) ? footerRowStyle(rowParams) : footerRowStyle) : null
          }, {
            default: () => renderRows(renderColumnList, footerTableData, row, $rowIndex, _rowIndex)
          })
        }
        return h('tr', {
          key: $rowIndex,
          class: [
            'vxe-footer--row',
            footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName(rowParams) : footerRowClassName : ''
          ],
          style: footerRowStyle ? (XEUtils.isFunction(footerRowStyle) ? footerRowStyle(rowParams) : footerRowStyle) : null
        }, renderRows(renderColumnList, footerTableData, row, $rowIndex, _rowIndex))
      })
    }

    const renderVN = () => {
      const { fixedType, fixedColumn, tableColumn } = props
      const { spanMethod, footerSpanMethod, showFooterOverflow: allColumnFooterOverflow } = tableProps
      const { visibleColumn, fullColumnIdData } = tableInternalData
      const { isGroup, overflowX, scrollXLoad, scrollYLoad, dragCol } = tableReactData

      let renderColumnList = tableColumn
      let isOptimizeMode = false
      // 如果是使用优化模式
      if (scrollXLoad || scrollYLoad || allColumnFooterOverflow) {
        if (spanMethod || footerSpanMethod) {
          // 如果不支持优化模式
        } else {
          isOptimizeMode = true
        }
      }

      if (fixedType || !overflowX) {
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
            border: 0
          }, [
            /**
         * 列宽
         */
            h('colgroup', {
              ref: refFooterColgroup
            }, renderColumnList.map((column, $columnIndex) => {
              return h('col', {
                name: column.id,
                key: $columnIndex
              })
            })),
            /**
         * 底部
         */
            h('tfoot', {
              ref: refFooterTFoot
            }, renderHeads(renderColumnList))
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
