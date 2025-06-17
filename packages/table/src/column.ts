import { h, onUnmounted, inject, ref, PropType, provide, onMounted, createCommentVNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { XEColumnInstance, watchColumn, assembleColumn, destroyColumn } from './util'
import Cell from './cell'

import type { VxeTableConstructor, VxeTablePrivateMethods, VxeColumnPropTypes, VxeColumnProps } from '../../../types'

export const columnProps = {
  // 列唯一主键
  colId: [String, Number] as PropType<VxeColumnPropTypes.ColId>,
  // 渲染类型 index,radio,checkbox,expand,html
  type: String as PropType<VxeColumnPropTypes.Type>,
  // 列字段名
  field: String as PropType<VxeColumnPropTypes.Field>,
  // 列标题
  title: String as PropType<VxeColumnPropTypes.Title>,
  // 列宽度
  width: [Number, String] as PropType<VxeColumnPropTypes.Width>,
  // 列最小宽度，把剩余宽度按比例分配
  minWidth: [Number, String] as PropType<VxeColumnPropTypes.MinWidth>,
  // 列最大宽度
  maxWidth: [Number, String] as PropType<VxeColumnPropTypes.MaxWidth>,
  // 是否允许拖动列宽调整大小
  resizable: {
    type: Boolean as PropType<VxeColumnPropTypes.Resizable>,
    default: null
  },
  // 将列固定在左侧或者右侧
  fixed: String as PropType<VxeColumnPropTypes.Fixed>,
  // 列对其方式
  align: String as PropType<VxeColumnPropTypes.Align>,
  // 表头对齐方式
  headerAlign: String as PropType<VxeColumnPropTypes.HeaderAlign>,
  // 表尾列的对齐方式
  footerAlign: String as PropType<VxeColumnPropTypes.FooterAlign>,
  // 当内容过长时显示为省略号
  showOverflow: {
    type: [Boolean, String] as PropType<VxeColumnPropTypes.ShowOverflow>,
    default: null
  },
  // 当表头内容过长时显示为省略号
  showHeaderOverflow: {
    type: [Boolean, String] as PropType<VxeColumnPropTypes.ShowHeaderOverflow>,
    default: null
  },
  // 当表尾内容过长时显示为省略号
  showFooterOverflow: {
    type: [Boolean, String] as PropType<VxeColumnPropTypes.ShowFooterOverflow>,
    default: null
  },
  // 给单元格附加 className
  className: [String, Function] as PropType<VxeColumnPropTypes.ClassName>,
  // 给表头单元格附加 className
  headerClassName: [String, Function] as PropType<VxeColumnPropTypes.HeaderClassName>,
  // 给表尾单元格附加 className
  footerClassName: [String, Function] as PropType<VxeColumnPropTypes.FooterClassName>,
  // 格式化显示内容
  formatter: [Function, Array, String] as PropType<VxeColumnPropTypes.Formatter<any>>,
  // 格式化表尾显示内容
  footerFormatter: [Function, Array, String] as PropType<VxeColumnPropTypes.FooterFormatter>,
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
  sortable: Boolean as PropType<VxeColumnPropTypes.Sortable>,
  // 自定义排序的属性
  sortBy: [String, Function] as PropType<VxeColumnPropTypes.SortBy>,
  // 排序的字段类型，比如字符串转数值等
  sortType: String as PropType<VxeColumnPropTypes.SortType>,
  // 配置筛选条件数组
  filters: {
    type: Array as PropType<VxeColumnPropTypes.Filters>,
    default: null
  },
  // 筛选是否允许多选
  filterMultiple: {
    type: Boolean as PropType<VxeColumnPropTypes.FilterMultiple>,
    default: true
  },
  // 自定义筛选方法
  filterMethod: Function as PropType<VxeColumnPropTypes.FilterMethod<any>>,
  // 筛选重置方法
  filterResetMethod: Function as PropType<VxeColumnPropTypes.FilterResetMethod>,
  // 筛选复原方法
  filterRecoverMethod: Function as PropType<VxeColumnPropTypes.FilterRecoverMethod>,
  // 筛选模板配置项
  filterRender: Object as PropType<VxeColumnPropTypes.FilterRender>,
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
    type: Boolean as PropType<VxeColumnPropTypes.Visible>,
    default: null
  },
  // 表头单元格数据导出方法
  headerExportMethod: Function as PropType<VxeColumnPropTypes.HeaderExportMethod>,
  // 单元格数据导出方法
  exportMethod: Function as PropType<VxeColumnPropTypes.ExportMethod>,
  // 表尾单元格数据导出方法
  footerExportMethod: Function as PropType<VxeColumnPropTypes.FooterExportMethod>,
  // 已废弃，被 titlePrefix 替换
  titleHelp: Object as PropType<VxeColumnPropTypes.TitleHelp>,
  // 标题前缀图标配置项
  titlePrefix: Object as PropType<VxeColumnPropTypes.TitlePrefix>,
  // 标题后缀图标配置项
  titleSuffix: Object as PropType<VxeColumnPropTypes.TitleSuffix>,
  // 单元格值类型
  cellType: String as PropType<VxeColumnPropTypes.CellType>,
  // 单元格渲染配置项
  cellRender: Object as PropType<VxeColumnPropTypes.CellRender<any>>,
  // 单元格编辑渲染配置项
  editRender: Object as PropType<VxeColumnPropTypes.EditRender>,
  // 内容渲染配置项
  contentRender: Object as PropType<VxeColumnPropTypes.ContentRender>,
  // 聚合函数
  aggFunc: [String, Boolean] as PropType<VxeColumnPropTypes.AggFunc>,
  // 额外的参数
  params: Object as PropType<VxeColumnPropTypes.Params>
}

export default defineVxeComponent({
  name: 'VxeColumn',
  props: columnProps,
  setup (props, { slots }) {
    const refElem = ref<HTMLDivElement>()
    const $xeTable = inject<(VxeTableConstructor & VxeTablePrivateMethods) | null>('$xeTable', null)
    const $xeColgroup = inject<XEColumnInstance | null>('$xeColgroup', null)
    if (!$xeTable) {
      return () => createCommentVNode()
    }
    const columnConfig = Cell.createColumn($xeTable, props as VxeColumnProps)
    columnConfig.slots = slots

    const renderVN = () => {
      return h('div', {
        ref: refElem
      })
    }

    const $xeColumn = {
      columnConfig,

      renderVN
    } as XEColumnInstance

    watchColumn($xeTable, props, columnConfig)

    onMounted(() => {
      const elem = refElem.value
      if (elem) {
        assembleColumn($xeTable, elem, columnConfig, $xeColgroup)
      }
    })

    onUnmounted(() => {
      destroyColumn($xeTable, columnConfig)
    })

    provide('$xeColumn', $xeColumn)
    provide('$xeGrid', null)

    return renderVN
  }
})
