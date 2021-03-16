import { MenuLinkParams } from '../menu'

declare function menuFunc (params: MenuLinkParams, event: any): any;

/**
 * 全局快捷菜单
 */
export class VxeGlobalMenus {
  mixin(map: { [type: string]: typeof menuFunc }): VxeGlobalMenus;
  get(type: string): typeof menuFunc;
  add(type: string, callback: typeof menuFunc): VxeGlobalMenus;
  delete(type: string): VxeGlobalMenus;
}
