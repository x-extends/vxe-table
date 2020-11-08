import XEUtils from 'xe-utils'

declare global {
  interface Window {
    XEUtils: typeof XEUtils;
  }
}

window.XEUtils = XEUtils
