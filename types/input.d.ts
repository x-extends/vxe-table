import { VXETableModule } from './component';

/**
 * 输入框
 */
export declare class Input extends VXETableModule {
  value?: string | number | Date;
  name?: string;
  type?: string;
  clearable?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  placeholder?:  string;
  maxlength?: string | number;
  autocomplete?: string;
  form?:  string;
  editable?: boolean;
  dateConfig?: any;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  prefixIcon?:  string;
  suffixIcon?:  string;
  placement?:  string;
  transfer?: boolean;

  focus(): Promise<any>;
  blur(): Promise<any>;
}