import { UtilTools } from '../../tools'
import XEUtils from 'xe-utils'

function toType (type) {
  return XEUtils.toValueString(type).replace('_', '').toLowerCase()
}

const eventTypes = 'created,mounted,activated,beforeDestroy,destroyed,event.clearActived,event.clearFilter,event.clearAreas,event.showMenu,event.keydown,event.export,event.import'.split(',').map(toType)
const storeMap = {}

export const interceptor = {
  mixin (map) {
    XEUtils.each(map, (callback, type) => interceptor.add(type, callback))
    return interceptor
  },
  get (type) {
    return storeMap[toType(type)] || []
  },
  add (type, callback) {
    type = toType(type)

    // 检测类型
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      if (eventTypes.indexOf(type) === -1) {
        UtilTools.warn('vxe.error.errProp', [`Interceptor.${type}`, eventTypes.join('|')])
      }
    }

    if (callback && eventTypes.indexOf(type) > -1) {
      let eList = storeMap[type]
      if (!eList) {
        eList = storeMap[type] = []
      }

      // 检测重复
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (eList.indexOf(callback) > -1) {
          UtilTools.warn('vxe.error.coverProp', ['Interceptor', type])
        }
      }

      eList.push(callback)
    }
    return interceptor
  },
  delete (type, callback) {
    const eList = storeMap[toType(type)]
    if (eList) {
      XEUtils.remove(eList, fn => fn === callback)
    }
    return interceptor
  }
}
