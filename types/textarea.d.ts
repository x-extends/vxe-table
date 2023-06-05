import { RenderFunction, SetupContext, ComponentPublicInstance, Ref } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf } from './component'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 文本域
 * @example import {  VxeTextarea } from 'vxe-table'
 */
export const VxeTextarea: VXEComponent<VxeTextareaProps, VxeTextareaEventProps, VxeTextareaSlots>
/**
 * 组件 - 文本域
 */
export const Textarea: typeof VxeTextarea

export type VxeTextareaInstance = ComponentPublicInstance<VxeTextareaProps, VxeTextareaConstructor>

export interface VxeTextareaConstructor extends VxeComponentBase, VxeTextareaMethods {
  props: VxeTextareaProps
  context: SetupContext<VxeTextareaEmits>
  reactData: TextareaReactData
  getRefMaps(): TextareaPrivateRef
  renderVN: RenderFunction
}

export interface TextareaReactData {
  inputValue: any
}

export interface TextareaPrivateRef {
  refElem: Ref<HTMLDivElement>
  refTextarea: Ref<HTMLTextAreaElement>
}
export interface VxeTextareaPrivateRef extends TextareaPrivateRef { }

export type VxeTextareaProps = {
  size?: VxeTextareaPropTypes.Size
  /**
   * 绑定值
   */
  modelValue?: VxeTextareaPropTypes.ModelValue
  className?: VxeTextareaPropTypes.ClassName
  immediate?: VxeTextareaPropTypes.Immediate
  /**
   * 原生 name 属性
   */
  name?: VxeTextareaPropTypes.Name
  /**
   * 是否只读
   */
  readonly?: VxeTextareaPropTypes.Readonly
  /**
   * 是否禁用
   */
  disabled?: VxeTextareaPropTypes.Disabled
  /**
   * 当值为空时，显示的占位符
   */
  placeholder?: VxeTextareaPropTypes.Placeholder
  /**
   * 最大长度
   */
  maxlength?: VxeTextareaPropTypes.Maxlength
  /**
   * 原生 rows 属性
   */
  rows?: VxeTextareaPropTypes.Rows
  /**
   * 原生 cols 属性
   */
  cols?: VxeTextareaPropTypes.Cols
  /**
   * 是否显示字数统计
   */
  showWordCount?: VxeTextareaPropTypes.ShowWordCount
  /**
   * 自定义字数统计方法
   */
  countMethod?: VxeTextareaPropTypes.CountMethod
  /**
   * 自适应文本高度
   */
  autosize?: VxeTextareaPropTypes.Autosize
  /**
   * 原生 form 属性
   */
  form?: VxeTextareaPropTypes.Form
  /**
   * 调整文本域大小的方式
   */
  resize?: VxeTextareaPropTypes.Resize
}

export namespace VxeTextareaPropTypes {
  export type Size = SizeType
  export type ModelValue = string | number
  export type ClassName = string
  export type Immediate = boolean
  export type Name = string
  export type Readonly = boolean
  export type Disabled = boolean
  export type Placeholder = string
  export type Maxlength = string | number
  export type Rows = string | number
  export type Cols = string | number
  export type ShowWordCount = boolean
  export type CountMethod = (params: {
    value: string
  }) => number
  export type Autosize = {
    minRows?: number
    maxRows?: number
  }
  export type Form = string
  export type Resize = string
}

export interface TextareaMethods {
  dispatchEvent(type: ValueOf<VxeTextareaEmits>, params: any, evnt: Event): void
  /**
   * 获取焦点
   */
  focus(): Promise<any>
  /**
   * 失去焦点
   */
  blur(): Promise<any>
}
export interface VxeTextareaMethods extends TextareaMethods { }

export interface TextareaPrivateMethods { }
export interface VxeTextareaPrivateMethods extends TextareaPrivateMethods { }

export type VxeTextareaEmits = [
  'update:modelValue',
  'input',
  'keydown',
  'keyup',
  'click',
  'change',
  'focus',
  'blur'
]

export namespace VxeTextareaDefines {
  interface TextareaEventParams extends VxeEvent {
    $textarea: VxeTextareaConstructor
  }

  export interface InputParams {
    value: string
  }
  export interface InputEventParams extends TextareaEventParams, InputParams { }

  export interface ChangeParams extends InputParams {}
  export interface ChangeEventParams extends TextareaEventParams, ChangeParams { }

  export interface KeyupParams extends InputParams {}
  export interface KeyupEventParams extends TextareaEventParams, KeyupParams { }

  export interface KeydownParams extends InputParams {}
  export interface KeydownEventParams extends TextareaEventParams, KeydownParams { }

  export interface ClickParams extends InputParams {}
  export interface ClickEventParams extends TextareaEventParams, ClickParams { }

  export interface FocusParams extends InputParams {}
  export interface FocusEventParams extends TextareaEventParams, FocusParams { }

  export interface BlurParams extends InputParams {}
  export interface BlurEventParams extends TextareaEventParams, BlurParams { }
}

export type VxeTextareaEventProps = {
  onInput?: VxeTextareaEvents.Input
  onChange?: VxeTextareaEvents.Change
  onKeydown?: VxeTextareaEvents.Keydown
  onKeyup?: VxeTextareaEvents.Keyup
  onClick?: VxeTextareaEvents.Click
  onFocus?: VxeTextareaEvents.Focus
  onBlur?: VxeTextareaEvents.Blur
}

export interface VxeTextareaListeners {
  input?: VxeTextareaEvents.Input
  change?: VxeTextareaEvents.Change
  keydown?: VxeTextareaEvents.Keydown
  keyup?: VxeTextareaEvents.Keyup
  click?: VxeTextareaEvents.Click
  focus?: VxeTextareaEvents.Focus
  blur?: VxeTextareaEvents.Blur
}

export namespace VxeTextareaEvents {
  export type Input = (params: VxeTextareaDefines.InputEventParams) => void
  export type Change = (params: VxeTextareaDefines.ChangeEventParams) => void
  export type Keydown = (params: VxeTextareaDefines.KeydownEventParams) => void
  export type Keyup = (params: VxeTextareaDefines.KeyupEventParams) => void
  export type Click = (params: VxeTextareaDefines.ClickEventParams) => void
  export type Focus = (params: VxeTextareaDefines.FocusEventParams) => void
  export type Blur = (params: VxeTextareaDefines.BlurEventParams) => void
}

export interface VxeTextareaSlots {
  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    [key: string]: any
  }) => any) | undefined
}
