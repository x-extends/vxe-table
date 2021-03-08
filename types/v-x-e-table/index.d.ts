import { App } from 'vue'

import { ModalController } from '../modal'
import { SaveFileFunction, ReadFileFunction, PrintFunction } from '../export'

import { VxeGlobalRenderer } from './renderer'
import { VxeGlobalInterceptor } from './interceptor'
import { VxeGlobalCommands } from './commands'
import { VxeGlobalFormats } from './formats'
import { Menus } from './menus'
import { VxeGlobalHooks } from './hooks'
import { VxeGlobalSetup } from './setup'


export class VXETableConfig {
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

export const config: VXETableConfig;

export interface VXETablePluginObject {
  install(vxetable: VXETableCore, ...options: any[]): void;
  [key: string]: any;
}

export interface VXETableCore {
  v: string;
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
  menus: Menus;
  /**
   * Table VxeGlobalHooks API
   */
  hooks: VxeGlobalHooks;
  /**
   * 模态窗口
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
  use(plugin: VXETablePluginObject, ...options: any[]): VXETableCore;
  /**
   * 读取内置国际化
   */
  t(key: string, args?: any): number | string;
}

/**
 * 一个基于 vue 的 PC 端表格组件，支持增删改查、虚拟滚动、懒加载、快捷菜单、数据校验、树形结构、打印导出、表单渲染、数据分页、虚拟列表、模态窗口、自定义模板、渲染器、贼灵活的配置项、扩展接口等...  
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
