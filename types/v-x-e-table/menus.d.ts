import { VxeTableDefines } from '../table'
import { VxeGlobalRendererHandles } from '../v-x-e-table';

export namespace VxeGlobalMenusHandles {
  export type MenusCallback = (params: MenusCallbackParams, event: Event) => any;
  export interface MenusCallbackParams extends VxeGlobalRendererHandles.RenderCellParams {
    menu: VxeTableDefines.MenuFirstOption | VxeTableDefines.MenuChildOption;
  }
}

/**
 * 全局快捷菜单
 */
export interface Menus {
  mixin(options: {
    [code: string]: VxeGlobalMenusHandles.MenusCallback;
  }): Menus;
  has(code: string): boolean;
  get(code: string): VxeGlobalMenusHandles.MenusCallback;
  add(code: string, callback: VxeGlobalMenusHandles.MenusCallback): Menus;
  delete(code: string): void;
  forEach(callback: (options: VxeGlobalMenusHandles.MenusCallback, code: string) => void): void;
}
