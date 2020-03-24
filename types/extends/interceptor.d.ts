import { Table } from '../table'
import { Grid, GridRenderParams } from '../grid'
import { ColumnConfig } from '../column'
import { ExportOptons } from './export'
import { MenuFirstOption } from './menu'

declare function interceptorFunc(params: any, event: any): any;

/**
 * 全局事件拦截器
 */
export class interceptor {
  mixin(map: { [type: string]: typeof interceptorFunc }): interceptor;
  get(type: string): typeof interceptorFunc;
  add(type: string, callback: typeof interceptorFunc): interceptor;
  delete(type: string): interceptor;
}

export interface InterceptorParams {
  $table: Table;
  $grid: Grid;
}

export interface InterceptorKeydownParams extends InterceptorParams { }

export interface InterceptorExportParams extends GridRenderParams {
  options: ExportOptons;
  columns: ColumnConfig[];
  datas: any[];
}

export interface InterceptorImportParams extends GridRenderParams {
  file: File;
  options: ExportOptons;
  columns: ColumnConfig[];
  datas: any[];
}

export interface InterceptorMenuParams extends GridRenderParams {
  type: 'header' | 'body' | 'footer';
  options: MenuFirstOption[][];
  columns: ColumnConfig[];
  row?: any;
  rowIndex?: number;
  column?: ColumnConfig;
  columnIndex?: number;
}
