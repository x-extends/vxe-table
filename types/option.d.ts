import { VXEComponent, SlotVNodeType } from './component'
import { VxeSelectConstructor } from './select'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 下拉框选项
 * @example import { VxeOption } from 'vxe-table'
 */
export const VxeOption: VXEComponent<VxeOptionProps>
/**
 * 组件 - 下拉框选项
 */
export const Option: typeof VxeOption

export type VxeOptionProps = {
  /**
   * 绑定值
   */
  value?: VxeOptionPropTypes.Value
  /**
   * 显示内容
   */
  label?: VxeOptionPropTypes.Label
  /**
   * 是否显示
   */
  visible?: VxeOptionPropTypes.Visible
  className?: VxeOptionPropTypes.ClassName
  /**
   * 是否禁用
   */
  disabled?: VxeOptionPropTypes.Disabled
  slots?: {
    default?: string | ((params: {
      option: any
      $select: VxeSelectConstructor
    }) => SlotVNodeType | SlotVNodeType[]) | null
  }

  [key: string]: any
}

export namespace VxeOptionPropTypes {
  export type Value = any
  export type Label = string | number | boolean
  export type Visible = boolean
  export type ClassName = string | ((params: {
    option: any
    $select: VxeSelectConstructor
  }) => string)
  export type Disabled = boolean
  export type Slots = {
    default?: string | ((params: {
      option: any
      $select: VxeSelectConstructor
    }) => SlotVNodeType | SlotVNodeType[]) | null
  }
}

export interface VxeOptionSlots {
  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    [key: string]: any
  }) => any) | undefined
}
