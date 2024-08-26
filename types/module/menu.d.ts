import { VXETableComponent } from '../component'
import { ColumnCellRenderParams } from '../v-x-e-table'

/* eslint-disable no-use-before-define */

/**
 * 表格模块 - 快捷菜单
 */
export declare class VxeTableMenuModule extends VXETableComponent {}

/**
 * 表格模块 - 快捷菜单
 */
export declare class Menu extends VXETableComponent {}

export interface MenuOptions {
  disabled?: boolean;
  options?: MenuFirstOption[][];
}

export interface MenuFirstOption {
  code?: string;
  name?: string;
  prefixConfig?: {
    icon?: string
    content?: string
    className?: string
  }
  /**
   * 请使用 prefixConfig
   * @deprecated
   */
  prefixIcon?: string
  suffixConfig?: {
    icon?: string
    content?: string
    className?: string
  }
  /**
   * 请使用 suffixConfig
   * @deprecated
   */
  suffixIcon?: string
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
  prefixConfig?: {
    icon?: string
    content?: string
    className?: string
  }
  /**
   * 请使用 prefixConfig
   * @deprecated
   */
  prefixIcon?: string
  suffixConfig?: {
    icon?: string
    content?: string
    className?: string
  }
  /**
   * 请使用 suffixConfig
   * @deprecated
   */
  suffixIcon?: string
  className?: string;
  visible?: boolean;
  disabled?: boolean;
  params?: any;
  [key: string]: any;
}

export interface MenuLinkParams extends ColumnCellRenderParams {
  $event: MouseEvent;
  menu: MenuFirstOption | MenuChildOption;
}
