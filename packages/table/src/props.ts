import { PropType } from 'vue'
import GlobalConfig from '../../v-x-e-table/src/conf'

import { VxeTablePropTypes } from '../../../types/all'

export default {
  /** 基本属性 */
  id: String as PropType<VxeTablePropTypes.ID>,
  // 数据
  data: Array as PropType<any[]>,
  // 表格的高度
  height: [Number, String] as PropType<VxeTablePropTypes.Height>,
  // 表格的最大高度
  maxHeight: [Number, String] as PropType<VxeTablePropTypes.MaxHeight>,
  // 所有列是否允许拖动列宽调整大小
  resizable: { type: Boolean as PropType<VxeTablePropTypes.Resizable>, default: () => GlobalConfig.table.resizable },
  // 是否带有斑马纹
  stripe: { type: Boolean as PropType<VxeTablePropTypes.Stripe>, default: () => GlobalConfig.table.stripe },
  // 是否带有边框
  border: { type: [Boolean, String] as PropType<VxeTablePropTypes.Border>, default: () => GlobalConfig.table.border },
  // 是否圆角边框
  round: { type: Boolean as PropType<VxeTablePropTypes.Round>, default: () => GlobalConfig.table.round },
  // 表格的尺寸
  size: { type: String as PropType<VxeTablePropTypes.Size>, default: () => GlobalConfig.table.size || GlobalConfig.size },
  // 列的宽度是否自撑开（可能会被废弃的参数，不要使用）
  fit: { type: Boolean as PropType<VxeTablePropTypes.Fit>, default: () => GlobalConfig.table.fit },
  // 表格是否加载中
  loading: Boolean as PropType<VxeTablePropTypes.Loading>,
  // 所有的列对其方式
  align: { type: String as PropType<VxeTablePropTypes.Align>, default: () => GlobalConfig.table.align },
  // 所有的表头列的对齐方式
  headerAlign: { type: String as PropType<VxeTablePropTypes.HeaderAlign>, default: () => GlobalConfig.table.headerAlign },
  // 所有的表尾列的对齐方式
  footerAlign: { type: String as PropType<VxeTablePropTypes.FooterAlign>, default: () => GlobalConfig.table.footerAlign },
  // 是否显示表头
  showHeader: { type: Boolean as PropType<VxeTablePropTypes.ShowHeader>, default: () => GlobalConfig.table.showHeader },
  // 是否要高亮当前选中行
  highlightCurrentRow: { type: Boolean as PropType<VxeTablePropTypes.HighlightCurrentRow>, default: () => GlobalConfig.table.highlightCurrentRow },
  // 鼠标移到行是否要高亮显示
  highlightHoverRow: { type: Boolean as PropType<VxeTablePropTypes.HighlightHoverRow>, default: () => GlobalConfig.table.highlightHoverRow },
  // 是否要高亮当前选中列
  highlightCurrentColumn: { type: Boolean as PropType<VxeTablePropTypes.HighlightCurrentColumn>, default: () => GlobalConfig.table.highlightCurrentColumn },
  // 鼠标移到列是否要高亮显示
  highlightHoverColumn: { type: Boolean as PropType<VxeTablePropTypes.HighlightHoverColumn>, default: () => GlobalConfig.table.highlightHoverColumn },
  // 激活单元格编辑时是否高亮显示
  highlightCell: Boolean as PropType<VxeTablePropTypes.HighlightCell>,
  // 是否显示表尾合计
  showFooter: Boolean as PropType<VxeTablePropTypes.ShowFooter>,
  // 表尾合计的计算方法
  footerMethod: { type: Function as PropType<VxeTablePropTypes.FooterMethod>, default: GlobalConfig.table.footerMethod },
  // 给行附加 className
  rowClassName: [String, Function] as PropType<VxeTablePropTypes.RowClassName>,
  // 给单元格附加 className
  cellClassName: [String, Function] as PropType<VxeTablePropTypes.CellClassName>,
  // 给表头的行附加 className
  headerRowClassName: [String, Function] as PropType<VxeTablePropTypes.HeaderRowClassName>,
  // 给表头的单元格附加 className
  headerCellClassName: [String, Function] as PropType<VxeTablePropTypes.HeaderRowClassName>,
  // 给表尾的行附加 className
  footerRowClassName: [String, Function] as PropType<VxeTablePropTypes.FooterRowClassName>,
  // 给表尾的单元格附加 className
  footerCellClassName: [String, Function] as PropType<VxeTablePropTypes.FooterRowClassName>,
  // 给单元格附加样式
  cellStyle: [Object, Function] as PropType<VxeTablePropTypes.CellStyle>,
  // 给表头单元格附加样式
  headerCellStyle: [Object, Function] as PropType<VxeTablePropTypes.HeaderCellStyle>,
  // 给表尾单元格附加样式
  footerCellStyle: [Object, Function] as PropType<VxeTablePropTypes.FooterCellStyle>,
  // 给行附加样式
  rowStyle: [Object, Function] as PropType<VxeTablePropTypes.RowStyle>,
  // 给表头行附加样式
  headerRowStyle: [Object, Function] as PropType<VxeTablePropTypes.HeaderRowStyle>,
  // 给表尾行附加样式
  footerRowStyle: [Object, Function] as PropType<VxeTablePropTypes.FooterRowStyle>,
  // 合并指定单元格
  mergeCells: Array as PropType<VxeTablePropTypes.MergeCells>,
  // 合并指定的表尾
  mergeFooterItems: Array as PropType<VxeTablePropTypes.MergeFooterItems>,
  // 自定义合并行或列的方法
  spanMethod: Function as PropType<VxeTablePropTypes.SpanMethod>,
  // 表尾合并行或列
  footerSpanMethod: Function as PropType<VxeTablePropTypes.FooterSpanMethod>,
  // 设置所有内容过长时显示为省略号
  showOverflow: { type: [Boolean, String] as PropType<VxeTablePropTypes.ShowOverflow>, default: () => GlobalConfig.table.showOverflow },
  // 设置表头所有内容过长时显示为省略号
  showHeaderOverflow: { type: [Boolean, String] as PropType<VxeTablePropTypes.ShowHeaderOverflow>, default: () => GlobalConfig.table.showHeaderOverflow },
  // 设置表尾所有内容过长时显示为省略号
  showFooterOverflow: { type: [Boolean, String] as PropType<VxeTablePropTypes.ShowFooterOverflow>, default: () => GlobalConfig.table.showFooterOverflow },

  /** 高级属性 */
  // 主键配置
  columnKey: Boolean as PropType<VxeTablePropTypes.ColumnKey>,
  rowKey: Boolean as PropType<VxeTablePropTypes.RowKey>,
  rowId: { type: String as PropType<VxeTablePropTypes.RowId>, default: () => GlobalConfig.table.rowId },
  zIndex: Number as PropType<VxeTablePropTypes.ZIndex>,
  emptyText: { type: String as PropType<VxeTablePropTypes.EmptyText>, default: () => GlobalConfig.table.emptyText },
  keepSource: { type: Boolean as PropType<VxeTablePropTypes.KeepSource>, default: () => GlobalConfig.table.keepSource },
  // 是否自动监听父容器变化去更新响应式表格宽高
  autoResize: { type: Boolean as PropType<VxeTablePropTypes.AutoResize>, default: () => GlobalConfig.table.autoResize },
  // 是否自动根据状态属性去更新响应式表格宽高
  syncResize: [Boolean, String, Number],
  // 设置列的默认参数，仅对部分支持的属性有效
  columnConfig: Object as PropType<VxeTablePropTypes.ColumnConfig>,
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
  exportConfig: Object as PropType<VxeTablePropTypes.ExportConfig>,
  // 导入配置项
  importConfig: Object as PropType<VxeTablePropTypes.ImportConfig>,
  // 打印配置项
  printConfig: Object as PropType<VxeTablePropTypes.PrintConfig>,
  // 展开行配置项
  expandConfig: Object as PropType<VxeTablePropTypes.ExpandConfig>,
  // 树形结构配置项
  treeConfig: Object as PropType<VxeTablePropTypes.TreeConfig>,
  // 快捷菜单配置项
  menuConfig: Object as PropType<VxeTablePropTypes.MenuConfig>,
  // 鼠标配置项
  mouseConfig: Object as PropType<VxeTablePropTypes.MouseConfig>,
  // 区域配置项
  areaConfig: Object as PropType<VxeTablePropTypes.AreaConfig>,
  // 按键配置项
  keyboardConfig: Object as PropType<VxeTablePropTypes.KeyboardConfig>,
  // 复制粘/贴配置项
  clipConfig: Object as PropType<VxeTablePropTypes.ClipConfig>,
  // 查找/替换配置项
  fnrConfig: Object as PropType<VxeTablePropTypes.FNRConfig>,
  // 编辑配置项
  editConfig: Object as PropType<VxeTablePropTypes.EditConfig>,
  // 校验配置项
  validConfig: Object as PropType<VxeTablePropTypes.ValidConfig>,
  // 校验规则配置项
  editRules: Object as PropType<VxeTablePropTypes.EditRules>,
  // 空内容渲染配置项
  emptyRender: Object as PropType<VxeTablePropTypes.EmptyRender>,
  // 自定义列配置项
  customConfig: Object as PropType<VxeTablePropTypes.CustomConfig>,
  // 横向虚拟滚动配置项
  scrollX: Object as PropType<VxeTablePropTypes.ScrollX>,
  // 纵向虚拟滚动配置项
  scrollY: Object as PropType<VxeTablePropTypes.ScrollY>,
  // 优化相关
  animat: { type: Boolean as PropType<VxeTablePropTypes.Animat>, default: () => GlobalConfig.table.animat },
  delayHover: { type: Number as PropType<VxeTablePropTypes.DelayHover>, default: () => GlobalConfig.table.delayHover as number },
  // 额外的参数
  params: Object as PropType<VxeTablePropTypes.Params>
}
