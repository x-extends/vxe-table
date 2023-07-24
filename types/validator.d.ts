import { VXETableComponent } from './component'
import { ColumnInfo } from './column'
import { Table } from './table'

/* eslint-disable no-use-before-define */

/**
 * 表格校验
 */
export declare class Validator extends VXETableComponent {}

export interface ColumnEditRule {
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
  type?: 'number' | 'string' | '' | null;
  /**
   * 使用正则表达式校验
   */
  pattern?: string | RegExp;
  /**
   * 使用自定义校验函数，接收一个 Promise
   * @param params 参数
   */
  validator?: string | ((params: CellRuleValidatorParams) => void | Error | Promise<any>);
  /**
   * 提示消息
   */
  message?: string;
  trigger?: 'blur' | 'change' | 'manual' | '' | null;
  maxWidth?: number;
}

export interface CellRuleValidatorParams {
  $table: Table,
  cellValue: any,
  rule: ColumnEditRule;
  rules: ColumnEditRule[];
  column: ColumnInfo;
  columnIndex: number;
  row: any;
  rowIndex: number;
}

export function ColumnValidatorMethod(params: ColumnEditValidErrParams): void | Error | Promise<any>;

export interface ColumnEditValidErrParams {
  $table: Table,
  cellValue: any,
  rule: ColumnEditRule;
  rules: ColumnEditRule[];
  column: ColumnInfo;
  columnIndex: number;
  row: any;
  rowIndex: number;
}

export interface ColumnEditValidErrMapParams {
  [field: string]: ColumnEditValidErrParams[];
}
