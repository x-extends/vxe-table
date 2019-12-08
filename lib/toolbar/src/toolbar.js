"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireWildcard(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxeToolbar',
  props: {
    id: String,
    loading: false,
    resizable: [Boolean, Object],
    refresh: [Boolean, Object],
    import: [Boolean, Object],
    export: [Boolean, Object],
    zoom: [Boolean, Object],
    setting: [Boolean, Object],
    custom: [Boolean, Object],
    buttons: {
      type: Array,
      default: function _default() {
        return _conf.default.toolbar.buttons;
      }
    },
    size: String
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
        mode: '',
        types: null,
        message: true
      },
      exportStore: {
        name: '',
        mode: '',
        columns: [],
        selectRecords: [],
        hasFooter: false,
        forceOriginal: false,
        visible: false,
        isTree: false
      },
      exportParams: {
        filename: '',
        sheetName: '',
        type: '',
        types: [],
        original: false,
        message: true,
        isHeader: false,
        isFooter: false
      },
      customStore: {
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
      return Object.assign({}, _conf.default.toolbar.export, this.export);
    },
    resizableOpts: function resizableOpts() {
      return Object.assign({
        storageKey: 'VXE_TABLE_CUSTOM_COLUMN_WIDTH'
      }, _conf.default.toolbar.resizable, this.resizable);
    },
    zoomOpts: function zoomOpts() {
      return Object.assign({}, _conf.default.toolbar.zoom, this.zoom);
    },
    customOpts: function customOpts() {
      return Object.assign({
        storageKey: 'VXE_TABLE_CUSTOM_COLUMN_HIDDEN'
      }, _conf.default.toolbar.custom || _conf.default.toolbar.setting, this.custom || this.setting);
    }
  },
  created: function created() {
    var _this = this;

    var customOpts = this.customOpts,
        setting = this.setting,
        id = this.id;

    if (customOpts.storage && !id) {
      return _tools.UtilTools.error('vxe.error.toolbarId');
    }

    if (setting) {
      _tools.UtilTools.warn('vxe.error.delProp', ['setting', 'custom']);
    }

    if (!_vXETable.default._export && (this.export || this.import)) {
      _tools.UtilTools.error('vxe.error.reqModule', ['Export']);
    }

    this.$nextTick(function () {
      _this.updateConf();

      _this.loadStorage();
    });

    _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'keydown');

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
        customStore = this.customStore,
        importOpts = this.importOpts,
        exportOpts = this.exportOpts,
        refresh = this.refresh,
        refreshOpts = this.refreshOpts,
        zoom = this.zoom,
        zoomOpts = this.zoomOpts,
        custom = this.custom,
        setting = this.setting,
        customOpts = this.customOpts,
        _this$buttons = this.buttons,
        buttons = _this$buttons === void 0 ? [] : _this$buttons,
        vSize = this.vSize,
        tableFullColumn = this.tableFullColumn,
        importStore = this.importStore,
        importParams = this.importParams,
        exportStore = this.exportStore,
        exportParams = this.exportParams;
    var customBtnOns = {};
    var customWrapperOns = {};
    var $buttons = $scopedSlots.buttons;
    var $tools = $scopedSlots.tools;

    if (custom || setting) {
      if (customOpts.trigger === 'manual') {// 手动触发
      } else if (customOpts.trigger === 'hover') {
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
          icon: item.icon,
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
                  icon: child.icon,
                  disabled: child.disabled
                }
              }, _tools.UtilTools.getFuncText(child.name));
            });
          }
        } : null
      }, _tools.UtilTools.getFuncText(item.name));
    })), $tools ? h('div', {
      class: 'vxe-tools--wrapper'
    }, $tools.call(this, {
      $grid: $grid,
      $table: $table
    }, h)) : null, h('div', {
      class: 'vxe-tools--operate'
    }, [this.import ? h('div', {
      class: 'vxe-tools--operate-btn',
      attrs: {
        title: _conf.default.i18n('vxe.toolbar.import')
      },
      on: {
        click: this.importEvent
      }
    }, [h('i', {
      class: importOpts.icon || _conf.default.icon.import
    })]) : null, this.export ? h('div', {
      class: 'vxe-tools--operate-btn',
      attrs: {
        title: _conf.default.i18n('vxe.toolbar.export')
      },
      on: {
        click: this.exportEvent
      }
    }, [h('i', {
      class: exportOpts.icon || _conf.default.icon.export
    })]) : null, refresh ? h('div', {
      class: 'vxe-tools--operate-btn',
      attrs: {
        title: _conf.default.i18n('vxe.toolbar.refresh')
      },
      on: {
        click: this.refreshEvent
      }
    }, [h('i', {
      class: this.isRefresh ? refreshOpts.iconLoading || _conf.default.icon.refreshLoading : refreshOpts.icon || _conf.default.icon.refresh
    })]) : null, zoom && this.$grid ? h('div', {
      class: 'vxe-tools--operate-btn',
      attrs: {
        title: _conf.default.i18n("vxe.toolbar.zoom".concat(this.$grid.isMaximized() ? 'Out' : 'In'))
      },
      on: {
        click: function click() {
          return _this2.$grid.zoom();
        }
      }
    }, [h('i', {
      class: this.$grid.isMaximized() ? zoomOpts.iconOut || _conf.default.icon.zoomOut : zoomOpts.iconIn || _conf.default.icon.zoomIn
    })]) : null, custom || setting ? h('div', {
      class: ['vxe-custom--wrapper', {
        'is--active': customStore.visible
      }],
      ref: 'customWrapper'
    }, [h('div', {
      class: 'vxe-tools--operate-btn',
      attrs: {
        title: _conf.default.i18n('vxe.toolbar.custom')
      },
      on: customBtnOns
    }, [h('i', {
      class: customOpts.icon || _conf.default.icon.custom
    })]), h('div', {
      class: 'vxe-custom--option-wrapper'
    }, [h('div', {
      class: 'vxe-custom--option',
      on: customWrapperOns
    }, tableFullColumn.map(function (column) {
      var visible = column.visible,
          own = column.own;

      var headerTitle = _tools.UtilTools.getFuncText(own.title || own.label);

      return headerTitle ? h('vxe-checkbox', {
        props: {
          value: visible,
          disabled: customOpts.checkMethod ? !customOpts.checkMethod({
            column: column
          }) : false
        },
        attrs: {
          title: headerTitle
        },
        on: {
          change: function change(value) {
            column.visible = value;

            if ((custom || setting) && customOpts.immediate) {
              _this2.handleCustoms();
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
        storeData: exportStore
      },
      on: {
        print: this.confirmPrintEvent,
        export: this.confirmExportEvent
      }
    }) : _e()]);
  },
  methods: {
    updateConf: function updateConf() {
      var $children = this.$parent.$children;
      var selfIndex = $children.indexOf(this);
      this.$table = _xeUtils.default.find($children, function (comp, index) {
        return comp && comp.refreshColumn && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table';
      });
    },
    openSetting: function openSetting() {
      this.customStore.visible = true;
    },
    closeCustom: function closeCustom() {
      var custom = this.custom,
          setting = this.setting,
          customStore = this.customStore;

      if (customStore.visible) {
        customStore.visible = false;

        if ((custom || setting) && !customStore.immediate) {
          this.handleCustoms();
        }
      }
    },
    loadStorage: function loadStorage() {
      var $grid = this.$grid,
          $table = this.$table,
          id = this.id,
          refresh = this.refresh,
          resizable = this.resizable,
          custom = this.custom,
          setting = this.setting,
          refreshOpts = this.refreshOpts,
          resizableOpts = this.resizableOpts,
          customOpts = this.customOpts;

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
        if (resizable || custom || setting) {
          throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
        }
      }

      if (resizable || custom || setting) {
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

        if (customOpts.storage) {
          var columnHideStorage = this.getStorageMap(customOpts.storageKey)[id];

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

      var comp = this.$grid || this.$table;

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
          customOpts = this.customOpts;

      if (customOpts.storage) {
        var columnHideStorageMap = this.getStorageMap(customOpts.storageKey);
        var colHides = tableFullColumn.filter(function (column) {
          return column.property && !column.visible;
        });
        columnHideStorageMap[id] = colHides.length ? colHides.map(function (column) {
          return column.property;
        }).join(',') : undefined;
        localStorage.setItem(customOpts.storageKey, _xeUtils.default.toJSONString(columnHideStorageMap));
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
      return this.handleCustoms();
    },
    showColumn: function showColumn(column) {
      _tools.UtilTools.warn('vxe.error.delFunc', ['showColumn', 'table.showColumn']);

      column.visible = true;
      return this.handleCustoms();
    },
    resetCustoms: function resetCustoms() {
      return this.handleCustoms();
    },
    resetResizable: function resetResizable() {
      this.updateResizable(this);
    },
    updateResizable: function updateResizable(isReset) {
      var comp = this.$grid || this.$table;
      this.saveColumnWidth(isReset);
      comp.analyColumnWidth();
      return comp.recalculate(true);
    },
    handleCustoms: function handleCustoms() {
      (this.$grid || this.$table).refreshColumn();
      return this.saveColumnHide();
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var isEsc = evnt.keyCode === 27;

      if (isEsc && this.$grid && this.$grid.isMaximized() && this.zoomOpts && this.zoomOpts.escRestore !== false) {
        this.$grid.zoom();
      }
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      if (!_tools.DomTools.getEventTargetNode(evnt, this.$refs.customWrapper).flag) {
        this.closeCustom();
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
      this.closeCustom();
    },
    handleClickSettingEvent: function handleClickSettingEvent(evnt) {
      this.customStore.visible = !this.customStore.visible;
    },
    handleMouseenterSettingEvent: function handleMouseenterSettingEvent(evnt) {
      this.customStore.activeBtn = true;
      this.openSetting();
    },
    handleMouseleaveSettingEvent: function handleMouseleaveSettingEvent(evnt) {
      var _this4 = this;

      var customStore = this.customStore;
      customStore.activeBtn = false;
      setTimeout(function () {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          _this4.closeCustom();
        }
      }, 300);
    },
    handleWrapperMouseenterEvent: function handleWrapperMouseenterEvent(evnt) {
      this.customStore.activeWrapper = true;
      this.openSetting();
    },
    handleWrapperMouseleaveEvent: function handleWrapperMouseleaveEvent(evnt) {
      var _this5 = this;

      var customStore = this.customStore;
      customStore.activeWrapper = false;
      setTimeout(function () {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          _this5.closeCustom();
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
      if (this.$grid || this.$table) {
        this.openImport();
      } else {
        throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
      }
    },
    openImport: function openImport(options) {
      var comp = this.$grid || this.$table;
      var defOpts = Object.assign({
        mode: 'covering',
        message: true
      }, options, this.importOpts);
      var isTree = !!comp.getTreeStatus();

      if (isTree) {
        if (defOpts.message) {
          this.$XModal.message({
            message: _conf.default.i18n('vxe.error.treeNotImp'),
            status: 'error'
          });
        }

        return;
      }

      Object.assign(this.importStore, {
        file: null,
        type: '',
        filename: '',
        visible: true
      });
      Object.assign(this.importParams, defOpts);
    },
    confirmImportEvent: function confirmImportEvent(options) {
      var comp = this.$grid || this.$table;
      comp.importByFile(this.importStore.file, options);
    },
    exportEvent: function exportEvent() {
      if (this.$grid || this.$table) {
        this.openExport();
      } else {
        throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
      }
    },
    openExport: function openExport(options) {
      var comp = this.$grid || this.$table;

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
      var isTree = !!treeStatus;
      var forceOriginal = isTree || virtualScroller.scrollX || virtualScroller.scrollY;
      var hasFooter = !!footerData.length;
      var defOpts = Object.assign({
        original: true,
        message: true
      }, this.exportOpts, options);
      var types = defOpts.types || _vXETable.default.exportTypes; // 处理类型

      defOpts.types = types.map(function (value) {
        return {
          value: value,
          label: "vxe.types.".concat(value)
        };
      }); // 索引列默认不选中

      exportColumns.forEach(function (column) {
        column.checked = column.type !== 'index';
      }); // 更新条件

      Object.assign(this.exportStore, {
        columns: exportColumns,
        selectRecords: selectRecords,
        mode: selectRecords.length ? 'selected' : 'all',
        forceOriginal: !!treeStatus || virtualScroller.scrollX || virtualScroller.scrollY,
        hasFooter: hasFooter,
        visible: true,
        isTree: isTree
      }); // 重置参数

      Object.assign(this.exportParams, {
        filename: defOpts.filename || '',
        sheetName: defOpts.sheetName || '',
        type: defOpts.type || defOpts.types[0].value,
        types: defOpts.types,
        original: forceOriginal || defOpts.original,
        message: defOpts.message,
        isHeader: true,
        isFooter: hasFooter
      });
      return this.$nextTick();
    },
    confirmPrintEvent: function confirmPrintEvent(options) {
      (this.$grid || this.$table).print(options);
    },
    confirmExportEvent: function confirmExportEvent(options) {
      (this.$grid || this.$table).exportData(options);
    }
  }
};
exports.default = _default2;