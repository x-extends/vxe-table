import XEUtils from 'xe-utils'
import UtilTools from '../../../tools/utils'
import GlobalConfig from '../../../conf'
import Renderer from '../../../renderer'

const CellMethods = {
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
        renMaps.renderCell = selectConfig && selectConfig.checkProp ? (isTreeNode ? this.renderTreeSelectionCellByProp : this.renderSelectionCellByProp) : (isTreeNode ? this.renderTreeSelectionCell : this.renderSelectionCell)
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
    let { slots } = column
    if (slots && slots.header) {
      return slots.header(params)
    }
    return [UtilTools.formatText(params.column.label)]
  },
  renderCell (h, params) {
    let cellValue
    let { row, rowIndex, column, columnIndex } = params
    let { slots, formatter } = column
    if (slots && slots.default) {
      return slots.default(params)
    }
    cellValue = UtilTools.getCellValue(row, column.property)
    if (formatter) {
      cellValue = formatter({ cellValue, row, rowIndex, column, columnIndex })
    }
    return [UtilTools.formatText(cellValue)]
  },
  renderTreeCell (h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderCell(h, params))
  },

  /**
     * 树节点
     */
  renderTreeIcon (h, params) {
    let { iconMap } = GlobalConfig
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
          active: treeExpandeds.indexOf(row) > -1
        }],
        on
      }, rowChildren && rowChildren.length ? [
        h('i', {
          class: iconMap.tree
        })
      ] : [])
    ]
  },

  /**
     * 索引
     */
  renderIndexHeader (h, params) {
    let { column } = params
    let { slots } = column
    if (slots && slots.header) {
      return slots.header(params)
    }
    return [UtilTools.formatText(params.column.label || '#')]
  },
  renderIndexCell (h, params) {
    let { column } = params
    let { slots, indexMethod } = column
    if (slots && slots.default) {
      return slots.default(params)
    }
    let { seq, level } = params
    return [UtilTools.formatText(indexMethod ? indexMethod(params) : level ? `${level}.${seq}` : seq)]
  },
  renderTreeIndexCell (h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderIndexCell(h, params))
  },

  /**
     * 单选
     */
  renderRadioHeader (h, params) {
    return UtilTools.formatText(params.column.label)
  },
  renderRadioCell (h, params) {
    let { $table, column } = params
    let { slots } = column
    if (slots && slots.header) {
      return slots.header(params)
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
      options.domProps = {
        checked: row === selectRow
      }
      options.on = {
        change (evnt) {
          $table.triggerRowEvent(evnt, params)
        }
      }
    }
    return [
      h('label', {
        class: ['vxe-radio']
      }, [
        h('input', options),
        h('span', {
          class: ['radio--icon']
        })
      ])
    ]
  },
  renderTreeRadioCell (h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderRadioCell(h, params))
  },

  /**
     * 多选
     */
  renderSelectionHeader (h, params) {
    let { $table, column } = params
    let { slots } = column
    if (slots && slots.header) {
      return slots.header(params)
    }
    let { isHidden } = params
    let options = {
      attrs: {
        type: 'checkbox'
      }
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
          'is--indeterminate': $table.isIndeterminate
        }]
      }, [
        h('input', options),
        h('span', {
          class: ['checkbox--icon']
        })
      ])
    ]
  },
  renderSelectionCell (h, params) {
    let { $table } = params
    let { selectConfig = {}, treeConfig, treeIndeterminates } = $table
    let { checkMethod } = selectConfig
    let { row, isHidden } = params
    let indeterminate = false
    let isDisabled = !!checkMethod
    let options = {
      attrs: {
        type: 'checkbox'
      }
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
          'is--indeterminate': indeterminate,
          'is--disabled': isDisabled
        }]
      }, [
        h('input', options),
        h('span', {
          class: ['checkbox--icon']
        })
      ])
    ]
  },
  renderTreeSelectionCell (h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderSelectionCell(h, params))
  },
  renderSelectionCellByProp (h, params) {
    let { $table } = params
    let { selectConfig = {}, treeConfig, treeIndeterminates } = $table
    let { checkProp: property, checkMethod } = selectConfig
    let { row, isHidden } = params
    let indeterminate = false
    let isDisabled = !!checkMethod
    let options = {
      attrs: {
        type: 'checkbox'
      }
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
        checked: UtilTools.getCellValue(row, property)
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
          'is--indeterminate': indeterminate,
          'is--disabled': isDisabled
        }]
      }, [
        h('input', options),
        h('span', {
          class: ['checkbox--icon']
        })
      ])
    ]
  },
  renderTreeSelectionCellByProp (h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderSelectionCellByProp(h, params))
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
          class: ['vxe-table--expand-icon']
        })
      ])
    ]
  },
  renderExpandData (h, params) {
    let { column } = params
    let { slots } = column
    if (slots && slots.default) {
      return slots.default(params)
    }
    return []
  },

  /**
     * 排序和筛选
     */
  renderSortAndFilterHeader (h, params) {
    return CellMethods.renderHeader(h, params)
      .concat(CellMethods.renderSortIcon(h, params))
      .concat(CellMethods.renderFilterIcon(h, params))
  },

  /**
     * 排序
     */
  renderSortHeader (h, params) {
    return CellMethods.renderHeader(h, params).concat(CellMethods.renderSortIcon(h, params))
  },
  renderSortIcon (h, params) {
    let { iconMap } = GlobalConfig
    let { $table, column } = params
    return [
      h('span', {
        class: ['vxe-sort-wrapper']
      }, [
        h('i', {
          class: [iconMap.sortAsc, {
            'sort--active': column.order === 'asc'
          }],
          on: {
            click (evnt) {
              $table.triggerSortEvent(evnt, column, params, 'asc')
            }
          }
        }),
        h('i', {
          class: [iconMap.sortDesc, {
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
    return CellMethods.renderHeader(h, params).concat(CellMethods.renderFilterIcon(h, params))
  },
  renderFilterIcon (h, params) {
    let { iconMap } = GlobalConfig
    let { $table } = params
    return [
      h('span', {
        class: ['vxe-filter-wrapper']
      }, [
        h('i', {
          class: [iconMap.filter],
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
    let { iconMap } = GlobalConfig
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
        class: iconMap.edit
      })
    ].concat(CellMethods.renderHeader(h, params))
      .concat(sortable || remoteSort ? CellMethods.renderSortIcon(h, params) : [])
      .concat(filters && filters.length ? CellMethods.renderFilterIcon(h, params) : [])
  },
  // 行格编辑模式
  renderRowEdit (h, params) {
    let { $table } = params
    let { actived } = $table.editStore
    return CellMethods.runRenderer(h, params, this, actived && actived.row === params.row)
  },
  renderTreeRowEdit (h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderRowEdit(h, params))
  },
  // 单元格编辑模式
  renderCellEdit (h, params) {
    let { $table } = params
    let { actived } = $table.editStore
    return CellMethods.runRenderer(h, params, this, actived && actived.row === params.row && actived.column === params.column)
  },
  renderTreeCellEdit (h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderCellEdit(h, params))
  },
  runRenderer (h, params, _vm, isEdit) {
    let { $table, column } = params
    let { slots } = column
    let editRender = _vm ? _vm.editRender : column.editRender
    let compConf = Renderer.get(editRender.name)
    let context = { $excel: $table.$parent, $table, $column: column }
    if (editRender.type === 'visible' || isEdit) {
      if (slots && slots.edit) {
        return slots.edit(params)
      }
      return compConf && compConf.renderEdit ? compConf.renderEdit(h, editRender, params, context) : []
    }
    return compConf && compConf.renderCell ? compConf.renderCell(h, editRender, params, context) : CellMethods.renderCell(h, params)
  }
}

export default CellMethods
