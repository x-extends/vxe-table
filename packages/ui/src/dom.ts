import XEUtils from 'xe-utils'

const reClsMap: { [key: string]: any } = {}

let tpImgEl: HTMLImageElement | undefined

export function initTpImg () {
  if (!tpImgEl) {
    tpImgEl = new Image()
    tpImgEl.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
  }
  return tpImgEl
}

export function getTpImg () {
  if (!tpImgEl) {
    return initTpImg()
  }
  return tpImgEl
}

export function getPropClass (property: any, params: any) {
  return property ? XEUtils.isFunction(property) ? property(params) : property : ''
}

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

export function isPx (val: any) {
  return val && /^\d+(px)?$/.test(val)
}

export function isScale (val: any) {
  return val && /^\d+%$/.test(val)
}

export function hasClass (elem: any, cls: any) {
  return !!(elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls)))
}

export function removeClass (elem: any, cls: any) {
  if (elem && hasClass(elem, cls)) {
    elem.className = elem.className.replace(getClsRE(cls), '')
  }
}

export function addClass (elem: any, cls: string) {
  if (elem && !hasClass(elem, cls)) {
    removeClass(elem, cls)
    elem.className = `${elem.className} ${cls}`
  }
}

export function hasControlKey (evnt: KeyboardEvent | MouseEvent | DragEvent) {
  return evnt.ctrlKey || evnt.metaKey
}

export function toCssUnit (val?: number | string, unit = 'px') {
  if (XEUtils.isNumber(val) || /^\d+$/.test(`${val}`)) {
    return `${val}${unit}`
  }
  return `${val || ''}`
}

export function queryElement (elem: HTMLTableCellElement, selector: string) {
  if (elem) {
    return elem.querySelector<HTMLElement>(selector)
  }
  return null
}

export function getDomNode () {
  const documentElement = document.documentElement
  const bodyElem = document.body
  return {
    scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
    scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
    visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
    visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
  }
}

export function getOffsetHeight (elem: HTMLElement) {
  return elem ? elem.offsetHeight : 0
}

export function getPaddingTopBottomSize (elem: HTMLElement) {
  if (elem) {
    const computedStyle = getComputedStyle(elem)
    const paddingTop = XEUtils.toNumber(computedStyle.paddingTop)
    const paddingBottom = XEUtils.toNumber(computedStyle.paddingBottom)
    return paddingTop + paddingBottom
  }
  return 0
}

export function setScrollTop (elem: HTMLElement | null | undefined, scrollTop: number) {
  if (elem) {
    elem.scrollTop = scrollTop
  }
}

export function setScrollLeft (elem: HTMLElement | null | undefined, scrollLeft: number) {
  if (elem) {
    elem.scrollLeft = scrollLeft
  }
}

// export function setScrollLeftAndTop (elem: HTMLElement | null, scrollLeft: number, scrollTop: number) {
//   if (elem) {
//     elem.scrollLeft = scrollLeft
//     elem.scrollTop = scrollTop
//   }
// }

export function updateCellTitle (overflowElem: any, column: any) {
  const content = column.type === 'html' ? overflowElem.innerText : overflowElem.textContent
  if (overflowElem.getAttribute('title') !== content) {
    overflowElem.setAttribute('title', content)
  }
}

/**
 * 检查触发源是否属于目标节点
 */
export function getEventTargetNode (evnt: any, container: any, queryCls?: string, queryMethod?: (target: Element) => boolean) {
  let targetElem
  let target = (evnt.target.shadowRoot && evnt.composed) ? (evnt.composedPath()[0] || evnt.target) : evnt.target
  while (target && target.nodeType && target !== document) {
    if (queryCls && hasClass(target, queryCls) && (!queryMethod || queryMethod(target))) {
      targetElem = target
    } else if (target === container) {
      return { flag: queryCls ? !!targetElem : true, container, targetElem: targetElem }
    }
    target = target.parentNode
  }
  return { flag: false }
}

/**
 * 获取元素相对于 document 的位置
 */
export function getOffsetPos (elem: any, container: any) {
  return getNodeOffset(elem, container, { left: 0, top: 0 })
}

export function getAbsolutePos (elem: any) {
  const bounding = elem.getBoundingClientRect()
  const boundingTop = bounding.top
  const boundingLeft = bounding.left
  const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = getDomNode()
  return { boundingTop, top: scrollTop + boundingTop, boundingLeft, left: scrollLeft + boundingLeft, visibleHeight, visibleWidth }
}

const scrollIntoViewIfNeeded = 'scrollIntoViewIfNeeded'
const scrollIntoView = 'scrollIntoView'

export function scrollToView (elem: any) {
  if (elem) {
    if (elem[scrollIntoViewIfNeeded]) {
      elem[scrollIntoViewIfNeeded]()
    } else if (elem[scrollIntoView]) {
      elem[scrollIntoView]()
    }
  }
}

export function triggerEvent (targetElem: Element, type: string) {
  if (targetElem) {
    targetElem.dispatchEvent(new Event(type))
  }
}

export function isNodeElement (elem: any): elem is HTMLElement {
  return elem && elem.nodeType === 1
}
