import { ColumnConfig, CellRenderParams } from '../column'
import { GridRenderParams } from '../grid'

/**
 * 快捷菜单
 */
export declare class Menu {}

export interface MenuOptions {
  disabled?: boolean;
  options?: FirstMenuOption[][];
}

export interface FirstMenuOption {
  code?: string;
  name?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  className?: string;
  visible?: boolean;
  disabled?: boolean;
  children?: ChildMenuOption[];
  params?: any;
  [key: string]: any;
}

export interface ChildMenuOption {
  code?: string;
  name?: string;
  prefixIcon?: string;
  className?: string;
  visible?: boolean;
  disabled?: boolean;
  params?: any;
  [key: string]: any;
}

export interface MenuLinkParams extends CellRenderParams {
  menu: FirstMenuOption | ChildMenuOption;
}

export interface InterceptorMenuParams extends GridRenderParams {
  type: 'header' | 'body' | 'footer';
  options: FirstMenuOption[][];
  columns: ColumnConfig[];
  row?: any;
  rowIndex?: number;
  column?: ColumnConfig;
  columnIndex?: number;
}
