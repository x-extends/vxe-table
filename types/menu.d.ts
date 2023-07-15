import { RenderFunction, SetupContext, Ref, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase } from './component'
import { VxeTableDataRow } from './table'

/* eslint-disable no-use-before-define */

/**
 * 表格扩展 - 快捷菜单
 */
export const VxeModuleMenu: VXEComponent<{ [key: string]: any }>
/**
 * 表格扩展 - 快捷菜单
 */
export const Menu: VXEComponent<{ [key: string]: any }>

export type VxeMenuPanelInstance = ComponentPublicInstance<VxeMenuPanelProps, VxeMenuPanelConstructor>

export interface VxeMenuPanelConstructor extends VxeComponentBase, VxeMenuPanelMethods {
  props: VxeMenuPanelProps
  context: SetupContext
  getRefMaps(): MenuPanelPrivateRef
  renderVN: RenderFunction
}

export interface MenuPanelPrivateRef {
  refElem: Ref<HTMLDivElement>
}
export interface VxeMenuPanelPrivateRef extends MenuPanelPrivateRef { }

export interface VxeMenuPanelMethods { }

export type VxeMenuPanelProps = {
  [key: string]: any
}

export interface TableMenuMethods<D = VxeTableDataRow> {
  /**
   * 手动关闭快捷菜单
   */
  closeMenu(): Promise<any>
}

export interface TableMenuPrivateMethods<D = VxeTableDataRow> {
  moveCtxMenu(evnt: any, ctxMenuStore: any, property: any, hasOper: boolean, operRest: any, menuList: any): void
  handleGlobalContextmenuEvent(evnt: any): void
  ctxMenuMouseoverEvent(evnt: any, item: any, child?: any): void
  ctxMenuMouseoutEvent(evnt: any, item: any): void
  ctxMenuLinkEvent(evnt: any, menu: any): void
}

declare module './grid' {
  export interface VxeGridMethods<D = VxeTableDataRow> extends TableMenuMethods<D> { }
}

declare module './table' {
  export interface VxeTableMethods<D = VxeTableDataRow> extends TableMenuMethods<D> { }
  export interface VxeTablePrivateMethods<D = VxeTableDataRow> extends TableMenuPrivateMethods<D> { }
  export namespace VxeTableDefines {
    export interface MenuOptions {
      disabled?: boolean
      options?: MenuFirstOption[][]
    }
    export interface MenuFirstOption {
      code?: string
      name?: string
      prefixIcon?: string
      suffixIcon?: string
      className?: string
      visible?: boolean
      disabled?: boolean
      children?: MenuChildOption[]
      params?: any
      [key: string]: any
    }
    export interface MenuChildOption {
      code?: string
      name?: string
      prefixIcon?: string
      className?: string
      visible?: boolean
      disabled?: boolean
      params?: any
      [key: string]: any
    }
  }
}
