import XEUtils from 'xe-utils'
import { warnLog } from '../../tools/log'

/**
 * 创建数据仓库
 */
class Store {
  constructor () {
    this.store = {}
  }

  mixin (map) {
    Object.assign(this.store, map)
    return Store
  }

  get (name) {
    return this.store[name]
  }

  add (name, render) {
    const conf = this.store[name]
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
    return Store
  }

  delete (name) {
    delete this.store[name]
    return Store
  }
}

export default Store
