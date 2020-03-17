import { VXETableModule } from './component';

/**
 * 核心模块
 */
export declare class Table extends VXETableModule {
  // 数据
  data?: any[];
  // 表格的高度
  height?: number | string;
  // 表格的最大高度
  maxHeight?: number | string;
  // 所有列是否允许拖动列宽调整大小
  resizable?: boolean;
  // 是否带有斑马纹
  stripe?: boolean;
  // 是否带有纵向边框
  border?: boolean | string;
  // 列的宽度是否自撑开（可能会被废弃的参数，不要使用）
  fit?: boolean;
  // 表格是否加载中
  loading?: boolean;
  // 所有的列对其方式
  align?: string;
  // 所有的表头列的对齐方式
  headerAlign?: string;
  // 所有的表尾列的对齐方式
  footerAlign?: string;
  // 是否显示表头
  showHeader?: boolean;
  // 是否要高亮当前选中行
  highlightCurrentRow?: boolean;
  // 鼠标移到行是否要高亮显示
  highlightHoverRow?: boolean;
  // 是否要高亮当前选中列
  highlightCurrentColumn?: boolean;
  // 鼠标移到列是否要高亮显示
  highlightHoverColumn?: boolean;
  // 激活单元格编辑时是否高亮显示
  highlightCell?: boolean;
  // 是否显示表尾合计
  showFooter?: boolean;
  // 表尾合计的计算方法
  footerMethod?: Function;
  // 给行附加 className
  rowClassName?: string | Function;
  // 给单元格附加 className
  cellClassName?: string | Function;
  // 给表头的行附加 className
  headerRowClassName?: string | Function;
  // 给表头的单元格附加 className
  headerCellClassName?: string | Function;
  // 给表尾的行附加 className
  footerRowClassName?: string | Function;
  // 给表尾的单元格附加 className
  footerCellClassName?: string | Function;
  // 给单元格附加样式
  cellStyle?: any | Function;
  // 给表头单元格附加样式
  headerCellStyle?: any | Function;
  // 给表尾单元格附加样式
  footerCellStyle?: any | Function;
  // 给行附加样式
  rowStyle?: any | Function;
  // 给表头行附加样式
  headerRowStyle?: any | Function;
  // 给表尾行附加样式
  footerRowStyle?: any | Function;
  // 合并行或列
  spanMethod?: Function;
  // 表尾合并行或列
  footerSpanMethod?: Function;
  // 设置所有内容过长时显示为省略号
  showOverflow?: boolean | string;
  // 设置表头所有内容过长时显示为省略号
  showHeaderOverflow?: boolean | string;
  // 设置表尾所有内容过长时显示为省略号
  showFooterOverflow?: boolean | string;
  // 所有列宽度
  columnWidth?: number | string;
  // 所有列最小宽度，把剩余宽度按比例分配
  columnMinWidth?: number | string;

  /** 高级属性 */
  // 主键配置
  columnKey?: boolean;
  rowKey?: boolean;
  rowId?: string;
  zIndex?: number;
  keepSource?: boolean;
  // 是否自动监听父容器变化去更新响应式表格宽高
  autoResize?: boolean;
  // 是否自动根据状态属性去更新响应式表格宽高
  syncResize?: boolean | string;
  // 序号配置项
  seqConfig?: any;
  // 排序配置项
  sortConfig?: any;
  // 筛选配置项
  filterConfig?: any;
  // 单选框配置
  radioConfig?: any;
  // 复选框配置项
  checkboxConfig?: any;
  // tooltip 配置项
  tooltipConfig?: any;
  // 导出配置项
  exportConfig?: boolean | any;
  // 导入配置项
  importConfig?: boolean | any;
  // 打印配置项
  printConfig?: any;
  // 展开行配置项
  expandConfig?: any;
  // 树形结构配置项
  treeConfig?: boolean | any;
  // 快捷菜单配置项
  contextMenu?: boolean | any;
  // 鼠标配置项
  mouseConfig?: any;
  // 按键配置项
  keyboardConfig?: any;
  // 编辑配置项
  editConfig?: boolean | any;
  // 校验配置项
  validConfig?: any;
  // 校验规则配置项
  editRules?: any;
  // 空内容渲染配置项
  emptyRender?: boolean | any;
  // 优化配置项
  optimization?: any;
  // 额外的参数
  params?: any;
}