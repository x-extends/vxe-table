import XEUtils from 'xe-utils'
import DomZIndex from 'dom-zindex'
import GlobalConfig from '../v-x-e-table/src/conf'
import { interceptor } from './src/interceptor'
import { renderer } from './src/renderer'
import { commands } from './src/commands'
import { menus } from './src/menus'
import { formats } from './src/formats'
import { validators } from './src/validators'
import { setTheme } from './src/theme'
import { UtilTools } from '../tools/utils'
import { errLog, warnLog } from '../tools/log'

const installedPlugins = []

export function use (Plugin, options) {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install(VXETable, options)
      installedPlugins.push(Plugin)
    }
  }
  return VXETable
}

/**
 * 检测模块的安装顺序是否正确
 */
function reg (key) {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  // 检测安装顺序是否正确
  if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
    if (VXETable.Table) {
      errLog('vxe.error.useErr', [key])
    }
  }
  VXETable[`_${key}`] = 1
}

function getExportOrImpotType (types, flag) {
  const rest = []
  XEUtils.objectEach(types, (val, type) => {
    if (val === 0 || val === flag) {
      rest.push(type)
    }
  })
  return rest
}

/**
 * 全局参数设置
 */
export const setConfig = (options) => {
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
    return UtilTools.getLastZIndex()
  }

  /**
   * 获取下一个 zIndex
   */
  get nextZIndex () {
    return UtilTools.nextZIndex()
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

export function t (key, args) {
  return GlobalConfig.i18n(key, args)
}

export function _t (key, args) {
  return key ? XEUtils.toValueString(GlobalConfig.translate ? GlobalConfig.translate(key, args) : key) : ''
}

export const v = 'v3'

/**
 * 已废弃，请使用 setConfig
 * @deprecated
 */
export const setup = (options) => {
  if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
    warnLog('vxe.error.delFunc', ['setup', 'setConfig'])
  }
  return setConfig(options)
}

/**
 * 已废弃，请使用 setConfig
 * @deprecated
 */
export const config = (options) => {
  if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
    warnLog('vxe.error.delFunc', ['setup', 'setConfig'])
  }
  return setConfig(options)
}

export function setIcon (options) {
  if (options) {
    Object.assign(GlobalConfig.icon, options)
  }
  return VXETable
}

export const globalStore = {}

export const VXETable = {
  v,
  version: process.env.VUE_APP_VXE_TABLE_VERSION,
  reg,
  use,
  setConfig,
  setIcon,
  globalStore,
  interceptor,
  renderer,
  commands,
  formats,
  menus,
  validators,
  t,
  _t,

  // 已废弃
  config,
  setup,
  globalConfs
}

export const VxeUI = VXETable

setTheme('light')

export * from './src/interceptor'
export * from './src/renderer'
export * from './src/commands'
export * from './src/menus'
export * from './src/formats'

export default VXETable
