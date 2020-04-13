import XEUtils from 'xe-utils/methods/xe-utils'
import DomTools from './dom'

// 监听全局事件
const browse = DomTools.browse
const wheelName = browse.firefox ? 'DOMMouseScroll' : 'mousewheel'
const eventStore = []

// 滚轮行为监听
let lastWheelTime
let wheelEventTimeout

function handleWheelEvent (evnt) {
  eventStore.forEach(({ comp, type, cb }) => {
    if (type === 'syncwheel') {
      cb.call(comp, evnt)
    }
  })
  wheelEventTimeout = setTimeout(() => {
    if (lastWheelTime + 300 > Date.now()) {
      handleWheelEvent(evnt)
    } else {
      wheelEventTimeout = null
    }
  }, 50)
}

function bindSyncwheelEvent (evnt) {
  if (!wheelEventTimeout) {
    handleWheelEvent(evnt)
  }
  lastWheelTime = Date.now()
}

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
    if (isWheel) {
      if (eventStore.some(({ type }) => type === 'syncwheel')) {
        bindSyncwheelEvent(evnt)
      }
    }
  }
}

if (browse.isDoc) {
  document.addEventListener('keydown', GlobalEvent.trigger, false)
  document.addEventListener('contextmenu', GlobalEvent.trigger, false)
  window.addEventListener('mousedown', GlobalEvent.trigger, false)
  window.addEventListener('blur', GlobalEvent.trigger, false)
  window.addEventListener('resize', GlobalEvent.trigger, false)
  window.addEventListener(wheelName, GlobalEvent.trigger, false)
}

export default GlobalEvent
