import XEUtils from 'xe-utils'
import zhCNLocat from '../lib/locale/lang/zh-CN'

const GlobalConfig = {
  size: null,
  optimized: false,
  contextMenu: null,
  i18n: (key, value) => XEUtils.get(zhCNLocat, key)
}

export default GlobalConfig
