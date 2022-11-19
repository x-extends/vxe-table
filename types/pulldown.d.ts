import { RenderFunction, SetupContext, ComponentPublicInstance, Ref } from 'vue'
import { VXEComponent, VxeComponentBase, SizeType, VNodeStyle, VxeEvent, ValueOf } from './component'

export type VxePulldownEmits = [
  'update:modelValue',
  'hide-panel'
]

export namespace VxePulldownPropTypes {
  export type ModelValue = boolean
  export type Size = SizeType
  export type Disabled = boolean
  export type Placement = string
  export type DestroyOnClose = boolean
  export type Transfer = boolean
}

export interface PulldownPrivateRef {
  refElem: Ref<HTMLDivElement>
}
export type VxePulldownPrivateRef = PulldownPrivateRef

export interface PulldownReactData {
  inited: boolean
  panelIndex: number
  panelStyle: VNodeStyle | null
  panelPlacement: string | null
  visiblePanel: boolean
  animatVisible: boolean
  isActivated: boolean
}

export interface PulldownPrivateMethods {}
export type VxePulldownPrivateMethods = PulldownPrivateMethods

export type VxePulldownProps = {
  size?: VxePulldownPropTypes.Size
  modelValue?: VxePulldownPropTypes.ModelValue
  /**
   * 是否禁用
   */
  disabled?: VxePulldownPropTypes.Disabled
  /**
   * 固定显示下拉面板的方向
   */
  placement?: VxePulldownPropTypes.Placement
  /**
   * 在下拉容器关闭时销毁内容
   */
  destroyOnClose?: VxePulldownPropTypes.DestroyOnClose
  /**
   * 是否将弹框容器插入于 body 内（对于嵌入到表格或者弹窗中被遮挡时需要设置为 true）
   */
  transfer?: VxePulldownPropTypes.Transfer
}

export interface PulldownMethods {
  dispatchEvent(type: ValueOf<VxePulldownEmits>, params: any, evnt: Event): void
  /**
   * 判断下拉面板是否可视
   */
  isPanelVisible(): boolean

  /**
   * 切换下拉面板
   */
  togglePanel(): Promise<void>

  /**
   * 显示下拉面板
   */
  showPanel(): Promise<void>

  /**
   * 隐藏下拉面板
   */
  hidePanel(): Promise<void>
}
export type VxePulldownMethods = PulldownMethods

export interface VxePulldownConstructor extends VxeComponentBase, VxePulldownMethods {
  props: VxePulldownProps
  context: SetupContext<VxePulldownEmits>
  reactData: PulldownReactData
  getRefMaps(): PulldownPrivateRef
  renderVN: RenderFunction
}

export type VxePulldownInstance = ComponentPublicInstance<VxePulldownProps, VxePulldownConstructor>

export namespace VxePulldownDefines {
  interface PulldownEventParams extends VxeEvent {
    $pulldown: VxePulldownConstructor
  }

  export interface HidePanelParams { }
  export type HidePanelEventParams = HidePanelParams
}

export namespace VxePulldownEvents {
  export type HidePanel = (params: VxePulldownDefines.HidePanelEventParams) => void
}

export type VxePulldownEventProps = {
  onHidePanel?: VxePulldownEvents.HidePanel
}

export interface VxePulldownListeners {
  hidePanel?: VxePulldownEvents.HidePanel
}

/**
 * 组件 - 下拉容器
 * @example import { Pulldown as VxePulldown } from 'vxe-table'
 */
export const VxePulldown: VXEComponent<VxePulldownProps, VxePulldownEventProps>
/**
  * 组件 - 下拉容器
  */
export const Pulldown: VXEComponent<VxePulldownProps, VxePulldownEventProps>
