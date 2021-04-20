import { VNode, RenderFunction, SetupContext, Ref, ComputedRef, ComponentPublicInstance, ComponentInternalInstance } from 'vue'
import { VxeFormInstance, VxeFormProps, VxeFormDefines } from './form'
import { VxeFormItemProps } from './form-item'
import { VxeToolbarInstance, VxeToolbarProps, VxeToolbarPropTypes } from './toolbar'
import { VxePagerInstance, VxePagerProps, VxePagerDefines } from './pager'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf } from './component'
import { VxeTableInstance, VxeTableDefines, VxeTableEmits, VxeTableConstructor, VxeTableProps, VxeTablePropTypes, TablePublicMethods, VxeTableMethods, VxeTablePrivateMethods } from './table'

/**
 * 组件 - 高级表格
 * @example import { Grid as VxeGrid } from 'vxe-table'
 */
export const Grid: VXEComponent<VxeGridProps, VxeGridEventProps>;

export type VxeGridInstance = ComponentPublicInstance<VxeGridProps, VxeGridConstructor>;

export interface VxeGridConstructor extends VxeComponentBase, VxeGridMethods {
  props: VxeGridProps;
  context: SetupContext<VxeGridEmits>;
  instance: ComponentInternalInstance;
  reactData: GridReactData;
  getRefMaps(): GridPrivateRef;
  getComputeMaps(): GridPrivateComputed;
  renderVN: RenderFunction;
}

export interface GridPrivateRef {
  refElem: Ref<HTMLDivElement>;
  refTable: Ref<ComponentPublicInstance<VxeTableProps, VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods>>;
  refForm: Ref<VxeFormInstance>;
  refToolbar: Ref<VxeToolbarInstance>;
  refPager: Ref<VxePagerInstance>;
}
export interface VxeGridPrivateRef extends GridPrivateRef { }

export interface GridPrivateComputed {
  computeProxyOpts: ComputedRef<VxeGridPropTypes.ProxyOpts>;
  computePagerOpts: ComputedRef<VxeGridPropTypes.PagerOpts>;
  computeFormOpts: ComputedRef<VxeGridPropTypes.FormOpts>;
  computeToolbarOpts: ComputedRef<VxeGridPropTypes.ToolbarOpts>;
  computeZoomOpts: ComputedRef<VxeGridPropTypes.ZoomOpts>;
}

export interface VxeGridPrivateComputed extends GridPrivateComputed { }

export interface GridReactData {
  tableLoading: boolean;
  proxyInited: boolean;
  isZMax: boolean;
  tableData: any[];
  pendingRecords: any[];
  filterData: VxeTableDefines.FilterCheckedParams[];
  formData: any;
  sortData: VxeTableDefines.SortCheckedParams[];
  tZindex: number;
  tablePage: {
    total: number;
    pageSize: number;
    currentPage: number;
  }
}

export type VxeGridEmits = [
  ...VxeTableEmits,

  'page-change',
  'form-submit',
  'form-submit-invalid',
  'form-reset',
  'form-toggle-collapse',
  'toolbar-button-click',
  'toolbar-tool-click',
  'zoom'
]

export interface GridMethods extends GridPublicMethods {
  dispatchEvent(type: ValueOf<VxeGridEmits>, params: any, evnt?: Event): void;
}

export interface GridPublicMethods {
  /**
   * 给数据代理提交指令
   * @param code 指令编码
   */
  commitProxy(code: string | VxeToolbarPropTypes.ButtonConfig, ...args: any[]): Promise<any>;
  /**
   * 获取表单项列表
   */
  getFormItems(): VxeFormItemProps[];
  getFormItems(itemIndex?: number): VxeFormItemProps;
  /**
   * 获取已标记删除的数据
   */
  getPendingRecords(): any[];
  /**
   * 切换表格最大化/还原
   */
  zoom(): Promise<boolean>;
  /**
   * 判断是否最大化显示
   */
  isMaximized(): boolean;
  /**
   * 如果表格处于常规状态，则最大化表格
   */
  maximize(): Promise<any>;
  /**
   * 如果表格处于最大化状态，则还原表格
   */
  revert(): Promise<any>;
  /**
   * 获取数据代理信息
   */
  getProxyInfo(): {
    data: any[];
    filter: any;
    form: any;
    sort: VxeTableDefines.SortCheckedParams | {};
    sorts: VxeTableDefines.SortCheckedParams[];
    pager: any;
    pendingRecords: any[];
  } | null;
}

export interface VxeGridMethods extends GridMethods, TablePublicMethods { }

export interface GridPrivateMethods {
  callSlot(slotFunc: Function | string | null, params: any): VNode[];
  extendTableMethods: <T>(methodKeys: T[]) => any;
  triggerToolbarBtnEvent(button: VxeToolbarPropTypes.ButtonConfig, evnt: Event): void;
  triggerToolbarTolEvent(button: VxeToolbarPropTypes.ToolConfig, evnt: Event): void;
  triggerZoomEvent(evnt: Event): void;
  getParentHeight(): number;
  getExcludeHeight(): number;
}

export interface VxeGridPrivateMethods extends GridPrivateMethods { }

export namespace VxeGridPropTypes {
  export type Size = SizeType;

  export type Columns = VxeTableDefines.ColumnOptions[];

  export interface PagerConfig extends VxePagerProps {
    enabled?: boolean;
    slots?: any;
  }
  export interface PagerOpts extends PagerConfig { }

  interface ProxyAjaxQueryPageParams {
    pageSize: number;
    currentPage: number;
  }

  interface ProxyAjaxQuerySortCheckedParams {
    column: VxeTableDefines.ColumnInfo;
    order: string;
    sortBy: string;
    property: string;
  }

  interface ProxyAjaxQueryFiltersParams {
    field: string;
    property: string;
    values: any[];
  }

  interface ProxyAjaxQueryParams {
    page: ProxyAjaxQueryPageParams;
    sort: ProxyAjaxQuerySortCheckedParams;
    sorts: ProxyAjaxQuerySortCheckedParams[];
    filters: ProxyAjaxQueryFiltersParams[];
    form: any;
  }

  interface ProxyAjaxQueryAllParams {
    $table: VxeTableConstructor;
    $grid: VxeGridConstructor;
    sort: ProxyAjaxQuerySortCheckedParams;
    sorts: ProxyAjaxQuerySortCheckedParams[];
    filters: ProxyAjaxQueryFiltersParams[];
    form: any;
    options: any;
  }

  interface ProxyAjaxDeleteParams {
    body: {
      removeRecords: any[];
    }
  }

  interface ProxyAjaxSaveParams {
    body: {
      insertRecords: any[];
      updateRecords: any[];
      removeRecords: any[];
      pendingRecords: any[];
    }
  }

  export interface ProxyConfig {
    enabled?: boolean;
    autoLoad?: boolean;
    message?: boolean;
    seq?: boolean;
    sort?: boolean;
    filter?: boolean;
    form?: boolean;
    props?: {
      list?: string | null;
      result?: string;
      total?: string;
      message?: string;
    };
    ajax?: {
      query?(params: ProxyAjaxQueryParams, ...args: any[]): Promise<any>;
      queryAll?(params: ProxyAjaxQueryAllParams, ...args: any[]): Promise<any>;
      delete?(params: ProxyAjaxDeleteParams, ...args: any[]): Promise<any>;
      save?(params: ProxyAjaxSaveParams, ...args: any[]): Promise<any>;
    }
    [key: string]: any;
  }
  export interface ProxyOpts extends ProxyConfig { }

  export interface ToolbarOpts extends ToolbarConfig { }
  export interface ToolbarConfig extends VxeToolbarProps {
    enabled?: boolean;
    buttons?: any[];
    zoom?: boolean | {
      escRestore?: boolean;
      iconIn?: string;
      iconOut?: string;
    };
    slots?: {
      buttons?: string | ((params: {}) => VNode[] | string[] | JSX.Element[]);
      tools?: string | ((params: {}) => VNode[] | string[] | JSX.Element[]);
    }
  }

  export interface FormConfig extends VxeFormProps {
    enabled?: boolean;
    items?: VxeFormItemProps[];
  }
  export interface FormOpts extends FormConfig {
    inited?: boolean;
  }

  export interface ZoomConfig {
    escRestore?: boolean;
  }
  export interface ZoomOpts extends ZoomConfig { }
}

export type VxeGridProps<D = any> = VxeTableProps<D> & {
  columns?: VxeGridPropTypes.Columns;
  pagerConfig?: VxeGridPropTypes.PagerConfig;
  proxyConfig?: VxeGridPropTypes.ProxyConfig;
  toolbarConfig?: VxeGridPropTypes.ToolbarConfig;
  formConfig?: VxeGridPropTypes.FormConfig;
  zoomConfig?: VxeGridPropTypes.ZoomConfig;
}

export namespace VxeGridDefines {
  interface GridEventParams extends VxeEvent {
    $grid: VxeGridConstructor;
  }

  export interface KeydownEventParams extends GridEventParams, VxeTableDefines.KeydownEventParams { }
  export interface PasteEventParams extends GridEventParams, VxeTableDefines.PasteEventParams { }
  export interface CopyEventParams extends GridEventParams, VxeTableDefines.CopyEventParams { }
  export interface CutEventParams extends GridEventParams, VxeTableDefines.CutEventParams { }
  export interface CurrentChangeEventParams extends GridEventParams, VxeTableDefines.CurrentChangeEventParams { }
  export interface RadioChangeEventParams extends GridEventParams, VxeTableDefines.RadioChangeEventParams { }
  export interface CheckboxChangeEventParams extends GridEventParams, VxeTableDefines.CheckboxChangeEventParams { }
  export interface CheckboxAllEventParams extends GridEventParams, VxeTableDefines.CheckboxAllEventParams { }
  export interface CheckboxRangeStartEventParams extends GridEventParams, VxeTableDefines.CheckboxRangeStartEventParams { }
  export interface CheckboxRangeChangeEventParams extends GridEventParams, VxeTableDefines.CheckboxRangeChangeEventParams { }
  export interface CheckboxRangeEndEventParams extends GridEventParams, VxeTableDefines.CheckboxRangeEndEventParams { }
  export interface CellClickEventParams extends GridEventParams, VxeTableDefines.CellClickEventParams { }
  export interface CellDblclickEventParams extends GridEventParams, VxeTableDefines.CellDblclickEventParams { }
  export interface CellMenuEventParams extends GridEventParams, VxeTableDefines.CellMenuEventParams { }
  export interface CellMouseenterEventParams extends GridEventParams, VxeTableDefines.CellMouseenterEventParams { }
  export interface CellMouseleaveEventParams extends GridEventParams, VxeTableDefines.CellMouseleaveEventParams { }
  export interface HeaderCellClickEventParams extends GridEventParams, VxeTableDefines.HeaderCellClickEventParams { }
  export interface HeaderCellDblclickEventParams extends GridEventParams, VxeTableDefines.HeaderCellDblclickEventParams { }
  export interface HeaderCellMenuEventParams extends GridEventParams, VxeTableDefines.HeaderCellMenuEventParams { }
  export interface FooterCellClickEventParams extends GridEventParams, VxeTableDefines.FooterCellClickEventParams { }
  export interface FooterCellDblclickEventParams extends GridEventParams, VxeTableDefines.FooterCellDblclickEventParams { }
  export interface FooterCellMenuEventParams extends GridEventParams, VxeTableDefines.FooterCellMenuEventParams { }
  export interface SortChangeEventParams extends GridEventParams, VxeTableDefines.SortChangeEventParams { }
  export interface FilterChangeEventParams extends GridEventParams, VxeTableDefines.FilterChangeEventParams { }
  export interface ResizableChangeEventParams extends GridEventParams, VxeTableDefines.ResizableChangeEventParams { }
  export interface ToggleRowExpandEventParams extends GridEventParams, VxeTableDefines.ToggleRowExpandEventParams { }
  export interface ToggleTreeExpandEventParams extends GridEventParams, VxeTableDefines.ToggleTreeExpandEventParams { }
  export interface MenuClickEventParams extends GridEventParams, VxeTableDefines.MenuClickEventParams { }
  export interface EditClosedEventParams extends GridEventParams, VxeTableDefines.EditClosedEventParams { }
  export interface EditActivedEventParams extends GridEventParams, VxeTableDefines.EditActivedEventParams { }
  export interface EditDisabledEventParams extends GridEventParams, VxeTableDefines.EditDisabledEventParams { }
  export interface ValidErrorEventParams extends GridEventParams, VxeTableDefines.ValidErrorEventParams { }
  export interface ScrollEventParams extends GridEventParams, VxeTableDefines.ScrollEventParams { }
  export interface CustomEventParams extends GridEventParams, VxeTableDefines.CustomEventParams { }


  export interface PageChangeEventParams extends GridEventParams, VxePagerDefines.PageChangeEventParams { }
  export interface FormSubmitEventParams extends GridEventParams, VxeFormDefines.SubmitEventParams { }
  export interface FormSubmitInvalidEventParams extends GridEventParams, VxeFormDefines.SubmitInvalidParams { }
  export interface FormResetEventParams extends GridEventParams, VxeFormDefines.ResetEventParams { }
  export interface FormToggleCollapseEventParams extends GridEventParams, VxeFormDefines.ToggleCollapseEventParams { }

  export interface ToolbarButtonClickParams {
    code: string;
    button: VxeToolbarPropTypes.ButtonConfig;
  }
  export interface ToolbarButtonClickEventParams extends GridEventParams, ToolbarButtonClickParams { }

  export interface ToolbarToolClickParams {
    code: string;
    tool: VxeToolbarPropTypes.ToolConfig;
  }
  export interface ToolbarToolClickEventParams extends GridEventParams, ToolbarToolClickParams { }

  export interface ZoomParams {
    type: 'max' | 'revert';
  }
  export interface ZoomEventParams extends GridEventParams, ZoomParams { }
}

export interface VxeGridEventProps {
  onKeydown?: VxeGridEvents.Keydown;
  onPaste?: VxeGridEvents.Paste;
  onCopy?: VxeGridEvents.Copy;
  onCut?: VxeGridEvents.Cut;
  onCurrentChange?: VxeGridEvents.CurrentChange;
  onRadioChange?: VxeGridEvents.RadioChange;
  onCheckboxChange?: VxeGridEvents.CheckboxChange;
  onCheckboxAll?: VxeGridEvents.CheckboxAll;
  onCheckboxRangeStart?: VxeGridEvents.CheckboxRangeStart;
  onCheckboxRangeChange?: VxeGridEvents.CheckboxRangeChange;
  onCheckboxRangeEnd?: VxeGridEvents.CheckboxRangeEnd;
  onCellClick?: VxeGridEvents.CellClick;
  onCellDblclick?: VxeGridEvents.CellDblclick;
  onCellMenu?: VxeGridEvents.CellMenu;
  onCellMouseenter?: VxeGridEvents.CellMouseenter;
  onCellMouseleave?: VxeGridEvents.CellMouseleave;
  onHeaderCellClick?: VxeGridEvents.HeaderCellClick;
  onHeaderCellDblclick?: VxeGridEvents.HeaderCellDblclick;
  onHeaderCellMenu?: VxeGridEvents.HeaderCellMenu;
  onFooterCellClick?: VxeGridEvents.FooterCellClick;
  onFooterCellDblclick?: VxeGridEvents.FooterCellDblclick;
  onFooterCellMenu?: VxeGridEvents.FooterCellMenu;
  onSortChange?: VxeGridEvents.SortChange;
  onFilterChange?: VxeGridEvents.FilterChange;
  onResizableChange?: VxeGridEvents.ResizableChange;
  onToggleRowExpand?: VxeGridEvents.ToggleRowExpand;
  onToggleTreeExpand?: VxeGridEvents.ToggleTreeExpand;
  onMenuClick?: VxeGridEvents.MenuClick;
  onEditClosed?: VxeGridEvents.EditClosed;
  onEditActived?: VxeGridEvents.EditActived;
  onEditDisabled?: VxeGridEvents.EditDisabled;
  onValidError?: VxeGridEvents.ValidError;
  onScroll?: VxeGridEvents.Scroll;
  onCustom?: VxeGridEvents.Custom;

  // grid
  onPageChange?: VxeGridEvents.PageChange;
  onFormSubmit?: VxeGridEvents.FormSubmit;
  onFormSubmitInvalid?: VxeGridEvents.FormSubmitInvalid;
  onFormReset?: VxeGridEvents.FormReset;
  onFormToggleCollapse?: VxeGridEvents.FormToggleCollapse;
  onToolbarButtonClick?: VxeGridEvents.ToolbarButtonClick;
  onToolbarToolClick?: VxeGridEvents.ToolbarToolClick;
  onZoom?: VxeGridEvents.Zoom;
}

export interface VxeGridListeners {
  keydown?: VxeGridEvents.Keydown;
  paste?: VxeGridEvents.Paste;
  copy?: VxeGridEvents.Copy;
  cut?: VxeGridEvents.Cut;
  currentChange?: VxeGridEvents.CurrentChange;
  radioChange?: VxeGridEvents.RadioChange;
  checkboxChange?: VxeGridEvents.CheckboxChange;
  checkboxAll?: VxeGridEvents.CheckboxAll;
  checkboxRangeStart?: VxeGridEvents.CheckboxRangeStart;
  checkboxRangeChange?: VxeGridEvents.CheckboxRangeChange;
  checkboxRangeEnd?: VxeGridEvents.CheckboxRangeEnd;
  cellClick?: VxeGridEvents.CellClick
  cellDBLClick?: VxeGridEvents.CellDblclick;
  cellMenu?: VxeGridEvents.CellMenu;
  cellMouseenter?: VxeGridEvents.CellMouseenter;
  cellMouseleave?: VxeGridEvents.CellMouseleave;
  headerCellClick?: VxeGridEvents.HeaderCellClick;
  headerCellDblclick?: VxeGridEvents.HeaderCellDblclick;
  headerCellMenu?: VxeGridEvents.HeaderCellMenu;
  footerCellClick?: VxeGridEvents.FooterCellClick;
  footerCellDblclick?: VxeGridEvents.FooterCellDblclick;
  footerCellMenu?: VxeGridEvents.FooterCellMenu;
  sortChange?: VxeGridEvents.SortChange;
  filterChange?: VxeGridEvents.FilterChange;
  resizableChange?: VxeGridEvents.ResizableChange;
  toggleRowExpand?: VxeGridEvents.ToggleRowExpand;
  toggleTreeExpand?: VxeGridEvents.ToggleTreeExpand;
  menuClick?: VxeGridEvents.MenuClick;
  editClosed?: VxeGridEvents.EditClosed;
  editActived?: VxeGridEvents.EditActived;
  editDisabled?: VxeGridEvents.EditDisabled;
  validError?: VxeGridEvents.ValidError;
  scroll?: VxeGridEvents.Scroll;
  custom?: VxeGridEvents.Custom;

  // grid
  pageChange?: VxeGridEvents.PageChange;
  formSubmit?: VxeGridEvents.FormSubmit;
  formSubmitInvalid?: VxeGridEvents.FormSubmitInvalid;
  formReset?: VxeGridEvents.FormReset;
  formToggleCollapse?: VxeGridEvents.FormToggleCollapse;
  toolbarButtonClick?: VxeGridEvents.ToolbarButtonClick;
  zoom?: VxeGridEvents.Zoom;
}

export namespace VxeGridEvents {
  export type Keydown = (params: VxeGridDefines.KeydownEventParams) => void;
  export type Paste = (params: VxeGridDefines.PasteEventParams) => void;
  export type Copy = (params: VxeGridDefines.CopyEventParams) => void;
  export type Cut = (params: VxeGridDefines.CutEventParams) => void;
  export type CurrentChange = (params: VxeGridDefines.CurrentChangeEventParams) => void;
  export type RadioChange = (params: VxeGridDefines.RadioChangeEventParams) => void;
  export type CheckboxChange = (params: VxeGridDefines.CheckboxChangeEventParams) => void;
  export type CheckboxAll = (params: VxeGridDefines.CheckboxAllEventParams) => void;
  export type CheckboxRangeStart = (params: VxeGridDefines.CheckboxRangeStartEventParams) => void;
  export type CheckboxRangeChange = (params: VxeGridDefines.CheckboxRangeChangeEventParams) => void;
  export type CheckboxRangeEnd = (params: VxeGridDefines.CheckboxRangeEndEventParams) => void;
  export type CellClick = (params: VxeGridDefines.CellClickEventParams) => void;
  export type CellDblclick = (params: VxeGridDefines.CellDblclickEventParams) => void;
  export type CellMenu = (params: VxeGridDefines.CellMenuEventParams) => void;
  export type CellMouseenter = (params: VxeGridDefines.CellMouseenterEventParams) => void;
  export type CellMouseleave = (params: VxeGridDefines.CellMouseleaveEventParams) => void;
  export type HeaderCellClick = (params: VxeGridDefines.HeaderCellClickEventParams) => void;
  export type HeaderCellDblclick = (params: VxeGridDefines.HeaderCellDblclickEventParams) => void;
  export type HeaderCellMenu = (params: VxeGridDefines.HeaderCellMenuEventParams) => void;
  export type FooterCellClick = (params: VxeGridDefines.FooterCellClickEventParams) => void;
  export type FooterCellDblclick = (params: VxeGridDefines.FooterCellDblclickEventParams) => void;
  export type FooterCellMenu = (params: VxeGridDefines.FooterCellMenuEventParams) => void;
  export type SortChange = (params: VxeGridDefines.SortChangeEventParams) => void;
  export type FilterChange = (params: VxeGridDefines.FilterChangeEventParams) => void;
  export type ResizableChange = (params: VxeGridDefines.ResizableChangeEventParams) => void;
  export type ToggleRowExpand = (params: VxeGridDefines.ToggleRowExpandEventParams) => void;
  export type ToggleTreeExpand = (params: VxeGridDefines.ToggleTreeExpandEventParams) => void;
  export type MenuClick = (params: VxeGridDefines.MenuClickEventParams) => void;
  export type EditClosed = (params: VxeGridDefines.EditClosedEventParams) => void;
  export type EditActived = (params: VxeGridDefines.EditActivedEventParams) => void;
  export type EditDisabled = (params: VxeGridDefines.EditDisabledEventParams) => void;
  export type ValidError = (params: VxeGridDefines.ValidErrorEventParams) => void;
  export type Scroll = (params: VxeGridDefines.ScrollEventParams) => void;
  export type Custom = (params: VxeGridDefines.CustomEventParams) => void;

  export type PageChange = (params: VxeGridDefines.PageChangeEventParams) => void;
  export type FormSubmit = (params: VxeGridDefines.FormSubmitEventParams) => void;
  export type FormSubmitInvalid = (params: VxeGridDefines.FormSubmitInvalidEventParams) => void;
  export type FormReset = (params: VxeGridDefines.FormResetEventParams) => void;
  export type FormToggleCollapse = (params: VxeGridDefines.FormToggleCollapseEventParams) => void;
  export type ToolbarButtonClick = (params: VxeGridDefines.ToolbarButtonClickEventParams) => void;
  export type ToolbarToolClick = (params: VxeGridDefines.ToolbarToolClickEventParams) => void;
  export type Zoom = (params: VxeGridDefines.ZoomEventParams) => void;
}
