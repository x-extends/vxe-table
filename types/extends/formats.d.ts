import { ColumnInfo } from '../column'

declare function formatsFunc(params: FormatsParams, ...args: any[]): any;

/**
 * 全局格式化
 */
export class formats {
  mixin(map: { [type: string]: typeof formatsFunc }): formats;
  get(type: string): typeof formatsFunc;
  add(type: string, callback: typeof formatsFunc): formats;
  delete(type: string): formats;
}

export interface FormatsParams {
  cellValue: any;
  row: any,
  column: ColumnInfo;
}
