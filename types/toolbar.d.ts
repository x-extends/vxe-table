import { VNode, RenderFunction, SetupContext, Ref, ComponentPublicInstance } from 'vue'
import { VXETableComponent, VxeComponentInstance, VxeEvent, SizeType, ValueOf } from './component'
import { VxeGlobalRendererHandles } from './v-x-e-table'
import { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods } from './table'

/**
 * 组件 - 工具栏
 */
export interface Toolbar extends VXETableComponent { }

export type VxeToolbarInstance = ComponentPublicInstance<VxeToolbarProps, VxeToolbarConstructor>;

export interface VxeToolbarConstructor extends VxeComponentInstance, VxeToolbarMethods {
  props: VxeToolbarProps;
  context: SetupContext<VxeToolbarEmits>;
  reactData: ToolbarReactData;
  refMaps: ToolbarPrivateRef;
  renderVN: RenderFunction;
}

export interface ToolbarPrivateRef {
  refElem: Ref<HTMLDivElement>;
}
export interface VxeToolbarPrivateRef extends ToolbarPrivateRef { }

export interface VxeToolbarOptions extends VxeToolbarProps, VxeToolbarListeners { }

export namespace VxeToolbarPropTypes {
  export type Size = SizeType;
  export type Id = string;
  export type Loading = boolean;

  interface ResizableConfig {
    storage?: boolean;
  }
  export type Resizable = boolean | ResizableConfig;
  export interface ResizableOpts extends ResizableConfig { }

  interface RefreshConfig {
    query?(params: { page: any, sort: any, filters: any, form: any }): Promise<any>;
    icon?: string;
    iconLoading?: string;
  }
  export type Refresh = boolean | RefreshConfig;
  export interface RefreshOpts extends RefreshConfig { }

  interface ImportConfig {
    icon?: string;
    [key: string]: any;
  }
  export type Import = boolean | ImportConfig;
  export interface ImportOpts extends ImportConfig { }

  interface ExportConfig {
    icon?: string;
    [key: string]: any;
  }
  export type Export = boolean | ExportConfig;
  export interface ExportOpts extends ExportConfig { }

  export interface PrintConfig {
    icon?: string;
    [key: string]: any;
  }
  export type Print = boolean | PrintConfig;
  export interface PrintOpts extends PrintConfig { }

  interface ZoomConfig {
    iconIn?: string;
    iconOut?: string;
    [key: string]: any;
  }
  export type Zoom = boolean | ZoomConfig;
  export interface ZoomOpts extends ZoomConfig { }

  interface CustomConfig {
    trigger?: string,
    immediate?: boolean;
    storage?: boolean;
    checkMethod?(params: { column: VxeTableDefines.ColumnInfo }): boolean;
    isFooter?: Boolean;
    icon?: string;
    [key: string]: any;
  }
  export type Custom = boolean | CustomConfig;
  export interface CustomOpts extends CustomConfig { }

  export interface ButtonConfig {
    name?: string;
    type?: string;
    status?: string;
    code?: string;
    visible?: boolean;
    disabled?: boolean;
    icon?: string;
    dropdowns?: string;
    buttonRender?: VxeGlobalRendererHandles.RenderButtonOptions;
    [key: string]: any;
  }
  export type Buttons = ButtonConfig[];

  export type Perfect = boolean;
}

export interface VxeToolbarProps {
  size?: VxeToolbarPropTypes.Size;
  /**
   * 唯一 ID 标识
   */
  id?: VxeToolbarPropTypes.Id;
  /**
   * 是否加载中
   */
  loading?: VxeToolbarPropTypes.Loading;
  /**
   * 列宽拖动配置
   */
  resizable?: VxeToolbarPropTypes.Resizable;
  /**
   * 刷新按钮配置
   */
  refresh?: VxeToolbarPropTypes.Refresh;
  /**
   * 导入按钮配置
   */
  import?: VxeToolbarPropTypes.Import;
  /**
   * 导出按钮配置
   */
  export?: VxeToolbarPropTypes.Export;
  print?: VxeToolbarPropTypes.Print;
  zoom?: VxeToolbarPropTypes.Zoom;
  /**
   * 自定义列配置
   */
  custom?: VxeToolbarPropTypes.Custom;
  /**
   * 按钮列表
   */
  buttons?: VxeToolbarPropTypes.ButtonConfig[];
  /**
   * 配套的样式
   */
  perfect?: VxeToolbarPropTypes.Perfect;
}

export interface ToolbarReactData {
  isRefresh: boolean;
  columns: any[];
}

export interface ToolbarMethods {
  dispatchEvent(type: ValueOf<VxeToolbarEmits>, params: any, evnt: Event): void;
  syncUpdate(params: {
    collectColumn: any[];
    $table: VxeTableConstructor & VxeTablePrivateMethods;
  }): void;
}
export interface VxeToolbarMethods extends ToolbarMethods { }

export interface ToolbarPrivateMethods { }
export interface VxeToolbarPrivateMethods extends ToolbarPrivateMethods { }

export type VxeToolbarEmits = [
  'button-click'
]

export namespace VxeToolbarDefines {
  interface ToolbarEventParams extends VxeEvent {
    $toolbar: VxeToolbarConstructor;
  }
}

export interface VxeToolbarListeners { }

export namespace VxeToolbarEvents { }
