import { DefineComponent } from 'vue'
import { VXEComponentInstall } from './component'

/**
 * 组件 - 下拉框选项
 */
export const Option: VXEComponentInstall<DefineComponent>;

export interface VxeOptionOption {
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
