import { VXEComponent } from './component'
import { VxeFormItemPropTypes } from './form-item'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 表单项集合
 * @example import { VxeFormGather } from 'vxe-table'
 */
export const VxeFormGather: VXEComponent<VxeFormGatherProps>
/**
 * 组件 - 表单项集合
 */
export const FormGather: typeof VxeFormGather

export interface VxeFormGatherProps {
  /**
   * 栅格占据的列数（共 24 分栏）
   */
  span?: VxeFormItemPropTypes.Span
  /**
   * 给表单项附加 className
   */
  className?: VxeFormItemPropTypes.ClassName
}

export interface VxeFormGatherSlots {
  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    [key: string]: any
  }) => any) | undefined
}
