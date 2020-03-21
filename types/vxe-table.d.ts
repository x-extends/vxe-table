import Vue from 'vue'

import { Table, EmptyRender, TableRenderParams } from './table'
import { Column, CellRenderParams, EditRenderParams, FilterRenderParams, FilterMethodParams, ColumnConfig, CellRenderOptions, EditRenderOptions, FilterRenderOptions, ContentRenderOptions } from './column'
import { Grid } from './grid'
import { Toolbar } from './toolbar'
import { Pager } from './pager'
import { Checkbox } from './checkbox'
import { Radio } from './radio'
import { Input } from './input'
import { Textarea } from './textarea'
import { Button } from './button'
import { Select } from './select'
import { Modal, ModalController } from './modal'
import { Tooltip } from './tooltip'
import { Form, ItemRenderParams, ItemRenderOptions } from './form'

import { renderer, RenderParams, RenderOptions } from './extends/renderer'
import { interceptor } from './extends/interceptor'
import { commands } from './extends/commands'
import { formats } from './extends/formats'
import { menus } from './extends/menus'
import { Header } from './extends/header'
import { Footer } from './extends/footer'
import { Icon } from './extends/icon'
import { Filter } from './extends/filter'
import { Menu } from './extends/menu'
import { Edit } from './extends/edit'
import { Export } from './extends/export'
import { Keyboard } from './extends/keyboard'
import { Validator } from './extends/validator'
import { Resize } from './extends/resize'

export interface VXETableOptions {
  i18n?(key: string, value: any): any;
  [key: string]: any;
}

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
  $modal: ModalController;
  /**
   * 版本号
   */
  v: string;
  /**
   * 导出/导出文件类型设置
   * 0只支持导出 1 支持导入导出
   */
  types: { [type: string]: any };
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
  interceptor: interceptor;
  /**
   * 渲染器
   */
  renderer: renderer;
  /**
   * 全局指令
   */
  commands: commands;
  /**
   * 全局格式化
   */
  formats: formats;
  /**
   * 全局快捷菜单
   */
  menus: menus;
}

/**
 * 一个简单实用的 Vue 表组件
 */
declare const VXETable: VXETableStatic

export interface PluginObject<T> {
  install(xTable: typeof VXETable): any;
}

declare global {
  interface Window {
    VXETable: VXETableStatic;
  }
}

export {
  VXETable,
  renderer,
  RenderParams,
  RenderOptions,
  menus,
  formats,
  commands,
  interceptor,

  Table,
  EmptyRender,
  TableRenderParams,

  Column,
  ColumnConfig,
  CellRenderParams,
  EditRenderParams,
  FilterRenderParams,
  FilterMethodParams,
  CellRenderOptions,
  EditRenderOptions,
  FilterRenderOptions,
  ContentRenderOptions,

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
  ModalController,

  Tooltip,

  Form,
  ItemRenderParams,
  ItemRenderOptions,

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
