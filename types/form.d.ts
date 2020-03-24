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
  validate(callback?: Function): Promise<any>;
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
  required?: boolean;
  min?: number;
  max?: number;
  type?: 'number' | 'string';
  pattern?: string | RegExp;
  validator?(rule: FormRule, cellValue: any, callback: (e: Error) => any, params: { rules: FormRule[], property: string }): any;
  message?: string | Function;
  trigger?: 'change';
  maxWidth?: number;
}

/**
 * 校验规则配置项
 */
export interface FormVaildRules {
  [field: string]: FormRule[];
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
