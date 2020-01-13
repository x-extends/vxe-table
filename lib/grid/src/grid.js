"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _table = _interopRequireDefault(require("../../table"));

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var methods = {};
var propKeys = Object.keys(_table.default.props);

function renderFormContent(h, _vm) {
  var $scopedSlots = _vm.$scopedSlots,
      proxyConfig = _vm.proxyConfig,
      proxyOpts = _vm.proxyOpts,
      formData = _vm.formData,
      formConfig = _vm.formConfig,
      formOpts = _vm.formOpts,
      formRender = _vm.formRender;

  if ($scopedSlots.form) {
    return $scopedSlots.form.call(_vm, {
      $grid: _vm
    }, h);
  }

  var compConf = formRender ? _vXETable.default.renderer.get(formRender.name) : null;

  if (compConf && compConf.renderForm) {
    return compConf.renderForm.call(_vm, h, formRender, formConfig.data, {
      $grid: _vm
    });
  }

  if (formOpts.items) {
    return [h('vxe-form', {
      props: {
        data: proxyConfig && proxyOpts.form ? formData : formConfig.data
      },
      on: {
        submit: _vm.submitEvent,
        reset: _vm.resetEvent
      },
      ref: 'form'
    }, formOpts.items.map(function (item) {
      return h('vxe-form-item', {
        props: item
      });
    }))];
  }

  return [];
}

Object.keys(_table.default.methods).forEach(function (name) {
  methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments);
  };
});
var _default = {
  name: 'VxeGrid',
  props: _objectSpread({
    columns: Array,
    pagerConfig: [Boolean, Object],
    proxyConfig: Object,
    toolbar: [Boolean, Object],
    toolbarRender: Object,
    formConfig: [Boolean, Object],
    formRender: Object
  }, _table.default.props),
  provide: function provide() {
    return {
      $grid: this
    };
  },
  data: function data() {
    return {
      tableLoading: false,
      maximize: false,
      tableData: [],
      pendingRecords: [],
      filterData: [],
      formData: {},
      sortData: {},
      tZindex: 0,
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
    pagerOpts: function pagerOpts() {
      return Object.assign({}, _conf.default.grid.pagerConfig, this.pagerConfig);
    },
    formOpts: function formOpts() {
      return Object.assign({}, _conf.default.grid.formConfig, this.formConfig, {
        rConfig: this.formRender
      });
    },
    toolbarOpts: function toolbarOpts() {
      return Object.assign({}, _conf.default.grid.toolbar, this.toolbar, {
        rConfig: this.toolbarRender
      });
    },
    toolbarSlots: function toolbarSlots() {
      var $scopedSlots = this.$scopedSlots,
          toolbar = this.toolbar,
          toolbarOpts = this.toolbarOpts;
      var $buttons = $scopedSlots.buttons;
      var $tools = $scopedSlots.tools;
      var slots = {};

      if (toolbar) {
        if (toolbarOpts.slots) {
          $buttons = toolbarOpts.slots.buttons || $buttons;
          $tools = toolbarOpts.slots.tools || $tools;
        }
      }

      if ($buttons) {
        slots.buttons = $buttons;
      }

      if ($tools) {
        slots.tools = $tools;
      }

      return slots;
    },
    renderClass: function renderClass() {
      var _ref;

      var tableProps = this.tableProps,
          vSize = this.vSize,
          maximize = this.maximize;
      return ['vxe-grid', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 't--animat', tableProps.optimization.animat), _defineProperty(_ref, 'is--maximize', maximize), _ref)];
    },
    renderStyle: function renderStyle() {
      return this.maximize ? {
        zIndex: this.tZindex
      } : null;
    },
    tableExtendProps: function tableExtendProps() {
      var _this = this;

      var rest = {};
      propKeys.forEach(function (key) {
        rest[key] = _this[key];
      });
      return rest;
    },
    tableProps: function tableProps() {
      var maximize = this.maximize,
          seqConfig = this.seqConfig,
          pagerConfig = this.pagerConfig,
          loading = this.loading,
          editConfig = this.editConfig,
          proxyConfig = this.proxyConfig,
          proxyOpts = this.proxyOpts,
          tableExtendProps = this.tableExtendProps,
          tableLoading = this.tableLoading,
          tablePage = this.tablePage,
          tableData = this.tableData,
          optimization = this.optimization;
      var props = Object.assign({}, tableExtendProps, {
        optimization: Object.assign({}, _conf.default.optimization, optimization)
      });

      if (maximize) {
        if (tableExtendProps.maxHeight) {
          props.maxHeight = 'auto';
        } else {
          props.height = 'auto';
        }
      }

      if (proxyConfig) {
        Object.assign(props, {
          loading: loading || tableLoading,
          data: tableData,
          rowClassName: this.handleRowClassName
        });

        if ((proxyOpts.seq || proxyOpts.index) && pagerConfig) {
          props.seqConfig = Object.assign({}, seqConfig, {
            startIndex: (tablePage.currentPage - 1) * tablePage.pageSize
          });
        }
      }

      if (editConfig) {
        props.editConfig = Object.assign({}, editConfig, {
          activeMethod: this.handleActiveMethod
        });
      }

      return props;
    },
    tableOns: function tableOns() {
      var $listeners = this.$listeners,
          proxyConfig = this.proxyConfig,
          proxyOpts = this.proxyOpts;
      var ons = Object.assign({}, $listeners);

      if (proxyConfig) {
        if (proxyOpts.sort) {
          ons['sort-change'] = this.sortChangeEvent;
        }

        if (proxyOpts.filter) {
          ons['filter-change'] = this.filterChangeEvent;
        }
      }

      return ons;
    },
    toolbarProps: function toolbarProps() {
      return Object.assign({
        loading: this.loading || this.tableLoading
      }, this.toolbarOpts);
    },
    pagerProps: function pagerProps() {
      return Object.assign({
        size: this.vSize,
        loading: this.loading || this.tableLoading
      }, this.pagerOpts, this.proxyConfig ? this.tablePage : {});
    }
  },
  watch: {
    columns: function columns(value) {
      var _this2 = this;

      this.$nextTick(function () {
        return _this2.loadColumn(value);
      });
    },
    proxyConfig: function proxyConfig() {
      this.initProxy();
    },
    pagerConfig: function pagerConfig() {
      this.initPages();
    }
  },
  created: function created() {
    var customs = this.customs,
        data = this.data,
        proxyConfig = this.proxyConfig,
        proxyOpts = this.proxyOpts;
    var props = proxyOpts.props;

    if (customs) {
      _tools.UtilTools.warn('vxe.error.removeProp', ['customs']);
    }

    if (data && proxyConfig) {
      console.warn('[vxe-grid] There is a conflict between the props proxy-config and data.');
    } // v3.0 中废弃 proxy-config.index


    if (proxyOpts.index) {
      _tools.UtilTools.warn('vxe.error.delProp', ['proxy-config.index', 'proxy-config.seq']);
    } // （v3.0 中废弃 proxyConfig.props.data）


    if (props && props.data) {
      _tools.UtilTools.warn('vxe.error.delProp', ['proxy-config.props.data', 'proxy-config.props.result']);
    }
  },
  mounted: function mounted() {
    if (this.columns && this.columns.length) {
      this.loadColumn(this.columns);
    }

    this.initPages();
    this.initProxy();
  },
  render: function render(h) {
    var $scopedSlots = this.$scopedSlots;
    return h('div', {
      class: this.renderClass,
      style: this.renderStyle
    }, [
    /**
     * 渲染表单
     */
    this.formConfig ? h('div', {
      ref: 'form',
      class: ['vxe-form--wrapper', {
        'is--loading': this.loading || this.tableLoading
      }]
    }, renderFormContent(h, this)) : null,
    /**
     * 渲染工具栏
     */
    this.toolbar ? h('vxe-toolbar', {
      ref: 'toolbar',
      props: this.toolbarProps,
      scopedSlots: this.toolbarSlots
    }) : null,
    /**
     * 渲染表格
     */
    h('vxe-table', {
      props: this.tableProps,
      on: this.tableOns,
      scopedSlots: $scopedSlots,
      ref: 'xTable'
    }, this.$slots.default),
    /**
     * 渲染分页
     */
    this.pagerConfig ? $scopedSlots.pager ? $scopedSlots.pager.call(this, {
      $grid: this
    }, h) : h('vxe-pager', {
      props: this.pagerProps,
      on: {
        'page-change': this.pageChangeEvent
      },
      ref: 'pager'
    }) : null]);
  },
  methods: _objectSpread({}, methods, {
    getParentHeight: function getParentHeight() {
      return (this.maximize ? _tools.DomTools.getDomNode().visibleHeight : this.$el.parentNode.clientHeight) - this.getExcludeHeight();
    },

    /**
     * 获取需要排除的高度
     */
    getExcludeHeight: function getExcludeHeight() {
      var _this$$refs = this.$refs,
          formElem = _this$$refs.form,
          toolbar = _this$$refs.toolbar,
          pager = _this$$refs.pager;
      return (formElem ? formElem.offsetHeight : 0) + (toolbar && toolbar.$el ? toolbar.$el.offsetHeight : 0) + (pager && pager.$el ? pager.$el.offsetHeight : 0);
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
    loadColumn: function loadColumn(columns) {
      var $scopedSlots = this.$scopedSlots;
      columns.forEach(function (column) {
        if (column.slots) {
          _xeUtils.default.each(column.slots, function (func, name, slots) {
            if (!_xeUtils.default.isFunction(func)) {
              if ($scopedSlots[func]) {
                slots[name] = $scopedSlots[func];
              } else {
                slots[name] = null;

                _tools.UtilTools.error('vxe.error.notSlot', [func]);
              }
            }
          });
        }
      });
      this.$refs.xTable.loadColumn(columns);
    },
    reloadColumn: function reloadColumn(columns) {
      this.clearAll();
      return this.loadColumn(columns);
    },
    initPages: function initPages() {
      if (this.pagerConfig && this.pagerOpts.pageSize) {
        this.tablePage.pageSize = this.pagerOpts.pageSize;
      }
    },
    initProxy: function initProxy() {
      var _this3 = this;

      var proxyInited = this.proxyInited,
          proxyConfig = this.proxyConfig,
          proxyOpts = this.proxyOpts,
          formConfig = this.formConfig,
          formOpts = this.formOpts;

      if (proxyConfig) {
        if (!proxyInited && proxyOpts.autoLoad !== false) {
          this.proxyInited = true;
          this.$nextTick(function () {
            return _this3.commitProxy('reload');
          });
        }

        if (formConfig && proxyOpts.form && formOpts.items) {
          var formData = {};
          formOpts.items.forEach(function (_ref2) {
            var field = _ref2.field;

            if (field) {
              formData[field] = null;
            }
          });
          this.formData = formData;
        }
      }
    },

    /**
     * 提交指令，支持 code 或 button
     * @param {String/Object} code 字符串或对象
     */
    commitProxy: function commitProxy(code) {
      var _this4 = this;

      var $refs = this.$refs,
          toolbar = this.toolbar,
          toolbarOpts = this.toolbarOpts,
          proxyOpts = this.proxyOpts,
          tablePage = this.tablePage,
          pagerConfig = this.pagerConfig,
          sortData = this.sortData,
          filterData = this.filterData,
          formData = this.formData,
          isMsg = this.isMsg;
      var beforeQuery = proxyOpts.beforeQuery,
          beforeDelete = proxyOpts.beforeDelete,
          afterDelete = proxyOpts.afterDelete,
          beforeSave = proxyOpts.beforeSave,
          afterSave = proxyOpts.afterSave,
          _proxyOpts$ajax = proxyOpts.ajax,
          ajax = _proxyOpts$ajax === void 0 ? {} : _proxyOpts$ajax,
          _proxyOpts$props = proxyOpts.props,
          props = _proxyOpts$props === void 0 ? {} : _proxyOpts$props;
      var $table = $refs.xTable;

      var args = _xeUtils.default.slice(arguments, 1);

      var button;

      if (_xeUtils.default.isString(code)) {
        var matchObj = toolbar ? _xeUtils.default.findTree(toolbarOpts.buttons, function (item) {
          return item.code === code;
        }, {
          children: 'dropdowns'
        }) : null;
        button = matchObj ? matchObj.item : null;
      } else {
        button = code;
        code = button.code;
      }

      var btnParams = button ? button.params : null;

      switch (code) {
        case 'insert':
          this.insert();
          break;

        case 'insert_actived':
          this.insert().then(function (_ref3) {
            var row = _ref3.row;
            return _this4.setActiveRow(row);
          });
          break;

        case 'mark_cancel':
          this.triggerPendingEvent(code);
          break;

        case 'delete_selection':
          this.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', function () {
            return _this4.commitProxy.apply(_this4, ['delete'].concat(args));
          });
          break;

        case 'remove_selection':
          this.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', function () {
            return _this4.removeSelecteds();
          });
          break;

        case 'import':
          this.importData(btnParams);
          break;

        case 'open_import':
          this.openImport(btnParams);
          break;

        case 'export':
          this.exportData(btnParams);
          break;

        case 'open_export':
          this.openExport(btnParams);
          break;

        case 'reset_custom':
          this.resetAll();
          break;

        case 'reload':
        case 'query':
          {
            var ajaxMethods = ajax.query;

            if (ajaxMethods) {
              var params = {
                code: code,
                button: button,
                $grid: this,
                sort: sortData,
                filters: filterData,
                form: formData,
                options: ajaxMethods
              };
              this.tableLoading = true;

              if (pagerConfig) {
                params.page = tablePage;
              }

              if (code === 'reload') {
                var defaultSort = $table.sortOpts.defaultSort;
                var sortParams = {};

                if (pagerConfig) {
                  tablePage.currentPage = 1;
                } // 如果使用默认排序


                if (defaultSort) {
                  sortParams = {
                    property: defaultSort.field,
                    field: defaultSort.field,
                    // v3 废弃 prop
                    prop: defaultSort.field,
                    order: defaultSort.order
                  };
                }

                this.sortData = params.sort = sortParams;
                this.filterData = params.filters = [];
                this.pendingRecords = [];
                this.clearAll();
              }

              return (beforeQuery || ajaxMethods).apply(this, [params].concat(args)).then(function (rest) {
                if (rest) {
                  if (pagerConfig) {
                    tablePage.total = _xeUtils.default.get(rest, props.total || 'page.total') || 0;
                    _this4.tableData = _xeUtils.default.get(rest, props.result || props.data || 'result') || [];
                  } else {
                    _this4.tableData = (props.list ? _xeUtils.default.get(rest, props.list) : rest) || [];
                  }
                } else {
                  _this4.tableData = [];
                }

                _this4.tableLoading = false;
              }).catch(function (e) {
                _this4.tableLoading = false;
                console.error(e);
              });
            } else {
              _tools.UtilTools.error('vxe.error.notFunc', [code]);
            }

            break;
          }

        case 'delete':
          {
            var _ajaxMethods = ajax.delete;

            if (_ajaxMethods) {
              var selectRecords = this.getCheckboxRecords();
              this.remove(selectRecords).then(function () {
                var removeRecords = _this4.getRemoveRecords();

                var body = {
                  removeRecords: removeRecords
                };
                var applyArgs = [{
                  $grid: _this4,
                  code: code,
                  button: button,
                  body: body,
                  options: _ajaxMethods
                }].concat(args);

                if (removeRecords.length) {
                  _this4.tableLoading = true;
                  return (beforeDelete || _ajaxMethods).apply(_this4, applyArgs).then(function (result) {
                    _this4.tableLoading = false;
                  }).catch(function (e) {
                    _this4.tableLoading = false;
                    console.error(e);
                  }).then(function () {
                    if (afterDelete) {
                      afterDelete.apply(_this4, applyArgs);
                    } else {
                      _this4.commitProxy('reload');
                    }
                  });
                } else {
                  if (isMsg && !selectRecords.length) {
                    _vXETable.default.$modal.message({
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
            var _ajaxMethods2 = ajax.save;

            if (_ajaxMethods2) {
              var body = Object.assign({
                pendingRecords: this.pendingRecords
              }, this.getRecordset());
              var insertRecords = body.insertRecords,
                  removeRecords = body.removeRecords,
                  updateRecords = body.updateRecords,
                  pendingRecords = body.pendingRecords;
              var applyArgs = [{
                $grid: this,
                code: code,
                button: button,
                body: body,
                options: _ajaxMethods2
              }].concat(args); // 排除掉新增且标记为删除的数据

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
                _this4.validate(body.insertRecords.concat(updateRecords), function (vaild) {
                  if (vaild) {
                    if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                      _this4.tableLoading = true;
                      resolve((beforeSave || _ajaxMethods2).apply(_this4, applyArgs).then(function () {
                        _vXETable.default.$modal.message({
                          id: code,
                          message: _conf.default.i18n('vxe.grid.saveSuccess'),
                          status: 'success'
                        });

                        _this4.tableLoading = false;
                      }).catch(function (e) {
                        _this4.tableLoading = false;
                        console.error(e);
                      }).then(function () {
                        if (afterSave) {
                          afterSave.apply(_this4, applyArgs);
                        } else {
                          _this4.commitProxy('reload');
                        }
                      }));
                    } else {
                      if (isMsg) {
                        // 直接移除未保存且标记为删除的数据
                        if (pendingRecords.length) {
                          _this4.remove(pendingRecords);
                        } else {
                          _vXETable.default.$modal.message({
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
          var btnMethod = _vXETable.default.commands.get(code);

          if (btnMethod) {
            btnMethod.apply(this, [{
              code: code,
              button: button,
              $grid: this,
              $table: $table
            }].concat(args));
          }

      }

      return this.$nextTick();
    },
    handleDeleteRow: function handleDeleteRow(code, alertKey, callback) {
      var selectRecords = this.getCheckboxRecords();

      if (this.isMsg) {
        if (selectRecords.length) {
          _vXETable.default.$modal.confirm(_conf.default.i18n(alertKey)).then(function (type) {
            if (type === 'confirm') {
              callback();
            }
          });
        } else {
          _vXETable.default.$modal.message({
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
      this.commitProxy(button, evnt);

      _tools.UtilTools.emitEvent(this, 'toolbar-button-click', [{
        code: button.code,
        button: button,
        $grid: this
      }, evnt]);
    },
    triggerPendingEvent: function triggerPendingEvent(code) {
      var pendingRecords = this.pendingRecords,
          isMsg = this.isMsg;
      var selectRecords = this.getCheckboxRecords();

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

        this.clearCheckboxRow();
      } else {
        if (isMsg) {
          _vXETable.default.$modal.message({
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
      var $table = params.$table,
          column = params.column;
      var isRemote = _xeUtils.default.isBoolean(column.remoteSort) ? column.remoteSort : $table.sortOpts.remote || remoteSort; // 如果是服务端排序

      if (isRemote) {
        this.sortData = {
          property: params.property,
          field: params.property,
          // v3 废弃 prop
          prop: params.property,
          order: params.order
        };

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
      var $table = params.$table,
          filters = params.filters; // 如果是服务端过滤

      if ($table.filterOpts.remote || remoteFilter) {
        this.filterData = filters;
        this.commitProxy('query');
      }

      _tools.UtilTools.emitEvent(this, 'filter-change', [Object.assign({
        $grid: this
      }, params)]);
    },
    submitEvent: function submitEvent(params, evnt) {
      var proxyConfig = this.proxyConfig;

      if (proxyConfig) {
        this.commitProxy('reload');
      }

      _tools.UtilTools.emitEvent(this, 'form-submit', [Object.assign({
        $grid: this
      }, params), evnt]);
    },
    resetEvent: function resetEvent(params, evnt) {
      _tools.UtilTools.emitEvent(this, 'form-reset', [Object.assign({
        $grid: this
      }, params), evnt]);
    },
    zoom: function zoom() {
      var _this5 = this;

      this.maximize = !this.maximize;

      if (this.maximize) {
        if (this.tZindex < _tools.UtilTools.getLastZIndex()) {
          this.tZindex = _tools.UtilTools.nextZIndex();
        }
      }

      return this.$nextTick().then(function () {
        return _this5.recalculate(true);
      }).then(function () {
        return _this5.maximize;
      });
    },
    isMaximized: function isMaximized() {
      return this.maximize;
    }
  })
};
exports.default = _default;