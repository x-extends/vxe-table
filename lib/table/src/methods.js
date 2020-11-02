"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _cell = _interopRequireDefault(require("../../cell"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getRowid = _tools.UtilTools.getRowid,
    getRowkey = _tools.UtilTools.getRowkey,
    setCellValue = _tools.UtilTools.setCellValue,
    getCellLabel = _tools.UtilTools.getCellLabel,
    hasChildrenList = _tools.UtilTools.hasChildrenList,
    getColumnList = _tools.UtilTools.getColumnList;
var browse = _tools.DomTools.browse,
    calcHeight = _tools.DomTools.calcHeight,
    hasClass = _tools.DomTools.hasClass,
    addClass = _tools.DomTools.addClass,
    removeClass = _tools.DomTools.removeClass,
    getEventTargetNode = _tools.DomTools.getEventTargetNode;
var isWebkit = browse['-webkit'] && !browse.edge;
var debounceScrollYDuration = browse.msie ? 40 : 20;
var resizableStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_WIDTH';
var visibleStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_VISIBLE';
/**
 * 生成行的唯一主键
 */

function getRowUniqueId() {
  return _ctor.default.uniqueId('row_');
}
/**
 * 单元格的值为：'' | null | undefined 时都属于空值
 */


function eqCellNull(cellValue) {
  return cellValue === '' || _ctor.default.eqNull(cellValue);
}

function eqCellValue(row1, row2, field) {
  var val1 = _ctor.default.get(row1, field);

  var val2 = _ctor.default.get(row2, field);

  if (eqCellNull(val1) && eqCellNull(val2)) {
    return true;
  }

  if (_ctor.default.isString(val1) || _ctor.default.isNumber(val1)) {
    /* eslint-disable eqeqeq */
    return val1 == val2;
  }

  return _ctor.default.isEqual(val1, val2);
}

function getNextSortOrder(_vm, column) {
  var orders = _vm.sortOpts.orders;
  var currOrder = column.order || null;
  var oIndex = orders.indexOf(currOrder) + 1;
  return orders[oIndex < orders.length ? oIndex : 0];
}

function getCustomStorageMap(key) {
  var version = _conf.default.version;

  var rest = _ctor.default.toStringJSON(localStorage.getItem(key));

  return rest && rest._v === version ? rest : {
    _v: version
  };
}

function getRecoverRow(_vm, list) {
  var fullAllDataRowMap = _vm.fullAllDataRowMap;
  return list.filter(function (row) {
    return fullAllDataRowMap.has(row);
  });
}

function handleReserveRow(_vm, reserveRowMap) {
  var fullDataRowIdData = _vm.fullDataRowIdData;
  var reserveList = [];

  _ctor.default.each(reserveRowMap, function (item, rowid) {
    if (fullDataRowIdData[rowid] && reserveList.indexOf(fullDataRowIdData[rowid].row) === -1) {
      reserveList.push(fullDataRowIdData[rowid].row);
    }
  });

  return reserveList;
}

function computeVirtualX(_vm) {
  var $refs = _vm.$refs,
      visibleColumn = _vm.visibleColumn;
  var tableBody = $refs.tableBody;
  var tableBodyElem = tableBody ? tableBody.$el : null;

  if (tableBodyElem) {
    var scrollLeft = tableBodyElem.scrollLeft,
        clientWidth = tableBodyElem.clientWidth;
    var endWidth = scrollLeft + clientWidth;
    var toVisibleIndex = -1;
    var cWidth = 0;
    var visibleSize = 0;

    for (var colIndex = 0, colLen = visibleColumn.length; colIndex < colLen; colIndex++) {
      cWidth += visibleColumn[colIndex].renderWidth;

      if (toVisibleIndex === -1 && scrollLeft < cWidth) {
        toVisibleIndex = colIndex;
      }

      if (toVisibleIndex >= 0) {
        visibleSize++;

        if (cWidth > endWidth) {
          break;
        }
      }
    }

    return {
      toVisibleIndex: Math.max(0, toVisibleIndex),
      visibleSize: Math.max(8, visibleSize)
    };
  }

  return {
    toVisibleIndex: 0,
    visibleSize: 8
  };
}

function computeVirtualY(_vm) {
  var $refs = _vm.$refs,
      vSize = _vm.vSize,
      rowHeightMaps = _vm.rowHeightMaps;
  var tableHeader = $refs.tableHeader,
      tableBody = $refs.tableBody;
  var tableBodyElem = tableBody ? tableBody.$el : null;

  if (tableBodyElem) {
    var tableHeaderElem = tableHeader ? tableHeader.$el : null;
    var rowHeight = 0;
    var firstTrElem;
    firstTrElem = tableBodyElem.querySelector('tr');

    if (!firstTrElem && tableHeaderElem) {
      firstTrElem = tableHeaderElem.querySelector('tr');
    }

    if (firstTrElem) {
      rowHeight = firstTrElem.clientHeight;
    }

    if (!rowHeight) {
      rowHeight = rowHeightMaps[vSize || 'default'];
    }

    var visibleSize = Math.max(8, Math.ceil(tableBodyElem.clientHeight / rowHeight) + 2);
    return {
      rowHeight: rowHeight,
      visibleSize: visibleSize
    };
  }

  return {
    rowHeight: 0,
    visibleSize: 8
  };
}

function calculateMergerOffserIndex(list, offsetItem, type) {
  for (var mcIndex = 0, len = list.length; mcIndex < len; mcIndex++) {
    var mergeItem = list[mcIndex];
    var startIndex = offsetItem.startIndex,
        endIndex = offsetItem.endIndex;
    var mergeStartIndex = mergeItem[type];
    var mergeSpanNumber = mergeItem[type + 'span'];
    var mergeEndIndex = mergeStartIndex + mergeSpanNumber;

    if (mergeStartIndex < startIndex && startIndex < mergeEndIndex) {
      offsetItem.startIndex = mergeStartIndex;
    }

    if (mergeStartIndex < endIndex && endIndex < mergeEndIndex) {
      offsetItem.endIndex = mergeEndIndex;
    }

    if (offsetItem.startIndex !== startIndex || offsetItem.endIndex !== endIndex) {
      mcIndex = -1;
    }
  }
}

function setMerges(_vm, merges, mList, rowList) {
  if (merges) {
    var treeConfig = _vm.treeConfig,
        visibleColumn = _vm.visibleColumn;

    if (treeConfig) {
      throw new Error(_tools.UtilTools.getLog('vxe.error.noTree', ['merge-footer-items']));
    }

    if (!_ctor.default.isArray(merges)) {
      merges = [merges];
    }

    merges.forEach(function (item) {
      var row = item.row,
          col = item.col,
          rowspan = item.rowspan,
          colspan = item.colspan;

      if (rowList && _ctor.default.isNumber(row)) {
        row = rowList[row];
      }

      if (_ctor.default.isNumber(col)) {
        col = visibleColumn[col];
      }

      if ((rowList ? row : _ctor.default.isNumber(row)) && col && (rowspan || colspan)) {
        rowspan = _ctor.default.toNumber(rowspan) || 1;
        colspan = _ctor.default.toNumber(colspan) || 1;

        if (rowspan > 1 || colspan > 1) {
          var mcIndex = _ctor.default.findIndexOf(mList, function (item) {
            return item._row === row && item._col === col;
          });

          var mergeItem = mList[mcIndex];

          if (mergeItem) {
            mergeItem.rowspan = rowspan;
            mergeItem.colspan = colspan;
            mergeItem._rowspan = rowspan;
            mergeItem._colspan = colspan;
          } else {
            var mergeRowIndex = rowList ? rowList.indexOf(row) : row;
            var mergeColIndex = visibleColumn.indexOf(col);
            mList.push({
              row: mergeRowIndex,
              col: mergeColIndex,
              rowspan: rowspan,
              colspan: colspan,
              _row: row,
              _col: col,
              _rowspan: rowspan,
              _colspan: colspan
            });
          }
        }
      }
    });
  }
}

function removeMerges(_vm, merges, mList, rowList) {
  var rest = [];

  if (merges) {
    var treeConfig = _vm.treeConfig,
        visibleColumn = _vm.visibleColumn;

    if (treeConfig) {
      throw new Error(_tools.UtilTools.getLog('vxe.error.noTree', ['merge-cells']));
    }

    if (!_ctor.default.isArray(merges)) {
      merges = [merges];
    }

    merges.forEach(function (item) {
      var row = item.row,
          col = item.col;

      if (rowList && _ctor.default.isNumber(row)) {
        row = rowList[row];
      }

      if (_ctor.default.isNumber(col)) {
        col = visibleColumn[col];
      }

      var mcIndex = _ctor.default.findIndexOf(mList, function (item) {
        return item._row === row && item._col === col;
      });

      if (mcIndex > -1) {
        var rItems = mList.splice(mcIndex, 1);
        rest.push(rItems[0]);
      }
    });
  }

  return rest;
}

var Methods = {
  /**
   * 获取父容器元素
   */
  getParentElem: function getParentElem() {
    return this.$xegrid ? this.$xegrid.$el.parentNode : this.$el.parentNode;
  },

  /**
   * 获取父容器的高度
   */
  getParentHeight: function getParentHeight() {
    return this.$xegrid ? this.$xegrid.getParentHeight() : this.getParentElem().clientHeight;
  },

  /**
   * 获取需要排除的高度
   * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
   * 如果存在表尾合计滚动条，则需要排除滚动条高度
   */
  getExcludeHeight: function getExcludeHeight() {
    return this.$xegrid ? this.$xegrid.getExcludeHeight() : 0;
  },

  /**
   * 重置表格的一切数据状态
   */
  clearAll: function clearAll() {
    this.inited = false;
    this.clearSort();
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.clearRadioRow();
    this.clearRadioReserve();
    this.clearCheckboxRow();
    this.clearCheckboxReserve();
    this.clearRowExpand();
    this.clearTreeExpand();
    this.clearTreeExpandReserve();

    if (_vXETable.default._edit) {
      this.clearActived();
    }

    if (_vXETable.default._filter) {
      this.clearFilter();
    }

    if (this.keyboardConfig || this.mouseConfig) {
      this.clearSelected();
    }

    if (this.mouseConfig) {
      this.clearCellAreas();
      this.clearCopyCellArea();
    }

    return this.clearScroll();
  },

  /**
   * 同步 data 数据
   * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   */
  syncData: function syncData() {
    var _this = this;

    return this.$nextTick().then(function () {
      _this.tableData = [];
      return _this.$nextTick().then(function () {
        return _this.loadTableData(_this.tableFullData);
      });
    });
  },

  /**
   * 手动处理数据
   * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
   */
  updateData: function updateData() {
    return this.handleTableData(true).then(this.updateFooter).then(this.recalculate);
  },
  handleTableData: function handleTableData(force) {
    var scrollYLoad = this.scrollYLoad,
        scrollYStore = this.scrollYStore;
    var fullData = force ? this.updateAfterFullData() : this.afterFullData;
    this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullData.slice(0);
    return this.$nextTick();
  },

  /**
   * 加载表格数据
   * @param {Array} datas 数据
   */
  loadTableData: function loadTableData(datas) {
    var _this2 = this;

    var keepSource = this.keepSource,
        treeConfig = this.treeConfig,
        editStore = this.editStore,
        sYOpts = this.sYOpts,
        scrollYStore = this.scrollYStore,
        scrollXStore = this.scrollXStore;
    var tableFullData = datas ? datas.slice(0) : [];
    var scrollYLoad = !treeConfig && sYOpts.gt > -1 && sYOpts.gt < tableFullData.length;
    scrollYStore.startIndex = 0;
    scrollYStore.endIndex = 1;
    scrollXStore.startIndex = 0;
    scrollXStore.endIndex = 1;
    editStore.insertList = [];
    editStore.removeList = []; // 全量数据

    this.tableFullData = tableFullData; // 缓存数据

    this.updateCache(true); // 原始数据

    this.tableSynchData = datas;

    if (keepSource) {
      this.tableSourceData = _ctor.default.clone(tableFullData, true);
    }

    this.scrollYLoad = scrollYLoad;

    if (scrollYLoad) {
      if (!(this.height || this.maxHeight)) {
        _tools.UtilTools.error('vxe.error.reqProp', ['height | max-height']);
      }

      if (!this.showOverflow) {
        _tools.UtilTools.warn('vxe.error.reqProp', ['show-overflow']);
      }

      if (this.spanMethod) {
        _tools.UtilTools.warn('vxe.error.scrollErrProp', ['span-method']);
      }
    }

    this.clearMergeCells();
    this.clearMergeFooterItems();
    this.handleTableData(true);
    this.updateFooter();
    return this.computeScrollLoad().then(function () {
      // 是否加载了数据
      if (scrollYLoad) {
        scrollYStore.endIndex = scrollYStore.visibleSize;
      }

      _this2.handleReserveStatus();

      _this2.checkSelectionStatus();

      return _this2.$nextTick().then(function () {
        return _this2.recalculate();
      }).then(function () {
        return _this2.refreshScroll();
      });
    });
  },

  /**
   * 重新加载数据，不会清空表格状态
   * @param {Array} datas 数据
   */
  loadData: function loadData(datas) {
    var _this3 = this;

    return this.loadTableData(datas).then(function () {
      if (!_this3.inited) {
        _this3.inited = true;

        _this3.handleDefaults();
      }

      _this3.recalculate();
    });
  },

  /**
   * 重新加载数据，会清空表格状态
   * @param {Array} datas 数据
   */
  reloadData: function reloadData(datas) {
    var _this4 = this;

    return this.clearAll().then(function () {
      _this4.inited = true;
      return _this4.loadTableData(datas);
    }).then(this.handleDefaults);
  },

  /**
   * 局部加载行数据并恢复到初始状态
   * 对于行数据需要局部更改的场景中可能会用到
   * @param {Row} row 行对象
   * @param {Object} record 新数据
   * @param {String} field 字段名
   */
  reloadRow: function reloadRow(row, record, field) {
    var keepSource = this.keepSource,
        tableSourceData = this.tableSourceData,
        tableData = this.tableData;

    if (keepSource) {
      var rowIndex = this.getRowIndex(row);
      var oRow = tableSourceData[rowIndex];

      if (oRow && row) {
        if (field) {
          _ctor.default.set(oRow, field, _ctor.default.get(record || row, field));
        } else {
          if (record) {
            tableSourceData[rowIndex] = record;

            _ctor.default.clear(row, undefined);

            Object.assign(row, this.defineField(Object.assign({}, record)));
            this.updateCache(true);
          } else {
            _ctor.default.destructuring(oRow, _ctor.default.clone(row, true));
          }
        }
      }

      this.tableData = tableData.slice(0);
    } else {
      _tools.UtilTools.warn('vxe.error.reqProp', ['keep-source']);
    }

    return this.$nextTick();
  },

  /**
   * 加载列配置
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  loadColumn: function loadColumn(columns) {
    var _this5 = this;

    var collectColumn = _ctor.default.mapTree(columns, function (column) {
      return _cell.default.createColumn(_this5, column);
    });

    this.handleColumn(collectColumn);
    return this.$nextTick();
  },

  /**
   * 加载列配置并恢复到初始状态
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  reloadColumn: function reloadColumn(columns) {
    this.clearAll();
    return this.loadColumn(columns);
  },
  handleColumn: function handleColumn(collectColumn) {
    var _this6 = this;

    this.collectColumn = collectColumn;
    var tableFullColumn = getColumnList(collectColumn);
    this.tableFullColumn = tableFullColumn;
    this.cacheColumnMap();
    this.restoreCustomStorage();
    this.refreshColumn().then(function () {
      if (_this6.scrollXLoad) {
        _this6.loadScrollXData(true);
      }
    });
    this.clearMergeCells();
    this.clearMergeFooterItems();
    this.handleTableData(true);

    if ((this.scrollXLoad || this.scrollYLoad) && this.expandColumn) {
      _tools.UtilTools.warn('vxe.error.scrollErrProp', ['column.type=expand']);
    }

    this.$nextTick(function () {
      if (_this6.$toolbar) {
        _this6.$toolbar.syncUpdate({
          collectColumn: collectColumn,
          $table: _this6
        });
      }
    });
  },

  /**
   * 更新数据行的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  updateCache: function updateCache(source) {
    var _this7 = this;

    var treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        tableFullData = this.tableFullData,
        fullDataRowMap = this.fullDataRowMap,
        fullAllDataRowMap = this.fullAllDataRowMap;
    var fullDataRowIdData = this.fullDataRowIdData,
        fullAllDataRowIdData = this.fullAllDataRowIdData;
    var rowkey = getRowkey(this);
    var isLazy = treeConfig && treeOpts.lazy;

    var handleCache = function handleCache(row, index, items, path, parent) {
      var rowid = getRowid(_this7, row);

      if (!rowid) {
        rowid = getRowUniqueId();

        _ctor.default.set(row, rowkey, rowid);
      }

      if (isLazy && row[treeOpts.hasChild] && _ctor.default.isUndefined(row[treeOpts.children])) {
        row[treeOpts.children] = null;
      }

      var rest = {
        row: row,
        rowid: rowid,
        index: treeConfig && parent ? -1 : index,
        items: items,
        parent: parent
      };

      if (source) {
        fullDataRowIdData[rowid] = rest;
        fullDataRowMap.set(row, rest);
      }

      fullAllDataRowIdData[rowid] = rest;
      fullAllDataRowMap.set(row, rest);
    };

    if (source) {
      fullDataRowIdData = this.fullDataRowIdData = {};
      fullDataRowMap.clear();
    }

    fullAllDataRowIdData = this.fullAllDataRowIdData = {};
    fullAllDataRowMap.clear();

    if (treeConfig) {
      _ctor.default.eachTree(tableFullData, handleCache, treeOpts);
    } else {
      tableFullData.forEach(handleCache);
    }
  },
  appendTreeCache: function appendTreeCache(row, childs) {
    var _this8 = this;

    var keepSource = this.keepSource,
        tableSourceData = this.tableSourceData,
        treeOpts = this.treeOpts,
        fullDataRowIdData = this.fullDataRowIdData,
        fullDataRowMap = this.fullDataRowMap,
        fullAllDataRowMap = this.fullAllDataRowMap,
        fullAllDataRowIdData = this.fullAllDataRowIdData;
    var children = treeOpts.children,
        hasChild = treeOpts.hasChild;
    var rowkey = getRowkey(this);
    var rowid = getRowid(this, row);
    var matchObj;

    if (keepSource) {
      matchObj = _ctor.default.findTree(tableSourceData, function (item) {
        return rowid === getRowid(_this8, item);
      }, treeOpts);
    }

    _ctor.default.eachTree(childs, function (row, index, items, path, parent) {
      var rowid = getRowid(_this8, row);

      if (!rowid) {
        rowid = getRowUniqueId();

        _ctor.default.set(row, rowkey, rowid);
      }

      if (row[hasChild] && _ctor.default.isUndefined(row[children])) {
        row[children] = null;
      }

      var rest = {
        row: row,
        rowid: rowid,
        index: -1,
        items: items,
        parent: parent
      };
      fullDataRowIdData[rowid] = rest;
      fullDataRowMap.set(row, rest);
      fullAllDataRowIdData[rowid] = rest;
      fullAllDataRowMap.set(row, rest);
    }, treeOpts);

    if (matchObj) {
      matchObj.item[children] = _ctor.default.clone(childs, true);
    }
  },

  /**
   * 更新数据列的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  cacheColumnMap: function cacheColumnMap() {
    var tableFullColumn = this.tableFullColumn,
        collectColumn = this.collectColumn,
        fullColumnMap = this.fullColumnMap;
    var fullColumnIdData = this.fullColumnIdData = {};
    var fullColumnFieldData = this.fullColumnFieldData = {};
    var isGroup = collectColumn.some(hasChildrenList);
    var expandColumn;
    var treeNodeColumn;
    var hasFixed;

    var handleFunc = function handleFunc(column, index, items, path, parent) {
      var colid = column.id,
          property = column.property,
          fixed = column.fixed,
          type = column.type,
          treeNode = column.treeNode;
      var rest = {
        column: column,
        colid: colid,
        index: index,
        items: items,
        parent: parent
      };

      if (property) {
        if (fullColumnFieldData[property]) {
          _tools.UtilTools.warn('vxe.error.fieldRepet', ['field', property]);
        }

        fullColumnFieldData[property] = rest;
      }

      if (!hasFixed && fixed) {
        hasFixed = fixed;
      }

      if (!treeNodeColumn && treeNode) {
        treeNodeColumn = column;
      } else if (!expandColumn && type === 'expand') {
        expandColumn = column;
      }

      if (fullColumnIdData[colid]) {
        _tools.UtilTools.error('vxe.error.fieldRepet', ['colId', colid]);
      }

      fullColumnIdData[colid] = rest;
      fullColumnMap.set(column, rest);
    };

    fullColumnMap.clear();

    if (isGroup) {
      _ctor.default.eachTree(collectColumn, function (column, index, items, path, parent, nodes) {
        column.level = nodes.length;
        handleFunc(column, index, items, path, parent);
      });
    } else {
      tableFullColumn.forEach(handleFunc);
    }

    if (expandColumn && hasFixed) {
      _tools.UtilTools.warn('vxe.error.errConflicts', ['column.fixed', 'column.type=expand']);
    }

    if (expandColumn && this.mouseOpts.area) {
      _tools.UtilTools.error('vxe.error.errConflicts', ['mouse-config.area', 'column.type=expand']);
    }

    this.isGroup = isGroup;
    this.treeNodeColumn = treeNodeColumn;
    this.expandColumn = expandColumn;
  },

  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param {Element} tr 元素
   */
  getRowNode: function getRowNode(tr) {
    if (tr) {
      var fullAllDataRowIdData = this.fullAllDataRowIdData;
      var rowid = tr.getAttribute('data-rowid');
      var rest = fullAllDataRowIdData[rowid];

      if (rest) {
        return {
          rowid: rest.rowid,
          item: rest.row,
          index: rest.index,
          items: rest.items,
          parent: rest.parent
        };
      }
    }

    return null;
  },

  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param {Element} cell 元素
   */
  getColumnNode: function getColumnNode(cell) {
    if (cell) {
      var fullColumnIdData = this.fullColumnIdData;
      var colid = cell.getAttribute('data-colid');
      var rest = fullColumnIdData[colid];

      if (rest) {
        return {
          colid: rest.colid,
          item: rest.column,
          index: rest.index,
          items: rest.items,
          parent: rest.parent
        };
      }
    }

    return null;
  },

  /**
   * 根据 row 获取相对于 data 中的索引
   * @param {Row} row 行对象
   */
  getRowIndex: function getRowIndex(row) {
    return this.fullDataRowMap.has(row) ? this.fullDataRowMap.get(row).index : -1;
  },

  /**
   * 根据 row 获取相对于当前数据中的索引
   * @param {Row} row 行对象
   */
  _getRowIndex: function _getRowIndex(row) {
    return this.afterFullData.indexOf(row);
  },

  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param {Row} row 行对象
   */
  $getRowIndex: function $getRowIndex(row) {
    return this.tableData.indexOf(row);
  },

  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param {ColumnInfo} column 列配置
   */
  getColumnIndex: function getColumnIndex(column) {
    return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1;
  },

  /**
   * 根据 column 获取相对于当前表格列中的索引
   * @param {ColumnInfo} column 列配置
   */
  _getColumnIndex: function _getColumnIndex(column) {
    return this.visibleColumn.indexOf(column);
  },

  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param {ColumnInfo} column 列配置
   */
  $getColumnIndex: function $getColumnIndex(column) {
    return this.tableColumn.indexOf(column);
  },

  /**
   * 判断是否为索引列
   * @param {ColumnInfo} column 列配置
   */
  isSeqColumn: function isSeqColumn(column) {
    return column && column.type === 'seq';
  },

  /**
   * 定义行数据中的列属性，如果不存在则定义
   * @param {Row} record 行数据
   */
  defineField: function defineField(record) {
    var treeConfig = this.treeConfig,
        treeOpts = this.treeOpts;
    var rowkey = getRowkey(this);
    this.visibleColumn.forEach(function (_ref) {
      var property = _ref.property,
          editRender = _ref.editRender;

      if (property && !_ctor.default.has(record, property)) {
        _ctor.default.set(record, property, editRender && !_ctor.default.isUndefined(editRender.defaultValue) ? editRender.defaultValue : null);
      }
    });

    if (treeConfig && treeOpts.lazy && _ctor.default.isUndefined(record[treeOpts.children])) {
      record[treeOpts.children] = null;
    } // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数


    if (!_ctor.default.get(record, rowkey)) {
      _ctor.default.set(record, rowkey, getRowUniqueId());
    }

    return record;
  },

  /**
   * 创建 data 对象
   * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
   * @param {Array} records 新数据
   */
  createData: function createData(records) {
    var _this9 = this;

    var rowkey = getRowkey(this);
    var rows = records.map(function (record) {
      return _this9.defineField(Object.assign({}, record, _defineProperty({}, rowkey, null)));
    });
    return this.$nextTick().then(function () {
      return rows;
    });
  },

  /**
   * 创建 Row|Rows 对象
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param {Array/Object} records 新数据
   */
  createRow: function createRow(records) {
    var _this10 = this;

    var isArr = _ctor.default.isArray(records);

    if (!isArr) {
      records = [records];
    }

    return this.$nextTick().then(function () {
      return _this10.createData(records).then(function (rows) {
        return isArr ? rows : rows[0];
      });
    });
  },

  /**
   * 还原数据
   * 如果不传任何参数，则还原整个表格
   * 如果传 row 则还原一行
   * 如果传 rows 则还原多行
   * 如果还额外传了 field 则还原指定的单元格数据
   */
  revertData: function revertData(rows, field) {
    var _this11 = this;

    var keepSource = this.keepSource,
        tableSourceData = this.tableSourceData,
        tableFullData = this.tableFullData;

    if (keepSource) {
      if (arguments.length) {
        if (rows && !_ctor.default.isArray(rows)) {
          rows = [rows];
        }

        rows.forEach(function (row) {
          if (!_this11.isInsertByRow(row)) {
            var rowIndex = tableFullData.indexOf(row);
            var oRow = tableSourceData[rowIndex];

            if (oRow && row) {
              if (field) {
                _ctor.default.set(row, field, _ctor.default.clone(_ctor.default.get(oRow, field), true));
              } else {
                _ctor.default.destructuring(row, _ctor.default.clone(oRow, true));
              }
            }
          }
        });
        return this.$nextTick();
      }

      return this.reloadData(tableSourceData);
    } else {
      _tools.UtilTools.warn('vxe.error.reqProp', ['keep-source']);
    }

    return this.$nextTick();
  },

  /**
   * 清空单元格内容
   * 如果不创参数，则清空整个表格内容
   * 如果传 row 则清空一行内容
   * 如果传 rows 则清空多行内容
   * 如果还额外传了 field 则清空指定单元格内容
   * @param {Array/Row} rows 行数据
   * @param {String} field 字段名
   */
  clearData: function clearData(rows, field) {
    var tableFullData = this.tableFullData,
        visibleColumn = this.visibleColumn;

    if (!arguments.length) {
      rows = tableFullData;
    } else if (rows && !_ctor.default.isArray(rows)) {
      rows = [rows];
    }

    if (field) {
      rows.forEach(function (row) {
        return _ctor.default.set(row, field, null);
      });
    } else {
      rows.forEach(function (row) {
        visibleColumn.forEach(function (column) {
          if (column.property) {
            setCellValue(row, column, null);
          }
        });
      });
    }

    return this.$nextTick();
  },

  /**
   * 检查是否为临时行数据
   * @param {Row} row 行对象
   */
  isInsertByRow: function isInsertByRow(row) {
    return this.editStore.insertList.indexOf(row) > -1;
  },

  /**
   * 检查行或列数据是否发生改变
   * @param {Row} row 行对象
   * @param {String} field 字段名
   */
  isUpdateByRow: function isUpdateByRow(row, field) {
    var _this12 = this;

    var visibleColumn = this.visibleColumn,
        keepSource = this.keepSource,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        tableSourceData = this.tableSourceData,
        fullDataRowIdData = this.fullDataRowIdData;

    if (keepSource) {
      var oRow, property;
      var rowid = getRowid(this, row); // 新增的数据不需要检测

      if (!fullDataRowIdData[rowid]) {
        return false;
      }

      if (treeConfig) {
        var children = treeOpts.children;

        var matchObj = _ctor.default.findTree(tableSourceData, function (item) {
          return rowid === getRowid(_this12, item);
        }, treeOpts);

        row = Object.assign({}, row, _defineProperty({}, children, null));

        if (matchObj) {
          oRow = Object.assign({}, matchObj.item, _defineProperty({}, children, null));
        }
      } else {
        var oRowIndex = fullDataRowIdData[rowid].index;
        oRow = tableSourceData[oRowIndex];
      }

      if (oRow) {
        if (arguments.length > 1) {
          return !eqCellValue(oRow, row, field);
        }

        for (var index = 0, len = visibleColumn.length; index < len; index++) {
          property = visibleColumn[index].property;

          if (property && !eqCellValue(oRow, row, property)) {
            return true;
          }
        }
      }
    }

    return false;
  },

  /**
   * 获取表格的可视列，也可以指定索引获取列
   * @param {Number} columnIndex 索引
   */
  getColumns: function getColumns(columnIndex) {
    var columns = this.visibleColumn;
    return arguments.length ? columns[columnIndex] : columns.slice(0);
  },

  /**
   * 根据列的唯一主键获取列
   * @param {String} colid 列主键
   */
  getColumnById: function getColumnById(colid) {
    var fullColumnIdData = this.fullColumnIdData;
    return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null;
  },

  /**
   * 根据列的字段名获取列
   * @param {String} field 字段名
   */
  getColumnByField: function getColumnByField(field) {
    var fullColumnFieldData = this.fullColumnFieldData;
    return fullColumnFieldData[field] ? fullColumnFieldData[field].column : null;
  },

  /**
   * 获取当前表格的列
   * 收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
   */
  getTableColumn: function getTableColumn() {
    return {
      collectColumn: this.collectColumn.slice(0),
      fullColumn: this.tableFullColumn.slice(0),
      visibleColumn: this.visibleColumn.slice(0),
      tableColumn: this.tableColumn.slice(0)
    };
  },

  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData: function getData(rowIndex) {
    var tableSynchData = this.data || this.tableSynchData;
    return arguments.length ? tableSynchData[rowIndex] : tableSynchData.slice(0);
  },

  /**
   * 用于多选行，获取已选中的数据
   */
  getCheckboxRecords: function getCheckboxRecords() {
    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField;
    var rowList = [];

    if (property) {
      if (treeConfig) {
        rowList = _ctor.default.filterTree(tableFullData, function (row) {
          return _ctor.default.get(row, property);
        }, treeOpts);
      } else {
        rowList = tableFullData.filter(function (row) {
          return _ctor.default.get(row, property);
        });
      }
    } else {
      var selection = this.selection;

      if (treeConfig) {
        rowList = _ctor.default.filterTree(tableFullData, function (row) {
          return selection.indexOf(row) > -1;
        }, treeOpts);
      } else {
        rowList = tableFullData.filter(function (row) {
          return selection.indexOf(row) > -1;
        });
      }
    }

    return rowList;
  },

  /**
   * 获取处理后全量的表格数据
   * 如果存在筛选条件，继续处理
   */
  updateAfterFullData: function updateAfterFullData() {
    var visibleColumn = this.visibleColumn,
        tableFullData = this.tableFullData,
        filterOpts = this.filterOpts,
        sortOpts = this.sortOpts;
    var tableData = tableFullData.slice(0);

    var column = _ctor.default.find(visibleColumn, function (column) {
      return column.order;
    });

    var filterColumns = [];
    visibleColumn.forEach(function (column) {
      if (column.filters && column.filters.length) {
        var valueList = [];
        var itemList = [];
        column.filters.forEach(function (item) {
          if (item.checked) {
            itemList.push(item);
            valueList.push(item.value);
          }
        });
        filterColumns.push({
          column: column,
          valueList: valueList,
          itemList: itemList
        });
      }
    });

    if (filterColumns.length) {
      tableData = tableData.filter(function (row) {
        return filterColumns.every(function (_ref2) {
          var column = _ref2.column,
              valueList = _ref2.valueList,
              itemList = _ref2.itemList;

          if (valueList.length && !filterOpts.remote) {
            var filterRender = column.filterRender,
                property = column.property;
            var filterMethod = column.filterMethod;
            var allFilterMethod = filterOpts.filterMethod;
            var compConf = filterRender ? _vXETable.default.renderer.get(filterRender.name) : null;

            if (!filterMethod && compConf && compConf.renderFilter) {
              filterMethod = compConf.filterMethod;
            }

            if (allFilterMethod && !filterMethod) {
              return allFilterMethod({
                options: itemList,
                values: valueList,
                row: row,
                column: column
              });
            }

            return filterMethod ? itemList.some(function (item) {
              return filterMethod({
                value: item.value,
                option: item,
                row: row,
                column: column
              });
            }) : valueList.indexOf(_ctor.default.get(row, property)) > -1;
          }

          return true;
        });
      });
    }

    if (column && column.order) {
      var remoteSort = column.remoteSort,
          sortMethod = column.sortMethod,
          property = column.property,
          order = column.order;
      var allSortMethod = sortOpts.sortMethod;
      var isRemote = _ctor.default.isBoolean(remoteSort) ? remoteSort : sortOpts.remote;

      if (!isRemote) {
        if (allSortMethod && !sortMethod) {
          tableData = allSortMethod({
            data: tableData,
            column: column,
            property: property,
            order: order,
            $table: this
          }) || tableData;
        } else {
          var params = {
            $table: this
          };
          var rest = sortMethod ? tableData.sort(sortMethod) : _ctor.default.sortBy(tableData, column.sortBy || (column.formatter ? function (row) {
            return getCellLabel(row, column, params);
          } : property));
          tableData = order === 'desc' ? rest.reverse() : rest;
        }
      }
    }

    this.afterFullData = tableData;
    return tableData;
  },

  /**
   * 根据行的唯一主键获取行
   * @param {String/Number} rowid 行主键
   */
  getRowById: function getRowById(rowid) {
    var fullDataRowIdData = this.fullDataRowIdData;
    return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null;
  },

  /**
   * 根据行获取行的唯一主键
   * @param {Row} row 行对象
   */
  getRowid: function getRowid(row) {
    var fullAllDataRowMap = this.fullAllDataRowMap;
    return fullAllDataRowMap.has(row) ? fullAllDataRowMap.get(row).rowid : null;
  },

  /**
   * 获取处理后的表格数据
   * 如果存在筛选条件，继续处理
   * 如果存在排序，继续处理
   */
  getTableData: function getTableData() {
    var tableFullData = this.tableFullData,
        afterFullData = this.afterFullData,
        tableData = this.tableData,
        footerData = this.footerData;
    return {
      fullData: tableFullData.slice(0),
      visibleData: afterFullData.slice(0),
      tableData: tableData.slice(0),
      footerData: footerData.slice(0)
    };
  },

  /**
   * 默认行为只允许执行一次，除非被重置
   */
  handleDefaults: function handleDefaults() {
    var _this13 = this;

    if (this.checkboxConfig) {
      this.handleDefaultSelectionChecked();
    }

    if (this.radioConfig) {
      this.handleDefaultRadioChecked();
    }

    if (this.sortConfig) {
      this.handleDefaultSort();
    }

    if (this.expandConfig) {
      this.handleDefaultRowExpand();
    }

    if (this.treeConfig) {
      this.handleDefaultTreeExpand();
    }

    if (this.mergeCells) {
      this.handleDefaultMergeCells();
    }

    if (this.mergeFooterItems) {
      this.handleDefaultMergeFooterItems();
    }

    this.$nextTick(function () {
      return requestAnimationFrame(_this13.recalculate);
    });
  },

  /**
   * 隐藏指定列
   * @param {ColumnInfo} column 列配置
   */
  hideColumn: function hideColumn(column) {
    column.visible = false;
    return this.handleCustom();
  },

  /**
   * 显示指定列
   * @param {ColumnInfo} column 列配置
   */
  showColumn: function showColumn(column) {
    column.visible = true;
    return this.handleCustom();
  },

  /**
   * 手动重置列的显示隐藏、列宽拖动的状态；
   * 如果为 true 则重置所有状态
   * 如果已关联工具栏，则会同步更新
   */
  resetColumn: function resetColumn(options) {
    var customOpts = this.customOpts;
    var checkMethod = customOpts.checkMethod;
    var opts = Object.assign({
      visible: true,
      resizable: options === true
    }, options);
    this.tableFullColumn.forEach(function (column) {
      if (opts.resizable) {
        column.resizeWidth = 0;
      }

      if (!checkMethod || checkMethod({
        column: column
      })) {
        column.visible = column.defaultVisible;
      }
    });

    if (opts.resizable) {
      this.saveCustomResizable(true);
    }

    return this.handleCustom();
  },
  handleCustom: function handleCustom() {
    this.saveCustomVisible();
    this.analyColumnWidth();
    return this.refreshColumn();
  },

  /**
   * 还原自定义列操作状态
   */
  restoreCustomStorage: function restoreCustomStorage() {
    var id = this.id,
        collectColumn = this.collectColumn,
        customConfig = this.customConfig,
        customOpts = this.customOpts;
    var storage = customOpts.storage;
    var isAllStorage = customOpts.storage === true;
    var isResizable = isAllStorage || storage && storage.resizable;
    var isVisible = isAllStorage || storage && storage.visible;

    if (customConfig && (isResizable || isVisible)) {
      var customMap = {};

      if (!id) {
        _tools.UtilTools.error('vxe.error.reqProp', ['id']);

        return;
      }

      if (isResizable) {
        var columnWidthStorage = getCustomStorageMap(resizableStorageKey)[id];

        if (columnWidthStorage) {
          _ctor.default.each(columnWidthStorage, function (resizeWidth, field) {
            customMap[field] = {
              field: field,
              resizeWidth: resizeWidth
            };
          });
        }
      }

      if (isVisible) {
        var columnVisibleStorage = getCustomStorageMap(visibleStorageKey)[id];

        if (columnVisibleStorage) {
          var colVisibles = columnVisibleStorage.split('|');
          var colHides = colVisibles[0] ? colVisibles[0].split(',') : [];
          var colShows = colVisibles[1] ? colVisibles[1].split(',') : [];
          colHides.forEach(function (field) {
            if (customMap[field]) {
              customMap[field].visible = false;
            } else {
              customMap[field] = {
                field: field,
                visible: false
              };
            }
          });
          colShows.forEach(function (field) {
            if (customMap[field]) {
              customMap[field].visible = true;
            } else {
              customMap[field] = {
                field: field,
                visible: true
              };
            }
          });
        }
      }

      var keyMap = {};

      _ctor.default.eachTree(collectColumn, function (column) {
        var colKey = column.getKey();

        if (colKey) {
          keyMap[colKey] = column;
        }
      });

      _ctor.default.each(customMap, function (_ref3, field) {
        var visible = _ref3.visible,
            resizeWidth = _ref3.resizeWidth;
        var column = keyMap[field];

        if (column) {
          if (_ctor.default.isNumber(resizeWidth)) {
            column.resizeWidth = resizeWidth;
          }

          if (_ctor.default.isBoolean(visible)) {
            column.visible = visible;
          }
        }
      });
    }
  },
  saveCustomVisible: function saveCustomVisible() {
    var id = this.id,
        collectColumn = this.collectColumn,
        customConfig = this.customConfig,
        customOpts = this.customOpts;
    var checkMethod = customOpts.checkMethod,
        storage = customOpts.storage;
    var isAllStorage = customOpts.storage === true;
    var isVisible = isAllStorage || storage && storage.visible;

    if (customConfig && isVisible) {
      var columnVisibleStorageMap = getCustomStorageMap(visibleStorageKey);
      var colHides = [];
      var colShows = [];

      if (!id) {
        _tools.UtilTools.error('vxe.error.reqProp', ['id']);

        return;
      }

      _ctor.default.eachTree(collectColumn, function (column) {
        if (!checkMethod || checkMethod({
          column: column
        })) {
          if (!column.visible && column.defaultVisible) {
            var colKey = column.getKey();

            if (colKey) {
              colHides.push(colKey);
            }
          } else if (column.visible && !column.defaultVisible) {
            var _colKey = column.getKey();

            if (_colKey) {
              colShows.push(_colKey);
            }
          }
        }
      });

      columnVisibleStorageMap[id] = [colHides.join(',')].concat(colShows.length ? [colShows.join(',')] : []).join('|') || undefined;
      localStorage.setItem(visibleStorageKey, _ctor.default.toJSONString(columnVisibleStorageMap));
    }
  },
  saveCustomResizable: function saveCustomResizable(isReset) {
    var id = this.id,
        collectColumn = this.collectColumn,
        customConfig = this.customConfig,
        customOpts = this.customOpts;
    var storage = customOpts.storage;
    var isAllStorage = customOpts.storage === true;
    var isResizable = isAllStorage || storage && storage.resizable;

    if (customConfig && isResizable) {
      var columnWidthStorageMap = getCustomStorageMap(resizableStorageKey);
      var columnWidthStorage;

      if (!id) {
        _tools.UtilTools.error('vxe.error.reqProp', ['id']);

        return;
      }

      if (!isReset) {
        columnWidthStorage = _ctor.default.isPlainObject(columnWidthStorageMap[id]) ? columnWidthStorageMap[id] : {};

        _ctor.default.eachTree(collectColumn, function (column) {
          if (column.resizeWidth) {
            var colKey = column.getKey();

            if (colKey) {
              columnWidthStorage[colKey] = column.renderWidth;
            }
          }
        });
      }

      columnWidthStorageMap[id] = _ctor.default.isEmpty(columnWidthStorage) ? undefined : columnWidthStorage;
      localStorage.setItem(resizableStorageKey, _ctor.default.toJSONString(columnWidthStorageMap));
    }
  },

  /**
   * 刷新列信息
   * 将固定的列左边、右边分别靠边
   */
  refreshColumn: function refreshColumn() {
    var _this14 = this;

    var leftList = [];
    var centerList = [];
    var rightList = [];
    var collectColumn = this.collectColumn,
        tableFullColumn = this.tableFullColumn,
        isGroup = this.isGroup,
        columnStore = this.columnStore,
        sXOpts = this.sXOpts,
        scrollXStore = this.scrollXStore; // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏

    if (isGroup) {
      var leftGroupList = [];
      var centerGroupList = [];
      var rightGroupList = [];

      _ctor.default.eachTree(collectColumn, function (column, index, items, path, parent) {
        var isColGroup = hasChildrenList(column); // 如果是分组，必须按组设置固定列，不允许给子列设置固定

        if (parent && parent.fixed) {
          column.fixed = parent.fixed;
        }

        if (parent && column.fixed !== parent.fixed) {
          _tools.UtilTools.error('vxe.error.groupFixed');
        }

        if (isColGroup) {
          column.visible = !!_ctor.default.findTree(column.children, function (subColumn) {
            return hasChildrenList(subColumn) ? null : subColumn.visible;
          });
        } else if (column.visible) {
          if (column.fixed === 'left') {
            leftList.push(column);
          } else if (column.fixed === 'right') {
            rightList.push(column);
          } else {
            centerList.push(column);
          }
        }
      });

      collectColumn.forEach(function (column) {
        if (column.visible) {
          if (column.fixed === 'left') {
            leftGroupList.push(column);
          } else if (column.fixed === 'right') {
            rightGroupList.push(column);
          } else {
            centerGroupList.push(column);
          }
        }
      });
      this.tableGroupColumn = leftGroupList.concat(centerGroupList).concat(rightGroupList);
    } else {
      // 重新分配列
      tableFullColumn.forEach(function (column) {
        if (column.visible) {
          if (column.fixed === 'left') {
            leftList.push(column);
          } else if (column.fixed === 'right') {
            rightList.push(column);
          } else {
            centerList.push(column);
          }
        }
      });
    }

    var visibleColumn = leftList.concat(centerList).concat(rightList);
    var scrollXLoad = sXOpts.gt > -1 && sXOpts.gt < tableFullColumn.length;
    Object.assign(columnStore, {
      leftList: leftList,
      centerList: centerList,
      rightList: rightList
    });

    if (scrollXLoad && isGroup) {
      scrollXLoad = false;

      _tools.UtilTools.warn('vxe.error.scrollXNotGroup');
    }

    if (scrollXLoad) {
      if (this.showHeader && !this.showHeaderOverflow) {
        _tools.UtilTools.warn('vxe.error.reqProp', ['show-header-overflow']);
      }

      if (this.showFooter && !this.showFooterOverflow) {
        _tools.UtilTools.warn('vxe.error.reqProp', ['show-footer-overflow']);
      }

      if (this.spanMethod) {
        _tools.UtilTools.warn('vxe.error.scrollErrProp', ['span-method']);
      }

      if (this.footerSpanMethod) {
        _tools.UtilTools.warn('vxe.error.scrollErrProp', ['footer-span-method']);
      }

      var _computeVirtualX = computeVirtualX(this),
          visibleSize = _computeVirtualX.visibleSize;

      scrollXStore.startIndex = 0;
      scrollXStore.endIndex = visibleSize;
      scrollXStore.visibleSize = visibleSize;
    } // 如果列被显示/隐藏，则清除合并状态
    // 如果列被设置为固定，则清除合并状态


    if (visibleColumn.length !== this.visibleColumn.length || !this.visibleColumn.every(function (column, index) {
      return column === visibleColumn[index];
    })) {
      this.clearMergeCells();
      this.clearMergeFooterItems();
    }

    this.scrollXLoad = scrollXLoad;
    this.visibleColumn = visibleColumn;
    this.handleTableColumn();
    return this.$nextTick().then(function () {
      _this14.updateFooter();

      return _this14.recalculate(true);
    }).then(function () {
      _this14.updateCellAreas();
    });
  },

  /**
   * 指定列宽的列进行拆分
   */
  analyColumnWidth: function analyColumnWidth() {
    var columnOpts = this.columnOpts;
    var defaultWidth = columnOpts.width,
        defaultMinWidth = columnOpts.minWidth;
    var resizeList = [];
    var pxList = [];
    var pxMinList = [];
    var scaleList = [];
    var scaleMinList = [];
    var autoList = [];
    this.tableFullColumn.forEach(function (column) {
      if (defaultWidth && !column.width) {
        column.width = defaultWidth;
      }

      if (defaultMinWidth && !column.minWidth) {
        column.minWidth = defaultMinWidth;
      }

      if (column.visible) {
        if (column.resizeWidth) {
          resizeList.push(column);
        } else if (_tools.DomTools.isPx(column.width)) {
          pxList.push(column);
        } else if (_tools.DomTools.isScale(column.width)) {
          scaleList.push(column);
        } else if (_tools.DomTools.isPx(column.minWidth)) {
          pxMinList.push(column);
        } else if (_tools.DomTools.isScale(column.minWidth)) {
          scaleMinList.push(column);
        } else {
          autoList.push(column);
        }
      }
    });
    Object.assign(this.columnStore, {
      resizeList: resizeList,
      pxList: pxList,
      pxMinList: pxMinList,
      scaleList: scaleList,
      scaleMinList: scaleMinList,
      autoList: autoList
    });
  },

  /**
   * 刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）
   */
  refreshScroll: function refreshScroll() {
    var _this15 = this;

    var lastScrollLeft = this.lastScrollLeft,
        lastScrollTop = this.lastScrollTop;
    return this.clearScroll().then(function () {
      if (lastScrollLeft || lastScrollTop) {
        // 重置最后滚动状态
        _this15.lastScrollLeft = 0;
        _this15.lastScrollTop = 0; // 还原滚动状态

        return _this15.scrollTo(lastScrollLeft, lastScrollTop);
      }
    });
  },

  /**
   * 计算单元格列宽，动态分配可用剩余空间
   * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
   */
  recalculate: function recalculate(refull) {
    var _this16 = this;

    var $refs = this.$refs;
    var tableBody = $refs.tableBody,
        tableHeader = $refs.tableHeader,
        tableFooter = $refs.tableFooter;
    var bodyElem = tableBody ? tableBody.$el : null;
    var headerElem = tableHeader ? tableHeader.$el : null;
    var footerElem = tableFooter ? tableFooter.$el : null;

    if (bodyElem) {
      this.autoCellWidth(headerElem, bodyElem, footerElem);

      if (refull === true) {
        // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
        return this.computeScrollLoad().then(function () {
          _this16.autoCellWidth(headerElem, bodyElem, footerElem);

          _this16.computeScrollLoad();
        });
      }
    }

    return this.computeScrollLoad();
  },

  /**
   * 列宽算法
   * 支持 px、%、固定 混合分配
   * 支持动态列表调整分配
   * 支持自动分配偏移量
   * @param {Element} headerElem
   * @param {Element} bodyElem
   * @param {Element} footerElem
   * @param {Number} bodyWidth
   */
  autoCellWidth: function autoCellWidth(headerElem, bodyElem, footerElem) {
    var tableWidth = 0;
    var minCellWidth = 40; // 列宽最少限制 40px

    var bodyWidth = bodyElem.clientWidth;
    var remainWidth = bodyWidth;
    var meanWidth = remainWidth / 100;
    var fit = this.fit,
        columnStore = this.columnStore;
    var resizeList = columnStore.resizeList,
        pxMinList = columnStore.pxMinList,
        pxList = columnStore.pxList,
        scaleList = columnStore.scaleList,
        scaleMinList = columnStore.scaleMinList,
        autoList = columnStore.autoList; // 最小宽

    pxMinList.forEach(function (column) {
      var minWidth = parseInt(column.minWidth);
      tableWidth += minWidth;
      column.renderWidth = minWidth;
    }); // 最小百分比

    scaleMinList.forEach(function (column) {
      var scaleWidth = Math.floor(parseInt(column.minWidth) * meanWidth);
      tableWidth += scaleWidth;
      column.renderWidth = scaleWidth;
    }); // 固定百分比

    scaleList.forEach(function (column) {
      var scaleWidth = Math.floor(parseInt(column.width) * meanWidth);
      tableWidth += scaleWidth;
      column.renderWidth = scaleWidth;
    }); // 固定宽

    pxList.forEach(function (column) {
      var width = parseInt(column.width);
      tableWidth += width;
      column.renderWidth = width;
    }); // 调整了列宽

    resizeList.forEach(function (column) {
      var width = parseInt(column.resizeWidth);
      tableWidth += width;
      column.renderWidth = width;
    });
    remainWidth -= tableWidth;
    meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)) : 0;

    if (fit) {
      if (remainWidth > 0) {
        scaleMinList.concat(pxMinList).forEach(function (column) {
          tableWidth += meanWidth;
          column.renderWidth += meanWidth;
        });
      }
    } else {
      meanWidth = minCellWidth;
    } // 自适应


    autoList.forEach(function (column) {
      var width = Math.max(meanWidth, minCellWidth);
      column.renderWidth = width;
      tableWidth += width;
    });

    if (fit) {
      /**
       * 偏移量算法
       * 如果所有列足够放的情况下，从最后动态列开始分配
       */
      var dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoList);
      var dynamicSize = dynamicList.length - 1;

      if (dynamicSize > 0) {
        var odiffer = bodyWidth - tableWidth;

        if (odiffer > 0) {
          while (odiffer > 0 && dynamicSize >= 0) {
            odiffer--;
            dynamicList[dynamicSize--].renderWidth++;
          }

          tableWidth = bodyWidth;
        }
      }
    }

    var tableHeight = bodyElem.offsetHeight;
    var overflowY = bodyElem.scrollHeight > bodyElem.clientHeight;
    this.scrollbarWidth = overflowY ? bodyElem.offsetWidth - bodyWidth : 0;
    this.overflowY = overflowY;
    this.tableWidth = tableWidth;
    this.tableHeight = tableHeight;

    if (headerElem) {
      this.headerHeight = headerElem.clientHeight; // 检测是否同步滚动

      if (headerElem.scrollLeft !== bodyElem.scrollLeft) {
        headerElem.scrollLeft = bodyElem.scrollLeft;
      }
    } else {
      this.headerHeight = 0;
    }

    if (footerElem) {
      var footerHeight = footerElem.offsetHeight;
      this.scrollbarHeight = Math.max(footerHeight - footerElem.clientHeight, 0);
      this.overflowX = tableWidth > footerElem.clientWidth;
      this.footerHeight = footerHeight;
    } else {
      this.footerHeight = 0;
      this.scrollbarHeight = Math.max(tableHeight - bodyElem.clientHeight, 0);
      this.overflowX = tableWidth > bodyWidth;
    }

    this.customHeight = calcHeight(this, 'height');
    this.customMaxHeight = calcHeight(this, 'maxHeight');
    this.parentHeight = Math.max(this.headerHeight + this.footerHeight + 20, this.getParentHeight());

    if (this.overflowX) {
      this.checkScrolling();
    }
  },
  updateStyle: function updateStyle() {
    var _this17 = this;

    var $refs = this.$refs,
        isGroup = this.isGroup,
        fullColumnIdData = this.fullColumnIdData,
        tableColumn = this.tableColumn,
        customHeight = this.customHeight,
        customMaxHeight = this.customMaxHeight,
        border = this.border,
        headerHeight = this.headerHeight,
        showFooter = this.showFooter,
        allColumnOverflow = this.showOverflow,
        allColumnHeaderOverflow = this.showHeaderOverflow,
        allColumnFooterOverflow = this.showFooterOverflow,
        footerHeight = this.footerHeight,
        tableHeight = this.tableHeight,
        tableWidth = this.tableWidth,
        scrollbarHeight = this.scrollbarHeight,
        scrollbarWidth = this.scrollbarWidth,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad,
        cellOffsetWidth = this.cellOffsetWidth,
        columnStore = this.columnStore,
        elemStore = this.elemStore,
        editStore = this.editStore,
        currentRow = this.currentRow,
        mouseConfig = this.mouseConfig;
    var containerList = ['main', 'left', 'right'];
    var emptyPlaceholderElem = $refs.emptyPlaceholder;
    var bodyWrapperElem = elemStore['main-body-wrapper'];

    if (emptyPlaceholderElem) {
      emptyPlaceholderElem.style.top = "".concat(headerHeight, "px");
      emptyPlaceholderElem.style.height = bodyWrapperElem ? "".concat(bodyWrapperElem.offsetHeight - scrollbarHeight, "px") : '';
    }

    if (customHeight > 0) {
      if (showFooter) {
        customHeight += scrollbarHeight;
      }
    }

    containerList.forEach(function (name, index) {
      var fixedType = index > 0 ? name : '';
      var layoutList = ['header', 'body', 'footer'];
      var fixedColumn = columnStore["".concat(fixedType, "List")];
      var fixedWrapperElem = $refs["".concat(fixedType, "Container")];
      layoutList.forEach(function (layout) {
        var wrapperElem = elemStore["".concat(name, "-").concat(layout, "-wrapper")];
        var tableElem = elemStore["".concat(name, "-").concat(layout, "-table")];

        if (layout === 'header') {
          // 表头体样式处理
          // 横向滚动渲染
          var tWidth = tableWidth;

          if (scrollXLoad) {
            if (fixedType) {
              tableColumn = fixedColumn;
            }

            tWidth = tableColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, 0);
          }

          if (tableElem) {
            tableElem.style.width = tWidth ? "".concat(tWidth + scrollbarWidth, "px") : ''; // 修复 IE 中高度无法自适应问题

            if (browse.msie) {
              _ctor.default.arrayEach(tableElem.querySelectorAll('.vxe-resizable'), function (resizeElem) {
                resizeElem.style.height = "".concat(resizeElem.parentNode.offsetHeight, "px");
              });
            }
          }

          var repairElem = elemStore["".concat(name, "-").concat(layout, "-repair")];

          if (repairElem) {
            repairElem.style.width = "".concat(tableWidth, "px");
          }

          var listElem = elemStore["".concat(name, "-").concat(layout, "-list")];

          if (isGroup && listElem) {
            _ctor.default.arrayEach(listElem.querySelectorAll('.col--group'), function (thElem) {
              var colNode = _this17.getColumnNode(thElem);

              if (colNode) {
                var column = colNode.item;
                var showHeaderOverflow = column.showHeaderOverflow;
                var cellOverflow = _ctor.default.isBoolean(showHeaderOverflow) ? showHeaderOverflow : allColumnHeaderOverflow;
                var showEllipsis = cellOverflow === 'ellipsis';
                var showTitle = cellOverflow === 'title';
                var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
                var hasEllipsis = showTitle || showTooltip || showEllipsis;
                var childWidth = 0;
                var countChild = 0;

                if (hasEllipsis) {
                  _ctor.default.eachTree(column.children, function (item) {
                    if (!item.children || !column.children.length) {
                      countChild++;
                    }

                    childWidth += item.renderWidth;
                  });
                }

                thElem.style.width = hasEllipsis ? "".concat(childWidth - countChild - (border ? 2 : 0), "px") : '';
              }
            });
          }
        } else if (layout === 'body') {
          var emptyBlockElem = elemStore["".concat(name, "-").concat(layout, "-emptyBlock")];

          if (wrapperElem) {
            if (customMaxHeight) {
              wrapperElem.style.maxHeight = "".concat(fixedType ? customMaxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : customMaxHeight - headerHeight, "px");
            } else {
              if (customHeight > 0) {
                wrapperElem.style.height = "".concat(fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight, "px");
              } else {
                wrapperElem.style.height = '';
              }
            }
          } // 如果是固定列


          if (fixedWrapperElem) {
            var isRightFixed = fixedType === 'right';
            var _fixedColumn = columnStore["".concat(fixedType, "List")];

            if (wrapperElem) {
              wrapperElem.style.top = "".concat(headerHeight, "px");
            }

            fixedWrapperElem.style.height = "".concat((customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1), "px");
            fixedWrapperElem.style.width = "".concat(_fixedColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, isRightFixed ? scrollbarWidth : 0), "px");
          }

          var _tWidth = tableWidth; // 如果是固定列与设置了超出隐藏

          if (fixedType && allColumnOverflow) {
            tableColumn = fixedColumn;
            _tWidth = tableColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, 0);
          } else if (scrollXLoad) {
            if (fixedType) {
              tableColumn = fixedColumn;
            }

            _tWidth = tableColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, 0);
          }

          if (tableElem) {
            tableElem.style.width = _tWidth ? "".concat(_tWidth, "px") : ''; // 兼容性处理

            tableElem.style.paddingRight = scrollbarWidth && fixedType && (browse['-moz'] || browse.safari) ? "".concat(scrollbarWidth, "px") : '';
          }

          if (emptyBlockElem) {
            emptyBlockElem.style.width = _tWidth ? "".concat(_tWidth, "px") : '';
          }
        } else if (layout === 'footer') {
          // 如果是使用优化模式
          var _tWidth2 = tableWidth;

          if (fixedType && allColumnOverflow) {
            tableColumn = fixedColumn;
            _tWidth2 = tableColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, 0);
          } else if (scrollXLoad) {
            if (fixedType) {
              tableColumn = fixedColumn;
            }

            _tWidth2 = tableColumn.reduce(function (previous, column) {
              return previous + column.renderWidth;
            }, 0);
          }

          if (wrapperElem) {
            // 如果是固定列
            if (fixedWrapperElem) {
              wrapperElem.style.top = "".concat(customHeight > 0 ? customHeight - footerHeight : tableHeight + headerHeight, "px");
            }

            wrapperElem.style.marginTop = "".concat(-scrollbarHeight, "px");
          }

          if (tableElem) {
            tableElem.style.width = _tWidth2 ? "".concat(_tWidth2 + scrollbarWidth, "px") : '';
          }
        }

        var colgroupElem = elemStore["".concat(name, "-").concat(layout, "-colgroup")];

        if (colgroupElem) {
          _ctor.default.arrayEach(colgroupElem.children, function (colElem) {
            var colid = colElem.getAttribute('name');

            if (colid === 'col_gutter') {
              colElem.style.width = "".concat(scrollbarWidth, "px");
            }

            if (fullColumnIdData[colid]) {
              var column = fullColumnIdData[colid].column;
              var showHeaderOverflow = column.showHeaderOverflow,
                  showFooterOverflow = column.showFooterOverflow,
                  showOverflow = column.showOverflow;
              var cellOverflow;
              colElem.style.width = "".concat(column.renderWidth, "px");

              if (layout === 'header') {
                cellOverflow = _ctor.default.isUndefined(showHeaderOverflow) || _ctor.default.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
              } else if (layout === 'footer') {
                cellOverflow = _ctor.default.isUndefined(showFooterOverflow) || _ctor.default.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow;
              } else {
                cellOverflow = _ctor.default.isUndefined(showOverflow) || _ctor.default.isNull(showOverflow) ? allColumnOverflow : showOverflow;
              }

              var showEllipsis = cellOverflow === 'ellipsis';
              var showTitle = cellOverflow === 'title';
              var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
              var hasEllipsis = showTitle || showTooltip || showEllipsis;
              var _listElem = elemStore["".concat(name, "-").concat(layout, "-list")]; // 滚动的渲染不支持动态行高

              if (layout === 'header' || layout === 'footer') {
                if (scrollXLoad && !hasEllipsis) {
                  hasEllipsis = true;
                }
              } else {
                if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
                  hasEllipsis = true;
                }
              }

              if (_listElem) {
                _ctor.default.arrayEach(_listElem.querySelectorAll(".".concat(column.id)), function (elem) {
                  var colspan = parseInt(elem.getAttribute('colspan') || 1);
                  var cellElem = elem.querySelector('.vxe-cell');
                  var colWidth = column.renderWidth;

                  if (cellElem) {
                    if (colspan > 1) {
                      var columnIndex = _this17.getColumnIndex(column);

                      for (var _index = 1; _index < colspan; _index++) {
                        var nextColumn = _this17.getColumns(columnIndex + _index);

                        if (nextColumn) {
                          colWidth += nextColumn.renderWidth;
                        }
                      }
                    }

                    cellElem.style.width = hasEllipsis ? "".concat(colWidth - cellOffsetWidth * colspan, "px") : '';
                  }
                });
              }
            }
          });
        }
      });
    });

    if (currentRow) {
      this.setCurrentRow(currentRow);
    }

    if (mouseConfig && mouseConfig.selected && editStore.selected.row && editStore.selected.column) {
      this.addColSdCls();
    }

    return this.$nextTick();
  },

  /**
   * 处理固定列的显示状态
   */
  checkScrolling: function checkScrolling() {
    var _this$$refs = this.$refs,
        tableBody = _this$$refs.tableBody,
        leftContainer = _this$$refs.leftContainer,
        rightContainer = _this$$refs.rightContainer;
    var bodyElem = tableBody ? tableBody.$el : null;

    if (bodyElem) {
      if (leftContainer) {
        _tools.DomTools[bodyElem.scrollLeft > 0 ? 'addClass' : 'removeClass'](leftContainer, 'scrolling--middle');
      }

      if (rightContainer) {
        _tools.DomTools[bodyElem.clientWidth < bodyElem.scrollWidth - Math.ceil(bodyElem.scrollLeft) ? 'addClass' : 'removeClass'](rightContainer, 'scrolling--middle');
      }
    }
  },
  preventEvent: function preventEvent(evnt, type, args, next, end) {
    var _this18 = this;

    var evntList = _vXETable.default.interceptor.get(type);

    var rest;

    if (!evntList.some(function (func) {
      return func(Object.assign({
        $grid: _this18.$xegrid,
        $table: _this18,
        $event: evnt
      }, args)) === false;
    })) {
      if (next) {
        rest = next();
      }
    }

    if (end) {
      end();
    }

    return rest;
  },

  /**
   * 全局按下事件处理
   */
  handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
    var _this19 = this;

    var $el = this.$el,
        $refs = this.$refs,
        mouseConfig = this.mouseConfig,
        editStore = this.editStore,
        ctxMenuStore = this.ctxMenuStore,
        editOpts = this.editOpts,
        filterStore = this.filterStore,
        getRowNode = this.getRowNode;
    var actived = editStore.actived;
    var ctxWrapper = $refs.ctxWrapper,
        filterWrapper = $refs.filterWrapper,
        validTip = $refs.validTip;

    if (filterWrapper) {
      if (getEventTargetNode(evnt, $el, 'vxe-cell--filter').flag) {// 如果点击了筛选按钮
      } else if (getEventTargetNode(evnt, filterWrapper.$el).flag) {// 如果点击筛选容器
      } else {
        if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
          this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter);
        }
      }
    } // 如果已激活了编辑状态


    if (actived.row) {
      if (!(editOpts.autoClear === false)) {
        if (validTip && getEventTargetNode(evnt, validTip.$el).flag) {// 如果是激活状态，且点击了校验提示框
        } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
          // 如果是激活状态，且点击了下拉选项
          if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
            // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
            this.preventEvent(evnt, 'event.clearActived', actived.args, function () {
              var isClear;

              if (editOpts.mode === 'row') {
                var rowNode = getEventTargetNode(evnt, $el, 'vxe-body--row'); // row 方式，如果点击了不同行

                isClear = rowNode.flag ? getRowNode(rowNode.targetElem).item !== actived.args.row : false;
              } else {
                // cell 方式，如果是非编辑列
                isClear = !getEventTargetNode(evnt, $el, 'col--edit').flag;
              } // 如果点击表头行，则清除激活状态


              if (!isClear) {
                isClear = getEventTargetNode(evnt, $el, 'vxe-header--row').flag;
              } // 如果点击表尾行，则清除激活状态


              if (!isClear) {
                isClear = getEventTargetNode(evnt, $el, 'vxe-footer--row').flag;
              } // 如果固定了高度且点击了行之外的空白处，则清除激活状态


              if (!isClear && _this19.height && !_this19.overflowY) {
                var bodyWrapperElem = evnt.target;

                if (hasClass(bodyWrapperElem, 'vxe-table--body-wrapper')) {
                  isClear = evnt.offsetY < bodyWrapperElem.clientHeight;
                }
              }

              if (isClear || // 如果点击了当前表格之外
              !getEventTargetNode(evnt, $el).flag) {
                requestAnimationFrame(function () {
                  return _this19.clearActived(evnt);
                });
              }
            });
          }
        }
      }
    } else if (mouseConfig) {
      if (!getEventTargetNode(evnt, $el).flag && (!ctxWrapper || !getEventTargetNode(evnt, ctxWrapper.$el).flag)) {
        this.clearSelected();

        if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-areas-clear').flag) {
          this.preventEvent(evnt, 'event.clearAreas', {}, function () {
            _this19.clearCellAreas();

            _this19.clearCopyCellArea();
          });
        }
      }
    } // 如果配置了快捷菜单且，点击了其他地方则关闭


    if (ctxMenuStore.visible && ctxWrapper && !getEventTargetNode(evnt, ctxWrapper.$el).flag) {
      this.closeMenu();
    } // 最后激活的表格


    this.isActivated = getEventTargetNode(evnt, (this.$xegrid || this).$el).flag;
  },

  /**
   * 窗口失焦事件处理
   */
  handleGlobalBlurEvent: function handleGlobalBlurEvent() {
    this.closeFilter();
    this.closeMenu();
  },

  /**
   * 全局滚动事件
   */
  handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent() {
    this.clostTooltip();
    this.closeMenu();
  },

  /**
   * 全局键盘事件
   */
  handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
    var _this20 = this;

    // 该行为只对当前激活的表格有效
    if (this.isActivated) {
      this.preventEvent(evnt, 'event.keydown', null, function () {
        var isCtxMenu = _this20.isCtxMenu,
            ctxMenuStore = _this20.ctxMenuStore,
            editStore = _this20.editStore,
            editOpts = _this20.editOpts,
            editConfig = _this20.editConfig,
            _this20$mouseConfig = _this20.mouseConfig,
            mouseConfig = _this20$mouseConfig === void 0 ? {} : _this20$mouseConfig,
            _this20$keyboardConfi = _this20.keyboardConfig,
            keyboardConfig = _this20$keyboardConfi === void 0 ? {} : _this20$keyboardConfi,
            treeConfig = _this20.treeConfig,
            treeOpts = _this20.treeOpts,
            highlightCurrentRow = _this20.highlightCurrentRow,
            currentRow = _this20.currentRow,
            bodyCtxMenu = _this20.bodyCtxMenu;
        var selected = editStore.selected,
            actived = editStore.actived;
        var keyCode = evnt.keyCode;
        var isBack = keyCode === 8;
        var isTab = keyCode === 9;
        var isEnter = keyCode === 13;
        var isEsc = keyCode === 27;
        var isSpacebar = keyCode === 32;
        var isLeftArrow = keyCode === 37;
        var isUpArrow = keyCode === 38;
        var isRightArrow = keyCode === 39;
        var isDwArrow = keyCode === 40;
        var isDel = keyCode === 46;
        var isF2 = keyCode === 113;
        var isContextMenu = keyCode === 93;
        var isCtrlKey = evnt.ctrlKey;
        var isShiftKey = evnt.shiftKey;
        var isAltKey = evnt.altKey;
        var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
        var operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow);
        var isEditStatus = editConfig && actived.column && actived.row;
        var params;

        if (operCtxMenu) {
          // 如果配置了右键菜单; 支持方向键操作、回车
          evnt.preventDefault();

          if (ctxMenuStore.showChild && hasChildrenList(ctxMenuStore.selected)) {
            _this20.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children);
          } else {
            _this20.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, _this20.ctxMenuList);
          }
        } else if (keyboardConfig && _this20.mouseConfig && _this20.mouseOpts.area && _this20.handleKeyboardEvent) {
          _this20.handleKeyboardEvent(evnt);
        } else if (isSpacebar && (keyboardConfig.isArrow || keyboardConfig.isTab) && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'radio')) {
          // 空格键支持选中复选框
          evnt.preventDefault();

          if (selected.column.type === 'checkbox') {
            _this20.handleToggleCheckRowEvent(evnt, selected.args);
          } else {
            _this20.triggerRadioRowEvent(evnt, selected.args);
          }
        } else if (isEsc) {
          // 如果按下了 Esc 键，关闭快捷菜单、筛选
          _this20.closeMenu();

          _this20.closeFilter(); // 如果是激活编辑状态，则取消编辑


          if (actived.row) {
            params = actived.args;

            _this20.clearActived(evnt); // 如果配置了选中功能，则为选中状态


            if (mouseConfig.selected) {
              _this20.$nextTick(function () {
                return _this20.handleSelected(params, evnt);
              });
            }
          }
        } else if (isF2) {
          if (!isEditStatus) {
            // 如果按下了 F2 键
            if (selected.row && selected.column) {
              evnt.preventDefault();

              _this20.handleActived(selected.args, evnt);
            }
          }
        } else if (isContextMenu) {
          // 如果按下上下文键
          _this20._keyCtx = selected.row && selected.column && bodyCtxMenu.length;
          clearTimeout(_this20.keyCtxTimeout);
          _this20.keyCtxTimeout = setTimeout(function () {
            _this20._keyCtx = false;
          }, 1000);
        } else if (isEnter && !isAltKey && keyboardConfig.isEnter && (selected.row || actived.row || treeConfig && highlightCurrentRow && currentRow)) {
          // 退出选中
          if (isCtrlKey) {
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              params = actived.args;

              _this20.clearActived(evnt); // 如果配置了选中功能，则为选中状态


              if (mouseConfig.selected) {
                _this20.$nextTick(function () {
                  return _this20.handleSelected(params, evnt);
                });
              }
            }
          } else {
            // 如果是激活状态，退则出到上一行/下一行
            if (selected.row || actived.row) {
              if (isShiftKey) {
                if (keyboardConfig.enterToTab) {
                  _this20.moveTabSelected(selected.args, isShiftKey, evnt);
                } else {
                  _this20.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, true, isRightArrow, false, evnt);
                }
              } else {
                if (keyboardConfig.enterToTab) {
                  _this20.moveTabSelected(selected.args, isShiftKey, evnt);
                } else {
                  _this20.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, false, isRightArrow, true, evnt);
                }
              }
            } else if (treeConfig && highlightCurrentRow && currentRow) {
              // 如果是树形表格当前行回车移动到子节点
              var childrens = currentRow[treeOpts.children];

              if (childrens && childrens.length) {
                evnt.preventDefault();
                var targetRow = childrens[0];
                params = {
                  $table: _this20,
                  row: targetRow
                };

                _this20.setTreeExpand(currentRow, true).then(function () {
                  return _this20.scrollToRow(targetRow);
                }).then(function () {
                  return _this20.triggerCurrentRowEvent(evnt, params);
                });
              }
            }
          }
        } else if (operArrow && keyboardConfig.isArrow) {
          if (!isEditStatus) {
            // 如果按下了方向键
            if (selected.row && selected.column) {
              _this20.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt);
            } else if ((isUpArrow || isDwArrow) && highlightCurrentRow) {
              // 当前行按键上下移动
              _this20.moveCurrentRow(isUpArrow, isDwArrow, evnt);
            }
          }
        } else if (isTab && keyboardConfig.isTab) {
          // 如果按下了 Tab 键切换
          if (selected.row || selected.column) {
            _this20.moveTabSelected(selected.args, isShiftKey, evnt);
          } else if (actived.row || actived.column) {
            _this20.moveTabSelected(actived.args, isShiftKey, evnt);
          }
        } else if (isDel || (treeConfig && highlightCurrentRow && currentRow ? isBack && keyboardConfig.isArrow : isBack)) {
          if (!isEditStatus) {
            // 如果是删除键
            if (keyboardConfig.isDel && (selected.row || selected.column)) {
              setCellValue(selected.row, selected.column, null);

              if (isBack) {
                _this20.handleActived(selected.args, evnt);
              }
            } else if (isBack && keyboardConfig.isArrow && treeConfig && highlightCurrentRow && currentRow) {
              // 如果树形表格回退键关闭当前行返回父节点
              var _XEUtils$findTree = _ctor.default.findTree(_this20.afterFullData, function (item) {
                return item === currentRow;
              }, treeOpts),
                  parentRow = _XEUtils$findTree.parent;

              if (parentRow) {
                evnt.preventDefault();
                params = {
                  $table: _this20,
                  row: parentRow
                };

                _this20.setTreeExpand(parentRow, false).then(function () {
                  return _this20.scrollToRow(parentRow);
                }).then(function () {
                  return _this20.triggerCurrentRowEvent(evnt, params);
                });
              }
            }
          }
        } else if (keyboardConfig.isEdit && !isCtrlKey && (isSpacebar || keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222)) {
          // 启用编辑后，空格键功能将失效
          // if (isSpacebar) {
          //   evnt.preventDefault()
          // }
          // 如果是按下非功能键之外允许直接编辑
          if (selected.column && selected.row && selected.column.editRender) {
            if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
              if (!editOpts.activeMethod || editOpts.activeMethod(selected.args)) {
                setCellValue(selected.row, selected.column, null);

                _this20.handleActived(selected.args, evnt);
              }
            }
          }
        }

        _this20.emitEvent('keydown', {}, evnt);
      });
    }
  },
  handleGlobalPasteEvent: function handleGlobalPasteEvent(evnt) {
    var isActivated = this.isActivated,
        keyboardConfig = this.keyboardConfig,
        mouseConfig = this.mouseConfig,
        mouseOpts = this.mouseOpts,
        editStore = this.editStore;
    var actived = editStore.actived;

    if (isActivated && !(actived.row || actived.column)) {
      if (keyboardConfig && keyboardConfig.isClip && mouseConfig && mouseOpts.area && this.handlePasteCellAreaEvent) {
        this.handlePasteCellAreaEvent(evnt);
      }
    }
  },
  handleGlobalCopyEvent: function handleGlobalCopyEvent(evnt) {
    var isActivated = this.isActivated,
        keyboardConfig = this.keyboardConfig,
        mouseConfig = this.mouseConfig,
        mouseOpts = this.mouseOpts,
        editStore = this.editStore;
    var actived = editStore.actived;

    if (isActivated && !(actived.row || actived.column)) {
      if (keyboardConfig && keyboardConfig.isClip && mouseConfig && mouseOpts.area && this.handleCopyCellAreaEvent) {
        this.handleCopyCellAreaEvent(evnt);
      }
    }
  },
  handleGlobalCutEvent: function handleGlobalCutEvent(evnt) {
    var isActivated = this.isActivated,
        keyboardConfig = this.keyboardConfig,
        mouseConfig = this.mouseConfig,
        mouseOpts = this.mouseOpts,
        editStore = this.editStore;
    var actived = editStore.actived;

    if (isActivated && !(actived.row || actived.column)) {
      if (keyboardConfig && keyboardConfig.isClip && mouseConfig && mouseOpts.area && this.handleCutCellAreaEvent) {
        this.handleCutCellAreaEvent(evnt);
      }
    }
  },
  handleGlobalResizeEvent: function handleGlobalResizeEvent() {
    this.closeMenu();
    this.recalculate(true);
  },
  handleTooltipLeaveEvent: function handleTooltipLeaveEvent() {
    var _this21 = this;

    var tooltipOpts = this.tooltipOpts;
    setTimeout(function () {
      if (!_this21.tooltipActive) {
        _this21.clostTooltip();
      }
    }, tooltipOpts.leaveDelay);
  },
  handleTargetEnterEvent: function handleTargetEnterEvent() {
    clearTimeout(this.tooltipTimeout);
    this.tooltipActive = true;
    this.clostTooltip();
  },
  handleTargetLeaveEvent: function handleTargetLeaveEvent() {
    var _this22 = this;

    var tooltipOpts = this.tooltipOpts;
    this.tooltipActive = false;

    if (tooltipOpts.enterable) {
      this.tooltipTimeout = setTimeout(function () {
        if (!_this22.$refs.tooltip.isHover) {
          _this22.clostTooltip();
        }
      }, tooltipOpts.leaveDelay);
    } else {
      this.clostTooltip();
    }
  },
  triggerHeaderHelpEvent: function triggerHeaderHelpEvent(evnt, params) {
    var column = params.column;
    var titleHelp = column.titleHelp;

    if (titleHelp.message) {
      var $refs = this.$refs,
          tooltipStore = this.tooltipStore;
      var tooltip = $refs.tooltip;

      var content = _tools.UtilTools.getFuncText(titleHelp.message);

      this.handleTargetEnterEvent();
      tooltipStore.visible = true;

      if (tooltip) {
        tooltip.toVisible(evnt.currentTarget, content);
      }
    }
  },

  /**
   * 触发表头 tooltip 事件
   */
  triggerHeaderTooltipEvent: function triggerHeaderTooltipEvent(evnt, params) {
    var tooltipStore = this.tooltipStore;
    var column = params.column;
    var titleElem = evnt.currentTarget;
    this.handleTargetEnterEvent();

    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, titleElem, titleElem, null, params);
    }
  },

  /**
   * 触发单元格 tooltip 事件
   */
  triggerBodyTooltipEvent: function triggerBodyTooltipEvent(evnt, params) {
    var editConfig = this.editConfig,
        editOpts = this.editOpts,
        editStore = this.editStore,
        tooltipStore = this.tooltipStore;
    var actived = editStore.actived;
    var row = params.row,
        column = params.column;
    var cell = evnt.currentTarget;
    this.handleTargetEnterEvent();

    if (editConfig) {
      if (editOpts.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {
        return;
      }
    }

    if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
      var overflowElem;
      var tipElem;

      if (column.treeNode) {
        overflowElem = cell.querySelector('.vxe-tree-cell');

        if (column.type === 'html') {
          tipElem = cell.querySelector('.vxe-cell--html');
        }
      } else {
        tipElem = cell.querySelector(column.type === 'html' ? '.vxe-cell--html' : '.vxe-cell--label');
      }

      this.handleTooltip(evnt, cell, overflowElem || cell.children[0], tipElem, params);
    }
  },

  /**
   * 触发表尾 tooltip 事件
   */
  triggerFooterTooltipEvent: function triggerFooterTooltipEvent(evnt, params) {
    var column = params.column;
    var tooltipStore = this.tooltipStore;
    var cell = evnt.currentTarget;
    this.handleTargetEnterEvent();

    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, cell, cell.querySelector('.vxe-cell--item') || cell.children[0], null, params);
    }
  },

  /**
   * 处理显示 tooltip
   * @param {Event} evnt 事件
   * @param {ColumnInfo} column 列配置
   * @param {Row} row 行对象
   */
  handleTooltip: function handleTooltip(evnt, cell, overflowElem, tipElem, params) {
    params.cell = cell;
    var $refs = this.$refs,
        tooltipOpts = this.tooltipOpts,
        tooltipStore = this.tooltipStore;
    var column = params.column,
        row = params.row;
    var enabled = tooltipOpts.enabled,
        contentMethod = tooltipOpts.contentMethod;
    var tooltip = $refs.tooltip;
    var customContent = contentMethod ? contentMethod(params) : null;
    var useCustom = contentMethod && !_ctor.default.eqNull(customContent);
    var content = useCustom ? customContent : (column.type === 'html' ? overflowElem.innerText : overflowElem.textContent).trim();
    var isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth;

    if (content && (enabled || useCustom || isCellOverflow)) {
      Object.assign(tooltipStore, {
        row: row,
        column: column,
        visible: true
      });

      if (tooltip) {
        tooltip.toVisible(isCellOverflow ? overflowElem : tipElem || overflowElem, _tools.UtilTools.formatText(content));
      }
    }

    return this.$nextTick();
  },

  /**
   * 关闭 tooltip
   */
  clostTooltip: function clostTooltip() {
    var $refs = this.$refs,
        tooltipStore = this.tooltipStore;
    var tooltip = $refs.tooltip;

    if (tooltipStore.visible) {
      Object.assign(tooltipStore, {
        row: null,
        column: null,
        content: null,
        visible: false
      });

      if (tooltip) {
        tooltip.close();
      }
    }

    return this.$nextTick();
  },

  /**
   * 判断复选框是否全选
   */
  isAllCheckboxChecked: function isAllCheckboxChecked() {
    return this.isAllSelected;
  },

  /**
   * 判断复选框是否全选
   */
  isCheckboxIndeterminate: function isCheckboxIndeterminate() {
    return this.isIndeterminate;
  },

  /**
   * 获取复选框半选状态的行数据
   */
  getCheckboxIndeterminateRecords: function getCheckboxIndeterminateRecords() {
    var treeConfig = this.treeConfig,
        treeIndeterminates = this.treeIndeterminates;

    if (treeConfig) {
      return treeIndeterminates.slice(0);
    }

    return [];
  },

  /**
   * 处理默认勾选
   */
  handleDefaultSelectionChecked: function handleDefaultSelectionChecked() {
    var fullDataRowIdData = this.fullDataRowIdData,
        checkboxOpts = this.checkboxOpts;
    var checkAll = checkboxOpts.checkAll,
        checkRowKeys = checkboxOpts.checkRowKeys;

    if (checkAll) {
      this.setAllCheckboxRow(true);
    } else if (checkRowKeys) {
      var defSelection = [];
      checkRowKeys.forEach(function (rowid) {
        if (fullDataRowIdData[rowid]) {
          defSelection.push(fullDataRowIdData[rowid].row);
        }
      });
      this.setCheckboxRow(defSelection, true);
    }
  },

  /**
   * 用于多选行，设置行为选中状态，第二个参数为选中与否
   * @param {Array/Row} rows 行数据
   * @param {Boolean} value 是否选中
   */
  setCheckboxRow: function setCheckboxRow(rows, value) {
    var _this23 = this;

    if (rows && !_ctor.default.isArray(rows)) {
      rows = [rows];
    }

    rows.forEach(function (row) {
      return _this23.handleSelectRow({
        row: row
      }, !!value);
    });
    return this.$nextTick();
  },
  isCheckedByCheckboxRow: function isCheckedByCheckboxRow(row) {
    var property = this.checkboxOpts.checkField;

    if (property) {
      return _ctor.default.get(row, property);
    }

    return this.selection.indexOf(row) > -1;
  },

  /**
   * 多选，行选中事件
   * value 选中true 不选false 不确定-1
   */
  handleSelectRow: function handleSelectRow(_ref4, value) {
    var _this24 = this;

    var row = _ref4.row;
    var selection = this.selection,
        afterFullData = this.afterFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        treeIndeterminates = this.treeIndeterminates,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField,
        checkStrictly = checkboxOpts.checkStrictly,
        checkMethod = checkboxOpts.checkMethod;

    if (property) {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          if (treeIndeterminates.indexOf(row) === -1) {
            treeIndeterminates.push(row);
          }

          _ctor.default.set(row, property, false);
        } else {
          // 更新子节点状态
          _ctor.default.eachTree([row], function (item) {
            if (row === item || !checkMethod || checkMethod({
              row: item
            })) {
              _ctor.default.set(item, property, value);

              _ctor.default.remove(treeIndeterminates, function (half) {
                return half === item;
              });

              _this24.handleCheckboxReserveRow(row, value);
            }
          }, treeOpts);
        } // 如果存在父节点，更新父节点状态


        var matchObj = _ctor.default.findTree(afterFullData, function (item) {
          return item === row;
        }, treeOpts);

        if (matchObj && matchObj.parent) {
          var parentStatus;
          var vItems = checkMethod ? matchObj.items.filter(function (item) {
            return checkMethod({
              row: item
            });
          }) : matchObj.items;

          var indeterminatesItem = _ctor.default.find(matchObj.items, function (item) {
            return treeIndeterminates.indexOf(item) > -1;
          });

          if (indeterminatesItem) {
            parentStatus = -1;
          } else {
            var selectItems = matchObj.items.filter(function (item) {
              return _ctor.default.get(item, property);
            });
            parentStatus = selectItems.filter(function (item) {
              return vItems.indexOf(item) > -1;
            }).length === vItems.length ? true : selectItems.length || value === -1 ? -1 : false;
          }

          return this.handleSelectRow({
            row: matchObj.parent
          }, parentStatus);
        }
      } else {
        if (!checkMethod || checkMethod({
          row: row
        })) {
          _ctor.default.set(row, property, value);

          this.handleCheckboxReserveRow(row, value);
        }
      }
    } else {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          if (treeIndeterminates.indexOf(row) === -1) {
            treeIndeterminates.push(row);
          }

          _ctor.default.remove(selection, function (item) {
            return item === row;
          });
        } else {
          // 更新子节点状态
          _ctor.default.eachTree([row], function (item) {
            if (row === item || !checkMethod || checkMethod({
              row: item
            })) {
              if (value) {
                selection.push(item);
              } else {
                _ctor.default.remove(selection, function (select) {
                  return select === item;
                });
              }

              _ctor.default.remove(treeIndeterminates, function (half) {
                return half === item;
              });

              _this24.handleCheckboxReserveRow(row, value);
            }
          }, treeOpts);
        } // 如果存在父节点，更新父节点状态


        var _matchObj = _ctor.default.findTree(afterFullData, function (item) {
          return item === row;
        }, treeOpts);

        if (_matchObj && _matchObj.parent) {
          var _parentStatus;

          var _vItems = checkMethod ? _matchObj.items.filter(function (item) {
            return checkMethod({
              row: item
            });
          }) : _matchObj.items;

          var _indeterminatesItem = _ctor.default.find(_matchObj.items, function (item) {
            return treeIndeterminates.indexOf(item) > -1;
          });

          if (_indeterminatesItem) {
            _parentStatus = -1;
          } else {
            var _selectItems = _matchObj.items.filter(function (item) {
              return selection.indexOf(item) > -1;
            });

            _parentStatus = _selectItems.filter(function (item) {
              return _vItems.indexOf(item) > -1;
            }).length === _vItems.length ? true : _selectItems.length || value === -1 ? -1 : false;
          }

          return this.handleSelectRow({
            row: _matchObj.parent
          }, _parentStatus);
        }
      } else {
        if (!checkMethod || checkMethod({
          row: row
        })) {
          if (value) {
            if (selection.indexOf(row) === -1) {
              selection.push(row);
            }
          } else {
            _ctor.default.remove(selection, function (item) {
              return item === row;
            });
          }

          this.handleCheckboxReserveRow(row, value);
        }
      }
    }

    this.checkSelectionStatus();
  },
  handleToggleCheckRowEvent: function handleToggleCheckRowEvent(evnt, params) {
    var selection = this.selection,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField;
    var row = params.row;
    var value = property ? !_ctor.default.get(row, property) : selection.indexOf(row) === -1;

    if (evnt) {
      this.triggerCheckRowEvent(evnt, params, value);
    } else {
      this.handleSelectRow(params, value);
    }
  },
  triggerCheckRowEvent: function triggerCheckRowEvent(evnt, params, value) {
    var checkMethod = this.checkboxOpts.checkMethod;

    if (!checkMethod || checkMethod({
      row: params.row
    })) {
      this.handleSelectRow(params, value);
      this.emitEvent('checkbox-change', Object.assign({
        records: this.getCheckboxRecords(),
        reserves: this.getCheckboxReserveRecords(),
        indeterminates: this.getCheckboxIndeterminateRecords(),
        checked: value
      }, params), evnt);
    }
  },

  /**
   * 多选，切换某一行的选中状态
   */
  toggleCheckboxRow: function toggleCheckboxRow(row) {
    this.handleToggleCheckRowEvent(null, {
      row: row
    });
    return this.$nextTick();
  },

  /**
   * 用于多选行，设置所有行的选中状态
   * @param {Boolean} value 是否选中
   */
  setAllCheckboxRow: function setAllCheckboxRow(value) {
    var _this25 = this;

    var afterFullData = this.afterFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        selection = this.selection,
        checkboxReserveRowMap = this.checkboxReserveRowMap,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField,
        reserve = checkboxOpts.reserve,
        checkStrictly = checkboxOpts.checkStrictly,
        checkMethod = checkboxOpts.checkMethod;
    var selectRows = [];
    var beforeSelection = treeConfig ? [] : selection.filter(function (row) {
      return afterFullData.indexOf(row) === -1;
    });

    if (checkStrictly) {
      this.isAllSelected = value;
    } else {
      /**
       * 绑定属性方式（高性能，有污染）
       * 必须在行数据存在对应的属性，否则将不响应
       */
      if (property) {
        var checkValFn = function checkValFn(row) {
          if (!checkMethod || checkMethod({
            row: row
          })) {
            if (value) {
              selectRows.push(row);
            }

            _ctor.default.set(row, property, value);
          }
        }; // 如果存在选中方法
        // 如果方法成立，则更新值，否则忽略该数据


        if (treeConfig) {
          _ctor.default.eachTree(afterFullData, checkValFn, treeOpts);
        } else {
          afterFullData.forEach(checkValFn);
        }
      } else {
        /**
         * 默认方式（低性能，无污染）
         * 无需任何属性，直接绑定
         */
        if (treeConfig) {
          if (value) {
            /**
             * 如果是树勾选
             * 如果方法成立，则添加到临时集合中
             */
            _ctor.default.eachTree(afterFullData, function (row) {
              if (!checkMethod || checkMethod({
                row: row
              })) {
                selectRows.push(row);
              }
            }, treeOpts);
          } else {
            /**
             * 如果是树取消
             * 如果方法成立，则不添加到临时集合中
             */
            if (checkMethod) {
              _ctor.default.eachTree(afterFullData, function (row) {
                if (checkMethod({
                  row: row
                }) ? 0 : selection.indexOf(row) > -1) {
                  selectRows.push(row);
                }
              }, treeOpts);
            }
          }
        } else {
          if (value) {
            /**
             * 如果是行勾选
             * 如果存在选中方法且成立或者本身已勾选，则添加到临时集合中
             * 如果不存在选中方法，则添加所有数据到临时集合中
             */
            if (checkMethod) {
              selectRows = afterFullData.filter(function (row) {
                return selection.indexOf(row) > -1 || checkMethod({
                  row: row
                });
              });
            } else {
              selectRows = afterFullData.slice(0);
            }
          } else {
            /**
             * 如果是行取消
             * 如果方法成立，则不添加到临时集合中；如果方法不成立则判断当前是否已勾选，如果已被勾选则添加到新集合中
             * 如果不存在选中方法，无需处理，临时集合默认为空
             */
            if (checkMethod) {
              selectRows = afterFullData.filter(function (row) {
                return checkMethod({
                  row: row
                }) ? 0 : selection.indexOf(row) > -1;
              });
            }
          }
        }
      }

      if (reserve) {
        if (value) {
          selectRows.forEach(function (row) {
            checkboxReserveRowMap[getRowid(_this25, row)] = row;
          });
        } else {
          afterFullData.forEach(function (row) {
            return _this25.handleCheckboxReserveRow(row, false);
          });
        }
      }

      this.selection = property ? [] : beforeSelection.concat(selectRows);
    }

    this.treeIndeterminates = [];
    this.checkSelectionStatus();
  },
  checkSelectionStatus: function checkSelectionStatus() {
    var afterFullData = this.afterFullData,
        selection = this.selection,
        treeIndeterminates = this.treeIndeterminates,
        checkboxOpts = this.checkboxOpts,
        treeConfig = this.treeConfig;
    var checkField = checkboxOpts.checkField,
        halfField = checkboxOpts.halfField,
        checkStrictly = checkboxOpts.checkStrictly,
        checkMethod = checkboxOpts.checkMethod;

    if (!checkStrictly) {
      var isAllSelected = false;
      var isIndeterminate = false;

      if (checkField) {
        isAllSelected = afterFullData.length && afterFullData.every(checkMethod ? function (row) {
          return !checkMethod({
            row: row
          }) || _ctor.default.get(row, checkField);
        } : function (row) {
          return _ctor.default.get(row, checkField);
        });

        if (treeConfig) {
          if (halfField) {
            isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
              return _ctor.default.get(row, checkField) || _ctor.default.get(row, halfField) || treeIndeterminates.indexOf(row) > -1;
            });
          } else {
            isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
              return _ctor.default.get(row, checkField) || treeIndeterminates.indexOf(row) > -1;
            });
          }
        } else {
          if (halfField) {
            isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
              return _ctor.default.get(row, checkField) || _ctor.default.get(row, halfField);
            });
          } else {
            isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
              return _ctor.default.get(row, checkField);
            });
          }
        }
      } else {
        isAllSelected = afterFullData.length && afterFullData.every(checkMethod ? function (row) {
          return !checkMethod({
            row: row
          }) || selection.indexOf(row) > -1;
        } : function (row) {
          return selection.indexOf(row) > -1;
        });

        if (treeConfig) {
          isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
            return treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1;
          });
        } else {
          isIndeterminate = !isAllSelected && afterFullData.some(function (row) {
            return selection.indexOf(row) > -1;
          });
        }
      }

      this.isAllSelected = isAllSelected;
      this.isIndeterminate = isIndeterminate;
    }
  },
  // 还原展开、选中等相关状态
  handleReserveStatus: function handleReserveStatus() {
    var expandColumn = this.expandColumn,
        treeOpts = this.treeOpts,
        treeConfig = this.treeConfig,
        fullDataRowIdData = this.fullDataRowIdData,
        fullAllDataRowMap = this.fullAllDataRowMap,
        currentRow = this.currentRow,
        selectRow = this.selectRow,
        radioReserveRow = this.radioReserveRow,
        radioOpts = this.radioOpts,
        checkboxOpts = this.checkboxOpts,
        selection = this.selection,
        rowExpandeds = this.rowExpandeds,
        treeExpandeds = this.treeExpandeds,
        expandOpts = this.expandOpts; // 单选框

    if (selectRow && !fullAllDataRowMap.has(selectRow)) {
      this.selectRow = null; // 刷新单选行状态
    } // 还原保留选中状态


    if (radioOpts.reserve && radioReserveRow) {
      var rowid = getRowid(this, radioReserveRow);

      if (fullDataRowIdData[rowid]) {
        this.setRadioRow(fullDataRowIdData[rowid].row);
      }
    } // 复选框


    this.selection = getRecoverRow(this, selection); // 刷新多选行状态
    // 还原保留选中状态

    if (checkboxOpts.reserve) {
      this.setCheckboxRow(handleReserveRow(this, this.checkboxReserveRowMap), true);
    }

    if (currentRow && !fullAllDataRowMap.has(currentRow)) {
      this.currentRow = null; // 刷新当前行状态
    } // 行展开


    this.rowExpandeds = expandColumn ? getRecoverRow(this, rowExpandeds) : []; // 刷新行展开状态
    // 还原保留状态

    if (expandColumn && expandOpts.reserve) {
      this.setRowExpand(handleReserveRow(this, this.rowExpandedReserveRowMap), true);
    } // 树展开


    this.treeExpandeds = treeConfig ? getRecoverRow(this, treeExpandeds) : []; // 刷新树展开状态

    if (treeConfig && treeOpts.reserve) {
      this.setTreeExpand(handleReserveRow(this, this.treeExpandedReserveRowMap), true);
    }
  },

  /**
   * 获取单选框保留选中的行
   */
  getRadioReserveRecord: function getRadioReserveRecord() {
    var fullDataRowIdData = this.fullDataRowIdData,
        radioReserveRow = this.radioReserveRow,
        radioOpts = this.radioOpts;

    if (radioOpts.reserve && radioReserveRow) {
      if (!fullDataRowIdData[getRowid(this, radioReserveRow)]) {
        return radioReserveRow;
      }
    }

    return null;
  },
  clearRadioReserve: function clearRadioReserve() {
    this.radioReserveRow = null;
    return this.$nextTick();
  },
  handleRadioReserveRow: function handleRadioReserveRow(row) {
    var radioOpts = this.radioOpts;

    if (radioOpts.reserve) {
      this.radioReserveRow = row;
    }
  },

  /**
   * 获取复选框保留选中的行
   */
  getCheckboxReserveRecords: function getCheckboxReserveRecords() {
    var fullDataRowIdData = this.fullDataRowIdData,
        checkboxReserveRowMap = this.checkboxReserveRowMap,
        checkboxOpts = this.checkboxOpts;
    var reserveSelection = [];

    if (checkboxOpts.reserve) {
      _ctor.default.each(checkboxReserveRowMap, function (row, rowid) {
        if (row && !fullDataRowIdData[rowid]) {
          reserveSelection.push(row);
        }
      });
    }

    return reserveSelection;
  },
  clearCheckboxReserve: function clearCheckboxReserve() {
    this.checkboxReserveRowMap = {};
    return this.$nextTick();
  },
  handleCheckboxReserveRow: function handleCheckboxReserveRow(row, checked) {
    var checkboxReserveRowMap = this.checkboxReserveRowMap,
        checkboxOpts = this.checkboxOpts;

    if (checkboxOpts.reserve) {
      var rowid = getRowid(this, row);

      if (checked) {
        checkboxReserveRowMap[rowid] = row;
      } else if (checkboxReserveRowMap[rowid]) {
        delete checkboxReserveRowMap[rowid];
      }
    }
  },

  /**
   * 多选，选中所有事件
   */
  triggerCheckAllEvent: function triggerCheckAllEvent(evnt, value) {
    this.setAllCheckboxRow(value);
    this.emitEvent('checkbox-all', {
      records: this.getCheckboxRecords(),
      reserves: this.getCheckboxReserveRecords(),
      indeterminates: this.getCheckboxIndeterminateRecords(),
      checked: value
    }, evnt);
  },

  /**
   * 多选，切换所有行的选中状态
   */
  toggleAllCheckboxRow: function toggleAllCheckboxRow() {
    this.triggerCheckAllEvent(null, !this.isAllSelected);
    return this.$nextTick();
  },

  /**
   * 用于多选行，手动清空用户的选择
   * 清空行为不管是否被禁用还是保留记录，都将彻底清空选中状态
   */
  clearCheckboxRow: function clearCheckboxRow() {
    var _this26 = this;

    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        checkboxOpts = this.checkboxOpts;
    var property = checkboxOpts.checkField,
        reserve = checkboxOpts.reserve;

    if (property) {
      if (treeConfig) {
        _ctor.default.eachTree(tableFullData, function (item) {
          return _ctor.default.set(item, property, false);
        }, treeOpts);
      } else {
        tableFullData.forEach(function (item) {
          return _ctor.default.set(item, property, false);
        });
      }
    }

    if (reserve) {
      tableFullData.forEach(function (row) {
        return _this26.handleCheckboxReserveRow(row, false);
      });
    }

    this.isAllSelected = false;
    this.isIndeterminate = false;
    this.selection = [];
    this.treeIndeterminates = [];
    return this.$nextTick();
  },

  /**
   * 处理单选框默认勾选
   */
  handleDefaultRadioChecked: function handleDefaultRadioChecked() {
    var radioOpts = this.radioOpts,
        fullDataRowIdData = this.fullDataRowIdData;
    var rowid = radioOpts.checkRowKey,
        reserve = radioOpts.reserve;

    if (rowid) {
      if (fullDataRowIdData[rowid]) {
        this.setRadioRow(fullDataRowIdData[rowid].row);
      }

      if (reserve) {
        var rowkey = getRowkey(this);
        this.radioReserveRow = _defineProperty({}, rowkey, rowid);
      }
    }
  },

  /**
   * 单选，行选中事件
   */
  triggerRadioRowEvent: function triggerRadioRowEvent(evnt, params) {
    var isChange = this.selectRow !== params.row;
    this.setRadioRow(params.row);

    if (isChange) {
      this.emitEvent('radio-change', params, evnt);
    }
  },
  triggerCurrentRowEvent: function triggerCurrentRowEvent(evnt, params) {
    var isChange = this.currentRow !== params.row;
    this.setCurrentRow(params.row);

    if (isChange) {
      this.emitEvent('current-change', params, evnt);
    }
  },

  /**
   * 用于当前行，设置某一行为高亮状态
   * @param {Row} row 行对象
   */
  setCurrentRow: function setCurrentRow(row) {
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.currentRow = row;

    if (this.highlightCurrentRow) {
      _ctor.default.arrayEach(this.$el.querySelectorAll("[data-rowid=\"".concat(getRowid(this, row), "\"]")), function (elem) {
        return addClass(elem, 'row--current');
      });
    }

    return this.$nextTick();
  },
  isCheckedByRadioRow: function isCheckedByRadioRow(row) {
    return this.selectRow === row;
  },

  /**
   * 用于单选行，设置某一行为选中状态
   * @param {Row} row 行对象
   */
  setRadioRow: function setRadioRow(row) {
    var radioOpts = this.radioOpts;
    var checkMethod = radioOpts.checkMethod;

    if (row && (!checkMethod || checkMethod({
      row: row
    }))) {
      this.selectRow = row;
      this.handleRadioReserveRow(row);
    }

    return this.$nextTick();
  },

  /**
   * 用于当前行，手动清空当前高亮的状态
   */
  clearCurrentRow: function clearCurrentRow() {
    this.currentRow = null;
    this.hoverRow = null;

    _ctor.default.arrayEach(this.$el.querySelectorAll('.row--current'), function (elem) {
      return removeClass(elem, 'row--current');
    });

    return this.$nextTick();
  },

  /**
   * 用于单选行，手动清空用户的选择
   */
  clearRadioRow: function clearRadioRow() {
    this.selectRow = null;
    return this.$nextTick();
  },

  /**
   * 用于当前行，获取当前行的数据
   */
  getCurrentRecord: function getCurrentRecord() {
    return this.highlightCurrentRow ? this.currentRow : null;
  },

  /**
   * 用于单选行，获取当已选中的数据
   */
  getRadioRecord: function getRadioRecord() {
    return this.selectRow;
  },

  /**
   * 行 hover 事件
   */
  triggerHoverEvent: function triggerHoverEvent(evnt, _ref5) {
    var row = _ref5.row;
    this.setHoverRow(row);
  },
  setHoverRow: function setHoverRow(row) {
    var rowid = getRowid(this, row);
    this.clearHoverRow();

    _ctor.default.arrayEach(this.$el.querySelectorAll("[data-rowid=\"".concat(rowid, "\"]")), function (elem) {
      return addClass(elem, 'row--hover');
    });

    this.hoverRow = row;
  },
  clearHoverRow: function clearHoverRow() {
    _ctor.default.arrayEach(this.$el.querySelectorAll('.vxe-body--row.row--hover'), function (elem) {
      return removeClass(elem, 'row--hover');
    });

    this.hoverRow = null;
  },
  triggerHeaderCellClickEvent: function triggerHeaderCellClickEvent(evnt, params) {
    var _lastResizeTime = this._lastResizeTime,
        sortOpts = this.sortOpts;
    var column = params.column;
    var cell = evnt.currentTarget;

    var triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300;

    var triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag;
    var triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag;

    if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
      this.triggerSortEvent(evnt, column, getNextSortOrder(this, column));
    }

    this.emitEvent('header-cell-click', Object.assign({
      triggerResizable: triggerResizable,
      triggerSort: triggerSort,
      triggerFilter: triggerFilter,
      cell: cell
    }, params), evnt);

    if (this.highlightCurrentColumn) {
      return this.setCurrentColumn(column);
    }

    return this.$nextTick();
  },
  triggerHeaderCellDBLClickEvent: function triggerHeaderCellDBLClickEvent(evnt, params) {
    this.emitEvent('header-cell-dblclick', Object.assign({
      cell: evnt.currentTarget
    }, params), evnt);
  },
  getCurrentColumn: function getCurrentColumn() {
    return this.highlightCurrentColumn ? this.currentColumn : null;
  },

  /**
   * 用于当前列，设置某列行为高亮状态
   * @param {ColumnInfo} column 列配置
   */
  setCurrentColumn: function setCurrentColumn(column) {
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.currentColumn = column;
    return this.$nextTick();
  },

  /**
   * 用于当前列，手动清空当前高亮的状态
   */
  clearCurrentColumn: function clearCurrentColumn() {
    this.currentColumn = null;
    return this.$nextTick();
  },
  checkValidate: function checkValidate(type) {
    if (_vXETable.default._valid) {
      return this.triggerValidate(type);
    }

    return this.$nextTick();
  },

  /**
   * 当单元格发生改变时
   * 如果存在规则，则校验
   */
  handleChangeCell: function handleChangeCell(evnt, params) {
    var _this27 = this;

    this.checkValidate('blur').catch(function (e) {
      return e;
    }).then(function () {
      _this27.handleActived(params, evnt).then(function () {
        return _this27.checkValidate('change');
      }).catch(function (e) {
        return e;
      });
    });
  },

  /**
   * 列点击事件
   * 如果是单击模式，则激活为编辑状态
   * 如果是双击模式，则单击后选中状态
   */
  triggerCellClickEvent: function triggerCellClickEvent(evnt, params) {
    var highlightCurrentRow = this.highlightCurrentRow,
        editStore = this.editStore,
        radioOpts = this.radioOpts,
        expandOpts = this.expandOpts,
        treeOpts = this.treeOpts,
        editConfig = this.editConfig,
        editOpts = this.editOpts,
        checkboxOpts = this.checkboxOpts;
    var actived = editStore.actived;
    var _params = params,
        row = _params.row,
        column = _params.column;
    var type = column.type,
        treeNode = column.treeNode;
    var isRadioType = type === 'radio';
    var isCheckboxType = type === 'checkbox';
    var isExpandType = type === 'expand';
    var cell = evnt.currentTarget;
    var triggerRadio = isRadioType && getEventTargetNode(evnt, cell, 'vxe-cell--radio').flag;
    var triggerCheckbox = isCheckboxType && getEventTargetNode(evnt, cell, 'vxe-cell--checkbox').flag;
    var triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, 'vxe-tree--btn-wrapper').flag;
    var triggerExpandNode = isExpandType && getEventTargetNode(evnt, cell, 'vxe-table--expanded').flag;
    params = Object.assign({
      cell: cell,
      triggerRadio: triggerRadio,
      triggerCheckbox: triggerCheckbox,
      triggerTreeNode: triggerTreeNode,
      triggerExpandNode: triggerExpandNode
    }, params); // 如果是展开行

    if (!triggerExpandNode && (expandOpts.trigger === 'row' || isExpandType && expandOpts.trigger === 'cell')) {
      this.triggerRowExpandEvent(evnt, params);
    } // 如果是树形表格


    if (treeOpts.trigger === 'row' || treeNode && treeOpts.trigger === 'cell') {
      this.triggerTreeExpandEvent(evnt, params);
    } // 如果点击了树节点


    if (!triggerTreeNode) {
      if (!triggerExpandNode) {
        // 如果是高亮行
        if (highlightCurrentRow) {
          if (!triggerCheckbox && !triggerRadio) {
            this.triggerCurrentRowEvent(evnt, params);
          }
        } // 如果是单选框


        if (!triggerRadio && (radioOpts.trigger === 'row' || isRadioType && radioOpts.trigger === 'cell')) {
          this.triggerRadioRowEvent(evnt, params);
        } // 如果是复选框


        if (!triggerCheckbox && (checkboxOpts.trigger === 'row' || isCheckboxType && checkboxOpts.trigger === 'cell')) {
          this.handleToggleCheckRowEvent(evnt, params);
        }
      } // 如果设置了单元格选中功能，则不会使用点击事件去处理（只能支持双击模式）


      if (editConfig) {
        if (editOpts.trigger === 'manual') {
          if (actived.args && actived.row === row && column !== actived.column) {
            this.handleChangeCell(evnt, params);
          }
        } else if (!actived.args || row !== actived.row || column !== actived.column) {
          if (editOpts.trigger === 'click') {
            this.handleChangeCell(evnt, params);
          } else if (editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row' && actived.row === row) {
              this.handleChangeCell(evnt, params);
            }
          }
        }
      }
    }

    this.emitEvent('cell-click', params, evnt);
  },

  /**
   * 列双击点击事件
   * 如果是双击模式，则激活为编辑状态
   */
  triggerCellDBLClickEvent: function triggerCellDBLClickEvent(evnt, params) {
    var _this28 = this;

    var editStore = this.editStore,
        editConfig = this.editConfig,
        editOpts = this.editOpts;
    var actived = editStore.actived;
    var cell = evnt.currentTarget;
    params.cell = cell;

    if (editConfig && editOpts.trigger === 'dblclick') {
      if (!actived.args || evnt.currentTarget !== actived.args.cell) {
        if (editOpts.mode === 'row') {
          this.checkValidate('blur').catch(function (e) {
            return e;
          }).then(function () {
            _this28.handleActived(params, evnt).then(function () {
              return _this28.checkValidate('change');
            }).catch(function (e) {
              return e;
            });
          });
        } else if (editOpts.mode === 'cell') {
          this.handleActived(params, evnt).then(function () {
            return _this28.checkValidate('change');
          }).catch(function (e) {
            return e;
          });
        }
      }
    }

    this.emitEvent('cell-dblclick', params, evnt);
  },
  handleDefaultSort: function handleDefaultSort() {
    var defaultSort = this.sortOpts.defaultSort;

    if (defaultSort) {
      var field = defaultSort.field,
          order = defaultSort.order;

      if (field && order) {
        var column = _ctor.default.find(this.visibleColumn, function (item) {
          return item.property === field;
        });

        if (column && !column.order) {
          this.sort(field, order);
        }
      }
    }
  },

  /**
   * 点击排序事件
   */
  triggerSortEvent: function triggerSortEvent(evnt, column, order) {
    var property = column.property;

    if (column.sortable || column.remoteSort) {
      var params = {
        column: column,
        property: property,
        order: order,
        sortBy: column.sortBy
      };

      if (!order || column.order === order) {
        params.order = null;
        this.clearSort();
      } else {
        this.sort(property, order);
      }

      this.emitEvent('sort-change', params, evnt);
    }
  },
  sort: function sort(field, order) {
    var tableFullColumn = this.tableFullColumn,
        sortOpts = this.sortOpts;
    var column = this.getColumnByField(field);

    if (column) {
      var isRemote = _ctor.default.isBoolean(column.remoteSort) ? column.remoteSort : sortOpts.remote;

      if (column.sortable || column.remoteSort) {
        if (arguments.length <= 1) {
          order = getNextSortOrder(this, column);
        }

        if (column.order !== order) {
          tableFullColumn.forEach(function (column) {
            column.order = null;
          });
          column.order = order; // 如果是服务端排序，则跳过本地排序处理

          if (!isRemote) {
            this.handleTableData(true);
          }
        }

        return this.$nextTick().then(this.updateStyle);
      }
    }

    return this.$nextTick();
  },

  /**
   * 手动清空排序条件，数据会恢复成未排序的状态
   */
  clearSort: function clearSort() {
    this.tableFullColumn.forEach(function (column) {
      column.order = null;
    });
    return this.handleTableData(true);
  },
  getSortColumn: function getSortColumn() {
    return _ctor.default.find(this.visibleColumn, function (column) {
      return column.sortable && column.order;
    });
  },

  /**
   * 关闭筛选
   * @param {Event} evnt 事件
   */
  closeFilter: function closeFilter() {
    Object.assign(this.filterStore, {
      isAllSelected: false,
      isIndeterminate: false,
      options: [],
      visible: false
    });
    return this.$nextTick();
  },

  /**
   * 判断指定列是否为筛选状态，如果为空则判断所有列
   * @param {String} field 字段名
   */
  isFilter: function isFilter(field) {
    if (field) {
      var column = this.getColumnByField(field);
      return column && column.filters && column.filters.some(function (option) {
        return option.checked;
      });
    }

    return this.visibleColumn.some(function (column) {
      return column.filters && column.filters.some(function (option) {
        return option.checked;
      });
    });
  },

  /**
   * 判断展开行是否懒加载完成
   * @param {Row} row 行对象
   */
  isRowExpandLoaded: function isRowExpandLoaded(row) {
    var rest = this.fullAllDataRowMap.get(row);
    return rest && rest.expandLoaded;
  },
  clearRowExpandLoaded: function clearRowExpandLoaded(row) {
    var expandOpts = this.expandOpts,
        expandLazyLoadeds = this.expandLazyLoadeds,
        fullAllDataRowMap = this.fullAllDataRowMap;
    var lazy = expandOpts.lazy;
    var rest = fullAllDataRowMap.get(row);

    if (lazy && rest) {
      rest.expandLoaded = false;

      _ctor.default.remove(expandLazyLoadeds, function (item) {
        return row === item;
      });
    }

    return this.$nextTick();
  },

  /**
   * 重新加载展开行的内容
   * @param {Row} row 行对象
   */
  reloadExpandContent: function reloadExpandContent(row) {
    var _this29 = this;

    var expandOpts = this.expandOpts,
        expandLazyLoadeds = this.expandLazyLoadeds;
    var lazy = expandOpts.lazy;

    if (lazy && expandLazyLoadeds.indexOf(row) === -1) {
      this.clearRowExpandLoaded(row).then(function () {
        return _this29.handleAsyncRowExpand(row);
      });
    }

    return this.$nextTick();
  },

  /**
   * 展开行事件
   */
  triggerRowExpandEvent: function triggerRowExpandEvent(evnt, params) {
    var expandOpts = this.expandOpts,
        expandLazyLoadeds = this.expandLazyLoadeds,
        column = this.expandColumn;
    var row = params.row;
    var lazy = expandOpts.lazy;

    if (!lazy || expandLazyLoadeds.indexOf(row) === -1) {
      var expanded = !this.isExpandByRow(row);
      var columnIndex = this.getColumnIndex(column);
      var $columnIndex = this.$getColumnIndex(column);
      this.setRowExpand(row, expanded);
      this.emitEvent('toggle-row-expand', {
        expanded: expanded,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        row: row,
        rowIndex: this.getRowIndex(row),
        $rowIndex: this.$getRowIndex(row)
      }, evnt);
    }
  },

  /**
   * 切换展开行
   */
  toggleRowExpand: function toggleRowExpand(row) {
    return this.setRowExpand(row, !this.isExpandByRow(row));
  },

  /**
   * 处理默认展开行
   */
  handleDefaultRowExpand: function handleDefaultRowExpand() {
    var expandOpts = this.expandOpts,
        fullDataRowIdData = this.fullDataRowIdData;
    var expandAll = expandOpts.expandAll,
        expandRowKeys = expandOpts.expandRowKeys;

    if (expandAll) {
      this.setAllRowExpand(true);
    } else if (expandRowKeys) {
      var defExpandeds = [];
      expandRowKeys.forEach(function (rowid) {
        if (fullDataRowIdData[rowid]) {
          defExpandeds.push(fullDataRowIdData[rowid].row);
        }
      });
      this.setRowExpand(defExpandeds, true);
    }
  },

  /**
   * 设置所有行的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllRowExpand: function setAllRowExpand(expanded) {
    return this.setRowExpand(this.expandOpts.lazy ? this.tableData : this.tableFullData, expanded);
  },
  handleAsyncRowExpand: function handleAsyncRowExpand(row) {
    var _this30 = this;

    var rest = this.fullAllDataRowMap.get(row);
    return new Promise(function (resolve) {
      _this30.expandLazyLoadeds.push(row);

      _this30.expandOpts.loadMethod({
        $table: _this30,
        row: row,
        rowIndex: _this30.getRowIndex(row),
        $rowIndex: _this30.$getRowIndex(row)
      }).catch(function (e) {
        return e;
      }).then(function () {
        rest.expandLoaded = true;

        _ctor.default.remove(_this30.expandLazyLoadeds, function (item) {
          return item === row;
        });

        _this30.rowExpandeds.push(row);

        resolve(_this30.$nextTick().then(_this30.recalculate));
      });
    });
  },

  /**
   * 设置展开行，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setRowExpand: function setRowExpand(rows, expanded) {
    var _this31 = this;

    var fullAllDataRowMap = this.fullAllDataRowMap,
        expandLazyLoadeds = this.expandLazyLoadeds,
        expandOpts = this.expandOpts,
        column = this.expandColumn;
    var rowExpandeds = this.rowExpandeds;
    var reserve = expandOpts.reserve,
        lazy = expandOpts.lazy,
        accordion = expandOpts.accordion,
        toggleMethod = expandOpts.toggleMethod;
    var lazyRests = [];
    var columnIndex = this.getColumnIndex(column);
    var $columnIndex = this.$getColumnIndex(column);

    if (rows) {
      if (!_ctor.default.isArray(rows)) {
        rows = [rows];
      }

      if (accordion) {
        // 只能同时展开一个
        rowExpandeds = [];
        rows = rows.slice(rows.length - 1, rows.length);
      }

      var validRows = toggleMethod ? rows.filter(function (row) {
        return toggleMethod({
          expanded: expanded,
          column: column,
          columnIndex: columnIndex,
          $columnIndex: $columnIndex,
          row: row,
          rowIndex: _this31.getRowIndex(row),
          $rowIndex: _this31.$getRowIndex(row)
        });
      }) : rows;

      if (expanded) {
        validRows.forEach(function (row) {
          if (rowExpandeds.indexOf(row) === -1) {
            var rest = fullAllDataRowMap.get(row);
            var isLoad = lazy && !rest.expandLoaded && expandLazyLoadeds.indexOf(row) === -1;

            if (isLoad) {
              lazyRests.push(_this31.handleAsyncRowExpand(row));
            } else {
              rowExpandeds.push(row);
            }
          }
        });
      } else {
        _ctor.default.remove(rowExpandeds, function (row) {
          return validRows.indexOf(row) > -1;
        });
      }

      if (reserve) {
        validRows.forEach(function (row) {
          return _this31.handleRowExpandReserve(row, expanded);
        });
      }
    }

    this.rowExpandeds = rowExpandeds;
    return Promise.all(lazyRests).then(this.recalculate);
  },

  /**
   * 判断行是否为展开状态
   * @param {Row} row 行对象
   */
  isExpandByRow: function isExpandByRow(row) {
    return this.rowExpandeds.indexOf(row) > -1;
  },

  /**
   * 手动清空展开行状态，数据会恢复成未展开的状态
   */
  clearRowExpand: function clearRowExpand() {
    var _this32 = this;

    var expandOpts = this.expandOpts,
        rowExpandeds = this.rowExpandeds,
        tableFullData = this.tableFullData;
    var reserve = expandOpts.reserve;
    var isExists = rowExpandeds.length;
    this.rowExpandeds = [];

    if (reserve) {
      tableFullData.forEach(function (row) {
        return _this32.handleRowExpandReserve(row, false);
      });
    }

    return this.$nextTick().then(function () {
      if (isExists) {
        _this32.recalculate();
      }
    });
  },
  clearRowExpandReserve: function clearRowExpandReserve() {
    this.rowExpandedReserveRowMap = {};
    return this.$nextTick();
  },
  handleRowExpandReserve: function handleRowExpandReserve(row, expanded) {
    var rowExpandedReserveRowMap = this.rowExpandedReserveRowMap,
        expandOpts = this.expandOpts;

    if (expandOpts.reserve) {
      var rowid = getRowid(this, row);

      if (expanded) {
        rowExpandedReserveRowMap[rowid] = row;
      } else if (rowExpandedReserveRowMap[rowid]) {
        delete rowExpandedReserveRowMap[rowid];
      }
    }
  },
  getRowExpandRecords: function getRowExpandRecords() {
    return this.rowExpandeds.slice(0);
  },
  getTreeExpandRecords: function getTreeExpandRecords() {
    return this.treeExpandeds.slice(0);
  },

  /**
   * 获取数表格状态
   */
  getTreeStatus: function getTreeStatus() {
    if (this.treeConfig) {
      return {
        config: this.treeOpts,
        rowExpandeds: this.getTreeExpandRecords()
      };
    }

    return null;
  },

  /**
   * 判断树节点是否懒加载完成
   * @param {Row} row 行对象
   */
  isTreeExpandLoaded: function isTreeExpandLoaded(row) {
    var rest = this.fullAllDataRowMap.get(row);
    return rest && rest.treeLoaded;
  },
  clearTreeExpandLoaded: function clearTreeExpandLoaded(row) {
    var treeOpts = this.treeOpts,
        treeExpandeds = this.treeExpandeds,
        fullAllDataRowMap = this.fullAllDataRowMap;
    var lazy = treeOpts.lazy;
    var rest = fullAllDataRowMap.get(row);

    if (lazy && rest) {
      rest.treeLoaded = false;

      _ctor.default.remove(treeExpandeds, function (item) {
        return row === item;
      });
    }

    return this.$nextTick();
  },

  /**
   * 重新加载树的子节点
   * @param {Row} row 行对象
   */
  reloadTreeChilds: function reloadTreeChilds(row) {
    var _this33 = this;

    var treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds;
    var lazy = treeOpts.lazy,
        hasChild = treeOpts.hasChild;

    if (lazy && row[hasChild] && treeLazyLoadeds.indexOf(row) === -1) {
      this.clearTreeExpandLoaded(row).then(function () {
        return _this33.handleAsyncTreeExpandChilds(row);
      });
    }

    return this.$nextTick();
  },

  /**
   * 展开树节点事件
   */
  triggerTreeExpandEvent: function triggerTreeExpandEvent(evnt, params) {
    var treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds;
    var row = params.row,
        column = params.column;
    var lazy = treeOpts.lazy;

    if (!lazy || treeLazyLoadeds.indexOf(row) === -1) {
      var expanded = !this.isTreeExpandByRow(row);
      var columnIndex = this.getColumnIndex(column);
      var $columnIndex = this.$getColumnIndex(column);
      this.setTreeExpand(row, expanded);
      this.emitEvent('toggle-tree-expand', {
        expanded: expanded,
        column: column,
        columnIndex: columnIndex,
        $columnIndex: $columnIndex,
        row: row
      }, evnt);
    }
  },

  /**
   * 切换/展开树节点
   */
  toggleTreeExpand: function toggleTreeExpand(row) {
    return this.setTreeExpand(row, !this.isTreeExpandByRow(row));
  },

  /**
   * 处理默认展开树节点
   */
  handleDefaultTreeExpand: function handleDefaultTreeExpand() {
    var treeConfig = this.treeConfig,
        treeOpts = this.treeOpts,
        tableFullData = this.tableFullData;

    if (treeConfig) {
      var expandAll = treeOpts.expandAll,
          expandRowKeys = treeOpts.expandRowKeys;

      if (expandAll) {
        this.setAllTreeExpand(true);
      } else if (expandRowKeys) {
        var defExpandeds = [];
        var rowkey = getRowkey(this);
        expandRowKeys.forEach(function (rowid) {
          var matchObj = _ctor.default.findTree(tableFullData, function (item) {
            return rowid === _ctor.default.get(item, rowkey);
          }, treeOpts);

          if (matchObj) {
            defExpandeds.push(matchObj.item);
          }
        });
        this.setTreeExpand(defExpandeds, true);
      }
    }
  },
  handleAsyncTreeExpandChilds: function handleAsyncTreeExpandChilds(row) {
    var _this34 = this;

    var fullAllDataRowMap = this.fullAllDataRowMap,
        treeExpandeds = this.treeExpandeds,
        treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds,
        checkboxOpts = this.checkboxOpts;
    var loadMethod = treeOpts.loadMethod,
        children = treeOpts.children;
    var checkStrictly = checkboxOpts.checkStrictly;
    var rest = fullAllDataRowMap.get(row);
    return new Promise(function (resolve) {
      treeLazyLoadeds.push(row);
      loadMethod({
        $table: _this34,
        row: row
      }).catch(function () {
        return [];
      }).then(function (childs) {
        rest.treeLoaded = true;

        _ctor.default.remove(treeLazyLoadeds, function (item) {
          return item === row;
        });

        if (!_ctor.default.isArray(childs)) {
          childs = [];
        }

        if (childs) {
          row[children] = childs;

          _this34.appendTreeCache(row, childs);

          if (childs.length && treeExpandeds.indexOf(row) === -1) {
            treeExpandeds.push(row);
          } // 如果当前节点已选中，则展开后子节点也被选中


          if (!checkStrictly && _this34.isCheckedByCheckboxRow(row)) {
            _this34.setCheckboxRow(childs, true);
          }
        }

        resolve(_this34.$nextTick().then(_this34.recalculate));
      });
    });
  },

  /**
   * 设置所有树节点的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllTreeExpand: function setAllTreeExpand(expanded) {
    var tableFullData = this.tableFullData,
        treeOpts = this.treeOpts;
    var lazy = treeOpts.lazy,
        children = treeOpts.children;
    var expandeds = [];

    _ctor.default.eachTree(tableFullData, function (row) {
      var rowChildren = row[children];

      if (lazy || rowChildren && rowChildren.length) {
        expandeds.push(row);
      }
    }, treeOpts);

    return this.setTreeExpand(expandeds, expanded);
  },

  /**
   * 设置展开树形节点，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setTreeExpand: function setTreeExpand(rows, expanded) {
    var _this35 = this;

    var fullAllDataRowMap = this.fullAllDataRowMap,
        tableFullData = this.tableFullData,
        treeExpandeds = this.treeExpandeds,
        treeOpts = this.treeOpts,
        treeLazyLoadeds = this.treeLazyLoadeds,
        treeNodeColumn = this.treeNodeColumn;
    var reserve = treeOpts.reserve,
        lazy = treeOpts.lazy,
        hasChild = treeOpts.hasChild,
        children = treeOpts.children,
        accordion = treeOpts.accordion,
        toggleMethod = treeOpts.toggleMethod;
    var result = [];
    var columnIndex = this.getColumnIndex(treeNodeColumn);
    var $columnIndex = this.$getColumnIndex(treeNodeColumn);

    if (rows) {
      if (!_ctor.default.isArray(rows)) {
        rows = [rows];
      }

      if (rows.length) {
        var validRows = toggleMethod ? rows.filter(function (row) {
          return toggleMethod({
            expanded: expanded,
            column: treeNodeColumn,
            columnIndex: columnIndex,
            $columnIndex: $columnIndex,
            row: row
          });
        }) : rows;

        if (accordion) {
          validRows = validRows.length ? [validRows[validRows.length - 1]] : []; // 同一级只能展开一个

          var matchObj = _ctor.default.findTree(tableFullData, function (item) {
            return item === validRows[0];
          }, treeOpts);

          if (matchObj) {
            _ctor.default.remove(treeExpandeds, function (item) {
              return matchObj.items.indexOf(item) > -1;
            });
          }
        }

        if (expanded) {
          validRows.forEach(function (row) {
            if (treeExpandeds.indexOf(row) === -1) {
              var rest = fullAllDataRowMap.get(row);
              var isLoad = lazy && row[hasChild] && !rest.treeLoaded && treeLazyLoadeds.indexOf(row) === -1; // 是否使用懒加载

              if (isLoad) {
                result.push(_this35.handleAsyncTreeExpandChilds(row));
              } else {
                if (row[children] && row[children].length) {
                  treeExpandeds.push(row);
                }
              }
            }
          });
        } else {
          _ctor.default.remove(treeExpandeds, function (row) {
            return validRows.indexOf(row) > -1;
          });
        }

        if (reserve) {
          validRows.forEach(function (row) {
            return _this35.handleTreeExpandReserve(row, expanded);
          });
        }

        return Promise.all(result).then(this.recalculate);
      }
    }

    return this.$nextTick();
  },

  /**
   * 判断行是否为树形节点展开状态
   * @param {Row} row 行对象
   */
  isTreeExpandByRow: function isTreeExpandByRow(row) {
    return this.treeExpandeds.indexOf(row) > -1;
  },

  /**
   * 手动清空树形节点的展开状态，数据会恢复成未展开的状态
   */
  clearTreeExpand: function clearTreeExpand() {
    var _this36 = this;

    var treeOpts = this.treeOpts,
        treeExpandeds = this.treeExpandeds,
        tableFullData = this.tableFullData;
    var reserve = treeOpts.reserve;
    var isExists = treeExpandeds.length;
    this.treeExpandeds = [];

    if (reserve) {
      _ctor.default.eachTree(tableFullData, function (row) {
        return _this36.handleTreeExpandReserve(row, false);
      }, treeOpts);
    }

    return this.$nextTick().then(function () {
      if (isExists) {
        _this36.recalculate();
      }
    });
  },
  clearTreeExpandReserve: function clearTreeExpandReserve() {
    this.treeExpandedReserveRowMap = {};
    return this.$nextTick();
  },
  handleTreeExpandReserve: function handleTreeExpandReserve(row, expanded) {
    var treeExpandedReserveRowMap = this.treeExpandedReserveRowMap,
        treeOpts = this.treeOpts;

    if (treeOpts.reserve) {
      var rowid = getRowid(this, row);

      if (expanded) {
        treeExpandedReserveRowMap[rowid] = row;
      } else if (treeExpandedReserveRowMap[rowid]) {
        delete treeExpandedReserveRowMap[rowid];
      }
    }
  },

  /**
   * 获取表格的滚动状态
   */
  getScroll: function getScroll() {
    var $refs = this.$refs,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad;
    var bodyElem = $refs.tableBody.$el;
    return {
      virtualX: scrollXLoad,
      virtualY: scrollYLoad,
      scrollTop: bodyElem.scrollTop,
      scrollLeft: bodyElem.scrollLeft
    };
  },

  /**
   * 横向 X 可视渲染事件处理
   */
  triggerScrollXEvent: function triggerScrollXEvent() {
    this.loadScrollXData();
  },
  loadScrollXData: function loadScrollXData() {
    var mergeList = this.mergeList,
        mergeFooterList = this.mergeFooterList,
        scrollXStore = this.scrollXStore;
    var startIndex = scrollXStore.startIndex,
        endIndex = scrollXStore.endIndex,
        offsetSize = scrollXStore.offsetSize;

    var _computeVirtualX2 = computeVirtualX(this),
        toVisibleIndex = _computeVirtualX2.toVisibleIndex,
        visibleSize = _computeVirtualX2.visibleSize;

    var offsetItem = {
      startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize),
      endIndex: toVisibleIndex + visibleSize + offsetSize
    };
    calculateMergerOffserIndex(mergeList.concat(mergeFooterList), offsetItem, 'col');
    var offsetStartIndex = offsetItem.startIndex,
        offsetEndIndex = offsetItem.endIndex;

    if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
      if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
        scrollXStore.startIndex = offsetStartIndex;
        scrollXStore.endIndex = offsetEndIndex;
        this.updateScrollXData();
      }
    }

    this.clostTooltip();
  },

  /**
   * 纵向 Y 可视渲染事件处理
   */
  triggerScrollYEvent: function triggerScrollYEvent(evnt) {
    // webkit 浏览器使用最佳的渲染方式
    if (isWebkit && this.scrollYStore.adaptive) {
      this.loadScrollYData(evnt);
    } else {
      this.debounceScrollY(evnt);
    }
  },
  debounceScrollY: _ctor.default.debounce(function (evnt) {
    this.loadScrollYData(evnt);
  }, debounceScrollYDuration, {
    leading: false,
    trailing: true
  }),

  /**
   * 纵向 Y 可视渲染处理
   */
  loadScrollYData: function loadScrollYData(evnt) {
    var mergeList = this.mergeList,
        scrollYStore = this.scrollYStore;
    var startIndex = scrollYStore.startIndex,
        endIndex = scrollYStore.endIndex,
        visibleSize = scrollYStore.visibleSize,
        offsetSize = scrollYStore.offsetSize,
        rowHeight = scrollYStore.rowHeight;
    var scrollBodyElem = evnt.target;
    var scrollTop = scrollBodyElem.scrollTop;
    var toVisibleIndex = Math.floor(scrollTop / rowHeight);
    var offsetItem = {
      startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize),
      endIndex: toVisibleIndex + visibleSize + offsetSize
    };
    calculateMergerOffserIndex(mergeList, offsetItem, 'row');
    var offsetStartIndex = offsetItem.startIndex,
        offsetEndIndex = offsetItem.endIndex;

    if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
      if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
        scrollYStore.startIndex = offsetStartIndex;
        scrollYStore.endIndex = offsetEndIndex;
        this.updateScrollYData();
      }
    }
  },
  // 计算可视渲染相关数据
  computeScrollLoad: function computeScrollLoad() {
    var _this37 = this;

    return this.$nextTick().then(function () {
      var sYOpts = _this37.sYOpts,
          sXOpts = _this37.sXOpts,
          scrollXLoad = _this37.scrollXLoad,
          scrollYLoad = _this37.scrollYLoad,
          scrollXStore = _this37.scrollXStore,
          scrollYStore = _this37.scrollYStore; // 计算 X 逻辑

      if (scrollXLoad) {
        var _computeVirtualX3 = computeVirtualX(_this37),
            visibleXSize = _computeVirtualX3.visibleSize;

        var offsetXSize = sXOpts.oSize ? _ctor.default.toNumber(sXOpts.oSize) : browse.msie ? 10 : browse.edge ? 5 : 0;
        scrollXStore.offsetSize = offsetXSize;
        scrollXStore.visibleSize = visibleXSize;
        scrollXStore.endIndex = Math.max(scrollXStore.startIndex + scrollXStore.visibleSize + offsetXSize, scrollXStore.endIndex);

        _this37.updateScrollXData();
      } else {
        _this37.updateScrollXSpace();
      } // 计算 Y 逻辑


      var _computeVirtualY = computeVirtualY(_this37),
          rowHeight = _computeVirtualY.rowHeight,
          visibleYSize = _computeVirtualY.visibleSize;

      scrollYStore.rowHeight = rowHeight;

      if (scrollYLoad) {
        var offsetYSize = sYOpts.oSize ? _ctor.default.toNumber(sYOpts.oSize) : browse.msie ? 20 : browse.edge ? 10 : 0;
        scrollYStore.offsetSize = offsetYSize;
        scrollYStore.visibleSize = visibleYSize;
        scrollYStore.endIndex = Math.max(scrollYStore.startIndex + visibleYSize + offsetYSize, scrollYStore.endIndex);

        _this37.updateScrollYData();
      } else {
        _this37.updateScrollYSpace();
      }

      _this37.rowHeight = rowHeight;

      _this37.$nextTick(_this37.updateStyle);
    });
  },
  handleTableColumn: function handleTableColumn() {
    var scrollXLoad = this.scrollXLoad,
        visibleColumn = this.visibleColumn,
        scrollXStore = this.scrollXStore;
    this.tableColumn = scrollXLoad ? visibleColumn.slice(scrollXStore.startIndex, scrollXStore.endIndex) : visibleColumn.slice(0);
  },
  updateScrollXData: function updateScrollXData() {
    this.handleTableColumn();
    this.updateScrollXSpace();
  },
  // 更新横向 X 可视渲染上下剩余空间大小
  updateScrollXSpace: function updateScrollXSpace() {
    var $refs = this.$refs,
        elemStore = this.elemStore,
        visibleColumn = this.visibleColumn,
        scrollXStore = this.scrollXStore,
        scrollXLoad = this.scrollXLoad,
        tableWidth = this.tableWidth,
        scrollbarWidth = this.scrollbarWidth;
    var tableHeader = $refs.tableHeader,
        tableBody = $refs.tableBody,
        tableFooter = $refs.tableFooter;
    var tableBodyElem = tableBody ? tableBody.$el : null;

    if (tableBodyElem) {
      var tableHeaderElem = tableHeader ? tableHeader.$el : null;
      var tableFooterElem = tableFooter ? tableFooter.$el : null;
      var headerElem = tableHeaderElem ? tableHeaderElem.querySelector('.vxe-table--header') : null;
      var bodyElem = tableBodyElem.querySelector('.vxe-table--body');
      var footerElem = tableFooterElem ? tableFooterElem.querySelector('.vxe-table--footer') : null;
      var leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);
      var marginLeft = '';

      if (scrollXLoad) {
        marginLeft = "".concat(leftSpaceWidth, "px");
      }

      if (headerElem) {
        headerElem.style.marginLeft = marginLeft;
      }

      bodyElem.style.marginLeft = marginLeft;

      if (footerElem) {
        footerElem.style.marginLeft = marginLeft;
      }

      var containerList = ['main'];
      containerList.forEach(function (name) {
        var layoutList = ['header', 'body', 'footer'];
        layoutList.forEach(function (layout) {
          var xSpaceElem = elemStore["".concat(name, "-").concat(layout, "-xSpace")];

          if (xSpaceElem) {
            xSpaceElem.style.width = scrollXLoad ? "".concat(tableWidth + (layout === 'header' ? scrollbarWidth : 0), "px") : '';
          }
        });
      });
      this.$nextTick(this.updateStyle);
    }
  },
  updateScrollYData: function updateScrollYData() {
    this.handleTableData();
    this.updateScrollYSpace();
  },
  // 更新纵向 Y 可视渲染上下剩余空间大小
  updateScrollYSpace: function updateScrollYSpace() {
    var elemStore = this.elemStore,
        scrollYStore = this.scrollYStore,
        scrollYLoad = this.scrollYLoad,
        afterFullData = this.afterFullData;
    var startIndex = scrollYStore.startIndex,
        rowHeight = scrollYStore.rowHeight;
    var bodyHeight = afterFullData.length * rowHeight;
    var topSpaceHeight = Math.max(0, startIndex * rowHeight);
    var containerList = ['main', 'left', 'right'];
    var marginTop = '';
    var ySpaceHeight = '';

    if (scrollYLoad) {
      marginTop = "".concat(topSpaceHeight, "px");
      ySpaceHeight = "".concat(bodyHeight, "px");
    }

    containerList.forEach(function (name) {
      var layoutList = ['header', 'body', 'footer'];
      var tableElem = elemStore["".concat(name, "-body-table")];

      if (tableElem) {
        tableElem.style.marginTop = marginTop;
      }

      layoutList.forEach(function (layout) {
        var ySpaceElem = elemStore["".concat(name, "-").concat(layout, "-ySpace")];

        if (ySpaceElem) {
          ySpaceElem.style.height = ySpaceHeight;
        }
      });
    });
    this.$nextTick(this.updateStyle);
  },

  /**
   * 如果有滚动条，则滚动到对应的位置
   * @param {Number} scrollLeft 左距离
   * @param {Number} scrollTop 上距离
   */
  scrollTo: function scrollTo(scrollLeft, scrollTop) {
    var _this38 = this;

    var $refs = this.$refs;
    var tableBody = $refs.tableBody,
        rightBody = $refs.rightBody,
        tableFooter = $refs.tableFooter;
    var tableBodyElem = tableBody ? tableBody.$el : null;
    var rightBodyElem = rightBody ? rightBody.$el : null;
    var bodyTargetElem = rightBodyElem || tableBodyElem;
    var tableFooterElem = tableFooter ? tableFooter.$el : null;
    var footerTargetElem = tableFooterElem || tableBodyElem;

    if (_ctor.default.isNumber(scrollLeft)) {
      footerTargetElem.scrollLeft = scrollLeft;
    }

    if (_ctor.default.isNumber(scrollTop)) {
      bodyTargetElem.scrollTop = scrollTop;
    }

    if (this.scrollXLoad || this.scrollYLoad) {
      return new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve(_this38.$nextTick());
        }, 50);
      });
    }

    return this.$nextTick();
  },

  /**
   * 如果有滚动条，则滚动到对应的行
   * @param {Row} row 行对象
   * @param {ColumnInfo} column 列配置
   */
  scrollToRow: function scrollToRow(row, column) {
    var rest = [];

    if (row) {
      if (this.treeConfig) {
        rest.push(this.scrollToTreeRow(row));
      } else {
        rest.push(_tools.DomTools.rowToVisible(this, row));
      }
    }

    if (column) {
      rest.push(this.scrollToColumn(column));
    }

    return Promise.all(rest);
  },

  /**
   * 如果有滚动条，则滚动到对应的列
   * @param {ColumnInfo} column 列配置
   */
  scrollToColumn: function scrollToColumn(column) {
    if (column && this.fullColumnMap.has(column)) {
      return _tools.DomTools.colToVisible(this, column);
    }

    return this.$nextTick();
  },

  /**
   * 对于树形结构中，可以直接滚动到指定深层节点中
   * 对于某些特定的场景可能会用到，比如定位到某一节点
   * @param {Row} row 行对象
   */
  scrollToTreeRow: function scrollToTreeRow(row) {
    var _this39 = this;

    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig,
        treeOpts = this.treeOpts;

    if (treeConfig) {
      var matchObj = _ctor.default.findTree(tableFullData, function (item) {
        return item === row;
      }, treeOpts);

      if (matchObj) {
        var nodes = matchObj.nodes;
        nodes.forEach(function (row, index) {
          if (index < nodes.length - 1 && !_this39.isTreeExpandByRow(row)) {
            _this39.setTreeExpand(row, true);
          }
        });
      }
    }

    return this.$nextTick();
  },

  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll: function clearScroll() {
    var _this40 = this;

    var $refs = this.$refs;
    var tableBody = $refs.tableBody,
        rightBody = $refs.rightBody,
        tableFooter = $refs.tableFooter;
    var tableBodyElem = tableBody ? tableBody.$el : null;
    var rightBodyElem = rightBody ? rightBody.$el : null;
    var tableFooterElem = tableFooter ? tableFooter.$el : null;

    if (rightBodyElem) {
      rightBodyElem.scrollTop = 0;
    }

    if (tableFooterElem) {
      tableFooterElem.scrollLeft = 0;
    }

    if (tableBodyElem) {
      tableBodyElem.scrollTop = 0;
      tableBodyElem.scrollLeft = 0;
    }

    return new Promise(function (resolve) {
      requestAnimationFrame(function () {
        resolve(_this40.$nextTick());
      });
    });
  },

  /**
   * 更新表尾合计
   */
  updateFooter: function updateFooter() {
    var showFooter = this.showFooter,
        visibleColumn = this.visibleColumn,
        footerMethod = this.footerMethod;

    if (showFooter && footerMethod) {
      this.footerData = visibleColumn.length ? footerMethod({
        columns: visibleColumn,
        data: this.afterFullData,
        $table: this,
        $grid: this.$xegrid
      }) : [];
    }

    return this.$nextTick();
  },

  /**
   * 更新列状态
   * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
   * 如果单元格配置了校验规则，则会进行校验
   */
  updateStatus: function updateStatus(scope, cellValue) {
    var _this41 = this;

    var customVal = !_ctor.default.isUndefined(cellValue);
    return this.$nextTick().then(function () {
      var $refs = _this41.$refs,
          editRules = _this41.editRules,
          validStore = _this41.validStore;

      if (scope && $refs.tableBody && editRules) {
        var row = scope.row,
            column = scope.column;
        var type = 'change';

        if (_this41.hasCellRules(type, row, column)) {
          var cell = _this41.getCell(row, column);

          if (cell) {
            return _this41.validCellRules(type, row, column, cellValue).then(function () {
              if (customVal && validStore.visible) {
                setCellValue(row, column, cellValue);
              }

              _this41.clearValidate();
            }).catch(function (_ref6) {
              var rule = _ref6.rule;

              if (customVal) {
                setCellValue(row, column, cellValue);
              }

              _this41.showValidTooltip({
                rule: rule,
                row: row,
                column: column,
                cell: cell
              });
            });
          }
        }
      }
    });
  },
  handleDefaultMergeCells: function handleDefaultMergeCells() {
    this.setMergeCells(this.mergeCells);
  },

  /**
   * 设置合并单元格
   * @param {MergeOptions[]} merges { row: Row|number, column: ColumnInfo|number, rowspan: number, colspan: number }
   */
  setMergeCells: function setMergeCells(merges) {
    var _this42 = this;

    if (this.spanMethod) {
      _tools.UtilTools.error('vxe.error.errConflicts', ['merge-cells', 'span-method']);
    }

    setMerges(this, merges, this.mergeList, this.afterFullData);
    return this.$nextTick().then(function () {
      return _this42.updateCellAreas();
    });
  },

  /**
   * 移除单元格合并
   * @param {MergeOptions[]} merges 多个或数组 [{row:Row|number, col:ColumnInfo|number}]
   */
  removeMergeCells: function removeMergeCells(merges) {
    var _this43 = this;

    if (this.spanMethod) {
      _tools.UtilTools.error('vxe.error.errConflicts', ['merge-cells', 'span-method']);
    }

    var rest = removeMerges(this, merges, this.mergeList, this.afterFullData);
    return this.$nextTick().then(function () {
      _this43.updateCellAreas();

      return rest;
    });
  },

  /**
   * 获取所有被合并的单元格
   */
  getMergeCells: function getMergeCells() {
    return this.mergeList.slice(0);
  },

  /**
   * 清除所有单元格合并
   */
  clearMergeCells: function clearMergeCells() {
    this.mergeList = [];
    return this.$nextTick();
  },
  handleDefaultMergeFooterItems: function handleDefaultMergeFooterItems() {
    this.setMergeFooterItems(this.mergeFooterItems);
  },
  setMergeFooterItems: function setMergeFooterItems(merges) {
    var _this44 = this;

    if (this.footerSpanMethod) {
      _tools.UtilTools.error('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method']);
    }

    setMerges(this, merges, this.mergeFooterList, null);
    return this.$nextTick().then(function () {
      return _this44.updateCellAreas();
    });
  },
  removeMergeFooterItems: function removeMergeFooterItems(merges) {
    var _this45 = this;

    if (this.footerSpanMethod) {
      _tools.UtilTools.error('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method']);
    }

    var rest = removeMerges(this, merges, this.mergeFooterList, null);
    return this.$nextTick().then(function () {
      _this45.updateCellAreas();

      return rest;
    });
  },

  /**
   * 获取所有被合并的表尾
   */
  getMergeFooterItems: function getMergeFooterItems() {
    return this.mergeFooterList.slice(0);
  },

  /**
   * 清除所有表尾合并
   */
  clearMergeFooterItems: function clearMergeFooterItems() {
    this.mergeFooterList = [];
    return this.$nextTick();
  },
  updateZindex: function updateZindex() {
    if (this.zIndex) {
      this.tZindex = this.zIndex;
    } else if (this.tZindex < _tools.UtilTools.getLastZIndex()) {
      this.tZindex = _tools.UtilTools.nextZIndex();
    }
  },
  updateCellAreas: function updateCellAreas() {
    var _this46 = this;

    this.recalculate().then(function () {
      return _this46.refreshScroll();
    }).then(function () {
      if (_this46.mouseConfig && _this46.mouseOpts.area && _this46.handleUpdateCellAreas) {
        _this46.handleUpdateCellAreas();
      }
    });
  },
  emitEvent: function emitEvent(type, params, evnt) {
    this.$emit(type, Object.assign({
      $table: this,
      $grid: this.$xegrid,
      $event: evnt
    }, params));
  },
  focus: function focus() {
    this.isActivated = true;
    return this.$nextTick();
  },
  blur: function blur() {
    this.isActivated = false;
    return this.$nextTick();
  },

  /*************************
   * Publish methods
   *************************/
  getCell: function getCell(row, column) {
    var $refs = this.$refs;
    var rowid = getRowid(this, row);
    var bodyElem = $refs["".concat(column.fixed || 'table', "Body")] || $refs.tableBody;

    if (bodyElem && bodyElem.$el) {
      return bodyElem.$el.querySelector(".vxe-body--row[data-rowid=\"".concat(rowid, "\"] .").concat(column.id));
    }

    return null;
  },
  // 与工具栏对接
  connect: function connect($toolbar) {
    if ($toolbar && $toolbar.syncUpdate) {
      $toolbar.syncUpdate({
        collectColumn: this.collectColumn,
        $table: this
      });
      this.$toolbar = $toolbar;
    } else {
      _tools.UtilTools.error('vxe.error.barUnableLink');
    }
  }
  /*************************
   * Publish methods
   *************************/

}; // Module methods

var funcs = 'setFilter,clearFilter,closeMenu,setActiveCellArea,getActiveCellArea,getCellAreas,clearCellAreas,copyCellArea,cutCellArea,pasteCellArea,getCopyCellArea,clearCopyCellArea,setCellAreas,openFind,openReplace,getSelectedCell,clearSelected,insert,insertAt,remove,removeCheckboxRow,removeRadioRow,removeCurrentRow,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearActived,getActiveRecord,isActiveByRow,setActiveRow,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,openExport,exportData,openImport,importData,readFile,importByFile,print'.split(',');
funcs.forEach(function (name) {
  Methods[name] = function () {
    return this["_".concat(name)] ? this["_".concat(name)].apply(this, arguments) : null;
  };
});
var _default = Methods;
exports.default = _default;