import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import Cell from '../../cell'
import VXETable, { Interceptor, Renderer, Menus } from '../../v-x-e-table'
import { UtilTools, DomTools, ExportTools, GlobalEvent, ResizeEvent } from '../../tools'

var rowUniqueId = 0
var browse = DomTools.browse
var debounceScrollYDuration = browse.msie ? 40 : 20

// 导入
const fileForm = document.createElement('form')
const fileInput = document.createElement('input')
fileForm.className = 'vxe-table--import-form'
fileInput.name = 'file'
fileInput.type = 'file'
fileForm.appendChild(fileInput)

// 打印
var printFrame

function createFrame () {
  const frame = document.createElement('iframe')
  frame.className = 'vxe-table--print-frame'
  return frame
}

function getRowUniqueId () {
  return `row_${++rowUniqueId}`
}

function isTargetRadioOrCheckbox (evnt, column, colType, targetType) {
  const target = evnt.target
  return target && column.type === colType && target.tagName.toLowerCase() === 'input' && target.type === (targetType || colType)
}

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
    scrollbarWidth,
    scrollbarHeight,
    scrollRightToLeft,
    scrollLeftToRight,
    columnStore,
    footerData
  } = $table
  let isRightFixed = fixedType === 'right'
  let fixedColumn = columnStore[`${fixedType}List`]
  let customHeight = 0
  if (height) {
    customHeight = height === 'auto' ? parentHeight : (DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : XEUtils.toNumber(height))
    if (showFooter) {
      customHeight += scrollbarHeight + 1
    }
  }
  let style = {
    height: `${(customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1)}px`,
    width: `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, isRightFixed ? scrollbarWidth : 0)}px`
  }
  return h('div', {
    class: [`vxe-table--fixed-${fixedType}-wrapper`, {
      'scrolling--middle': isRightFixed ? scrollRightToLeft : scrollLeftToRight
    }],
    style,
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
        top: `${customHeight > 0 ? customHeight - footerHeight : tableHeight + headerHeight}px`
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
    border: { type: [Boolean, String], default: () => GlobalConfig.border },
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
    // 所有的表尾列的对齐方式
    footerAlign: { type: String, default: () => GlobalConfig.footerAlign },
    // 是否显示表头
    showHeader: { type: Boolean, default: () => GlobalConfig.showHeader },
    // （v3.0 废弃）
    startIndex: { type: Number, default: 0 },
    // 是否要高亮当前选中行
    highlightCurrentRow: { type: Boolean, default: () => GlobalConfig.highlightCurrentRow },
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: { type: Boolean, default: () => GlobalConfig.highlightHoverRow },
    // 是否要高亮当前选中列
    highlightCurrentColumn: { type: Boolean, default: () => GlobalConfig.highlightCurrentColumn },
    // 鼠标移到列是否要高亮显示
    highlightHoverColumn: { type: Boolean, default: () => GlobalConfig.highlightHoverColumn },
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
    // 给单元格附加样式
    cellStyle: [Object, Function],
    // 给表头单元格附加样式
    headerCellStyle: [Object, Function],
    // 给表尾单元格附加样式
    footerCellStyle: [Object, Function],
    // 给行附加样式
    rowStyle: [Object, Function],
    // 给表头行附加样式
    headerRowStyle: [Object, Function],
    // 给表尾行附加样式
    footerRowStyle: [Object, Function],
    // 合并行或列
    spanMethod: Function,
    // 表尾合并行或列
    footerSpanMethod: Function,
    // （v2.0 废弃）
    showAllOverflow: { type: [Boolean, String], default: () => GlobalConfig.showOverflow },
    // （v2.0 废弃）
    showHeaderAllOverflow: { type: [Boolean, String], default: () => GlobalConfig.showHeaderOverflow },
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
    rowKey: [Boolean, String],
    rowId: String,
    zIndex: Number,
    // 是否自动监听父容器变化去更新响应式表格宽高
    autoResize: Boolean,
    // 是否自动根据状态属性去更新响应式表格宽高
    syncResize: Boolean,
    // 序号配置项
    seqConfig: Object,
    // 排序配置项
    sortConfig: Object,
    // 筛选配置项
    filterConfig: Object,
    // 单选框配置
    radioConfig: Object,
    // （v3.0 废弃）
    selectConfig: Object,
    // 复选框配置项
    checkboxConfig: Object,
    // tooltip 配置项
    tooltipConfig: Object,
    // 展开行配置项
    expandConfig: Object,
    // 树形结构配置项
    treeConfig: [Boolean, Object],
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
    params: Object
  },
  provide () {
    return {
      $table: this
    }
  },
  inject: {
    $grid: {
      default: null
    }
  },
  data () {
    return {
      id: XEUtils.uniqueId(),
      tZindex: 0,
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
      // 左侧固定列是否向右滚动了
      scrollLeftToRight: false,
      // 右侧固定列是否向左滚动了
      scrollRightToLeft: false,
      // 所有列是否覆盖整个表格
      isCoverBody: false,
      // 行高
      rowHeight: 0,
      // 复选框，是否全选
      isAllSelected: false,
      // 复选框属性，有选中且非全选状态
      isIndeterminate: false,
      // 复选框属性，已选中的列
      selection: [],
      // 当前行
      currentRow: null,
      // 单选框属性，选中行
      selectRow: null,
      // 单选框属性，选中列
      currentColumn: null,
      // 表尾合计数据
      footerData: [],
      // 已展开的行
      rowExpandeds: [],
      // 懒加载中的展开行的列表
      expandLazyLoadeds: [],
      // 已展开树节点
      treeExpandeds: [],
      // 懒加载中的树节点的列表
      treeLazyLoadeds: [],
      // 树节点不确定状态的列表
      treeIndeterminates: [],
      // 当前 hover 行
      hoverRow: null,
      // 是否加载了 Loading 模块
      _isLoading: false,
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
      // 存放横向 X 可视渲染相关的信息
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
      // 存放纵向 Y 可视渲染相关的信息
      scrollYStore: {
        renderSize: 0,
        visibleSize: 0,
        offsetSize: 0,
        rowHeight: 0,
        startIndex: 0,
        visibleIndex: 0,
        topSpaceHeight: 0,
        bottomSpaceHeight: 0,
        ySpaceHeight: 0
      },
      // 存放 tooltip 相关信息
      tooltipStore: {
        visible: false,
        row: null,
        column: null,
        content: ''
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
      return Object.assign({
        message: 'default'
      }, GlobalConfig.validConfig, this.validConfig)
    },
    // 优化的参数
    optimizeOpts () {
      return Object.assign({}, GlobalConfig.optimization, this.optimization)
    },
    rowHeightMaps () {
      return Object.assign({
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      }, this.optimizeOpts.rHeights)
    },
    seqOpts () {
      return Object.assign({ startIndex: 0 }, GlobalConfig.seqConfig, this.seqConfig)
    },
    radioOpts () {
      return Object.assign({}, GlobalConfig.radioConfig, this.radioConfig)
    },
    checkboxOpts () {
      return Object.assign({}, GlobalConfig.checkboxConfig, this.checkboxConfig || this.selectConfig)
    },
    tooltipOpts () {
      return Object.assign({ leaveDelay: 300 }, GlobalConfig.tooltipConfig, this.tooltipConfig)
    },
    vaildTipOpts () {
      return Object.assign({ isArrow: false }, this.tooltipOpts)
    },
    sortOpts () {
      return Object.assign({}, GlobalConfig.sortConfig, this.sortConfig)
    },
    filterOpts () {
      return Object.assign({}, GlobalConfig.filterConfig, this.filterConfig)
    },
    // 是否使用了分组表头
    isGroup () {
      return this.collectColumn.some(column => UtilTools.hasChildrenList(column))
    },
    hasTip () {
      return VXETable._tooltip
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
    },
    expandOpts () {
      return Object.assign({}, GlobalConfig.expandConfig, this.expandConfig)
    },
    treeOpts () {
      return Object.assign({
        children: 'children',
        hasChild: 'hasChild',
        indent: 20
      }, GlobalConfig.treeConfig, this.treeConfig)
    },
    /**
     * 判断列全选的复选框是否禁用
     */
    isAllCheckboxDisabled () {
      let { tableFullData, treeConfig, checkboxOpts } = this
      let { strict, checkMethod } = checkboxOpts
      if (strict) {
        if (tableFullData.length) {
          if (checkMethod) {
            if (treeConfig) {
              // 暂时不支持树形结构
            }
            // 如果所有行都被禁用
            return tableFullData.every((row, rowIndex) => !checkMethod({ row, rowIndex, $rowIndex: rowIndex }))
          }
          return false
        }
        return true
      }
      return false
    }
  },
  watch: {
    data (value) {
      this.loadTableData(value, true).then(this.handleDefault)
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
      this.refreshColumn().then(() => {
        if (this.scrollXLoad) {
          this.updateVirtualScrollX(true)
        }
      })
      this.handleTableData(true)
      if (this.$toolbar) {
        this.$toolbar.updateColumn(tableFullColumn)
      }
      // 在 v2.0 中废弃
      if (tableFullColumn.length) {
        if (tableFullColumn.some(column => column.columnKey)) {
          UtilTools.warn('vxe.error.delProp', ['column.column-key', 'table.column-key'])
        }
      }
      // 在 v3.0 中废弃 prop/label
      if (tableFullColumn.length) {
        let cIndex = Math.floor((tableFullColumn.length - 1) / 2)
        if (tableFullColumn[cIndex].prop) {
          UtilTools.warn('vxe.error.delProp', ['prop', 'field'])
        }
        if (tableFullColumn[cIndex].label) {
          UtilTools.warn('vxe.error.delProp', ['label', 'title'])
        }
      }
      if (this.treeConfig && tableFullColumn.some(column => column.fixed) && tableFullColumn.some(column => column.type === 'expand')) {
        UtilTools.warn('vxe.error.treeFixedExpand')
      }
    },
    tableColumn () {
      this.analyColumnWidth()
    },
    height () {
      this.$nextTick(() => this.recalculate(true))
    },
    loading () {
      if (!this._isLoading) {
        this._isLoading = true
      }
    },
    syncResize (value) {
      if (value) {
        this.$nextTick(() => this.recalculate(true))
      }
    }
  },
  created () {
    let { scrollXStore, scrollYStore, optimizeOpts, ctxMenuOpts, showOverflow, radioOpts, checkboxOpts, treeConfig, treeOpts, editConfig, loading, showAllOverflow, showHeaderAllOverflow } = this
    let { scrollX, scrollY } = optimizeOpts
    if (loading) {
      this._isLoading = true
    }
    if (scrollY) {
      Object.assign(scrollYStore, {
        startIndex: 0,
        visibleIndex: 0,
        renderSize: XEUtils.toNumber(scrollY.rSize),
        offsetSize: XEUtils.toNumber(scrollY.oSize)
      })
    }
    if (scrollX) {
      Object.assign(scrollXStore, {
        startIndex: 0,
        visibleIndex: 0,
        renderSize: XEUtils.toNumber(scrollX.rSize),
        offsetSize: XEUtils.toNumber(scrollX.oSize)
      })
    }
    if (!UtilTools.getRowkey(this)) {
      UtilTools.error('vxe.error.emptyProp', ['row-id'])
    }
    if (this.startIndex) {
      UtilTools.warn('vxe.error.delProp', ['start-index', 'seq-config.startIndex'])
    }
    if (XEUtils.isBoolean(showAllOverflow)) {
      UtilTools.warn('vxe.error.delProp', ['show-all-overflow', 'show-overflow'])
    }
    if (XEUtils.isBoolean(showHeaderAllOverflow)) {
      UtilTools.warn('vxe.error.delProp', ['show-header-all-overflow', 'show-header-overflow'])
    }
    if (radioOpts.labelProp) {
      UtilTools.warn('vxe.error.delProp', ['radio-config.labelProp', 'radio-config.labelField'])
    }
    if (this.selectConfig) {
      UtilTools.warn('vxe.error.delProp', ['select-config', 'checkbox-config'])
    }
    if (treeConfig && treeOpts.line && !showOverflow) {
      UtilTools.warn('vxe.error.treeLineReqProp', ['show-overflow'])
    }
    if (checkboxOpts.checkProp) {
      UtilTools.warn('vxe.error.delProp', ['select-config.checkProp', 'select-config.checkField'])
    }
    if (checkboxOpts.labelProp) {
      UtilTools.warn('vxe.error.delProp', ['select-config.labelProp', 'select-config.labelField'])
    }
    if (this.sortMethod) {
      UtilTools.warn('vxe.error.delProp', ['sort-method', 'sort-config.sortMethod'])
    }
    if (this.remoteSort) {
      UtilTools.warn('vxe.error.delProp', ['remote-sort', 'sort-config.remote'])
    }
    if (this.remoteFilter) {
      UtilTools.warn('vxe.error.delProp', ['remote-filter', 'filter-config.remote'])
    }
    ['header', 'body', 'footer'].forEach(name => {
      if (ctxMenuOpts[name] && ctxMenuOpts[name].visibleMethod) {
        UtilTools.warn('vxe.error.delProp', [`context-menu.${name}.visibleMethod`, 'context-menu.visibleMethod'])
      }
    })
    this.lastScrollLeft = 0
    this.lastScrollTop = 0
    this.afterFullData = []
    this.selectReserveRowMap = {}// 复选框属性，已选中保留的行
    this.fullAllDataRowMap = new Map()
    this.fullAllDataRowIdData = {}
    this.fullDataRowMap = new Map()
    this.fullDataRowIdData = {}
    this.fullColumnMap = new Map()
    this.fullColumnIdData = {}
    this.loadTableData(this.data, true).then(() => {
      if (checkboxOpts.key) {
        UtilTools.warn('vxe.error.delProp', ['select-config.key', 'row-id'])
      } else if (treeConfig && treeOpts.key) {
        UtilTools.warn('vxe.error.delProp', ['tree-config.key', 'row-id'])
      } else if (editConfig && editConfig.key) {
        UtilTools.warn('vxe.error.delProp', ['edit-config.key', 'row-id'])
      }
      this.handleDefault()
    })
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
    GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent)
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent)
    this.preventEvent(null, 'created', { $table: this })
  },
  mounted () {
    if (this.autoResize) {
      ResizeEvent.on(this, this.getParentElem(), () => this.recalculate(true))
    }
    document.body.appendChild(this.$refs.tableWrapper)
    this.preventEvent(null, 'mounted', { $table: this })
  },
  activated () {
    this.refreshScroll()
    this.preventEvent(null, 'activated', { $table: this })
  },
  deactivated () {
    this.preventEvent(null, 'deactivated', { $table: this })
  },
  beforeDestroy () {
    let tableWrapper = this.$refs.tableWrapper
    if (tableWrapper && tableWrapper.parentNode) {
      tableWrapper.parentNode.removeChild(tableWrapper)
    }
    if (ResizeEvent.off) {
      ResizeEvent.off(this, this.getParentElem())
    }
    this.closeFilter()
    this.closeMenu()
    this.clearAll()
    this.preventEvent(null, 'beforeDestroy', { $table: this })
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
    GlobalEvent.off(this, 'contextmenu')
    GlobalEvent.off(this, 'mousewheel')
    GlobalEvent.off(this, 'keydown')
    GlobalEvent.off(this, 'resize')
    this.preventEvent(null, 'destroyed', { $table: this })
  },
  render (h) {
    let {
      _e,
      id,
      isCoverBody,
      tableData,
      tableColumn,
      visibleColumn,
      collectColumn,
      isGroup,
      hasFilter,
      isResizable,
      isCtxMenu,
      loading,
      stripe,
      _isLoading,
      showHeader,
      headerHeight,
      height,
      border,
      treeOpts,
      treeConfig,
      mouseConfig,
      vSize,
      validOpts,
      editRules,
      showFooter,
      footerMethod,
      overflowX,
      overflowY,
      scrollXLoad,
      scrollYLoad,
      scrollbarHeight,
      highlightHoverRow,
      highlightHoverColumn,
      editConfig,
      optimizeOpts,
      vaildTipOpts,
      tooltipOpts,
      columnStore,
      filterStore,
      ctxMenuStore,
      footerData,
      hasTip
    } = this
    let { leftList, rightList } = columnStore
    return h('div', {
      class: ['vxe-table', vSize ? `size--${vSize}` : '', border && XEUtils.isString(border) ? `b--style-${border}` : '', {
        'vxe-editable': editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'is--group': isGroup,
        'has--height': height,
        'has--tree-line': treeConfig && treeOpts.line,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        't--animat': optimizeOpts.animat,
        't--stripe': stripe,
        't--border': border,
        't--selected': mouseConfig && mouseConfig.selected,
        't--checked': mouseConfig && mouseConfig.checked,
        'row--highlight': highlightHoverRow,
        'column--highlight': highlightHoverColumn,
        'is--cover': isCoverBody,
        'scroll--y': overflowY,
        'scroll--x': overflowX,
        'virtual--x': scrollXLoad,
        'virtual--y': scrollYLoad
      }]
    }, [
      /**
       * 隐藏列
       */
      h('div', {
        class: 'vxe-table-hidden-column',
        ref: 'hideColumn'
      }, this.$slots.default),
      h('div', {
        class: 'vxe-table--main-wrapper'
      }, [
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
        }) : null
      ]),
      /**
       * 左侧固定列
       */
      leftList && leftList.length && overflowX ? renderFixed(h, this, 'left') : _e(),
      /**
       * 右侧固定列
       */
      rightList && rightList.length && overflowX ? renderFixed(h, this, 'right') : _e(),
      /**
       * 空数据
       */
      !loading && !tableData.length ? h('div', {
        ref: 'emptyPlaceholder',
        class: 'vxe-table--empty-placeholder',
        style: height ? null : {
          top: `${headerHeight}px`
        }
      }, [
        h('div', {
          class: 'vxe-table--empty-content'
        }, this.$scopedSlots.empty ? this.$scopedSlots.empty.call(this, { $table: this }, h) : GlobalConfig.i18n('vxe.table.emptyText'))
      ]) : _e(),
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
       * 边框线
       */
      h('div', {
        class: 'vxe-table--border-line'
      }),
      /**
       * 加载中
       */
      _isLoading ? h('vxe-table-loading', {
        props: {
          visible: loading
        }
      }) : _e(),
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
      h('div', {
        class: `vxe-table${id}-wrapper ${this.$vnode.data.staticClass || ''}`,
        ref: 'tableWrapper'
      }, [
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
          props: tooltipOpts,
          on: tooltipOpts.enterable ? {
            leave: this.handleTooltipLeaveEvent
          } : null
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
    getParentElem () {
      return this.$grid ? this.$grid.$el.parentNode : this.$el.parentNode
    },
    getParentHeight () {
      return this.$grid ? this.$grid.getParentHeight() : this.getParentElem().clientHeight
    },
    /**
     * 获取需要排除的高度
     */
    getExcludeHeight () {
      return this.$grid ? this.$grid.getExcludeHeight() : 0
    },
    clearAll () {
      this.clearSort()
      this.clearFilter()
      this.clearCurrentRow()
      this.clearCurrentColumn()
      this.clearSelection()
      this.clearSelectReserve()
      this.clearRowExpand()
      this.clearTreeExpand()
      this.clearChecked()
      this.clearSelected()
      this.clearActived()
      return this.clearScroll()
    },
    refreshData () {
      return this.$nextTick().then(() => {
        this.tableData = []
        return this.$nextTick().then(() => this.loadTableData(this.tableFullData))
      })
    },
    updateData () {
      return this.handleTableData(true).then(this.updateFooter).then(this.recalculate)
    },
    handleTableData (force) {
      let { scrollYLoad, scrollYStore } = this
      let fullData = force ? this.updateAfterFullData() : this.afterFullData
      this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0)
      return this.$nextTick()
    },
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
    loadData (datas) {
      return this.loadTableData(datas)
    },
    reloadData (datas) {
      return this.clearAll()
        .then(() => this.loadTableData(datas))
        .then(this.handleDefault)
    },
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
    // 更新列的 Map
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
    getColumnNode (cell) {
      if (cell) {
        let { fullColumnIdData, tableFullColumn } = this
        let colid = cell.getAttribute('data-colid')
        let { column, index } = fullColumnIdData[colid]
        return { item: column, index, items: tableFullColumn }
      }
      return null
    },
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
    getColumnMapIndex (column) {
      return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1
    },
    getColumnIndex (column) {
      return this.getColumnMapIndex(column)
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
    insert (records) {
      return this.insertAt(records)
    },
    /**
     * 从指定行插入数据
     */
    insertAt (records, row) {
      let { afterFullData, editStore, scrollYLoad, tableFullData, treeConfig } = this
      if (treeConfig) {
        throw new Error(UtilTools.getLog('vxe.error.noTree', ['insert']))
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
      this.handleTableData()
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
      let { afterFullData, tableFullData, editStore, treeConfig, checkboxOpts, selection, hasInsertByRow, scrollYLoad } = this
      let { removeList, insertList } = editStore
      let property = checkboxOpts.checkField || checkboxOpts.checkProp
      let rest = []
      let nowData = afterFullData
      if (treeConfig) {
        throw new Error(UtilTools.getLog('vxe.error.noTree', ['remove']))
      }
      if (!rows) {
        rows = tableFullData
      } else if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      // 如果是新增，则保存记录
      rows.forEach(row => {
        if (!hasInsertByRow(row)) {
          removeList.push(row)
        }
      })
      // 如果绑定了复选框属性，则更新状态
      if (!property) {
        XEUtils.remove(selection, row => rows.indexOf(row) > -1)
      }
      // 从数据源中移除
      if (tableFullData === rows) {
        rows = rest = tableFullData.slice(0)
        tableFullData.length = 0
        nowData.length = 0
      } else {
        rest = XEUtils.remove(tableFullData, row => rows.indexOf(row) > -1)
        XEUtils.remove(nowData, row => rows.indexOf(row) > -1)
      }
      // 从新增中移除已删除的数据
      XEUtils.remove(insertList, row => rows.indexOf(row) > -1)
      this.handleTableData()
      this.updateCache()
      this.checkSelectionStatus()
      if (scrollYLoad) {
        this.updateScrollYSpace()
      }
      return this.$nextTick().then(() => {
        this.recalculate()
        return { row: rest && rest.length ? rest[rest.length - 1] : null, rows: rest }
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
      UtilTools.warn('vxe.error.delFunc', ['revert', 'revertData'])
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
              XEUtils.set(row, field, XEUtils.clone(XEUtils.get(oRow, field), true))
            } else {
              XEUtils.destructuring(row, XEUtils.clone(oRow, true))
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
    hasInsertByRow (row) {
      let { treeConfig, treeOpts, tableSourceData } = this
      if (treeConfig) {
        return XEUtils.findTree(tableSourceData, item => item === row, treeOpts)
      }
      return this.getRowIndex(row) === -1
    },
    // 在 v3.0 中废弃 hasRowChange
    hasRowChange (row, field) {
      UtilTools.warn('vxe.error.delFunc', ['hasRowChange', 'isUpdateByRow'])
      return this.isUpdateByRow(row, field)
    },
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
     * 获取表格所有列
     */
    getColumns (columnIndex) {
      let columns = this.visibleColumn
      return arguments.length ? columns[columnIndex] : columns.slice(0)
    },
    getColid (column) {
      let fullColumnMap = this.fullColumnMap
      return fullColumnMap.has(column) ? fullColumnMap.get(column).colid : null
    },
    getColumnById (colid) {
      let fullColumnIdData = this.fullColumnIdData
      return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null
    },
    getColumnByField (field) {
      return XEUtils.find(this.tableFullColumn, column => column.property === field)
    },
    /**
     * 获取表格可视列
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
     * 获取表格所有数据
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
     * 获取新增的临时数据
     */
    getInsertRecords () {
      const insertList = this.editStore.insertList
      const insertRecords = []
      if (insertList.length) {
        this.tableFullData.forEach(row => {
          if (insertList.indexOf(row) > -1) {
            insertRecords.push(row)
          }
        })
      }
      return insertRecords
    },
    /**
     * 获取已删除的数据
     */
    getRemoveRecords () {
      return this.editStore.removeList
    },
    /**
     * 获取选中数据
     */
    getSelectRecords () {
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
     * 获取更新数据
     * 只精准匹配 row 的更改
     * 如果是树表格，子节点更改状态不会影响父节点的更新状态
     */
    getUpdateRecords () {
      let { tableFullData, isUpdateByRow, treeConfig, treeOpts } = this
      if (treeConfig) {
        return XEUtils.filterTree(tableFullData, row => isUpdateByRow(row), treeOpts)
      }
      return tableFullData.filter(row => isUpdateByRow(row))
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
    getRowById (rowid) {
      let fullDataRowIdData = this.fullDataRowIdData
      return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null
    },
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
      this.$nextTick(this.recalculate)
    },
    /**
     * 动态列处理
     */
    mergeCustomColumn (customColumns) {
      this.isUpdateCustoms = true
      this.tableFullColumn.forEach(column => {
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
      this.$emit('update:customs', this.tableFullColumn)
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
      if (this.$toolbar) {
        this.$toolbar.handleCustoms()
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
      let { collectColumn, tableFullColumn, isGroup, columnStore, scrollXStore, optimizeOpts } = this
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
        if (!this.showHeaderOverflow) {
          UtilTools.warn('vxe.error.scrollXReqProp', ['show-header-overflow'])
        }
        // if (this.resizable || visibleColumn.some(column => column.resizable)) {
        //   UtilTools.warn('vxe.error.scrollXNotResizable')
        // }
        scrollXStore.startIndex = 0
        scrollXStore.visibleIndex = 0
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
          } else if (DomTools.isPx(column.width || columnWidth)) {
            pxList.push(column)
          } else if (DomTools.isScale(column.width || columnWidth)) {
            scaleList.push(column)
          } else if (DomTools.isPx(column.minWidth || columnMinWidth)) {
            pxMinList.push(column)
          } else if (DomTools.isScale(column.minWidth || columnMinWidth)) {
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
      let { tableBody, tableHeader, tableFooter } = this.$refs
      let bodyElem = tableBody ? tableBody.$el : null
      let headerElem = tableHeader ? tableHeader.$el : null
      let footerElem = tableFooter ? tableFooter.$el : null
      if (bodyElem) {
        let bodyWidth = bodyElem.clientWidth
        // let tableWidth = this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth)
        this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth)
        if (refull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          return this.computeScrollLoad().then(() => {
            bodyWidth = bodyElem.clientWidth
            // if (bodyWidth !== tableWidth) {
            this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth)
            // }
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
      return tableWidth
    },
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
      let { $el, $refs, editStore, ctxMenuStore, editConfig = {}, filterStore, getRowNode } = this
      let { actived } = editStore
      let { filterWrapper, validTip } = $refs
      if (filterWrapper) {
        if (DomTools.getEventTargetNode(evnt, this.$el, 'vxe-filter-wrapper').flag) {
          // 如果点击了筛选按钮
        } else if (DomTools.getEventTargetNode(evnt, filterWrapper.$el).flag) {
          // 如果点击筛选容器
        } else {
          this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter)
        }
      }
      // 如果已激活了编辑状态
      if (actived.row) {
        if (!(editConfig.autoClear === false)) {
          if (validTip && DomTools.getEventTargetNode(evnt, validTip.$el).flag) {
            // 如果是激活状态，且点击了校验提示框
          } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
            this.preventEvent(evnt, 'event.clearActived', actived.args, () => {
              let isClear
              if (editConfig.mode === 'row') {
                let rowNode = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--row')
                // row 方式，如果点击了不同行
                isClear = rowNode.flag ? getRowNode(rowNode.targetElem).item !== getRowNode(actived.args.cell.parentNode).item : 0
              } else {
              // cell 方式，如果是非编辑列
                isClear = !DomTools.getEventTargetNode(evnt, $el, 'col--edit').flag
              }
              if (
                isClear ||
                // 如果点击了当前表格之外
                !DomTools.getEventTargetNode(evnt, this.$el).flag
              ) {
                // this.triggerValidate('blur').then(a => {
                // 保证 input 的 change 事件能先触发之后再清除
                setTimeout(() => this.clearActived(evnt))
                // }).catch(e => e)
              }
            })
          }
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
          let params
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
          let isC = keyCode === 67
          let isV = keyCode === 86
          let isX = keyCode === 88
          let isF2 = keyCode === 113
          let isCtrlKey = evnt.ctrlKey
          let isShiftKey = evnt.shiftKey
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
          } else if (isSpacebar && (keyboardConfig.isArrow || keyboardConfig.isTab) && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'selection' || selected.column.type === 'radio')) {
          // 在 v3.0 中废弃 selection
          // 空格键支持选中复选列
            evnt.preventDefault()
            // 在 v3.0 中废弃 selection
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
          } else if (keyboardConfig.isCut && isCtrlKey && (isX || isC || isV)) {
          // 如果开启复制功能
            if (isX || isC) {
              this.handleCopyed(isX, evnt)
            } else {
              this.handlePaste(evnt)
            }
          } else if (keyboardConfig.isEdit && !isCtrlKey && ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222) || keyCode === 32)) {
          // 如果是按下非功能键之外允许直接编辑
            if (selected.row || selected.column) {
              if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
                UtilTools.setCellValue(selected.row, selected.column, null)
                this.handleActived(selected.args, evnt)
              }
            }
          }
        })
      }
    },
    // 处理 Tab 键移动
    moveTabSelected (args, isLeft, evnt) {
      let { afterFullData, visibleColumn, editConfig, isSeqColumn } = this
      let targetRow
      let targetRowIndex
      let targetColumn
      let targetColumnIndex
      let params = Object.assign({}, args)
      let rowIndex = afterFullData.indexOf(params.row)
      let columnIndex = visibleColumn.indexOf(params.column)
      evnt.preventDefault()
      if (isLeft) {
        // 向左
        for (let len = columnIndex - 1; len >= 0; len--) {
          if (!isSeqColumn(visibleColumn[len])) {
            targetColumnIndex = len
            targetColumn = visibleColumn[len]
            break
          }
        }
        if (!targetColumn && rowIndex > 0) {
          // 如果找不到从上一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex - 1
          targetRow = afterFullData[targetRowIndex]
          for (let len = visibleColumn.length - 1; len >= 0; len--) {
            if (!isSeqColumn(visibleColumn[len])) {
              targetColumnIndex = len
              targetColumn = visibleColumn[len]
              break
            }
          }
        }
      } else {
        // 向右
        for (let index = columnIndex + 1; index < visibleColumn.length; index++) {
          if (!isSeqColumn(visibleColumn[index])) {
            targetColumnIndex = index
            targetColumn = visibleColumn[index]
            break
          }
        }
        if (!targetColumn && rowIndex < afterFullData.length - 1) {
          // 如果找不到从下一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex + 1
          targetRow = afterFullData[targetRowIndex]
          for (let index = 0; index < visibleColumn.length; index++) {
            if (!isSeqColumn(visibleColumn[index])) {
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
      let { currentRow, treeConfig, treeOpts, afterFullData } = this
      let targetRow
      evnt.preventDefault()
      if (treeConfig) {
        let { index, items } = XEUtils.findTree(afterFullData, item => item === currentRow, treeOpts)
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
    // 处理方向键移动
    moveSelected (args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      let { afterFullData, visibleColumn } = this
      let params = Object.assign({}, args)
      evnt.preventDefault()
      if (isUpArrow && params.rowIndex) {
        params.rowIndex -= 1
        params.row = afterFullData[params.rowIndex]
      } else if (isDwArrow && params.rowIndex < afterFullData.length - 1) {
        params.rowIndex += 1
        params.row = afterFullData[params.rowIndex]
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
          if (ctxMenuStore.visible && this.$refs.ctxWrapper && DomTools.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
            evnt.preventDefault()
            return
          }
        }
        for (let index = 0; index < layoutList.length; index++) {
          let layout = layoutList[index]
          let columnTargetNode = DomTools.getEventTargetNode(evnt, this.$el, `vxe-${layout}--column`)
          let params = { type: layout, $table: this, columns: this.visibleColumn.slice(0) }
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
          } else if (DomTools.getEventTargetNode(evnt, this.$el, `vxe-table--${layout}-wrapper`).flag) {
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
      if (config) {
        let { options, disabled } = config
        let visibleMethod = config.visibleMethod || ctxMenuOpts.visibleMethod
        if (disabled) {
          evnt.preventDefault()
        } else if (options && options.length) {
          params.options = options
          this.preventEvent(evnt, 'event.showMenu', params, null, () => {
            if (!visibleMethod || visibleMethod(params, evnt)) {
              evnt.preventDefault()
              this.updateZindex()
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
                  zIndex: this.tZindex,
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
          })
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
        let ctxMenuMethod = Menus.get(menu.code)
        let params = Object.assign({ menu, $table: this }, this.ctxMenuStore.args)
        if (ctxMenuMethod) {
          ctxMenuMethod.call(this, params, evnt)
        }
        UtilTools.emitEvent(this, 'context-menu-click', [Object.assign({ menu, $table: this }, this.ctxMenuStore.args), evnt])
        this.closeMenu()
      }
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
          tooltip.toVisible(cell, content)
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
     * 处理复选框默认勾选
     */
    handleSelectionDefChecked () {
      let { fullDataRowIdData, checkboxOpts } = this
      let { checkAll, checkRowKeys } = checkboxOpts
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
      rows.forEach(row => this.handleSelectRow(null, { row }, !!value))
      return this.$nextTick()
    },
    isCheckedByRow (row) {
      let { checkField: property } = this.checkboxOpts
      if (property) {
        return XEUtils.get(row, property)
      }
      return this.selection.indexOf(row) > -1
    },
    /**
     * 多选，行选中处理
     * value 选中true 不选false 不确定-1
     */
    handleSelectRow (evnt, { row }, value) {
      let { selection, tableFullData, treeConfig, treeOpts, treeIndeterminates, checkboxOpts } = this
      let { checkStrictly, checkMethod } = checkboxOpts
      let property = checkboxOpts.checkField || checkboxOpts.checkProp
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
          let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeOpts)
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
            return this.handleSelectRow(evnt, { row: matchObj.parent }, parentStatus)
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
          let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeOpts)
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
            return this.handleSelectRow(evnt, { row: matchObj.parent }, parentStatus)
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
        this.handleSelectRow(null, params, value)
      }
    },
    triggerCheckRowEvent (evnt, params, value) {
      let { checkMethod } = this.checkboxOpts
      if (!checkMethod || checkMethod({ row: params.row, rowIndex: params.rowIndex, $rowIndex: params.$rowIndex })) {
        this.handleSelectRow(evnt, params, value)
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
    setAllSelection (value) {
      let { tableFullData, editStore, treeConfig, treeOpts, selection, selectReserveRowMap, checkboxOpts } = this
      let { reserve, checkStrictly, checkMethod } = checkboxOpts
      let { insertList } = editStore
      let property = checkboxOpts.checkField || checkboxOpts.checkProp
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
            XEUtils.eachTree(tableFullData, value ? setValFn : clearValFn, treeOpts)
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
              }, treeOpts)
            } else {
              if (checkMethod) {
                XEUtils.eachTree(tableFullData, (row, $rowIndex) => {
                  if (checkMethod({ row, $rowIndex }) ? 0 : selection.indexOf(row) > -1) {
                    selectRows.push(row)
                  }
                }, treeOpts)
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
      let { tableFullData, editStore, selection, treeIndeterminates, checkboxOpts } = this
      let { checkStrictly, checkMethod } = checkboxOpts
      let property = checkboxOpts.checkField || checkboxOpts.checkProp
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
    /**
     * 获取保留选中的行
     */
    getSelectReserveRecords () {
      let { fullDataRowIdData, selectReserveRowMap, checkboxOpts } = this
      let reserveSelection = []
      if (checkboxOpts.reserve) {
        Object.keys(selectReserveRowMap).forEach(rowid => {
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
    clearSelection () {
      let { tableFullData, treeConfig, treeOpts, checkboxOpts } = this
      let property = checkboxOpts.checkField || checkboxOpts.checkProp
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
    handleRadioDefChecked () {
      let { radioOpts, fullDataRowIdData } = this
      let { checkRowKey: rowid } = radioOpts
      if (rowid) {
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
     * 单选，设置某一行为选中状态，如果调不加参数，则会取消目前高亮行的选中状态
     */
    setCurrentRow (row) {
      if (this.highlightCurrentRow) {
        this.clearCurrentColumn()
        this.currentRow = row
      }
      return this.$nextTick()
    },
    setRadioRow (row) {
      this.selectRow = row
      return this.$nextTick()
    },
    clearCurrentRow () {
      this.currentRow = null
      this.hoverRow = null
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
      this.hoverRow = row
    },
    clearHoverRow () {
      this.hoverRow = null
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
              }, browse.msie ? 80 : 40, { leading: true, trailing: true })
              document.onmousemove = updateEvent
              document.onmouseup = function (evnt) {
                document.onmousemove = domMousemove
                document.onmouseup = domMouseup
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
        }
      }
      this.isActivated = true
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
          }, browse.msie ? 80 : 40, { leading: true, trailing: true })
          document.onmousemove = updateEvent
          document.onmouseup = function (evnt) {
            document.onmousemove = domMousemove
            document.onmouseup = domMouseup
            checked.rows = checked.tRows
            checked.columns = checked.tColumns
          }
        }
      }
      this.isActivated = true
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
      return this.setCurrentColumn(column, true)
    },
    setCurrentColumn (column) {
      if (this.highlightCurrentColumn) {
        this.clearCurrentRow()
        this.currentColumn = column
      }
      return this.$nextTick()
    },
    clearCurrentColumn () {
      this.currentColumn = null
    },
    /**
     * 列点击事件
     * 如果是单击模式，则激活为编辑状态
     * 如果是双击模式，则单击后选中状态
     */
    triggerCellClickEvent (evnt, params) {
      let { $el, highlightCurrentRow, editStore, radioOpts, expandOpts, treeOpts, editConfig, checkboxOpts } = this
      let { actived } = editStore
      let { column, row } = params
      // 解决 checkbox 重复触发两次问题
      if (isTargetRadioOrCheckbox(evnt, column, 'radio') || isTargetRadioOrCheckbox(evnt, column, 'checkbox', 'checkbox') || isTargetRadioOrCheckbox(evnt, column, 'selection', 'checkbox')) {
        // 在 v3.0 中废弃 selection
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
      if ((!column.treeNode || !DomTools.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag) && (column.type !== 'expand' || !DomTools.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag)) {
        // 如果是高亮行
        if (highlightCurrentRow) {
          if (radioOpts.trigger === 'row' || (!DomTools.getEventTargetNode(evnt, $el, 'vxe-checkbox').flag && !DomTools.getEventTargetNode(evnt, $el, 'vxe-radio').flag)) {
            this.triggerCurrentRowEvent(evnt, params)
          }
        }
        // 如果是单选框
        if ((radioOpts.trigger === 'row' || (column.type === 'radio' && radioOpts.trigger === 'cell')) && !DomTools.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
          this.triggerRadioRowEvent(evnt, params)
        }
        // 如果是复选框
        if ((checkboxOpts.trigger === 'row' || ((column.type === 'checkbox' || column.type === 'selection') && checkboxOpts.trigger === 'cell')) && !DomTools.getEventTargetNode(evnt, params.cell, 'vxe-checkbox').flag) {
          // 在 v3.0 中废弃 selection
          this.handleToggleCheckRowEvent(params, evnt)
        }
        if (editConfig) {
          if (editConfig.trigger === 'click') {
            if (!actived.args || row !== actived.row || column !== actived.column) {
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
          } else if (editConfig.trigger === 'dblclick') {
            if (editConfig.mode === 'row' && actived.row === row) {
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
            if (editConfig.mode === 'row') {
              this.triggerValidate('blur').catch(e => e).then(() => {
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
      let { editRender } = column
      if (editRender && cell) {
        if (editConfig.mode === 'row' ? actived.row !== row : (actived.row !== row || actived.column !== column)) {
          // 判断是否禁用编辑
          let type = 'edit-disabled'
          if (!activeMethod || activeMethod(params)) {
            this.clostTooltip()
            this.clearCopyed(evnt)
            this.clearChecked(evnt)
            this.clearSelected(evnt)
            this.clearActived(evnt)
            type = 'edit-actived'
            column.renderHeight = cell.offsetHeight
            actived.args = params
            actived.row = row
            actived.column = column
            this.$nextTick(() => {
              this.handleFocus(params, evnt)
            })
          }
          UtilTools.emitEvent(this, type, [params, evnt])
        } else {
          column.renderHeight = cell.offsetHeight
          actived.args = params
          if (actived.column !== column) {
            this.clearValidate()
          }
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
        this.updateFooter()
        UtilTools.emitEvent(this, 'edit-closed', [args, evnt])
      }
      actived.args = null
      actived.row = null
      actived.column = null
      return this.clearValidate()
    },
    getActiveRow () {
      let { $el, editStore, afterFullData } = this
      let { args, row } = editStore.actived
      if (args && afterFullData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
        return Object.assign({}, args)
      }
      return null
    },
    // v3 废弃
    hasActiveRow (row) {
      UtilTools.warn('vxe.error.delFunc', ['hasActiveRow', 'isActiveByRow'])
      return this.isActiveByRow(row)
    },
    /**
     * 判断行是否为激活编辑状态
     * @param {Row} row 行对象
     */
    isActiveByRow (row) {
      return this.editStore.actived.row === row
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
      let { mouseConfig = {}, editConfig, editStore } = this
      let { actived, selected } = editStore
      let { row, column } = params
      let selectMethod = () => {
        if ((mouseConfig.selected || mouseConfig.checked) && (selected.row !== row || selected.column !== column)) {
          if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
            this.clearChecked(evnt)
            this.clearActived(evnt)
            selected.args = params
            selected.row = row
            selected.column = column
            // 如果配置了批量选中功能，则为批量选中状态
            if (mouseConfig.checked) {
              let select = DomTools.getCellIndexs(params.cell)
              this.handleChecked(select, select, evnt)
            }
          }
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
      let { editStore } = this
      let { checked } = editStore
      checked.rows = []
      checked.columns = []
      checked.tRows = []
      checked.tColumns = []
      return this.$nextTick()
    },
    getMouseSelecteds () {
      let { args, column } = this.editStore.selected
      if (args && column) {
        return Object.assign({}, args)
      }
      return null
    },
    getMouseCheckeds () {
      let { checked } = this.editStore
      let { rows, columns } = checked
      return {
        columns,
        rows
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
        this.handleChecked(start, end, evnt)
      }
    },
    /**
     * 处理聚焦
     */
    handleFocus (params, evnt) {
      let { row, column, cell } = params
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
        } else {
          // 显示到可视区中
          this.scrollToRow(row, column)
        }
      }
    },
    /**
     * 激活行编辑
     */
    setActiveRow (row) {
      return this.setActiveCell(row, XEUtils.find(this.visibleColumn, column => column.editRender).property)
    },
    /**
     * 激活单元格编辑
     */
    setActiveCell (row, field) {
      return this.scrollToRow(row).then(() => {
        if (row && field) {
          let column = XEUtils.find(this.visibleColumn, column => column.property === field)
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
        let column = XEUtils.find(visibleColumn, column => column.property === field)
        let rowIndex = tableData.indexOf(row)
        if (rowIndex > -1 && column) {
          let cell = DomTools.getCell(this, { row, rowIndex, column })
          let params = { row, rowIndex, column, columnIndex: visibleColumn.indexOf(column), cell }
          this.handleSelected(params, {})
        }
      }
      return this.$nextTick()
    },
    handleDefaultSort () {
      let defaultSort = this.sortOpts.defaultSort
      if (defaultSort) {
        let { field, order } = defaultSort
        if (field && order) {
          this.sort(field, order)
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
        }
      }
      return this.$nextTick()
    },
    clearSort () {
      this.tableFullColumn.forEach(column => {
        column.order = null
      })
      return this.handleTableData(true)
    },
    getSortColumn () {
      return this.visibleColumn.fild(column => column.sortable && column.order)
    },
    filter (field, callback) {
      let column = this.getColumnByField(field)
      if (column) {
        let filters = column.filters
        if (callback) {
          let rest = callback(filters)
          if (XEUtils.isArray(rest)) {
            column.filters = UtilTools.getFilters(rest)
          }
        }
        return this.$nextTick().then(() => filters)
      }
      return this.$nextTick()
    },
    /**
     * 点击筛选事件
     */
    triggerFilterEvent (evnt, column, params) {
      let { $refs, filterStore } = this
      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false
      } else {
        let filterWrapper = $refs.filterWrapper
        let bodyElem = $refs.tableBody.$el
        let { target: targetElem, pageX } = evnt
        let { visibleWidth } = DomTools.getDomNode()
        Object.assign(filterStore, {
          args: params,
          multiple: column.filterMultiple,
          options: column.filters,
          column,
          style: null,
          visible: true
        })
        filterStore.isAllSelected = filterStore.options.every(item => item.checked)
        filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(item => item.checked)
        this.$nextTick(() => {
          let filterWrapperElem = filterWrapper.$el
          let filterWidth = filterWrapperElem.offsetWidth
          let centerWidth = filterWidth / 2
          let minMargin = 32
          let left, right
          let style = {
            top: `${targetElem.offsetTop + targetElem.offsetParent.offsetTop + targetElem.offsetHeight + 8}px`
          }
          if (column.fixed === 'left') {
            left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth
          } else if (column.fixed === 'right') {
            right = (targetElem.offsetParent.offsetWidth - targetElem.offsetLeft) + (targetElem.offsetParent.offsetParent.offsetWidth - targetElem.offsetParent.offsetLeft) - column.renderWidth - centerWidth
          } else {
            left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth - bodyElem.scrollLeft
          }
          if (left) {
            let overflowWidth = (pageX + filterWidth - centerWidth + minMargin) - visibleWidth
            if (overflowWidth > 0) {
              left -= overflowWidth
            }
            style.left = `${Math.max(minMargin, left)}px`
          } else if (right) {
            let overflowWidth = (pageX + filterWidth - centerWidth + minMargin) - visibleWidth
            if (overflowWidth > 0) {
              right += overflowWidth
            }
            style.right = `${right}px`
          }
          filterStore.style = style
        })
      }
    },
    // 确认筛选
    confirmFilterEvent (evnt) {
      let { visibleColumn, filterStore, remoteFilter, filterOpts, scrollXLoad, scrollYLoad } = this
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
      if (!(filterOpts.remote || remoteFilter)) {
        this.handleTableData(true)
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
      this.updateFooter()
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
      return this.updateData()
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
    // 在 v3.0 中废弃 hasRowExpand
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
            if (this.isCheckedByRow(row)) {
              this.setSelection(childs, true)
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
    clearTreeExpand () {
      const isExists = this.treeExpandeds.length
      this.treeExpandeds = []
      return this.$nextTick().then(() => isExists ? this.recalculate() : 0)
    },
    /**
     * 是否启用了横向 X 可视渲染
     */
    isScrollXLoad () {
      UtilTools.warn('vxe.error.delFunc', ['isScrollXLoad', 'getVirtualScroller'])
      return this.scrollXLoad
    },
    /**
     * 是否启用了纵向 Y 可视渲染
     */
    isScrollYLoad () {
      UtilTools.warn('vxe.error.delFunc', ['isScrollYLoad', 'getVirtualScroller'])
      return this.scrollYLoad
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
    triggerScrollYEvent: XEUtils.debounce(function (evnt) {
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
    }, debounceScrollYDuration, { leading: false, trailing: true }),
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
              scrollYStore.renderSize = visibleYSize * (browse.edge ? 10 : 8)
            }
            this.updateScrollYData()
          } else {
            this.updateScrollYSpace()
          }
        }
        return this.$nextTick()
      })
    },
    updateScrollXData () {
      let { visibleColumn, scrollXStore } = this
      this.tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize)
      this.updateScrollXSpace()
    },
    // 更新横向 X 可视渲染上下剩余空间大小
    updateScrollXSpace () {
      let { visibleColumn, scrollXStore } = this
      scrollXStore.leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous, column) => previous + column.renderWidth, 0)
      scrollXStore.rightSpaceWidth = visibleColumn.slice(scrollXStore.startIndex + scrollXStore.renderSize, visibleColumn.length).reduce((previous, column) => previous + column.renderWidth, 0)
    },
    updateScrollYData () {
      this.handleTableData()
      this.updateScrollYSpace()
    },
    // 更新纵向 Y 可视渲染上下剩余空间大小
    updateScrollYSpace () {
      let { scrollYStore, afterFullData } = this
      let bodyHeight = afterFullData.length * scrollYStore.rowHeight
      scrollYStore.ySpaceHeight = bodyHeight
      scrollYStore.topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0)
      scrollYStore.bottomSpaceHeight = Math.max((afterFullData.length - (scrollYStore.startIndex + scrollYStore.renderSize)) * scrollYStore.rowHeight, 0)
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
      if (this.scrollXLoad || this.scrollYLoad) {
        return new Promise(resolve => setTimeout(() => resolve(this.$nextTick()), 50))
      }
      return this.$nextTick()
    },
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
    scrollToColumn (column) {
      if (column && this.fullColumnMap.has(column)) {
        return DomTools.colToVisible(this, column)
      }
      return this.$nextTick()
    },
    scrollToTreeRow (row) {
      let { tableFullData, treeConfig, treeOpts } = this
      if (treeConfig) {
        let matchObj = XEUtils.findTree(tableFullData, item => item === row, treeOpts)
        if (matchObj) {
          let nodes = matchObj.nodes
          nodes.forEach((row, index) => {
            if (index < nodes.length - 1 && !this.hasTreeExpand(row)) {
              this.setTreeExpansion(row, true)
            }
          })
        }
      }
      return this.$nextTick()
    },
    clearScroll () {
      this.updateScrollXSpace()
      this.updateScrollYSpace()
      return this.$nextTick().then(() => {
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
      })
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
      let { editRules, afterFullData, treeConfig, treeOpts } = this
      let vaildDatas = afterFullData
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
        let handleVaild = row => {
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
        }
        if (treeConfig) {
          XEUtils.eachTree(vaildDatas, handleVaild, treeOpts)
        } else {
          vaildDatas.forEach(handleVaild)
        }
        return Promise.all(rowValids).then(() => {
          let ruleProps = Object.keys(validRest)
          if (ruleProps.length) {
            return Promise.reject(validRest[ruleProps[0]][0])
          }
          if (cb) {
            cb(status)
          }
        }).catch(params => {
          const args = isAll ? validRest : { [params.column.property]: params }
          return new Promise((resolve, reject) => {
            const finish = () => {
              status = false
              if (cb) {
                cb(status, args)
                resolve()
              } else {
                reject(args)
              }
            }
            const posAndFinish = () => {
              params.cell = DomTools.getCell(this, params)
              this.handleValidError(params)
              finish()
            }
            /**
             * 当校验不通过时
             * 将表格滚动到可视区
             * 由于提示信息至少需要占一行，定位向上偏移一行
             */
            const row = params.row
            const rowIndex = afterFullData.indexOf(row)
            const locatRow = rowIndex > 0 ? afterFullData[rowIndex - 1] : row
            DomTools.toView(this.$el)
            if (this.validOpts.autoPos === false) {
              finish()
            } else {
              if (treeConfig) {
                this.scrollToTreeRow(locatRow).then(posAndFinish)
              } else {
                this.scrollToRow(locatRow).then(posAndFinish)
              }
            }
          })
        })
      }
      if (cb) {
        cb(status)
      }
      return Promise.resolve()
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
        return rules && XEUtils.find(rules, rule => type === 'all' || !rule.trigger || type === rule.trigger)
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
                        errorRules.push(new Rule(cusRule))
                      }
                      return resolve()
                    }, { rules, row, column, rowIndex: this.getRowIndex(row), columnIndex: this.getColumnMapIndex(column) })
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
                      errorRules.push(new Rule(rule))
                    } else if (
                      (isNumber && isNaN(value)) ||
                      (XEUtils.isRegExp(rule.pattern) && !rule.pattern.test(value)) ||
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
      if (this.validOpts.autoPos === false) {
        UtilTools.emitEvent(this, 'valid-error', [params])
      } else {
        this.handleActived(params, { type: 'valid-error', trigger: 'call' })
          .then(() => this.showValidTooltip(params))
      }
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
    // 在 v3.0 中废弃 exportCsv 方法
    exportCsv (options) {
      UtilTools.warn('vxe.error.delFunc', ['exportCsv', 'exportData'])
      return this.exportData(options)
    },
    openExport (options) {
      if (this.$toolbar) {
        return this.$toolbar.openExport(options)
      }
      throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
    },
    /**
     * 导出 csv 文件
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了可视渲染，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     */
    exportData (options) {
      let { visibleColumn, scrollXLoad, scrollYLoad, treeConfig, treeOpts } = this
      let opts = Object.assign({
        filename: '',
        sheetName: '',
        original: !!treeConfig,
        message: false,
        isHeader: true,
        isFooter: true,
        download: true,
        type: 'csv',
        data: null,
        columns: null,
        // 在 v3.0 中废弃 type=selection
        columnFilterMethod: options.columns ? null : column => ['seq', 'index'].indexOf(column.type) > -1 || column.property,
        dataFilterMethod: null,
        footerFilterMethod: null
      }, GlobalConfig.export, options)
      if (!opts.filename) {
        opts.filename = 'export'
      }
      if (!opts.sheetName) {
        opts.sheetName = 'Sheet1'
      }
      if (!XEUtils.includes(VXETable.exportTypes, opts.type)) {
        throw new Error(UtilTools.getLog('vxe.error.notType', [opts.type]))
      }
      if (!opts.original) {
        if (scrollXLoad || scrollYLoad) {
          opts.original = true
          UtilTools.warn('vxe.error.scrollOriginal')
        }
      }
      let columns = visibleColumn
      let fullData = this.tableFullData
      if (treeConfig) {
        fullData = XEUtils.toTreeArray(fullData, treeOpts)
      }
      return ExportTools.handleExport(this, opts, columns, fullData)
    },
    openImport (options) {
      if (this.$toolbar) {
        return this.$toolbar.openImport(options)
      }
      throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
    },
    importByFile (file, opts) {
      if (window.FileReader) {
        const { type, filename } = UtilTools.parseFile(file)
        const options = Object.assign({ mode: 'covering' }, opts, { type, filename })
        const types = options.types || VXETable.importTypes
        if (XEUtils.includes(types, type)) {
          this.preventEvent(null, 'event.import', { $table: this, file, options, columns: this.tableFullColumn }, () => {
            const reader = new FileReader()
            reader.onerror = e => {
              UtilTools.error('vxe.error.notType', [type])
            }
            reader.onload = e => {
              ExportTools.handleImport(this, e.target.result.trim(), options)
            }
            reader.readAsText(file, 'UTF-8')
          })
        } else {
          UtilTools.error('vxe.error.notType', [type])
        }
      } else {
        UtilTools.error('vxe.error.notExp')
      }
    },
    importData (options) {
      let opts = Object.assign({}, GlobalConfig.import, options)
      let rest = new Promise((resolve, reject) => {
        this._importResolve = resolve
        this._importReject = reject
      })
      this.readFile(opts)
        .then(evnt => this.importByFile(evnt.target.files[0], opts))
        .catch(evnt => {
          this._importReject(evnt)
          this._importReject = null
        })
      return rest
    },
    readFile (options = {}) {
      if (!fileForm.parentNode) {
        document.body.appendChild(fileForm)
      }
      const types = options.types || VXETable.importTypes
      if (options.multiple) {
        fileInput.multiple = 'multiple'
      }
      fileInput.accept = `.${types.join(', .')}`
      fileInput.onchange = evnt => {
        const { type } = UtilTools.parseFile(evnt.target.files[0])
        if (XEUtils.includes(types, type)) {
          this._fileResolve(evnt)
        } else {
          if (options.message !== false) {
            this.$XModal.message({ message: XEUtils.template(GlobalConfig.i18n('vxe.error.notType'), [type]), status: 'error' })
          }
          this._fileReject(evnt)
        }
        this._fileResolve = null
      }
      fileForm.reset()
      fileInput.click()
      return new Promise((resolve, reject) => {
        this._fileResolve = resolve
        this._fileReject = reject
      })
    },
    print (options) {
      this.exportData(Object.assign({
        original: this.scrollXLoad || this.scrollYLoad
      }, options, {
        type: 'html',
        download: false
      })).then(({ content, blob }) => {
        if (DomTools.browse.msie) {
          if (printFrame) {
            try {
              printFrame.contentDocument.write('')
              printFrame.contentDocument.clear()
            } catch (e) {}
            document.body.removeChild(printFrame)
          }
          printFrame = createFrame()
          document.body.appendChild(printFrame)
          printFrame.contentDocument.write(content)
          printFrame.contentDocument.execCommand('print')
        } else {
          if (!printFrame) {
            printFrame = createFrame()
            printFrame.onload = evnt => {
              if (evnt.target.src) {
                evnt.target.contentWindow.print()
              }
            }
            document.body.appendChild(printFrame)
          }
          printFrame.src = URL.createObjectURL(blob)
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
}
