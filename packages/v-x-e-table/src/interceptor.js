import XEUtils from 'xe-utils'

// 当渲染其他组件时，存在事件冲突时，可以通过该拦截器阻止单元格被自动关闭问题
const _storeMap = {
  // 清除激活单元格之前触发拦截
  'event.clear_actived': [],
  // 清除筛选面板之前触发拦截
  'event.clear_filter': [],
  // 显示快捷菜单之前触发
  'event.show_menu': []
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
