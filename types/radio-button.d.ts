import { SetupContext, RenderFunction, ComponentPublicInstance } from 'vue'
import { SizeType, VXEComponent, VxeComponentBase, VxeEvent, ValueOf } from './component'
import { VxeRadioPropTypes } from './radio'

/**
 * 组件 - 单选框按钮
 * @example import { RadioButton as VxeRadioButton } from 'vxe-table'
 */
export const RadioButton: VXEComponent<VxeRadioButtonProps, VxeRadioButtonEventProps>;

export type VxeRadioButtonInstance = ComponentPublicInstance<VxeRadioButtonProps, VxeRadioButtonConstructor>;

export interface VxeRadioButtonConstructor extends VxeComponentBase, VxeRadioButtonMethods {
  props: VxeRadioButtonProps;
  context: SetupContext<VxeRadioButtonEmits>;
  renderVN: RenderFunction;
}

export interface RadioButtonMethods {
  dispatchEvent(type: ValueOf<VxeRadioButtonEmits>, params: any, evnt: Event): void;
}
export interface VxeRadioButtonMethods extends RadioButtonMethods { }

export interface RadioButtonPrivateMethods { }
export interface VxeRadioButtonPrivateMethods extends RadioButtonPrivateMethods { }

export type VxeRadioButtonEmits = [
  'update:modelValue',
  'change'
]

export type VxeRadioButtonProps = {
  size?: VxeRadioButtonPropTypes.Size;
  modelValue?: VxeRadioButtonPropTypes.ModelValue;
  label?: VxeRadioButtonPropTypes.Label;
  title?: VxeRadioButtonPropTypes.Title;
  content?: VxeRadioButtonPropTypes.Content;
  disabled?: VxeRadioButtonPropTypes.Disabled;
}

export namespace VxeRadioButtonPropTypes {
  export type Size = VxeRadioPropTypes.Size;
  export type ModelValue = any;
  export type Label = VxeRadioPropTypes.Label;
  export type Title = string | number;
  export type Content = string | number;
  export type Disabled = boolean;
}

export namespace VxeRadioButtonDefines {
  interface RadioButtonEventParams extends VxeEvent {
    $radioButton: VxeRadioButtonConstructor;
  }

  export interface ChangeParams {
    label: any;
  }
  export interface ChangeEventParams extends RadioButtonEventParams, ChangeParams { }
}

export type VxeRadioButtonEventProps = {
  onChange?: VxeRadioButtonEvents.Change;
}

export interface VxeRadioButtonListeners {
  change?: VxeRadioButtonEvents.Change;
}

export namespace VxeRadioButtonEvents {
  export type Change = (params: VxeRadioButtonDefines.ChangeEventParams) => void;
}
