import GlobalConfig from './conf'
import DomZIndex from 'dom-zindex'
import XEUtils from 'xe-utils'

/**
 * 全局参数设置
 */
export function config (options) {
  if (options && options.zIndex) {
    DomZIndex.setCurrent(options.zIndex)
  }
  return XEUtils.merge(GlobalConfig, options)
}
