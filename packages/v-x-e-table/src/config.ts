import GlobalConfig from './conf'
import XEUtils from 'xe-utils'
import DomZIndex from 'dom-zindex'

import { VxeGlobalConfigMethod } from '../../../types/all'

/**
 * 全局参数设置
 */
export const config: VxeGlobalConfigMethod = (options) => {
  if (options && options.zIndex) {
    DomZIndex.setCurrent(options.zIndex)
  }
  return XEUtils.merge(GlobalConfig, options)
}
