import XEUtils from 'xe-utils/ctor'

function toType (type) {
  return XEUtils.toString(type).replace('_', '').toLowerCase()
}

const eventTypes = 'created,mounted,activated,beforeDestroy,destroyed,event.clearActived,event.clearFilter,event.showMenu,event.keydown,event.export,event.import'.split(',').map(toType)
const storeMap = {}

const interceptor = {
  mixin (map) {
    XEUtils.each(map, (evntFn, type) => interceptor.add(type, evntFn))
    return interceptor
  },
  get (type) {
    return storeMap[toType(type)] || []
  },
  add (type, evntFn) {
    type = toType(type)
    if (evntFn && eventTypes.indexOf(type) > -1) {
      let eList = storeMap[type]
      if (!eList) {
        eList = storeMap[type] = []
      }
      eList.push(evntFn)
    }
    return interceptor
  },
  delete (type, evntFn) {
    const eList = storeMap[toType(type)]
    if (eList) {
      XEUtils.remove(eList, fn => fn === evntFn)
    }
    return interceptor
  }
}

export default interceptor
