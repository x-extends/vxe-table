import { VXETableComponent } from './component'

/**
 * 组件 - 下拉框选项
 */
export interface Option extends VXETableComponent {
  /**
   * 绑定值
   */
  value?: any;
  /**
   * 显示内容
   */
  label?: string | number | boolean;
  /**
   * 是否禁用
   */
  visible?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
}
