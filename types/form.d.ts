import { RenderFunction, SetupContext, ComponentPublicInstance, Ref } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf } from './component'
import { VxeFormItemProps, VxeFormItemPropTypes } from './form-item'

/**
 * 组件 - 表单
 * @example import { Form as VxeForm } from 'vxe-table'
 */
export const Form: VXEComponent<VxeFormProps, VxeFormEventProps>;

export type VxeFormInstance = ComponentPublicInstance<VxeFormProps, VxeFormConstructor>;

export interface VxeFormConstructor extends VxeComponentBase, VxeFormMethods {
  props: VxeFormProps;
  context: SetupContext<VxeFormEmits>;
  reactData: FormReactData;
  internalData: FormInternalData;
  getRefMaps(): FormPrivateRef;
  renderVN: RenderFunction;
}

export interface FormPrivateRef {
  refElem: Ref<HTMLFormElement>;
}
export interface VxeFormPrivateRef extends FormPrivateRef { }

export interface FormReactData {
  collapseAll: boolean;
  staticItems: any[];
  formItems: VxeFormDefines.ItemInfo[];
}

export interface FormInternalData {
  tooltipTimeout: any;
  tooltipActive: boolean;
  tooltipStore: {
    item: VxeFormDefines.ItemInfo | null;
    visible: boolean;
  }
}

export type VxeFormEmits = [
  'toggle-collapse',
  'submit',
  'submit-invalid',
  'reset'
]

export namespace VxeFormPropTypes {
  export type Size = SizeType;
  export type Loading = boolean;
  export type Data = any;
  export type Span = string | number;
  export type Align = 'left' | 'center' | 'right' | null;
  export type TitleAlign = Align;
  export type TitleWidth = string | number;
  export type TitleColon = boolean;
  export type TitleAsterisk = boolean;
  export type TitleOverflow = boolean | 'ellipsis' | 'title' | 'tooltip' | null;

  interface ClassNameParams {
    $form: VxeFormConstructor;
    data: any;
    items: VxeFormDefines.ItemInfo[];
  }
  export type ClassName = string | ((params: ClassNameParams) => string);

  export type Items = VxeFormItemProps[];

  /**
   * 校验规则配置项
   */
  export interface Rules {
    [field: string]: VxeFormDefines.FormRule[];
  }

  export type PreventSubmit = boolean;
  export type ValidConfig = {
    autoPos: boolean;
  };
  export interface ValidOpts extends ValidConfig { }

  /**
   * 提示信息配置项
   */
  export interface TooltipConfig {
    theme?: 'dark' | 'light';
    enterable?: boolean;
    leaveDelay?: number;
    leaveMethod?: (params: { $event: Event }) => boolean;
  }
  export interface TooltipOpts extends TooltipConfig { }
}

export type VxeFormProps<D = any> = {
  size?: VxeFormPropTypes.Size;
  loading?: VxeFormPropTypes.Loading;
  data?: D;
  span?: VxeFormPropTypes.Span;
  align?: VxeFormPropTypes.Align;
  titleAlign?: VxeFormPropTypes.TitleAlign;
  titleWidth?: VxeFormPropTypes.TitleWidth;
  titleColon?: VxeFormPropTypes.TitleColon;
  titleAsterisk?: VxeFormPropTypes.TitleAsterisk;
  titleOverflow?: VxeFormPropTypes.TitleOverflow;
  className?: VxeFormPropTypes.ClassName;
  items?: VxeFormPropTypes.Items;
  rules?: VxeFormPropTypes.Rules;
  preventSubmit?: VxeFormPropTypes.PreventSubmit;
  validConfig?: VxeFormPropTypes.ValidConfig;
  tooltipConfig?: VxeFormPropTypes.TooltipConfig;
}

export interface FormMethods {
  dispatchEvent(type: ValueOf<VxeFormEmits>, params: any, evnt: Event): void;
  /**
   * 重置表单
   */
  reset(): Promise<any>;
  /**
   * 对表单进行校验，参数为一个回调函数。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise
   * @param callback 回调函数
   */
  validate(callback?: (errMap?: VxeFormDefines.ValidateErrorMapParams) => void): Promise<any>;
  /**
   * 手动清除校验状态，如果指定 field 则清除指定的项，否则清除整个表单
   * @param field 字段名
   */
  clearValidate(field?: string): Promise<any>;
  /**
   * 更新项状态
   * 当使用自定义渲染时可能会用到
   * @param scope 插槽对象
   */
  updateStatus(scope: any, itemValue?: any): void;
  /**
   * 获取表单项列表
   */
  getItems(): VxeFormDefines.ItemInfo[];
  /**
   * 关闭 tooltip 提示
   */
  closeTooltip(): Promise<any>;
  /**
   * 手动切换折叠状态
   */
  toggleCollapse(): Promise<any>;
}
export interface VxeFormMethods extends FormMethods { }

export interface FormPrivateMethods { }
export interface VxeFormPrivateMethods extends FormPrivateMethods { }

export namespace VxeFormDefines {
  export class ItemInfo {
    id: string;

    title: VxeFormItemPropTypes.Title;
    field: VxeFormItemPropTypes.Field;
    span: VxeFormItemPropTypes.Span;
    align: VxeFormItemPropTypes.Align;
    titleAlign: VxeFormItemPropTypes.TitleAlign;
    titleWidth: VxeFormItemPropTypes.TitleWidth;
    titlePrefix: VxeFormItemPropTypes.TitlePrefix;
    titleSuffix: VxeFormItemPropTypes.TitleSuffix;
    titleOverflow: VxeFormItemPropTypes.TitleOverflow;
    resetValue: VxeFormItemPropTypes.ResetValue;
    visibleMethod: VxeFormItemPropTypes.VisibleMethod;
    visible: VxeFormItemPropTypes.Visible;
    folding: VxeFormItemPropTypes.Folding;
    collapseNode: VxeFormItemPropTypes.CollapseNode;
    className: VxeFormItemPropTypes.ClassName;
    itemRender: VxeFormItemPropTypes.ItemRender;
    // 渲染属性
    showError: boolean;
    errRule: any;
    slots: VxeFormItemPropTypes.Slots;
    children: ItemInfo[];
  }

  export interface FormRule {
    /**
     * 是否必填
     */
    required?: boolean;
    /**
     * 最小长度/值
     */
    min?: number;
    /**
     * 最大长度/值
     */
    max?: number;
    /**
     * 数据类型
     */
    type?: 'number' | 'string' | 'array';
    /**
     * 使用正则表达式校验
     */
    pattern?: string | RegExp;
    /**
     * 使用自定义校验函数，接收一个 Promise
     * @param params 参数
     */
    validator?(params: ValidateErrorParams): void | Error | Promise<any>;
    /**
     * 提示消息
     */
    message?: string;
    trigger?: 'change';
    maxWidth?: number;
  }

  interface ValidateErrorParams {
    $form: VxeFormConstructor,
    itemValue: any,
    rule: VxeFormDefines.FormRule;
    rules: VxeFormDefines.FormRule[];
    data: any;
    property: string;
  }

  export interface ValidateErrorMapParams {
    [field: string]: ValidateErrorParams[];
  }

  interface FormEventParams extends VxeEvent {
    $form: VxeFormConstructor;
  }

  interface FormBaseParams {
    data: any;
  }

  export interface ToggleCollapseParams extends FormBaseParams { }
  export interface ToggleCollapseEventParams extends FormEventParams, ToggleCollapseParams { }

  export interface SubmitParams extends FormBaseParams { }
  export interface SubmitEventParams extends FormEventParams, ToggleCollapseParams { }

  export interface SubmitInvalidParams extends FormBaseParams { }
  export interface SubmitInvalidEventParams extends FormEventParams, ToggleCollapseParams { }

  export interface ResetParams extends FormBaseParams { }
  export interface ResetEventParams extends FormEventParams, ToggleCollapseParams { }
}

export type VxeFormEventProps = {
  onToggleCollapse?: VxeFormEvents.ToggleCollapse;
  onSubmit?: VxeFormEvents.Submit;
  onSubmitInvalid?: VxeFormEvents.SubmitInvalid;
  onReset?: VxeFormEvents.Reset;
}

export interface VxeFormListeners {
  toggleCollapse?: VxeFormEvents.ToggleCollapse;
  submit?: VxeFormEvents.Submit;
  submitInvalid?: VxeFormEvents.SubmitInvalid;
  reset?: VxeFormEvents.Reset;
}

export namespace VxeFormEvents {
  export type ToggleCollapse = (params: VxeFormDefines.ToggleCollapseEventParams) => void;
  export type Submit = (params: VxeFormDefines.SubmitEventParams) => void;
  export type SubmitInvalid = (params: VxeFormDefines.SubmitInvalidEventParams) => void;
  export type Reset = (params: VxeFormDefines.ResetEventParams) => void;
}
