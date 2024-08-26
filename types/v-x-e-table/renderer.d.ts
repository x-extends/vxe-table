import { CreateElement } from 'vue'
import { SlotVNodeType, RowInfo, VNodeStyle, VNodeClassName } from '../component'
import { Table } from '../table'
import { Grid } from '../grid'
import { ColumnInfo, ColumnCellRenderOptions, ColumnContentRenderOptions } from '../column'
import { ColumnExportCellRenderParams, ColumnExportFooterRenderParams } from '../module/export'
import { ColumnEditRenderOptions, ColumnEditRenderParams } from '../module/edit'
import { ColumnFilterRenderOptions, ColumnFilterRenderParams, ColumnFilterMethodParams, ColumnFilterResetParams } from '../module/filter'
import { ToolbarButtonRenderOptions, ToolbarButtonRenderParams, ToolbarToolRenderOptions, ToolbarToolRenderParams } from '../toolbar'
import { FormItemRenderOptions, FormItemRenderParams, FormItemVisibleParams, FormItemResetParams } from '../form-item'

/* eslint-disable no-use-before-define */

/**
 * 渲染器
 */
export interface VxeGlobalRenderer {
  mixin(map: { [name: string]: RendererMapOptions }): VxeGlobalRenderer;
  get(name: string): RendererMapOptions;
  add(name: string, options: RendererMapOptions): VxeGlobalRenderer;
  delete(name: string): VxeGlobalRenderer;
}

export interface RendererMapOptions {
  /**
   * 请使用 filterClassName
   * @deprecated
   */
  className?: string;
  /**
   * 请使用 showFilterFooter
   * @deprecated
   */
  isFooter?: boolean;

  /**
   * 请使用 tableFilterClassName
   * @deprecated
   */
  filterClassName?: string | ((params: ColumnFilterRenderParams) => string | VNodeClassName)
  tableFilterClassName?: string | ((params: ColumnFilterRenderParams) => string | VNodeClassName)

  /**
   * 请使用 showTableFilterFooter
   * @deprecated
   */
  showFilterFooter?: boolean;
  showTableFilterFooter?: boolean;

  /**
   * 已废弃，请使用 renderTableFilter
   * @deprecated
   */
  renderFilter?(h: CreateElement, renderOpts: ColumnFilterRenderOptions, params: ColumnFilterRenderParams): SlotVNodeType | SlotVNodeType[];
  renderTableFilter?(h: CreateElement, renderOpts: ColumnFilterRenderOptions, params: ColumnFilterRenderParams): SlotVNodeType | SlotVNodeType[];

  /**
   * 已废弃，请使用 tableFilterMethod
   * @deprecated
   */
  filterMethod?(params: ColumnFilterMethodParams): boolean;
  tableFilterMethod?(params: ColumnFilterMethodParams): boolean;

  /**
   * 已废弃，请使用 tableFilterResetMethod
   * @deprecated
   */
  filterResetMethod?(params: ColumnFilterResetParams): void;
  tableFilterResetMethod?(params: ColumnFilterResetParams): void;

  /**
   * 已废弃，请使用 tableFilterDefaultMethod
   * @deprecated
   */
  defaultFilterMethod?(params: ColumnFilterMethodParams): boolean;
  /**
   * 已废弃，请使用 tableFilterDefaultMethod
   * @deprecated
   */
  defaultTableFilterMethod?(params: ColumnFilterMethodParams): boolean;
  tableFilterDefaultMethod?(params: ColumnFilterMethodParams): boolean;

  /**
   * 已废弃，请使用 tableCellClassName
   * @deprecated
   */
  cellClassName?: string | ((params: ColumnCellRenderParams | ColumnEditRenderParams) => string | VNodeClassName)
  tableCellClassName?: string | ((params: ColumnCellRenderParams | ColumnEditRenderParams) => string | VNodeClassName)

  /**
   * 已废弃，请使用 tableCellStyle
   * @deprecated
   */
  cellStyle?: VNodeStyle | ((params: ColumnCellRenderParams | ColumnEditRenderParams) => VNodeStyle)
  tableCellStyle?: VNodeStyle | ((params: ColumnCellRenderParams | ColumnEditRenderParams) => VNodeStyle)

  /**
   * 已废弃，请使用 renderTableHeader
   * @deprecated
   */
  renderHeader?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): SlotVNodeType | SlotVNodeType[];
  renderTableHeader?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): SlotVNodeType | SlotVNodeType[];

  /**
   * 已废弃，请使用 renderTableDefault
   * @deprecated
   */
  renderDefault?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): SlotVNodeType | SlotVNodeType[];
  renderTableDefault?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): SlotVNodeType | SlotVNodeType[];

  /**
   * 已废弃，请使用 renderTableFooter
   * @deprecated
   */
  renderFooter?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: any): SlotVNodeType | SlotVNodeType[];
  renderTableFooter?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: any): SlotVNodeType | SlotVNodeType[];

  /**
   * 已废弃，请使用 tableExportMethod
   * @deprecated
   */
  exportMethod?(params: ColumnExportCellRenderParams): string;
  tableExportMethod?(params: ColumnExportCellRenderParams): string;

  /**
   * 已废弃，请使用 tableFooterExportMethod
   * @deprecated
   */
  footerExportMethod?(params: ColumnExportFooterRenderParams): string;
  tableFooterExportMethod?(params: ColumnExportFooterRenderParams): string;

  /**
   * 已废弃，请使用 tableAutofocus
   * @deprecated
   */
  autofocus?: string | ((params: ColumnCellRenderParams | ColumnEditRenderParams) => HTMLElement | null);
  tableAutofocus?: string | ((params: ColumnCellRenderParams | ColumnEditRenderParams) => HTMLElement | null);

  /**
   * 已废弃，请使用 renderTableEdit
   * @deprecated
   */
  renderEdit?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): SlotVNodeType | SlotVNodeType[];
  renderTableEdit?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): SlotVNodeType | SlotVNodeType[];

  /**
   * 已废弃，请使用 renderTableCell
   * @deprecated
   */
  renderCell?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): SlotVNodeType | SlotVNodeType[];
  renderTableCell?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): SlotVNodeType | SlotVNodeType[];

  /**
   * 已废弃，请使用 renderTableExpand
   * @deprecated
   */
  renderExpand?(h: CreateElement, renderOpts: ColumnContentRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): SlotVNodeType | SlotVNodeType[];
  renderTableExpand?(h: CreateElement, renderOpts: ColumnContentRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): SlotVNodeType | SlotVNodeType[];

  // 工具栏-按钮渲染
  toolbarButtonClassName?: string | ((params: ToolbarButtonRenderParams) => string | VNodeClassName)
  renderToolbarButton?(h: CreateElement, renderOpts: ToolbarButtonRenderOptions, params: ToolbarButtonRenderParams): SlotVNodeType | SlotVNodeType[];
  toolbarToolClassName?: string | ((params: ToolbarToolRenderParams) => string | VNodeClassName)
  renderToolbarTool?(h: CreateElement, renderOpts: ToolbarToolRenderOptions, params: ToolbarToolRenderParams): SlotVNodeType | SlotVNodeType[];

  /**
   * 已废弃，请使用 formItemClassName
   * @deprecated
   */
  itemClassName?: string | ((params: FormItemRenderParams) => string | VNodeClassName)
  formItemClassName?: string | ((params: FormItemRenderParams) => string | VNodeClassName)

  /**
   * 已废弃，请使用 formItemStyle
   * @deprecated
   */
  itemStyle?: VNodeStyle | ((params: FormItemRenderParams) => VNodeStyle)
  formItemStyle?: VNodeStyle | ((params: FormItemRenderParams) => VNodeStyle)

  /**
   * 已废弃，请使用 formItemContentClassName
   * @deprecated
   */
  itemContentClassName?: string | ((params: FormItemRenderParams) => string | VNodeClassName)
  formItemContentClassName?: string | ((params: FormItemRenderParams) => string | VNodeClassName)

  /**
   * 已废弃，请使用 formItemContentStyle
   * @deprecated
   */
  itemContentStyle?: VNodeStyle | ((params: FormItemRenderParams) => VNodeStyle)
  formItemContentStyle?: VNodeStyle | ((params: FormItemRenderParams) => VNodeStyle)

  /**
   * 已废弃，请使用 formItemTitleClassName
   * @deprecated
   */
  itemTitleClassName?: string | ((params: FormItemRenderParams) => string | VNodeClassName)
  formItemTitleClassName?: string | ((params: FormItemRenderParams) => string | VNodeClassName)

  /**
   * 已废弃，请使用 formItemTitleStyle
   * @deprecated
   */
  itemTitleStyle?: VNodeStyle | ((params: FormItemRenderParams) => VNodeStyle)
  formItemTitleStyle?: VNodeStyle | ((params: FormItemRenderParams) => VNodeStyle)

  /**
   * 已废弃，请使用 renderFormItemTitle
   * @deprecated
   */
  renderItemTitle?(h: CreateElement, renderOpts: FormItemRenderOptions, params: FormItemRenderParams): SlotVNodeType | SlotVNodeType[];
  renderFormItemTitle?(h: CreateElement, renderOpts: FormItemRenderOptions, params: FormItemRenderParams): SlotVNodeType | SlotVNodeType[];

  /**
   * 已废弃，请使用 renderFormItemContent
   * @deprecated
   */
  renderItemContent?(h: CreateElement, renderOpts: FormItemRenderOptions, params: FormItemRenderParams): SlotVNodeType | SlotVNodeType[];
  renderFormItemContent?(h: CreateElement, renderOpts: FormItemRenderOptions, params: FormItemRenderParams): SlotVNodeType | SlotVNodeType[];

  /**
   * 已废弃，请使用 formItemVisibleMethod
   * @deprecated
   */
  itemVisibleMethod?(params: FormItemVisibleParams): boolean;
  formItemVisibleMethod?(params: FormItemVisibleParams): boolean;

  /**
   * 已废弃，请使用 formItemResetMethod
   * @deprecated
   */
  itemResetMethod?(params: FormItemResetParams): void;
  formItemResetMethod?(params: FormItemResetParams): void;

  /**
   * 已废弃，请使用 renderTableEmptyView
   * @deprecated
   */
  renderEmpty?(h: CreateElement, renderOpts: TableEmptyRender, params: EmptyRenderParams): SlotVNodeType | SlotVNodeType[];
  renderTableEmptyView?(h: CreateElement, renderOpts: TableEmptyRender, params: EmptyRenderParams): SlotVNodeType | SlotVNodeType[];

  [key: string]: any;
}

/**
 * 渲染选项
 */
export class RenderOptions {
  /**
   * 渲染器名称
   */
  name?: string;
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
  events?: { [key: string]: ((...angs: any[])=>any) };
  /**
   * 目标组件渲染的原生事件
   */
  nativeEvents?: { [key: string]: ((...angs: any[])=>any) };
  [key: string]: any;
}

/**
 * 渲染参数
 */
export class RenderParams {}

/**
 * 选项参数
 */
export interface OptionProps extends RenderParams {
  value?: string;
  label?: string;
  [key: string]: any;
}

/**
 * 分组选项参数
 */
export interface OptionGroupProps extends RenderParams {
  options?: string;
  label?: string;
  [key: string]: any;
}

/**
 * 单元格渲染参数
 */
export interface ColumnCellRenderParams extends TableRenderParams {
  /**
   * 列对象
   */
  column: ColumnInfo;
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
  row: RowInfo;
  /**
   * 相对于 data 中的索引
   */
  rowIndex: number;
  /**
   * 相对于当前表格数据的索引
   */
  $rowIndex: number;
  isHidden: boolean;
  fixed: string;
  type: string;
}

/**
 * 空内容渲染配置项
 */
export class TableEmptyRender extends RenderOptions { }

export class TableRenderParams extends RenderParams {
  /**
   * 表格实例对象
   */
  $table: Table;
}

export class GridRenderParams extends TableRenderParams {
  /**
   * 配置式表格实例对象
   */
  $grid: Grid;
}

export class EmptyRenderParams extends TableRenderParams { }

export type ColumnDefaultSlotParams = ColumnCellRenderParams
export type ColumnContentSlotParams = ColumnContentRenderParams
export type ColumnIconSlotParams = ColumnIconRenderParams

export type ColumnContentRenderParams = ColumnCellRenderParams
export type ColumnIconRenderParams = ColumnCellRenderParams
