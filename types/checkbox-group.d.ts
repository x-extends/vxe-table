import { SetupContext, RenderFunction, ComponentPublicInstance, ComputedRef } from 'vue'
import { VXEComponent, VxeComponentBase, SizeType, VxeEvent, ValueOf } from './component'
import { VxeCheckboxPropTypes } from './checkbox'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 复选框组
 * @example import { VxeCheckboxGroup } from 'vxe-table'
 */
export const VxeCheckboxGroup: VXEComponent<VxeCheckboxGroupProps, VxeCheckboxGroupEventProps>
/**
 * 组件 - 复选框组
 */
export const CheckboxGroup: VXEComponent<VxeCheckboxGroupProps, VxeCheckboxGroupEventProps>

export type VxeCheckboxGroupInstance = ComponentPublicInstance<VxeCheckboxGroupProps, VxeCheckboxGroupConstructor>

export interface VxeCheckboxGroupConstructor extends VxeComponentBase, VxeCheckboxGroupMethods {
  props: VxeCheckboxGroupProps
  context: SetupContext<VxeCheckboxGroupEmits>
  getComputeMaps(): CheckboxPrivateComputed
  renderVN: RenderFunction
}

export type VxeCheckboxGroupProps = {
  size?: VxeCheckboxGroupPropTypes.Size
  /**
   * 绑定值
   */
  modelValue?: VxeCheckboxGroupPropTypes.ModelValue
  max?: VxeCheckboxGroupPropTypes.Max
  /**
   * 是否禁用
   */
  disabled?: VxeCheckboxGroupPropTypes.Disabled
}

export namespace VxeCheckboxGroupPropTypes {
  export type Size = SizeType
  export type ModelValue = any[]
  export type Max = string | number
  export type Disabled = boolean
}

export interface CheckboxPrivateComputed {
  computeIsMaximize: ComputedRef<boolean>
}

export interface CheckboxGroupMethods {
  dispatchEvent(type: ValueOf<VxeCheckboxGroupEmits>, params: any, evnt: Event): void
}
export interface VxeCheckboxGroupMethods extends CheckboxGroupMethods { }

export interface CheckboxGroupPrivateMethods {
  handleChecked(params: {
    checked: boolean
    value: VxeCheckboxPropTypes.ModelValue
    label: VxeCheckboxPropTypes.Label
  }, evnt: Event): void
}
export interface VxeCheckboxGroupPrivateMethods extends CheckboxGroupPrivateMethods { }

export type VxeCheckboxGroupEmits = [
  'update:modelValue',
  'change'
]

export namespace VxeCheckboxGroupDefines {
  interface CheckboxGroupEventParams extends VxeEvent {
    $checkboxGroup: VxeCheckboxGroupConstructor
  }

  export type ChangeParams = {
    checklist: any[]
  }
  export interface ChangeEventParams extends CheckboxGroupEventParams, ChangeParams { }
}

export type VxeCheckboxGroupEventProps = {
  onChange?: VxeCheckboxGroupEvents.Change
}

export interface VxeCheckboxGroupListeners {
  change?: VxeCheckboxGroupEvents.Change
}

export namespace VxeCheckboxGroupEvents {
  export type Change = (params: VxeCheckboxGroupDefines.ChangeEventParams) => void
}
