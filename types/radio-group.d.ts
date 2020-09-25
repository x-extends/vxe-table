import { VXETableComponent } from './component'

/**
 * 组件 - 单选框组
 */
export interface RadioGroup extends VXETableComponent {
  /**
   * 显示内容
   */
  label?: string | number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
}
