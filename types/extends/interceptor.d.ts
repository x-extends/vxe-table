/**
 * 全局事件拦截器
 */
export class interceptor {
  mixin(map: object): interceptor;
  get(type: string): any;
  add(type: string, callback: Function): interceptor;
  delete(type: string): interceptor;
}
