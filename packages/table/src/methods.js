import XEUtils from 'xe-utils/methods/xe-utils'
import Cell from '../../cell'
import VXETable, { Interceptor, Renderer } from '../../v-x-e-table'
import { UtilTools, DomTools } from '../../tools'

var rowUniqueId = 0
var browse = DomTools.browse
var isWebkit = browse['-webkit'] && !browse.edge
var debounceScrollYDuration = browse.msie ? 40 : 20

// 分组表头的属性
const headerProps = {
  children: 'children'
}

/**
 * 生成行的唯一主键
 */
function getRowUniqueId () {
  return `row_${++rowUniqueId}`
}

function isTargetRadioOrCheckbox (evnt, column, colType, targetType) {
  const target = evnt.target
  return target && column.type === colType && target.tagName.toLowerCase() === 'input' && target.type === (targetType || colType)
}

const Methods = {
  /**
   * 获取父容器元素
   */
  getParentElem () {
    return this.$grid ? this.$grid.$el.parentNode : this.$el.parentNode
  },
  /**
   * 获取父容器的高度
   */
  getParentHeight () {
    return this.$grid ? this.$grid.getParentHeight() : this.getParentElem().clientHeight
  },
  /**
   * 获取需要排除的高度
   * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
   * 如果存在表尾合计滚动条，则需要排除滚动条高度
   */
  getExcludeHeight () {
    return this.$grid ? this.$grid.getExcludeHeight() : 0
  },
  /**
   * 重置表格的一切数据状态
   */
  clearAll () {
    this.inited = false
    this.clearSort()
    this.clearCurrentRow()
    this.clearCurrentColumn()
    this.clearCheckboxRow()
    this.clearCheckboxReserve()
    this.clearRowExpand()
    this.clearTreeExpand()
    if (VXETable._edit) {
      this.clearActived()
    }
    if (VXETable._filter) {
      this.clearFilter()
    }
    if (this.keyboardConfig || this.mouseConfig) {
      this.clearIndexChecked()
      this.clearHeaderChecked()
      this.clearChecked()
      this.clearSelected()
      this.clearCopyed()
    }
    return this.clearScroll()
  },
  /**
   * 同步刷新 data 数据
   * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   */
  refreshData () {
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
    let { scrollYLoad, scrollYStore } = this
    let fullData = force ? this.updateAfterFullData() : this.afterFullData
    this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0)
    return this.$nextTick()
  },
  /**
   * 加载表格数据
   * @param {Array} datas 数据
   */
  loadTableData (datas) {
    let { height, maxHeight, showOverflow, treeConfig, editStore, optimizeOpts, scrollYStore } = this
    let { scrollY } = optimizeOpts
    let tableFullData = datas ? datas.slice(0) : []
    let scrollYLoad = !treeConfig && scrollY && scrollY.gt && scrollY.gt < tableFullData.length
    scrollYStore.startIndex = 0
    scrollYStore.visibleIndex = 0
    editStore.insertList = []
    editStore.removeList = []
    // 全量数据
    this.tableFullData = tableFullData
    // 缓存数据
    this.updateCache(true)
    // 原始数据
    this.tableSynchData = datas
    this.tableSourceData = XEUtils.clone(tableFullData, true)
    this.scrollYLoad = scrollYLoad
    if (scrollYLoad && !(height || maxHeight)) {
      UtilTools.error('vxe.error.reqProp', ['height | max-height'])
    }
    if (scrollYLoad && !showOverflow) {
      UtilTools.warn('vxe.error.reqProp', ['show-overflow'])
    }
    this.handleTableData(true)
    return this.computeScrollLoad().then(() => {
      // 是否加载了数据
      this.isLoadData = true
      this.computeRowHeight()
      this.handleReserveStatus()
      this.checkSelectionStatus()
      return this.$nextTick().then(this.recalculate).then(this.refreshScroll)
    })
  },
  /**
   * 重新加载数据，不会清空表格状态
   * @param {Array} datas 数据
   */
  loadData (datas) {
    this.inited = true
    return this.loadTableData(datas).then(this.recalculate)
  },
  /**
   * 重新加载数据，会清空表格状态
   * @param {Array} datas 数据
   */
  reloadData (datas) {
    return this.clearAll()
      .then(() => {
        this.inited = true
        return this.loadTableData(datas)
      })
      .then(this.handleDefaults)
  },
  /**
   * 局部加载行数据并恢复到初始状态
   * 对于行数据需要局部更改的场景中可能会用到
   * @param {Row} row 行对象
   * @param {Object} record 新数据
   * @param {String} field 字段名
   */
  reloadRow (row, record, field) {
    let { tableSourceData, tableData } = this
    let rowIndex = this.getRowIndex(row)
    let oRow = tableSourceData[rowIndex]
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
    return this.$nextTick()
  },
  /**
   * 加载列配置
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnConfig} columns 列配置
   */
  loadColumn (columns) {
    this.collectColumn = XEUtils.mapTree(columns, column => Cell.createColumn(this, column), headerProps)
    return this.$nextTick()
  },
  /**
   * 加载列配置并恢复到初始状态
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnConfig} columns 列配置
   */
  reloadColumn (columns) {
    this.clearAll()
    return this.loadColumn(columns)
  },
  /**
   * 更新数据行的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  updateCache (source) {
    let { treeConfig, treeOpts, tableFullData, fullDataRowIdData, fullDataRowMap, fullAllDataRowMap, fullAllDataRowIdData } = this
    let rowkey = UtilTools.getRowkey(this)
    let isLazy = treeConfig && treeOpts.lazy
    let handleCache = (row, index) => {
      let rowid = UtilTools.getRowid(this, row)
      if (!rowid) {
        rowid = getRowUniqueId()
        XEUtils.set(row, rowkey, rowid)
      }
      if (isLazy && row[treeOpts.hasChild] && XEUtils.isUndefined(row[treeOpts.children])) {
        row[treeOpts.children] = null
      }
      let rest = { row, rowid, index }
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
  appendTreeCache (row, childs) {
    let { tableSourceData, treeOpts, fullDataRowIdData, fullDataRowMap, fullAllDataRowMap, fullAllDataRowIdData } = this
    let { children, hasChild } = treeOpts
    let rowkey = UtilTools.getRowkey(this)
    let rowid = UtilTools.getRowid(this, row)
    let matchObj = XEUtils.findTree(tableSourceData, item => rowid === UtilTools.getRowid(this, item), treeOpts)
    XEUtils.eachTree(childs, (row, index) => {
      let rowid = UtilTools.getRowid(this, row)
      if (!rowid) {
        rowid = getRowUniqueId()
        XEUtils.set(row, rowkey, rowid)
      }
      if (row[hasChild] && XEUtils.isUndefined(row[children])) {
        row[children] = null
      }
      let rest = { row, rowid, index }
      fullDataRowIdData[rowid] = rest
      fullDataRowMap.set(row, rest)
      fullAllDataRowIdData[rowid] = rest
      fullAllDataRowMap.set(row, rest)
    }, treeOpts)
    if (matchObj) {
      matchObj.item[children] = XEUtils.clone(childs, true)
    }
  },
  /**
   * 更新数据列的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  cacheColumnMap () {
    let { isGroup, tableFullColumn, collectColumn, fullColumnMap } = this
    let fullColumnIdData = this.fullColumnIdData = {}
    fullColumnMap.clear()
    if (isGroup) {
      XEUtils.eachTree(collectColumn, (column, index) => {
        if (column.children && column.children.length) {
          let rest = { column, colid: column.id, index }
          fullColumnIdData[column.id] = rest
          fullColumnMap.set(column, rest)
        }
      }, headerProps)
    }
    tableFullColumn.forEach((column, index) => {
      let rest = { column, colid: column.id, index }
      fullColumnIdData[column.id] = rest
      fullColumnMap.set(column, rest)
    }, headerProps)
  },
  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param {Element} tr 元素
   */
  getRowNode (tr) {
    if (tr) {
      let { treeConfig, treeOpts, tableFullData, fullAllDataRowIdData } = this
      let rowid = tr.getAttribute('data-rowid')
      if (treeConfig) {
        let matchObj = XEUtils.findTree(tableFullData, row => UtilTools.getRowid(this, row) === rowid, treeOpts)
        if (matchObj) {
          return matchObj
        }
      } else {
        if (fullAllDataRowIdData[rowid]) {
          let rest = fullAllDataRowIdData[rowid]
          return { item: rest.row, index: rest.index, items: tableFullData }
        }
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
      let { fullColumnIdData, tableFullColumn } = this
      let colid = cell.getAttribute('data-colid')
      let { column, index } = fullColumnIdData[colid]
      return { item: column, index, items: tableFullColumn }
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
   * 根据 row 获取渲染中的虚拟索引
   * @param {Row} row 行对象
   */
  $getRowIndex (row) {
    return this.afterFullData.indexOf(row)
  },
  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param {ColumnConfig} column 列配置
   */
  getColumnIndex (column) {
    return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1
  },
  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param {ColumnConfig} column 列配置
   */
  $getColumnIndex (column) {
    return this.visibleColumn.indexOf(column)
  },
  /**
   * 判断是否为索引列
   * @param {ColumnConfig} column 列配置
   */
  isSeqColumn (column) {
    return column && (column.type === 'seq' || column.type === 'index')
  },
  /**
   * 定义行数据中的列属性，如果不存在则定义
   * @param {Row} row 行数据
   */
  defineField (row) {
    let { treeConfig, treeOpts } = this
    let rowkey = UtilTools.getRowkey(this)
    this.visibleColumn.forEach(({ property, editRender }) => {
      if (property && !XEUtils.has(row, property)) {
        XEUtils.set(row, property, editRender && !XEUtils.isUndefined(editRender.defaultValue) ? editRender.defaultValue : null)
      }
    })
    if (treeConfig && treeOpts.lazy && XEUtils.isUndefined(row[treeOpts.children])) {
      row[treeOpts.children] = null
    }
    // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数
    if (!XEUtils.get(row, rowkey)) {
      XEUtils.set(row, rowkey, getRowUniqueId())
    }
    return row
  },
  /**
   * 创建 data 对象
   * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
   * @param {Array} records 新数据
   */
  createData (records) {
    return this.$nextTick().then(() => records.map(this.defineField))
  },
  /**
   * 创建 Row|Rows 对象
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param {Array/Object} records 新数据
   */
  createRow (records) {
    let isArr = XEUtils.isArray(records)
    if (!isArr) {
      records = [records]
    }
    return this.$nextTick().then(() => {
      let rows = records.map(record => this.defineField(Object.assign({}, record)))
      return isArr ? rows : rows[0]
    })
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
    let { tableFullData, visibleColumn } = this
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
            UtilTools.setCellValue(row, column, null)
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
  // 在 v3.0 中废弃 hasRowChange
  hasRowChange (row, field) {
    UtilTools.warn('vxe.error.delFunc', ['hasRowChange', 'isUpdateByRow'])
    return this.isUpdateByRow(row, field)
  },
  /**
   * 检查行或列数据是否发生改变
   * @param {Row} row 行对象
   * @param {String} field 字段名
   */
  isUpdateByRow (row, field) {
    let oRow, property
    let { visibleColumn, treeConfig, treeOpts, tableSourceData, fullDataRowIdData } = this
    let rowid = UtilTools.getRowid(this, row)
    // 新增的数据不需要检测
    if (!fullDataRowIdData[rowid]) {
      return false
    }
    if (treeConfig) {
      let children = treeOpts.children
      let matchObj = XEUtils.findTree(tableSourceData, item => rowid === UtilTools.getRowid(this, item), treeOpts)
      row = Object.assign({}, row, { [ children ]: null })
      if (matchObj) {
        oRow = Object.assign({}, matchObj.item, { [ children ]: null })
      }
    } else {
      let oRowIndex = fullDataRowIdData[rowid].index
      oRow = tableSourceData[oRowIndex]
    }
    if (oRow) {
      if (arguments.length > 1) {
        return !XEUtils.isEqual(XEUtils.get(oRow, field), XEUtils.get(row, field))
      }
      for (let index = 0, len = visibleColumn.length; index < len; index++) {
        property = visibleColumn[index].property
        if (property && !XEUtils.isEqual(XEUtils.get(oRow, property), XEUtils.get(row, property))) {
          return true
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
    let columns = this.visibleColumn
    return arguments.length ? columns[columnIndex] : columns.slice(0)
  },
  /**
   * 根据列的唯一主键获取列
   * @param {String} colid 列主键
   */
  getColumnById (colid) {
    let fullColumnIdData = this.fullColumnIdData
    return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null
  },
  /**
   * 根据列的字段名获取列
   * @param {String} field 字段名
   */
  getColumnByField (field) {
    return XEUtils.find(this.tableFullColumn, column => column.property === field)
  },
  /**
   * 获取当前表格的列
   * 完整的全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
   */
  getTableColumn () {
    return { fullColumn: this.tableFullColumn.slice(0), visibleColumn: this.visibleColumn.slice(0), tableColumn: this.tableColumn.slice(0) }
  },
  // 在 v3.0 中废弃 getRecords
  getRecords () {
    UtilTools.warn('vxe.error.delFunc', ['getRecords', 'getData'])
    return this.getData.apply(this, arguments)
  },
  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData (rowIndex) {
    let tableSynchData = this.data || this.tableSynchData
    return arguments.length ? tableSynchData[rowIndex] : tableSynchData.slice(0)
  },
  // 在 v3.0 中废弃 getAllRecords
  getAllRecords () {
    UtilTools.warn('vxe.error.delFunc', ['getAllRecords', 'getRecordset'])
    return this.getRecordset()
  },
  // 在 v3.0 中废弃 getSelectRecords
  getSelectRecords () {
    // UtilTools.warn('vxe.error.delFunc', ['getSelectRecords', 'getCheckboxRecords'])
    return this.getCheckboxRecords()
  },
  /**
   * 用于多选行，获取已选中的数据
   */
  getCheckboxRecords () {
    let { tableFullData, treeConfig, treeOpts, checkboxOpts } = this
    let { checkField: property } = checkboxOpts
    let rowList = []
    if (property) {
      if (treeConfig) {
        rowList = XEUtils.filterTree(tableFullData, row => XEUtils.get(row, property), treeOpts)
      } else {
        rowList = tableFullData.filter(row => XEUtils.get(row, property))
      }
    } else {
      let { selection } = this
      if (treeConfig) {
        rowList = XEUtils.filterTree(tableFullData, row => selection.indexOf(row) > -1, treeOpts)
      } else {
        rowList = tableFullData.filter(row => selection.indexOf(row) > -1)
      }
    }
    return rowList
  },
  /**
   * 获取处理后全量的表格数据
   * 如果存在筛选条件，继续处理
   */
  updateAfterFullData () {
    let { visibleColumn, tableFullData, remoteSort, remoteFilter, filterOpts, sortOpts } = this
    let tableData = tableFullData.slice(0)
    let column = XEUtils.find(visibleColumn, column => column.order)
    let filterColumns = []
    visibleColumn.forEach(column => {
      if (column.filters && column.filters.length) {
        let valueList = []
        let itemList = []
        column.filters.forEach(item => {
          if (item.checked) {
            itemList.push(item)
            valueList.push(item.value)
          }
        })
        filterColumns.push({ column, valueList, itemList })
      }
    })
    if (filterColumns.length) {
      tableData = tableData.filter(row => {
        return filterColumns.every(({ column, valueList, itemList }) => {
          if (valueList.length && !(filterOpts.remote || remoteFilter)) {
            let { filterRender, property, filterMethod } = column
            let compConf = filterRender ? Renderer.get(filterRender.name) : null
            if (!filterMethod && compConf && compConf.renderFilter) {
              filterMethod = compConf.filterMethod
            }
            return filterMethod ? itemList.some(item => filterMethod({ value: item.value, option: item, row, column })) : valueList.indexOf(XEUtils.get(row, property)) > -1
          }
          return true
        })
      })
    }
    if (column && column.order) {
      let allSortMethod = sortOpts.sortMethod || this.sortMethod
      let isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : (sortOpts.remote || remoteSort)
      if (!isRemote) {
        if (allSortMethod) {
          tableData = allSortMethod({ data: tableData, column, property: column.property, order: column.order, $table: this }) || tableData
        } else {
          let rest = column.sortMethod ? tableData.sort(column.sortMethod) : XEUtils.sortBy(tableData, column.property)
          tableData = column.order === 'desc' ? rest.reverse() : rest
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
    let fullDataRowIdData = this.fullDataRowIdData
    return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null
  },
  /**
   * 根据行获取行的唯一主键
   * @param {Row} row 行对象
   */
  getRowid (row) {
    let fullAllDataRowMap = this.fullAllDataRowMap
    return fullAllDataRowMap.has(row) ? fullAllDataRowMap.get(row).rowid : null
  },
  /**
   * 获取处理后的表格数据
   * 如果存在筛选条件，继续处理
   * 如果存在排序，继续处理
   */
  getTableData () {
    let { tableFullData, afterFullData, tableData, footerData } = this
    return {
      fullData: tableFullData.slice(0),
      visibleData: afterFullData.slice(0),
      tableData: tableData.slice(0),
      footerData: footerData.slice(0)
    }
  },
  /**
   * 默认行为只允许执行一次
   */
  handleDefaults () {
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig
    if (checkboxConfig) {
      this.handleDefaultSelectionChecked()
    }
    if (this.radioConfig) {
      this.handleDefaultRadioChecked()
    }
    if (this.sortConfig) {
      this.handleDefaultSort()
    }
    if (this.expandConfig) {
      this.handleDefaultRowExpand()
    }
    if (this.treeConfig) {
      this.handleDefaultTreeExpand()
    }
    this.updateFooter()
    this.$nextTick(() => setTimeout(this.recalculate))
  },
  /**
   * 动态列处理
   */
  mergeCustomColumn (customColumns) {
    let { tableFullColumn } = this
    this.isUpdateCustoms = true
    if (customColumns.length) {
      tableFullColumn.forEach(column => {
        // 在 v3.0 中废弃 prop
        let item = XEUtils.find(customColumns, item => column.property && (item.field || item.prop) === column.property)
        if (item) {
          if (XEUtils.isNumber(item.resizeWidth)) {
            column.resizeWidth = item.resizeWidth
          }
          if (XEUtils.isBoolean(item.visible)) {
            column.visible = item.visible
          }
        }
      })
    }
    this.$emit('update:customs', tableFullColumn)
  },
  /**
   * 手动重置列的所有操作，还原到初始状态
   * 如果已关联工具栏，则会同步更新
   */
  resetAll () {
    this.resetCustoms()
    this.resetResizable()
  },
  /**
   * 隐藏指定列
   * @param {ColumnConfig} column 列配置
   */
  hideColumn (column) {
    return this.handleVisibleColumn(column, false)
  },
  /**
   * 显示指定列
   * @param {ColumnConfig} column 列配置
   */
  showColumn (column) {
    return this.handleVisibleColumn(column, true)
  },
  /**
   * 手动重置列的显示/隐藏操作，还原到初始状态
   * 如果已关联工具栏，则会同步更新
   */
  resetCustoms () {
    return this.handleVisibleColumn()
  },
  handleVisibleColumn (column, visible) {
    if (arguments.length) {
      column.visible = visible
    } else {
      this.tableFullColumn.forEach(column => {
        column.visible = true
      })
    }
    if (this.$toolbar) {
      this.$toolbar.handleCustoms()
    }
    return this.$nextTick()
  },
  /**
   * 初始化加载显示/隐藏列
   * 对于异步更新的场景下可能会用到
   * @param {Array} customColumns 自定义列数组
   */
  reloadCustoms (customColumns) {
    return this.$nextTick().then(() => {
      this.mergeCustomColumn(customColumns)
      return this.refreshColumn().then(() => this.tableFullColumn)
    })
  },
  /**
   * 刷新列信息
   * 将固定的列左边、右边分别靠边
   * 如果使用了分组表头，固定列必须在左侧或者右侧
   */
  refreshColumn () {
    let isColspan
    let letIndex = 0
    let leftList = []
    let leftStartIndex = null
    let rightEndIndex = null
    let centerList = []
    let rightList = []
    let { tableFullColumn, isGroup, columnStore, scrollXStore, optimizeOpts } = this
    let { scrollX } = optimizeOpts
    // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏
    if (isGroup) {
      XEUtils.eachTree(this.collectColumn, column => {
        if (column.children && column.children.length) {
          column.visible = !!XEUtils.findTree(column.children, subColumn => subColumn.children && subColumn.children.length ? 0 : subColumn.visible, headerProps)
        }
      }, headerProps)
    }
    // 重新分配列
    tableFullColumn.filter(column => column.visible).forEach((column, columnIndex) => {
      if (column.fixed === 'left') {
        if (leftStartIndex === null) {
          leftStartIndex = letIndex
        }
        if (!isColspan) {
          if (columnIndex - letIndex !== 0) {
            isColspan = true
          } else {
            letIndex++
          }
        }
        leftList.push(column)
      } else if (column.fixed === 'right') {
        if (!isColspan) {
          if (rightEndIndex === null) {
            rightEndIndex = columnIndex
          }
          if (columnIndex - rightEndIndex !== 0) {
            isColspan = true
          } else {
            rightEndIndex++
          }
        }
        rightList.push(column)
      } else {
        centerList.push(column)
      }
    })
    let visibleColumn = leftList.concat(centerList).concat(rightList)
    let scrollXLoad = scrollX && scrollX.gt && scrollX.gt < tableFullColumn.length
    Object.assign(columnStore, { leftList, centerList, rightList })
    if (isGroup && (isColspan || leftStartIndex || (rightEndIndex !== null && rightEndIndex !== visibleColumn.length))) {
      UtilTools.error('vxe.error.groupFixed')
    }
    if (scrollXLoad) {
      if (this.isGroup) {
        UtilTools.warn('vxe.error.scrollXNotGroup')
      }
      if (this.showHeader && !this.showHeaderOverflow) {
        UtilTools.warn('vxe.error.reqProp', ['show-header-overflow'])
      }
      // if (this.resizable || visibleColumn.some(column => column.resizable)) {
      //   UtilTools.warn('vxe.error.scrollXNotResizable')
      // }
      Object.assign(scrollXStore, {
        startIndex: 0,
        visibleIndex: 0
      })
      visibleColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize)
    }
    this.scrollXLoad = scrollXLoad
    this.tableColumn = visibleColumn
    return this.$nextTick().then(() => {
      this.updateFooter()
      this.recalculate(true)
    })
  },
  /**
   * 指定列宽的列进行拆分
   */
  analyColumnWidth () {
    let { columnWidth, columnMinWidth } = this
    let resizeList = []
    let pxList = []
    let pxMinList = []
    let scaleList = []
    let scaleMinList = []
    let autoList = []
    this.tableFullColumn.forEach(column => {
      if (columnWidth && !column.width) {
        column.width = columnWidth
      }
      if (columnMinWidth && !column.minWidth) {
        column.minWidth = columnMinWidth
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
    this.clearScroll()
    return this.$nextTick().then(() => {
      if (lastScrollLeft || lastScrollTop) {
        // 重置最后滚动状态
        this.lastScrollLeft = 0
        this.lastScrollTop = 0
        // 还原滚动状态
        return this.scrollTo(lastScrollLeft, lastScrollTop)
      }
    })
  },
  /**
   * 计算单元格列宽，动态分配可用剩余空间
   * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
   */
  recalculate (refull) {
    let { $refs } = this
    let { tableBody, tableHeader, tableFooter } = $refs
    let bodyElem = tableBody ? tableBody.$el : null
    let headerElem = tableHeader ? tableHeader.$el : null
    let footerElem = tableFooter ? tableFooter.$el : null
    if (bodyElem) {
      this.autoCellWidth(headerElem, bodyElem, footerElem)
      if (refull === true) {
        // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
        return this.computeScrollLoad().then(() => {
          this.autoCellWidth(headerElem, bodyElem, footerElem)
          this.computeScrollLoad()
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
    let meanWidth
    let tableWidth = 0
    let minCellWidth = 40 // 列宽最少限制 40px
    let bodyWidth = bodyElem.clientWidth
    let remainWidth = bodyWidth
    let { fit, columnStore } = this
    let { resizeList, pxMinList, pxList, scaleList, scaleMinList, autoList } = columnStore
    // 最小宽
    pxMinList.forEach(column => {
      let minWidth = parseInt(column.minWidth)
      tableWidth += minWidth
      column.renderWidth = minWidth
    })
    // 最小百分比
    meanWidth = remainWidth / 100
    scaleMinList.forEach(column => {
      let scaleWidth = Math.floor(parseInt(column.minWidth) * meanWidth)
      tableWidth += scaleWidth
      column.renderWidth = scaleWidth
    })
    // 固定百分比
    scaleList.forEach(column => {
      let scaleWidth = Math.floor(parseInt(column.width) * meanWidth)
      tableWidth += scaleWidth
      column.renderWidth = scaleWidth
    })
    // 固定宽
    pxList.forEach(column => {
      let width = parseInt(column.width)
      tableWidth += width
      column.renderWidth = width
    })
    // 调整了列宽
    resizeList.forEach(column => {
      let width = parseInt(column.resizeWidth)
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
    autoList.forEach((column, index) => {
      let width = Math.max(meanWidth, minCellWidth)
      column.renderWidth = width
      tableWidth += width
    })
    if (fit) {
      /**
       * 偏移量算法
       * 如果所有列足够放的情况下，从最后动态列开始分配
       */
      let dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoList)
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
    let tableHeight = bodyElem.offsetHeight
    let overflowY = bodyElem.scrollHeight > bodyElem.clientHeight
    this.scrollbarWidth = overflowY ? bodyElem.offsetWidth - bodyWidth : 0
    this.overflowY = overflowY
    this.tableWidth = tableWidth
    this.tableHeight = tableHeight
    this.isCoverBody = tableWidth >= bodyWidth - 2
    this.parentHeight = this.getParentHeight()
    if (headerElem) {
      this.headerHeight = headerElem.clientHeight
      // 检测是否同步滚动
      if (headerElem.scrollLeft !== bodyElem.scrollLeft) {
        headerElem.scrollLeft = bodyElem.scrollLeft
      }
    }
    if (footerElem) {
      let footerHeight = footerElem.offsetHeight
      this.scrollbarHeight = Math.max(footerHeight - footerElem.clientHeight, 0)
      this.overflowX = tableWidth > footerElem.clientWidth
      this.footerHeight = footerHeight
    } else {
      this.scrollbarHeight = Math.max(tableHeight - bodyElem.clientHeight, 0)
      this.overflowX = tableWidth > bodyWidth
    }
    if (this.overflowX) {
      this.checkScrolling()
    }
  },
  /**
   * 手动重置列宽拖动的操作，还原到初始状态
   * 如果已关联工具栏，则会同步更新
   */
  resetResizable () {
    this.tableFullColumn.forEach(column => {
      column.resizeWidth = 0
    })
    if (this.$toolbar) {
      this.$toolbar.resetResizable()
    }
    this.analyColumnWidth()
    return this.recalculate(true)
  },
  /**
   * 放弃 vue 的双向 dom 绑定，使用原生的方式更新 Dom，性能翻倍提升
   */
  updateStyle () {
    let {
      $refs,
      isGroup,
      fullColumnIdData,
      maxHeight,
      height,
      parentHeight,
      border,
      tableColumn,
      headerHeight,
      showHeaderOverflow: allColumnHeaderOverflow,
      showFooter,
      showOverflow: allColumnOverflow,
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
      mouseConfig
    } = this
    let containerList = ['main', 'left', 'right']
    let customHeight = 0
    if (height) {
      customHeight = height === 'auto' ? parentHeight : ((DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : XEUtils.toNumber(height)) - this.getExcludeHeight())
      if (showFooter) {
        customHeight += scrollbarHeight + 1
      }
    }
    let emptyPlaceholderElem = $refs.emptyPlaceholder
    if (emptyPlaceholderElem) {
      emptyPlaceholderElem.style.top = height ? '' : `${headerHeight}px`
    }
    containerList.forEach((name, index) => {
      let fixedType = index > 0 ? name : ''
      let layoutList = ['header', 'body', 'footer']
      let fixedColumn = columnStore[`${fixedType}List`]
      let fixedWrapperElem = $refs[`${fixedType}Container`]
      layoutList.forEach(layout => {
        let wrapperElem = elemStore[`${name}-${layout}-wrapper`]
        let tableElem = elemStore[`${name}-${layout}-table`]
        if (layout === 'header') {
          // 表头体样式处理
          // 横向滚动渲染
          let tWidth = tableWidth
          if (scrollXLoad) {
            if (fixedType) {
              tableColumn = fixedColumn
            }
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

          let repairElem = elemStore[`${name}-${layout}-repair`]
          if (repairElem) {
            repairElem.style.width = `${tableWidth}px`
          }

          let listElem = elemStore[`${name}-${layout}-list`]
          if (isGroup && listElem) {
            // XEUtils.arrayEach(listElem.querySelectorAll(`.col--gutter`), thElem => {
            //   thElem.style.width = `${scrollbarWidth}px`
            // })
            XEUtils.arrayEach(listElem.querySelectorAll(`.col--group`), thElem => {
              let column = this.getColumnNode(thElem).item
              let { showHeaderOverflow } = column
              let cellOverflow = XEUtils.isBoolean(showHeaderOverflow) ? showHeaderOverflow : allColumnHeaderOverflow
              let showEllipsis = cellOverflow === 'ellipsis'
              let showTitle = cellOverflow === 'title'
              let showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
              let hasEllipsis = showTitle || showTooltip || showEllipsis
              let childWidth = 0
              let countChild = 0
              if (hasEllipsis) {
                XEUtils.eachTree(column.children, item => {
                  if (!item.children || !column.children.length) {
                    countChild++
                  }
                  childWidth += item.renderWidth
                })
                thElem.style.width = `${childWidth - countChild - (border ? 2 : 0)}px`
              }
            })
          }
        } else if (layout === 'body') {
          let emptyBlockElem = elemStore[`${name}-${layout}-emptyBlock`]
          if (wrapperElem) {
            if (maxHeight) {
              maxHeight = maxHeight === 'auto' ? parentHeight : (DomTools.isScale(maxHeight) ? Math.floor(parseInt(maxHeight) / 100 * parentHeight) : XEUtils.toNumber(maxHeight))
              wrapperElem.style.maxHeight = `${fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : maxHeight - headerHeight}px`
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
            let isRightFixed = fixedType === 'right'
            let fixedColumn = columnStore[`${fixedType}List`]
            wrapperElem.style.top = `${headerHeight}px`
            fixedWrapperElem.style.height = `${(customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1)}px`
            fixedWrapperElem.style.width = `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, isRightFixed ? scrollbarWidth : 0) - (border === true ? 1 : 0)}px`
          }

          let tWidth = tableWidth
          // 如果是固定列与设置了超出隐藏
          if (fixedType && allColumnOverflow) {
            tableColumn = fixedColumn
            tWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
          } else if (scrollXLoad) {
            if (fixedType) {
              tableColumn = fixedColumn
            }
            tWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
          }

          if (tableElem) {
            tableElem.style.width = tWidth ? `${tWidth}px` : ''
            // 兼容性处理
            tableElem.style.paddingRight = scrollbarWidth && fixedType && (browse['-moz'] || browse['safari']) ? `${scrollbarWidth}px` : ''
          }
          if (emptyBlockElem) {
            emptyBlockElem.style.width = tWidth ? `${tWidth}px` : ''
          }
        } else if (layout === 'footer') {
          // 如果是使用优化模式
          let tWidth = tableWidth
          if (fixedType && allColumnOverflow) {
            tableColumn = fixedColumn
            tWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
          } else if (scrollXLoad) {
            if (fixedType) {
              tableColumn = fixedColumn
            }
            tWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
          }
          if (wrapperElem) {
            // 如果是固定列
            if (fixedWrapperElem) {
              wrapperElem.style.top = `${customHeight > 0 ? customHeight - footerHeight : tableHeight + headerHeight}px`
            }
            wrapperElem.style.marginTop = `${-scrollbarHeight - 1}px`
          }
          if (tableElem) {
            tableElem.style.width = tWidth ? `${tWidth + scrollbarWidth}px` : ''
          }
          // let listElem = elemStore[`${name}-${layout}-list`]
          // if (listElem) {
          //   XEUtils.arrayEach(listElem.querySelectorAll(`.col--gutter`), thElem => {
          //     thElem.style.width = `${scrollbarWidth}px`
          //   })
          // }
        }
        let colgroupElem = elemStore[`${name}-${layout}-colgroup`]
        if (colgroupElem) {
          XEUtils.arrayEach(colgroupElem.children, colElem => {
            let colid = colElem.getAttribute('name')
            if (colid === 'col_gutter') {
              colElem.style.width = `${scrollbarWidth}px`
            }
            if (fullColumnIdData[colid]) {
              let column = fullColumnIdData[colid].column
              let { showHeaderOverflow, showOverflow } = column
              let cellOverflow
              colElem.style.width = `${column.renderWidth}px`
              if (layout === 'header') {
                cellOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
              } else {
                cellOverflow = XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow) ? allColumnOverflow : showOverflow
              }
              let showEllipsis = cellOverflow === 'ellipsis'
              let showTitle = cellOverflow === 'title'
              let showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
              let hasEllipsis = showTitle || showTooltip || showEllipsis
              let listElem = elemStore[`${name}-${layout}-list`]
              // 滚动的渲染不支持动态行高
              if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
                hasEllipsis = true
              }
              if (listElem && hasEllipsis) {
                XEUtils.arrayEach(listElem.querySelectorAll(`.${column.id}`), elem => {
                  let colspan = parseInt(elem.getAttribute('colspan') || 1)
                  let cellElem = elem.querySelector('.vxe-cell')
                  let colWidth = column.renderWidth
                  if (cellElem) {
                    if (colspan > 1) {
                      let columnIndex = this.getColumnIndex(column)
                      for (let index = 1; index < colspan; index++) {
                        let nextColumn = this.getColumns(columnIndex + index)
                        if (nextColumn) {
                          colWidth += nextColumn.renderWidth
                        }
                      }
                    }
                    cellElem.style.width = `${colWidth - (cellOffsetWidth * colspan)}px`
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
    let { tableBody, leftContainer, rightContainer } = this.$refs
    let bodyElem = tableBody ? tableBody.$el : null
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
    let evntList = Interceptor.get(type)
    let rest
    if (!evntList.some(func => func(args, evnt, this) === false)) {
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
    let { $el, $refs, mouseConfig, mouseOpts, editStore, ctxMenuStore, editOpts, filterStore, getRowNode } = this
    let { actived } = editStore
    let { filterWrapper, validTip } = $refs
    if (filterWrapper) {
      if (DomTools.getEventTargetNode(evnt, $el, 'vxe-filter-wrapper').flag) {
        // 如果点击了筛选按钮
      } else if (DomTools.getEventTargetNode(evnt, filterWrapper.$el).flag) {
        // 如果点击筛选容器
      } else {
        this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter)
      }
    }
    // 如果已激活了编辑状态
    if (actived.row) {
      if (!(editOpts.autoClear === false)) {
        if (validTip && DomTools.getEventTargetNode(evnt, validTip.$el).flag) {
          // 如果是激活状态，且点击了校验提示框
        } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
          // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
          this.preventEvent(evnt, 'event.clearActived', actived.args, () => {
            let isClear
            if (editOpts.mode === 'row') {
              let rowNode = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--row')
              // row 方式，如果点击了不同行
              isClear = rowNode.flag ? getRowNode(rowNode.targetElem).item !== getRowNode(actived.args.cell.parentNode).item : false
            } else {
              // cell 方式，如果是非编辑列
              isClear = !DomTools.getEventTargetNode(evnt, $el, 'col--edit').flag
            }
            if (!isClear) {
              isClear = DomTools.getEventTargetNode(evnt, $el, 'vxe-header--row').flag
            }
            if (!isClear) {
              isClear = DomTools.getEventTargetNode(evnt, $el, 'vxe-footer--row').flag
            }
            if (
              isClear ||
                // 如果点击了当前表格之外
                !DomTools.getEventTargetNode(evnt, $el).flag
            ) {
              setTimeout(() => this.clearActived(evnt))
            }
          })
        }
      }
    } else if (mouseConfig) {
      if (!DomTools.getEventTargetNode(evnt, $el).flag) {
        if (mouseOpts.checked) {
          this.clearIndexChecked()
          this.clearHeaderChecked()
          this.clearChecked()
        }
        this.clearSelected()
      }
    }
    // 如果配置了快捷菜单且，点击了其他地方则关闭
    if (ctxMenuStore.visible && this.$refs.ctxWrapper && !DomTools.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
      this.closeMenu()
    }
    // 最后激活的表格
    this.isActivated = DomTools.getEventTargetNode(evnt, (this.$grid || this).$el).flag
  },
  /**
   * 窗口失焦事件处理
   */
  handleGlobalBlurEvent (evnt) {
    this.closeFilter()
    this.closeMenu()
  },
  /**
   * 全局滚动事件
   */
  handleGlobalMousewheelEvent (evnt) {
    this.clostTooltip()
    this.closeMenu()
  },
  /**
   * 全局键盘事件
   */
  handleGlobalKeydownEvent (evnt) {
    // 该行为只对当前激活的表格有效
    if (this.isActivated) {
      this.preventEvent(evnt, 'event.keydown', { $table: this }, () => {
        let { isCtxMenu, ctxMenuStore, editStore, mouseConfig = {}, keyboardConfig = {}, treeConfig, treeOpts, highlightCurrentRow, currentRow } = this
        let { selected, actived } = editStore
        let keyCode = evnt.keyCode
        let isBack = keyCode === 8
        let isTab = keyCode === 9
        let isEnter = keyCode === 13
        let isEsc = keyCode === 27
        let isSpacebar = keyCode === 32
        let isLeftArrow = keyCode === 37
        let isUpArrow = keyCode === 38
        let isRightArrow = keyCode === 39
        let isDwArrow = keyCode === 40
        let isDel = keyCode === 46
        let isA = keyCode === 65
        let isC = keyCode === 67
        let isV = keyCode === 86
        let isX = keyCode === 88
        let isF2 = keyCode === 113
        let isCtrlKey = evnt.ctrlKey
        let isShiftKey = evnt.shiftKey
        let operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
        let operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow)
        let params
        if (isEsc) {
          // 如果按下了 Esc 键，关闭快捷菜单、筛选
          this.closeMenu()
          this.closeFilter()
          // 如果是激活编辑状态，则取消编辑
          if (actived.row) {
            params = actived.args
            this.clearActived(evnt)
            // 如果配置了选中功能，则为选中状态
            if (mouseConfig.selected) {
              this.$nextTick(() => this.handleSelected(params, evnt))
            }
          }
        } else if (isSpacebar && (keyboardConfig.isArrow || keyboardConfig.isTab) && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'selection' || selected.column.type === 'radio')) {
          // 在 v3.0 中废弃 type=selection
          // 空格键支持选中复选列
          evnt.preventDefault()
          // 在 v3.0 中废弃 type=selection
          if (selected.column.type === 'checkbox' || selected.column.type === 'selection') {
            this.handleToggleCheckRowEvent(selected.args, evnt)
          } else {
            this.triggerRadioRowEvent(evnt, selected.args)
          }
        } else if (isEnter && keyboardConfig.isEnter && (selected.row || actived.row || (treeConfig && highlightCurrentRow && currentRow))) {
          // 如果是激活状态，退则出到下一行
          if (selected.row || actived.row) {
            this.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, isUpArrow, isRightArrow, true, evnt)
          } else if (treeConfig && highlightCurrentRow && currentRow) {
            // 如果是树形表格当前行回车移动到子节点
            let childrens = currentRow[treeOpts.children]
            if (childrens && childrens.length) {
              evnt.preventDefault()
              let targetRow = childrens[0]
              params = { $table: this, row: targetRow }
              this.setTreeExpansion(currentRow, true)
                .then(() => this.scrollToRow(targetRow))
                .then(() => this.triggerCurrentRowEvent(evnt, params))
            }
          }
        } else if (operCtxMenu) {
          // 如果配置了右键菜单; 支持方向键操作、回车
          evnt.preventDefault()
          if (ctxMenuStore.showChild && UtilTools.hasChildrenList(ctxMenuStore.selected)) {
            this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children)
          } else {
            this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, this.ctxMenuList)
          }
        } else if (isF2) {
          // 如果按下了 F2 键
          if (selected.row && selected.column) {
            evnt.preventDefault()
            this.handleActived(selected.args, evnt)
          }
        } else if (operArrow && keyboardConfig.isArrow) {
          // 如果按下了方向键
          if (selected.row && selected.column) {
            this.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt)
          } else if ((isUpArrow || isDwArrow) && highlightCurrentRow && currentRow) {
            // 当前行按键上下移动
            this.moveCurrentRow(isUpArrow, isDwArrow, evnt)
          }
        } else if (isTab && keyboardConfig.isTab) {
          // 如果按下了 Tab 键切换
          if (selected.row || selected.column) {
            this.moveTabSelected(selected.args, isShiftKey, evnt)
          } else if (actived.row || actived.column) {
            this.moveTabSelected(actived.args, isShiftKey, evnt)
          }
        } else if (isDel || (treeConfig && highlightCurrentRow && currentRow ? isBack && keyboardConfig.isArrow : isBack)) {
          // 如果是删除键
          if (keyboardConfig.isDel && (selected.row || selected.column)) {
            UtilTools.setCellValue(selected.row, selected.column, null)
            if (isBack) {
              this.handleActived(selected.args, evnt)
            }
          } else if (isBack && keyboardConfig.isArrow && treeConfig && highlightCurrentRow && currentRow) {
            // 如果树形表格回退键关闭当前行返回父节点
            let { parent: parentRow } = XEUtils.findTree(this.afterFullData, item => item === currentRow, treeOpts)
            if (parentRow) {
              evnt.preventDefault()
              params = { $table: this, row: parentRow }
              this.setTreeExpansion(parentRow, false)
                .then(() => this.scrollToRow(parentRow))
                .then(() => this.triggerCurrentRowEvent(evnt, params))
            }
          }
        } else if (keyboardConfig.isCut && isCtrlKey && (isA || isX || isC || isV)) {
          // 如果开启复制功能
          if (isA) {
            this.handleAllChecked(evnt)
          } else if (isX || isC) {
            this.handleCopyed(isX, evnt)
          } else {
            this.handlePaste(evnt)
          }
        } else if (keyboardConfig.isEdit && !isCtrlKey && ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222) || keyCode === 32)) {
          // 如果是按下非功能键之外允许直接编辑
          if (selected.column && selected.row && selected.column.editRender) {
            if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
              UtilTools.setCellValue(selected.row, selected.column, null)
              this.handleActived(selected.args, evnt)
            }
          }
        }
      })
    }
  },
  handleGlobalResizeEvent () {
    this.closeMenu()
    this.recalculate()
  },
  handleTooltipLeaveEvent (evnt) {
    let tooltipOpts = this.tooltipOpts
    setTimeout(() => {
      if (!this.tooltipActive) {
        this.clostTooltip()
      }
    }, tooltipOpts.leaveDelay)
  },
  handleTargetEnterEvent (evnt) {
    clearTimeout(this.tooltipTimeout)
    this.tooltipActive = true
    this.clostTooltip()
  },
  handleTargetLeaveEvent (evnt) {
    let tooltipOpts = this.tooltipOpts
    this.tooltipActive = false
    if (tooltipOpts.enterable) {
      this.tooltipTimeout = setTimeout(() => {
        if (!this.$refs.tooltip.isHover) {
          this.clostTooltip()
        }
      }, tooltipOpts.leaveDelay)
    } else {
      this.clostTooltip()
    }
  },
  /**
   * 触发表头 tooltip 事件
   */
  triggerHeaderTooltipEvent (evnt, params) {
    let { tooltipStore } = this
    let { column } = params
    this.handleTargetEnterEvent()
    if (tooltipStore.column !== column || !tooltipStore.visible) {
      // 在 v3.0 中废弃 label
      this.handleTooltip(evnt, column)
    }
  },
  /**
   * 触发表尾 tooltip 事件
   */
  triggerFooterTooltipEvent (evnt, params) {
    let { column } = params
    let tooltipStore = this.tooltipStore
    this.handleTargetEnterEvent()
    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, column)
    }
  },
  /**
   * 触发 tooltip 事件
   */
  triggerTooltipEvent (evnt, params) {
    let { editConfig, editOpts, editStore, tooltipStore } = this
    let { actived } = editStore
    let { row, column } = params
    this.handleTargetEnterEvent()
    if (editConfig) {
      if ((editOpts.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {
        return
      }
    }
    if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
      this.handleTooltip(evnt, column, row)
    }
  },
  /**
   * 处理显示 tooltip
   * @param {Event} evnt 事件
   * @param {ColumnConfig} column 列配置
   * @param {Row} row 行对象
   */
  handleTooltip (evnt, column, row) {
    let cell = evnt.currentTarget
    let tooltip = this.$refs.tooltip
    let wrapperElem = cell.children[0]
    let content = cell.innerText
    if (content && wrapperElem.scrollWidth > wrapperElem.clientWidth) {
      Object.assign(this.tooltipStore, {
        row,
        column,
        visible: true
      })
      if (tooltip) {
        tooltip.toVisible(cell, UtilTools.formatText(content))
      }
    }
    return this.$nextTick()
  },
  /**
   * 关闭 tooltip
   */
  clostTooltip () {
    let tooltip = this.$refs.tooltip
    Object.assign(this.tooltipStore, {
      row: null,
      column: null,
      content: null,
      visible: false
    })
    if (tooltip) {
      tooltip.close()
    }
    return this.$nextTick()
  },
  /**
   * 处理默认勾选
   */
  handleDefaultSelectionChecked () {
    let { fullDataRowIdData, checkboxOpts } = this
    let { checkAll, checkRowKeys } = checkboxOpts
    if (checkAll) {
      this.setAllCheckboxRow(true)
    } else if (checkRowKeys) {
      let defSelection = []
      checkRowKeys.forEach(rowid => {
        if (fullDataRowIdData[rowid]) {
          defSelection.push(fullDataRowIdData[rowid].row)
        }
      })
      this.setCheckboxRow(defSelection, true)
    }
  },
  // 在 v3.0 中废弃 setSelection
  setSelection (rows, value) {
    // UtilTools.warn('vxe.error.delFunc', ['setSelection', 'setCheckboxRow'])
    return this.setCheckboxRow(rows, value)
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
  isCheckedByRow (row) {
    UtilTools.warn('vxe.error.delFunc', ['isCheckedByRow', 'isCheckedByCheckboxRow'])
    return this.isCheckedByCheckboxRow(row)
  },
  isCheckedByCheckboxRow (row) {
    let { checkField: property } = this.checkboxOpts
    if (property) {
      return XEUtils.get(row, property)
    }
    return this.selection.indexOf(row) > -1
  },
  /**
   * 多选，行选中事件
   * value 选中true 不选false 不确定-1
   */
  handleSelectRow ({ row }, value) {
    let { selection, afterFullData, treeConfig, treeOpts, treeIndeterminates, checkboxOpts } = this
    let { checkField: property, checkStrictly, checkMethod } = checkboxOpts
    if (property) {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          treeIndeterminates.push(row)
          XEUtils.set(row, property, false)
        } else {
          // 更新子节点状态
          XEUtils.eachTree([row], (item, $rowIndex) => {
            if (row === item || (!checkMethod || checkMethod({ row: item, $rowIndex }))) {
              XEUtils.set(item, property, value)
              this.handleSelectReserveRow(row, value)
            }
          }, treeOpts)
          XEUtils.remove(treeIndeterminates, item => item === row)
        }
        // 如果存在父节点，更新父节点状态
        let matchObj = XEUtils.findTree(afterFullData, item => item === row, treeOpts)
        if (matchObj && matchObj.parent) {
          let parentStatus
          let vItems = checkMethod ? matchObj.items.filter((item, $rowIndex) => checkMethod({ row: item, $rowIndex })) : matchObj.items
          let indeterminatesItem = XEUtils.find(matchObj.items, item => treeIndeterminates.indexOf(item) > -1)
          if (indeterminatesItem) {
            parentStatus = -1
          } else {
            let selectItems = matchObj.items.filter(item => XEUtils.get(item, property))
            parentStatus = selectItems.filter(item => vItems.indexOf(item) > -1).length === vItems.length ? true : (selectItems.length || value === -1 ? -1 : false)
          }
          return this.handleSelectRow({ row: matchObj.parent }, parentStatus)
        }
      } else {
        XEUtils.set(row, property, value)
        this.handleSelectReserveRow(row, value)
      }
    } else {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          treeIndeterminates.push(row)
          XEUtils.remove(selection, item => item === row)
        } else {
          // 更新子节点状态
          XEUtils.eachTree([row], (item, $rowIndex) => {
            if (row === item || (!checkMethod || checkMethod({ row: item, $rowIndex }))) {
              if (value) {
                selection.push(item)
              } else {
                XEUtils.remove(selection, select => select === item)
              }
              this.handleSelectReserveRow(row, value)
            }
          }, treeOpts)
          XEUtils.remove(treeIndeterminates, item => item === row)
        }
        // 如果存在父节点，更新父节点状态
        let matchObj = XEUtils.findTree(afterFullData, item => item === row, treeOpts)
        if (matchObj && matchObj.parent) {
          let parentStatus
          let vItems = checkMethod ? matchObj.items.filter((item, $rowIndex) => checkMethod({ row: item, $rowIndex })) : matchObj.items
          let indeterminatesItem = XEUtils.find(matchObj.items, item => treeIndeterminates.indexOf(item) > -1)
          if (indeterminatesItem) {
            parentStatus = -1
          } else {
            let selectItems = matchObj.items.filter(item => selection.indexOf(item) > -1)
            parentStatus = selectItems.filter(item => vItems.indexOf(item) > -1).length === vItems.length ? true : (selectItems.length || value === -1 ? -1 : false)
          }
          return this.handleSelectRow({ row: matchObj.parent }, parentStatus)
        }
      } else {
        if (value) {
          if (selection.indexOf(row) === -1) {
            selection.push(row)
          }
        } else {
          XEUtils.remove(selection, item => item === row)
        }
        this.handleSelectReserveRow(row, value)
      }
    }
    this.checkSelectionStatus()
  },
  handleToggleCheckRowEvent (params, evnt) {
    let { selection, checkboxOpts } = this
    let { checkField: property } = checkboxOpts
    let { row } = params
    let value = property ? !XEUtils.get(row, property) : selection.indexOf(row) === -1
    if (evnt) {
      this.triggerCheckRowEvent(evnt, params, value)
    } else {
      this.handleSelectRow(params, value)
    }
  },
  triggerCheckRowEvent (evnt, params, value) {
    let { checkMethod } = this.checkboxOpts
    if (!checkMethod || checkMethod({ row: params.row, rowIndex: params.rowIndex, $rowIndex: params.$rowIndex })) {
      this.handleSelectRow(params, value)
      UtilTools.emitEvent(this, 'select-change', [Object.assign({ selection: this.getCheckboxRecords(), reserves: this.getCheckboxReserveRecords(), checked: value, $table: this }, params), evnt])
    }
  },
  // 在 v3.0 中废弃 toggleRowSelection
  toggleRowSelection (row) {
    // UtilTools.warn('vxe.error.delFunc', ['toggleRowSelection', 'toggleCheckboxRow'])
    return this.toggleCheckboxRow(row)
  },
  /**
   * 多选，切换某一行的选中状态
   */
  toggleCheckboxRow (row) {
    this.handleToggleCheckRowEvent({ row })
    return this.$nextTick()
  },
  // 在 v3.0 中废弃 setAllSelection
  setAllSelection (value) {
    // UtilTools.warn('vxe.error.delFunc', ['setAllSelection', 'setAllCheckboxRow'])
    return this.setAllCheckboxRow(value)
  },
  /**
   * 用于多选行，设置所有行的选中状态
   * @param {Boolean} value 是否选中
   */
  setAllCheckboxRow (value) {
    let { afterFullData, treeConfig, treeOpts, selection, selectReserveRowMap, checkboxOpts } = this
    let { checkField: property, reserve, checkStrictly, checkMethod } = checkboxOpts
    let selectRows = []
    let beforeSelection = treeConfig ? [] : selection.filter(row => afterFullData.indexOf(row) === -1)
    if (!checkStrictly) {
      if (property) {
        let indexKey = `${treeConfig ? '$' : ''}rowIndex`
        let setValFn = (row, rowIndex) => {
          if (!checkMethod || checkMethod({ row, [indexKey]: rowIndex, $rowIndex: rowIndex })) {
            XEUtils.set(row, property, value)
          }
        }
        let clearValFn = (row, rowIndex) => {
          if (!checkMethod || (checkMethod({ row, [indexKey]: rowIndex, $rowIndex: rowIndex }) ? 0 : selection.indexOf(row) > -1)) {
            XEUtils.set(row, property, value)
          }
        }
        if (treeConfig) {
          XEUtils.eachTree(afterFullData, value ? setValFn : clearValFn, treeOpts)
        } else {
          afterFullData.forEach(value ? setValFn : clearValFn)
        }
      } else {
        if (treeConfig) {
          if (value) {
            XEUtils.eachTree(afterFullData, (row, $rowIndex) => {
              if (!checkMethod || checkMethod({ row, $rowIndex })) {
                selectRows.push(row)
              }
            }, treeOpts)
          } else {
            if (checkMethod) {
              XEUtils.eachTree(afterFullData, (row, $rowIndex) => {
                if (checkMethod({ row, $rowIndex }) ? 0 : selection.indexOf(row) > -1) {
                  selectRows.push(row)
                }
              }, treeOpts)
            }
          }
        } else {
          if (value) {
            if (checkMethod) {
              selectRows = afterFullData.filter((row, rowIndex) => selection.indexOf(row) > -1 || checkMethod({ row, rowIndex, $rowIndex: rowIndex }))
            } else {
              selectRows = afterFullData.slice(0)
            }
          } else {
            if (checkMethod) {
              selectRows = afterFullData.filter((row, rowIndex) => checkMethod({ row, rowIndex, $rowIndex: rowIndex }) ? 0 : selection.indexOf(row) > -1)
            }
          }
        }
      }
      if (reserve) {
        if (value) {
          selectRows.forEach(row => {
            selectReserveRowMap[UtilTools.getRowid(this, row)] = row
          })
        } else {
          afterFullData.forEach(row => {
            const rowid = UtilTools.getRowid(this, row)
            if (selectReserveRowMap[rowid]) {
              delete selectReserveRowMap[rowid]
            }
          })
        }
      }
      this.selection = beforeSelection.concat(selectRows)
    }
    this.treeIndeterminates = []
    this.checkSelectionStatus()
  },
  checkSelectionStatus () {
    let { afterFullData, selection, treeIndeterminates, checkboxOpts } = this
    let { checkField: property, checkStrictly, checkMethod } = checkboxOpts
    if (!checkStrictly) {
      if (property) {
        this.isAllSelected = afterFullData.length && afterFullData.every(
          checkMethod
            ? (row, rowIndex) => !checkMethod({ row, rowIndex, $rowIndex: rowIndex }) || XEUtils.get(row, property)
            : row => XEUtils.get(row, property)
        )
        this.isIndeterminate = !this.isAllSelected && afterFullData.some(row => XEUtils.get(row, property) || treeIndeterminates.indexOf(row) > -1)
      } else {
        this.isAllSelected = afterFullData.length && afterFullData.every(
          checkMethod
            ? (row, rowIndex) => !checkMethod({ row, rowIndex, $rowIndex: rowIndex }) || selection.indexOf(row) > -1
            : row => selection.indexOf(row) > -1
        )
        this.isIndeterminate = !this.isAllSelected && afterFullData.some(row => treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1)
      }
    }
  },
  // 还原展开、选中等相关状态
  handleReserveStatus () {
    let { rowId, treeConfig, fullDataRowIdData, selectReserveRowMap, checkboxOpts } = this
    let reserveSelection = []
    let reserveRowExpandeds = []
    let reserveTreeExpandeds = []
    let reserveTreeIndeterminates = []
    // 复选框
    if (rowId) {
      this.handleReserveByRowid(this.selection, reserveSelection)
    }
    if (checkboxOpts.reserve) {
      Object.keys(selectReserveRowMap).forEach(rowid => {
        if (fullDataRowIdData[rowid] && reserveSelection.indexOf(fullDataRowIdData[rowid].row) === -1) {
          reserveSelection.push(fullDataRowIdData[rowid].row)
        }
      })
    }
    this.selection = reserveSelection
    // 行展开
    if (rowId) {
      this.handleReserveByRowid(this.rowExpandeds, reserveRowExpandeds)
    }
    this.rowExpandeds = reserveRowExpandeds
    // 树展开
    if (rowId && treeConfig) {
      this.handleReserveByRowid(this.treeIndeterminates, reserveTreeIndeterminates)
      this.handleReserveByRowid(this.treeExpandeds, reserveTreeExpandeds)
    }
    this.treeExpandeds = reserveTreeExpandeds
    this.treeIndeterminates = reserveTreeIndeterminates
  },
  handleReserveByRowid (list, rest) {
    let fullDataRowIdData = this.fullDataRowIdData
    list.forEach(row => {
      const rowid = UtilTools.getRowid(this, row)
      if (fullDataRowIdData[rowid]) {
        rest.push(fullDataRowIdData[rowid].row)
      }
    })
  },
  // 在 v3.0 中废弃 getSelectReserveRecords
  getSelectReserveRecords () {
    // UtilTools.warn('vxe.error.delFunc', ['getSelectReserveRecords', 'getCheckboxReserveRecords'])
    return this.getCheckboxReserveRecords()
  },
  /**
   * 获取保留选中的行
   */
  getCheckboxReserveRecords () {
    let { fullDataRowIdData, selectReserveRowMap, checkboxOpts } = this
    let reserveSelection = []
    if (checkboxOpts.reserve) {
      Object.keys(selectReserveRowMap).forEach((rowid, row) => {
        if (!fullDataRowIdData[rowid]) {
          reserveSelection.push(selectReserveRowMap[rowid])
        }
      })
    }
    return reserveSelection
  },
  // 在 v3.0 中废弃 clearSelectReserve
  clearSelectReserve () {
    // UtilTools.warn('vxe.error.delFunc', ['clearSelectReserve', 'clearCheckboxReserve'])
    return this.clearCheckboxReserve()
  },
  clearCheckboxReserve () {
    this.selectReserveRowMap = {}
    return this.$nextTick()
  },
  handleSelectReserveRow (row, checked) {
    const { selectReserveRowMap, checkboxOpts } = this
    let { reserve } = checkboxOpts
    if (reserve) {
      const rowid = UtilTools.getRowid(this, row)
      if (checked) {
        selectReserveRowMap[rowid] = row
      } else if (selectReserveRowMap[rowid]) {
        delete selectReserveRowMap[rowid]
      }
    }
  },
  /**
   * 多选，选中所有事件
   */
  triggerCheckAllEvent (evnt, value) {
    this.setAllCheckboxRow(value)
    UtilTools.emitEvent(this, 'select-all', [{ selection: this.getCheckboxRecords(), reserves: this.getCheckboxReserveRecords(), checked: value, $table: this }, evnt])
  },
  // 在 v3.0 中废弃 toggleAllSelection
  toggleAllSelection () {
    // UtilTools.warn('vxe.error.delFunc', ['toggleAllSelection', 'toggleAllCheckboxRow'])
    return this.toggleAllCheckboxRow()
  },
  /**
   * 多选，切换所有行的选中状态
   */
  toggleAllCheckboxRow () {
    this.triggerCheckAllEvent(null, !this.isAllSelected)
    return this.$nextTick()
  },
  // 在 v3.0 中废弃 clearSelection
  clearSelection () {
    // UtilTools.warn('vxe.error.delFunc', ['clearSelection', 'clearCheckboxRow'])
    return this.clearCheckboxRow()
  },
  /**
   * 用于多选行，手动清空用户的选择
   */
  clearCheckboxRow () {
    let { tableFullData, treeConfig, treeOpts, checkboxOpts } = this
    let { checkField: property } = checkboxOpts
    if (property) {
      if (treeConfig) {
        XEUtils.eachTree(tableFullData, item => XEUtils.set(item, property, false), treeOpts)
      } else {
        tableFullData.forEach(item => XEUtils.set(item, property, false))
      }
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
    let { radioOpts, fullDataRowIdData } = this
    let { checkRowKey: rowid } = radioOpts
    if (rowid && fullDataRowIdData[rowid]) {
      this.setRadioRow(fullDataRowIdData[rowid].row)
    }
  },
  /**
   * 单选，行选中事件
   */
  triggerRadioRowEvent (evnt, params) {
    let { radioOpts } = this
    let { checkMethod } = radioOpts
    if (!checkMethod || checkMethod({ row: params.row, rowIndex: params.rowIndex, $rowIndex: params.$rowIndex })) {
      let isChange = this.selectRow !== params.row
      this.setRadioRow(params.row)
      if (isChange) {
        UtilTools.emitEvent(this, 'radio-change', [params, evnt])
      }
    }
  },
  triggerCurrentRowEvent (evnt, params) {
    let isChange = this.currentRow !== params.row
    this.setCurrentRow(params.row)
    if (isChange) {
      UtilTools.emitEvent(this, 'current-change', [params, evnt])
    }
  },
  /**
   * 用于当前行，设置某一行为高亮状态
   * @param {Row} row 行对象
   */
  setCurrentRow (row) {
    this.clearCurrentRow()
    this.clearCurrentColumn()
    this.currentRow = row
    if (this.highlightCurrentRow) {
      XEUtils.arrayEach(this.$el.querySelectorAll(`[data-rowid="${UtilTools.getRowid(this, row)}"]`), elem => DomTools.addClass(elem, 'row--current'))
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
    if (this.selectRow !== row) {
      this.clearRadioRow()
    }
    this.selectRow = row
    return this.$nextTick()
  },
  /**
   * 用于当前行，手动清空当前高亮的状态
   */
  clearCurrentRow () {
    this.currentRow = null
    this.hoverRow = null
    XEUtils.arrayEach(this.$el.querySelectorAll('.row--current'), elem => DomTools.removeClass(elem, 'row--current'))
    return this.$nextTick()
  },
  /**
   * 用于单选行，手动清空用户的选择
   */
  clearRadioRow () {
    this.selectRow = null
    return this.$nextTick()
  },
  // 在 v3.0 中废弃 getCurrentRow
  getCurrentRow () {
    // UtilTools.warn('vxe.error.delFunc', ['getCurrentRow', 'getCurrentRecord'])
    return this.getCurrentRecord()
  },
  /**
   * 用于当前行，获取当前行的数据
   */
  getCurrentRecord () {
    return this.currentRow
  },
  // 在 v3.0 中废弃 getRadioRow
  getRadioRow () {
    // UtilTools.warn('vxe.error.delFunc', ['getRadioRow', 'getRadioRecord'])
    return this.getRadioRecord()
  },
  /**
   * 用于单选行，获取当已选中的数据
   */
  getRadioRecord () {
    return this.selectRow
  },
  /**
   * 行 hover 事件
   */
  triggerHoverEvent (evnt, { row }) {
    this.setHoverRow(row)
  },
  setHoverRow (row) {
    let rowid = UtilTools.getRowid(this, row)
    this.clearHoverRow()
    XEUtils.arrayEach(this.$el.querySelectorAll(`[data-rowid="${rowid}"]`), elem => DomTools.addClass(elem, 'row--hover'))
    this.hoverRow = row
  },
  clearHoverRow () {
    XEUtils.arrayEach(this.$el.querySelectorAll('.vxe-body--row.row--hover'), elem => DomTools.removeClass(elem, 'row--hover'))
    this.hoverRow = null
  },
  triggerHeaderCellClickEvent (evnt, params) {
    let { _lastResizeTime, sortOpts } = this
    let { column, cell } = params
    let triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300
    let triggerSort = DomTools.getEventTargetNode(evnt, cell, 'vxe-sort-wrapper').flag
    let triggerFilter = DomTools.getEventTargetNode(evnt, cell, 'vxe-filter-wrapper').flag
    if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
      this.triggerSortEvent(evnt, column, column.order === 'desc' ? 'asc' : 'desc')
    }
    UtilTools.emitEvent(this, 'header-cell-click', [Object.assign({ triggerResizable, triggerSort, triggerFilter }, params), evnt])
    if (this.highlightCurrentColumn) {
      return this.setCurrentColumn(column, true)
    }
    return this.$nextTick()
  },
  /**
   * 用于当前列，设置某列行为高亮状态
   * @param {ColumnConfig} column 列配置
   */
  setCurrentColumn (column) {
    this.clearCurrentRow()
    this.clearCurrentColumn()
    this.currentColumn = column
    XEUtils.arrayEach(this.$el.querySelectorAll(`.${column.id}`), elem => DomTools.addClass(elem, 'col--current'))
    return this.$nextTick()
  },
  /**
   * 用于当前列，手动清空当前高亮的状态
   */
  clearCurrentColumn () {
    this.currentColumn = null
    XEUtils.arrayEach(this.$el.querySelectorAll('.col--current'), elem => DomTools.removeClass(elem, 'col--current'))
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
    let { $el, highlightCurrentRow, editStore, radioOpts, expandOpts, treeOpts, editConfig, editOpts, checkboxOpts, mouseConfig = {} } = this
    let { actived } = editStore
    let { row, column } = params
    // 解决 checkbox 重复触发两次问题
    if (isTargetRadioOrCheckbox(evnt, column, 'radio') || isTargetRadioOrCheckbox(evnt, column, 'checkbox', 'checkbox') || isTargetRadioOrCheckbox(evnt, column, 'selection', 'checkbox')) {
      // 在 v3.0 中废弃 type=selection
      return
    }
    // 如果是展开行
    if ((expandOpts.trigger === 'row' || (column.type === 'expand' && expandOpts.trigger === 'cell')) && !DomTools.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag) {
      this.triggerRowExpandEvent(evnt, params)
    }
    // 如果是树形表格
    if ((treeOpts.trigger === 'row' || (column.treeNode && treeOpts.trigger === 'cell'))) {
      this.triggerTreeExpandEvent(evnt, params)
    }
    if ((!column.treeNode || !DomTools.getEventTargetNode(evnt, $el, 'vxe-tree--btn-wrapper').flag) && (column.type !== 'expand' || !DomTools.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag)) {
      // 如果是高亮行
      if (highlightCurrentRow) {
        if (radioOpts.trigger === 'row' || (!DomTools.getEventTargetNode(evnt, $el, 'vxe-cell--checkbox').flag && !DomTools.getEventTargetNode(evnt, $el, 'vxe-cell--radio').flag)) {
          this.triggerCurrentRowEvent(evnt, params)
        }
      }
      // 如果是单选框
      if ((radioOpts.trigger === 'row' || (column.type === 'radio' && radioOpts.trigger === 'cell')) && !DomTools.getEventTargetNode(evnt, $el, 'vxe-cell--radio').flag) {
        this.triggerRadioRowEvent(evnt, params)
      }
      // 如果是复选框
      if ((checkboxOpts.trigger === 'row' || ((column.type === 'checkbox' || column.type === 'selection') && checkboxOpts.trigger === 'cell')) && !DomTools.getEventTargetNode(evnt, params.cell, 'vxe-cell--checkbox').flag) {
        // 在 v3.0 中废弃 type=selection
        this.handleToggleCheckRowEvent(params, evnt)
      }
      // 如果设置了单元格选中功能，则不会使用点击事件去处理（只能支持双击模式）
      if (!mouseConfig.checked) {
        if (editConfig) {
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
    }
    UtilTools.emitEvent(this, 'cell-click', [params, evnt])
  },
  /**
   * 列双击点击事件
   * 如果是双击模式，则激活为编辑状态
   */
  triggerCellDBLClickEvent (evnt, params) {
    let { editStore, editConfig, editOpts } = this
    let { actived } = editStore
    if (editConfig && editOpts.trigger === 'dblclick') {
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
    UtilTools.emitEvent(this, 'cell-dblclick', [params, evnt])
  },
  handleDefaultSort () {
    let defaultSort = this.sortOpts.defaultSort
    if (defaultSort) {
      let { field, order } = defaultSort
      if (field && order) {
        let column = XEUtils.find(this.visibleColumn, item => item.property === field)
        if (column && !column.order) {
          this.sort(field, order)
        }
      }
    }
  },
  /**
   * 点击排序事件
   */
  triggerSortEvent (evnt, column, order) {
    let property = column.property
    if (column.sortable || column.remoteSort) {
      let evntParams = { column, property, field: property, prop: property, order, $table: this }
      if (column.order === order) {
        evntParams.order = null
        this.clearSort(column.property)
      } else {
        this.sort(property, order)
      }
      UtilTools.emitEvent(this, 'sort-change', [evntParams, evnt])
    }
  },
  sort (field, order) {
    let { visibleColumn, tableFullColumn, remoteSort, sortOpts } = this
    let column = XEUtils.find(visibleColumn, item => item.property === field)
    if (column) {
      let isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : (sortOpts.remote || remoteSort)
      if (column.sortable || column.remoteSort) {
        if (!order) {
          order = column.order === 'desc' ? 'asc' : 'desc'
        }
        if (column.order !== order) {
          tableFullColumn.forEach(column => {
            column.order = null
          })
          column.order = order
          // 如果是服务端排序，则跳过本地排序处理
          if (!isRemote) {
            this.handleTableData(true)
          }
        }
        return this.$nextTick().then(this.updateStyle)
      }
    }
    return this.$nextTick()
  },
  /**
   * 手动清空排序条件，数据会恢复成未排序的状态
   */
  clearSort () {
    this.tableFullColumn.forEach(column => {
      column.order = null
    })
    return this.handleTableData(true)
  },
  getSortColumn () {
    return this.visibleColumn.find(column => column.sortable && column.order)
  },
  /**
   * 关闭筛选
   * @param {Event} evnt 事件
   */
  closeFilter (evnt) {
    Object.assign(this.filterStore, {
      isAllSelected: false,
      isIndeterminate: false,
      options: [],
      visible: false
    })
    return this.$nextTick()
  },
  /**
   * 判断指定列是否为筛选状态，如果为空则判断所有列
   * @param {String} field 字段名
   */
  isFilter (field) {
    if (field) {
      const column = this.getColumnByField(field)
      return column.filters && column.filters.some(option => option.checked)
    }
    return this.visibleColumn.some(column => column.filters && column.filters.some(option => option.checked))
  },
  /**
   * 判断展开行是否懒加载完成
   * @param {Row} row 行对象
   */
  isRowExpandLoaded (row) {
    let rest = this.fullAllDataRowMap.get(row)
    return rest && rest.expandLoaded
  },
  clearRowExpandLoaded (row) {
    let { expandOpts, expandLazyLoadeds, fullAllDataRowMap } = this
    let { lazy } = expandOpts
    let rest = fullAllDataRowMap.get(row)
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
    let { expandOpts, expandLazyLoadeds } = this
    let { lazy } = expandOpts
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
    let { $listeners, expandOpts, expandLazyLoadeds } = this
    let { row } = params
    let { lazy } = expandOpts
    if (!lazy || expandLazyLoadeds.indexOf(row) === -1) {
      let expanded = !this.isExpandByRow(row)
      this.setRowExpansion(row, expanded)
      if ($listeners['toggle-expand-change']) {
        UtilTools.warn('vxe.error.delEvent', ['toggle-expand-change', 'toggle-row-expand'])
        UtilTools.emitEvent(this, 'toggle-expand-change', [{ expanded, row, rowIndex: this.getRowIndex(row), $table: this }, evnt])
      } else {
        UtilTools.emitEvent(this, 'toggle-row-expand', [{ expanded, row, rowIndex: this.getRowIndex(row), $table: this }, evnt])
      }
    }
  },
  /**
   * 切换展开行
   */
  toggleRowExpansion (row) {
    return this.setRowExpansion(row, !this.isExpandByRow(row))
  },
  /**
   * 处理默认展开行
   */
  handleDefaultRowExpand () {
    let { expandOpts, fullDataRowIdData } = this
    let { expandAll, expandRowKeys } = expandOpts
    if (expandAll) {
      this.setAllRowExpansion(true)
    } else if (expandRowKeys) {
      let defExpandeds = []
      expandRowKeys.forEach(rowid => {
        if (fullDataRowIdData[rowid]) {
          defExpandeds.push(fullDataRowIdData[rowid].row)
        }
      })
      this.setRowExpansion(defExpandeds, true)
    }
  },
  /**
   * 设置所有行的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllRowExpansion (expanded) {
    if (this.expandOpts.lazy) {
      return this.setRowExpansion(this.tableData, true)
    }
    this.rowExpandeds = expanded ? this.tableFullData.slice(0) : []
    return this.$nextTick().then(this.recalculate)
  },
  handleAsyncRowExpand (row) {
    let { fullAllDataRowMap, rowExpandeds, expandLazyLoadeds, expandOpts } = this
    let { loadMethod } = expandOpts
    let rest = fullAllDataRowMap.get(row)
    return new Promise(resolve => {
      expandLazyLoadeds.push(row)
      loadMethod({ $table: this, row }).catch(e => e).then(() => {
        rest.expandLoaded = true
        XEUtils.remove(expandLazyLoadeds, item => item === row)
        rowExpandeds.push(row)
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
  setRowExpansion (rows, expanded) {
    let { fullAllDataRowMap, rowExpandeds, expandLazyLoadeds, expandOpts } = this
    let { lazy, accordion } = expandOpts
    let result = []
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (accordion) {
        // 只能同时展开一个
        rowExpandeds = []
        rows = rows.slice(rows.length - 1, rows.length)
      }
      if (expanded) {
        rows.forEach(row => {
          if (rowExpandeds.indexOf(row) === -1) {
            let rest = fullAllDataRowMap.get(row)
            let isLoad = lazy && !rest.expandLoaded && expandLazyLoadeds.indexOf(row) === -1
            if (isLoad) {
              result.push(this.handleAsyncRowExpand(row))
            } else {
              rowExpandeds.push(row)
            }
          }
        })
      } else {
        XEUtils.remove(rowExpandeds, row => rows.indexOf(row) > -1)
      }
    }
    this.rowExpandeds = rowExpandeds
    return Promise.all(result).then(this.recalculate)
  },
  // 在 v3.0 中废弃 getRecords
  hasRowExpand (row) {
    UtilTools.warn('vxe.error.delFunc', ['hasRowExpand', 'isExpandByRow'])
    return this.isExpandByRow(row)
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
    const isExists = this.rowExpandeds.length
    this.rowExpandeds = []
    return this.$nextTick().then(() => isExists ? this.recalculate() : 0)
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
    let rest = this.fullAllDataRowMap.get(row)
    return rest && rest.treeLoaded
  },
  clearTreeExpandLoaded (row) {
    let { treeOpts, treeExpandeds, fullAllDataRowMap } = this
    let { lazy } = treeOpts
    let rest = fullAllDataRowMap.get(row)
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
    let { treeOpts, treeLazyLoadeds } = this
    let { lazy, hasChild } = treeOpts
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
    let { $listeners, treeOpts, treeLazyLoadeds } = this
    let { row } = params
    let { lazy } = treeOpts
    if (!lazy || treeLazyLoadeds.indexOf(row) === -1) {
      let expanded = !this.isTreeExpandByRow(row)
      this.setTreeExpansion(row, expanded)
      if ($listeners['toggle-tree-change']) {
        UtilTools.warn('vxe.error.delEvent', ['toggle-tree-change', 'toggle-tree-expand'])
        UtilTools.emitEvent(this, 'toggle-tree-change', [{ expanded, row, rowIndex: this.getRowIndex(row), $table: this }, evnt])
      } else {
        UtilTools.emitEvent(this, 'toggle-tree-expand', [{ expanded, row, rowIndex: this.getRowIndex(row), $table: this }, evnt])
      }
    }
  },
  /**
   * 切换/展开树节点
   */
  toggleTreeExpansion (row) {
    return this.setTreeExpansion(row, !this.isTreeExpandByRow(row))
  },
  /**
   * 处理默认展开树节点
   */
  handleDefaultTreeExpand () {
    let { treeConfig, treeOpts, tableFullData } = this
    if (treeConfig) {
      let { expandAll, expandRowKeys } = treeOpts
      if (expandAll) {
        this.setAllTreeExpansion(true)
      } else if (expandRowKeys) {
        let defExpandeds = []
        let rowkey = UtilTools.getRowkey(this)
        expandRowKeys.forEach(rowid => {
          let matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), treeOpts)
          if (matchObj) {
            defExpandeds.push(matchObj.item)
          }
        })
        this.setTreeExpansion(defExpandeds, true)
      }
    }
  },
  handleAsyncTreeExpandChilds (row) {
    let { fullAllDataRowMap, treeExpandeds, treeOpts, treeLazyLoadeds } = this
    let { loadMethod, children } = treeOpts
    let rest = fullAllDataRowMap.get(row)
    return new Promise(resolve => {
      treeLazyLoadeds.push(row)
      loadMethod({ $table: this, row }).catch(e => []).then(childs => {
        rest.treeLoaded = true
        XEUtils.remove(treeLazyLoadeds, item => item === row)
        if (!XEUtils.isArray(childs)) {
          childs = []
        }
        if (childs) {
          row[children] = childs
          this.appendTreeCache(row, childs)
          if (childs.length && treeExpandeds.indexOf(row) === -1) {
            treeExpandeds.push(row)
          }
          // 如果当前节点已选中，则展开后子节点也被选中
          if (this.isCheckedByCheckboxRow(row)) {
            this.setCheckboxRow(childs, true)
          }
        }
        resolve(this.$nextTick().then(this.recalculate))
      })
    })
  },
  /**
   * 设置所有树节点的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllTreeExpansion (expanded) {
    let { tableFullData, treeOpts } = this
    let { lazy, children } = treeOpts
    if (expanded) {
      if (lazy) {
        XEUtils.eachTree(tableFullData, row => {
          this.setTreeExpansion(row, true)
        }, treeOpts)
      } else {
        let treeExpandeds = []
        XEUtils.eachTree(tableFullData, row => {
          let rowChildren = row[children]
          if (rowChildren && rowChildren.length) {
            treeExpandeds.push(row)
          }
        }, treeOpts)
        this.treeExpandeds = treeExpandeds
      }
    } else {
      this.treeExpandeds = []
    }
    return this.$nextTick().then(this.recalculate)
  },
  /**
   * 设置展开树形节点，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setTreeExpansion (rows, expanded) {
    let { fullAllDataRowMap, tableFullData, treeExpandeds, treeOpts, treeLazyLoadeds } = this
    let { lazy, hasChild, children, accordion } = treeOpts
    let result = []
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (rows.length) {
        if (accordion) {
          rows = rows.slice(rows.length - 1, rows.length)
          // 同一级只能展开一个
          let matchObj = XEUtils.findTree(tableFullData, item => item === rows[0], treeOpts)
          XEUtils.remove(treeExpandeds, item => matchObj.items.indexOf(item) > -1)
        }
        if (expanded) {
          rows.forEach(row => {
            if (treeExpandeds.indexOf(row) === -1) {
              let rest = fullAllDataRowMap.get(row)
              let isLoad = lazy && row[hasChild] && !rest.treeLoaded && treeLazyLoadeds.indexOf(row) === -1
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
          XEUtils.remove(treeExpandeds, row => rows.indexOf(row) > -1)
        }
        return Promise.all(result).then(this.recalculate)
      }
    }
    return Promise.resolve()
  },
  // 在 v3.0 中废弃 hasTreeExpand
  hasTreeExpand (row) {
    UtilTools.warn('vxe.error.delFunc', ['hasTreeExpand', 'isTreeExpandByRow'])
    return this.isTreeExpandByRow(row)
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
    const isExists = this.treeExpandeds.length
    this.treeExpandeds = []
    return this.$nextTick().then(() => isExists ? this.recalculate() : 0)
  },
  /**
   * 获取虚拟滚动状态
   */
  getVirtualScroller () {
    let { $refs, scrollXLoad, scrollYLoad } = this
    let bodyElem = $refs.tableBody.$el
    return {
      scrollX: scrollXLoad,
      scrollY: scrollYLoad,
      scrollTop: bodyElem.scrollTop,
      scrollLeft: bodyElem.scrollLeft
    }
  },
  /**
   * 横向 X 可视渲染事件处理
   */
  triggerScrollXEvent (evnt) {
    this.updateVirtualScrollX()
  },
  updateVirtualScrollX (force) {
    let { $refs, visibleColumn, scrollXStore } = this
    let { startIndex, renderSize, offsetSize, visibleSize } = scrollXStore
    let scrollBodyElem = $refs.tableBody.$el
    let scrollLeft = scrollBodyElem.scrollLeft
    let toVisibleIndex = 0
    let width = 0
    let preload = force || false
    let colLen = visibleColumn.length
    for (let colIndex = 0; colIndex < colLen; colIndex++) {
      width += visibleColumn[colIndex].renderWidth
      if (scrollLeft < width) {
        toVisibleIndex = colIndex
        break
      }
    }
    if (force || scrollXStore.visibleIndex !== toVisibleIndex) {
      let marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize)
      if (scrollXStore.visibleIndex === toVisibleIndex) {
        scrollXStore.startIndex = toVisibleIndex
      } else if (scrollXStore.visibleIndex > toVisibleIndex) {
        // 向左
        preload = toVisibleIndex - offsetSize <= startIndex
        if (preload) {
          scrollXStore.startIndex = Math.max(0, Math.max(0, toVisibleIndex - marginSize))
        }
      } else {
        // 向右
        preload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize
        if (preload) {
          scrollXStore.startIndex = Math.max(0, Math.min(visibleColumn.length - renderSize, toVisibleIndex - marginSize))
        }
      }
      if (preload) {
        this.updateScrollXData()
      }
      scrollXStore.visibleIndex = toVisibleIndex
    }
    this.clostTooltip()
  },
  /**
   * 纵向 Y 可视渲染事件处理
   */
  triggerScrollYEvent (evnt) {
    // webkit 浏览器使用最佳的渲染方式
    if (isWebkit && this.scrollYStore.adaptive) {
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
    let { afterFullData, scrollYStore, isLoadData } = this
    let { startIndex, renderSize, offsetSize, visibleSize, rowHeight } = scrollYStore
    let scrollBodyElem = evnt.target
    let scrollTop = scrollBodyElem.scrollTop
    let toVisibleIndex = Math.ceil(scrollTop / rowHeight)
    let preload = false
    if (isLoadData || scrollYStore.visibleIndex !== toVisibleIndex) {
      let marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize)
      if (scrollYStore.visibleIndex > toVisibleIndex) {
        // 向上
        preload = toVisibleIndex - offsetSize <= startIndex
        if (preload) {
          scrollYStore.startIndex = Math.max(0, toVisibleIndex - Math.max(marginSize, renderSize - visibleSize))
        }
      } else {
        // 向下
        preload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize
        if (preload) {
          scrollYStore.startIndex = Math.max(0, Math.min(afterFullData.length - renderSize, toVisibleIndex - marginSize))
        }
      }
      if (preload) {
        this.updateScrollYData()
      }
      scrollYStore.visibleIndex = toVisibleIndex
      this.isLoadData = false
    }
  },
  computeRowHeight () {
    let tableBody = this.$refs.tableBody
    let tableBodyElem = tableBody ? tableBody.$el : null
    let tableHeader = this.$refs.tableHeader
    let rowHeight
    if (tableBodyElem) {
      let firstTrElem = tableBodyElem.querySelector('tbody>tr')
      if (!firstTrElem && tableHeader) {
        firstTrElem = tableHeader.$el.querySelector('thead>tr')
      }
      if (firstTrElem) {
        rowHeight = firstTrElem.clientHeight
      }
    }
    // 默认的行高
    if (!rowHeight) {
      rowHeight = this.rowHeightMaps[this.vSize || 'default']
    }
    this.rowHeight = rowHeight
  },
  // 计算可视渲染相关数据
  computeScrollLoad () {
    return this.$nextTick().then(() => {
      let { vSize, scrollXLoad, scrollYLoad, scrollYStore, scrollXStore, visibleColumn, optimizeOpts, rowHeightMaps } = this
      let { scrollX, scrollY } = optimizeOpts
      let tableBody = this.$refs.tableBody
      let tableBodyElem = tableBody ? tableBody.$el : null
      let tableHeader = this.$refs.tableHeader
      if (tableBodyElem) {
        // 计算 X 逻辑
        if (scrollXLoad) {
          let bodyWidth = tableBodyElem.clientWidth
          let visibleXSize = XEUtils.toNumber(scrollX.vSize)
          if (!scrollX.vSize) {
            let len = visibleXSize = visibleColumn.length
            let countWidth = 0
            let column
            for (let colIndex = 0; colIndex < len; colIndex++) {
              column = visibleColumn[colIndex]
              countWidth += column.renderWidth
              if (countWidth > bodyWidth) {
                visibleXSize = colIndex + 1
                break
              }
            }
          }
          scrollXStore.visibleSize = visibleXSize
          // 自动优化
          if (!scrollX.oSize) {
            scrollXStore.offsetSize = visibleXSize
          }
          if (!scrollX.rSize) {
            scrollXStore.renderSize = visibleXSize + 4
          }
          this.updateScrollXData()
        } else {
          this.updateScrollXSpace()
        }
        // 计算 Y 逻辑
        if (scrollYLoad) {
          let rHeight
          if (scrollY.rHeight) {
            rHeight = scrollY.rHeight
          } else {
            let firstTrElem = tableBodyElem.querySelector('tbody>tr')
            if (!firstTrElem && tableHeader) {
              firstTrElem = tableHeader.$el.querySelector('thead>tr')
            }
            if (firstTrElem) {
              rHeight = firstTrElem.clientHeight
            }
          }
          // 默认的行高
          if (!rHeight) {
            rHeight = rowHeightMaps[vSize || 'default']
          }
          let visibleYSize = XEUtils.toNumber(scrollY.vSize || Math.ceil(tableBodyElem.clientHeight / rHeight))
          scrollYStore.visibleSize = visibleYSize
          scrollYStore.rowHeight = rHeight
          // 自动优化
          if (!scrollY.oSize) {
            scrollYStore.offsetSize = visibleYSize
          }
          if (!scrollY.rSize) {
            scrollYStore.renderSize = browse.edge ? visibleYSize * 10 : (isWebkit ? visibleYSize + 2 : visibleYSize * 6)
          }
          this.updateScrollYData()
        } else {
          this.updateScrollYSpace()
        }
      }
      this.$nextTick(this.updateStyle)
    })
  },
  updateScrollXData () {
    let { visibleColumn, scrollXStore } = this
    this.tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize)
    this.updateScrollXSpace()
  },
  // 更新横向 X 可视渲染上下剩余空间大小
  updateScrollXSpace () {
    let { $refs, elemStore, visibleColumn, scrollXStore, scrollXLoad, tableWidth, scrollbarWidth } = this
    let { tableHeader, tableBody, tableFooter } = $refs
    let headerElem = tableHeader ? tableHeader.$el.querySelector('.vxe-table--header') : null
    let bodyElem = tableBody.$el.querySelector('.vxe-table--body')
    let footerElem = tableFooter ? tableFooter.$el.querySelector('.vxe-table--footer') : null
    let leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous, column) => previous + column.renderWidth, 0)
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
    let containerList = ['main']
    containerList.forEach(name => {
      let layoutList = ['header', 'body', 'footer']
      layoutList.forEach(layout => {
        let xSpaceElem = elemStore[`${name}-${layout}-xSpace`]
        if (xSpaceElem) {
          xSpaceElem.style.width = scrollXLoad ? `${tableWidth + (layout === 'header' ? scrollbarWidth : 0)}px` : ''
        }
      })
    })
    this.$nextTick(this.updateStyle)
  },
  updateScrollYData () {
    this.handleTableData()
    this.updateScrollYSpace()
  },
  // 更新纵向 Y 可视渲染上下剩余空间大小
  updateScrollYSpace () {
    let { elemStore, scrollYStore, scrollYLoad, afterFullData } = this
    let bodyHeight = afterFullData.length * scrollYStore.rowHeight
    let topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0)
    let containerList = ['main', 'left', 'right']
    let marginTop = ''
    let ySpaceHeight = ''
    if (scrollYLoad) {
      marginTop = `${topSpaceHeight}px`
      ySpaceHeight = `${bodyHeight}px`
    }
    containerList.forEach(name => {
      let layoutList = ['header', 'body', 'footer']
      let tableElem = elemStore[`${name}-body-table`]
      if (tableElem) {
        tableElem.style.marginTop = marginTop
      }
      layoutList.forEach(layout => {
        let ySpaceElem = elemStore[`${name}-${layout}-ySpace`]
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
    let bodyElem = this.$refs.tableBody.$el
    if (XEUtils.isNumber(scrollLeft)) {
      let tableFooter = this.$refs.tableFooter
      if (tableFooter) {
        tableFooter.$el.scrollLeft = scrollLeft
      } else {
        bodyElem.scrollLeft = scrollLeft
      }
    }
    if (XEUtils.isNumber(scrollTop)) {
      let rightBody = this.$refs.rightBody
      if (rightBody) {
        rightBody.$el.scrollTop = scrollTop
      }
      bodyElem.scrollTop = scrollTop
    }
    if (this.scrollXLoad || this.scrollYLoad) {
      return new Promise(resolve => setTimeout(() => resolve(this.$nextTick()), 50))
    }
    return this.$nextTick()
  },
  /**
   * 如果有滚动条，则滚动到对应的行
   * @param {Row} row 行对象
   * @param {ColumnConfig} column 列配置
   */
  scrollToRow (row, column) {
    let rest = []
    if (row) {
      if (this.treeConfig) {
        rest.push(this.scrollToTreeRow(row))
      } else if (this.fullAllDataRowMap.has(row)) {
        rest.push(DomTools.rowToVisible(this, row))
      }
    }
    rest.push(this.scrollToColumn(column))
    return Promise.all(rest)
  },
  /**
   * 如果有滚动条，则滚动到对应的列
   * @param {ColumnConfig} column 列配置
   */
  scrollToColumn (column) {
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
    let { tableFullData, treeConfig, treeOpts } = this
    if (treeConfig) {
      let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeOpts)
      if (matchObj) {
        let nodes = matchObj.nodes
        nodes.forEach((row, index) => {
          if (index < nodes.length - 1 && !this.isTreeExpandByRow(row)) {
            this.setTreeExpansion(row, true)
          }
        })
      }
    }
    return this.$nextTick()
  },
  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll () {
    let $refs = this.$refs
    let tableBody = $refs.tableBody
    let tableBodyElem = tableBody ? tableBody.$el : null
    let tableFooter = $refs.tableFooter
    let tableFooterElem = tableFooter ? tableFooter.$el : null
    let footerTargetElem = tableFooterElem || tableBodyElem
    if (tableBodyElem) {
      tableBodyElem.scrollTop = 0
    }
    if (footerTargetElem) {
      footerTargetElem.scrollLeft = 0
    }
    return new Promise(resolve => setTimeout(() => resolve(this.$nextTick())))
  },
  /**
   * 更新表尾合计
   */
  updateFooter () {
    let { showFooter, tableColumn, footerMethod } = this
    if (showFooter && footerMethod) {
      this.footerData = tableColumn.length ? footerMethod({ columns: tableColumn, data: this.afterFullData }) : []
    }
    return this.$nextTick()
  },
  /**
   * 更新列状态
   * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
   * 如果单元格配置了校验规则，则会进行校验
   */
  updateStatus (scope, cellValue) {
    let customVal = !XEUtils.isUndefined(cellValue)
    return this.$nextTick().then(() => {
      let { $refs, tableData, editRules, validStore } = this
      if (scope && $refs.tableBody && editRules) {
        let { row, column } = scope
        let type = 'change'
        if (this.hasCellRules(type, row, column)) {
          let rowIndex = tableData.indexOf(row)
          let cell = DomTools.getCell(this, { row, rowIndex, column })
          if (cell) {
            return this.validCellRules(type, row, column, cellValue)
              .then(() => {
                if (customVal && validStore.visible) {
                  UtilTools.setCellValue(row, column, cellValue)
                }
                this.clearValidate()
              })
              .catch(({ rule }) => {
                if (customVal) {
                  UtilTools.setCellValue(row, column, cellValue)
                }
                this.showValidTooltip({ rule, row, column, cell })
              })
          }
        }
      }
    })
  },
  updateZindex () {
    if (this.tZindex < UtilTools.getLastZIndex()) {
      this.tZindex = UtilTools.nextZIndex(this)
    }
  },

  /*************************
   * Publish methods
   *************************/
  // 与工具栏对接
  connect ({ toolbar }) {
    this.$toolbar = toolbar
  },
  // 检查触发源是否属于目标节点
  getEventTargetNode: DomTools.getEventTargetNode
  /*************************
   * Publish methods
   *************************/
}

// Module methods
const funcs = 'setFilter,filter,clearFilter,closeMenu,getMouseSelecteds,getMouseCheckeds,clearCopyed,clearChecked,clearHeaderChecked,clearIndexChecked,clearSelected,insert,insertAt,remove,removeSelecteds,revert,revertData,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearActived,getActiveRecord,getActiveRow,hasActiveRow,isActiveByRow,setActiveRow,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,exportCsv,openExport,exportData,openImport,importData,readFile,importByFile,print'.split(',')

funcs.forEach(name => {
  Methods[name] = function () {
    return this[`_${name}`] ? this[`_${name}`].apply(this, arguments) : null
  }
})

export default Methods
