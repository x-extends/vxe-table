import { PropType, CreateElement } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { getClass } from '../../ui/src/utils'
import { getCellHeight, convertHeaderColumnToRows } from './util'

import type { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods, VxeColumnPropTypes, TableReactData, TableInternalData, VxeComponentStyleType } from '../../../types'

const { renderer, renderEmptyElement } = VxeUI

const cellType = 'header'

const renderRows = (h: CreateElement, _vm: any, isGroup: boolean, isOptimizeMode: boolean, cols: VxeTableDefines.ColumnInfo[], $rowIndex: number) => {
  const props = _vm
  const $xeTable = _vm.$parent as VxeTableConstructor & VxeTablePrivateMethods
  const $xeGrid = $xeTable.$xeGrid
  const tableProps = $xeTable
  const tableReactData = $xeTable as unknown as TableReactData
  const tableInternalData = $xeTable as unknown as TableInternalData

  const { fixedType } = props
  const { resizable: allResizable, columnKey, headerCellClassName, headerCellStyle, showHeaderOverflow: allColumnHeaderOverflow, headerAlign: allHeaderAlign, align: allAlign, mouseConfig } = tableProps
  const { currentColumn, dragCol, scrollXLoad, scrollYLoad, overflowX } = tableReactData
  const { fullColumnIdData, scrollXStore } = tableInternalData
  const virtualXOpts = $xeTable.computeVirtualXOpts
  const columnOpts = $xeTable.computeColumnOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const cellOpts = $xeTable.computeCellOpts
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
  const headerCellOpts = $xeTable.computeHeaderCellOpts
  const currCellHeight = getCellHeight(headerCellOpts.height) || defaultRowHeight
  const { disabledMethod: dragDisabledMethod, isCrossDrag, isPeerDrag } = columnDragOpts
  return cols.map((column: any, $columnIndex: any) => {
    const { type, showHeaderOverflow, headerAlign, align, filters, headerClassName, editRender, cellRender } = column
    // const { enabled } = tooltipOpts
    const colid = column.id
    const colRest = fullColumnIdData[colid] || {}
    const renderOpts = editRender || cellRender
    const compConf = renderOpts ? renderer.get(renderOpts.name) : null
    const isColGroup = column.children && column.children.length
    const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
    const isPadding = XEUtils.isBoolean(headerCellOpts.padding) ? headerCellOpts.padding : cellOpts.padding
    const headOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
    const headAlign = headerAlign || (compConf ? compConf.tableHeaderCellAlign : '') || allHeaderAlign || align || (compConf ? compConf.tableCellAlign : '') || allAlign
    const showEllipsis = headOverflow === 'ellipsis'
    const showTitle = headOverflow === 'title'
    const showTooltip = headOverflow === true || headOverflow === 'tooltip'
    const hasEllipsis = showTitle || showTooltip || showEllipsis
    let hasFilter = false
    let firstFilterOption: VxeColumnPropTypes.FilterItem | null = null
    if (filters) {
      firstFilterOption = filters[0]
      hasFilter = filters.some((item: VxeColumnPropTypes.FilterItem) => item.checked)
    }
    const columnIndex = colRest.index
    const _columnIndex = colRest._index
    const cellParams = {
      $table: $xeTable,
      $grid: $xeGrid,
      $rowIndex,
      column,
      columnIndex,
      $columnIndex,
      _columnIndex,
      firstFilterOption,
      fixed: fixedType,
      type: cellType,
      isHidden: fixedHiddenColumn,
      hasFilter
    }
    const thAttrs: Record<string, string | number | null> = {
      colid,
      colspan: column.colSpan > 1 ? column.colSpan : null,
      rowspan: column.rowSpan > 1 ? column.rowSpan : null
    }
    const thOns: any = {
      click: (evnt: MouseEvent) => $xeTable.triggerHeaderCellClickEvent(evnt, cellParams),
      dblclick: (evnt: MouseEvent) => $xeTable.triggerHeaderCellDblclickEvent(evnt, cellParams)
    }
    const isColDragCell = columnOpts.drag && columnDragOpts.trigger === 'cell'
    let isDisabledDrag = false
    if (isColDragCell) {
      isDisabledDrag = !!(dragDisabledMethod && dragDisabledMethod(cellParams))
    }
    // 按下事件处理
    if (mouseConfig || isColDragCell) {
      thOns.mousedown = (evnt: any) => $xeTable.triggerHeaderCellMousedownEvent(evnt, cellParams)
    }
    // 拖拽列事件
    if (columnOpts.drag) {
      thOns.dragstart = $xeTable.handleHeaderCellDragDragstartEvent
      thOns.dragend = $xeTable.handleHeaderCellDragDragendEvent
      thOns.dragover = $xeTable.handleHeaderCellDragDragoverEvent
      if (isColDragCell) {
        thOns.mouseup = $xeTable.handleHeaderCellDragMouseupEvent
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
      class: ['vxe-header--column', colid, {
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
      }, getClass(headerClassName, cellParams), getClass(headerCellClassName, cellParams)],
      attrs: thAttrs,
      style: headerCellStyle ? (XEUtils.isFunction(headerCellStyle) ? headerCellStyle(cellParams) : headerCellStyle) as VxeComponentStyleType : undefined,
      on: thOns,
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
              attrs: {
                colid
              },
              class: 'vxe-cell--wrapper'
            }, column.renderHeader(h, cellParams))
          ]),
      /**
     * 列宽拖动
     */
      !fixedHiddenColumn && showResizable
        ? h('div', {
          class: 'vxe-cell--col-resizable',
          on: {
            mousedown: (evnt: MouseEvent) => $xeTable.handleColResizeMousedownEvent(evnt, fixedType, cellParams),
            dblclick: (evnt: MouseEvent) => $xeTable.handleColResizeDblclickEvent(evnt, cellParams)
          }
        })
        : renderEmptyElement($xeTable)
    ])
  })
}

function renderHeads (h: CreateElement, _vm: any, isGroup: boolean, isOptimizeMode: boolean, headerGroups: any[]) {
  const props = _vm
  const $xeTable = _vm.$parent as VxeTableConstructor & VxeTablePrivateMethods
  const tableProps = $xeTable
  const tableReactData = $xeTable as unknown as TableReactData

  const { fixedType } = props

  const columnOpts = $xeTable.computeColumnOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts

  const { headerRowClassName, headerRowStyle } = tableProps
  const { isColLoading, isDragColMove } = tableReactData

  return headerGroups.map((cols: any, $rowIndex: any) => {
    const params = { $table: $xeTable, $rowIndex, fixed: fixedType, type: cellType }

    if (!isColLoading && columnOpts.drag && columnDragOpts.animation) {
      return h('transition-group', {
        key: $rowIndex,
        props: {
          tag: 'tr',
          name: `vxe-header--col-list${isDragColMove ? '' : '-disabled'}`,
          class: [
            'vxe-header--row',
            headerRowClassName ? XEUtils.isFunction(headerRowClassName) ? headerRowClassName(params) : headerRowClassName : ''
          ],
          style: headerRowStyle ? (XEUtils.isFunction(headerRowStyle) ? headerRowStyle(params) : headerRowStyle) : null
        }
      }, renderRows(h, _vm, isGroup, isOptimizeMode, cols, $rowIndex))
    }
    return h('tr', {
      key: $rowIndex,
      class: [
        'vxe-header--row',
        headerRowClassName ? XEUtils.isFunction(headerRowClassName) ? headerRowClassName(params) : headerRowClassName : ''
      ],
      style: headerRowStyle ? (XEUtils.isFunction(headerRowStyle) ? headerRowStyle(params) : headerRowStyle) as VxeComponentStyleType : undefined
    }, renderRows(h, _vm, isGroup, isOptimizeMode, cols, $rowIndex))
  })
}

export default {
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
  data () {
    return {
      headerColumn: []
    }
  },
  watch: {
    tableColumn (this: any) {
      this.uploadColumn()
    }
  },
  created (this: any) {
    this.uploadColumn()
  },
  mounted () {
    const _vm = this
    const props = _vm
    const $xeTable = _vm.$parent as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fixedType } = props
    const { elemStore } = internalData
    const prefix = `${fixedType || 'main'}-header-`
    elemStore[`${prefix}wrapper`] = _vm.$refs.refElem
    elemStore[`${prefix}scroll`] = _vm.$refs.refHeaderScroll
    elemStore[`${prefix}table`] = _vm.$refs.refHeaderTable
    elemStore[`${prefix}colgroup`] = _vm.$refs.refHeaderColgroup
    elemStore[`${prefix}list`] = _vm.$refs.refHeaderTHead
    elemStore[`${prefix}xSpace`] = _vm.$refs.refHeaderXSpace
    elemStore[`${prefix}repair`] = _vm.$refs.refHeaderBorderRepair
  },
  destroyed () {
    const props = this
    const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fixedType } = props
    const { elemStore } = internalData
    const prefix = `${fixedType || 'main'}-header-`
    elemStore[`${prefix}wrapper`] = null
    elemStore[`${prefix}scroll`] = null
    elemStore[`${prefix}table`] = null
    elemStore[`${prefix}colgroup`] = null
    elemStore[`${prefix}list`] = null
    elemStore[`${prefix}xSpace`] = null
    elemStore[`${prefix}repair`] = null
  },
  render (h: CreateElement) {
    const props = this
    const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods
    const tableProps = $xeTable
    const tableReactData = $xeTable as unknown as TableReactData
    const tableInternalData = $xeTable as unknown as TableInternalData

    const { xID } = $xeTable
    const { fixedType, fixedColumn, tableColumn } = props
    const { headerColumn } = this

    const { mouseConfig, showHeaderOverflow: allColumnHeaderOverflow, spanMethod, footerSpanMethod } = tableProps
    const { isGroup, isColLoading, overflowX, scrollXLoad, dragCol } = tableReactData
    const { visibleColumn, fullColumnIdData } = tableInternalData

    const mouseOpts = $xeTable.computeMouseOpts
    let renderHeaderList = headerColumn as VxeTableDefines.ColumnInfo[][]
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
      ref: 'refElem',
      class: ['vxe-table--header-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      attrs: {
        xid: xID
      }
    }, [
      h('div', {
        ref: 'refHeaderScroll',
        class: 'vxe-table--header-inner-wrapper',
        on: {
          scroll (evnt: Event) {
            $xeTable.triggerHeaderScrollEvent(evnt, fixedType)
          }
        }
      }, [
        fixedType
          ? renderEmptyElement($xeTable)
          : h('div', {
            ref: 'refHeaderXSpace',
            class: 'vxe-body--x-space'
          }),
        h('table', {
          ref: 'refHeaderTable',
          class: 'vxe-table--header',
          attrs: {
            xid: xID,
            cellspacing: 0,
            cellpadding: 0,
            border: 0,
            xvm: isOptimizeMode ? '1' : null
          }
        }, [
        /**
         * 列宽
         */
          h('colgroup', {
            ref: 'refHeaderColgroup'
          }, renderColumnList.map((column, $columnIndex) => {
            return h('col', {
              attrs: {
                name: column.id
              },
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
            ref: 'refHeaderTHead'
          }, renderHeads(h, this, isGroup, isOptimizeMode, renderHeaderList)),
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
    ])
  },
  methods: {
    uploadColumn () {
      const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods
      const tableReactData = $xeTable as unknown as TableReactData

      const { isGroup } = tableReactData
      this.headerColumn = isGroup ? convertHeaderColumnToRows(this.tableGroupColumn) : []
    }
  } as any
} as any
