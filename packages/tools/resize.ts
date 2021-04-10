import XEUtils from 'xe-utils'
import GlobalConfig from '../v-x-e-table/src/conf'

/**
 * 监听 resize 事件
 * 如果项目中已使用了 resize-observer-polyfill，那么只需要将方法定义全局，该组件就会自动使用
 */
let resizeTimeout: any
/* eslint-disable no-use-before-define */
const eventStore: XEResizeObserver[] = []
const defaultInterval = 500

function eventHandle () {
  if (eventStore.length) {
    eventStore.forEach((item) => {
      item.tarList.forEach((observer) => {
        const { target, width, heighe } = observer
        const clientWidth = target.clientWidth
        const clientHeight = target.clientHeight
        const rWidth = clientWidth && width !== clientWidth
        const rHeight = clientHeight && heighe !== clientHeight
        if (rWidth || rHeight) {
          observer.width = clientWidth
          observer.heighe = clientHeight
          setTimeout(item.callback)
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

export class XEResizeObserver {
  tarList: {
    target: Element;
    width: number;
    heighe: number;
  }[] = []

  callback: (...args: any[]) => void

  constructor (callback: (...args: any[]) => void) {
    this.callback = callback
  }

  observe (target: Element): void {
    if (target) {
      const { tarList } = this
      if (!tarList.some(observer => observer.target === target)) {
        tarList.push({
          target,
          width: target.clientWidth,
          heighe: target.clientHeight
        })
      }
      if (!eventStore.length) {
        eventListener()
      }
      if (!eventStore.some((item) => item === this)) {
        eventStore.push(this)
      }
    }
  }

  unobserve (target: Element): void {
    XEUtils.remove(eventStore, item => item.tarList.some(observer => observer.target === target))
  }

  disconnect (): void {
    XEUtils.remove(eventStore, item => item === this)
  }
}

export function createResizeEvent (callback: (...args: any[]) => void): any {
  if (window.ResizeObserver) {
    return new window.ResizeObserver(callback)
  }
  return new XEResizeObserver(callback)
}
