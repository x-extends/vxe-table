"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

var _vXETable = require("../../v-x-e-table");

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
    exps: {
      type: [Boolean, Object],
      default: function _default() {
        return _conf.default.toolbar.exps;
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
      exportTypes: ['csv', 'html'],
      exportModes: [{
        value: 'all',
        label: 'vxe.toolbar.expAll'
      }, {
        value: 'selected',
        label: 'vxe.toolbar.expSelected'
      }],
      exportStore: {
        name: '',
        mode: ''
      },
      exportOpts: {
        filename: '',
        type: '',
        original: false,
        isHeader: false
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
    expsOpts: function expsOpts() {
      return Object.assign({}, _conf.default.toolbar.exps, this.exps);
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
        exps = this.exps,
        setting = this.setting,
        settingOpts = this.settingOpts,
        _this$buttons = this.buttons,
        buttons = _this$buttons === void 0 ? [] : _this$buttons,
        vSize = this.vSize,
        tableFullColumn = this.tableFullColumn;
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
    }, [exps ? h('vxe-button', {
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
    }))])]) : null]), $tools ? h('div', {
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

      if (resizable || setting) {
        if ($grid || $table) {
          ($grid || $table).connect({
            toolbar: this
          });
        } else {
          throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
        }

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
    exportEvent: function exportEvent() {
      var $grid = this.$grid,
          $table = this.$table,
          vSize = this.vSize,
          exportStore = this.exportStore,
          exportOpts = this.exportOpts,
          exportTypes = this.exportTypes,
          exportModes = this.exportModes;
      var comp = $grid || $table;

      var _comp$getTableColumn = comp.getTableColumn(),
          fullColumn = _comp$getTableColumn.fullColumn;

      var selectRecords = comp.getSelectRecords();
      var virtualScroller = comp.getVirtualScroller();
      var exportColumns = fullColumn.filter(function (column) {
        return column.type === 'index' || column.property && ['checkbox', 'selection', 'radio'].indexOf(column.type) === -1;
      });
      var original = virtualScroller.scrollX || virtualScroller.scrollY; // 重置条件

      exportStore.mode = selectRecords.length ? 'selected' : 'all';
      Object.assign(exportOpts, {
        filename: '',
        type: 'csv',
        original: original,
        isHeader: true
      });
      exportColumns.forEach(function (column) {
        column.checked = column.type !== 'index';
      });
      this.$XModal({
        title: _conf.default.i18n('vxe.toolbar.expTitle'),
        width: 520,
        mask: true,
        lockView: true,
        showFooter: false,
        maskClosable: true,
        size: vSize,
        slots: {
          default: function _default(params, h) {
            var $modal = params.$modal;
            return [h('div', {
              class: 'vxe-export--panel'
            }, [h('table', {
              attrs: {
                cellspacing: 0,
                cellpadding: 0,
                border: 0
              }
            }, [h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expName')), h('td', [h('input', {
              ref: 'filename',
              attrs: {
                type: 'text',
                placeholder: _conf.default.i18n('vxe.toolbar.expNamePlaceholder')
              },
              domProps: {
                value: exportOpts.filename
              },
              on: {
                input: function input(evnt) {
                  exportOpts.filename = evnt.target.value;
                }
              }
            })])]), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expType')), h('td', [h('select', {
              on: {
                change: function change(evnt) {
                  exportOpts.type = evnt.target.value;
                }
              }
            }, exportTypes.map(function (type) {
              return h('option', {
                attrs: {
                  value: type
                },
                domProps: {
                  selected: exportOpts.type === type
                }
              }, type);
            }))])]), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expMode')), h('td', [h('select', {
              on: {
                change: function change(evnt) {
                  exportStore.mode = evnt.target.value;
                }
              }
            }, exportModes.map(function (item) {
              return h('option', {
                attrs: {
                  value: item.value
                },
                domProps: {
                  selected: exportStore.mode === item.value
                }
              }, _conf.default.i18n(item.label));
            }))])]), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expColumn')), h('td', [h('ul', {
              class: 'vxe-export--panel-column'
            }, exportColumns.map(function (column) {
              var own = column.own,
                  checked = column.checked,
                  type = column.type;
              return h('li', {
                class: {
                  active: checked
                },
                on: {
                  click: function click() {
                    column.checked = !checked;
                  }
                }
              }, _tools.UtilTools.getFuncText(own.title || own.label || (type === 'index' ? _conf.default.i18n('vxe.column.indexTitle') : '')));
            }))])]), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expOpts')), h('td', [h('vxe-checkbox', {
              props: {
                size: vSize
              },
              model: {
                value: exportOpts.isHeader,
                callback: function callback(value) {
                  exportOpts.isHeader = value;
                }
              }
            }, _conf.default.i18n('vxe.toolbar.expOptHeader')), h('vxe-checkbox', {
              props: {
                size: vSize,
                disabled: original
              },
              model: {
                value: exportOpts.original,
                callback: function callback(value) {
                  exportOpts.original = value;
                }
              }
            }, _conf.default.i18n('vxe.toolbar.expOptOriginal'))])])]), h('div', {
              class: 'vxe-export--panel-btns'
            }, [h('vxe-button', {
              props: {
                type: 'primary',
                size: vSize
              },
              on: {
                click: function click() {
                  var options = Object.assign({
                    columns: exportColumns.filter(function (column) {
                      return column.checked;
                    })
                  }, exportOpts);

                  if (!options.filename) {
                    options.filename = _conf.default.i18n('vxe.toolbar.expTitle');
                  }

                  if (exportStore.mode === 'selected') {
                    options.data = selectRecords;
                  }

                  comp.exportData(options);
                  $modal.close();
                }
              }
            }, _conf.default.i18n('vxe.toolbar.expConfirm'))])])];
          }
        },
        events: {
          show: function show(_ref3) {
            var $modal = _ref3.$modal;
            $modal.$refs.filename.focus();
          }
        }
      });
    }
  }
};
exports.default = _default2;