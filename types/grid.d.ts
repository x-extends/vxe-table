import { VNode, RenderFunction, SetupContext, Ref, ComputedRef, ComponentPublicInstance, ComponentInternalInstance } from 'vue'
import { VxeColumnOptions } from './column'
import { VxeFormInstance, VxeFormOptions, VxeFormDefines } from './form'
import { VxeFormItemOptions } from './form-item'
import { VxeToolbarInstance, VxeToolbarOptions, VxeToolbarPropTypes } from './toolbar'
import { VxePagerInstance, VxePagerOptions, VxePagerDefines } from './pager'
import { VXETableComponent, VxeComponentInstance, VxeEvent, RowInfo, SizeType, ValueOf } from './component'
import { VxeTableInstance, VxeTableDefines, VxeTableConstructor, VxeTableProps, VxeTablePropTypes, TablePublicMethods, VxeTableMethods, VxeTablePrivateMethods } from './table'

/**
 * 组件 - 高级表格
 */
export interface Grid extends VXETableComponent { }

export type VxeGridInstance = ComponentPublicInstance<VxeGridProps, VxeGridConstructor>;

export interface VxeGridConstructor extends VxeComponentInstance, VxeGridMethods {
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

export interface VxeGridOptions extends VxeGridProps, VxeGridListeners { }

export type VxeGridEmits = [
  'update:data',
  'keydown',
  'paste',
  'copy',
  'cut',
  'current-change',
  'radio-change',
  'checkbox-change',
  'checkbox-all',
  'checkbox-range-start',
  'checkbox-range-change',
  'checkbox-range-end',
  'cell-click',
  'cell-dblclick',
  'cell-menu',
  'cell-mouseenter',
  'cell-mouseleave',
  'header-cell-click',
  'header-cell-dblclick',
  'header-cell-menu',
  'footer-cell-click',
  'footer-cell-dblclick',
  'footer-cell-menu',
  'sort-change',
  'filter-change',
  'resizable-change',
  'toggle-row-expand',
  'toggle-tree-expand',
  'menu-click',
  'edit-closed',
  'edit-actived',
  'edit-disabled',
  'valid-error',
  'scroll',
  'custom',

  'open-fnr',
  'change-fnr',
  'cell-area-copy',
  'cell-area-cut',
  'cell-area-paste',
  'cell-area-merge',
  'cell-area-selection-start',
  'cell-area-selection-end',
  'cell-area-extension-start',
  'cell-area-extension-end',

  'page-change',
  'form-submit',
  'form-submit-invalid',
  'form-reset',
  'form-toggle-collapse',
  'toolbar-button-click',
  'zoom'
]

export interface GridMethods extends GridPublicMethods {
  dispatchEvent(type: ValueOf<VxeGridEmits>, params: any, evnt?: Event): void;
}

export interface GridPublicMethods {
  /**
   * 加载列配置
   * @param columns 列对象
   */
  loadColumn(columns: VxeColumnOptions[]): Promise<any>;
  /**
   * 加载列配置并恢复到初始状态
   * @param columns 列对象
   */
  reloadColumn(columns: VxeColumnOptions[]): Promise<any>;
  /**
   * 给数据代理提交指令
   * @param code 指令编码
   */
  commitProxy(code: string | VxeToolbarPropTypes.ButtonConfig, ...args: any[]): Promise<any>;
  /**
   * 获取表单项列表
   */
  getFormItems(): VxeFormItemOptions[];
  /**
   * 获取已标记删除的数据
   */
  getPendingRecords(): RowInfo[];
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
    pendingRecords: RowInfo[];
  } | null;
}

export interface VxeGridMethods extends GridMethods, TablePublicMethods { }

export interface GridPrivateMethods {
  extendTableMethods: <T>(methodKeys: T[]) => any;
  triggerToolbarBtnEvent(button: VxeToolbarPropTypes.ButtonConfig, evnt: Event): void;
  triggerZoomEvent(evnt: Event): void;
  getParentHeight(): number;
  getExcludeHeight(): number;
}

export interface VxeGridPrivateMethods extends GridPrivateMethods { }

export namespace VxeGridPropTypes {
  export type Size = SizeType;

  export interface ColumnOptions extends VxeColumnOptions { }
  export type Columns = ColumnOptions[];

  export interface PagerConfig extends VxePagerOptions {
    enabled?: boolean;
    slots?: any;
  }
  export interface PagerOpts extends PagerConfig {}

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
  export interface ToolbarConfig extends VxeToolbarOptions {
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

  export interface FormConfig extends VxeFormOptions {
    enabled?: boolean;
    items?: VxeFormItemOptions[];
  }
  export interface FormOpts extends FormConfig {
    inited?: boolean;
  }

  export interface ZoomConfig {
    escRestore?: boolean;
  }
  export interface ZoomOpts extends ZoomConfig { }
}

export interface VxeGridProps extends VxeTableProps {
  columns?: VxeGridPropTypes.ColumnOptions[];
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
  export interface CellDBLClickEventParams extends GridEventParams, VxeTableDefines.CellDBLClickEventParams { }
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
  }
  export interface ToolbarButtonClickEventParams extends GridEventParams, ToolbarButtonClickParams { }

  export interface ZoomParams {
    type: 'max' | 'revert';
  }
  export interface ZoomEventParams extends GridEventParams, ZoomParams { }
}

export interface VxeGridListeners {
  onKeydown?: VxeGridEvents.Keydown;
  keydown?: VxeGridEvents.Keydown;

  onPaste?: VxeGridEvents.Paste;
  paste?: VxeGridEvents.Paste;

  onCopy?: VxeGridEvents.Copy;
  copy?: VxeGridEvents.Copy;

  onCut?: VxeGridEvents.Cut;
  cut?: VxeGridEvents.Cut;

  onCurrentChange?: VxeGridEvents.CurrentChange;
  currentChange?: VxeGridEvents.CurrentChange;

  onRadioChange?: VxeGridEvents.RadioChange;
  radioChange?: VxeGridEvents.RadioChange;

  onCheckboxChange?: VxeGridEvents.CheckboxChange;
  checkboxChange?: VxeGridEvents.CheckboxChange;

  onCheckboxAll?: VxeGridEvents.CheckboxAll;
  checkboxAll?: VxeGridEvents.CheckboxAll;

  onCheckboxRangeStart?: VxeGridEvents.CheckboxRangeStart;
  checkboxRangeStart?: VxeGridEvents.CheckboxRangeStart;

  onCheckboxRangeChange?: VxeGridEvents.CheckboxRangeChange;
  checkboxRangeChange?: VxeGridEvents.CheckboxRangeChange;

  onCheckboxRangeEnd?: VxeGridEvents.CheckboxRangeEnd;
  checkboxRangeEnd?: VxeGridEvents.CheckboxRangeEnd;

  onCellClick?: VxeGridEvents.CellClick;
  cellClick?: VxeGridEvents.CellClick;

  onCellDBLClick?: VxeGridEvents.CellDBLClick;
  cellDBLClick?: VxeGridEvents.CellDBLClick;

  onCellMenu?: VxeGridEvents.CellMenu;
  cellMenu?: VxeGridEvents.CellMenu;

  onCellMouseenter?: VxeGridEvents.CellMouseenter;
  cellMouseenter?: VxeGridEvents.CellMouseenter;

  onCellMouseleave?: VxeGridEvents.CellMouseleave;
  cellMouseleave?: VxeGridEvents.CellMouseleave;

  onHeaderCellClick?: VxeGridEvents.HeaderCellClick;
  headerCellClick?: VxeGridEvents.HeaderCellClick;

  onHeaderCellDblclick?: VxeGridEvents.HeaderCellDblclick;
  headerCellDblclick?: VxeGridEvents.HeaderCellDblclick;

  onHeaderCellMenu?: VxeGridEvents.HeaderCellMenu;
  headerCellMenu?: VxeGridEvents.HeaderCellMenu;

  onFooterCellClick?: VxeGridEvents.FooterCellClick;
  footerCellClick?: VxeGridEvents.FooterCellClick;

  onFooterCellDblclick?: VxeGridEvents.FooterCellDblclick;
  footerCellDblclick?: VxeGridEvents.FooterCellDblclick;

  onFooterCellMenu?: VxeGridEvents.FooterCellMenu;
  footerCellMenu?: VxeGridEvents.FooterCellMenu;

  onSortChange?: VxeGridEvents.SortChange;
  sortChange?: VxeGridEvents.SortChange;

  onFilterChange?: VxeGridEvents.FilterChange;
  filterChange?: VxeGridEvents.FilterChange;

  onResizableChange?: VxeGridEvents.ResizableChange;
  resizableChange?: VxeGridEvents.ResizableChange;

  onToggleRowExpand?: VxeGridEvents.ToggleRowExpand;
  toggleRowExpand?: VxeGridEvents.ToggleRowExpand;

  onToggleTreeExpand?: VxeGridEvents.ToggleTreeExpand;
  toggleTreeExpand?: VxeGridEvents.ToggleTreeExpand;

  onMenuClick?: VxeGridEvents.MenuClick;
  menuClick?: VxeGridEvents.MenuClick;

  onEditClosed?: VxeGridEvents.EditClosed;
  editClosed?: VxeGridEvents.EditClosed;

  onEditActived?: VxeGridEvents.EditActived;
  editActived?: VxeGridEvents.EditActived;

  onEditDisabled?: VxeGridEvents.EditDisabled;
  editDisabled?: VxeGridEvents.EditDisabled;

  onValidError?: VxeGridEvents.ValidError;
  validError?: VxeGridEvents.ValidError;

  onScroll?: VxeGridEvents.Scroll;
  scroll?: VxeGridEvents.Scroll;

  onCustom?: VxeGridEvents.Custom;
  custom?: VxeGridEvents.Custom;

  // grid
  onPageChange?: VxeGridEvents.PageChange;
  pageChange?: VxeGridEvents.PageChange;

  onFormSubmitEvent?: VxeGridEvents.FormSubmitEvent;
  formSubmitEvent?: VxeGridEvents.FormSubmitEvent;

  onFormSubmitInvalid?: VxeGridEvents.FormSubmitInvalid;
  formSubmitInvalid?: VxeGridEvents.FormSubmitInvalid;

  onFormReset?: VxeGridEvents.FormReset;
  formReset?: VxeGridEvents.FormReset;

  onFormToggleCollapse?: VxeGridEvents.FormToggleCollapse;
  formToggleCollapse?: VxeGridEvents.FormToggleCollapse;

  onToolbarButtonClick?: VxeGridEvents.ToolbarButtonClick;
  toolbarButtonClick?: VxeGridEvents.ToolbarButtonClick;

  onZoom?: VxeGridEvents.Zoom;
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
  export type CellDBLClick = (params: VxeGridDefines.CellDBLClickEventParams) => void;
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
  export type FormSubmitEvent = (params: VxeGridDefines.FormSubmitEventParams) => void;
  export type FormSubmitInvalid = (params: VxeGridDefines.FormSubmitInvalidEventParams) => void;
  export type FormReset = (params: VxeGridDefines.FormResetEventParams) => void;
  export type FormToggleCollapse = (params: VxeGridDefines.FormToggleCollapseEventParams) => void;
  export type ToolbarButtonClick = (params: VxeGridDefines.ToolbarButtonClickEventParams) => void;
  export type Zoom = (params: VxeGridDefines.ZoomEventParams) => void;
}
