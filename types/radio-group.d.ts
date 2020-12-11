import { SetupContext, RenderFunction, ComponentPublicInstance } from 'vue'
import { VXETableComponent, VxeComponentInstance, SizeType, VxeEvent, ValueOf } from './component'

/**
 * 组件 - 单选框组
 */
export interface RadioGroup extends VXETableComponent { }

export type VxeRadioGroupInstance = ComponentPublicInstance<VxeRadioGroupProps, VxeRadioGroupConstructor>;

export interface VxeRadioGroupConstructor extends VxeComponentInstance, VxeRadioGroupMethods {
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

export interface VxeRadioGroupProps {
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

export interface VxeRadioGroupListeners {
  onChange?: VxeRadioGroupEvents.Change;
  change?: VxeRadioGroupEvents.Change;
}

export namespace VxeRadioGroupEvents {
  export type Change = (params: VxeRadioGroupDefines.ChangeEventParams) => void;
}
