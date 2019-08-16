import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { Renderer } from '../../v-x-e-table'
import { UtilTools } from '../../tools'

export const Cell = {
  createColumn ($table, _vm) {
    let { type, sortable, remoteSort, filters, editRender, treeNode } = _vm
    let { selectConfig, treeConfig } = $table
    let isTreeNode = treeConfig && treeNode
    let renMaps = {
      renderHeader: this.renderHeader,
      renderCell: isTreeNode ? this.renderTreeCell : this.renderCell
    }
    switch (type) {
      case 'index':
        renMaps.renderHeader = this.renderIndexHeader
        renMaps.renderCell = isTreeNode ? this.renderTreeIndexCell : this.renderIndexCell
        break
      case 'radio':
        renMaps.renderHeader = this.renderRadioHeader
        renMaps.renderCell = isTreeNode ? this.renderTreeRadioCell : this.renderRadioCell
        break
      case 'selection':
        renMaps.renderHeader = this.renderSelectionHeader
        // 在 v2.0 中废弃 checkProp
        renMaps.renderCell = selectConfig && (selectConfig.checkField || selectConfig.checkProp) ? (isTreeNode ? this.renderTreeSelectionCellByProp : this.renderSelectionCellByProp) : (isTreeNode ? this.renderTreeSelectionCell : this.renderSelectionCell)
        break
      case 'expand':
        renMaps.renderCell = this.renderExpandCell
        renMaps.renderData = this.renderExpandData
        break
      default:
        if (editRender) {
          renMaps.renderHeader = this.renderEditHeader
          renMaps.renderCell = $table.editConfig && $table.editConfig.mode === 'cell' ? (isTreeNode ? this.renderTreeCellEdit : this.renderCellEdit) : (isTreeNode ? this.renderTreeRadioCell : this.renderRowEdit)
        } else if (filters && filters.length && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader
        } else if (filters && filters.length) {
          renMaps.renderHeader = this.renderFilterHeader
        }
    }
    return UtilTools.getColumnConfig(_vm, renMaps)
  },
  /**
   * 单元格
   */
  renderHeader (h, params) {
    let { column } = params
    let { slots, own } = column
    if (slots && slots.header) {
      return slots.header(params, h)
    }
    return [UtilTools.formatText(UtilTools.getFuncText(own.title || own.label), 1)]
  },
  renderCell (h, params) {
    let { $table, row, column } = params
    let { slots, own } = column
    let editRender = own.editRender || own.cellRender
    if (slots && slots.default) {
      return slots.default(params, h)
    }
    if (editRender) {
      let funName = own.editRender ? 'renderCell' : 'renderDefault'
      let compConf = Renderer.get(editRender.name)
      if (compConf && compConf[funName]) {
        return compConf[funName].call($table, h, editRender, params, { $excel: $table.$parent, $table, $column: column })
      }
    }
    let cellValue = UtilTools.getCellLabel(row, column, params)
    return [UtilTools.formatText(cellValue, 1)]
  },
  renderTreeCell (h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderCell.call(this, h, params))
  },

  /**
   * 树节点
   */
  renderTreeIcon (h, params) {
    let { icon } = GlobalConfig
    let { $table } = params
    let { treeConfig, treeExpandeds } = $table
    let { row, level } = params
    let { children, indent, trigger } = treeConfig
    let rowChildren = row[children]
    let on = {}
    if (!trigger || trigger === 'default') {
      on.click = evnt => $table.triggerTreeExpandEvent(evnt, params)
    }
    return [
      h('span', {
        class: 'vxe-tree--indent',
        style: {
          width: `${level * (indent || 16)}px`
        }
      }),
      h('span', {
        class: ['vxe-tree-wrapper', {
          'is--active': treeExpandeds.indexOf(row) > -1
        }],
        on
      }, rowChildren && rowChildren.length ? [
        h('i', {
          class: `vxe-tree--node-btn ${icon.tree}`
        })
      ] : [])
    ]
  },

  /**
   * 索引
   */
  renderIndexHeader (h, params) {
    let { column } = params
    let { slots, own } = column
    if (slots && slots.header) {
      return slots.header(params, h)
    }
    return [UtilTools.formatText(UtilTools.getFuncText(own.title || own.label || '#'), 1)]
  },
  renderIndexCell (h, params) {
    let { $table, column } = params
    let { startIndex } = $table
    let { slots, indexMethod } = column
    if (slots && slots.default) {
      return slots.default(params, h)
    }
    let { $seq, seq, level } = params
    return [UtilTools.formatText(indexMethod ? indexMethod(params) : level ? `${$seq}.${seq}` : startIndex + seq, 1)]
  },
  renderTreeIndexCell (h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderIndexCell(h, params))
  },

  /**
   * 单选
   */
  renderRadioHeader (h, params) {
    let { column } = params
    let { slots, own } = column
    if (slots && slots.header) {
      return slots.header(params, h)
    }
    // 在 v3.0 中废弃 label
    return [UtilTools.formatText(UtilTools.getFuncText(own.title || own.label), 1)]
  },
  renderRadioCell (h, params) {
    let { $table, column } = params
    let { vSize, radioConfig = {} } = $table
    let { slots } = column
    let { checkMethod } = radioConfig
    let isDisabled = !!checkMethod
    // 在 v2.0 中废弃 labelProp
    let labelProp = radioConfig.labelField || radioConfig.labelProp
    if (slots && slots.default) {
      return slots.default(params, h)
    }
    let { selectRow } = $table
    let { row } = params
    let options = {
      attrs: {
        type: 'radio',
        name: `vxe-radio--${$table.id}`
      }
    }
    if (!params.isHidden) {
      if (checkMethod) {
        isDisabled = !checkMethod(params)
        options.attrs.disabled = isDisabled
      }
      options.domProps = {
        checked: row === selectRow
      }
      options.on = {
        change (evnt) {
          $table.triggerRadioRowEvent(evnt, params)
        }
      }
    }
    return [
      h('label', {
        class: ['vxe-radio', {
          [`size--${vSize}`]: vSize,
          'is--disabled': isDisabled
        }]
      }, [
        h('input', options),
        h('span', {
          class: 'vxe-radio--icon'
        }),
        labelProp ? h('span', {
          class: 'vxe-radio--label'
        }, XEUtils.get(row, labelProp)) : null
      ])
    ]
  },
  renderTreeRadioCell (h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderRadioCell(h, params))
  },

  /**
   * 多选
   */
  renderSelectionHeader (h, params) {
    let { $table, column, isHidden } = params
    let { vSize, selectConfig } = $table
    let { slots, own } = column
    let headerTitle = own.title || own.label
    let options = {
      attrs: {
        type: 'checkbox'
      }
    }
    if (slots && slots.header) {
      return slots.header(params, h)
    }
    if (selectConfig && (selectConfig.checkStrictly ? !selectConfig.showHeader : selectConfig.showHeader === false)) {
      return []
    }
    if (!isHidden) {
      options.domProps = {
        checked: $table.isAllSelected
      }
      options.on = {
        change (evnt) {
          $table.triggerCheckAllEvent(evnt, evnt.target.checked)
        }
      }
    }
    return [
      h('label', {
        class: ['vxe-checkbox', {
          [`size--${vSize}`]: vSize,
          'is--indeterminate': $table.isIndeterminate
        }]
      }, [
        h('input', options),
        h('span', {
          class: 'vxe-checkbox--icon'
        }),
        headerTitle ? h('span', {
          class: 'vxe-checkbox--label'
        }, UtilTools.getFuncText(headerTitle)) : null
      ])
    ]
  },
  renderSelectionCell (h, params) {
    let { $table, row, column, isHidden } = params
    let { vSize, selectConfig = {}, treeConfig, treeIndeterminates } = $table
    let { checkMethod } = selectConfig
    let { slots } = column
    // 在 v2.0 中废弃 labelProp
    let labelProp = selectConfig.labelField || selectConfig.labelProp
    let indeterminate = false
    let isDisabled = !!checkMethod
    let options = {
      attrs: {
        type: 'checkbox'
      }
    }
    if (slots && slots.default) {
      return slots.default(params, h)
    }
    if (!isHidden) {
      if (checkMethod) {
        isDisabled = !checkMethod(params)
        options.attrs.disabled = isDisabled
      }
      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1
      }
      options.domProps = {
        checked: $table.selection.indexOf(row) > -1
      }
      options.on = {
        change (evnt) {
          $table.triggerCheckRowEvent(evnt, params, evnt.target.checked)
        }
      }
    }
    return [
      h('label', {
        class: ['vxe-checkbox', {
          [`size--${vSize}`]: vSize,
          'is--indeterminate': indeterminate,
          'is--disabled': isDisabled
        }]
      }, [
        h('input', options),
        h('span', {
          class: 'vxe-checkbox--icon'
        }),
        labelProp ? h('span', {
          class: 'vxe-checkbox--label'
        }, XEUtils.get(row, labelProp)) : null
      ])
    ]
  },
  renderTreeSelectionCell (h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderSelectionCell(h, params))
  },
  renderSelectionCellByProp (h, params) {
    let { $table, row, column, isHidden } = params
    let { vSize, selectConfig = {}, treeConfig, treeIndeterminates } = $table
    let { checkMethod } = selectConfig
    let { slots } = column
    // 在 v2.0 中废弃 labelProp
    let labelProp = selectConfig.labelField || selectConfig.labelProp
    let indeterminate = false
    let isDisabled = !!checkMethod
    // 在 v2.0 中废弃 checkProp
    let property = selectConfig.checkField || selectConfig.checkProp
    let options = {
      attrs: {
        type: 'checkbox'
      }
    }
    if (slots && slots.default) {
      return slots.default(params, h)
    }
    if (!isHidden) {
      if (checkMethod) {
        isDisabled = !checkMethod(params)
        options.attrs.disabled = isDisabled
      }
      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1
      }
      options.domProps = {
        checked: XEUtils.get(row, property)
      }
      options.on = {
        change (evnt) {
          $table.triggerCheckRowEvent(evnt, params, evnt.target.checked)
        }
      }
    }
    return [
      h('label', {
        class: ['vxe-checkbox', {
          [`size--${vSize}`]: vSize,
          'is--indeterminate': indeterminate,
          'is--disabled': isDisabled
        }]
      }, [
        h('input', options),
        h('span', {
          class: 'vxe-checkbox--icon'
        }),
        labelProp ? h('span', {
          class: 'vxe-checkbox--label'
        }, XEUtils.get(row, labelProp)) : null
      ])
    ]
  },
  renderTreeSelectionCellByProp (h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderSelectionCellByProp(h, params))
  },

  /**
   * 展开行
   */
  renderExpandCell (h, params) {
    let { $table, isHidden } = params
    let expandActive = false
    if (!isHidden) {
      expandActive = $table.expandeds.indexOf(params.row) > -1
    }
    return [
      h('span', {
        class: ['vxe-table--expanded', {
          'expand--active': expandActive
        }],
        on: {
          click (evnt) {
            $table.triggerRowExpandEvent(evnt, params)
          }
        }
      }, [
        h('i', {
          class: 'vxe-table--expand-icon'
        })
      ])
    ]
  },
  renderExpandData (h, params) {
    let { column } = params
    let { slots } = column
    if (slots && slots.default) {
      return slots.default(params, h)
    }
    return []
  },

  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader (h, params) {
    return Cell.renderHeader(h, params)
      .concat(Cell.renderSortIcon(h, params))
      .concat(Cell.renderFilterIcon(h, params))
  },

  /**
   * 排序
   */
  renderSortHeader (h, params) {
    return Cell.renderHeader(h, params).concat(Cell.renderSortIcon(h, params))
  },
  renderSortIcon (h, params) {
    let { icon } = GlobalConfig
    let { $table, column } = params
    return [
      h('span', {
        class: 'vxe-sort-wrapper'
      }, [
        h('i', {
          class: ['vxe-sort--asc-btn', icon.sortAsc, {
            'sort--active': column.order === 'asc'
          }],
          on: {
            click (evnt) {
              $table.triggerSortEvent(evnt, column, params, 'asc')
            }
          }
        }),
        h('i', {
          class: ['vxe-sort--desc-btn', icon.sortDesc, {
            'sort--active': column.order === 'desc'
          }],
          on: {
            click (evnt) {
              $table.triggerSortEvent(evnt, column, params, 'desc')
            }
          }
        })
      ])
    ]
  },

  /**
   * 筛选
   */
  renderFilterHeader (h, params) {
    return Cell.renderHeader(h, params).concat(Cell.renderFilterIcon(h, params))
  },
  renderFilterIcon (h, params) {
    let { icon } = GlobalConfig
    let { $table, column } = params
    let { filterStore } = $table
    return [
      h('span', {
        class: ['vxe-filter-wrapper', {
          'is--active': filterStore.visible && filterStore.column === column
        }]
      }, [
        h('i', {
          class: `vxe-filter--btn ${icon.filter}`,
          on: {
            click (evnt) {
              $table.triggerFilterEvent(evnt, params.column, params)
            }
          }
        })
      ])
    ]
  },

  /**
   * 可编辑
   */
  renderEditHeader (h, params) {
    let { icon } = GlobalConfig
    let { $table, column } = params
    let { editRules, editConfig } = $table
    let { sortable, remoteSort, filters } = column
    let isRequired
    if (editRules) {
      let columnRules = XEUtils.get(editRules, params.column.property)
      if (columnRules) {
        isRequired = columnRules.some(rule => rule.required)
      }
    }
    return [
      isRequired ? h('i', {
        class: 'vxe-required-icon'
      }) : null,
      editConfig && editConfig.showIcon === false ? null : h('i', {
        class: `vxe-edit-icon ${icon.edit}`
      })
    ].concat(Cell.renderHeader(h, params))
      .concat(sortable || remoteSort ? Cell.renderSortIcon(h, params) : [])
      .concat(filters && filters.length ? Cell.renderFilterIcon(h, params) : [])
  },
  // 行格编辑模式
  renderRowEdit (h, params) {
    let { $table } = params
    let { actived } = $table.editStore
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row)
  },
  renderTreeRowEdit (h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderRowEdit(h, params))
  },
  // 单元格编辑模式
  renderCellEdit (h, params) {
    let { $table } = params
    let { actived } = $table.editStore
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row && actived.column === params.column)
  },
  renderTreeCellEdit (h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderCellEdit(h, params))
  },
  runRenderer (h, params, _vm, isEdit) {
    let { $table, row, column } = params
    let { slots, own, formatter } = column
    let editRender = own.editRender
    let compConf = Renderer.get(editRender.name)
    if (editRender.type === 'visible' || isEdit) {
      if (slots && slots.edit) {
        return slots.edit(params, h)
      }
      return compConf && compConf.renderEdit ? compConf.renderEdit.call($table, h, editRender, params, { $excel: $table.$parent, $table, $column: column }) : []
    }
    if (slots && slots.default) {
      return slots.default(params, h)
    }
    if (formatter) {
      return [UtilTools.formatText(UtilTools.getCellLabel(row, column, params), 1)]
    }
    return Cell.renderCell.call(_vm, h, params)
  }
}

export default Cell
