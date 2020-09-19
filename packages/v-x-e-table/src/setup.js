import GlobalConfig from '../../conf'
import XEUtils from 'xe-utils/ctor'

/**
 * 全局参数设置
 */
function setup (options) {
  return XEUtils.merge(GlobalConfig, options)
}

export default setup
