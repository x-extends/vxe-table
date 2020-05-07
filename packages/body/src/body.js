import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools } from '../../tools'

const cellType = 'body'

// 处理选中位置
function handleLocation (obj, rows, columns, row, column) {
  const rowIndex = rows.indexOf(row)
  const columnIndex = columns.indexOf(column)
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

// 滚动、拖动过程中不需要触发
function isOperateMouse ($xetable) {
  // 在 v3.0 中废弃 optimization.delayHover
  return $xetable._isResize || ($xetable.lastScrollTime && Date.now() < $xetable.lastScrollTime + $xetable.delayHover)
}

/**
 * 渲染列
 */
function renderColumn (h, _vm, $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, columns, items) {
  const {
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
    tooltipOpts,
    mouseConfig,
    mouseOpts,
    editConfig,
    editOpts,
    editRules,
    validOpts,
    editStore,
    validStore
  } = $table
  // v2.0 废弃属性，保留兼容
  const allColumnOverflow = XEUtils.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow
  const { editRender, align, showOverflow, renderWidth, columnKey, className, treeNode } = column
  const { checked, selected, actived, copyed } = editStore
  const { enabled } = tooltipOpts
  const isMouseSelected = mouseConfig && mouseOpts.selected
  // 在 v3.0 中废弃 mouse-config.checked
  const isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked)
  const isKeyboardCut = keyboardConfig && keyboardConfig.isCut
  const fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX
  const cellOverflow = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
  const cellAlign = align || allAlign
  let showEllipsis = cellOverflow === 'ellipsis'
  const showTitle = cellOverflow === 'title'
  const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
  let hasEllipsis = showTitle || showTooltip || showEllipsis
  let isDirty
  const tdOns = {}
  const checkedLocat = {}
  const checkedTLocat = {}
  const copyedLocat = {}
  const hasValidError = validStore.row === row && validStore.column === column
  const hasDefaultTip = editRules && (validOpts.message === 'default' ? (height || tableData.length > 1) : validOpts.message === 'inline')
  const attrs = { 'data-colid': column.id }
  const triggerDblclick = (editRender && editConfig && editOpts.trigger === 'dblclick')
  const params = { $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, type: cellType, level: rowLevel, isHidden: fixedHiddenColumn, data: tableData, items }
  // 虚拟滚动不支持动态高度
  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true
  }
  // hover 进入事件
  if (showTitle || showTooltip || enabled || tableListeners['cell-mouseenter']) {
    tdOns.mouseenter = evnt => {
      if (isOperateMouse($table)) {
        return
      }
      if (showTitle) {
        DomTools.updateCellTitle(evnt, column)
      } else if (showTooltip || enabled) {
        // 如果配置了显示 tooltip
        $table.triggerTooltipEvent(evnt, params)
      }
      UtilTools.emitEvent($table, 'cell-mouseenter', [{ $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, type: cellType, isHidden: fixedHiddenColumn, level: rowLevel, data: tableData, items, cell: evnt.currentTarget, $event: evnt }, evnt])
    }
  }
  // hover 退出事件
  if (showTooltip || enabled || tableListeners['cell-mouseleave']) {
    tdOns.mouseleave = evnt => {
      if (isOperateMouse($table)) {
        return
      }
      if (showTooltip || enabled) {
        $table.handleTargetLeaveEvent()
      }
      UtilTools.emitEvent($table, 'cell-mouseleave', [{ $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, type: cellType, isHidden: fixedHiddenColumn, level: rowLevel, data: tableData, items, cell: evnt.currentTarget, $event: evnt }, evnt])
    }
  }
  // 按下事件处理
  if (checkboxOpts.range || isMouseSelected || isMouseChecked) {
    tdOns.mousedown = evnt => {
      $table.triggerCellMousedownEvent(evnt, params)
    }
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
      $table.triggerCellClickEvent(evnt, params)
    }
  }
  // 双击事件处理
  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = evnt => {
      $table.triggerCellDBLClickEvent(evnt, params)
    }
  }
  // 合并行或列
  if (spanMethod) {
    const { rowspan = 1, colspan = 1 } = spanMethod(params) || {}
    if (!rowspan || !colspan) {
      return null
    }
    if (rowspan > 1) {
      attrs.rowspan = rowspan
    }
    if (colspan > 1) {
      attrs.colspan = colspan
    }
  }
  // 如果编辑列开启显示状态
  if (!fixedHiddenColumn && editRender && editConfig && editOpts.showStatus) {
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
  const type = column.type === 'seq' || column.type === 'index' ? 'seq' : column.type
  return h('td', {
    class: ['vxe-body--column', column.id, {
      [`col--${cellAlign}`]: cellAlign,
      [`col--${type}`]: type,
      'col--last': $columnIndex === columns.length - 1,
      'col--tree-node': treeNode,
      'col--edit': !!editRender,
      'fixed--hidden': fixedHiddenColumn,
      'col--ellipsis': hasEllipsis,
      'col--actived': editConfig && editRender && (actived.row === row && (actived.column === column || editOpts.mode === 'row')),
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
      'col--valid-error': hasValidError,
      'col--current': currentColumn === column
    }, UtilTools.getClass(className, params), UtilTools.getClass(cellClassName, params)],
    key: columnKey || ($table.columnKey ? column.id : $columnIndex),
    attrs,
    style: cellStyle ? (XEUtils.isFunction(cellStyle) ? cellStyle(params) : cellStyle) : null,
    on: tdOns
  }, allColumnOverflow && fixedHiddenColumn && !spanMethod
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
      hasDefaultTip ? hasValidError ? h('div', {
        class: 'vxe-cell--valid',
        style: validStore.rule && validStore.rule.maxWidth ? {
          width: `${validStore.rule.maxWidth}px`
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
            $table.triggerCornerMousedownEvent({ $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, type: cellType, level: rowLevel, cell: evnt.target.parentNode }, evnt)
          }
        }
      }) : null
    ]))
}

function renderRows (h, _vm, $table, $seq, rowLevel, fixedType, tableData, tableColumn) {
  const {
    stripe,
    rowKey,
    highlightHoverRow,
    highlightCurrentRow,
    rowClassName,
    rowStyle,
    showOverflow: allColumnOverflow,
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
    expandColumn,
    getColumnIndex
  } = $table
  const rows = []
  tableData.forEach((row, $rowIndex) => {
    const trOn = {}
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
      trOn.mouseleave = () => {
        if (isOperateMouse($table)) {
          return
        }
        $table.hoverRow = null
      }
    }
    const rowid = UtilTools.getRowid($table, row, rowIndex)
    rows.push(
      h('tr', {
        class: ['vxe-body--row', {
          'row--stripe': stripe && ($table._getRowIndex(row) + 1) % 2 === 0,
          'row--current': highlightCurrentRow && row === currentRow,
          'row--hover': row === hoverRow,
          'is--new': editStore.insertList.indexOf(row) > -1,
          'row--radio': radioOpts.highlight && $table.selectRow === row,
          'row--cheched': checkboxOpts.highlight && $table.isCheckedByCheckboxRow(row)
        }, rowClassName ? XEUtils.isFunction(rowClassName) ? rowClassName({ $table, $seq, seq, rowid, fixed: fixedType, type: cellType, rowLevel, row, rowIndex, $rowIndex }) : rowClassName : ''],
        attrs: {
          'data-rowid': rowid
        },
        style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle({ $table, $seq, seq, rowid, fixed: fixedType, type: cellType, rowLevel, row, rowIndex, $rowIndex }) : rowStyle) : null,
        key: rowKey || treeConfig ? rowid : $rowIndex,
        on: trOn
      }, tableColumn.map((column, $columnIndex) => {
        const columnIndex = getColumnIndex(column)
        return renderColumn(h, _vm, $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, tableColumn, tableData)
      }))
    )
    // 如果行被展开了
    if (expandColumn && rowExpandeds.length && rowExpandeds.indexOf(row) > -1) {
      const expandColumnIndex = getColumnIndex(expandColumn)
      let cellStyle
      if (treeConfig) {
        cellStyle = {
          paddingLeft: `${(rowLevel * treeOpts.indent) + 30}px`
        }
      }
      const { showOverflow } = expandColumn
      const hasEllipsis = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
      rows.push(
        h('tr', {
          class: 'vxe-body--expanded-row',
          key: `expand_${rowid}`,
          style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle({ $table, $seq, seq, rowid, fixed: fixedType, type: cellType, rowLevel, row, rowIndex, $rowIndex, isExpanded: true }) : rowStyle) : null,
          on: trOn
        }, [
          h('td', {
            class: ['vxe-body--expanded-column', {
              'fixed--hidden': fixedType,
              'col--ellipsis': hasEllipsis
            }],
            attrs: {
              colspan: tableColumn.length
            }
          }, [
            h('div', {
              class: 'vxe-body--expanded-cell',
              style: cellStyle
            }, [
              expandColumn.renderData(h, { $table, seq, rowid, row, rowIndex, column: expandColumn, columnIndex: expandColumnIndex, fixed: fixedType, type: cellType, level: rowLevel })
            ])
          ])
        ])
      )
    }
    // 如果是树形表格
    if (treeConfig && treeExpandeds.length) {
      const rowChildren = row[treeOpts.children]
      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push(...renderRows(h, _vm, $table, $seq ? `${$seq}.${seq}` : `${seq}`, rowLevel + 1, fixedType, rowChildren, tableColumn))
      }
    }
  })
  return rows
}

/**
 * 同步滚动条
 * scroll 方式：可以使固定列与内容保持一致的滚动效果，实现相对麻烦
 * mousewheel 方式：对于同步滚动效果就略差了，左右滚动，内容跟随即可
 * css3 translate 方式：对于同步滚动效果会有产生卡顿感觉，虽然可以利用硬件加速，渲染性能略优，但失去table布局能力
 */
let scrollProcessTimeout
let updateLeftScrollingTimeput
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
    const { _e, $parent: $table, fixedColumn, fixedType } = this
    let {
      $scopedSlots,
      tId,
      maxHeight,
      height,
      parentHeight,
      tableData,
      tableColumn,
      headerHeight,
      showFooter,
      showOverflow: allShowOverflow,
      showAllOverflow: oldShowAllOverflow,
      spanMethod,
      footerHeight,
      tableHeight,
      tableWidth,
      overflowY,
      scrollbarHeight,
      scrollbarWidth,
      scrollXStore,
      scrollXLoad,
      scrollYLoad,
      scrollYStore,
      emptyRender,
      emptyOpts
    } = $table
    // v2.0 废弃属性，保留兼容
    const allColumnOverflow = XEUtils.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow
    let customHeight = 0
    const style = {}
    if (height) {
      customHeight = height === 'auto' ? parentHeight : ((DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : XEUtils.toNumber(height)) - $table.getExcludeHeight())
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
    if (fixedType && allColumnOverflow && !spanMethod) {
      tableColumn = fixedColumn
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    } else if (scrollXLoad) {
      if (fixedType && !spanMethod) {
        tableColumn = fixedColumn
      }
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    }
    const tableStyle = {
      width: tableWidth ? `${tableWidth}px` : tableWidth,
      marginTop: scrollYStore.topSpaceHeight ? `${scrollYStore.topSpaceHeight}px` : null,
      marginLeft: fixedType ? null : (scrollXStore.leftSpaceWidth ? `${scrollXStore.leftSpaceWidth}px` : null)
    }
    // 兼容火狐滚动条
    if (overflowY && fixedType && (DomTools.browse['-moz'] || DomTools.browse.safari)) {
      tableStyle.paddingRight = `${scrollbarWidth}px`
    }
    let emptyContent
    if ($scopedSlots.empty) {
      emptyContent = $scopedSlots.empty.call(this, { $table: this }, h)
    } else {
      const compConf = emptyRender ? VXETable.renderer.get(emptyOpts.name) : null
      if (compConf && compConf.renderEmpty) {
        emptyContent = compConf.renderEmpty.call(this, h, emptyOpts, { $table: this }, { $table: this })
      } else {
        emptyContent = GlobalConfig.i18n('vxe.table.emptyText')
      }
    }
    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'body--wrapper'],
      attrs: {
        'data-tid': tId
      },
      style
    }, [
      fixedType ? _e() : h('div', {
        class: 'vxe-body--x-space',
        style: {
          width: scrollXLoad ? `${$table.tableWidth}px` : ''
        }
      }),
      h('div', {
        class: 'vxe-body--y-space',
        style: {
          height: scrollYLoad ? `${scrollYStore.ySpaceHeight}px` : ''
        }
      }),
      h('table', {
        class: 'vxe-table--body',
        attrs: {
          'data-tid': tId,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        style: tableStyle
      }, [
        /**
         * 列宽
         */
        h('colgroup', tableColumn.map((column, $columnIndex) => {
          return h('col', {
            attrs: {
              name: column.id
            },
            style: {
              width: `${column.renderWidth}px`
            },
            key: $columnIndex
          })
        })),
        /**
         * 内容
         */
        h('tbody', renderRows(h, this, $table, '', 0, fixedType, tableData, tableColumn))
      ]),
      !fixedType ? h('div', {
        class: 'vxe-table--empty-block',
        style: {
          width: tableWidth ? `${tableWidth}px` : tableWidth
        }
      }, [
        h('div', {
          class: 'vxe-table--empty-content'
        }, emptyContent)
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
      const { $parent: $table, fixedType, lastScrollTop, lastScrollLeft } = this
      const { $refs, highlightHoverRow, scrollXLoad, scrollYLoad, triggerScrollXEvent, triggerScrollYEvent } = $table
      const { tableHeader, tableBody, leftBody, rightBody, tableFooter } = $refs
      const headerElem = tableHeader ? tableHeader.$el : null
      const footerElem = tableFooter ? tableFooter.$el : null
      const bodyElem = tableBody.$el
      const leftElem = leftBody ? leftBody.$el : null
      const rightElem = rightBody ? rightBody.$el : null
      let scrollTop = bodyElem.scrollTop
      const scrollLeft = bodyElem.scrollLeft
      const isX = lastScrollLeft !== scrollLeft
      const isY = lastScrollTop !== scrollTop
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
      UtilTools.emitEvent($table, 'scroll', [{ type: cellType, fixed: fixedType, scrollTop, scrollLeft, isX, isY, $table, $event: evnt }, evnt])
    }
  }
}
