"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _props = _interopRequireDefault(require("../../table/src/props"));

var _func = _interopRequireDefault(require("../../table/src/func"));

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var methods = {};
var propKeys = Object.keys(_props.default);

_func.default.forEach(function (name) {
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
  }, _props.default),
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
      filterData: {},
      sortData: {
        prop: '',
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
    isAlert: function isAlert() {
      return this.proxyConfig && this.proxyConfig.message !== false;
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
        proxyConfig = this.proxyConfig;

    if (columns && columns.length) {
      this.loadColumn(this.columns);
    }

    if (proxyConfig && proxyConfig.autoLoad !== false) {
      this.commitProxy('query');
    }
  },
  render: function render(h) {
    var _this2 = this,
        _ref;

    var $slots = this.$slots,
        $listeners = this.$listeners,
        pagerConfig = this.pagerConfig,
        vSize = this.vSize,
        loading = this.loading,
        toolbar = this.toolbar,
        editConfig = this.editConfig,
        proxyConfig = this.proxyConfig,
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

    if (proxyConfig) {
      Object.assign(props, {
        loading: loading || tableLoading,
        data: tableData,
        rowClassName: this.handleRowClassName
      });

      if (proxyConfig.index && pagerConfig) {
        props.startIndex = (tablePage.currentPage - 1) * tablePage.pageSize;
      }

      if (proxyConfig.sort) {
        tableOns['sort-change'] = this.sortChangeEvent;
      }

      if (proxyConfig.filter) {
        tableOns['filter-change'] = this.filterChangeEvent;
      }
    }

    if (toolbar) {
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
      props: toolbar
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
        'current-change': this.currentChangeEvent,
        'size-change': this.sizeChangeEvent
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

      var _this$proxyConfig = this.proxyConfig,
          proxyConfig = _this$proxyConfig === void 0 ? {} : _this$proxyConfig,
          tablePage = this.tablePage,
          pagerConfig = this.pagerConfig,
          sortData = this.sortData,
          filterData = this.filterData,
          isAlert = this.isAlert;
      var ajax = proxyConfig.ajax,
          _proxyConfig$props = proxyConfig.props,
          props = _proxyConfig$props === void 0 ? {} : _proxyConfig$props;

      if (ajax) {
        switch (code) {
          case 'reload':
          case 'query':
            {
              if (ajax.query) {
                var params = {
                  sort: sortData,
                  filter: filterData
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

                return ajax.query(params).then(function (result) {
                  if (result) {
                    if (pagerConfig) {
                      tablePage.total = _xeUtils.default.get(result, props.total || 'page.total');
                      _this3.tableData = _xeUtils.default.get(result, props.data || 'result');
                    } else {
                      _this3.tableData = props.data ? _xeUtils.default.get(result, props.data) : result;
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
                    return ajax.delete({
                      body: body
                    }).then(function (result) {
                      _this3.tableLoading = false;
                    }).catch(function (e) {
                      _this3.tableLoading = false;
                    }).then(function () {
                      return _this3.commitProxy('reload');
                    });
                  } else {
                    if (isAlert && !selectRecords.length) {
                      _this3.$XMsg.alert(_conf.default.i18n('vxe.grid.selectOneRecord')).catch(function (e) {
                        return e;
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
                }, this.getAllRecords());
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
                        resolve(ajax.save({
                          body: body
                        }).then(function () {
                          _this3.tableLoading = false;
                        }).catch(function (e) {
                          _this3.tableLoading = false;
                        }).then(function () {
                          return _this3.commitProxy('reload');
                        }));
                      } else {
                        if (isAlert) {
                          // 直接移除未保存且标记为删除的数据
                          if (pendingRecords.length) {
                            _this3.remove(pendingRecords);
                          } else {
                            _this3.$XMsg.alert(_conf.default.i18n('vxe.grid.dataUnchanged')).catch(function (e) {
                              return e;
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
    getPendingRecords: function getPendingRecords() {
      return this.pendingRecords;
    },
    triggerPendingEvent: function triggerPendingEvent(evnt) {
      var pendingRecords = this.pendingRecords,
          isAlert = this.isAlert;
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
        if (isAlert) {
          this.$XMsg.alert(_conf.default.i18n('vxe.grid.selectOneRecord')).catch(function (e) {
            return e;
          });
        }
      }
    },
    currentChangeEvent: function currentChangeEvent(currentPage) {
      this.tablePage.currentPage = currentPage;
      this.commitProxy('query');

      _tools.UtilTools.emitEvent(this, 'current-page-change', [currentPage]);
    },
    sizeChangeEvent: function sizeChangeEvent(pageSize) {
      this.tablePage.currentPage = 1;
      this.tablePage.pageSize = pageSize;
      this.commitProxy('reload');

      _tools.UtilTools.emitEvent(this, 'page-size-change', [pageSize]);
    },
    sortChangeEvent: function sortChangeEvent(_ref4) {
      var column = _ref4.column,
          prop = _ref4.prop,
          order = _ref4.order;
      var sortData = this.sortData; // 如果是服务端排序

      if (column.remoteSort) {
        sortData.prop = prop;
        sortData.order = order;
        this.commitProxy('query');
      } else {
        _tools.UtilTools.emitEvent(this, 'sort-change', [column, prop, order]);
      }
    },
    filterChangeEvent: function filterChangeEvent(_ref5) {
      var column = _ref5.column,
          prop = _ref5.prop,
          values = _ref5.values;

      // 如果是服务端过滤
      if (column.remoteFilter) {
        this.filterData[prop] = values;
        this.commitProxy('reload');
      } else {
        _tools.UtilTools.emitEvent(this, 'filter-change', [column, prop, values]);
      }
    }
  })
};
exports.default = _default;