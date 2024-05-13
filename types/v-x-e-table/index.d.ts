import { ModalController } from '../modal'
import { SaveFileFunction, ReadFileFunction, PrintFunction } from '../module/export'

import { VxeGlobalRenderer } from './renderer'
import { VxeGlobalInterceptor } from './interceptor'
import { VxeGlobalCommands } from './commands'
import { VxeGlobalFormats } from './formats'
import { VxeGlobalMenus } from './menus'
import { VxeGlobalValidators } from './validators'
import { VxeGlobalConfigMethod } from './config'

/* eslint-disable no-use-before-define */

export type VxeGlobalI18n = (key: string, args?: any) => number | string;
export type VxeGlobalTranslate = (key: string, args?: any) => string;
export type VxeGlobalUse = (plugin: VXETablePluginObject, ...options: any[]) => VXETableCore;

export interface VxeGlobalStore {
  [key: string]: any
  clipboard?: {
    text: string
    html: string
  }
}
export const globalStore: VxeGlobalStore

export const config: VxeGlobalConfigMethod
export const setConfig: VxeGlobalConfigMethod
export const interceptor: VxeGlobalInterceptor
export const renderer: VxeGlobalRenderer
export const commands: VxeGlobalCommands
export const formats: VxeGlobalFormats
export const menus: VxeGlobalMenus
export const modal: ModalController
export const saveFile: SaveFileFunction
export const readFile: ReadFileFunction
export const print: PrintFunction
export const t: VxeGlobalI18n
export const _t: VxeGlobalTranslate
export const use: VxeGlobalUse

/**
 * 请使用 config
 * @deprecated
 */
export const setup: VxeGlobalConfigMethod

export interface VXETablePluginObject {
  install(vxetable: VXETableCore, ...options: any[]): void;
  [key: string]: any;
}

export type VXETableVersion = 'v1' | 'v2' | 'v3' | 'v4'

export const v: VXETableVersion

export interface VXETableCore {
  /**
   * 版本号
   */
  version: string;
  /**
   * 设置全局参数/获取所有参数
   */
  setConfig: VxeGlobalConfigMethod;
  /**
   * 读取内部数据
   */
  globalStore: VxeGlobalStore
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
   * Validators table/form
   */
  validators: VxeGlobalValidators
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

  config: VxeGlobalConfigMethod;
  /**
   * 已被 version 替换
   * @deprecated
   */
  v: VXETableVersion;
  /**
   * 请使用 config
   * @deprecated
   */
  setup: VxeGlobalConfigMethod;
}

/**
 * 一个基于 vue 的 PC 端表单/表格组件，支持增删改查、虚拟列表、虚拟树、懒加载、快捷菜单、数据校验、树形结构、打印导出、表单渲染、数据分页、弹窗、自定义模板、渲染器、JSON 配置式...
 */
export const VXETable: VXETableCore

export * from './renderer'
export * from './interceptor'
export * from './commands'
export * from './formats'
export * from './menus'
export * from './validators'
export * from './config'

export default VXETable
