import { SetupContext, RenderFunction, ComponentPublicInstance, DefineComponent } from 'vue'
import { VXEComponent, VxeComponentBase, SizeType, VxeEvent, ValueOf } from './component'

/**
 * 组件 - 单选框组
 */
export const RadioGroup: VXEComponent<VxeRadioGroupProps & VxeRadioGroupEventProps>;

export type VxeRadioGroupInstance = ComponentPublicInstance<VxeRadioGroupProps, VxeRadioGroupConstructor>;

export interface VxeRadioGroupConstructor extends VxeComponentBase, VxeRadioGroupMethods {
  name: string;
  props: VxeRadioGroupProps;
  context: SetupContext<VxeRadioGroupEmits>;
  renderVN: RenderFunction;
}

export type VxeRadioGroupEmits = [
  'update:modelValue',
  'change'
]

export interface VxeRadioGroupOptions extends VxeRadioGroupProps, VxeRadioGroupListeners { }

export type VxeRadioGroupProps = {
  size?: SizeType;
  modelValue?: any;
  disabled?: boolean;
}

export interface RadioGroupMethods {
  dispatchEvent(type: ValueOf<VxeRadioGroupEmits>, params: any, evnt?: Event): void;
}
export interface VxeRadioGroupMethods extends RadioGroupMethods { }

export interface RadioGroupPrivateMethods {
  handleChecked(params: { label: any }, evnt: Event): void;
}
export interface VxeRadioGroupPrivateMethods extends RadioGroupPrivateMethods { }

export namespace VxeRadioGroupDefines {
  interface RadioGroupEventParams extends VxeEvent {
    $radioGroup: VxeRadioGroupConstructor
  }

  export interface ChangeParams {
    label: any;
  }
  export interface ChangeEventParams extends RadioGroupEventParams, ChangeParams { }
}

export type VxeRadioGroupEventProps = {
  onChange?: VxeRadioGroupEvents.Change;
}

export interface VxeRadioGroupListeners {
  change?: VxeRadioGroupEvents.Change;
}

export namespace VxeRadioGroupEvents {
  export type Change = (params: VxeRadioGroupDefines.ChangeEventParams) => void;
}
