import GlobalConfig from '../../v-x-e-table/src/conf'
import XEUtils from 'xe-utils'

/**
 * 全局参数设置
 */
export function setup (options) {
  return XEUtils.merge(GlobalConfig, options)
}
