"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _table = _interopRequireDefault(require("../../table"));

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var methods = {};
var propKeys = Object.keys(_table.default.props);
Object.keys(_table.default.methods).forEach(function (name) {
  methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments);
  };
});
var _default = {
  name: 'VxeGrid',
  props: _objectSpread({
    columns: Array,
    pagerConfig: Object,
    proxyConfig: Object,
    toolbar: Object
  }, _table.default.props),
  provide: function provide() {
    return {
      $grid: this
    };
  },
  data: function data() {
    return {
      tableLoading: false,
      tableData: [],
      tableCustoms: [],
      pendingRecords: [],
      filterData: [],
      sortData: {
        field: '',
        order: ''
      },
      tablePage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isMsg: function isMsg() {
      return this.proxyOpts.message !== false;
    },
    proxyOpts: function proxyOpts() {
      return Object.assign({}, _conf.default.grid.proxyConfig, this.proxyConfig);
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
      this.loadColumn(value);
    },
    tableCustoms: function tableCustoms() {
      var $refs = this.$refs,
          toolbar = this.toolbar;

      if (toolbar && $refs.toolbar) {
        $refs.toolbar.loadStorage();
      }
    }
  },
  created: function created() {
    var customs = this.customs,
        pagerConfig = this.pagerConfig;

    if (customs) {
      this.tableCustoms = customs;
    }

    if (pagerConfig && pagerConfig.pageSize) {
      this.tablePage.pageSize = pagerConfig.pageSize;
    }
  },
  mounted: function mounted() {
    var columns = this.columns,
        proxyConfig = this.proxyConfig,
        proxyOpts = this.proxyOpts;

    if (columns && columns.length) {
      this.loadColumn(this.columns);
    }

    if (proxyConfig && proxyOpts.autoLoad !== false) {
      this.commitProxy('query');
    }
  },
  render: function render(h) {
    var _this2 = this,
        _ref;

    var $slots = this.$slots,
        $scopedSlots = this.$scopedSlots,
        $listeners = this.$listeners,
        pagerConfig = this.pagerConfig,
        vSize = this.vSize,
        loading = this.loading,
        toolbar = this.toolbar,
        editConfig = this.editConfig,
        proxyConfig = this.proxyConfig,
        proxyOpts = this.proxyOpts,
        tableProps = this.tableProps,
        tableLoading = this.tableLoading,
        tablePage = this.tablePage,
        tableData = this.tableData,
        tableCustoms = this.tableCustoms,
        optimization = this.optimization;
    var props = Object.assign({}, tableProps, {
      optimization: Object.assign({}, _conf.default.optimization, optimization)
    });
    var tableOns = Object.assign({}, $listeners);
    var $buttons = $scopedSlots.buttons;

    if (proxyConfig) {
      Object.assign(props, {
        loading: loading || tableLoading,
        data: tableData,
        rowClassName: this.handleRowClassName
      });

      if (proxyOpts.index && pagerConfig) {
        props.startIndex = (tablePage.currentPage - 1) * tablePage.pageSize;
      }

      if (proxyOpts.sort) {
        tableOns['sort-change'] = this.sortChangeEvent;
      }

      if (proxyOpts.filter) {
        tableOns['filter-change'] = this.filterChangeEvent;
      }
    }

    if (toolbar) {
      if (toolbar.slots) {
        $buttons = toolbar.slots.buttons || $buttons;
      }

      if (!(toolbar.setting && toolbar.setting.storage)) {
        props.customs = tableCustoms;
      }

      tableOns['update:customs'] = function (value) {
        _this2.tableCustoms = value;
      };
    }

    if (editConfig) {
      props.editConfig = Object.assign({}, editConfig, {
        activeMethod: this.handleActiveMethod
      });
    }

    return h('div', {
      class: ['vxe-grid', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 't--animat', props.optimization.animat), _ref)]
    }, [toolbar ? h('vxe-toolbar', {
      ref: 'toolbar',
      props: toolbar,
      scopedSlots: $buttons ? {
        buttons: $buttons
      } : null
    }) : null, h('vxe-table', {
      props: props,
      on: tableOns,
      ref: 'xTable'
    }, $slots.default), pagerConfig ? h('vxe-pager', {
      props: Object.assign({
        size: vSize,
        loading: loading || tableLoading
      }, pagerConfig, proxyConfig ? tablePage : {}),
      on: {
        'page-change': this.pageChangeEvent
      }
    }) : null]);
  },
  methods: _objectSpread({}, methods, {
    handleRowClassName: function handleRowClassName(_ref2) {
      var row = _ref2.row;

      if (this.pendingRecords.some(function (item) {
        return item === row;
      })) {
        return 'row--pending';
      }

      return '';
    },
    handleActiveMethod: function handleActiveMethod(_ref3) {
      var row = _ref3.row;
      return this.pendingRecords.indexOf(row) === -1;
    },
    commitProxy: function commitProxy(code) {
      var _this3 = this;

      var proxyOpts = this.proxyOpts,
          tablePage = this.tablePage,
          pagerConfig = this.pagerConfig,
          sortData = this.sortData,
          filterData = this.filterData,
          isMsg = this.isMsg;
      var ajax = proxyOpts.ajax,
          _proxyOpts$props = proxyOpts.props,
          props = _proxyOpts$props === void 0 ? {} : _proxyOpts$props;

      var args = _xeUtils.default.slice(arguments, 1);

      if (ajax) {
        switch (code) {
          case 'insert':
            this.insert();
            break;

          case 'insert_actived':
            this.insert().then(function (_ref4) {
              var row = _ref4.row;
              return _this3.setActiveRow(row);
            });
            break;

          case 'mark_cancel':
            this.triggerPendingEvent(code);
            break;

          case 'delete_selection':
            this.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', function () {
              return _this3.commitProxy.apply(_this3, ['delete'].concat(args));
            });
            break;

          case 'remove_selection':
            this.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', function () {
              return _this3.removeSelecteds();
            });
            break;

          case 'export':
            this.exportCsv();
            break;

          case 'reload':
          case 'query':
            {
              if (ajax.query) {
                var params = {
                  sort: sortData,
                  filters: filterData
                };
                this.tableLoading = true;

                if (pagerConfig) {
                  params.page = tablePage;
                }

                if (code === 'reload') {
                  if (pagerConfig) {
                    tablePage.currentPage = 1;
                  }

                  this.pendingRecords = [];
                }

                return ajax.query.apply(this, [params].concat(args)).then(function (rest) {
                  if (rest) {
                    if (pagerConfig) {
                      // （v3.0 中废弃 data）
                      tablePage.total = _xeUtils.default.get(rest, props.total || 'page.total') || 0;
                      _this3.tableData = _xeUtils.default.get(rest, props.result || props.data || 'result') || [];
                    } else {
                      _this3.tableData = (props.list ? _xeUtils.default.get(rest, props.list) : rest) || [];
                    }
                  } else {
                    _this3.tableData = [];
                  }

                  _this3.tableLoading = false;
                }).catch(function (e) {
                  _this3.tableLoading = false;
                });
              }

              break;
            }

          case 'delete':
            {
              if (ajax.delete) {
                var selectRecords = this.getSelectRecords();
                this.remove(selectRecords).then(function () {
                  var removeRecords = _this3.getRemoveRecords();

                  var body = {
                    removeRecords: removeRecords
                  };

                  if (removeRecords.length) {
                    _this3.tableLoading = true;
                    return ajax.delete.apply(_this3, [{
                      body: body
                    }].concat(args)).then(function (result) {
                      _this3.tableLoading = false;
                    }).catch(function (e) {
                      _this3.tableLoading = false;
                    }).then(function () {
                      return _this3.commitProxy('reload');
                    });
                  } else {
                    if (isMsg && !selectRecords.length) {
                      _this3.$XMsg.message({
                        id: code,
                        message: _conf.default.i18n('vxe.grid.selectOneRecord'),
                        status: 'warning'
                      });
                    }
                  }
                });
              }

              break;
            }

          case 'save':
            {
              if (ajax.save) {
                var body = Object.assign({
                  pendingRecords: this.pendingRecords
                }, this.getRecordset());
                var insertRecords = body.insertRecords,
                    removeRecords = body.removeRecords,
                    updateRecords = body.updateRecords,
                    pendingRecords = body.pendingRecords; // 排除掉新增且标记为删除的数据

                if (insertRecords.length) {
                  body.pendingRecords = pendingRecords.filter(function (row) {
                    return insertRecords.indexOf(row) === -1;
                  });
                } // 排除已标记为删除的数据


                if (pendingRecords.length) {
                  body.insertRecords = insertRecords.filter(function (row) {
                    return pendingRecords.indexOf(row) === -1;
                  });
                } // 只校验新增和修改的数据


                return new Promise(function (resolve) {
                  _this3.validate(body.insertRecords.concat(updateRecords), function (vaild) {
                    if (vaild) {
                      if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                        _this3.tableLoading = true;
                        resolve(ajax.save.apply(_this3, [{
                          body: body
                        }].concat(args)).then(function () {
                          _this3.$XMsg.message({
                            id: code,
                            message: _conf.default.i18n('vxe.grid.saveSuccess'),
                            status: 'success'
                          });

                          _this3.tableLoading = false;
                        }).catch(function (e) {
                          _this3.tableLoading = false;
                        }).then(function () {
                          return _this3.commitProxy('reload');
                        }));
                      } else {
                        if (isMsg) {
                          // 直接移除未保存且标记为删除的数据
                          if (pendingRecords.length) {
                            _this3.remove(pendingRecords);
                          } else {
                            _this3.$XMsg.message({
                              id: code,
                              message: _conf.default.i18n('vxe.grid.dataUnchanged'),
                              status: 'info'
                            });
                          }
                        }

                        resolve();
                      }
                    } else {
                      resolve(vaild);
                    }
                  });
                });
              }

              break;
            }
        }
      }

      return this.$nextTick();
    },
    handleDeleteRow: function handleDeleteRow(code, alertKey, callback) {
      var selectRecords = this.getSelectRecords();

      if (this.isMsg) {
        if (selectRecords.length) {
          this.$XMsg.confirm(_conf.default.i18n(alertKey)).then(callback).catch(function (e) {
            return e;
          });
        } else {
          this.$XMsg.message({
            id: code,
            message: _conf.default.i18n('vxe.grid.selectOneRecord'),
            status: 'warning'
          });
        }
      } else {
        if (selectRecords.length) {
          callback();
        }
      }
    },
    getPendingRecords: function getPendingRecords() {
      return this.pendingRecords;
    },
    triggerPendingEvent: function triggerPendingEvent(code, evnt) {
      var pendingRecords = this.pendingRecords,
          isMsg = this.isMsg;
      var selectRecords = this.getSelectRecords();

      if (selectRecords.length) {
        var plus = [];
        var minus = [];
        selectRecords.forEach(function (data) {
          if (pendingRecords.some(function (item) {
            return data === item;
          })) {
            minus.push(data);
          } else {
            plus.push(data);
          }
        });

        if (minus.length) {
          this.pendingRecords = pendingRecords.filter(function (item) {
            return minus.indexOf(item) === -1;
          }).concat(plus);
        } else if (plus.length) {
          this.pendingRecords = pendingRecords.concat(plus);
        }

        this.clearSelection();
      } else {
        if (isMsg) {
          this.$XMsg.message({
            id: code,
            message: _conf.default.i18n('vxe.grid.selectOneRecord'),
            status: 'warning'
          });
        }
      }
    },
    pageChangeEvent: function pageChangeEvent(params) {
      var tablePage = this.tablePage;
      var currentPage = params.currentPage,
          pageSize = params.pageSize;
      tablePage.currentPage = currentPage;
      tablePage.pageSize = pageSize;

      if (params.type === 'current-change') {
        _tools.UtilTools.emitEvent(this, 'current-page-change', [currentPage]);
      } else {
        _tools.UtilTools.emitEvent(this, 'page-size-change', [pageSize]);
      }

      _tools.UtilTools.emitEvent(this, 'page-change', [params]);

      this.commitProxy('query');
    },
    sortChangeEvent: function sortChangeEvent(params) {
      var remoteSort = this.remoteSort,
          sortData = this.sortData;
      var column = params.column;
      var isRemote = _xeUtils.default.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort; // 如果是服务端排序

      if (isRemote) {
        Object.assign(sortData, params);
        this.commitProxy('query');
      } else {
        _tools.UtilTools.emitEvent(this, 'sort-change', [params]);
      }
    },
    filterChangeEvent: function filterChangeEvent(params) {
      var remoteFilter = this.remoteFilter;
      var filters = params.filters; // 如果是服务端过滤

      if (remoteFilter) {
        this.filterData = filters;
        this.commitProxy('reload');
      } else {
        _tools.UtilTools.emitEvent(this, 'filter-change', [params]);
      }
    }
  })
};
exports.default = _default;