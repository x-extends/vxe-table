"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function renderBtn(h, _vm, compConf) {
  var _e = _vm._e,
      $scopedSlots = _vm.$scopedSlots,
      $grid = _vm.$grid,
      $table = _vm.$table,
      extraSlots = _vm.extraSlots,
      _vm$buttons = _vm.buttons,
      buttons = _vm$buttons === void 0 ? [] : _vm$buttons;

  if ($scopedSlots.buttons) {
    return $scopedSlots.buttons.call(_vm, {
      $grid: $grid,
      $table: $table
    }, h);
  }

  if (compConf && compConf.renderButtons) {
    return compConf.renderButtons.call(_vm, h, extraSlots, {
      $grid: $grid,
      $table: $table
    });
  }

  return buttons.map(function (item) {
    return item.visible === false ? _e() : h('vxe-button', {
      on: {
        click: function click(evnt) {
          return _vm.btnEvent(evnt, item);
        }
      },
      props: {
        icon: item.icon,
        type: item.type,
        disabled: item.disabled,
        loading: item.loading
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
                  return _vm.btnEvent(evnt, child);
                }
              },
              props: {
                icon: child.icon,
                type: child.type,
                disabled: child.disabled,
                loading: child.loading
              }
            }, _tools.UtilTools.getFuncText(child.name));
          });
        }
      } : null
    }, _tools.UtilTools.getFuncText(item.name));
  });
}
/**
 * 渲染右侧工具
 */


function renderRightTool(h, _vm, compConf) {
  var $scopedSlots = _vm.$scopedSlots,
      $grid = _vm.$grid,
      $table = _vm.$table,
      extraSlots = _vm.extraSlots;

  if ($scopedSlots.tools) {
    return $scopedSlots.tools.call(_vm, {
      $grid: $grid,
      $table: $table
    }, h);
  }

  if (compConf && compConf.renderTools) {
    return compConf.renderTools.call(_vm, h, extraSlots, {
      $grid: $grid,
      $table: $table
    });
  }

  return [];
}

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
    size: String,
    extraSlots: Object
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
      customStore: {
        isAll: false,
        isIndeterminate: false,
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
        refresh = this.refresh,
        resizable = this.resizable,
        custom = this.custom,
        setting = this.setting,
        id = this.id,
        refreshOpts = this.refreshOpts;

    if (customOpts.storage && !id) {
      return _tools.UtilTools.error('vxe.error.toolbarId');
    } // 在 v3 中废弃 setting


    if (setting) {
      _tools.UtilTools.warn('vxe.error.delProp', ['setting', 'custom']);
    }

    if (!_vXETable.default._export && (this.export || this.import)) {
      _tools.UtilTools.error('vxe.error.reqModule', ['Export']);
    }

    this.$nextTick(function () {
      _this.updateConf();

      var comp = _this.$grid || _this.$table;

      if (refresh && !_this.$grid && !refreshOpts.query) {
        _tools.UtilTools.warn('vxe.error.notFunc', ['query']);
      }

      if (comp) {
        comp.connect({
          toolbar: _this
        });
      } else {
        if (resizable || custom || setting) {
          throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
        }
      }

      _this.restoreCustomStorage();
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

    var $grid = this.$grid,
        extraSlots = this.extraSlots,
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
        vSize = this.vSize,
        tableFullColumn = this.tableFullColumn;
    var customBtnOns = {};
    var customWrapperOns = {};
    var compConf = extraSlots ? _vXETable.default.renderer.get(extraSlots.name) : null;

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
    }, renderBtn(h, this, compConf)), h('div', {
      class: 'vxe-tools--wrapper'
    }, renderRightTool(h, this, compConf)), h('div', {
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
    })]) : null, zoom && $grid ? h('div', {
      class: 'vxe-tools--operate-btn',
      attrs: {
        title: _conf.default.i18n("vxe.toolbar.zoom".concat($grid.isMaximized() ? 'Out' : 'In'))
      },
      on: {
        click: function click() {
          return $grid.zoom();
        }
      }
    }, [h('i', {
      class: $grid.isMaximized() ? zoomOpts.iconOut || _conf.default.icon.zoomOut : zoomOpts.iconIn || _conf.default.icon.zoomIn
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
      class: 'vxe-custom--header'
    }, [h('li', {
      class: {
        'is--checked': customStore.isAll,
        'is--indeterminate': customStore.isIndeterminate
      },
      attrs: {
        title: _conf.default.i18n('vxe.table.allTitle')
      },
      on: {
        click: this.allCustomEvent
      }
    }, _conf.default.i18n('vxe.toolbar.customAll'))]), h('ul', {
      class: 'vxe-custom--body',
      on: customWrapperOns
    }, tableFullColumn.map(function (column) {
      var colTitle = column.getTitle();
      var colKey = column.getKey();
      var isDisabled = customOpts.checkMethod ? !customOpts.checkMethod({
        column: column
      }) : false;
      return colTitle && colKey ? h('li', {
        class: ['vxe-custom--option', {
          'is--checked': column.visible,
          'is--disabled': isDisabled
        }],
        attrs: {
          title: colTitle
        },
        on: {
          click: function click() {
            if (!isDisabled) {
              column.visible = !column.visible;

              if ((custom || setting) && customOpts.immediate) {
                _this2.handleCustoms();
              }

              _this2.checkCustomStatus();
            }
          }
        }
      }, colTitle) : null;
    })), customOpts.isFooter === false ? null : h('div', {
      class: 'vxe-custom--footer'
    }, [h('button', {
      class: 'btn--confirm',
      on: {
        click: this.confirmCustomEvent
      }
    }, _conf.default.i18n('vxe.toolbar.customConfirm')), h('button', {
      class: 'btn--reset',
      on: {
        click: this.resetCustomEvent
      }
    }, _conf.default.i18n('vxe.toolbar.customReset'))])])]) : null])]);
  },
  methods: {
    updateConf: function updateConf() {
      var $children = this.$parent.$children;
      var selfIndex = $children.indexOf(this);
      this.$table = _xeUtils.default.find($children, function (comp, index) {
        return comp && comp.refreshColumn && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table';
      });
    },
    openCustom: function openCustom() {
      this.customStore.visible = true;
      this.checkCustomStatus();
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
    restoreCustomStorage: function restoreCustomStorage() {
      var $grid = this.$grid,
          $table = this.$table,
          id = this.id,
          resizable = this.resizable,
          custom = this.custom,
          setting = this.setting,
          resizableOpts = this.resizableOpts,
          customOpts = this.customOpts;

      if (resizable || custom || setting) {
        var customMap = {};
        var comp = $grid || $table;

        var _comp$getTableColumn = comp.getTableColumn(),
            fullColumn = _comp$getTableColumn.fullColumn;

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

        var keyMap = {};
        fullColumn.forEach(function (column) {
          var colKey = column.getKey();

          if (colKey) {
            keyMap[colKey] = column;
          }
        });

        _xeUtils.default.each(customMap, function (_ref2, field) {
          var visible = _ref2.visible,
              resizeWidth = _ref2.resizeWidth;
          var column = keyMap[field];

          if (column) {
            if (_xeUtils.default.isNumber(resizeWidth)) {
              column.resizeWidth = resizeWidth;
            }

            if (_xeUtils.default.isBoolean(visible)) {
              column.visible = visible;
            }
          }
        });

        comp.refreshColumn();
        this.tableFullColumn = fullColumn;
      }
    },

    /**
     * 暴露给 table 调用，用于关联列
     * @param {Array} fullColumn 所有列
     */
    updateColumns: function updateColumns(fullColumn) {
      this.tableFullColumn = fullColumn;
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
      var checkMethod = customOpts.checkMethod,
          storage = customOpts.storage,
          storageKey = customOpts.storageKey;

      if (storage) {
        var columnHideStorageMap = this.getStorageMap(storageKey);
        var colHides = [];
        tableFullColumn.forEach(function (column) {
          if (!column.visible && (!checkMethod || checkMethod({
            column: column
          }))) {
            var colKey = column.getKey();

            if (colKey) {
              colHides.push(colKey);
            }
          }
        });
        columnHideStorageMap[id] = colHides.join(',') || undefined;
        localStorage.setItem(storageKey, _xeUtils.default.toJSONString(columnHideStorageMap));
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
          tableFullColumn.forEach(function (column) {
            if (column.resizeWidth) {
              var colKey = column.getKey();

              if (colKey) {
                columnWidthStorage[colKey] = column.renderWidth;
              }
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
    confirmCustomEvent: function confirmCustomEvent() {
      this.closeCustom();
    },
    resetCustomEvent: function resetCustomEvent() {
      var checkMethod = this.customOpts.checkMethod;
      this.tableFullColumn.forEach(function (column) {
        if (!checkMethod || checkMethod({
          column: column
        })) {
          column.visible = true;
        }

        column.resizeWidth = 0;
      });
      this.resetCustoms();
      this.resetResizable();
      this.closeCustom();
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
    checkCustomStatus: function checkCustomStatus() {
      var checkMethod = this.customOpts.checkMethod;
      var tableFullColumn = this.tableFullColumn;
      this.customStore.isAll = tableFullColumn.every(function (column) {
        return (checkMethod ? !checkMethod({
          column: column
        }) : false) || column.visible;
      });
      this.customStore.isIndeterminate = !this.customStore.isAll && tableFullColumn.some(function (column) {
        return (!checkMethod || checkMethod({
          column: column
        })) && column.visible;
      });
    },
    allCustomEvent: function allCustomEvent() {
      var checkMethod = this.customOpts.checkMethod;
      var isAll = !this.customStore.isAll;
      this.tableFullColumn.forEach(function (column) {
        if (!checkMethod || checkMethod({
          column: column
        })) {
          column.visible = isAll;
        }
      });
      this.customStore.isAll = isAll;
      this.checkCustomStatus();
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
      this.checkCustomStatus();
    },
    handleMouseenterSettingEvent: function handleMouseenterSettingEvent(evnt) {
      this.customStore.activeBtn = true;
      this.openCustom();
    },
    handleMouseleaveSettingEvent: function handleMouseleaveSettingEvent(evnt) {
      var _this3 = this;

      var customStore = this.customStore;
      customStore.activeBtn = false;
      setTimeout(function () {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          _this3.closeCustom();
        }
      }, 300);
    },
    handleWrapperMouseenterEvent: function handleWrapperMouseenterEvent(evnt) {
      this.customStore.activeWrapper = true;
      this.openCustom();
    },
    handleWrapperMouseleaveEvent: function handleWrapperMouseleaveEvent(evnt) {
      var _this4 = this;

      var customStore = this.customStore;
      customStore.activeWrapper = false;
      setTimeout(function () {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          _this4.closeCustom();
        }
      }, 300);
    },
    refreshEvent: function refreshEvent() {
      var _this5 = this;

      var $grid = this.$grid,
          refreshOpts = this.refreshOpts,
          isRefresh = this.isRefresh;

      if (!isRefresh) {
        if (refreshOpts.query) {
          this.isRefresh = true;
          refreshOpts.query().catch(function (e) {
            return e;
          }).then(function () {
            _this5.isRefresh = false;
          });
        } else if ($grid) {
          this.isRefresh = true;
          $grid.commitProxy('reload').catch(function (e) {
            return e;
          }).then(function () {
            _this5.isRefresh = false;
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
          var commandMethod = _vXETable.default.commands.get(code);

          var params = {
            code: code,
            button: item,
            $grid: $grid,
            $table: $table
          };

          if (commandMethod) {
            commandMethod.call(this, params, evnt);
          }

          _tools.UtilTools.emitEvent(this, 'button-click', [params, evnt]);
        }
      }
    },
    importEvent: function importEvent() {
      var comp = this.$grid || this.$table;

      if (comp) {
        comp.openImport();
      } else {
        throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
      }
    },
    exportEvent: function exportEvent() {
      var comp = this.$grid || this.$table;

      if (comp) {
        comp.openExport(this.customOpts);
      } else {
        throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
      }
    }
  }
};
exports.default = _default2;