import { ColumnConfig } from '../column'
import { Table } from '../table'

/**
 * 表格校验
 */
export declare class Validator {}

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
  type?: 'number' | 'string';
  /**
   * 使用正则表达式校验
   */
  pattern?: string | RegExp;
  /**
   * 使用自定义校验函数
   * @param rule 当前校验的规则
   * @param cellValue 单元格的值
   * @param callback 回调函数，如果为空则校验成功，如果传 Error 对象则校验不通过
   * @param params 参数
   */
  validator?(
    rule: ColumnEditRule,
    cellValue: any,
    callback: (e?: Error) => void,
    params: ColumnEditValidErrParams
  ): void;
  /**
   * 提示消息
   */
  message?: string;
  trigger?: 'blur' | 'change';
  maxWidth?: number;
}

export interface ColumnEditValidErrParams {
  $table: Table,
  rule: ColumnEditRule;
  rules: ColumnEditRule[];
  column: ColumnConfig;
  columnIndex: number;
  row: any;
  rowIndex: number;
}

export interface ColumnEditValidErrMapParams {
  [field: string]: ColumnEditValidErrParams[];
}
