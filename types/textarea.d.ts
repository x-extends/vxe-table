import { VXETableModule } from './component'

/**
 * 文本域
 */
export declare class Textarea extends VXETableModule {
  value?: string | number;
  name?: string;
  readonly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  maxlength?: string | number;
  rows?: string | number;
  showWordCount?: boolean;
  autosize?: any;
  form?: string;
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
