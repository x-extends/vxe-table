import { RenderFunction, SetupContext, Ref, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf } from './component'
import { VxeGlobalRendererHandles } from './v-x-e-table'
import { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods } from './table'
import { VxeButtonProps } from './button'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 工具栏
 * @example import { VxeToolbar } from 'vxe-table'
 */
export const VxeToolbar: VXEComponent<VxeToolbarProps, VxeToolbarEventProps, VxeToolbarSlots>
/**
 * 组件 - 工具栏
 */
export const Toolbar: typeof VxeToolbar

export type VxeToolbarInstance = ComponentPublicInstance<VxeToolbarProps, VxeToolbarConstructor>

export interface VxeToolbarConstructor extends VxeComponentBase, VxeToolbarMethods {
  props: VxeToolbarProps
  context: SetupContext<VxeToolbarEmits>
  reactData: ToolbarReactData
  getRefMaps(): ToolbarPrivateRef
  renderVN: RenderFunction
}

export interface ToolbarPrivateRef {
  refElem: Ref<HTMLDivElement>
}
export interface VxeToolbarPrivateRef extends ToolbarPrivateRef { }

export namespace VxeToolbarPropTypes {
  export type Size = SizeType
  export type Id = string
  export type Loading = boolean

  interface ResizableConfig {
    storage?: boolean
  }
  export type Resizable = boolean | ResizableConfig
  export interface ResizableOpts extends ResizableConfig { }

  interface RefreshConfig {
    queryMethod?(params: { [key: string]: any }): any
    code?: 'query' | 'reload' | '' | null
    icon?: string
    iconLoading?: string
    /**
     * @deprecated 请使用 queryMethod
     */
    query?(params: { [key: string]: any }): Promise<any>
  }
  export type Refresh = boolean | RefreshConfig
  export interface RefreshOpts extends RefreshConfig { }

  interface ImportConfig {
    icon?: string
  }
  export type Import = boolean | ImportConfig
  export interface ImportOpts extends ImportConfig { }

  interface ExportConfig {
    icon?: string
  }
  export type Export = boolean | ExportConfig
  export interface ExportOpts extends ExportConfig { }

  export interface PrintConfig {
    icon?: string
  }
  export type Print = boolean | PrintConfig
  export interface PrintOpts extends PrintConfig { }

  interface ZoomConfig {
    iconIn?: string
    iconOut?: string
  }
  export type Zoom = boolean | ZoomConfig
  export interface ZoomOpts extends ZoomConfig { }

  interface CustomConfig {
    icon?: string

    /**
     * 已废弃，请使用 custom-config.trigger
     * @deprecated
     */
    trigger?: string,
    /**
     * 已废弃，请使用 custom-config.immediate
     * @deprecated
     */
    immediate?: boolean
    /**
     * 已废弃，请使用 custom-config.storage
     * @deprecated
     */
    storage?: boolean
    /**
     * 已废弃，请使用 custom-config.checkMethod
     * @deprecated
     */
    checkMethod?(params: { column: VxeTableDefines.ColumnInfo }): boolean
    /**
     * 已废弃，请使用 custom-config.showFooter
     * @deprecated
     */
    showFooter?: boolean
    /**
     * 已废弃，请使用 custom-config.allowFixed
     * @deprecated
     */
    allowFixed?: boolean
    /**
     * 已废弃，请使用 custom-config.resetButtonText
     * @deprecated
     */
    resetButtonText?: string
    /**
     * 已废弃，请使用 custom-config.confirmButtonText
     * @deprecated
     */
    confirmButtonText?: string
    /**
     * 已废弃，请使用 custom-config.showFooter
     * @deprecated
     */
    isFooter?: boolean
  }
  export type Custom = boolean | CustomConfig
  export interface CustomOpts extends CustomConfig { }

  interface ButtonAndToolConfig extends VxeButtonProps {
    code?: string
    visible?: boolean
    params?: any
  }

  export interface ButtonConfig extends ButtonAndToolConfig {
    dropdowns?: ButtonConfig[]
    buttonRender?: VxeGlobalRendererHandles.RenderButtonOptions
  }
  export type Buttons = ButtonConfig[]

  export interface ToolConfig extends ButtonAndToolConfig {
    dropdowns?: ToolConfig[]
    toolRender?: VxeGlobalRendererHandles.RenderToolOptions
  }
  export type Tools = ToolConfig[]

  export type Perfect = boolean

  export type ClassName = string | ((params: {
    $toolbar: VxeToolbarConstructor
  }) => string)
}

export type VxeToolbarProps = {
  size?: VxeToolbarPropTypes.Size
  /**
   * 唯一 ID 标识
   */
  id?: VxeToolbarPropTypes.Id
  /**
   * 是否加载中
   */
  loading?: VxeToolbarPropTypes.Loading
  /**
   * 列宽拖动配置
   */
  resizable?: VxeToolbarPropTypes.Resizable
  /**
   * 刷新按钮配置
   */
  refresh?: VxeToolbarPropTypes.Refresh
  /**
   * 导入按钮配置
   */
  import?: VxeToolbarPropTypes.Import
  /**
   * 导出按钮配置
   */
  export?: VxeToolbarPropTypes.Export
  print?: VxeToolbarPropTypes.Print
  zoom?: VxeToolbarPropTypes.Zoom
  /**
   * 自定义列配置
   */
  custom?: VxeToolbarPropTypes.Custom
  /**
   * 按钮列表
   */
  buttons?: VxeToolbarPropTypes.Buttons
  tools?: VxeToolbarPropTypes.Tools
  /**
   * 配套的样式
   */
  perfect?: VxeToolbarPropTypes.Perfect
  className?: VxeToolbarPropTypes.ClassName
}

export interface ToolbarReactData {
  isRefresh: boolean
  columns: VxeTableDefines.ColumnInfo[]
}

export interface ToolbarMethods {
  dispatchEvent(type: ValueOf<VxeToolbarEmits>, params: any, evnt: Event): void
  syncUpdate(params: {
    collectColumn: VxeTableDefines.ColumnInfo<any>[]
    $table: VxeTableConstructor<any> & VxeTablePrivateMethods<any>
  }): void
}
export interface VxeToolbarMethods extends ToolbarMethods { }

export interface ToolbarPrivateMethods { }
export interface VxeToolbarPrivateMethods extends ToolbarPrivateMethods { }

export type VxeToolbarEmits = [
  'button-click',
  'tool-click'
]

export namespace VxeToolbarDefines {
  export interface ToolbarEventParams extends VxeEvent {
    $toolbar: VxeToolbarConstructor
  }
}

export type VxeToolbarEventProps = {
  [key: string]: any
}

export interface VxeToolbarListeners { }

export namespace VxeToolbarEvents { }

export interface VxeToolbarSlots {
  /**
   * 自定义左侧按钮列表
   */
  buttons: (params: {
    [key: string]: any
  }) => any
  /**
   * 自定义右侧工具列表
   */
  tools: ((params: {
    [key: string]: any
  }) => any) | undefined
}
