import XEUtils from 'xe-utils'
import GlobalConfig from '../v-x-e-table/src/conf'

let zindexIndex = 0
let lastZindex = 1

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

/**
 * 当处于 iframe 中时, preventDefault 会导致 mouseup 事件无法触发
 * 此时拖动效果无法清除
 */
export function clearIframeMouseMoveEffect () {
  if (window.self !== window.top) {
    document.addEventListener('mouseleave', () => {
      const event = new MouseEvent('mouseup')
      document.dispatchEvent(event)
    }, { once: true })
  }
}
