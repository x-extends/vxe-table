
import XEUtils from 'xe-utils'

const eventStore = []
var resizeTimeout = null

function addListener () {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(ResizeEvent.handle, ResizeEvent.delay)
}

const ResizeEvent = {
  delay: 250,
  on (comp, target, cb) {
    if (!eventStore.length) {
      addListener()
    }
    if (!eventStore.some(item => item.comp === comp && item.target === target)) {
      eventStore.push({ comp, target, cb, width: target.clientWidth })
    }
  },
  off (comp, target) {
    XEUtils.remove(eventStore, item => item.comp === comp && item.target === target)
  },
  handle () {
    if (eventStore.length) {
      eventStore.forEach(item => {
        let { comp, target, cb, width } = item
        let clientWidth = target.clientWidth
        if (clientWidth && width !== clientWidth) {
          item.width = clientWidth
          cb.call(comp, { type: 'resize', target, currentTarget: target })
        }
      })
      resizeTimeout = setTimeout(ResizeEvent.handle, ResizeEvent.delay)
    }
  }
}

export default ResizeEvent
