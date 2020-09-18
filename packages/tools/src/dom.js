import XEUtils from 'xe-utils/ctor'
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
  updateCellTitle (overflowElem, column) {
    const content = column.type === 'html' ? overflowElem.innerText : overflowElem.textContent
    if (overflowElem.getAttribute('title') !== content) {
      overflowElem.setAttribute('title', content)
    }
  },
  rowToVisible ($xetable, row) {
    const bodyElem = $xetable.$refs.tableBody.$el
    const trElem = bodyElem.querySelector(`[data-rowid="${UtilTools.getRowid($xetable, row)}"]`)
    if (trElem) {
      const bodyHeight = bodyElem.clientHeight
      const bodySrcollTop = bodyElem.scrollTop
      const trOffsetTop = trElem.offsetTop + (trElem.offsetParent ? trElem.offsetParent.offsetTop : 0)
      const trHeight = trElem.clientHeight
      // 检测行是否在可视区中
      if (trOffsetTop < bodySrcollTop || trOffsetTop > bodySrcollTop + bodyHeight) {
        // 向上定位
        return $xetable.scrollTo(null, trOffsetTop)
      } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
        // 向下定位
        return $xetable.scrollTo(null, bodySrcollTop + trHeight)
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($xetable.scrollYLoad) {
        return $xetable.scrollTo(null, ($xetable.afterFullData.indexOf(row) - 1) * $xetable.scrollYStore.rowHeight)
      }
    }
    return Promise.resolve()
  },
  colToVisible ($xetable, column) {
    const bodyElem = $xetable.$refs.tableBody.$el
    const tdElem = bodyElem.querySelector(`.${column.id}`)
    if (tdElem) {
      const bodyWidth = bodyElem.clientWidth
      const bodySrcollLeft = bodyElem.scrollLeft
      const tdOffsetLeft = tdElem.offsetLeft + (tdElem.offsetParent ? tdElem.offsetParent.offsetLeft : 0)
      const tdWidth = tdElem.clientWidth
      // 检测行是否在可视区中
      if (tdOffsetLeft < bodySrcollLeft || tdOffsetLeft > bodySrcollLeft + bodyWidth) {
        // 向左定位
        return $xetable.scrollTo(tdOffsetLeft)
      } else if (tdOffsetLeft + tdWidth >= bodyWidth + bodySrcollLeft) {
        // 向右定位
        return $xetable.scrollTo(bodySrcollLeft + tdWidth)
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($xetable.scrollXLoad) {
        const visibleColumn = $xetable.visibleColumn
        let scrollLeft = 0
        for (let index = 0; index < visibleColumn.length; index++) {
          if (visibleColumn[index] === column) {
            break
          }
          scrollLeft += visibleColumn[index].renderWidth
        }
        return $xetable.scrollTo(scrollLeft)
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
  getEventTargetNode (evnt, container, queryCls, queryMethod) {
    let targetElem
    let target = evnt.target
    while (target && target.nodeType && target !== document) {
      if (queryCls && DomTools.hasClass(target, queryCls) && (!queryMethod || queryMethod(target))) {
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
  /**
   * 获取单元格节点索引
   */
  getCellNodeIndex (cell) {
    const trElem = cell.parentNode
    const columnIndex = XEUtils.arrayIndexOf(trElem.children, cell)
    const rowIndex = XEUtils.arrayIndexOf(trElem.parentNode.children, trElem)
    return { columnIndex, rowIndex }
  },
  /**
   * 获取选中单元格矩阵范围
   */
  getRowNodes (trList, cellNode, targetCellNode) {
    const startColIndex = cellNode.columnIndex
    const startRowIndex = cellNode.rowIndex
    const targetColIndex = targetCellNode.columnIndex
    const targetRowIndex = targetCellNode.rowIndex
    const rows = []
    for (let rowIndex = Math.min(startRowIndex, targetRowIndex), rowLen = Math.max(startRowIndex, targetRowIndex); rowIndex <= rowLen; rowIndex++) {
      const cells = []
      const trElem = trList[rowIndex]
      for (let colIndex = Math.min(startColIndex, targetColIndex), colLen = Math.max(startColIndex, targetColIndex); colIndex <= colLen; colIndex++) {
        const tdElem = trElem.children[colIndex]
        cells.push(tdElem)
      }
      rows.push(cells)
    }
    return rows
  },
  getCellIndexs (cell) {
    const trElem = cell.parentNode
    const rowid = trElem.getAttribute('data-rowid')
    const columnIndex = [].indexOf.call(trElem.children, cell)
    const rowIndex = [].indexOf.call(trElem.parentNode.children, trElem)
    return { rowid, rowIndex, columnIndex }
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
  },
  calcHeight ($xetable, key) {
    const val = $xetable[key]
    let num = 0
    if (val) {
      if (val === 'auto') {
        num = $xetable.parentHeight
      } else {
        if (DomTools.isScale(val)) {
          num = Math.floor(parseInt(val) / 100 * $xetable.parentHeight)
        } else {
          num = XEUtils.toNumber(val)
        }
        num -= $xetable.getExcludeHeight()
      }
    }
    return num
  }
}

export default DomTools
