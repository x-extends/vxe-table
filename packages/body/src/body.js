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

function countTreeExpand (prevRow, params) {
  const $table = params.$table
  const rowChildren = prevRow[$table.treeOpts.children]
  let count = 1
  if ($table.isTreeExpandByRow(prevRow)) {
    for (let index = 0; index < rowChildren.length; index++) {
      count += countTreeExpand(rowChildren[index], params)
    }
  }
  return count
}

function getOffsetSize ($table) {
  switch ($table.vSize) {
    case 'mini':
      return 3
    case 'small':
      return 2
    case 'medium':
      return 1
  }
  return 0
}

function calcTreeLine (params, items) {
  const { $table, $rowIndex } = params
  let expandSize = 1
  if ($rowIndex) {
    expandSize = countTreeExpand(items[$rowIndex - 1], params)
  }
  return $table.rowHeight * expandSize - ($rowIndex ? 1 : (12 - getOffsetSize($table)))
}

// 滚动、拖动过程中不需要触发
function isOperateMouse ($table) {
  return $table._isResize || ($table.lastScrollTime && Date.now() < $table.lastScrollTime + $table.optimizeOpts.delayHover)
}

/**
 * 渲染列
 */
function renderColumn (h, _vm, $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, columns, items) {
  let {
    _e,
    $listeners: tableListeners,
    tableData,
    height,
    overflowX,
    scrollXLoad,
    scrollYLoad,
    cellOffsetWidth,
    highlightCurrentRow,
    showOverflow: allShowOverflow,
    showAllOverflow: oldShowAllOverflow,
    align: allAlign,
    currentColumn,
    cellClassName,
    cellStyle,
    spanMethod,
    keyboardConfig,
    expandOpts,
    radioOpts,
    checkboxOpts,
    treeOpts,
    mouseConfig,
    editConfig,
    editRules,
    validOpts,
    editStore,
    validStore
  } = $table
  // v2.0 废弃属性，保留兼容
  let allColumnOverflow = XEUtils.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow
  let { editRender, align, showOverflow, renderWidth, columnKey, className, treeNode } = column
  let { checked, selected, actived, copyed } = editStore
  let isMouseSelected = mouseConfig && mouseConfig.selected
  let isMouseChecked = mouseConfig && mouseConfig.checked
  let isKeyboardCut = keyboardConfig && keyboardConfig.isCut
  let fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX
  let cellOverflow = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
  let cellAlign = align || allAlign
  let showEllipsis = cellOverflow === 'ellipsis'
  let showTitle = cellOverflow === 'title'
  let showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
  let hasEllipsis = showTitle || showTooltip || showEllipsis
  let isDirty
  let tdOns = {}
  let checkedLocat = {}
  let checkedTLocat = {}
  let copyedLocat = {}
  let validError = validStore.row === row && validStore.column === column
  let hasDefaultTip = editRules && (validOpts.message === 'default' ? (height || tableData.length > 1) : validOpts.message === 'inline')
  let attrs = { 'data-colid': column.id }
  let triggerDblclick = (editRender && editConfig && editConfig.trigger === 'dblclick')
  let params = { $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, isHidden: fixedHiddenColumn, data: tableData, items }
  // 虚拟滚动不支持动态高度
  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true
  }
  // hover 进入事件
  if (showTitle || showTooltip || tableListeners['cell-mouseenter']) {
    tdOns.mouseenter = evnt => {
      if (isOperateMouse($table)) {
        return
      }
      let evntParams = { $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.currentTarget }
      if (showTitle) {
        DomTools.updateCellTitle(evnt)
      } else if (showTooltip) {
        // 如果配置了显示 tooltip
        $table.triggerTooltipEvent(evnt, evntParams)
      }
      UtilTools.emitEvent($table, 'cell-mouseenter', [evntParams, evnt])
    }
  }
  // hover 退出事件
  if (showTooltip || tableListeners['cell-mouseleave']) {
    tdOns.mouseleave = evnt => {
      if (isOperateMouse($table)) {
        return
      }
      if (showTooltip) {
        $table.handleTargetLeaveEvent()
      }
      UtilTools.emitEvent($table, 'cell-mouseleave', [{ $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.currentTarget }, evnt])
    }
  }
  // 按下事件处理
  tdOns.mousedown = evnt => {
    $table.triggerCellMousedownEvent(evnt, { $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.currentTarget })
  }
  // 点击事件处理
  if (highlightCurrentRow ||
    tableListeners['cell-click'] ||
    (editRender && editConfig) ||
    (expandOpts.trigger === 'row' || (expandOpts.trigger === 'cell')) ||
    (radioOpts.trigger === 'row' || (column.type === 'radio' && radioOpts.trigger === 'cell')) ||
    // 在 v3.0 中废弃 selection
    (checkboxOpts.trigger === 'row' || ((column.type === 'checkbox' | column.type === 'selection') && checkboxOpts.trigger === 'cell')) ||
    (treeOpts.trigger === 'row' || (column.treeNode && treeOpts.trigger === 'cell'))) {
    tdOns.click = evnt => {
      $table.triggerCellClickEvent(evnt, { $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.currentTarget })
    }
  }
  // 双击事件处理
  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = evnt => {
      $table.triggerCellDBLClickEvent(evnt, { $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.currentTarget })
    }
  }
  // 合并行或列
  if (spanMethod) {
    let { rowspan = 1, colspan = 1 } = spanMethod(params) || {}
    if (!rowspan || !colspan) {
      return null
    }
    attrs.rowspan = rowspan
    attrs.colspan = colspan
  }
  // 如果显示状态
  if (!fixedHiddenColumn && editConfig && editConfig.showStatus) {
    isDirty = $table.isUpdateByRow(row, column.property)
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
      [`col--${cellAlign}`]: cellAlign,
      [`col--${column.type}`]: column.type,
      'col--last': $columnIndex === columns.length - 1,
      'col--tree-node': treeNode,
      'col--edit': editRender,
      'edit--visible': editRender && editRender.type === 'visible',
      'fixed--hidden': fixedHiddenColumn,
      'col--ellipsis': hasEllipsis,
      'col--actived': editConfig && editRender && (actived.row === row && (actived.column === column || editConfig.mode === 'row')),
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
      'col--dirty': isDirty,
      'col--valid-error': validError,
      'col--current': currentColumn === column
    }, UtilTools.getClass(className, params), UtilTools.getClass(cellClassName, params)],
    key: columnKey || ($table.columnKey ? column.id : columnIndex),
    attrs,
    style: cellStyle ? (XEUtils.isFunction(cellStyle) ? cellStyle(params) : cellStyle) : null,
    on: tdOns
  }, allColumnOverflow && fixedHiddenColumn
    ? [
      h('div', {
        class: ['vxe-cell', {
          'c--title': showTitle,
          'c--tooltip': showTooltip,
          'c--ellipsis': showEllipsis
        }]
      })
    ]
    : renderLine(h, _vm, $table, rowLevel, items, params).concat([
      h('div', {
        class: ['vxe-cell', {
          'c--title': showTitle,
          'c--tooltip': showTooltip,
          'c--ellipsis': showEllipsis
        }],
        style: {
          width: hasEllipsis ? `${renderWidth - cellOffsetWidth}px` : null
        }
      }, column.renderCell(h, params)),
      hasDefaultTip ? validError ? h('div', {
        class: 'vxe-cell--valid',
        style: validStore.rule && validStore.rule.width ? {
          width: `${validStore.rule.width}px`
        } : null
      }, [
        h('span', {
          class: 'vxe-cell--valid-msg'
        }, validStore.content)
      ]) : _e() : null,
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
            $table.triggerCornerMousedownEvent({ $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.target.parentNode }, evnt)
          }
        }
      }) : null
    ]))
}

function renderLine (h, _vm, $table, rowLevel, items, params) {
  const column = params.column
  const { treeConfig, treeOpts } = $table
  return column.slots && column.slots.line
    ? column.slots.line.call($table, params, h)
    : column.treeNode && treeConfig && treeOpts.line ? [
      h('div', {
        class: 'vxe-tree--line-wrapper'
      }, [
        h('div', {
          class: 'vxe-tree--line',
          style: {
            height: `${calcTreeLine(params, items)}px`,
            left: `${(rowLevel * treeOpts.indent) + (rowLevel ? 2 - getOffsetSize($table) : 0) + 16}px`
          }
        })
      ])
    ] : []
}

function renderRows (h, _vm, $table, $seq, rowLevel, fixedType, tableData, tableColumn) {
  let {
    stripe,
    rowKey,
    highlightHoverRow,
    highlightCurrentRow,
    rowClassName,
    rowStyle,
    currentRow,
    hoverRow,
    treeConfig,
    treeOpts,
    treeExpandeds,
    scrollYLoad,
    scrollYStore,
    editStore,
    rowExpandeds,
    radioOpts,
    checkboxOpts,
    getColumnMapIndex
  } = $table
  let rows = []
  tableData.forEach((row, $rowIndex) => {
    let trOn = {}
    let rowIndex = $rowIndex
    let seq = rowIndex + 1
    if (scrollYLoad) {
      seq += scrollYStore.startIndex
    }
    // 确保任何情况下 rowIndex 都精准指向真实 data 索引
    rowIndex = $table.getRowIndex(row)
    // 事件绑定
    if (highlightHoverRow) {
      trOn.mouseenter = evnt => {
        if (isOperateMouse($table)) {
          return
        }
        if (row !== hoverRow) {
          $table.triggerHoverEvent(evnt, { row, rowIndex })
        }
      }
      trOn.mouseleave = evnt => {
        if (isOperateMouse($table)) {
          return
        }
        $table.hoverRow = null
      }
    }
    let rowid = UtilTools.getRowid($table, row, rowIndex)
    rows.push(
      h('tr', {
        class: ['vxe-body--row', {
          'row--stripe': stripe && rowIndex > 0 && (rowIndex + 1) % 2 === 0,
          [`row--level-${rowLevel}`]: treeConfig,
          'row--current': highlightCurrentRow && row === currentRow,
          'row--hover': row === hoverRow,
          'row--new': editStore.insertList.indexOf(row) > -1,
          'row--radio': radioOpts.highlight && $table.selectRow === row,
          'row--cheched': checkboxOpts.highlight && $table.isCheckedByRow(row)
        }, rowClassName ? XEUtils.isFunction(rowClassName) ? rowClassName({ $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex }) : rowClassName : ''],
        attrs: {
          'data-rowid': rowid
        },
        style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle({ $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex }) : rowStyle) : null,
        key: rowKey || treeConfig ? rowid : $rowIndex,
        on: trOn
      }, tableColumn.map((column, $columnIndex) => {
        let columnIndex = getColumnMapIndex(column)
        return renderColumn(h, _vm, $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, tableColumn, tableData)
      }))
    )
    // 如果行被展开了
    if (rowExpandeds.length && rowExpandeds.indexOf(row) > -1) {
      let column = XEUtils.find(tableColumn, column => column.type === 'expand')
      let columnIndex = getColumnMapIndex(column)
      let cellStyle
      if (treeConfig) {
        cellStyle = {
          paddingLeft: `${(rowLevel * treeOpts.indent) + 30}px`
        }
      }
      if (column) {
        rows.push(
          h('tr', {
            class: 'vxe-body--expanded-row',
            key: `expand_${rowid}`,
            style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle({ $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, isExpanded: true }) : rowStyle) : null,
            on: trOn
          }, [
            h('td', {
              class: 'vxe-body--expanded-column',
              attrs: {
                colspan: tableColumn.length
              }
            }, [
              h('div', {
                class: ['vxe-body--expanded-cell', {
                  'fixed--hidden': fixedType
                }],
                style: cellStyle
              }, [
                column.renderData(h, { $table, seq, rowid, row, rowIndex, column, columnIndex, fixed: fixedType, level: rowLevel })
              ])
            ])
          ])
        )
      }
    }
    // 如果是树形表格
    if (treeConfig && treeExpandeds.length) {
      let rowChildren = row[treeOpts.children]
      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push.apply(rows, renderRows(h, _vm, $table, $seq ? `${$seq}.${seq}` : `${seq}`, rowLevel + 1, fixedType, rowChildren, tableColumn))
      }
    }
  })
  return rows
}

/**
 * 同步滚动条
 * scroll 方式：可以使固定列与内容保持一致的滚动效果，处理相对麻烦
 * mousewheel 方式：对于同步滚动效果就略差了，左右滚动，内容跟随即可
 * css3 translate 方式：可以利用硬件加速，各方面较优，失去table布局能力
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
    let { _e, $parent: $table, fixedColumn, fixedType } = this
    let {
      $scopedSlots,
      loading,
      maxHeight,
      height,
      parentHeight,
      tableData,
      tableColumn,
      headerHeight,
      showFooter,
      showOverflow: allShowOverflow,
      showAllOverflow: oldShowAllOverflow,
      footerHeight,
      tableHeight,
      tableWidth,
      overflowY,
      scrollbarHeight,
      scrollbarWidth,
      scrollXStore,
      scrollXLoad,
      scrollYStore
    } = $table
    // v2.0 废弃属性，保留兼容
    let allColumnOverflow = XEUtils.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow
    let customHeight = 0
    let style = {}
    if (height) {
      customHeight = height === 'auto' ? parentHeight : (DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : XEUtils.toNumber(height))
      if (showFooter) {
        customHeight += scrollbarHeight + 1
      }
    }
    if (maxHeight) {
      maxHeight = maxHeight === 'auto' ? parentHeight : (DomTools.isScale(maxHeight) ? Math.floor(parseInt(maxHeight) / 100 * parentHeight) : XEUtils.toNumber(maxHeight))
      style.maxHeight = `${fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : maxHeight - headerHeight}px`
    } else {
      if (customHeight > 0) {
        style.height = `${fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight}px`
      }
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
    let tableStyle = {
      width: tableWidth ? `${tableWidth}px` : tableWidth,
      marginTop: scrollYStore.topSpaceHeight ? `${scrollYStore.topSpaceHeight}px` : null,
      marginLeft: fixedType ? null : (scrollXStore.leftSpaceWidth ? `${scrollXStore.leftSpaceWidth}px` : null)
    }
    // 兼容火狐滚动条
    if (overflowY && fixedType && (DomTools.browse['-moz'] || DomTools.browse['safari'])) {
      tableStyle.paddingRight = `${scrollbarWidth}px`
    }
    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'body--wrapper'],
      style
    }, [
      fixedType ? _e() : h('div', {
        class: 'vxe-body--x-space',
        style: {
          width: `${$table.tableWidth}px`
        }
      }),
      h('div', {
        class: 'vxe-body--y-space',
        style: {
          height: `${scrollYStore.ySpaceHeight}px`
        }
      }),
      h('table', {
        class: 'vxe-table--body',
        attrs: {
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        style: tableStyle
      }, [
        /**
         * 列宽
         */
        h('colgroup', tableColumn.map((column, columnIndex) => {
          return h('col', {
            attrs: {
              name: column.id
            },
            style: {
              width: `${column.renderWidth}px`
            },
            key: columnIndex
          })
        })),
        /**
         * 内容
         */
        h('tbody', renderRows(h, this, $table, '', 0, fixedType, tableData, tableColumn))
      ]),
      !fixedType ? h('div', {
        class: ['vxe-table--empty-block', loading || tableData.length ? '' : 'is--empty'],
        style: {
          width: tableWidth ? `${tableWidth}px` : tableWidth
        }
      }, [
        h('div', {
          class: 'vxe-table--empty-content'
        }, $scopedSlots.empty ? $scopedSlots.empty.call(this, { $table: this }, h) : GlobalConfig.i18n('vxe.table.emptyText'))
      ]) : null
    ])
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent (evnt) {
      let { $parent: $table, fixedType, lastScrollTop, lastScrollLeft } = this
      let { $refs, highlightHoverRow, scrollXLoad, scrollYLoad, triggerScrollXEvent, triggerScrollYEvent } = $table
      let { tableHeader, tableBody, leftBody, rightBody, tableFooter } = $refs
      let headerElem = tableHeader ? tableHeader.$el : null
      let footerElem = tableFooter ? tableFooter.$el : null
      let bodyElem = tableBody.$el
      let leftElem = leftBody ? leftBody.$el : null
      let rightElem = rightBody ? rightBody.$el : null
      let scrollTop = bodyElem.scrollTop
      let scrollLeft = bodyElem.scrollLeft
      let isX = lastScrollLeft !== scrollLeft
      let isY = lastScrollTop !== scrollTop
      if (highlightHoverRow) {
        $table.clearHoverRow()
      }
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
        if (footerElem) {
          footerElem.scrollLeft = bodyElem.scrollLeft
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
      $table.lastScrollTop = scrollTop
      $table.lastScrollLeft = scrollLeft
      $table.lastScrollTime = Date.now()
      UtilTools.emitEvent($table, 'scroll', [{ type: 'body', fixed: fixedType, scrollTop, scrollLeft, isX, isY, $table }, evnt])
    }
  }
}
