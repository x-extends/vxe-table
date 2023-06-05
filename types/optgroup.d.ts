import { VXEComponent } from './component'
import { VxeOptionPropTypes } from './option'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 下拉框选项分组
 * @example import { VxeOptgroup } from 'vxe-table'
 */
export const VxeOptgroup: VXEComponent<VxeOptgroupProps>
/**
 * 组件 - 下拉框选项分组
 */
export const Optgroup: typeof VxeOptgroup

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

export interface VxeOptgroupSlots {
  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    [key: string]: any
  }) => any) | undefined
}
