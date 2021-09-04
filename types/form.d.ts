import { VXETableComponent } from './component'
import { FormItemOptions } from './form-item'

/**
 * 表单
 */
export declare class Form extends VXETableComponent {
  loading?: boolean;
  data?: any;
  span?: string | number;
  align?: 'left' | 'center' | 'right';
  titleAlign?: 'left' | 'center' | 'right';
  titleWidth?: string | number;
  titleColon?: boolean;
  items?: FormItemOptions[];
  rules?: FormVaildRules;
  preventSubmit?: boolean;
  validConfig?: {
    autoPos?: boolean;
  };

  // methods
  /**
   * 重置表单
   */
  reset(): Promise<any>;
  /**
   * 对表单进行校验，参数为一个回调函数。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise
   * @param callback 回调函数
   */
  validate(callback?: (errMap?: FormValidErrMapParams) => void): Promise<any>;
  /**
   * 对表单执行项进行校验，参数为一个回调函数。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise
   * @param callback 回调函数
   */
   validateField(callback?: (errMap?: FormValidErrMapParams) => void): Promise<any>;
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
   * 获取表单项列表
   */
  getItems(): FormItemOptions[];
  /**
   * 手动切换折叠状态
   */
  toggleCollapse(): Promise<any>;
  [key: string]: any;
}

export function FormValidatorMethod(params: FormValidErrParams): void;
export function FormValidatorMethod(params: FormValidErrParams): Error;
export function FormValidatorMethod(params: FormValidErrParams): Promise<any>;

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
  validator?: typeof FormValidatorMethod;
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
  itemValue: any,
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
  preventSubmit?: boolean;
  validConfig?: {
    autoPos?: boolean;
  };
  [key: string]: any;
}
