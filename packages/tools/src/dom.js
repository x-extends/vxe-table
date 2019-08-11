import XEUtils from 'xe-utils'
import UtilTools from './utils'

const browse = XEUtils.browse()
const htmlElem = document.querySelector('html')
const bodyElem = document.body

function rClass (cls) {
  if (!rClsMap[cls]) {
    rClsMap[cls] = new RegExp(`(?:^|\\s)${cls}(?!\\S)`, 'g')
  }
  return rClsMap[cls]
}

const rClsMap = {}

export const DomTools = {
  browse,
  isPx (val) {
    return val && /^\d+(px)?$/.test(val)
  },
  isScale (val) {
    return val && /^\d+%$/.test(val)
  },
  hasClass (elem, cls) {
    return elem && elem.className && elem.className.match && elem.className.match(rClass(cls))
  },
  removeClass (elem, cls) {
    if (elem && DomTools.hasClass(elem, cls)) {
      elem.className = elem.className.replace(rClass(cls), '')
    }
  },
  addClass (elem, cls) {
    if (elem && !DomTools.hasClass(elem, cls)) {
      DomTools.removeClass(elem, cls)
      elem.className = `${elem.className} ${cls}`
    }
  },
  updateCellTitle (evnt) {
    let cellElem = evnt.currentTarget.querySelector('.vxe-cell')
    let content = cellElem.innerText
    if (cellElem.getAttribute('title') !== content) {
      cellElem.setAttribute('title', content)
    }
  },
  rowToVisible ($table, row) {
    let bodyElem = $table.$refs.tableBody.$el
    let trElem = bodyElem.querySelector(`[data-rowid="${UtilTools.getRowid($table, row)}"]`)
    if (trElem) {
      let bodyHeight = bodyElem.clientHeight
      let bodySrcollTop = bodyElem.scrollTop
      let trOffsetTop = trElem.offsetTop + (trElem.offsetParent ? trElem.offsetParent.offsetTop : 0)
      let trHeight = trElem.clientHeight
      if (trOffsetTop < bodySrcollTop || trOffsetTop > bodySrcollTop + bodyHeight) {
        // 如果跨行滚动
        bodyElem.scrollTop = trOffsetTop
      } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
        bodyElem.scrollTop = bodySrcollTop + trHeight
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($table.scrollYLoad) {
        bodyElem.scrollTop = ($table.afterFullData.indexOf(row) - 1) * $table.scrollYStore.rowHeight
      }
    }
  },
  colToVisible ($table, column) {
    let bodyElem = $table.$refs.tableBody.$el
    let tdElem = bodyElem.querySelector(`.${column.id}`)
    if (tdElem) {
      let bodyWidth = bodyElem.clientWidth
      let bodySrcollLeft = bodyElem.scrollLeft
      let tdOffsetLeft = tdElem.offsetLeft + (tdElem.offsetParent ? tdElem.offsetParent.offsetLeft : 0)
      let tdWidth = tdElem.clientWidth
      if (tdOffsetLeft < bodySrcollLeft || tdOffsetLeft > bodySrcollLeft + bodyWidth) {
        // 如果跨列滚动
        bodyElem.scrollLeft = tdOffsetLeft
      } else if (tdOffsetLeft + tdWidth >= bodyWidth + bodySrcollLeft) {
        bodyElem.scrollLeft = bodySrcollLeft + tdWidth
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($table.scrollXLoad) {
        let visibleColumn = $table.visibleColumn
        let scrollLeft = 0
        for (let index = 0; index < visibleColumn.length; index++) {
          if (visibleColumn[index] === column) {
            break
          }
          scrollLeft += visibleColumn[index].renderWidth
        }
        bodyElem.scrollLeft = scrollLeft
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
    let rowid = trElem.getAttribute('data-rowid')
    let columnIndex = [].indexOf.call(trElem.children, cell)
    let rowIndex = [].indexOf.call(trElem.parentNode.children, trElem)
    return { rowid, rowIndex, columnIndex }
  },
  getCell ($table, { row, column }) {
    let rowid = UtilTools.getRowid($table, row)
    return $table.$refs.tableBody.$el.querySelector(`.vxe-body--row[data-rowid="${rowid}"] .${column.id}`)
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
