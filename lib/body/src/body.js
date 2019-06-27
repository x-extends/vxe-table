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

// 处理选中位置
// function handleLocation (obj, rows, columns, row, column) {
//   let rowIndex = rows.indexOf(row)
//   let columnIndex = columns.indexOf(column)
//   obj.active = rowIndex > -1 && columnIndex > -1
//   obj.top = rowIndex === 0 && columnIndex > -1
//   obj.bottom = rowIndex === rows.length - 1 && columnIndex > -1
//   obj.left = rowIndex > -1 && columnIndex === 0
//   obj.right = rowIndex > -1 && columnIndex === columns.length - 1
// }

/**
 * 渲染列
 */
function renderColumn(h, _vm, $table, $seq, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex) {
  var _ref2;

  var _e = $table._e,
      tableListeners = $table.$listeners,
      tableData = $table.tableData,
      overflowX = $table.overflowX,
      scrollXLoad = $table.scrollXLoad,
      scrollYLoad = $table.scrollYLoad,
      highlightCurrentRow = $table.highlightCurrentRow,
      allColumnOverflow = $table.showOverflow,
      cellClassName = $table.cellClassName,
      spanMethod = $table.spanMethod,
      treeConfig = $table.treeConfig,
      editConfig = $table.editConfig,
      editRules = $table.editRules,
      _$table$validConfig = $table.validConfig,
      validConfig = _$table$validConfig === void 0 ? {} : _$table$validConfig,
      validStore = $table.validStore;
  var editRender = column.editRender,
      align = column.align,
      showOverflow = column.showOverflow,
      columnKey = column.columnKey; // let {
  //   // checked,
  //   // selected,
  //   // actived
  //   // copyed
  // } = editStore
  // let isMouseSelected = mouseConfig && mouseConfig.selected
  // let isMouseChecked = mouseConfig && mouseConfig.checked
  // let isKeyboardCut = keyboardConfig && keyboardConfig.isCut

  var fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX;
  var showEllipsis = (showOverflow || allColumnOverflow) === 'ellipsis';
  var showTitle = (showOverflow || allColumnOverflow) === 'title';
  var showTooltip = showOverflow === true || showOverflow === 'tooltip' || allColumnOverflow === true || allColumnOverflow === 'tooltip';
  var hasEllipsis = showTitle || showTooltip || showEllipsis;
  var isDirty;
  var tdOns = {}; // let checkedLocat = {}
  // let checkedTLocat = {}
  // let copyedLocat = {}

  var validError = validStore.row === row && validStore.column === column;
  var hasDefaultTip = editRules && (!validConfig.message || validConfig.message === 'default');
  var attrs = {
    'data-index': columnIndex
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
    isHidden: fixedHiddenColumn,
    level: rowLevel,
    data: tableData // 滚动的渲染不支持动态行高

  };

  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true;
  } // hover 进入事件


  if (showTooltip || tableListeners['cell-mouseenter']) {
    tdOns.mouseenter = function (evnt) {
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
        isHidden: fixedHiddenColumn,
        level: rowLevel,
        cell: evnt.currentTarget // 如果配置了显示 tooltip

      };

      if (showTooltip) {
        $table.triggerTooltipEvent(evnt, evntParams);
      }

      _tools.UtilTools.emitEvent($table, 'cell-mouseenter', [evntParams, evnt]);
    };
  } // hover 退出事件


  if (showTooltip || tableListeners['cell-mouseleave']) {
    tdOns.mouseleave = function (evnt) {
      $table.clostTooltip();

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
        isHidden: fixedHiddenColumn,
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
      isHidden: fixedHiddenColumn,
      level: rowLevel,
      cell: evnt.currentTarget
    });
  }; // 点击事件处理


  if (highlightCurrentRow || tableListeners['cell-click'] || editRender && editConfig || treeConfig && (treeConfig.trigger === 'row' || column.treeNode && treeConfig.trigger === 'cell')) {
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
        isHidden: fixedHiddenColumn,
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
  } // 如果显示状态


  if (!fixedHiddenColumn && editConfig && editConfig.showStatus) {
    isDirty = $table.hasRowChange(row, column.property);
  } // 批量选中处理


  if (!fixedHiddenColumn && !fixedType) {// if (isMouseChecked) {
    //   handleLocation(checkedLocat, checked.rows, checked.columns, row, column)
    //   handleLocation(checkedTLocat, checked.tRows, checked.tColumns, row, column)
    // }
    // if (isKeyboardCut) {
    //   handleLocation(copyedLocat, copyed.rows, copyed.columns, row, column)
    // }
  }

  return h('td', {
    class: ['vxe-body--column', column.id, (_ref2 = {}, _defineProperty(_ref2, "col--".concat(align), align), _defineProperty(_ref2, 'col--edit', editRender), _defineProperty(_ref2, 'col--dirty', isDirty), _defineProperty(_ref2, 'col--valid-error', validError), _defineProperty(_ref2, 'edit--visible', editRender && editRender.type === 'visible'), _defineProperty(_ref2, 'fixed--hidden', fixedHiddenColumn), _ref2), cellClassName ? _xeUtils.default.isFunction(cellClassName) ? cellClassName(params) : cellClassName : ''],
    key: columnKey || columnIndex,
    attrs: attrs,
    on: tdOns
  }, allColumnOverflow && fixedHiddenColumn ? [] : [h('div', {
    class: ['vxe-cell', {
      'c--title': showTitle,
      'c--tooltip': showTooltip,
      'c--ellipsis': showEllipsis
    }],
    attrs: {
      title: showTitle ? _tools.UtilTools.getCellLabel(row, column, params) : null // style: {
      //   // width: hasEllipsis ? `${border ? renderWidth - 1 : renderWidth}px` : null
      // }

    }
  }, column.renderCell(h, params)), hasDefaultTip ? validError && tableData.length >= 2 ? h('div', {
    class: 'vxe-cell--valid',
    style: validStore.rule && validStore.rule.width ? {
      width: "".concat(validStore.rule.width, "px")
    } : null
  }, [h('span', {
    class: 'vxe-cell--valid-msg'
  }, validStore.content)]) : _e() : null // isMouseChecked && !fixedType ? h('span', {
  //   class: 'vxe-body--column-checked-lt'
  // }) : null,
  // isMouseChecked && !fixedType ? h('span', {
  //   class: 'vxe-body--column-checked-rb'
  // }) : null,
  // isKeyboardCut && !fixedType ? h('span', {
  //   class: 'vxe-body--column-copyed-lt'
  // }) : null,
  // isKeyboardCut && !fixedType ? h('span', {
  //   class: 'vxe-body--column-copyed-rb'
  // }) : null
  // checkedLocat.bottom && checkedLocat.right ? h('span', {
  //   class: 'vxe-body--column-checked-corner',
  //   on: {
  //     mousedown (evnt) {
  //       $table.triggerCornerMousedownEvent({ $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.target.parentNode }, evnt)
  //     }
  //   }
  // }) : null
  ]);
}

function renderRows(h, _vm, $table, $seq, rowLevel, fixedType, tableData, tableColumn) {
  var highlightHoverRow = $table.highlightHoverRow,
      rowClassName = $table.rowClassName,
      treeConfig = $table.treeConfig,
      treeExpandeds = $table.treeExpandeds,
      scrollYLoad = $table.scrollYLoad,
      _scrollYStore = $table._scrollYStore,
      editStore = $table.editStore,
      expandeds = $table.expandeds,
      getRowMapIndex = $table.getRowMapIndex,
      getColumnMapIndex = $table.getColumnMapIndex; // let { leftList, rightList } = columnStore

  var rows = [];
  tableData.forEach(function (row, $rowIndex) {
    var _ref3;

    var trOn = {};
    var rowIndex = $rowIndex;
    var seq = rowIndex + 1;

    if (scrollYLoad) {
      seq += _scrollYStore.startIndex;
    } // 确保任何情况下 rowIndex 都精准指向真实 data 索引


    rowIndex = getRowMapIndex(row); // 事件绑定

    if (highlightHoverRow) {
      trOn.mouseenter = function (evnt) {
        // if (row !== _hoverRow) {
        $table.triggerHoverEvent(evnt, {
          row: row,
          rowIndex: rowIndex
        }); // }
      }; // trOn.mouseleave = evnt => {
      //   $table._hoverRow = null
      // }

    }

    var rowId = _tools.UtilTools.getRowId($table, row, rowIndex);

    rows.push(h('tr', {
      class: ['vxe-body--row', (_ref3 = {}, _defineProperty(_ref3, "row--level-".concat(rowLevel), treeConfig), _defineProperty(_ref3, 'row--new', editStore.insertList.indexOf(row) > -1), _ref3), rowClassName ? _xeUtils.default.isFunction(rowClassName) ? rowClassName({
        $table: $table,
        seq: seq,
        row: row,
        rowIndex: rowIndex
      }) : rowClassName : ''],
      attrs: {
        'data-rowid': rowId
      },
      key: rowId,
      on: trOn
    }, tableColumn.map(function (column, $columnIndex) {
      var columnIndex = getColumnMapIndex(column);
      return renderColumn(h, _vm, $table, $seq, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex);
    })));

    if (treeConfig && treeExpandeds.length) {
      // 如果是树形表格
      var rowChildren = row[treeConfig.children];

      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push.apply(rows, renderRows(h, _vm, $table, $seq ? "".concat($seq, ".").concat(seq) : "".concat(seq), rowLevel + 1, fixedType, rowChildren, tableColumn));
      }
    } else if (expandeds.length) {
      // 如果行被展开了
      if (expandeds.indexOf(row) > -1) {
        var column = tableColumn.find(function (column) {
          return column.type === 'expand';
        });
        var columnIndex = getColumnMapIndex(column);

        if (column) {
          rows.push(h('tr', {
            class: ['vxe-body--expanded-row'],
            key: "expand_".concat(rowIndex),
            on: trOn
          }, [h('td', {
            class: ['vxe-body--expanded-column'],
            attrs: {
              colspan: tableColumn.length
            }
          }, [h('div', {
            class: ['vxe-body--expanded-cell']
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
      }
    }
  });
  return rows;
}
/**
 * 同步滚动条
 * scroll 方式：可以使固定列与内容保持一致的滚动效果，处理相对麻烦
 * mousewheel 方式：对于同步滚动效果就略差了，左右滚动，内容跟随即可
 */


var scrollProcessTimeout; // var updateLeftScrollingTimeput

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
    var $table = this.$parent,
        $el = this.$el,
        $refs = this.$refs,
        fixedType = this.fixedType;
    var _elemStore = $table._elemStore;
    var prefix = "".concat(fixedType || 'main', "-body-");
    _elemStore["".concat(prefix, "wrapper")] = $el;
    _elemStore["".concat(prefix, "table")] = $refs.table;
    _elemStore["".concat(prefix, "colgroup")] = $refs.colgroup;
    _elemStore["".concat(prefix, "list")] = $refs.tbody;
    _elemStore["".concat(prefix, "x-space")] = $refs.xSpace;
    _elemStore["".concat(prefix, "y-space")] = $refs.ySpace;
    _elemStore["".concat(prefix, "top-space")] = $refs.topSpace;
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
    var tableData = $table.tableData,
        tableColumn = $table.tableColumn,
        allColumnOverflow = $table.showOverflow,
        scrollXLoad = $table.scrollXLoad; // let customHeight = height === 'auto' ? _parentHeight : XEUtils.toNumber(height)
    // let style = {}
    // if (customHeight > 0) {
    //   style.height = `${fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollXHeight) : customHeight - headerHeight - footerHeight}px`
    // } else if (maxHeight) {
    //   maxHeight = XEUtils.toNumber(maxHeight)
    //   style['max-height'] = `${fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollXHeight) : maxHeight - headerHeight}px`
    // }
    // 如果是固定列与设置了超出隐藏

    if (fixedType && allColumnOverflow) {
      tableColumn = fixedColumn; // tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      } // tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)

    } // let tableStyle = {
    //   width: tableWidth ? `${tableWidth}px` : tableWidth,
    //   marginLeft: fixedType ? null : `${_scrollXStore.leftSpaceWidth}px`
    // }
    // // 兼容火狐滚动条
    // if (overflowY && fixedType && DomTools.browse['-moz']) {
    //   tableStyle.paddingRight = `${scrollYWidth}px`
    // }


    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? "fixed-".concat(fixedType, "--wrapper") : 'body--wrapper'],
      attrs: {
        fixed: fixedType
      },
      // style,
      on: {
        mouseleave: $table.clearHoverRow
      }
    }, [fixedType ? _e() : h('div', {
      class: ['vxe-body--x-space'],
      // style: {
      // width: `${$table.tableWidth}px`
      // },
      ref: 'xSpace'
    }), h('div', {
      class: ['vxe-body--y-space'],
      // style: {
      // height: `${_scrollYStore.bodyHeight}px`
      // },
      ref: 'ySpace'
    }), h('div', {
      class: ['vxe-body--top-space'],
      // style: {
      // height: `${_scrollYStore.topSpaceHeight}px`
      // },
      ref: 'topSpace'
    }), h('table', {
      class: ['vxe-table--body'],
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      // style: tableStyle,
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

        },
        key: columnIndex
      });
    })),
    /**
     * 内容
     */
    h('tbody', {
      ref: 'tbody'
    }, renderRows(h, this, $table, '', 0, fixedType, tableData, tableColumn))]), !fixedType && !tableData.length ? h('div', {
      class: 'vxe-table--empty-block'
    }, [h('span', {
      class: 'vxe-table--empty-text'
    }, $table.$slots.empty || _conf.default.i18n('vxe.table.emptyText'))]) : null // scrollYLoad ? h('div', {
    //   class: ['vxe-body--bottom-space'],
    //   style: {
    //     height: `${_scrollYStore.bottomSpaceHeight}px`
    //   }
    // }) : null
    ]);
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
          scrollYLoad = $table.scrollYLoad,
          triggerScrollXEvent = $table.triggerScrollXEvent,
          triggerScrollYEvent = $table.triggerScrollYEvent;
      var tableHeader = $refs.tableHeader,
          tableBody = $refs.tableBody,
          leftBody = $refs.leftBody,
          rightBody = $refs.rightBody;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var bodyElem = tableBody.$el;
      var leftElem = leftBody ? leftBody.$el : null;
      var rightElem = rightBody ? rightBody.$el : null;
      var scrollTop = bodyElem.scrollTop;
      var scrollLeft = bodyElem.scrollLeft;

      if (leftElem && fixedType === 'left') {
        scrollTop = leftElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, rightElem);
      } else if (rightElem && fixedType === 'right') {
        scrollTop = rightElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, leftElem);
      } else {
        if (headerElem) {
          headerElem.scrollLeft = bodyElem.scrollLeft;
        } // 缓解 IE 卡顿


        if (leftElem || rightElem) {
          // clearTimeout(updateLeftScrollingTimeput)
          // updateLeftScrollingTimeput = setTimeout($table.checkScrolling, DomTools.browse.msie ? 100 : 20)
          $table.checkScrolling();
          syncBodyScroll(scrollTop, leftElem, rightElem);
        }
      }

      if (scrollXLoad) {
        triggerScrollXEvent(evnt);
      }

      if (scrollYLoad) {
        triggerScrollYEvent(evnt);
      }

      _tools.UtilTools.emitEvent($table, 'scroll', [{
        type: 'body',
        fixed: fixedType,
        scrollTop: scrollTop,
        scrollLeft: scrollLeft,
        $table: $table
      }, evnt]);
    }
  }
};
exports.default = _default;