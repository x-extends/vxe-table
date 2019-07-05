import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import Cell from '../../cell'
import { Interceptor, Renderer } from '../../v-x-e-table'
import { UtilTools, DomTools, ExportTools, ResizeEvent, GlobalEvent } from '../../tools'

var rowUniqueId = 0
var browse = DomTools.browse
var isWebkit = browse['-webkit'] && !browse['-ms']
var debounceScrollYDuration = browse.msie ? 40 : 20

/**
 * 渲染浮固定列
 */
function renderFixed (h, $table, fixedType) {
  let {
    tableData,
    tableColumn,
    visibleColumn,
    collectColumn,
    isGroup,
    height,
    parentHeight,
    vSize,
    headerHeight,
    footerHeight,
    showHeader,
    showFooter,
    tableHeight,
    columnStore,
    footerData
  } = $table
  let customHeight = height === 'auto' ? parentHeight : XEUtils.toNumber(height)
  let fixedColumn = columnStore[`${fixedType}List`]
  return h('div', {
    class: `vxe-table--fixed-${fixedType}-wrapper`,
    ref: `${fixedType}Container`
  }, [
    showHeader ? h('vxe-table-header', {
      props: {
        fixedType,
        tableData,
        tableColumn,
        visibleColumn,
        collectColumn,
        size: vSize,
        fixedColumn,
        isGroup
      },
      ref: `${fixedType}Header`
    }) : null,
    h('vxe-table-body', {
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
        size: vSize,
        isGroup
      },
      ref: `${fixedType}Body`
    }),
    showFooter ? h('vxe-table-footer', {
      style: {
        top: `${customHeight ? customHeight - footerHeight : tableHeight}px`
      },
      props: {
        fixedType,
        footerData,
        tableColumn,
        visibleColumn,
        size: vSize,
        fixedColumn
      },
      ref: `${fixedType}Footer`
    }) : null
  ])
}

export default {
  name: 'VxeTable',
  props: {
    /** 基本属性 */
    // 数据
    data: Array,
    // 初始化绑定动态列
    customs: Array,
    // 表格的高度
    height: [Number, String],
    // 表格的最大高度
    maxHeight: [Number, String],
    // 所有列是否允许拖动列宽调整大小
    resizable: { type: Boolean, default: () => GlobalConfig.resizable },
    // 是否带有斑马纹
    stripe: { type: Boolean, default: () => GlobalConfig.stripe },
    // 是否带有纵向边框
    border: { type: Boolean, default: () => GlobalConfig.border },
    // 表格的尺寸
    size: { type: String, default: () => GlobalConfig.size },
    // 列的宽度是否自撑开
    fit: { type: Boolean, default: () => GlobalConfig.fit },
    // 表格是否加载中
    loading: Boolean,
    // 是否显示表头
    showHeader: { type: Boolean, default: () => GlobalConfig.showHeader },
    // 只对 type=index 时有效，自定义序号的起始值
    startIndex: { type: Number, default: 0 },
    // 是否要高亮当前选中行
    highlightCurrentRow: Boolean,
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: Boolean,
    // 是否要高亮当前选中列
    highlightCurrentColumn: Boolean,
    // 鼠标移到列是否要高亮显示
    highlightHoverColumn: Boolean,
    // 激活单元格编辑时是否高亮显示
    highlightCell: Boolean,
    // 是否显示表尾合计
    showFooter: Boolean,
    // 表尾合计的计算方法
    footerMethod: Function,
    // 给行附加 className
    rowClassName: [String, Function],
    // 给单元格附加 className
    cellClassName: [String, Function],
    // 给表头的行附加 className
    headerRowClassName: [String, Function],
    // 给表头的单元格附加 className
    headerCellClassName: [String, Function],
    // 给表尾的行附加 className
    footerRowClassName: [String, Function],
    // 给表尾的单元格附加 className
    footerCellClassName: [String, Function],
    // 合并行或列
    spanMethod: Function,
    // 设置所有内容过长时显示为省略号
    showOverflow: { type: [Boolean, String], default: () => GlobalConfig.showOverflow },
    // 设置表头所有内容过长时显示为省略号
    showHeaderOverflow: { type: [Boolean, String], default: () => GlobalConfig.showHeaderOverflow },
    // 是否服务端筛选
    remoteFilter: Boolean,

    /** 高级属性 */
    // 行数据的 Key
    rowKey: [String, Number],
    // 是否自动根据父容器响应式调整表格宽高
    autoResize: Boolean,
    // 单选配置
    radioConfig: Object,
    // 多选配置项
    selectConfig: Object,
    // tooltip 配置项
    tooltipConfig: Object,
    // 展开行配置项
    expandConfig: Object,
    // 树形结构配置项
    treeConfig: Object,
    // 快捷菜单配置项
    contextMenu: Object,
    // 鼠标配置项
    mouseConfig: Object,
    // 按键配置项
    keyboardConfig: Object,
    // 编辑配置项
    editConfig: Object,
    // 校验配置项
    validConfig: Object,
    // 校验规则配置项
    editRules: Object,
    // 优化配置项
    optimization: Object
  },
  provide () {
    return {
      $table: this
    }
  },
  data () {
    return {
      id: XEUtils.uniqueId(),
      // 分组表头的属性
      headerProps: {
        children: 'children'
      },
      // 列分组配置
      collectColumn: [],
      // 完整所有列
      tableFullColumn: [],
      // 渲染的列
      tableColumn: [],
      // 渲染中的数据
      tableData: [],
      // 是否启用了横向 X 可视渲染方式加载
      scrollXLoad: false,
      // 是否启用了纵向 Y 可视渲染方式加载
      scrollYLoad: false,
      // 是否存在纵向滚动条
      overflowY: true,
      // 是否存在横向滚动条
      overflowX: false,
      // 纵向滚动条的宽度
      scrollYWidth: 0,
      // 横向滚动条的高度
      scrollXHeight: 0,
      // 是否全选
      isAllSelected: false,
      // 多选属性，有选中且非全选状态
      isIndeterminate: false,
      // 多选属性，已选中的列
      selection: [],
      // 单选属性，选中行
      selectRow: null,
      // 已展开的行
      expandeds: [],
      // 已展开树节点
      treeExpandeds: [],
      // 树节点不确定状态的列表
      treeIndeterminates: [],
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
      // 存放可编辑相关信息
      editStore: {
        indexs: {
          columns: []
        },
        titles: {
          columns: []
        },
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
        content: '',
        rule: null,
        isArrow: false
      }
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    optimizeOpts () {
      return Object.assign({}, GlobalConfig.optimization, this.optimization)
    },
    // 是否使用了分组表头
    isGroup () {
      return this.collectColumn.some(column => UtilTools.hasChildrenList(column))
    },
    hasTip () {
      return GlobalConfig._tip
    },
    visibleColumn () {
      return this.tableFullColumn ? this.tableFullColumn.filter(column => column.visible) : []
    },
    isResizable () {
      return this.resizable || this.tableFullColumn.some(column => column.resizable)
    },
    hasFilter () {
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
      return Object.assign({}, GlobalConfig.menu, this.contextMenu)
    },
    ctxMenuList () {
      let rest = []
      this.ctxMenuStore.list.forEach(list => {
        list.forEach(item => {
          rest.push(item)
        })
      })
      return rest
    },
    footerData () {
      let { showFooter, visibleColumn, tableFullData, data, footerMethod } = this
      return showFooter && footerMethod && (visibleColumn.length || data) ? footerMethod({ columns: visibleColumn, data: tableFullData }) : ['-']
    }
  },
  watch: {
    data (value) {
      if (!this._isUpdateData) {
        this.loadData(value, true).then(this.handleDefaultExpand)
      }
      this._isUpdateData = false
    },
    customs (value) {
      if (!this.isUpdateCustoms) {
        this.mergeCustomColumn(value)
      }
      this.isUpdateCustoms = false
    },
    collectColumn (value) {
      let tableFullColumn = UtilTools.getColumnList(value)
      this.tableFullColumn = tableFullColumn
      this.cacheColumnMap()
      if (tableFullColumn.length) {
        let cIndex = Math.floor((tableFullColumn.length - 1) / 2)
        if (tableFullColumn[cIndex].prop) {
          console.warn('[vxe-table] The property prop is deprecated, please use field')
        }
        if (tableFullColumn[cIndex].label) {
          console.warn('[vxe-table] The property label is deprecated, please use title')
        }
      }
    },
    tableColumn () {
      this.analyColumnWidth()
    },
    height () {
      this.$nextTick(this.recalculate)
    },
    loading () {
      if (!this._isLoading) {
        this._isLoading = true
      }
    }
  },
  created () {
    let { scrollYStore, optimizeOpts, selectConfig, data, treeConfig, editConfig, loading } = Object.assign(this, {
      elemStore: {},
      // 存放横向 X 虚拟滚动相关的信息
      scrollXStore: {},
      // 存放纵向 Y 虚拟滚动相关信息
      scrollYStore: {},
      // 存放 tooltip 相关信息
      tooltipStore: {},
      // 表格父容器的高度
      parentHeight: 0,
      // 表格宽度
      tableWidth: 0,
      // 表格高度
      tableHeight: 0,
      // 表头高度
      headerHeight: 0,
      // 表尾高度
      footerHeight: 0,
      // 单选属性，选中列
      // selectColumn: null,
      // 当前 hover 行
      // hoverRow: null,
      // 最后滚动位置
      lastScrollLeft: 0,
      lastScrollTop: 0,
      // 完整数据、条件处理后
      tableFullData: [],
      afterFullData: [],
      // 缓存数据集
      fullDataIndexMap: new Map(),
      fullDataRowIdMap: new Map(),
      fullColumnIdMap: new Map(),
      fullColumnIndexMap: new Map()
    })
    let { scrollY } = optimizeOpts
    // 是否加载过 Loading 模块
    this._isLoading = loading
    if (scrollY) {
      Object.assign(scrollYStore, {
        startIndex: 0,
        visibleIndex: 0,
        adaptive: XEUtils.isBoolean(scrollY.adaptive) ? scrollY.adaptive : true,
        renderSize: scrollY.rSize,
        offsetSize: scrollY.oSize
      })
    }
    let rowKey = UtilTools.getRowKey(this)
    if (selectConfig && selectConfig.reserve && !rowKey) {
      throw new Error('[vxe-table] Checkbox status reserve must have a unique primary key.')
    } else if (treeConfig && !rowKey) {
      throw new Error('[vxe-table] Tree table must have a unique primary key.')
    } else if (editConfig && !rowKey) {
      throw new Error('[vxe-table] Editable must have a unique primary key.')
    }
    this.loadData(data, true).then(() => {
      let { customs, collectColumn } = this
      this.tableFullColumn = UtilTools.getColumnList(collectColumn)
      if (customs) {
        this.mergeCustomColumn(customs)
      }
      this.refreshColumn()
      this.handleDefaultExpand()
      this.updateStyle()
    })
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
    GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent)
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent)
  },
  mounted () {
    if (this.autoResize) {
      ResizeEvent.on(this, this.$el.parentNode, this.recalculate)
    }
    document.body.appendChild(this.$refs.tableWrapper)
  },
  activated () {
    let bodyElem = this.$refs.tableBody.$el
    if (bodyElem) {
      let { lastScrollTop, lastScrollLeft } = this
      if (lastScrollTop) {
        bodyElem.scrollTop = lastScrollTop
      }
      if (lastScrollLeft) {
        bodyElem.scrollLeft = lastScrollLeft
      }
    }
  },
  beforeDestroy () {
    let tableWrapper = this.$refs.tableWrapper
    if (tableWrapper && tableWrapper.parentNode) {
      tableWrapper.parentNode.removeChild(tableWrapper)
    }
    if (ResizeEvent.off) {
      ResizeEvent.off(this, this.$el.parentNode)
    }
    this.afterFullData.length = 0
    this.fullDataIndexMap.clear()
    this.fullColumnIndexMap.clear()
    this.closeFilter()
    this.closeMenu()
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
      hasFilter,
      isResizable,
      isCtxMenu,
      loading,
      _isLoading,
      showHeader,
      border,
      stripe,
      highlightHoverRow,
      highlightHoverColumn,
      highlightCell,
      vSize,
      editConfig,
      validConfig = {},
      mouseConfig = {},
      editRules,
      showFooter,
      footerMethod,
      overflowX,
      overflowY,
      scrollXHeight,
      optimizeOpts,
      columnStore,
      filterStore,
      ctxMenuStore,
      // tooltipStore,
      tooltipConfig,
      validStore,
      footerData,
      hasTip
    } = this
    let { leftList, rightList } = columnStore
    return h('div', {
      class: ['vxe-table', vSize ? `size--${vSize}` : '', {
        'vxe-editable': editConfig,
        'c--highlight': highlightCell,
        'show--head': showHeader,
        'show--foot': showFooter,
        'scroll--y': overflowY,
        'scroll--x': overflowX,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        't--animat': optimizeOpts.animat,
        't--stripe': stripe,
        't--border': border,
        't--checked': mouseConfig.checked,
        'is--loading': loading,
        'row--highlight': highlightHoverRow,
        'column--highlight': highlightHoverColumn
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
      showHeader ? h('vxe-table-header', {
        ref: 'tableHeader',
        props: {
          tableData,
          tableColumn,
          visibleColumn,
          collectColumn,
          size: vSize,
          isGroup
        }
      }) : _e(),
      /**
       * 主内容
       */
      h('vxe-table-body', {
        ref: 'tableBody',
        props: {
          tableData,
          tableColumn,
          visibleColumn,
          collectColumn,
          size: vSize,
          isGroup
        }
      }),
      /**
       * 底部汇总
       */
      showFooter ? h('vxe-table-footer', {
        props: {
          footerData,
          footerMethod,
          tableColumn,
          visibleColumn,
          size: vSize
        },
        ref: 'tableFooter'
      }) : _e(),
      /**
       * 左侧固定列
       */
      leftList && leftList.length && overflowX ? renderFixed(h, this, 'left') : _e(),
      /**
       * 右侧固定列
       */
      rightList && rightList.length && overflowX ? renderFixed(h, this, 'right') : _e(),
      /**
       * 列宽线
       */
      isResizable ? h('div', {
        class: 'vxe-table--resizable-bar',
        style: overflowX ? {
          'padding-bottom': `${scrollXHeight}px`
        } : null,
        ref: 'resizeBar'
      }) : _e(),
      /**
       * 加载中
       */
      _isLoading ? h('vxe-table-loading', {
        props: {
          visible: loading
        }
      }) : _e(),
      h('div', {
        class: `vxe-table${id}-wrapper`,
        ref: 'tableWrapper'
      }, [
        /**
         * 筛选
         */
        hasFilter ? h('vxe-table-filter', {
          props: {
            optimizeOpts,
            filterStore
          },
          ref: 'filterWrapper'
        }) : _e(),
        /**
         * 快捷菜单
         */
        isCtxMenu ? h('vxe-table-context-menu', {
          props: {
            ctxMenuStore
          },
          ref: 'ctxWrapper'
        }) : _e(),
        /**
         * Ellipsis tooltip
         */
        hasTip ? h('vxe-tooltip', {
          ref: 'tooltip'
        }) : _e(),
        /**
         * valid error tooltip
         */
        hasTip && editRules && validConfig.message !== 'none' ? h('vxe-tooltip', {
          class: 'vxe-table--valid-error',
          props: validConfig.message === 'tooltip' || tableData.length === 1 ? Object.assign({}, validStore, tooltipConfig) : null,
          ref: 'validTip'
        }) : _e()
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
    clearAll () {
      this.clearScroll()
      this.clearSort()
      this.clearFilter()
      this.clearCurrentRow()
      this.clearCurrentColumn()
      this.clearSelection()
      this.clearRowExpand()
      this.clearTreeExpand()
      this.clearIndexChecked()
      this.clearHeaderChecked()
      this.clearChecked()
      this.clearSelected()
      this.clearActived()
      return this.$nextTick()
    },
    loadData (datas, notRefresh) {
      let { height, maxHeight, editStore, optimizeOpts, recalculate } = this
      let { scrollY } = optimizeOpts
      let tableFullData = datas || []
      let scrollYLoad = scrollY && scrollY.gt && scrollY.gt < tableFullData.length
      editStore.insertList = []
      editStore.removeList = []
      // 原始数据
      this.tableSourceData = XEUtils.clone(tableFullData, true)
      // 全量数据
      this.tableFullData = tableFullData
      this.scrollYLoad = scrollYLoad
      if (scrollYLoad && !(height || maxHeight)) {
        throw new Error('[vxe-table] The height/max-height must be set for the scroll load.')
      }
      this.tableData = this.getTableData(true).tableData
      this.cacheDataMap()
      this.reserveCheckSelection()
      this.checkSelectionStatus()
      let rest = this.$nextTick()
      if (!notRefresh) {
        rest = rest.then(recalculate)
      }
      return rest
    },
    reloadData (datas) {
      this.clearAll()
      return this.loadData(datas).then(this.handleDefaultExpand)
    },
    loadColumn (columns) {
      let collectColumn = XEUtils.mapTree(columns, column => Cell.createColumn(this, column), this.headerProps)
      this.collectColumn = collectColumn
      this.tableFullColumn = UtilTools.getColumnList(collectColumn)
      if (this.customs) {
        this.mergeCustomColumn(this.customs)
      }
      this.cacheColumnMap()
      this.refreshColumn()
      return this.$nextTick()
    },
    reloadColumn (columns) {
      this.clearAll()
      return this.loadColumn(columns)
    },
    // 更新数据的 Map
    cacheDataMap () {
      let { treeConfig, tableFullData, fullDataIndexMap, fullDataRowIdMap } = this
      fullDataIndexMap.clear()
      fullDataRowIdMap.clear()
      if (treeConfig) {
        let rowKey = UtilTools.getRowKey(this)
        XEUtils.eachTree(tableFullData, (row, index) => {
          fullDataRowIdMap.set('' + XEUtils.get(row, rowKey), { rowKey, row, index })
        }, treeConfig)
      } else {
        tableFullData.forEach((row, rowIndex) => {
          fullDataRowIdMap.set(UtilTools.getRowId(this, row, rowIndex), { row, index: rowIndex })
          fullDataIndexMap.set(row, { row, index: rowIndex })
        })
      }
    },
    // 更新列的 Map
    cacheColumnMap () {
      let { tableFullColumn, fullColumnIdMap, fullColumnIndexMap } = this
      fullColumnIdMap.clear()
      fullColumnIndexMap.clear()
      tableFullColumn.forEach((column, index) => {
        fullColumnIdMap.set(column.id, column)
        fullColumnIndexMap.set(column, { column, index })
      })
    },
    getRowMapIndex (row) {
      return this.fullDataIndexMap.has(row) ? this.fullDataIndexMap.get(row).index : -1
    },
    getRowIndex (row) {
      let { tableFullData, treeConfig } = this
      return treeConfig ? XEUtils.findTree(tableFullData, item => item === row, treeConfig) : this.getRowMapIndex(row)
    },
    getColumnMapIndex (column) {
      return this.fullColumnIndexMap.has(column) ? this.fullColumnIndexMap.get(column).index : -1
    },
    getColumnIndex (column) {
      return this.getColumnMapIndex(column)
    },
    insert (records) {
      return this.insertAt(records)
    },
    /**
     * 从指定行插入数据
     */
    insertAt (records, row) {
      let { tableData, editStore, defineProperty, scrollYLoad, tableFullData } = this
      if (!XEUtils.isArray(records)) {
        records = [records]
      }
      let newRecords = records.map(record => defineProperty(record))
      return new Promise(resolve => {
        if (arguments.length === 1) {
          tableData.unshift.apply(tableData, newRecords)
          if (scrollYLoad) {
            tableFullData.unshift.apply(tableFullData, newRecords)
            this.updateAfterFullData()
          }
        } else {
          if (scrollYLoad) {
            throw new Error('[vxe-table] Virtual scroller does not support this operation.')
          }
          if (row === -1) {
            tableData.push.apply(tableData, newRecords)
          } else {
            let rowIndex = tableData.indexOf(row)
            tableData.splice.apply(tableData, [rowIndex, 0].concat(newRecords))
          }
        }
        [].unshift.apply(editStore.insertList, newRecords)
        this.checkSelectionStatus()
        this.$nextTick(() => {
          this.recalculate()
          resolve({ row: newRecords.length ? newRecords[newRecords.length - 1] : null, rows: newRecords })
        })
      })
    },
    defineProperty (record) {
      let recordItem = Object.assign({}, record)
      let rowKey = UtilTools.getRowKey(this)
      this.visibleColumn.forEach(column => {
        if (column.property && !XEUtils.has(recordItem, column.property)) {
          XEUtils.set(recordItem, column.property, null)
        }
        // 如果设置了 Key 就必须要唯一，可以自行设置；如果为空，则默认生成一个随机数
        if (rowKey && !XEUtils.get(recordItem, rowKey)) {
          XEUtils.set(recordItem, rowKey, ++rowUniqueId + Date.now())
        }
      })
      return recordItem
    },
    /**
     * 删除指定行数据
     * 如果传 row 则删除一行
     * 如果传 rows 则删除多行
     */
    remove (rows) {
      let { tableData, tableFullData, editStore, treeConfig, selectConfig = {}, selection, hasRowInsert } = this
      let { removeList, insertList } = editStore
      let { checkField: property } = selectConfig
      let rest = []
      this._isUpdateData = true
      if (rows) {
        if (!XEUtils.isArray(rows)) {
          rows = [rows]
        }
        if (treeConfig) {
          rows.forEach(row => {
            let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeConfig)
            if (matchObj) {
              let { item, items, index } = matchObj
              // 如果是新增，则保存记录
              if (!hasRowInsert(item)) {
                removeList.push(item)
              }
              // 从树节点中移除
              let restRow = items.splice(index, 1)[0]
              // 如果绑定了多选属性，则更新状态
              if (!property) {
                XEUtils.remove(selection, row => rows.indexOf(row) > -1)
              }
              rest.push(restRow)
            }
          })
        } else {
          // 如果是新增，则保存记录
          rows.forEach(row => {
            if (!hasRowInsert(row)) {
              removeList.push(row)
            }
          })
          // 从数据源中移除
          rest = XEUtils.remove(tableFullData, row => rows.indexOf(row) > -1)
          // 如果绑定了多选属性，则更新状态
          if (!property) {
            XEUtils.remove(selection, row => rows.indexOf(row) > -1)
          }
          // 从列表中移除
          XEUtils.remove(tableData, row => rows.indexOf(row) > -1)
        }
        XEUtils.remove(insertList, row => rows.indexOf(row) > -1)
      }
      this.checkSelectionStatus()
      return this.$nextTick().then(() => {
        this.recalculate()
        return { row: rows && rows.length ? rows[rows.length - 1] : null, rows: rest }
      })
    },
    /**
     * 删除选中数据
     */
    removeSelecteds () {
      return this.remove(this.getSelectRecords()).then(params => {
        this.clearSelection()
        return params
      })
    },
    /**
     * 还原数据
     * 如果不传任何参数，则还原整个表格
     * 如果传 row 则还原一行
     * 如果传 rows 则还原多行
     * 如果还额外传了 field 则还原指定单元格
     */
    revert (rows, field) {
      let { tableSourceData, tableFullData } = this
      if (arguments.length) {
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        rows.forEach(row => {
          let rowIndex = tableFullData.indexOf(row)
          let oRow = tableSourceData[rowIndex]
          if (oRow && row) {
            if (field) {
              XEUtils.set(row, field, XEUtils.get(oRow, field))
            } else {
              XEUtils.destructuring(row, oRow)
            }
          }
        })
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
     */
    clearData (rows, field) {
      let { tableSourceData, visibleColumn } = this
      if (!arguments.length) {
        rows = tableSourceData
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
    hasRowInsert (row) {
      let { treeConfig, tableSourceData } = this
      if (treeConfig) {
        return XEUtils.findTree(tableSourceData, item => item === row, treeConfig)
      }
      return this.getRowMapIndex(row) === -1
    },
    hasRowChange (row, field) {
      let { tableSourceData, treeConfig, fullDataIndexMap } = this
      let oRow
      if (!fullDataIndexMap.has(row)) {
        return false
      }
      let rowKey = UtilTools.getRowKey(this)
      if (rowKey) {
        let rowId = XEUtils.get(row, rowKey)
        if (treeConfig) {
          let children = treeConfig.children
          let matchObj = XEUtils.findTree(tableSourceData, row => rowId === XEUtils.get(row, rowKey), treeConfig)
          row = Object.assign({}, row, { [children]: null })
          if (matchObj) {
            oRow = Object.assign({}, matchObj.item, { [children]: null })
          }
        } else {
          let oRowIndex = this.fullDataRowIdMap.get(`${rowId}`).index
          oRow = tableSourceData[oRowIndex]
        }
      } else {
        let oRowIndex = this.getRowMapIndex(row)
        oRow = tableSourceData[oRowIndex]
      }
      if (arguments.length > 1) {
        return oRow && !XEUtils.isEqual(XEUtils.get(oRow, field), XEUtils.get(row, field))
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
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      }
    },
    /**
     * 获取新增数据
     */
    getInsertRecords () {
      return this.editStore.insertList
    },
    /**
     * 获取删除数据
     */
    getRemoveRecords () {
      return this.editStore.removeList
    },
    /**
     * 获取选中数据
     */
    getSelectRecords () {
      let { tableFullData, editStore, treeConfig, selectConfig = {}, selection } = this
      let { checkField: property } = selectConfig
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
     * 获取更新数据
     * 只精准匹配 row 的更改
     * 如果是树表格，子节点更改状态不会影响父节点的更新状态
     */
    getUpdateRecords () {
      let { tableFullData, hasRowChange, treeConfig } = this
      if (treeConfig) {
        return XEUtils.filterTree(tableFullData, row => hasRowChange(row))
      }
      return tableFullData.filter(row => hasRowChange(row))
    },
    /**
     * 获取处理后全量的表格数据
     * 如果存在筛选条件，继续处理
     */
    updateAfterFullData () {
      let { visibleColumn, tableFullData, remoteFilter } = this
      let column = this.visibleColumn.find(column => column.order)
      let tableData = tableFullData
      let filterColumn = visibleColumn.filter(({ filters }) => filters && filters.length)
      tableData = tableData.filter(row => {
        return filterColumn.every(column => {
          let { property, filters, filterMethod, filterRender } = column
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
      this.$nextTick(this.recalculate)
    },
    /**
     * 动态列处理
     */
    mergeCustomColumn (customColumns) {
      this.isUpdateCustoms = true
      this.tableFullColumn.forEach(column => {
        let item = customColumns.find(item => column.property && (item.field || item.prop) === column.property)
        column.visible = item ? !!item.visible : true
      })
      this.$emit('update:customs', this.tableFullColumn)
    },
    /**
     * 初始化加载动态列
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
      let rightIndex = 0
      let centerList = []
      let rightList = []
      let { headerProps, collectColumn, tableFullColumn, isGroup, columnStore, scrollXStore, optimizeOpts } = this
      let { scrollX } = optimizeOpts
      // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏
      if (isGroup) {
        XEUtils.eachTree(collectColumn, column => {
          if (column.children && column.children.length) {
            column.visible = !!XEUtils.findTree(column.children, subColumn => subColumn.children && subColumn.children.length ? 0 : subColumn.visible, headerProps)
          }
        }, headerProps)
      }
      // 重新分配列
      tableFullColumn.filter(column => column.visible).forEach((column, columnIndex) => {
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
          adaptive: XEUtils.isBoolean(scrollX.adaptive) ? scrollX.adaptive : true,
          renderSize: scrollX.rSize,
          offsetSize: scrollX.oSize
        })
        visibleColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize)
      }
      this.scrollXLoad = scrollXLoad
      this.tableColumn = visibleColumn
      // 需要计算两次，解决隐藏列首次被显示无宽度造成闪动问题
      return this.$nextTick().then(this.recalculate).then(this.recalculate)
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
      let { tableBody, tableHeader, tableFooter } = this.$refs
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
            this.computeScrollLoad()
          })
        }
      }
      return this.$nextTick().then(this.computeScrollLoad)
    },
    // 列宽计算
    autoCellWidth (headerElem, bodyElem, footerElem, bodyWidth) {
      let meanWidth
      let tableWidth = 0
      let minCellWidth = 40 // 列宽最少限制 40px
      let remainWidth = bodyWidth
      let { $el, fit, columnStore } = this
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
      let scrollYWidth = bodyElem.offsetWidth - bodyWidth
      this.scrollYWidth = scrollYWidth
      this.overflowY = scrollYWidth > 0
      this.tableWidth = tableWidth
      this.tableHeight = tableHeight
      this.parentHeight = $el.parentNode.clientHeight
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
    updateStyle () {
      let {
        $refs,
        fullColumnIdMap,
        maxHeight,
        height,
        parentHeight,
        border,
        // loading,
        // tableData,
        tableColumn,
        headerHeight,
        showHeaderOverflow: allColumnHeaderOverflow,
        showFooter,
        showOverflow: allColumnOverflow,
        footerHeight,
        tableHeight,
        tableWidth,
        overflowY,
        // overflowX,
        scrollXHeight,
        scrollYWidth,
        // scrollXStore,
        scrollXLoad,
        // scrollYStore,
        // scrollYLoad,
        columnStore,
        elemStore
      } = this
      let containerList = ['main', 'left', 'right']
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
              tableElem.style.width = tWidth === null ? tWidth : `${tWidth + scrollYWidth}px`
              // tableElem.style.marginLeft = fixedType ? null : `${scrollXStore.leftSpaceWidth}px`
            }

            let repairElem = elemStore[`${name}-${layout}-repair`]
            if (repairElem) {
              repairElem.style.width = `${tableWidth}px`
            }

            let listElem = elemStore[`${name}-${layout}-list`]
            if (listElem) {
              XEUtils.arrayEach(listElem.querySelectorAll(`.col--gutter`), thElem => {
                thElem.style.width = `${scrollYWidth}px`
              })
            }
          } else if (layout === 'body') {
            let customHeight = height === 'auto' ? parentHeight : XEUtils.toNumber(height)
            if (wrapperElem) {
              if (customHeight > 0) {
                wrapperElem.style.height = `${fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollXHeight) : customHeight - headerHeight - footerHeight}px`
              } else if (maxHeight) {
                maxHeight = XEUtils.toNumber(maxHeight)
                wrapperElem.style.maxHeight = `${fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollXHeight) : maxHeight - headerHeight}px`
              }
            }

            // 如果是固定列
            if (fixedWrapperElem) {
              let isRightFixed = fixedType === 'right'
              let fixedColumn = columnStore[`${fixedType}List`]
              fixedWrapperElem.style.height = `${(customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollXHeight * (showFooter ? 2 : 1)}px`
              fixedWrapperElem.style.width = `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, isRightFixed ? scrollYWidth : 0)}px`
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
              // tableElem.style.marginLeft = fixedType ? null : `${scrollXStore.leftSpaceWidth}px`
              // 兼容火狐滚动条
              if (overflowY && fixedType && browse['-moz']) {
                tableElem.style.paddingRight = `${scrollYWidth}px`
              }
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
              wrapperElem.style.marginTop = `${-scrollXHeight - 1}px`
            }
            if (tableElem) {
              tableElem.style.width = tWidth === null ? tWidth : `${tWidth + scrollYWidth}px`
              // tableElem.style.marginLeft = fixedType ? null : `${scrollXStore.leftSpaceWidth}px`
            }
          }
          let colgroupElem = elemStore[`${name}-${layout}-colgroup`]
          if (colgroupElem) {
            XEUtils.arrayEach(colgroupElem.children, colElem => {
              let colId = colElem.getAttribute('name')
              let column = fullColumnIdMap.get(colId)
              if (colId === 'col-gutter') {
                colElem.width = `${scrollYWidth || ''}`
              }
              if (column) {
                colElem.width = `${column.renderWidth || ''}`
                if (layout === 'header') {
                  let {
                    // columnKey,
                    showHeaderOverflow,
                    // headerAlign,
                    renderWidth
                  } = column
                  // let isGroup = column.children && column.children.length
                  // let fixedHiddenColumn = fixedType && column.fixed !== fixedType && !isGroup
                  let headOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
                  let showEllipsis = headOverflow === 'ellipsis'
                  let showTitle = headOverflow === 'title'
                  let showTooltip = headOverflow === true || headOverflow === 'tooltip'
                  let hasEllipsis = showTitle || showTooltip || showEllipsis

                  let listElem = elemStore[`${name}-${layout}-list`]
                  if (listElem && hasEllipsis) {
                    XEUtils.arrayEach(listElem.querySelectorAll(`.${column.id}`), thElem => {
                      let cellElem = thElem.querySelector('.vxe-cell')
                      if (cellElem) {
                        cellElem.style.width = `${border ? renderWidth - 1 : renderWidth}px`
                      }
                    })
                  }
                } else if (layout === 'body') {
                  // 表主体样式处理

                  let {
                    // editRender,
                    // align,
                    showOverflow,
                    renderWidth
                    // columnKey
                  } = column
                  // let fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX
                  let cellOverflow = XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow) ? allColumnOverflow : showOverflow
                  let showEllipsis = cellOverflow === 'ellipsis'
                  let showTitle = cellOverflow === 'title'
                  let showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
                  let hasEllipsis = showTitle || showTooltip || showEllipsis

                  let listElem = elemStore[`${name}-${layout}-list`]
                  if (listElem && hasEllipsis) {
                    XEUtils.arrayEach(listElem.querySelectorAll(`.${column.id}`), tdElem => {
                      let cellElem = tdElem.querySelector('.vxe-cell')
                      if (cellElem) {
                        cellElem.style.width = `${border ? renderWidth - 1 : renderWidth}px`
                      }
                    })
                  }
                }
                // else if (layout === 'footer') {

                // }
              }
            })
          }
        })
      })
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
    preventEvent (evnt, type, args, callback) {
      let evntList = Interceptor.get(type)
      if (!evntList.some(func => func(args, evnt, this) === false)) {
        callback()
      }
    },
    /**
     * 全局按下事件处理
     */
    handleGlobalMousedownEvent (evnt) {
      let { $refs, editStore, ctxMenuStore, editConfig = {}, filterStore } = this
      let { actived } = editStore
      let { filterWrapper, validTip } = $refs
      if (filterWrapper) {
        if (this.getEventTargetNode(evnt, this.$el, 'vxe-filter-wrapper').flag) {
          // 如果点击了筛选按钮
        } else if (this.getEventTargetNode(evnt, filterWrapper.$el).flag) {
          // 如果点击筛选容器
        } else {
          this.preventEvent(evnt, 'event.clear_filter', filterStore.args, this.closeFilter)
        }
      }
      // 如果已激活了编辑状态
      if (actived.row) {
        if (!(editConfig.autoClear === false)) {
          if (validTip && this.getEventTargetNode(evnt, validTip.$el).flag) {
            // 如果是激活状态，且点击了校验提示框
          } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
            this.preventEvent(evnt, 'event.clear_actived', actived.args, () => {
              let isClear
              let isReadonlyCol = !this.getEventTargetNode(evnt, this.$el, 'col--edit').flag
              // row 方式
              if (editConfig.mode === 'row') {
                let rowNode = this.getEventTargetNode(evnt, this.$el, 'vxe-body--row')
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
                !this.getEventTargetNode(evnt, this.$el).flag
              ) {
                // this.triggerValidate('blur').then(a => {
                setTimeout(this.clearActived)
                // }).catch(e => e)
              }
            })
          }
        }
      }
      // 如果配置了快捷菜单且，点击了其他地方则关闭
      if (ctxMenuStore.visible && this.$refs.ctxWrapper && !this.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
        this.closeMenu()
      }
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
        this.closeMenu()
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
      } else if (isEnter && (keyboardConfig.isArrow || keyboardConfig.isTab) && (selected.row || actived.row)) {
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
      } else if (operArrow && keyboardConfig.isArrow) {
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
        if (keyboardConfig.isDel && (selected.row || selected.column)) {
          UtilTools.setCellValue(selected.row, selected.column, null)
          if (isBack) {
            this.handleActived(selected.args, evnt)
          }
        }
      } else if (keyboardConfig.isCut && isCtrlKey && (isX || isC || isV)) {
        // 如果开启复制功能
        if (isX || isC) {
          this.handleCopyed(isX, evnt)
        } else {
          // this.handlePaste(evnt)
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
    },
    // 处理 Tab 键移动
    moveTabSelected (args, evnt) {
      let { tableData, visibleColumn, editConfig } = this
      let nextRow
      let nextRowIndex
      let nextColumn
      let nextColumnIndex
      let params = Object.assign({}, args)
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
        } else {
          params.rowIndex = rowIndex
        }
        params.columnIndex = nextColumnIndex
        params.column = nextColumn
        params.cell = DomTools.getCell(this, params)
        if (editConfig) {
          if (editConfig.trigger === 'click') {
            this.handleActived(params, evnt)
          } else if (editConfig.trigger === 'dblclick') {
            this.handleSelected(params, evnt)
          }
        }
      }
    },
    // 处理方向键移动
    moveSelected (args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      let { tableData, visibleColumn, handleSelected } = this
      let params = Object.assign({}, args)
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
      params.cell = DomTools.getCell(this, params)
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
      let { isCtxMenu, ctxMenuStore } = this
      if (isCtxMenu) {
        if (ctxMenuStore.visible) {
          if (ctxMenuStore.visible && this.$refs.ctxWrapper && this.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
            evnt.preventDefault()
            return
          }
        }
        // 右键头部
        let headeWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--header-wrapper')
        if (headeWrapperNode.flag) {
          this.openContextMenu(evnt, 'header', { })
          return
        }
        // 右键内容
        let bodyWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--body-wrapper')
        if (bodyWrapperNode.flag) {
          this.openContextMenu(evnt, 'body', { })
          return
        }
        // 右键表尾
        let footerWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--footer-wrapper')
        if (footerWrapperNode.flag) {
          this.openContextMenu(evnt, 'footer', { })
          return
        }
      }
      this.closeMenu()
      this.closeFilter()
    },
    /**
     * 显示快捷菜单
     */
    openContextMenu (evnt, type, params) {
      let { tableData, visibleColumn, ctxMenuStore, ctxMenuConfig, fullDataRowIdMap, tableFullColumn } = this
      let config = ctxMenuConfig[type]
      if (config) {
        let { options, visibleMethod, disabled } = config
        if (disabled) {
          evnt.preventDefault()
        } else if (options && options.length) {
          if (!visibleMethod || visibleMethod(params, evnt)) {
            evnt.preventDefault()
            let { scrollTop, scrollLeft, visibleHeight, visibleWidth } = DomTools.getDomNode()
            let { targetElem, flag } = this.getEventTargetNode(evnt, this.$el, `vxe-${type}--column`)
            let args = { type, $table: this }
            if (flag) {
              let { rowId, rowIndex, colIndex, columnIndex } = DomTools.getCellIndexs(targetElem)
              let column = colIndex ? tableFullColumn[colIndex] : visibleColumn[columnIndex]
              if (type === 'body') {
                let { row } = rowId ? fullDataRowIdMap.get(rowId) : tableData[rowIndex]
                args.row = row
                args.rowIndex = rowIndex
              }
              Object.assign(args, { column, columnIndex, cell: targetElem })
            }
            let top = evnt.clientY + scrollTop
            let left = evnt.clientX + scrollLeft
            Object.assign(ctxMenuStore, {
              args,
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
            this.closeMenu()
          }
        }
      }
      this.closeFilter()
    },
    /**
     * 关闭快捷菜单
     */
    closeMenu () {
      Object.assign(this.ctxMenuStore, {
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
      if (!menu.disabled && (!menu.children || !menu.children.length)) {
        UtilTools.emitEvent(this, 'context-menu-click', [Object.assign({ menu }, this.ctxMenuStore.args), evnt])
        this.closeMenu()
      }
    },
    /**
     * 触发表头 tooltip 事件
     */
    triggerHeaderTooltipEvent (evnt, { column }) {
      let { tooltipStore } = this
      let { own } = column
      if (tooltipStore.column !== column || !tooltipStore.visible) {
        this.showTooltip(evnt, own.title || own.label, column)
      }
    },
    /**
     * 触发 tooltip 事件
     */
    triggerTooltipEvent (evnt, params) {
      let { editConfig, editStore, tooltipStore } = this
      let { actived } = editStore
      let { row, column } = params
      if (editConfig) {
        if ((editConfig.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {
          return
        }
      }
      if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
        this.showTooltip(evnt, UtilTools.getCellLabel(row, column, params), column, row)
      }
    },
    // 显示 tooltip
    showTooltip (evnt, content, column, row) {
      let cell = evnt.currentTarget
      let tooltip = this.$refs.tooltip
      let wrapperElem = cell.children[0]
      if (content && wrapperElem.scrollWidth > wrapperElem.clientWidth) {
        Object.assign(this.tooltipStore, {
          row,
          column,
          // content: UtilTools.formatText(content),
          visible: true
        })
        if (tooltip) {
          tooltip.toVisible(cell, UtilTools.formatText(content))
        }
      }
      return this.$nextTick()
    },
    // 关闭 tooltip
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
    handleDefaultRowChecked () {
      let { selectConfig = {}, tableFullData } = this
      let { checkAll, checkRowKeys } = selectConfig
      let rowKey = UtilTools.getRowKey(this)
      if (checkAll) {
        this.setAllSelection(true)
      } else if (checkRowKeys) {
        let property = rowKey
        if (!property) {
          throw new Error('[vxe-table] Checked rows must have a unique primary key.')
        }
        this.setSelection(checkRowKeys.map(checkKey => tableFullData.find(item => checkKey === item[property])), true)
      }
    },
    setSelection (rows, value) {
      if (rows && !XEUtils.isArray(rows)) {
        rows = [rows]
      }
      rows.forEach(row => this.triggerCheckRowEvent(null, { row }, !!value))
      return this.$nextTick()
    },
    /**
     * 多选，行选中事件
     * value 选中true 不选false 不确定-1
     */
    triggerCheckRowEvent (evnt, { row }, value) {
      let { selection, tableFullData, selectConfig = {}, treeConfig, treeIndeterminates } = this
      let { checkField: property, checkMethod } = selectConfig
      if (!checkMethod || checkMethod({ row, rowIndex: tableFullData.indexOf(row) })) {
        if (property) {
          if (treeConfig) {
            if (value === -1) {
              treeIndeterminates.push(row)
              XEUtils.set(row, property, false)
            } else {
              // 更新子节点状态
              XEUtils.eachTree([row], item => XEUtils.set(item, property, value), treeConfig)
              XEUtils.remove(treeIndeterminates, item => item === row)
            }
            // 如果存在父节点，更新父节点状态
            let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeConfig)
            if (matchObj && matchObj.parent) {
              let selectItems = matchObj.items.filter(item => XEUtils.get(item, property))
              return this.triggerCheckRowEvent(evnt, { row: matchObj.parent }, selectItems.length === matchObj.items.length ? true : (selectItems.length || value === -1 ? -1 : false))
            }
          } else {
            XEUtils.set(row, property, value)
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
            if (matchObj && matchObj.parent) {
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
        UtilTools.emitEvent(this, 'select-change', [{ row, selection: this.getSelectRecords(), checked: value }, evnt])
      }
    },
    checkSelectionStatus () {
      let { tableFullData, editStore, selectConfig = {}, selection, treeIndeterminates } = this
      let { checkField: property, checkMethod } = selectConfig
      let { insertList } = editStore
      // 包含新增的数据
      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList)
      }
      if (property) {
        this.isAllSelected = tableFullData.length && tableFullData.every(
          checkMethod
            ? (row, rowIndex) => !checkMethod({ row, rowIndex }) || XEUtils.get(row, property)
            : row => XEUtils.get(row, property)
        )
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(row => XEUtils.get(row, property) || treeIndeterminates.indexOf(row) > -1)
      } else {
        this.isAllSelected = tableFullData.length && tableFullData.every(
          checkMethod
            ? (row, rowIndex) => !checkMethod({ row, rowIndex }) || selection.indexOf(row) > -1
            : row => selection.indexOf(row) > -1
        )
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(row => treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1)
      }
    },
    // 保留选中状态
    reserveCheckSelection () {
      let { selectConfig = {}, selection, fullDataRowIdMap } = this
      let { reserve } = selectConfig
      let rowKey = UtilTools.getRowKey(this)
      if (reserve && selection.length) {
        this.selection = selection.map(row => {
          let rowId = '' + XEUtils.get(row, rowKey)
          return fullDataRowIdMap.has(rowId) ? fullDataRowIdMap.get(rowId).row : row
        })
      }
    },
    /**
     * 多选，切换某一行的选中状态
     */
    toggleRowSelection (row) {
      let { selectConfig = {}, selection } = this
      let { checkField: property } = selectConfig
      this.triggerCheckRowEvent(arguments[1], { row }, property ? !XEUtils.get(row, property) : selection.indexOf(row) === -1)
      return this.$nextTick()
    },
    setAllSelection (value) {
      let { tableFullData, editStore, selectConfig = {}, treeConfig, selection } = this
      let { checkField: property, reserve, checkMethod } = selectConfig
      let { insertList } = editStore
      let selectRows = []
      // 包含新增的数据
      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList)
      }
      if (property) {
        let updateValue = (row, rowIndex) => {
          if (!checkMethod || checkMethod({ row, rowIndex })) {
            XEUtils.set(row, property, value)
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
                selectRows.push(row)
              }
            }, treeConfig)
          } else {
            if (checkMethod) {
              selectRows = tableFullData.filter((row, rowIndex) => checkMethod({ row, rowIndex }))
            } else {
              selectRows = tableFullData.slice(0)
            }
          }
        }
      }
      this.selection = value && reserve ? selection.concat(selectRows.filter(row => selection.indexOf(row) === -1)) : selectRows
      this.isAllSelected = value
      this.isIndeterminate = false
      this.treeIndeterminates = []
    },
    /**
     * 多选，选中所有事件
     */
    triggerCheckAllEvent (evnt, value) {
      this.setAllSelection(value)
      UtilTools.emitEvent(this, 'select-all', [{ selection: this.getSelectRecords(), checked: value }, evnt])
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
      let { checkField: property } = selectConfig
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
     * 单选，行选中事件
     */
    triggerRowEvent (evnt, { row }) {
      UtilTools.emitEvent(this, 'select-change', [{ row }, evnt])
      return this.setCurrentRow(row)
    },
    /**
     * 单选，设置某一行为选中状态，如果调不加参数，则会取消目前高亮行的选中状态
     */
    setCurrentRow (row) {
      let rowId = UtilTools.getRowId(this, row, this.getRowMapIndex(row))
      if (this.selectRow !== row) {
        this.clearCurrentRow()
      }
      this.clearCurrentColumn()
      this.selectRow = row
      if (this.highlightCurrentRow) {
        XEUtils.arrayEach(this.$el.querySelectorAll(`[data-rowid="${rowId}"]`), elem => DomTools.addClass(elem, 'row--current'))
      }
      return this.$nextTick()
    },
    clearCurrentRow () {
      this.selectRow = null
      this.hoverRow = null
      XEUtils.arrayEach(this.$el.querySelectorAll('.row--current'), elem => DomTools.removeClass(elem, 'row--current'))
      return this.$nextTick()
    },
    getCurrentRow () {
      return this.selectRow
    },
    /**
     * 行 hover 事件
     */
    triggerHoverEvent (evnt, { row, rowIndex }) {
      let { $el } = this
      let rowId = UtilTools.getRowId(this, row, rowIndex)
      this.clearHoverRow()
      XEUtils.arrayEach($el.querySelectorAll(`[data-rowid="${rowId}"]`), elem => DomTools.addClass(elem, 'row--hover'))
      this.hoverRow = row
    },
    clearHoverRow () {
      XEUtils.arrayEach(this.$el.querySelectorAll('.row--hover'), elem => DomTools.removeClass(elem, 'row--hover'))
    },
    /**
     * 表头按下事件
     */
    triggerHeaderCellMousedownEvent (evnt, params) {
      let { $el, mouseConfig = {}, elemStore, handleChecked, handleHeaderChecked, handleIndexChecked } = this
      let { button } = evnt
      let { column, cell } = params
      let isLeftBtn = button === 0
      let isIndex = column.type === 'index'
      if (isLeftBtn && mouseConfig.checked) {
        let headerList = elemStore['main-header-list'].children
        let bodyList = elemStore['main-body-list'].children
        if (isIndex) {
          let firstTrElem = bodyList[0]
          let lastTrElem = bodyList[bodyList.length - 1]
          let firstCell = firstTrElem.querySelector(`.${column.id}`)
          this.clearSelected()
          handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(cell.nextElementSibling), DomTools.getCellNodeIndex(cell.parentNode.lastElementChild)))
          handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(lastTrElem.querySelector(`.${column.id}`))))
          handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(lastTrElem.lastElementChild)))
        } else {
          evnt.preventDefault()
          evnt.stopPropagation()
          this.clearSelected()
          this.clearHeaderChecked()
          this.clearIndexChecked()
          // this.handleSelected(params, evnt)
          let domMousemove = document.onmousemove
          let domMouseup = document.onmouseup
          // let start = DomTools.getCellIndexs(cell)
          // let startCellNode = DomTools.getCellNodeIndex(cell)
          let startCell = bodyList[0].querySelector(`.${column.id}`)
          // let cellLastElementChild = cell.parentNode.lastElementChild
          let updateEvent = XEUtils.throttle(function (evnt) {
            evnt.preventDefault()
            let { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-header--column')
            if (!flag) {
              let a = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
              flag = a.flag
              targetElem = a.targetElem
            }
            if (flag && !DomTools.hasClass(targetElem, 'col--index')) {
              let colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem)
              let endCell = bodyList[bodyList.length - 1].children[colIndex]
              let head = headerList[0].children[colIndex]
              handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(head), DomTools.getCellNodeIndex(cell)))
              handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(startCell), DomTools.getCellNodeIndex(endCell)))
            }
          }, 80, { leading: true, trailing: true })
          document.onmousemove = updateEvent
          document.onmouseup = function (evnt) {
            document.onmousemove = domMousemove
            document.onmouseup = domMouseup
          }
          handleHeaderChecked([[cell]])
          if (bodyList.length) {
            let endCell = bodyList[bodyList.length - 1].querySelector(`.${column.id}`)
            this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(startCell), DomTools.getCellNodeIndex(endCell)))
          }
        }
        this.closeMenu()
      }
    },
    /**
     * 单元格按下事件
     */
    triggerCellMousedownEvent (evnt, params) {
      let {
        $el,
        tableData,
        visibleColumn,
        editStore,
        editConfig,
        handleSelected,
        mouseConfig = {},
        // handleOldChecked,
        handleChecked,
        handleIndexChecked,
        handleHeaderChecked,
        elemStore
      } = this
      let { checked, actived } = editStore
      let {
        row,
        column,
        cell
      } = params
      let { button } = evnt
      let isLeftBtn = button === 0
      // let isRightBtn = button === 2
      // if (isLeftBtn || isRightBtn) {
      // if (editConfig && editConfig.trigger === 'dblclick') {
      // 如果已经是激活状态
      if (!editConfig || (editConfig.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {

      } else {
        if (isLeftBtn && mouseConfig.checked) {
          evnt.preventDefault()
          evnt.stopPropagation()
          this.clearHeaderChecked()
          this.clearIndexChecked()
          let domMousemove = document.onmousemove
          let domMouseup = document.onmouseup
          // let start = DomTools.getCellIndexs(cell)
          let startCellNode = DomTools.getCellNodeIndex(cell)
          let isIndex = column.type === 'index'
          let bodyList = elemStore['main-body-list'].children
          let headerList = elemStore['main-header-list'].children
          let cellLastElementChild = cell.parentNode.lastElementChild
          let cellFirstElementChild = cell.parentNode.firstElementChild
          let colIndex = [].indexOf.call(cell.parentNode.children, cell)
          let headStart = headerList[0].children[colIndex]
          let updateEvent = XEUtils.throttle(function (evnt) {
            evnt.preventDefault()
            let { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
            if (flag) {
              if (isIndex) {
                let firstCell = targetElem.parentNode.firstElementChild
                handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(cellLastElementChild)))
                handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cell)))
              } else {
                let firstCell = targetElem.parentNode.firstElementChild
                let colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem)
                let head = headerList[0].children[colIndex]
                handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(head), DomTools.getCellNodeIndex(headStart)))
                handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cellFirstElementChild)))
                handleChecked(DomTools.getRowNodes(bodyList, startCellNode, DomTools.getCellNodeIndex(targetElem)))
              }
            }
          }, 80, { leading: true, trailing: true })
          document.onmousemove = updateEvent
          document.onmouseup = function (evnt) {
            document.onmousemove = domMousemove
            document.onmouseup = domMouseup
          }
          if (isIndex) {
            let firstCell = cell.parentNode.firstElementChild
            this.clearSelected()
            handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(cellLastElementChild)))
            handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cell)))
          } else {
            this.handleSelected(params, evnt)
          }
          this.closeFilter()
          this.closeMenu()
        } else {
          // 如果不在所有选中的范围之内则重新选中
          let select = DomTools.getCellIndexs(cell)
          if (checked.rows.indexOf(tableData[select.rowIndex]) === -1 || checked.columns.indexOf(visibleColumn[select.columnIndex]) === -1) {
            handleSelected(params, evnt)
          }
        }
      }
      // }
      // }
    },
    /**
     * 边角事件
     */
    // triggerCornerMousedownEvent (params, evnt) {
    //   evnt.preventDefault()
    //   evnt.stopPropagation()
    //   let { $el, tableData, visibleColumn, editStore, editConfig, handleTempChecked } = this
    //   let { checked } = editStore
    //   let { button } = evnt
    //   let isLeftBtn = button === 0
    //   let isRightBtn = button === 2
    //   if (isLeftBtn || isRightBtn) {
    //     if (editConfig && checked.rows.length && editConfig.trigger === 'dblclick') {
    //       let domMousemove = document.onmousemove
    //       let domMouseup = document.onmouseup
    //       let start = {
    //         rowIndex: tableData.indexOf(checked.rows[0]),
    //         columnIndex: visibleColumn.indexOf(checked.columns[0])
    //       }
    //       let updateEvent = XEUtils.throttle(function (evnt) {
    //         evnt.preventDefault()
    //         let { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
    //         if (flag) {
    //           handleTempChecked(start, DomTools.getCellIndexs(targetElem), evnt)
    //         }
    //       }, browse.msie ? 80 : 40, { leading: true, trailing: true })
    //       document.onmousemove = updateEvent
    //       document.onmouseup = function (evnt) {
    //         document.onmousemove = domMousemove
    //         document.onmouseup = domMouseup
    //         checked.rows = checked.tRows
    //         checked.columns = checked.tColumns
    //       }
    //     }
    //   }
    // },
    triggerHeaderCellClickEvent (evnt, params) {
      // let { elemStore, mouseConfig = {} } = this
      let { column } = params
      UtilTools.emitEvent(this, 'header-cell-click', [params, evnt])
      // if (mouseConfig.checked && column.type !== 'index') {
      //   let trList = elemStore['main-body-list'].children
      //   this.handleHeaderChecked([evnt.currentTarget])
      //   if (trList.length) {
      //     let startCell = trList[0].querySelector(`.${column.id}`)
      //     let endCell = trList[trList.length - 1].querySelector(`.${column.id}`)
      //     return this.handleChecked(DomTools.getRowNodes(trList, DomTools.getCellNodeIndex(startCell), DomTools.getCellNodeIndex(endCell)))
      //   }
      // }
      if (this.highlightCurrentColumn) {
        return this.setCurrentColumn(column, true)
      }
      return this.$nextTick()
    },
    setCurrentColumn (column) {
      // if (this.highlightCurrentColumn) {
      this.clearCurrentRow()
      if (this.selectColumn !== column) {
        this.clearCurrentColumn()
      }
      this.selectColumn = column
      XEUtils.arrayEach(this.$el.querySelectorAll(`.${column.id}`), elem => DomTools.addClass(elem, 'col--current'))
      // }
      return this.$nextTick()
    },
    clearCurrentColumn () {
      this.selectColumn = null
      XEUtils.arrayEach(this.$el.querySelectorAll('.col--current'), elem => DomTools.removeClass(elem, 'col--current'))
      return this.$nextTick()
    },
    /**
     * 列点击事件
     * 如果是单击模式，则激活为编辑状态
     * 如果是双击模式，则单击后选中状态
     */
    triggerCellClickEvent (evnt, params) {
      let { $el, highlightCurrentRow, editStore, selectConfig, treeConfig, editConfig } = this
      let { actived } = editStore
      let { column, columnIndex } = params
      // if (mouseConfig.checked) {
      //   let trList = elemStore['main-body-list'].children
      //   this.clearHeaderChecked()
      //   if (column.type === 'index') {
      //     this.handleChecked(DomTools.getRowNodes(trList, DomTools.getCellNodeIndex(cell.nextElementSibling), DomTools.getCellNodeIndex(cell.parentNode.lastElementChild)))
      //     DomTools.addClass(cell, 'col--checked')
      //   } else {
      //     this.handleChecked([[cell]])
      //   }
      // }
      if (highlightCurrentRow) {
        if (!this.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag && !this.getEventTargetNode(evnt, $el, 'vxe-checkbox').flag) {
          this.setCurrentRow(params.row)
        }
      }
      // 如果是多选
      if (selectConfig && (selectConfig.trigger === 'row' || (column.type === 'selection' && selectConfig.trigger === 'cell')) && !this.getEventTargetNode(evnt, params.cell, 'vxe-checkbox').flag) {
        this.toggleRowSelection(params.row, evnt)
      }
      // 如果是树形表格
      if (treeConfig && (treeConfig.trigger === 'row' || (column.treeNode && treeConfig.trigger === 'cell'))) {
        this.triggerTreeExpandEvent(evnt, params)
      }
      if (editConfig) {
        if (editConfig.trigger === 'click') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            // if (editRules) {
            //   this.handleActived(params, evnt)
            // } else {
            // this.triggerValidate('change').then(() => {
            //   this.handleActived(params, evnt)
            // }).catch(e => e)
            // }
            if (editConfig.mode === 'row') {
              // if (validStore.visible && validStore.row === params.row && validStore.column === params.column) {
              //   this.handleActived(params, evnt)
              // } else {
              this.triggerValidate('blur').then(() => {

              }).catch(e => e).then(() => {
                this.handleActived(params, evnt)
                  .then(() => this.triggerValidate('change'))
                  .catch(e => e)
              })
              // }
            } else if (editConfig.mode === 'cell') {
              this.handleActived(params, evnt)
                .then(() => this.triggerValidate('change'))
                .catch(e => e)
            }
          }
        } else {
          if (actived.row) {
            column.model.update = false
            column.model.value = UtilTools.getCellValue(actived.row, column)
            actived.column = actived.args.column = column
            actived.columnIndex = actived.args.columnIndex = columnIndex
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
            // this.triggerValidate().then(() => {
            this.handleActived(params, evnt)
            // }).catch(e => e)
          }
        }
      }
      UtilTools.emitEvent(this, 'cell-dblclick', [params, evnt])
    },
    /**
     * 处理激活编辑
     */
    handleActived (params, evnt) {
      let { editStore, editConfig, tableColumn } = this
      let { activeMethod } = editConfig
      let { actived } = editStore
      let { row, column, cell } = params
      let { model, editRender } = column
      if (editRender) {
        let isRowMode = editConfig.mode === 'row'
        if (isRowMode ? actived.row !== row : (actived.row !== row || actived.column !== column)) {
          // 判断是否禁用编辑
          let type = 'edit-disabled'
          if (!activeMethod || activeMethod(params)) {
            this.clostTooltip()
            this.clearCopyed(evnt)
            this.clearChecked()
            // this.clearIndexChecked()
            // this.clearHeaderChecked()
            this.clearSelected(evnt)
            this.clearActived(evnt)
            type = 'edit-actived'
            column.renderHeight = cell.offsetHeight
            actived.args = params
            actived.row = row
            actived.column = column
            // let listElem = elemStore['main-body-list']
            // XEUtils.arrayEach(listElem.querySelectorAll('.col--actived'), elem => {
            //   DomTools.removeClass(elem, 'col--actived')
            // })
            // let rowId = UtilTools.getRowId(this, row, this.getRowMapIndex(row))
            // let trElem = listElem.querySelector(`[data-rowid="${rowId}"]`)
            if (isRowMode) {
              tableColumn.forEach(column => {
                if (column.editRender) {
                  // let tdElem = trElem.querySelector(`.${column.id}`)
                  column.model.value = UtilTools.getCellValue(row, column)
                  column.model.update = false
                  // DomTools.addClass(tdElem, 'col--actived')
                }
              })
            } else {
              // DomTools.addClass(cell, 'col--actived')
              model.value = UtilTools.getCellValue(row, column)
              model.update = false
            }
            this.$nextTick(() => {
              this.handleFocus(params, evnt)
            })
          }
          UtilTools.emitEvent(this, type, [params, evnt])
        } else {
          let { column: oldColumn } = actived
          if (oldColumn !== column) {
            let { model: oldModel } = oldColumn
            if (oldModel.update) {
              UtilTools.setCellValue(row, oldColumn, oldModel.value)
            }
            this.clearValidate()
          }
          column.renderHeight = cell.offsetHeight
          actived.args = params
          actived.column = column
          setTimeout(() => {
            this.handleFocus(params, evnt)
          })
        }
      }
      return this.$nextTick()
    },
    /**
     * 清除激活的编辑
     */
    clearActived (evnt) {
      let {
        editStore
        // elemStore
      } = this
      let { actived } = editStore
      let { args, row, column } = actived
      if (row || column) {
        let { model } = column
        if (model.update) {
          UtilTools.setCellValue(row, column, model.value)
          model.update = false
          model.value = null
        }
        UtilTools.emitEvent(this, 'edit-closed', [args, evnt])
      }
      actived.args = null
      actived.row = null
      actived.column = null
      // let listElem = elemStore['main-body-list']
      // XEUtils.arrayEach(listElem.querySelectorAll('.col--actived'), elem => {
      //   DomTools.removeClass(elem, 'col--actived')
      // })
      return this.clearValidate().then(this.recalculate)
    },
    getActiveRow () {
      let { $el, editStore, tableData } = this
      let { args, row } = editStore.actived
      if (args && tableData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
        return Object.assign({}, args)
      }
      return null
    },
    hasActiveRow (row) {
      return this.editStore.actived.row === row
    },
    /**
     * 清除所选中源状态
     */
    clearSelected (evnt) {
      let { editStore, elemStore } = this
      let { selected } = editStore
      selected.row = null
      selected.column = null
      let headerElem = elemStore['main-header-list']
      let bodyElem = elemStore['main-body-list']
      XEUtils.arrayEach(headerElem.querySelectorAll('.col--title-selected'), elem => DomTools.removeClass(elem, 'col--title-selected'))
      XEUtils.arrayEach([bodyElem.querySelector('.col--selected')], elem => DomTools.removeClass(elem, 'col--selected'))
      return this.$nextTick()
    },
    /**
     * 处理选中源
     */
    handleSelected (params, evnt) {
      let {
        mouseConfig = {},
        editStore,
        elemStore
      } = this
      let { selected } = editStore
      let { row, column, cell } = params
      let selectMethod = () => {
        if (selected.row !== row || selected.column !== column) {
          this.clearChecked(evnt)
          this.clearIndexChecked()
          this.clearHeaderChecked()
          this.clearSelected()
          this.clearActived(evnt)
          selected.args = params
          selected.row = row
          selected.column = column
          let listElem = elemStore['main-body-list']
          let rowId = UtilTools.getRowId(this, row, this.getRowMapIndex(row))
          let trElem = listElem.querySelector(`[data-rowid="${rowId}"]`)
          let tdElem = trElem.querySelector(`.${column.id}`)
          DomTools.addClass(tdElem, 'col--selected')
        }
        // 如果配置了批量选中功能，则为批量选中状态
        if (mouseConfig.checked) {
          let headerElem = elemStore['main-header-list']
          this.handleHeaderChecked([[headerElem.querySelector(`.${column.id}`)]])
          this.handleIndexChecked([[cell.parentNode.querySelector('.col--index')]])
        //   let select = DomTools.getCellIndexs(params.cell)
        //   this.handleOldChecked(select, select, evnt)
        }
        return this.$nextTick()
      }
      // return editRules ? this.triggerValidate('blur').then(selectMethod).catch(e => e) : selectMethod()
      return selectMethod()
    },
    /**
     * 清除所有选中状态
     */
    clearChecked (evnt) {
      let { editStore, elemStore } = this
      let { checked } = editStore
      let bodyElem = elemStore['main-body-list']
      checked.rows = []
      checked.columns = []
      checked.tRows = []
      checked.tColumns = []
      XEUtils.arrayEach(bodyElem.querySelectorAll('.col--checked'), elem => DomTools.removeClass(elem, 'col--checked'))
      return this.$nextTick()
    },
    /**
     * 处理所有选中
     */
    // handleOldChecked (start, end, evnt) {
    //   let { tableData, visibleColumn, editStore, elemStore } = this
    //   let { checked } = editStore
    //   let { rowIndex: sRowIndex, columnIndex: sColumnIndex } = start
    //   let { rowIndex: eRowIndex, columnIndex: eColumnIndex } = end
    //   checked.tRows = []
    //   checked.tColumns = []
    //   if (sRowIndex < eRowIndex) {
    //     // 向下
    //     checked.rows = tableData.slice(sRowIndex, eRowIndex + 1)
    //   } else {
    //     // 向上
    //     checked.rows = tableData.slice(eRowIndex, sRowIndex + 1)
    //   }
    //   if (sColumnIndex < eColumnIndex) {
    //     // 向右
    //     checked.columns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1)
    //   } else {
    //     // 向左
    //     checked.columns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex + 1)
    //   }
    //   let listElem = elemStore['main-body-list']
    //   XEUtils.arrayEach(listElem.querySelectorAll('.col--checked'), tdElem => {
    //     DomTools.removeClass(tdElem, 'col--checked')
    //   })
    //   checked.rows.forEach(row => {
    //     let rowId = UtilTools.getRowId(this, row, this.getRowMapIndex(row))
    //     let trElem = listElem.querySelector(`[data-rowid="${rowId}"]`)
    //     checked.columns.forEach(column => {
    //       let tdElem = trElem.querySelector(`.${column.id}`)
    //       DomTools.addClass(tdElem, 'col--checked')
    //     })
    //   })
    // },
    handleChecked (rowNodes) {
      let { checked } = this.editStore
      this.clearChecked()
      rowNodes.forEach((rows, rowIndex) => {
        let isTop = rowIndex === 0
        let isBottom = rowIndex === rowNodes.length - 1
        rows.forEach((elem, colIndex) => {
          let isLeft = colIndex === 0
          let isRight = colIndex === rows.length - 1
          DomTools.addClass(elem, 'col--checked')
          if (isTop) {
            DomTools.addClass(elem, 'col--checked-top')
          }
          if (isBottom) {
            DomTools.addClass(elem, 'col--checked-bottom')
          }
          if (isLeft) {
            DomTools.addClass(elem, 'col--checked-left')
          }
          if (isRight) {
            DomTools.addClass(elem, 'col--checked-right')
          }
        })
      })
      checked.rowNodes = rowNodes
    },
    handleIndexChecked (rowNodes) {
      let { indexs } = this.editStore
      this.clearIndexChecked()
      rowNodes.forEach(rows => {
        rows.forEach(elem => {
          DomTools.addClass(elem, 'col--index-checked')
        })
      })
      indexs.rowNodes = rowNodes
    },
    clearIndexChecked () {
      let { elemStore } = this
      let bodyElem = elemStore['main-body-list']
      XEUtils.arrayEach(bodyElem.querySelectorAll('.col--index-checked'), elem => DomTools.removeClass(elem, 'col--index-checked'))
      return this.$nextTick()
    },
    handleHeaderChecked (rowNodes) {
      let { titles } = this.editStore
      this.clearHeaderChecked()
      rowNodes.forEach(rows => {
        rows.forEach(elem => {
          DomTools.addClass(elem, 'col--title-checked')
        })
      })
      titles.rowNodes = rowNodes
    },
    clearHeaderChecked () {
      let { elemStore } = this
      let headerElem = elemStore['main-header-list']
      XEUtils.arrayEach(headerElem.querySelectorAll('.col--title-checked'), elem => DomTools.removeClass(elem, 'col--title-checked'))
      return this.$nextTick()
    },
    /**
     * 处理所有选中的临时选中
     */
    // handleTempChecked (start, end, evnt) {
    //   let { tableData, visibleColumn, editStore } = this
    //   let { checked } = editStore
    //   let { rows, tRows, columns, tColumns } = checked
    //   let { rowIndex: sRowIndex, columnIndex: sColumnIndex } = start
    //   let { rowIndex: eRowIndex, columnIndex: eColumnIndex } = end
    //   if (tRows.length > rows.length) {
    //     eColumnIndex = visibleColumn.indexOf(columns[columns.length - 1])
    //   } else if (tColumns.length > columns.length) {
    //     eRowIndex = tableData.indexOf(rows[rows.length - 1])
    //   }
    //   if (sRowIndex < eRowIndex) {
    //     // 向下
    //     checked.tRows = tableData.slice(sRowIndex, eRowIndex + 1)
    //   } else {
    //     // 向上
    //     sRowIndex += rows.length
    //     checked.tRows = tableData.slice(eRowIndex, sRowIndex)
    //   }
    //   if (sColumnIndex < eColumnIndex) {
    //     // 向右
    //     checked.tColumns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1)
    //   } else {
    //     // 向左
    //     sColumnIndex += columns.length
    //     checked.tColumns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex)
    //   }
    // },
    /**
     * 清空已复制的内容
     */
    clearCopyed () {
      let { editStore, elemStore } = this
      let { copyed } = editStore
      let bodyElem = elemStore['main-body-list']
      copyed.cut = false
      copyed.rows = []
      copyed.columns = []
      XEUtils.arrayEach(bodyElem.querySelectorAll('.col--copyed'), elem => DomTools.removeClass(elem, 'col--copyed'))
      return this.$nextTick()
    },
    /**
     * 处理复制
     */
    handleCopyed (cut, evnt) {
      let { editStore } = this
      let { copyed, checked } = editStore
      let rowNodes = checked.rowNodes
      this.clearCopyed()
      rowNodes.forEach((rows, rowIndex) => {
        let isTop = rowIndex === 0
        let isBottom = rowIndex === rowNodes.length - 1
        rows.forEach((elem, colIndex) => {
          let isLeft = colIndex === 0
          let isRight = colIndex === rows.length - 1
          DomTools.addClass(elem, 'col--copyed')
          if (isTop) {
            DomTools.addClass(elem, 'col--copyed-top')
          }
          if (isBottom) {
            DomTools.addClass(elem, 'col--copyed-bottom')
          }
          if (isLeft) {
            DomTools.addClass(elem, 'col--copyed-left')
          }
          if (isRight) {
            DomTools.addClass(elem, 'col--copyed-right')
          }
        })
      })
      copyed.cut = cut
      copyed.rows = checked.rows
      copyed.columns = checked.columns
      copyed.rowNodes = rowNodes
    },
    /**
     * 处理粘贴
     */
    // handlePaste (evnt) {
    //   let { tableData, visibleColumn, editStore } = this
    //   let { copyed, selected } = editStore
    //   let { cut, rows, columns } = copyed
    //   if (rows.length && columns.length && selected.row && selected.column) {
    //     let { rowIndex, columnIndex } = selected.args
    //     // let start = { rowIndex, columnIndex }
    //     // let end = {
    //     //   rowIndex: rowIndex + rows.length - 1,
    //     //   columnIndex: columnIndex + columns.length - 1
    //     // }
    //     rows.forEach((row, rIndex) => {
    //       let offsetRow = tableData[rowIndex + rIndex]
    //       if (offsetRow) {
    //         columns.forEach((column, cIndex) => {
    //           let offsetColumn = visibleColumn[columnIndex + cIndex]
    //           if (offsetColumn) {
    //             UtilTools.setCellValue(offsetRow, offsetColumn, UtilTools.getCellValue(row, column))
    //           }
    //           if (cut) {
    //             UtilTools.setCellValue(row, column, null)
    //           }
    //         })
    //       }
    //     })
    //     if (cut) {
    //       this.clearCopyed()
    //     }
    //     // this.handleOldChecked(start, end, evnt)
    //   }
    // },
    /**
     * 处理聚焦
     */
    handleFocus (params, evnt) {
      let { column, cell } = params
      let { editRender } = column
      if (editRender) {
        let compRender = Renderer.get(editRender.name)
        let { autofocus, autoselect } = editRender
        let inputElem
        // 如果指定了聚焦 class
        if (autofocus) {
          inputElem = cell.querySelector(autofocus)
        }
        // 渲染器的聚焦处理
        if (!inputElem && compRender && compRender.autofocus) {
          inputElem = cell.querySelector(compRender.autofocus)
        }
        if (inputElem) {
          inputElem[autoselect ? 'select' : 'focus']()
        }
      }
    },
    /**
     * 激活行编辑
     */
    setActiveRow (row) {
      return this.setActiveCell(row, this.visibleColumn.find(column => column.editRender).property)
    },
    /**
     * 激活单元格编辑
     */
    setActiveCell (row, field) {
      return new Promise(resolve => {
        setTimeout(() => {
          let { tableData, visibleColumn, handleActived } = this
          if (row && field) {
            let rowIndex = tableData.indexOf(row)
            if (rowIndex > -1) {
              let column = visibleColumn.find(column => column.property === field)
              let cell = DomTools.getCell(this, { row, rowIndex, column })
              handleActived({ row, column, cell })
              this.lastCallTime = Date.now()
            }
          }
          resolve(this.$nextTick())
        })
      })
    },
    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    setSelectCell (row, field) {
      let { tableData, editConfig, visibleColumn } = this
      if (row && field && editConfig.trigger !== 'manual') {
        let column = visibleColumn.find(column => column.property === field)
        let rowIndex = tableData.indexOf(row)
        if (rowIndex > -1 && column) {
          let cell = DomTools.getCell(this, { row, rowIndex, column })
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
    sort (field, order) {
      let { visibleColumn, tableFullColumn, remoteSort } = this
      let column = visibleColumn.find(item => item.property === field)
      let isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort
      if (order && column.order !== order) {
        tableFullColumn.forEach(column => {
          column.order = null
        })
        column.order = order
        // 如果是服务端排序，则跳过本地排序处理
        if (!isRemote) {
          this.tableData = this.getTableData(true).tableData
        }
        UtilTools.emitEvent(this, 'sort-change', [{ column, prop: field, field, order }])
      }
      return this.$nextTick().then(this.updateStyle)
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
        let filterWrapper = $refs.filterWrapper
        let { top, left } = DomTools.getOffsetPos(targetElem)
        if (overflowX) {
          left -= bodyElem.scrollLeft
        }
        Object.assign(filterStore, {
          args: params,
          multiple: column.filterMultiple,
          options: column.filters,
          column: column,
          style: {
            zIndex: GlobalConfig.tooltip.zIndex,
            top: `${top + targetElem.clientHeight + 6}px`,
            left: `${left}px`
          },
          visible: true
        })
        filterStore.isAllSelected = filterStore.options.every(item => item.checked)
        filterStore.isIndeterminate = !this.isAllSelected && filterStore.options.some(item => item.checked)
        this.$nextTick(() => {
          let filterWrapperElem = filterWrapper.$el
          filterStore.style.top = `${top + targetElem.clientHeight + 6}px`
          filterStore.style.left = `${left - filterWrapperElem.clientWidth / 2 + 10}px`
        })
      }
    },
    // 确认筛选
    confirmFilterEvent (evnt) {
      let { visibleColumn, filterStore, remoteFilter, scrollXLoad, scrollYLoad } = this
      let { column } = filterStore
      let values = []
      column.filters.forEach(item => {
        if (item.checked) {
          values.push(item.value)
        }
      })
      filterStore.visible = false
      // 如果是服务端筛选，则跳过本地筛选处理
      if (!remoteFilter) {
        this.tableData = this.getTableData(true).tableData
      }
      let filterList = []
      visibleColumn.filter(column => {
        let { property, filters } = column
        let valueList = []
        if (filters && filters.length) {
          filters.forEach(item => {
            if (item.checked) {
              valueList.push(item.value)
            }
          })
          filterList.push({ column, field: property, prop: property, values: valueList })
        }
      })
      UtilTools.emitEvent(this, 'filter-change', [{ column, field: column.property, prop: column.property, values, filters: filterList }])
      if (scrollXLoad || scrollYLoad) {
        this.clearScroll()
      }
      this.closeFilter()
      this.$nextTick(this.recalculate)
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
        item.data = item._data
      })
      this.confirmFilterEvent(evnt)
    },
    clearFilter (force) {
      let { visibleColumn } = this
      visibleColumn.forEach(column => {
        let { filters } = column
        if (filters && filters.length) {
          filters.forEach(item => {
            item.checked = false
          })
        }
      })
      Object.assign(this.filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false
      })
      this.tableData = this.getTableData(true).tableData
      return this.$nextTick()
    },
    /**
     * 展开行事件
     */
    triggerRowExpandEvent (evnt, { row }) {
      let rest = this.toggleRowExpansion(row)
      UtilTools.emitEvent(this, 'toggle-expand-change', [{ row, rowIndex: this.getRowMapIndex(row), $table: this }, evnt])
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
      let { expandConfig = {}, tableFullData } = this
      let { expandAll, expandRowKeys } = expandConfig
      let rowKey = UtilTools.getRowKey(this)
      if (expandAll) {
        this.expandeds = tableFullData.slice(0)
      } else if (expandRowKeys) {
        let property = rowKey
        if (!property) {
          throw new Error('[vxe-table] Expand rows must have a unique primary key.')
        }
        this.expandeds = expandRowKeys.map(expandKey => tableFullData.find(item => expandKey === item[property]))
      }
    },
    setAllRowExpansion (expanded) {
      this.expandeds = expanded ? this.tableFullData.slice(0) : []
      return this.$nextTick()
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
          // 只能同时展开一个
          expandeds.length = 0
          rows = rows.slice(rows.length - 1, rows.length)
        }
        rows.forEach(row => {
          let index = expandeds.indexOf(row)
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
    hasRowExpand (row) {
      return this.expandeds.indexOf(row) > -1
    },
    clearRowExpand () {
      this.expandeds = []
      return this.$nextTick()
    },
    /**
     * 展开树节点事件
     */
    triggerTreeExpandEvent (evnt, { row }) {
      let { selectColumn } = this
      let rest = this.toggleTreeExpansion(row)
      UtilTools.emitEvent(this, 'toggle-tree-change', [{ row, rowIndex: this.getRowMapIndex(row), $table: this }, evnt])
      if (selectColumn) {
        this.$nextTick(() => this.setCurrentColumn(selectColumn))
      }
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
            if (rowChildren && rowChildren.length) {
              treeExpandeds.push(matchObj.item)
            }
          })
          this.treeExpandeds = treeExpandeds
        }
      }
    },
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
      return this.$nextTick()
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
      return this.$nextTick()
    },
    hasTreeExpand (row) {
      return this.treeExpandeds.indexOf(row) > -1
    },
    clearTreeExpand () {
      this.treeExpandeds = []
      return this.$nextTick()
    },
    /**
     * 是否启用了横向 X 可视渲染
     */
    isScrollXLoad () {
      return this.scrollXLoad
    },
    /**
     * 是否启用了纵向 Y 可视渲染
     */
    isScrollYLoad () {
      return this.scrollYLoad
    },
    /**
     * 横向 X 可视渲染事件处理
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
            // scrollBodyElem.scrollLeft = scrollLeft
            this.updateStyle()
          })
        }
      }
      this.clostTooltip()
    },
    /**
     * 纵向 Y 可视渲染事件处理
     */
    triggerScrollYEvent (evnt) {
      let { scrollYStore } = this
      // webkit 浏览器使用最佳的渲染方式
      if (isWebkit && scrollYStore.adaptive) {
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
            // scrollBodyElem.scrollTop = scrollTop
            this.updateStyle()
          })
        }
      }
    },
    // 计算可视渲染相关数据
    computeScrollLoad () {
      let { scrollXLoad, scrollYLoad, scrollYStore, scrollXStore, visibleColumn, optimizeOpts } = this
      let { scrollX, scrollY } = optimizeOpts
      let tableBody = this.$refs.tableBody
      let tableBodyElem = tableBody ? tableBody.$el : null
      let tableHeader = this.$refs.tableHeader
      if (tableBodyElem) {
        // 计算 X 逻辑
        if (scrollXLoad) {
        // 无法预知，默认取前 10 条平均宽度进行运算
          let visibleSize = scrollX.vSize || Math.ceil(tableBodyElem.clientWidth / (visibleColumn.slice(0, 10).reduce((previous, column) => previous + column.renderWidth, 0) / 10))
          scrollXStore.visibleSize = visibleSize
          if (scrollXStore.adaptive) {
            scrollXStore.offsetSize = visibleSize
            scrollXStore.renderSize = visibleSize + 2
          }
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
          let visibleSize = scrollY.vSize || Math.ceil(tableBodyElem.clientHeight / scrollYStore.rowHeight)
          scrollYStore.visibleSize = visibleSize
          if (isWebkit && scrollYStore.adaptive) {
            scrollYStore.offsetSize = visibleSize
            scrollYStore.renderSize = visibleSize + 2
          }
          this.updateScrollYSpace()
        }
      }
      this.$nextTick(this.updateStyle)
    },
    // 更新横向 X 可视渲染上下剩余空间大小
    updateScrollXSpace () {
      let { $refs, elemStore, visibleColumn, scrollXStore, tableWidth, scrollYWidth } = this
      let { tableHeader, tableBody, tableFooter } = $refs
      let headerElem = tableHeader ? tableHeader.$el.querySelector('.vxe-table--header') : null
      let bodyElem = tableBody.$el.querySelector('.vxe-table--body')
      let footerElem = tableFooter ? tableFooter.$el.querySelector('.vxe-table--footer') : null
      this.tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize)
      // scrollXStore.leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous, column) => previous + column.renderWidth, 0)
      // scrollXStore.rightSpaceWidth = visibleColumn.slice(scrollXStore.startIndex + scrollXStore.renderSize, visibleColumn.length).reduce((previous, column) => previous + column.renderWidth, 0)
      // scrollXStore.leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous, column) => previous + column.renderWidth, 0)
      let leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous, column) => previous + column.renderWidth, 0)
      if (headerElem) {
        headerElem.style.marginLeft = `${leftSpaceWidth}px`
      }
      bodyElem.style.marginLeft = `${leftSpaceWidth}px`
      if (footerElem) {
        footerElem.style.marginLeft = `${leftSpaceWidth}px`
      }
      let containerList = ['main']
      containerList.forEach(name => {
        let layoutList = ['header', 'body', 'footer']
        layoutList.forEach(layout => {
          let xSpaceElem = elemStore[`${name}-${layout}-xSpace`]
          if (xSpaceElem) {
            xSpaceElem.style.width = `${tableWidth + (layout === 'header' ? scrollYWidth : 0)}px`
          }
        })
      })
      // scrollXStore.rightSpaceWidth = visibleColumn.slice(scrollXStore.startIndex + scrollXStore.renderSize, visibleColumn.length).reduce((previous, column) => previous + column.renderWidth, 0)
    },
    // 更新纵向 Y 可视渲染上下剩余空间大小
    updateScrollYSpace () {
      let { elemStore, scrollYStore } = this
      let { fullData, tableData } = this.getTableData()
      this.tableData = tableData
      // scrollYStore.bodyHeight = fullData.length * scrollYStore.rowHeight
      let bodyHeight = fullData.length * scrollYStore.rowHeight
      // scrollYStore.topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0)
      let topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0)
      let containerList = ['main', 'left', 'right']
      containerList.forEach(name => {
        let layoutList = ['header', 'body', 'footer']
        let tableElem = elemStore[`${name}-body-table`]
        if (tableElem) {
          tableElem.style.marginTop = `${topSpaceHeight}px`
        }
        layoutList.forEach(layout => {
          let ySpaceElem = elemStore[`${name}-${layout}-ySpace`]
          if (ySpaceElem) {
            ySpaceElem.style.height = `${bodyHeight}px`
          }
        })
      })
      // scrollYStore.bottomSpaceHeight = Math.max((fullData.length - (scrollYStore.startIndex + scrollYStore.renderSize)) * scrollYStore.rowHeight, 0)
    },
    scrollTo (x, y) {
      let bodyElem = this.$refs.tableBody.$el
      if (XEUtils.isNumber(x)) {
        bodyElem.scrollLeft = x
      }
      if (XEUtils.isNumber(y)) {
        bodyElem.scrollTop = y
      }
    },
    scrollToRow (row) {
      let { scrollYLoad, scrollYStore, afterFullData, fullDataIndexMap, elemStore } = this
      let rowId = UtilTools.getRowId(this, row, this.getRowMapIndex(row))
      if (scrollYLoad) {
        if (row === -1 && afterFullData.length) {
          row = afterFullData[afterFullData.length - 1]
        }
        if (fullDataIndexMap.has(row)) {
          let { rowHeight } = scrollYStore
          let rowIndex = afterFullData.indexOf(row)
          this.scrollTo(null, (rowIndex - 1) * rowHeight)
        }
      } else {
        let bodyElem = elemStore['main-body-list']
        DomTools.scrollIntoElem(bodyElem.querySelector(`[data-rowid="${rowId}"]`))
      }
    },
    scrollToColumn (column) {
      let { scrollXLoad, elemStore, visibleColumn, fullColumnIndexMap } = this
      if (scrollXLoad) {
        if (column === -1 || fullColumnIndexMap.has(column)) {
          let scrollLeft = 0
          for (let index = 0; index < visibleColumn.length; index++) {
            if (visibleColumn[index] === column) {
              break
            }
            scrollLeft += visibleColumn[index].renderWidth
          }
          this.scrollTo(scrollLeft)
        }
      } else {
        let bodyElem = elemStore['main-body-list']
        DomTools.scrollIntoElem(bodyElem.querySelector(`.${column.id}`))
      }
    },
    clearScroll () {
      Object.assign(this.scrollXStore, {
        startIndex: 0
        // leftSpaceWidth: 0
        // rightSpaceWidth: 0
      })
      Object.assign(this.scrollYStore, {
        startIndex: 0
        // topSpaceHeight: 0
        // bottomSpaceHeight: 0
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
    triggerValidate (type) {
      let { editConfig, editStore, editRules, validStore } = this
      let { actived } = editStore
      // let type = validStore.visible ? 'all' : 'blur'
      // this.clearValidate()
      if (actived.row && editRules) {
        let { row, column, cell } = actived.args
        // if (editConfig.mode === 'row') {
        //   return this.validRowRules(type, row)
        //     .catch(params => {
        //       this.handleValidError(params)
        //       return Promise.reject(params)
        //     })
        // } else {
        if (this.hasCellRules(type, row, column)) {
          return this.validCellRules(type, row, column).then(() => {
            if (editConfig.mode === 'row') {
              if (validStore.visible && validStore.row === row && validStore.column === column) {
                this.clearValidate()
              }
            }
          }).catch(({ rule }) => {
            // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
            if (!rule.trigger || type === rule.trigger) {
              let rest = { rule, row, column, cell }
              this.showValidTooltip(rest)
              return Promise.reject(rest)
            }
            return Promise.resolve()
          })
        }

        // }
      }
      return Promise.resolve()
    },

    /**
     * 与 validate 一致行为，区别就是会校验所有并返回所有不通过的所有列
     */
    fullValidate (rows, cb) {
      return this.beginValidate(rows, cb, true)
    },
    /**
     * 对表格数据进行校验
     */
    validate (rows, cb) {
      return this.beginValidate(rows, cb)
    },
    /**
     * 对表格数据进行校验
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    beginValidate (rows, cb, isAll) {
      let validRest = {}
      let status = true
      let { editRules, tableData, tableFullData, scrollYLoad, scrollYStore } = this
      let vaildDatas = scrollYLoad ? tableFullData : tableData
      if (rows) {
        if (XEUtils.isFunction(rows)) {
          cb = rows
        } else {
          vaildDatas = XEUtils.isArray(rows) ? rows : [rows]
        }
      }
      let rowValids = []
      this.lastCallTime = Date.now()
      this.clearValidate()
      if (editRules) {
        let columns = this.getColumns()
        vaildDatas.forEach(row => {
          let rowIndex = tableData.indexOf(row)
          let colVailds = []
          columns.forEach((column, columnIndex) => {
            if (XEUtils.has(editRules, column.property)) {
              colVailds.push(
                new Promise((resolve, reject) => {
                  this.validCellRules('all', row, column)
                    .then(resolve)
                    .catch(({ rule, rules }) => {
                      let rest = { rule, rules, rowIndex, row, columnIndex, column }
                      if (isAll) {
                        if (!validRest[column.property]) {
                          validRest[column.property] = []
                        }
                        validRest[column.property].push(rest)
                        return resolve()
                      }
                      return reject(rest)
                    })
                })
              )
            }
          })
          rowValids.push(Promise.all(colVailds))
        })
        return Promise.all(rowValids).then(() => {
          let ruleProps = Object.keys(validRest)
          if (ruleProps.length) {
            return Promise.reject(validRest[ruleProps[0]][0])
          }
          if (cb) {
            cb(status)
          }
        }).catch(params => {
          let args = isAll ? validRest : { [params.column.property]: params }
          return new Promise((resolve, reject) => {
            let { row } = params
            let finish = () => {
              params.cell = DomTools.getCell(this, params)
              this.handleValidError(params)
              if (cb) {
                status = false
                resolve(cb(status, args))
              } else {
                reject(args)
              }
            }
            if (scrollYLoad) {
              let { startIndex, renderSize, rowHeight } = scrollYStore
              let rowIndex = this.getRowMapIndex(row)
              if (rowIndex === -1) {
                rowIndex = tableFullData.indexOf(row)
              }
              if (rowIndex < startIndex || rowIndex > startIndex + renderSize) {
                let bodyElem = this.$refs.tableBody.$el
                bodyElem.scrollTop = (rowIndex - 1) * rowHeight
                return setTimeout(finish, debounceScrollYDuration * 2)
              }
            }
            finish()
          })
        })
      } else {
        if (cb) {
          cb(status)
        }
      }
      return Promise.resolve(true)
    },
    // validRowRules (type, row) {
    //   let { tableData, editRules } = this
    //   let rowIndex = tableData.indexOf(row)
    //   let validPromise = Promise.resolve()
    //   if (editRules) {
    //     this.getColumns().forEach(column => {
    //       if (XEUtils.has(editRules, column.property)) {
    //         validPromise = validPromise.then(() => new Promise((resolve, reject) => {
    //           this.validCellRules('all', row, column)
    //             .then(resolve)
    //             .catch(rule => {
    //               let rest = { rule, row, column, cell: DomTools.getCell(this, { row, rowIndex, column }) }
    //               return reject(rest)
    //             })
    //         }))
    //       }
    //     })
    //   }
    //   return validPromise
    // },
    hasCellRules (type, row, column) {
      let { editRules } = this
      let { property } = column
      if (property && editRules) {
        let rules = XEUtils.get(editRules, property)
        return rules && rules.find(rule => type === 'all' || !rule.trigger || type === rule.trigger)
      }
      return false
    },
    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者Promise，结果返回一个 Boolean 值
     * 如果是传回调方式这返回一个 Boolean 值和校验不通过列的错误消息
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function(rule, value, callback, {rules, row, column, rowIndex, columnIndex}) 自定义校验
     *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
     */
    validCellRules (type, row, column, cellValue) {
      let { editRules } = this
      let { property } = column
      let errorRules = []
      let cellVailds = []
      if (property && editRules) {
        let rules = XEUtils.get(editRules, property)
        let value = XEUtils.isUndefined(cellValue) ? XEUtils.get(row, property) : cellValue
        if (rules) {
          rules.forEach(rule => {
            cellVailds.push(
              new Promise(resolve => {
                let isRequired = rule.required === true
                if (type === 'all' || !rule.trigger || type === rule.trigger) {
                  if (XEUtils.isFunction(rule.validator)) {
                    rule.validator(rule, value, e => {
                      if (XEUtils.isError(e)) {
                        let cusRule = { type: 'custom', trigger: rule.trigger, message: e.message, rule }
                        errorRules.push(cusRule)
                      }
                      return resolve()
                    }, { rules, row, column, rowIndex: this.getRowMapIndex(row), columnIndex: this.getColumnMapIndex(column) })
                  } else {
                    let len
                    let restVal = value
                    let isNumber = rule.type === 'number'
                    let isEmpty = value === null || value === undefined || value === ''
                    if (isNumber) {
                      restVal = XEUtils.toNumber(value)
                    } else {
                      len = XEUtils.getSize(restVal)
                    }
                    if (isRequired && isEmpty) {
                      errorRules.push(rule)
                    } else if (
                      (isNumber && isNaN(value)) ||
                      (XEUtils.isRegExp(rule.pattern) && !rule.pattern.test(value)) ||
                      (XEUtils.isNumber(rule.min) && (isNumber ? restVal < rule.min : len < rule.min)) ||
                      (XEUtils.isNumber(rule.max) && (isNumber ? restVal > rule.max : len > rule.max))
                    ) {
                      errorRules.push(rule)
                    }
                    resolve()
                  }
                } else {
                  resolve()
                }
              })
            )
          })
        }
      }
      return Promise.all(cellVailds).then(() => {
        if (errorRules.length) {
          let rest = { rules: errorRules, rule: errorRules[0] }
          return Promise.reject(rest)
        }
      })
    },
    clearValidate () {
      let validTip = this.$refs.validTip
      Object.assign(this.validStore, {
        visible: false,
        row: null,
        column: null,
        content: '',
        rule: null
      })
      if (validTip && validTip.visible) {
        validTip.close()
      }
      return this.$nextTick()
    },
    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    handleValidError (params) {
      this.handleActived(params, { type: 'valid-error', trigger: 'call' })
        .then(() => this.showValidTooltip(params))
    },
    /**
     * 弹出校验错误提示
     */
    showValidTooltip (params) {
      let { $refs, tableData, validConfig = {} } = this
      let validTip = $refs.validTip
      let { rule, row, column, cell } = params
      let content = UtilTools.formatText(rule.message)
      this.$nextTick(() => {
        Object.assign(this.validStore, {
          row,
          column,
          rule,
          content,
          visible: true
        })
        if (validTip && (validConfig.message === 'tooltip' || tableData.length === 1)) {
          validTip.toVisible(cell, content)
        }
        UtilTools.emitEvent(this, 'valid-error', [params])
      })
    },
    /**
     * 导出 csv 文件
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了可视渲染，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     */
    exportCsv (options) {
      let { visibleColumn, scrollXLoad, scrollYLoad, treeConfig } = this
      let opts = Object.assign({
        filename: 'table.csv',
        original: !!treeConfig,
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
      if (treeConfig) {
        oData = XEUtils.toTreeArray(oData, treeConfig)
      }
      return ExportTools.downloadCsc(opts, ExportTools.getCsvContent(opts, oData, columns, this.$el))
    },

    /*************************
     * Publish methods
     *************************/
    // 检查触发源是否属于目标节点
    getEventTargetNode: DomTools.getEventTargetNode
    /*************************
     * Publish methods
     *************************/
  }
}
