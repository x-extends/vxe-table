import UtilTools from '../../../src/tools/utils'
import GlobalConfig from '../../../src/conf'

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
    ellipsis: Boolean,
    // 当内容过长显示为省略号并用原生的 title 显示完整内容
    showOverflowTitle: Boolean,
    // 当内容过长显示为省略号并用 tooltip 显示完整内容
    showOverflowTooltip: Boolean,
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
    // 列的 key
    columnKey: [String, Number],
    // 可编辑列
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
    let {
      $table,
      type,
      prop,
      sortable,
      filters,
      editRender,
      renderIndexHeader,
      renderIndexCell,
      renderRadioHeader,
      renderRadioCell,
      renderSelectionHeader,
      renderSelectionCellByProp,
      renderSelectionCell,
      renderExpandCell,
      renderExpandData,
      renderEditHeader,
      renderCellEdit,
      renderRowEdit,
      renderSortAndFilterHeader,
      renderSortHeader,
      renderFilterHeader
    } = this
    let opts = {}
    switch (type) {
      case 'index':
        opts.renderHeader = renderIndexHeader
        opts.renderCell = renderIndexCell
        break
      case 'radio':
        opts.renderHeader = renderRadioHeader
        opts.renderCell = renderRadioCell
        break
      case 'selection':
        opts.renderHeader = renderSelectionHeader
        opts.renderCell = prop ? renderSelectionCellByProp : renderSelectionCell
        break
      case 'expand':
        opts.renderCell = renderExpandCell
        opts.renderData = renderExpandData
        break
      default:
        if (editRender) {
          opts.renderHeader = renderEditHeader
          opts.renderCell = $table.editConfig && $table.editConfig.mode === 'cell' ? renderCellEdit : renderRowEdit
        } else if (filters && filters.length && this.sortable) {
          opts.renderHeader = renderSortAndFilterHeader
        } else if (sortable) {
          opts.renderHeader = renderSortHeader
        } else if (filters && filters.length) {
          opts.renderHeader = renderFilterHeader
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
      return [
        h('span', params.column.label)
      ]
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
      return [
        h('span', cellValue)
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
      return [
        h('span', params.column.label || '#')
      ]
    },
    renderIndexCell (h, params) {
      let cellValue
      let { $scopedSlots, $table, indexMethod } = this
      let { row, rowIndex, column, columnIndex } = params
      if ($scopedSlots && $scopedSlots.default) {
        return $scopedSlots.default(params)
      }
      if ($table.scrollLoad) {
        rowIndex += $table.scrollStore.startIndex
      }
      cellValue = rowIndex + 1
      if (indexMethod) {
        cellValue = indexMethod({ row, rowIndex, column, columnIndex })
      }
      return [
        h('span', cellValue)
      ]
    },

    /**
     * 单选
     */
    renderRadioHeader (h, params) {
      return [
        h('span', params.column.label)
      ]
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
            $table.triggerCheckRowEvent(evnt, evnt.target.checked, params)
          }
        }
      }
      return [
        h('label', {
          class: ['vxe-checkbox']
        }, [
          h('input', options),
          h('span', {
            class: ['checkbox--icon']
          })
        ])
      ]
    },
    renderSelectionCellByProp (h, params) {
      let { $table } = this
      let { row, column, isHidden } = params
      let options = {
        attrs: {
          type: 'checkbox'
        }
      }
      if (!isHidden) {
        options.domProps = {
          checked: UtilTools.getCellValue(row, column.property)
        }
        options.on = {
          change (evnt) {
            $table.triggerCheckRowEvent(evnt, evnt.target.checked, params)
          }
        }
      }
      return [
        h('label', {
          class: ['vxe-checkbox']
        }, [
          h('input', options),
          h('span', {
            class: ['checkbox--icon']
          })
        ])
      ]
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
              $table.triggerExpandRowEvent(evnt, params)
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
      return [
        h('span', params.column.label)
      ].concat(this.renderSortIcon(h, params))
        .concat(this.renderFilterIcon(h, params))
    },

    /**
     * 排序
     */
    renderSortHeader (h, params) {
      return [h('span', params.column.label)].concat(this.renderSortIcon(h, params))
    },
    renderSortIcon (h, params) {
      let { $table } = this
      let { column } = params
      return [
        h('span', {
          class: ['vxe-sort-wrapper']
        }, [
          h('i', {
            class: ['vxe-sort--asc-icon', {
              'sort--active': column.order === 'asc'
            }],
            on: {
              click (evnt) {
                $table.triggerSortEvent(evnt, column, params, 'asc')
              }
            }
          }),
          h('i', {
            class: ['vxe-sort--desc-icon', {
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
      return [h('span', params.column.label)].concat(this.renderFilterIcon(h, params))
    },
    renderFilterIcon (h, params) {
      let { $table } = this
      return [
        h('span', {
          class: ['vxe-filter-wrapper']
        }, [
          h('i', {
            class: ['vxe-filter--icon'],
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
      let { sortable, filters } = this
      return [
        h('span', params.column.label)
      ].concat(sortable ? this.renderSortIcon(h, params) : [])
        .concat(filters && filters.length ? this.renderFilterIcon(h, params) : [])
    },
    // 行格编辑模式
    renderRowEdit (h, params) {
      let { $table, $scopedSlots, editRender } = this
      let { editStore } = $table
      let { actived } = editStore
      let { row } = params
      if (editRender.type === 'visible' || (actived && actived.row === row)) {
        if ($scopedSlots && $scopedSlots.edit) {
          return $scopedSlots.edit(params)
        }
        return this.renderCompEdit(h, params, editRender.name)
      }
      return this.renderCell(h, params)
    },
    // 单元格编辑模式
    renderCellEdit (h, params) {
      let { $table, $scopedSlots, editRender } = this
      let { renderMap = {} } = GlobalConfig
      let { editStore } = $table
      let { actived } = editStore
      let { row, column } = params
      let compConf = renderMap[editRender.name]
      if (editRender.type === 'visible' || (actived && actived.row === row && actived.column === column)) {
        if ($scopedSlots && $scopedSlots.edit) {
          return $scopedSlots.edit(params)
        }
        return this.renderCompEdit(h, params, editRender.name)
      }
      return compConf && compConf.formatLabel ? compConf.formatLabel(UtilTools.getCellValue(row, column.property), editRender) : this.renderCell(h, params)
    },
    renderCompEdit (h, params, name) {
      return !name || name === 'input' || name === 'textarea' ? this.renderDefaultEdit(h, params) : this.renderCustomEdit(h, params)
    },
    renderDefaultEdit (h, params) {
      let { editRender } = this
      let { row, column } = params
      let { name = 'input', attrs } = editRender
      if (name === 'input') {
        attrs = Object.assign({ type: 'text' }, attrs)
      }
      return [
        h('div', {
          class: ['vxe-input--wrapper']
        }, [
          h(name, {
            class: [`vxe-${name}`],
            attrs,
            domProps: {
              value: UtilTools.getCellValue(row, column.property)
            },
            on: {
              input (evnt) {
                UtilTools.setCellValue(row, column.property, evnt.target.value)
              }
            }
          })
        ])
      ]
    },
    renderCustomEdit (h, params) {
      let { $table, editRender } = this
      let { row, column } = params
      let { props } = editRender
      let { renderMap = {} } = GlobalConfig
      let compConf = renderMap[editRender.name]
      if (compConf && compConf.render) {
        return compConf.render(h, editRender, params)
      }
      if ($table.size) {
        props = Object.assign({ size: $table.size }, props)
      }
      return [
        h(editRender.name, {
          props,
          model: {
            value: UtilTools.getCellValue(row, column.property),
            callback (value) {
              UtilTools.setCellValue(row, column.property, value)
            }
          }
        })
      ]
    }
  }
}
