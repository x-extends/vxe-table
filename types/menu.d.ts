import { RenderFunction, SetupContext, Ref, ComponentPublicInstance } from 'vue'
import { VXEComponent, VxeComponentBase } from './component'
import { VxeGlobalRendererHandles } from './v-x-e-table'

/**
 * 表格扩展 - 快捷菜单
 */
export const Menu: VXEComponent<{}>;

export type VxeMenuPanelInstance = ComponentPublicInstance<VxeMenuPanelProps, VxeMenuPanelConstructor>;

export interface VxeMenuPanelConstructor extends VxeComponentBase, VxeMenuPanelMethods {
  props: VxeMenuPanelProps;
  context: SetupContext;
  getRefMaps(): MenuPanelPrivateRef;
  renderVN: RenderFunction;
}

export interface MenuPanelPrivateRef {
  refElem: Ref<HTMLDivElement>;
}
export interface VxeMenuPanelPrivateRef extends MenuPanelPrivateRef { }

export interface VxeMenuPanelMethods { }

export type VxeMenuPanelProps = { }

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

declare module './grid' {
  interface VxeGridMethods extends TableMenuMethods { }
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
