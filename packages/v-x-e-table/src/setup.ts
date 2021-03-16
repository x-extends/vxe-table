import GlobalConfig from './conf'
import XEUtils from 'xe-utils'

import { VxeGlobalSetup } from '../../../types/all'

/**
 * 全局参数设置
 */
export const setup: VxeGlobalSetup = (options) => {
  return XEUtils.merge(GlobalConfig, options)
}
