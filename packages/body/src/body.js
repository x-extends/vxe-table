import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools } from '../../tools'

const cellType = 'body'

// 滚动、拖动过程中不需要触发
function isOperateMouse ($xetable) {
  // 在 v3.0 中废弃 optimization.delayHover
  return $xetable._isResize || ($xetable.lastScrollTime && Date.now() < $xetable.lastScrollTime + $xetable.delayHover)
}

function countTreeExpand (prevRow, params) {
  const { $table } = params
  const rowChildren = prevRow[$table.treeOpts.children]
  let count = 1
  if ($table.isTreeExpandByRow(prevRow)) {
    for (let index = 0; index < rowChildren.length; index++) {
      count += countTreeExpand(rowChildren[index], params)
    }
  }
  return count
}

function getOffsetSize ($xetable) {
  switch ($xetable.vSize) {
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

function renderLine (h, _vm, $xetable, rowLevel, items, params) {
  const column = params.column
  const { treeOpts, treeConfig } = $xetable
  return column.slots && column.slots.line
    ? column.slots.line.call($xetable, params, h)
    : column.treeNode && treeConfig && treeOpts.line ? [
      h('div', {
        class: 'vxe-tree--line-wrapper'
      }, [
        h('div', {
          class: 'vxe-tree--line',
          style: {
            height: `${calcTreeLine(params, items)}px`,
            left: `${(rowLevel * treeOpts.indent) + (rowLevel ? 2 - getOffsetSize($xetable) : 0) + 16}px`
          }
        })
      ])
    ] : []
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

function mergeMethod (mergeList, _rowIndex, _columnIndex) {
  for (let mIndex = 0; mIndex < mergeList.length; mIndex++) {
    const { row: mergeRowIndex, col: mergeColIndex, rowspan: mergeRowspan, colspan: mergeColspan } = mergeList[mIndex]
    if (mergeColIndex > -1 && mergeRowIndex > -1 && mergeRowspan && mergeColspan) {
      if (mergeRowIndex === _rowIndex && mergeColIndex === _columnIndex) {
        return { rowspan: mergeRowspan, colspan: mergeColspan }
      }
      if (_rowIndex >= mergeRowIndex && _rowIndex < mergeRowIndex + mergeRowspan && _columnIndex >= mergeColIndex && _columnIndex < mergeColIndex + mergeColspan) {
        return { rowspan: 0, colspan: 0 }
      }
    }
  }
}

/**
 * 渲染列
 */
function renderColumn (h, _vm, $xetable, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, columns, items) {
  const {
    _e,
    $listeners: tableListeners,
    afterFullData,
    tableData,
    height,
    columnKey,
    overflowX,
    scrollXLoad,
    scrollYLoad,
    highlightCurrentRow,
    showOverflow: allColumnOverflow,
    align: allAlign,
    currentColumn,
    cellClassName,
    cellStyle,
    mergeList,
    spanMethod,
    radioOpts,
    checkboxOpts,
    expandOpts,
    treeOpts,
    tooltipOpts,
    mouseConfig,
    editConfig,
    editOpts,
    editRules,
    validOpts,
    editStore,
    validStore
  } = $xetable
  const { cellRender, editRender, align, showOverflow, className, treeNode } = column
  const { actived } = editStore
  const { enabled } = tooltipOpts
  const columnIndex = $xetable.getColumnIndex(column)
  const _columnIndex = $xetable._getColumnIndex(column)
  let fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX
  const cellOverflow = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
  let showEllipsis = cellOverflow === 'ellipsis'
  const showTitle = cellOverflow === 'title'
  const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
  let hasEllipsis = showTitle || showTooltip || showEllipsis
  let isDirty
  const tdOns = {}
  const cellAlign = align || allAlign
  const hasValidError = validStore.row === row && validStore.column === column
  const hasDefaultTip = editRules && (validOpts.message === 'default' ? (height || tableData.length > 1) : validOpts.message === 'inline')
  const attrs = { 'data-colid': column.id }
  const bindMouseenter = tableListeners['cell-mouseenter']
  const bindMouseleave = tableListeners['cell-mouseleave']
  const triggerDblclick = (editRender && editConfig && editOpts.trigger === 'dblclick')
  const params = { $table: $xetable, $seq, seq, rowid, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, fixed: fixedType, type: cellType, isHidden: fixedHiddenColumn, level: rowLevel, visibleData: afterFullData, data: tableData, items }
  // 虚拟滚动不支持动态高度
  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true
  }
  // hover 进入事件
  if (showTitle || showTooltip || enabled || bindMouseenter) {
    tdOns.mouseenter = evnt => {
      if (isOperateMouse($xetable)) {
        return
      }
      if (showTitle) {
        DomTools.updateCellTitle(evnt.currentTarget, column)
      } else if (showTooltip || enabled) {
        // 如果配置了显示 tooltip
        $xetable.triggerBodyTooltipEvent(evnt, params)
      }
      if (bindMouseenter) {
        $xetable.emitEvent('cell-mouseenter', Object.assign({ cell: evnt.currentTarget }, params), evnt)
      }
    }
  }
  // hover 退出事件
  if (showTooltip || enabled || bindMouseleave) {
    tdOns.mouseleave = evnt => {
      if (isOperateMouse($xetable)) {
        return
      }
      if (showTooltip || enabled) {
        $xetable.handleTargetLeaveEvent(evnt)
      }
      if (bindMouseleave) {
        $xetable.emitEvent('cell-mouseleave', Object.assign({ cell: evnt.currentTarget }, params), evnt)
      }
    }
  }
  // 按下事件处理
  if (checkboxOpts.range || mouseConfig) {
    tdOns.mousedown = evnt => {
      $xetable.triggerCellMousedownEvent(evnt, params)
    }
  }
  // 点击事件处理
  if (highlightCurrentRow ||
    mouseConfig ||
    tableListeners['cell-click'] ||
    (editRender && editConfig) ||
    (expandOpts.trigger === 'row' || (expandOpts.trigger === 'cell')) ||
    (radioOpts.trigger === 'row' || (column.type === 'radio' && radioOpts.trigger === 'cell')) ||
    // 在 v3.0 中废弃 type=selection
    (checkboxOpts.trigger === 'row' || ((column.type === 'checkbox' || column.type === 'selection') && checkboxOpts.trigger === 'cell')) ||
    (treeOpts.trigger === 'row' || (column.treeNode && treeOpts.trigger === 'cell'))) {
    tdOns.click = evnt => {
      $xetable.triggerCellClickEvent(evnt, params)
    }
  }
  // 双击事件处理
  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = evnt => {
      $xetable.triggerCellDBLClickEvent(evnt, params)
    }
  }
  // 合并行或列
  if (mergeList.length) {
    const spanRest = mergeMethod(mergeList, _rowIndex, _columnIndex)
    if (spanRest) {
      const { rowspan, colspan } = spanRest
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
  } else if (spanMethod) {
    // 自定义合并行或列的方法
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
  // 如果被合并不可隐藏
  if (fixedHiddenColumn && mergeList) {
    if (attrs.colspan > 1 || attrs.rowspan > 1) {
      fixedHiddenColumn = false
    }
  }
  // 如果编辑列开启显示状态
  if (!fixedHiddenColumn && editConfig && (editRender || cellRender) && editOpts.showStatus) {
    isDirty = $xetable.isUpdateByRow(row, column.property)
  }
  const type = column.type === 'seq' || column.type === 'index' ? 'seq' : column.type
  return h('td', {
    class: ['vxe-body--column', column.id, {
      [`col--${cellAlign}`]: cellAlign,
      [`col--${type}`]: type,
      'col--last': $columnIndex === columns.length - 1,
      'col--tree-node': treeNode,
      'col--edit': !!editRender,
      'col--ellipsis': hasEllipsis,
      'fixed--hidden': fixedHiddenColumn,
      'col--dirty': isDirty,
      'col--actived': editConfig && editRender && (actived.row === row && (actived.column === column || editOpts.mode === 'row')),
      'col--valid-error': hasValidError,
      'col--current': currentColumn === column
    }, UtilTools.getClass(className, params), UtilTools.getClass(cellClassName, params)],
    key: columnKey ? column.id : $columnIndex,
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
    : renderLine(h, _vm, $xetable, rowLevel, items, params).concat([
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
      hasDefaultTip ? hasValidError ? h('div', {
        class: 'vxe-cell--valid',
        style: validStore.rule && validStore.rule.maxWidth ? {
          width: `${validStore.rule.maxWidth}px`
        } : null
      }, [
        h('span', {
          class: 'vxe-cell--valid-msg'
        }, validStore.content)
      ]) : _e() : null
    ]))
}

function renderRows (h, _vm, $xetable, $seq, rowLevel, fixedType, tableData, tableColumn) {
  const {
    stripe,
    rowKey,
    highlightHoverRow,
    rowClassName,
    rowStyle,
    showOverflow: allColumnOverflow,
    treeConfig,
    treeOpts,
    treeExpandeds,
    scrollYLoad,
    scrollYStore,
    editStore,
    rowExpandeds,
    radioOpts,
    checkboxOpts,
    expandColumn
  } = $xetable
  const rows = []
  tableData.forEach((row, $rowIndex) => {
    const trOn = {}
    let rowIndex = $rowIndex
    let seq = rowIndex + 1
    if (scrollYLoad) {
      seq += scrollYStore.startIndex
    }
    const _rowIndex = $xetable._getRowIndex(row)
    // 确保任何情况下 rowIndex 都精准指向真实 data 索引
    rowIndex = $xetable.getRowIndex(row)
    // 事件绑定
    if (highlightHoverRow) {
      trOn.mouseenter = evnt => {
        if (isOperateMouse($xetable)) {
          return
        }
        $xetable.triggerHoverEvent(evnt, { row, rowIndex })
      }
      trOn.mouseleave = () => {
        if (isOperateMouse($xetable)) {
          return
        }
        $xetable.clearHoverRow()
      }
    }
    const rowid = UtilTools.getRowid($xetable, row)
    const params = { $table: $xetable, $seq, seq, rowid, fixed: fixedType, type: cellType, level: rowLevel, row, rowIndex, $rowIndex }
    rows.push(
      h('tr', {
        class: ['vxe-body--row', {
          'row--stripe': stripe && ($xetable._getRowIndex(row) + 1) % 2 === 0,
          'is--new': editStore.insertList.indexOf(row) > -1,
          'row--radio': radioOpts.highlight && $xetable.selectRow === row,
          'row--checked': checkboxOpts.highlight && $xetable.isCheckedByCheckboxRow(row)
        }, rowClassName ? XEUtils.isFunction(rowClassName) ? rowClassName(params) : rowClassName : ''],
        attrs: {
          'data-rowid': rowid
        },
        style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(params) : rowStyle) : null,
        key: rowKey || treeConfig ? rowid : $rowIndex,
        on: trOn
      }, tableColumn.map((column, $columnIndex) => {
        return renderColumn(h, _vm, $xetable, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, tableColumn, tableData)
      }))
    )
    // 如果行被展开了
    if (expandColumn && rowExpandeds.length && rowExpandeds.indexOf(row) > -1) {
      const expandColumnIndex = $xetable.getColumnIndex(expandColumn)
      let cellStyle
      if (treeConfig) {
        cellStyle = {
          paddingLeft: `${(rowLevel * treeOpts.indent) + 30}px`
        }
      }
      const { showOverflow } = expandColumn
      const hasEllipsis = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
      const expandParams = { $table: $xetable, $seq, seq, column: expandColumn, columnIndex: expandColumnIndex, fixed: fixedType, type: cellType, level: rowLevel, row, rowIndex, $rowIndex }
      rows.push(
        h('tr', {
          class: 'vxe-body--expanded-row',
          key: `expand_${rowid}`,
          style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(expandParams) : rowStyle) : null,
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
              expandColumn.renderData(h, expandParams)
            ])
          ])
        ])
      )
    }
    // 如果是树形表格
    if (treeConfig && treeExpandeds.length) {
      const rowChildren = row[treeOpts.children]
      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push(...renderRows(h, _vm, $xetable, $seq ? `${$seq}.${seq}` : `${seq}`, rowLevel + 1, fixedType, rowChildren, tableColumn))
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
    const { $parent: $xetable, $el, $refs, fixedType } = this
    const { elemStore } = $xetable
    const prefix = `${fixedType || 'main'}-body-`
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
    const { _e, $parent: $xetable, fixedColumn, fixedType } = this
    let {
      $scopedSlots,
      tId,
      tableData,
      tableColumn,
      showOverflow: allColumnOverflow,
      mergeList,
      spanMethod,
      scrollXLoad,
      mouseConfig,
      mouseOpts,
      emptyRender,
      emptyOpts,
      keyboardConfig,
      keyboardOpts
    } = $xetable
    // 在 v3.0 中废弃 mouse-config.checked
    const isMouseChecked = mouseConfig && mouseOpts.checked
    // 如果是固定列与设置了超出隐藏
    if (!mergeList.length && !spanMethod && !(keyboardConfig && keyboardOpts.isMerge)) {
      if (fixedType && allColumnOverflow) {
        tableColumn = fixedColumn
      } else if (scrollXLoad) {
        if (fixedType) {
          tableColumn = fixedColumn
        }
      }
    }
    let emptyContent
    if ($scopedSlots.empty) {
      emptyContent = $scopedSlots.empty.call(this, { $table: $xetable }, h)
    } else {
      const compConf = emptyRender ? VXETable.renderer.get(emptyOpts.name) : null
      if (compConf && compConf.renderEmpty) {
        emptyContent = compConf.renderEmpty.call(this, h, emptyOpts, { $table: $xetable }, { $table: $xetable })
      } else {
        emptyContent = $xetable.emptyText || GlobalConfig.i18n('vxe.table.emptyText')
      }
    }
    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      attrs: {
        'data-tid': tId
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
          'data-tid': tId,
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
        }, renderRows(h, this, $xetable, '', 0, fixedType, tableData, tableColumn))
      ]),
      /**
       * 选中边框线
       */
      !fixedType && (isMouseChecked || keyboardOpts.isCut) ? h('div', {
        class: 'vxe-table--borders'
      }, [
        isMouseChecked ? renderBorder(h, 'check') : null,
        keyboardOpts.isCut ? renderBorder(h, 'copy') : null
      ]) : null,
      h('div', {
        class: 'vxe-table--checkbox-range'
      }),
      mouseConfig && mouseOpts.area ? h('div', {
        staticClass: 'vxe-table--cell-area'
      }, [
        h('span', {
          staticClass: 'vxe-table--cell-main-area'
        }, mouseOpts.extension ? [
          h('span', {
            staticClass: 'vxe-table--cell-main-area-btn',
            on: {
              mousedown (evnt) {
                $xetable.triggerCellExtendMousedownEvent(evnt, { $table: $xetable, fixed: fixedType, type: cellType })
              }
            }
          })
        ] : null),
        h('span', {
          staticClass: 'vxe-table--cell-copy-area'
        }),
        h('span', {
          staticClass: 'vxe-table--cell-extend-area'
        }),
        h('span', {
          staticClass: 'vxe-table--cell-multi-area'
        }),
        h('span', {
          staticClass: 'vxe-table--cell-active-area'
        })
      ]) : null,
      !fixedType ? h('div', {
        class: 'vxe-table--empty-block',
        ref: 'emptyBlock'
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
      const { $el, $parent: $xetable, fixedType } = this
      const { $refs, highlightHoverRow, scrollXLoad, scrollYLoad, lastScrollTop, lastScrollLeft } = $xetable
      const { tableHeader, tableBody, leftBody, rightBody, tableFooter, validTip } = $refs
      const headerElem = tableHeader ? tableHeader.$el : null
      const footerElem = tableFooter ? tableFooter.$el : null
      const bodyElem = tableBody.$el
      const leftElem = leftBody ? leftBody.$el : null
      const rightElem = rightBody ? rightBody.$el : null
      let scrollTop = $el.scrollTop
      const scrollLeft = bodyElem.scrollLeft
      const isX = scrollLeft !== lastScrollLeft
      const isY = scrollTop !== lastScrollTop
      $xetable.lastScrollTop = scrollTop
      $xetable.lastScrollLeft = scrollLeft
      $xetable.lastScrollTime = Date.now()
      if (highlightHoverRow) {
        $xetable.clearHoverRow()
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
          $xetable.checkScrolling()
          if (isY) {
            syncBodyScroll(scrollTop, leftElem, rightElem)
          }
        }
      }
      if (scrollXLoad && isX) {
        $xetable.triggerScrollXEvent(evnt)
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
        $xetable.triggerScrollYEvent(evnt)
      }
      if (isX && validTip && validTip.visible) {
        validTip.updatePlacement()
      }
      $xetable.emitEvent('scroll', { type: cellType, fixed: fixedType, scrollTop, scrollLeft, isX, isY }, evnt)
    }
  }
}
