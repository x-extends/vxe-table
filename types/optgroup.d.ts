import { VXETableComponent } from './component'

/**
 * 组件 - 下拉框选项分组
 */
export declare class VxeOptgroup extends VXETableComponent {
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
export class Optgroup extends VxeOptgroup {}
