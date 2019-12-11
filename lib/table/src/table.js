"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

var _methods = _interopRequireDefault(require("./methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 渲染浮固定列
 * 分别渲染左边固定列和右边固定列
 * 如果宽度足够情况下，则不需要渲染固定列
 * @param {Function} h 创建 VNode 函数
 * @param {Object} $table 表格实例
 * @param {String} fixedType 固定列类型
 */
function renderFixed(h, $table, fixedType) {
  var tableData = $table.tableData,
      tableColumn = $table.tableColumn,
      visibleColumn = $table.visibleColumn,
      collectColumn = $table.collectColumn,
      isGroup = $table.isGroup,
      vSize = $table.vSize,
      showHeader = $table.showHeader,
      showFooter = $table.showFooter,
      columnStore = $table.columnStore,
      footerData = $table.footerData;
  var fixedColumn = columnStore["".concat(fixedType, "List")];
  return h('div', {
    class: "vxe-table--fixed-".concat(fixedType, "-wrapper"),
    ref: "".concat(fixedType, "Container")
  }, [showHeader ? h('vxe-table-header', {
    props: {
      fixedType: fixedType,
      tableData: tableData,
      tableColumn: tableColumn,
      visibleColumn: visibleColumn,
      collectColumn: collectColumn,
      size: vSize,
      fixedColumn: fixedColumn,
      isGroup: isGroup
    },
    ref: "".concat(fixedType, "Header")
  }) : null, h('vxe-table-body', {
    props: {
      fixedType: fixedType,
      tableData: tableData,
      tableColumn: tableColumn,
      visibleColumn: visibleColumn,
      collectColumn: collectColumn,
      fixedColumn: fixedColumn,
      size: vSize,
      isGroup: isGroup
    },
    ref: "".concat(fixedType, "Body")
  }), showFooter ? h('vxe-table-footer', {
    props: {
      fixedType: fixedType,
      footerData: footerData,
      tableColumn: tableColumn,
      visibleColumn: visibleColumn,
      size: vSize,
      fixedColumn: fixedColumn
    },
    ref: "".concat(fixedType, "Footer")
  }) : null]);
}

var _default2 = {
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
    resizable: {
      type: Boolean,
      default: function _default() {
        return _conf.default.resizable;
      }
    },
    // 是否带有斑马纹
    stripe: {
      type: Boolean,
      default: function _default() {
        return _conf.default.stripe;
      }
    },
    // 是否带有纵向边框
    border: {
      type: [Boolean, String],
      default: function _default() {
        return _conf.default.border;
      }
    },
    // 表格的尺寸
    size: {
      type: String,
      default: function _default() {
        return _conf.default.size;
      }
    },
    // 列的宽度是否自撑开
    fit: {
      type: Boolean,
      default: function _default() {
        return _conf.default.fit;
      }
    },
    // 表格是否加载中
    loading: Boolean,
    // 所有的列对其方式
    align: {
      type: String,
      default: function _default() {
        return _conf.default.align;
      }
    },
    // 所有的表头列的对齐方式
    headerAlign: {
      type: String,
      default: function _default() {
        return _conf.default.headerAlign;
      }
    },
    // 所有的表尾列的对齐方式
    footerAlign: {
      type: String,
      default: function _default() {
        return _conf.default.footerAlign;
      }
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: function _default() {
        return _conf.default.showHeader;
      }
    },
    // （v3.0 废弃）
    startIndex: {
      type: Number,
      default: 0
    },
    // 是否要高亮当前选中行
    highlightCurrentRow: {
      type: Boolean,
      default: function _default() {
        return _conf.default.highlightCurrentRow;
      }
    },
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: {
      type: Boolean,
      default: function _default() {
        return _conf.default.highlightHoverRow;
      }
    },
    // 是否要高亮当前选中列
    highlightCurrentColumn: {
      type: Boolean,
      default: function _default() {
        return _conf.default.highlightCurrentColumn;
      }
    },
    // 鼠标移到列是否要高亮显示
    highlightHoverColumn: {
      type: Boolean,
      default: function _default() {
        return _conf.default.highlightHoverColumn;
      }
    },
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
    showOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return _conf.default.showOverflow;
      }
    },
    // 设置表头所有内容过长时显示为省略号
    showHeaderOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return _conf.default.showHeaderOverflow;
      }
    },
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
    rowId: {
      type: String,
      default: function _default() {
        return _conf.default.rowId;
      }
    },
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
  provide: function provide() {
    return {
      $table: this
    };
  },
  inject: {
    $grid: {
      default: null
    }
  },
  mixins: [],
  data: function data() {
    return {
      id: _xeUtils.default.uniqueId(),
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
      printUrl: ''
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    validOpts: function validOpts() {
      return Object.assign({
        message: 'default'
      }, _conf.default.validConfig, this.validConfig);
    },
    optimizeOpts: function optimizeOpts() {
      return Object.assign({}, _conf.default.optimization, this.optimization);
    },
    rowHeightMaps: function rowHeightMaps() {
      return Object.assign({
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      }, this.optimizeOpts.rHeights);
    },
    seqOpts: function seqOpts() {
      return Object.assign({
        startIndex: 0
      }, _conf.default.seqConfig, this.seqConfig);
    },
    radioOpts: function radioOpts() {
      return Object.assign({}, _conf.default.radioConfig, this.radioConfig);
    },
    checkboxOpts: function checkboxOpts() {
      return Object.assign({}, _conf.default.checkboxConfig, this.checkboxConfig || this.selectConfig);
    },
    tooltipOpts: function tooltipOpts() {
      return Object.assign({
        leaveDelay: 300
      }, _conf.default.tooltipConfig, this.tooltipConfig);
    },
    vaildTipOpts: function vaildTipOpts() {
      return Object.assign({
        isArrow: false
      }, this.tooltipOpts);
    },
    sortOpts: function sortOpts() {
      return Object.assign({}, _conf.default.sortConfig, this.sortConfig);
    },
    filterOpts: function filterOpts() {
      return Object.assign({}, _conf.default.filterConfig, this.filterConfig);
    },
    // 是否使用了分组表头
    isGroup: function isGroup() {
      return this.collectColumn.some(function (column) {
        return _tools.UtilTools.hasChildrenList(column);
      });
    },
    hasTip: function hasTip() {
      return _vXETable.default._tooltip;
    },
    visibleColumn: function visibleColumn() {
      return this.tableFullColumn ? this.tableFullColumn.filter(function (column) {
        return column.visible;
      }) : [];
    },
    isResizable: function isResizable() {
      return this.resizable || this.tableFullColumn.some(function (column) {
        return column.resizable;
      });
    },
    hasFilter: function hasFilter() {
      return this.tableColumn.some(function (column) {
        return column.filters && column.filters.length;
      });
    },
    headerCtxMenu: function headerCtxMenu() {
      return this.ctxMenuOpts.header && this.ctxMenuOpts.header.options ? this.ctxMenuOpts.header.options : [];
    },
    bodyCtxMenu: function bodyCtxMenu() {
      return this.ctxMenuOpts.body && this.ctxMenuOpts.body.options ? this.ctxMenuOpts.body.options : [];
    },
    isCtxMenu: function isCtxMenu() {
      return this.headerCtxMenu.length || this.bodyCtxMenu.length;
    },
    ctxMenuOpts: function ctxMenuOpts() {
      return Object.assign({}, _conf.default.menu, this.contextMenu);
    },
    ctxMenuList: function ctxMenuList() {
      var rest = [];
      this.ctxMenuStore.list.forEach(function (list) {
        list.forEach(function (item) {
          rest.push(item);
        });
      });
      return rest;
    },
    expandOpts: function expandOpts() {
      return Object.assign({}, _conf.default.expandConfig, this.expandConfig);
    },
    treeOpts: function treeOpts() {
      return Object.assign({
        children: 'children',
        hasChild: 'hasChild',
        indent: 20
      }, _conf.default.treeConfig, this.treeConfig);
    },

    /**
     * 判断列全选的复选框是否禁用
     */
    isAllCheckboxDisabled: function isAllCheckboxDisabled() {
      var tableFullData = this.tableFullData,
          treeConfig = this.treeConfig,
          checkboxOpts = this.checkboxOpts;
      var strict = checkboxOpts.strict,
          checkMethod = checkboxOpts.checkMethod;

      if (strict) {
        if (tableFullData.length) {
          if (checkMethod) {
            if (treeConfig) {} // 暂时不支持树形结构
            // 如果所有行都被禁用


            return tableFullData.every(function (row, rowIndex) {
              return !checkMethod({
                row: row,
                rowIndex: rowIndex,
                $rowIndex: rowIndex
              });
            });
          }

          return false;
        }

        return true;
      }

      return false;
    }
  },
  watch: {
    data: function data(value) {
      this.loadTableData(value, true).then(this.handleDefault);
    },
    customs: function customs(value) {
      if (!this.isUpdateCustoms) {
        this.mergeCustomColumn(value);
      }

      this.isUpdateCustoms = false;
    },
    collectColumn: function collectColumn(value) {
      var _this = this;

      var tableFullColumn = _tools.UtilTools.getColumnList(value);

      this.tableFullColumn = tableFullColumn;
      this.cacheColumnMap();

      if (this.customs) {
        this.mergeCustomColumn(this.customs);
      }

      this.refreshColumn().then(function () {
        if (_this.scrollXLoad) {
          _this.updateVirtualScrollX(true);
        }
      });
      this.handleTableData(true);

      if (this.$toolbar) {
        this.$toolbar.updateColumn(tableFullColumn);
      } // 在 v3.0 中废弃 prop、label


      if (tableFullColumn.length) {
        var cIndex = Math.floor((tableFullColumn.length - 1) / 2);

        if (tableFullColumn[cIndex].prop) {
          _tools.UtilTools.warn('vxe.error.delProp', ['prop', 'field']);
        }

        if (tableFullColumn[cIndex].label) {
          _tools.UtilTools.warn('vxe.error.delProp', ['label', 'title']);
        }
      }

      if (this.treeConfig && tableFullColumn.some(function (column) {
        return column.fixed;
      }) && tableFullColumn.some(function (column) {
        return column.type === 'expand';
      })) {
        _tools.UtilTools.warn('vxe.error.treeFixedExpand');
      }
    },
    tableColumn: function tableColumn() {
      this.analyColumnWidth();
    },
    height: function height() {
      var _this2 = this;

      this.$nextTick(function () {
        return _this2.recalculate(true);
      });
    },
    loading: function loading() {
      if (!this._isLoading) {
        this._isLoading = true;
      }
    },
    syncResize: function syncResize(value) {
      var _this3 = this;

      if (value) {
        this.$nextTick(function () {
          return _this3.recalculate(true);
        });
      }
    }
  },
  created: function created() {
    var _this4 = this;

    var _Object$assign = Object.assign(this, {
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
      // 单选框属性，选中列
      // currentColumn: null,
      // 当前 hover 行
      // hoverRow: null,
      // 最后滚动位置
      lastScrollLeft: 0,
      lastScrollTop: 0,
      // 复选框属性，已选中保留的行
      selectReserveRowMap: {},
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
    }),
        scrollXStore = _Object$assign.scrollXStore,
        scrollYStore = _Object$assign.scrollYStore,
        optimizeOpts = _Object$assign.optimizeOpts,
        data = _Object$assign.data,
        loading = _Object$assign.loading,
        treeOpts = _Object$assign.treeOpts,
        treeConfig = _Object$assign.treeConfig,
        showOverflow = _Object$assign.showOverflow;

    var scrollX = optimizeOpts.scrollX,
        scrollY = optimizeOpts.scrollY; // 是否加载过 Loading 模块

    this._isLoading = loading;

    if (!_tools.UtilTools.getRowkey(this)) {
      _tools.UtilTools.error('vxe.error.emptyProp', ['row-id']);
    }

    if (this.startIndex) {// UtilTools.warn('vxe.error.delProp', ['start-index', 'seq-config.startIndex'])
    }

    if (this.selectConfig) {
      _tools.UtilTools.warn('vxe.error.delProp', ['select-config', 'checkbox-config']);
    }

    if (treeConfig && treeOpts.line && !showOverflow) {
      _tools.UtilTools.warn('vxe.error.treeLineReqProp', ['show-overflow']);
    }

    if (this.sortMethod) {
      _tools.UtilTools.warn('vxe.error.delProp', ['sort-method', 'sort-config.sortMethod']);
    }

    if (this.remoteSort) {
      _tools.UtilTools.warn('vxe.error.delProp', ['remote-sort', 'sort-config.remote']);
    }

    if (this.remoteFilter) {
      _tools.UtilTools.warn('vxe.error.delProp', ['remote-filter', 'filter-config.remote']);
    } // 检查是否有安装需要的模块


    var errorModuleName;

    if (!_vXETable.default._edit && this.editConfig) {
      errorModuleName = 'Edit';
    } else if (!_vXETable.default._valid && this.editRules) {
      errorModuleName = 'Validator';
    } else if (!_vXETable.default._keyboard && (this.keyboardConfig || this.mouseConfig)) {
      errorModuleName = 'Keyboard';
    } else if (!_vXETable.default._resize && this.autoResize) {
      errorModuleName = 'Resize';
    }

    if (errorModuleName) {
      throw new Error(_tools.UtilTools.getLog('vxe.error.reqModule', [errorModuleName]));
    }

    if (scrollY) {
      Object.assign(scrollYStore, {
        startIndex: 0,
        visibleIndex: 0,
        adaptive: _xeUtils.default.isBoolean(scrollY.adaptive) ? scrollY.adaptive : true,
        renderSize: _xeUtils.default.toNumber(scrollY.rSize),
        offsetSize: _xeUtils.default.toNumber(scrollY.oSize)
      });
    }

    if (scrollX) {
      Object.assign(scrollXStore, {
        startIndex: 0,
        visibleIndex: 0,
        renderSize: _xeUtils.default.toNumber(scrollX.rSize),
        offsetSize: _xeUtils.default.toNumber(scrollX.oSize)
      });
    }

    this.loadTableData(data, true).then(function () {
      _this4.handleDefault();

      _this4.updateStyle();
    });

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);

    _tools.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);

    _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);

    _tools.GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent);

    _tools.GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent);

    this.preventEvent(null, 'created', {
      $table: this
    });
  },
  mounted: function mounted() {
    if (this.autoResize && _vXETable.default._resize) {
      this.bindResize();
    }

    document.body.appendChild(this.$refs.tableWrapper);
    this.preventEvent(null, 'mounted', {
      $table: this
    });
  },
  activated: function activated() {
    this.refreshScroll();
    this.preventEvent(null, 'activated', {
      $table: this
    });
  },
  deactivated: function deactivated() {
    this.preventEvent(null, 'deactivated', {
      $table: this
    });
  },
  beforeDestroy: function beforeDestroy() {
    var tableWrapper = this.$refs.tableWrapper;

    if (tableWrapper && tableWrapper.parentNode) {
      tableWrapper.parentNode.removeChild(tableWrapper);
    }

    if (_vXETable.default._resize) {
      this.unbindResize();
    }

    this.closeFilter();
    this.closeMenu();
    this.clearAll();
    this.preventEvent(null, 'beforeDestroy', {
      $table: this
    });
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'mousedown');

    _tools.GlobalEvent.off(this, 'blur');

    _tools.GlobalEvent.off(this, 'mousewheel');

    _tools.GlobalEvent.off(this, 'keydown');

    _tools.GlobalEvent.off(this, 'resize');

    _tools.GlobalEvent.off(this, 'contextmenu');

    this.preventEvent(null, 'destroyed', {
      $table: this
    });
  },
  render: function render(h) {
    var _e = this._e,
        id = this.id,
        tableData = this.tableData,
        tableColumn = this.tableColumn,
        visibleColumn = this.visibleColumn,
        collectColumn = this.collectColumn,
        isGroup = this.isGroup,
        hasFilter = this.hasFilter,
        isResizable = this.isResizable,
        isCtxMenu = this.isCtxMenu,
        loading = this.loading,
        stripe = this.stripe,
        _isLoading = this._isLoading,
        showHeader = this.showHeader,
        height = this.height,
        border = this.border,
        treeOpts = this.treeOpts,
        treeConfig = this.treeConfig,
        mouseConfig = this.mouseConfig,
        vSize = this.vSize,
        validOpts = this.validOpts,
        editRules = this.editRules,
        showFooter = this.showFooter,
        footerMethod = this.footerMethod,
        overflowX = this.overflowX,
        overflowY = this.overflowY,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad,
        scrollbarHeight = this.scrollbarHeight,
        highlightCell = this.highlightCell,
        highlightHoverRow = this.highlightHoverRow,
        highlightHoverColumn = this.highlightHoverColumn,
        editConfig = this.editConfig,
        optimizeOpts = this.optimizeOpts,
        vaildTipOpts = this.vaildTipOpts,
        tooltipOpts = this.tooltipOpts,
        columnStore = this.columnStore,
        filterStore = this.filterStore,
        ctxMenuStore = this.ctxMenuStore,
        footerData = this.footerData,
        hasTip = this.hasTip;
    var leftList = columnStore.leftList,
        rightList = columnStore.rightList;
    return h('div', {
      class: ['vxe-table', vSize ? "size--".concat(vSize) : '', border && _xeUtils.default.isString(border) ? "b--style-".concat(border) : '', {
        'vxe-editable': editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'has--height': height,
        'has--tree-line': treeConfig && treeOpts.line,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        'c--highlight': highlightCell,
        't--animat': optimizeOpts.animat,
        't--stripe': stripe,
        't--border': border,
        't--selected': mouseConfig && mouseConfig.selected,
        't--checked': mouseConfig && mouseConfig.checked,
        'row--highlight': highlightHoverRow,
        'column--highlight': highlightHoverColumn,
        'is--loading': loading,
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
    }, this.$slots.default), h('div', {
      class: 'vxe-table--main-wrapper'
    }, [
    /**
     * 主头部
     */
    showHeader ? h('vxe-table-header', {
      ref: 'tableHeader',
      props: {
        tableData: tableData,
        tableColumn: tableColumn,
        visibleColumn: visibleColumn,
        collectColumn: collectColumn,
        size: vSize,
        isGroup: isGroup
      }
    }) : _e(),
    /**
     * 主内容
     */
    h('vxe-table-body', {
      ref: 'tableBody',
      props: {
        tableData: tableData,
        tableColumn: tableColumn,
        visibleColumn: visibleColumn,
        collectColumn: collectColumn,
        size: vSize,
        isGroup: isGroup
      }
    }),
    /**
     * 底部汇总
     */
    showFooter ? h('vxe-table-footer', {
      props: {
        footerData: footerData,
        footerMethod: footerMethod,
        tableColumn: tableColumn,
        visibleColumn: visibleColumn,
        size: vSize
      },
      ref: 'tableFooter'
    }) : null]),
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
      class: 'vxe-table--empty-placeholder'
    }, [h('div', {
      class: 'vxe-table--empty-content'
    }, this.$scopedSlots.empty ? this.$scopedSlots.empty.call(this, {
      $table: this
    }, h) : _conf.default.i18n('vxe.table.emptyText'))]) : _e(),
    /**
     * 列宽线
     */
    isResizable ? h('div', {
      class: 'vxe-table--resizable-bar',
      style: overflowX ? {
        'padding-bottom': "".concat(scrollbarHeight, "px")
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
        optimizeOpts: optimizeOpts,
        filterStore: filterStore
      },
      ref: 'filterWrapper'
    }) : _e(), h('div', {
      class: "vxe-table".concat(id, "-wrapper ").concat(this.$vnode.data.staticClass || ''),
      ref: 'tableWrapper'
    }, [
    /**
     * 快捷菜单
     */
    isCtxMenu ? h('vxe-table-context-menu', {
      props: {
        ctxMenuStore: ctxMenuStore
      },
      ref: 'ctxWrapper'
    }) : _e(),
    /**
     * 单元格内容溢出的 tooltip
     */
    hasTip ? h('vxe-tooltip', {
      ref: 'tooltip',
      props: tooltipOpts,
      on: tooltipOpts.enterable ? {
        leave: this.handleTooltipLeaveEvent
      } : null
    }) : _e(),
    /**
     * 校验不通过的 tooltip
     */
    hasTip && editRules && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip') ? h('vxe-tooltip', {
      class: 'vxe-table--valid-error',
      props: validOpts.message === 'tooltip' || tableData.length === 1 ? vaildTipOpts : null,
      ref: 'validTip'
    }) : _e()])]);
  },
  methods: _methods.default
};
exports.default = _default2;