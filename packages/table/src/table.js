import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import VxeTableBody from '../../body'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'
import methods from './methods'

/**
 * 渲染浮固定列
 * 分别渲染左边固定列和右边固定列
 * 如果宽度足够情况下，则不需要渲染固定列
 * @param {Function} h 创建 VNode 函数
 * @param {Object} $xetable 表格实例
 * @param {String} fixedType 固定列类型
 */
function renderFixed (h, $xetable, fixedType) {
  const { tableData, tableColumn, visibleColumn, collectColumn, isGroup, vSize, showHeader, showFooter, columnStore, footerData } = $xetable
  const fixedColumn = columnStore[`${fixedType}List`]
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

export default {
  name: 'VxeTable',
  props: {
    /** 基本属性 */
    // 数据
    data: Array,
    // （v3.0 废弃）
    customs: Array,
    // 表格的高度
    height: [Number, String],
    // 表格的最大高度
    maxHeight: [Number, String],
    // 所有列是否允许拖动列宽调整大小
    resizable: { type: Boolean, default: () => GlobalConfig.table.resizable },
    // 是否带有斑马纹
    stripe: { type: Boolean, default: () => GlobalConfig.table.stripe },
    // 是否带有纵向边框
    border: { type: [Boolean, String], default: () => GlobalConfig.table.border },
    // 表格的尺寸
    size: { type: String, default: () => GlobalConfig.table.size || GlobalConfig.size },
    // 列的宽度是否自撑开（可能会被废弃的参数，不要使用）
    fit: { type: Boolean, default: () => GlobalConfig.table.fit },
    // 表格是否加载中
    loading: Boolean,
    // 所有的列对其方式
    align: { type: String, default: () => GlobalConfig.table.align },
    // 所有的表头列的对齐方式
    headerAlign: { type: String, default: () => GlobalConfig.table.headerAlign },
    // 所有的表尾列的对齐方式
    footerAlign: { type: String, default: () => GlobalConfig.table.footerAlign },
    // 是否显示表头
    showHeader: { type: Boolean, default: () => GlobalConfig.table.showHeader },
    // （v3.0 废弃）
    startIndex: { type: Number, default: 0 },
    // 是否要高亮当前选中行
    highlightCurrentRow: { type: Boolean, default: () => GlobalConfig.table.highlightCurrentRow },
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: { type: Boolean, default: () => GlobalConfig.table.highlightHoverRow },
    // 是否要高亮当前选中列
    highlightCurrentColumn: { type: Boolean, default: () => GlobalConfig.table.highlightCurrentColumn },
    // 鼠标移到列是否要高亮显示
    highlightHoverColumn: { type: Boolean, default: () => GlobalConfig.table.highlightHoverColumn },
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
    // 设置所有内容过长时显示为省略号
    showOverflow: { type: [Boolean, String], default: () => GlobalConfig.table.showOverflow },
    // 设置表头所有内容过长时显示为省略号
    showHeaderOverflow: { type: [Boolean, String], default: () => GlobalConfig.table.showHeaderOverflow },
    // 设置表尾所有内容过长时显示为省略号
    showFooterOverflow: { type: [Boolean, String], default: () => GlobalConfig.table.showFooterOverflow },
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
    rowId: { type: String, default: () => GlobalConfig.table.rowId },
    zIndex: Number,
    keepSource: { type: Boolean, default: () => GlobalConfig.table.keepSource },
    // 是否自动监听父容器变化去更新响应式表格宽高
    autoResize: Boolean,
    // 是否自动根据状态属性去更新响应式表格宽高
    syncResize: [Boolean, String, Number],
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
    // 导出配置项
    exportConfig: [Boolean, Object],
    // 导入配置项
    importConfig: [Boolean, Object],
    // 打印配置项
    printConfig: Object,
    // 展开行配置项
    expandConfig: Object,
    // 树形结构配置项
    treeConfig: [Boolean, Object],
    // 快捷菜单配置项
    contextMenu: [Boolean, Object],
    // 鼠标配置项
    mouseConfig: Object,
    // 按键配置项
    keyboardConfig: Object,
    // 编辑配置项
    editConfig: [Boolean, Object],
    // 校验配置项
    validConfig: Object,
    // 校验规则配置项
    editRules: Object,
    // 空内容渲染配置项
    emptyRender: [Boolean, Object],
    // 优化配置项
    optimization: Object,
    // 额外的参数
    params: Object
  },
  components: {
    VxeTableBody
  },
  provide () {
    return {
      $xetable: this
    }
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  mixins: [],
  data () {
    return {
      id: `${XEUtils.uniqueId()}`,
      isCloak: false,
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
      // 行高
      rowHeight: 0,
      // 复选框属性，是否全选
      isAllSelected: false,
      // 复选框属性，有选中且非全选状态
      isIndeterminate: false,
      // 复选框属性，已选中的行
      selection: [],
      // 当前行
      currentRow: null,
      // 单选框属性，选中列
      currentColumn: null,
      // 单选框属性，选中行
      selectRow: null,
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
        childPos: null,
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
      },
      // 导入相关信息
      importStore: {
        file: null,
        type: '',
        modeList: [],
        typeList: [],
        filename: '',
        visible: false
      },
      importParams: {
        mode: '',
        types: null,
        message: true
      },
      // 导出相关信息
      exportStore: {
        name: '',
        modeList: [],
        typeList: [],
        columns: [],
        hasFooter: false,
        visible: false,
        isTree: false
      },
      exportParams: {
        filename: '',
        sheetName: '',
        mode: '',
        type: '',
        original: false,
        message: true,
        isHeader: false,
        isFooter: false
      }
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    validOpts () {
      return Object.assign({ message: 'default' }, GlobalConfig.table.validConfig, this.validConfig)
    },
    optimizeOpts () {
      return Object.assign({}, GlobalConfig.table.optimization, this.optimization)
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
      return Object.assign({ startIndex: 0 }, GlobalConfig.table.seqConfig, this.seqConfig)
    },
    radioOpts () {
      return Object.assign({}, GlobalConfig.table.radioConfig, this.radioConfig)
    },
    checkboxOpts () {
      return Object.assign({}, GlobalConfig.table.checkboxConfig, this.checkboxConfig || this.selectConfig)
    },
    tooltipOpts () {
      return Object.assign({ size: this.vSize, leaveDelay: 300 }, GlobalConfig.table.tooltipConfig, this.tooltipConfig)
    },
    vaildTipOpts () {
      return Object.assign({ isArrow: false }, this.tooltipOpts)
    },
    editOpts () {
      return Object.assign({}, GlobalConfig.table.editConfig, this.editConfig)
    },
    sortOpts () {
      return Object.assign({ orders: ['asc', 'desc', null] }, GlobalConfig.table.sortConfig, this.sortConfig)
    },
    filterOpts () {
      return Object.assign({}, GlobalConfig.table.filterConfig, this.filterConfig)
    },
    mouseOpts () {
      return Object.assign({}, GlobalConfig.table.mouseConfig, this.mouseConfig)
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
      return this.tableColumn.some(column => column.filters)
    },
    headerCtxMenu () {
      const headerOpts = this.ctxMenuOpts.header
      return headerOpts && headerOpts.options ? headerOpts.options : []
    },
    bodyCtxMenu () {
      const bodyOpts = this.ctxMenuOpts.body
      return bodyOpts && bodyOpts.options ? bodyOpts.options : []
    },
    footerCtxMenu () {
      const footerOpts = this.ctxMenuOpts.footer
      return footerOpts && footerOpts.options ? footerOpts.options : []
    },
    isCtxMenu () {
      return this.headerCtxMenu.length || this.bodyCtxMenu.length || this.footerCtxMenu.length
    },
    ctxMenuOpts () {
      return Object.assign({}, GlobalConfig.table.contextMenu, this.contextMenu)
    },
    ctxMenuList () {
      const rest = []
      this.ctxMenuStore.list.forEach(list => {
        list.forEach(item => {
          rest.push(item)
        })
      })
      return rest
    },
    exportOpts () {
      return Object.assign({}, GlobalConfig.table.exportConfig, this.exportConfig)
    },
    importOpts () {
      return Object.assign({}, GlobalConfig.table.importConfig, this.importConfig)
    },
    printOpts () {
      return Object.assign({}, GlobalConfig.table.printConfig, this.printConfig)
    },
    expandOpts () {
      return Object.assign({}, GlobalConfig.table.expandConfig, this.expandConfig)
    },
    treeOpts () {
      return Object.assign({
        children: 'children',
        hasChild: 'hasChild',
        indent: 20
      }, GlobalConfig.table.treeConfig, this.treeConfig)
    },
    emptyOpts () {
      return Object.assign({}, GlobalConfig.table.emptyRender, this.emptyRender)
    },
    cellOffsetWidth () {
      return this.border ? Math.max(2, Math.ceil(this.scrollbarWidth / this.tableColumn.length)) : 1
    },
    expandColumn () {
      return XEUtils.find(this.tableColumn, column => column.type === 'expand')
    },
    tableBorder () {
      const { border } = this
      if (border === true) {
        return 'full'
      }
      if (border) {
        return border
      }
      return 'default'
    },
    /**
     * 判断列全选的复选框是否禁用
     */
    isAllCheckboxDisabled () {
      const { tableFullData, treeConfig, checkboxOpts } = this
      const { strict, checkMethod } = checkboxOpts
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
      this.loadTableData(value).then(() => {
        if (!this.inited) {
          this.inited = true
          this.handleDefaults()
        }
      })
    },
    customs (value) {
      if (!this.isUpdateCustoms) {
        this.mergeCustomColumn(value)
      }
      this.isUpdateCustoms = false
    },
    collectColumn (value) {
      const tableFullColumn = UtilTools.getColumnList(value)
      this.tableFullColumn = tableFullColumn
      this.cacheColumnMap()
      if (this.customs) {
        this.mergeCustomColumn(this.customs)
      }
      this.refreshColumn().then(() => {
        if (this.scrollXLoad) {
          this.loadScrollXData(true)
        }
      })
      this.handleTableData(true)
      // 在 v3.0 中废弃 prop、label
      if (tableFullColumn.length) {
        const cIndex = Math.floor((tableFullColumn.length - 1) / 2)
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
      if (this.isGroup && this.mouseConfig && (this.mouseOpts.range || this.mouseOpts.checked)) {
        UtilTools.error('vxe.error.groupMouseRange', ['mouse-config.range'])
      }
      this.$nextTick(() => {
        if (this.$toolbar) {
          this.$toolbar.updateColumns(tableFullColumn)
        }
      })
    },
    tableColumn () {
      this.analyColumnWidth()
    },
    showHeader () {
      this.$nextTick(() => this.recalculate(true))
    },
    showFooter () {
      this.$nextTick(() => this.recalculate(true))
    },
    height () {
      this.$nextTick(() => this.recalculate(true))
    },
    syncResize (value) {
      if (value) {
        const { $el } = this
        // 只在可视状态下才去更新
        if ($el.clientWidth && $el.clientHeight) {
          this.recalculate()
        }
        this.$nextTick(() => {
          setTimeout(() => {
            if ($el.clientWidth && $el.clientHeight) {
              this.recalculate(true)
            }
          })
        })
      }
    }
  },
  created () {
    const { scrollXStore, scrollYStore, optimizeOpts, mouseConfig, mouseOpts, data, editConfig, editOpts, treeOpts, treeConfig, showOverflow } = Object.assign(this, {
      tZindex: 0,
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
      // 当前 hover 行
      // hoverRow: null,
      // 最后滚动位置
      lastScrollLeft: 0,
      lastScrollTop: 0,
      // 单选框属性，已选中保留的行
      radioReserveRow: null,
      // 复选框属性，已选中保留的行
      checkboxReserveRowMap: {},
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
    const { scrollX, scrollY } = optimizeOpts
    if (!this.rowId && (this.checkboxOpts.reserve || this.checkboxOpts.checkRowKeys || this.radioOpts.reserve || this.radioOpts.checkRowKey || this.expandOpts.expandRowKeys || this.treeOpts.expandRowKeys)) {
      UtilTools.warn('vxe.error.reqProp', ['row-id'])
    }
    if (this.startIndex) {
      UtilTools.warn('vxe.error.delProp', ['start-index', 'seq-config.startIndex'])
    }
    if (this.selectConfig) {
      UtilTools.warn('vxe.error.delProp', ['select-config', 'checkbox-config'])
    }
    if (editOpts.showStatus && !this.keepSource) {
      UtilTools.warn('vxe.error.reqProp', ['keep-source'])
    }
    if (treeConfig && treeOpts.line && (!this.rowKey || !showOverflow)) {
      UtilTools.warn('vxe.error.reqProp', ['row-key | show-overflow'])
    }
    if (this.customs) {
      UtilTools.warn('vxe.error.removeProp', ['customs'])
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
    if (editConfig && mouseConfig && (mouseOpts.range || mouseOpts.checked) && editOpts.trigger !== 'dblclick') {
      UtilTools.error('vxe.error.errProp', ['edit-config.trigger', 'dblclick'])
    }
    if (treeConfig && this.stripe) {
      UtilTools.error('vxe.error.treeErrProp', ['stripe'])
    }
    // 检查是否有安装需要的模块
    let errorModuleName
    if (!VXETable._edit && this.editConfig) {
      errorModuleName = 'Edit'
    } else if (!VXETable._valid && this.editRules) {
      errorModuleName = 'Validator'
    } else if (!VXETable._keyboard && (this.keyboardConfig || this.mouseConfig)) {
      errorModuleName = 'Keyboard'
    } else if (!VXETable._resize && this.autoResize) {
      errorModuleName = 'Resize'
    } else if (!VXETable._export && (this.importConfig || this.exportConfig)) {
      errorModuleName = 'Export'
    }
    if (errorModuleName) {
      throw new Error(UtilTools.getLog('vxe.error.reqModule', [errorModuleName]))
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
    if (scrollX) {
      Object.assign(scrollXStore, {
        startIndex: 0,
        visibleIndex: 0,
        renderSize: XEUtils.toNumber(scrollX.rSize),
        offsetSize: XEUtils.toNumber(scrollX.oSize)
      })
    }
    if (this.optimizeOpts.cloak) {
      this.isCloak = true
      setTimeout(() => {
        this.isCloak = false
      }, DomTools.browse ? 500 : 300)
    }
    this.loadTableData(data).then(() => {
      if (data && data.length) {
        this.inited = true
        this.handleDefaults()
      }
      this.updateStyle()
    })
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent)
    GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent)
    this.preventEvent(null, 'created')
  },
  mounted () {
    if (this.autoResize && VXETable._resize) {
      this.bindResize()
    }
    if (!this.$xegrid && this.customs) {
      UtilTools.warn('vxe.error.removeProp', ['customs'])
    }
    document.body.appendChild(this.$refs.tableWrapper)
    this.preventEvent(null, 'mounted')
  },
  activated () {
    this.recalculate().then(() => this.refreshScroll())
    this.preventEvent(null, 'activated')
  },
  deactivated () {
    this.preventEvent(null, 'deactivated')
  },
  beforeDestroy () {
    const tableWrapper = this.$refs.tableWrapper
    if (tableWrapper && tableWrapper.parentNode) {
      tableWrapper.parentNode.removeChild(tableWrapper)
    }
    if (VXETable._resize) {
      this.unbindResize()
    }
    this.closeFilter()
    this.closeMenu()
    this.clearAll()
    this.preventEvent(null, 'beforeDestroy')
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
    GlobalEvent.off(this, 'mousewheel')
    GlobalEvent.off(this, 'keydown')
    GlobalEvent.off(this, 'resize')
    GlobalEvent.off(this, 'contextmenu')
    this.preventEvent(null, 'destroyed')
  },
  render (h) {
    const {
      _e,
      $scopedSlots,
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
      isCloak,
      stripe,
      showHeader,
      height,
      tableBorder,
      treeOpts,
      treeConfig,
      mouseConfig,
      mouseOpts,
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
      highlightCell,
      highlightHoverRow,
      highlightHoverColumn,
      editConfig,
      checkboxOpts,
      optimizeOpts,
      vaildTipOpts,
      tooltipOpts,
      columnStore,
      filterStore,
      ctxMenuStore,
      ctxMenuOpts,
      footerData,
      hasTip,
      emptyRender,
      emptyOpts
    } = this
    const { leftList, rightList } = columnStore
    // 在 v3.0 中废弃 mouse-config.checked
    const isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked)
    let emptyContent
    if ($scopedSlots.empty) {
      emptyContent = $scopedSlots.empty.call(this, { $table: this }, h)
    } else {
      const compConf = emptyRender ? VXETable.renderer.get(emptyOpts.name) : null
      if (compConf) {
        emptyContent = compConf.renderEmpty.call(this, h, emptyOpts, { $table: this }, { $table: this })
      } else {
        emptyContent = GlobalConfig.i18n('vxe.table.emptyText')
      }
    }
    return h('div', {
      class: ['vxe-table', `tid_${id}`, vSize ? `size--${vSize}` : '', `border--${tableBorder}`, {
        'vxe-editable': !!editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'is--group': isGroup,
        'has--height': height,
        'has--tree-line': treeConfig && treeOpts.line,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        'c--highlight': highlightCell,
        't--animat': !!optimizeOpts.animat,
        't--stripe': stripe,
        't--selected': mouseConfig && mouseOpts.selected,
        't--checked': isMouseChecked,
        'row--highlight': highlightHoverRow,
        'column--highlight': highlightHoverColumn,
        'is--loading': isCloak || loading,
        'is--empty': !loading && !tableData.length,
        'scroll--y': overflowY,
        'scroll--x': overflowX,
        'virtual--x': scrollXLoad,
        'virtual--y': scrollYLoad
      }],
      attrs: {
        'x-cloak': isCloak
      }
    }, [
      /**
       * 隐藏列
       */
      h('div', {
        class: 'vxe-table-slots',
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
      h('div', {
        ref: 'emptyPlaceholder',
        class: 'vxe-table--empty-placeholder'
      }, [
        h('div', {
          class: 'vxe-table--empty-content'
        }, emptyContent)
      ]),
      /**
       * 边框线
       */
      h('div', {
        class: 'vxe-table--border-line'
      }),
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
      h('div', {
        class: ['vxe-table--loading vxe-loading', {
          'is--visible': isCloak || loading
        }]
      }, [
        h('div', {
          class: 'vxe-loading--spinner'
        })
      ]),
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
       * 导入
       */
      this.importConfig ? h('vxe-import-panel', {
        props: {
          defaultOptions: this.importParams,
          storeData: this.importStore
        }
      }) : _e(),
      /**
       * 导出
       */
      this.exportConfig ? h('vxe-export-panel', {
        props: {
          defaultOptions: this.exportParams,
          storeData: this.exportStore
        }
      }) : _e(),
      h('div', {
        class: `vxe-table${id}-wrapper ${this.$vnode.data.staticClass || ''}`,
        ref: 'tableWrapper'
      }, [
        /**
         * 复选框-范围选择
         */
        checkboxOpts.range ? h('div', {
          class: 'vxe-table--checkbox-range',
          ref: 'checkboxRange'
        }) : _e(),
        /**
         * 快捷菜单
         */
        isCtxMenu ? h('vxe-table-context-menu', {
          props: {
            ctxMenuStore,
            ctxMenuOpts
          },
          ref: 'ctxWrapper'
        }) : _e(),
        /**
         * 单元格溢出的提示
         */
        hasTip ? h('vxe-tooltip', {
          ref: 'tooltip',
          props: tooltipOpts,
          on: tooltipOpts.enterable ? {
            leave: this.handleTooltipLeaveEvent
          } : null
        }) : _e(),
        /**
         * 单元格校验不通过的提示
         * 仅用于一行数据时有效，多行数据使用内部的提示框
         */
        hasTip && editRules && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip') ? h('vxe-tooltip', {
          class: 'vxe-table--valid-error',
          props: validOpts.message === 'tooltip' || tableData.length === 1 ? vaildTipOpts : null,
          ref: 'validTip'
        }) : _e()
      ])
    ])
  },
  methods
}
