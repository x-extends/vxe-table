import { VXETableComponent } from './component'
import { ColumnCellRenderParams, RenderOptions, OptionProps, OptionGroupProps } from './v-x-e-table'

/**
 * 编辑
 */
export declare class Edit extends VXETableComponent {}

export interface ColumnEditSlotParams extends ColumnEditRenderParams {}

/**
 * 单元格编辑渲染参数
 */
export interface ColumnEditRenderParams extends ColumnCellRenderParams {}

/**
 * 编辑渲染配置项
 */
export interface ColumnEditRenderOptions extends RenderOptions {
  // /**
  //  * 渲染类型（可能废弃，不建议使用）
  //  */
  // type?: 'default' | 'visible';
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: any[];
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: OptionProps;
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: any[];
  /**
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: OptionGroupProps;
  /**
   * 指定聚焦的选择器（需要渲染器支持）
   */
  autofocus?: string;
  /**
   * 是否在激活编辑之后自动选中输入框内容（需要渲染器支持）
   */
  autoselect?: boolean;
  /**
   * 默认值（需要渲染器支持）
   */
  defaultValue?: any;
  /**
   * 输入值实时同步更新（需要渲染器支持）
   */
  immediate?: boolean;
  /**
   * 渲染组件的内容（需要渲染器支持）
   */
  content?: string;
}
