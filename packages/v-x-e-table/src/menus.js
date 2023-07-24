import XEUtils from 'xe-utils'
import { warnLog } from '../../tools/log'

class VXEMenusStore {
  constructor () {
    this.store = {}
  }

  mixin (options) {
    XEUtils.each(options, (item, key) => {
      this.add(key, item)
    })
    return VXEMenusStore
  }

  get (name) {
    return this.store[name]
  }

  add (name, render) {
    const conf = this.store[name]
    // 兼容
    if (XEUtils.isFunction(render)) {
      // warnLog('vxe.error.delProp', ['callback', 'menuMethod'])
      render = {
        menuMethod: render
      }
    }

    // 检测是否覆盖
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      const confKeys = XEUtils.keys(conf)
      XEUtils.each(render, (item, key) => {
        if (confKeys.includes(key)) {
          warnLog('vxe.error.coverProp', [name, key])
        }
      })
    }
    this.store[name] = conf ? XEUtils.merge(conf, render) : render
    return VXEMenusStore
  }

  delete (name) {
    delete this.store[name]
    return VXEMenusStore
  }
}

export const menus = new VXEMenusStore()

if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
  Object.assign(menus, { _name: 'Menus' })
}
