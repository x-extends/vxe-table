import { SetupContext, RenderFunction, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase, SizeType, VxeEvent, ValueOf } from './component'
import { VxeCheckboxEvents } from './checkbox'

/**
 * 组件 - 复选框组
 * @example import { CheckboxGroup as VxeCheckboxGroup } from 'vxe-table'
 */
export const CheckboxGroup: VXEComponent<VxeCheckboxGroupProps, VxeCheckboxGroupEventProps>;

export type VxeCheckboxGroupInstance = ComponentPublicInstance<VxeCheckboxGroupProps, VxeCheckboxGroupConstructor>;

export interface VxeCheckboxGroupConstructor extends VxeComponentBase, VxeCheckboxGroupMethods {
  props: VxeCheckboxGroupProps;
  context: SetupContext<VxeCheckboxGroupEmits>;
  renderVN: RenderFunction;
}

export type VxeCheckboxGroupProps = {
  size?: VxeCheckboxGroupPropTypes.Size;
  /**
   * 绑定值
   */
  modelValue?: VxeCheckboxGroupPropTypes.ModelValue;
  /**
   * 是否禁用
   */
  disabled?: VxeCheckboxGroupPropTypes.Disabled;
}

export namespace VxeCheckboxGroupPropTypes {
  export type Size = SizeType;
  export type ModelValue = any[];
  export type Disabled = boolean;
}

export interface CheckboxGroupMethods {
  dispatchEvent(type: ValueOf<VxeCheckboxGroupEmits>, params: any, evnt: Event): void;
}
export interface VxeCheckboxGroupMethods extends CheckboxGroupMethods { }

export interface CheckboxGroupPrivateMethods {
  handleChecked(params: { checked: boolean, label: any }, evnt: Event): void;
}
export interface VxeCheckboxGroupPrivateMethods extends CheckboxGroupPrivateMethods { }

export type VxeCheckboxGroupEmits = [
  'update:modelValue',
  'change'
]

export namespace VxeCheckboxGroupDefines {
  interface CheckboxGroupEventParams extends VxeEvent {
    $checkboxGroup: VxeCheckboxGroupConstructor;
  }

  export type ChangeParams = {
    checklist: any[];
  }
  export interface ChangeEventParams extends CheckboxGroupEventParams, ChangeParams { }
}

export type VxeCheckboxGroupEventProps = {
  onChange?: VxeCheckboxGroupEvents.Change;
}

export interface VxeCheckboxGroupListeners {
  change?: VxeCheckboxGroupEvents.Change;
}

export namespace VxeCheckboxGroupEvents {
  export type Change = (params: VxeCheckboxGroupDefines.ChangeEventParams) => void;
}
