import XEUtils from 'xe-utils'
import DomTools from '../../../tools/dom'

// 处理选中位置
function handleLocation (obj, rows, columns, row, column) {
  let rowIndex = rows.indexOf(row)
  let columnIndex = columns.indexOf(column)
  obj.active = rowIndex > -1 && columnIndex > -1
  obj.top = rowIndex === 0 && columnIndex > -1
  obj.bottom = rowIndex === rows.length - 1 && columnIndex > -1
  obj.left = rowIndex > -1 && columnIndex === 0
  obj.right = rowIndex > -1 && columnIndex === columns.length - 1
}

/**
 * 渲染列
 */
function renderColumn (h, _vm, $table, fixedType, row, rowIndex, column, columnIndex) {
  let { $listeners: tableListeners, tableData, scrollXLoad, scrollYLoad, border, highlightCurrentRow, showAllOverflow, cellClassName, spanMethod, keyboardConfig, mouseConfig, editConfig, editStore, validStore } = $table
  let { editRender, align, showOverflow, renderWidth, columnKey } = column
  let { checked, selected, actived, copyed } = editStore
  let isMouseSelected = mouseConfig && mouseConfig.selected
  let isMouseChecked = mouseConfig && mouseConfig.checked
  let isKeyboardCut = keyboardConfig && keyboardConfig.isCut
  let fixedHiddenColumn = fixedType && column.fixed !== fixedType
  let showEllipsis = (showOverflow || showAllOverflow) === 'ellipsis'
  let showTitle = (showOverflow || showAllOverflow) === 'title'
  let showTooltip = showOverflow === true || showOverflow === 'tooltip' || showAllOverflow === true || showAllOverflow === 'tooltip'
  let attrs, isDirty
  let tdOns = {}
  let checkedLocat = {}
  let checkedTLocat = {}
  let copyedLocat = {}
  let triggerDblclick = (editRender && editConfig && editConfig.trigger === 'dblclick')
  // 滚动的渲染不支持动态行高
  if ((scrollXLoad || scrollYLoad) && !(showTitle || showTooltip || showEllipsis)) {
    showEllipsis = true
  }
  // 优化事件绑定
  if (showTooltip) {
    tdOns.mouseover = evnt => {
      $table.triggerTooltipEvent(evnt, { $table, row, rowIndex, column, columnIndex, fixed: fixedType })
    }
    tdOns.mouseout = $table.clostTooltip
  }
  tdOns.mousedown = evnt => {
    $table.triggerCellMousedownEvent(evnt, { $table, row, rowIndex, column, columnIndex, fixed: fixedType, cell: evnt.currentTarget })
  }
  if ((editRender && editConfig && editConfig.trigger !== 'manual') || highlightCurrentRow || tableListeners['cell-click']) {
    tdOns.click = evnt => {
      $table.triggerCellClickEvent(evnt, { $table, row, rowIndex, column, columnIndex, fixed: fixedType, cell: evnt.currentTarget })
    }
  }
  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = evnt => {
      $table.triggerCellDBLClickEvent(evnt, { $table, row, rowIndex, column, columnIndex, fixed: fixedType, cell: evnt.currentTarget })
    }
  }
  // 合并行或列
  if (spanMethod) {
    let { rowspan = 1, colspan = 1 } = spanMethod({ $table, row, rowIndex, column, columnIndex, fixed: fixedType, data: tableData }) || {}
    if (!rowspan || !colspan) {
      return null
    }
    attrs = { rowspan, colspan }
  }
  // 如果显示状态
  if (editConfig && editConfig.showStatus) {
    isDirty = $table.hasRowChange(row, column.property)
  }
  // 批量选中处理
  if (!fixedType) {
    if (isMouseChecked) {
      handleLocation(checkedLocat, checked.rows, checked.columns, row, column)
      handleLocation(checkedTLocat, checked.tRows, checked.tColumns, row, column)
    }
    if (isKeyboardCut) {
      handleLocation(copyedLocat, copyed.rows, copyed.columns, row, column)
    }
  }
  return h('td', {
    class: ['vxe-body--column', column.id, {
      [`col--${align}`]: align,
      'col--edit': editRender,
      'col--checked': checkedLocat.active,
      'col--checked-top': checkedLocat.top,
      'col--checked-bottom': checkedLocat.bottom,
      'col--checked-left': checkedLocat.left,
      'col--checked-right': checkedLocat.right,
      'col--checked-temp': checkedTLocat.active,
      'col--checked-temp-top': checkedTLocat.top,
      'col--checked-temp-bottom': checkedTLocat.bottom,
      'col--checked-temp-left': checkedTLocat.left,
      'col--checked-temp-right': checkedTLocat.right,
      'col--selected': isMouseSelected && editRender && selected.row === row && selected.column === column,
      'col--copyed': copyedLocat.active,
      'col--copyed-top': copyedLocat.top,
      'col--copyed-bottom': copyedLocat.bottom,
      'col--copyed-left': copyedLocat.left,
      'col--copyed-right': copyedLocat.right,
      'col--actived': editRender && actived.row === row && actived.column === column,
      'col--dirty': isDirty,
      'col--valid-error': validStore.row === row && validStore.column === column,
      'edit--visible': editRender && editRender.type === 'visible',
      'fixed--hidden': fixedHiddenColumn
    }, cellClassName ? XEUtils.isFunction(cellClassName) ? cellClassName({ $table, row, rowIndex, column, columnIndex, fixed: fixedType }) : cellClassName : ''],
    key: columnKey || columnIndex,
    attrs,
    on: tdOns
  }, !fixedType && fixedHiddenColumn ? [] : [
    h('div', {
      class: ['vxe-cell', {
        'c--title': showTitle,
        'c--tooltip': showTooltip,
        'c--ellipsis': showEllipsis
      }],
      attrs: {
        title: showTitle ? XEUtils.get(row, column.property) : null
      },
      style: {
        width: showTitle || showTooltip || showEllipsis ? `${border ? renderWidth - 1 : renderWidth}px` : null
      }
    }, column.renderCell(h, { $table, row, rowIndex, column, columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn })),
    isMouseChecked && !fixedType ? h('span', {
      class: 'vxe-body--column-checked-lt'
    }) : null,
    isMouseChecked && !fixedType ? h('span', {
      class: 'vxe-body--column-checked-rb'
    }) : null,
    isKeyboardCut && !fixedType ? h('span', {
      class: 'vxe-body--column-copyed-lt'
    }) : null,
    isKeyboardCut && !fixedType ? h('span', {
      class: 'vxe-body--column-copyed-rb'
    }) : null,
    checkedLocat.bottom && checkedLocat.right ? h('span', {
      class: 'vxe-body--column-checked-corner',
      on: {
        mousedown (evnt) {
          $table.triggerCornerMousedownEvent({ $table, row, rowIndex, column, columnIndex, fixed: fixedType, cell: evnt.target.parentNode }, evnt)
        }
      }
    }) : null
  ])
}

function renderRows (h, _vm, $table, fixedType, tableColumn) {
  let { highlightHoverRow, id, rowKey, rowClassName, tableData, selectRow, hoverRow, scrollYLoad, overflowX, columnStore, scrollYStore, expandeds } = $table
  let { leftList, rightList } = columnStore
  let rows = []
  tableData.forEach((row, rowIndex) => {
    // 优化事件绑定
    let on = null
    if (scrollYLoad) {
      rowIndex += scrollYStore.startIndex
    }
    if (highlightHoverRow && (leftList.length || rightList.length) && overflowX) {
      on = {
        mouseover (evnt) {
          if (row !== hoverRow) {
            $table.triggerHoverEvent(evnt, { row, rowIndex })
          }
        }
      }
    }
    rows.push(
      h('tr', {
        class: ['vxe-body--row', `row--${id}_${rowIndex}`, {
          'row--selected': row === selectRow,
          'row--hover': row === hoverRow
        }, rowClassName ? XEUtils.isFunction(rowClassName) ? rowClassName({ $table, row, rowIndex }) : rowClassName : ''],
        key: rowKey ? XEUtils.get(row, rowKey) : rowIndex,
        on
      }, tableColumn.map((column, columnIndex) => {
        return renderColumn(h, _vm, $table, fixedType, row, rowIndex, column, columnIndex)
      }))
    )
    // 如果行被展开了
    if (expandeds.indexOf(row) > -1) {
      let columnIndex = XEUtils.findIndexOf(tableColumn, column => column.type === 'expand')
      let column = tableColumn[columnIndex]
      if (column) {
        rows.push(
          h('tr', {
            class: ['vxe-body--expanded-row'],
            key: `expand_${rowIndex}`,
            on
          }, [
            h('td', {
              class: ['vxe-body--expanded-column'],
              attrs: {
                colspan: tableColumn.length
              }
            }, [
              h('div', {
                class: ['vxe-body--expanded-cell']
              }, [
                column.renderData(h, { $table, row, rowIndex, column, columnIndex, fixed: fixedType })
              ])
            ])
          ])
        )
      }
    }
  })
  return rows
}

/**
 * 同步滚动条
 * scroll 方式：可以使固定列与内容保持一致的滚动效果，处理相对麻烦
 * mousewheel 方式：对于同步滚动效果就略差了，左右滚动，内容跟随即可
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
    }, 200)
  }
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
  mounted () {
    this.$el.onscroll = this.scrollEvent
    this.$el._onscroll = this.scrollEvent
  },
  destroyed () {
    this.$el._onscroll = null
    this.$el.onscroll = null
  },
  render (h) {
    let { $parent: $table, fixedColumn, fixedType } = this
    let { maxHeight, height, tableColumn, headerHeight, showFooter, showAllOverflow, footerHeight, tableHeight, tableWidth, scrollXStore, scrollXLoad, scrollYStore, scrollYLoad, scrollXHeight } = $table
    let customHeight = XEUtils.toNumber(height)
    let style = {}
    if (customHeight) {
      style.height = `${fixedType ? (customHeight ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollXHeight) : customHeight - headerHeight - footerHeight}px`
    } else if (maxHeight) {
      maxHeight = XEUtils.toNumber(maxHeight)
      style['max-height'] = `${fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollXHeight) : maxHeight - headerHeight}px`
    }
    // 如果是使用优化模式
    if (fixedType && showAllOverflow) {
      tableColumn = fixedColumn
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn
      }
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    }
    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'body--wrapper'],
      attrs: {
        fixed: fixedType
      },
      style
    }, [
      scrollYLoad ? h('div', {
        class: ['vxe-body--top-space'],
        style: {
          height: `${scrollYStore.topSpaceHeight}px`
        }
      }) : null,
      !fixedType && scrollXLoad ? h('div', {
        class: ['vxe-body--x-space'],
        style: {
          width: `${$table.tableWidth}px`
        }
      }) : null,
      h('table', {
        class: ['vxe-table--body'],
        attrs: {
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        style: {
          width: tableWidth === null ? tableWidth : `${tableWidth}px`,
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
        })),
        /**
         * 内容
         */
        h('tbody', renderRows(h, this, $table, fixedType, tableColumn))
      ]),
      scrollYLoad ? h('div', {
        class: ['vxe-body--bottom-space'],
        style: {
          height: `${scrollYStore.bottomSpaceHeight}px`
        }
      }) : null
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
      let { $refs, scrollXLoad, scrollYLoad, triggerScrollXEvent, triggerScrollYEvent } = $table
      let { tableHeader, tableBody, leftBody, rightBody } = $refs
      let headerElem = tableHeader ? tableHeader.$el : null
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
          updateLeftScrollingTimeput = setTimeout($table.checkScrolling, DomTools.browse.msie ? 300 : 20)
        }
        syncBodyScroll(bodyElem.scrollTop, leftElem, rightElem)
      }
      if (scrollXLoad) {
        triggerScrollXEvent(evnt)
      }
      if (scrollYLoad) {
        triggerScrollYEvent(evnt)
      }
    }
  }
}
