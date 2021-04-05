import XEUtils from 'xe-utils'
import { warnLog } from '../../tools/utils'

import { VxeGlobalInterceptor, VxeGlobalInterceptorHandles } from '../../../types/v-x-e-table'

const storeMap: { [type: string]: VxeGlobalInterceptorHandles.InterceptorCallback[] } = {}

export const interceptor: VxeGlobalInterceptor = {
  mixin (options) {
    XEUtils.each(options, (callback: VxeGlobalInterceptorHandles.InterceptorCallback, type) => interceptor.add(type as VxeGlobalInterceptorHandles.Type, callback))
    return interceptor
  },
  get (type) {
    return storeMap[type] || []
  },
  add (type, callback) {
    // 检测类型
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      const eventTypes: VxeGlobalInterceptorHandles.Type[] = ['created', 'mounted', 'activated', 'beforeUnmount', 'unmounted', 'event.clearActived', 'event.clearFilter', 'event.clearAreas', 'event.showMenu', 'event.keydown', 'event.export', 'event.import']
      if (eventTypes.indexOf(type) === -1) {
        warnLog('vxe.error.errProp', [`Interceptor.${type}`, eventTypes.join('|')])
      }
    }

    if (callback) {
      let eList = storeMap[type]
      if (!eList) {
        eList = storeMap[type] = []
      }

      // 检测重复
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (eList.indexOf(callback) > -1) {
          warnLog('vxe.error.coverProp', ['Interceptor', type])
        }
      }

      eList.push(callback)
    }
    return interceptor
  },
  delete (type, callback) {
    const eList = storeMap[type]
    if (eList) {
      if (callback) {
        XEUtils.remove(eList, fn => fn === callback)
      } else {
        delete storeMap[type]
      }
    }
  }
}
