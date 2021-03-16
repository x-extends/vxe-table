import { ColumnInfo } from '../column'
import { TableExportConfig } from '../export'
import { MenuFirstOption } from '../menu'
import { GridRenderParams } from './renderer'

declare function interceptorFunc(params: any, event: any): any;

/**
 * 全局事件拦截器
 */
export class VxeGlobalInterceptor {
  mixin(map: { [type: string]: typeof interceptorFunc }): VxeGlobalInterceptor;
  get(type: string): typeof interceptorFunc;
  add(type: string, callback: typeof interceptorFunc): VxeGlobalInterceptor;
  delete(type: string): VxeGlobalInterceptor;
}

export interface InterceptorParams extends GridRenderParams {
  $event: any;
}

export interface InterceptorKeydownParams extends InterceptorParams { }

export interface InterceptorExportParams extends InterceptorParams {
  options: TableExportConfig;
  columns: ColumnInfo[];
  colgroups: ColumnInfo[][];
  datas: any[];
}

export interface InterceptorImportParams extends InterceptorParams {
  file: File;
  options: TableExportConfig;
  columns: ColumnInfo[];
  datas: any[];
}

export interface InterceptorMenuParams extends InterceptorParams {
  type: 'header' | 'body' | 'footer';
  options: MenuFirstOption[][];
  columns: ColumnInfo[];
  row?: any;
  rowIndex?: number;
  column?: ColumnInfo;
  columnIndex?: number;
}
