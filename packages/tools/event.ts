import XEUtils from 'xe-utils'
import { browse } from './dom'

import { VxeComponentBase } from '../../types/all'

// 监听全局事件
const wheelName = browse.firefox ? 'DOMMouseScroll' : 'mousewheel'
const eventStore: {
  comp: VxeComponentBase;
  type: string;
  cb: (evnt: Event) => void;
}[] = []

function triggerEvent (evnt: Event) {
  const isWheel = evnt.type === wheelName
  eventStore.forEach(({ type, cb }) => {
    // 如果被取消冒泡，不再执行
    if (!evnt.cancelBubble) {
      if (type === evnt.type || (isWheel && type === 'mousewheel')) {
        cb(evnt)
      }
    }
  })
}

export const GlobalEvent = {
  on (comp: VxeComponentBase, type: string, cb: (evnt: any) => void) {
    eventStore.push({ comp, type, cb })
  },
  off (comp: VxeComponentBase, type: string) {
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
