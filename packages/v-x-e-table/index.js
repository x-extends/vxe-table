import XEUtils from 'xe-utils'
import GlobalConfig from '../v-x-e-table/src/conf'
import { interceptor } from './src/interceptor'
import { renderer } from './src/renderer'
import { commands } from './src/commands'
import { menus } from './src/menus'
import { formats } from './src/formats'
import { setup } from './src/setup'
import { UtilTools } from '../tools'

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
      UtilTools.error('vxe.error.useErr', [key])
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
export const config = new VXETableConfig()

export function t (key, args) {
  return GlobalConfig.i18n(key, args)
}

export function _t (key, args) {
  return key ? XEUtils.toValueString(GlobalConfig.translate ? GlobalConfig.translate(key, args) : key) : ''
}

export const v = 'v3'

export const VXETable = {
  v,
  reg,
  use,
  setup,
  interceptor,
  renderer,
  commands,
  formats,
  menus,
  config,
  t,
  _t
}

export * from './src/interceptor'
export * from './src/renderer'
export * from './src/commands'
export * from './src/menus'
export * from './src/formats'
export * from './src/setup'

export default VXETable
