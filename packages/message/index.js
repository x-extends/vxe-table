import VxeTableMessage from './src/message'

var AlertController = null

export function Message (options) {
  return new Promise((resolve, reject) => {
    let $alert = new AlertController({
      el: document.createElement('div'),
      propsData: options
    })
    $alert._handleCustom = function (type) {
      $alert.$destroy()
      if (type === 'confirm') {
        resolve(type)
      } else {
        reject(type)
      }
    }
    setTimeout(() => $alert.open())
  })
}

['alert', 'confirm'].forEach(type => {
  Message[type] = function (message, title, options) {
    let opts = { message, type }
    if (typeof message === 'string') {
      if (title) {
        opts.title = title
      }
    } else {
      opts = message
    }
    return Message(Object.assign({}, opts, options))
  }
})

Message.install = function (Vue) {
  AlertController = Vue.extend(VxeTableMessage)
  Vue.prototype.$XMsg = Message
}

export default Message
