import { VXETableComponent } from './component'

/**
 * 组件 - 下拉框选项分组
 */
export interface Optgroup extends VXETableComponent {
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
