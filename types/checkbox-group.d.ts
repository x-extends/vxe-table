import { VXETableComponent } from './component'

/**
 * 组件 - 复选框组
 */
export interface CheckboxGroup extends VXETableComponent {
  /**
   * 绑定值
   */
  value?: any[];
  /**
   * 是否禁用
   */
  disabled?: boolean;
}
