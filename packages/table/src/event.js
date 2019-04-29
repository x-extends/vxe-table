import XEUtils from 'xe-utils'

// 监听全局事件
const wheelName = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel'
const eventStore = []
const GlobalEvent = {
  on (comp, type, cb) {
    eventStore.push({ comp, type, cb })
  },
  off (comp, type) {
    XEUtils.remove(eventStore, item => item.comp === comp && item.type === type)
  },
  trigger (evnt) {
    eventStore.forEach(({ comp, type, cb }) => {
      if (type === evnt.type || (type === 'mousewheel' && evnt.type === wheelName)) {
        cb.call(comp, evnt)
      }
    })
  }
}

// document.addEventListener('keydown', GlobalEvent.trigger, false)
document.addEventListener('contextmenu', GlobalEvent.trigger, false)
window.addEventListener('click', GlobalEvent.trigger, false)
window.addEventListener('blur', GlobalEvent.trigger, false)
// window.addEventListener(wheelName, GlobalEvent.trigger, false)

export default GlobalEvent
