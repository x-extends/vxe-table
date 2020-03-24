import XEUtils from 'xe-utils/methods/xe-utils'
import VXEModal from './src/modal'
import queue from './src/queue'
import VXETable from '../v-x-e-table'

let ModalClass = null
const allActivedModals = []

function openModal (opts) {
  const options = Object.assign({}, opts, { transfer: true })
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
      const $modal = new ModalClass({
        el: document.createElement('div'),
        propsData: options
      })
      setTimeout(() => $modal.open())
      allActivedModals.push($modal)
    }
  })
}

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
  return Promise.resolve()
}

function getModal (id) {
  return allActivedModals.find($modal => $modal.id === id)
}

export const ModalController = {
  get: getModal,
  close: closeModal,
  open: openModal
}

const shortcutTypes = ['alert', 'confirm', 'message']

shortcutTypes.forEach((type, index) => {
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
  ModalController[type] = function (message, title, options) {
    let opts
    if (XEUtils.isObject(message)) {
      opts = message
    } else {
      if (title) {
        opts = { title }
      }
    }
    return openModal(Object.assign({ message: XEUtils.toString(message), type }, defOpts, opts, options))
  }
})

VXEModal.install = function (Vue) {
  VXETable._modal = 1
  Vue.component(VXEModal.name, VXEModal)
  ModalClass = Vue.extend(VXEModal)
  VXETable.modal = ModalController
}

export const Modal = VXEModal
export default VXEModal
