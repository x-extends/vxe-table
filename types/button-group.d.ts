import { SetupContext, RenderFunction, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase, SizeType, VxeEvent, ValueOf } from './component'
import { VxeButtonPropTypes, VxeButtonProps } from './button'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 按钮组
 * @example import { VxeButtonGroup } from 'vxe-table'
 */
export const VxeButtonGroup: VXEComponent<VxeButtonGroupProps, VxeButtonGroupEventProps, VxeButtonGroupSlots>
/**
 * 组件 - 按钮组
 */
export const ButtonGroup: typeof VxeButtonGroup

export type VxeButtonGroupInstance = ComponentPublicInstance<VxeButtonGroupProps, VxeButtonGroupConstructor>

export interface VxeButtonGroupConstructor extends VxeComponentBase, VxeButtonGroupMethods {
  props: VxeButtonGroupProps
  context: SetupContext<VxeButtonGroupEmits>
  getComputeMaps(): ButtonPrivateComputed
  renderVN: RenderFunction
}

export type VxeButtonGroupProps = {
  size?: VxeButtonGroupPropTypes.Size
  options?: VxeButtonGroupPropTypes.Options
  mode?: VxeButtonGroupPropTypes.Mode
  status?: VxeButtonGroupPropTypes.Status
  round?: VxeButtonGroupPropTypes.Round
  circle?: VxeButtonGroupPropTypes.Circle
  /**
   * 是否禁用
   */
  disabled?: VxeButtonGroupPropTypes.Disabled
  className?: VxeButtonGroupPropTypes.ClassName
}

export namespace VxeButtonGroupPropTypes {
  export type Size = SizeType
  export type Options = VxeButtonProps[]
  export type Round = boolean
  export type Circle = boolean
  export type Disabled = boolean
  export type Mode = VxeButtonPropTypes.Mode
  export type Status = VxeButtonPropTypes.Status
  export type ClassName = string | ((params: { $buttonGroup: VxeButtonGroupConstructor }) => string)
}

export interface ButtonPrivateComputed {
}

export interface ButtonGroupMethods {
  dispatchEvent(type: ValueOf<VxeButtonGroupEmits>, params: any, evnt: Event): void
}
export interface VxeButtonGroupMethods extends ButtonGroupMethods { }

export interface ButtonGroupPrivateMethods {
  handleClick(params: {
    name: VxeButtonPropTypes.Name
  }, evnt: Event): void
}
export interface VxeButtonGroupPrivateMethods extends ButtonGroupPrivateMethods { }

export type VxeButtonGroupEmits = [
  'click'
]

export namespace VxeButtonGroupDefines {
  interface ButtonGroupEventParams extends VxeEvent {
    $buttonGroup: VxeButtonGroupConstructor
  }

  export interface ClickEventParams extends ButtonGroupEventParams { }
}

export type VxeButtonGroupEventProps = {
  onClick?: VxeButtonGroupEvents.Click
}

export interface VxeButtonGroupListeners {
  click?: VxeButtonGroupEvents.Click
}

export namespace VxeButtonGroupEvents {
  export type Click = (params: VxeButtonGroupDefines.ClickEventParams) => void
}

export interface VxeButtonGroupSlots {
  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    [key: string]: any
  }) => any) | undefined
}
