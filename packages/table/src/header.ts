import { h, ref, Ref, PropType, inject, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { getCalcHeight, convertHeaderColumnToRows } from './util'

import type { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeTableDefines, VxeColumnPropTypes } from '../../../types'

const { renderer, renderEmptyElement } = VxeUI

const renderType = 'header'

export default defineVxeComponent({
  name: 'VxeTableHeader',
  props: {
    tableData: Array as PropType<any[]>,
    tableColumn: Array as PropType<VxeTableDefines.ColumnInfo[]>,
    tableGroupColumn: Array as PropType<VxeTableDefines.ColumnInfo[]>,
    fixedColumn: Array as PropType<VxeTableDefines.ColumnInfo[]>,
    fixedType: {
      type: String as PropType<'right' | 'left' | ''>,
      default: null
    }
  },
  setup (props) {
    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { xID, props: tableProps, reactData: tableReactData, internalData: tableInternalData } = $xeTable
    const { computeColumnOpts, computeColumnDragOpts, computeCellOpts, computeMouseOpts, computeHeaderCellOpts, computeDefaultRowHeight, computeVirtualXOpts } = $xeTable.getComputeMaps()

    const headerColumn = ref([] as VxeTableDefines.ColumnInfo[][])

    const refElem = ref() as Ref<HTMLDivElement>
    const refHeaderScroll = ref() as Ref<HTMLDivElement>
    const refHeaderTable = ref() as Ref<HTMLTableElement>
    const refHeaderColgroup = ref() as Ref<HTMLTableColElement>
    const refHeaderTHead = ref() as Ref<HTMLTableSectionElement>
    const refHeaderXSpace = ref() as Ref<HTMLDivElement>
    const refHeaderBorderRepair = ref() as Ref<HTMLDivElement>

    const uploadColumn = () => {
      const { isGroup } = tableReactData
      headerColumn.value = isGroup ? convertHeaderColumnToRows(props.tableGroupColumn) : []
    }

    const renderRows = (isGroup: boolean, isOptimizeMode: boolean, cols: VxeTableDefines.ColumnInfo[], $rowIndex: number) => {
      const $xeGrid = $xeTable.xeGrid

      const { fixedType } = props
      const { resizable: allResizable, columnKey, headerCellClassName, headerCellStyle, showHeaderOverflow: allColumnHeaderOverflow, headerAlign: allHeaderAlign, align: allAlign, mouseConfig } = tableProps
      const { currentColumn, dragCol, scrollXLoad, scrollYLoad, overflowX } = tableReactData
      const { fullColumnIdData, scrollXStore } = tableInternalData
      const virtualXOpts = computeVirtualXOpts.value
      const columnOpts = computeColumnOpts.value
      const columnDragOpts = computeColumnDragOpts.value
      const cellOpts = computeCellOpts.value
      const defaultRowHeight = computeDefaultRowHeight.value
      const headerCellOpts = computeHeaderCellOpts.value
      const currCellHeight = getCalcHeight(headerCellOpts.height) || defaultRowHeight
      const { disabledMethod: dragDisabledMethod, isCrossDrag, isPeerDrag } = columnDragOpts

      return cols.map((column, $columnIndex) => {
        const { type, showHeaderOverflow, headerAlign, align, filters, headerClassName, editRender, cellRender } = column
        const colid = column.id
        const colRest = fullColumnIdData[colid] || {}
        const renderOpts = editRender || cellRender
        const compConf = renderOpts ? renderer.get(renderOpts.name) : null
        const isColGroup = column.children && column.children.length
        const fixedHiddenColumn = fixedType ? (column.fixed !== fixedType && !isColGroup) : !!column.fixed && overflowX
        const isPadding = XEUtils.isBoolean(headerCellOpts.padding) ? headerCellOpts.padding : cellOpts.padding
        const headOverflow = XEUtils.eqNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
        const headAlign = headerAlign || (compConf ? compConf.tableHeaderCellAlign : '') || allHeaderAlign || align || (compConf ? compConf.tableCellAlign : '') || allAlign
        const showEllipsis = headOverflow === 'ellipsis'
        const showTitle = headOverflow === 'title'
        const showTooltip = headOverflow === true || headOverflow === 'tooltip'
        const hasEllipsis = showTitle || showTooltip || showEllipsis
        let hasFilter = false
        let firstFilterOption: VxeColumnPropTypes.FilterItem | null = null
        if (filters) {
          firstFilterOption = filters[0]
          hasFilter = filters.some((item) => item.checked)
        }
        const columnIndex = colRest.index
        const _columnIndex = colRest._index
        const cellParams: VxeTableDefines.CellRenderHeaderParams & {
          $table: VxeTableConstructor & VxeTablePrivateMethods
        } = {
          $table: $xeTable,
          $grid: $xeGrid,
          $rowIndex,
          column,
          columnIndex,
          $columnIndex,
          _columnIndex,
          firstFilterOption,
          fixed: fixedType,
          type: renderType,
          isHidden: fixedHiddenColumn,
          hasFilter
        }
        const thAttrs: Record<string, string | number | null> = {
          colid,
          colspan: column.colSpan > 1 ? column.colSpan : null,
          rowspan: column.rowSpan > 1 ? column.rowSpan : null
        }
        const thOns: any = {
          onClick: (evnt: MouseEvent) => $xeTable.triggerHeaderCellClickEvent(evnt, cellParams),
          onDblclick: (evnt: MouseEvent) => $xeTable.triggerHeaderCellDblclickEvent(evnt, cellParams)
        }
        const isColDragCell = columnOpts.drag && columnDragOpts.trigger === 'cell'
        let isDisabledDrag = false
        if (isColDragCell) {
          isDisabledDrag = !!(dragDisabledMethod && dragDisabledMethod(cellParams))
        }
        // 按下事件处理
        if (mouseConfig || isColDragCell) {
          thOns.onMousedown = (evnt: MouseEvent) => $xeTable.triggerHeaderCellMousedownEvent(evnt, cellParams)
        }
        // 拖拽列事件
        if (columnOpts.drag) {
          thOns.onDragstart = $xeTable.handleHeaderCellDragDragstartEvent
          thOns.onDragend = $xeTable.handleHeaderCellDragDragendEvent
          thOns.onDragover = $xeTable.handleHeaderCellDragDragoverEvent
          if (isColDragCell) {
            thOns.onMouseup = $xeTable.handleHeaderCellDragMouseupEvent
          }
        }
        const isLastColumn = $columnIndex === cols.length - 1
        const showResizable = (XEUtils.isBoolean(column.resizable) ? column.resizable : (columnOpts.resizable || allResizable))
        const isAutoCellWidth = !column.resizeWidth && (column.minWidth === 'auto' || column.width === 'auto')

        let isVNPreEmptyStatus = false
        if (isOptimizeMode && !isGroup) {
          if (!dragCol || dragCol.id !== colid) {
            if (scrollXLoad && !column.fixed && !virtualXOpts.immediate && (_columnIndex < scrollXStore.visibleStartIndex - scrollXStore.preloadSize || _columnIndex > scrollXStore.visibleEndIndex + scrollXStore.preloadSize)) {
              isVNPreEmptyStatus = true
            }
          }
        }

        const tcStyle: Record<string, string> = {}
        if (hasEllipsis) {
          tcStyle.height = `${currCellHeight}px`
        } else {
          tcStyle.minHeight = `${currCellHeight}px`
        }

        return h('th', {
          class: ['vxe-table--column vxe-header--column', colid, {
            [`col--${headAlign}`]: headAlign,
            [`col--${type}`]: type,
            'col--last': isLastColumn,
            'col--fixed': column.fixed,
            'col--group': isColGroup,
            'col--ellipsis': hasEllipsis,
            'fixed--width': !isAutoCellWidth,
            'fixed--hidden': fixedHiddenColumn,
            'is--padding': isPadding,
            'is--sortable': column.sortable,
            'col--filter': !!filters,
            'is--filter-active': hasFilter,
            'is--drag-active': columnOpts.drag && !column.fixed && !isDisabledDrag && (isCrossDrag || isPeerDrag || !column.parentId),
            'is--drag-disabled': columnOpts.drag && isDisabledDrag,
            'col--current': currentColumn === column
          },
          headerClassName ? (XEUtils.isFunction(headerClassName) ? headerClassName(cellParams) : headerClassName) : '',
          headerCellClassName ? (XEUtils.isFunction(headerCellClassName) ? headerCellClassName(cellParams) : headerCellClassName) : ''
          ],
          style: headerCellStyle ? (XEUtils.isFunction(headerCellStyle) ? headerCellStyle(cellParams) : headerCellStyle) : null,
          ...thAttrs,
          ...thOns,
          key: columnKey || scrollXLoad || scrollYLoad || columnOpts.useKey || columnOpts.drag || isColGroup ? colid : $columnIndex
        }, [
          h('div', {
            class: ['vxe-cell', {
              'c--title': showTitle,
              'c--tooltip': showTooltip,
              'c--ellipsis': showEllipsis
            }],
            style: tcStyle
          }, isVNPreEmptyStatus || (isOptimizeMode && fixedHiddenColumn)
            ? []
            : [
                h('div', {
                  colid,
                  class: 'vxe-cell--wrapper vxe-header-cell--wrapper'
                }, column.renderHeader(cellParams))
              ]),
          /**
           * 列宽拖动
           */
          !fixedHiddenColumn && showResizable
            ? h('div', {
              class: 'vxe-cell--col-resizable',
              onMousedown: (evnt: MouseEvent) => $xeTable.handleColResizeMousedownEvent(evnt, fixedType, cellParams),
              onDblclick: (evnt: MouseEvent) => $xeTable.handleColResizeDblclickEvent(evnt, cellParams)
            })
            : renderEmptyElement($xeTable)
        ])
      })
    }

    const renderHeads = (isGroup: boolean, isOptimizeMode: boolean, headerGroups: VxeTableDefines.ColumnInfo[][]) => {
      const { fixedType } = props
      const { headerRowClassName, headerRowStyle } = tableProps

      return headerGroups.map((cols, $rowIndex) => {
        const params = { $table: $xeTable, $rowIndex, fixed: fixedType, type: renderType }

        return h('tr', {
          key: $rowIndex,
          class: [
            'vxe-header--row',
            headerRowClassName ? (XEUtils.isFunction(headerRowClassName) ? headerRowClassName(params) : headerRowClassName) : ''
          ],
          style: headerRowStyle ? (XEUtils.isFunction(headerRowStyle) ? headerRowStyle(params) : headerRowStyle) : null
        }, renderRows(isGroup, isOptimizeMode, cols, $rowIndex))
      })
    }

    const renderVN = () => {
      const { fixedType, fixedColumn, tableColumn } = props
      const { mouseConfig, showHeaderOverflow: allColumnHeaderOverflow, spanMethod, footerSpanMethod } = tableProps
      const { isGroup, isColLoading, overflowX, scrollXLoad, dragCol } = tableReactData
      const { visibleColumn, fullColumnIdData } = tableInternalData

      const mouseOpts = computeMouseOpts.value
      let renderHeaderList = headerColumn.value
      let renderColumnList = tableColumn as VxeTableDefines.ColumnInfo[]
      let isOptimizeMode = false

      if (isGroup) {
        renderColumnList = visibleColumn
      } else {
        // 如果是使用优化模式
        if (scrollXLoad && allColumnHeaderOverflow) {
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
          // 如果是使用优化模式
          if (isOptimizeMode) {
            renderColumnList = fixedColumn || []
          }
        }
        renderHeaderList = [renderColumnList]
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
                  renderHeaderList = [[dragCol].concat(renderHeaderList[0])].concat(renderHeaderList.slice(1))
                } else if (dcIndex > lcIndex) {
                  renderColumnList = renderColumnList.concat([dragCol])
                  renderHeaderList = [renderHeaderList[0].concat([dragCol])].concat(renderHeaderList.slice(1))
                }
              }
            }
          }
        }
      }

      return h('div', {
        ref: refElem,
        class: ['vxe-table--header-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
        xid: xID
      }, [
        h('div', {
          ref: refHeaderScroll,
          class: 'vxe-table--header-inner-wrapper',
          onScroll (evnt) {
            $xeTable.triggerHeaderScrollEvent(evnt, fixedType)
          }
        }, [
          fixedType
            ? renderEmptyElement($xeTable)
            : h('div', {
              ref: refHeaderXSpace,
              class: 'vxe-body--x-space'
            }),
          h('table', {
            ref: refHeaderTable,
            class: 'vxe-table--header',
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
              ref: refHeaderColgroup
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
           * 头部
           */
            h('thead', {
              ref: refHeaderTHead
            }, renderHeads(isGroup, isOptimizeMode, renderHeaderList))
          ]),
          mouseConfig && mouseOpts.area
            ? h('div', {
              class: 'vxe-table--cell-area'
            }, [
              h('span', {
                class: 'vxe-table--cell-main-area'
              }),
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
                class: 'vxe-table--cell-col-status-area'
              })
            ])
            : renderEmptyElement($xeTable)
        ])
      ])
    }

    watch(() => props.tableColumn, uploadColumn)

    onMounted(() => {
      nextTick(() => {
        const { fixedType } = props
        const { internalData } = $xeTable
        const { elemStore } = internalData
        const prefix = `${fixedType || 'main'}-header-`
        elemStore[`${prefix}wrapper`] = refElem
        elemStore[`${prefix}scroll`] = refHeaderScroll
        elemStore[`${prefix}table`] = refHeaderTable
        elemStore[`${prefix}colgroup`] = refHeaderColgroup
        elemStore[`${prefix}list`] = refHeaderTHead
        elemStore[`${prefix}xSpace`] = refHeaderXSpace
        elemStore[`${prefix}repair`] = refHeaderBorderRepair
        uploadColumn()
      })
    })

    onUnmounted(() => {
      const { fixedType } = props
      const { internalData } = $xeTable
      const { elemStore } = internalData
      const prefix = `${fixedType || 'main'}-header-`
      elemStore[`${prefix}wrapper`] = null
      elemStore[`${prefix}scroll`] = null
      elemStore[`${prefix}table`] = null
      elemStore[`${prefix}colgroup`] = null
      elemStore[`${prefix}list`] = null
      elemStore[`${prefix}xSpace`] = null
      elemStore[`${prefix}repair`] = null
    })

    return renderVN
  }
})
