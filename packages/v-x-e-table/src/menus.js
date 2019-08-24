// 全局的快捷菜单
const _storeMap = {}

export const Menus = {
  mixin (map) {
    Object.assign(_storeMap, map)
    return Menus
  },
  get (type) {
    return _storeMap[type]
  },
  add (type, callback) {
    _storeMap[type] = callback
    return Menus
  },
  delete (type) {
    delete _storeMap[type]
    return Menus
  }
}

export default Menus
