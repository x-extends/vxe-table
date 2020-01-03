import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

// 滚动、拖动过程中不需要触发
function isOperateMouse ($table) {
  return $table._isResize || ($table.lastScrollTime && Date.now() < $table.lastScrollTime + $table.optimizeOpts.delayHover)
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

function renderBorder (h, type) {
  return h('div', {
    class: `vxe-table-${type}ed-borders`,
    ref: `${type}Borders`
  }, [
    h('span', {
      class: 'vxe-table-border-top',
      ref: `${type}Top`
    }),
    h('span', {
      class: 'vxe-table-border-right',
      ref: `${type}Right`
    }),
    h('span', {
      class: 'vxe-table-border-bottom',
      ref: `${type}Bottom`
    }),
    h('span', {
      class: 'vxe-table-border-left',
      ref: `${type}Left`
    })
  ])
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
    columnKey,
    overflowX,
    scrollXLoad,
    scrollYLoad,
    highlightCurrentRow,
    showOverflow: allColumnOverflow,
    align: allAlign,
    cellClassName,
    cellStyle,
    spanMethod,
    radioOpts,
    checkboxOpts,
    expandOpts,
    treeOpts,
    mouseConfig,
    mouseOpts,
    editConfig,
    editOpts,
    editRules,
    validOpts,
    editStore,
    validStore
  } = $table
  let { editRender, align, showOverflow, className, treeNode } = column
  let { actived } = editStore
  let isMouseSelected = mouseConfig && mouseOpts.selected
  let isMouseChecked = mouseConfig && mouseOpts.checked
  let fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX
  let cellOverflow = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
  let showEllipsis = cellOverflow === 'ellipsis'
  let showTitle = cellOverflow === 'title'
  let showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
  let hasEllipsis = showTitle || showTooltip || showEllipsis
  let isDirty
  let tdOns = {}
  let cellAlign = align || allAlign
  let validError = validStore.row === row && validStore.column === column
  let hasDefaultTip = editRules && (validOpts.message === 'default' ? (height || tableData.length > 1) : validOpts.message === 'inline')
  let attrs = { 'data-colid': column.id }
  let triggerDblclick = (editRender && editConfig && editOpts.trigger === 'dblclick')
  let params = { $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, data: tableData, items }
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
      let evntParams = { $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, cell: evnt.currentTarget }
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
        $table.handleTargetLeaveEvent(evnt)
      }
      UtilTools.emitEvent($table, 'cell-mouseleave', [{ $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, cell: evnt.currentTarget }, evnt])
    }
  }
  // 按下事件处理
  if (checkboxOpts.range || isMouseChecked || isMouseSelected) {
    tdOns.mousedown = evnt => {
      $table.triggerCellMousedownEvent(evnt, { $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, cell: evnt.currentTarget })
    }
  }
  // 点击事件处理
  if (highlightCurrentRow ||
    tableListeners['cell-click'] ||
    isMouseChecked ||
    (editRender && editConfig) ||
    (expandOpts.trigger === 'row' || (expandOpts.trigger === 'cell')) ||
    (radioOpts.trigger === 'row' || (column.type === 'radio' && radioOpts.trigger === 'cell')) ||
    // 在 v3.0 中废弃 type=selection
    (checkboxOpts.trigger === 'row' || ((column.type === 'checkbox' || column.type === 'selection') && checkboxOpts.trigger === 'cell')) ||
    (treeOpts.trigger === 'row' || (column.treeNode && treeOpts.trigger === 'cell'))) {
    tdOns.click = evnt => {
      $table.triggerCellClickEvent(evnt, { $table, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, cell: evnt.currentTarget })
    }
  }
  // 双击事件处理
  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = evnt => {
      $table.triggerCellDBLClickEvent(evnt, { $table, $seq, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, cell: evnt.currentTarget })
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
  if (!fixedHiddenColumn && editConfig && editOpts.showStatus) {
    isDirty = $table.isUpdateByRow(row, column.property)
  }
  let type = column.type === 'seq' || column.type === 'index' ? 'seq' : column.type
  return h('td', {
    class: ['vxe-body--column', column.id, {
      [`col--${cellAlign}`]: cellAlign,
      [`col--${type}`]: type,
      'col--last': $columnIndex === columns.length - 1,
      'col--tree-node': treeNode,
      'col--edit': editRender,
      'col--ellipsis': hasEllipsis,
      'edit--visible': editRender && editRender.type === 'visible',
      'fixed--hidden': fixedHiddenColumn,
      'col--dirty': isDirty,
      'col--actived': editConfig && editRender && (actived.row === row && (actived.column === column || editOpts.mode === 'row')),
      'col--valid-error': validError
    }, UtilTools.getClass(className, params), UtilTools.getClass(cellClassName, params)],
    key: columnKey ? column.id : columnIndex,
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
        attrs: {
          title: showTitle ? UtilTools.getCellLabel(row, column, params) : null
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
      ]) : _e() : null
    ]))
}

function renderLine (h, _vm, $table, rowLevel, items, params) {
  const column = params.column
  const { treeOpts, treeConfig } = $table
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
    rowClassName,
    rowStyle,
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
        $table.triggerHoverEvent(evnt, { row, rowIndex })
      }
      trOn.mouseleave = evnt => {
        if (isOperateMouse($table)) {
          return
        }
        $table.clearHoverRow()
      }
    }
    let rowid = UtilTools.getRowid($table, row)
    rows.push(
      h('tr', {
        class: ['vxe-body--row', {
          'row--stripe': stripe && rowIndex > 0 && (rowIndex + 1) % 2 === 0,
          'row--new': editStore.insertList.indexOf(row) > -1,
          'row--radio': radioOpts.highlight && $table.selectRow === row,
          'row--cheched': checkboxOpts.highlight && $table.isCheckedByCheckboxRow(row)
        }, rowClassName ? XEUtils.isFunction(rowClassName) ? rowClassName({ $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex }) : rowClassName : ''],
        attrs: {
          'data-rowid': rowid
        },
        style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle({ $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex }) : rowStyle) : null,
        key: rowKey || treeConfig ? rowid : $rowIndex,
        on: trOn
      }, tableColumn.map((column, $columnIndex) => {
        let columnIndex = getColumnIndex(column)
        return renderColumn(h, _vm, $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, tableColumn, tableData)
      }))
    )
    // 如果行被展开了
    if (rowExpandeds.length && rowExpandeds.indexOf(row) > -1) {
      let expandColumnIndex = getColumnIndex(expandColumn)
      let cellStyle
      if (treeConfig) {
        cellStyle = {
          paddingLeft: `${(rowLevel * treeOpts.indent) + 30}px`
        }
      }
      if (expandColumn) {
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
                expandColumn.renderData(h, { $table, seq, rowid, row, rowIndex, column: expandColumn, columnIndex: expandColumnIndex, fixed: fixedType, level: rowLevel })
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
    let { $parent: $table, $el, $refs, fixedType } = this
    let { elemStore } = $table
    let prefix = `${fixedType || 'main'}-body-`
    elemStore[`${prefix}wrapper`] = $el
    elemStore[`${prefix}table`] = $refs.table
    elemStore[`${prefix}colgroup`] = $refs.colgroup
    elemStore[`${prefix}list`] = $refs.tbody
    elemStore[`${prefix}xSpace`] = $refs.xSpace
    elemStore[`${prefix}ySpace`] = $refs.ySpace
    elemStore[`${prefix}emptyBlock`] = $refs.emptyBlock
    this.$el.onscroll = this.scrollEvent
    this.$el._onscroll = this.scrollEvent
  },
  beforeDestroy () {
    this.$el._onscroll = null
    this.$el.onscroll = null
  },
  render (h) {
    let {
      _e,
      $parent: $table,
      fixedColumn,
      fixedType
    } = this
    let {
      $scopedSlots,
      id,
      tableData,
      tableColumn,
      showOverflow: allColumnOverflow,
      scrollXLoad,
      mouseOpts,
      keyboardConfig = {}
    } = $table
    // 如果是固定列与设置了超出隐藏
    if (fixedType && allColumnOverflow) {
      tableColumn = fixedColumn
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn
      }
    }
    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      attrs: {
        'data-tid': id
      }
    }, [
      fixedType ? _e() : h('div', {
        class: 'vxe-body--x-space',
        ref: 'xSpace'
      }),
      h('div', {
        class: 'vxe-body--y-space',
        ref: 'ySpace'
      }),
      h('table', {
        class: 'vxe-table--body',
        attrs: {
          'data-tid': id,
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
        })),
        /**
         * 内容
         */
        h('tbody', {
          ref: 'tbody'
        }, renderRows(h, this, $table, '', 0, fixedType, tableData, tableColumn))
      ]),
      /**
       * 选中边框线
       */
      !fixedType && (mouseOpts.checked || keyboardConfig.isCut) ? h('div', {
        class: 'vxe-table--borders'
      }, [
        mouseOpts.checked ? renderBorder(h, 'check') : null,
        keyboardConfig.isCut ? renderBorder(h, 'copy') : null
      ]) : null,
      !fixedType ? h('div', {
        class: ['vxe-table--empty-block', tableData.length ? '' : 'is--empty'],
        ref: 'emptyBlock'
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
      let { $parent: $table, fixedType } = this
      let { $refs, highlightHoverRow, scrollXLoad, scrollYLoad, lastScrollTop, lastScrollLeft } = $table
      let { tableHeader, tableBody, leftBody, rightBody, tableFooter } = $refs
      let headerElem = tableHeader ? tableHeader.$el : null
      let footerElem = tableFooter ? tableFooter.$el : null
      let bodyElem = tableBody.$el
      let leftElem = leftBody ? leftBody.$el : null
      let rightElem = rightBody ? rightBody.$el : null
      let scrollTop = bodyElem.scrollTop
      let scrollLeft = bodyElem.scrollLeft
      let isX = scrollLeft !== lastScrollLeft
      let isY = scrollTop !== lastScrollTop
      $table.lastScrollTop = scrollTop
      $table.lastScrollLeft = scrollLeft
      $table.lastScrollTime = Date.now()
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
        if (isX) {
          if (headerElem) {
            headerElem.scrollLeft = bodyElem.scrollLeft
          }
          if (footerElem) {
            footerElem.scrollLeft = bodyElem.scrollLeft
          }
        }
        if (leftElem || rightElem) {
          $table.checkScrolling()
          if (isY) {
            syncBodyScroll(scrollTop, leftElem, rightElem)
          }
        }
      }
      if (scrollXLoad && isX) {
        $table.triggerScrollXEvent(evnt)
        if (headerElem && scrollLeft + bodyElem.clientWidth >= bodyElem.scrollWidth - 80) {
          // 修复拖动滚动条时可能存在不同步问题
          this.$nextTick(() => {
            if (bodyElem.scrollLeft !== headerElem.scrollLeft) {
              headerElem.scrollLeft = bodyElem.scrollLeft
            }
          })
        }
      }
      if (scrollYLoad && isY) {
        $table.triggerScrollYEvent(evnt)
      }
      UtilTools.emitEvent($table, 'scroll', [{ type: 'body', fixed: fixedType, scrollTop, scrollLeft, isX, isY, $table }, evnt])
    }
  }
}
