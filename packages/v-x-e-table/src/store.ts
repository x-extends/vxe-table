import { warnLog } from '../../tools/utils'
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
    // 检测是否覆盖
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      if (!XEUtils.eqNull(this.store[name]) && this.store[name] !== render) {
        warnLog('vxe.error.coverProp', [(this as any)._name, name])
      }
    }
    this.store[name] = render
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
