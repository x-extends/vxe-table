"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UtilTools = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var zindexIndex = 0;
var lastZindex = 0;
var columnUniqueId = 0;

var ColumnConfig =
/*#__PURE__*/
function () {
  function ColumnConfig($xetable, _vm) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        renderHeader = _ref.renderHeader,
        renderCell = _ref.renderCell,
        renderFooter = _ref.renderFooter,
        renderData = _ref.renderData;

    _classCallCheck(this, ColumnConfig);

    var $xegrid = $xetable.$xegrid;
    var proxyOpts = $xegrid ? $xegrid.proxyOpts : null;
    var formatter = _vm.formatter;
    var visible = _xeUtils.default.isBoolean(_vm.visible) ? _vm.visible : true;

    if (_vm.cellRender && _vm.editRender) {
      UtilTools.warn('vxe.error.cellEditRender');
    }

    if (_vm.type === 'index') {
      UtilTools.warn('vxe.error.delProp', ['index', 'seq']);
    } else if (_vm.type === 'selection') {
      UtilTools.warn('vxe.error.delProp', ['selection', 'checkbox']);
    } else if (_vm.type === 'expand') {
      if ($xetable.treeConfig && $xetable.treeOpts.line) {
        UtilTools.error('vxe.error.treeLineExpand');
      }

      if (_vm.slots && !_vm.slots.content && _vm.slots.default) {
        UtilTools.warn('vxe.error.expandContent');
      }
    }

    if (formatter) {
      if (_xeUtils.default.isString(formatter)) {
        if (!_xeUtils.default.isFunction(_xeUtils.default[formatter])) {
          UtilTools.error('vxe.error.notFunc', [formatter]);
        }
      } else if (_xeUtils.default.isArray(formatter)) {
        if (!_xeUtils.default.isFunction(_xeUtils.default[formatter[0]])) {
          UtilTools.error('vxe.error.notFunc', [formatter[0]]);
        }
      }
    }

    Object.assign(this, {
      // 基本属性
      id: "col_".concat(++columnUniqueId),
      type: _vm.type,
      // 在 v3.0 中废弃 prop
      prop: _vm.prop,
      property: _vm.field || _vm.prop,
      title: _vm.title,
      // 在 v3.0 中废弃 label
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
      className: _vm.class || _vm.className,
      headerClassName: _vm.headerClassName,
      footerClassName: _vm.footerClassName,
      indexMethod: _vm.indexMethod,
      formatter: formatter,
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
      visible: visible,
      defaultVisible: visible,
      checked: false,
      disabled: false,
      level: 1,
      rowSpan: 1,
      colSpan: 1,
      order: null,
      renderWidth: 0,
      renderHeight: 0,
      resizeWidth: 0,
      renderLeft: 0,
      renderArgs: [],
      // 渲染参数可用于扩展
      model: {},
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell,
      renderFooter: renderFooter || _vm.renderFooter,
      renderData: renderData,
      // 单元格插槽，只对 grid 有效
      slots: _vm.slots,
      own: _vm
    });

    if (proxyOpts && proxyOpts.beforeColumn) {
      proxyOpts.beforeColumn.apply($xetable, [{
        $grid: $xegrid,
        column: this
      }]);
    }
  }

  _createClass(ColumnConfig, [{
    key: "getTitle",
    value: function getTitle() {
      // 在 v3.0 中废弃 label、type=index
      return UtilTools.getFuncText(this.own.title || this.own.label || (this.type === 'seq' || this.type === 'index' ? _conf.default.i18n('vxe.table.seqTitle') : ''));
    }
  }, {
    key: "getKey",
    value: function getKey() {
      return this.property || (this.type ? "type=".concat(this.type) : null);
    }
  }, {
    key: "update",
    value: function update(name, value) {
      // 不支持双向的属性
      if (name !== 'filters') {
        this[name] = value;
      }
    }
  }]);

  return ColumnConfig;
}();

function outLog(type) {
  return function (message, params) {
    var msg = UtilTools.getLog(message, params);
    console[type](msg);
    return msg;
  };
}

var UtilTools = {
  warn: outLog('warn'),
  error: outLog('error'),
  getLog: function getLog(message, params) {
    return "[vxe-table] ".concat(_xeUtils.default.template(_conf.default.i18n(message), params));
  },
  getSize: function getSize(_ref2) {
    var size = _ref2.size,
        $parent = _ref2.$parent;
    return size || ($parent && ['medium', 'small', 'mini'].indexOf($parent.size) > -1 ? $parent.size : null);
  },
  getFuncText: function getFuncText(content) {
    return _xeUtils.default.isFunction(content) ? content() : _conf.default.translate ? _conf.default.translate(content) : content;
  },
  nextZIndex: function nextZIndex($xetable) {
    if ($xetable && $xetable.zIndex) {
      return $xetable.zIndex;
    }

    lastZindex = _conf.default.zIndex + zindexIndex++;
    return lastZindex;
  },
  getLastZIndex: function getLastZIndex() {
    return lastZindex;
  },
  // 行主键 key
  getRowkey: function getRowkey($xetable) {
    return $xetable.rowId;
  },
  // 行主键 value
  getRowid: function getRowid($xetable, row) {
    var rowId = _xeUtils.default.get(row, UtilTools.getRowkey($xetable));

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
  getClass: function getClass(property, params) {
    return property ? _xeUtils.default.isFunction(property) ? property(params) : property : '';
  },
  getFilters: function getFilters(filters) {
    if (filters && _xeUtils.default.isArray(filters)) {
      return filters.map(function (_ref3) {
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
    }

    return filters;
  },
  formatText: function formatText(value, placeholder) {
    return '' + (value === '' || value === null || value === undefined ? placeholder ? _conf.default.emptyCell : '' : value);
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
      var fullAllDataRowMap = $table.fullAllDataRowMap;
      var cacheFormat = fullAllDataRowMap.has(row);

      if (cacheFormat) {
        rest = fullAllDataRowMap.get(row);
        formatData = rest.formatData;

        if (!formatData) {
          formatData = fullAllDataRowMap.get(row).formatData = {};
        }

        if (rest && formatData[colid]) {
          if (formatData[colid].value === cellValue) {
            return formatData[colid].label;
          }
        }
      }

      if (_xeUtils.default.isString(formatter)) {
        cellLabel = _xeUtils.default[formatter] ? _xeUtils.default[formatter](cellValue) : '';
      } else if (_xeUtils.default.isArray(formatter)) {
        cellLabel = _xeUtils.default[formatter[0]] ? _xeUtils.default[formatter[0]].apply(_xeUtils.default, [cellValue].concat(formatter.slice(1))) : '';
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
  getColumnConfig: function getColumnConfig($xetable, _vm, options) {
    return _vm instanceof ColumnConfig ? _vm : new ColumnConfig($xetable, _vm, options);
  },
  // 组装列配置
  assemColumn: function assemColumn(_vm) {
    var $el = _vm.$el,
        $xetable = _vm.$xetable,
        $xecolumn = _vm.$xecolumn,
        columnConfig = _vm.columnConfig;
    var groupConfig = $xecolumn ? $xecolumn.columnConfig : null;
    columnConfig.slots = _vm.$scopedSlots;

    if (groupConfig && $xecolumn.$children.length > 0) {
      if (!groupConfig.children) {
        groupConfig.children = [];
      }

      groupConfig.children.splice([].indexOf.call($xecolumn.$el.children, $el), 0, columnConfig);
    } else {
      $xetable.collectColumn.splice([].indexOf.call($xetable.$refs.hideColumn.children, $el), 0, columnConfig);
    }
  },
  // 销毁列
  destroyColumn: function destroyColumn(_vm) {
    var $xetable = _vm.$xetable,
        columnConfig = _vm.columnConfig;

    var matchObj = _xeUtils.default.findTree($xetable.collectColumn, function (column) {
      return column === columnConfig;
    });

    if (matchObj) {
      matchObj.items.splice(matchObj.index, 1);
    }
  },
  hasChildrenList: function hasChildrenList(item) {
    return item && item.children && item.children.length > 0;
  },
  parseFile: function parseFile(file) {
    var name = file.name;

    var tIndex = _xeUtils.default.lastIndexOf(name, '.');

    var type = name.substring(tIndex + 1, name.length);
    var filename = name.substring(0, tIndex);
    return {
      filename: filename,
      type: type
    };
  }
};
exports.UtilTools = UtilTools;
var _default = UtilTools;
exports.default = _default;