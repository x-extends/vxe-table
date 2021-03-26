import { SetupContext, RenderFunction, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf } from './component'

/**
 * 组件 - 复选框
 * @example import { Checkbox as VxeCheckbox } from 'vxe-table'
 */
export const Checkbox: VXEComponent<VxeCheckboxProps, VxeCheckboxEventProps>;

export type VxeCheckboxInstance = ComponentPublicInstance<VxeCheckboxProps, VxeCheckboxConstructor>;

export interface VxeCheckboxConstructor extends VxeComponentBase, VxeCheckboxMethods {
  props: VxeCheckboxProps;
  context: SetupContext<VxeCheckboxEmits>;
  renderVN: RenderFunction;
}

export type VxeCheckboxProps = {
  size?: VxeCheckboxPropTypes.Size;
  /**
   * 绑定值
   */
  modelValue?: VxeCheckboxPropTypes.ModelValue;
  /**
   * 只对 checkbox-group 有效，值
   */
  label?: VxeCheckboxPropTypes.Label;
  /**
   * 是否不确定状态
   */
  indeterminate?: VxeCheckboxPropTypes.Indeterminate;
  /**
   * 原生 title 属性
   */
  title?: VxeCheckboxPropTypes.Title;
  /**
   * 内容
   */
  content?: VxeCheckboxPropTypes.Content;
  /**
   * 是否禁用
   */
  disabled?: VxeCheckboxPropTypes.Disabled;
}

export namespace VxeCheckboxPropTypes {
  export type Size = SizeType;
  export type ModelValue = boolean;
  export type Label = string | number;
  export type Indeterminate = boolean;
  export type Title = string | number;
  export type Content = string | number;
  export type Disabled = boolean;
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

export type VxeCheckboxEventProps = {
  onChange?: VxeCheckboxEvents.Change;
}

export interface VxeCheckboxListeners {
  change?: VxeCheckboxEvents.Change;
}

export namespace VxeCheckboxEvents {
  export type Change = (params: VxeCheckboxDefines.ChangeEventParams) => void;
}
