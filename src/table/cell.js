import XEUtils from 'xe-utils'
import HandleFunc from '../tool/handle.js'

export default {
  name: 'VxeColumnCell',
  props: {
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
    // 是否允许排序
    sortable: Boolean,
    // 自定义排序的属性
    sortBy: [String, Array],
    // 配置筛选条件数组
    filters: Array,
    // 筛选是否允许多选
    filterMultiple: { type: Boolean, default: true },
    // 自定义筛选方法
    filterMethod: Function
  },
  inject: [
    '$table'
  ],
  data () {
    return {
      type: 'cell',
      columnConfig: null
    }
  },
  created () {
    let options = {
      renderHeader: this.renderHeader
    }
    if (this.filters && this.sortable) {

    } else if (this.sortable) {
      options.renderHeader = this.renderSortHeader
    } else if (this.filters) {
      options.renderHeader = this.renderFilterHeader
    }
    this.columnConfig = HandleFunc.getColumnConfig(this, options)
  },
  mounted () {
    HandleFunc.assemColumn(this)
  },
  render (h) {
    return h('div')
  },
  methods: {
    /**
     * 渲染单元格表头
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
    /**
     * 渲染排序表头
     */
    renderSortHeader (h, params) {
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
              click: evnt => {
                this.changeSortEvent(evnt, column, params, 'asc')
              }
            }
          }),
          h('i', {
            class: ['vxe-sort--desc-icon', {
              'sort--active': column.order === 'desc'
            }],
            on: {
              click: evnt => {
                this.changeSortEvent(evnt, column, params, 'desc')
              }
            }
          })
        ])
      ]
    },
    /**
     * 渲染筛选表头
     */
    renderFilterHeader (h, params) {
      let { column } = params
      return [
        h('span', column.label),
        h('span', {
          class: ['vxe-filter-wrapper']
        }, [
          h('i', {
            class: ['vxe-filter--icon'],
            on: {
              click: evnt => {
                this.changeEvent(evnt, column, params, 'asc')
              }
            }
          })
        ])
      ]
    },
    /**
     * 渲染单元格
     */
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
    changeSortEvent (evnt, column, params, order) {
      if (column.order !== order) {
        this.$table.rowSortEvent(evnt, params, order)
      }
    }
  }
}
