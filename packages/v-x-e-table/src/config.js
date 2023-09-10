import GlobalConfig from './conf'
import XEUtils from 'xe-utils'

/**
 * 全局参数设置
 */
export function config (options) {
  return XEUtils.merge(GlobalConfig, options)
}
