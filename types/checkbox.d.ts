import { VXETableComponent } from './component'

/**
 * 复选框
 */
export declare class Checkbox extends VXETableComponent {
  /**
   * 绑定值
   */
  value?: boolean;
  /**
   * 只对 checkbox-group 有效，值
   */
  label?: string | number;
  /**
   * 是否不确定状态
   */
  indeterminate?: boolean;
  /**
   * 原生 title 属性
   */
  title?: string | number;
  /**
   * 内容
   */
  content?: string | number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
}
