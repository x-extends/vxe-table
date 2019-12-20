import XEUtils from 'xe-utils'

function toType (type) {
  return XEUtils.toString(type).replace('_', '').toLowerCase()
}

const eventTypes = 'created,mounted,activated,beforeDestroy,destroyed,event.clearActived,event.clearFilter,event.showMenu,event.keydown,event.export,event.import'.split(',').map(toType)
const _storeMap = {}

export const Interceptor = {
  mixin (map) {
    XEUtils.each(map, (callback, type) => Interceptor.add(type, callback))
    return Interceptor
  },
  get (type) {
    return _storeMap[toType(type)] || []
  },
  add (type, callback) {
    type = toType(type)
    if (callback && eventTypes.indexOf(type) > -1) {
      let eList = _storeMap[type]
      if (!eList) {
        eList = _storeMap[type] = []
      }
      eList.push(callback)
    }
    return Interceptor
  },
  delete (type, callback) {
    let eList = _storeMap[toType(type)]
    if (eList) {
      XEUtils.remove(eList, cb => cb === callback)
    }
    return Interceptor
  }
}

export default Interceptor
