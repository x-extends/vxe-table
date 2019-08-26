import XEUtils from 'xe-utils'
import VXEModal from './src/modal'
import queue from './src/queue'

var AlertController = null

export function Modal (options) {
  return new Promise(resolve => {
    if (options && options.id && queue.some(comp => comp.id === options.id)) {
      resolve('exist')
    } else {
      let $alert = new AlertController({
        el: document.createElement('div'),
        propsData: options
      })
      $alert._handleCustom = function (type) {
        $alert.$destroy()
        resolve(type)
      }
      setTimeout(() => $alert.open())
    }
  })
}

['alert', 'confirm', 'message'].forEach((type, index) => {
  let defOpts = index === 2 ? {
    mask: false,
    lockView: false
  } : {}
  defOpts.type = type
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

Modal.install = function (Vue) {
  Vue.component('vxe-message', VXEModal)
  Vue.component(VXEModal.name, VXEModal)
  AlertController = Vue.extend(VXEModal)
  Vue.prototype.$XMsg = Modal
  Vue.prototype.$XModal = Modal
}

export default Modal
