import { App } from 'vue'

import { ModalController } from '../modal'
import { SaveFileFunction, ReadFileFunction, PrintFunction } from '../export'

import { VxeGlobalRenderer } from './renderer'
import { VxeGlobalInterceptor } from './interceptor'
import { VxeGlobalCommands } from './commands'
import { VxeGlobalFormats } from './formats'
import { VxeGlobalMenus } from './menus'
import { VxeGlobalHooks } from './hooks'
import { VxeGlobalSetup } from './setup'

export class VXETableConfig {
  clipboard: {
    text: string;
    html: string;
  }
  get zIndex(): number;
  get nextZIndex(): number;
  /**
   * 获取导出的所有文件类型
   */
   get exportTypes(): string[];
  /**
    * 获取导入的所有文件类型
    */
   get importTypes(): string[];
}

export type VxeGlobalI18n = (key: string, args?: any) => string;
export type VxeGlobalTranslate = (key: string, args?: any) => string;
export type VxeGlobalUse = (plugin: VXETablePluginObject, ...options: any[]) => VXETableCore;

export const setup: VxeGlobalSetup;
export const interceptor: VxeGlobalInterceptor;
export const renderer: VxeGlobalRenderer;
export const commands: VxeGlobalCommands;
export const formats: VxeGlobalFormats;
export const menus: VxeGlobalMenus;
export const hooks: VxeGlobalHooks;
export const modal: ModalController;
export const saveFile: SaveFileFunction;
export const readFile: ReadFileFunction;
export const print: PrintFunction;
export const config: VXETableConfig;
export const t: VxeGlobalI18n;
export const _t: VxeGlobalTranslate;
export const use: VxeGlobalUse;

export interface VXETablePluginObject {
  install(vxetable: VXETableCore, ...options: any[]): void;
  [key: string]: any;
}

export type VXETableVersion = 'v1' | 'v2' | 'v3' | 'v4'

export const v: VXETableVersion

export interface VXETableCore {
  tooltip?: boolean;
  v: VXETableVersion;
  /**
   * 设置全局参数/获取所有参数
   */
  setup: VxeGlobalSetup;
  /**
   * Table interceptor
   */
  interceptor: VxeGlobalInterceptor;
  /**
   * Table renderer
   */
  renderer: VxeGlobalRenderer;
  /**
   * Table commands
   */
  commands: VxeGlobalCommands;
  /**
   * Table column formatter
   */
  formats: VxeGlobalFormats;
  /**
   * Table context menu
   */
  menus: VxeGlobalMenus;
  /**
   * Table VxeGlobalHooks API
   */
  hooks: VxeGlobalHooks;
  /**
   * 弹窗
   */
  modal: ModalController;
  /**
   * 读取本地文件
   */
  saveFile: SaveFileFunction;
  /**
   * 读取本地文件
   */
  readFile: ReadFileFunction;
  /**
   * 打印
   */
  print: PrintFunction;
  /**
   * 读取内置配置
   */
  config: VXETableConfig;
  /**
   * 安装插件
   * @param plugin
   * @param options
   */
  use: VxeGlobalUse;
  /**
   * 读取内置国际化
   */
  t: VxeGlobalI18n;
  _t: VxeGlobalTranslate;
}

/**
 * 一个基于 vue 的 PC 端表格组件，支持增删改查、虚拟滚动、懒加载、快捷菜单、数据校验、树形结构、打印导出、表单渲染、数据分页、虚拟列表、弹窗、自定义模板、渲染器、贼灵活的配置项、扩展接口等...  
 */
export const VXETable: VXETableCore

export * from './renderer'
export * from './interceptor'
export * from './commands'
export * from './formats'
export * from './menus'
export * from './hooks'
export * from './setup'

export default VXETable
