import GlobalConfig from '../../conf'

/**
 * 全局参数设置
 */
function setup (options = {}) {
  let { icon, menu } = GlobalConfig
  if (options.menu) {
    Object.assign(menu, options.menu)
  }
  if (options.icon) {
    Object.assign(icon, options.icon)
  }
  Object.assign(GlobalConfig, options, {
    icon,
    menu
  })
}

export default setup
