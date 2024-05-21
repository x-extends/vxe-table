import { SlotVNodeType, VNodeStyle, VNodeClassName } from '../component'
import { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods, VxeTablePropTypes, VxeTableDataRow } from '../table'
import { VxeGridConstructor } from '../grid'
import { VxeColumnPropTypes } from '../column'
import { VxeFilterPanel } from '../module/filter'
import { VxeToolbarPropTypes } from '../toolbar'
import { FormItemRenderOptions, FormItemTitleRenderParams, FormItemContentRenderParams, FormItemVisibleParams, FormItemResetParams } from '../form-item'

/* eslint-disable no-use-before-define */

type RendererOptions = DefineRendererOption<VxeGlobalRendererHandles.RenderResult>

export interface DefineRendererOption<T> {
  /**
   * @deprecated 已废弃
   */
  className?: string

  // 筛选渲染
  filterClassName?: string | ((params: VxeGlobalRendererHandles.RenderFilterParams<any>) => string | VNodeClassName)
  showFilterFooter?: boolean
  renderFilter?(renderOpts: VxeGlobalRendererHandles.RenderFilterOptions, params: VxeGlobalRendererHandles.RenderFilterParams<any>): T
  filterMethod?(params: VxeGlobalRendererHandles.FilterMethodParams<any>): boolean
  filterRemoteMethod?(params: VxeGlobalRendererHandles.FilterRemoteMethod<any>): boolean
  filterResetMethod?(params: VxeGlobalRendererHandles.FilterResetMethodParams<any>): void
  filterRecoverMethod?(params: VxeGlobalRendererHandles.FilterRecoverMethodParams<any>): void
  // 默认行为
  defaultFilterMethod?(params: VxeGlobalRendererHandles.FilterMethodParams<any>): boolean

  // 单元格渲染
  cellClassName?: string | ((params: VxeGlobalRendererHandles.RenderDefaultParams<any>) => string | VNodeClassName)
  cellStyle?: VNodeStyle | ((params: VxeGlobalRendererHandles.RenderDefaultParams<any>) => VNodeStyle)
  renderHeader?(renderOpts: VxeGlobalRendererHandles.RenderHeaderOptions, params: VxeGlobalRendererHandles.RenderHeaderParams<any>): T
  renderDefault?(renderOpts: VxeGlobalRendererHandles.RenderDefaultOptions, params: VxeGlobalRendererHandles.RenderDefaultParams<any>): T
  renderFooter?(renderOpts: VxeGlobalRendererHandles.RenderFooterOptions, params: VxeGlobalRendererHandles.RenderFooterParams<any>): T
  exportMethod?(params: VxeGlobalRendererHandles.ExportMethodParams<any>): string
  footerExportMethod?(params: VxeGlobalRendererHandles.FooterExportMethodParams<any>): string

  // 编辑渲染
  autofocus?: string | ((params: VxeGlobalRendererHandles.RenderEditParams<any> | VxeGlobalRendererHandles.RenderCellParams<any>) => HTMLElement | null)
  autoselect?: boolean
  renderEdit?(renderOpts: VxeGlobalRendererHandles.RenderEditOptions<any>, params: VxeGlobalRendererHandles.RenderEditParams<any>): T
  renderCell?(renderOpts: VxeGlobalRendererHandles.RenderCellOptions<any>, params: VxeGlobalRendererHandles.RenderCellParams<any>): T

  // 内容渲染
  renderExpand?(renderOpts: VxeGlobalRendererHandles.RenderExpandOptions, params: VxeGlobalRendererHandles.RenderExpandParams<any>): T

  // 工具栏-按钮渲染
  toolbarButtonClassName?: string | ((params: VxeGlobalRendererHandles.RenderButtonParams<any>) => string | VNodeClassName)
  renderToolbarButton?(renderOpts: VxeGlobalRendererHandles.RenderButtonOptions, params: VxeGlobalRendererHandles.RenderButtonParams<any>): T
  toolbarToolClassName?: string | ((params: VxeGlobalRendererHandles.RenderToolParams<any>) => string | VNodeClassName)
  renderToolbarTool?(renderOpts: VxeGlobalRendererHandles.RenderToolOptions, params: VxeGlobalRendererHandles.RenderToolParams<any>): T

  // 表单-项渲染
  itemClassName?: string | ((params: VxeGlobalRendererHandles.RenderItemTitleParams) => string | VNodeClassName)
  itemStyle?: VNodeStyle | ((params: VxeGlobalRendererHandles.RenderItemTitleParams) => VNodeStyle)
  itemContentClassName?: string | ((params: VxeGlobalRendererHandles.RenderItemTitleParams) => string | VNodeClassName)
  itemContentStyle?: VNodeStyle | ((params: VxeGlobalRendererHandles.RenderItemTitleParams) => VNodeStyle)
  itemTitleClassName?: string | ((params: VxeGlobalRendererHandles.RenderItemTitleParams) => string | VNodeClassName)
  itemTitleStyle?: VNodeStyle | ((params: VxeGlobalRendererHandles.RenderItemTitleParams) => VNodeStyle)
  renderItemTitle?(renderOpts: VxeGlobalRendererHandles.RenderItemTitleOptions, params: VxeGlobalRendererHandles.RenderItemTitleParams): T
  renderItemContent?(renderOpts: VxeGlobalRendererHandles.RenderItemContentOptions, params: VxeGlobalRendererHandles.RenderItemContentParams): T
  itemVisibleMethod?(params: VxeGlobalRendererHandles.ItemVisibleMethodParams): boolean
  itemResetMethod?(params: VxeGlobalRendererHandles.ItemResetMethodParams): void

  // 空内容渲染
  renderTableEmptyView?(renderOpts: VxeGlobalRendererHandles.RenderTableEmptyViewOptions, params: VxeGlobalRendererHandles.RenderEmptyParams): T

  /**
   * 已废弃，请使用 renderTableEmptyView
   * @deprecated
   */
  renderEmpty?(renderOpts: VxeGlobalRendererHandles.RenderTableEmptyViewOptions, params: VxeGlobalRendererHandles.RenderEmptyParams): T
}

export namespace VxeGlobalRendererHandles {
  export type RenderResult = SlotVNodeType | SlotVNodeType[]

  export interface RenderFilterOptions extends VxeColumnPropTypes.FilterRender {}

  export interface RenderParams {}

  export type RenderFilterParams<D = VxeTableDataRow> = {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $panel: VxeFilterPanel
    column: {
      filters: VxeTableDefines.FilterOption[]
    } & VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    $rowIndex: number
  }

  export type FilterMethodParams<D = VxeTableDataRow> = {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    value: any
    option: VxeTableDefines.FilterOption
    cellValue: any
    row: any
    column: VxeTableDefines.ColumnInfo<D>
  }

  export interface FilterRemoteMethod<D = VxeTableDataRow> extends VxeTableDefines.FilterChangeParams<D> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
  }

  export interface FilterResetMethodParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    options: VxeTableDefines.FilterOption[]
    column: VxeTableDefines.ColumnInfo<D>
  }

  export interface FilterRecoverMethodParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    option: VxeTableDefines.FilterOption
    column: VxeTableDefines.ColumnInfo<D>
  }

  export interface RenderHeaderOptions extends VxeGlobalRendererHandles.RenderOptions { }

  export interface RenderHeaderParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    $rowIndex: number
  }

  export type RenderDefaultOptions<D = VxeTableDataRow> = VxeColumnPropTypes.EditRender<D>
  export type RenderDefaultParams<D = VxeTableDataRow> = RenderEditParams<D>

  export interface RenderFooterOptions extends VxeGlobalRendererHandles.RenderOptions { }

  export interface RenderFooterParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    _columnIndex: number
    $columnIndex: number
    $rowIndex: number
    items: any[]
    data: D[][]
  }

  export interface ExportMethodParams<D = VxeTableDataRow> {
    row: D
    column: VxeTableDefines.ColumnInfo<D>
    options: VxeTablePropTypes.ExportHandleOptions
  }

  export interface FooterExportMethodParams<D = VxeTableDataRow> {
    items: any[]
    _columnIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    options: VxeTablePropTypes.ExportHandleOptions
  }

  export type RenderEditOptions<D = VxeTableDataRow> = VxeColumnPropTypes.EditRender<D>

  export interface RenderEditParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $grid: VxeGridConstructor<D> | null
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    rowid: string
    row: D
    rowIndex: number
    $rowIndex: number
    isHidden: boolean
    fixed: VxeColumnPropTypes.Fixed
    type: string
  }

  export type RenderCellOptions<D = VxeTableDataRow> = VxeColumnPropTypes.EditRender<D>
  export type RenderCellParams<D = VxeTableDataRow> = {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $grid: VxeGridConstructor<D> | null
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    rowid: string
    row: D
    rowIndex: number
    $rowIndex: number
    isHidden: boolean
    fixed: VxeColumnPropTypes.Fixed
    type: string
  }

  export interface RenderExpandOptions extends VxeColumnPropTypes.ContentRender { }
  export type RenderExpandParams<D = VxeTableDataRow> = RenderEditParams<D>

  export interface RenderButtonOptions extends VxeGlobalRendererHandles.RenderOptions { }
  export interface RenderButtonParams<D = VxeTableDataRow> {
    $grid: VxeGridConstructor | null
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    button: VxeToolbarPropTypes.ButtonConfig
  }

  export interface RenderToolOptions extends VxeGlobalRendererHandles.RenderOptions { }
  export interface RenderToolParams<D = VxeTableDataRow> {
    $grid: VxeGridConstructor | null
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    tool: VxeToolbarPropTypes.ToolConfig
  }

  export type RenderItemTitleOptions = FormItemRenderOptions
  export type RenderItemTitleParams = FormItemTitleRenderParams
  export type RenderItemContentOptions = FormItemRenderOptions
  export type RenderItemContentParams = FormItemContentRenderParams
  export type ItemVisibleMethodParams = FormItemVisibleParams
  export type ItemResetMethodParams = FormItemResetParams

  export type RenderTableEmptyViewOptions = VxeTablePropTypes.EmptyRender

  export interface RenderEmptyParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
  }

  /**
   * 渲染选项
   */
  export interface RenderOptions {
    /**
     * 渲染器名称
     */
    name?: string
    /**
     * 目标组件渲染的参数
     */
    props?: { [key: string]: any }
    /**
     * 目标组件渲染的属性
     */
    attrs?: { [key: string]: any }
    /**
     * 目标组件渲染的事件
     */
    events?: { [key: string]: (...args: any[]) => any }
    /**
     * 多目标渲染
     */
    children?: any[]
    /**
     * 渲染类型
     */
    cellType?: 'string' | 'number'
  }

  /**
   * 选项参数
   */
  export interface RenderOptionProps {
    value?: string
    label?: string
    disabled?: string
    key?: string
  }

  /**
   * 分组选项参数
   */
  export interface RenderOptionGroupProps {
    options?: string
    label?: string
    key?: string
  }
}

/**
 * 渲染器
 */
export interface VxeGlobalRenderer {
  mixin(options: {
    [name: string]: RendererOptions
  }): VxeGlobalRenderer
  get(name: string | null | undefined): DefineRendererOption<VxeGlobalRendererHandles.RenderResult>
  add(name: string, options: RendererOptions): VxeGlobalRenderer
  delete(name: string): void
}
