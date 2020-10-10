import { CreateElement, VNode } from 'vue'
import { VXETableModule } from './component'
import { ColumnFilterOption, ColumnFilterParams, ColumnFilterRenderOptions, ColumnFilterSlotParams, ColumnFilterMethodParams } from './extends/filter'
import { ColumnCellRenderParams, ColumnDefaultSlotParams, ColumnIconSlotParams, ColumnContentSlotParams, RenderOptions, OptionProps, OptionGroupProps } from './extends/renderer'
import { ColumnHeaderSlotParams, ColumnHeaderRenderParams } from './extends/header'
import { ColumnFooterSlotParams, ColumnFooterRenderParams } from './extends/footer'
import { ColumnEditRenderOptions, ColumnEditSlotParams } from './extends/edit'
import { ColumnExportCellRenderParams, ColumnExportFooterRenderParams } from './extends/export'

/**
 * 列
 */
export declare class Column extends VXETableModule {
  /**
   * 渲染类型
   */
  type?: 'seq' | 'radio' | 'checkbox' | 'expand' | 'html';
  /**
   * 列字段名
   */
  field?: string;
  /**
   * 列标题
   */
  title?: string;
  /**
   * 列宽度
   */
  width?: number | string;
  /**
   * 列最小宽度，把剩余宽度按比例分配
   */
  minWidth?: number | string;
  /**
   * 是否允许拖动列宽调整大小
   */
  resizable?: boolean;
  /**
   * 将列固定在左侧或者右侧
   */
  fixed?: 'left' | 'right';
  /**
   * 列对其方式
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 表头对齐方式
   */
  headerAlign?: 'left' | 'center' | 'right';
  /**
   * 表尾列的对齐方式
   */
  footerAlign?: string;
  /**
   * 当内容过长时显示为省略号
   */
  showOverflow?: boolean | string;
  /**
   * 当表头内容过长时显示为省略号
   */
  showHeaderOverflow?: boolean | string;
  /**
   * 当表尾内容过长时显示为省略号
   */
  showFooterOverflow?: boolean | string;
  /**
   * 给单元格附加 className
   */
  className?: string | ((params: ColumnCellRenderParams) => string | any[] | { [key: string]: boolean });
  /**
   * 给表头单元格附加 className
   */
  headerClassName?: string | ((params: ColumnHeaderRenderParams) => string | any[] | { [key: string]: boolean });
  /**
   * 给表尾单元格附加 className
   */
  footerClassName?: string | ((params: ColumnFooterRenderParams) => string | any[] | { [key: string]: boolean });
  /**
   * 格式化显示内容
   */
  formatter?: ((params: ColumnFormatterMethodParams) => string) | any[] | string;
  /**
   * 是否允许排序
   */
  sortable?: boolean;
  /**
   * 是否服务端排序
   */
  remoteSort?: boolean;
  /**
   * 自定义排序的属性
   */
  sortBy?: string | string[];
  /**
   * 自定义排序方法
   */
  sortMethod?(a: any, b: any): boolean;
  /**
   * 配置筛选条件数组
   */
  filters?: ColumnFilterOption[];
  /**
   * 筛选是否允许多选
   */
  filterMultiple?: boolean;
  /**
   * 自定义筛选方法
   */
  filterMethod?(params: ColumnFilterMethodParams): boolean;
  /**
   * 筛选模板配置项
   */
  filterRender?: ColumnFilterRenderOptions;
  /**
   * 指定为树节点
   */
  treeNode?: boolean;
  /**
   * 是否可视
   */
  visible?: boolean;
  /**
   * 自定义单元格数据导出方法
   */
  exportMethod?(params: ColumnExportCellRenderParams): string | number;
  /**
   * 自定义表尾单元格数据导出方法
   */
  footerExportMethod?(params: ColumnExportFooterRenderParams): string | number;
  /**
   * 单元格值类型
   */
  cellType?: string;
  /**
   * 单元格渲染配置项
   */
  cellRender?: ColumnCellRenderOptions;
  /**
   * 单元格编辑渲染配置项
   */
  editRender?: ColumnEditRenderOptions;
  /**
   * 内容渲染配置项
   */
  contentRender?: ColumnContentRenderOptions;
  /**
   * 额外的参数
   */
  params?: any;
}

export interface ColumnOptions {
  /**
   * 渲染类型
   */
  type?: 'seq' | 'radio' | 'checkbox' | 'expand' | 'html';
  /**
   * 列字段名
   */
  field?: string;
  /**
   * 列标题
   */
  title?: string;
  /**
   * 列宽度
   */
  width?: number | string;
  /**
   * 列最小宽度，把剩余宽度按比例分配
   */
  minWidth?: number | string;
  /**
   * 是否允许拖动列宽调整大小
   */
  resizable?: boolean;
  /**
   * 将列固定在左侧或者右侧
   */
  fixed?: 'left' | 'right';
  /**
   * 列对其方式
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 表头对齐方式
   */
  headerAlign?: 'left' | 'center' | 'right';
  /**
   * 表尾列的对齐方式
   */
  footerAlign?: string;
  /**
   * 当内容过长时显示为省略号
   */
  showOverflow?: boolean | string;
  /**
   * 当表头内容过长时显示为省略号
   */
  showHeaderOverflow?: boolean | string;
  /**
   * 当表尾内容过长时显示为省略号
   */
  showFooterOverflow?: boolean | string;
  /**
   * 给单元格附加 className
   */
  className?: string | ((params: ColumnCellRenderParams) => string | any[] | { [key: string]: boolean });
  /**
   * 给表头单元格附加 className
   */
  headerClassName?: string | ((params: ColumnHeaderRenderParams) => string | any[] | { [key: string]: boolean });
  /**
   * 给表尾单元格附加 className
   */
  footerClassName?: string | ((params: ColumnFooterRenderParams) => string | any[] | { [key: string]: boolean });
  /**
   * 格式化显示内容
   */
  formatter?: ((params: ColumnFormatterMethodParams) => string) | any[] | string;
  /**
   * 是否允许排序
   */
  sortable?: boolean;
  /**
   * 是否服务端排序
   */
  remoteSort?: boolean;
  /**
   * 自定义排序的属性
   */
  sortBy?: string | string[];
  /**
   * 自定义排序方法
   */
  sortMethod?(a: any, b: any): boolean;
  /**
   * 配置筛选条件数组
   */
  filters?: ColumnFilterOption[];
  /**
   * 筛选是否允许多选
   */
  filterMultiple?: boolean;
  /**
   * 自定义筛选方法
   */
  filterMethod?(params: ColumnFilterMethodParams): boolean;
  /**
   * 筛选模板配置项
   */
  filterRender?: ColumnFilterRenderOptions;
  /**
   * 指定为树节点
   */
  treeNode?: boolean;
  /**
   * 是否可视
   */
  visible?: boolean;
  /**
   * 自定义单元格数据导出方法
   */
  exportMethod?(params: ColumnExportCellRenderParams): string | number;
  /**
   * 自定义表尾单元格数据导出方法
   */
  footerExportMethod?(params: ColumnExportFooterRenderParams): string | number;
  /**
   * 单元格值类型
   */
  cellType?: string;
  /**
   * 单元格渲染配置项
   */
  cellRender?: ColumnCellRenderOptions;
  /**
   * 单元格编辑渲染配置项
   */
  editRender?: ColumnEditRenderOptions;
  /**
   * 内容渲染配置项
   */
  contentRender?: ColumnContentRenderOptions;
  /**
   * 额外的参数
   */
  params?: any;

  slots?: {
    default?(params: ColumnDefaultSlotParams, h: CreateElement): VNode[] | string[];
    header?(params: ColumnHeaderSlotParams, h: CreateElement): VNode[] | string[];
    footer?(params: ColumnFooterSlotParams, h: CreateElement): VNode[] | string[];
    content?(params: ColumnContentSlotParams, h: CreateElement): VNode[] | string[];
    filter?(params: ColumnFilterSlotParams, h: CreateElement): VNode[] | string[];
    edit?(params: ColumnEditSlotParams, h: CreateElement): VNode[] | string[];
    icon?(params: ColumnIconSlotParams, h: CreateElement): VNode[] | string[];
  };
}

/**
 * 列对象
 */
export class ColumnInfo {
  title: string;
  width: number | string;
  minWidth: number | string;
  resizable: boolean;
  fixed: string;
  property: string;
  type: string;
  sortable: boolean;
  treeNode: boolean;
  filters: ColumnFilterParams[];
  filterRender: ColumnFilterRenderOptions;
  cellType: string;
  cellRender: ColumnCellRenderOptions;
  editRender: ColumnEditRenderOptions;
  contentRender: ColumnContentRenderOptions;

  id: string;
  parentId: string;
  level: number;
  rowSpan: number;
  colSpan: number;
  visible: boolean;
  halfVisible: boolean;
  defaultVisible: any;
  checked: boolean;
  halfChecked: boolean;
  disabled: boolean;
  order: string;
  renderWidth: number;
  renderHeight: number;
  resizeWidth: number;
  model: {
    update: boolean;
    value: any;
  };
  children: ColumnInfo[];

  getTitle(): string;
}

export class ColumnConfig extends ColumnInfo {}

/**
 * 默认的渲染配置项
 */
export interface ColumnCellRenderOptions extends RenderOptions {
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: { [key: string]: any }[];
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: OptionProps;
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: { [key: string]: any }[];
  /**
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: OptionGroupProps;
  /**
   * 渲染组件的内容（需要渲染器支持）
   */
  content?: string;
}

/**
 * 内容渲染配置项
 */
export interface ColumnContentRenderOptions extends RenderOptions {
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: { [key: string]: any }[];
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: OptionProps;
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: { [key: string]: any }[];
  /**
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: OptionGroupProps;
}

/**
 * 格式化方法参数
 */
export interface ColumnFormatterMethodParams {
  /**
   * 单元格值
   */
  cellValue: any;
  /**
   * 列对象
   */
  column: ColumnInfo;
  /**
   * 行数据对象
   */
  row: any;
}
