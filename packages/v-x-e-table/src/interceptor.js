import XEUtils from 'xe-utils/methods/xe-utils'

function toType (type) {
  return XEUtils.toString(type).replace('_', '').toLowerCase()
}

const eventTypes = 'created,mounted,activated,beforeDestroy,destroyed,event.clearActived,event.clearFilter,event.showMenu,event.keydown,event.export,event.import'.split(',').map(toType)
const storeMap = {}

export const interceptorStore = {
  mixin (map) {
    XEUtils.each(map, (evntFn, type) => interceptorStore.add(type, evntFn))
    return interceptorStore
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
    return interceptorStore
  },
  delete (type, evntFn) {
    const eList = storeMap[toType(type)]
    if (eList) {
      XEUtils.remove(eList, fn => fn === evntFn)
    }
    return interceptorStore
  }
}

export default interceptorStore
