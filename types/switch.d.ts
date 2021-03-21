import { SetupContext, RenderFunction, ComponentPublicInstance, DefineComponent } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf } from './component'

/**
 * 组件 - 开关
 * @example import { Switch as VxeSwitch } from 'vxe-table'
 */
export const Switch: VXEComponent<VxeSwitchProps, VxeSwitchEventProps>;

export type VxeSwitchInstance = ComponentPublicInstance<VxeSwitchProps, VxeSwitchConstructor>;

export interface VxeSwitchConstructor extends VxeComponentBase, VxeSwitchMethods {
  props: VxeSwitchProps;
  context: SetupContext<VxeSwitchEmits>;
  reactData: SwitchReactData;
  renderVN: RenderFunction;
}

export interface SwitchReactData {
  isActivated: boolean;
  hasAnimat: boolean;
  offsetLeft: number;
}

export type VxeSwitchProps = {
  size?: SizeType;
  modelValue?: string | number | boolean;
  disabled?: boolean;
  openLabel?: string;
  closeLabel?: string;
  openValue?: string | number | boolean;
  closeValue?: string | number | boolean;
  openIcon?: string;
  closeIcon?: string;
}

export interface SwitchMethods {
  dispatchEvent(type: ValueOf<VxeSwitchEmits>, params: any, evnt: Event): void;
  /**
   * 获取焦点
   */
  focus(): Promise<any>;
  /**
   * 失去焦点
   */
  blur(): Promise<any>;
}
export interface VxeSwitchMethods extends SwitchMethods { }

export interface SwitchPrivateMethods { }
export interface VxeSwitchPrivateMethods extends SwitchPrivateMethods { }

export type VxeSwitchEmits = [
  'update:modelValue',
  'change',
  'focus',
  'blur'
]

export namespace VxeSwitchDefines {
  interface SwitchEventParams extends VxeEvent {
    $switch: VxeSwitchConstructor;
  }
}

export type VxeSwitchEventProps = {}

export interface VxeSwitchListeners { }

export namespace VxeSwitchEvents { }
