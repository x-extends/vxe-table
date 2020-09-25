import { VXETableComponent } from './component'

/**
 * 文本域
 */
export declare class Textarea extends VXETableComponent {
  /**
   * 绑定值
   */
  value?: string | number;
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

  /**
   * 获取焦点
   */
  focus(): Promise<any>;
  /**
   * 失去焦点
   */
  blur(): Promise<any>;
}
