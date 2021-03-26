import { VNode } from 'vue'
import { VXEComponent } from './component'
import { VxeFormConstructor, VxeFormDefines, VxeFormPropTypes } from './form'
import { VxeGlobalRendererHandles } from './v-x-e-table'

/**
 * 组件 - 表单项
 * @example import { FormItem as VxeFormItem } from 'vxe-table'
 */
export const FormItem: VXEComponent<VxeFormItemProps>;

export interface VxeFormItemProps {
  /**
   * 标题
   */
  title?: VxeFormItemPropTypes.Title;
  /**
   * 字段名
   */
  field?: VxeFormItemPropTypes.Field;
  /**
   * 栅格占据的列数（共 24 分栏）
   */
  span?: VxeFormItemPropTypes.Span;
  /**
   * 内容对齐方式
   */
  align?: VxeFormItemPropTypes.Align;
  /**
   * 标题对齐方式
   */
  titleAlign?: VxeFormItemPropTypes.TitleAlign;
  /**
   * 标题宽度
   */
  titleWidth?: VxeFormItemPropTypes.TitleWidth;
  /**
   * 给表单项附加 className
   */
  className?: VxeFormItemPropTypes.ClassName;
  /**
   * 前缀配置项
   */
  titlePrefix?: VxeFormItemPropTypes.TitlePrefix;
  /**
   * 后缀配置项
   */
  titleSuffix?: VxeFormItemPropTypes.TitleSuffix;
  titleOverflow?: VxeFormItemPropTypes.TitleOverflow;
  /**
   * 重置时的默认值
   */
  resetValue?: VxeFormItemPropTypes.ResetValue;
  /**
   * 是否显示
   */
  visible?: VxeFormItemPropTypes.Visible;
  /**
   * 该方法的返回值用来决定该项是否显示
   */
  visibleMethod?: VxeFormItemPropTypes.VisibleMethod
  /**
   * 默认收起
   */
  folding?: VxeFormItemPropTypes.Folding;
  /**
   * 折叠节点
   */
  collapseNode?: VxeFormItemPropTypes.CollapseNode;
  /**
   * 项渲染配置项
   */
  itemRender?: FormItemRenderOptions;
  slots?: VxeFormItemPropTypes.Slots;
  children?: VxeFormItemProps[];
}

export namespace VxeFormItemPropTypes {
  export type Title = string;
  export type Field = string;
  export type Span = VxeFormPropTypes.Span;
  export type Align = VxeFormPropTypes.Align;
  export type TitleAlign = VxeFormPropTypes.TitleAlign;
  export type TitleWidth = VxeFormPropTypes.TitleWidth;

  interface ClassNameParams {
    $form: VxeFormConstructor;
    data: any;
    item: VxeFormDefines.ItemInfo;
    property: string;
  }
  export type ClassName = string | ((params: ClassNameParams) => string);

  interface PrefixOption {
    message?: string;
    enterable?: boolean;
    theme?: string;
    icon?: string;
  }
  export type TitlePrefix = PrefixOption
  export type TitleSuffix = PrefixOption
  export type TitleOverflow = VxeFormPropTypes.TitleOverflow

  export type ResetValue = any;
  export type Visible = boolean;
  export type VisibleMethod = (params: FormItemVisibleParams) => boolean;
  export type Folding = boolean;
  export type CollapseNode = boolean;
  export type ItemRender = FormItemRenderOptions;
  export type Slots = {
    title?: string | ((params: FormItemTitleRenderParams) => JSX.Element[] | VNode[] | string[]) | null;
    default?: string | ((params: FormItemContentRenderParams) => JSX.Element[] | VNode[] | string[]) | null;
  }
}

/**
 * 项渲染配置项
 */
export interface FormItemRenderOptions extends VxeGlobalRendererHandles.RenderOptions {
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: any[];
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: VxeGlobalRendererHandles.RenderOptionProps;
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: any[];
  /**
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps;
  /**
   * 渲染组件的内容（需要渲染器支持）
   */
  content?: string;
  autofocus?: boolean;
  defaultValue?: any;
}

/**
 * 项标题渲染参数
 */
export interface FormItemTitleRenderParams {
  $form: VxeFormConstructor;
  data: any;
  item: VxeFormDefines.ItemInfo;
  property: string;
}

/**
 * 项内容渲染参数
 */
export interface FormItemContentRenderParams {
  $form: VxeFormConstructor;
  data: any;
  item: VxeFormDefines.ItemInfo;
  property: string;
}

/**
 * 项可视方法参数
 */
export interface FormItemVisibleParams {
  $form: VxeFormConstructor;
  data: any;
  item: VxeFormDefines.ItemInfo;
  property: string;
}

/**
 * 项重置方法参数
 */
export interface FormItemResetParams {
  $form: VxeFormConstructor;
  data: any;
  item: VxeFormDefines.ItemInfo;
  property: string;
}
