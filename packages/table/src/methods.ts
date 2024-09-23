import XEUtils from 'xe-utils'
import { browse, isPx, isScale, hasClass, addClass, removeClass, getEventTargetNode, getPaddingTopBottomSize, setScrollTop, setScrollLeft, isNodeElement } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex, hasChildrenList, getFuncText, isEnableConf, formatText, eqEmptyValue } from '../../ui/src/utils'
import { VxeUI } from '../../ui'
import Cell from './cell'
import { getRowUniqueId, clearTableAllStatus, getRowkey, getRowid, rowToVisible, colToVisible, getCellValue, setCellValue, handleFieldOrColumn, toTreePathSeq, restoreScrollLocation, restoreScrollListener, getRootColumn } from './util'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'

const { getConfig, getI18n, renderer, formats, interceptor } = VxeUI

const isWebkit = browse['-webkit'] && !browse.edge
const debounceScrollYDuration = browse.msie ? 80 : 20

const customStorageKey = 'VXE_CUSTOM_STORE'

// 获取所有的列，排除分组
const getColumnList = (columns: any[]) => {
  const result: any[] = []
  columns.forEach((column) => {
    result.push(...(column.children && column.children.length ? getColumnList(column.children) : [column]))
  })
  return result
}

function eqCellValue (row1: any, row2: any, field: any) {
  const val1 = XEUtils.get(row1, field)
  const val2 = XEUtils.get(row2, field)
  if (eqEmptyValue(val1) && eqEmptyValue(val2)) {
    return true
  }
  if (XEUtils.isString(val1) || XEUtils.isNumber(val1)) {
    return ('' + val1) === ('' + val2)
  }
  return XEUtils.isEqual(val1, val2)
}

function getNextSortOrder (_vm: any, column: any) {
  const orders = _vm.sortOpts.orders
  const currOrder = column.order || null
  const oIndex = orders.indexOf(currOrder) + 1
  return orders[oIndex < orders.length ? oIndex : 0]
}

const getCustomStorageMap = (id?: any) => {
  const version = getConfig().version
  const rest = XEUtils.toStringJSON(localStorage.getItem(customStorageKey) || '')
  const maps = rest && rest._v === version ? rest : { _v: version }
  return (id ? maps[id] : maps) || {}
}

const setCustomStorageMap = (id: any, data: any) => {
  const version = getConfig().version
  const maps = getCustomStorageMap()
  maps[id] = data || undefined
  maps._v = version
  localStorage.setItem(customStorageKey, XEUtils.toJSONString(maps))
}

const getRecoverRowMaps = (_vm: any, keyMaps: any) => {
  const { fullAllDataRowIdData } = _vm
  const restKeys: any = {}
  XEUtils.each(keyMaps, (row, rowid) => {
    if (fullAllDataRowIdData[rowid]) {
      restKeys[rowid] = row
    }
  })
  return restKeys
}

function handleReserveRow (_vm: any, reserveRowMap: any) {
  const { fullDataRowIdData } = _vm
  const reserveList: any[] = []
  XEUtils.each(reserveRowMap, (item, rowid) => {
    if (fullDataRowIdData[rowid] && reserveList.indexOf(fullDataRowIdData[rowid].row) === -1) {
      reserveList.push(fullDataRowIdData[rowid].row)
    }
  })
  return reserveList
}

function computeVirtualX (_vm: any) {
  const { $refs, visibleColumn } = _vm
  const { tableBody } = $refs
  const tableBodyElem = tableBody ? tableBody.$el : null
  if (tableBodyElem) {
    const { scrollLeft, clientWidth } = tableBodyElem
    const endWidth = scrollLeft + clientWidth
    let toVisibleIndex = -1
    let cWidth = 0
    let visibleSize = 0
    for (let colIndex = 0, colLen = visibleColumn.length; colIndex < colLen; colIndex++) {
      cWidth += visibleColumn[colIndex].renderWidth
      if (toVisibleIndex === -1 && scrollLeft < cWidth) {
        toVisibleIndex = colIndex
      }
      if (toVisibleIndex >= 0) {
        visibleSize++
        if (cWidth > endWidth) {
          break
        }
      }
    }
    return { toVisibleIndex: Math.max(0, toVisibleIndex), visibleSize: Math.max(8, visibleSize) }
  }
  return { toVisibleIndex: 0, visibleSize: 8 }
}

function computeVirtualY (_vm: any) {
  const { $refs, computeSize, rowHeightMaps } = _vm
  const { tableHeader, tableBody } = $refs
  const tableBodyElem = tableBody ? tableBody.$el : null
  const vSize = computeSize
  if (tableBodyElem) {
    const tableHeaderElem = tableHeader ? tableHeader.$el : null
    let rowHeight = 0
    let firstTrElem
    firstTrElem = tableBodyElem.querySelector('tr')
    if (!firstTrElem && tableHeaderElem) {
      firstTrElem = tableHeaderElem.querySelector('tr')
    }
    if (firstTrElem) {
      rowHeight = firstTrElem.clientHeight
    }
    if (!rowHeight) {
      rowHeight = rowHeightMaps[vSize || 'default']
    }
    const visibleSize = Math.max(8, Math.ceil(tableBodyElem.clientHeight / rowHeight) + 2)
    return { rowHeight, visibleSize }
  }
  return { rowHeight: 0, visibleSize: 8 }
}

function calculateMergerOffserIndex (list: any, offsetItem: any, type: any) {
  for (let mcIndex = 0, len = list.length; mcIndex < len; mcIndex++) {
    const mergeItem = list[mcIndex]
    const { startIndex, endIndex } = offsetItem
    const mergeStartIndex = mergeItem[type]
    const mergeSpanNumber = mergeItem[type + 'span']
    const mergeEndIndex = mergeStartIndex + mergeSpanNumber
    if (mergeStartIndex < startIndex && startIndex < mergeEndIndex) {
      offsetItem.startIndex = mergeStartIndex
    }
    if (mergeStartIndex < endIndex && endIndex < mergeEndIndex) {
      offsetItem.endIndex = mergeEndIndex
    }
    if (offsetItem.startIndex !== startIndex || offsetItem.endIndex !== endIndex) {
      mcIndex = -1
    }
  }
}

function setMerges (_vm: any, merges: any, mList: any, rowList: any) {
  if (merges) {
    const { treeConfig, visibleColumn } = _vm
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    if (treeConfig && merges.length) {
      errLog('vxe.error.noTree', ['merge-cells | merge-footer-items'])
    }
    merges.forEach((item: any) => {
      let { row, col, rowspan, colspan } = item
      if (rowList && XEUtils.isNumber(row)) {
        row = rowList[row]
      }
      if (XEUtils.isNumber(col)) {
        col = visibleColumn[col]
      }
      if ((rowList ? row : XEUtils.isNumber(row)) && col && (rowspan || colspan)) {
        rowspan = XEUtils.toNumber(rowspan) || 1
        colspan = XEUtils.toNumber(colspan) || 1
        if (rowspan > 1 || colspan > 1) {
          const mcIndex = XEUtils.findIndexOf(mList, item => item._row === row && item._col === col)
          const mergeItem = mList[mcIndex]
          if (mergeItem) {
            mergeItem.rowspan = rowspan
            mergeItem.colspan = colspan
            mergeItem._rowspan = rowspan
            mergeItem._colspan = colspan
          } else {
            const mergeRowIndex = rowList ? rowList.indexOf(row) : row
            const mergeColIndex = visibleColumn.indexOf(col)
            mList.push({
              row: mergeRowIndex,
              col: mergeColIndex,
              rowspan,
              colspan,
              _row: row,
              _col: col,
              _rowspan: rowspan,
              _colspan: colspan
            })
          }
        }
      }
    })
  }
}

function removeMerges (_vm: any, merges: any, mList: any, rowList: any) {
  const rest: any[] = []
  if (merges) {
    const { treeConfig, visibleColumn } = _vm
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    if (treeConfig && merges.length) {
      errLog('vxe.error.noTree', ['merge-cells | merge-footer-items'])
    }
    merges.forEach((item: any) => {
      let { row, col } = item
      if (rowList && XEUtils.isNumber(row)) {
        row = rowList[row]
      }
      if (XEUtils.isNumber(col)) {
        col = visibleColumn[col]
      }
      const mcIndex = XEUtils.findIndexOf(mList, item => item._row === row && item._col === col)
      if (mcIndex > -1) {
        const rItems = mList.splice(mcIndex, 1)
        rest.push(rItems[0])
      }
    })
  }
  return rest
}

function clearAllSort (_vm: any) {
  _vm.tableFullColumn.forEach((column: any) => {
    column.order = null
  })
}

function calcHeight (_vm: any, key: 'height' | 'minHeight' | 'maxHeight') {
  const { parentHeight } = _vm
  const val = _vm[key]
  let num = 0
  if (val) {
    if (val === '100%' || val === 'auto') {
      num = parentHeight
    } else {
      const excludeHeight = _vm.getExcludeHeight()
      if (isScale(val)) {
        num = Math.floor((XEUtils.toInteger(val) || 1) / 100 * parentHeight)
      } else {
        num = XEUtils.toNumber(val)
      }
      num = Math.max(40, num - excludeHeight)
    }
  }
  return num
}

function getOrderField (_vm: any, column: any) {
  const { sortBy, sortType } = column
  return (row: any) => {
    let cellValue
    if (sortBy) {
      cellValue = XEUtils.isFunction(sortBy) ? sortBy({ row, column }) : XEUtils.get(row, sortBy)
    } else {
      cellValue = _vm.getCellLabel(row, column)
    }
    if (!sortType || sortType === 'auto') {
      return isNaN(cellValue) ? cellValue : XEUtils.toNumber(cellValue)
    } else if (sortType === 'number') {
      return XEUtils.toNumber(cellValue)
    } else if (sortType === 'string') {
      return XEUtils.toValueString(cellValue)
    }
    return cellValue
  }
}

const Methods = {
  callSlot (slotFunc: any, params: any, h: any, vNodes: any) {
    if (slotFunc) {
      const { $xegrid } = this
      if ($xegrid) {
        return $xegrid.callSlot(slotFunc, params, h, vNodes)
      }
      if (XEUtils.isFunction(slotFunc)) {
        return getSlotVNs(slotFunc.call(this, params, h, vNodes))
      }
    }
    return []
  },
  /**
   * 获取父容器元素
   */
  getParentElem () {
    const { $el, $xegrid } = this
    return $xegrid ? $xegrid.$el.parentNode : $el.parentNode
  },
  /**
   * 获取父容器的高度
   */
  getParentHeight () {
    const { $el, $xegrid, height } = this
    const parentElem = $el.parentNode
    const parentPaddingSize = height === '100%' || height === 'auto' ? getPaddingTopBottomSize(parentElem) : 0
    return Math.floor($xegrid ? $xegrid.getParentHeight() : XEUtils.toNumber(getComputedStyle(parentElem).height) - parentPaddingSize)
  },
  /**
   * 获取需要排除的高度
   * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
   * 如果存在表尾合计滚动条，则需要排除滚动条高度
   */
  getExcludeHeight () {
    const { $xegrid } = this
    return $xegrid ? $xegrid.getExcludeHeight() : 0
  },
  /**
   * 重置表格的一切数据状态
   */
  clearAll () {
    return clearTableAllStatus(this)
  },
  /**
   * 同步 data 数据（即将废弃）
   * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   */
  syncData () {
    warnLog('vxe.error.delFunc', ['syncData', 'getData'])
    return this.$nextTick().then(() => {
      this.tableData = []
      return this.$nextTick().then(() => this.loadTableData(this.tableFullData))
    })
  },
  /**
   * 手动处理数据，用于手动排序与筛选
   * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
   */
  updateData () {
    const { scrollXLoad, scrollYLoad } = this
    return this.handleTableData(true).then(() => {
      this.updateFooter()
      this.checkSelectionStatus()
      if (scrollXLoad || scrollYLoad) {
        if (scrollXLoad) {
          this.updateScrollXSpace()
        }
        if (scrollYLoad) {
          this.updateScrollYSpace()
        }
        return this.refreshScroll()
      }
    }).then(() => {
      this.updateCellAreas()
      return this.recalculate(true)
    }).then(() => {
      // 存在滚动行为未结束情况
      setTimeout(() => this.recalculate(), 50)
    })
  },
  handleTableData (force: any) {
    const { scrollYLoad, scrollYStore, fullDataRowIdData, afterFullData } = this
    let fullList = afterFullData
    // 是否进行数据处理
    if (force) {
      // 更新数据，处理筛选和排序
      this.updateAfterFullData()
      // 如果为虚拟树，将树结构拍平
      fullList = this.handleVirtualTreeToList()
    }
    const tableData = scrollYLoad ? fullList.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullList.slice(0)
    tableData.forEach((row: any, $index: any) => {
      const rowid = getRowid(this, row)
      const rest = fullDataRowIdData[rowid]
      if (rest) {
        rest.$index = $index
      }
    })
    this.tableData = tableData
    return this.$nextTick()
  },
  updateScrollYStatus (fullData: any) {
    const { treeConfig, treeOpts, sYOpts } = this
    const { transform } = treeOpts
    const allList = fullData || this.tableFullData
    // 如果gt为0，则总是启用
    const scrollYLoad = (transform || !treeConfig) && !!sYOpts.enabled && sYOpts.gt > -1 && (sYOpts.gt === 0 || sYOpts.gt <= allList.length)
    this.scrollYLoad = scrollYLoad
    return scrollYLoad
  },
  /**
   * 加载表格数据
   * @param {Array} datas 数据
   */
  loadTableData (datas: any) {
    const { keepSource, treeConfig, treeOpts, editStore, scrollYStore, scrollXStore, lastScrollLeft, lastScrollTop, scrollYLoad: oldScrollYLoad, sXOpts, sYOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    let treeData = []
    let fullData = datas ? datas.slice(0) : []
    if (treeConfig) {
      // 树结构自动转换
      if (treeOpts.transform) {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (!treeOpts.rowField) {
            errLog('vxe.error.reqProp', ['table.tree-config.rowField'])
          }
          if (!treeOpts.parentField) {
            errLog('vxe.error.reqProp', ['table.tree-config.parentField'])
          }
          if (!childrenField) {
            errLog('vxe.error.reqProp', ['tree-config.childrenField'])
          }
          if (!treeOpts.mapChildrenField) {
            errLog('vxe.error.reqProp', ['tree-config.mapChildrenField'])
          }
          if (childrenField === treeOpts.mapChildrenField) {
            errLog('vxe.error.errConflicts', ['tree-config.childrenField', 'tree-config.mapChildrenField'])
          }
          // fullData.forEach(row => {
          //   if (row[childrenField] && row[childrenField].length) {
          //     warnLog('vxe.error.errConflicts', ['tree-config.transform', `row.${childrenField}`])
          //   }
          // })
        }
        treeData = XEUtils.toArrayTree(fullData, {
          key: treeOpts.rowField,
          parentKey: treeOpts.parentField,
          children: childrenField,
          mapChildren: treeOpts.mapChildrenField
        })
        fullData = treeData.slice(0)
      } else {
        treeData = fullData.slice(0)
      }
    }
    scrollYStore.startIndex = 0
    scrollYStore.endIndex = 1
    scrollXStore.startIndex = 0
    scrollXStore.endIndex = 1
    editStore.insertList = []
    editStore.insertMaps = {}
    editStore.removeList = []
    editStore.removeMaps = {}
    const sYLoad = this.updateScrollYStatus(fullData)
    this.scrollYLoad = sYLoad
    // 全量数据
    this.tableFullData = fullData
    this.tableFullTreeData = treeData
    // 缓存数据
    this.cacheRowMap(true)
    // 原始数据
    this.tableSynchData = datas
    // 克隆原数据，用于显示编辑状态，与编辑值做对比
    if (keepSource) {
      this.cacheSourceMap(fullData)
    }
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      if (sYLoad) {
        if (!(this.height || this.maxHeight)) {
          errLog('vxe.error.reqProp', ['table.height | table.max-height | table.scroll-y={enabled: false}'])
        }
        if (!this.showOverflow) {
          warnLog('vxe.error.reqProp', ['table.show-overflow'])
        }
        if (this.spanMethod) {
          warnLog('vxe.error.scrollErrProp', ['table.span-method'])
        }
      }
    }
    if (this.clearCellAreas && this.mouseConfig) {
      this.clearCellAreas()
      this.clearCopyCellArea()
    }
    this.clearMergeCells()
    this.clearMergeFooterItems()
    this.handleTableData(true)
    this.updateFooter()
    return this.$nextTick().then(() => {
      this.updateHeight()
      this.updateStyle()
    }).then(() => {
      this.computeScrollLoad()
    }).then(() => {
      // 是否启用了虚拟滚动
      if (sYLoad) {
        scrollYStore.endIndex = scrollYStore.visibleSize
      }
      this.handleReserveStatus()
      this.checkSelectionStatus()
      return new Promise(resolve => {
        this.$nextTick()
          .then(() => this.recalculate())
          .then(() => {
            let targetScrollLeft = lastScrollLeft
            let targetScrollTop = lastScrollTop
            // 是否在更新数据之后自动滚动重置滚动条
            if (sXOpts.scrollToLeftOnChange) {
              targetScrollLeft = 0
            }
            if (sYOpts.scrollToTopOnChange) {
              targetScrollTop = 0
            }
            // 是否变更虚拟滚动
            if (oldScrollYLoad === sYLoad) {
              restoreScrollLocation(this, targetScrollLeft, targetScrollTop).then(resolve)
            } else {
              setTimeout(() => restoreScrollLocation(this, targetScrollLeft, targetScrollTop).then(resolve))
            }
          })
      })
    })
  },
  /**
   * 重新加载数据，不会清空表格状态
   * @param {Array} datas 数据
   */
  loadData (datas: any) {
    const { inited, initStatus } = this
    return this.loadTableData(datas).then(() => {
      this.inited = true
      this.initStatus = true
      if (!initStatus) {
        this.handleLoadDefaults()
      }
      if (!inited) {
        this.handleInitDefaults()
      }
      return this.recalculate()
    })
  },
  /**
   * 重新加载数据，会清空表格状态
   * @param {Array} datas 数据
   */
  reloadData (datas: any) {
    const { inited } = this
    return this.clearAll()
      .then(() => {
        this.inited = true
        this.initStatus = true
        return this.loadTableData(datas)
      })
      .then(() => {
        this.handleLoadDefaults()
        if (!inited) {
          this.handleInitDefaults()
        }
        return this.recalculate()
      })
  },
  /**
   * 修改行数据
   */
  setRow (rows: any, record: any) {
    if (record) {
      let rest = rows
      if (!XEUtils.isArray(rows)) {
        rest = [rows]
      }
      rest.forEach((item:any) => Object.assign(item, record))
    }
    return this.$nextTick()
  },
  /**
   * 局部加载行数据并恢复到初始状态
   * 对于行数据需要局部更改的场景中可能会用到
   * @param {Row} row 行对象
   * @param {Object} record 新数据
   * @param {String} field 字段名
   */
  reloadRow (row: any, record: any, field: any) {
    const { keepSource, tableSourceData, tableData } = this
    if (keepSource) {
      const rowIndex = this.getRowIndex(row)
      const oRow = tableSourceData[rowIndex]
      if (oRow && row) {
        if (field) {
          const newValue = XEUtils.get(record || row, field)
          XEUtils.set(row, field, newValue)
          XEUtils.set(oRow, field, newValue)
        } else {
          const newRecord = XEUtils.clone({ ...record }, true)
          XEUtils.destructuring(oRow, Object.assign(row, newRecord))
        }
      }
      this.tableData = tableData.slice(0)
    } else {
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        warnLog('vxe.error.reqProp', ['keep-source'])
      }
    }
    return this.$nextTick()
  },
  /**
   * 加载列配置
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  loadColumn (columns: any) {
    const collectColumn = XEUtils.mapTree(columns, column => Cell.createColumn(this, column), { children: 'children' })
    return this.handleColumn(collectColumn)
  },
  /**
   * 加载列配置并恢复到初始状态
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  reloadColumn (columns: any) {
    return this.clearAll().then(() => {
      return this.loadColumn(columns)
    })
  },
  initColumnSort  () {
    const { collectColumn } = this
    collectColumn.forEach((column: any, index: any) => {
      const sortIndex = index + 1
      column.sortNumber = sortIndex
      column.renderSortNumber = sortIndex
    })
  },
  handleColumn (collectColumn: any) {
    this.collectColumn = collectColumn
    const tableFullColumn = getColumnList(collectColumn)
    this.tableFullColumn = tableFullColumn
    this._isLoading = true
    this.initColumnSort()
    return Promise.resolve(
      this.restoreCustomStorage()
    ).then(() => {
      this._isLoading = false
      this.cacheColumnMap()
      this.parseColumns().then(() => {
        if (this.scrollXLoad) {
          this.loadScrollXData(true)
        }
      })
      this.clearMergeCells()
      this.clearMergeFooterItems()
      this.handleTableData(true)
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if ((this.scrollXLoad || this.scrollYLoad) && this.expandColumn) {
          warnLog('vxe.error.scrollErrProp', ['column.type=expand'])
        }
      }
      return this.$nextTick().then(() => {
        if (this.$toolbar) {
          this.$toolbar.syncUpdate({ collectColumn, $table: this })
        }
        return this.recalculate()
      })
    })
  },
  /**
   * 更新数据行的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  cacheRowMap (source: any) {
    const { treeConfig, treeOpts, tableFullData, fullDataRowMap, fullAllDataRowMap, tableFullTreeData } = this
    let { fullDataRowIdData, fullAllDataRowIdData } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const rowkey = getRowkey(this)
    const isLazy = treeConfig && treeOpts.lazy
    const handleCache = (row: any, index: any, items: any, path: any, parent: any, nodes: any) => {
      let rowid = getRowid(this, row)
      const seq = treeConfig && path ? toTreePathSeq(path) : index + 1
      const level = nodes ? nodes.length - 1 : 0
      if (eqEmptyValue(rowid)) {
        rowid = getRowUniqueId()
        XEUtils.set(row, rowkey, rowid)
      }
      if (isLazy && row[hasChildField] && XEUtils.isUndefined(row[childrenField])) {
        row[childrenField] = null
      }
      const rest = { row, rowid, seq, index: treeConfig && parent ? -1 : index, _index: -1, $index: -1, items, parent, level }
      if (source) {
        fullDataRowIdData[rowid] = rest
        fullDataRowMap.set(row, rest)
      }
      fullAllDataRowIdData[rowid] = rest
      fullAllDataRowMap.set(row, rest)
    }
    if (source) {
      fullDataRowIdData = this.fullDataRowIdData = {}
      fullDataRowMap.clear()
    }
    fullAllDataRowIdData = this.fullAllDataRowIdData = {}
    fullAllDataRowMap.clear()
    if (treeConfig) {
      XEUtils.eachTree(tableFullTreeData, handleCache, { children: childrenField })
    } else {
      tableFullData.forEach(handleCache)
    }
  },
  cacheSourceMap (fullData: any) {
    let { treeConfig, treeOpts, sourceDataRowIdData } = this
    const sourceData = XEUtils.clone(fullData, true)
    const rowkey = getRowkey(this)
    sourceDataRowIdData = this.sourceDataRowIdData = {}
    const handleSourceRow = (row: any) => {
      let rowid = getRowid(this, row)
      if (eqEmptyValue(rowid)) {
        rowid = getRowUniqueId()
        XEUtils.set(row, rowkey, rowid)
      }
      sourceDataRowIdData[rowid] = {
        row,
        rowid
      }
    }
    // 源数据缓存
    if (treeConfig) {
      const childrenField = treeOpts.children || treeOpts.childrenField
      XEUtils.eachTree(sourceData, handleSourceRow, { children: treeOpts.transform ? treeOpts.mapChildrenField : childrenField })
    } else {
      sourceData.forEach(handleSourceRow)
    }
    this.tableSourceData = sourceData
  },
  getParams () {
    return this.params
  },
  loadTreeChildren (row: any, childRecords: any) {
    const { keepSource, tableSourceData, treeOpts, fullDataRowIdData, fullDataRowMap, fullAllDataRowMap, fullAllDataRowIdData, sourceDataRowIdData } = this
    const { transform, mapChildrenField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const rest = fullAllDataRowIdData[getRowid(this, row)]
    const parentLevel = rest ? rest.level : 0
    return this.createData(childRecords).then((rows: any) => {
      if (keepSource) {
        const rowid = getRowid(this, row)
        const matchObj = XEUtils.findTree(tableSourceData as any[], (item) => rowid === getRowid(this, item), { children: childrenField })
        if (matchObj) {
          matchObj.item[childrenField] = XEUtils.clone(rows, true)
        }
        rows.forEach((childRow: any) => {
          const rowid = getRowid(this, childRow)
          sourceDataRowIdData[rowid] = XEUtils.clone(childRow, true)
        })
      }
      XEUtils.eachTree(rows, (childRow, index, items, path, parent, nodes) => {
        const rowid = getRowid(this, childRow)
        const parentRow = parent || row
        const rest = { row: childRow, rowid, seq: -1, index, _index: -1, $index: -1, items, parent: parentRow, level: parentLevel + nodes.length }
        fullDataRowIdData[rowid] = rest
        fullDataRowMap.set(childRow, rest)
        fullAllDataRowIdData[rowid] = rest
        fullAllDataRowMap.set(childRow, rest)
      }, { children: childrenField })
      row[childrenField] = rows
      if (transform) {
        row[mapChildrenField] = XEUtils.clone(rows, false)
      }
      this.updateAfterDataIndex()
      return rows
    })
  },
  /**
   * 更新数据列的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  cacheColumnMap () {
    const { tableFullColumn, collectColumn, fullColumnMap, showOverflow, columnOpts, rowOpts } = this
    const fullColumnIdData: any = this.fullColumnIdData = {}
    const fullColumnFieldData: any = this.fullColumnFieldData = {}
    const isGroup = collectColumn.some(hasChildrenList)
    let isAllOverflow = !!showOverflow
    let expandColumn: any
    let treeNodeColumn: any
    let checkboxColumn: any
    let radioColumn: any
    let htmlColumn: any
    let hasFixed: any
    const handleFunc = (column: any, index: any, items: any, path: any, parent: any) => {
      const { id: colid, field, fixed, type, treeNode } = column
      const rest = { column, colid, index, items, parent }
      if (field) {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (fullColumnFieldData[field]) {
            warnLog('vxe.error.colRepet', ['field', field])
          }
        }
        fullColumnFieldData[field] = rest
      }

      if (!hasFixed && fixed) {
        hasFixed = fixed
      }
      if (!htmlColumn && type === 'html') {
        htmlColumn = column
      }

      if (treeNode) {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (treeNodeColumn) {
            warnLog('vxe.error.colRepet', ['tree-node', treeNode])
          }
        }
        if (!treeNodeColumn) {
          treeNodeColumn = column
        }
      } else if (type === 'expand') {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (expandColumn) {
            warnLog('vxe.error.colRepet', ['type', type])
          }
        }
        if (!expandColumn) {
          expandColumn = column
        }
      }
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (type === 'checkbox') {
          if (checkboxColumn) {
            warnLog('vxe.error.colRepet', ['type', type])
          }
          if (!checkboxColumn) {
            checkboxColumn = column
          }
        } else if (type === 'radio') {
          if (radioColumn) {
            warnLog('vxe.error.colRepet', ['type', type])
          }
          if (!radioColumn) {
            radioColumn = column
          }
        }
      }
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (this.showOverflow && column.showOverflow === false) {
          warnLog('vxe.error.errConflicts', [`table.show-overflow=${this.showOverflow}`, `column.show-overflow=${column.showOverflow}`])
        }
        if (this.showHeaderOverflow && column.showHeaderOverflow === false) {
          warnLog('vxe.error.errConflicts', [`table.show-header-overflow=${this.showHeaderOverflow}`, `column.show-header-overflow=${column.showHeaderOverflow}`])
        }
        if (this.showFooterOverflow && column.showFooterOverflow === false) {
          warnLog('vxe.error.errConflicts', [`table.show-footer-overflow=${this.showFooterOverflow}`, `column.show-footer-overflow=${column.showFooterOverflow}`])
        }
      }

      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (htmlColumn) {
          if (!columnOpts.useKey) {
            errLog('vxe.error.reqProp', ['column-config.useKey', 'column.type=html'])
          }
          if (!rowOpts.useKey) {
            errLog('vxe.error.reqProp', ['row-config.useKey', 'column.type=html'])
          }
        }
      }

      if (isAllOverflow && column.showOverflow === false) {
        isAllOverflow = false
      }
      if (fullColumnIdData[colid]) {
        errLog('vxe.error.colRepet', ['colId', colid])
      }
      fullColumnIdData[colid] = rest
      fullColumnMap.set(column, rest)
    }
    fullColumnMap.clear()
    if (isGroup) {
      XEUtils.eachTree(collectColumn, (column, index, items, path, parent, nodes) => {
        column.level = nodes.length
        handleFunc(column, index, items, path, parent)
      })
    } else {
      tableFullColumn.forEach(handleFunc)
    }

    if (process.env.VUE_APP_VXE_ENV === 'development') {
      if (expandColumn && this.mouseOpts.area) {
        errLog('vxe.error.errConflicts', ['mouse-config.area', 'column.type=expand'])
      }
    }

    this.isGroup = isGroup
    this.treeNodeColumn = treeNodeColumn
    this.expandColumn = expandColumn
    this.isAllOverflow = isAllOverflow
  },
  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param {Element} tr 元素
   */
  getRowNode (tr: any) {
    if (tr) {
      const { fullAllDataRowIdData } = this
      const rowid = tr.getAttribute('rowid')
      const rest = fullAllDataRowIdData[rowid]
      if (rest) {
        return { rowid: rest.rowid, item: rest.row, index: rest.index, items: rest.items, parent: rest.parent }
      }
    }
    return null
  },
  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param {Element} cell 元素
   */
  getColumnNode (cell: any) {
    if (cell) {
      const { fullColumnIdData } = this
      const colid = cell.getAttribute('colid')
      const rest = fullColumnIdData[colid]
      if (rest) {
        return { colid: rest.colid, item: rest.column, index: rest.index, items: rest.items, parent: rest.parent }
      }
    }
    return null
  },
  /**
   * 根据 row 获取序号
   * @param {Row} row 行对象
   */
  getRowSeq (row: any) {
    const { fullDataRowIdData } = this
    if (row) {
      const rowid = getRowid(this, row)
      const rest = fullDataRowIdData[rowid]
      if (rest) {
        return rest.seq
      }
    }
    return -1
  },
  /**
   * 根据 row 获取相对于 data 中的索引
   * @param {Row} row 行对象
   */
  getRowIndex (row: any) {
    return this.fullDataRowMap.has(row) ? this.fullDataRowMap.get(row).index : -1
  },
  /**
   * 根据 row 获取相对于当前数据中的索引
   * @param {Row} row 行对象
   */
  getVTRowIndex (row: any) {
    return this.afterFullData.indexOf(row)
  },
  // 在 v3 中废弃
  _getRowIndex (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['_getRowIndex', 'getVTRowIndex'])
    }
    return this.getVTRowIndex(row)
  },
  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param {Row} row 行对象
   */
  getVMRowIndex (row: any) {
    return this.tableData.indexOf(row)
  },
  // 在 v3 中废弃
  $getRowIndex (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['$getRowIndex', 'getVMRowIndex'])
    }
    return this.getVMRowIndex(row)
  },
  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param {ColumnInfo} column 列配置
   */
  getColumnIndex (column: any) {
    return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1
  },
  /**
   * 根据 column 获取相对于当前表格列中的索引
   * @param {ColumnInfo} column 列配置
   */
  getVTColumnIndex (column: any) {
    return this.visibleColumn.indexOf(column)
  },
  // 在 v3 中废弃
  _getColumnIndex (column: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['_getColumnIndex', 'getVTColumnIndex'])
    }
    return this.getVTColumnIndex(column)
  },
  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param {ColumnInfo} column 列配置
   */
  getVMColumnIndex (column: any) {
    return this.tableColumn.indexOf(column)
  },
  // 在 v3 中废弃
  $getColumnIndex (column: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['$getColumnIndex', 'getVMColumnIndex'])
    }
    return this.getVMColumnIndex(column)
  },
  /**
   * 判断是否为索引列
   * @param {ColumnInfo} column 列配置
   */
  isSeqColumn (column: any) {
    return column && column.type === 'seq'
  },
  /**
   * 定义行数据中的列属性，如果不存在则定义
   * @param {Row} records 行数据
   */
  defineField (records: any) {
    const { radioOpts, checkboxOpts, treeConfig, treeOpts, expandOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const rowkey = getRowkey(this)
    if (!XEUtils.isArray(records)) {
      records = [records || {}]
    }
    return records.map((record: any) => {
      this.tableFullColumn.forEach((column: any) => {
        const { field, editRender } = column
        if (field && !XEUtils.has(record, field)) {
          let cellValue = null
          if (editRender) {
            const { defaultValue } = editRender
            if (XEUtils.isFunction(defaultValue)) {
              cellValue = defaultValue({ column })
            } else if (!XEUtils.isUndefined(defaultValue)) {
              cellValue = defaultValue
            }
          }
          XEUtils.set(record, field, cellValue)
        }
      })
      const otherFields = [radioOpts.labelField, checkboxOpts.checkField, checkboxOpts.labelField, expandOpts.labelField]
      otherFields.forEach((key) => {
        if (key && eqEmptyValue(XEUtils.get(record, key))) {
          XEUtils.set(record, key, null)
        }
      })
      if (treeConfig && treeOpts.lazy && XEUtils.isUndefined(record[childrenField])) {
        record[childrenField] = null
      }
      // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数
      if (eqEmptyValue(XEUtils.get(record, rowkey))) {
        XEUtils.set(record, rowkey, getRowUniqueId())
      }
      return record
    })
  },
  /**
   * 创建 data 对象
   * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
   * @param {Array} records 新数据
   */
  createData (records: any) {
    return this.$nextTick().then(() => {
      return this.defineField(records)
    })
  },
  /**
   * 创建 Row|Rows 对象
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param {Array/Object} records 新数据
   */
  createRow (records: any) {
    const isArr = XEUtils.isArray(records)
    if (!isArr) {
      records = [records]
    }
    return this.createData(records).then((rows: any) => isArr ? rows : rows[0])
  },
  /**
   * 还原数据
   * 如果不传任何参数，则还原整个表格
   * 如果传 row 则还原一行
   * 如果传 rows 则还原多行
   * 如果还额外传了 field 则还原指定的单元格数据
   */
  revertData (rows: any, field: any) {
    const { keepSource, tableSourceData, treeConfig } = this
    if (!keepSource) {
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        warnLog('vxe.error.reqProp', ['keep-source'])
      }
      return this.$nextTick()
    }
    let targetRows = rows
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        targetRows = [rows]
      }
    } else {
      targetRows = XEUtils.toArray(this.getUpdateRecords())
    }
    if (targetRows.length) {
      targetRows.forEach((row: any) => {
        if (!this.isInsertByRow(row)) {
          const rowIndex = this.getRowIndex(row)
          if (treeConfig && rowIndex === -1) {
            errLog('vxe.error.noTree', ['revertData'])
          }
          const oRow = tableSourceData[rowIndex]
          if (oRow && row) {
            if (field) {
              XEUtils.set(row, field, XEUtils.clone(XEUtils.get(oRow, field), true))
            } else {
              XEUtils.destructuring(row, XEUtils.clone(oRow, true))
            }
          }
        }
      })
    }
    if (rows) {
      return this.$nextTick()
    }
    return this.reloadData(tableSourceData)
  },
  /**
   * 清空单元格内容
   * 如果不创参数，则清空整个表格内容
   * 如果传 row 则清空一行内容
   * 如果传 rows 则清空多行内容
   * 如果还额外传了 field 则清空指定单元格内容
   * @param {Array/Row} rows 行数据
   * @param {String} field 字段名
   */
  clearData (rows: any, field: any) {
    const { tableFullData, visibleColumn } = this
    if (!arguments.length) {
      rows = tableFullData
    } else if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    if (field) {
      rows.forEach((row: any) => XEUtils.set(row, field, null))
    } else {
      rows.forEach((row: any) => {
        visibleColumn.forEach((column: any) => {
          if (column.field) {
            setCellValue(row, column, null)
          }
        })
      })
    }
    return this.$nextTick()
  },
  getCellElement (row: any, fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (!column) {
      return null
    }
    const { $refs } = this
    const rowid = getRowid(this, row)
    let bodyElem = null
    if (column) {
      bodyElem = $refs[`${column.fixed || 'table'}Body`] || $refs.tableBody
    }
    if (bodyElem && bodyElem.$el) {
      return bodyElem.$el.querySelector(`.vxe-body--row[rowid="${rowid}"] .${column.id}`)
    }
    return null
  },
  getCellLabel (row: any, fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (!column) {
      return null
    }
    const formatter = column.formatter
    const cellValue = getCellValue(row, column)
    let cellLabel = cellValue
    if (formatter) {
      let rest, formatData
      const { fullAllDataRowMap } = this
      const colid = column.id
      const cacheFormat = fullAllDataRowMap.has(row)
      if (cacheFormat) {
        rest = fullAllDataRowMap.get(row)
        formatData = rest.formatData
        if (!formatData) {
          formatData = fullAllDataRowMap.get(row).formatData = {}
        }
        if (rest && formatData[colid]) {
          if (formatData[colid].value === cellValue) {
            return formatData[colid].label
          }
        }
      }
      const formatParams = { cellValue, row, rowIndex: this.getRowIndex(row), column, columnIndex: this.getColumnIndex(column) }
      if (XEUtils.isString(formatter)) {
        const gFormatOpts = formats.get(formatter)
        cellLabel = gFormatOpts && gFormatOpts.cellFormatMethod ? gFormatOpts.cellFormatMethod(formatParams) : ''
      } else if (XEUtils.isArray(formatter)) {
        const gFormatOpts = formats.get(formatter[0])
        cellLabel = gFormatOpts && gFormatOpts.cellFormatMethod ? gFormatOpts.cellFormatMethod(formatParams, ...formatter.slice(1)) : ''
      } else {
        cellLabel = formatter(formatParams)
      }
      if (formatData) {
        formatData[colid] = { value: cellValue, label: cellLabel }
      }
    }
    return cellLabel
  },
  /**
   * 检查是否为临时行数据
   * @param {Row} row 行对象
   */
  isInsertByRow (row: any) {
    const { editStore } = this
    const rowid = getRowid(this, row)
    return editStore.insertList.length && editStore.insertMaps[rowid]
  },
  /**
   * 删除所有新增的临时数据
   * @returns
   */
  removeInsertRow () {
    return this.remove(this.editStore.insertList)
  },
  /**
   * 检查行或列数据是否发生改变
   * @param {Row} row 行对象
   * @param {String} field 字段名
   */
  isUpdateByRow (row: any, field: any) {
    const { tableFullColumn, keepSource, sourceDataRowIdData, fullDataRowIdData } = this
    if (keepSource) {
      const rowid = getRowid(this, row)
      // 新增的数据不需要检测
      if (!fullDataRowIdData[rowid]) {
        return false
      }
      const oldRest = sourceDataRowIdData[rowid]
      if (oldRest) {
        const oRow = oldRest.row
        if (arguments.length > 1) {
          return !eqCellValue(oRow, row, field)
        }
        for (let index = 0, len = tableFullColumn.length; index < len; index++) {
          const property = tableFullColumn[index].field
          if (property && !eqCellValue(oRow, row, property)) {
            return true
          }
        }
      }
    }
    return false
  },
  /**
   * 获取表格的可视列，也可以指定索引获取列
   * @param {Number} columnIndex 索引
   */
  getColumns (columnIndex: any) {
    const columns = this.visibleColumn
    return XEUtils.isUndefined(columnIndex) ? columns.slice(0) : columns[columnIndex]
  },
  /**
   * 根据列获取列的唯一主键
   */
  getColid (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    return column ? column.id : null
  },
  /**
   * 根据列的唯一主键获取列
   * @param {String} colid 列主键
   */
  getColumnById (colid: any) {
    const fullColumnIdData = this.fullColumnIdData
    return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null
  },
  /**
   * 根据列的字段名获取列
   * @param {String} field 字段名
   */
  getColumnByField (field: any) {
    const fullColumnFieldData = this.fullColumnFieldData
    return fullColumnFieldData[field] ? fullColumnFieldData[field].column : null
  },
  getParentColumn (fieldOrColumn: any) {
    const fullColumnIdData = this.fullColumnIdData
    const column = handleFieldOrColumn(this, fieldOrColumn)
    return column && column.parentId && fullColumnIdData[column.parentId] ? fullColumnIdData[column.parentId].column : null
  },
  /**
   * 获取当前表格的列
   * 收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
   */
  getTableColumn () {
    return {
      collectColumn: this.collectColumn.slice(0),
      fullColumn: this.tableFullColumn.slice(0),
      visibleColumn: this.visibleColumn.slice(0),
      tableColumn: this.tableColumn.slice(0)
    }
  },
  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData (rowIndex: any) {
    const tableSynchData = this.data || this.tableSynchData
    return XEUtils.isUndefined(rowIndex) ? tableSynchData.slice(0) : tableSynchData[rowIndex]
  },
  /**
   * 用于多选行，获取已选中的数据
   */
  getCheckboxRecords (isFull: any) {
    const { tableFullData, afterFullData, treeConfig, treeOpts, checkboxOpts, tableFullTreeData, afterTreeFullData, afterFullRowMaps } = this
    const { transform, mapChildrenField } = treeOpts
    const { checkField } = checkboxOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const currTableData = isFull ? (transform ? tableFullTreeData : tableFullData) : (transform ? afterTreeFullData : afterFullData)
    let rowList = []
    if (checkField) {
      if (treeConfig) {
        rowList = XEUtils.filterTree(currTableData, row => XEUtils.get(row, checkField), { children: transform ? mapChildrenField : childrenField })
      } else {
        rowList = currTableData.filter((row: any) => XEUtils.get(row, checkField))
      }
    } else {
      const { selectCheckboxMaps, fullDataRowIdData } = this
      XEUtils.each(selectCheckboxMaps, (row, rowid) => {
        if (isFull) {
          if (fullDataRowIdData[rowid]) {
            rowList.push(fullDataRowIdData[rowid].row)
          }
        } else {
          if (afterFullRowMaps[rowid]) {
            rowList.push(afterFullRowMaps[rowid])
          }
        }
      })
    }
    return rowList
  },
  /**
   * 如果为虚拟树，将树结构拍平
   * @returns
   */
  handleVirtualTreeToList () {
    const { treeOpts, treeConfig, treeExpandedMaps, afterTreeFullData, afterFullData } = this
    if (treeConfig && treeOpts.transform) {
      const fullData: any[] = []
      const expandMaps: any = {}
      XEUtils.eachTree(afterTreeFullData, (row, index, items, path, parent) => {
        const rowid = getRowid(this, row)
        const parentRowid = getRowid(this, parent)
        if (!parent || (expandMaps[parentRowid] && treeExpandedMaps[parentRowid])) {
          expandMaps[rowid] = 1
          fullData.push(row)
        }
      }, { children: treeOpts.mapChildrenField })
      this.afterFullData = fullData
      this.updateScrollYStatus(fullData)
      return fullData
    }
    return afterFullData
  },
  /**
   * 获取处理后全量的表格数据
   * 如果存在筛选条件，继续处理
   */
  updateAfterFullData () {
    const { tableFullColumn, tableFullData, filterOpts, sortOpts, treeConfig, treeOpts, tableFullTreeData } = this
    const { remote: allRemoteFilter, filterMethod: allFilterMethod } = filterOpts
    const { remote: allRemoteSort, sortMethod: allSortMethod, multiple: sortMultiple, chronological } = sortOpts
    const { transform } = treeOpts
    let tableData: any[] = []
    let tableTree: any[] = []
    const filterColumns: any[] = []
    let orderColumns: any[] = []
    tableFullColumn.forEach((column: any) => {
      const { field, sortable, order, filters } = column
      if (!allRemoteFilter && filters && filters.length) {
        const valueList: any[] = []
        const itemList: any[] = []
        filters.forEach((item: any) => {
          if (item.checked) {
            itemList.push(item)
            valueList.push(item.value)
          }
        })
        if (itemList.length) {
          filterColumns.push({ column, valueList, itemList })
        }
      }
      if (!allRemoteSort && sortable && order) {
        orderColumns.push({ column, field, property: field, order, sortTime: column.sortTime })
      }
    })
    if (sortMultiple && chronological && orderColumns.length > 1) {
      orderColumns = XEUtils.orderBy(orderColumns, 'sortTime')
    }
    if (filterColumns.length) {
      const handleFilter = (row: any) => {
        return filterColumns.every(({ column, valueList, itemList }) => {
          if (valueList.length && !allRemoteFilter) {
            const { filterMethod, filterRender, field } = column
            const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
            const compFilterMethod = compConf && compConf.renderFilter ? (compConf.tableFilterMethod || compConf.filterMethod) : null
            const defaultFilterMethod = compConf ? (compConf.tableFilterDefaultMethod || compConf.defaultTableFilterMethod || compConf.defaultFilterMethod) : null
            const cellValue = getCellValue(row, column)
            if (filterMethod) {
              return itemList.some((item: any) => filterMethod({ value: item.value, option: item, cellValue, row, column, $table: this }))
            } else if (compFilterMethod) {
              return itemList.some((item: any) => compFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: this }))
            } else if (allFilterMethod) {
              return allFilterMethod({ options: itemList, values: valueList, cellValue, row, column })
            } else if (defaultFilterMethod) {
              return itemList.some((item: any) => defaultFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: this }))
            }
            return valueList.indexOf(XEUtils.get(row, field)) > -1
          }
          return true
        })
      }
      if (treeConfig && transform) {
        // 筛选虚拟树
        tableTree = XEUtils.searchTree(tableFullTreeData, handleFilter, { ...treeOpts, original: true })
        tableData = tableTree
      } else {
        tableData = treeConfig ? tableFullTreeData.filter(handleFilter) : tableFullData.filter(handleFilter)
        tableTree = tableData
      }
    } else {
      if (treeConfig && transform) {
        // 还原虚拟树
        tableTree = XEUtils.searchTree(tableFullTreeData, () => true, { ...treeOpts, original: true })
        tableData = tableTree
      } else {
        tableData = treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0)
        tableTree = tableData
      }
    }
    const firstOrderColumn = orderColumns[0]
    if (!allRemoteSort && firstOrderColumn) {
      if (treeConfig && transform) {
        // 虚拟树和列表一样，只能排序根级节点
        if (allSortMethod) {
          const sortRests = allSortMethod({ data: tableTree, sortList: orderColumns, $table: this })
          tableTree = XEUtils.isArray(sortRests) ? sortRests : tableTree
        } else {
          tableTree = XEUtils.orderBy(tableTree, orderColumns.map(({ column, order }) => [getOrderField(this, column), order]))
        }
        tableData = tableTree
      } else {
        if (allSortMethod) {
          const sortRests = allSortMethod({ data: tableData, column: firstOrderColumn.column, property: firstOrderColumn.field, field: firstOrderColumn.field, order: firstOrderColumn.order, sortList: orderColumns, $table: this })
          tableData = XEUtils.isArray(sortRests) ? sortRests : tableData
        } else {
          // 兼容 v4
          if (sortMultiple) {
            tableData = XEUtils.orderBy(tableData, orderColumns.map(({ column, order }) => [getOrderField(this, column), order]))
          } else {
            // 兼容 v2，在 v4 中废弃， sortBy 不能为数组
            let sortByConfs
            if (XEUtils.isArray(firstOrderColumn.sortBy)) {
              sortByConfs = firstOrderColumn.sortBy.map((item: any) => [item, firstOrderColumn.order])
            }
            tableData = XEUtils.orderBy(tableData, sortByConfs || [firstOrderColumn].map(({ column, order }) => [getOrderField(this, column), order]))
          }
        }
        tableTree = tableData
      }
    }
    this.afterFullData = tableData
    this.afterTreeFullData = tableTree
    this.updateAfterDataIndex()
  },
  /**
   * 预编译
   * 对渲染中的数据提前解析序号及索引。牺牲提前编译耗时换取渲染中额外损耗，使运行时更加流畅
   */
  updateAfterDataIndex () {
    const { treeConfig, afterFullData, fullDataRowIdData, fullAllDataRowIdData, afterTreeFullData, treeOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const fullMaps: any = {}
    if (treeConfig) {
      XEUtils.eachTree(afterTreeFullData, (row, index, items, path) => {
        const rowid = getRowid(this, row)
        const allrest = fullAllDataRowIdData[rowid]
        const seq = path.map((num, i) => i % 2 === 0 ? (Number(num) + 1) : '.').join('')
        if (allrest) {
          allrest.seq = seq
          allrest._index = index
        } else {
          const rest = { row, rowid, seq, index: -1, $index: -1, _index: index, items: [], parent: null, level: 0 }
          fullAllDataRowIdData[rowid] = rest
          fullDataRowIdData[rowid] = rest
        }
        fullMaps[rowid] = row
      }, { children: treeOpts.transform ? treeOpts.mapChildrenField : childrenField })
    } else {
      afterFullData.forEach((row: any, index: any) => {
        const rowid = getRowid(this, row)
        const allrest = fullAllDataRowIdData[rowid]
        const seq = index + 1
        if (allrest) {
          allrest.seq = seq
          allrest._index = index
        } else {
          const rest = { row, rowid, seq, index: -1, $index: -1, _index: index, items: [], parent: null, level: 0 }
          fullAllDataRowIdData[rowid] = rest
          fullDataRowIdData[rowid] = rest
        }
        fullMaps[rowid] = row
      })
    }
    this.afterFullRowMaps = fullMaps
  },
  /**
   * 只对 tree-config 有效，获取行的父级
   */
  getParentRow (rowOrRowid: any) {
    const { treeConfig, fullDataRowIdData } = this
    if (rowOrRowid && treeConfig) {
      let rowid
      if (XEUtils.isString(rowOrRowid)) {
        rowid = rowOrRowid
      } else {
        rowid = getRowid(this, rowOrRowid)
      }
      if (rowid) {
        const rest = fullDataRowIdData[rowid]
        return rest ? rest.parent : null
      }
    }
    return null
  },
  /**
   * 根据行的唯一主键获取行
   * @param {String/Number} rowid 行主键
   */
  getRowById (cellValue: any) {
    const fullDataRowIdData = this.fullDataRowIdData
    const rowid = XEUtils.eqNull(cellValue) ? '' : encodeURIComponent(cellValue)
    return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null
  },
  /**
   * 根据行获取行的唯一主键
   * @param {Row} row 行对象
   */
  getRowid (row: any) {
    const fullAllDataRowMap = this.fullAllDataRowMap
    return fullAllDataRowMap.has(row) ? fullAllDataRowMap.get(row).rowid : null
  },
  /**
   * 获取处理后的表格数据
   * 如果存在筛选条件，继续处理
   * 如果存在排序，继续处理
   */
  getTableData () {
    const { treeConfig, tableFullData, afterFullData, tableData, footerTableData, tableFullTreeData } = this
    return {
      fullData: treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0),
      visibleData: afterFullData.slice(0),
      tableData: tableData.slice(0),
      footerData: footerTableData.slice(0)
    }
  },
  /**
   * 处理数据加载默认行为
   * 默认执行一次，除非被重置
   */
  handleLoadDefaults () {
    if (this.checkboxConfig) {
      this.handleDefaultSelectionChecked()
    }
    if (this.radioConfig) {
      this.handleDefaultRadioChecked()
    }
    if (this.expandConfig) {
      this.handleDefaultRowExpand()
    }
    if (this.treeConfig) {
      this.handleDefaultTreeExpand()
    }
    if (this.mergeCells) {
      this.handleDefaultMergeCells()
    }
    if (this.mergeFooterItems) {
      this.handleDefaultMergeFooterItems()
    }
    this.$nextTick(() => setTimeout(this.recalculate))
  },
  /**
   * 处理初始化的默认行为
   * 只会执行一次
   */
  handleInitDefaults () {
    const { sortConfig } = this
    if (sortConfig) {
      this.handleDefaultSort()
    }
  },
  /**
   * 设置为固定列
   */
  setColumnFixed (fieldOrColumn: any, fixed: any) {
    const { isMaxFixedColumn, columnOpts } = this
    const column = handleFieldOrColumn(this, fieldOrColumn)
    const targetColumn = getRootColumn(this, column)
    if (targetColumn && targetColumn.fixed !== fixed) {
      // 是否超过最大固定列数量
      if (!targetColumn.fixed && isMaxFixedColumn) {
        if (VxeUI.modal) {
          VxeUI.modal.message({
            status: 'error',
            content: getI18n('vxe.table.maxFixedCol', [columnOpts.maxFixedSize])
          })
        }
        return this.$nextTick()
      }
      XEUtils.eachTree([targetColumn], (column) => {
        column.fixed = fixed
      })
      this.saveCustomStore('update:fixed')
      return this.refreshColumn()
    }
    return this.$nextTick()
  },
  /**
   * 取消指定固定列
   */
  clearColumnFixed (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    const targetColumn = getRootColumn(this, column)
    if (targetColumn && targetColumn.fixed) {
      XEUtils.eachTree([targetColumn], (column) => {
        column.fixed = null
      })
      this.saveCustomStore('update:fixed')
      return this.refreshColumn()
    }
    return this.$nextTick()
  },
  /**
   * 隐藏指定列
   */
  hideColumn (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column && column.visible) {
      column.visible = false
      return this.handleCustom()
    }
    return this.$nextTick()
  },
  /**
   * 显示指定列
   */
  showColumn (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column && !column.visible) {
      column.visible = true
      return this.handleCustom()
    }
    return this.$nextTick()
  },
  setColumnWidth (fieldOrColumn: any, width: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      const colWidth = XEUtils.toInteger(width)
      let rdWidth = colWidth
      if (isScale(width)) {
        const { tableBody } = this.$refs
        const tableBodyElem = tableBody ? tableBody.$el : null
        const bodyWidth = tableBodyElem ? tableBodyElem.clientWidth - 1 : 0
        rdWidth = Math.floor(colWidth * bodyWidth)
      }
      column.resizeWidth = rdWidth
      return this.refreshColumn()
    }
    return this.$nextTick()
  },
  getColumnWidth (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      return column.renderWidth
    }
    return 0
  },
  /**
   * 手动重置列的显示隐藏、列宽拖动的状态；
   * 如果为 true 则重置所有状态
   * 如果已关联工具栏，则会同步更新
   */
  resetColumn (options: any) {
    const { collectColumn, customOpts } = this
    const { checkMethod } = customOpts
    const opts = Object.assign({
      visible: true,
      resizable: options === true,
      fixed: options === true,
      sort: options === true
    }, options)
    XEUtils.eachTree(collectColumn, (column) => {
      if (opts.resizable) {
        column.resizeWidth = 0
      }
      if (opts.fixed) {
        column.fixed = column.defaultFixed
      }
      if (opts.sort) {
        column.renderSortNumber = column.sortNumber
      }
      if (!checkMethod || checkMethod({ column })) {
        column.visible = column.defaultVisible
      }
      column.renderResizeWidth = column.renderWidth
    })
    this.saveCustomStore('reset')
    return this.handleCustom()
  },
  handleCustom () {
    const { mouseConfig } = this
    if (mouseConfig) {
      if (this.clearSelected) {
        this.clearSelected()
      }
      if (this.clearCellAreas) {
        this.clearCellAreas()
        this.clearCopyCellArea()
      }
    }
    this.analyColumnWidth()
    return this.refreshColumn(true)
  },
  handleCustomRestore (storeData: any) {
    let { collectColumn } = this
    const { resizableData, sortData, visibleData, fixedData } = storeData
    let hasCustomSort = false
    // 处理还原
    if (resizableData || sortData || visibleData || fixedData) {
      XEUtils.eachTree(collectColumn, (column, index, items, path, parent) => {
        const colKey = column.getKey()
        // 支持一级
        if (!parent) {
          if (fixedData && fixedData[colKey]) {
            column.fixed = fixedData[colKey]
          }
          if (sortData && XEUtils.isNumber(sortData[colKey])) {
            hasCustomSort = true
            column.renderSortNumber = sortData[colKey]
          }
        }
        if (resizableData && XEUtils.isNumber(resizableData[colKey])) {
          column.resizeWidth = resizableData[colKey]
        }
        if (visibleData && XEUtils.isBoolean(visibleData[colKey])) {
          column.visible = visibleData[colKey]
        }
      })
      // 如果自定义了顺序
      if (hasCustomSort) {
        collectColumn = XEUtils.orderBy(collectColumn, 'renderSortNumber')
        this.collectColumn = collectColumn
        this.tableFullColumn = getColumnList(collectColumn)
      }
    }
  },
  /**
   * 还原自定义列操作状态
   */
  restoreCustomStorage () {
    const { tableId, customConfig, customOpts } = this
    const { storage, restoreStore } = customOpts
    const isAllCustom = storage === true
    const storageOpts = isAllCustom ? {} : Object.assign({}, storage || {})
    const isCustomResizable = isAllCustom || storageOpts.resizable
    const isCustomVisible = isAllCustom || storageOpts.visible
    const isCustomFixed = isAllCustom || storageOpts.fixed
    const isCustomSort = isAllCustom || storageOpts.sort
    if (customConfig && (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort)) {
      if (!tableId) {
        errLog('vxe.error.reqProp', ['id'])
        return
      }
      const storeData = getCustomStorageMap(tableId)
      if (restoreStore) {
        return Promise.resolve(
          restoreStore({ id: tableId, type: 'restore', storeData })
        ).then(storeData => {
          if (!storeData) {
            return
          }
          return this.handleCustomRestore(storeData)
        }).catch(e => e)
      } else {
        return this.handleCustomRestore(storeData)
      }
    }
  },
  getCustomStoreData () {
    const { id, customOpts, collectColumn } = this
    const { checkMethod } = customOpts
    const resizableData: any = {}
    const sortData: any = {}
    const visibleData: any = {}
    const fixedData: any = {}
    const storeData: any = {
      resizableData: undefined,
      sortData: undefined,
      visibleData: undefined,
      fixedData: undefined
    }
    if (!id) {
      errLog('vxe.error.reqProp', ['id'])
      return storeData
    }
    let hasResizable = 0
    let hasSort = 0
    let hasFixedt = 0
    let hasVisible = 0
    XEUtils.eachTree(collectColumn, (column, index, items, path, parent) => {
      // 只支持一级
      if (!parent) {
        collectColumn.forEach((column: any) => {
          const colKey = column.getKey()
          if (colKey) {
            hasSort = 1
            sortData[colKey] = column.renderSortNumber
          }
        })
        if (column.fixed && column.fixed !== column.defaultFixed) {
          const colKey = column.getKey()
          if (colKey) {
            hasFixedt = 1
            fixedData[colKey] = column.fixed
          }
        }
      }
      if (column.resizeWidth) {
        const colKey = column.getKey()
        if (colKey) {
          hasResizable = 1
          resizableData[colKey] = column.renderWidth
        }
      }
      if (!checkMethod || checkMethod({ column })) {
        if (!column.visible && column.defaultVisible) {
          const colKey = column.getKey()
          if (colKey) {
            hasVisible = 1
            visibleData[colKey] = false
          }
        } else if (column.visible && !column.defaultVisible) {
          const colKey = column.getKey()
          if (colKey) {
            hasVisible = 1
            visibleData[colKey] = true
          }
        }
      }
    })
    if (hasResizable) {
      storeData.resizableData = resizableData
    }
    if (hasSort) {
      storeData.sortData = sortData
    }
    if (hasFixedt) {
      storeData.fixedData = fixedData
    }
    if (hasVisible) {
      storeData.visibleData = visibleData
    }
    return storeData
  },
  saveCustomStore (type: any) {
    const { tableId, customOpts } = this
    const { updateStore, storage } = customOpts
    const isAllCustom = storage === true
    const storageOpts = isAllCustom ? {} : Object.assign({}, storage || {})
    const isCustomResizable = isAllCustom || storageOpts.resizable
    const isCustomVisible = isAllCustom || storageOpts.visible
    const isCustomFixed = isAllCustom || storageOpts.fixed
    const isCustomSort = isAllCustom || storageOpts.sort
    if (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort) {
      if (!tableId) {
        errLog('vxe.error.reqProp', ['id'])
        return this.$nextTick()
      }
      const storeData = type === 'reset'
        ? {
            resizableData: {},
            sortData: {},
            visibleData: {},
            fixedData: {}
          }
        : this.getCustomStoreData()
      if (updateStore) {
        return updateStore({
          id: tableId,
          type,
          storeData
        })
      } else {
        setCustomStorageMap(tableId, type === 'reset' ? null : storeData)
      }
    }
    return this.$nextTick()
  },
  handleUpdateDataQueue () {
    this.upDataFlag++
  },
  handleRefreshColumnQueue () {
    this.reColumnFlag++
  },
  /**
   * 刷新列配置
   */
  refreshColumn (initOrder: any) {
    if (initOrder) {
      const columnList = XEUtils.orderBy(this.collectColumn, 'renderSortNumber')
      this.collectColumn = columnList
      const tableFullColumn = getColumnList(columnList)
      this.tableFullColumn = tableFullColumn
      this.cacheColumnMap()
    }
    return this.parseColumns().then(() => {
      return this.refreshScroll()
    }).then(() => {
      return this.recalculate()
    })
  },
  /**
   * 刷新列信息
   * 将固定的列左边、右边分别靠边
   */
  parseColumns () {
    const leftList: any[] = []
    const centerList: any[] = []
    const rightList: any[] = []
    const { collectColumn, tableFullColumn, isGroup, columnStore, sXOpts, scrollXStore } = this
    // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏
    if (isGroup) {
      const leftGroupList: any[] = []
      const centerGroupList: any[] = []
      const rightGroupList: any[] = []
      XEUtils.eachTree(collectColumn, (column, index, items, path, parent) => {
        const isColGroup = hasChildrenList(column)
        // 如果是分组，必须按组设置固定列，不允许给子列设置固定
        if (parent && parent.fixed) {
          column.fixed = parent.fixed
        }
        if (parent && column.fixed !== parent.fixed) {
          errLog('vxe.error.groupFixed')
        }
        if (isColGroup) {
          column.visible = !!XEUtils.findTree(column.children, (subColumn: any) => hasChildrenList(subColumn) ? null : subColumn.visible)
        } else if (column.visible) {
          if (column.fixed === 'left') {
            leftList.push(column)
          } else if (column.fixed === 'right') {
            rightList.push(column)
          } else {
            centerList.push(column)
          }
        }
      })
      collectColumn.forEach((column: any) => {
        if (column.visible) {
          if (column.fixed === 'left') {
            leftGroupList.push(column)
          } else if (column.fixed === 'right') {
            rightGroupList.push(column)
          } else {
            centerGroupList.push(column)
          }
        }
      })
      this.tableGroupColumn = leftGroupList.concat(centerGroupList).concat(rightGroupList)
    } else {
      // 重新分配列
      tableFullColumn.forEach((column: any) => {
        if (column.visible) {
          if (column.fixed === 'left') {
            leftList.push(column)
          } else if (column.fixed === 'right') {
            rightList.push(column)
          } else {
            centerList.push(column)
          }
        }
      })
    }
    const visibleColumn = leftList.concat(centerList).concat(rightList)
    // 如果gt为0，则总是启用
    const scrollXLoad = sXOpts.enabled && sXOpts.gt > -1 && (sXOpts.gt === 0 || sXOpts.gt <= tableFullColumn.length)
    this.hasFixedColumn = leftList.length > 0 || rightList.length > 0
    Object.assign(columnStore, { leftList, centerList, rightList })
    if (scrollXLoad) {
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        // if (this.showHeader && !this.showHeaderOverflow) {
        //   warnLog('vxe.error.reqProp', ['show-header-overflow'])
        // }
        // if (this.showFooter && !this.showFooterOverflow) {
        //   warnLog('vxe.error.reqProp', ['show-footer-overflow'])
        // }
        if (this.spanMethod) {
          warnLog('vxe.error.scrollErrProp', ['span-method'])
        }
        if (this.footerSpanMethod) {
          warnLog('vxe.error.scrollErrProp', ['footer-span-method'])
        }
      }
      const { visibleSize } = computeVirtualX(this)
      scrollXStore.startIndex = 0
      scrollXStore.endIndex = visibleSize
      scrollXStore.visibleSize = visibleSize
    }
    // 如果列被显示/隐藏，则清除合并状态
    // 如果列被设置为固定，则清除合并状态
    if (visibleColumn.length !== this.visibleColumn.length || !this.visibleColumn.every((column: any, index: any) => column === visibleColumn[index])) {
      this.clearMergeCells()
      this.clearMergeFooterItems()
    }
    this.scrollXLoad = scrollXLoad
    this.visibleColumn = visibleColumn
    this.handleTableColumn()
    return this.updateFooter().then(() => {
      return this.recalculate()
    }).then(() => {
      this.updateCellAreas()
      return this.recalculate()
    })
  },
  /**
   * 指定列宽的列进行拆分
   */
  analyColumnWidth () {
    const { columnOpts } = this
    const { width: defaultWidth, minWidth: defaultMinWidth } = columnOpts
    const resizeList: any[] = []
    const pxList: any[] = []
    const pxMinList : any[] = []
    const autoMinList: any[] = []
    const scaleList : any[] = []
    const scaleMinList: any[] = []
    const autoList : any[] = []
    const remainList: any[] = []
    this.tableFullColumn.forEach((column: any) => {
      if (defaultWidth && !column.width) {
        column.width = defaultWidth
      }
      if (defaultMinWidth && !column.minWidth) {
        column.minWidth = defaultMinWidth
      }
      if (column.visible) {
        if (column.resizeWidth) {
          resizeList.push(column)
        } else if (column.width === 'auto') {
          autoList.push(column)
        } else if (isPx(column.width)) {
          pxList.push(column)
        } else if (isScale(column.width)) {
          scaleList.push(column)
        } else if (isPx(column.minWidth)) {
          pxMinList.push(column)
        } else if (column.minWidth === 'auto') {
          autoMinList.push(column)
        } else if (isScale(column.minWidth)) {
          scaleMinList.push(column)
        } else {
          remainList.push(column)
        }
      }
    })
    Object.assign(this.columnStore, { resizeList, pxList, pxMinList, autoMinList, scaleList, scaleMinList, autoList, remainList })
  },
  /**
   * 刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）
   */
  refreshScroll () {
    const { lastScrollLeft, lastScrollTop } = this
    const { $refs } = this
    const { tableBody, leftBody, rightBody, tableFooter } = $refs
    const tableBodyElem = tableBody ? tableBody.$el : null
    const leftBodyElem = leftBody ? leftBody.$el : null
    const rightBodyElem = rightBody ? rightBody.$el : null
    const tableFooterElem = tableFooter ? tableFooter.$el : null
    return new Promise(resolve => {
      // 还原滚动条位置
      if (lastScrollLeft || lastScrollTop) {
        return restoreScrollLocation(this, lastScrollLeft, lastScrollTop).then(() => {
          // 存在滚动行为未结束情况
          setTimeout(resolve, 30)
        })
      }
      // 重置
      setScrollTop(tableBodyElem, lastScrollTop)
      setScrollTop(leftBodyElem, lastScrollTop)
      setScrollTop(rightBodyElem, lastScrollTop)
      setScrollLeft(tableFooterElem, lastScrollLeft)
      // 存在滚动行为未结束情况
      setTimeout(resolve, 30)
    })
  },
  /**
   * 计算单元格列宽，动态分配可用剩余空间
   * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
   */
  recalculate (refull: any) {
    const { $refs } = this
    const { tableBody, tableHeader, tableFooter } = $refs
    const bodyElem = tableBody ? tableBody.$el : null
    const headerElem = tableHeader ? tableHeader.$el : null
    const footerElem = tableFooter ? tableFooter.$el : null
    if (bodyElem) {
      this.calcCellWidth()
      this.autoCellWidth(headerElem, bodyElem, footerElem)
      if (refull === true) {
        // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
        return this.computeScrollLoad().then(() => {
          this.autoCellWidth(headerElem, bodyElem, footerElem)
          return this.computeScrollLoad()
        })
      }
    }
    return this.computeScrollLoad()
  },
  calcCellWidth () {
    const { autoWidthColumnList, tableData } = this
    if (!tableData.length || !autoWidthColumnList.length) {
      this.isCalcColumn = false
      return this.$nextTick()
    }
    this.isCalcColumn = true
    return this.$nextTick().then(() => {
      const el = this.$el
      if (el) {
        autoWidthColumnList.forEach((column: any) => {
          const cellElList = el.querySelectorAll(`.vxe-header--column.${column.id}>.vxe-cell,.vxe-body--column.${column.id}>.vxe-cell,.vxe-footer--column.${column.id}>.vxe-cell`)
          const firstCellEl = cellElList[0]
          let paddingSize = 0
          if (firstCellEl) {
            const cellStyle = getComputedStyle(firstCellEl)
            paddingSize = Math.floor(XEUtils.toNumber(cellStyle.paddingLeft) + XEUtils.toNumber(cellStyle.paddingRight)) + 2
          }
          let colWidth = column.renderAutoWidth - paddingSize
          XEUtils.arrayEach(cellElList, (itemEl) => {
            const cellEl = itemEl as HTMLElement
            const thElem = cellEl.parentNode as HTMLElement
            let titleWidth = 0
            if (`${thElem.tagName}`.toLowerCase() === 'th') {
              XEUtils.arrayEach(cellEl.children, (btnEl) => {
                titleWidth += (btnEl as HTMLElement).offsetWidth + 1
              })
            } else {
              const labelEl = cellEl.firstChild as HTMLElement
              titleWidth = labelEl.offsetWidth
            }
            if (titleWidth) {
              colWidth = Math.max(colWidth, Math.ceil(titleWidth) + 4)
            }
          })
          column.renderAutoWidth = colWidth + paddingSize
        })
        this.analyColumnWidth()
      }
      this.isCalcColumn = false
    })
  },
  /**
   * 列宽算法
   * 支持 px、%、固定 混合分配
   * 支持动态列表调整分配
   * 支持自动分配偏移量
   * @param {Element} headerElem
   * @param {Element} bodyElem
   * @param {Element} footerElem
   * @param {Number} bodyWidth
   */
  autoCellWidth (headerElem: any, bodyElem: any, footerElem: any) {
    let tableWidth = 0
    const minCellWidth = 40 // 列宽最少限制 40px
    const bodyWidth = bodyElem.clientWidth - 1
    let remainWidth = bodyWidth
    let meanWidth = remainWidth / 100
    const { fit, columnStore } = this
    const { resizeList, pxMinList, pxList, autoMinList, scaleList, scaleMinList, autoList, remainList } = columnStore
    // 最小宽
    pxMinList.forEach((column: any) => {
      const minWidth = parseInt(column.minWidth)
      tableWidth += minWidth
      column.renderWidth = minWidth
    })
    // 最小自适应
    autoMinList.forEach((column: any) => {
      const scaleWidth = Math.max(60, XEUtils.toInteger(column.renderAutoWidth))
      tableWidth += scaleWidth
      column.renderWidth = scaleWidth
    })
    // 最小百分比
    scaleMinList.forEach((column: any) => {
      const scaleWidth = Math.floor(parseInt(column.minWidth) * meanWidth)
      tableWidth += scaleWidth
      column.renderWidth = scaleWidth
    })
    // 固定百分比
    scaleList.forEach((column: any) => {
      const scaleWidth = Math.floor(parseInt(column.width) * meanWidth)
      tableWidth += scaleWidth
      column.renderWidth = scaleWidth
    })
    // 固定宽
    pxList.forEach((column: any) => {
      const width = parseInt(column.width)
      tableWidth += width
      column.renderWidth = width
    })
    // 自适应宽
    autoList.forEach((column: any) => {
      const width = Math.max(60, XEUtils.toInteger(column.renderAutoWidth))
      tableWidth += width
      column.renderWidth = width
    })
    // 调整了列宽
    resizeList.forEach((column: any) => {
      const width = parseInt(column.resizeWidth)
      tableWidth += width
      column.renderWidth = width
    })
    remainWidth -= tableWidth
    meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoMinList.length + remainList.length)) : 0
    if (fit) {
      if (remainWidth > 0) {
        scaleMinList.concat(pxMinList).concat(autoMinList).forEach((column: any) => {
          tableWidth += meanWidth
          column.renderWidth += meanWidth
        })
      }
    } else {
      meanWidth = minCellWidth
    }
    // 剩余均分
    remainList.forEach((column: any) => {
      const width = Math.max(meanWidth, minCellWidth)
      column.renderWidth = width
      tableWidth += width
    })
    if (fit) {
      /**
       * 偏移量算法
       * 如果所有列足够放的情况下，从最后动态列开始分配
       */
      const dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoMinList).concat(remainList)
      let dynamicSize = dynamicList.length - 1
      if (dynamicSize > 0) {
        let odiffer = bodyWidth - tableWidth
        if (odiffer > 0) {
          while (odiffer > 0 && dynamicSize >= 0) {
            odiffer--
            dynamicList[dynamicSize--].renderWidth++
          }
          tableWidth = bodyWidth
        }
      }
    }
    const tableHeight = bodyElem.offsetHeight
    const overflowY = bodyElem.scrollHeight > bodyElem.clientHeight
    this.scrollbarWidth = overflowY ? bodyElem.offsetWidth - bodyElem.clientWidth : 0
    this.overflowY = overflowY
    this.tableWidth = tableWidth
    this.tableHeight = tableHeight
    if (headerElem) {
      this.headerHeight = headerElem.clientHeight
      this.$nextTick(() => {
        // 检测是否同步滚动
        if (headerElem && bodyElem && headerElem.scrollLeft !== bodyElem.scrollLeft) {
          headerElem.scrollLeft = bodyElem.scrollLeft
        }
      })
    } else {
      this.headerHeight = 0
    }
    let overflowX = false
    let footerHeight = 0
    let scrollbarHeight = 0
    if (footerElem) {
      footerHeight = footerElem.offsetHeight
      overflowX = tableWidth > footerElem.clientWidth
      scrollbarHeight = Math.max(footerHeight - footerElem.clientHeight, 0)
    } else {
      overflowX = tableWidth > bodyWidth
      scrollbarHeight = Math.max(tableHeight - bodyElem.clientHeight, 0)
    }
    this.footerHeight = footerHeight
    this.overflowX = tableWidth > bodyWidth
    this.scrollbarHeight = scrollbarHeight
    this.updateHeight()
    this.parentHeight = Math.max(this.headerHeight + this.footerHeight + 20, this.getParentHeight())
    if (overflowX) {
      this.checkScrolling()
    }
  },
  updateHeight () {
    this.customHeight = calcHeight(this, 'height')
    this.customMinHeight = calcHeight(this, 'minHeight')
    this.customMaxHeight = calcHeight(this, 'maxHeight')
  },
  updateStyle () {
    let {
      $refs,
      isGroup,
      fullColumnIdData,
      tableColumn,
      customHeight,
      customMinHeight,
      customMaxHeight,
      border,
      headerHeight,
      showFooter,
      showOverflow: allColumnOverflow,
      showHeaderOverflow: allColumnHeaderOverflow,
      showFooterOverflow: allColumnFooterOverflow,
      footerHeight,
      tableHeight,
      tableWidth,
      scrollbarHeight,
      scrollbarWidth,
      scrollXLoad,
      scrollYLoad,
      cellOffsetWidth,
      columnStore,
      elemStore,
      editStore,
      currentRow,
      mouseConfig,
      keyboardConfig,
      keyboardOpts,
      spanMethod,
      mergeList,
      mergeFooterList,
      footerSpanMethod,
      isAllOverflow,
      visibleColumn
    } = this
    const containerList = ['main', 'left', 'right']
    const emptyPlaceholderElem = $refs.emptyPlaceholder
    const bodyWrapperElem = elemStore['main-body-wrapper']
    if (emptyPlaceholderElem) {
      emptyPlaceholderElem.style.top = `${headerHeight}px`
      emptyPlaceholderElem.style.height = bodyWrapperElem ? `${bodyWrapperElem.offsetHeight - scrollbarHeight}px` : ''
    }
    if (customHeight > 0) {
      if (showFooter) {
        customHeight += scrollbarHeight
      }
    }
    containerList.forEach((name, index) => {
      const fixedType = index > 0 ? name : ''
      const layoutList = ['header', 'body', 'footer']
      const fixedColumn = columnStore[`${fixedType}List`]
      const fixedWrapperElem = $refs[`${fixedType}Container`]
      layoutList.forEach(layout => {
        const wrapperElem = elemStore[`${name}-${layout}-wrapper`]
        const tableElem = elemStore[`${name}-${layout}-table`]
        if (layout === 'header') {
          // 表头体样式处理
          // 横向滚动渲染
          let tWidth = tableWidth
          let renderColumnList = tableColumn

          if (isGroup) {
            renderColumnList = visibleColumn
          } else {
            // 如果是使用优化模式
            if (fixedType) {
              if (scrollXLoad || allColumnHeaderOverflow) {
                renderColumnList = fixedColumn
              }
            }
          }

          tWidth = renderColumnList.reduce((previous: any, column: any) => previous + column.renderWidth, 0)

          if (tableElem) {
            tableElem.style.width = tWidth ? `${tWidth + scrollbarWidth}px` : ''
            // 修复 IE 中高度无法自适应问题
            if (browse.msie) {
              XEUtils.arrayEach(tableElem.querySelectorAll('.vxe-resizable'), (resizeElem: any) => {
                resizeElem.style.height = `${resizeElem.parentNode.offsetHeight}px`
              })
            }
          }

          const repairElem = elemStore[`${name}-${layout}-repair`]
          if (repairElem) {
            repairElem.style.width = `${tableWidth}px`
          }

          const listElem = elemStore[`${name}-${layout}-list`]
          if (isGroup && listElem) {
            XEUtils.arrayEach(listElem.querySelectorAll('.col--group'), (thElem: HTMLTableRowElement) => {
              const colNode = this.getColumnNode(thElem)
              if (colNode) {
                const column = colNode.item
                const { showHeaderOverflow } = column
                const cellOverflow = XEUtils.isBoolean(showHeaderOverflow) ? showHeaderOverflow : allColumnHeaderOverflow
                const showEllipsis = cellOverflow === 'ellipsis'
                const showTitle = cellOverflow === 'title'
                const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
                const hasEllipsis = showTitle || showTooltip || showEllipsis
                let childWidth = 0
                let countChild = 0
                if (hasEllipsis) {
                  XEUtils.eachTree(column.children, item => {
                    if (!item.children || !column.children.length) {
                      countChild++
                    }
                    childWidth += item.renderWidth
                  })
                }
                thElem.style.width = hasEllipsis ? `${childWidth - countChild - (border ? 2 : 0)}px` : ''
              }
            })
          }
        } else if (layout === 'body') {
          const emptyBlockElem = elemStore[`${name}-${layout}-emptyBlock`]
          if (isNodeElement(wrapperElem)) {
            let bodyMaxHeight = 0
            const bodyMinHeight = customMinHeight - headerHeight - footerHeight
            if (customMaxHeight) {
              bodyMaxHeight = customMaxHeight - headerHeight - footerHeight
              // 如果是固定列
              if (fixedType) {
                bodyMaxHeight -= (showFooter ? 0 : scrollbarHeight)
              }
              bodyMaxHeight = Math.max(bodyMinHeight, bodyMaxHeight)
              wrapperElem.style.maxHeight = `${bodyMaxHeight}px`
            }
            if (customHeight) {
              let bodyHeight = customHeight - headerHeight - footerHeight
              // 如果是固定列
              if (fixedType) {
                bodyHeight -= (showFooter ? 0 : scrollbarHeight)
              }
              if (bodyMaxHeight) {
                bodyHeight = Math.min(bodyMaxHeight, bodyHeight)
              }
              wrapperElem.style.height = `${Math.max(bodyMinHeight, bodyHeight)}px`
            } else {
              wrapperElem.style.height = ''
            }
            wrapperElem.style.minHeight = `${bodyMinHeight}px`
          }

          // 如果是固定列
          if (fixedWrapperElem) {
            const isRightFixed = fixedType === 'right'
            const fixedColumn = columnStore[`${fixedType}List`]
            if (isNodeElement(wrapperElem)) {
              wrapperElem.style.top = `${headerHeight}px`
            }
            fixedWrapperElem.style.height = `${(customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1)}px`
            fixedWrapperElem.style.width = `${fixedColumn.reduce((previous: any, column: any) => previous + column.renderWidth, isRightFixed ? scrollbarWidth : 0)}px`
          }

          let tWidth = tableWidth
          let renderColumnList = tableColumn

          // 如果是使用优化模式
          if (fixedType) {
            // 如果存在展开行使用全量渲染
            if (!this.expandColumn && (scrollXLoad || scrollYLoad || (allColumnOverflow ? isAllOverflow : allColumnOverflow))) {
              if (!mergeList.length && !spanMethod && !(keyboardConfig && keyboardOpts.isMerge)) {
                renderColumnList = fixedColumn
              } else {
                renderColumnList = visibleColumn
              }
            } else {
              renderColumnList = visibleColumn
            }
          }
          tWidth = renderColumnList.reduce((previous: any, column: any) => previous + column.renderWidth, 0)

          if (tableElem) {
            tableElem.style.width = tWidth ? `${tWidth}px` : ''
            // 兼容性处理
            tableElem.style.paddingRight = scrollbarWidth && fixedType && (browse['-moz'] || browse.safari) ? `${scrollbarWidth}px` : ''
          }
          if (emptyBlockElem) {
            emptyBlockElem.style.width = tWidth ? `${tWidth}px` : ''
          }
        } else if (layout === 'footer') {
          let tWidth = tableWidth
          let renderColumnList = tableColumn

          // 如果是使用优化模式
          if (fixedType) {
            // 如果存在展开行使用全量渲染
            if (!this.expandColumn && (scrollXLoad || allColumnFooterOverflow)) {
              if (!mergeFooterList.length || !footerSpanMethod) {
                renderColumnList = fixedColumn
              } else {
                renderColumnList = visibleColumn
              }
            } else {
              renderColumnList = visibleColumn
            }
          }
          tWidth = renderColumnList.reduce((previous: any, column: any) => previous + column.renderWidth, 0)

          if (isNodeElement(wrapperElem)) {
            // 如果是固定列
            if (fixedWrapperElem) {
              wrapperElem.style.top = `${customHeight > 0 ? customHeight - footerHeight : tableHeight + headerHeight}px`
            }
            wrapperElem.style.marginTop = `${-scrollbarHeight}px`
          }
          if (tableElem) {
            tableElem.style.width = tWidth ? `${tWidth + scrollbarWidth}px` : ''
          }
        }
        const colgroupElem = elemStore[`${name}-${layout}-colgroup`]
        if (colgroupElem) {
          XEUtils.arrayEach(colgroupElem.children, (colElem: any) => {
            const colid = colElem.getAttribute('name')
            if (colid === 'col_gutter') {
              colElem.style.width = `${scrollbarWidth}px`
            }
            if (fullColumnIdData[colid]) {
              const column = fullColumnIdData[colid].column
              const { showHeaderOverflow, showFooterOverflow, showOverflow } = column
              let cellOverflow
              colElem.style.width = `${column.renderWidth}px`
              if (layout === 'header') {
                cellOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
              } else if (layout === 'footer') {
                cellOverflow = XEUtils.isUndefined(showFooterOverflow) || XEUtils.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow
              } else {
                cellOverflow = XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow) ? allColumnOverflow : showOverflow
              }
              const showEllipsis = cellOverflow === 'ellipsis'
              const showTitle = cellOverflow === 'title'
              const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
              let hasEllipsis = showTitle || showTooltip || showEllipsis
              const listElem = elemStore[`${name}-${layout}-list`]
              // 滚动的渲染不支持动态行高
              if (layout === 'header' || layout === 'footer') {
                if (scrollXLoad && !hasEllipsis) {
                  hasEllipsis = true
                }
              } else {
                if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
                  hasEllipsis = true
                }
              }
              if (listElem) {
                XEUtils.arrayEach(listElem.querySelectorAll(`.${column.id}`), (elem: any) => {
                  const colspan = parseInt(elem.getAttribute('colspan') || 1)
                  const cellElem = elem.querySelector('.vxe-cell')
                  let colWidth = column.renderWidth
                  if (cellElem) {
                    if (colspan > 1) {
                      const columnIndex = this.getColumnIndex(column)
                      for (let index = 1; index < colspan; index++) {
                        const nextColumn = this.getColumns(columnIndex + index)
                        if (nextColumn) {
                          colWidth += nextColumn.renderWidth
                        }
                      }
                    }
                    cellElem.style.width = hasEllipsis ? `${colWidth - (cellOffsetWidth * colspan)}px` : ''
                  }
                })
              }
            }
          })
        }
      })
    })
    if (currentRow) {
      this.setCurrentRow(currentRow)
    }
    if (mouseConfig && mouseConfig.selected && editStore.selected.row && editStore.selected.column) {
      this.addColSdCls()
    }
    return this.$nextTick()
  },
  /**
   * 处理固定列的显示状态
   */
  checkScrolling () {
    const { tableBody, leftContainer, rightContainer } = this.$refs
    const bodyElem = tableBody ? tableBody.$el : null
    if (bodyElem) {
      if (leftContainer) {
        if (bodyElem.scrollLeft > 0) {
          addClass(leftContainer, 'scrolling--middle')
        } else {
          removeClass(leftContainer, 'scrolling--middle')
        }
      }
      if (rightContainer) {
        if (bodyElem.clientWidth < bodyElem.scrollWidth - Math.ceil(bodyElem.scrollLeft)) {
          addClass(rightContainer, 'scrolling--middle')
        } else {
          removeClass(rightContainer, 'scrolling--middle')
        }
      }
    }
  },
  preventEvent (evnt: any, type: any, args: any, next: any, end: any) {
    let evntList = interceptor.get(type)

    // 兼容老版本
    if (!evntList.length && type === 'event.clearEdit') {
      evntList = interceptor.get('event.clearActived')
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (evntList.length) {
          warnLog('vxe.error.delEvent', ['event.clearActived', 'event.clearEdit'])
        }
      }
    }
    // 兼容老版本

    let rest
    if (!evntList.some(func => func(Object.assign({ $grid: this.$xegrid, $table: this, $event: evnt }, args)) === false)) {
      if (next) {
        rest = next()
      }
    }
    if (end) {
      end()
    }
    return rest
  },
  /**
   * 全局按下事件处理
   */
  handleGlobalMousedownEvent (evnt: any) {
    const { $el, $refs, $xegrid, $toolbar, mouseConfig, editStore, ctxMenuStore, editRules, editOpts, validOpts, areaOpts, filterStore, customStore, getRowNode } = this
    const { actived } = editStore
    const { ctxWrapper, filterWrapper, customWrapper, validTip } = $refs
    // 筛选
    if (filterWrapper) {
      if (getEventTargetNode(evnt, $el, 'vxe-cell--filter').flag) {
        // 如果点击了筛选按钮
      } else if (getEventTargetNode(evnt, filterWrapper.$el).flag) {
        // 如果点击筛选容器
      } else {
        if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
          this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter)
        }
      }
    }
    // 自定义列
    if (customWrapper) {
      if (customStore.btnEl === evnt.target || getEventTargetNode(evnt, document.body, 'vxe-toolbar-custom-target').flag) {
        // 如果点击了自定义列按钮
      } else if (getEventTargetNode(evnt, customWrapper.$el).flag) {
        // 如果点击自定义列容器
      } else {
        if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
          this.preventEvent(evnt, 'event.clearCustom', {}, () => this.closeCustom())
        }
      }
    }

    // 如果已激活了编辑状态
    if (actived.row) {
      if (!(editOpts.autoClear === false)) {
        // 如果是激活状态，点击了单元格之外
        const cell = actived.args.cell
        if ((!cell || !getEventTargetNode(evnt, cell).flag)) {
          if (validTip && getEventTargetNode(evnt, validTip.$el).flag) {
            // 如果是激活状态，且点击了校验提示框
          } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
              // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
              this.preventEvent(evnt, 'event.clearEdit', actived.args, () => {
                let isClear
                if (editOpts.mode === 'row') {
                  const rowNode = getEventTargetNode(evnt, $el, 'vxe-body--row')
                  // row 方式，如果点击了不同行
                  isClear = rowNode.flag ? getRowNode(rowNode.targetElem).item !== actived.args.row : false
                } else {
                  // cell 方式，如果是非编辑列
                  isClear = !getEventTargetNode(evnt, $el, 'col--edit').flag
                }
                // 如果点击表头行，则清除激活状态
                if (!isClear) {
                  isClear = getEventTargetNode(evnt, $el, 'vxe-header--row').flag
                }
                // 如果点击表尾行，则清除激活状态
                if (!isClear) {
                  isClear = getEventTargetNode(evnt, $el, 'vxe-footer--row').flag
                }
                // 如果固定了高度且点击了行之外的空白处，则清除激活状态
                if (!isClear && this.height && !this.overflowY) {
                  const bodyWrapperElem = evnt.target
                  if (hasClass(bodyWrapperElem, 'vxe-table--body-wrapper')) {
                    isClear = evnt.offsetY < bodyWrapperElem.clientHeight
                  }
                }
                if (
                  isClear ||
                    // 如果点击了当前表格之外
                    !getEventTargetNode(evnt, $el).flag
                ) {
                  setTimeout(() => this.clearEdit(evnt))
                }
              })
            }
          }
        }
      }
    } else if (mouseConfig) {
      if (!getEventTargetNode(evnt, $el).flag && !($xegrid && getEventTargetNode(evnt, $xegrid.$el).flag) && !(ctxWrapper && getEventTargetNode(evnt, ctxWrapper.$el).flag) && !($toolbar && getEventTargetNode(evnt, $toolbar.$el).flag)) {
        if (this.clearSelected) {
          this.clearSelected()
        }
        if (areaOpts.autoClear) {
          if (this.getCellAreas) {
            const cellAreas = this.getCellAreas()
            if (cellAreas && cellAreas.length && !getEventTargetNode(evnt, document.body, 'vxe-table--ignore-areas-clear').flag) {
              this.preventEvent(evnt, 'event.clearAreas', {}, () => {
                this.clearCellAreas()
                this.clearCopyCellArea()
                this.emitEvent('clear-cell-area-selection', { cellAreas }, evnt)
              })
            }
          }
        }
      }
    }
    // 如果配置了快捷菜单且，点击了其他地方则关闭
    if (ctxMenuStore.visible && ctxWrapper && !getEventTargetNode(evnt, ctxWrapper.$el).flag) {
      this.closeMenu()
    }
    const isActivated = getEventTargetNode(evnt, ($xegrid || this).$el).flag
    // 如果存在校验，点击了表格之外则清除
    if (!isActivated && editRules && validOpts.autoClear) {
      this.validErrorMaps = {}
    }
    // 最后激活的表格
    this.isActivated = isActivated
  },
  /**
   * 窗口失焦事件处理
   */
  handleGlobalBlurEvent () {
    this.closeFilter()
    this.closeMenu()
  },
  /**
   * 全局滚动事件
   */
  handleGlobalMousewheelEvent () {
    this.closeTooltip()
    this.closeMenu()
  },
  /**
   * 表格键盘事件
   */
  keydownEvent (evnt: any) {
    const { filterStore, ctxMenuStore, editStore, keyboardConfig, mouseConfig, mouseOpts, keyboardOpts } = this
    const { actived } = editStore
    const { keyCode } = evnt
    const isEsc = keyCode === 27
    if (isEsc) {
      this.preventEvent(evnt, 'event.keydown', null, () => {
        this.emitEvent('keydown-start', {}, evnt)
        if (keyboardConfig && mouseConfig && mouseOpts.area && this.handleKeyboardEvent) {
          this.handleKeyboardEvent(evnt)
        } else if (actived.row || filterStore.visible || ctxMenuStore.visible) {
          evnt.stopPropagation()
          // 如果按下了 Esc 键，关闭快捷菜单、筛选
          this.closeFilter()
          this.closeMenu()
          if (keyboardConfig && keyboardOpts.isEsc) {
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              const params = actived.args
              this.clearEdit(evnt)
              // 如果配置了选中功能，则为选中状态
              if (mouseConfig && mouseOpts.selected) {
                this.$nextTick(() => this.handleSelected(params, evnt))
              }
            }
          }
        }
        this.emitEvent('keydown', {}, evnt)
        this.emitEvent('keydown-end', {}, evnt)
      })
    }
  },
  /**
   * 全局键盘事件
   */
  handleGlobalKeydownEvent (evnt: any) {
    // 该行为只对当前激活的表格有效
    if (this.isActivated) {
      this.preventEvent(evnt, 'event.keydown', null, () => {
        const { filterStore, isCtxMenu, ctxMenuStore, editStore, editOpts, editConfig, mouseConfig, mouseOpts, keyboardConfig, keyboardOpts, treeConfig, treeOpts, highlightCurrentRow, currentRow, bodyCtxMenu, rowOpts } = this
        const { selected, actived } = editStore
        const { keyCode } = evnt
        const hasBackspaceKey = keyCode === 8
        const isTab = keyCode === 9
        const isEnter = keyCode === 13
        const isEsc = keyCode === 27
        const isSpacebar = keyCode === 32
        const isLeftArrow = keyCode === 37
        const isUpArrow = keyCode === 38
        const isRightArrow = keyCode === 39
        const isDwArrow = keyCode === 40
        const hasDeleteKey = keyCode === 46
        const isF2 = keyCode === 113
        const isContextMenu = keyCode === 93
        const hasMetaKey = evnt.metaKey
        const hasCtrlKey = evnt.ctrlKey
        const hasShiftKey = evnt.shiftKey
        const hasAltKey = evnt.altKey
        const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
        const operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow)
        const isEditStatus = isEnableConf(editConfig) && actived.column && actived.row
        const childrenField = treeOpts.children || treeOpts.childrenField
        const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
        if (filterStore.visible) {
          if (isEsc) {
            this.closeFilter()
          }
          return
        }
        if (operCtxMenu) {
          // 如果配置了右键菜单; 支持方向键操作、回车
          evnt.preventDefault()
          if (ctxMenuStore.showChild && hasChildrenList(ctxMenuStore.selected)) {
            this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children)
          } else {
            this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, this.ctxMenuList)
          }
        } else if (keyboardConfig && mouseConfig && mouseOpts.area && this.handleKeyboardEvent) {
          this.handleKeyboardEvent(evnt)
        } else if (keyboardConfig && isSpacebar && keyboardOpts.isChecked && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'radio')) {
          // 空格键支持选中复选框
          evnt.preventDefault()
          if (selected.column.type === 'checkbox') {
            this.handleToggleCheckRowEvent(evnt, selected.args)
          } else {
            this.triggerRadioRowEvent(evnt, selected.args)
          }
        } else if (isF2 && isEnableConf(editConfig)) {
          if (!isEditStatus) {
            // 如果按下了 F2 键
            if (selected.row && selected.column) {
              evnt.stopPropagation()
              evnt.preventDefault()
              this.handleEdit(selected.args, evnt)
            }
          }
        } else if (isContextMenu) {
          // 如果按下上下文键
          this._keyCtx = selected.row && selected.column && bodyCtxMenu.length
          clearTimeout(this.keyCtxTimeout)
          this.keyCtxTimeout = setTimeout(() => {
            this._keyCtx = false
          }, 1000)
        } else if (isEnter && !hasAltKey && keyboardConfig && keyboardOpts.isEnter && (selected.row || actived.row || (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow))) {
          // 退出选中
          if (hasCtrlKey) {
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              const params = actived.args
              this.clearEdit(evnt)
              // 如果配置了选中功能，则为选中状态
              if (mouseConfig && mouseOpts.selected) {
                this.$nextTick(() => this.handleSelected(params, evnt))
              }
            }
          } else {
            // 如果是激活状态，退则出到上一行/下一行
            if (selected.row || actived.row) {
              const targetArgs = selected.row ? selected.args : actived.args
              if (hasShiftKey) {
                if (keyboardOpts.enterToTab) {
                  this.moveTabSelected(targetArgs, hasShiftKey, evnt)
                } else {
                  this.moveSelected(targetArgs, isLeftArrow, true, isRightArrow, false, evnt)
                }
              } else {
                if (keyboardOpts.enterToTab) {
                  this.moveTabSelected(targetArgs, hasShiftKey, evnt)
                } else {
                  this.moveSelected(targetArgs, isLeftArrow, false, isRightArrow, true, evnt)
                }
              }
            } else if (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
              // 如果是树形表格当前行回车移动到子节点
              const childrens = currentRow[childrenField]
              if (childrens && childrens.length) {
                evnt.preventDefault()
                const targetRow = childrens[0]
                const params = { $table: this, row: targetRow }
                this.setTreeExpand(currentRow, true)
                  .then(() => this.scrollToRow(targetRow))
                  .then(() => this.triggerCurrentRowEvent(evnt, params))
              }
            }
          }
        } else if (operArrow && keyboardConfig && keyboardOpts.isArrow) {
          if (!isEditStatus) {
            // 如果按下了方向键
            if (selected.row && selected.column) {
              this.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt)
            } else if ((isUpArrow || isDwArrow) && (rowOpts.isCurrent || highlightCurrentRow)) {
              // 当前行按键上下移动
              this.moveCurrentRow(isUpArrow, isDwArrow, evnt)
            }
          }
        } else if (isTab && keyboardConfig && keyboardOpts.isTab) {
          // 如果按下了 Tab 键切换
          if (selected.row || selected.column) {
            this.moveTabSelected(selected.args, hasShiftKey, evnt)
          } else if (actived.row || actived.column) {
            this.moveTabSelected(actived.args, hasShiftKey, evnt)
          }
        } else if (keyboardConfig && keyboardOpts.isDel && hasDeleteKey && isEnableConf(editConfig) && (selected.row || selected.column)) {
          // 如果是删除键
          if (!isEditStatus) {
            const { delMethod } = keyboardOpts
            const params = {
              row: selected.row,
              rowIndex: this.getRowIndex(selected.row),
              column: selected.column,
              columnIndex: this.getColumnIndex(selected.column),
              $table: this,
              $grid: this.$xegrid
            }
            // 是否被禁用
            if (!beforeEditMethod || beforeEditMethod(params)) {
              if (delMethod) {
                delMethod(params)
              } else {
                setCellValue(selected.row, selected.column, null)
              }
              // 如果按下 del 键，更新表尾数据
              this.updateFooter()
              this.emitEvent('cell-delete-value', params, evnt)
            }
          }
        } else if (hasBackspaceKey && keyboardConfig && keyboardOpts.isBack && isEnableConf(editConfig) && (selected.row || selected.column)) {
          if (!isEditStatus) {
            const { backMethod } = keyboardOpts
            // 如果是删除键
            if (keyboardOpts.isDel && isEnableConf(editConfig) && (selected.row || selected.column)) {
              const params = {
                row: selected.row,
                rowIndex: this.getRowIndex(selected.row),
                column: selected.column,
                columnIndex: this.getColumnIndex(selected.column),
                $table: this,
                $grid: this.$xegrid
              }
              // 是否被禁用
              if (!beforeEditMethod || beforeEditMethod(params)) {
                if (backMethod) {
                  backMethod(params)
                } else {
                  setCellValue(selected.row, selected.column, null)
                  this.handleEdit(selected.args, evnt)
                }
                this.emitEvent('cell-backspace-value', params, evnt)
              }
            }
          }
        } else if (hasBackspaceKey && keyboardConfig && treeConfig && keyboardOpts.isBack && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
          // 如果树形表格回退键关闭当前行返回父节点
          const { parent: parentRow } = XEUtils.findTree(this.afterTreeFullData, item => item === currentRow, { children: childrenField })
          if (parentRow) {
            evnt.preventDefault()
            const params = {
              row: parentRow,
              rowIndex: this.getRowIndex(parentRow),
              $rowIndex: this.getVMRowIndex(parentRow),
              $table: this,
              $grid: this.$xegrid
            }
            this.setTreeExpand(parentRow, false)
              .then(() => this.scrollToRow(parentRow))
              .then(() => this.triggerCurrentRowEvent(evnt, params))
          }
        } else if (keyboardConfig && keyboardOpts.isEdit && !hasCtrlKey && !hasMetaKey && (isSpacebar || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222))) {
          const { editMethod } = keyboardOpts
          // 启用编辑后，空格键功能将失效
          // if (isSpacebar) {
          //   evnt.preventDefault()
          // }
          // 如果是按下非功能键之外允许直接编辑
          if (selected.column && selected.row && isEnableConf(selected.column.editRender)) {
            const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
            const params = {
              row: selected.row,
              rowIndex: this.getRowIndex(selected.row),
              column: selected.column,
              columnIndex: this.getColumnIndex(selected.column),
              $table: this,
              $grid: this.$xegrid
            }
            if (!beforeEditMethod || beforeEditMethod(params)) {
              if (editMethod) {
                editMethod(params)
              } else {
                setCellValue(selected.row, selected.column, null)
                this.handleEdit(selected.args, evnt)
              }
              const afterEditMethod = editOpts.afterEditMethod
              if (afterEditMethod) {
                this.$nextTick(() => {
                  afterEditMethod(params)
                })
              }
            }
          }
        }
        this.emitEvent('keydown', {}, evnt)
      })
    }
  },
  handleGlobalPasteEvent (evnt: any) {
    const { isActivated, keyboardConfig, keyboardOpts, mouseConfig, mouseOpts, editStore, filterStore } = this
    const { actived } = editStore
    if (isActivated && !filterStore.visible) {
      if (!(actived.row || actived.column)) {
        if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && this.handlePasteCellAreaEvent) {
          this.handlePasteCellAreaEvent(evnt)
        }
      }
      this.emitEvent('paste', {}, evnt)
    }
  },
  handleGlobalCopyEvent (evnt: any) {
    const { isActivated, keyboardConfig, keyboardOpts, mouseConfig, mouseOpts, editStore, filterStore } = this
    const { actived } = editStore
    if (isActivated && !filterStore.visible) {
      if (!(actived.row || actived.column)) {
        if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && this.handleCopyCellAreaEvent) {
          this.handleCopyCellAreaEvent(evnt)
        }
      }
      this.emitEvent('copy', {}, evnt)
    }
  },
  handleGlobalCutEvent (evnt: any) {
    const { isActivated, keyboardConfig, keyboardOpts, mouseConfig, mouseOpts, editStore, filterStore } = this
    const { actived } = editStore
    if (isActivated && !filterStore.visible) {
      if (!(actived.row || actived.column)) {
        if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && this.handleCutCellAreaEvent) {
          this.handleCutCellAreaEvent(evnt)
        }
      }
      this.emitEvent('cut', {}, evnt)
    }
  },
  handleGlobalResizeEvent () {
    this.closeMenu()
    this.updateCellAreas()
    this.recalculate(true)
  },
  handleTargetEnterEvent (isClear: any) {
    const $tooltip = this.$refs.tooltip
    clearTimeout(this.tooltipTimeout)
    if (isClear) {
      this.closeTooltip()
    } else {
      if ($tooltip) {
        $tooltip.setActived(true)
      }
    }
  },
  handleTargetLeaveEvent () {
    const tooltipOpts = this.tooltipOpts
    let $tooltip = this.$refs.tooltip
    if ($tooltip) {
      $tooltip.setActived(false)
    }
    if (tooltipOpts.enterable) {
      this.tooltipTimeout = setTimeout(() => {
        $tooltip = this.$refs.tooltip
        if ($tooltip && !$tooltip.isActived()) {
          this.closeTooltip()
        }
      }, tooltipOpts.leaveDelay)
    } else {
      this.closeTooltip()
    }
  },
  triggerHeaderTitleEvent (evnt: any, iconParams: any, params: any) {
    const tipContent = iconParams.content || iconParams.message
    if (tipContent) {
      const { $refs, tooltipStore } = this
      const { column } = params
      const content = getFuncText(tipContent)
      this.handleTargetEnterEvent(true)
      tooltipStore.row = null
      tooltipStore.column = column
      tooltipStore.visible = true
      tooltipStore.currOpts = iconParams
      this.$nextTick(() => {
        const $tooltip = $refs.tooltip
        if ($tooltip) {
          $tooltip.open(evnt.currentTarget, content)
        }
      })
    }
  },
  /**
   * 触发表头 tooltip 事件
   */
  triggerHeaderTooltipEvent (evnt: any, params: any) {
    const { tooltipStore } = this
    const { column } = params
    const titleElem = evnt.currentTarget
    this.handleTargetEnterEvent(tooltipStore.column !== column || tooltipStore.row)
    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, titleElem, titleElem, null, params)
    }
  },
  /**
   * 触发单元格 tooltip 事件
   */
  triggerBodyTooltipEvent (evnt: any, params: any) {
    const { editConfig, editOpts, editStore, tooltipStore } = this
    const { actived } = editStore
    const { row, column } = params
    const cell = evnt.currentTarget
    this.handleTargetEnterEvent(tooltipStore.column !== column || tooltipStore.row !== row)
    // 单元格处于编辑状态时不触发提示框
    if (column.editRender && isEnableConf(editConfig)) {
      // 如果是行编辑模式
      if (editOpts.mode === 'row' && actived.row === row) {
        return
      }
      // 如果是单元格编辑模式
      if (actived.row === row && actived.column === column) {
        return
      }
    }
    if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
      let overflowElem
      let tipElem
      if (column.treeNode) {
        overflowElem = cell.querySelector('.vxe-tree-cell')
        if (column.type === 'html') {
          tipElem = cell.querySelector('.vxe-cell--html')
        }
      } else {
        tipElem = cell.querySelector(column.type === 'html' ? '.vxe-cell--html' : '.vxe-cell--label')
      }
      this.handleTooltip(evnt, cell, overflowElem || cell.children[0], tipElem, params)
    }
  },
  /**
   * 触发表尾 tooltip 事件
   */
  triggerFooterTooltipEvent (evnt: any, params: any) {
    const { column } = params
    const { tooltipStore } = this
    const cell = evnt.currentTarget
    this.handleTargetEnterEvent(true)
    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, cell, cell.querySelector('.vxe-cell--item') || cell.children[0], null, params)
    }
  },
  /**
   * 处理显示 tooltip
   * @param {Event} evnt 事件
   * @param {ColumnInfo} column 列配置
   * @param {Row} row 行对象
   */
  handleTooltip (evnt: any, cell: any, overflowElem: any, tipElem: any, params: any) {
    params.cell = cell
    const { $refs, tooltipOpts, tooltipStore } = this
    const { column, row } = params
    const { showAll, enabled, contentMethod } = tooltipOpts
    const customContent = contentMethod ? contentMethod(params) : null
    const useCustom = contentMethod && !XEUtils.eqNull(customContent)
    const content = useCustom ? customContent : (column.type === 'html' ? overflowElem.innerText : overflowElem.textContent).trim()
    const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth
    if (content && (showAll || enabled || useCustom || isCellOverflow)) {
      Object.assign(tooltipStore, {
        row,
        column,
        visible: true,
        currOpts: {}
      })
      this.$nextTick(() => {
        const $tooltip = $refs.tooltip
        if ($tooltip) {
          $tooltip.open(isCellOverflow ? overflowElem : (tipElem || overflowElem), formatText(content))
        }
      })
    }
    return this.$nextTick()
  },
  openTooltip (target: any, content: any) {
    const { $refs } = this
    const commTip = $refs.commTip
    if (commTip) {
      return commTip.open(target, content)
    }
    return this.$nextTick()
  },
  /**
   * 关闭 tooltip
   */
  closeTooltip () {
    const { $refs, tooltipStore } = this
    const tooltip = $refs.tooltip
    const commTip = $refs.commTip
    if (tooltipStore.visible) {
      Object.assign(tooltipStore, {
        row: null,
        column: null,
        content: null,
        visible: false,
        currOpts: {}
      })
      if (tooltip) {
        tooltip.close()
      }
    }
    if (commTip) {
      commTip.close()
    }
    return this.$nextTick()
  },
  /**
   * 判断列头复选框是否被选中
   */
  isAllCheckboxChecked () {
    return this.isAllSelected
  },
  /**
   * 判断列头复选框是否被半选
   */
  isAllCheckboxIndeterminate () {
    return !this.isAllSelected && this.isIndeterminate
  },
  isCheckboxIndeterminate () {
    warnLog('vxe.error.delFunc', ['isCheckboxIndeterminate', 'isAllCheckboxIndeterminate'])
    return this.isAllCheckboxIndeterminate()
  },
  /**
   * 获取复选框半选状态的行数据
   */
  getCheckboxIndeterminateRecords (isFull: any) {
    const { treeConfig, treeIndeterminateMaps, fullDataRowIdData } = this
    if (treeConfig) {
      const fullRest: any[] = []
      const defRest: any[] = []
      XEUtils.each(treeIndeterminateMaps, (item, rowid) => {
        if (item) {
          fullRest.push(item)
          if (fullDataRowIdData[rowid]) {
            defRest.push(item)
          }
        }
      })
      if (isFull) {
        return fullRest
      }
      return defRest
    }
    return []
  },
  /**
   * 处理默认勾选
   */
  handleDefaultSelectionChecked () {
    const { fullDataRowIdData, checkboxOpts } = this
    const { checkAll, checkRowKeys } = checkboxOpts
    if (checkAll) {
      this.handleCheckedAllCheckboxRow(true, true)
    } else if (checkRowKeys) {
      const defSelection: any[] = []
      checkRowKeys.forEach((rowid: any) => {
        if (fullDataRowIdData[rowid]) {
          defSelection.push(fullDataRowIdData[rowid].row)
        }
      })
      this.handleCheckedCheckboxRow(defSelection, true, true)
    }
  },
  handleCheckedCheckboxRow (rows: any, value: any, isForce: any) {
    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    rows.forEach((row: any) => this.handleSelectRow({ row }, !!value, isForce))
    return this.$nextTick()
  },
  /**
   * 用于多选行，设置行为选中状态，第二个参数为选中与否
   * @param {Array/Row} rows 行数据
   * @param {Boolean} value 是否选中
   */
  setCheckboxRow (rows: any, value: any) {
    return this.handleCheckedCheckboxRow(rows, value, true)
  },
  isCheckedByCheckboxRow (row: any) {
    const { selectCheckboxMaps } = this
    const { checkField } = this.checkboxOpts
    if (checkField) {
      return XEUtils.get(row, checkField)
    }
    return !!selectCheckboxMaps[getRowid(this, row)]
  },
  isIndeterminateByCheckboxRow (row: any) {
    const { treeIndeterminateMaps } = this
    return !!treeIndeterminateMaps[getRowid(this, row)] && !this.isCheckedByCheckboxRow(row)
  },
  /**
   * 多选，行选中事件
   * value 选中true 不选false 半选-1
   */
  handleSelectRow ({ row }: any, value: any, isForce: any) {
    const { selectCheckboxMaps, afterFullData, treeConfig, treeOpts, treeIndeterminateMaps, checkboxOpts } = this
    const { checkField, checkStrictly, checkMethod } = checkboxOpts
    const selectRowMaps = { ...selectCheckboxMaps }
    const childrenField = treeOpts.children || treeOpts.childrenField
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
    const rowid = getRowid(this, row)
    if (checkField) {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          if (!treeIndeterminateMaps[rowid]) {
            if (indeterminateField) {
              XEUtils.set(row, indeterminateField, true)
            }
            treeIndeterminateMaps[rowid] = row
          }
          XEUtils.set(row, checkField, false)
        } else {
          // 更新子节点状态
          XEUtils.eachTree([row], (item) => {
            if (this.eqRow(item, row) || (isForce || (!checkMethod || checkMethod({ row: item })))) {
              XEUtils.set(item, checkField, value)
              if (indeterminateField) {
                XEUtils.set(row, indeterminateField, false)
              }
              delete treeIndeterminateMaps[getRowid(this, item)]
              this.handleCheckboxReserveRow(row, value)
            }
          }, { children: childrenField })
        }
        // 如果存在父节点，更新父节点状态
        const matchObj = XEUtils.findTree(afterFullData, item => this.eqRow(item, row), { children: childrenField })
        if (matchObj && matchObj.parent) {
          let parentStatus
          const vItems: any[] = []
          const vItemMaps: any = {}
          if (!isForce && checkMethod) {
            matchObj.items.forEach((item) => {
              if (checkMethod({ row: item })) {
                const itemRid = getRowid(this, item)
                vItemMaps[itemRid] = item
                vItems.push(item)
              }
            })
          } else {
            matchObj.items.forEach(item => {
              const itemRid = getRowid(this, item)
              vItemMaps[itemRid] = item
              vItems.push(item)
            })
          }
          const indeterminatesItem = XEUtils.find(matchObj.items, item => !!treeIndeterminateMaps[getRowid(this, item)])
          if (indeterminatesItem) {
            parentStatus = -1
          } else {
            const selectItems: any[] = []
            matchObj.items.forEach(item => {
              if (XEUtils.get(item, checkField)) {
                selectItems.push(item)
              }
            })
            parentStatus = selectItems.filter(item => vItemMaps[getRowid(this, item)]).length === vItems.length ? true : (selectItems.length || value === -1 ? -1 : false)
          }
          this.selectCheckboxMaps = selectRowMaps
          return this.handleSelectRow({ row: matchObj.parent }, parentStatus, isForce)
        }
      } else {
        if (isForce || (!checkMethod || checkMethod({ row }))) {
          XEUtils.set(row, checkField, value)
          this.handleCheckboxReserveRow(row, value)
        }
      }
    } else {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          if (!treeIndeterminateMaps[rowid]) {
            if (indeterminateField) {
              XEUtils.set(row, indeterminateField, true)
            }
            treeIndeterminateMaps[rowid] = row
          }
          if (selectRowMaps[rowid]) {
            delete selectRowMaps[rowid]
          }
        } else {
          // 更新子节点状态
          XEUtils.eachTree([row], (item) => {
            const itemRid = getRowid(this, item)
            if (this.eqRow(item, row) || (isForce || (!checkMethod || checkMethod({ row: item })))) {
              if (value) {
                selectRowMaps[itemRid] = item
              } else {
                if (selectRowMaps[itemRid]) {
                  delete selectRowMaps[itemRid]
                }
              }
              if (indeterminateField) {
                XEUtils.set(row, indeterminateField, false)
              }
              delete treeIndeterminateMaps[getRowid(this, item)]
              this.handleCheckboxReserveRow(row, value)
            }
          }, { children: childrenField })
        }
        // 如果存在父节点，更新父节点状态
        const matchObj = XEUtils.findTree(afterFullData, item => this.eqRow(item, row), { children: childrenField })
        if (matchObj && matchObj.parent) {
          let parentStatus
          const vItems: any[] = []
          const vItemMaps: any = {}
          if (!isForce && checkMethod) {
            matchObj.items.forEach((item) => {
              if (checkMethod({ row: item })) {
                const itemRid = getRowid(this, item)
                vItemMaps[itemRid] = item
                vItems.push(item)
              }
            })
          } else {
            matchObj.items.forEach(item => {
              const itemRid = getRowid(this, item)
              vItemMaps[itemRid] = item
              vItems.push(item)
            })
          }
          const indeterminatesItem = XEUtils.find(matchObj.items, item => !!treeIndeterminateMaps[getRowid(this, item)])
          if (indeterminatesItem) {
            parentStatus = -1
          } else {
            const selectItems: any[] = []
            matchObj.items.forEach(item => {
              const itemRid = getRowid(this, item)
              if (selectRowMaps[itemRid]) {
                selectItems.push(item)
              }
            })
            parentStatus = selectItems.filter(item => vItemMaps[getRowid(this, item)]).length === vItems.length ? true : (selectItems.length || value === -1 ? -1 : false)
          }
          this.selectCheckboxMaps = selectRowMaps
          return this.handleSelectRow({ row: matchObj.parent }, parentStatus, isForce)
        }
      } else {
        if (isForce || (!checkMethod || checkMethod({ row }))) {
          if (value) {
            if (!selectRowMaps[rowid]) {
              selectRowMaps[rowid] = row
            }
          } else {
            if (selectRowMaps[rowid]) {
              delete selectRowMaps[rowid]
            }
          }
          this.handleCheckboxReserveRow(row, value)
        }
      }
    }
    this.selectCheckboxMaps = selectRowMaps
    this.checkSelectionStatus()
  },
  handleToggleCheckRowEvent (evnt: any, params: any) {
    const { selectCheckboxMaps, checkboxOpts } = this
    const { checkField, trigger } = checkboxOpts
    const { row } = params
    if (trigger === 'manual') {
      return
    }
    let value = false
    if (checkField) {
      value = !XEUtils.get(row, checkField)
    } else {
      value = !selectCheckboxMaps[getRowid(this, row)]
    }
    if (evnt) {
      this.triggerCheckRowEvent(evnt, params, value)
    } else {
      this.handleSelectRow(params, value)
    }
  },
  triggerCheckRowEvent (evnt: any, params: any, value: any) {
    const { checkboxOpts, afterFullData } = this
    const { checkMethod, trigger } = checkboxOpts
    const { row } = params
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    if (checkboxOpts.isShiftKey && evnt.shiftKey && !this.treeConfig) {
      const checkboxRecords = this.getCheckboxRecords()
      if (checkboxRecords.length) {
        const firstRow = checkboxRecords[0]
        const _rowIndex = this.getVTRowIndex(row)
        const _firstRowIndex = this.getVTRowIndex(firstRow)
        if (_rowIndex !== _firstRowIndex) {
          this.setAllCheckboxRow(false)
          const rangeRows = _rowIndex < _firstRowIndex ? afterFullData.slice(_rowIndex, _firstRowIndex + 1) : afterFullData.slice(_firstRowIndex, _rowIndex + 1)
          this.handleCheckedCheckboxRow(rangeRows, true, false)
          this.emitEvent('checkbox-range-select', Object.assign({ rangeRecords: rangeRows }, params), evnt)
          return
        }
      }
    }
    if (!checkMethod || checkMethod({ row })) {
      this.handleSelectRow(params, value)
      this.emitEvent('checkbox-change', Object.assign({
        records: this.getCheckboxRecords(),
        reserves: this.getCheckboxReserveRecords(),
        indeterminates: this.getCheckboxIndeterminateRecords(),
        checked: value
      }, params), evnt)
    }
  },
  /**
   * 多选，切换某一行的选中状态
   */
  toggleCheckboxRow (row: any) {
    const { selectCheckboxMaps, checkboxOpts } = this
    const { checkField } = checkboxOpts
    const value = checkField ? !XEUtils.get(row, checkField) : !selectCheckboxMaps[getRowid(this, row)]
    this.handleSelectRow({ row }, value, true)
    return this.$nextTick()
  },
  handleCheckedAllCheckboxRow (value: any, isForce: any) {
    const { afterFullData, treeConfig, treeOpts, selectCheckboxMaps, checkboxReserveRowMap, checkboxOpts, afterFullRowMaps } = this
    const { checkField, reserve, checkStrictly, checkMethod } = checkboxOpts
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
    const childrenField = treeOpts.children || treeOpts.childrenField
    const selectRowMaps: any = {}

    // 疑惑！
    if (!treeConfig) {
      XEUtils.each(selectCheckboxMaps, (row, rowid) => {
        if (!afterFullRowMaps[rowid]) {
          selectRowMaps[rowid] = row
        }
      })
    }
    // 疑惑！

    if (checkStrictly) {
      this.isAllSelected = value
    } else {
      /**
       * 绑定属性方式（高性能，有污染）
       * 必须在行数据存在对应的属性，否则将不响应
       */
      if (checkField) {
        const checkValFn = (row: any) => {
          if (isForce || (!checkMethod || checkMethod({ row }))) {
            if (value) {
              selectRowMaps[getRowid(this, row)] = row
            }
            XEUtils.set(row, checkField, value)
          }
          if (treeConfig && indeterminateField) {
            XEUtils.set(row, indeterminateField, false)
          }
        }
        // 如果存在选中方法
        // 如果方法成立，则更新值，否则忽略该数据
        if (treeConfig) {
          XEUtils.eachTree(afterFullData, checkValFn, { children: childrenField })
        } else {
          afterFullData.forEach(checkValFn)
        }
      } else {
        /**
         * 默认方式（低性能，无污染）
         * 无需任何属性，直接绑定
         */
        if (treeConfig) {
          if (value) {
            /**
             * 如果是树勾选
             * 如果方法成立，则添加到临时集合中
             */
            XEUtils.eachTree(afterFullData, (row) => {
              if (isForce || (!checkMethod || checkMethod({ row }))) {
                selectRowMaps[getRowid(this, row)] = row
              }
            }, { children: childrenField })
          } else {
            /**
             * 如果是树取消
             * 如果方法成立，则不添加到临时集合中
             */
            if (!isForce && checkMethod) {
              XEUtils.eachTree(afterFullData, (row) => {
                const rowid = getRowid(this, row)
                if (checkMethod({ row }) ? 0 : selectCheckboxMaps[rowid]) {
                  selectRowMaps[rowid] = row
                }
              }, { children: childrenField })
            }
          }
        } else {
          if (value) {
            /**
             * 如果是行勾选
             * 如果存在选中方法且成立或者本身已勾选，则添加到临时集合中
             * 如果不存在选中方法，则添加所有数据到临时集合中
             */
            if (!isForce && checkMethod) {
              afterFullData.forEach((row: any) => {
                const rowid = getRowid(this, row)
                if (selectCheckboxMaps[rowid] || checkMethod({ row })) {
                  selectRowMaps[rowid] = row
                }
              })
            } else {
              afterFullData.forEach((row: any) => {
                selectRowMaps[getRowid(this, row)] = row
              })
            }
          } else {
            /**
             * 如果是行取消
             * 如果方法成立，则不添加到临时集合中；如果方法不成立则判断当前是否已勾选，如果已被勾选则添加到新集合中
             * 如果不存在选中方法，无需处理，临时集合默认为空
             */
            if (!isForce && checkMethod) {
              afterFullData.forEach((row: any) => {
                const rowid = getRowid(this, row)
                if (checkMethod({ row }) ? 0 : selectCheckboxMaps[rowid]) {
                  selectRowMaps[rowid] = row
                }
              })
            }
          }
        }
      }
      if (reserve) {
        if (value) {
          XEUtils.each(selectRowMaps, (row, rowid) => {
            checkboxReserveRowMap[rowid] = row
          })
        } else {
          afterFullData.forEach((row: any) => this.handleCheckboxReserveRow(row, false))
        }
      }
      this.selectCheckboxMaps = checkField ? {} : selectRowMaps
    }
    this.treeIndeterminateMaps = {}
    this.treeIndeterminateRowMaps = {}
    this.checkSelectionStatus()
    return this.$nextTick()
  },
  /**
   * 用于多选行，设置所有行的选中状态
   * @param {Boolean} value 是否选中
   */
  setAllCheckboxRow (value: any) {
    return this.handleCheckedAllCheckboxRow(value, true)
  },
  checkSelectionStatus () {
    const { afterFullData, selectCheckboxMaps, treeIndeterminateMaps, checkboxOpts, treeConfig } = this
    const { checkField, checkStrictly, checkMethod } = checkboxOpts
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
    if (!checkStrictly) {
      const disableRows = []
      const checkRows = []
      let isAllResolve = false
      let isAllSelected = false
      let isIndeterminate = false
      if (checkField) {
        isAllResolve = afterFullData.every(
          checkMethod
            ? (row: any) => {
                if (!checkMethod({ row })) {
                  disableRows.push(row)
                  return true
                }
                if (XEUtils.get(row, checkField)) {
                  checkRows.push(row)
                  return true
                }
                return false
              }
            : (row: any) => XEUtils.get(row, checkField)
        )
        isAllSelected = isAllResolve && afterFullData.length !== disableRows.length
        if (treeConfig) {
          if (indeterminateField) {
            isIndeterminate = !isAllSelected && afterFullData.some((row: any) => XEUtils.get(row, checkField) || XEUtils.get(row, indeterminateField) || !!treeIndeterminateMaps[getRowid(this, row)])
          } else {
            isIndeterminate = !isAllSelected && afterFullData.some((row: any) => XEUtils.get(row, checkField) || !!treeIndeterminateMaps[getRowid(this, row)])
          }
        } else {
          if (indeterminateField) {
            isIndeterminate = !isAllSelected && afterFullData.some((row: any) => XEUtils.get(row, checkField) || XEUtils.get(row, indeterminateField))
          } else {
            isIndeterminate = !isAllSelected && afterFullData.some((row: any) => XEUtils.get(row, checkField))
          }
        }
      } else {
        isAllResolve = afterFullData.every(
          checkMethod
            ? (row: any) => {
                if (!checkMethod({ row })) {
                  disableRows.push(row)
                  return true
                }
                if (selectCheckboxMaps[getRowid(this, row)]) {
                  checkRows.push(row)
                  return true
                }
                return false
              }
            : (row: any) => selectCheckboxMaps[getRowid(this, row)]
        )
        isAllSelected = isAllResolve && afterFullData.length !== disableRows.length
        if (treeConfig) {
          isIndeterminate = !isAllSelected && afterFullData.some((row: any) => {
            const itemRid = getRowid(this, row)
            return treeIndeterminateMaps[itemRid] || selectCheckboxMaps[itemRid]
          })
        } else {
          isIndeterminate = !isAllSelected && afterFullData.some((row: any) => selectCheckboxMaps[getRowid(this, row)])
        }
      }
      this.isAllSelected = isAllSelected
      this.isIndeterminate = isIndeterminate
    }
  },
  // 还原展开、选中等相关状态
  handleReserveStatus () {
    const { expandColumn, treeOpts, treeConfig, fullDataRowIdData, fullAllDataRowMap, currentRow, selectRadioRow, radioReserveRow, radioOpts, checkboxOpts, selectCheckboxMaps, rowExpandedMaps, treeExpandedMaps, expandOpts } = this
    // 单选框
    if (selectRadioRow && !fullAllDataRowMap.has(selectRadioRow)) {
      this.selectRadioRow = null // 刷新单选行状态
    }
    // 还原保留选中状态
    if (radioOpts.reserve && radioReserveRow) {
      const rowid = getRowid(this, radioReserveRow)
      if (fullDataRowIdData[rowid]) {
        this.handleCheckedRadioRow(fullDataRowIdData[rowid].row, true)
      }
    }
    // 复选框
    this.selectCheckboxMaps = getRecoverRowMaps(this, selectCheckboxMaps) // 刷新多选行状态
    // 还原保留选中状态
    if (checkboxOpts.reserve) {
      this.handleCheckedCheckboxRow(handleReserveRow(this, this.checkboxReserveRowMap), true, true)
    }
    if (currentRow && !fullAllDataRowMap.has(currentRow)) {
      this.currentRow = null // 刷新当前行状态
    }
    // 行展开
    this.rowExpandedMaps = expandColumn ? getRecoverRowMaps(this, rowExpandedMaps) : [] // 刷新行展开状态
    // 还原保留状态
    if (expandColumn && expandOpts.reserve) {
      this.setRowExpand(handleReserveRow(this, this.rowExpandedReserveRowMap), true)
    }
    // 树展开
    this.treeExpandedMaps = treeConfig ? getRecoverRowMaps(this, treeExpandedMaps) : [] // 刷新树展开状态
    if (treeConfig && treeOpts.reserve) {
      this.setTreeExpand(handleReserveRow(this, this.treeExpandedReserveRowMap), true)
    }
  },
  /**
   * 获取单选框保留选中的行
   */
  getRadioReserveRecord (isFull: any) {
    const { fullDataRowIdData, radioReserveRow, radioOpts, afterFullData, treeConfig, treeOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    if (radioOpts.reserve && radioReserveRow) {
      const rowid = getRowid(this, radioReserveRow)
      if (isFull) {
        if (!fullDataRowIdData[rowid]) {
          return radioReserveRow
        }
      } else {
        const rowkey = getRowkey(this)
        if (treeConfig) {
          const matchObj = XEUtils.findTree(afterFullData, row => rowid === XEUtils.get(row, rowkey), { children: childrenField })
          if (matchObj) {
            return radioReserveRow
          }
        } else {
          if (!afterFullData.some((row: any) => rowid === XEUtils.get(row, rowkey))) {
            return radioReserveRow
          }
        }
      }
    }
    return null
  },
  clearRadioReserve () {
    this.radioReserveRow = null
    return this.$nextTick()
  },
  handleRadioReserveRow (row: any) {
    const { radioOpts } = this
    if (radioOpts.reserve) {
      this.radioReserveRow = row
    }
  },
  /**
   * 获取复选框保留选中的行
   */
  getCheckboxReserveRecords (isFull: any) {
    const { fullDataRowIdData, afterFullData, checkboxReserveRowMap, checkboxOpts, treeConfig, treeOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const reserveSelection: any[] = []
    if (checkboxOpts.reserve) {
      const afterFullIdMaps: any = {}
      if (treeConfig) {
        XEUtils.eachTree(afterFullData, row => {
          afterFullIdMaps[getRowid(this, row)] = 1
        }, { children: childrenField })
      } else {
        afterFullData.forEach((row: any) => {
          afterFullIdMaps[getRowid(this, row)] = 1
        })
      }
      XEUtils.each(checkboxReserveRowMap, (oldRow, oldRowid) => {
        if (oldRow) {
          if (isFull) {
            if (!fullDataRowIdData[oldRowid]) {
              reserveSelection.push(oldRow)
            }
          } else {
            if (!afterFullIdMaps[oldRowid]) {
              reserveSelection.push(oldRow)
            }
          }
        }
      })
    }
    return reserveSelection
  },
  clearCheckboxReserve () {
    this.checkboxReserveRowMap = {}
    return this.$nextTick()
  },
  handleCheckboxReserveRow (row: any, checked: any) {
    const { checkboxReserveRowMap, checkboxOpts } = this
    if (checkboxOpts.reserve) {
      const rowid = getRowid(this, row)
      if (checked) {
        checkboxReserveRowMap[rowid] = row
      } else if (checkboxReserveRowMap[rowid]) {
        delete checkboxReserveRowMap[rowid]
      }
    }
  },
  handleCheckAllEvent (evnt: any, value: any) {
    this.handleCheckedAllCheckboxRow(value)
    if (evnt) {
      this.emitEvent('checkbox-all', { records: this.getCheckboxRecords(), reserves: this.getCheckboxReserveRecords(), indeterminates: this.getCheckboxIndeterminateRecords(), checked: value }, evnt)
    }
  },
  /**
   * 多选，选中所有事件
   */
  triggerCheckAllEvent (evnt: any, value: any) {
    const { checkboxOpts } = this
    const { trigger } = checkboxOpts
    if (trigger === 'manual') {
      return
    }
    if (evnt) {
      evnt.stopPropagation()
    }
    this.handleCheckAllEvent(evnt, value)
  },
  /**
   * 多选，切换所有行的选中状态
   */
  toggleAllCheckboxRow () {
    this.handleCheckAllEvent(null, !this.isAllSelected)
    return this.$nextTick()
  },
  /**
   * 用于多选行，手动清空用户的选择
   * 清空行为不管是否被禁用还是保留记录，都将彻底清空选中状态
   */
  clearCheckboxRow () {
    const { tableFullData, treeConfig, treeOpts, checkboxOpts } = this
    const { checkField, reserve } = checkboxOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
    if (checkField) {
      const handleClearChecked = (item: any) => {
        if (treeConfig && indeterminateField) {
          XEUtils.set(item, indeterminateField, false)
        }
        XEUtils.set(item, checkField, false)
      }
      if (treeConfig) {
        XEUtils.eachTree(tableFullData, handleClearChecked, { children: childrenField })
      } else {
        tableFullData.forEach(handleClearChecked)
      }
    }
    if (reserve) {
      tableFullData.forEach((row: any) => this.handleCheckboxReserveRow(row, false))
    }
    this.isAllSelected = false
    this.isIndeterminate = false
    this.selectCheckboxMaps = {}
    this.treeIndeterminateMaps = {}
    return this.$nextTick()
  },
  /**
   * 处理单选框默认勾选
   */
  handleDefaultRadioChecked () {
    const { radioOpts, fullDataRowIdData } = this
    const { checkRowKey: rowid, reserve } = radioOpts
    if (rowid) {
      if (fullDataRowIdData[rowid]) {
        this.handleCheckedRadioRow(fullDataRowIdData[rowid].row, true)
      }
      if (reserve) {
        const rowkey = getRowkey(this)
        this.radioReserveRow = { [rowkey]: rowid }
      }
    }
  },
  /**
   * 单选，行选中事件
   */
  triggerRadioRowEvent (evnt: any, params: any) {
    const { selectRadioRow: oldValue, radioOpts } = this
    const { row } = params
    const { trigger } = radioOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    let newValue = row
    let isChange = oldValue !== newValue
    if (isChange) {
      this.handleCheckedRadioRow(newValue)
    } else if (!radioOpts.strict) {
      isChange = oldValue === newValue
      if (isChange) {
        newValue = null
        this.clearRadioRow()
      }
    }
    if (isChange) {
      this.emitEvent('radio-change', { oldValue, newValue, ...params }, evnt)
    }
  },
  triggerCurrentRowEvent (evnt: any, params: any) {
    const { currentRow: oldValue } = this
    const { row: newValue } = params
    const isChange = oldValue !== newValue
    this.setCurrentRow(newValue)
    if (isChange) {
      this.emitEvent('current-change', { oldValue, newValue, ...params }, evnt)
    }
  },
  /**
   * 用于当前行，设置某一行为高亮状态
   * @param {Row} row 行对象
   */
  setCurrentRow (row: any) {
    const { $el, rowOpts } = this
    this.clearCurrentRow()
    // this.clearCurrentColumn()
    this.currentRow = row
    if (rowOpts.isCurrent || this.highlightCurrentRow) {
      if ($el) {
        XEUtils.arrayEach($el.querySelectorAll(`[rowid="${getRowid(this, row)}"]`), elem => addClass(elem, 'row--current'))
      }
    }
    return this.$nextTick()
  },
  isCheckedByRadioRow (row: any) {
    return this.selectRadioRow === row
  },
  handleCheckedRadioRow (row: any, isForce: any) {
    const { radioOpts } = this
    const { checkMethod } = radioOpts
    if (row && (isForce || (!checkMethod || checkMethod({ row })))) {
      this.selectRadioRow = row
      this.handleRadioReserveRow(row)
    }
    return this.$nextTick()
  },
  /**
   * 用于单选行，设置某一行为选中状态
   * @param {Row} row 行对象
   */
  setRadioRow (row: any) {
    return this.handleCheckedRadioRow(row, true)
  },
  /**
   * 用于当前行，手动清空当前高亮的状态
   */
  clearCurrentRow () {
    const { $el } = this
    this.currentRow = null
    this.hoverRow = null
    if ($el) {
      XEUtils.arrayEach($el.querySelectorAll('.row--current'), elem => removeClass(elem, 'row--current'))
    }
    return this.$nextTick()
  },
  /**
   * 用于单选行，手动清空用户的选择
   */
  clearRadioRow () {
    this.selectRadioRow = null
    return this.$nextTick()
  },
  /**
   * 用于当前行，获取当前行的数据
   */
  getCurrentRecord () {
    return this.rowOpts.isCurrent || this.highlightCurrentRow ? this.currentRow : null
  },
  /**
   * 用于单选行，获取当已选中的数据
   */
  getRadioRecord (isFull: any) {
    const { selectRadioRow, fullDataRowIdData, afterFullRowMaps } = this
    if (selectRadioRow) {
      const rowid = getRowid(this, selectRadioRow)
      if (isFull) {
        if (fullDataRowIdData[rowid]) {
          return selectRadioRow
        }
      } else {
        if (afterFullRowMaps[rowid]) {
          return selectRadioRow
        }
      }
    }
    return null
  },
  /**
   * 行 hover 事件
   */
  triggerHoverEvent (evnt: any, { row }: any) {
    this.setHoverRow(row)
  },
  setHoverRow (row: any) {
    const { $el } = this
    const rowid = getRowid(this, row)
    this.clearHoverRow()
    if ($el) {
      XEUtils.arrayEach($el.querySelectorAll(`[rowid="${rowid}"]`), elem => addClass(elem, 'row--hover'))
    }
    this.hoverRow = row
  },
  clearHoverRow () {
    const { $el } = this
    if ($el) {
      XEUtils.arrayEach($el.querySelectorAll('.vxe-body--row.row--hover'), elem => removeClass(elem, 'row--hover'))
    }
    this.hoverRow = null
  },
  triggerHeaderCellClickEvent (evnt: any, params: any) {
    const { _lastResizeTime, sortOpts } = this
    const { column } = params
    const cell = evnt.currentTarget
    const triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300
    const triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
    const triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
    if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
      this.triggerSortEvent(evnt, column, getNextSortOrder(this, column))
    }
    this.emitEvent('header-cell-click', Object.assign({ triggerResizable, triggerSort, triggerFilter, cell }, params), evnt)
    if (this.columnOpts.isCurrent || this.highlightCurrentColumn) {
      return this.setCurrentColumn(column)
    }
    return this.$nextTick()
  },
  triggerHeaderCellDblclickEvent (evnt: any, params: any) {
    this.emitEvent('header-cell-dblclick', Object.assign({ cell: evnt.currentTarget }, params), evnt)
  },
  getCurrentColumn () {
    return this.columnOpts.isCurrent || this.highlightCurrentColumn ? this.currentColumn : null
  },
  /**
   * 用于当前列，设置某列行为高亮状态
   * @param {ColumnInfo} fieldOrColumn 列配置
   */
  setCurrentColumn (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      // this.clearCurrentRow()
      this.clearCurrentColumn()
      this.currentColumn = column
    }
    return this.$nextTick()
  },
  /**
   * 用于当前列，手动清空当前高亮的状态
   */
  clearCurrentColumn () {
    this.currentColumn = null
    return this.$nextTick()
  },
  checkValidate (type: any) {
    if (this.triggerValidate) {
      return this.triggerValidate(type)
    }
    return this.$nextTick()
  },
  /**
   * 当单元格发生改变时
   * 如果存在规则，则校验
   */
  handleChangeCell (evnt: any, params: any) {
    this.checkValidate('blur')
      .catch((e: any) => e)
      .then(() => {
        this.handleEdit(params, evnt)
          .then(() => this.checkValidate('change'))
          .catch((e: any) => e)
      })
  },
  /**
   * 列点击事件
   * 如果是单击模式，则激活为编辑状态
   * 如果是双击模式，则单击后选中状态
   */
  triggerCellClickEvent (evnt: any, params: any) {
    const { highlightCurrentRow, editStore, radioOpts, expandOpts, treeOpts, keyboardOpts, editConfig, editOpts, checkboxOpts, rowOpts } = this
    const { actived, focused } = editStore
    const { row, column } = params
    const { type, treeNode } = column
    const isRadioType = type === 'radio'
    const isCheckboxType = type === 'checkbox'
    const isExpandType = type === 'expand'
    const cell = evnt.currentTarget
    const triggerRadio = isRadioType && getEventTargetNode(evnt, cell, 'vxe-cell--radio').flag
    const triggerCheckbox = isCheckboxType && getEventTargetNode(evnt, cell, 'vxe-cell--checkbox').flag
    const triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, 'vxe-tree--btn-wrapper').flag
    const triggerExpandNode = isExpandType && getEventTargetNode(evnt, cell, 'vxe-table--expanded').flag
    params = Object.assign({ cell, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode }, params)
    if (!triggerCheckbox && !triggerRadio) {
      // 如果是展开行
      if (!triggerExpandNode && (expandOpts.trigger === 'row' || (isExpandType && expandOpts.trigger === 'cell'))) {
        this.triggerRowExpandEvent(evnt, params)
      }
      // 如果是树形表格
      if ((treeOpts.trigger === 'row' || (treeNode && treeOpts.trigger === 'cell'))) {
        this.triggerTreeExpandEvent(evnt, params)
      }
    }
    // 如果点击了树节点
    if (!triggerTreeNode) {
      if (!triggerExpandNode) {
        // 如果是高亮行
        if (rowOpts.isCurrent || highlightCurrentRow) {
          if (!triggerCheckbox && !triggerRadio) {
            this.triggerCurrentRowEvent(evnt, params)
          }
        }
        // 如果是单选框
        if (!triggerRadio && (radioOpts.trigger === 'row' || (isRadioType && radioOpts.trigger === 'cell'))) {
          this.triggerRadioRowEvent(evnt, params)
        }
        // 如果是复选框
        if (!triggerCheckbox && (checkboxOpts.trigger === 'row' || (isCheckboxType && checkboxOpts.trigger === 'cell'))) {
          this.handleToggleCheckRowEvent(evnt, params)
        }
      }
      // 如果设置了单元格选中功能，则不会使用点击事件去处理（只能支持双击模式）
      if (isEnableConf(editConfig)) {
        // 记录点击输入框聚焦状态
        if (keyboardOpts.arrowCursorLock && evnt && editOpts.mode === 'cell' && evnt.target && /^input|textarea$/i.test(evnt.target.tagName)) {
          focused.column = column
          focused.row = row
        }
        if (editOpts.trigger === 'manual') {
          if (actived.args && actived.row === row && column !== actived.column) {
            this.handleChangeCell(evnt, params)
          }
        } else if (!actived.args || row !== actived.row || column !== actived.column) {
          if (editOpts.trigger === 'click') {
            this.handleChangeCell(evnt, params)
          } else if (editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row' && actived.row === row) {
              this.handleChangeCell(evnt, params)
            }
          }
        }
      }
    }
    this.emitEvent('cell-click', params, evnt)
  },
  /**
   * 列双击点击事件
   * 如果是双击模式，则激活为编辑状态
   */
  triggerCellDblclickEvent (evnt: any, params: any) {
    const { editStore, editConfig, editOpts } = this
    const { actived } = editStore
    const cell = evnt.currentTarget
    params.cell = cell
    if (isEnableConf(editConfig) && editOpts.trigger === 'dblclick') {
      if (!actived.args || evnt.currentTarget !== actived.args.cell) {
        if (editOpts.mode === 'row') {
          this.checkValidate('blur')
            .catch((e: any) => e)
            .then(() => {
              this.handleEdit(params, evnt)
                .then(() => this.checkValidate('change'))
                .catch((e: any) => e)
            })
        } else if (editOpts.mode === 'cell') {
          this.handleEdit(params, evnt)
            .then(() => this.checkValidate('change'))
            .catch((e: any) => e)
        }
      }
    }
    this.emitEvent('cell-dblclick', params, evnt)
  },
  handleDefaultSort () {
    const { sortConfig, sortOpts } = this
    let { defaultSort } = sortOpts
    if (defaultSort) {
      if (!XEUtils.isArray(defaultSort)) {
        defaultSort = [defaultSort]
      }
      if (defaultSort.length) {
        (sortConfig.multiple ? defaultSort : defaultSort.slice(0, 1)).forEach((item: any, index: any) => {
          const { field, order } = item
          if (field && order) {
            const column = this.getColumnByField(field)
            if (column && column.sortable) {
              column.order = order
              column.sortTime = Date.now() + index
            }
          }
        })
        if (!sortOpts.remote) {
          this.handleTableData(true).then(this.updateStyle)
        }
      }
    }
  },
  /**
   * 点击排序事件
   */
  triggerSortEvent (evnt: any, column: any, order: any) {
    const { sortOpts } = this
    const { field, sortable, remoteSort } = column
    if (sortable || remoteSort) {
      if (!order || column.order === order) {
        this.clearSort(sortOpts.multiple ? column : null)
      } else {
        this.sort({ field, order })
      }
      const params = { $table: this, $event: evnt, column, field, property: field, order: column.order, sortList: this.getSortColumns(), sortTime: column.sortTime }
      if (this.mouseConfig && this.mouseOpts.area && this.handleSortEvent) {
        this.handleSortEvent(evnt, params)
      }
      this.emitEvent('sort-change', params, evnt)
    }
  },
  setPendingRow (rows: any, status: any) {
    const pendingMaps = { ...this.pendingRowMaps }
    const pendingList = [...this.pendingRowList]
    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    if (status) {
      rows.forEach((row: any) => {
        const rowid = getRowid(this, row)
        if (rowid && !pendingMaps[rowid]) {
          pendingList.push(row)
          pendingMaps[rowid] = row
        }
      })
    } else {
      rows.forEach((row: any) => {
        const rowid = getRowid(this, row)
        if (rowid && pendingMaps[rowid]) {
          const pendingIndex = this.findRowIndexOf(pendingList, row)
          if (pendingIndex > -1) {
            pendingList.splice(pendingIndex, 1)
          }
          delete pendingMaps[rowid]
        }
      })
    }
    this.pendingRowMaps = pendingMaps
    this.pendingRowList = pendingList
    return this.$nextTick()
  },
  togglePendingRow (rows: any) {
    const pendingMaps = { ...this.pendingRowMaps }
    const pendingList = [...this.pendingRowList]
    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    rows.forEach((row: any) => {
      const rowid = getRowid(this, row)
      if (rowid) {
        if (pendingMaps[rowid]) {
          const pendingIndex = this.findRowIndexOf(pendingList, row)
          if (pendingIndex > -1) {
            pendingList.splice(pendingIndex, 1)
          }
          delete pendingMaps[rowid]
        } else {
          pendingList.push(row)
          pendingMaps[rowid] = row
        }
      }
    })
    this.pendingRowMaps = pendingMaps
    this.pendingRowList = pendingList
    return this.$nextTick()
  },
  getPendingRecords () {
    return this.pendingRowList.slice(0)
  },
  hasPendingByRow (row: any) {
    const { pendingRowMaps } = this
    const rowid = getRowid(this, row)
    return !!pendingRowMaps[rowid]
  },
  clearPendingRow () {
    this.pendingRowMaps = {}
    this.pendingRowList = []
    return this.$nextTick()
  },
  sort (sortConfs: any, sortOrder: any) {
    const { sortOpts } = this
    const { multiple, remote, orders } = sortOpts
    if (sortConfs) {
      if (XEUtils.isString(sortConfs)) {
        sortConfs = [
          { field: sortConfs, order: sortOrder }
        ]
      }
    }
    if (!XEUtils.isArray(sortConfs)) {
      sortConfs = [sortConfs]
    }
    if (sortConfs.length) {
      let firstSortColumn: any
      if (!multiple) {
        clearAllSort(this)
      }
      (multiple ? sortConfs : [sortConfs[0]]).forEach((confs: any, index: any) => {
        let { field, order } = confs
        let column = field
        if (XEUtils.isString(field)) {
          column = this.getColumnByField(field)
        }
        if (column && (column.sortable || column.remoteSort)) {
          if (!firstSortColumn) {
            firstSortColumn = column
          }
          if (orders.indexOf(order) === -1) {
            order = getNextSortOrder(this, column)
          }
          if (column.order !== order) {
            column.order = order
          }
          column.sortTime = Date.now() + index
        }
      })
      // 如果是服务端排序，则跳过本地排序处理
      if (!remote || (firstSortColumn && firstSortColumn.remoteSort)) {
        this.handleTableData(true)
      }
      return this.$nextTick().then(() => {
        this.updateCellAreas()
        return this.updateStyle()
      })
    }
    return this.$nextTick()
  },
  /**
   * 清空指定列的排序条件
   * 如果为空则清空所有列的排序条件
   * @param {String} column 列或字段名
   */
  clearSort (fieldOrColumn: any) {
    const { sortOpts } = this
    if (fieldOrColumn) {
      const column = handleFieldOrColumn(this, fieldOrColumn)
      if (column) {
        column.order = null
      }
    } else {
      clearAllSort(this)
    }
    if (!sortOpts.remote) {
      this.handleTableData(true)
    }
    return this.$nextTick().then(this.updateStyle)
  },
  // 在 v3 中废弃
  getSortColumn () {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['getSortColumn', 'getSortColumns'])
    }
    return XEUtils.find(this.tableFullColumn, column => (column.sortable || column.remoteSort) && column.order)
  },
  isSort (fieldOrColumn: any) {
    if (fieldOrColumn) {
      const column = handleFieldOrColumn(this, fieldOrColumn)
      return column && column.sortable && !!column.order
    }
    return this.getSortColumns().length > 0
  },
  getSortColumns () {
    const { multiple, chronological } = this.sortOpts
    const sortList: any[] = []
    this.tableFullColumn.forEach((column: any) => {
      const { field, order } = column
      if ((column.sortable || column.remoteSort) && order) {
        sortList.push({ column, field, property: field, order, sortTime: column.sortTime })
      }
    })
    if (multiple && chronological && sortList.length > 1) {
      return XEUtils.orderBy(sortList, 'sortTime')
    }
    return sortList
  },
  /**
   * 关闭筛选
   * @param {Event} evnt 事件
   */
  closeFilter () {
    const { filterStore } = this
    const { column, visible } = filterStore
    Object.assign(filterStore, {
      isAllSelected: false,
      isIndeterminate: false,
      options: [],
      visible: false
    })
    if (visible) {
      this.emitEvent('filter-visible', { column, field: column.field, property: column.field, filterList: this.getCheckedFilters(), visible: false }, null)
    }
    return this.$nextTick()
  },
  /**
   * 判断指定列是否为筛选状态，如果为空则判断所有列
   * @param {String} fieldOrColumn 字段名
   */
  isActiveFilterByColumn (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      return column.filters && column.filters.some((option: any) => option.checked)
    }
    return this.getCheckedFilters().length > 0
  },
  // 已废弃
  isFilter (fieldOrColumn: any) {
    return this.isActiveFilterByColumn(fieldOrColumn)
  },
  /**
   * 判断展开行是否懒加载完成
   * @param {Row} row 行对象
   */
  isRowExpandLoaded (row: any) {
    const rest = this.fullAllDataRowMap.get(row)
    return rest && rest.expandLoaded
  },
  clearRowExpandLoaded (row: any) {
    const { expandOpts, rowExpandLazyLoadedMaps, fullAllDataRowMap } = this
    const { lazy } = expandOpts
    const rowid = getRowid(this, row)
    const rest = fullAllDataRowMap.get(row)
    if (lazy && rest) {
      rest.expandLoaded = false
      const rowTempExpandLazyLoadedMaps = { ...rowExpandLazyLoadedMaps }
      if (rowTempExpandLazyLoadedMaps[rowid]) {
        delete rowTempExpandLazyLoadedMaps[rowid]
      }
      this.rowExpandLazyLoadedMaps = rowTempExpandLazyLoadedMaps
    }
    return this.$nextTick()
  },
  /**
   * 重新懒加载展开行，并展开内容
   * @param {Row} row 行对象
   */
  reloadRowExpand (row: any) {
    const { expandOpts, rowExpandLazyLoadedMaps } = this
    const { lazy } = expandOpts
    const rowid = getRowid(this, row)
    if (lazy && !rowExpandLazyLoadedMaps[rowid]) {
      this.clearRowExpandLoaded(row)
        .then(() => this.handleAsyncRowExpand(row))
    }
    return this.$nextTick()
  },
  reloadExpandContent (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['reloadExpandContent', 'reloadRowExpand'])
    }
    // 即将废弃
    return this.reloadRowExpand(row)
  },
  /**
   * 展开行事件
   */
  triggerRowExpandEvent (evnt: any, params: any) {
    const { expandOpts, rowExpandLazyLoadedMaps, expandColumn: column } = this
    const { row } = params
    const { lazy, trigger } = expandOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    const rowid = getRowid(this, row)
    if (!lazy || !rowExpandLazyLoadedMaps[rowid]) {
      const expanded = !this.isRowExpandByRow(row)
      const columnIndex = this.getColumnIndex(column)
      const $columnIndex = this.getVMColumnIndex(column)
      this.setRowExpand(row, expanded)
      this.emitEvent('toggle-row-expand', { expanded, column, columnIndex, $columnIndex, row, rowIndex: this.getRowIndex(row), $rowIndex: this.getVMRowIndex(row) }, evnt)
    }
  },
  /**
   * 切换展开行
   */
  toggleRowExpand (row: any) {
    return this.setRowExpand(row, !this.isRowExpandByRow(row))
  },
  /**
   * 处理默认展开行
   */
  handleDefaultRowExpand () {
    const { expandOpts, fullDataRowIdData } = this
    const { expandAll, expandRowKeys } = expandOpts
    if (expandAll) {
      this.setAllRowExpand(true)
    } else if (expandRowKeys) {
      const defExpandeds: any[] = []
      expandRowKeys.forEach((rowid: any) => {
        if (fullDataRowIdData[rowid]) {
          defExpandeds.push(fullDataRowIdData[rowid].row)
        }
      })
      this.setRowExpand(defExpandeds, true)
    }
  },
  /**
   * 设置所有行的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllRowExpand (expanded: any) {
    const { treeConfig, treeOpts, tableFullData, tableFullTreeData } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    let expandedRows = []
    if (treeConfig) {
      XEUtils.eachTree(tableFullTreeData, (row) => {
        expandedRows.push(row)
      }, { children: childrenField })
    } else {
      expandedRows = tableFullData
    }
    return this.setRowExpand(expandedRows, expanded)
  },
  handleAsyncRowExpand (row: any) {
    const { fullAllDataRowMap, expandOpts } = this
    const rest = fullAllDataRowMap.get(row)
    return new Promise<void>(resolve => {
      const { loadMethod } = expandOpts
      if (loadMethod) {
        const { rowExpandLazyLoadedMaps } = this
        const rowTempExpandLazyLoadedMaps = { ...rowExpandLazyLoadedMaps }
        const rowid = getRowid(this, row)
        rowTempExpandLazyLoadedMaps[rowid] = row
        this.rowExpandLazyLoadedMaps = rowTempExpandLazyLoadedMaps
        loadMethod({ $table: this, row, rowIndex: this.getRowIndex(row), $rowIndex: this.getVMRowIndex(row) }).then(() => {
          rest.expandLoaded = true
          const { rowExpandedMaps } = this
          const rowTempExpandedMaps = { ...rowExpandedMaps }
          rowTempExpandedMaps[rowid] = row
          this.rowExpandedMaps = rowTempExpandedMaps
        }).catch(() => {
          rest.expandLoaded = false
        }).finally(() => {
          const { rowExpandLazyLoadedMaps } = this
          const rowTempExpandLazyLoadedMaps = { ...rowExpandLazyLoadedMaps }
          if (rowTempExpandLazyLoadedMaps[rowid]) {
            delete rowTempExpandLazyLoadedMaps[rowid]
          }
          this.rowExpandLazyLoadedMaps = rowTempExpandLazyLoadedMaps
          resolve(this.$nextTick().then(this.recalculate))
        })
      } else {
        resolve()
      }
    })
  },
  /**
   * 设置展开行，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setRowExpand (rows: any, expanded: any) {
    const { rowExpandedMaps, fullAllDataRowIdData, rowExpandLazyLoadedMaps, expandOpts, expandColumn: column } = this
    let rExpandedMaps = { ...rowExpandedMaps }
    const { reserve, lazy, accordion, toggleMethod } = expandOpts
    const lazyRests: any[] = []
    const columnIndex = this.getColumnIndex(column)
    const $columnIndex = this.getVMColumnIndex(column)
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (accordion) {
        // 只能同时展开一个
        rExpandedMaps = {}
        rows = rows.slice(rows.length - 1, rows.length)
      }
      const validRows = toggleMethod ? rows.filter((row: any) => toggleMethod({ expanded, column, columnIndex, $columnIndex, row, rowIndex: this.getRowIndex(row), $rowIndex: this.getVMRowIndex(row) })) : rows
      if (expanded) {
        validRows.forEach((row: any) => {
          const rowid = getRowid(this, row)
          if (!rExpandedMaps[rowid]) {
            const rest = fullAllDataRowIdData[rowid]
            const isLoad = lazy && !rest.expandLoaded && !rowExpandLazyLoadedMaps[rowid]
            if (isLoad) {
              lazyRests.push(this.handleAsyncRowExpand(row))
            } else {
              rExpandedMaps[rowid] = row
            }
          }
        })
      } else {
        validRows.forEach((item: any) => {
          const rowid = getRowid(this, item)
          if (rExpandedMaps[rowid]) {
            delete rExpandedMaps[rowid]
          }
        })
      }
      if (reserve) {
        validRows.forEach((row: any) => this.handleRowExpandReserve(row, expanded))
      }
    }
    this.rowExpandedMaps = rExpandedMaps
    return Promise.all(lazyRests).then(this.recalculate)
  },
  /**
   * 判断行是否为展开状态
   * @param {Row} row 行对象
   */
  isRowExpandByRow (row: any) {
    const { rowExpandedMaps } = this
    const rowid = getRowid(this, row)
    return !!rowExpandedMaps[rowid]
  },
  isExpandByRow (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['isExpandByRow', 'isRowExpandByRow'])
    }
    // 即将废弃
    return this.isRowExpandByRow(row)
  },
  /**
   * 手动清空展开行状态，数据会恢复成未展开的状态
   */
  clearRowExpand () {
    const { expandOpts, tableFullData } = this
    const { reserve } = expandOpts
    const expList = this.getRowExpandRecords()
    this.rowExpandedMaps = {}
    if (reserve) {
      tableFullData.forEach((row: any) => this.handleRowExpandReserve(row, false))
    }
    return this.$nextTick().then(() => {
      if (expList.length) {
        this.recalculate()
      }
    })
  },
  clearRowExpandReserve () {
    this.rowExpandedReserveRowMap = {}
    return this.$nextTick()
  },
  handleRowExpandReserve (row: any, expanded: any) {
    const { rowExpandedReserveRowMap, expandOpts } = this
    if (expandOpts.reserve) {
      const rowid = getRowid(this, row)
      if (expanded) {
        rowExpandedReserveRowMap[rowid] = row
      } else if (rowExpandedReserveRowMap[rowid]) {
        delete rowExpandedReserveRowMap[rowid]
      }
    }
  },
  getRowExpandRecords () {
    const rest: any[] = []
    XEUtils.each(this.rowExpandedMaps, item => {
      if (item) {
        rest.push(item)
      }
    })
    return rest
  },
  getTreeExpandRecords () {
    const rest: any[] = []
    XEUtils.each(this.treeExpandedMaps, item => {
      if (item) {
        rest.push(item)
      }
    })
    return rest
  },
  /**
   * 获取树表格状态
   */
  getTreeStatus () {
    if (this.treeConfig) {
      return {
        config: this.treeOpts,
        rowExpandeds: this.getTreeExpandRecords()
      }
    }
    return null
  },
  /**
   * 判断树节点是否懒加载完成
   * @param {Row} row 行对象
   */
  isTreeExpandLoaded (row: any) {
    const rest = this.fullAllDataRowMap.get(row)
    return rest && rest.treeLoaded
  },
  clearTreeExpandLoaded (row: any) {
    const { treeOpts, treeExpandedMaps, fullAllDataRowMap } = this
    const { transform, lazy } = treeOpts
    const rowid = getRowid(this, row)
    const rest = fullAllDataRowMap.get(row)
    if (lazy && rest) {
      rest.treeLoaded = false
      if (treeExpandedMaps[rowid]) {
        delete treeExpandedMaps[rowid]
      }
    }
    if (transform) {
      this.handleVirtualTreeToList()
      return this.handleTableData()
    }
    return this.$nextTick()
  },
  /**
   * 重新懒加载树节点，并展开该节点
   * @param {Row} row 行对象
   */
  reloadTreeExpand (row: any) {
    const { treeOpts, treeExpandLazyLoadedMaps } = this
    const { transform, lazy } = treeOpts
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const rowid = getRowid(this, row)
    if (lazy && row[hasChildField] && !treeExpandLazyLoadedMaps[rowid]) {
      this.clearTreeExpandLoaded(row).then(() => {
        return this.handleAsyncTreeExpandChilds(row)
      }).then(() => {
        if (transform) {
          this.handleVirtualTreeToList()
          return this.handleTableData()
        }
      }).then(() => {
        return this.recalculate()
      })
    }
    return this.$nextTick()
  },
  reloadTreeChilds (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['reloadTreeChilds', 'reloadTreeExpand'])
    }
    // 即将废弃
    return this.reloadTreeExpand(row)
  },
  /**
   * 展开树节点事件
   */
  triggerTreeExpandEvent (evnt: any, params: any) {
    const { treeOpts, treeExpandLazyLoadedMaps } = this
    const { row, column } = params
    const { lazy, trigger } = treeOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    const rowid = getRowid(this, row)
    if (!lazy || !treeExpandLazyLoadedMaps[rowid]) {
      const expanded = !this.isTreeExpandByRow(row)
      const columnIndex = this.getColumnIndex(column)
      const $columnIndex = this.getVMColumnIndex(column)
      this.setTreeExpand(row, expanded)
      this.emitEvent('toggle-tree-expand', { expanded, column, columnIndex, $columnIndex, row }, evnt)
    }
  },
  /**
   * 切换/展开树节点
   */
  toggleTreeExpand (row: any) {
    return this.setTreeExpand(row, !this.isTreeExpandByRow(row))
  },
  /**
   * 处理默认展开树节点
   */
  handleDefaultTreeExpand () {
    const { treeConfig, treeOpts, tableFullData } = this
    if (treeConfig) {
      const { expandAll, expandRowKeys } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      if (expandAll) {
        this.setAllTreeExpand(true)
      } else if (expandRowKeys) {
        const defExpandeds: any[] = []
        const rowkey = getRowkey(this)
        expandRowKeys.forEach((rowid: any) => {
          const matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), { children: childrenField })
          if (matchObj) {
            defExpandeds.push(matchObj.item)
          }
        })
        this.setTreeExpand(defExpandeds, true)
      }
    }
  },
  handleAsyncTreeExpandChilds (row: any) {
    const { treeOpts, checkboxOpts } = this
    const { transform, loadMethod } = treeOpts
    const { checkStrictly } = checkboxOpts
    return new Promise<void>(resolve => {
      if (loadMethod) {
        const { fullAllDataRowMap, treeExpandLazyLoadedMaps } = this
        const rowid = getRowid(this, row)
        const rest = fullAllDataRowMap.get(row)
        treeExpandLazyLoadedMaps[rowid] = row
        loadMethod({ $table: this, row }).then((childRecords: any) => {
          // 响应成功后则展开行，并将子节点挂载到该节点下
          rest.treeLoaded = true
          if (treeExpandLazyLoadedMaps[rowid]) {
            treeExpandLazyLoadedMaps[rowid] = null
          }
          if (!XEUtils.isArray(childRecords)) {
            childRecords = []
          }
          if (childRecords) {
            return this.loadTreeChildren(row, childRecords).then((childRows: any) => {
              const { treeExpandedMaps } = this
              const treeTempExpandedMaps = { ...treeExpandedMaps }
              if (childRows.length && !treeTempExpandedMaps[rowid]) {
                treeTempExpandedMaps[rowid] = row
                this.treeExpandedMaps = treeTempExpandedMaps
              }
              // 如果当前节点已选中，则展开后子节点也被选中
              if (!checkStrictly && this.isCheckedByCheckboxRow(row)) {
                this.handleCheckedCheckboxRow(childRows, true, true)
              }
              return this.$nextTick().then(() => {
                if (transform) {
                  return this.handleTableData()
                }
              })
            })
          }
        }).catch(() => {
        // 如果响应异常，则不展开，再次点击后将重新触发懒加载
          rest.treeLoaded = false
          const { treeExpandLazyLoadedMaps } = this
          if (treeExpandLazyLoadedMaps[rowid]) {
            treeExpandLazyLoadedMaps[rowid] = null
          }
        }).finally(() => {
          this.$nextTick().then(() => this.recalculate()).then(() => resolve())
        })
      } else {
        resolve()
      }
    })
  },
  /**
   * 设置所有树节点的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllTreeExpand (expanded: any) {
    const { tableFullData, treeOpts } = this
    const { lazy } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const expandeds: any[] = []
    XEUtils.eachTree(tableFullData, (row: any) => {
      const rowChildren = row[childrenField]
      if (lazy || (rowChildren && rowChildren.length)) {
        expandeds.push(row)
      }
    }, { children: childrenField })
    return this.setTreeExpand(expandeds, expanded)
  },
  /**
   * 默认，展开与收起树节点
   * @param rows
   * @param expanded
   * @returns
   */
  handleBaseTreeExpand (rows: any, expanded: any) {
    const { fullAllDataRowMap, tableFullData, treeExpandedMaps, treeOpts, treeExpandLazyLoadedMaps, treeNodeColumn } = this
    const { reserve, lazy, accordion, toggleMethod } = treeOpts
    const treeTempExpandedMaps = { ...treeExpandedMaps }
    const childrenField = treeOpts.children || treeOpts.childrenField
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const result: any[] = []
    const columnIndex = this.getColumnIndex(treeNodeColumn)
    const $columnIndex = this.getVMColumnIndex(treeNodeColumn)
    let validRows = toggleMethod ? rows.filter((row: any) => toggleMethod({ expanded, column: treeNodeColumn, columnIndex, $columnIndex, row })) : rows
    if (accordion) {
      validRows = validRows.length ? [validRows[validRows.length - 1]] : []
      // 同一级只能展开一个
      const matchObj = XEUtils.findTree(tableFullData, item => item === validRows[0], { children: childrenField })
      if (matchObj) {
        matchObj.items.forEach(item => {
          const rowid = getRowid(this, item)
          if (treeTempExpandedMaps[rowid]) {
            delete treeTempExpandedMaps[rowid]
          }
        })
      }
    }
    if (expanded) {
      validRows.forEach((row: any) => {
        const rowid = getRowid(this, row)
        if (!treeTempExpandedMaps[rowid]) {
          const rest = fullAllDataRowMap.get(row)
          const isLoad = lazy && row[hasChildField] && !rest.treeLoaded && !treeExpandLazyLoadedMaps[rowid]
          // 是否使用懒加载
          if (isLoad) {
            result.push(this.handleAsyncTreeExpandChilds(row))
          } else {
            if (row[childrenField] && row[childrenField].length) {
              treeTempExpandedMaps[rowid] = row
            }
          }
        }
      })
    } else {
      validRows.forEach((item: any) => {
        const rowid = getRowid(this, item)
        if (treeTempExpandedMaps[rowid]) {
          delete treeTempExpandedMaps[rowid]
        }
      })
    }
    if (reserve) {
      validRows.forEach((row: any) => this.handleTreeExpandReserve(row, expanded))
    }
    this.treeExpandedMaps = treeTempExpandedMaps
    return Promise.all(result).then(this.recalculate)
  },
  /**
   * 虚拟树的展开与收起
   * @param rows
   * @param expanded
   * @returns
   */
  handleVirtualTreeExpand (rows: any, expanded: any) {
    return this.handleBaseTreeExpand(rows, expanded).then(() => {
      this.handleVirtualTreeToList()
      return this.handleTableData()
    }).then(() => {
      return this.recalculate()
    })
  },
  /**
   * 设置展开树形节点，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setTreeExpand (rows: any, expanded: any) {
    const { treeOpts } = this
    const { transform } = treeOpts
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (rows.length) {
        // 如果为虚拟树
        if (transform) {
          return this.handleVirtualTreeExpand(rows, expanded)
        } else {
          return this.handleBaseTreeExpand(rows, expanded)
        }
      }
    }
    return this.$nextTick()
  },
  /**
   * 判断行是否为树形节点展开状态
   * @param {Row} row 行对象
   */
  isTreeExpandByRow (row: any) {
    const { treeExpandedMaps } = this
    return !!treeExpandedMaps[getRowid(this, row)]
  },
  /**
   * 手动清空树形节点的展开状态，数据会恢复成未展开的状态
   */
  clearTreeExpand () {
    const { treeOpts, tableFullData } = this
    const { transform, reserve } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const expList = this.getTreeExpandRecords()
    this.treeExpandedMaps = {}
    if (reserve) {
      XEUtils.eachTree(tableFullData, row => this.handleTreeExpandReserve(row, false), { children: childrenField })
    }
    return this.handleTableData().then(() => {
      if (transform) {
        this.handleVirtualTreeToList()
        return this.handleTableData()
      }
    }).then(() => {
      if (expList.length) {
        this.recalculate()
      }
    })
  },
  clearTreeExpandReserve () {
    this.treeExpandedReserveRowMap = {}
    return this.$nextTick()
  },
  handleTreeExpandReserve (row: any, expanded: any) {
    const { treeExpandedReserveRowMap, treeOpts } = this
    if (treeOpts.reserve) {
      const rowid = getRowid(this, row)
      if (expanded) {
        treeExpandedReserveRowMap[rowid] = row
      } else if (treeExpandedReserveRowMap[rowid]) {
        delete treeExpandedReserveRowMap[rowid]
      }
    }
  },
  /**
   * 获取表格的滚动状态
   */
  getScroll () {
    const { $refs, scrollXLoad, scrollYLoad } = this
    const bodyElem = $refs.tableBody.$el
    return {
      virtualX: scrollXLoad,
      virtualY: scrollYLoad,
      scrollTop: bodyElem.scrollTop,
      scrollLeft: bodyElem.scrollLeft
    }
  },
  /**
   * 横向 X 可视渲染事件处理
   */
  triggerScrollXEvent () {
    this.loadScrollXData()
  },
  loadScrollXData () {
    const { mergeList, mergeFooterList, scrollXStore } = this
    const { startIndex, endIndex, offsetSize } = scrollXStore
    const { toVisibleIndex, visibleSize } = computeVirtualX(this)
    const offsetItem = {
      startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize),
      endIndex: toVisibleIndex + visibleSize + offsetSize
    }
    calculateMergerOffserIndex(mergeList.concat(mergeFooterList), offsetItem, 'col')
    const { startIndex: offsetStartIndex, endIndex: offsetEndIndex } = offsetItem
    if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
      if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
        scrollXStore.startIndex = offsetStartIndex
        scrollXStore.endIndex = offsetEndIndex
        this.updateScrollXData()
      }
    }
    this.closeTooltip()
  },
  /**
   * 纵向 Y 可视渲染事件处理
   */
  triggerScrollYEvent (evnt: any) {
    const { scrollYStore } = this
    const { adaptive, offsetSize, visibleSize } = scrollYStore
    // webkit 浏览器使用最佳的渲染方式，且最高渲染量不能大于 40 条
    if (isWebkit && adaptive && (offsetSize * 2 + visibleSize) <= 40) {
      this.loadScrollYData(evnt)
    } else {
      this.debounceScrollY(evnt)
    }
  },
  debounceScrollY: XEUtils.debounce(function (this: any, evnt) {
    this.loadScrollYData(evnt)
  }, debounceScrollYDuration, { leading: false, trailing: true }),
  /**
   * 纵向 Y 可视渲染处理
   */
  loadScrollYData (evnt: any) {
    const { mergeList, scrollYStore } = this
    const { startIndex, endIndex, visibleSize, offsetSize, rowHeight } = scrollYStore
    const scrollBodyElem = evnt.currentTarget || evnt.target
    const scrollTop = scrollBodyElem.scrollTop
    const toVisibleIndex = Math.floor(scrollTop / rowHeight)
    const offsetItem = {
      startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize),
      endIndex: toVisibleIndex + visibleSize + offsetSize
    }
    calculateMergerOffserIndex(mergeList, offsetItem, 'row')
    const { startIndex: offsetStartIndex, endIndex: offsetEndIndex } = offsetItem
    if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
      if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
        scrollYStore.startIndex = offsetStartIndex
        scrollYStore.endIndex = offsetEndIndex
        this.updateScrollYData()
      }
    }
  },
  // 计算可视渲染相关数据
  computeScrollLoad () {
    return this.$nextTick().then(() => {
      const { sYOpts, sXOpts, scrollXLoad, scrollYLoad, scrollXStore, scrollYStore } = this
      // 计算 X 逻辑
      if (scrollXLoad) {
        const { visibleSize: visibleXSize } = computeVirtualX(this)
        const offsetXSize = sXOpts.oSize ? XEUtils.toNumber(sXOpts.oSize) : browse.msie ? 10 : (browse.edge ? 5 : 0)
        scrollXStore.offsetSize = offsetXSize
        scrollXStore.visibleSize = visibleXSize
        scrollXStore.endIndex = Math.max(scrollXStore.startIndex + scrollXStore.visibleSize + offsetXSize, scrollXStore.endIndex)
        this.updateScrollXData()
      } else {
        this.updateScrollXSpace()
      }
      // 计算 Y 逻辑
      const { rowHeight, visibleSize: visibleYSize } = computeVirtualY(this)
      scrollYStore.rowHeight = rowHeight
      if (scrollYLoad) {
        const offsetYSize = sYOpts.oSize ? XEUtils.toNumber(sYOpts.oSize) : browse.msie ? 20 : (browse.edge ? 10 : 0)
        scrollYStore.offsetSize = offsetYSize
        scrollYStore.visibleSize = visibleYSize
        scrollYStore.endIndex = Math.max(scrollYStore.startIndex + visibleYSize + offsetYSize, scrollYStore.endIndex)
        this.updateScrollYData()
      } else {
        this.updateScrollYSpace()
      }
      this.rowHeight = rowHeight
      this.$nextTick(this.updateStyle)
    })
  },
  handleTableColumn () {
    const { scrollXLoad, visibleColumn, scrollXStore } = this
    this.tableColumn = scrollXLoad ? visibleColumn.slice(scrollXStore.startIndex, scrollXStore.endIndex) : visibleColumn.slice(0)
  },
  updateScrollXData () {
    // this.tableColumn = []
    this.$nextTick(() => {
      this.handleTableColumn()
      this.updateScrollXSpace()
    })
  },
  // 更新横向 X 可视渲染上下剩余空间大小
  updateScrollXSpace () {
    const { $refs, isGroup, elemStore, visibleColumn, scrollXStore, scrollXLoad, tableWidth, scrollbarWidth } = this
    const { tableHeader, tableBody, tableFooter } = $refs
    const tableBodyElem = tableBody ? tableBody.$el : null
    if (tableBodyElem) {
      const tableHeaderElem = tableHeader ? tableHeader.$el : null
      const tableFooterElem = tableFooter ? tableFooter.$el : null
      const headerElem = tableHeaderElem ? tableHeaderElem.querySelector('.vxe-table--header') : null
      const bodyElem = tableBodyElem.querySelector('.vxe-table--body')
      const footerElem = tableFooterElem ? tableFooterElem.querySelector('.vxe-table--footer') : null
      const leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous: any, column: any) => previous + column.renderWidth, 0)
      let marginLeft = ''
      if (scrollXLoad) {
        marginLeft = `${leftSpaceWidth}px`
      }
      if (headerElem) {
        headerElem.style.marginLeft = isGroup ? '' : marginLeft
      }
      bodyElem.style.marginLeft = marginLeft
      if (footerElem) {
        footerElem.style.marginLeft = marginLeft
      }
      const containerList = ['main']
      containerList.forEach(name => {
        const layoutList = ['header', 'body', 'footer']
        layoutList.forEach(layout => {
          const xSpaceElem = elemStore[`${name}-${layout}-xSpace`]
          if (xSpaceElem) {
            xSpaceElem.style.width = scrollXLoad ? `${tableWidth + (layout === 'header' ? scrollbarWidth : 0)}px` : ''
          }
        })
      })
      this.$nextTick(this.updateStyle)
    }
  },
  updateScrollYData () {
    // this.tableData = []
    this.$nextTick(() => {
      this.handleTableData()
      this.updateScrollYSpace()
    })
  },
  // 更新纵向 Y 可视渲染上下剩余空间大小
  updateScrollYSpace () {
    const { elemStore, scrollYStore, scrollYLoad, afterFullData } = this
    const { startIndex, rowHeight } = scrollYStore
    const bodyHeight = afterFullData.length * rowHeight
    const topSpaceHeight = Math.max(0, startIndex * rowHeight)
    const containerList = ['main', 'left', 'right']
    let marginTop = ''
    let ySpaceHeight = ''
    if (scrollYLoad) {
      marginTop = `${topSpaceHeight}px`
      ySpaceHeight = `${bodyHeight}px`
    }
    containerList.forEach(name => {
      const layoutList = ['header', 'body', 'footer']
      const tableElem = elemStore[`${name}-body-table`]
      if (tableElem) {
        tableElem.style.marginTop = marginTop
      }
      layoutList.forEach(layout => {
        const ySpaceElem = elemStore[`${name}-${layout}-ySpace`]
        if (ySpaceElem) {
          ySpaceElem.style.height = ySpaceHeight
        }
      })
    })
    this.$nextTick(this.updateStyle)
  },
  /**
   * 如果有滚动条，则滚动到对应的位置
   * @param {Number} scrollLeft 左距离
   * @param {Number} scrollTop 上距离
   */
  scrollTo (scrollLeft: any, scrollTop: any) {
    const { $refs } = this
    const { tableBody, rightBody, tableFooter } = $refs
    const tableBodyElem = tableBody ? tableBody.$el : null
    const rightBodyElem = rightBody ? rightBody.$el : null
    const tableFooterElem = tableFooter ? tableFooter.$el : null
    if (XEUtils.isNumber(scrollLeft)) {
      setScrollLeft(tableFooterElem || tableBodyElem, scrollLeft)
    }
    if (XEUtils.isNumber(scrollTop)) {
      setScrollTop(rightBodyElem || tableBodyElem, scrollTop)
    }
    if (this.scrollXLoad || this.scrollYLoad) {
      return new Promise(resolve => setTimeout(() => resolve(this.$nextTick()), 50))
    }
    return this.$nextTick()
  },
  /**
   * 如果有滚动条，则滚动到对应的行
   * @param {Row} row 行对象
   * @param {ColumnInfo} column 列配置
   */
  scrollToRow (row: any, fieldOrColumn: any) {
    const rest = []
    if (row) {
      if (this.treeConfig) {
        rest.push(this.scrollToTreeRow(row))
      } else {
        rest.push(rowToVisible(this, row))
      }
    }
    if (fieldOrColumn) {
      rest.push(this.scrollToColumn(fieldOrColumn))
    }
    return Promise.all(rest)
  },
  /**
   * 如果有滚动条，则滚动到对应的列
   * @param {ColumnInfo} column 列配置
   */
  scrollToColumn (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column && this.fullColumnMap.has(column)) {
      return colToVisible(this, column)
    }
    return this.$nextTick()
  },
  /**
   * 对于树形结构中，可以直接滚动到指定深层节点中
   * 对于某些特定的场景可能会用到，比如定位到某一节点
   * @param {Row} row 行对象
   */
  scrollToTreeRow (row: any) {
    const { tableFullData, treeConfig, treeOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const rests: any[] = []
    if (treeConfig) {
      const matchObj = XEUtils.findTree(tableFullData, item => item === row, { children: childrenField })
      if (matchObj) {
        const nodes = matchObj.nodes
        nodes.forEach((row, index) => {
          if (index < nodes.length - 1 && !this.isTreeExpandByRow(row)) {
            rests.push(this.setTreeExpand(row, true))
          }
        })
      }
    }
    return Promise.all(rests).then(() => rowToVisible(this, row))
  },
  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll () {
    const { $refs, scrollXStore, scrollYStore } = this
    const { tableBody, rightBody, tableFooter } = $refs
    const tableBodyElem = tableBody ? tableBody.$el : null
    const rightBodyElem = rightBody ? rightBody.$el : null
    const tableFooterElem = tableFooter ? tableFooter.$el : null
    if (rightBodyElem) {
      restoreScrollListener(rightBodyElem)
      rightBodyElem.scrollTop = 0
    }
    if (tableFooterElem) {
      tableFooterElem.scrollLeft = 0
    }
    if (tableBodyElem) {
      restoreScrollListener(tableBodyElem)
      tableBodyElem.scrollTop = 0
      tableBodyElem.scrollLeft = 0
    }
    scrollXStore.startIndex = 0
    scrollXStore.endIndex = scrollXStore.visibleSize
    scrollYStore.startIndex = 0
    scrollYStore.endIndex = scrollYStore.visibleSize
    return this.$nextTick()
  },
  /**
   * 更新表尾合计
   */
  updateFooter () {
    const { showFooter, visibleColumn, footerData, footerMethod } = this
    let footData = []
    if (showFooter && footerData && footerData.length) {
      footData = footerData.slice(0)
    } else if (showFooter && footerMethod) {
      footData = visibleColumn.length ? footerMethod({ columns: visibleColumn, data: this.afterFullData, $table: this, $grid: this.$xegrid }) : []
    }
    this.footerTableData = footData
    return this.$nextTick()
  },
  /**
   * 更新列状态 updateStatus({ row, column }, cellValue)
   * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
   * 如果单元格配置了校验规则，则会进行校验
   */
  updateStatus (slotParams: any, cellValue: any) {
    const customVal = !XEUtils.isUndefined(cellValue)
    return this.$nextTick().then(() => {
      const { $refs, editRules, validStore } = this
      const tableBody = $refs.tableBody
      if (slotParams && tableBody && editRules) {
        const { row, column } = slotParams
        const type = 'change'
        if (this.hasCellRules) {
          if (this.hasCellRules(type, row, column)) {
            const cell = this.getCellElement(row, column)
            if (cell) {
              return this.validCellRules(type, row, column, cellValue)
                .then(() => {
                  if (customVal && validStore.visible) {
                    setCellValue(row, column, cellValue)
                  }
                  this.clearValidate(row, column)
                })
                .catch(({ rule }: any) => {
                  if (customVal) {
                    setCellValue(row, column, cellValue)
                  }
                  this.showValidTooltip({ rule, row, column, cell })
                })
            }
          }
        }
      }
    })
  },
  handleDefaultMergeCells () {
    this.setMergeCells(this.mergeCells)
  },
  /**
   * 设置合并单元格
   * @param {TableMergeConfig[]} merges { row: Row|number, column: ColumnInfo|number, rowspan: number, colspan: number }
   */
  setMergeCells (merges: any) {
    if (this.spanMethod) {
      errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
    }
    setMerges(this, merges, this.mergeList, this.afterFullData)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      return this.updateStyle()
    })
  },
  /**
   * 移除单元格合并
   * @param {TableMergeConfig[]} merges 多个或数组 [{row:Row|number, col:ColumnInfo|number}]
   */
  removeMergeCells (merges: any) {
    if (this.spanMethod) {
      errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
    }
    const rest = removeMerges(this, merges, this.mergeList, this.afterFullData)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      this.updateStyle()
      return rest
    })
  },
  /**
   * 获取所有被合并的单元格
   */
  getMergeCells () {
    return this.mergeList.slice(0)
  },
  /**
   * 清除所有单元格合并
   */
  clearMergeCells () {
    this.mergeList = []
    return this.$nextTick().then(() => {
      return this.updateStyle()
    })
  },
  handleDefaultMergeFooterItems () {
    this.setMergeFooterItems(this.mergeFooterItems)
  },
  setMergeFooterItems (merges: any) {
    if (this.footerSpanMethod) {
      errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
    }
    setMerges(this, merges, this.mergeFooterList, null)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      return this.updateStyle()
    })
  },
  removeMergeFooterItems (merges: any) {
    if (this.footerSpanMethod) {
      errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
    }
    const rest = removeMerges(this, merges, this.mergeFooterList, null)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      this.updateStyle()
      return rest
    })
  },
  /**
   * 获取所有被合并的表尾
   */
  getMergeFooterItems () {
    return this.mergeFooterList.slice(0)
  },
  /**
   * 清除所有表尾合并
   */
  clearMergeFooterItems () {
    this.mergeFooterList = []
    return this.$nextTick().then(() => {
      return this.updateStyle()
    })
  },
  updateZindex () {
    if (this.zIndex) {
      this.tZindex = this.zIndex
    } else if (this.tZindex < getLastZIndex()) {
      this.tZindex = nextZIndex()
    }
  },
  updateCellAreas () {
    if (this.mouseConfig && this.mouseOpts.area && this.handleUpdateCellAreas) {
      return this.handleUpdateCellAreas()
    }
    return this.$nextTick()
  },
  emitEvent (type: any, params: any, evnt: any) {
    this.$emit(type, Object.assign({ $table: this, $grid: this.$xegrid, $event: evnt }, params))
  },
  focus () {
    this.isActivated = true
    return this.$nextTick()
  },
  blur () {
    this.isActivated = false
    return this.$nextTick()
  },
  // 连接工具栏
  connect ($toolbar: any) {
    if ($toolbar && $toolbar.syncUpdate) {
      $toolbar.syncUpdate({ collectColumn: this.collectColumn, $table: this })
      this.$toolbar = $toolbar
    } else {
      errLog('vxe.error.barUnableLink')
    }
    return this.$nextTick()
  },

  /*************************
   * Publish methods
   *************************/
  /**
   * 已废弃，被 getCellElement 替换
   * @deprecated
   */
  getCell (row: any, column: any) {
    return this.getCellElement(row, column)
  },
  findRowIndexOf (list: any, row: any) {
    return row ? XEUtils.findIndexOf(list, item => this.eqRow(item, row)) : -1
  },
  eqRow (row1: any, row2: any) {
    if (row1 && row2) {
      if (row1 === row2) {
        return true
      }
      return getRowid(this, row1) === getRowid(this, row2)
    }
    return false
  },
  /*************************
   * Publish methods
   *************************/

  getSetupOptions () {
    return getConfig()
  }
} as any

// Module methods
const funcs = 'setFilter,openFilter,clearFilter,getCheckedFilters,updateFilterOptionStatus,closeMenu,setActiveCellArea,getActiveCellArea,getCellAreas,clearCellAreas,copyCellArea,cutCellArea,pasteCellArea,getCopyCellArea,getCopyCellAreas,clearCopyCellArea,setCellAreas,openFNR,openFind,openReplace,closeFNR,getSelectedCell,clearSelected,insert,insertAt,insertNextAt,remove,removeCheckboxRow,removeRadioRow,removeCurrentRow,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearEdit,clearActived,getEditRecord,getActiveRecord,isEditByRow,isActiveByRow,setEditRow,setActiveRow,setEditCell,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,openExport,openPrint,getPrintHtml,exportData,openImport,importData,saveFile,readFile,importByFile,print,openCustom,closeCustom'.split(',')

funcs.forEach(name => {
  Methods[name] = function (...args: any[]) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      if (!this[`_${name}`]) {
        if ('openExport,openPrint,exportData,openImport,importData,saveFile,readFile,importByFile,print'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableExportModule'])
        } else if ('fullValidate,validate'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableValidatorModule'])
        } else if ('setFilter,openFilter,clearFilter,getCheckedFilters'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableFilterModule'])
        } else if ('insert,insertAt,insertNextAt,remove,removeCheckboxRow,removeRadioRow,removeCurrentRow,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,getEditRecord,getActiveRecord,isEditByRow,isActiveByRow,setEditRow,setActiveRow,setEditCell,setActiveCell'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableEditModule'])
        } else if ('openCustom'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableCustomModule'])
        }
      }
    }
    return this[`_${name}`] ? this[`_${name}`](...args) : null
  }
})

export default Methods
