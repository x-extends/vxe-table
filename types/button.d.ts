import { SetupContext, RenderFunction, Ref, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf, VNodeStyle } from './component'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 按钮
 * @example import { VxeButton } from 'vxe-table'
 */
export const VxeButton: VXEComponent<VxeButtonProps, VxeButtonEventProps, VxeButtonSlots>
/**
 * 组件 - 按钮
 */
export const Button: typeof VxeButton

export type VxeButtonInstance = ComponentPublicInstance<VxeButtonProps, VxeButtonConstructor>

export interface VxeButtonConstructor extends VxeComponentBase, VxeButtonMethods {
  props: VxeButtonProps
  context: SetupContext<VxeButtonEmits>
  reactData: ButtonReactData
  internalData: ButtonInternalData
  getRefMaps(): ButtonPrivateRef
  renderVN: RenderFunction
}

export interface ButtonPrivateRef {
  refElem: Ref<HTMLDivElement>
}
export interface VxeButtonPrivateRef extends ButtonPrivateRef { }

export interface ButtonReactData {
  inited: boolean
  showPanel: boolean
  animatVisible: boolean
  panelIndex: number
  panelStyle: VNodeStyle
  panelPlacement: any
}

export interface ButtonInternalData {
  showTime: any
}

export namespace VxeButtonPropTypes {
  export type Size = SizeType
  export type Type = string
  export type Mode = null | '' | 'button' | 'text'
  export type ClassName = string | ((params: { $button: VxeButtonConstructor }) => string)
  export type PopupClassName = string | ((params: { $button: VxeButtonConstructor }) => string)
  export type Name = string | number
  export type Content = string | number
  export type Placement = string
  export type Status = string
  export type Title = string
  export type Icon = string
  export type Round = boolean
  export type Circle = boolean
  export type Disabled = boolean
  export type Loading = boolean
  export type DestroyOnClose = boolean
  export type Transfer = boolean
}

export type VxeButtonProps = {
  size?: VxeButtonPropTypes.Size
  /**
   * 按钮类型
   */
  type?: VxeButtonPropTypes.Type
  /**
   * 按钮的模式
   */
  mode?: VxeButtonPropTypes.Mode
  className?: VxeButtonPropTypes.ClassName
  popupClassName?: VxeButtonPropTypes.PopupClassName
  /**
   * 用来标识这一项
   */
  name?: VxeButtonPropTypes.Name
  title?: VxeButtonPropTypes.Title
  /**
   * 按钮内容
   */
  content?: VxeButtonPropTypes.Content
  /**
   * 固定显示下拉面板的方向
   */
  placement?: VxeButtonPropTypes.Placement
  /**
   * 按钮状态
   */
  status?: VxeButtonPropTypes.Status
  /**
   * 按钮的图标
   */
  icon?: VxeButtonPropTypes.Icon
  /**
   * 圆角边框
   */
  round?: VxeButtonPropTypes.Round
  /**
   * 圆角按钮
   */
  circle?: VxeButtonPropTypes.Circle
  /**
   * 是否禁用
   */
  disabled?: VxeButtonPropTypes.Disabled
  /**
   * 是否加载中
   */
  loading?: VxeButtonPropTypes.Loading
  /**
   * 在下拉面板关闭时销毁内容
   */
  destroyOnClose?: VxeButtonPropTypes.DestroyOnClose
  /**
   * 是否将弹框容器插入于 body 内
   */
  transfer?: VxeButtonPropTypes.Transfer
}

export interface ButtonMethods {
  dispatchEvent(type: ValueOf<VxeButtonEmits>, params: any, evnt: Event): void
  /**
   * 获取焦点
   */
  focus(): Promise<any>
  /**
   * 失去焦点
   */
  blur(): Promise<any>
}
export interface VxeButtonMethods extends ButtonMethods { }

export interface ButtonPrivateMethods { }
export interface VxeButtonPrivateMethods extends ButtonPrivateMethods { }

export type VxeButtonEmits = [
  'click',
  'mouseenter',
  'mouseleave',
  'dropdown-click'
]

export namespace VxeButtonDefines {
  interface ButtonEventParams extends VxeEvent {
    $button: VxeButtonConstructor
  }

  export interface ClickParams { }
  export interface ClickEventParams extends ButtonEventParams, ClickParams { }

  export interface MouseenterParams { }
  export interface MouseenterEventParams extends ButtonEventParams, MouseenterParams { }

  export interface MouseleaveParams { }
  export interface MouseleaveEventParams extends ButtonEventParams, MouseleaveParams { }

  export interface DropdownClickParams { }
  export interface DropdownClickEventParams extends ButtonEventParams, DropdownClickParams { }
}

export type VxeButtonEventProps = {
  onClick?: VxeButtonEvents.Click
  onMouseenter?: VxeButtonEvents.Mouseenter
  onMouseleave?: VxeButtonEvents.Mouseleave
  onDropdownClick?: VxeButtonEvents.DropdownClick
}

export interface VxeButtonListeners {
  click?: VxeButtonEvents.Click
  mouseenter?: VxeButtonEvents.Mouseenter
  mouseleave?: VxeButtonEvents.Mouseleave
  dropdownClick?: VxeButtonEvents.DropdownClick
}

export namespace VxeButtonEvents {
  export type Click = (params: VxeButtonDefines.ClickEventParams) => void
  export type Mouseenter = (params: VxeButtonDefines.MouseenterEventParams) => void
  export type Mouseleave = (params: VxeButtonDefines.MouseleaveEventParams) => void
  export type DropdownClick = (params: VxeButtonDefines.DropdownClickParams) => void
}

export interface VxeButtonSlots {
  /**
   * 自定义按钮内容
   */
  default: (params: {
    [key: string]: any
  }) => any
  /**
   * 自定义自定义图标
   */
  icon: (params: {
    [key: string]: any
  }) => any
  /**
   * 自定义下拉按钮
   */
  dropdowns: (params: {
    [key: string]: any
  }) => any
}
