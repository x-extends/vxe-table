import { ColumnConfig } from '../column'

/**
 * 表格校验
 */
export declare class Validator {}

export interface ColumnEditRule {
  required?: boolean;
  min?: number;
  max?: number;
  type?: 'number' | 'string';
  pattern?: string | RegExp;
  validator?(rule: ColumnEditRule, cellValue: any, callback: (e: Error) => any, params: { rules: ColumnEditRule[], row: any, column: ColumnConfig, rowIndex: number, columnIndex: number }): any;
  message?: string | Function;
  trigger?: 'blur' | 'change';
  maxWidth?: number;
}

export interface ColumnEditValidErrParams {
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
