import { VXETableModule } from './component'
import { FormItemOptions } from './form-item'

/**
 * 表单
 */
export declare class Form extends VXETableModule {
  loading?: boolean;
  data?: any;
  span?: string | number;
  align?: 'left' | 'center' | 'right';
  titleAlign?: 'left' | 'center' | 'right';
  titleWidth?: string | number;
  titleColon?: boolean;
  items?: FormItemOptions[];
  rules?: FormVaildRules;

  // computed
  vSize?: string;

  // methods
  /**
   * 对表单进行校验，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
   * @param callback 回调函数
   */
  validate(callback?: (errMap?: FormValidErrMapParams) => void): Promise<any>;
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
  updateStatus(scope: any): Promise<any>;
  /**
   * 手动切换折叠状态
   */
  toggleCollapse(): Promise<any>;
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
  type?: 'number' | 'string';
  /**
   * 使用正则表达式校验
   */
  pattern?: string | RegExp;
  /**
   * 使用自定义校验函数
   * @param rule 当前校验的规则
   * @param itemValue 项的值
   * @param callback 回调函数，如果为空则校验成功，如果传 Error 对象则校验不通过
   * @param params 参数
   */
  validator?(
    rule: FormRule,
    itemValue: any,
    callback: (e?: Error) => void,
    params: FormValidErrParams
  ): void;
  /**
   * 提示消息
   */
  message?: string;
  trigger?: 'change';
  maxWidth?: number;
}

/**
 * 校验规则配置项
 */
export interface FormVaildRules {
  [field: string]: FormRule[];
}

export interface FormValidErrParams {
  $form: Form,
  rule: FormRule;
  rules: FormRule[];
  data: any;
  property: string;
}

export interface FormValidErrMapParams {
  [field: string]: FormValidErrParams[];
}

export interface FormOptions {
  loading?: boolean;
  data?: any;
  span?: string | number;
  size?: string;
  align?: 'left' | 'center' | 'right';
  titleAlign?: 'left' | 'center' | 'right';
  titleWidth?: string | number;
  titleColon?: boolean;
  items?: FormItemOptions[];
  rules?: FormVaildRules;
}
