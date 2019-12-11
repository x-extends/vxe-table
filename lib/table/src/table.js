"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _cell = _interopRequireDefault(require("../../cell"));

var _vXETable = _interopRequireWildcard(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var rowUniqueId = 0;
var browse = _tools.DomTools.browse;
var debounceScrollYDuration = browse.msie ? 40 : 20; // 导入

var fileForm = document.createElement('form');
var fileInput = document.createElement('input');
fileForm.className = 'vxe-table--import-form';
fileInput.name = 'file';
fileInput.type = 'file';
fileForm.appendChild(fileInput); // 打印

var printFrame;

function createFrame() {
  var frame = document.createElement('iframe');
  frame.className = 'vxe-table--print-frame';
  return frame;
}

function getRowUniqueId() {
  return "row_".concat(++rowUniqueId);
}

function isTargetRadioOrCheckbox(evnt, column, colType, targetType) {
  var target = evnt.target;
  return target && column.type === colType && target.tagName.toLowerCase() === 'input' && target.type === (targetType || colType);
}

var Rule =
/*#__PURE__*/
function () {
  function Rule(rule) {
    _classCallCheck(this, Rule);

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
    });
  }

  _createClass(Rule, [{
    key: "message",
    get: function get() {
      return _tools.UtilTools.getFuncText(this.$options.message);
    }
  }]);

  return Rule;
}();
/**
 * 渲染浮固定列
 */


function renderFixed(h, $table, fixedType) {
  var tableData = $table.tableData,
      tableColumn = $table.tableColumn,
      visibleColumn = $table.visibleColumn,
      collectColumn = $table.collectColumn,
      isGroup = $table.isGroup,
      height = $table.height,
      parentHeight = $table.parentHeight,
      vSize = $table.vSize,
      headerHeight = $table.headerHeight,
      footerHeight = $table.footerHeight,
      showHeader = $table.showHeader,
      showFooter = $table.showFooter,
      tableHeight = $table.tableHeight,
      scrollbarWidth = $table.scrollbarWidth,
      scrollbarHeight = $table.scrollbarHeight,
      scrollRightToLeft = $table.scrollRightToLeft,
      scrollLeftToRight = $table.scrollLeftToRight,
      columnStore = $table.columnStore,
      footerData = $table.footerData;
  var isRightFixed = fixedType === 'right';
  var fixedColumn = columnStore["".concat(fixedType, "List")];
  var customHeight = 0;

  if (height) {
    customHeight = height === 'auto' ? parentHeight : _tools.DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : _xeUtils.default.toNumber(height);

    if (showFooter) {
      customHeight += scrollbarHeight + 1;
    }
  }

  var style = {
    height: "".concat((customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1), "px"),
    width: "".concat(fixedColumn.reduce(function (previous, column) {
      return previous + column.renderWidth;
    }, isRightFixed ? scrollbarWidth : 0), "px")
  };
  return h('div', {
    class: ["vxe-table--fixed-".concat(fixedType, "-wrapper"), {
      'scrolling--middle': isRightFixed ? scrollRightToLeft : scrollLeftToRight
    }],
    style: style,
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
    style: {
      top: "".concat(headerHeight, "px")
    },
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
    style: {
      top: "".concat(customHeight > 0 ? customHeight - footerHeight : tableHeight + headerHeight, "px")
    },
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
} // 分组表头的属性


var headerProps = {
  children: 'children'
};
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
    showAllOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return _conf.default.showOverflow;
      }
    },
    // （v2.0 废弃）
    showHeaderAllOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return _conf.default.showHeaderOverflow;
      }
    },
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
  data: function data() {
    return {
      id: _xeUtils.default.uniqueId(),
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
    // 优化的参数
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
      } // 在 v2.0 中废弃


      if (tableFullColumn.length) {
        if (tableFullColumn.some(function (column) {
          return column.columnKey;
        })) {
          _tools.UtilTools.warn('vxe.error.delProp', ['column.column-key', 'table.column-key']);
        }
      } // 在 v3.0 中废弃 prop/label


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

    var scrollXStore = this.scrollXStore,
        scrollYStore = this.scrollYStore,
        optimizeOpts = this.optimizeOpts,
        ctxMenuOpts = this.ctxMenuOpts,
        showOverflow = this.showOverflow,
        radioOpts = this.radioOpts,
        checkboxOpts = this.checkboxOpts,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        editConfig = this.editConfig,
        loading = this.loading,
        showAllOverflow = this.showAllOverflow,
        showHeaderAllOverflow = this.showHeaderAllOverflow;
    var scrollX = optimizeOpts.scrollX,
        scrollY = optimizeOpts.scrollY;

    if (loading) {
      this._isLoading = true;
    }

    if (scrollY) {
      Object.assign(scrollYStore, {
        startIndex: 0,
        visibleIndex: 0,
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

    if (!_tools.UtilTools.getRowkey(this)) {
      _tools.UtilTools.error('vxe.error.emptyProp', ['row-id']);
    }

    if (this.startIndex) {// UtilTools.warn('vxe.error.delProp', ['start-index', 'seq-config.startIndex'])
    }

    if (_xeUtils.default.isBoolean(showAllOverflow)) {
      _tools.UtilTools.warn('vxe.error.delProp', ['show-all-overflow', 'show-overflow']);
    }

    if (_xeUtils.default.isBoolean(showHeaderAllOverflow)) {
      _tools.UtilTools.warn('vxe.error.delProp', ['show-header-all-overflow', 'show-header-overflow']);
    }

    if (radioOpts.labelProp) {
      _tools.UtilTools.warn('vxe.error.delProp', ['radio-config.labelProp', 'radio-config.labelField']);
    }

    if (this.selectConfig) {
      _tools.UtilTools.warn('vxe.error.delProp', ['select-config', 'checkbox-config']);
    }

    if (treeConfig && treeOpts.line && !showOverflow) {
      _tools.UtilTools.warn('vxe.error.treeLineReqProp', ['show-overflow']);
    }

    if (checkboxOpts.checkProp) {
      _tools.UtilTools.warn('vxe.error.delProp', ['select-config.checkProp', 'select-config.checkField']);
    }

    if (checkboxOpts.labelProp) {
      _tools.UtilTools.warn('vxe.error.delProp', ['select-config.labelProp', 'select-config.labelField']);
    }

    if (this.sortMethod) {
      _tools.UtilTools.warn('vxe.error.delProp', ['sort-method', 'sort-config.sortMethod']);
    }

    if (this.remoteSort) {
      _tools.UtilTools.warn('vxe.error.delProp', ['remote-sort', 'sort-config.remote']);
    }

    if (this.remoteFilter) {
      _tools.UtilTools.warn('vxe.error.delProp', ['remote-filter', 'filter-config.remote']);
    }

    ['header', 'body', 'footer'].forEach(function (name) {
      if (ctxMenuOpts[name] && ctxMenuOpts[name].visibleMethod) {
        _tools.UtilTools.warn('vxe.error.delProp', ["context-menu.".concat(name, ".visibleMethod"), 'context-menu.visibleMethod']);
      }
    });
    this.lastScrollLeft = 0;
    this.lastScrollTop = 0;
    this.afterFullData = [];
    this.selectReserveRowMap = {}; // 复选框属性，已选中保留的行

    this.fullAllDataRowMap = new Map();
    this.fullAllDataRowIdData = {};
    this.fullDataRowMap = new Map();
    this.fullDataRowIdData = {};
    this.fullColumnMap = new Map();
    this.fullColumnIdData = {};
    this.loadTableData(this.data, true).then(function () {
      if (checkboxOpts.key) {
        _tools.UtilTools.warn('vxe.error.delProp', ['select-config.key', 'row-id']);
      } else if (treeConfig && treeOpts.key) {
        _tools.UtilTools.warn('vxe.error.delProp', ['tree-config.key', 'row-id']);
      } else if (editConfig && editConfig.key) {
        _tools.UtilTools.warn('vxe.error.delProp', ['edit-config.key', 'row-id']);
      }

      _this4.handleDefault();
    });

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);

    _tools.GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent);

    _tools.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);

    _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);

    _tools.GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent);

    this.preventEvent(null, 'created', {
      $table: this
    });
  },
  mounted: function mounted() {
    var _this5 = this;

    if (this.autoResize) {
      _tools.ResizeEvent.on(this, this.getParentElem(), function () {
        return _this5.recalculate(true);
      });
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

    if (_tools.ResizeEvent.off) {
      _tools.ResizeEvent.off(this, this.getParentElem());
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

    _tools.GlobalEvent.off(this, 'contextmenu');

    _tools.GlobalEvent.off(this, 'mousewheel');

    _tools.GlobalEvent.off(this, 'keydown');

    _tools.GlobalEvent.off(this, 'resize');

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
        headerHeight = this.headerHeight,
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
        't--animat': optimizeOpts.animat,
        't--stripe': stripe,
        't--border': border,
        't--selected': mouseConfig && mouseConfig.selected,
        't--checked': mouseConfig && mouseConfig.checked,
        'row--highlight': highlightHoverRow,
        'column--highlight': highlightHoverColumn,
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
      class: 'vxe-table--empty-placeholder',
      style: height ? null : {
        top: "".concat(headerHeight, "px")
      }
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
    }) : _e()])]);
  },
  methods: {
    getParentElem: function getParentElem() {
      return this.$grid ? this.$grid.$el.parentNode : this.$el.parentNode;
    },
    getParentHeight: function getParentHeight() {
      return this.$grid ? this.$grid.getParentHeight() : this.getParentElem().clientHeight;
    },

    /**
     * 获取需要排除的高度
     */
    getExcludeHeight: function getExcludeHeight() {
      return this.$grid ? this.$grid.getExcludeHeight() : 0;
    },
    clearAll: function clearAll() {
      this.clearSort();
      this.clearFilter();
      this.clearCurrentRow();
      this.clearCurrentColumn();
      this.clearSelection();
      this.clearSelectReserve();
      this.clearRowExpand();
      this.clearTreeExpand();
      this.clearChecked();
      this.clearSelected();
      this.clearActived();
      return this.clearScroll();
    },
    refreshData: function refreshData() {
      var _this6 = this;

      return this.$nextTick().then(function () {
        _this6.tableData = [];
        return _this6.$nextTick().then(function () {
          return _this6.loadTableData(_this6.tableFullData);
        });
      });
    },
    updateData: function updateData() {
      return this.handleTableData(true).then(this.updateFooter).then(this.recalculate);
    },
    handleTableData: function handleTableData(force) {
      var scrollYLoad = this.scrollYLoad,
          scrollYStore = this.scrollYStore;
      var fullData = force ? this.updateAfterFullData() : this.afterFullData;
      this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0);
      return this.$nextTick();
    },
    loadTableData: function loadTableData(datas, notRefresh) {
      var _this7 = this;

      var height = this.height,
          maxHeight = this.maxHeight,
          showOverflow = this.showOverflow,
          treeConfig = this.treeConfig,
          editStore = this.editStore,
          optimizeOpts = this.optimizeOpts,
          scrollYStore = this.scrollYStore;
      var scrollY = optimizeOpts.scrollY;
      var tableFullData = datas ? datas.slice(0) : [];
      var scrollYLoad = !treeConfig && scrollY && scrollY.gt && scrollY.gt < tableFullData.length;
      scrollYStore.startIndex = 0;
      scrollYStore.visibleIndex = 0;
      editStore.insertList = [];
      editStore.removeList = []; // 全量数据

      this.tableFullData = tableFullData; // 缓存数据

      this.updateCache(true); // 原始数据

      this.tableSynchData = datas;
      this.tableSourceData = _xeUtils.default.clone(tableFullData, true);
      this.scrollYLoad = scrollYLoad;

      if (scrollYLoad && !(height || maxHeight)) {
        _tools.UtilTools.error('vxe.error.scrollYReqProp', ['height | max-height']);
      }

      if (scrollYLoad && !showOverflow) {
        _tools.UtilTools.warn('vxe.error.scrollYReqProp', ['show-overflow']);
      }

      var rest = Promise.resolve();

      if (scrollYLoad) {
        rest = this.computeScrollLoad();
      }

      return rest.then(function () {
        // 是否加载了数据
        _this7.isLoadData = true;

        _this7.computeRowHeight();

        _this7.handleTableData(true);

        _this7.handleReserveStatus();

        _this7.checkSelectionStatus();

        rest = _this7.$nextTick();

        if (!notRefresh) {
          rest = rest.then(_this7.recalculate);
        }

        return rest.then(_this7.refreshScroll);
      });
    },
    loadData: function loadData(datas) {
      return this.loadTableData(datas);
    },
    reloadData: function reloadData(datas) {
      var _this8 = this;

      return this.clearAll().then(function () {
        return _this8.loadTableData(datas);
      }).then(this.handleDefault);
    },
    reloadRow: function reloadRow(row, record, field) {
      var tableSourceData = this.tableSourceData,
          tableData = this.tableData;
      var rowIndex = this.getRowIndex(row);
      var oRow = tableSourceData[rowIndex];

      if (oRow && row) {
        if (field) {
          _xeUtils.default.set(oRow, field, _xeUtils.default.get(record || row, field));
        } else {
          if (record) {
            tableSourceData[rowIndex] = record;

            _xeUtils.default.clear(row, undefined);

            Object.assign(row, this.defineField(Object.assign({}, record)));
            this.updateCache(true);
          } else {
            _xeUtils.default.destructuring(oRow, _xeUtils.default.clone(row, true));
          }
        }
      }

      this.tableData = tableData.slice(0);
      return this.$nextTick();
    },
    loadColumn: function loadColumn(columns) {
      var _this9 = this;

      this.collectColumn = _xeUtils.default.mapTree(columns, function (column) {
        return _cell.default.createColumn(_this9, column);
      }, headerProps);
      return this.$nextTick();
    },
    reloadColumn: function reloadColumn(columns) {
      this.clearAll();
      return this.loadColumn(columns);
    },
    // 更新数据的 Map
    updateCache: function updateCache(source) {
      var _this10 = this;

      var treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          tableFullData = this.tableFullData,
          fullDataRowIdData = this.fullDataRowIdData,
          fullDataRowMap = this.fullDataRowMap,
          fullAllDataRowMap = this.fullAllDataRowMap,
          fullAllDataRowIdData = this.fullAllDataRowIdData;

      var rowkey = _tools.UtilTools.getRowkey(this);

      var isLazy = treeConfig && treeOpts.lazy;

      var handleCache = function handleCache(row, index) {
        var rowid = _tools.UtilTools.getRowid(_this10, row);

        if (!rowid) {
          rowid = getRowUniqueId();

          _xeUtils.default.set(row, rowkey, rowid);
        }

        if (isLazy && row[treeOpts.hasChild] && _xeUtils.default.isUndefined(row[treeOpts.children])) {
          row[treeOpts.children] = null;
        }

        var rest = {
          row: row,
          rowid: rowid,
          index: index
        };

        if (source) {
          fullDataRowIdData[rowid] = rest;
          fullDataRowMap.set(row, rest);
        }

        fullAllDataRowIdData[rowid] = rest;
        fullAllDataRowMap.set(row, rest);
      };

      if (source) {
        fullDataRowIdData = this.fullDataRowIdData = {};
        fullDataRowMap.clear();
      }

      fullAllDataRowIdData = this.fullAllDataRowIdData = {};
      fullAllDataRowMap.clear();

      if (treeConfig) {
        _xeUtils.default.eachTree(tableFullData, handleCache, treeOpts);
      } else {
        tableFullData.forEach(handleCache);
      }
    },
    appendTreeCache: function appendTreeCache(row, childs) {
      var _this11 = this;

      var tableSourceData = this.tableSourceData,
          treeOpts = this.treeOpts,
          fullDataRowIdData = this.fullDataRowIdData,
          fullDataRowMap = this.fullDataRowMap,
          fullAllDataRowMap = this.fullAllDataRowMap,
          fullAllDataRowIdData = this.fullAllDataRowIdData;
      var children = treeOpts.children,
          hasChild = treeOpts.hasChild;

      var rowkey = _tools.UtilTools.getRowkey(this);

      var rowid = _tools.UtilTools.getRowid(this, row);

      var matchObj = _xeUtils.default.findTree(tableSourceData, function (item) {
        return rowid === _tools.UtilTools.getRowid(_this11, item);
      }, treeOpts);

      if (matchObj) {
        matchObj.item[children] = _xeUtils.default.clone(childs, true);
      }

      _xeUtils.default.eachTree(childs, function (row, index) {
        var rowid = _tools.UtilTools.getRowid(_this11, row);

        if (!rowid) {
          rowid = getRowUniqueId();

          _xeUtils.default.set(row, rowkey, rowid);
        }

        if (row[hasChild] && _xeUtils.default.isUndefined(row[children])) {
          row[children] = null;
        }

        var rest = {
          row: row,
          rowid: rowid,
          index: index
        };
        fullDataRowIdData[rowid] = rest;
        fullDataRowMap.set(row, rest);
        fullAllDataRowIdData[rowid] = rest;
        fullAllDataRowMap.set(row, rest);
      }, treeOpts);
    },
    // 更新列的 Map
    cacheColumnMap: function cacheColumnMap() {
      var isGroup = this.isGroup,
          tableFullColumn = this.tableFullColumn,
          collectColumn = this.collectColumn,
          fullColumnMap = this.fullColumnMap;
      var fullColumnIdData = this.fullColumnIdData = {};
      fullColumnMap.clear();

      if (isGroup) {
        _xeUtils.default.eachTree(collectColumn, function (column, index) {
          if (column.children && column.children.length) {
            var rest = {
              column: column,
              colid: column.id,
              index: index
            };
            fullColumnIdData[column.id] = rest;
            fullColumnMap.set(column, rest);
          }
        }, headerProps);
      }

      tableFullColumn.forEach(function (column, index) {
        var rest = {
          column: column,
          colid: column.id,
          index: index
        };
        fullColumnIdData[column.id] = rest;
        fullColumnMap.set(column, rest);
      }, headerProps);
    },
    getRowNode: function getRowNode(tr) {
      var _this12 = this;

      if (tr) {
        var treeConfig = this.treeConfig,
            treeOpts = this.treeOpts,
            tableFullData = this.tableFullData,
            fullAllDataRowIdData = this.fullAllDataRowIdData;
        var rowid = tr.getAttribute('data-rowid');

        if (treeConfig) {
          var matchObj = _xeUtils.default.findTree(tableFullData, function (row) {
            return _tools.UtilTools.getRowid(_this12, row) === rowid;
          }, treeOpts);

          if (matchObj) {
            return matchObj;
          }
        } else {
          if (fullAllDataRowIdData[rowid]) {
            var rest = fullAllDataRowIdData[rowid];
            return {
              item: rest.row,
              index: rest.index,
              items: tableFullData
            };
          }
        }
      }

      return null;
    },
    getColumnNode: function getColumnNode(cell) {
      if (cell) {
        var fullColumnIdData = this.fullColumnIdData,
            tableFullColumn = this.tableFullColumn;
        var colid = cell.getAttribute('data-colid');
        var _fullColumnIdData$col = fullColumnIdData[colid],
            column = _fullColumnIdData$col.column,
            index = _fullColumnIdData$col.index;
        return {
          item: column,
          index: index,
          items: tableFullColumn
        };
      }

      return null;
    },
    getRowIndex: function getRowIndex(row) {
      return this.fullDataRowMap.has(row) ? this.fullDataRowMap.get(row).index : -1;
    },

    /**
     * 根据 row 获取渲染中的虚拟索引
     * @param {Row} row 行对象
     */
    $getRowIndex: function $getRowIndex(row) {
      return this.afterFullData.indexOf(row);
    },
    getColumnMapIndex: function getColumnMapIndex(column) {
      return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1;
    },
    getColumnIndex: function getColumnIndex(column) {
      return this.getColumnMapIndex(column);
    },

    /**
    * 根据 column 获取渲染中的虚拟索引
    * @param {ColumnConfig} column 列配置
    */
    $getColumnIndex: function $getColumnIndex(column) {
      return this.visibleColumn.indexOf(column);
    },

    /**
     * 判断是否为索引列
     * @param {ColumnConfig} column 列配置
     */
    isSeqColumn: function isSeqColumn(column) {
      return column && (column.type === 'seq' || column.type === 'index');
    },
    insert: function insert(records) {
      return this.insertAt(records);
    },

    /**
     * 从指定行插入数据
     */
    insertAt: function insertAt(records, row) {
      var _this13 = this;

      var afterFullData = this.afterFullData,
          editStore = this.editStore,
          scrollYLoad = this.scrollYLoad,
          tableFullData = this.tableFullData,
          treeConfig = this.treeConfig;

      if (treeConfig) {
        throw new Error(_tools.UtilTools.getLog('vxe.error.noTree', ['insert']));
      }

      if (!_xeUtils.default.isArray(records)) {
        records = [records];
      }

      var nowData = afterFullData;
      var newRecords = records.map(function (record) {
        return _this13.defineField(Object.assign({}, record));
      });

      if (!row) {
        nowData.unshift.apply(nowData, newRecords);
        tableFullData.unshift.apply(tableFullData, newRecords);
      } else {
        if (row === -1) {
          nowData.push.apply(nowData, newRecords);
          tableFullData.push.apply(tableFullData, newRecords);
        } else {
          var targetIndex = nowData.indexOf(row);

          if (targetIndex === -1) {
            throw new Error(_tools.UtilTools.error('vxe.error.unableInsert'));
          }

          nowData.splice.apply(nowData, [targetIndex, 0].concat(newRecords));
          tableFullData.splice.apply(tableFullData, [tableFullData.indexOf(row), 0].concat(newRecords));
        }
      }

      [].unshift.apply(editStore.insertList, newRecords);
      this.handleTableData();
      this.updateCache();
      this.checkSelectionStatus();

      if (scrollYLoad) {
        this.updateScrollYSpace();
      }

      return this.$nextTick().then(function () {
        _this13.recalculate();

        return {
          row: newRecords.length ? newRecords[newRecords.length - 1] : null,
          rows: newRecords
        };
      });
    },
    defineField: function defineField(row) {
      var treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;

      var rowkey = _tools.UtilTools.getRowkey(this);

      this.visibleColumn.forEach(function (_ref) {
        var property = _ref.property,
            editRender = _ref.editRender;

        if (property && !_xeUtils.default.has(row, property)) {
          _xeUtils.default.set(row, property, editRender && !_xeUtils.default.isUndefined(editRender.defaultValue) ? editRender.defaultValue : null);
        }
      });

      if (treeConfig && treeOpts.lazy && _xeUtils.default.isUndefined(row[treeOpts.children])) {
        row[treeOpts.children] = null;
      } // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数


      if (!_xeUtils.default.get(row, rowkey)) {
        _xeUtils.default.set(row, rowkey, getRowUniqueId());
      }

      return row;
    },
    createData: function createData(records) {
      var _this14 = this;

      return this.$nextTick().then(function () {
        return records.map(_this14.defineField);
      });
    },
    createRow: function createRow(records) {
      var _this15 = this;

      var isArr = _xeUtils.default.isArray(records);

      if (!isArr) {
        records = [records];
      }

      return this.$nextTick().then(function () {
        var rows = records.map(function (record) {
          return _this15.defineField(Object.assign({}, record));
        });
        return isArr ? rows : rows[0];
      });
    },

    /**
     * 删除指定行数据
     * 如果传 row 则删除一行
     * 如果传 rows 则删除多行
     */
    remove: function remove(rows) {
      var _this16 = this;

      var afterFullData = this.afterFullData,
          tableFullData = this.tableFullData,
          editStore = this.editStore,
          treeConfig = this.treeConfig,
          checkboxOpts = this.checkboxOpts,
          selection = this.selection,
          hasInsertByRow = this.hasInsertByRow,
          scrollYLoad = this.scrollYLoad;
      var removeList = editStore.removeList,
          insertList = editStore.insertList;
      var property = checkboxOpts.checkField || checkboxOpts.checkProp;
      var rest = [];
      var nowData = afterFullData;

      if (treeConfig) {
        throw new Error(_tools.UtilTools.getLog('vxe.error.noTree', ['remove']));
      }

      if (!rows) {
        rows = tableFullData;
      } else if (!_xeUtils.default.isArray(rows)) {
        rows = [rows];
      } // 如果是新增，则保存记录


      rows.forEach(function (row) {
        if (!hasInsertByRow(row)) {
          removeList.push(row);
        }
      }); // 如果绑定了复选框属性，则更新状态

      if (!property) {
        _xeUtils.default.remove(selection, function (row) {
          return rows.indexOf(row) > -1;
        });
      } // 从数据源中移除


      if (tableFullData === rows) {
        rows = rest = tableFullData.slice(0);
        tableFullData.length = 0;
        nowData.length = 0;
      } else {
        rest = _xeUtils.default.remove(tableFullData, function (row) {
          return rows.indexOf(row) > -1;
        });

        _xeUtils.default.remove(nowData, function (row) {
          return rows.indexOf(row) > -1;
        });
      } // 从新增中移除已删除的数据


      _xeUtils.default.remove(insertList, function (row) {
        return rows.indexOf(row) > -1;
      });

      this.handleTableData();
      this.updateCache();
      this.checkSelectionStatus();

      if (scrollYLoad) {
        this.updateScrollYSpace();
      }

      return this.$nextTick().then(function () {
        _this16.recalculate();

        return {
          row: rest && rest.length ? rest[rest.length - 1] : null,
          rows: rest
        };
      });
    },

    /**
     * 删除选中数据
     */
    removeSelecteds: function removeSelecteds() {
      var _this17 = this;

      return this.remove(this.getSelectRecords()).then(function (params) {
        _this17.clearSelection();

        return params;
      });
    },
    revert: function revert() {
      _tools.UtilTools.warn('vxe.error.delFunc', ['revert', 'revertData']);

      return this.revertData.apply(this, arguments);
    },

    /**
     * 还原数据
     * 如果不传任何参数，则还原整个表格
     * 如果传 row 则还原一行
     * 如果传 rows 则还原多行
     * 如果还额外传了 field 则还原指定单元格
     */
    revertData: function revertData(rows, field) {
      var tableSourceData = this.tableSourceData,
          tableFullData = this.tableFullData;

      if (arguments.length) {
        if (rows && !_xeUtils.default.isArray(rows)) {
          rows = [rows];
        }

        rows.forEach(function (row) {
          var rowIndex = tableFullData.indexOf(row);
          var oRow = tableSourceData[rowIndex];

          if (oRow && row) {
            if (field) {
              _xeUtils.default.set(row, field, _xeUtils.default.get(oRow, field));
            } else {
              _xeUtils.default.destructuring(row, oRow);
            }
          }
        });
        return this.$nextTick();
      }

      return this.reloadData(tableSourceData);
    },

    /**
     * 清空单元格内容
     * 如果不创参数，则清空整个表格内容
     * 如果传 row 则清空一行内容
     * 如果传 rows 则清空多行内容
     * 如果还额外传了 field 则清空指定单元格内容
     */
    clearData: function clearData(rows, field) {
      var tableSourceData = this.tableSourceData,
          visibleColumn = this.visibleColumn;

      if (!arguments.length) {
        rows = tableSourceData;
      } else if (rows && !_xeUtils.default.isArray(rows)) {
        rows = [rows];
      }

      if (field) {
        rows.forEach(function (row) {
          return _xeUtils.default.set(row, field, null);
        });
      } else {
        rows.forEach(function (row) {
          visibleColumn.forEach(function (column) {
            if (column.property) {
              _tools.UtilTools.setCellValue(row, column, null);
            }
          });
        });
      }

      return this.$nextTick();
    },
    hasInsertByRow: function hasInsertByRow(row) {
      var treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          tableSourceData = this.tableSourceData;

      if (treeConfig) {
        return _xeUtils.default.findTree(tableSourceData, function (item) {
          return item === row;
        }, treeOpts);
      }

      return this.getRowIndex(row) === -1;
    },
    // 在 v3.0 中废弃 hasRowChange
    hasRowChange: function hasRowChange(row, field) {
      _tools.UtilTools.warn('vxe.error.delFunc', ['hasRowChange', 'isUpdateByRow']);

      return this.isUpdateByRow(row, field);
    },
    isUpdateByRow: function isUpdateByRow(row, field) {
      var _this18 = this;

      var oRow, property;
      var visibleColumn = this.visibleColumn,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          tableSourceData = this.tableSourceData,
          fullDataRowIdData = this.fullDataRowIdData;

      var rowid = _tools.UtilTools.getRowid(this, row); // 新增的数据不需要检测


      if (!fullDataRowIdData[rowid]) {
        return false;
      }

      if (treeConfig) {
        var children = treeOpts.children;

        var matchObj = _xeUtils.default.findTree(tableSourceData, function (item) {
          return rowid === _tools.UtilTools.getRowid(_this18, item);
        }, treeOpts);

        row = Object.assign({}, row, _defineProperty({}, children, null));

        if (matchObj) {
          oRow = Object.assign({}, matchObj.item, _defineProperty({}, children, null));
        }
      } else {
        var oRowIndex = fullDataRowIdData[rowid].index;
        oRow = tableSourceData[oRowIndex];
      }

      if (oRow) {
        if (arguments.length > 1) {
          return !_xeUtils.default.isEqual(_xeUtils.default.get(oRow, field), _xeUtils.default.get(row, field));
        }

        for (var index = 0, len = visibleColumn.length; index < len; index++) {
          property = visibleColumn[index].property;

          if (property && !_xeUtils.default.isEqual(_xeUtils.default.get(oRow, property), _xeUtils.default.get(row, property))) {
            return true;
          }
        }
      }

      return false;
    },

    /**
     * 获取表格所有列
     */
    getColumns: function getColumns(columnIndex) {
      var columns = this.visibleColumn;
      return arguments.length ? columns[columnIndex] : columns.slice(0);
    },
    getColid: function getColid(column) {
      var fullColumnMap = this.fullColumnMap;
      return fullColumnMap.has(column) ? fullColumnMap.get(column).colid : null;
    },
    getColumnById: function getColumnById(colid) {
      var fullColumnIdData = this.fullColumnIdData;
      return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null;
    },
    getColumnByField: function getColumnByField(field) {
      return _xeUtils.default.find(this.tableFullColumn, function (column) {
        return column.property === field;
      });
    },

    /**
     * 获取表格可视列
     */
    getTableColumn: function getTableColumn() {
      return {
        fullColumn: this.tableFullColumn.slice(0),
        visibleColumn: this.visibleColumn.slice(0),
        tableColumn: this.tableColumn.slice(0)
      };
    },
    // 在 v3.0 中废弃 getRecords
    getRecords: function getRecords() {
      _tools.UtilTools.warn('vxe.error.delFunc', ['getRecords', 'getData']);

      return this.getData.apply(this, arguments);
    },

    /**
     * 获取表格所有数据
     */
    getData: function getData(rowIndex) {
      var tableSynchData = this.data || this.tableSynchData;
      return arguments.length ? tableSynchData[rowIndex] : tableSynchData.slice(0);
    },
    // 在 v3.0 中废弃 getAllRecords
    getAllRecords: function getAllRecords() {
      _tools.UtilTools.warn('vxe.error.delFunc', ['getAllRecords', 'getRecordset']);

      return this.getRecordset();
    },

    /**
     * 获取表格数据集
     */
    getRecordset: function getRecordset() {
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      };
    },

    /**
     * 获取新增的临时数据
     */
    getInsertRecords: function getInsertRecords() {
      var insertList = this.editStore.insertList;
      var insertRecords = [];

      if (insertList.length) {
        this.tableFullData.forEach(function (row) {
          if (insertList.indexOf(row) > -1) {
            insertRecords.push(row);
          }
        });
      }

      return insertRecords;
    },

    /**
     * 获取已删除的数据
     */
    getRemoveRecords: function getRemoveRecords() {
      var removeList = this.editStore.removeList;
      var removeRecords = [];

      if (removeList.length) {
        this.tableFullData.forEach(function (row) {
          if (removeList.indexOf(row) > -1) {
            removeRecords.push(row);
          }
        });
      }

      return removeRecords;
    },

    /**
     * 获取选中数据
     */
    getSelectRecords: function getSelectRecords() {
      var tableFullData = this.tableFullData,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          checkboxOpts = this.checkboxOpts;
      var property = checkboxOpts.checkField;
      var rowList = [];

      if (property) {
        if (treeConfig) {
          rowList = _xeUtils.default.filterTree(tableFullData, function (row) {
            return _xeUtils.default.get(row, property);
          }, treeOpts);
        } else {
          rowList = tableFullData.filter(function (row) {
            return _xeUtils.default.get(row, property);
          });
        }
      } else {
        var selection = this.selection;

        if (treeConfig) {
          rowList = _xeUtils.default.filterTree(tableFullData, function (row) {
            return selection.indexOf(row) > -1;
          }, treeOpts);
        } else {
          rowList = tableFullData.filter(function (row) {
            return selection.indexOf(row) > -1;
          });
        }
      }

      return rowList;
    },

    /**
     * 获取更新数据
     * 只精准匹配 row 的更改
     * 如果是树表格，子节点更改状态不会影响父节点的更新状态
     */
    getUpdateRecords: function getUpdateRecords() {
      var tableFullData = this.tableFullData,
          isUpdateByRow = this.isUpdateByRow,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;

      if (treeConfig) {
        return _xeUtils.default.filterTree(tableFullData, function (row) {
          return isUpdateByRow(row);
        }, treeOpts);
      }

      return tableFullData.filter(function (row) {
        return isUpdateByRow(row);
      });
    },

    /**
     * 获取处理后全量的表格数据
     * 如果存在筛选条件，继续处理
     */
    updateAfterFullData: function updateAfterFullData() {
      var visibleColumn = this.visibleColumn,
          tableFullData = this.tableFullData,
          remoteSort = this.remoteSort,
          remoteFilter = this.remoteFilter,
          filterOpts = this.filterOpts,
          sortOpts = this.sortOpts;
      var tableData = tableFullData.slice(0);

      var column = _xeUtils.default.find(visibleColumn, function (column) {
        return column.order;
      });

      var filterColumns = [];
      visibleColumn.forEach(function (column) {
        if (column.filters && column.filters.length) {
          var valueList = [];
          var itemList = [];
          column.filters.forEach(function (item) {
            if (item.checked) {
              itemList.push(item);
              valueList.push(item.value);
            }
          });
          filterColumns.push({
            column: column,
            valueList: valueList,
            itemList: itemList
          });
        }
      });

      if (filterColumns.length) {
        tableData = tableData.filter(function (row) {
          return filterColumns.every(function (_ref2) {
            var column = _ref2.column,
                valueList = _ref2.valueList,
                itemList = _ref2.itemList;

            if (valueList.length && !(filterOpts.remote || remoteFilter)) {
              var filterRender = column.filterRender,
                  property = column.property,
                  filterMethod = column.filterMethod;
              var compConf = filterRender ? _vXETable.Renderer.get(filterRender.name) : null;

              if (!filterMethod && compConf && compConf.renderFilter) {
                filterMethod = compConf.filterMethod;
              }

              return filterMethod ? itemList.some(function (item) {
                return filterMethod({
                  value: item.value,
                  option: item,
                  row: row,
                  column: column
                });
              }) : valueList.indexOf(_xeUtils.default.get(row, property)) > -1;
            }

            return true;
          });
        });
      }

      if (column && column.order) {
        var allSortMethod = sortOpts.sortMethod || this.sortMethod;
        var isRemote = _xeUtils.default.isBoolean(column.remoteSort) ? column.remoteSort : sortOpts.remote || remoteSort;

        if (!isRemote) {
          if (allSortMethod) {
            tableData = allSortMethod({
              data: tableData,
              column: column,
              property: column.property,
              order: column.order,
              $table: this
            }) || tableData;
          } else {
            var rest = column.sortMethod ? tableData.sort(column.sortMethod) : _xeUtils.default.sortBy(tableData, column.property);
            tableData = column.order === 'desc' ? rest.reverse() : rest;
          }
        }
      }

      this.afterFullData = tableData;
      return tableData;
    },
    getRowById: function getRowById(rowid) {
      var fullDataRowIdData = this.fullDataRowIdData;
      return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null;
    },
    getRowid: function getRowid(row) {
      var fullAllDataRowMap = this.fullAllDataRowMap;
      return fullAllDataRowMap.has(row) ? fullAllDataRowMap.get(row).rowid : null;
    },

    /**
     * 获取处理后的表格数据
     * 如果存在筛选条件，继续处理
     * 如果存在排序，继续处理
     */
    getTableData: function getTableData() {
      var tableFullData = this.tableFullData,
          afterFullData = this.afterFullData,
          tableData = this.tableData,
          footerData = this.footerData;
      return {
        fullData: tableFullData.slice(0),
        visibleData: afterFullData.slice(0),
        tableData: tableData.slice(0),
        footerData: footerData.slice(0)
      };
    },
    handleDefault: function handleDefault() {
      // 在 v3.0 中废弃 selectConfig
      var checkboxConfig = this.checkboxConfig || this.selectConfig;

      if (checkboxConfig) {
        this.handleSelectionDefChecked();
      }

      if (this.radioConfig) {
        this.handleRadioDefChecked();
      }

      if (this.sortConfig) {
        this.handleDefaultSort();
      }

      if (this.expandConfig) {
        this.handleDefaultRowExpand();
      }

      if (this.treeConfig) {
        this.handleDefaultTreeExpand();
      }

      this.updateFooter();
      this.$nextTick(this.recalculate);
    },

    /**
     * 动态列处理
     */
    mergeCustomColumn: function mergeCustomColumn(customColumns) {
      this.isUpdateCustoms = true;
      this.tableFullColumn.forEach(function (column) {
        // 在 v3.0 中废弃 prop
        var item = _xeUtils.default.find(customColumns, function (item) {
          return column.property && (item.field || item.prop) === column.property;
        });

        if (item) {
          if (_xeUtils.default.isNumber(item.resizeWidth)) {
            column.resizeWidth = item.resizeWidth;
          }

          if (_xeUtils.default.isBoolean(item.visible)) {
            column.visible = item.visible;
          }
        }
      });
      this.$emit('update:customs', this.tableFullColumn);
    },
    resetAll: function resetAll() {
      this.resetCustoms();
      this.resetResizable();
    },
    hideColumn: function hideColumn(column) {
      return this.handleVisibleColumn(column, false);
    },
    showColumn: function showColumn(column) {
      return this.handleVisibleColumn(column, true);
    },
    resetCustoms: function resetCustoms() {
      return this.handleVisibleColumn();
    },
    handleVisibleColumn: function handleVisibleColumn(column, visible) {
      if (arguments.length) {
        column.visible = visible;
      } else {
        this.tableFullColumn.forEach(function (column) {
          column.visible = true;
        });
      }

      if (this.$toolbar) {
        this.$toolbar.handleCustoms();
      }

      return this.$nextTick();
    },

    /**
     * 初始化加载动态列
     */
    reloadCustoms: function reloadCustoms(customColumns) {
      var _this19 = this;

      return this.$nextTick().then(function () {
        _this19.mergeCustomColumn(customColumns);

        return _this19.refreshColumn().then(function () {
          return _this19.tableFullColumn;
        });
      });
    },

    /**
     * 刷新列信息
     * 将固定的列左边、右边分别靠边
     * 如果使用了分组表头，固定列必须在左侧或者右侧
     */
    refreshColumn: function refreshColumn() {
      var _this20 = this;

      var isColspan;
      var letIndex = 0;
      var leftList = [];
      var leftStartIndex = null;
      var rightEndIndex = null;
      var centerList = [];
      var rightList = [];
      var collectColumn = this.collectColumn,
          tableFullColumn = this.tableFullColumn,
          isGroup = this.isGroup,
          columnStore = this.columnStore,
          scrollXStore = this.scrollXStore,
          optimizeOpts = this.optimizeOpts;
      var scrollX = optimizeOpts.scrollX; // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏

      if (isGroup) {
        _xeUtils.default.eachTree(collectColumn, function (column) {
          if (column.children && column.children.length) {
            column.visible = !!_xeUtils.default.findTree(column.children, function (subColumn) {
              return subColumn.children && subColumn.children.length ? 0 : subColumn.visible;
            }, headerProps);
          }
        }, headerProps);
      } // 重新分配列


      tableFullColumn.filter(function (column) {
        return column.visible;
      }).forEach(function (column, columnIndex) {
        if (column.fixed === 'left') {
          if (leftStartIndex === null) {
            leftStartIndex = letIndex;
          }

          if (!isColspan) {
            if (columnIndex - letIndex !== 0) {
              isColspan = true;
            } else {
              letIndex++;
            }
          }

          leftList.push(column);
        } else if (column.fixed === 'right') {
          if (!isColspan) {
            if (rightEndIndex === null) {
              rightEndIndex = columnIndex;
            }

            if (columnIndex - rightEndIndex !== 0) {
              isColspan = true;
            } else {
              rightEndIndex++;
            }
          }

          rightList.push(column);
        } else {
          centerList.push(column);
        }
      });
      var visibleColumn = leftList.concat(centerList).concat(rightList);
      var scrollXLoad = scrollX && scrollX.gt && scrollX.gt < tableFullColumn.length;
      Object.assign(columnStore, {
        leftList: leftList,
        centerList: centerList,
        rightList: rightList
      });

      if (isGroup && (isColspan || leftStartIndex || rightEndIndex !== null && rightEndIndex !== visibleColumn.length)) {
        _tools.UtilTools.error('vxe.error.groupFixed');
      }

      if (scrollXLoad) {
        if (this.isGroup) {
          _tools.UtilTools.warn('vxe.error.scrollXNotGroup');
        } // if (this.resizable || visibleColumn.some(column => column.resizable)) {
        //   UtilTools.warn('vxe.error.scrollXNotResizable')
        // }


        scrollXStore.startIndex = 0;
        scrollXStore.visibleIndex = 0;
        visibleColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
      }

      this.scrollXLoad = scrollXLoad;
      this.tableColumn = visibleColumn;
      return this.$nextTick().then(function () {
        _this20.updateFooter();

        _this20.recalculate(true);
      });
    },

    /**
     * 指定列宽的列进行拆分
     */
    analyColumnWidth: function analyColumnWidth() {
      var columnWidth = this.columnWidth,
          columnMinWidth = this.columnMinWidth;
      var resizeList = [];
      var pxList = [];
      var pxMinList = [];
      var scaleList = [];
      var scaleMinList = [];
      var autoList = [];
      this.tableFullColumn.forEach(function (column) {
        if (columnWidth && !column.width) {
          column.width = columnWidth;
        }

        if (columnMinWidth && !column.minWidth) {
          column.minWidth = columnMinWidth;
        }

        if (column.visible) {
          if (column.resizeWidth) {
            resizeList.push(column);
          } else if (_tools.DomTools.isPx(column.width || columnWidth)) {
            pxList.push(column);
          } else if (_tools.DomTools.isScale(column.width || columnWidth)) {
            scaleList.push(column);
          } else if (_tools.DomTools.isPx(column.minWidth || columnMinWidth)) {
            pxMinList.push(column);
          } else if (_tools.DomTools.isScale(column.minWidth || columnMinWidth)) {
            scaleMinList.push(column);
          } else {
            autoList.push(column);
          }
        }
      });
      Object.assign(this.columnStore, {
        resizeList: resizeList,
        pxList: pxList,
        pxMinList: pxMinList,
        scaleList: scaleList,
        scaleMinList: scaleMinList,
        autoList: autoList
      });
    },

    /**
     * 刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）
     */
    refreshScroll: function refreshScroll() {
      var _this21 = this;

      var lastScrollLeft = this.lastScrollLeft,
          lastScrollTop = this.lastScrollTop;
      this.clearScroll();
      return this.$nextTick().then(function () {
        if (lastScrollLeft || lastScrollTop) {
          // 重置最后滚动状态
          _this21.lastScrollLeft = 0;
          _this21.lastScrollTop = 0; // 还原滚动状态

          return _this21.scrollTo(lastScrollLeft, lastScrollTop);
        }
      });
    },

    /**
     * 计算单元格列宽，动态分配可用剩余空间
     * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
     */
    recalculate: function recalculate(refull) {
      var _this22 = this;

      var _this$$refs = this.$refs,
          tableBody = _this$$refs.tableBody,
          tableHeader = _this$$refs.tableHeader,
          tableFooter = _this$$refs.tableFooter;
      var bodyElem = tableBody ? tableBody.$el : null;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;

      if (bodyElem) {
        var bodyWidth = bodyElem.clientWidth; // let tableWidth = this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth)

        this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth);

        if (refull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          return this.computeScrollLoad().then(function () {
            bodyWidth = bodyElem.clientWidth; // if (bodyWidth !== tableWidth) {

            _this22.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth); // }


            _this22.computeScrollLoad();
          });
        }
      }

      return this.computeScrollLoad();
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
    autoCellWidth: function autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth) {
      var meanWidth;
      var tableWidth = 0;
      var minCellWidth = 40; // 列宽最少限制 40px

      var remainWidth = bodyWidth;
      var fit = this.fit,
          columnStore = this.columnStore;
      var resizeList = columnStore.resizeList,
          pxMinList = columnStore.pxMinList,
          pxList = columnStore.pxList,
          scaleList = columnStore.scaleList,
          scaleMinList = columnStore.scaleMinList,
          autoList = columnStore.autoList; // 最小宽

      pxMinList.forEach(function (column) {
        var minWidth = parseInt(column.minWidth);
        tableWidth += minWidth;
        column.renderWidth = minWidth;
      }); // 最小百分比

      meanWidth = remainWidth / 100;
      scaleMinList.forEach(function (column) {
        var scaleWidth = Math.floor(parseInt(column.minWidth) * meanWidth);
        tableWidth += scaleWidth;
        column.renderWidth = scaleWidth;
      }); // 固定百分比

      scaleList.forEach(function (column) {
        var scaleWidth = Math.floor(parseInt(column.width) * meanWidth);
        tableWidth += scaleWidth;
        column.renderWidth = scaleWidth;
      }); // 固定宽

      pxList.forEach(function (column) {
        var width = parseInt(column.width);
        tableWidth += width;
        column.renderWidth = width;
      }); // 调整了列宽

      resizeList.forEach(function (column) {
        var width = parseInt(column.resizeWidth);
        tableWidth += width;
        column.renderWidth = width;
      });
      remainWidth -= tableWidth;
      meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)) : 0;

      if (fit) {
        if (remainWidth > 0) {
          scaleMinList.concat(pxMinList).forEach(function (column) {
            tableWidth += meanWidth;
            column.renderWidth += meanWidth;
          });
        }
      } else {
        meanWidth = minCellWidth;
      } // 自适应


      autoList.forEach(function (column, index) {
        var width = Math.max(meanWidth, minCellWidth);
        column.renderWidth = width;
        tableWidth += width;
      });

      if (fit) {
        /**
         * 偏移量算法
         * 如果所有列足够放的情况下，从最后动态列开始分配
         */
        var dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoList);
        var dynamicSize = dynamicList.length - 1;

        if (dynamicSize > 0) {
          var odiffer = bodyWidth - tableWidth;

          if (odiffer > 0) {
            while (odiffer > 0 && dynamicSize >= 0) {
              odiffer--;
              dynamicList[dynamicSize--].renderWidth++;
            }

            tableWidth = bodyWidth;
          }
        }
      }

      var tableHeight = bodyElem.offsetHeight;
      var overflowY = bodyElem.scrollHeight > bodyElem.clientHeight;
      this.scrollbarWidth = overflowY ? bodyElem.offsetWidth - bodyWidth : 0;
      this.overflowY = overflowY;
      this.tableWidth = tableWidth;
      this.tableHeight = tableHeight;
      this.parentHeight = this.getParentHeight();

      if (headerElem) {
        this.headerHeight = headerElem.offsetHeight;
      }

      if (footerElem) {
        var footerHeight = footerElem.offsetHeight;
        this.scrollbarHeight = Math.max(footerHeight - footerElem.clientHeight, 0);
        this.overflowX = tableWidth > footerElem.clientWidth;
        this.footerHeight = footerHeight;
      } else {
        this.scrollbarHeight = Math.max(tableHeight - bodyElem.clientHeight, 0);
        this.overflowX = tableWidth > bodyWidth;
      }

      if (this.overflowX) {
        this.checkScrolling();
      }

      return tableWidth;
    },
    resetResizable: function resetResizable() {
      this.visibleColumn.forEach(function (column) {
        column.resizeWidth = 0;
      });

      if (this.$toolbar) {
        this.$toolbar.resetResizable();
      }

      this.analyColumnWidth();
      return this.recalculate(true);
    },

    /**
     * 处理固定列的显示状态
     */
    checkScrolling: function checkScrolling() {
      var _this$$refs2 = this.$refs,
          tableBody = _this$$refs2.tableBody,
          leftBody = _this$$refs2.leftBody,
          rightBody = _this$$refs2.rightBody;
      var bodyElem = tableBody ? tableBody.$el : null;

      if (bodyElem) {
        if (leftBody) {
          this.scrollLeftToRight = bodyElem.scrollLeft > 0;
        }

        if (rightBody) {
          this.scrollRightToLeft = bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft;
        }
      }
    },
    preventEvent: function preventEvent(evnt, type, args, next, end) {
      var _this23 = this;

      var evntList = _vXETable.Interceptor.get(type);

      var rest;

      if (!evntList.some(function (func) {
        return func(args, evnt, _this23) === false;
      })) {
        if (next) {
          rest = next();
        }
      }

      if (end) {
        end();
      }

      return rest;
    },

    /**
     * 全局按下事件处理
     */
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var _this24 = this;

      var $el = this.$el,
          $refs = this.$refs,
          editStore = this.editStore,
          ctxMenuStore = this.ctxMenuStore,
          _this$editConfig = this.editConfig,
          editConfig = _this$editConfig === void 0 ? {} : _this$editConfig,
          filterStore = this.filterStore,
          getRowNode = this.getRowNode;
      var actived = editStore.actived;
      var filterWrapper = $refs.filterWrapper,
          validTip = $refs.validTip;

      if (filterWrapper) {
        if (_tools.DomTools.getEventTargetNode(evnt, this.$el, 'vxe-filter-wrapper').flag) {// 如果点击了筛选按钮
        } else if (_tools.DomTools.getEventTargetNode(evnt, filterWrapper.$el).flag) {// 如果点击筛选容器
        } else {
          this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter);
        }
      } // 如果已激活了编辑状态


      if (actived.row) {
        if (!(editConfig.autoClear === false)) {
          if (validTip && _tools.DomTools.getEventTargetNode(evnt, validTip.$el).flag) {// 如果是激活状态，且点击了校验提示框
          } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
            this.preventEvent(evnt, 'event.clearActived', actived.args, function () {
              var isClear;

              if (editConfig.mode === 'row') {
                var rowNode = _tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-body--row'); // row 方式，如果点击了不同行


                isClear = rowNode.flag ? getRowNode(rowNode.targetElem).item !== getRowNode(actived.args.cell.parentNode).item : 0;
              } else {
                // cell 方式，如果是非编辑列
                isClear = !_tools.DomTools.getEventTargetNode(evnt, $el, 'col--edit').flag;
              }

              if (isClear || // 如果点击了当前表格之外
              !_tools.DomTools.getEventTargetNode(evnt, _this24.$el).flag) {
                // this.triggerValidate('blur').then(a => {
                // 保证 input 的 change 事件能先触发之后再清除
                setTimeout(function () {
                  return _this24.clearActived(evnt);
                }); // }).catch(e => e)
              }
            });
          }
        }
      } // 如果配置了快捷菜单且，点击了其他地方则关闭


      if (ctxMenuStore.visible && this.$refs.ctxWrapper && !_tools.DomTools.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
        this.closeMenu();
      } // 最后激活的表格


      this.isActivated = _tools.DomTools.getEventTargetNode(evnt, (this.$grid || this).$el).flag;
    },

    /**
     * 窗口失焦事件处理
     */
    handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
      this.closeFilter();
      this.closeMenu();
    },

    /**
     * 全局滚动事件
     */
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      this.clostTooltip();
      this.closeMenu();
    },

    /**
     * 全局键盘事件
     */
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var _this25 = this;

      // 该行为只对当前激活的表格有效
      if (this.isActivated) {
        this.preventEvent(evnt, 'event.keydown', {
          $table: this
        }, function () {
          var params;
          var isCtxMenu = _this25.isCtxMenu,
              ctxMenuStore = _this25.ctxMenuStore,
              editStore = _this25.editStore,
              _this25$mouseConfig = _this25.mouseConfig,
              mouseConfig = _this25$mouseConfig === void 0 ? {} : _this25$mouseConfig,
              _this25$keyboardConfi = _this25.keyboardConfig,
              keyboardConfig = _this25$keyboardConfi === void 0 ? {} : _this25$keyboardConfi,
              treeConfig = _this25.treeConfig,
              treeOpts = _this25.treeOpts,
              highlightCurrentRow = _this25.highlightCurrentRow,
              currentRow = _this25.currentRow;
          var selected = editStore.selected,
              actived = editStore.actived;
          var keyCode = evnt.keyCode;
          var isBack = keyCode === 8;
          var isTab = keyCode === 9;
          var isEnter = keyCode === 13;
          var isEsc = keyCode === 27;
          var isSpacebar = keyCode === 32;
          var isLeftArrow = keyCode === 37;
          var isUpArrow = keyCode === 38;
          var isRightArrow = keyCode === 39;
          var isDwArrow = keyCode === 40;
          var isDel = keyCode === 46;
          var isC = keyCode === 67;
          var isV = keyCode === 86;
          var isX = keyCode === 88;
          var isF2 = keyCode === 113;
          var isCtrlKey = evnt.ctrlKey;
          var isShiftKey = evnt.shiftKey;
          var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
          var operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow);

          if (isEsc) {
            // 如果按下了 Esc 键，关闭快捷菜单、筛选
            _this25.closeMenu();

            _this25.closeFilter(); // 如果是激活编辑状态，则取消编辑


            if (actived.row) {
              params = actived.args;

              _this25.clearActived(evnt); // 如果配置了选中功能，则为选中状态


              if (mouseConfig.selected) {
                _this25.handleSelected(params, evnt);
              }
            }
          } else if (isSpacebar && (keyboardConfig.isArrow || keyboardConfig.isTab) && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'selection' || selected.column.type === 'radio')) {
            // 在 v3.0 中废弃 selection
            // 空格键支持选中复选列
            evnt.preventDefault(); // 在 v3.0 中废弃 selection

            if (selected.column.type === 'checkbox' || selected.column.type === 'selection') {
              _this25.handleToggleCheckRowEvent(selected.args, evnt);
            } else {
              _this25.triggerRadioRowEvent(evnt, selected.args);
            }
          } else if (isEnter && (keyboardConfig.isArrow || keyboardConfig.isTab) && (selected.row || actived.row || treeConfig && highlightCurrentRow && currentRow)) {
            // 如果是激活状态，退则出到下一行
            if (selected.row || actived.row) {
              _this25.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, isUpArrow, isRightArrow, true, evnt);
            } else if (treeConfig && highlightCurrentRow && currentRow) {
              // 如果是树形表格当前行回车移动到子节点
              var childrens = currentRow[treeOpts.children];

              if (childrens && childrens.length) {
                evnt.preventDefault();
                var targetRow = childrens[0];
                params = {
                  $table: _this25,
                  row: targetRow
                };

                _this25.setTreeExpansion(currentRow, true).then(function () {
                  return _this25.scrollToRow(targetRow);
                }).then(function () {
                  return _this25.triggerCurrentRowEvent(evnt, params);
                });
              }
            }
          } else if (operCtxMenu) {
            // 如果配置了右键菜单; 支持方向键操作、回车
            evnt.preventDefault();

            if (ctxMenuStore.showChild && _tools.UtilTools.hasChildrenList(ctxMenuStore.selected)) {
              _this25.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children);
            } else {
              _this25.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, _this25.ctxMenuList);
            }
          } else if (isF2) {
            // 如果按下了 F2 键
            if (selected.row && selected.column) {
              evnt.preventDefault();

              _this25.handleActived(selected.args, evnt);
            }
          } else if (operArrow && keyboardConfig.isArrow) {
            // 如果按下了方向键
            if (selected.row && selected.column) {
              _this25.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt);
            } else if ((isUpArrow || isDwArrow) && highlightCurrentRow && currentRow) {
              // 当前行按键上下移动
              _this25.moveCurrentRow(isUpArrow, isDwArrow, evnt);
            }
          } else if (isTab && keyboardConfig.isTab) {
            // 如果按下了 Tab 键切换
            if (selected.row || selected.column) {
              _this25.moveTabSelected(selected.args, isShiftKey, evnt);
            } else if (actived.row || actived.column) {
              _this25.moveTabSelected(actived.args, isShiftKey, evnt);
            }
          } else if (isDel || (treeConfig && highlightCurrentRow && currentRow ? isBack && keyboardConfig.isArrow : isBack)) {
            // 如果是删除键
            if (keyboardConfig.isDel && (selected.row || selected.column)) {
              _tools.UtilTools.setCellValue(selected.row, selected.column, null);

              if (isBack) {
                _this25.handleActived(selected.args, evnt);
              }
            } else if (isBack && keyboardConfig.isArrow && treeConfig && highlightCurrentRow && currentRow) {
              // 如果树形表格回退键关闭当前行返回父节点
              var _XEUtils$findTree = _xeUtils.default.findTree(_this25.afterFullData, function (item) {
                return item === currentRow;
              }, treeOpts),
                  parentRow = _XEUtils$findTree.parent;

              if (parentRow) {
                evnt.preventDefault();
                params = {
                  $table: _this25,
                  row: parentRow
                };

                _this25.setTreeExpansion(parentRow, false).then(function () {
                  return _this25.scrollToRow(parentRow);
                }).then(function () {
                  return _this25.triggerCurrentRowEvent(evnt, params);
                });
              }
            }
          } else if (keyboardConfig.isCut && isCtrlKey && (isX || isC || isV)) {
            // 如果开启复制功能
            if (isX || isC) {
              _this25.handleCopyed(isX, evnt);
            } else {
              _this25.handlePaste(evnt);
            }
          } else if (keyboardConfig.isEdit && !isCtrlKey && (keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222 || keyCode === 32)) {
            // 如果是按下非功能键之外允许直接编辑
            if (selected.row || selected.column) {
              if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
                _tools.UtilTools.setCellValue(selected.row, selected.column, null);

                _this25.handleActived(selected.args, evnt);
              }
            }
          }
        });
      }
    },
    // 处理 Tab 键移动
    moveTabSelected: function moveTabSelected(args, isLeft, evnt) {
      var afterFullData = this.afterFullData,
          visibleColumn = this.visibleColumn,
          editConfig = this.editConfig,
          isSeqColumn = this.isSeqColumn;
      var targetRow;
      var targetRowIndex;
      var targetColumn;
      var targetColumnIndex;
      var params = Object.assign({}, args);
      var rowIndex = afterFullData.indexOf(params.row);
      var columnIndex = visibleColumn.indexOf(params.column);
      evnt.preventDefault();

      if (isLeft) {
        // 向左
        for (var len = columnIndex - 1; len >= 0; len--) {
          if (!isSeqColumn(visibleColumn[len])) {
            targetColumnIndex = len;
            targetColumn = visibleColumn[len];
            break;
          }
        }

        if (!targetColumn && rowIndex > 0) {
          // 如果找不到从上一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex - 1;
          targetRow = afterFullData[targetRowIndex];

          for (var _len = visibleColumn.length - 1; _len >= 0; _len--) {
            if (!isSeqColumn(visibleColumn[_len])) {
              targetColumnIndex = _len;
              targetColumn = visibleColumn[_len];
              break;
            }
          }
        }
      } else {
        // 向右
        for (var index = columnIndex + 1; index < visibleColumn.length; index++) {
          if (!isSeqColumn(visibleColumn[index])) {
            targetColumnIndex = index;
            targetColumn = visibleColumn[index];
            break;
          }
        }

        if (!targetColumn && rowIndex < afterFullData.length - 1) {
          // 如果找不到从下一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
          targetRowIndex = rowIndex + 1;
          targetRow = afterFullData[targetRowIndex];

          for (var _index = 0; _index < visibleColumn.length; _index++) {
            if (!isSeqColumn(visibleColumn[_index])) {
              targetColumnIndex = _index;
              targetColumn = visibleColumn[_index];
              break;
            }
          }
        }
      }

      if (targetColumn) {
        if (targetRow) {
          params.rowIndex = targetRowIndex;
          params.row = targetRow;
        } else {
          params.rowIndex = rowIndex;
        }

        params.columnIndex = targetColumnIndex;
        params.column = targetColumn;
        params.cell = _tools.DomTools.getCell(this, params);

        if (editConfig) {
          if (editConfig.trigger === 'click' || editConfig.trigger === 'dblclick') {
            if (editConfig.mode === 'row') {
              this.handleActived(params, evnt);
            } else {
              this.handleSelected(params, evnt);
              this.scrollToRow(params.row, params.column);
            }
          }
        }
      }
    },
    // 处理当前行方向键移动
    moveCurrentRow: function moveCurrentRow(isUpArrow, isDwArrow, evnt) {
      var _this26 = this;

      var currentRow = this.currentRow,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          afterFullData = this.afterFullData;
      var targetRow;
      evnt.preventDefault();

      if (treeConfig) {
        var _XEUtils$findTree2 = _xeUtils.default.findTree(afterFullData, function (item) {
          return item === currentRow;
        }, treeOpts),
            index = _XEUtils$findTree2.index,
            items = _XEUtils$findTree2.items;

        if (isUpArrow && index > 0) {
          targetRow = items[index - 1];
        } else if (isDwArrow && index < items.length - 1) {
          targetRow = items[index + 1];
        }
      } else {
        var rowIndex = afterFullData.indexOf(currentRow);

        if (isUpArrow && rowIndex > 0) {
          targetRow = afterFullData[rowIndex - 1];
        } else if (isDwArrow && rowIndex < afterFullData.length - 1) {
          targetRow = afterFullData[rowIndex + 1];
        }
      }

      if (targetRow) {
        var params = {
          $table: this,
          row: targetRow
        };
        this.scrollToRow(targetRow).then(function () {
          return _this26.triggerCurrentRowEvent(evnt, params);
        });
      }
    },
    // 处理方向键移动
    moveSelected: function moveSelected(args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      var afterFullData = this.afterFullData,
          visibleColumn = this.visibleColumn;
      var params = Object.assign({}, args);
      evnt.preventDefault();

      if (isUpArrow && params.rowIndex) {
        params.rowIndex -= 1;
        params.row = afterFullData[params.rowIndex];
      } else if (isDwArrow && params.rowIndex < afterFullData.length - 1) {
        params.rowIndex += 1;
        params.row = afterFullData[params.rowIndex];
      } else if (isLeftArrow && params.columnIndex) {
        for (var len = params.columnIndex - 1; len >= 0; len--) {
          if (visibleColumn[len].editRender) {
            params.columnIndex = len;
            params.column = visibleColumn[len];
            break;
          }
        }
      } else if (isRightArrow && params.columnIndex) {
        for (var index = params.columnIndex + 1; index < visibleColumn.length; index++) {
          if (visibleColumn[index].editRender) {
            params.columnIndex = index;
            params.column = visibleColumn[index];
            break;
          }
        }
      }

      params.cell = _tools.DomTools.getCell(this, params);
      this.handleSelected(params, evnt);
      this.scrollToRow(params.row, params.column);
    },
    // 处理菜单的移动
    moveCtxMenu: function moveCtxMenu(evnt, keyCode, ctxMenuStore, property, operKey, operRest, menuList) {
      var selectItem;

      var selectIndex = _xeUtils.default.findIndexOf(menuList, function (item) {
        return ctxMenuStore[property] === item;
      });

      if (keyCode === operKey) {
        if (operRest && _tools.UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          ctxMenuStore.showChild = true;
        } else {
          ctxMenuStore.showChild = false;
          ctxMenuStore.selectChild = null;
        }
      } else if (keyCode === 38) {
        for (var len = selectIndex - 1; len >= 0; len--) {
          if (menuList[len].visible !== false) {
            selectItem = menuList[len];
            break;
          }
        }

        ctxMenuStore[property] = selectItem || menuList[menuList.length - 1];
      } else if (keyCode === 40) {
        for (var index = selectIndex + 1; index < menuList.length; index++) {
          if (menuList[index].visible !== false) {
            selectItem = menuList[index];
            break;
          }
        }

        ctxMenuStore[property] = selectItem || menuList[0];
      } else if (ctxMenuStore[property] && (keyCode === 13 || keyCode === 32)) {
        this.ctxMenuLinkEvent(evnt, ctxMenuStore[property]);
      }
    },
    handleGlobalResizeEvent: function handleGlobalResizeEvent() {
      this.recalculate();
    },

    /**
     * 快捷菜单事件处理
     */
    handleGlobalContextmenuEvent: function handleGlobalContextmenuEvent(evnt) {
      var isCtxMenu = this.isCtxMenu,
          ctxMenuStore = this.ctxMenuStore,
          ctxMenuOpts = this.ctxMenuOpts;
      var layoutList = ['header', 'body', 'footer'];

      if (isCtxMenu) {
        if (ctxMenuStore.visible) {
          if (ctxMenuStore.visible && this.$refs.ctxWrapper && _tools.DomTools.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
            evnt.preventDefault();
            return;
          }
        }

        for (var index = 0; index < layoutList.length; index++) {
          var layout = layoutList[index];

          var columnTargetNode = _tools.DomTools.getEventTargetNode(evnt, this.$el, "vxe-".concat(layout, "--column"));

          var params = {
            type: layout,
            $table: this,
            columns: this.visibleColumn.slice(0)
          };

          if (columnTargetNode.flag) {
            var cell = columnTargetNode.targetElem;
            var column = this.getColumnNode(cell).item;
            var typePrefix = "".concat(layout, "-");
            Object.assign(params, {
              column: column,
              columnIndex: this.getColumnIndex(column),
              cell: cell
            });

            if (layout === 'body') {
              var row = this.getRowNode(cell.parentNode).item;
              typePrefix = '';
              params.row = row;
              params.rowIndex = this.getRowIndex(row);
            }

            this.openContextMenu(evnt, layout, params);

            _tools.UtilTools.emitEvent(this, "".concat(typePrefix, "cell-context-menu"), [params, evnt]);

            return;
          } else if (_tools.DomTools.getEventTargetNode(evnt, this.$el, "vxe-table--".concat(layout, "-wrapper")).flag) {
            if (ctxMenuOpts.trigger === 'cell') {
              evnt.preventDefault();
            } else {
              this.openContextMenu(evnt, layout, params);
            }

            return;
          }
        }
      }

      this.closeMenu();
      this.closeFilter();
    },

    /**
     * 显示快捷菜单
     */
    openContextMenu: function openContextMenu(evnt, type, params) {
      var _this27 = this;

      var ctxMenuStore = this.ctxMenuStore,
          ctxMenuOpts = this.ctxMenuOpts;
      var config = ctxMenuOpts[type];

      if (config) {
        var options = config.options,
            disabled = config.disabled;
        var visibleMethod = config.visibleMethod || ctxMenuOpts.visibleMethod;

        if (disabled) {
          evnt.preventDefault();
        } else if (options && options.length) {
          params.options = options;
          this.preventEvent(evnt, 'event.showMenu', params, null, function () {
            if (!visibleMethod || visibleMethod(params, evnt)) {
              evnt.preventDefault();

              _this27.updateZindex();

              var _DomTools$getDomNode = _tools.DomTools.getDomNode(),
                  scrollTop = _DomTools$getDomNode.scrollTop,
                  scrollLeft = _DomTools$getDomNode.scrollLeft,
                  visibleHeight = _DomTools$getDomNode.visibleHeight,
                  visibleWidth = _DomTools$getDomNode.visibleWidth;

              var top = evnt.clientY + scrollTop;
              var left = evnt.clientX + scrollLeft;
              Object.assign(ctxMenuStore, {
                args: params,
                visible: true,
                list: options,
                selected: null,
                selectChild: null,
                showChild: false,
                style: {
                  zIndex: _this27.tZindex,
                  top: "".concat(top, "px"),
                  left: "".concat(left, "px")
                }
              });

              _this27.$nextTick(function () {
                var ctxElem = _this27.$refs.ctxWrapper.$el;
                var clientHeight = ctxElem.clientHeight;
                var clientWidth = ctxElem.clientWidth;
                var offsetTop = evnt.clientY + clientHeight - visibleHeight;
                var offsetLeft = evnt.clientX + clientWidth - visibleWidth;

                if (offsetTop > -10) {
                  ctxMenuStore.style.top = "".concat(top - clientHeight, "px");
                }

                if (offsetLeft > -10) {
                  ctxMenuStore.style.left = "".concat(left - clientWidth, "px");
                }
              });
            } else {
              _this27.closeMenu();
            }
          });
        }
      }

      this.closeFilter();
    },

    /**
     * 关闭快捷菜单
     */
    closeMenu: function closeMenu() {
      Object.assign(this.ctxMenuStore, {
        visible: false,
        selected: null,
        selectChild: null,
        showChild: false
      });
      return this.$nextTick();
    },
    ctxMenuMouseoverEvent: function ctxMenuMouseoverEvent(evnt, item, child) {
      var ctxMenuStore = this.ctxMenuStore;
      evnt.preventDefault();
      evnt.stopPropagation();
      ctxMenuStore.selected = item;
      ctxMenuStore.selectChild = child;

      if (!child) {
        ctxMenuStore.showChild = _tools.UtilTools.hasChildrenList(item);
      }
    },
    ctxMenuMouseoutEvent: function ctxMenuMouseoutEvent(evnt, item, child) {
      var ctxMenuStore = this.ctxMenuStore;

      if (!item.children) {
        ctxMenuStore.selected = null;
      }

      ctxMenuStore.selectChild = null;
    },

    /**
     * 快捷菜单点击事件
     */
    ctxMenuLinkEvent: function ctxMenuLinkEvent(evnt, menu) {
      if (!menu.disabled && (!menu.children || !menu.children.length)) {
        var ctxMenuMethod = _vXETable.Menus.get(menu.code);

        var params = Object.assign({
          menu: menu,
          $table: this
        }, this.ctxMenuStore.args);

        if (ctxMenuMethod) {
          ctxMenuMethod.call(this, params, evnt);
        }

        _tools.UtilTools.emitEvent(this, 'context-menu-click', [Object.assign({
          menu: menu,
          $table: this
        }, this.ctxMenuStore.args), evnt]);

        this.closeMenu();
      }
    },
    handleTooltipLeaveEvent: function handleTooltipLeaveEvent(evnt) {
      var _this28 = this;

      var tooltipOpts = this.tooltipOpts;
      setTimeout(function () {
        if (!_this28.tooltipActive) {
          _this28.clostTooltip();
        }
      }, tooltipOpts.leaveDelay);
    },
    handleTargetEnterEvent: function handleTargetEnterEvent(evnt) {
      clearTimeout(this.tooltipTimeout);
      this.tooltipActive = true;
      this.clostTooltip();
    },
    handleTargetLeaveEvent: function handleTargetLeaveEvent(evnt) {
      var _this29 = this;

      var tooltipOpts = this.tooltipOpts;
      this.tooltipActive = false;

      if (tooltipOpts.enterable) {
        this.tooltipTimeout = setTimeout(function () {
          if (!_this29.$refs.tooltip.isHover) {
            _this29.clostTooltip();
          }
        }, tooltipOpts.leaveDelay);
      } else {
        this.clostTooltip();
      }
    },

    /**
     * 触发表头 tooltip 事件
     */
    triggerHeaderTooltipEvent: function triggerHeaderTooltipEvent(evnt, params) {
      var tooltipStore = this.tooltipStore;
      var column = params.column;
      this.handleTargetEnterEvent();

      if (tooltipStore.column !== column || !tooltipStore.visible) {
        this.handleTooltip(evnt, column);
      }
    },

    /**
     * 触发表尾 tooltip 事件
     */
    triggerFooterTooltipEvent: function triggerFooterTooltipEvent(evnt, params) {
      var column = params.column;
      var tooltipStore = this.tooltipStore;
      this.handleTargetEnterEvent();

      if (tooltipStore.column !== column || !tooltipStore.visible) {
        this.handleTooltip(evnt, column);
      }
    },

    /**
     * 触发 tooltip 事件
     */
    triggerTooltipEvent: function triggerTooltipEvent(evnt, params) {
      var editConfig = this.editConfig,
          editStore = this.editStore,
          tooltipStore = this.tooltipStore;
      var actived = editStore.actived;
      var row = params.row,
          column = params.column;
      this.handleTargetEnterEvent();

      if (editConfig) {
        if (editConfig.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {
          return;
        }
      }

      if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
        this.handleTooltip(evnt, column, row);
      }
    },
    // 显示 tooltip
    handleTooltip: function handleTooltip(evnt, column, row) {
      var cell = evnt.currentTarget;
      var tooltip = this.$refs.tooltip;
      var wrapperElem = cell.children[0];
      var content = cell.innerText;

      if (content && wrapperElem.scrollWidth > wrapperElem.clientWidth) {
        Object.assign(this.tooltipStore, {
          row: row,
          column: column,
          visible: true
        });

        if (tooltip) {
          tooltip.toVisible(cell, content);
        }
      }

      return this.$nextTick();
    },
    // 关闭 tooltip
    clostTooltip: function clostTooltip() {
      var tooltip = this.$refs.tooltip;
      Object.assign(this.tooltipStore, {
        row: null,
        column: null,
        content: null,
        visible: false
      });

      if (tooltip) {
        tooltip.close();
      }

      return this.$nextTick();
    },

    /**
     * 处理复选框默认勾选
     */
    handleSelectionDefChecked: function handleSelectionDefChecked() {
      var fullDataRowIdData = this.fullDataRowIdData,
          checkboxOpts = this.checkboxOpts;
      var checkAll = checkboxOpts.checkAll,
          checkRowKeys = checkboxOpts.checkRowKeys;

      if (checkAll) {
        this.setAllSelection(true);
      } else if (checkRowKeys) {
        var defSelection = [];
        checkRowKeys.forEach(function (rowid) {
          if (fullDataRowIdData[rowid]) {
            defSelection.push(fullDataRowIdData[rowid].row);
          }
        });
        this.setSelection(defSelection, true);
      }
    },
    setSelection: function setSelection(rows, value) {
      var _this30 = this;

      if (rows && !_xeUtils.default.isArray(rows)) {
        rows = [rows];
      }

      rows.forEach(function (row) {
        return _this30.handleSelectRow(null, {
          row: row
        }, !!value);
      });
      return this.$nextTick();
    },
    isCheckedByRow: function isCheckedByRow(row) {
      var property = this.checkboxOpts.checkField;

      if (property) {
        return _xeUtils.default.get(row, property);
      }

      return this.selection.indexOf(row) > -1;
    },

    /**
     * 多选，行选中处理
     * value 选中true 不选false 不确定-1
     */
    handleSelectRow: function handleSelectRow(evnt, _ref3, value) {
      var _this31 = this;

      var row = _ref3.row;
      var selection = this.selection,
          tableFullData = this.tableFullData,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          treeIndeterminates = this.treeIndeterminates,
          checkboxOpts = this.checkboxOpts;
      var checkStrictly = checkboxOpts.checkStrictly,
          checkMethod = checkboxOpts.checkMethod;
      var property = checkboxOpts.checkField || checkboxOpts.checkProp;

      if (property) {
        if (treeConfig && !checkStrictly) {
          if (value === -1) {
            treeIndeterminates.push(row);

            _xeUtils.default.set(row, property, false);
          } else {
            // 更新子节点状态
            _xeUtils.default.eachTree([row], function (item, $rowIndex) {
              if (row === item || !checkMethod || checkMethod({
                row: item,
                $rowIndex: $rowIndex
              })) {
                _xeUtils.default.set(item, property, value);

                _this31.handleSelectReserveRow(row, value);
              }
            }, treeOpts);

            _xeUtils.default.remove(treeIndeterminates, function (item) {
              return item === row;
            });
          } // 如果存在父节点，更新父节点状态


          var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
            return item === row;
          }, treeOpts);

          if (matchObj && matchObj.parent) {
            var parentStatus;
            var vItems = checkMethod ? matchObj.items.filter(function (item, $rowIndex) {
              return checkMethod({
                row: item,
                $rowIndex: $rowIndex
              });
            }) : matchObj.items;

            var indeterminatesItem = _xeUtils.default.find(matchObj.items, function (item) {
              return treeIndeterminates.indexOf(item) > -1;
            });

            if (indeterminatesItem) {
              parentStatus = -1;
            } else {
              var selectItems = matchObj.items.filter(function (item) {
                return _xeUtils.default.get(item, property);
              });
              parentStatus = selectItems.filter(function (item) {
                return vItems.indexOf(item) > -1;
              }).length === vItems.length ? true : selectItems.length || value === -1 ? -1 : false;
            }

            return this.handleSelectRow(evnt, {
              row: matchObj.parent
            }, parentStatus);
          }
        } else {
          _xeUtils.default.set(row, property, value);

          this.handleSelectReserveRow(row, value);
        }
      } else {
        if (treeConfig && !checkStrictly) {
          if (value === -1) {
            treeIndeterminates.push(row);

            _xeUtils.default.remove(selection, function (item) {
              return item === row;
            });
          } else {
            // 更新子节点状态
            _xeUtils.default.eachTree([row], function (item, $rowIndex) {
              if (row === item || !checkMethod || checkMethod({
                row: item,
                $rowIndex: $rowIndex
              })) {
                if (value) {
                  selection.push(item);
                } else {
                  _xeUtils.default.remove(selection, function (select) {
                    return select === item;
                  });
                }

                _this31.handleSelectReserveRow(row, value);
              }
            }, treeOpts);

            _xeUtils.default.remove(treeIndeterminates, function (item) {
              return item === row;
            });
          } // 如果存在父节点，更新父节点状态


          var _matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
            return item === row;
          }, treeOpts);

          if (_matchObj && _matchObj.parent) {
            var _parentStatus;

            var _vItems = checkMethod ? _matchObj.items.filter(function (item, $rowIndex) {
              return checkMethod({
                row: item,
                $rowIndex: $rowIndex
              });
            }) : _matchObj.items;

            var _indeterminatesItem = _xeUtils.default.find(_matchObj.items, function (item) {
              return treeIndeterminates.indexOf(item) > -1;
            });

            if (_indeterminatesItem) {
              _parentStatus = -1;
            } else {
              var _selectItems = _matchObj.items.filter(function (item) {
                return selection.indexOf(item) > -1;
              });

              _parentStatus = _selectItems.filter(function (item) {
                return _vItems.indexOf(item) > -1;
              }).length === _vItems.length ? true : _selectItems.length || value === -1 ? -1 : false;
            }

            return this.handleSelectRow(evnt, {
              row: _matchObj.parent
            }, _parentStatus);
          }
        } else {
          if (value) {
            if (selection.indexOf(row) === -1) {
              selection.push(row);
            }
          } else {
            _xeUtils.default.remove(selection, function (item) {
              return item === row;
            });
          }

          this.handleSelectReserveRow(row, value);
        }
      }

      this.checkSelectionStatus();
    },
    handleToggleCheckRowEvent: function handleToggleCheckRowEvent(params, evnt) {
      var selection = this.selection,
          checkboxOpts = this.checkboxOpts;
      var property = checkboxOpts.checkField;
      var row = params.row;
      var value = property ? !_xeUtils.default.get(row, property) : selection.indexOf(row) === -1;

      if (evnt) {
        this.triggerCheckRowEvent(evnt, params, value);
      } else {
        this.handleSelectRow(null, params, value);
      }
    },
    triggerCheckRowEvent: function triggerCheckRowEvent(evnt, params, value) {
      var checkMethod = this.checkboxOpts.checkMethod;

      if (!checkMethod || checkMethod({
        row: params.row,
        rowIndex: params.rowIndex,
        $rowIndex: params.$rowIndex
      })) {
        this.handleSelectRow(evnt, params, value);

        _tools.UtilTools.emitEvent(this, 'select-change', [Object.assign({
          selection: this.getSelectRecords(),
          reserves: this.getSelectReserveRecords(),
          checked: value,
          $table: this
        }, params), evnt]);
      }
    },

    /**
     * 多选，切换某一行的选中状态
     */
    toggleRowSelection: function toggleRowSelection(row) {
      this.handleToggleCheckRowEvent({
        row: row
      });
      return this.$nextTick();
    },
    setAllSelection: function setAllSelection(value) {
      var _this32 = this;

      var tableFullData = this.tableFullData,
          editStore = this.editStore,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          selection = this.selection,
          selectReserveRowMap = this.selectReserveRowMap,
          checkboxOpts = this.checkboxOpts;
      var reserve = checkboxOpts.reserve,
          checkStrictly = checkboxOpts.checkStrictly,
          checkMethod = checkboxOpts.checkMethod;
      var insertList = editStore.insertList;
      var property = checkboxOpts.checkField || checkboxOpts.checkProp;
      var selectRows = []; // 包含新增的数据

      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList);
      }

      if (!checkStrictly) {
        if (property) {
          var indexKey = "".concat(treeConfig ? '$' : '', "rowIndex");

          var setValFn = function setValFn(row, rowIndex) {
            var _checkMethod;

            if (!checkMethod || checkMethod((_checkMethod = {
              row: row
            }, _defineProperty(_checkMethod, indexKey, rowIndex), _defineProperty(_checkMethod, "$rowIndex", rowIndex), _checkMethod))) {
              _xeUtils.default.set(row, property, value);
            }
          };

          var clearValFn = function clearValFn(row, rowIndex) {
            var _checkMethod2;

            if (!checkMethod || (checkMethod((_checkMethod2 = {
              row: row
            }, _defineProperty(_checkMethod2, indexKey, rowIndex), _defineProperty(_checkMethod2, "$rowIndex", rowIndex), _checkMethod2)) ? 0 : selection.indexOf(row) > -1)) {
              _xeUtils.default.set(row, property, value);
            }
          };

          if (treeConfig) {
            _xeUtils.default.eachTree(tableFullData, value ? setValFn : clearValFn, treeOpts);
          } else {
            tableFullData.forEach(value ? setValFn : clearValFn);
          }
        } else {
          if (treeConfig) {
            if (value) {
              _xeUtils.default.eachTree(tableFullData, function (row, $rowIndex) {
                if (!checkMethod || checkMethod({
                  row: row,
                  $rowIndex: $rowIndex
                })) {
                  selectRows.push(row);
                }
              }, treeOpts);
            } else {
              if (checkMethod) {
                _xeUtils.default.eachTree(tableFullData, function (row, $rowIndex) {
                  if (checkMethod({
                    row: row,
                    $rowIndex: $rowIndex
                  }) ? 0 : selection.indexOf(row) > -1) {
                    selectRows.push(row);
                  }
                }, treeOpts);
              }
            }
          } else {
            if (value) {
              if (checkMethod) {
                selectRows = tableFullData.filter(function (row, rowIndex) {
                  return selection.indexOf(row) > -1 || checkMethod({
                    row: row,
                    rowIndex: rowIndex,
                    $rowIndex: rowIndex
                  });
                });
              } else {
                selectRows = tableFullData.slice(0);
              }
            } else {
              if (checkMethod) {
                selectRows = tableFullData.filter(function (row, rowIndex) {
                  return checkMethod({
                    row: row,
                    rowIndex: rowIndex,
                    $rowIndex: rowIndex
                  }) ? 0 : selection.indexOf(row) > -1;
                });
              }
            }
          }
        }

        if (reserve) {
          if (value) {
            selectRows.forEach(function (row) {
              selectReserveRowMap[_tools.UtilTools.getRowid(_this32, row)] = row;
            });
          } else {
            tableFullData.forEach(function (row) {
              var rowid = _tools.UtilTools.getRowid(_this32, row);

              if (selectReserveRowMap[rowid]) {
                delete selectReserveRowMap[rowid];
              }
            });
          }
        }

        this.selection = selectRows;
      }

      this.treeIndeterminates = [];
      this.checkSelectionStatus();
    },
    checkSelectionStatus: function checkSelectionStatus() {
      var tableFullData = this.tableFullData,
          editStore = this.editStore,
          selection = this.selection,
          treeIndeterminates = this.treeIndeterminates,
          checkboxOpts = this.checkboxOpts;
      var checkStrictly = checkboxOpts.checkStrictly,
          checkMethod = checkboxOpts.checkMethod;
      var property = checkboxOpts.checkField || checkboxOpts.checkProp;
      var insertList = editStore.insertList; // 包含新增的数据

      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList);
      }

      if (!checkStrictly) {
        if (property) {
          this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
            return !checkMethod({
              row: row,
              rowIndex: rowIndex,
              $rowIndex: rowIndex
            }) || _xeUtils.default.get(row, property);
          } : function (row) {
            return _xeUtils.default.get(row, property);
          });
          this.isIndeterminate = !this.isAllSelected && tableFullData.some(function (row) {
            return _xeUtils.default.get(row, property) || treeIndeterminates.indexOf(row) > -1;
          });
        } else {
          this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
            return !checkMethod({
              row: row,
              rowIndex: rowIndex,
              $rowIndex: rowIndex
            }) || selection.indexOf(row) > -1;
          } : function (row) {
            return selection.indexOf(row) > -1;
          });
          this.isIndeterminate = !this.isAllSelected && tableFullData.some(function (row) {
            return treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1;
          });
        }
      }
    },
    // 还原展开、选中等相关状态
    handleReserveStatus: function handleReserveStatus() {
      var rowId = this.rowId,
          treeConfig = this.treeConfig,
          fullDataRowIdData = this.fullDataRowIdData,
          selectReserveRowMap = this.selectReserveRowMap,
          checkboxOpts = this.checkboxOpts;
      var reserveSelection = [];
      var reserveRowExpandeds = [];
      var reserveTreeExpandeds = [];
      var reserveTreeIndeterminates = []; // 复选框

      if (rowId) {
        this.handleReserveByRowid(this.selection, reserveSelection);
      }

      if (checkboxOpts.reserve) {
        Object.keys(selectReserveRowMap).forEach(function (rowid) {
          if (fullDataRowIdData[rowid] && reserveSelection.indexOf(fullDataRowIdData[rowid].row) === -1) {
            reserveSelection.push(fullDataRowIdData[rowid].row);
          }
        });
      }

      this.selection = reserveSelection; // 行展开

      if (rowId) {
        this.handleReserveByRowid(this.rowExpandeds, reserveRowExpandeds);
      }

      this.rowExpandeds = reserveRowExpandeds; // 树展开

      if (rowId && treeConfig) {
        this.handleReserveByRowid(this.treeIndeterminates, reserveTreeIndeterminates);
        this.handleReserveByRowid(this.treeExpandeds, reserveTreeExpandeds);
      }

      this.treeExpandeds = reserveTreeExpandeds;
      this.treeIndeterminates = reserveTreeIndeterminates;
    },
    handleReserveByRowid: function handleReserveByRowid(list, rest) {
      var _this33 = this;

      var fullDataRowIdData = this.fullDataRowIdData;
      list.forEach(function (row) {
        var rowid = _tools.UtilTools.getRowid(_this33, row);

        if (fullDataRowIdData[rowid]) {
          rest.push(fullDataRowIdData[rowid].row);
        }
      });
    },

    /**
     * 获取保留选中的行
     */
    getSelectReserveRecords: function getSelectReserveRecords() {
      var fullDataRowIdData = this.fullDataRowIdData,
          selectReserveRowMap = this.selectReserveRowMap,
          checkboxOpts = this.checkboxOpts;
      var reserveSelection = [];

      if (checkboxOpts.reserve) {
        Object.keys(selectReserveRowMap).forEach(function (rowid) {
          if (!fullDataRowIdData[rowid]) {
            reserveSelection.push(selectReserveRowMap[rowid]);
          }
        });
      }

      return reserveSelection;
    },
    clearSelectReserve: function clearSelectReserve() {
      this.selectReserveRowMap = {};
    },
    handleSelectReserveRow: function handleSelectReserveRow(row, checked) {
      var selectReserveRowMap = this.selectReserveRowMap,
          checkboxOpts = this.checkboxOpts;
      var reserve = checkboxOpts.reserve;

      if (reserve) {
        var rowid = _tools.UtilTools.getRowid(this, row);

        if (checked) {
          selectReserveRowMap[rowid] = row;
        } else if (selectReserveRowMap[rowid]) {
          delete selectReserveRowMap[rowid];
        }
      }
    },

    /**
     * 多选，选中所有事件
     */
    triggerCheckAllEvent: function triggerCheckAllEvent(evnt, value) {
      this.setAllSelection(value);

      _tools.UtilTools.emitEvent(this, 'select-all', [{
        selection: this.getSelectRecords(),
        reserves: this.getSelectReserveRecords(),
        checked: value,
        $table: this
      }, evnt]);
    },

    /**
     * 多选，切换所有行的选中状态
     */
    toggleAllSelection: function toggleAllSelection() {
      this.triggerCheckAllEvent(null, !this.isAllSelected);
      return this.$nextTick();
    },
    clearSelection: function clearSelection() {
      var tableFullData = this.tableFullData,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          checkboxOpts = this.checkboxOpts;
      var property = checkboxOpts.checkField || checkboxOpts.checkProp;

      if (property) {
        if (treeConfig) {
          _xeUtils.default.eachTree(tableFullData, function (item) {
            return _xeUtils.default.set(item, property, false);
          }, treeOpts);
        } else {
          tableFullData.forEach(function (item) {
            return _xeUtils.default.set(item, property, false);
          });
        }
      }

      this.isAllSelected = false;
      this.isIndeterminate = false;
      this.selection = [];
      this.treeIndeterminates = [];
      return this.$nextTick();
    },

    /**
     * 处理单选框默认勾选
     */
    handleRadioDefChecked: function handleRadioDefChecked() {
      var radioOpts = this.radioOpts,
          fullDataRowIdData = this.fullDataRowIdData;
      var rowid = radioOpts.checkRowKey;

      if (rowid) {
        this.setRadioRow(fullDataRowIdData[rowid].row);
      }
    },

    /**
     * 单选，行选中事件
     */
    triggerRadioRowEvent: function triggerRadioRowEvent(evnt, params) {
      var radioOpts = this.radioOpts;
      var checkMethod = radioOpts.checkMethod;

      if (!checkMethod || checkMethod({
        row: params.row,
        rowIndex: params.rowIndex,
        $rowIndex: params.$rowIndex
      })) {
        var isChange = this.selectRow !== params.row;
        this.setRadioRow(params.row);

        if (isChange) {
          _tools.UtilTools.emitEvent(this, 'radio-change', [params, evnt]);
        }
      }
    },
    triggerCurrentRowEvent: function triggerCurrentRowEvent(evnt, params) {
      var isChange = this.currentRow !== params.row;
      this.setCurrentRow(params.row);

      if (isChange) {
        _tools.UtilTools.emitEvent(this, 'current-change', [params, evnt]);
      }
    },

    /**
     * 单选，设置某一行为选中状态，如果调不加参数，则会取消目前高亮行的选中状态
     */
    setCurrentRow: function setCurrentRow(row) {
      if (this.highlightCurrentRow) {
        this.clearCurrentColumn();
        this.currentRow = row;
      }

      return this.$nextTick();
    },
    setRadioRow: function setRadioRow(row) {
      this.selectRow = row;
      return this.$nextTick();
    },
    clearCurrentRow: function clearCurrentRow() {
      this.currentRow = null;
      this.hoverRow = null;
      return this.$nextTick();
    },
    clearRadioRow: function clearRadioRow() {
      this.selectRow = null;
      return this.$nextTick();
    },
    getCurrentRow: function getCurrentRow() {
      return this.currentRow;
    },
    getRadioRow: function getRadioRow() {
      return this.selectRow;
    },

    /**
     * 行 hover 事件
     */
    triggerHoverEvent: function triggerHoverEvent(evnt, _ref4) {
      var row = _ref4.row;
      this.hoverRow = row;
    },
    clearHoverRow: function clearHoverRow() {
      this.hoverRow = null;
    },

    /**
     * 选中事件
     */
    triggerCellMousedownEvent: function triggerCellMousedownEvent(evnt, params) {
      var $el = this.$el,
          tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore,
          editConfig = this.editConfig,
          handleSelected = this.handleSelected,
          handleChecked = this.handleChecked;
      var checked = editStore.checked,
          actived = editStore.actived;
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var button = evnt.button;
      var isLeftBtn = button === 0;
      var isRightBtn = button === 2;

      if (isLeftBtn || isRightBtn) {
        if (editConfig && editConfig.trigger === 'dblclick') {
          if (editConfig.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {// 如果已经是激活状态
          } else {
            if (isLeftBtn) {
              evnt.preventDefault();
              evnt.stopPropagation();
              this.handleSelected(params, evnt);
              var domMousemove = document.onmousemove;
              var domMouseup = document.onmouseup;

              var start = _tools.DomTools.getCellIndexs(cell);

              var updateEvent = _xeUtils.default.throttle(function (evnt) {
                evnt.preventDefault();

                var _DomTools$getEventTar = _tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column'),
                    flag = _DomTools$getEventTar.flag,
                    targetElem = _DomTools$getEventTar.targetElem;

                if (flag) {
                  handleChecked(start, _tools.DomTools.getCellIndexs(targetElem), evnt);
                }
              }, browse.msie ? 80 : 40, {
                leading: true,
                trailing: true
              });

              document.onmousemove = updateEvent;

              document.onmouseup = function (evnt) {
                document.onmousemove = domMousemove;
                document.onmouseup = domMouseup;
              };

              this.closeFilter();
              this.closeMenu();
            } else {
              // 如果不在所有选中的范围之内则重新选中
              var select = _tools.DomTools.getCellIndexs(cell);

              if (checked.rows.indexOf(tableData[select.rowIndex]) === -1 || checked.columns.indexOf(visibleColumn[select.columnIndex]) === -1) {
                handleSelected(params, evnt);
              }
            }
          }
        }
      }

      this.isActivated = true;
    },

    /**
     * 边角事件
     */
    triggerCornerMousedownEvent: function triggerCornerMousedownEvent(params, evnt) {
      evnt.preventDefault();
      evnt.stopPropagation();
      var $el = this.$el,
          tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore,
          editConfig = this.editConfig,
          handleTempChecked = this.handleTempChecked;
      var checked = editStore.checked;
      var button = evnt.button;
      var isLeftBtn = button === 0;
      var isRightBtn = button === 2;

      if (isLeftBtn || isRightBtn) {
        if (editConfig && checked.rows.length && editConfig.trigger === 'dblclick') {
          var domMousemove = document.onmousemove;
          var domMouseup = document.onmouseup;
          var start = {
            rowIndex: tableData.indexOf(checked.rows[0]),
            columnIndex: visibleColumn.indexOf(checked.columns[0])
          };

          var updateEvent = _xeUtils.default.throttle(function (evnt) {
            evnt.preventDefault();

            var _DomTools$getEventTar2 = _tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column'),
                flag = _DomTools$getEventTar2.flag,
                targetElem = _DomTools$getEventTar2.targetElem;

            if (flag) {
              handleTempChecked(start, _tools.DomTools.getCellIndexs(targetElem), evnt);
            }
          }, browse.msie ? 80 : 40, {
            leading: true,
            trailing: true
          });

          document.onmousemove = updateEvent;

          document.onmouseup = function (evnt) {
            document.onmousemove = domMousemove;
            document.onmouseup = domMouseup;
            checked.rows = checked.tRows;
            checked.columns = checked.tColumns;
          };
        }
      }

      this.isActivated = true;
    },
    triggerHeaderCellClickEvent: function triggerHeaderCellClickEvent(evnt, params) {
      var _lastResizeTime = this._lastResizeTime,
          sortOpts = this.sortOpts;
      var column = params.column,
          cell = params.cell;

      var triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300;

      var triggerSort = _tools.DomTools.getEventTargetNode(evnt, cell, 'vxe-sort-wrapper').flag;

      var triggerFilter = _tools.DomTools.getEventTargetNode(evnt, cell, 'vxe-filter-wrapper').flag;

      if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
        this.triggerSortEvent(evnt, column, column.order === 'desc' ? 'asc' : 'desc');
      }

      _tools.UtilTools.emitEvent(this, 'header-cell-click', [Object.assign({
        triggerResizable: triggerResizable,
        triggerSort: triggerSort,
        triggerFilter: triggerFilter
      }, params), evnt]);

      return this.setCurrentColumn(column, true);
    },
    setCurrentColumn: function setCurrentColumn(column) {
      if (this.highlightCurrentColumn) {
        this.clearCurrentRow();
        this.currentColumn = column;
      }

      return this.$nextTick();
    },
    clearCurrentColumn: function clearCurrentColumn() {
      this.currentColumn = null;
    },

    /**
     * 列点击事件
     * 如果是单击模式，则激活为编辑状态
     * 如果是双击模式，则单击后选中状态
     */
    triggerCellClickEvent: function triggerCellClickEvent(evnt, params) {
      var _this34 = this;

      var $el = this.$el,
          highlightCurrentRow = this.highlightCurrentRow,
          editStore = this.editStore,
          radioOpts = this.radioOpts,
          expandOpts = this.expandOpts,
          treeOpts = this.treeOpts,
          editConfig = this.editConfig,
          checkboxOpts = this.checkboxOpts;
      var actived = editStore.actived;
      var column = params.column,
          row = params.row; // 解决 checkbox 重复触发两次问题

      if (isTargetRadioOrCheckbox(evnt, column, 'radio') || isTargetRadioOrCheckbox(evnt, column, 'checkbox', 'checkbox') || isTargetRadioOrCheckbox(evnt, column, 'selection', 'checkbox')) {
        // 在 v3.0 中废弃 selection
        return;
      } // 如果是展开行


      if ((expandOpts.trigger === 'row' || column.type === 'expand' && expandOpts.trigger === 'cell') && !_tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag) {
        this.triggerRowExpandEvent(evnt, params);
      } // 如果是树形表格


      if (treeOpts.trigger === 'row' || column.treeNode && treeOpts.trigger === 'cell') {
        this.triggerTreeExpandEvent(evnt, params);
      }

      if ((!column.treeNode || !_tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag) && (column.type !== 'expand' || !_tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag)) {
        // 如果是高亮行
        if (highlightCurrentRow) {
          if (radioOpts.trigger === 'row' || !_tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-checkbox').flag && !_tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
            this.triggerCurrentRowEvent(evnt, params);
          }
        } // 如果是单选框


        if ((radioOpts.trigger === 'row' || column.type === 'radio' && radioOpts.trigger === 'cell') && !_tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
          this.triggerRadioRowEvent(evnt, params);
        } // 如果是复选框


        if ((checkboxOpts.trigger === 'row' || (column.type === 'checkbox' || column.type === 'selection') && checkboxOpts.trigger === 'cell') && !_tools.DomTools.getEventTargetNode(evnt, params.cell, 'vxe-checkbox').flag) {
          // 在 v3.0 中废弃 selection
          this.handleToggleCheckRowEvent(params, evnt);
        }

        if (editConfig) {
          if (editConfig.trigger === 'click') {
            if (!actived.args || row !== actived.row || column !== actived.column) {
              if (editConfig.mode === 'row') {
                this.triggerValidate('blur').catch(function (e) {
                  return e;
                }).then(function () {
                  _this34.handleActived(params, evnt).then(function () {
                    return _this34.triggerValidate('change');
                  }).catch(function (e) {
                    return e;
                  });
                });
              } else if (editConfig.mode === 'cell') {
                this.handleActived(params, evnt).then(function () {
                  return _this34.triggerValidate('change');
                }).catch(function (e) {
                  return e;
                });
              }
            }
          } else if (editConfig.trigger === 'dblclick') {
            if (editConfig.mode === 'row' && actived.row === row) {
              this.triggerValidate('blur').catch(function (e) {
                return e;
              }).then(function () {
                _this34.handleActived(params, evnt).then(function () {
                  return _this34.triggerValidate('change');
                }).catch(function (e) {
                  return e;
                });
              });
            } else {
              this.handleSelected(params, evnt);
            }
          }
        }
      }

      _tools.UtilTools.emitEvent(this, 'cell-click', [params, evnt]);
    },

    /**
     * 列双击点击事件
     * 如果是双击模式，则激活为编辑状态
     */
    triggerCellDBLClickEvent: function triggerCellDBLClickEvent(evnt, params) {
      var _this35 = this;

      var editStore = this.editStore,
          editConfig = this.editConfig;
      var actived = editStore.actived;

      if (editConfig) {
        if (editConfig.trigger === 'dblclick') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            if (editConfig.mode === 'row') {
              this.triggerValidate('blur').catch(function (e) {
                return e;
              }).then(function () {
                _this35.handleActived(params, evnt).then(function () {
                  return _this35.triggerValidate('change');
                }).catch(function (e) {
                  return e;
                });
              });
            } else if (editConfig.mode === 'cell') {
              this.handleActived(params, evnt).then(function () {
                return _this35.triggerValidate('change');
              }).catch(function (e) {
                return e;
              });
            }
          }
        }
      }

      _tools.UtilTools.emitEvent(this, 'cell-dblclick', [params, evnt]);
    },

    /**
     * 处理激活编辑
     */
    handleActived: function handleActived(params, evnt) {
      var _this36 = this;

      var editStore = this.editStore,
          editConfig = this.editConfig;
      var activeMethod = editConfig.activeMethod;
      var actived = editStore.actived;
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var editRender = column.editRender;

      if (editRender && cell) {
        if (editConfig.mode === 'row' ? actived.row !== row : actived.row !== row || actived.column !== column) {
          // 判断是否禁用编辑
          var type = 'edit-disabled';

          if (!activeMethod || activeMethod(params)) {
            this.clostTooltip();
            this.clearCopyed(evnt);
            this.clearChecked(evnt);
            this.clearSelected(evnt);
            this.clearActived(evnt);
            type = 'edit-actived';
            column.renderHeight = cell.offsetHeight;
            actived.args = params;
            actived.row = row;
            actived.column = column;
            this.$nextTick(function () {
              _this36.handleFocus(params, evnt);
            });
          }

          _tools.UtilTools.emitEvent(this, type, [params, evnt]);
        } else {
          column.renderHeight = cell.offsetHeight;
          actived.args = params;

          if (actived.column !== column) {
            this.clearValidate();
          }

          setTimeout(function () {
            _this36.handleFocus(params, evnt);
          });
        }
      }

      return this.$nextTick();
    },

    /**
     * 清除激活的编辑
     */
    clearActived: function clearActived(evnt) {
      var editStore = this.editStore;
      var actived = editStore.actived;
      var args = actived.args,
          row = actived.row,
          column = actived.column;

      if (row || column) {
        this.updateFooter();

        _tools.UtilTools.emitEvent(this, 'edit-closed', [args, evnt]);
      }

      actived.args = null;
      actived.row = null;
      actived.column = null;
      return this.clearValidate();
    },
    getActiveRow: function getActiveRow() {
      var $el = this.$el,
          editStore = this.editStore,
          afterFullData = this.afterFullData;
      var _editStore$actived = editStore.actived,
          args = _editStore$actived.args,
          row = _editStore$actived.row;

      if (args && afterFullData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
        return Object.assign({}, args);
      }

      return null;
    },
    // v3 废弃
    hasActiveRow: function hasActiveRow(row) {
      _tools.UtilTools.warn('vxe.error.delFunc', ['hasActiveRow', 'isActiveByRow']);

      return this.isActiveByRow(row);
    },

    /**
     * 判断行是否为激活编辑状态
     * @param {Row} row 行对象
     */
    isActiveByRow: function isActiveByRow(row) {
      return this.editStore.actived.row === row;
    },

    /**
     * 清除所选中源状态
     */
    clearSelected: function clearSelected(evnt) {
      var editStore = this.editStore;
      var selected = editStore.selected;
      selected.row = null;
      selected.column = null;
      return this.$nextTick();
    },

    /**
     * 处理选中源
     */
    handleSelected: function handleSelected(params, evnt) {
      var _this37 = this;

      var _this$mouseConfig = this.mouseConfig,
          mouseConfig = _this$mouseConfig === void 0 ? {} : _this$mouseConfig,
          editConfig = this.editConfig,
          editStore = this.editStore;
      var actived = editStore.actived,
          selected = editStore.selected;
      var row = params.row,
          column = params.column;

      var selectMethod = function selectMethod() {
        if ((mouseConfig.selected || mouseConfig.checked) && (selected.row !== row || selected.column !== column)) {
          if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
            _this37.clearChecked(evnt);

            _this37.clearActived(evnt);

            selected.args = params;
            selected.row = row;
            selected.column = column; // 如果配置了批量选中功能，则为批量选中状态

            if (mouseConfig.checked) {
              var select = _tools.DomTools.getCellIndexs(params.cell);

              _this37.handleChecked(select, select, evnt);
            }
          }
        }

        return _this37.$nextTick();
      }; // return editRules ? this.triggerValidate('blur').then(selectMethod).catch(e => e) : selectMethod()


      return selectMethod();
    },

    /**
     * 清除所有选中状态
     */
    clearChecked: function clearChecked(evnt) {
      var editStore = this.editStore;
      var checked = editStore.checked;
      checked.rows = [];
      checked.columns = [];
      checked.tRows = [];
      checked.tColumns = [];
      return this.$nextTick();
    },
    getMouseSelecteds: function getMouseSelecteds() {
      var _this$editStore$selec = this.editStore.selected,
          args = _this$editStore$selec.args,
          column = _this$editStore$selec.column;

      if (args && column) {
        return Object.assign({}, args);
      }

      return null;
    },
    getMouseCheckeds: function getMouseCheckeds() {
      var checked = this.editStore.checked;
      var rows = checked.rows,
          columns = checked.columns;
      return {
        columns: columns,
        rows: rows
      };
    },

    /**
     * 处理所有选中
     */
    handleChecked: function handleChecked(start, end, evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore;
      var checked = editStore.checked;
      var sRowIndex = start.rowIndex,
          sColumnIndex = start.columnIndex;
      var eRowIndex = end.rowIndex,
          eColumnIndex = end.columnIndex;
      checked.tRows = [];
      checked.tColumns = [];

      if (sRowIndex < eRowIndex) {
        // 向下
        checked.rows = tableData.slice(sRowIndex, eRowIndex + 1);
      } else {
        // 向上
        checked.rows = tableData.slice(eRowIndex, sRowIndex + 1);
      }

      if (sColumnIndex < eColumnIndex) {
        // 向右
        checked.columns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1);
      } else {
        // 向左
        checked.columns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex + 1);
      }
    },

    /**
     * 处理所有选中的临时选中
     */
    handleTempChecked: function handleTempChecked(start, end, evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore;
      var checked = editStore.checked;
      var rows = checked.rows,
          tRows = checked.tRows,
          columns = checked.columns,
          tColumns = checked.tColumns;
      var sRowIndex = start.rowIndex,
          sColumnIndex = start.columnIndex;
      var eRowIndex = end.rowIndex,
          eColumnIndex = end.columnIndex;

      if (tRows.length > rows.length) {
        eColumnIndex = visibleColumn.indexOf(columns[columns.length - 1]);
      } else if (tColumns.length > columns.length) {
        eRowIndex = tableData.indexOf(rows[rows.length - 1]);
      }

      if (sRowIndex < eRowIndex) {
        // 向下
        checked.tRows = tableData.slice(sRowIndex, eRowIndex + 1);
      } else {
        // 向上
        sRowIndex += rows.length;
        checked.tRows = tableData.slice(eRowIndex, sRowIndex);
      }

      if (sColumnIndex < eColumnIndex) {
        // 向右
        checked.tColumns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1);
      } else {
        // 向左
        sColumnIndex += columns.length;
        checked.tColumns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex);
      }
    },

    /**
     * 清空已复制的内容
     */
    clearCopyed: function clearCopyed() {
      var editStore = this.editStore;
      var copyed = editStore.copyed;
      copyed.cut = false;
      copyed.rows = [];
      copyed.columns = [];
      return this.$nextTick();
    },

    /**
     * 处理复制
     */
    handleCopyed: function handleCopyed(cut, evnt) {
      var editStore = this.editStore;
      var copyed = editStore.copyed,
          checked = editStore.checked;
      copyed.cut = cut;
      copyed.rows = checked.rows;
      copyed.columns = checked.columns;
    },

    /**
     * 处理粘贴
     */
    handlePaste: function handlePaste(evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore;
      var copyed = editStore.copyed,
          selected = editStore.selected;
      var cut = copyed.cut,
          rows = copyed.rows,
          columns = copyed.columns;

      if (rows.length && columns.length && selected.row && selected.column) {
        var _selected$args = selected.args,
            rowIndex = _selected$args.rowIndex,
            columnIndex = _selected$args.columnIndex;
        var start = {
          rowIndex: rowIndex,
          columnIndex: columnIndex
        };
        var end = {
          rowIndex: rowIndex + rows.length - 1,
          columnIndex: columnIndex + columns.length - 1
        };
        rows.forEach(function (row, rIndex) {
          var offsetRow = tableData[rowIndex + rIndex];

          if (offsetRow) {
            columns.forEach(function (column, cIndex) {
              var offsetColumn = visibleColumn[columnIndex + cIndex];

              if (offsetColumn) {
                _tools.UtilTools.setCellValue(offsetRow, offsetColumn, _tools.UtilTools.getCellValue(row, column));
              }

              if (cut) {
                _tools.UtilTools.setCellValue(row, column, null);
              }
            });
          }
        });

        if (cut) {
          this.clearCopyed();
        }

        this.handleChecked(start, end, evnt);
      }
    },

    /**
     * 处理聚焦
     */
    handleFocus: function handleFocus(params, evnt) {
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var editRender = column.editRender;

      if (editRender) {
        var compRender = _vXETable.Renderer.get(editRender.name);

        var autofocus = editRender.autofocus,
            autoselect = editRender.autoselect;
        var inputElem; // 如果指定了聚焦 class

        if (autofocus) {
          inputElem = cell.querySelector(autofocus);
        } // 渲染器的聚焦处理


        if (!inputElem && compRender && compRender.autofocus) {
          inputElem = cell.querySelector(compRender.autofocus);
        }

        if (inputElem) {
          inputElem[autoselect ? 'select' : 'focus']();

          if (browse.msie) {
            var textRange = inputElem.createTextRange();
            textRange.collapse(false);
            textRange.select();
          }
        } else {
          // 显示到可视区中
          this.scrollToRow(row, column);
        }
      }
    },

    /**
     * 激活行编辑
     */
    setActiveRow: function setActiveRow(row) {
      return this.setActiveCell(row, _xeUtils.default.find(this.visibleColumn, function (column) {
        return column.editRender;
      }).property);
    },

    /**
     * 激活单元格编辑
     */
    setActiveCell: function setActiveCell(row, field) {
      var _this38 = this;

      return this.scrollToRow(row).then(function () {
        if (row && field) {
          var column = _xeUtils.default.find(_this38.visibleColumn, function (column) {
            return column.property === field;
          });

          if (column && column.editRender) {
            var cell = _tools.DomTools.getCell(_this38, {
              row: row,
              column: column
            });

            if (cell) {
              _this38.handleActived({
                row: row,
                rowIndex: _this38.getRowIndex(row),
                column: column,
                columnIndex: _this38.getColumnIndex(column),
                cell: cell,
                $table: _this38
              });

              _this38.lastCallTime = Date.now();
            }
          }
        }

        return _this38.$nextTick();
      });
    },

    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    setSelectCell: function setSelectCell(row, field) {
      var tableData = this.tableData,
          editConfig = this.editConfig,
          visibleColumn = this.visibleColumn;

      if (row && field && editConfig.trigger !== 'manual') {
        var column = _xeUtils.default.find(visibleColumn, function (column) {
          return column.property === field;
        });

        var rowIndex = tableData.indexOf(row);

        if (rowIndex > -1 && column) {
          var cell = _tools.DomTools.getCell(this, {
            row: row,
            rowIndex: rowIndex,
            column: column
          });

          var params = {
            row: row,
            rowIndex: rowIndex,
            column: column,
            columnIndex: visibleColumn.indexOf(column),
            cell: cell
          };
          this.handleSelected(params, {});
        }
      }

      return this.$nextTick();
    },
    handleDefaultSort: function handleDefaultSort() {
      var defaultSort = this.sortOpts.defaultSort;

      if (defaultSort) {
        var field = defaultSort.field,
            order = defaultSort.order;

        if (field && order) {
          this.sort(field, order);
        }
      }
    },

    /**
     * 点击排序事件
     */
    triggerSortEvent: function triggerSortEvent(evnt, column, order) {
      var property = column.property;

      if (column.sortable || column.remoteSort) {
        var evntParams = {
          column: column,
          property: property,
          field: property,
          prop: property,
          order: order,
          $table: this
        };

        if (column.order === order) {
          evntParams.order = null;
          this.clearSort(column.property);
        } else {
          this.sort(property, order);
        }

        _tools.UtilTools.emitEvent(this, 'sort-change', [evntParams, evnt]);
      }
    },
    sort: function sort(field, order) {
      var visibleColumn = this.visibleColumn,
          tableFullColumn = this.tableFullColumn,
          remoteSort = this.remoteSort,
          sortOpts = this.sortOpts;

      var column = _xeUtils.default.find(visibleColumn, function (item) {
        return item.property === field;
      });

      if (column) {
        var isRemote = _xeUtils.default.isBoolean(column.remoteSort) ? column.remoteSort : sortOpts.remote || remoteSort;

        if (column.sortable || column.remoteSort) {
          if (!order) {
            order = column.order === 'desc' ? 'asc' : 'desc';
          }

          if (column.order !== order) {
            tableFullColumn.forEach(function (column) {
              column.order = null;
            });
            column.order = order; // 如果是服务端排序，则跳过本地排序处理

            if (!isRemote) {
              this.handleTableData(true);
            }
          }
        }
      }

      return this.$nextTick();
    },
    clearSort: function clearSort() {
      this.tableFullColumn.forEach(function (column) {
        column.order = null;
      });
      return this.handleTableData(true);
    },
    filter: function filter(field, callback) {
      var column = this.getColumnByField(field);

      if (column) {
        var filters = column.filters;

        if (callback) {
          var rest = callback(filters);

          if (_xeUtils.default.isArray(rest)) {
            column.filters = _tools.UtilTools.getFilters(rest);
          }
        }

        return this.$nextTick().then(function () {
          return filters;
        });
      }

      return this.$nextTick();
    },

    /**
     * 点击筛选事件
     */
    triggerFilterEvent: function triggerFilterEvent(evnt, column, params) {
      var $refs = this.$refs,
          filterStore = this.filterStore;

      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false;
      } else {
        var filterWrapper = $refs.filterWrapper;
        var bodyElem = $refs.tableBody.$el;
        var targetElem = evnt.target,
            pageX = evnt.pageX;

        var _DomTools$getDomNode2 = _tools.DomTools.getDomNode(),
            visibleWidth = _DomTools$getDomNode2.visibleWidth;

        Object.assign(filterStore, {
          args: params,
          multiple: column.filterMultiple,
          options: column.filters,
          column: column,
          style: null,
          visible: true
        });
        filterStore.isAllSelected = filterStore.options.every(function (item) {
          return item.checked;
        });
        filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(function (item) {
          return item.checked;
        });
        this.$nextTick(function () {
          var filterWrapperElem = filterWrapper.$el;
          var filterWidth = filterWrapperElem.offsetWidth;
          var centerWidth = filterWidth / 2;
          var minMargin = 32;
          var left, right;
          var style = {
            top: "".concat(targetElem.offsetTop + targetElem.offsetParent.offsetTop + targetElem.offsetHeight + 8, "px")
          };

          if (column.fixed === 'left') {
            left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth;
          } else if (column.fixed === 'right') {
            right = targetElem.offsetParent.offsetWidth - targetElem.offsetLeft + (targetElem.offsetParent.offsetParent.offsetWidth - targetElem.offsetParent.offsetLeft) - column.renderWidth - centerWidth;
          } else {
            left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth - bodyElem.scrollLeft;
          }

          if (left) {
            var overflowWidth = pageX + filterWidth - centerWidth + minMargin - visibleWidth;

            if (overflowWidth > 0) {
              left -= overflowWidth;
            }

            style.left = "".concat(Math.max(minMargin, left), "px");
          } else if (right) {
            var _overflowWidth = pageX + filterWidth - centerWidth + minMargin - visibleWidth;

            if (_overflowWidth > 0) {
              right += _overflowWidth;
            }

            style.right = "".concat(right, "px");
          }

          filterStore.style = style;
        });
      }
    },
    // 确认筛选
    confirmFilterEvent: function confirmFilterEvent(evnt) {
      var visibleColumn = this.visibleColumn,
          filterStore = this.filterStore,
          remoteFilter = this.remoteFilter,
          filterOpts = this.filterOpts,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad;
      var column = filterStore.column;
      var property = column.property;
      var values = [];
      var datas = [];
      column.filters.forEach(function (item) {
        if (item.checked) {
          values.push(item.value);
          datas.push(item.data);
        }
      });
      filterStore.visible = false; // 如果是服务端筛选，则跳过本地筛选处理

      if (!(filterOpts.remote || remoteFilter)) {
        this.handleTableData(true);
      }

      var filterList = [];
      visibleColumn.filter(function (column) {
        var property = column.property,
            filters = column.filters;
        var valueList = [];
        var dataList = [];

        if (filters && filters.length) {
          filters.forEach(function (item) {
            if (item.checked) {
              valueList.push(item.value);
              dataList.push(item.data);
            }
          }); // 在 v3.0 中废弃 prop

          filterList.push({
            column: column,
            property: property,
            field: property,
            prop: property,
            values: valueList,
            datas: dataList
          });
        }
      }); // 在 v3.0 中废弃 prop

      _tools.UtilTools.emitEvent(this, 'filter-change', [{
        column: column,
        property: property,
        field: property,
        prop: property,
        values: values,
        datas: datas,
        filters: filterList,
        $table: this
      }]);

      this.updateFooter();

      if (scrollXLoad || scrollYLoad) {
        this.clearScroll();
      }

      this.closeFilter();
      this.$nextTick(this.recalculate);
    },
    // 关闭筛选
    closeFilter: function closeFilter(evnt) {
      Object.assign(this.filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        options: [],
        visible: false
      });
      return this.$nextTick();
    },
    // 重置筛选
    resetFilterEvent: function resetFilterEvent(evnt) {
      this.filterStore.options.forEach(function (item) {
        item.checked = false;
        item.data = item._data;
      });
      this.confirmFilterEvent(evnt);
    },
    clearFilter: function clearFilter(field) {
      var column = arguments.length ? this.getColumnByField(field) : null;
      var filterStore = this.filterStore;

      var handleClear = function handleClear(column) {
        var filters = column.filters;

        if (filters && filters.length) {
          filters.forEach(function (item) {
            item.checked = false;
            item.data = item._data;
          });
        }
      };

      if (column) {
        handleClear(column);
      } else {
        this.visibleColumn.forEach(handleClear);
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
        });
      }

      return this.updateData();
    },

    /**
     * 判断展开行是否懒加载完成
     * @param {Row} row 行对象
     */
    isRowExpandLoaded: function isRowExpandLoaded(row) {
      var rest = this.fullAllDataRowMap.get(row);
      return rest && rest.expandLoaded;
    },
    clearRowExpandLoaded: function clearRowExpandLoaded(row) {
      var expandOpts = this.expandOpts,
          expandLazyLoadeds = this.expandLazyLoadeds,
          fullAllDataRowMap = this.fullAllDataRowMap;
      var lazy = expandOpts.lazy;
      var rest = fullAllDataRowMap.get(row);

      if (lazy && rest) {
        rest.expandLoaded = false;

        _xeUtils.default.remove(expandLazyLoadeds, function (item) {
          return row === item;
        });
      }

      return this.$nextTick();
    },

    /**
     * 重新加载展开行的内容
     * @param {Row} row 行对象
     */
    reloadExpandContent: function reloadExpandContent(row) {
      var _this39 = this;

      var expandOpts = this.expandOpts,
          expandLazyLoadeds = this.expandLazyLoadeds;
      var lazy = expandOpts.lazy;

      if (lazy && expandLazyLoadeds.indexOf(row) === -1) {
        this.clearRowExpandLoaded(row).then(function () {
          return _this39.handleAsyncRowExpand(row);
        });
      }

      return this.$nextTick();
    },

    /**
     * 展开行事件
     */
    triggerRowExpandEvent: function triggerRowExpandEvent(evnt, params) {
      var $listeners = this.$listeners,
          expandOpts = this.expandOpts,
          expandLazyLoadeds = this.expandLazyLoadeds;
      var row = params.row;
      var lazy = expandOpts.lazy;

      if (!lazy || expandLazyLoadeds.indexOf(row) === -1) {
        this.toggleRowExpansion(params.row);

        if ($listeners['toggle-expand-change']) {
          _tools.UtilTools.warn('vxe.error.delEvent', ['toggle-expand-change', 'toggle-row-expand']);

          _tools.UtilTools.emitEvent(this, 'toggle-expand-change', [{
            row: row,
            rowIndex: this.getRowIndex(row),
            $table: this
          }, evnt]);
        } else {
          _tools.UtilTools.emitEvent(this, 'toggle-row-expand', [{
            row: row,
            rowIndex: this.getRowIndex(row),
            expanded: !this.isExpandByRow(row),
            $table: this
          }, evnt]);
        }
      }
    },

    /**
     * 切换展开行
     */
    toggleRowExpansion: function toggleRowExpansion(row) {
      return this.setRowExpansion(row, this.rowExpandeds.indexOf(row) === -1);
    },

    /**
     * 处理默认展开行
     */
    handleDefaultRowExpand: function handleDefaultRowExpand() {
      var expandOpts = this.expandOpts,
          fullDataRowIdData = this.fullDataRowIdData;
      var expandAll = expandOpts.expandAll,
          expandRowKeys = expandOpts.expandRowKeys;

      if (expandAll) {
        this.setAllRowExpansion(true);
      } else if (expandRowKeys) {
        var defExpandeds = [];
        expandRowKeys.forEach(function (rowid) {
          if (fullDataRowIdData[rowid]) {
            defExpandeds.push(fullDataRowIdData[rowid].row);
          }
        });
        this.setRowExpansion(defExpandeds, true);
      }
    },

    /**
     * 设置所有行的展开与否
     * @param {Boolean} expanded 是否展开
     */
    setAllRowExpansion: function setAllRowExpansion(expanded) {
      if (this.expandOpts.lazy) {
        return this.setRowExpansion(this.tableData, true);
      }

      this.rowExpandeds = expanded ? this.tableFullData.slice(0) : [];
      return this.$nextTick().then(this.recalculate);
    },
    handleAsyncRowExpand: function handleAsyncRowExpand(row) {
      var _this40 = this;

      var fullAllDataRowMap = this.fullAllDataRowMap,
          rowExpandeds = this.rowExpandeds,
          expandLazyLoadeds = this.expandLazyLoadeds,
          expandOpts = this.expandOpts;
      var loadMethod = expandOpts.loadMethod;
      var rest = fullAllDataRowMap.get(row);
      return new Promise(function (resolve) {
        expandLazyLoadeds.push(row);
        loadMethod({
          $table: _this40,
          row: row
        }).catch(function (e) {
          return e;
        }).then(function () {
          rest.expandLoaded = true;

          _xeUtils.default.remove(expandLazyLoadeds, function (item) {
            return item === row;
          });

          rowExpandeds.push(row);
          resolve(_this40.$nextTick().then(_this40.recalculate));
        });
      });
    },

    /**
     * 设置展开行，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     * @param {Array/Row} rows 行数据
     * @param {Boolean} expanded 是否展开
     */
    setRowExpansion: function setRowExpansion(rows, expanded) {
      var _this41 = this;

      var fullAllDataRowMap = this.fullAllDataRowMap,
          rowExpandeds = this.rowExpandeds,
          expandLazyLoadeds = this.expandLazyLoadeds,
          expandOpts = this.expandOpts;
      var lazy = expandOpts.lazy,
          accordion = expandOpts.accordion;
      var result = [];

      if (rows) {
        if (!_xeUtils.default.isArray(rows)) {
          rows = [rows];
        }

        if (accordion) {
          // 只能同时展开一个
          rowExpandeds = [];
          rows = rows.slice(rows.length - 1, rows.length);
        }

        if (expanded) {
          rows.forEach(function (row) {
            if (rowExpandeds.indexOf(row) === -1) {
              var rest = fullAllDataRowMap.get(row);
              var isLoad = lazy && !rest.expandLoaded && expandLazyLoadeds.indexOf(row) === -1;

              if (isLoad) {
                result.push(_this41.handleAsyncRowExpand(row));
              } else {
                rowExpandeds.push(row);
              }
            }
          });
        } else {
          _xeUtils.default.remove(rowExpandeds, function (row) {
            return rows.indexOf(row) > -1;
          });
        }
      }

      this.rowExpandeds = rowExpandeds;
      return Promise.all(result).then(this.recalculate);
    },
    // 在 v3.0 中废弃 hasRowExpand
    hasRowExpand: function hasRowExpand(row) {
      _tools.UtilTools.warn('vxe.error.delFunc', ['hasRowExpand', 'isExpandByRow']);

      return this.isExpandByRow(row);
    },

    /**
     * 判断行是否为展开状态
     * @param {Row} row 行对象
     */
    isExpandByRow: function isExpandByRow(row) {
      return this.rowExpandeds.indexOf(row) > -1;
    },
    clearRowExpand: function clearRowExpand() {
      var _this42 = this;

      var isExists = this.rowExpandeds.length;
      this.rowExpandeds = [];
      return this.$nextTick().then(function () {
        return isExists ? _this42.recalculate() : 0;
      });
    },
    getRowExpandRecords: function getRowExpandRecords() {
      return this.rowExpandeds.slice(0);
    },
    getTreeExpandRecords: function getTreeExpandRecords() {
      return this.treeExpandeds.slice(0);
    },

    /**
     * 获取数表格状态
     */
    getTreeStatus: function getTreeStatus() {
      if (this.treeConfig) {
        return {
          config: this.treeOpts,
          rowExpandeds: this.getTreeExpandRecords()
        };
      }

      return null;
    },

    /**
     * 判断树节点是否懒加载完成
     * @param {Row} row 行对象
     */
    isTreeExpandLoaded: function isTreeExpandLoaded(row) {
      var rest = this.fullAllDataRowMap.get(row);
      return rest && rest.treeLoaded;
    },
    clearTreeExpandLoaded: function clearTreeExpandLoaded(row) {
      var treeOpts = this.treeOpts,
          treeExpandeds = this.treeExpandeds,
          fullAllDataRowMap = this.fullAllDataRowMap;
      var lazy = treeOpts.lazy;
      var rest = fullAllDataRowMap.get(row);

      if (lazy && rest) {
        rest.treeLoaded = false;

        _xeUtils.default.remove(treeExpandeds, function (item) {
          return row === item;
        });
      }

      return this.$nextTick();
    },

    /**
     * 重新加载树的子节点
     * @param {Row} row 行对象
     */
    reloadTreeChilds: function reloadTreeChilds(row) {
      var _this43 = this;

      var treeOpts = this.treeOpts,
          treeLazyLoadeds = this.treeLazyLoadeds;
      var lazy = treeOpts.lazy,
          hasChild = treeOpts.hasChild;

      if (lazy && row[hasChild] && treeLazyLoadeds.indexOf(row) === -1) {
        this.clearTreeExpandLoaded(row).then(function () {
          return _this43.handleAsyncTreeExpandChilds(row);
        });
      }

      return this.$nextTick();
    },

    /**
     * 展开树节点事件
     */
    triggerTreeExpandEvent: function triggerTreeExpandEvent(evnt, params) {
      var $listeners = this.$listeners,
          treeOpts = this.treeOpts,
          treeLazyLoadeds = this.treeLazyLoadeds;
      var row = params.row;
      var lazy = treeOpts.lazy;

      if (!lazy || treeLazyLoadeds.indexOf(row) === -1) {
        this.toggleTreeExpansion(params.row);

        if ($listeners['toggle-tree-change']) {
          _tools.UtilTools.warn('vxe.error.delEvent', ['toggle-tree-change', 'toggle-tree-expand']);

          _tools.UtilTools.emitEvent(this, 'toggle-tree-change', [{
            row: row,
            rowIndex: this.getRowIndex(row),
            $table: this
          }, evnt]);
        } else {
          _tools.UtilTools.emitEvent(this, 'toggle-tree-change', [{
            row: row,
            rowIndex: this.getRowIndex(row),
            expanded: !this.isTreeExpandByRow(row),
            $table: this
          }, evnt]);
        }
      }
    },

    /**
     * 切换/展开树节点
     */
    toggleTreeExpansion: function toggleTreeExpansion(row) {
      return this.setTreeExpansion(row, !this.isTreeExpandByRow(row));
    },

    /**
     * 处理默认展开树节点
     */
    handleDefaultTreeExpand: function handleDefaultTreeExpand() {
      var treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          tableFullData = this.tableFullData;

      if (treeConfig) {
        var expandAll = treeOpts.expandAll,
            expandRowKeys = treeOpts.expandRowKeys;

        if (expandAll) {
          this.setAllTreeExpansion(true);
        } else if (expandRowKeys) {
          var defExpandeds = [];

          var rowkey = _tools.UtilTools.getRowkey(this);

          expandRowKeys.forEach(function (rowid) {
            var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
              return rowid === _xeUtils.default.get(item, rowkey);
            }, treeOpts);

            if (matchObj) {
              defExpandeds.push(matchObj.item);
            }
          });
          this.setTreeExpansion(defExpandeds, true);
        }
      }
    },
    handleAsyncTreeExpandChilds: function handleAsyncTreeExpandChilds(row) {
      var _this44 = this;

      var fullAllDataRowMap = this.fullAllDataRowMap,
          treeExpandeds = this.treeExpandeds,
          treeOpts = this.treeOpts,
          treeLazyLoadeds = this.treeLazyLoadeds;
      var loadMethod = treeOpts.loadMethod,
          children = treeOpts.children;
      var rest = fullAllDataRowMap.get(row);
      return new Promise(function (resolve) {
        treeLazyLoadeds.push(row);
        loadMethod({
          $table: _this44,
          row: row
        }).catch(function (e) {
          return [];
        }).then(function (childs) {
          rest.treeLoaded = true;

          _xeUtils.default.remove(treeLazyLoadeds, function (item) {
            return item === row;
          });

          if (!_xeUtils.default.isArray(childs)) {
            childs = [];
          }

          if (childs) {
            row[children] = childs;

            _this44.appendTreeCache(row, childs);

            if (childs.length && treeExpandeds.indexOf(row) === -1) {
              treeExpandeds.push(row);
            } // 如果当前节点已选中，则展开后子节点也被选中


            if (_this44.isCheckedByRow(row)) {
              _this44.setSelection(childs, true);
            }
          }

          resolve(_this44.$nextTick().then(_this44.recalculate));
        });
      });
    },

    /**
     * 设置所有树节点的展开与否
     * @param {Boolean} expanded 是否展开
     */
    setAllTreeExpansion: function setAllTreeExpansion(expanded) {
      var _this45 = this;

      var tableFullData = this.tableFullData,
          treeOpts = this.treeOpts;
      var lazy = treeOpts.lazy,
          children = treeOpts.children;

      if (expanded) {
        if (lazy) {
          _xeUtils.default.eachTree(tableFullData, function (row) {
            _this45.setTreeExpansion(row, true);
          }, treeOpts);
        } else {
          var treeExpandeds = [];

          _xeUtils.default.eachTree(tableFullData, function (row) {
            var rowChildren = row[children];

            if (rowChildren && rowChildren.length) {
              treeExpandeds.push(row);
            }
          }, treeOpts);

          this.treeExpandeds = treeExpandeds;
        }
      } else {
        this.treeExpandeds = [];
      }

      return this.$nextTick().then(this.recalculate);
    },

    /**
     * 设置展开树形节点，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     * @param {Array/Row} rows 行数据
     * @param {Boolean} expanded 是否展开
     */
    setTreeExpansion: function setTreeExpansion(rows, expanded) {
      var _this46 = this;

      var fullAllDataRowMap = this.fullAllDataRowMap,
          tableFullData = this.tableFullData,
          treeExpandeds = this.treeExpandeds,
          treeOpts = this.treeOpts,
          treeLazyLoadeds = this.treeLazyLoadeds;
      var lazy = treeOpts.lazy,
          hasChild = treeOpts.hasChild,
          children = treeOpts.children,
          accordion = treeOpts.accordion;
      var result = [];

      if (rows) {
        if (!_xeUtils.default.isArray(rows)) {
          rows = [rows];
        }

        if (rows.length) {
          if (accordion) {
            rows = rows.slice(rows.length - 1, rows.length); // 同一级只能展开一个

            var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
              return item === rows[0];
            }, treeOpts);

            _xeUtils.default.remove(treeExpandeds, function (item) {
              return matchObj.items.indexOf(item) > -1;
            });
          }

          if (expanded) {
            rows.forEach(function (row) {
              if (treeExpandeds.indexOf(row) === -1) {
                var rest = fullAllDataRowMap.get(row);
                var isLoad = lazy && row[hasChild] && !rest.treeLoaded && treeLazyLoadeds.indexOf(row) === -1; // 是否使用懒加载

                if (isLoad) {
                  result.push(_this46.handleAsyncTreeExpandChilds(row));
                } else {
                  if (row[children] && row[children].length) {
                    treeExpandeds.push(row);
                  }
                }
              }
            });
          } else {
            _xeUtils.default.remove(treeExpandeds, function (row) {
              return rows.indexOf(row) > -1;
            });
          }

          return Promise.all(result).then(this.recalculate);
        }
      }

      return Promise.resolve();
    },
    // 在 v3.0 中废弃 hasTreeExpand
    hasTreeExpand: function hasTreeExpand(row) {
      _tools.UtilTools.warn('vxe.error.delFunc', ['hasTreeExpand', 'isTreeExpandByRow']);

      return this.isTreeExpandByRow(row);
    },

    /**
     * 判断行是否为树形节点展开状态
     * @param {Row} row 行对象
     */
    isTreeExpandByRow: function isTreeExpandByRow(row) {
      return this.treeExpandeds.indexOf(row) > -1;
    },
    clearTreeExpand: function clearTreeExpand() {
      var _this47 = this;

      var isExists = this.treeExpandeds.length;
      this.treeExpandeds = [];
      return this.$nextTick().then(function () {
        return isExists ? _this47.recalculate() : 0;
      });
    },

    /**
     * 是否启用了横向 X 可视渲染
     */
    isScrollXLoad: function isScrollXLoad() {
      _tools.UtilTools.warn('vxe.error.delFunc', ['isScrollXLoad', 'getVirtualScroller']);

      return this.scrollXLoad;
    },

    /**
     * 是否启用了纵向 Y 可视渲染
     */
    isScrollYLoad: function isScrollYLoad() {
      _tools.UtilTools.warn('vxe.error.delFunc', ['isScrollYLoad', 'getVirtualScroller']);

      return this.scrollYLoad;
    },

    /**
     * 获取虚拟滚动状态
     */
    getVirtualScroller: function getVirtualScroller() {
      var $refs = this.$refs,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad;
      var bodyElem = $refs.tableBody.$el;
      return {
        scrollX: scrollXLoad,
        scrollY: scrollYLoad,
        scrollTop: bodyElem.scrollTop,
        scrollLeft: bodyElem.scrollLeft
      };
    },

    /**
     * 横向 X 可视渲染事件处理
     */
    triggerScrollXEvent: function triggerScrollXEvent(evnt) {
      this.updateVirtualScrollX();
    },
    updateVirtualScrollX: function updateVirtualScrollX(force) {
      var $refs = this.$refs,
          visibleColumn = this.visibleColumn,
          scrollXStore = this.scrollXStore;
      var startIndex = scrollXStore.startIndex,
          renderSize = scrollXStore.renderSize,
          offsetSize = scrollXStore.offsetSize,
          visibleSize = scrollXStore.visibleSize;
      var scrollBodyElem = $refs.tableBody.$el;
      var scrollLeft = scrollBodyElem.scrollLeft;
      var toVisibleIndex = 0;
      var width = 0;
      var preload = force || false;

      for (var index = 0; index < visibleColumn.length; index++) {
        width += visibleColumn[index].renderWidth;

        if (scrollLeft < width) {
          toVisibleIndex = index;
          break;
        }
      }

      if (force || scrollXStore.visibleIndex !== toVisibleIndex) {
        var marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize);

        if (scrollXStore.visibleIndex === toVisibleIndex) {
          scrollXStore.startIndex = toVisibleIndex;
        } else if (scrollXStore.visibleIndex > toVisibleIndex) {
          // 向左
          preload = toVisibleIndex - offsetSize <= startIndex;

          if (preload) {
            scrollXStore.startIndex = Math.max(0, Math.max(marginSize, toVisibleIndex - marginSize));
          }
        } else {
          // 向右
          preload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;

          if (preload) {
            scrollXStore.startIndex = Math.max(0, Math.min(visibleColumn.length - renderSize, toVisibleIndex - marginSize));
          }
        }

        if (preload) {
          this.updateScrollXData();
        }

        scrollXStore.visibleIndex = toVisibleIndex;
      }

      this.clostTooltip();
    },

    /**
     * 纵向 Y 可视渲染事件处理
     */
    triggerScrollYEvent: _xeUtils.default.debounce(function (evnt) {
      var afterFullData = this.afterFullData,
          scrollYStore = this.scrollYStore,
          isLoadData = this.isLoadData;
      var startIndex = scrollYStore.startIndex,
          renderSize = scrollYStore.renderSize,
          offsetSize = scrollYStore.offsetSize,
          visibleSize = scrollYStore.visibleSize,
          rowHeight = scrollYStore.rowHeight;
      var scrollBodyElem = evnt.target;
      var scrollTop = scrollBodyElem.scrollTop;
      var toVisibleIndex = Math.ceil(scrollTop / rowHeight);
      var preload = false;

      if (isLoadData || scrollYStore.visibleIndex !== toVisibleIndex) {
        var marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize);

        if (scrollYStore.visibleIndex > toVisibleIndex) {
          // 向上
          preload = toVisibleIndex - offsetSize <= startIndex;

          if (preload) {
            scrollYStore.startIndex = Math.max(0, toVisibleIndex - Math.max(marginSize, renderSize - visibleSize));
          }
        } else {
          // 向下
          preload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;

          if (preload) {
            scrollYStore.startIndex = Math.max(0, Math.min(afterFullData.length - renderSize, toVisibleIndex - marginSize));
          }
        }

        if (preload) {
          this.updateScrollYData();
        }

        scrollYStore.visibleIndex = toVisibleIndex;
        this.isLoadData = false;
      }
    }, debounceScrollYDuration, {
      leading: false,
      trailing: true
    }),
    computeRowHeight: function computeRowHeight() {
      var tableBody = this.$refs.tableBody;
      var tableBodyElem = tableBody ? tableBody.$el : null;
      var tableHeader = this.$refs.tableHeader;
      var rowHeight;

      if (tableBodyElem) {
        var firstTrElem = tableBodyElem.querySelector('tbody>tr');

        if (!firstTrElem && tableHeader) {
          firstTrElem = tableHeader.$el.querySelector('thead>tr');
        }

        if (firstTrElem) {
          rowHeight = firstTrElem.clientHeight;
        }
      } // 默认的行高


      if (!rowHeight) {
        rowHeight = this.rowHeightMaps[this.vSize || 'default'];
      }

      this.rowHeight = rowHeight;
    },
    // 计算可视渲染相关数据
    computeScrollLoad: function computeScrollLoad() {
      var _this48 = this;

      return this.$nextTick().then(function () {
        var vSize = _this48.vSize,
            scrollXLoad = _this48.scrollXLoad,
            scrollYLoad = _this48.scrollYLoad,
            scrollYStore = _this48.scrollYStore,
            scrollXStore = _this48.scrollXStore,
            visibleColumn = _this48.visibleColumn,
            optimizeOpts = _this48.optimizeOpts,
            rowHeightMaps = _this48.rowHeightMaps;
        var scrollX = optimizeOpts.scrollX,
            scrollY = optimizeOpts.scrollY;
        var tableBody = _this48.$refs.tableBody;
        var tableBodyElem = tableBody ? tableBody.$el : null;
        var tableHeader = _this48.$refs.tableHeader;

        if (tableBodyElem) {
          // 计算 X 逻辑
          if (scrollXLoad) {
            var firstColumn = visibleColumn[0];
            var cWidth = firstColumn ? firstColumn.renderWidth : 40;

            var visibleXSize = _xeUtils.default.toNumber(scrollX.vSize || Math.ceil(tableBodyElem.clientWidth / cWidth));

            scrollXStore.visibleSize = visibleXSize; // 自动优化

            if (!scrollX.oSize) {
              scrollXStore.offsetSize = visibleXSize;
            }

            if (!scrollX.rSize) {
              scrollXStore.renderSize = visibleXSize + 4;
            }

            _this48.updateScrollXData();
          } else {
            _this48.updateScrollXSpace();
          } // 计算 Y 逻辑


          if (scrollYLoad) {
            var rHeight;

            if (scrollY.rHeight) {
              rHeight = scrollY.rHeight;
            } else {
              var firstTrElem = tableBodyElem.querySelector('tbody>tr');

              if (!firstTrElem && tableHeader) {
                firstTrElem = tableHeader.$el.querySelector('thead>tr');
              }

              if (firstTrElem) {
                rHeight = firstTrElem.clientHeight;
              }
            } // 默认的行高


            if (!rHeight) {
              rHeight = rowHeightMaps[vSize || 'default'];
            }

            var visibleYSize = _xeUtils.default.toNumber(scrollY.vSize || Math.ceil(tableBodyElem.clientHeight / rHeight));

            scrollYStore.visibleSize = visibleYSize;
            scrollYStore.rowHeight = rHeight; // 自动优化

            if (!scrollY.oSize) {
              scrollYStore.offsetSize = visibleYSize;
            }

            if (!scrollY.rSize) {
              scrollYStore.renderSize = visibleYSize * (browse.edge ? 10 : 8);
            }

            _this48.updateScrollYData();
          } else {
            _this48.updateScrollYSpace();
          }
        }

        return _this48.$nextTick();
      });
    },
    updateScrollXData: function updateScrollXData() {
      var visibleColumn = this.visibleColumn,
          scrollXStore = this.scrollXStore;
      this.tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
      this.updateScrollXSpace();
    },
    // 更新横向 X 可视渲染上下剩余空间大小
    updateScrollXSpace: function updateScrollXSpace() {
      var visibleColumn = this.visibleColumn,
          scrollXStore = this.scrollXStore;
      scrollXStore.leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
      scrollXStore.rightSpaceWidth = visibleColumn.slice(scrollXStore.startIndex + scrollXStore.renderSize, visibleColumn.length).reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
    },
    updateScrollYData: function updateScrollYData() {
      this.handleTableData();
      this.updateScrollYSpace();
    },
    // 更新纵向 Y 可视渲染上下剩余空间大小
    updateScrollYSpace: function updateScrollYSpace() {
      var scrollYStore = this.scrollYStore,
          afterFullData = this.afterFullData;
      var bodyHeight = afterFullData.length * scrollYStore.rowHeight;
      scrollYStore.ySpaceHeight = bodyHeight;
      scrollYStore.topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0);
      scrollYStore.bottomSpaceHeight = Math.max((afterFullData.length - (scrollYStore.startIndex + scrollYStore.renderSize)) * scrollYStore.rowHeight, 0);
    },
    scrollTo: function scrollTo(scrollLeft, scrollTop) {
      var _this49 = this;

      var bodyElem = this.$refs.tableBody.$el;

      if (_xeUtils.default.isNumber(scrollLeft)) {
        var tableFooter = this.$refs.tableFooter;

        if (tableFooter) {
          tableFooter.$el.scrollLeft = scrollLeft;
        } else {
          bodyElem.scrollLeft = scrollLeft;
        }
      }

      if (_xeUtils.default.isNumber(scrollTop)) {
        var rightBody = this.$refs.rightBody;

        if (rightBody) {
          rightBody.$el.scrollTop = scrollTop;
        }

        bodyElem.scrollTop = scrollTop;
      }

      if (this.scrollXLoad || this.scrollYLoad) {
        return new Promise(function (resolve) {
          return setTimeout(function () {
            return resolve(_this49.$nextTick());
          }, 50);
        });
      }

      return this.$nextTick();
    },
    scrollToRow: function scrollToRow(row, column) {
      var rest = [];

      if (row) {
        if (this.treeConfig) {
          rest.push(this.scrollToTreeRow(row));
        } else if (this.fullAllDataRowMap.has(row)) {
          rest.push(_tools.DomTools.rowToVisible(this, row));
        }
      }

      rest.push(this.scrollToColumn(column));
      return Promise.all(rest);
    },
    scrollToColumn: function scrollToColumn(column) {
      if (column && this.fullColumnMap.has(column)) {
        return _tools.DomTools.colToVisible(this, column);
      }

      return this.$nextTick();
    },
    scrollToTreeRow: function scrollToTreeRow(row) {
      var _this50 = this;

      var tableFullData = this.tableFullData,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;

      if (treeConfig) {
        var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
          return item === row;
        }, treeOpts);

        if (matchObj) {
          var nodes = matchObj.nodes;
          nodes.forEach(function (row, index) {
            if (index < nodes.length - 1 && !_this50.hasTreeExpand(row)) {
              _this50.setTreeExpansion(row, true);
            }
          });
        }
      }

      return this.$nextTick();
    },
    clearScroll: function clearScroll() {
      var _this51 = this;

      this.updateScrollXSpace();
      this.updateScrollYSpace();
      return this.$nextTick().then(function () {
        var $refs = _this51.$refs;
        var tableBody = $refs.tableBody;
        var tableBodyElem = tableBody ? tableBody.$el : null;
        var tableFooter = $refs.tableFooter;
        var tableFooterElem = tableFooter ? tableFooter.$el : null;
        var footerTargetElem = tableFooterElem || tableBodyElem;

        if (tableBodyElem) {
          tableBodyElem.scrollTop = 0;
        }

        if (footerTargetElem) {
          footerTargetElem.scrollLeft = 0;
        }

        return new Promise(function (resolve) {
          return setTimeout(function () {
            return resolve(_this51.$nextTick());
          });
        });
      });
    },

    /**
     * 更新表尾合计
     */
    updateFooter: function updateFooter() {
      var showFooter = this.showFooter,
          tableColumn = this.tableColumn,
          footerMethod = this.footerMethod;

      if (showFooter && footerMethod) {
        this.footerData = tableColumn.length ? footerMethod({
          columns: tableColumn,
          data: this.afterFullData
        }) : [];
      }

      return this.$nextTick();
    },

    /**
     * 更新列状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    updateStatus: function updateStatus(scope, cellValue) {
      var _this52 = this;

      var customVal = !_xeUtils.default.isUndefined(cellValue);
      return this.$nextTick().then(function () {
        var $refs = _this52.$refs,
            tableData = _this52.tableData,
            editRules = _this52.editRules,
            validStore = _this52.validStore;

        if (scope && $refs.tableBody && editRules) {
          var row = scope.row,
              column = scope.column;
          var type = 'change';

          if (_this52.hasCellRules(type, row, column)) {
            var rowIndex = tableData.indexOf(row);

            var cell = _tools.DomTools.getCell(_this52, {
              row: row,
              rowIndex: rowIndex,
              column: column
            });

            if (cell) {
              return _this52.validCellRules(type, row, column, cellValue).then(function () {
                if (customVal && validStore.visible) {
                  _tools.UtilTools.setCellValue(row, column, cellValue);
                }

                _this52.clearValidate();
              }).catch(function (_ref5) {
                var rule = _ref5.rule;

                if (customVal) {
                  _tools.UtilTools.setCellValue(row, column, cellValue);
                }

                _this52.showValidTooltip({
                  rule: rule,
                  row: row,
                  column: column,
                  cell: cell
                });
              });
            }
          }
        }
      });
    },
    triggerValidate: function triggerValidate(type) {
      var _this53 = this;

      var editConfig = this.editConfig,
          editStore = this.editStore,
          editRules = this.editRules,
          validStore = this.validStore;
      var actived = editStore.actived; // let type = validStore.visible ? 'all' : 'blur'
      // this.clearValidate()

      if (actived.row && editRules) {
        var _actived$args = actived.args,
            row = _actived$args.row,
            column = _actived$args.column,
            cell = _actived$args.cell; // if (editConfig.mode === 'row') {
        //   return this.validRowRules(type, row)
        //     .catch(params => {
        //       this.handleValidError(params)
        //       return Promise.reject(params)
        //     })
        // } else {

        if (this.hasCellRules(type, row, column)) {
          return this.validCellRules(type, row, column).then(function () {
            if (editConfig.mode === 'row') {
              if (validStore.visible && validStore.row === row && validStore.column === column) {
                _this53.clearValidate();
              }
            }
          }).catch(function (_ref6) {
            var rule = _ref6.rule;

            // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
            if (!rule.trigger || type === rule.trigger) {
              var rest = {
                rule: rule,
                row: row,
                column: column,
                cell: cell
              };

              _this53.showValidTooltip(rest);

              return Promise.reject(rest);
            }

            return Promise.resolve();
          });
        } // }

      }

      return Promise.resolve();
    },

    /**
     * 与 validate 一致行为，区别就是会校验所有并返回所有不通过的所有列
     */
    fullValidate: function fullValidate(rows, cb) {
      return this.beginValidate(rows, cb, true);
    },

    /**
     * 对表格数据进行校验
     */
    validate: function validate(rows, cb) {
      return this.beginValidate(rows, cb);
    },

    /**
     * 对表格数据进行校验
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    beginValidate: function beginValidate(rows, cb, isAll) {
      var _this54 = this;

      var validRest = {};
      var status = true;
      var editRules = this.editRules,
          afterFullData = this.afterFullData,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;
      var vaildDatas = afterFullData;

      if (rows) {
        if (_xeUtils.default.isFunction(rows)) {
          cb = rows;
        } else {
          vaildDatas = _xeUtils.default.isArray(rows) ? rows : [rows];
        }
      }

      var rowValids = [];
      this.lastCallTime = Date.now();
      this.clearValidate();

      if (editRules) {
        var columns = this.getColumns();

        var handleVaild = function handleVaild(row) {
          var colVailds = [];
          columns.forEach(function (column, columnIndex) {
            if (_xeUtils.default.has(editRules, column.property)) {
              colVailds.push(new Promise(function (resolve, reject) {
                _this54.validCellRules('all', row, column).then(resolve).catch(function (_ref7) {
                  var rule = _ref7.rule,
                      rules = _ref7.rules;
                  var rest = {
                    rule: rule,
                    rules: rules,
                    rowIndex: _this54.getRowIndex(row),
                    row: row,
                    columnIndex: columnIndex,
                    column: column,
                    $table: _this54
                  };

                  if (isAll) {
                    if (!validRest[column.property]) {
                      validRest[column.property] = [];
                    }

                    validRest[column.property].push(rest);
                    return resolve();
                  }

                  return reject(rest);
                });
              }));
            }
          });
          rowValids.push(Promise.all(colVailds));
        };

        if (treeConfig) {
          _xeUtils.default.eachTree(vaildDatas, handleVaild, treeOpts);
        } else {
          vaildDatas.forEach(handleVaild);
        }

        return Promise.all(rowValids).then(function () {
          var ruleProps = Object.keys(validRest);

          if (ruleProps.length) {
            return Promise.reject(validRest[ruleProps[0]][0]);
          }

          if (cb) {
            cb(status);
          }
        }).catch(function (params) {
          var args = isAll ? validRest : _defineProperty({}, params.column.property, params);
          return new Promise(function (resolve, reject) {
            var finish = function finish() {
              status = false;

              if (cb) {
                cb(status, args);
                resolve();
              } else {
                reject(args);
              }
            };

            var posAndFinish = function posAndFinish() {
              params.cell = _tools.DomTools.getCell(_this54, params);

              _this54.handleValidError(params);

              finish();
            };
            /**
             * 当校验不通过时
             * 将表格滚动到可视区
             * 由于提示信息至少需要占一行，定位向上偏移一行
             */


            var row = params.row;
            var rowIndex = afterFullData.indexOf(row);
            var locatRow = rowIndex > 0 ? afterFullData[rowIndex - 1] : row;

            _tools.DomTools.toView(_this54.$el);

            if (_this54.validOpts.autoPos === false) {
              finish();
            } else {
              if (treeConfig) {
                _this54.scrollToTreeRow(locatRow).then(posAndFinish);
              } else {
                _this54.scrollToRow(locatRow).then(posAndFinish);
              }
            }
          });
        });
      }

      if (cb) {
        cb(status);
      }

      return Promise.resolve();
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
    hasCellRules: function hasCellRules(type, row, column) {
      var editRules = this.editRules;
      var property = column.property;

      if (property && editRules) {
        var rules = _xeUtils.default.get(editRules, property);

        return rules && _xeUtils.default.find(rules, function (rule) {
          return type === 'all' || !rule.trigger || type === rule.trigger;
        });
      }

      return false;
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
    validCellRules: function validCellRules(type, row, column, cellValue) {
      var _this55 = this;

      var editRules = this.editRules;
      var property = column.property;
      var errorRules = [];
      var cellVailds = [];

      if (property && editRules) {
        var rules = _xeUtils.default.get(editRules, property);

        var value = _xeUtils.default.isUndefined(cellValue) ? _xeUtils.default.get(row, property) : cellValue;

        if (rules) {
          rules.forEach(function (rule) {
            cellVailds.push(new Promise(function (resolve) {
              var isRequired = rule.required === true;

              if (type === 'all' || !rule.trigger || type === rule.trigger) {
                if (_xeUtils.default.isFunction(rule.validator)) {
                  rule.validator(rule, value, function (e) {
                    if (_xeUtils.default.isError(e)) {
                      var cusRule = {
                        type: 'custom',
                        trigger: rule.trigger,
                        message: e.message,
                        rule: rule
                      };
                      errorRules.push(new Rule(cusRule));
                    }

                    return resolve();
                  }, {
                    rules: rules,
                    row: row,
                    column: column,
                    rowIndex: _this55.getRowIndex(row),
                    columnIndex: _this55.getColumnMapIndex(column)
                  });
                } else {
                  var len;
                  var restVal = value;
                  var isNumber = rule.type === 'number';
                  var isEmpty = value === null || value === undefined || value === '';

                  if (isNumber) {
                    restVal = _xeUtils.default.toNumber(value);
                  } else {
                    len = _xeUtils.default.getSize(restVal);
                  }

                  if (isRequired && isEmpty) {
                    errorRules.push(new Rule(rule));
                  } else if (isNumber && isNaN(value) || _xeUtils.default.isRegExp(rule.pattern) && !rule.pattern.test(value) || _xeUtils.default.isNumber(rule.min) && (isNumber ? restVal < rule.min : len < rule.min) || _xeUtils.default.isNumber(rule.max) && (isNumber ? restVal > rule.max : len > rule.max)) {
                    errorRules.push(new Rule(rule));
                  }

                  resolve();
                }
              } else {
                resolve();
              }
            }));
          });
        }
      }

      return Promise.all(cellVailds).then(function () {
        if (errorRules.length) {
          var rest = {
            rules: errorRules,
            rule: errorRules[0]
          };
          return Promise.reject(rest);
        }
      });
    },
    clearValidate: function clearValidate() {
      var validTip = this.$refs.validTip;
      Object.assign(this.validStore, {
        visible: false,
        row: null,
        column: null,
        content: '',
        rule: null
      });

      if (validTip && validTip.visible) {
        validTip.close();
      }

      return this.$nextTick();
    },

    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    handleValidError: function handleValidError(params) {
      var _this56 = this;

      if (this.validOpts.autoPos === false) {
        _tools.UtilTools.emitEvent(this, 'valid-error', [params]);
      } else {
        this.handleActived(params, {
          type: 'valid-error',
          trigger: 'call'
        }).then(function () {
          return _this56.showValidTooltip(params);
        });
      }
    },

    /**
     * 弹出校验错误提示
     */
    showValidTooltip: function showValidTooltip(params) {
      var _this57 = this;

      var $refs = this.$refs,
          height = this.height,
          tableData = this.tableData,
          validOpts = this.validOpts;
      var rule = params.rule,
          row = params.row,
          column = params.column,
          cell = params.cell;
      var validTip = $refs.validTip;
      var content = rule.message;
      this.$nextTick(function () {
        Object.assign(_this57.validStore, {
          row: row,
          column: column,
          rule: rule,
          content: content,
          visible: true
        });

        if (validTip && (validOpts.message === 'tooltip' || validOpts.message === 'default' && !height && tableData.length < 2)) {
          validTip.toVisible(cell, content);
        }

        _tools.UtilTools.emitEvent(_this57, 'valid-error', [params]);
      });
    },
    // 在 v3.0 中废弃 exportCsv 方法
    exportCsv: function exportCsv(options) {
      _tools.UtilTools.warn('vxe.error.delFunc', ['exportCsv', 'exportData']);

      return this.exportData(options);
    },
    openExport: function openExport(options) {
      if (this.$toolbar) {
        return this.$toolbar.openExport(options);
      }

      throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
    },

    /**
     * 导出 csv 文件
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了可视渲染，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     */
    exportData: function exportData(options) {
      var visibleColumn = this.visibleColumn,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;
      var opts = Object.assign({
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
        columnFilterMethod: null,
        dataFilterMethod: null,
        footerFilterMethod: null
      }, _conf.default.export, options);

      if (!opts.filename) {
        opts.filename = 'export';
      }

      if (!opts.sheetName) {
        opts.sheetName = 'Sheet1';
      }

      if (!_xeUtils.default.includes(_vXETable.default.exportTypes, opts.type)) {
        throw new Error(_tools.UtilTools.getLog('vxe.error.notType', [opts.type]));
      }

      if (!opts.original) {
        if (scrollXLoad || scrollYLoad) {
          opts.original = true;

          _tools.UtilTools.warn('vxe.error.scrollOriginal');
        }
      }

      if (!options || !options.columns) {
        // 在 v3.0 中废弃 type=selection
        opts.columnFilterMethod = function (column) {
          return column.property && ['seq', 'index', 'checkbox', 'selection', 'radio'].indexOf(column.type) === -1;
        };
      }

      var columns = visibleColumn;
      var fullData = this.tableFullData;

      if (treeConfig) {
        fullData = _xeUtils.default.toTreeArray(fullData, treeOpts);
      }

      return _tools.ExportTools.handleExport(this, opts, columns, fullData);
    },
    openImport: function openImport(options) {
      if (this.$toolbar) {
        return this.$toolbar.openImport(options);
      }

      throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
    },
    importByFile: function importByFile(file, opts) {
      var _this58 = this;

      if (window.FileReader) {
        var _UtilTools$parseFile = _tools.UtilTools.parseFile(file),
            type = _UtilTools$parseFile.type,
            filename = _UtilTools$parseFile.filename;

        var options = Object.assign({
          mode: 'covering'
        }, opts, {
          type: type,
          filename: filename
        });
        var types = options.types || _vXETable.default.importTypes;

        if (_xeUtils.default.includes(types, type)) {
          this.preventEvent(null, 'event.import', {
            $table: this,
            file: file,
            options: options,
            columns: this.tableFullColumn
          }, function () {
            var reader = new FileReader();

            reader.onerror = function (e) {
              _tools.UtilTools.error('vxe.error.notType', [type]);
            };

            reader.onload = function (e) {
              _tools.ExportTools.handleImport(_this58, e.target.result.trim(), options);
            };

            reader.readAsText(file, 'UTF-8');
          });
        } else {
          _tools.UtilTools.error('vxe.error.notType', [type]);
        }
      } else {
        _tools.UtilTools.error('vxe.error.notExp');
      }
    },
    importData: function importData(options) {
      var _this59 = this;

      var opts = Object.assign({}, _conf.default.import, options);
      var rest = new Promise(function (resolve, reject) {
        _this59._importResolve = resolve;
        _this59._importReject = reject;
      });
      this.readFile(opts).then(function (evnt) {
        return _this59.importByFile(evnt.target.files[0], opts);
      }).catch(function (evnt) {
        _this59._importReject(evnt);

        _this59._importReject = null;
      });
      return rest;
    },
    readFile: function readFile() {
      var _this60 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!fileForm.parentNode) {
        document.body.appendChild(fileForm);
      }

      var types = options.types || _vXETable.default.importTypes;

      if (options.multiple) {
        fileInput.multiple = 'multiple';
      }

      fileInput.accept = ".".concat(types.join(', .'));

      fileInput.onchange = function (evnt) {
        var _UtilTools$parseFile2 = _tools.UtilTools.parseFile(evnt.target.files[0]),
            type = _UtilTools$parseFile2.type;

        if (_xeUtils.default.includes(types, type)) {
          _this60._fileResolve(evnt);
        } else {
          if (options.message !== false) {
            _this60.$XModal.message({
              message: _xeUtils.default.template(_conf.default.i18n('vxe.error.notType'), [type]),
              status: 'error'
            });
          }

          _this60._fileReject(evnt);
        }

        _this60._fileResolve = null;
      };

      fileForm.reset();
      fileInput.click();
      return new Promise(function (resolve, reject) {
        _this60._fileResolve = resolve;
        _this60._fileReject = reject;
      });
    },
    print: function print(options) {
      this.exportData(Object.assign({
        original: this.scrollXLoad || this.scrollYLoad
      }, options, {
        type: 'html',
        download: false
      })).then(function (_ref9) {
        var content = _ref9.content,
            blob = _ref9.blob;

        if (_tools.DomTools.browse.msie) {
          if (printFrame) {
            try {
              printFrame.contentDocument.write('');
              printFrame.contentDocument.clear();
            } catch (e) {}

            document.body.removeChild(printFrame);
          }

          printFrame = createFrame();
          document.body.appendChild(printFrame);
          printFrame.contentDocument.write(content);
          printFrame.contentDocument.execCommand('print');
        } else {
          if (!printFrame) {
            printFrame = createFrame();

            printFrame.onload = function (evnt) {
              if (evnt.target.src) {
                evnt.target.contentWindow.print();
              }
            };

            document.body.appendChild(printFrame);
          }

          printFrame.src = URL.createObjectURL(blob);
        }
      });
    },
    updateZindex: function updateZindex() {
      if (this.tZindex < _tools.UtilTools.getLastZIndex()) {
        this.tZindex = _tools.UtilTools.nextZIndex(this);
      }
    },

    /*************************
     * Publish methods
     *************************/
    // 与工具栏对接
    connect: function connect(_ref10) {
      var toolbar = _ref10.toolbar;
      this.$toolbar = toolbar;
    },
    // 检查触发源是否属于目标节点
    getEventTargetNode: _tools.DomTools.getEventTargetNode
    /*************************
     * Publish methods
     *************************/

  }
};
exports.default = _default2;