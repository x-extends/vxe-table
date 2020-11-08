import { GlobalConfig } from '../../conf'
import XEUtils from 'xe-utils/ctor'

import { VxeGlobalSetup } from '../../../types/vxe-table'

/**
 * 全局参数设置
 */
const setup: VxeGlobalSetup = (options) => {
  return XEUtils.merge(GlobalConfig, options)
}

export default setup
