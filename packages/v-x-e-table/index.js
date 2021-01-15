import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../conf'
import interceptor from './src/interceptor'
import renderer from './src/renderer'
import commands from './src/commands'
import menus from './src/menus'
import formats from './src/formats'
import setup from './src/setup'
import { UtilTools } from '../tools'

const installedPlugins = []

function use (Plugin, options) {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install(VXETableInstance, options)
      installedPlugins.push(Plugin)
    }
  }
  return VXETableInstance
}

/**
 * 检测模块的安装顺序是否正确
 */
function reg (key) {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (VXETableInstance.Table) {
    UtilTools.error('vxe.error.useErr', [key])
  }
  VXETableInstance[`_${key}`] = 1
}

export const VXETableInstance = {
  t: (key, args) => GlobalConfig.i18n(key, args),
  v: 'v3',
  reg,
  use,
  setup,
  interceptor,
  renderer,
  commands,
  formats,
  menus
}

/**
 * 获取当前的 zIndex
 */
Object.defineProperty(VXETableInstance, 'zIndex', { get: UtilTools.getLastZIndex })

/**
 * 获取下一个 zIndex
 */
Object.defineProperty(VXETableInstance, 'nextZIndex', { get: UtilTools.nextZIndex })

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
 * 获取所有导出类型
 */
Object.defineProperty(VXETableInstance, 'exportTypes', {
  get () {
    return getExportOrImpotType(GlobalConfig.export.types, 1)
  }
})

/**
 * 获取所有导入类型
 */
Object.defineProperty(VXETableInstance, 'importTypes', {
  get () {
    return getExportOrImpotType(GlobalConfig.export.types, 2)
  }
})

export const VXETable = VXETableInstance

export default VXETable
