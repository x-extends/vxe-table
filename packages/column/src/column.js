import Cell from '../../cell'
import { UtilTools } from '../../tools'

const props = {
  // 列唯一主键
  colId: [String, Number],
  // 渲染类型 index,radio,checkbox,expand
  type: String,
  // 在 v3.0 中废弃 prop
  prop: String,
  // 在 v3.0 中废弃 label
  label: String,
  // 列字段名
  field: String,
  // 列标题
  title: String,
  // 列宽度
  width: [Number, String],
  // 列最小宽度，把剩余宽度按比例分配
  minWidth: [Number, String],
  // 是否允许拖动列宽调整大小
  resizable: { type: Boolean, default: null },
  // 将列固定在左侧或者右侧
  fixed: String,
  // 列对其方式
  align: String,
  // 表头对齐方式
  headerAlign: String,
  // 表尾列的对齐方式
  footerAlign: String,
  // 当内容过长时显示为省略号
  showOverflow: { type: [Boolean, String], default: null },
  // 当表头内容过长时显示为省略号
  showHeaderOverflow: { type: [Boolean, String], default: null },
  // 当表尾内容过长时显示为省略号
  showFooterOverflow: { type: [Boolean, String], default: null },
  // 给单元格附加 className
  className: [String, Function],
  // 给表头单元格附加 className
  headerClassName: [String, Function],
  // 给表尾单元格附加 className
  footerClassName: [String, Function],
  // 格式化显示内容
  formatter: [Function, Array, String],
  // 自定义索引方法
  seqMethod: Function,
  // 在 v3.0 中废弃 indexMethod
  indexMethod: Function,
  // 是否允许排序
  sortable: Boolean,
  // 是否服务端排序
  remoteSort: { type: Boolean, default: null },
  // 自定义排序的属性
  sortBy: [String, Array],
  // 自定义排序方法
  sortMethod: Function,
  // 配置筛选条件数组
  filters: { type: Array, default: null },
  // 筛选是否允许多选
  filterMultiple: { type: Boolean, default: true },
  // 自定义筛选方法
  filterMethod: Function,
  // 筛选模板配置项
  filterRender: Object,
  // 指定为树节点
  treeNode: Boolean,
  // 是否可视
  visible: { type: Boolean, default: null },
  // 单元格数据导出方法
  exportMethod: Function,
  // 表尾单元格数据导出方法
  footerExportMethod: Function,
  // 标题帮助图标配置项
  titleHelp: Object,
  // 单元格值类型
  cellType: String,
  // 单元格渲染配置项
  cellRender: Object,
  // 单元格编辑渲染配置项
  editRender: Object,
  // 内容渲染配置项
  contentRender: Object,
  // 额外的参数
  params: Object
}

const watch = {}
Object.keys(props).forEach(name => {
  watch[name] = function (value) {
    this.columnConfig.update(name, value)
  }
})

export default {
  name: 'VxeTableColumn',
  props,
  provide () {
    return {
      $xecolumn: this
    }
  },
  inject: {
    $xetable: {
      default: null
    },
    $xecolumn: {
      default: null
    }
  },
  watch,
  created () {
    this.columnConfig = this.createColumn(this.$xetable, this)
  },
  mounted () {
    UtilTools.assemColumn(this)
    if (this.type === 'expand' && !this.$scopedSlots.content && this.$scopedSlots.default) {
      UtilTools.warn('vxe.error.expandContent')
    }
  },
  destroyed () {
    UtilTools.destroyColumn(this)
  },
  render (h) {
    return h('div', this.$slots.default)
  },
  methods: Cell
}
