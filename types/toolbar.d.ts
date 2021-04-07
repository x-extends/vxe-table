import { VNode, RenderFunction, SetupContext, Ref, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf } from './component'
import { VxeGlobalRendererHandles } from './v-x-e-table'
import { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods } from './table'
import { VxeButtonProps } from './button'

/**
 * 组件 - 工具栏
 * @example import { Toolbar as VxeToolbar } from 'vxe-table'
 */
export const Toolbar: VXEComponent<VxeToolbarProps, VxeToolbarEventProps>;

export type VxeToolbarInstance = ComponentPublicInstance<VxeToolbarProps, VxeToolbarConstructor>;

export interface VxeToolbarConstructor extends VxeComponentBase, VxeToolbarMethods {
  props: VxeToolbarProps;
  context: SetupContext<VxeToolbarEmits>;
  reactData: ToolbarReactData;
  getRefMaps(): ToolbarPrivateRef;
  renderVN: RenderFunction;
}

export interface ToolbarPrivateRef {
  refElem: Ref<HTMLDivElement>;
}
export interface VxeToolbarPrivateRef extends ToolbarPrivateRef { }

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
    query?(params: {}): Promise<any>;
    icon?: string;
    iconLoading?: string;
  }
  export type Refresh = boolean | RefreshConfig;
  export interface RefreshOpts extends RefreshConfig { }

  interface ImportConfig {
    icon?: string;
  }
  export type Import = boolean | ImportConfig;
  export interface ImportOpts extends ImportConfig { }

  interface ExportConfig {
    icon?: string;
  }
  export type Export = boolean | ExportConfig;
  export interface ExportOpts extends ExportConfig { }

  export interface PrintConfig {
    icon?: string;
  }
  export type Print = boolean | PrintConfig;
  export interface PrintOpts extends PrintConfig { }

  interface ZoomConfig {
    iconIn?: string;
    iconOut?: string;
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
  }
  export type Custom = boolean | CustomConfig;
  export interface CustomOpts extends CustomConfig { }

  interface ButtonAndToolConfig extends VxeButtonProps {
    code?: string;
    visible?: boolean;
    params?: any;
  }

  export interface ButtonConfig extends ButtonAndToolConfig {
    dropdowns?: ButtonConfig[];
    buttonRender?: VxeGlobalRendererHandles.RenderButtonOptions;
  }
  export type Buttons = ButtonConfig[];

  export interface ToolConfig extends ButtonAndToolConfig {
    dropdowns?: ToolConfig[];
    toolRender?: VxeGlobalRendererHandles.RenderToolOptions;
  }
  export type Tools = ToolConfig[];

  export type Perfect = boolean;

  export type ClassName = string | ((params: {
    $toolbar: VxeToolbarConstructor;
  }) => string);
}

export type VxeToolbarProps = {
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
  buttons?: VxeToolbarPropTypes.Buttons;
  tools?: VxeToolbarPropTypes.Tools;
  /**
   * 配套的样式
   */
  perfect?: VxeToolbarPropTypes.Perfect;
  className?: VxeToolbarPropTypes.ClassName;
}

export interface ToolbarReactData {
  isRefresh: boolean;
  columns: VxeTableDefines.ColumnInfo[];
}

export interface ToolbarMethods {
  dispatchEvent(type: ValueOf<VxeToolbarEmits>, params: any, evnt: Event): void;
  syncUpdate(params: {
    collectColumn: VxeTableDefines.ColumnInfo[];
    $table: VxeTableConstructor & VxeTablePrivateMethods;
  }): void;
}
export interface VxeToolbarMethods extends ToolbarMethods { }

export interface ToolbarPrivateMethods { }
export interface VxeToolbarPrivateMethods extends ToolbarPrivateMethods { }

export type VxeToolbarEmits = [
  'button-click',
  'tool-click'
]

export namespace VxeToolbarDefines {
  interface ToolbarEventParams extends VxeEvent {
    $toolbar: VxeToolbarConstructor;
  }
}

export type VxeToolbarEventProps = {}

export interface VxeToolbarListeners { }

export namespace VxeToolbarEvents { }
