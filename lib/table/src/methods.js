"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _cell = _interopRequireDefault(require("../../cell"));

var _vXETable = _interopRequireWildcard(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rowUniqueId = 0;
var browse = _tools.DomTools.browse;
var isWebkit = browse['-webkit'] && !browse.edge;
var debounceScrollYDuration = browse.msie ? 40 : 20; // 分组表头的属性

var headerProps = {
  children: 'children'
};

function getRowUniqueId() {
  return "row_".concat(++rowUniqueId);
}

function isTargetRadioOrCheckbox(evnt, column, colType, targetType) {
  var target = evnt.target;
  return target && column.type === colType && target.tagName.toLowerCase() === 'input' && target.type === (targetType || colType);
}

var Methods = {
  getParentElem: function getParentElem() {
    return this.$grid ? this.$grid.$el.parentNode : this.$el.parentNode;
  },
  getParentHeight: function getParentHeight() {
    return this.$grid ? this.$grid.getParentHeight() : this.getParentElem().clientHeight;
  },
  clearAll: function clearAll() {
    this.clearScroll();
    this.clearSort();
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.clearSelection();
    this.clearRowExpand();
    this.clearTreeExpand();

    if (_vXETable.default._filter) {
      this.clearFilter();
    }

    if (this.keyboardConfig || this.mouseConfig) {
      this.clearIndexChecked();
      this.clearHeaderChecked();
      this.clearChecked();
      this.clearSelected();
      this.clearCopyed();
    }

    return this.clearActived();
  },
  refreshData: function refreshData() {
    var _this = this;

    return this.$nextTick().then(function () {
      _this.tableData = [];
      return _this.$nextTick().then(function () {
        return _this.loadTableData(_this.tableFullData);
      });
    });
  },
  updateData: function updateData() {
    return this.handleTableData(true).then(this.updateFooter).then(this.recalculate);
  },
  handleTableData: function handleTableData(force) {
    var scrollYLoad = this.scrollYLoad,
        scrollYStore = this.scrollYStore;
    var fullData = force ? this.updateAfterFullData() : this.afterFullData;
    this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0);
    return this.$nextTick();
  },
  loadTableData: function loadTableData(datas, notRefresh) {
    var _this2 = this;

    var height = this.height,
        maxHeight = this.maxHeight,
        treeConfig = this.treeConfig,
        editStore = this.editStore,
        optimizeOpts = this.optimizeOpts,
        lastScrollLeft = this.lastScrollLeft,
        lastScrollTop = this.lastScrollTop;
    var scrollY = optimizeOpts.scrollY;
    var tableFullData = datas ? datas.slice(0) : [];
    var scrollYLoad = !treeConfig && scrollY && scrollY.gt && scrollY.gt < tableFullData.length;
    editStore.insertList = [];
    editStore.removeList = []; // 全量数据

    this.tableFullData = tableFullData; // 缓存数据

    this.updateCache(true); // 原始数据

    this.tableSynchData = datas;
    this.tableSourceData = _xeUtils.default.clone(tableFullData, true);
    this.scrollYLoad = scrollYLoad;

    if (scrollYLoad && !(height || maxHeight)) {
      _tools.UtilTools.error('vxe.error.scrollYHeight');
    }

    this.clearScroll();
    this.handleTableData(true);
    this.reserveCheckSelection();
    this.checkSelectionStatus();
    var rest = this.$nextTick();

    if (!notRefresh) {
      rest = rest.then(this.recalculate);
    }

    return rest.then(function () {
      if (lastScrollLeft || lastScrollTop) {
        return _this2.scrollTo(lastScrollLeft, lastScrollTop);
      }
    });
  },
  loadData: function loadData(datas) {
    return this.loadTableData(datas).then(this.recalculate);
  },
  reloadData: function reloadData(datas) {
    this.clearAll();
    return this.loadTableData(datas).then(this.handleDefault);
  },
  reloadRow: function reloadRow(row, record, field) {
    var tableSourceData = this.tableSourceData,
        tableData = this.tableData;
    var rowIndex = this.getRowIndex(row);
    var oRow = tableSourceData[rowIndex];

    if (oRow && row) {
      if (field) {
        _xeUtils.default.set(oRow, field, _xeUtils.default.get(record || row, field));
      } else {
        if (record) {
          tableSourceData[rowIndex] = record;

          _xeUtils.default.clear(row, undefined);

          Object.assign(row, this.defineField(Object.assign({}, record)));
          this.updateCache(true);
        } else {
          _xeUtils.default.destructuring(oRow, _xeUtils.default.clone(row, true));
        }
      }
    }

    this.tableData = tableData.slice(0);
    return this.$nextTick();
  },
  loadColumn: function loadColumn(columns) {
    var _this3 = this;

    this.collectColumn = _xeUtils.default.mapTree(columns, function (column) {
      return _cell.default.createColumn(_this3, column);
    }, headerProps);
    return this.$nextTick();
  },
  reloadColumn: function reloadColumn(columns) {
    this.clearAll();
    return this.loadColumn(columns);
  },
  // 更新数据的 Map
  updateCache: function updateCache(source) {
    var _this4 = this;

    var treeConfig = this.treeConfig,
        tableFullData = this.tableFullData,
        fullDataRowIdData = this.fullDataRowIdData,
        fullDataRowMap = this.fullDataRowMap,
        fullAllDataRowMap = this.fullAllDataRowMap,
        fullAllDataRowIdData = this.fullAllDataRowIdData;

    var rowkey = _tools.UtilTools.getRowkey(this);

    var handleCache = function handleCache(row, index) {
      var rowid = _tools.UtilTools.getRowid(_this4, row);

      if (!rowid) {
        rowid = getRowUniqueId();

        _xeUtils.default.set(row, rowkey, rowid);
      }

      var rest = {
        row: row,
        rowid: rowid,
        index: index
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
      _xeUtils.default.eachTree(tableFullData, handleCache, treeConfig);
    } else {
      tableFullData.forEach(handleCache);
    }
  },
  // 更新列的 Map
  cacheColumnMap: function cacheColumnMap() {
    var tableFullColumn = this.tableFullColumn,
        fullColumnMap = this.fullColumnMap;
    var fullColumnIdData = this.fullColumnIdData = {};
    fullColumnMap.clear();
    tableFullColumn.forEach(function (column, index) {
      var rest = {
        column: column,
        colid: column.id,
        index: index
      };
      fullColumnIdData[column.id] = rest;
      fullColumnMap.set(column, rest);
    });
  },
  getRowNode: function getRowNode(tr) {
    var _this5 = this;

    if (tr) {
      var treeConfig = this.treeConfig,
          tableFullData = this.tableFullData,
          fullAllDataRowIdData = this.fullAllDataRowIdData;
      var rowid = tr.getAttribute('data-rowid');

      if (treeConfig) {
        var matchObj = _xeUtils.default.findTree(tableFullData, function (row) {
          return _tools.UtilTools.getRowid(_this5, row) === rowid;
        }, treeConfig);

        if (matchObj) {
          return matchObj;
        }
      } else {
        if (fullAllDataRowIdData[rowid]) {
          var rest = fullAllDataRowIdData[rowid];
          return {
            item: rest.row,
            index: rest.index,
            items: tableFullData
          };
        }
      }
    }

    return null;
  },
  getColumnNode: function getColumnNode(cell) {
    if (cell) {
      var isGroup = this.isGroup,
          fullColumnIdData = this.fullColumnIdData,
          tableFullColumn = this.tableFullColumn;
      var colid = cell.getAttribute('data-colid');

      if (isGroup) {
        var matchObj = _xeUtils.default.findTree(tableFullColumn, function (column) {
          return column.id === colid;
        }, headerProps);

        if (matchObj) {
          return matchObj;
        }
      } else {
        var _fullColumnIdData$col = fullColumnIdData[colid],
            column = _fullColumnIdData$col.column,
            index = _fullColumnIdData$col.index;
        return {
          item: column,
          index: index,
          items: tableFullColumn
        };
      }
    }

    return null;
  },
  getRowIndex: function getRowIndex(row) {
    return this.fullDataRowMap.has(row) ? this.fullDataRowMap.get(row).index : -1;
  },
  getColumnIndex: function getColumnIndex(column) {
    return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1;
  },
  hasIndexColumn: function hasIndexColumn(column) {
    return column && column.type === 'index';
  },
  defineField: function defineField(row) {
    var rowkey = _tools.UtilTools.getRowkey(this);

    this.visibleColumn.forEach(function (_ref) {
      var property = _ref.property,
          editRender = _ref.editRender;

      if (property && !_xeUtils.default.has(row, property)) {
        _xeUtils.default.set(row, property, editRender && !_xeUtils.default.isUndefined(editRender.defaultValue) ? editRender.defaultValue : null);
      }
    }); // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数

    if (!_xeUtils.default.get(row, rowkey)) {
      _xeUtils.default.set(row, rowkey, getRowUniqueId());
    }

    return row;
  },
  createData: function createData(records) {
    var _this6 = this;

    return this.$nextTick().then(function () {
      return records.map(_this6.defineField);
    });
  },
  createRow: function createRow(records) {
    var _this7 = this;

    var isArr = _xeUtils.default.isArray(records);

    if (!isArr) {
      records = [records];
    }

    return this.$nextTick().then(function () {
      var rows = records.map(function (record) {
        return _this7.defineField(Object.assign({}, record));
      });
      return isArr ? rows : rows[0];
    });
  },

  /**
   * 清空单元格内容
   * 如果不创参数，则清空整个表格内容
   * 如果传 row 则清空一行内容
   * 如果传 rows 则清空多行内容
   * 如果还额外传了 field 则清空指定单元格内容
   */
  clearData: function clearData(rows, field) {
    var tableFullData = this.tableFullData,
        visibleColumn = this.visibleColumn;

    if (!arguments.length) {
      rows = tableFullData;
    } else if (rows && !_xeUtils.default.isArray(rows)) {
      rows = [rows];
    }

    if (field) {
      rows.forEach(function (row) {
        return _xeUtils.default.set(row, field, null);
      });
    } else {
      rows.forEach(function (row) {
        visibleColumn.forEach(function (column) {
          if (column.property) {
            _tools.UtilTools.setCellValue(row, column, null);
          }
        });
      });
    }

    return this.$nextTick();
  },
  hasRowInsert: function hasRowInsert(row) {
    return this.editStore.insertList.indexOf(row) > -1;
  },
  hasRowChange: function hasRowChange(row, field) {
    var _this8 = this;

    var oRow, property;
    var visibleColumn = this.visibleColumn,
        treeConfig = this.treeConfig,
        tableSourceData = this.tableSourceData,
        fullDataRowIdData = this.fullDataRowIdData;

    var rowid = _tools.UtilTools.getRowid(this, row); // 新增的数据不需要检测


    if (!fullDataRowIdData[rowid]) {
      return false;
    }

    if (treeConfig) {
      var children = treeConfig.children;

      var matchObj = _xeUtils.default.findTree(tableSourceData, function (item) {
        return rowid === _tools.UtilTools.getRowid(_this8, item);
      }, treeConfig);

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
        return !_xeUtils.default.isEqual(_xeUtils.default.get(oRow, field), _xeUtils.default.get(row, field));
      }

      for (var index = 0, len = visibleColumn.length; index < len; index++) {
        property = visibleColumn[index].property;

        if (property && !_xeUtils.default.isEqual(_xeUtils.default.get(oRow, property), _xeUtils.default.get(row, property))) {
          return true;
        }
      }
    }

    return false;
  },

  /**
   * 获取表格所有列
   */
  getColumns: function getColumns(columnIndex) {
    var columns = this.visibleColumn;
    return arguments.length ? columns[columnIndex] : columns.slice(0);
  },
  getColumnById: function getColumnById(colid) {
    var fullColumnIdData = this.fullColumnIdData;
    return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null;
  },
  getColumnByField: function getColumnByField(field) {
    return this.visibleColumn.find(function (column) {
      return column.property === field;
    });
  },

  /**
   * 获取表格可视列
   */
  getTableColumn: function getTableColumn() {
    return {
      fullColumn: this.tableFullColumn.slice(0),
      visibleColumn: this.visibleColumn.slice(0),
      tableColumn: this.tableColumn.slice(0)
    };
  },
  // 在 v3.0 中废弃 getRecords
  getRecords: function getRecords() {
    _tools.UtilTools.warn('vxe.error.delGetRecords');

    return this.getData.apply(this, arguments);
  },

  /**
   * 获取表格所有数据
   */
  getData: function getData(rowIndex) {
    var tableSynchData = this.data || this.tableSynchData;
    return arguments.length ? tableSynchData[rowIndex] : tableSynchData.slice(0);
  },
  // 在 v3.0 中废弃 getAllRecords
  getAllRecords: function getAllRecords() {
    _tools.UtilTools.warn('vxe.error.delGetAllRecords');

    return this.getRecordset();
  },

  /**
   * 获取选中数据
   */
  getSelectRecords: function getSelectRecords() {
    var tableFullData = this.tableFullData,
        editStore = this.editStore,
        treeConfig = this.treeConfig,
        _this$selectConfig = this.selectConfig,
        selectConfig = _this$selectConfig === void 0 ? {} : _this$selectConfig;
    var property = selectConfig.checkField;
    var rowList = [];
    var insList = [];

    if (property) {
      if (treeConfig) {
        rowList = _xeUtils.default.filterTree(tableFullData, function (row) {
          return _xeUtils.default.get(row, property);
        }, treeConfig);
      } else {
        rowList = tableFullData.filter(function (row) {
          return _xeUtils.default.get(row, property);
        });
      }

      insList = editStore.insertList.filter(function (row) {
        return _xeUtils.default.get(row, property);
      });
    } else {
      var selection = this.selection;

      if (treeConfig) {
        rowList = _xeUtils.default.filterTree(tableFullData, function (row) {
          return selection.indexOf(row) > -1;
        }, treeConfig);
      } else {
        rowList = tableFullData.filter(function (row) {
          return selection.indexOf(row) > -1;
        });
      }

      insList = editStore.insertList.filter(function (row) {
        return selection.indexOf(row) > -1;
      });
    }

    return rowList.concat(insList);
  },

  /**
   * 获取处理后全量的表格数据
   * 如果存在筛选条件，继续处理
   */
  updateAfterFullData: function updateAfterFullData() {
    var visibleColumn = this.visibleColumn,
        tableFullData = this.tableFullData,
        remoteSort = this.remoteSort,
        remoteFilter = this.remoteFilter;
    var tableData = tableFullData;
    var column = visibleColumn.find(function (column) {
      return column.order;
    });
    var filterColumn = visibleColumn.filter(function (_ref2) {
      var filters = _ref2.filters;
      return filters && filters.length;
    });
    tableData = tableData.filter(function (row) {
      return filterColumn.every(function (column) {
        var filters = column.filters,
            filterRender = column.filterRender;
        var compConf = filterRender ? _vXETable.Renderer.get(filterRender.name) : null;
        var valueList = [];
        var itemList = [];

        if (filters && filters.length) {
          filters.forEach(function (item) {
            if (item.checked) {
              itemList.push(item);
              valueList.push(item.value);
            }
          });

          if (valueList.length && !remoteFilter) {
            var property = column.property,
                filterMethod = column.filterMethod;

            if (!filterMethod && compConf && compConf.renderFilter) {
              filterMethod = compConf.filterMethod;
            }

            return filterMethod ? itemList.some(function (item) {
              return filterMethod({
                value: item.value,
                option: item,
                row: row,
                column: column
              });
            }) : valueList.indexOf(_xeUtils.default.get(row, property)) > -1;
          }
        }

        return true;
      });
    });

    if (column && column.order) {
      var isRemote = _xeUtils.default.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort;

      if (!isRemote) {
        if (this.sortMethod) {
          tableData = this.sortMethod({
            data: tableData,
            column: column,
            property: column.property,
            order: column.order,
            $table: this
          }) || tableData;
        } else {
          var rest = column.sortMethod ? tableData.sort(column.sortMethod) : _xeUtils.default.sortBy(tableData, column.property);
          tableData = column.order === 'desc' ? rest.reverse() : rest;
        }
      }
    }

    this.afterFullData = tableData;
    return tableData;
  },
  getRowById: function getRowById(rowid) {
    var fullDataRowIdData = this.fullDataRowIdData;
    return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null;
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
  handleDefault: function handleDefault() {
    var _this9 = this;

    if (this.selectConfig) {
      this.handleSelectionDefChecked();
    }

    if (this.radioConfig) {
      this.handleRadioDefChecked();
    }

    if (this.expandConfig) {
      this.handleDefaultRowExpand();
    }

    if (this.treeConfig) {
      this.handleDefaultTreeExpand();
    }

    this.updateFooter();
    this.$nextTick(function () {
      return setTimeout(_this9.recalculate);
    });
  },

  /**
   * 动态列处理
   */
  mergeCustomColumn: function mergeCustomColumn(customColumns) {
    var tableFullColumn = this.tableFullColumn;
    this.isUpdateCustoms = true;

    if (customColumns.length) {
      tableFullColumn.forEach(function (column) {
        // 在 v3.0 中废弃 prop
        var item = customColumns.find(function (item) {
          return column.property && (item.field || item.prop) === column.property;
        });

        if (item) {
          if (_xeUtils.default.isNumber(item.resizeWidth)) {
            column.resizeWidth = item.resizeWidth;
          }

          if (_xeUtils.default.isBoolean(item.visible)) {
            column.visible = item.visible;
          }
        }
      });
    }

    this.$emit('update:customs', tableFullColumn);
  },
  resetAll: function resetAll() {
    this.resetCustoms();
    this.resetResizable();
  },
  hideColumn: function hideColumn(column) {
    return this.handleVisibleColumn(column, false);
  },
  showColumn: function showColumn(column) {
    return this.handleVisibleColumn(column, true);
  },
  resetCustoms: function resetCustoms() {
    return this.handleVisibleColumn();
  },
  handleVisibleColumn: function handleVisibleColumn(column, visible) {
    if (arguments.length) {
      column.visible = visible;
    } else {
      this.tableFullColumn.forEach(function (column) {
        column.visible = true;
      });
    }

    if (this.$toolbar) {
      this.$toolbar.updateSetting();
    }

    return this.$nextTick();
  },

  /**
   * 初始化加载动态列
   */
  reloadCustoms: function reloadCustoms(customColumns) {
    var _this10 = this;

    return this.$nextTick().then(function () {
      _this10.mergeCustomColumn(customColumns);

      return _this10.refreshColumn().then(function () {
        return _this10.tableFullColumn;
      });
    });
  },

  /**
   * 刷新列信息
   * 将固定的列左边、右边分别靠边
   * 如果使用了分组表头，固定列必须在左侧或者右侧
   */
  refreshColumn: function refreshColumn() {
    var _this11 = this;

    var isColspan;
    var letIndex = 0;
    var leftList = [];
    var leftStartIndex = null;
    var rightEndIndex = null;
    var centerList = [];
    var rightList = [];
    var tableFullColumn = this.tableFullColumn,
        isGroup = this.isGroup,
        columnStore = this.columnStore,
        scrollXStore = this.scrollXStore,
        optimizeOpts = this.optimizeOpts;
    var scrollX = optimizeOpts.scrollX; // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏

    if (isGroup) {
      _xeUtils.default.eachTree(this.collectColumn, function (column) {
        if (column.children && column.children.length) {
          column.visible = !!_xeUtils.default.findTree(column.children, function (subColumn) {
            return subColumn.children && subColumn.children.length ? 0 : subColumn.visible;
          }, headerProps);
        }
      }, headerProps);
    } // 重新分配列


    tableFullColumn.filter(function (column) {
      return column.visible;
    }).forEach(function (column, columnIndex) {
      if (column.fixed === 'left') {
        if (leftStartIndex === null) {
          leftStartIndex = letIndex;
        }

        if (!isColspan) {
          if (columnIndex - letIndex !== 0) {
            isColspan = true;
          } else {
            letIndex++;
          }
        }

        leftList.push(column);
      } else if (column.fixed === 'right') {
        if (!isColspan) {
          if (rightEndIndex === null) {
            rightEndIndex = columnIndex;
          }

          if (columnIndex - rightEndIndex !== 0) {
            isColspan = true;
          } else {
            rightEndIndex++;
          }
        }

        rightList.push(column);
      } else {
        centerList.push(column);
      }
    });
    var visibleColumn = leftList.concat(centerList).concat(rightList);
    var scrollXLoad = scrollX && scrollX.gt && scrollX.gt < tableFullColumn.length;
    Object.assign(columnStore, {
      leftList: leftList,
      centerList: centerList,
      rightList: rightList
    });

    if (isGroup && (isColspan || leftStartIndex || rightEndIndex !== null && rightEndIndex !== visibleColumn.length)) {
      _tools.UtilTools.error('vxe.error.groupFixed');
    }

    if (scrollXLoad) {
      if (this.resizable || visibleColumn.some(function (column) {
        return column.resizable;
      })) {
        _tools.UtilTools.warn('vxe.error.notResizable');
      }

      Object.assign(scrollXStore, {
        startIndex: 0,
        visibleIndex: 0,
        renderSize: _xeUtils.default.toNumber(scrollX.rSize),
        offsetSize: _xeUtils.default.toNumber(scrollX.oSize)
      });
      visibleColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
    }

    this.scrollXLoad = scrollXLoad;
    this.tableColumn = visibleColumn;
    return this.$nextTick().then(function () {
      _this11.updateFooter();

      _this11.recalculate(true);
    });
  },

  /**
   * 指定列宽的列进行拆分
   */
  analyColumnWidth: function analyColumnWidth() {
    var columnWidth = this.columnWidth,
        columnMinWidth = this.columnMinWidth;
    var resizeList = [];
    var pxList = [];
    var pxMinList = [];
    var scaleList = [];
    var scaleMinList = [];
    var autoList = [];
    this.tableFullColumn.forEach(function (column) {
      if (columnWidth && !column.width) {
        column.width = columnWidth;
      }

      if (columnMinWidth && !column.minWidth) {
        column.minWidth = columnMinWidth;
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
   * 计算单元格列宽，动态分配可用剩余空间
   * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
   */
  recalculate: function recalculate(refull) {
    var _this12 = this;

    var $refs = this.$refs;
    var tableBody = $refs.tableBody,
        tableHeader = $refs.tableHeader,
        tableFooter = $refs.tableFooter;
    var bodyElem = tableBody ? tableBody.$el : null;
    var headerElem = tableHeader ? tableHeader.$el : null;
    var footerElem = tableFooter ? tableFooter.$el : null; // DomTools.addClass($el, 'is--recalculate')

    if (bodyElem) {
      this.autoCellWidth(headerElem, bodyElem, footerElem);

      if (refull === true) {
        // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
        return this.computeScrollLoad().then(function () {
          _this12.autoCellWidth(headerElem, bodyElem, footerElem);

          _this12.computeScrollLoad(); // DomTools.removeClass($el, 'is--recalculate')

        });
      }
    } // DomTools.removeClass($el, 'is--recalculate')


    return this.computeScrollLoad();
  },
  // 列宽计算
  autoCellWidth: function autoCellWidth(headerElem, bodyElem, footerElem) {
    var meanWidth;
    var tableWidth = 0;
    var minCellWidth = 40; // 列宽最少限制 40px

    var bodyWidth = bodyElem.clientWidth;
    var remainWidth = bodyWidth;
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

    meanWidth = remainWidth / 100;
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


    autoList.forEach(function (column, index) {
      var width = Math.max(meanWidth, minCellWidth);
      column.renderWidth = width;
      tableWidth += width;

      if (fit && index === autoList.length - 1) {
        // 如果所有列足够放的情况下，修补列之间的误差
        var odiffer = bodyWidth - tableWidth;

        if (odiffer > 0) {
          column.renderWidth += odiffer;
          tableWidth = bodyWidth;
        }
      }
    });
    var tableHeight = bodyElem.offsetHeight;
    var overflowY = bodyElem.scrollHeight > bodyElem.clientHeight;
    this.scrollbarWidth = overflowY ? bodyElem.offsetWidth - bodyWidth : 0;
    this.overflowY = overflowY;
    this.tableWidth = tableWidth;
    this.tableHeight = tableHeight;
    this.parentHeight = this.getParentHeight();

    if (headerElem) {
      this.headerHeight = headerElem.offsetHeight;
    }

    if (footerElem) {
      var footerHeight = footerElem.offsetHeight;
      this.scrollbarHeight = Math.max(footerHeight - footerElem.clientHeight, 0);
      this.overflowX = tableWidth > footerElem.clientWidth;
      this.footerHeight = footerHeight;
    } else {
      this.scrollbarHeight = Math.max(tableHeight - bodyElem.clientHeight, 0);
      this.overflowX = tableWidth > bodyWidth;
    }

    if (this.overflowX) {
      this.checkScrolling();
    }
  },
  resetResizable: function resetResizable() {
    this.visibleColumn.forEach(function (column) {
      column.resizeWidth = 0;
    });

    if (this.$toolbar) {
      this.$toolbar.resetResizable();
    }

    this.analyColumnWidth();
    return this.recalculate(true);
  },
  updateStyle: function updateStyle() {
    var $refs = this.$refs,
        fullColumnIdData = this.fullColumnIdData,
        maxHeight = this.maxHeight,
        height = this.height,
        parentHeight = this.parentHeight,
        border = this.border,
        tableColumn = this.tableColumn,
        headerHeight = this.headerHeight,
        allColumnHeaderOverflow = this.showHeaderOverflow,
        showFooter = this.showFooter,
        allColumnOverflow = this.showOverflow,
        footerHeight = this.footerHeight,
        tableHeight = this.tableHeight,
        tableWidth = this.tableWidth,
        overflowY = this.overflowY,
        scrollbarHeight = this.scrollbarHeight,
        scrollbarWidth = this.scrollbarWidth,
        scrollXLoad = this.scrollXLoad,
        columnStore = this.columnStore,
        elemStore = this.elemStore,
        editStore = this.editStore,
        currentRow = this.currentRow,
        mouseConfig = this.mouseConfig;
    var containerList = ['main', 'left', 'right'];
    var customHeight = height === 'auto' ? parentHeight : _tools.DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : _xeUtils.default.toNumber(height);
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
            tableElem.style.width = tWidth === null ? tWidth : "".concat(tWidth + scrollbarWidth, "px");
          }

          var repairElem = elemStore["".concat(name, "-").concat(layout, "-repair")];

          if (repairElem) {
            repairElem.style.width = "".concat(tableWidth, "px");
          } // let listElem = elemStore[`${name}-${layout}-list`]
          // if (listElem) {
          //   XEUtils.arrayEach(listElem.querySelectorAll(`.col--gutter`), thElem => {
          //     thElem.style.width = `${scrollbarWidth}px`
          //   })
          // }

        } else if (layout === 'body') {
          var emptyBlockElem = elemStore["".concat(name, "-").concat(layout, "-emptyBlock")];

          if (wrapperElem) {
            if (customHeight > 0) {
              wrapperElem.style.height = "".concat(fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight, "px");
            } else if (maxHeight) {
              maxHeight = _tools.DomTools.isScale(maxHeight) ? Math.floor(parseInt(maxHeight) / 100 * parentHeight) : _xeUtils.default.toNumber(maxHeight);
              wrapperElem.style.maxHeight = "".concat(fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : maxHeight - headerHeight, "px");
            }
          } // 如果是固定列


          if (fixedWrapperElem) {
            var isRightFixed = fixedType === 'right';
            var _fixedColumn = columnStore["".concat(fixedType, "List")];
            wrapperElem.style.top = "".concat(headerHeight, "px");
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
            tableElem.style.width = _tWidth ? "".concat(_tWidth, "px") : _tWidth; // 兼容性处理

            if (overflowY && fixedType && (browse['-moz'] || browse['safari'])) {
              tableElem.style.paddingRight = "".concat(scrollbarWidth, "px");
            }
          }

          if (emptyBlockElem) {
            emptyBlockElem.style.width = _tWidth ? "".concat(_tWidth, "px") : _tWidth;
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
              wrapperElem.style.top = "".concat(customHeight ? customHeight - footerHeight : tableHeight + headerHeight, "px");
            }

            wrapperElem.style.marginTop = "".concat(-scrollbarHeight - 1, "px");
          }

          if (tableElem) {
            tableElem.style.width = _tWidth2 === null ? _tWidth2 : "".concat(_tWidth2 + scrollbarWidth, "px");
          } // let listElem = elemStore[`${name}-${layout}-list`]
          // if (listElem) {
          //   XEUtils.arrayEach(listElem.querySelectorAll(`.col--gutter`), thElem => {
          //     thElem.style.width = `${scrollbarWidth}px`
          //   })
          // }

        }

        var colgroupElem = elemStore["".concat(name, "-").concat(layout, "-colgroup")];

        if (colgroupElem) {
          _xeUtils.default.arrayEach(colgroupElem.children, function (colElem) {
            var colid = colElem.getAttribute('name');

            if (colid === 'col_gutter') {
              colElem.width = "".concat(scrollbarWidth || '');
            }

            if (fullColumnIdData[colid]) {
              var column = fullColumnIdData[colid].column;
              var showHeaderOverflow = column.showHeaderOverflow,
                  showOverflow = column.showOverflow,
                  renderWidth = column.renderWidth;
              var cellOverflow;
              colElem.width = "".concat(column.renderWidth || '');

              if (layout === 'header') {
                cellOverflow = _xeUtils.default.isUndefined(showHeaderOverflow) || _xeUtils.default.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
              } else {
                cellOverflow = _xeUtils.default.isUndefined(showOverflow) || _xeUtils.default.isNull(showOverflow) ? allColumnOverflow : showOverflow;
              }

              var showEllipsis = cellOverflow === 'ellipsis';
              var showTitle = cellOverflow === 'title';
              var showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
              var hasEllipsis = showTitle || showTooltip || showEllipsis;
              var listElem = elemStore["".concat(name, "-").concat(layout, "-list")];

              if (listElem && hasEllipsis) {
                _xeUtils.default.arrayEach(listElem.querySelectorAll(".".concat(column.id)), function (thElem) {
                  var cellElem = thElem.querySelector('.vxe-cell');

                  if (cellElem) {
                    cellElem.style.width = "".concat(border ? renderWidth - 1 : renderWidth, "px");
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
      this.reColSdCls();
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
        _tools.DomTools[bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft ? 'addClass' : 'removeClass'](rightContainer, 'scrolling--middle');
      }
    }
  },
  preventEvent: function preventEvent(evnt, type, args, next, end) {
    var _this13 = this;

    var evntList = _vXETable.Interceptor.get(type);

    if (!evntList.some(function (func) {
      return func(args, evnt, _this13) === false;
    })) {
      if (next) {
        next();
      }
    }

    if (end) {
      end();
    }
  },

  /**
   * 全局按下事件处理
   */
  handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
    var _this14 = this;

    var $el = this.$el,
        $refs = this.$refs,
        editStore = this.editStore,
        ctxMenuStore = this.ctxMenuStore,
        _this$editConfig = this.editConfig,
        editConfig = _this$editConfig === void 0 ? {} : _this$editConfig,
        filterStore = this.filterStore;
    var actived = editStore.actived;
    var filterWrapper = $refs.filterWrapper,
        validTip = $refs.validTip;

    if (filterWrapper) {
      if (this.getEventTargetNode(evnt, $el, 'vxe-filter-wrapper').flag) {// 如果点击了筛选按钮
      } else if (this.getEventTargetNode(evnt, filterWrapper.$el).flag) {// 如果点击筛选容器
      } else {
        this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter);
      }
    } // 如果已激活了编辑状态


    if (actived.row) {
      if (!(editConfig.autoClear === false)) {
        if (validTip && this.getEventTargetNode(evnt, validTip.$el).flag) {// 如果是激活状态，且点击了校验提示框
        } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
          // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
          this.preventEvent(evnt, 'event.clearActived', actived.args, function () {
            var isClear;
            var isReadonlyCol = !_this14.getEventTargetNode(evnt, $el, 'col--edit').flag; // row 方式

            if (editConfig.mode === 'row') {
              var rowNode = _this14.getEventTargetNode(evnt, $el, 'vxe-body--row');

              var isOtherRow = rowNode.flag ? rowNode.targetElem !== actived.args.cell.parentNode : 0;

              if (editConfig.trigger === 'manual') {
                // manual 触发，如果点击了不同行
                isClear = isOtherRow;
              } else {
                // click,dblclick 触发，如果点击了不同行的非编辑列
                isClear = isOtherRow && isReadonlyCol;
              }
            } else {
              // cell 方式，如果是非编辑列
              isClear = isReadonlyCol;
            }

            if (isClear || // 如果点击了当前表格之外
            !_this14.getEventTargetNode(evnt, $el).flag) {
              setTimeout(function () {
                return _this14.clearActived(evnt);
              });
            }
          });
        }
      }
    } // 如果配置了快捷菜单且，点击了其他地方则关闭


    if (ctxMenuStore.visible && this.$refs.ctxWrapper && !this.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
      this.closeMenu();
    }
  },

  /**
   * 窗口失焦事件处理
   */
  handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
    this.closeFilter();
    this.closeMenu();
  },

  /**
   * 全局滚动事件
   */
  handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
    this.clostTooltip();
    this.closeMenu();
  },

  /**
   * 全局键盘事件
   */
  handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
    var _this15 = this;

    this.preventEvent(evnt, 'event.keydown', {
      $table: this
    }, function () {
      var isCtxMenu = _this15.isCtxMenu,
          ctxMenuStore = _this15.ctxMenuStore,
          editStore = _this15.editStore,
          _this15$mouseConfig = _this15.mouseConfig,
          mouseConfig = _this15$mouseConfig === void 0 ? {} : _this15$mouseConfig,
          _this15$keyboardConfi = _this15.keyboardConfig,
          keyboardConfig = _this15$keyboardConfi === void 0 ? {} : _this15$keyboardConfi,
          treeConfig = _this15.treeConfig,
          highlightCurrentRow = _this15.highlightCurrentRow,
          currentRow = _this15.currentRow;
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
      var isA = keyCode === 65;
      var isC = keyCode === 67;
      var isV = keyCode === 86;
      var isX = keyCode === 88;
      var isF2 = keyCode === 113;
      var isCtrlKey = evnt.ctrlKey;
      var isShiftKey = evnt.shiftKey;
      var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
      var operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow);
      var params;

      if (isEsc) {
        // 如果按下了 Esc 键，关闭快捷菜单、筛选
        _this15.closeMenu();

        _this15.closeFilter(); // 如果是激活编辑状态，则取消编辑


        if (actived.row) {
          params = actived.args;

          _this15.clearActived(evnt); // 如果配置了选中功能，则为选中状态


          if (mouseConfig.selected) {
            _this15.$nextTick(function () {
              return _this15.handleSelected(params, evnt);
            });
          }
        }
      } else if (isSpacebar && (keyboardConfig.isArrow || keyboardConfig.isTab) && selected.row && selected.column && (selected.column.type === 'selection' || selected.column.type === 'radio')) {
        // 空格键支持选中复选列
        evnt.preventDefault();

        if (selected.column.type === 'selection') {
          _this15.handleToggleCheckRowEvent(selected.args, evnt);
        } else {
          _this15.triggerRadioRowEvent(evnt, selected.args);
        }
      } else if (isEnter && (keyboardConfig.isArrow || keyboardConfig.isTab) && (selected.row || actived.row || treeConfig && highlightCurrentRow && currentRow)) {
        // 如果是激活状态，退则出到下一行
        if (selected.row || actived.row) {
          _this15.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, isUpArrow, isRightArrow, true, evnt);
        } else if (treeConfig && highlightCurrentRow && currentRow) {
          // 如果是树形表格当前行回车移动到子节点
          var childrens = currentRow[treeConfig.children];

          if (childrens && childrens.length) {
            evnt.preventDefault();
            var targetRow = childrens[0];
            params = {
              $table: _this15,
              row: targetRow
            };

            _this15.setTreeExpansion(currentRow, true).then(function () {
              return _this15.scrollToRow(targetRow);
            }).then(function () {
              return _this15.triggerCurrentRowEvent(evnt, params);
            });
          }
        }
      } else if (operCtxMenu) {
        // 如果配置了右键菜单; 支持方向键操作、回车
        evnt.preventDefault();

        if (ctxMenuStore.showChild && _tools.UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          _this15.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children);
        } else {
          _this15.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, _this15.ctxMenuList);
        }
      } else if (isF2) {
        // 如果按下了 F2 键
        if (selected.row && selected.column) {
          evnt.preventDefault();

          _this15.handleActived(selected.args, evnt);
        }
      } else if (operArrow && keyboardConfig.isArrow) {
        // 如果按下了方向键
        if (selected.row && selected.column) {
          _this15.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt);
        } else if ((isUpArrow || isDwArrow) && highlightCurrentRow && currentRow) {
          // 当前行按键上下移动
          _this15.moveCurrentRow(isUpArrow, isDwArrow, evnt);
        }
      } else if (isTab && keyboardConfig.isTab) {
        // 如果按下了 Tab 键切换
        if (selected.row || selected.column) {
          _this15.moveTabSelected(selected.args, isShiftKey, evnt);
        } else if (actived.row || actived.column) {
          _this15.moveTabSelected(actived.args, isShiftKey, evnt);
        }
      } else if (isDel || (treeConfig && highlightCurrentRow && currentRow ? isBack && keyboardConfig.isArrow : isBack)) {
        // 如果是删除键
        if (keyboardConfig.isDel && (selected.row || selected.column)) {
          _tools.UtilTools.setCellValue(selected.row, selected.column, null);

          if (isBack) {
            _this15.handleActived(selected.args, evnt);
          }
        } else if (isBack && keyboardConfig.isArrow && treeConfig && highlightCurrentRow && currentRow) {
          // 如果树形表格回退键关闭当前行返回父节点
          var _XEUtils$findTree = _xeUtils.default.findTree(_this15.afterFullData, function (item) {
            return item === currentRow;
          }, treeConfig),
              parentRow = _XEUtils$findTree.parent;

          if (parentRow) {
            evnt.preventDefault();
            params = {
              $table: _this15,
              row: parentRow
            };

            _this15.setTreeExpansion(parentRow, false).then(function () {
              return _this15.scrollToRow(parentRow);
            }).then(function () {
              return _this15.triggerCurrentRowEvent(evnt, params);
            });
          }
        }
      } else if (keyboardConfig.isCut && isCtrlKey && (isA || isX || isC || isV)) {
        // 如果开启复制功能
        if (isA) {
          _this15.handleAllChecked(evnt);
        } else if (isX || isC) {
          _this15.handleCopyed(isX, evnt);
        } else {
          _this15.handlePaste(evnt);
        }
      } else if (keyboardConfig.isEdit && !isCtrlKey && (keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222 || keyCode === 32)) {
        // 如果是按下非功能键之外允许直接编辑
        if (selected.column && selected.row && selected.column.editRender) {
          if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
            _tools.UtilTools.setCellValue(selected.row, selected.column, null);

            _this15.handleActived(selected.args, evnt);
          }
        }
      }
    });
  },
  handleGlobalResizeEvent: function handleGlobalResizeEvent() {
    this.recalculate();
  },

  /**
   * 触发表头 tooltip 事件
   */
  triggerHeaderTooltipEvent: function triggerHeaderTooltipEvent(evnt, params) {
    var tooltipStore = this.tooltipStore;
    var column = params.column;

    if (tooltipStore.column !== column || !tooltipStore.visible) {
      // 在 v3.0 中废弃 label
      this.handleTooltip(evnt, column);
    }
  },

  /**
   * 触发表尾 tooltip 事件
   */
  triggerFooterTooltipEvent: function triggerFooterTooltipEvent(evnt, params) {
    var column = params.column;
    var tooltipStore = this.tooltipStore;

    if (tooltipStore.column !== column || !tooltipStore.visible) {
      this.handleTooltip(evnt, column);
    }
  },

  /**
   * 触发 tooltip 事件
   */
  triggerTooltipEvent: function triggerTooltipEvent(evnt, params) {
    var editConfig = this.editConfig,
        editStore = this.editStore,
        tooltipStore = this.tooltipStore;
    var actived = editStore.actived;
    var row = params.row,
        column = params.column;

    if (editConfig) {
      if (editConfig.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {
        return;
      }
    }

    if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
      this.handleTooltip(evnt, column, row);
    }
  },
  // 显示 tooltip
  handleTooltip: function handleTooltip(evnt, column, row) {
    var cell = evnt.currentTarget;
    var tooltip = this.$refs.tooltip;
    var wrapperElem = cell.children[0];
    var content = cell.innerText;

    if (content && wrapperElem.scrollWidth > wrapperElem.clientWidth) {
      Object.assign(this.tooltipStore, {
        row: row,
        column: column,
        visible: true
      });

      if (tooltip) {
        tooltip.toVisible(cell, _tools.UtilTools.formatText(content));
      }
    }

    return this.$nextTick();
  },
  // 关闭 tooltip
  clostTooltip: function clostTooltip() {
    var tooltip = this.$refs.tooltip;
    Object.assign(this.tooltipStore, {
      row: null,
      column: null,
      content: null,
      visible: false
    });

    if (tooltip) {
      tooltip.close();
    }

    return this.$nextTick();
  },

  /**
   * 处理默认勾选
   */
  handleSelectionDefChecked: function handleSelectionDefChecked() {
    var _this$selectConfig2 = this.selectConfig,
        selectConfig = _this$selectConfig2 === void 0 ? {} : _this$selectConfig2,
        fullDataRowIdData = this.fullDataRowIdData;
    var checkAll = selectConfig.checkAll,
        checkRowKeys = selectConfig.checkRowKeys;

    if (checkAll) {
      this.setAllSelection(true);
    } else if (checkRowKeys) {
      var defSelection = [];
      checkRowKeys.forEach(function (rowid) {
        if (fullDataRowIdData[rowid]) {
          defSelection.push(fullDataRowIdData[rowid].row);
        }
      });
      this.setSelection(defSelection, true);
    }
  },
  setSelection: function setSelection(rows, value) {
    var _this16 = this;

    if (rows && !_xeUtils.default.isArray(rows)) {
      rows = [rows];
    }

    rows.forEach(function (row) {
      return _this16.handleSelectRow({
        row: row
      }, !!value);
    });
    return this.$nextTick();
  },

  /**
   * 多选，行选中事件
   * value 选中true 不选false 不确定-1
   */
  handleSelectRow: function handleSelectRow(_ref3, value) {
    var row = _ref3.row;
    var selection = this.selection,
        tableFullData = this.tableFullData,
        _this$selectConfig3 = this.selectConfig,
        selectConfig = _this$selectConfig3 === void 0 ? {} : _this$selectConfig3,
        treeConfig = this.treeConfig,
        treeIndeterminates = this.treeIndeterminates;
    var property = selectConfig.checkField,
        checkStrictly = selectConfig.checkStrictly,
        checkMethod = selectConfig.checkMethod;

    if (property) {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          treeIndeterminates.push(row);

          _xeUtils.default.set(row, property, false);
        } else {
          // 更新子节点状态
          _xeUtils.default.eachTree([row], function (item, $rowIndex) {
            if (row === item || !checkMethod || checkMethod({
              row: item,
              $rowIndex: $rowIndex
            })) {
              _xeUtils.default.set(item, property, value);
            }
          }, treeConfig);

          _xeUtils.default.remove(treeIndeterminates, function (item) {
            return item === row;
          });
        } // 如果存在父节点，更新父节点状态


        var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
          return item === row;
        }, treeConfig);

        if (matchObj && matchObj.parent) {
          var parentStatus;
          var vItems = checkMethod ? matchObj.items.filter(function (item, $rowIndex) {
            return checkMethod({
              row: item,
              $rowIndex: $rowIndex
            });
          }) : matchObj.items;
          var indeterminatesItem = matchObj.items.find(function (item) {
            return treeIndeterminates.indexOf(item) > -1;
          });

          if (indeterminatesItem) {
            parentStatus = -1;
          } else {
            var selectItems = matchObj.items.filter(function (item) {
              return _xeUtils.default.get(item, property);
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
        _xeUtils.default.set(row, property, value);
      }
    } else {
      if (treeConfig && !checkStrictly) {
        if (value === -1) {
          treeIndeterminates.push(row);

          _xeUtils.default.remove(selection, function (item) {
            return item === row;
          });
        } else {
          // 更新子节点状态
          _xeUtils.default.eachTree([row], function (item, $rowIndex) {
            if (row === item || !checkMethod || checkMethod({
              row: item,
              $rowIndex: $rowIndex
            })) {
              if (value) {
                selection.push(item);
              } else {
                _xeUtils.default.remove(selection, function (select) {
                  return select === item;
                });
              }
            }
          }, treeConfig);

          _xeUtils.default.remove(treeIndeterminates, function (item) {
            return item === row;
          });
        } // 如果存在父节点，更新父节点状态


        var _matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
          return item === row;
        }, treeConfig);

        if (_matchObj && _matchObj.parent) {
          var _parentStatus;

          var _vItems = checkMethod ? _matchObj.items.filter(function (item, $rowIndex) {
            return checkMethod({
              row: item,
              $rowIndex: $rowIndex
            });
          }) : _matchObj.items;

          var _indeterminatesItem = _matchObj.items.find(function (item) {
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
        if (value) {
          if (selection.indexOf(row) === -1) {
            selection.push(row);
          }
        } else {
          _xeUtils.default.remove(selection, function (item) {
            return item === row;
          });
        }
      }
    }

    this.checkSelectionStatus();
  },
  handleToggleCheckRowEvent: function handleToggleCheckRowEvent(params, evnt) {
    var _this$selectConfig4 = this.selectConfig,
        selectConfig = _this$selectConfig4 === void 0 ? {} : _this$selectConfig4,
        selection = this.selection;
    var property = selectConfig.checkField;
    var row = params.row;
    var value = property ? !_xeUtils.default.get(row, property) : selection.indexOf(row) === -1;

    if (evnt) {
      this.triggerCheckRowEvent(evnt, params, value);
    } else {
      this.handleSelectRow(params, value);
    }
  },
  triggerCheckRowEvent: function triggerCheckRowEvent(evnt, params, value) {
    var _this$selectConfig5 = this.selectConfig,
        selectConfig = _this$selectConfig5 === void 0 ? {} : _this$selectConfig5;
    var checkMethod = selectConfig.checkMethod;

    if (!checkMethod || checkMethod(params)) {
      this.handleSelectRow(params, value);

      _tools.UtilTools.emitEvent(this, 'select-change', [Object.assign({
        selection: this.getSelectRecords(),
        checked: value,
        $table: this
      }, params), evnt]);
    }
  },

  /**
   * 多选，切换某一行的选中状态
   */
  toggleRowSelection: function toggleRowSelection(row) {
    this.handleToggleCheckRowEvent({
      row: row
    });
    return this.$nextTick();
  },
  setAllSelection: function setAllSelection(value) {
    var tableFullData = this.tableFullData,
        editStore = this.editStore,
        _this$selectConfig6 = this.selectConfig,
        selectConfig = _this$selectConfig6 === void 0 ? {} : _this$selectConfig6,
        treeConfig = this.treeConfig,
        selection = this.selection;
    var property = selectConfig.checkField,
        reserve = selectConfig.reserve,
        checkStrictly = selectConfig.checkStrictly,
        checkMethod = selectConfig.checkMethod;
    var insertList = editStore.insertList;
    var selectRows = []; // 包含新增的数据

    if (insertList.length) {
      tableFullData = tableFullData.concat(insertList);
    }

    if (!checkStrictly) {
      if (property) {
        var indexKey = "".concat(treeConfig ? '$' : '', "rowIndex");

        var setValFn = function setValFn(row, rowIndex) {
          if (!checkMethod || checkMethod(_defineProperty({
            row: row
          }, indexKey, rowIndex))) {
            _xeUtils.default.set(row, property, value);
          }
        };

        var clearValFn = function clearValFn(row, rowIndex) {
          if (!checkMethod || (checkMethod(_defineProperty({
            row: row
          }, indexKey, rowIndex)) ? 0 : selection.indexOf(row) > -1)) {
            _xeUtils.default.set(row, property, value);
          }
        };

        if (treeConfig) {
          _xeUtils.default.eachTree(tableFullData, value ? setValFn : clearValFn, treeConfig);
        } else {
          tableFullData.forEach(value ? setValFn : clearValFn);
        }
      } else {
        if (treeConfig) {
          if (value) {
            _xeUtils.default.eachTree(tableFullData, function (row, $rowIndex) {
              if (!checkMethod || checkMethod({
                row: row,
                $rowIndex: $rowIndex
              })) {
                selectRows.push(row);
              }
            }, treeConfig);
          } else {
            if (checkMethod) {
              _xeUtils.default.eachTree(tableFullData, function (row, $rowIndex) {
                if (checkMethod({
                  row: row,
                  $rowIndex: $rowIndex
                }) ? 0 : selection.indexOf(row) > -1) {
                  selectRows.push(row);
                }
              }, treeConfig);
            }
          }
        } else {
          if (value) {
            if (checkMethod) {
              selectRows = tableFullData.filter(function (row, rowIndex) {
                return selection.indexOf(row) > -1 || checkMethod({
                  row: row,
                  rowIndex: rowIndex
                });
              });
            } else {
              selectRows = tableFullData.slice(0);
            }
          } else {
            if (checkMethod) {
              selectRows = tableFullData.filter(function (row, rowIndex) {
                return checkMethod({
                  row: row,
                  rowIndex: rowIndex
                }) ? 0 : selection.indexOf(row) > -1;
              });
            }
          }
        }
      }

      this.selection = value && reserve ? selection.concat(selectRows.filter(function (row) {
        return selection.indexOf(row) === -1;
      })) : selectRows;
    }

    this.treeIndeterminates = [];
    this.checkSelectionStatus();
  },
  checkSelectionStatus: function checkSelectionStatus() {
    var tableFullData = this.tableFullData,
        editStore = this.editStore,
        _this$selectConfig7 = this.selectConfig,
        selectConfig = _this$selectConfig7 === void 0 ? {} : _this$selectConfig7,
        selection = this.selection,
        treeIndeterminates = this.treeIndeterminates;
    var property = selectConfig.checkField,
        checkStrictly = selectConfig.checkStrictly,
        checkMethod = selectConfig.checkMethod;
    var insertList = editStore.insertList; // 包含新增的数据

    if (insertList.length) {
      tableFullData = tableFullData.concat(insertList);
    }

    if (!checkStrictly) {
      if (property) {
        this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
          return !checkMethod({
            row: row,
            rowIndex: rowIndex
          }) || _xeUtils.default.get(row, property);
        } : function (row) {
          return _xeUtils.default.get(row, property);
        });
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(function (row) {
          return _xeUtils.default.get(row, property) || treeIndeterminates.indexOf(row) > -1;
        });
      } else {
        this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
          return !checkMethod({
            row: row,
            rowIndex: rowIndex
          }) || selection.indexOf(row) > -1;
        } : function (row) {
          return selection.indexOf(row) > -1;
        });
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(function (row) {
          return treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1;
        });
      }
    }
  },
  // 保留选中状态
  reserveCheckSelection: function reserveCheckSelection() {
    var _this$selectConfig8 = this.selectConfig,
        selectConfig = _this$selectConfig8 === void 0 ? {} : _this$selectConfig8,
        selection = this.selection,
        fullDataRowIdData = this.fullDataRowIdData;
    var reserve = selectConfig.reserve;

    var rowkey = _tools.UtilTools.getRowkey(this);

    if (reserve && selection.length) {
      this.selection = selection.map(function (row) {
        var rowid = '' + _xeUtils.default.get(row, rowkey);

        return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : row;
      });
    }
  },

  /**
   * 多选，选中所有事件
   */
  triggerCheckAllEvent: function triggerCheckAllEvent(evnt, value) {
    this.setAllSelection(value);

    _tools.UtilTools.emitEvent(this, 'select-all', [{
      selection: this.getSelectRecords(),
      checked: value,
      $table: this
    }, evnt]);
  },

  /**
   * 多选，切换所有行的选中状态
   */
  toggleAllSelection: function toggleAllSelection() {
    this.triggerCheckAllEvent(null, !this.isAllSelected);
    return this.$nextTick();
  },
  clearSelection: function clearSelection() {
    var tableFullData = this.tableFullData,
        _this$selectConfig9 = this.selectConfig,
        selectConfig = _this$selectConfig9 === void 0 ? {} : _this$selectConfig9,
        treeConfig = this.treeConfig;
    var property = selectConfig.checkField;

    if (property) {
      if (treeConfig) {
        _xeUtils.default.eachTree(tableFullData, function (item) {
          return _xeUtils.default.set(item, property, false);
        }, treeConfig);
      } else {
        tableFullData.forEach(function (item) {
          return _xeUtils.default.set(item, property, false);
        });
      }
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
  handleRadioDefChecked: function handleRadioDefChecked() {
    var _this$radioConfig = this.radioConfig,
        radioConfig = _this$radioConfig === void 0 ? {} : _this$radioConfig,
        fullDataRowIdData = this.fullDataRowIdData;
    var rowid = radioConfig.checkRowKey;

    if (rowid && fullDataRowIdData[rowid]) {
      this.setRadioRow(fullDataRowIdData[rowid].row);
    }
  },

  /**
   * 单选，行选中事件
   */
  triggerRadioRowEvent: function triggerRadioRowEvent(evnt, params) {
    var _this$radioConfig2 = this.radioConfig,
        radioConfig = _this$radioConfig2 === void 0 ? {} : _this$radioConfig2;
    var checkMethod = radioConfig.checkMethod;

    if (!checkMethod || checkMethod(params)) {
      var isChange = this.selectRow !== params.row;
      this.setRadioRow(params.row);

      if (isChange) {
        _tools.UtilTools.emitEvent(this, 'radio-change', [params, evnt]);
      }
    }
  },
  triggerCurrentRowEvent: function triggerCurrentRowEvent(evnt, params) {
    var isChange = this.currentRow !== params.row;
    this.setCurrentRow(params.row);

    if (isChange) {
      _tools.UtilTools.emitEvent(this, 'current-change', [params, evnt]);
    }
  },

  /**
   * 高亮行，设置某一行为高亮状态，如果调不加参数，则会取消目前高亮行的选中状态
   */
  setCurrentRow: function setCurrentRow(row) {
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.currentRow = row;

    if (this.highlightCurrentRow) {
      _xeUtils.default.arrayEach(this.$el.querySelectorAll("[data-rowid=\"".concat(_tools.UtilTools.getRowid(this, row), "\"]")), function (elem) {
        return _tools.DomTools.addClass(elem, 'row--current');
      });
    }

    return this.$nextTick();
  },
  setRadioRow: function setRadioRow(row) {
    if (this.selectRow !== row) {
      this.clearRadioRow();
    }

    this.selectRow = row;
    return this.$nextTick();
  },
  clearCurrentRow: function clearCurrentRow() {
    this.currentRow = null;
    this.hoverRow = null;

    _xeUtils.default.arrayEach(this.$el.querySelectorAll('.row--current'), function (elem) {
      return _tools.DomTools.removeClass(elem, 'row--current');
    });

    return this.$nextTick();
  },
  clearRadioRow: function clearRadioRow() {
    this.selectRow = null;
    return this.$nextTick();
  },
  getCurrentRow: function getCurrentRow() {
    return this.currentRow;
  },
  getRadioRow: function getRadioRow() {
    return this.selectRow;
  },

  /**
   * 行 hover 事件
   */
  triggerHoverEvent: function triggerHoverEvent(evnt, _ref4) {
    var row = _ref4.row;
    this.setHoverRow(row);
  },
  setHoverRow: function setHoverRow(row) {
    var rowid = _tools.UtilTools.getRowid(this, row);

    this.clearHoverRow();

    _xeUtils.default.arrayEach(this.$el.querySelectorAll("[data-rowid=\"".concat(rowid, "\"]")), function (elem) {
      return _tools.DomTools.addClass(elem, 'row--hover');
    });

    this.hoverRow = row;
  },
  clearHoverRow: function clearHoverRow() {
    _xeUtils.default.arrayEach(this.$el.querySelectorAll('.vxe-body--row.row--hover'), function (elem) {
      return _tools.DomTools.removeClass(elem, 'row--hover');
    });

    this.hoverRow = null;
  },
  triggerHeaderCellClickEvent: function triggerHeaderCellClickEvent(evnt, params) {
    var _lastResizeTime = this._lastResizeTime,
        sortOpts = this.sortOpts;
    var column = params.column,
        cell = params.cell;

    var triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300;

    var triggerSort = this.getEventTargetNode(evnt, cell, 'vxe-sort-wrapper').flag;
    var triggerFilter = this.getEventTargetNode(evnt, cell, 'vxe-filter-wrapper').flag;

    if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
      this.triggerSortEvent(evnt, column, column.order === 'desc' ? 'asc' : 'desc');
    }

    _tools.UtilTools.emitEvent(this, 'header-cell-click', [Object.assign({
      triggerResizable: triggerResizable,
      triggerSort: triggerSort,
      triggerFilter: triggerFilter
    }, params), evnt]);

    if (this.highlightCurrentColumn) {
      return this.setCurrentColumn(column, true);
    }

    return this.$nextTick();
  },
  setCurrentColumn: function setCurrentColumn(column) {
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.currentColumn = column;

    _xeUtils.default.arrayEach(this.$el.querySelectorAll(".".concat(column.id)), function (elem) {
      return _tools.DomTools.addClass(elem, 'col--current');
    });

    return this.$nextTick();
  },
  clearCurrentColumn: function clearCurrentColumn() {
    this.currentColumn = null;

    _xeUtils.default.arrayEach(this.$el.querySelectorAll('.col--current'), function (elem) {
      return _tools.DomTools.removeClass(elem, 'col--current');
    });

    return this.$nextTick();
  },

  /**
   * 当单元格发生改变时
   * 如果存在规则，则校验
   */
  handleChangeCell: function handleChangeCell(evnt, params) {
    var _this17 = this;

    this.triggerValidate('blur').catch(function (e) {
      return e;
    }).then(function () {
      _this17.handleActived(params, evnt).then(function () {
        return _this17.triggerValidate('change');
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
    var $el = this.$el,
        highlightCurrentRow = this.highlightCurrentRow,
        editStore = this.editStore,
        _this$radioConfig3 = this.radioConfig,
        radioConfig = _this$radioConfig3 === void 0 ? {} : _this$radioConfig3,
        _this$selectConfig10 = this.selectConfig,
        selectConfig = _this$selectConfig10 === void 0 ? {} : _this$selectConfig10,
        _this$expandConfig = this.expandConfig,
        expandConfig = _this$expandConfig === void 0 ? {} : _this$expandConfig,
        _this$treeConfig = this.treeConfig,
        treeConfig = _this$treeConfig === void 0 ? {} : _this$treeConfig,
        editConfig = this.editConfig,
        _this$mouseConfig = this.mouseConfig,
        mouseConfig = _this$mouseConfig === void 0 ? {} : _this$mouseConfig;
    var actived = editStore.actived;
    var row = params.row,
        column = params.column,
        cell = params.cell; // 解决 checkbox 重复触发两次问题

    if (isTargetRadioOrCheckbox(evnt, column, 'radio') || isTargetRadioOrCheckbox(evnt, column, 'selection', 'checkbox')) {
      return;
    } // 如果是展开行


    if ((expandConfig.trigger === 'row' || column.type === 'expand' && expandConfig.trigger === 'cell') && !this.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag) {
      this.triggerRowExpandEvent(evnt, params);
    } // 如果是树形表格


    if (treeConfig.trigger === 'row' || column.treeNode && treeConfig.trigger === 'cell') {
      this.triggerTreeExpandEvent(evnt, params);
    }

    if ((!column.treeNode || !this.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag) && (column.type !== 'expand' || !this.getEventTargetNode(evnt, $el, 'vxe-table--expanded').flag)) {
      // 如果是高亮行
      if (highlightCurrentRow) {
        if (radioConfig.trigger === 'row' || !this.getEventTargetNode(evnt, $el, 'vxe-checkbox').flag && !this.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
          this.triggerCurrentRowEvent(evnt, params);
        }
      } // 如果是单选


      if ((radioConfig.trigger === 'row' || column.type === 'radio' && radioConfig.trigger === 'cell') && !this.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
        this.triggerRadioRowEvent(evnt, params);
      } // 如果是多选


      if ((selectConfig.trigger === 'row' || column.type === 'selection' && selectConfig.trigger === 'cell') && !this.getEventTargetNode(evnt, params.cell, 'vxe-checkbox').flag) {
        this.handleToggleCheckRowEvent(params, evnt);
      } // 如果设置了单元格选中功能，则不会使用点击事件去处理（只能支持双击模式）


      if (!mouseConfig.checked) {
        if (editConfig) {
          if (editConfig.trigger === 'manual') {
            if (actived.args && actived.row === row && column !== actived.column) {
              this.handleChangeCell(evnt, params);
            }
          } else if (!actived.args || cell !== actived.args.cell) {
            if (editConfig.trigger === 'click') {
              this.handleChangeCell(evnt, params);
            } else if (editConfig.trigger === 'dblclick') {
              if (editConfig.mode === 'row' && actived.row === params.row) {
                this.handleChangeCell(evnt, params);
              } else {
                this.handleSelected(params, evnt);
              }
            }
          }
        }
      }
    }

    _tools.UtilTools.emitEvent(this, 'cell-click', [params, evnt]);
  },

  /**
   * 列双击点击事件
   * 如果是双击模式，则激活为编辑状态
   */
  triggerCellDBLClickEvent: function triggerCellDBLClickEvent(evnt, params) {
    var _this18 = this;

    var editStore = this.editStore,
        editConfig = this.editConfig;
    var actived = editStore.actived;

    if (editConfig && editConfig.trigger === 'dblclick') {
      if (!actived.args || evnt.currentTarget !== actived.args.cell) {
        if (editConfig.mode === 'row') {
          this.triggerValidate('blur').catch(function (e) {
            return e;
          }).then(function () {
            _this18.handleActived(params, evnt).then(function () {
              return _this18.triggerValidate('change');
            }).catch(function (e) {
              return e;
            });
          });
        } else if (editConfig.mode === 'cell') {
          this.handleActived(params, evnt).then(function () {
            return _this18.triggerValidate('change');
          }).catch(function (e) {
            return e;
          });
        }
      }
    }

    _tools.UtilTools.emitEvent(this, 'cell-dblclick', [params, evnt]);
  },

  /**
   * 点击排序事件
   */
  triggerSortEvent: function triggerSortEvent(evnt, column, order) {
    var property = column.property;

    if (column.sortable || column.remoteSort) {
      var evntParams = {
        column: column,
        property: property,
        field: property,
        prop: property,
        order: order,
        $table: this
      };

      if (column.order === order) {
        evntParams.order = null;
        this.clearSort(column.property);
      } else {
        this.sort(property, order);
      }

      _tools.UtilTools.emitEvent(this, 'sort-change', [evntParams, evnt]);
    }
  },
  sort: function sort(field, order) {
    var visibleColumn = this.visibleColumn,
        tableFullColumn = this.tableFullColumn,
        remoteSort = this.remoteSort;
    var column = visibleColumn.find(function (item) {
      return item.property === field;
    });
    var isRemote = _xeUtils.default.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort;

    if (column.sortable || column.remoteSort) {
      if (!order) {
        order = column.order === 'desc' ? 'asc' : 'desc';
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

    return this.$nextTick();
  },
  clearSort: function clearSort() {
    this.tableFullColumn.forEach(function (column) {
      column.order = null;
    });
    return this.handleTableData(true);
  },
  // 关闭筛选
  closeFilter: function closeFilter(evnt) {
    Object.assign(this.filterStore, {
      isAllSelected: false,
      isIndeterminate: false,
      options: [],
      visible: false
    });
    return this.$nextTick();
  },

  /**
   * 展开行事件
   */
  triggerRowExpandEvent: function triggerRowExpandEvent(evnt, _ref5) {
    var row = _ref5.row;
    var rest = this.toggleRowExpansion(row);

    _tools.UtilTools.emitEvent(this, 'toggle-expand-change', [{
      row: row,
      rowIndex: this.getRowIndex(row),
      $table: this
    }, evnt]);

    return rest;
  },

  /**
   * 切换展开行
   */
  toggleRowExpansion: function toggleRowExpansion(row) {
    return this.setRowExpansion(row);
  },

  /**
   * 处理默认展开行
   */
  handleDefaultRowExpand: function handleDefaultRowExpand() {
    var _this$expandConfig2 = this.expandConfig,
        expandConfig = _this$expandConfig2 === void 0 ? {} : _this$expandConfig2,
        tableFullData = this.tableFullData,
        fullDataRowIdData = this.fullDataRowIdData;
    var expandAll = expandConfig.expandAll,
        expandRowKeys = expandConfig.expandRowKeys;

    if (expandAll) {
      this.expandeds = tableFullData.slice(0);
    } else if (expandRowKeys) {
      var defExpandeds = [];
      expandRowKeys.forEach(function (rowid) {
        if (fullDataRowIdData[rowid]) {
          defExpandeds.push(fullDataRowIdData[rowid].row);
        }
      });
      this.expandeds = defExpandeds;
    }
  },
  setAllRowExpansion: function setAllRowExpansion(expanded) {
    this.expandeds = expanded ? this.tableFullData.slice(0) : [];
    return this.$nextTick().then(this.recalculate);
  },

  /**
   * 设置展开行，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   */
  setRowExpansion: function setRowExpansion(rows, expanded) {
    var expandeds = this.expandeds,
        _this$expandConfig3 = this.expandConfig,
        expandConfig = _this$expandConfig3 === void 0 ? {} : _this$expandConfig3;
    var isToggle = arguments.length === 1;

    if (rows) {
      if (!_xeUtils.default.isArray(rows)) {
        rows = [rows];
      }

      if (expandConfig.accordion) {
        // 只能同时展开一个
        expandeds.length = 0;
        rows = rows.slice(rows.length - 1, rows.length);
      }

      rows.forEach(function (row) {
        var index = expandeds.indexOf(row);

        if (index > -1) {
          if (isToggle || !expanded) {
            expandeds.splice(index, 1);
          }
        } else {
          if (isToggle || expanded) {
            expandeds.push(row);
          }
        }
      });
    }

    return this.$nextTick().then(this.recalculate);
  },
  hasRowExpand: function hasRowExpand(row) {
    return this.expandeds.indexOf(row) > -1;
  },
  clearRowExpand: function clearRowExpand() {
    var _this19 = this;

    var isExists = this.expandeds.length;
    this.expandeds = [];
    return this.$nextTick().then(function () {
      return isExists ? _this19.recalculate() : 0;
    });
  },

  /**
   * 展开树节点事件
   */
  triggerTreeExpandEvent: function triggerTreeExpandEvent(evnt, _ref6) {
    var _this20 = this;

    var row = _ref6.row;
    var rest = this.toggleTreeExpansion(row);

    _tools.UtilTools.emitEvent(this, 'toggle-tree-change', [{
      row: row,
      rowIndex: this.getRowIndex(row),
      $table: this
    }, evnt]);

    this.$nextTick(function () {
      var currentRow = _this20.currentRow,
          currentColumn = _this20.currentColumn;

      if (currentRow) {
        _this20.setCurrentRow(currentRow);
      } else if (currentColumn) {
        _this20.setCurrentColumn(currentColumn);
      }
    });
    return rest;
  },

  /**
   * 切换/展开树节点
   */
  toggleTreeExpansion: function toggleTreeExpansion(row) {
    return this.setTreeExpansion(row);
  },

  /**
   * 处理默认展开树节点
   */
  handleDefaultTreeExpand: function handleDefaultTreeExpand() {
    var treeConfig = this.treeConfig,
        tableFullData = this.tableFullData;

    if (treeConfig) {
      var expandAll = treeConfig.expandAll,
          expandRowKeys = treeConfig.expandRowKeys;
      var children = treeConfig.children;
      var treeExpandeds = [];

      if (expandAll) {
        _xeUtils.default.filterTree(tableFullData, function (row) {
          var rowChildren = row[children];

          if (rowChildren && rowChildren.length) {
            treeExpandeds.push(row);
          }
        }, treeConfig);

        this.treeExpandeds = treeExpandeds;
      } else if (expandRowKeys) {
        var rowkey = _tools.UtilTools.getRowkey(this);

        expandRowKeys.forEach(function (rowid) {
          var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
            return rowid === _xeUtils.default.get(item, rowkey);
          }, treeConfig);

          var rowChildren = matchObj ? matchObj.item[children] : 0;

          if (rowChildren && rowChildren.length) {
            treeExpandeds.push(matchObj.item);
          }
        });
        this.treeExpandeds = treeExpandeds;
      }
    }
  },
  setAllTreeExpansion: function setAllTreeExpansion(expanded) {
    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig;
    var children = treeConfig.children;
    var treeExpandeds = [];

    if (expanded) {
      _xeUtils.default.eachTree(tableFullData, function (row) {
        var rowChildren = row[children];

        if (rowChildren && rowChildren.length) {
          treeExpandeds.push(row);
        }
      }, treeConfig);
    }

    this.treeExpandeds = treeExpandeds;
    return this.$nextTick().then(this.recalculate);
  },

  /**
   * 设置展开树形节点，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   */
  setTreeExpansion: function setTreeExpansion(rows, expanded) {
    var tableFullData = this.tableFullData,
        treeExpandeds = this.treeExpandeds,
        treeConfig = this.treeConfig;
    var children = treeConfig.children;
    var isToggle = arguments.length === 1;

    if (rows) {
      if (!_xeUtils.default.isArray(rows)) {
        rows = [rows];
      }

      if (treeConfig.accordion) {
        rows = rows.slice(rows.length - 1, rows.length);
      }

      rows.forEach(function (row) {
        var rowChildren = row[children];

        if (rowChildren && rowChildren.length) {
          var index = treeExpandeds.indexOf(row);

          if (treeConfig.accordion) {
            // 同一级只能展开一个
            var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
              return item === row;
            }, treeConfig);

            _xeUtils.default.remove(treeExpandeds, function (item) {
              return matchObj.items.indexOf(item) > -1;
            });
          }

          if (index > -1) {
            if (isToggle || !expanded) {
              treeExpandeds.splice(index, 1);
            }
          } else {
            if (isToggle || expanded) {
              treeExpandeds.push(row);
            }
          }
        }
      });
    }

    return this.$nextTick().then(this.recalculate);
  },
  hasTreeExpand: function hasTreeExpand(row) {
    return this.treeExpandeds.indexOf(row) > -1;
  },
  clearTreeExpand: function clearTreeExpand() {
    var _this21 = this;

    var isExists = this.treeExpandeds.length;
    this.treeExpandeds = [];
    return this.$nextTick().then(function () {
      return isExists ? _this21.recalculate() : 0;
    });
  },

  /**
   * 获取虚拟滚动状态
   */
  getVirtualScroller: function getVirtualScroller() {
    var $refs = this.$refs,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad;
    var bodyElem = $refs.tableBody.$el;
    return {
      scrollX: scrollXLoad,
      scrollY: scrollYLoad,
      scrollTop: bodyElem.scrollTop,
      scrollLeft: bodyElem.scrollLeft
    };
  },

  /**
   * 横向 X 可视渲染事件处理
   */
  triggerScrollXEvent: function triggerScrollXEvent(evnt) {
    var $refs = this.$refs,
        visibleColumn = this.visibleColumn,
        scrollXStore = this.scrollXStore;
    var startIndex = scrollXStore.startIndex,
        renderSize = scrollXStore.renderSize,
        offsetSize = scrollXStore.offsetSize,
        visibleSize = scrollXStore.visibleSize;
    var scrollBodyElem = $refs.tableBody.$el;
    var scrollLeft = scrollBodyElem.scrollLeft;
    var toVisibleIndex = 0;
    var width = 0;
    var preload = false;

    for (var index = 0; index < visibleColumn.length; index++) {
      width += visibleColumn[index].renderWidth;

      if (scrollLeft < width) {
        toVisibleIndex = index;
        break;
      }
    }

    if (scrollXStore.visibleIndex !== toVisibleIndex) {
      var marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize);

      if (scrollXStore.visibleIndex > toVisibleIndex) {
        // 向左
        preload = toVisibleIndex - offsetSize <= startIndex;

        if (preload) {
          scrollXStore.startIndex = Math.max(0, toVisibleIndex - Math.max(marginSize, renderSize - visibleSize));
        }
      } else {
        // 向右
        preload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;

        if (preload) {
          scrollXStore.startIndex = Math.max(0, Math.min(visibleColumn.length - renderSize, toVisibleIndex - marginSize));
        }
      }

      if (preload) {
        this.updateScrollXData();
      }

      scrollXStore.visibleIndex = toVisibleIndex;
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
  debounceScrollY: _xeUtils.default.debounce(function (evnt) {
    this.loadScrollYData(evnt);
  }, debounceScrollYDuration, {
    leading: false,
    trailing: true
  }),

  /**
   * 纵向 Y 可视渲染处理
   */
  loadScrollYData: function loadScrollYData(evnt) {
    var afterFullData = this.afterFullData,
        scrollYStore = this.scrollYStore;
    var startIndex = scrollYStore.startIndex,
        renderSize = scrollYStore.renderSize,
        offsetSize = scrollYStore.offsetSize,
        visibleSize = scrollYStore.visibleSize,
        rowHeight = scrollYStore.rowHeight;
    var scrollBodyElem = evnt.target;
    var scrollTop = scrollBodyElem.scrollTop;
    var toVisibleIndex = Math.ceil(scrollTop / rowHeight);
    var preload = false;

    if (scrollYStore.visibleIndex !== toVisibleIndex) {
      var marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize);

      if (scrollYStore.visibleIndex > toVisibleIndex) {
        // 向上
        preload = toVisibleIndex - offsetSize <= startIndex;

        if (preload) {
          scrollYStore.startIndex = Math.max(0, toVisibleIndex - Math.max(marginSize, renderSize - visibleSize));
        }
      } else {
        // 向下
        preload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;

        if (preload) {
          scrollYStore.startIndex = Math.max(0, Math.min(afterFullData.length - renderSize, toVisibleIndex - marginSize));
        }
      }

      if (preload) {
        this.updateScrollYData();
      }

      scrollYStore.visibleIndex = toVisibleIndex;
    }
  },
  // 计算可视渲染相关数据
  computeScrollLoad: function computeScrollLoad() {
    var _this22 = this;

    return this.$nextTick().then(function () {
      var vSize = _this22.vSize,
          scrollXLoad = _this22.scrollXLoad,
          scrollYLoad = _this22.scrollYLoad,
          scrollYStore = _this22.scrollYStore,
          scrollXStore = _this22.scrollXStore,
          visibleColumn = _this22.visibleColumn,
          optimizeOpts = _this22.optimizeOpts;
      var scrollX = optimizeOpts.scrollX,
          scrollY = optimizeOpts.scrollY;
      var tableBody = _this22.$refs.tableBody;
      var tableBodyElem = tableBody ? tableBody.$el : null;
      var tableHeader = _this22.$refs.tableHeader;

      if (tableBodyElem) {
        // 计算 X 逻辑
        if (scrollXLoad) {
          var firstColumn = visibleColumn[0];
          var cWidth = firstColumn ? firstColumn.renderWidth : 40;

          var visibleXSize = _xeUtils.default.toNumber(scrollX.vSize || Math.ceil(tableBodyElem.clientWidth / cWidth));

          scrollXStore.visibleSize = visibleXSize; // 自动优化

          if (!scrollX.oSize) {
            scrollXStore.offsetSize = visibleXSize;
          }

          if (!scrollX.rSize) {
            scrollXStore.renderSize = visibleXSize + 2;
          }

          _this22.updateScrollXData();
        } else {
          _this22.updateScrollXSpace();
        } // 计算 Y 逻辑


        if (scrollYLoad) {
          var rHeight;

          if (scrollY.rHeight) {
            rHeight = scrollY.rHeight;
          } else {
            var firstTrElem = tableBodyElem.querySelector('tbody>tr');

            if (!firstTrElem && tableHeader) {
              firstTrElem = tableHeader.$el.querySelector('thead>tr');
            }

            if (firstTrElem) {
              rHeight = firstTrElem.clientHeight;
            }
          } // 默认的行高


          if (!rHeight) {
            switch (vSize) {
              case 'medium':
                rHeight = 44;
                break;

              case 'small':
                rHeight = 40;
                break;

              case 'mini':
                rHeight = 36;
                break;

              default:
                rHeight = 48;
                break;
            }
          }

          var visibleYSize = _xeUtils.default.toNumber(scrollY.vSize || Math.ceil(tableBodyElem.clientHeight / rHeight));

          scrollYStore.visibleSize = visibleYSize;
          scrollYStore.rowHeight = rHeight; // 自动优化

          if (!scrollY.oSize) {
            scrollYStore.offsetSize = visibleYSize;
          }

          if (!scrollY.rSize) {
            scrollYStore.renderSize = browse.firefox ? visibleYSize * 6 : browse.edge ? visibleYSize * 10 : isWebkit ? visibleYSize + 2 : visibleYSize * 6;
          }

          _this22.updateScrollYData();
        } else {
          _this22.updateScrollYSpace();
        }
      }

      _this22.$nextTick(_this22.updateStyle);
    });
  },
  updateScrollXData: function updateScrollXData() {
    var visibleColumn = this.visibleColumn,
        scrollXStore = this.scrollXStore;
    this.tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
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
    var headerElem = tableHeader ? tableHeader.$el.querySelector('.vxe-table--header') : null;
    var bodyElem = tableBody.$el.querySelector('.vxe-table--body');
    var footerElem = tableFooter ? tableFooter.$el.querySelector('.vxe-table--footer') : null;
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
    var bodyHeight = afterFullData.length * scrollYStore.rowHeight;
    var topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0);
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
  scrollTo: function scrollTo(scrollLeft, scrollTop) {
    var _this23 = this;

    var bodyElem = this.$refs.tableBody.$el;

    if (_xeUtils.default.isNumber(scrollLeft)) {
      var tableFooter = this.$refs.tableFooter;

      if (tableFooter) {
        tableFooter.$el.scrollLeft = scrollLeft;
      } else {
        bodyElem.scrollLeft = scrollLeft;
      }
    }

    if (_xeUtils.default.isNumber(scrollTop)) {
      var rightBody = this.$refs.rightBody;

      if (rightBody) {
        rightBody.$el.scrollTop = scrollTop;
      }

      bodyElem.scrollTop = scrollTop;
    }

    if (this.scrollXLoad || this.scrollYLoad) {
      return new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve(_this23.$nextTick());
        }, 50);
      });
    }

    return this.$nextTick();
  },
  scrollToRow: function scrollToRow(row, column) {
    var rest = [];

    if (row && this.fullAllDataRowMap.has(row)) {
      rest.push(_tools.DomTools.rowToVisible(this, row));
    }

    rest.push(this.scrollToColumn(column));
    return Promise.all(rest);
  },
  scrollToColumn: function scrollToColumn(column) {
    if (column && this.fullColumnMap.has(column)) {
      return _tools.DomTools.colToVisible(this, column);
    }

    return this.$nextTick();
  },
  scrollToTreeRow: function scrollToTreeRow(row) {
    var _this24 = this;

    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig;

    if (treeConfig) {
      var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
        return item === row;
      }, treeConfig);

      if (matchObj) {
        var nodes = matchObj.nodes;
        nodes.forEach(function (row, index) {
          if (index < nodes.length - 1 && !_this24.hasTreeExpand(row)) {
            _this24.setTreeExpansion(row, true);
          }
        });
      }
    }

    return this.$nextTick();
  },
  clearScroll: function clearScroll() {
    var _this25 = this;

    this.lastScrollLeft = 0;
    this.lastScrollTop = 0;
    Object.assign(this.scrollXStore, {
      startIndex: 0,
      visibleIndex: 0
    });
    Object.assign(this.scrollYStore, {
      startIndex: 0,
      visibleIndex: 0
    });
    this.$nextTick(function () {
      var tableBody = _this25.$refs.tableBody;
      var tableBodyElem = tableBody ? tableBody.$el : null;
      var tableFooter = _this25.$refs.tableFooter;
      var tableFooterElem = tableFooter ? tableFooter.$el : null;

      if (tableBodyElem) {
        tableBodyElem.scrollTop = 0;
        tableBodyElem.scrollLeft = 0;
      }

      if (tableFooterElem) {
        tableFooterElem.scrollLeft = 0;
      }
    });
    return this.$nextTick();
  },

  /**
   * 更新表尾合计
   */
  updateFooter: function updateFooter() {
    var showFooter = this.showFooter,
        tableColumn = this.tableColumn,
        footerMethod = this.footerMethod;

    if (showFooter && footerMethod) {
      this.footerData = tableColumn.length ? footerMethod({
        columns: tableColumn,
        data: this.afterFullData
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
    var _this26 = this;

    var customVal = !_xeUtils.default.isUndefined(cellValue);
    return this.$nextTick().then(function () {
      var $refs = _this26.$refs,
          tableData = _this26.tableData,
          editRules = _this26.editRules,
          validStore = _this26.validStore;

      if (scope && $refs.tableBody && editRules) {
        var row = scope.row,
            column = scope.column;
        var type = 'change';

        if (_this26.hasCellRules(type, row, column)) {
          var rowIndex = tableData.indexOf(row);

          var cell = _tools.DomTools.getCell(_this26, {
            row: row,
            rowIndex: rowIndex,
            column: column
          });

          if (cell) {
            return _this26.validCellRules(type, row, column, cellValue).then(function () {
              if (customVal && validStore.visible) {
                _tools.UtilTools.setCellValue(row, column, cellValue);
              }

              _this26.clearValidate();
            }).catch(function (_ref7) {
              var rule = _ref7.rule;

              if (customVal) {
                _tools.UtilTools.setCellValue(row, column, cellValue);
              }

              _this26.showValidTooltip({
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

  /*************************
   * Publish methods
   *************************/
  // 与工具栏对接
  connect: function connect(_ref8) {
    var toolbar = _ref8.toolbar;
    this.$toolbar = toolbar;
  },
  // 检查触发源是否属于目标节点
  getEventTargetNode: _tools.DomTools.getEventTargetNode
  /*************************
   * Publish methods
   *************************/
  // Module methods

};
var funcs = 'closeMenu,getMouseSelecteds,getMouseCheckeds,clearCopyed,clearChecked,clearHeaderChecked,clearIndexChecked,clearSelected,insert,insertAt,remove,removeSelecteds,revert,revertData,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearActived,getActiveRow,hasActiveRow,setActiveRow,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,exportCsv'.split(',');
funcs.forEach(function (name) {
  Methods[name] = function () {
    return this["_".concat(name)] ? this["_".concat(name)].apply(this, arguments) : null;
  };
});
var _default = Methods;
exports.default = _default;