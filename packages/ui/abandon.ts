import { VxeUI } from '@vxe-ui/core'
import { getFuncText } from './src/utils'

import type { VxeUploadDefines, VxePrintDefines, VxeGlobalConfig } from 'vxe-pc-ui'

/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const setup = (options?: VxeGlobalConfig) => {
  return VxeUI.setConfig(options)
}
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
VxeUI.setup = setup
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const config = (options?: VxeGlobalConfig) => {
  return VxeUI.setConfig(options)
}
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
VxeUI.config = config
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const t = (key: string, args?: any) => {
  return VxeUI.getI18n(key, args)
}
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
VxeUI.t = t
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const _t = (content: string | number | boolean | null | undefined, args?: any) => {
  return getFuncText(content, args)
}
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
VxeUI._t = _t

/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const VXETable = VxeUI

/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const saveFile: VxeUploadDefines.SaveFileFunction = (options) => {
  return VxeUI.saveFile(options)
}
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const readFile: VxeUploadDefines.ReadFileFunction = (options) => {
  return VxeUI.readFile(options)
}
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const print: VxePrintDefines.PrintFunction = (options) => {
  return VxeUI.print(options)
}
/**
 * 已废弃，兼容老版本
 * @deprecated
 */
export const modal = {
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  get(id: any) {
    return VxeUI.modal.get(id)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  close(id: any) {
    return VxeUI.modal.close(id)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  open(options: any) {
    return VxeUI.modal.open(options)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  alert(content: any, title: any, options: any) {
    return VxeUI.modal.alert(content, title, options)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  confirm(content: any, title: any, options: any) {
    return VxeUI.modal.confirm(content, title, options)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  message(content: any, options: any) {
    return VxeUI.modal.message(content, options)
  },
  /**
   * 已废弃，兼容老版本
   * @deprecated
   */
  notification(content: any, title: any, options: any) {
    return VxeUI.modal.notification(content, title, options)
  }
}
