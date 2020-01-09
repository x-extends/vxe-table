"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function handleLocation(obj, rows, columns, row, column) {
  var rowIndex = rows.indexOf(row);
  var columnIndex = columns.indexOf(column);
  obj.active = rowIndex > -1 && columnIndex > -1;
  obj.top = rowIndex === 0 && columnIndex > -1;
  obj.bottom = rowIndex === rows.length - 1 && columnIndex > -1;
  obj.left = rowIndex > -1 && columnIndex === 0;
  obj.right = rowIndex > -1 && columnIndex === columns.length - 1;
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

function getOffsetSize($table) {
  switch ($table.vSize) {
    case 'mini':
      return 3;

    case 'small':
      return 2;

    case 'medium':
      return 1;
  }

  return 0;
}

function calcTreeLine(params, items) {
  var $table = params.$table,
      $rowIndex = params.$rowIndex;
  var expandSize = 1;

  if ($rowIndex) {
    expandSize = countTreeExpand(items[$rowIndex - 1], params);
  }

  return $table.rowHeight * expandSize - ($rowIndex ? 1 : 12 - getOffsetSize($table));
} // 滚动、拖动过程中不需要触发


function isOperateMouse($table) {
  return $table._isResize || $table.lastScrollTime && Date.now() < $table.lastScrollTime + $table.optimizeOpts.delayHover;
}
/**
 * 渲染列
 */


function renderColumn(h, _vm, $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, columns, items) {
  var _ref2;

  var _e = $table._e,
      tableListeners = $table.$listeners,
      tableData = $table.tableData,
      height = $table.height,
      overflowX = $table.overflowX,
      scrollXLoad = $table.scrollXLoad,
      scrollYLoad = $table.scrollYLoad,
      cellOffsetWidth = $table.cellOffsetWidth,
      highlightCurrentRow = $table.highlightCurrentRow,
      allShowOverflow = $table.showOverflow,
      oldShowAllOverflow = $table.showAllOverflow,
      allAlign = $table.align,
      currentColumn = $table.currentColumn,
      cellClassName = $table.cellClassName,
      cellStyle = $table.cellStyle,
      spanMethod = $table.spanMethod,
      keyboardConfig = $table.keyboardConfig,
      expandOpts = $table.expandOpts,
      radioOpts = $table.radioOpts,
      checkboxOpts = $table.checkboxOpts,
      treeOpts = $table.treeOpts,
      mouseConfig = $table.mouseConfig,
      mouseOpts = $table.mouseOpts,
      editConfig = $table.editConfig,
      editOpts = $table.editOpts,
      editRules = $table.editRules,
      validOpts = $table.validOpts,
      editStore = $table.editStore,
      validStore = $table.validStore; // v2.0 废弃属性，保留兼容

  var allColumnOverflow = _xeUtils.default.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow;
  var editRender = column.editRender,
      align = column.align,
      showOverflow = column.showOverflow,
      renderWidth = column.renderWidth,
      columnKey = column.columnKey,
      className = column.className,
      treeNode = column.treeNode;
  var checked = editStore.checked,
      selected = editStore.selected,
      actived = editStore.actived,
      copyed = editStore.copyed;
  var isMouseSelected = mouseConfig && mouseOpts.selected; // 在 v3.0 中废弃 mouse-config.checked

  var isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked);
  var isKeyboardCut = keyboardConfig && keyboardConfig.isCut;
  var fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX;
  var cellOverflow = _xeUtils.default.isUndefined(showOverflow) || _xeUtils.default.isNull(showOverflow) ? allColumnOverflow : showOverflow;
  var cellAlign = align || allAlign;
  var showEllipsis = cellOverflow === 'ellipsis';
  var showTitle = cellOverflow === 'title';
  var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
  var hasEllipsis = showTitle || showTooltip || showEllipsis;
  var isDirty;
  var tdOns = {};
  var checkedLocat = {};
  var checkedTLocat = {};
  var copyedLocat = {};
  var validError = validStore.row === row && validStore.column === column;
  var hasDefaultTip = editRules && (validOpts.message === 'default' ? height || tableData.length > 1 : validOpts.message === 'inline');
  var attrs = {
    'data-colid': column.id
  };
  var triggerDblclick = editRender && editConfig && editOpts.trigger === 'dblclick';
  var params = {
    $table: $table,
    $seq: $seq,
    seq: seq,
    rowid: rowid,
    row: row,
    rowIndex: rowIndex,
    $rowIndex: $rowIndex,
    column: column,
    columnIndex: columnIndex,
    $columnIndex: $columnIndex,
    fixed: fixedType,
    level: rowLevel,
    isHidden: fixedHiddenColumn,
    data: tableData,
    items: items
  }; // 虚拟滚动不支持动态高度

  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true;
  } // hover 进入事件


  if (showTitle || showTooltip || tableListeners['cell-mouseenter']) {
    tdOns.mouseenter = function (evnt) {
      if (isOperateMouse($table)) {
        return;
      }

      var evntParams = {
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget
      };

      if (showTitle) {
        _tools.DomTools.updateCellTitle(evnt);
      } else if (showTooltip) {
        // 如果配置了显示 tooltip
        $table.triggerTooltipEvent(evnt, evntParams);
      }

      _tools.UtilTools.emitEvent($table, 'cell-mouseenter', [evntParams, evnt]);
    };
  } // hover 退出事件


  if (showTooltip || tableListeners['cell-mouseleave']) {
    tdOns.mouseleave = function (evnt) {
      if (isOperateMouse($table)) {
        return;
      }

      if (showTooltip) {
        $table.handleTargetLeaveEvent();
      }

      _tools.UtilTools.emitEvent($table, 'cell-mouseleave', [{
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget
      }, evnt]);
    };
  } // 按下事件处理


  if (checkboxOpts.range || isMouseSelected || isMouseChecked) {
    tdOns.mousedown = function (evnt) {
      $table.triggerCellMousedownEvent(evnt, {
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget
      });
    };
  } // 点击事件处理


  if (highlightCurrentRow || tableListeners['cell-click'] || editRender && editConfig || expandOpts.trigger === 'row' || expandOpts.trigger === 'cell' || radioOpts.trigger === 'row' || column.type === 'radio' && radioOpts.trigger === 'cell' || // 在 v3.0 中废弃 selection
  checkboxOpts.trigger === 'row' || column.type === 'checkbox' | column.type === 'selection' && checkboxOpts.trigger === 'cell' || treeOpts.trigger === 'row' || column.treeNode && treeOpts.trigger === 'cell') {
    tdOns.click = function (evnt) {
      $table.triggerCellClickEvent(evnt, {
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget
      });
    };
  } // 双击事件处理


  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = function (evnt) {
      $table.triggerCellDBLClickEvent(evnt, {
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget
      });
    };
  } // 合并行或列


  if (spanMethod) {
    var _ref = spanMethod(params) || {},
        _ref$rowspan = _ref.rowspan,
        rowspan = _ref$rowspan === void 0 ? 1 : _ref$rowspan,
        _ref$colspan = _ref.colspan,
        colspan = _ref$colspan === void 0 ? 1 : _ref$colspan;

    if (!rowspan || !colspan) {
      return null;
    }

    attrs.rowspan = rowspan;
    attrs.colspan = colspan;
  } // 如果编辑列开启显示状态


  if (!fixedHiddenColumn && editRender && editConfig && editOpts.showStatus) {
    isDirty = $table.isUpdateByRow(row, column.property);
  } // 批量选中处理


  if (!fixedHiddenColumn && !fixedType) {
    if (isMouseChecked) {
      handleLocation(checkedLocat, checked.rows, checked.columns, row, column);
      handleLocation(checkedTLocat, checked.tRows, checked.tColumns, row, column);
    }

    if (isKeyboardCut) {
      handleLocation(copyedLocat, copyed.rows, copyed.columns, row, column);
    }
  }

  var type = column.type === 'seq' || column.type === 'index' ? 'seq' : column.type;
  return h('td', {
    class: ['vxe-body--column', column.id, (_ref2 = {}, _defineProperty(_ref2, "col--".concat(cellAlign), cellAlign), _defineProperty(_ref2, "col--".concat(type), type), _defineProperty(_ref2, 'col--last', $columnIndex === columns.length - 1), _defineProperty(_ref2, 'col--tree-node', treeNode), _defineProperty(_ref2, 'col--edit', editRender), _defineProperty(_ref2, 'edit--visible', editRender && editRender.type === 'visible'), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref2, 'col--ellipsis', hasEllipsis), _defineProperty(_ref2, 'col--actived', editConfig && editRender && actived.row === row && (actived.column === column || editOpts.mode === 'row')), _defineProperty(_ref2, 'col--checked', checkedLocat.active), _defineProperty(_ref2, 'col--checked-top', checkedLocat.top), _defineProperty(_ref2, 'col--checked-bottom', checkedLocat.bottom), _defineProperty(_ref2, 'col--checked-left', checkedLocat.left), _defineProperty(_ref2, 'col--checked-right', checkedLocat.right), _defineProperty(_ref2, 'col--checked-temp', checkedTLocat.active), _defineProperty(_ref2, 'col--checked-temp-top', checkedTLocat.top), _defineProperty(_ref2, 'col--checked-temp-bottom', checkedTLocat.bottom), _defineProperty(_ref2, 'col--checked-temp-left', checkedTLocat.left), _defineProperty(_ref2, 'col--checked-temp-right', checkedTLocat.right), _defineProperty(_ref2, 'col--selected', isMouseSelected && editRender && selected.row === row && selected.column === column), _defineProperty(_ref2, 'col--copyed', copyedLocat.active), _defineProperty(_ref2, 'col--copyed-top', copyedLocat.top), _defineProperty(_ref2, 'col--copyed-bottom', copyedLocat.bottom), _defineProperty(_ref2, 'col--copyed-left', copyedLocat.left), _defineProperty(_ref2, 'col--copyed-right', copyedLocat.right), _defineProperty(_ref2, 'col--dirty', isDirty), _defineProperty(_ref2, 'col--valid-error', validError), _defineProperty(_ref2, 'col--current', currentColumn === column), _ref2), _tools.UtilTools.getClass(className, params), _tools.UtilTools.getClass(cellClassName, params)],
    key: columnKey || ($table.columnKey ? column.id : columnIndex),
    attrs: attrs,
    style: cellStyle ? _xeUtils.default.isFunction(cellStyle) ? cellStyle(params) : cellStyle : null,
    on: tdOns
  }, allColumnOverflow && fixedHiddenColumn ? [h('div', {
    class: ['vxe-cell', {
      'c--title': showTitle,
      'c--tooltip': showTooltip,
      'c--ellipsis': showEllipsis
    }]
  })] : renderLine(h, _vm, $table, rowLevel, items, params).concat([h('div', {
    class: ['vxe-cell', {
      'c--title': showTitle,
      'c--tooltip': showTooltip,
      'c--ellipsis': showEllipsis
    }],
    style: {
      width: hasEllipsis ? "".concat(renderWidth - cellOffsetWidth, "px") : null
    }
  }, column.renderCell(h, params)), hasDefaultTip ? validError ? h('div', {
    class: 'vxe-cell--valid',
    style: validStore.rule && validStore.rule.width ? {
      width: "".concat(validStore.rule.width, "px")
    } : null
  }, [h('span', {
    class: 'vxe-cell--valid-msg'
  }, validStore.content)]) : _e() : null, isMouseChecked && !fixedType ? h('span', {
    class: 'vxe-body--column-checked-lt'
  }) : null, isMouseChecked && !fixedType ? h('span', {
    class: 'vxe-body--column-checked-rb'
  }) : null, isKeyboardCut && !fixedType ? h('span', {
    class: 'vxe-body--column-copyed-lt'
  }) : null, isKeyboardCut && !fixedType ? h('span', {
    class: 'vxe-body--column-copyed-rb'
  }) : null, checkedLocat.bottom && checkedLocat.right ? h('span', {
    class: 'vxe-body--column-checked-corner',
    on: {
      mousedown: function mousedown(evnt) {
        $table.triggerCornerMousedownEvent({
          $table: $table,
          $seq: $seq,
          seq: seq,
          rowid: rowid,
          row: row,
          rowIndex: rowIndex,
          $rowIndex: $rowIndex,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          fixed: fixedType,
          level: rowLevel,
          cell: evnt.target.parentNode
        }, evnt);
      }
    }
  }) : null]));
}

function renderLine(h, _vm, $table, rowLevel, items, params) {
  var column = params.column;
  var treeConfig = $table.treeConfig,
      treeOpts = $table.treeOpts;
  return column.slots && column.slots.line ? column.slots.line.call($table, params, h) : column.treeNode && treeConfig && treeOpts.line ? [h('div', {
    class: 'vxe-tree--line-wrapper'
  }, [h('div', {
    class: 'vxe-tree--line',
    style: {
      height: "".concat(calcTreeLine(params, items), "px"),
      left: "".concat(rowLevel * treeOpts.indent + (rowLevel ? 2 - getOffsetSize($table) : 0) + 16, "px")
    }
  })])] : [];
}

function renderRows(h, _vm, $table, $seq, rowLevel, fixedType, tableData, tableColumn) {
  var stripe = $table.stripe,
      rowKey = $table.rowKey,
      highlightHoverRow = $table.highlightHoverRow,
      highlightCurrentRow = $table.highlightCurrentRow,
      rowClassName = $table.rowClassName,
      rowStyle = $table.rowStyle,
      currentRow = $table.currentRow,
      hoverRow = $table.hoverRow,
      treeConfig = $table.treeConfig,
      treeOpts = $table.treeOpts,
      treeExpandeds = $table.treeExpandeds,
      scrollYLoad = $table.scrollYLoad,
      scrollYStore = $table.scrollYStore,
      editStore = $table.editStore,
      rowExpandeds = $table.rowExpandeds,
      radioOpts = $table.radioOpts,
      checkboxOpts = $table.checkboxOpts,
      expandColumn = $table.expandColumn,
      getColumnIndex = $table.getColumnIndex;
  var rows = [];
  tableData.forEach(function (row, $rowIndex) {
    var trOn = {};
    var rowIndex = $rowIndex;
    var seq = rowIndex + 1;

    if (scrollYLoad) {
      seq += scrollYStore.startIndex;
    } // 确保任何情况下 rowIndex 都精准指向真实 data 索引


    rowIndex = $table.getRowIndex(row); // 事件绑定

    if (highlightHoverRow) {
      trOn.mouseenter = function (evnt) {
        if (isOperateMouse($table)) {
          return;
        }

        if (row !== hoverRow) {
          $table.triggerHoverEvent(evnt, {
            row: row,
            rowIndex: rowIndex
          });
        }
      };

      trOn.mouseleave = function (evnt) {
        if (isOperateMouse($table)) {
          return;
        }

        $table.hoverRow = null;
      };
    }

    var rowid = _tools.UtilTools.getRowid($table, row, rowIndex);

    rows.push(h('tr', {
      class: ['vxe-body--row', {
        'row--stripe': stripe && rowIndex > 0 && (rowIndex + 1) % 2 === 0,
        'row--current': highlightCurrentRow && row === currentRow,
        'row--hover': row === hoverRow,
        'row--new': editStore.insertList.indexOf(row) > -1,
        'row--radio': radioOpts.highlight && $table.selectRow === row,
        'row--cheched': checkboxOpts.highlight && $table.isCheckedByCheckboxRow(row)
      }, rowClassName ? _xeUtils.default.isFunction(rowClassName) ? rowClassName({
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        fixedType: fixedType,
        rowLevel: rowLevel,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex
      }) : rowClassName : ''],
      attrs: {
        'data-rowid': rowid
      },
      style: rowStyle ? _xeUtils.default.isFunction(rowStyle) ? rowStyle({
        $table: $table,
        $seq: $seq,
        seq: seq,
        rowid: rowid,
        fixedType: fixedType,
        rowLevel: rowLevel,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex
      }) : rowStyle : null,
      key: rowKey || treeConfig ? rowid : $rowIndex,
      on: trOn
    }, tableColumn.map(function (column, $columnIndex) {
      var columnIndex = getColumnIndex(column);
      return renderColumn(h, _vm, $table, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, tableColumn, tableData);
    }))); // 如果行被展开了

    if (rowExpandeds.length && rowExpandeds.indexOf(row) > -1) {
      var expandColumnIndex = getColumnIndex(expandColumn);
      var cellStyle;

      if (treeConfig) {
        cellStyle = {
          paddingLeft: "".concat(rowLevel * treeOpts.indent + 30, "px")
        };
      }

      if (expandColumn) {
        rows.push(h('tr', {
          class: 'vxe-body--expanded-row',
          key: "expand_".concat(rowid),
          style: rowStyle ? _xeUtils.default.isFunction(rowStyle) ? rowStyle({
            $table: $table,
            $seq: $seq,
            seq: seq,
            rowid: rowid,
            fixedType: fixedType,
            rowLevel: rowLevel,
            row: row,
            rowIndex: rowIndex,
            $rowIndex: $rowIndex,
            isExpanded: true
          }) : rowStyle : null,
          on: trOn
        }, [h('td', {
          class: 'vxe-body--expanded-column',
          attrs: {
            colspan: tableColumn.length
          }
        }, [h('div', {
          class: ['vxe-body--expanded-cell', {
            'fixed--hidden': fixedType
          }],
          style: cellStyle
        }, [expandColumn.renderData(h, {
          $table: $table,
          seq: seq,
          rowid: rowid,
          row: row,
          rowIndex: rowIndex,
          column: expandColumn,
          columnIndex: expandColumnIndex,
          fixed: fixedType,
          level: rowLevel
        })])])]));
      }
    } // 如果是树形表格


    if (treeConfig && treeExpandeds.length) {
      var rowChildren = row[treeOpts.children];

      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push.apply(rows, renderRows(h, _vm, $table, $seq ? "".concat($seq, ".").concat(seq) : "".concat(seq), rowLevel + 1, fixedType, rowChildren, tableColumn));
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
var updateLeftScrollingTimeput;

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
    visibleColumn: Array,
    collectColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String,
    isGroup: Boolean
  },
  mounted: function mounted() {
    this.$el.onscroll = this.scrollEvent;
    this.$el._onscroll = this.scrollEvent;
  },
  beforeDestroy: function beforeDestroy() {
    this.$el._onscroll = null;
    this.$el.onscroll = null;
  },
  render: function render(h) {
    var _e = this._e,
        $table = this.$parent,
        fixedColumn = this.fixedColumn,
        fixedType = this.fixedType;
    var $scopedSlots = $table.$scopedSlots,
        id = $table.id,
        maxHeight = $table.maxHeight,
        height = $table.height,
        parentHeight = $table.parentHeight,
        tableData = $table.tableData,
        tableColumn = $table.tableColumn,
        headerHeight = $table.headerHeight,
        showFooter = $table.showFooter,
        allShowOverflow = $table.showOverflow,
        oldShowAllOverflow = $table.showAllOverflow,
        footerHeight = $table.footerHeight,
        tableHeight = $table.tableHeight,
        tableWidth = $table.tableWidth,
        overflowY = $table.overflowY,
        scrollbarHeight = $table.scrollbarHeight,
        scrollbarWidth = $table.scrollbarWidth,
        scrollXStore = $table.scrollXStore,
        scrollXLoad = $table.scrollXLoad,
        scrollYLoad = $table.scrollYLoad,
        scrollYStore = $table.scrollYStore; // v2.0 废弃属性，保留兼容

    var allColumnOverflow = _xeUtils.default.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow;
    var customHeight = 0;
    var style = {};

    if (height) {
      customHeight = height === 'auto' ? parentHeight : _tools.DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : _xeUtils.default.toNumber(height);

      if (showFooter) {
        customHeight += scrollbarHeight + 1;
      }
    }

    if (maxHeight) {
      maxHeight = maxHeight === 'auto' ? parentHeight : _tools.DomTools.isScale(maxHeight) ? Math.floor(parseInt(maxHeight) / 100 * parentHeight) : _xeUtils.default.toNumber(maxHeight);
      style.maxHeight = "".concat(fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : maxHeight - headerHeight, "px");
    } else {
      if (customHeight > 0) {
        style.height = "".concat(fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight, "px");
      }
    } // 如果是固定列与设置了超出隐藏


    if (fixedType && allColumnOverflow) {
      tableColumn = fixedColumn;
      tableWidth = tableColumn.reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }

      tableWidth = tableColumn.reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
    }

    var tableStyle = {
      width: tableWidth ? "".concat(tableWidth, "px") : tableWidth,
      marginTop: scrollYStore.topSpaceHeight ? "".concat(scrollYStore.topSpaceHeight, "px") : null,
      marginLeft: fixedType ? null : scrollXStore.leftSpaceWidth ? "".concat(scrollXStore.leftSpaceWidth, "px") : null
    }; // 兼容火狐滚动条

    if (overflowY && fixedType && (_tools.DomTools.browse['-moz'] || _tools.DomTools.browse['safari'])) {
      tableStyle.paddingRight = "".concat(scrollbarWidth, "px");
    }

    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? "fixed--".concat(fixedType, "-wrapper") : 'body--wrapper'],
      attrs: {
        'data-tid': id
      },
      style: style
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      style: {
        width: scrollXLoad ? "".concat($table.tableWidth, "px") : ''
      }
    }), h('div', {
      class: 'vxe-body--y-space',
      style: {
        height: scrollYLoad ? "".concat(scrollYStore.ySpaceHeight, "px") : ''
      }
    }), h('table', {
      class: 'vxe-table--body',
      attrs: {
        'data-tid': id,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      style: tableStyle
    }, [
    /**
     * 列宽
     */
    h('colgroup', tableColumn.map(function (column, columnIndex) {
      return h('col', {
        attrs: {
          name: column.id
        },
        style: {
          width: "".concat(column.renderWidth, "px")
        },
        key: columnIndex
      });
    })),
    /**
     * 内容
     */
    h('tbody', renderRows(h, this, $table, '', 0, fixedType, tableData, tableColumn))]), !fixedType ? h('div', {
      class: 'vxe-table--empty-block',
      style: {
        width: tableWidth ? "".concat(tableWidth, "px") : tableWidth
      }
    }, [h('div', {
      class: 'vxe-table--empty-content'
    }, $scopedSlots.empty ? $scopedSlots.empty.call(this, {
      $table: this
    }, h) : _conf.default.i18n('vxe.table.emptyText'))]) : null]);
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent: function scrollEvent(evnt) {
      var $table = this.$parent,
          fixedType = this.fixedType,
          lastScrollTop = this.lastScrollTop,
          lastScrollLeft = this.lastScrollLeft;
      var $refs = $table.$refs,
          highlightHoverRow = $table.highlightHoverRow,
          scrollXLoad = $table.scrollXLoad,
          scrollYLoad = $table.scrollYLoad,
          triggerScrollXEvent = $table.triggerScrollXEvent,
          triggerScrollYEvent = $table.triggerScrollYEvent;
      var tableHeader = $refs.tableHeader,
          tableBody = $refs.tableBody,
          leftBody = $refs.leftBody,
          rightBody = $refs.rightBody,
          tableFooter = $refs.tableFooter;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;
      var bodyElem = tableBody.$el;
      var leftElem = leftBody ? leftBody.$el : null;
      var rightElem = rightBody ? rightBody.$el : null;
      var scrollTop = bodyElem.scrollTop;
      var scrollLeft = bodyElem.scrollLeft;
      var isX = lastScrollLeft !== scrollLeft;
      var isY = lastScrollTop !== scrollTop;

      if (highlightHoverRow) {
        $table.clearHoverRow();
      }

      if (leftElem && fixedType === 'left') {
        scrollTop = leftElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, rightElem);
      } else if (rightElem && fixedType === 'right') {
        scrollTop = rightElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, leftElem);
      } else {
        if (headerElem) {
          headerElem.scrollLeft = bodyElem.scrollLeft;
        }

        if (footerElem) {
          footerElem.scrollLeft = bodyElem.scrollLeft;
        } // 缓解 IE 卡顿


        if (leftElem || rightElem) {
          clearTimeout(updateLeftScrollingTimeput);
          updateLeftScrollingTimeput = setTimeout($table.checkScrolling, _tools.DomTools.browse.msie ? 200 : 20);
          syncBodyScroll(scrollTop, leftElem, rightElem);
        }
      }

      if (scrollXLoad) {
        triggerScrollXEvent(evnt);
      }

      if (scrollYLoad) {
        triggerScrollYEvent(evnt);
      }

      $table.lastScrollTop = scrollTop;
      $table.lastScrollLeft = scrollLeft;
      $table.lastScrollTime = Date.now();

      _tools.UtilTools.emitEvent($table, 'scroll', [{
        type: 'body',
        fixed: fixedType,
        scrollTop: scrollTop,
        scrollLeft: scrollLeft,
        isX: isX,
        isY: isY,
        $table: $table
      }, evnt]);
    }
  }
};
exports.default = _default;