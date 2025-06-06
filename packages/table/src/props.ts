import { PropType } from 'vue'
import { VxeUI } from '../../ui'

import type { VxeTablePropTypes } from '../../../types'

const { getConfig } = VxeUI

export default {
  /** 基本属性 */
  id: [String, Function] as PropType<VxeTablePropTypes.ID>,
  // 数据
  data: Array as PropType<any[]>,
  // 表格的高度
  height: [Number, String] as PropType<VxeTablePropTypes.Height>,
  // 表格的最小高度
  minHeight: {
    type: [Number, String] as PropType<VxeTablePropTypes.MinHeight>,
    default: () => getConfig().table.minHeight
  },
  // 表格的最大高度
  maxHeight: [Number, String] as PropType<VxeTablePropTypes.MaxHeight>,
  // 已废弃，被 column-config.resizable 替换
  resizable: {
    type: Boolean as PropType<VxeTablePropTypes.Resizable>,
    default: () => getConfig().table.resizable
  },
  // 是否带有斑马纹
  stripe: {
    type: Boolean as PropType<VxeTablePropTypes.Stripe>,
    default: () => getConfig().table.stripe
  },
  // 是否带有边框
  border: {
    type: [Boolean, String] as PropType<VxeTablePropTypes.Border>,
    default: () => getConfig().table.border
  },
  // 已废弃，被 cell-config.padding 替换
  padding: {
    type: Boolean as PropType<VxeTablePropTypes.Padding>,
    default: null
  },
  // 是否圆角边框
  round: {
    type: Boolean,
    default: () => getConfig().table.round
  },
  // 表格的尺寸
  size: {
    type: String,
    default: () => getConfig().table.size || getConfig().size
  },
  // 列的宽度是否自撑开（可能会被废弃的参数，不要使用）
  fit: {
    type: Boolean,
    default: () => getConfig().table.fit
  },
  // 表格是否加载中
  loading: Boolean,
  // 所有的列对其方式
  align: {
    type: String,
    default: () => getConfig().table.align
  },
  // 所有的表头列的对齐方式
  headerAlign: {
    type: String,
    default: () => getConfig().table.headerAlign
  },
  // 所有的表尾列的对齐方式
  footerAlign: {
    type: String,
    default: () => getConfig().table.footerAlign
  },
  // 是否显示表头
  showHeader: {
    type: Boolean,
    default: () => getConfig().table.showHeader
  },
  // 已废弃，被 row-config.isCurrent 替换
  highlightCurrentRow: {
    type: Boolean,
    default: () => getConfig().table.highlightCurrentRow
  },
  // 已废弃，被 row-config.isHover 替换
  highlightHoverRow: {
    type: Boolean,
    default: () => getConfig().table.highlightHoverRow
  },
  /**
   * （即将废弃）是否要高亮当前选中列
   * @deprecated
   */
  highlightCurrentColumn: {
    type: Boolean as PropType<VxeTablePropTypes.HighlightCurrentColumn>,
    default: () => getConfig().table.highlightCurrentColumn
  },
  /**
   * （即将废弃）鼠标移到列是否要高亮显示
   * @deprecated
   */
  highlightHoverColumn: {
    type: Boolean as PropType<VxeTablePropTypes.HighlightHoverColumn>,
    default: () => getConfig().table.highlightHoverColumn
  },
  // 已废弃，直接删除
  highlightCell: Boolean,
  // 是否显示表尾合计
  showFooter: Boolean,
  // 表尾数据
  footerData: Array,
  // 表尾合计的计算方法
  footerMethod: Function,
  // 给行附加 className
  rowClassName: [String, Function],
  // 给单元格附加 className
  cellClassName: [String, Function],
  // 给表头的行附加 className
  headerRowClassName: [String, Function],
  // 给表头的单元格附加 className
  headerCellClassName: [String, Function],
  // 给表尾的行附加 className
  footerRowClassName: [String, Function],
  // 给表尾的单元格附加 className
  footerCellClassName: [String, Function],
  // 给单元格附加样式
  cellStyle: [Object, Function],
  // 给表头单元格附加样式
  headerCellStyle: [Object, Function],
  // 给表尾单元格附加样式
  footerCellStyle: [Object, Function],
  // 给行附加样式
  rowStyle: [Object, Function],
  // 给表头行附加样式
  headerRowStyle: [Object, Function],
  // 给表尾行附加样式
  footerRowStyle: [Object, Function],
  // 合并指定单元格
  mergeCells: Array,
  // 合并指定的表尾
  mergeFooterItems: Array,
  // 自定义合并行或列的方法
  spanMethod: Function,
  // 表尾合并行或列
  footerSpanMethod: Function,
  // 设置所有内容过长时显示为省略号
  showOverflow: { type: [Boolean, String], default: () => getConfig().table.showOverflow },
  // 设置表头所有内容过长时显示为省略号
  showHeaderOverflow: { type: [Boolean, String], default: () => getConfig().table.showHeaderOverflow },
  // 设置表尾所有内容过长时显示为省略号
  showFooterOverflow: { type: [Boolean, String], default: () => getConfig().table.showFooterOverflow },

  /** 高级属性 */
  // （即将废弃）columnKey 已废弃，被 column-config.useKey 替换
  columnKey: Boolean,
  // （即将废弃）rowKey 已废弃，被 row-config.useKey 替换
  rowKey: Boolean,
  // （即将废弃）rowId 已废弃，被 row-config.keyField 替换
  rowId: { type: String, default: () => getConfig().table.rowId },
  zIndex: Number,
  emptyText: { type: String, default: () => getConfig().table.emptyText },
  keepSource: { type: Boolean, default: () => getConfig().table.keepSource },
  // 是否自动监听父容器变化去更新响应式表格宽高
  autoResize: { type: Boolean, default: () => getConfig().table.autoResize },
  // 是否自动根据状态属性去更新响应式表格宽高
  syncResize: [Boolean, String, Number],
  // 响应式布局配置项
  resizeConfig: Object as PropType<VxeTablePropTypes.ResizeConfig>,
  // 列配置项
  columnConfig: Object as PropType<VxeTablePropTypes.ColumnConfig>,
  // 当前列配置项
  currentColumnConfig: Object as PropType<VxeTablePropTypes.CurrentColumnConfig>,
  // 单元格配置项
  cellConfig: Object as PropType<VxeTablePropTypes.CellConfig>,
  // 表头单元格配置项
  headerCellConfig: Object as PropType<VxeTablePropTypes.HeaderCellConfig>,
  // 表尾单元格配置项
  footerCellConfig: Object as PropType<VxeTablePropTypes.FooterCellConfig>,
  // 行配置项
  rowConfig: Object as PropType<VxeTablePropTypes.RowConfig>,
  // 数据聚合配置项
  aggregateConfig: Object as PropType<VxeTablePropTypes.AggregateConfig>,
  //  已废弃，被 aggregateConfig 替换
  rowGroupConfig: Object as PropType<VxeTablePropTypes.RowGroupConfig>,
  // 当前行配置项
  currentRowConfig: Object as PropType<VxeTablePropTypes.CurrentRowConfig>,
  // 已废弃，被 rowDragConfig 替换
  dragConfig: Object as PropType<VxeTablePropTypes.DragConfig>,
  // 行拖拽排序配置项
  rowDragConfig: Object as PropType<VxeTablePropTypes.RowDragConfig>,
  // 列拖拽排序配置项
  columnDragConfig: Object as PropType<VxeTablePropTypes.ColumnDragConfig>,
  // 列调整配置项
  resizableConfig: Object as PropType<VxeTablePropTypes.ResizableConfig>,
  // 序号配置项
  seqConfig: Object as PropType<VxeTablePropTypes.SeqConfig>,
  // 排序配置项
  sortConfig: Object as PropType<VxeTablePropTypes.SortConfig>,
  // 筛选配置项
  filterConfig: Object as PropType<VxeTablePropTypes.FilterConfig>,
  // 单选框配置
  radioConfig: Object as PropType<VxeTablePropTypes.RadioConfig>,
  // 复选框配置项
  checkboxConfig: Object as PropType<VxeTablePropTypes.CheckboxConfig>,
  // tooltip 配置项
  tooltipConfig: Object as PropType<VxeTablePropTypes.TooltipConfig>,
  // 导出配置项
  exportConfig: [Boolean, Object],
  // 导入配置项
  importConfig: [Boolean, Object],
  // 打印配置项
  printConfig: Object as PropType<VxeTablePropTypes.PrintConfig>,
  // 展开行配置项
  expandConfig: Object as PropType<VxeTablePropTypes.ExpandConfig>,
  // 树形结构配置项
  treeConfig: [Boolean, Object],
  // 快捷菜单配置项
  menuConfig: [Boolean, Object],
  // 在 v4 中废弃 contextMenu
  contextMenu: [Boolean, Object],
  // 鼠标配置项
  mouseConfig: Object,
  // 区域配置项
  areaConfig: Object,
  // 按键配置项
  keyboardConfig: Object,
  // 复制/粘贴配置项
  clipConfig: Object,
  // 查找/替换配置项
  fnrConfig: Object,
  // 编辑配置项
  editConfig: [Boolean, Object],
  // 校验配置项
  validConfig: Object,
  // 校验规则配置项
  editRules: Object,
  // 加载中配置项
  loadingConfig: Object,
  // 空内容渲染配置项
  emptyRender: [Boolean, Object],
  // 自定义列配置项
  customConfig: Object as PropType<VxeTablePropTypes.CustomConfig>,
  // （即将废弃）横向虚拟滚动配置项
  scrollX: Object as PropType<VxeTablePropTypes.ScrollX>,
  // （即将废弃）纵向虚拟滚动配置项
  scrollY: Object as PropType<VxeTablePropTypes.ScrollY>,
  // 横向虚拟滚动配置项
  virtualXConfig: Object as PropType<VxeTablePropTypes.VirtualXConfig>,
  // 纵向虚拟滚动配置项
  virtualYConfig: Object as PropType<VxeTablePropTypes.VirtualYConfig>,
  // 滚动条配置项
  scrollbarConfig: Object as PropType<VxeTablePropTypes.ScrollbarConfig>,
  // （即将废弃）优化相关
  animat: { type: Boolean, default: () => getConfig().table.animat },
  // （可能会被废弃的参数，不要使用）
  delayHover: { type: Number, default: () => getConfig().table.delayHover },
  // 额外的参数
  params: Object
}
