import XEUtils from 'xe-utils/ctor'
import DomTools from './dom'

// 监听全局事件
const browse = DomTools.browse
const wheelName = browse.firefox ? 'DOMMouseScroll' : 'mousewheel'
const eventStore = []

export const GlobalEvent = {
  on (comp, type, cb) {
    if (cb) {
      eventStore.push({ comp, type, cb })
    }
  },
  off (comp, type) {
    XEUtils.remove(eventStore, item => item.comp === comp && item.type === type)
  },
  trigger (evnt) {
    const isWheel = evnt.type === wheelName
    eventStore.forEach(({ comp, type, cb }) => {
      if (type === evnt.type || (isWheel && type === 'mousewheel')) {
        cb.call(comp, evnt)
      }
    })
  }
}

if (browse.isDoc) {
  if (!browse.msie) {
    document.addEventListener('copy', GlobalEvent.trigger, false)
    document.addEventListener('cut', GlobalEvent.trigger, false)
    document.addEventListener('paste', GlobalEvent.trigger, false)
  }
  document.addEventListener('keydown', GlobalEvent.trigger, false)
  document.addEventListener('contextmenu', GlobalEvent.trigger, false)
  window.addEventListener('mousedown', GlobalEvent.trigger, false)
  window.addEventListener('blur', GlobalEvent.trigger, false)
  window.addEventListener('resize', GlobalEvent.trigger, false)
  window.addEventListener(wheelName, XEUtils.throttle(GlobalEvent.trigger, 100, { leading: true, trailing: false }), false)
}

export default GlobalEvent
