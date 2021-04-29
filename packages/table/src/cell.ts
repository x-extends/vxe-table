import { h, VNode } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { VXETable } from '../../v-x-e-table'
import { getFuncText, isEnableConf, formatText, eqEmptyValue } from '../../tools/utils'
import { updateCellTitle } from '../../tools/dom'
import { createColumn } from './util'

import { VxeColumnProps, VxeTableConstructor, VxeTableDefines, VxeTablePrivateMethods } from '../../../types/all'

function renderHelpIcon (params: VxeTableDefines.CellRenderHeaderParams) {
  const { $table, column } = params
  const { titleHelp } = column
  return titleHelp ? [
    h('i', {
      class: ['vxe-cell-help-icon', titleHelp.icon || GlobalConfig.icon.TABLE_HELP],
      onMouseenter (evnt: MouseEvent) {
        $table.triggerHeaderHelpEvent(evnt, params)
      },
      onMouseleave (evnt: MouseEvent) {
        $table.handleTargetLeaveEvent(evnt)
      }
    })
  ] : []
}

function renderTitleContent (params: VxeTableDefines.CellRenderHeaderParams, content: VNode[] | string[] | string) {
  const { $table, column } = params
  const { props, internalData } = $table
  const { computeTooltipOpts } = $table.getComputeMaps()
  const { showHeaderOverflow: allColumnHeaderOverflow } = props
  const { type, showHeaderOverflow } = column
  const tooltipOpts = computeTooltipOpts.value
  const showAllTip = tooltipOpts.showAll
  const headOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
  const showTitle = headOverflow === 'title'
  const showTooltip = headOverflow === true || headOverflow === 'tooltip'
  const ons: any = {}
  if (showTitle || showTooltip || showAllTip) {
    ons.onMouseenter = (evnt: MouseEvent) => {
      if (internalData._isResize) {
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
      if (internalData._isResize) {
        return
      }
      if (showTooltip || showAllTip) {
        $table.handleTargetLeaveEvent(evnt)
      }
    }
  }
  return [
    type === 'html' && XEUtils.isString(content) ? h('span', {
      class: 'vxe-cell--title',
      innerHTML: content,
      ...ons
    }) : h('span', {
      class: 'vxe-cell--title',
      ...ons
    }, content)
  ]
}

function getFooterContent (params: VxeTableDefines.CellRenderFooterParams) {
  const { $table, column, _columnIndex, items } = params
  const { slots, editRender, cellRender } = column
  const renderOpts = editRender || cellRender
  const footerSlot = slots ? slots.footer : null
  if (footerSlot) {
    return $table.callSlot(footerSlot, params)
  }
  if (renderOpts) {
    const compConf = VXETable.renderer.get(renderOpts.name)
    if (compConf && compConf.renderFooter) {
      return compConf.renderFooter(renderOpts, params)
    }
  }
  return [formatText(items[_columnIndex], 1)]
}

function getDefaultCellLabel (params: VxeTableDefines.CellRenderBodyParams) {
  const { $table, row, column } = params
  return formatText($table.getCellLabel(row, column), 1)
}

export const Cell = {
  createColumn ($xetable: VxeTableConstructor & VxeTablePrivateMethods, columnOpts: VxeColumnProps) {
    const { type, sortable, filters, editRender, treeNode } = columnOpts
    const { props } = $xetable
    const { editConfig } = props
    const { computeEditOpts, computeCheckboxOpts } = $xetable.getComputeMaps()
    const checkboxOpts = computeCheckboxOpts.value
    const editOpts = computeEditOpts.value
    const renConfs: any = {
      renderHeader: Cell.renderDefaultHeader,
      renderCell: treeNode ? Cell.renderTreeCell : Cell.renderDefaultCell,
      renderFooter: Cell.renderDefaultFooter
    }
    switch (type) {
      case 'seq':
        renConfs.renderHeader = Cell.renderIndexHeader
        renConfs.renderCell = treeNode ? Cell.renderTreeIndexCell : Cell.renderIndexCell
        break
      case 'radio':
        renConfs.renderHeader = Cell.renderRadioHeader
        renConfs.renderCell = treeNode ? Cell.renderTreeRadioCell : Cell.renderRadioCell
        break
      case 'checkbox':
        renConfs.renderHeader = Cell.renderSelectionHeader
        renConfs.renderCell = checkboxOpts.checkField ? (treeNode ? Cell.renderTreeSelectionCellByProp : Cell.renderSelectionCellByProp) : (treeNode ? Cell.renderTreeSelectionCell : Cell.renderSelectionCell)
        break
      case 'expand':
        renConfs.renderCell = Cell.renderExpandCell
        renConfs.renderData = Cell.renderExpandData
        break
      case 'html':
        renConfs.renderCell = treeNode ? Cell.renderTreeHTMLCell : Cell.renderHTMLCell
        if (filters && sortable) {
          renConfs.renderHeader = Cell.renderSortAndFilterHeader
        } else if (sortable) {
          renConfs.renderHeader = Cell.renderSortHeader
        } else if (filters) {
          renConfs.renderHeader = Cell.renderFilterHeader
        }
        break
      default:
        if (editConfig && editRender) {
          renConfs.renderHeader = Cell.renderEditHeader
          renConfs.renderCell = editOpts.mode === 'cell' ? (treeNode ? Cell.renderTreeCellEdit : Cell.renderCellEdit) : (treeNode ? Cell.renderTreeRowEdit : Cell.renderRowEdit)
        } else if (filters && sortable) {
          renConfs.renderHeader = Cell.renderSortAndFilterHeader
        } else if (sortable) {
          renConfs.renderHeader = Cell.renderSortHeader
        } else if (filters) {
          renConfs.renderHeader = Cell.renderFilterHeader
        }
    }
    return createColumn($xetable, columnOpts, renConfs)
  },
  /**
   * 单元格
   */
  renderHeaderTitle (params: VxeTableDefines.CellRenderHeaderParams) {
    const { $table, column } = params
    const { slots, editRender, cellRender } = column
    const renderOpts = editRender || cellRender
    const headerSlot = slots ? slots.header : null
    if (headerSlot) {
      return renderTitleContent(params, $table.callSlot(headerSlot, params))
    }
    if (renderOpts) {
      const compConf = VXETable.renderer.get(renderOpts.name)
      if (compConf && compConf.renderHeader) {
        return renderTitleContent(params, compConf.renderHeader(renderOpts, params))
      }
    }
    return renderTitleContent(params, formatText(column.getTitle(), 1))
  },
  renderDefaultHeader (params: VxeTableDefines.CellRenderHeaderParams) {
    return renderHelpIcon(params).concat(Cell.renderHeaderTitle(params))
  },
  renderDefaultCell (params: VxeTableDefines.CellRenderBodyParams) {
    const { $table, row, column } = params
    const { slots, editRender, cellRender } = column
    const renderOpts = editRender || cellRender
    const defaultSlot = slots ? slots.default : null
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params)
    }
    if (renderOpts) {
      const funName = editRender ? 'renderCell' : 'renderDefault'
      const compConf = VXETable.renderer.get(renderOpts.name)
      const compFn = compConf ? compConf[funName] : null
      if (compFn) {
        return compFn(renderOpts, Object.assign({ $type: editRender ? 'edit' : 'cell' }, params))
      }
    }
    const cellValue = $table.getCellLabel(row, column)
    const cellPlaceholder = editRender ? editRender.placeholder : ''
    return [
      h('span', {
        class: 'vxe-cell--label'
      }, editRender && eqEmptyValue(cellValue) ? [
        // 如果设置占位符
        h('span', {
          class: 'vxe-cell--placeholder'
        }, formatText(getFuncText(cellPlaceholder), 1))
      ] : formatText(cellValue, 1))
    ]
  },
  renderTreeCell (params: VxeTableDefines.CellRenderBodyParams) {
    return Cell.renderTreeIcon(params, Cell.renderDefaultCell(params) as VNode[])
  },
  renderDefaultFooter (params: VxeTableDefines.CellRenderFooterParams) {
    return [
      h('span', {
        class: 'vxe-cell--item'
      }, getFooterContent(params))
    ]
  },

  /**
   * 树节点
   */
  renderTreeIcon (params: VxeTableDefines.CellRenderBodyParams, cellVNodes: VNode[]) {
    const { $table, isHidden } = params
    const { reactData } = $table
    const { computeTreeOpts } = $table.getComputeMaps()
    const { treeExpandeds, treeLazyLoadeds } = reactData
    const treeOpts = computeTreeOpts.value
    const { row, column, level } = params
    const { slots } = column
    const { children, hasChild, indent, lazy, trigger, iconLoaded, showIcon, iconOpen, iconClose } = treeOpts
    const rowChilds = row[children]
    const iconSlot = slots ? slots.icon : null
    let hasLazyChilds = false
    let isAceived = false
    let isLazyLoaded = false
    const ons: any = {}
    if (iconSlot) {
      return $table.callSlot(iconSlot, params)
    }
    if (!isHidden) {
      isAceived = treeExpandeds.indexOf(row) > -1
      if (lazy) {
        isLazyLoaded = treeLazyLoadeds.indexOf(row) > -1
        hasLazyChilds = row[hasChild]
      }
    }
    if (!trigger || trigger === 'default') {
      ons.onClick = (evnt: Event) => $table.triggerTreeExpandEvent(evnt, params)
    }
    return [
      h('div', {
        class: ['vxe-cell--tree-node', {
          'is--active': isAceived
        }],
        style: {
          paddingLeft: `${level * indent}px`
        }
      }, [
        showIcon && ((rowChilds && rowChilds.length) || hasLazyChilds) ? [
          h('div', {
            class: 'vxe-tree--btn-wrapper',
            ...ons
          }, [
            h('i', {
              class: ['vxe-tree--node-btn', isLazyLoaded ? (iconLoaded || GlobalConfig.icon.TABLE_TREE_LOADED) : (isAceived ? (iconOpen || GlobalConfig.icon.TABLE_TREE_OPEN) : (iconClose || GlobalConfig.icon.TABLE_TREE_CLOSE))]
            })
          ])
        ] : null,
        h('div', {
          class: 'vxe-tree-cell'
        }, cellVNodes)
      ])
    ]
  },

  /**
   * 索引
   */
  renderIndexHeader (params: VxeTableDefines.CellRenderHeaderParams) {
    const { $table, column } = params
    const { slots } = column
    const headerSlot = slots ? slots.header : null
    return renderTitleContent(params, headerSlot ? $table.callSlot(headerSlot, params) : formatText(column.getTitle(), 1))
  },
  renderIndexCell (params: VxeTableDefines.CellRenderBodyParams) {
    const { $table, column } = params
    const { computeSeqOpts } = $table.getComputeMaps()
    const seqOpts = computeSeqOpts.value
    const { slots } = column
    const defaultSlot = slots ? slots.default : null
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params)
    }
    const { $seq, seq, level } = params
    const seqMethod = seqOpts.seqMethod
    return [formatText(seqMethod ? seqMethod(params) : level ? `${$seq}.${seq}` : (seqOpts.startIndex || 0) + seq, 1)]
  },
  renderTreeIndexCell (params: VxeTableDefines.CellRenderBodyParams) {
    return Cell.renderTreeIcon(params, Cell.renderIndexCell(params) as VNode[])
  },

  /**
   * 单选
   */
  renderRadioHeader (params: VxeTableDefines.CellRenderHeaderParams) {
    const { $table, column } = params
    const { slots } = column
    const headerSlot = slots ? slots.header : null
    const titleSlot = slots ? slots.title : null
    return renderTitleContent(params, headerSlot ? $table.callSlot(headerSlot, params) : [
      h('span', {
        class: 'vxe-radio--label'
      }, titleSlot ? $table.callSlot(titleSlot, params) : formatText(column.getTitle(), 1))
    ])
  },
  renderRadioCell (params: VxeTableDefines.CellRenderBodyParams) {
    const { $table, column, isHidden } = params
    const { reactData } = $table
    const { computeRadioOpts } = $table.getComputeMaps()
    const { selectRow } = reactData
    const radioOpts = computeRadioOpts.value
    const { slots } = column
    const { labelField, checkMethod } = radioOpts
    const { row } = params
    const defaultSlot = slots ? slots.default : null
    const radioSlot = slots ? slots.radio : null
    const isChecked = row === selectRow
    let isDisabled = !!checkMethod
    let ons
    if (!isHidden) {
      ons = {
        onClick (evnt: Event) {
          if (!isDisabled) {
            $table.triggerRadioRowEvent(evnt, params)
          }
        }
      }
      if (checkMethod) {
        isDisabled = !checkMethod({ row })
      }
    }
    const radioParams = { ...params, checked: isChecked, disabled: isDisabled }
    return radioSlot ? $table.callSlot(radioSlot, radioParams) : [
      h('span', {
        class: ['vxe-cell--radio', {
          'is--checked': isChecked,
          'is--disabled': isDisabled
        }],
        ...ons
      }, [
        h('span', {
          class: 'vxe-radio--icon vxe-radio--checked-icon'
        }),
        h('span', {
          class: 'vxe-radio--icon vxe-radio--unchecked-icon'
        })
      ].concat(defaultSlot || labelField ? [
        h('span', {
          class: 'vxe-radio--label'
        }, defaultSlot ? $table.callSlot(defaultSlot, radioParams) : XEUtils.get(row, labelField as string))
      ] : []))
    ]
  },
  renderTreeRadioCell (params: VxeTableDefines.CellRenderBodyParams) {
    return Cell.renderTreeIcon(params, Cell.renderRadioCell(params))
  },

  /**
   * 多选
   */
  renderSelectionHeader (params: VxeTableDefines.CellRenderHeaderParams) {
    const { $table, column, isHidden } = params
    const { reactData } = $table
    const { computeIsAllCheckboxDisabled, computeCheckboxOpts } = $table.getComputeMaps()
    const { isIndeterminate: isAllCheckboxIndeterminate, isAllSelected } = reactData
    const isAllCheckboxDisabled = computeIsAllCheckboxDisabled.value
    const { slots } = column
    const headerSlot = slots ? slots.header : null
    const titleSlot = slots ? slots.title : null
    const checkboxOpts = computeCheckboxOpts.value
    const headerTitle = column.getTitle()
    let isChecked = false
    let ons
    if (!isHidden) {
      isChecked = isAllCheckboxDisabled ? false : isAllSelected
      ons = {
        onClick (evnt: MouseEvent) {
          if (!isAllCheckboxDisabled) {
            $table.triggerCheckAllEvent(evnt, !isChecked)
          }
        }
      }
    }
    const checkboxParams = { ...params, checked: isChecked, disabled: isAllCheckboxDisabled, indeterminate: isAllCheckboxIndeterminate }
    if (headerSlot) {
      return renderTitleContent(checkboxParams, $table.callSlot(headerSlot, checkboxParams))
    }
    if (checkboxOpts.checkStrictly ? !checkboxOpts.showHeader : checkboxOpts.showHeader === false) {
      return renderTitleContent(checkboxParams, [
        h('span', {
          class: 'vxe-checkbox--label'
        }, titleSlot ? $table.callSlot(titleSlot, checkboxParams) : headerTitle)
      ])
    }
    return renderTitleContent(checkboxParams, [
      h('span', {
        class: ['vxe-cell--checkbox', {
          'is--checked': isChecked,
          'is--disabled': isAllCheckboxDisabled,
          'is--indeterminate': isAllCheckboxIndeterminate
        }],
        title: GlobalConfig.i18n('vxe.table.allTitle'),
        ...ons
      }, [
        h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
        }),
        h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
        }),
        h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
        })
      ].concat(titleSlot || headerTitle ? [
        h('span', {
          class: 'vxe-checkbox--label'
        }, titleSlot ? $table.callSlot(titleSlot, checkboxParams) : headerTitle)
      ] : []))
    ])
  },
  renderSelectionCell (params: VxeTableDefines.CellRenderBodyParams) {
    const { $table, row, column, isHidden } = params
    const { props, reactData } = $table
    const { treeConfig } = props
    const { selection, treeIndeterminates } = reactData
    const { computeCheckboxOpts } = $table.getComputeMaps()
    const checkboxOpts = computeCheckboxOpts.value
    const { labelField, checkMethod } = checkboxOpts
    const { slots } = column
    const defaultSlot = slots ? slots.default : null
    const checkboxSlot = slots ? slots.checkbox : null
    let indeterminate = false
    let isChecked = false
    let isDisabled = !!checkMethod
    let ons
    if (!isHidden) {
      isChecked = selection.indexOf(row) > -1
      ons = {
        onClick (evnt: MouseEvent) {
          if (!isDisabled) {
            $table.triggerCheckRowEvent(evnt, params, !isChecked)
          }
        }
      }
      if (checkMethod) {
        isDisabled = !checkMethod({ row })
      }
      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1
      }
    }
    const checkboxParams = { ...params, checked: isChecked, disabled: isDisabled, indeterminate }
    return checkboxSlot ? $table.callSlot(checkboxSlot, checkboxParams) : [
      h('span', {
        class: ['vxe-cell--checkbox', {
          'is--checked': isChecked,
          'is--disabled': isDisabled,
          'is--indeterminate': indeterminate
        }],
        ...ons
      }, [
        h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
        }),
        h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
        }),
        h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
        })
      ].concat(defaultSlot || labelField ? [
        h('span', {
          class: 'vxe-checkbox--label'
        }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams) : XEUtils.get(row, labelField as string))
      ] : []))
    ]
  },
  renderTreeSelectionCell (params: VxeTableDefines.CellRenderBodyParams) {
    return Cell.renderTreeIcon(params, Cell.renderSelectionCell(params))
  },
  renderSelectionCellByProp (params: VxeTableDefines.CellRenderBodyParams) {
    const { $table, row, column, isHidden } = params
    const { props, reactData } = $table
    const { treeConfig } = props
    const { treeIndeterminates } = reactData
    const { computeCheckboxOpts } = $table.getComputeMaps()
    const checkboxOpts = computeCheckboxOpts.value
    const { labelField, checkField: property, halfField, checkMethod } = checkboxOpts
    const { slots } = column
    const defaultSlot = slots ? slots.default : null
    const checkboxSlot = slots ? slots.checkbox : null
    let indeterminate = false
    let isChecked = false
    let isDisabled = !!checkMethod
    let ons
    if (!isHidden) {
      isChecked = XEUtils.get(row, property as string)
      ons = {
        onClick (evnt: MouseEvent) {
          if (!isDisabled) {
            $table.triggerCheckRowEvent(evnt, params, !isChecked)
          }
        }
      }
      if (checkMethod) {
        isDisabled = !checkMethod({ row })
      }
      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1
      }
    }
    const checkboxParams = { ...params, checked: isChecked, disabled: isDisabled, indeterminate }
    return checkboxSlot ? $table.callSlot(checkboxSlot, checkboxParams) : [
      h('span', {
        class: ['vxe-cell--checkbox', {
          'is--checked': isChecked,
          'is--disabled': isDisabled,
          'is--indeterminate': halfField && !isChecked ? row[halfField] : indeterminate
        }],
        ...ons
      }, [
        h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
        }),
        h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
        }),
        h('span', {
          class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
        })
      ].concat(defaultSlot || labelField ? [
        h('span', {
          class: 'vxe-checkbox--label'
        }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams) : XEUtils.get(row, labelField as string))
      ] : []))
    ]
  },
  renderTreeSelectionCellByProp (params: VxeTableDefines.CellRenderBodyParams) {
    return Cell.renderTreeIcon(params, Cell.renderSelectionCellByProp(params))
  },

  /**
   * 展开行
   */
  renderExpandCell (params: VxeTableDefines.CellRenderBodyParams) {
    const { $table, isHidden, row, column } = params
    const { reactData } = $table
    const { rowExpandeds, expandLazyLoadeds } = reactData
    const { computeExpandOpts } = $table.getComputeMaps()
    const expandOpts = computeExpandOpts.value
    const { lazy, labelField, iconLoaded, showIcon, iconOpen, iconClose, visibleMethod } = expandOpts
    const { slots } = column
    const defaultSlot = slots ? slots.default : null
    const iconSlot = slots ? slots.icon : null
    let isAceived = false
    let isLazyLoaded = false
    if (iconSlot) {
      return $table.callSlot(iconSlot, params)
    }
    if (!isHidden) {
      isAceived = rowExpandeds.indexOf(params.row) > -1
      if (lazy) {
        isLazyLoaded = expandLazyLoadeds.indexOf(row) > -1
      }
    }
    return [
      showIcon && (!visibleMethod || visibleMethod(params)) ? h('span', {
        class: ['vxe-table--expanded', {
          'is--active': isAceived
        }],
        onClick (evnt: MouseEvent) {
          $table.triggerRowExpandEvent(evnt, params)
        }
      }, [
        h('i', {
          class: ['vxe-table--expand-btn', isLazyLoaded ? (iconLoaded || GlobalConfig.icon.TABLE_EXPAND_LOADED) : (isAceived ? (iconOpen || GlobalConfig.icon.TABLE_EXPAND_OPEN) : (iconClose || GlobalConfig.icon.TABLE_EXPAND_CLOSE))]
        })
      ]) : null,
      defaultSlot || labelField ? h('span', {
        class: 'vxe-table--expand-label'
      }, defaultSlot ? $table.callSlot(defaultSlot, params) : XEUtils.get(row, labelField as string)) : null
    ]
  },
  renderExpandData (params: VxeTableDefines.CellRenderDataParams) {
    const { $table, column } = params
    const { slots, contentRender } = column
    const contentSlot = slots ? slots.content : null
    if (contentSlot) {
      return $table.callSlot(contentSlot, params)
    }
    if (contentRender) {
      const compConf = VXETable.renderer.get(contentRender.name)
      if (compConf && compConf.renderExpand) {
        return compConf.renderExpand(contentRender, params)
      }
    }
    return []
  },

  /**
   * HTML 标签
   */
  renderHTMLCell (params: VxeTableDefines.CellRenderBodyParams) {
    const { $table, column } = params
    const { slots } = column
    const defaultSlot = slots ? slots.default : null
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params)
    }
    return [
      h('span', {
        class: 'vxe-cell--html',
        innerHTML: getDefaultCellLabel(params)
      })
    ]
  },
  renderTreeHTMLCell (params: VxeTableDefines.CellRenderBodyParams) {
    return Cell.renderTreeIcon(params, Cell.renderHTMLCell(params) as VNode[])
  },

  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader (params: VxeTableDefines.CellRenderHeaderParams) {
    return Cell.renderDefaultHeader(params)
      .concat(Cell.renderSortIcon(params))
      .concat(Cell.renderFilterIcon(params))
  },

  /**
   * 排序
   */
  renderSortHeader (params: VxeTableDefines.CellRenderHeaderParams) {
    return Cell.renderDefaultHeader(params).concat(Cell.renderSortIcon(params))
  },
  renderSortIcon (params: VxeTableDefines.CellRenderHeaderParams | VxeTableDefines.CellRenderHeaderParams) {
    const { $table, column } = params
    const { computeSortOpts } = $table.getComputeMaps()
    const sortOpts = computeSortOpts.value
    const { showIcon, iconAsc, iconDesc } = sortOpts
    const { order } = column
    return showIcon ? [
      h('span', {
        class: 'vxe-cell--sort'
      }, [
        h('i', {
          class: ['vxe-sort--asc-btn', iconAsc || GlobalConfig.icon.TABLE_SORT_ASC, {
            'sort--active': order === 'asc'
          }],
          title: GlobalConfig.i18n('vxe.table.sortAsc'),
          onClick (evnt: Event) {
            $table.triggerSortEvent(evnt, column, 'asc')
          }
        }),
        h('i', {
          class: ['vxe-sort--desc-btn', iconDesc || GlobalConfig.icon.TABLE_SORT_DESC, {
            'sort--active': order === 'desc'
          }],
          title: GlobalConfig.i18n('vxe.table.sortDesc'),
          onClick (evnt: Event) {
            $table.triggerSortEvent(evnt, column, 'desc')
          }
        })
      ])
    ] : []
  },

  /**
   * 筛选
   */
  renderFilterHeader (params: VxeTableDefines.CellRenderHeaderParams) {
    return Cell.renderDefaultHeader(params).concat(Cell.renderFilterIcon(params))
  },
  renderFilterIcon (params: VxeTableDefines.CellRenderHeaderParams) {
    const { $table, column, hasFilter } = params
    const { reactData } = $table
    const { filterStore } = reactData
    const { computeFilterOpts } = $table.getComputeMaps()
    const filterOpts = computeFilterOpts.value
    const { showIcon, iconNone, iconMatch } = filterOpts
    return showIcon ? [
      h('span', {
        class: ['vxe-cell--filter', {
          'is--active': filterStore.visible && filterStore.column === column
        }]
      }, [
        h('i', {
          class: ['vxe-filter--btn', hasFilter ? (iconMatch || GlobalConfig.icon.TABLE_FILTER_MATCH) : (iconNone || GlobalConfig.icon.TABLE_FILTER_NONE)],
          title: GlobalConfig.i18n('vxe.table.filter'),
          onClick (evnt: Event) {
            $table.triggerFilterEvent(evnt, params.column, params)
          }
        })
      ])
    ] : []
  },

  /**
   * 可编辑
   */
  renderEditHeader (params: VxeTableDefines.CellRenderHeaderParams) {
    const { $table, column } = params
    const { props } = $table
    const { computeEditOpts } = $table.getComputeMaps()
    const { editRules } = props
    const editOpts = computeEditOpts.value
    const { sortable, filters, editRender } = column
    let isRequired
    if (editRules) {
      const columnRules = XEUtils.get(editRules, params.column.property) as VxeTableDefines.ValidatorRule[]
      if (columnRules) {
        isRequired = columnRules.some((rule) => rule.required)
      }
    }
    return [
      isRequired && editOpts.showAsterisk ? h('i', {
        class: 'vxe-cell--required-icon'
      }) : null,
      isEnableConf(editRender) && editOpts.showIcon ? h('i', {
        class: ['vxe-cell--edit-icon', editOpts.icon || GlobalConfig.icon.TABLE_EDIT]
      }) : null
    ].concat(Cell.renderDefaultHeader(params))
      .concat(sortable ? Cell.renderSortIcon(params) : [])
      .concat(filters ? Cell.renderFilterIcon(params) : [])
  },
  // 行格编辑模式
  renderRowEdit (params: VxeTableDefines.CellRenderBodyParams) {
    const { $table, column } = params
    const { reactData } = $table
    const { editStore } = reactData
    const { actived } = editStore
    const { editRender } = column
    return Cell.runRenderer(params, isEnableConf(editRender) && actived && actived.row === params.row)
  },
  renderTreeRowEdit (params: VxeTableDefines.CellRenderBodyParams) {
    return Cell.renderTreeIcon(params, Cell.renderRowEdit(params) as VNode[])
  },
  // 单元格编辑模式
  renderCellEdit (params: VxeTableDefines.CellRenderBodyParams) {
    const { $table, column } = params
    const { reactData } = $table
    const { editStore } = reactData
    const { actived } = editStore
    const { editRender } = column
    return Cell.runRenderer(params, isEnableConf(editRender) && actived && actived.row === params.row && actived.column === params.column)
  },
  renderTreeCellEdit (params: VxeTableDefines.CellRenderBodyParams) {
    return Cell.renderTreeIcon(params, Cell.renderCellEdit(params) as VNode[])
  },
  runRenderer (params: VxeTableDefines.CellRenderBodyParams, isEdit: boolean) {
    const { $table, column } = params
    const { slots, editRender, formatter } = column
    const defaultSlot = slots ? slots.default : null
    const editSlot = slots ? slots.edit : null
    const compConf = VXETable.renderer.get(editRender.name)
    if (isEdit) {
      if (editSlot) {
        return $table.callSlot(editSlot, params)
      }
      return compConf && compConf.renderEdit ? compConf.renderEdit(editRender, Object.assign({ $type: 'edit' }, params)) : []
    }
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params)
    }
    if (formatter) {
      return [
        h('span', {
          class: 'vxe-cell--label'
        }, getDefaultCellLabel(params))
      ]
    }
    return Cell.renderDefaultCell(params)
  }
}

export default Cell
