import { SetupContext, RenderFunction, ComponentPublicInstance, Ref } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf, VNodeStyle } from './component'
import { VxeGlobalRendererHandles } from './v-x-e-table'
import { VxeOptgroupProps } from './optgroup'
import { VxeOptionProps, VxeOptionPropTypes } from './option'

/**
 * 组件 - 下拉框
 * @example import { Select as VxeSelect } from 'vxe-table'
 */
export const Select: VXEComponent<VxeSelectProps, VxeSelectEventProps>;

export type VxeSelectInstance = ComponentPublicInstance<VxeSelectProps, VxeSelectConstructor>;

export interface VxeSelectConstructor extends VxeComponentBase, VxeSelectMethods {
  props: VxeSelectProps;
  context: SetupContext<VxeSelectEmits>;
  reactData: SelectReactData;
  getRefMaps(): SelectPrivateRef;
  renderVN: RenderFunction;
}

export interface SelectPrivateRef {
  refElem: Ref<HTMLDivElement>;
}
export interface VxeSelectPrivateRef extends SelectPrivateRef { }

export interface SelectReactData {
  inited: boolean;
  staticOptions: VxeSelectDefines.OptionInfo[];
  fullGroupList: VxeOptgroupProps[];
  fullOptionList: VxeOptionProps[];
  visibleGroupList: VxeOptgroupProps[];
  visibleOptionList: VxeOptionProps[];
  panelIndex: number;
  panelStyle: VNodeStyle;
  panelPlacement: any;
  currentValue: any;
  visiblePanel: boolean;
  animatVisible: boolean;
  isActivated: boolean;
}

export type VxeSelectProps = {
  size?: VxeSelectPropTypes.Size;
  modelValue?: VxeSelectPropTypes.ModelValue;
  clearable?: VxeSelectPropTypes.Clearable;
  placeholder?: VxeSelectPropTypes.Placeholder;
  loading?: VxeSelectPropTypes.Loading;
  disabled?: VxeSelectPropTypes.Disabled;
  className?: VxeSelectPropTypes.ClassName;
  multiple?: VxeSelectPropTypes.Multiple;
  multiCharOverflow?: VxeSelectPropTypes.MultiCharOverflow;
  prefixIcon?: VxeSelectPropTypes.PrefixIcon;
  placement?: VxeSelectPropTypes.Placement;
  options?: VxeSelectPropTypes.Options;
  optionProps?: VxeSelectPropTypes.OptionProps;
  optionGroups?: VxeSelectPropTypes.OptionGroups;
  optionGroupProps?: VxeSelectPropTypes.OptionGroupProps;
  emptyText?: VxeSelectPropTypes.EmptyText;
  optionId?: VxeSelectPropTypes.OptionId;
  optionKey?: VxeSelectPropTypes.OptionKey;
  transfer?: VxeSelectPropTypes.Transfer;
}

export namespace VxeSelectPropTypes {
  export type Size = SizeType;
  export type ModelValue = any;
  export type Clearable = boolean;
  export type Placeholder = string;
  export type Loading = boolean;
  export type Disabled = boolean;
  export type ClassName = string | ((params: { $select: VxeSelectConstructor }) => string);
  export type Multiple = boolean;
  export type MultiCharOverflow = number | string;
  export type PrefixIcon = string;
  export type Placement = string;
  export type Options = any[];
  export type OptionProps = VxeGlobalRendererHandles.RenderOptionProps;
  export type OptionGroups = VxeOptgroupProps[];
  export type OptionGroupProps = VxeGlobalRendererHandles.RenderOptionGroupProps;
  export type EmptyText = string;
  export type OptionId = string;
  export type OptionKey = boolean;
  export type Transfer = boolean;
}

export interface SelectMethods {
  dispatchEvent(type: ValueOf<VxeSelectEmits>, params: any, evnt?: Event): void;
  /**
   * 判断下拉面板是否可视
   */
  isPanelVisible(): boolean;
  /**
   * 切换下拉面板
   */
  togglePanel(): Promise<any>;
  /**
   * 显示下拉面板
   */
  showPanel(): Promise<any>;
  /**
   * 隐藏下拉面板
   */
  hidePanel(): Promise<any>;
  /**
   * 刷新选项，当选项被动态显示/隐藏时可能会用到
   */
  refreshOption(): Promise<any>;
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
  export class OptionInfo {
    id: string;

    value: any;
    label: VxeOptionPropTypes.Label;
    visible: VxeOptionPropTypes.Visible;
    className: VxeOptionPropTypes.ClassName;
    disabled: VxeOptionPropTypes.Disabled;

    options: OptionInfo[];
  }

  interface SelectEventParams extends VxeEvent {
    $select: VxeSelectConstructor;
  }

  export interface ChangeParams {
    value: any;
  }
  export interface ChangeEventParams extends SelectEventParams, ChangeParams { }
}

export type VxeSelectEventProps = {
  onChange?: VxeSelectEvents.Change;
}

export interface VxeSelectListeners {
  change?: VxeSelectEvents.Change;
}

export namespace VxeSelectEvents {
  export type Change = (params: VxeSelectDefines.ChangeEventParams) => void;
}
