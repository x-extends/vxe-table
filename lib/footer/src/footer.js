"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

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
        footerRowStyle = $table.footerRowStyle,
        footerCellStyle = $table.footerCellStyle,
        allFooterAlign = $table.footerAlign,
        footerSpanMethod = $table.footerSpanMethod,
        allAlign = $table.align,
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
    }, tableColumn.map(function (column, columnIndex) {
      return h('col', {
        attrs: {
          name: column.id
        },
        key: columnIndex
      });
    }).concat([h('col', {
      attrs: {
        name: 'col_gutter'
      }
    })])),
    /**
     * 底部
     */
    h('tfoot', {
      ref: 'tfoot'
    }, footerData.map(function (list, $rowIndex) {
      return h('tr', {
        class: ['vxe-footer--row', footerRowClassName ? _xeUtils.default.isFunction(footerRowClassName) ? footerRowClassName({
          $table: $table,
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : footerRowClassName : ''],
        style: footerRowStyle ? _xeUtils.default.isFunction(footerRowStyle) ? footerRowStyle({
          $table: $table,
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : footerRowStyle : null
      }, tableColumn.map(function (column, $columnIndex) {
        var _ref2;

        var showOverflow = column.showOverflow,
            footerAlign = column.footerAlign,
            align = column.align,
            footerClassName = column.footerClassName;
        var isColGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
        var cellOverflow = _xeUtils.default.isUndefined(showOverflow) || _xeUtils.default.isNull(showOverflow) ? allColumnOverflow : showOverflow;
        var footAlign = footerAlign || align || allFooterAlign || allAlign;
        var showEllipsis = cellOverflow === 'ellipsis';
        var showTitle = cellOverflow === 'title';
        var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
        var hasEllipsis = showTitle || showTooltip || showEllipsis;
        var attrs = {
          'data-colid': column.id
        };
        var tfOns = {}; // 确保任何情况下 columnIndex 都精准指向真实列索引

        var columnIndex = getColumnIndex(column);
        var params = {
          $table: $table,
          $rowIndex: $rowIndex,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          fixed: fixedType
        };

        if (showTitle || showTooltip) {
          tfOns.mouseenter = function (evnt) {
            if (showTitle) {
              _tools.DomTools.updateCellTitle(evnt);
            } else if (showTooltip) {
              $table.triggerFooterTooltipEvent(evnt, {
                $table: $table,
                $rowIndex: $rowIndex,
                column: column,
                columnIndex: columnIndex,
                $columnIndex: $columnIndex,
                fixed: fixedType
              });
            }
          };
        }

        if (showTooltip) {
          tfOns.mouseleave = function (evnt) {
            if (showTooltip) {
              $table.handleTargetLeaveEvent(evnt);
            }
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
        } // 合并行或列


        if (footerSpanMethod) {
          var _ref = footerSpanMethod({
            $table: $table,
            $rowIndex: $rowIndex,
            column: column,
            columnIndex: columnIndex,
            $columnIndex: $columnIndex,
            fixed: fixedType,
            data: footerData
          }) || {},
              _ref$rowspan = _ref.rowspan,
              rowspan = _ref$rowspan === void 0 ? 1 : _ref$rowspan,
              _ref$colspan = _ref.colspan,
              colspan = _ref$colspan === void 0 ? 1 : _ref$colspan;

          if (!rowspan || !colspan) {
            return null;
          }

          attrs.rowspan = rowspan;
          attrs.colspan = colspan;
        }

        return h('td', {
          class: ['vxe-footer--column', column.id, (_ref2 = {
            'col--last': $columnIndex === tableColumn.length - 1
          }, _defineProperty(_ref2, "col--".concat(footAlign), footAlign), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref2, 'col--ellipsis', hasEllipsis), _defineProperty(_ref2, 'filter--active', column.filters.some(function (item) {
            return item.checked;
          })), _ref2), _tools.UtilTools.getClass(footerClassName, params), _tools.UtilTools.getClass(footerCellClassName, params)],
          attrs: attrs,
          style: footerCellStyle ? _xeUtils.default.isFunction(footerCellStyle) ? footerCellStyle({
            $table: $table,
            $rowIndex: $rowIndex,
            column: column,
            columnIndex: columnIndex,
            $columnIndex: $columnIndex,
            fixed: fixedType
          }) : footerCellStyle : null,
          on: tfOns,
          key: columnKey ? column.id : columnIndex
        }, [h('div', {
          class: 'vxe-cell'
        }, _tools.UtilTools.formatText(list[$table.tableColumn.indexOf(column)], 1))]);
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
      $table.lastScrollTime = Date.now();

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