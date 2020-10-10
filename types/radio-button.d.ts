import { VXETableComponent } from './component'

/**
 * 组件 - 单选框按钮
 */
export interface RadioButton extends VXETableComponent {
  /**
   * 显示内容
   */
  label?: string | number;
  /**
   * 显示内容
   */
  content?: string | number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
}
