import Vue from 'vue'
import XEUtils from 'xe-utils/methods/xe-utils'
import XEAjax from 'xe-ajax'
import VXEAjax from 'vxe-ajax'

Vue.use(VXEAjax, XEAjax)

/**
 * 生成模拟数据
 */
const columnsWorker = new Worker('static/worker/columns.js')
const dataWorker = new Worker('static/worker/data.js')
const callMaps = {}

columnsWorker.onmessage = function (evnt) {
  var rest = evnt.data
  if (rest && callMaps[rest.key]) {
    callMaps[rest.key](rest.columns)
    delete callMaps[rest.key]
  }
}

dataWorker.onmessage = function (evnt) {
  var rest = evnt.data
  if (rest && callMaps[rest.key]) {
    callMaps[rest.key](rest.list)
    delete callMaps[rest.key]
  }
}

XEAjax.mixin({
  mockColumns (size) {
    return new Promise(resolve => {
      const key = XEUtils.uniqueId()
      callMaps[key] = resolve
      setTimeout(() => columnsWorker.postMessage({ key, size }), 100)
    })
  },
  mockList (size) {
    return new Promise(resolve => {
      const key = XEUtils.uniqueId()
      callMaps[key] = resolve
      setTimeout(() => dataWorker.postMessage({ key, size }), 100)
    })
  }
})
