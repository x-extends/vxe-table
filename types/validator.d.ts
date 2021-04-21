import { VXEComponent } from './component'
import { VxeTableDefines, VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods } from './table'

/**
 * 表格扩展 - 校验模块
 */
export const Validator: VXEComponent<{}>;

export interface TableValidatorMethods {
  /**
   * 手动清除校验
   */
  clearValidate(): Promise<any>;
  /**
   * 完整校验，默认校验当前表格数据，和 validate 的区别就是默认校验当前表格数据并且给有效数据中的每一行进行校验
   * @param rows 指定行
   * @param callback 回调函数
   */
  fullValidate(rows?: boolean | object | any[] | ((errMap: VxeTableDefines.ValidatorErrorMapParams) => void), callback?: (errMap: VxeTableDefines.ValidatorErrorMapParams) => void): Promise<VxeTableDefines.ValidatorErrorMapParams>;
  /**
   * 快速校验，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）；
   * 如果第一个参数为 true 则校验当前表格数据，如果指定 row 或 rows 则校验指定一行或多行，如果不指定数据，则默认只校验临时变动的数据，例如新增或修改。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise
   * @param rows 指定行
   * @param callback 回调函数
   */
  validate(rows?: boolean | object | any[] | ((errMap?: VxeTableDefines.ValidatorErrorMapParams) => void), callback?: (errMap?: VxeTableDefines.ValidatorErrorMapParams) => void): Promise<VxeTableDefines.ValidatorErrorMapParams>;
}

export interface TableValidatorPrivateMethods {
  validCellRules(type: any, row: any, column: any, val?: any): Promise<any>;
  hasCellRules(type: any, row: any, column: any): boolean;
  triggerValidate(type: any): Promise<any>;
  showValidTooltip(params: any): void;
}

declare module './grid' {
  interface VxeGridMethods extends TableValidatorMethods { }
}

declare module './table' {
  interface VxeTableMethods extends TableValidatorMethods { }
  interface VxeTablePrivateMethods extends TableValidatorPrivateMethods { }
  namespace VxeTableDefines {
    export interface ValidatorRule {
      /**
       * 是否必填
       */
      required?: boolean;
      /**
       * 最小长度/值
       */
      min?: number | string;
      /**
       * 最大长度/值
       */
      max?: number | string;
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
      validator?(params: VxeTableDefines.ValidatorErrorParams): void | Error | Promise<void>;
      /**
       * 提示消息
       */
      message?: string;
      trigger?: 'blur' | 'change';
      maxWidth?: number;
    }
    export interface ValidatorErrorParams {
      $table: VxeTableConstructor;
      cellValue: any;
      rule: ValidatorRule;
      rules: ValidatorRule[];
      column: VxeTableDefines.ColumnInfo;
      columnIndex: number;
      row: any;
      rowIndex: number;
    }
    export interface ValidatorErrorMapParams {
      [key: string]: VxeTableDefines.ValidatorErrorParams[];
    }
  }
}
