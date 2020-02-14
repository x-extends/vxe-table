"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'VxeImportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    selectName: function selectName() {
      return "".concat(this.storeData.filename, ".").concat(this.storeData.type);
    },
    hasFile: function hasFile() {
      return this.storeData.file && this.storeData.type;
    },
    parseTypeLabel: function parseTypeLabel() {
      var storeData = this.storeData;

      if (storeData.type) {
        return _conf.default.i18n("vxe.types.".concat(storeData.type));
      }

      return "*.".concat((this.defaultOptions.types || _vXETable.default.importTypes).join(', *.'));
    }
  },
  render: function render(h) {
    var hasFile = this.hasFile,
        parseTypeLabel = this.parseTypeLabel,
        defaultOptions = this.defaultOptions,
        storeData = this.storeData,
        selectName = this.selectName;
    return h('vxe-modal', {
      res: 'modal',
      model: {
        value: storeData.visible,
        callback: function callback(value) {
          storeData.visible = value;
        }
      },
      props: {
        title: _conf.default.i18n('vxe.toolbar.impTitle'),
        width: 440,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true
      }
    }, [h('div', {
      class: 'vxe-export--panel'
    }, [h('table', {
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }
    }, [h('tr', [h('td', _conf.default.i18n('vxe.toolbar.impFile')), h('td', [hasFile ? h('div', {
      class: 'vxe-import-selected--file',
      attrs: {
        title: selectName
      }
    }, [h('span', selectName), h('i', {
      class: _conf.default.icon.importRemove,
      on: {
        click: this.clearFileEvent
      }
    })]) : h('span', {
      class: 'vxe-import-select--file',
      on: {
        click: this.selectFileEvent
      }
    }, _conf.default.i18n('vxe.toolbar.impSelect'))])]), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.impType')), h('td', parseTypeLabel)]), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.impOpts')), h('td', [h('vxe-radio-group', {
      model: {
        value: defaultOptions.mode,
        callback: function callback(value) {
          defaultOptions.mode = value;
        }
      }
    }, [h('vxe-radio', {
      props: {
        label: 'covering',
        title: _conf.default.i18n('vxe.toolbar.impCoveringTitle')
      }
    }, _conf.default.i18n('vxe.toolbar.impModeCovering')), h('vxe-radio', {
      props: {
        label: 'append',
        title: _conf.default.i18n('vxe.toolbar.impAppendTitle')
      }
    }, _conf.default.i18n('vxe.toolbar.impModeAppend'))])])])]), h('div', {
      class: 'vxe-export--panel-btns'
    }, [h('vxe-button', {
      props: {
        status: 'primary',
        disabled: !hasFile
      },
      on: {
        click: this.importEvent
      }
    }, _conf.default.i18n('vxe.toolbar.impConfirm'))])])]);
  },
  methods: {
    clearFileEvent: function clearFileEvent() {
      Object.assign(this.storeData, {
        filename: '',
        sheetName: '',
        type: ''
      });
    },
    selectFileEvent: function selectFileEvent() {
      var _this = this;

      var _this$$parent = this.$parent,
          $xegrid = _this$$parent.$xegrid,
          $xetable = _this$$parent.$xetable;
      var comp = $xegrid || $xetable;

      if (comp) {
        comp.readFile(this.defaultOptions).then(function (evnt) {
          var file = evnt.target.files[0];
          Object.assign(_this.storeData, _tools.UtilTools.parseFile(file), {
            file: file
          });
        }).catch(function (e) {
          return e;
        });
      }
    },
    importEvent: function importEvent() {
      var storeData = this.storeData,
          defaultOptions = this.defaultOptions;
      var opts = Object.assign({}, defaultOptions);
      storeData.visible = false;
      this.$emit('import', opts);
    }
  }
};
exports.default = _default;