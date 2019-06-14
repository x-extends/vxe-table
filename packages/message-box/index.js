import VxeMessageBox from './src/message'

var AlertController = null

export function MessageBox (options) {
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
  MessageBox[type] = function (message, title, options) {
    let opts = { message, type }
    if (typeof message === 'string') {
      if (title) {
        opts.title = title
      }
    } else {
      opts = message
    }
    return MessageBox(Object.assign({}, opts, options))
  }
})

MessageBox.install = function (Vue) {
  AlertController = Vue.extend(VxeMessageBox)
  Vue.prototype.$XMsg = MessageBox
}

export default MessageBox
