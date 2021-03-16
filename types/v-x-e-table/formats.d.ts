import { ColumnInfo } from '../column'

declare function formatsFunc(params: FormatsParams, ...args: any[]): any;

/**
 * 全局格式化
 */
export class VxeGlobalFormats {
  mixin(map: { [type: string]: typeof formatsFunc }): VxeGlobalFormats;
  get(type: string): typeof formatsFunc;
  add(type: string, callback: typeof formatsFunc): VxeGlobalFormats;
  delete(type: string): VxeGlobalFormats;
}

export interface FormatsParams {
  cellValue: any;
  row: any,
  column: ColumnInfo;
}
