import { VXETableModule } from './component';

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

  focus(): Promise<any>;
  blur(): Promise<any>;
}