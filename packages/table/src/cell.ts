import { CreateElement, VNode } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { getFuncText, isEnableConf, formatText, eqEmptyValue } from '../../ui/src/utils'
import { updateCellTitle } from '../../ui/src/dom'
import { createColumn, getRowid } from './util'
import { getSlotVNs } from '../../ui/src/vn'

import type { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods, VxeComponentSlotType, TableReactData, TableInternalData } from '../../../types'

const { getI18n, getIcon, renderer, formats, renderEmptyElement } = VxeUI

function renderTitlePrefixIcon (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, column } = params
  const titlePrefix = column.titlePrefix || column.titleHelp
  if (titlePrefix) {
    return h('i', {
      class: ['vxe-cell-title-prefix-icon', titlePrefix.iconStatus ? `theme--${titlePrefix.iconStatus}` : ''],
      on: {
        mouseenter (evnt: any) {
          $table.triggerHeaderTitleEvent(evnt, titlePrefix, params)
        },
        mouseleave (evnt: any) {
          $table.handleTargetLeaveEvent(evnt)
        }
      }
    }, [
      h('i', {
        class: titlePrefix.icon || getIcon().TABLE_TITLE_PREFIX
      })
    ])
  }
  return renderEmptyElement($table)
}

function renderTitleSuffixIcon (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, column } = params
  const titleSuffix = column.titleSuffix
  if (titleSuffix) {
    return h('i', {
      class: ['vxe-cell-title-suffix-icon', titleSuffix.iconStatus ? `theme--${titleSuffix.iconStatus}` : ''],
      on: {
        mouseenter (evnt: any) {
          $table.triggerHeaderTitleEvent(evnt, titleSuffix, params)
        },
        mouseleave (evnt: any) {
          $table.handleTargetLeaveEvent(evnt)
        }
      }
    }, [
      h('i', {
        class: titleSuffix.icon || getIcon().TABLE_TITLE_SUFFIX
      })
    ])
  }
  return renderEmptyElement($table)
}

function renderCellDragIcon (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table } = params
  const tableSlots = $table.$scopedSlots
  const tableProps = $table
  const { dragConfig } = tableProps
  const rowDragOpts = $table.computeRowDragOpts
  const { icon, trigger, disabledMethod } = rowDragOpts
  const rDisabledMethod = disabledMethod || (dragConfig ? dragConfig.rowDisabledMethod : null)
  const isDisabled = rDisabledMethod && rDisabledMethod(params)
  const rowDragIconSlot = tableSlots.rowDragIcon || tableSlots['row-drag-icon']
  const ons: Record<string, any> = {}
  if (trigger !== 'cell') {
    ons.mousedown = (evnt: MouseEvent) => {
      if (!isDisabled) {
        $table.handleCellDragMousedownEvent(evnt, params)
      }
    }
    ons.mouseup = $table.handleCellDragMouseupEvent
  }
  return h('span', {
    key: 'dg',
    class: ['vxe-cell--drag-handle', {
      'is--disabled': isDisabled
    }],
    on: ons
  }, rowDragIconSlot
    ? $table.callSlot(rowDragIconSlot as any, params, h)
    : [
        h('i', {
          class: icon || (dragConfig ? dragConfig.rowIcon : '') || getIcon().TABLE_DRAG_ROW
        })
      ])
}

function renderCellBaseVNs (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, content: VxeComponentSlotType | VxeComponentSlotType[]) {
  const { $table, column, level } = params
  const { dragSort } = column
  const tableProps = $table
  const { treeConfig, dragConfig } = tableProps
  const rowOpts = $table.computeRowOpts
  const rowDragOpts = $table.computeRowDragOpts
  const treeOpts = $table.computeTreeOpts
  const { showIcon, isPeerDrag, isCrossDrag, visibleMethod } = rowDragOpts
  const rVisibleMethod = visibleMethod || (dragConfig ? dragConfig.rowVisibleMethod : null)
  const vns: VxeComponentSlotType[] = []
  if (dragSort && rowOpts.drag && ((showIcon || (dragConfig ? dragConfig.showRowIcon : false)) && (!rVisibleMethod || rVisibleMethod(params)))) {
    if (treeConfig) {
      if (treeOpts.transform && (isPeerDrag || isCrossDrag || !level)) {
        vns.unshift(
          renderCellDragIcon(h, params)
        )
      }
    } else {
      vns.unshift(
        renderCellDragIcon(h, params)
      )
    }
  }
  return vns.concat(XEUtils.isArray(content) ? content : [content])
}

function renderHeaderCellDragIcon (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, column } = params
  const tableSlots = $table.$scopedSlots
  const { slots } = column
  const columnOpts = $table.computeColumnOpts
  const columnDragOpts = $table.computeColumnDragOpts
  const { showIcon, icon, trigger, isPeerDrag, isCrossDrag, visibleMethod, disabledMethod } = columnDragOpts
  if (columnOpts.drag && showIcon && (!visibleMethod || visibleMethod(params))) {
    if (!column.fixed && (isPeerDrag || isCrossDrag || !column.parentId)) {
      const isDisabled = disabledMethod && disabledMethod(params)
      const columnDragIconSlot = (slots ? slots.columnDragIcon || slots['column-drag-icon'] : null) || tableSlots.columnDragIcon || tableSlots['column-drag-icon']
      const ons: Record<string, any> = {}
      if (trigger !== 'cell') {
        ons.mousedown = (evnt: MouseEvent) => {
          if (!isDisabled) {
            $table.handleHeaderCellDragMousedownEvent(evnt, params)
          }
        }
        ons.mouseup = $table.handleHeaderCellDragMouseupEvent
      }
      return h('span', {
        key: 'dg',
        class: ['vxe-cell--drag-handle', {
          'is--disabled': isDisabled
        }],
        on: ons
      }, columnDragIconSlot
        ? $table.callSlot(columnDragIconSlot as any, params, h)
        : [
            h('i', {
              class: icon || getIcon().TABLE_DRAG_COLUMN
            })
          ])
    }
  }
  return renderEmptyElement($table)
}

function renderHeaderCellBaseVNs (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, content: VNode | VNode[]) {
  const vns = [
    renderTitlePrefixIcon(h, params),
    renderHeaderCellDragIcon(h, params),
    ...(XEUtils.isArray(content) ? content : [content]),
    renderTitleSuffixIcon(h, params)
  ]
  return vns
}

function renderTitleContent (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, content: VxeComponentSlotType | VxeComponentSlotType[]) {
  const { $table, column } = params
  const { type, showHeaderOverflow } = column
  const tableProps = $table
  const tableReactData = $table as unknown as TableReactData
  const { showHeaderOverflow: allColumnHeaderOverflow } = tableProps
  const tooltipOpts = $table.computeTooltipOpts
  const showAllTip = tooltipOpts.showAll
  const headOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
  const showTitle = headOverflow === 'title'
  const showTooltip = headOverflow === true || headOverflow === 'tooltip'
  const ons: Record<string, any> = {}
  if (showTitle || showTooltip || showAllTip) {
    ons.mouseenter = (evnt: MouseEvent) => {
      if (tableReactData.isDragResize) {
        return
      }
      if (showTitle) {
        updateCellTitle(evnt.currentTarget, column)
      } else if (showTooltip || showAllTip) {
        $table.triggerHeaderTooltipEvent(evnt, params)
      }
    }
  }
  if (showTooltip || showAllTip) {
    ons.mouseleave = (evnt: any) => {
      if (tableReactData.isDragResize) {
        return
      }
      if (showTooltip || showAllTip) {
        $table.handleTargetLeaveEvent(evnt)
      }
    }
  }
  return [
    type === 'html' && XEUtils.isString(content)
      ? h('span', {
        class: 'vxe-cell--title',
        domProps: {
          innerHTML: content
        },
        on: ons
      })
      : h('span', {
        class: 'vxe-cell--title',
        on: ons
      }, getSlotVNs(content))
  ]
}

function getFooterContent (h: CreateElement, params: VxeTableDefines.CellRenderFooterParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, column, _columnIndex, row, items } = params
  const { slots, editRender, cellRender, footerFormatter } = column
  const renderOpts = editRender || cellRender
  if (slots && slots.footer) {
    return $table.callSlot(slots.footer, params, h)
  }
  let itemValue = ''
  // 兼容老模式
  if (XEUtils.isArray(items)) {
    itemValue = items[_columnIndex]
  } else {
    itemValue = XEUtils.get(row, column.field)
  }
  const footParams = Object.assign(params, {
    itemValue
  })
  if (footerFormatter) {
    if (XEUtils.isFunction(footerFormatter)) {
      return `${footerFormatter(footParams)}`
    }
    const isArr = XEUtils.isArray(footerFormatter)
    const gFormatOpts = isArr ? formats.get(footerFormatter[0]) : formats.get(footerFormatter)
    const footerFormatMethod = gFormatOpts ? gFormatOpts.tableFooterCellFormatMethod : null
    if (footerFormatMethod) {
      return `${isArr ? footerFormatMethod(footParams, ...footerFormatter.slice(1)) : footerFormatMethod(footParams)}`
    }
    return ''
  }
  if (renderOpts) {
    const compConf = renderer.get(renderOpts.name)
    const rtFooter = compConf ? (compConf.renderTableFooter || compConf.renderFooter) : null
    if (rtFooter) {
      return getSlotVNs(rtFooter.call($table, h, renderOpts, footParams))
    }
  }
  return [
    formatText(itemValue, 1)
  ]
}

function getDefaultCellLabel (params: VxeTableDefines.CellRenderBodyParams) {
  const { $table, row, column } = params
  return formatText($table.getCellLabel(row, column), 1)
}

function renderCellHandle (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & {
  $table: VxeTableConstructor & VxeTablePrivateMethods;
}) {
  const { column, row, $table } = params
  const tableProps = $table
  const tableReactData = $table as unknown as TableReactData
  const { editConfig } = tableProps
  const { isRowGroupStatus } = tableReactData
  const { type, treeNode, rowGroupNode, editRender } = column
  const aggregateOpts = $table.computeAggregateOpts
  const { mode } = aggregateOpts
  const checkboxOpts = $table.computeCheckboxOpts
  const editOpts = $table.computeEditOpts
  const isDeepCell = treeNode || (isRowGroupStatus && (mode === 'column' ? column.field === row.groupField : rowGroupNode))
  switch (type) {
    case 'seq':
      return isDeepCell ? Cell.renderDeepIndexCell(h, params) : Cell.renderSeqCell(h, params)
    case 'radio':
      return isDeepCell ? Cell.renderDeepRadioCell(h, params) : Cell.renderRadioCell(h, params)
    case 'checkbox':
      return checkboxOpts.checkField ? (isDeepCell ? Cell.renderDeepSelectionCellByProp(h, params) : Cell.renderCheckboxCellByProp(h, params)) : (isDeepCell ? Cell.renderDeepSelectionCell(h, params) : Cell.renderCheckboxCell(h, params))
    case 'expand':
      return Cell.renderExpandCell(h, params)
    case 'html':
      return isDeepCell ? Cell.renderDeepHTMLCell(h, params) : Cell.renderHTMLCell(h, params)
  }
  if (isEnableConf(editConfig) && editRender) {
    return editOpts.mode === 'cell' ? (isDeepCell ? Cell.renderDeepCellEdit(h, params) : Cell.renderCellEdit(h, params)) : (isDeepCell ? Cell.renderDeepRowEdit(h, params) : Cell.renderRowEdit(h, params))
  }
  return isDeepCell ? Cell.renderDeepCell(h, params) : Cell.renderDefaultCell(h, params)
}

function renderHeaderHandle (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & {
  $table: VxeTableConstructor & VxeTablePrivateMethods;
}) {
  const { column, $table } = params
  const tableProps = $table
  const { editConfig } = tableProps
  const { type, filters, sortable, editRender } = column
  switch (type) {
    case 'seq':
      return Cell.renderSeqHeader(h, params)
    case 'radio':
      return Cell.renderRadioHeader(h, params)
    case 'checkbox':
      return Cell.renderCheckboxHeader(h, params)
    case 'html':
      if (filters && sortable) {
        return Cell.renderSortAndFilterHeader(h, params)
      } else if (sortable) {
        return Cell.renderSortHeader(h, params)
      } else if (filters) {
        return Cell.renderFilterHeader(h, params)
      }
      break
  }
  if (editConfig && editRender) {
    return Cell.renderEditHeader(h, params)
  } else if (filters && sortable) {
    return Cell.renderSortAndFilterHeader(h, params)
  } else if (sortable) {
    return Cell.renderSortHeader(h, params)
  } else if (filters) {
    return Cell.renderFilterHeader(h, params)
  }
  return Cell.renderDefaultHeader(h, params)
}

function renderFooterHandle (h: CreateElement, params: VxeTableDefines.CellRenderFooterParams & {
  $table: VxeTableConstructor & VxeTablePrivateMethods;
}) {
  return Cell.renderDefaultFooter(h, params)
}

export const Cell = {
  createColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, _vm: any) {
    const { type } = _vm
    const renConfs: any = {
      renderHeader: renderHeaderHandle,
      renderCell: renderCellHandle,
      renderFooter: renderFooterHandle
    }
    if (type === 'expand') {
      renConfs.renderData = Cell.renderExpandData
    }
    return createColumn($xeTable, _vm, renConfs)
  },
  /**
   * 列头标题
   */
  renderHeaderTitle (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const { slots, editRender, cellRender } = column
    const renderOpts = editRender || cellRender
    if (slots && slots.header) {
      return renderTitleContent(h, params, $table.callSlot(slots.header, params, h))
    }
    if (renderOpts) {
      const compConf = renderer.get(renderOpts.name)
      const rtHeader = compConf ? (compConf.renderTableHeader || compConf.renderHeader) : null
      if (rtHeader) {
        return getSlotVNs(renderTitleContent(h, params, rtHeader.call($table, h, renderOpts, params)))
      }
    }
    return renderTitleContent(h, params, formatText(column.getTitle(), 1))
  },
  renderDefaultHeader (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return renderHeaderCellBaseVNs(h, params, Cell.renderHeaderTitle(h, params))
  },
  renderDefaultCell (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, row, column } = params
    const tableReactData = $table as unknown as TableReactData
    const tableInternalData = $table as unknown as TableInternalData
    const { isRowGroupStatus } = tableReactData
    const { field, slots, editRender, cellRender, rowGroupNode, aggFunc } = column
    const renderOpts = editRender || cellRender
    if (slots && slots.default) {
      return renderCellBaseVNs(h, params, $table.callSlot(slots.default, params, h))
    }
    if (renderOpts) {
      const compConf = renderer.get(renderOpts.name)
      const rtDefault = compConf ? (compConf.renderTableDefault || compConf.renderDefault) : null
      const rtCell = compConf ? (compConf.renderTableCell || compConf.renderCell) : null
      const renderFn = editRender ? rtCell : rtDefault
      if (renderFn) {
        return renderCellBaseVNs(h, params, getSlotVNs(renderFn.call($table, h, renderOpts, Object.assign({ $type: editRender ? 'edit' : 'cell' }, params))))
      }
    }
    let cellValue: string | number | null = ''
    if (isRowGroupStatus && field && row.isAggregate) {
      const aggRow: VxeTableDefines.AggregateRowInfo = row
      const { fullColumnFieldData } = tableInternalData
      const aggregateOpts = $table.computeAggregateOpts
      const { mode, showTotal, totalMethod, countFields, contentMethod, mapChildrenField } = aggregateOpts
      const aggMethod = aggregateOpts.aggregateMethod || aggregateOpts.countMethod
      const groupField = aggRow.groupField
      const groupContent = aggRow.groupContent
      const childList = mapChildrenField ? (aggRow[mapChildrenField] || []) : []
      const childCount = aggRow.childCount
      const colRest = fullColumnFieldData[groupField] || {}
      const ctParams = {
        $table,
        groupField,
        groupColumn: (colRest ? colRest.column : null) as VxeTableDefines.ColumnInfo,
        column,
        groupValue: groupContent,
        children: childList,
        childCount,
        aggValue: null as any,

        /**
         * 已废弃
         * @deprecated
         */
        totalValue: childCount
      }
      if (mode === 'column' ? field === aggRow.groupField : rowGroupNode) {
        cellValue = groupContent
        if (contentMethod) {
          cellValue = `${contentMethod(ctParams)}`
        }
        if (showTotal) {
          cellValue = getI18n('vxe.table.rowGroupContentTotal', [cellValue, totalMethod ? totalMethod(ctParams) : childCount, childCount])
        }
      } else if ($table.getPivotTableAggregateCellAggValue) {
        cellValue = $table.getPivotTableAggregateCellAggValue(params)
      } else if (aggFunc === true || (countFields && countFields.includes(field))) {
        if (aggMethod) {
          ctParams.aggValue = childCount
          cellValue = `${aggMethod(ctParams)}`
        }
      }
    } else {
      cellValue = $table.getCellLabel(row, column)
    }
    const cellPlaceholder = editRender ? editRender.placeholder : ''
    return renderCellBaseVNs(h, params, [
      h('span', {
        class: 'vxe-cell--label'
      }, [
        // 如果设置占位符
        editRender && eqEmptyValue(cellValue)
          ? h('span', {
            class: 'vxe-cell--placeholder'
          }, formatText(getFuncText(cellPlaceholder), 1))
          : h('span', formatText(cellValue, 1))
      ])
    ])
  },
  renderDeepCell (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(h, params, Cell.renderDefaultCell.call(this, h, params))
  },
  renderDefaultFooter (h: CreateElement, params: VxeTableDefines.CellRenderFooterParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return getFooterContent(h, params)
  },

  /**
   * 行分组
   */
  renderRowGroupBtn (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, cellVNodes: VxeComponentSlotType[]) {
    const { $table } = params
    const tableReactData = $table as unknown as TableReactData
    const tableInternalData = $table as unknown as TableInternalData
    const { row, level } = params
    const { rowGroupExpandedFlag } = tableReactData
    const { rowGroupExpandedMaps } = tableInternalData
    const aggregateOpts = $table.computeAggregateOpts
    const { padding, indent } = aggregateOpts
    const rowid = getRowid($table, row)
    const isExpand = !!rowGroupExpandedFlag && !!rowGroupExpandedMaps[rowid]
    return h('div', {
      class: ['vxe-row-group--tree-node', {
        'is--expanded': isExpand
      }],
      style: padding && indent
        ? {
            paddingLeft: `${level * indent}px`
          }
        : undefined
    }, [
      row.isAggregate
        ? h('span', {
          class: 'vxe-row-group--node-btn',
          on: {
            click (evnt: MouseEvent) {
              $table.triggerRowGroupExpandEvent(evnt, params)
            }
          }
        }, [
          h('i', {
            class: isExpand ? getIcon().TABLE_ROW_GROUP_OPEN : getIcon().TABLE_ROW_GROUP_CLOSE
          })
        ])
        : renderEmptyElement($table),
      h('div', {
        class: 'vxe-row-group-cell'
      }, cellVNodes)
    ])
  },
  /**
   * 树
   */
  renderTreeNodeBtn (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, cellVNodes: VxeComponentSlotType[]) {
    const { $table, isHidden } = params
    const tableReactData = $table as unknown as TableReactData
    const tableInternalData = $table as unknown as TableInternalData
    const { treeExpandedFlag } = tableReactData
    const { fullAllDataRowIdData, treeExpandedMaps, treeExpandLazyLoadedMaps } = tableInternalData
    const treeOpts = $table.computeTreeOpts
    const { row, column, level } = params
    const { slots } = column
    const { padding, indent, lazy, trigger, iconLoaded, showIcon, iconOpen, iconClose } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const rowChilds = row[childrenField]
    const hasChild = rowChilds && rowChilds.length
    const iconSlot = slots ? slots.icon : null
    let hasLazyChilds = false
    let isActive = false
    let isLazyLoading = false
    let isLazyLoaded = false
    const ons: Record<string, any> = {}
    if (iconSlot) {
      return $table.callSlot(iconSlot, params, h)
    }
    if (!isHidden) {
      const rowid = getRowid($table, row)
      isActive = !!treeExpandedFlag && !!treeExpandedMaps[rowid]
      if (lazy) {
        const rest = fullAllDataRowIdData[rowid]
        isLazyLoading = !!treeExpandLazyLoadedMaps[rowid]
        hasLazyChilds = row[hasChildField]
        isLazyLoaded = !!rest.treeLoaded
      }
    }
    if (!trigger || trigger === 'default') {
      ons.click = (evnt: MouseEvent) => {
        $table.triggerTreeExpandEvent(evnt, params)
      }
    }
    return [
      h('div', {
        class: ['vxe-cell--tree-node', {
          'is--active': isActive
        }],
        style: padding && indent
          ? {
              paddingLeft: `${level * indent}px`
            }
          : undefined
      }, [
        showIcon && (lazy ? (isLazyLoaded ? hasChild : (hasChild || hasLazyChilds)) : hasChild)
          ? [
              h('div', {
                class: 'vxe-cell--tree-btn',
                on: ons
              }, [
                h('i', {
                  class: isLazyLoading ? (iconLoaded || getIcon().TABLE_TREE_LOADED) : (isActive ? (iconOpen || getIcon().TABLE_TREE_OPEN) : (iconClose || getIcon().TABLE_TREE_CLOSE))
                })
              ])
            ]
          : null,
        h('div', {
          class: 'vxe-tree-cell'
        }, cellVNodes)
      ])
    ]
  },
  /**
   * 层级节点。
   * 行分组、树结构
   */
  renderDeepNodeBtn (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, cellVNodes: VxeComponentSlotType[]) {
    const { $table, row, column } = params
    const { rowGroupNode } = column
    const tableReactData = $table as unknown as TableReactData
    const { rowGroupList } = tableReactData
    if (rowGroupList.length) {
      const aggregateOpts = $table.computeAggregateOpts
      const { mode } = aggregateOpts
      if (mode === 'column' ? column.field === row.groupField : rowGroupNode) {
        return [Cell.renderRowGroupBtn(h, params, cellVNodes)]
      }
    }
    return [Cell.renderTreeNodeBtn(h, params, cellVNodes)]
  },

  /**
   * 序号
   */
  renderSeqHeader (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const { slots } = column
    return renderHeaderCellBaseVNs(h, params, renderTitleContent(h, params, slots && slots.header ? $table.callSlot(slots.header, params, h) : formatText(column.getTitle(), 1)))
  },
  renderSeqCell (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const tableProps = $table
    const { treeConfig } = tableProps
    const seqOpts = $table.computeSeqOpts
    const { slots } = column
    if (slots && slots.default) {
      return renderCellBaseVNs(h, params, $table.callSlot(slots.default, params, h))
    }
    const { seq } = params
    const seqMethod = seqOpts.seqMethod
    return renderCellBaseVNs(h, params, [
      h('span', `${formatText(seqMethod ? seqMethod(params) : treeConfig ? seq : (seqOpts.startIndex || 0) + (seq as number), 1)}`)
    ])
  },
  renderDeepIndexCell (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(h, params, Cell.renderSeqCell(h, params))
  },

  /**
   * 单选
   */
  renderRadioHeader (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const { slots } = column
    const headerSlot = slots ? slots.header : null
    const titleSlot = slots ? slots.title : null
    return renderHeaderCellBaseVNs(h, params,
      renderTitleContent(h, params, headerSlot
        ? $table.callSlot(headerSlot, params, h)
        : [
            h('span', {
              class: 'vxe-radio--label'
            }, titleSlot ? $table.callSlot(titleSlot, params, h) : formatText(column.getTitle(), 1))
          ])
    )
  },
  renderRadioCell (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column, isHidden } = params
    const tableReactData = $table as unknown as TableReactData
    const { selectRadioRow } = tableReactData
    const radioOpts = $table.computeRadioOpts
    const { slots } = column
    const { labelField, checkMethod, visibleMethod } = radioOpts
    const { row } = params
    const defaultSlot = slots ? slots.default : null
    const radioSlot = slots ? slots.radio : null
    const isChecked = row === selectRadioRow
    const isVisible = !visibleMethod || visibleMethod({ $table, row })
    let isDisabled = !!checkMethod
    let on: any
    if (!isHidden) {
      on = {
        click (evnt: any) {
          if (!isDisabled && isVisible) {
            $table.triggerRadioRowEvent(evnt, params)
          }
        }
      }
      if (checkMethod) {
        isDisabled = !checkMethod({ $table, row })
      }
    }
    const radioParams = { ...params, checked: isChecked, disabled: isDisabled, visible: isVisible }
    if (radioSlot) {
      return renderCellBaseVNs(h, params, $table.callSlot(radioSlot, radioParams, h))
    }
    const radioVNs = []
    if (isVisible) {
      radioVNs.push(
        h('span', {
          class: ['vxe-radio--icon', isChecked ? getIcon().TABLE_RADIO_CHECKED : getIcon().TABLE_RADIO_UNCHECKED]
        })
      )
    }
    if (defaultSlot || labelField) {
      radioVNs.push(
        h('span', {
          class: 'vxe-radio--label'
        }, defaultSlot ? $table.callSlot(defaultSlot, radioParams, h) : XEUtils.get(row, labelField))
      )
    }
    return renderCellBaseVNs(h, params, [
      h('span', {
        class: ['vxe-cell--radio', {
          'is--checked': isChecked,
          'is--disabled': isDisabled
        }],
        on
      }, radioVNs)
    ])
  },
  renderDeepRadioCell (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(h, params, Cell.renderRadioCell(h, params))
  },

  /**
   * 多选
   */
  renderCheckboxHeader (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column, isHidden } = params
    const tableReactData = $table as unknown as TableReactData
    const { isAllSelected: isAllCheckboxSelected, isIndeterminate: isAllCheckboxIndeterminate } = tableReactData
    const isAllCheckboxDisabled = $table.computeIsAllCheckboxDisabled
    const { slots } = column
    const headerSlot = slots ? slots.header : null
    const titleSlot = slots ? slots.title : null
    const checkboxOpts = $table.computeCheckboxOpts
    const { checkStrictly, showHeader, headerTitle } = checkboxOpts
    const colTitle = column.getTitle()
    const ons: Record<string, any> = {}
    if (!isHidden) {
      ons.click = (evnt: any) => {
        if (!isAllCheckboxDisabled) {
          $table.triggerCheckAllEvent(evnt, !isAllCheckboxSelected)
        }
      }
    }
    const checkboxParams = { ...params, checked: isAllCheckboxSelected, disabled: isAllCheckboxDisabled, indeterminate: isAllCheckboxIndeterminate }
    if (headerSlot) {
      return renderHeaderCellBaseVNs(h, params, renderTitleContent(h, checkboxParams, $table.callSlot(headerSlot, checkboxParams, h)))
    }
    if (checkStrictly ? !showHeader : showHeader === false) {
      return renderHeaderCellBaseVNs(h, params, renderTitleContent(h, checkboxParams, [
        h('span', {
          class: 'vxe-checkbox--label'
        }, titleSlot ? $table.callSlot(titleSlot, checkboxParams, h) : colTitle)
      ]))
    }
    return renderHeaderCellBaseVNs(h, params,
      renderTitleContent(h, checkboxParams, [
        h('span', {
          class: ['vxe-cell--checkbox', {
            'is--checked': isAllCheckboxSelected,
            'is--disabled': isAllCheckboxDisabled,
            'is--indeterminate': isAllCheckboxIndeterminate
          }],
          attrs: {
            title: XEUtils.eqNull(headerTitle) ? getI18n('vxe.table.allTitle') : `${headerTitle || ''}`
          },
          on: ons
        }, [
          h('span', {
            class: ['vxe-checkbox--icon', isAllCheckboxIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllCheckboxSelected ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
          })
        ].concat(titleSlot || colTitle
          ? [
              h('span', {
                class: 'vxe-checkbox--label'
              }, titleSlot ? $table.callSlot(titleSlot, checkboxParams, h) : colTitle)
            ]
          : []))
      ])
    )
  },
  renderCheckboxCell (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, row, column, isHidden } = params
    const tableProps = $table
    const tableReactData = $table as unknown as TableReactData
    const tableInternalData = $table as unknown as TableInternalData
    const { treeConfig } = tableProps
    const { updateCheckboxFlag, isRowGroupStatus } = tableReactData
    const { selectCheckboxMaps, treeIndeterminateRowMaps } = tableInternalData
    const checkboxOpts = $table.computeCheckboxOpts
    const { labelField, checkMethod, visibleMethod } = checkboxOpts
    const { slots } = column
    const defaultSlot = slots ? slots.default : null
    const checkboxSlot = slots ? slots.checkbox : null
    let indeterminate = false
    let isChecked = false
    const isVisible = !visibleMethod || visibleMethod({ $table, row })
    let isDisabled = !!checkMethod
    const ons: Record<string, any> = {}
    if (!isHidden) {
      const rowid = getRowid($table, row)
      isChecked = !!updateCheckboxFlag && !!selectCheckboxMaps[rowid]
      ons.click = (evnt: any) => {
        if (!isDisabled && isVisible) {
          $table.triggerCheckRowEvent(evnt, params, !isChecked)
        }
      }
      if (checkMethod) {
        isDisabled = !checkMethod({ $table, row })
      }
      if (treeConfig || isRowGroupStatus) {
        indeterminate = !!treeIndeterminateRowMaps[rowid]
      }
    }
    const checkboxParams = { ...params, checked: isChecked, disabled: isDisabled, visible: isVisible, indeterminate }
    if (checkboxSlot) {
      return renderCellBaseVNs(h, params, $table.callSlot(checkboxSlot, checkboxParams, h))
    }
    const checkVNs = []
    if (isVisible) {
      checkVNs.push(
        h('span', {
          class: ['vxe-checkbox--icon', indeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
        })
      )
    }
    if (defaultSlot || labelField) {
      checkVNs.push(
        h('span', {
          class: 'vxe-checkbox--label'
        }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams, h) : XEUtils.get(row, labelField))
      )
    }
    return renderCellBaseVNs(h, params, [
      h('span', {
        class: ['vxe-cell--checkbox', {
          'is--checked': isChecked,
          'is--disabled': isDisabled,
          'is--indeterminate': indeterminate,
          'is--hidden': !isVisible
        }],
        on: ons
      }, checkVNs)
    ])
  },
  renderDeepSelectionCell (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(h, params, Cell.renderCheckboxCell(h, params))
  },
  renderCheckboxCellByProp (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, row, column, isHidden } = params
    const tableProps = $table
    const tableReactData = $table as unknown as TableReactData
    const tableInternalData = $table as unknown as TableInternalData
    const { treeConfig } = tableProps
    const { updateCheckboxFlag, isRowGroupStatus } = tableReactData
    const { treeIndeterminateRowMaps } = tableInternalData
    const checkboxOpts = $table.computeCheckboxOpts
    const { labelField, checkField, checkMethod, visibleMethod } = checkboxOpts
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
    const { slots } = column
    const defaultSlot = slots ? slots.default : null
    const checkboxSlot = slots ? slots.checkbox : null
    let isIndeterminate = false
    let isChecked = false
    const isVisible = !visibleMethod || visibleMethod({ $table, row })
    let isDisabled = !!checkMethod
    const ons: Record<string, any> = {}
    if (!isHidden) {
      const rowid = getRowid($table, row)
      isChecked = !!updateCheckboxFlag && XEUtils.get(row, checkField)
      ons.click = (evnt: any) => {
        if (!isDisabled && isVisible) {
          $table.triggerCheckRowEvent(evnt, params, !isChecked)
        }
      }
      if (checkMethod) {
        isDisabled = !checkMethod({ $table, row })
      }
      if (treeConfig || isRowGroupStatus) {
        isIndeterminate = !!treeIndeterminateRowMaps[rowid]
      }
    }
    const checkboxParams = { ...params, checked: isChecked, disabled: isDisabled, visible: isVisible, indeterminate: isIndeterminate }
    if (checkboxSlot) {
      return renderCellBaseVNs(h, params, $table.callSlot(checkboxSlot, checkboxParams, h))
    }
    const checkVNs = []
    if (isVisible) {
      checkVNs.push(
        h('span', {
          class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
        })
      )
    }
    if (defaultSlot || labelField) {
      checkVNs.push(
        h('span', {
          class: 'vxe-checkbox--label'
        }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams, h) : XEUtils.get(row, labelField))
      )
    }
    return renderCellBaseVNs(h, params, [
      h('span', {
        class: ['vxe-cell--checkbox', {
          'is--checked': isChecked,
          'is--disabled': isDisabled,
          'is--indeterminate': indeterminateField && !isChecked ? row[indeterminateField] : isIndeterminate,
          'is--hidden': !isVisible
        }],
        on: ons
      }, checkVNs)
    ])
  },
  renderDeepSelectionCellByProp (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(h, params, Cell.renderCheckboxCellByProp(h, params))
  },

  /**
   * 展开行
   */
  renderExpandCell (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, isHidden, row, column } = params
    const tableReactData = $table as unknown as TableReactData
    const tableInternalData = $table as unknown as TableInternalData
    const { isRowGroupStatus } = tableReactData
    const { rowExpandedMaps, rowExpandLazyLoadedMaps } = tableInternalData
    const expandOpts = $table.computeExpandOpts
    const { lazy, labelField, iconLoaded, showIcon, iconOpen, iconClose, visibleMethod } = expandOpts
    const { slots } = column
    const defaultSlot = slots ? slots.default : null
    const iconSlot = slots ? slots.icon : null
    let isActive = false
    let isLazyLoading = false
    if (isRowGroupStatus && row.isAggregate) {
      return renderCellBaseVNs(h, params, [])
    }
    if (iconSlot) {
      return renderCellBaseVNs(h, params, $table.callSlot(iconSlot, params, h))
    }
    if (!isHidden) {
      const rowid = getRowid($table, row)
      isActive = !!rowExpandedMaps[rowid]
      if (lazy) {
        isLazyLoading = !!rowExpandLazyLoadedMaps[rowid]
      }
    }
    return renderCellBaseVNs(h, params, [
      showIcon && (!visibleMethod || visibleMethod(params))
        ? h('span', {
          class: ['vxe-table--expanded', {
            'is--active': isActive
          }],
          on: {
            mousedown (evnt: MouseEvent) {
              evnt.stopPropagation()
            },
            click (evnt: MouseEvent) {
              $table.triggerRowExpandEvent(evnt, params)
            }
          }
        }, [
          h('i', {
            class: ['vxe-table--expand-btn', isLazyLoading ? (iconLoaded || getIcon().TABLE_EXPAND_LOADED) : (isActive ? (iconOpen || getIcon().TABLE_EXPAND_OPEN) : (iconClose || getIcon().TABLE_EXPAND_CLOSE))]
          })
        ])
        : renderEmptyElement($table),
      defaultSlot || labelField
        ? h('span', {
          class: 'vxe-table--expand-label'
        }, defaultSlot ? $table.callSlot(defaultSlot, params, h) : XEUtils.get(row, labelField))
        : renderEmptyElement($table)
    ])
  },
  renderExpandData (h: CreateElement, params: VxeTableDefines.CellRenderDataParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const { slots, contentRender } = column
    if (slots && slots.content) {
      return $table.callSlot(slots.content, params, h)
    }
    if (contentRender) {
      const compConf = renderer.get(contentRender.name)
      const rtExpand = compConf ? (compConf.renderTableExpand || compConf.renderExpand) : null
      if (rtExpand) {
        return getSlotVNs(rtExpand.call($table, h, contentRender, params))
      }
    }
    return []
  },

  /**
   * HTML 标签
   */
  renderHTMLCell (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const { slots } = column
    if (slots && slots.default) {
      return renderCellBaseVNs(h, params, $table.callSlot(slots.default, params, h))
    }
    return renderCellBaseVNs(h, params, [
      h('span', {
        class: 'vxe-cell--html',
        domProps: {
          innerHTML: getDefaultCellLabel(params)
        }
      })
    ])
  },
  renderDeepHTMLCell (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(h, params, Cell.renderHTMLCell(h, params))
  },

  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return renderHeaderCellBaseVNs(
      h,
      params,
      Cell.renderHeaderTitle(h, params).concat(Cell.renderSortIcon(h, params).concat(Cell.renderFilterIcon(h, params)))
    )
  },

  /**
   * 排序
   */
  renderSortHeader (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return renderHeaderCellBaseVNs(
      h,
      params,
      Cell.renderHeaderTitle(h, params).concat(Cell.renderSortIcon(h, params))
    )
  },
  renderSortIcon (h: CreateElement, params: (VxeTableDefines.CellRenderHeaderParams | VxeTableDefines.CellRenderHeaderParams) & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const sortOpts = $table.computeSortOpts
    const { showIcon, allowBtn, ascTitle, descTitle, iconLayout, iconAsc, iconDesc, iconVisibleMethod } = sortOpts
    if (showIcon && (!iconVisibleMethod || iconVisibleMethod(params))) {
      return [
        h('span', {
          class: ['vxe-cell--sort', `vxe-cell--sort-${iconLayout}-layout`]
        }, [
          h('i', {
            class: ['vxe-sort--asc-btn', iconAsc || getIcon().TABLE_SORT_ASC, {
              'sort--active': column.order === 'asc'
            }],
            attrs: {
              title: XEUtils.eqNull(ascTitle) ? getI18n('vxe.table.sortAsc') : `${ascTitle || ''}`
            },
            on: allowBtn
              ? {
                  click (evnt: any) {
                    evnt.stopPropagation()
                    $table.triggerSortEvent(evnt, column, 'asc')
                  }
                }
              : undefined
          }),
          h('i', {
            class: ['vxe-sort--desc-btn', iconDesc || getIcon().TABLE_SORT_DESC, {
              'sort--active': column.order === 'desc'
            }],
            attrs: {
              title: XEUtils.eqNull(descTitle) ? getI18n('vxe.table.sortDesc') : `${descTitle || ''}`
            },
            on: allowBtn
              ? {
                  click (evnt: any) {
                    evnt.stopPropagation()
                    $table.triggerSortEvent(evnt, column, 'desc')
                  }
                }
              : undefined
          })
        ])
      ]
    }
    return []
  },

  /**
   * 筛选
   */
  renderFilterHeader (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return renderHeaderCellBaseVNs(h, params, Cell.renderHeaderTitle(h, params).concat(Cell.renderFilterIcon(h, params)))
  },
  renderFilterIcon (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column, hasFilter } = params
    const tableReactData = $table as unknown as TableReactData
    const { filterStore } = tableReactData
    const filterOpts = $table.computeFilterOpts
    const { showIcon, iconNone, iconMatch, iconVisibleMethod } = filterOpts
    if (showIcon && (!iconVisibleMethod || iconVisibleMethod(params))) {
      return [
        h('span', {
          class: ['vxe-cell--filter', {
            'is--active': filterStore.visible && filterStore.column === column
          }],
          on: {
            click (evnt: MouseEvent) {
              if ($table.triggerFilterEvent) {
                $table.triggerFilterEvent(evnt, params.column, params)
              }
            }
          }
        }, [
          h('i', {
            class: ['vxe-filter--btn', hasFilter ? (iconMatch || getIcon().TABLE_FILTER_MATCH) : (iconNone || getIcon().TABLE_FILTER_NONE)],
            attrs: {
              title: getI18n('vxe.table.filter')
            }
          })
        ])
      ]
    }
    return []
  },

  /**
   * 可编辑
   */
  renderEditHeader (h: CreateElement, params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const tableProps = $table
    const { editConfig, editRules } = tableProps
    const editOpts = $table.computeEditOpts
    const { sortable, filters, editRender } = column
    let isRequired = false
    if (editRules) {
      const columnRules = XEUtils.get(editRules, column.field)
      if (columnRules) {
        isRequired = columnRules.some((rule: any) => rule.required)
      }
    }
    let editIconVNs: VNode[] = []
    if (isEnableConf(editConfig)) {
      editIconVNs = [
        isRequired && editOpts.showAsterisk
          ? h('i', {
            class: 'vxe-cell--required-icon'
          }, [
            h('i', {
              class: 'vxe-cell--required-icon'
            })
          ])
          : renderEmptyElement($table),
        isEnableConf(editRender) && editOpts.showIcon
          ? h('i', {
            class: 'vxe-cell--edit-icon'
          }, [
            h('i', {
              class: editOpts.icon || getIcon().TABLE_EDIT
            })
          ])
          : renderEmptyElement($table)
      ]
    }
    return renderHeaderCellBaseVNs(h, params,
      editIconVNs.concat(Cell.renderHeaderTitle(h, params))
        .concat(sortable ? Cell.renderSortIcon(h, params) : [])
        .concat(filters ? Cell.renderFilterIcon(h, params) : [])
    )
  },
  // 行格编辑模式
  renderRowEdit (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const tableReactData = $table as unknown as TableReactData
    const { editStore } = tableReactData
    const { actived } = editStore
    const { editRender } = column
    return Cell.runRenderer(h, params, this, isEnableConf(editRender) && actived && actived.row === params.row)
  },
  renderDeepRowEdit (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(h, params, Cell.renderRowEdit(h, params))
  },
  // 单元格编辑模式
  renderCellEdit (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const tableReactData = $table as unknown as TableReactData
    const { editStore } = tableReactData
    const { actived } = editStore
    const { editRender } = column
    return Cell.runRenderer(h, params, this, isEnableConf(editRender) && actived && actived.row === params.row && actived.column === params.column)
  },
  renderDeepCellEdit (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(h, params, Cell.renderCellEdit(h, params))
  },
  runRenderer (h: CreateElement, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, _vm: any, isEdit: boolean) {
    const { $table, column } = params
    const { slots, editRender, formatter } = column
    const compConf = renderer.get(editRender.name)
    const rtEdit = compConf ? (compConf.renderTableEdit || compConf.renderEdit) : null
    const cellParams = Object.assign({ $type: '', isEdit }, params)
    if (isEdit) {
      if (slots && slots.edit) {
        return $table.callSlot(slots.edit, cellParams, h)
      }
      if (rtEdit) {
        return getSlotVNs(rtEdit.call($table, h, editRender, cellParams))
      }
      return []
    }
    if (slots && slots.default) {
      return renderCellBaseVNs(h, params, $table.callSlot(slots.default, cellParams, h))
    }
    if (formatter) {
      return renderCellBaseVNs(h, params, [
        h('span', {
          class: 'vxe-cell--label'
        }, [getDefaultCellLabel(cellParams)])
      ])
    }
    return Cell.renderDefaultCell.call(_vm, h, cellParams)
  }
} as any

export default Cell
