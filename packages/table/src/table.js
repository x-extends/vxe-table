import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import Cell from '../../cell'
import { Interceptor, Renderer } from '../../v-x-e-table'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

var rowUniqueId = 0
var browse = DomTools.browse
var isWebkit = browse['-webkit'] && !browse.edge
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
    // 是否所有服务端筛选
    remoteFilter: Boolean,
    // 是否所有服务端排序
    remoteSort: Boolean,
    // 自定义所有列的排序方法
    sortMethod: Function,
    // 所有列宽度
    columnWidth: [Number, String],
    // 所有列最小宽度，把剩余宽度按比例分配
    columnMinWidth: [Number, String],

    /** 高级属性 */
    // 主键配置
    columnKey: Boolean,
    rowKey: Boolean,
    rowId: { type: String, default: () => GlobalConfig.rowId },
    // 是否自动监听父容器变化去更新响应式表格宽高
    autoResize: Boolean,
    // 是否自动根据状态属性去更新响应式表格宽高
    syncResize: Boolean,
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
    optimization: Object,
    // 额外的参数
    params: Object,
    //自动声明未声明row参数
    autoCreateData: { type: Boolean, default: false },
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
      this.handleData(true)
      if (this._toolbar) {
        this._toolbar.updateColumn(tableFullColumn)
      }
      // 在 v3.0 中废弃 prop、label
      if (tableFullColumn.length) {
        let cIndex = Math.floor((tableFullColumn.length - 1) / 2)
        if (tableFullColumn[cIndex].prop) {
          UtilTools.warn('vxe.error.delProp')
        }
        if (tableFullColumn[cIndex].label) {
          UtilTools.warn('vxe.error.delLabel')
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
    },
    syncResize (value) {
      if (value) {
        this.$nextTick(this.recalculate)
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
    if (!UtilTools.getRowkey(this)) {
      UtilTools.error('vxe.error.rowIdEmpty')
    }
    if (!GlobalConfig._keyboard && (this.keyboardConfig || this.mouseConfig)) {
      throw new Error(UtilTools.error('vxe.error.reqKeyboard'))
    }
    if (!GlobalConfig._resize && this.autoResize) {
      throw new Error(UtilTools.error('vxe.error.reqResize'))
    }
    if (scrollY) {
      Object.assign(scrollYStore, {
        startIndex: 0,
        visibleIndex: 0,
        adaptive: XEUtils.isBoolean(scrollY.adaptive) ? scrollY.adaptive : true,
        renderSize: XEUtils.toNumber(scrollY.rSize),
        offsetSize: XEUtils.toNumber(scrollY.oSize)
      })
    }
    this.loadData(data, true).then(() => {
      this.handleDefault()
      this.updateStyle()
    })
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent)
    GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent)
  },
  mounted () {
    if (this.autoResize && GlobalConfig._resize) {
      this.bindResize(this, this.$el.parentNode, this.recalculate)
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
    if (GlobalConfig._resize) {
      this.unbindResize(this, this.$el.parentNode)
    }
    this.closeFilter()
    this.closeMenu()
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
    GlobalEvent.off(this, 'mousewheel')
    GlobalEvent.off(this, 'keydown')
    GlobalEvent.off(this, 'resize')
    GlobalEvent.off(this, 'contextmenu')
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
      this.clearCurrentRow()
      this.clearCurrentColumn()
      this.clearSelection()
      this.clearRowExpand()
      this.clearTreeExpand()
      if (GlobalConfig._filter) {
        this.clearFilter()
      }
      if (this.keyboardConfig || this.mouseConfig) {
        this.clearIndexChecked()
        this.clearHeaderChecked()
        this.clearChecked()
        this.clearSelected()
        this.clearCopyed()
      }
      return this.clearActived()
    },
    refreshData () {
      return this.$nextTick().then(() => {
        this.tableData = []
        return this.$nextTick().then(() => this.loadData(this.tableFullData))
      })
    },
    updateData () {
      return this.handleData(true).then(this.updateFooter).then(this.recalculate)
    },
    handleData (force) {
      let { scrollYLoad, scrollYStore } = this
      let fullData = force ? this.updateAfterFullData() : this.afterFullData
      this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0)
      return this.$nextTick()
    },
    loadData (datas, notRefresh) {
      if (this.autoCreateData) datas=this.initData(datas)
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
        UtilTools.error('vxe.error.scrollYHeight')
      }
      this.handleData(true)
      this.reserveCheckSelection()
      this.checkSelectionStatus()
      let rest = this.$nextTick()
      if (!notRefresh) {
        rest = rest.then(recalculate)
      }
      return rest.then(() => {
        // 如果启用了虚拟滚动，数据加载完成后还原指定位置
        let { lastScrollLeft, lastScrollTop } = this
        if ((lastScrollLeft || lastScrollTop) && (this.scrollXLoad || this.scrollYLoad)) {
          return this.clearScroll().then(() => this.scrollTo(lastScrollLeft, lastScrollTop))
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
      let { afterFullData, editStore, scrollYLoad, tableFullData, treeConfig } = this
      if (treeConfig) {
        throw new Error(UtilTools.error('vxe.error.treeInsert'))
      }
      if (!XEUtils.isArray(records)) {
        records = [records]
      }
      let nowData = afterFullData
      let newRecords = records.map(record => this.defineField(Object.assign({}, record)))
      if (!row) {
        nowData.unshift.apply(nowData, newRecords)
        tableFullData.unshift.apply(tableFullData, newRecords)
      } else {
        if (row === -1) {
          nowData.push.apply(nowData, newRecords)
          tableFullData.push.apply(tableFullData, newRecords)
        } else {
          let targetIndex = nowData.indexOf(row)
          if (targetIndex === -1) {
            throw new Error(UtilTools.error('vxe.error.unableInsert'))
          }
          nowData.splice.apply(nowData, [targetIndex, 0].concat(newRecords))
          tableFullData.splice.apply(tableFullData, [tableFullData.indexOf(row), 0].concat(newRecords))
        }
      }
      [].unshift.apply(editStore.insertList, newRecords)
      this.handleData()
      this.updateCache()
      this.checkSelectionStatus()
      if (scrollYLoad) {
        this.updateScrollYSpace()
      }
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
    initData(datas){
      return  XEUtils.isArray(datas)?XEUtils.clone(datas.map(this.defineField), true):[]
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
      let { afterFullData, tableFullData, editStore, treeConfig, selectConfig = {}, selection, hasRowInsert, scrollYLoad } = this
      let { removeList, insertList } = editStore
      let { checkField: property } = selectConfig
      let rest = []
      let nowData = afterFullData
      if (!rows) {
        rows = tableFullData
      } else if (!XEUtils.isArray(rows)) {
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
        // 如果绑定了多选属性，则更新状态
        if (!property) {
          XEUtils.remove(selection, row => rows.indexOf(row) > -1)
        }
        // 从数据源中移除
        if (tableFullData === rows) {
          rows = tableFullData.slice(0)
          tableFullData.length = 0
          nowData.length = 0
        } else {
          rest = XEUtils.remove(tableFullData, row => rows.indexOf(row) > -1)
          XEUtils.remove(nowData, row => rows.indexOf(row) > -1)
        }
      }
      // 从新增中移除已删除的数据
      XEUtils.remove(insertList, row => rows.indexOf(row) > -1)
      this.handleData()
      this.updateCache()
      this.checkSelectionStatus()
      if (scrollYLoad) {
        this.updateScrollYSpace()
      }
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
    revert () {
      UtilTools.warn('vxe.error.delRevert')
      return this.revertData.apply(this, arguments)
    },
    /**
     * 还原数据
     * 如果不传任何参数，则还原整个表格
     * 如果传 row 则还原一行
     * 如果传 rows 则还原多行
     * 如果还额外传了 field 则还原指定单元格
     */
    revertData (rows, field) {
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
      UtilTools.warn('vxe.error.delGetRecords')
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
      UtilTools.warn('vxe.error.delGetAllRecords')
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
      let tableData = tableFullData
      let column = visibleColumn.find(column => column.order)
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
    getRowById (rowid) {
      let fullDataRowIdData = this.fullDataRowIdData
      return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null
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
        UtilTools.error('vxe.error.groupFixed')
      }
      if (scrollXLoad) {
        if (this.resizable || visibleColumn.some(column => column.resizable)) {
          UtilTools.warn('vxe.error.notResizable')
        }
        Object.assign(scrollXStore, {
          startIndex: 0,
          visibleIndex: 0,
          renderSize: XEUtils.toNumber(scrollX.rSize),
          offsetSize: XEUtils.toNumber(scrollX.oSize)
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
     * 计算单元格列宽，动态分配可用剩余空间
     * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
     */
    recalculate (refull) {
      let { $el, $refs } = this
      let { tableBody, tableHeader, tableFooter } = $refs
      let bodyElem = tableBody ? tableBody.$el : null
      let headerElem = tableHeader ? tableHeader.$el : null
      let footerElem = tableFooter ? tableFooter.$el : null
      DomTools.addClass($el, 'is--recalculate')
      if (bodyElem) {
        this.autoCellWidth(headerElem, bodyElem, footerElem)
        if (refull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          return this.computeScrollLoad().then(() => {
            this.autoCellWidth(headerElem, bodyElem, footerElem)
            this.computeScrollLoad()
            DomTools.removeClass($el, 'is--recalculate')
          })
        }
      }
      DomTools.removeClass($el, 'is--recalculate')
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
    preventEvent (evnt, type, args, next, end) {
      let evntList = Interceptor.get(type)
      if (!evntList.some(func => func(args, evnt, this) === false) && next) {
        next()
      }
      if (end) {
        end()
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
    handleGlobalResizeEvent () {
      this.recalculate()
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
    /**
     * 触发表头 tooltip 事件
     */
    triggerHeaderTooltipEvent (evnt, params) {
      let { tooltipStore } = this
      let { column } = params
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
      if (editConfig) {
        if ((editConfig.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {
          return
        }
      }
      if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
        this.handleTooltip(evnt, column, row)
      }
    },
    // 显示 tooltip
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
      let { $el, highlightCurrentRow, editStore, radioConfig = {}, selectConfig = {}, expandConfig = {}, treeConfig = {}, editConfig, mouseConfig = {} } = this
      let { actived } = editStore
      let { column, cell } = params
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
            if (this.keyboardConfig || this.mouseConfig) {
              this.clearCopyed(evnt)
              this.clearChecked()
              this.clearSelected(evnt)
            }
            this.clostTooltip()
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
     * 处理选中源
     */
    handleSelected (params, evnt) {
      let { mouseConfig = {}, editConfig, editStore, elemStore } = this
      let { actived, selected } = editStore
      let { row, column, cell } = params
      let selectMethod = () => {
        if (selected.row !== row || selected.column !== column) {
          if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
            if (this.keyboardConfig || this.mouseConfig) {
              this.clearChecked(evnt)
              this.clearIndexChecked()
              this.clearHeaderChecked()
              this.clearSelected(evnt)
            }
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
     * 点击排序事件
     */
    triggerSortEvent (evnt, column, params, order) {
      if (column.order === order) {
        this.clearSort(column.property)
      } else {
        this.sort(column.property, order)
      }
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
      return this.handleData(true)
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
      let preload = false
      for (let index = 0; index < visibleColumn.length; index++) {
        width += visibleColumn[index].renderWidth
        if (scrollLeft < width) {
          toVisibleIndex = index
          break
        }
      }
      if (scrollXStore.visibleIndex !== toVisibleIndex) {
        let marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize)
        if (scrollXStore.visibleIndex > toVisibleIndex) {
          // 向左
          preload = toVisibleIndex - offsetSize <= startIndex
          if (preload) {
            scrollXStore.startIndex = Math.max(0, toVisibleIndex - Math.max(marginSize, renderSize - visibleSize))
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
      let { afterFullData, scrollYStore } = this
      let { startIndex, renderSize, offsetSize, visibleSize, rowHeight } = scrollYStore
      let scrollBodyElem = evnt.target
      let scrollTop = scrollBodyElem.scrollTop
      let toVisibleIndex = Math.ceil(scrollTop / rowHeight)
      let preload = false
      if (scrollYStore.visibleIndex !== toVisibleIndex) {
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
      }
    },
    // 计算可视渲染相关数据
    computeScrollLoad () {
      return this.$nextTick().then(() => {
        let { vSize, scrollXLoad, scrollYLoad, scrollYStore, scrollXStore, visibleColumn, optimizeOpts } = this
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
              scrollXStore.renderSize = visibleXSize + 2
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
              switch (vSize) {
                case 'medium':
                  rHeight = 44
                  break
                case 'small':
                  rHeight = 40
                  break
                case 'mini':
                  rHeight = 36
                  break
                default:
                  rHeight = 48
                  break
              }
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
      this.$nextTick(this.updateStyle)
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
      this.lastScrollLeft = 0
      this.lastScrollTop = 0
      Object.assign(this.scrollXStore, {
        startIndex: 0,
        visibleIndex: 0
      })
      Object.assign(this.scrollYStore, {
        startIndex: 0,
        visibleIndex: 0
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
