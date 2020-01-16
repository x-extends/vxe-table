import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools } from '../../tools'

export const Cell = {
  createColumn ($table, _vm) {
    let { type, sortable, remoteSort, filters, editRender, treeNode } = _vm
    let { editConfig, editOpts, checkboxOpts } = $table
    let renMaps = {
      renderHeader: this.renderHeader,
      renderCell: treeNode ? this.renderTreeCell : this.renderCell
    }
    switch (type) {
      case 'seq':
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
        renMaps.renderCell = checkboxOpts.checkField ? (treeNode ? this.renderTreeSelectionCellByProp : this.renderSelectionCellByProp) : (treeNode ? this.renderTreeSelectionCell : this.renderSelectionCell)
        break
      case 'expand':
        renMaps.renderCell = this.renderExpandCell
        renMaps.renderData = this.renderExpandData
        break
      case 'html':
        renMaps.renderCell = treeNode ? this.renderTreeHTMLCell : this.renderHTMLCell
        if (filters && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader
        } else if (filters) {
          renMaps.renderHeader = this.renderFilterHeader
        }
        break
      default:
        if (editConfig && editRender) {
          renMaps.renderHeader = this.renderEditHeader
          renMaps.renderCell = editOpts.mode === 'cell' ? (treeNode ? this.renderTreeCellEdit : this.renderCellEdit) : (treeNode ? this.renderTreeRowEdit : this.renderRowEdit)
        } else if (filters && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader
        } else if (filters) {
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
      let compConf = VXETable.renderer.get(editRender.name)
      if (compConf && compConf[funName]) {
        return compConf[funName].call($table, h, editRender, params, { $type: own.editRender ? 'edit' : 'cell', $grid: $table.$grid, $excel: $table.$parent, $table, $column: column })
      }
    }
    return [UtilTools.formatText(UtilTools.getCellLabel(row, column, params), 1)]
  },
  renderTreeCell (h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderCell.call(this, h, params))
  },

  /**
   * 树节点
   */
  renderTreeIcon (h, params, cellVNodes) {
    let { $table, isHidden } = params
    let { treeOpts, treeExpandeds, treeLazyLoadeds } = $table
    let { row, column, level } = params
    let { slots } = column
    let { children, hasChild, indent, lazy, trigger, iconLoaded, iconOpen, iconClose } = treeOpts
    let rowChilds = row[children]
    let hasLazyChilds = false
    let isAceived = false
    let isLazyLoaded = false
    let on = {}
    if (slots && slots.icon) {
      return slots.icon(params, h)
    }
    if (!isHidden) {
      isAceived = treeExpandeds.indexOf(row) > -1
      if (lazy) {
        isLazyLoaded = treeLazyLoadeds.indexOf(row) > -1
        hasLazyChilds = row[hasChild]
      }
    }
    if (!trigger || trigger === 'default') {
      on.click = evnt => $table.triggerTreeExpandEvent(evnt, params)
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
        (rowChilds && rowChilds.length) || hasLazyChilds ? [
          h('div', {
            class: 'vxe-tree--btn-wrapper',
            on
          }, [
            h('i', {
              class: ['vxe-tree--node-btn', isLazyLoaded ? (iconLoaded || GlobalConfig.icon.treeLoaded) : (isAceived ? (iconOpen || GlobalConfig.icon.treeOpen) : (iconClose || GlobalConfig.icon.treeClose))]
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
    let { seqOpts, startIndex } = $table
    let { slots, indexMethod } = column
    if (slots && slots.default) {
      return slots.default(params, h)
    }
    let { $seq, seq, level } = params
    // 在 v3.0 中废弃 startIndex、indexMethod
    let seqMethod = seqOpts.seqMethod || indexMethod
    return [UtilTools.formatText(seqMethod ? seqMethod(params) : level ? `${$seq}.${seq}` : (seqOpts.startIndex || startIndex) + seq, 1)]
  },
  renderTreeIndexCell (h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderIndexCell(h, params))
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
    let { radioOpts, selectRow } = $table
    let { slots } = column
    let { checkMethod } = radioOpts
    let { row } = params
    // 在 v2.0 中废弃 labelProp
    let labelField = radioOpts.labelField || radioOpts.labelProp
    let isChecked = row === selectRow
    let isDisabled = !!checkMethod
    let on
    if (!isHidden) {
      on = {
        click (evnt) {
          if (!isDisabled) {
            $table.triggerRadioRowEvent(evnt, params)
          }
        }
      }
      if (checkMethod) {
        isDisabled = !checkMethod(params)
      }
    }
    return [
      h('span', {
        class: ['vxe-cell--radio', {
          'is--checked': isChecked,
          'is--disabled': isDisabled
        }],
        on
      }, [
        h('i', {
          class: 'vxe-radio--icon'
        })
      ].concat(labelField ? (slots && slots.default ? slots.default(params, h) : [XEUtils.get(row, labelField)]) : []))
    ]
  },
  renderTreeRadioCell (h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderRadioCell(h, params))
  },

  /**
   * 多选
   */
  renderSelectionHeader (h, params) {
    let { $table, column, isHidden } = params
    let { isIndeterminate, isAllCheckboxDisabled, checkboxOpts } = $table
    let { slots, own } = column
    let headerTitle = own.title || own.label
    let isChecked = false
    let on
    if (checkboxOpts.checkStrictly ? !checkboxOpts.showHeader : checkboxOpts.showHeader === false) {
      return slots && slots.header ? slots.header(params, h) : [UtilTools.getFuncText(headerTitle)]
    }
    if (!isHidden) {
      isChecked = isAllCheckboxDisabled ? false : $table.isAllSelected
      on = {
        click (evnt) {
          if (!isAllCheckboxDisabled) {
            $table.triggerCheckAllEvent(evnt, !isChecked)
          }
        }
      }
    }
    return [
      h('span', {
        class: ['vxe-cell--checkbox', {
          'is--checked': isChecked,
          'is--disabled': isAllCheckboxDisabled,
          'is--indeterminate': isIndeterminate
        }],
        attrs: {
          title: GlobalConfig.i18n('vxe.table.allTitle')
        },
        on
      }, [
        h('i', {
          class: 'vxe-checkbox--icon'
        })
      ].concat(headerTitle ? (slots && slots.header ? slots.header(params, h) : [UtilTools.getFuncText(headerTitle)]) : []))
    ]
  },
  renderSelectionCell (h, params) {
    let { $table, row, column, isHidden } = params
    let { treeConfig, treeIndeterminates, checkboxOpts } = $table
    let { checkMethod } = checkboxOpts
    let { slots } = column
    // 在 v2.0 中废弃 labelProp
    let labelField = checkboxOpts.labelField || checkboxOpts.labelProp
    let indeterminate = false
    let isChecked = false
    let isDisabled = !!checkMethod
    let on
    if (!isHidden) {
      isChecked = $table.selection.indexOf(row) > -1
      on = {
        click (evnt) {
          if (!isDisabled) {
            $table.triggerCheckRowEvent(evnt, params, !isChecked)
          }
        }
      }
      if (checkMethod) {
        isDisabled = !checkMethod(params)
      }
      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1
      }
    }
    return [
      h('span', {
        class: ['vxe-cell--checkbox', {
          'is--checked': isChecked,
          'is--disabled': isDisabled,
          'is--indeterminate': indeterminate
        }],
        on
      }, [
        h('i', {
          class: 'vxe-checkbox--icon'
        })
      ].concat(labelField ? (slots && slots.default ? slots.default(params, h) : [XEUtils.get(row, labelField)]) : []))
    ]
  },
  renderTreeSelectionCell (h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderSelectionCell(h, params))
  },
  renderSelectionCellByProp (h, params) {
    let { $table, row, column, isHidden } = params
    let { treeConfig, treeIndeterminates, checkboxOpts } = $table
    let { checkMethod } = checkboxOpts
    let { slots } = column
    // 在 v2.0 中废弃 labelProp
    let labelField = checkboxOpts.labelField || checkboxOpts.labelProp
    let indeterminate = false
    let isDisabled = !!checkMethod
    // 在 v2.0 中废弃 checkProp
    let property = checkboxOpts.checkField || checkboxOpts.checkProp
    let isChecked = false
    let on
    if (!isHidden) {
      isChecked = XEUtils.get(row, property)
      on = {
        click (evnt) {
          if (!isDisabled) {
            $table.triggerCheckRowEvent(evnt, params, !isChecked)
          }
        }
      }
      if (checkMethod) {
        isDisabled = !checkMethod(params)
      }
      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1
      }
    }
    return [
      h('span', {
        class: ['vxe-cell--checkbox', {
          'is--checked': isChecked,
          'is--disabled': isDisabled,
          'is--indeterminate': indeterminate
        }],
        on
      }, [
        h('i', {
          class: 'vxe-checkbox--icon'
        })
      ].concat(labelField ? (slots && slots.default ? slots.default(params, h) : [XEUtils.get(row, labelField)]) : []))
    ]
  },
  renderTreeSelectionCellByProp (h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderSelectionCellByProp(h, params))
  },

  /**
   * 展开行
   */
  renderExpandCell (h, params) {
    let { $table, isHidden, row, column } = params
    let { expandOpts, rowExpandeds, expandLazyLoadeds } = $table
    let { lazy, labelField, iconLoaded, iconOpen, iconClose } = expandOpts
    let { slots } = column
    let isAceived = false
    let isLazyLoaded = false
    if (slots && slots.icon) {
      return slots.icon(params, h)
    }
    if (!isHidden) {
      isAceived = rowExpandeds.indexOf(params.row) > -1
      if (lazy) {
        isLazyLoaded = expandLazyLoadeds.indexOf(row) > -1
      }
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
          class: ['vxe-table--expand-btn', isLazyLoaded ? (iconLoaded || GlobalConfig.icon.treeLoaded) : (isAceived ? (iconOpen || GlobalConfig.icon.expandOpen) : (iconClose || GlobalConfig.icon.expandClose))]
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
      // 在 v3.0 中将严格区分 default 与 content
      if (slots.default) {
        return slots.default(params, h)
      }
    }
    return []
  },

  /**
   * HTML 标签
   */
  renderHTMLCell (h, params) {
    let { row, column } = params
    let { slots } = column
    if (slots && slots.default) {
      return slots.default(params, h)
    }
    return [
      h('span', {
        class: 'vxe-cell--html',
        domProps: {
          innerHTML: UtilTools.formatText(UtilTools.getCellLabel(row, column, params), 1)
        }
      })
    ]
  },
  renderTreeHTMLCell (h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderHTMLCell(h, params))
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
    let { showIcon, iconAsc, iconDesc } = $table.sortOpts
    return showIcon === false ? [] : [
      h('span', {
        class: 'vxe-sort-wrapper'
      }, [
        h('i', {
          class: ['vxe-sort--asc-btn', iconAsc || GlobalConfig.icon.sortAsc, {
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
          class: ['vxe-sort--desc-btn', iconDesc || GlobalConfig.icon.sortDesc, {
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
    let { filterStore, filterOpts } = $table
    let { showIcon, iconNone, iconMatch } = filterOpts
    return showIcon === false ? [] : [
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
    let { editRules, editOpts } = $table
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
      editOpts.showIcon === false ? null : h('i', {
        class: ['vxe-edit-icon', editOpts.icon || GlobalConfig.icon.edit]
      })
    ].concat(Cell.renderHeader(h, params))
      .concat(sortable || remoteSort ? Cell.renderSortIcon(h, params) : [])
      .concat(filters ? Cell.renderFilterIcon(h, params) : [])
  },
  // 行格编辑模式
  renderRowEdit (h, params) {
    let { $table } = params
    let { actived } = $table.editStore
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row)
  },
  renderTreeRowEdit (h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderRowEdit(h, params))
  },
  // 单元格编辑模式
  renderCellEdit (h, params) {
    let { $table } = params
    let { actived } = $table.editStore
    return Cell.runRenderer(h, params, this, actived && actived.row === params.row && actived.column === params.column)
  },
  renderTreeCellEdit (h, params) {
    return Cell.renderTreeIcon(h, params, Cell.renderCellEdit(h, params))
  },
  runRenderer (h, params, _vm, isEdit) {
    let { $table, row, column } = params
    let { slots, own, formatter } = column
    let editRender = own.editRender
    let compConf = VXETable.renderer.get(editRender.name)
    if (editRender.type === 'visible' || isEdit) {
      if (slots && slots.edit) {
        return slots.edit(params, h)
      }
      return compConf && compConf.renderEdit ? compConf.renderEdit.call($table, h, editRender, params, { $type: 'edit', $grid: $table.$grid, $excel: $table.$parent, $table, $column: column }) : []
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
