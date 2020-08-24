import XEUtils from 'xe-utils/methods/xe-utils'
import VXEModal from './src/modal'
import queue from './src/queue'
import allActivedModals from './src/activities'
import VXETable from '../v-x-e-table'

/* eslint-disable @typescript-eslint/no-use-before-define */

let ModalClass = null

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
          setTimeout(() => $modal.$destroy(), $modal.isMsg ? 500 : 100)
          resolve(params.type)
        }
      })
      const $modal = new ModalClass({
        el: document.createElement('div'),
        propsData: options
      })
      setTimeout(() => {
        if ($modal.isDestroy) {
          $modal.close()
        } else {
          $modal.open()
        }
      })
    }
  })
}

/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */
function closeModal (id) {
  const modals = arguments.length ? [getModal(id)] : allActivedModals
  modals.forEach($modal => {
    if ($modal) {
      $modal.isDestroy = true
      $modal.close('close')
    }
  })
  return Promise.resolve()
}

function getModal (id) {
  return XEUtils.find(allActivedModals, $modal => $modal.id === id)
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
        opts = index === 2 ? { status: title } : { title }
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
  if (!Vue.prototype.$vxe) {
    Vue.prototype.$vxe = { modal: ModalController }
  } else {
    Vue.prototype.$vxe.modal = ModalController
  }
}

export const Modal = VXEModal
export default VXEModal
