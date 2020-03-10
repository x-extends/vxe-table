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

  get (type) {
    return this.store[type]
  }

  add (type, render) {
    this.store[type] = render
    return Store
  }

  delete (type) {
    delete this.store[type]
    return Store
  }
}

export default Store
