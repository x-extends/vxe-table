import { VxeTableConstructor, VxeTableDefines, VxeTableDataRow, VxeTablePrivateMethods } from '../table'
import { VxeGridConstructor } from '../grid'
import { VxeGlobalRendererHandles } from './renderer'

/* eslint-disable no-use-before-define */

export namespace VxeGlobalMenusHandles {
  export type MenusOption<D = VxeTableDataRow> = {
    menuMethod?: (params: MenuMethodParams<D>, event: Event) => any
  }
  interface MenusParams<D = VxeTableDataRow> {
    $grid: VxeGridConstructor<D> | null
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
  }
  export interface MenuMethodParams<D = VxeTableDataRow> extends MenusParams<D>, VxeGlobalRendererHandles.RenderCellParams<D> {
    $grid: VxeGridConstructor<D> | null
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $event: MouseEvent
    menu: VxeTableDefines.MenuFirstOption | VxeTableDefines.MenuChildOption
  }

  /**
   * 请使用 MenusOption
   * @deprecated
   */
  export type MenusCallback = MenusOption
  /**
   * 请使用 MenuMethodParams
   * @deprecated
   */
  export interface MenusCallbackParams<D = VxeTableDataRow> extends MenuMethodParams<D> {}
}

/**
 * 全局快捷菜单
 */
export interface VxeGlobalMenus {
  mixin(options: {
    [code: string]: VxeGlobalMenusHandles.MenusOption<any> | ((params: VxeGlobalMenusHandles.MenuMethodParams<any>, event: Event) => any)
  }): VxeGlobalMenus
  has(code: string): boolean
  get(code: string): VxeGlobalMenusHandles.MenusOption<any>
  add(code: string, options: VxeGlobalMenusHandles.MenusOption<any> | ((params: VxeGlobalMenusHandles.MenuMethodParams<any>, event: Event) => any)): VxeGlobalMenus
  delete(code: string): void
  forEach(callback: (options: VxeGlobalMenusHandles.MenusOption<any>, code: string) => void): void
}
