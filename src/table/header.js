const getAllColumns = (columns) => {
  const result = []
  columns.forEach((column) => {
    if (column.children) {
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
    if (column.children) {
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
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1
    } else {
      column.rowSpan = 1
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
    let { $parent: $table, fixedType, headerColumn } = this
    let { tableWidth, scrollYWidth } = $table
    let renderCols = []
    this.tableColumn.forEach((column, columnIndex) => {
      if (column.visible) {
        renderCols.push(
          h('col', {
            attrs: {
              width: column.renderWidth
            }
          })
        )
      }
    })
    renderCols.push(
      h('col', {
        attrs: {
          width: scrollYWidth
        }
      })
    )
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
        h('colgroup', renderCols),
        h('thead', headerColumn.map(cols => {
          let renderRows = []
          cols.forEach((column, columnIndex) => {
            let thClss = ['vxe-header-column']
            let fixedHiddenColumn = fixedType && column.fixed !== fixedType && column.type !== 'group'
            if (column.headerAlign) {
              thClss.push(`align--${column.headerAlign}`)
            }
            if (fixedHiddenColumn) {
              thClss.push('fixed-hidden')
            }
            if (column.visible) {
              renderRows.push(
                h('th', {
                  class: thClss,
                  attrs: {
                    colspan: column.colSpan,
                    rowspan: column.rowSpan
                  },
                  key: columnIndex
                }, [
                  h('div', {
                    class: ['vxe-cell']
                  }, column.renderHeader(h, { $table, column, columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn }))
                ])
              )
            }
          })
          renderRows.push(
            h('th', {
              class: ['col--gutter'],
              style: {
                width: `${scrollYWidth}px`
              }
            })
          )
          return h('tr', {
            class: ['vxe-header-row']
          }, renderRows)
        })),
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
