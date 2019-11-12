"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'VxeExportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  data: function data() {
    return {
      isAll: false,
      isIndeterminate: false,
      modeList: [{
        value: 'all',
        label: 'vxe.toolbar.expAll'
      }, {
        value: 'selected',
        label: 'vxe.toolbar.expSelected'
      }]
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    showSheet: function showSheet() {
      return ['html', 'xml', 'xlsx'].includes(this.defaultOptions.type);
    }
  },
  render: function render(h) {
    var _this = this;

    var _e = this._e,
        isAll = this.isAll,
        isIndeterminate = this.isIndeterminate,
        showSheet = this.showSheet,
        defaultOptions = this.defaultOptions,
        storeData = this.storeData,
        modeList = this.modeList;
    return h('vxe-modal', {
      res: 'modal',
      model: {
        value: storeData.visible,
        callback: function callback(value) {
          storeData.visible = value;
        }
      },
      props: {
        title: _conf.default.i18n('vxe.toolbar.expTitle'),
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        maskClosable: true
      },
      on: {
        show: this.showEvent
      }
    }, [h('div', {
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
        value: defaultOptions.filename
      },
      on: {
        input: function input(evnt) {
          defaultOptions.filename = evnt.target.value;
        }
      }
    })])]), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expType')), h('td', [h('select', {
      on: {
        change: function change(evnt) {
          defaultOptions.type = evnt.target.value;
        }
      }
    }, defaultOptions.types.map(function (item) {
      return h('option', {
        attrs: {
          value: item.value
        },
        domProps: {
          selected: defaultOptions.type === item.value
        }
      }, _conf.default.i18n(item.label));
    }))])]), showSheet ? h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expSheetName')), h('td', [h('input', {
      attrs: {
        type: 'text',
        placeholder: _conf.default.i18n('vxe.toolbar.expSheetNamePlaceholder')
      },
      domProps: {
        value: defaultOptions.sheetName
      },
      on: {
        input: function input(evnt) {
          defaultOptions.sheetName = evnt.target.value;
        }
      }
    })])]) : _e(), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expMode')), h('td', [h('select', {
      on: {
        change: function change(evnt) {
          storeData.mode = evnt.target.value;
        }
      }
    }, modeList.map(function (item) {
      return h('option', {
        attrs: {
          value: item.value
        },
        domProps: {
          selected: storeData.mode === item.value
        }
      }, _conf.default.i18n(item.label));
    }))])]), h('tr', [h('td', [_conf.default.i18n('vxe.toolbar.expColumn')]), h('td', [h('div', {
      class: 'vxe-export--panel-column'
    }, [h('vxe-checkbox', {
      props: {
        indeterminate: isIndeterminate
      },
      model: {
        value: isAll,
        callback: function callback(value) {
          _this.isAll = value;
        }
      },
      on: {
        change: this.allColumnEvent
      }
    }, _conf.default.i18n('vxe.toolbar.expAllColumn')), h('ul', storeData.columns.map(function (column) {
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

            _this.checkStatus();
          }
        }
      }, _tools.UtilTools.getFuncText(own.title || own.label || (type === 'index' ? _conf.default.i18n('vxe.column.indexTitle') : '')));
    }))])])]), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expOpts')), h('td', [h('vxe-checkbox', {
      model: {
        value: defaultOptions.isHeader,
        callback: function callback(value) {
          defaultOptions.isHeader = value;
        }
      }
    }, _conf.default.i18n('vxe.toolbar.expOptHeader')), h('vxe-checkbox', {
      props: {
        disabled: !storeData.hasFooter
      },
      model: {
        value: defaultOptions.isFooter,
        callback: function callback(value) {
          defaultOptions.isFooter = value;
        }
      }
    }, _conf.default.i18n('vxe.toolbar.expOptFooter')), h('vxe-checkbox', {
      props: {
        disabled: storeData.forceOriginal
      },
      model: {
        value: defaultOptions.original,
        callback: function callback(value) {
          defaultOptions.original = value;
        }
      }
    }, _conf.default.i18n('vxe.toolbar.expOptOriginal'))])])]), h('div', {
      class: 'vxe-export--panel-btns'
    }, [h('vxe-button', {
      on: {
        click: this.printEvent
      }
    }, _conf.default.i18n('vxe.toolbar.expPrint')), h('vxe-button', {
      props: {
        type: 'primary'
      },
      on: {
        click: this.exportEvent
      }
    }, _conf.default.i18n('vxe.toolbar.expConfirm'))])])]);
  },
  methods: {
    checkStatus: function checkStatus() {
      var columns = this.storeData.columns;
      this.isAll = this.storeData.columns.every(function (column) {
        return column.checked;
      });
      this.isIndeterminate = !this.isAll && columns.some(function (column) {
        return column.checked;
      });
    },
    allColumnEvent: function allColumnEvent() {
      var isAll = this.isAll;
      this.storeData.columns.forEach(function (column) {
        column.checked = isAll;
      });
      this.checkStatus();
    },
    showEvent: function showEvent() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.$refs.filename.focus();
      });
      this.checkStatus();
    },
    getExportOptions: function getExportOptions() {
      var storeData = this.storeData,
          defaultOptions = this.defaultOptions;
      var opts = Object.assign({
        columns: storeData.columns.filter(function (column) {
          return column.checked;
        })
      }, defaultOptions);

      if (storeData.mode === 'selected') {
        opts.data = storeData.selectRecords;
      }

      return opts;
    },
    printEvent: function printEvent() {
      this.storeData.visible = false;
      this.$emit('print', this.getExportOptions());
    },
    exportEvent: function exportEvent() {
      this.storeData.visible = false;
      this.$emit('export', this.getExportOptions());
    }
  }
};
exports.default = _default;