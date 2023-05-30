import { VxeTableConstructor, VxeTableDefines, VxeTableDataRow, VxeTablePrivateMethods } from '../table'
import { VxeGridConstructor } from '../grid'
import { VxeGlobalRendererHandles } from './renderer'

/* eslint-disable no-use-before-define */

export namespace VxeGlobalMenusHandles {
  export type MenusCallback<D = VxeTableDataRow> = (params: MenusCallbackParams<D>, event: Event) => any

  interface MenusParams<D = VxeTableDataRow> {
    $grid: VxeGridConstructor<D> | null
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
  }
  export interface MenusCallbackParams<D = VxeTableDataRow> extends MenusParams<D>, VxeGlobalRendererHandles.RenderCellParams<D> {
    $grid: VxeGridConstructor<D> | null
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $event: MouseEvent
    menu: VxeTableDefines.MenuFirstOption | VxeTableDefines.MenuChildOption
  }
}

/**
 * 全局快捷菜单
 */
export interface VxeGlobalMenus {
  mixin(options: {
    [code: string]: VxeGlobalMenusHandles.MenusCallback<any>
  }): VxeGlobalMenus
  has(code: string): boolean
  get(code: string): VxeGlobalMenusHandles.MenusCallback<any>
  add(code: string, callback: VxeGlobalMenusHandles.MenusCallback<any>): VxeGlobalMenus
  delete(code: string): void
  forEach(callback: (options: VxeGlobalMenusHandles.MenusCallback<any>, code: string) => void): void
}
