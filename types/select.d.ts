import { SetupContext, RenderFunction, ComponentPublicInstance } from 'vue'
import { VXETableComponent, VxeComponentInstance, VxeEvent, SizeType, ValueOf, VNodeStyle } from './component'
import { VxeGlobalRendererHandles } from './v-x-e-table'

/**
 * 组件 - 下拉框
 */
export interface Select extends VXETableComponent { }

export type VxeSelectInstance = ComponentPublicInstance<VxeSelectProps, VxeSelectConstructor>;

export interface VxeSelectConstructor extends VxeComponentInstance, VxeSelectMethods {
  props: VxeSelectProps;
  context: SetupContext<VxeSelectEmits>;
  reactData: SelectReactData;
  renderVN: RenderFunction;
}

export interface SelectReactData {
  inited: boolean;
  staticOptions: any[];
  fullGroupList: any[];
  fullOptionList: any[];
  visibleGroupList: any[];
  visibleOptionList: any[];
  panelIndex: number;
  panelStyle: VNodeStyle;
  panelPlacement: any;
  currentValue: any;
  visiblePanel: boolean;
  animatVisible: boolean;
  isActivated: boolean;
}

export interface VxeSelectOptions extends VxeSelectProps, VxeSelectListeners { }

export interface VxeSelectProps {
  size?: SizeType;
  modelValue: any;
  clearable: boolean;
  placeholder: string;
  disabled: boolean;
  multiple: boolean;
  multiCharOverflow: number | string;
  prefixIcon: string;
  placement: string;
  options: any[];
  optionProps: VxeGlobalRendererHandles.RenderOptionProps;
  optionGroups: any[];
  optionGroupProps: VxeGlobalRendererHandles.RenderOptionGroupProps;
  emptyText: string;
  optionId: string;
  optionKey: boolean;
  transfer: boolean;
}

export interface SelectMethods {
  dispatchEvent(type: ValueOf<VxeSelectEmits>, params: any, evnt?: Event): void;
  /**
   * 获取焦点
   */
  focus(): Promise<any>;
  /**
   * 失去焦点
   */
  blur(): Promise<any>;
}
export interface VxeSelectMethods extends SelectMethods { }

export interface SelectPrivateMethods { }
export interface VxeSelectPrivateMethods extends SelectPrivateMethods { }

export type VxeSelectEmits = [
  'update:modelValue',
  'change',
  'clear'
]

export namespace VxeSelectDefines {
  interface SelectEventParams extends VxeEvent {
    $select: VxeSelectConstructor;
  }

  export interface ChangeParams {
    value: any;
  }
  export interface ChangeEventParams extends SelectEventParams, ChangeParams { }
}

export interface VxeSelectListeners { }

export namespace VxeSelectEvents {
  export type Change = (params: VxeSelectDefines.ChangeEventParams) => void;
}
