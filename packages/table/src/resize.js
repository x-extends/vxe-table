
import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'

const eventStore = []
const defaultInterval = 250
var resizeTimeout = null

function addListener () {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(ResizeEvent.handle, GlobalConfig.resizeInterval || defaultInterval)
}

const ResizeEvent = {
  on (comp, target, cb) {
    if (!eventStore.length) {
      addListener()
    }
    if (!eventStore.some(item => item.comp === comp && item.target === target)) {
      eventStore.push({ comp, target, cb, width: target.clientWidth, heighe: target.clientWidth })
    }
  },
  off (comp, target) {
    XEUtils.remove(eventStore, item => item.comp === comp && item.target === target)
  },
  handle () {
    if (eventStore.length) {
      eventStore.forEach(item => {
        let { comp, target, cb, width, heighe } = item
        let clientWidth = target.clientWidth
        let clientHeight = target.clientHeight
        let rWidth = clientWidth && width !== clientWidth
        let rHeight = clientHeight && heighe !== clientHeight
        if (rWidth || rHeight) {
          item.width = clientWidth
          item.heighe = clientHeight
          cb.call(comp, { type: 'resize', target, rWidth, rHeight, currentTarget: target })
        }
      })
      resizeTimeout = setTimeout(ResizeEvent.handle, GlobalConfig.resizeInterval || defaultInterval)
    }
  }
}

export default ResizeEvent
