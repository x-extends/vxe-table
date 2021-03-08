import { SetupContext, RenderFunction, ComponentPublicInstance, DefineComponent } from 'vue'
import { SizeType, VXEComponentInstall, VxeComponentInstance, VxeEvent, ValueOf } from './component'

/**
 * 组件 - 单选框按钮
 */
export const RadioButton: VXEComponentInstall<DefineComponent>;

export type VxeRadioButtonInstance = ComponentPublicInstance<VxeRadioButtonProps, VxeRadioButtonConstructor>;

export interface VxeRadioButtonConstructor extends VxeComponentInstance, VxeRadioButtonMethods {
  props: VxeRadioButtonProps;
  context: SetupContext<VxeRadioButtonEmits>;
  renderVN: RenderFunction;
}

export interface RadioButtonOptions extends VxeRadioButtonProps, VxeRadioButtonListeners { }

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

export interface VxeRadioButtonProps {
  size?: SizeType;
  modelValue: any;
  label: any;
  title: string | number;
  content: string | number;
  disabled: boolean;
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

export interface VxeRadioButtonListeners {
  onChange?: VxeRadioButtonEvents.Change;
  change?: VxeRadioButtonEvents.Change;
}

export namespace VxeRadioButtonEvents {
  export type Change = (params: VxeRadioButtonDefines.ChangeEventParams) => void;
}
