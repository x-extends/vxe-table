import Vue from 'vue';

import { Table } from './table';
import { Column, ColumnConfig } from './column';
import { Grid } from './grid';
import { Toolbar } from './toolbar';
import { Pager } from './pager';
import { Checkbox } from './checkbox';
import { Radio } from './radio';
import { Input } from './input';
import { Textarea } from './textarea';
import { Button } from './button';
import { Select } from './select';
import { Modal, XModal } from './modal';
import { Tooltip } from './tooltip';
import { Form } from './form';

import { Header } from './extends/header';
import { Footer } from './extends/footer';
import { Icon } from './extends/icon';
import { Filter } from './extends/filter';
import { Menu } from './extends/menu';
import { Edit } from './extends/edit'
import { Export } from './extends/export';
import { Keyboard } from './extends/keyboard';
import { Validator } from './extends/validator';
import { Resize } from './extends/resize';

export interface VXETableOptions {
  i18n?(key: string, value: any): any;
  [key: string]: any;
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

export interface Commands {
  mixin(map: object): Commands;
  get(type: string): Function;
  add(type: string, callback: Function): Commands;
  delete(type: object): Commands;
}

export interface Formats {
  mixin(map: object): Formats;
  get(type: string): Function;
  add(type: string, callback: Function): Formats;
  delete(type: object): Formats;
}

export interface PluginObject<T> {
  install(xTable: typeof VXETable): any;
}

export function install(vue: typeof Vue): void;
export function t(obj: object, key: string): string | number;
export function setup(options?: VXETableOptions): any;
export function use(plugin: PluginObject<any>, ...options: any[]): VXETableStatic;

export const interceptor: Interceptor;
export const renderer: Renderer;
export const menus: Menus;
export const commands: Commands;
export const formats: Formats;

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
   * 全局的模态窗口
   */
  $modal: XModal;
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
   * 设置全局参数/获取所有参数
   * @param options 参数
   */
  setup(options?: VXETableOptions): any;
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
   * 全局指令
   */
  commands: Commands;
  /**
   * 全局格式化
   */
  formats: Formats;
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
  Column,
  ColumnConfig,
  Grid,
  Menu,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Textarea,
  Button,
  Select,
  Modal,
  Tooltip,
  Form,

  Icon,
  Header,
  Footer,
  Filter,
  Edit,
  Export,
  Keyboard,
  Validator,
  Resize
}

export default VXETable