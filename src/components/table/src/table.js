import XEUtils from 'xe-utils'
import TableHeader from './header'
import TableBody from './body'
import TableFooter from './footer'
import UtilTools from '../../../tools/utils'
import DomTools from '../../../tools/dom'
import ExportTools from '../../../tools/export'
import GlobalEvent from '../../../tools/event'
import ResizeEvent from './resize'
import TableProps from './props'
import TableFilter from './filter'
import TableContextMenu from './menu'
import GlobalConfig from '../../../conf'
import EventInterceptor from '../../../interceptor'

/**
 * 渲染浮固定列
 */
function renderFixed (h, $table, fixedType, footerData) {
  let {
    tableData,
    tableColumn,
    visibleColumn,
    collectColumn,
    isGroup,
    height,
    headerHeight,
    footerHeight,
    showHeader,
    showFooter,
    tableHeight,
    scrollYWidth,
    scrollXHeight,
    scrollRightToLeft,
    scrollLeftToRight,
    columnStore
  } = $table
  let customHeight = isNaN(height) ? 0 : parseFloat(height)
  let isRightFixed = fixedType === 'right'
  let fixedColumn = columnStore[`${fixedType}List`]
  let style = {
    height: `${(customHeight ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollXHeight * (showFooter ? 2 : 1)}px`,
    width: `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, isRightFixed ? scrollYWidth : 0)}px`
  }
  return h('div', {
    class: [`vxe-table--fixed-${fixedType}-wrapper`, {
      'scrolling--middle': isRightFixed ? scrollRightToLeft : scrollLeftToRight
    }],
    style,
    ref: `fixedTable`
  }, [
    showHeader ? h('table-header', {
      props: {
        fixedType,
        tableData,
        tableColumn,
        visibleColumn,
        collectColumn,
        fixedColumn,
        isGroup
      },
      ref: `${fixedType}Header`
    }) : null,
    h('table-body', {
      style: {
        top: `${headerHeight}px`
      },
      props: {
        fixedType,
        tableData,
        tableColumn,
        visibleColumn,
        collectColumn,
        fixedColumn,
        isGroup
      },
      ref: `${fixedType}Body`
    }),
    showFooter ? h('table-footer', {
      style: {
        top: `${customHeight ? customHeight - footerHeight : tableHeight}px`
      },
      props: {
        fixedType,
        footerData,
        tableColumn,
        visibleColumn,
        fixedColumn
      },
      ref: `${fixedType}Footer`
    }) : null
  ])
}

export default {
  name: 'VxeTable',
  props: TableProps,
  components: {
    TableHeader,
    TableBody,
    TableFooter,
    TableFilter,
    TableContextMenu
  },
  provide () {
    return {
      $table: this
    }
  },
  data () {
    return {
      id: XEUtils.uniqueId(),
      // 列分组配置
      collectColumn: [],
      // 完整所有列
      tableFullColumn: [],
      // 渲染的列
      tableColumn: [],
      // 完整数据
      // tableFullData: [],
      // afterFullData: [],
      // 渲染中的数据
      tableData: [],
      // 表格宽度
      tableWidth: 0,
      // 表格高度
      tableHeight: 0,
      // 表头高度
      headerHeight: 0,
      // 表尾高度
      footerHeight: 0,
      // 是否横向 X 滚动方式加载
      scrollXLoad: false,
      // 是否纵向 Y 滚动方式加载
      scrollYLoad: false,
      // 是否存在纵向滚动条
      overflowY: true,
      // 是否存在横向滚动条
      overflowX: false,
      // 纵向滚动条的宽度
      scrollYWidth: 0,
      // 横向滚动条的高度
      scrollXHeight: 0,
      // 左侧固定列是否向右滚动了
      scrollLeftToRight: false,
      // 右侧固定列是否向左滚动了
      scrollRightToLeft: false,
      // 是否全选
      isAllSelected: false,
      // 多选属性，有选中且非全选状态
      isIndeterminate: false,
      // 多选属性，已选中的列
      selection: [],
      // 单选属性
      selectRow: null,
      // 已展开的行
      expandeds: [],
      // 已展开树节点
      treeExpandeds: [],
      // 树节点不确定状态的列表
      treeIndeterminates: [],
      // 当前 hover 行
      hoverRow: null,
      // 当前选中的筛选列
      filterStore: {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false
      },
      // 存放列相关的信息
      columnStore: {
        leftList: [],
        centerList: [],
        rightList: [],
        resizeList: [],
        pxList: [],
        pxMinList: [],
        scaleList: [],
        scaleMinList: [],
        autoList: []
      },
      // 存放快捷菜单的信息
      ctxMenuStore: {
        selected: null,
        visible: false,
        showChild: false,
        selectChild: null,
        list: [],
        style: null
      },
      // 存放横向 X 滚动渲染相关的信息
      scrollXStore: {
        renderSize: 0,
        visibleSize: 0,
        offsetSize: 0,
        rowHeight: 0,
        startIndex: 0,
        visibleIndex: 0,
        leftSpaceWidth: 0,
        rightSpaceWidth: 0
      },
      // 存放纵向 Y 滚动渲染相关的信息
      scrollYStore: {
        renderSize: 0,
        visibleSize: 0,
        offsetSize: 0,
        rowHeight: 0,
        startIndex: 0,
        visibleIndex: 0,
        topSpaceHeight: 0,
        bottomSpaceHeight: 0
      },
      // 存放 tooltip 相关信息
      tooltipStore: {
        visible: false,
        row: null,
        column: null,
        content: null,
        style: null,
        arrowStyle: null,
        placement: null
      },
      // 存放可编辑相关信息
      editStore: {
        // 所有选中
        checked: {
          rows: [],
          columns: [],
          tRows: [],
          tColumns: []
        },
        // 选中源
        selected: {
          row: null,
          column: null
        },
        // 已复制源
        copyed: {
          cut: false,
          rows: [],
          columns: []
        },
        // 激活
        actived: {
          row: null,
          column: null
        },
        insertList: [],
        removeList: []
      },
      // 存放数据校验相关信息
      validStore: {
        visible: false,
        row: null,
        column: null,
        rule: null,
        style: null,
        placement: null
      }
    }
  },
  computed: {
    // 优化的参数
    optimizeConfig () {
      return Object.assign({}, GlobalConfig.optimized, this.optimized)
    },
    // 是否使用了分组表头
    isGroup () {
      return this.collectColumn.some(column => UtilTools.hasChildrenList(column))
    },
    visibleColumn () {
      return this.tableFullColumn ? this.tableFullColumn.filter(column => column.visible) : []
    },
    isFilter () {
      return this.tableColumn.some(column => column.filters && column.filters.length)
    },
    headerCtxMenu () {
      return this.ctxMenuConfig.header && this.ctxMenuConfig.header.options ? this.ctxMenuConfig.header.options : []
    },
    bodyCtxMenu () {
      return this.ctxMenuConfig.body && this.ctxMenuConfig.body.options ? this.ctxMenuConfig.body.options : []
    },
    isCtxMenu () {
      return this.headerCtxMenu.length || this.bodyCtxMenu.length
    },
    ctxMenuConfig () {
      return Object.assign({}, this.contextMenu)
    },
    ctxMenuList () {
      let rest = []
      this.ctxMenuStore.list.forEach(list => {
        list.forEach(item => {
          rest.push(item)
        })
      })
      return rest
    }
  },
  watch: {
    data (value) {
      if (!this.isUpdateData) {
        this.load(value).then(this.handleDefaultExpand)
      }
      this.isUpdateData = false
    },
    customs (value) {
      if (!this.isUpdateCustoms) {
        this.mergeCustomColumn(value)
      }
      this.isUpdateCustoms = false
    },
    collectColumn (value) {
      this.tableFullColumn = UtilTools.getColumnList(value)
    },
    tableColumn () {
      this.analyColumnWidth()
    },
    visibleColumn () {
      this.refreshColumn()
      this.$nextTick(() => this.recalculate(true))
    }
  },
  created () {
    let { scrollYStore, optimizeConfig, rowKey, treeConfig } = this
    let { scrollY } = optimizeConfig
    if (scrollY) {
      Object.assign(scrollYStore, {
        startIndex: 0,
        visibleIndex: 0,
        renderSize: scrollY.rSize,
        offsetSize: scrollY.oSize
      })
    }
    this.afterFullData = []
    this.fullDataKeyMap = new Map()
    this.load(this.data, true).then(() => {
      if (treeConfig && !(rowKey || treeConfig.key)) {
        throw new Error('[vxe-table] Tree table must have a unique primary key.')
      }
      this.tableFullColumn = UtilTools.getColumnList(this.collectColumn)
      if (this.customs) {
        this.mergeCustomColumn(this.customs)
      }
      this.refreshColumn()
      this.handleDefaultExpand()
      this.$nextTick(() => this.recalculate(true))
    })
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
    GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent)
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent)
  },
  mounted () {
    if (this.autoResize && this.autoWidth) {
      ResizeEvent.on(this, this.$el.parentNode, this.recalculate)
    }
    document.body.appendChild(this.$refs.tableWrapper)
  },
  beforeDestroy () {
    let tableWrapper = this.$refs.tableWrapper
    if (tableWrapper && tableWrapper.parentNode) {
      tableWrapper.parentNode.removeChild(tableWrapper)
    }
    this.afterFullData.length = 0
    this.fullDataKeyMap.clear()
    this.closeFilter()
    this.closeContextMenu()
    ResizeEvent.off(this, this.$el.parentNode)
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
    GlobalEvent.off(this, 'contextmenu')
    GlobalEvent.off(this, 'mousewheel')
    GlobalEvent.off(this, 'keydown')
    GlobalEvent.off(this, 'resize')
  },
  render (h) {
    let {
      _e,
      id,
      tableData,
      tableColumn,
      visibleColumn,
      collectColumn,
      isGroup,
      isFilter,
      isCtxMenu,
      loading,
      showHeader,
      resizable,
      border,
      stripe,
      highlightHoverRow,
      size,
      tooltipConfig,
      editConfig,
      showFooter,
      footerMethod,
      overflowX,
      overflowY,
      scrollXHeight,
      optimizeConfig,
      columnStore,
      filterStore,
      ctxMenuStore,
      tooltipStore,
      validStore,
      getRecords
    } = this
    let { leftList, rightList } = columnStore
    let footerData = showFooter && footerMethod && visibleColumn.length ? footerMethod({ columns: visibleColumn, data: getRecords() }) : ['-']
    return h('div', {
      class: ['vxe-table', size ? `size--${size}` : '', {
        'vxe-editable': editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'scroll--y': overflowY,
        'scroll--x': overflowX,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        't--animat': optimizeConfig.animat,
        't--stripe': stripe,
        't--border': border,
        't--highlight': highlightHoverRow
      }]
    }, [
      /**
       * 隐藏列
       */
      h('div', {
        class: ['vxe-table-hidden-column'],
        ref: 'hideColumn'
      }, this.$slots.default),
      /**
       * 主头部
       */
      showHeader ? h('table-header', {
        ref: 'tableHeader',
        props: {
          tableData,
          tableColumn,
          visibleColumn,
          collectColumn,
          isGroup
        }
      }) : _e(),
      /**
       * 主内容
       */
      h('table-body', {
        ref: 'tableBody',
        props: {
          tableData,
          tableColumn,
          visibleColumn,
          collectColumn,
          isGroup
        }
      }),
      /**
       * 底部汇总
       */
      showFooter ? h('table-footer', {
        props: {
          footerData,
          footerMethod,
          tableColumn,
          visibleColumn
        },
        ref: 'tableFooter'
      }) : _e(),
      /**
       * 左侧固定列
       */
      leftList && leftList.length && overflowX ? renderFixed(h, this, 'left', footerData) : _e(),
      /**
       * 右侧固定列
       */
      rightList && rightList.length && overflowX ? renderFixed(h, this, 'right', footerData) : _e(),
      /**
       * 列宽线
       */
      resizable ? h('div', {
        class: ['vxe-table--resizable-bar'],
        style: overflowX ? {
          'padding-bottom': `${scrollXHeight}px`
        } : null,
        ref: 'resizeBar'
      }) : _e(),
      /**
       * 加载中
       */
      h('div', {
        class: ['vxe-table--loading'],
        style: {
          display: loading ? 'block' : 'none'
        }
      }, [
        h('div', {
          class: 'vxe-table--spinner'
        })
      ]),
      h('div', {
        class: [`vxe-table${id}-wrapper`],
        ref: 'tableWrapper'
      }, [
        /**
         * 筛选
         */
        isFilter ? h('table-filter', {
          props: {
            optimizeConfig,
            filterStore
          },
          ref: 'filterWrapper'
        }) : null,
        /**
         * 快捷菜单
         */
        isCtxMenu ? h('table-context-menu', {
          props: {
            ctxMenuStore
          },
          ref: 'ctxWrapper'
        }) : null,
        /**
         * tooltip
         */
        tooltipStore.visible ? h('div', {
          class: ['vxe-table--tooltip-wrapper', `theme--${tooltipConfig ? tooltipConfig.theme : 'dark'}`, `placement--${tooltipStore.placement}`],
          style: tooltipStore.style,
          ref: 'tipWrapper'
        }, [
          h('div', {
            class: ['vxe-table--tooltip-content']
          }, UtilTools.formatText(tooltipStore.content)),
          h('div', {
            class: ['vxe-table--tooltip-arrow'],
            style: tooltipStore.arrowStyle
          })
        ]) : null,
        /**
         * valid error
         */
        validStore.visible ? h('div', {
          class: ['vxe-table--valid-error-wrapper', `placement--${validStore.placement}`],
          style: validStore.style,
          ref: 'validWrapper'
        }, [
          h('div', {
            class: ['vxe-table--valid-error-content']
          }, UtilTools.formatText(validStore.rule.message)),
          h('div', {
            class: ['vxe-table--valid-error-arrow']
          })
        ]) : null
      ])
    ])
  },
  methods: {
    clearSort () {
      this.tableFullColumn.forEach(column => {
        column.order = null
      })
      this.tableFullData = this.data || []
      this.tableData = this.getTableData(true).tableData
      return this.$nextTick()
    },
    clearFilter (force) {
      Object.assign(this.filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false
      })
      return this.$nextTick()
    },
    load (data, init) {
      let { height, maxHeight, autoWidth, optimizeConfig, recalculate } = this
      let { scrollY } = optimizeConfig
      let tableFullData = data || []
      let scrollYLoad = scrollY && scrollY.gt && scrollY.gt < tableFullData.length
      this.insertList = []
      this.removeList = []
      // 原始数据
      this.tableSourceData = XEUtils.clone(tableFullData, true)
      // 全量数据
      this.tableFullData = tableFullData
      this.scrollYLoad = scrollYLoad
      if (scrollYLoad && !(height || maxHeight)) {
        throw new Error('[vxe-table] The height/max-height must be set for the scroll load.')
      }
      this.tableData = this.getTableData(true).tableData
      this.updateKeyMap(tableFullData, 'fullDataKeyMap')
      this.checkSelectionStatus()
      let rest = this.$nextTick()
      if (!init) {
        if (autoWidth) {
          rest = rest.then(recalculate)
        }
      }
      return rest
    },
    reload (data) {
      this.clearScroll()
      this.clearSort()
      this.clearFilter()
      this.clearSelection()
      this.clearRowExpand()
      this.clearTreeExpand()
      return this.load(data).then(this.handleDefaultExpand)
    },
    // 更新数据真实的 key Map
    updateKeyMap (datas, key) {
      let keyMap = this[key]
      keyMap.clear()
      datas.forEach((row, rowIndex) => keyMap.set(row, rowIndex))
    },
    getIndex (row) {
      let { tableFullData, fullDataKeyMap, treeConfig } = this
      if (fullDataKeyMap && fullDataKeyMap.has(row)) {
        return fullDataKeyMap.get(row)
      }
      return treeConfig ? XEUtils.findTree(tableFullData, item => item === row, treeConfig) : -1
    },
    insert (records) {
      return this.insertAt(records)
    },
    /**
     * 从指定行插入数据
     */
    insertAt (records, row) {
      let { tableData, insertList, defineProperty } = this
      if (!XEUtils.isArray(records)) {
        records = [records]
      }
      let newRecords = records.map(record => defineProperty(record))
      if (arguments.length === 1) {
        tableData.unshift.apply(tableData, newRecords)
      } else {
        if (row === -1) {
          tableData.push.apply(tableData, newRecords)
        } else {
          let rowIndex = tableData.indexOf(row)
          tableData.splice.apply(tableData, [rowIndex, 0].concat(newRecords))
        }
      }
      insertList.splice.apply(insertList, newRecords)
      return this.$nextTick().then(() => ({ row: newRecords.length ? newRecords[newRecords.length - 1] : null, rows: newRecords }))
    },
    defineProperty (record) {
      let recordItem = Object.assign({}, record)
      this.visibleColumn.forEach(column => {
        if (column.property && !XEUtils.has(recordItem, column.property)) {
          XEUtils.set(recordItem, column.property, null)
        }
      })
      return recordItem
    },
    /**
     * 删除指定行数据
     * 支持删除一行
     * 支持删除多行
     */
    remove (rows) {
      let { tableData, tableFullData, removeList, selection } = this
      let rest = []
      this.isUpdateData = true
      if (rows) {
        if (!XEUtils.isArray(rows)) {
          rows = [rows]
        }
        if (rows.length) {
          rest = XEUtils.remove(tableFullData, item => rows.indexOf(item) > -1)
        }
      }
      removeList.push.apply(removeList, rest)
      XEUtils.remove(tableData, item => rest.indexOf(item) > -1)
      XEUtils.remove(selection, item => rest.indexOf(item) > -1)
      this.checkSelectionStatus()
      return this.$nextTick().then(() => ({ row: rows && rows.length ? rows[rows.length - 1] : null, rows: rest }))
    },
    /**
     * 删除选中数据
     */
    removeSelecteds () {
      return this.remove(this.selection).then(params => {
        this.selection = []
        return params
      })
    },
    /**
     * 还原数据
     * 支持还原整个表格
     * 支持还原一行
     * 支持还原多行
     * 支持还原指定单元格
     */
    revert (rows, prop) {
      let { tableSourceData, tableFullData } = this
      if (arguments.length) {
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        rows.forEach(row => {
          let rowIndex = tableFullData.indexOf(row)
          let oRow = tableSourceData[rowIndex]
          if (oRow && row) {
            if (prop) {
              UtilTools.setCellValue(row, prop, UtilTools.getCellValue(oRow, prop))
            } else {
              XEUtils.destructuring(row, oRow)
            }
          }
        })
        return this.$nextTick()
      }
      return this.reload(tableSourceData)
    },
    /**
     * 清空单元格内容
     * 支持清空整个表格内容
     * 支持清空一行内容
     * 支持清空多行内容
     * 支持清空指定单元格内容
     */
    clearData (rows, prop) {
      let { tableSourceData, visibleColumn } = this
      if (!arguments.length) {
        rows = tableSourceData
      } else if (rows && !XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (prop) {
        rows.forEach(row => UtilTools.setCellValue(row, prop, null))
      } else {
        rows.forEach(row => {
          visibleColumn.forEach(column => {
            if (column.property) {
              UtilTools.setCellValue(row, column.property, null)
            }
          })
        })
      }
      return this.$nextTick()
    },
    hasRowChange (row, prop) {
      let { tableFullData, tableSourceData } = this
      let oRowIndex = tableFullData.indexOf(row)
      let oRow = tableSourceData[oRowIndex]
      if (arguments.length > 1) {
        return oRow && !XEUtils.isEqual(UtilTools.getCellValue(oRow, prop), UtilTools.getCellValue(row, prop))
      }
      return oRow && !XEUtils.isEqual(oRow, row)
    },
    /**
     * 获取表格所有列
     */
    getColumns (columnIndex) {
      let columns = this.visibleColumn
      return arguments.length ? columns[columnIndex] : columns
    },
    /**
     * 获取表格所有数据
     */
    getRecords (rowIndex) {
      let list = this.tableFullData
      return arguments.length ? list[rowIndex] : list
    },
    /**
     * 获取表格数据集合
     */
    getAllRecords () {
      return {
        records: this.getRecords(),
        selecteds: this.getSelectionRecords(),
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      }
    },
    /**
     * 获取新增数据
     */
    getInsertRecords () {
      return this.insertList
    },
    /**
     * 获取删除数据
     */
    getRemoveRecords () {
      return this.removeList
    },
    /**
     * 获取选中数据
     */
    getSelectionRecords () {
      let { tableFullData, selection } = this
      return tableFullData.filter(item => selection.indexOf(item) > -1)
    },
    /**
     * 获取更新数据
     */
    getUpdateRecords () {
      let { tableSourceData, tableFullData, visibleColumn } = this
      let updateRecords = []
      tableFullData.forEach((row, rowIndex) => {
        let oRow = tableSourceData[rowIndex]
        if (oRow && visibleColumn.some(column => !XEUtils.isEqual(UtilTools.getCellValue(oRow, column.property), UtilTools.getCellValue(row, column.property)))) {
          updateRecords.push(row)
        }
      })
      return updateRecords
    },
    /**
     * 获取处理后全量的表格数据
     * 如果存在筛选条件，继续处理
     */
    updateAfterFullData () {
      let { visibleColumn, tableFullData } = this
      let column = this.visibleColumn.find(column => column.order)
      let tableData = tableFullData
      let filterColumn = visibleColumn.filter(({ filters }) => filters && filters.length)
      tableData = tableData.filter(row => {
        return filterColumn.every(column => {
          let { property, filters, filterMethod } = column
          if (filters && filters.length) {
            let valueList = []
            filters.forEach(item => {
              if (item.checked) {
                valueList.push(item.value)
              }
            })
            if (valueList.length && filterMethod !== 'custom') {
              return filterMethod ? valueList.some(value => filterMethod({ value, row, column })) : valueList.indexOf(UtilTools.getCellValue(row, property)) > -1
            }
          }
          return true
        })
      })
      if (column && column.order) {
        let rest = XEUtils.sortBy(tableData, column.property)
        tableData = column.order === 'desc' ? rest.reverse() : rest
      }
      this.afterFullData = tableData
      return tableData
    },
    /**
     * 获取处理后的表格数据
     * 如果存在筛选条件，继续处理
     * 如果存在排序，继续处理
     */
    getTableData (force) {
      let { scrollYLoad, scrollYStore } = this
      let fullData = force ? this.updateAfterFullData() : this.afterFullData
      return { fullData, tableData: scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0) }
    },
    handleDefaultExpand () {
      if (this.selectConfig) {
        this.handleDefaultRowChecked()
      }
      if (this.expandConfig) {
        this.handleDefaultRowExpand()
      }
      if (this.treeConfig) {
        this.handleDefaultTreeExpand()
      }
    },
    /**
     * 动态列处理
     */
    mergeCustomColumn (customColumns) {
      this.isUpdateCustoms = true
      this.tableFullColumn.forEach(column => {
        let item = customColumns.find(item => column.property && item.prop === column.property)
        column.visible = item ? !!item.visible : true
      })
      this.$emit('update:customs', this.tableFullColumn)
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
      let rightIndex = 0
      let centerList = []
      let rightList = []
      let { tableFullColumn, isGroup, columnStore, scrollXStore, optimizeConfig } = this
      let { scrollX } = optimizeConfig
      tableFullColumn.forEach((column, columnIndex) => {
        if (column.visible) {
          if (column.fixed === 'left') {
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
              if (!rightIndex) {
                rightIndex = columnIndex
              }
              if (columnIndex - rightIndex !== 0) {
                isColspan = true
              } else {
                rightIndex++
              }
            }
            rightList.push(column)
          } else {
            centerList.push(column)
          }
        }
      })
      let visibleColumn = leftList.concat(centerList).concat(rightList)
      let scrollXLoad = scrollX && scrollX.gt && scrollX.gt < tableFullColumn.length
      Object.assign(columnStore, { leftList, centerList, rightList })
      if ((isColspan && isGroup) || (rightIndex && rightIndex !== visibleColumn.length)) {
        throw new Error('[vxe-table] Fixed column must to the left and right sides.')
      }
      if (scrollXLoad) {
        Object.assign(scrollXStore, {
          startIndex: 0,
          visibleIndex: 0,
          renderSize: scrollX.rSize,
          offsetSize: scrollX.oSize
        })
        visibleColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize)
      }
      this.scrollXLoad = scrollXLoad
      this.tableColumn = visibleColumn
    },
    /**
     * 指定列宽的列进行拆分
     */
    analyColumnWidth () {
      let resizeList = []
      let pxList = []
      let pxMinList = []
      let scaleList = []
      let scaleMinList = []
      let autoList = []
      this.tableFullColumn.forEach(column => {
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
     * 计算单元格列宽，动态分配可用剩余空间
     * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
     */
    recalculate (refull) {
      let { $refs, scrollXLoad, scrollYLoad } = this
      let tableBody = $refs.tableBody
      let tableHeader = $refs.tableHeader
      let tableFooter = $refs.tableFooter
      let bodyElem = tableBody ? tableBody.$el : null
      let headerElem = tableHeader ? tableHeader.$el : null
      let footerElem = tableFooter ? tableFooter.$el : null
      if (bodyElem) {
        let bodyWidth = bodyElem.clientWidth
        let tableWidth = this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth)
        if (refull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          return this.$nextTick().then(() => {
            bodyWidth = bodyElem.clientWidth
            if (bodyWidth !== tableWidth) {
              this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth)
            }
          })
        }
      }
      if (scrollXLoad || scrollYLoad) {
        this.computeScrollLoad()
      }
      return this.$nextTick()
    },
    // 列宽计算
    autoCellWidth (headerElem, bodyElem, footerElem, bodyWidth) {
      let meanWidth
      let tableWidth = 0
      let minCellWidth = 40 // 列宽最少限制 40px
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
      meanWidth = remainWidth > 0 ? Math.max(Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)), minCellWidth) : minCellWidth
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
        column.renderWidth = meanWidth
        tableWidth += meanWidth
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
      this.scrollYWidth = bodyElem.offsetWidth - bodyWidth
      this.overflowY = this.scrollYWidth > 0
      this.tableWidth = tableWidth
      this.tableHeight = tableHeight
      if (headerElem) {
        this.headerHeight = headerElem.offsetHeight
      }
      if (footerElem) {
        let footerHeight = footerElem.offsetHeight
        this.scrollXHeight = Math.max(footerHeight - footerElem.clientHeight, 0)
        this.overflowX = tableWidth > footerElem.clientWidth
        this.footerHeight = footerHeight
      } else {
        this.scrollXHeight = Math.max(tableHeight - bodyElem.clientHeight, 0)
        this.overflowX = tableWidth > bodyWidth
      }
      if (this.overflowX) {
        this.checkScrolling()
      }
      return tableWidth
    },
    /**
     * 处理固定列的显示状态
     */
    checkScrolling () {
      let { tableBody, leftBody, rightBody } = this.$refs
      let bodyElem = tableBody ? tableBody.$el : null
      if (bodyElem) {
        if (leftBody) {
          this.scrollLeftToRight = bodyElem.scrollLeft > 0
        }
        if (rightBody) {
          this.scrollRightToLeft = bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft
        }
      }
    },
    /**
     * 全局按下事件处理
     */
    handleGlobalMousedownEvent (evnt) {
      let { editStore, ctxMenuStore, editConfig = {} } = this
      let { actived } = editStore
      if (this.$refs.filterWrapper) {
        if (DomTools.getEventTargetNode(evnt, this.$el, 'vxe-filter-wrapper').flag) {
          // 如果点击了筛选按钮
        } else if (DomTools.getEventTargetNode(evnt, this.$refs.filterWrapper.$el).flag) {
          // 如果点击筛选容器
        } else {
          this.closeFilter()
        }
      }
      // 如果已激活了编辑状态
      if (actived.row) {
        if (!(editConfig.autoClear === false)) {
          // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
          if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            if (!EventInterceptor.clearActiveds.some(func => func(actived.args, evnt) === false)) {
              let isClear
              let isReadonlyCol = !DomTools.getEventTargetNode(evnt, this.$el, 'col--edit').flag
              // row 方式
              if (editConfig.mode === 'row') {
                let rowNode = DomTools.getEventTargetNode(evnt, this.$el, 'vxe-body--row')
                let isOtherRow = rowNode.flag ? rowNode.targetElem !== actived.args.cell.parentNode : 0
                if (editConfig.trigger === 'manual') {
                  // manual 触发，如果点击了不同行
                  isClear = isOtherRow
                } else {
                  // click,dblclick 触发，如果点击了不同行的非编辑列
                  isClear = isOtherRow && isReadonlyCol
                }
              } else {
                // cell 方式，如果是非编辑列
                isClear = isReadonlyCol
              }
              if (
                isClear ||
                // 如果点击了当前表格之外
                !DomTools.getEventTargetNode(evnt, this.$el).flag
              ) {
                this.triggerValidate().then(() => {
                  this.clearActived(evnt)
                }).catch(e => e)
              }
            }
          }
        }
      }
      // 如果配置了快捷菜单且，点击了其他地方则关闭
      if (ctxMenuStore.visible && this.$refs.ctxWrapper && !DomTools.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
        this.closeContextMenu()
      }
    },
    /**
     * 窗口失焦事件处理
     */
    handleGlobalBlurEvent (evnt) {
      this.closeFilter()
      this.closeContextMenu()
    },
    /**
     * 全局滚动事件
     */
    handleGlobalMousewheelEvent (evnt) {
      this.clostTooltip()
      this.closeContextMenu()
    },
    /**
     * 全局键盘事件
     */
    handleGlobalKeydownEvent (evnt) {
      let params
      let { isCtxMenu, ctxMenuStore, editStore, mouseConfig = {}, keyboardConfig = {} } = this
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
      let isC = keyCode === 67
      let isV = keyCode === 86
      let isX = keyCode === 88
      let isF2 = keyCode === 113
      let isCtrlKey = evnt.ctrlKey
      let operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
      let operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow)
      if (isEsc) {
        // 如果按下了 Esc 键，关闭快捷菜单、筛选
        this.closeContextMenu()
        this.closeFilter()
        // 如果是激活编辑状态，则取消编辑
        if (actived.row) {
          params = actived.args
          this.clearActived(evnt)
          // 如果配置了选中功能，则为选中状态
          if (mouseConfig.selected) {
            this.handleSelected(params, evnt)
          }
        }
      } else if (isEnter && (selected.row || actived.row)) {
        // 如果是激活状态，退则出到下一行
        this.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, isUpArrow, isRightArrow, true, evnt)
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
          this.handleActived(selected.args, evnt)
        }
      } else if (operArrow && keyboardConfig.isArray) {
        // 如果按下了方向键
        if (selected.row && selected.column) {
          evnt.preventDefault()
          this.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt)
        }
      } else if (isTab && keyboardConfig.isTab) {
        // 如果按下了 Tab 键切换
        if (selected.row || selected.column) {
          evnt.preventDefault()
          this.moveTabSelected(selected.args, evnt)
        } else if (actived.row || actived.column) {
          evnt.preventDefault()
          this.moveTabSelected(actived.args, evnt)
        }
      } else if (isDel || isBack) {
        // 如果是删除键
        if (selected.row || selected.column) {
          UtilTools.setCellValue(selected.row, selected.column.property, null)
          if (isBack) {
            this.handleActived(selected.args, evnt)
          }
        }
      } else if (keyboardConfig.isCut && isCtrlKey && (isX || isC || isV)) {
        // 如果开启复制功能
        if (isX || isC) {
          this.handleCopyed(isX, evnt)
        } else if (isV) {
          this.handlePaste(evnt)
        }
      } else if (keyboardConfig.isEdit && !isCtrlKey && ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222) || keyCode === 32)) {
        // 如果是按下非功能键之外允许直接编辑
        if (selected.row || selected.column) {
          if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
            UtilTools.setCellValue(selected.row, selected.column.property, null)
            this.handleActived(selected.args, evnt)
          }
        }
      }
    },
    // 处理 Tab 键移动
    moveTabSelected (params, evnt) {
      let { $refs, tableData, visibleColumn, handleSelected } = this
      let nextRow
      let nextRowIndex
      let nextColumn
      let nextColumnIndex
      let rowIndex = tableData.indexOf(params.row)
      let columnIndex = visibleColumn.indexOf(params.column)
      for (let index = columnIndex + 1; index < visibleColumn.length; index++) {
        if (visibleColumn[index].editRender) {
          nextColumnIndex = index
          nextColumn = visibleColumn[index]
          break
        }
      }
      if (!nextColumn && rowIndex < tableData.length - 1) {
        // 如果找不到从下一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
        nextRowIndex = rowIndex + 1
        nextRow = tableData[nextRowIndex]
        for (let index = 0; index < visibleColumn.length; index++) {
          if (visibleColumn[index].editRender) {
            nextColumnIndex = index
            nextColumn = visibleColumn[index]
            break
          }
        }
      }
      if (nextColumn) {
        if (nextRow) {
          params.rowIndex = nextRowIndex
          params.row = nextRow
        }
        params.columnIndex = nextColumnIndex
        params.column = nextColumn
        params.cell = DomTools.getCell(params, $refs.tableBody.$el)
        handleSelected(params, evnt)
      }
    },
    // 处理方向键移动
    moveSelected (params, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      let { $refs, tableData, visibleColumn, handleSelected } = this
      if (isUpArrow && params.rowIndex) {
        params.rowIndex -= 1
        params.row = tableData[params.rowIndex]
      } else if (isDwArrow && params.rowIndex < tableData.length - 1) {
        params.rowIndex += 1
        params.row = tableData[params.rowIndex]
      } else if (isLeftArrow && params.columnIndex) {
        for (let len = params.columnIndex - 1; len >= 0; len--) {
          if (visibleColumn[len].editRender) {
            params.columnIndex = len
            params.column = visibleColumn[len]
            break
          }
        }
      } else if (isRightArrow && params.columnIndex) {
        for (let index = params.columnIndex + 1; index < visibleColumn.length; index++) {
          if (visibleColumn[index].editRender) {
            params.columnIndex = index
            params.column = visibleColumn[index]
            break
          }
        }
      }
      params.cell = DomTools.getCell(params, $refs.tableBody.$el)
      handleSelected(params, evnt)
    },
    // 处理菜单的移动
    moveCtxMenu (evnt, keyCode, ctxMenuStore, key, operKey, operRest, menuList) {
      let selectIndex = XEUtils.findIndexOf(menuList, item => ctxMenuStore[key] === item)
      if (keyCode === operKey) {
        if (operRest && UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          ctxMenuStore.showChild = true
        } else {
          ctxMenuStore.showChild = false
          ctxMenuStore.selectChild = null
        }
      } else if (keyCode === 38) {
        ctxMenuStore[key] = menuList[selectIndex - 1] || menuList[menuList.length - 1]
      } else if (keyCode === 40) {
        ctxMenuStore[key] = menuList[selectIndex + 1] || menuList[0]
      } else if (ctxMenuStore[key] && (keyCode === 13 || keyCode === 32)) {
        this.ctxMenuLinkEvent(evnt, ctxMenuStore[key])
      }
    },
    handleGlobalResizeEvent () {
      this.recalculate()
    },
    /**
     * 快捷菜单事件处理
     */
    handleGlobalContextmenuEvent (evnt) {
      let { isCtxMenu } = this
      if (isCtxMenu) {
        // 右键头部
        let headeWrapperNode = DomTools.getEventTargetNode(evnt, this.$el, 'vxe-table--header-wrapper')
        if (headeWrapperNode.flag) {
          this.openContextMenu(evnt, 'header', { })
          return
        }
        // 右键内容
        let bodyWrapperNode = DomTools.getEventTargetNode(evnt, this.$el, 'vxe-table--body-wrapper')
        if (bodyWrapperNode.flag) {
          this.openContextMenu(evnt, 'body', { })
          return
        }
        // 右键表尾
        let footerWrapperNode = DomTools.getEventTargetNode(evnt, this.$el, 'vxe-table--footer-wrapper')
        if (footerWrapperNode.flag) {
          this.openContextMenu(evnt, 'footer', { })
          return
        }
      }
      this.closeContextMenu()
      this.closeFilter()
    },
    /**
     * 显示快捷菜单
     */
    openContextMenu (evnt, type, params) {
      let { tableData, visibleColumn, ctxMenuStore, ctxMenuConfig } = this
      let config = ctxMenuConfig[type]
      if (config) {
        let { options, visibleMethod, disabled } = config
        if (disabled) {
          evnt.preventDefault()
        } else if (options && options.length) {
          if (!visibleMethod || visibleMethod(params, evnt)) {
            evnt.preventDefault()
            let { scrollTop, scrollLeft, visibleHeight, visibleWidth } = DomTools.getDomNode()
            let { targetElem } = DomTools.getEventTargetNode(evnt, this.$el, `vxe-${type}--column`)
            let { rowIndex, columnIndex } = DomTools.getCellIndexs(targetElem)
            let row = tableData[rowIndex]
            let column = visibleColumn[columnIndex]
            let top = evnt.clientY + scrollTop
            let left = evnt.clientX + scrollLeft
            Object.assign(ctxMenuStore, {
              args: { type, row, rowIndex, column, columnIndex, cell: targetElem, $table: this },
              visible: true,
              list: options,
              selected: null,
              selectChild: null,
              showChild: false,
              style: {
                top: `${top}px`,
                left: `${left}px`
              }
            })
            this.$nextTick(() => {
              let ctxElem = this.$refs.ctxWrapper.$el
              let clientHeight = ctxElem.clientHeight
              let clientWidth = ctxElem.clientWidth
              let offsetTop = evnt.clientY + clientHeight - visibleHeight
              let offsetLeft = evnt.clientX + clientWidth - visibleWidth
              if (offsetTop > -10) {
                ctxMenuStore.style.top = `${top - clientHeight}px`
              }
              if (offsetLeft > -10) {
                ctxMenuStore.style.left = `${left - clientWidth}px`
              }
            })
          } else {
            this.closeContextMenu()
          }
        }
      }
      this.closeFilter()
    },
    /**
     * 关闭快捷菜单
     */
    closeContextMenu () {
      Object.assign(this.ctxMenuStore, {
        list: [],
        visible: false,
        selected: null,
        selectChild: null,
        showChild: false
      })
      return this.$nextTick()
    },
    ctxMenuMouseoverEvent (evnt, item, child) {
      let ctxMenuStore = this.ctxMenuStore
      evnt.preventDefault()
      evnt.stopPropagation()
      ctxMenuStore.selected = item
      ctxMenuStore.selectChild = child
      if (!child) {
        ctxMenuStore.showChild = UtilTools.hasChildrenList(item)
      }
    },
    ctxMenuMouseoutEvent (evnt, item, child) {
      let ctxMenuStore = this.ctxMenuStore
      if (!item.children) {
        ctxMenuStore.selected = null
      }
      ctxMenuStore.selectChild = null
    },
    /**
     * 快捷菜单点击事件
     */
    ctxMenuLinkEvent (evnt, menu) {
      UtilTools.emitEvent(this, 'context-menu-link', [Object.assign({ menu }, this.ctxMenuStore.args), evnt])
      this.closeContextMenu()
    },
    /**
     * 触发表头 tooltip 事件
     */
    triggerHeaderTooltipEvent (evnt, { column }) {
      let { tooltipStore } = this
      if (tooltipStore.column !== column || !tooltipStore.visible) {
        this.showTooltip(evnt, column.label, column)
      }
    },
    /**
     * 触发 tooltip 事件
     */
    triggerTooltipEvent (evnt, { row, column }) {
      let { editConfig, editStore, tooltipStore } = this
      let { actived } = editStore
      if (editConfig) {
        if ((editConfig.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {
          return
        }
      }
      if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
        this.showTooltip(evnt, UtilTools.getCellValue(row, column.property), column, row)
      }
    },
    // 显示 tooltip
    showTooltip (evnt, content, column, row) {
      let cell = evnt.currentTarget
      let wrapperElem = cell.children[0]
      if (content && wrapperElem.scrollWidth > wrapperElem.clientWidth) {
        let { tooltipStore, $refs } = this
        let { top, left } = DomTools.getOffsetPos(cell)
        let { scrollTop, scrollLeft, visibleWidth } = DomTools.getDomNode()
        let tipLeft = left
        Object.assign(tooltipStore, {
          row,
          column,
          content,
          visible: true,
          placement: 'top',
          arrowStyle: { left: '50%' }
        })
        return this.$nextTick().then(() => {
          let tipWrapperElem = $refs.tipWrapper
          if (tipWrapperElem) {
            tipLeft = left + Math.floor((cell.offsetWidth - tipWrapperElem.offsetWidth) / 2)
            tooltipStore.style = {
              width: `${tipWrapperElem.offsetWidth + 2}px`,
              top: `${top - tipWrapperElem.offsetHeight - 6}px`,
              left: `${tipLeft}px`
            }
            return this.$nextTick()
          }
        }).then(() => {
          let tipWrapperElem = $refs.tipWrapper
          if (tipWrapperElem) {
            let offsetHeight = tipWrapperElem.offsetHeight
            let offsetWidth = tipWrapperElem.offsetWidth
            if (top - offsetHeight < scrollTop) {
              tooltipStore.placement = 'bottom'
              tooltipStore.style.top = `${top + cell.offsetHeight + 6}px`
            }
            if (tipLeft < scrollLeft + 6) {
              // 超出左边界
              tipLeft = scrollLeft + 6
              tooltipStore.arrowStyle.left = `${left > tipLeft + 16 ? left - tipLeft + 16 : 16}px`
              tooltipStore.style.left = `${tipLeft}px`
            } else if (left + offsetWidth > scrollLeft + visibleWidth) {
              // 超出右边界
              tipLeft = scrollLeft + visibleWidth - offsetWidth - 6
              tooltipStore.arrowStyle.left = `${offsetWidth - Math.max(Math.floor((tipLeft + offsetWidth - left) / 2), 22)}px`
              tooltipStore.style.left = `${tipLeft}px`
            }
          }
        })
      }
      return this.$nextTick()
    },
    // 关闭 tooltip
    clostTooltip () {
      Object.assign(this.tooltipStore, {
        row: null,
        column: null,
        content: null,
        style: null,
        visible: false,
        placement: null
      })
      return this.$nextTick()
    },
    /**
     * 处理默认勾选
     */
    handleDefaultRowChecked () {
      let { rowKey, selectConfig = {}, tableFullData } = this
      let { key, checkAll, checkRowKeys } = selectConfig
      if (checkAll) {
        this.setAllSelection(true)
      } else if (checkRowKeys) {
        let property = rowKey || key
        if (!property) {
          throw new Error('[vxe-table] Checked rows must have a unique primary key.')
        }
        this.setSelection(checkRowKeys.map(rowKey => tableFullData.find(item => rowKey === item[property])), true)
      }
    },
    setSelection (rows, value) {
      if (rows && !XEUtils.isArray(rows)) {
        rows = [rows]
      }
      rows.forEach(row => this.triggerCheckRowEvent({}, { row }, !!value))
      return this.$nextTick()
    },
    /**
     * 多选，行选中事件
     * value 选中true 不选false 不确定-1
     */
    triggerCheckRowEvent (evnt, { row }, value) {
      let { selection, tableFullData, selectConfig = {}, treeConfig, treeIndeterminates } = this
      let { checkProp: property, checkMethod } = selectConfig
      if (!checkMethod || checkMethod({ row, rowIndex: tableFullData.indexOf(row) })) {
        if (property) {
          if (treeConfig) {
            if (value === -1) {
              treeIndeterminates.push(row)
              UtilTools.setCellValue(row, property, false)
            } else {
              // 更新子节点状态
              XEUtils.eachTree([row], item => UtilTools.setCellValue(item, property, value), treeConfig)
              XEUtils.remove(treeIndeterminates, item => item === row)
            }
            // 如果存在父节点，更新父节点状态
            let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeConfig)
            if (matchObj.parent) {
              let selectItems = matchObj.items.filter(item => UtilTools.getCellValue(item, property))
              return this.triggerCheckRowEvent(evnt, { row: matchObj.parent }, selectItems.length === matchObj.items.length ? true : (selectItems.length || value === -1 ? -1 : false))
            }
          } else {
            UtilTools.setCellValue(row, property, value)
          }
        } else {
          if (treeConfig) {
            if (value === -1) {
              treeIndeterminates.push(row)
              XEUtils.remove(selection, item => item === row)
            } else {
              // 更新子节点状态
              XEUtils.eachTree([row], item => {
                if (value) {
                  if (selection.indexOf(item) === -1) {
                    selection.push(item)
                  }
                } else {
                  XEUtils.remove(selection, select => select === item)
                }
              }, treeConfig)
              XEUtils.remove(treeIndeterminates, item => item === row)
            }
            // 如果存在父节点，更新父节点状态
            let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeConfig)
            if (matchObj.parent) {
              let selectItems = matchObj.items.filter(item => selection.indexOf(item) > -1)
              return this.triggerCheckRowEvent(evnt, { row: matchObj.parent }, selectItems.length === matchObj.items.length ? true : (selectItems.length || value === -1 ? -1 : false))
            }
          } else {
            if (value) {
              if (selection.indexOf(row) === -1) {
                selection.push(row)
              }
            } else {
              XEUtils.remove(selection, item => item === row)
            }
          }
        }
        this.checkSelectionStatus()
        UtilTools.emitEvent(this, 'select-change', [{ row, selection: this.getSelectionRecords(), checked: value }, evnt])
      }
    },
    checkSelectionStatus () {
      let { tableFullData, selectConfig = {}, selection, treeIndeterminates } = this
      let { checkProp: property, checkMethod } = selectConfig
      if (property) {
        this.isAllSelected = tableFullData.length && tableFullData.every(
          checkMethod
            ? (row, rowIndex) => !checkMethod({ row, rowIndex }) || UtilTools.getCellValue(row, property)
            : row => UtilTools.getCellValue(row, property)
        )
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(row => UtilTools.getCellValue(row, property) || treeIndeterminates.indexOf(row) > -1)
      } else {
        this.isAllSelected = tableFullData.length && tableFullData.every(
          checkMethod
            ? (row, rowIndex) => !checkMethod({ row, rowIndex }) || selection.indexOf(row) > -1
            : row => selection.indexOf(row) > -1
        )
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(row => treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1)
      }
    },
    /**
     * 多选，切换某一行的选中状态
     */
    toggleRowSelection (row) {
      let { selectConfig = {}, selection } = this
      let { checkProp: property } = selectConfig
      this.triggerCheckRowEvent(null, { row }, property ? !UtilTools.getCellValue(row, property) : selection.indexOf(row) === -1)
      return this.$nextTick()
    },
    setAllSelection (value) {
      let { tableFullData, selectConfig = {}, treeConfig } = this
      let { checkProp: property, checkMethod } = selectConfig
      let selection = []
      if (property) {
        let updateValue = (row, rowIndex) => {
          if (!checkMethod || checkMethod({ row, rowIndex })) {
            UtilTools.setCellValue(row, property, value)
          }
        }
        if (treeConfig) {
          XEUtils.eachTree(tableFullData, updateValue, treeConfig)
        } else {
          tableFullData.forEach(updateValue)
        }
      } else {
        if (value) {
          if (treeConfig) {
            XEUtils.eachTree(tableFullData, (row, rowIndex) => {
              if (!checkMethod || checkMethod({ row, rowIndex })) {
                selection.push(row)
              }
            }, treeConfig)
          } else {
            if (checkMethod) {
              selection = tableFullData.filter((row, rowIndex) => checkMethod({ row, rowIndex }))
            } else {
              selection = tableFullData.slice(0)
            }
          }
        }
      }
      this.selection = selection
      this.isAllSelected = value
      this.isIndeterminate = false
      this.treeIndeterminates = []
    },
    /**
     * 多选，选中所有事件
     */
    triggerCheckAllEvent (evnt, value) {
      this.setAllSelection(value)
      UtilTools.emitEvent(this, 'select-all', [{ selection: this.getSelectionRecords(), checked: value }, evnt])
    },
    /**
     * 多选，切换所有行的选中状态
     */
    toggleAllSelection () {
      this.triggerCheckAllEvent(null, !this.isAllSelected)
      return this.$nextTick()
    },
    clearSelection () {
      let { tableFullData, selectConfig = {}, treeConfig } = this
      let { checkProp: property } = selectConfig
      if (property) {
        if (treeConfig) {
          XEUtils.eachTree(tableFullData, item => UtilTools.setCellValue(item, property, false), treeConfig)
        } else {
          tableFullData.forEach(item => UtilTools.setCellValue(item, property, false))
        }
      }
      this.isAllSelected = false
      this.isIndeterminate = false
      this.selection = []
      this.treeIndeterminates = []
      return this.$nextTick()
    },
    /**
     * 单选，行选中事件
     */
    triggerRowEvent (evnt, { row }) {
      this.selectRow = row
      UtilTools.emitEvent(this, 'select-change', [{ row }, evnt])
      return this.$nextTick()
    },
    /**
     * 单选，设置某一行为选中状态，如果调不加参数，则会取消目前高亮行的选中状态
     */
    setCurrentRow (row) {
      this.selectRow = row
      return this.$nextTick()
    },
    clearCurrentRow () {
      this.selectRow = null
      this.hoverRow = null
      return this.$nextTick()
    },
    /**
     * 行 hover 事件
     */
    triggerHoverEvent (evnt, { row }) {
      this.hoverRow = row
    },
    /**
     * 选中事件
     */
    triggerCellMousedownEvent (evnt, params) {
      let { $el, tableData, visibleColumn, editStore, editConfig, handleSelected, handleChecked } = this
      let { checked, actived } = editStore
      let { row, column, cell } = params
      let { button } = evnt
      let isLeftBtn = button === 0
      let isRightBtn = button === 2
      if (isLeftBtn || isRightBtn) {
        if (editConfig && editConfig.trigger === 'dblclick') {
          if ((editConfig.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {
            // 如果已经是激活状态
          } else {
            if (isLeftBtn) {
              evnt.preventDefault()
              evnt.stopPropagation()
              this.handleSelected(params, evnt)
              let domMousemove = document.onmousemove
              let domMouseup = document.onmouseup
              let start = DomTools.getCellIndexs(cell)
              let updateEvent = XEUtils.throttle(function (evnt) {
                evnt.preventDefault()
                let { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
                if (flag) {
                  handleChecked(start, DomTools.getCellIndexs(targetElem), evnt)
                }
              }, DomTools.browse.msie ? 80 : 40, { leading: true, trailing: true })
              document.onmousemove = updateEvent
              document.onmouseup = function (evnt) {
                document.onmousemove = domMousemove
                document.onmouseup = domMouseup
              }
              this.closeFilter()
              this.closeContextMenu()
            } else if (isRightBtn) {
              // 如果不在所有选中的范围之内则重新选中
              let select = DomTools.getCellIndexs(cell)
              if (checked.rows.indexOf(tableData[select.rowIndex]) === -1 || checked.columns.indexOf(visibleColumn[select.columnIndex]) === -1) {
                handleSelected(params, evnt)
              }
            }
          }
        }
      }
    },
    /**
     * 边角事件
     */
    triggerCornerMousedownEvent (params, evnt) {
      evnt.preventDefault()
      evnt.stopPropagation()
      let { $el, tableData, visibleColumn, editStore, editConfig, handleTempChecked } = this
      let { checked } = editStore
      let { button } = evnt
      let isLeftBtn = button === 0
      let isRightBtn = button === 2
      if (isLeftBtn || isRightBtn) {
        if (editConfig && checked.rows.length && editConfig.trigger === 'dblclick') {
          let domMousemove = document.onmousemove
          let domMouseup = document.onmouseup
          let start = {
            rowIndex: tableData.indexOf(checked.rows[0]),
            columnIndex: visibleColumn.indexOf(checked.columns[0])
          }
          let updateEvent = XEUtils.throttle(function (evnt) {
            evnt.preventDefault()
            let { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
            if (flag) {
              handleTempChecked(start, DomTools.getCellIndexs(targetElem), evnt)
            }
          }, DomTools.browse.msie ? 80 : 40, { leading: true, trailing: true })
          document.onmousemove = updateEvent
          document.onmouseup = function (evnt) {
            document.onmousemove = domMousemove
            document.onmouseup = domMouseup
            checked.rows = checked.tRows
            checked.columns = checked.tColumns
          }
        }
      }
    },
    /**
     * 列点击事件
     * 如果是单击模式，则激活为编辑状态
     * 如果是双击模式，则单击后选中状态
     */
    triggerCellClickEvent (evnt, params) {
      let { $el, highlightCurrentRow, editRules, editStore, treeConfig, editConfig } = this
      let { actived } = editStore
      if (highlightCurrentRow) {
        if (!DomTools.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag) {
          this.selectRow = params.row
        }
      }
      if (treeConfig && (treeConfig.trigger === 'row' || (params.column.treeNode && treeConfig.trigger === 'cell'))) {
        this.triggerTreeExpandEvent(evnt, params)
      }
      if (editConfig) {
        if (editConfig.trigger === 'click') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            if (editRules) {
              this.handleActived(params, evnt)
            } else {
              this.triggerValidate().then(() => {
                this.handleActived(params, evnt)
              }).catch(e => e)
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
      if (editConfig) {
        if (editConfig.trigger === 'dblclick') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            this.triggerValidate().then(() => {
              this.handleActived(params, evnt)
            }).catch(e => e)
          }
        }
      }
      UtilTools.emitEvent(this, 'cell-dblclick', [params, evnt])
    },
    /**
     * 处理激活编辑
     */
    handleActived (params, evnt) {
      let { editStore, editConfig } = this
      let { activeMethod } = editConfig
      let { actived } = editStore
      let { row, column, cell } = params
      if (editConfig.mode === 'row' ? actived.row !== row : (actived.row !== row || actived.column !== column)) {
        // 判断是否禁用编辑
        if (!activeMethod || activeMethod(params)) {
          this.clearCopyed(evnt)
          this.clearChecked(evnt)
          this.clearSelected(evnt)
          this.clearActived(evnt)
          column.renderHeight = cell.offsetHeight
          actived.args = params
          actived.row = row
          actived.column = column
          this.$nextTick(() => {
            this.handleFocus(params, evnt)
          })
          UtilTools.emitEvent(this, 'edit-actived', [params, evnt])
        } else {
          UtilTools.emitEvent(this, 'edit-disabled', [params, evnt])
        }
      } else {
        setTimeout(() => {
          this.handleFocus(params, evnt)
        })
      }
      return this.$nextTick()
    },
    /**
     * 清除激活的编辑
     */
    clearActived (evnt) {
      let { editStore } = this
      let { actived } = editStore
      if (actived.row || actived.column) {
        UtilTools.emitEvent(this, 'clear-actived', [actived.args, evnt])
      }
      actived.args = null
      actived.row = null
      actived.column = null
      return this.$nextTick()
    },
    hasActiveRow (row) {
      let { editStore } = this
      let { actived } = editStore
      return actived.row === row
    },
    /**
     * 清除所选中源状态
     */
    clearSelected (evnt) {
      let { editStore } = this
      let { selected } = editStore
      selected.row = null
      selected.column = null
      return this.$nextTick()
    },
    /**
     * 处理选中源
     */
    handleSelected (params, evnt) {
      let { mouseConfig = {}, editRules, editStore } = this
      let { selected } = editStore
      let { row, column } = params
      let selectMethod = () => {
        if (selected.row !== row || selected.column !== column) {
          this.clearChecked(evnt)
          this.clearActived(evnt)
          selected.args = params
          selected.row = row
          selected.column = column
        }
        // 如果配置了批量选中功能，则为批量选中状态
        if (mouseConfig.checked) {
          let select = DomTools.getCellIndexs(params.cell)
          this.handleChecked(select, select, evnt)
        }
        return this.$nextTick()
      }
      return editRules ? Promise.resolve() : this.triggerValidate().then(selectMethod).catch(e => e)
    },
    /**
     * 清除所有选中状态
     */
    clearChecked (evnt) {
      let { editStore } = this
      let { checked } = editStore
      checked.rows = []
      checked.columns = []
      checked.tRows = []
      checked.tColumns = []
      return this.$nextTick()
    },
    /**
     * 处理所有选中
     */
    handleChecked (start, end, evnt) {
      let { tableData, visibleColumn, editStore } = this
      let { checked } = editStore
      let { rowIndex: sRowIndex, columnIndex: sColumnIndex } = start
      let { rowIndex: eRowIndex, columnIndex: eColumnIndex } = end
      checked.tRows = []
      checked.tColumns = []
      if (sRowIndex < eRowIndex) {
        // 向下
        checked.rows = tableData.slice(sRowIndex, eRowIndex + 1)
      } else {
        // 向上
        checked.rows = tableData.slice(eRowIndex, sRowIndex + 1)
      }
      if (sColumnIndex < eColumnIndex) {
        // 向右
        checked.columns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1)
      } else {
        // 向左
        checked.columns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex + 1)
      }
    },
    /**
     * 处理所有选中的临时选中
     */
    handleTempChecked (start, end, evnt) {
      let { tableData, visibleColumn, editStore } = this
      let { checked } = editStore
      let { rows, tRows, columns, tColumns } = checked
      let { rowIndex: sRowIndex, columnIndex: sColumnIndex } = start
      let { rowIndex: eRowIndex, columnIndex: eColumnIndex } = end
      if (tRows.length > rows.length) {
        eColumnIndex = visibleColumn.indexOf(columns[columns.length - 1])
      } else if (tColumns.length > columns.length) {
        eRowIndex = tableData.indexOf(rows[rows.length - 1])
      }
      if (sRowIndex < eRowIndex) {
        // 向下
        checked.tRows = tableData.slice(sRowIndex, eRowIndex + 1)
      } else {
        // 向上
        sRowIndex += rows.length
        checked.tRows = tableData.slice(eRowIndex, sRowIndex)
      }
      if (sColumnIndex < eColumnIndex) {
        // 向右
        checked.tColumns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1)
      } else {
        // 向左
        sColumnIndex += columns.length
        checked.tColumns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex)
      }
    },
    /**
     * 清空已复制的内容
     */
    clearCopyed () {
      let { editStore } = this
      let { copyed } = editStore
      copyed.cut = false
      copyed.rows = []
      copyed.columns = []
      return this.$nextTick()
    },
    /**
     * 处理复制
     */
    handleCopyed (cut, evnt) {
      let { editStore } = this
      let { copyed, checked } = editStore
      copyed.cut = cut
      copyed.rows = checked.rows
      copyed.columns = checked.columns
    },
    /**
     * 处理粘贴
     */
    handlePaste (evnt) {
      let { tableData, visibleColumn, editStore } = this
      let { copyed, selected } = editStore
      let { cut, rows, columns } = copyed
      if (rows.length && columns.length && selected.row && selected.column) {
        let { rowIndex, columnIndex } = selected.args
        let start = { rowIndex, columnIndex }
        let end = {
          rowIndex: rowIndex + rows.length - 1,
          columnIndex: columnIndex + columns.length - 1
        }
        rows.forEach((row, rIndex) => {
          let offsetRow = tableData[rowIndex + rIndex]
          if (offsetRow) {
            columns.forEach((column, cIndex) => {
              let offsetColumn = visibleColumn[columnIndex + cIndex]
              if (offsetColumn) {
                UtilTools.setCellValue(offsetRow, offsetColumn.property, UtilTools.getCellValue(row, column.property))
              }
              if (cut) {
                UtilTools.setCellValue(row, column.property, null)
              }
            })
          }
        })
        if (cut) {
          this.clearCopyed()
        }
        this.handleChecked(start, end, evnt)
      }
    },
    /**
     * 处理聚焦
     */
    handleFocus (params, evnt) {
      let { column, cell } = params
      let { editRender } = column
      let { renderMap = {} } = GlobalConfig
      let compRender = renderMap[editRender.name]
      let inputElem
      // 如果指定了聚焦 class
      if (editRender.autofocus) {
        inputElem = cell.querySelector(editRender.autofocus)
      }
      if (!inputElem) {
        // 渲染器的聚焦处理
        if (compRender) {
          if (compRender.autofocus) {
            inputElem = cell.querySelector(compRender.autofocus)
          }
        }
      }
      if (inputElem) {
        inputElem.focus()
      }
    },
    /**
     * 只对 mode=cell 有效，激活行编辑
     */
    setActiveRow (row) {
      let { $refs, id, tableData, visibleColumn, handleActived, editConfig } = this
      if (row && editConfig.mode === 'row') {
        let rowIndex = tableData.indexOf(row)
        if (rowIndex > -1) {
          let column = visibleColumn.find(column => column.editRender)
          let cell = $refs.tableBody.$el.querySelector(`.vxe-body--row.row--${id}_${rowIndex} .${column.id}`)
          handleActived({ row, column, cell })
          this.lastCallTime = Date.now()
        }
      }
      return this.$nextTick()
    },
    /**
     * 只对 mode=row 有效，激活单元格编辑
     */
    setActiveCell (row, prop) {
      let { $refs, id, tableData, visibleColumn, handleActived, editConfig } = this
      if (row && prop && editConfig.mode === 'cell') {
        let rowIndex = tableData.indexOf(row)
        if (rowIndex > -1 && prop) {
          let column = visibleColumn.find(column => column.property === prop)
          let cell = $refs.tableBody.$el.querySelector(`.vxe-body--row.row--${id}_${rowIndex} .${column.id}`)
          handleActived({ row, column, cell })
          this.lastCallTime = Date.now()
        }
      }
      return this.$nextTick()
    },
    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    setSelectCell (row, prop) {
      let { $refs, id, tableData, editConfig, visibleColumn } = this
      if (row && prop && editConfig.trigger !== 'manual') {
        let column = visibleColumn.find(column => column.property === prop)
        let rowIndex = tableData.indexOf(row)
        if (rowIndex > -1 && column) {
          let cell = $refs.tableBody.$el.querySelector(`.vxe-body--row.row--${id}_${rowIndex} .${column.id}`)
          let params = { row, rowIndex, column, columnIndex: visibleColumn.indexOf(column), cell }
          this.handleSelected(params, {})
        }
      }
      return this.$nextTick()
    },
    /**
     * 点击排序事件
     */
    triggerSortEvent (evnt, column, params, order) {
      this.sort(column.property, order)
    },
    sort (prop, order) {
      let { visibleColumn, tableFullColumn } = this
      let column = visibleColumn.find(item => item.property === prop)
      if (order && column.order !== order) {
        tableFullColumn.forEach(column => {
          column.order = null
        })
        column.order = order
        // 如果是服务端排序，则跳过本地排序处理
        if (column.sortable !== 'custom') {
          this.tableData = this.getTableData(true).tableData
        }
        UtilTools.emitEvent(this, 'sort-change', [{ column, prop, order }])
      }
      return this.$nextTick()
    },
    /**
     * 点击筛选事件
     */
    triggerFilterEvent (evnt, column, params) {
      let { $refs, filterStore, overflowX } = this
      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false
      } else {
        let targetElem = evnt.target
        let bodyElem = $refs.tableBody.$el
        let filterWrapperElem = $refs.filterWrapper
        let { top, left } = DomTools.getOffsetPos(targetElem)
        if (overflowX) {
          left -= bodyElem.scrollLeft
        }
        Object.assign(filterStore, {
          multiple: column.filterMultiple,
          options: column.filters,
          column: column,
          style: {
            top: `${top + targetElem.clientHeight + 6}px`,
            left: `${left}px`
          },
          visible: true
        })
        filterStore.isAllSelected = filterStore.options.every(item => item.checked)
        filterStore.isIndeterminate = !this.isAllSelected && filterStore.options.some(item => item.checked)
        this.$nextTick(() => {
          filterStore.style = {
            top: `${top + targetElem.clientHeight + 6}px`,
            left: `${left - filterWrapperElem.$el.clientWidth / 2 + 10}px`
          }
        })
      }
    },
    // 确认筛选
    confirmFilterEvent (evnt) {
      let { filterStore, scrollXLoad, scrollYLoad } = this
      let { column } = filterStore
      let valueList = []
      column.filters.forEach(item => {
        if (item.checked) {
          valueList.push(item.value)
        }
      })
      filterStore.visible = false
      if (scrollXLoad || scrollYLoad) {
        this.clearScroll()
        this.computeScrollLoad()
      } else {
        // 如果是服务端筛选，则跳过本地筛选处理
        if (column.filterMethod !== 'custom') {
          this.tableData = this.getTableData(true).tableData
        }
        UtilTools.emitEvent(this, 'filter-change', [{ column, prop: column.property, values: valueList }])
      }
      this.closeFilter()
    },
    // 关闭筛选
    closeFilter (evnt) {
      Object.assign(this.filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        options: [],
        visible: false
      })
      return this.$nextTick()
    },
    // 重置筛选
    resetFilterEvent (evnt) {
      this.filterStore.options.forEach(item => {
        item.checked = false
      })
      this.confirmFilterEvent(evnt)
    },
    /**
     * 展开行事件
     */
    triggerRowExpandEvent (evnt, { row }) {
      return this.toggleRowExpansion(row)
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
      let { rowKey, expandConfig = {}, tableFullData } = this
      let { key, expandAll, expandRowKeys } = expandConfig
      if (expandAll) {
        this.expandeds = tableFullData.slice(0)
      } else if (expandRowKeys) {
        let property = rowKey || key
        if (!property) {
          throw new Error('[vxe-table] Expand rows must have a unique primary key.')
        }
        this.expandeds = expandRowKeys.map(rowKey => tableFullData.find(item => rowKey === item[property]))
      }
    },
    /**
     * 设置展开行，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     */
    setRowExpansion (rows, expanded) {
      let { expandeds, expandConfig = {} } = this
      let isToggle = arguments.length === 1
      if (rows) {
        if (!XEUtils.isArray(rows)) {
          rows = [rows]
        }
        if (expandConfig.accordion) {
          rows.slice(rows.length - 1, rows.length)
        }
        rows.forEach(row => {
          let index = expandeds.indexOf(row)
          if (expandConfig.accordion) {
            // 只能同时展开一个
            expandeds.length = 0
          }
          if (index > -1) {
            if (isToggle || !expanded) {
              expandeds.splice(index, 1)
            }
          } else {
            if (isToggle || expanded) {
              expandeds.push(row)
            }
          }
        })
      }
      return this.$nextTick()
    },
    clearRowExpand () {
      this.expandeds = []
      return this.$nextTick()
    },
    /**
     * 展开行事件
     */
    triggerTreeExpandEvent (evnt, { row }) {
      return this.toggleTreeExpansion(row)
    },
    /**
     * 切换展开行
     */
    toggleTreeExpansion (row) {
      return this.setTreeExpansion(row)
    },
    /**
     * 处理默认展开树节点
     */
    handleDefaultTreeExpand () {
      let { rowKey, treeConfig, tableFullData } = this
      if (treeConfig) {
        let { key, expandAll, expandRowKeys } = treeConfig
        let { children } = treeConfig
        let property = rowKey || key
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
          expandRowKeys.forEach(rowKey => {
            let matchObj = XEUtils.findTree(tableFullData, item => rowKey === item[property], treeConfig)
            let rowChildren = matchObj ? matchObj.item[children] : 0
            if (rowChildren) {
              treeExpandeds.push(matchObj.item)
            }
          })
          this.treeExpandeds = treeExpandeds
        }
      }
    },
    /**
     * 设置展开树形节点，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
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
          rows.slice(rows.length - 1, rows.length)
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
      return this.$nextTick()
    },
    clearTreeExpand () {
      this.treeExpandeds = []
      return this.$nextTick()
    },
    /**
     * 是否启用了横向 X 滚动渲染
     */
    isScrollXLoad () {
      return this.scrollXLoad
    },
    /**
     * 是否启用了纵向 Y 滚动渲染
     */
    isScrollYLoad () {
      return this.scrollYLoad
    },
    /**
     * 横向 Y 滚动渲染事件处理
     */
    triggerScrollXEvent (evnt) {
      let { $refs, visibleColumn, scrollXStore } = this
      let { startIndex, renderSize, offsetSize, visibleSize } = scrollXStore
      let scrollBodyElem = $refs.tableBody.$el
      let scrollLeft = scrollBodyElem.scrollLeft
      let toVisibleIndex = 0
      let width = 0
      for (let index = 0; index < visibleColumn.length; index++) {
        width += visibleColumn[index].renderWidth
        if (scrollLeft < width) {
          toVisibleIndex = index
          break
        }
      }
      if (scrollXStore.visibleIndex !== toVisibleIndex) {
        let isReload
        let preloadSize = 0
        let isLeft = scrollXStore.visibleIndex > toVisibleIndex
        // 如果渲染数量不充足
        let isTooLow = renderSize < visibleSize * 3
        // 除去可视条数剩余数量
        let residueSize = renderSize - visibleSize
        if (isLeft) {
          preloadSize = residueSize - (isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5))
          isReload = toVisibleIndex - offsetSize <= startIndex
        } else {
          preloadSize = isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5)
          isReload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize
        }
        if (isReload) {
          scrollXStore.visibleIndex = toVisibleIndex
          scrollXStore.startIndex = Math.min(Math.max(toVisibleIndex - preloadSize, 0), visibleColumn.length - renderSize)
          this.updateScrollXSpace()
          this.$nextTick(() => {
            scrollBodyElem.scrollLeft = scrollLeft
          })
        }
      }
      this.clostTooltip()
    },
    /**
     * 纵向 Y 滚动渲染事件处理
     */
    triggerScrollYEvent: XEUtils.debounce(function (evnt) {
      let { tableFullData, scrollYStore } = this
      let { startIndex, renderSize, offsetSize, visibleSize, rowHeight } = scrollYStore
      let scrollBodyElem = evnt.target
      let scrollTop = scrollBodyElem.scrollTop
      let toVisibleIndex = Math.ceil(scrollTop / rowHeight)
      if (scrollYStore.visibleIndex !== toVisibleIndex) {
        let isReload
        let preloadSize = 0
        let isTop = scrollYStore.visibleIndex > toVisibleIndex
        // 如果渲染数量不充足
        let isTooLow = renderSize < visibleSize * 3
        // 除去可视条数剩余数量
        let residueSize = renderSize - visibleSize
        if (isTop) {
          preloadSize = residueSize - (isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5))
          isReload = toVisibleIndex - offsetSize <= startIndex
        } else {
          preloadSize = isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5)
          isReload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize
        }
        if (isReload) {
          scrollYStore.visibleIndex = toVisibleIndex
          scrollYStore.startIndex = Math.min(Math.max(toVisibleIndex - preloadSize, 0), tableFullData.length - renderSize)
          this.updateScrollYSpace()
          this.$nextTick(() => {
            scrollBodyElem.scrollTop = scrollTop
          })
        }
      }
    }, DomTools.browse.msie ? 40 : 20, { leading: false, trailing: true }),
    // 计算滚动渲染相关数据
    computeScrollLoad () {
      let { scrollXLoad, scrollYLoad, scrollYStore, scrollXStore, visibleColumn, optimizeConfig } = this
      let { scrollX, scrollY } = optimizeConfig
      let tableBody = this.$refs.tableBody
      let tableBodyElem = tableBody ? tableBody.$el : null
      let tableHeader = this.$refs.tableHeader
      if (tableBodyElem) {
        // 计算 X 逻辑
        if (scrollXLoad) {
        // 无法预知，默认取前 10 条平均宽度进行运算
          scrollXStore.visibleSize = scrollX.vSize || Math.ceil(tableBodyElem.clientWidth / (visibleColumn.slice(0, 10).reduce((previous, column) => previous + column.renderWidth, 0) / 10))
          this.updateScrollXSpace()
        }
        // 计算 Y 逻辑
        if (scrollYLoad) {
          if (scrollY.rHeight) {
            scrollYStore.rowHeight = scrollY.rHeight
          } else {
            let firstTrElem = tableBodyElem.querySelector('tbody>tr')
            if (!firstTrElem && tableHeader) {
              firstTrElem = tableHeader.$el.querySelector('thead>tr')
            }
            if (firstTrElem) {
              scrollYStore.rowHeight = firstTrElem.clientHeight
            }
          }
          scrollYStore.visibleSize = scrollY.vSize || Math.ceil(tableBodyElem.clientHeight / scrollYStore.rowHeight)
          this.updateScrollYSpace()
        }
      }
    },
    // 更新 X 滚动上下剩余空间大小
    updateScrollXSpace () {
      let { visibleColumn, scrollXStore } = this
      this.tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize)
      scrollXStore.leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous, column) => previous + column.renderWidth, 0)
      scrollXStore.rightSpaceWidth = visibleColumn.slice(scrollXStore.startIndex + scrollXStore.renderSize, visibleColumn.length).reduce((previous, column) => previous + column.renderWidth, 0)
    },
    // 更新 Y 滚动上下剩余空间大小
    updateScrollYSpace () {
      let { scrollYStore } = this
      let { fullData, tableData } = this.getTableData()
      this.tableData = tableData
      scrollYStore.topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0)
      scrollYStore.bottomSpaceHeight = Math.max((fullData.length - (scrollYStore.startIndex + scrollYStore.renderSize)) * scrollYStore.rowHeight, 0)
    },
    clearScroll () {
      Object.assign(this.scrollXStore, {
        visibleSize: 0,
        startIndex: 0,
        leftSpaceWidth: 0,
        rightSpaceWidth: 0
      })
      Object.assign(this.scrollYStore, {
        visibleSize: 0,
        startIndex: 0,
        topSpaceHeight: 0,
        bottomSpaceHeight: 0
      })
      this.$nextTick(() => {
        let tableBody = this.$refs.tableBody
        let tableBodyElem = tableBody ? tableBody.$el : null
        let tableFooter = this.$refs.tableFooter
        let tableFooterElem = tableFooter ? tableFooter.$el : null
        if (tableBodyElem) {
          tableBodyElem.scrollTop = 0
          tableBodyElem.scrollLeft = 0
        }
        if (tableFooterElem) {
          tableFooterElem.scrollLeft = 0
        }
      })
      return this.$nextTick()
    },
    /**
     * 更新列状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    updateStatus (scope) {
      return this.$nextTick().then(() => {
        let { $refs, tableData, editRules } = this
        if (scope && $refs.tableBody && !XEUtils.isEmpty(editRules)) {
          let { row, column } = scope
          let rowIndex = tableData.indexOf(row)
          let cell = DomTools.getCell({ rowIndex, column }, $refs.tableBody.$el)
          if (cell) {
            return this.validCellRules('change', row, column)
              .then(() => this.clearValidate())
              .catch(rule => this.handleValidError({ rule, row, column, cell }))
          }
        }
      })
    },
    /**
     * 对表格某一行进行校验的方法
     * 返回 Promise 对象，或者使用回调方式
     */
    validateRow (row, cb) {
      this.lastCallTime = Date.now()
      this.clearValidate()
      return new Promise((resolve, reject) => {
        this.validRowRules('all', row)
          .then(() => {
            let valid = true
            if (cb) {
              cb(valid)
            }
            resolve(true)
          }).catch((params) => {
            let valid = false
            let { rule, column } = params
            this.handleValidError(params)
            if (cb) {
              cb(valid, { [column.property]: [new Error(rule.message)] })
              resolve(valid)
            } else {
              reject(valid)
            }
          })
      })
    },
    triggerValidate (cb) {
      let { editConfig, editStore, editRules, validStore } = this
      let { actived } = editStore
      let type = validStore.visible ? 'all' : 'blur'
      this.clearValidate()
      if (actived.row && editRules) {
        let { row, column, cell } = actived.args
        if (editConfig.mode === 'row') {
          return this.validRowRules(type, row)
            .catch(params => {
              this.handleValidError(params)
              return Promise.reject(params)
            })
        } else {
          return this.validCellRules(type, row, column).catch(rule => {
            let rest = { rule, row, column, cell }
            this.handleValidError(rest)
            return Promise.reject(rest)
          })
        }
      }
      return Promise.resolve()
    },
    /**
     * 对整个表格数据进行校验
     * 返回 Promise 对象，或者使用回调方式
     */
    validate (cb) {
      let { $refs, editRules, tableData } = this
      let validPromise = Promise.resolve(true)
      this.lastCallTime = Date.now()
      this.clearValidate()
      if (!XEUtils.isEmpty(editRules)) {
        let columns = this.getColumns()
        tableData.forEach((row, rowIndex) => {
          columns.forEach((column, columnIndex) => {
            if (XEUtils.has(editRules, column.property)) {
              validPromise = validPromise.then(() => new Promise((resolve, reject) => {
                this.validCellRules('all', row, column)
                  .then(resolve)
                  .catch(rule => {
                    let rest = { rule, rowIndex, row, columnIndex, column, cell: DomTools.getCell({ rowIndex, column }, $refs.tableBody.$el) }
                    return reject(rest)
                  })
              }))
            }
          })
        })
        return validPromise.then(() => {
          let valid = true
          if (cb) {
            cb(valid)
          }
          return true
        }).catch(params => {
          let valid = false
          let { rule, column } = params
          this.handleValidError(params)
          if (cb) {
            cb(valid, { [column.property]: [new Error(rule.message)] })
          }
          return cb ? Promise.resolve(valid) : Promise.reject(valid)
        })
      } else {
        let valid = true
        if (cb) {
          cb(valid)
        }
      }
      return validPromise
    },
    validRowRules (type, row) {
      let { $refs, tableData, editRules } = this
      let rowIndex = tableData.indexOf(row)
      let validPromise = Promise.resolve()
      if (!XEUtils.isEmpty(editRules)) {
        this.getColumns().forEach((column, columnIndex) => {
          if (XEUtils.has(editRules, column.property)) {
            validPromise = validPromise.then(() => new Promise((resolve, reject) => {
              this.validCellRules('all', row, column)
                .then(resolve)
                .catch(rule => {
                  let rest = { rule, row, column, cell: DomTools.getCell({ rowIndex, column }, $refs.tableBody.$el) }
                  return reject(rest)
                })
            }))
          }
        })
      }
      return validPromise
    },
    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者Promise，结果返回一个 Boolean 值
     * 如果是传回调方式这返回一个 Boolean 值和校验不通过列的错误消息
     *
     * 参数：required=Boolean 是否必填，min=Number 最小长度，max=Number 最大长度，validator=Function(rule, value, callback) 自定义校验，trigger=blur|change 触发方式
     */
    validCellRules (type, row, column) {
      let { editRules, tableFullData, visibleColumn } = this
      let { property } = column
      let validPromise = Promise.resolve()
      if (property && !XEUtils.isEmpty(editRules)) {
        let rules = XEUtils.get(editRules, property)
        let value = XEUtils.get(row, property)
        if (rules) {
          for (let rIndex = 0; rIndex < rules.length; rIndex++) {
            validPromise = validPromise.then(() => new Promise((resolve, reject) => {
              let rule = rules[rIndex]
              let isRequired = rule.required === true
              if ((type === 'all' || !rule.trigger || rule.trigger === 'change' || type === rule.trigger) && (isRequired || value || rule.validator)) {
                if (XEUtils.isFunction(rule.validator)) {
                  rule.validator(rule, value, e => {
                    if (XEUtils.isError(e)) {
                      let cusRule = { type: 'custom', message: e.message, rule }
                      return reject(cusRule)
                    }
                    return resolve()
                  }, { rules, row, column, rowIndex: tableFullData.indexOf(row), columnIndex: visibleColumn.indexOf(column), $table: this })
                } else {
                  let restVal
                  let isNumber = rule.type === 'number'
                  let isEmpty = value === null || value === undefined || value === ''
                  if (isNumber) {
                    restVal = XEUtils.toNumber(value)
                  } else {
                    restVal = isEmpty ? '' : '' + value
                  }
                  if (isRequired && isEmpty) {
                    reject(rule)
                  } else if (value &&
                    ((isNumber && isNaN(value)) ||
                    (XEUtils.isRegExp(rule.pattern) && !rule.pattern.test(value)) ||
                    (XEUtils.isNumber(rule.min) && (isNumber ? restVal < rule.min : restVal.length < rule.min)) ||
                    (XEUtils.isNumber(rule.max) && (isNumber ? restVal > rule.max : restVal.length > rule.max)))
                  ) {
                    reject(rule)
                  } else {
                    resolve()
                  }
                }
              } else {
                resolve()
              }
            }))
          }
        }
      }
      return validPromise
    },
    clearValidate () {
      Object.assign(this.validStore, {
        visible: false,
        row: null,
        column: null,
        rule: null,
        style: null,
        placement: null
      })
      return this.$nextTick()
    },
    handleValidError (params) {
      let { $refs, validStore } = this
      let { rule, row, column, cell } = params
      this.handleActived(params, { type: 'valid-error', trigger: 'call' }).then(() => {
        let { top, left } = DomTools.getOffsetPos(cell)
        let { scrollTop, scrollLeft, visibleWidth, visibleHeight } = DomTools.getDomNode()
        Object.assign(validStore, {
          row,
          column,
          rule,
          visible: true,
          placement: 'bottom'
        })
        this.$nextTick().then(() => {
          let validWrapperElem = $refs.validWrapper
          if (validWrapperElem) {
            validStore.style = {
              top: `${top + cell.offsetHeight}px`,
              left: `${left + Math.floor((cell.offsetWidth - validWrapperElem.offsetWidth) / 2)}px`
            }
            return this.$nextTick()
          }
        }).then(() => {
          let validWrapperElem = $refs.validWrapper
          if (validWrapperElem) {
            let offsetHeight = validWrapperElem.offsetHeight
            let offsetWidth = validWrapperElem.offsetWidth
            if (top + cell.offsetHeight + offsetHeight > scrollTop + visibleHeight) {
              validStore.placement = 'top'
              validStore.style.top = `${top - offsetHeight}px`
            }
            if (left + offsetWidth > scrollLeft + visibleWidth) {
              validStore.style.left = `${scrollLeft + visibleWidth - offsetWidth - 6}px`
            }
          }
        })
        UtilTools.emitEvent(this, 'valid-error', [params])
      })
    },
    /**
     * 导出 csv 文件
     */
    exportCsv (options) {
      let { visibleColumn, scrollXLoad, scrollYLoad } = this
      let opts = Object.assign({
        filename: 'table.csv',
        original: false,
        isHeader: true,
        download: true,
        data: null,
        columns: null,
        columnFilterMethod: column => ['index', 'selection', 'radio'].indexOf(column.type) === -1 && column.property,
        dataFilterMethod: null
      }, options)
      if (opts.filename.indexOf('.csv') === -1) {
        opts.filename += '.csv'
      }
      if (scrollXLoad || scrollYLoad) {
        opts.original = true
      }
      let columns = visibleColumn
      let oData = this.getTableData().fullData
      return ExportTools.downloadCsc(opts, ExportTools.getCsvContent(opts, oData, columns, this.$el))
    }
  }
}
