import XEUtils from 'xe-utils/methods/xe-utils'

function toType (type) {
  return XEUtils.toString(type).replace('_', '').toLowerCase()
}

const eventTypes = 'created,mounted,activated,beforeDestroy,destroyed,event.clearActived,event.clearFilter,event.showMenu,event.keydown,event.export,event.import'.split(',').map(toType)
const storeMap = {}

export const interceptorStore = {
  mixin (map) {
    XEUtils.each(map, (callback, type) => interceptorStore.add(type, callback))
    return interceptorStore
  },
  get (type) {
    return storeMap[toType(type)] || []
  },
  add (type, callback) {
    type = toType(type)
    if (callback && eventTypes.indexOf(type) > -1) {
      let eList = storeMap[type]
      if (!eList) {
        eList = storeMap[type] = []
      }
      eList.push(callback)
    }
    return interceptorStore
  },
  delete (type, callback) {
    let eList = storeMap[toType(type)]
    if (eList) {
      XEUtils.remove(eList, cb => cb === callback)
    }
    return interceptorStore
  }
}

export default interceptorStore
