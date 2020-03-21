import { VXETableModule } from './component'
import { RenderParams, RenderOptions } from './extends/renderer'

/**
 * 表单
 */
export declare class Form extends VXETableModule {
  loading?: boolean;
  data?: any;
  span?: string | number;
  align?: string;
  titleAlign?: string;
  titleWidth?: string | number;
  titleColon?: boolean;
  items?: any[];
  rules?: Object;

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

/**
 * 项渲染配置项
 */
export class ItemRenderOptions extends RenderOptions {
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
