import { SetupContext, RenderFunction, Ref, ComponentPublicInstance } from 'vue'
import { VXETableComponent, VxeComponentInstance, VxeEvent, SizeType, ValueOf, VNodeStyle } from './component'

/**
 * 组件 - 工具提示
 */
export interface Tooltip extends VXETableComponent { }

export type VxeTooltipInstance = ComponentPublicInstance<VxeTooltipProps, VxeTooltipConstructor>;

export interface VxeTooltipConstructor extends VxeComponentInstance, VxeTooltipMethods {
  props: VxeTooltipProps;
  context: SetupContext<VxeTooltipEmits>;
  reactData: TooltipReactData;
  refMaps: TooltipPrivateRef;
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

export interface VxeTooltipOptions extends VxeTooltipProps, VxeTooltipListeners { }

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

export interface VxeTooltipProps {
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
  open(target?: any, message?: string | number): Promise<any>;
  toVisible(target?: any, message?: string | number): Promise<any>;
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

export interface VxeTooltipListeners { }

export namespace VxeTooltipEvents { }