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
} // 滚动、拖动过程中不需要触发


function isOperateMouse($table) {
  return $table._isResize || $table.lastScrollTime && Date.now() < $table.lastScrollTime + $table.optimizeOpts.delayHover;
}
/**
 * 渲染列
 */


function renderColumn(h, _vm, $table, $seq, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex) {
  var _ref2;

  var _e = $table._e,
      tableListeners = $table.$listeners,
      tableData = $table.tableData,
      height = $table.height,
      overflowX = $table.overflowX,
      scrollXLoad = $table.scrollXLoad,
      scrollYLoad = $table.scrollYLoad,
      border = $table.border,
      highlightCurrentRow = $table.highlightCurrentRow,
      allShowOverflow = $table.showOverflow,
      oldShowAllOverflow = $table.showAllOverflow,
      allAlign = $table.align,
      currentColumn = $table.currentColumn,
      cellClassName = $table.cellClassName,
      cellStyle = $table.cellStyle,
      spanMethod = $table.spanMethod,
      keyboardConfig = $table.keyboardConfig,
      _$table$expandConfig = $table.expandConfig,
      expandConfig = _$table$expandConfig === void 0 ? {} : _$table$expandConfig,
      _$table$radioConfig = $table.radioConfig,
      radioConfig = _$table$radioConfig === void 0 ? {} : _$table$radioConfig,
      _$table$treeConfig = $table.treeConfig,
      treeConfig = _$table$treeConfig === void 0 ? {} : _$table$treeConfig,
      mouseConfig = $table.mouseConfig,
      editConfig = $table.editConfig,
      editRules = $table.editRules,
      validOpts = $table.validOpts,
      editStore = $table.editStore,
      validStore = $table.validStore; // 在 v3.0 中废弃 selectConfig

  var checkboxConfig = $table.checkboxConfig || $table.selectConfig || {}; // v2.0 废弃属性，保留兼容

  var allColumnOverflow = _xeUtils.default.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow;
  var editRender = column.editRender,
      align = column.align,
      showOverflow = column.showOverflow,
      renderWidth = column.renderWidth,
      columnKey = column.columnKey,
      className = column.className;
  var checked = editStore.checked,
      selected = editStore.selected,
      actived = editStore.actived,
      copyed = editStore.copyed;
  var isMouseSelected = mouseConfig && mouseConfig.selected;
  var isMouseChecked = mouseConfig && mouseConfig.checked;
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
  var triggerDblclick = editRender && editConfig && editConfig.trigger === 'dblclick';
  var params = {
    $table: $table,
    $seq: $seq,
    seq: seq,
    row: row,
    rowIndex: rowIndex,
    $rowIndex: $rowIndex,
    column: column,
    columnIndex: columnIndex,
    $columnIndex: $columnIndex,
    fixed: fixedType,
    level: rowLevel,
    isHidden: fixedHiddenColumn,
    data: tableData
  }; // 滚动的渲染不支持动态行高

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
        seq: seq,
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
        seq: seq,
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


  tdOns.mousedown = function (evnt) {
    $table.triggerCellMousedownEvent(evnt, {
      $table: $table,
      seq: seq,
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
  }; // 点击事件处理


  if (highlightCurrentRow || tableListeners['cell-click'] || editRender && editConfig || expandConfig.trigger === 'row' || expandConfig.trigger === 'cell' || radioConfig.trigger === 'row' || column.type === 'radio' && radioConfig.trigger === 'cell' || // 在 v3.0 中废弃 selection
  checkboxConfig.trigger === 'row' || column.type === 'checkbox' | column.type === 'selection' && checkboxConfig.trigger === 'cell' || treeConfig.trigger === 'row' || column.treeNode && treeConfig.trigger === 'cell') {
    tdOns.click = function (evnt) {
      $table.triggerCellClickEvent(evnt, {
        $table: $table,
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
        seq: seq,
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
  } // 如果显示状态


  if (!fixedHiddenColumn && editConfig && editConfig.showStatus) {
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

  return h('td', {
    class: ['vxe-body--column', column.id, (_ref2 = {}, _defineProperty(_ref2, "col--".concat(cellAlign), cellAlign), _defineProperty(_ref2, 'col--edit', editRender), _defineProperty(_ref2, 'col--checked', checkedLocat.active), _defineProperty(_ref2, 'col--checked-top', checkedLocat.top), _defineProperty(_ref2, 'col--checked-bottom', checkedLocat.bottom), _defineProperty(_ref2, 'col--checked-left', checkedLocat.left), _defineProperty(_ref2, 'col--checked-right', checkedLocat.right), _defineProperty(_ref2, 'col--checked-temp', checkedTLocat.active), _defineProperty(_ref2, 'col--checked-temp-top', checkedTLocat.top), _defineProperty(_ref2, 'col--checked-temp-bottom', checkedTLocat.bottom), _defineProperty(_ref2, 'col--checked-temp-left', checkedTLocat.left), _defineProperty(_ref2, 'col--checked-temp-right', checkedTLocat.right), _defineProperty(_ref2, 'col--selected', isMouseSelected && editRender && selected.row === row && selected.column === column), _defineProperty(_ref2, 'col--copyed', copyedLocat.active), _defineProperty(_ref2, 'col--copyed-top', copyedLocat.top), _defineProperty(_ref2, 'col--copyed-bottom', copyedLocat.bottom), _defineProperty(_ref2, 'col--copyed-left', copyedLocat.left), _defineProperty(_ref2, 'col--copyed-right', copyedLocat.right), _defineProperty(_ref2, 'col--ellipsis', hasEllipsis), _defineProperty(_ref2, 'col--actived', editConfig && editRender && actived.row === row && (actived.column === column || editConfig.mode === 'row')), _defineProperty(_ref2, 'col--dirty', isDirty), _defineProperty(_ref2, 'col--valid-error', validError), _defineProperty(_ref2, 'col--current', currentColumn === column), _defineProperty(_ref2, 'edit--visible', editRender && editRender.type === 'visible'), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _ref2), _tools.UtilTools.getClass(className, params), _tools.UtilTools.getClass(cellClassName, params)],
    key: columnKey || ($table.columnKey ? column.id : columnIndex),
    attrs: attrs,
    style: cellStyle ? _xeUtils.default.isFunction(cellStyle) ? cellStyle(params) : cellStyle : null,
    on: tdOns
  }, allColumnOverflow && fixedHiddenColumn ? [] : [h('div', {
    class: ['vxe-cell', {
      'c--title': showTitle,
      'c--tooltip': showTooltip,
      'c--ellipsis': showEllipsis
    }],
    style: {
      width: hasEllipsis ? "".concat(border ? renderWidth - 1 : renderWidth, "px") : null
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
          seq: seq,
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
  }) : null]);
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
      treeExpandeds = $table.treeExpandeds,
      scrollYLoad = $table.scrollYLoad,
      overflowX = $table.overflowX,
      columnStore = $table.columnStore,
      scrollYStore = $table.scrollYStore,
      editStore = $table.editStore,
      expandeds = $table.expandeds,
      getColumnMapIndex = $table.getColumnMapIndex;
  var leftList = columnStore.leftList,
      rightList = columnStore.rightList;
  var rows = [];
  tableData.forEach(function (row, $rowIndex) {
    var _ref3;

    var trOn = {};
    var rowIndex = $rowIndex;
    var seq = rowIndex + 1;

    if (scrollYLoad) {
      seq += scrollYStore.startIndex;
    } // 确保任何情况下 rowIndex 都精准指向真实 data 索引


    rowIndex = $table.getRowIndex(row); // 事件绑定

    if (highlightHoverRow && (leftList.length || rightList.length) && overflowX) {
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
      class: ['vxe-body--row', (_ref3 = {
        'row--stripe': stripe && rowIndex > 0 && (rowIndex + 1) % 2 === 0
      }, _defineProperty(_ref3, "row--level-".concat(rowLevel), treeConfig), _defineProperty(_ref3, 'row--current', highlightCurrentRow && row === currentRow), _defineProperty(_ref3, 'row--hover', row === hoverRow), _defineProperty(_ref3, 'row--new', editStore.insertList.indexOf(row) > -1), _ref3), rowClassName ? _xeUtils.default.isFunction(rowClassName) ? rowClassName({
        $table: $table,
        $seq: $seq,
        seq: seq,
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
        fixedType: fixedType,
        rowLevel: rowLevel,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex
      }) : rowStyle : null,
      key: rowKey || treeConfig ? rowid : $rowIndex,
      on: trOn
    }, tableColumn.map(function (column, $columnIndex) {
      var columnIndex = getColumnMapIndex(column);
      return renderColumn(h, _vm, $table, $seq, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex);
    }))); // 如果行被展开了

    if (expandeds.length && expandeds.indexOf(row) > -1) {
      var column = _xeUtils.default.find(tableColumn, function (column) {
        return column.type === 'expand';
      });

      var columnIndex = getColumnMapIndex(column);
      var cellStyle;

      if (treeConfig) {
        cellStyle = {
          paddingLeft: "".concat(rowLevel * (treeConfig.indent || 16) + 30, "px")
        };
      }

      if (column) {
        rows.push(h('tr', {
          class: 'vxe-body--expanded-row',
          key: "expand_".concat(rowid),
          style: rowStyle ? _xeUtils.default.isFunction(rowStyle) ? rowStyle({
            $table: $table,
            $seq: $seq,
            seq: seq,
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
        }, [column.renderData(h, {
          $table: $table,
          seq: seq,
          row: row,
          rowIndex: rowIndex,
          column: column,
          columnIndex: columnIndex,
          fixed: fixedType,
          level: rowLevel
        })])])]));
      }
    } // 如果是树形表格


    if (treeConfig && treeExpandeds.length) {
      var rowChildren = row[treeConfig.children];

      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push.apply(rows, renderRows(h, _vm, $table, $seq ? "".concat($seq, ".").concat(seq) : "".concat(seq), rowLevel + 1, fixedType, rowChildren, tableColumn));
      }
    }
  });
  return rows;
}
/**
 * 同步滚动条
 * scroll 方式：可以使固定列与内容保持一致的滚动效果，处理相对麻烦
 * mousewheel 方式：对于同步滚动效果就略差了，左右滚动，内容跟随即可
 * css3 translate 方式：可以利用硬件加速，各方面较优，失去table布局能力
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
        loading = $table.loading,
        maxHeight = $table.maxHeight,
        height = $table.height,
        containerHeight = $table.containerHeight,
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
        scrollYStore = $table.scrollYStore; // v2.0 废弃属性，保留兼容

    var allColumnOverflow = _xeUtils.default.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow;
    var customHeight = height === 'auto' ? containerHeight : _tools.DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * containerHeight) : _xeUtils.default.toNumber(height);
    var style = {};

    if (showFooter) {
      customHeight += scrollbarHeight + 1;
    }

    if (customHeight > 0) {
      style.height = "".concat(fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight, "px");
    } else if (maxHeight) {
      maxHeight = _tools.DomTools.isScale(maxHeight) ? Math.floor(parseInt(maxHeight) / 100 * containerHeight) : _xeUtils.default.toNumber(maxHeight);
      style['max-height'] = "".concat(fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : maxHeight - headerHeight, "px");
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
      style: style
    }, [fixedType ? _e() : h('div', {
      class: 'vxe-body--x-space',
      style: {
        width: "".concat($table.tableWidth, "px")
      }
    }), h('div', {
      class: 'vxe-body--y-space',
      style: {
        height: "".concat(scrollYStore.ySpaceHeight, "px")
      }
    }), h('table', {
      class: 'vxe-table--body',
      attrs: {
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
          name: column.id,
          width: column.renderWidth
        },
        key: columnIndex
      });
    })),
    /**
     * 内容
     */
    h('tbody', renderRows(h, this, $table, '', 0, fixedType, tableData, tableColumn))]), !fixedType && !loading && !tableData.length ? h('div', {
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