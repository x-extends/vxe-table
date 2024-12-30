import { defineComponent, TransitionGroup, h, ref, Ref, PropType, inject, nextTick, onMounted, onUnmounted } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { updateCellTitle, getPropClass, setScrollLeft } from '../../ui/src/dom'

import type { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeColumnPropTypes, VxeTableDefines } from '../../../types'

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
      type: String as PropType<VxeColumnPropTypes.Fixed>,
      default: null
    }
  },
  setup (props) {
    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { xID, props: tableProps, reactData: tableReactData, internalData: tableInternalData } = $xeTable
    const { refTableHeader, refTableBody, refScrollXHandleElem } = $xeTable.getRefMaps()
    const { computeTooltipOpts, computeColumnOpts, computeColumnDragOpts } = $xeTable.getComputeMaps()

    const refElem = ref() as Ref<HTMLDivElement>
    const refFooterTable = ref() as Ref<HTMLTableElement>
    const refFooterColgroup = ref() as Ref<HTMLTableColElement>
    const refFooterTFoot = ref() as Ref<HTMLTableSectionElement>
    const refFooterXSpace = ref() as Ref<HTMLDivElement>

    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    const scrollEvent = (evnt: Event) => {
      const { inVirtualScroll, inBodyScroll } = tableInternalData
      if (inVirtualScroll) {
        return
      }
      if (inBodyScroll) {
        return
      }
      const { fixedType } = props
      const tableHeader = refTableHeader.value
      const tableBody = refTableBody.value
      const headerElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
      const footerElem = refElem.value
      if (!footerElem) {
        return
      }
      const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
      if (!bodyElem) {
        return
      }
      const xHandleEl = refScrollXHandleElem.value
      const scrollLeft = footerElem.scrollLeft
      const isRollX = true
      const isRollY = false
      const scrollTop = bodyElem.scrollTop
      tableInternalData.inFooterScroll = true
      setScrollLeft(xHandleEl, scrollLeft)
      setScrollLeft(headerElem, scrollLeft)
      setScrollLeft(bodyElem, scrollLeft)
      $xeTable.triggerScrollXEvent(evnt)
      $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
        type: renderType,
        fixed: fixedType
      })
    }

    const renderRows = (tableColumn: VxeTableDefines.ColumnInfo[], footerTableData: any[], row: any, $rowIndex: number, _rowIndex: number) => {
      const { fixedType } = props
      const { footerCellClassName, footerCellStyle, footerAlign: allFooterAlign, footerSpanMethod, align: allAlign, columnKey, showFooterOverflow: allColumnFooterOverflow } = tableProps
      const { scrollXLoad, scrollYLoad, overflowX, scrollbarWidth, currentColumn, mergeFooterList } = tableReactData
      const tooltipOpts = computeTooltipOpts.value
      const columnOpts = computeColumnOpts.value

      return tableColumn.map((column, $columnIndex) => {
        const { type, showFooterOverflow, footerAlign, align, footerClassName, editRender, cellRender } = column
        const renderOpts = editRender || cellRender
        const compConf = renderOpts ? renderer.get(renderOpts.name) : null
        const showAllTip = tooltipOpts.showAll
        const isColGroup = column.children && column.children.length
        const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
        const footOverflow = XEUtils.eqNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow
        const footAlign = footerAlign || (compConf ? compConf.tableFooterCellAlign : '') || allFooterAlign || align || (compConf ? compConf.tableCellAlign : '') || allAlign
        let showEllipsis = footOverflow === 'ellipsis'
        const showTitle = footOverflow === 'title'
        const showTooltip = footOverflow === true || footOverflow === 'tooltip'
        let hasEllipsis = showTitle || showTooltip || showEllipsis
        const attrs: any = { colid: column.id }
        const tfOns: any = {}
        const columnIndex = $xeTable.getColumnIndex(column)
        const _columnIndex = $xeTable.getVTColumnIndex(column)
        const itemIndex = _columnIndex
        const cellParams: VxeTableDefines.CellRenderFooterParams = {
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
        // 合并行或列
        if (mergeFooterList.length) {
          const spanRest = mergeFooterMethod(mergeFooterList, _rowIndex, _columnIndex)
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
        const isAutoCellWidth = !column.resizeWidth && (column.minWidth === 'auto' || column.width === 'auto')

        return h('td', {
          class: ['vxe-footer--column', column.id, {
            [`col--${footAlign}`]: footAlign,
            [`col--${type}`]: type,
            'col--last': $columnIndex === tableColumn.length - 1,
            'fixed--width': !isAutoCellWidth,
            'fixed--hidden': fixedHiddenColumn,
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
            }]
          }, column.renderFooter(cellParams))
        ])
      }).concat(scrollbarWidth
        ? [
            h('td', {
              key: `gr${$rowIndex}`,
              class: 'vxe-footer--gutter col--gutter'
            })
          ]
        : [])
    }

    const renderHeads = (renderColumnList: VxeTableDefines.ColumnInfo[]) => {
      const { fixedType, footerTableData } = props
      const { footerRowClassName, footerRowStyle } = tableProps
      const { isDragColMove } = tableReactData
      const columnOpts = computeColumnOpts.value
      const columnDragOpts = computeColumnDragOpts.value

      return footerTableData.map((row, $rowIndex) => {
        const _rowIndex = $rowIndex
        const rowParams = { $table: $xeTable, row, _rowIndex, $rowIndex, fixed: fixedType, type: renderType }

        if (columnOpts.drag && columnDragOpts.animation) {
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
      const { isGroup, scrollXLoad, scrollYLoad, scrollbarWidth, dragCol } = tableReactData

      let renderColumnList = tableColumn

      if (fixedType) {
        renderColumnList = visibleColumn
        // 如果是使用优化模式
        if (scrollXLoad || scrollYLoad || allColumnFooterOverflow) {
          // 如果不支持优化模式
          if (spanMethod || footerSpanMethod) {
            renderColumnList = visibleColumn
          } else {
            renderColumnList = fixedColumn || []
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

      const ons: Record<string, any> = {}
      if (!fixedType) {
        ons.onScroll = scrollEvent
      }

      return h('div', {
        ref: refElem,
        class: ['vxe-table--footer-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
        xid: xID,
        ...ons
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
          }).concat(scrollbarWidth
            ? [
                h('col', {
                  name: 'col_gutter'
                })
              ]
            : [])),
          /**
           * 底部
           */
          h('tfoot', {
            ref: refFooterTFoot
          }, renderHeads(renderColumnList))
        ])
      ])
    }

    onMounted(() => {
      nextTick(() => {
        const { fixedType } = props
        const { elemStore } = tableInternalData
        const prefix = `${fixedType || 'main'}-footer-`
        elemStore[`${prefix}wrapper`] = refElem
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
      elemStore[`${prefix}table`] = null
      elemStore[`${prefix}colgroup`] = null
      elemStore[`${prefix}list`] = null
      elemStore[`${prefix}xSpace`] = null
    })

    return renderVN
  }
})
