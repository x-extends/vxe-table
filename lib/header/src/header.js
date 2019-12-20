"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

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
  mounted: function mounted() {
    var $table = this.$parent,
        $el = this.$el,
        $refs = this.$refs,
        fixedType = this.fixedType;
    var elemStore = $table.elemStore;
    var prefix = "".concat(fixedType || 'main', "-header-");
    elemStore["".concat(prefix, "wrapper")] = $el;
    elemStore["".concat(prefix, "table")] = $refs.table;
    elemStore["".concat(prefix, "colgroup")] = $refs.colgroup;
    elemStore["".concat(prefix, "list")] = $refs.thead;
    elemStore["".concat(prefix, "xSpace")] = $refs.xSpace;
    elemStore["".concat(prefix, "repair")] = $refs.repair;
  },
  render: function render(h) {
    var _this = this;

    var _e = this._e,
        $table = this.$parent,
        fixedType = this.fixedType,
        headerColumn = this.headerColumn,
        tableColumn = this.tableColumn,
        fixedColumn = this.fixedColumn;
    var tableListeners = $table.$listeners,
        resizable = $table.resizable,
        border = $table.border,
        columnKey = $table.columnKey,
        headerRowClassName = $table.headerRowClassName,
        headerCellClassName = $table.headerCellClassName,
        headerRowStyle = $table.headerRowStyle,
        headerCellStyle = $table.headerCellStyle,
        allColumnHeaderOverflow = $table.showHeaderOverflow,
        allHeaderAlign = $table.headerAlign,
        allAlign = $table.align,
        highlightCurrentColumn = $table.highlightCurrentColumn,
        _$table$mouseConfig = $table.mouseConfig,
        mouseConfig = _$table$mouseConfig === void 0 ? {} : _$table$mouseConfig,
        scrollXLoad = $table.scrollXLoad,
        scrollYLoad = $table.scrollYLoad,
        overflowX = $table.overflowX,
        getColumnIndex = $table.getColumnIndex,
        sortOpts = $table.sortOpts; // 横向滚动渲染

    if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }
    }

    return h('div', {
      class: ['vxe-table--header-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper']
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      ref: 'xSpace'
    }), h('table', {
      class: 'vxe-table--header',
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
      var isColGroup = column.children && column.children.length;
      return h('col', {
        attrs: {
          name: column.id
        },
        key: columnKey || isColGroup ? column.id : columnIndex
      });
    }).concat([h('col', {
      attrs: {
        name: 'col_gutter'
      }
    })])),
    /**
     * 头部
     */
    h('thead', {
      ref: 'thead'
    }, headerColumn.map(function (cols, $rowIndex) {
      return h('tr', {
        class: ['vxe-header--row', headerRowClassName ? _xeUtils.default.isFunction(headerRowClassName) ? headerRowClassName({
          $table: $table,
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : headerRowClassName : ''],
        style: headerRowStyle ? _xeUtils.default.isFunction(headerRowStyle) ? headerRowStyle({
          $table: $table,
          $rowIndex: $rowIndex,
          fixed: fixedType
        }) : headerRowStyle : null
      }, cols.map(function (column, $columnIndex) {
        var _ref;

        var showHeaderOverflow = column.showHeaderOverflow,
            headerAlign = column.headerAlign,
            align = column.align,
            headerClassName = column.headerClassName;
        var isColGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
        var headOverflow = _xeUtils.default.isUndefined(showHeaderOverflow) || _xeUtils.default.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
        var headAlign = headerAlign || align || allHeaderAlign || allAlign;
        var showEllipsis = headOverflow === 'ellipsis';
        var showTitle = headOverflow === 'title';
        var showTooltip = headOverflow === true || headOverflow === 'tooltip';
        var hasEllipsis = showTitle || showTooltip || showEllipsis;
        var thOns = {};
        var isFilter = column.filters.length;
        var hasFilter = isFilter && column.filters.some(function (item) {
          return item.checked;
        }); // 确保任何情况下 columnIndex 都精准指向真实列索引

        var columnIndex = getColumnIndex(column);
        var params = {
          $table: $table,
          $rowIndex: $rowIndex,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          fixed: fixedType,
          isHidden: fixedHiddenColumn,
          hasFilter: hasFilter
        }; // 虚拟滚动不支持动态高度

        if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
          showEllipsis = hasEllipsis = true;
        }

        if (showTitle || showTooltip) {
          thOns.mouseenter = function (evnt) {
            if ($table._isResize) {
              return;
            }

            if (showTitle) {
              _tools.DomTools.updateCellTitle(evnt);
            } else if (showTooltip) {
              $table.triggerHeaderTooltipEvent(evnt, {
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
          thOns.mouseleave = function (evnt) {
            if ($table._isResize) {
              return;
            }

            if (showTooltip) {
              $table.handleTargetLeaveEvent(evnt);
            }
          };
        }

        if (highlightCurrentColumn || tableListeners['header-cell-click'] || mouseConfig.checked || sortOpts.trigger === 'cell') {
          thOns.click = function (evnt) {
            return $table.triggerHeaderCellClickEvent(evnt, {
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
            return _tools.UtilTools.emitEvent($table, 'header-cell-dblclick', [{
              $table: $table,
              $rowIndex: $rowIndex,
              column: column,
              columnIndex: columnIndex,
              $columnIndex: $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            }, evnt]);
          };
        } // 按下事件处理


        if (mouseConfig.checked) {
          thOns.mousedown = function (evnt) {
            return $table.triggerHeaderCellMousedownEvent(evnt, {
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

        var type = column.type === 'seq' || column.type === 'index' ? 'seq' : column.type;
        return h('th', {
          class: ['vxe-header--column', column.id, (_ref = {}, _defineProperty(_ref, "col--".concat(headAlign), headAlign), _defineProperty(_ref, "col--".concat(type), type), _defineProperty(_ref, 'col--last', $columnIndex === cols.length - 1), _defineProperty(_ref, 'col--fixed', column.fixed), _defineProperty(_ref, 'col--group', isColGroup), _defineProperty(_ref, 'col--ellipsis', hasEllipsis), _defineProperty(_ref, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref, 'is--sortable', column.sortable), _defineProperty(_ref, 'is--filter', column.filters.length), _defineProperty(_ref, 'filter--active', hasFilter), _ref), _tools.UtilTools.getClass(headerClassName, params), _tools.UtilTools.getClass(headerCellClassName, params)],
          attrs: {
            'data-colid': column.id,
            colspan: column.colSpan,
            rowspan: column.rowSpan
          },
          style: headerCellStyle ? _xeUtils.default.isFunction(headerCellStyle) ? headerCellStyle(params) : headerCellStyle : null,
          on: thOns,
          key: columnKey || isColGroup ? column.id : columnIndex
        }, [h('div', {
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }]
        }, column.renderHeader(h, params)),
        /**
         * 列宽拖动
         */
        !fixedHiddenColumn && !isColGroup && (_xeUtils.default.isBoolean(column.resizable) ? column.resizable : resizable) ? h('div', {
          class: ['vxe-resizable', {
            'is--line': !border
          }],
          on: {
            mousedown: function mousedown(evnt) {
              return _this.resizeMousedown(evnt, params);
            }
          }
        }) : null]);
      }).concat([h('th', {
        class: 'col--gutter'
      })]));
    }))]),
    /**
     * 其他
     */
    h('div', {
      class: 'vxe-table--repair',
      ref: 'repair'
    })]);
  },
  methods: {
    uploadColumn: function uploadColumn() {
      this.headerColumn = this.isGroup ? convertToRows(this.collectColumn) : [this.$parent.scrollXLoad && this.fixedType ? this.fixedColumn : this.tableColumn];
    },
    resizeMousedown: function resizeMousedown(evnt, params) {
      var column = params.column;
      var $table = this.$parent,
          $el = this.$el,
          fixedType = this.fixedType;
      var _$table$$refs = $table.$refs,
          tableBody = _$table$$refs.tableBody,
          leftContainer = _$table$$refs.leftContainer,
          rightContainer = _$table$$refs.rightContainer,
          resizeBarElem = _$table$$refs.resizeBar;
      var dragBtnElem = evnt.target,
          dragClientX = evnt.clientX;
      var cell = dragBtnElem.parentNode;
      var dragLeft = 0;
      var minInterval = 36; // 列之间的最小间距

      var tableBodyElem = tableBody.$el;

      var pos = _tools.DomTools.getOffsetPos(dragBtnElem, $el);

      var dragBtnWidth = dragBtnElem.clientWidth;
      var dragMinLeft = pos.left - cell.clientWidth + dragBtnWidth + minInterval;
      var dragPosLeft = pos.left + Math.floor(dragBtnWidth / 2);
      var domMousemove = document.onmousemove;
      var domMouseup = document.onmouseup;
      var isLeftFixed = fixedType === 'left';
      var isRightFixed = fixedType === 'right'; // 计算左右侧固定列偏移量

      var fixedOffsetWidth = 0;

      if (isLeftFixed || isRightFixed) {
        var siblingProp = isLeftFixed ? 'nextElementSibling' : 'previousElementSibling';
        var tempCellElem = cell[siblingProp];

        while (tempCellElem) {
          if (_tools.DomTools.hasClass(tempCellElem, 'fixed--hidden')) {
            break;
          } else if (!_tools.DomTools.hasClass(tempCellElem, 'col--group')) {
            fixedOffsetWidth += tempCellElem.offsetWidth;
          }

          tempCellElem = tempCellElem[siblingProp];
        }

        if (isRightFixed && rightContainer) {
          dragPosLeft = rightContainer.offsetLeft + fixedOffsetWidth;
        }
      } // 处理拖动事件


      var updateEvent = function updateEvent(evnt) {
        evnt.stopPropagation();
        evnt.preventDefault();
        var offsetX = evnt.clientX - dragClientX;
        var left = dragPosLeft + offsetX;
        var scrollLeft = fixedType ? 0 : tableBodyElem.scrollLeft;

        if (isLeftFixed) {
          // 左固定列（不允许超过右侧固定列、不允许超过右边距）
          left = Math.min(left, (rightContainer ? rightContainer.offsetLeft : tableBodyElem.clientWidth) - fixedOffsetWidth - minInterval);
        } else if (isRightFixed) {
          // 右侧固定列（不允许超过左侧固定列、不允许超过左边距）
          dragMinLeft = (leftContainer ? leftContainer.clientWidth : 0) + fixedOffsetWidth + minInterval;
          left = Math.min(left, dragPosLeft + cell.clientWidth - minInterval);
        }

        dragLeft = Math.max(left, dragMinLeft);
        resizeBarElem.style.left = "".concat(dragLeft - scrollLeft, "px");
      };

      $table._isResize = true;

      _tools.DomTools.addClass($table.$el, 'c--resize');

      resizeBarElem.style.display = 'block';
      document.onmousemove = updateEvent;

      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        column.resizeWidth = column.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft);
        resizeBarElem.style.display = 'none';
        $table._isResize = false;
        $table._lastResizeTime = Date.now();
        $table.analyColumnWidth();
        $table.recalculate(true);

        _tools.DomTools.removeClass($table.$el, 'c--resize');

        if ($table.$toolbar) {
          $table.$toolbar.updateResizable();
        }

        _tools.UtilTools.emitEvent($table, 'resizable-change', [params]);
      };

      updateEvent(evnt);
    }
  }
};
exports.default = _default;