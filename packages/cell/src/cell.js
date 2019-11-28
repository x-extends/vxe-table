import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import { Renderer } from '../../v-x-e-table'
import { UtilTools } from '../../tools'

export const Cell = {
  createColumn ($table, _vm) {
    let { type, sortable, remoteSort, filters, editRender, treeNode } = _vm
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = $table.checkboxConfig || $table.selectConfig
    let renMaps = {
      renderHeader: this.renderHeader,
      renderCell: treeNode ? this.renderTreeCell : this.renderCell
    }
    switch (type) {
      case 'index':
        renMaps.renderHeader = this.renderIndexHeader
        renMaps.renderCell = treeNode ? this.renderTreeIndexCell : this.renderIndexCell
        break
      case 'radio':
        renMaps.renderHeader = this.renderRadioHeader
        renMaps.renderCell = treeNode ? this.renderTreeRadioCell : this.renderRadioCell
        break
      // 在 v3.0 中废弃 type=selection
      case 'checkbox':
      case 'selection':
        renMaps.renderHeader = this.renderSelectionHeader
        renMaps.renderCell = checkboxConfig && checkboxConfig.checkField ? (treeNode ? this.renderTreeSelectionCellByProp : this.renderSelectionCellByProp) : (treeNode ? this.renderTreeSelectionCell : this.renderSelectionCell)
        break
      case 'expand':
        renMaps.renderCell = this.renderExpandCell
        renMaps.renderData = this.renderExpandData
        break
      default:
        if (editRender) {
          renMaps.renderHeader = this.renderEditHeader
          renMaps.renderCell = $table.editConfig && $table.editConfig.mode === 'cell' ? (treeNode ? this.renderTreeCellEdit : this.renderCellEdit) : (treeNode ? this.renderTreeRadioCell : this.renderRowEdit)
        } else if (filters && filters.length && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader
        } else if (filters && filters.length) {
          renMaps.renderHeader = this.renderFilterHeader
        }
    }
    return UtilTools.getColumnConfig($table, _vm, renMaps)
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
    // 在 v3.0 中废弃 label
    return [UtilTools.formatText(UtilTools.getFuncText(own.title || own.label), 1)]
  },
  renderCell (h, params) {
    let cellValue
    let { $table, row, column } = params
    let { slots, own } = column
    let renderOpts = own.editRender || own.cellRender
    if (slots && slots.default) {
      return slots.default(params, h)
    }
    if (renderOpts) {
      let funName = own.editRender ? 'renderCell' : 'renderDefault'
      let compConf = Renderer.get(renderOpts.name)
      if (compConf && compConf[funName]) {
        return compConf[funName].call($table, h, renderOpts, params, { $type: own.editRender ? 'edit' : 'cell', $excel: $table.$parent, $table, $column: column })
      }
    }
    cellValue = UtilTools.getCellLabel(row, column, params)
    return [UtilTools.formatText(cellValue, 1)]
  },
  renderTreeCell (h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderCell.call(this, h, params))
  },

  /**
   * 树节点
   */
  renderTreeIcon (h, params) {
    let { $table, isHidden } = params
    let { treeConfig = {}, treeExpandeds } = $table
    let { row, column, level } = params
    let { slots } = column
    let { children, indent, trigger, iconOpen, iconClose } = treeConfig
    let rowChildren = row[children]
    let isAceived = false
    let on = {}
    if (slots && slots.icon) {
      return slots.icon(params, h)
    }
    if (!isHidden) {
      isAceived = treeExpandeds.indexOf(row) > -1
    }
    if (!trigger || trigger === 'default') {
      on.click = evnt => $table.triggerTreeExpandEvent(evnt, params)
    }
    return [
      h('span', {
        class: 'vxe-tree--indent',
        style: {
          width: `${level * (indent || 20)}px`
        }
      }),
      h('span', {
        class: ['vxe-tree-wrapper', {
          'is--active': isAceived
        }],
        on
      }, rowChildren && rowChildren.length ? [
        h('span', {
          class: 'vxe-tree--btn-wrapper'
        }, [
          h('i', {
            class: ['vxe-tree--node-btn', isAceived ? (iconOpen || GlobalConfig.icon.treeOpen) : (iconClose || GlobalConfig.icon.treeClose)]
          })
        ])
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
      return slots.header(params, h)
    }
    return [UtilTools.formatText(column.getTitle(), 1)]
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
    let { $table, column, isHidden } = params
    let { vSize, radioConfig = {} } = $table
    let { slots } = column
    let { labelField, checkMethod } = radioConfig
    let isDisabled = !!checkMethod
    let { selectRow } = $table
    let { row } = params
    let options = {
      attrs: {
        type: 'radio',
        name: `vxe-radio--${$table.id}`
      }
    }
    if (!isHidden) {
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
        labelField ? h('span', {
          class: 'vxe-radio--label'
        }, slots && slots.default ? slots.default(params, h) : XEUtils.get(row, labelField)) : null
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
    let { vSize, isIndeterminate, isAllCheckboxDisabled } = $table
    let { slots, own } = column
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = $table.checkboxConfig || $table.selectConfig
    // 在 v3.0 中废弃 label
    let headerTitle = own.title || own.label
    let options = {
      attrs: {
        type: 'checkbox',
        disabled: isAllCheckboxDisabled
      }
    }
    if (checkboxConfig && (checkboxConfig.checkStrictly ? !checkboxConfig.showHeader : checkboxConfig.showHeader === false)) {
      return slots && slots.header ? slots.header(params, h) : [UtilTools.getFuncText(headerTitle)]
    }
    if (!isHidden) {
      options.domProps = {
        checked: isAllCheckboxDisabled ? false : $table.isAllSelected
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
          'is--disabled': options.attrs.disabled,
          'is--indeterminate': isIndeterminate
        }]
      }, [
        h('input', options),
        h('span', {
          class: 'vxe-checkbox--icon'
        }),
        headerTitle ? h('span', {
          class: 'vxe-checkbox--label'
        }, slots && slots.header ? slots.header(params, h) : UtilTools.getFuncText(headerTitle)) : null
      ])
    ]
  },
  renderSelectionCell (h, params) {
    let { $table, row, column, isHidden } = params
    let { vSize, treeConfig, treeIndeterminates } = $table
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = $table.checkboxConfig || $table.selectConfig || {}
    let { labelField, checkMethod } = checkboxConfig
    let { slots } = column
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
          [`size--${vSize}`]: vSize,
          'is--indeterminate': indeterminate,
          'is--disabled': isDisabled
        }]
      }, [
        h('input', options),
        h('span', {
          class: 'vxe-checkbox--icon'
        }),
        labelField ? h('span', {
          class: 'vxe-checkbox--label'
        }, slots && slots.default ? slots.default(params, h) : XEUtils.get(row, labelField)) : null
      ])
    ]
  },
  renderTreeSelectionCell (h, params) {
    return Cell.renderTreeIcon(h, params).concat(Cell.renderSelectionCell(h, params))
  },
  renderSelectionCellByProp (h, params) {
    let { $table, row, column, isHidden } = params
    let { vSize, treeConfig, treeIndeterminates } = $table
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = $table.checkboxConfig || $table.selectConfig || {}
    let { labelField, checkField: property, checkMethod } = checkboxConfig
    let { slots } = column
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
        labelField ? h('span', {
          class: 'vxe-checkbox--label'
        }, slots && slots.default ? slots.default(params, h) : XEUtils.get(row, labelField)) : null
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
    let { $table, isHidden, row, column } = params
    let { labelField, iconOpen, iconClose } = $table.expandConfig || {}
    let { slots } = column
    let isAceived = false
    if (slots && slots.icon) {
      return slots.icon(params, h)
    }
    if (!isHidden) {
      isAceived = $table.rowExpandeds.indexOf(params.row) > -1
    }
    return [
      h('span', {
        class: ['vxe-table--expanded', {
          'is--active': isAceived
        }],
        on: {
          click (evnt) {
            $table.triggerRowExpandEvent(evnt, params)
          }
        }
      }, [
        h('i', {
          class: ['vxe-table--expand-btn', isAceived ? (iconOpen || GlobalConfig.icon.expandOpen) : (iconClose || GlobalConfig.icon.expandClose)]
        })
      ]),
      slots.content && slots.default ? slots.default(params, h) : (labelField ? XEUtils.get(row, labelField) : null)
    ]
  },
  renderExpandData (h, params) {
    let { column } = params
    let { slots } = column
    if (slots) {
      if (slots.content) {
        return slots.content(params, h)
      }
      // 在 v3.0 中严格支持 content
      if (slots.default) {
        return slots.default(params, h)
      }
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
    let { $table, column } = params
    return [
      h('span', {
        class: 'vxe-sort-wrapper'
      }, [
        h('i', {
          class: ['vxe-sort--asc-btn', GlobalConfig.icon.sortAsc, {
            'sort--active': column.order === 'asc'
          }],
          attrs: {
            title: GlobalConfig.i18n('vxe.table.sortAsc')
          },
          on: {
            click (evnt) {
              $table.triggerSortEvent(evnt, column, 'asc')
            }
          }
        }),
        h('i', {
          class: ['vxe-sort--desc-btn', GlobalConfig.icon.sortDesc, {
            'sort--active': column.order === 'desc'
          }],
          attrs: {
            title: GlobalConfig.i18n('vxe.table.sortDesc')
          },
          on: {
            click (evnt) {
              $table.triggerSortEvent(evnt, column, 'desc')
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
    let { $table, column, hasFilter } = params
    let { filterStore, filterConfig = {} } = $table
    let { iconNone, iconMatch } = filterConfig
    return [
      h('span', {
        class: ['vxe-filter-wrapper', {
          'is--active': filterStore.visible && filterStore.column === column
        }]
      }, [
        h('i', {
          class: ['vxe-filter--btn', hasFilter ? (iconMatch || GlobalConfig.icon.filterMatch) : (iconNone || GlobalConfig.icon.filterNone)],
          attrs: {
            title: GlobalConfig.i18n('vxe.table.filter')
          },
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
        class: ['vxe-edit-icon', editConfig.icon || GlobalConfig.icon.edit]
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
      return compConf && compConf.renderEdit ? compConf.renderEdit.call($table, h, editRender, params, { $type: 'edit', $excel: $table.$parent, $table, $column: column }) : []
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
