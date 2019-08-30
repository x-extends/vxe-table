import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'

/**
 * 监听 resize 事件
 */
let resizeTimeout
const eventStore = []
const defaultInterval = 250

class ResizeObserverPolyfill {
  constructor (callback) {
    this.callback = callback
  }
  observe (target) {
    if (target) {
      this.target = target
      if (!eventStore.length) {
        eventListener()
      }
      if (!eventStore.some(item => item.target === target)) {
        this.width = target.clientWidth
        this.heighe = target.clientHeight
        eventStore.push(this)
      }
    }
  }
  unobserve (target) {
    if (target) {
      XEUtils.remove(eventStore, item => item.target === target)
    }
  }
}

const Resize = window.ResizeObserver || ResizeObserverPolyfill

function eventListener () {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(eventHandle, GlobalConfig.resizeInterval || defaultInterval)
}

function eventHandle () {
  if (eventStore.length) {
    eventStore.forEach(observer => {
      const { target, width, heighe } = observer
      const clientWidth = target.clientWidth
      const clientHeight = target.clientHeight
      const rWidth = clientWidth && width !== clientWidth
      const rHeight = clientHeight && heighe !== clientHeight
      if (rWidth || rHeight) {
        observer.width = clientWidth
        observer.heighe = clientHeight
        observer.callback()
      }
    })
    eventListener()
  }
}

export default Resize
