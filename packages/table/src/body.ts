import { CreateElement } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { isEnableConf, getClass } from '../../ui/src/utils'
import { getOffsetSize, calcTreeLine, mergeBodyMethod, getRowid } from './util'
import { updateCellTitle, setScrollTop, setScrollLeft } from '../../ui/src/dom'
import { getSlotVNs } from '../../ui/src/vn'

const { getI18n, renderer } = VxeUI

const renderType = 'body'

// 滚动、拖动过程中不需要触发
function isVMScrollProcess ($xetable: any) {
  return $xetable._isResize || ($xetable.lastScrollTime && Date.now() < $xetable.lastScrollTime + $xetable.delayHover)
}

function renderLine (h: CreateElement, _vm: any, $xetable: any, params: any) {
  const { row, column } = params
  const { afterFullData, treeOpts, treeConfig, fullAllDataRowIdData } = $xetable
  const { slots, treeNode } = column
  const rowid = getRowid($xetable, row)
  const rest = fullAllDataRowIdData[rowid]
  let rLevel = 0
  let rIndex = 0
  let items = []
  if (rest) {
    rLevel = rest.level
    rIndex = rest._index
    items = rest.items
  }
  if (slots && slots.line) {
    return $xetable.callSlot(slots.line, params, h)
  }
  const isFirstRow = $xetable.eqRow(afterFullData[0], row)
  if (treeConfig && treeNode && (treeOpts.showLine || treeOpts.line)) {
    return [
      h('div', {
        class: 'vxe-tree--line-wrapper'
      }, [
        h('div', {
          class: 'vxe-tree--line',
          style: {
            height: `${isFirstRow ? 1 : calcTreeLine(params, items, rIndex)}px`,
            left: `${(rLevel * treeOpts.indent) + (rLevel ? 2 - getOffsetSize($xetable) : 0) + 16}px`
          }
        })
      ])
    ]
  }
  return []
}

/**
 * 渲染列
 */
function renderColumn (h: any, _vm: any, $xetable: any, seq: any, rowid: any, fixedType: any, rowLevel: any, row: any, rowIndex: any, $rowIndex: any, _rowIndex: any, column: any, $columnIndex: any, columns: any, items: any) {
  const {
    $listeners: tableListeners,
    fullAllDataRowIdData,
    afterFullData,
    tableData,
    height,
    columnKey,
    overflowX,
    sYOpts,
    scrollYLoad,
    highlightCurrentRow,
    showOverflow: allColumnOverflow,
    isAllOverflow,
    align: allAlign,
    currentColumn,
    cellClassName: allCellClassName,
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
    tooltipConfig,
    rowOpts,
    columnOpts,
    validErrorMaps
  } = $xetable
  const cellOpts = $xetable.computeCellOpts
  const { type, cellRender, editRender, align, showOverflow, className, treeNode, slots } = column
  const { verticalAlign } = cellOpts
  const { actived } = editStore
  const { rHeight: scrollYRHeight } = sYOpts
  const { height: rowHeight } = rowOpts
  const renderOpts = editRender || cellRender
  const compConf = renderOpts ? renderer.get(renderOpts.name) : null
  const compCellClassName = compConf ? (compConf.tableCellClassName || compConf.cellClassName) : ''
  const compCellStyle = compConf ? (compConf.tableCellStyle || compConf.cellStyle) : ''
  const showAllTip = tooltipOpts.showAll || tooltipOpts.enabled
  const columnIndex = $xetable.getColumnIndex(column)
  const _columnIndex = $xetable.getVTColumnIndex(column)
  const isEdit = isEnableConf(editRender)
  let fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX
  const cellOverflow = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
  const showEllipsis = cellOverflow === 'ellipsis'
  const showTitle = cellOverflow === 'title'
  const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
  const hasEllipsis = showTitle || showTooltip || showEllipsis
  let isDirty: any
  const tdOns: any = {}
  const rest = fullAllDataRowIdData[rowid]
  const cellAlign = align || (compConf ? compConf.tableCellAlign : '') || allAlign
  const errorValidItem = validErrorMaps[`${rowid}:${column.id}`]
  const showValidTip = editRules && validOpts.showMessage && (validOpts.message === 'default' ? (height || tableData.length > 1) : validOpts.message === 'inline')
  const attrs: any = { colid: column.id }
  const bindMouseenter = tableListeners['cell-mouseenter']
  const bindMouseleave = tableListeners['cell-mouseleave']
  const triggerDblclick = (editRender && editConfig && editOpts.trigger === 'dblclick')
  const params = { $table: $xetable, $grid: $xetable.$xegrid, isEdit: false, seq, rowid, row, rowIndex, $rowIndex, _rowIndex, column, columnIndex, $columnIndex, _columnIndex, fixed: fixedType, type: renderType, isHidden: fixedHiddenColumn, level: rowLevel, visibleData: afterFullData, data: tableData, items }
  // hover 进入事件
  if (showTitle || showTooltip || showAllTip || bindMouseenter || tooltipConfig) {
    tdOns.mouseenter = (evnt: any) => {
      if (isVMScrollProcess($xetable)) {
        return
      }
      if (showTitle) {
        updateCellTitle(evnt.currentTarget, column)
      } else if (showTooltip || showAllTip) {
        // 如果配置了显示 tooltip
        $xetable.triggerBodyTooltipEvent(evnt, params)
      }
      if (bindMouseenter) {
        $xetable.emitEvent('cell-mouseenter', Object.assign({ cell: evnt.currentTarget }, params), evnt)
      }
    }
  }
  // hover 退出事件
  if (showTooltip || showAllTip || bindMouseleave || tooltipConfig) {
    tdOns.mouseleave = (evnt: any) => {
      if (isVMScrollProcess($xetable)) {
        return
      }
      if (showTooltip || showAllTip) {
        $xetable.handleTargetLeaveEvent(evnt)
      }
      if (bindMouseleave) {
        $xetable.emitEvent('cell-mouseleave', Object.assign({ cell: evnt.currentTarget }, params), evnt)
      }
    }
  }
  // 按下事件处理
  if (checkboxOpts.range || mouseConfig) {
    tdOns.mousedown = (evnt: any) => {
      $xetable.triggerCellMousedownEvent(evnt, params)
    }
  }
  // 点击事件处理
  if ((rowOpts.isCurrent || highlightCurrentRow) ||
    tableListeners['cell-click'] ||
    (editRender && editConfig) ||
    (expandOpts.trigger === 'row' || (expandOpts.trigger === 'cell')) ||
    (radioOpts.trigger === 'row' || (column.type === 'radio' && radioOpts.trigger === 'cell')) ||
    (checkboxOpts.trigger === 'row' || (column.type === 'checkbox' && checkboxOpts.trigger === 'cell')) ||
    (treeOpts.trigger === 'row' || (column.treeNode && treeOpts.trigger === 'cell'))) {
    tdOns.click = (evnt: any) => {
      $xetable.triggerCellClickEvent(evnt, params)
    }
  }
  // 双击事件处理
  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = (evnt: any) => {
      $xetable.triggerCellDblclickEvent(evnt, params)
    }
  }
  // 合并行或列
  if (mergeList.length) {
    const spanRest = mergeBodyMethod(mergeList, _rowIndex, _columnIndex)
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
  if (!fixedHiddenColumn && editConfig && (editRender || cellRender) && (editOpts.showStatus || editOpts.showUpdateStatus)) {
    isDirty = $xetable.isUpdateByRow(row, column.field)
  }
  const tdVNs = []
  if (fixedHiddenColumn && (allColumnOverflow ? isAllOverflow : allColumnOverflow)) {
    tdVNs.push(
      h('div', {
        class: ['vxe-cell', {
          'c--title': showTitle,
          'c--tooltip': showTooltip,
          'c--ellipsis': showEllipsis
        }],
        style: {
          maxHeight: hasEllipsis && (scrollYRHeight || rowHeight) ? `${scrollYRHeight || rowHeight}px` : ''
        }
      })
    )
  } else {
    // 渲染单元格
    tdVNs.push(
      ...renderLine(h, _vm, $xetable, params),
      h('div', {
        class: ['vxe-cell', {
          'c--title': showTitle,
          'c--tooltip': showTooltip,
          'c--ellipsis': showEllipsis
        }],
        style: {
          maxHeight: hasEllipsis && (scrollYRHeight || rowHeight) ? `${scrollYRHeight || rowHeight}px` : ''
        },
        attrs: {
          title: showTitle ? $xetable.getCellLabel(row, column) : null
        }
      }, column.renderCell(h, params))
    )
    if (showValidTip && errorValidItem) {
      const errRule = errorValidItem.rule
      const validSlot = slots ? slots.valid : null
      const validParams = { ...params, ...errorValidItem }
      tdVNs.push(
        h('div', {
          class: ['vxe-cell--valid-error-hint', getClass(validOpts.className, errorValidItem)],
          style: errRule && errRule.maxWidth
            ? {
                width: `${errRule.maxWidth}px`
              }
            : null
        }, validSlot
          ? $xetable.callSlot(validSlot, validParams, h)
          : [
              h('span', {
                class: 'vxe-cell--valid-error-msg'
              }, errorValidItem.content)
            ])
      )
    }
  }
  return h('td', {
    class: [
      'vxe-body--column',
      column.id,
      {
        [`col--${cellAlign}`]: cellAlign,
        [`col--vertical-${verticalAlign}`]: verticalAlign,
        [`col--${type}`]: type,
        'col--last': $columnIndex === columns.length - 1,
        'col--tree-node': treeNode,
        'col--edit': isEdit,
        'col--ellipsis': hasEllipsis,
        'fixed--hidden': fixedHiddenColumn,
        'col--dirty': isDirty,
        'col--active': editConfig && isEdit && (actived.row === row && (actived.column === column || editOpts.mode === 'row')),
        'col--valid-error': !!errorValidItem,
        'col--current': currentColumn === column
      },
      getClass(compCellClassName, params),
      getClass(className, params),
      getClass(allCellClassName, params)
    ],
    key: columnKey || columnOpts.useKey ? column.id : $columnIndex,
    attrs,
    style: Object.assign({
      height: hasEllipsis && (scrollYRHeight || rowHeight) ? `${scrollYRHeight || rowHeight}px` : (scrollYLoad ? `${rest.height || 24}px` : '')
    }, XEUtils.isFunction(compCellStyle) ? compCellStyle(params) : compCellStyle, XEUtils.isFunction(cellStyle) ? cellStyle(params) : cellStyle),
    on: tdOns
  }, tdVNs)
}

function renderRows (h: CreateElement, _vm: any, $xetable: any, fixedType: any, tableData: any, tableColumn: any) {
  const {
    stripe,
    rowKey,
    highlightHoverRow,
    rowClassName,
    rowStyle,
    editConfig,
    showOverflow: allColumnOverflow,
    treeConfig,
    treeOpts,
    expandOpts,
    editOpts,
    treeExpandedMaps,
    scrollYLoad,
    rowExpandedMaps,
    radioOpts,
    checkboxOpts,
    expandColumn,
    hasFixedColumn,
    fullAllDataRowIdData,
    rowOpts,
    pendingRowList,
    pendingRowMaps
  } = $xetable
  const childrenField = treeOpts.children || treeOpts.childrenField
  const rows: any[] = []
  tableData.forEach((row: any, $rowIndex: any) => {
    const trOn: any = {}
    let rowIndex = $rowIndex
    const _rowIndex = $xetable.getVTRowIndex(row)
    // 确保任何情况下 rowIndex 都精准指向真实 data 索引
    rowIndex = $xetable.getRowIndex(row)
    // 事件绑定
    if (rowOpts.isHover || highlightHoverRow) {
      trOn.mouseenter = (evnt: any) => {
        if (isVMScrollProcess($xetable)) {
          return
        }
        $xetable.triggerHoverEvent(evnt, { row, rowIndex })
      }
      trOn.mouseleave = () => {
        if (isVMScrollProcess($xetable)) {
          return
        }
        $xetable.clearHoverRow()
      }
    }
    const rowid = getRowid($xetable, row)
    const rest = fullAllDataRowIdData[rowid]
    const rowLevel = rest ? rest.level : 0
    const seq = rest ? rest.seq : -1
    const params = { $table: $xetable, seq, rowid, fixed: fixedType, type: renderType, level: rowLevel, row, rowIndex, $rowIndex }
    // 行是否被展开
    const isExpandRow = expandColumn && !!rowExpandedMaps[rowid]
    // 树节点是否被展开
    let isExpandTree = false
    let rowChildren = []
    // 是否新增行
    let isNewRow = false
    if (editConfig) {
      isNewRow = $xetable.isInsertByRow(row)
    }
    if (treeConfig && !scrollYLoad && !treeOpts.transform) {
      rowChildren = row[childrenField]
      isExpandTree = rowChildren && rowChildren.length && !!treeExpandedMaps[rowid]
    }
    rows.push(
      h('tr', {
        class: [
          'vxe-body--row',
          treeConfig ? `row--level-${rowLevel}` : '',
          {
            'row--stripe': stripe && ($xetable.getVTRowIndex(row) + 1) % 2 === 0,
            'is--new': isNewRow,
            'is--expand-row': isExpandRow,
            'is--expand-tree': isExpandTree,
            'row--new': isNewRow && (editOpts.showStatus || editOpts.showInsertStatus),
            'row--radio': radioOpts.highlight && $xetable.selectRadioRow === row,
            'row--checked': checkboxOpts.highlight && $xetable.isCheckedByCheckboxRow(row),
            'row--pending': pendingRowList.length && !!pendingRowMaps[rowid]
          },
          rowClassName ? (XEUtils.isFunction(rowClassName) ? rowClassName(params) : rowClassName) : ''
        ],
        attrs: {
          rowid
        },
        style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(params) : rowStyle) : null,
        key: (rowKey || rowOpts.useKey) || treeConfig ? rowid : $rowIndex,
        on: trOn
      }, tableColumn.map((column: any, $columnIndex: any) => {
        return renderColumn(h, _vm, $xetable, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, tableColumn, tableData)
      }))
    )
    // 如果行被展开了
    if (isExpandRow) {
      const { height: expandHeight, padding } = expandOpts
      const cellStyle: any = {}
      if (expandHeight) {
        cellStyle.height = `${expandHeight}px`
      }
      if (treeConfig) {
        cellStyle.paddingLeft = `${(rowLevel * treeOpts.indent) + 30}px`
      }
      const { showOverflow } = expandColumn
      const hasEllipsis = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
      const expandParams = { $table: $xetable, seq, column: expandColumn, fixed: fixedType, type: renderType, level: rowLevel, row, rowIndex, $rowIndex }
      rows.push(
        h('tr', {
          class: ['vxe-body--expanded-row', {
            'is--padding': padding
          }],
          key: `expand_${rowid}`,
          style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(expandParams) : rowStyle) : null,
          on: trOn
        }, [
          h('td', {
            class: {
              'vxe-body--expanded-column': 1,
              'fixed--hidden': fixedType && !hasFixedColumn,
              'col--ellipsis': hasEllipsis
            },
            attrs: {
              colspan: tableColumn.length
            }
          }, [
            h('div', {
              class: {
                'vxe-body--expanded-cell': 1,
                'is--ellipsis': expandHeight
              },
              style: cellStyle
            }, [
              expandColumn.renderData(h, expandParams)
            ])
          ])
        ])
      )
    }
    // 如果是树形表格
    if (isExpandTree) {
      rows.push(...renderRows(h, _vm, $xetable, fixedType, rowChildren, tableColumn))
    }
  })
  return rows
}

export default {
  name: 'VxeTableBody',
  props: {
    tableData: Array,
    tableColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String
  },
  data () {
    return {
      wheelTime: null,
      wheelYSize: 0,
      wheelYInterval: 0,
      wheelYTotal: 0
    }
  },
  mounted (this: any) {
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
  },
  beforeDestroy (this: any) {
    clearTimeout(this.wheelTime)
  },
  destroyed (this: any) {
    const { $parent: $xetable, fixedType } = this
    const { elemStore } = $xetable
    const prefix = `${fixedType || 'main'}-body-`
    elemStore[`${prefix}wrapper`] = null
    elemStore[`${prefix}table`] = null
    elemStore[`${prefix}colgroup`] = null
    elemStore[`${prefix}list`] = null
    elemStore[`${prefix}xSpace`] = null
    elemStore[`${prefix}ySpace`] = null
    elemStore[`${prefix}emptyBlock`] = null
  },
  render (this: any, h: CreateElement) {
    const { _e, $parent: $xetable, fixedColumn, fixedType } = this
    let { $scopedSlots, tId, tableData, tableColumn, visibleColumn, expandColumn, showOverflow: allColumnOverflow, keyboardConfig, keyboardOpts, mergeList, spanMethod, scrollXLoad, scrollYLoad, isAllOverflow, emptyOpts, mouseConfig, mouseOpts, sYOpts } = $xetable
    // 如果是使用优化模式
    if (fixedType) {
      // 如果存在展开行使用全量渲染
      if (!expandColumn && (scrollXLoad || scrollYLoad || (allColumnOverflow ? isAllOverflow : allColumnOverflow))) {
        if (!mergeList.length && !spanMethod && !(keyboardConfig && keyboardOpts.isMerge)) {
          tableColumn = fixedColumn
        } else {
          tableColumn = visibleColumn
          // 检查固定列是否被合并，合并范围是否超出固定列
          // if (mergeList.length && !isMergeLeftFixedExceeded && fixedType === 'left') {
          //   tableColumn = fixedColumn
          // } else if (mergeList.length && !isMergeRightFixedExceeded && fixedType === 'right') {
          //   tableColumn = fixedColumn
          // } else {
          //   tableColumn = visibleColumn
          // }
        }
      } else {
        tableColumn = visibleColumn
      }
    }
    let emptyContent
    if ($scopedSlots.empty) {
      emptyContent = $scopedSlots.empty.call(this, { $table: $xetable }, h)
    } else {
      const compConf = emptyOpts.name ? renderer.get(emptyOpts.name) : null
      const rtEmptyView = compConf ? (compConf.renderTableEmpty || compConf.renderTableEmptyView || compConf.renderEmpty) : null
      if (rtEmptyView) {
        emptyContent = getSlotVNs(rtEmptyView.call(this, h, emptyOpts, { $table: $xetable }))
      } else {
        emptyContent = $xetable.emptyText || getI18n('vxe.table.emptyText')
      }
    }
    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      attrs: {
        xid: tId
      },
      on: Object.assign({
        scroll: this.scrollEvent
      }, scrollYLoad && sYOpts.mode === 'wheel' ? { wheel: this.wheelEvent } : null)
    }, [
      fixedType
        ? _e()
        : h('div', {
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
          xid: tId,
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
        }, tableColumn.map((column: any, $columnIndex: any) => {
          return h('col', {
            attrs: {
              name: column.id
            },
            key: $columnIndex
          })
        })),
        /**
         * 内容
         */
        h('tbody', {
          ref: 'tbody'
        }, renderRows(h, this, $xetable, fixedType, tableData, tableColumn))
      ]),
      h('div', {
        class: 'vxe-table--checkbox-range'
      }),
      mouseConfig && mouseOpts.area
        ? h('div', {
          class: 'vxe-table--cell-area'
        }, [
          h('span', {
            class: 'vxe-table--cell-main-area'
          }, mouseOpts.extension
            ? [
                h('span', {
                  class: 'vxe-table--cell-main-area-btn',
                  on: {
                    mousedown (evnt: any) {
                      $xetable.triggerCellExtendMousedownEvent(evnt, { $table: $xetable, fixed: fixedType, type: renderType })
                    }
                  }
                })
              ]
            : null),
          h('span', {
            class: 'vxe-table--cell-copy-area'
          }),
          h('span', {
            class: 'vxe-table--cell-extend-area'
          }),
          h('span', {
            class: 'vxe-table--cell-multi-area'
          }),
          h('span', {
            class: 'vxe-table--cell-active-area'
          })
        ])
        : null,
      !fixedType
        ? h('div', {
          class: 'vxe-table--empty-block',
          ref: 'emptyBlock'
        }, [
          h('div', {
            class: 'vxe-table--empty-content'
          }, emptyContent)
        ])
        : null
    ])
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent (evnt: Event) {
      const { $el: scrollBodyElem, $parent: $xeTable, fixedType } = this
      const { $refs, lastScrollTop, lastScrollLeft } = $xeTable
      const { tableHeader, tableBody, leftBody, rightBody, tableFooter } = $refs
      const headerElem = tableHeader ? tableHeader.$el : null
      const footerElem = tableFooter ? tableFooter.$el : null
      const bodyElem = tableBody.$el
      const leftElem = leftBody ? leftBody.$el : null
      const rightElem = rightBody ? rightBody.$el : null
      const scrollTop = scrollBodyElem.scrollTop
      const scrollLeft = bodyElem.scrollLeft
      const isRollX = scrollLeft !== lastScrollLeft
      const isRollY = scrollTop !== lastScrollTop
      const xHandleEl = $refs.refScrollXHandleElem
      const yHandleEl = $refs.refScrollYHandleElem
      if (yHandleEl) {
        yHandleEl.scrollTop = scrollTop
      } else if (isRollY) {
        $xeTable.lastScrollTop = scrollTop
        $xeTable.lastScrollLeft = scrollLeft
        if (leftElem && fixedType === 'left') {
          setScrollTop(bodyElem, scrollTop)
          setScrollTop(rightElem, scrollTop)
        } else if (rightElem && fixedType === 'right') {
          setScrollTop(bodyElem, scrollTop)
          setScrollTop(leftElem, scrollTop)
        } else {
          setScrollTop(leftElem, scrollTop)
          setScrollTop(rightElem, scrollTop)
        }
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, {
          type: renderType,
          fixed: fixedType,
          scrollTop,
          scrollLeft
        })
      }
      if (xHandleEl) {
        xHandleEl.scrollLeft = scrollLeft
      } else if (isRollX) {
        $xeTable.lastScrollTop = scrollTop
        $xeTable.lastScrollLeft = scrollLeft
        setScrollLeft(headerElem, scrollLeft)
        setScrollLeft(footerElem, scrollLeft)
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, {
          type: renderType,
          fixed: fixedType,
          scrollTop,
          scrollLeft
        })
      }
    },
    handleWheel (evnt: any, isTopWheel: any, deltaTop: any, isRollX: any, isRollY: any) {
      const { $parent: $xetable } = this
      const { $refs, elemStore, scrollYLoad, scrollXLoad } = $xetable
      const { tableBody, leftBody, rightBody } = $refs
      const bodyElem = tableBody.$el
      const leftElem = leftBody ? leftBody.$el : null
      const rightElem = rightBody ? rightBody.$el : null
      const remainSize = this.isPrevWheelTop === isTopWheel ? Math.max(0, this.wheelYSize - this.wheelYTotal) : 0
      const bodyYElem = elemStore['main-body-ySpace']
      const bodyXElem = elemStore['main-body-xSpace']
      const bodyHeight = scrollYLoad && bodyYElem ? bodyYElem.clientHeight : bodyElem.clientHeight
      const bodyWidth = scrollXLoad && bodyXElem ? bodyXElem.clientWidth : bodyElem.clientWidth
      this.isPrevWheelTop = isTopWheel
      this.wheelYSize = Math.abs(isTopWheel ? deltaTop - remainSize : deltaTop + remainSize)
      this.wheelYInterval = 0
      this.wheelYTotal = 0
      clearTimeout(this.wheelTime)
      const handleSmooth = () => {
        let { fixedType, wheelYTotal, wheelYSize, wheelYInterval } = this
        if (wheelYTotal < wheelYSize) {
          wheelYInterval = Math.max(5, Math.floor(wheelYInterval * 1.5))
          wheelYTotal = wheelYTotal + wheelYInterval
          if (wheelYTotal > wheelYSize) {
            wheelYInterval = wheelYInterval - (wheelYTotal - wheelYSize)
          }
          const { scrollTop, clientHeight, scrollHeight } = bodyElem
          const targetTop = scrollTop + (wheelYInterval * (isTopWheel ? -1 : 1))
          bodyElem.scrollTop = targetTop
          if (leftElem) {
            leftElem.scrollTop = targetTop
          }
          if (rightElem) {
            rightElem.scrollTop = targetTop
          }
          if (isTopWheel ? targetTop < scrollHeight - clientHeight : targetTop >= 0) {
            this.wheelTime = setTimeout(handleSmooth, 10)
          }
          this.wheelYTotal = wheelYTotal
          this.wheelYInterval = wheelYInterval
          $xetable.emitEvent('scroll', {
            type: renderType,
            fixed: fixedType,
            scrollTop: bodyElem.scrollTop,
            scrollLeft: bodyElem.scrollLeft,
            scrollHeight: bodyElem.scrollHeight,
            scrollWidth: bodyElem.scrollWidth,
            bodyHeight,
            bodyWidth,
            isX: isRollX,
            isY: isRollY
          }, evnt)
        }
      }
      handleSmooth()
    },
    /**
     * 滚轮处理
     */
    wheelEvent (evnt: any) {
      const { deltaY, deltaX } = evnt
      const { $el: scrollBodyElem, $parent: $xetable } = this
      const { $refs, highlightHoverRow, scrollYLoad, lastScrollTop, lastScrollLeft, rowOpts } = $xetable
      const { tableBody } = $refs
      const bodyElem = tableBody.$el

      const deltaTop = deltaY
      const deltaLeft = deltaX
      const isTopWheel = deltaTop < 0
      // 如果滚动位置已经是顶部或底部，则不需要触发
      if (isTopWheel ? scrollBodyElem.scrollTop <= 0 : scrollBodyElem.scrollTop >= scrollBodyElem.scrollHeight - scrollBodyElem.clientHeight) {
        return
      }

      const scrollTop = scrollBodyElem.scrollTop + deltaTop
      const scrollLeft = bodyElem.scrollLeft + deltaLeft
      const isRollX = scrollLeft !== lastScrollLeft
      const isRollY = scrollTop !== lastScrollTop

      // 用于鼠标纵向滚轮处理
      if (isRollY) {
        evnt.preventDefault()
        $xetable.lastScrollTop = scrollTop
        $xetable.lastScrollLeft = scrollLeft
        $xetable.lastScrollTime = Date.now()
        if (rowOpts.isHover || highlightHoverRow) {
          $xetable.clearHoverRow()
        }
        this.handleWheel(evnt, isTopWheel, deltaTop, isRollX, isRollY)
        if (scrollYLoad) {
          $xetable.triggerScrollYEvent(evnt)
        }
      }
    }
  } as any
}
