import { VXETableComponent } from './component'
import { Form } from './form'
import { RenderParams, RenderOptions, OptionProps, OptionGroupProps } from './v-x-e-table'

/**
 * 表单 - 项
 */
export class FormItem extends VXETableComponent {
  /**
   * 标题
   */
  title?: string;
  /**
   * 字段名
   */
  field?: string;
  /**
   * 栅格占据的列数（共 24 分栏）
   */
  span?: string | number;
  /**
   * 内容对齐方式
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 标题对齐方式
   */
  titleAlign?: 'left' | 'center' | 'right';
  /**
   * 标题宽度
   */
  titleWidth?: string | number;
  /**
   * 前缀配置项
   */
  titlePrefix?: FormItemTitleOptions;
  /**
   * 后缀配置项
   */
  titleSuffix?: FormItemTitleOptions;
  /**
   * 重置时的默认值
   */
  resetValue?: any;
  /**
   * 该方法的返回值用来决定该项是否显示
   */
  visibleMethod?(params: { data: any, property: string }): boolean;
  /**
   * 默认收起
   */
  folding?: boolean;
  /**
   * 折叠节点
   */
  collapseNode?: boolean;
  /**
   * 项渲染配置项
   */
  itemRender?: FormItemRenderOptions;
}

export interface FormItemOptions {
  /**
   * 标题
   */
  title?: string;
  /**
   * 字段名
   */
  field?: string;
  /**
   * 栅格占据的列数（共 24 分栏）
   */
  span?: string | number;
  /**
   * 内容对齐方式
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 标题对齐方式
   */
  titleAlign?: 'left' | 'center' | 'right';
  /**
   * 标题宽度
   */
  titleWidth?: string | number;
  /**
   * 前缀配置项
   */
  titlePrefix?: FormItemTitleOptions;
  /**
   * 后缀配置项
   */
  titleSuffix?: FormItemTitleOptions;
  /**
   * 重置时的默认值
   */
  resetValue?: any;
  /**
   * 该方法的返回值用来决定该项是否显示
   */
  visibleMethod?(params: { data: any, property: string }): boolean;
  /**
   * 默认收起
   */
  folding?: boolean;
  /**
   * 折叠节点
   */
  collapseNode?: boolean;
  /**
   * 项渲染配置项
   */
  itemRender?: FormItemRenderOptions;
}

export interface FormItemTitleOptions {
  message?: string;
  enterable?: boolean;
  theme?: string;
  icon?: string;
}

/**
 * 项渲染配置项
 */
export interface FormItemRenderOptions extends RenderOptions {
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
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: OptionGroupProps;
  /**
   * 渲染组件的内容（需要渲染器支持）
   */
  content?: string;
  /**
   * 默认值（需要渲染器支持）
   */
  defaultValue?: any;
}

/**
 * 项渲染参数
 */
export interface FormItemRenderParams extends RenderParams {
  /**
   * 表单实例对象
   */
  $form: Form;
  /**
   * 表单数据
   */
  data: any;
  /**
   * 字段名
   */
  property: string;
}

/**
 * 项可视方法参数
 */
export interface FormItemVisibleParams extends RenderParams {
  /**
   * 表单实例对象
   */
  $form: Form;
  /**
   * 表单数据
   */
  data: any;
  /**
   * 字段名
   */
  property: string;
}

/**
 * 项重置方法参数
 */
export interface FormItemResetParams extends RenderParams {
  /**
   * 表单实例对象
   */
  $form: Form;
  /**
   * 表单数据
   */
  data: any;
  /**
   * 字段名
   */
  property: string;
}
