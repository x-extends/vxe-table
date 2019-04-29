import XEUtils from 'xe-utils'
import Tools from '../../../src/tools'

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
    let { _e, $parent: $table, fixedType, headerColumn, tableColumn, resizeMousedown } = this
    let { border, headerRowClassName, headerCellClassName, tableWidth, scrollYWidth } = $table
    return h('div', {
      class: ['vxe-table--header-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'body--wrapper']
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
              name: column.id,
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
        h('thead', headerColumn.map((cols, rowIndex) => {
          return h('tr', {
            class: ['vxe-header-row', headerRowClassName ? XEUtils.isFunction(headerRowClassName) ? headerRowClassName({ rowIndex }) : headerRowClassName : '']
          }, cols.map((column, columnIndex, list) => {
            let isGroup = column.children && column.children.length
            let fixedHiddenColumn = fixedType && column.fixed !== fixedType && !isGroup
            return column.visible ? h('th', {
              class: ['vxe-header-column', column.id, {
                [`col--${column.headerAlign}`]: column.headerAlign,
                'fixed--hidden': fixedHiddenColumn,
                'filter--active': column.filters.some(item => item.checked)
              }, headerCellClassName ? XEUtils.isFunction(headerCellClassName) ? headerCellClassName({ rowIndex, column, columnIndex }) : headerCellClassName : ''],
              attrs: {
                colspan: column.colSpan,
                rowspan: column.rowSpan
              },
              key: columnIndex
            }, [
              h('div', {
                class: ['vxe-cell']
              }, column.renderHeader(h, { $table, column, columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn })),
              border && !fixedType && !isGroup ? h('div', {
                class: ['vxe-resize'],
                on: {
                  mousedown: evnt => {
                    resizeMousedown(evnt, column)
                  }
                }
              }) : _e()
            ]) : _e()
          }).concat([
            h('th', {
              class: ['col--gutter'],
              style: {
                width: `${scrollYWidth}px`
              }
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
  },
  methods: {
    resizeMousedown (evnt, column) {
      let { $parent: $table, $el } = this
      let targetElem = evnt.target
      let dragLeft = 0
      let resizeBarElem = $table.$refs.resizeBar
      let pos = Tools.getOffsetPos(targetElem, $el)
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
