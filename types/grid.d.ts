import { RenderFunction, SetupContext, Ref, ComputedRef, ComponentPublicInstance, ComponentInternalInstance } from 'vue'
import { VxeFormInstance, VxeFormProps, VxeFormDefines } from './form'
import { VxeFormItemProps } from './form-item'
import { VxeToolbarInstance, VxeToolbarProps, VxeToolbarPropTypes } from './toolbar'
import { VxePagerInstance, VxePagerProps, VxePagerDefines } from './pager'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf, SlotVNodeType } from './component'
import { VxeTableDataRow, VxeTableDefines, VxeTableEmits, VxeTableConstructor, VxeTableProps, TablePublicMethods, VxeTableMethods, VxeTablePrivateMethods } from './table'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 配置式表格
 * @example import { VxeGrid } from 'vxe-table'
 */
export const VxeGrid: VXEComponent<VxeGridProps<any>, VxeGridEventProps<any>, VxeGridSlots<any>>
/**
 * 组件 - 配置式表格
 */
export const Grid: typeof VxeGrid

export type VxeGridInstance<D = any> = ComponentPublicInstance<VxeGridProps<D>, VxeGridConstructor<D>>

export interface VxeGridConstructor<D = any> extends VxeComponentBase, VxeGridMethods<D> {
  props: Readonly<VxeGridProps<D>>
  context: SetupContext<VxeGridEmits>
  instance: ComponentInternalInstance
  reactData: GridReactData<D>
  getRefMaps(): GridPrivateRef<D>
  getComputeMaps(): GridPrivateComputed
  renderVN: RenderFunction
}

export interface GridPrivateRef<D = VxeTableDataRow> {
  refElem: Ref<HTMLDivElement>
  refTable: Ref<ComponentPublicInstance<VxeTableProps<D>, VxeTableConstructor<D> & VxeTableMethods<D> & VxeTablePrivateMethods<D>>>
  refForm: Ref<VxeFormInstance>
  refToolbar: Ref<VxeToolbarInstance>
  refPager: Ref<VxePagerInstance>
}
export interface VxeGridPrivateRef<D = VxeTableDataRow> extends GridPrivateRef<D> { }

export interface GridPrivateComputed {
  computeProxyOpts: ComputedRef<VxeGridPropTypes.ProxyOpts>
  computePagerOpts: ComputedRef<VxeGridPropTypes.PagerOpts>
  computeFormOpts: ComputedRef<VxeGridPropTypes.FormOpts>
  computeToolbarOpts: ComputedRef<VxeGridPropTypes.ToolbarOpts>
  computeZoomOpts: ComputedRef<VxeGridPropTypes.ZoomOpts>
}

export interface VxeGridPrivateComputed extends GridPrivateComputed { }

export interface GridReactData<D = VxeTableDataRow> {
  tableLoading: boolean
  proxyInited: boolean
  isZMax: boolean
  tableData: D[]
  filterData: VxeTableDefines.FilterCheckedParams<D>[]
  formData: any
  sortData: VxeTableDefines.SortCheckedParams<D>[]
  tZindex: number
  tablePage: {
    total: number
    pageSize: number
    currentPage: number
  }
}

export type VxeGridEmits = [
  ...VxeTableEmits,

  'page-change',
  'form-submit',
  'form-submit-invalid',
  'form-reset',
  'form-collapse',
  'form-toggle-collapse',
  'proxy-query',
  'proxy-delete',
  'proxy-save',
  'toolbar-button-click',
  'toolbar-tool-click',
  'zoom'
]

export interface GridMethods<D = VxeTableDataRow> extends GridPublicMethods<D> {
  dispatchEvent(type: ValueOf<VxeGridEmits>, params: any, evnt?: Event): void
}

export interface GridPublicMethods<D = VxeTableDataRow> {
  /**
   * 给数据代理提交指令
   * @param code 指令编码
   */
  commitProxy(code: string | VxeToolbarPropTypes.ButtonConfig, ...args: any[]): Promise<any>
  /**
   * 获取表单项列表
   */
  getFormItems(): VxeFormItemProps[]
  getFormItems(itemIndex?: number): VxeFormItemProps
  /**
   * 切换表格最大化/还原
   */
  zoom(): Promise<boolean>
  /**
   * 判断是否最大化显示
   */
  isMaximized(): boolean
  /**
   * 如果表格处于常规状态，则最大化表格
   */
  maximize(): Promise<any>
  /**
   * 如果表格处于最大化状态，则还原表格
   */
  revert(): Promise<any>
  /**
   * 获取数据代理信息
   */
  getProxyInfo(): {
    data: D[]
    filter: any
    form: any
    sort: VxeTableDefines.SortCheckedParams<D> | { [key: string]: any }
    sorts: VxeTableDefines.SortCheckedParams<D>[]
    pager: {
      total: number
      pageSize: number
      currentPage: number
    }
    pendingRecords: D[]
  } | null
  /**
   * 设置数据代理信息
   */
  // setProxyInfo(options: {
  //   /**
  //    * 修改表格数据
  //    */
  //   data?: any[]
  //   /**
  //    * 修改表单数据
  //    */
  //   form?: {
  //     [key: string]: any
  //   },
  //   /**
  //    * 修改分页数据
  //    */
  //   pager?: {
  //     pageSize?: number
  //     currentPage?: number
  //   }
  // }): Promise<any>
}

export interface VxeGridMethods<D = VxeTableDataRow> extends GridMethods<D>, TablePublicMethods<D> { }

export interface GridPrivateMethods<D = VxeTableDataRow> {
  callSlot<T = any>(slotFunc: ((params: T) => SlotVNodeType | SlotVNodeType[]) | string | null, params: T): SlotVNodeType[]
  extendTableMethods<T>(methodKeys: T[]): any
  triggerToolbarCommitEvent(params: VxeToolbarPropTypes.ButtonConfig | VxeToolbarPropTypes.ToolConfig, evnt: Event): Promise<any>
  triggerToolbarBtnEvent(button: VxeToolbarPropTypes.ButtonConfig, evnt: Event): void
  triggerToolbarTolEvent(button: VxeToolbarPropTypes.ToolConfig, evnt: Event): void
  triggerZoomEvent(evnt: Event): void
  getParentHeight(): number
  getExcludeHeight(): number
}

export interface VxeGridPrivateMethods<D = VxeTableDataRow> extends GridPrivateMethods<D> { }

export namespace VxeGridPropTypes {
  export type Size = SizeType

  export type Layouts = ('Form' | 'Toolbar' | 'Top' | 'Table' | 'Bottom' | 'Pager')[]

  export type Columns<D = VxeTableDataRow> = VxeTableDefines.ColumnOptions<D>[]

  export interface PagerConfig extends VxePagerProps {
    enabled?: boolean
    slots?: any
  }
  export interface PagerOpts extends PagerConfig { }

  interface ProxyAjaxQueryPageParams {
    total: number
    pageSize: number
    currentPage: number
  }

  interface ProxyAjaxQuerySortCheckedParams<D = VxeTableDataRow> {
    column: VxeTableDefines.ColumnInfo<D>
    order: string
    sortBy: string
    field: string
    property: string
  }

  interface ProxyAjaxQueryParams<D = VxeTableDataRow> {
    $grid: VxeGridConstructor<D>
    page: ProxyAjaxQueryPageParams
    sort: ProxyAjaxQuerySortCheckedParams<D>
    sorts: ProxyAjaxQuerySortCheckedParams<D>[]
    filters: VxeTableDefines.FilterCheckedParams[]
    form: {
      [key: string]: any
    }
  }

  interface ProxyAjaxQueryAllParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D>
    sort: ProxyAjaxQuerySortCheckedParams<D>
    sorts: ProxyAjaxQuerySortCheckedParams<D>[]
    filters: VxeTableDefines.FilterCheckedParams[]
    form: {
      [key: string]: any
    }
    options: any
  }

  interface ProxyAjaxDeleteParams<D = VxeTableDataRow> {
    $grid: VxeGridConstructor<D>
    body: {
      removeRecords: D[]
    }
  }

  interface ProxyAjaxSaveParams<D = VxeTableDataRow> {
    $grid: VxeGridConstructor<D>
    body: {
      insertRecords: D[]
      updateRecords: D[]
      removeRecords: D[]
      pendingRecords: D[]
    }
  }

  export interface ProxyConfig<D = VxeTableDataRow> {
    enabled?: boolean
    autoLoad?: boolean
    message?: boolean
    seq?: boolean
    sort?: boolean
    filter?: boolean
    form?: boolean
    response?: {
      list?: string | null | ((params: {
        data: any
        $grid: VxeGridConstructor<D>
      }) => any[])
      result?: string | ((params: {
        data: any
        $grid: VxeGridConstructor<D>
      }) => any[])
      total?: string | ((params: {
        data: any
        $grid: VxeGridConstructor<D>
      }) => number)
      message?: string | ((params: {
        data: any
        $grid: VxeGridConstructor<D>
      }) => string)
    }
    ajax?: {
      query?(params: ProxyAjaxQueryParams<D>, ...args: any[]): Promise<any>
      queryAll?(params: ProxyAjaxQueryAllParams<D>, ...args: any[]): Promise<any>
      delete?(params: ProxyAjaxDeleteParams<D>, ...args: any[]): Promise<any>
      save?(params: ProxyAjaxSaveParams<D>, ...args: any[]): Promise<any>
    }
    [key: string]: any

    /**
     * 已废弃，请使用 proxy-config.response
     * @deprecated
     */
    props?: {
      /**
       * 已废弃，请使用 proxy-config.response.list
       * @deprecated
       */
      list?: string | null
      /**
       * 已废弃，请使用 proxy-config.response.result
       * @deprecated
       */
      result?: string
      /**
       * 已废弃，请使用 proxy-config.response.total
       * @deprecated
       */
      total?: string
      /**
       * 已废弃，请使用 proxy-config.response.message
       * @deprecated
       */
      message?: string
    }
  }
  export interface ProxyOpts<D = VxeTableDataRow> extends ProxyConfig<D> { }

  export interface ToolbarOpts extends ToolbarConfig { }
  export interface ToolbarConfig extends VxeToolbarProps {
    enabled?: boolean
    zoom?: boolean | {
      escRestore?: boolean
      iconIn?: string
      iconOut?: string
    }
    slots?: {
      buttons?: string | ((params: { [key: string]: any }) => SlotVNodeType | SlotVNodeType[])
      tools?: string | ((params: { [key: string]: any }) => SlotVNodeType | SlotVNodeType[])
    }
  }

  export interface FormConfig extends VxeFormProps {
    enabled?: boolean
    items?: VxeFormItemProps[]
  }
  export interface FormOpts extends FormConfig {
    inited?: boolean
  }

  export interface ZoomConfig {
    escRestore?: boolean
  }
  export interface ZoomOpts extends ZoomConfig { }
}

export type VxeGridProps<D = VxeTableDataRow> = VxeTableProps<D> & {
  layouts?: VxeGridPropTypes.Layouts
  columns?: VxeGridPropTypes.Columns<D>
  pagerConfig?: VxeGridPropTypes.PagerConfig
  proxyConfig?: VxeGridPropTypes.ProxyConfig<D>
  toolbarConfig?: VxeGridPropTypes.ToolbarConfig
  formConfig?: VxeGridPropTypes.FormConfig
  zoomConfig?: VxeGridPropTypes.ZoomConfig
}

export namespace VxeGridDefines {
  interface GridEventParams<D = VxeTableDataRow> extends VxeEvent {
    $grid: VxeGridConstructor<D>
  }

  export interface KeydownEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.KeydownEventParams<D> { }
  export interface PasteEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.PasteEventParams<D> { }
  export interface CopyEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CopyEventParams<D> { }
  export interface CutEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CutEventParams<D> { }
  export interface CurrentChangeEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CurrentChangeEventParams<D> { }
  export interface RadioChangeEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.RadioChangeEventParams<D> { }
  export interface CheckboxChangeEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CheckboxChangeEventParams<D> { }
  export interface CheckboxAllEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CheckboxAllEventParams<D> { }
  export interface CheckboxRangeStartEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CheckboxRangeStartEventParams<D> { }
  export interface CheckboxRangeChangeEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CheckboxRangeChangeEventParams<D> { }
  export interface CheckboxRangeEndEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CheckboxRangeEndEventParams<D> { }
  export interface CellClickEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CellClickEventParams<D> { }
  export interface CellDblclickEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CellDblclickEventParams<D> { }
  export interface CellMenuEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CellMenuEventParams<D> { }
  export interface CellMouseenterEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CellMouseenterEventParams<D> { }
  export interface CellMouseleaveEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CellMouseleaveEventParams<D> { }
  export interface HeaderCellClickEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.HeaderCellClickEventParams<D> { }
  export interface HeaderCellDblclickEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.HeaderCellDblclickEventParams<D> { }
  export interface HeaderCellMenuEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.HeaderCellMenuEventParams<D> { }
  export interface FooterCellClickEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.FooterCellClickEventParams<D> { }
  export interface FooterCellDblclickEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.FooterCellDblclickEventParams<D> { }
  export interface FooterCellMenuEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.FooterCellMenuEventParams<D> { }
  export interface SortChangeEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.SortChangeEventParams<D> { }
  export interface FilterChangeEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.FilterChangeEventParams<D> { }
  export interface FilterVisibleEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.FilterVisibleEventParams<D> { }
  export interface ResizableChangeEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.ResizableChangeEventParams<D> { }
  export interface ToggleRowExpandEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.ToggleRowExpandEventParams<D> { }
  export interface ToggleTreeExpandEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.ToggleTreeExpandEventParams<D> { }
  export interface MenuClickEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.MenuClickEventParams<D> { }
  export interface EditClosedEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.EditClosedEventParams<D> { }
  export interface EditActivedEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.EditActivedEventParams<D> { }
  export interface EditDisabledEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.EditDisabledEventParams<D> { }
  export interface ValidErrorEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.ValidErrorEventParams<D> { }
  export interface ScrollEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.ScrollEventParams<D> { }
  export interface CustomEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeTableDefines.CustomEventParams<D> { }

  export interface ProxyQueryEventParams<D = VxeTableDataRow> extends GridEventParams<D> {
    status: boolean
    isReload: boolean
    isInited: boolean
  }
  export interface ProxyDeleteEventParams<D = VxeTableDataRow> extends GridEventParams<D> {
    status: boolean
  }
  export interface ProxySaveEventParams<D = VxeTableDataRow> extends GridEventParams<D> {
    status: boolean
  }
  export interface PageChangeEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxePagerDefines.PageChangeEventParams { }
  export interface FormSubmitEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeFormDefines.SubmitEventParams { }
  export interface FormSubmitInvalidEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeFormDefines.SubmitInvalidParams { }
  export interface FormResetEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeFormDefines.ResetEventParams { }
  export interface FormCollapseEventParams<D = VxeTableDataRow> extends GridEventParams<D>, VxeFormDefines.CollapseEventParams { }

  export interface ToolbarButtonClickParams {
    code: string
    button: VxeToolbarPropTypes.ButtonConfig
  }
  export interface ToolbarButtonClickEventParams<D = VxeTableDataRow> extends GridEventParams<D>, ToolbarButtonClickParams { }

  export interface ToolbarToolClickParams {
    code: string
    tool: VxeToolbarPropTypes.ToolConfig
  }
  export interface ToolbarToolClickEventParams<D = VxeTableDataRow> extends GridEventParams<D>, ToolbarToolClickParams { }

  export interface ZoomParams {
    type: 'max' | 'revert'
  }
  export interface ZoomEventParams<D = VxeTableDataRow> extends GridEventParams<D>, ZoomParams { }
}

export interface VxeGridEventProps<D = VxeTableDataRow> {
  onKeydown?: VxeGridEvents.Keydown<D>
  onPaste?: VxeGridEvents.Paste<D>
  onCopy?: VxeGridEvents.Copy<D>
  onCut?: VxeGridEvents.Cut<D>
  onCurrentChange?: VxeGridEvents.CurrentChange<D>
  onRadioChange?: VxeGridEvents.RadioChange<D>
  onCheckboxChange?: VxeGridEvents.CheckboxChange<D>
  onCheckboxAll?: VxeGridEvents.CheckboxAll<D>
  onCheckboxRangeStart?: VxeGridEvents.CheckboxRangeStart<D>
  onCheckboxRangeChange?: VxeGridEvents.CheckboxRangeChange<D>
  onCheckboxRangeEnd?: VxeGridEvents.CheckboxRangeEnd<D>
  onCellClick?: VxeGridEvents.CellClick<D>
  onCellDblclick?: VxeGridEvents.CellDblclick<D>
  onCellMenu?: VxeGridEvents.CellMenu<D>
  onCellMouseenter?: VxeGridEvents.CellMouseenter<D>
  onCellMouseleave?: VxeGridEvents.CellMouseleave<D>
  onHeaderCellClick?: VxeGridEvents.HeaderCellClick<D>
  onHeaderCellDblclick?: VxeGridEvents.HeaderCellDblclick<D>
  onHeaderCellMenu?: VxeGridEvents.HeaderCellMenu<D>
  onFooterCellClick?: VxeGridEvents.FooterCellClick<D>
  onFooterCellDblclick?: VxeGridEvents.FooterCellDblclick<D>
  onFooterCellMenu?: VxeGridEvents.FooterCellMenu<D>
  onSortChange?: VxeGridEvents.SortChange<D>
  onFilterChange?: VxeGridEvents.FilterChange<D>
  onFilterVisible?: VxeGridEvents.FilterVisible<D>
  onResizableChange?: VxeGridEvents.ResizableChange<D>
  onToggleRowExpand?: VxeGridEvents.ToggleRowExpand<D>
  onToggleTreeExpand?: VxeGridEvents.ToggleTreeExpand<D>
  onMenuClick?: VxeGridEvents.MenuClick<D>
  onEditClosed?: VxeGridEvents.EditClosed<D>
  onEditActived?: VxeGridEvents.EditActived<D>
  onEditDisabled?: VxeGridEvents.EditDisabled<D>
  onValidError?: VxeGridEvents.ValidError<D>
  onScroll?: VxeGridEvents.Scroll<D>
  onCustom?: VxeGridEvents.Custom<D>

  // grid
  onProxyQuery?: VxeGridEvents.ProxyQuery<D>
  onProxyDelete?: VxeGridEvents.ProxyDelete<D>
  onProxySave?: VxeGridEvents.ProxySave<D>
  onPageChange?: VxeGridEvents.PageChange<D>
  onFormSubmit?: VxeGridEvents.FormSubmit<D>
  onFormSubmitInvalid?: VxeGridEvents.FormSubmitInvalid<D>
  onFormReset?: VxeGridEvents.FormReset<D>
  onFormCollapse?: VxeGridEvents.FormCollapse<D>
  onToolbarButtonClick?: VxeGridEvents.ToolbarButtonClick<D>
  onToolbarToolClick?: VxeGridEvents.ToolbarToolClick<D>
  onZoom?: VxeGridEvents.Zoom<D>
}

export interface VxeGridListeners<D = VxeTableDataRow> {
  keydown?: VxeGridEvents.Keydown<D>
  paste?: VxeGridEvents.Paste<D>
  copy?: VxeGridEvents.Copy<D>
  cut?: VxeGridEvents.Cut<D>
  currentChange?: VxeGridEvents.CurrentChange<D>
  radioChange?: VxeGridEvents.RadioChange<D>
  checkboxChange?: VxeGridEvents.CheckboxChange<D>
  checkboxAll?: VxeGridEvents.CheckboxAll<D>
  checkboxRangeStart?: VxeGridEvents.CheckboxRangeStart<D>
  checkboxRangeChange?: VxeGridEvents.CheckboxRangeChange<D>
  checkboxRangeEnd?: VxeGridEvents.CheckboxRangeEnd<D>
  cellClick?: VxeGridEvents.CellClick<D>
  cellDblclick?: VxeGridEvents.CellDblclick<D>
  cellMenu?: VxeGridEvents.CellMenu<D>
  cellMouseenter?: VxeGridEvents.CellMouseenter<D>
  cellMouseleave?: VxeGridEvents.CellMouseleave<D>
  headerCellClick?: VxeGridEvents.HeaderCellClick<D>
  headerCellDblclick?: VxeGridEvents.HeaderCellDblclick<D>
  headerCellMenu?: VxeGridEvents.HeaderCellMenu<D>
  footerCellClick?: VxeGridEvents.FooterCellClick<D>
  footerCellDblclick?: VxeGridEvents.FooterCellDblclick<D>
  footerCellMenu?: VxeGridEvents.FooterCellMenu<D>
  sortChange?: VxeGridEvents.SortChange<D>
  filterChange?: VxeGridEvents.FilterChange<D>
  filterVisible?: VxeGridEvents.FilterVisible<D>
  resizableChange?: VxeGridEvents.ResizableChange<D>
  toggleRowExpand?: VxeGridEvents.ToggleRowExpand<D>
  toggleTreeExpand?: VxeGridEvents.ToggleTreeExpand<D>
  menuClick?: VxeGridEvents.MenuClick<D>
  editClosed?: VxeGridEvents.EditClosed<D>
  editActived?: VxeGridEvents.EditActived<D>
  editDisabled?: VxeGridEvents.EditDisabled<D>
  validError?: VxeGridEvents.ValidError<D>
  scroll?: VxeGridEvents.Scroll<D>
  custom?: VxeGridEvents.Custom<D>

  // grid
  proxyQuery?: VxeGridEvents.ProxyQuery<D>
  proxyDelete?: VxeGridEvents.ProxyDelete<D>
  proxySave?: VxeGridEvents.ProxySave<D>
  pageChange?: VxeGridEvents.PageChange<D>
  formSubmit?: VxeGridEvents.FormSubmit<D>
  formSubmitInvalid?: VxeGridEvents.FormSubmitInvalid<D>
  formReset?: VxeGridEvents.FormReset<D>
  formCollapse?: VxeGridEvents.FormCollapse<D>
  toolbarButtonClick?: VxeGridEvents.ToolbarButtonClick<D>
  toolbarToolClick?: VxeGridEvents.ToolbarToolClick<D>
  zoom?: VxeGridEvents.Zoom<D>
}

export namespace VxeGridEvents {
  export type Keydown<D = any> = (params: VxeGridDefines.KeydownEventParams<D>) => void
  export type Paste<D = any> = (params: VxeGridDefines.PasteEventParams<D>) => void
  export type Copy<D = any> = (params: VxeGridDefines.CopyEventParams<D>) => void
  export type Cut<D = any> = (params: VxeGridDefines.CutEventParams<D>) => void
  export type CurrentChange<D = any> = (params: VxeGridDefines.CurrentChangeEventParams<D>) => void
  export type RadioChange<D = any> = (params: VxeGridDefines.RadioChangeEventParams<D>) => void
  export type CheckboxChange<D = any> = (params: VxeGridDefines.CheckboxChangeEventParams<D>) => void
  export type CheckboxAll<D = any> = (params: VxeGridDefines.CheckboxAllEventParams<D>) => void
  export type CheckboxRangeStart<D = any> = (params: VxeGridDefines.CheckboxRangeStartEventParams<D>) => void
  export type CheckboxRangeChange<D = any> = (params: VxeGridDefines.CheckboxRangeChangeEventParams<D>) => void
  export type CheckboxRangeEnd<D = any> = (params: VxeGridDefines.CheckboxRangeEndEventParams<D>) => void
  export type CellClick<D = any> = (params: VxeGridDefines.CellClickEventParams<D>) => void
  export type CellDblclick<D = any> = (params: VxeGridDefines.CellDblclickEventParams<D>) => void
  export type CellMenu<D = any> = (params: VxeGridDefines.CellMenuEventParams<D>) => void
  export type CellMouseenter<D = any> = (params: VxeGridDefines.CellMouseenterEventParams<D>) => void
  export type CellMouseleave<D = any> = (params: VxeGridDefines.CellMouseleaveEventParams<D>) => void
  export type HeaderCellClick<D = any> = (params: VxeGridDefines.HeaderCellClickEventParams<D>) => void
  export type HeaderCellDblclick<D = any> = (params: VxeGridDefines.HeaderCellDblclickEventParams<D>) => void
  export type HeaderCellMenu<D = any> = (params: VxeGridDefines.HeaderCellMenuEventParams<D>) => void
  export type FooterCellClick<D = any> = (params: VxeGridDefines.FooterCellClickEventParams<D>) => void
  export type FooterCellDblclick<D = any> = (params: VxeGridDefines.FooterCellDblclickEventParams<D>) => void
  export type FooterCellMenu<D = any> = (params: VxeGridDefines.FooterCellMenuEventParams<D>) => void
  export type SortChange<D = any> = (params: VxeGridDefines.SortChangeEventParams<D>) => void
  export type FilterChange<D = any> = (params: VxeGridDefines.FilterChangeEventParams<D>) => void
  export type FilterVisible<D = any> = (params: VxeGridDefines.FilterVisibleEventParams<D>) => void
  export type ResizableChange<D = any> = (params: VxeGridDefines.ResizableChangeEventParams<D>) => void
  export type ToggleRowExpand<D = any> = (params: VxeGridDefines.ToggleRowExpandEventParams<D>) => void
  export type ToggleTreeExpand<D = any> = (params: VxeGridDefines.ToggleTreeExpandEventParams<D>) => void
  export type MenuClick<D = any> = (params: VxeGridDefines.MenuClickEventParams<D>) => void
  export type EditClosed<D = any> = (params: VxeGridDefines.EditClosedEventParams<D>) => void
  export type EditActived<D = any> = (params: VxeGridDefines.EditActivedEventParams<D>) => void
  export type EditDisabled<D = any> = (params: VxeGridDefines.EditDisabledEventParams<D>) => void
  export type ValidError<D = any> = (params: VxeGridDefines.ValidErrorEventParams<D>) => void
  export type Scroll<D = any> = (params: VxeGridDefines.ScrollEventParams<D>) => void
  export type Custom<D = any> = (params: VxeGridDefines.CustomEventParams<D>) => void

  export type ProxyQuery<D = any> = (params: VxeGridDefines.ProxyQueryEventParams<D>) => void
  export type ProxyDelete<D = any> = (params: VxeGridDefines.ProxyDeleteEventParams<D>) => void
  export type ProxySave<D = any> = (params: VxeGridDefines.ProxySaveEventParams<D>) => void
  export type PageChange<D = any> = (params: VxeGridDefines.PageChangeEventParams<D>) => void
  export type FormSubmit<D = any> = (params: VxeGridDefines.FormSubmitEventParams<D>) => void
  export type FormSubmitInvalid<D = any> = (params: VxeGridDefines.FormSubmitInvalidEventParams<D>) => void
  export type FormReset<D = any> = (params: VxeGridDefines.FormResetEventParams<D>) => void
  export type FormCollapse<D = any> = (params: VxeGridDefines.FormCollapseEventParams<D>) => void
  export type ToolbarButtonClick<D = any> = (params: VxeGridDefines.ToolbarButtonClickEventParams<D>) => void
  export type ToolbarToolClick<D = any> = (params: VxeGridDefines.ToolbarToolClickEventParams<D>) => void
  export type Zoom<D = any> = (params: VxeGridDefines.ZoomEventParams<D>) => void
}

export interface VxeGridSlots<D = VxeTableDataRow> {
  /**
   * 自定义空数据时显示模板
   */
  empty?(params: {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }): any
  /**
   * 自定义加载中模板
   */
  loading?(params: {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }): any
  /**
   * 自定义表单模板
   */
  form?(params: {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }): any
  /**
   * 自定义工具栏模板
   */
  toolbar?(params: {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }): any
  /**
   * 自定义表格顶部模板
   */
  top?(params: {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }): any
  /**
   * 表格底部模板
   */
  bottom?(params: {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }): any
  /**
   * 自定义分页模板
   */
  pager?(params: {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }): any

  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
    row: D
    rowIndex: number
    $rowIndex: number
    _rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    _columnIndex: number

    checked?: boolean
    indeterminate?: boolean

    items: D[]

    [key: string]: any
  }) => any) | undefined
}
