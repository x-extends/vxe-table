import { VXETableModule } from './module';

/**
 * 核心模块
 */
export declare class Table extends VXETableModule {
  // 数据
  data?: Array<Object>;
  // 初始化绑定动态列
  customs?: Array<Object>;
  // 表格的高度
  height?: number | string;
  // 表格的最大高度
  maxHeight?: number | string;
  // 所有列是否允许拖动列宽调整大小
  resizable?: boolean;
  // 是否带有斑马纹
  stripe?: boolean;
  // 是否带有纵向边框
  border?: boolean;
  // 表格的尺寸
  size?: 'medium' | 'small' | 'mini';
  // 列的宽度是否自撑开
  fit?: boolean;
  // 表格是否加载中
  loading?: boolean;
  // 所有的列对其方式
  align?: string;
  // 所有的表头列的对齐方式
  headerAlign?: string;
  // 是否显示表头
  showHeader?: boolean;
  // 只对 type=index 时有效，自定义序号的起始值
  startIndex?: number;
  // 是否要高亮当前选中行
  highlightCurrentRow?: boolean;
  // 鼠标移到行是否要高亮显示
  highlightHoverRow?: boolean;
  // 是否要高亮当前选中列
  highlightCurrentColumn?: boolean;
  // 鼠标移到列是否要高亮显示
  highlightHoverColumn?: boolean;
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
  // 合并行或列
  spanMethod?: Function;
  // 设置所有内容过长时显示为省略号
  showOverflow?: boolean | string;
  // 设置表头所有内容过长时显示为省略号
  showHeaderOverflow?: boolean | string;
  // 是否所有服务端筛选
  remoteFilter?: boolean;
  // 是否所有服务端排序
  remoteSort?: boolean;
  // 自定义所有列的排序方法
  sortMethod?: Function;
  // 所有列宽度
  columnWidth?: number | string;
  // 所有列最小宽度，把剩余宽度按比例分配
  columnMinWidth?: number | string;

  // 主键配置
  columnKey?: boolean;
  rowKey?: boolean | string;
  rowId?: string;
  // 是否自动监听父容器变化去更新响应式表格宽高
  autoResize?: boolean;
  // 是否自动根据状态属性去更新响应式表格宽高
  syncResize?: boolean;
  // 排序配置项
  sortConfig?: object;
  // 单选配置
  radioConfig?: object;
  // 多选配置项
  selectConfig?: object;
  // tooltip 配置项
  tooltipConfig?: object;
  // 展开行配置项
  expandConfig?: object;
  // 树形结构配置项
  treeConfig?: object;
  // 快捷菜单配置项
  contextMenu?: object;
  // 鼠标配置项
  mouseConfig?: object;
  // 按键配置项
  keyboardConfig?: object;
  // 编辑配置项
  editConfig?: object;
  // 校验配置项
  validConfig?: object;
  // 校验规则配置项
  editRules?: object;
  // 优化配置项
  optimization?: object;
  // 额外的参数
  params?: object
}