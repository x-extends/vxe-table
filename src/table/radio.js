import HandleFunc from '../tool/handle.js'

export default {
  name: 'VxeColumnRadio',
  props: {
    // 列标题
    label: String,
    // 列宽度
    width: [Number, String],
    // 列最小宽度，把剩余宽度按比例分配
    minWidth: [Number, String],
    // 将列固定在左侧或者右侧
    fixed: String,
    // 列对其方式
    align: { type: String, default: 'center' },
    // 表头对齐方式
    headerAlign: { type: String, default: 'center' }
  },
  inject: [
    '$table'
  ],
  data () {
    return {
      type: 'radio',
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
      return [
        h('span', params.column.label)
      ]
    },
    /**
     * 渲染单元格
     */
    renderCell (h, params) {
      let { $table } = this
      let { selectRow } = $table
      let { row } = params
      let options = {
        attrs: {
          type: this.type,
          name: `vxe-radio--${$table.id}`
        }
      }
      if (!params.isHidden) {
        options.domProps = {
          checked: row === selectRow
        }
        options.on = {
          change: evnt => {
            $table.redioRowEvent(evnt, params)
            HandleFunc.emitEvent(this, 'change', [row])
          }
        }
      }
      return [
        h('label', {
          class: ['vxe-radio']
        }, [
          h('input', options),
          h('span')
        ])
      ]
    }
  }
}
