"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var cellType = 'body';
var lineOffsetSizes = {
  mini: 3,
  small: 2,
  medium: 1
}; // 滚动、拖动过程中不需要触发

function isOperateMouse($xetable) {
  return $xetable._isResize || $xetable.lastScrollTime && Date.now() < $xetable.lastScrollTime + $xetable.delayHover;
}

function countTreeExpand(prevRow, params) {
  var $table = params.$table;
  var rowChildren = prevRow[$table.treeOpts.children];
  var count = 1;

  if ($table.isTreeExpandByRow(prevRow)) {
    for (var index = 0; index < rowChildren.length; index++) {
      count += countTreeExpand(rowChildren[index], params);
    }
  }

  return count;
}

function getOffsetSize($xetable) {
  return lineOffsetSizes[$xetable.vSize] || 0;
}

function calcTreeLine(params, items) {
  var $table = params.$table,
      $rowIndex = params.$rowIndex;
  var expandSize = 1;

  if ($rowIndex) {
    expandSize = countTreeExpand(items[$rowIndex - 1], params);
  }

  return $table.rowHeight * expandSize - ($rowIndex ? 1 : 12 - getOffsetSize($table));
}

function renderLine(h, _vm, $xetable, rowLevel, items, params) {
  var column = params.column;
  var treeOpts = $xetable.treeOpts,
      treeConfig = $xetable.treeConfig;
  var slots = column.slots,
      treeNode = column.treeNode;

  if (slots && slots.line) {
    return slots.line.call($xetable, params, h);
  }

  if (treeConfig && treeNode && treeOpts.line) {
    return [h('div', {
      class: 'vxe-tree--line-wrapper'
    }, [h('div', {
      class: 'vxe-tree--line',
      style: {
        height: "".concat(calcTreeLine(params, items), "px"),
        left: "".concat(rowLevel * treeOpts.indent + (rowLevel ? 2 - getOffsetSize($xetable) : 0) + 16, "px")
      }
    })])];
  }

  return [];
}

function mergeMethod(mergeList, _rowIndex, _columnIndex) {
  for (var mIndex = 0; mIndex < mergeList.length; mIndex++) {
    var _mergeList$mIndex = mergeList[mIndex],
        mergeRowIndex = _mergeList$mIndex.row,
        mergeColIndex = _mergeList$mIndex.col,
        mergeRowspan = _mergeList$mIndex.rowspan,
        mergeColspan = _mergeList$mIndex.colspan;

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
/**
 * 渲染列
 */


function renderColumn(h, _vm, $xetable, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, columns, items) {
  var _ref2;

  var tableListeners = $xetable.$listeners,
      afterFullData = $xetable.afterFullData,
      tableData = $xetable.tableData,
      height = $xetable.height,
      columnKey = $xetable.columnKey,
      overflowX = $xetable.overflowX,
      scrollXLoad = $xetable.scrollXLoad,
      scrollYLoad = $xetable.scrollYLoad,
      highlightCurrentRow = $xetable.highlightCurrentRow,
      allColumnOverflow = $xetable.showOverflow,
      allAlign = $xetable.align,
      currentColumn = $xetable.currentColumn,
      cellClassName = $xetable.cellClassName,
      cellStyle = $xetable.cellStyle,
      mergeList = $xetable.mergeList,
      spanMethod = $xetable.spanMethod,
      radioOpts = $xetable.radioOpts,
      checkboxOpts = $xetable.checkboxOpts,
      expandOpts = $xetable.expandOpts,
      treeOpts = $xetable.treeOpts,
      tooltipOpts = $xetable.tooltipOpts,
      mouseConfig = $xetable.mouseConfig,
      editConfig = $xetable.editConfig,
      editOpts = $xetable.editOpts,
      editRules = $xetable.editRules,
      validOpts = $xetable.validOpts,
      editStore = $xetable.editStore,
      validStore = $xetable.validStore;
  var type = column.type,
      cellRender = column.cellRender,
      editRender = column.editRender,
      align = column.align,
      showOverflow = column.showOverflow,
      className = column.className,
      treeNode = column.treeNode;
  var actived = editStore.actived;
  var enabled = tooltipOpts.enabled;
  var columnIndex = $xetable.getColumnIndex(column);

  var _columnIndex = $xetable._getColumnIndex(column);

  var fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX;
  var cellOverflow = _ctor.default.isUndefined(showOverflow) || _ctor.default.isNull(showOverflow) ? allColumnOverflow : showOverflow;
  var showEllipsis = cellOverflow === 'ellipsis';
  var showTitle = cellOverflow === 'title';
  var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
  var hasEllipsis = showTitle || showTooltip || showEllipsis;
  var isDirty;
  var tdOns = {};
  var cellAlign = align || allAlign;
  var hasValidError = validStore.row === row && validStore.column === column;
  var hasDefaultTip = editRules && (validOpts.message === 'default' ? height || tableData.length > 1 : validOpts.message === 'inline');
  var attrs = {
    'data-colid': column.id
  };
  var bindMouseenter = tableListeners['cell-mouseenter'];
  var bindMouseleave = tableListeners['cell-mouseleave'];
  var triggerDblclick = editRender && editConfig && editOpts.trigger === 'dblclick';
  var params = {
    $table: $xetable,
    $seq: $seq,
    seq: seq,
    rowid: rowid,
    row: row,
    rowIndex: rowIndex,
    $rowIndex: $rowIndex,
    _rowIndex: _rowIndex,
    column: column,
    columnIndex: columnIndex,
    $columnIndex: $columnIndex,
    _columnIndex: _columnIndex,
    fixed: fixedType,
    type: cellType,
    isHidden: fixedHiddenColumn,
    level: rowLevel,
    visibleData: afterFullData,
    data: tableData,
    items: items
  }; // 虚拟滚动不支持动态高度

  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true;
  } // hover 进入事件


  if (showTitle || showTooltip || enabled || bindMouseenter) {
    tdOns.mouseenter = function (evnt) {
      if (isOperateMouse($xetable)) {
        return;
      }

      if (showTitle) {
        _tools.DomTools.updateCellTitle(evnt.currentTarget, column);
      } else if (showTooltip || enabled) {
        // 如果配置了显示 tooltip
        $xetable.triggerBodyTooltipEvent(evnt, params);
      }

      if (bindMouseenter) {
        $xetable.emitEvent('cell-mouseenter', Object.assign({
          cell: evnt.currentTarget
        }, params), evnt);
      }
    };
  } // hover 退出事件


  if (showTooltip || enabled || bindMouseleave) {
    tdOns.mouseleave = function (evnt) {
      if (isOperateMouse($xetable)) {
        return;
      }

      if (showTooltip || enabled) {
        $xetable.handleTargetLeaveEvent(evnt);
      }

      if (bindMouseleave) {
        $xetable.emitEvent('cell-mouseleave', Object.assign({
          cell: evnt.currentTarget
        }, params), evnt);
      }
    };
  } // 按下事件处理


  if (checkboxOpts.range || mouseConfig) {
    tdOns.mousedown = function (evnt) {
      $xetable.triggerCellMousedownEvent(evnt, params);
    };
  } // 点击事件处理


  if (highlightCurrentRow || tableListeners['cell-click'] || editRender && editConfig || expandOpts.trigger === 'row' || expandOpts.trigger === 'cell' || radioOpts.trigger === 'row' || column.type === 'radio' && radioOpts.trigger === 'cell' || checkboxOpts.trigger === 'row' || column.type === 'checkbox' && checkboxOpts.trigger === 'cell' || treeOpts.trigger === 'row' || column.treeNode && treeOpts.trigger === 'cell') {
    tdOns.click = function (evnt) {
      $xetable.triggerCellClickEvent(evnt, params);
    };
  } // 双击事件处理


  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = function (evnt) {
      $xetable.triggerCellDBLClickEvent(evnt, params);
    };
  } // 合并行或列


  if (mergeList.length) {
    var spanRest = mergeMethod(mergeList, _rowIndex, _columnIndex);

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
  } else if (spanMethod) {
    // 自定义合并行或列的方法
    var _ref = spanMethod(params) || {},
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
  } // 如果被合并不可隐藏


  if (fixedHiddenColumn && mergeList) {
    if (attrs.colspan > 1 || attrs.rowspan > 1) {
      fixedHiddenColumn = false;
    }
  } // 如果编辑列开启显示状态


  if (!fixedHiddenColumn && editConfig && (editRender || cellRender) && editOpts.showStatus) {
    isDirty = $xetable.isUpdateByRow(row, column.property);
  }

  var tdVNs = [];

  if (allColumnOverflow && fixedHiddenColumn) {
    tdVNs.push(h('div', {
      class: ['vxe-cell', {
        'c--title': showTitle,
        'c--tooltip': showTooltip,
        'c--ellipsis': showEllipsis
      }]
    }));
  } else {
    // 渲染单元格
    tdVNs.push.apply(tdVNs, _toConsumableArray(renderLine(h, _vm, $xetable, rowLevel, items, params)).concat([h('div', {
      class: ['vxe-cell', {
        'c--title': showTitle,
        'c--tooltip': showTooltip,
        'c--ellipsis': showEllipsis
      }],
      attrs: {
        title: showTitle ? _tools.UtilTools.getCellLabel(row, column, params) : null
      }
    }, column.renderCell(h, params))]));

    if (hasDefaultTip && hasValidError) {
      tdVNs.push(h('div', {
        class: 'vxe-cell--valid',
        style: validStore.rule && validStore.rule.maxWidth ? {
          width: "".concat(validStore.rule.maxWidth, "px")
        } : null
      }, [h('span', {
        class: 'vxe-cell--valid-msg'
      }, validStore.content)]));
    }
  }

  return h('td', {
    class: ['vxe-body--column', column.id, (_ref2 = {}, _defineProperty(_ref2, "col--".concat(cellAlign), cellAlign), _defineProperty(_ref2, "col--".concat(type), type), _defineProperty(_ref2, 'col--last', $columnIndex === columns.length - 1), _defineProperty(_ref2, 'col--tree-node', treeNode), _defineProperty(_ref2, 'col--edit', !!editRender), _defineProperty(_ref2, 'col--ellipsis', hasEllipsis), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref2, 'col--dirty', isDirty), _defineProperty(_ref2, 'col--actived', editConfig && editRender && actived.row === row && (actived.column === column || editOpts.mode === 'row')), _defineProperty(_ref2, 'col--valid-error', hasValidError), _defineProperty(_ref2, 'col--current', currentColumn === column), _ref2), _tools.UtilTools.getClass(className, params), _tools.UtilTools.getClass(cellClassName, params)],
    key: columnKey ? column.id : $columnIndex,
    attrs: attrs,
    style: cellStyle ? _ctor.default.isFunction(cellStyle) ? cellStyle(params) : cellStyle : null,
    on: tdOns
  }, tdVNs);
}

function renderRows(h, _vm, $xetable, $seq, rowLevel, fixedType, tableData, tableColumn) {
  var stripe = $xetable.stripe,
      rowKey = $xetable.rowKey,
      highlightHoverRow = $xetable.highlightHoverRow,
      rowClassName = $xetable.rowClassName,
      rowStyle = $xetable.rowStyle,
      allColumnOverflow = $xetable.showOverflow,
      treeConfig = $xetable.treeConfig,
      treeOpts = $xetable.treeOpts,
      treeExpandeds = $xetable.treeExpandeds,
      scrollYLoad = $xetable.scrollYLoad,
      scrollYStore = $xetable.scrollYStore,
      editStore = $xetable.editStore,
      rowExpandeds = $xetable.rowExpandeds,
      radioOpts = $xetable.radioOpts,
      checkboxOpts = $xetable.checkboxOpts,
      expandColumn = $xetable.expandColumn;
  var rows = [];
  tableData.forEach(function (row, $rowIndex) {
    var trOn = {};
    var rowIndex = $rowIndex;
    var seq = rowIndex + 1;

    if (scrollYLoad) {
      seq += scrollYStore.startIndex;
    }

    var _rowIndex = $xetable._getRowIndex(row); // 确保任何情况下 rowIndex 都精准指向真实 data 索引


    rowIndex = $xetable.getRowIndex(row); // 事件绑定

    if (highlightHoverRow) {
      trOn.mouseenter = function (evnt) {
        if (isOperateMouse($xetable)) {
          return;
        }

        $xetable.triggerHoverEvent(evnt, {
          row: row,
          rowIndex: rowIndex
        });
      };

      trOn.mouseleave = function () {
        if (isOperateMouse($xetable)) {
          return;
        }

        $xetable.clearHoverRow();
      };
    }

    var rowid = _tools.UtilTools.getRowid($xetable, row);

    var params = {
      $table: $xetable,
      $seq: $seq,
      seq: seq,
      rowid: rowid,
      fixed: fixedType,
      type: cellType,
      level: rowLevel,
      row: row,
      rowIndex: rowIndex,
      $rowIndex: $rowIndex
    };
    rows.push(h('tr', {
      class: ['vxe-body--row', {
        'row--stripe': stripe && ($xetable._getRowIndex(row) + 1) % 2 === 0,
        'is--new': editStore.insertList.indexOf(row) > -1,
        'row--radio': radioOpts.highlight && $xetable.selectRow === row,
        'row--checked': checkboxOpts.highlight && $xetable.isCheckedByCheckboxRow(row)
      }, rowClassName ? _ctor.default.isFunction(rowClassName) ? rowClassName(params) : rowClassName : ''],
      attrs: {
        'data-rowid': rowid
      },
      style: rowStyle ? _ctor.default.isFunction(rowStyle) ? rowStyle(params) : rowStyle : null,
      key: rowKey || treeConfig ? rowid : $rowIndex,
      on: trOn
    }, tableColumn.map(function (column, $columnIndex) {
      return renderColumn(h, _vm, $xetable, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, tableColumn, tableData);
    }))); // 如果行被展开了

    if (expandColumn && rowExpandeds.length && rowExpandeds.indexOf(row) > -1) {
      var cellStyle;

      if (treeConfig) {
        cellStyle = {
          paddingLeft: "".concat(rowLevel * treeOpts.indent + 30, "px")
        };
      }

      var showOverflow = expandColumn.showOverflow;
      var hasEllipsis = _ctor.default.isUndefined(showOverflow) || _ctor.default.isNull(showOverflow) ? allColumnOverflow : showOverflow;
      var expandParams = {
        $table: $xetable,
        $seq: $seq,
        seq: seq,
        column: expandColumn,
        fixed: fixedType,
        type: cellType,
        level: rowLevel,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex
      };
      rows.push(h('tr', {
        class: 'vxe-body--expanded-row',
        key: "expand_".concat(rowid),
        style: rowStyle ? _ctor.default.isFunction(rowStyle) ? rowStyle(expandParams) : rowStyle : null,
        on: trOn
      }, [h('td', {
        class: ['vxe-body--expanded-column', {
          'fixed--hidden': fixedType,
          'col--ellipsis': hasEllipsis
        }],
        attrs: {
          colspan: tableColumn.length
        }
      }, [h('div', {
        class: 'vxe-body--expanded-cell',
        style: cellStyle
      }, [expandColumn.renderData(h, expandParams)])])]));
    } // 如果是树形表格


    if (treeConfig && treeExpandeds.length) {
      var rowChildren = row[treeOpts.children];

      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push.apply(rows, _toConsumableArray(renderRows(h, _vm, $xetable, $seq ? "".concat($seq, ".").concat(seq) : "".concat(seq), rowLevel + 1, fixedType, rowChildren, tableColumn)));
      }
    }
  });
  return rows;
}
/**
 * 同步滚动条
 * scroll 方式：可以使固定列与内容保持一致的滚动效果，实现相对麻烦
 * mousewheel 方式：对于同步滚动效果就略差了，左右滚动，内容跟随即可
 * css3 translate 方式：对于同步滚动效果会有产生卡顿感觉，虽然可以利用硬件加速，渲染性能略优，但失去table布局能力
 */


var scrollProcessTimeout;

function syncBodyScroll(scrollTop, elem1, elem2) {
  if (elem1 || elem2) {
    if (elem1) {
      elem1.onscroll = null;
      elem1.scrollTop = scrollTop;
    }

    if (elem2) {
      elem2.onscroll = null;
      elem2.scrollTop = scrollTop;
    }

    clearTimeout(scrollProcessTimeout);
    scrollProcessTimeout = setTimeout(function () {
      if (elem1) {
        elem1.onscroll = elem1._onscroll;
      }

      if (elem2) {
        elem2.onscroll = elem2._onscroll;
      }
    }, 100);
  }
}

var _default = {
  name: 'VxeTableBody',
  props: {
    tableData: Array,
    tableColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String
  },
  mounted: function mounted() {
    var $xetable = this.$parent,
        $el = this.$el,
        $refs = this.$refs,
        fixedType = this.fixedType;
    var elemStore = $xetable.elemStore;
    var prefix = "".concat(fixedType || 'main', "-body-");
    elemStore["".concat(prefix, "wrapper")] = $el;
    elemStore["".concat(prefix, "table")] = $refs.table;
    elemStore["".concat(prefix, "colgroup")] = $refs.colgroup;
    elemStore["".concat(prefix, "list")] = $refs.tbody;
    elemStore["".concat(prefix, "xSpace")] = $refs.xSpace;
    elemStore["".concat(prefix, "ySpace")] = $refs.ySpace;
    elemStore["".concat(prefix, "emptyBlock")] = $refs.emptyBlock;
    this.$el.onscroll = this.scrollEvent;
    this.$el._onscroll = this.scrollEvent;
  },
  beforeDestroy: function beforeDestroy() {
    this.$el._onscroll = null;
    this.$el.onscroll = null;
  },
  render: function render(h) {
    var _e = this._e,
        $xetable = this.$parent,
        fixedColumn = this.fixedColumn,
        fixedType = this.fixedType;
    var $scopedSlots = $xetable.$scopedSlots,
        tId = $xetable.tId,
        tableData = $xetable.tableData,
        tableColumn = $xetable.tableColumn,
        allColumnOverflow = $xetable.showOverflow,
        keyboardConfig = $xetable.keyboardConfig,
        keyboardOpts = $xetable.keyboardOpts,
        mergeList = $xetable.mergeList,
        spanMethod = $xetable.spanMethod,
        scrollXLoad = $xetable.scrollXLoad,
        emptyRender = $xetable.emptyRender,
        emptyOpts = $xetable.emptyOpts,
        mouseConfig = $xetable.mouseConfig,
        mouseOpts = $xetable.mouseOpts; // 如果是固定列与设置了超出隐藏

    if (!mergeList.length && !spanMethod && !(keyboardConfig && keyboardOpts.isMerge)) {
      if (fixedType && allColumnOverflow) {
        tableColumn = fixedColumn;
      } else if (scrollXLoad) {
        if (fixedType) {
          tableColumn = fixedColumn;
        }
      }
    }

    var emptyContent;

    if ($scopedSlots.empty) {
      emptyContent = $scopedSlots.empty.call(this, {
        $table: $xetable
      }, h);
    } else {
      var compConf = emptyRender ? _vXETable.default.renderer.get(emptyOpts.name) : null;

      if (compConf && compConf.renderEmpty) {
        emptyContent = compConf.renderEmpty.call(this, h, emptyOpts, {
          $table: $xetable
        }, {
          $table: $xetable
        });
      } else {
        emptyContent = $xetable.emptyText || _conf.default.i18n('vxe.table.emptyText');
      }
    }

    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper'],
      attrs: {
        'data-tid': tId
      }
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      ref: 'xSpace'
    }), h('div', {
      class: 'vxe-body--y-space',
      ref: 'ySpace'
    }), h('table', {
      class: 'vxe-table--body',
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
    })),
    /**
     * 内容
     */
    h('tbody', {
      ref: 'tbody'
    }, renderRows(h, this, $xetable, '', 0, fixedType, tableData, tableColumn))]), h('div', {
      staticClass: 'vxe-table--checkbox-range'
    }), mouseConfig && mouseOpts.area ? h('div', {
      staticClass: 'vxe-table--cell-area'
    }, [h('span', {
      staticClass: 'vxe-table--cell-main-area'
    }, mouseOpts.extension ? [h('span', {
      staticClass: 'vxe-table--cell-main-area-btn',
      on: {
        mousedown: function mousedown(evnt) {
          $xetable.triggerCellExtendMousedownEvent(evnt, {
            $table: $xetable,
            fixed: fixedType,
            type: cellType
          });
        }
      }
    })] : null), h('span', {
      staticClass: 'vxe-table--cell-copy-area'
    }), h('span', {
      staticClass: 'vxe-table--cell-extend-area'
    }), h('span', {
      staticClass: 'vxe-table--cell-multi-area'
    }), h('span', {
      staticClass: 'vxe-table--cell-active-area'
    })]) : null, !fixedType ? h('div', {
      class: 'vxe-table--empty-block',
      ref: 'emptyBlock'
    }, [h('div', {
      class: 'vxe-table--empty-content'
    }, emptyContent)]) : null]);
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent: function scrollEvent(evnt) {
      var $el = this.$el,
          $xetable = this.$parent,
          fixedType = this.fixedType;
      var $refs = $xetable.$refs,
          highlightHoverRow = $xetable.highlightHoverRow,
          scrollXLoad = $xetable.scrollXLoad,
          scrollYLoad = $xetable.scrollYLoad,
          lastScrollTop = $xetable.lastScrollTop,
          lastScrollLeft = $xetable.lastScrollLeft;
      var tableHeader = $refs.tableHeader,
          tableBody = $refs.tableBody,
          leftBody = $refs.leftBody,
          rightBody = $refs.rightBody,
          tableFooter = $refs.tableFooter,
          validTip = $refs.validTip;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;
      var bodyElem = tableBody.$el;
      var leftElem = leftBody ? leftBody.$el : null;
      var rightElem = rightBody ? rightBody.$el : null;
      var scrollTop = $el.scrollTop;
      var scrollLeft = bodyElem.scrollLeft;
      var isX = scrollLeft !== lastScrollLeft;
      var isY = scrollTop !== lastScrollTop;
      $xetable.lastScrollTop = scrollTop;
      $xetable.lastScrollLeft = scrollLeft;
      $xetable.lastScrollTime = Date.now();

      if (highlightHoverRow) {
        $xetable.clearHoverRow();
      }

      if (leftElem && fixedType === 'left') {
        scrollTop = leftElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, rightElem);
      } else if (rightElem && fixedType === 'right') {
        scrollTop = rightElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, leftElem);
      } else {
        if (isX) {
          if (headerElem) {
            headerElem.scrollLeft = bodyElem.scrollLeft;
          }

          if (footerElem) {
            footerElem.scrollLeft = bodyElem.scrollLeft;
          }
        }

        if (leftElem || rightElem) {
          $xetable.checkScrolling();

          if (isY) {
            syncBodyScroll(scrollTop, leftElem, rightElem);
          }
        }
      }

      if (scrollXLoad && isX) {
        $xetable.triggerScrollXEvent(evnt);

        if (headerElem && scrollLeft + bodyElem.clientWidth >= bodyElem.scrollWidth - 80) {
          // 修复拖动滚动条时可能存在不同步问题
          this.$nextTick(function () {
            if (bodyElem.scrollLeft !== headerElem.scrollLeft) {
              headerElem.scrollLeft = bodyElem.scrollLeft;
            }
          });
        }
      }

      if (scrollYLoad && isY) {
        $xetable.triggerScrollYEvent(evnt);
      }

      if (isX && validTip && validTip.visible) {
        validTip.updatePlacement();
      }

      $xetable.emitEvent('scroll', {
        type: cellType,
        fixed: fixedType,
        scrollTop: scrollTop,
        scrollLeft: scrollLeft,
        isX: isX,
        isY: isY
      }, evnt);
    }
  }
};
exports.default = _default;