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
    exportParams: Object,
    exportStore: Object,
    exportOpts: Object
  },
  data: function data() {
    return {
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
    }
  },
  render: function render(h) {
    var exportParams = this.exportParams,
        exportStore = this.exportStore,
        exportOpts = this.exportOpts,
        modeList = this.modeList;
    return h('vxe-modal', {
      res: 'modal',
      model: {
        value: exportStore.visible,
        callback: function callback(value) {
          exportStore.visible = value;
        }
      },
      props: {
        title: _conf.default.i18n('vxe.toolbar.expTitle'),
        width: 520,
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
        value: exportParams.filename
      },
      on: {
        input: function input(evnt) {
          exportParams.filename = evnt.target.value;
        }
      }
    })])]), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expType')), h('td', [h('select', {
      on: {
        change: function change(evnt) {
          exportParams.type = evnt.target.value;
        }
      }
    }, exportOpts.types.map(function (type) {
      return h('option', {
        attrs: {
          value: type
        },
        domProps: {
          selected: exportParams.type === type
        }
      }, type);
    }))])]), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expMode')), h('td', [h('select', {
      on: {
        change: function change(evnt) {
          exportStore.mode = evnt.target.value;
        }
      }
    }, modeList.map(function (item) {
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
    }, exportStore.columns.map(function (column) {
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
      model: {
        value: exportParams.isHeader,
        callback: function callback(value) {
          exportParams.isHeader = value;
        }
      }
    }, _conf.default.i18n('vxe.toolbar.expOptHeader')), h('vxe-checkbox', {
      props: {
        disabled: !exportStore.hasFooter
      },
      model: {
        value: exportParams.isFooter,
        callback: function callback(value) {
          exportParams.isFooter = value;
        }
      }
    }, _conf.default.i18n('vxe.toolbar.expOptFooter')), h('vxe-checkbox', {
      props: {
        disabled: exportStore.forceOriginal
      },
      model: {
        value: exportParams.original,
        callback: function callback(value) {
          exportParams.original = value;
        }
      }
    }, _conf.default.i18n('vxe.toolbar.expOptOriginal'))])])]), h('div', {
      class: 'vxe-export--panel-btns'
    }, [h('vxe-button', {
      props: {
        type: 'primary'
      },
      on: {
        click: this.exportEvent
      }
    }, _conf.default.i18n('vxe.toolbar.expConfirm'))])])]);
  },
  methods: {
    showEvent: function showEvent() {
      var _this = this;

      this.$nextTick(function () {
        _this.$refs.filename.focus();
      });
    },
    exportEvent: function exportEvent() {
      var exportStore = this.exportStore,
          exportParams = this.exportParams;
      var options = Object.assign({
        columns: exportStore.columns.filter(function (column) {
          return column.checked;
        })
      }, exportParams);

      if (!options.filename) {
        options.filename = _conf.default.i18n('vxe.toolbar.expTitle');
      }

      if (exportStore.mode === 'selected') {
        options.data = exportStore.selectRecords;
      }

      exportStore.visible = false;
      this.$emit('export', options);
    }
  }
};
exports.default = _default;