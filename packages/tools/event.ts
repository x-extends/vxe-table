import XEUtils from 'xe-utils'
import { browse } from './dom'

import { VxeComponentBase } from '../../types/all'

export const EVENT_KEYS = {
  F2: 'F2',
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  TAB: 'Tab',
  DELETE: 'Delete',
  BACKSPACE: 'Backspace',
  SPACEBAR: ' ',
  CONTEXT_MENU: 'ContextMenu',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown'
}

const convertEventKeys: { [key: string]: string } = {
  ' ': 'Spacebar',
  Apps: EVENT_KEYS.CONTEXT_MENU,
  Del: EVENT_KEYS.DELETE,
  Up: EVENT_KEYS.ARROW_UP,
  Down: EVENT_KEYS.ARROW_DOWN,
  Left: EVENT_KEYS.ARROW_LEFT,
  Right: EVENT_KEYS.ARROW_RIGHT
}

// 监听全局事件
const wheelName = browse.firefox ? 'DOMMouseScroll' : 'mousewheel'
const eventStore: {
  comp: VxeComponentBase;
  type: string;
  cb: (evnt: Event) => void;
}[] = []

export const hasEventKey = (evnt: KeyboardEvent, targetKey: string) => {
  const { key } = evnt
  targetKey = targetKey.toLowerCase()
  return key ? (targetKey === key.toLowerCase() || !!(convertEventKeys[key] && convertEventKeys[key].toLowerCase() === targetKey)) : false
}

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
    window.addEventListener('copy', triggerEvent, false)
    window.addEventListener('cut', triggerEvent, false)
    window.addEventListener('paste', triggerEvent, false)
  }
  document.addEventListener('keydown', triggerEvent, false)
  document.addEventListener('contextmenu', triggerEvent, false)
  window.addEventListener('mousedown', triggerEvent, false)
  window.addEventListener('blur', triggerEvent, false)
  window.addEventListener('resize', triggerEvent, false)
  window.addEventListener(wheelName, XEUtils.throttle(triggerEvent, 100, { leading: true, trailing: false }), { passive: true, capture: false })
}
