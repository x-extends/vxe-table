import { PropType } from 'vue'
import Cell from './cell'
import { defineVxeComponent } from '../../ui/src/comp'
import { assembleColumn, destroyColumn } from './util'

import type { VxeColumnPropTypes, VxeTableConstructor, VxeTablePrivateMethods } from '../../../types'

export const columnProps = {
  // 列唯一主键
  colId: [String, Number],
  // 渲染类型 seq,radio,checkbox,expand,html
  type: String,
  // 列字段名
  field: String,
  // 列标题
  title: String,
  // 列宽度
  width: [Number, String],
  // 列最小宽度，把剩余宽度按比例分配
  minWidth: [Number, String],
  // 列最大宽度
  maxWidth: [Number, String],
  // 是否允许拖动列宽调整大小
  resizable: {
    type: Boolean,
    default: null
  },
  // 将列固定在左侧或者右侧
  fixed: String,
  // 列对其方式
  align: String,
  // 表头对齐方式
  headerAlign: String,
  // 表尾列的对齐方式
  footerAlign: String,
  // 当内容过长时显示为省略号
  showOverflow: {
    type: [Boolean, String],
    default: null
  },
  // 当表头内容过长时显示为省略号
  showHeaderOverflow: {
    type: [Boolean, String],
    default: null
  },
  // 当表尾内容过长时显示为省略号
  showFooterOverflow: {
    type: [Boolean, String],
    default: null
  },
  // 给单元格附加 className
  className: [String, Function],
  // 给表头单元格附加 className
  headerClassName: [String, Function],
  // 给表尾单元格附加 className
  footerClassName: [String, Function],
  // 格式化显示内容
  formatter: [Function, Array, String],
  // 格式化表尾显示内容
  footerFormatter: [Function, Array, String],
  // 是否显示间距
  padding: {
    type: Boolean as PropType<VxeColumnPropTypes.Padding>,
    default: null
  },
  // 垂直对齐方式
  verticalAlign: {
    type: String as PropType<VxeColumnPropTypes.VerticalAlign>,
    default: null
  },
  // 是否允许排序
  sortable: Boolean,
  // 在 v3 中废弃
  remoteSort: {
    type: Boolean,
    default: null
  },
  // 在 v3 中只支持字符串类型
  sortBy: [String, Function],
  // 排序的字段类型，比如字符串转数值等
  sortType: String,
  // 在 v3 中废弃
  sortMethod: Function,
  // 配置筛选条件数组
  filters: {
    type: Array,
    default: null
  },
  // 筛选是否允许多选
  filterMultiple: {
    type: Boolean,
    default: true
  },
  // 自定义筛选方法
  filterMethod: Function,
  // 筛选重置方法
  filterResetMethod: Function,
  // 筛选复原方法
  filterRecoverMethod: Function,
  // 筛选模板配置项
  filterRender: Object,
  // 设置为分组节点
  rowGroupNode: Boolean as PropType<VxeColumnPropTypes.RowGroupNode>,
  // 设置为树节点
  treeNode: Boolean as PropType<VxeColumnPropTypes.TreeNode>,
  // 设置为拖拽排序
  dragSort: Boolean as PropType<VxeColumnPropTypes.DragSort>,
  // 设置为行高拖拽
  rowResize: Boolean as PropType<VxeColumnPropTypes.RowResize>,
  // 是否可视
  visible: {
    type: Boolean, default: null
  },
  // 表头单元格数据导出方法
  headerExportMethod: Function,
  // 单元格数据导出方法
  exportMethod: Function,
  // 表尾单元格数据导出方法
  footerExportMethod: Function,
  // 已废弃，被 titlePrefix 替换
  titleHelp: Object,
  // 标题前缀图标配置项
  titlePrefix: Object,
  // 标题后缀图标配置项
  titleSuffix: Object,
  // 单元格值类型
  cellType: String,
  // 单元格渲染配置项
  cellRender: Object,
  // 单元格编辑渲染配置项
  editRender: Object,
  // 内容渲染配置项
  contentRender: Object,
  // 聚合函数
  aggFunc: [String, Boolean] as PropType<VxeColumnPropTypes.AggFunc>,
  // 额外的参数
  params: Object
}

export const columnWatch: Record<string, any> = {}
Object.keys(columnProps).forEach(name => {
  columnWatch[name] = function (value: any) {
    const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

    this.columnConfig.update(name, value)
    if ($xeTable) {
      if (name === 'filters') {
        $xeTable.setFilter(this.columnConfig, value)
        $xeTable.handleUpdateDataQueue()
      } else if (['visible', 'fixed', 'width', 'minWidth', 'maxWidth'].includes(name)) {
        $xeTable.handleRefreshColumnQueue()
      }
    }
  }
})

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeColumn',
  props: columnProps,
  provide () {
    return {
      $xeColumn: this,
      $xeGrid: null
    }
  },
  inject: {
    $xeTable: {
      default: null
    },
    $xeColumn: {
      default: null
    }
  },
  watch: columnWatch,
  created (this: any) {
    const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

    this.columnConfig = this.createColumn($xeTable, this)
  },
  mounted () {
    this.columnConfig.slots = this.$scopedSlots
    assembleColumn(this)
  },
  destroyed () {
    destroyColumn(this)
  },
  render (this: any, h: any) {
    return h('div', this.$slots.default)
  },
  methods: Cell
}) /* define-vxe-component end */
