import XEUtils from 'xe-utils'
import VxeMessageBox from './src/message'
import MsgQueue from './src/msgQueue'

var AlertController = null

export function Message (options) {
  return new Promise((resolve, reject) => {
    if (options && options.id && MsgQueue.some(comp => comp.id === options.id)) {
      resolve('exist')
    } else {
      let $alert = new AlertController({
        el: document.createElement('div'),
        propsData: options
      })
      $alert._handleCustom = function (type) {
        $alert.$destroy()
        if (type === 'confirm' || options.type === 'message') {
          resolve(type)
        } else {
          reject(type)
        }
      }
      setTimeout(() => $alert.open())
    }
  })
}

['alert', 'confirm', 'message'].forEach((type, index) => {
  let defOpts = index === 2 ? {
    mask: false,
    lockView: false,
    lockScroll: false
  } : {}
  Message[type] = function (message, title, options) {
    let opts
    if (XEUtils.isObject(message)) {
      opts = message
    } else {
      if (title) {
        opts = { title }
      }
    }
    return Message(Object.assign({ message: XEUtils.toString(message), type }, defOpts, opts, options))
  }
})

Message.install = function (Vue) {
  AlertController = Vue.extend(VxeMessageBox)
  Vue.prototype.$XMsg = Message
}

export default Message
