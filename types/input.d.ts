import { RenderFunction, SetupContext, ComponentPublicInstance } from 'vue'
import { VXETableComponent, VxeComponentInstance, VxeEvent, SizeType, VNodeStyle, ValueOf } from './component'

/**
 * 组件 - 输入框
 */
export interface Input extends VXETableComponent { }

export type VxeInputInstance = ComponentPublicInstance<VxeInputProps, VxeInputConstructor>;

export interface VxeInputConstructor extends VxeComponentInstance, VxeInputMethods {
  props: VxeInputProps;
  context: SetupContext<VxeInputEmits>;
  reactData: InputReactData;
  renderVN: RenderFunction;
}

export interface InputReactData {
  inited: boolean;
  panelIndex: number;
  showPwd: boolean;
  visiblePanel: boolean;
  animatVisible: boolean;
  panelStyle: VNodeStyle | null;
  panelPlacement: VxeInputPropTypes.Placement;
  isActivated: boolean;
  inputValue: string;
  datetimePanelValue: any;
  datePanelValue: Date | null;
  datePanelLabel: string;
  datePanelType: string;
  selectMonth: any;
  currentDate: any;
}

export interface VxeInputOptions extends VxeInputProps, VxeInputListeners { }

export namespace VxeInputPropTypes {
  export type Size = SizeType;
  export type ModelValue = string | number | Date | null;
  export type Name = string;
  export type Type = 'text' | 'search' | 'number' | 'integer' | 'float' | 'password' | 'date' | 'time' | 'datetime' | 'week' | 'month' | 'year';
  export type Clearable = boolean;
  export type Readonly = boolean;
  export type Disabled = boolean;
  export type Placeholder = string;
  export type Maxlength = string | number;
  export type Autocomplete = string;
  export type Align = string;
  export type Form = string;
  export type Min = string | number;
  export type Max = string | number;
  export type Step = string | number;
  export type Controls = boolean;
  export type Digits = string | number;
  export type MinDate = string | number | Date;
  export type MaxDate = string | number | Date;
  export type StartWeek = number;
  export type LabelFormat = string;
  export type ParseFormat = string;
  export type ValueFormat = string;
  export type Editable = boolean;
  export type FestivalMethod = (params: VxeInputDefines.DateFestivalParams) => VxeInputDefines.DateFestivalInfo | null | void;
  export type DisabledMethod = (params: VxeInputDefines.DateDisabledParams) => boolean;
  export type PrefixIcon = string;
  export type SuffixIcon = string;
  export type Placement = 'top' | 'bottom' | '' | null;
  export type Transfer = boolean;
}

export interface VxeInputProps {
  size?: VxeInputPropTypes.Size;
  modelValue?: VxeInputPropTypes.ModelValue;
  name?: VxeInputPropTypes.Name;
  type?: VxeInputPropTypes.Type;
  clearable?: VxeInputPropTypes.Clearable;
  readonly?: VxeInputPropTypes.Readonly;
  disabled?: VxeInputPropTypes.Disabled;
  placeholder?: VxeInputPropTypes.Placeholder;
  maxlength?: VxeInputPropTypes.Maxlength;
  autocomplete?: VxeInputPropTypes.Autocomplete;
  align?: VxeInputPropTypes.Align;
  form?: VxeInputPropTypes.Form;

  // number、integer、float
  min?: VxeInputPropTypes.Min;
  max?: VxeInputPropTypes.Max;
  step?: VxeInputPropTypes.Step;

  // number、integer、float、password
  controls?: VxeInputPropTypes.Controls;

  // float
  digits?: VxeInputPropTypes.Digits;

  // date、week、month、year
  minDate?: VxeInputPropTypes.MinDate;
  maxDate?: VxeInputPropTypes.MaxDate;
  startWeek?: VxeInputPropTypes.StartWeek;
  labelFormat?: VxeInputPropTypes.LabelFormat;
  parseFormat?: VxeInputPropTypes.ParseFormat;
  valueFormat?: VxeInputPropTypes.ValueFormat;
  editable?: VxeInputPropTypes.Editable;
  festivalMethod?: VxeInputPropTypes.FestivalMethod;
  disabledMethod?: VxeInputPropTypes.DisabledMethod;

  prefixIcon?: VxeInputPropTypes.PrefixIcon;
  suffixIcon?: VxeInputPropTypes.SuffixIcon;
  placement?: VxeInputPropTypes.Placement;
  transfer?: VxeInputPropTypes.Transfer;
}

export interface InputMethods {
  dispatchEvent: (type: ValueOf<VxeInputEmits>, params: any, evnt?: Event | { type: string }) => void;
  /**
   * 获取焦点
   */
  focus(): Promise<any>;
  /**
   * 失去焦点
   */
  blur(): Promise<any>;
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
  'mousewheel',
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
    label?: string;
    /**
     * 标记为重要信息
     */
    important?: boolean;
    className?: string;
    style?: VNodeStyle;
  }

  /**
   * 日期节日对象
   */
  export interface DateFestivalInfo extends DateFestivalItem {
    /**
     * 显示左上角小圆点通知
     */
    notice?: boolean;
    /**
     * 显示右上角信息
     */
    extra?: string | DateFestivalItem;
  }

  export interface DateFestivalParams {
    date: Date;
    type: string;
  }

  export interface DateDisabledParams {
    type: VxeInputPropTypes.Type;
    date: Date;
  }

  interface InputEventParams extends VxeEvent {
    $input: VxeInputConstructor;
  }

  export type KeyupParams = {}
  export interface KeyupEventParams extends InputEventParams, KeyupParams {
    $event: KeyboardEvent
  }

}

export interface VxeInputListeners { }

export namespace VxeInputEvents {
  export type KeyupMethod = (params: VxeInputDefines.KeyupEventParams) => void;
}
