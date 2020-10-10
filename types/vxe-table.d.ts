import Vue from 'vue'

import { ModalController } from './modal'

import { PrintOptons } from './extends/export'
import { renderer } from './extends/renderer'
import { interceptor } from './extends/interceptor'
import { commands } from './extends/commands'
import { formats } from './extends/formats'
import { menus } from './extends/menus'

export interface VXETableOptions {
  i18n?(key: string, value: any): any;
  [key: string]: any;
}

export interface VXETableTypes {
  csv: number;
  html: number;
  xml: number;
  txt: number;
  [type: string]: number;
}

export interface VXETableStatic {
  /**
   * 版本号
   */
  v: string;
  /**
   * 导出/导出文件类型设置
   * 0只支持导出 1 支持导入导出
   */
  types: VXETableTypes;
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
   * 全局事件拦截器
   */
  interceptor: interceptor;
  /**
   * 全局渲染器
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
  /**
   * 全局的模态窗口
   */
  modal: typeof ModalController;
  /**
   * 全局打印
   */
  print(options: PrintOptons): any;
  /**
   * 安装插件
   * @param plugin 插件
   * @param options 参数
   */
  use(plugin: PluginObject, ...options: any[]): VXETableStatic;
  install(vue: typeof Vue, options?: VXETableOptions): void;
}

/**
 * 一个基于 vue 的 PC 端表格组件，支持增删改查、虚拟滚动、懒加载、快捷菜单、数据校验、树形结构、打印导出、表单渲染、数据分页、虚拟列表、模态窗口、自定义模板、渲染器、贼灵活的配置项、扩展接口等...  
 */
export declare const VXETable: VXETableStatic

export interface PluginObject {
  install(xTable: typeof VXETable): void;
  [key: string]: any;
}

export interface VXETableClipboard {
  text: string;
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
  modal: typeof ModalController;
  /**
   * 剪贴板
   */
  clipboard?: VXETableClipboard;
}

declare module 'vue/types/vue' {
  interface Vue {
    $vxe: VXETableByVueProperty;
  }
}

declare global {
  interface Window {
    VXETable: VXETableStatic;
  }
}

export * from './component'

export * from './table'
export * from './column'
export * from './grid'
export * from './toolbar'
export * from './pager'
export * from './checkbox'
export * from './radio'
export * from './input'
export * from './textarea'
export * from './button'
export * from './select'
export * from './modal'
export * from './tooltip'
export * from './form'
export * from './form-item'
export * from './switch'
export * from './list'

export * from './extends/renderer'
export * from './extends/interceptor'
export * from './extends/commands'
export * from './extends/formats'
export * from './extends/menus'
export * from './extends/header'
export * from './extends/footer'
export * from './extends/icon'
export * from './extends/filter'
export * from './extends/menu'
export * from './extends/edit'
export * from './extends/export'
export * from './extends/keyboard'
export * from './extends/validator'

export default VXETable
