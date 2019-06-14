import GlobalConfig from '../../conf'

/**
 * 全局参数设置
 */
function setup (options = {}) {
  let { iconMap } = GlobalConfig
  if (options.iconMap) {
    Object.assign(iconMap, options.iconMap)
  }
  Object.assign(GlobalConfig, options, {
    iconMap
  })
}

export default setup
