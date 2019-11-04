"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _table = _interopRequireDefault(require("../../table"));

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

var _vXETable = require("../../v-x-e-table");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
      sortData: {},
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
        data = this.data,
        proxyConfig = this.proxyConfig,
        proxyOpts = this.proxyOpts,
        pagerConfig = this.pagerConfig;
    var props = proxyOpts.props;

    if (customs) {
      this.tableCustoms = customs;
    }

    if (pagerConfig && pagerConfig.pageSize) {
      this.tablePage.pageSize = pagerConfig.pageSize;
    }

    if (data && proxyConfig) {
      console.warn('[vxe-grid] There is a conflict between the props proxy-config and data.');
    } // （v3.0 中废弃 proxyConfig.props.data）


    if (props && props.data) {
      console.warn('[vxe-grid] The property proxy-config.props.data is deprecated, please use proxy-config.props.result');
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
    var $tools = $scopedSlots.tools;

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
        $tools = toolbar.slots.tools || $tools;
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

    var toolbarScopedSlots = {};

    if ($buttons) {
      toolbarScopedSlots.buttons = $buttons;
    }

    if ($tools) {
      toolbarScopedSlots.tools = $tools;
    }

    return h('div', {
      class: ['vxe-grid', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 't--animat', props.optimization.animat), _ref)]
    }, [toolbar ? h('vxe-toolbar', {
      ref: 'toolbar',
      props: Object.assign({
        loading: loading || tableLoading
      }, toolbar),
      scopedSlots: toolbarScopedSlots
    }) : null, h('vxe-table', {
      props: props,
      on: tableOns,
      scopedSlots: $scopedSlots,
      ref: 'xTable'
    }, $slots.default), pagerConfig ? h('vxe-pager', {
      props: Object.assign({
        size: vSize,
        loading: loading || tableLoading
      }, pagerConfig, proxyConfig ? tablePage : {}),
      on: {
        'page-change': this.pageChangeEvent
      },
      ref: 'pager'
    }) : null]);
  },
  methods: _objectSpread({}, methods, {
    getParentHeight: function getParentHeight() {
      return this.$el.parentNode.clientHeight - this.getExcludeHeight();
    },

    /**
     * 获取需要排除的高度
     */
    getExcludeHeight: function getExcludeHeight() {
      var _this$$refs = this.$refs,
          toolbar = _this$$refs.toolbar,
          pager = _this$$refs.pager;
      return (toolbar && toolbar.$el ? toolbar.$el.offsetHeight : 0) + (pager && pager.$el ? pager.$el.offsetHeight : 0);
    },
    handleRowClassName: function handleRowClassName(params) {
      var rowClassName = this.rowClassName;
      var clss = [];

      if (this.pendingRecords.some(function (item) {
        return item === params.row;
      })) {
        clss.push('row--pending');
      }

      return clss.concat(rowClassName ? rowClassName(params) : []);
    },
    handleActiveMethod: function handleActiveMethod(params) {
      var activeMethod = this.editConfig.activeMethod;
      return this.pendingRecords.indexOf(params.row) === -1 && (!activeMethod || activeMethod(params));
    },
    commitProxy: function commitProxy(code) {
      var _this3 = this;

      var toolbar = this.toolbar,
          proxyOpts = this.proxyOpts,
          tablePage = this.tablePage,
          pagerConfig = this.pagerConfig,
          sortData = this.sortData,
          filterData = this.filterData,
          isMsg = this.isMsg;
      var _proxyOpts$ajax = proxyOpts.ajax,
          ajax = _proxyOpts$ajax === void 0 ? {} : _proxyOpts$ajax,
          _proxyOpts$props = proxyOpts.props,
          props = _proxyOpts$props === void 0 ? {} : _proxyOpts$props;

      var args = _xeUtils.default.slice(arguments, 1);

      switch (code) {
        case 'insert':
          this.insert();
          break;

        case 'insert_actived':
          this.insert().then(function (_ref2) {
            var row = _ref2.row;
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
          _tools.UtilTools.warn('vxe.error.toolbarDelBtn', ['export', 'export_csv | export_html']);

          this.exportData();
          break;

        case 'export_csv':
          this.exportData({
            type: 'csv'
          });
          break;

        case 'export_html':
          this.exportData({
            type: 'html'
          });
          break;

        case 'export_xml':
          this.exportData({
            type: 'xml'
          });
          break;

        case 'reset_custom':
          this.resetAll();
          break;

        case 'reload':
        case 'query':
          {
            if (ajax.query) {
              var params = {
                $grid: this,
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

                this.sortData = params.sort = {};
                this.filterData = params.filters = [];
                this.pendingRecords = [];
                this.clearAll();
              }

              return ajax.query.apply(this, [params].concat(args)).then(function (rest) {
                if (rest) {
                  if (pagerConfig) {
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
            } else {
              _tools.UtilTools.error('vxe.error.notFunc', [code]);
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
                    $grid: _this3,
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
                    _this3.$XModal.message({
                      id: code,
                      message: _conf.default.i18n('vxe.grid.selectOneRecord'),
                      status: 'warning'
                    });
                  }
                }
              });
            } else {
              _tools.UtilTools.error('vxe.error.notFunc', [code]);
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
                        $grid: _this3,
                        body: body
                      }].concat(args)).then(function () {
                        _this3.$XModal.message({
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
                          _this3.$XModal.message({
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
            } else {
              _tools.UtilTools.error('vxe.error.notFunc', [code]);
            }

            break;
          }

        default:
          var btnMethod = _vXETable.Buttons.get(code);

          if (btnMethod) {
            var button = toolbar ? _xeUtils.default.find(toolbar.buttons, function (item) {
              return item.code === code;
            }) : null;
            btnMethod.apply(this, [{
              code: code,
              button: button,
              $grid: this,
              $table: this.$refs.xTable
            }].concat(args));
          }

      }

      return this.$nextTick();
    },
    handleDeleteRow: function handleDeleteRow(code, alertKey, callback) {
      var selectRecords = this.getSelectRecords();

      if (this.isMsg) {
        if (selectRecords.length) {
          this.$XModal.confirm(_conf.default.i18n(alertKey)).then(function (type) {
            if (type === 'confirm') {
              callback();
            }
          });
        } else {
          this.$XModal.message({
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
    triggerToolbarBtnEvent: function triggerToolbarBtnEvent(button, evnt) {
      var code = button.code;
      this.commitProxy(code, evnt);

      _tools.UtilTools.emitEvent(this, 'toolbar-button-click', [{
        code: code,
        button: button,
        $grid: this
      }, evnt]);
    },
    triggerPendingEvent: function triggerPendingEvent(code) {
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
          this.$XModal.message({
            id: code,
            message: _conf.default.i18n('vxe.grid.selectOneRecord'),
            status: 'warning'
          });
        }
      }
    },
    pageChangeEvent: function pageChangeEvent(params) {
      var proxyConfig = this.proxyConfig,
          tablePage = this.tablePage;
      var currentPage = params.currentPage,
          pageSize = params.pageSize;
      tablePage.currentPage = currentPage;
      tablePage.pageSize = pageSize;

      if (params.type === 'current-change') {
        _tools.UtilTools.emitEvent(this, 'current-page-change', [currentPage]);
      } else {
        _tools.UtilTools.emitEvent(this, 'page-size-change', [pageSize]);
      }

      _tools.UtilTools.emitEvent(this, 'page-change', [Object.assign({
        $grid: this
      }, params)]);

      if (proxyConfig) {
        this.commitProxy('query');
      }
    },
    sortChangeEvent: function sortChangeEvent(params) {
      var proxyConfig = this.proxyConfig,
          remoteSort = this.remoteSort;
      var column = params.column;
      var isRemote = _xeUtils.default.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort; // 如果是服务端排序

      if (isRemote) {
        this.sortData = params;

        if (proxyConfig) {
          this.commitProxy('query');
        }
      }

      _tools.UtilTools.emitEvent(this, 'sort-change', [Object.assign({
        $grid: this
      }, params)]);
    },
    filterChangeEvent: function filterChangeEvent(params) {
      var remoteFilter = this.remoteFilter;
      var filters = params.filters; // 如果是服务端过滤

      if (remoteFilter) {
        this.filterData = filters;
        this.commitProxy('query');
      }

      _tools.UtilTools.emitEvent(this, 'filter-change', [Object.assign({
        $grid: this
      }, params)]);
    }
  })
};
exports.default = _default;