import XEUtils from 'xe-utils/ctor'

const browse = XEUtils.browse()
const htmlElem = browse.isDoc ? document.querySelector('html') : 0
const bodyElem = browse.isDoc ? document.body : 0
const reClsMap: { [key: string]: any } = {}

function getClsRE (cls: any) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp(`(?:^|\\s)${cls}(?!\\S)`, 'g')
  }
  return reClsMap[cls]
}

function getNodeOffset (elem: any, container: any, rest: any): any {
  if (elem) {
    const parentElem = elem.parentNode
    rest.top += elem.offsetTop
    rest.left += elem.offsetLeft
    if (parentElem && parentElem !== htmlElem && parentElem !== bodyElem) {
      rest.top -= parentElem.scrollTop
      rest.left -= parentElem.scrollLeft
    }
    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest)
    }
  }
  return rest
}

function isScale (val: any) {
  return val && /^\d+%$/.test(val)
}

function hasClass (elem: any, cls: any) {
  return elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls))
}

function removeClass (elem: any, cls: any) {
  if (elem && hasClass(elem, cls)) {
    elem.className = elem.className.replace(getClsRE(cls), '')
  }
}

function getDomNode () {
  const documentElement = document.documentElement
  const bodyElem = document.body
  return {
    scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
    scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
    visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
    visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
  }
}

export const DomTools = {
  browse,
  isPx (val: any) {
    return val && /^\d+(px)?$/.test(val)
  },
  isScale,
  hasClass,
  removeClass,
  addClass (elem: any, cls: string) {
    if (elem && !hasClass(elem, cls)) {
      removeClass(elem, cls)
      elem.className = `${elem.className} ${cls}`
    }
  },
  updateCellTitle (overflowElem: any, column: any) {
    const content = column.type === 'html' ? overflowElem.innerText : overflowElem.textContent
    if (overflowElem.getAttribute('title') !== content) {
      overflowElem.setAttribute('title', content)
    }
  },
  getDomNode,
  /**
   * 检查触发源是否属于目标节点
   */
  getEventTargetNode (evnt: any, container: any, queryCls?: string, queryMethod?: (target: Element) => boolean) {
    let targetElem
    let target = evnt.target
    while (target && target.nodeType && target !== document) {
      if (queryCls && hasClass(target, queryCls) && (!queryMethod || queryMethod(target))) {
        targetElem = target
      } else if (target === container) {
        return { flag: queryCls ? !!targetElem : true, container, targetElem: targetElem }
      }
      target = target.parentNode
    }
    return { flag: false }
  },
  /**
   * 获取元素相对于 document 的位置
   */
  getOffsetPos (elem: any, container: any) {
    return getNodeOffset(elem, container, { left: 0, top: 0 })
  },
  getAbsolutePos (elem: any) {
    const bounding = elem.getBoundingClientRect()
    const boundingTop = bounding.top
    const boundingLeft = bounding.left
    const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = getDomNode()
    return { boundingTop, top: scrollTop + boundingTop, boundingLeft, left: scrollLeft + boundingLeft, visibleHeight, visibleWidth }
  },
  toView (elem: any) {
    const scrollIntoViewIfNeeded = 'scrollIntoViewIfNeeded'
    const scrollIntoView = 'scrollIntoView'
    if (elem) {
      if (elem[scrollIntoViewIfNeeded]) {
        elem[scrollIntoViewIfNeeded]()
      } else if (elem[scrollIntoView]) {
        elem[scrollIntoView]()
      }
    }
  },
  triggerEvent (targetElem: Element, type: string) {
    let evnt
    if (typeof Event === 'function') {
      evnt = new Event(type)
    } else {
      evnt = document.createEvent('Event')
      evnt.initEvent(type, true, true)
    }
    targetElem.dispatchEvent(evnt)
  }
}

export default DomTools
