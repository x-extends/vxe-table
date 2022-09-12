import { VXEComponent } from './component'
import { VxeOptionProps, VxeOptionPropTypes } from './option'

/**
 * 组件 - 下拉框选项分组
 * @example import { VxeOptgroup } from 'vxe-table'
 */
export const VxeOptgroup: VXEComponent<VxeOptgroupProps>
/**
 * 组件 - 下拉框选项分组
 */
export const Optgroup: VXEComponent<VxeOptgroupProps>

export type VxeOptgroupProps = {
  /**
   * 显示内容
   */
  label?: VxeOptionPropTypes.Label
  /**
   * 是否禁用
   */
  visible?: VxeOptionPropTypes.Visible
  className?: VxeOptionPropTypes.ClassName
  /**
   * 是否禁用
   */
  disabled?: VxeOptionPropTypes.Disabled
}
