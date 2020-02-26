/**
 * 创建数据仓库
 */
class VXEStore {
  constructor () {
    this.store = {}
  }

  mixin (map) {
    Object.assign(this.store, map)
    return VXEStore
  }

  get (type) {
    return this.store[type]
  }

  add (type, render) {
    this.store[type] = render
    return VXEStore
  }

  delete (type) {
    delete this.store[type]
    return VXEStore
  }
}

export default VXEStore
