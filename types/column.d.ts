import { VNode } from 'vue'
import { VXEComponent } from './component'
import { VxeTableConstructor, VxeTableDefines, VxeTablePropTypes } from './table'
import { VxeGlobalRendererHandles } from './v-x-e-table'
import { VxeFilterPanel } from './filter'

/**
 * 组件 - 表格列
 * @example import { Column as VxeColumn } from 'vxe-table'
 */
export const Column: VXEComponent<VxeColumnProps>;

export namespace VxeColumnPropTypes {
  export type ColId = string | number;
  export type Type = 'seq' | 'radio' | 'checkbox' | 'expand' | 'html' | null;
  export type Field = string;
  export type Title = string;
  export type Width = number | string;
  export type MinWidth = number | string;
  export type Resizable = boolean;
  export type Fixed = 'left' | 'right' | null;
  export type Align = 'left' | 'center' | 'right' | null;
  export type HeaderAlign = Align;
  export type FooterAlign = Align;
  export type ShowOverflow = VxeTablePropTypes.ShowOverflow;
  export type ShowHeaderOverflow = ShowOverflow;
  export type ShowFooterOverflow = ShowOverflow;
  export type ClassName = string | ((params: VxeGlobalRendererHandles.RenderCellParams) => string | any[] | { [key: string]: boolean });
  export type HeaderClassName = string | ((params: VxeGlobalRendererHandles.RenderHeaderParams) => string | any[] | { [key: string]: boolean });
  export type FooterClassName = string | ((params: VxeGlobalRendererHandles.RenderFooterParams) => string | any[] | { [key: string]: boolean });

  export type Formatter = ((params: {
    cellValue: any;
    column: VxeTableDefines.ColumnInfo;
    row: any;
  }) => string | number) | any[] | string;

  export type Sortable = boolean;
  export type SortBy = string | ((params: {
    row: any;
    column: VxeTableDefines.ColumnInfo;
  }) => string | number);
  export type SortType = 'string' | 'number' | null;

  export interface Filter {
    label?: string | number;
    value?: any;
    data?: any;
    resetValue?: any;
    checked?: boolean;
  }

  export type FilterMultiple = boolean;

  interface FilterMethodParams {
    value: any;
    option: VxeTableDefines.FilterOption;
    cellValue: any;
    row: any;
    column: VxeTableDefines.ColumnInfo;
  }
  export type FilterMethod = (params: FilterMethodParams) => boolean;

  interface FilterResetMethodParams {
    options: VxeTableDefines.FilterOption[];
    column: VxeTableDefines.ColumnInfo;
  }
  export type FilterResetMethod = (params: FilterResetMethodParams) => void;

  interface FilterRecoverMethodParams {
    option: VxeTableDefines.FilterOption;
    column: VxeTableDefines.ColumnInfo;
  }
  export type FilterRecoverMethod = (params: FilterRecoverMethodParams) => void;

  /**
   * 筛选渲染配置项
   */
  export interface FilterRender extends VxeGlobalRendererHandles.RenderOptions {
    options?: any[];
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps;
    optionGroups?: any[];
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps;
    content?: string;
  }

  export type TreeNode = boolean;
  export type Visible = boolean;

  interface ExportMethodParams {
    $table: VxeTableConstructor,
    row: any;
    column: VxeTableDefines.ColumnInfo;
  }
  export type ExportMethod = (params: ExportMethodParams) => string | number;

  interface FooterExportParams {
    $table: VxeTableConstructor,
    items: any[];
    column: VxeTableDefines.ColumnInfo;
    _columnIndex: number;
  }
  export type FooterExportMethod = (params: FooterExportParams) => string | number;

  export interface TitleHelp {
    message?: string | number;
    icon?: string;
  }

  export type CellType = 'auto' | 'number' | 'string';

  export interface CellRender extends VxeGlobalRendererHandles.RenderOptions {
    events?: { [key: string]: (cellParams: DefaultSlotParams, ...args: any[]) => any };
    options?: any[];
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps;
    optionGroups?: any[];
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps;
    content?: string;
  }

  /**
   * 编辑渲染配置项
   */
  export interface EditRender extends VxeGlobalRendererHandles.RenderOptions {
    events?: { [key: string]: (cellParams: EditSlotParams, ...args: any[]) => any };
    enabled?: boolean;
    options?: any[];
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps;
    optionGroups?: any[];
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps;
    autofocus?: string;
    autoselect?: boolean;
    defaultValue?: any;
    immediate?: boolean;
    content?: string;
    placeholder?: string;
  }

  /**
   * 内容渲染配置项
   */
  export interface ContentRender extends VxeGlobalRendererHandles.RenderOptions {
    options?: any[];
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps;
    optionGroups?: any[];
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps;
  }

  export type Params = any;

  interface FilterSlotParams {
    $panel: VxeFilterPanel;
    column: {
      filters: VxeTableDefines.FilterOption[];
    } & VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    $rowIndex: number;
  }

  interface EditSlotParams {
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    row: any;
    rowIndex: number;
    $rowIndex: number;
  }

  interface FooterSlotParams {
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    _columnIndex: number;
    $columnIndex: number;
    $rowIndex: number;
    items: any[];
    data: any[][];
  }

  interface HeaderSlotParams extends VxeTableDefines.CellRenderHeaderParams { }

  interface ContentSlotParams {
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    row: any;
    rowIndex: number;
    $rowIndex: number;
    isHidden: boolean;
    fixed: VxeColumnPropTypes.Fixed;
    type: string;
  }

  interface DefaultSlotParams extends VxeTableDefines.CellRenderBodyParams { }

  interface IconSlotParams extends DefaultSlotParams { }

  export type Slots = {
    title?: string | ((params: DefaultSlotParams) => JSX.Element[] | VNode[] | string[]) | null;
    radio?: string | ((params: DefaultSlotParams) => JSX.Element[] | VNode[] | string[]) | null;
    checkbox?: string | ((params: DefaultSlotParams) => JSX.Element[] | VNode[] | string[]) | null;
    default?: string | ((params: DefaultSlotParams) => JSX.Element[] | VNode[] | string[]) | null;
    header?: string | ((params: HeaderSlotParams) => JSX.Element[] | VNode[] | string[]) | null;
    footer?: string | ((params: FooterSlotParams) => JSX.Element[] | VNode[] | string[]) | null;
    content?: string | ((params: ContentSlotParams) => JSX.Element[] | VNode[] | string[]) | null;
    filter?: string | ((params: FilterSlotParams) => JSX.Element[] | VNode[] | string[]) | null;
    edit?: string | ((params: EditSlotParams) => JSX.Element[] | VNode[] | string[]) | null;
    icon?: string | ((params: IconSlotParams) => JSX.Element[] | VNode[] | string[]) | null;
  };
}

export type VxeColumnProps = {
  colId?: VxeColumnPropTypes.ColId;
  /**
   * 渲染类型
   */
  type?: VxeColumnPropTypes.Type;
  /**
   * 列字段名
   */
  field?: VxeColumnPropTypes.Field;
  /**
   * 列标题
   */
  title?: VxeColumnPropTypes.Title;
  /**
   * 列宽度
   */
  width?: VxeColumnPropTypes.Width;
  /**
   * 列最小宽度，把剩余宽度按比例分配
   */
  minWidth?: VxeColumnPropTypes.MinWidth;
  /**
   * 是否允许拖动列宽调整大小
   */
  resizable?: VxeColumnPropTypes.Resizable;
  /**
   * 将列固定在左侧或者右侧
   */
  fixed?: VxeColumnPropTypes.Fixed;
  /**
   * 列对其方式
   */
  align?: VxeColumnPropTypes.Align;
  /**
   * 表头对齐方式
   */
  headerAlign?: VxeColumnPropTypes.HeaderAlign;
  /**
   * 表尾列的对齐方式
   */
  footerAlign?: VxeColumnPropTypes.FooterAlign;
  /**
   * 当内容过长时显示为省略号
   */
  showOverflow?: VxeColumnPropTypes.ShowOverflow;
  /**
   * 当表头内容过长时显示为省略号
   */
  showHeaderOverflow?: VxeColumnPropTypes.ShowHeaderOverflow;
  /**
   * 当表尾内容过长时显示为省略号
   */
  showFooterOverflow?: VxeColumnPropTypes.ShowFooterOverflow;
  /**
   * 给单元格附加 className
   */
  className?: VxeColumnPropTypes.ClassName;
  /**
   * 给表头单元格附加 className
   */
  headerClassName?: VxeColumnPropTypes.HeaderClassName;
  /**
   * 给表尾单元格附加 className
   */
  footerClassName?: VxeColumnPropTypes.FooterClassName;
  /**
   * 格式化显示内容
   */
  formatter?: VxeColumnPropTypes.Formatter;
  /**
   * 是否允许排序
   */
  sortable?: VxeColumnPropTypes.Sortable;
  /**
   * 自定义排序的属性
   */
  sortBy?: VxeColumnPropTypes.SortBy;
  /**
   * 排序的字段类型，比如字符串转数值等
   */
  sortType?: VxeColumnPropTypes.SortType;
  /**
   * 配置筛选条件数组
   */
  filters?: VxeColumnPropTypes.Filter[];
  /**
   * 筛选是否允许多选
   */
  filterMultiple?: VxeColumnPropTypes.FilterMultiple;
  /**
   * 自定义筛选方法
   */
  filterMethod?: VxeColumnPropTypes.FilterMethod;
  /**
   * 筛选模板配置项
   */
  filterRender?: VxeColumnPropTypes.FilterRender;
  /**
   * 指定为树节点
   */
  treeNode?: VxeColumnPropTypes.TreeNode;
  /**
   * 是否可视
   */
  visible?: VxeColumnPropTypes.Visible;
  /**
   * 自定义单元格数据导出方法
   */
  exportMethod?: VxeColumnPropTypes.ExportMethod;
  /**
   * 自定义表尾单元格数据导出方法
   */
  footerExportMethod?: VxeColumnPropTypes.FooterExportMethod;
  /**
   * 标题帮助图标配置项
   */
  titleHelp?: VxeColumnPropTypes.TitleHelp;
  /**
   * 单元格值类型
   */
  cellType?: VxeColumnPropTypes.CellType;
  /**
   * 单元格渲染配置项
   */
  cellRender?: VxeColumnPropTypes.CellRender;
  /**
   * 单元格编辑渲染配置项
   */
  editRender?: VxeColumnPropTypes.EditRender;
  /**
   * 内容渲染配置项
   */
  contentRender?: VxeColumnPropTypes.ContentRender;
  /**
   * 额外的参数
   */
  params?: VxeColumnPropTypes.Params;
}
