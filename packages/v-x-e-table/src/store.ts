import { warnLog } from '../../tools/log'
import XEUtils from 'xe-utils'

/**
 * 创建数据仓库
 */
export class Store {
  private store: any = {}

  mixin (options: any): Store {
    Object.assign(this.store, options)
    return this
  }

  has (name: string): boolean {
    return !!this.get(name)
  }

  get (name: string): any {
    return this.store[name]
  }

  add (name: string, render: any): Store {
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
    return this
  }

  delete (name: string): void {
    delete this.store[name]
  }

  forEach (callback: any): void {
    XEUtils.objectEach(this.store, callback)
  }
}

export default Store
