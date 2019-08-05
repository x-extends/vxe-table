import XEUtils from 'xe-utils'
import UtilTools from './utils'

const browse = XEUtils.browse()
const htmlElem = document.querySelector('html')
const bodyElem = document.body

export const DomTools = {
  browse,
  isPx (val) {
    return val && /^\d+(px)?$/.test(val)
  },
  isScale (val) {
    return val && /^\d+%$/.test(val)
  },
  hasClass (elem, cls) {
    return elem && elem.className && elem.className.split && elem.className.split(' ').indexOf(cls) > -1
  },
  rowToVisible ($table, row) {
    let bodyElem = $table.$refs.tableBody.$el
    let trElem = bodyElem.querySelector(`[data-rowid="${UtilTools.getRowid($table, row)}"]`)
    if (trElem) {
      let bodyHeight = bodyElem.clientHeight
      let bodySrcollTop = bodyElem.scrollTop
      let trOffsetTop = trElem.offsetTop
      let trHeight = trElem.clientHeight
      if (trOffsetTop < bodySrcollTop) {
        bodyElem.scrollTop = trOffsetTop
      } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
        bodyElem.scrollTop = bodySrcollTop + trHeight
      }
    }
  },
  colToVisible ($table, column) {
    let bodyElem = $table.$refs.tableBody.$el
    let tdElem = bodyElem.querySelector(`.${column.id}`)
    if (tdElem) {
      let bodyWidth = bodyElem.clientWidth
      let bodySrcollLeft = bodyElem.scrollLeft
      let trOffsetLeft = tdElem.offsetLeft
      let trWidth = tdElem.clientWidth
      if (trOffsetLeft < bodySrcollLeft) {
        bodyElem.scrollLeft = trOffsetLeft
      } else if (trOffsetLeft + trWidth >= bodyWidth + bodySrcollLeft) {
        bodyElem.scrollLeft = bodySrcollLeft + trWidth
      }
    }
  },
  getDomNode () {
    let documentElement = document.documentElement
    let bodyElem = document.body
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
    let bounding = elem.getBoundingClientRect()
    let { scrollTop, scrollLeft } = DomTools.getDomNode()
    return { top: scrollTop + bounding.top, left: scrollLeft + bounding.left }
  },
  getCellIndexs (cell) {
    let trElem = cell.parentNode
    let rowid = trElem.getAttribute('data-rowid')
    let columnIndex = [].indexOf.call(trElem.children, cell)
    let rowIndex = [].indexOf.call(trElem.parentNode.children, trElem)
    return { rowid, rowIndex, columnIndex }
  },
  getCell ($table, { row, rowIndex, column }) {
    let rowid = UtilTools.getRowid($table, row, rowIndex)
    return $table.$refs.tableBody.$el.querySelector(`.vxe-body--row[data-rowid="${rowid}"] .${column.id}`)
  },
  getCursorPosition (textarea) {
    let rangeData = { text: '', start: 0, end: 0 }
    if (textarea.setSelectionRange) {
      rangeData.start = textarea.selectionStart
      rangeData.end = textarea.selectionEnd
      rangeData.text = (rangeData.start !== rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : ''
    } else if (document.selection) {
      let index = 0
      let range = document.selection.createRange()
      let textRange = document.body.createTextRange()
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
      let textRange = textarea.createTextRange()
      if (textarea.value.length === rangeData.start) {
        textRange.collapse(false)
        textRange.select()
      } else {
        textRange.moveToBookmark(rangeData.bookmark)
        textRange.select()
      }
    }
  }
}

function getNodeOffset (elem, container, rest) {
  if (elem) {
    let parentElem = elem.parentNode
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

export default DomTools
