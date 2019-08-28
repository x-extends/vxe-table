import GlobalConfig from '../../conf'

/**
 * 全局参数设置
 */
function setup (options = {}) {
  let { icon, menu } = GlobalConfig
  if (options.menu) {
    Object.assign(menu, options.menu)
  } if (options.contextMenu) {
    // v2.0废弃
    console.warn('[vxe-table] The property contextMenu is deprecated, please use menu')
    Object.assign(menu, options.contextMenu)
  }
  if (options.icon) {
    Object.assign(icon, options.icon)
  } if (options.iconMap) {
    // v2.0废弃
    console.warn('[vxe-table] The property iconMap is deprecated, please use icon')
    Object.assign(icon, options.iconMap)
  }
  Object.assign(GlobalConfig, options, {
    icon,
    menu
  })
}

export default setup
