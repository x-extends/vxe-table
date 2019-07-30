import XEUtils from 'xe-utils'
import { UtilTools } from '../../tools'

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
    let {
      $parent: $table,
      fixedType,
      fixedColumn,
      tableColumn,
      footerData
    } = this
    let {
      $listeners: tableListeners,
      border,
      footerRowClassName,
      footerCellClassName,
      tableWidth,
      scrollbarWidth,
      scrollbarHeight,
      scrollXLoad,
      scrollXStore,
      showOverflow: allColumnOverflow,
      overflowX,
      getColumnMapIndex
    } = $table
    // 如果是使用优化模式
    if (fixedType && allColumnOverflow) {
      tableColumn = fixedColumn
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn
      }
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    }
    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'footer--wrapper'],
      style: {
        'margin-top': `${-scrollbarHeight - 1}px`
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
        h('colgroup', tableColumn.map((column, columnIndex) => {
          return h('col', {
            attrs: {
              name: column.id,
              width: column.renderWidth
            },
            key: columnIndex
          })
        }).concat([
          h('col', {
            attrs: {
              width: scrollbarWidth
            }
          })
        ])),
        /**
         * 底部
         */
        h('tfoot', footerData.map((list, $rowIndex) => {
          return h('tr', {
            class: ['vxe-footer--row', footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName({ $rowIndex, fixed: fixedType }) : footerRowClassName : '']
          }, tableColumn.map((column, $columnIndex) => {
            let { showOverflow, renderWidth, columnKey } = column
            let isColGroup = column.children && column.children.length
            let fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
            let cellOverflow = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
            let showEllipsis = cellOverflow === 'ellipsis'
            let showTitle = cellOverflow === 'title'
            let showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
            let hasEllipsis = showTitle || showTooltip || showEllipsis
            let tfOns = {}
            // 确保任何情况下 columnIndex 都精准指向真实列索引
            let columnIndex = getColumnMapIndex(column)
            if (showTooltip) {
              tfOns.mouseover = evnt => {
                $table.triggerFooterTooltipEvent(evnt, { $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType })
              }
              tfOns.mouseout = evnt => {
                $table.clostTooltip()
              }
            }
            if (tableListeners['header-cell-click']) {
              tfOns.click = evnt => {
                UtilTools.emitEvent($table, 'header-cell-click', [{ $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, cell: evnt.currentTarget }, evnt])
              }
            }
            if (tableListeners['header-cell-dblclick']) {
              tfOns.dblclick = evnt => {
                UtilTools.emitEvent($table, 'header-cell-dblclick', [{ $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, cell: evnt.currentTarget }, evnt])
              }
            }
            return h('td', {
              class: ['vxe-footer--column', column.id, {
                [`col--${column.headerAlign}`]: column.headerAlign,
                'fixed--hidden': fixedHiddenColumn,
                'col--ellipsis': hasEllipsis,
                'filter--active': column.filters.some(item => item.checked)
              }, footerCellClassName ? XEUtils.isFunction(footerCellClassName) ? footerCellClassName({ $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType }) : footerCellClassName : ''],
              attrs: {
                'data-colid': column.id
              },
              on: tfOns,
              key: columnKey || ($table.columnKey ? column.id : columnIndex)
            }, [
              h('div', {
                class: 'vxe-cell',
                style: {
                  width: hasEllipsis ? `${border ? renderWidth - 1 : renderWidth}px` : null
                }
              }, UtilTools.formatText(list[$columnIndex], 1))
            ])
          }).concat([
            h('td', {
              class: ['col--gutter'],
              style: {
                width: `${scrollbarWidth}px`
              }
            })
          ]))
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
      let { $parent: $table, fixedType } = this
      let { $refs, scrollXLoad, triggerScrollXEvent } = $table
      let tableHeader = $refs.tableHeader
      let headerElem = tableHeader ? tableHeader.$el : null
      let bodyElem = $refs.tableBody.$el
      let footerElem = $refs.tableFooter.$el
      let scrollLeft = footerElem.scrollLeft
      if (headerElem) {
        headerElem.scrollLeft = scrollLeft
      }
      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft
      }
      if (scrollXLoad) {
        triggerScrollXEvent(evnt)
      }
      UtilTools.emitEvent($table, 'scroll', [{ type: 'footer', fixed: fixedType, scrollTop: bodyElem.scrollTop, scrollLeft, $table }, evnt])
    }
  }
}
