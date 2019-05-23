import GlobalConfig from '../../../conf'

export default {
/** 基本属性 */
  // 数据
  data: Array,
  // 初始化绑定动态列
  customs: Array,
  // 表格的高度
  height: [Number, String],
  // 表格的最大高度
  maxHeight: [Number, String],
  // 是否允许拖动列宽调整大小
  resizable: Boolean,
  // 是否带有斑马纹
  stripe: Boolean,
  // 是否带有纵向边框
  border: Boolean,
  // 表格的尺寸
  size: { type: String, default: () => GlobalConfig.size },
  // 列的宽度是否自撑开
  fit: { type: Boolean, default: true },
  // 表格是否加载中
  loading: Boolean,
  // 是否显示表头
  showHeader: { type: Boolean, default: true },
  // 是否要高亮当前选中行
  highlightCurrentRow: Boolean,
  // 鼠标移到行是否要高亮显示
  highlightHoverRow: Boolean,
  // 是否显示表尾合计
  showFooter: Boolean,
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
  // 合并行或列
  spanMethod: Function,
  // 设置所有内容过长时显示为省略号
  showAllOverflow: { type: [Boolean, String], default: () => GlobalConfig.showAllOverflow },
  // 设置表头所有内容过长时显示为省略号
  showHeaderAllOverflow: { type: [Boolean, String], default: () => GlobalConfig.showHeaderAllOverflow },

  /** 高级属性 */
  // 行数据的 Key
  rowKey: [String, Number],
  // 是否自动根据父容器大小调整表格宽度
  autoResize: Boolean,
  // 是否自动计算列宽
  autoWidth: { type: Boolean, default: true },
  // 多选配置项
  selectConfig: Object,
  // tooltip 配置项
  tooltipConfig: { type: Object, default: () => GlobalConfig.tooltipConfig },
  // 展开行配置项
  expandConfig: Object,
  // 树形结构配置项
  treeConfig: Object,
  // 快捷菜单配置项
  contextMenu: { type: Object, default: () => GlobalConfig.contextMenu },
  // 鼠标配置项
  mouseConfig: Object,
  // 按键配置项
  keyboardConfig: Object,
  // 编辑配置项
  editConfig: Object,
  // 校验规则配置项
  editRules: Object,
  // 优化配置项
  optimized: Object
}
