import { MenuLinkParams } from './menu'

declare function menuFunc (params: MenuLinkParams, event: any): any;

/**
 * 全局快捷菜单
 */
export class menus {
  mixin(map: { [type: string]: typeof menuFunc }): menus;
  get(type: string): typeof menuFunc;
  add(type: string, callback: typeof menuFunc): menus;
  delete(type: string): menus;
}
