import { VXETableModule } from './component'
import { Form } from './form'
import { RenderParams, RenderOptions } from './extends/renderer'

/**
 * 表单 - 项
 */
export class FormItem extends VXETableModule {
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
  titlePrefix?: ItemTitleOptions;
  /**
   * 后缀配置项
   */
  titleSuffix?: ItemTitleOptions;
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
  itemRender?: ItemRenderOptions;
}

export interface ItemOptions {
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
  titlePrefix?: ItemTitleOptions;
  /**
   * 后缀配置项
   */
  titleSuffix?: ItemTitleOptions;
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
  itemRender?: ItemRenderOptions;
}

export interface ItemTitleOptions {
  message?: string;
  enterable?: boolean;
  theme?: string;
  icon?: string;
}

/**
 * 项渲染配置项
 */
export interface ItemRenderOptions extends RenderOptions {
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: any[];
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: { value?: string, label?: string, disabled?: string };
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: any[];
  /**
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: { options?: string, label?: string };
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
export interface ItemRenderParams extends RenderParams {
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
export interface ItemVisibleParams extends RenderParams {
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
export interface ItemResetParams extends RenderParams {
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
