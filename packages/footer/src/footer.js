import XEUtils from 'xe-utils'
import { UtilTools, DomTools } from '../../tools'

export default {
  name: 'VxeTableFooter',
  props: {
    footerData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String
  },
  render (h) {
    let { $parent: $table, fixedType, fixedColumn, tableColumn, footerData } = this
    let {
      $listeners: tableListeners,
      id,
      footerRowClassName,
      footerCellClassName,
      footerRowStyle,
      footerCellStyle,
      footerAlign: allFooterAlign,
      footerSpanMethod,
      align: allAlign,
      tableWidth,
      scrollbarWidth,
      scrollbarHeight,
      scrollXLoad,
      scrollXStore,
      cellOffsetWidth,
      showFooterOverflow: allColumnFooterOverflow,
      currentColumn,
      overflowX,
      getColumnIndex
    } = $table
    // 如果是使用优化模式
    if (fixedType && allColumnFooterOverflow && !footerSpanMethod) {
      tableColumn = fixedColumn
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    } else if (scrollXLoad) {
      if (fixedType && !footerSpanMethod) {
        tableColumn = fixedColumn
      }
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    }
    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'footer--wrapper'],
      attrs: {
        'data-tid': id
      },
      style: {
        'margin-top': `${-scrollbarHeight}px`
      },
      on: {
        scroll: this.scrollEvent
      }
    }, [
      !fixedType && scrollXLoad ? h('div', {
        class: ['vxe-body--x-space'],
        style: {
          width: `${$table.tableWidth}px`
        }
      }) : null,
      h('table', {
        class: 'vxe-table--footer',
        attrs: {
          'data-tid': id,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        style: {
          width: tableWidth === null ? tableWidth : `${tableWidth + scrollbarWidth}px`,
          'margin-left': fixedType ? null : `${scrollXStore.leftSpaceWidth}px`
        }
      }, [
        /**
         * 列宽
         */
        h('colgroup', tableColumn.map((column, $columnIndex) => {
          return h('col', {
            attrs: {
              name: column.id
            },
            style: {
              width: `${column.renderWidth}px`
            },
            key: $columnIndex
          })
        }).concat(scrollbarWidth ? [
          h('col', {
            attrs: {
              name: 'col_gutter'
            },
            style: {
              width: `${scrollbarWidth}px`
            }
          })
        ] : [])),
        /**
         * 底部
         */
        h('tfoot', footerData.map((list, $rowIndex) => {
          return h('tr', {
            class: ['vxe-footer--row', footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName({ $table, $rowIndex, fixed: fixedType }) : footerRowClassName : ''],
            style: footerRowStyle ? (XEUtils.isFunction(footerRowStyle) ? footerRowStyle({ $table, $rowIndex, fixed: fixedType }) : footerRowStyle) : null
          }, tableColumn.map((column, $columnIndex) => {
            const { showFooterOverflow, renderWidth, columnKey, footerAlign, align, footerClassName } = column
            const isColGroup = column.children && column.children.length
            const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
            const footOverflow = XEUtils.isUndefined(showFooterOverflow) || XEUtils.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow
            const footAlign = footerAlign || align || allFooterAlign || allAlign
            const showEllipsis = footOverflow === 'ellipsis'
            const showTitle = footOverflow === 'title'
            const showTooltip = footOverflow === true || footOverflow === 'tooltip'
            const hasEllipsis = showTitle || showTooltip || showEllipsis
            const attrs = { 'data-colid': column.id }
            const tfOns = {}
            // 确保任何情况下 columnIndex 都精准指向真实列索引
            const columnIndex = getColumnIndex(column)
            const itemIndex = $table.tableColumn.indexOf(column)
            const params = { $table, $rowIndex, column, columnIndex, $columnIndex, itemIndex, items: list, fixed: fixedType, data: footerData }
            if (showTitle || showTooltip) {
              tfOns.mouseenter = evnt => {
                if (showTitle) {
                  DomTools.updateCellTitle(evnt)
                } else if (showTooltip) {
                  $table.triggerFooterTooltipEvent(evnt, params)
                }
              }
            }
            if (showTooltip) {
              tfOns.mouseleave = evnt => {
                if (showTooltip) {
                  $table.handleTargetLeaveEvent(evnt)
                }
              }
            }
            if (tableListeners['footer-cell-click']) {
              tfOns.click = evnt => {
                UtilTools.emitEvent($table, 'footer-cell-click', [{ $table, $rowIndex, column, columnIndex, $columnIndex, itemIndex, items: list, fixed: fixedType, data: footerData, cell: evnt.currentTarget }, evnt])
              }
            }
            if (tableListeners['footer-cell-dblclick']) {
              tfOns.dblclick = evnt => {
                UtilTools.emitEvent($table, 'footer-cell-dblclick', [{ $table, $rowIndex, column, columnIndex, $columnIndex, itemIndex, items: list, fixed: fixedType, data: footerData, cell: evnt.currentTarget }, evnt])
              }
            }
            // 合并行或列
            if (footerSpanMethod) {
              const { rowspan = 1, colspan = 1 } = footerSpanMethod(params) || {}
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
            const type = column.type === 'seq' || column.type === 'index' ? 'seq' : column.type
            return h('td', {
              class: ['vxe-footer--column', column.id, {
                [`col--${footAlign}`]: footAlign,
                [`col--${type}`]: type,
                'col--last': $columnIndex === tableColumn.length - 1,
                'fixed--hidden': fixedHiddenColumn,
                'col--ellipsis': hasEllipsis,
                'col--current': currentColumn === column
              }, UtilTools.getClass(footerClassName, params), UtilTools.getClass(footerCellClassName, params)],
              attrs,
              style: footerCellStyle ? (XEUtils.isFunction(footerCellStyle) ? footerCellStyle(params) : footerCellStyle) : null,
              on: tfOns,
              key: columnKey || ($table.columnKey ? column.id : $columnIndex)
            }, [
              h('div', {
                class: ['vxe-cell', {
                  'c--title': showTitle,
                  'c--tooltip': showTooltip,
                  'c--ellipsis': showEllipsis
                }],
                style: {
                  width: hasEllipsis ? `${renderWidth - cellOffsetWidth}px` : null
                }
              }, column.renderFooter(h, params))
            ])
          }).concat(scrollbarWidth ? [
            h('td', {
              class: ['col--gutter'],
              style: {
                width: `${scrollbarWidth}px`
              }
            })
          ] : []))
        }))
      ])
    ])
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent (evnt) {
      const { $parent: $table, fixedType } = this
      const { $refs, scrollXLoad, triggerScrollXEvent } = $table
      const tableHeader = $refs.tableHeader
      const headerElem = tableHeader ? tableHeader.$el : null
      const bodyElem = $refs.tableBody.$el
      const footerElem = $refs.tableFooter.$el
      const scrollLeft = footerElem.scrollLeft
      $table.lastScrollTime = Date.now()
      if (headerElem) {
        headerElem.scrollLeft = scrollLeft
      }
      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft
      }
      if (scrollXLoad) {
        triggerScrollXEvent(evnt)
      }
      UtilTools.emitEvent($table, 'scroll', [{ type: 'footer', fixed: fixedType, scrollTop: bodyElem.scrollTop, scrollLeft, $table, $event: evnt }, evnt])
    }
  }
}
