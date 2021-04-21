import XEUtils from 'xe-utils'
import GlobalConfig from '../v-x-e-table/src/conf'

let zindexIndex = 0
let lastZindex = 1

export function getLog (message: string, params?: any) {
  return `[vxe-table] ${GlobalConfig.i18n(message, params)}`
}

function outLog (type: 'log' | 'warn' | 'error') {
  return function (message: string, params?: any) {
    const msg = getLog(message, params)
    console[type](msg)
    return msg
  }
}

export function isEnableConf (conf: any): boolean {
  return conf && conf.enabled !== false
}

export function isEmptyValue (cellValue: any) {
  return cellValue === null || cellValue === undefined || cellValue === ''
}

export function parseFile (file: File) {
  const name = file.name
  const tIndex = XEUtils.lastIndexOf(name, '.')
  const type = name.substring(tIndex + 1, name.length)
  const filename = name.substring(0, tIndex)
  return { filename, type }
}

export function nextZIndex () {
  lastZindex = GlobalConfig.zIndex + zindexIndex++
  return lastZindex
}

export function getLastZIndex () {
  return lastZindex
}

export const warnLog = outLog('warn')
export const errLog = outLog('error')

export function isNumVal (num: string | number): num is number {
  return !isNaN(parseFloat('' + num))
}

export function hasChildrenList (item: any) {
  return item && item.children && item.children.length > 0
}

export function getFuncText (content?: string | number | boolean | null) {
  return content ? XEUtils.toValueString(GlobalConfig.translate ? GlobalConfig.translate('' + content) : content) : ''
}

export function formatText (value: any, placeholder?: any) {
  return '' + (isEmptyValue(value) ? (placeholder ? GlobalConfig.emptyCell : '') : value)
}

/**
 * 判断值为：'' | null | undefined 时都属于空值
 */
export function eqEmptyValue (cellValue: any) {
  return cellValue === '' || XEUtils.eqNull(cellValue)
}
