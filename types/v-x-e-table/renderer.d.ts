import { VNode } from 'vue'
import { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods, VxeTablePropTypes } from '../table'
import { VxeGridConstructor } from '../grid'
import { VxeColumnPropTypes } from '../column'
import { VxeFilterPanel } from '../filter'
import { VxeToolbarPropTypes } from '../toolbar'
import { FormItemRenderOptions, FormItemTitleRenderParams, FormItemContentRenderParams, FormItemVisibleParams, FormItemResetParams } from '../form-item'

type RendererOptions = DefineRendererOption<VxeGlobalRendererHandles.RenderResult | JSX.Element[]>;

interface DefineRendererOption<T> {
  // 筛选渲染
  className?: string;
  showFilterFooter?: boolean;
  renderFilter?(renderOpts: VxeGlobalRendererHandles.RenderFilterOptions, params: VxeGlobalRendererHandles.RenderFilterParams): T;
  filterMethod?(params: VxeGlobalRendererHandles.FilterMethodParams): boolean;
  filterRemoteMethod?(params: VxeGlobalRendererHandles.FilterRemoteMethod): boolean;
  filterResetMethod?(params: VxeGlobalRendererHandles.FilterResetMethodParams): void;
  filterRecoverMethod?(params: VxeGlobalRendererHandles.FilterRecoverMethodParams): void;

  // 单元格渲染
  renderHeader?(renderOpts: VxeGlobalRendererHandles.RenderHeaderOptions, params: VxeGlobalRendererHandles.RenderHeaderParams): T;
  renderDefault?(renderOpts: VxeGlobalRendererHandles.RenderDefaultOptions, params: VxeGlobalRendererHandles.RenderDefaultParams): T;
  renderFooter?(renderOpts: VxeGlobalRendererHandles.RenderFooterOptions, params: VxeGlobalRendererHandles.RenderFooterParams): T;
  exportMethod?(params: VxeGlobalRendererHandles.ExportMethodParams): string;
  footerExportMethod?(params: VxeGlobalRendererHandles.FooterExportMethodParams): string;

  // 编辑渲染
  autofocus?: string;
  renderEdit?(renderOpts: VxeGlobalRendererHandles.RenderEditOptions, params: VxeGlobalRendererHandles.RenderEditParams): T;
  renderCell?(renderOpts: VxeGlobalRendererHandles.RenderCellOptions, params: VxeGlobalRendererHandles.RenderCellParams): T;

  // 内容渲染
  renderExpand?(renderOpts: VxeGlobalRendererHandles.RenderExpandOptions, params: VxeGlobalRendererHandles.RenderExpandParams): T;

  // 工具栏-按钮渲染
  renderToolbarButton?(renderOpts: VxeGlobalRendererHandles.RenderButtonOptions, params: VxeGlobalRendererHandles.RenderButtonParams): T;
  renderToolbarTool?(renderOpts: VxeGlobalRendererHandles.RenderToolOptions, params: VxeGlobalRendererHandles.RenderToolParams): T;

  // 表单-项渲染
  renderItemTitle?(renderOpts: VxeGlobalRendererHandles.RenderItemTitleOptions, params: VxeGlobalRendererHandles.RenderItemTitleParams): T;
  renderItemContent?(renderOpts: VxeGlobalRendererHandles.RenderItemContentOptions, params: VxeGlobalRendererHandles.RenderItemContentParams): T;
  itemVisibleMethod?(params: VxeGlobalRendererHandles.ItemVisibleMethodParams): boolean;
  itemResetMethod?(params: VxeGlobalRendererHandles.ItemResetMethodParams): void;

  // 空内容渲染
  renderEmpty?(renderOpts: VxeGlobalRendererHandles.RenderEmptyOptions, params: VxeGlobalRendererHandles.RenderEmptyParams): T;
}

export namespace VxeGlobalRendererHandles {
  export type RenderResult = VNode[] | string[]

  export interface RenderFilterOptions extends VxeColumnPropTypes.FilterRender {}

  export interface RenderParams {}

  export type RenderFilterParams = {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $panel: VxeFilterPanel;
    column: {
      filters: VxeTableDefines.FilterOption[];
    } & VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    $rowIndex: number;
  };

  export type FilterMethodParams = {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    value: any;
    option: VxeTableDefines.FilterOption;
    cellValue: any;
    row: any;
    column: VxeTableDefines.ColumnInfo;
  };

  export interface FilterRemoteMethod extends VxeTableDefines.FilterChangeParams {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
  }

  export interface FilterResetMethodParams {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    options: VxeTableDefines.FilterOption[];
    column: VxeTableDefines.ColumnInfo;
  }

  export interface FilterRecoverMethodParams {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    option: VxeTableDefines.FilterOption;
    column: VxeTableDefines.ColumnInfo;
  }

  export interface RenderHeaderOptions extends VxeGlobalRendererHandles.RenderOptions { }

  export interface RenderHeaderParams {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    $rowIndex: number;
  }

  export type RenderDefaultOptions = VxeColumnPropTypes.EditRender;
  export type RenderDefaultParams = RenderEditParams;

  export interface RenderFooterOptions extends VxeGlobalRendererHandles.RenderOptions { }

  export interface RenderFooterParams {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    _columnIndex: number;
    $columnIndex: number;
    $rowIndex: number;
    items: any[];
    data: any[][];
  }

  export interface ExportMethodParams {
    row: any;
    column: VxeTableDefines.ColumnInfo;
    options: VxeTablePropTypes.ExportHandleOptions;
  }

  export interface FooterExportMethodParams {
    items: any[];
    _columnIndex: number;
    column: VxeTableDefines.ColumnInfo;
    options: VxeTablePropTypes.ExportHandleOptions;
  }

  export type RenderEditOptions = VxeColumnPropTypes.EditRender;

  export interface RenderEditParams {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    rowid: string;
    row: any;
    rowIndex: number;
    $rowIndex: number;
    isHidden: boolean;
    fixed: VxeColumnPropTypes.Fixed;
    type: string;
  }

  export type RenderCellOptions = VxeColumnPropTypes.EditRender;
  export type RenderCellParams = {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    rowid: string;
    row: any;
    rowIndex: number;
    $rowIndex: number;
    isHidden: boolean;
    fixed: VxeColumnPropTypes.Fixed;
    type: string;
  };

  export interface RenderExpandOptions extends VxeColumnPropTypes.ContentRender { }
  export type RenderExpandParams = RenderEditParams;

  export interface RenderButtonOptions extends VxeGlobalRendererHandles.RenderOptions { }
  export interface RenderButtonParams {
    $grid: VxeGridConstructor | null;
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    button: VxeToolbarPropTypes.ButtonConfig;
  }

  export interface RenderToolOptions extends VxeGlobalRendererHandles.RenderOptions { }
  export interface RenderToolParams {
    $grid: VxeGridConstructor | null;
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    tool: VxeToolbarPropTypes.ToolConfig;
  }

  export type RenderItemTitleOptions = FormItemRenderOptions;
  export type RenderItemTitleParams = FormItemTitleRenderParams;
  export type RenderItemContentOptions = FormItemRenderOptions;
  export type RenderItemContentParams = FormItemContentRenderParams;
  export type ItemVisibleMethodParams = FormItemVisibleParams;
  export type ItemResetMethodParams = FormItemResetParams;

  export type RenderEmptyOptions = VxeTablePropTypes.EmptyRender;

  export interface RenderEmptyParams {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
  }

  /**
   * 渲染选项
   */
  export interface RenderOptions {
    /**
     * 渲染器名称
     */
    name: string;
    /**
     * 目标组件渲染的参数
     */
    props?: { [key: string]: any };
    /**
     * 目标组件渲染的属性
     */
    attrs?: { [key: string]: any };
    /**
     * 目标组件渲染的事件
     */
    events?: { [key: string]: Function };
    /**
     * 多目标渲染
     */
    children?: any[];
    /**
     * 渲染类型
     */
    cellType?: 'string' | 'number';
  }

  /**
   * 选项参数
   */
  export interface RenderOptionProps {
    value?: string;
    label?: string;
    key?: string;
  }

  /**
   * 分组选项参数
   */
  export interface RenderOptionGroupProps {
    options?: string;
    label?: string;
    key?: string;
  }
}

/**
 * 渲染器
 */
export interface VxeGlobalRenderer {
  mixin(options: {
    [name: string]: RendererOptions;
  }): VxeGlobalRenderer;
  get(name: string): DefineRendererOption<VxeGlobalRendererHandles.RenderResult>;
  add(name: string, options: RendererOptions): VxeGlobalRenderer;
  delete(name: string): void;
}
