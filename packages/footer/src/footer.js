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
  mounted () {
    let { $parent: $table, $el, $refs, fixedType } = this
    let { _elemStore } = $table
    let prefix = `${fixedType || 'main'}-footer-`
    _elemStore[`${prefix}wrapper`] = $el
    _elemStore[`${prefix}table`] = $refs.table
    _elemStore[`${prefix}colgroup`] = $refs.colgroup
    _elemStore[`${prefix}list`] = $refs.tfoot
    _elemStore[`${prefix}x-space`] = $refs.xSpace
  },
  render (h) {
    let {
      _e,
      $parent: $table,
      fixedType,
      fixedColumn,
      tableColumn,
      footerData
    } = this
    let { $listeners: tableListeners, footerRowClassName, footerCellClassName,
      // tableWidth,
      // scrollYWidth,
      // scrollXHeight,
      scrollXLoad,
      showOverflow,
      // _scrollXStore,
      getColumnMapIndex
    } = $table
    // 如果是使用优化模式
    if (fixedType && showOverflow) {
      tableColumn = fixedColumn
      // tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn
      }
      // tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    }
    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      style: {
        // 'margin-top': `${-scrollXHeight - 1}px`
      },
      on: {
        scroll: this.scrollEvent
      }
    }, [
      fixedType ? _e() : h('div', {
        class: ['vxe-body--x-space'],
        style: {
          // width: `${$table.tableWidth}px`
        },
        ref: 'xSpace'
      }),
      h('table', {
        class: 'vxe-table--footer',
        attrs: {
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        style: {
          // width: tableWidth === null ? tableWidth : `${tableWidth + scrollYWidth}px`,
          // 'margin-left': fixedType ? null : `${_scrollXStore.leftSpaceWidth}px`
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
              // width: column.renderWidth
            }
          })
        }).concat([
          h('col', {
            name: 'col--gutter',
            attrs: {
              // width: scrollYWidth
            }
          })
        ])),
        /**
         * 底部
         */
        h('tfoot', {
          ref: 'tfoot'
        }, footerData.map((list, rowIndex) => {
          return h('tr', {
            class: ['vxe-footer--row', footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName({ $rowIndex: rowIndex, fixed: fixedType }) : footerRowClassName : '']
          }, tableColumn.map((column, $columnIndex) => {
            let isGroup = column.children && column.children.length
            let fixedHiddenColumn = fixedType && column.fixed !== fixedType && !isGroup
            let tfOns = {}
            // 确保任何情况下 columnIndex 都精准指向真实列索引
            let columnIndex = getColumnMapIndex(column)
            if (tableListeners['header-cell-click']) {
              tfOns.click = evnt => {
                UtilTools.emitEvent($table, 'header-cell-click', [{ $table, $rowIndex: rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, cell: evnt.currentTarget }, evnt])
              }
            }
            if (tableListeners['header-cell-dblclick']) {
              tfOns.dblclick = evnt => {
                UtilTools.emitEvent($table, 'header-cell-dblclick', [{ $table, $rowIndex: rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, cell: evnt.currentTarget }, evnt])
              }
            }
            return h('td', {
              class: ['vxe-footer--column', column.id, {
                [`col--${column.headerAlign}`]: column.headerAlign,
                'fixed--hidden': fixedHiddenColumn,
                'filter--active': column.filters.some(item => item.checked)
              }, footerCellClassName ? XEUtils.isFunction(footerCellClassName) ? footerCellClassName({ $rowIndex: rowIndex, column, columnIndex, $columnIndex, fixed: fixedType }) : footerCellClassName : ''],
              attrs: {
                'data-index': columnIndex
              },
              on: tfOns,
              key: columnIndex
            }, [
              h('div', {
                class: ['vxe-cell']
              }, list[columnIndex] || '　')
            ])
          }).concat([
            h('td', {
              class: ['col--gutter'],
              style: {
                // width: `${scrollYWidth}px`
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
      let { $refs, scrollXLoad, triggerScrollXEvent, lastScrollLeft } = $table
      let tableHeader = $refs.tableHeader
      let headerElem = tableHeader ? tableHeader.$el : null
      let bodyElem = $refs.tableBody.$el
      let footerElem = $refs.tableFooter.$el
      let scrollLeft = footerElem.scrollLeft
      let isX = scrollLeft !== lastScrollLeft
      $table.lastScrollLeft = scrollLeft
      if (headerElem) {
        headerElem.scrollLeft = scrollLeft
      }
      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft
      }
      if (scrollXLoad && isX) {
        triggerScrollXEvent(evnt)
      }
      UtilTools.emitEvent($table, 'scroll', [{ type: 'footer', fixed: fixedType, scrollTop: bodyElem.scrollTop, scrollLeft, isX, isY: false, $table }, evnt])
    }
  }
}
