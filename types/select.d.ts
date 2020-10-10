import { VXETableModule } from './component'
import { OptionProps, OptionGroupProps } from './extends/renderer'

/**
 * 下拉框
 */
export declare class Select extends VXETableModule {
  /**
   * 绑定值
   */
  value?: any;
  /**
   * 当有值时，是否在右侧显示清除按钮
   */
  clearable?: boolean;
  /**
   * 空值显示的占位符
   */
  placeholder?: string;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 前缀图标
   */
  prefixIcon?: string;
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: { [key: string]: any }[];
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: OptionProps;
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: { [key: string]: any }[];
  /**
   * 下拉分组选项属性参数配置
   */
  optionGroupProps?: OptionGroupProps;
  /**
   * 固定显示下拉面板的方向
   */
  placement?: string;
  /**
   * 是否将弹框容器插入于 body 内
   */
  transfer?: boolean;

  /**
   * 获取焦点
   */
  focus(): Promise<any>;
  /**
   * 失去焦点
   */
  blur(): Promise<any>;
}
