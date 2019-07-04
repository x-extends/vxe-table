"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getAllColumns = function getAllColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.visible) {
      if (column.children && column.children.length && column.children.some(function (column) {
        return column.visible;
      })) {
        result.push(column);
        result.push.apply(result, getAllColumns(column.children));
      } else {
        result.push(column);
      }
    }
  });
  return result;
};

var convertToRows = function convertToRows(originColumns) {
  var maxLevel = 1;

  var traverse = function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;

      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }

    if (column.children && column.children.length && column.children.some(function (column) {
      return column.visible;
    })) {
      var colSpan = 0;
      column.children.forEach(function (subColumn) {
        if (subColumn.visible) {
          traverse(subColumn, column);
          colSpan += subColumn.colSpan;
        }
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach(function (column) {
    column.level = 1;
    traverse(column);
  });
  var rows = [];

  for (var i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  var allColumns = getAllColumns(originColumns);
  allColumns.forEach(function (column) {
    if (column.children && column.children.length && column.children.some(function (column) {
      return column.visible;
    })) {
      column.rowSpan = 1;
    } else {
      column.rowSpan = maxLevel - column.level + 1;
    }

    rows[column.level - 1].push(column);
  });
  return rows;
};

var _default = {
  name: 'VxeTableHeader',
  props: {
    tableData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    collectColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String,
    isGroup: Boolean
  },
  data: function data() {
    return {
      headerColumn: []
    };
  },
  watch: {
    tableColumn: function tableColumn() {
      this.uploadColumn();
    }
  },
  created: function created() {
    this.uploadColumn();
  },
  render: function render(h) {
    var $table = this.$parent,
        fixedType = this.fixedType,
        headerColumn = this.headerColumn,
        tableColumn = this.tableColumn,
        resizeMousedown = this.resizeMousedown,
        fixedColumn = this.fixedColumn;
    var tableListeners = $table.$listeners,
        resizable = $table.resizable,
        border = $table.border,
        headerRowClassName = $table.headerRowClassName,
        headerCellClassName = $table.headerCellClassName,
        allHeaderOverflow = $table.showHeaderOverflow,
        oldHeaderOverflow = $table.showHeaderAllOverflow,
        highlightCurrentColumn = $table.highlightCurrentColumn,
        selectColumn = $table.selectColumn,
        tableWidth = $table.tableWidth,
        scrollXLoad = $table.scrollXLoad,
        scrollXStore = $table.scrollXStore,
        scrollYWidth = $table.scrollYWidth,
        getColumnMapIndex = $table.getColumnMapIndex; // v2.0 废弃属性，保留兼容

    var allColumnHeaderOverflow = _xeUtils.default.isBoolean(oldHeaderOverflow) ? oldHeaderOverflow : allHeaderOverflow; // 横向滚动渲染

    if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }

      tableWidth = tableColumn.reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
    }

    return h('div', {
      class: ['vxe-table--header-wrapper', fixedType ? "fixed--".concat(fixedType, "-wrapper") : 'body--wrapper']
    }, [!fixedType && scrollXLoad ? h('div', {
      class: ['vxe-body--x-space'],
      style: {
        width: "".concat($table.tableWidth + scrollYWidth, "px")
      }
    }) : null, h('table', {
      class: 'vxe-table--header',
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      style: {
        width: tableWidth === null ? tableWidth : "".concat(tableWidth + scrollYWidth, "px"),
        'margin-left': fixedType ? null : "".concat(scrollXStore.leftSpaceWidth, "px")
      }
    }, [
    /**
     * 列宽
     */
    h('colgroup', tableColumn.map(function (column, columnIndex) {
      return h('col', {
        attrs: {
          name: column.id,
          width: column.renderWidth
        },
        key: columnIndex
      });
    }).concat([h('col', {
      attrs: {
        width: scrollYWidth
      }
    })])),
    /**
     * 头部
     */
    h('thead', headerColumn.map(function (cols, $rowIndex) {
      return h('tr', {
        class: ['vxe-header--row', headerRowClassName ? _xeUtils.default.isFunction(headerRowClassName) ? headerRowClassName({
          $table: $table,
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : headerRowClassName : '']
      }, cols.map(function (column, $columnIndex) {
        var _ref;

        var columnKey = column.columnKey,
            showHeaderOverflow = column.showHeaderOverflow,
            headerAlign = column.headerAlign,
            renderWidth = column.renderWidth,
            own = column.own;
        var isGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType && column.fixed !== fixedType && !isGroup;
        var headOverflow = _xeUtils.default.isUndefined(showHeaderOverflow) || _xeUtils.default.isUndefined(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
        var showEllipsis = headOverflow === 'ellipsis';
        var showTitle = headOverflow === 'title';
        var showTooltip = headOverflow === true || headOverflow === 'tooltip';
        var hasEllipsis = showTitle || showTooltip || showEllipsis;
        var thOns = {}; // 确保任何情况下 columnIndex 都精准指向真实列索引

        var columnIndex = getColumnMapIndex(column);

        if (showTooltip) {
          thOns.mouseover = function (evnt) {
            $table.triggerHeaderTooltipEvent(evnt, {
              $table: $table,
              column: column,
              columnIndex: columnIndex,
              $columnIndex: $columnIndex,
              fixed: fixedType
            });
          };

          thOns.mouseout = $table.clostTooltip;
        }

        if (highlightCurrentColumn || tableListeners['header-cell-click']) {
          thOns.click = function (evnt) {
            $table.triggerHeaderCellClickEvent(evnt, {
              $table: $table,
              $rowIndex: $rowIndex,
              column: column,
              columnIndex: columnIndex,
              $columnIndex: $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            });
          };
        }

        if (tableListeners['header-cell-dblclick']) {
          thOns.dblclick = function (evnt) {
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

        return h('th', {
          class: ['vxe-header--column', column.id, (_ref = {}, _defineProperty(_ref, "col--".concat(headerAlign), headerAlign), _defineProperty(_ref, 'col--current', selectColumn === column), _defineProperty(_ref, 'col--ellipsis', hasEllipsis), _defineProperty(_ref, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref, 'filter--active', column.filters.some(function (item) {
            return item.checked;
          })), _ref), headerCellClassName ? _xeUtils.default.isFunction(headerCellClassName) ? headerCellClassName({
            $table: $table,
            $rowIndex: $rowIndex,
            column: column,
            columnIndex: columnIndex,
            $columnIndex: $columnIndex,
            fixed: fixedType
          }) : headerCellClassName : ''],
          attrs: {
            'data-index': columnIndex,
            colspan: column.colSpan,
            rowspan: column.rowSpan
          },
          on: thOns,
          key: columnKey || (isGroup ? column.id : columnIndex)
        }, [h('div', {
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }],
          attrs: {
            title: showTitle ? own.title || own.label : null
          },
          style: {
            width: showTitle || showTooltip || showEllipsis ? "".concat(border ? renderWidth - 1 : renderWidth, "px") : null
          }
        }, column.renderHeader(h, {
          $table: $table,
          $rowIndex: $rowIndex,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          fixed: fixedType,
          isHidden: fixedHiddenColumn
        })), (_xeUtils.default.isBoolean(column.resizable) ? column.resizable : resizable) && !fixedType && !isGroup ? h('div', {
          class: ['vxe-resizable', {
            'is--line': !border
          }],
          on: {
            mousedown: function mousedown(evnt) {
              resizeMousedown(evnt, column);
            }
          }
        }) : null]);
      }).concat(scrollYWidth ? [h('th', {
        class: ['col--gutter'],
        style: {
          width: "".concat(scrollYWidth, "px")
        }
      })] : []));
    }))]),
    /**
     * 其他
     */
    h('div', {
      class: ['vxe-table--repair'],
      style: {
        width: tableWidth === null ? tableWidth : "".concat(tableWidth, "px")
      }
    })]);
  },
  methods: {
    uploadColumn: function uploadColumn() {
      this.headerColumn = this.isGroup ? convertToRows(this.collectColumn) : [this.$parent.scrollXLoad && this.fixedType ? this.fixedColumn : this.tableColumn];
    },
    resizeMousedown: function resizeMousedown(evnt, column) {
      var $table = this.$parent,
          $el = this.$el;
      var targetElem = evnt.target;
      var dragLeft = 0;
      var tableBodyElem = $table.$refs.tableBody.$el;
      var resizeBarElem = $table.$refs.resizeBar;

      var pos = _tools.DomTools.getOffsetPos(targetElem, $el);

      var dragMinLeft = pos.left - targetElem.parentNode.clientWidth + targetElem.clientWidth + 36;
      var dragPosLeft = pos.left + 6;
      var dragClientX = evnt.clientX;
      var domMousemove = document.onmousemove;
      var domMouseup = document.onmouseup;

      var updateEvent = function updateEvent(evnt) {
        evnt.preventDefault();
        var offsetX = evnt.clientX - dragClientX;
        var left = dragPosLeft + offsetX;
        dragLeft = left < dragMinLeft ? dragMinLeft : left;
        resizeBarElem.style.left = "".concat(dragLeft - tableBodyElem.scrollLeft, "px");
      };

      resizeBarElem.style.display = 'block';
      document.onmousemove = updateEvent;

      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        column.resizeWidth = column.renderWidth - (dragPosLeft - dragLeft);
        resizeBarElem.style.display = 'none';
        $table.analyColumnWidth();
        $table.recalculate();
      };

      updateEvent(evnt);
    }
  }
};
exports.default = _default;