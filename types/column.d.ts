import { VXETableModule } from './component'
import { TableRenderParams } from './table'
import { RenderOptions } from './extends/renderer'

/**
 * 列
 */
export declare class Column extends VXETableModule {
  // 渲染类型 index,radio,checkbox,expand,html
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
  fixed?: string;
  // 列对其方式
  align?: string;
  // 表头对齐方式
  headerAlign?: string;
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
  indexMethod?: Function;
  // 是否允许排序
  sortable?: boolean;
  // 是否服务端排序
  remoteSort?: boolean;
  // 自定义排序的属性
  sortBy?: string | string[];
  // 自定义排序方法
  sortMethod?: Function;
  // 配置筛选条件数组
  filters?: any[];
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

export class FormPanel {
  /**
   * 筛选所有发生改变
   * @param evnt 事件
   * @param checked 是否选中
   */
  changeAllOption(evnt: any, checked: boolean): any;
  /**
   * 筛选选项发生改变
   * @param evnt 事件
   * @param checked 是否选中
   * @param option 选项对象
   */
  changeOption(evnt: any, checked: boolean, option: any): any;
  /**
   * 确认筛选
   */
  confirmFilter(): any;
  /**
   * 重置筛选
   */
  resetFilter(): any;
}

/**
 * 列对象
 */
export class ColumnConfig {
  id: string;
  title: string;
  property: string;
  type: string;
  visible: boolean;
  defaultVisible: any;
  checked: boolean;
  disabled: boolean;
  filters: { label: string | number, value?: any, data?: any, checked?: boolean }[];
  order: string;
  renderWidth: number;
  renderHeight: number;
  resizeWidth: number;
}

/**
 * 默认的渲染器配置项
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
 * 可编辑渲染器配置项
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
 * 筛选渲染器配置项
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
  column: ColumnConfig;
  columnIndex: number;
  $columnIndex: number;
  row: any;
  rowIndex: number;
  $rowIndex: number;
}

/**
 * 单元格渲染参数
 */
export interface EditRenderParams extends CellRenderParams {}

/**
 * 筛选渲染参数
 */
export interface FilterRenderParams extends TableRenderParams {
  $panel: FormPanel;
  column: ColumnConfig;
  columnIndex: number;
  $columnIndex: number;
}

/**
 * 筛选渲染参数
 */
export interface FilterMethodParams {
  value: any;
  option: any;
  row: any;
  column: ColumnConfig;
}
