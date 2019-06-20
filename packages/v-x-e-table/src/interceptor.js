import XEUtils from 'xe-utils'

// 当渲染其他组件时，存在事件冲突时，可以通过该拦截器阻止单元格被自动关闭问题
const _storeMap = {
  // 清除激活单元格之前触发拦截
  'event.clear_actived': [],
  // 清除筛选面板之前触发拦截
  'event.clear_filter': []
}

export const Interceptor = {
  get (type) {
    return _storeMap[type] || []
  },
  add (type, callback) {
    let eList = _storeMap[type]
    if (eList && callback && eList.indexOf(callback) === -1) {
      eList.push(callback)
    }
  },
  delete (type, callback) {
    let eList = _storeMap[type]
    if (eList) {
      XEUtils.remove(eList, cb => cb === callback)
    }
  }
}

export default Interceptor
