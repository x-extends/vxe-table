// 全局的工具栏按钮
const _storeMap = {}

export const Buttons = {
  mixin (map) {
    Object.assign(_storeMap, map)
    return Buttons
  },
  get (type) {
    return _storeMap[type]
  },
  add (type, callback) {
    _storeMap[type] = callback
    return Buttons
  },
  delete (type) {
    delete _storeMap[type]
    return Buttons
  }
}

export default Buttons
