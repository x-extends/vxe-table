import { VNode, RenderFunction, SetupContext, Ref, ComputedRef, ComponentPublicInstance } from 'vue'
import { VxeColumnOptions } from './column'
import { VxeFormOptions } from './form'
import { VxeFormItemOptions } from './form-item'
import { VxeToolbarOptions, VxeToolbarPropTypes } from './toolbar'
import { VxePagerOptions } from './pager'
import { VXETableComponent, VxeComponentInstance, VxeEvent, RowInfo, SizeType, ValueOf } from './component'
import { VxeTableDefines, VxeTableConstructor, VxeTableProps, VxeTablePropTypes, TablePublicMethods } from './table'

/**
 * 组件 - 高级表格
 */
export interface Grid extends VXETableComponent { }

export type VxeGridInstance = ComponentPublicInstance<VxeGridProps, VxeGridConstructor>;

export interface VxeGridConstructor extends VxeComponentInstance, VxeGridMethods {
  props: VxeGridProps;
  context: SetupContext<VxeGridEmits>;
  reactData: GridReactData;
  refMaps: GridPrivateRef,
  computeMaps: GridPrivateComputed;
  renderVN: RenderFunction;
}

export interface GridPrivateRef {
  refElem: Ref<HTMLDivElement>;
}
export interface VxeGridPrivateRef extends GridPrivateRef { }

export interface GridPrivateComputed {
  computeProxyOpts: ComputedRef<VxeGridPropTypes.ProxyConfig>;
}

export interface VxeGridPrivateComputed extends GridPrivateComputed { }

export interface GridReactData {
  tableLoading: boolean;
  proxyInited: boolean;
  isZMax: boolean;
  tableData: any[];
  pendingRecords: any[];
  filterData: any[];
  formData: any;
  sortData: any[];
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
    data: any;
    filter: any;
    form: any;
    sort: any;
    pager: any;
    pendingRecords: RowInfo[];
  } | null;
}

export interface VxeGridMethods extends GridMethods, TablePublicMethods { }

export interface GridPrivateMethods {
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
    [key: string]: any;
  }
  export interface PagerOpts extends PagerConfig { }


  interface ProxyAjaxQueryPageParams {
    pageSize: number;
    currentPage: number;
  }
  interface ProxyAjaxQuerySortParams {
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
    sort: ProxyAjaxQuerySortParams;
    sorts: ProxyAjaxQuerySortParams[];
    filters: ProxyAjaxQueryFiltersParams[];
    form: any;
  }
  interface ProxyAjaxQueryAllParams {
    $table: VxeTableConstructor;
    $grid: VxeGridConstructor;
    sort: ProxyAjaxQuerySortParams;
    sorts: ProxyAjaxQuerySortParams[];
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
    items?: VxeFormItemOptions[];
    [key: string]: any;
  }
  export interface FormOpts extends FormConfig { }

  export interface ZoomConfig {
    escRestore?: boolean;
  }
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

  export interface CellClickEventParams extends GridEventParams, VxeTableDefines.CellClickEventParams { }

  export interface CellDBLClickEventParams extends GridEventParams, VxeTableDefines.CellDBLClickEventParams { }

  export interface CheckboxChangeEventParams extends GridEventParams, VxeTableDefines.CheckboxChangeEventParams { }

  export interface CheckboxAllEventParams extends GridEventParams, VxeTableDefines.CheckboxAllEventParams { }
}

export interface VxeGridListeners { }

export namespace VxeGridEvents {
  export type CellClick = (params: VxeGridDefines.CellClickEventParams) => void;
  export type CellDBLClick = (params: VxeGridDefines.CellDBLClickEventParams) => void;
  export type CheckboxChange = (params: VxeGridDefines.CheckboxChangeEventParams) => void;
  export type CheckboxAll = (params: VxeGridDefines.CheckboxAllEventParams) => void;
}
