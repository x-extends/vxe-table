import { h, VNode } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { getFuncText, isEnableConf, formatText, eqEmptyValue } from '../../ui/src/utils'
import { updateCellTitle } from '../../ui/src/dom'
import { createColumn, getRowid } from './util'
import { getSlotVNs } from '../../ui/src/vn'

import type { VxeTableConstructor, VxeTableDefines, VxeTablePrivateMethods, VxeComponentSlotType } from '../../../types'

const { getI18n, getIcon, renderer, formats, renderEmptyElement } = VxeUI

function renderTitlePrefixIcon (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, column } = params
  const titlePrefix = column.titlePrefix || column.titleHelp
  if (titlePrefix) {
    return h('span', {
      class: ['vxe-cell-title-prefix-icon', titlePrefix.iconStatus ? `theme--${titlePrefix.iconStatus}` : ''],
      onMouseenter (evnt: MouseEvent) {
        $table.triggerHeaderTitleEvent(evnt, titlePrefix, params)
      },
      onMouseleave (evnt: MouseEvent) {
        $table.handleTargetLeaveEvent(evnt)
      }
    }, [
      h('i', {
        class: titlePrefix.icon || getIcon().TABLE_TITLE_PREFIX
      })
    ])
  }
  return renderEmptyElement($table)
}

function renderTitleSuffixIcon (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, column } = params
  const titleSuffix = column.titleSuffix
  if (titleSuffix) {
    return h('span', {
      class: ['vxe-cell-title-suffix-icon', titleSuffix.iconStatus ? `theme--${titleSuffix.iconStatus}` : ''],
      onMouseenter (evnt: MouseEvent) {
        $table.triggerHeaderTitleEvent(evnt, titleSuffix, params)
      },
      onMouseleave (evnt: MouseEvent) {
        $table.handleTargetLeaveEvent(evnt)
      }
    }, [
      h('i', {
        class: titleSuffix.icon || getIcon().TABLE_TITLE_SUFFIX
      })
    ])
  }
  return renderEmptyElement($table)
}

function renderCellDragIcon (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, column } = params
  const { context } = $table
  const tableSlots = context.slots
  const tableProps = $table.props
  const { slots } = column
  const { dragConfig } = tableProps
  const { computeRowDragOpts } = $table.getComputeMaps()
  const rowDragOpts = computeRowDragOpts.value
  const { icon, trigger, disabledMethod } = rowDragOpts
  const rDisabledMethod = disabledMethod || (dragConfig ? dragConfig.rowDisabledMethod : null)
  const isDisabled = rDisabledMethod && rDisabledMethod(params)
  const rowDragIconSlot = (slots ? slots.rowDragIcon || slots['row-drag-icon'] : null) || tableSlots.rowDragIcon || tableSlots['row-drag-icon']
  const ons: Record<string, any> = {}
  if (trigger !== 'cell') {
    ons.onMousedown = (evnt: MouseEvent) => {
      if (!isDisabled) {
        $table.handleCellDragMousedownEvent(evnt, params)
      }
    }
    ons.onMouseup = $table.handleCellDragMouseupEvent
  }
  return h('span', {
    key: 'dg',
    class: ['vxe-cell--drag-handle', {
      'is--disabled': isDisabled
    }],
    ...ons
  }, rowDragIconSlot
    ? $table.callSlot(rowDragIconSlot, params)
    : [
        h('i', {
          class: icon || (dragConfig ? dragConfig.rowIcon : '') || getIcon().TABLE_DRAG_ROW
        })
      ])
}

function renderCellBaseVNs (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, content: VxeComponentSlotType | VxeComponentSlotType[]) {
  const { $table, column, level } = params
  const { dragSort } = column
  const tableProps = $table.props
  const { treeConfig, dragConfig } = tableProps
  const { computeRowOpts, computeRowDragOpts, computeTreeOpts } = $table.getComputeMaps()
  const rowOpts = computeRowOpts.value
  const rowDragOpts = computeRowDragOpts.value
  const treeOpts = computeTreeOpts.value
  const { showIcon, isPeerDrag, isCrossDrag, visibleMethod } = rowDragOpts
  const rVisibleMethod = visibleMethod || (dragConfig ? dragConfig.rowVisibleMethod : null)
  const vns: VxeComponentSlotType[] = []
  if (dragSort && rowOpts.drag && ((showIcon || (dragConfig ? dragConfig.showRowIcon : false)) && (!rVisibleMethod || rVisibleMethod(params)))) {
    if (treeConfig) {
      if (treeOpts.transform && (isPeerDrag || isCrossDrag || !level)) {
        vns.push(
          renderCellDragIcon(params)
        )
      }
    } else {
      vns.push(
        renderCellDragIcon(params)
      )
    }
  }
  return vns.concat(XEUtils.isArray(content) ? content : [content])
}

function renderHeaderCellDragIcon (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, column } = params
  const { context } = $table
  const tableSlots = context.slots
  const { slots } = column
  const { computeColumnOpts, computeColumnDragOpts } = $table.getComputeMaps()
  const columnOpts = computeColumnOpts.value
  const columnDragOpts = computeColumnDragOpts.value
  const { showIcon, icon, trigger, isPeerDrag, isCrossDrag, visibleMethod, disabledMethod } = columnDragOpts
  if (columnOpts.drag && showIcon && (!visibleMethod || visibleMethod(params))) {
    if (!column.fixed && (isPeerDrag || isCrossDrag || !column.parentId)) {
      const isDisabled = disabledMethod && disabledMethod(params)
      const columnDragIconSlot = (slots ? slots.columnDragIcon || slots['column-drag-icon'] : null) || tableSlots.columnDragIcon || tableSlots['column-drag-icon']
      const ons: Record<string, any> = {}
      if (trigger !== 'cell') {
        ons.onMousedown = (evnt: MouseEvent) => {
          if (!isDisabled) {
            $table.handleHeaderCellDragMousedownEvent(evnt, params)
          }
        }
        ons.onMouseup = $table.handleHeaderCellDragMouseupEvent
      }
      return h('span', {
        key: 'dg',
        class: ['vxe-cell--drag-handle', {
          'is--disabled': isDisabled
        }],
        ...ons
      }, columnDragIconSlot
        ? $table.callSlot(columnDragIconSlot, params)
        : [
            h('i', {
              class: icon || getIcon().TABLE_DRAG_COLUMN
            })
          ])
    }
  }
  return renderEmptyElement($table)
}

function renderHeaderCellBaseVNs (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, content: VNode | VNode[]) {
  const vns = [
    renderTitlePrefixIcon(params),
    renderHeaderCellDragIcon(params),
    ...(XEUtils.isArray(content) ? content : [content]),
    renderTitleSuffixIcon(params)
  ]
  return vns
}

function getRenderDefaultColumnTitle (column: VxeTableDefines.ColumnInfo, content: VxeComponentSlotType | VxeComponentSlotType[]) {
  if (column.type === 'html' && XEUtils.isString(content)) {
    return h('span', {
      key: 'ch',
      innerHTML: content
    })
  }
  return h('span', {
    key: 'ct'
  }, getSlotVNs(content))
}

function renderTitleContent (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, content: VxeComponentSlotType | VxeComponentSlotType[]) {
  const { $table, column } = params
  const tableProps = $table.props
  const tableReactData = $table.reactData
  const { computeTooltipOpts } = $table.getComputeMaps()
  const { showHeaderOverflow: allColumnHeaderOverflow } = tableProps
  const { isRowGroupStatus } = tableReactData
  const { showHeaderOverflow } = column
  const tooltipOpts = computeTooltipOpts.value
  const showAllTip = tooltipOpts.showAll
  const headOverflow = XEUtils.eqNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
  const showTitle = headOverflow === 'title'
  const showTooltip = headOverflow === true || headOverflow === 'tooltip'
  const ons: Record<string, any> = {}
  if (showTitle || showTooltip || showAllTip) {
    ons.onMouseenter = (evnt: MouseEvent) => {
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
    ons.onMouseleave = (evnt: MouseEvent) => {
      if (tableReactData.isDragResize) {
        return
      }
      if (showTooltip || showAllTip) {
        $table.handleTargetLeaveEvent(evnt)
      }
    }
  }
  const titleVN = getRenderDefaultColumnTitle(column, content)
  return [
    h('span', {
      class: 'vxe-cell--title',
      ...ons
    }, isRowGroupStatus && column.aggFunc && $table.getPivotTableAggregateRenderColTitles
      ? $table.getPivotTableAggregateRenderColTitles(column, titleVN)
      : [
          titleVN
        ])
  ]
}

function getFooterContent (params: VxeTableDefines.CellRenderFooterParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
  const { $table, column, _columnIndex, items, row } = params
  const { slots, editRender, cellRender, footerFormatter } = column
  const renderOpts = editRender || cellRender
  const footerSlot = slots ? slots.footer : null
  if (footerSlot) {
    return $table.callSlot(footerSlot, params)
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
      return [
        h('span', {
          class: 'vxe-cell--label'
        }, `${footerFormatter(footParams)}`)
      ]
    }
    const isArr = XEUtils.isArray(footerFormatter)
    const gFormatOpts = isArr ? formats.get(footerFormatter[0]) : formats.get(footerFormatter)
    const footerFormatMethod = gFormatOpts ? gFormatOpts.tableFooterCellFormatMethod : null
    if (footerFormatMethod) {
      return [
        h('span', {
          class: 'vxe-cell--label'
        }, `${isArr ? footerFormatMethod(footParams, ...footerFormatter.slice(1)) : footerFormatMethod(footParams)}`)
      ]
    }
    return [
      h('span', {
        class: 'vxe-cell--label'
      }, '')
    ]
  }
  if (renderOpts) {
    const compConf = renderer.get(renderOpts.name)
    if (compConf) {
      const rtFooter = compConf.renderTableFooter || compConf.renderFooter
      if (rtFooter) {
        return getSlotVNs(rtFooter(renderOpts, footParams))
      }
    }
  }
  return [
    h('span', {
      class: 'vxe-cell--label'
    }, formatText(itemValue, 1))
  ]
}

function getDefaultCellLabel (params: VxeTableDefines.CellRenderBodyParams) {
  const { $table, row, column } = params
  return formatText($table.getCellLabel(row, column), 1)
}

function renderCellHandle (params: VxeTableDefines.CellRenderBodyParams & {
  $table: VxeTableConstructor & VxeTablePrivateMethods;
}) {
  const { column, row, $table } = params
  const tableProps = $table.props
  const tableReactData = $table.reactData
  const { isRowGroupStatus } = tableReactData
  const { editConfig } = tableProps
  const { type, treeNode, rowGroupNode, editRender } = column
  const { computeEditOpts, computeCheckboxOpts, computeAggregateOpts } = $table.getComputeMaps()
  const aggregateOpts = computeAggregateOpts.value
  const { mode } = aggregateOpts
  const checkboxOpts = computeCheckboxOpts.value
  const editOpts = computeEditOpts.value
  const isDeepCell = treeNode || (isRowGroupStatus && (mode === 'column' ? column.field === row.groupField : rowGroupNode))
  switch (type) {
    case 'seq':
      return isDeepCell ? Cell.renderDeepIndexCell(params) : Cell.renderSeqCell(params)
    case 'radio':
      return isDeepCell ? Cell.renderDeepRadioCell(params) : Cell.renderRadioCell(params)
    case 'checkbox':
      return checkboxOpts.checkField ? (isDeepCell ? Cell.renderDeepSelectionCellByProp(params) : Cell.renderCheckboxCellByProp(params)) : (isDeepCell ? Cell.renderDeepSelectionCell(params) : Cell.renderCheckboxCell(params))
    case 'expand':
      return Cell.renderExpandCell(params)
    case 'html':
      return isDeepCell ? Cell.renderDeepHTMLCell(params) : Cell.renderHTMLCell(params)
  }
  if (isEnableConf(editConfig) && editRender) {
    return editOpts.mode === 'cell' ? (isDeepCell ? Cell.renderDeepCellEdit(params) : Cell.renderCellEdit(params)) : (isDeepCell ? Cell.renderDeepRowEdit(params) : Cell.renderRowEdit(params))
  }
  return isDeepCell ? Cell.renderDeepCell(params) : Cell.renderDefaultCell(params)
}

function renderHeaderHandle (params: VxeTableDefines.CellRenderHeaderParams & {
  $table: VxeTableConstructor & VxeTablePrivateMethods;
}) {
  const { column, $table } = params
  const tableProps = $table.props
  const { editConfig } = tableProps
  const { type, filters, sortable, editRender } = column
  switch (type) {
    case 'seq':
      return Cell.renderSeqHeader(params)
    case 'radio':
      return Cell.renderRadioHeader(params)
    case 'checkbox':
      return Cell.renderCheckboxHeader(params)
    case 'html':
      if (filters && sortable) {
        return Cell.renderSortAndFilterHeader(params)
      } else if (sortable) {
        return Cell.renderSortHeader(params)
      } else if (filters) {
        return Cell.renderFilterHeader(params)
      }
      break
  }
  if (editConfig && editRender) {
    return Cell.renderEditHeader(params)
  } else if (filters && sortable) {
    return Cell.renderSortAndFilterHeader(params)
  } else if (sortable) {
    return Cell.renderSortHeader(params)
  } else if (filters) {
    return Cell.renderFilterHeader(params)
  }
  return Cell.renderDefaultHeader(params)
}

function renderFooterHandle (params: VxeTableDefines.CellRenderFooterParams & {
  $table: VxeTableConstructor & VxeTablePrivateMethods;
}) {
  return Cell.renderDefaultFooter(params)
}

export const Cell = {
  createColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, columnOpts: VxeTableDefines.ColumnOptions | VxeTableDefines.ColumnInfo) {
    const { type } = columnOpts
    const renConfs: any = {
      renderHeader: renderHeaderHandle,
      renderCell: renderCellHandle,
      renderFooter: renderFooterHandle
    }
    if (type === 'expand') {
      renConfs.renderData = Cell.renderExpandData
    }
    return createColumn($xeTable, columnOpts, renConfs)
  },
  /**
   * 列头标题
   */
  renderHeaderTitle (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const { slots, editRender, cellRender } = column
    const renderOpts = editRender || cellRender
    const headerSlot = slots ? slots.header : null
    if (headerSlot) {
      return renderTitleContent(params, $table.callSlot(headerSlot, params))
    }
    if (renderOpts) {
      const compConf = renderer.get(renderOpts.name)
      if (compConf) {
        const rtHeader = compConf.renderTableHeader || compConf.renderHeader
        if (rtHeader) {
          return renderTitleContent(params, getSlotVNs(rtHeader(renderOpts, params)))
        }
      }
    }
    return renderTitleContent(params, formatText(column.getTitle(), 1))
  },
  renderDefaultHeader (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return renderHeaderCellBaseVNs(params, Cell.renderHeaderTitle(params))
  },
  renderDefaultCell (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, row, column } = params
    const tableReactData = $table.reactData
    const tableInternalData = $table.internalData
    const { isRowGroupStatus } = tableReactData
    const { field, slots, editRender, cellRender, rowGroupNode, aggFunc } = column
    const renderOpts = editRender || cellRender
    const defaultSlot = slots ? slots.default : null
    let cellValue: string | number | null = ''
    if (isRowGroupStatus && field && row.isAggregate) {
      const aggRow: VxeTableDefines.AggregateRowInfo = row
      const { fullColumnFieldData } = tableInternalData
      const { computeAggregateOpts } = $table.getComputeMaps()
      const aggregateOpts = computeAggregateOpts.value
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
      if (defaultSlot) {
        return renderCellBaseVNs(params, $table.callSlot(defaultSlot, params))
      }
      if (renderOpts) {
        const compConf = renderer.get(renderOpts.name)
        if (compConf) {
          const rtCell = compConf.renderTableCell || compConf.renderCell
          const rtDefault = compConf.renderTableDefault || compConf.renderDefault
          const renderFn = editRender ? rtCell : rtDefault
          if (renderFn) {
            return renderCellBaseVNs(params, getSlotVNs(renderFn(renderOpts, Object.assign({ $type: editRender ? 'edit' : 'cell' }, params))))
          }
        }
      }
      cellValue = $table.getCellLabel(row, column)
    }
    const cellPlaceholder = editRender ? editRender.placeholder : ''
    return renderCellBaseVNs(params, [
      h('span', {
        class: 'vxe-cell--label'
      }, [
        // 如果设置占位符
        editRender && eqEmptyValue(cellValue)
          ? h('span', {
            class: 'vxe-cell--placeholder'
          }, formatText(getFuncText(cellPlaceholder), 1))
          : h('span', formatText(cellValue, 1))
      ]
      )
    ])
  },
  renderDeepCell (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(params, Cell.renderDefaultCell(params) as VNode[])
  },
  renderDefaultFooter (params: VxeTableDefines.CellRenderFooterParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return getFooterContent(params)
  },

  /**
   * 行分组
   */
  renderRowGroupBtn (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, cellVNodes: VxeComponentSlotType[]) {
    const { $table } = params
    const tableReactData = $table.reactData
    const tableInternalData = $table.internalData
    const { row, level } = params
    const { computeAggregateOpts } = $table.getComputeMaps()
    const { rowGroupExpandedFlag } = tableReactData
    const { rowGroupExpandedMaps } = tableInternalData
    const aggregateOpts = computeAggregateOpts.value
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
          onClick (evnt: MouseEvent) {
            $table.triggerRowGroupExpandEvent(evnt, params)
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
  renderTreeNodeBtn (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, cellVNodes: VxeComponentSlotType[]) {
    const { $table, isHidden } = params
    const tableReactData = $table.reactData
    const tableInternalData = $table.internalData
    const { row, column, level } = params
    const { slots } = column
    const iconSlot = slots ? slots.icon : null
    if (iconSlot) {
      return $table.callSlot(iconSlot, params)
    }
    const { computeTreeOpts } = $table.getComputeMaps()
    const { treeExpandedFlag } = tableReactData
    const { fullAllDataRowIdData, treeExpandedMaps, treeExpandLazyLoadedMaps } = tableInternalData
    const treeOpts = computeTreeOpts.value
    const { padding, indent, lazy, trigger, iconLoaded, showIcon, iconOpen, iconClose } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const rowChilds = row[childrenField]
    const hasChild = rowChilds && rowChilds.length
    let hasLazyChilds = false
    let isActive = false
    let isLazyLoading = false
    let isLazyLoaded = false
    const ons: Record<string, any> = {}
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
      ons.onClick = (evnt: MouseEvent) => {
        $table.triggerTreeExpandEvent(evnt, params)
      }
    }
    return h('div', {
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
              ...ons
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
  },
  /**
   * 层级节点。
   * 行分组、树结构
   */
  renderDeepNodeBtn (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, cellVNodes: VxeComponentSlotType[]) {
    const { $table, row, column } = params
    const { rowGroupNode } = column
    const tableReactData = $table.reactData
    const { rowGroupList } = tableReactData
    if (rowGroupList.length) {
      const { computeAggregateOpts } = $table.getComputeMaps()
      const aggregateOpts = computeAggregateOpts.value
      const { mode } = aggregateOpts
      if (mode === 'column' ? column.field === row.groupField : rowGroupNode) {
        return [Cell.renderRowGroupBtn(params, cellVNodes)]
      }
    }
    return [Cell.renderTreeNodeBtn(params, cellVNodes)]
  },

  /**
   * 序号
   */
  renderSeqHeader (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const { slots } = column
    const headerSlot = slots ? slots.header : null
    return renderHeaderCellBaseVNs(params, renderTitleContent(params, headerSlot ? $table.callSlot(headerSlot, params) : formatText(column.getTitle(), 1)))
  },
  renderSeqCell (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const tableProps = $table.props
    const { treeConfig } = tableProps
    const { computeSeqOpts } = $table.getComputeMaps()
    const seqOpts = computeSeqOpts.value
    const { slots } = column
    const defaultSlot = slots ? slots.default : null
    if (defaultSlot) {
      return renderCellBaseVNs(params, $table.callSlot(defaultSlot, params))
    }
    const { seq } = params
    const seqMethod = seqOpts.seqMethod
    return renderCellBaseVNs(params, [
      h('span', `${formatText(seqMethod ? seqMethod(params) : treeConfig ? seq : (seqOpts.startIndex || 0) + (seq as number), 1)}`)
    ])
  },
  renderDeepIndexCell (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(params, Cell.renderSeqCell(params) as VNode[])
  },

  /**
   * 单选
   */
  renderRadioHeader (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const { slots } = column
    const headerSlot = slots ? slots.header : null
    const titleSlot = slots ? slots.title : null
    return renderHeaderCellBaseVNs(params,
      renderTitleContent(params, headerSlot
        ? $table.callSlot(headerSlot, params)
        : [
            h('span', {
              class: 'vxe-radio--label'
            }, titleSlot ? $table.callSlot(titleSlot, params) : formatText(column.getTitle(), 1))
          ])
    )
  },
  renderRadioCell (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column, isHidden } = params
    const tableReactData = $table.reactData
    const { computeRadioOpts } = $table.getComputeMaps()
    const { selectRadioRow } = tableReactData
    const radioOpts = computeRadioOpts.value
    const { slots } = column
    const { labelField, checkMethod, visibleMethod } = radioOpts
    const { row } = params
    const defaultSlot = slots ? slots.default : null
    const radioSlot = slots ? slots.radio : null
    const isChecked = $table.eqRow(row, selectRadioRow)
    const isVisible = !visibleMethod || visibleMethod({ $table, row })
    let isDisabled = !!checkMethod
    let ons
    if (!isHidden) {
      ons = {
        onClick (evnt: Event) {
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
      return renderCellBaseVNs(params, $table.callSlot(radioSlot, radioParams))
    }
    const radioVNs: VNode[] = []
    if (isVisible) {
      radioVNs.push(
        h('span', {
          class: ['vxe-radio--icon', isChecked ? getIcon().TABLE_RADIO_CHECKED : (isDisabled ? getIcon().TABLE_RADIO_DISABLED_UNCHECKED : getIcon().TABLE_RADIO_UNCHECKED)]
        })
      )
    }
    if (defaultSlot || labelField) {
      radioVNs.push(
        h('span', {
          class: 'vxe-radio--label'
        }, defaultSlot ? $table.callSlot(defaultSlot, radioParams) : XEUtils.get(row, labelField as string))
      )
    }
    return renderCellBaseVNs(params, [
      h('span', {
        class: ['vxe-cell--radio', {
          'is--checked': isChecked,
          'is--disabled': isDisabled
        }],
        ...ons
      }, radioVNs)
    ])
  },
  renderDeepRadioCell (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(params, Cell.renderRadioCell(params))
  },

  /**
   * 多选
   */
  renderCheckboxHeader (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column, isHidden } = params
    const tableReactData = $table.reactData
    const { computeIsAllCheckboxDisabled, computeCheckboxOpts } = $table.getComputeMaps()
    const { isAllSelected: isAllCheckboxSelected, isIndeterminate: isAllCheckboxIndeterminate } = tableReactData
    const isAllCheckboxDisabled = computeIsAllCheckboxDisabled.value
    const { slots } = column
    const headerSlot = slots ? slots.header : null
    const titleSlot = slots ? slots.title : null
    const checkboxOpts = computeCheckboxOpts.value
    const { checkStrictly, showHeader, headerTitle } = checkboxOpts
    const colTitle = column.getTitle()
    const ons: Record<string, any> = {}
    if (!isHidden) {
      ons.onClick = (evnt: MouseEvent) => {
        if (!isAllCheckboxDisabled) {
          $table.triggerCheckAllEvent(evnt, !isAllCheckboxSelected)
        }
      }
    }
    const checkboxParams = { ...params, checked: isAllCheckboxSelected, disabled: isAllCheckboxDisabled, indeterminate: isAllCheckboxIndeterminate }
    if (headerSlot) {
      return renderHeaderCellBaseVNs(params, renderTitleContent(checkboxParams, $table.callSlot(headerSlot, checkboxParams)))
    }
    if (checkStrictly ? !showHeader : showHeader === false) {
      return renderHeaderCellBaseVNs(params, renderTitleContent(checkboxParams, [
        h('span', {
          class: 'vxe-checkbox--label'
        }, titleSlot ? $table.callSlot(titleSlot, checkboxParams) : colTitle)
      ]))
    }
    return renderHeaderCellBaseVNs(params,
      renderTitleContent(checkboxParams, [
        h('span', {
          class: ['vxe-cell--checkbox', {
            'is--checked': isAllCheckboxSelected,
            'is--disabled': isAllCheckboxDisabled,
            'is--indeterminate': isAllCheckboxIndeterminate
          }],
          title: XEUtils.eqNull(headerTitle) ? getI18n('vxe.table.allTitle') : `${headerTitle || ''}`,
          ...ons
        }, [
          h('span', {
            class: ['vxe-checkbox--icon', isAllCheckboxIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllCheckboxSelected ? getIcon().TABLE_CHECKBOX_CHECKED : (isAllCheckboxDisabled ? getIcon().TABLE_CHECKBOX_DISABLED_UNCHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED))]
          })
        ].concat(titleSlot || colTitle
          ? [
              h('span', {
                class: 'vxe-checkbox--label'
              }, titleSlot ? $table.callSlot(titleSlot, checkboxParams) : colTitle)
            ]
          : []))
      ])
    )
  },
  renderCheckboxCell (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, row, column, isHidden } = params
    const tableProps = $table.props
    const tableReactData = $table.reactData
    const tableInternalData = $table.internalData
    const { treeConfig } = tableProps
    const { updateCheckboxFlag, isRowGroupStatus } = tableReactData
    const { selectCheckboxMaps, treeIndeterminateRowMaps } = tableInternalData
    const { computeCheckboxOpts } = $table.getComputeMaps()
    const checkboxOpts = computeCheckboxOpts.value
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
      ons.onClick = (evnt: MouseEvent) => {
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
      return renderCellBaseVNs(params, $table.callSlot(checkboxSlot, checkboxParams))
    }
    const checkVNs: VNode[] = []
    if (isVisible) {
      checkVNs.push(
        h('span', {
          class: ['vxe-checkbox--icon', indeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : (isDisabled ? getIcon().TABLE_CHECKBOX_DISABLED_UNCHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED))]
        })
      )
    }
    if (defaultSlot || labelField) {
      checkVNs.push(
        h('span', {
          class: 'vxe-checkbox--label'
        }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams) : XEUtils.get(row, labelField as string))
      )
    }
    return renderCellBaseVNs(params, [
      h('span', {
        class: ['vxe-cell--checkbox', {
          'is--checked': isChecked,
          'is--disabled': isDisabled,
          'is--indeterminate': indeterminate,
          'is--hidden': !isVisible
        }],
        ...ons
      }, checkVNs)
    ])
  },
  renderDeepSelectionCell (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(params, Cell.renderCheckboxCell(params))
  },
  renderCheckboxCellByProp (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, row, column, isHidden } = params
    const tableProps = $table.props
    const tableReactData = $table.reactData
    const tableInternalData = $table.internalData
    const { treeConfig } = tableProps
    const { updateCheckboxFlag, isRowGroupStatus } = tableReactData
    const { treeIndeterminateRowMaps } = tableInternalData
    const { computeCheckboxOpts } = $table.getComputeMaps()
    const checkboxOpts = computeCheckboxOpts.value
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
      ons.onClick = (evnt: MouseEvent) => {
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
      return renderCellBaseVNs(params, $table.callSlot(checkboxSlot, checkboxParams))
    }
    const checkVNs: VNode[] = []
    if (isVisible) {
      checkVNs.push(
        h('span', {
          class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : (isDisabled ? getIcon().TABLE_CHECKBOX_DISABLED_UNCHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED))]
        })
      )
      if (defaultSlot || labelField) {
        checkVNs.push(
          h('span', {
            class: 'vxe-checkbox--label'
          }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams) : XEUtils.get(row, labelField as string))
        )
      }
    }
    return renderCellBaseVNs(params, [
      h('span', {
        class: ['vxe-cell--checkbox', {
          'is--checked': isChecked,
          'is--disabled': isDisabled,
          'is--indeterminate': indeterminateField && !isChecked ? row[indeterminateField] : isIndeterminate,
          'is--hidden': !isVisible
        }],
        ...ons
      }, checkVNs)
    ])
  },
  renderDeepSelectionCellByProp (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(params, Cell.renderCheckboxCellByProp(params))
  },

  /**
   * 展开行
   */
  renderExpandCell (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, isHidden, row, column } = params
    const tableReactData = $table.reactData
    const tableInternalData = $table.internalData
    const { isRowGroupStatus } = tableReactData
    const { rowExpandedMaps, rowExpandLazyLoadedMaps } = tableInternalData
    const { computeExpandOpts } = $table.getComputeMaps()
    const expandOpts = computeExpandOpts.value
    const { lazy, labelField, iconLoaded, showIcon, iconOpen, iconClose, visibleMethod } = expandOpts
    const { slots } = column
    const defaultSlot = slots ? slots.default : null
    const iconSlot = slots ? slots.icon : null
    let isActive = false
    let isLazyLoading = false
    if (isRowGroupStatus && row.isAggregate) {
      return renderCellBaseVNs(params, [])
    }
    if (iconSlot) {
      return renderCellBaseVNs(params, $table.callSlot(iconSlot, params))
    }
    if (!isHidden) {
      const rowid = getRowid($table, row)
      isActive = !!rowExpandedMaps[rowid]
      if (lazy) {
        isLazyLoading = !!rowExpandLazyLoadedMaps[rowid]
      }
    }
    return renderCellBaseVNs(params, [
      showIcon && (!visibleMethod || visibleMethod(params))
        ? h('span', {
          class: ['vxe-table--expanded', {
            'is--active': isActive
          }],
          onMousedown (evnt) {
            evnt.stopPropagation()
          },
          onClick (evnt: MouseEvent) {
            $table.triggerRowExpandEvent(evnt, params)
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
        }, defaultSlot ? $table.callSlot(defaultSlot, params) : XEUtils.get(row, labelField as string))
        : renderEmptyElement($table)
    ])
  },
  renderExpandData (params: VxeTableDefines.CellRenderDataParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const { slots, contentRender } = column
    const contentSlot = slots ? slots.content : null
    if (contentSlot) {
      return $table.callSlot(contentSlot, params)
    }
    if (contentRender) {
      const compConf = renderer.get(contentRender.name)
      if (compConf) {
        const rtExpand = compConf.renderTableExpand || compConf.renderExpand
        if (rtExpand) {
          return getSlotVNs(rtExpand(contentRender, params))
        }
      }
    }
    return []
  },

  /**
   * HTML 标签
   */
  renderHTMLCell (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const { slots } = column
    const defaultSlot = slots ? slots.default : null
    if (defaultSlot) {
      return renderCellBaseVNs(params, $table.callSlot(defaultSlot, params))
    }
    return renderCellBaseVNs(params, [
      h('span', {
        class: 'vxe-cell--html',
        innerHTML: getDefaultCellLabel(params)
      })
    ])
  },
  renderDeepHTMLCell (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(params, Cell.renderHTMLCell(params))
  },

  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return renderHeaderCellBaseVNs(
      params,
      Cell.renderHeaderTitle(params).concat(Cell.renderSortIcon(params).concat(Cell.renderFilterIcon(params)))
    )
  },

  /**
   * 排序
   */
  renderSortHeader (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return renderHeaderCellBaseVNs(
      params,
      Cell.renderHeaderTitle(params).concat(Cell.renderSortIcon(params))
    )
  },
  renderSortIcon (params: (VxeTableDefines.CellRenderHeaderParams | VxeTableDefines.CellRenderHeaderParams) & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const { computeSortOpts } = $table.getComputeMaps()
    const sortOpts = computeSortOpts.value
    const { showIcon, allowBtn, ascTitle, descTitle, iconLayout, iconAsc, iconDesc, iconVisibleMethod } = sortOpts
    const { order } = column
    if (showIcon && (!iconVisibleMethod || iconVisibleMethod(params))) {
      return [
        h('span', {
          class: ['vxe-cell--sort', `vxe-cell--sort-${iconLayout}-layout`]
        }, [
          h('i', {
            class: ['vxe-sort--asc-btn', iconAsc || getIcon().TABLE_SORT_ASC, {
              'sort--active': order === 'asc'
            }],
            title: XEUtils.eqNull(ascTitle) ? getI18n('vxe.table.sortAsc') : `${ascTitle || ''}`,
            onClick: allowBtn
              ? (evnt: Event) => {
                  evnt.stopPropagation()
                  $table.triggerSortEvent(evnt, column, 'asc')
                }
              : undefined
          }),
          h('i', {
            class: ['vxe-sort--desc-btn', iconDesc || getIcon().TABLE_SORT_DESC, {
              'sort--active': order === 'desc'
            }],
            title: XEUtils.eqNull(descTitle) ? getI18n('vxe.table.sortDesc') : `${descTitle || ''}`,
            onClick: allowBtn
              ? (evnt: Event) => {
                  evnt.stopPropagation()
                  $table.triggerSortEvent(evnt, column, 'desc')
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
  renderFilterHeader (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return renderHeaderCellBaseVNs(params, Cell.renderHeaderTitle(params).concat(Cell.renderFilterIcon(params)))
  },
  renderFilterIcon (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column, hasFilter } = params
    const tableReactData = $table.reactData
    const { filterStore } = tableReactData
    const { computeFilterOpts } = $table.getComputeMaps()
    const filterOpts = computeFilterOpts.value
    const { showIcon, iconNone, iconMatch, iconVisibleMethod } = filterOpts
    if (showIcon && (!iconVisibleMethod || iconVisibleMethod(params))) {
      return [
        h('span', {
          class: ['vxe-cell--filter', {
            'is--active': filterStore.visible && filterStore.column === column
          }],
          onClick (evnt) {
            if ($table.triggerFilterEvent) {
              $table.triggerFilterEvent(evnt, params.column, params)
            }
          }
        }, [
          h('i', {
            class: ['vxe-filter--btn', hasFilter ? (iconMatch || getIcon().TABLE_FILTER_MATCH) : (iconNone || getIcon().TABLE_FILTER_NONE)],
            title: getI18n('vxe.table.filter')
          })
        ])
      ]
    }
    return []
  },

  /**
   * 可编辑
   */
  renderEditHeader (params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const tableProps = $table.props
    const { computeEditOpts } = $table.getComputeMaps()
    const { editConfig, editRules } = tableProps
    const editOpts = computeEditOpts.value
    const { sortable, filters, editRender } = column
    let isRequired = false
    if (editRules) {
      const columnRules = XEUtils.get(editRules, column.field) as VxeTableDefines.ValidatorRule[]
      if (columnRules) {
        isRequired = columnRules.some((rule) => rule.required)
      }
    }
    let editIconVNs: VNode[] = []
    if (isEnableConf(editConfig)) {
      editIconVNs = [
        isRequired && editOpts.showAsterisk
          ? h('span', {
            class: 'vxe-cell--required-icon'
          }, [
            h('i')
          ])
          : renderEmptyElement($table),
        isEnableConf(editRender) && editOpts.showIcon
          ? h('span', {
            class: 'vxe-cell--edit-icon'
          }, [
            h('i', {
              class: editOpts.icon || getIcon().TABLE_EDIT
            })
          ])
          : renderEmptyElement($table)
      ]
    }
    return renderHeaderCellBaseVNs(params,
      editIconVNs.concat(Cell.renderHeaderTitle(params))
        .concat(sortable ? Cell.renderSortIcon(params) : [])
        .concat(filters ? Cell.renderFilterIcon(params) : [])
    )
  },
  // 行格编辑模式
  renderRowEdit (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const tableReactData = $table.reactData
    const { editStore } = tableReactData
    const { actived } = editStore
    const { editRender } = column
    return Cell.runRenderer(params, isEnableConf(editRender) && actived && actived.row === params.row)
  },
  renderDeepRowEdit (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(params, Cell.renderRowEdit(params) as VNode[])
  },
  // 单元格编辑模式
  renderCellEdit (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const { $table, column } = params
    const tableReactData = $table.reactData
    const { editStore } = tableReactData
    const { actived } = editStore
    const { editRender } = column
    return Cell.runRenderer(params, isEnableConf(editRender) && actived && actived.row === params.row && actived.column === params.column)
  },
  renderDeepCellEdit (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    return Cell.renderDeepNodeBtn(params, Cell.renderCellEdit(params) as VNode[])
  },
  runRenderer (params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }, isEdit: boolean) {
    const { $table, column } = params
    const { slots, editRender, formatter } = column
    const defaultSlot = slots ? slots.default : null
    const editSlot = slots ? slots.edit : null
    const compConf = renderer.get(editRender.name)
    const rtEdit = compConf ? (compConf.renderTableEdit || compConf.renderEdit) : null
    const cellParams = Object.assign({ $type: '', isEdit }, params)
    if (isEdit) {
      cellParams.$type = 'edit'
      if (editSlot) {
        return $table.callSlot(editSlot, cellParams)
      }
      if (rtEdit) {
        return getSlotVNs(rtEdit(editRender, cellParams))
      }
      return []
    }
    if (defaultSlot) {
      return renderCellBaseVNs(params, $table.callSlot(defaultSlot, cellParams))
    }
    if (formatter) {
      return renderCellBaseVNs(params, [
        h('span', {
          class: 'vxe-cell--label'
        }, getDefaultCellLabel(cellParams))
      ])
    }
    return Cell.renderDefaultCell(cellParams)
  }
}

export default Cell
