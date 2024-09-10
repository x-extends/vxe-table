import XEUtils from 'xe-utils'
import { VxeUI } from '@vxe-ui/core'
import DomZIndex from 'dom-zindex'

export function isEnableConf (conf: any): boolean {
  return conf && conf.enabled !== false
}

export function isEmptyValue (cellValue: any) {
  return cellValue === null || cellValue === undefined || cellValue === ''
}

export function parseFile (file: File) {
  const name = file.name
  const tIndex = XEUtils.lastIndexOf(name, '.')
  const type = name.substring(tIndex + 1, name.length).toLowerCase()
  const filename = name.substring(0, tIndex)
  return { filename, type }
}

export function nextZIndex () {
  return DomZIndex.getNext()
}

export function getLastZIndex () {
  return DomZIndex.getCurrent()
}

export function hasChildrenList (item: any) {
  return item && item.children && item.children.length > 0
}

export function getFuncText (content?: string | number | boolean | null, args?: any) {
  if (content) {
    const translate = VxeUI.getConfig().translate
    return XEUtils.toValueString(translate ? translate('' + content, args) : content)
  }
  return ''
}

export function formatText (value: any, placeholder?: any) {
  return '' + (isEmptyValue(value) ? (placeholder ? VxeUI.getConfig().emptyCell : '') : value)
}

/**
 * 判断值为：'' | null | undefined 时都属于空值
 */
export function eqEmptyValue (cellValue: any) {
  return cellValue === '' || XEUtils.eqNull(cellValue)
}

export function getClass (property: any, params: any) {
  return property ? XEUtils.isFunction(property) ? property(params) : property : ''
}
