import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import Cell from '../../cell'
import { Interceptor, Renderer } from '../../v-x-e-table'
import { UtilTools, DomTools, ExportTools, ResizeEvent, GlobalEvent } from '../../tools'

var rowUniqueId = 0
var browse = DomTools.browse
var isWebkit = browse['-webkit'] && !browse['-ms']
var debounceScrollYDuration = browse.msie ? 40 : 20

class Rule {
  constructor (rule) {
    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.min,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    })
  }
  get message () {
    return UtilTools.getFuncText(this.$options.message)
  }
}

function getRowUniqueId () {
  return `row_${++rowUniqueId}`
}

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
    vSize,
    showHeader,
    showFooter,
    columnStore,
    footerData
  } = $table
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

// 分组表头的属性
const headerProps = {
  children: 'children'
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
    // 所有的列对其方式
    align: { type: String, default: () => GlobalConfig.align },
    // 所有的表头列的对齐方式
    headerAlign: { type: String, default: () => GlobalConfig.headerAlign },
    // 是否显示表头
    showHeader: { type: Boolean, default: () => GlobalConfig.showHeader },
    // 只对 type=index 时有效，自定义序号的起始值
    startIndex: { type: Number, default: 0 },
    // 是否要高亮当前选中行
    highlightCurrentRow: { type: Boolean, default: () => GlobalConfig.highlightCurrentRow },
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: { type: Boolean, default: () => GlobalConfig.highlightHoverRow },
    // 是否要高亮当前选中列
    highlightCurrentColumn: { type: Boolean, default: () => GlobalConfig.highlightCurrentColumn },
    // 鼠标移到列是否要高亮显示
    highlightHoverColumn: { type: Boolean, default: () => GlobalConfig.highlightHoverColumn },
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
    // 是否服务端排序
    remoteSort: Boolean,

    /** 高级属性 */
    // 主键配置
    columnKey: Boolean,
    rowKey: Boolean,
    rowId: { type: String, default: () => GlobalConfig.rowId },
    // 是否自动根据父容器响应式调整表格宽高
    autoResize: Boolean,
    // 排序配置项
    sortConfig: Object,
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
      scrollbarWidth: 0,
      // 横向滚动条的高度
      scrollbarHeight: 0,
      // 是否全选
      isAllSelected: false,
      // 多选属性，有选中且非全选状态
      isIndeterminate: false,
      // 多选属性，已选中的列
      selection: [],
      // 当前行
      currentRow: null,
      // 单选属性，选中行
      selectRow: null,
      // 表尾合计数据
      footerData: [],
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
    validOpts () {
      return Object.assign({ message: 'default' }, GlobalConfig.validConfig, this.validConfig)
    },
    optimizeOpts () {
      return Object.assign({}, GlobalConfig.optimization, this.optimization)
    },
    vaildTipOpts () {
      return Object.assign({ isArrow: false }, this.tooltipConfig)
    },
    sortOpts () {
      return Object.assign({}, GlobalConfig.sortConfig, this.sortConfig)
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
      return this.ctxMenuOpts.header && this.ctxMenuOpts.header.options ? this.ctxMenuOpts.header.options : []
    },
    bodyCtxMenu () {
      return this.ctxMenuOpts.body && this.ctxMenuOpts.body.options ? this.ctxMenuOpts.body.options : []
    },
    isCtxMenu () {
      return this.headerCtxMenu.length || this.bodyCtxMenu.length
    },
    ctxMenuOpts () {
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
    }
  },
  watch: {
    data (value) {
      if (!this._isUpdateData) {
        this.loadData(value, true).then(this.handleDefault)
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
      if (this.customs) {
        this.mergeCustomColumn(this.customs)
      }
      this.refreshColumn()
      this.tableData = this.getTableData(true).tableData
      if (this._toolbar) {
        this._toolbar.updateColumn(tableFullColumn)
      }
      // 在 v3.0 中废弃 prop、label
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
    let { scrollYStore, optimizeOpts, data, loading } = Object.assign(this, {
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
      // currentColumn: null,
      // 当前 hover 行
      // hoverRow: null,
      // 最后滚动位置
      lastScrollLeft: 0,
      lastScrollTop: 0,
      // 完整数据、条件处理后
      tableFullData: [],
      afterFullData: [],
      // 缓存数据集
      fullAllDataRowMap: new Map(),
      fullAllDataRowIdData: {},
      fullDataRowMap: new Map(),
      fullDataRowIdData: {},
      fullColumnMap: new Map(),
      fullColumnIdData: {}
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
    if (!UtilTools.getRowkey(this)) {
      console.error('[vxe-table] The property row-id is not allowed to be empty')
    }
    this.loadData(data, true).then(() => {
      this.handleDefault()
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
    this.scrollTo(this.lastScrollLeft, this.lastScrollTop)
  },
  beforeDestroy () {
    let tableWrapper = this.$refs.tableWrapper
    if (tableWrapper && tableWrapper.parentNode) {
      tableWrapper.parentNode.removeChild(tableWrapper)
    }
    if (ResizeEvent.off) {
      ResizeEvent.off(this, this.$el.parentNode)
    }
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
      height,
      highlightHoverRow,
      highlightHoverColumn,
      highlightCell,
      vSize,
      showOverflow,
      showHeaderOverflow,
      editConfig,
      validOpts,
      mouseConfig = {},
      editRules,
      showFooter,
      footerMethod,
      overflowX,
      overflowY,
      scrollbarHeight,
      optimizeOpts,
      vaildTipOpts,
      tooltipConfig,
      columnStore,
      filterStore,
      ctxMenuStore,
      footerData,
      hasTip
    } = this
    let { leftList, rightList } = columnStore
    return h('div', {
      class: {
        'vxe-table': 1,
        [`size--${vSize}`]: vSize,
        'vxe-editable': editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'scroll--y': overflowY,
        'scroll--x': overflowX,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        'all-overflow': showOverflow,
        'all-head-overflow': showHeaderOverflow,
        'c--highlight': highlightCell,
        't--animat': optimizeOpts.animat,
        't--stripe': stripe,
        't--border': border,
        't--checked': mouseConfig.checked,
        'is--loading': loading,
        'row--highlight': highlightHoverRow,
        'column--highlight': highlightHoverColumn
      }
    }, [
      /**
       * 隐藏列
       */
      h('div', {
        class: 'vxe-table-hidden-column',
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
          'padding-bottom': `${scrollbarHeight}px`
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
        class: `vxe-table${id}-wrapper ${this.$vnode.data.staticClass || ''}`,
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
          ref: 'tooltip',
          props: tooltipConfig
        }) : _e(),
        /**
         * valid error tooltip
         */
        hasTip && editRules && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip') ? h('vxe-tooltip', {
          class: 'vxe-table--valid-error',
          props: validOpts.message === 'tooltip' || tableData.length === 1 ? vaildTipOpts : null,
          ref: 'validTip'
        }) : _e()
      ])
    ])
  },
  methods: {
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
      this.clearCopyed()
      return this.clearActived()
    },
    refreshData () {
      return this.$nextTick().then(() => {
        this.tableData = []
        return this.$nextTick().then(() => this.loadData(this.tableFullData))
      })
    },
    updateData () {
      return this.handleData(true).then(this.recalculate)
    },
    handleData (force) {
      this.tableData = this.getTableData(force).tableData
      return this.$nextTick()
    },
    loadData (datas, notRefresh) {
      let { height, maxHeight, editStore, optimizeOpts, recalculate } = this
      let { scrollY } = optimizeOpts
      let tableFullData = datas ? datas.slice(0) : []
      let scrollYLoad = scrollY && scrollY.gt && scrollY.gt < tableFullData.length
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
        throw new Error('[vxe-table] The height/max-height must be set for the scroll load.')
      }
      this.handleData(true)
      this.reserveCheckSelection()
      this.checkSelectionStatus()
      let rest = this.$nextTick()
      if (!notRefresh) {
        rest = rest.then(recalculate)
      }
      return rest.then(() => {
        // 如果启用虚拟滚动，重新加载数据需要重置滚动条
        if (this.scrollXLoad || this.scrollYLoad) {
          this.clearScroll()
        }
      })
    },
    reloadData (datas) {
      this.clearAll()
      return this.loadData(datas).then(this.handleDefault)
    },
    loadColumn (columns) {
      this.collectColumn = XEUtils.mapTree(columns, column => Cell.createColumn(this, column), headerProps)
      return this.$nextTick()
    },
    reloadColumn (columns) {
      this.clearAll()
      return this.loadColumn(columns)
    },
    // 更新数据的 Map
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
    // 更新列的 Map
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
    getRowIndex (row) {
      return this.fullDataRowMap.has(row) ? this.fullDataRowMap.get(row).index : -1
    },
    getColumnIndex (column) {
      return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1
    },
    hasIndexColumn (column) {
      return column && column.type === 'index'
    },
    insert (records) {
      return this.insertAt(records)
    },
    /**
     * 从指定行插入数据
     */
    insertAt (records, row) {
      let { tableData, editStore, scrollYLoad, tableFullData, treeConfig, remoteSort } = this
      if (!XEUtils.isArray(records)) {
        records = [records]
      }
      let newRecords = records.map(record => this.defineField(Object.assign({}, record)))
      if (!row) {
        tableData.unshift.apply(tableData, newRecords)
        tableFullData.unshift.apply(tableFullData, newRecords)
      } else {
        if (row === -1) {
          tableData.push.apply(tableData, newRecords)
          tableFullData.push.apply(tableFullData, newRecords)
        } else {
          if (treeConfig) {
            throw new Error('[vxe-table] The tree table does not support this operation.')
          }
          tableData.splice.apply(tableData, [tableData.indexOf(row), 0].concat(newRecords))
          tableFullData.splice.apply(tableFullData, [tableFullData.indexOf(row), 0].concat(newRecords))
        }
      }
      [].unshift.apply(editStore.insertList, newRecords)
      if (scrollYLoad || !remoteSort) {
        this.updateData(true)
      }
      this.updateCache()
      this.checkSelectionStatus()
      return this.$nextTick().then(() => {
        this.recalculate()
        return {
          row: newRecords.length ? newRecords[newRecords.length - 1] : null,
          rows: newRecords
        }
      })
    },
    defineField (row) {
      let rowkey = UtilTools.getRowkey(this)
      this.visibleColumn.forEach(column => {
        if (column.property && !XEUtils.has(row, column.property)) {
          XEUtils.set(row, column.property, null)
        }
      })
      // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数
      if (!XEUtils.get(row, rowkey)) {
        XEUtils.set(row, rowkey, getRowUniqueId())
      }
      return row
    },
    createData (records) {
      return this.$nextTick().then(() => records.map(this.defineField))
    },
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
     * 删除指定行数据
     * 如果传 row 则删除一行
     * 如果传 rows 则删除多行
     */
    remove (rows) {
      let { tableData, tableFullData, editStore, treeConfig, selectConfig = {}, selection, hasRowInsert, scrollYLoad } = this
      let { removeList, insertList } = editStore
      let { checkField: property } = selectConfig
      let rest = []
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
      if (scrollYLoad) {
        this.updateData(true)
      }
      this.updateCache()
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
      let { tableSourceData, getRowIndex } = this
      if (arguments.length) {
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        rows.forEach(row => {
          let rowIndex = getRowIndex(row)
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
    hasRowInsert (row) {
      return this.editStore.insertList.indexOf(row) > -1
    },
    hasRowChange (row, field) {
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
     * 获取表格所有列
     */
    getColumns (columnIndex) {
      let columns = this.visibleColumn
      return arguments.length ? columns[columnIndex] : columns.slice(0)
    },
    getColumnById (colid) {
      let fullColumnIdData = this.fullColumnIdData
      return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null
    },
    getColumnByField (field) {
      return this.visibleColumn.find(column => column.property === field)
    },
    /**
     * 获取表格可视列
     */
    getTableColumn () {
      return { fullColumn: this.tableFullColumn.slice(0), visibleColumn: this.visibleColumn.slice(0), tableColumn: this.tableColumn.slice(0) }
    },
    // 在 v3.0 中废弃 getRecords
    getRecords () {
      console.warn('[vxe-table] The function getRecords is deprecated, please use getData')
      return this.getData.apply(this, arguments)
    },
    /**
     * 获取表格所有数据
     */
    getData (rowIndex) {
      let tableSynchData = this.data || this.tableSynchData
      return arguments.length ? tableSynchData[rowIndex] : tableSynchData.slice(0)
    },
    // 在 v3.0 中废弃 getAllRecords
    getAllRecords () {
      console.warn('[vxe-table] The function getAllRecords is deprecated, please use getRecordset')
      return this.getRecordset()
    },
    /**
     * 获取表格数据集
     */
    getRecordset () {
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
      let { tableFullData, editStore, treeConfig, selectConfig = {} } = this
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
     * 获取更新数据
     * 只精准匹配 row 的更改
     * 如果是树表格，子节点更改状态不会影响父节点的更新状态
     */
    getUpdateRecords () {
      let { tableFullData, hasRowChange, treeConfig } = this
      if (treeConfig) {
        return XEUtils.filterTree(tableFullData, row => hasRowChange(row), treeConfig)
      }
      return tableFullData.filter(row => hasRowChange(row))
    },
    /**
     * 获取处理后全量的表格数据
     * 如果存在筛选条件，继续处理
     */
    updateAfterFullData () {
      let { visibleColumn, tableFullData, remoteSort, remoteFilter } = this
      let column = visibleColumn.find(column => column.order)
      let tableData = tableFullData
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
          let rest = XEUtils.sortBy(tableData, column.property)
          tableData = column.order === 'desc' ? rest.reverse() : rest
        }
      }
      this.afterFullData = tableData
      return tableData
    },
    getRowById (rowid) {
      let fullDataRowIdData = this.fullDataRowIdData
      return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null
    },
    /**
     * 获取处理后的表格数据
     * 如果存在筛选条件，继续处理
     * 如果存在排序，继续处理
     */
    getTableData (force) {
      let { tableFullData, scrollYLoad, scrollYStore } = this
      let fullData = force ? this.updateAfterFullData() : this.afterFullData
      return { fullData: tableFullData.slice(0), visibleData: fullData, tableData: scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0) }
    },
    handleDefault () {
      if (this.selectConfig) {
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
      this.$nextTick(this.recalculate)
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
          let item = customColumns.find(item => column.property && (item.field || item.prop) === column.property)
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
    resetAll () {
      this.resetCustoms()
      this.resetResizable()
    },
    hideColumn (column) {
      return this.handleVisibleColumn(column, false)
    },
    showColumn (column) {
      return this.handleVisibleColumn(column, true)
    },
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
      if (this._toolbar) {
        this._toolbar.updateSetting()
      }
      return this.$nextTick()
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
      return this.$nextTick().then(() => {
        this.updateFooter()
        this.recalculate(true)
      })
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
    // 列宽计算
    autoCellWidth (headerElem, bodyElem, footerElem) {
      let meanWidth
      let tableWidth = 0
      let minCellWidth = 40 // 列宽最少限制 40px
      let bodyWidth = bodyElem.clientWidth
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
      this.parentHeight = $el.parentNode.clientHeight
      if (headerElem) {
        this.headerHeight = headerElem.offsetHeight
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
    resetResizable () {
      this.visibleColumn.forEach(column => {
        column.resizeWidth = 0
      })
      if (this._toolbar) {
        this._toolbar.resetResizable()
      }
      this.analyColumnWidth()
      return this.recalculate(true)
    },
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
        overflowY,
        scrollbarHeight,
        scrollbarWidth,
        scrollXLoad,
        columnStore,
        elemStore,
        currentRow
      } = this
      let containerList = ['main', 'left', 'right']
      let customHeight = height === 'auto' ? parentHeight : (DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : XEUtils.toNumber(height))
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
            }

            let repairElem = elemStore[`${name}-${layout}-repair`]
            if (repairElem) {
              repairElem.style.width = `${tableWidth}px`
            }

            let listElem = elemStore[`${name}-${layout}-list`]
            if (listElem) {
              XEUtils.arrayEach(listElem.querySelectorAll(`.col--gutter`), thElem => {
                thElem.style.width = `${scrollbarWidth}px`
              })
            }
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
              if (overflowY && fixedType && (browse['-moz'] || browse['safari'])) {
                tableElem.style.paddingRight = `${scrollbarWidth}px`
              }
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
                wrapperElem.style.top = `${customHeight ? customHeight - footerHeight : tableHeight + headerHeight}px`
              }
              wrapperElem.style.marginTop = `${-scrollbarHeight - 1}px`
            }
            if (tableElem) {
              tableElem.style.width = tWidth === null ? tWidth : `${tWidth + scrollbarWidth}px`
            }
          }
          let colgroupElem = elemStore[`${name}-${layout}-colgroup`]
          if (colgroupElem) {
            XEUtils.arrayEach(colgroupElem.children, colElem => {
              let colid = colElem.getAttribute('name')
              if (colid === 'col-gutter') {
                colElem.width = `${scrollbarWidth || ''}`
              }
              if (fullColumnIdData[colid]) {
                let column = fullColumnIdData[colid].column
                let { showHeaderOverflow, showOverflow, renderWidth } = column
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
                if (listElem && hasEllipsis) {
                  XEUtils.arrayEach(listElem.querySelectorAll(`.${column.id}`), thElem => {
                    let cellElem = thElem.querySelector('.vxe-cell')
                    if (cellElem) {
                      cellElem.style.width = `${border ? renderWidth - 1 : renderWidth}px`
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
      let { $el, $refs, editStore, ctxMenuStore, editConfig = {}, filterStore } = this
      let { actived } = editStore
      let { filterWrapper, validTip } = $refs
      if (filterWrapper) {
        if (this.getEventTargetNode(evnt, $el, 'vxe-filter-wrapper').flag) {
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
              let isReadonlyCol = !this.getEventTargetNode(evnt, $el, 'col--edit').flag
              // row 方式
              if (editConfig.mode === 'row') {
                let rowNode = this.getEventTargetNode(evnt, $el, 'vxe-body--row')
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
                !this.getEventTargetNode(evnt, $el).flag
              ) {
                setTimeout(() => this.clearActived(evnt))
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
            this.handleSelected(params, evnt)
          }
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
          this.moveTabSelected(selected.args, evnt)
        } else if (actived.row || actived.column) {
          this.moveTabSelected(actived.args, evnt)
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
    },
    // 处理 Tab 键移动
    moveTabSelected (args, evnt) {
      let { tableData, visibleColumn, editConfig, hasIndexColumn } = this
      let targetRow
      let targetRowIndex
      let targetColumn
      let targetColumnIndex
      let isShiftKey = evnt.shiftKey
      let params = Object.assign({}, args)
      let rowIndex = tableData.indexOf(params.row)
      let columnIndex = visibleColumn.indexOf(params.column)
      evnt.preventDefault()
      if (isShiftKey) {
        // 向左
        for (let len = columnIndex - 1; len >= 0; len--) {
          if (!hasIndexColumn(visibleColumn[len])) {
            targetColumnIndex = len
            targetColumn = visibleColumn[len]
            break
          }
        }
        if (!targetColumn && rowIndex > 0) {
          // 如果找不到从上一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex - 1
          targetRow = tableData[targetRowIndex]
          for (let len = visibleColumn.length - 1; len >= 0; len--) {
            if (!hasIndexColumn(visibleColumn[len])) {
              targetColumnIndex = len
              targetColumn = visibleColumn[len]
              break
            }
          }
        }
      } else {
        // 向右
        for (let index = columnIndex + 1; index < visibleColumn.length; index++) {
          if (!hasIndexColumn(visibleColumn[index])) {
            targetColumnIndex = index
            targetColumn = visibleColumn[index]
            break
          }
        }
        if (!targetColumn && rowIndex < tableData.length - 1) {
          // 如果找不到从下一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex + 1
          targetRow = tableData[targetRowIndex]
          for (let index = 0; index < visibleColumn.length; index++) {
            if (!hasIndexColumn(visibleColumn[index])) {
              targetColumnIndex = index
              targetColumn = visibleColumn[index]
              break
            }
          }
        }
      }
      if (targetColumn) {
        if (targetRow) {
          params.rowIndex = targetRowIndex
          params.row = targetRow
        } else {
          params.rowIndex = rowIndex
        }
        params.columnIndex = targetColumnIndex
        params.column = targetColumn
        params.cell = DomTools.getCell(this, params)
        if (editConfig) {
          if (editConfig.trigger === 'click' || editConfig.trigger === 'dblclick') {
            if (editConfig.mode === 'row') {
              this.handleActived(params, evnt)
            } else {
              this.handleSelected(params, evnt)
              this.scrollToRow(params.row, params.column)
            }
          }
        }
      }
    },
    // 处理当前行方向键移动
    moveCurrentRow (isUpArrow, isDwArrow, evnt) {
      let { currentRow, treeConfig, afterFullData } = this
      let targetRow
      evnt.preventDefault()
      if (treeConfig) {
        let { index, items } = XEUtils.findTree(afterFullData, item => item === currentRow, treeConfig)
        if (isUpArrow && index > 0) {
          targetRow = items[index - 1]
        } else if (isDwArrow && index < items.length - 1) {
          targetRow = items[index + 1]
        }
      } else {
        let rowIndex = afterFullData.indexOf(currentRow)
        if (isUpArrow && rowIndex > 0) {
          targetRow = afterFullData[rowIndex - 1]
        } else if (isDwArrow && rowIndex < afterFullData.length - 1) {
          targetRow = afterFullData[rowIndex + 1]
        }
      }
      if (targetRow) {
        let params = { $table: this, row: targetRow }
        this.scrollToRow(targetRow)
          .then(() => this.triggerCurrentRowEvent(evnt, params))
      }
    },
    // 处理可编辑方向键移动
    moveSelected (args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      let { tableData, visibleColumn, hasIndexColumn } = this
      let params = Object.assign({}, args)
      evnt.preventDefault()
      if (isUpArrow && params.rowIndex) {
        params.rowIndex -= 1
        params.row = tableData[params.rowIndex]
      } else if (isDwArrow && params.rowIndex < tableData.length - 1) {
        params.rowIndex += 1
        params.row = tableData[params.rowIndex]
      } else if (isLeftArrow && params.columnIndex) {
        for (let len = params.columnIndex - 1; len >= 0; len--) {
          if (!hasIndexColumn(visibleColumn[len])) {
            params.columnIndex = len
            params.column = visibleColumn[len]
            break
          }
        }
      } else if (isRightArrow) {
        for (let index = params.columnIndex + 1; index < visibleColumn.length; index++) {
          if (!hasIndexColumn(visibleColumn[index])) {
            params.columnIndex = index
            params.column = visibleColumn[index]
            break
          }
        }
      }
      params.cell = DomTools.getCell(this, params)
      this.handleSelected(params, evnt)
      this.scrollToRow(params.row, params.column)
    },
    // 处理菜单的移动
    moveCtxMenu (evnt, keyCode, ctxMenuStore, property, operKey, operRest, menuList) {
      let selectItem
      let selectIndex = XEUtils.findIndexOf(menuList, item => ctxMenuStore[property] === item)
      if (keyCode === operKey) {
        if (operRest && UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          ctxMenuStore.showChild = true
        } else {
          ctxMenuStore.showChild = false
          ctxMenuStore.selectChild = null
        }
      } else if (keyCode === 38) {
        for (let len = selectIndex - 1; len >= 0; len--) {
          if (menuList[len].visible !== false) {
            selectItem = menuList[len]
            break
          }
        }
        ctxMenuStore[property] = selectItem || menuList[menuList.length - 1]
      } else if (keyCode === 40) {
        for (let index = selectIndex + 1; index < menuList.length; index++) {
          if (menuList[index].visible !== false) {
            selectItem = menuList[index]
            break
          }
        }
        ctxMenuStore[property] = selectItem || menuList[0]
      } else if (ctxMenuStore[property] && (keyCode === 13 || keyCode === 32)) {
        this.ctxMenuLinkEvent(evnt, ctxMenuStore[property])
      }
    },
    handleGlobalResizeEvent () {
      this.recalculate()
    },
    /**
     * 快捷菜单事件处理
     */
    handleGlobalContextmenuEvent (evnt) {
      let { isCtxMenu, ctxMenuStore, ctxMenuOpts } = this
      let layoutList = ['header', 'body', 'footer']
      if (isCtxMenu) {
        if (ctxMenuStore.visible) {
          if (ctxMenuStore.visible && this.$refs.ctxWrapper && this.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
            evnt.preventDefault()
            return
          }
        }
        for (let index = 0; index < layoutList.length; index++) {
          let layout = layoutList[index]
          let columnTargetNode = this.getEventTargetNode(evnt, this.$el, `vxe-${layout}--column`)
          let params = { type: layout, $table: this }
          if (columnTargetNode.flag) {
            let cell = columnTargetNode.targetElem
            let column = this.getColumnNode(cell).item
            let typePrefix = `${layout}-`
            Object.assign(params, { column, columnIndex: this.getColumnIndex(column), cell })
            if (layout === 'body') {
              let row = this.getRowNode(cell.parentNode).item
              typePrefix = ''
              params.row = row
              params.rowIndex = this.getRowIndex(row)
            }
            this.openContextMenu(evnt, layout, params)
            UtilTools.emitEvent(this, `${typePrefix}cell-context-menu`, [params, evnt])
            return
          } else if (this.getEventTargetNode(evnt, this.$el, `vxe-table--${layout}-wrapper`).flag) {
            if (ctxMenuOpts.trigger === 'cell') {
              evnt.preventDefault()
            } else {
              this.openContextMenu(evnt, layout, params)
            }
            return
          }
        }
      }
      this.closeMenu()
      this.closeFilter()
    },
    /**
     * 显示快捷菜单
     */
    openContextMenu (evnt, type, params) {
      let { ctxMenuStore, ctxMenuOpts } = this
      let config = ctxMenuOpts[type]
      let visibleMethod = ctxMenuOpts.visibleMethod
      if (config) {
        let { options, disabled } = config
        if (disabled) {
          evnt.preventDefault()
        } else if (options && options.length) {
          if (!visibleMethod || visibleMethod(params, evnt)) {
            evnt.preventDefault()
            let { scrollTop, scrollLeft, visibleHeight, visibleWidth } = DomTools.getDomNode()
            let top = evnt.clientY + scrollTop
            let left = evnt.clientX + scrollLeft
            Object.assign(ctxMenuStore, {
              args: params,
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
        UtilTools.emitEvent(this, 'context-menu-click', [Object.assign({ menu, $table: this }, this.ctxMenuStore.args), evnt])
        this.closeMenu()
      }
    },
    /**
     * 触发表头 tooltip 事件
     */
    triggerHeaderTooltipEvent (evnt, params) {
      let { tooltipStore } = this
      let { column } = params
      if (tooltipStore.column !== column || !tooltipStore.visible) {
        // 在 v3.0 中废弃 label
        this.showTooltip(evnt, column)
      }
    },
    /**
     * 触发表尾 tooltip 事件
     */
    triggerFooterTooltipEvent (evnt, params) {
      let { column } = params
      let tooltipStore = this.tooltipStore
      if (tooltipStore.column !== column || !tooltipStore.visible) {
        this.showTooltip(evnt, column)
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
        this.showTooltip(evnt, column, row)
      }
    },
    // 显示 tooltip
    showTooltip (evnt, column, row) {
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
    handleSelectionDefChecked () {
      let { selectConfig = {}, fullDataRowIdData } = this
      let { checkAll, checkRowKeys } = selectConfig
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
      let { selection, tableFullData, selectConfig = {}, treeConfig, treeIndeterminates } = this
      let { checkField: property, checkStrictly, checkMethod } = selectConfig
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
              }
            }, treeConfig)
            XEUtils.remove(treeIndeterminates, item => item === row)
          }
          // 如果存在父节点，更新父节点状态
          let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeConfig)
          if (matchObj && matchObj.parent) {
            let parentStatus
            let vItems = checkMethod ? matchObj.items.filter((item, $rowIndex) => checkMethod({ row: item, $rowIndex })) : matchObj.items
            let indeterminatesItem = matchObj.items.find(item => treeIndeterminates.indexOf(item) > -1)
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
              }
            }, treeConfig)
            XEUtils.remove(treeIndeterminates, item => item === row)
          }
          // 如果存在父节点，更新父节点状态
          let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeConfig)
          if (matchObj && matchObj.parent) {
            let parentStatus
            let vItems = checkMethod ? matchObj.items.filter((item, $rowIndex) => checkMethod({ row: item, $rowIndex })) : matchObj.items
            let indeterminatesItem = matchObj.items.find(item => treeIndeterminates.indexOf(item) > -1)
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
        }
      }
      this.checkSelectionStatus()
    },
    handleToggleCheckRowEvent (params, evnt) {
      let { selectConfig = {}, selection } = this
      let { checkField: property } = selectConfig
      let { row } = params
      let value = property ? !XEUtils.get(row, property) : selection.indexOf(row) === -1
      if (evnt) {
        this.triggerCheckRowEvent(evnt, params, value)
      } else {
        this.handleSelectRow(params, value)
      }
    },
    triggerCheckRowEvent (evnt, params, value) {
      this.handleSelectRow(params, value)
      UtilTools.emitEvent(this, 'select-change', [Object.assign({ selection: this.getSelectRecords(), checked: value, $table: this }, params), evnt])
    },
    /**
     * 多选，切换某一行的选中状态
     */
    toggleRowSelection (row) {
      this.handleToggleCheckRowEvent({ row })
      return this.$nextTick()
    },
    setAllSelection (value) {
      let { tableFullData, editStore, selectConfig = {}, treeConfig, selection } = this
      let { checkField: property, reserve, checkStrictly, checkMethod } = selectConfig
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
            if (!checkMethod || checkMethod({ row, [indexKey]: rowIndex })) {
              XEUtils.set(row, property, value)
            }
          }
          let clearValFn = (row, rowIndex) => {
            if (!checkMethod || (checkMethod({ row, [indexKey]: rowIndex }) ? 0 : selection.indexOf(row) > -1)) {
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
                selectRows = tableFullData.filter((row, rowIndex) => selection.indexOf(row) > -1 || checkMethod({ row, rowIndex }))
              } else {
                selectRows = tableFullData.slice(0)
              }
            } else {
              if (checkMethod) {
                selectRows = tableFullData.filter((row, rowIndex) => checkMethod({ row, rowIndex }) ? 0 : selection.indexOf(row) > -1)
              }
            }
          }
        }
        this.selection = value && reserve ? selection.concat(selectRows.filter(row => selection.indexOf(row) === -1)) : selectRows
      }
      this.treeIndeterminates = []
      this.checkSelectionStatus()
    },
    checkSelectionStatus () {
      let { tableFullData, editStore, selectConfig = {}, selection, treeIndeterminates } = this
      let { checkField: property, checkStrictly, checkMethod } = selectConfig
      let { insertList } = editStore
      // 包含新增的数据
      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList)
      }
      if (!checkStrictly) {
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
      }
    },
    // 保留选中状态
    reserveCheckSelection () {
      let { selectConfig = {}, selection, fullDataRowIdData } = this
      let { reserve } = selectConfig
      let rowkey = UtilTools.getRowkey(this)
      if (reserve && selection.length) {
        this.selection = selection.map(row => {
          let rowid = '' + XEUtils.get(row, rowkey)
          return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : row
        })
      }
    },
    /**
     * 多选，选中所有事件
     */
    triggerCheckAllEvent (evnt, value) {
      this.setAllSelection(value)
      UtilTools.emitEvent(this, 'select-all', [{ selection: this.getSelectRecords(), checked: value, $table: this }, evnt])
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
      let isChange = this.selectRow !== params.row
      this.setRadioRow(params.row)
      if (isChange) {
        UtilTools.emitEvent(this, 'radio-change', [params, evnt])
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
     * 高亮行，设置某一行为高亮状态，如果调不加参数，则会取消目前高亮行的选中状态
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
    setRadioRow (row) {
      if (this.selectRow !== row) {
        this.clearRadioRow()
      }
      this.selectRow = row
      return this.$nextTick()
    },
    clearCurrentRow () {
      this.currentRow = null
      this.hoverRow = null
      XEUtils.arrayEach(this.$el.querySelectorAll('.row--current'), elem => DomTools.removeClass(elem, 'row--current'))
      return this.$nextTick()
    },
    clearRadioRow () {
      this.selectRow = null
      return this.$nextTick()
    },
    getCurrentRow () {
      return this.currentRow
    },
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
    /**
     * 表头按下事件
     */
    triggerHeaderCellMousedownEvent (evnt, params) {
      let { $el, tableData, mouseConfig = {}, elemStore, handleChecked, handleHeaderChecked } = this
      let { button } = evnt
      let { column, cell } = params
      let isLeftBtn = button === 0
      let isIndex = column.type === 'index'
      if (isLeftBtn && mouseConfig.checked) {
        let headerList = elemStore['main-header-list'].children
        let bodyList = elemStore['main-body-list'].children
        if (isIndex) {
          this.handleAllChecked(evnt)
        } else {
          evnt.preventDefault()
          evnt.stopPropagation()
          this.clearSelected(evnt)
          this.clearHeaderChecked()
          this.clearIndexChecked()
          let domMousemove = document.onmousemove
          let domMouseup = document.onmouseup
          let startCell = bodyList[0].querySelector(`.${column.id}`)
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
          DomTools.addClass($el, 'c--checked')
          document.onmousemove = updateEvent
          document.onmouseup = function () {
            DomTools.removeClass($el, 'c--checked')
            document.onmousemove = domMousemove
            document.onmouseup = domMouseup
          }
          handleHeaderChecked([[cell]])
          if (bodyList.length) {
            let endCell = bodyList[bodyList.length - 1].querySelector(`.${column.id}`)
            let firstTrElem = bodyList[0]
            let lastTrElem = bodyList[bodyList.length - 1]
            let firstCell = firstTrElem.querySelector(`.col--index`)
            params.rowIndex = 0
            params.row = tableData[0]
            params.cell = DomTools.getCell(this, params)
            this.handleSelected(params, evnt)
            this.handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(lastTrElem.querySelector(`.col--index`))))
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
      if (editConfig) {
        if (actived.row !== row || !(editConfig.mode === 'cell' && actived.column === column)) {
          if (isLeftBtn && mouseConfig.checked) {
            evnt.preventDefault()
            evnt.stopPropagation()
            this.clearHeaderChecked()
            this.clearIndexChecked()
            let domMousemove = document.onmousemove
            let domMouseup = document.onmouseup
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
                } else if (!DomTools.hasClass(targetElem, 'col--index')) {
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
              params.columnIndex++
              params.column = visibleColumn[params.columnIndex]
              params.cell = cell.nextElementSibling
              handleSelected(params, evnt)
              handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(cellLastElementChild)))
              handleHeaderChecked([headerList[0].querySelectorAll('.vxe-header--column:not(.col--index)')])
              handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(cell)))
            } else {
              handleSelected(params, evnt)
            }
            this.closeFilter()
            this.closeMenu()
          } else if (mouseConfig.selected) {
            // 除了双击其他都没有选中状态
            if (editConfig.trigger === 'dblclick') {
              // 如果不在所有选中的范围之内则重新选中
              let select = DomTools.getCellIndexs(cell)
              if (checked.rows.indexOf(tableData[select.rowIndex]) === -1 || checked.columns.indexOf(visibleColumn[select.columnIndex]) === -1) {
                handleSelected(params, evnt)
              }
            }
          }
        }
      } else if (mouseConfig.selected) {
        handleSelected(params, evnt)
      }
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
      let { _lastResizeTime, sortOpts } = this
      let { column, cell } = params
      let triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300
      let triggerSort = this.getEventTargetNode(evnt, cell, 'vxe-sort-wrapper').flag
      let triggerFilter = this.getEventTargetNode(evnt, cell, 'vxe-filter-wrapper').flag
      if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
        this.sort(column.property)
      }
      UtilTools.emitEvent(this, 'header-cell-click', [Object.assign({ triggerResizable, triggerSort, triggerFilter }, params), evnt])
      if (this.highlightCurrentColumn) {
        return this.setCurrentColumn(column, true)
      }
      return this.$nextTick()
    },
    setCurrentColumn (column) {
      this.clearCurrentRow()
      this.clearCurrentColumn()
      this.currentColumn = column
      XEUtils.arrayEach(this.$el.querySelectorAll(`.${column.id}`), elem => DomTools.addClass(elem, 'col--current'))
      return this.$nextTick()
    },
    clearCurrentColumn () {
      this.currentColumn = null
      XEUtils.arrayEach(this.$el.querySelectorAll('.col--current'), elem => DomTools.removeClass(elem, 'col--current'))
      return this.$nextTick()
    },
    /**
     * 列点击事件
     * 如果是单击模式，则激活为编辑状态
     * 如果是双击模式，则单击后选中状态
     */
    triggerCellClickEvent (evnt, params) {
      let { $el, highlightCurrentRow, editStore, radioConfig = {}, selectConfig = {}, treeConfig = {}, editConfig, mouseConfig = {} } = this
      let { actived } = editStore
      let { column, cell } = params
      // 如果是树形表格
      if ((treeConfig.trigger === 'row' || (column.treeNode && treeConfig.trigger === 'cell'))) {
        this.triggerTreeExpandEvent(evnt, params)
      }
      if (!column.treeNode || !this.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag) {
        // 如果是高亮行
        if (highlightCurrentRow) {
          if (radioConfig.trigger === 'row' || (!this.getEventTargetNode(evnt, $el, 'vxe-checkbox').flag && !this.getEventTargetNode(evnt, $el, 'vxe-radio').flag)) {
            this.triggerCurrentRowEvent(evnt, params)
          }
        }
        // 如果是单选
        if ((radioConfig.trigger === 'row' || (column.type === 'radio' && radioConfig.trigger === 'cell')) && !this.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
          this.triggerRadioRowEvent(evnt, params)
        }
        // 如果是多选
        if ((selectConfig.trigger === 'row' || (column.type === 'selection' && selectConfig.trigger === 'cell')) && !this.getEventTargetNode(evnt, params.cell, 'vxe-checkbox').flag) {
          this.handleToggleCheckRowEvent(params, evnt)
        }
        // 如果设置了单元格选中功能，则不会使用点击事件去处理（只能支持双击模式）
        if (!mouseConfig.checked) {
          if (editConfig) {
            if (!actived.args || cell !== actived.args.cell) {
              if (editConfig.trigger === 'click') {
                this.triggerValidate('blur')
                  .catch(e => e)
                  .then(() => {
                    this.handleActived(params, evnt)
                      .then(() => this.triggerValidate('change'))
                      .catch(e => e)
                  })
              } else if (editConfig.trigger === 'dblclick') {
                if (editConfig.mode === 'row' && actived.row === params.row) {
                  this.triggerValidate('blur')
                    .catch(e => e)
                    .then(() => {
                      this.handleActived(params, evnt)
                        .then(() => this.triggerValidate('change'))
                        .catch(e => e)
                    })
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
            this.triggerValidate('blur')
              .catch(e => e)
              .then(() => {
                this.handleActived(params, evnt)
                  .then(() => this.triggerValidate('change'))
                  .catch(e => e)
              })
          } else if (editConfig.mode === 'cell') {
            this.handleActived(params, evnt)
              .then(() => this.triggerValidate('change'))
              .catch(e => e)
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
      if (editRender && cell) {
        if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
          // 判断是否禁用编辑
          let type = 'edit-disabled'
          if (!activeMethod || activeMethod(params)) {
            this.clostTooltip()
            this.clearCopyed(evnt)
            this.clearChecked()
            this.clearSelected(evnt)
            this.clearActived(evnt)
            type = 'edit-actived'
            column.renderHeight = cell.offsetHeight
            actived.args = params
            actived.row = row
            actived.column = column
            if (editConfig.mode === 'row') {
              tableColumn.forEach(column => {
                if (column.editRender) {
                  column.model.value = UtilTools.getCellValue(row, column)
                  column.model.update = false
                }
              })
            } else {
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
      let { editStore } = this
      let { actived } = editStore
      let { args, row, column } = actived
      if (row || column) {
        let { model } = column
        if (model.update) {
          UtilTools.setCellValue(row, column, model.value)
          model.update = false
          model.value = null
          this.updateFooter()
        }
        UtilTools.emitEvent(this, 'edit-closed', [args, evnt])
      }
      actived.args = null
      actived.row = null
      actived.column = null
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
      let { mouseConfig = {}, editConfig, editStore, elemStore } = this
      let { actived, selected } = editStore
      let { row, column, cell } = params
      let selectMethod = () => {
        if (selected.row !== row || selected.column !== column) {
          if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
            this.clearChecked(evnt)
            this.clearIndexChecked()
            this.clearHeaderChecked()
            this.clearSelected(evnt)
            this.clearActived(evnt)
            selected.args = params
            selected.row = row
            selected.column = column
            if (mouseConfig.selected) {
              let listElem = elemStore['main-body-list']
              let rowid = UtilTools.getRowid(this, row)
              let trElem = listElem.querySelector(`[data-rowid="${rowid}"]`)
              let tdElem = trElem.querySelector(`.${column.id}`)
              DomTools.addClass(tdElem, 'col--selected')
            }
            // 如果配置了批量选中功能，则为批量选中状态
            if (mouseConfig.checked) {
              let headerElem = elemStore['main-header-list']
              this.handleChecked([[cell]])
              this.handleHeaderChecked([[headerElem.querySelector(`.${column.id}`)]])
              this.handleIndexChecked([[cell.parentNode.querySelector('.col--index')]])
            }
          }
        }
        return this.$nextTick()
      }
      return selectMethod()
    },
    /**
     * 清除所有选中状态
     */
    clearChecked (evnt) {
      let { $refs, editStore, mouseConfig } = this
      let { checked } = editStore
      if (mouseConfig && mouseConfig.checked) {
        let tableBody = $refs.tableBody
        checked.rows = []
        checked.columns = []
        checked.tRows = []
        checked.tColumns = []
        let { checkBorders } = tableBody.$refs
        checkBorders.style.display = 'none'
        XEUtils.arrayEach(tableBody.$el.querySelectorAll('.col--checked'), elem => DomTools.removeClass(elem, 'col--checked'))
      }
      return this.$nextTick()
    },
    /**
     * 处理所有选中
     */
    handleChecked (rowNodes) {
      let { checked } = this.editStore
      this.clearChecked()
      let cWidth = -2
      let cHeight = -2
      let offsetTop = 0
      let offsetLeft = 0
      XEUtils.arrayEach(rowNodes, (rows, rowIndex) => {
        let isTop = rowIndex === 0
        XEUtils.arrayEach(rows, (elem, colIndex) => {
          let isLeft = colIndex === 0
          if (isLeft && isTop) {
            offsetTop = elem.offsetTop
            offsetLeft = elem.offsetLeft
          }
          if (isTop) {
            cWidth += elem.offsetWidth
          }
          if (isLeft) {
            cHeight += elem.offsetHeight
          }
          DomTools.addClass(elem, 'col--checked')
        })
      })
      let { checkBorders, checkTop, checkRight, checkBottom, checkLeft } = this.$refs.tableBody.$refs
      checkBorders.style.display = 'block'
      Object.assign(checkTop.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft}px`,
        width: `${cWidth}px`
      })
      Object.assign(checkRight.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft + cWidth}px`,
        height: `${cHeight}px`
      })
      Object.assign(checkBottom.style, {
        top: `${offsetTop + cHeight}px`,
        left: `${offsetLeft}px`,
        width: `${cWidth}px`
      })
      Object.assign(checkLeft.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft}px`,
        height: `${cHeight}px`
      })
      checked.rowNodes = rowNodes
    },
    handleAllChecked (evnt) {
      let { tableData, visibleColumn, mouseConfig = {}, elemStore } = this
      if (mouseConfig.checked) {
        evnt.preventDefault()
        let headerListElem = elemStore['main-header-list']
        let headerList = headerListElem.children
        let bodyList = elemStore['main-body-list'].children
        let column = visibleColumn.find(column => column.type === 'index') || visibleColumn[0]
        let cell = headerListElem.querySelector(`.${column.id}`)
        let firstTrElem = bodyList[0]
        let lastTrElem = bodyList[bodyList.length - 1]
        let firstCell = firstTrElem.querySelector(`.${column.id}`)
        let params = {
          $table: this,
          rowIndex: 0,
          row: tableData[0],
          column: visibleColumn.find(column => column.property)
        }
        params.columnIndex = this.getColumnIndex(params.column)
        params.cell = DomTools.getCell(this, params)
        this.handleSelected(params, evnt)
        this.handleHeaderChecked(DomTools.getRowNodes(headerList, DomTools.getCellNodeIndex(cell.nextElementSibling), DomTools.getCellNodeIndex(cell.parentNode.lastElementChild)))
        this.handleIndexChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell), DomTools.getCellNodeIndex(lastTrElem.querySelector(`.${column.id}`))))
        this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(firstCell.nextElementSibling), DomTools.getCellNodeIndex(lastTrElem.lastElementChild)))
      }
    },
    handleIndexChecked (rowNodes) {
      let { indexs } = this.editStore
      this.clearIndexChecked()
      XEUtils.arrayEach(rowNodes, rows => {
        XEUtils.arrayEach(rows, elem => {
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
      XEUtils.arrayEach(rowNodes, rows => {
        XEUtils.arrayEach(rows, elem => {
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
      let { $refs, editStore, keyboardConfig } = this
      let { copyed } = editStore
      if (keyboardConfig && keyboardConfig.isCut) {
        let tableBody = $refs.tableBody
        let { copyBorders } = $refs.tableBody.$refs
        copyed.cut = false
        copyed.rows = []
        copyed.columns = []
        copyBorders.style.display = 'none'
        XEUtils.arrayEach(tableBody.$el.querySelectorAll('.col--copyed'), elem => DomTools.removeClass(elem, 'col--copyed'))
      }
      return this.$nextTick()
    },
    /**
     * 处理复制
     */
    handleCopyed (cut, evnt) {
      let { tableData, tableColumn, editStore } = this
      let { copyed, checked } = editStore
      let rowNodes = checked.rowNodes
      this.clearCopyed()
      let cWidth = -3
      let cHeight = -3
      let offsetTop = 0
      let offsetLeft = 0
      let columns = []
      let rows = []
      if (rowNodes.length) {
        let firstRows = rowNodes[0]
        let { rowIndex, columnIndex } = DomTools.getCellNodeIndex(firstRows[0])
        columns = tableColumn.slice(columnIndex, columnIndex + firstRows.length)
        rows = tableData.slice(rowIndex, rowIndex + rowNodes.length)
      }
      XEUtils.arrayEach(rowNodes, (rows, rowIndex) => {
        let isTop = rowIndex === 0
        XEUtils.arrayEach(rows, (elem, colIndex) => {
          let isLeft = colIndex === 0
          if (isLeft && isTop) {
            offsetTop = elem.offsetTop
            offsetLeft = elem.offsetLeft
          }
          if (isTop) {
            cWidth += elem.offsetWidth
          }
          if (isLeft) {
            cHeight += elem.offsetHeight
          }
          DomTools.addClass(elem, 'col--copyed')
        })
      })
      let { copyBorders, copyTop, copyRight, copyBottom, copyLeft } = this.$refs.tableBody.$refs
      copyBorders.style.display = 'block'
      Object.assign(copyTop.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft}px`,
        width: `${cWidth}px`
      })
      Object.assign(copyRight.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft + cWidth}px`,
        height: `${cHeight}px`
      })
      Object.assign(copyBottom.style, {
        top: `${offsetTop + cHeight}px`,
        left: `${offsetLeft}px`,
        width: `${cWidth}px`
      })
      Object.assign(copyLeft.style, {
        top: `${offsetTop}px`,
        left: `${offsetLeft}px`,
        height: `${cHeight}px`
      })
      copyed.cut = cut
      copyed.rows = rows
      copyed.columns = columns
      copyed.rowNodes = rowNodes
    },
    /**
     * 处理粘贴
     */
    handlePaste (evnt) {
      let { tableData, visibleColumn, editStore, elemStore } = this
      let { copyed, selected } = editStore
      let { cut, rows, columns } = copyed
      if (rows.length && columns.length && selected.row && selected.column) {
        let { rowIndex, columnIndex } = selected.args
        XEUtils.arrayEach(rows, (row, rIndex) => {
          let offsetRow = tableData[rowIndex + rIndex]
          if (offsetRow) {
            XEUtils.arrayEach(columns, (column, cIndex) => {
              let offsetColumn = visibleColumn[columnIndex + cIndex]
              if (offsetColumn) {
                UtilTools.setCellValue(offsetRow, offsetColumn, UtilTools.getCellValue(row, column))
              }
              if (cut) {
                UtilTools.setCellValue(row, column, null)
              }
            })
          }
        })
        if (cut) {
          this.clearCopyed()
        }
        let bodyList = elemStore['main-body-list'].children
        let cell = selected.args.cell
        let trElem = cell.parentNode
        let colIndex = XEUtils.arrayIndexOf(trElem.children, cell)
        let rIndex = XEUtils.arrayIndexOf(bodyList, trElem)
        let targetTrElem = bodyList[rIndex + rows.length - 1]
        let targetCell = targetTrElem.children[colIndex + columns.length - 1]
        this.handleChecked(DomTools.getRowNodes(bodyList, DomTools.getCellNodeIndex(cell), DomTools.getCellNodeIndex(targetCell)))
      }
    },
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
          if (browse.msie) {
            let textRange = inputElem.createTextRange()
            textRange.collapse(false)
            textRange.select()
          }
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
      return this.scrollToRow(row, true).then(() => {
        if (row && field) {
          let column = this.visibleColumn.find(column => column.property === field)
          if (column && column.editRender) {
            let cell = DomTools.getCell(this, { row, column })
            if (cell) {
              this.handleActived({ row, rowIndex: this.getRowIndex(row), column, columnIndex: this.getColumnIndex(column), cell, $table: this })
              this.lastCallTime = Date.now()
            }
          }
        }
        return this.$nextTick()
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
            this.handleData(true)
          }
          // 在 v3.0 中废弃 prop
          UtilTools.emitEvent(this, 'sort-change', [{ column, property: field, prop: field, field, order, $table: this }])
        }
        return this.$nextTick().then(this.updateStyle)
      }
      return this.$nextTick()
    },
    clearSort () {
      this.tableFullColumn.forEach(column => {
        column.order = null
      })
      this.tableFullData = this.data ? this.data.slice(0) : []
      return this.handleData(true)
    },
    filter (field, callback) {
      let column = this.getColumnByField(field)
      let filters = column.filters
      if (callback) {
        let rest = callback(filters)
        if (XEUtils.isArray(rest)) {
          column.filters = UtilTools.getFilters(rest)
        }
      }
      return Promise.resolve(filters)
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
        filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(item => item.checked)
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
      let { property } = column
      let values = []
      let datas = []
      column.filters.forEach(item => {
        if (item.checked) {
          values.push(item.value)
          datas.push(item.data)
        }
      })
      filterStore.visible = false
      // 如果是服务端筛选，则跳过本地筛选处理
      if (!remoteFilter) {
        this.handleData(true)
      }
      let filterList = []
      visibleColumn.filter(column => {
        let { property, filters } = column
        let valueList = []
        let dataList = []
        if (filters && filters.length) {
          filters.forEach(item => {
            if (item.checked) {
              valueList.push(item.value)
              dataList.push(item.data)
            }
          })
          // 在 v3.0 中废弃 prop
          filterList.push({ column, property, field: property, prop: property, values: valueList, datas: dataList })
        }
      })
      // 在 v3.0 中废弃 prop
      UtilTools.emitEvent(this, 'filter-change', [{ column, property, field: property, prop: property, values, datas, filters: filterList, $table: this }])
      if (scrollXLoad || scrollYLoad) {
        this.clearScroll()
        if (scrollYLoad) {
          this.updateScrollYSpace()
        }
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
    clearFilter (field) {
      let column = arguments.length ? this.getColumnByField(field) : null
      let filterStore = this.filterStore
      let handleClear = column => {
        let { filters } = column
        if (filters && filters.length) {
          filters.forEach(item => {
            item.checked = false
            item.data = item._data
          })
        }
      }
      if (column) {
        handleClear(column)
      } else {
        this.visibleColumn.forEach(handleClear)
      }
      if (!column || column !== filterStore.column) {
        Object.assign(filterStore, {
          isAllSelected: false,
          isIndeterminate: false,
          style: null,
          options: [],
          column: null,
          multiple: false,
          visible: false
        })
      }
      return this.handleData(true).then(this.recalculate)
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
        this.expandeds = tableFullData.slice(0)
      } else if (expandRowKeys) {
        let defExpandeds = []
        expandRowKeys.forEach(rowid => {
          if (fullDataRowIdData[rowid]) {
            defExpandeds.push(fullDataRowIdData[rowid].row)
          }
        })
        this.expandeds = defExpandeds
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
      let { currentRow, currentColumn } = this
      let rest = this.toggleTreeExpansion(row)
      UtilTools.emitEvent(this, 'toggle-tree-change', [{ row, rowIndex: this.getRowIndex(row), $table: this }, evnt])
      if (currentRow) {
        this.$nextTick(() => this.setCurrentRow(currentRow))
      } else if (currentColumn) {
        this.$nextTick(() => this.setCurrentColumn(currentColumn))
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
          this.updateScrollXData()
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
          this.updateScrollYData()
          this.$nextTick(() => {
            // scrollBodyElem.scrollTop = scrollTop
            this.clearHoverRow()
            this.updateStyle()
          })
        }
      }
    },
    // 计算可视渲染相关数据
    computeScrollLoad () {
      return this.$nextTick().then(() => {
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
            this.updateScrollXData()
          } else {
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
    },
    updateScrollYData () {
      this.handleData()
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
    },
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
      return this.$nextTick()
    },
    scrollToRow (row, column, isDelay) {
      if (row && this.fullAllDataRowMap.has(row)) {
        DomTools.rowToVisible(this, row)
      }
      return this.scrollToColumn(column, isDelay || XEUtils.isBoolean(column))
    },
    scrollToColumn (column, isDelay) {
      if (column && this.fullColumnMap.has(column)) {
        DomTools.colToVisible(this, column)
      }
      if (isDelay && this.scrollYLoad) {
        return new Promise(resolve => setTimeout(() => resolve(this.$nextTick()), 50))
      }
      return this.$nextTick()
    },
    clearScroll () {
      Object.assign(this.scrollXStore, {
        startIndex: 0
      })
      Object.assign(this.scrollYStore, {
        startIndex: 0
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
     * 更新表尾合计
     */
    updateFooter () {
      let { showFooter, tableColumn, footerMethod } = this
      if (showFooter && footerMethod) {
        this.footerData = tableColumn.length ? footerMethod({ columns: tableColumn, data: this.tableFullData }) : []
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
    triggerValidate (type) {
      let { editConfig, editStore, editRules, validStore } = this
      let { actived } = editStore
      if (actived.row && editRules) {
        let { row, column, cell } = actived.args
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
      let { editRules, tableData, tableFullData, scrollYLoad } = this
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
          let colVailds = []
          columns.forEach((column, columnIndex) => {
            if (XEUtils.has(editRules, column.property)) {
              colVailds.push(
                new Promise((resolve, reject) => {
                  this.validCellRules('all', row, column)
                    .then(resolve)
                    .catch(({ rule, rules }) => {
                      let rest = { rule, rules, rowIndex: this.getRowIndex(row), row, columnIndex, column, $table: this }
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
              this.scrollToRow(params.row, true).then(finish)
            } else {
              finish()
            }
          })
        })
      } else {
        if (cb) {
          cb(status)
        }
      }
      return Promise.resolve(true)
    },
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
    validCellRules (type, row, column, val) {
      let { editRules } = this
      let { property } = column
      let errorRules = []
      let cellVailds = []
      if (property && editRules) {
        let rules = XEUtils.get(editRules, property)
        let cellValue = XEUtils.isUndefined(val) ? XEUtils.get(row, property) : val
        if (rules) {
          rules.forEach(rule => {
            cellVailds.push(
              new Promise(resolve => {
                let isRequired = rule.required === true
                if (type === 'all' || !rule.trigger || type === rule.trigger) {
                  if (XEUtils.isFunction(rule.validator)) {
                    rule.validator(rule, cellValue, e => {
                      if (XEUtils.isError(e)) {
                        let cusRule = { type: 'custom', trigger: rule.trigger, message: e.message, rule: new Rule(rule) }
                        errorRules.push(new Rule(cusRule))
                      }
                      return resolve()
                    }, { rules, row, column, rowIndex: this.getRowIndex(row), columnIndex: this.getColumnIndex(column) })
                  } else {
                    let len
                    let restVal = cellValue
                    let isNumber = rule.type === 'number'
                    let isEmpty = cellValue === null || cellValue === undefined || cellValue === ''
                    if (isNumber) {
                      restVal = XEUtils.toNumber(cellValue)
                    } else {
                      len = XEUtils.getSize(restVal)
                    }
                    if (isRequired && isEmpty) {
                      errorRules.push(new Rule(rule))
                    } else if (
                      (isNumber && isNaN(cellValue)) ||
                      (XEUtils.isRegExp(rule.pattern) && !rule.pattern.test(cellValue)) ||
                      (XEUtils.isNumber(rule.min) && (isNumber ? restVal < rule.min : len < rule.min)) ||
                      (XEUtils.isNumber(rule.max) && (isNumber ? restVal > rule.max : len > rule.max))
                    ) {
                      errorRules.push(new Rule(rule))
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
      let { $refs, height, tableData, validOpts } = this
      let { rule, row, column, cell } = params
      let validTip = $refs.validTip
      let content = rule.message
      this.$nextTick(() => {
        Object.assign(this.validStore, {
          row,
          column,
          rule,
          content,
          visible: true
        })
        if (validTip && (validOpts.message === 'tooltip' || (validOpts.message === 'default' && !height && tableData.length < 2))) {
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
        isFooter: true,
        download: true,
        data: null,
        columns: null,
        columnFilterMethod: column => ['index', 'selection', 'radio'].indexOf(column.type) === -1 && column.property,
        dataFilterMethod: null
      }, options)
      if (opts.filename.indexOf('.csv') === -1) {
        opts.filename += '.csv'
      }
      if (!opts.original) {
        if (scrollXLoad || scrollYLoad) {
          opts.original = true
          console.warn('[vxe-table] Virtual scrolling can only export source data, please set original=true.')
        }
      }
      let columns = visibleColumn
      let oData = this.tableFullData
      if (treeConfig) {
        oData = XEUtils.toTreeArray(oData, treeConfig)
      }
      return ExportTools.downloadCsc(opts, ExportTools.getCsvContent(this, opts, columns, oData))
    },

    /*************************
     * Publish methods
     *************************/
    // 与工具栏对接
    connect ({ toolbar }) {
      this._toolbar = toolbar
    },
    // 检查触发源是否属于目标节点
    getEventTargetNode: DomTools.getEventTargetNode
    /*************************
     * Publish methods
     *************************/
  }
}
