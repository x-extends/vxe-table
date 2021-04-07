import { VXEComponent } from './component'
import { VxeOptionProps, VxeOptionPropTypes } from './option'

/**
 * 组件 - 下拉框选项分组
 * @example import { Optgroup as VxeOptgroup } from 'vxe-table'
 */
export const Optgroup: VXEComponent<VxeOptgroupProps>;

export type VxeOptgroupProps = {
  /**
   * 显示内容
   */
  label?: VxeOptionPropTypes.Label;
  /**
   * 是否禁用
   */
  visible?: VxeOptionPropTypes.Visible;
  className?: VxeOptionPropTypes.ClassName;
  /**
   * 是否禁用
   */
  disabled?: VxeOptionPropTypes.Disabled;
  options: VxeOptionProps[];
}
