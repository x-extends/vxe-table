import XEUtils from 'xe-utils/ctor'
import { UtilTools } from '../../tools'

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

    // v4 中不支持该事件
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      if ('created,mounted,activated,beforeDestroy,destroyed'.split(',').map(toType).indexOf(type) > -1) {
        UtilTools.warn('vxe.error.notProp', [`interceptor.add(${type})`])
      }
    }

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
