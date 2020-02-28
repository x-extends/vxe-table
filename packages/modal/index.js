import XEUtils from 'xe-utils/methods/xe-utils'
import VXEModal from './src/modal'
import queue from './src/queue'
import VXETable from '../v-x-e-table'
import { UtilTools } from '../tools'

let AlertController = null
const allActivedModals = []

export function Modal (options) {
  return new Promise(resolve => {
    if (options && options.id && queue.some(comp => comp.id === options.id)) {
      resolve('exist')
    } else {
      const events = options.events || {}
      options.events = Object.assign({}, events, {
        hide (params) {
          if (events.hide) {
            events.hide.call(this, params)
          }
          /* eslint-disable @typescript-eslint/no-use-before-define */
          setTimeout(() => $modal.$destroy(), $modal.isMsg ? 500 : 100)
          XEUtils.remove(allActivedModals, item => item === $modal)
          resolve(params.type)
        }
      })
      const $modal = new AlertController({
        el: document.createElement('div'),
        propsData: options
      })
      setTimeout(() => $modal.open())
      allActivedModals.push($modal)
    }
  })
}

['alert', 'confirm', 'message'].forEach((type, index) => {
  const defOpts = index === 2 ? {
    mask: false,
    lockView: false,
    showHeader: false
  } : {
    showFooter: true
  }
  defOpts.type = type
  defOpts.dblclickZoom = false
  if (index === 1) {
    defOpts.status = 'question'
  }
  Modal[type] = function (message, title, options) {
    let opts
    if (XEUtils.isObject(message)) {
      opts = message
    } else {
      if (title) {
        opts = { title }
      }
    }
    return Modal(Object.assign({ message: XEUtils.toString(message), type }, defOpts, opts, options))
  }
})

/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */
function closeModal (id) {
  if (arguments.length) {
    const modal = getModal(id)
    if (modal) {
      modal.close('close')
    }
  } else {
    allActivedModals.forEach($modal => $modal.close('close'))
  }
}

function getModal (id) {
  return allActivedModals.find($modal => $modal.id === id)
}

Modal.closeAll = function () {
  UtilTools.warn('vxe.error.delFunc', ['closeAll', 'close'])
  closeModal()
}

Modal.get = getModal
Modal.close = closeModal

Modal.install = function (Vue) {
  VXETable._modal = 1
  Vue.component('vxe-message', VXEModal)
  Vue.component(VXEModal.name, VXEModal)
  AlertController = Vue.extend(VXEModal)
  Vue.prototype.$XMsg = Modal
  Vue.prototype.$XModal = Modal
  VXETable.$modal = Modal
}

export default Modal
