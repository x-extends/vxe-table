import { RenderFunction, SetupContext, ComponentPublicInstance, Ref } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf } from './component'

/**
 * 组件 - 文本域
 * @example import { Textarea as VxeTextarea } from 'vxe-table'
 */
export const Textarea: VXEComponent<VxeTextareaProps, VxeTextareaEventProps>;

export type VxeTextareaInstance = ComponentPublicInstance<VxeTextareaProps, VxeTextareaConstructor>;

export interface VxeTextareaConstructor extends VxeComponentBase, VxeTextareaMethods {
  props: VxeTextareaProps;
  context: SetupContext<VxeTextareaEmits>;
  reactData: TextareaReactData;
  getRefMaps(): TextareaPrivateRef;
  renderVN: RenderFunction;
}

export interface TextareaReactData {
  inputValue: any;
}

export interface TextareaPrivateRef {
  refElem: Ref<HTMLDivElement>;
  refTextarea: Ref<HTMLTextAreaElement>;
}
export interface VxeTextareaPrivateRef extends TextareaPrivateRef { }

export type VxeTextareaProps = {
  size?: VxeTextareaPropTypes.Size;
  /**
   * 绑定值
   */
  modelValue?: VxeTextareaPropTypes.ModelValue;
  className?: VxeTextareaPropTypes.ClassName;
  immediate?: VxeTextareaPropTypes.Immediate;
  /**
   * 原生 name 属性
   */
  name?: VxeTextareaPropTypes.Name;
  /**
   * 是否只读
   */
  readonly?: VxeTextareaPropTypes.Readonly;
  /**
   * 是否禁用
   */
  disabled?: VxeTextareaPropTypes.Disabled;
  /**
   * 当值为空时，显示的占位符
   */
  placeholder?: VxeTextareaPropTypes.Placeholder;
  /**
   * 最大长度
   */
  maxlength?: VxeTextareaPropTypes.Maxlength;
  /**
   * 原生 rows 属性
   */
  rows?: VxeTextareaPropTypes.Rows;
  /**
   * 是否显示字数统计
   */
  showWordCount?: VxeTextareaPropTypes.ShowWordCount;
  /**
   * 自适应文本高度
   */
  autosize?: VxeTextareaPropTypes.Autosize;
  /**
   * 原生 form 属性
   */
  form?: VxeTextareaPropTypes.Form;
  /**
   * 调整文本域大小的方式
   */
  resize?: VxeTextareaPropTypes.Resize;
}

export namespace VxeTextareaPropTypes {
  export type Size = SizeType;
  export type ModelValue = string | number;
  export type ClassName = string;
  export type Immediate = boolean;
  export type Name = string;
  export type Readonly = boolean;
  export type Disabled = boolean;
  export type Placeholder = string;
  export type Maxlength = string | number;
  export type Rows = string | number;
  export type ShowWordCount = boolean;
  export type Autosize = {
    minRows?: number;
    maxRows?: number;
  };
  export type Form = string;
  export type Resize = string;
}

export interface TextareaMethods {
  dispatchEvent(type: ValueOf<VxeTextareaEmits>, params: any, evnt: Event): void;
  /**
   * 获取焦点
   */
  focus(): Promise<any>;
  /**
   * 失去焦点
   */
  blur(): Promise<any>;
}
export interface VxeTextareaMethods extends TextareaMethods { }

export interface TextareaPrivateMethods { }
export interface VxeTextareaPrivateMethods extends TextareaPrivateMethods { }

export type VxeTextareaEmits = [
  'update:modelValue',
  'input',
  'change',
  'focus',
  'blur'
]

export namespace VxeTextareaDefines {
  interface TextareaEventParams extends VxeEvent {
    $textarea: VxeTextareaConstructor;
  }
}

export type VxeTextareaEventProps = {}

export interface VxeTextareaListeners { }

export namespace VxeTextareaEvents { }
