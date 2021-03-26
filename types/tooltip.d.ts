import { SetupContext, RenderFunction, Ref, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf, VNodeStyle } from './component'

/**
 * 组件 - 工具提示
 * @example import { Tooltip as VxeTooltip } from 'vxe-table'
 */
export const Tooltip: VXEComponent<VxeTooltipProps, VxeTooltipEventProps>;

export type VxeTooltipInstance = ComponentPublicInstance<VxeTooltipProps, VxeTooltipConstructor>;

export interface VxeTooltipConstructor extends VxeComponentBase, VxeTooltipMethods {
  props: VxeTooltipProps;
  context: SetupContext<VxeTooltipEmits>;
  reactData: TooltipReactData;
  getRefMaps(): TooltipPrivateRef;
  renderVN: RenderFunction;
}

export interface TooltipPrivateRef {
  refElem: Ref<HTMLDivElement>;
}
export interface VxeTooltipPrivateRef extends TooltipPrivateRef { }

export interface TooltipReactData {
  target: HTMLElement | null;
  isUpdate: boolean;
  isHover: boolean;
  visible: boolean;
  message: string | number | undefined,
  tipTarget: HTMLElement | null;
  tipZindex: number;
  tipStore: {
    style: VNodeStyle,
    placement: any,
    arrowStyle: VNodeStyle
  }
}

export namespace VxeTooltipPropTypes {
  export type Size = SizeType;
  export type ModelValue = boolean;
  export type Trigger = 'hover' | 'click';
  export type Theme = string;
  export type Content = string | number;
  export type ZIndex = string | number;
  export type IsArrow = boolean;
  export type Enterable = boolean;
  export type LeaveDelay = number;
  export type LeaveMethod = (params: { $event: MouseEvent }) => boolean;
}

export type VxeTooltipProps = {
  size?: VxeTooltipPropTypes.Size;
  modelValue?: VxeTooltipPropTypes.ModelValue;
  trigger?: VxeTooltipPropTypes.Trigger;
  theme?: VxeTooltipPropTypes.Theme;
  content?: VxeTooltipPropTypes.Content;
  zIndex?: VxeTooltipPropTypes.ZIndex;
  isArrow?: VxeTooltipPropTypes.IsArrow;
  enterable?: VxeTooltipPropTypes.Enterable;
  leaveDelay?: VxeTooltipPropTypes.LeaveDelay;
  leaveMethod?: VxeTooltipPropTypes.LeaveMethod;
}

export interface TooltipMethods {
  dispatchEvent(type: ValueOf<VxeTooltipEmits>, params: any, evnt: Event): void;
  /**
   * 显示
   * @param target 自定义目标元素
   * @param message 自定义消息
   */
  open(target?: any, message?: VxeTooltipPropTypes.Content): Promise<any>;
  toVisible(target?: HTMLElement, message?: VxeTooltipPropTypes.Content): Promise<any>;
  /**
   * 隐藏
   */
  close(): Promise<any>;
  updatePlacement(): Promise<any>;
}
export interface VxeTooltipMethods extends TooltipMethods { }

export interface TooltipPrivateMethods { }
export interface VxeTooltipPrivateMethods extends TooltipPrivateMethods { }

export type VxeTooltipEmits = [
  'update:modelValue'
]

export namespace VxeTooltipDefines {
  interface TooltipEventParams extends VxeEvent {
    $tooltip: VxeTooltipConstructor;
  }
}

export type VxeTooltipEventProps = {}

export interface VxeTooltipListeners { }

export namespace VxeTooltipEvents { }
