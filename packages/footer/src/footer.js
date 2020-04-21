import XEUtils from 'xe-utils/methods/xe-utils'
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
  mounted () {
    const { $parent: $xetable, $el, $refs, fixedType } = this
    const { elemStore } = $xetable
    const prefix = `${fixedType || 'main'}-footer-`
    elemStore[`${prefix}wrapper`] = $el
    elemStore[`${prefix}table`] = $refs.table
    elemStore[`${prefix}colgroup`] = $refs.colgroup
    elemStore[`${prefix}list`] = $refs.tfoot
    elemStore[`${prefix}xSpace`] = $refs.xSpace
  },
  render (h) {
    let { _e, $parent: $xetable, fixedType, fixedColumn, tableColumn, footerData } = this
    const {
      $listeners: tableListeners,
      tId,
      footerRowClassName,
      footerCellClassName,
      footerRowStyle,
      footerCellStyle,
      footerAlign: allFooterAlign,
      footerSpanMethod,
      align: allAlign,
      scrollXLoad,
      columnKey,
      showFooterOverflow: allColumnFooterOverflow,
      currentColumn,
      overflowX,
      scrollbarWidth
    } = $xetable
    // 如果是使用优化模式
    if (!footerSpanMethod) {
      if (fixedType && allColumnFooterOverflow) {
        tableColumn = fixedColumn
      } else if (scrollXLoad) {
        if (fixedType) {
          tableColumn = fixedColumn
        }
      }
    }
    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      attrs: {
        'data-tid': tId
      },
      on: {
        scroll: this.scrollEvent
      }
    }, [
      fixedType ? _e() : h('div', {
        class: 'vxe-body--x-space',
        ref: 'xSpace'
      }),
      h('table', {
        class: 'vxe-table--footer',
        attrs: {
          'data-tid': tId,
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
        }, tableColumn.map((column, columnIndex) => {
          return h('col', {
            attrs: {
              name: column.id
            },
            key: columnIndex
          })
        }).concat(scrollbarWidth ? [
          h('col', {
            attrs: {
              name: 'col_gutter'
            }
          })
        ] : [])),
        /**
         * 底部
         */
        h('tfoot', {
          ref: 'tfoot'
        }, footerData.map((list, $rowIndex) => {
          return h('tr', {
            class: ['vxe-footer--row', footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName({ $table: $xetable, $rowIndex, fixed: fixedType }) : footerRowClassName : ''],
            style: footerRowStyle ? (XEUtils.isFunction(footerRowStyle) ? footerRowStyle({ $table: $xetable, $rowIndex, fixed: fixedType }) : footerRowStyle) : null
          }, tableColumn.map((column, $columnIndex) => {
            const { showFooterOverflow, footerAlign, align, footerClassName } = column
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
            // 确保任何情况下 columnIndex 都精准指向真实列索引
            const columnIndex = $xetable.getColumnIndex(column)
            const _columnIndex = $xetable._getColumnIndex(column)
            const itemIndex = _columnIndex
            const params = { $table: $xetable, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, itemIndex, items: list, fixed: fixedType, data: footerData }
            // 虚拟滚动不支持动态高度
            if (scrollXLoad && !hasEllipsis) {
              showEllipsis = hasEllipsis = true
            }
            if (showTitle || showTooltip) {
              tfOns.mouseenter = evnt => {
                if (showTitle) {
                  DomTools.updateCellTitle(evnt, column)
                } else if (showTooltip) {
                  $xetable.triggerFooterTooltipEvent(evnt, params)
                }
              }
            }
            if (showTooltip) {
              tfOns.mouseleave = evnt => {
                if (showTooltip) {
                  $xetable.handleTargetLeaveEvent(evnt)
                }
              }
            }
            if (tableListeners['footer-cell-click']) {
              tfOns.click = evnt => {
                UtilTools.emitEvent($xetable, 'footer-cell-click', [{ $table: $xetable, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, itemIndex, items: list, fixed: fixedType, data: footerData, cell: evnt.currentTarget }, evnt])
              }
            }
            if (tableListeners['footer-cell-dblclick']) {
              tfOns.dblclick = evnt => {
                UtilTools.emitEvent($xetable, 'footer-cell-dblclick', [{ $table: $xetable, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, itemIndex, items: list, fixed: fixedType, data: footerData, cell: evnt.currentTarget }, evnt])
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
              key: columnKey ? column.id : $columnIndex
            }, [
              h('div', {
                class: ['vxe-cell', {
                  'c--title': showTitle,
                  'c--tooltip': showTooltip,
                  'c--ellipsis': showEllipsis
                }]
              }, column.renderFooter(h, params))
            ])
          }).concat(scrollbarWidth ? [
            h('td', {
              class: 'col--gutter'
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
      const { $refs, scrollXLoad, triggerScrollXEvent, lastScrollLeft } = $xetable
      const tableHeader = $refs.tableHeader
      const headerElem = tableHeader ? tableHeader.$el : null
      const bodyElem = $refs.tableBody.$el
      const footerElem = $refs.tableFooter.$el
      const scrollLeft = footerElem.scrollLeft
      const isX = scrollLeft !== lastScrollLeft
      $xetable.lastScrollLeft = scrollLeft
      $xetable.lastScrollTime = Date.now()
      if (headerElem) {
        headerElem.scrollLeft = scrollLeft
      }
      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft
      }
      if (scrollXLoad && isX) {
        triggerScrollXEvent(evnt)
      }
      UtilTools.emitEvent($xetable, 'scroll', [{ type: 'footer', fixed: fixedType, scrollTop: bodyElem.scrollTop, scrollLeft, isX, isY: false, $table: $xetable, $event: evnt }, evnt])
    }
  }
}
