/**
 * 渲染器
 */
export interface renderer {
  mixin(map: object): renderer;
  get(name: string): any;
  add(name: string, options: object): renderer;
  delete(name: string): renderer;
}

/**
 * 渲染器配置项
 */
export class RenderOptions {
  /**
   * 渲染器名称
   */
  name: string;
  /**
   * 目标组件渲染的参数
   */
  props?: { [key: string]: any };
  /**
   * 目标组件渲染的属性
   */
  attrs?: { [key: string]: any };
  /**
   * 目标组件渲染的事件
   */
  events?: { [key: string]: Function };
  [key: string]: any;
}

/**
 * 渲染参数
 */
export class RenderParams {}
