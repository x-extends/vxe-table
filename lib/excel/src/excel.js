"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _table = _interopRequireDefault(require("../../table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var excelContextMenu = {
  header: {
    options: [[{
      code: 'exportAll',
      name: '隐藏列'
    }, {
      code: 'exportAll',
      name: '取消所有隐藏'
    }]]
  },
  body: {
    options: [[{
      code: 'clip',
      name: '剪贴'
    }, {
      code: 'copy',
      name: '复制'
    }, {
      code: 'paste',
      name: '粘贴'
    }], [{
      code: 'insert',
      name: '插入'
    }, {
      code: 'remove',
      name: '删除'
    }, {
      code: 'clearData',
      name: '清除内容'
    }], [// {
    //   code: 'filter',
    //   name: '筛选',
    //   children: [
    //     {
    //       code: 'clearFilter',
    //       name: '清除筛选'
    //     },
    //     {
    //       code: 'filterSelect',
    //       name: '按所选单元格的值筛选'
    //     }
    //   ]
    // },
    {
      code: 'sort',
      name: '排序',
      children: [{
        code: 'clearSort',
        name: '清除排序'
      }, {
        code: 'sortAsc',
        name: '升序'
      }, {
        code: 'sortDesc',
        name: '倒序'
      }]
    }], [{
      code: 'exportAll',
      name: '导出数据.csv'
    }]]
  }
};
var methods = {};
var excelEditConfig = {
  trigger: 'dblclick',
  mode: 'cell',
  showIcon: false,
  showStatus: false
};

function buildColumns(h, columns) {
  return columns ? columns.map(function (props) {
    return h('vxe-table-column', {
      props: props
    }, buildColumns(h, props.children));
  }) : [];
}

function buildProps(h, _vm) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var editConfig = props.editConfig,
      contextMenu = props.contextMenu;
  return Object.assign({}, props, {
    border: true,
    resizable: true,
    showOverflow: null,
    headerCellClassName: _vm.handleHeaderCellClassName,
    cellClassName: _vm.handleCellClassName,
    contextMenu: Object.assign({}, contextMenu, excelContextMenu),
    mouseConfig: {
      selected: true,
      checked: true
    },
    keyboardConfig: {
      isArrow: true,
      isDel: true,
      isTab: true,
      isCut: true,
      isEdit: true
    },
    editConfig: editConfig ? Object.assign({}, excelEditConfig, editConfig) : excelEditConfig
  });
}

Object.keys(_table.default.methods).forEach(function (name) {
  methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments);
  };
});
var _default = {
  name: 'VxeExcel',
  props: _objectSpread({
    columns: Array
  }, _table.default.props),
  data: function data() {
    return {
      excelStore: {
        uploadRows: []
      }
    };
  },
  render: function render(h) {
    return h('vxe-table', {
      class: 'vxe-excel',
      props: buildProps(h, this, this.$props),
      on: _objectSpread({}, this.$listeners, {
        'cell-click': this.cellClickEvent,
        'header-cell-click': this.headerCellClickEvent,
        'context-menu-click': this.contextMenuClickEvent
      }),
      ref: 'xTable'
    }, buildColumns(h, this.columns));
  },
  methods: _objectSpread({}, methods, {
    handleHeaderCellClassName: function handleHeaderCellClassName(_ref) {
      var column = _ref.column,
          columnIndex = _ref.columnIndex,
          $table = _ref.$table;
      var editStore = $table.editStore;
      var selected = editStore.selected,
          actived = editStore.actived;

      if (columnIndex > 0) {
        if (selected.column === column || actived.column === column) {
          return 'vxe-excel--column-selected';
        }
      }
    },
    handleCellClassName: function handleCellClassName(_ref2) {
      var row = _ref2.row,
          column = _ref2.column,
          columnIndex = _ref2.columnIndex,
          $table = _ref2.$table;
      var editStore = $table.editStore;
      var selected = editStore.selected,
          actived = editStore.actived;

      if (columnIndex === 0) {
        if (selected.row === row || actived.row === row) {
          return 'vxe-excel--index-selected';
        }
      }
    },
    cellClickEvent: function cellClickEvent(_ref3, evnt) {
      var row = _ref3.row,
          rowIndex = _ref3.rowIndex,
          columnIndex = _ref3.columnIndex,
          $table = _ref3.$table;
      var $refs = $table.$refs,
          visibleColumn = $table.visibleColumn,
          handleSelected = $table.handleSelected,
          handleChecked = $table.handleChecked;

      if (columnIndex === 0) {
        columnIndex += 1;
        var tableBodyElem = $refs.tableBody.$el;
        var column = visibleColumn[columnIndex];
        var trElemList = tableBodyElem.querySelectorAll('.vxe-body--row');
        var trElem = trElemList[rowIndex];
        var cell = trElem.querySelector(".".concat(column.id));
        handleSelected({
          row: row,
          rowIndex: rowIndex,
          column: column,
          columnIndex: columnIndex,
          cell: cell,
          $table: $table
        }, evnt).then(function () {
          handleChecked({
            rowIndex: rowIndex,
            columnIndex: columnIndex
          }, {
            rowIndex: rowIndex,
            columnIndex: visibleColumn.length - 1
          }, evnt);
        });
      }
    },
    headerCellClickEvent: function headerCellClickEvent(_ref4, evnt) {
      var column = _ref4.column,
          columnIndex = _ref4.columnIndex,
          $table = _ref4.$table;
      var $refs = $table.$refs,
          tableData = $table.tableData,
          handleSelected = $table.handleSelected,
          handleChecked = $table.handleChecked;

      if (tableData.length) {
        var tableBodyElem = $refs.tableBody.$el;
        var rowIndex = 0;
        var row = tableData[rowIndex];
        var trElemList = tableBodyElem.querySelectorAll('.vxe-body--row');
        var trElem = trElemList[rowIndex];
        var cell = trElem.querySelector(".".concat(column.id));
        handleSelected({
          row: row,
          rowIndex: rowIndex,
          column: column,
          columnIndex: columnIndex,
          cell: cell,
          $table: $table
        }, evnt).then(function () {
          handleChecked({
            rowIndex: rowIndex,
            columnIndex: columnIndex
          }, {
            rowIndex: tableData.length - 1,
            columnIndex: columnIndex
          }, evnt);
        });
      }
    },
    contextMenuClickEvent: function contextMenuClickEvent(_ref5, evnt) {
      var menu = _ref5.menu,
          row = _ref5.row,
          column = _ref5.column;
      var $table = this.$refs.xTable;
      var property = column.property;

      switch (menu.code) {
        case 'clip':
          $table.handleCopyed(true, evnt);
          break;

        case 'copy':
          $table.handleCopyed(false, evnt);
          break;

        case 'paste':
          $table.handlePaste(evnt);
          break;

        case 'insert':
          $table.insertAt({}, row);
          break;

        case 'remove':
          $table.remove(row);
          break;

        case 'clearData':
          $table.clearData(row, property);
          break;

        case 'clearFilter':
          $table.clearFilter();
          break;

        case 'clearSort':
          $table.clearSort();
          break;

        case 'sortAsc':
          $table.sort(property, 'asc');
          break;

        case 'sortDesc':
          $table.sort(property, 'desc');
          break;

        case 'exportAll':
          $table.exportCsv({
            isHeader: false
          });
          break;
      }
    }
  })
};
exports.default = _default;