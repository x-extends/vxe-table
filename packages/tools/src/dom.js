import XEUtils from 'xe-utils'
import UtilTools from './utils'

const browse = XEUtils.browse()
const htmlElem = document.querySelector('html')
const bodyElem = document.body

function rClass (cls) {
  return new RegExp(`(?:^|\\s)${cls}(?!\\S)`, 'g')
}

function rClassList (clss) {
  return new RegExp(clss.map(cls => `(?:^|\\s)${cls}(?!\\S)`).join('|'), 'g')
}

const rClsMap = {}
const preClss = [
  'row--hover',
  'row--current',
  'col--current',
  'col--selected',
  'col--actived',
  'col--title-checked',
  'scrolling--middle'
]
const preClsMap = {
  'col--checked': [
    'col--checked-top',
    'col--checked-bottom',
    'col--checked-left',
    'col--checked-right'
  ]
}

preClss.forEach(cls => {
  rClsMap[cls] = rClass(cls)
})

XEUtils.each(preClsMap, (clss, cls) => {
  rClsMap[cls] = rClassList([cls].concat(clss))
})

export const DomTools = {
  browse,
  isPx (val) {
    return val && /^\d+(px)?$/.test(val)
  },
  isScale (val) {
    return val && /^\d+%$/.test(val)
  },
  hasClass (elem, cls) {
    if (elem) {
      let className = elem.className
      return (preClss[cls] || rClass(cls)).test(className)
    }
    return false
  },
  removeClass (elem, cls) {
    if (elem && DomTools.hasClass(elem, cls)) {
      elem.className = elem.className.replace(rClsMap[cls] || rClass(cls), '')
    }
  },
  addClass (elem, cls) {
    if (elem && !DomTools.hasClass(elem, cls)) {
      DomTools.removeClass(elem, cls)
      elem.className = `${elem.className} ${cls}`
    }
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
    return getNodeOffset(elem, container, { left: 0, top: 0 })
  },
  getAbsolutePos (elem) {
    let bounding = elem.getBoundingClientRect()
    let { scrollTop, scrollLeft } = DomTools.getDomNode()
    return { top: scrollTop + bounding.top, left: scrollLeft + bounding.left }
  },
  /**
   * 获取单元格节点索引
   */
  getCellNodeIndex (cell) {
    let trElem = cell.parentNode
    let columnIndex = XEUtils.arrayIndexOf(trElem.children, cell)
    let rowIndex = XEUtils.arrayIndexOf(trElem.parentNode.children, trElem)
    return { columnIndex, rowIndex }
  },
  /**
   * 获取选中单元格矩阵范围
   */
  getRowNodes (trList, cellNode, targetCellNode) {
    let startColIndex = cellNode.columnIndex
    let startRowIndex = cellNode.rowIndex
    let targetColIndex = targetCellNode.columnIndex
    let targetRowIndex = targetCellNode.rowIndex
    let rows = []
    for (let rowIndex = Math.min(startRowIndex, targetRowIndex), rowLen = Math.max(startRowIndex, targetRowIndex); rowIndex <= rowLen; rowIndex++) {
      let cells = []
      let trElem = trList[rowIndex]
      for (let colIndex = Math.min(startColIndex, targetColIndex), colLen = Math.max(startColIndex, targetColIndex); colIndex <= colLen; colIndex++) {
        let tdElem = trElem.children[colIndex]
        cells.push(tdElem)
      }
      rows.push(cells)
    }
    return rows
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
