"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cellType = 'footer';

function mergeFooterMethod(mergeFooterList, _rowIndex, _columnIndex) {
  for (var mIndex = 0; mIndex < mergeFooterList.length; mIndex++) {
    var _mergeFooterList$mInd = mergeFooterList[mIndex],
        mergeRowIndex = _mergeFooterList$mInd.row,
        mergeColIndex = _mergeFooterList$mInd.col,
        mergeRowspan = _mergeFooterList$mInd.rowspan,
        mergeColspan = _mergeFooterList$mInd.colspan;

    if (mergeColIndex > -1 && mergeRowIndex > -1 && mergeRowspan && mergeColspan) {
      if (mergeRowIndex === _rowIndex && mergeColIndex === _columnIndex) {
        return {
          rowspan: mergeRowspan,
          colspan: mergeColspan
        };
      }

      if (_rowIndex >= mergeRowIndex && _rowIndex < mergeRowIndex + mergeRowspan && _columnIndex >= mergeColIndex && _columnIndex < mergeColIndex + mergeColspan) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  }
}

var _default = {
  name: 'VxeTableFooter',
  props: {
    footerData: Array,
    tableColumn: Array,
    fixedColumn: Array,
    fixedType: String,
    size: String
  },
  mounted: function mounted() {
    var $xetable = this.$parent,
        $el = this.$el,
        $refs = this.$refs,
        fixedType = this.fixedType;
    var elemStore = $xetable.elemStore;
    var prefix = "".concat(fixedType || 'main', "-footer-");
    elemStore["".concat(prefix, "wrapper")] = $el;
    elemStore["".concat(prefix, "table")] = $refs.table;
    elemStore["".concat(prefix, "colgroup")] = $refs.colgroup;
    elemStore["".concat(prefix, "list")] = $refs.tfoot;
    elemStore["".concat(prefix, "xSpace")] = $refs.xSpace;
  },
  render: function render(h) {
    var _e = this._e,
        $xetable = this.$parent,
        fixedType = this.fixedType,
        fixedColumn = this.fixedColumn,
        tableColumn = this.tableColumn,
        footerData = this.footerData;
    var tableListeners = $xetable.$listeners,
        tId = $xetable.tId,
        footerRowClassName = $xetable.footerRowClassName,
        footerCellClassName = $xetable.footerCellClassName,
        footerRowStyle = $xetable.footerRowStyle,
        footerCellStyle = $xetable.footerCellStyle,
        allFooterAlign = $xetable.footerAlign,
        mergeFooterList = $xetable.mergeFooterList,
        footerSpanMethod = $xetable.footerSpanMethod,
        allAlign = $xetable.align,
        scrollXLoad = $xetable.scrollXLoad,
        columnKey = $xetable.columnKey,
        allColumnFooterOverflow = $xetable.showFooterOverflow,
        currentColumn = $xetable.currentColumn,
        overflowX = $xetable.overflowX,
        scrollbarWidth = $xetable.scrollbarWidth,
        tooltipOpts = $xetable.tooltipOpts; // 如果是使用优化模式

    if (!mergeFooterList.length || !footerSpanMethod) {
      if (fixedType && allColumnFooterOverflow) {
        tableColumn = fixedColumn;
      } else if (scrollXLoad) {
        if (fixedType) {
          tableColumn = fixedColumn;
        }
      }
    }

    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper'],
      attrs: {
        'data-tid': tId
      },
      on: {
        scroll: this.scrollEvent
      }
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      ref: 'xSpace'
    }), h('table', {
      class: 'vxe-table--footer',
      attrs: {
        'data-tid': tId,
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
    }, tableColumn.map(function (column, $columnIndex) {
      return h('col', {
        attrs: {
          name: column.id
        },
        key: $columnIndex
      });
    }).concat(scrollbarWidth ? [h('col', {
      attrs: {
        name: 'col_gutter'
      }
    })] : [])),
    /**
     * 底部
     */
    h('tfoot', {
      ref: 'tfoot'
    }, footerData.map(function (list, _rowIndex) {
      var $rowIndex = _rowIndex;
      return h('tr', {
        class: ['vxe-footer--row', footerRowClassName ? _ctor.default.isFunction(footerRowClassName) ? footerRowClassName({
          $table: $xetable,
          _rowIndex: _rowIndex,
          $rowIndex: $rowIndex,
          fixed: fixedType,
          type: cellType
        }) : footerRowClassName : ''],
        style: footerRowStyle ? _ctor.default.isFunction(footerRowStyle) ? footerRowStyle({
          $table: $xetable,
          _rowIndex: _rowIndex,
          $rowIndex: $rowIndex,
          fixed: fixedType,
          type: cellType
        }) : footerRowStyle : null
      }, tableColumn.map(function (column, $columnIndex) {
        var _ref2;

        var type = column.type,
            showFooterOverflow = column.showFooterOverflow,
            footerAlign = column.footerAlign,
            align = column.align,
            footerClassName = column.footerClassName;
        var enabled = tooltipOpts.enabled;
        var isColGroup = column.children && column.children.length;
        var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
        var footOverflow = _ctor.default.isUndefined(showFooterOverflow) || _ctor.default.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow;
        var footAlign = footerAlign || align || allFooterAlign || allAlign;
        var showEllipsis = footOverflow === 'ellipsis';
        var showTitle = footOverflow === 'title';
        var showTooltip = footOverflow === true || footOverflow === 'tooltip';
        var hasEllipsis = showTitle || showTooltip || showEllipsis;
        var attrs = {
          'data-colid': column.id
        };
        var tfOns = {};
        var columnIndex = $xetable.getColumnIndex(column);

        var _columnIndex = $xetable._getColumnIndex(column);

        var itemIndex = _columnIndex;
        var params = {
          $table: $xetable,
          _rowIndex: _rowIndex,
          $rowIndex: $rowIndex,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          _columnIndex: _columnIndex,
          itemIndex: itemIndex,
          items: list,
          fixed: fixedType,
          type: cellType,
          data: footerData
        }; // 虚拟滚动不支持动态高度

        if (scrollXLoad && !hasEllipsis) {
          showEllipsis = hasEllipsis = true;
        }

        if (showTitle || showTooltip || enabled) {
          tfOns.mouseenter = function (evnt) {
            if (showTitle) {
              _tools.DomTools.updateCellTitle(evnt.currentTarget, column);
            } else if (showTooltip || enabled) {
              $xetable.triggerFooterTooltipEvent(evnt, params);
            }
          };
        }

        if (showTooltip || enabled) {
          tfOns.mouseleave = function (evnt) {
            if (showTooltip || enabled) {
              $xetable.handleTargetLeaveEvent(evnt);
            }
          };
        }

        if (tableListeners['footer-cell-click']) {
          tfOns.click = function (evnt) {
            $xetable.emitEvent('footer-cell-click', Object.assign({
              cell: evnt.currentTarget
            }, params), evnt);
          };
        }

        if (tableListeners['footer-cell-dblclick']) {
          tfOns.dblclick = function (evnt) {
            $xetable.emitEvent('footer-cell-dblclick', Object.assign({
              cell: evnt.currentTarget
            }, params), evnt);
          };
        } // 合并行或列


        if (mergeFooterList.length) {
          var spanRest = mergeFooterMethod(mergeFooterList, _rowIndex, _columnIndex);

          if (spanRest) {
            var rowspan = spanRest.rowspan,
                colspan = spanRest.colspan;

            if (!rowspan || !colspan) {
              return null;
            }

            if (rowspan > 1) {
              attrs.rowspan = rowspan;
            }

            if (colspan > 1) {
              attrs.colspan = colspan;
            }
          }
        } else if (footerSpanMethod) {
          // 自定义合并方法
          var _ref = footerSpanMethod(params) || {},
              _ref$rowspan = _ref.rowspan,
              _rowspan = _ref$rowspan === void 0 ? 1 : _ref$rowspan,
              _ref$colspan = _ref.colspan,
              _colspan = _ref$colspan === void 0 ? 1 : _ref$colspan;

          if (!_rowspan || !_colspan) {
            return null;
          }

          if (_rowspan > 1) {
            attrs.rowspan = _rowspan;
          }

          if (_colspan > 1) {
            attrs.colspan = _colspan;
          }
        }

        return h('td', {
          class: ['vxe-footer--column', column.id, (_ref2 = {}, _defineProperty(_ref2, "col--".concat(footAlign), footAlign), _defineProperty(_ref2, "col--".concat(type), type), _defineProperty(_ref2, 'col--last', $columnIndex === tableColumn.length - 1), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref2, 'col--ellipsis', hasEllipsis), _defineProperty(_ref2, 'col--current', currentColumn === column), _ref2), _tools.UtilTools.getClass(footerClassName, params), _tools.UtilTools.getClass(footerCellClassName, params)],
          attrs: attrs,
          style: footerCellStyle ? _ctor.default.isFunction(footerCellStyle) ? footerCellStyle(params) : footerCellStyle : null,
          on: tfOns,
          key: columnKey ? column.id : $columnIndex
        }, [h('div', {
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }]
        }, column.renderFooter(h, params))]);
      }).concat(scrollbarWidth ? [h('td', {
        class: 'col--gutter'
      })] : []));
    }))])]);
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent: function scrollEvent(evnt) {
      var $xetable = this.$parent,
          fixedType = this.fixedType;
      var $refs = $xetable.$refs,
          scrollXLoad = $xetable.scrollXLoad,
          triggerScrollXEvent = $xetable.triggerScrollXEvent,
          lastScrollLeft = $xetable.lastScrollLeft;
      var tableHeader = $refs.tableHeader,
          tableBody = $refs.tableBody,
          tableFooter = $refs.tableFooter,
          validTip = $refs.validTip;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;
      var bodyElem = tableBody.$el;
      var scrollLeft = footerElem.scrollLeft;
      var isX = scrollLeft !== lastScrollLeft;
      $xetable.lastScrollLeft = scrollLeft;
      $xetable.lastScrollTime = Date.now();

      if (headerElem) {
        headerElem.scrollLeft = scrollLeft;
      }

      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft;
      }

      if (scrollXLoad && isX) {
        triggerScrollXEvent(evnt);
      }

      if (isX && validTip && validTip.visible) {
        validTip.updatePlacement();
      }

      $xetable.emitEvent('scroll', {
        type: cellType,
        fixed: fixedType,
        scrollTop: bodyElem.scrollTop,
        scrollLeft: scrollLeft,
        isX: isX,
        isY: false
      }, evnt);
    }
  }
};
exports.default = _default;