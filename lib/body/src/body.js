"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 滚动、拖动过程中不需要触发
function isOperateMouse($xetable) {
  return $xetable._isResize || $xetable.lastScrollTime && Date.now() < $xetable.lastScrollTime + $xetable.optimizeOpts.delayHover;
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
  switch ($xetable.vSize) {
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
}

function renderBorder(h, type) {
  return h('div', {
    class: "vxe-table-".concat(type, "ed-borders"),
    ref: "".concat(type, "Borders")
  }, [h('span', {
    class: 'vxe-table-border-top',
    ref: "".concat(type, "Top")
  }), h('span', {
    class: 'vxe-table-border-right',
    ref: "".concat(type, "Right")
  }), h('span', {
    class: 'vxe-table-border-bottom',
    ref: "".concat(type, "Bottom")
  }), h('span', {
    class: 'vxe-table-border-left',
    ref: "".concat(type, "Left")
  })]);
}
/**
 * 渲染列
 */


function renderColumn(h, _vm, $xetable, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, columns, items) {
  var _ref2;

  var _e = $xetable._e,
      tableListeners = $xetable.$listeners,
      tableData = $xetable.tableData,
      height = $xetable.height,
      columnKey = $xetable.columnKey,
      overflowX = $xetable.overflowX,
      scrollXLoad = $xetable.scrollXLoad,
      scrollYLoad = $xetable.scrollYLoad,
      highlightCurrentRow = $xetable.highlightCurrentRow,
      allColumnOverflow = $xetable.showOverflow,
      allAlign = $xetable.align,
      cellClassName = $xetable.cellClassName,
      cellStyle = $xetable.cellStyle,
      spanMethod = $xetable.spanMethod,
      radioOpts = $xetable.radioOpts,
      checkboxOpts = $xetable.checkboxOpts,
      expandOpts = $xetable.expandOpts,
      treeOpts = $xetable.treeOpts,
      mouseConfig = $xetable.mouseConfig,
      mouseOpts = $xetable.mouseOpts,
      editConfig = $xetable.editConfig,
      editOpts = $xetable.editOpts,
      editRules = $xetable.editRules,
      validOpts = $xetable.validOpts,
      editStore = $xetable.editStore,
      validStore = $xetable.validStore;
  var editRender = column.editRender,
      align = column.align,
      showOverflow = column.showOverflow,
      className = column.className,
      treeNode = column.treeNode;
  var actived = editStore.actived;
  var isMouseSelected = mouseConfig && mouseOpts.selected; // 在 v3.0 中废弃 mouse-config.checked

  var isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked);
  var fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX;
  var cellOverflow = _xeUtils.default.isUndefined(showOverflow) || _xeUtils.default.isNull(showOverflow) ? allColumnOverflow : showOverflow;
  var showEllipsis = cellOverflow === 'ellipsis';
  var showTitle = cellOverflow === 'title';
  var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
  var hasEllipsis = showTitle || showTooltip || showEllipsis;
  var isDirty;
  var tdOns = {};
  var cellAlign = align || allAlign;
  var validError = validStore.row === row && validStore.column === column;
  var hasDefaultTip = editRules && (validOpts.message === 'default' ? height || tableData.length > 1 : validOpts.message === 'inline');
  var attrs = {
    'data-colid': column.id
  };
  var triggerDblclick = editRender && editConfig && editOpts.trigger === 'dblclick';
  var params = {
    $table: $xetable,
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
    isHidden: fixedHiddenColumn,
    level: rowLevel,
    data: tableData,
    items: items
  }; // 虚拟滚动不支持动态高度

  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true;
  } // hover 进入事件


  if (showTitle || showTooltip || tableListeners['cell-mouseenter']) {
    tdOns.mouseenter = function (evnt) {
      if (isOperateMouse($xetable)) {
        return;
      }

      var evntParams = {
        $table: $xetable,
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
        isHidden: fixedHiddenColumn,
        level: rowLevel,
        cell: evnt.currentTarget
      };

      if (showTitle) {
        _tools.DomTools.updateCellTitle(evnt);
      } else if (showTooltip) {
        // 如果配置了显示 tooltip
        $xetable.triggerTooltipEvent(evnt, evntParams);
      }

      _tools.UtilTools.emitEvent($xetable, 'cell-mouseenter', [evntParams, evnt]);
    };
  } // hover 退出事件


  if (showTooltip || tableListeners['cell-mouseleave']) {
    tdOns.mouseleave = function (evnt) {
      if (isOperateMouse($xetable)) {
        return;
      }

      if (showTooltip) {
        $xetable.handleTargetLeaveEvent(evnt);
      }

      _tools.UtilTools.emitEvent($xetable, 'cell-mouseleave', [{
        $table: $xetable,
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
        isHidden: fixedHiddenColumn,
        level: rowLevel,
        cell: evnt.currentTarget
      }, evnt]);
    };
  } // 按下事件处理


  if (checkboxOpts.range || isMouseChecked || isMouseSelected) {
    tdOns.mousedown = function (evnt) {
      $xetable.triggerCellMousedownEvent(evnt, {
        $table: $xetable,
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
        isHidden: fixedHiddenColumn,
        level: rowLevel,
        cell: evnt.currentTarget
      });
    };
  } // 点击事件处理


  if (highlightCurrentRow || tableListeners['cell-click'] || isMouseChecked || editRender && editConfig || expandOpts.trigger === 'row' || expandOpts.trigger === 'cell' || radioOpts.trigger === 'row' || column.type === 'radio' && radioOpts.trigger === 'cell' || // 在 v3.0 中废弃 type=selection
  checkboxOpts.trigger === 'row' || (column.type === 'checkbox' || column.type === 'selection') && checkboxOpts.trigger === 'cell' || treeOpts.trigger === 'row' || column.treeNode && treeOpts.trigger === 'cell') {
    tdOns.click = function (evnt) {
      $xetable.triggerCellClickEvent(evnt, {
        $table: $xetable,
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
        isHidden: fixedHiddenColumn,
        level: rowLevel,
        cell: evnt.currentTarget
      });
    };
  } // 双击事件处理


  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = function (evnt) {
      $xetable.triggerCellDBLClickEvent(evnt, {
        $table: $xetable,
        $seq: $seq,
        seq: seq,
        row: row,
        rowIndex: rowIndex,
        $rowIndex: $rowIndex,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        fixed: fixedType,
        isHidden: fixedHiddenColumn,
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
    isDirty = $xetable.isUpdateByRow(row, column.property);
  }

  var type = column.type === 'seq' || column.type === 'index' ? 'seq' : column.type;
  return h('td', {
    class: ['vxe-body--column', column.id, (_ref2 = {}, _defineProperty(_ref2, "col--".concat(cellAlign), cellAlign), _defineProperty(_ref2, "col--".concat(type), type), _defineProperty(_ref2, 'col--last', $columnIndex === columns.length - 1), _defineProperty(_ref2, 'col--tree-node', treeNode), _defineProperty(_ref2, 'col--edit', editRender), _defineProperty(_ref2, 'col--ellipsis', hasEllipsis), _defineProperty(_ref2, 'edit--visible', editRender && editRender.type === 'visible'), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _defineProperty(_ref2, 'col--dirty', isDirty), _defineProperty(_ref2, 'col--actived', editConfig && editRender && actived.row === row && (actived.column === column || editOpts.mode === 'row')), _defineProperty(_ref2, 'col--valid-error', validError), _ref2), _tools.UtilTools.getClass(className, params), _tools.UtilTools.getClass(cellClassName, params)],
    key: columnKey ? column.id : columnIndex,
    attrs: attrs,
    style: cellStyle ? _xeUtils.default.isFunction(cellStyle) ? cellStyle(params) : cellStyle : null,
    on: tdOns
  }, allColumnOverflow && fixedHiddenColumn ? [h('div', {
    class: ['vxe-cell', {
      'c--title': showTitle,
      'c--tooltip': showTooltip,
      'c--ellipsis': showEllipsis
    }]
  })] : renderLine(h, _vm, $xetable, rowLevel, items, params).concat([h('div', {
    class: ['vxe-cell', {
      'c--title': showTitle,
      'c--tooltip': showTooltip,
      'c--ellipsis': showEllipsis
    }],
    attrs: {
      title: showTitle ? _tools.UtilTools.getCellLabel(row, column, params) : null
    }
  }, column.renderCell(h, params)), hasDefaultTip ? validError ? h('div', {
    class: 'vxe-cell--valid',
    style: validStore.rule && validStore.rule.maxWidth ? {
      width: "".concat(validStore.rule.maxWidth, "px")
    } : null
  }, [h('span', {
    class: 'vxe-cell--valid-msg'
  }, validStore.content)]) : _e() : null]));
}

function renderLine(h, _vm, $xetable, rowLevel, items, params) {
  var column = params.column;
  var treeOpts = $xetable.treeOpts,
      treeConfig = $xetable.treeConfig;
  return column.slots && column.slots.line ? column.slots.line.call($xetable, params, h) : column.treeNode && treeConfig && treeOpts.line ? [h('div', {
    class: 'vxe-tree--line-wrapper'
  }, [h('div', {
    class: 'vxe-tree--line',
    style: {
      height: "".concat(calcTreeLine(params, items), "px"),
      left: "".concat(rowLevel * treeOpts.indent + (rowLevel ? 2 - getOffsetSize($xetable) : 0) + 16, "px")
    }
  })])] : [];
}

function renderRows(h, _vm, $xetable, $seq, rowLevel, fixedType, tableData, tableColumn) {
  var stripe = $xetable.stripe,
      rowKey = $xetable.rowKey,
      highlightHoverRow = $xetable.highlightHoverRow,
      rowClassName = $xetable.rowClassName,
      rowStyle = $xetable.rowStyle,
      treeConfig = $xetable.treeConfig,
      treeOpts = $xetable.treeOpts,
      treeExpandeds = $xetable.treeExpandeds,
      scrollYLoad = $xetable.scrollYLoad,
      scrollYStore = $xetable.scrollYStore,
      editStore = $xetable.editStore,
      rowExpandeds = $xetable.rowExpandeds,
      radioOpts = $xetable.radioOpts,
      checkboxOpts = $xetable.checkboxOpts,
      expandColumn = $xetable.expandColumn,
      getColumnIndex = $xetable.getColumnIndex;
  var rows = [];
  tableData.forEach(function (row, $rowIndex) {
    var trOn = {};
    var rowIndex = $rowIndex;
    var seq = rowIndex + 1;

    if (scrollYLoad) {
      seq += scrollYStore.startIndex;
    } // 确保任何情况下 rowIndex 都精准指向真实 data 索引


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

      trOn.mouseleave = function (evnt) {
        if (isOperateMouse($xetable)) {
          return;
        }

        $xetable.clearHoverRow();
      };
    }

    var rowid = _tools.UtilTools.getRowid($xetable, row);

    rows.push(h('tr', {
      class: ['vxe-body--row', {
        'row--stripe': stripe && rowIndex > 0 && (rowIndex + 1) % 2 === 0,
        'row--new': editStore.insertList.indexOf(row) > -1,
        'row--radio': radioOpts.highlight && $xetable.selectRow === row,
        'row--cheched': checkboxOpts.highlight && $xetable.isCheckedByCheckboxRow(row)
      }, rowClassName ? _xeUtils.default.isFunction(rowClassName) ? rowClassName({
        $table: $xetable,
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
        $table: $xetable,
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
      return renderColumn(h, _vm, $xetable, $seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, tableColumn, tableData);
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
            $table: $xetable,
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
          $table: $xetable,
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
        rows.push.apply(rows, renderRows(h, _vm, $xetable, $seq ? "".concat($seq, ".").concat(seq) : "".concat(seq), rowLevel + 1, fixedType, rowChildren, tableColumn));
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
    visibleColumn: Array,
    collectColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String,
    isGroup: Boolean
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
        id = $xetable.id,
        tableData = $xetable.tableData,
        tableColumn = $xetable.tableColumn,
        allColumnOverflow = $xetable.showOverflow,
        spanMethod = $xetable.spanMethod,
        scrollXLoad = $xetable.scrollXLoad,
        mouseConfig = $xetable.mouseConfig,
        mouseOpts = $xetable.mouseOpts,
        emptyRender = $xetable.emptyRender,
        emptyOpts = $xetable.emptyOpts,
        _$xetable$keyboardCon = $xetable.keyboardConfig,
        keyboardConfig = _$xetable$keyboardCon === void 0 ? {} : _$xetable$keyboardCon; // 在 v3.0 中废弃 mouse-config.checked

    var isMouseChecked = mouseConfig && (mouseOpts.range || mouseOpts.checked); // 如果是固定列与设置了超出隐藏

    if (!spanMethod) {
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
        $table: this
      }, h);
    } else {
      var compConf = emptyRender ? _vXETable.default.renderer.get(emptyOpts.name) : null;

      if (compConf && compConf.renderEmpty) {
        emptyContent = compConf.renderEmpty(h, emptyOpts, {
          $table: this
        }, {
          $table: this
        });
      } else {
        emptyContent = _conf.default.i18n('vxe.table.emptyText');
      }
    }

    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper'],
      attrs: {
        'data-tid': id
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
        'data-tid': id,
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
    })),
    /**
     * 内容
     */
    h('tbody', {
      ref: 'tbody'
    }, renderRows(h, this, $xetable, '', 0, fixedType, tableData, tableColumn))]),
    /**
     * 选中边框线
     */
    !fixedType && (isMouseChecked || keyboardConfig.isCut) ? h('div', {
      class: 'vxe-table--borders'
    }, [isMouseChecked ? renderBorder(h, 'check') : null, keyboardConfig.isCut ? renderBorder(h, 'copy') : null]) : null, !fixedType ? h('div', {
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
      var $xetable = this.$parent,
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
          tableFooter = $refs.tableFooter;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;
      var bodyElem = tableBody.$el;
      var leftElem = leftBody ? leftBody.$el : null;
      var rightElem = rightBody ? rightBody.$el : null;
      var scrollTop = bodyElem.scrollTop;
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

      _tools.UtilTools.emitEvent($xetable, 'scroll', [{
        type: 'body',
        fixed: fixedType,
        scrollTop: scrollTop,
        scrollLeft: scrollLeft,
        isX: isX,
        isY: isY,
        $table: $xetable
      }, evnt]);
    }
  }
};
exports.default = _default;