import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
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
    this.clearSort()
    this.clearCurrentRow()
    this.clearCurrentColumn()
    this.clearSelection()
    this.clearSelectReserve()
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
   * @param {Boolean} notRefresh 是否不重新运算列宽
   */
  loadTableData (datas, notRefresh) {
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
      UtilTools.error('vxe.error.scrollYReqProp', ['height | max-height'])
    }
    if (scrollYLoad && !showOverflow) {
      UtilTools.warn('vxe.error.scrollYReqProp', ['show-overflow'])
    }
    let rest = Promise.resolve()
    if (scrollYLoad) {
      rest = this.computeScrollLoad()
    }
    return rest.then(() => {
      // 是否加载了数据
      this.isLoadData = true
      this.computeRowHeight()
      this.handleTableData(true)
      this.handleReserveStatus()
      this.checkSelectionStatus()
      rest = this.$nextTick()
      if (!notRefresh) {
        rest = rest.then(this.recalculate)
      }
      return rest.then(this.refreshScroll)
    })
  },
  /**
   * 重新加载数据，不会清空表格状态
   * @param {Array} datas 数据
   */
  loadData (datas) {
    return this.loadTableData(datas).then(this.recalculate)
  },
  /**
   * 重新加载数据，会清空表格状态
   * @param {Array} datas 数据
   */
  reloadData (datas) {
    return this.clearAll()
      .then(() => this.loadTableData(datas))
      .then(this.handleDefault)
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
    let { treeConfig, tableFullData, fullDataRowIdData, fullDataRowMap, fullAllDataRowMap, fullAllDataRowIdData } = this
    let rowkey = UtilTools.getRowkey(this)
    let handleCache = (row, index) => {
      let rowid = UtilTools.getRowid(this, row)
      if (!rowid) {
        rowid = getRowUniqueId()
        XEUtils.set(row, rowkey, rowid)
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
      XEUtils.eachTree(tableFullData, handleCache, treeConfig)
    } else {
      tableFullData.forEach(handleCache)
    }
  },
  /**
   * 更新数据列的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  cacheColumnMap () {
    let { tableFullColumn, fullColumnMap } = this
    let fullColumnIdData = this.fullColumnIdData = {}
    fullColumnMap.clear()
    tableFullColumn.forEach((column, index) => {
      let rest = { column, colid: column.id, index }
      fullColumnIdData[column.id] = rest
      fullColumnMap.set(column, rest)
    })
  },
  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param {Element} tr 元素
   */
  getRowNode (tr) {
    if (tr) {
      let { treeConfig, tableFullData, fullAllDataRowIdData } = this
      let rowid = tr.getAttribute('data-rowid')
      if (treeConfig) {
        let matchObj = XEUtils.findTree(tableFullData, row => UtilTools.getRowid(this, row) === rowid, treeConfig)
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
      let { isGroup, fullColumnIdData, tableFullColumn } = this
      let colid = cell.getAttribute('data-colid')
      if (isGroup) {
        let matchObj = XEUtils.findTree(tableFullColumn, column => column.id === colid, headerProps)
        if (matchObj) {
          return matchObj
        }
      } else {
        let { column, index } = fullColumnIdData[colid]
        return { item: column, index, items: tableFullColumn }
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
  hasIndexColumn (column) {
    return column && column.type === 'index'
  },
  /**
   * 定义行数据中的列属性，如果不存在则定义
   * @param {Row} row 行数据
   */
  defineField (row) {
    let rowkey = UtilTools.getRowkey(this)
    this.visibleColumn.forEach(({ property, editRender }) => {
      if (property && !XEUtils.has(row, property)) {
        XEUtils.set(row, property, editRender && !XEUtils.isUndefined(editRender.defaultValue) ? editRender.defaultValue : null)
      }
    })
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
    let { visibleColumn, treeConfig, tableSourceData, fullDataRowIdData } = this
    let rowid = UtilTools.getRowid(this, row)
    // 新增的数据不需要检测
    if (!fullDataRowIdData[rowid]) {
      return false
    }
    if (treeConfig) {
      let children = treeConfig.children
      let matchObj = XEUtils.findTree(tableSourceData, item => rowid === UtilTools.getRowid(this, item), treeConfig)
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
    return XEUtils.find(this.visibleColumn, column => column.property === field)
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
  /**
   * 用于多选行，获取已选中的数据
   */
  getSelectRecords () {
    let { tableFullData, editStore, treeConfig } = this
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    let { checkField: property } = checkboxConfig
    let rowList = []
    let insList = []
    if (property) {
      if (treeConfig) {
        rowList = XEUtils.filterTree(tableFullData, row => XEUtils.get(row, property), treeConfig)
      } else {
        rowList = tableFullData.filter(row => XEUtils.get(row, property))
      }
      insList = editStore.insertList.filter(row => XEUtils.get(row, property))
    } else {
      let { selection } = this
      if (treeConfig) {
        rowList = XEUtils.filterTree(tableFullData, row => selection.indexOf(row) > -1, treeConfig)
      } else {
        rowList = tableFullData.filter(row => selection.indexOf(row) > -1)
      }
      insList = editStore.insertList.filter(row => selection.indexOf(row) > -1)
    }
    return rowList.concat(insList)
  },
  /**
   * 获取处理后全量的表格数据
   * 如果存在筛选条件，继续处理
   */
  updateAfterFullData () {
    let { visibleColumn, tableFullData, remoteSort, remoteFilter } = this
    let tableData = tableFullData
    let column = XEUtils.find(visibleColumn, column => column.order)
    let filterColumn = visibleColumn.filter(({ filters }) => filters && filters.length)
    tableData = tableData.filter(row => {
      return filterColumn.every(column => {
        let { filters, filterRender } = column
        let compConf = filterRender ? Renderer.get(filterRender.name) : null
        let valueList = []
        let itemList = []
        if (filters && filters.length) {
          filters.forEach(item => {
            if (item.checked) {
              itemList.push(item)
              valueList.push(item.value)
            }
          })
          if (valueList.length && !remoteFilter) {
            let { property, filterMethod } = column
            if (!filterMethod && compConf && compConf.renderFilter) {
              filterMethod = compConf.filterMethod
            }
            return filterMethod ? itemList.some(item => filterMethod({ value: item.value, option: item, row, column })) : valueList.indexOf(XEUtils.get(row, property)) > -1
          }
        }
        return true
      })
    })
    if (column && column.order) {
      let isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort
      if (!isRemote) {
        if (this.sortMethod) {
          tableData = this.sortMethod({ data: tableData, column, property: column.property, order: column.order, $table: this }) || tableData
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
  handleDefault () {
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig
    if (checkboxConfig) {
      this.handleSelectionDefChecked()
    }
    if (this.radioConfig) {
      this.handleRadioDefChecked()
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
      this.$toolbar.updateSetting()
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
    // DomTools.addClass($el, 'is--recalculate')
    if (bodyElem) {
      this.autoCellWidth(headerElem, bodyElem, footerElem)
      if (refull === true) {
        // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
        return this.computeScrollLoad().then(() => {
          this.autoCellWidth(headerElem, bodyElem, footerElem)
          this.computeScrollLoad()
          // DomTools.removeClass($el, 'is--recalculate')
        })
      }
    }
    // DomTools.removeClass($el, 'is--recalculate')
    return this.computeScrollLoad()
  },
  // 列宽计算
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
    // meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)) : 0
    if (remainWidth > 0) {
      // debugger
      const num = scaleMinList.length + pxMinList.length + autoList.length
      meanWidth = Math.floor(remainWidth / num)
      // 获得因计算舍去的宽度合计
      let remainder = remainWidth % num
      tableWidth += remainder

      const reviseWidth = (remainder, columnData) => {
        const length = Math.min(remainder, columnData.length)
        for (let i = 0; i < length; i++) {
          columnData[i].renderWidth++
        }
        return remainder - length
      }
      if (remainder > 0) {
        remainder = reviseWidth(remainder, scaleMinList)
      }
      if (remainder > 0) {
        remainder = reviseWidth(remainder, pxMinList)
      }
      if (remainder > 0) {
        remainder = reviseWidth(remainder, autoList)
      }
    } else {
      meanWidth = 0
    }
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
      if (fit && index === autoList.length - 1) {
        // 如果所有列足够放的情况下，修补列之间的误差
        let odiffer = bodyWidth - tableWidth
        if (odiffer > 0) {
          column.renderWidth += odiffer
          tableWidth = bodyWidth
        }
      }
    })
    let tableHeight = bodyElem.offsetHeight
    let overflowY = bodyElem.scrollHeight > bodyElem.clientHeight
    this.scrollbarWidth = overflowY ? bodyElem.offsetWidth - bodyWidth : 0
    this.overflowY = overflowY
    this.tableWidth = tableWidth
    this.tableHeight = tableHeight
    this.parentHeight = this.getParentHeight()
    if (headerElem) {
      this.headerHeight = headerElem.offsetHeight
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
    this.visibleColumn.forEach(column => {
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
            tableElem.style.width = tWidth === null ? tWidth : `${tWidth + scrollbarWidth}px`
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

          // let listElem = elemStore[`${name}-${layout}-list`]
          // if (listElem) {
          //   XEUtils.arrayEach(listElem.querySelectorAll(`.col--gutter`), thElem => {
          //     thElem.style.width = `${scrollbarWidth}px`
          //   })
          // }
        } else if (layout === 'body') {
          let emptyBlockElem = elemStore[`${name}-${layout}-emptyBlock`]
          if (wrapperElem) {
            if (customHeight > 0) {
              wrapperElem.style.height = `${fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight}px`
            } else if (maxHeight) {
              maxHeight = DomTools.isScale(maxHeight) ? Math.floor(parseInt(maxHeight) / 100 * parentHeight) : XEUtils.toNumber(maxHeight)
              wrapperElem.style.maxHeight = `${fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : maxHeight - headerHeight}px`
            }
          }

          // 如果是固定列
          if (fixedWrapperElem) {
            let isRightFixed = fixedType === 'right'
            let fixedColumn = columnStore[`${fixedType}List`]
            wrapperElem.style.top = `${headerHeight}px`
            fixedWrapperElem.style.height = `${(customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1)}px`
            fixedWrapperElem.style.width = `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, isRightFixed ? scrollbarWidth : 0)}px`
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
            tableElem.style.width = tWidth ? `${tWidth}px` : tWidth
            // 兼容性处理
            tableElem.style.paddingRight = scrollbarWidth && fixedType && (browse['-moz'] || browse['safari']) ? `${scrollbarWidth}px` : ''
          }
          if (emptyBlockElem) {
            emptyBlockElem.style.width = tWidth ? `${tWidth}px` : tWidth
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
            tableElem.style.width = tWidth === null ? tWidth : `${tWidth + scrollbarWidth}px`
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
              colElem.width = `${scrollbarWidth || ''}`
            }
            if (fullColumnIdData[colid]) {
              let column = fullColumnIdData[colid].column
              let { showHeaderOverflow, showOverflow } = column
              let cellOverflow
              colElem.width = `${column.renderWidth || ''}`
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
                    cellElem.style.width = `${border ? colWidth - (1 * colspan) : colWidth}px`
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
        DomTools[bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft ? 'addClass' : 'removeClass'](rightContainer, 'scrolling--middle')
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
    let { $el, $refs, editStore, ctxMenuStore, editConfig = {}, filterStore, getEventTargetNode, getRowNode } = this
    let { actived } = editStore
    let { filterWrapper, validTip } = $refs
    if (filterWrapper) {
      if (getEventTargetNode(evnt, $el, 'vxe-filter-wrapper').flag) {
        // 如果点击了筛选按钮
      } else if (getEventTargetNode(evnt, filterWrapper.$el).flag) {
        // 如果点击筛选容器
      } else {
        this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter)
      }
    }
    // 如果已激活了编辑状态
    if (actived.row) {
      if (!(editConfig.autoClear === false)) {
        if (validTip && getEventTargetNode(evnt, validTip.$el).flag) {
          // 如果是激活状态，且点击了校验提示框
        } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
          // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
          this.preventEvent(evnt, 'event.clearActived', actived.args, () => {
            let isClear
            if (editConfig.mode === 'row') {
              let rowNode = getEventTargetNode(evnt, $el, 'vxe-body--row')
              // row 方式，如果点击了不同行
              isClear = rowNode.flag ? getRowNode(rowNode.targetElem).item !== getRowNode(actived.args.cell.parentNode).item : 0
            } else {
              // cell 方式，如果是非编辑列
              isClear = !getEventTargetNode(evnt, $el, 'col--edit').flag
            }
            if (
              isClear ||
                // 如果点击了当前表格之外
                !getEventTargetNode(evnt, $el).flag
            ) {
              setTimeout(() => this.clearActived(evnt))
            }
          })
        }
      }
    }
    // 如果配置了快捷菜单且，点击了其他地方则关闭
    if (ctxMenuStore.visible && this.$refs.ctxWrapper && !getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
      this.closeMenu()
    }
    // 最后激活的表格
    this.isActivated = getEventTargetNode(evnt, (this.$grid || this).$el).flag
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
        let { isCtxMenu, ctxMenuStore, editStore, mouseConfig = {}, keyboardConfig = {}, treeConfig, highlightCurrentRow, currentRow } = this
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
        } else if (isEnter && (keyboardConfig.isArrow || keyboardConfig.isTab) && (selected.row || actived.row || (treeConfig && highlightCurrentRow && currentRow))) {
        // 如果是激活状态，退则出到下一行
          if (selected.row || actived.row) {
            this.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, isUpArrow, isRightArrow, true, evnt)
          } else if (treeConfig && highlightCurrentRow && currentRow) {
          // 如果是树形表格当前行回车移动到子节点
            let childrens = currentRow[treeConfig.children]
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
            let { parent: parentRow } = XEUtils.findTree(this.afterFullData, item => item === currentRow, treeConfig)
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
    this.recalculate()
  },
  handleTooltipLeaveEvent (evnt) {
    let { tooltipConfig = {} } = this
    setTimeout(() => {
      if (!this.tooltipActive) {
        this.clostTooltip()
      }
    }, tooltipConfig.leaveDelay || GlobalConfig.tooltip.leaveDelay)
  },
  handleTargetEnterEvent (evnt) {
    clearTimeout(this.tooltipTimeout)
    this.tooltipActive = true
    this.clostTooltip()
  },
  handleTargetLeaveEvent (evnt) {
    let { tooltipConfig = {} } = this
    this.tooltipActive = false
    if (tooltipConfig.enterable) {
      this.tooltipTimeout = setTimeout(() => {
        if (!this.$refs.tooltip.isHover) {
          this.clostTooltip()
        }
      }, tooltipConfig.leaveDelay || GlobalConfig.tooltip.leaveDelay)
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
    let { editConfig, editStore, tooltipStore } = this
    let { actived } = editStore
    let { row, column } = params
    this.handleTargetEnterEvent()
    if (editConfig) {
      if ((editConfig.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {
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
  handleSelectionDefChecked () {
    let { fullDataRowIdData } = this
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    let { checkAll, checkRowKeys } = checkboxConfig
    if (checkAll) {
      this.setAllSelection(true)
    } else if (checkRowKeys) {
      let defSelection = []
      checkRowKeys.forEach(rowid => {
        if (fullDataRowIdData[rowid]) {
          defSelection.push(fullDataRowIdData[rowid].row)
        }
      })
      this.setSelection(defSelection, true)
    }
  },
  /**
   * 用于多选行，设置行为选中状态，第二个参数为选中与否
   * @param {Array/Row} rows 行数据
   * @param {Boolean} value 是否选中
   */
  setSelection (rows, value) {
    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    rows.forEach(row => this.handleSelectRow({ row }, !!value))
    return this.$nextTick()
  },
  /**
   * 多选，行选中事件
   * value 选中true 不选false 不确定-1
   */
  handleSelectRow ({ row }, value) {
    let { selection, tableFullData, treeConfig, treeIndeterminates } = this
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    let { checkField: property, checkStrictly, checkMethod } = checkboxConfig
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
          }, treeConfig)
          XEUtils.remove(treeIndeterminates, item => item === row)
        }
        // 如果存在父节点，更新父节点状态
        let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeConfig)
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
          }, treeConfig)
          XEUtils.remove(treeIndeterminates, item => item === row)
        }
        // 如果存在父节点，更新父节点状态
        let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeConfig)
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
    let { selection } = this
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    let { checkField: property } = checkboxConfig
    let { row } = params
    let value = property ? !XEUtils.get(row, property) : selection.indexOf(row) === -1
    if (evnt) {
      this.triggerCheckRowEvent(evnt, params, value)
    } else {
      this.handleSelectRow(params, value)
    }
  },
  triggerCheckRowEvent (evnt, params, value) {
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    let { checkMethod } = checkboxConfig
    if (!checkMethod || checkMethod({ row: params.row, rowIndex: params.rowIndex, $rowIndex: params.$rowIndex })) {
      this.handleSelectRow(params, value)
      UtilTools.emitEvent(this, 'select-change', [Object.assign({ selection: this.getSelectRecords(), reserves: this.getSelectReserveRecords(), checked: value, $table: this }, params), evnt])
    }
  },
  /**
   * 多选，切换某一行的选中状态
   */
  toggleRowSelection (row) {
    this.handleToggleCheckRowEvent({ row })
    return this.$nextTick()
  },
  /**
   * 用于多选行，设置所有行的选中状态
   * @param {Boolean} value 是否选中
   */
  setAllSelection (value) {
    let { tableFullData, editStore, treeConfig, selection, selectReserveRowMap } = this
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    let { checkField: property, reserve, checkStrictly, checkMethod } = checkboxConfig
    let { insertList } = editStore
    let selectRows = []
    // 包含新增的数据
    if (insertList.length) {
      tableFullData = tableFullData.concat(insertList)
    }
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
          XEUtils.eachTree(tableFullData, value ? setValFn : clearValFn, treeConfig)
        } else {
          tableFullData.forEach(value ? setValFn : clearValFn)
        }
      } else {
        if (treeConfig) {
          if (value) {
            XEUtils.eachTree(tableFullData, (row, $rowIndex) => {
              if (!checkMethod || checkMethod({ row, $rowIndex })) {
                selectRows.push(row)
              }
            }, treeConfig)
          } else {
            if (checkMethod) {
              XEUtils.eachTree(tableFullData, (row, $rowIndex) => {
                if (checkMethod({ row, $rowIndex }) ? 0 : selection.indexOf(row) > -1) {
                  selectRows.push(row)
                }
              }, treeConfig)
            }
          }
        } else {
          if (value) {
            if (checkMethod) {
              selectRows = tableFullData.filter((row, rowIndex) => selection.indexOf(row) > -1 || checkMethod({ row, rowIndex, $rowIndex: rowIndex }))
            } else {
              selectRows = tableFullData.slice(0)
            }
          } else {
            if (checkMethod) {
              selectRows = tableFullData.filter((row, rowIndex) => checkMethod({ row, rowIndex, $rowIndex: rowIndex }) ? 0 : selection.indexOf(row) > -1)
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
          tableFullData.forEach(row => {
            const rowid = UtilTools.getRowid(this, row)
            if (selectReserveRowMap[rowid]) {
              delete selectReserveRowMap[rowid]
            }
          })
        }
      }
      this.selection = selectRows
    }
    this.treeIndeterminates = []
    this.checkSelectionStatus()
  },
  checkSelectionStatus () {
    let { tableFullData, editStore, selection, treeIndeterminates } = this
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    let { checkField: property, checkStrictly, checkMethod } = checkboxConfig
    let { insertList } = editStore
    // 包含新增的数据
    if (insertList.length) {
      tableFullData = tableFullData.concat(insertList)
    }
    if (!checkStrictly) {
      if (property) {
        this.isAllSelected = tableFullData.length && tableFullData.every(
          checkMethod
            ? (row, rowIndex) => !checkMethod({ row, rowIndex, $rowIndex: rowIndex }) || XEUtils.get(row, property)
            : row => XEUtils.get(row, property)
        )
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(row => XEUtils.get(row, property) || treeIndeterminates.indexOf(row) > -1)
      } else {
        this.isAllSelected = tableFullData.length && tableFullData.every(
          checkMethod
            ? (row, rowIndex) => !checkMethod({ row, rowIndex, $rowIndex: rowIndex }) || selection.indexOf(row) > -1
            : row => selection.indexOf(row) > -1
        )
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(row => treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1)
      }
    }
  },
  // 还原展开、选中等相关状态
  handleReserveStatus () {
    let { rowId, treeConfig, fullDataRowIdData, selectReserveRowMap } = this
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    let reserveSelection = []
    let reserveRowExpandeds = []
    let reserveTreeExpandeds = []
    let reserveTreeIndeterminates = []
    // 复选框
    if (rowId) {
      this.handleReserveByRowid(this.selection, reserveSelection)
    }
    if (checkboxConfig.reserve) {
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
  /**
   * 获取保留选中的行
   */
  getSelectReserveRecords () {
    let { fullDataRowIdData, selectReserveRowMap } = this
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    let reserveSelection = []
    if (checkboxConfig.reserve) {
      Object.keys(selectReserveRowMap).forEach((rowid, row) => {
        if (!fullDataRowIdData[rowid]) {
          reserveSelection.push(selectReserveRowMap[rowid])
        }
      })
    }
    return reserveSelection
  },
  clearSelectReserve () {
    this.selectReserveRowMap = {}
  },
  handleSelectReserveRow (row, checked) {
    const { selectReserveRowMap } = this
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    let { reserve } = checkboxConfig
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
    this.setAllSelection(value)
    UtilTools.emitEvent(this, 'select-all', [{ selection: this.getSelectRecords(), reserves: this.getSelectReserveRecords(), checked: value, $table: this }, evnt])
  },
  /**
   * 多选，切换所有行的选中状态
   */
  toggleAllSelection () {
    this.triggerCheckAllEvent(null, !this.isAllSelected)
    return this.$nextTick()
  },
  /**
   * 用于多选行，手动清空用户的选择
   */
  clearSelection () {
    let { tableFullData, treeConfig } = this
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    let { checkField: property } = checkboxConfig
    if (property) {
      if (treeConfig) {
        XEUtils.eachTree(tableFullData, item => XEUtils.set(item, property, false), treeConfig)
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
  handleRadioDefChecked () {
    let { radioConfig = {}, fullDataRowIdData } = this
    let { checkRowKey: rowid } = radioConfig
    if (rowid && fullDataRowIdData[rowid]) {
      this.setRadioRow(fullDataRowIdData[rowid].row)
    }
  },
  /**
   * 单选，行选中事件
   */
  triggerRadioRowEvent (evnt, params) {
    let { radioConfig = {} } = this
    let { checkMethod } = radioConfig
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
  /**
   * 用于当前行，获取当前行的数据
   */
  getCurrentRow () {
    return this.currentRow
  },
  /**
   * 用于单选行，获取当已选中的数据
   */
  getRadioRow () {
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
    let triggerSort = this.getEventTargetNode(evnt, cell, 'vxe-sort-wrapper').flag
    let triggerFilter = this.getEventTargetNode(evnt, cell, 'vxe-filter-wrapper').flag
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
    let { $el, highlightCurrentRow, editStore, radioConfig = {}, expandConfig = {}, treeConfig = {}, editConfig, mouseConfig = {} } = this
    let { actived } = editStore
    let { row, column, cell } = params
    // 在 v3.0 中废弃 selectConfig
    let checkboxConfig = this.checkboxConfig || this.selectConfig || {}
    // 解决 checkbox 重复触发两次问题
    if (isTargetRadioOrCheckbox(evnt, column, 'radio') || isTargetRadioOrCheckbox(evnt, column, 'checkbox', 'checkbox') || isTargetRadioOrCheckbox(evnt, column, 'selection', 'checkbox')) {
      // 在 v3.0 中废弃 type=selection
      return
    }
    // 如果是展开行
    if ((expandConfig.trigger === 'row' || (column.type === 'expand' && expandConfig.trigger === 'cell')) && !this.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag) {
      this.triggerRowExpandEvent(evnt, params)
    }
    // 如果是树形表格
    if ((treeConfig.trigger === 'row' || (column.treeNode && treeConfig.trigger === 'cell'))) {
      this.triggerTreeExpandEvent(evnt, params)
    }
    if ((!column.treeNode || !this.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag) && (column.type !== 'expand' || !this.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag)) {
      // 如果是高亮行
      if (highlightCurrentRow) {
        if (radioConfig.trigger === 'row' || (!this.getEventTargetNode(evnt, $el, 'vxe-checkbox').flag && !this.getEventTargetNode(evnt, $el, 'vxe-radio').flag)) {
          this.triggerCurrentRowEvent(evnt, params)
        }
      }
      // 如果是单选框
      if ((radioConfig.trigger === 'row' || (column.type === 'radio' && radioConfig.trigger === 'cell')) && !this.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
        this.triggerRadioRowEvent(evnt, params)
      }
      // 如果是复选框
      if ((checkboxConfig.trigger === 'row' || ((column.type === 'checkbox' || column.type === 'selection') && checkboxConfig.trigger === 'cell')) && !this.getEventTargetNode(evnt, params.cell, 'vxe-checkbox').flag) {
        // 在 v3.0 中废弃 type=selection
        this.handleToggleCheckRowEvent(params, evnt)
      }
      // 如果设置了单元格选中功能，则不会使用点击事件去处理（只能支持双击模式）
      if (!mouseConfig.checked) {
        if (editConfig) {
          if (editConfig.trigger === 'manual') {
            if (actived.args && actived.row === row && column !== actived.column) {
              this.handleChangeCell(evnt, params)
            }
          } else if (!actived.args || cell !== actived.args.cell) {
            if (editConfig.trigger === 'click') {
              this.handleChangeCell(evnt, params)
            } else if (editConfig.trigger === 'dblclick') {
              if (editConfig.mode === 'row' && actived.row === params.row) {
                this.handleChangeCell(evnt, params)
              } else {
                this.handleSelected(params, evnt)
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
    let { editStore, editConfig } = this
    let { actived } = editStore
    if (editConfig && editConfig.trigger === 'dblclick') {
      if (!actived.args || evnt.currentTarget !== actived.args.cell) {
        if (editConfig.mode === 'row') {
          this.checkValidate('blur')
            .catch(e => e)
            .then(() => {
              this.handleActived(params, evnt)
                .then(() => this.checkValidate('change'))
                .catch(e => e)
            })
        } else if (editConfig.mode === 'cell') {
          this.handleActived(params, evnt)
            .then(() => this.checkValidate('change'))
            .catch(e => e)
        }
      }
    }
    UtilTools.emitEvent(this, 'cell-dblclick', [params, evnt])
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
    let { visibleColumn, tableFullColumn, remoteSort } = this
    let column = XEUtils.find(visibleColumn, item => item.property === field)
    let isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort
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
   * 展开行事件
   */
  triggerRowExpandEvent (evnt, { row }) {
    let rest = this.toggleRowExpansion(row)
    UtilTools.emitEvent(this, 'toggle-expand-change', [{ row, rowIndex: this.getRowIndex(row), $table: this }, evnt])
    return rest
  },
  /**
   * 切换展开行
   */
  toggleRowExpansion (row) {
    return this.setRowExpansion(row)
  },
  /**
   * 处理默认展开行
   */
  handleDefaultRowExpand () {
    let { expandConfig = {}, tableFullData, fullDataRowIdData } = this
    let { expandAll, expandRowKeys } = expandConfig
    if (expandAll) {
      this.rowExpandeds = tableFullData.slice(0)
    } else if (expandRowKeys) {
      let defExpandeds = []
      expandRowKeys.forEach(rowid => {
        if (fullDataRowIdData[rowid]) {
          defExpandeds.push(fullDataRowIdData[rowid].row)
        }
      })
      this.rowExpandeds = defExpandeds
    }
  },
  /**
   * 设置所有行的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllRowExpansion (expanded) {
    this.rowExpandeds = expanded ? this.tableFullData.slice(0) : []
    return this.$nextTick().then(this.recalculate)
  },
  /**
   * 设置展开行，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setRowExpansion (rows, expanded) {
    let { rowExpandeds, expandConfig = {} } = this
    let isToggle = arguments.length === 1
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (expandConfig.accordion) {
        // 只能同时展开一个
        rowExpandeds.length = 0
        rows = rows.slice(rows.length - 1, rows.length)
      }
      rows.forEach(row => {
        let index = rowExpandeds.indexOf(row)
        if (index > -1) {
          if (isToggle || !expanded) {
            rowExpandeds.splice(index, 1)
          }
        } else {
          if (isToggle || expanded) {
            rowExpandeds.push(row)
          }
        }
      })
    }
    return this.$nextTick().then(this.recalculate)
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
        config: this.treeConfig,
        rowExpandeds: this.getTreeExpandRecords()
      }
    }
    return null
  },
  /**
   * 展开树节点事件
   */
  triggerTreeExpandEvent (evnt, { row }) {
    let rest = this.toggleTreeExpansion(row)
    UtilTools.emitEvent(this, 'toggle-tree-change', [{ row, rowIndex: this.getRowIndex(row), $table: this }, evnt])
    this.$nextTick(() => {
      let { currentRow, currentColumn } = this
      if (currentRow) {
        this.setCurrentRow(currentRow)
      } else if (currentColumn) {
        this.setCurrentColumn(currentColumn)
      }
    })
    return rest
  },
  /**
   * 切换/展开树节点
   */
  toggleTreeExpansion (row) {
    return this.setTreeExpansion(row)
  },
  /**
   * 处理默认展开树节点
   */
  handleDefaultTreeExpand () {
    let { treeConfig, tableFullData } = this
    if (treeConfig) {
      let { expandAll, expandRowKeys } = treeConfig
      let { children } = treeConfig
      let treeExpandeds = []
      if (expandAll) {
        XEUtils.filterTree(tableFullData, row => {
          let rowChildren = row[children]
          if (rowChildren && rowChildren.length) {
            treeExpandeds.push(row)
          }
        }, treeConfig)
        this.treeExpandeds = treeExpandeds
      } else if (expandRowKeys) {
        let rowkey = UtilTools.getRowkey(this)
        expandRowKeys.forEach(rowid => {
          let matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), treeConfig)
          let rowChildren = matchObj ? matchObj.item[children] : 0
          if (rowChildren && rowChildren.length) {
            treeExpandeds.push(matchObj.item)
          }
        })
        this.treeExpandeds = treeExpandeds
      }
    }
  },
  /**
   * 设置所有树节点的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllTreeExpansion (expanded) {
    let { tableFullData, treeConfig } = this
    let { children } = treeConfig
    let treeExpandeds = []
    if (expanded) {
      XEUtils.eachTree(tableFullData, row => {
        let rowChildren = row[children]
        if (rowChildren && rowChildren.length) {
          treeExpandeds.push(row)
        }
      }, treeConfig)
    }
    this.treeExpandeds = treeExpandeds
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
    let { tableFullData, treeExpandeds, treeConfig } = this
    let { children } = treeConfig
    let isToggle = arguments.length === 1
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (treeConfig.accordion) {
        rows = rows.slice(rows.length - 1, rows.length)
      }
      rows.forEach(row => {
        let rowChildren = row[children]
        if (rowChildren && rowChildren.length) {
          let index = treeExpandeds.indexOf(row)
          if (treeConfig.accordion) {
            // 同一级只能展开一个
            let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeConfig)
            XEUtils.remove(treeExpandeds, item => matchObj.items.indexOf(item) > -1)
          }
          if (index > -1) {
            if (isToggle || !expanded) {
              treeExpandeds.splice(index, 1)
            }
          } else {
            if (isToggle || expanded) {
              treeExpandeds.push(row)
            }
          }
        }
      })
    }
    return this.$nextTick().then(this.recalculate)
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
    for (let index = 0; index < visibleColumn.length; index++) {
      width += visibleColumn[index].renderWidth
      if (scrollLeft < width) {
        toVisibleIndex = index
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
          scrollXStore.startIndex = Math.max(0, Math.max(marginSize, toVisibleIndex - marginSize))
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
          let firstColumn = visibleColumn[0]
          let cWidth = firstColumn ? firstColumn.renderWidth : 40
          let visibleXSize = XEUtils.toNumber(scrollX.vSize || Math.ceil(tableBodyElem.clientWidth / cWidth))
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
            scrollYStore.renderSize = browse.firefox ? visibleYSize * 6 : (browse.edge ? visibleYSize * 10 : (isWebkit ? visibleYSize + 2 : visibleYSize * 6))
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
    if (row && this.fullAllDataRowMap.has(row)) {
      rest.push(DomTools.rowToVisible(this, row))
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
    let { tableFullData, treeConfig } = this
    if (treeConfig) {
      let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeConfig)
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
const funcs = 'filter,clearFilter,closeMenu,getMouseSelecteds,getMouseCheckeds,clearCopyed,clearChecked,clearHeaderChecked,clearIndexChecked,clearSelected,insert,insertAt,remove,removeSelecteds,revert,revertData,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearActived,getActiveRow,hasActiveRow,isActiveByRow,setActiveRow,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,exportCsv,openExport,exportData,openImport,importData,readFile,importByFile,print'.split(',')

funcs.forEach(name => {
  Methods[name] = function () {
    return this[`_${name}`] ? this[`_${name}`].apply(this, arguments) : null
  }
})

export default Methods
