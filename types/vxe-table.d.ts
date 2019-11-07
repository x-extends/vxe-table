import Vue from 'vue';
import { Table } from './table';
import { Icon } from './icon';
import { Column } from './column';
import { Header } from './header';
import { Body } from './body';
import { Footer } from './footer';
import { Filter } from './filter';
import { Loading } from './loading';
import { Grid } from './grid';
import { Excel } from './excel';
import { Menu } from './menu';
import { Toolbar } from './toolbar';
import { Pager } from './pager';
import { Checkbox } from './checkbox';
import { Radio } from './radio';
import { Input } from './input';
import { Button } from './button';
import { Modal } from './modal';
import { Export } from './export';
import { Resize } from './resize';

export interface VXETableOptions {
  showOverflow?: boolean;
  showHeaderOverflow?: boolean;
  resizeInterval?: number;
  size?: string;
  validConfig?: object;
  resizable?: boolean;
  stripe?: boolean;
  border?: boolean;
  fit?: boolean;
  emptyCell?: string;
  showHeader?: boolean;
  rowId?: string;
  version?: string | number;
  optimization?: object;
  icon?: object;
  grid?: object;
  menu?: object;
  tooltip?: object;
  pager?: object;
  toolbar?: object;
  message?: object;
  i18n?(key: string, value: any): any;
}

export interface Interceptor {
  mixin(map: object): Interceptor;
  get(type: string): any;
  add(type: string, callback: Function): Interceptor;
  delete(type: object): Interceptor;
}

export interface Renderer {
  mixin(map: object): Renderer;
  get(name: string): any;
  add(name: string, options: object): Renderer;
  delete(name: object): Renderer;
}

export interface Menus {
  mixin(map: object): Menus;
  get(type: string): Function;
  add(type: string, callback: Function): Menus;
  delete(type: object): Menus;
}

export interface Buttons {
  mixin(map: object): Buttons;
  get(type: string): Function;
  add(type: string, callback: Function): Buttons;
  delete(type: object): Buttons;
}

export interface PluginObject<T> {
  install(xTable: typeof VXETable): any;
}

export function install(vue: typeof Vue): void;
export function t(obj: object, key: string): string | number;
export function setup(options: VXETableOptions): any;
export function use(plugin: PluginObject<any>, ...options: any[]): VXETableStatic;

export const interceptor: Interceptor;
export const renderer: Renderer;
export const menus: Menus;
export const buttons: Buttons;

export interface VXETableStatic {
  install(vue: typeof Vue): void;
  Vue: typeof Vue;
  Table: any;
  Grid: any;
  /**
   * Filter 模块的安装状态
   */
  _filter: number;
  /**
   * Menu 模块的安装状态
   */
  _menu: number;
  /**
   * Export 模块的安装状态
   */
  _export: number;
  /**
   * Resize 模块的安装状态
   */
  _resize: number;
  /**
   * Modal 模块的安装状态
   */
  _modal: number;
  /**
   * Tooltip 模块的安装状态
   */
  _tooltip: number;
  /**
   * 版本号
   */
  v: string;
  /**
   * 支持导出的文件类型
   */
  types: string[];
  /**
   * 读取内置国际化
   */
  t(key: string): any;
  /**
   * 设置全局参数
   * @param options
   */
  setup(options: VXETableOptions): any;
  /**
   * Installing a plug-in
   * @param plugin 
   * @param options
   */
  use(plugin: PluginObject<any>, ...options: any[]): VXETableStatic;
  /**
   * 事件冲突拦截器
   */
  interceptor: Interceptor;
  /**
   * 渲染器
   */
  renderer: Renderer;
  /**
   * 全局工具栏按钮
   */
  buttons: Buttons;
  /**
   * 全局快捷菜单
   */
  menus: Menus;
}

/**
 * A fully functional Vue table component.
 */
declare const VXETable: VXETableStatic;

export {
  VXETable,
  Table,
  Icon,
  Column,
  Header,
  Body,
  Footer,
  Filter,
  Loading,
  Grid,
  Excel,
  Menu,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Button,
  Modal,
  Export,
  Resize
}

export default VXETable