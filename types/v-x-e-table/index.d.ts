import { App } from 'vue'

import { ModalController } from '../modal'
import { SaveFileFunction, ReadFileFunction, PrintFunction } from '../export'

import { VxeGlobalRenderer } from './renderer'
import { VxeGlobalInterceptor } from './interceptor'
import { VxeGlobalCommands } from './commands'
import { VxeGlobalFormats } from './formats'
import { Menus } from './menus'
import { VxeGlobalHooks } from './hooks'
import { VXETableSetupOptions, VxeGlobalSetup } from './setup'

export class VXETableInstance {
  /**
   * 版本号
   */
  public readonly v: string;
  /**
   * 获取导出的所有文件类型
   */
  public readonly exportTypes: string[];
  /**
   * 获取导入的所有文件类型
   */
  public readonly importTypes: string[];
  /**
   * 读取内置国际化
   */
  public t(key: string, args?: any): any;
  /**
   * 设置全局参数/获取所有参数
   */
  public setup: VxeGlobalSetup;
  /**
   * Table interceptor
   */
  public readonly interceptor: VxeGlobalInterceptor;
  /**
   * Table renderer
   */
  public readonly renderer: VxeGlobalRenderer;
  /**
   * Table commands
   */
  public readonly commands: VxeGlobalCommands;
  /**
   * Table column formatter
   */
  public readonly formats: VxeGlobalFormats;
  /**
   * Table context menu
   */
  public readonly menus: Menus;
  /**
   * Table VxeGlobalHooks API
   */
  public readonly hooks: VxeGlobalHooks;
  /**
   * 模态窗口
   */
  public readonly modal: ModalController;
  /**
   * 读取本地文件
   */
  public saveFile: SaveFileFunction;
  /**
   * 读取本地文件
   */
  public readFile: ReadFileFunction;
  /**
   * 打印
   */
  public print: PrintFunction;

  public use(plugin: PluginObject, ...options: any[]): VXETableInstance;
  public install(app: App, options?: VXETableSetupOptions): void;
}

/**
 * 一个基于 vue 的 PC 端表格组件，支持增删改查、虚拟滚动、懒加载、快捷菜单、数据校验、树形结构、打印导出、表单渲染、数据分页、虚拟列表、模态窗口、自定义模板、渲染器、贼灵活的配置项、扩展接口等...  
 */
export const VXETable: VXETableInstance

export interface PluginObject {
  install(vxetable: VXETableInstance): void;
  [key: string]: any;
}

export interface VXETableClipboard {
  text?: string;
  html?: string;
  [key: string]: any;
}

export interface VXETableByVueProperty {
  /**
   * 读取内置国际化
   */
  t(key: string): any;
  /**
   * 全局的模态窗口
   */
  modal: ModalController;
  /**
   * 剪贴板
   */
  clipboard?: VXETableClipboard;
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    $vxe: VXETableByVueProperty;
  }
}

export * from './renderer'
export * from './interceptor'
export * from './commands'
export * from './formats'
export * from './menus'
export * from './hooks'
export * from './setup'

export default VXETable
