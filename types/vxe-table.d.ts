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
import { Menu } from './menu';
import { Toolbar } from './toolbar';
import { Pager } from './pager';
import { Checkbox } from './checkbox';
import { Radio } from './radio';
import { Input } from './input';
import { Button } from './button';
import { Modal } from './modal';
import { Edit } from './edit'
import { Export } from './export';
import { Keyboard } from './keyboard';
import { Validator } from './validator';
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
   * Edit 模块的安装状态
   */
  _edit: number;
  /**
   * Validator 模块的安装状态
   */
  _valid: number;
  /**
   * Export 模块的安装状态
   */
  _export: number;
  /**
   * Keyboard 模块的安装状态
   */
  _keyboard: number;
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
   * 导出/导出文件类型设置
   * 0只支持导出 1 支持导入导出
   */
  types: any;
  /**
   * 获取导出的所有文件类型
   */
  exportTypes: string[];
  /**
   * 获取导入的所有文件类型
   */
  importTypes: string[];
  /**
   * 读取内置国际化
   */
  t(key: string): any;
  /**
   * 设置全局参数
   * @param options 参数
   */
  setup(options: VXETableOptions): any;
  /**
   * 安装插件
   * @param plugin 插件
   * @param options 参数
   */
  use(plugin: PluginObject<any>, ...options: any[]): VXETableStatic;
  /**
   * 拦截器
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
 * 一个简单实用的 Vue 表组件
 */
declare const VXETable: VXETableStatic;

declare global {
  interface Window {
    VXETable: typeof VXETable;
  }
}

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
  Menu,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Button,
  Modal,
  Edit,
  Export,
  Keyboard,
  Validator,
  Resize
}

export default VXETable