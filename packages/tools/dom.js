import XEUtils from 'xe-utils'

export const browse = XEUtils.browse()
const reClsMap = {}

function getClsRE (cls) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp(`(?:^|\\s)${cls}(?!\\S)`, 'g')
  }
  return reClsMap[cls]
}

function getNodeOffset (elem, container, rest) {
  if (elem) {
    const parentElem = elem.parentNode
    rest.top += elem.offsetTop
    rest.left += elem.offsetLeft
    if (parentElem && parentElem !== document.documentElement && parentElem !== document.body) {
      rest.top -= parentElem.scrollTop
      rest.left -= parentElem.scrollLeft
    }
    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest)
    }
  }
  return rest
}

function isScale (val) {
  return val && /^\d+%$/.test(val)
}

function hasClass (elem, cls) {
  return elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls))
}

function removeClass (elem, cls) {
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

export function getOffsetHeight (elem) {
  return elem ? elem.offsetHeight : 0
}

export function getPaddingTopBottomSize (elem) {
  if (elem) {
    const computedStyle = getComputedStyle(elem)
    const paddingTop = XEUtils.toNumber(computedStyle.paddingTop)
    const paddingBottom = XEUtils.toNumber(computedStyle.paddingBottom)
    return paddingTop + paddingBottom
  }
  return 0
}

export function setScrollTop (elem, scrollTop) {
  if (elem) {
    elem.scrollTop = scrollTop
  }
}

export function setScrollLeft (elem, scrollLeft) {
  if (elem) {
    elem.scrollLeft = scrollLeft
  }
}

// export function setScrollLeftAndTop (elem, scrollLeft, scrollTop) {
//   if (elem) {
//     elem.scrollLeft = scrollLeft
//     elem.scrollTop = scrollTop
//   }
// }

function isNodeElement (elem) {
  return elem && elem.nodeType === 1
}

export const DomTools = {
  browse,
  isPx (val) {
    return val && /^\d+(px)?$/.test(val)
  },
  isScale,
  hasClass,
  removeClass,
  addClass (elem, cls) {
    if (elem && !hasClass(elem, cls)) {
      removeClass(elem, cls)
      elem.className = `${elem.className} ${cls}`
    }
  },
  updateCellTitle (overflowElem, column) {
    const content = column.type === 'html' ? overflowElem.innerText : overflowElem.textContent
    if (overflowElem.getAttribute('title') !== content) {
      overflowElem.setAttribute('title', content)
    }
  },
  getDomNode,
  /**
   * 检查触发源是否属于目标节点
   */
  getEventTargetNode (evnt, container, queryCls, queryMethod) {
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
  getOffsetPos (elem, container) {
    return getNodeOffset(elem, container, { left: 0, top: 0 })
  },
  getAbsolutePos (elem) {
    const bounding = elem.getBoundingClientRect()
    const boundingTop = bounding.top
    const boundingLeft = bounding.left
    const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = getDomNode()
    return { boundingTop, top: scrollTop + boundingTop, boundingLeft, left: scrollLeft + boundingLeft, visibleHeight, visibleWidth }
  },
  scrollToView (elem) {
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
  triggerEvent (targetElem, type) {
    if (targetElem) {
      targetElem.dispatchEvent(new Event(type))
    }
  },
  calcHeight ($xetable, key) {
    const val = $xetable[key]
    let num = 0
    if (val) {
      if (val === 'auto') {
        num = $xetable.parentHeight
      } else {
        const excludeHeight = $xetable.getExcludeHeight()
        if (isScale(val)) {
          num = Math.floor((XEUtils.toInteger(val) || 1) / 100 * $xetable.parentHeight)
        } else {
          num = XEUtils.toNumber(val)
        }
        num = Math.max(40, num - excludeHeight)
      }
    }
    return num
  },
  isNodeElement
}

export default DomTools
