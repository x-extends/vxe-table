import XEUtils from 'xe-utils'
import GlobalConfig from './src/conf'
import { interceptor } from './src/interceptor'
import { renderer } from './src/renderer'
import { commands } from './src/commands'
import { menus } from './src/menus'
import { formats } from './src/formats'
import { validators } from './src/validators'
import { hooks } from './src/hooks'
import { config } from './src/config'
import { getLastZIndex, nextZIndex } from '../tools/utils'

import { VXETableCore } from '../../types/all'

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

export const setup = config

export const globalStore = {}

export const VXETable = {
  v,
  version: process.env.VUE_APP_VXE_TABLE_VERSION,
  setup,
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

  // 已废弃
  config,
  globalConfs
} as VXETableCore

export * from './src/interceptor'
export * from './src/renderer'
export * from './src/commands'
export * from './src/menus'
export * from './src/formats'
export * from './src/validators'
export * from './src/hooks'
export * from './src/config'

export default VXETable
