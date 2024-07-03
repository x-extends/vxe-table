import { VxeTableConstructor, VxeTableDefines, VxeTableDataRow, VxeTablePrivateMethods } from '../table'
import { VxeGridConstructor } from '../grid'
import { VxeGlobalRendererHandles } from './renderer'

/* eslint-disable no-use-before-define */

export namespace VxeGlobalMenusHandles {
  export type MenusOption<D = VxeTableDataRow> = {
    /**
       * 已废弃，请使用 tableMenuMethod
       * @deprecated
       */
    menuMethod?: (params: MenuMethodParams<D>, event: Event) => any
    /**
       * 表格 - 自定义菜单方法
       */
    tableMenuMethod?: (params: MenuMethodParams<D>, event: Event) => any
  }
  export interface MenuMethodParams<D = VxeTableDataRow> extends VxeGlobalRendererHandles.RenderCellParams<D> {
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
  mixin(opts: {
    [code: string]: VxeGlobalMenusHandles.MenusOption<any> | ((params: VxeGlobalMenusHandles.MenuMethodParams<any>, event: Event) => any)
  }): VxeGlobalMenus
  has(code: string): boolean
  get(code: string): VxeGlobalMenusHandles.MenusOption<any>
  add(code: string, options: VxeGlobalMenusHandles.MenusOption<any> | ((params: VxeGlobalMenusHandles.MenuMethodParams<any>, event: Event) => any)): VxeGlobalMenus
  delete(code: string): void
  forEach(callback: (options: VxeGlobalMenusHandles.MenusOption<any>, code: string) => void): void
}
