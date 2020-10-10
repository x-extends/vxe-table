import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import DomTools from './dom'

/**
 * 监听 resize 事件
 * 如果项目中已使用了 resize-observer-polyfill，那么只需要将方法定义全局，该组件就会自动使用
 */
let resizeTimeout
const eventStore = []
const defaultInterval = 500

function eventHandle () {
  if (eventStore.length) {
    eventStore.forEach(item => {
      item.tarList.forEach(observer => {
        const { target, width, heighe } = observer
        const clientWidth = target.clientWidth
        const clientHeight = target.clientHeight
        const rWidth = clientWidth && width !== clientWidth
        const rHeight = clientHeight && heighe !== clientHeight
        if (rWidth || rHeight) {
          observer.width = clientWidth
          observer.heighe = clientHeight
          requestAnimationFrame(item.callback)
        }
      })
    })
    /* eslint-disable @typescript-eslint/no-use-before-define */
    eventListener()
  }
}

function eventListener () {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(eventHandle, GlobalConfig.resizeInterval || defaultInterval)
}

class ResizeObserverPolyfill {
  constructor (callback) {
    this.tarList = []
    this.callback = callback
  }

  observe (target) {
    if (target) {
      if (this.tarList.indexOf(target) === -1) {
        this.tarList.push({
          target,
          width: target.clientWidth,
          heighe: target.clientHeight
        })
      }
      if (!eventStore.length) {
        eventListener()
      }
      if (!eventStore.some(item => item === this)) {
        eventStore.push(this)
      }
    }
  }

  unobserve (target) {
    XEUtils.remove(eventStore, item => item.tarList.indexOf(target) > -1)
  }

  disconnect () {
    XEUtils.remove(eventStore, item => item === this)
  }
}

export const ResizeEvent = DomTools.browse.isDoc ? (window.ResizeObserver || ResizeObserverPolyfill) : ResizeObserverPolyfill

export default ResizeEvent
