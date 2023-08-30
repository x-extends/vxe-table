import { RenderFunction, SetupContext, ComponentPublicInstance, Ref } from 'vue'
import { VXEComponent, VxeComponentBase, SizeType, VNodeStyle, ValueOf } from './component'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 输入框
 * @example import { VxeInput } from 'vxe-table'
 */
export const VxeInput: VXEComponent<VxeInputProps, VxeInputEventProps, VxeInputSlots>
/**
 * 组件 - 输入框
 */
export const Input: typeof VxeInput

export type VxeInputInstance = ComponentPublicInstance<VxeInputProps, VxeInputConstructor>

export interface VxeInputConstructor extends VxeComponentBase, VxeInputMethods {
  props: VxeInputProps
  context: SetupContext<VxeInputEmits>
  reactData: InputReactData
  getRefMaps(): InputPrivateRef
  renderVN: RenderFunction
}

export interface InputPrivateRef {
  refElem: Ref<HTMLDivElement>
  refInput: Ref<HTMLInputElement>
}
export interface VxeInputPrivateRef extends InputPrivateRef { }

type DatePanelType = 'year' | 'quarter' | 'month' | 'week' | 'day'

export interface InputReactData {
  inited: boolean
  panelIndex: number
  showPwd: boolean
  visiblePanel: boolean
  animatVisible: boolean
  panelStyle: VNodeStyle | null
  panelPlacement: VxeInputPropTypes.Placement
  isActivated: boolean
  inputValue: any
  datetimePanelValue: any
  datePanelValue: Date | null
  datePanelLabel: string
  datePanelType: DatePanelType
  selectMonth: any
  currentDate: any
}

export namespace VxeInputPropTypes {
  export type Size = SizeType
  export type ModelValue = string | number | Date | null
  export type ClassName = string
  export type Immediate = boolean
  export type Name = string
  export type Type = 'text' | 'search' | 'number' | 'integer' | 'float' | 'password' | 'date' | 'time' | 'datetime' | 'week' | 'month' | 'quarter' | 'year'
  export type Clearable = boolean
  export type Readonly = boolean
  export type Disabled = boolean
  export type Placeholder = string
  export type Maxlength = string | number
  export type Multiple = boolean
  export type ShowWordCount = boolean
  export type CountMethod = (params: {
    value: string
  }) => number
  export type Autocomplete = string
  export type Align = string
  export type Form = string
  export type Min = string | number
  export type Max = string | number
  export type Step = string | number
  export type Exponential = boolean
  export type Controls = boolean
  export type Digits = string | number
  export type StartDate = string | number | Date
  export type EndDate = string | number | Date
  export type MinDate = string | number | Date
  export type MaxDate = string | number | Date
  export type StartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
  export type SelectDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
  export type LabelFormat = string
  export type ValueFormat = string
  export type Editable = boolean
  export type FestivalMethod = (params: VxeInputDefines.DateFestivalParams) => VxeInputDefines.DateFestivalInfo | null | void
  export type DisabledMethod = (params: VxeInputDefines.DateDisabledParams) => boolean
  export type PrefixIcon = string
  export type SuffixIcon = string
  export type Placement = 'top' | 'bottom' | '' | null
  export type Transfer = boolean
}

export type VxeInputProps = {
  size?: VxeInputPropTypes.Size
  modelValue?: VxeInputPropTypes.ModelValue
  className?: VxeInputPropTypes.ClassName
  immediate?: VxeInputPropTypes.Immediate
  name?: VxeInputPropTypes.Name
  type?: VxeInputPropTypes.Type
  clearable?: VxeInputPropTypes.Clearable
  readonly?: VxeInputPropTypes.Readonly
  disabled?: VxeInputPropTypes.Disabled
  placeholder?: VxeInputPropTypes.Placeholder
  maxlength?: VxeInputPropTypes.Maxlength
  multiple?: VxeInputPropTypes.Multiple
  /**
   * 是否显示字数统计
   */
  showWordCount?: VxeInputPropTypes.ShowWordCount
  /**
   * 自定义字数统计方法
   */
  countMethod?: VxeInputPropTypes.CountMethod
  autocomplete?: VxeInputPropTypes.Autocomplete
  align?: VxeInputPropTypes.Align
  form?: VxeInputPropTypes.Form

  // number、integer、float
  min?: VxeInputPropTypes.Min
  max?: VxeInputPropTypes.Max
  step?: VxeInputPropTypes.Step
  exponential?: VxeInputPropTypes.Exponential

  // number、integer、float、password
  controls?: VxeInputPropTypes.Controls

  // float
  digits?: VxeInputPropTypes.Digits

  // date、week、month、quarter、year
  startDate?: VxeInputPropTypes.StartDate
  endDate?: VxeInputPropTypes.EndDate
  minDate?: VxeInputPropTypes.MinDate
  maxDate?: VxeInputPropTypes.MaxDate
  /**
   * @deprecated
   */
  startWeek?: VxeInputPropTypes.StartDay
  startDay?: VxeInputPropTypes.StartDay
  labelFormat?: VxeInputPropTypes.LabelFormat
  valueFormat?: VxeInputPropTypes.ValueFormat
  editable?: VxeInputPropTypes.Editable
  festivalMethod?: VxeInputPropTypes.FestivalMethod
  disabledMethod?: VxeInputPropTypes.DisabledMethod

  // week
  selectDay?: VxeInputPropTypes.SelectDay

  prefixIcon?: VxeInputPropTypes.PrefixIcon
  suffixIcon?: VxeInputPropTypes.SuffixIcon
  placement?: VxeInputPropTypes.Placement
  transfer?: VxeInputPropTypes.Transfer
}

export interface InputMethods {
  dispatchEvent: (type: ValueOf<VxeInputEmits>, params: any, evnt?: Event | { type: string }) => void
  /**
   * 获取焦点
   */
  focus(): Promise<any>
  /**
   * 失去焦点
   */
  blur(): Promise<any>
  /**
   * 选中内容
   */
  select(): Promise<any>
  /**
   * 弹出面板，用于带下拉面板的功能，
   */
  showPanel(): Promise<any>
  /**
   * 关闭面板，用于带下拉面板的功能，
   */
  hidePanel(): Promise<any>
  updatePlacement(): Promise<any>
}
export interface VxeInputMethods extends InputMethods { }

export interface InputPrivateMethods { }
export interface VxeInputPrivateMethods extends InputPrivateMethods { }

export type VxeInputEmits = [
  'update:modelValue',
  'input',
  'change',
  'keydown',
  'keyup',
  'wheel',
  'click',
  'focus',
  'blur',
  'clear',
  'search-click',
  'toggle-visible',
  'prev-number',
  'next-number',
  'prefix-click',
  'suffix-click',
  'date-prev',
  'date-today',
  'date-next'
]

export namespace VxeInputDefines {

  interface DateFestivalItem {
    /**
     * 显示名称
     */
    label?: string
    /**
     * 标记为重要信息
     */
    important?: boolean
    className?: string
    style?: VNodeStyle
  }

  /**
   * 日期节日对象
   */
  export interface DateFestivalInfo extends DateFestivalItem {
    /**
     * 显示左上角小圆点通知
     */
    notice?: boolean
    /**
     * 显示右上角信息
     */
    extra?: string | DateFestivalItem
  }

  export interface DateFestivalParams {
    $input: VxeInputConstructor
    type: string
    viewType: DatePanelType
    date: Date
  }

  export interface DateDisabledParams {
    $input: VxeInputConstructor
    type: string
    viewType: DatePanelType
    date: Date
  }

  interface InputKeyboardEventParams {
    $input: VxeInputConstructor
    $event: KeyboardEvent
  }

  export interface InputParams {
    value: string
  }
  export interface InputEventParams extends InputKeyboardEventParams, InputParams { }

  export interface ChangeParams extends InputParams {}
  export interface ChangeEventParams extends InputKeyboardEventParams, ChangeParams { }

  export interface KeyupParams extends InputParams {}
  export interface KeyupEventParams extends InputKeyboardEventParams, KeyupParams { }

  export interface KeydownParams extends InputParams {}
  export interface KeydownEventParams extends InputKeyboardEventParams, KeydownParams { }

  export interface ClickParams extends InputParams {}
  export interface ClickEventParams extends InputKeyboardEventParams, ClickParams { }

  export interface FocusParams extends InputParams {}
  export interface FocusEventParams extends InputKeyboardEventParams, FocusParams { }

  export interface BlurParams extends InputParams {}
  export interface BlurEventParams extends InputKeyboardEventParams, BlurParams { }

  export interface ClearParams extends InputParams {}
  export interface ClearEventParams extends InputKeyboardEventParams, ClearParams { }

  export interface SearchClickParams extends InputParams {}
  export interface SearchClickEventParams extends InputKeyboardEventParams, SearchClickParams { }

  export interface ToggleVisibleParams extends InputParams {}
  export interface ToggleVisibleEventParams extends InputKeyboardEventParams, ToggleVisibleParams { }

  export interface PrevNumberParams extends InputParams {}
  export interface PrevNumberEventParams extends InputKeyboardEventParams, PrevNumberParams { }

  export interface NextNumberParams extends InputParams {}
  export interface NextNumberEventParams extends InputKeyboardEventParams, NextNumberParams { }

  export interface PrefixClickParams extends InputParams {}
  export interface PrefixClickEventParams extends InputKeyboardEventParams, PrefixClickParams { }

  export interface SuffixClickParams extends InputParams {}
  export interface SuffixClickEventParams extends InputKeyboardEventParams, SuffixClickParams { }

  export interface DatePrevParams extends InputParams {}
  export interface DatePrevEventParams extends InputKeyboardEventParams, DatePrevParams { }

  export interface DateTodayParams extends InputParams {}
  export interface DateTodayEventParams extends InputKeyboardEventParams, DateTodayParams { }

  export interface DateNextParams extends InputParams {}
  export interface DateNextEventParams extends InputKeyboardEventParams, DateNextParams { }
}

export type VxeInputEventProps = {
  onInput?: VxeInputEvents.Input
  onChange?: VxeInputEvents.Change
  onKeydown?: VxeInputEvents.Keydown
  onKeyup?: VxeInputEvents.Keyup
  onClick?: VxeInputEvents.Click
  onFocus?: VxeInputEvents.Focus
  onBlur?: VxeInputEvents.Blur
  onClear?: VxeInputEvents.Clear
  onSearchClick?: VxeInputEvents.SearchClick
  onToggleVisible?: VxeInputEvents.ToggleVisible
  onPrevNumber?: VxeInputEvents.PrevNumber
  onNextNumber?: VxeInputEvents.NextNumber
  onPrefixClick?: VxeInputEvents.PrefixClick
  onSuffixClick?: VxeInputEvents.SuffixClick
  onDatePrev?: VxeInputEvents.DatePrev
  onDateToday?: VxeInputEvents.DateToday
  onDateNext?: VxeInputEvents.DateNext
}

export interface VxeInputListeners {
  input?: VxeInputEvents.Input
  change?: VxeInputEvents.Change
  keydown?: VxeInputEvents.Keydown
  keyup?: VxeInputEvents.Keyup
  click?: VxeInputEvents.Click
  focus?: VxeInputEvents.Focus
  blur?: VxeInputEvents.Blur
  clear?: VxeInputEvents.Clear
  searchClick?: VxeInputEvents.SearchClick
  toggleVisible?: VxeInputEvents.ToggleVisible
  prevNumber?: VxeInputEvents.PrevNumber
  nextNumber?: VxeInputEvents.NextNumber
  prefixClick?: VxeInputEvents.PrefixClick
  suffixClick?: VxeInputEvents.SuffixClick
  datePrev?: VxeInputEvents.DatePrev
  dateToday?: VxeInputEvents.DateToday
  dateNext?: VxeInputEvents.DateNext
}

export namespace VxeInputEvents {
  export type Input = (params: VxeInputDefines.InputEventParams) => void
  export type Change = (params: VxeInputDefines.ChangeEventParams) => void
  export type Keydown = (params: VxeInputDefines.KeydownEventParams) => void
  export type Keyup = (params: VxeInputDefines.KeyupEventParams) => void
  export type Click = (params: VxeInputDefines.ClickEventParams) => void
  export type Focus = (params: VxeInputDefines.FocusEventParams) => void
  export type Blur = (params: VxeInputDefines.BlurEventParams) => void
  export type Clear = (params: VxeInputDefines.ClearEventParams) => void
  export type SearchClick = (params: VxeInputDefines.SearchClickEventParams) => void
  export type ToggleVisible = (params: VxeInputDefines.ToggleVisibleEventParams) => void
  export type PrevNumber = (params: VxeInputDefines.PrevNumberEventParams) => void
  export type NextNumber = (params: VxeInputDefines.NextNumberEventParams) => void
  export type PrefixClick = (params: VxeInputDefines.PrefixClickEventParams) => void
  export type SuffixClick = (params: VxeInputDefines.SuffixClickEventParams) => void
  export type DatePrev = (params: VxeInputDefines.DatePrevEventParams) => void
  export type DateToday = (params: VxeInputDefines.DateTodayEventParams) => void
  export type DateNext = (params: VxeInputDefines.DateNextEventParams) => void
}

export interface VxeInputSlots {
  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    [key: string]: any
  }) => any) | undefined
}
