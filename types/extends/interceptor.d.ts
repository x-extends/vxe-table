import { Table } from '../table'
import { Grid } from '../grid'

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
