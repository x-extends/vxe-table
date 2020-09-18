import XEUtils from 'xe-utils/ctor'
import VXEModal from './src/modal'
import allActivedModals from './src/activities'
import VXETable from '../v-x-e-table'
import { UtilTools } from '../tools'

/* eslint-disable @typescript-eslint/no-use-before-define */

let ModalClass = null

function openModal (opts) {
  const options = Object.assign({}, opts, { transfer: true })
  return new Promise(resolve => {
    if (options && options.id && allActivedModals.some(comp => comp.id === options.id)) {
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

export function ModalController (options) {
  UtilTools.warn('vxe.error.delFunc', ['Modal', 'Modal.open'])
  return openModal(options)
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

ModalController.closeAll = function () {
  UtilTools.warn('vxe.error.delFunc', ['closeAll', 'close'])
  closeModal()
}

ModalController.get = getModal
ModalController.close = closeModal
ModalController.open = openModal

ModalController.install = function (Vue) {
  VXETable._modal = 1
  Vue.component('vxe-message', VXEModal)
  Vue.component(VXEModal.name, VXEModal)
  ModalClass = Vue.extend(VXEModal)
  Vue.prototype.$XMsg = ModalController
  Vue.prototype.$XModal = ModalController
  VXETable.$modal = ModalController
  VXETable.modal = ModalController
  if (!Vue.prototype.$vxe) {
    Vue.prototype.$vxe = { modal: ModalController }
  } else {
    Vue.prototype.$vxe.modal = ModalController
  }
}

export const Modal = ModalController
export default ModalController
