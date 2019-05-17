import XEUtils from 'xe-utils'
import UtilTools from '../../../tools/utils'
import GlobalConfig from '../../../conf'

export default {
  name: 'VxeTableColumn',
  props: {
    // 渲染类型 index,radio,selection
    type: String,
    // 列属性
    prop: String,
    // 列标题
    label: String,
    // 列宽度
    width: [Number, String],
    // 列最小宽度，把剩余宽度按比例分配
    minWidth: [Number, String],
    // 将列固定在左侧或者右侧
    fixed: String,
    // 列对其方式
    align: String,
    // 表头对齐方式
    headerAlign: String,
    // 当内容过长时显示为省略号
    showOverflow: [Boolean, String],
    // 当表头内容过长时显示为省略号
    showHeaderOverflow: [Boolean, String],
    // 格式化显示内容
    formatter: Function,
    // 自定义索引方法
    indexMethod: Function,
    // 是否允许排序
    sortable: [Boolean, String],
    // 自定义排序的属性
    sortBy: [String, Array],
    // 配置筛选条件数组
    filters: Array,
    // 筛选是否允许多选
    filterMultiple: { type: Boolean, default: true },
    // 自定义筛选方法
    filterMethod: Function,
    // 指定为树节点
    treeNode: Boolean,
    // 列的 key
    columnKey: [String, Number],
    // 列编辑配置项
    editRender: Object
  },
  inject: [
    '$table'
  ],
  data () {
    return {
      columnConfig: {}
    }
  },
  created () {
    let { $table, type, sortable, filters, editRender } = this
    let { treeConfig } = $table
    let isTreeNode = treeConfig && this.treeNode
    let opts = {
      renderCell: isTreeNode ? this.renderTreeCell : this.renderCell
    }
    switch (type) {
      case 'index':
        opts.renderHeader = this.renderIndexHeader
        opts.renderCell = isTreeNode ? this.renderTreeIndexCell : this.renderIndexCell
        break
      case 'radio':
        opts.renderHeader = this.renderRadioHeader
        opts.renderCell = isTreeNode ? this.renderTreeRadioCell : this.renderRadioCell
        break
      case 'selection':
        opts.renderHeader = this.renderSelectionHeader
        opts.renderCell = isTreeNode ? this.renderTreeSelectionCell : this.renderSelectionCell
        break
      case 'expand':
        opts.renderCell = this.renderExpandCell
        opts.renderData = this.renderExpandData
        break
      default:
        if (editRender) {
          opts.renderHeader = this.renderEditHeader
          opts.renderCell = $table.editConfig && $table.editConfig.mode === 'cell' ? (isTreeNode ? this.renderTreeCellEdit : this.renderCellEdit) : (isTreeNode ? this.renderTreeRadioCell : this.renderRowEdit)
        } else if (filters && filters.length && sortable) {
          opts.renderHeader = this.renderSortAndFilterHeader
        } else if (sortable) {
          opts.renderHeader = this.renderSortHeader
        } else if (filters && filters.length) {
          opts.renderHeader = this.renderFilterHeader
        }
    }
    this.columnConfig = UtilTools.getColumnConfig(this, opts)
  },
  mounted () {
    UtilTools.assemColumn(this)
  },
  render (h) {
    return h('div', this.$slots.default)
  },
  methods: {
    /**
     * 单元格
     */
    renderHeader (h, params) {
      let { $scopedSlots } = this
      if ($scopedSlots && $scopedSlots.header) {
        return $scopedSlots.header(params)
      }
      return [UtilTools.formatText(params.column.label)]
    },
    renderCell (h, params) {
      let cellValue
      let { $scopedSlots, formatter } = this
      let { row, rowIndex, column, columnIndex } = params
      if ($scopedSlots && $scopedSlots.default) {
        return $scopedSlots.default(params)
      }
      cellValue = UtilTools.getCellValue(row, column.property)
      if (formatter) {
        cellValue = formatter({ cellValue, row, rowIndex, column, columnIndex })
      }
      return [UtilTools.formatText(cellValue)]
    },
    renderTreeCell (h, params) {
      return this.renderTreeIcon(h, params).concat(this.renderCell(h, params))
    },

    /**
     * 树节点
     */
    renderTreeIcon (h, params) {
      let { iconMap } = GlobalConfig
      let { $table } = params
      let { treeConfig, treeExpandeds } = $table
      let { row, level } = params
      let rowChildren = row[treeConfig.children]
      return [
        h('span', {
          class: 'vxe-tree--indent',
          style: {
            width: `${level * (treeConfig.indent || 16)}px`
          }
        }),
        h('span', {
          class: ['vxe-tree-wrapper', {
            active: treeExpandeds.indexOf(row) > -1
          }],
          on: {
            click (evnt) {
              $table.triggerTreeExpandEvent(evnt, params)
            }
          }
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
      let { $scopedSlots } = this
      if ($scopedSlots && $scopedSlots.header) {
        return $scopedSlots.header(params)
      }
      return [UtilTools.formatText(params.column.label || '#')]
    },
    renderIndexCell (h, params) {
      let { $scopedSlots, indexMethod } = this
      if ($scopedSlots && $scopedSlots.default) {
        return $scopedSlots.default(params)
      }
      return [UtilTools.formatText(indexMethod ? indexMethod(params) : params.seq)]
    },
    renderTreeIndexCell (h, params) {
      return this.renderTreeIcon(h, params).concat(this.renderIndexCell(h, params))
    },

    /**
     * 单选
     */
    renderRadioHeader (h, params) {
      return UtilTools.formatText(params.column.label)
    },
    renderRadioCell (h, params) {
      let { $table } = this
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
      return this.renderTreeIcon(h, params).concat(this.renderRadioCell(h, params))
    },

    /**
     * 多选
     */
    renderSelectionHeader (h, params) {
      let { $table } = this
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
      let { $table } = this
      let { row, isHidden } = params
      let options = {
        attrs: {
          type: 'checkbox'
        }
      }
      if (!isHidden) {
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
            'is--indeterminate': $table.treeIndeterminates.indexOf(row) > -1
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
      return this.renderTreeIcon(h, params).concat(this.renderSelectionCell(h, params))
    },

    /**
     * 展开行
     */
    renderExpandCell (h, params) {
      let { $table } = this
      return [
        h('span', {
          class: ['vxe-table--expanded', {
            'expand--active': $table.expandeds.indexOf(params.row) > -1
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
      let { $scopedSlots } = this
      if ($scopedSlots && $scopedSlots.default) {
        return $scopedSlots.default(params)
      }
      return []
    },

    /**
     * 排序和筛选
     */
    renderSortAndFilterHeader (h, params) {
      return this.renderHeader(h, params)
        .concat(this.renderSortIcon(h, params))
        .concat(this.renderFilterIcon(h, params))
    },

    /**
     * 排序
     */
    renderSortHeader (h, params) {
      return this.renderHeader(h, params).concat(this.renderSortIcon(h, params))
    },
    renderSortIcon (h, params) {
      let { iconMap } = GlobalConfig
      let { $table } = this
      let { column } = params
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
      return this.renderHeader(h, params).concat(this.renderFilterIcon(h, params))
    },
    renderFilterIcon (h, params) {
      let { iconMap } = GlobalConfig
      let { $table } = this
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
      let { $table, sortable, filters } = this
      let { editRules, editConfig } = $table
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
      ].concat(this.renderHeader(h, params))
        .concat(sortable ? this.renderSortIcon(h, params) : [])
        .concat(filters && filters.length ? this.renderFilterIcon(h, params) : [])
    },
    // 行格编辑模式
    renderRowEdit (h, params) {
      let { actived } = this.$table.editStore
      return this.runRenderer(h, params, actived && actived.row === params.row)
    },
    renderTreeRowEdit (h, params) {
      return this.renderTreeIcon(h, params).concat(this.renderRowEdit(h, params))
    },
    // 单元格编辑模式
    renderCellEdit (h, params) {
      let { actived } = this.$table.editStore
      return this.runRenderer(h, params, actived && actived.row === params.row && actived.column === params.column)
    },
    renderTreeCellEdit (h, params) {
      return this.renderTreeIcon(h, params).concat(this.renderCellEdit(h, params))
    },
    runRenderer (h, params, isEdit) {
      let { $scopedSlots, editRender, $table } = this
      let { renderMap = {} } = GlobalConfig
      let compConf = renderMap[editRender.name]
      let context = { $excel: $table.$parent, $table, $column: this }
      if (editRender.type === 'visible' || isEdit) {
        if ($scopedSlots && $scopedSlots.edit) {
          return $scopedSlots.edit(params)
        }
        return compConf && compConf.renderEdit ? compConf.renderEdit(h, editRender, params, context) : []
      }
      return compConf && compConf.renderCell ? compConf.renderCell(h, editRender, params, context) : this.renderCell(h, params)
    }
  }
}
