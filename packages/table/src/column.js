import XEUtils from 'xe-utils'
import Tools from '../../../src/tools'

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
    sortable: Boolean,
    // 自定义排序的属性
    sortBy: [String, Array],
    // 配置筛选条件数组
    filters: Array,
    // 筛选是否允许多选
    filterMultiple: { type: Boolean, default: true },
    // 自定义筛选方法
    filterMethod: Function,
    // 列的 key
    columnKey: [String, Number]
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
    let opts = {}
    switch (this.type) {
      case 'index':
        opts.renderHeader = this.renderIndexHeader
        opts.renderCell = this.renderIndexCell
        break
      case 'radio':
        opts.renderHeader = this.renderRadioHeader
        opts.renderCell = this.renderRadioCell
        break
      case 'selection':
        opts.renderHeader = this.renderSelectionHeader
        opts.renderCell = this.prop ? this.renderSelectionCellByProp : this.renderSelectionCell
        break
      default:
        if (this.filters && this.filters.length && this.sortable) {

        } else if (this.sortable) {
          opts.renderHeader = this.renderSortHeader
        } else if (this.filters && this.filters.length) {
          opts.renderHeader = this.renderFilterHeader
        }
    }
    this.columnConfig = Tools.getColumnConfig(this, opts)
  },
  mounted () {
    Tools.assemColumn(this)
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
      cellValue = XEUtils.get(row, column.property)
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
      let { $scopedSlots, indexMethod } = this
      let { row, rowIndex, column, columnIndex } = params
      if ($scopedSlots && $scopedSlots.default) {
        return $scopedSlots.default(params)
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
          checked: XEUtils.get(row, column.property)
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
     * 排序
     */
    renderSortHeader (h, params) {
      let { $table } = this
      let { column } = params
      return [
        h('span', column.label),
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
      let { $table } = this
      let { column } = params
      return [
        h('span', column.label),
        h('span', {
          class: ['vxe-filter-wrapper']
        }, [
          h('i', {
            class: ['vxe-filter--icon'],
            on: {
              click (evnt) {
                $table.triggerFilterEvent(evnt, column, params)
              }
            }
          })
        ])
      ]
    }
  }
}
