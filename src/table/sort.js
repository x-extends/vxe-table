import XEUtils from 'xe-utils'
import HandleFunc from '../tool/handle.js'

export default {
  name: 'VxeColumnSort',
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
    // 自定义排序的属性
    sortBy: [String, Array]
  },
  inject: [
    '$table'
  ],
  data () {
    return {
      type: 'sort',
      columnConfig: null
    }
  },
  created () {
    this.columnConfig = HandleFunc.getColumnConfig(this)
  },
  mounted () {
    HandleFunc.assemColumn(this)
  },
  render (h) {
    return h('div')
  },
  methods: {
    /**
     * 渲染表头
     */
    renderHeader (h, params) {
      let { column } = params
      return [
        h('span', column.label),
        h('span', {
          class: ['vxe-sort-wrapper']
        }, [
          h('i', {
            class: ['vxe-sort--asc', {
              'sort--active': column.order === 'asc'
            }],
            on: {
              click: evnt => {
                this.changeEvent(evnt, column, params, 'asc')
              }
            }
          }),
          h('i', {
            class: ['vxe-sort--desc', {
              'sort--active': column.order === 'desc'
            }],
            on: {
              click: evnt => {
                this.changeEvent(evnt, column, params, 'desc')
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
    changeEvent (evnt, column, params, order) {
      let { $table } = this
      if (column.order !== order) {
        $table.rowSortEvent(evnt, params, order)
        HandleFunc.emitEvent(this, 'change', [{ column, order }])
      }
    }
  }
}
