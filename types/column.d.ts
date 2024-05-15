import { VXEComponent, SlotVNodeType } from './component'
import { VxeTableConstructor, VxeTableDataRow, VxeTableDefines, VxeTablePropTypes } from './table'
import { VxeGlobalRendererHandles } from './v-x-e-table'
import { VxeFilterPanel } from './module/filter'
import { VxeTooltipPropTypes } from './tooltip'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 表格列
 * @example import { VxeColumn } from 'vxe-table'
 */
export const VxeColumn: VXEComponent<VxeColumnProps<any>, VxeColumnEventProps, VxeColumnSlots<any>>
/**
 * 组件 - 表格列
 */
export const Column: typeof VxeColumn

export namespace VxeColumnPropTypes {
  export type ColId = string | number
  export type Type = 'seq' | 'radio' | 'checkbox' | 'expand' | 'html' | null
  export type Field = string
  export type Title = string
  export type Width = number | string
  export type MinWidth = number | string
  export type MaxWidth = number | string
  export type Resizable = boolean
  export type Fixed = 'left' | 'right' | '' | null
  export type Align = 'left' | 'center' | 'right' | '' | null
  export type HeaderAlign = Align
  export type FooterAlign = Align
  export type ShowOverflow = VxeTablePropTypes.ShowOverflow
  export type ShowHeaderOverflow = ShowOverflow
  export type ShowFooterOverflow = ShowOverflow
  export type ClassName<D = VxeTableDataRow> = string | ((params: VxeGlobalRendererHandles.RenderCellParams<D>) => string | any[] | { [key: string]: boolean })
  export type HeaderClassName<D = VxeTableDataRow> = string | ((params: VxeGlobalRendererHandles.RenderHeaderParams<D>) => string | any[] | { [key: string]: boolean })
  export type FooterClassName<D = VxeTableDataRow> = string | ((params: VxeGlobalRendererHandles.RenderFooterParams<D>) => string | any[] | { [key: string]: boolean })

  export type Formatter<D = VxeTableDataRow> = ((params: {
    cellValue: any
    column: VxeTableDefines.ColumnInfo<D>
    row: D
  }) => string | number) | any[] | string

  export type Sortable = boolean
  export type SortBy<D = VxeTableDataRow> = string | ((params: {
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  }) => string | number)
  export type SortType = 'auto' | 'string' | 'number' | null

  export interface Filter {
    label?: string | number
    value?: any
    data?: any
    resetValue?: any
    checked?: boolean
  }
  export type Filters = Filter[]

  export type FilterMultiple = boolean

  interface FilterMethodParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D>,
    value: any
    option: VxeTableDefines.FilterOption
    cellValue: any
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type FilterMethod<D = VxeTableDataRow> = (params: FilterMethodParams<D>) => boolean

  interface FilterResetMethodParams<D = VxeTableDataRow> {
    options: VxeTableDefines.FilterOption[]
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type FilterResetMethod = (params: FilterResetMethodParams) => void

  interface FilterRecoverMethodParams<D = VxeTableDataRow> {
    option: VxeTableDefines.FilterOption
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type FilterRecoverMethod<D = VxeTableDataRow> = (params: FilterRecoverMethodParams<D>) => void

  /**
   * 筛选渲染配置项
   */
  export interface FilterRender extends VxeGlobalRendererHandles.RenderOptions {
    options?: any[]
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps
    optionGroups?: any[]
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps
    content?: string
  }

  export type TreeNode = boolean
  export type Visible = boolean

  interface ExportMethodParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D>,
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type ExportMethod<D = VxeTableDataRow> = (params: ExportMethodParams<D>) => string | number

  interface HeaderExportParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D>,
    options: VxeTablePropTypes.ExportConfig
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type HeaderExportMethod<D = VxeTableDataRow> = (params: HeaderExportParams<D>) => string | number

  interface FooterExportParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D>,
    items: any[]
    row: any
    column: VxeTableDefines.ColumnInfo<D>
    _columnIndex: number
  }
  export type FooterExportMethod<D = VxeTableDataRow> = (params: FooterExportParams<D>) => string | number

  export interface TitlePrefix {
    useHTML?: VxeTooltipPropTypes.UseHTML
    content?: VxeTooltipPropTypes.Content
    enterable?: VxeTooltipPropTypes.Enterable
    theme?: VxeTooltipPropTypes.Theme
    icon?: string
    /**
     * @deprecated 已废弃，请使用 content
     */
    message?: string
  }

  export interface TitleHelp extends TitlePrefix { }

  export interface TitleSuffix {
    useHTML?: VxeTooltipPropTypes.UseHTML
    content?: VxeTooltipPropTypes.Content
    enterable?: VxeTooltipPropTypes.Enterable
    theme?: VxeTooltipPropTypes.Theme
    icon?: string
  }

  export type CellType = 'auto' | 'number' | 'string'

  export interface CellRender<D = VxeTableDataRow> extends VxeGlobalRendererHandles.RenderOptions {
    events?: { [key: string]: (cellParams: VxeColumnSlotTypes.DefaultSlotParams<D>, ...args: any[]) => any }
    options?: any[]
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps
    optionGroups?: any[]
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps
    content?: string
  }

  /**
   * 编辑渲染配置项
   */
  export interface EditRender<D = VxeTableDataRow> extends VxeGlobalRendererHandles.RenderOptions {
    events?: { [key: string]: (cellParams: VxeColumnSlotTypes.EditSlotParams, ...args: any[]) => any }
    enabled?: boolean
    options?: any[]
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps
    optionGroups?: any[]
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps
    autofocus?: string
    autoselect?: boolean
    defaultValue?: ((params: { column: VxeTableDefines.ColumnInfo<D> }) => any) | null | undefined | string | number | RegExp | object | any[] | Date
    immediate?: boolean
    content?: string
    placeholder?: string
  }

  /**
   * 内容渲染配置项
   */
  export interface ContentRender extends VxeGlobalRendererHandles.RenderOptions {
    options?: any[]
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps
    optionGroups?: any[]
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps
  }

  export type Params = any

  export type Slots<D = VxeTableDataRow> = {
    /**
     * 只对 type=checkbox,radio 有效，自定义标题模板
     */
    title?: string | ((params: VxeColumnSlotTypes.HeaderSlotParams<D>) => SlotVNodeType[] | SlotVNodeType) | null
    /**
     * 只对 type=radio 有效，自定义单选框模板
     */
    radio?: string | ((params: VxeColumnSlotTypes.RadioSlotParams<D>) => SlotVNodeType[] | SlotVNodeType) | null
    /**
     * 只对 type=checkbox 有效，自定义复选框模板
     */
    checkbox?: string | ((params: VxeColumnSlotTypes.CheckboxSlotParams<D>) => SlotVNodeType[] | SlotVNodeType) | null
    /**
     * 自定义显示内容模板
     */
    default?: string | ((params: VxeColumnSlotTypes.DefaultSlotParams<D>) => SlotVNodeType[] | SlotVNodeType) | null
    /**
     * 自定义表头内容的模板
     */
    header?: string | ((params: VxeColumnSlotTypes.HeaderSlotParams<D>) => SlotVNodeType[] | SlotVNodeType) | null
    /**
     * 自定义表尾内容的模板
     */
    footer?: string | ((params: VxeColumnSlotTypes.FooterSlotParams<D>) => SlotVNodeType[] | SlotVNodeType) | null
    /**
     * 只对 type=expand 有效，自定义展开后的内容模板
     */
    content?: string | ((params: VxeColumnSlotTypes.ContentSlotParams<D>) => SlotVNodeType[] | SlotVNodeType) | null
    /**
     * 只对 filter-render 启用时有效，自定义筛选模板
     */
    filter?: string | ((params: VxeColumnSlotTypes.FilterSlotParams<D>) => SlotVNodeType[] | SlotVNodeType) | null
    /**
     * 只对 edit-render 启用时有效，自定义可编辑组件模板
     */
    edit?: string | ((params: VxeColumnSlotTypes.EditSlotParams<D>) => SlotVNodeType[] | SlotVNodeType) | null
    /**
     * 只对 edit-render 启用时有效，自定义可编辑组件模板
     */
    valid?: string | ((params: VxeColumnSlotTypes.ValidSlotParams<D>) => SlotVNodeType[] | SlotVNodeType) | null

    /**
     * 已废弃
     * @deprecated
     */
    icon?: string | ((params: VxeColumnSlotTypes.IconSlotParams<D>) => SlotVNodeType[] | SlotVNodeType) | null
  }
}

export type VxeColumnProps<D = VxeTableDataRow> = {
  colId?: VxeColumnPropTypes.ColId
  /**
   * 渲染类型
   */
  type?: VxeColumnPropTypes.Type
  /**
   * 列字段名
   */
  field?: VxeColumnPropTypes.Field
  /**
   * 列标题
   */
  title?: VxeColumnPropTypes.Title
  /**
   * 列宽度
   */
  width?: VxeColumnPropTypes.Width
  /**
   * 列最小宽度，把剩余宽度按比例分配
   */
  minWidth?: VxeColumnPropTypes.MinWidth
  /**
   * 列最大宽度
   */
  maxWidth?: VxeColumnPropTypes.MaxWidth
  /**
   * 是否允许拖动列宽调整大小
   */
  resizable?: VxeColumnPropTypes.Resizable
  /**
   * 将列固定在左侧或者右侧
   */
  fixed?: VxeColumnPropTypes.Fixed
  /**
   * 列对其方式
   */
  align?: VxeColumnPropTypes.Align
  /**
   * 表头对齐方式
   */
  headerAlign?: VxeColumnPropTypes.HeaderAlign
  /**
   * 表尾列的对齐方式
   */
  footerAlign?: VxeColumnPropTypes.FooterAlign
  /**
   * 当内容过长时显示为省略号
   */
  showOverflow?: VxeColumnPropTypes.ShowOverflow
  /**
   * 当表头内容过长时显示为省略号
   */
  showHeaderOverflow?: VxeColumnPropTypes.ShowHeaderOverflow
  /**
   * 当表尾内容过长时显示为省略号
   */
  showFooterOverflow?: VxeColumnPropTypes.ShowFooterOverflow
  /**
   * 给单元格附加 className
   */
  className?: VxeColumnPropTypes.ClassName<D>
  /**
   * 给表头单元格附加 className
   */
  headerClassName?: VxeColumnPropTypes.HeaderClassName<D>
  /**
   * 给表尾单元格附加 className
   */
  footerClassName?: VxeColumnPropTypes.FooterClassName<D>
  /**
   * 格式化显示内容
   */
  formatter?: VxeColumnPropTypes.Formatter<D>
  /**
   * 是否允许排序
   */
  sortable?: VxeColumnPropTypes.Sortable
  /**
   * 自定义排序的属性
   */
  sortBy?: VxeColumnPropTypes.SortBy<D>
  /**
   * 排序的字段类型，比如字符串转数值等
   */
  sortType?: VxeColumnPropTypes.SortType
  /**
   * 配置筛选条件数组
   */
  filters?: VxeColumnPropTypes.Filter[]
  /**
   * 筛选是否允许多选
   */
  filterMultiple?: VxeColumnPropTypes.FilterMultiple
  /**
   * 自定义筛选方法
   */
  filterMethod?: VxeColumnPropTypes.FilterMethod<D>
  /**
   * 筛选模板配置项
   */
  filterRender?: VxeColumnPropTypes.FilterRender
  /**
   * 指定为树节点
   */
  treeNode?: VxeColumnPropTypes.TreeNode
  /**
   * 是否可视
   */
  visible?: VxeColumnPropTypes.Visible
  /**
   * 自定义表尾单元格数据导出方法
   */
  headerExportMethod?: VxeColumnPropTypes.HeaderExportMethod<D>
  /**
   * 自定义单元格数据导出方法
   */
  exportMethod?: VxeColumnPropTypes.ExportMethod<D>
  /**
   * 自定义表尾单元格数据导出方法
   */
  footerExportMethod?: VxeColumnPropTypes.FooterExportMethod<D>
  /**
   * 已废弃，被 titlePrefix 替换
   * @deprecated
   */
  titleHelp?: VxeColumnPropTypes.TitleHelp
  /**
   * 标题前缀图标配置项
   */
  titlePrefix?: VxeColumnPropTypes.TitlePrefix
  /**
   * 标题后缀图标配置项
   */
  titleSuffix?: VxeColumnPropTypes.TitleSuffix
  /**
   * 单元格值类型
   */
  cellType?: VxeColumnPropTypes.CellType
  /**
   * 单元格渲染配置项
   */
  cellRender?: VxeColumnPropTypes.CellRender<D>
  /**
   * 单元格编辑渲染配置项
   */
  editRender?: VxeColumnPropTypes.EditRender<D>
  /**
   * 内容渲染配置项
   */
  contentRender?: VxeColumnPropTypes.ContentRender
  /**
   * 额外的参数
   */
  params?: VxeColumnPropTypes.Params
}

export type VxeColumnEventProps = {
  //
}

export namespace VxeColumnSlotTypes {
  export interface FilterSlotParams<D = VxeTableDataRow> {
    $panel: VxeFilterPanel
    column: {
      filters: VxeTableDefines.FilterOption[]
    } & VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    $rowIndex: number
  }

  export interface EditSlotParams<D = VxeTableDataRow> {
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    row: D
    rowIndex: number
    $rowIndex: number
  }

  export interface FooterSlotParams<D = VxeTableDataRow> {
    row: D
    rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    _columnIndex: number
    $columnIndex: number
    $rowIndex: number
    items: any[]
    data: D[][]
  }

  export interface HeaderSlotParams<D = VxeTableDataRow> extends VxeTableDefines.CellRenderHeaderParams<D> { }

  export interface ContentSlotParams<D = VxeTableDataRow> {
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    row: D
    rowIndex: number
    $rowIndex: number
    isHidden: boolean
    fixed: VxeColumnPropTypes.Fixed
    type: string
  }

  export interface DefaultSlotParams<D = VxeTableDataRow> extends VxeTableDefines.CellRenderBodyParams<D> { }

  export interface CheckboxSlotParams<D = VxeTableDataRow> extends DefaultSlotParams<D> {
    checked: boolean
    indeterminate: boolean
  }
  export interface RadioSlotParams<D = VxeTableDataRow> extends DefaultSlotParams<D> {
    checked: boolean
  }
  export interface IconSlotParams<D = VxeTableDataRow> extends DefaultSlotParams<D> { }

  export interface ValidSlotParams<D = VxeTableDataRow> extends DefaultSlotParams<D> {
    rule: VxeTableDefines.ValidatorRule<D>
    content: string
  }
}

export interface VxeColumnSlots<D = VxeTableDataRow> {
  /**
   * 自定义显示内容模板
   */
  default: (params: VxeColumnSlotTypes.DefaultSlotParams<D>) => any
  /**
   * 自定义表头内容的模板
   */
  header: (params: VxeColumnSlotTypes.HeaderSlotParams<D>) => any
  /**
   * 自定义表尾内容的模板
   */
  footer: (params: VxeColumnSlotTypes.FooterSlotParams<D>) => any
  /**
   * 只对 type=checkbox,radio 有效，自定义标题模板
   */
  title: (params: VxeColumnSlotTypes.HeaderSlotParams<D>) => any
  /**
   * 只对 type=checkbox 有效，自定义复选框模板
   */
  checkbox: (params: VxeColumnSlotTypes.CheckboxSlotParams<D>) => any
  /**
   * 只对 type=radio 有效，自定义单选框模板
   */
  radio: (params: VxeColumnSlotTypes.RadioSlotParams<D>) => any
  /**
   * 只对 type=expand 有效，自定义展开后的内容模板
   */
  content: (params: VxeColumnSlotTypes.ContentSlotParams<D>) => any
  /**
   * 只对 filter-render 启用时有效，自定义筛选模板
   */
  filter: (params: VxeColumnSlotTypes.FilterSlotParams<D>) => any
  /**
   * 只对 edit-render 启用时有效，自定义可编辑组件模板
   */
  edit: (params: VxeColumnSlotTypes.EditSlotParams<D>) => any
   /**
   * 只对 edit-render 启用时有效，自定义展示错误校验模板
   */
  valid: (params: VxeColumnSlotTypes.ValidSlotParams<D>) => any

  /**
   * 已废弃
   * @deprecated
   */
  icon: (params: VxeColumnSlotTypes.IconSlotParams<D>) => any
}
