"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxeToolbar',
  props: {
    id: String,
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
      tableCustoms: [],
      settingStore: {
        visible: false
      }
    };
  },
  computed: {
    $table: function $table() {
      var $parent = this.$parent,
          data = this.data;
      var $children = $parent.$children;
      var selfIndex = $children.indexOf(this);
      return $children.find(function (comp, index) {
        return comp && comp.refreshColumn && index > selfIndex && (data ? comp.data === data : comp.$vnode.componentOptions.tag === 'vxe-table');
      });
    },
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isStorage: function isStorage() {
      return this.setting && this.setting.storage;
    },
    storageKey: function storageKey() {
      return _conf.default.toolbar.storageKey || 'VXE_TABLE_CUSTOM_HIDDEN';
    }
  },
  created: function created() {
    var _this = this;

    var isStorage = this.isStorage,
        id = this.id,
        customs = this.customs,
        setting = this.setting;

    if (customs) {
      this.tableCustoms = customs;
    }

    if (isStorage && !id) {
      throw new Error('[vxe-table] Toolbar must have a unique primary id.');
    }

    if (setting) {
      this.$nextTick(function () {
        return _this.loadStorage();
      });
    }

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'mousedown');

    _tools.GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _this2 = this;

    var $slots = this.$slots,
        settingStore = this.settingStore,
        setting = this.setting,
        _this$buttons = this.buttons,
        buttons = _this$buttons === void 0 ? [] : _this$buttons,
        vSize = this.vSize,
        tableCustoms = this.tableCustoms;
    var customBtnOns = {};
    var customWrapperOns = {};

    if (setting) {
      if (setting.trigger === 'manual') {// 手动触发
      } else if (setting.trigger === 'hover') {
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
      class: ['vxe-toolbar', _defineProperty({}, "size--".concat(vSize), vSize)]
    }, [h('div', {
      class: 'vxe-button--wrapper'
    }, $slots.buttons ? $slots.buttons : buttons.map(function (item) {
      return h('vxe-button', {
        on: {
          click: function click(evnt) {
            return _this2.btnEvent(item, evnt);
          }
        }
      }, _xeUtils.default.isFunction(item.name) ? item.name() : item.name);
    })), setting ? h('div', {
      class: ['vxe-custom--wrapper', {
        'is--active': settingStore.visible
      }],
      ref: 'customWrapper'
    }, [h('div', {
      class: 'vxe-custom--setting-btn',
      on: customBtnOns
    }, [h('i', {
      class: 'vxe-icon--menu'
    })]), h('div', {
      class: 'vxe-custom--option-wrapper'
    }, [h('div', {
      class: 'vxe-custom--option',
      on: customWrapperOns
    }, tableCustoms.map(function (column) {
      return column.property && column.label ? h('vxe-checkbox', {
        props: {
          value: column.visible
        },
        on: {
          change: function change(value) {
            column.visible = value;

            if (setting && setting.immediate) {
              _this2.updateSetting();
            }
          }
        }
      }, column.label) : null;
    }))])]) : null]);
  },
  methods: {
    openSetting: function openSetting() {
      this.settingStore.visible = true;
    },
    closeSetting: function closeSetting() {
      var setting = this.setting,
          settingStore = this.settingStore;

      if (settingStore.visible) {
        settingStore.visible = false;

        if (setting && !setting.immediate) {
          this.updateSetting();
        }
      }
    },
    loadStorage: function loadStorage() {
      if (this.isStorage) {
        var customStorageMap = this.getStorageMap();
        var customStorage = customStorageMap[this.id];

        if (customStorage) {
          this.updateCustoms(customStorage.split(',').map(function (prop) {
            return {
              prop: prop,
              visible: false
            };
          }));
        } else {
          this.updateCustoms(this.tableCustoms);
        }
      } else {
        this.updateCustoms(this.tableCustoms);
      }
    },
    updateCustoms: function updateCustoms(customs) {
      var _this3 = this;

      var $grid = this.$grid,
          $table = this.$table;
      var comp = $grid || $table;

      if (comp) {
        comp.reloadCustoms(customs).then(function (customs) {
          _this3.tableCustoms = customs;
        });
      }
    },
    getStorageMap: function getStorageMap() {
      var version = _conf.default.version;

      var rest = _xeUtils.default.toStringJSON(localStorage.getItem(this.storageKey));

      return rest && rest._v === version ? rest : {
        _v: version
      };
    },
    saveStorageMap: function saveStorageMap() {
      var id = this.id,
          tableCustoms = this.tableCustoms,
          isStorage = this.isStorage,
          storageKey = this.storageKey;

      if (isStorage) {
        var customStorageMap = this.getStorageMap();
        customStorageMap[id] = tableCustoms.filter(function (column) {
          return !column.visible;
        }).map(function (column) {
          return column.property;
        }).join(',') || undefined;
        localStorage.setItem(storageKey, _xeUtils.default.toJSONString(customStorageMap));
      }

      return this.$nextTick();
    },
    hideColumn: function hideColumn(column) {
      column.visible = false;
      return this.updateSetting();
    },
    showColumn: function showColumn(column) {
      var tableCustoms = this.tableCustoms;

      if (column) {
        column.visible = true;
      } else {
        tableCustoms.forEach(function (column) {
          column.visible = true;
        });
      }

      return this.updateSetting();
    },
    updateSetting: function updateSetting() {
      var $grid = this.$grid,
          $table = this.$table;

      if ($grid || $table) {
        ($grid || $table).refreshColumn();
        return this.saveStorageMap();
      }

      throw new Error('[vxe-toolbar] Not found vxe-table.');
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
    btnEvent: function btnEvent(item, evnt) {
      var $grid = this.$grid;
      var code = item.code; // 只对 gird 环境中有效

      if ($grid) {
        switch (code) {
          case 'insert':
            $grid.insert();
            break;

          case 'insert_actived':
            $grid.insert().then(function (_ref2) {
              var row = _ref2.row;
              return $grid.setActiveRow(row);
            });
            break;

          case 'mark_cancel':
            $grid.triggerPendingEvent(code, evnt);
            break;

          case 'delete_selection':
            {
              this.handleDeleteRow($grid, code, 'vxe.grid.deleteSelectRecord', function () {
                return $grid.commitProxy('delete');
              });
              break;
            }

          case 'remove_selection':
            {
              this.handleDeleteRow($grid, code, 'vxe.grid.removeSelectRecord', function () {
                return $grid.removeSelecteds();
              });
              break;
            }

          case 'save':
            $grid.commitProxy('save');
            break;

          case 'reload':
            $grid.commitProxy('reload');
            break;

          case 'export':
            $grid.exportCsv();
            break;
        }

        _tools.UtilTools.emitEvent($grid, 'toolbar-button-click', [{
          button: item,
          $grid: $grid
        }, evnt]);
      }
    },
    handleDeleteRow: function handleDeleteRow($grid, code, alertKey, callback) {
      var selectRecords = $grid.getSelectRecords();

      if ($grid.isMsg) {
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
    }
  }
};
exports.default = _default2;