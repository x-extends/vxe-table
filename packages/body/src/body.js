import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

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
function renderColumn (h, _vm, $table, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex) {
  let {
    $listeners: tableListeners,
    tableData,
    overflowX,
    scrollXLoad,
    scrollYLoad,
    border,
    highlightCurrentRow,
    showOverflow: allShowOverflow,
    showAllOverflow: oldShowAllOverflow,
    cellClassName,
    spanMethod,
    keyboardConfig,
    treeConfig,
    mouseConfig,
    editConfig,
    editStore,
    validStore
  } = $table
  // v2.0 废弃属性，保留兼容
  let allColumnOverflow = XEUtils.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow
  let { editRender, align, showOverflow, renderWidth, columnKey } = column
  let { checked, selected, actived, copyed } = editStore
  let isMouseSelected = mouseConfig && mouseConfig.selected
  let isMouseChecked = mouseConfig && mouseConfig.checked
  let isKeyboardCut = keyboardConfig && keyboardConfig.isCut
  let fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX
  let showEllipsis = (showOverflow || allColumnOverflow) === 'ellipsis'
  let showTitle = (showOverflow || allColumnOverflow) === 'title'
  let showTooltip = showOverflow === true || showOverflow === 'tooltip' || allColumnOverflow === true || allColumnOverflow === 'tooltip'
  let hasEllipsis = showTitle || showTooltip || showEllipsis
  let attrs, isDirty
  let tdOns = {}
  let checkedLocat = {}
  let checkedTLocat = {}
  let copyedLocat = {}
  let triggerDblclick = (editRender && editConfig && editConfig.trigger === 'dblclick')
  let params = { $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, isHidden: fixedHiddenColumn, data: tableData }
  // 滚动的渲染不支持动态行高
  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true
  }
  // hover 进入事件
  if (showTooltip || tableListeners['cell-mouseenter']) {
    tdOns.mouseenter = evnt => {
      let evntParams = { $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.currentTarget }
      // 如果配置了显示 tooltip
      if (showTooltip) {
        $table.triggerTooltipEvent(evnt, evntParams)
      }
      UtilTools.emitEvent($table, 'cell-mouseenter', [evntParams, evnt])
    }
  }
  // hover 退出事件
  if (showTooltip || tableListeners['cell-mouseleave']) {
    tdOns.mouseleave = evnt => {
      $table.clostTooltip()
      UtilTools.emitEvent($table, 'cell-mouseleave', [{ $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.currentTarget }, evnt])
    }
  }
  // 按下事件处理
  tdOns.mousedown = evnt => {
    $table.triggerCellMousedownEvent(evnt, { $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.currentTarget })
  }
  // 点击事件处理
  if (highlightCurrentRow ||
    tableListeners['cell-click'] ||
    (editRender && editConfig) ||
    (treeConfig && (treeConfig.trigger === 'row' || (column.treeNode && treeConfig.trigger === 'cell')))) {
    tdOns.click = evnt => {
      $table.triggerCellClickEvent(evnt, { $table, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.currentTarget })
    }
  }
  // 双击事件处理
  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = evnt => {
      $table.triggerCellDBLClickEvent(evnt, { $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.currentTarget })
    }
  }
  // 合并行或列
  if (spanMethod) {
    let { rowspan = 1, colspan = 1 } = spanMethod(params) || {}
    if (!rowspan || !colspan) {
      return null
    }
    attrs = { rowspan, colspan }
  }
  // 如果显示状态
  if (!fixedHiddenColumn && editConfig && editConfig.showStatus) {
    isDirty = $table.hasRowChange(row, column.property)
  }
  // 批量选中处理
  if (!fixedHiddenColumn && !fixedType) {
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
    }, cellClassName ? XEUtils.isFunction(cellClassName) ? cellClassName(params) : cellClassName : ''],
    key: columnKey || columnIndex,
    attrs,
    on: tdOns
  }, allColumnOverflow && fixedHiddenColumn ? [] : [
    h('div', {
      class: ['vxe-cell', {
        'c--title': showTitle,
        'c--tooltip': showTooltip,
        'c--ellipsis': showEllipsis
      }],
      attrs: {
        title: showTitle ? UtilTools.getCellLabel(row, column, params) : null
      },
      style: {
        width: hasEllipsis ? `${border ? renderWidth - 1 : renderWidth}px` : null
      }
    }, column.renderCell(h, params)),
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
          $table.triggerCornerMousedownEvent({ $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.target.parentNode }, evnt)
        }
      }
    }) : null
  ])
}

function renderRows (h, _vm, $table, rowLevel, fixedType, tableData, tableColumn) {
  let {
    highlightHoverRow,
    rowClassName,
    selectRow,
    hoverRow,
    treeConfig,
    treeExpandeds,
    scrollYLoad,
    overflowX,
    columnStore,
    scrollYStore,
    editStore,
    expandeds,
    getRowMapIndex,
    getColumnMapIndex } = $table
  let { leftList, rightList } = columnStore
  let rows = []
  tableData.forEach((row, $rowIndex) => {
    let trOn = {}
    let rowIndex = $rowIndex
    let seq = rowIndex + 1
    if (scrollYLoad) {
      seq += scrollYStore.startIndex
    }
    // 确保任何情况下 rowIndex 都精准指向真实 data 索引
    rowIndex = getRowMapIndex(row)
    // 事件绑定
    if (highlightHoverRow && (leftList.length || rightList.length) && overflowX) {
      trOn.mouseenter = evnt => {
        if (row !== hoverRow) {
          $table.triggerHoverEvent(evnt, { row, rowIndex })
        }
      }
    }
    let rowId = UtilTools.getRowId($table, row, rowIndex)
    rows.push(
      h('tr', {
        class: ['vxe-body--row', {
          [`row--level-${rowLevel}`]: treeConfig,
          'row--selected': row === selectRow,
          'row--hover': row === hoverRow,
          'row--new': editStore.insertList.indexOf(row) > -1
        }, rowClassName ? XEUtils.isFunction(rowClassName) ? rowClassName({ $table, seq, row, rowIndex }) : rowClassName : ''],
        attrs: {
          'data-rowkey': rowId
        },
        key: rowId,
        on: trOn
      }, tableColumn.map((column, $columnIndex) => {
        let columnIndex = getColumnMapIndex(column)
        return renderColumn(h, _vm, $table, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex)
      }))
    )
    if (treeConfig && treeExpandeds.length) {
      // 如果是树形表格
      let rowChildren = row[treeConfig.children]
      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push.apply(rows, renderRows(h, _vm, $table, rowLevel + 1, fixedType, rowChildren, tableColumn))
      }
    } else if (expandeds.length) {
      // 如果行被展开了
      if (expandeds.indexOf(row) > -1) {
        let column = tableColumn.find(column => column.type === 'expand')
        let columnIndex = getColumnMapIndex(column)
        if (column) {
          rows.push(
            h('tr', {
              class: ['vxe-body--expanded-row'],
              key: `expand_${rowIndex}`,
              on: trOn
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
                  column.renderData(h, { $table, seq, row, rowIndex, column, columnIndex, fixed: fixedType, level: rowLevel })
                ])
              ])
            ])
          )
        }
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
    }, 100)
  }
}

export default {
  name: 'VxeTableBody',
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
  mounted () {
    this.$el.onscroll = this.scrollEvent
    this.$el._onscroll = this.scrollEvent
  },
  beforeDestroy () {
    this.$el._onscroll = null
    this.$el.onscroll = null
  },
  render (h) {
    let { $parent: $table, fixedColumn, fixedType } = this
    let {
      maxHeight,
      height,
      containerHeight,
      loading,
      tableData,
      tableColumn,
      headerHeight,
      showFooter,
      showOverflow: allShowOverflow,
      showAllOverflow: oldShowAllOverflow,
      footerHeight,
      tableHeight,
      tableWidth,
      scrollXStore,
      scrollXLoad,
      scrollYStore,
      scrollYLoad,
      scrollXHeight
    } = $table
    // v2.0 废弃属性，保留兼容
    let allColumnOverflow = XEUtils.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow
    let customHeight = height === 'auto' ? containerHeight : XEUtils.toNumber(height)
    let style = {}
    if (customHeight > 0) {
      style.height = `${fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollXHeight) : customHeight - headerHeight - footerHeight}px`
    } else if (maxHeight) {
      maxHeight = XEUtils.toNumber(maxHeight)
      style['max-height'] = `${fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollXHeight) : maxHeight - headerHeight}px`
    }
    // 如果是固定列与设置了超出隐藏
    if (fixedType && allColumnOverflow) {
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
        h('tbody', renderRows(h, this, $table, 0, fixedType, tableData, tableColumn))
      ]),
      !fixedType && !loading && !tableData.length ? h('div', {
        class: 'vxe-table--empty-block'
      }, [
        h('span', {
          class: 'vxe-table--empty-text'
        }, $table.$slots.empty || GlobalConfig.i18n('vxe.table.emptyText'))
      ]) : null,
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
      let scrollTop = bodyElem.scrollTop
      let scrollLeft = bodyElem.scrollLeft
      if (leftElem && fixedType === 'left') {
        scrollTop = leftElem.scrollTop
        syncBodyScroll(scrollTop, bodyElem, rightElem)
      } else if (rightElem && fixedType === 'right') {
        scrollTop = rightElem.scrollTop
        syncBodyScroll(scrollTop, bodyElem, leftElem)
      } else {
        if (headerElem) {
          headerElem.scrollLeft = bodyElem.scrollLeft
        }
        // 缓解 IE 卡顿
        if (leftElem || rightElem) {
          clearTimeout(updateLeftScrollingTimeput)
          updateLeftScrollingTimeput = setTimeout($table.checkScrolling, DomTools.browse.msie ? 200 : 20)
          syncBodyScroll(scrollTop, leftElem, rightElem)
        }
      }
      if (scrollXLoad) {
        triggerScrollXEvent(evnt)
      }
      if (scrollYLoad) {
        triggerScrollYEvent(evnt)
      }
      UtilTools.emitEvent($table, 'body-scroll', [{ fixed: fixedType, scrollTop, scrollLeft }, evnt])
    }
  }
}
