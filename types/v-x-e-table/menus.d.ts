import { VxeTableConstructor, VxeTableDefines, VxeTablePrivateMethods } from '../table'
import { VxeGridConstructor, VxeGridPrivateMethods } from '../grid'
import { VxeGlobalRendererHandles } from './renderer'

export namespace VxeGlobalMenusHandles {
  export type MenusCallback = (params: MenusCallbackParams, event: Event) => any

  interface MenusParams {
    $grid?: VxeGridConstructor & VxeGridPrivateMethods
    $table: VxeTableConstructor & VxeTablePrivateMethods
  }
  export interface MenusCallbackParams extends MenusParams, VxeGlobalRendererHandles.RenderCellParams {
    $event: MouseEvent
    menu: VxeTableDefines.MenuFirstOption | VxeTableDefines.MenuChildOption
  }
}

/**
 * 全局快捷菜单
 */
export interface VxeGlobalMenus {
  mixin(options: {
    [code: string]: VxeGlobalMenusHandles.MenusCallback
  }): VxeGlobalMenus
  has(code: string): boolean
  get(code: string): VxeGlobalMenusHandles.MenusCallback
  add(code: string, callback: VxeGlobalMenusHandles.MenusCallback): VxeGlobalMenus
  delete(code: string): void
  forEach(callback: (options: VxeGlobalMenusHandles.MenusCallback, code: string) => void): void
}
