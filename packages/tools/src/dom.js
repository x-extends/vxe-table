import XEUtils from 'xe-utils'
import UtilTools from './utils'

const browse = XEUtils.browse()
// const htmlElem = document.querySelector('html')
// const bodyElem = document.body

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
  getDomNode () {
    return {
      scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
      scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft,
      visibleHeight: document.documentElement.clientHeight || document.body.clientHeight,
      visibleWidth: document.documentElement.clientWidth || document.body.clientWidth
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
    let bounding = elem.getBoundingClientRect()
    let { scrollTop, scrollLeft } = DomTools.getDomNode()
    return { top: scrollTop + bounding.top, left: scrollLeft + bounding.left }
    // return getNodeOffset(elem, container, { left: 0, top: 0 })
  },
  getCellIndexs (cell) {
    let trElem = cell.parentNode
    let colIndex = cell.getAttribute('data-index')
    let rowId = trElem.getAttribute('data-rowid')
    let columnIndex = [].indexOf.call(trElem.children, cell)
    let rowIndex = [].indexOf.call(trElem.parentNode.children, trElem)
    return { rowId, rowIndex, colIndex: colIndex ? parseInt(colIndex) : colIndex, columnIndex }
  },
  getCell ($table, { row, rowIndex, column }) {
    let rowId = UtilTools.getRowId($table, row, rowIndex)
    return $table.$refs.tableBody.$el.querySelector(`.vxe-body--row[data-rowid="${rowId}"] .${column.id}`)
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

// function getNodeOffset (elem, container, rest) {
//   if (elem) {
//     let parentElem = elem.parentNode
//     rest.top += elem.offsetTop
//     rest.left += elem.offsetLeft
//     if (parentElem && parentElem !== htmlElem && parentElem !== bodyElem) {
//       rest.top -= parentElem.scrollTop
//       rest.left -= parentElem.scrollLeft
//     }
//     if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
//       return getNodeOffset(elem.offsetParent, container, rest)
//     }
//   }
//   return rest
// }

export default DomTools
