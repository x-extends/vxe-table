import XEUtils from 'xe-utils'
import DomTools from '../../../src/tools/dom'

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
    visibleColumn: Array,
    collectColumn: Array,
    fixedColumn: Array,
    fixedType: String,
    isGroup: Boolean
  },
  computed: {
    headerColumn () {
      return this.isGroup ? convertToRows(this.collectColumn) : [this.$parent.scrollXLoad && this.fixedType ? this.fixedColumn : this.tableColumn]
    }
  },
  render (h) {
    let { $parent: $table, fixedType, headerColumn, tableColumn, resizeMousedown, fixedColumn } = this
    let { resizable, border, headerRowClassName, headerCellClassName, tableWidth, scrollXLoad, scrollXStore, scrollYWidth } = $table
    // 如果是使用优化模式
    if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn
      }
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    }
    return h('div', {
      class: ['vxe-table--header-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'body--wrapper']
    }, [
      !fixedType && scrollXLoad ? h('div', {
        class: ['vxe-body--x-space'],
        style: {
          width: `${$table.tableWidth + scrollYWidth}px`
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
            },
            key: columnIndex
          })
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
        h('thead', headerColumn.map((cols, rowIndex) => {
          return h('tr', {
            class: ['vxe-header--row', headerRowClassName ? XEUtils.isFunction(headerRowClassName) ? headerRowClassName({ $table, rowIndex }) : headerRowClassName : '']
          }, cols.map((column, columnIndex, list) => {
            let isGroup = column.children && column.children.length
            let fixedHiddenColumn = fixedType && column.fixed !== fixedType && !isGroup
            return h('th', {
              class: ['vxe-header--column', column.id, {
                [`col--${column.headerAlign}`]: column.headerAlign,
                'fixed--hidden': fixedHiddenColumn,
                'filter--active': column.filters.some(item => item.checked)
              }, headerCellClassName ? XEUtils.isFunction(headerCellClassName) ? headerCellClassName({ $table, rowIndex, column, columnIndex }) : headerCellClassName : ''],
              attrs: {
                colspan: column.colSpan,
                rowspan: column.rowSpan
              },
              key: column.columnKey || columnIndex
            }, [
              h('div', {
                class: ['vxe-cell']
              }, column.renderHeader(h, { $table, column, columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn })),
              border && resizable && !fixedType && !isGroup ? h('div', {
                class: ['vxe-resizable'],
                on: {
                  mousedown: evnt => {
                    resizeMousedown(evnt, column)
                  }
                }
              }) : null
            ])
          }).concat(scrollYWidth ? [
            h('th', {
              class: ['col--gutter'],
              style: {
                width: `${scrollYWidth}px`
              }
            })
          ] : []))
        }))
      ]),
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
  },
  methods: {
    resizeMousedown (evnt, column) {
      let { $parent: $table, $el } = this
      let targetElem = evnt.target
      let dragLeft = 0
      let resizeBarElem = $table.$refs.resizeBar
      let pos = DomTools.getOffsetPos(targetElem, $el)
      let dragMinLeft = pos.left - targetElem.parentNode.clientWidth + targetElem.clientWidth + 36
      let dragPosLeft = pos.left + 6
      let dragClientX = evnt.clientX
      let domMousemove = document.onmousemove
      let domMouseup = document.onmouseup
      let updateEvent = function (evnt) {
        evnt.preventDefault()
        let offsetX = evnt.clientX - dragClientX
        let left = dragPosLeft + offsetX
        dragLeft = left < dragMinLeft ? dragMinLeft : left
        resizeBarElem.style.left = `${dragLeft}px`
      }
      resizeBarElem.style.display = 'block'
      document.onmousemove = updateEvent
      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove
        document.onmouseup = domMouseup
        column.resizeWidth = column.renderWidth - (dragPosLeft - dragLeft)
        resizeBarElem.style.display = 'none'
        $table.analyColumnWidth()
        $table.computeWidth()
      }
      updateEvent(evnt)
    }
  }
}
