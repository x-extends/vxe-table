import XEUtils from 'xe-utils'

/**
 * 创建数据仓库
 */
class Store {
  private store: any = {}

  mixin (options: any) {
    Object.assign(this.store, options)
    return this
  }

  has (name: string) {
    return !!this.get(name)
  }

  get (name: string) {
    return this.store[name]
  }

  add (name: string, render: any) {
    this.store[name] = render
    return this
  }

  delete (name: string) {
    delete this.store[name]
  }

  forEach (callback: any) {
    XEUtils.objectEach(this.store, callback)
  }
}

export default Store
