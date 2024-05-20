import { RenderFunction, SetupContext, ComponentPublicInstance, Ref } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf, SlotVNodeType } from './component'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 弹窗
 * @example import { VxeModal } from 'vxe-table'
 */
export const VxeModal: VXEComponent<VxeModalProps, VxeModalEventProps, VxeModalSlots>
/**
 * 组件 - 弹窗
 */
export const Modal: typeof VxeModal

export type VxeModalInstance = ComponentPublicInstance<VxeModalProps, VxeModalConstructor>

export interface VxeModalConstructor extends VxeComponentBase, VxeModalMethods {
  props: VxeModalProps
  context: SetupContext<VxeModalEmits>
  reactData: ModalReactData
  getRefMaps(): ModalPrivateRef
  renderVN: RenderFunction
}

export interface ModalPrivateRef {
  refElem: Ref<HTMLDivElement>
}
export interface VxeModalPrivateRef extends ModalPrivateRef { }

export interface ModalReactData {
  inited: boolean
  visible: boolean
  contentVisible: boolean
  modalTop: number
  modalZindex: number
  zoomLocat: {
    left: number
    top: number
    width: number
    height: number
  } | null
  firstOpen: boolean
}

export interface ModalMethods {
  dispatchEvent(type: ValueOf<VxeModalEmits>, params: any, evnt?: Event): void
  /**
   * 手动打开窗口
   */
  open(): Promise<any>
  /**
   * 手动关闭窗口
   */
  close(): Promise<any>
  /**
   * 获取当前窗口元素
   */
  getBox(): HTMLElement
  /**
   * 获取窗口位置
   */
  getPosition(): {
    top?: number
    left?: number
  } | null
  /**
   * 设置窗口位置
   */
  setPosition(top?: number, left?: number): Promise<any>
  /**
   * 判断是否最大化显示
   */
  isMaximized(): boolean
  /**
   * 切换窗口最大化/还原
   */
  zoom(): Promise<boolean>
  /**
   * 如果窗口处于常规状态，则最大化窗口
   */
  maximize(): Promise<any>
  /**
   * 如果窗口处于最大化状态，则还原窗口
   */
  revert(): Promise<any>
}
export interface VxeModalMethods extends ModalMethods { }

export interface ModalPrivateMethods { }
export interface VxeModalPrivateMethods extends ModalPrivateMethods { }

/**
 * 窗口类型
 */
export type ModalType = 'alert' | 'confirm' | 'message' | 'modal'
/**
 * 窗口状态
 */
export type ModalStatus = 'info' | 'success' | 'warning' | 'question' | 'error' | 'loading'

export type ModalPosition = {
  top?: number
  left?: number
}

/**
 * 窗口事件类型
 */
export type ModalEventTypes = 'model' | 'mask' | 'close' | 'confirm' | 'cancel' | 'exit' | 'exist'

export namespace VxeModalPropTypes {
  export type Size = SizeType
  export type ModelValue = boolean
  export type ID = string | null
  export type Type = ModalType
  export type Loading = boolean
  export type Status = ModalStatus
  export type IconStatus = string
  export type ClassName = string
  export type Top = number | string
  export type Position = 'center' | ModalPosition
  export type Title = string | number
  export type Duration = number | string
  export type Content = number | string | null
  /**
   * 请使用 content
   * @deprecated
   */
  export type Message = Content
  export type ShowCancelButton = boolean | null
  export type CancelButtonText = string
  export type ShowConfirmButton = boolean | null
  export type ConfirmButtonText = string
  export type LockView = boolean
  export type LockScroll = boolean
  export type Mask = boolean
  export type MaskClosable = boolean
  export type EscClosable = boolean
  export type Resize = boolean
  export type ShowHeader = boolean
  export type ShowFooter = boolean
  export type ShowZoom = boolean
  export type ShowClose = boolean
  export type DblclickZoom = boolean
  export type Width = number | string
  export type Height = number | string
  export type MinWidth = number | string
  export type MinHeight = number | string
  export type ZIndex = number
  export type MarginSize = number | string
  export type Fullscreen = boolean
  export type Draggable = boolean
  export type Remember = boolean
  export type DestroyOnClose = boolean
  export type ShowTitleOverflow = boolean
  export type Transfer = boolean
  export type Storage = boolean
  export type StorageKey = string
  export type Animat = boolean
  export type BeforeHideMethod = (params: ModalVisibleParams) => Promise<any>
  export type Slots = ModalSlots
}

export type VxeModalProps = {
  size?: VxeModalPropTypes.Size
  modelValue?: VxeModalPropTypes.ModelValue
  id?: VxeModalPropTypes.ID
  type?: VxeModalPropTypes.Type
  loading?: VxeModalPropTypes.Loading
  status?: VxeModalPropTypes.Status
  iconStatus?: VxeModalPropTypes.IconStatus
  className?: VxeModalPropTypes.ClassName
  top?: VxeModalPropTypes.Top
  position?: VxeModalPropTypes.Position
  title?: VxeModalPropTypes.Title
  duration?: VxeModalPropTypes.Duration
  content?: VxeModalPropTypes.Content
  showCancelButton?: VxeModalPropTypes.ShowCancelButton
  cancelButtonText?: VxeModalPropTypes.CancelButtonText
  showConfirmButton?: VxeModalPropTypes.ShowConfirmButton
  confirmButtonText?: VxeModalPropTypes.ConfirmButtonText
  lockView?: VxeModalPropTypes.LockView
  lockScroll?: VxeModalPropTypes.LockScroll
  mask?: VxeModalPropTypes.Mask
  maskClosable?: VxeModalPropTypes.MaskClosable
  escClosable?: VxeModalPropTypes.EscClosable
  resize?: VxeModalPropTypes.Resize
  showHeader?: VxeModalPropTypes.ShowHeader
  showFooter?: VxeModalPropTypes.ShowFooter
  showZoom?: VxeModalPropTypes.ShowZoom
  showClose?: VxeModalPropTypes.ShowClose
  dblclickZoom?: VxeModalPropTypes.DblclickZoom
  draggable?: VxeModalPropTypes.Draggable
  width?: VxeModalPropTypes.Width
  height?: VxeModalPropTypes.Height
  minWidth?: VxeModalPropTypes.MinWidth
  minHeight?: VxeModalPropTypes.MinHeight
  zIndex?: VxeModalPropTypes.ZIndex
  marginSize?: VxeModalPropTypes.MarginSize
  fullscreen?: VxeModalPropTypes.Fullscreen
  remember?: VxeModalPropTypes.Remember
  destroyOnClose?: VxeModalPropTypes.DestroyOnClose
  showTitleOverflow?: VxeModalPropTypes.ShowTitleOverflow
  transfer?: VxeModalPropTypes.Transfer
  storage?: VxeModalPropTypes.Storage
  storageKey?: VxeModalPropTypes.StorageKey
  animat?: VxeModalPropTypes.Animat
  beforeHideMethod?: VxeModalPropTypes.BeforeHideMethod
  slots?: VxeModalPropTypes.Slots
  /**
   * @deprecated 已废弃，请使用 content
   */
  message?: VxeModalPropTypes.Content
}

export type ModalSlots = {
  /**
   * 自定义窗口内容模板
   */
  default?(params: ModalDefaultSlotParams): SlotVNodeType[] | SlotVNodeType
  /**
   * 自定义窗口头部的模板
   */
  header?(params: ModalHeaderSlotParams): SlotVNodeType[] | SlotVNodeType
  /**
   * 自定义窗口标题的模板（如果使用了 header 插槽，则该插槽无效）
   */
  title?(params: ModalTitleSlotParams): SlotVNodeType[] | SlotVNodeType
  /**
   * 自定义窗口右上角的模板
   */
  corner?(params: ModalTitleSlotParams): SlotVNodeType[] | SlotVNodeType
  /**
   * 自定义窗口底部的模板
   */
  footer?(params: ModalFooterSlotParams): SlotVNodeType[] | SlotVNodeType
}

export type VxeModalEmits = [
  'update:modelValue',
  'show',
  'hide',
  'before-hide',
  'close',
  'confirm',
  'cancel',
  'zoom',
  'resize',
  'move'
]

/**
 * 全局窗口控制器
 */
export interface ModalController {
  /**
   * 创建窗口
   * @param options 参数
   */
  open(options: VxeModalDefines.ModalOptions): Promise<ModalEventTypes>
  /**
   * 创建提示框
   * @param content 消息内容
   * @param title 标题
   * @param options 参数
   */
  alert(content: VxeModalPropTypes.Content, title?: VxeModalPropTypes.Title, options?: VxeModalDefines.ModalOptions): Promise<ModalEventTypes>
  /**
   * 创建提示框
   * @param options 参数
   */
  alert(options: VxeModalDefines.ModalOptions): Promise<ModalEventTypes>
  /**
   * 创建确认框
   * @param content 消息内容
   * @param title 标题
   * @param options 参数
   */
  confirm(content: VxeModalPropTypes.Content, title?: VxeModalPropTypes.Title, options?: VxeModalDefines.ModalOptions): Promise<ModalEventTypes>
  /**
   * 创建确认框
   * @param options 参数
   */
  confirm(options: VxeModalDefines.ModalOptions): Promise<ModalEventTypes>
  /**
   * 创建消息提示
   * @param content 消息内容
   * @param title 标题
   * @param options 参数
   */
  message(content: VxeModalPropTypes.Content, options?: VxeModalDefines.ModalOptions): Promise<ModalEventTypes>
  /**
   * 创建消息提示
   * @param options 参数
   */
  message(options: VxeModalDefines.ModalOptions): Promise<ModalEventTypes>
  /**
   * 获取动态的活动窗口
   * @param id 窗口唯一标识
   */
  get(id: string): VxeModalConstructor & VxeModalMethods
  /**
   * 关闭动态的活动窗口，如果为空则关闭所有
   * @param id 窗口唯一标识
   */
  close(id?: VxeModalPropTypes.ID): Promise<any>
}

export interface ModalDefaultSlotParams {
  $modal: VxeModalConstructor & VxeModalMethods
}

export interface ModalHeaderSlotParams extends ModalDefaultSlotParams { }
export interface ModalTitleSlotParams extends ModalDefaultSlotParams { }
export interface ModalFooterSlotParams extends ModalDefaultSlotParams { }

interface ModalVisibleParams {
  type: ModalEventTypes
}

export namespace VxeModalDefines {
  export interface ModalOptions extends VxeModalProps, VxeModalEventProps {
    key?: string | number
  }

  interface ModalEventParams extends VxeEvent {
    $modal: VxeModalConstructor & VxeModalMethods
  }

  interface ModalBaseParams extends ModalVisibleParams { }

  export interface ShowParams extends ModalBaseParams { }
  export interface ShowEventParams extends ModalEventParams, ShowParams { }

  export interface HideParams extends ModalBaseParams { }
  export interface HideEventParams extends ModalEventParams, HideParams { }

  export interface BeforeHideParams extends ModalBaseParams { }
  export interface BeforeHideEventParams extends ModalEventParams, BeforeHideParams { }

  export interface ConfirmParams extends ModalBaseParams { }
  export interface ConfirmEventParams extends ModalEventParams, ConfirmParams { }

  export interface CancelParams extends ModalBaseParams { }
  export interface CancelEventParams extends ModalEventParams, CancelParams { }

  export interface CloseParams extends ModalBaseParams { }
  export interface CloseEventParams extends ModalEventParams, CloseParams { }

  export interface ZoomParams extends ModalBaseParams { }
  export interface ZoomEventParams extends ModalEventParams, ZoomParams { }

  export interface ResizeParams extends ModalBaseParams { }
  export interface ResizeEventParams extends ModalEventParams, ResizeParams { }

  export interface MoveParams extends ModalBaseParams { }
  export interface MoveEventParams extends ModalEventParams, MoveParams { }
}

export type VxeModalEventProps = {
  onShow?: VxeModalEvents.Show
  onHide?: VxeModalEvents.Hide
  onBeforeHide?: VxeModalEvents.BeforeHide
  onConfirm?: VxeModalEvents.Confirm
  onCancel?: VxeModalEvents.Cancel
  onClose?: VxeModalEvents.Close
  onZoom?: VxeModalEvents.Zoom
  onResize?: VxeModalEvents.Resize
  onMove?: VxeModalEvents.Move
}

export interface VxeModalListeners {
  show?: VxeModalEvents.Show
  hide?: VxeModalEvents.Hide
  beforeHide?: VxeModalEvents.BeforeHide
  confirm?: VxeModalEvents.Confirm
  cancel?: VxeModalEvents.Cancel
  close?: VxeModalEvents.Close
  zoom?: VxeModalEvents.Zoom
  resize?: VxeModalEvents.Resize
  move?: VxeModalEvents.Move
}

export namespace VxeModalEvents {
  export type Show = (params: VxeModalDefines.ShowEventParams) => void
  export type Hide = (params: VxeModalDefines.HideEventParams) => void
  export type BeforeHide = (params: VxeModalDefines.BeforeHideEventParams) => void
  export type Confirm = (params: VxeModalDefines.ConfirmEventParams) => void
  export type Cancel = (params: VxeModalDefines.CancelEventParams) => void
  export type Close = (params: VxeModalDefines.CloseEventParams) => void
  export type Zoom = (params: VxeModalDefines.ZoomEventParams) => void
  export type Resize = (params: VxeModalDefines.ResizeEventParams) => void
  export type Move = (params: VxeModalDefines.MoveEventParams) => void
}

export interface VxeModalSlots {
  /**
   * 自定义窗口内容模板
   */
  default: (params: ModalDefaultSlotParams) => any
  /**
   * 自定义窗口头部的模板
   */
  header: (params: ModalHeaderSlotParams) => any
  /**
   * 自定义窗口标题的模板（如果使用了 header 插槽，则该插槽无效）
   */
  title: (params: ModalTitleSlotParams) => any
  /**
   * 自定义窗口右上角的模板
   */
  corner: (params: ModalTitleSlotParams) => any
  /**
   * 自定义窗口底部的模板
   */
  footer: (params: ModalFooterSlotParams) => any
}
