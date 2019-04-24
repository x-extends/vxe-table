import HandleFunc from '../tool/handle.js'

export default {
  name: 'XeColumnGroup',
  props: {
    // 分组列标题
    label: String
  },
  inject: [
    '$table'
  ],
  data () {
    return {
      type: 'group',
      children: [],
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
    return h('div', this.$slots.default)
  },
  methods: {
    /**
     * 渲染表头
     */
    renderHeader (h, params) {
      return [
        h('span', this.label)
      ]
    },
    /**
     * 渲染单元格
     */
    renderCell (h, params) {
      return [
        h('span')
      ]
    }
  }
}
