import { SetupContext, RenderFunction, ComponentPublicInstance, DefineComponent } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf } from './component'

/**
 * 组件 - 单选框
 * @example import { Radio as VxeRadio } from 'vxe-table'
 */
export const Radio: VXEComponent<VxeRadioProps, VxeRadioEventProps>;

export type VxeRadioInstance = ComponentPublicInstance<VxeRadioProps, VxeRadioConstructor>;

export interface VxeRadioConstructor extends VxeComponentBase, VxeRadioMethods {
  props: VxeRadioProps;
  context: SetupContext<VxeRadioEmits>;
  renderVN: RenderFunction;
}

export type VxeRadioProps = {
  size?: SizeType;
  /**
   * 绑定值
   */
  modelValue?: any;
  /**
   * 值
   */
  label?: any;
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
  /**
   * 原生 title 属性
   */
  name?: string;
}

export interface RadioMethods {
  dispatchEvent(type: ValueOf<VxeRadioEmits>, params: any, evnt: Event): void;
}
export interface VxeRadioMethods extends RadioMethods { }

export interface RadioPrivateMethods { }
export interface VxeRadioPrivateMethods extends RadioPrivateMethods { }

export type VxeRadioEmits = [
  'update:modelValue',
  'change'
]

export namespace VxeRadioDefines {
  interface RadioEventParams extends VxeEvent {
    $radio: VxeRadioConstructor;
  }

  export interface ChangeParams {
    label: any;
  }
  export interface ChangeEventParams extends RadioEventParams, ChangeParams { }
}

export type VxeRadioEventProps = {
  onChange?: VxeRadioEvents.Change;
}

export interface VxeRadioListeners {
  change?: VxeRadioEvents.Change;
}

export namespace VxeRadioEvents {
  export type Change = (params: VxeRadioDefines.ChangeEventParams) => void;
}
