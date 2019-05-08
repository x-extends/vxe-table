import XEUtils from 'xe-utils'

export default {
  props: {
    footerData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    fixedColumn: Array,
    fixedType: String
  },
  render (h) {
    let { $parent: $table, fixedType, fixedColumn, tableColumn, footerData } = this
    let { footerRowClassName, footerCellClassName, tableWidth, scrollYWidth, scrollXLoad, scrollXStore, optimizeConfig } = $table
    let { overflow } = optimizeConfig
    // 如果是使用优化模式
    if (fixedType && overflow) {
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
        attrs: {
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        style: {
          width: tableWidth === null ? tableWidth : `${tableWidth + scrollYWidth}px`,
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
            }
          })
        }).concat([
          h('col', {
            attrs: {
              width: scrollYWidth
            }
          })
        ])),
        /**
         * 底部
         */
        h('tfoot', footerData.map((list, rowIndex) => {
          return h('tr', {
            class: ['vxe-footer--row', footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName({ rowIndex }) : footerRowClassName : '']
          }, tableColumn.map((column, columnIndex) => {
            let isGroup = column.children && column.children.length
            let fixedHiddenColumn = fixedType && column.fixed !== fixedType && !isGroup
            return h('td', {
              class: ['vxe-footer--column', column.id, {
                [`col--${column.headerAlign}`]: column.headerAlign,
                'fixed--hidden': fixedHiddenColumn,
                'filter--active': column.filters.some(item => item.checked)
              }, footerCellClassName ? XEUtils.isFunction(footerCellClassName) ? footerCellClassName({ rowIndex, column, columnIndex }) : footerCellClassName : ''],
              attrs: {
                colspan: column.colSpan,
                rowspan: column.rowSpan
              },
              key: columnIndex
            }, [
              h('div', {
                class: ['vxe-cell']
              }, list[columnIndex])
            ])
          }).concat([
            h('td', {
              class: ['col--gutter'],
              style: {
                width: `${scrollYWidth}px`
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
      let { $parent: $table } = this
      let { tableHeader, tableBody, tableFooter } = $table.$refs
      let headerElem = tableHeader.$el
      let bodyElem = tableBody.$el
      let footerElem = tableFooter.$el
      if (headerElem) {
        headerElem.scrollLeft = footerElem.scrollLeft
      }
      if (bodyElem) {
        bodyElem.scrollLeft = footerElem.scrollLeft
      }
    }
  }
}
