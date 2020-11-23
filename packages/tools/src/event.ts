import XEUtils from 'xe-utils/ctor'
import DomTools from './dom'

import { VxeComponentInstance } from '../../../types/vxe-table'

// 监听全局事件
const browse = DomTools.browse
const wheelName = browse.firefox ? 'DOMMouseScroll' : 'mousewheel'
const eventStore: {
  comp: VxeComponentInstance;
  type: string;
  cb: Function;
}[] = []

function triggerEvent (evnt: Event) {
  const isWheel = evnt.type === wheelName
  eventStore.forEach(({ type, cb }) => {
    if (type === evnt.type || (isWheel && type === 'mousewheel')) {
      cb(evnt)
    }
  })
}

export const GlobalEvent = {
  on (comp: VxeComponentInstance, type: string, cb: Function) {
    if (cb) {
      eventStore.push({ comp, type, cb })
    }
  },
  off (comp: VxeComponentInstance, type: string) {
    XEUtils.remove(eventStore, item => item.comp === comp && item.type === type)
  },
  trigger: triggerEvent,
  eqKeypad (evnt: KeyboardEvent, keyVal: string) {
    const { key } = evnt
    if (keyVal.toLowerCase() === key.toLowerCase()) {
      return true
    }
    return false
  }
}

if (browse.isDoc) {
  if (!browse.msie) {
    document.addEventListener('copy', triggerEvent, false)
    document.addEventListener('cut', triggerEvent, false)
    document.addEventListener('paste', triggerEvent, false)
  }
  document.addEventListener('keydown', triggerEvent, false)
  document.addEventListener('contextmenu', triggerEvent, false)
  window.addEventListener('mousedown', triggerEvent, false)
  window.addEventListener('blur', triggerEvent, false)
  window.addEventListener('resize', triggerEvent, false)
  window.addEventListener(wheelName, XEUtils.throttle(triggerEvent, 100, { leading: true, trailing: false }), { passive: true, capture: false })
}

export default GlobalEvent
