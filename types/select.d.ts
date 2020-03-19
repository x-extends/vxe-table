import { VXETableModule } from './component';

/**
 * 下拉框
 */
export declare class Select extends VXETableModule {
  value?: any;
  clearable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  prefixIcon?: string;
  placement?: string;
  options?: any[];
  optionProps?: any;
  optionGroups?: any[];
  optionGroupProps?: any;
  transfer?: boolean;

  /**
   * 获取焦点
   */
  focus(): Promise<any>;
  /**
   * 失去焦点
   */
  blur(): Promise<any>;
}