import { RenderFunction, SetupContext, ComponentPublicInstance } from 'vue'
import { VXETableComponent, VxeComponentInstance, VxeEvent, SizeType, ValueOf } from './component'

/**
 * 组件 - 文本域
 */
export interface Textarea extends VXETableComponent { }

export type VxeTextareaInstance = ComponentPublicInstance<VxeTextareaProps, VxeTextareaConstructor>;

export interface VxeTextareaConstructor extends VxeComponentInstance, VxeTextareaMethods {
  props: VxeTextareaProps;
  context: SetupContext<VxeTextareaEmits>;
  reactData: TextareaReactData;
  refMaps: TextareaPrivateRef;
  renderVN: RenderFunction;
}

export interface TextareaReactData {
  inputValue: any;
}

export interface TextareaPrivateRef { }
export interface VxeTextareaPrivateRef extends TextareaPrivateRef { }

export interface VxeTextareaOptions extends VxeTextareaProps, VxeTextareaListeners { }

export interface VxeTextareaProps {
  size?: SizeType;
  /**
   * 绑定值
   */
  modelValue?: string | number;
  immediate?: boolean;
  /**
   * 原生 name 属性
   */
  name?: string;
  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 当值为空时，显示的占位符
   */
  placeholder?: string;
  /**
   * 最大长度
   */
  maxlength?: string | number;
  /**
   * 原生 rows 属性
   */
  rows?: string | number;
  /**
   * 是否显示字数统计
   */
  showWordCount?: boolean;
  /**
   * 自适应文本高度
   */
  autosize?: {
    minRows?: number;
    maxRows?: number;
  };
  /**
   * 原生 form 属性
   */
  form?: string;
  /**
   * 调整文本域大小的方式
   */
  resize?: string;
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

export interface VxeTextareaListeners { }

export namespace VxeTextareaEvents { }
