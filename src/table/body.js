import XEUtils from 'xe-utils'
import HandleFunc from '../tool/handle.js'

/**
 * 渲染列
 */
function renderColumn (h, $table, fixedType, row, rowIndex, column, columnIndex) {
  let { $listeners: tableListeners, border, highlightCurrentRow } = $table
  let { align, ellipsis, showTitle, showTooltip, renderWidth } = column
  let fixedHiddenColumn = fixedType && column.fixed !== fixedType
  let tdClss = ['vxe-body--column']
  let cellClss = ['vxe-cell']
  let tdOns = {}
  if (align) {
    tdClss.push(`col--${align}`)
  }
  if (fixedHiddenColumn) {
    tdClss.push('fixed-hidden')
  }
  if (showTitle) {
    cellClss.push('c--title')
  } else if (showTooltip) {
    cellClss.push('c--tooltip')
  } else if (ellipsis) {
    cellClss.push('c--ellipsis')
  }
  // 事件监听
  if (highlightCurrentRow || tableListeners['cell-click']) {
    tdOns.click = evnt => {
      $table.colClickEvent(evnt, { row, rowIndex, column, columnIndex, cell: evnt.currentTarget })
    }
  }
  if (tableListeners['cell-dblclick']) {
    tdOns.dblclick = evnt => {
      $table.colDblclickEvent(evnt, { row, rowIndex, column, columnIndex, cell: evnt.currentTarget })
    }
  }
  return h('td', {
    class: tdClss,
    key: columnIndex,
    on: tdOns
  }, [
    h('div', {
      class: cellClss,
      attrs: {
        title: showTitle ? XEUtils.get(row, column.property) : null
      },
      style: {
        width: ellipsis || showTitle || showTooltip ? `${border ? renderWidth - 1 : renderWidth}px` : null
      }
    }, column.renderCell(h, { $table, row, rowIndex, column, columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn }))
  ])
}

/**
 * 同步滚动条
 */
var scrollProcessTimeout
var updateLeftScrollingTimeput
function syncBodyScroll (scrollTop, elem1, elem2) {
  if (elem1 || elem2) {
    if (elem1) {
      elem1.onscroll = null
      elem1.scrollTop = scrollTop
    }
    if (elem2) {
      elem2.onscroll = null
      elem2.scrollTop = scrollTop
    }
    clearTimeout(scrollProcessTimeout)
    scrollProcessTimeout = setTimeout(function () {
      if (elem1) {
        elem1.onscroll = elem1._onscroll
      }
      if (elem2) {
        elem2.onscroll = elem2._onscroll
      }
    }, 50)
  }
}

export default {
  props: {
    tableData: Array,
    tableColumn: Array,
    collectColumn: Array,
    fixedType: String,
    isGroup: Boolean
  },
  mounted () {
    this.$el.onscroll = this.scrollEvent
    this.$el._onscroll = this.scrollEvent
  },
  destroyed () {
    this.$el._onscroll = null
    this.$el.onscroll = null
  },
  render (h) {
    let { $parent: $table, fixedType } = this
    let { height, scrollXHeight } = $table
    let customHeight = isNaN(height) ? 0 : parseFloat(height)
    let wrappers = []
    let style = {}
    if (customHeight) {
      style.height = `${fixedType ? customHeight - scrollXHeight : customHeight}px`
    }
    wrappers.push(
      this.renderTable(h, $table, fixedType)
    )
    return h('div', {
      class: [fixedType ? `vxe-table--fixed-${fixedType}-body-wrapper` : 'vxe-table--body-wrapper'],
      attrs: {
        fixed: fixedType
      },
      style
    }, wrappers)
  },
  methods: {
    renderCols (h, $table, fixedType) {
      let cols = []
      this.tableColumn.forEach((column, columnIndex) => {
        if (column.visible) {
          cols.push(
            h('col', {
              attrs: {
                width: column.renderWidth
              }
            })
          )
        }
      })
      return cols
    },
    renderTable (h, $table, fixedType) {
      let { highlightHoverRow, rowKey, tableData, tableWidth, selectRow, hoverRow, columnStore } = $table
      let { leftList, rightList } = columnStore
      return h('table', {
        class: ['vxe-table--body'],
        attrs: {
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        style: {
          width: tableWidth === null ? tableWidth : `${tableWidth}px`
        }
      }, [
        h('colgroup', this.renderCols(h, $table, fixedType)),
        h('tbody', tableData.map((row, rowIndex) => {
          let renderRows = []
          this.tableColumn.forEach((column, columnIndex) => {
            if (column.visible) {
              renderRows.push(renderColumn(h, $table, fixedType, row, rowIndex, column, columnIndex))
            }
          })
          let on = null
          if (highlightHoverRow && (leftList.length || rightList.length)) {
            on = {
              mouseover (evnt) {
                if (row !== hoverRow) {
                  $table.rowHoverEvent(evnt, { row, rowIndex })
                }
              }
            }
          }
          return h('tr', {
            class: ['vxe-body--row', {
              'row--selected': row === selectRow,
              'row--hover': row === hoverRow
            }],
            key: rowKey ? XEUtils.get(row, rowKey) : rowIndex,
            on
          }, renderRows)
        }))
      ])
    },
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent (evnt) {
      let { $parent: $table, fixedType } = this
      let { tableHeader, tableBody, leftBody, rightBody } = $table.$refs
      let headerElem = tableHeader.$el
      let bodyElem = tableBody.$el
      let leftElem = leftBody ? leftBody.$el : null
      let rightElem = rightBody ? rightBody.$el : null
      if (fixedType === 'left') {
        syncBodyScroll(leftElem.scrollTop, bodyElem, rightElem)
      } else if (fixedType === 'right') {
        syncBodyScroll(rightElem.scrollTop, bodyElem, leftElem)
      } else {
        if (headerElem) {
          headerElem.scrollLeft = bodyElem.scrollLeft
        }
        // 避免 IE 卡顿
        if (leftElem || rightElem) {
          clearTimeout(updateLeftScrollingTimeput)
          updateLeftScrollingTimeput = setTimeout($table.checkScrolling, HandleFunc.browse.msie ? 300 : 20)
        }
        syncBodyScroll(bodyElem.scrollTop, leftElem, rightElem)
      }
    }
  }
}
