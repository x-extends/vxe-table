import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import Cell from './cell'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools } from '../../tools'
import { clearTableAllStatus, handleFieldOrColumn, restoreScrollLocation, restoreScrollListener } from './util'
import { eqEmptyValue, isEnableConf } from '../../tools/src/utils'
import { browse, getPaddingTopBottomSize, setScrollTop, setScrollLeft } from '../../tools/src/dom'
import { formats } from '../../v-x-e-table/src/formats'

const { getRowid, getRowkey, setCellValue, hasChildrenList, getColumnList } = UtilTools
const { calcHeight, hasClass, addClass, removeClass, getEventTargetNode } = DomTools

const isWebkit = browse['-webkit'] && !browse.edge
const debounceScrollYDuration = browse.msie ? 80 : 20

const resizableStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_WIDTH'
const visibleStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_VISIBLE'

/**
 * 生成行的唯一主键
 */
function getRowUniqueId () {
  return XEUtils.uniqueId('row_')
}

function eqCellValue (row1, row2, field) {
  const val1 = XEUtils.get(row1, field)
  const val2 = XEUtils.get(row2, field)
  if (eqEmptyValue(val1) && eqEmptyValue(val2)) {
    return true
  }
  if (XEUtils.isString(val1) || XEUtils.isNumber(val1)) {
    /* eslint-disable eqeqeq */
    return val1 == val2
  }
  return XEUtils.isEqual(val1, val2)
}

function getNextSortOrder (_vm, column) {
  const orders = _vm.sortOpts.orders
  const currOrder = column.order || null
  const oIndex = orders.indexOf(currOrder) + 1
  return orders[oIndex < orders.length ? oIndex : 0]
}

function getCustomStorageMap (key) {
  const version = GlobalConfig.version
  const rest = XEUtils.toStringJSON(localStorage.getItem(key))
  return rest && rest._v === version ? rest : { _v: version }
}

function getRecoverRow (_vm, list) {
  const { fullAllDataRowMap } = _vm
  return list.filter(row => fullAllDataRowMap.has(row))
}

function handleReserveRow (_vm, reserveRowMap) {
  const { fullDataRowIdData } = _vm
  const reserveList = []
  XEUtils.each(reserveRowMap, (item, rowid) => {
    if (fullDataRowIdData[rowid] && reserveList.indexOf(fullDataRowIdData[rowid].row) === -1) {
      reserveList.push(fullDataRowIdData[rowid].row)
    }
  })
  return reserveList
}

function computeVirtualX (_vm) {
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

function computeVirtualY (_vm) {
  const { $refs, vSize, rowHeightMaps } = _vm
  const { tableHeader, tableBody } = $refs
  const tableBodyElem = tableBody ? tableBody.$el : null
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

function calculateMergerOffserIndex (list, offsetItem, type) {
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

function setMerges (_vm, merges, mList, rowList) {
  if (merges) {
    const { treeConfig, visibleColumn } = _vm
    if (treeConfig) {
      throw new Error(UtilTools.getLog('vxe.error.noTree', ['merge-footer-items']))
    }
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    merges.forEach(item => {
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

function removeMerges (_vm, merges, mList, rowList) {
  const rest = []
  if (merges) {
    const { treeConfig, visibleColumn } = _vm
    if (treeConfig) {
      throw new Error(UtilTools.getLog('vxe.error.noTree', ['merge-cells']))
    }
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    merges.forEach(item => {
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

function clearAllSort (_vm) {
  _vm.tableFullColumn.forEach((column) => {
    column.order = null
  })
}

function getOrderField (_vm, column) {
  const { sortBy, sortType } = column
  return (row) => {
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
  callSlot (slotFunc, params, h, vNodes) {
    if (slotFunc) {
      const { $xegrid } = this
      if ($xegrid) {
        return $xegrid.callSlot(slotFunc, params, h, vNodes)
      }
      if (XEUtils.isFunction(slotFunc)) {
        return slotFunc.call(this, params, h, vNodes)
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
    const parentPaddingSize = height === 'auto' ? getPaddingTopBottomSize(parentElem) : 0
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
   * 同步 data 数据
   * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   */
  syncData () {
    return this.$nextTick().then(() => {
      this.tableData = []
      return this.$nextTick().then(() => this.loadTableData(this.tableFullData))
    })
  },
  /**
   * 手动处理数据
   * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
   */
  updateData () {
    return this.handleTableData(true).then(this.updateFooter).then(this.recalculate)
  },
  handleTableData (force) {
    const { scrollYLoad, scrollYStore } = this
    const fullData = force ? this.updateAfterFullData() : this.afterFullData
    this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullData.slice(0)
    return this.$nextTick()
  },
  /**
   * 加载表格数据
   * @param {Array} datas 数据
   */
  loadTableData (datas) {
    const { keepSource, treeConfig, treeOpts, editStore, sYOpts, scrollYStore, scrollXStore, lastScrollLeft, lastScrollTop, scrollYLoad: oldScrollYLoad } = this
    if (treeConfig && treeOpts.transform) {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (!treeOpts.rowtKey) {
          UtilTools.error('vxe.error.reqProp', ['table.tree-config.rowtKey'])
        }
        if (!treeOpts.parentKey) {
          UtilTools.error('vxe.error.reqProp', ['table.tree-config.parentKey'])
        }
      }
      datas = XEUtils.toArrayTree(datas, { key: treeOpts.rowtKey, parentKey: treeOpts.parentKey, children: treeOpts.children })
    }
    const tableFullData = datas ? datas.slice(0) : []
    const scrollYLoad = !treeConfig && sYOpts.enabled && sYOpts.gt > -1 && sYOpts.gt < tableFullData.length
    scrollYStore.startIndex = 0
    scrollYStore.endIndex = 1
    scrollXStore.startIndex = 0
    scrollXStore.endIndex = 1
    editStore.insertList = []
    editStore.removeList = []
    // 全量数据
    this.tableFullData = tableFullData
    // 缓存数据
    this.updateCache(true)
    // 原始数据
    this.tableSynchData = datas
    if (keepSource) {
      this.tableSourceData = XEUtils.clone(tableFullData, true)
    }
    this.scrollYLoad = scrollYLoad
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      if (scrollYLoad) {
        if (!(this.height || this.maxHeight)) {
          UtilTools.error('vxe.error.reqProp', ['table.height | table.max-height | table.scroll-y={enabled: false}'])
        }
        if (!this.showOverflow) {
          UtilTools.warn('vxe.error.reqProp', ['table.show-overflow'])
        }
        if (this.spanMethod) {
          UtilTools.warn('vxe.error.scrollErrProp', ['table.span-method'])
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
      // 是否加载了数据
      if (scrollYLoad) {
        scrollYStore.endIndex = scrollYStore.visibleSize
      }
      this.handleReserveStatus()
      this.checkSelectionStatus()
      return new Promise(resolve => {
        this.$nextTick()
          .then(() => this.recalculate())
          .then(() => {
            // 是否变更虚拟滚动
            if (oldScrollYLoad === scrollYLoad) {
              restoreScrollLocation(this, lastScrollLeft, lastScrollTop).then(resolve)
            } else {
              setTimeout(() => restoreScrollLocation(this, lastScrollLeft, lastScrollTop).then(resolve))
            }
          })
      })
    })
  },
  /**
   * 重新加载数据，不会清空表格状态
   * @param {Array} datas 数据
   */
  loadData (datas) {
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
  reloadData (datas) {
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
   * 局部加载行数据并恢复到初始状态
   * 对于行数据需要局部更改的场景中可能会用到
   * @param {Row} row 行对象
   * @param {Object} record 新数据
   * @param {String} field 字段名
   */
  reloadRow (row, record, field) {
    const { keepSource, tableSourceData, tableData } = this
    if (keepSource) {
      const rowIndex = this.getRowIndex(row)
      const oRow = tableSourceData[rowIndex]
      if (oRow && row) {
        if (field) {
          XEUtils.set(oRow, field, XEUtils.get(record || row, field))
        } else {
          if (record) {
            tableSourceData[rowIndex] = record
            XEUtils.clear(row, undefined)
            Object.assign(row, this.defineField(Object.assign({}, record)))
            this.updateCache(true)
          } else {
            XEUtils.destructuring(oRow, XEUtils.clone(row, true))
          }
        }
      }
      this.tableData = tableData.slice(0)
    } else {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        UtilTools.warn('vxe.error.reqProp', ['keep-source'])
      }
    }
    return this.$nextTick()
  },
  /**
   * 加载列配置
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  loadColumn (columns) {
    const collectColumn = XEUtils.mapTree(columns, column => Cell.createColumn(this, column), { children: 'children' })
    return this.handleColumn(collectColumn)
  },
  /**
   * 加载列配置并恢复到初始状态
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  reloadColumn (columns) {
    return this.clearAll().then(() => {
      return this.loadColumn(columns)
    })
  },
  handleColumn (collectColumn) {
    this.collectColumn = collectColumn
    const tableFullColumn = getColumnList(collectColumn)
    this.tableFullColumn = tableFullColumn
    this.cacheColumnMap()
    this.restoreCustomStorage()
    this.parseColumns().then(() => {
      if (this.scrollXLoad) {
        this.loadScrollXData(true)
      }
    })
    this.clearMergeCells()
    this.clearMergeFooterItems()
    this.handleTableData(true)
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      if ((this.scrollXLoad || this.scrollYLoad) && this.expandColumn) {
        UtilTools.warn('vxe.error.scrollErrProp', ['column.type=expand'])
      }
    }
    return this.$nextTick().then(() => {
      if (this.$toolbar) {
        this.$toolbar.syncUpdate({ collectColumn, $table: this })
      }
      return this.recalculate()
    })
  },
  /**
   * 更新数据行的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  updateCache (source) {
    const { treeConfig, treeOpts, tableFullData, fullDataRowMap, fullAllDataRowMap } = this
    let { fullDataRowIdData, fullAllDataRowIdData } = this
    const rowkey = getRowkey(this)
    const isLazy = treeConfig && treeOpts.lazy
    const handleCache = (row, index, items, path, parent) => {
      let rowid = getRowid(this, row)
      if (eqEmptyValue(rowid)) {
        rowid = getRowUniqueId()
        XEUtils.set(row, rowkey, rowid)
      }
      if (isLazy && row[treeOpts.hasChild] && XEUtils.isUndefined(row[treeOpts.children])) {
        row[treeOpts.children] = null
      }
      const rest = { row, rowid, index: treeConfig && parent ? -1 : index, items, parent }
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
      XEUtils.eachTree(tableFullData, handleCache, treeOpts)
    } else {
      tableFullData.forEach(handleCache)
    }
  },
  loadChildren (row, childRecords) {
    return this.createData(childRecords).then((rows) => {
      const { keepSource, tableSourceData, treeOpts, fullDataRowIdData, fullDataRowMap, fullAllDataRowMap, fullAllDataRowIdData } = this
      const { children } = treeOpts
      if (keepSource) {
        const rowid = getRowid(this, row)
        const matchObj = XEUtils.findTree(tableSourceData, (item) => rowid === getRowid(this, item), treeOpts)
        if (matchObj) {
          matchObj.item[children] = XEUtils.clone(rows, true)
        }
      }
      XEUtils.eachTree(rows, (childRow, index, items, path, parent) => {
        const rowid = getRowid(this, childRow)
        const rest = { row: childRow, rowid, index: -1, items, parent }
        fullDataRowIdData[rowid] = rest
        fullDataRowMap.set(childRow, rest)
        fullAllDataRowIdData[rowid] = rest
        fullAllDataRowMap.set(childRow, rest)
      }, treeOpts)
      row[children] = rows
      return rows
    })
  },
  /**
   * 更新数据列的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  cacheColumnMap () {
    const { tableFullColumn, collectColumn, fullColumnMap, showOverflow } = this
    const fullColumnIdData = this.fullColumnIdData = {}
    const fullColumnFieldData = this.fullColumnFieldData = {}
    const isGroup = collectColumn.some(hasChildrenList)
    let isAllOverflow = !!showOverflow
    let expandColumn
    let treeNodeColumn
    let checkboxColumn
    let radioColumn
    let hasFixed
    const handleFunc = (column, index, items, path, parent) => {
      const { id: colid, property, fixed, type, treeNode } = column
      const rest = { column, colid, index, items, parent }
      if (property) {
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          if (fullColumnFieldData[property]) {
            UtilTools.warn('vxe.error.colRepet', ['field', property])
          }
        }
        fullColumnFieldData[property] = rest
      }
      if (!hasFixed && fixed) {
        hasFixed = fixed
      }
      if (treeNode) {
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          if (treeNodeColumn) {
            UtilTools.warn('vxe.error.colRepet', ['tree-node', treeNode])
          }
        }
        if (!treeNodeColumn) {
          treeNodeColumn = column
        }
      } else if (type === 'expand') {
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          if (expandColumn) {
            UtilTools.warn('vxe.error.colRepet', ['type', type])
          }
        }
        if (!expandColumn) {
          expandColumn = column
        }
      }
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (type === 'checkbox') {
          if (checkboxColumn) {
            UtilTools.warn('vxe.error.colRepet', ['type', type])
          }
          if (!checkboxColumn) {
            checkboxColumn = column
          }
        } else if (type === 'radio') {
          if (radioColumn) {
            UtilTools.warn('vxe.error.colRepet', ['type', type])
          }
          if (!radioColumn) {
            radioColumn = column
          }
        }
      }
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (this.showOverflow && column.showOverflow === false) {
          UtilTools.warn('vxe.error.errConflicts', [`table.show-overflow=${this.showOverflow}`, `column.show-overflow=${column.showOverflow}`])
        }
        if (this.showHeaderOverflow && column.showHeaderOverflow === false) {
          UtilTools.warn('vxe.error.errConflicts', [`table.show-header-overflow=${this.showHeaderOverflow}`, `column.show-header-overflow=${column.showHeaderOverflow}`])
        }
        if (this.showFooterOverflow && column.showFooterOverflow === false) {
          UtilTools.warn('vxe.error.errConflicts', [`table.show-footer-overflow=${this.showFooterOverflow}`, `column.show-footer-overflow=${column.showFooterOverflow}`])
        }
      }
      if (isAllOverflow && column.showOverflow === false) {
        isAllOverflow = false
      }
      if (fullColumnIdData[colid]) {
        UtilTools.error('vxe.error.colRepet', ['colId', colid])
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

    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      if (expandColumn && this.mouseOpts.area) {
        UtilTools.error('vxe.error.errConflicts', ['mouse-config.area', 'column.type=expand'])
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
  getRowNode (tr) {
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
  getColumnNode (cell) {
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
   * 根据 row 获取相对于 data 中的索引
   * @param {Row} row 行对象
   */
  getRowIndex (row) {
    return this.fullDataRowMap.has(row) ? this.fullDataRowMap.get(row).index : -1
  },
  /**
   * 根据 row 获取相对于当前数据中的索引
   * @param {Row} row 行对象
   */
  getVTRowIndex (row) {
    return this.afterFullData.indexOf(row)
  },
  // 在 v3 中废弃
  _getRowIndex (row) {
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      UtilTools.warn('vxe.error.delFunc', ['_getRowIndex', 'getVTRowIndex'])
    }
    return this.getVTRowIndex(row)
  },
  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param {Row} row 行对象
   */
  getVMRowIndex (row) {
    return this.tableData.indexOf(row)
  },
  // 在 v3 中废弃
  $getRowIndex (row) {
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      UtilTools.warn('vxe.error.delFunc', ['$getRowIndex', 'getVMRowIndex'])
    }
    return this.getVMRowIndex(row)
  },
  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param {ColumnInfo} column 列配置
   */
  getColumnIndex (column) {
    return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1
  },
  /**
   * 根据 column 获取相对于当前表格列中的索引
   * @param {ColumnInfo} column 列配置
   */
  getVTColumnIndex (column) {
    return this.visibleColumn.indexOf(column)
  },
  // 在 v3 中废弃
  _getColumnIndex (column) {
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      UtilTools.warn('vxe.error.delFunc', ['_getColumnIndex', 'getVTColumnIndex'])
    }
    return this.getVTColumnIndex(column)
  },
  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param {ColumnInfo} column 列配置
   */
  getVMColumnIndex (column) {
    return this.tableColumn.indexOf(column)
  },
  // 在 v3 中废弃
  $getColumnIndex (column) {
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      UtilTools.warn('vxe.error.delFunc', ['$getColumnIndex', 'getVMColumnIndex'])
    }
    return this.getVMColumnIndex(column)
  },
  /**
   * 判断是否为索引列
   * @param {ColumnInfo} column 列配置
   */
  isSeqColumn (column) {
    return column && column.type === 'seq'
  },
  /**
   * 定义行数据中的列属性，如果不存在则定义
   * @param {Row} record 行数据
   */
  defineField (record) {
    const { radioOpts, checkboxOpts, treeConfig, treeOpts, expandOpts } = this
    const rowkey = getRowkey(this)
    this.tableFullColumn.forEach(column => {
      const { property, editRender } = column
      if (property && !XEUtils.has(record, property)) {
        let cellValue = null
        if (editRender) {
          const { defaultValue } = editRender
          if (XEUtils.isFunction(defaultValue)) {
            cellValue = defaultValue({ column })
          } else if (!XEUtils.isUndefined(defaultValue)) {
            cellValue = defaultValue
          }
        }
        XEUtils.set(record, property, cellValue)
      }
    })
    const otherFields = [radioOpts.labelField, checkboxOpts.checkField, checkboxOpts.labelField, expandOpts.labelField]
    otherFields.forEach((key) => {
      if (key && eqEmptyValue(XEUtils.get(record, key))) {
        XEUtils.set(record, key, null)
      }
    })
    if (treeConfig && treeOpts.lazy && XEUtils.isUndefined(record[treeOpts.children])) {
      record[treeOpts.children] = null
    }
    // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数
    if (eqEmptyValue(XEUtils.get(record, rowkey))) {
      XEUtils.set(record, rowkey, getRowUniqueId())
    }
    return record
  },
  /**
   * 创建 data 对象
   * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
   * @param {Array} records 新数据
   */
  createData (records) {
    const { treeConfig, treeOpts } = this
    const handleRrecord = record => this.defineField(Object.assign({}, record))
    const rows = treeConfig ? XEUtils.mapTree(records, handleRrecord, treeOpts) : records.map(handleRrecord)
    return this.$nextTick().then(() => rows)
  },
  /**
   * 创建 Row|Rows 对象
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param {Array/Object} records 新数据
   */
  createRow (records) {
    const isArr = XEUtils.isArray(records)
    if (!isArr) {
      records = [records]
    }
    return this.$nextTick().then(() => this.createData(records).then(rows => isArr ? rows : rows[0]))
  },
  /**
   * 还原数据
   * 如果不传任何参数，则还原整个表格
   * 如果传 row 则还原一行
   * 如果传 rows 则还原多行
   * 如果还额外传了 field 则还原指定的单元格数据
   */
  revertData (rows, field) {
    const { keepSource, tableSourceData, treeConfig } = this
    if (!keepSource) {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        UtilTools.warn('vxe.error.reqProp', ['keep-source'])
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
      targetRows.forEach(row => {
        if (!this.isInsertByRow(row)) {
          const rowIndex = this.getRowIndex(row)
          if (treeConfig && rowIndex === -1) {
            throw new Error(UtilTools.getLog('vxe.error.noTree', ['revertData']))
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
  clearData (rows, field) {
    const { tableFullData, visibleColumn } = this
    if (!arguments.length) {
      rows = tableFullData
    } else if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    if (field) {
      rows.forEach(row => XEUtils.set(row, field, null))
    } else {
      rows.forEach(row => {
        visibleColumn.forEach(column => {
          if (column.property) {
            setCellValue(row, column, null)
          }
        })
      })
    }
    return this.$nextTick()
  },
  /**
   * 检查是否为临时行数据
   * @param {Row} row 行对象
   */
  isInsertByRow (row) {
    return this.editStore.insertList.indexOf(row) > -1
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
  isUpdateByRow (row, field) {
    const { visibleColumn, keepSource, treeConfig, treeOpts, tableSourceData, fullDataRowIdData } = this
    if (keepSource) {
      let oRow, property
      const rowid = getRowid(this, row)
      // 新增的数据不需要检测
      if (!fullDataRowIdData[rowid]) {
        return false
      }
      if (treeConfig) {
        const children = treeOpts.children
        const matchObj = XEUtils.findTree(tableSourceData, item => rowid === getRowid(this, item), treeOpts)
        row = Object.assign({}, row, { [children]: null })
        if (matchObj) {
          oRow = Object.assign({}, matchObj.item, { [children]: null })
        }
      } else {
        const oRowIndex = fullDataRowIdData[rowid].index
        oRow = tableSourceData[oRowIndex]
      }
      if (oRow) {
        if (arguments.length > 1) {
          return !eqCellValue(oRow, row, field)
        }
        for (let index = 0, len = visibleColumn.length; index < len; index++) {
          property = visibleColumn[index].property
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
  getColumns (columnIndex) {
    const columns = this.visibleColumn
    return XEUtils.isUndefined(columnIndex) ? columns.slice(0) : columns[columnIndex]
  },
  /**
   * 根据列的唯一主键获取列
   * @param {String} colid 列主键
   */
  getColumnById (colid) {
    const fullColumnIdData = this.fullColumnIdData
    return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null
  },
  /**
   * 根据列的字段名获取列
   * @param {String} field 字段名
   */
  getColumnByField (field) {
    const fullColumnFieldData = this.fullColumnFieldData
    return fullColumnFieldData[field] ? fullColumnFieldData[field].column : null
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
  getData (rowIndex) {
    const tableSynchData = this.data || this.tableSynchData
    return XEUtils.isUndefined(rowIndex) ? tableSynchData.slice(0) : tableSynchData[rowIndex]
  },
  /**
   * 用于多选行，获取已选中的数据
   */
  getCheckboxRecords (isFull) {
    const { tableFullData, afterFullData, treeConfig, treeOpts, checkboxOpts } = this
    const { checkField: property } = checkboxOpts
    const currTableData = isFull ? tableFullData : afterFullData
    let rowList = []
    if (property) {
      if (treeConfig) {
        rowList = XEUtils.filterTree(currTableData, row => XEUtils.get(row, property), treeOpts)
      } else {
        rowList = currTableData.filter(row => XEUtils.get(row, property))
      }
    } else {
      const { selection } = this
      if (treeConfig) {
        rowList = XEUtils.filterTree(currTableData, row => selection.indexOf(row) > -1, treeOpts)
      } else {
        rowList = currTableData.filter(row => selection.indexOf(row) > -1)
      }
    }
    return rowList
  },
  /**
   * 获取处理后全量的表格数据
   * 如果存在筛选条件，继续处理
   */
  updateAfterFullData () {
    const { tableFullColumn, tableFullData, filterOpts, sortOpts } = this
    const { remote: allRemoteFilter, filterMethod: allFilterMethod } = filterOpts
    const { remote: allRemoteSort, sortMethod: allSortMethod, multiple: sortMultiple } = sortOpts
    let tableData = tableFullData.slice(0)
    const filterColumns = []
    const orderColumns = []
    tableFullColumn.forEach(column => {
      const { sortable, order, filters } = column
      if (!allRemoteFilter && filters && filters.length) {
        const valueList = []
        const itemList = []
        filters.forEach((item) => {
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
        orderColumns.push({ column, property: column.property, order })
      }
    })
    if (filterColumns.length) {
      tableData = tableData.filter(row => {
        return filterColumns.every(({ column, valueList, itemList }) => {
          if (valueList.length && !allRemoteFilter) {
            const { filterMethod, filterRender } = column
            const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
            const compFilterMethod = compConf && compConf.renderFilter ? compConf.filterMethod : null
            const defaultFilterMethod = compConf ? compConf.defaultFilterMethod : null
            const cellValue = UtilTools.getCellValue(row, column)
            if (filterMethod) {
              return itemList.some((item) => filterMethod({ value: item.value, option: item, cellValue, row, column, $table: this }))
            } else if (compFilterMethod) {
              return itemList.some((item) => compFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: this }))
            } else if (allFilterMethod) {
              return allFilterMethod({ options: itemList, values: valueList, cellValue, row, column })
            } else if (defaultFilterMethod) {
              return itemList.some((item) => defaultFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: this }))
            }
            return valueList.indexOf(XEUtils.get(row, column.property)) > -1
          }
          return true
        })
      })
    }
    const firstOrderColumn = orderColumns[0]
    if (!allRemoteSort && firstOrderColumn) {
      if (allSortMethod) {
        const sortRests = allSortMethod({ data: tableData, column: firstOrderColumn.column, property: firstOrderColumn.property, order: firstOrderColumn.order, sortList: orderColumns, $table: this })
        tableData = XEUtils.isArray(sortRests) ? sortRests : tableData
      } else {
        // 兼容 v4
        if (sortMultiple) {
          tableData = XEUtils.orderBy(tableData, orderColumns.map(({ column, order }) => [getOrderField(this, column), order]))
        } else {
          // 兼容 v2，在 v4 中废弃， sortBy 不能为数组
          let sortByConfs
          if (XEUtils.isArray(firstOrderColumn.sortBy)) {
            sortByConfs = firstOrderColumn.sortBy.map(item => [item, firstOrderColumn.order])
          }
          tableData = XEUtils.orderBy(tableData, sortByConfs || [firstOrderColumn].map(({ column, order }) => [getOrderField(this, column), order]))
        }
      }
    }
    this.afterFullData = tableData
    return tableData
  },
  /**
   * 根据行的唯一主键获取行
   * @param {String/Number} rowid 行主键
   */
  getRowById (rowid) {
    const fullDataRowIdData = this.fullDataRowIdData
    return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null
  },
  /**
   * 根据行获取行的唯一主键
   * @param {Row} row 行对象
   */
  getRowid (row) {
    const fullAllDataRowMap = this.fullAllDataRowMap
    return fullAllDataRowMap.has(row) ? fullAllDataRowMap.get(row).rowid : null
  },
  /**
   * 获取处理后的表格数据
   * 如果存在筛选条件，继续处理
   * 如果存在排序，继续处理
   */
  getTableData () {
    const { tableFullData, afterFullData, tableData, footerTableData } = this
    return {
      fullData: tableFullData.slice(0),
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
   * 隐藏指定列
   */
  hideColumn (fieldOrColumn) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      column.visible = false
    }
    return this.handleCustom()
  },
  /**
   * 显示指定列
   */
  showColumn (fieldOrColumn) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      column.visible = true
    }
    return this.handleCustom()
  },
  /**
   * 手动重置列的显示隐藏、列宽拖动的状态；
   * 如果为 true 则重置所有状态
   * 如果已关联工具栏，则会同步更新
   */
  resetColumn (options) {
    const { customOpts } = this
    const { checkMethod } = customOpts
    const opts = Object.assign({ visible: true, resizable: options === true }, options)
    this.tableFullColumn.forEach(column => {
      if (opts.resizable) {
        column.resizeWidth = 0
      }
      if (!checkMethod || checkMethod({ column })) {
        column.visible = column.defaultVisible
      }
    })
    if (opts.resizable) {
      this.saveCustomResizable(true)
    }
    return this.handleCustom()
  },
  handleCustom () {
    this.saveCustomVisible()
    this.analyColumnWidth()
    return this.refreshColumn()
  },
  /**
   * 还原自定义列操作状态
   */
  restoreCustomStorage () {
    const { id, collectColumn, customConfig, customOpts } = this
    const { storage } = customOpts
    const isAllStorage = customOpts.storage === true
    const isResizable = isAllStorage || (storage && storage.resizable)
    const isVisible = isAllStorage || (storage && storage.visible)
    if (customConfig && (isResizable || isVisible)) {
      const customMap = {}
      if (!id) {
        UtilTools.error('vxe.error.reqProp', ['id'])
        return
      }
      if (isResizable) {
        const columnWidthStorage = getCustomStorageMap(resizableStorageKey)[id]
        if (columnWidthStorage) {
          XEUtils.each(columnWidthStorage, (resizeWidth, field) => {
            customMap[field] = { field, resizeWidth }
          })
        }
      }
      if (isVisible) {
        const columnVisibleStorage = getCustomStorageMap(visibleStorageKey)[id]
        if (columnVisibleStorage) {
          const colVisibles = columnVisibleStorage.split('|')
          const colHides = colVisibles[0] ? colVisibles[0].split(',') : []
          const colShows = colVisibles[1] ? colVisibles[1].split(',') : []
          colHides.forEach(field => {
            if (customMap[field]) {
              customMap[field].visible = false
            } else {
              customMap[field] = { field, visible: false }
            }
          })
          colShows.forEach(field => {
            if (customMap[field]) {
              customMap[field].visible = true
            } else {
              customMap[field] = { field, visible: true }
            }
          })
        }
      }
      const keyMap = {}
      XEUtils.eachTree(collectColumn, column => {
        const colKey = column.getKey()
        if (colKey) {
          keyMap[colKey] = column
        }
      })
      XEUtils.each(customMap, ({ visible, resizeWidth }, field) => {
        const column = keyMap[field]
        if (column) {
          if (XEUtils.isNumber(resizeWidth)) {
            column.resizeWidth = resizeWidth
          }
          if (XEUtils.isBoolean(visible)) {
            column.visible = visible
          }
        }
      })
    }
  },
  saveCustomVisible () {
    const { id, collectColumn, customConfig, customOpts } = this
    const { checkMethod, storage } = customOpts
    const isAllStorage = customOpts.storage === true
    const isVisible = isAllStorage || (storage && storage.visible)
    if (customConfig && isVisible) {
      const columnVisibleStorageMap = getCustomStorageMap(visibleStorageKey)
      const colHides = []
      const colShows = []
      if (!id) {
        UtilTools.error('vxe.error.reqProp', ['id'])
        return
      }
      XEUtils.eachTree(collectColumn, column => {
        if (!checkMethod || checkMethod({ column })) {
          if (!column.visible && column.defaultVisible) {
            const colKey = column.getKey()
            if (colKey) {
              colHides.push(colKey)
            }
          } else if (column.visible && !column.defaultVisible) {
            const colKey = column.getKey()
            if (colKey) {
              colShows.push(colKey)
            }
          }
        }
      })
      columnVisibleStorageMap[id] = [colHides.join(',')].concat(colShows.length ? [colShows.join(',')] : []).join('|') || undefined
      localStorage.setItem(visibleStorageKey, XEUtils.toJSONString(columnVisibleStorageMap))
    }
  },
  saveCustomResizable (isReset) {
    const { id, collectColumn, customConfig, customOpts } = this
    const { storage } = customOpts
    const isAllStorage = customOpts.storage === true
    const isResizable = isAllStorage || (storage && storage.resizable)
    if (customConfig && isResizable) {
      const columnWidthStorageMap = getCustomStorageMap(resizableStorageKey)
      let columnWidthStorage
      if (!id) {
        UtilTools.error('vxe.error.reqProp', ['id'])
        return
      }
      if (!isReset) {
        columnWidthStorage = XEUtils.isPlainObject(columnWidthStorageMap[id]) ? columnWidthStorageMap[id] : {}
        XEUtils.eachTree(collectColumn, column => {
          if (column.resizeWidth) {
            const colKey = column.getKey()
            if (colKey) {
              columnWidthStorage[colKey] = column.renderWidth
            }
          }
        })
      }
      columnWidthStorageMap[id] = XEUtils.isEmpty(columnWidthStorage) ? undefined : columnWidthStorage
      localStorage.setItem(resizableStorageKey, XEUtils.toJSONString(columnWidthStorageMap))
    }
  },
  /**
   * 刷新列配置
   */
  refreshColumn () {
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
    const leftList = []
    const centerList = []
    const rightList = []
    const { collectColumn, tableFullColumn, isGroup, columnStore, sXOpts, scrollXStore } = this
    // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏
    if (isGroup) {
      const leftGroupList = []
      const centerGroupList = []
      const rightGroupList = []
      XEUtils.eachTree(collectColumn, (column, index, items, path, parent) => {
        const isColGroup = hasChildrenList(column)
        // 如果是分组，必须按组设置固定列，不允许给子列设置固定
        if (parent && parent.fixed) {
          column.fixed = parent.fixed
        }
        if (parent && column.fixed !== parent.fixed) {
          UtilTools.error('vxe.error.groupFixed')
        }
        if (isColGroup) {
          column.visible = !!XEUtils.findTree(column.children, subColumn => hasChildrenList(subColumn) ? null : subColumn.visible)
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
      collectColumn.forEach((column) => {
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
      tableFullColumn.forEach((column) => {
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
    let scrollXLoad = sXOpts.enabled && sXOpts.gt > -1 && sXOpts.gt < tableFullColumn.length
    this.hasFixedColumn = leftList.length > 0 || rightList.length > 0
    Object.assign(columnStore, { leftList, centerList, rightList })
    if (scrollXLoad && isGroup) {
      scrollXLoad = false
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        UtilTools.warn('vxe.error.scrollXNotGroup')
      }
    }
    if (scrollXLoad) {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (this.showHeader && !this.showHeaderOverflow) {
          UtilTools.warn('vxe.error.reqProp', ['show-header-overflow'])
        }
        if (this.showFooter && !this.showFooterOverflow) {
          UtilTools.warn('vxe.error.reqProp', ['show-footer-overflow'])
        }
        if (this.spanMethod) {
          UtilTools.warn('vxe.error.scrollErrProp', ['span-method'])
        }
        if (this.footerSpanMethod) {
          UtilTools.warn('vxe.error.scrollErrProp', ['footer-span-method'])
        }
      }
      const { visibleSize } = computeVirtualX(this)
      scrollXStore.startIndex = 0
      scrollXStore.endIndex = visibleSize
      scrollXStore.visibleSize = visibleSize
    }
    // 如果列被显示/隐藏，则清除合并状态
    // 如果列被设置为固定，则清除合并状态
    if (visibleColumn.length !== this.visibleColumn.length || !this.visibleColumn.every((column, index) => column === visibleColumn[index])) {
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
    const resizeList = []
    const pxList = []
    const pxMinList = []
    const scaleList = []
    const scaleMinList = []
    const autoList = []
    this.tableFullColumn.forEach(column => {
      if (defaultWidth && !column.width) {
        column.width = defaultWidth
      }
      if (defaultMinWidth && !column.minWidth) {
        column.minWidth = defaultMinWidth
      }
      if (column.visible) {
        if (column.resizeWidth) {
          resizeList.push(column)
        } else if (DomTools.isPx(column.width)) {
          pxList.push(column)
        } else if (DomTools.isScale(column.width)) {
          scaleList.push(column)
        } else if (DomTools.isPx(column.minWidth)) {
          pxMinList.push(column)
        } else if (DomTools.isScale(column.minWidth)) {
          scaleMinList.push(column)
        } else {
          autoList.push(column)
        }
      }
    })
    Object.assign(this.columnStore, { resizeList, pxList, pxMinList, scaleList, scaleMinList, autoList })
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
    // 还原滚动条位置
    if (lastScrollLeft || lastScrollTop) {
      return restoreScrollLocation(this, lastScrollLeft, lastScrollTop)
    }
    // 重置
    setScrollTop(tableBodyElem, lastScrollTop)
    setScrollTop(leftBodyElem, lastScrollTop)
    setScrollTop(rightBodyElem, lastScrollTop)
    setScrollLeft(tableFooterElem, lastScrollLeft)
  },
  /**
   * 计算单元格列宽，动态分配可用剩余空间
   * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
   */
  recalculate (refull) {
    const { $refs } = this
    const { tableBody, tableHeader, tableFooter } = $refs
    const bodyElem = tableBody ? tableBody.$el : null
    const headerElem = tableHeader ? tableHeader.$el : null
    const footerElem = tableFooter ? tableFooter.$el : null
    if (bodyElem) {
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
  autoCellWidth (headerElem, bodyElem, footerElem) {
    let tableWidth = 0
    const minCellWidth = 40 // 列宽最少限制 40px
    const bodyWidth = bodyElem.clientWidth - 1
    let remainWidth = bodyWidth
    let meanWidth = remainWidth / 100
    const { fit, columnStore } = this
    const { resizeList, pxMinList, pxList, scaleList, scaleMinList, autoList } = columnStore
    // 最小宽
    pxMinList.forEach(column => {
      const minWidth = parseInt(column.minWidth)
      tableWidth += minWidth
      column.renderWidth = minWidth
    })
    // 最小百分比
    scaleMinList.forEach(column => {
      const scaleWidth = Math.floor(parseInt(column.minWidth) * meanWidth)
      tableWidth += scaleWidth
      column.renderWidth = scaleWidth
    })
    // 固定百分比
    scaleList.forEach(column => {
      const scaleWidth = Math.floor(parseInt(column.width) * meanWidth)
      tableWidth += scaleWidth
      column.renderWidth = scaleWidth
    })
    // 固定宽
    pxList.forEach(column => {
      const width = parseInt(column.width)
      tableWidth += width
      column.renderWidth = width
    })
    // 调整了列宽
    resizeList.forEach(column => {
      const width = parseInt(column.resizeWidth)
      tableWidth += width
      column.renderWidth = width
    })
    remainWidth -= tableWidth
    meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)) : 0
    if (fit) {
      if (remainWidth > 0) {
        scaleMinList.concat(pxMinList).forEach(column => {
          tableWidth += meanWidth
          column.renderWidth += meanWidth
        })
      }
    } else {
      meanWidth = minCellWidth
    }
    // 自适应
    autoList.forEach(column => {
      const width = Math.max(meanWidth, minCellWidth)
      column.renderWidth = width
      tableWidth += width
    })
    if (fit) {
      /**
       * 偏移量算法
       * 如果所有列足够放的情况下，从最后动态列开始分配
       */
      const dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoList)
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
    if (footerElem) {
      const footerHeight = footerElem.offsetHeight
      this.scrollbarHeight = Math.max(footerHeight - footerElem.clientHeight, 0)
      this.overflowX = tableWidth > footerElem.clientWidth
      this.footerHeight = footerHeight
    } else {
      this.footerHeight = 0
      this.scrollbarHeight = Math.max(tableHeight - bodyElem.clientHeight, 0)
      this.overflowX = tableWidth > bodyWidth
    }
    this.updateHeight()
    this.parentHeight = Math.max(this.headerHeight + this.footerHeight + 20, this.getParentHeight())
    if (this.overflowX) {
      this.checkScrolling()
    }
  },
  updateHeight () {
    this.customHeight = calcHeight(this, 'height')
    this.customMaxHeight = calcHeight(this, 'maxHeight')
  },
  updateStyle () {
    let {
      $refs,
      isGroup,
      fullColumnIdData,
      tableColumn,
      customHeight,
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
      // isMergeLeftFixedExceeded,
      // isMergeRightFixedExceeded,
      // isMergeFooterLeftFixedExceeded,
      // isMergeFooterRightFixedExceeded
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

          // 如果是使用优化模式
          let isOptimize = false
          if (!isGroup) {
            if (fixedType) {
              if (scrollXLoad || allColumnHeaderOverflow) {
                isOptimize = true
              }
            }
          }
          if (isOptimize) {
            tableColumn = fixedColumn
          }
          if (isOptimize || scrollXLoad) {
            tWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
          }

          if (tableElem) {
            tableElem.style.width = tWidth ? `${tWidth + scrollbarWidth}px` : ''
            // 修复 IE 中高度无法自适应问题
            if (browse.msie) {
              XEUtils.arrayEach(tableElem.querySelectorAll('.vxe-resizable'), resizeElem => {
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
            XEUtils.arrayEach(listElem.querySelectorAll('.col--group'), thElem => {
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
          if (wrapperElem) {
            if (customMaxHeight) {
              wrapperElem.style.maxHeight = `${fixedType ? customMaxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : customMaxHeight - headerHeight}px`
            } else {
              if (customHeight > 0) {
                wrapperElem.style.height = `${fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight}px`
              } else {
                wrapperElem.style.height = ''
              }
            }
          }

          // 如果是固定列
          if (fixedWrapperElem) {
            const isRightFixed = fixedType === 'right'
            const fixedColumn = columnStore[`${fixedType}List`]
            if (wrapperElem) {
              wrapperElem.style.top = `${headerHeight}px`
            }
            fixedWrapperElem.style.height = `${(customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1)}px`
            fixedWrapperElem.style.width = `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, isRightFixed ? scrollbarWidth : 0)}px`
          }

          let tWidth = tableWidth

          // 如果是使用优化模式
          if (fixedType) {
            if (scrollXLoad || scrollYLoad || (allColumnOverflow ? isAllOverflow : allColumnOverflow)) {
              if (!mergeList.length && !spanMethod && !(keyboardConfig && keyboardOpts.isMerge)) {
                tableColumn = fixedColumn
              } else {
                tableColumn = visibleColumn
                // 检查固定列是否被合并，合并范围是否超出固定列
                // if (mergeList.length && !isMergeLeftFixedExceeded && fixedType === 'left') {
                //   tableColumn = fixedColumn
                // } else if (mergeList.length && !isMergeRightFixedExceeded && fixedType === 'right') {
                //   tableColumn = fixedColumn
                // } else {
                //   tableColumn = visibleColumn
                // }
              }
            } else {
              tableColumn = visibleColumn
            }
          }
          tWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)

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

          // 如果是使用优化模式
          if (fixedType) {
            if (scrollXLoad || allColumnFooterOverflow) {
              if (!mergeFooterList.length || !footerSpanMethod) {
                tableColumn = fixedColumn
              } else {
                tableColumn = visibleColumn
                // 检查固定列是否被合并，合并范围是否超出固定列
                // if (mergeFooterList.length && !isMergeFooterLeftFixedExceeded && fixedType === 'left') {
                //   tableColumn = fixedColumn
                // } else if (mergeFooterList.length && !isMergeFooterRightFixedExceeded && fixedType === 'right') {
                //   tableColumn = fixedColumn
                // } else {
                //   tableColumn = visibleColumn
                // }
              }
            } else {
              tableColumn = visibleColumn
            }
          }
          tWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)

          if (wrapperElem) {
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
          XEUtils.arrayEach(colgroupElem.children, colElem => {
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
                XEUtils.arrayEach(listElem.querySelectorAll(`.${column.id}`), elem => {
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
        DomTools[bodyElem.scrollLeft > 0 ? 'addClass' : 'removeClass'](leftContainer, 'scrolling--middle')
      }
      if (rightContainer) {
        DomTools[bodyElem.clientWidth < bodyElem.scrollWidth - Math.ceil(bodyElem.scrollLeft) ? 'addClass' : 'removeClass'](rightContainer, 'scrolling--middle')
      }
    }
  },
  preventEvent (evnt, type, args, next, end) {
    const evntList = VXETable.interceptor.get(type)
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
  handleGlobalMousedownEvent (evnt) {
    const { $el, $refs, $xegrid, $toolbar, mouseConfig, editStore, ctxMenuStore, editOpts, filterStore, getRowNode } = this
    const { actived } = editStore
    const { ctxWrapper, filterWrapper, validTip } = $refs
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
              this.preventEvent(evnt, 'event.clearActived', actived.args, () => {
                let isClearActived
                if (editOpts.mode === 'row') {
                  const rowNode = getEventTargetNode(evnt, $el, 'vxe-body--row')
                  // row 方式，如果点击了不同行
                  isClearActived = rowNode.flag ? getRowNode(rowNode.targetElem).item !== actived.args.row : false
                } else {
                  // cell 方式，如果是非编辑列
                  isClearActived = !getEventTargetNode(evnt, $el, 'col--edit').flag
                }
                // 如果点击表头行，则清除激活状态
                if (!isClearActived) {
                  isClearActived = getEventTargetNode(evnt, $el, 'vxe-header--row').flag
                }
                // 如果点击表尾行，则清除激活状态
                if (!isClearActived) {
                  isClearActived = getEventTargetNode(evnt, $el, 'vxe-footer--row').flag
                }
                // 如果固定了高度且点击了行之外的空白处，则清除激活状态
                if (!isClearActived && this.height && !this.overflowY) {
                  const bodyWrapperElem = evnt.target
                  if (hasClass(bodyWrapperElem, 'vxe-table--body-wrapper')) {
                    isClearActived = evnt.offsetY < bodyWrapperElem.clientHeight
                  }
                }
                if (
                  isClearActived ||
                    // 如果点击了当前表格之外
                    !getEventTargetNode(evnt, $el).flag
                ) {
                  setTimeout(() => this.clearActived(evnt))
                }
              })
            }
          }
        }
      }
    } else if (mouseConfig) {
      if (!getEventTargetNode(evnt, $el).flag && !($xegrid && getEventTargetNode(evnt, $xegrid.$el).flag) && !(ctxWrapper && getEventTargetNode(evnt, ctxWrapper.$el).flag) && !($toolbar && getEventTargetNode(evnt, $toolbar.$el).flag)) {
        this.clearSelected()
        if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-areas-clear').flag) {
          this.preventEvent(evnt, 'event.clearAreas', {}, () => {
            this.clearCellAreas()
            this.clearCopyCellArea()
          })
        }
      }
    }
    // 如果配置了快捷菜单且，点击了其他地方则关闭
    if (ctxMenuStore.visible && ctxWrapper && !getEventTargetNode(evnt, ctxWrapper.$el).flag) {
      this.closeMenu()
    }
    // 最后激活的表格
    this.isActivated = getEventTargetNode(evnt, ($xegrid || this).$el).flag
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
  keydownEvent (evnt) {
    const { filterStore, ctxMenuStore, editStore, keyboardConfig, mouseConfig, mouseOpts } = this
    const { actived } = editStore
    const { keyCode } = evnt
    const isEsc = keyCode === 27
    if (isEsc) {
      this.preventEvent(evnt, 'event.keydown', null, () => {
        if (keyboardConfig && mouseConfig && mouseOpts.area && this.handleKeyboardEvent) {
          this.handleKeyboardEvent(evnt)
        } else if (actived.row || filterStore.visible || ctxMenuStore.visible) {
          evnt.stopPropagation()
          // 如果按下了 Esc 键，关闭快捷菜单、筛选
          this.closeFilter()
          this.closeMenu()
          // 如果是激活编辑状态，则取消编辑
          if (actived.row) {
            const params = actived.args
            this.clearActived(evnt)
            // 如果配置了选中功能，则为选中状态
            if (mouseConfig && mouseOpts.selected) {
              this.$nextTick(() => this.handleSelected(params, evnt))
            }
          }
        }
        this.emitEvent('keydown', {}, evnt)
      })
    }
  },
  /**
   * 全局键盘事件
   */
  handleGlobalKeydownEvent (evnt) {
    // 该行为只对当前激活的表格有效
    if (this.isActivated) {
      this.preventEvent(evnt, 'event.keydown', null, () => {
        const { filterStore, isCtxMenu, ctxMenuStore, editStore, editOpts, editConfig, mouseConfig, mouseOpts, keyboardConfig, keyboardOpts, treeConfig, treeOpts, highlightCurrentRow, currentRow, bodyCtxMenu } = this
        const { selected, actived } = editStore
        const { keyCode } = evnt
        const isBack = keyCode === 8
        const isTab = keyCode === 9
        const isEnter = keyCode === 13
        const isEsc = keyCode === 27
        const isSpacebar = keyCode === 32
        const isLeftArrow = keyCode === 37
        const isUpArrow = keyCode === 38
        const isRightArrow = keyCode === 39
        const isDwArrow = keyCode === 40
        const isDel = keyCode === 46
        const isF2 = keyCode === 113
        const isContextMenu = keyCode === 93
        const hasMetaKey = evnt.metaKey
        const hasCtrlKey = evnt.ctrlKey
        const hasShiftKey = evnt.shiftKey
        const hasAltKey = evnt.altKey
        const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
        const operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow)
        const isEditStatus = isEnableConf(editConfig) && actived.column && actived.row
        let params
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
              this.handleActived(selected.args, evnt)
            }
          }
        } else if (isContextMenu) {
          // 如果按下上下文键
          this._keyCtx = selected.row && selected.column && bodyCtxMenu.length
          clearTimeout(this.keyCtxTimeout)
          this.keyCtxTimeout = setTimeout(() => {
            this._keyCtx = false
          }, 1000)
        } else if (isEnter && !hasAltKey && keyboardConfig && keyboardOpts.isEnter && (selected.row || actived.row || (treeConfig && highlightCurrentRow && currentRow))) {
          // 退出选中
          if (hasCtrlKey) {
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              params = actived.args
              this.clearActived(evnt)
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
            } else if (treeConfig && highlightCurrentRow && currentRow) {
              // 如果是树形表格当前行回车移动到子节点
              const childrens = currentRow[treeOpts.children]
              if (childrens && childrens.length) {
                evnt.preventDefault()
                const targetRow = childrens[0]
                params = { $table: this, row: targetRow }
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
            } else if ((isUpArrow || isDwArrow) && highlightCurrentRow) {
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
        } else if (keyboardConfig && (isDel || (treeConfig && highlightCurrentRow && currentRow ? isBack && keyboardOpts.isArrow : isBack))) {
          if (!isEditStatus) {
            const { delMethod, backMethod } = keyboardOpts
            // 如果是删除键
            if (keyboardOpts.isDel && (selected.row || selected.column)) {
              if (delMethod) {
                delMethod({
                  row: selected.row,
                  rowIndex: this.getRowIndex(selected.row),
                  column: selected.column,
                  columnIndex: this.getColumnIndex(selected.column),
                  $table: this
                })
              } else {
                setCellValue(selected.row, selected.column, null)
              }
              if (isBack) {
                if (backMethod) {
                  backMethod({
                    row: selected.row,
                    rowIndex: this.getRowIndex(selected.row),
                    column: selected.column,
                    columnIndex: this.getColumnIndex(selected.column),
                    $table: this
                  })
                } else {
                  this.handleActived(selected.args, evnt)
                }
              } else if (isDel) {
                // 如果按下 del 键，更新表尾数据
                this.updateFooter()
              }
            } else if (isBack && keyboardOpts.isArrow && treeConfig && highlightCurrentRow && currentRow) {
              // 如果树形表格回退键关闭当前行返回父节点
              const { parent: parentRow } = XEUtils.findTree(this.afterFullData, item => item === currentRow, treeOpts)
              if (parentRow) {
                evnt.preventDefault()
                params = { $table: this, row: parentRow }
                this.setTreeExpand(parentRow, false)
                  .then(() => this.scrollToRow(parentRow))
                  .then(() => this.triggerCurrentRowEvent(evnt, params))
              }
            }
          }
        } else if (keyboardConfig && keyboardOpts.isEdit && !hasCtrlKey && !hasMetaKey && (isSpacebar || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222))) {
          const { editMethod } = keyboardOpts
          // 启用编辑后，空格键功能将失效
          // if (isSpacebar) {
          //   evnt.preventDefault()
          // }
          // 如果是按下非功能键之外允许直接编辑
          if (selected.column && selected.row && isEnableConf(selected.column.editRender)) {
            if (!editOpts.activeMethod || editOpts.activeMethod(selected.args)) {
              if (editMethod) {
                editMethod({
                  row: selected.row,
                  rowIndex: this.getRowIndex(selected.row),
                  column: selected.column,
                  columnIndex: this.getColumnIndex(selected.column),
                  $table: this
                })
              } else {
                setCellValue(selected.row, selected.column, null)
                this.handleActived(selected.args, evnt)
              }
            }
          }
        }
        this.emitEvent('keydown', {}, evnt)
      })
    }
  },
  handleGlobalPasteEvent (evnt) {
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
  handleGlobalCopyEvent (evnt) {
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
  handleGlobalCutEvent (evnt) {
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
  handleTooltipLeaveMethod () {
    const tooltipOpts = this.tooltipOpts
    setTimeout(() => {
      if (!this.tooltipActive) {
        this.closeTooltip()
      }
    }, tooltipOpts.leaveDelay)
    return false
  },
  handleTargetEnterEvent () {
    clearTimeout(this.tooltipTimeout)
    this.tooltipActive = true
    this.closeTooltip()
  },
  handleTargetLeaveEvent () {
    const tooltipOpts = this.tooltipOpts
    this.tooltipActive = false
    if (tooltipOpts.enterable) {
      this.tooltipTimeout = setTimeout(() => {
        const tooltip = this.$refs.tooltip
        if (tooltip && !tooltip.isHover) {
          this.closeTooltip()
        }
      }, tooltipOpts.leaveDelay)
    } else {
      this.closeTooltip()
    }
  },
  triggerHeaderHelpEvent (evnt, params) {
    const { column } = params
    const { titleHelp } = column
    if (titleHelp.message) {
      const { $refs, tooltipStore } = this
      const tooltip = $refs.tooltip
      const content = UtilTools.getFuncText(titleHelp.message)
      this.handleTargetEnterEvent()
      tooltipStore.visible = true
      if (tooltip) {
        tooltip.open(evnt.currentTarget, content)
      }
    }
  },
  /**
   * 触发表头 tooltip 事件
   */
  triggerHeaderTooltipEvent (evnt, params) {
    const { tooltipStore } = this
    const { column } = params
    const titleElem = evnt.currentTarget
    this.handleTargetEnterEvent()
    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, titleElem, titleElem, null, params)
    }
  },
  /**
   * 触发单元格 tooltip 事件
   */
  triggerBodyTooltipEvent (evnt, params) {
    const { editConfig, editOpts, editStore, tooltipStore } = this
    const { actived } = editStore
    const { row, column } = params
    const cell = evnt.currentTarget
    this.handleTargetEnterEvent()
    if (isEnableConf(editConfig)) {
      if ((editOpts.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {
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
  triggerFooterTooltipEvent (evnt, params) {
    const { column } = params
    const { tooltipStore } = this
    const cell = evnt.currentTarget
    this.handleTargetEnterEvent()
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
  handleTooltip (evnt, cell, overflowElem, tipElem, params) {
    params.cell = cell
    const { $refs, tooltipOpts, tooltipStore } = this
    const { column, row } = params
    const { showAll, enabled, contentMethod } = tooltipOpts
    const tooltip = $refs.tooltip
    const customContent = contentMethod ? contentMethod(params) : null
    const useCustom = contentMethod && !XEUtils.eqNull(customContent)
    const content = useCustom ? customContent : (column.type === 'html' ? overflowElem.innerText : overflowElem.textContent).trim()
    const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth
    if (content && (showAll || enabled || useCustom || isCellOverflow)) {
      Object.assign(tooltipStore, {
        row,
        column,
        visible: true
      })
      if (tooltip) {
        tooltip.open(isCellOverflow ? overflowElem : (tipElem || overflowElem), UtilTools.formatText(content))
      }
    }
    return this.$nextTick()
  },
  openTooltip (target, content) {
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
        visible: false
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
    UtilTools.warn('vxe.error.delFunc', ['isCheckboxIndeterminate', 'isAllCheckboxIndeterminate'])
    return this.isAllCheckboxIndeterminate()
  },
  /**
   * 获取复选框半选状态的行数据
   */
  getCheckboxIndeterminateRecords (isFull) {
    const { treeConfig, treeIndeterminates, afterFullData } = this
    if (treeConfig) {
      return isFull ? treeIndeterminates.slice(0) : treeIndeterminates.filter(row => afterFullData.indexOf(row))
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
      this.setAllCheckboxRow(true)
    } else if (checkRowKeys) {
      const defSelection = []
      checkRowKeys.forEach(rowid => {
        if (fullDataRowIdData[rowid]) {
          defSelection.push(fullDataRowIdData[rowid].row)
        }
      })
      this.setCheckboxRow(defSelection, true)
    }
  },
  /**
   * 用于多选行，设置行为选中状态，第二个参数为选中与否
   * @param {Array/Row} rows 行数据
   * @param {Boolean} value 是否选中
   */
  setCheckboxRow (rows, value) {
    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    rows.forEach(row => this.handleSelectRow({ row }, !!value))
    return this.$nextTick()
  },
  isCheckedByCheckboxRow (row) {
    const { checkField: property } = this.checkboxOpts
    if (property) {
      return XEUtils.get(row, property)
    }
    return this.selection.indexOf(row) > -1
  },
  isIndeterminateByCheckboxRow (row) {
    return this.treeIndeterminates.indexOf(row) > -1 && !this.isCheckedByCheckboxRow(row)
  },
  /**
   * 多选，行选中事件
   * value 选中true 不选false 半选-1
   */
  handleSelectRow ({ row }, value) {
    const { selection, afterFullData, treeConfig, treeOpts, treeIndeterminates, checkboxOpts } = this
    const { checkField: property, checkStrictly, checkMethod } = checkboxOpts
    if (property) {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          if (treeIndeterminates.indexOf(row) === -1) {
            treeIndeterminates.push(row)
          }
          XEUtils.set(row, property, false)
        } else {
          // 更新子节点状态
          XEUtils.eachTree([row], (item) => {
            if (row === item || (!checkMethod || checkMethod({ row: item }))) {
              XEUtils.set(item, property, value)
              XEUtils.remove(treeIndeterminates, half => half === item)
              this.handleCheckboxReserveRow(row, value)
            }
          }, treeOpts)
        }
        // 如果存在父节点，更新父节点状态
        const matchObj = XEUtils.findTree(afterFullData, item => item === row, treeOpts)
        if (matchObj && matchObj.parent) {
          let parentStatus
          const vItems = checkMethod ? matchObj.items.filter((item) => checkMethod({ row: item })) : matchObj.items
          const indeterminatesItem = XEUtils.find(matchObj.items, item => treeIndeterminates.indexOf(item) > -1)
          if (indeterminatesItem) {
            parentStatus = -1
          } else {
            const selectItems = matchObj.items.filter(item => XEUtils.get(item, property))
            parentStatus = selectItems.filter(item => vItems.indexOf(item) > -1).length === vItems.length ? true : (selectItems.length || value === -1 ? -1 : false)
          }
          return this.handleSelectRow({ row: matchObj.parent }, parentStatus)
        }
      } else {
        if (!checkMethod || checkMethod({ row })) {
          XEUtils.set(row, property, value)
          this.handleCheckboxReserveRow(row, value)
        }
      }
    } else {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          if (treeIndeterminates.indexOf(row) === -1) {
            treeIndeterminates.push(row)
          }
          XEUtils.remove(selection, item => item === row)
        } else {
          // 更新子节点状态
          XEUtils.eachTree([row], (item) => {
            if (row === item || (!checkMethod || checkMethod({ row: item }))) {
              if (value) {
                selection.push(item)
              } else {
                XEUtils.remove(selection, select => select === item)
              }
              XEUtils.remove(treeIndeterminates, half => half === item)
              this.handleCheckboxReserveRow(row, value)
            }
          }, treeOpts)
        }
        // 如果存在父节点，更新父节点状态
        const matchObj = XEUtils.findTree(afterFullData, item => item === row, treeOpts)
        if (matchObj && matchObj.parent) {
          let parentStatus
          const vItems = checkMethod ? matchObj.items.filter((item) => checkMethod({ row: item })) : matchObj.items
          const indeterminatesItem = XEUtils.find(matchObj.items, item => treeIndeterminates.indexOf(item) > -1)
          if (indeterminatesItem) {
            parentStatus = -1
          } else {
            const selectItems = matchObj.items.filter(item => selection.indexOf(item) > -1)
            parentStatus = selectItems.filter(item => vItems.indexOf(item) > -1).length === vItems.length ? true : (selectItems.length || value === -1 ? -1 : false)
          }
          return this.handleSelectRow({ row: matchObj.parent }, parentStatus)
        }
      } else {
        if (!checkMethod || checkMethod({ row })) {
          if (value) {
            if (selection.indexOf(row) === -1) {
              selection.push(row)
            }
          } else {
            XEUtils.remove(selection, item => item === row)
          }
          this.handleCheckboxReserveRow(row, value)
        }
      }
    }
    this.checkSelectionStatus()
  },
  handleToggleCheckRowEvent (evnt, params) {
    const { selection, checkboxOpts } = this
    const { checkField: property } = checkboxOpts
    const { row } = params
    const value = property ? !XEUtils.get(row, property) : selection.indexOf(row) === -1
    if (evnt) {
      this.triggerCheckRowEvent(evnt, params, value)
    } else {
      this.handleSelectRow(params, value)
    }
  },
  triggerCheckRowEvent (evnt, params, value) {
    const { checkMethod } = this.checkboxOpts
    if (!checkMethod || checkMethod({ row: params.row })) {
      this.handleSelectRow(params, value)
      this.emitEvent('checkbox-change', Object.assign({ records: this.getCheckboxRecords(), reserves: this.getCheckboxReserveRecords(), indeterminates: this.getCheckboxIndeterminateRecords(), checked: value }, params), evnt)
    }
  },
  /**
   * 多选，切换某一行的选中状态
   */
  toggleCheckboxRow (row) {
    this.handleToggleCheckRowEvent(null, { row })
    return this.$nextTick()
  },
  /**
   * 用于多选行，设置所有行的选中状态
   * @param {Boolean} value 是否选中
   */
  setAllCheckboxRow (value) {
    const { afterFullData, treeConfig, treeOpts, selection, checkboxReserveRowMap, checkboxOpts } = this
    const { checkField: property, reserve, checkStrictly, checkMethod } = checkboxOpts
    let selectRows = []
    const beforeSelection = treeConfig ? [] : selection.filter(row => afterFullData.indexOf(row) === -1)
    if (checkStrictly) {
      this.isAllSelected = value
    } else {
      /**
       * 绑定属性方式（高性能，有污染）
       * 必须在行数据存在对应的属性，否则将不响应
       */
      if (property) {
        const checkValFn = (row) => {
          if (!checkMethod || checkMethod({ row })) {
            if (value) {
              selectRows.push(row)
            }
            XEUtils.set(row, property, value)
          }
        }
        // 如果存在选中方法
        // 如果方法成立，则更新值，否则忽略该数据
        if (treeConfig) {
          XEUtils.eachTree(afterFullData, checkValFn, treeOpts)
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
              if (!checkMethod || checkMethod({ row })) {
                selectRows.push(row)
              }
            }, treeOpts)
          } else {
            /**
             * 如果是树取消
             * 如果方法成立，则不添加到临时集合中
             */
            if (checkMethod) {
              XEUtils.eachTree(afterFullData, (row) => {
                if (checkMethod({ row }) ? 0 : selection.indexOf(row) > -1) {
                  selectRows.push(row)
                }
              }, treeOpts)
            }
          }
        } else {
          if (value) {
            /**
             * 如果是行勾选
             * 如果存在选中方法且成立或者本身已勾选，则添加到临时集合中
             * 如果不存在选中方法，则添加所有数据到临时集合中
             */
            if (checkMethod) {
              selectRows = afterFullData.filter((row) => selection.indexOf(row) > -1 || checkMethod({ row }))
            } else {
              selectRows = afterFullData.slice(0)
            }
          } else {
            /**
             * 如果是行取消
             * 如果方法成立，则不添加到临时集合中；如果方法不成立则判断当前是否已勾选，如果已被勾选则添加到新集合中
             * 如果不存在选中方法，无需处理，临时集合默认为空
             */
            if (checkMethod) {
              selectRows = afterFullData.filter((row) => checkMethod({ row }) ? 0 : selection.indexOf(row) > -1)
            }
          }
        }
      }
      if (reserve) {
        if (value) {
          selectRows.forEach(row => {
            checkboxReserveRowMap[getRowid(this, row)] = row
          })
        } else {
          afterFullData.forEach(row => this.handleCheckboxReserveRow(row, false))
        }
      }
      this.selection = property ? [] : beforeSelection.concat(selectRows)
    }
    this.treeIndeterminates = []
    this.checkSelectionStatus()
  },
  checkSelectionStatus () {
    const { afterFullData, selection, treeIndeterminates, checkboxOpts, treeConfig } = this
    const { checkField, halfField, checkStrictly, checkMethod } = checkboxOpts
    if (!checkStrictly) {
      let isAllSelected = false
      let isIndeterminate = false
      if (checkField) {
        isAllSelected = afterFullData.length && afterFullData.every(
          checkMethod
            ? (row) => !checkMethod({ row }) || XEUtils.get(row, checkField)
            : row => XEUtils.get(row, checkField)
        )
        if (treeConfig) {
          if (halfField) {
            isIndeterminate = !isAllSelected && afterFullData.some(row => XEUtils.get(row, checkField) || XEUtils.get(row, halfField) || treeIndeterminates.indexOf(row) > -1)
          } else {
            isIndeterminate = !isAllSelected && afterFullData.some(row => XEUtils.get(row, checkField) || treeIndeterminates.indexOf(row) > -1)
          }
        } else {
          if (halfField) {
            isIndeterminate = !isAllSelected && afterFullData.some(row => XEUtils.get(row, checkField) || XEUtils.get(row, halfField))
          } else {
            isIndeterminate = !isAllSelected && afterFullData.some(row => XEUtils.get(row, checkField))
          }
        }
      } else {
        isAllSelected = afterFullData.length && afterFullData.every(
          checkMethod
            ? (row) => !checkMethod({ row }) || selection.indexOf(row) > -1
            : row => selection.indexOf(row) > -1
        )
        if (treeConfig) {
          isIndeterminate = !isAllSelected && afterFullData.some(row => treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1)
        } else {
          isIndeterminate = !isAllSelected && afterFullData.some(row => selection.indexOf(row) > -1)
        }
      }
      this.isAllSelected = isAllSelected
      this.isIndeterminate = isIndeterminate
    }
  },
  // 还原展开、选中等相关状态
  handleReserveStatus () {
    const { expandColumn, treeOpts, treeConfig, fullDataRowIdData, fullAllDataRowMap, currentRow, selectRow, radioReserveRow, radioOpts, checkboxOpts, selection, rowExpandeds, treeExpandeds, expandOpts } = this
    // 单选框
    if (selectRow && !fullAllDataRowMap.has(selectRow)) {
      this.selectRow = null // 刷新单选行状态
    }
    // 还原保留选中状态
    if (radioOpts.reserve && radioReserveRow) {
      const rowid = getRowid(this, radioReserveRow)
      if (fullDataRowIdData[rowid]) {
        this.setRadioRow(fullDataRowIdData[rowid].row)
      }
    }
    // 复选框
    this.selection = getRecoverRow(this, selection) // 刷新多选行状态
    // 还原保留选中状态
    if (checkboxOpts.reserve) {
      this.setCheckboxRow(handleReserveRow(this, this.checkboxReserveRowMap), true)
    }
    if (currentRow && !fullAllDataRowMap.has(currentRow)) {
      this.currentRow = null // 刷新当前行状态
    }
    // 行展开
    this.rowExpandeds = expandColumn ? getRecoverRow(this, rowExpandeds) : [] // 刷新行展开状态
    // 还原保留状态
    if (expandColumn && expandOpts.reserve) {
      this.setRowExpand(handleReserveRow(this, this.rowExpandedReserveRowMap), true)
    }
    // 树展开
    this.treeExpandeds = treeConfig ? getRecoverRow(this, treeExpandeds) : [] // 刷新树展开状态
    if (treeConfig && treeOpts.reserve) {
      this.setTreeExpand(handleReserveRow(this, this.treeExpandedReserveRowMap), true)
    }
  },
  /**
   * 获取单选框保留选中的行
   */
  getRadioReserveRecord (isFull) {
    const { fullDataRowIdData, radioReserveRow, radioOpts, afterFullData, treeConfig, treeOpts } = this
    if (radioOpts.reserve && radioReserveRow) {
      const rowid = getRowid(this, radioReserveRow)
      if (isFull) {
        if (!fullDataRowIdData[rowid]) {
          return radioReserveRow
        }
      } else {
        const rowkey = getRowkey(this)
        if (treeConfig) {
          const matchObj = XEUtils.findTree(afterFullData, row => rowid === XEUtils.get(row, rowkey), treeOpts)
          if (matchObj) {
            return radioReserveRow
          }
        } else {
          if (!afterFullData.some(row => rowid === XEUtils.get(row, rowkey))) {
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
  handleRadioReserveRow (row) {
    const { radioOpts } = this
    if (radioOpts.reserve) {
      this.radioReserveRow = row
    }
  },
  /**
   * 获取复选框保留选中的行
   */
  getCheckboxReserveRecords (isFull) {
    const { fullDataRowIdData, afterFullData, checkboxReserveRowMap, checkboxOpts, treeConfig, treeOpts } = this
    const reserveSelection = []
    if (checkboxOpts.reserve) {
      XEUtils.each(checkboxReserveRowMap, (oldRow, oldRowid) => {
        if (oldRow) {
          if (isFull) {
            if (!fullDataRowIdData[oldRowid]) {
              reserveSelection.push(oldRow)
            }
          } else {
            if (treeConfig) {
              if (!XEUtils.findTree(afterFullData, row => getRowid(this, row) === oldRowid, treeOpts)) {
                reserveSelection.push(oldRow)
              }
            } else {
              if (!afterFullData.some(row => getRowid(this, row) === oldRowid)) {
                reserveSelection.push(oldRow)
              }
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
  handleCheckboxReserveRow (row, checked) {
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
  /**
   * 多选，选中所有事件
   */
  triggerCheckAllEvent (evnt, value) {
    this.setAllCheckboxRow(value)
    this.emitEvent('checkbox-all', { records: this.getCheckboxRecords(), reserves: this.getCheckboxReserveRecords(), indeterminates: this.getCheckboxIndeterminateRecords(), checked: value }, evnt)
  },
  /**
   * 多选，切换所有行的选中状态
   */
  toggleAllCheckboxRow () {
    this.triggerCheckAllEvent(null, !this.isAllSelected)
    return this.$nextTick()
  },
  /**
   * 用于多选行，手动清空用户的选择
   * 清空行为不管是否被禁用还是保留记录，都将彻底清空选中状态
   */
  clearCheckboxRow () {
    const { tableFullData, treeConfig, treeOpts, checkboxOpts } = this
    const { checkField: property, reserve } = checkboxOpts
    if (property) {
      if (treeConfig) {
        XEUtils.eachTree(tableFullData, item => XEUtils.set(item, property, false), treeOpts)
      } else {
        tableFullData.forEach(item => XEUtils.set(item, property, false))
      }
    }
    if (reserve) {
      tableFullData.forEach(row => this.handleCheckboxReserveRow(row, false))
    }
    this.isAllSelected = false
    this.isIndeterminate = false
    this.selection = []
    this.treeIndeterminates = []
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
        this.setRadioRow(fullDataRowIdData[rowid].row)
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
  triggerRadioRowEvent (evnt, params) {
    const { selectRow: oldValue, radioOpts } = this
    const { row } = params
    let newValue = row
    let isChange = oldValue !== newValue
    if (isChange) {
      this.setRadioRow(newValue)
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
  triggerCurrentRowEvent (evnt, params) {
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
  setCurrentRow (row) {
    const { $el } = this
    this.clearCurrentRow()
    this.clearCurrentColumn()
    this.currentRow = row
    if (this.highlightCurrentRow) {
      if ($el) {
        XEUtils.arrayEach($el.querySelectorAll(`[rowid="${getRowid(this, row)}"]`), elem => addClass(elem, 'row--current'))
      }
    }
    return this.$nextTick()
  },
  isCheckedByRadioRow (row) {
    return this.selectRow === row
  },
  /**
   * 用于单选行，设置某一行为选中状态
   * @param {Row} row 行对象
   */
  setRadioRow (row) {
    const { radioOpts } = this
    const { checkMethod } = radioOpts
    if (row && (!checkMethod || checkMethod({ row }))) {
      this.selectRow = row
      this.handleRadioReserveRow(row)
    }
    return this.$nextTick()
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
    this.selectRow = null
    return this.$nextTick()
  },
  /**
   * 用于当前行，获取当前行的数据
   */
  getCurrentRecord () {
    return this.highlightCurrentRow ? this.currentRow : null
  },
  /**
   * 用于单选行，获取当已选中的数据
   */
  getRadioRecord (isFull) {
    const { treeConfig, treeOpts, selectRow, fullDataRowIdData, afterFullData } = this
    if (selectRow) {
      const rowid = getRowid(this, selectRow)
      if (isFull) {
        if (!fullDataRowIdData[rowid]) {
          return selectRow
        }
      } else {
        if (treeConfig) {
          const rowkey = getRowkey(this)
          const matchObj = XEUtils.findTree(afterFullData, row => rowid === XEUtils.get(row, rowkey), treeOpts)
          if (matchObj) {
            return selectRow
          }
        } else {
          if (afterFullData.indexOf(selectRow) > -1) {
            return selectRow
          }
        }
      }
    }
    return null
  },
  /**
   * 行 hover 事件
   */
  triggerHoverEvent (evnt, { row }) {
    this.setHoverRow(row)
  },
  setHoverRow (row) {
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
  triggerHeaderCellClickEvent (evnt, params) {
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
    if (this.highlightCurrentColumn) {
      return this.setCurrentColumn(column)
    }
    return this.$nextTick()
  },
  triggerHeaderCellDblclickEvent (evnt, params) {
    this.emitEvent('header-cell-dblclick', Object.assign({ cell: evnt.currentTarget }, params), evnt)
  },
  getCurrentColumn () {
    return this.highlightCurrentColumn ? this.currentColumn : null
  },
  /**
   * 用于当前列，设置某列行为高亮状态
   * @param {ColumnInfo} fieldOrColumn 列配置
   */
  setCurrentColumn (fieldOrColumn) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      this.clearCurrentRow()
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
  checkValidate (type) {
    if (VXETable._valid) {
      return this.triggerValidate(type)
    }
    return this.$nextTick()
  },
  /**
   * 当单元格发生改变时
   * 如果存在规则，则校验
   */
  handleChangeCell (evnt, params) {
    this.checkValidate('blur')
      .catch(e => e)
      .then(() => {
        this.handleActived(params, evnt)
          .then(() => this.checkValidate('change'))
          .catch(e => e)
      })
  },
  /**
   * 列点击事件
   * 如果是单击模式，则激活为编辑状态
   * 如果是双击模式，则单击后选中状态
   */
  triggerCellClickEvent (evnt, params) {
    const { highlightCurrentRow, editStore, radioOpts, expandOpts, treeOpts, editConfig, editOpts, checkboxOpts } = this
    const { actived } = editStore
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
        if (highlightCurrentRow) {
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
  triggerCellDblclickEvent (evnt, params) {
    const { editStore, editConfig, editOpts } = this
    const { actived } = editStore
    const cell = evnt.currentTarget
    params.cell = cell
    if (isEnableConf(editConfig) && editOpts.trigger === 'dblclick') {
      if (!actived.args || evnt.currentTarget !== actived.args.cell) {
        if (editOpts.mode === 'row') {
          this.checkValidate('blur')
            .catch(e => e)
            .then(() => {
              this.handleActived(params, evnt)
                .then(() => this.checkValidate('change'))
                .catch(e => e)
            })
        } else if (editOpts.mode === 'cell') {
          this.handleActived(params, evnt)
            .then(() => this.checkValidate('change'))
            .catch(e => e)
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
        (sortConfig.multiple ? defaultSort : defaultSort.slice(0, 1)).forEach((item) => {
          const { field, order } = item
          if (field && order) {
            const column = this.getColumnByField(field)
            if (column && column.sortable) {
              column.order = order
              column.sortTime = Date.now()
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
  triggerSortEvent (evnt, column, order) {
    const { sortOpts } = this
    const property = column.property
    if (column.sortable || column.remoteSort) {
      if (!order || column.order === order) {
        this.clearSort(sortOpts.multiple ? column : null)
      } else {
        this.sort({ field: property, order })
      }
      const params = { column, property, order: column.order, sortList: this.getSortColumns() }
      this.emitEvent('sort-change', params, evnt)
    }
  },
  sort (sortConfs, sortOrder) {
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
      let firstSortColumn
      if (!multiple) {
        clearAllSort(this)
      }
      (multiple ? sortConfs : [sortConfs[0]]).forEach((confs) => {
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
        }
      })
      // 如果是服务端排序，则跳过本地排序处理
      if (!remote || (firstSortColumn && firstSortColumn.remoteSort)) {
        this.handleTableData(true)
      }
      return this.$nextTick().then(this.updateStyle)
    }
    return this.$nextTick()
  },
  /**
   * 清空指定列的排序条件
   * 如果为空则清空所有列的排序条件
   * @param {String} column 列或字段名
   */
  clearSort (fieldOrColumn) {
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
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      UtilTools.warn('vxe.error.delFunc', ['getSortColumn', 'getSortColumns'])
    }
    return XEUtils.find(this.tableFullColumn, column => (column.sortable || column.remoteSort) && column.order)
  },
  isSort (fieldOrColumn) {
    if (fieldOrColumn) {
      const column = handleFieldOrColumn(this, fieldOrColumn)
      return column && column.sortable && !!column.order
    }
    return this.getSortColumns().length > 0
  },
  getSortColumns () {
    const sortList = []
    this.tableFullColumn.forEach((column) => {
      const { order } = column
      if ((column.sortable || column.remoteSort) && order) {
        sortList.push({ column, property: column.property, order })
      }
    })
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
      this.emitEvent('filter-visible', { column, property: column.property, filterList: this.getCheckedFilters(), visible: false }, null)
    }
    return this.$nextTick()
  },
  /**
   * 判断指定列是否为筛选状态，如果为空则判断所有列
   * @param {String} fieldOrColumn 字段名
   */
  isFilter (fieldOrColumn) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      return column.filters && column.filters.some(option => option.checked)
    }
    return this.getCheckedFilters().length > 0
  },
  /**
   * 判断展开行是否懒加载完成
   * @param {Row} row 行对象
   */
  isRowExpandLoaded (row) {
    const rest = this.fullAllDataRowMap.get(row)
    return rest && rest.expandLoaded
  },
  clearRowExpandLoaded (row) {
    const { expandOpts, expandLazyLoadeds, fullAllDataRowMap } = this
    const { lazy } = expandOpts
    const rest = fullAllDataRowMap.get(row)
    if (lazy && rest) {
      rest.expandLoaded = false
      XEUtils.remove(expandLazyLoadeds, item => row === item)
    }
    return this.$nextTick()
  },
  /**
   * 重新加载展开行的内容
   * @param {Row} row 行对象
   */
  reloadExpandContent (row) {
    const { expandOpts, expandLazyLoadeds } = this
    const { lazy } = expandOpts
    if (lazy && expandLazyLoadeds.indexOf(row) === -1) {
      this.clearRowExpandLoaded(row)
        .then(() => this.handleAsyncRowExpand(row))
    }
    return this.$nextTick()
  },
  /**
   * 展开行事件
   */
  triggerRowExpandEvent (evnt, params) {
    const { expandOpts, expandLazyLoadeds, expandColumn: column } = this
    const { row } = params
    const { lazy } = expandOpts
    if (!lazy || expandLazyLoadeds.indexOf(row) === -1) {
      const expanded = !this.isExpandByRow(row)
      const columnIndex = this.getColumnIndex(column)
      const $columnIndex = this.getVMColumnIndex(column)
      this.setRowExpand(row, expanded)
      this.emitEvent('toggle-row-expand', { expanded, column, columnIndex, $columnIndex, row, rowIndex: this.getRowIndex(row), $rowIndex: this.getVMRowIndex(row) }, evnt)
    }
  },
  /**
   * 切换展开行
   */
  toggleRowExpand (row) {
    return this.setRowExpand(row, !this.isExpandByRow(row))
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
      const defExpandeds = []
      expandRowKeys.forEach(rowid => {
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
  setAllRowExpand (expanded) {
    return this.setRowExpand(this.expandOpts.lazy ? this.tableData : this.tableFullData, expanded)
  },
  handleAsyncRowExpand (row) {
    const rest = this.fullAllDataRowMap.get(row)
    return new Promise(resolve => {
      this.expandLazyLoadeds.push(row)
      this.expandOpts.loadMethod({ $table: this, row, rowIndex: this.getRowIndex(row), $rowIndex: this.getVMRowIndex(row) }).catch(e => e).then(() => {
        rest.expandLoaded = true
        XEUtils.remove(this.expandLazyLoadeds, item => item === row)
        this.rowExpandeds.push(row)
        resolve(this.$nextTick().then(this.recalculate))
      })
    })
  },
  /**
   * 设置展开行，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setRowExpand (rows, expanded) {
    const { fullAllDataRowMap, expandLazyLoadeds, expandOpts, expandColumn: column } = this
    let { rowExpandeds } = this
    const { reserve, lazy, accordion, toggleMethod } = expandOpts
    const lazyRests = []
    const columnIndex = this.getColumnIndex(column)
    const $columnIndex = this.getVMColumnIndex(column)
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (accordion) {
        // 只能同时展开一个
        rowExpandeds = []
        rows = rows.slice(rows.length - 1, rows.length)
      }
      const validRows = toggleMethod ? rows.filter(row => toggleMethod({ expanded, column, columnIndex, $columnIndex, row, rowIndex: this.getRowIndex(row), $rowIndex: this.getVMRowIndex(row) })) : rows
      if (expanded) {
        validRows.forEach(row => {
          if (rowExpandeds.indexOf(row) === -1) {
            const rest = fullAllDataRowMap.get(row)
            const isLoad = lazy && !rest.expandLoaded && expandLazyLoadeds.indexOf(row) === -1
            if (isLoad) {
              lazyRests.push(this.handleAsyncRowExpand(row))
            } else {
              rowExpandeds.push(row)
            }
          }
        })
      } else {
        XEUtils.remove(rowExpandeds, row => validRows.indexOf(row) > -1)
      }
      if (reserve) {
        validRows.forEach(row => this.handleRowExpandReserve(row, expanded))
      }
    }
    this.rowExpandeds = rowExpandeds
    return Promise.all(lazyRests).then(this.recalculate)
  },
  /**
   * 判断行是否为展开状态
   * @param {Row} row 行对象
   */
  isExpandByRow (row) {
    return this.rowExpandeds.indexOf(row) > -1
  },
  /**
   * 手动清空展开行状态，数据会恢复成未展开的状态
   */
  clearRowExpand () {
    const { expandOpts, rowExpandeds, tableFullData } = this
    const { reserve } = expandOpts
    const isExists = rowExpandeds.length
    this.rowExpandeds = []
    if (reserve) {
      tableFullData.forEach(row => this.handleRowExpandReserve(row, false))
    }
    return this.$nextTick().then(() => {
      if (isExists) {
        this.recalculate()
      }
    })
  },
  clearRowExpandReserve () {
    this.rowExpandedReserveRowMap = {}
    return this.$nextTick()
  },
  handleRowExpandReserve (row, expanded) {
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
    return this.rowExpandeds.slice(0)
  },
  getTreeExpandRecords () {
    return this.treeExpandeds.slice(0)
  },
  /**
   * 获取数表格状态
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
  isTreeExpandLoaded (row) {
    const rest = this.fullAllDataRowMap.get(row)
    return rest && rest.treeLoaded
  },
  clearTreeExpandLoaded (row) {
    const { treeOpts, treeExpandeds, fullAllDataRowMap } = this
    const { lazy } = treeOpts
    const rest = fullAllDataRowMap.get(row)
    if (lazy && rest) {
      rest.treeLoaded = false
      XEUtils.remove(treeExpandeds, item => row === item)
    }
    return this.$nextTick()
  },
  /**
   * 重新加载树的子节点
   * @param {Row} row 行对象
   */
  reloadTreeChilds (row) {
    const { treeOpts, treeLazyLoadeds } = this
    const { lazy, hasChild } = treeOpts
    if (lazy && row[hasChild] && treeLazyLoadeds.indexOf(row) === -1) {
      this.clearTreeExpandLoaded(row)
        .then(() => this.handleAsyncTreeExpandChilds(row))
    }
    return this.$nextTick()
  },
  /**
   * 展开树节点事件
   */
  triggerTreeExpandEvent (evnt, params) {
    const { treeOpts, treeLazyLoadeds } = this
    const { row, column } = params
    const { lazy } = treeOpts
    if (!lazy || treeLazyLoadeds.indexOf(row) === -1) {
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
  toggleTreeExpand (row) {
    return this.setTreeExpand(row, !this.isTreeExpandByRow(row))
  },
  /**
   * 处理默认展开树节点
   */
  handleDefaultTreeExpand () {
    const { treeConfig, treeOpts, tableFullData } = this
    if (treeConfig) {
      const { expandAll, expandRowKeys } = treeOpts
      if (expandAll) {
        this.setAllTreeExpand(true)
      } else if (expandRowKeys) {
        const defExpandeds = []
        const rowkey = getRowkey(this)
        expandRowKeys.forEach(rowid => {
          const matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), treeOpts)
          if (matchObj) {
            defExpandeds.push(matchObj.item)
          }
        })
        this.setTreeExpand(defExpandeds, true)
      }
    }
  },
  handleAsyncTreeExpandChilds (row) {
    const { fullAllDataRowMap, treeExpandeds, treeOpts, treeLazyLoadeds, checkboxOpts } = this
    const { loadMethod } = treeOpts
    const { checkStrictly } = checkboxOpts
    const rest = fullAllDataRowMap.get(row)
    return new Promise(resolve => {
      treeLazyLoadeds.push(row)
      loadMethod({ $table: this, row }).catch(() => []).then(childRecords => {
        rest.treeLoaded = true
        XEUtils.remove(treeLazyLoadeds, item => item === row)
        if (!XEUtils.isArray(childRecords)) {
          childRecords = []
        }
        if (childRecords) {
          this.loadChildren(row, childRecords).then(childRows => {
            if (childRows.length && treeExpandeds.indexOf(row) === -1) {
              treeExpandeds.push(row)
            }
            // 如果当前节点已选中，则展开后子节点也被选中
            if (!checkStrictly && this.isCheckedByCheckboxRow(row)) {
              this.setCheckboxRow(childRows, true)
            }
          })
        }
        resolve(this.$nextTick().then(this.recalculate))
      })
    })
  },
  /**
   * 设置所有树节点的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllTreeExpand (expanded) {
    const { tableFullData, treeOpts } = this
    const { lazy, children } = treeOpts
    const expandeds = []
    XEUtils.eachTree(tableFullData, row => {
      const rowChildren = row[children]
      if (lazy || (rowChildren && rowChildren.length)) {
        expandeds.push(row)
      }
    }, treeOpts)
    return this.setTreeExpand(expandeds, expanded)
  },
  /**
   * 设置展开树形节点，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setTreeExpand (rows, expanded) {
    const { fullAllDataRowMap, tableFullData, treeExpandeds, treeOpts, treeLazyLoadeds, treeNodeColumn } = this
    const { reserve, lazy, hasChild, children, accordion, toggleMethod } = treeOpts
    const result = []
    const columnIndex = this.getColumnIndex(treeNodeColumn)
    const $columnIndex = this.getVMColumnIndex(treeNodeColumn)
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (rows.length) {
        let validRows = toggleMethod ? rows.filter(row => toggleMethod({ expanded, column: treeNodeColumn, columnIndex, $columnIndex, row })) : rows
        if (accordion) {
          validRows = validRows.length ? [validRows[validRows.length - 1]] : []
          // 同一级只能展开一个
          const matchObj = XEUtils.findTree(tableFullData, item => item === validRows[0], treeOpts)
          if (matchObj) {
            XEUtils.remove(treeExpandeds, item => matchObj.items.indexOf(item) > -1)
          }
        }
        if (expanded) {
          validRows.forEach(row => {
            if (treeExpandeds.indexOf(row) === -1) {
              const rest = fullAllDataRowMap.get(row)
              const isLoad = lazy && row[hasChild] && !rest.treeLoaded && treeLazyLoadeds.indexOf(row) === -1
              // 是否使用懒加载
              if (isLoad) {
                result.push(this.handleAsyncTreeExpandChilds(row))
              } else {
                if (row[children] && row[children].length) {
                  treeExpandeds.push(row)
                }
              }
            }
          })
        } else {
          XEUtils.remove(treeExpandeds, row => validRows.indexOf(row) > -1)
        }
        if (reserve) {
          validRows.forEach(row => this.handleTreeExpandReserve(row, expanded))
        }
        return Promise.all(result).then(this.recalculate)
      }
    }
    return this.$nextTick()
  },
  /**
   * 判断行是否为树形节点展开状态
   * @param {Row} row 行对象
   */
  isTreeExpandByRow (row) {
    return this.treeExpandeds.indexOf(row) > -1
  },
  /**
   * 手动清空树形节点的展开状态，数据会恢复成未展开的状态
   */
  clearTreeExpand () {
    const { treeOpts, treeExpandeds, tableFullData } = this
    const { reserve } = treeOpts
    const isExists = treeExpandeds.length
    this.treeExpandeds = []
    if (reserve) {
      XEUtils.eachTree(tableFullData, row => this.handleTreeExpandReserve(row, false), treeOpts)
    }
    return this.$nextTick().then(() => {
      if (isExists) {
        this.recalculate()
      }
    })
  },
  clearTreeExpandReserve () {
    this.treeExpandedReserveRowMap = {}
    return this.$nextTick()
  },
  handleTreeExpandReserve (row, expanded) {
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
  triggerScrollYEvent (evnt) {
    const { scrollYStore } = this
    const { adaptive, offsetSize, visibleSize } = scrollYStore
    // webkit 浏览器使用最佳的渲染方式，且最高渲染量不能大于 40 条
    if (isWebkit && adaptive && (offsetSize * 2 + visibleSize) <= 40) {
      this.loadScrollYData(evnt)
    } else {
      this.debounceScrollY(evnt)
    }
  },
  debounceScrollY: XEUtils.debounce(function (evnt) {
    this.loadScrollYData(evnt)
  }, debounceScrollYDuration, { leading: false, trailing: true }),
  /**
   * 纵向 Y 可视渲染处理
   */
  loadScrollYData (evnt) {
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
    this.handleTableColumn()
    this.updateScrollXSpace()
  },
  // 更新横向 X 可视渲染上下剩余空间大小
  updateScrollXSpace () {
    const { $refs, elemStore, visibleColumn, scrollXStore, scrollXLoad, tableWidth, scrollbarWidth } = this
    const { tableHeader, tableBody, tableFooter } = $refs
    const tableBodyElem = tableBody ? tableBody.$el : null
    if (tableBodyElem) {
      const tableHeaderElem = tableHeader ? tableHeader.$el : null
      const tableFooterElem = tableFooter ? tableFooter.$el : null
      const headerElem = tableHeaderElem ? tableHeaderElem.querySelector('.vxe-table--header') : null
      const bodyElem = tableBodyElem.querySelector('.vxe-table--body')
      const footerElem = tableFooterElem ? tableFooterElem.querySelector('.vxe-table--footer') : null
      const leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous, column) => previous + column.renderWidth, 0)
      let marginLeft = ''
      if (scrollXLoad) {
        marginLeft = `${leftSpaceWidth}px`
      }
      if (headerElem) {
        headerElem.style.marginLeft = marginLeft
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
    this.handleTableData()
    this.updateScrollYSpace()
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
  scrollTo (scrollLeft, scrollTop) {
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
  scrollToRow (row, fieldOrColumn) {
    const rest = []
    if (row) {
      if (this.treeConfig) {
        rest.push(this.scrollToTreeRow(row))
      } else {
        rest.push(DomTools.rowToVisible(this, row))
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
  scrollToColumn (fieldOrColumn) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column && this.fullColumnMap.has(column)) {
      return DomTools.colToVisible(this, column)
    }
    return this.$nextTick()
  },
  /**
   * 对于树形结构中，可以直接滚动到指定深层节点中
   * 对于某些特定的场景可能会用到，比如定位到某一节点
   * @param {Row} row 行对象
   */
  scrollToTreeRow (row) {
    const { tableFullData, treeConfig, treeOpts } = this
    const rests = []
    if (treeConfig) {
      const matchObj = XEUtils.findTree(tableFullData, item => item === row, treeOpts)
      if (matchObj) {
        const nodes = matchObj.nodes
        nodes.forEach((row, index) => {
          if (index < nodes.length - 1 && !this.isTreeExpandByRow(row)) {
            rests.push(this.setTreeExpand(row, true))
          }
        })
      }
    }
    return Promise.all(rests).then(() => DomTools.rowToVisible(this, row))
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
    scrollYStore.startIndex = 0
    return this.$nextTick()
  },
  /**
   * 更新表尾合计
   */
  updateFooter () {
    const { showFooter, visibleColumn, footerMethod } = this
    if (showFooter && footerMethod) {
      this.footerTableData = visibleColumn.length ? footerMethod({ columns: visibleColumn, data: this.afterFullData, $table: this, $grid: this.$xegrid }) : []
    }
    return this.$nextTick()
  },
  /**
   * 更新列状态
   * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
   * 如果单元格配置了校验规则，则会进行校验
   */
  updateStatus (scope, cellValue) {
    const customVal = !XEUtils.isUndefined(cellValue)
    return this.$nextTick().then(() => {
      const { $refs, editRules, validStore } = this
      if (scope && $refs.tableBody && editRules) {
        const { row, column } = scope
        const type = 'change'
        if (this.hasCellRules(type, row, column)) {
          const cell = this.getCell(row, column)
          if (cell) {
            return this.validCellRules(type, row, column, cellValue)
              .then(() => {
                if (customVal && validStore.visible) {
                  setCellValue(row, column, cellValue)
                }
                this.clearValidate()
              })
              .catch(({ rule }) => {
                if (customVal) {
                  setCellValue(row, column, cellValue)
                }
                this.showValidTooltip({ rule, row, column, cell })
              })
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
  setMergeCells (merges) {
    if (this.spanMethod) {
      UtilTools.error('vxe.error.errConflicts', ['merge-cells', 'span-method'])
    }
    setMerges(this, merges, this.mergeList, this.afterFullData)
    return this.$nextTick().then(() => this.updateCellAreas())
  },
  /**
   * 移除单元格合并
   * @param {TableMergeConfig[]} merges 多个或数组 [{row:Row|number, col:ColumnInfo|number}]
   */
  removeMergeCells (merges) {
    if (this.spanMethod) {
      UtilTools.error('vxe.error.errConflicts', ['merge-cells', 'span-method'])
    }
    const rest = removeMerges(this, merges, this.mergeList, this.afterFullData)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
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
    return this.$nextTick()
  },
  handleDefaultMergeFooterItems () {
    this.setMergeFooterItems(this.mergeFooterItems)
  },
  setMergeFooterItems (merges) {
    if (this.footerSpanMethod) {
      UtilTools.error('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
    }
    setMerges(this, merges, this.mergeFooterList, null)
    return this.$nextTick().then(() => this.updateCellAreas())
  },
  removeMergeFooterItems (merges) {
    if (this.footerSpanMethod) {
      UtilTools.error('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
    }
    const rest = removeMerges(this, merges, this.mergeFooterList, null)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
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
    return this.$nextTick()
  },
  updateZindex () {
    if (this.zIndex) {
      this.tZindex = this.zIndex
    } else if (this.tZindex < UtilTools.getLastZIndex()) {
      this.tZindex = UtilTools.nextZIndex()
    }
  },
  updateCellAreas () {
    if (this.mouseConfig && this.mouseOpts.area && this.handleUpdateCellAreas) {
      this.handleUpdateCellAreas()
    }
  },
  emitEvent (type, params, evnt) {
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
  connect ($toolbar) {
    if ($toolbar && $toolbar.syncUpdate) {
      $toolbar.syncUpdate({ collectColumn: this.collectColumn, $table: this })
      this.$toolbar = $toolbar
    } else {
      UtilTools.error('vxe.error.barUnableLink')
    }
    return this.$nextTick()
  },

  /*************************
   * Publish methods
   *************************/
  getCell (row, column) {
    const { $refs } = this
    const rowid = getRowid(this, row)
    const bodyElem = $refs[`${column.fixed || 'table'}Body`] || $refs.tableBody
    if (bodyElem && bodyElem.$el) {
      return bodyElem.$el.querySelector(`.vxe-body--row[rowid="${rowid}"] .${column.id}`)
    }
    return null
  },
  getCellLabel (row, column) {
    const formatter = column.formatter
    const cellValue = UtilTools.getCellValue(row, column)
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
        const globalFunc = formats.get(formatter)
        cellLabel = globalFunc ? globalFunc(formatParams) : ''
      } else if (XEUtils.isArray(formatter)) {
        const globalFunc = formats.get(formatter[0])
        cellLabel = globalFunc ? globalFunc(formatParams, ...formatter.slice(1)) : ''
      } else {
        cellLabel = formatter(formatParams)
      }
      if (formatData) {
        formatData[colid] = { value: cellValue, label: cellLabel }
      }
    }
    return cellLabel
  }
  /*************************
   * Publish methods
   *************************/
}

// Module methods
const funcs = 'setFilter,clearFilter,getCheckedFilters,closeMenu,setActiveCellArea,getActiveCellArea,getCellAreas,clearCellAreas,copyCellArea,cutCellArea,pasteCellArea,getCopyCellArea,clearCopyCellArea,setCellAreas,openFind,openReplace,getSelectedCell,clearSelected,insert,insertAt,remove,removeCheckboxRow,removeRadioRow,removeCurrentRow,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearActived,getActiveRecord,isActiveByRow,setActiveRow,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,openExport,openPrint,exportData,openImport,importData,saveFile,readFile,importByFile,print'.split(',')

funcs.forEach(name => {
  Methods[name] = function (...args) {
    return this[`_${name}`] ? this[`_${name}`](...args) : null
  }
})

export default Methods
