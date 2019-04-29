import XEUtils from 'xe-utils'
import Tools from '../../../src/tools'

/**
 * 渲染列
 */
function renderColumn (h, $table, fixedType, row, rowIndex, column, columnIndex) {
  let { $listeners: tableListeners, border, highlightCurrentRow, cellClassName, spanMethod, optimizeConfig } = $table
  let { align, ellipsis, showTitle, showTooltip, renderWidth, columnKey } = column
  let { overflow } = optimizeConfig
  let fixedHiddenColumn = fixedType && column.fixed !== fixedType
  let isShowTitle = showTitle || overflow === 'title'
  let isShowTooltip = showTooltip || overflow === 'tooltip'
  let isEllipsis = ellipsis || overflow === 'ellipsis'
  let tdOns = {}
  let attrs = null
  // 优化事件绑定
  if (highlightCurrentRow || tableListeners['cell-click']) {
    tdOns.click = evnt => {
      $table.triggerCellClickEvent(evnt, { row, rowIndex, column, columnIndex, cell: evnt.currentTarget })
    }
  }
  if (tableListeners['cell-dblclick']) {
    tdOns.dblclick = evnt => {
      $table.triggerCellDBLClickEvent(evnt, { row, rowIndex, column, columnIndex, cell: evnt.currentTarget })
    }
  }
  // 合并行或列
  if (spanMethod) {
    let { rowspan = 1, colspan = 1 } = spanMethod({ row, rowIndex, column, columnIndex }) || {}
    if (!rowspan || !colspan) {
      return null
    }
    attrs = { rowspan, colspan }
  }
  return h('td', {
    class: ['vxe-body--column', column.id, {
      [`col--${align}`]: align,
      'fixed--hidden': fixedHiddenColumn
    }, cellClassName ? XEUtils.isFunction(cellClassName) ? cellClassName({ row, rowIndex, column, columnIndex }) : cellClassName : ''],
    key: columnKey || columnIndex,
    attrs,
    on: tdOns
  }, !fixedType && fixedHiddenColumn ? [] : [
    h('div', {
      class: ['vxe-cell', {
        'c--title': isShowTitle,
        'c--tooltip': isShowTooltip,
        'c--ellipsis': isEllipsis
      }],
      attrs: {
        title: showTitle ? XEUtils.get(row, column.property) : null
      },
      style: {
        width: isShowTitle || isShowTooltip || isEllipsis ? `${border ? renderWidth - 1 : renderWidth}px` : null
      }
    }, column.renderCell(h, { $table, row, rowIndex, column, columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn }))
  ])
}

/**
 * 同步滚动条
 * scroll 方式：可以使固定列与内容保持一致的滚动效果，处理相对复杂
 * mousewheel 方式：对于同步滚动效果就略差了
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
    }, 300)
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
    let { _e, $parent: $table, fixedType } = this
    let { highlightHoverRow, rowKey, maxHeight, height, rowClassName, tableData, tableColumn, tableHeight, tableWidth, scrollXHeight, selectRow, hoverRow, overflowX, columnStore, optimizeConfig } = $table
    let { leftList, rightList } = columnStore
    let { overflow } = optimizeConfig
    let customHeight = XEUtils.toNumber(height)
    let style = {}
    if (customHeight) {
      style.height = `${fixedType ? (customHeight || tableHeight) - scrollXHeight : customHeight}px`
    } else if (maxHeight) {
      style['max-height'] = `${XEUtils.toNumber(maxHeight)}px`
    }
    // 如果是使用优化模式
    if (fixedType && overflow) {
      tableColumn = tableColumn.filter(column => column.fixed === fixedType)
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    }
    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'body--wrapper'],
      attrs: {
        fixed: fixedType
      },
      style
    }, [
      h('table', {
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
        /**
         * 列宽
         */
        h('colgroup', tableColumn.map((column, columnIndex) => {
          return column.visible ? h('col', {
            attrs: {
              name: column.id,
              width: column.renderWidth
            },
            key: columnIndex
          }) : _e()
        })),
        /**
         * 内容
         */
        h('tbody', tableData.map((row, rowIndex) => {
          // 优化事件绑定
          let on = null
          if (highlightHoverRow && (leftList.length || rightList.length) && overflowX) {
            on = {
              mouseover (evnt) {
                if (row !== hoverRow) {
                  $table.triggerHoverEvent(evnt, { row, rowIndex })
                }
              }
            }
          }
          return h('tr', {
            class: ['vxe-body--row', {
              'row--selected': row === selectRow,
              'row--hover': row === hoverRow
            }, rowClassName ? XEUtils.isFunction(rowClassName) ? rowClassName({ row, rowIndex }) : rowClassName : ''],
            key: rowKey ? XEUtils.get(row, rowKey) : rowIndex,
            on
          }, tableColumn.map((column, columnIndex) => {
            return column.visible ? renderColumn(h, $table, fixedType, row, rowIndex, column, columnIndex) : _e()
          }))
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
          updateLeftScrollingTimeput = setTimeout($table.checkScrolling, Tools.browse.msie ? 300 : 20)
        }
        syncBodyScroll(bodyElem.scrollTop, leftElem, rightElem)
      }
    }
  }
}
