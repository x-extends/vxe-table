
import XEUtils from 'xe-utils'

const eventStore = []
var resizeTimeout = null

function addListener () {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(ResizeEvent.handle, ResizeEvent.delay)
}

const ResizeEvent = {
  delay: 500,
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
      eventStore.forEach(item => {
        let { comp, target, cb, width, height } = item
        let clientWidth = target.clientWidth
        let clientHeight = target.clientHeight
        if (width !== clientWidth || height !== clientHeight) {
          item.width = clientWidth
          item.height = clientHeight
          cb.call(comp, { type: 'resize', target, currentTarget: target })
        }
      })
      resizeTimeout = setTimeout(ResizeEvent.handle, ResizeEvent.delay)
    }
  }
}

export default ResizeEvent
