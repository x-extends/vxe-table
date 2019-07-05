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
        showOverflow = $table.showOverflow,
        getColumnMapIndex = $table.getColumnMapIndex; // 如果是使用优化模式

    if (fixedType && showOverflow) {
      tableColumn = fixedColumn; // tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      } // tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)

    }

    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper'],
      style: {// 'margin-top': `${-scrollXHeight - 1}px`
      },
      on: {
        scroll: this.scrollEvent
      }
    }, [fixedType ? _e() : h('div', {
      class: ['vxe-body--x-space'],
      style: {// width: `${$table.tableWidth}px`
      },
      ref: 'xSpace'
    }), h('table', {
      class: 'vxe-table--footer',
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      style: {// width: tableWidth === null ? tableWidth : `${tableWidth + scrollYWidth}px`,
        // 'margin-left': fixedType ? null : `${scrollXStore.leftSpaceWidth}px`
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
          name: column.id // width: column.renderWidth

        }
      });
    }).concat([h('col', {
      name: 'col--gutter',
      attrs: {// width: scrollYWidth
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
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : footerRowClassName : '']
      }, tableColumn.map(function (column, $columnIndex) {
        var _ref;

        var isGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType && column.fixed !== fixedType && !isGroup;
        var tfOns = {}; // 确保任何情况下 columnIndex 都精准指向真实列索引

        var columnIndex = getColumnMapIndex(column);

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
          class: ['vxe-footer--column', column.id, (_ref = {}, _defineProperty(_ref, "col--".concat(column.headerAlign), column.headerAlign), _defineProperty(_ref, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref, 'filter--active', column.filters.some(function (item) {
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
          key: columnIndex
        }, [h('div', {
          class: ['vxe-cell']
        }, list[columnIndex] || '　')]);
      }).concat([h('td', {
        class: ['col--gutter'],
        style: {// width: `${scrollYWidth}px`
        }
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