import { VXETableComponent } from './component'
import { VxeGlobalRendererHandles } from './v-x-e-table'

/**
 * 表格扩展 - 快捷菜单
 */
export interface Menu extends VXETableComponent { }

export interface TableMenuMethods {
  /**
   * 手动关闭快捷菜单
   */
  closeMenu(): Promise<any>;
}

export interface TableMenuPrivateMethods {
  moveCtxMenu(evnt: any, keyCode: any, ctxMenuStore: any, property: any, operKey: any, operRest: any, menuList: any): void;
  handleGlobalContextmenuEvent(evnt: any): void;
  ctxMenuMouseoverEvent(evnt: any, item: any, child?: any): void;
  ctxMenuMouseoutEvent(evnt: any, item: any): void;
  ctxMenuLinkEvent(evnt: any, menu: any): void;
}

declare module './table' {
  interface VxeTableMethods extends TableMenuMethods { }
  interface VxeTablePrivateMethods extends TableMenuPrivateMethods { }
  namespace VxeTableDefines {
    export interface MenuOptions {
      disabled?: boolean;
      options?: MenuFirstOption[][];
    }
    export interface MenuFirstOption {
      code?: string;
      name?: string;
      prefixIcon?: string;
      suffixIcon?: string;
      className?: string;
      visible?: boolean;
      disabled?: boolean;
      children?: MenuChildOption[];
      params?: any;
      [key: string]: any;
    }
    export interface MenuChildOption {
      code?: string;
      name?: string;
      prefixIcon?: string;
      className?: string;
      visible?: boolean;
      disabled?: boolean;
      params?: any;
      [key: string]: any;
    }
  }
}
