"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'VxeTableFooter',
  props: {
    footerData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String
  },
  mounted: function mounted() {
    var $table = this.$parent,
        $el = this.$el,
        $refs = this.$refs,
        fixedType = this.fixedType;
    var elemStore = $table.elemStore;
    var prefix = "".concat(fixedType || 'main', "-footer-");
    elemStore["".concat(prefix, "wrapper")] = $el;
    elemStore["".concat(prefix, "table")] = $refs.table;
    elemStore["".concat(prefix, "colgroup")] = $refs.colgroup;
    elemStore["".concat(prefix, "list")] = $refs.tfoot;
    elemStore["".concat(prefix, "x-space")] = $refs.xSpace;
  },
  render: function render(h) {
    var _e = this._e,
        $table = this.$parent,
        fixedType = this.fixedType,
        fixedColumn = this.fixedColumn,
        tableColumn = this.tableColumn,
        footerData = this.footerData;
    var tableListeners = $table.$listeners,
        footerRowClassName = $table.footerRowClassName,
        footerCellClassName = $table.footerCellClassName,
        scrollXLoad = $table.scrollXLoad,
        columnKey = $table.columnKey,
        allColumnOverflow = $table.showOverflow,
        overflowX = $table.overflowX,
        getColumnIndex = $table.getColumnIndex; // 如果是使用优化模式

    if (fixedType && allColumnOverflow) {
      tableColumn = fixedColumn;
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }
    }

    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper'],
      on: {
        scroll: this.scrollEvent
      }
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      ref: 'xSpace'
    }), h('table', {
      class: 'vxe-table--footer',
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      ref: 'table'
    }, [
    /**
     * 列宽
     */
    h('colgroup', {
      ref: 'colgroup'
    }, tableColumn.map(function (column) {
      return h('col', {
        attrs: {
          name: column.id
        }
      });
    }).concat([h('col', {
      name: 'col--gutter'
    })])),
    /**
     * 底部
     */
    h('tfoot', {
      ref: 'tfoot'
    }, footerData.map(function (list, $rowIndex) {
      return h('tr', {
        class: ['vxe-footer--row', footerRowClassName ? _xeUtils.default.isFunction(footerRowClassName) ? footerRowClassName({
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : footerRowClassName : '']
      }, tableColumn.map(function (column, $columnIndex) {
        var _ref;

        var showOverflow = column.showOverflow;
        var isColGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
        var cellOverflow = _xeUtils.default.isUndefined(showOverflow) || _xeUtils.default.isNull(showOverflow) ? allColumnOverflow : showOverflow;
        var showEllipsis = cellOverflow === 'ellipsis';
        var showTitle = cellOverflow === 'title';
        var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
        var hasEllipsis = showTitle || showTooltip || showEllipsis;
        var tfOns = {}; // 确保任何情况下 columnIndex 都精准指向真实列索引

        var columnIndex = getColumnIndex(column);

        if (showTooltip) {
          tfOns.mouseover = function (evnt) {
            $table.triggerFooterTooltipEvent(evnt, {
              $table: $table,
              $rowIndex: $rowIndex,
              column: column,
              columnIndex: columnIndex,
              $columnIndex: $columnIndex,
              fixed: fixedType
            });
          };

          tfOns.mouseout = function (evnt) {
            $table.clostTooltip();
          };
        }

        if (tableListeners['header-cell-click']) {
          tfOns.click = function (evnt) {
            _tools.UtilTools.emitEvent($table, 'header-cell-click', [{
              $table: $table,
              $rowIndex: $rowIndex,
              column: column,
              columnIndex: columnIndex,
              $columnIndex: $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            }, evnt]);
          };
        }

        if (tableListeners['header-cell-dblclick']) {
          tfOns.dblclick = function (evnt) {
            _tools.UtilTools.emitEvent($table, 'header-cell-dblclick', [{
              $table: $table,
              $rowIndex: $rowIndex,
              column: column,
              columnIndex: columnIndex,
              $columnIndex: $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            }, evnt]);
          };
        }

        return h('td', {
          class: ['vxe-footer--column', column.id, (_ref = {}, _defineProperty(_ref, "col--".concat(column.headerAlign), column.headerAlign), _defineProperty(_ref, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref, 'col--ellipsis', hasEllipsis), _defineProperty(_ref, 'filter--active', column.filters.some(function (item) {
            return item.checked;
          })), _ref), footerCellClassName ? _xeUtils.default.isFunction(footerCellClassName) ? footerCellClassName({
            $rowIndex: $rowIndex,
            column: column,
            columnIndex: columnIndex,
            $columnIndex: $columnIndex,
            fixed: fixedType
          }) : footerCellClassName : ''],
          attrs: {
            'data-index': columnIndex
          },
          on: tfOns,
          key: columnKey ? column.id : $columnIndex
        }, [h('div', {
          class: 'vxe-cell'
        }, list[columnIndex] || '　')]);
      }).concat([h('td', {
        class: 'col--gutter'
      })]));
    }))])]);
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent: function scrollEvent(evnt) {
      var $table = this.$parent,
          fixedType = this.fixedType;
      var $refs = $table.$refs,
          scrollXLoad = $table.scrollXLoad,
          triggerScrollXEvent = $table.triggerScrollXEvent,
          lastScrollLeft = $table.lastScrollLeft;
      var tableHeader = $refs.tableHeader;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var bodyElem = $refs.tableBody.$el;
      var footerElem = $refs.tableFooter.$el;
      var scrollLeft = footerElem.scrollLeft;
      var isX = scrollLeft !== lastScrollLeft;
      $table.lastScrollLeft = scrollLeft;

      if (headerElem) {
        headerElem.scrollLeft = scrollLeft;
      }

      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft;
      }

      if (scrollXLoad && isX) {
        triggerScrollXEvent(evnt);
      }

      _tools.UtilTools.emitEvent($table, 'scroll', [{
        type: 'footer',
        fixed: fixedType,
        scrollTop: bodyElem.scrollTop,
        scrollLeft: scrollLeft,
        isX: isX,
        isY: false,
        $table: $table
      }, evnt]);
    }
  }
};
exports.default = _default;