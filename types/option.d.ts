import { VXEComponent } from './component'
import { VxeSelectConstructor } from './select'

/**
 * 组件 - 下拉框选项
 * @example import { Option as VxeOption } from 'vxe-table'
 */
export const Option: VXEComponent<VxeOptionProps>;

export type VxeOptionProps = {
  /**
   * 绑定值
   */
  value?: VxeOptionPropTypes.Value;
  /**
   * 显示内容
   */
  label?: VxeOptionPropTypes.Label;
  /**
   * 是否显示
   */
  visible?: VxeOptionPropTypes.Visible;
  className?: VxeOptionPropTypes.ClassName;
  /**
   * 是否禁用
   */
  disabled?: VxeOptionPropTypes.Disabled;
}

export namespace VxeOptionPropTypes {
  export type Value = any;
  export type Label = string | number | boolean;
  export type Visible = boolean;
  export type ClassName = string | ((params: { option: any, $select: VxeSelectConstructor }) => string);
  export type Disabled = boolean;
}
