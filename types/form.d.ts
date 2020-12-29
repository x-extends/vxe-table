import { RenderFunction, SetupContext, ComponentPublicInstance, Ref } from 'vue'
import { VXETableComponent, VxeComponentInstance, VxeEvent, SizeType, ValueOf } from './component'
import { VxeFormItemOptions } from './form-item'

/**
 * 组件 - 表单
 */
export interface Form extends VXETableComponent { }

export type VxeFormInstance = ComponentPublicInstance<VxeFormProps, VxeFormConstructor>;

export interface VxeFormConstructor extends VxeComponentInstance, VxeFormMethods {
  props: VxeFormProps;
  context: SetupContext<VxeFormEmits>;
  reactData: FormReactData;
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
  formItems: any[];
}

export interface VxeFormOptions extends VxeFormProps, VxeFormListeners { }

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
  export type Items = VxeFormItemOptions[];

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
}

export interface VxeFormProps {
  size?: VxeFormPropTypes.Size;
  loading?: VxeFormPropTypes.Loading;
  data?: VxeFormPropTypes.Data;
  span?: VxeFormPropTypes.Span;
  align?: VxeFormPropTypes.Align;
  titleAlign?: VxeFormPropTypes.TitleAlign;
  titleWidth?: VxeFormPropTypes.TitleWidth;
  titleColon?: VxeFormPropTypes.TitleColon;
  titleAsterisk?: VxeFormPropTypes.TitleAsterisk;
  items?: VxeFormPropTypes.Items;
  rules?: VxeFormPropTypes.Rules;
  preventSubmit?: VxeFormPropTypes.PreventSubmit;
  validConfig?: VxeFormPropTypes.ValidConfig;
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
  getItems(): VxeFormItemOptions[];
  /**
   * 手动切换折叠状态
   */
  toggleCollapse(): Promise<any>;
}
export interface VxeFormMethods extends FormMethods { }

export interface FormPrivateMethods { }
export interface VxeFormPrivateMethods extends FormPrivateMethods { }

export namespace VxeFormDefines {
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
    type?: 'number' | 'string';
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

export interface VxeFormListeners {
  onToggleCollapse?: VxeFormEvents.ToggleCollapse;
  toggleCollapse?: VxeFormEvents.ToggleCollapse;

  onSubmit?: VxeFormEvents.Submit;
  submit?: VxeFormEvents.Submit;
  
  onSubmitInvalid?: VxeFormEvents.SubmitInvalid;
  submitInvalid?: VxeFormEvents.SubmitInvalid;
  
  onReset?: VxeFormEvents.Reset;
  reset?: VxeFormEvents.Reset;
}

export namespace VxeFormEvents {
  export type ToggleCollapse = (params: VxeFormDefines.ToggleCollapseEventParams) => void;
  export type Submit = (params: VxeFormDefines.SubmitEventParams) => void;
  export type SubmitInvalid = (params: VxeFormDefines.SubmitInvalidEventParams) => void;
  export type Reset = (params: VxeFormDefines.ResetEventParams) => void;
}
