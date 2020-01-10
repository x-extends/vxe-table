import GlobalConfig from '../../conf'
import XEUtils from 'xe-utils/methods/xe-utils'

function mergeOpts (data1, data2) {
  if (data1 && XEUtils.isObject(data2)) {
    XEUtils.objectEach(data2, (val, key) => {
      data1[key] = data1[key] && val ? mergeOpts(data1[key], val) : val
    })
    return data1
  }
  return data2
}

/**
 * 全局参数设置
 */
function setup (options = {}) {
  // 在 v3.0 中废弃 setup.menu
  if (options.menu && !options.contextMenu) {
    options.contextMenu = options.menu
    console.warn('[vxe-table] parameter "menu" has been replaced by "contextMenu"')
  }
  mergeOpts(GlobalConfig, options)
  return GlobalConfig
}

export default setup
