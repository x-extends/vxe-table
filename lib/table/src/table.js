"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _body = _interopRequireDefault(require("../../body"));

var _size = _interopRequireDefault(require("../../mixins/size"));

var _tools = require("../../tools");

var _methods = _interopRequireDefault(require("./methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browse = _tools.DomTools.browse;
/**
 * 渲染浮固定列
 * 分别渲染左边固定列和右边固定列
 * 如果宽度足够情况下，则不需要渲染固定列
 * @param {Function} h 创建 VNode 函数
 * @param {Object} $xetable 表格实例
 * @param {String} fixedType 固定列类型
 */

function renderFixed(h, $xetable, fixedType) {
  var tableData = $xetable.tableData,
      tableColumn = $xetable.tableColumn,
      tableGroupColumn = $xetable.tableGroupColumn,
      vSize = $xetable.vSize,
      showHeader = $xetable.showHeader,
      showFooter = $xetable.showFooter,
      columnStore = $xetable.columnStore,
      footerData = $xetable.footerData;
  var fixedColumn = columnStore["".concat(fixedType, "List")];
  var tableChilds = [];

  if (showHeader) {
    tableChilds.push(h('vxe-table-header', {
      props: {
        fixedType: fixedType,
        tableData: tableData,
        tableColumn: tableColumn,
        tableGroupColumn: tableGroupColumn,
        size: vSize,
        fixedColumn: fixedColumn
      },
      ref: "".concat(fixedType, "Header")
    }));
  }

  tableChilds.push(h('vxe-table-body', {
    props: {
      fixedType: fixedType,
      tableData: tableData,
      tableColumn: tableColumn,
      fixedColumn: fixedColumn,
      size: vSize
    },
    ref: "".concat(fixedType, "Body")
  }));

  if (showFooter) {
    tableChilds.push(h('vxe-table-footer', {
      props: {
        footerData: footerData,
        tableColumn: tableColumn,
        fixedColumn: fixedColumn,
        fixedType: fixedType,
        size: vSize
      },
      ref: "".concat(fixedType, "Footer")
    }));
  }

  return h('div', {
    class: "vxe-table--fixed-".concat(fixedType, "-wrapper"),
    ref: "".concat(fixedType, "Container")
  }, tableChilds);
}

var _default2 = {
  name: 'VxeTable',
  mixins: [_size.default],
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
    resizable: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.resizable;
      }
    },
    // 是否带有斑马纹
    stripe: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.stripe;
      }
    },
    // 是否带有边框
    border: {
      type: [Boolean, String],
      default: function _default() {
        return _conf.default.table.border;
      }
    },
    // 是否圆角边框
    round: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.round;
      }
    },
    // 表格的尺寸
    size: {
      type: String,
      default: function _default() {
        return _conf.default.table.size || _conf.default.size;
      }
    },
    // 列的宽度是否自撑开（可能会被废弃的参数，不要使用）
    fit: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.fit;
      }
    },
    // 表格是否加载中
    loading: Boolean,
    // 所有的列对其方式
    align: {
      type: String,
      default: function _default() {
        return _conf.default.table.align;
      }
    },
    // 所有的表头列的对齐方式
    headerAlign: {
      type: String,
      default: function _default() {
        return _conf.default.table.headerAlign;
      }
    },
    // 所有的表尾列的对齐方式
    footerAlign: {
      type: String,
      default: function _default() {
        return _conf.default.table.footerAlign;
      }
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.showHeader;
      }
    },
    // 是否要高亮当前选中行
    highlightCurrentRow: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.highlightCurrentRow;
      }
    },
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.highlightHoverRow;
      }
    },
    // 是否要高亮当前选中列
    highlightCurrentColumn: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.highlightCurrentColumn;
      }
    },
    // 鼠标移到列是否要高亮显示
    highlightHoverColumn: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.highlightHoverColumn;
      }
    },
    // 激活单元格编辑时是否高亮显示
    highlightCell: Boolean,
    // 是否显示表尾合计
    showFooter: Boolean,
    // 表尾合计的计算方法
    footerMethod: {
      type: Function,
      default: function _default() {
        return _conf.default.table.footerMethod;
      }
    },
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
    showOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return _conf.default.table.showOverflow;
      }
    },
    // 设置表头所有内容过长时显示为省略号
    showHeaderOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return _conf.default.table.showHeaderOverflow;
      }
    },
    // 设置表尾所有内容过长时显示为省略号
    showFooterOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return _conf.default.table.showFooterOverflow;
      }
    },

    /** 高级属性 */
    // 主键配置
    columnKey: Boolean,
    rowKey: Boolean,
    rowId: {
      type: String,
      default: function _default() {
        return _conf.default.table.rowId;
      }
    },
    zIndex: Number,
    emptyText: String,
    keepSource: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.keepSource;
      }
    },
    // 是否自动监听父容器变化去更新响应式表格宽高
    autoResize: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.autoResize;
      }
    },
    // 是否自动根据状态属性去更新响应式表格宽高
    syncResize: [Boolean, String, Number],
    // 设置列的默认参数，仅对部分支持的属性有效
    columnConfig: Object,
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
    cloak: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.cloak;
      }
    },
    animat: {
      type: Boolean,
      default: function _default() {
        return _conf.default.table.animat;
      }
    },
    delayHover: {
      type: Number,
      default: function _default() {
        return _conf.default.table.delayHover;
      }
    },
    // 额外的参数
    params: Object
  },
  components: {
    VxeTableBody: _body.default
  },
  provide: function provide() {
    return {
      $xetable: this
    };
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  data: function data() {
    return {
      tId: "".concat(_ctor.default.uniqueId()),
      isCloak: false,
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
      // 展开列信息
      expandColumn: null,
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
        hasFooter: false,
        visible: false
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
    };
  },
  computed: {
    validOpts: function validOpts() {
      return Object.assign({
        message: 'default'
      }, _conf.default.table.validConfig, this.validConfig);
    },
    sXOpts: function sXOpts() {
      return Object.assign({}, _conf.default.table.scrollX, this.scrollX);
    },
    sYOpts: function sYOpts() {
      return Object.assign({}, _conf.default.table.scrollY, this.scrollY);
    },
    rowHeightMaps: function rowHeightMaps() {
      return {
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      };
    },
    columnOpts: function columnOpts() {
      return Object.assign({}, this.columnConfig);
    },
    seqOpts: function seqOpts() {
      return Object.assign({
        startIndex: 0
      }, _conf.default.table.seqConfig, this.seqConfig);
    },
    radioOpts: function radioOpts() {
      return Object.assign({}, _conf.default.table.radioConfig, this.radioConfig);
    },
    checkboxOpts: function checkboxOpts() {
      return Object.assign({}, _conf.default.table.checkboxConfig, this.checkboxConfig);
    },
    tooltipOpts: function tooltipOpts() {
      return Object.assign({
        leaveDelay: 300
      }, _conf.default.table.tooltipConfig, this.tooltipConfig);
    },
    vaildTipOpts: function vaildTipOpts() {
      return Object.assign({
        isArrow: false
      }, this.tooltipOpts);
    },
    editOpts: function editOpts() {
      return Object.assign({}, _conf.default.table.editConfig, this.editConfig);
    },
    sortOpts: function sortOpts() {
      return Object.assign({
        orders: ['asc', 'desc', null]
      }, _conf.default.table.sortConfig, this.sortConfig);
    },
    filterOpts: function filterOpts() {
      return Object.assign({}, _conf.default.table.filterConfig, this.filterConfig);
    },
    mouseOpts: function mouseOpts() {
      return Object.assign({}, _conf.default.table.mouseConfig, this.mouseConfig);
    },
    keyboardOpts: function keyboardOpts() {
      return Object.assign({}, this.keyboardConfig);
    },
    hasTip: function hasTip() {
      return _vXETable.default._tooltip;
    },
    headerCtxMenu: function headerCtxMenu() {
      var headerOpts = this.ctxMenuOpts.header;
      return headerOpts && headerOpts.options ? headerOpts.options : [];
    },
    bodyCtxMenu: function bodyCtxMenu() {
      var bodyOpts = this.ctxMenuOpts.body;
      return bodyOpts && bodyOpts.options ? bodyOpts.options : [];
    },
    footerCtxMenu: function footerCtxMenu() {
      var footerOpts = this.ctxMenuOpts.footer;
      return footerOpts && footerOpts.options ? footerOpts.options : [];
    },
    isCtxMenu: function isCtxMenu() {
      return this.headerCtxMenu.length || this.bodyCtxMenu.length || this.footerCtxMenu.length;
    },
    ctxMenuOpts: function ctxMenuOpts() {
      return Object.assign({}, _conf.default.table.contextMenu, this.contextMenu);
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
    exportOpts: function exportOpts() {
      return Object.assign({}, _conf.default.table.exportConfig, this.exportConfig);
    },
    importOpts: function importOpts() {
      return Object.assign({}, _conf.default.table.importConfig, this.importConfig);
    },
    printOpts: function printOpts() {
      return Object.assign({}, _conf.default.table.printConfig, this.printConfig);
    },
    expandOpts: function expandOpts() {
      return Object.assign({}, _conf.default.table.expandConfig, this.expandConfig);
    },
    treeOpts: function treeOpts() {
      return Object.assign({}, _conf.default.table.treeConfig, this.treeConfig);
    },
    emptyOpts: function emptyOpts() {
      return Object.assign({}, _conf.default.table.emptyRender, this.emptyRender);
    },
    cellOffsetWidth: function cellOffsetWidth() {
      return this.border ? Math.max(2, Math.ceil(this.scrollbarWidth / this.tableColumn.length)) : 1;
    },
    customOpts: function customOpts() {
      return Object.assign({}, _conf.default.table.customConfig, this.customConfig);
    },
    tableBorder: function tableBorder() {
      var border = this.border;

      if (border === true) {
        return 'full';
      }

      if (border) {
        return border;
      }

      return 'default';
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
            if (treeConfig) {// 暂时不支持树形结构
            } // 如果所有行都被禁用


            return tableFullData.every(function (row) {
              return !checkMethod({
                row: row
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
      var _this = this;

      this.loadTableData(value).then(function () {
        if (!_this.inited) {
          _this.inited = true;

          _this.handleDefaults();
        }

        if ((_this.scrollXLoad || _this.scrollYLoad) && _this.expandColumn) {
          _tools.UtilTools.warn('vxe.error.scrollErrProp', ['column.type=expand']);
        }
      });
    },
    staticColumns: function staticColumns(value) {
      this.handleColumn(value);
    },
    tableColumn: function tableColumn() {
      this.analyColumnWidth();
    },
    showHeader: function showHeader() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.recalculate(true).then(function () {
          return _this2.refreshScroll();
        });
      });
    },
    showFooter: function showFooter() {
      var _this3 = this;

      this.$nextTick(function () {
        _this3.recalculate(true).then(function () {
          return _this3.refreshScroll();
        });
      });
    },
    height: function height() {
      var _this4 = this;

      this.$nextTick(function () {
        return _this4.recalculate(true);
      });
    },
    maxHeight: function maxHeight() {
      var _this5 = this;

      this.$nextTick(function () {
        return _this5.recalculate(true);
      });
    },
    syncResize: function syncResize(value) {
      var _this6 = this;

      if (value) {
        var $el = this.$el; // 只在可视状态下才去更新

        if ($el.clientWidth && $el.clientHeight) {
          this.recalculate();
        }

        this.$nextTick(function () {
          setTimeout(function () {
            if ($el.clientWidth && $el.clientHeight) {
              _this6.recalculate(true);
            }
          });
        });
      }
    }
  },
  created: function created() {
    var _this7 = this;

    var _Object$assign = Object.assign(this, {
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
    }),
        scrollXStore = _Object$assign.scrollXStore,
        sYOpts = _Object$assign.sYOpts,
        scrollYStore = _Object$assign.scrollYStore,
        data = _Object$assign.data,
        editOpts = _Object$assign.editOpts,
        treeOpts = _Object$assign.treeOpts,
        treeConfig = _Object$assign.treeConfig,
        showOverflow = _Object$assign.showOverflow;

    if (!this.rowId && (this.checkboxOpts.reserve || this.checkboxOpts.checkRowKeys || this.radioOpts.reserve || this.radioOpts.checkRowKey || this.expandOpts.expandRowKeys || this.treeOpts.expandRowKeys)) {
      _tools.UtilTools.warn('vxe.error.reqProp', ['row-id']);
    }

    if (this.editConfig && editOpts.showStatus && !this.keepSource) {
      _tools.UtilTools.warn('vxe.error.reqProp', ['keep-source']);
    }

    if (treeConfig && treeOpts.line && (!this.rowKey || !showOverflow)) {
      _tools.UtilTools.warn('vxe.error.reqProp', ['row-key | show-overflow']);
    }

    if (treeConfig && this.stripe) {
      _tools.UtilTools.warn('vxe.error.noTree', ['stripe']);
    }

    var customOpts = this.customOpts;

    if (!this.id && this.customConfig && (customOpts.storage === true || customOpts.storage && customOpts.storage.resizable || customOpts.storage && customOpts.storage.visible)) {
      _tools.UtilTools.error('vxe.error.reqProp', ['id']);
    }

    if (this.treeConfig && this.checkboxOpts.range) {
      _tools.UtilTools.error('vxe.error.noTree', ['checkbox-config.range']);
    }

    if (this.mouseOpts.area && !this.handleUpdateCellAreas) {
      return _tools.UtilTools.error('vxe.error.notProp', ['mouse-config.area']);
    }

    if (this.treeConfig && this.mouseOpts.area) {
      _tools.UtilTools.error('vxe.error.noTree', ['mouse-config.area']);
    } // 检查是否有安装需要的模块


    var errorModuleName;

    if (!_vXETable.default._edit && this.editConfig) {
      errorModuleName = 'Edit';
    } else if (!_vXETable.default._valid && this.editRules) {
      errorModuleName = 'Validator';
    } else if (!_vXETable.default._keyboard && (this.keyboardConfig || this.mouseConfig)) {
      errorModuleName = 'Keyboard';
    } else if (!_vXETable.default._export && (this.importConfig || this.exportConfig)) {
      errorModuleName = 'Export';
    }

    if (errorModuleName) {
      throw new Error(_tools.UtilTools.getLog('vxe.error.reqModule', [errorModuleName]));
    }

    Object.assign(scrollYStore, {
      startIndex: 0,
      endIndex: 0,
      visibleSize: 0,
      adaptive: sYOpts.adaptive !== false
    });
    Object.assign(scrollXStore, {
      startIndex: 0,
      endIndex: 0,
      visibleSize: 0
    });

    if (this.cloak) {
      this.isCloak = true;
      setTimeout(function () {
        _this7.isCloak = false;
      }, browse ? 500 : 300);
    }

    this.loadTableData(data).then(function () {
      if (data && data.length) {
        _this7.inited = true;

        _this7.handleDefaults();
      }

      _this7.updateStyle();
    });

    _tools.GlobalEvent.on(this, 'paste', this.handleGlobalPasteEvent);

    _tools.GlobalEvent.on(this, 'copy', this.handleGlobalCopyEvent);

    _tools.GlobalEvent.on(this, 'cut', this.handleGlobalCutEvent);

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);

    _tools.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);

    _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);

    _tools.GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent);

    _tools.GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent);

    this.preventEvent(null, 'created');
  },
  mounted: function mounted() {
    var _this8 = this;

    if (this.autoResize) {
      var resizeObserver = new _tools.ResizeEvent(function () {
        return _this8.recalculate(true);
      });
      resizeObserver.observe(this.$el);
      resizeObserver.observe(this.getParentElem());
      this.$resize = resizeObserver;
    }

    this.preventEvent(null, 'mounted');
  },
  activated: function activated() {
    var _this9 = this;

    this.recalculate().then(function () {
      return _this9.refreshScroll();
    });
    this.preventEvent(null, 'activated');
  },
  deactivated: function deactivated() {
    this.preventEvent(null, 'deactivated');
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$resize) {
      this.$resize.disconnect();
    }

    this.closeFilter();
    this.closeMenu();
    this.preventEvent(null, 'beforeDestroy');
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'paste');

    _tools.GlobalEvent.off(this, 'copy');

    _tools.GlobalEvent.off(this, 'cut');

    _tools.GlobalEvent.off(this, 'mousedown');

    _tools.GlobalEvent.off(this, 'blur');

    _tools.GlobalEvent.off(this, 'mousewheel');

    _tools.GlobalEvent.off(this, 'keydown');

    _tools.GlobalEvent.off(this, 'resize');

    _tools.GlobalEvent.off(this, 'contextmenu');

    this.preventEvent(null, 'destroyed');
  },
  render: function render(h) {
    var $scopedSlots = this.$scopedSlots,
        tId = this.tId,
        tableData = this.tableData,
        tableColumn = this.tableColumn,
        tableGroupColumn = this.tableGroupColumn,
        isGroup = this.isGroup,
        loading = this.loading,
        isCloak = this.isCloak,
        stripe = this.stripe,
        showHeader = this.showHeader,
        height = this.height,
        tableBorder = this.tableBorder,
        treeOpts = this.treeOpts,
        treeConfig = this.treeConfig,
        mouseConfig = this.mouseConfig,
        mouseOpts = this.mouseOpts,
        vSize = this.vSize,
        validOpts = this.validOpts,
        showFooter = this.showFooter,
        overflowX = this.overflowX,
        overflowY = this.overflowY,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad,
        scrollbarHeight = this.scrollbarHeight,
        highlightCell = this.highlightCell,
        highlightHoverRow = this.highlightHoverRow,
        highlightHoverColumn = this.highlightHoverColumn,
        editConfig = this.editConfig,
        vaildTipOpts = this.vaildTipOpts,
        tooltipOpts = this.tooltipOpts,
        initStore = this.initStore,
        columnStore = this.columnStore,
        filterStore = this.filterStore,
        ctxMenuStore = this.ctxMenuStore,
        ctxMenuOpts = this.ctxMenuOpts,
        footerData = this.footerData,
        hasTip = this.hasTip,
        emptyRender = this.emptyRender,
        emptyOpts = this.emptyOpts;
    var tableChilds = [];
    var fixedChilds = [];
    var tableComps = [];
    var leftList = columnStore.leftList,
        rightList = columnStore.rightList;
    var emptyContent;

    if ($scopedSlots.empty) {
      emptyContent = $scopedSlots.empty.call(this, {
        $table: this
      }, h);
    } else {
      var compConf = emptyRender ? _vXETable.default.renderer.get(emptyOpts.name) : null;

      if (compConf) {
        emptyContent = compConf.renderEmpty.call(this, h, emptyOpts, {
          $table: this
        }, {
          $table: this
        });
      } else {
        emptyContent = this.emptyText || _conf.default.i18n('vxe.table.emptyText');
      }
    } // 头部


    if (showHeader) {
      tableChilds.push(h('vxe-table-header', {
        ref: 'tableHeader',
        props: {
          tableData: tableData,
          tableColumn: tableColumn,
          tableGroupColumn: tableGroupColumn,
          size: vSize
        }
      }));
    } // 主体


    tableChilds.push(h('vxe-table-body', {
      ref: 'tableBody',
      props: {
        tableData: tableData,
        tableColumn: tableColumn,
        size: vSize
      }
    })); // 表尾

    if (showFooter) {
      tableChilds.push(h('vxe-table-footer', {
        props: {
          footerData: footerData,
          tableColumn: tableColumn,
          size: vSize
        },
        ref: 'tableFooter'
      }));
    } // 左侧固定区域


    if (leftList && leftList.length && overflowX) {
      fixedChilds.push(renderFixed(h, this, 'left'));
    } // 右侧固定区域


    if (rightList && rightList.length && overflowX) {
      fixedChilds.push(renderFixed(h, this, 'right'));
    } // 部件 - 筛选


    if (initStore.filter) {
      tableComps.push(h('vxe-table-filter', {
        props: {
          filterStore: filterStore
        },
        ref: 'filterWrapper'
      }));
    } // 部件 - 导入


    if (initStore.import && this.importConfig) {
      tableComps.push(h('vxe-import-panel', {
        props: {
          defaultOptions: this.importParams,
          storeData: this.importStore
        }
      }));
    } // 部件 - 导出


    if (initStore.export && this.exportConfig) {
      tableComps.push(h('vxe-export-panel', {
        props: {
          defaultOptions: this.exportParams,
          storeData: this.exportStore
        }
      }));
    } // 部件 - 快捷菜单


    if (ctxMenuStore.visible && this.isCtxMenu) {
      tableComps.push(h('vxe-table-context-menu', {
        props: {
          ctxMenuStore: ctxMenuStore,
          ctxMenuOpts: ctxMenuOpts
        },
        ref: 'ctxWrapper'
      }));
    } // 部件 - 校验提示


    if (hasTip && this.editRules && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip')) {
      tableComps.push(h('vxe-tooltip', {
        class: 'vxe-table--valid-error',
        props: validOpts.message === 'tooltip' || tableData.length === 1 ? vaildTipOpts : null,
        ref: 'validTip'
      }));
    }

    return h('div', {
      class: ['vxe-table', "tid_".concat(tId), vSize ? "size--".concat(vSize) : '', "border--".concat(tableBorder), {
        'vxe-editable': !!editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'is--group': isGroup,
        'has--height': height,
        'has--tree-line': treeConfig && treeOpts.line,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        'c--highlight': highlightCell,
        't--animat': !!this.animat,
        'is--round': this.round,
        't--stripe': stripe,
        't--selected': mouseConfig && mouseOpts.selected,
        'is--area': mouseConfig && mouseOpts.area,
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
    }, this.$slots.default), h('div', {
      class: 'vxe-table--main-wrapper'
    }, tableChilds), h('div', {
      class: 'vxe-table--fixed-wrapper'
    }, fixedChilds),
    /**
     * 空数据
     */
    h('div', {
      ref: 'emptyPlaceholder',
      class: 'vxe-table--empty-placeholder'
    }, [h('div', {
      class: 'vxe-table--empty-content'
    }, emptyContent)]),
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
        'padding-bottom': "".concat(scrollbarHeight, "px")
      } : null,
      ref: 'resizeBar'
    }),
    /**
     * 加载中
     */
    h('div', {
      class: ['vxe-table--loading vxe-loading', {
        'is--visible': isCloak || loading
      }]
    }, [h('div', {
      class: 'vxe-loading--spinner'
    })]),
    /**
     * 工具提示
     */
    hasTip ? h('vxe-tooltip', {
      ref: 'tooltip',
      props: tooltipOpts,
      on: tooltipOpts.enterable ? {
        leave: this.handleTooltipLeaveEvent
      } : null
    }) : null].concat(tableComps));
  },
  methods: _methods.default
};
exports.default = _default2;