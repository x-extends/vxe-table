import XEUtils from 'xe-utils/methods/xe-utils'

const _storeMap = {
  // 清除激活单元格之前触发，允许返回 false 阻止默认行为
  'event.clear_actived': [],
  // 清除筛选面板之前触发，允许返回 false 阻止默认行为
  'event.clear_filter': [],
  // 显示快捷菜单之前触发
  'event.show_menu': [],
  // 键盘按下时触发
  'event.keydown': []
}

export const Interceptor = {
  mixin (map) {
    XEUtils.each(map, (callback, type) => Interceptor.add(type, callback))
    return Interceptor
  },
  get (type) {
    return _storeMap[type] || []
  },
  add (type, callback) {
    let eList = _storeMap[type]
    if (eList && callback && eList.indexOf(callback) === -1) {
      eList.push(callback)
    }
    return Interceptor
  },
  delete (type, callback) {
    let eList = _storeMap[type]
    if (eList) {
      XEUtils.remove(eList, cb => cb === callback)
    }
    return Interceptor
  }
}

export default Interceptor
