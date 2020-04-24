import XEUtils from 'xe-utils'
import UtilTools from './utils'

const browse = XEUtils.browse()
const htmlElem = browse.isDoc ? document.querySelector('html') : 0
const bodyElem = browse.isDoc ? document.body : 0
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

export const DomTools = {
  browse,
  isPx (val) {
    return val && /^\d+(px)?$/.test(val)
  },
  isScale (val) {
    return val && /^\d+%$/.test(val)
  },
  hasClass (elem, cls) {
    return elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls))
  },
  removeClass (elem, cls) {
    if (elem && DomTools.hasClass(elem, cls)) {
      elem.className = elem.className.replace(getClsRE(cls), '')
    }
  },
  addClass (elem, cls) {
    if (elem && !DomTools.hasClass(elem, cls)) {
      DomTools.removeClass(elem, cls)
      elem.className = `${elem.className} ${cls}`
    }
  },
  updateCellTitle (evnt, column) {
    const cellElem = evnt.currentTarget.querySelector('.vxe-cell')
    const content = column.type === 'html' ? cellElem.innerText : cellElem.textContent
    if (cellElem.getAttribute('title') !== content) {
      cellElem.setAttribute('title', content)
    }
  },
  rowToVisible ($table, row) {
    const bodyElem = $table.$refs.tableBody.$el
    const trElem = bodyElem.querySelector(`[data-rowid="${UtilTools.getRowid($table, row)}"]`)
    if (trElem) {
      const bodyHeight = bodyElem.clientHeight
      const bodySrcollTop = bodyElem.scrollTop
      const trOffsetTop = trElem.offsetTop + (trElem.offsetParent ? trElem.offsetParent.offsetTop : 0)
      const trHeight = trElem.clientHeight
      // 检测行是否在可视区中
      if (trOffsetTop < bodySrcollTop || trOffsetTop > bodySrcollTop + bodyHeight) {
        // 向上定位
        return $table.scrollTo(null, trOffsetTop)
      } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
        // 向下定位
        return $table.scrollTo(null, bodySrcollTop + trHeight)
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($table.scrollYLoad) {
        return $table.scrollTo(null, ($table.afterFullData.indexOf(row) - 1) * $table.scrollYStore.rowHeight)
      }
    }
    return Promise.resolve()
  },
  colToVisible ($table, column) {
    const bodyElem = $table.$refs.tableBody.$el
    const tdElem = bodyElem.querySelector(`.${column.id}`)
    if (tdElem) {
      const bodyWidth = bodyElem.clientWidth
      const bodySrcollLeft = bodyElem.scrollLeft
      const tdOffsetLeft = tdElem.offsetLeft + (tdElem.offsetParent ? tdElem.offsetParent.offsetLeft : 0)
      const tdWidth = tdElem.clientWidth
      // 检测行是否在可视区中
      if (tdOffsetLeft < bodySrcollLeft || tdOffsetLeft > bodySrcollLeft + bodyWidth) {
        // 向左定位
        return $table.scrollTo(tdOffsetLeft)
      } else if (tdOffsetLeft + tdWidth >= bodyWidth + bodySrcollLeft) {
        // 向右定位
        return $table.scrollTo(bodySrcollLeft + tdWidth)
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($table.scrollXLoad) {
        const visibleColumn = $table.visibleColumn
        let scrollLeft = 0
        for (let index = 0; index < visibleColumn.length; index++) {
          if (visibleColumn[index] === column) {
            break
          }
          scrollLeft += visibleColumn[index].renderWidth
        }
        return $table.scrollTo(scrollLeft)
      }
    }
    return Promise.resolve()
  },
  getDomNode () {
    const documentElement = document.documentElement
    const bodyElem = document.body
    return {
      scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
      scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
      visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
      visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
    }
  },
  /**
   * 检查触发源是否属于目标节点
   */
  getEventTargetNode (evnt, container, queryCls) {
    let targetElem
    let target = evnt.target
    while (target && target.nodeType && target !== document) {
      if (queryCls && DomTools.hasClass(target, queryCls)) {
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
    const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = DomTools.getDomNode()
    return { boundingTop, top: scrollTop + boundingTop, boundingLeft, left: scrollLeft + boundingLeft, visibleHeight, visibleWidth }
  },
  getCellIndexs (cell) {
    const trElem = cell.parentNode
    const rowid = trElem.getAttribute('data-rowid')
    const columnIndex = [].indexOf.call(trElem.children, cell)
    const rowIndex = [].indexOf.call(trElem.parentNode.children, trElem)
    return { rowid, rowIndex, columnIndex }
  },
  getCell ($xetable, { row, column }) {
    const rowid = UtilTools.getRowid($xetable, row)
    const bodyElem = $xetable.$refs[`${column.fixed || 'table'}Body`] || $xetable.$refs.tableBody
    if (bodyElem && bodyElem.$el) {
      return bodyElem.$el.querySelector(`.vxe-body--row[data-rowid="${rowid}"] .${column.id}`)
    }
    return null
  },
  getCursorPosition (textarea) {
    const rangeData = { text: '', start: 0, end: 0 }
    if (textarea.setSelectionRange) {
      rangeData.start = textarea.selectionStart
      rangeData.end = textarea.selectionEnd
      rangeData.text = (rangeData.start !== rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : ''
    } else if (document.selection) {
      let index = 0
      const range = document.selection.createRange()
      const textRange = document.body.createTextRange()
      textRange.moveToElementText(textarea)
      rangeData.text = range.text
      rangeData.bookmark = range.getBookmark()
      for (; textRange.compareEndPoints('StartToStart', range) < 0 && range.moveStart('character', -1) !== 0; index++) {
        if (textarea.value.charAt(index) === '\n') {
          index++
        }
      }
      rangeData.start = index
      rangeData.end = rangeData.text.length + rangeData.start
    }
    return rangeData
  },
  setCursorPosition (textarea, rangeData) {
    if (textarea.setSelectionRange) {
      textarea.focus()
      textarea.setSelectionRange(rangeData.start, rangeData.end)
    } else if (textarea.createTextRange) {
      const textRange = textarea.createTextRange()
      if (textarea.value.length === rangeData.start) {
        textRange.collapse(false)
        textRange.select()
      } else {
        textRange.moveToBookmark(rangeData.bookmark)
        textRange.select()
      }
    }
  },
  toView (elem) {
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
