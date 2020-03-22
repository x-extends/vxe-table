import { Table } from '../table'
import { Grid } from '../grid'

/**
 * 全局事件拦截器
 */
export class interceptor {
  mixin(map: { [type: string]: Function }): interceptor;
  get(type: string): Function;
  add(type: string, callback: Function): interceptor;
  delete(type: string): interceptor;
}

export interface InterceptorKeydownParams {
  $table: Table;
  $grid: Grid;
}
