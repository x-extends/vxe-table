import XEUtils from 'xe-utils'
import GlobalConfig from './src/conf'
import DomZIndex from 'dom-zindex'
import { interceptor } from './src/interceptor'
import { renderer } from './src/renderer'
import { commands } from './src/commands'
import { menus } from './src/menus'
import { formats } from './src/formats'
import { validators } from './src/validators'
import { hooks } from './src/hooks'
import { setTheme, getTheme } from './src/theme'
import { getLastZIndex, nextZIndex } from '../tools/utils'
import { warnLog } from '../tools/log'

import { VXETableCore, VxeGlobalConfigMethod, VXETableSetupOptions } from '../../types/all'

function getExportOrImpotType (types: any, flag: number) {
  const rest: string[] = []
  XEUtils.objectEach(types, (val, type) => {
    if (val === 0 || val === flag) {
      rest.push(type)
    }
  })
  return rest
}

const installedPlugins: any[] = []

export function use (Plugin: any, options?: any) {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install(VXETable, options)
      installedPlugins.push(Plugin)
    }
  }
  return VXETable
}

export function t (key: any, args?: any) {
  return GlobalConfig.i18n(key, args)
}

export function _t (key: string, args?: any) {
  return key ? XEUtils.toValueString(GlobalConfig.translate ? GlobalConfig.translate(key, args) : key) : ''
}

/**
 * 全局参数设置
 */
export const setConfig: VxeGlobalConfigMethod = (options) => {
  if (options) {
    if (options.theme) {
      setTheme(options.theme)
    }
    if (options.zIndex) {
      DomZIndex.setCurrent(options.zIndex)
    }
    XEUtils.merge(GlobalConfig, options)
  }
  return VXETable
}

class VXETableConfig {
  /**
   * 获取当前的 zIndex
   */
  get zIndex () {
    return getLastZIndex()
  }

  /**
   * 获取下一个 zIndex
   */
  get nextZIndex () {
    return nextZIndex()
  }

  /**
   * 获取所有导出类型
   */
  get exportTypes () {
    return getExportOrImpotType(GlobalConfig.export.types, 1)
  }

  /**
   * 获取所有导入类型
   */
  get importTypes () {
    return getExportOrImpotType(GlobalConfig.export.types, 2)
  }
}

// 已废弃
export const globalConfs = new VXETableConfig()

export const v = 'v4'

/**
 * 已废弃，请使用 setConfig
 * @deprecated
 */
export const setup: VXETableSetupOptions = (options) => {
  if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
    warnLog('vxe.error.delFunc', ['setup', 'setConfig'])
  }
  setConfig(options)
  return GlobalConfig
}

/**
 * 已废弃，请使用 setConfig
 * @deprecated
 */
export const config: VXETableSetupOptions = (options) => {
  if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
    warnLog('vxe.error.delFunc', ['setup', 'setConfig'])
  }
  setConfig(options)
  return GlobalConfig
}

export function setIcon (options?: any) {
  if (options) {
    Object.assign(GlobalConfig.icon, options)
  }
  return VXETable
}

export const globalStore = {}

const components: any = {}

export function getComponent (name: any) {
  return components[name] || null
}

export function component (comp: any) {
  if (comp && comp.name) {
    components[comp.name] = comp
  }
}

export const version = process.env.VUE_APP_VXE_TABLE_VERSION as string
export const tableVersion = version

export const VXETable = {
  v,
  version,
  tableVersion,
  setConfig,
  setIcon,
  globalStore,
  interceptor,
  renderer,
  commands,
  formats,
  validators,
  menus,
  hooks,
  use,
  t,
  _t,
  setTheme,
  getTheme,
  getComponent,

  // 已废弃
  config,
  setup,
  globalConfs
} as VXETableCore

export const VxeUI = VXETable

setTheme('light')

export * from './src/interceptor'
export * from './src/renderer'
export * from './src/commands'
export * from './src/menus'
export * from './src/formats'
export * from './src/validators'
export * from './src/hooks'

export default VXETable
