"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _table = _interopRequireDefault(require("../../table"));

var _grid = _interopRequireDefault(require("../../grid"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propKeys = Object.keys(_table.default.props).filter(function (name) {
  return ['data', 'treeConfig'].indexOf(name) === -1;
});
var _default = {
  name: 'VxeVirtualTree',
  extends: _grid.default,
  data: function data() {
    return {};
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    tableProps: function tableProps() {
      var _this = this;

      var rest = {};
      propKeys.forEach(function (key) {
        rest[key] = _this[key];
      });
      return rest;
    }
  },
  watch: {
    columns: function columns(value) {
      this.loadColumn(this.handleColumns());
    },
    data: function data(value) {
      this.loadData(value);
    }
  },
  created: function created() {
    window.aa = this;
    var data = this.data;
    Object.assign(this, {
      fullTreeData: [],
      tableData: []
    });
    this.handleColumns();

    if (data) {
      this.reloadData(data);
    }
  },
  methods: {
    renderTreeIcon: function renderTreeIcon(params, h) {
      var _this2 = this;

      var isHidden = params.isHidden;
      var row = params.row;
      var _this$treeConfig = this.treeConfig,
          children = _this$treeConfig.children,
          indent = _this$treeConfig.indent,
          trigger = _this$treeConfig.trigger,
          iconOpen = _this$treeConfig.iconOpen,
          iconClose = _this$treeConfig.iconClose;
      var rowChildren = row[children];
      var isAceived = false;
      var on = {};

      if (!isHidden) {
        isAceived = row._X_EXPAND;
      }

      if (!trigger || trigger === 'default') {
        on.click = function (evnt) {
          return _this2.toggleTreeExpansion(row);
        };
      }

      return [h('span', {
        class: 'vxe-tree--indent',
        style: {
          width: "".concat(row._X_LEVEL * (indent || 20), "px")
        }
      }), h('span', {
        class: ['vxe-tree-wrapper', {
          'is--active': isAceived
        }],
        on: on
      }, rowChildren && rowChildren.length ? [h('span', {
        class: 'vxe-tree--btn-wrapper'
      }, [h('i', {
        class: ['vxe-tree--node-btn', isAceived ? iconOpen || _conf.default.icon.treeOpen : iconClose || _conf.default.icon.treeClose]
      })])] : [])];
    },
    _loadTreeData: function _loadTreeData(data) {
      var _this3 = this;

      return this.$nextTick().then(function () {
        return _this3.$refs.xTable.loadData(data);
      });
    },
    loadData: function loadData(data) {
      return this._loadTreeData(this.toVirtualTree(data));
    },
    reloadData: function reloadData(data) {
      var _this4 = this;

      return this.$nextTick().then(function () {
        return _this4.$refs.xTable.reloadData(_this4.toVirtualTree(data));
      }).then(function () {
        return _this4.handleDefaultTreeExpand();
      });
    },
    isTreeExpandByRow: function isTreeExpandByRow(row) {
      return !!row._X_EXPAND;
    },
    setTreeExpansion: function setTreeExpansion(rows, expanded) {
      var _this5 = this;

      if (rows) {
        if (!_xeUtils.default.isArray(rows)) {
          rows = [rows];
        }

        rows.forEach(function (row) {
          return _this5.virtualExpand(row, !!expanded);
        });
      }

      return this._loadTreeData(this.tableData);
    },
    setAllTreeExpansion: function setAllTreeExpansion(expanded) {
      return this._loadTreeData(this.virtualAllExpand(expanded));
    },
    toggleTreeExpansion: function toggleTreeExpansion(row) {
      return this._loadTreeData(this.virtualExpand(row, !row._X_EXPAND));
    },
    getTreeExpandRecords: function getTreeExpandRecords() {
      var hasChilds = this.hasChilds;
      var treeExpandRecords = [];

      _xeUtils.default.eachTree(this.fullTreeData, function (row) {
        if (row._X_EXPAND && hasChilds(row)) {
          treeExpandRecords.push(row);
        }
      }, this.treeConfig);

      return treeExpandRecords;
    },
    clearTreeExpand: function clearTreeExpand() {
      return this.setAllTreeExpansion(false);
    },
    handleColumns: function handleColumns() {
      var _this6 = this;

      return this.columns.map(function (conf) {
        if (conf.treeNode) {
          var slots = conf.slots || {};
          slots.icon = _this6.renderTreeIcon;
          conf.slots = slots;
        }

        return conf;
      });
    },
    hasChilds: function hasChilds(row) {
      var childList = row[this.treeConfig.children];
      return childList && childList.length;
    },

    /**
     * 获取表格数据集，包含新增、删除、修改
     */
    getRecordset: function getRecordset() {
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      };
    },
    isInsertByRow: function isInsertByRow(row) {
      return !!row._X_INSERT;
    },
    getInsertRecords: function getInsertRecords() {
      var insertRecords = [];

      _xeUtils.default.eachTree(this.fullTreeData, function (row) {
        if (row._X_INSERT) {
          insertRecords.push(row);
        }
      }, this.treeConfig);

      return insertRecords;
    },
    insert: function insert(records) {
      return this.insertAt(records);
    },
    insertAt: function insertAt(records, row) {
      var _this7 = this;

      var fullTreeData = this.fullTreeData,
          tableData = this.tableData;

      if (!_xeUtils.default.isArray(records)) {
        records = [records];
      }

      var newRecords = records.map(function (record) {
        return _this7.defineField(Object.assign({
          _X_EXPAND: false,
          _X_INSERT: true,
          _X_LEVEL: 0
        }, record));
      });

      if (!row) {
        fullTreeData.unshift.apply(fullTreeData, newRecords);
        tableData.unshift.apply(tableData, newRecords);
      } else {
        if (row === -1) {
          fullTreeData.push.apply(fullTreeData, newRecords);
          tableData.push.apply(tableData, newRecords);
        } else {
          var matchObj = _xeUtils.default.findTree(fullTreeData, function (item) {
            return item === row;
          });

          if (!matchObj || matchObj.index === -1) {
            throw new Error(_tools.UtilTools.error('vxe.error.unableInsert'));
          }

          var items = matchObj.items,
              index = matchObj.index,
              nodes = matchObj.nodes;
          var rowIndex = tableData.indexOf(row);

          if (rowIndex > -1) {
            tableData.splice.apply(tableData, [rowIndex, 0].concat(newRecords));
          }

          items.splice.apply(items, [index, 0].concat(newRecords));
          newRecords.forEach(function (item) {
            item._X_LEVEL = nodes.length - 1;
          });
        }
      }

      return this._loadTreeData(tableData).then(function () {
        return {
          row: newRecords.length ? newRecords[newRecords.length - 1] : null,
          rows: newRecords
        };
      });
    },

    /**
     * 处理默认展开树节点
     */
    handleDefaultTreeExpand: function handleDefaultTreeExpand() {
      var _this8 = this;

      var treeConfig = this.treeConfig,
          tableFullData = this.tableFullData;

      if (treeConfig) {
        var expandAll = treeConfig.expandAll,
            expandRowKeys = treeConfig.expandRowKeys;
        var children = treeConfig.children;

        if (expandAll) {
          this.setAllTreeExpansion(true);
        } else if (expandRowKeys) {
          var rowkey = _tools.UtilTools.getRowkey(this);

          expandRowKeys.forEach(function (rowid) {
            var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
              return rowid === _xeUtils.default.get(item, rowkey);
            }, treeConfig);

            var rowChildren = matchObj ? matchObj.item[children] : 0;

            if (rowChildren && rowChildren.length) {
              _this8.setTreeExpansion(matchObj.item, true);
            }
          });
        }
      }
    },

    /**
     * 定义树属性
     */
    toVirtualTree: function toVirtualTree(treeData) {
      _xeUtils.default.eachTree(treeData, function (item, index, obj, paths, parent, nodes) {
        item._X_EXPAND = false;
        item._X_INSERT = false;
        item._X_LEVEL = nodes.length - 1;
      });

      this.fullTreeData = treeData.slice(0);
      this.tableData = treeData.slice(0);
      return treeData;
    },

    /**
     * 展开/收起树节点
     */
    virtualExpand: function virtualExpand(row, expanded) {
      var children = this.treeConfig.children;

      if (row._X_EXPAND !== expanded) {
        if (this.hasChilds(row)) {
          var childRows = row[children];
          var tableData = this.tableData;

          if (row._X_EXPAND) {
            // 展开节点
            var nodeChildList = [];

            _xeUtils.default.eachTree(childRows, function (item) {
              nodeChildList.push(item);
            }, this.treeConfig);

            tableData = tableData.filter(function (item) {
              return nodeChildList.indexOf(item) === -1;
            });
          } else {
            // 收起节点
            var expandList = [];
            var rowIndex = tableData.indexOf(row);

            if (rowIndex === -1) {
              throw new Error('错误的操作！');
            }

            _xeUtils.default.eachTree(childRows, function (item, index, obj, paths, parent, nodes) {
              if (!parent || parent._X_EXPAND) {
                expandList.push(item);
              }
            }, this.treeConfig);

            tableData.splice.apply(tableData, [rowIndex + 1, 0].concat(expandList));
          }

          row._X_EXPAND = !row._X_EXPAND;
          this.tableData = tableData;
        }
      }

      return this.tableData;
    },

    /**
     * 展开/收起所有树节点
     */
    virtualAllExpand: function virtualAllExpand(expanded) {
      var _this9 = this;

      _xeUtils.default.eachTree(this.fullTreeData, function (row) {
        _this9.virtualExpand(row, expanded);
      }, this.treeConfig);

      return this.tableData;
    }
  }
};
exports.default = _default;