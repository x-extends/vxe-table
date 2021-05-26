import { VXETableComponent } from './component'
import { ColumnCellRenderParams } from './v-x-e-table'

/**
 * 快捷菜单
 */
export declare class Menu extends VXETableComponent {}

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

export interface MenuLinkParams extends ColumnCellRenderParams {
  $event: MouseEvent;
  menu: MenuFirstOption | MenuChildOption;
}
