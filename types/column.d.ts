import { VXETableModule } from './component'
import { TableRenderParams } from './table'
import { FormPanel } from './form'
import { RenderOptions } from './extends/renderer'

/**
 * 列
 */
export declare class Column extends VXETableModule {
  /**
   * 渲染类型
   */
  type?: 'index' | 'radio' | 'checkbox' | 'expand' | 'html';
  // 列字段名
  field?: string;
  // 列标题
  title?: string;
  // 列宽度
  width?: number | string;
  // 列最小宽度，把剩余宽度按比例分配
  minWidth?: number | string;
  // 是否允许拖动列宽调整大小
  resizable?: boolean;
  // 将列固定在左侧或者右侧
  fixed?: 'left' | 'right';
  // 列对其方式
  align?: 'left' | 'center' | 'right';
  // 表头对齐方式
  headerAlign?: 'left' | 'center' | 'right';
  // 表尾列的对齐方式
  footerAlign?: string;
  // 当内容过长时显示为省略号
  showOverflow?: boolean | string;
  // 当表头内容过长时显示为省略号
  showHeaderOverflow?: boolean | string;
  // 当表尾内容过长时显示为省略号
  showFooterOverflow?: boolean | string;
  // 给单元格附加 className
  className?: string | Function;
  // 给表头单元格附加 className
  headerClassName?: string | Function;
  // 给表尾单元格附加 className
  footerClassName?: string | Function;
  // 格式化显示内容
  formatter?: Function | any[] | string;
  // 自定义索引方法
  seqMethod?: Function;
  // 是否允许排序
  sortable?: boolean;
  // 是否服务端排序
  remoteSort?: boolean;
  // 自定义排序的属性
  sortBy?: string | string[];
  // 自定义排序方法
  sortMethod?(a: any, b: any): boolean;
  // 配置筛选条件数组
  filters?: {
    label: string | number;
    value: any;
    data: any;
    resetValue: any;
    checked: boolean;
  }[];
  // 筛选是否允许多选
  filterMultiple?: boolean;
  // 自定义筛选方法
  filterMethod?: Function;
  // 筛选模板配置项
  filterRender?: FilterRenderOptions;
  // 指定为树节点
  treeNode?: boolean;
  // 是否可视
  visible?: boolean;
  // 单元格渲染配置项
  cellRender?: CellRenderOptions;
  // 单元格编辑渲染配置项
  editRender?: EditRenderOptions;
  // 内容渲染配置项
  contentRender?: ContentRenderOptions;
  // 额外的参数
  params?: any;
}

export interface ColumnOptions {
  /**
   * 渲染类型
   */
  type?: 'index' | 'radio' | 'checkbox' | 'expand' | 'html';
  // 列字段名
  field?: string;
  // 列标题
  title?: string;
  // 列宽度
  width?: number | string;
  // 列最小宽度，把剩余宽度按比例分配
  minWidth?: number | string;
  // 是否允许拖动列宽调整大小
  resizable?: boolean;
  // 将列固定在左侧或者右侧
  fixed?: 'left' | 'right';
  // 列对其方式
  align?: 'left' | 'center' | 'right';
  // 表头对齐方式
  headerAlign?: 'left' | 'center' | 'right';
  // 表尾列的对齐方式
  footerAlign?: string;
  // 当内容过长时显示为省略号
  showOverflow?: boolean | string;
  // 当表头内容过长时显示为省略号
  showHeaderOverflow?: boolean | string;
  // 当表尾内容过长时显示为省略号
  showFooterOverflow?: boolean | string;
  // 给单元格附加 className
  className?: string | Function;
  // 给表头单元格附加 className
  headerClassName?: string | Function;
  // 给表尾单元格附加 className
  footerClassName?: string | Function;
  // 格式化显示内容
  formatter?: Function | any[] | string;
  // 自定义索引方法
  seqMethod?: Function;
  // 是否允许排序
  sortable?: boolean;
  // 是否服务端排序
  remoteSort?: boolean;
  // 自定义排序的属性
  sortBy?: string | string[];
  // 自定义排序方法
  sortMethod?(a: any, b: any): boolean;
  // 配置筛选条件数组
  filters?: {
    label: string | number;
    value: any;
    data: any;
    resetValue: any;
    checked: boolean;
  }[];
  // 筛选是否允许多选
  filterMultiple?: boolean;
  // 自定义筛选方法
  filterMethod?: Function;
  // 筛选模板配置项
  filterRender?: FilterRenderOptions;
  // 指定为树节点
  treeNode?: boolean;
  // 是否可视
  visible?: boolean;
  // 单元格渲染配置项
  cellRender?: CellRenderOptions;
  // 单元格编辑渲染配置项
  editRender?: EditRenderOptions;
  // 内容渲染配置项
  contentRender?: ContentRenderOptions;
  // 额外的参数
  params?: any;
}

/**
 * 列对象
 */
export class ColumnConfig {
  id: string;
  title: string;
  width: number | string;
  minWidth: number | string;
  resizable: boolean;
  property: string;
  type: string;
  sortable: boolean;
  visible: boolean;
  defaultVisible: any;
  checked: boolean;
  disabled: boolean;
  treeNode: boolean;
  filters: FilterOption[];
  filterRender: FilterRenderOptions;
  cellRender: CellRenderOptions;
  editRender: EditRenderOptions;
  contentRender: ContentRenderOptions;
  order: string;
  renderWidth: number;
  renderHeight: number;
  resizeWidth: number;

  getTitle(): string;
}

export interface FilterOption {
  label: string | number;
  value: any;
  data: any;
  resetValue: any;
  checked: boolean;
}

/**
 * 默认的渲染配置项
 */
export interface CellRenderOptions extends RenderOptions {
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: any[];
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: { value?: string, label?: string, disabled?: string };
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: any[];
  /**
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: { options?: string, label?: string };
  /**
   * 渲染组件的内容（需要渲染器支持）
   */
  content?: string;
}

/**
 * 编辑渲染配置项
 */
export interface EditRenderOptions extends RenderOptions {
  /**
   * 渲染类型（需要渲染器支持）
   */
  type?: 'default' | 'visible';
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: any[];
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: { value?: string, label?: string, disabled?: string };
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: any[];
  /**
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: { options?: string, label?: string };
  /**
   * 指定聚焦的选择器（需要渲染器支持）
   */
  autofocus?: string;
  /**
   * 是否在激活编辑之后自动选中输入框内容（需要渲染器支持）
   */
  autoselect?: boolean;
  /**
   * 默认值（需要渲染器支持）
   */
  defaultValue?: any;
  /**
   * 输入值实时同步更新（需要渲染器支持）
   */
  immediate?: boolean;
  /**
   * 渲染组件的内容（需要渲染器支持）
   */
  content?: string;
}

/**
 * 筛选渲染配置项
 */
export interface FilterRenderOptions extends RenderOptions {
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: any[];
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: { value?: string, label?: string, disabled?: string };
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: any[];
  /**
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: { options?: string, label?: string };
  /**
   * 渲染组件的内容（需要渲染器支持）
   */
  content?: string;
}

/**
 * 内容渲染配置项
 */
export interface ContentRenderOptions extends RenderOptions {
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: any[];
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: { value?: string, label?: string, disabled?: string };
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: any[];
  /**
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: { options?: string, label?: string };
}

/**
 * 单元格渲染参数
 */
export interface CellRenderParams extends TableRenderParams {
  /**
   * 列对象
   */
  column: ColumnConfig;
  /**
   * 相对于 columns 中的索引
   */
  columnIndex: number;
  /**
   * 相对于可视区渲染中的列索引
   */
  $columnIndex: number;
  /**
   * 行数据对象
   */
  row: any;
  /**
   * 相对于 data 中的索引
   */
  rowIndex: number;
  /**
   * 相对于当前表格数据的索引
   */
  $rowIndex: number;
}

/**
 * 单元格渲染参数
 */
export interface EditRenderParams extends CellRenderParams {}

/**
 * 表尾渲染参数
 */
export interface FooterRenderParams extends TableRenderParams {
/**
   * 列对象
   */
  column: ColumnConfig;
  /**
   * 相对于 columns 中的索引
   */
  columnIndex: number;
  /**
   * 相对于可视区渲染中的列索引
   */
  $columnIndex: number;
  /**
   * 相对于表尾行数据的索引
   */
  $rowIndex: number;
  /**
   * 表尾项列表
   */
  items: any[];
  /**
   * 表尾项索引
   */
  itemIndex: number;
  /**
   * 表尾数据集
   */
  data: any[][];
}

/**
 * 筛选渲染参数
 */
export interface FilterRenderParams extends TableRenderParams {
  /**
   * 筛选面板实例对象
   */
  $panel: FormPanel;
  /**
   * 列对象
   */
  column: ColumnConfig;
  /**
   * 相对于 columns 中的索引
   */
  columnIndex: number;
  /**
   * 相对于可视区渲染中的列索引
   */
  $columnIndex: number;
}

/**
 * 筛选渲染参数
 */
export interface FilterMethodParams {
  /**
   * 选项值
   */
  value: any;
  /**
   * 选项
   */
  option: any;
  /**
   * 行数据对象
   */
  row: any;
  /**
   * 列对象
   */
  column: ColumnConfig;
}

/**
 * 项渲染参数
 */
export interface FilterResetParams extends TableRenderParams {
  /**
   * 筛选选项列表
   */
  options: FilterOption[];
  /**
   * 列对象
   */
  column: ColumnConfig;
}
