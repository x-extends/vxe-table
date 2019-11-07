"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireWildcard(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxeToolbar',
  props: {
    id: String,
    loading: false,
    resizable: {
      type: [Boolean, Object],
      default: function _default() {
        return _conf.default.toolbar.resizable;
      }
    },
    refresh: {
      type: [Boolean, Object],
      default: function _default() {
        return _conf.default.toolbar.refresh;
      }
    },
    import: {
      type: [Boolean, Object],
      default: function _default() {
        return _conf.default.toolbar.import;
      }
    },
    export: {
      type: [Boolean, Object],
      default: function _default() {
        return _conf.default.toolbar.export;
      }
    },
    setting: {
      type: [Boolean, Object],
      default: function _default() {
        return _conf.default.toolbar.setting;
      }
    },
    buttons: {
      type: Array,
      default: function _default() {
        return _conf.default.toolbar.buttons;
      }
    },
    size: String,
    data: Array,
    customs: Array
  },
  inject: {
    $grid: {
      default: null
    }
  },
  data: function data() {
    return {
      $table: null,
      isRefresh: false,
      tableFullColumn: [],
      importStore: {
        file: null,
        type: '',
        filename: '',
        visible: false
      },
      importParams: {
        mode: ''
      },
      exportStore: {
        name: '',
        mode: '',
        columns: [],
        selectRecords: [],
        hasFooter: false,
        forceOriginal: false,
        visible: false
      },
      exportParams: {
        filename: '',
        sheetName: '',
        type: '',
        original: false,
        message: true,
        isHeader: false,
        isFooter: false
      },
      settingStore: {
        visible: false
      }
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    refreshOpts: function refreshOpts() {
      return Object.assign({}, _conf.default.toolbar.refresh, this.refresh);
    },
    importOpts: function importOpts() {
      return Object.assign({}, _conf.default.toolbar.import, this.import);
    },
    exportOpts: function exportOpts() {
      var opts = Object.assign({
        types: Object.keys(_vXETable.default.types)
      }, _conf.default.toolbar.export, this.export);
      opts.types = opts.types.map(function (value) {
        return {
          value: value,
          label: "vxe.types.".concat(value)
        };
      });
      return opts;
    },
    resizableOpts: function resizableOpts() {
      return Object.assign({
        storageKey: 'VXE_TABLE_CUSTOM_COLUMN_WIDTH'
      }, _conf.default.toolbar.resizable, this.resizable);
    },
    settingOpts: function settingOpts() {
      return Object.assign({
        storageKey: 'VXE_TABLE_CUSTOM_COLUMN_HIDDEN'
      }, _conf.default.toolbar.setting, this.setting);
    }
  },
  created: function created() {
    var _this = this;

    var settingOpts = this.settingOpts,
        id = this.id,
        customs = this.customs;

    if (customs) {
      this.tableFullColumn = customs;
    }

    if (settingOpts.storage && !id) {
      return _tools.UtilTools.error('vxe.error.toolbarId');
    }

    if (!_vXETable.default._export && (this.export || this.import)) {
      _tools.UtilTools.error('vxe.error.reqModule', ['Export']);
    }

    this.$nextTick(function () {
      _this.updateConf();

      _this.loadStorage();
    });

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'mousedown');

    _tools.GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref,
        _this2 = this;

    var _e = this._e,
        $scopedSlots = this.$scopedSlots,
        $grid = this.$grid,
        $table = this.$table,
        loading = this.loading,
        settingStore = this.settingStore,
        refresh = this.refresh,
        setting = this.setting,
        settingOpts = this.settingOpts,
        _this$buttons = this.buttons,
        buttons = _this$buttons === void 0 ? [] : _this$buttons,
        vSize = this.vSize,
        tableFullColumn = this.tableFullColumn,
        importStore = this.importStore,
        importParams = this.importParams,
        exportOpts = this.exportOpts,
        exportStore = this.exportStore,
        exportParams = this.exportParams;
    var customBtnOns = {};
    var customWrapperOns = {};
    var $buttons = $scopedSlots.buttons;
    var $tools = $scopedSlots.tools;

    if (setting) {
      if (settingOpts.trigger === 'manual') {// 手动触发
      } else if (settingOpts.trigger === 'hover') {
        // hover 触发
        customBtnOns.mouseenter = this.handleMouseenterSettingEvent;
        customBtnOns.mouseleave = this.handleMouseleaveSettingEvent;
        customWrapperOns.mouseenter = this.handleWrapperMouseenterEvent;
        customWrapperOns.mouseleave = this.handleWrapperMouseleaveEvent;
      } else {
        // 点击触发
        customBtnOns.click = this.handleClickSettingEvent;
      }
    }

    return h('div', {
      class: ['vxe-toolbar', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--loading', loading), _ref)]
    }, [h('div', {
      class: 'vxe-button--wrapper'
    }, $buttons ? $buttons.call(this, {
      $grid: $grid,
      $table: $table
    }, h) : buttons.map(function (item) {
      return item.visible === false ? _e() : h('vxe-button', {
        on: {
          click: function click(evnt) {
            return _this2.btnEvent(evnt, item);
          }
        },
        props: {
          disabled: item.disabled
        },
        scopedSlots: item.dropdowns && item.dropdowns.length ? {
          default: function _default() {
            return _tools.UtilTools.getFuncText(item.name);
          },
          dropdowns: function dropdowns() {
            return item.dropdowns.map(function (child) {
              return child.visible === false ? _e() : h('vxe-button', {
                on: {
                  click: function click(evnt) {
                    return _this2.btnEvent(evnt, child);
                  }
                },
                props: {
                  disabled: child.disabled
                }
              }, _tools.UtilTools.getFuncText(child.name));
            });
          }
        } : null
      }, _tools.UtilTools.getFuncText(item.name));
    })), h('div', {
      class: 'vxe-tools--operate'
    }, [this.import ? h('vxe-button', {
      class: 'vxe-export--btn',
      props: {
        type: 'text',
        icon: _conf.default.icon.import
      },
      on: {
        click: this.importEvent
      }
    }) : null, this.export ? h('vxe-button', {
      class: 'vxe-export--btn',
      props: {
        type: 'text',
        icon: _conf.default.icon.export
      },
      on: {
        click: this.exportEvent
      }
    }) : null, refresh ? h('vxe-button', {
      class: 'vxe-refresh--btn',
      props: {
        type: 'text',
        icon: _conf.default.icon.refresh,
        loading: this.isRefresh
      },
      on: {
        click: this.refreshEvent
      }
    }) : null, setting ? h('div', {
      class: ['vxe-custom--wrapper', {
        'is--active': settingStore.visible
      }],
      ref: 'customWrapper'
    }, [h('div', {
      class: 'vxe-custom--setting-btn',
      on: customBtnOns
    }, [h('i', {
      class: _conf.default.icon.custom
    })]), h('div', {
      class: 'vxe-custom--option-wrapper'
    }, [h('div', {
      class: 'vxe-custom--option',
      on: customWrapperOns
    }, tableFullColumn.map(function (column) {
      var property = column.property,
          visible = column.visible,
          own = column.own;

      var headerTitle = _tools.UtilTools.getFuncText(own.title || own.label);

      return property && headerTitle ? h('vxe-checkbox', {
        props: {
          value: visible
        },
        attrs: {
          title: headerTitle
        },
        on: {
          change: function change(value) {
            column.visible = value;

            if (setting && settingOpts.immediate) {
              _this2.updateSetting();
            }
          }
        }
      }, headerTitle) : null;
    }))])]) : null]), _vXETable.default._export ? h('vxe-import-panel', {
      props: {
        defaultOptions: importParams,
        storeData: importStore
      },
      on: {
        import: this.confirmImportEvent
      }
    }) : _e(), _vXETable.default._export ? h('vxe-export-panel', {
      props: {
        defaultOptions: exportParams,
        storeData: exportStore,
        typeList: exportOpts.types
      },
      on: {
        export: this.confirmExportEvent
      }
    }) : _e(), $tools ? h('div', {
      class: 'vxe-tools--wrapper'
    }, $tools.call(this, {
      $grid: $grid,
      $table: $table
    }, h)) : null]);
  },
  methods: {
    updateConf: function updateConf() {
      var $parent = this.$parent,
          data = this.data;
      var $children = $parent.$children;
      var selfIndex = $children.indexOf(this);
      this.$table = $children.find(function (comp, index) {
        return comp && comp.refreshColumn && index > selfIndex && (data ? comp.data === data : comp.$vnode.componentOptions.tag === 'vxe-table');
      });
    },
    openSetting: function openSetting() {
      this.settingStore.visible = true;
    },
    closeSetting: function closeSetting() {
      var setting = this.setting,
          settingStore = this.settingStore;

      if (settingStore.visible) {
        settingStore.visible = false;

        if (setting && !settingStore.immediate) {
          this.updateSetting();
        }
      }
    },
    loadStorage: function loadStorage() {
      var $grid = this.$grid,
          $table = this.$table,
          id = this.id,
          refresh = this.refresh,
          resizable = this.resizable,
          setting = this.setting,
          refreshOpts = this.refreshOpts,
          resizableOpts = this.resizableOpts,
          settingOpts = this.settingOpts;

      if (refresh && !$grid) {
        if (!refreshOpts.query) {
          _tools.UtilTools.warn('vxe.error.notFunc', ['query']);
        }
      }

      if ($grid || $table) {
        ($grid || $table).connect({
          toolbar: this
        });
      } else {
        if (resizable || setting) {
          throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
        }
      }

      if (resizable || setting) {
        var customMap = {};

        if (resizableOpts.storage) {
          var columnWidthStorage = this.getStorageMap(resizableOpts.storageKey)[id];

          if (columnWidthStorage) {
            _xeUtils.default.each(columnWidthStorage, function (resizeWidth, field) {
              customMap[field] = {
                field: field,
                resizeWidth: resizeWidth
              };
            });
          }
        }

        if (settingOpts.storage) {
          var columnHideStorage = this.getStorageMap(settingOpts.storageKey)[id];

          if (columnHideStorage) {
            columnHideStorage.split(',').forEach(function (field) {
              if (customMap[field]) {
                customMap[field].visible = false;
              } else {
                customMap[field] = {
                  field: field,
                  visible: false
                };
              }
            });
          }
        }

        var customList = Object.values(customMap);
        this.updateCustoms(customList.length ? customList : this.tableFullColumn);
      }
    },
    updateColumn: function updateColumn(fullColumn) {
      this.tableFullColumn = fullColumn;
    },
    updateCustoms: function updateCustoms(customs) {
      var _this3 = this;

      var $grid = this.$grid,
          $table = this.$table;
      var comp = $grid || $table;

      if (comp) {
        comp.reloadCustoms(customs).then(function (fullColumn) {
          _this3.tableFullColumn = fullColumn;
        });
      }
    },
    getStorageMap: function getStorageMap(key) {
      var version = _conf.default.version;

      var rest = _xeUtils.default.toStringJSON(localStorage.getItem(key));

      return rest && rest._v === version ? rest : {
        _v: version
      };
    },
    saveColumnHide: function saveColumnHide() {
      var id = this.id,
          tableFullColumn = this.tableFullColumn,
          settingOpts = this.settingOpts;

      if (settingOpts.storage) {
        var columnHideStorageMap = this.getStorageMap(settingOpts.storageKey);
        var colHides = tableFullColumn.filter(function (column) {
          return column.property && !column.visible;
        });
        columnHideStorageMap[id] = colHides.length ? colHides.map(function (column) {
          return column.property;
        }).join(',') : undefined;
        localStorage.setItem(settingOpts.storageKey, _xeUtils.default.toJSONString(columnHideStorageMap));
      }

      return this.$nextTick();
    },
    saveColumnWidth: function saveColumnWidth(isReset) {
      var id = this.id,
          tableFullColumn = this.tableFullColumn,
          resizableOpts = this.resizableOpts;

      if (resizableOpts.storage) {
        var columnWidthStorageMap = this.getStorageMap(resizableOpts.storageKey);
        var columnWidthStorage;

        if (!isReset) {
          columnWidthStorage = _xeUtils.default.isPlainObject(columnWidthStorageMap[id]) ? columnWidthStorageMap[id] : {};
          tableFullColumn.forEach(function (_ref2) {
            var property = _ref2.property,
                resizeWidth = _ref2.resizeWidth,
                renderWidth = _ref2.renderWidth;

            if (property && resizeWidth) {
              columnWidthStorage[property] = renderWidth;
            }
          });
        }

        columnWidthStorageMap[id] = _xeUtils.default.isEmpty(columnWidthStorage) ? undefined : columnWidthStorage;
        localStorage.setItem(resizableOpts.storageKey, _xeUtils.default.toJSONString(columnWidthStorageMap));
      }

      return this.$nextTick();
    },
    hideColumn: function hideColumn(column) {
      _tools.UtilTools.warn('vxe.error.delFunc', ['hideColumn', 'table.hideColumn']);

      column.visible = false;
      return this.updateSetting();
    },
    showColumn: function showColumn(column) {
      _tools.UtilTools.warn('vxe.error.delFunc', ['showColumn', 'table.showColumn']);

      column.visible = true;
      return this.updateSetting();
    },
    resetCustoms: function resetCustoms() {
      return this.updateSetting();
    },
    resetResizable: function resetResizable() {
      this.updateResizable(this);
    },
    updateResizable: function updateResizable(isReset) {
      var $grid = this.$grid,
          $table = this.$table;
      var comp = $grid || $table;
      this.saveColumnWidth(isReset);
      comp.analyColumnWidth();
      return comp.recalculate(true);
    },
    updateSetting: function updateSetting() {
      (this.$grid || this.$table).refreshColumn();
      return this.saveColumnHide();
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      if (!_tools.DomTools.getEventTargetNode(evnt, this.$refs.customWrapper).flag) {
        this.closeSetting();
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
      this.closeSetting();
    },
    handleClickSettingEvent: function handleClickSettingEvent(evnt) {
      var settingStore = this.settingStore;
      settingStore.visible = !settingStore.visible;
    },
    handleMouseenterSettingEvent: function handleMouseenterSettingEvent(evnt) {
      this.settingStore.activeBtn = true;
      this.openSetting();
    },
    handleMouseleaveSettingEvent: function handleMouseleaveSettingEvent(evnt) {
      var _this4 = this;

      var settingStore = this.settingStore;
      settingStore.activeBtn = false;
      setTimeout(function () {
        if (!settingStore.activeBtn && !settingStore.activeWrapper) {
          _this4.closeSetting();
        }
      }, 300);
    },
    handleWrapperMouseenterEvent: function handleWrapperMouseenterEvent(evnt) {
      this.settingStore.activeWrapper = true;
      this.openSetting();
    },
    handleWrapperMouseleaveEvent: function handleWrapperMouseleaveEvent(evnt) {
      var _this5 = this;

      var settingStore = this.settingStore;
      settingStore.activeWrapper = false;
      setTimeout(function () {
        if (!settingStore.activeBtn && !settingStore.activeWrapper) {
          _this5.closeSetting();
        }
      }, 300);
    },
    refreshEvent: function refreshEvent() {
      var _this6 = this;

      var $grid = this.$grid,
          refreshOpts = this.refreshOpts,
          isRefresh = this.isRefresh;

      if (!isRefresh) {
        if (refreshOpts.query) {
          this.isRefresh = true;
          refreshOpts.query().catch(function (e) {
            return e;
          }).then(function () {
            _this6.isRefresh = false;
          });
        } else if ($grid) {
          this.isRefresh = true;
          $grid.commitProxy('reload').catch(function (e) {
            return e;
          }).then(function () {
            _this6.isRefresh = false;
          });
        }
      }
    },
    btnEvent: function btnEvent(evnt, item) {
      var $grid = this.$grid,
          $table = this.$table;
      var code = item.code;

      if (code) {
        if ($grid) {
          $grid.triggerToolbarBtnEvent(item, evnt);
        } else {
          var btnMethod = _vXETable.Buttons.get(code);

          var params = {
            code: code,
            button: item,
            $grid: $grid,
            $table: $table
          };

          if (btnMethod) {
            btnMethod.call(this, params, evnt);
          }

          _tools.UtilTools.emitEvent(this, 'button-click', [params, evnt]);
        }
      }
    },
    importEvent: function importEvent() {
      this.openImport();
    },
    openImport: function openImport(options) {
      var importParams = this.importParams,
          importStore = this.importStore,
          importOpts = this.importOpts;
      var defOpts = Object.assign({
        mode: 'covering',
        message: true
      }, options, importOpts);
      Object.assign(importStore, {
        file: null,
        type: '',
        filename: '',
        visible: true
      });
      Object.assign(importParams, defOpts);
    },
    confirmImportEvent: function confirmImportEvent(options) {
      var $grid = this.$grid,
          $table = this.$table;
      var comp = $grid || $table;
      comp.importByFile(this.importStore.file, options);
    },
    exportEvent: function exportEvent() {
      this.openExport();
    },
    openExport: function openExport(options) {
      var $grid = this.$grid,
          $table = this.$table,
          exportOpts = this.exportOpts,
          exportStore = this.exportStore,
          exportParams = this.exportParams;
      var comp = $grid || $table;

      var _comp$getTableColumn = comp.getTableColumn(),
          fullColumn = _comp$getTableColumn.fullColumn;

      var _comp$getTableData = comp.getTableData(),
          footerData = _comp$getTableData.footerData;

      var selectRecords = comp.getSelectRecords();
      var virtualScroller = comp.getVirtualScroller();
      var exportColumns = fullColumn.filter(function (column) {
        return column.type === 'index' || column.property && ['checkbox', 'selection', 'radio'].indexOf(column.type) === -1;
      });
      var treeStatus = comp.getTreeStatus();
      var forceOriginal = !!treeStatus || virtualScroller.scrollX || virtualScroller.scrollY;
      var hasFooter = !!footerData.length;
      var defOpts = Object.assign({
        original: true,
        message: true
      }, options, exportOpts); // 索引列默认不选中

      exportColumns.forEach(function (column) {
        column.checked = column.type !== 'index';
      }); // 更新条件

      Object.assign(exportStore, {
        columns: exportColumns,
        selectRecords: selectRecords,
        mode: selectRecords.length ? 'selected' : 'all',
        forceOriginal: !!treeStatus || virtualScroller.scrollX || virtualScroller.scrollY,
        hasFooter: !!footerData.length,
        visible: true
      }); // 重置参数

      Object.assign(exportParams, {
        filename: defOpts.filename || '',
        sheetName: defOpts.sheetName || '',
        type: defOpts.type || defOpts.types[0].value,
        original: forceOriginal || defOpts.original,
        message: defOpts.message,
        isHeader: true,
        isFooter: hasFooter
      });
      return this.$nextTick();
    },
    confirmExportEvent: function confirmExportEvent(options) {
      var $grid = this.$grid,
          $table = this.$table;
      var comp = $grid || $table;
      comp.exportData(options);
    }
  }
};
exports.default = _default2;