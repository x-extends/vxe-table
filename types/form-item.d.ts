import { VXEComponent, VNodeStyle, SlotVNodeType } from './component'
import { VxeFormConstructor, VxeFormDefines, VxeFormPropTypes } from './form'
import { VxeGridConstructor } from './grid'
import { VxeTooltipPropTypes } from './tooltip'
import { VxeGlobalRendererHandles } from './v-x-e-table'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 表单项
 * @example import { VxeFormItem } from 'vxe-table'
 */
export const VxeFormItem: VXEComponent<VxeFormItemProps>
/**
 * 组件 - 表单项
 */
export const FormItem: typeof VxeFormItem

export interface VxeFormItemProps {
  /**
   * 标题
   */
  title?: VxeFormItemPropTypes.Title
  /**
   * 字段名
   */
  field?: VxeFormItemPropTypes.Field
  /**
   * 栅格占据的列数（共 24 分栏）
   */
  span?: VxeFormItemPropTypes.Span
  /**
   * 内容对齐方式
   */
  align?: VxeFormItemPropTypes.Align
  /**
   * 标题对齐方式
   */
  titleAlign?: VxeFormItemPropTypes.TitleAlign
  /**
   * 标题宽度
   */
  titleWidth?: VxeFormItemPropTypes.TitleWidth
  /**
   * 是否显示标题冒号
   */
  titleColon?: VxeFormItemPropTypes.TitleColon
  /**
   * 是否显示必填字段的红色星号
   */
  titleAsterisk?: VxeFormItemPropTypes.TitleAsterisk
  /**
   * 是否显示标题
   */
  showTitle?: VxeFormItemPropTypes.ShowTitle
  /**
   * 使用垂直布局
   */
  vertical?: VxeFormItemPropTypes.Vertical
  /**
   * 给表单项附加 className
   */
  className?: VxeFormItemPropTypes.ClassName
  /**
   * 给表单项内容附加 className
   */
  contentClassName?: VxeFormItemPropTypes.ContentClassName
  /**
   * 给表单项内容附加样式
   */
  contentStyle?: VxeFormItemPropTypes.ContentStyle
  /**
   * 给表单项标题附加 className
   */
  titleClassName?: VxeFormItemPropTypes.TitleClassName
  /**
   * 给表单项标题附加样式
   */
  titleStyle?: VxeFormItemPropTypes.TitleStyle
  /**
   * 前缀配置项
   */
  titlePrefix?: VxeFormItemPropTypes.TitlePrefix
  /**
   * 后缀配置项
   */
  titleSuffix?: VxeFormItemPropTypes.TitleSuffix
  titleOverflow?: VxeFormItemPropTypes.TitleOverflow
  /**
   * 重置时的默认值
   */
  resetValue?: VxeFormItemPropTypes.ResetValue
  /**
   * 是否显示
   */
  visible?: VxeFormItemPropTypes.Visible
  /**
   * 该方法的返回值用来决定该项是否显示
   */
  visibleMethod?: VxeFormItemPropTypes.VisibleMethod
  /**
   * 默认收起
   */
  folding?: VxeFormItemPropTypes.Folding
  /**
   * 折叠节点
   */
  collapseNode?: VxeFormItemPropTypes.CollapseNode
  /**
   * 项渲染配置项
   */
  itemRender?: FormItemRenderOptions
  rules?: VxeFormItemPropTypes.Rules
  slots?: VxeFormItemPropTypes.Slots
  children?: VxeFormItemProps[]
}

export namespace VxeFormItemPropTypes {
  export type Title = string
  export type Field = string
  export type Span = VxeFormPropTypes.Span
  export type Align = VxeFormPropTypes.Align
  export type TitleAlign = VxeFormPropTypes.TitleAlign
  export type TitleWidth = VxeFormPropTypes.TitleWidth
  export type TitleColon = VxeFormPropTypes.TitleColon
  export type TitleAsterisk = VxeFormPropTypes.TitleAsterisk
  export type ShowTitle = boolean
  export type Vertical = boolean

  interface ClassNameParams {
    $form: VxeFormConstructor
    data: any
    item: VxeFormDefines.ItemInfo
    field: string
    /**
     * @deprecated
     */
    property: string
  }
  export type ClassName = string | ((params: ClassNameParams) => string)

  interface ContentClassNameParams extends ClassNameParams{}
  export type ContentClassName = string | ((params: ContentClassNameParams) => string)

  interface ContentStyleParams extends ClassNameParams{}
  export type ContentStyle = VNodeStyle | ((params: ContentStyleParams) => VNodeStyle)

  interface TitleClassNameParams extends ClassNameParams{}
  export type TitleClassName = string | ((params: TitleClassNameParams) => string)

  interface TitleStyleParams extends ClassNameParams{}
  export type TitleStyle = VNodeStyle | ((params: TitleStyleParams) => VNodeStyle)

  export type Readonly = boolean

  interface PrefixOption {
    useHTML?: VxeTooltipPropTypes.UseHTML
    content?: VxeTooltipPropTypes.Content
    enterable?: VxeTooltipPropTypes.Enterable
    theme?: VxeTooltipPropTypes.Theme
    icon?: string
    /**
     * @deprecated 已废弃，请使用 content
     */
    message?: string
  }
  export type TitlePrefix = PrefixOption
  export type TitleSuffix = PrefixOption
  export type TitleOverflow = VxeFormPropTypes.TitleOverflow

  export type ResetValue = any
  export type Visible = boolean
  export type VisibleMethod = (params: FormItemVisibleParams) => boolean
  export type Folding = boolean
  export type CollapseNode = boolean
  export type ItemRender = FormItemRenderOptions
  export type Rules = VxeFormDefines.FormRule[]
  export type Slots = {
    title?: string | ((params: FormItemTitleRenderParams) => SlotVNodeType | SlotVNodeType[]) | null
    default?: string | ((params: FormItemContentRenderParams) => SlotVNodeType | SlotVNodeType[]) | null
  }
}

/**
 * 项渲染配置项
 */
export interface FormItemRenderOptions extends VxeGlobalRendererHandles.RenderOptions {
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: any[]
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: VxeGlobalRendererHandles.RenderOptionProps
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: any[]
  /**
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps
  /**
   * 渲染组件的内容（需要渲染器支持）
   */
  content?: string
  autofocus?: string
  defaultValue?: ((params: { item: VxeFormItemProps }) => any) | null | undefined | string | number | RegExp | object | any[] | Date
}

/**
 * 项标题渲染参数
 */
export interface FormItemTitleRenderParams {
  $form: VxeFormConstructor
  $grid: VxeGridConstructor | null
  data: any
  item: VxeFormDefines.ItemInfo
  field: string
  /**
   * @deprecated
   */
  property: string
}

/**
 * 项内容渲染参数
 */
export interface FormItemContentRenderParams {
  $form: VxeFormConstructor
  $grid: VxeGridConstructor | null
  data: any
  item: VxeFormDefines.ItemInfo
  field: string
  /**
   * @deprecated
   */
  property: string
}

/**
 * 项可视方法参数
 */
export interface FormItemVisibleParams {
  $form: VxeFormConstructor
  $grid: VxeGridConstructor | null
  data: any
  item: VxeFormDefines.ItemInfo
  field: string
  /**
   * @deprecated
   */
  property: string
}

/**
 * 项重置方法参数
 */
export interface FormItemResetParams {
  $form: VxeFormConstructor
  $grid: VxeGridConstructor | null
  data: any
  item: VxeFormDefines.ItemInfo
  field: string
  /**
   * @deprecated
   */
  property: string
}

export interface VxeFormItemSlots {
  /**
   * 自定义内容模板
   */
  default: (params: {
    [key: string]: any
  }) => any
  /**
   * 自定义标题模板
   */
  title: (params: {
    [key: string]: any
  }) => any
}
