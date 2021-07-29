import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VXETable from '../../v-x-e-table'
import VxeTableBody from './body'
import vSize from '../../mixins/size'
import { UtilTools, GlobalEvent, createResizeEvent, isEnableConf } from '../../tools'
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
  const { _e, tableData, tableColumn, tableGroupColumn, vSize, showHeader, showFooter, columnStore, footerTableData } = $xetable
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
        tableGroupColumn,
        size: vSize,
        fixedColumn
      },
      ref: `${fixedType}Header`
    }) : _e(),
    h('vxe-table-body', {
      props: {
        fixedType,
        tableData,
        tableColumn,
        fixedColumn,
        size: vSize
      },
      ref: `${fixedType}Body`
    }),
    showFooter ? h('vxe-table-footer', {
      props: {
        footerTableData,
        tableColumn,
        fixedColumn,
        fixedType,
        size: vSize
      },
      ref: `${fixedType}Footer`
    }) : _e()
  ])
}

function renderEmptyContenet (h, _vm) {
  const { $scopedSlots, emptyOpts } = _vm
  let emptyContent = ''
  const params = { $table: _vm }
  if ($scopedSlots.empty) {
    emptyContent = $scopedSlots.empty.call(_vm, params, h)
  } else {
    const compConf = emptyOpts.name ? VXETable.renderer.get(emptyOpts.name) : null
    const renderEmpty = compConf ? compConf.renderEmpty : null
    if (renderEmpty) {
      emptyContent = renderEmpty.call(_vm, h, emptyOpts, params)
    } else {
      emptyContent = UtilTools.getFuncText(_vm.emptyText) || GlobalConfig.i18n('vxe.table.emptyText')
    }
  }
  return emptyContent
}

function handleUupdateResize (_vm) {
  const { $el } = _vm
  if ($el && $el.clientWidth && $el.clientHeight) {
    _vm.recalculate()
  }
}

export default {
  name: 'VxeTable',
  mixins: [vSize],
  props: {
    /** 基本属性 */
    id: String,
    // 数据
    data: Array,
    // 表格的高度
    height: [Number, String],
    // 表格的最大高度
    maxHeight: [Number, String],
    // 所有列是否允许拖动列宽调整大小
    resizable: { type: Boolean, default: () => GlobalConfig.table.resizable },
    // 是否带有斑马纹
    stripe: { type: Boolean, default: () => GlobalConfig.table.stripe },
    // 是否带有边框
    border: { type: [Boolean, String], default: () => GlobalConfig.table.border },
    // 是否圆角边框
    round: { type: Boolean, default: () => GlobalConfig.table.round },
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
    // 合并指定单元格
    mergeCells: Array,
    // 合并指定的表尾
    mergeFooterItems: Array,
    // 自定义合并行或列的方法
    spanMethod: Function,
    // 表尾合并行或列
    footerSpanMethod: Function,
    // 设置所有内容过长时显示为省略号
    showOverflow: { type: [Boolean, String], default: () => GlobalConfig.table.showOverflow },
    // 设置表头所有内容过长时显示为省略号
    showHeaderOverflow: { type: [Boolean, String], default: () => GlobalConfig.table.showHeaderOverflow },
    // 设置表尾所有内容过长时显示为省略号
    showFooterOverflow: { type: [Boolean, String], default: () => GlobalConfig.table.showFooterOverflow },

    /** 高级属性 */
    // 主键配置
    columnKey: Boolean,
    rowKey: Boolean,
    rowId: { type: String, default: () => GlobalConfig.table.rowId },
    zIndex: Number,
    emptyText: { type: String, default: () => GlobalConfig.table.emptyText },
    keepSource: { type: Boolean, default: () => GlobalConfig.table.keepSource },
    // 是否自动监听父容器变化去更新响应式表格宽高
    autoResize: { type: Boolean, default: () => GlobalConfig.table.autoResize },
    // 是否自动根据状态属性去更新响应式表格宽高
    syncResize: [Boolean, String, Number],
    // 设置列的默认参数，仅对部分支持的属性有效
    columnConfig: Object,
    resizableConfig: Object,
    // 序号配置项
    seqConfig: Object,
    // 排序配置项
    sortConfig: Object,
    // 筛选配置项
    filterConfig: Object,
    // 单选框配置
    radioConfig: Object,
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
    menuConfig: [Boolean, Object],
    // 在 v4 中废弃 contextMenu
    contextMenu: [Boolean, Object],
    // 鼠标配置项
    mouseConfig: Object,
    // 区域配置项
    areaConfig: Object,
    // 按键配置项
    keyboardConfig: Object,
    // 复制/粘贴配置项
    clipConfig: Object,
    // 查找/替换配置项
    fnrConfig: Object,
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
    animat: { type: Boolean, default: () => GlobalConfig.table.animat },
    delayHover: { type: Number, default: () => GlobalConfig.table.delayHover },
    // 额外的参数
    params: Object
  },
  components: {
    VxeTableBody
  },
  provide () {
    return {
      $xetable: this,
      xecolgroup: null
    }
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  data () {
    return {
      tId: `${XEUtils.uniqueId()}`,
      // 低性能的静态列
      staticColumns: [],
      // 渲染的列分组
      tableGroupColumn: [],
      // 可视区渲染的列
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
      // 表格父容器的高度
      parentHeight: 0,
      // 是否使用分组表头
      isGroup: false,
      isAllOverflow: false,
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
      footerTableData: [],
      // 展开列信息
      expandColumn: null,
      hasFixedColumn: false,
      // 树节点列信息
      treeNodeColumn: null,
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
      // 合并单元格的对象集
      mergeList: [],
      // 合并表尾数据的对象集
      mergeFooterList: [],
      // 初始化标识
      initStore: {
        filter: false,
        import: false,
        export: false
      },
      // 当前选中的筛选列
      filterStore: {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false,
        maxHeight: null
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
        inited: false,
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
        inited: false,
        name: '',
        modeList: [],
        typeList: [],
        columns: [],
        isPrint: false,
        hasFooter: false,
        hasTree: false,
        hasMerge: false,
        hasColgroup: false,
        visible: false
      },
      exportParams: {
        filename: '',
        sheetName: '',
        mode: '',
        type: '',
        isColgroup: false,
        isMerge: false,
        isAllExpand: false,
        useStyle: false,
        original: false,
        message: true,
        isHeader: false,
        isFooter: false
      }
    }
  },
  computed: {
    validOpts () {
      return Object.assign({ message: 'default' }, GlobalConfig.table.validConfig, this.validConfig)
    },
    sXOpts () {
      return Object.assign({}, GlobalConfig.table.scrollX, this.scrollX)
    },
    sYOpts () {
      return Object.assign({}, GlobalConfig.table.scrollY, this.scrollY)
    },
    rowHeightMaps () {
      return {
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      }
    },
    columnOpts () {
      return Object.assign({}, this.columnConfig)
    },
    resizableOpts () {
      return Object.assign({}, GlobalConfig.table.resizableConfig, this.resizableConfig)
    },
    seqOpts () {
      return Object.assign({ startIndex: 0 }, GlobalConfig.table.seqConfig, this.seqConfig)
    },
    radioOpts () {
      return Object.assign({}, GlobalConfig.table.radioConfig, this.radioConfig)
    },
    checkboxOpts () {
      return Object.assign({}, GlobalConfig.table.checkboxConfig, this.checkboxConfig)
    },
    tooltipOpts () {
      const opts = Object.assign({ leaveDelay: 300 }, GlobalConfig.table.tooltipConfig, this.tooltipConfig)
      if (opts.enterable) {
        opts.leaveMethod = this.handleTooltipLeaveMethod
      }
      return opts
    },
    validTipOpts () {
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
    areaOpts () {
      return Object.assign({}, GlobalConfig.table.areaConfig, this.areaConfig)
    },
    keyboardOpts () {
      return Object.assign({}, GlobalConfig.table.keyboardConfig, this.keyboardConfig)
    },
    clipOpts () {
      return Object.assign({}, GlobalConfig.table.clipConfig, this.clipConfig)
    },
    fnrOpts () {
      return Object.assign({}, GlobalConfig.table.fnrConfig, this.fnrConfig)
    },
    hasTip () {
      return VXETable._tooltip
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
      return !!((this.contextMenu || this.menuConfig) && isEnableConf(this.ctxMenuOpts) && (this.headerCtxMenu.length || this.bodyCtxMenu.length || this.footerCtxMenu.length))
    },
    ctxMenuOpts () {
      return Object.assign({}, GlobalConfig.table.menuConfig, this.contextMenu, this.menuConfig)
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
      return Object.assign({}, GlobalConfig.table.treeConfig, this.treeConfig)
    },
    emptyOpts () {
      return Object.assign({}, GlobalConfig.table.emptyRender, this.emptyRender)
    },
    cellOffsetWidth () {
      return this.border ? Math.max(2, Math.ceil(this.scrollbarWidth / this.tableColumn.length)) : 1
    },
    customOpts () {
      return Object.assign({}, GlobalConfig.table.customConfig, this.customConfig)
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
      const { tableFullData, tableData, treeConfig, checkboxOpts } = this
      const { strict, checkMethod } = checkboxOpts
      if (strict) {
        if (tableData.length || tableFullData.length) {
          if (checkMethod) {
            if (treeConfig) {
              // 暂时不支持树形结构
            }
            // 如果所有行都被禁用
            return tableFullData.every((row) => !checkMethod({ row }))
          }
          return false
        }
        return true
      }
      return false
    }
    // isMergeLeftFixedExceeded () {
    //   const { mergeList, columnStore, visibleColumn } = this
    //   const { leftList } = columnStore
    //   const lastFCIndex = visibleColumn.indexOf(leftList[leftList.length - 1])
    //   for (let i = 0, len = mergeList.length; i < len; i++) {
    //     const item = mergeList[i]
    //     if (item.col <= lastFCIndex && item.col + item.colspan > lastFCIndex) {
    //       return true
    //     }
    //   }
    //   return false
    // },
    // isMergeRightFixedExceeded () {
    //   const { mergeList, columnStore, visibleColumn } = this
    //   const { rightList } = columnStore
    //   const firstFCIndex = visibleColumn.indexOf(rightList[0])
    //   for (let i = 0, len = mergeList.length; i < len; i++) {
    //     const item = mergeList[i]
    //     if (item.col < firstFCIndex && item.col + item.colspan >= firstFCIndex) {
    //       return true
    //     }
    //   }
    //   return false
    // },
    // isMergeFooterLeftFixedExceeded () {
    //   const { mergeFooterList, columnStore, visibleColumn } = this
    //   const { leftList } = columnStore
    //   const lastFCIndex = visibleColumn.indexOf(leftList[leftList.length - 1])
    //   for (let i = 0, len = mergeFooterList.length; i < len; i++) {
    //     const item = mergeFooterList[i]
    //     if (item.col <= lastFCIndex && item.col + item.colspan > lastFCIndex) {
    //       return true
    //     }
    //   }
    //   return false
    // },
    // isMergeFooterRightFixedExceeded () {
    //   const { mergeFooterList, columnStore, visibleColumn } = this
    //   const { rightList } = columnStore
    //   const firstFCIndex = visibleColumn.indexOf(rightList[0])
    //   for (let i = 0, len = mergeFooterList.length; i < len; i++) {
    //     const item = mergeFooterList[i]
    //     if (item.col < firstFCIndex && item.col + item.colspan >= firstFCIndex) {
    //       return true
    //     }
    //   }
    //   return false
    // }
  },
  watch: {
    data (value) {
      const { inited, initStatus } = this
      this.loadTableData(value).then(() => {
        this.inited = true
        this.initStatus = true
        if (!initStatus) {
          this.handleLoadDefaults()
        }
        if (!inited) {
          this.handleInitDefaults()
        }
        if ((this.scrollXLoad || this.scrollYLoad) && this.expandColumn) {
          UtilTools.warn('vxe.error.scrollErrProp', ['column.type=expand'])
        }
        this.recalculate()
      })
    },
    staticColumns (value) {
      this.handleColumn(value)
    },
    tableColumn () {
      this.analyColumnWidth()
    },
    showHeader () {
      this.$nextTick(() => {
        this.recalculate(true).then(() => this.refreshScroll())
      })
    },
    showFooter () {
      this.$nextTick(() => {
        this.recalculate(true).then(() => this.refreshScroll())
      })
    },
    height () {
      this.$nextTick(() => this.recalculate(true))
    },
    maxHeight () {
      this.$nextTick(() => this.recalculate(true))
    },
    syncResize (value) {
      if (value) {
        handleUupdateResize(this)
        this.$nextTick(() => {
          handleUupdateResize(this)
          setTimeout(() => handleUupdateResize(this))
        })
      }
    },
    mergeCells (value) {
      this.clearMergeCells()
      this.$nextTick(() => this.setMergeCells(value))
    },
    mergeFooterItems (value) {
      this.clearMergeFooterItems()
      this.$nextTick(() => this.setMergeFooterItems(value))
    }
  },
  created () {
    const { scrollXStore, sYOpts, scrollYStore, data, editOpts, treeOpts, treeConfig, showOverflow } = Object.assign(this, {
      tZindex: 0,
      elemStore: {},
      // 存放横向 X 虚拟滚动相关的信息
      scrollXStore: {},
      // 存放纵向 Y 虚拟滚动相关信息
      scrollYStore: {},
      // 存放 tooltip 相关信息
      tooltipStore: {},
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
      // 行数据，已展开保留的行
      rowExpandedReserveRowMap: {},
      // 树结构数据，已展开保留的行
      treeExpandedReserveRowMap: {},
      // 完整数据、条件处理后
      tableFullData: [],
      afterFullData: [],
      // 收集的列配置（带分组）
      collectColumn: [],
      // 完整所有列（不带分组）
      tableFullColumn: [],
      // 渲染所有列
      visibleColumn: [],
      // 缓存数据集
      fullAllDataRowMap: new Map(),
      fullAllDataRowIdData: {},
      fullDataRowMap: new Map(),
      fullDataRowIdData: {},
      fullColumnMap: new Map(),
      fullColumnIdData: {},
      fullColumnFieldData: {}
    })

    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      if (!this.rowId && (this.checkboxOpts.reserve || this.checkboxOpts.checkRowKeys || this.radioOpts.reserve || this.radioOpts.checkRowKey || this.expandOpts.expandRowKeys || this.treeOpts.expandRowKeys)) {
        UtilTools.warn('vxe.error.reqProp', ['row-id'])
      }
      if (this.editConfig && editOpts.showStatus && !this.keepSource) {
        UtilTools.warn('vxe.error.reqProp', ['keep-source'])
      }
      if (treeConfig && treeOpts.line && (!this.rowKey || !showOverflow)) {
        UtilTools.warn('vxe.error.reqProp', ['row-key | show-overflow'])
      }
      if (this.showFooter && !this.footerMethod) {
        UtilTools.warn('vxe.error.reqProp', ['footer-method'])
      }
      if (treeConfig && this.stripe) {
        UtilTools.warn('vxe.error.noTree', ['stripe'])
      }
      if (this.tooltipOpts.enabled) {
        UtilTools.warn('vxe.error.delProp', ['tooltip-config.enabled', 'tooltip-config.showAll'])
      }
      // 检查导入导出类型，如果自定义导入导出方法，则不校验类型
      const { exportConfig, exportOpts, importConfig, importOpts } = this
      if (importConfig && importOpts.types && !importOpts.importMethod && !XEUtils.includeArrays(VXETable.config.importTypes, importOpts.types)) {
        UtilTools.warn('vxe.error.errProp', [`export-config.types=${importOpts.types.join(',')}`, importOpts.types.filter(type => XEUtils.includes(VXETable.config.importTypes, type)).join(',') || VXETable.config.importTypes.join(',')])
      }
      if (exportConfig && exportOpts.types && !exportOpts.exportMethod && !XEUtils.includeArrays(VXETable.config.exportTypes, exportOpts.types)) {
        UtilTools.warn('vxe.error.errProp', [`export-config.types=${exportOpts.types.join(',')}`, exportOpts.types.filter(type => XEUtils.includes(VXETable.config.exportTypes, type)).join(',') || VXETable.config.exportTypes.join(',')])
      }
    }

    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      const customOpts = this.customOpts
      if (!this.id && this.customConfig && (customOpts.storage === true || (customOpts.storage && customOpts.storage.resizable) || (customOpts.storage && customOpts.storage.visible))) {
        UtilTools.error('vxe.error.reqProp', ['id'])
      }
      if (this.treeConfig && this.checkboxOpts.range) {
        UtilTools.error('vxe.error.noTree', ['checkbox-config.range'])
      }
      if (!this.handleUpdateCellAreas) {
        if (this.clipConfig) {
          UtilTools.warn('vxe.error.notProp', ['clip-config'])
        }
        if (this.fnrConfig) {
          UtilTools.warn('vxe.error.notProp', ['fnr-config'])
        }
        if (this.mouseOpts.area) {
          UtilTools.error('vxe.error.notProp', ['mouse-config.area'])
          return
        }
      }
      if (this.mouseOpts.area && this.mouseOpts.selected) {
        UtilTools.warn('vxe.error.errConflicts', ['mouse-config.area', 'mouse-config.selected'])
      }
      if (this.mouseOpts.area && this.checkboxOpts.range) {
        UtilTools.warn('vxe.error.errConflicts', ['mouse-config.area', 'checkbox-config.range'])
      }
      if (this.treeConfig && this.mouseOpts.area) {
        UtilTools.error('vxe.error.noTree', ['mouse-config.area'])
      }
    }

    // v4 中只支持对象类型
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      // 在 v3.0 中废弃 context-menu
      if (this.contextMenu) {
        UtilTools.warn('vxe.error.delProp', ['context-menu', 'menu-config'])
        if (!XEUtils.isObject(this.contextMenu)) {
          UtilTools.warn('vxe.error.errProp', [`table.context-menu=${this.contextMenu}`, 'table.context-menu={}'])
        }
      }
      if (this.menuConfig && !XEUtils.isObject(this.menuConfig)) {
        UtilTools.warn('vxe.error.errProp', [`table.menu-config=${this.menuConfig}`, 'table.menu-config={}'])
      }
      if (this.exportConfig && !XEUtils.isObject(this.exportConfig)) {
        UtilTools.warn('vxe.error.errProp', [`table.export-config=${this.exportConfig}`, 'table.export-config={}'])
      }
      if (this.importConfig && !XEUtils.isObject(this.importConfig)) {
        UtilTools.warn('vxe.error.errProp', [`table.import-config=${this.importConfig}`, 'table.import-config={}'])
      }
      if (this.printConfig && !XEUtils.isObject(this.printConfig)) {
        UtilTools.warn('vxe.error.errProp', [`table.print-config=${this.printConfig}`, 'table.print-config={}'])
      }
      if (this.treeConfig && !XEUtils.isObject(this.treeConfig)) {
        UtilTools.warn('vxe.error.errProp', [`table.tree-config=${this.treeConfig}`, 'table.tree-config={}'])
      }
      if (this.customConfig && !XEUtils.isObject(this.customConfig)) {
        UtilTools.warn('vxe.error.errProp', [`table.custom-config=${this.customConfig}`, 'table.custom-config={}'])
      }
      if (this.editConfig && !XEUtils.isObject(this.editConfig)) {
        UtilTools.warn('vxe.error.errProp', [`table.edit-config=${this.editConfig}`, 'table.edit-config={}'])
      }
      if (this.emptyRender && !XEUtils.isObject(this.emptyRender)) {
        UtilTools.warn('vxe.error.errProp', [`table.empty-render=${this.emptyRender}`, 'table.empty-render={}'])
      }
    }

    // 检查是否有安装需要的模块
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      if (this.editConfig && !this._insert) {
        UtilTools.error('vxe.error.reqModule', ['Edit'])
      }
      if (this.editRules && !this._validate) {
        UtilTools.error('vxe.error.reqModule', ['Validator'])
      }
      if ((this.checkboxOpts.range || this.keyboardConfig || this.mouseConfig) && !this.triggerCellMousedownEvent) {
        UtilTools.error('vxe.error.reqModule', ['Keyboard'])
      }
      if ((this.printConfig || this.importConfig || this.exportConfig) && !this._exportData) {
        UtilTools.error('vxe.error.reqModule', ['Export'])
      }
    }

    Object.assign(scrollYStore, {
      startIndex: 0,
      endIndex: 1,
      visibleSize: 0,
      adaptive: sYOpts.adaptive !== false
    })
    Object.assign(scrollXStore, {
      startIndex: 0,
      endIndex: 1,
      visibleSize: 0
    })
    this.loadTableData(data).then(() => {
      if (data && data.length) {
        this.inited = true
        this.initStatus = true
        this.handleLoadDefaults()
        this.handleInitDefaults()
      }
      this.updateStyle()
    })
    GlobalEvent.on(this, 'paste', this.handleGlobalPasteEvent)
    GlobalEvent.on(this, 'copy', this.handleGlobalCopyEvent)
    GlobalEvent.on(this, 'cut', this.handleGlobalCutEvent)
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent)
    GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent)
    this.preventEvent(null, 'created')
  },
  mounted () {
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      const { $listeners } = this
      if (!this.menuConfig && ($listeners['menu-click'] || $listeners['cell-menu'] || $listeners['header-cell-menu'] || $listeners['footer-cell-menu'])) {
        UtilTools.warn('vxe.error.reqProp', ['menu-config'])
      }
      if (!this.tooltipConfig && ($listeners['cell-mouseenter'] || $listeners['cell-mouseleave'])) {
        UtilTools.warn('vxe.error.reqProp', ['tooltip-config'])
      }
    }
    if (this.autoResize) {
      const resizeObserver = createResizeEvent(() => this.recalculate(true))
      resizeObserver.observe(this.$el)
      resizeObserver.observe(this.getParentElem())
      this.$resize = resizeObserver
    }
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
    if (this.$resize) {
      this.$resize.disconnect()
    }
    this.closeFilter()
    this.closeMenu()
    this.preventEvent(null, 'beforeDestroy')
  },
  destroyed () {
    GlobalEvent.off(this, 'paste')
    GlobalEvent.off(this, 'copy')
    GlobalEvent.off(this, 'cut')
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
      tId,
      tableData,
      tableColumn,
      tableGroupColumn,
      isGroup,
      loading,
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
      showFooter,
      overflowX,
      overflowY,
      scrollXLoad,
      scrollYLoad,
      scrollbarHeight,
      highlightCell,
      highlightHoverRow,
      highlightHoverColumn,
      editConfig,
      validTipOpts,
      tooltipOpts,
      initStore,
      columnStore,
      filterStore,
      ctxMenuStore,
      ctxMenuOpts,
      footerTableData,
      hasTip
    } = this
    const { leftList, rightList } = columnStore
    return h('div', {
      class: ['vxe-table', 'vxe-table--render-default', `tid_${tId}`, vSize ? `size--${vSize}` : '', `border--${tableBorder}`, {
        'vxe-editable': !!editConfig,
        'cell--highlight': highlightCell,
        'cell--selected': mouseConfig && mouseOpts.selected,
        'cell--area': mouseConfig && mouseOpts.area,
        'row--highlight': highlightHoverRow,
        'column--highlight': highlightHoverColumn,
        'is--header': showHeader,
        'is--footer': showFooter,
        'is--group': isGroup,
        'is--tree-line': treeConfig && treeOpts.line,
        'is--fixed-left': leftList.length,
        'is--fixed-right': rightList.length,
        'is--animat': !!this.animat,
        'is--round': this.round,
        'is--stripe': !treeConfig && stripe,
        'is--loading': loading,
        'is--empty': !loading && !tableData.length,
        'is--scroll-y': overflowY,
        'is--scroll-x': overflowX,
        'is--virtual-x': scrollXLoad,
        'is--virtual-y': scrollYLoad
      }],
      on: {
        keydown: this.keydownEvent
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
        class: 'vxe-table--render-wrapper'
      }, [
        h('div', {
          class: 'vxe-table--main-wrapper'
        }, [
          /**
           * 表头
           */
          showHeader ? h('vxe-table-header', {
            ref: 'tableHeader',
            props: {
              tableData,
              tableColumn,
              tableGroupColumn,
              size: vSize
            }
          }) : _e(),
          /**
           * 表体
           */
          h('vxe-table-body', {
            ref: 'tableBody',
            props: {
              tableData,
              tableColumn,
              size: vSize
            }
          }),
          /**
           * 表尾
           */
          showFooter ? h('vxe-table-footer', {
            ref: 'tableFooter',
            props: {
              footerTableData,
              tableColumn,
              size: vSize
            }
          }) : _e()
        ]),
        h('div', {
          class: 'vxe-table--fixed-wrapper'
        }, [
          /**
           * 左侧固定区域
           */
          leftList && leftList.length && overflowX ? renderFixed(h, this, 'left') : _e(),
          /**
           * 右侧固定区域
           */
          rightList && rightList.length && overflowX ? renderFixed(h, this, 'right') : _e()
        ])
      ]),
      /**
       * 空数据
       */
      h('div', {
        ref: 'emptyPlaceholder',
        class: 'vxe-table--empty-placeholder'
      }, [
        h('div', {
          class: 'vxe-table--empty-content'
        }, renderEmptyContenet(h, this))
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
      h('div', {
        class: 'vxe-table--resizable-bar',
        style: overflowX ? {
          'padding-bottom': `${scrollbarHeight}px`
        } : null,
        ref: 'resizeBar'
      }),
      /**
       * 加载中
       */
      h('div', {
        class: ['vxe-table--loading vxe-loading', {
          'is--visible': loading
        }]
      }, [
        h('div', {
          class: 'vxe-loading--spinner'
        })
      ]),
      /**
       * 筛选
       */
      initStore.filter ? h('vxe-table-filter', {
        ref: 'filterWrapper',
        props: {
          filterStore
        }
      }) : _e(),
      /**
       * 导入
       */
      initStore.import && this.importConfig ? h('vxe-import-panel', {
        props: {
          defaultOptions: this.importParams,
          storeData: this.importStore
        }
      }) : _e(),
      /**
       * 导出/打印
       */
      initStore.export && (this.exportConfig || this.printConfig) ? h('vxe-export-panel', {
        props: {
          defaultOptions: this.exportParams,
          storeData: this.exportStore
        }
      }) : _e(),
      /**
       * 快捷菜单
       */
      ctxMenuStore.visible && this.isCtxMenu ? h('vxe-table-context-menu', {
        ref: 'ctxWrapper',
        props: {
          ctxMenuStore,
          ctxMenuOpts
        }
      }) : _e(),
      /**
       * 通用提示
       */
      hasTip ? h('vxe-tooltip', {
        ref: 'commTip',
        props: {
          isArrow: false,
          enterable: false
        }
      }) : _e(),
      /**
       * 工具提示
       */
      hasTip ? h('vxe-tooltip', {
        ref: 'tooltip',
        props: tooltipOpts
      }) : _e(),
      /**
       * 校验提示
       */
      hasTip && this.editRules && validOpts.showMessage && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip') ? h('vxe-tooltip', {
        ref: 'validTip',
        class: 'vxe-table--valid-error',
        props: validOpts.message === 'tooltip' || tableData.length === 1 ? validTipOpts : null
      }) : _e()
    ])
  },
  methods
}
