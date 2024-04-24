import { SetupContext, RenderFunction, Ref, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf, VNodeStyle } from './component'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 工具提示
 * @example import { VxeTooltip } from 'vxe-table'
 */
export const VxeTooltip: VXEComponent<VxeTooltipProps, VxeTooltipEventProps, VxeTooltipSlots>
/**
 * 组件 - 工具提示
 */
export const Tooltip: typeof VxeTooltip

export type VxeTooltipInstance = ComponentPublicInstance<VxeTooltipProps, VxeTooltipConstructor>

export interface VxeTooltipConstructor extends VxeComponentBase, VxeTooltipMethods {
  props: VxeTooltipProps
  context: SetupContext<VxeTooltipEmits>
  reactData: TooltipReactData
  getRefMaps(): TooltipPrivateRef
  renderVN: RenderFunction
}

export interface TooltipPrivateRef {
  refElem: Ref<HTMLDivElement>
}
export interface VxeTooltipPrivateRef extends TooltipPrivateRef { }

export interface TooltipReactData {
  target: HTMLElement | null
  isUpdate: boolean
  visible: boolean
  tipContent: string | number | undefined,
  tipActive: boolean
  tipTarget: HTMLElement | null
  tipZindex: number
  tipStore: {
    style: VNodeStyle
    placement: any
    arrowStyle: VNodeStyle
  }
}

export namespace VxeTooltipPropTypes {
  export type Size = SizeType
  export type ModelValue = boolean
  export type Trigger = 'hover' | 'click' | 'manual' | '' | null
  export type Theme = string
  export type Content = string | number
  export type UseHTML = boolean
  export type ZIndex = string | number
  export type PopupClassName = string | ((params: { $tooltip: VxeTooltipConstructor }) => string)
  export type IsArrow = boolean
  export type Enterable = boolean
  export type EnterDelay = number
  export type LeaveDelay = number
  export type LeaveMethod = (params: { $event: MouseEvent }) => boolean
}

export type VxeTooltipProps = {
  size?: VxeTooltipPropTypes.Size
  modelValue?: VxeTooltipPropTypes.ModelValue
  trigger?: VxeTooltipPropTypes.Trigger
  theme?: VxeTooltipPropTypes.Theme
  content?: VxeTooltipPropTypes.Content
  useHTML?: VxeTooltipPropTypes.UseHTML
  popupClassName?: VxeTooltipPropTypes.PopupClassName
  zIndex?: VxeTooltipPropTypes.ZIndex
  isArrow?: VxeTooltipPropTypes.IsArrow
  enterable?: VxeTooltipPropTypes.Enterable
  enterDelay?: VxeTooltipPropTypes.EnterDelay
  leaveDelay?: VxeTooltipPropTypes.LeaveDelay
  leaveMethod?: VxeTooltipPropTypes.LeaveMethod
}

export interface TooltipMethods {
  dispatchEvent(type: ValueOf<VxeTooltipEmits>, params: any, evnt: Event): void
  /**
   * 显示
   * @param target 自定义目标元素
   * @param content 自定义内容
   */
  open(target?: any, content?: VxeTooltipPropTypes.Content): Promise<void>
  toVisible(target?: HTMLElement, content?: VxeTooltipPropTypes.Content): Promise<void>
  /**
   * 隐藏
   */
  close(): Promise<any>
  updatePlacement(): Promise<any>
  isActived(): boolean
  setActived(actived: boolean): void
}
export interface VxeTooltipMethods extends TooltipMethods { }

export interface TooltipPrivateMethods { }
export interface VxeTooltipPrivateMethods extends TooltipPrivateMethods { }

export type VxeTooltipEmits = [
  'update:modelValue'
]

export namespace VxeTooltipDefines {
  export interface TooltipEventParams extends VxeEvent {
    $tooltip: VxeTooltipConstructor
  }
}

export type VxeTooltipEventProps = {
  [key: string]: any
}

export interface VxeTooltipListeners { }

export namespace VxeTooltipEvents { }

export interface VxeTooltipSlots {
  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    [key: string]: any
  }) => any) | undefined
}
