import XEUtils from 'xe-utils'
import TableHeader from './header'
import TableBody from './body'
import TableFooter from './footer'
import UtilTools from '../../../src/tools/utils'
import DomTools from '../../../src/tools/dom'
import ExportTools from '../../../src/tools/export'
import GlobalEvent from './event'
import TableProps from './props'
import TableFilter from './filter'
import TableContextMenu from './menu'
import GlobalConfig from '../../../src/conf'

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
  let style = {
    height: `${(customHeight ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollXHeight}px`,
    width: `${columnStore[`${fixedType}List`].reduce((previous, column) => previous + column.renderWidth, isRightFixed ? scrollYWidth + 1 : 0)}px`
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
        visibleColumn
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
      // 完整列配置
      collectColumn: [],
      // 渲染的列
      tableColumn: [],
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
      // 是否滚动方式加载
      scrollLoad: false,
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
      // 存放滚动渲染相关的信息
      scrollStore: {
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
        style: null
      },
      // 存放可编辑相关信息
      editStore: {
        // 所有选中
        checked: {
          rows: [],
          columns: []
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
      }
    }
  },
  computed: {
    // 优化的参数
    optimizeConfig () {
      let { optimized, editConfig } = this
      let isAll = optimized === true
      return Object.assign({
        // 显示效果开关
        animat: !isAll,
        // 如果设置了则不允许换行 ellipsis、title、tooltip
        overflow: isAll || editConfig ? 'tooltip' : null,
        // 默认大于 500 条时自动使用滚动渲染
        scroll: {
          gt: 500,
          oSize: 30,
          rSize: 120
        }
      }, optimized)
    },
    // 是否使用了分组表头
    isGroup () {
      return this.collectColumn.some(column => UtilTools.hasChildrenList(column))
    },
    visibleColumn () {
      return this.tableColumn.filter(column => column.visible)
    },
    isFilter () {
      return this.visibleColumn.some(column => column.filters && column.filters.length)
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
      this.reload(value)
    },
    customs (value) {
      if (!this.isUpdateCustoms) {
        this.mergeCustomColumn(value)
      }
      this.isUpdateCustoms = false
    },
    tableColumn () {
      this.analyColumnWidth()
    },
    visibleColumn () {
      this.analyColumnWidth()
      this.$nextTick(() => this.computeWidth())
    }
  },
  created () {
    this.reload(this.data, true).then(() => {
      this.tableColumn = UtilTools.getColumnList(this.collectColumn)
      if (this.customs) {
        this.mergeCustomColumn(this.customs)
      }
      this.refreshColumn()
      this.$nextTick(() => {
        this.computeScrollLoad()
        this.computeWidth(true)
      })
    })
    GlobalEvent.on(this, 'click', this.handleGlobalClickEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
    GlobalEvent.on(this, 'contextmenu', this.handleContextmenuEvent)
    GlobalEvent.on(this, 'mousewheel', this.handleMousewheelEvent)
    GlobalEvent.on(this, 'keydown', this.handleKeydownEvent)
  },
  mounted () {
    document.body.appendChild(this.$refs.tableWrapper)
  },
  beforeDestroy () {
    let tableWrapper = this.$refs.tableWrapper
    if (tableWrapper && tableWrapper.parentNode) {
      tableWrapper.parentNode.removeChild(tableWrapper)
    }
    this.closeFilter()
    this.closeContextMenu()
  },
  destroyed () {
    GlobalEvent.off(this, 'click')
    GlobalEvent.off(this, 'blur')
    GlobalEvent.off(this, 'contextmenu')
    GlobalEvent.off(this, 'mousewheel')
    GlobalEvent.off(this, 'keydown')
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
      getRecords
    } = this
    let { leftList, rightList } = columnStore
    let footerData = showFooter && footerMethod && tableColumn.length ? footerMethod({ columns: tableColumn, data: getRecords() }) : ['-']
    return h('div', {
      class: ['vxe-table', size ? `size--${size}` : '', {
        'vxe-editable': editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'scroll--y': overflowY,
        'scroll--x': overflowX,
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
          class: ['vxe-table--tooltip-wrapper'],
          style: tooltipStore.style,
          ref: 'tipWrapper'
        }, [
          h('div', {
            class: ['vxe-table--tooltip-content']
          }, '' + tooltipStore.content),
          h('div', {
            class: ['vxe-table--tooltip-arrow']
          })
        ]) : null
      ])
    ])
  },
  methods: {
    clearSelection () {
      this.isAllSelected = false
      this.isIndeterminate = false
      this.selection = []
      return this.$nextTick()
    },
    clearSelectRow () {
      this.selectRow = null
      this.hoverRow = null
      return this.$nextTick()
    },
    clearSort () {
      this.tableColumn.forEach(column => {
        column.order = null
      })
      this.tableFullData = this.data || []
      this.tableData = this.tableFullData
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
    reload (data, init) {
      let { autoWidth, scrollStore, optimizeConfig, computeWidth, computeScrollLoad } = this
      let scroll = optimizeConfig.scroll
      let tableFullData = data || []
      let scrollLoad = scroll && scroll.gt && scroll.gt < tableFullData.length
      if (scrollLoad) {
        Object.assign(scrollStore, {
          startIndex: 0,
          visibleIndex: 0,
          renderSize: scroll.rSize,
          offsetSize: scroll.oSize
        })
      }
      this.insertList = []
      this.removeList = []
      // 原始数据
      this.tableSourceData = XEUtils.clone(tableFullData, true)
      // 全量数据
      this.tableFullData = tableFullData
      this.scrollLoad = scrollLoad
      this.tableData = this.getTableData()
      let rest = this.$nextTick()
      if (!init && autoWidth) {
        rest = rest.then(computeWidth)
      }
      if (!init && scrollLoad) {
        rest = rest.then(computeScrollLoad)
      }
      return rest
    },
    insert (record) {
      return this.insertAt(record)
    },
    /**
     * 从指定行插入数据
     */
    insertAt (record, row) {
      let { tableData, insertList } = this
      let newRecord = record
      if (arguments.length === 1) {
        tableData.unshift(newRecord)
      } else {
        if (row === -1) {
          tableData.push(newRecord)
        } else {
          let rowIndex = XEUtils.findIndexOf(tableData, item => item === row)
          tableData.splice(rowIndex, 0, newRecord)
        }
      }
      insertList.push(newRecord)
      return this.$nextTick().then(() => ({ row: newRecord }))
    },
    /**
     * 删除指定行数据
     * 支持删除一行
     * 支持删除多行
     */
    remove (rows) {
      let { tableData, removeList } = this
      let rest = []
      if (rows && !XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (rows.length) {
        rest = XEUtils.remove(tableData, item => rows.indexOf(item) > -1)
      }
      removeList.push.apply(removeList, rest)
      return this.$nextTick(() => rest)
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
          let rowIndex = XEUtils.findIndexOf(tableFullData, item => item === row)
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
        selecteds: this.getSelecteds(),
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
     * 获取处理后的表格数据
     * 如果存在筛选条件，继续处理
     * 如果存在排序，继续处理
     */
    getTableData () {
      let { tableColumn, tableFullData, scrollLoad, scrollStore } = this
      let { isAllSelected, isIndeterminate } = this.filterStore
      let column = this.tableColumn.find(column => column.order)
      let tableData = tableFullData
      if (isAllSelected || isIndeterminate) {
        tableData = tableData.filter(row => {
          return tableColumn.every(column => {
            let { property, filters, filterMethod } = column
            if (filters && filters.length) {
              let valueList = []
              filters.forEach(item => {
                if (item.checked) {
                  valueList.push(item.value)
                }
              })
              if (valueList.length) {
                let a = filterMethod ? valueList.some(value => filterMethod({ value, row, column })) : valueList.indexOf(UtilTools.getCellValue(row, property)) > -1
                return a
              }
            }
            return true
          })
        })
      }
      if (column && column.order) {
        let rest = XEUtils.sortBy(tableData, column.property)
        tableData = column.order === 'desc' ? rest.reverse() : rest
      }
      return scrollLoad ? tableData.slice(scrollStore.startIndex, scrollStore.startIndex + scrollStore.renderSize) : tableData.slice(0)
    },
    /**
     * 动态列处理
     */
    mergeCustomColumn (customColumns) {
      this.isUpdateCustoms = true
      this.tableColumn.map(column => {
        let item = customColumns.find(item => column.property && item.prop === column.property)
        column.visible = item ? !!item.visible : true
      })
      this.$emit('update:customs', this.tableColumn)
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
      this.tableColumn.forEach((column, columnIndex) => {
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
      })
      this.tableColumn = leftList.concat(centerList).concat(rightList)
      Object.assign(this.columnStore, { leftList, centerList, rightList })
      if ((isColspan && this.isGroup) || (rightIndex && rightIndex !== this.tableColumn.length)) {
        throw new Error('[vxe-table] Fixed column must to the left and right sides.')
      }
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
      this.tableColumn.forEach(column => {
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
    computeWidth (refull) {
      let tableBody = this.$refs.tableBody
      let tableHeader = this.$refs.tableHeader
      let tableFooter = this.$refs.tableFooter
      let bodyElem = tableBody.$el
      let headerElem = tableHeader ? tableHeader.$el : null
      let footerElem = tableFooter ? tableFooter.$el : null
      let bodyWidth = bodyElem.clientWidth
      let tableWidth = this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth)
      if (refull === true) {
        // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
        this.$nextTick(() => {
          bodyWidth = bodyElem.clientWidth
          if (bodyWidth !== tableWidth) {
            this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth)
          }
        })
      }
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
      let bodyElem = tableBody.$el
      if (leftBody) {
        this.scrollLeftToRight = bodyElem.scrollLeft > 0
      }
      if (rightBody) {
        this.scrollRightToLeft = bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft
      }
    },
    /**
     * 全局点击事件处理
     */
    handleGlobalClickEvent (evnt) {
      if (this.$refs.filterWrapper) {
        if (this.getEventTargetNode(evnt, this.$el, 'vxe-filter-wrapper').flag) {
          // 如果点击了筛选按钮
        } else if (this.getEventTargetNode(evnt, this.$refs.filterWrapper.$el).flag) {
          // 如果点击筛选容器
        } else {
          this.closeFilter()
        }
      }
      if (this.$refs.ctxWrapper && !this.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
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
    handleMousewheelEvent (evnt) {
      this.closeContextMenu()
    },
    /**
     * 全局键盘事件
     */
    handleKeydownEvent (evnt) {
      let params
      let { selectEditMethod, isCtxMenu, ctxMenuStore, editStore, mouseConfig = {}, keyboardConfig = {} } = this
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
        if (actived.row || actived.column) {
          params = actived.args
          this.closeActived()
          // 如果配置了选中功能，则为选中状态
          if (mouseConfig.selected) {
            this.handleSelected(params, evnt)
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
          if (!selectEditMethod || !(selectEditMethod(selected.args, evnt) === false)) {
            UtilTools.setCellValue(selected.row, selected.column.property, null)
            this.handleActived(selected.args, evnt)
          }
        }
      }
    },
    // 处理 Tab 键移动
    moveTabSelected (params, evnt) {
      let { $refs, tableData, visibleColumn, handleSelected } = this
      let { rowIndex, columnIndex } = params
      let nextRow
      let nextRowIndex
      let nextColumn
      let nextColumnIndex
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
    /**
     * 快捷菜单事件处理
     */
    handleContextmenuEvent (evnt) {
      let { isCtxMenu, ctxMenuConfig } = this
      if (isCtxMenu) {
        // 右键头部
        let headeWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--header-wrapper')
        if (headeWrapperNode.flag) {
          this.openContextMenu(evnt, ctxMenuConfig.header, { })
          return
        }
        // 右键内容
        let bodyWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--body-wrapper')
        if (bodyWrapperNode.flag) {
          this.openContextMenu(evnt, ctxMenuConfig.body, { })
          return
        }
        // 右键表尾
        let footerWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--footer-wrapper')
        if (footerWrapperNode.flag) {
          this.openContextMenu(evnt, ctxMenuConfig.footer, { })
          return
        }
      }
      this.closeContextMenu()
      this.closeFilter()
    },
    /**
     * 显示快捷菜单
     */
    openContextMenu (evnt, config, params) {
      if (config) {
        let { ctxMenuStore } = this
        let { options, visibleMethod, disabled } = config
        if (disabled) {
          evnt.preventDefault()
        } else if (options && options.length) {
          if (!visibleMethod || visibleMethod(params, evnt)) {
            evnt.preventDefault()
            let { scrollTop, scrollLeft, visibleHeight, visibleWidth } = DomTools.getDomNode()
            let top = evnt.clientY + scrollTop
            let left = evnt.clientX + scrollLeft
            Object.assign(ctxMenuStore, {
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
      UtilTools.emitEvent(this, 'context-menu-link', [menu, evnt])
      this.closeContextMenu()
    },
    /**
     * 检查触发源是否属于目标节点
     */
    getEventTargetNode (evnt, container, queryCls) {
      let targetElem
      let target = evnt.target
      while (target && target.nodeType && target !== document) {
        if (DomTools.hasClass(target, queryCls)) {
          targetElem = target
        } else if (target === container) {
          return { flag: queryCls ? !!targetElem : true, container, targetElem: targetElem }
        }
        target = target.parentNode
      }
      return { flag: false }
    },
    /**
     * 触发 tooltip 事件
     */
    triggerTooltipEvent (evnt, { row, column }) {
      let { editConfig, editStore } = this
      let { actived } = editStore
      if (editConfig) {
        if ((editConfig.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {
          return
        }
      }
      let cell = evnt.currentTarget
      let wrapperElem = cell.children[0]
      let content = UtilTools.getCellValue(row, column.property)
      if (content && wrapperElem.scrollWidth > wrapperElem.clientWidth) {
        let { tooltipStore, $refs } = this
        if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
          let { top, left } = DomTools.getOffsetPos(cell)
          let { scrollTop, scrollLeft, visibleWidth } = DomTools.getDomNode()
          Object.assign(tooltipStore, {
            row,
            column,
            content: UtilTools.getCellValue(row, column.property),
            visible: true
          })
          this.$nextTick().then(() => {
            let tipWrapperElem = $refs.tipWrapper
            tooltipStore.style = {
              width: `${tipWrapperElem.offsetWidth + 2}px`,
              top: `${top - tipWrapperElem.offsetHeight - 6}px`,
              left: `${left - 6}px`
            }
            if (tipWrapperElem.offsetWidth < cell.offsetWidth) {
              tooltipStore.style.left = `${left + Math.floor((cell.offsetWidth - tipWrapperElem.offsetWidth) / 2) - 6}px`
            }
            return this.$nextTick()
          }).then(() => {
            let tipWrapperElem = $refs.tipWrapper
            let offsetHeight = tipWrapperElem.offsetHeight
            let offsetWidth = tipWrapperElem.offsetWidth
            if (top - offsetHeight < scrollTop) {
              tooltipStore.style.top = `${top + cell.offsetHeight + 6}px`
            }
            if (left + offsetWidth > scrollLeft + visibleWidth) {
              tooltipStore.style.left = `${scrollLeft + visibleWidth - offsetWidth - 6}px`
            }
          })
        }
      }
    },
    // 关闭 tooltip
    clostTooltip () {
      Object.assign(this.tooltipStore, {
        row: null,
        column: null,
        content: null,
        style: null,
        visible: false
      })
    },
    /**
     * 多选，行选中事件
     */
    triggerCheckRowEvent (evnt, value, { row, column }) {
      let { $listeners, selection, tableData } = this
      let { property } = column
      if (property) {
        UtilTools.setCellValue(row, property, value)
        this.isAllSelected = tableData.every(item => UtilTools.getCellValue(item, property))
        this.isIndeterminate = !this.isAllSelected && tableData.some(item => UtilTools.getCellValue(item, property))
        if ($listeners['select-change']) {
          selection = tableData.filter(item => UtilTools.getCellValue(item, property))
        }
      } else {
        if (value) {
          selection.push(row)
        } else {
          XEUtils.remove(selection, item => item === row)
        }
        this.isAllSelected = tableData.length === selection.length
        this.isIndeterminate = !this.isAllSelected && selection.length
      }
      UtilTools.emitEvent(this, 'select-change', [{ row, column, selection, checked: value }, evnt])
    },
    /**
     * 多选，切换某一行的选中状态
     */
    toggleRowSelection (row, checked) {
      let column = this.tableColumn.find(column => column.type === 'selection')
      this.triggerCheckRowEvent(null, checked, { row, column })
    },
    /**
     * 多选，选中所有事件
     */
    triggerCheckAllEvent (evnt, value) {
      let column = this.tableColumn.find(column => column.type === 'selection')
      let property = column.property
      if (property) {
        this.tableData.forEach(item => {
          UtilTools.setCellValue(item, property, value)
        })
      }
      this.selection = value ? Array.from(this.tableData) : []
      this.isAllSelected = value
      this.isIndeterminate = false
      UtilTools.emitEvent(this, 'select-all', [{ selection: this.selection, checked: value }, evnt])
    },
    /**
     * 多选，切换所有行的选中状态
     */
    toggleAllSelection () {
      this.triggerCheckAllEvent(null, !this.isAllSelected)
    },
    /**
     * 单选，行选中事件
     */
    triggerRowEvent (evnt, { row }) {
      this.selectRow = row
      UtilTools.emitEvent(this, 'select-change', [{ row }, evnt])
    },
    /**
     * 单选，设置某一行为选中状态，如果调不加参数，则会取消目前高亮行的选中状态
     */
    setCurrentRow (row) {
      this.selectRow = row
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
      let { $el, tableData, visibleColumn, editStore, editConfig, getEventTargetNode, handleSelected, handleChecked } = this
      let { checked, actived } = editStore
      let { row, column, cell } = params
      let { button } = evnt
      let isLeftBtn = button === 0
      let isRightBtn = button === 2
      if (isLeftBtn || isRightBtn) {
        if (editConfig && editConfig.trigger === 'dblclick') {
          if (actived.row === row && actived.column === column) {
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
                let { flag, targetElem } = getEventTargetNode(evnt, $el, 'vxe-body--column')
                if (flag) {
                  handleChecked(start, DomTools.getCellIndexs(targetElem), evnt)
                }
              }, DomTools.browse.msie ? 80 : 40, { leading: true, trailing: true })
              document.onmousemove = updateEvent
              document.onmouseup = function (evnt) {
                document.onmousemove = domMousemove
                document.onmouseup = domMouseup
              }
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
     * 列点击事件
     * 如果是单击模式，则激活为编辑状态
     * 如果是双击模式，则单击后选中状态
     */
    triggerCellClickEvent (evnt, params) {
      let { highlightCurrentRow, editConfig } = this
      if (highlightCurrentRow) {
        this.selectRow = params.row
      }
      if (editConfig) {
        if (editConfig.trigger === 'click') {
          this.handleActived(params, evnt)
        }
      }
      UtilTools.emitEvent(this, 'cell-click', [params, evnt])
    },
    /**
     * 列双击点击事件
     * 如果是双击模式，则激活为编辑状态
     */
    triggerCellDBLClickEvent (evnt, params) {
      let { editConfig } = this
      if (editConfig) {
        if (editConfig.trigger === 'dblclick') {
          this.handleActived(params, evnt)
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
      let { copyed, checked, selected, actived } = editStore
      let { row, column } = params
      if (actived.row !== row || actived.column !== column) {
        // 判断是否禁用编辑
        if (!activeMethod || activeMethod(params)) {
          copyed.cut = false
          copyed.rows = []
          copyed.columns = []
          checked.rows = []
          checked.columns = []
          selected.args = null
          selected.row = null
          selected.column = null
          actived.args = params
          actived.row = row
          actived.column = column
          this.$nextTick(() => {
            this.handleFocus(params, evnt)
          })
        } else {
          UtilTools.emitEvent(this, 'edit-disabled', [params, evnt])
        }
      }
    },
    hasActiveRow (row) {
      let { editStore } = this
      let { actived } = editStore
      return actived.row === row
    },
    /**
     * 关闭编辑状态
     */
    closeActived () {
      let { editStore } = this
      let { actived } = editStore
      actived.args = null
      actived.row = null
      actived.column = null
    },
    /**
     * 处理选中源
     */
    handleSelected (params, evnt) {
      let { mouseConfig = {}, editStore } = this
      let { checked, selected, actived } = editStore
      let { row, column } = params
      if (selected.row !== row || selected.column !== column) {
        checked.rows = []
        checked.columns = []
        actived.args = null
        actived.row = null
        actived.column = null
        selected.args = params
        selected.row = row
        selected.column = column
      }
      // 如果配置了批量选中功能，则为批量选中状态
      if (mouseConfig.checked) {
        let select = DomTools.getCellIndexs(params.cell)
        this.handleChecked(select, select, evnt)
      }
    },
    /**
     * 处理所有选中
     */
    handleChecked (start, end, evnt) {
      let { tableData, visibleColumn, editStore } = this
      let { checked } = editStore
      let { rowIndex: sRowIndex, columnIndex: sColumnIndex } = start
      let { rowIndex: eRowIndex, columnIndex: eColumnIndex } = end
      if (sRowIndex < eRowIndex) {
        checked.rows = tableData.slice(sRowIndex, eRowIndex + 1)
      } else {
        checked.rows = tableData.slice(eRowIndex, sRowIndex + 1)
      }
      if (sColumnIndex < eColumnIndex) {
        checked.columns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1)
      } else {
        checked.columns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex + 1)
      }
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
      let { rows, columns } = copyed
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
            })
          }
        })
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
        // 自定义的处理
        if (compRender) {
          if (compRender.autofocus) {
            inputElem = cell.querySelector(compRender.autofocus)
          }
        } else {
        // 内置的处理
          inputElem = cell.querySelector('input.vxe-input')
          if (!inputElem) {
            inputElem = cell.querySelector('textarea.vxe-textarea')
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
        let rowIndex = XEUtils.findIndexOf(tableData, item => item === row)
        if (rowIndex > -1) {
          let column = visibleColumn.find(column => column.editRender)
          let cell = $refs.tableBody.$el.querySelector(`.vxe-body--row.row--${id}_${rowIndex} .${column.id}`)
          handleActived({ row, column, cell })
        }
      }
    },
    /**
     * 只对 mode=row 有效，激活单元格编辑
     */
    setActiveCell (row, prop) {
      let { $refs, id, tableData, visibleColumn, handleActived, editConfig } = this
      if (row && prop && editConfig.mode === 'cell') {
        let rowIndex = XEUtils.findIndexOf(tableData, item => item === row)
        if (rowIndex > -1 && prop) {
          let column = visibleColumn.find(column => column.property === prop)
          let cell = $refs.tableBody.$el.querySelector(`.vxe-body--row.row--${id}_${rowIndex} .${column.id}`)
          handleActived({ row, column, cell })
        }
      }
    },
    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    setSelectCell (row, prop) {
      let { editConfig } = this
      if (row && prop && editConfig.trigger !== 'manual') {

      }
    },
    /**
     * 点击排序事件
     */
    triggerSortEvent (evnt, column, params, order) {
      if (column.order !== order) {
        let prop = column.property
        this.tableColumn.forEach(column => {
          column.order = null
        })
        column.order = order
        // 如果是服务端排序，则跳过本地排序处理
        if (column.sortable !== 'custom') {
          this.tableData = this.getTableData()
        }
        UtilTools.emitEvent(this, 'sort-change', [{ column, prop, order }])
      }
    },
    /**
     * 点击筛选事件
     */
    triggerFilterEvent (evnt, column, params) {
      let { $refs, filterStore } = this
      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false
      } else {
        let targetElem = evnt.target
        let filterWrapperElem = $refs.filterWrapper
        let { top, left } = DomTools.getOffsetPos(targetElem)
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
      this.tableData = this.getTableData()
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
    },
    // 重置筛选
    resetFilterEvent (evnt) {
      this.filterStore.options.forEach(item => {
        item.checked = false
      })
      this.closeFilter()
    },
    /**
     * 展开行事件
     */
    triggerExpandRowEvent (evnt, { row }) {
      let { expandeds } = this
      let index = XEUtils.findIndexOf(expandeds, item => item === row)
      if (index > -1) {
        expandeds.splice(index, 1)
      } else {
        expandeds.push(row)
      }
      this.$nextTick(() => this.computeWidth())
    },
    /**
     * 是否启用了滚动渲染
     */
    isScrollLoad () {
      return this.scrollLoad
    },
    /**
     * 滚动渲染事件处理
     */
    triggerSrcollEvent: XEUtils.debounce(function (evnt) {
      let { tableFullData, scrollStore } = this
      let { startIndex, renderSize, offsetSize, visibleSize, rowHeight } = scrollStore
      let scrollBodyElem = evnt.target
      let scrollTop = scrollBodyElem.scrollTop
      let toVisibleIndex = Math.ceil(scrollTop / rowHeight)
      if (scrollStore.visibleIndex !== toVisibleIndex) {
        let isReload, preloadSize
        let isTop = scrollStore.visibleIndex > toVisibleIndex
        if (isTop) {
          preloadSize = renderSize - offsetSize
          isReload = toVisibleIndex - offsetSize <= startIndex
        } else {
          preloadSize = offsetSize
          isReload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize
        }
        if (isReload) {
          scrollStore.visibleIndex = toVisibleIndex
          scrollStore.startIndex = Math.min(Math.max(toVisibleIndex - preloadSize, 0), tableFullData.length - renderSize)
          this.updateScrollSpace()
          this.$nextTick(() => {
            scrollBodyElem.scrollTop = scrollTop
          })
        }
      }
    }, DomTools.browse.msie ? 40 : 20, { leading: false, trailing: true }),
    // 计算滚动渲染相关数据
    computeScrollLoad () {
      let { scrollStore } = this
      let tableBodyElem = this.$refs.tableBody.$el
      let tableHeader = this.$refs.tableHeader
      let firstTrElem = tableBodyElem.querySelector('tbody>tr')
      if (!firstTrElem && tableHeader) {
        firstTrElem = tableHeader.$el.querySelector('thead>tr')
      }
      if (firstTrElem) {
        scrollStore.rowHeight = firstTrElem.clientHeight
      }
      scrollStore.visibleSize = Math.ceil(tableBodyElem.clientHeight / scrollStore.rowHeight)
      this.updateScrollSpace()
    },
    // 更新滚动上下空间大小
    updateScrollSpace () {
      let { tableFullData, scrollStore } = this
      this.tableData = this.getTableData()
      scrollStore.topSpaceHeight = scrollStore.startIndex * scrollStore.rowHeight
      scrollStore.bottomSpaceHeight = (tableFullData.length - (scrollStore.startIndex + scrollStore.renderSize)) * scrollStore.rowHeight
    },
    /**
     * 导出 csv 文件
     */
    exportCsv (options) {
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
      if (this.scrollLoad) {
        opts.original = true
      }
      let columns = this.tableColumn
      let oData = this.getTableData()
      return ExportTools.downloadCsc(opts, ExportTools.getCsvContent(opts, oData, columns, this.$el))
    }
  }
}
