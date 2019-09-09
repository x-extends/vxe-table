"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UtilTools = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var columnUniqueId = 0;

var ColumnConfig = function ColumnConfig(_vm) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      renderHeader = _ref.renderHeader,
      renderCell = _ref.renderCell,
      renderData = _ref.renderData;

  _classCallCheck(this, ColumnConfig);

  if (_vm.cellRender && _vm.editRender) {
    UtilTools.warn('vxe.error.cellEditRender');
  }

  Object.assign(this, {
    // 基本属性
    id: "col_".concat(++columnUniqueId),
    type: _vm.type,
    prop: _vm.prop,
    property: _vm.field || _vm.prop,
    title: _vm.title,
    label: _vm.label,
    width: _vm.width,
    minWidth: _vm.minWidth,
    resizable: _vm.resizable,
    fixed: _vm.fixed,
    align: _vm.align,
    headerAlign: _vm.headerAlign,
    footerAlign: _vm.footerAlign,
    showOverflow: _vm.showOverflow,
    showHeaderOverflow: _vm.showHeaderOverflow,
    indexMethod: _vm.indexMethod,
    formatter: _vm.formatter,
    sortable: _vm.sortable,
    sortBy: _vm.sortBy,
    sortMethod: _vm.sortMethod,
    remoteSort: _vm.remoteSort,
    filters: UtilTools.getFilters(_vm.filters),
    filterMultiple: _xeUtils.default.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
    filterMethod: _vm.filterMethod,
    filterRender: _vm.filterRender,
    treeNode: _vm.treeNode,
    cellRender: _vm.cellRender,
    editRender: _vm.editRender,
    // 自定义参数
    params: _vm.params,
    // 渲染属性
    visible: true,
    level: 1,
    rowSpan: 1,
    colSpan: 1,
    order: null,
    renderWidth: 0,
    renderHeight: 0,
    resizeWidth: 0,
    renderLeft: 0,
    model: {},
    renderHeader: renderHeader || _vm.renderHeader,
    renderCell: renderCell || _vm.renderCell,
    renderData: renderData,
    // 单元格插槽，只对 grid 有效
    slots: _vm.slots,
    own: _vm
  });
};

function outLog(type) {
  return function (message) {
    var msg = "[vxe-table] ".concat(_conf.default.i18n(message));
    console[type](msg);
    return msg;
  };
}

var UtilTools = {
  warn: outLog('warn'),
  error: outLog('error'),
  getSize: function getSize(_ref2) {
    var size = _ref2.size,
        $parent = _ref2.$parent;
    return size || ($parent && ['medium', 'small', 'mini'].indexOf($parent.size) > -1 ? $parent.size : null);
  },
  getFuncText: function getFuncText(content) {
    return _xeUtils.default.isFunction(content) ? content() : _conf.default.translate ? _conf.default.translate(content) : content;
  },
  // 行主键 key
  getRowkey: function getRowkey($table) {
    return $table.rowId;
  },
  // 行主键 value
  getRowid: function getRowid($table, row) {
    var rowId = _xeUtils.default.get(row, UtilTools.getRowkey($table));

    return rowId ? encodeURIComponent(rowId) : '';
  },
  // 触发事件
  emitEvent: function emitEvent(_vm, type, args) {
    if (_vm.$listeners[type]) {
      _vm.$emit.apply(_vm, [type].concat(args));
    }
  },
  // 获取所有的列，排除分组
  getColumnList: function getColumnList(columns) {
    var result = [];
    columns.forEach(function (column) {
      result.push.apply(result, column.children && column.children.length ? UtilTools.getColumnList(column.children) : [column]);
    });
    return result;
  },
  getFilters: function getFilters(filters) {
    return (filters || []).map(function (_ref3) {
      var label = _ref3.label,
          value = _ref3.value,
          data = _ref3.data,
          checked = _ref3.checked;
      return {
        label: label,
        value: value,
        data: data,
        _data: data,
        checked: !!checked
      };
    });
  },
  formatText: function formatText(value, placeholder) {
    return '' + (value === null || value === void 0 ? placeholder ? _conf.default.emptyCell : '' : value);
  },
  getCellValue: function getCellValue(row, column) {
    return _xeUtils.default.get(row, column.property);
  },
  getCellLabel: function getCellLabel(row, column, params) {
    var formatter = column.formatter;
    var cellValue = UtilTools.getCellValue(row, column);
    var cellLabel = cellValue;

    if (params && formatter) {
      var rest, formatData;
      var $table = params.$table;
      var colid = column.id;
      var cacheFormat = $table && $table.fullAllDataRowMap.has(row);

      if (cacheFormat) {
        rest = $table.fullAllDataRowMap.get(row);
        formatData = rest.formatData;

        if (!formatData) {
          formatData = $table.fullAllDataRowMap.get(row).formatData = {};
        }
      }

      if (rest && formatData[colid]) {
        if (formatData[colid].value === cellValue) {
          return formatData[colid].label;
        }
      }

      if (_xeUtils.default.isString(formatter)) {
        cellLabel = _xeUtils.default[formatter](cellValue);
      } else if (_xeUtils.default.isArray(formatter)) {
        cellLabel = _xeUtils.default[formatter[0]].apply(_xeUtils.default, [cellValue].concat(formatter.slice(1)));
      } else {
        cellLabel = formatter(Object.assign({
          cellValue: cellValue
        }, params));
      }

      if (formatData) {
        formatData[colid] = {
          value: cellValue,
          label: cellLabel
        };
      }
    }

    return cellLabel;
  },
  setCellValue: function setCellValue(row, column, value) {
    return _xeUtils.default.set(row, column.property, value);
  },
  getColumnConfig: function getColumnConfig(_vm, options) {
    return _vm instanceof ColumnConfig ? _vm : new ColumnConfig(_vm, options);
  },
  // 组装列配置
  assemColumn: function assemColumn(_vm) {
    var $table = _vm.$table,
        $parent = _vm.$parent,
        columnConfig = _vm.columnConfig;
    var parentColumnConfig = $parent.columnConfig;
    columnConfig.slots = _vm.$scopedSlots;

    if (parentColumnConfig && $parent.$children.length > 0) {
      if (!parentColumnConfig.children) {
        parentColumnConfig.children = [];
      }

      parentColumnConfig.children.splice([].indexOf.call($parent.$el.children, _vm.$el), 0, columnConfig);
    } else {
      $table.collectColumn.splice([].indexOf.call($table.$refs.hideColumn.children, _vm.$el), 0, columnConfig);
    }
  },
  // 销毁列
  destroyColumn: function destroyColumn(_vm) {
    var $table = _vm.$table,
        columnConfig = _vm.columnConfig;

    var matchObj = _xeUtils.default.findTree($table.collectColumn, function (column) {
      return column === columnConfig;
    });

    if (matchObj) {
      matchObj.items.splice(matchObj.index, 1);
    }
  },
  hasChildrenList: function hasChildrenList(item) {
    return item && item.children && item.children.length > 0;
  }
};
exports.UtilTools = UtilTools;
var _default = UtilTools;
exports.default = _default;