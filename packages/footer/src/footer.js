import XEUtils from 'xe-utils'
import { UtilTools, DomTools } from '../../tools'

const cellType = 'footer'

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
    let { $parent: $xetable, fixedType, fixedColumn, tableColumn, footerData } = this
    let {
      $listeners: tableListeners,
      tId,
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
      tooltipOpts
    } = $xetable
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
        'data-tid': tId
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
          width: `${$xetable.tableWidth}px`
        }
      }) : null,
      h('table', {
        class: 'vxe-table--footer',
        attrs: {
          'data-tid': tId,
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
            class: ['vxe-footer--row', footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName({ $table: $xetable, $rowIndex, fixed: fixedType, type: cellType }) : footerRowClassName : ''],
            style: footerRowStyle ? (XEUtils.isFunction(footerRowStyle) ? footerRowStyle({ $table: $xetable, $rowIndex, fixed: fixedType, type: cellType }) : footerRowStyle) : null
          }, tableColumn.map((column, $columnIndex) => {
            const { showFooterOverflow, renderWidth, columnKey, footerAlign, align, footerClassName } = column
            const { enabled } = tooltipOpts
            const isColGroup = column.children && column.children.length
            const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
            const footOverflow = XEUtils.isUndefined(showFooterOverflow) || XEUtils.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow
            const footAlign = footerAlign || align || allFooterAlign || allAlign
            let showEllipsis = footOverflow === 'ellipsis'
            const showTitle = footOverflow === 'title'
            const showTooltip = footOverflow === true || footOverflow === 'tooltip'
            let hasEllipsis = showTitle || showTooltip || showEllipsis
            const attrs = { 'data-colid': column.id }
            const tfOns = {}
            const columnIndex = $xetable.getColumnIndex(column)
            const _columnIndex = $xetable._getColumnIndex(column)
            const itemIndex = _columnIndex
            const params = { $table: $xetable, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, itemIndex, items: list, fixed: fixedType, type: cellType, data: footerData }
            // 虚拟滚动不支持动态高度
            if (scrollXLoad && !hasEllipsis) {
              showEllipsis = hasEllipsis = true
            }
            if (showTitle || showTooltip || enabled) {
              tfOns.mouseenter = evnt => {
                if (showTitle) {
                  DomTools.updateCellTitle(evnt, column)
                } else if (showTooltip || enabled) {
                  $xetable.triggerFooterTooltipEvent(evnt, params)
                }
              }
            }
            if (showTooltip || enabled) {
              tfOns.mouseleave = evnt => {
                if (showTooltip || enabled) {
                  $xetable.handleTargetLeaveEvent(evnt)
                }
              }
            }
            if (tableListeners['footer-cell-click']) {
              tfOns.click = evnt => {
                UtilTools.emitEvent($xetable, 'footer-cell-click', [{ $table: $xetable, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, itemIndex, items: list, fixed: fixedType, type: cellType, data: footerData, cell: evnt.currentTarget }, evnt])
              }
            }
            if (tableListeners['footer-cell-dblclick']) {
              tfOns.dblclick = evnt => {
                UtilTools.emitEvent($xetable, 'footer-cell-dblclick', [{ $table: $xetable, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, itemIndex, items: list, fixed: fixedType, type: cellType, data: footerData, cell: evnt.currentTarget }, evnt])
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
              key: columnKey || ($xetable.columnKey ? column.id : $columnIndex)
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
      const { $parent: $xetable, fixedType } = this
      const { $refs, scrollXLoad, triggerScrollXEvent } = $xetable
      const tableHeader = $refs.tableHeader
      const headerElem = tableHeader ? tableHeader.$el : null
      const bodyElem = $refs.tableBody.$el
      const footerElem = $refs.tableFooter.$el
      const scrollLeft = footerElem.scrollLeft
      $xetable.lastScrollTime = Date.now()
      if (headerElem) {
        headerElem.scrollLeft = scrollLeft
      }
      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft
      }
      if (scrollXLoad) {
        triggerScrollXEvent(evnt)
      }
      UtilTools.emitEvent($xetable, 'scroll', [{ type: cellType, fixed: fixedType, scrollTop: bodyElem.scrollTop, scrollLeft, $table: $xetable, $event: evnt }, evnt])
    }
  }
}
