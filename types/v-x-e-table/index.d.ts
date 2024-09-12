import { SaveFileFunction, ReadFileFunction, PrintFunction } from '../module/export'
import { SizeType } from '../component'
import { VxeTableProps } from '../table'
import { VxeGridProps } from '../grid'
import { VxeToolbarProps } from '../toolbar'
import { VxeTooltipProps } from '../tooltip'
import { VxePagerProps } from '../pager'
import { VxeModalProps, ModalController } from '../modal'
import { VxeDrawerProps, DrawerController } from '../drawer'
import { VxeFormProps } from '../form'
import { VxeListProps } from '../list'
import { VxeSwitchProps } from '../switch'
import { VxeSelectProps } from '../select'
import { VxeInputProps } from '../input'
import { VxeTextareaProps } from '../textarea'
import { VxeButtonProps } from '../button'
import { VxeButtonGroupProps } from '../button-group'
import { VxeCheckboxProps } from '../checkbox'
import { VxeCheckboxGroupProps } from '../checkbox-group'
import { VxeRadioProps } from '../radio'
import { VxeRadioButtonProps } from '../radio-button'
import { VxeRadioGroupProps } from '../radio-group'

import { VxeGlobalRenderer } from './renderer'
import { VxeGlobalInterceptor } from './interceptor'
import { VxeGlobalCommands } from './commands'
import { VxeGlobalFormats } from './formats'
import { VxeGlobalMenus } from './menus'
import { VxeGlobalValidators } from './validators'
import { VxeGlobalHooks } from './hooks'

/* eslint-disable no-use-before-define */

export interface VXETableConfigOptions {
  /**
   * 扩展插件授权码
   */
  authId?: string
  onAuth?(event: {
    status: boolean
    code: number
    msg: string

    [key: string]: any
  }): void

  theme?: null | '' | 'default' | 'dark'

  size?: SizeType
  zIndex?: number
  version?: number
  emptyCell?: string
  icon?: VxeGlobalIcon
  table?: VxeTableProps
  grid?: VxeGridProps
  export?: {
    types?: {
      [key: string]: 0 | 1 | 2
    }
    [key: string]: any
  }
  tooltip?: VxeTooltipProps
  pager?: VxePagerProps
  form?: VxeFormProps
  input?: VxeInputProps
  textarea?: VxeTextareaProps
  select?: VxeSelectProps
  toolbar?: VxeToolbarProps
  button?: VxeButtonProps
  buttonGroup?: VxeButtonGroupProps
  radio?: VxeRadioProps
  radioButton?: VxeRadioButtonProps
  radioGroup?: VxeRadioGroupProps
  checkbox?: VxeCheckboxProps
  checkboxGroup?: VxeCheckboxGroupProps
  switch?: VxeSwitchProps
  modal?: VxeModalProps
  drawer?: VxeDrawerProps
  list?: VxeListProps
  translate?(key: string, args?: any): string
  i18n?(key: string, args?: any): string

  /**
   * 还原旧的单元格校验模式，已废弃
   * @deprecated
   */
  cellVaildMode?: 'obsolete' | '' | null

  [key: string]: any
}

export type VxeGlobalConfig = VXETableConfigOptions

export interface VxeGlobalIcon {
  [ket: string]: string
}

export type VxeGlobalConfigMethod = (options?: VXETableConfigOptions) => VXETableCore
export type VxeGlobalThemeMethod = (name?: '' | 'light' | 'dark') => VXETableCore
export type VxeGlobalGetThemeMethod = () => 'light' | 'dark'

/**
 * 请使用 setConfig
 * @deprecated
 */
export type VxeGlobalSetup = (options?: VXETableConfigOptions) => Required<VXETableConfigOptions>
/**
 * @deprecated
 */
export type VXETableGlobalConfig = (options?: VXETableConfigOptions) => Required<VXETableConfigOptions>
/**
 * 请使用 setConfig
 * @deprecated
 */
export type VXETableSetupOptions = (options?: VXETableConfigOptions) => Required<VXETableConfigOptions>

export class VXETableConfig {
  clipboard: {
    text: string
    html: string
  }

  get zIndex(): number
  get nextZIndex(): number
  /**
   * 获取导出的所有文件类型
   */
  get exportTypes(): string[]
  /**
    * 获取导入的所有文件类型
    */
  get importTypes(): string[]
}

export type VxeGlobalI18n = (key: string, args?: any) => string
export type VxeGlobalTranslate = (key: string, args?: any) => string
export type VxeGlobalUse = (plugin: VXETablePluginObject, ...options: any[]) => VXETableCore

export const setConfig: VxeGlobalConfigMethod
export const setTheme: VxeGlobalThemeMethod
export const getTheme: VxeGlobalGetThemeMethod

export const interceptor: VxeGlobalInterceptor
export const renderer: VxeGlobalRenderer
export const commands: VxeGlobalCommands
export const formats: VxeGlobalFormats
export const menus: VxeGlobalMenus
export const validators: VxeGlobalValidators
export const hooks: VxeGlobalHooks
export const modal: ModalController
export const drawer: DrawerController
export const saveFile: SaveFileFunction
export const readFile: ReadFileFunction
export const print: PrintFunction
export const t: VxeGlobalI18n
export const _t: VxeGlobalTranslate
export const use: VxeGlobalUse
/**
 * 请使用 setConfig
 * @deprecated
 */
export const config: VXETableGlobalConfig
/**
 * 请使用 setConfig
 * @deprecated
 */
export const setup: VXETableSetupOptions
/**
 * 已废弃
 * @deprecated
 */
export const globalConfs: VXETableConfig

export function getComponent (name: string): any
export function component (comp: any): any

export function setIcon(options?: VxeGlobalIcon): VXETableCore

export interface VXETablePluginObject {
  install(vxetable: VXETableCore, ...options: any[]): void
  [key: string]: any
}

export interface VxeGlobalStore {
  [key: string]: any
  clipboard?: {
    text: string
    html: string
  }
}
export const globalStore: VxeGlobalStore

export type VXETableVersion = 'v1' | 'v2' | 'v3' | 'v4'

export const v: VXETableVersion

export interface VXETableCore {
  tooltip?: boolean
  /**
   * 版本号
   */
  version: string
  tableVersion?: string;
  /**
   * 设置全局参数/获取所有参数
   */
  setConfig: VxeGlobalConfigMethod
  setTheme: VxeGlobalThemeMethod
  getTheme: VxeGlobalGetThemeMethod
  setIcon: typeof setIcon
  /**
   * 读取内部数据
   */
  globalStore: VxeGlobalStore
  /**
   * Table interceptor
   */
  interceptor: VxeGlobalInterceptor
  /**
   * Table renderer
   */
  renderer: VxeGlobalRenderer
  /**
   * Table commands
   */
  commands: VxeGlobalCommands
  /**
   * Table column formatter
   */
  formats: VxeGlobalFormats
  /**
   * Table context menu
   */
  menus: VxeGlobalMenus
  /**
   * Validators table/form
   */
  validators: VxeGlobalValidators
  /**
   * Table VxeGlobalHooks API
   */
  hooks: VxeGlobalHooks
  /**
   * 弹窗
   */
  modal: ModalController
  drawer: DrawerController
  /**
   * 读取本地文件
   */
  saveFile: SaveFileFunction
  /**
   * 读取本地文件
   */
  readFile: ReadFileFunction
  /**
   * 打印
   */
  print: PrintFunction
  /**
   * 安装插件
   * @param plugin
   * @param options
   */
  use: VxeGlobalUse
  /**
   * 读取内置国际化
   */
  t: VxeGlobalI18n
  _t: VxeGlobalTranslate

  getComponent: typeof getComponent,
  component: typeof component,

  /**
   * 请使用 setConfig
   * @deprecated
   */
  config: VXETableGlobalConfig
  /**
   * @deprecated 已废弃
   */
  globalConfs: VXETableConfig
  /**
   * 已被 version 替换
   * @deprecated
   */
  v: VXETableVersion
  /**
   * 请使用 setConfig
   * @deprecated
   */
  setup: VXETableSetupOptions
}

/**
 * 一个基于 vue 的 PC 端表单/表格组件，支持增删改查、虚拟列表、虚拟树、懒加载、快捷菜单、数据校验、树形结构、打印导出、表单渲染、数据分页、弹窗、自定义模板、渲染器、JSON 配置式...
 */
export const VXETable: VXETableCore
export const VxeUI: VXETableCore

export * from './renderer'
export * from './interceptor'
export * from './commands'
export * from './formats'
export * from './menus'
export * from './validators'
export * from './hooks'

export default VXETable
