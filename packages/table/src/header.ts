import { PropType, CreateElement } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { getClass } from '../../ui/src/utils'
import { getOffsetPos, hasClass, addClass, removeClass } from '../../ui/src/dom'
import { convertHeaderColumnToRows, getColReMinWidth, getRefElem } from './util'

import type { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods, VxeColumnPropTypes, TableReactData, TableInternalData, VxeComponentStyleType } from '../../../types'

const { getI18n, renderer, renderEmptyElement } = VxeUI

const cellType = 'header'

const renderRows = (h: CreateElement, _vm: any, isGroup: boolean, isOptimizeMode: boolean, cols: VxeTableDefines.ColumnInfo[], $rowIndex: number) => {
  const props = _vm
  const $xeTable = _vm.$parent as VxeTableConstructor & VxeTablePrivateMethods
  const $xeGrid = $xeTable.xegrid
  const tableProps = $xeTable
  const tableReactData = $xeTable as unknown as TableReactData
  const tableInternalData = $xeTable as unknown as TableInternalData

  const { fixedType } = props
  const { resizable: allResizable, border, columnKey, headerCellClassName, headerCellStyle, showHeaderOverflow: allColumnHeaderOverflow, headerAlign: allHeaderAlign, align: allAlign, mouseConfig } = tableProps
  const { currentColumn, scrollXLoad, scrollYLoad, overflowX } = tableReactData
  const { scrollXStore } = tableInternalData
  const columnOpts = $xeTable.computeColumnOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const { disabledMethod: dragDisabledMethod, isCrossDrag, isPeerDrag } = columnDragOpts
  return cols.map((column: any, $columnIndex: any) => {
    const { type, showHeaderOverflow, headerAlign, align, filters, headerClassName, editRender, cellRender } = column
    // const { enabled } = tooltipOpts
    const colid = column.id
    const renderOpts = editRender || cellRender
    const compConf = renderOpts ? renderer.get(renderOpts.name) : null
    const isColGroup = column.children && column.children.length
    const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
    const headOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
    const headAlign = headerAlign || (compConf ? compConf.tableHeaderCellAlign : '') || allHeaderAlign || align || (compConf ? compConf.tableCellAlign : '') || allAlign
    let showEllipsis = headOverflow === 'ellipsis'
    const showTitle = headOverflow === 'title'
    const showTooltip = headOverflow === true || headOverflow === 'tooltip'
    let hasEllipsis = showTitle || showTooltip || showEllipsis
    let hasFilter = false
    let firstFilterOption: VxeColumnPropTypes.FilterItem | null = null
    if (filters) {
      firstFilterOption = filters[0]
      hasFilter = filters.some((item: VxeColumnPropTypes.FilterItem) => item.checked)
    }
    const columnIndex = $xeTable.getColumnIndex(column)
    const _columnIndex = $xeTable.getVTColumnIndex(column)
    const params = { $table: $xeTable, $grid: $xeGrid, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, firstFilterOption, fixed: fixedType, type: cellType, isHidden: fixedHiddenColumn, hasFilter }
    const thAttrs: Record<string, string | number | null> = {
      colid,
      colspan: column.colSpan > 1 ? column.colSpan : null,
      rowspan: column.rowSpan > 1 ? column.rowSpan : null
    }
    const thOns: any = {
      click: (evnt: MouseEvent) => $xeTable.triggerHeaderCellClickEvent(evnt, params),
      dblclick: (evnt: MouseEvent) => $xeTable.triggerHeaderCellDblclickEvent(evnt, params)
    }
    // 虚拟滚动不支持动态高度
    if (scrollXLoad && !hasEllipsis) {
      showEllipsis = hasEllipsis = true
    }
    const isColDragCell = columnOpts.drag && columnDragOpts.trigger === 'cell'
    let isDisabledDrag = false
    if (isColDragCell) {
      isDisabledDrag = !!(dragDisabledMethod && dragDisabledMethod(params))
    }
    // 按下事件处理
    if (mouseConfig || isColDragCell) {
      thOns.mousedown = (evnt: any) => $xeTable.triggerHeaderCellMousedownEvent(evnt, params)
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
    if (scrollXLoad && !column.fixed && (_columnIndex < scrollXStore.visibleStartIndex - scrollXStore.preloadSize || _columnIndex > scrollXStore.visibleEndIndex + scrollXStore.preloadSize)) {
      isVNPreEmptyStatus = true
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
        'is--sortable': column.sortable,
        'col--filter': !!filters,
        'is--filter-active': hasFilter,
        'is--drag-active': !column.fixed && !isDisabledDrag && (isCrossDrag || isPeerDrag || !column.parentId),
        'is--drag-disabled': isDisabledDrag,
        'col--current': currentColumn === column
      }, getClass(headerClassName, params), getClass(headerCellClassName, params)],
      attrs: thAttrs,
      style: headerCellStyle ? (XEUtils.isFunction(headerCellStyle) ? headerCellStyle(params) : headerCellStyle) as VxeComponentStyleType : undefined,
      on: thOns,
      key: columnKey || scrollXLoad || scrollYLoad || columnOpts.useKey || columnOpts.drag || isColGroup ? colid : $columnIndex
    }, [
      h('div', {
        class: ['vxe-cell', {
          'c--title': showTitle,
          'c--tooltip': showTooltip,
          'c--ellipsis': showEllipsis
        }]
      }, isVNPreEmptyStatus || (isOptimizeMode && fixedHiddenColumn) ? [] : column.renderHeader(h, params)),
      /**
     * 列宽拖动
     */
      !fixedHiddenColumn && showResizable
        ? h('div', {
          class: ['vxe-resizable', {
            'is--line': !border || border === 'none'
          }],
          on: {
            mousedown: (evnt: MouseEvent) => _vm.resizeMousedownEvent(evnt, params),
            dblclick: (evnt: MouseEvent) => $xeTable.handleResizeDblclickEvent(evnt, params)
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
  const { isDragColMove } = tableReactData

  return headerGroups.map((cols: any, $rowIndex: any) => {
    const params = { $table: $xeTable, $rowIndex, fixed: fixedType, type: cellType }

    if (columnOpts.drag && columnDragOpts.animation) {
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

    const { showHeaderOverflow: allColumnHeaderOverflow, spanMethod, footerSpanMethod } = tableProps
    const { isGroup, scrollXLoad, scrollYLoad, dragCol } = tableReactData
    const { visibleColumn, fullColumnIdData } = tableInternalData

    let renderHeaderList = headerColumn as VxeTableDefines.ColumnInfo[][]
    let renderColumnList = tableColumn as VxeTableDefines.ColumnInfo[]
    let isOptimizeMode = false

    if (isGroup) {
      renderColumnList = visibleColumn
    } else {
      // 如果是使用优化模式
      if (scrollXLoad || scrollYLoad || allColumnHeaderOverflow) {
        if (spanMethod || footerSpanMethod) {
          // 如果不支持优化模式
        } else {
          isOptimizeMode = true
        }
      }

      if (fixedType) {
        renderColumnList = visibleColumn
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
            border: 0
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
              key: $columnIndex
            })
          })),
          /**
           * 头部
           */
          h('thead', {
            ref: 'refHeaderTHead'
          }, renderHeads(h, this, isGroup, isOptimizeMode, renderHeaderList))
        ]),
        /**
         * 其他
         */
        h('div', {
          ref: 'refHeaderBorderRepair',
          class: 'vxe-table--header-border-line'
        })
      ])
    ])
  },
  methods: {
    uploadColumn () {
      const { $parent: $xetable } = this
      this.headerColumn = $xetable.isGroup ? convertHeaderColumnToRows(this.tableGroupColumn) : []
    },
    resizeMousedownEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
      const _vm = this
      const props = _vm

      const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods
      const tableReactData = $xeTable as unknown as TableReactData
      const tableInternalData = $xeTable as unknown as TableInternalData

      const { column } = params
      const { fixedType } = props
      const { scrollbarHeight } = tableReactData
      const { elemStore, visibleColumn } = tableInternalData
      const resizableOpts = $xeTable.computeResizableOpts
      const tableEl = $xeTable.$refs.refElem as HTMLDivElement
      const leftContainerElem = $xeTable.$refs.refLeftContainer as HTMLDivElement
      const rightContainerElem = $xeTable.$refs.refRightContainer as HTMLDivElement
      const resizeBarElem = $xeTable.$refs.refCellResizeBar as HTMLDivElement
      const resizeTipElem = $xeTable.$refs.refCellResizeTip as HTMLDivElement
      const scrollbarXToTop = $xeTable.computeScrollbarXToTop
      const { clientX: dragClientX } = evnt
      const wrapperElem = _vm.$el
      const dragBtnElem = evnt.target as HTMLDivElement
      let resizeColumn = column
      if (column.children && column.children.length) {
        XEUtils.eachTree(column.children, childColumn => {
          resizeColumn = childColumn
        })
      }
      const cell = dragBtnElem.parentNode as HTMLTableCellElement
      const cellParams = Object.assign(params, { cell })
      let dragLeft = 0
      const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
      if (!bodyScrollElem) {
        return
      }
      const pos = getOffsetPos(dragBtnElem, tableEl)
      const dragBtnWidth = dragBtnElem.clientWidth
      const dragBtnOffsetWidth = Math.floor(dragBtnWidth / 2)
      const minInterval = getColReMinWidth(cellParams) - dragBtnOffsetWidth // 列之间的最小间距
      let dragMinLeft = pos.left - cell.clientWidth + dragBtnWidth + minInterval
      let dragPosLeft = pos.left + dragBtnOffsetWidth
      const domMousemove = document.onmousemove
      const domMouseup = document.onmouseup
      const isLeftFixed = fixedType === 'left'
      const isRightFixed = fixedType === 'right'

      // 计算左右侧固定列偏移量
      let fixedOffsetWidth = 0
      if (isLeftFixed || isRightFixed) {
        const siblingProp = isLeftFixed ? 'nextElementSibling' : 'previousElementSibling'
        let tempCellElem = cell[siblingProp] as HTMLTableCellElement
        while (tempCellElem) {
          if (hasClass(tempCellElem, 'fixed--hidden')) {
            break
          } else if (!hasClass(tempCellElem, 'col--group')) {
            fixedOffsetWidth += tempCellElem.offsetWidth
          }
          tempCellElem = tempCellElem[siblingProp] as HTMLTableCellElement
        }
        if (isRightFixed && rightContainerElem) {
          dragPosLeft = rightContainerElem.offsetLeft + fixedOffsetWidth
        }
      }

      // 处理拖动事件
      const updateEvent = function (evnt: any) {
        evnt.stopPropagation()
        evnt.preventDefault()
        const tableHeight = tableEl.clientHeight
        const offsetX = evnt.clientX - dragClientX
        let left = dragPosLeft + offsetX
        const scrollLeft = fixedType ? 0 : bodyScrollElem.scrollLeft
        if (isLeftFixed) {
          // 左固定列（不允许超过右侧固定列、不允许超过右边距）
          left = Math.min(left, (rightContainerElem ? rightContainerElem.offsetLeft : bodyScrollElem.clientWidth) - fixedOffsetWidth - minInterval)
        } else if (isRightFixed) {
          // 右侧固定列（不允许超过左侧固定列、不允许超过左边距）
          dragMinLeft = (leftContainerElem ? leftContainerElem.clientWidth : 0) + fixedOffsetWidth + minInterval
          left = Math.min(left, dragPosLeft + cell.clientWidth - minInterval)
        } else {
          dragMinLeft = Math.max(bodyScrollElem.scrollLeft, dragMinLeft)
          // left = Math.min(left, bodyScrollElem.clientWidth + bodyScrollElem.scrollLeft - 40)
        }
        dragLeft = Math.max(left, dragMinLeft)
        const resizeBarLeft = Math.max(1, dragLeft - scrollLeft)
        resizeBarElem.style.left = `${resizeBarLeft}px`
        resizeBarElem.style.top = `${scrollbarXToTop ? scrollbarHeight : 0}px`
        resizeBarElem.style.height = `${scrollbarXToTop ? tableHeight - scrollbarHeight : tableHeight}px`
        if (resizableOpts.showDragTip && resizeTipElem) {
          const tableWidth = tableEl.clientWidth
          const wrapperRect = wrapperElem.getBoundingClientRect()
          const resizeBarWidth = resizeBarElem.clientWidth
          const resizeTipWidth = resizeTipElem.clientWidth
          const resizeTipHeight = resizeTipElem.clientHeight
          let resizeTipLeft = -resizeTipWidth
          if (resizeBarLeft < resizeTipWidth + resizeBarWidth) {
            resizeTipLeft = 0
          } else if (resizeBarLeft > tableWidth) {
            resizeTipLeft += tableWidth - resizeBarLeft
          }
          resizeTipElem.style.left = `${resizeTipLeft}px`
          resizeTipElem.style.top = `${Math.min(tableHeight - resizeTipHeight, Math.max(0, evnt.clientY - wrapperRect.y - resizeTipHeight / 2))}px`
          resizeTipElem.textContent = getI18n('vxe.table.resizeColTip', [resizeColumn.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft)])
        }
      }

      tableReactData._isResize = true
      addClass(tableEl, 'drag--resize')
      resizeBarElem.style.display = 'block'
      document.onmousemove = updateEvent
      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove
        document.onmouseup = domMouseup
        const resizeWidth = resizeColumn.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft)
        resizeColumn.resizeWidth = resizeWidth
        if (resizableOpts.dragMode === 'fixed') {
          visibleColumn.forEach((item: any) => {
            if (item.id !== resizeColumn.id) {
              if (!item.resizeWidth) {
                item.resizeWidth = item.renderWidth
              }
            }
          })
        }
        resizeBarElem.style.display = 'none'
        tableReactData._isResize = false
        tableInternalData._lastResizeTime = Date.now()
        $xeTable.analyColumnWidth()
        $xeTable.recalculate(true).then(() => {
          $xeTable.saveCustomStore('update:visible')
          $xeTable.updateCellAreas()
          $xeTable.dispatchEvent('resizable-change', { ...params, resizeWidth }, evnt)
          setTimeout(() => $xeTable.recalculate(true), 300)
        })
        removeClass(tableEl, 'drag--resize')
      }
      updateEvent(evnt)
      $xeTable.closeMenu()
    }
  } as any
} as any
