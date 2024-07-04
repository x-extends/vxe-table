import XEUtils from 'xe-utils'
import { warnLog } from '../../tools/log'

class VXECommandsStore {
  constructor () {
    this.store = {}
  }

  mixin (options) {
    XEUtils.each(options, (item, key) => {
      this.add(key, item)
    })
    return VXECommandsStore
  }

  get (name) {
    return this.store[name]
  }

  add (name, render) {
    const conf = this.store[name]
    // 兼容
    if (XEUtils.isFunction(render)) {
      // if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      //   warnLog('vxe.error.delProp', ['commands -> callback', 'commandMethod'])
      // }
      render = {
        commandMethod: render
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
    return VXECommandsStore
  }

  delete (name) {
    delete this.store[name]
    return VXECommandsStore
  }
}

export const commands = new VXECommandsStore()

if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
  Object.assign(commands, { _name: 'Commands' })
}
