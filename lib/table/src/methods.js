"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _cell = _interopRequireDefault(require("../../cell"));

var _vXETable = _interopRequireWildcard(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rowUniqueId = 0;
var browse = _tools.DomTools.browse;
var isWebkit = browse['-webkit'] && !browse.edge;
var debounceScrollYDuration = browse.msie ? 40 : 20; // 分组表头的属性

var headerProps = {
  children: 'children'
};
/**
 * 生成行的唯一主键
 */

function getRowUniqueId() {
  return "row_".concat(++rowUniqueId);
}

function isTargetRadioOrCheckbox(evnt, column, colType, targetType) {
  var target = evnt.target;
  return target && column.type === colType && target.tagName.toLowerCase() === 'input' && target.type === (targetType || colType);
}

var Methods = {
  /**
   * 获取父容器元素
   */
  getParentElem: function getParentElem() {
    return this.$grid ? this.$grid.$el.parentNode : this.$el.parentNode;
  },

  /**
   * 获取父容器的高度
   */
  getParentHeight: function getParentHeight() {
    return this.$grid ? this.$grid.getParentHeight() : this.getParentElem().clientHeight;
  },

  /**
   * 获取需要排除的高度
   * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
   * 如果存在表尾合计滚动条，则需要排除滚动条高度
   */
  getExcludeHeight: function getExcludeHeight() {
    return this.$grid ? this.$grid.getExcludeHeight() : 0;
  },

  /**
   * 重置表格的一切数据状态
   */
  clearAll: function clearAll() {
    this.clearSort();
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.clearSelection();
    this.clearSelectReserve();
    this.clearRowExpand();
    this.clearTreeExpand();
    this.clearActived();

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

    return this.clearScroll();
  },

  /**
   * 同步刷新 data 数据
   * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   */
  refreshData: function refreshData() {
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
    this.tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0);
    return this.$nextTick();
  },

  /**
   * 加载表格数据
   * @param {Array} datas 数据
   * @param {Boolean} notRefresh 是否不重新运算列宽
   */
  loadTableData: function loadTableData(datas, notRefresh) {
    var _this2 = this;

    var height = this.height,
        maxHeight = this.maxHeight,
        showOverflow = this.showOverflow,
        treeConfig = this.treeConfig,
        editStore = this.editStore,
        optimizeOpts = this.optimizeOpts,
        scrollYStore = this.scrollYStore;
    var scrollY = optimizeOpts.scrollY;
    var tableFullData = datas ? datas.slice(0) : [];
    var scrollYLoad = !treeConfig && scrollY && scrollY.gt && scrollY.gt < tableFullData.length;
    scrollYStore.startIndex = 0;
    scrollYStore.visibleIndex = 0;
    editStore.insertList = [];
    editStore.removeList = []; // 全量数据

    this.tableFullData = tableFullData; // 缓存数据

    this.updateCache(true); // 原始数据

    this.tableSynchData = datas;
    this.tableSourceData = _xeUtils.default.clone(tableFullData, true);
    this.scrollYLoad = scrollYLoad;

    if (scrollYLoad && !(height || maxHeight)) {
      _tools.UtilTools.error('vxe.error.scrollYReqProp', ['height | max-height']);
    }

    if (scrollYLoad && !showOverflow) {
      _tools.UtilTools.warn('vxe.error.scrollYReqProp', ['show-overflow']);
    }

    var rest = Promise.resolve();

    if (scrollYLoad) {
      rest = this.computeScrollLoad();
    }

    return rest.then(function () {
      // 是否加载了数据
      _this2.isLoadData = true;

      _this2.handleTableData(true);

      _this2.reserveCheckSelection();

      _this2.checkSelectionStatus();

      rest = _this2.$nextTick();

      if (!notRefresh) {
        rest = rest.then(_this2.recalculate);
      }

      return rest.then(_this2.refreshScroll);
    });
  },

  /**
   * 重新加载数据，不会清空表格状态
   * @param {Array} datas 数据
   */
  loadData: function loadData(datas) {
    return this.loadTableData(datas).then(this.recalculate);
  },

  /**
   * 重新加载数据，会清空表格状态
   * @param {Array} datas 数据
   */
  reloadData: function reloadData(datas) {
    var _this3 = this;

    return this.clearAll().then(function () {
      return _this3.loadTableData(datas);
    }).then(this.handleDefault);
  },

  /**
   * 局部加载行数据并恢复到初始状态
   * 对于行数据需要局部更改的场景中可能会用到
   * @param {Row} row 行对象
   * @param {Object} record 新数据
   * @param {String} field 字段名
   */
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

  /**
   * 加载列配置
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnConfig} columns 列配置
   */
  loadColumn: function loadColumn(columns) {
    var _this4 = this;

    this.collectColumn = _xeUtils.default.mapTree(columns, function (column) {
      return _cell.default.createColumn(_this4, column);
    }, headerProps);
    return this.$nextTick();
  },

  /**
   * 加载列配置并恢复到初始状态
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnConfig} columns 列配置
   */
  reloadColumn: function reloadColumn(columns) {
    this.clearAll();
    return this.loadColumn(columns);
  },

  /**
   * 更新数据行的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
  updateCache: function updateCache(source) {
    var _this5 = this;

    var treeConfig = this.treeConfig,
        tableFullData = this.tableFullData,
        fullDataRowIdData = this.fullDataRowIdData,
        fullDataRowMap = this.fullDataRowMap,
        fullAllDataRowMap = this.fullAllDataRowMap,
        fullAllDataRowIdData = this.fullAllDataRowIdData;

    var rowkey = _tools.UtilTools.getRowkey(this);

    var handleCache = function handleCache(row, index) {
      var rowid = _tools.UtilTools.getRowid(_this5, row);

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

  /**
   * 更新数据列的 Map
   * 牺牲数据组装的耗时，用来换取使用过程中的流畅
   */
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

  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param {Element} tr 元素
   */
  getRowNode: function getRowNode(tr) {
    var _this6 = this;

    if (tr) {
      var treeConfig = this.treeConfig,
          tableFullData = this.tableFullData,
          fullAllDataRowIdData = this.fullAllDataRowIdData;
      var rowid = tr.getAttribute('data-rowid');

      if (treeConfig) {
        var matchObj = _xeUtils.default.findTree(tableFullData, function (row) {
          return _tools.UtilTools.getRowid(_this6, row) === rowid;
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

  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param {Element} cell 元素
   */
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

  /**
   * 根据 row 获取相对于 data 中的索引
   * @param {Row} row 行对象
   */
  getRowIndex: function getRowIndex(row) {
    return this.fullDataRowMap.has(row) ? this.fullDataRowMap.get(row).index : -1;
  },

  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param {ColumnConfig} column 列配置
   */
  getColumnIndex: function getColumnIndex(column) {
    return this.fullColumnMap.has(column) ? this.fullColumnMap.get(column).index : -1;
  },

  /**
   * 判断是否为索引列
   * @param {ColumnConfig} column 列配置
   */
  hasIndexColumn: function hasIndexColumn(column) {
    return column && column.type === 'index';
  },

  /**
   * 定义行数据中的列属性，如果不存在则定义
   * @param {Row} row 行数据
   */
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

  /**
   * 创建 data 对象
   * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
   * @param {Array} records 新数据
   */
  createData: function createData(records) {
    var _this7 = this;

    return this.$nextTick().then(function () {
      return records.map(_this7.defineField);
    });
  },

  /**
   * 创建 Row|Rows 对象
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param {Array/Object} records 新数据
   */
  createRow: function createRow(records) {
    var _this8 = this;

    var isArr = _xeUtils.default.isArray(records);

    if (!isArr) {
      records = [records];
    }

    return this.$nextTick().then(function () {
      var rows = records.map(function (record) {
        return _this8.defineField(Object.assign({}, record));
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
   * @param {Array/Row} rows 行数据
   * @param {String} field 字段名
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

  /**
   * 检查是否为临时行数据
   * @param {Row} row 行对象
   */
  isInsertByRow: function isInsertByRow(row) {
    return this.editStore.insertList.indexOf(row) > -1;
  },
  // 在 v3.0 中废弃 hasRowChange
  hasRowChange: function hasRowChange(row, field) {
    _tools.UtilTools.warn('vxe.error.delFunc', ['hasRowChange', 'isUpdateByRow']);

    return this.isUpdateByRow(row, field);
  },

  /**
   * 检查行或列数据是否发生改变
   * @param {Row} row 行对象
   * @param {String} field 字段名
   */
  isUpdateByRow: function isUpdateByRow(row, field) {
    var _this9 = this;

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
        return rowid === _tools.UtilTools.getRowid(_this9, item);
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
    return _xeUtils.default.find(this.visibleColumn, function (column) {
      return column.property === field;
    });
  },

  /**
   * 获取当前表格的列
   * 完整的全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
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
    _tools.UtilTools.warn('vxe.error.delFunc', ['getRecords', 'getData']);

    return this.getData.apply(this, arguments);
  },

  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData: function getData(rowIndex) {
    var tableSynchData = this.data || this.tableSynchData;
    return arguments.length ? tableSynchData[rowIndex] : tableSynchData.slice(0);
  },
  // 在 v3.0 中废弃 getAllRecords
  getAllRecords: function getAllRecords() {
    _tools.UtilTools.warn('vxe.error.delFunc', ['getAllRecords', 'getRecordset']);

    return this.getRecordset();
  },

  /**
   * 用于多选行，获取已选中的数据
   */
  getSelectRecords: function getSelectRecords() {
    var tableFullData = this.tableFullData,
        editStore = this.editStore,
        treeConfig = this.treeConfig; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = this.checkboxConfig || this.selectConfig || {};
    var property = checkboxConfig.checkField;
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

    var column = _xeUtils.default.find(visibleColumn, function (column) {
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
  handleDefault: function handleDefault() {
    var _this10 = this;

    // 在 v3.0 中废弃 selectConfig
    var checkboxConfig = this.checkboxConfig || this.selectConfig;

    if (checkboxConfig) {
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
      return setTimeout(_this10.recalculate);
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
        var item = _xeUtils.default.find(customColumns, function (item) {
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

  /**
   * 手动重置列的所有操作，还原到初始状态
   * 如果已关联工具栏，则会同步更新
   */
  resetAll: function resetAll() {
    this.resetCustoms();
    this.resetResizable();
  },

  /**
   * 隐藏指定列
   * @param {ColumnConfig} column 列配置
   */
  hideColumn: function hideColumn(column) {
    return this.handleVisibleColumn(column, false);
  },

  /**
   * 显示指定列
   * @param {ColumnConfig} column 列配置
   */
  showColumn: function showColumn(column) {
    return this.handleVisibleColumn(column, true);
  },

  /**
   * 手动重置列的显示/隐藏操作，还原到初始状态
   * 如果已关联工具栏，则会同步更新
   */
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
   * 初始化加载显示/隐藏列
   * 对于异步更新的场景下可能会用到
   * @param {Array} customColumns 自定义列数组
   */
  reloadCustoms: function reloadCustoms(customColumns) {
    var _this11 = this;

    return this.$nextTick().then(function () {
      _this11.mergeCustomColumn(customColumns);

      return _this11.refreshColumn().then(function () {
        return _this11.tableFullColumn;
      });
    });
  },

  /**
   * 刷新列信息
   * 将固定的列左边、右边分别靠边
   * 如果使用了分组表头，固定列必须在左侧或者右侧
   */
  refreshColumn: function refreshColumn() {
    var _this12 = this;

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
      if (this.isGroup) {
        _tools.UtilTools.warn('vxe.error.scrollXNotGroup');
      } // if (this.resizable || visibleColumn.some(column => column.resizable)) {
      //   UtilTools.warn('vxe.error.scrollXNotResizable')
      // }


      Object.assign(scrollXStore, {
        startIndex: 0,
        visibleIndex: 0
      });
      visibleColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
    }

    this.scrollXLoad = scrollXLoad;
    this.tableColumn = visibleColumn;
    return this.$nextTick().then(function () {
      _this12.updateFooter();

      _this12.recalculate(true);
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
   * 刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）
   */
  refreshScroll: function refreshScroll() {
    var _this13 = this;

    var lastScrollLeft = this.lastScrollLeft,
        lastScrollTop = this.lastScrollTop;
    this.clearScroll();
    return this.$nextTick().then(function () {
      if (lastScrollLeft || lastScrollTop) {
        // 重置最后滚动状态
        _this13.lastScrollLeft = 0;
        _this13.lastScrollTop = 0; // 还原滚动状态

        return _this13.scrollTo(lastScrollLeft, lastScrollTop);
      }
    });
  },

  /**
   * 计算单元格列宽，动态分配可用剩余空间
   * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
   */
  recalculate: function recalculate(refull) {
    var _this14 = this;

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
          _this14.autoCellWidth(headerElem, bodyElem, footerElem);

          _this14.computeScrollLoad(); // DomTools.removeClass($el, 'is--recalculate')

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
      this.headerHeight = headerElem.offsetHeight; // 检测是否同步滚动

      if (headerElem.scrollLeft !== bodyElem.scrollLeft) {
        headerElem.scrollLeft = bodyElem.scrollLeft;
      }
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

  /**
   * 手动重置列宽拖动的操作，还原到初始状态
   * 如果已关联工具栏，则会同步更新
   */
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

  /**
   * 放弃 vue 的双向 dom 绑定，使用原生的方式更新 Dom，性能翻倍提升
   */
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
        scrollbarHeight = this.scrollbarHeight,
        scrollbarWidth = this.scrollbarWidth,
        scrollXLoad = this.scrollXLoad,
        scrollYLoad = this.scrollYLoad,
        columnStore = this.columnStore,
        elemStore = this.elemStore,
        editStore = this.editStore,
        currentRow = this.currentRow,
        mouseConfig = this.mouseConfig;
    var containerList = ['main', 'left', 'right'];
    var customHeight = 0;

    if (height) {
      customHeight = height === 'auto' ? parentHeight : (_tools.DomTools.isScale(height) ? Math.floor(parseInt(height) / 100 * parentHeight) : _xeUtils.default.toNumber(height)) - this.getExcludeHeight();

      if (showFooter) {
        customHeight += scrollbarHeight + 1;
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

            tableElem.style.paddingRight = scrollbarWidth && fixedType && (browse['-moz'] || browse['safari']) ? "".concat(scrollbarWidth, "px") : '';
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
              wrapperElem.style.top = "".concat(customHeight > 0 ? customHeight - footerHeight : tableHeight + headerHeight, "px");
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
              var listElem = elemStore["".concat(name, "-").concat(layout, "-list")]; // 滚动的渲染不支持动态行高

              if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
                hasEllipsis = true;
              }

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
    var _this15 = this;

    var evntList = _vXETable.Interceptor.get(type);

    var rest;

    if (!evntList.some(function (func) {
      return func(args, evnt, _this15) === false;
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
    var _this16 = this;

    var $el = this.$el,
        $refs = this.$refs,
        editStore = this.editStore,
        ctxMenuStore = this.ctxMenuStore,
        _this$editConfig = this.editConfig,
        editConfig = _this$editConfig === void 0 ? {} : _this$editConfig,
        filterStore = this.filterStore,
        getEventTargetNode = this.getEventTargetNode,
        getRowNode = this.getRowNode;
    var actived = editStore.actived;
    var filterWrapper = $refs.filterWrapper,
        validTip = $refs.validTip;

    if (filterWrapper) {
      if (getEventTargetNode(evnt, $el, 'vxe-filter-wrapper').flag) {// 如果点击了筛选按钮
      } else if (getEventTargetNode(evnt, filterWrapper.$el).flag) {// 如果点击筛选容器
      } else {
        this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter);
      }
    } // 如果已激活了编辑状态


    if (actived.row) {
      if (!(editConfig.autoClear === false)) {
        if (validTip && getEventTargetNode(evnt, validTip.$el).flag) {// 如果是激活状态，且点击了校验提示框
        } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
          // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
          this.preventEvent(evnt, 'event.clearActived', actived.args, function () {
            var isClear;

            if (editConfig.mode === 'row') {
              var rowNode = getEventTargetNode(evnt, $el, 'vxe-body--row'); // row 方式，如果点击了不同行

              isClear = rowNode.flag ? getRowNode(rowNode.targetElem).item !== getRowNode(actived.args.cell.parentNode).item : 0;
            } else {
              // cell 方式，如果是非编辑列
              isClear = !getEventTargetNode(evnt, $el, 'col--edit').flag;
            }

            if (isClear || // 如果点击了当前表格之外
            !getEventTargetNode(evnt, $el).flag) {
              setTimeout(function () {
                return _this16.clearActived(evnt);
              });
            }
          });
        }
      }
    } // 如果配置了快捷菜单且，点击了其他地方则关闭


    if (ctxMenuStore.visible && this.$refs.ctxWrapper && !getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
      this.closeMenu();
    } // 最后激活的表格


    this.isActivated = getEventTargetNode(evnt, this.$el).flag;
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
    var _this17 = this;

    // 该行为只对当前激活的表格有效
    if (this.isActivated) {
      this.preventEvent(evnt, 'event.keydown', {
        $table: this
      }, function () {
        var isCtxMenu = _this17.isCtxMenu,
            ctxMenuStore = _this17.ctxMenuStore,
            editStore = _this17.editStore,
            _this17$mouseConfig = _this17.mouseConfig,
            mouseConfig = _this17$mouseConfig === void 0 ? {} : _this17$mouseConfig,
            _this17$keyboardConfi = _this17.keyboardConfig,
            keyboardConfig = _this17$keyboardConfi === void 0 ? {} : _this17$keyboardConfi,
            treeConfig = _this17.treeConfig,
            highlightCurrentRow = _this17.highlightCurrentRow,
            currentRow = _this17.currentRow;
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
          _this17.closeMenu();

          _this17.closeFilter(); // 如果是激活编辑状态，则取消编辑


          if (actived.row) {
            params = actived.args;

            _this17.clearActived(evnt); // 如果配置了选中功能，则为选中状态


            if (mouseConfig.selected) {
              _this17.$nextTick(function () {
                return _this17.handleSelected(params, evnt);
              });
            }
          }
        } else if (isSpacebar && (keyboardConfig.isArrow || keyboardConfig.isTab) && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'selection' || selected.column.type === 'radio')) {
          // 在 v3.0 中废弃 type=selection
          // 空格键支持选中复选列
          evnt.preventDefault(); // 在 v3.0 中废弃 type=selection

          if (selected.column.type === 'checkbox' || selected.column.type === 'selection') {
            _this17.handleToggleCheckRowEvent(selected.args, evnt);
          } else {
            _this17.triggerRadioRowEvent(evnt, selected.args);
          }
        } else if (isEnter && (keyboardConfig.isArrow || keyboardConfig.isTab) && (selected.row || actived.row || treeConfig && highlightCurrentRow && currentRow)) {
          // 如果是激活状态，退则出到下一行
          if (selected.row || actived.row) {
            _this17.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, isUpArrow, isRightArrow, true, evnt);
          } else if (treeConfig && highlightCurrentRow && currentRow) {
            // 如果是树形表格当前行回车移动到子节点
            var childrens = currentRow[treeConfig.children];

            if (childrens && childrens.length) {
              evnt.preventDefault();
              var targetRow = childrens[0];
              params = {
                $table: _this17,
                row: targetRow
              };

              _this17.setTreeExpansion(currentRow, true).then(function () {
                return _this17.scrollToRow(targetRow);
              }).then(function () {
                return _this17.triggerCurrentRowEvent(evnt, params);
              });
            }
          }
        } else if (operCtxMenu) {
          // 如果配置了右键菜单; 支持方向键操作、回车
          evnt.preventDefault();

          if (ctxMenuStore.showChild && _tools.UtilTools.hasChildrenList(ctxMenuStore.selected)) {
            _this17.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children);
          } else {
            _this17.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, _this17.ctxMenuList);
          }
        } else if (isF2) {
          // 如果按下了 F2 键
          if (selected.row && selected.column) {
            evnt.preventDefault();

            _this17.handleActived(selected.args, evnt);
          }
        } else if (operArrow && keyboardConfig.isArrow) {
          // 如果按下了方向键
          if (selected.row && selected.column) {
            _this17.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt);
          } else if ((isUpArrow || isDwArrow) && highlightCurrentRow && currentRow) {
            // 当前行按键上下移动
            _this17.moveCurrentRow(isUpArrow, isDwArrow, evnt);
          }
        } else if (isTab && keyboardConfig.isTab) {
          // 如果按下了 Tab 键切换
          if (selected.row || selected.column) {
            _this17.moveTabSelected(selected.args, isShiftKey, evnt);
          } else if (actived.row || actived.column) {
            _this17.moveTabSelected(actived.args, isShiftKey, evnt);
          }
        } else if (isDel || (treeConfig && highlightCurrentRow && currentRow ? isBack && keyboardConfig.isArrow : isBack)) {
          // 如果是删除键
          if (keyboardConfig.isDel && (selected.row || selected.column)) {
            _tools.UtilTools.setCellValue(selected.row, selected.column, null);

            if (isBack) {
              _this17.handleActived(selected.args, evnt);
            }
          } else if (isBack && keyboardConfig.isArrow && treeConfig && highlightCurrentRow && currentRow) {
            // 如果树形表格回退键关闭当前行返回父节点
            var _XEUtils$findTree = _xeUtils.default.findTree(_this17.afterFullData, function (item) {
              return item === currentRow;
            }, treeConfig),
                parentRow = _XEUtils$findTree.parent;

            if (parentRow) {
              evnt.preventDefault();
              params = {
                $table: _this17,
                row: parentRow
              };

              _this17.setTreeExpansion(parentRow, false).then(function () {
                return _this17.scrollToRow(parentRow);
              }).then(function () {
                return _this17.triggerCurrentRowEvent(evnt, params);
              });
            }
          }
        } else if (keyboardConfig.isCut && isCtrlKey && (isA || isX || isC || isV)) {
          // 如果开启复制功能
          if (isA) {
            _this17.handleAllChecked(evnt);
          } else if (isX || isC) {
            _this17.handleCopyed(isX, evnt);
          } else {
            _this17.handlePaste(evnt);
          }
        } else if (keyboardConfig.isEdit && !isCtrlKey && (keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222 || keyCode === 32)) {
          // 如果是按下非功能键之外允许直接编辑
          if (selected.column && selected.row && selected.column.editRender) {
            if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
              _tools.UtilTools.setCellValue(selected.row, selected.column, null);

              _this17.handleActived(selected.args, evnt);
            }
          }
        }
      });
    }
  },
  handleGlobalResizeEvent: function handleGlobalResizeEvent() {
    this.recalculate();
  },
  handleTooltipLeaveEvent: function handleTooltipLeaveEvent(evnt) {
    var _this18 = this;

    var _this$tooltipConfig = this.tooltipConfig,
        tooltipConfig = _this$tooltipConfig === void 0 ? {} : _this$tooltipConfig;
    setTimeout(function () {
      if (!_this18.tooltipActive) {
        _this18.clostTooltip();
      }
    }, tooltipConfig.leaveDelay || _conf.default.tooltip.leaveDelay);
  },
  handleTargetEnterEvent: function handleTargetEnterEvent(evnt) {
    clearTimeout(this.tooltipTimeout);
    this.tooltipActive = true;
    this.clostTooltip();
  },
  handleTargetLeaveEvent: function handleTargetLeaveEvent(evnt) {
    var _this19 = this;

    var _this$tooltipConfig2 = this.tooltipConfig,
        tooltipConfig = _this$tooltipConfig2 === void 0 ? {} : _this$tooltipConfig2;
    this.tooltipActive = false;

    if (tooltipConfig.enterable) {
      this.tooltipTimeout = setTimeout(function () {
        if (!_this19.$refs.tooltip.isHover) {
          _this19.clostTooltip();
        }
      }, tooltipConfig.leaveDelay || _conf.default.tooltip.leaveDelay);
    } else {
      this.clostTooltip();
    }
  },

  /**
   * 触发表头 tooltip 事件
   */
  triggerHeaderTooltipEvent: function triggerHeaderTooltipEvent(evnt, params) {
    var tooltipStore = this.tooltipStore;
    var column = params.column;
    this.handleTargetEnterEvent();

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
    this.handleTargetEnterEvent();

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
    this.handleTargetEnterEvent();

    if (editConfig) {
      if (editConfig.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {
        return;
      }
    }

    if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
      this.handleTooltip(evnt, column, row);
    }
  },

  /**
   * 处理显示 tooltip
   * @param {Event} evnt 事件
   * @param {ColumnConfig} column 列配置
   * @param {Row} row 行对象
   */
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

  /**
   * 关闭 tooltip
   */
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
    var fullDataRowIdData = this.fullDataRowIdData; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = this.checkboxConfig || this.selectConfig || {};
    var checkAll = checkboxConfig.checkAll,
        checkRowKeys = checkboxConfig.checkRowKeys;

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

  /**
   * 用于多选行，设置行为选中状态，第二个参数为选中与否
   * @param {Array/Row} rows 行数据
   * @param {Boolean} value 是否选中
   */
  setSelection: function setSelection(rows, value) {
    var _this20 = this;

    if (rows && !_xeUtils.default.isArray(rows)) {
      rows = [rows];
    }

    rows.forEach(function (row) {
      return _this20.handleSelectRow({
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
    var _this21 = this;

    var row = _ref3.row;
    var selection = this.selection,
        tableFullData = this.tableFullData,
        treeConfig = this.treeConfig,
        treeIndeterminates = this.treeIndeterminates; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = this.checkboxConfig || this.selectConfig || {};
    var property = checkboxConfig.checkField,
        checkStrictly = checkboxConfig.checkStrictly,
        checkMethod = checkboxConfig.checkMethod;

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

              _this21.handleSelectReserveRow(row, value);
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

          var indeterminatesItem = _xeUtils.default.find(matchObj.items, function (item) {
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

        this.handleSelectReserveRow(row, value);
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

              _this21.handleSelectReserveRow(row, value);
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

          var _indeterminatesItem = _xeUtils.default.find(_matchObj.items, function (item) {
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

        this.handleSelectReserveRow(row, value);
      }
    }

    this.checkSelectionStatus();
  },
  handleToggleCheckRowEvent: function handleToggleCheckRowEvent(params, evnt) {
    var selection = this.selection; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = this.checkboxConfig || this.selectConfig || {};
    var property = checkboxConfig.checkField;
    var row = params.row;
    var value = property ? !_xeUtils.default.get(row, property) : selection.indexOf(row) === -1;

    if (evnt) {
      this.triggerCheckRowEvent(evnt, params, value);
    } else {
      this.handleSelectRow(params, value);
    }
  },
  triggerCheckRowEvent: function triggerCheckRowEvent(evnt, params, value) {
    // 在 v3.0 中废弃 selectConfig
    var checkboxConfig = this.checkboxConfig || this.selectConfig || {};
    var checkMethod = checkboxConfig.checkMethod;

    if (!checkMethod || checkMethod({
      row: params.row,
      rowIndex: params.rowIndex,
      $rowIndex: params.$rowIndex
    })) {
      this.handleSelectRow(params, value);

      _tools.UtilTools.emitEvent(this, 'select-change', [Object.assign({
        selection: this.getSelectRecords(),
        reserves: this.getSelectReserveRecords(),
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

  /**
   * 用于多选行，设置所有行的选中状态
   * @param {Boolean} value 是否选中
   */
  setAllSelection: function setAllSelection(value) {
    var _this22 = this;

    var tableFullData = this.tableFullData,
        editStore = this.editStore,
        treeConfig = this.treeConfig,
        selection = this.selection,
        selectReserveRowMap = this.selectReserveRowMap; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = this.checkboxConfig || this.selectConfig || {};
    var property = checkboxConfig.checkField,
        reserve = checkboxConfig.reserve,
        checkStrictly = checkboxConfig.checkStrictly,
        checkMethod = checkboxConfig.checkMethod;
    var insertList = editStore.insertList;
    var selectRows = []; // 包含新增的数据

    if (insertList.length) {
      tableFullData = tableFullData.concat(insertList);
    }

    if (!checkStrictly) {
      if (property) {
        var indexKey = "".concat(treeConfig ? '$' : '', "rowIndex");

        var setValFn = function setValFn(row, rowIndex) {
          var _checkMethod;

          if (!checkMethod || checkMethod((_checkMethod = {
            row: row
          }, _defineProperty(_checkMethod, indexKey, rowIndex), _defineProperty(_checkMethod, "$rowIndex", rowIndex), _checkMethod))) {
            _xeUtils.default.set(row, property, value);
          }
        };

        var clearValFn = function clearValFn(row, rowIndex) {
          var _checkMethod2;

          if (!checkMethod || (checkMethod((_checkMethod2 = {
            row: row
          }, _defineProperty(_checkMethod2, indexKey, rowIndex), _defineProperty(_checkMethod2, "$rowIndex", rowIndex), _checkMethod2)) ? 0 : selection.indexOf(row) > -1)) {
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
                  rowIndex: rowIndex,
                  $rowIndex: rowIndex
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
                  rowIndex: rowIndex,
                  $rowIndex: rowIndex
                }) ? 0 : selection.indexOf(row) > -1;
              });
            }
          }
        }
      }

      if (reserve) {
        if (value) {
          selectRows.forEach(function (row) {
            selectReserveRowMap[_tools.UtilTools.getRowid(_this22, row)] = row;
          });
        } else {
          tableFullData.forEach(function (row) {
            var rowid = _tools.UtilTools.getRowid(_this22, row);

            if (selectReserveRowMap[rowid]) {
              delete selectReserveRowMap[rowid];
            }
          });
        }
      }

      this.selection = selectRows;
    }

    this.treeIndeterminates = [];
    this.checkSelectionStatus();
  },
  checkSelectionStatus: function checkSelectionStatus() {
    var tableFullData = this.tableFullData,
        editStore = this.editStore,
        selection = this.selection,
        treeIndeterminates = this.treeIndeterminates; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = this.checkboxConfig || this.selectConfig || {};
    var property = checkboxConfig.checkField,
        checkStrictly = checkboxConfig.checkStrictly,
        checkMethod = checkboxConfig.checkMethod;
    var insertList = editStore.insertList; // 包含新增的数据

    if (insertList.length) {
      tableFullData = tableFullData.concat(insertList);
    }

    if (!checkStrictly) {
      if (property) {
        this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
          return !checkMethod({
            row: row,
            rowIndex: rowIndex,
            $rowIndex: rowIndex
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
            rowIndex: rowIndex,
            $rowIndex: rowIndex
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
    var fullDataRowIdData = this.fullDataRowIdData,
        selectReserveRowMap = this.selectReserveRowMap; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = this.checkboxConfig || this.selectConfig || {};
    var reserveSelection = [];

    if (checkboxConfig.reserve) {
      Object.keys(selectReserveRowMap).forEach(function (rowid) {
        if (fullDataRowIdData[rowid]) {
          reserveSelection.push(fullDataRowIdData[rowid].row);
        }
      });
    }

    this.selection = reserveSelection;
  },

  /**
   * 获取保留选中的行
   */
  getSelectReserveRecords: function getSelectReserveRecords() {
    var fullDataRowIdData = this.fullDataRowIdData,
        selectReserveRowMap = this.selectReserveRowMap; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = this.checkboxConfig || this.selectConfig || {};
    var reserveSelection = [];

    if (checkboxConfig.reserve) {
      Object.keys(selectReserveRowMap).forEach(function (rowid, row) {
        if (!fullDataRowIdData[rowid]) {
          reserveSelection.push(selectReserveRowMap[rowid]);
        }
      });
    }

    return reserveSelection;
  },
  clearSelectReserve: function clearSelectReserve() {
    this.selectReserveRowMap = {};
  },
  handleSelectReserveRow: function handleSelectReserveRow(row, checked) {
    var selectReserveRowMap = this.selectReserveRowMap; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = this.checkboxConfig || this.selectConfig || {};
    var reserve = checkboxConfig.reserve;

    if (reserve) {
      var rowid = _tools.UtilTools.getRowid(this, row);

      if (checked) {
        selectReserveRowMap[rowid] = row;
      } else if (selectReserveRowMap[rowid]) {
        delete selectReserveRowMap[rowid];
      }
    }
  },

  /**
   * 多选，选中所有事件
   */
  triggerCheckAllEvent: function triggerCheckAllEvent(evnt, value) {
    this.setAllSelection(value);

    _tools.UtilTools.emitEvent(this, 'select-all', [{
      selection: this.getSelectRecords(),
      reserves: this.getSelectReserveRecords(),
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

  /**
   * 用于多选行，手动清空用户的选择
   */
  clearSelection: function clearSelection() {
    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = this.checkboxConfig || this.selectConfig || {};
    var property = checkboxConfig.checkField;

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

    if (!checkMethod || checkMethod({
      row: params.row,
      rowIndex: params.rowIndex,
      $rowIndex: params.$rowIndex
    })) {
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
   * 用于当前行，设置某一行为高亮状态
   * @param {Row} row 行对象
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

  /**
   * 用于单选行，设置某一行为选中状态
   * @param {Row} row 行对象
   */
  setRadioRow: function setRadioRow(row) {
    if (this.selectRow !== row) {
      this.clearRadioRow();
    }

    this.selectRow = row;
    return this.$nextTick();
  },

  /**
   * 用于当前行，手动清空当前高亮的状态
   */
  clearCurrentRow: function clearCurrentRow() {
    this.currentRow = null;
    this.hoverRow = null;

    _xeUtils.default.arrayEach(this.$el.querySelectorAll('.row--current'), function (elem) {
      return _tools.DomTools.removeClass(elem, 'row--current');
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
  getCurrentRow: function getCurrentRow() {
    return this.currentRow;
  },

  /**
   * 用于单选行，获取当已选中的数据
   */
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

  /**
   * 用于当前列，设置某列行为高亮状态
   * @param {ColumnConfig} column 列配置
   */
  setCurrentColumn: function setCurrentColumn(column) {
    this.clearCurrentRow();
    this.clearCurrentColumn();
    this.currentColumn = column;

    _xeUtils.default.arrayEach(this.$el.querySelectorAll(".".concat(column.id)), function (elem) {
      return _tools.DomTools.addClass(elem, 'col--current');
    });

    return this.$nextTick();
  },

  /**
   * 用于当前列，手动清空当前高亮的状态
   */
  clearCurrentColumn: function clearCurrentColumn() {
    this.currentColumn = null;

    _xeUtils.default.arrayEach(this.$el.querySelectorAll('.col--current'), function (elem) {
      return _tools.DomTools.removeClass(elem, 'col--current');
    });

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
    var _this23 = this;

    this.checkValidate('blur').catch(function (e) {
      return e;
    }).then(function () {
      _this23.handleActived(params, evnt).then(function () {
        return _this23.checkValidate('change');
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
        cell = params.cell; // 在 v3.0 中废弃 selectConfig

    var checkboxConfig = this.checkboxConfig || this.selectConfig || {}; // 解决 checkbox 重复触发两次问题

    if (isTargetRadioOrCheckbox(evnt, column, 'radio') || isTargetRadioOrCheckbox(evnt, column, 'checkbox', 'checkbox') || isTargetRadioOrCheckbox(evnt, column, 'selection', 'checkbox')) {
      // 在 v3.0 中废弃 type=selection
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
      } // 如果是单选框


      if ((radioConfig.trigger === 'row' || column.type === 'radio' && radioConfig.trigger === 'cell') && !this.getEventTargetNode(evnt, $el, 'vxe-radio').flag) {
        this.triggerRadioRowEvent(evnt, params);
      } // 如果是复选框


      if ((checkboxConfig.trigger === 'row' || (column.type === 'checkbox' || column.type === 'selection') && checkboxConfig.trigger === 'cell') && !this.getEventTargetNode(evnt, params.cell, 'vxe-checkbox').flag) {
        // 在 v3.0 中废弃 type=selection
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
    var _this24 = this;

    var editStore = this.editStore,
        editConfig = this.editConfig;
    var actived = editStore.actived;

    if (editConfig && editConfig.trigger === 'dblclick') {
      if (!actived.args || evnt.currentTarget !== actived.args.cell) {
        if (editConfig.mode === 'row') {
          this.checkValidate('blur').catch(function (e) {
            return e;
          }).then(function () {
            _this24.handleActived(params, evnt).then(function () {
              return _this24.checkValidate('change');
            }).catch(function (e) {
              return e;
            });
          });
        } else if (editConfig.mode === 'cell') {
          this.handleActived(params, evnt).then(function () {
            return _this24.checkValidate('change');
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

    var column = _xeUtils.default.find(visibleColumn, function (item) {
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

  /**
   * 手动清空排序条件，数据会恢复成未排序的状态
   */
  clearSort: function clearSort() {
    this.tableFullColumn.forEach(function (column) {
      column.order = null;
    });
    return this.handleTableData(true);
  },

  /**
   * 关闭筛选
   * @param {Event} evnt 事件
   */
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

  /**
   * 设置所有行的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllRowExpansion: function setAllRowExpansion(expanded) {
    this.expandeds = expanded ? this.tableFullData.slice(0) : [];
    return this.$nextTick().then(this.recalculate);
  },

  /**
   * 设置展开行，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
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
  // 在 v3.0 中废弃 getRecords
  hasRowExpand: function hasRowExpand(row) {
    _tools.UtilTools.warn('vxe.error.delFunc', ['hasRowExpand', 'isExpandByRow']);

    return this.isExpandByRow(row);
  },

  /**
   * 判断行是否为展开状态
   * @param {Row} row 行对象
   */
  isExpandByRow: function isExpandByRow(row) {
    return this.expandeds.indexOf(row) > -1;
  },

  /**
   * 手动清空展开行状态，数据会恢复成未展开的状态
   */
  clearRowExpand: function clearRowExpand() {
    var _this25 = this;

    var isExists = this.expandeds.length;
    this.expandeds = [];
    return this.$nextTick().then(function () {
      return isExists ? _this25.recalculate() : 0;
    });
  },
  getRowExpandRecords: function getRowExpandRecords() {
    return this.expandeds.slice(0);
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
        config: this.treeConfig,
        expandeds: this.getTreeExpandRecords()
      };
    }

    return null;
  },

  /**
   * 展开树节点事件
   */
  triggerTreeExpandEvent: function triggerTreeExpandEvent(evnt, _ref6) {
    var _this26 = this;

    var row = _ref6.row;
    var rest = this.toggleTreeExpansion(row);

    _tools.UtilTools.emitEvent(this, 'toggle-tree-change', [{
      row: row,
      rowIndex: this.getRowIndex(row),
      $table: this
    }, evnt]);

    this.$nextTick(function () {
      var currentRow = _this26.currentRow,
          currentColumn = _this26.currentColumn;

      if (currentRow) {
        _this26.setCurrentRow(currentRow);
      } else if (currentColumn) {
        _this26.setCurrentColumn(currentColumn);
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

  /**
   * 设置所有树节点的展开与否
   * @param {Boolean} expanded 是否展开
   */
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
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
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
  // 在 v3.0 中废弃 hasTreeExpand
  hasTreeExpand: function hasTreeExpand(row) {
    _tools.UtilTools.warn('vxe.error.delFunc', ['hasTreeExpand', 'isTreeExpandByRow']);

    return this.isTreeExpandByRow(row);
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
    var _this27 = this;

    var isExists = this.treeExpandeds.length;
    this.treeExpandeds = [];
    return this.$nextTick().then(function () {
      return isExists ? _this27.recalculate() : 0;
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
    this.updateVirtualScrollX();
  },
  updateVirtualScrollX: function updateVirtualScrollX(force) {
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
    var preload = force || false;

    for (var index = 0; index < visibleColumn.length; index++) {
      width += visibleColumn[index].renderWidth;

      if (scrollLeft < width) {
        toVisibleIndex = index;
        break;
      }
    }

    if (force || scrollXStore.visibleIndex !== toVisibleIndex) {
      var marginSize = Math.min(Math.floor((renderSize - visibleSize) / 2), visibleSize);

      if (scrollXStore.visibleIndex === toVisibleIndex) {
        scrollXStore.startIndex = toVisibleIndex;
      } else if (scrollXStore.visibleIndex > toVisibleIndex) {
        // 向左
        preload = toVisibleIndex - offsetSize <= startIndex;

        if (preload) {
          scrollXStore.startIndex = Math.max(0, Math.max(marginSize, toVisibleIndex - marginSize));
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
        scrollYStore = this.scrollYStore,
        isLoadData = this.isLoadData;
    var startIndex = scrollYStore.startIndex,
        renderSize = scrollYStore.renderSize,
        offsetSize = scrollYStore.offsetSize,
        visibleSize = scrollYStore.visibleSize,
        rowHeight = scrollYStore.rowHeight;
    var scrollBodyElem = evnt.target;
    var scrollTop = scrollBodyElem.scrollTop;
    var toVisibleIndex = Math.ceil(scrollTop / rowHeight);
    var preload = false;

    if (isLoadData || scrollYStore.visibleIndex !== toVisibleIndex) {
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
      this.isLoadData = false;
    }
  },
  // 计算可视渲染相关数据
  computeScrollLoad: function computeScrollLoad() {
    var _this28 = this;

    return this.$nextTick().then(function () {
      var vSize = _this28.vSize,
          scrollXLoad = _this28.scrollXLoad,
          scrollYLoad = _this28.scrollYLoad,
          scrollYStore = _this28.scrollYStore,
          scrollXStore = _this28.scrollXStore,
          visibleColumn = _this28.visibleColumn,
          optimizeOpts = _this28.optimizeOpts,
          rowHeightMaps = _this28.rowHeightMaps;
      var scrollX = optimizeOpts.scrollX,
          scrollY = optimizeOpts.scrollY;
      var tableBody = _this28.$refs.tableBody;
      var tableBodyElem = tableBody ? tableBody.$el : null;
      var tableHeader = _this28.$refs.tableHeader;

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
            scrollXStore.renderSize = visibleXSize + 4;
          }

          _this28.updateScrollXData();
        } else {
          _this28.updateScrollXSpace();
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
            rHeight = rowHeightMaps[vSize || 'default'];
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

          _this28.updateScrollYData();
        } else {
          _this28.updateScrollYSpace();
        }
      }

      _this28.$nextTick(_this28.updateStyle);
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

  /**
   * 如果有滚动条，则滚动到对应的位置
   * @param {Number} scrollLeft 左距离
   * @param {Number} scrollTop 上距离
   */
  scrollTo: function scrollTo(scrollLeft, scrollTop) {
    var _this29 = this;

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
          return resolve(_this29.$nextTick());
        }, 50);
      });
    }

    return this.$nextTick();
  },

  /**
   * 如果有滚动条，则滚动到对应的行
   * @param {Row} row 行对象
   * @param {ColumnConfig} column 列配置
   */
  scrollToRow: function scrollToRow(row, column) {
    var rest = [];

    if (row && this.fullAllDataRowMap.has(row)) {
      rest.push(_tools.DomTools.rowToVisible(this, row));
    }

    rest.push(this.scrollToColumn(column));
    return Promise.all(rest);
  },

  /**
   * 如果有滚动条，则滚动到对应的列
   * @param {ColumnConfig} column 列配置
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
    var _this30 = this;

    var tableFullData = this.tableFullData,
        treeConfig = this.treeConfig;

    if (treeConfig) {
      var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
        return item === row;
      }, treeConfig);

      if (matchObj) {
        var nodes = matchObj.nodes;
        nodes.forEach(function (row, index) {
          if (index < nodes.length - 1 && !_this30.isTreeExpandByRow(row)) {
            _this30.setTreeExpansion(row, true);
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
    var _this31 = this;

    var $refs = this.$refs;
    var tableBody = $refs.tableBody;
    var tableBodyElem = tableBody ? tableBody.$el : null;
    var tableFooter = $refs.tableFooter;
    var tableFooterElem = tableFooter ? tableFooter.$el : null;
    var footerTargetElem = tableFooterElem || tableBodyElem;

    if (tableBodyElem) {
      tableBodyElem.scrollTop = 0;
    }

    if (footerTargetElem) {
      footerTargetElem.scrollLeft = 0;
    }

    return new Promise(function (resolve) {
      return setTimeout(function () {
        return resolve(_this31.$nextTick());
      });
    });
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
    var _this32 = this;

    var customVal = !_xeUtils.default.isUndefined(cellValue);
    return this.$nextTick().then(function () {
      var $refs = _this32.$refs,
          tableData = _this32.tableData,
          editRules = _this32.editRules,
          validStore = _this32.validStore;

      if (scope && $refs.tableBody && editRules) {
        var row = scope.row,
            column = scope.column;
        var type = 'change';

        if (_this32.hasCellRules(type, row, column)) {
          var rowIndex = tableData.indexOf(row);

          var cell = _tools.DomTools.getCell(_this32, {
            row: row,
            rowIndex: rowIndex,
            column: column
          });

          if (cell) {
            return _this32.validCellRules(type, row, column, cellValue).then(function () {
              if (customVal && validStore.visible) {
                _tools.UtilTools.setCellValue(row, column, cellValue);
              }

              _this32.clearValidate();
            }).catch(function (_ref7) {
              var rule = _ref7.rule;

              if (customVal) {
                _tools.UtilTools.setCellValue(row, column, cellValue);
              }

              _this32.showValidTooltip({
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
  updateZindex: function updateZindex() {
    if (this.tZindex < _tools.UtilTools.getLastZIndex()) {
      this.tZindex = _tools.UtilTools.nextZIndex(this);
    }
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

}; // Module methods

var funcs = 'closeMenu,getMouseSelecteds,getMouseCheckeds,clearCopyed,clearChecked,clearHeaderChecked,clearIndexChecked,clearSelected,insert,insertAt,remove,removeSelecteds,revert,revertData,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearActived,getActiveRow,hasActiveRow,isActiveByRow,setActiveRow,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,exportCsv,openExport,exportData,openImport,importData,readFile,importByFile,print'.split(',');
funcs.forEach(function (name) {
  Methods[name] = function () {
    return this["_".concat(name)] ? this["_".concat(name)].apply(this, arguments) : null;
  };
});
var _default = Methods;
exports.default = _default;