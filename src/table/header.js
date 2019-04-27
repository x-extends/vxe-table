const getAllColumns = (columns) => {
  const result = []
  columns.forEach((column) => {
    if (column.children && column.children.length) {
      result.push(column)
      result.push.apply(result, getAllColumns(column.children))
    } else {
      result.push(column)
    }
  })
  return result
}

const convertToRows = (originColumns) => {
  let maxLevel = 1
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1
      if (maxLevel < column.level) {
        maxLevel = column.level
      }
    }
    if (column.children && column.children.length) {
      let colSpan = 0
      column.children.forEach((subColumn) => {
        traverse(subColumn, column)
        colSpan += subColumn.colSpan
      })
      column.colSpan = colSpan
    } else {
      column.colSpan = 1
    }
  }

  originColumns.forEach((column) => {
    column.level = 1
    traverse(column)
  })

  const rows = []
  for (let i = 0; i < maxLevel; i++) {
    rows.push([])
  }

  const allColumns = getAllColumns(originColumns)

  allColumns.forEach((column) => {
    if (column.children && column.children.length) {
      column.rowSpan = 1
    } else {
      column.rowSpan = maxLevel - column.level + 1
    }
    rows[column.level - 1].push(column)
  })

  return rows
}

export default {
  props: {
    tableData: Array,
    tableColumn: Array,
    collectColumn: Array,
    fixedType: String,
    isGroup: Boolean
  },
  computed: {
    headerColumn () {
      return this.isGroup ? convertToRows(this.collectColumn) : [this.tableColumn]
    }
  },
  render (h) {
    let { _e, $parent: $table, fixedType, headerColumn, tableColumn } = this
    let { tableWidth, scrollYWidth } = $table
    return h('div', {
      class: [fixedType ? `vxe-table--fixed-${fixedType}-header-wrapper` : 'vxe-table--header-wrapper']
    }, [
      h('table', {
        attrs: {
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        style: {
          width: tableWidth === null ? tableWidth : `${tableWidth + scrollYWidth}px`
        }
      }, [
        /**
         * 列宽
         */
        h('colgroup', tableColumn.map((column, columnIndex) => {
          return column.visible ? h('col', {
            attrs: {
              width: column.renderWidth
            }
          }) : _e()
        }).concat([
          h('col', {
            attrs: {
              width: scrollYWidth
            }
          })
        ])),
        /**
         * 头部
         */
        h('thead', headerColumn.map(cols => {
          return h('tr', {
            class: ['vxe-header-row']
          }, cols.map((column, columnIndex) => {
            let fixedHiddenColumn = fixedType && column.fixed !== fixedType && (!column.children || !column.children.length)
            return column.visible ? h('th', {
              class: ['vxe-header-column', {
                [`col--${column.headerAlign}`]: column.headerAlign,
                'fixed--hidden': fixedHiddenColumn
              }],
              attrs: {
                colspan: column.colSpan,
                rowspan: column.rowSpan
              },
              key: columnIndex
            }, [
              h('div', {
                class: ['vxe-cell']
              }, column.renderHeader(h, { $table, column, columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn }))
            ]) : _e()
          }).concat([
            h('th', {
              class: ['col--gutter'],
              style: {
                width: `${scrollYWidth}px`
              },
              key: 'c_gutt'
            })
          ]))
        })),
        /**
         * 其他
         */
        h('div', {
          class: ['vxe-table--repair'],
          style: {
            width: tableWidth === null ? tableWidth : `${tableWidth}px`
          }
        })
      ])
    ])
  }
}
