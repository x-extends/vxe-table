
import XEUtils from 'xe-utils'

const eventStore = []
var resizeTimeout = null

function addListener () {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(ResizeEvent.handle, ResizeEvent.delay)
}

const ResizeEvent = {
  delay: 1000,
  on (comp, target, cb) {
    if (!eventStore.length) {
      addListener()
    }
    if (!eventStore.some(item => item.comp === comp && item.target === target)) {
      eventStore.push({ comp, target, cb, width: target.clientWidth, height: target.clientHeight })
    }
  },
  off (comp, target) {
    XEUtils.remove(eventStore, item => item.comp === comp && item.target === target)
  },
  handle () {
    if (eventStore.length) {
      eventStore.forEach(({ comp, target, cb, width, height }) => {
        if (width !== target.clientWidth || height !== target.clientHeight) {
          cb.call(comp, { type: 'resize', target, currentTarget: target })
        }
      })
      resizeTimeout = setTimeout(ResizeEvent.handle, ResizeEvent.delay)
    }
  }
}

export default ResizeEvent
