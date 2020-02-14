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
    let { $parent: $xetable, $el, $refs, fixedType } = this
    let { elemStore } = $xetable
    let prefix = `${fixedType || 'main'}-footer-`
    elemStore[`${prefix}wrapper`] = $el
    elemStore[`${prefix}table`] = $refs.table
    elemStore[`${prefix}colgroup`] = $refs.colgroup
    elemStore[`${prefix}list`] = $refs.tfoot
    elemStore[`${prefix}xSpace`] = $refs.xSpace
  },
  render (h) {
    let {
      _e,
      $parent: $xetable,
      fixedType,
      fixedColumn,
      tableColumn,
      footerData
    } = this
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
      scrollXLoad,
      columnKey,
      showOverflow: allColumnOverflow,
      currentColumn,
      overflowX,
      scrollbarWidth,
      getColumnIndex
    } = $xetable
    // 如果是使用优化模式
    if (!footerSpanMethod) {
      if (fixedType && allColumnOverflow) {
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
        'data-tid': id
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
          'data-tid': id,
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
            let { showOverflow, footerAlign, align, footerClassName } = column
            let isColGroup = column.children && column.children.length
            let fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
            let cellOverflow = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
            let footAlign = footerAlign || align || allFooterAlign || allAlign
            let showEllipsis = cellOverflow === 'ellipsis'
            let showTitle = cellOverflow === 'title'
            let showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
            let hasEllipsis = showTitle || showTooltip || showEllipsis
            let attrs = { 'data-colid': column.id }
            let tfOns = {}
            // 确保任何情况下 columnIndex 都精准指向真实列索引
            let columnIndex = getColumnIndex(column)
            let cellIndex = $xetable.tableColumn.indexOf(column)
            let params = { $table: $xetable, $rowIndex, column, columnIndex, $columnIndex, cellIndex, cells: list, fixed: fixedType, data: footerData }
            if (showTitle || showTooltip) {
              tfOns.mouseenter = evnt => {
                if (showTitle) {
                  DomTools.updateCellTitle(evnt)
                } else if (showTooltip) {
                  $xetable.triggerFooterTooltipEvent(evnt, { $table: $xetable, $rowIndex, column, columnIndex, $columnIndex, cellIndex, cells: list, fixed: fixedType, data: footerData, cell: evnt.currentTarget })
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
            if (tableListeners['header-cell-click']) {
              tfOns.click = evnt => {
                UtilTools.emitEvent($xetable, 'header-cell-click', [{ $table: $xetable, $rowIndex, column, columnIndex, $columnIndex, cellIndex, cells: list, fixed: fixedType, data: footerData, cell: evnt.currentTarget }, evnt])
              }
            }
            if (tableListeners['header-cell-dblclick']) {
              tfOns.dblclick = evnt => {
                UtilTools.emitEvent($xetable, 'header-cell-dblclick', [{ $table: $xetable, $rowIndex, column, columnIndex, $columnIndex, cellIndex, cells: list, fixed: fixedType, data: footerData, cell: evnt.currentTarget }, evnt])
              }
            }
            // 合并行或列
            if (footerSpanMethod) {
              let { rowspan = 1, colspan = 1 } = footerSpanMethod(params) || {}
              if (!rowspan || !colspan) {
                return null
              }
              attrs.rowspan = rowspan
              attrs.colspan = colspan
            }
            let type = column.type === 'seq' || column.type === 'index' ? 'seq' : column.type
            return h('td', {
              class: ['vxe-footer--column', column.id, {
                [`col--${footAlign}`]: footAlign,
                [`col--${type}`]: type,
                'col--last': $columnIndex === tableColumn.length - 1,
                'fixed--hidden': fixedHiddenColumn,
                'col--ellipsis': hasEllipsis,
                'filter--active': column.filters && column.filters.some(item => item.checked),
                'col--current': currentColumn === column
              }, UtilTools.getClass(footerClassName, params), UtilTools.getClass(footerCellClassName, params)],
              attrs,
              style: footerCellStyle ? (XEUtils.isFunction(footerCellStyle) ? footerCellStyle(params) : footerCellStyle) : null,
              on: tfOns,
              key: columnKey ? column.id : columnIndex
            }, [
              h('div', {
                class: 'vxe-cell'
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
      let { $parent: $xetable, fixedType } = this
      let { $refs, scrollXLoad, triggerScrollXEvent, lastScrollLeft } = $xetable
      let tableHeader = $refs.tableHeader
      let headerElem = tableHeader ? tableHeader.$el : null
      let bodyElem = $refs.tableBody.$el
      let footerElem = $refs.tableFooter.$el
      let scrollLeft = footerElem.scrollLeft
      let isX = scrollLeft !== lastScrollLeft
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
      UtilTools.emitEvent($xetable, 'scroll', [{ type: 'footer', fixed: fixedType, scrollTop: bodyElem.scrollTop, scrollLeft, isX, isY: false, $table: $xetable }, evnt])
    }
  }
}
