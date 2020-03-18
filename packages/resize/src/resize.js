import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'

/**
 * 支持任意元素模拟 resize 事件行为，定时检测
 * 用于支持表格响应式布局，当宽度或高度发生变化时更新表格布局
 */
const eventStore = []
const defaultInterval = 500
let resizeTimeout = null

function eventHandle () {
  if (eventStore.length) {
    eventStore.forEach(item => {
      const { comp, target, cb, width, heighe } = item
      const clientWidth = target.clientWidth
      const clientHeight = target.clientHeight
      const rWidth = clientWidth && width !== clientWidth
      const rHeight = clientHeight && heighe !== clientHeight
      if (rWidth || rHeight) {
        item.width = clientWidth
        item.heighe = clientHeight
        cb.call(comp, { type: 'resize', target, rWidth, rHeight, currentTarget: target })
      }
    })
    resizeTimeout = setTimeout(eventHandle, GlobalConfig.resizeInterval || defaultInterval)
  }
}

function eventListener () {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(eventHandle, GlobalConfig.resizeInterval || defaultInterval)
}

export default {
  on (comp, target, cb) {
    if (!eventStore.length) {
      eventListener()
    }
    if (!eventStore.some(item => item.comp === comp && item.target === target)) {
      eventStore.push({ comp, target, cb, width: target.clientWidth, heighe: target.clientWidth })
    }
  },
  off (comp, target) {
    XEUtils.remove(eventStore, item => item.comp === comp && item.target === target)
  }
}
