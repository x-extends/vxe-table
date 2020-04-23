import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import VxeTableBody from '../../body'
import Cell from '../../cell'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools, ExportTools, GlobalEvent, ResizeEvent } from '../../tools'

const browse = DomTools.browse
const debounceScrollYDuration = browse.msie ? 40 : 20

const resizableStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_WIDTH'
const visibleStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_VISIBLE'

// 导入
let fileForm
let fileInput

// 打印
let printFrame

function createFrame () {
  const frame = document.createElement('iframe')
  frame.className = 'vxe-table--print-frame'
  return frame
}

function getRowUniqueId () {
  return XEUtils.uniqueId('row_')
}

function getNextSortOrder (_vm, column) {
  const orders = _vm.sortOpts.orders
  const currOrder = column.order || null
  const oIndex = orders.indexOf(currOrder) + 1
  return orders[oIndex < orders.length ? oIndex : 0]
}

/**
 * 判断是否点击了单选框或复选框
 */
function isTargetRadioOrCheckbox (evnt, column, colType, targetType) {
  const target = evnt.target
  return target && column.type === colType && target.tagName.toLowerCase() === 'input' && target.type === (targetType || colType)
}

function getCustomStorageMap (key) {
  const version = GlobalConfig.version
  const rest = XEUtils.toStringJSON(localStorage.getItem(key))
  return rest && rest._v === version ? rest : { _v: version }
}

/**
 * 校验规则
 */
class Rule {
  constructor (rule) {
    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.max,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    })
  }

  /**
   * 获取校验不通过的消息
   * 支持国际化翻译
   */
  get message () {
    return UtilTools.getFuncText(this.$options.message)
  }
}

/**
 * 渲染浮固定列
 */
function renderFixed (h, $table, fixedType) {
  const {
    tableData,
    tableColumn,
    visibleColumn,
    tableGroupColumn,
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
  const isRightFixed = fixedType === 'right'
  const fixedColumn = columnStore[`${fixedType}List`]
  let customHeight = 0
  if (height) {
    customHeight = height === 'auto' ? parentHeight : ((DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : XEUtils.toNumber(height)) - $table.getExcludeHeight())
    if (showFooter) {
      customHeight += scrollbarHeight + 1
    }
  }
  const style = {
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
        tableGroupColumn,
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
        footerData,
        tableColumn,
        visibleColumn,
        fixedColumn,
        fixedType,
        size: vSize
      },
      ref: `${fixedType}Footer`
    }) : null
  ])
}

export default {
  name: 'VxeTable',
  props: {
    /** 基本属性 */
    id: String,
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
    size: { type: String, default: () => GlobalConfig.table.size },
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
    showAllOverflow: { type: [Boolean, String], default: () => GlobalConfig.table.showOverflow },
    // （v2.0 废弃）
    showHeaderAllOverflow: { type: [Boolean, String], default: () => GlobalConfig.table.showHeaderOverflow },
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
    rowKey: [Boolean, String],
    rowId: String,
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
    // 自定义列配置项
    customConfig: [Boolean, Object],
    // 横向虚拟滚动配置项
    scrollX: Object,
    // 纵向虚拟滚动配置项
    scrollY: Object,
    // 优化相关
    cloak: { type: Boolean, default: () => GlobalConfig.table.cloak },
    animat: { type: Boolean, default: () => GlobalConfig.table.animat },
    delayHover: { type: Number, default: () => GlobalConfig.table.delayHover },
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
      $table: this,
      $xetable: this
    }
  },
  inject: {
    $grid: {
      default: null
    },
    $xegrid: {
      default: null
    }
  },
  data () {
    return {
      tId: `${XEUtils.uniqueId()}`,
      isCloak: false,
      tZindex: 0,
      // 列分组配置
      collectColumn: [],
      // 渲染的列分组
      tableGroupColumn: [],
      // 完整所有列
      tableFullColumn: [],
      // 渲染所有列
      visibleColumn: [],
      // 可视区渲染的列
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
      // 展开列信息
      expandColumn: null,
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
      // 是否已经加载了筛选
      hasFilterPanel: false,
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
      return Object.assign({
        message: 'default'
      }, GlobalConfig.table.validConfig, this.validConfig)
    },
    sXOpts () {
      return Object.assign({}, GlobalConfig.table.scrollX, this.optimizeOpts.scrollX, this.scrollX)
    },
    sYOpts () {
      return Object.assign({}, GlobalConfig.table.scrollY, this.optimizeOpts.scrollY, this.scrollY)
    },
    // 优化的参数
    optimizeOpts () {
      return Object.assign({}, GlobalConfig.table.optimization, this.optimization)
    },
    rowHeightMaps () {
      return {
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      }
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
    isResizable () {
      return this.resizable || this.tableFullColumn.some(column => column.resizable)
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
    customOpts () {
      return Object.assign({}, GlobalConfig.table.customConfig, this.customConfig === true ? { storage: true } : this.customConfig)
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
        if ((this.scrollXLoad || this.scrollYLoad) && this.expandColumn) {
          UtilTools.warn('vxe.error.scrollErrProp', ['column.type=expand'])
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
      if (this.customConfig) {
        this.restoreCustomStorage()
      }
      this.refreshColumn().then(() => {
        if (this.scrollXLoad) {
          this.loadScrollXData(true)
        }
      })
      this.handleTableData(true)
      // 在 v2.0 中废弃
      if (tableFullColumn.length) {
        if (tableFullColumn.some(column => column.columnKey)) {
          UtilTools.warn('vxe.error.delProp', ['column.column-key', 'table.column-key'])
        }
      }
      if ((this.scrollXLoad || this.scrollYLoad) && this.expandColumn) {
        UtilTools.warn('vxe.error.scrollErrProp', ['column.type=expand'])
      }
      if (this.isGroup && this.mouseConfig && (this.mouseOpts.range || this.mouseOpts.checked)) {
        UtilTools.error('vxe.error.groupMouseRange', ['mouse-config.range'])
      }
      this.$nextTick(() => {
        if (this.$toolbar) {
          this.$toolbar.syncUpdate({ collectColumn: value, $table: this })
          // 在 v3.0 中废弃 toolbar 方式
          if (!this.customConfig) {
            this.restoreCustomStorage()
            this.analyColumnWidth()
            this.refreshColumn()
          }
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
    const { data, sXOpts, scrollXStore, sYOpts, scrollYStore, ctxMenuOpts, showOverflow, radioOpts, checkboxOpts, treeConfig, treeOpts, editConfig, editOpts, mouseConfig, mouseOpts, showAllOverflow, showHeaderAllOverflow } = this
    Object.assign(scrollYStore, {
      startIndex: 0,
      visibleIndex: 0,
      renderSize: XEUtils.toNumber(sYOpts.rSize),
      offsetSize: XEUtils.toNumber(sYOpts.oSize)
    })
    Object.assign(scrollXStore, {
      startIndex: 0,
      visibleIndex: 0,
      renderSize: XEUtils.toNumber(sXOpts.rSize),
      offsetSize: XEUtils.toNumber(sXOpts.oSize)
    })
    if (!this.rowId && (this.checkboxOpts.reserve || this.checkboxOpts.checkRowKeys || this.radioOpts.reserve || this.radioOpts.checkRowKey || this.expandOpts.expandRowKeys || this.treeOpts.expandRowKeys)) {
      UtilTools.warn('vxe.error.reqProp', ['row-id'])
    }
    // 在 v3.0 中废弃 start-index
    if (this.startIndex) {
      UtilTools.warn('vxe.error.delProp', ['start-index', 'seq-config.startIndex'])
    }
    // 在 v3.0 中废弃 show-all-overflow
    if (XEUtils.isBoolean(showAllOverflow)) {
      UtilTools.warn('vxe.error.delProp', ['show-all-overflow', 'show-overflow'])
    }
    // 在 v3.0 中废弃 show-header-all-overflow
    if (XEUtils.isBoolean(showHeaderAllOverflow)) {
      UtilTools.warn('vxe.error.delProp', ['show-header-all-overflow', 'show-header-overflow'])
    }
    // 在 v3.0 中废弃 radio-config.labelProp
    if (radioOpts.labelProp) {
      UtilTools.warn('vxe.error.delProp', ['radio-config.labelProp', 'radio-config.labelField'])
    }
    if (editOpts.showStatus && !this.keepSource) {
      UtilTools.warn('vxe.error.reqProp', ['keep-source'])
    }
    // 在 v3.0 中废弃 select-config
    if (this.selectConfig) {
      UtilTools.warn('vxe.error.delProp', ['select-config', 'checkbox-config'])
    }
    if (treeConfig && treeOpts.line && (!this.rowKey || !showOverflow)) {
      UtilTools.warn('vxe.error.reqProp', ['row-key | show-overflow'])
    }
    // 在 v3.0 中废弃 select-config.checkProp
    if (checkboxOpts.checkProp) {
      UtilTools.warn('vxe.error.delProp', ['select-config.checkProp', 'select-config.checkField'])
    }
    // 在 v3.0 中废弃 select-config.labelProp
    if (checkboxOpts.labelProp) {
      UtilTools.warn('vxe.error.delProp', ['select-config.labelProp', 'select-config.labelField'])
    }
    // 在 v3.0 中废弃 customs
    if (this.customs) {
      UtilTools.warn('vxe.error.removeProp', ['customs'])
    }
    // 在 v3.0 中废弃 sort-method
    if (this.sortMethod) {
      UtilTools.warn('vxe.error.delProp', ['sort-method', 'sort-config.sortMethod'])
    }
    // 在 v3.0 中废弃 remote-sort
    if (this.remoteSort) {
      UtilTools.warn('vxe.error.delProp', ['remote-sort', 'sort-config.remote'])
    }
    // 在 v3.0 中废弃 remote-filter
    if (this.remoteFilter) {
      UtilTools.warn('vxe.error.delProp', ['remote-filter', 'filter-config.remote'])
    }
    if (mouseConfig && this.editConfig) {
      if ((mouseOpts.range || mouseOpts.checked) && editOpts.trigger !== 'dblclick') {
        UtilTools.error('vxe.error.errProp', ['edit-config.trigger', 'dblclick'])
      }
      if (mouseOpts.selected && editOpts.mode !== 'cell') {
        UtilTools.error('vxe.error.errProp', ['edit-config.mode', 'cell'])
      }
    }
    if (treeConfig && this.stripe) {
      UtilTools.error('vxe.error.errConflicts', ['tree-config', 'stripe'])
    }
    // 在 v3.0 中废弃 optimization
    if (this.optimization) {
      UtilTools.warn('vxe.error.removeProp', ['optimization'])
    }
    // 废弃 optimization.cloak
    if (this.optimizeOpts.cloak) {
      UtilTools.warn('vxe.error.delProp', ['optimization.cloak', 'cloak'])
    }
    // 废弃 optimization.animat
    if (this.optimizeOpts.animat) {
      UtilTools.warn('vxe.error.delProp', ['optimization.animat', 'animat'])
    }
    // 废弃 optimization.delayHover
    if (this.optimizeOpts.delayHover) {
      UtilTools.warn('vxe.error.delProp', ['optimization.delayHover', 'delay-hover'])
    }
    // 废弃 optimization.scrollX
    if (this.optimizeOpts.scrollX) {
      UtilTools.warn('vxe.error.delProp', ['optimization.scrollX', 'scroll-x'])
    }
    // 废弃 optimization.scrollY
    if (this.optimizeOpts.scrollY) {
      UtilTools.warn('vxe.error.delProp', ['optimization.scrollY', 'scroll-y'])
    }
    const customOpts = this.customOpts
    if (!this.id && this.customConfig && (customOpts.storage === true || (customOpts.storage && customOpts.storage.resizable) || (customOpts.storage && customOpts.storage.visible))) {
      UtilTools.error('vxe.error.reqProp', ['id'])
    }
    ['header', 'body', 'footer'].forEach(name => {
      if (ctxMenuOpts[name] && ctxMenuOpts[name].visibleMethod) {
        UtilTools.warn('vxe.error.delProp', [`context-menu.${name}.visibleMethod`, 'context-menu.visibleMethod'])
      }
    })
    this.lastScrollLeft = 0
    this.lastScrollTop = 0
    this.afterFullData = []
    this.radioReserveRow = null // 单选框属性，已选中保留的行
    this.checkboxReserveRowMap = {} // 复选框属性，已选中保留的行
    this.fullAllDataRowMap = new Map()
    this.fullAllDataRowIdData = {}
    this.fullDataRowMap = new Map()
    this.fullDataRowIdData = {}
    this.fullColumnMap = new Map()
    this.fullColumnIdData = {}
    this.fullColumnFieldData = {}
    if (this.cloak) {
      this.isCloak = true
      setTimeout(() => {
        this.isCloak = false
      }, DomTools.browse ? 500 : 300)
    }
    this.loadTableData(data).then(() => {
      if (checkboxOpts.key) {
        UtilTools.warn('vxe.error.delProp', ['select-config.key', 'row-id'])
      } else if (treeConfig && treeOpts.key) {
        UtilTools.warn('vxe.error.delProp', ['tree-config.key', 'row-id'])
      } else if (editConfig && editOpts.key) {
        UtilTools.warn('vxe.error.delProp', ['edit-config.key', 'row-id'])
      }
      if (data && data.length) {
        this.inited = true
        this.handleDefaults()
      }
    })
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
    GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent)
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent)
    this.preventEvent(null, 'created')
  },
  mounted () {
    if (this.autoResize) {
      ResizeEvent.on(this, this.getParentElem(), () => this.recalculate(true))
    }
    if (!this.$grid && this.customs) {
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
    if (ResizeEvent.off) {
      ResizeEvent.off(this, this.getParentElem())
    }
    this.closeFilter()
    this.closeMenu()
    this.clearAll()
    this.preventEvent(null, 'beforeDestroy')
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
    GlobalEvent.off(this, 'contextmenu')
    GlobalEvent.off(this, 'mousewheel')
    GlobalEvent.off(this, 'keydown')
    GlobalEvent.off(this, 'resize')
    this.preventEvent(null, 'destroyed')
  },
  render (h) {
    const {
      _e,
      $scopedSlots,
      tId,
      tableData,
      tableColumn,
      visibleColumn,
      tableGroupColumn,
      isGroup,
      isResizable,
      isCtxMenu,
      loading,
      isCloak,
      stripe,
      showHeader,
      headerHeight,
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
      overflowX,
      overflowY,
      scrollXLoad,
      scrollYLoad,
      scrollbarHeight,
      highlightHoverRow,
      highlightHoverColumn,
      editConfig,
      checkboxOpts,
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
      class: ['vxe-table', `tid_${tId}`, vSize ? `size--${vSize}` : '', `border--${tableBorder}`, {
        'vxe-editable': !!editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'is--group': isGroup,
        'has--height': height,
        'has--tree-line': treeConfig && treeOpts.line,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        't--animat': !!this.animat,
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
            tableGroupColumn,
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
            size: vSize,
            isGroup
          }
        }),
        /**
         * 底部
         */
        showFooter ? h('vxe-table-footer', {
          props: {
            footerData,
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
        class: 'vxe-table--empty-placeholder',
        style: height ? null : {
          top: `${headerHeight}px`
        }
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
      this.hasFilterPanel ? h('vxe-table-filter', {
        props: {
          filterStore
        },
        ref: 'filterWrapper'
      }) : _e(),
      /**
       * 导入
       */
      VXETable._export ? h('vxe-import-panel', {
        props: {
          defaultOptions: this.importParams,
          storeData: this.importStore
        }
      }) : _e(),
      /**
       * 导出
       */
      VXETable._export ? h('vxe-export-panel', {
        props: {
          defaultOptions: this.exportParams,
          storeData: this.exportStore
        }
      }) : _e(),
      h('div', {
        class: `vxe-table${tId}-wrapper ${this.$vnode.data.staticClass || ''}`,
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
      this.inited = false
      this.clearSort()
      this.clearFilter()
      this.clearCurrentRow()
      this.clearCurrentColumn()
      this.clearRadioRow()
      this.clearRadioReserve()
      this.clearCheckboxRow()
      this.clearCheckboxReserve()
      this.clearRowExpand()
      this.clearTreeExpand()
      this.clearChecked()
      this.clearSelected()
      this.clearActived()
      return this.clearScroll()
    },
    refreshData () {
      UtilTools.warn('vxe.error.delFunc', ['refreshData', 'syncData'])
      return this.syncData()
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
    updateData () {
      return this.handleTableData(true).then(this.updateFooter).then(this.recalculate)
    },
    handleTableData (force) {
      const { scrollYLoad, scrollYStore } = this
      const fullData = force ? this.updateAfterFullData() : this.afterFullData
      this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0)
      return this.$nextTick()
    },
    loadTableData (datas) {
      const { keepSource, treeConfig, editStore, sYOpts, scrollYStore } = this
      const tableFullData = datas ? datas.slice(0) : []
      const scrollYLoad = !treeConfig && sYOpts && sYOpts.gt && sYOpts.gt < tableFullData.length
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
      if (keepSource) {
        this.tableSourceData = XEUtils.clone(tableFullData, true)
      }
      this.scrollYLoad = scrollYLoad
      if (scrollYLoad) {
        if (!(this.height || this.maxHeight)) {
          UtilTools.error('vxe.error.reqProp', ['height | max-height'])
        }
        if (!this.showOverflow) {
          UtilTools.warn('vxe.error.reqProp', ['show-overflow'])
        }
      }
      this.handleTableData(true)
      this.updateFooter()
      return this.computeScrollLoad().then(() => {
        // 是否加载了数据
        this.isLoadData = true
        this.computeRowHeight()
        this.handleReserveStatus()
        this.checkSelectionStatus()
        return this.$nextTick().then(this.recalculate).then(this.refreshScroll)
      })
    },
    loadData (datas) {
      this.inited = true
      return this.loadTableData(datas)
    },
    reloadData (datas) {
      return this.clearAll()
        .then(() => {
          this.inited = true
          return this.loadTableData(datas)
        })
        .then(this.handleDefaults)
    },
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
        UtilTools.warn('vxe.error.reqProp', ['keep-source'])
      }
      return this.$nextTick()
    },
    loadColumn (columns) {
      this.collectColumn = XEUtils.mapTree(columns, column => Cell.createColumn(this, column))
      return this.$nextTick()
    },
    reloadColumn (columns) {
      this.clearAll()
      return this.loadColumn(columns)
    },
    // 更新数据的 Map
    updateCache (source) {
      const { treeConfig, treeOpts, tableFullData, fullDataRowMap, fullAllDataRowMap } = this
      let { fullDataRowIdData, fullAllDataRowIdData } = this
      const rowkey = UtilTools.getRowkey(this)
      const isLazy = treeConfig && treeOpts.lazy
      const handleCache = (row, index) => {
        let rowid = UtilTools.getRowid(this, row)
        if (!rowid) {
          rowid = getRowUniqueId()
          XEUtils.set(row, rowkey, rowid)
        }
        if (isLazy && row[treeOpts.hasChild] && XEUtils.isUndefined(row[treeOpts.children])) {
          row[treeOpts.children] = null
        }
        const rest = { row, rowid, index: treeConfig ? -1 : index }
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
      const { keepSource, tableSourceData, treeOpts, fullDataRowIdData, fullDataRowMap, fullAllDataRowMap, fullAllDataRowIdData } = this
      const { children, hasChild } = treeOpts
      const rowkey = UtilTools.getRowkey(this)
      const rowid = UtilTools.getRowid(this, row)
      let matchObj
      if (keepSource) {
        matchObj = XEUtils.findTree(tableSourceData, item => rowid === UtilTools.getRowid(this, item), treeOpts)
      }
      XEUtils.eachTree(childs, (row, index) => {
        let rowid = UtilTools.getRowid(this, row)
        if (!rowid) {
          rowid = getRowUniqueId()
          XEUtils.set(row, rowkey, rowid)
        }
        if (row[hasChild] && XEUtils.isUndefined(row[children])) {
          row[children] = null
        }
        const rest = { row, rowid, index }
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
      const { isGroup, tableFullColumn, collectColumn, fullColumnMap } = this
      const fullColumnIdData = this.fullColumnIdData = {}
      const fullColumnFieldData = this.fullColumnFieldData = {}
      let expandColumn
      let hasFixed
      const handleFunc = (column, index) => {
        const { id: colid, property, fixed, type } = column
        const rest = { column, colid, index }
        if (property) {
          fullColumnFieldData[property] = rest
        }
        if (!hasFixed && fixed) {
          hasFixed = fixed
        }
        if (!expandColumn && type === 'expand') {
          expandColumn = column
        }
        fullColumnIdData[colid] = rest
        fullColumnMap.set(column, rest)
      }
      fullColumnMap.clear()
      if (isGroup) {
        XEUtils.eachTree(collectColumn, handleFunc)
      } else {
        tableFullColumn.forEach(handleFunc)
      }
      if (hasFixed && expandColumn) {
        UtilTools.warn('vxe.error.errConflicts', ['column.fixed', 'column.type=expand'])
      }
      this.expandColumn = expandColumn
    },
    getRowNode (tr) {
      if (tr) {
        const { treeConfig, treeOpts, tableFullData, fullAllDataRowIdData } = this
        const rowid = tr.getAttribute('data-rowid')
        if (treeConfig) {
          const matchObj = XEUtils.findTree(tableFullData, row => UtilTools.getRowid(this, row) === rowid, treeOpts)
          if (matchObj) {
            return matchObj
          }
        } else {
          if (fullAllDataRowIdData[rowid]) {
            const rest = fullAllDataRowIdData[rowid]
            return { item: rest.row, index: rest.index, items: tableFullData }
          }
        }
      }
      return null
    },
    getColumnNode (cell) {
      if (cell) {
        const { fullColumnIdData, tableFullColumn } = this
        const colid = cell.getAttribute('data-colid')
        const { column, index } = fullColumnIdData[colid]
        return { item: column, index, items: tableFullColumn }
      }
      return null
    },
    getRowIndex (row) {
      return this.fullDataRowMap.has(row) ? this.fullDataRowMap.get(row).index : -1
    },
    /**
     * 根据 row 获取相对于当前数据中的索引
     * @param {Row} row 行对象
     */
    _getRowIndex (row) {
      return this.afterFullData.indexOf(row)
    },
    /**
     * 根据 row 获取渲染中的虚拟索引
     * @param {Row} row 行对象
     */
    $getRowIndex (row) {
      return this.tableData.indexOf(row)
    },
    getColumnIndex (column) {
      return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1
    },
    /**
     * 根据 column 获取相对于当前表格列中的索引
     * @param {ColumnConfig} column 列配置
     */
    _getColumnIndex (column) {
      return this.visibleColumn.indexOf(column)
    },
    /**
     * 根据 column 获取渲染中的虚拟索引
     * @param {ColumnConfig} column 列配置
     */
    $getColumnIndex (column) {
      return this.tableColumn.indexOf(column)
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
      const { afterFullData, editStore, scrollYLoad, tableFullData, treeConfig } = this
      if (treeConfig) {
        throw new Error(UtilTools.getLog('vxe.error.noTree', ['insert']))
      }
      if (!XEUtils.isArray(records)) {
        records = [records]
      }
      const nowData = afterFullData
      const newRecords = records.map(record => this.defineField(Object.assign({}, record)))
      if (!row) {
        nowData.unshift(...newRecords)
        tableFullData.unshift(...newRecords)
      } else {
        if (row === -1) {
          nowData.push(...newRecords)
          tableFullData.push(...newRecords)
        } else {
          const targetIndex = nowData.indexOf(row)
          if (targetIndex === -1) {
            throw new Error(UtilTools.error('vxe.error.unableInsert'))
          }
          nowData.splice(...([targetIndex, 0].concat(newRecords)))
          tableFullData.splice(...([tableFullData.indexOf(row), 0].concat(newRecords)))
        }
      }
      editStore.insertList.unshift(...newRecords)
      this.handleTableData()
      this.updateFooter()
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
    defineField (record) {
      const { treeConfig, treeOpts } = this
      const rowkey = UtilTools.getRowkey(this)
      this.visibleColumn.forEach(({ property, editRender }) => {
        if (property && !XEUtils.has(record, property)) {
          XEUtils.set(record, property, editRender && !XEUtils.isUndefined(editRender.defaultValue) ? editRender.defaultValue : null)
        }
      })
      if (treeConfig && treeOpts.lazy && XEUtils.isUndefined(record[treeOpts.children])) {
        record[treeOpts.children] = null
      }
      // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数
      if (!XEUtils.get(record, rowkey)) {
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
      const rowkey = UtilTools.getRowkey(this)
      const rows = records.map(record => this.defineField(Object.assign({}, record, { [rowkey]: null })))
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
     * 删除指定行数据
     * 如果传 row 则删除一行
     * 如果传 rows 则删除多行
     */
    remove (rows) {
      const { afterFullData, tableFullData, editStore, treeConfig, checkboxOpts, selection, isInsertByRow, scrollYLoad } = this
      const { removeList, insertList } = editStore
      const property = checkboxOpts.checkField || checkboxOpts.checkProp
      let rest = []
      const nowData = afterFullData
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
        if (!isInsertByRow(row)) {
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
      this.updateFooter()
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
    removeSelecteds () {
      UtilTools.warn('vxe.error.delFunc', ['removeSelecteds', 'removeCheckboxRow'])
      return this.removeCheckboxRow()
    },
    /**
     * 删除复选框选中的数据
     */
    removeCheckboxRow () {
      return this.remove(this.getCheckboxRecords()).then(params => {
        this.clearCheckboxRow()
        return params
      })
    },
    /**
     * 删除单选框选中的数据
     */
    removeRadioRow () {
      const radioRecord = this.getRadioRecord()
      return this.remove(radioRecord || []).then(params => {
        this.clearRadioRow()
        return params
      })
    },
    /**
     * 删除当前行选中的数据
     */
    removeCurrentRow () {
      const currentRecord = this.getCurrentRecord()
      return this.remove(currentRecord || []).then(params => {
        this.clearCurrentRow()
        return params
      })
    },
    revert (...args) {
      UtilTools.warn('vxe.error.delFunc', ['revert', 'revertData'])
      return this.revertData(...args)
    },
    /**
     * 还原数据
     * 如果不传任何参数，则还原整个表格
     * 如果传 row 则还原一行
     * 如果传 rows 则还原多行
     * 如果还额外传了 field 则还原指定单元格
     */
    revertData (rows, field) {
      const { keepSource, tableSourceData, tableFullData } = this
      if (keepSource) {
        if (arguments.length) {
          if (rows && !XEUtils.isArray(rows)) {
            rows = [rows]
          }
          rows.forEach(row => {
            if (!this.isInsertByRow(row)) {
              const rowIndex = tableFullData.indexOf(row)
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
          return this.$nextTick()
        }
        return this.reloadData(tableSourceData)
      }
      return this.$nextTick()
    },
    /**
     * 清空单元格内容
     * 如果不创参数，则清空整个表格内容
     * 如果传 row 则清空一行内容
     * 如果传 rows 则清空多行内容
     * 如果还额外传了 field 则清空指定单元格内容
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
    isUpdateByRow (row, field) {
      const { visibleColumn, keepSource, treeConfig, treeOpts, tableSourceData, fullDataRowIdData } = this
      if (keepSource) {
        let oRow, property
        const rowid = UtilTools.getRowid(this, row)
        // 新增的数据不需要检测
        if (!fullDataRowIdData[rowid]) {
          return false
        }
        if (treeConfig) {
          const children = treeOpts.children
          const matchObj = XEUtils.findTree(tableSourceData, item => rowid === UtilTools.getRowid(this, item), treeOpts)
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
            return !XEUtils.isEqual(XEUtils.get(oRow, field), XEUtils.get(row, field))
          }
          for (let index = 0, len = visibleColumn.length; index < len; index++) {
            property = visibleColumn[index].property
            if (property && !XEUtils.isEqual(XEUtils.get(oRow, property), XEUtils.get(row, property))) {
              return true
            }
          }
        }
      }
      return false
    },
    /**
     * 获取表格所有列
     */
    getColumns (columnIndex) {
      const columns = this.visibleColumn
      return arguments.length ? columns[columnIndex] : columns.slice(0)
    },
    getColid (column) {
      const fullColumnMap = this.fullColumnMap
      return fullColumnMap.has(column) ? fullColumnMap.get(column).colid : null
    },
    getColumnById (colid) {
      const fullColumnIdData = this.fullColumnIdData
      return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null
    },
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
    // 在 v3.0 中废弃 getRecords
    getRecords (...args) {
      UtilTools.warn('vxe.error.delFunc', ['getRecords', 'getData'])
      return this.getData(...args)
    },
    /**
     * 获取表格所有数据
     */
    getData (rowIndex) {
      const tableSynchData = this.data || this.tableSynchData
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
    // 在 v3.0 中废弃 getSelectRecords
    getSelectRecords () {
      // UtilTools.warn('vxe.error.delFunc', ['getSelectRecords', 'getCheckboxRecords'])
      return this.getCheckboxRecords()
    },
    /**
     * 用于多选行，获取已选中的数据
     */
    getCheckboxRecords () {
      const { tableFullData, treeConfig, treeOpts, checkboxOpts } = this
      const { checkField: property } = checkboxOpts
      let rowList = []
      if (property) {
        if (treeConfig) {
          rowList = XEUtils.filterTree(tableFullData, row => XEUtils.get(row, property), treeOpts)
        } else {
          rowList = tableFullData.filter(row => XEUtils.get(row, property))
        }
      } else {
        const { selection } = this
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
      const { tableFullData, isUpdateByRow, treeConfig, treeOpts } = this
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
      const { visibleColumn, tableFullData, remoteSort, remoteFilter, filterOpts, sortOpts } = this
      let tableData = tableFullData.slice(0)
      const column = XEUtils.find(visibleColumn, column => column.order)
      const filterColumns = []
      visibleColumn.forEach(column => {
        if (column.filters && column.filters.length) {
          const valueList = []
          const itemList = []
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
              const { filterRender, property } = column
              let { filterMethod } = column
              const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
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
        const allSortMethod = sortOpts.sortMethod || this.sortMethod
        const isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : (sortOpts.remote || remoteSort)
        if (!isRemote) {
          if (allSortMethod) {
            tableData = allSortMethod({ data: tableData, column, property: column.property, order: column.order, $table: this }) || tableData
          } else {
            const rest = column.sortMethod ? tableData.sort(column.sortMethod) : XEUtils.sortBy(tableData, column.property)
            tableData = column.order === 'desc' ? rest.reverse() : rest
          }
        }
      }
      this.afterFullData = tableData
      return tableData
    },
    getRowById (rowid) {
      const fullDataRowIdData = this.fullDataRowIdData
      return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null
    },
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
      const { tableFullData, afterFullData, tableData, footerData } = this
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
      const checkboxConfig = this.checkboxConfig || this.selectConfig
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
      this.$nextTick(this.recalculate)
    },
    /**
     * 动态列处理
     */
    mergeCustomColumn (customColumns) {
      this.isUpdateCustoms = true
      this.tableFullColumn.forEach(column => {
        // 在 v3.0 中废弃 prop
        const item = XEUtils.find(customColumns, item => column.property && (item.field || item.prop) === column.property)
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
    /**
     * 手动重置列的所有操作，还原到初始状态
     * 如果已关联工具栏，则会同步更新
     */
    resetAll () {
      UtilTools.warn('vxe.error.delFunc', ['resetAll', 'resetColumn'])
      this.resetColumn(true)
    },
    /**
     * 隐藏指定列
     * @param {ColumnConfig} column 列配置
     */
    hideColumn (column) {
      column.visible = false
      return this.handleCustom()
    },
    /**
     * 显示指定列
     * @param {ColumnConfig} column 列配置
     */
    showColumn (column) {
      column.visible = true
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
    resetResizable () {
      UtilTools.warn('vxe.error.delFunc', ['resetResizable', 'resetColumn'])
      return this.resetColumn()
    },
    /**
     * 已废弃的方法
     */
    reloadCustoms (customColumns) {
      UtilTools.warn('vxe.error.delFunc', ['reloadCustoms', 'column.visible & refreshColumn'])
      return this.$nextTick().then(() => {
        this.mergeCustomColumn(customColumns)
        return this.refreshColumn().then(() => this.tableFullColumn)
      })
    },
    /**
     * 还原自定义列操作状态
     */
    restoreCustomStorage () {
      const { $toolbar, collectColumn, customConfig, customOpts } = this
      const { storage } = customOpts
      const isAllStorage = customOpts.storage === true
      const isResizable = isAllStorage || (storage && storage.resizable) || ($toolbar && $toolbar.resizableOpts.storage)
      const isVisible = isAllStorage || (storage && storage.visible) || ($toolbar && $toolbar.customOpts.storage)
      // 在 v3.0 中废弃 $toolbar 方式
      if ((customConfig || $toolbar) && (isResizable || isVisible)) {
        // 在 v3.0 中废弃 toolbar.id
        const id = customConfig ? this.id : ($toolbar ? $toolbar.id : null)
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
      const { $toolbar, collectColumn, customConfig, customOpts } = this
      const { checkMethod, storage } = customOpts
      const isAllStorage = customOpts.storage === true
      const isVisible = isAllStorage || (storage && storage.visible) || ($toolbar && $toolbar.customOpts.storage)
      // 在 v3.0 中废弃 $toolbar 方式
      if ((customConfig || $toolbar) && isVisible) {
        // 在 v3.0 中废弃 toolbar.id
        const id = customConfig ? this.id : ($toolbar ? $toolbar.id : null)
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
      const { $toolbar, collectColumn, customConfig, customOpts } = this
      const { storage } = customOpts
      const isAllStorage = customOpts.storage === true
      const isResizable = isAllStorage || (storage && storage.resizable) || ($toolbar && $toolbar.resizableOpts.storage)
      // 在 v3.0 中废弃 $toolbar 方式
      if ((customConfig || $toolbar) && isResizable) {
        // 在 v3.0 中废弃 toolbar.id
        const id = customConfig ? this.id : ($toolbar ? $toolbar.id : null)
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
     * 刷新列信息
     * 将固定的列左边、右边分别靠边
     */
    refreshColumn () {
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
          const isColGroup = UtilTools.hasChildrenList(column)
          // 如果是分组，必须按组设置固定列，不允许给子列设置固定
          if (parent && parent.fixed) {
            column.fixed = parent.fixed
          }
          if (parent && column.fixed !== parent.fixed) {
            UtilTools.error('vxe.error.groupFixed')
          }
          if (isColGroup) {
            column.visible = !!XEUtils.findTree(column.children, subColumn => UtilTools.hasChildrenList(subColumn) ? null : subColumn.visible)
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
      let tableColumn = visibleColumn
      let scrollXLoad = sXOpts && sXOpts.gt && sXOpts.gt < tableFullColumn.length
      Object.assign(columnStore, { leftList, centerList, rightList })
      if (scrollXLoad && isGroup) {
        scrollXLoad = false
        UtilTools.warn('vxe.error.scrollXNotGroup')
      }
      if (scrollXLoad) {
        if (this.showHeader && !this.showHeaderOverflow) {
          UtilTools.warn('vxe.error.reqProp', ['show-header-overflow'])
        }
        if (this.showFooter && !this.showFooterOverflow) {
          UtilTools.warn('vxe.error.reqProp', ['show-footer-overflow'])
        }
        Object.assign(scrollXStore, {
          startIndex: 0,
          visibleIndex: 0
        })
        tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize)
      }
      this.scrollXLoad = scrollXLoad
      this.tableColumn = tableColumn
      this.visibleColumn = visibleColumn
      return this.$nextTick().then(() => {
        this.updateFooter()
        this.recalculate(true)
      })
    },
    /**
     * 指定列宽的列进行拆分
     */
    analyColumnWidth () {
      const { columnWidth, columnMinWidth } = this
      const resizeList = []
      const pxList = []
      const pxMinList = []
      const scaleList = []
      const scaleMinList = []
      const autoList = []
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
      const { tableBody, tableHeader, tableFooter } = this.$refs
      const bodyElem = tableBody ? tableBody.$el : null
      const headerElem = tableHeader ? tableHeader.$el : null
      const footerElem = tableFooter ? tableFooter.$el : null
      if (bodyElem) {
        let bodyWidth = bodyElem.clientWidth
        this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth)
        if (refull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          return this.computeScrollLoad().then(() => {
            bodyWidth = bodyElem.clientWidth
            this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth)
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
      let tableWidth = 0
      const minCellWidth = 40 // 列宽最少限制 40px
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
      this.scrollbarWidth = overflowY ? bodyElem.offsetWidth - bodyWidth : 0
      this.overflowY = overflowY
      this.tableWidth = tableWidth
      this.tableHeight = tableHeight
      this.parentHeight = this.getParentHeight()
      if (headerElem) {
        this.headerHeight = headerElem.clientHeight
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
      if (this.overflowX) {
        this.checkScrolling()
      }
      return tableWidth
    },
    /**
     * 处理固定列的显示状态
     */
    checkScrolling () {
      const { tableBody, leftBody, rightBody } = this.$refs
      const bodyElem = tableBody ? tableBody.$el : null
      if (bodyElem) {
        if (leftBody) {
          this.scrollLeftToRight = bodyElem.scrollLeft > 0
        }
        if (rightBody) {
          this.scrollRightToLeft = bodyElem.clientWidth < bodyElem.scrollWidth - Math.ceil(bodyElem.scrollLeft)
        }
      }
    },
    preventEvent (evnt, type, args, next, end) {
      const evntList = VXETable.interceptor.get(type)
      let rest
      if (!evntList.some(func => func(Object.assign({ $grid: this.$xegrid, $table: this, $event: evnt }, args), evnt, this) === false)) {
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
      const { $el, $refs, mouseConfig, mouseOpts, editStore, ctxMenuStore, editOpts, filterStore, getRowNode } = this
      const { actived } = editStore
      const { filterWrapper, validTip } = $refs
      // 在 v3.0 中废弃 mouse-config.checked
      const isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked)
      if (filterWrapper) {
        if (DomTools.getEventTargetNode(evnt, this.$el, 'vxe-cell--filter').flag) {
          // 如果点击了筛选按钮
        } else if (DomTools.getEventTargetNode(evnt, filterWrapper.$el).flag) {
          // 如果点击筛选容器
        } else {
          if (!DomTools.getEventTargetNode(evnt, document.body, 'vxe-dropdown--panel').flag) {
            this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter)
          }
        }
      }
      // 如果已激活了编辑状态
      if (actived.row) {
        if (!(editOpts.autoClear === false)) {
          if (validTip && DomTools.getEventTargetNode(evnt, validTip.$el).flag) {
            // 如果是激活状态，且点击了校验提示框
          } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            // 如果是激活状态，且点击了下拉选项
            if (!DomTools.getEventTargetNode(evnt, document.body, 'vxe-dropdown--panel').flag) {
              // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
              this.preventEvent(evnt, 'event.clearActived', actived.args, () => {
                let isClear
                if (editOpts.mode === 'row') {
                  const rowNode = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--row')
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
                  // this.triggerValidate('blur').then(a => {
                  // 保证 input 的 change 事件能先触发之后再清除
                  setTimeout(() => this.clearActived(evnt))
                  // }).catch(e => e)
                }
              })
            }
          }
        }
      } else if (mouseConfig) {
        if (!DomTools.getEventTargetNode(evnt, $el).flag && !DomTools.getEventTargetNode(evnt, $refs.tableWrapper).flag) {
          if (isMouseChecked) {
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
    handleGlobalBlurEvent () {
      this.closeFilter()
      this.closeMenu()
    },
    /**
     * 全局滚动事件
     */
    handleGlobalMousewheelEvent () {
      this.clostTooltip()
      this.closeMenu()
    },
    /**
     * 全局键盘事件
     */
    handleGlobalKeydownEvent (evnt) {
      // 该行为只对当前激活的表格有效
      if (this.isActivated) {
        this.preventEvent(evnt, 'event.keydown', null, () => {
          let params
          const { isCtxMenu, ctxMenuStore, editStore, editOpts, mouseConfig = {}, keyboardConfig = {}, treeConfig, treeOpts, highlightCurrentRow, currentRow } = this
          const { selected, actived } = editStore
          const keyCode = evnt.keyCode
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
          const isC = keyCode === 67
          const isV = keyCode === 86
          const isX = keyCode === 88
          const isF2 = keyCode === 113
          const isCtrlKey = evnt.ctrlKey
          const isShiftKey = evnt.shiftKey
          const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
          const operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow)
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
          } else if (isEnter && keyboardConfig.isEnter && (selected.row || actived.row || (treeConfig && highlightCurrentRow && currentRow))) {
            // 退出选中
            if (isCtrlKey) {
              // 如果是激活编辑状态，则取消编辑
              if (actived.row) {
                params = actived.args
                this.clearActived(evnt)
                // 如果配置了选中功能，则为选中状态
                if (mouseConfig.selected) {
                  this.$nextTick(() => this.handleSelected(params, evnt))
                }
              }
            } else {
              // 如果是激活状态，退则出到上一行/下一行
              if (selected.row || actived.row) {
                if (isShiftKey) {
                  this.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, true, isRightArrow, false, evnt)
                } else {
                  this.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, false, isRightArrow, true, evnt)
                }
              } else if (treeConfig && highlightCurrentRow && currentRow) {
                // 如果是树形表格当前行回车移动到子节点
                const childrens = currentRow[treeOpts.children]
                if (childrens && childrens.length) {
                  evnt.preventDefault()
                  const targetRow = childrens[0]
                  params = { $table: this, row: targetRow }
                  this.setTreeExpansion(currentRow, true)
                    .then(() => this.scrollToRow(targetRow))
                    .then(() => this.triggerCurrentRowEvent(evnt, params))
                }
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
              const { parent: parentRow } = XEUtils.findTree(this.afterFullData, item => item === currentRow, treeOpts)
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
          } else if (keyboardConfig.isEdit && !isCtrlKey && (isSpacebar || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222))) {
            // 启用编辑后，空格键功能将失效
            if (isSpacebar) {
              evnt.preventDefault()
            }
            // 如果是按下非功能键之外允许直接编辑
            if (selected.row || selected.column) {
              if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
                if (!editOpts.activeMethod || editOpts.activeMethod(selected.args)) {
                  UtilTools.setCellValue(selected.row, selected.column, null)
                  this.handleActived(selected.args, evnt)
                }
              }
            }
          }
          this.$emit('keydown', { $table: this, $event: evnt })
        })
      }
    },
    // 处理 Tab 键移动
    moveTabSelected (args, isLeft, evnt) {
      const { afterFullData, visibleColumn, editConfig, editOpts, isSeqColumn } = this
      let targetRow
      let targetRowIndex
      let targetColumn
      let targetColumnIndex
      const params = Object.assign({}, args)
      const rowIndex = afterFullData.indexOf(params.row)
      const columnIndex = visibleColumn.indexOf(params.column)
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
          if (editOpts.trigger === 'click' || editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row') {
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
      const { currentRow, treeConfig, treeOpts, afterFullData } = this
      let targetRow
      evnt.preventDefault()
      if (treeConfig) {
        const { index, items } = XEUtils.findTree(afterFullData, item => item === currentRow, treeOpts)
        if (isUpArrow && index > 0) {
          targetRow = items[index - 1]
        } else if (isDwArrow && index < items.length - 1) {
          targetRow = items[index + 1]
        }
      } else {
        const _rowIndex = this._getRowIndex(currentRow)
        if (isUpArrow && _rowIndex > 0) {
          targetRow = afterFullData[_rowIndex - 1]
        } else if (isDwArrow && _rowIndex < afterFullData.length - 1) {
          targetRow = afterFullData[_rowIndex + 1]
        }
      }
      if (targetRow) {
        const params = { $table: this, row: targetRow }
        this.scrollToRow(targetRow)
          .then(() => this.triggerCurrentRowEvent(evnt, params))
      }
    },
    // 处理方向键移动
    moveSelected (args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      const { afterFullData, visibleColumn } = this
      const params = Object.assign({}, args)
      let _rowIndex = this._getRowIndex(params.row)
      evnt.preventDefault()
      if (isUpArrow && _rowIndex) {
        _rowIndex -= 1
        params.row = afterFullData[_rowIndex]
      } else if (isDwArrow && _rowIndex < afterFullData.length - 1) {
        _rowIndex += 1
        params.row = afterFullData[_rowIndex]
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
      if (params.rowIndex > -1) {
        params.rowIndex = _rowIndex
      }
      params.cell = DomTools.getCell(this, params)
      this.handleSelected(params, evnt)
      this.scrollToRow(params.row, params.column)
    },
    // 处理菜单的移动
    moveCtxMenu (evnt, keyCode, ctxMenuStore, property, operKey, operRest, menuList) {
      let selectItem
      const selectIndex = XEUtils.findIndexOf(menuList, item => ctxMenuStore[property] === item)
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
      this.closeMenu()
      this.recalculate()
    },
    /**
     * 快捷菜单事件处理
     */
    handleGlobalContextmenuEvent (evnt) {
      const { $refs, tId, contextMenu, ctxMenuStore, ctxMenuOpts } = this
      const layoutList = ['header', 'body', 'footer']
      if (contextMenu) {
        if (ctxMenuStore.visible) {
          if (ctxMenuStore.visible && $refs.ctxWrapper && DomTools.getEventTargetNode(evnt, $refs.ctxWrapper.$el).flag) {
            evnt.preventDefault()
            return
          }
        }
        // 分别匹配表尾、内容、表尾的快捷菜单
        for (let index = 0; index < layoutList.length; index++) {
          const layout = layoutList[index]
          const columnTargetNode = DomTools.getEventTargetNode(evnt, this.$el, `vxe-${layout}--column`, target => {
            // target=td|th，直接向上找 table 去匹配即可
            return target.parentNode.parentNode.parentNode.getAttribute('data-tid') === tId
          })
          const params = { type: layout, $table: this, columns: this.visibleColumn.slice(0), $event: evnt }
          if (columnTargetNode.flag) {
            const cell = columnTargetNode.targetElem
            const column = this.getColumnNode(cell).item
            let typePrefix = `${layout}-`
            Object.assign(params, { column, columnIndex: this.getColumnIndex(column), cell })
            if (layout === 'body') {
              const row = this.getRowNode(cell.parentNode).item
              typePrefix = ''
              params.row = row
              params.rowIndex = this.getRowIndex(row)
            }
            this.openContextMenu(evnt, layout, params)
            UtilTools.emitEvent(this, `${typePrefix}cell-context-menu`, [params, evnt])
            return
          } else if (DomTools.getEventTargetNode(evnt, this.$el, `vxe-table--${layout}-wrapper`, target => target.getAttribute('data-tid') === tId).flag) {
            if (ctxMenuOpts.trigger === 'cell') {
              evnt.preventDefault()
            } else {
              this.openContextMenu(evnt, layout, params)
            }
            return
          }
        }
      }
      if ($refs.filterWrapper && !DomTools.getEventTargetNode(evnt, $refs.filterWrapper.$el).flag) {
        this.closeFilter()
      }
      this.closeMenu()
    },
    /**
     * 显示快捷菜单
     */
    openContextMenu (evnt, type, params) {
      const { ctxMenuStore, ctxMenuOpts } = this
      const config = ctxMenuOpts[type]
      const visibleMethod = ctxMenuOpts.visibleMethod
      if (config) {
        const { options, disabled } = config
        if (disabled) {
          evnt.preventDefault()
        } else if (options && options.length) {
          params.options = options
          this.preventEvent(evnt, 'event.showMenu', params, null, () => {
            if (!visibleMethod || visibleMethod(params, evnt)) {
              evnt.preventDefault()
              this.updateZindex()
              const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = DomTools.getDomNode()
              const top = evnt.clientY + scrollTop
              const left = evnt.clientX + scrollLeft
              Object.assign(ctxMenuStore, {
                args: params,
                visible: true,
                list: options,
                selected: null,
                selectChild: null,
                showChild: false,
                childPos: null,
                style: {
                  zIndex: this.tZindex,
                  top: `${top}px`,
                  left: `${left}px`
                }
              })
              this.$nextTick(() => {
                const ctxElem = this.$refs.ctxWrapper.$el
                const clientHeight = ctxElem.clientHeight
                const clientWidth = ctxElem.clientWidth
                const offsetTop = evnt.clientY + clientHeight - visibleHeight
                const offsetLeft = evnt.clientX + clientWidth - visibleWidth
                if (offsetTop > -10) {
                  ctxMenuStore.style.top = `${Math.max(scrollTop + 2, top - clientHeight - 2)}px`
                }
                if (offsetLeft > -10) {
                  ctxMenuStore.style.left = `${Math.max(scrollLeft + 2, left - clientWidth - 2)}px`
                }
                if (offsetLeft > -220) {
                  ctxMenuStore.childPos = 'left'
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
        childPos: null,
        selectChild: null,
        showChild: false
      })
      return this.$nextTick()
    },
    ctxMenuMouseoverEvent (evnt, item, child) {
      const ctxMenuStore = this.ctxMenuStore
      evnt.preventDefault()
      evnt.stopPropagation()
      ctxMenuStore.selected = item
      ctxMenuStore.selectChild = child
      if (!child) {
        ctxMenuStore.showChild = UtilTools.hasChildrenList(item)
      }
    },
    ctxMenuMouseoutEvent (evnt, item) {
      const ctxMenuStore = this.ctxMenuStore
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
        const ctxMenuMethod = VXETable.menus.get(menu.code)
        const params = Object.assign({ menu, $table: this }, this.ctxMenuStore.args)
        if (ctxMenuMethod) {
          ctxMenuMethod.call(this, params, evnt)
        }
        UtilTools.emitEvent(this, 'context-menu-click', [Object.assign({ menu, $table: this, $event: evnt }, this.ctxMenuStore.args), evnt])
        this.closeMenu()
      }
    },
    handleTooltipLeaveEvent () {
      const tooltipOpts = this.tooltipOpts
      setTimeout(() => {
        if (!this.tooltipActive) {
          this.clostTooltip()
        }
      }, tooltipOpts.leaveDelay)
    },
    handleTargetEnterEvent () {
      clearTimeout(this.tooltipTimeout)
      this.tooltipActive = true
      this.clostTooltip()
    },
    handleTargetLeaveEvent () {
      const tooltipOpts = this.tooltipOpts
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
      const { tooltipStore } = this
      const { column } = params
      const cell = evnt.currentTarget
      this.handleTargetEnterEvent()
      if (tooltipStore.column !== column || !tooltipStore.visible) {
        this.handleTooltip(evnt, cell, cell.querySelector('.vxe-cell--title'), column)
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
        this.handleTooltip(evnt, cell, cell.children[0], column)
      }
    },
    /**
     * 触发 tooltip 事件
     */
    triggerTooltipEvent (evnt, params) {
      const { editConfig, editOpts, editStore, tooltipStore } = this
      const { actived } = editStore
      const { row, column } = params
      const cell = evnt.currentTarget
      this.handleTargetEnterEvent()
      if (editConfig) {
        if ((editOpts.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {
          return
        }
      }
      if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
        this.handleTooltip(evnt, cell, column.treeNode ? cell.querySelector('.vxe-tree-cell') : cell.children[0], column, row)
      }
    },
    /**
     * 处理显示 tooltip
     * @param {Event} evnt 事件
     * @param {ColumnConfig} column 列配置
     * @param {Row} row 行对象
     */
    handleTooltip (evnt, cell, overflowElem, column, row) {
      const tooltip = this.$refs.tooltip
      const content = column.type === 'html' ? overflowElem.innerText : overflowElem.textContent
      if (content && overflowElem.scrollWidth > overflowElem.clientWidth) {
        Object.assign(this.tooltipStore, {
          row,
          column,
          visible: true
        })
        if (tooltip) {
          tooltip.toVisible(overflowElem, UtilTools.formatText(content))
        }
      }
      return this.$nextTick()
    },
    // 关闭 tooltip
    clostTooltip () {
      const tooltip = this.$refs.tooltip
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
     * 判断复选框是否全选
     */
    isAllCheckboxChecked () {
      return this.isAllSelected
    },
    /**
     * 判断复选框是否全选
     */
    isCheckboxIndeterminate () {
      return this.isIndeterminate
    },
    /**
     * 获取复选框半选状态的行数据
     */
    getCheckboxIndeterminateRecords () {
      const { treeConfig, treeIndeterminates } = this
      if (treeConfig) {
        return treeIndeterminates.slice(0)
      }
      return []
    },
    /**
     * 处理复选框默认勾选
     */
    handleDefaultSelectionChecked () {
      const { fullDataRowIdData, checkboxOpts, checkboxReserveRowMap } = this
      const { checkAll, checkRowKeys } = checkboxOpts
      if (checkAll) {
        this.setAllCheckboxRow(true)
      } else if (checkRowKeys) {
        const defSelection = []
        const rowkey = UtilTools.getRowkey(this)
        checkRowKeys.forEach(rowid => {
          if (fullDataRowIdData[rowid]) {
            defSelection.push(fullDataRowIdData[rowid].row)
          }
          if (checkboxOpts.reserve) {
            checkboxReserveRowMap[rowid] = { [rowkey]: rowid }
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
      const { checkField: property } = this.checkboxOpts
      if (property) {
        return XEUtils.get(row, property)
      }
      return this.selection.indexOf(row) > -1
    },
    /**
     * 多选，行选中处理
     * value 选中true 不选false 不确定-1
     */
    handleSelectRow ({ row }, value) {
      const { selection, tableFullData, treeConfig, treeOpts, treeIndeterminates, checkboxOpts } = this
      const { checkStrictly, checkMethod } = checkboxOpts
      const property = checkboxOpts.checkField || checkboxOpts.checkProp
      if (property) {
        if (treeConfig && !checkStrictly) {
          if (value === -1) {
            if (treeIndeterminates.indexOf(row) === -1) {
              treeIndeterminates.push(row)
            }
            XEUtils.set(row, property, false)
          } else {
            // 更新子节点状态
            XEUtils.eachTree([row], (item, $rowIndex) => {
              if (row === item || (!checkMethod || checkMethod({ row: item, $rowIndex }))) {
                XEUtils.set(item, property, value)
                this.handleCheckboxReserveRow(row, value)
              }
            }, treeOpts)
            XEUtils.remove(treeIndeterminates, item => item === row)
          }
          // 如果存在父节点，更新父节点状态
          const matchObj = XEUtils.findTree(tableFullData, item => item === row, treeOpts)
          if (matchObj && matchObj.parent) {
            let parentStatus
            const vItems = checkMethod ? matchObj.items.filter((item, $rowIndex) => checkMethod({ row: item, $rowIndex })) : matchObj.items
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
          XEUtils.set(row, property, value)
          this.handleCheckboxReserveRow(row, value)
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
            XEUtils.eachTree([row], (item, $rowIndex) => {
              if (row === item || (!checkMethod || checkMethod({ row: item, $rowIndex }))) {
                if (value) {
                  selection.push(item)
                } else {
                  XEUtils.remove(selection, select => select === item)
                }
                this.handleCheckboxReserveRow(row, value)
              }
            }, treeOpts)
            XEUtils.remove(treeIndeterminates, item => item === row)
          }
          // 如果存在父节点，更新父节点状态
          const matchObj = XEUtils.findTree(tableFullData, item => item === row, treeOpts)
          if (matchObj && matchObj.parent) {
            let parentStatus
            const vItems = checkMethod ? matchObj.items.filter((item, $rowIndex) => checkMethod({ row: item, $rowIndex })) : matchObj.items
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
      this.checkSelectionStatus()
    },
    handleToggleCheckRowEvent (params, evnt) {
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
      if (!checkMethod || checkMethod({ row: params.row, rowIndex: params.rowIndex, $rowIndex: params.$rowIndex })) {
        this.handleSelectRow(params, value)
        const records = this.getCheckboxRecords()
        // 在 v3.0 中废弃 select-change
        if (this.$listeners['select-change']) {
          UtilTools.warn('vxe.error.delEvent', ['select-change', 'checkbox-change'])
          this.$emit('select-change', Object.assign({ records, selection: records, reserves: this.getCheckboxReserveRecords(), checked: value, $table: this, $event: evnt }, params), evnt)
        } else {
          this.$emit('checkbox-change', Object.assign({ records, selection: records, reserves: this.getCheckboxReserveRecords(), indeterminates: this.getCheckboxIndeterminateRecords(), checked: value, $table: this, $event: evnt }, params), evnt)
        }
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
      const { afterFullData, treeConfig, treeOpts, selection, checkboxReserveRowMap, checkboxOpts } = this
      const { reserve, checkStrictly, checkMethod } = checkboxOpts
      const property = checkboxOpts.checkField || checkboxOpts.checkProp
      let selectRows = []
      const beforeSelection = treeConfig ? [] : selection.filter(row => afterFullData.indexOf(row) === -1)
      if (!checkStrictly) {
        if (property) {
          const indexKey = `${treeConfig ? '$' : ''}rowIndex`
          const setValFn = (row, rowIndex) => {
            if (!checkMethod || checkMethod({ row, [indexKey]: rowIndex, $rowIndex: rowIndex })) {
              XEUtils.set(row, property, value)
            }
          }
          const clearValFn = (row, rowIndex) => {
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
              checkboxReserveRowMap[UtilTools.getRowid(this, row)] = row
            })
          } else {
            afterFullData.forEach(row => {
              const rowid = UtilTools.getRowid(this, row)
              if (checkboxReserveRowMap[rowid]) {
                delete checkboxReserveRowMap[rowid]
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
      const { afterFullData, selection, treeIndeterminates, checkboxOpts } = this
      const { checkStrictly, checkMethod } = checkboxOpts
      const property = checkboxOpts.checkField || checkboxOpts.checkProp
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
      const { treeConfig, fullDataRowIdData, radioReserveRow, radioOpts, checkboxReserveRowMap, checkboxOpts } = this
      const reserveSelection = []
      const reserveRowExpandeds = []
      const reserveTreeExpandeds = []
      const reserveTreeIndeterminates = []
      // 单选框
      if (radioOpts.reserve && radioReserveRow) {
        const rowid = UtilTools.getRowid(this, radioReserveRow)
        if (fullDataRowIdData[rowid]) {
          this.setRadioRow(fullDataRowIdData[rowid].row)
        }
      }
      // 复选框
      this.handleReserveByRowid(this.selection, reserveSelection)
      if (checkboxOpts.reserve) {
        XEUtils.each(checkboxReserveRowMap, (item, rowid) => {
          if (fullDataRowIdData[rowid] && reserveSelection.indexOf(fullDataRowIdData[rowid].row) === -1) {
            reserveSelection.push(fullDataRowIdData[rowid].row)
          }
        })
      }
      this.setCheckboxRow(reserveSelection, true)
      // 行展开
      this.handleReserveByRowid(this.rowExpandeds, reserveRowExpandeds)
      this.rowExpandeds = reserveRowExpandeds
      // 树展开
      if (treeConfig) {
        this.handleReserveByRowid(this.treeIndeterminates, reserveTreeIndeterminates)
        this.handleReserveByRowid(this.treeExpandeds, reserveTreeExpandeds)
      }
      this.treeExpandeds = reserveTreeExpandeds
      this.treeIndeterminates = reserveTreeIndeterminates
    },
    handleReserveByRowid (list, rest) {
      const fullDataRowIdData = this.fullDataRowIdData
      list.forEach(row => {
        const rowid = UtilTools.getRowid(this, row)
        if (fullDataRowIdData[rowid]) {
          rest.push(fullDataRowIdData[rowid].row)
        }
      })
    },
    /**
     * 获取单选框保留选中的行
     */
    getRadioReserveRecord () {
      const { fullDataRowIdData, radioReserveRow, radioOpts } = this
      if (radioOpts.reserve && radioReserveRow) {
        if (!fullDataRowIdData[UtilTools.getRowid(this, radioReserveRow)]) {
          return radioReserveRow
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
    // 在 v3.0 中废弃 getSelectReserveRecords
    getSelectReserveRecords () {
      // UtilTools.warn('vxe.error.delFunc', ['getSelectReserveRecords', 'getCheckboxReserveRecords'])
      return this.getCheckboxReserveRecords()
    },
    /**
     * 获取保留选中的行
     */
    getCheckboxReserveRecords () {
      const { fullDataRowIdData, checkboxReserveRowMap, checkboxOpts } = this
      const reserveSelection = []
      if (checkboxOpts.reserve) {
        Object.keys(checkboxReserveRowMap).forEach(rowid => {
          if (!fullDataRowIdData[rowid]) {
            reserveSelection.push(checkboxReserveRowMap[rowid])
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
      this.checkboxReserveRowMap = {}
      return this.$nextTick()
    },
    handleCheckboxReserveRow (row, checked) {
      const { checkboxReserveRowMap, checkboxOpts } = this
      if (checkboxOpts.reserve) {
        const rowid = UtilTools.getRowid(this, row)
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
      const records = this.getCheckboxRecords()
      // 在 v3.0 中废弃 select-all
      if (this.$listeners['select-all']) {
        UtilTools.warn('vxe.error.delEvent', ['select-all', 'checkbox-all'])
        this.$emit('select-all', { records, selection: records, reserves: this.getCheckboxReserveRecords(), checked: value, $table: this, $event: evnt }, evnt)
      } else {
        this.$emit('checkbox-all', { records, selection: records, reserves: this.getCheckboxReserveRecords(), indeterminates: this.getCheckboxIndeterminateRecords(), checked: value, $table: this, $event: evnt }, evnt)
      }
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
      const { tableFullData, treeConfig, treeOpts, checkboxOpts, checkboxReserveRowMap } = this
      const { checkField: property, reserve } = checkboxOpts
      if (property) {
        if (treeConfig) {
          XEUtils.eachTree(tableFullData, item => XEUtils.set(item, property, false), treeOpts)
        } else {
          tableFullData.forEach(item => XEUtils.set(item, property, false))
        }
      }
      if (reserve) {
        tableFullData.forEach(row => {
          const rowid = UtilTools.getRowid(this, row)
          if (checkboxReserveRowMap[rowid]) {
            delete checkboxReserveRowMap[rowid]
          }
        })
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
          const rowkey = UtilTools.getRowkey(this)
          this.radioReserveRow = { [rowkey]: rowid }
        }
      }
    },
    /**
     * 单选，行选中事件
     */
    triggerRadioRowEvent (evnt, params) {
      const { radioOpts } = this
      const { checkMethod } = radioOpts
      if (!checkMethod || checkMethod({ row: params.row, rowIndex: params.rowIndex, $rowIndex: params.$rowIndex })) {
        const isChange = this.selectRow !== params.row
        this.setRadioRow(params.row)
        if (isChange) {
          this.$emit('radio-change', Object.assign({ $event: evnt }, params), evnt)
        }
      }
    },
    triggerCurrentRowEvent (evnt, params) {
      const isChange = this.currentRow !== params.row
      this.setCurrentRow(params.row)
      if (isChange) {
        this.$emit('current-change', Object.assign({ $event: evnt }, params), evnt)
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
    isCheckedByRadioRow (row) {
      return this.selectRow === row
    },
    setRadioRow (row) {
      this.selectRow = row
      this.handleRadioReserveRow(row)
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
      this.hoverRow = row
    },
    clearHoverRow () {
      this.hoverRow = null
    },
    /**
     * 选中事件
     */
    triggerCellMousedownEvent (evnt, params) {
      const { $el, tableData, visibleColumn, editStore, checkboxOpts, mouseConfig, mouseOpts, editConfig, editOpts, handleSelected, handleChecked } = this
      const { checked, actived } = editStore
      const { row, column } = params
      const { button } = evnt
      const cell = evnt.currentTarget
      const isLeftBtn = button === 0
      const isRightBtn = button === 2
      // 在 v3.0 中废弃 mouse-config.checked
      const isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked)
      params.cell = cell
      if (isLeftBtn || isRightBtn) {
        if (isMouseChecked) {
          if (editConfig && editOpts.trigger === 'dblclick') {
            if ((editOpts.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {
              // 如果已经是激活状态
            } else {
              if (isLeftBtn) {
                this.handleSelected(params, evnt)
                const domMousemove = document.onmousemove
                const domMouseup = document.onmouseup
                const start = DomTools.getCellIndexs(cell)
                const updateEvent = XEUtils.throttle(function (evnt) {
                  const { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
                  if (flag) {
                    handleChecked(start, DomTools.getCellIndexs(targetElem), evnt)
                  }
                }, browse.msie ? 80 : 40, { leading: true, trailing: true })
                document.onmousemove = evnt => {
                  evnt.preventDefault()
                  evnt.stopPropagation()
                  updateEvent(evnt)
                }
                document.onmouseup = function () {
                  document.onmousemove = domMousemove
                  document.onmouseup = domMouseup
                }
                this.closeFilter()
                this.closeMenu()
              } else {
                // 如果不在所有选中的范围之内则重新选中
                const select = DomTools.getCellIndexs(cell)
                if (checked.rows.indexOf(tableData[select.rowIndex]) === -1 || checked.columns.indexOf(visibleColumn[select.columnIndex]) === -1) {
                  handleSelected(params, evnt)
                }
              }
            }
          }
        } else if (checkboxOpts.range) {
          this.handleCheckboxRangeEvent(evnt, params)
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
      const { $el, tableData, visibleColumn, editStore, editConfig, editOpts, handleTempChecked } = this
      const { checked } = editStore
      const { button } = evnt
      const isLeftBtn = button === 0
      const isRightBtn = button === 2
      if (isLeftBtn || isRightBtn) {
        if (editConfig && checked.rows.length && editOpts.trigger === 'dblclick') {
          const domMousemove = document.onmousemove
          const domMouseup = document.onmouseup
          const start = {
            rowIndex: tableData.indexOf(checked.rows[0]),
            columnIndex: visibleColumn.indexOf(checked.columns[0])
          }
          const updateEvent = XEUtils.throttle(function (evnt) {
            const { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
            if (flag) {
              handleTempChecked(start, DomTools.getCellIndexs(targetElem), evnt)
            }
          }, browse.msie ? 80 : 40, { leading: true, trailing: true })
          document.onmousemove = evnt => {
            evnt.preventDefault()
            evnt.stopPropagation()
            updateEvent(evnt)
          }
          document.onmouseup = function () {
            document.onmousemove = domMousemove
            document.onmouseup = domMouseup
            checked.rows = checked.tRows
            checked.columns = checked.tColumns
          }
        }
      }
      this.isActivated = true
    },
    getCheckboxRangeResult (targetTrElem, moveRange) {
      let countHeight = 0
      const rangeRows = []
      const siblingProp = moveRange > 0 ? 'next' : 'previous'
      const moveSize = moveRange > 0 ? moveRange : (Math.abs(moveRange) + targetTrElem.offsetHeight)
      while (targetTrElem && countHeight < moveSize) {
        rangeRows.push(this.getRowNode(targetTrElem).item)
        countHeight += targetTrElem.offsetHeight
        targetTrElem = targetTrElem[`${siblingProp}ElementSibling`]
      }
      return rangeRows
    },
    handleCheckboxRangeEvent (evnt, params) {
      const { column, cell } = params
      // 在 v3.0 中废弃 type=selection
      if (['checkbox', 'selection'].indexOf(column.type) > -1) {
        const disX = evnt.clientX
        const disY = evnt.clientY
        const checkboxRangeElem = this.$refs.checkboxRange
        const domMousemove = document.onmousemove
        const domMouseup = document.onmouseup
        const trEleme = cell.parentNode
        const absPos = DomTools.getAbsolutePos(trEleme)
        const { scrollTop, scrollLeft } = DomTools.getDomNode()
        const selectRecords = this.getCheckboxRecords()
        let lastRangeRows = []
        this.updateZindex()
        document.onmousemove = evnt => {
          evnt.preventDefault()
          evnt.stopPropagation()
          const offsetLeft = evnt.clientX - disX
          const offsetTop = evnt.clientY - disY
          const rangeHeight = Math.abs(offsetTop)
          const rangeRows = this.getCheckboxRangeResult(trEleme, evnt.clientY - absPos.boundingTop)
          checkboxRangeElem.style.display = 'block'
          checkboxRangeElem.style.width = `${Math.abs(offsetLeft)}px`
          checkboxRangeElem.style.height = `${rangeHeight}px`
          checkboxRangeElem.style.left = `${scrollLeft + disX + (offsetLeft > 0 ? 0 : offsetLeft)}px`
          checkboxRangeElem.style.top = `${scrollTop + disY + (offsetTop > 0 ? 0 : offsetTop)}px`
          checkboxRangeElem.style.zIndex = `${this.tZindex}`
          // 至少滑动 10px 才能有效匹配
          if (rangeHeight > 10 && rangeRows.length !== lastRangeRows.length) {
            lastRangeRows = rangeRows
            if (evnt.ctrlKey) {
              rangeRows.forEach(row => {
                this.handleSelectRow({ row }, selectRecords.indexOf(row) === -1)
              })
            } else {
              this.setAllCheckboxRow(false)
              this.setCheckboxRow(rangeRows, true)
            }
          }
        }
        document.onmouseup = () => {
          checkboxRangeElem.removeAttribute('style')
          document.onmousemove = domMousemove
          document.onmouseup = domMouseup
        }
      }
    },
    triggerHeaderCellClickEvent (evnt, params) {
      const cell = evnt.currentTarget
      const { _lastResizeTime, sortOpts } = this
      const { column } = params
      const triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300
      const triggerSort = DomTools.getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
      const triggerFilter = DomTools.getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
      if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
        this.triggerSortEvent(evnt, column, getNextSortOrder(this, column))
      }
      this.$emit('header-cell-click', Object.assign({ triggerResizable, triggerSort, triggerFilter, cell, $event: evnt }, params), evnt)
      return this.setCurrentColumn(column)
    },
    triggerHeaderCellDBLClickEvent (evnt, params) {
      this.$emit('header-cell-dblclick', Object.assign({ cell: evnt.currentTarget, $event: evnt }, params), evnt)
    },
    getCurrentColumn () {
      return this.currentColumn
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
      const { $el, highlightCurrentRow, editStore, radioOpts, expandOpts, treeOpts, editConfig, editOpts, checkboxOpts } = this
      const { actived } = editStore
      const { column, row } = params
      const cell = evnt.currentTarget
      params.cell = cell
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
          // 在 v3.0 中废弃 selection
          this.handleToggleCheckRowEvent(params, evnt)
        }
        if (editConfig) {
          if (editOpts.trigger === 'click') {
            if (!actived.args || row !== actived.row || column !== actived.column) {
              if (editOpts.mode === 'row') {
                this.triggerValidate('blur')
                  .catch(e => e)
                  .then(() => {
                    this.handleActived(params, evnt)
                      .then(() => this.triggerValidate('change'))
                      .catch(e => e)
                  })
              } else if (editOpts.mode === 'cell') {
                this.handleActived(params, evnt)
                  .then(() => this.triggerValidate('change'))
                  .catch(e => e)
              }
            }
          } else if (editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row' && actived.row === row) {
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
      UtilTools.emitEvent(this, 'cell-click', [Object.assign({ $event: evnt }, params), evnt])
    },
    /**
     * 列双击点击事件
     * 如果是双击模式，则激活为编辑状态
     */
    triggerCellDBLClickEvent (evnt, params) {
      const { editStore, editConfig, editOpts } = this
      const { actived } = editStore
      const cell = evnt.currentTarget
      params.cell = cell
      if (editConfig) {
        if (editOpts.trigger === 'dblclick') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            if (editOpts.mode === 'row') {
              this.triggerValidate('blur').catch(e => e).then(() => {
                this.handleActived(params, evnt)
                  .then(() => this.triggerValidate('change'))
                  .catch(e => e)
              })
            } else if (editOpts.mode === 'cell') {
              this.handleActived(params, evnt)
                .then(() => this.triggerValidate('change'))
                .catch(e => e)
            }
          }
        }
      }
      UtilTools.emitEvent(this, 'cell-dblclick', [Object.assign({ $event: evnt }, params), evnt])
    },
    /**
     * 处理激活编辑
     */
    handleActived (params, evnt) {
      const { editStore, editOpts } = this
      const { mode, activeMethod } = editOpts
      const { actived } = editStore
      const { row, column, cell } = params
      const { editRender } = column
      if (editRender && cell) {
        if (mode === 'row' ? actived.row !== row : (actived.row !== row || actived.column !== column)) {
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
          UtilTools.emitEvent(this, type, [Object.assign({ $event: evnt }, params), evnt])
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
        this.isActivated = true
      }
      return this.$nextTick()
    },
    /**
     * 清除激活的编辑
     */
    clearActived (evnt) {
      const { editStore } = this
      const { actived } = editStore
      const { args, row, column } = actived
      if (row || column) {
        this.updateFooter()
        UtilTools.emitEvent(this, 'edit-closed', [Object.assign({ $event: evnt }, args), evnt])
      }
      actived.args = null
      actived.row = null
      actived.column = null
      return this.clearValidate()
    },
    // 在 v3.0 中废弃 getActiveRow
    getActiveRow () {
      UtilTools.warn('vxe.error.delFunc', ['getActiveRow', 'getActiveRecord'])
      return this.getActiveRecord()
    },
    getActiveRecord () {
      const { $el, editStore, afterFullData } = this
      const { args, row } = editStore.actived
      if (args && afterFullData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
        return Object.assign({}, args)
      }
      return null
    },
    // v3 废弃
    hasActiveRow (row) {
      // UtilTools.warn('vxe.error.delFunc', ['hasActiveRow', 'isActiveByRow'])
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
    clearSelected () {
      const { editStore } = this
      const { selected } = editStore
      selected.row = null
      selected.column = null
      return this.$nextTick()
    },
    /**
     * 处理选中源
     */
    handleSelected (params, evnt) {
      const { mouseConfig, mouseOpts, editOpts, editStore } = this
      const { actived, selected } = editStore
      const { row, column } = params
      const isMouseSelected = mouseConfig && mouseOpts.selected
      // 在 v3.0 中废弃 mouse-config.checked
      const isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked)
      const selectMethod = () => {
        if ((isMouseSelected || isMouseChecked) && (selected.row !== row || selected.column !== column)) {
          if (actived.row !== row || (editOpts.mode === 'cell' ? actived.column !== column : false)) {
            this.clearChecked(evnt)
            this.clearActived(evnt)
            selected.args = params
            selected.row = row
            selected.column = column
            // 如果配置了批量选中功能，则为批量选中状态
            if (isMouseChecked) {
              const select = DomTools.getCellIndexs(params.cell)
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
    clearChecked () {
      const { editStore } = this
      const { checked } = editStore
      checked.rows = []
      checked.columns = []
      checked.tRows = []
      checked.tColumns = []
      return this.$nextTick()
    },
    getMouseSelecteds () {
      // UtilTools.warn('vxe.error.delFunc', ['getMouseSelecteds', 'getSelectedCell'])
      return this.getSelectedCell()
    },
    getMouseCheckeds () {
      // UtilTools.warn('vxe.error.delFunc', ['getMouseCheckeds', 'getSelectedRanges'])
      return this.getSelectedRanges()
    },
    /**
     * 获取选中的单元格
     */
    getSelectedCell () {
      const { args, column } = this.editStore.selected
      if (args && column) {
        return Object.assign({}, args)
      }
      return null
    },
    /**
     * 获取所有选中的单元格
     */
    getSelectedRanges () {
      const { checked } = this.editStore
      const { rows, columns } = checked
      return {
        columns,
        rows
      }
    },
    /**
     * 处理所有选中
     */
    handleChecked (start, end) {
      const { tableData, visibleColumn, editStore } = this
      const { checked } = editStore
      const { rowIndex: sRowIndex, columnIndex: sColumnIndex } = start
      const { rowIndex: eRowIndex, columnIndex: eColumnIndex } = end
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
    handleTempChecked (start, end) {
      const { tableData, visibleColumn, editStore } = this
      const { checked } = editStore
      const { rows, tRows, columns, tColumns } = checked
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
      const { editStore } = this
      const { copyed } = editStore
      copyed.cut = false
      copyed.rows = []
      copyed.columns = []
      return this.$nextTick()
    },
    /**
     * 处理复制
     */
    handleCopyed (cut) {
      const { editStore } = this
      const { copyed, checked } = editStore
      copyed.cut = cut
      copyed.rows = checked.rows
      copyed.columns = checked.columns
    },
    /**
     * 处理粘贴
     */
    handlePaste (evnt) {
      const { tableData, visibleColumn, editStore } = this
      const { copyed, selected } = editStore
      const { cut, rows, columns } = copyed
      if (rows.length && columns.length && selected.row && selected.column) {
        const { rowIndex, columnIndex } = selected.args
        const start = { rowIndex, columnIndex }
        const end = {
          rowIndex: rowIndex + rows.length - 1,
          columnIndex: columnIndex + columns.length - 1
        }
        rows.forEach((row, rIndex) => {
          const offsetRow = tableData[rowIndex + rIndex]
          if (offsetRow) {
            columns.forEach((column, cIndex) => {
              const offsetColumn = visibleColumn[columnIndex + cIndex]
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
    handleFocus (params) {
      const { row, column, cell } = params
      const { editRender } = column
      if (editRender) {
        const compRender = VXETable.renderer.get(editRender.name)
        const { autofocus, autoselect } = editRender
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
          inputElem.focus()
          if (autoselect) {
            inputElem.select()
          } else {
            // 保持一致行为，光标移到末端
            if (browse.msie) {
              const textRange = inputElem.createTextRange()
              textRange.collapse(false)
              textRange.select()
            }
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
          const column = XEUtils.find(this.visibleColumn, column => column.property === field)
          if (column && column.editRender) {
            const cell = DomTools.getCell(this, { row, column })
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
      const { tableData, editOpts, visibleColumn } = this
      if (row && field && editOpts.trigger !== 'manual') {
        const column = XEUtils.find(visibleColumn, column => column.property === field)
        const rowIndex = tableData.indexOf(row)
        if (rowIndex > -1 && column) {
          const cell = DomTools.getCell(this, { row, rowIndex, column })
          const params = { row, rowIndex, column, columnIndex: visibleColumn.indexOf(column), cell }
          this.handleSelected(params, {})
        }
      }
      return this.$nextTick()
    },
    handleDefaultSort () {
      const defaultSort = this.sortOpts.defaultSort
      if (defaultSort) {
        const { field, order } = defaultSort
        if (field && order) {
          const column = XEUtils.find(this.visibleColumn, item => item.property === field)
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
      const property = column.property
      if (column.sortable || column.remoteSort) {
        const evntParams = { column, property, field: property, prop: property, order, $table: this, $event: evnt }
        if (!order || column.order === order) {
          evntParams.order = null
          this.clearSort()
        } else {
          this.sort(property, order)
        }
        UtilTools.emitEvent(this, 'sort-change', [evntParams, evnt])
      }
    },
    sort (field, order) {
      const { tableFullColumn, sortOpts } = this
      const column = this.getColumnByField(field)
      if (column) {
        const isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : sortOpts.remote
        if (column.sortable || column.remoteSort) {
          if (arguments.length <= 1) {
            order = getNextSortOrder(this, column)
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
      return XEUtils.find(this.visibleColumn, column => column.sortable && column.order)
    },
    // v3 废弃 filter 方法，被 setFilter 取代
    filter (field, callback) {
      UtilTools.warn('vxe.error.delFunc', ['filter', 'setFilter'])
      const column = this.getColumnByField(field)
      if (column) {
        const options = column.filters
        if (options && callback) {
          const rest = callback(options)
          if (XEUtils.isArray(rest)) {
            column.filters = UtilTools.getFilters(rest)
          }
          return this.$nextTick().then(() => options)
        }
      }
      return this.$nextTick()
    },
    /**
     * 修改筛选条件列表
     * @param {ColumnConfig} column 列
     * @param {Array} options 选项
     */
    setFilter (column, options) {
      if (column.filters && options) {
        column.filters = UtilTools.getFilters(options)
      }
      return this.$nextTick()
    },
    /**
     * 点击筛选事件
     */
    triggerFilterEvent (evnt, column, params) {
      const { $refs, filterStore } = this
      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false
      } else {
        const bodyElem = $refs.tableBody.$el
        const { target: targetElem, pageX } = evnt
        const { visibleWidth } = DomTools.getDomNode()
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
        this.hasFilterPanel = true
        this.$nextTick(() => {
          const filterWrapperElem = $refs.filterWrapper.$el
          const filterWidth = filterWrapperElem.offsetWidth
          const centerWidth = filterWidth / 2
          const minMargin = 32
          let left, right
          const style = {
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
            const overflowWidth = (pageX + filterWidth - centerWidth + minMargin) - visibleWidth
            if (overflowWidth > 0) {
              left -= overflowWidth
            }
            style.left = `${Math.max(minMargin, left)}px`
          } else if (right) {
            const overflowWidth = (pageX + filterWidth - centerWidth + minMargin) - visibleWidth
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
    confirmFilterEvent () {
      const { visibleColumn, filterStore, remoteFilter, filterOpts, scrollXLoad, scrollYLoad } = this
      const { column } = filterStore
      const { property } = column
      const values = []
      const datas = []
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
        this.checkSelectionStatus()
      }
      const filterList = []
      visibleColumn.filter(column => {
        const { property, filters } = column
        const valueList = []
        const dataList = []
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
    closeFilter () {
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
    handleClearFilter (column) {
      if (column) {
        const { filters, filterRender } = column
        if (filters) {
          filters.forEach(item => {
            item.checked = false
            item.data = XEUtils.clone(item.resetValue, true)
          })
          const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
          if (compConf && compConf.filterResetMethod) {
            compConf.filterResetMethod({ options: filters, column, $table: this })
          }
        }
      }
    },
    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    resetFilterEvent (evnt) {
      this.handleClearFilter(this.filterStore.column)
      this.confirmFilterEvent(evnt)
    },
    /**
     * 清空指定列的筛选条件
     * 如果为空则清空所有列的筛选条件
     * @param {String} column 列
     */
    clearFilter (column) {
      if (arguments.length && XEUtils.isString(column)) {
        column = this.getColumnByField(column)
      }
      const filterStore = this.filterStore
      if (column) {
        this.handleClearFilter(column)
      } else {
        this.visibleColumn.forEach(this.handleClearFilter)
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
      const { $listeners, expandOpts, expandLazyLoadeds, expandColumn: column } = this
      const { row } = params
      const { lazy } = expandOpts
      if (!lazy || expandLazyLoadeds.indexOf(row) === -1) {
        const expanded = !this.isExpandByRow(row)
        const columnIndex = this.getColumnIndex(column)
        const $columnIndex = this.$getColumnIndex(column)
        this.setRowExpansion(row, expanded)
        // 在 v3.0 中废弃 toggle-expand-change
        if ($listeners['toggle-expand-change']) {
          UtilTools.warn('vxe.error.delEvent', ['toggle-expand-change', 'toggle-row-expand'])
          UtilTools.emitEvent(this, 'toggle-expand-change', [{ expanded, column, columnIndex, $columnIndex, row, rowIndex: this.getRowIndex(row), $rowIndex: this.$getRowIndex(row), $table: this, $event: evnt }, evnt])
        } else {
          UtilTools.emitEvent(this, 'toggle-row-expand', [{ expanded, column, columnIndex, $columnIndex, row, rowIndex: this.getRowIndex(row), $rowIndex: this.$getRowIndex(row), $table: this, $event: evnt }, evnt])
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
      const { expandOpts, fullDataRowIdData } = this
      const { expandAll, expandRowKeys } = expandOpts
      if (expandAll) {
        this.setAllRowExpansion(true)
      } else if (expandRowKeys) {
        const defExpandeds = []
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
      return this.setRowExpansion(this.expandOpts.lazy ? this.tableData : this.tableFullData, expanded)
    },
    handleAsyncRowExpand (row) {
      const rest = this.fullAllDataRowMap.get(row)
      return new Promise(resolve => {
        this.expandLazyLoadeds.push(row)
        this.expandOpts.loadMethod({ $table: this, row, rowIndex: this.getRowIndex(row), $rowIndex: this.$getRowIndex(row) }).catch(e => e).then(() => {
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
    setRowExpansion (rows, expanded) {
      const { fullAllDataRowMap, expandLazyLoadeds, expandOpts, expandColumn: column } = this
      let { rowExpandeds } = this
      const { lazy, accordion, toggleMethod } = expandOpts
      const lazyRests = []
      const columnIndex = this.getColumnIndex(column)
      const $columnIndex = this.$getColumnIndex(column)
      if (rows) {
        if (!XEUtils.isArray(rows)) {
          rows = [rows]
        }
        if (accordion) {
          // 只能同时展开一个
          rowExpandeds = []
          rows = rows.slice(rows.length - 1, rows.length)
        }
        const removeRows = toggleMethod ? rows.filter(row => toggleMethod({ expanded, column, columnIndex, $columnIndex, row, rowIndex: this.getRowIndex(row), $rowIndex: this.$getRowIndex(row) })) : rows
        if (expanded) {
          removeRows.forEach(row => {
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
          XEUtils.remove(rowExpandeds, row => removeRows.indexOf(row) > -1)
        }
      }
      this.rowExpandeds = rowExpandeds
      return Promise.all(lazyRests).then(this.recalculate)
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
      const { $listeners, treeOpts, treeLazyLoadeds } = this
      const { row } = params
      const { lazy } = treeOpts
      if (!lazy || treeLazyLoadeds.indexOf(row) === -1) {
        const expanded = !this.isTreeExpandByRow(row)
        this.setTreeExpansion(row, expanded)
        // 在 v3.0 中废弃 toggle-tree-change
        if ($listeners['toggle-tree-change']) {
          UtilTools.warn('vxe.error.delEvent', ['toggle-tree-change', 'toggle-tree-expand'])
          UtilTools.emitEvent(this, 'toggle-tree-change', [{ expanded, row, rowIndex: this.getRowIndex(row), $table: this, $event: evnt }, evnt])
        } else {
          UtilTools.emitEvent(this, 'toggle-tree-expand', [{ expanded, row, rowIndex: this.getRowIndex(row), $table: this, $event: evnt }, evnt])
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
      const { treeConfig, treeOpts, tableFullData } = this
      if (treeConfig) {
        const { expandAll, expandRowKeys } = treeOpts
        if (expandAll) {
          this.setAllTreeExpansion(true)
        } else if (expandRowKeys) {
          const defExpandeds = []
          const rowkey = UtilTools.getRowkey(this)
          expandRowKeys.forEach(rowid => {
            const matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), treeOpts)
            if (matchObj) {
              defExpandeds.push(matchObj.item)
            }
          })
          this.setTreeExpansion(defExpandeds, true)
        }
      }
    },
    handleAsyncTreeExpandChilds (row) {
      const { fullAllDataRowMap, treeExpandeds, treeOpts, treeLazyLoadeds } = this
      const { loadMethod, children } = treeOpts
      const rest = fullAllDataRowMap.get(row)
      return new Promise(resolve => {
        treeLazyLoadeds.push(row)
        loadMethod({ $table: this, row }).catch(() => []).then(childs => {
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
      const { tableFullData, treeOpts } = this
      const { lazy, children } = treeOpts
      const expandeds = []
      XEUtils.eachTree(tableFullData, row => {
        const rowChildren = row[children]
        if (lazy || (rowChildren && rowChildren.length)) {
          expandeds.push(row)
        }
      }, treeOpts)
      return this.setTreeExpansion(expandeds, expanded)
    },
    /**
     * 设置展开树形节点，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     * @param {Array/Row} rows 行数据
     * @param {Boolean} expanded 是否展开
     */
    setTreeExpansion (rows, expanded) {
      const { fullAllDataRowMap, tableFullData, treeExpandeds, treeOpts, treeLazyLoadeds, expandColumn: column } = this
      const { lazy, hasChild, children, accordion, toggleMethod } = treeOpts
      const result = []
      const columnIndex = this.getColumnIndex(column)
      const $columnIndex = this.$getColumnIndex(column)
      if (rows) {
        if (!XEUtils.isArray(rows)) {
          rows = [rows]
        }
        if (rows.length) {
          if (accordion) {
            rows = rows.slice(rows.length - 1, rows.length)
            // 同一级只能展开一个
            const matchObj = XEUtils.findTree(tableFullData, item => item === rows[0], treeOpts)
            XEUtils.remove(treeExpandeds, item => matchObj.items.indexOf(item) > -1)
          }
          const removeRows = toggleMethod ? rows.filter(row => toggleMethod({ expanded, column, columnIndex, $columnIndex, row })) : rows
          if (expanded) {
            removeRows.forEach(row => {
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
            XEUtils.remove(treeExpandeds, row => removeRows.indexOf(row) > -1)
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
      UtilTools.warn('vxe.error.delFunc', ['isScrollXLoad', 'getScroll'])
      return this.scrollXLoad
    },
    /**
     * 是否启用了纵向 Y 可视渲染
     */
    isScrollYLoad () {
      UtilTools.warn('vxe.error.delFunc', ['isScrollYLoad', 'getScroll'])
      return this.scrollYLoad
    },
    getVirtualScroller () {
      UtilTools.warn('vxe.error.delFunc', ['getVirtualScroller', 'getScroll'])
      return this.getScroll()
    },
    getTableScroll () {
      UtilTools.warn('vxe.error.delFunc', ['getTableScroll', 'getScroll'])
      return this.getScroll()
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
    loadScrollXData (force) {
      const { $refs, visibleColumn, scrollXStore } = this
      const { startIndex, renderSize, offsetSize, visibleSize } = scrollXStore
      const scrollBodyElem = $refs.tableBody.$el
      const scrollLeft = scrollBodyElem.scrollLeft
      let toVisibleIndex = 0
      let width = 0
      let preload = force || false
      const colLen = visibleColumn.length
      for (let colIndex = 0; colIndex < colLen; colIndex++) {
        width += visibleColumn[colIndex].renderWidth
        if (scrollLeft < width) {
          toVisibleIndex = colIndex
          break
        }
      }
      if (force || scrollXStore.visibleIndex !== toVisibleIndex) {
        const marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize)
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
      const { afterFullData, scrollYStore, isLoadData } = this
      const { startIndex, renderSize, offsetSize, visibleSize, rowHeight } = scrollYStore
      const scrollBodyElem = evnt.target
      const scrollTop = scrollBodyElem.scrollTop
      const toVisibleIndex = Math.ceil(scrollTop / rowHeight)
      let preload = false
      if (isLoadData || scrollYStore.visibleIndex !== toVisibleIndex) {
        const marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize)
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
      const tableBody = this.$refs.tableBody
      const tableBodyElem = tableBody ? tableBody.$el : null
      const tableHeader = this.$refs.tableHeader
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
        const { vSize, scrollXLoad, scrollYLoad, sYOpts, scrollYStore, sXOpts, scrollXStore, visibleColumn, rowHeightMaps } = this
        const tableBody = this.$refs.tableBody
        const tableBodyElem = tableBody ? tableBody.$el : null
        const tableHeader = this.$refs.tableHeader
        if (tableBodyElem) {
          // 计算 X 逻辑
          if (scrollXLoad) {
            const firstColumn = visibleColumn[0]
            const cWidth = firstColumn ? firstColumn.renderWidth : 40
            const visibleXSize = XEUtils.toNumber(sXOpts.vSize || Math.ceil(tableBodyElem.clientWidth / cWidth))
            scrollXStore.visibleSize = visibleXSize
            // 自动优化
            if (!sXOpts.oSize) {
              scrollXStore.offsetSize = visibleXSize
            }
            if (!sXOpts.rSize) {
              scrollXStore.renderSize = Math.max(8, visibleXSize + 6)
            }
            this.updateScrollXData()
          } else {
            this.updateScrollXSpace()
          }
          // 计算 Y 逻辑
          if (scrollYLoad) {
            let rHeight
            if (sYOpts.rHeight) {
              rHeight = sYOpts.rHeight
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
            const visibleYSize = XEUtils.toNumber(sYOpts.vSize || Math.ceil(tableBodyElem.clientHeight / rHeight))
            scrollYStore.visibleSize = visibleYSize
            scrollYStore.rowHeight = rHeight
            // 自动优化
            if (!sYOpts.oSize) {
              scrollYStore.offsetSize = visibleYSize
            }
            if (!sYOpts.rSize) {
              scrollYStore.renderSize = Math.max(6, visibleYSize * (browse.edge ? 10 : 8))
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
      const { visibleColumn, scrollXStore } = this
      this.tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize)
      this.updateScrollXSpace()
    },
    // 更新横向 X 可视渲染上下剩余空间大小
    updateScrollXSpace () {
      const { visibleColumn, scrollXStore } = this
      scrollXStore.leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous, column) => previous + column.renderWidth, 0)
      scrollXStore.rightSpaceWidth = visibleColumn.slice(scrollXStore.startIndex + scrollXStore.renderSize, visibleColumn.length).reduce((previous, column) => previous + column.renderWidth, 0)
    },
    updateScrollYData () {
      this.handleTableData()
      this.updateScrollYSpace()
    },
    // 更新纵向 Y 可视渲染上下剩余空间大小
    updateScrollYSpace () {
      const { scrollYStore, afterFullData } = this
      const bodyHeight = afterFullData.length * scrollYStore.rowHeight
      scrollYStore.ySpaceHeight = bodyHeight
      scrollYStore.topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0)
      scrollYStore.bottomSpaceHeight = Math.max((afterFullData.length - (scrollYStore.startIndex + scrollYStore.renderSize)) * scrollYStore.rowHeight, 0)
    },
    scrollTo (scrollLeft, scrollTop) {
      const bodyElem = this.$refs.tableBody.$el
      if (XEUtils.isNumber(scrollLeft)) {
        const tableFooter = this.$refs.tableFooter
        if (tableFooter) {
          tableFooter.$el.scrollLeft = scrollLeft
        } else {
          bodyElem.scrollLeft = scrollLeft
        }
      }
      if (XEUtils.isNumber(scrollTop)) {
        const rightBody = this.$refs.rightBody
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
      const rest = []
      if (row) {
        if (this.treeConfig) {
          rest.push(this.scrollToTreeRow(row))
        } else {
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
      const { tableFullData, treeConfig, treeOpts } = this
      if (treeConfig) {
        const matchObj = XEUtils.findTree(tableFullData, item => item === row, treeOpts)
        if (matchObj) {
          const nodes = matchObj.nodes
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
        const $refs = this.$refs
        const tableBody = $refs.tableBody
        const tableBodyElem = tableBody ? tableBody.$el : null
        const tableFooter = $refs.tableFooter
        const tableFooterElem = tableFooter ? tableFooter.$el : null
        const footerTargetElem = tableFooterElem || tableBodyElem
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
      const { showFooter, visibleColumn, footerMethod } = this
      if (showFooter && footerMethod) {
        this.footerData = visibleColumn.length ? footerMethod({ columns: visibleColumn, data: this.afterFullData }) : []
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
        const { $refs, tableData, editRules, validStore } = this
        if (scope && $refs.tableBody && editRules) {
          const { row, column } = scope
          const type = 'change'
          if (this.hasCellRules(type, row, column)) {
            const rowIndex = tableData.indexOf(row)
            const cell = DomTools.getCell(this, { row, rowIndex, column })
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
      const { editOpts, editStore, editRules, validStore } = this
      const { actived } = editStore
      // const type = validStore.visible ? 'all' : 'blur'
      // this.clearValidate()
      if (actived.row && editRules) {
        const { row, column, cell } = actived.args
        // if (editOpts.mode === 'row') {
        //   return this.validRowRules(type, row)
        //     .catch(params => {
        //       this.handleValidError(params)
        //       return Promise.reject(params)
        //     })
        // } else {
        if (this.hasCellRules(type, row, column)) {
          return this.validCellRules(type, row, column).then(() => {
            if (editOpts.mode === 'row') {
              if (validStore.visible && validStore.row === row && validStore.column === column) {
                this.clearValidate()
              }
            }
          }).catch(({ rule }) => {
            // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
            if (!rule.trigger || type === rule.trigger) {
              const rest = { rule, row, column, cell }
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
      const validRest = {}
      let status = true
      const { editRules, afterFullData, treeConfig, treeOpts } = this
      let vaildDatas = afterFullData
      if (rows) {
        if (XEUtils.isFunction(rows)) {
          cb = rows
        } else {
          vaildDatas = XEUtils.isArray(rows) ? rows : [rows]
        }
      }
      const rowValids = []
      this.lastCallTime = Date.now()
      this.clearValidate()
      if (editRules) {
        const columns = this.getColumns()
        const handleVaild = row => {
          const colVailds = []
          columns.forEach((column) => {
            if (XEUtils.has(editRules, column.property)) {
              colVailds.push(
                new Promise((resolve, reject) => {
                  this.validCellRules('all', row, column)
                    .then(resolve)
                    .catch(({ rule, rules }) => {
                      const rest = { rule, rules, rowIndex: this.getRowIndex(row), row, columnIndex: this.getColumnIndex(column), column, $table: this }
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
          const ruleProps = Object.keys(validRest)
          if (ruleProps.length) {
            return Promise.reject(validRest[ruleProps[0]][0])
          }
          if (cb) {
            // 在 v3.0 中废弃 setup.validArgs
            if (GlobalConfig.validArgs === 'obsolete') {
              cb(status)
            } else {
              cb()
            }
          }
        }).catch(params => {
          const args = isAll ? validRest : { [params.column.property]: params }
          return new Promise((resolve, reject) => {
            const finish = () => {
              status = false
              if (cb) {
                // 在 v3.0 中废弃 setup.validArgs
                if (GlobalConfig.validArgs === 'obsolete') {
                  cb(status, args)
                } else {
                  cb(args)
                }
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
        // 在 v3.0 中废弃 setup.validArgs
        if (GlobalConfig.validArgs === 'obsolete') {
          cb(status)
        } else {
          cb()
        }
      }
      return Promise.resolve()
    },
    // validRowRules (type, row) {
    //   const { tableData, editRules } = this
    //   const rowIndex = tableData.indexOf(row)
    //   const validPromise = Promise.resolve()
    //   if (editRules) {
    //     this.getColumns().forEach(column => {
    //       if (XEUtils.has(editRules, column.property)) {
    //         validPromise = validPromise.then(() => new Promise((resolve, reject) => {
    //           this.validCellRules('all', row, column)
    //             .then(resolve)
    //             .catch(rule => {
    //               const rest = { rule, row, column, cell: DomTools.getCell(this, { row, rowIndex, column }) }
    //               return reject(rest)
    //             })
    //         }))
    //       }
    //     })
    //   }
    //   return validPromise
    // },
    hasCellRules (type, row, column) {
      const { editRules } = this
      const { property } = column
      if (property && editRules) {
        const rules = XEUtils.get(editRules, property)
        return rules && XEUtils.find(rules, rule => type === 'all' || !rule.trigger || type === rule.trigger)
      }
      return false
    },
    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者Promise<不通过列的错误消息>
     * 如果是传回调方式这返回一个校验不通过列的错误消息
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function({ cellValue, rule, rules, row, column, rowIndex, columnIndex }) 自定义校验，接收一个 Promise
     *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
     */
    validCellRules (type, row, column, val) {
      const { editRules } = this
      const { property } = column
      const errorRules = []
      const cellVailds = []
      if (property && editRules) {
        const rules = XEUtils.get(editRules, property)
        if (rules) {
          const cellValue = XEUtils.isUndefined(val) ? XEUtils.get(row, property) : val
          rules.forEach(rule => {
            cellVailds.push(
              new Promise(resolve => {
                if (type === 'all' || !rule.trigger || type === rule.trigger) {
                  if (XEUtils.isFunction(rule.validator)) {
                    // 在 v3.0 中废弃 setup.validArgs
                    if (GlobalConfig.validArgs === 'obsolete') {
                      rule.validator(rule, cellValue, e => {
                        if (XEUtils.isError(e)) {
                          const cusRule = { type: 'custom', trigger: rule.trigger, message: e.message, rule: new Rule(rule) }
                          errorRules.push(new Rule(cusRule))
                        }
                        return resolve()
                      }, { rule, rules, row, column, rowIndex: this.getRowIndex(row), columnIndex: this.getColumnIndex(column), $table: this })
                    } else {
                      Promise.resolve(rule.validator({
                        cellValue,
                        rule,
                        rules,
                        row,
                        rowIndex: this.getRowIndex(row),
                        column,
                        columnIndex: this.getColumnIndex(column),
                        $table: this
                      })).catch(e => {
                        errorRules.push(new Rule({ type: 'custom', trigger: rule.trigger, message: e ? e.message : rule.message, rule: new Rule(rule) }))
                      }).then(resolve)
                    }
                  } else {
                    const isNumber = rule.type === 'number'
                    const numVal = isNumber ? XEUtils.toNumber(cellValue) : XEUtils.getSize(cellValue)
                    if (cellValue === null || cellValue === undefined || cellValue === '') {
                      if (rule.required) {
                        errorRules.push(new Rule(rule))
                      }
                    } else if (
                      (isNumber && isNaN(cellValue)) ||
                      (!isNaN(rule.min) && numVal < parseFloat(rule.min)) ||
                      (!isNaN(rule.max) && numVal > parseFloat(rule.max)) ||
                      (rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(cellValue))
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
          const rest = { rules: errorRules, rule: errorRules[0] }
          return Promise.reject(rest)
        }
      })
    },
    clearValidate () {
      const validTip = this.$refs.validTip
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
      const { $refs, height, tableData, validOpts } = this
      const { rule, row, column, cell } = params
      const validTip = $refs.validTip
      const content = rule.message
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
    /**
     * 导出 csv/html/xml/txt 文件
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了可视渲染，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     */
    exportData (options) {
      const { visibleColumn, tableFullData, treeConfig, treeOpts, exportOpts } = this
      const opts = Object.assign({
        // filename: '',
        // sheetName: '',
        // original: false,
        // message: false,
        isHeader: true,
        isFooter: true,
        download: true,
        type: 'csv',
        mode: 'current',
        // data: null,
        // remote: false,
        columns: visibleColumn,
        // dataFilterMethod: null,
        // footerFilterMethod: null,
        // exportMethod: null,
        // 在 v3.0 中废弃 type=selection
        columnFilterMethod: options && options.columns ? null : column => ['seq', 'index'].indexOf(column.type) > -1 || column.property
      }, exportOpts, options)
      if (!opts.filename) {
        opts.filename = XEUtils.template(GlobalConfig.i18n(opts.original ? 'vxe.table.expOriginFilename' : 'vxe.table.expFilename'), [XEUtils.toDateString(Date.now(), 'yyyyMMddHHmmss')])
      }
      if (!opts.sheetName) {
        opts.sheetName = GlobalConfig.i18n('vxe.table.expSheetName')
      }
      if (VXETable.exportTypes.indexOf(opts.type) === -1) {
        throw new Error(UtilTools.getLog('vxe.error.notType', [opts.type]))
      }
      if (!opts.data) {
        opts.data = tableFullData
        if (opts.mode === 'selected') {
          const selectRecords = this.getCheckboxRecords()
          if (['html', 'pdf'].indexOf(opts.type) > -1 && treeConfig) {
            opts.data = XEUtils.searchTree(this.getTableData().fullData, item => selectRecords.indexOf(item) > -1, treeOpts)
          } else {
            opts.data = selectRecords
          }
        }
      }
      if (opts.remote) {
        const params = { options: opts, $table: this, $grid: this.$xegrid }
        if (opts.exportMethod) {
          return opts.exportMethod(params)
        }
        return Promise.resolve(params)
      }
      return ExportTools.handleExport(this, opts)
    },
    importByFile (file, opts) {
      if (window.FileReader) {
        const { type, filename } = UtilTools.parseFile(file)
        const options = Object.assign({ mode: 'insert' }, opts, { type, filename })
        const types = options.types || VXETable.importTypes
        if (types.indexOf(type) > -1) {
          if (options.remote) {
            const params = { file, options, $table: this }
            if (options.importMethod) {
              return options.importMethod(params)
            }
            return Promise.resolve(params)
          }
          this.preventEvent(null, 'event.import', { file, options, columns: this.tableFullColumn }, () => {
            const reader = new FileReader()
            reader.onerror = () => {
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
      return Promise.resolve()
    },
    importData (options) {
      const opts = Object.assign({}, GlobalConfig.importOpts, options)
      const rest = new Promise((resolve, reject) => {
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
      if (!fileForm) {
        fileForm = document.createElement('form')
        fileInput = document.createElement('input')
        fileForm.className = 'vxe-table--file-form'
        fileInput.name = 'file'
        fileInput.type = 'file'
        fileForm.appendChild(fileInput)
        document.body.appendChild(fileForm)
      }
      const types = options.types || VXETable.importTypes
      if (options.multiple) {
        fileInput.multiple = 'multiple'
      }
      fileInput.accept = `.${types.join(', .')}`
      fileInput.onchange = evnt => {
        const { type } = UtilTools.parseFile(evnt.target.files[0])
        if (types.indexOf(type) > -1) {
          this._fileResolve(evnt)
        } else {
          if (options.message !== false) {
            VXETable.modal.message({ message: XEUtils.template(GlobalConfig.i18n('vxe.error.notType'), [type]), status: 'error' })
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
      const opts = Object.assign({
        original: false
      }, options, {
        type: 'html',
        download: false,
        remote: false,
        print: true
      })
      if (!opts.sheetName) {
        opts.sheetName = opts.filename
      }
      this.exportData(opts).then(({ content, blob }) => {
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
    openImport (options) {
      const defOpts = Object.assign({ mode: 'insert', message: true }, options, this.importOpts)
      const types = defOpts.types || VXETable.exportTypes
      const isTree = !!this.getTreeStatus()
      if (isTree) {
        if (defOpts.message) {
          VXETable.modal.message({ message: GlobalConfig.i18n('vxe.error.treeNotImp'), status: 'error' })
        }
        return
      }
      if (!this.importConfig) {
        UtilTools.error('vxe.error.reqProp', ['import-config'])
      }
      // 处理类型
      const typeList = types.map(value => {
        return {
          value,
          label: `vxe.export.types.${value}`
        }
      })
      const modeList = defOpts.modes.map(value => {
        return {
          value,
          label: `vxe.import.modes.${value}`
        }
      })
      Object.assign(this.importStore, {
        file: null,
        type: '',
        filename: '',
        modeList,
        typeList,
        visible: true
      })
      Object.assign(this.importParams, defOpts)
    },
    openExport (options) {
      const { $toolbar, exportConfig, customOpts, exportOpts, treeConfig, collectColumn, footerData } = this
      const selectRecords = this.getCheckboxRecords()
      const isTree = !!treeConfig
      const hasFooter = !!footerData.length
      const defOpts = Object.assign({ message: true, isHeader: true }, exportOpts, options)
      const types = defOpts.types || VXETable.exportTypes
      const checkMethod = customOpts.checkMethod || ($toolbar ? $toolbar.customOpts.checkMethod : null)
      const exportColumns = collectColumn.slice(0)
      if (!exportConfig) {
        UtilTools.error('vxe.error.reqProp', ['export-config'])
      }
      // 处理类型
      const typeList = types.map(value => {
        return {
          value,
          label: `vxe.export.types.${value}`
        }
      })
      const modeList = defOpts.modes.map(value => {
        return {
          value,
          label: `vxe.export.modes.${value}`
        }
      })
      // 默认全部选中
      XEUtils.eachTree(exportColumns, (column, index, items, path, parent) => {
        const isColGroup = column.children && column.children.length
        if (isColGroup || column.property || ['seq', 'index'].indexOf(column.type) > -1) {
          column.checked = column.visible
          column.halfChecked = false
          column.disabled = (parent && parent.disabled) || (checkMethod ? !checkMethod({ column }) : false)
        }
      })
      // 更新条件
      Object.assign(this.exportStore, {
        columns: exportColumns,
        typeList,
        modeList,
        hasFooter: hasFooter,
        visible: true,
        isTree
      })
      // 重置参数
      Object.assign(this.exportParams, {
        filename: defOpts.filename || '',
        sheetName: defOpts.sheetName || '',
        type: defOpts.type || typeList[0].value,
        mode: selectRecords.length ? 'selected' : 'current',
        original: defOpts.original,
        message: defOpts.message,
        isHeader: defOpts.isHeader,
        isFooter: hasFooter,
        isPrint: defOpts.isPrint
      })
      return this.$nextTick()
    },
    updateZindex () {
      if (this.zIndex) {
        this.tZindex = this.zIndex
      } else if (this.tZindex < UtilTools.getLastZIndex()) {
        this.tZindex = UtilTools.nextZIndex()
      }
    },

    // 检查触发源是否属于目标节点
    getEventTargetNode: DomTools.getEventTargetNode,

    /*************************
     * Publish methods
     *************************/
    // 与工具栏对接
    connect ($toolbar) {
      if ($toolbar && $toolbar.syncUpdate) {
        $toolbar.syncUpdate({ collectColumn: this.collectColumn, $table: this })
        this.$toolbar = $toolbar
      } else {
        UtilTools.error('vxe.error.barUnableLink')
      }
    }
    /*************************
     * Publish methods
     *************************/
  }
}
