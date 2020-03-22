import { ColumnConfig } from '../column'

/**
 * 表格校验
 */
export declare class Validator {}

export interface EditRule {
  required?: boolean;
  min?: number;
  max?: number;
  type?: 'number' | 'string';
  pattern?: string | RegExp;
  validator?(rule: EditRule, cellValue: any, callback: (e: Error) => any, params: { rules: EditRule[], row: any, column: ColumnConfig, rowIndex: number, columnIndex: number }): any;
  message?: string | Function;
  trigger?: 'blur' | 'change';
  maxWidth?: number;
}
