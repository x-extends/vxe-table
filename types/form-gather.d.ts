import { VXEComponent } from './component'
import { VxeFormPropTypes } from './form'
import { VxeFormItemPropTypes } from './form-item'

/**
 * 组件 - 表单项集合
 * @example import { FormGather as VxeFormGather } from 'vxe-table'
 */
export const FormGather: VXEComponent<VxeFormGatherProps>;

export interface VxeFormGatherProps {
  /**
   * 栅格占据的列数（共 24 分栏）
   */
  span?: VxeFormItemPropTypes.Span;
  /**
   * 给表单项附加 className
   */
  className?: VxeFormItemPropTypes.ClassName;
}
