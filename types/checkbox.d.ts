import { SetupContext, RenderFunction, ComponentPublicInstance } from 'vue'
import { VXETableComponent, VxeComponentInstance, VxeEvent, SizeType, ValueOf } from './component'

/**
 * 组件 - 复选框
 */
export interface Checkbox extends VXETableComponent { }

export type VxeCheckboxInstance = ComponentPublicInstance<VxeCheckboxProps, VxeCheckboxConstructor>;

export interface VxeCheckboxConstructor extends VxeComponentInstance, VxeCheckboxMethods {
  props: VxeCheckboxProps;
  context: SetupContext<VxeCheckboxEmits>;
  renderVN: RenderFunction;
}

export interface VxeCheckboxOptions extends VxeCheckboxProps, VxeCheckboxListeners { }

export interface VxeCheckboxProps {
  size?: SizeType;
  /**
   * 绑定值
   */
  modelValue?: boolean;
  /**
   * 只对 checkbox-group 有效，值
   */
  label?: any;
  /**
   * 是否不确定状态
   */
  indeterminate?: boolean;
  /**
   * 原生 title 属性
   */
  title?: string | number;
  /**
   * 内容
   */
  content?: string | number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
}

export interface CheckboxMethods {
  dispatchEvent(type: ValueOf<VxeCheckboxEmits>, params: any, evnt: Event): void;
}
export interface VxeCheckboxMethods extends CheckboxMethods { }

export interface CheckboxPrivateMethods { }
export interface VxeCheckboxPrivateMethods extends CheckboxPrivateMethods { }

export type VxeCheckboxEmits = [
  'update:modelValue',
  'change'
]

export namespace VxeCheckboxDefines {
  interface CheckboxEventParams extends VxeEvent {
    $checkbox: VxeCheckboxConstructor;
  }

  export interface ChangeParams {
    checked: boolean;
    label: any;
  }
  export interface ChangeEventParams extends CheckboxEventParams, ChangeParams { }
}

export interface VxeCheckboxListeners {
  onChange?: VxeCheckboxEvents.Change;
}

export namespace VxeCheckboxEvents {
  export type Change = (params: VxeCheckboxDefines.ChangeEventParams) => void;
}
