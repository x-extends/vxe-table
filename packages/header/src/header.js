import XEUtils from 'xe-utils'
import { UtilTools, DomTools } from '../../tools'

const getAllColumns = (columns) => {
  const result = []
  columns.forEach((column) => {
    if (column.visible) {
      if (column.children && column.children.length && column.children.some(column => column.visible)) {
        result.push(column)
        result.push.apply(result, getAllColumns(column.children))
      } else {
        result.push(column)
      }
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
    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      let colSpan = 0
      column.children.forEach((subColumn) => {
        if (subColumn.visible) {
          traverse(subColumn, column)
          colSpan += subColumn.colSpan
        }
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
    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      column.rowSpan = 1
    } else {
      column.rowSpan = maxLevel - column.level + 1
    }
    rows[column.level - 1].push(column)
  })

  return rows
}

export default {
  name: 'VxeTableHeader',
  props: {
    tableData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    collectColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String,
    isGroup: Boolean
  },
  data () {
    return {
      headerColumn: []
    }
  },
  watch: {
    tableColumn () {
      this.uploadColumn()
    }
  },
  created () {
    this.uploadColumn()
  },
  mounted () {
    let { $parent: $table, $el, $refs, fixedType } = this
    let { elemStore } = $table
    let prefix = `${fixedType || 'main'}-header-`
    elemStore[`${prefix}wrapper`] = $el
    elemStore[`${prefix}table`] = $refs.table
    elemStore[`${prefix}colgroup`] = $refs.colgroup
    elemStore[`${prefix}list`] = $refs.thead
    elemStore[`${prefix}x-space`] = $refs.xSpace
    elemStore[`${prefix}repair`] = $refs.repair
  },
  render (h) {
    let {
      _e,
      $parent: $table,
      fixedType,
      headerColumn,
      tableColumn,
      resizeMousedown,
      fixedColumn
    } = this
    let {
      $listeners: tableListeners,
      resizable,
      border,
      headerRowClassName,
      headerCellClassName,
      showHeaderOverflow: allColumnHeaderOverflow,
      highlightCurrentColumn,
      mouseConfig = {},
      scrollXLoad,
      getColumnMapIndex
    } = $table
    // 横向滚动渲染
    if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn
      }
    }
    return h('div', {
      class: ['vxe-table--header-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper']
    }, [
      fixedType ? _e() : h('div', {
        class: 'vxe-body--x-space',
        ref: 'xSpace'
      }),
      h('table', {
        class: 'vxe-table--header',
        attrs: {
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
        }).concat([
          h('col', {
            attrs: {
              name: 'col-gutter'
            }
          })
        ])),
        /**
         * 头部
         */
        h('thead', {
          ref: 'thead'
        }, headerColumn.map((cols, $rowIndex) => {
          return h('tr', {
            class: ['vxe-header--row', headerRowClassName ? XEUtils.isFunction(headerRowClassName) ? headerRowClassName({ $table, $rowIndex, fixed: fixedType }) : headerRowClassName : '']
          }, cols.map((column, $columnIndex) => {
            let {
              columnKey,
              showHeaderOverflow,
              headerAlign,
              own
            } = column
            let isColGroup = column.children && column.children.length
            let fixedHiddenColumn = fixedType && column.fixed !== fixedType && !isColGroup
            let headOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
            let showEllipsis = headOverflow === 'ellipsis'
            let showTitle = headOverflow === 'title'
            let showTooltip = headOverflow === true || headOverflow === 'tooltip'
            let hasEllipsis = showTitle || showTooltip || showEllipsis
            let thOns = {}
            // 确保任何情况下 columnIndex 都精准指向真实列索引
            let columnIndex = getColumnMapIndex(column)
            if (showTooltip) {
              thOns.mouseover = evnt => {
                // 拖动过程中不需要触发
                if ($table._isResize) {
                  return
                }
                $table.triggerHeaderTooltipEvent(evnt, { $table, column, columnIndex, $columnIndex, fixed: fixedType })
              }
              thOns.mouseout = evnt => {
                // 拖动过程中不需要触发
                if ($table._isResize) {
                  return
                }
                $table.clostTooltip()
              }
            }
            if (highlightCurrentColumn || tableListeners['header-cell-click'] || mouseConfig.checked) {
              thOns.click = evnt => $table.triggerHeaderCellClickEvent(evnt, { $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, cell: evnt.currentTarget })
            }
            if (tableListeners['header-cell-dblclick']) {
              thOns.dblclick = evnt => UtilTools.emitEvent($table, 'header-cell-dblclick', [{ $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, cell: evnt.currentTarget }, evnt])
            }
            // 按下事件处理
            if (mouseConfig.checked) {
              thOns.mousedown = evnt => $table.triggerHeaderCellMousedownEvent(evnt, { $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, cell: evnt.currentTarget })
            }
            return h('th', {
              class: ['vxe-header--column', column.id, {
                [`col--${headerAlign}`]: headerAlign,
                'col--index': column.type === 'index',
                'col--ellipsis': hasEllipsis,
                'fixed--hidden': fixedHiddenColumn,
                'filter--active': column.filters.some(item => item.checked)
              }, headerCellClassName ? XEUtils.isFunction(headerCellClassName) ? headerCellClassName({ $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType }) : headerCellClassName : ''],
              attrs: {
                'data-index': columnIndex,
                colspan: column.colSpan,
                rowspan: column.rowSpan
              },
              on: thOns,
              key: columnKey || (isColGroup ? column.id : columnIndex)
            }, [
              h('div', {
                class: ['vxe-cell', {
                  'c--title': showTitle,
                  'c--tooltip': showTooltip,
                  'c--ellipsis': showEllipsis
                }],
                attrs: {
                  title: showTitle ? (own.title || own.label) : null
                }
              }, column.renderHeader(h, { $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn })),
              /**
               * 列宽拖动
               * 固定列不允许拖动 -> 待解决 需要处理的逻辑复杂、涉及场景较大
               */
              !fixedType && !isColGroup && (XEUtils.isBoolean(column.resizable) ? column.resizable : resizable) ? h('div', {
                class: ['vxe-resizable', {
                  'is--line': !border
                }],
                on: {
                  mousedown: evnt => resizeMousedown(evnt, column)
                }
              }) : null
            ])
          }).concat([
            h('th', {
              class: 'col--gutter'
            })
          ]))
        }))
      ]),
      /**
       * 其他
       */
      h('div', {
        class: 'vxe-table--repair',
        ref: 'repair'
      })
    ])
  },
  methods: {
    uploadColumn () {
      this.headerColumn = this.isGroup ? convertToRows(this.collectColumn) : [this.$parent.scrollXLoad && this.fixedType ? this.fixedColumn : this.tableColumn]
    },
    resizeMousedown (evnt, column) {
      let { $parent: $table, $el } = this
      let targetElem = evnt.target
      let dragLeft = 0
      let tableBodyElem = $table.$refs.tableBody.$el
      let resizeBarElem = $table.$refs.resizeBar
      let pos = DomTools.getOffsetPos(targetElem, $el)
      let dragMinLeft = pos.left - targetElem.parentNode.clientWidth + targetElem.clientWidth + 36
      let dragPosLeft = pos.left + 6
      let dragClientX = evnt.clientX
      let domMousemove = document.onmousemove
      let domMouseup = document.onmouseup
      let updateEvent = function (evnt) {
        evnt.stopPropagation()
        evnt.preventDefault()
        let offsetX = evnt.clientX - dragClientX
        let left = dragPosLeft + offsetX
        dragLeft = left < dragMinLeft ? dragMinLeft : left
        resizeBarElem.style.left = `${dragLeft - tableBodyElem.scrollLeft}px`
      }
      $table._isResize = true
      DomTools.addClass($table.$el, 'c--resize')
      resizeBarElem.style.display = 'block'
      document.onmousemove = updateEvent
      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove
        document.onmouseup = domMouseup
        column.resizeWidth = column.renderWidth - (dragPosLeft - dragLeft)
        resizeBarElem.style.display = 'none'
        $table._isResize = false
        $table.analyColumnWidth()
        $table.recalculate()
        DomTools.removeClass($table.$el, 'c--resize')
      }
      updateEvent(evnt)
    }
  }
}
