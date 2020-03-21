/**
 * 全局快捷菜单
 */
export class menus {
  mixin(map: object): menus;
  get(type: string): Function;
  add(type: string, callback: Function): menus;
  delete(type: string): menus;
}
