import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../conf'
import interceptor from './src/interceptor'
import renderer from './src/renderer'
import commands from './src/commands'
import menus from './src/menus'
import formats from './src/formats'
import hooks from './src/hooks'
import setup from './src/setup'
import { UtilTools } from '../tools'

const installedPlugins: any[] = []

function getExportOrImpotType (types: any, flag: number) {
  const rest: string[] = []
  XEUtils.objectEach(types, (val, type) => {
    if (val === 0 || val === flag) {
      rest.push(type)
    }
  })
  return rest
}

export class VXETableInstance {
  readonly v = 'v4'
  readonly setup = setup
  readonly interceptor = interceptor
  readonly renderer = renderer
  readonly commands = commands
  readonly formats = formats
  readonly menus = menus
  readonly hooks = hooks

  /**
   * 获取当前的 zIndex
   */
  get zIndex () {
    return UtilTools.getLastZIndex
  }

  /**
   * 获取下一个 zIndex
   */
  get nextZIndex () {
    return UtilTools.nextZIndex
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

  use (Plugin: any, options?: any) {
    /* eslint-disable @typescript-eslint/no-use-before-define */
    if (Plugin && Plugin.install) {
      if (installedPlugins.indexOf(Plugin) === -1) {
        Plugin.install(VXETable, options)
        installedPlugins.push(Plugin)
      }
    }
    return VXETable
  }

  t (key: any) {
    return GlobalConfig.i18n(key)
  }
}

export const VXETable = new VXETableInstance()

export default VXETable
