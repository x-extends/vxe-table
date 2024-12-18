import { CreateElement } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { getClass } from '../../ui/src/utils'
import { getOffsetPos, hasClass, addClass, removeClass } from '../../ui/src/dom'
import { convertHeaderColumnToRows, getColReMinWidth } from './util'

import type { VxeTableDefines } from '../../../types'

const { renderer } = VxeUI

const cellType = 'header'

const renderRows = (h: CreateElement, _vm: any, cols: VxeTableDefines.ColumnInfo[], $rowIndex: number) => {
  const $xeTable = _vm.$parent
  const $xeGrid = $xeTable.xegrid

  const { fixedType } = _vm

  const { resizable: allResizable, border, columnKey, headerCellClassName, headerCellStyle, showHeaderOverflow: allColumnHeaderOverflow, headerAlign: allHeaderAlign, align: allAlign, currentColumn, scrollXLoad, overflowX, scrollbarWidth, mouseConfig, columnOpts } = $xeTable
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const { disabledMethod: dragDisabledMethod } = columnDragOpts
  return cols.map((column: any, $columnIndex: any) => {
    const { type, showHeaderOverflow, headerAlign, align, headerClassName, editRender, cellRender } = column
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
    const hasFilter = column.filters && column.filters.some((item: any) => item.checked)
    const columnIndex = $xeTable.getColumnIndex(column)
    const _columnIndex = $xeTable.getVTColumnIndex(column)
    const params = { $table: $xeTable, $grid: $xeGrid, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, fixed: fixedType, type: cellType, isHidden: fixedHiddenColumn, hasFilter }
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
    const isAutoCellWidth = !column.resizeWidth && (column.minWidth === 'auto' || column.width === 'auto')

    return h('th', {
      class: ['vxe-header--column', colid, {
        [`col--${headAlign}`]: headAlign,
        [`col--${type}`]: type,
        'col--last': $columnIndex === cols.length - 1,
        'col--fixed': column.fixed,
        'col--group': isColGroup,
        'col--ellipsis': hasEllipsis,
        'fixed--width': !isAutoCellWidth,
        'fixed--hidden': fixedHiddenColumn,
        'is--sortable': column.sortable,
        'col--filter': !!column.filters,
        'is--filter-active': hasFilter,
        'is--drag-disabled': isDisabledDrag,
        'col--current': currentColumn === column
      }, getClass(headerClassName, params), getClass(headerCellClassName, params)],
      attrs: thAttrs,
      style: headerCellStyle ? (XEUtils.isFunction(headerCellStyle) ? headerCellStyle(params) : headerCellStyle) : null,
      on: thOns,
      key: columnKey || columnOpts.useKey || columnOpts.drag || isColGroup ? colid : $columnIndex
    }, [
      h('div', {
        class: ['vxe-cell', {
          'c--title': showTitle,
          'c--tooltip': showTooltip,
          'c--ellipsis': showEllipsis
        }]
      }, column.renderHeader(h, params)),
      /**
     * 列宽拖动
     */
      !fixedHiddenColumn && !isColGroup && (XEUtils.isBoolean(column.resizable) ? column.resizable : (columnOpts.resizable || allResizable))
        ? h('div', {
          class: ['vxe-resizable', {
            'is--line': !border || border === 'none'
          }],
          on: {
            mousedown: (evnt: any) => _vm.resizeMousedown(evnt, params)
          }
        })
        : null
    ])
  }).concat(scrollbarWidth
    ? [
        h('th', {
          key: `gr${$rowIndex}`,
          class: 'vxe-header--gutter col--gutter'
        })
      ]
    : [])
}

function renderHeads (h: CreateElement, _vm: any, headerGroups: any[]) {
  const $xeTable = _vm.$parent
  const tableProps = $xeTable

  const { fixedType } = _vm

  const columnOpts = $xeTable.computeColumnOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts

  const { headerRowClassName, headerRowStyle } = tableProps
  const { isDragColMove } = $xeTable

  return headerGroups.map((cols: any, $rowIndex: any) => {
    const params = { $table: $xeTable, $rowIndex, fixed: fixedType, type: cellType }

    if (columnOpts.drag && columnDragOpts.animation) {
      return h('transition-group', {
        props: {
          tag: 'tr',
          name: `vxe-header--col-list${isDragColMove ? '' : '-disabled'}`,
          class: [
            'vxe-header--row',
            headerRowClassName ? XEUtils.isFunction(headerRowClassName) ? headerRowClassName(params) : headerRowClassName : ''
          ],
          style: headerRowStyle ? (XEUtils.isFunction(headerRowStyle) ? headerRowStyle(params) : headerRowStyle) : null
        }
      }, renderRows(h, _vm, cols, $rowIndex))
    }
    return h('tr', {
      class: [
        'vxe-header--row',
        headerRowClassName ? XEUtils.isFunction(headerRowClassName) ? headerRowClassName(params) : headerRowClassName : ''
      ],
      style: headerRowStyle ? (XEUtils.isFunction(headerRowStyle) ? headerRowStyle(params) : headerRowStyle) : null
    }, renderRows(h, _vm, cols, $rowIndex))
  })
}

export default {
  name: 'VxeTableHeader',
  props: {
    tableData: Array,
    tableColumn: Array,
    tableGroupColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String
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
    const { $parent: $xetable, $el, $refs, fixedType } = this
    const { elemStore } = $xetable
    const prefix = `${fixedType || 'main'}-header-`
    elemStore[`${prefix}wrapper`] = $el
    elemStore[`${prefix}table`] = $refs.table
    elemStore[`${prefix}colgroup`] = $refs.colgroup
    elemStore[`${prefix}list`] = $refs.thead
    elemStore[`${prefix}xSpace`] = $refs.xSpace
    elemStore[`${prefix}repair`] = $refs.repair
  },
  destroyed () {
    const { $parent: $xetable, fixedType } = this
    const { elemStore } = $xetable
    const prefix = `${fixedType || 'main'}-header-`
    elemStore[`${prefix}wrapper`] = null
    elemStore[`${prefix}table`] = null
    elemStore[`${prefix}colgroup`] = null
    elemStore[`${prefix}list`] = null
    elemStore[`${prefix}xSpace`] = null
    elemStore[`${prefix}repair`] = null
  },
  render (h: CreateElement) {
    const { _e, $parent: $xetable, fixedType, headerColumn, tableColumn, fixedColumn } = this
    const { tId, isGroup, visibleColumn, showHeaderOverflow: allColumnHeaderOverflow, scrollXLoad, scrollbarWidth } = $xetable
    let headerGroups = headerColumn
    let renderColumnList = tableColumn
    if (isGroup) {
      renderColumnList = visibleColumn
    } else {
      // 如果是使用优化模式
      if (fixedType) {
        if (scrollXLoad || allColumnHeaderOverflow) {
          renderColumnList = fixedColumn
        }
      }
      headerGroups = [renderColumnList]
    }
    return h('div', {
      class: ['vxe-table--header-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      attrs: {
        xid: tId
      }
    }, [
      fixedType
        ? _e()
        : h('div', {
          class: 'vxe-body--x-space',
          ref: 'xSpace'
        }),
      h('table', {
        class: 'vxe-table--header',
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
        }).concat(scrollbarWidth
          ? [
              h('col', {
                attrs: {
                  name: 'col_gutter'
                }
              })
            ]
          : [])),
        /**
         * 头部
         */
        h('thead', {
          ref: 'thead'
        }, renderHeads(h, this, headerGroups))
      ]),
      /**
       * 其他
       */
      h('div', {
        class: 'vxe-table--header-border-line',
        ref: 'repair'
      })
    ])
  },
  methods: {
    uploadColumn () {
      const { $parent: $xetable } = this
      this.headerColumn = $xetable.isGroup ? convertHeaderColumnToRows(this.tableGroupColumn) : []
    },
    resizeMousedown (evnt: any, params: any) {
      const $xeTable = this.$parent
      const tableInternalData = $xeTable

      const { column } = params
      const { $parent: $xetable, fixedType } = this
      const { visibleColumn } = tableInternalData
      const { tableBody, leftContainer, rightContainer } = $xetable.$refs
      const tableEl = $xeTable.$el as HTMLDivElement
      const resizeBarElem = $xetable.$refs.resizeBar as HTMLDivElement
      const resizeTipElem = $xetable.$refs.refCellResizeTip as HTMLDivElement
      const wrapperElem = this.$el as HTMLDivElement
      const { target: dragBtnElem, clientX: dragClientX } = evnt
      const cell = params.cell = dragBtnElem.parentNode
      const resizableOpts = $xeTable.computeResizableOpts
      let dragLeft = 0
      const tableBodyElem = tableBody.$el
      const pos = getOffsetPos(dragBtnElem, tableEl)
      const dragBtnWidth = dragBtnElem.clientWidth
      const dragBtnOffsetWidth = Math.floor(dragBtnWidth / 2)
      const minInterval = getColReMinWidth(params) - dragBtnOffsetWidth // 列之间的最小间距
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
        let tempCellElem = cell[siblingProp]
        while (tempCellElem) {
          if (hasClass(tempCellElem, 'fixed--hidden')) {
            break
          } else if (!hasClass(tempCellElem, 'col--group')) {
            fixedOffsetWidth += tempCellElem.offsetWidth
          }
          tempCellElem = tempCellElem[siblingProp]
        }
        if (isRightFixed && rightContainer) {
          dragPosLeft = rightContainer.offsetLeft + fixedOffsetWidth
        }
      }

      // 处理拖动事件
      const updateEvent = function (evnt: any) {
        evnt.stopPropagation()
        evnt.preventDefault()
        const offsetX = evnt.clientX - dragClientX
        let left = dragPosLeft + offsetX
        const scrollLeft = fixedType ? 0 : tableBodyElem.scrollLeft
        if (isLeftFixed) {
          // 左固定列（不允许超过右侧固定列、不允许超过右边距）
          left = Math.min(left, (rightContainer ? rightContainer.offsetLeft : tableBodyElem.clientWidth) - fixedOffsetWidth - minInterval)
        } else if (isRightFixed) {
          // 右侧固定列（不允许超过左侧固定列、不允许超过左边距）
          dragMinLeft = (leftContainer ? leftContainer.clientWidth : 0) + fixedOffsetWidth + minInterval
          left = Math.min(left, dragPosLeft + cell.clientWidth - minInterval)
        } else {
          dragMinLeft = Math.max(tableBodyElem.scrollLeft, dragMinLeft)
          // left = Math.min(left, tableBodyElem.clientWidth + tableBodyElem.scrollLeft - 40)
        }
        dragLeft = Math.max(left, dragMinLeft)
        const resizeBarLeft = dragLeft - scrollLeft
        resizeBarElem.style.left = `${resizeBarLeft}px`
        if (resizableOpts.showDragTip && resizeTipElem) {
          const tableWidth = tableEl.clientWidth
          const wrapperRect = wrapperElem.getBoundingClientRect()
          const resizeBarWidth = resizeBarElem.clientWidth
          const resizeTipWidth = resizeTipElem.clientWidth
          const resizeTipHeight = resizeTipElem.clientHeight
          let resizeTipLeft = -resizeTipWidth
          if (resizeBarLeft < resizeTipWidth + resizeBarWidth) {
            resizeTipLeft = resizeTipWidth + resizeBarWidth - resizeBarLeft
          } else if (resizeBarLeft > tableWidth) {
            resizeTipLeft += tableWidth - resizeBarLeft
          }
          resizeTipElem.style.left = `${resizeTipLeft}px`
          resizeTipElem.style.top = `${Math.min(tableEl.clientHeight - resizeTipHeight, Math.max(0, evnt.clientY - wrapperRect.y - resizeTipHeight / 2))}px`
          resizeTipElem.textContent = `${column.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft)}px`
        }
      }

      $xetable._isResize = true
      addClass($xetable.$el, 'drag--resize')
      resizeBarElem.style.display = 'block'
      document.onmousemove = updateEvent
      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove
        document.onmouseup = domMouseup
        const resizeWidth = column.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft)
        column.resizeWidth = resizeWidth
        if (resizableOpts.dragMode === 'fixed') {
          visibleColumn.forEach((item: any) => {
            if (item.id !== column.id) {
              if (!item.resizeWidth) {
                item.resizeWidth = item.renderWidth
              }
            }
          })
        }
        resizeBarElem.style.display = 'none'
        $xetable._isResize = false
        $xetable._lastResizeTime = Date.now()
        $xetable.analyColumnWidth()
        $xetable.recalculate(true).then(() => {
          $xetable.saveCustomStore('update:visible')
          $xetable.updateCellAreas()
          $xetable.emitEvent('resizable-change', { ...params, resizeWidth }, evnt)
          setTimeout(() => $xetable.recalculate(true), 300)
        })
        removeClass($xetable.$el, 'drag--resize')
      }
      updateEvent(evnt)
      $xetable.closeMenu()
    }
  } as any
} as any
