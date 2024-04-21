import { SetupContext, RenderFunction, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase, SizeType, VxeEvent, ValueOf } from './component'
import { VxeGlobalRendererHandles } from './v-x-e-table'
import { VxeRadioPropTypes } from './radio'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 单选框组
 * @example import { VxeRadioGroup } from 'vxe-table'
 */
export const VxeRadioGroup: VXEComponent<VxeRadioGroupProps, VxeRadioGroupEventProps, VxeRadioGroupSlots>
/**
 * 组件 - 单选框组
 */
export const RadioGroup: typeof VxeRadioGroup

export type VxeRadioGroupInstance = ComponentPublicInstance<VxeRadioGroupProps, VxeRadioGroupConstructor>

export interface VxeRadioGroupConstructor extends VxeComponentBase, VxeRadioGroupMethods {
  name: string
  props: VxeRadioGroupProps
  context: SetupContext<VxeRadioGroupEmits>
  renderVN: RenderFunction
}

export type VxeRadioGroupEmits = [
  'update:modelValue',
  'change'
]

export type VxeRadioGroupProps = {
  size?: VxeRadioGroupPropTypes.Size
  type?: VxeRadioGroupPropTypes.Type
  options?: VxeRadioGroupPropTypes.Options
  optionProps?: VxeRadioGroupPropTypes.OptionProps
  /**
   * 严格模式，不允许取消
   */
  strict?: VxeRadioGroupPropTypes.Strict
  modelValue?: VxeRadioGroupPropTypes.ModelValue
  disabled?: VxeRadioGroupPropTypes.Disabled
}

export namespace VxeRadioGroupPropTypes {
  export type Size = SizeType
  export type Type = 'button' | 'default' | '' | null
  export type Options = {
    value?: VxeRadioPropTypes.Label
    label?: VxeRadioPropTypes.Content

    [key: string]: any
  }[]
  export type OptionProps = VxeGlobalRendererHandles.RenderOptionProps
  export type ModelValue = any
  export type Strict = boolean
  export type Disabled = boolean
}

export interface RadioGroupMethods {
  dispatchEvent(type: ValueOf<VxeRadioGroupEmits>, params: any, evnt?: Event): void
}
export interface VxeRadioGroupMethods extends RadioGroupMethods { }

export interface RadioGroupPrivateMethods {
  handleChecked(params: { label: any }, evnt: Event): void
}
export interface VxeRadioGroupPrivateMethods extends RadioGroupPrivateMethods { }

export namespace VxeRadioGroupDefines {
  interface RadioGroupEventParams extends VxeEvent {
    $radioGroup: VxeRadioGroupConstructor
  }

  export interface ChangeParams {
    label: any
  }
  export interface ChangeEventParams extends RadioGroupEventParams, ChangeParams { }
}

export type VxeRadioGroupEventProps = {
  onChange?: VxeRadioGroupEvents.Change
}

export interface VxeRadioGroupListeners {
  change?: VxeRadioGroupEvents.Change
}

export namespace VxeRadioGroupEvents {
  export type Change = (params: VxeRadioGroupDefines.ChangeEventParams) => void
}

export interface VxeRadioGroupSlots {
  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    [key: string]: any
  }) => any) | undefined
}
