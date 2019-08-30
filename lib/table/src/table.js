"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _cell = _interopRequireDefault(require("../../cell"));

var _vXETable = _interopRequireWildcard(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var rowUniqueId = 0;
var browse = _tools.DomTools.browse;
var isWebkit = browse['-webkit'] && !browse.edge;
var debounceScrollYDuration = browse.msie ? 40 : 20;

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

function getRowUniqueId() {
  return "row_".concat(++rowUniqueId);
}
/**
 * 渲染浮固定列
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
      type: Boolean,
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
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: function _default() {
        return _conf.default.showHeader;
      }
    },
    // 只对 type=index 时有效，自定义序号的起始值
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
    // 合并行或列
    spanMethod: Function,
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
    params: Object
  },
  provide: function provide() {
    return {
      $table: this
    };
  },
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
    vaildTipOpts: function vaildTipOpts() {
      return Object.assign({
        isArrow: false
      }, this.tooltipConfig);
    },
    sortOpts: function sortOpts() {
      return Object.assign({}, _conf.default.sortConfig, this.sortConfig);
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
    }
  },
  watch: {
    data: function data(value) {
      if (!this._isUpdateData) {
        this.loadData(value, true).then(this.handleDefault);
      }

      this._isUpdateData = false;
    },
    customs: function customs(value) {
      if (!this.isUpdateCustoms) {
        this.mergeCustomColumn(value);
      }

      this.isUpdateCustoms = false;
    },
    collectColumn: function collectColumn(value) {
      var tableFullColumn = _tools.UtilTools.getColumnList(value);

      this.tableFullColumn = tableFullColumn;
      this.cacheColumnMap();

      if (this.customs) {
        this.mergeCustomColumn(this.customs);
      }

      this.refreshColumn();
      this.handleData(true);

      if (this.$toolbar) {
        this.$toolbar.updateColumn(tableFullColumn);
      } // 在 v3.0 中废弃 prop、label


      if (tableFullColumn.length) {
        var cIndex = Math.floor((tableFullColumn.length - 1) / 2);

        if (tableFullColumn[cIndex].prop) {
          _tools.UtilTools.warn('vxe.error.delProp');
        }

        if (tableFullColumn[cIndex].label) {
          _tools.UtilTools.warn('vxe.error.delLabel');
        }
      }
    },
    tableColumn: function tableColumn() {
      this.analyColumnWidth();
    },
    height: function height() {
      this.$nextTick(this.recalculate);
    },
    loading: function loading() {
      if (!this._isLoading) {
        this._isLoading = true;
      }
    },
    syncResize: function syncResize(value) {
      if (value) {
        this.$nextTick(this.recalculate);
      }
    }
  },
  created: function created() {
    var _this = this;

    var _Object$assign = Object.assign(this, {
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
    }),
        scrollYStore = _Object$assign.scrollYStore,
        optimizeOpts = _Object$assign.optimizeOpts,
        data = _Object$assign.data,
        loading = _Object$assign.loading;

    var scrollY = optimizeOpts.scrollY; // 是否加载过 Loading 模块

    this._isLoading = loading;

    if (!_tools.UtilTools.getRowkey(this)) {
      _tools.UtilTools.error('vxe.error.rowIdEmpty');
    }

    if (!_vXETable.default._keyboard && (this.keyboardConfig || this.mouseConfig)) {
      throw new Error(_tools.UtilTools.error('vxe.error.reqKeyboard'));
    }

    if (!_vXETable.default._resize && this.autoResize) {
      throw new Error(_tools.UtilTools.error('vxe.error.reqResize'));
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

    this.loadData(data, true).then(function () {
      _this.handleDefault();

      _this.updateStyle();
    });

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);

    _tools.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);

    _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);

    _tools.GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent);

    _tools.GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent);
  },
  mounted: function mounted() {
    if (this.autoResize && _vXETable.default._resize) {
      this.bindResize();
    }

    document.body.appendChild(this.$refs.tableWrapper);
  },
  activated: function activated() {
    var _this2 = this;

    var lastScrollLeft = this.lastScrollLeft,
        lastScrollTop = this.lastScrollTop;

    if (lastScrollLeft || lastScrollTop) {
      this.clearScroll().then(this.recalculate).then(function () {
        return _this2.scrollTo(lastScrollLeft, lastScrollTop);
      });
    }
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
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'mousedown');

    _tools.GlobalEvent.off(this, 'blur');

    _tools.GlobalEvent.off(this, 'mousewheel');

    _tools.GlobalEvent.off(this, 'keydown');

    _tools.GlobalEvent.off(this, 'resize');

    _tools.GlobalEvent.off(this, 'contextmenu');
  },
  render: function render(h) {
    var _class;

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
        _isLoading = this._isLoading,
        showHeader = this.showHeader,
        border = this.border,
        stripe = this.stripe,
        height = this.height,
        highlightHoverRow = this.highlightHoverRow,
        highlightHoverColumn = this.highlightHoverColumn,
        highlightCell = this.highlightCell,
        vSize = this.vSize,
        showOverflow = this.showOverflow,
        showHeaderOverflow = this.showHeaderOverflow,
        editConfig = this.editConfig,
        validOpts = this.validOpts,
        _this$mouseConfig = this.mouseConfig,
        mouseConfig = _this$mouseConfig === void 0 ? {} : _this$mouseConfig,
        editRules = this.editRules,
        showFooter = this.showFooter,
        footerMethod = this.footerMethod,
        overflowX = this.overflowX,
        overflowY = this.overflowY,
        scrollbarHeight = this.scrollbarHeight,
        optimizeOpts = this.optimizeOpts,
        vaildTipOpts = this.vaildTipOpts,
        tooltipConfig = this.tooltipConfig,
        columnStore = this.columnStore,
        filterStore = this.filterStore,
        ctxMenuStore = this.ctxMenuStore,
        footerData = this.footerData,
        hasTip = this.hasTip;
    var leftList = columnStore.leftList,
        rightList = columnStore.rightList;
    return h('div', {
      class: (_class = {
        'vxe-table': 1
      }, _defineProperty(_class, "size--".concat(vSize), vSize), _defineProperty(_class, 'vxe-editable', editConfig), _defineProperty(_class, 'show--head', showHeader), _defineProperty(_class, 'show--foot', showFooter), _defineProperty(_class, 'scroll--y', overflowY), _defineProperty(_class, 'scroll--x', overflowX), _defineProperty(_class, 'fixed--left', leftList.length), _defineProperty(_class, 'fixed--right', rightList.length), _defineProperty(_class, 'all-overflow', showOverflow), _defineProperty(_class, 'all-head-overflow', showHeaderOverflow), _defineProperty(_class, 'c--highlight', highlightCell), _defineProperty(_class, 't--animat', optimizeOpts.animat), _defineProperty(_class, 't--stripe', stripe), _defineProperty(_class, 't--border', border), _defineProperty(_class, 't--checked', mouseConfig.checked), _defineProperty(_class, 'is--loading', loading), _defineProperty(_class, 'row--highlight', highlightHoverRow), _defineProperty(_class, 'column--highlight', highlightHoverColumn), _class)
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
        'padding-bottom': "".concat(scrollbarHeight, "px")
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
    }) : _e(), h('div', {
      class: "vxe-table".concat(id, "-wrapper ").concat(this.$vnode.data.staticClass || ''),
      ref: 'tableWrapper'
    }, [
    /**
     * 筛选
     */
    hasFilter ? h('vxe-table-filter', {
      props: {
        optimizeOpts: optimizeOpts,
        filterStore: filterStore
      },
      ref: 'filterWrapper'
    }) : _e(),
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
      props: tooltipConfig
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
    clearAll: function clearAll() {
      this.clearScroll();
      this.clearSort();
      this.clearCurrentRow();
      this.clearCurrentColumn();
      this.clearSelection();
      this.clearRowExpand();
      this.clearTreeExpand();

      if (_vXETable.default._filter) {
        this.clearFilter();
      }

      if (this.keyboardConfig || this.mouseConfig) {
        this.clearIndexChecked();
        this.clearHeaderChecked();
        this.clearChecked();
        this.clearSelected();
        this.clearCopyed();
      }

      return this.clearActived();
    },
    refreshData: function refreshData() {
      var _this3 = this;

      return this.$nextTick().then(function () {
        _this3.tableData = [];
        return _this3.$nextTick().then(function () {
          return _this3.loadData(_this3.tableFullData);
        });
      });
    },
    updateData: function updateData() {
      return this.handleData(true).then(this.updateFooter).then(this.recalculate);
    },
    handleData: function handleData(force) {
      var scrollYLoad = this.scrollYLoad,
          scrollYStore = this.scrollYStore;
      var fullData = force ? this.updateAfterFullData() : this.afterFullData;
      this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0);
      return this.$nextTick();
    },
    loadData: function loadData(datas, notRefresh) {
      var _this4 = this;

      var height = this.height,
          maxHeight = this.maxHeight,
          editStore = this.editStore,
          optimizeOpts = this.optimizeOpts,
          recalculate = this.recalculate;
      var scrollY = optimizeOpts.scrollY;
      var tableFullData = datas ? datas.slice(0) : [];
      var scrollYLoad = scrollY && scrollY.gt && scrollY.gt < tableFullData.length;
      editStore.insertList = [];
      editStore.removeList = []; // 全量数据

      this.tableFullData = tableFullData; // 缓存数据

      this.updateCache(true); // 原始数据

      this.tableSynchData = datas;
      this.tableSourceData = _xeUtils.default.clone(tableFullData, true);
      this.scrollYLoad = scrollYLoad;

      if (scrollYLoad && !(height || maxHeight)) {
        _tools.UtilTools.error('vxe.error.scrollYHeight');
      }

      this.handleData(true);
      this.reserveCheckSelection();
      this.checkSelectionStatus();
      var rest = this.$nextTick();

      if (!notRefresh) {
        rest = rest.then(recalculate);
      }

      return rest.then(function () {
        // 如果启用了虚拟滚动，数据加载完成后还原指定位置
        var lastScrollLeft = _this4.lastScrollLeft,
            lastScrollTop = _this4.lastScrollTop;

        if (_this4.scrollXLoad || _this4.scrollYLoad) {
          if (_this4.mouseConfig) {
            _tools.UtilTools.error('vxe.error.notMouse');
          }

          if (lastScrollLeft || lastScrollTop) {
            return _this4.clearScroll().then(function () {
              return _this4.scrollTo(lastScrollLeft, lastScrollTop);
            });
          }
        }
      });
    },
    reloadData: function reloadData(datas) {
      this.clearAll();
      return this.loadData(datas).then(this.handleDefault);
    },
    loadColumn: function loadColumn(columns) {
      var _this5 = this;

      this.collectColumn = _xeUtils.default.mapTree(columns, function (column) {
        return _cell.default.createColumn(_this5, column);
      }, headerProps);
      return this.$nextTick();
    },
    reloadColumn: function reloadColumn(columns) {
      this.clearAll();
      return this.loadColumn(columns);
    },
    // 更新数据的 Map
    updateCache: function updateCache(source) {
      var _this6 = this;

      var treeConfig = this.treeConfig,
          tableFullData = this.tableFullData,
          fullDataRowIdData = this.fullDataRowIdData,
          fullDataRowMap = this.fullDataRowMap,
          fullAllDataRowMap = this.fullAllDataRowMap,
          fullAllDataRowIdData = this.fullAllDataRowIdData;

      var rowkey = _tools.UtilTools.getRowkey(this);

      var handleCache = function handleCache(row, index) {
        var rowid = _tools.UtilTools.getRowid(_this6, row);

        if (!rowid) {
          rowid = getRowUniqueId();

          _xeUtils.default.set(row, rowkey, rowid);
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
        _xeUtils.default.eachTree(tableFullData, handleCache, treeConfig);
      } else {
        tableFullData.forEach(handleCache);
      }
    },
    // 更新列的 Map
    cacheColumnMap: function cacheColumnMap() {
      var tableFullColumn = this.tableFullColumn,
          fullColumnMap = this.fullColumnMap;
      var fullColumnIdData = this.fullColumnIdData = {};
      fullColumnMap.clear();
      tableFullColumn.forEach(function (column, index) {
        var rest = {
          column: column,
          colid: column.id,
          index: index
        };
        fullColumnIdData[column.id] = rest;
        fullColumnMap.set(column, rest);
      });
    },
    getRowNode: function getRowNode(tr) {
      var _this7 = this;

      if (tr) {
        var treeConfig = this.treeConfig,
            tableFullData = this.tableFullData,
            fullAllDataRowIdData = this.fullAllDataRowIdData;
        var rowid = tr.getAttribute('data-rowid');

        if (treeConfig) {
          var matchObj = _xeUtils.default.findTree(tableFullData, function (row) {
            return _tools.UtilTools.getRowid(_this7, row) === rowid;
          }, treeConfig);

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
        var isGroup = this.isGroup,
            fullColumnIdData = this.fullColumnIdData,
            tableFullColumn = this.tableFullColumn;
        var colid = cell.getAttribute('data-colid');

        if (isGroup) {
          var matchObj = _xeUtils.default.findTree(tableFullColumn, function (column) {
            return column.id === colid;
          }, headerProps);

          if (matchObj) {
            return matchObj;
          }
        } else {
          var _fullColumnIdData$col = fullColumnIdData[colid],
              column = _fullColumnIdData$col.column,
              index = _fullColumnIdData$col.index;
          return {
            item: column,
            index: index,
            items: tableFullColumn
          };
        }
      }

      return null;
    },
    getRowIndex: function getRowIndex(row) {
      return this.fullDataRowMap.has(row) ? this.fullDataRowMap.get(row).index : -1;
    },
    getColumnIndex: function getColumnIndex(column) {
      return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1;
    },
    hasIndexColumn: function hasIndexColumn(column) {
      return column && column.type === 'index';
    },
    insert: function insert(records) {
      return this.insertAt(records);
    },

    /**
     * 从指定行插入数据
     */
    insertAt: function insertAt(records, row) {
      var _this8 = this;

      var afterFullData = this.afterFullData,
          editStore = this.editStore,
          scrollYLoad = this.scrollYLoad,
          tableFullData = this.tableFullData,
          treeConfig = this.treeConfig;

      if (treeConfig) {
        throw new Error(_tools.UtilTools.error('vxe.error.treeInsert'));
      }

      if (!_xeUtils.default.isArray(records)) {
        records = [records];
      }

      var nowData = afterFullData;
      var newRecords = records.map(function (record) {
        return _this8.defineField(Object.assign({}, record));
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
      this.handleData();
      this.updateCache();
      this.checkSelectionStatus();

      if (scrollYLoad) {
        this.updateScrollYSpace();
      }

      return this.$nextTick().then(function () {
        _this8.recalculate();

        return {
          row: newRecords.length ? newRecords[newRecords.length - 1] : null,
          rows: newRecords
        };
      });
    },
    defineField: function defineField(row) {
      var rowkey = _tools.UtilTools.getRowkey(this);

      this.visibleColumn.forEach(function (_ref) {
        var property = _ref.property,
            editRender = _ref.editRender;

        if (property && !_xeUtils.default.has(row, property)) {
          _xeUtils.default.set(row, property, editRender && !_xeUtils.default.isUndefined(editRender.defaultValue) ? editRender.defaultValue : null);
        }
      }); // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数

      if (!_xeUtils.default.get(row, rowkey)) {
        _xeUtils.default.set(row, rowkey, getRowUniqueId());
      }

      return row;
    },
    createData: function createData(records) {
      var _this9 = this;

      return this.$nextTick().then(function () {
        return records.map(_this9.defineField);
      });
    },
    createRow: function createRow(records) {
      var _this10 = this;

      var isArr = _xeUtils.default.isArray(records);

      if (!isArr) {
        records = [records];
      }

      return this.$nextTick().then(function () {
        var rows = records.map(function (record) {
          return _this10.defineField(Object.assign({}, record));
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
      var _this11 = this;

      var afterFullData = this.afterFullData,
          tableFullData = this.tableFullData,
          editStore = this.editStore,
          treeConfig = this.treeConfig,
          _this$selectConfig = this.selectConfig,
          selectConfig = _this$selectConfig === void 0 ? {} : _this$selectConfig,
          selection = this.selection,
          hasRowInsert = this.hasRowInsert,
          scrollYLoad = this.scrollYLoad;
      var removeList = editStore.removeList,
          insertList = editStore.insertList;
      var property = selectConfig.checkField;
      var rest = [];
      var nowData = afterFullData;

      if (!rows) {
        rows = tableFullData;
      } else if (!_xeUtils.default.isArray(rows)) {
        rows = [rows];
      }

      if (treeConfig) {
        rows.forEach(function (row) {
          var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
            return item === row;
          }, treeConfig);

          if (matchObj) {
            var item = matchObj.item,
                items = matchObj.items,
                index = matchObj.index; // 如果是新增，则保存记录

            if (!hasRowInsert(item)) {
              removeList.push(item);
            } // 从树节点中移除


            var restRow = items.splice(index, 1)[0]; // 如果绑定了多选属性，则更新状态

            if (!property) {
              _xeUtils.default.remove(selection, function (row) {
                return rows.indexOf(row) > -1;
              });
            }

            rest.push(restRow);
          }
        });
      } else {
        // 如果是新增，则保存记录
        rows.forEach(function (row) {
          if (!hasRowInsert(row)) {
            removeList.push(row);
          }
        }); // 如果绑定了多选属性，则更新状态

        if (!property) {
          _xeUtils.default.remove(selection, function (row) {
            return rows.indexOf(row) > -1;
          });
        } // 从数据源中移除


        if (tableFullData === rows) {
          rows = tableFullData.slice(0);
          tableFullData.length = 0;
          nowData.length = 0;
        } else {
          rest = _xeUtils.default.remove(tableFullData, function (row) {
            return rows.indexOf(row) > -1;
          });

          _xeUtils.default.remove(nowData, function (row) {
            return rows.indexOf(row) > -1;
          });
        }
      } // 从新增中移除已删除的数据


      _xeUtils.default.remove(insertList, function (row) {
        return rows.indexOf(row) > -1;
      });

      this.handleData();
      this.updateCache();
      this.checkSelectionStatus();

      if (scrollYLoad) {
        this.updateScrollYSpace();
      }

      return this.$nextTick().then(function () {
        _this11.recalculate();

        return {
          row: rows && rows.length ? rows[rows.length - 1] : null,
          rows: rest
        };
      });
    },

    /**
     * 删除选中数据
     */
    removeSelecteds: function removeSelecteds() {
      var _this12 = this;

      return this.remove(this.getSelectRecords()).then(function (params) {
        _this12.clearSelection();

        return params;
      });
    },
    revert: function revert() {
      _tools.UtilTools.warn('vxe.error.delRevert');

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
          getRowIndex = this.getRowIndex;

      if (arguments.length) {
        if (rows && !_xeUtils.default.isArray(rows)) {
          rows = [rows];
        }

        rows.forEach(function (row) {
          var rowIndex = getRowIndex(row);
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
      var tableFullData = this.tableFullData,
          visibleColumn = this.visibleColumn;

      if (!arguments.length) {
        rows = tableFullData;
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
    hasRowInsert: function hasRowInsert(row) {
      return this.editStore.insertList.indexOf(row) > -1;
    },
    hasRowChange: function hasRowChange(row, field) {
      var _this13 = this;

      var oRow, property;
      var visibleColumn = this.visibleColumn,
          treeConfig = this.treeConfig,
          tableSourceData = this.tableSourceData,
          fullDataRowIdData = this.fullDataRowIdData;

      var rowid = _tools.UtilTools.getRowid(this, row); // 新增的数据不需要检测


      if (!fullDataRowIdData[rowid]) {
        return false;
      }

      if (treeConfig) {
        var children = treeConfig.children;

        var matchObj = _xeUtils.default.findTree(tableSourceData, function (item) {
          return rowid === _tools.UtilTools.getRowid(_this13, item);
        }, treeConfig);

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
    getColumnById: function getColumnById(colid) {
      var fullColumnIdData = this.fullColumnIdData;
      return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null;
    },
    getColumnByField: function getColumnByField(field) {
      return this.visibleColumn.find(function (column) {
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
      _tools.UtilTools.warn('vxe.error.delGetRecords');

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
      _tools.UtilTools.warn('vxe.error.delGetAllRecords');

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
     * 获取新增数据
     */
    getInsertRecords: function getInsertRecords() {
      return this.editStore.insertList;
    },

    /**
     * 获取删除数据
     */
    getRemoveRecords: function getRemoveRecords() {
      return this.editStore.removeList;
    },

    /**
     * 获取选中数据
     */
    getSelectRecords: function getSelectRecords() {
      var tableFullData = this.tableFullData,
          editStore = this.editStore,
          treeConfig = this.treeConfig,
          _this$selectConfig2 = this.selectConfig,
          selectConfig = _this$selectConfig2 === void 0 ? {} : _this$selectConfig2;
      var property = selectConfig.checkField;
      var rowList = [];
      var insList = [];

      if (property) {
        if (treeConfig) {
          rowList = _xeUtils.default.filterTree(tableFullData, function (row) {
            return _xeUtils.default.get(row, property);
          }, treeConfig);
        } else {
          rowList = tableFullData.filter(function (row) {
            return _xeUtils.default.get(row, property);
          });
        }

        insList = editStore.insertList.filter(function (row) {
          return _xeUtils.default.get(row, property);
        });
      } else {
        var selection = this.selection;

        if (treeConfig) {
          rowList = _xeUtils.default.filterTree(tableFullData, function (row) {
            return selection.indexOf(row) > -1;
          }, treeConfig);
        } else {
          rowList = tableFullData.filter(function (row) {
            return selection.indexOf(row) > -1;
          });
        }

        insList = editStore.insertList.filter(function (row) {
          return selection.indexOf(row) > -1;
        });
      }

      return rowList.concat(insList);
    },

    /**
     * 获取更新数据
     * 只精准匹配 row 的更改
     * 如果是树表格，子节点更改状态不会影响父节点的更新状态
     */
    getUpdateRecords: function getUpdateRecords() {
      var tableFullData = this.tableFullData,
          hasRowChange = this.hasRowChange,
          treeConfig = this.treeConfig;

      if (treeConfig) {
        return _xeUtils.default.filterTree(tableFullData, function (row) {
          return hasRowChange(row);
        }, treeConfig);
      }

      return tableFullData.filter(function (row) {
        return hasRowChange(row);
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
          remoteFilter = this.remoteFilter;
      var tableData = tableFullData;
      var column = visibleColumn.find(function (column) {
        return column.order;
      });
      var filterColumn = visibleColumn.filter(function (_ref2) {
        var filters = _ref2.filters;
        return filters && filters.length;
      });
      tableData = tableData.filter(function (row) {
        return filterColumn.every(function (column) {
          var filters = column.filters,
              filterRender = column.filterRender;
          var compConf = filterRender ? _vXETable.Renderer.get(filterRender.name) : null;
          var valueList = [];
          var itemList = [];

          if (filters && filters.length) {
            filters.forEach(function (item) {
              if (item.checked) {
                itemList.push(item);
                valueList.push(item.value);
              }
            });

            if (valueList.length && !remoteFilter) {
              var property = column.property,
                  filterMethod = column.filterMethod;

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
          }

          return true;
        });
      });

      if (column && column.order) {
        var isRemote = _xeUtils.default.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort;

        if (!isRemote) {
          if (this.sortMethod) {
            tableData = this.sortMethod({
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
      if (this.selectConfig) {
        this.handleSelectionDefChecked();
      }

      if (this.radioConfig) {
        this.handleRadioDefChecked();
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
      var tableFullColumn = this.tableFullColumn;
      this.isUpdateCustoms = true;

      if (customColumns.length) {
        tableFullColumn.forEach(function (column) {
          // 在 v3.0 中废弃 prop
          var item = customColumns.find(function (item) {
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
      }

      this.$emit('update:customs', tableFullColumn);
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
        this.$toolbar.updateSetting();
      }

      return this.$nextTick();
    },

    /**
     * 初始化加载动态列
     */
    reloadCustoms: function reloadCustoms(customColumns) {
      var _this14 = this;

      return this.$nextTick().then(function () {
        _this14.mergeCustomColumn(customColumns);

        return _this14.refreshColumn().then(function () {
          return _this14.tableFullColumn;
        });
      });
    },

    /**
     * 刷新列信息
     * 将固定的列左边、右边分别靠边
     * 如果使用了分组表头，固定列必须在左侧或者右侧
     */
    refreshColumn: function refreshColumn() {
      var _this15 = this;

      var isColspan;
      var letIndex = 0;
      var leftList = [];
      var leftStartIndex = null;
      var rightEndIndex = null;
      var centerList = [];
      var rightList = [];
      var tableFullColumn = this.tableFullColumn,
          isGroup = this.isGroup,
          columnStore = this.columnStore,
          scrollXStore = this.scrollXStore,
          optimizeOpts = this.optimizeOpts;
      var scrollX = optimizeOpts.scrollX; // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏

      if (isGroup) {
        _xeUtils.default.eachTree(this.collectColumn, function (column) {
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
        if (this.resizable || visibleColumn.some(function (column) {
          return column.resizable;
        })) {
          _tools.UtilTools.warn('vxe.error.notResizable');
        }

        Object.assign(scrollXStore, {
          startIndex: 0,
          visibleIndex: 0,
          renderSize: _xeUtils.default.toNumber(scrollX.rSize),
          offsetSize: _xeUtils.default.toNumber(scrollX.oSize)
        });
        visibleColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
      }

      this.scrollXLoad = scrollXLoad;
      this.tableColumn = visibleColumn;
      return this.$nextTick().then(function () {
        _this15.updateFooter();

        _this15.recalculate(true);
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
          } else if (_tools.DomTools.isPx(column.width)) {
            pxList.push(column);
          } else if (_tools.DomTools.isScale(column.width)) {
            scaleList.push(column);
          } else if (_tools.DomTools.isPx(column.minWidth)) {
            pxMinList.push(column);
          } else if (_tools.DomTools.isScale(column.minWidth)) {
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
     * 计算单元格列宽，动态分配可用剩余空间
     * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
     */
    recalculate: function recalculate(refull) {
      var _this16 = this;

      var $el = this.$el,
          $refs = this.$refs;
      var tableBody = $refs.tableBody,
          tableHeader = $refs.tableHeader,
          tableFooter = $refs.tableFooter;
      var bodyElem = tableBody ? tableBody.$el : null;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;

      _tools.DomTools.addClass($el, 'is--recalculate');

      if (bodyElem) {
        this.autoCellWidth(headerElem, bodyElem, footerElem);

        if (refull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          return this.computeScrollLoad().then(function () {
            _this16.autoCellWidth(headerElem, bodyElem, footerElem);

            _this16.computeScrollLoad();

            _tools.DomTools.removeClass($el, 'is--recalculate');
          });
        }
      }

      _tools.DomTools.removeClass($el, 'is--recalculate');

      return this.computeScrollLoad();
    },
    // 列宽计算
    autoCellWidth: function autoCellWidth(headerElem, bodyElem, footerElem) {
      var meanWidth;
      var tableWidth = 0;
      var minCellWidth = 40; // 列宽最少限制 40px

      var bodyWidth = bodyElem.clientWidth;
      var remainWidth = bodyWidth;
      var $el = this.$el,
          fit = this.fit,
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

        if (fit && index === autoList.length - 1) {
          // 如果所有列足够放的情况下，修补列之间的误差
          var odiffer = bodyWidth - tableWidth;

          if (odiffer > 0) {
            column.renderWidth += odiffer;
            tableWidth = bodyWidth;
          }
        }
      });
      var tableHeight = bodyElem.offsetHeight;
      var overflowY = bodyElem.scrollHeight > bodyElem.clientHeight;
      this.scrollbarWidth = overflowY ? bodyElem.offsetWidth - bodyWidth : 0;
      this.overflowY = overflowY;
      this.tableWidth = tableWidth;
      this.tableHeight = tableHeight;
      this.parentHeight = $el.parentNode.clientHeight;

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
    updateStyle: function updateStyle() {
      var $refs = this.$refs,
          fullColumnIdData = this.fullColumnIdData,
          maxHeight = this.maxHeight,
          height = this.height,
          parentHeight = this.parentHeight,
          border = this.border,
          tableColumn = this.tableColumn,
          headerHeight = this.headerHeight,
          allColumnHeaderOverflow = this.showHeaderOverflow,
          showFooter = this.showFooter,
          allColumnOverflow = this.showOverflow,
          footerHeight = this.footerHeight,
          tableHeight = this.tableHeight,
          tableWidth = this.tableWidth,
          overflowY = this.overflowY,
          scrollbarHeight = this.scrollbarHeight,
          scrollbarWidth = this.scrollbarWidth,
          scrollXLoad = this.scrollXLoad,
          columnStore = this.columnStore,
          elemStore = this.elemStore,
          currentRow = this.currentRow;
      var containerList = ['main', 'left', 'right'];
      var customHeight = height === 'auto' ? parentHeight : _tools.DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : _xeUtils.default.toNumber(height);
      containerList.forEach(function (name, index) {
        var fixedType = index > 0 ? name : '';
        var layoutList = ['header', 'body', 'footer'];
        var fixedColumn = columnStore["".concat(fixedType, "List")];
        var fixedWrapperElem = $refs["".concat(fixedType, "Container")];
        layoutList.forEach(function (layout) {
          var wrapperElem = elemStore["".concat(name, "-").concat(layout, "-wrapper")];
          var tableElem = elemStore["".concat(name, "-").concat(layout, "-table")];

          if (layout === 'header') {
            // 表头体样式处理
            // 横向滚动渲染
            var tWidth = tableWidth;

            if (scrollXLoad) {
              if (fixedType) {
                tableColumn = fixedColumn;
              }

              tWidth = tableColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, 0);
            }

            if (tableElem) {
              tableElem.style.width = tWidth === null ? tWidth : "".concat(tWidth + scrollbarWidth, "px");
            }

            var repairElem = elemStore["".concat(name, "-").concat(layout, "-repair")];

            if (repairElem) {
              repairElem.style.width = "".concat(tableWidth, "px");
            }

            var listElem = elemStore["".concat(name, "-").concat(layout, "-list")];

            if (listElem) {
              _xeUtils.default.arrayEach(listElem.querySelectorAll(".col--gutter"), function (thElem) {
                thElem.style.width = "".concat(scrollbarWidth, "px");
              });
            }
          } else if (layout === 'body') {
            var emptyBlockElem = elemStore["".concat(name, "-").concat(layout, "-emptyBlock")];

            if (wrapperElem) {
              if (customHeight > 0) {
                wrapperElem.style.height = "".concat(fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight, "px");
              } else if (maxHeight) {
                maxHeight = _tools.DomTools.isScale(maxHeight) ? Math.floor(parseInt(maxHeight) / 100 * parentHeight) : _xeUtils.default.toNumber(maxHeight);
                wrapperElem.style.maxHeight = "".concat(fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : maxHeight - headerHeight, "px");
              }
            } // 如果是固定列


            if (fixedWrapperElem) {
              var isRightFixed = fixedType === 'right';
              var _fixedColumn = columnStore["".concat(fixedType, "List")];
              wrapperElem.style.top = "".concat(headerHeight, "px");
              fixedWrapperElem.style.height = "".concat((customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1), "px");
              fixedWrapperElem.style.width = "".concat(_fixedColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, isRightFixed ? scrollbarWidth : 0), "px");
            }

            var _tWidth = tableWidth; // 如果是固定列与设置了超出隐藏

            if (fixedType && allColumnOverflow) {
              tableColumn = fixedColumn;
              _tWidth = tableColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, 0);
            } else if (scrollXLoad) {
              if (fixedType) {
                tableColumn = fixedColumn;
              }

              _tWidth = tableColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, 0);
            }

            if (tableElem) {
              tableElem.style.width = _tWidth ? "".concat(_tWidth, "px") : _tWidth; // 兼容性处理

              if (overflowY && fixedType && (browse['-moz'] || browse['safari'])) {
                tableElem.style.paddingRight = "".concat(scrollbarWidth, "px");
              }
            }

            if (emptyBlockElem) {
              emptyBlockElem.style.width = _tWidth ? "".concat(_tWidth, "px") : _tWidth;
            }
          } else if (layout === 'footer') {
            // 如果是使用优化模式
            var _tWidth2 = tableWidth;

            if (fixedType && allColumnOverflow) {
              tableColumn = fixedColumn;
              _tWidth2 = tableColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, 0);
            } else if (scrollXLoad) {
              if (fixedType) {
                tableColumn = fixedColumn;
              }

              _tWidth2 = tableColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, 0);
            }

            if (wrapperElem) {
              // 如果是固定列
              if (fixedWrapperElem) {
                wrapperElem.style.top = "".concat(customHeight ? customHeight - footerHeight : tableHeight + headerHeight, "px");
              }

              wrapperElem.style.marginTop = "".concat(-scrollbarHeight - 1, "px");
            }

            if (tableElem) {
              tableElem.style.width = _tWidth2 === null ? _tWidth2 : "".concat(_tWidth2 + scrollbarWidth, "px");
            }
          }

          var colgroupElem = elemStore["".concat(name, "-").concat(layout, "-colgroup")];

          if (colgroupElem) {
            _xeUtils.default.arrayEach(colgroupElem.children, function (colElem) {
              var colid = colElem.getAttribute('name');

              if (colid === 'col-gutter') {
                colElem.width = "".concat(scrollbarWidth || '');
              }

              if (fullColumnIdData[colid]) {
                var column = fullColumnIdData[colid].column;
                var showHeaderOverflow = column.showHeaderOverflow,
                    showOverflow = column.showOverflow,
                    renderWidth = column.renderWidth;
                var cellOverflow;
                colElem.width = "".concat(column.renderWidth || '');

                if (layout === 'header') {
                  cellOverflow = _xeUtils.default.isUndefined(showHeaderOverflow) || _xeUtils.default.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
                } else {
                  cellOverflow = _xeUtils.default.isUndefined(showOverflow) || _xeUtils.default.isNull(showOverflow) ? allColumnOverflow : showOverflow;
                }

                var showEllipsis = cellOverflow === 'ellipsis';
                var showTitle = cellOverflow === 'title';
                var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
                var hasEllipsis = showTitle || showTooltip || showEllipsis;
                var _listElem = elemStore["".concat(name, "-").concat(layout, "-list")];

                if (_listElem && hasEllipsis) {
                  _xeUtils.default.arrayEach(_listElem.querySelectorAll(".".concat(column.id)), function (thElem) {
                    var cellElem = thElem.querySelector('.vxe-cell');

                    if (cellElem) {
                      cellElem.style.width = "".concat(border ? renderWidth - 1 : renderWidth, "px");
                    }
                  });
                }
              }
            });
          }
        });
      });

      if (currentRow) {
        this.setCurrentRow(currentRow);
      }

      return this.$nextTick();
    },

    /**
     * 处理固定列的显示状态
     */
    checkScrolling: function checkScrolling() {
      var _this$$refs = this.$refs,
          tableBody = _this$$refs.tableBody,
          leftContainer = _this$$refs.leftContainer,
          rightContainer = _this$$refs.rightContainer;
      var bodyElem = tableBody ? tableBody.$el : null;

      if (bodyElem) {
        if (leftContainer) {
          _tools.DomTools[bodyElem.scrollLeft > 0 ? 'addClass' : 'removeClass'](leftContainer, 'scrolling--middle');
        }

        if (rightContainer) {
          _tools.DomTools[bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft ? 'addClass' : 'removeClass'](rightContainer, 'scrolling--middle');
        }
      }
    },
    preventEvent: function preventEvent(evnt, type, args, next, end) {
      var _this17 = this;

      var evntList = _vXETable.Interceptor.get(type);

      if (!evntList.some(function (func) {
        return func(args, evnt, _this17) === false;
      }) && next) {
        next();
      }

      if (end) {
        end();
      }
    },

    /**
     * 全局按下事件处理
     */
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var _this18 = this;

      var $el = this.$el,
          $refs = this.$refs,
          editStore = this.editStore,
          ctxMenuStore = this.ctxMenuStore,
          _this$editConfig = this.editConfig,
          editConfig = _this$editConfig === void 0 ? {} : _this$editConfig,
          filterStore = this.filterStore;
      var actived = editStore.actived;
      var filterWrapper = $refs.filterWrapper,
          validTip = $refs.validTip;

      if (filterWrapper) {
        if (this.getEventTargetNode(evnt, $el, 'vxe-filter-wrapper').flag) {// 如果点击了筛选按钮
        } else if (this.getEventTargetNode(evnt, filterWrapper.$el).flag) {// 如果点击筛选容器
        } else {
          this.preventEvent(evnt, 'event.clear_filter', filterStore.args, this.closeFilter);
        }
      } // 如果已激活了编辑状态


      if (actived.row) {
        if (!(editConfig.autoClear === false)) {
          if (validTip && this.getEventTargetNode(evnt, validTip.$el).flag) {// 如果是激活状态，且点击了校验提示框
          } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
            this.preventEvent(evnt, 'event.clear_actived', actived.args, function () {
              var isClear;
              var isReadonlyCol = !_this18.getEventTargetNode(evnt, $el, 'col--edit').flag; // row 方式

              if (editConfig.mode === 'row') {
                var rowNode = _this18.getEventTargetNode(evnt, $el, 'vxe-body--row');

                var isOtherRow = rowNode.flag ? rowNode.targetElem !== actived.args.cell.parentNode : 0;

                if (editConfig.trigger === 'manual') {
                  // manual 触发，如果点击了不同行
                  isClear = isOtherRow;
                } else {
                  // click,dblclick 触发，如果点击了不同行的非编辑列
                  isClear = isOtherRow && isReadonlyCol;
                }
              } else {
                // cell 方式，如果是非编辑列
                isClear = isReadonlyCol;
              }

              if (isClear || // 如果点击了当前表格之外
              !_this18.getEventTargetNode(evnt, $el).flag) {
                setTimeout(function () {
                  return _this18.clearActived(evnt);
                });
              }
            });
          }
        }
      } // 如果配置了快捷菜单且，点击了其他地方则关闭


      if (ctxMenuStore.visible && this.$refs.ctxWrapper && !this.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
        this.closeMenu();
      }
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
      var _this19 = this;

      var isCtxMenu = this.isCtxMenu,
          ctxMenuStore = this.ctxMenuStore,
          editStore = this.editStore,
          _this$mouseConfig2 = this.mouseConfig,
          mouseConfig = _this$mouseConfig2 === void 0 ? {} : _this$mouseConfig2,
          _this$keyboardConfig = this.keyboardConfig,
          keyboardConfig = _this$keyboardConfig === void 0 ? {} : _this$keyboardConfig,
          treeConfig = this.treeConfig,
          highlightCurrentRow = this.highlightCurrentRow,
          currentRow = this.currentRow;
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
      var isA = keyCode === 65;
      var isC = keyCode === 67;
      var isV = keyCode === 86;
      var isX = keyCode === 88;
      var isF2 = keyCode === 113;
      var isCtrlKey = evnt.ctrlKey;
      var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
      var operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow);
      var params;

      if (isEsc) {
        // 如果按下了 Esc 键，关闭快捷菜单、筛选
        this.closeMenu();
        this.closeFilter(); // 如果是激活编辑状态，则取消编辑

        if (actived.row) {
          params = actived.args;
          this.clearActived(evnt); // 如果配置了选中功能，则为选中状态

          if (mouseConfig.selected) {
            this.$nextTick(function () {
              return _this19.handleSelected(params, evnt);
            });
          }
        }
      } else if (isSpacebar && (keyboardConfig.isArrow || keyboardConfig.isTab) && selected.row && selected.column && (selected.column.type === 'selection' || selected.column.type === 'radio')) {
        // 空格键支持选中复选列
        evnt.preventDefault();

        if (selected.column.type === 'selection') {
          this.handleToggleCheckRowEvent(selected.args, evnt);
        } else {
          this.triggerRadioRowEvent(evnt, selected.args);
        }
      } else if (isEnter && (keyboardConfig.isArrow || keyboardConfig.isTab) && (selected.row || actived.row || treeConfig && highlightCurrentRow && currentRow)) {
        // 如果是激活状态，退则出到下一行
        if (selected.row || actived.row) {
          this.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, isUpArrow, isRightArrow, true, evnt);
        } else if (treeConfig && highlightCurrentRow && currentRow) {
          // 如果是树形表格当前行回车移动到子节点
          var childrens = currentRow[treeConfig.children];

          if (childrens && childrens.length) {
            evnt.preventDefault();
            var targetRow = childrens[0];
            params = {
              $table: this,
              row: targetRow
            };
            this.setTreeExpansion(currentRow, true).then(function () {
              return _this19.scrollToRow(targetRow);
            }).then(function () {
              return _this19.triggerCurrentRowEvent(evnt, params);
            });
          }
        }
      } else if (operCtxMenu) {
        // 如果配置了右键菜单; 支持方向键操作、回车
        evnt.preventDefault();

        if (ctxMenuStore.showChild && _tools.UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children);
        } else {
          this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, this.ctxMenuList);
        }
      } else if (isF2) {
        // 如果按下了 F2 键
        if (selected.row && selected.column) {
          evnt.preventDefault();
          this.handleActived(selected.args, evnt);
        }
      } else if (operArrow && keyboardConfig.isArrow) {
        // 如果按下了方向键
        if (selected.row && selected.column) {
          this.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt);
        } else if ((isUpArrow || isDwArrow) && highlightCurrentRow && currentRow) {
          // 当前行按键上下移动
          this.moveCurrentRow(isUpArrow, isDwArrow, evnt);
        }
      } else if (isTab && keyboardConfig.isTab) {
        // 如果按下了 Tab 键切换
        if (selected.row || selected.column) {
          this.moveTabSelected(selected.args, evnt);
        } else if (actived.row || actived.column) {
          this.moveTabSelected(actived.args, evnt);
        }
      } else if (isDel || (treeConfig && highlightCurrentRow && currentRow ? isBack && keyboardConfig.isArrow : isBack)) {
        // 如果是删除键
        if (keyboardConfig.isDel && (selected.row || selected.column)) {
          _tools.UtilTools.setCellValue(selected.row, selected.column, null);

          if (isBack) {
            this.handleActived(selected.args, evnt);
          }
        } else if (isBack && keyboardConfig.isArrow && treeConfig && highlightCurrentRow && currentRow) {
          // 如果树形表格回退键关闭当前行返回父节点
          var _XEUtils$findTree = _xeUtils.default.findTree(this.afterFullData, function (item) {
            return item === currentRow;
          }, treeConfig),
              parentRow = _XEUtils$findTree.parent;

          if (parentRow) {
            evnt.preventDefault();
            params = {
              $table: this,
              row: parentRow
            };
            this.setTreeExpansion(parentRow, false).then(function () {
              return _this19.scrollToRow(parentRow);
            }).then(function () {
              return _this19.triggerCurrentRowEvent(evnt, params);
            });
          }
        }
      } else if (keyboardConfig.isCut && isCtrlKey && (isA || isX || isC || isV)) {
        // 如果开启复制功能
        if (isA) {
          this.handleAllChecked(evnt);
        } else if (isX || isC) {
          this.handleCopyed(isX, evnt);
        } else {
          this.handlePaste(evnt);
        }
      } else if (keyboardConfig.isEdit && !isCtrlKey && (keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222 || keyCode === 32)) {
        // 如果是按下非功能键之外允许直接编辑
        if (selected.column && selected.row && selected.column.editRender) {
          if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
            _tools.UtilTools.setCellValue(selected.row, selected.column, null);

            this.handleActived(selected.args, evnt);
          }
        }
      }
    },
    handleGlobalResizeEvent: function handleGlobalResizeEvent() {
      this.recalculate();
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

    /**
     * 触发表头 tooltip 事件
     */
    triggerHeaderTooltipEvent: function triggerHeaderTooltipEvent(evnt, params) {
      var tooltipStore = this.tooltipStore;
      var column = params.column;

      if (tooltipStore.column !== column || !tooltipStore.visible) {
        // 在 v3.0 中废弃 label
        this.handleTooltip(evnt, column);
      }
    },

    /**
     * 触发表尾 tooltip 事件
     */
    triggerFooterTooltipEvent: function triggerFooterTooltipEvent(evnt, params) {
      var column = params.column;
      var tooltipStore = this.tooltipStore;

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
          tooltip.toVisible(cell, _tools.UtilTools.formatText(content));
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
     * 处理默认勾选
     */
    handleSelectionDefChecked: function handleSelectionDefChecked() {
      var _this$selectConfig3 = this.selectConfig,
          selectConfig = _this$selectConfig3 === void 0 ? {} : _this$selectConfig3,
          fullDataRowIdData = this.fullDataRowIdData;
      var checkAll = selectConfig.checkAll,
          checkRowKeys = selectConfig.checkRowKeys;

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
      var _this20 = this;

      if (rows && !_xeUtils.default.isArray(rows)) {
        rows = [rows];
      }

      rows.forEach(function (row) {
        return _this20.handleSelectRow({
          row: row
        }, !!value);
      });
      return this.$nextTick();
    },

    /**
     * 多选，行选中事件
     * value 选中true 不选false 不确定-1
     */
    handleSelectRow: function handleSelectRow(_ref3, value) {
      var row = _ref3.row;
      var selection = this.selection,
          tableFullData = this.tableFullData,
          _this$selectConfig4 = this.selectConfig,
          selectConfig = _this$selectConfig4 === void 0 ? {} : _this$selectConfig4,
          treeConfig = this.treeConfig,
          treeIndeterminates = this.treeIndeterminates;
      var property = selectConfig.checkField,
          checkStrictly = selectConfig.checkStrictly,
          checkMethod = selectConfig.checkMethod;

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
              }
            }, treeConfig);

            _xeUtils.default.remove(treeIndeterminates, function (item) {
              return item === row;
            });
          } // 如果存在父节点，更新父节点状态


          var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
            return item === row;
          }, treeConfig);

          if (matchObj && matchObj.parent) {
            var parentStatus;
            var vItems = checkMethod ? matchObj.items.filter(function (item, $rowIndex) {
              return checkMethod({
                row: item,
                $rowIndex: $rowIndex
              });
            }) : matchObj.items;
            var indeterminatesItem = matchObj.items.find(function (item) {
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

            return this.handleSelectRow({
              row: matchObj.parent
            }, parentStatus);
          }
        } else {
          _xeUtils.default.set(row, property, value);
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
              }
            }, treeConfig);

            _xeUtils.default.remove(treeIndeterminates, function (item) {
              return item === row;
            });
          } // 如果存在父节点，更新父节点状态


          var _matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
            return item === row;
          }, treeConfig);

          if (_matchObj && _matchObj.parent) {
            var _parentStatus;

            var _vItems = checkMethod ? _matchObj.items.filter(function (item, $rowIndex) {
              return checkMethod({
                row: item,
                $rowIndex: $rowIndex
              });
            }) : _matchObj.items;

            var _indeterminatesItem = _matchObj.items.find(function (item) {
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

            return this.handleSelectRow({
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
        }
      }

      this.checkSelectionStatus();
    },
    handleToggleCheckRowEvent: function handleToggleCheckRowEvent(params, evnt) {
      var _this$selectConfig5 = this.selectConfig,
          selectConfig = _this$selectConfig5 === void 0 ? {} : _this$selectConfig5,
          selection = this.selection;
      var property = selectConfig.checkField;
      var row = params.row;
      var value = property ? !_xeUtils.default.get(row, property) : selection.indexOf(row) === -1;

      if (evnt) {
        this.triggerCheckRowEvent(evnt, params, value);
      } else {
        this.handleSelectRow(params, value);
      }
    },
    triggerCheckRowEvent: function triggerCheckRowEvent(evnt, params, value) {
      this.handleSelectRow(params, value);

      _tools.UtilTools.emitEvent(this, 'select-change', [Object.assign({
        selection: this.getSelectRecords(),
        checked: value,
        $table: this
      }, params), evnt]);
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
      var tableFullData = this.tableFullData,
          editStore = this.editStore,
          _this$selectConfig6 = this.selectConfig,
          selectConfig = _this$selectConfig6 === void 0 ? {} : _this$selectConfig6,
          treeConfig = this.treeConfig,
          selection = this.selection;
      var property = selectConfig.checkField,
          reserve = selectConfig.reserve,
          checkStrictly = selectConfig.checkStrictly,
          checkMethod = selectConfig.checkMethod;
      var insertList = editStore.insertList;
      var selectRows = []; // 包含新增的数据

      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList);
      }

      if (!checkStrictly) {
        if (property) {
          var indexKey = "".concat(treeConfig ? '$' : '', "rowIndex");

          var setValFn = function setValFn(row, rowIndex) {
            if (!checkMethod || checkMethod(_defineProperty({
              row: row
            }, indexKey, rowIndex))) {
              _xeUtils.default.set(row, property, value);
            }
          };

          var clearValFn = function clearValFn(row, rowIndex) {
            if (!checkMethod || (checkMethod(_defineProperty({
              row: row
            }, indexKey, rowIndex)) ? 0 : selection.indexOf(row) > -1)) {
              _xeUtils.default.set(row, property, value);
            }
          };

          if (treeConfig) {
            _xeUtils.default.eachTree(tableFullData, value ? setValFn : clearValFn, treeConfig);
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
              }, treeConfig);
            } else {
              if (checkMethod) {
                _xeUtils.default.eachTree(tableFullData, function (row, $rowIndex) {
                  if (checkMethod({
                    row: row,
                    $rowIndex: $rowIndex
                  }) ? 0 : selection.indexOf(row) > -1) {
                    selectRows.push(row);
                  }
                }, treeConfig);
              }
            }
          } else {
            if (value) {
              if (checkMethod) {
                selectRows = tableFullData.filter(function (row, rowIndex) {
                  return selection.indexOf(row) > -1 || checkMethod({
                    row: row,
                    rowIndex: rowIndex
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
                    rowIndex: rowIndex
                  }) ? 0 : selection.indexOf(row) > -1;
                });
              }
            }
          }
        }

        this.selection = value && reserve ? selection.concat(selectRows.filter(function (row) {
          return selection.indexOf(row) === -1;
        })) : selectRows;
      }

      this.treeIndeterminates = [];
      this.checkSelectionStatus();
    },
    checkSelectionStatus: function checkSelectionStatus() {
      var tableFullData = this.tableFullData,
          editStore = this.editStore,
          _this$selectConfig7 = this.selectConfig,
          selectConfig = _this$selectConfig7 === void 0 ? {} : _this$selectConfig7,
          selection = this.selection,
          treeIndeterminates = this.treeIndeterminates;
      var property = selectConfig.checkField,
          checkStrictly = selectConfig.checkStrictly,
          checkMethod = selectConfig.checkMethod;
      var insertList = editStore.insertList; // 包含新增的数据

      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList);
      }

      if (!checkStrictly) {
        if (property) {
          this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
            return !checkMethod({
              row: row,
              rowIndex: rowIndex
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
              rowIndex: rowIndex
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
    // 保留选中状态
    reserveCheckSelection: function reserveCheckSelection() {
      var _this$selectConfig8 = this.selectConfig,
          selectConfig = _this$selectConfig8 === void 0 ? {} : _this$selectConfig8,
          selection = this.selection,
          fullDataRowIdData = this.fullDataRowIdData;
      var reserve = selectConfig.reserve;

      var rowkey = _tools.UtilTools.getRowkey(this);

      if (reserve && selection.length) {
        this.selection = selection.map(function (row) {
          var rowid = '' + _xeUtils.default.get(row, rowkey);

          return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : row;
        });
      }
    },

    /**
     * 多选，选中所有事件
     */
    triggerCheckAllEvent: function triggerCheckAllEvent(evnt, value) {
      this.setAllSelection(value);

      _tools.UtilTools.emitEvent(this, 'select-all', [{
        selection: this.getSelectRecords(),
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
          _this$selectConfig9 = this.selectConfig,
          selectConfig = _this$selectConfig9 === void 0 ? {} : _this$selectConfig9,
          treeConfig = this.treeConfig;
      var property = selectConfig.checkField;

      if (property) {
        if (treeConfig) {
          _xeUtils.default.eachTree(tableFullData, function (item) {
            return _xeUtils.default.set(item, property, false);
          }, treeConfig);
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
      var _this$radioConfig = this.radioConfig,
          radioConfig = _this$radioConfig === void 0 ? {} : _this$radioConfig,
          fullDataRowIdData = this.fullDataRowIdData;
      var rowid = radioConfig.checkRowKey;

      if (rowid && fullDataRowIdData[rowid]) {
        this.setRadioRow(fullDataRowIdData[rowid].row);
      }
    },

    /**
     * 单选，行选中事件
     */
    triggerRadioRowEvent: function triggerRadioRowEvent(evnt, params) {
      var isChange = this.selectRow !== params.row;
      this.setRadioRow(params.row);

      if (isChange) {
        _tools.UtilTools.emitEvent(this, 'radio-change', [params, evnt]);
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
     * 高亮行，设置某一行为高亮状态，如果调不加参数，则会取消目前高亮行的选中状态
     */
    setCurrentRow: function setCurrentRow(row) {
      this.clearCurrentRow();
      this.clearCurrentColumn();
      this.currentRow = row;

      if (this.highlightCurrentRow) {
        _xeUtils.default.arrayEach(this.$el.querySelectorAll("[data-rowid=\"".concat(_tools.UtilTools.getRowid(this, row), "\"]")), function (elem) {
          return _tools.DomTools.addClass(elem, 'row--current');
        });
      }

      return this.$nextTick();
    },
    setRadioRow: function setRadioRow(row) {
      if (this.selectRow !== row) {
        this.clearRadioRow();
      }

      this.selectRow = row;
      return this.$nextTick();
    },
    clearCurrentRow: function clearCurrentRow() {
      this.currentRow = null;
      this.hoverRow = null;

      _xeUtils.default.arrayEach(this.$el.querySelectorAll('.row--current'), function (elem) {
        return _tools.DomTools.removeClass(elem, 'row--current');
      });

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
      this.setHoverRow(row);
    },
    setHoverRow: function setHoverRow(row) {
      var rowid = _tools.UtilTools.getRowid(this, row);

      this.clearHoverRow();

      _xeUtils.default.arrayEach(this.$el.querySelectorAll("[data-rowid=\"".concat(rowid, "\"]")), function (elem) {
        return _tools.DomTools.addClass(elem, 'row--hover');
      });

      this.hoverRow = row;
    },
    clearHoverRow: function clearHoverRow() {
      _xeUtils.default.arrayEach(this.$el.querySelectorAll('.vxe-body--row.row--hover'), function (elem) {
        return _tools.DomTools.removeClass(elem, 'row--hover');
      });

      this.hoverRow = null;
    },
    triggerHeaderCellClickEvent: function triggerHeaderCellClickEvent(evnt, params) {
      var _lastResizeTime = this._lastResizeTime,
          sortOpts = this.sortOpts;
      var column = params.column,
          cell = params.cell;

      var triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300;

      var triggerSort = this.getEventTargetNode(evnt, cell, 'vxe-sort-wrapper').flag;
      var triggerFilter = this.getEventTargetNode(evnt, cell, 'vxe-filter-wrapper').flag;

      if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
        this.sort(column.property);
      }

      _tools.UtilTools.emitEvent(this, 'header-cell-click', [Object.assign({
        triggerResizable: triggerResizable,
        triggerSort: triggerSort,
        triggerFilter: triggerFilter
      }, params), evnt]);

      if (this.highlightCurrentColumn) {
        return this.setCurrentColumn(column, true);
      }

      return this.$nextTick();
    },
    setCurrentColumn: function setCurrentColumn(column) {
      this.clearCurrentRow();
      this.clearCurrentColumn();
      this.currentColumn = column;

      _xeUtils.default.arrayEach(this.$el.querySelectorAll(".".concat(column.id)), function (elem) {
        return _tools.DomTools.addClass(elem, 'col--current');
      });

      return this.$nextTick();
    },
    clearCurrentColumn: function clearCurrentColumn() {
      this.currentColumn = null;

      _xeUtils.default.arrayEach(this.$el.querySelectorAll('.col--current'), function (elem) {
        return _tools.DomTools.removeClass(elem, 'col--current');
      });

      return this.$nextTick();
    },

    /**
     * 列点击事件
     * 如果是单击模式，则激活为编辑状态
     * 如果是双击模式，则单击后选中状态
     */
    triggerCellClickEvent: function triggerCellClickEvent(evnt, params) {
      var _this21 = this;

      var $el = this.$el,
          highlightCurrentRow = this.highlightCurrentRow,
          editStore = this.editStore,
          _this$radioConfig2 = this.radioConfig,
          radioConfig = _this$radioConfig2 === void 0 ? {} : _this$radioConfig2,
          _this$selectConfig10 = this.selectConfig,
          selectConfig = _this$selectConfig10 === void 0 ? {} : _this$selectConfig10,
          _this$expandConfig = this.expandConfig,
          expandConfig = _this$expandConfig === void 0 ? {} : _this$expandConfig,
          _this$treeConfig = this.treeConfig,
          treeConfig = _this$treeConfig === void 0 ? {} : _this$treeConfig,
          editConfig = this.editConfig,
          _this$mouseConfig3 = this.mouseConfig,
          mouseConfig = _this$mouseConfig3 === void 0 ? {} : _this$mouseConfig3;
      var actived = editStore.actived;
      var column = params.column,
          cell = params.cell; // 如果是展开行

      if ((expandConfig.trigger === 'row' || column.type === 'expand' && expandConfig.trigger === 'cell') && !this.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag) {
        this.triggerRowExpandEvent(evnt, params);
      } // 如果是树形表格


      if (treeConfig.trigger === 'row' || column.treeNode && treeConfig.trigger === 'cell') {
        this.triggerTreeExpandEvent(evnt, params);
      }

      if ((!column.treeNode || !this.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag) && (column.type !== 'expand' || !this.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag)) {
        // 如果是高亮行
        if (highlightCurrentRow) {
          if (radioConfig.trigger === 'row' || !this.getEventTargetNode(evnt, $el, 'vxe-checkbox').flag && !this.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
            this.triggerCurrentRowEvent(evnt, params);
          }
        } // 如果是单选


        if ((radioConfig.trigger === 'row' || column.type === 'radio' && radioConfig.trigger === 'cell') && !this.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
          this.triggerRadioRowEvent(evnt, params);
        } // 如果是多选


        if ((selectConfig.trigger === 'row' || column.type === 'selection' && selectConfig.trigger === 'cell') && !this.getEventTargetNode(evnt, params.cell, 'vxe-checkbox').flag) {
          this.handleToggleCheckRowEvent(params, evnt);
        } // 如果设置了单元格选中功能，则不会使用点击事件去处理（只能支持双击模式）


        if (!mouseConfig.checked) {
          if (editConfig) {
            if (!actived.args || cell !== actived.args.cell) {
              if (editConfig.trigger === 'click') {
                this.triggerValidate('blur').catch(function (e) {
                  return e;
                }).then(function () {
                  _this21.handleActived(params, evnt).then(function () {
                    return _this21.triggerValidate('change');
                  }).catch(function (e) {
                    return e;
                  });
                });
              } else if (editConfig.trigger === 'dblclick') {
                if (editConfig.mode === 'row' && actived.row === params.row) {
                  this.triggerValidate('blur').catch(function (e) {
                    return e;
                  }).then(function () {
                    _this21.handleActived(params, evnt).then(function () {
                      return _this21.triggerValidate('change');
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
        }
      }

      _tools.UtilTools.emitEvent(this, 'cell-click', [params, evnt]);
    },

    /**
     * 列双击点击事件
     * 如果是双击模式，则激活为编辑状态
     */
    triggerCellDBLClickEvent: function triggerCellDBLClickEvent(evnt, params) {
      var _this22 = this;

      var editStore = this.editStore,
          editConfig = this.editConfig;
      var actived = editStore.actived;

      if (editConfig && editConfig.trigger === 'dblclick') {
        if (!actived.args || evnt.currentTarget !== actived.args.cell) {
          if (editConfig.mode === 'row') {
            this.triggerValidate('blur').catch(function (e) {
              return e;
            }).then(function () {
              _this22.handleActived(params, evnt).then(function () {
                return _this22.triggerValidate('change');
              }).catch(function (e) {
                return e;
              });
            });
          } else if (editConfig.mode === 'cell') {
            this.handleActived(params, evnt).then(function () {
              return _this22.triggerValidate('change');
            }).catch(function (e) {
              return e;
            });
          }
        }
      }

      _tools.UtilTools.emitEvent(this, 'cell-dblclick', [params, evnt]);
    },

    /**
     * 处理激活编辑
     */
    handleActived: function handleActived(params, evnt) {
      var _this23 = this;

      var editStore = this.editStore,
          editConfig = this.editConfig,
          tableColumn = this.tableColumn;
      var activeMethod = editConfig.activeMethod;
      var actived = editStore.actived;
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var model = column.model,
          editRender = column.editRender;

      if (editRender && cell) {
        if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
          // 判断是否禁用编辑
          var type = 'edit-disabled';

          if (!activeMethod || activeMethod(params)) {
            if (this.keyboardConfig || this.mouseConfig) {
              this.clearCopyed(evnt);
              this.clearChecked();
              this.clearSelected(evnt);
            }

            this.clostTooltip();
            this.clearActived(evnt);
            type = 'edit-actived';
            column.renderHeight = cell.offsetHeight;
            actived.args = params;
            actived.row = row;
            actived.column = column;

            if (editConfig.mode === 'row') {
              tableColumn.forEach(function (column) {
                if (column.editRender) {
                  column.model.value = _tools.UtilTools.getCellValue(row, column);
                  column.model.update = false;
                }
              });
            } else {
              model.value = _tools.UtilTools.getCellValue(row, column);
              model.update = false;
            }

            this.$nextTick(function () {
              _this23.handleFocus(params, evnt);
            });
          }

          _tools.UtilTools.emitEvent(this, type, [params, evnt]);
        } else {
          var oldColumn = actived.column;

          if (oldColumn !== column) {
            var oldModel = oldColumn.model;

            if (oldModel.update) {
              _tools.UtilTools.setCellValue(row, oldColumn, oldModel.value);
            }

            this.clearValidate();
          }

          column.renderHeight = cell.offsetHeight;
          actived.args = params;
          actived.column = column;
          setTimeout(function () {
            _this23.handleFocus(params, evnt);
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
        var model = column.model;

        if (model.update) {
          _tools.UtilTools.setCellValue(row, column, model.value);

          model.update = false;
          model.value = null;
          this.updateFooter();
        }

        _tools.UtilTools.emitEvent(this, 'edit-closed', [args, evnt]);
      }

      actived.args = null;
      actived.row = null;
      actived.column = null;
      return this.clearValidate().then(this.recalculate);
    },
    getActiveRow: function getActiveRow() {
      var $el = this.$el,
          editStore = this.editStore,
          tableData = this.tableData;
      var _editStore$actived = editStore.actived,
          args = _editStore$actived.args,
          row = _editStore$actived.row;

      if (args && tableData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
        return Object.assign({}, args);
      }

      return null;
    },
    hasActiveRow: function hasActiveRow(row) {
      return this.editStore.actived.row === row;
    },

    /**
     * 处理聚焦
     */
    handleFocus: function handleFocus(params, evnt) {
      var column = params.column,
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
        }
      }
    },

    /**
     * 激活行编辑
     */
    setActiveRow: function setActiveRow(row) {
      return this.setActiveCell(row, this.visibleColumn.find(function (column) {
        return column.editRender;
      }).property);
    },

    /**
     * 激活单元格编辑
     */
    setActiveCell: function setActiveCell(row, field) {
      var _this24 = this;

      return this.scrollToRow(row, true).then(function () {
        if (row && field) {
          var column = _this24.visibleColumn.find(function (column) {
            return column.property === field;
          });

          if (column && column.editRender) {
            var cell = _tools.DomTools.getCell(_this24, {
              row: row,
              column: column
            });

            if (cell) {
              _this24.handleActived({
                row: row,
                rowIndex: _this24.getRowIndex(row),
                column: column,
                columnIndex: _this24.getColumnIndex(column),
                cell: cell,
                $table: _this24
              });

              _this24.lastCallTime = Date.now();
            }
          }
        }

        return _this24.$nextTick();
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
        var column = visibleColumn.find(function (column) {
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

    /**
     * 处理选中源
     */
    handleSelected: function handleSelected(params, evnt) {
      var _this25 = this;

      var _this$mouseConfig4 = this.mouseConfig,
          mouseConfig = _this$mouseConfig4 === void 0 ? {} : _this$mouseConfig4,
          editConfig = this.editConfig,
          editStore = this.editStore,
          elemStore = this.elemStore;
      var actived = editStore.actived,
          selected = editStore.selected;
      var row = params.row,
          column = params.column,
          cell = params.cell;

      var selectMethod = function selectMethod() {
        if (selected.row !== row || selected.column !== column) {
          if (actived.row !== row || (editConfig.mode === 'cell' ? actived.column !== column : false)) {
            if (_this25.keyboardConfig || _this25.mouseConfig) {
              _this25.clearChecked(evnt);

              _this25.clearIndexChecked();

              _this25.clearHeaderChecked();

              _this25.clearSelected(evnt);
            }

            _this25.clearActived(evnt);

            selected.args = params;
            selected.row = row;
            selected.column = column;

            if (mouseConfig.selected) {
              var listElem = elemStore['main-body-list'];

              var rowid = _tools.UtilTools.getRowid(_this25, row);

              var trElem = listElem.querySelector("[data-rowid=\"".concat(rowid, "\"]"));
              var tdElem = trElem.querySelector(".".concat(column.id));

              _tools.DomTools.addClass(tdElem, 'col--selected');
            } // 如果配置了批量选中功能，则为批量选中状态


            if (mouseConfig.checked) {
              var headerElem = elemStore['main-header-list'];

              _this25.handleChecked([[cell]]);

              if (headerElem) {
                _this25.handleHeaderChecked([[headerElem.querySelector(".".concat(column.id))]]);
              }

              _this25.handleIndexChecked([[cell.parentNode.querySelector('.col--index')]]);
            }
          }
        }

        return _this25.$nextTick();
      };

      return selectMethod();
    },

    /**
     * 点击排序事件
     */
    triggerSortEvent: function triggerSortEvent(evnt, column, params, order) {
      if (column.order === order) {
        this.clearSort(column.property);
      } else {
        this.sort(column.property, order);
      }
    },
    sort: function sort(field, order) {
      var visibleColumn = this.visibleColumn,
          tableFullColumn = this.tableFullColumn,
          remoteSort = this.remoteSort;
      var column = visibleColumn.find(function (item) {
        return item.property === field;
      });
      var isRemote = _xeUtils.default.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort;

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
            this.handleData(true);
          } // 在 v3.0 中废弃 prop


          _tools.UtilTools.emitEvent(this, 'sort-change', [{
            column: column,
            property: field,
            prop: field,
            field: field,
            order: order,
            $table: this
          }]);
        }

        return this.$nextTick().then(this.updateStyle);
      }

      return this.$nextTick();
    },
    clearSort: function clearSort() {
      this.tableFullColumn.forEach(function (column) {
        column.order = null;
      });
      return this.handleData(true);
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

    /**
     * 展开行事件
     */
    triggerRowExpandEvent: function triggerRowExpandEvent(evnt, _ref5) {
      var row = _ref5.row;
      var rest = this.toggleRowExpansion(row);

      _tools.UtilTools.emitEvent(this, 'toggle-expand-change', [{
        row: row,
        rowIndex: this.getRowIndex(row),
        $table: this
      }, evnt]);

      return rest;
    },

    /**
     * 切换展开行
     */
    toggleRowExpansion: function toggleRowExpansion(row) {
      return this.setRowExpansion(row);
    },

    /**
     * 处理默认展开行
     */
    handleDefaultRowExpand: function handleDefaultRowExpand() {
      var _this$expandConfig2 = this.expandConfig,
          expandConfig = _this$expandConfig2 === void 0 ? {} : _this$expandConfig2,
          tableFullData = this.tableFullData,
          fullDataRowIdData = this.fullDataRowIdData;
      var expandAll = expandConfig.expandAll,
          expandRowKeys = expandConfig.expandRowKeys;

      if (expandAll) {
        this.expandeds = tableFullData.slice(0);
      } else if (expandRowKeys) {
        var defExpandeds = [];
        expandRowKeys.forEach(function (rowid) {
          if (fullDataRowIdData[rowid]) {
            defExpandeds.push(fullDataRowIdData[rowid].row);
          }
        });
        this.expandeds = defExpandeds;
      }
    },
    setAllRowExpansion: function setAllRowExpansion(expanded) {
      this.expandeds = expanded ? this.tableFullData.slice(0) : [];
      return this.$nextTick();
    },

    /**
     * 设置展开行，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     */
    setRowExpansion: function setRowExpansion(rows, expanded) {
      var expandeds = this.expandeds,
          _this$expandConfig3 = this.expandConfig,
          expandConfig = _this$expandConfig3 === void 0 ? {} : _this$expandConfig3;
      var isToggle = arguments.length === 1;

      if (rows) {
        if (!_xeUtils.default.isArray(rows)) {
          rows = [rows];
        }

        if (expandConfig.accordion) {
          // 只能同时展开一个
          expandeds.length = 0;
          rows = rows.slice(rows.length - 1, rows.length);
        }

        rows.forEach(function (row) {
          var index = expandeds.indexOf(row);

          if (index > -1) {
            if (isToggle || !expanded) {
              expandeds.splice(index, 1);
            }
          } else {
            if (isToggle || expanded) {
              expandeds.push(row);
            }
          }
        });
      }

      return this.$nextTick();
    },
    hasRowExpand: function hasRowExpand(row) {
      return this.expandeds.indexOf(row) > -1;
    },
    clearRowExpand: function clearRowExpand() {
      this.expandeds = [];
      return this.$nextTick();
    },

    /**
     * 展开树节点事件
     */
    triggerTreeExpandEvent: function triggerTreeExpandEvent(evnt, _ref6) {
      var _this26 = this;

      var row = _ref6.row;
      var rest = this.toggleTreeExpansion(row);

      _tools.UtilTools.emitEvent(this, 'toggle-tree-change', [{
        row: row,
        rowIndex: this.getRowIndex(row),
        $table: this
      }, evnt]);

      this.$nextTick(function () {
        var currentRow = _this26.currentRow,
            currentColumn = _this26.currentColumn;

        if (currentRow) {
          _this26.setCurrentRow(currentRow);
        } else if (currentColumn) {
          _this26.setCurrentColumn(currentColumn);
        }
      });
      return rest;
    },

    /**
     * 切换/展开树节点
     */
    toggleTreeExpansion: function toggleTreeExpansion(row) {
      return this.setTreeExpansion(row);
    },

    /**
     * 处理默认展开树节点
     */
    handleDefaultTreeExpand: function handleDefaultTreeExpand() {
      var treeConfig = this.treeConfig,
          tableFullData = this.tableFullData;

      if (treeConfig) {
        var expandAll = treeConfig.expandAll,
            expandRowKeys = treeConfig.expandRowKeys;
        var children = treeConfig.children;
        var treeExpandeds = [];

        if (expandAll) {
          _xeUtils.default.filterTree(tableFullData, function (row) {
            var rowChildren = row[children];

            if (rowChildren && rowChildren.length) {
              treeExpandeds.push(row);
            }
          }, treeConfig);

          this.treeExpandeds = treeExpandeds;
        } else if (expandRowKeys) {
          var rowkey = _tools.UtilTools.getRowkey(this);

          expandRowKeys.forEach(function (rowid) {
            var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
              return rowid === _xeUtils.default.get(item, rowkey);
            }, treeConfig);

            var rowChildren = matchObj ? matchObj.item[children] : 0;

            if (rowChildren && rowChildren.length) {
              treeExpandeds.push(matchObj.item);
            }
          });
          this.treeExpandeds = treeExpandeds;
        }
      }
    },
    setAllTreeExpansion: function setAllTreeExpansion(expanded) {
      var tableFullData = this.tableFullData,
          treeConfig = this.treeConfig;
      var children = treeConfig.children;
      var treeExpandeds = [];

      if (expanded) {
        _xeUtils.default.eachTree(tableFullData, function (row) {
          var rowChildren = row[children];

          if (rowChildren && rowChildren.length) {
            treeExpandeds.push(row);
          }
        }, treeConfig);
      }

      this.treeExpandeds = treeExpandeds;
      return this.$nextTick();
    },

    /**
     * 设置展开树形节点，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     */
    setTreeExpansion: function setTreeExpansion(rows, expanded) {
      var tableFullData = this.tableFullData,
          treeExpandeds = this.treeExpandeds,
          treeConfig = this.treeConfig;
      var children = treeConfig.children;
      var isToggle = arguments.length === 1;

      if (rows) {
        if (!_xeUtils.default.isArray(rows)) {
          rows = [rows];
        }

        if (treeConfig.accordion) {
          rows = rows.slice(rows.length - 1, rows.length);
        }

        rows.forEach(function (row) {
          var rowChildren = row[children];

          if (rowChildren && rowChildren.length) {
            var index = treeExpandeds.indexOf(row);

            if (treeConfig.accordion) {
              // 同一级只能展开一个
              var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
                return item === row;
              }, treeConfig);

              _xeUtils.default.remove(treeExpandeds, function (item) {
                return matchObj.items.indexOf(item) > -1;
              });
            }

            if (index > -1) {
              if (isToggle || !expanded) {
                treeExpandeds.splice(index, 1);
              }
            } else {
              if (isToggle || expanded) {
                treeExpandeds.push(row);
              }
            }
          }
        });
      }

      return this.$nextTick();
    },
    hasTreeExpand: function hasTreeExpand(row) {
      return this.treeExpandeds.indexOf(row) > -1;
    },
    clearTreeExpand: function clearTreeExpand() {
      this.treeExpandeds = [];
      return this.$nextTick();
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
      var preload = false;

      for (var index = 0; index < visibleColumn.length; index++) {
        width += visibleColumn[index].renderWidth;

        if (scrollLeft < width) {
          toVisibleIndex = index;
          break;
        }
      }

      if (scrollXStore.visibleIndex !== toVisibleIndex) {
        var marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize);

        if (scrollXStore.visibleIndex > toVisibleIndex) {
          // 向左
          preload = toVisibleIndex - offsetSize <= startIndex;

          if (preload) {
            scrollXStore.startIndex = Math.max(0, toVisibleIndex - Math.max(marginSize, renderSize - visibleSize));
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
    triggerScrollYEvent: function triggerScrollYEvent(evnt) {
      // webkit 浏览器使用最佳的渲染方式
      if (isWebkit && this.scrollYStore.adaptive) {
        this.loadScrollYData(evnt);
      } else {
        this.debounceScrollY(evnt);
      }
    },
    debounceScrollY: _xeUtils.default.debounce(function (evnt) {
      this.loadScrollYData(evnt);
    }, debounceScrollYDuration, {
      leading: false,
      trailing: true
    }),

    /**
     * 纵向 Y 可视渲染处理
     */
    loadScrollYData: function loadScrollYData(evnt) {
      var afterFullData = this.afterFullData,
          scrollYStore = this.scrollYStore;
      var startIndex = scrollYStore.startIndex,
          renderSize = scrollYStore.renderSize,
          offsetSize = scrollYStore.offsetSize,
          visibleSize = scrollYStore.visibleSize,
          rowHeight = scrollYStore.rowHeight;
      var scrollBodyElem = evnt.target;
      var scrollTop = scrollBodyElem.scrollTop;
      var toVisibleIndex = Math.ceil(scrollTop / rowHeight);
      var preload = false;

      if (scrollYStore.visibleIndex !== toVisibleIndex) {
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
      }
    },
    // 计算可视渲染相关数据
    computeScrollLoad: function computeScrollLoad() {
      var _this27 = this;

      return this.$nextTick().then(function () {
        var vSize = _this27.vSize,
            scrollXLoad = _this27.scrollXLoad,
            scrollYLoad = _this27.scrollYLoad,
            scrollYStore = _this27.scrollYStore,
            scrollXStore = _this27.scrollXStore,
            visibleColumn = _this27.visibleColumn,
            optimizeOpts = _this27.optimizeOpts;
        var scrollX = optimizeOpts.scrollX,
            scrollY = optimizeOpts.scrollY;
        var tableBody = _this27.$refs.tableBody;
        var tableBodyElem = tableBody ? tableBody.$el : null;
        var tableHeader = _this27.$refs.tableHeader;

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
              scrollXStore.renderSize = visibleXSize + 2;
            }

            _this27.updateScrollXData();
          } else {
            _this27.updateScrollXSpace();
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
              switch (vSize) {
                case 'medium':
                  rHeight = 44;
                  break;

                case 'small':
                  rHeight = 40;
                  break;

                case 'mini':
                  rHeight = 36;
                  break;

                default:
                  rHeight = 48;
                  break;
              }
            }

            var visibleYSize = _xeUtils.default.toNumber(scrollY.vSize || Math.ceil(tableBodyElem.clientHeight / rHeight));

            scrollYStore.visibleSize = visibleYSize;
            scrollYStore.rowHeight = rHeight; // 自动优化

            if (!scrollY.oSize) {
              scrollYStore.offsetSize = visibleYSize;
            }

            if (!scrollY.rSize) {
              scrollYStore.renderSize = browse.firefox ? visibleYSize * 6 : browse.edge ? visibleYSize * 10 : isWebkit ? visibleYSize + 2 : visibleYSize * 6;
            }

            _this27.updateScrollYData();
          } else {
            _this27.updateScrollYSpace();
          }
        }

        _this27.$nextTick(_this27.updateStyle);
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
      var $refs = this.$refs,
          elemStore = this.elemStore,
          visibleColumn = this.visibleColumn,
          scrollXStore = this.scrollXStore,
          scrollXLoad = this.scrollXLoad,
          tableWidth = this.tableWidth,
          scrollbarWidth = this.scrollbarWidth;
      var tableHeader = $refs.tableHeader,
          tableBody = $refs.tableBody,
          tableFooter = $refs.tableFooter;
      var headerElem = tableHeader ? tableHeader.$el.querySelector('.vxe-table--header') : null;
      var bodyElem = tableBody.$el.querySelector('.vxe-table--body');
      var footerElem = tableFooter ? tableFooter.$el.querySelector('.vxe-table--footer') : null;
      var leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
      var marginLeft = '';

      if (scrollXLoad) {
        marginLeft = "".concat(leftSpaceWidth, "px");
      }

      if (headerElem) {
        headerElem.style.marginLeft = marginLeft;
      }

      bodyElem.style.marginLeft = marginLeft;

      if (footerElem) {
        footerElem.style.marginLeft = marginLeft;
      }

      var containerList = ['main'];
      containerList.forEach(function (name) {
        var layoutList = ['header', 'body', 'footer'];
        layoutList.forEach(function (layout) {
          var xSpaceElem = elemStore["".concat(name, "-").concat(layout, "-xSpace")];

          if (xSpaceElem) {
            xSpaceElem.style.width = scrollXLoad ? "".concat(tableWidth + (layout === 'header' ? scrollbarWidth : 0), "px") : '';
          }
        });
      });
      this.$nextTick(this.updateStyle);
    },
    updateScrollYData: function updateScrollYData() {
      this.handleData();
      this.updateScrollYSpace();
    },
    // 更新纵向 Y 可视渲染上下剩余空间大小
    updateScrollYSpace: function updateScrollYSpace() {
      var elemStore = this.elemStore,
          scrollYStore = this.scrollYStore,
          scrollYLoad = this.scrollYLoad,
          afterFullData = this.afterFullData;
      var bodyHeight = afterFullData.length * scrollYStore.rowHeight;
      var topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0);
      var containerList = ['main', 'left', 'right'];
      var marginTop = '';
      var ySpaceHeight = '';

      if (scrollYLoad) {
        marginTop = "".concat(topSpaceHeight, "px");
        ySpaceHeight = "".concat(bodyHeight, "px");
      }

      containerList.forEach(function (name) {
        var layoutList = ['header', 'body', 'footer'];
        var tableElem = elemStore["".concat(name, "-body-table")];

        if (tableElem) {
          tableElem.style.marginTop = marginTop;
        }

        layoutList.forEach(function (layout) {
          var ySpaceElem = elemStore["".concat(name, "-").concat(layout, "-ySpace")];

          if (ySpaceElem) {
            ySpaceElem.style.height = ySpaceHeight;
          }
        });
      });
      this.$nextTick(this.updateStyle);
    },
    scrollTo: function scrollTo(scrollLeft, scrollTop) {
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

      return this.$nextTick();
    },
    scrollToRow: function scrollToRow(row, column, isDelay) {
      if (row && this.fullAllDataRowMap.has(row)) {
        _tools.DomTools.rowToVisible(this, row);
      }

      return this.scrollToColumn(column, isDelay || _xeUtils.default.isBoolean(column));
    },
    scrollToColumn: function scrollToColumn(column, isDelay) {
      var _this28 = this;

      if (column && this.fullColumnMap.has(column)) {
        _tools.DomTools.colToVisible(this, column);
      }

      if (isDelay && this.scrollYLoad) {
        return new Promise(function (resolve) {
          return setTimeout(function () {
            return resolve(_this28.$nextTick());
          }, 50);
        });
      }

      return this.$nextTick();
    },
    clearScroll: function clearScroll() {
      var _this29 = this;

      this.lastScrollLeft = 0;
      this.lastScrollTop = 0;
      Object.assign(this.scrollXStore, {
        startIndex: 0,
        visibleIndex: 0
      });
      Object.assign(this.scrollYStore, {
        startIndex: 0,
        visibleIndex: 0
      });
      this.$nextTick(function () {
        var tableBody = _this29.$refs.tableBody;
        var tableBodyElem = tableBody ? tableBody.$el : null;
        var tableFooter = _this29.$refs.tableFooter;
        var tableFooterElem = tableFooter ? tableFooter.$el : null;

        if (tableBodyElem) {
          tableBodyElem.scrollTop = 0;
          tableBodyElem.scrollLeft = 0;
        }

        if (tableFooterElem) {
          tableFooterElem.scrollLeft = 0;
        }
      });
      return this.$nextTick();
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
      var _this30 = this;

      var customVal = !_xeUtils.default.isUndefined(cellValue);
      return this.$nextTick().then(function () {
        var $refs = _this30.$refs,
            tableData = _this30.tableData,
            editRules = _this30.editRules,
            validStore = _this30.validStore;

        if (scope && $refs.tableBody && editRules) {
          var row = scope.row,
              column = scope.column;
          var type = 'change';

          if (_this30.hasCellRules(type, row, column)) {
            var rowIndex = tableData.indexOf(row);

            var cell = _tools.DomTools.getCell(_this30, {
              row: row,
              rowIndex: rowIndex,
              column: column
            });

            if (cell) {
              return _this30.validCellRules(type, row, column, cellValue).then(function () {
                if (customVal && validStore.visible) {
                  _tools.UtilTools.setCellValue(row, column, cellValue);
                }

                _this30.clearValidate();
              }).catch(function (_ref7) {
                var rule = _ref7.rule;

                if (customVal) {
                  _tools.UtilTools.setCellValue(row, column, cellValue);
                }

                _this30.showValidTooltip({
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
      var _this31 = this;

      var editConfig = this.editConfig,
          editStore = this.editStore,
          editRules = this.editRules,
          validStore = this.validStore;
      var actived = editStore.actived;

      if (actived.row && editRules) {
        var _actived$args = actived.args,
            row = _actived$args.row,
            column = _actived$args.column,
            cell = _actived$args.cell;

        if (this.hasCellRules(type, row, column)) {
          return this.validCellRules(type, row, column).then(function () {
            if (editConfig.mode === 'row') {
              if (validStore.visible && validStore.row === row && validStore.column === column) {
                _this31.clearValidate();
              }
            }
          }).catch(function (_ref8) {
            var rule = _ref8.rule;

            // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
            if (!rule.trigger || type === rule.trigger) {
              var rest = {
                rule: rule,
                row: row,
                column: column,
                cell: cell
              };

              _this31.showValidTooltip(rest);

              return Promise.reject(rest);
            }

            return Promise.resolve();
          });
        }
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
      var _this32 = this;

      var validRest = {};
      var status = true;
      var editRules = this.editRules,
          tableData = this.tableData,
          tableFullData = this.tableFullData,
          scrollYLoad = this.scrollYLoad;
      var vaildDatas = scrollYLoad ? tableFullData : tableData;

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
        vaildDatas.forEach(function (row) {
          var colVailds = [];
          columns.forEach(function (column, columnIndex) {
            if (_xeUtils.default.has(editRules, column.property)) {
              colVailds.push(new Promise(function (resolve, reject) {
                _this32.validCellRules('all', row, column).then(resolve).catch(function (_ref9) {
                  var rule = _ref9.rule,
                      rules = _ref9.rules;
                  var rest = {
                    rule: rule,
                    rules: rules,
                    rowIndex: _this32.getRowIndex(row),
                    row: row,
                    columnIndex: columnIndex,
                    column: column,
                    $table: _this32
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
        });
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
              params.cell = _tools.DomTools.getCell(_this32, params);

              _this32.handleValidError(params);

              if (cb) {
                status = false;
                resolve(cb(status, args));
              } else {
                reject(args);
              }
            };

            if (scrollYLoad) {
              _this32.scrollToRow(params.row, true).then(finish);
            } else {
              finish();
            }
          });
        });
      } else {
        if (cb) {
          cb(status);
        }
      }

      return Promise.resolve(true);
    },
    hasCellRules: function hasCellRules(type, row, column) {
      var editRules = this.editRules;
      var property = column.property;

      if (property && editRules) {
        var rules = _xeUtils.default.get(editRules, property);

        return rules && rules.find(function (rule) {
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
    validCellRules: function validCellRules(type, row, column, val) {
      var _this33 = this;

      var editRules = this.editRules;
      var property = column.property;
      var errorRules = [];
      var cellVailds = [];

      if (property && editRules) {
        var rules = _xeUtils.default.get(editRules, property);

        var cellValue = _xeUtils.default.isUndefined(val) ? _xeUtils.default.get(row, property) : val;

        if (rules) {
          rules.forEach(function (rule) {
            cellVailds.push(new Promise(function (resolve) {
              var isRequired = rule.required === true;

              if (type === 'all' || !rule.trigger || type === rule.trigger) {
                if (_xeUtils.default.isFunction(rule.validator)) {
                  rule.validator(rule, cellValue, function (e) {
                    if (_xeUtils.default.isError(e)) {
                      var cusRule = {
                        type: 'custom',
                        trigger: rule.trigger,
                        message: e.message,
                        rule: new Rule(rule)
                      };
                      errorRules.push(new Rule(cusRule));
                    }

                    return resolve();
                  }, {
                    rules: rules,
                    row: row,
                    column: column,
                    rowIndex: _this33.getRowIndex(row),
                    columnIndex: _this33.getColumnIndex(column)
                  });
                } else {
                  var len;
                  var restVal = cellValue;
                  var isNumber = rule.type === 'number';
                  var isEmpty = cellValue === null || cellValue === undefined || cellValue === '';

                  if (isNumber) {
                    restVal = _xeUtils.default.toNumber(cellValue);
                  } else {
                    len = _xeUtils.default.getSize(restVal);
                  }

                  if (isRequired && isEmpty) {
                    errorRules.push(new Rule(rule));
                  } else if (isNumber && isNaN(cellValue) || _xeUtils.default.isRegExp(rule.pattern) && !rule.pattern.test(cellValue) || _xeUtils.default.isNumber(rule.min) && (isNumber ? restVal < rule.min : len < rule.min) || _xeUtils.default.isNumber(rule.max) && (isNumber ? restVal > rule.max : len > rule.max)) {
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
      var _this34 = this;

      this.handleActived(params, {
        type: 'valid-error',
        trigger: 'call'
      }).then(function () {
        return _this34.showValidTooltip(params);
      });
    },

    /**
     * 弹出校验错误提示
     */
    showValidTooltip: function showValidTooltip(params) {
      var _this35 = this;

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
        Object.assign(_this35.validStore, {
          row: row,
          column: column,
          rule: rule,
          content: content,
          visible: true
        });

        if (validTip && (validOpts.message === 'tooltip' || validOpts.message === 'default' && !height && tableData.length < 2)) {
          validTip.toVisible(cell, content);
        }

        _tools.UtilTools.emitEvent(_this35, 'valid-error', [params]);
      });
    },

    /*************************
     * Publish methods
     *************************/
    // 与工具栏对接
    connect: function connect(_ref11) {
      var toolbar = _ref11.toolbar;
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