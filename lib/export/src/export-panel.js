"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _modal = _interopRequireDefault(require("../../modal/src/modal"));

var _input = _interopRequireDefault(require("../../input/src/input"));

var _checkbox = _interopRequireDefault(require("../../checkbox/src/checkbox"));

var _select = _interopRequireDefault(require("../../select/src/select"));

var _option = _interopRequireDefault(require("../../select/src/option"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'VxeExportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  components: {
    VxeModal: _modal.default,
    VxeInput: _input.default,
    VxeCheckbox: _checkbox.default,
    VxeSelect: _select.default,
    VxeOption: _option.default
  },
  data: function data() {
    return {
      isAll: false,
      isIndeterminate: false,
      loading: false
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    showSheet: function showSheet() {
      return ['html', 'xml', 'xlsx'].indexOf(this.defaultOptions.type) > -1;
    }
  },
  render: function render(h) {
    var _this = this;

    var _e = this._e,
        isAll = this.isAll,
        isIndeterminate = this.isIndeterminate,
        showSheet = this.showSheet,
        defaultOptions = this.defaultOptions,
        storeData = this.storeData;
    var cols = [];

    _ctor.default.eachTree(storeData.columns, function (column) {
      var colTitle = _tools.UtilTools.formatText(column.getTitle(), 1);

      var isColGroup = column.children && column.children.length;
      cols.push(h('li', {
        class: ['vxe-export--panel-column-option', "level--".concat(column.level), {
          'is--group': isColGroup,
          'is--checked': column.checked,
          'is--indeterminate': column.halfChecked,
          'is--disabled': column.disabled
        }],
        attrs: {
          title: colTitle
        },
        on: {
          click: function click() {
            if (!column.disabled) {
              _this.changeOption(column);
            }
          }
        }
      }, [h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
      }), h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
      }), h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
      }), h('span', {
        class: 'vxe-checkbox--label'
      }, colTitle)]));
    });

    return h('vxe-modal', {
      res: 'modal',
      props: {
        value: storeData.visible,
        title: _conf.default.i18n('vxe.export.expTitle'),
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: this.loading
      },
      on: {
        input: function input(value) {
          storeData.visible = value;
        },
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
    }, [h('tbody', [[h('tr', [h('td', _conf.default.i18n('vxe.export.expName')), h('td', [h('vxe-input', {
      ref: 'filename',
      props: {
        value: defaultOptions.filename,
        type: 'text',
        clearable: true,
        placeholder: _conf.default.i18n('vxe.export.expNamePlaceholder')
      },
      on: {
        input: function input(value) {
          defaultOptions.filename = value;
        }
      }
    })])]), h('tr', [h('td', _conf.default.i18n('vxe.export.expType')), h('td', [h('vxe-select', {
      props: {
        value: defaultOptions.type
      },
      on: {
        input: function input(value) {
          defaultOptions.type = value;
        }
      }
    }, storeData.typeList.map(function (item) {
      return h('vxe-option', {
        props: {
          value: item.value,
          label: _conf.default.i18n(item.label)
        }
      });
    }))])]), showSheet ? h('tr', [h('td', _conf.default.i18n('vxe.export.expSheetName')), h('td', [h('vxe-input', {
      props: {
        value: defaultOptions.sheetName,
        type: 'text',
        clearable: true,
        placeholder: _conf.default.i18n('vxe.export.expSheetNamePlaceholder')
      },
      on: {
        input: function input(value) {
          defaultOptions.sheetName = value;
        }
      }
    })])]) : _e(), h('tr', [h('td', _conf.default.i18n('vxe.export.expMode')), h('td', [h('vxe-select', {
      props: {
        value: defaultOptions.mode
      },
      on: {
        input: function input(value) {
          defaultOptions.mode = value;
        }
      }
    }, storeData.modeList.map(function (item) {
      return h('vxe-option', {
        props: {
          value: item.value,
          label: _conf.default.i18n(item.label)
        }
      });
    }))])]), h('tr', [h('td', [_conf.default.i18n('vxe.export.expColumn')]), h('td', [h('div', {
      class: 'vxe-export--panel-column'
    }, [h('ul', {
      class: 'vxe-export--panel-column-header'
    }, [h('li', {
      class: ['vxe-export--panel-column-option', {
        'is--checked': isAll,
        'is--indeterminate': isIndeterminate
      }],
      attrs: {
        title: _conf.default.i18n('vxe.table.allTitle')
      },
      on: {
        click: this.allColumnEvent
      }
    }, [h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
    }), h('span', {
      class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
    }), h('span', {
      class: 'vxe-checkbox--label'
    }, _conf.default.i18n('vxe.export.expCurrentColumn'))])]), h('ul', {
      class: 'vxe-export--panel-column-body'
    }, cols)])])]), h('tr', [h('td', _conf.default.i18n('vxe.export.expOpts')), h('td', [h('vxe-checkbox', {
      props: {
        value: defaultOptions.isHeader,
        title: _conf.default.i18n('vxe.export.expHeaderTitle')
      },
      on: {
        input: function input(value) {
          defaultOptions.isHeader = value;
        }
      }
    }, _conf.default.i18n('vxe.export.expOptHeader')), h('vxe-checkbox', {
      props: {
        value: defaultOptions.isFooter,
        disabled: !storeData.hasFooter,
        title: _conf.default.i18n('vxe.export.expFooterTitle')
      },
      on: {
        input: function input(value) {
          defaultOptions.isFooter = value;
        }
      }
    }, _conf.default.i18n('vxe.export.expOptFooter')), h('vxe-checkbox', {
      props: {
        value: defaultOptions.original,
        title: _conf.default.i18n('vxe.export.expOriginalTitle')
      },
      on: {
        input: function input(value) {
          defaultOptions.original = value;
        }
      }
    }, _conf.default.i18n('vxe.export.expOptOriginal'))])])]])]), h('div', {
      class: 'vxe-export--panel-btns'
    }, [defaultOptions.isPrint ? h('vxe-button', {
      on: {
        click: this.printEvent
      }
    }, _conf.default.i18n('vxe.export.expPrint')) : null, h('vxe-button', {
      props: {
        status: 'primary'
      },
      on: {
        click: this.exportEvent
      }
    }, _conf.default.i18n('vxe.export.expConfirm'))])])]);
  },
  methods: {
    changeOption: function changeOption(column) {
      var isChecked = !column.checked;

      _ctor.default.eachTree([column], function (item) {
        item.checked = isChecked;
        item.halfChecked = false;
      });

      this.handleOptionCheck(column);
      this.checkStatus();
    },
    handleOptionCheck: function handleOptionCheck(column) {
      var matchObj = _ctor.default.findTree(this.storeData.columns, function (item) {
        return item === column;
      });

      if (matchObj && matchObj.parent) {
        var parent = matchObj.parent;

        if (parent.children && parent.children.length) {
          parent.checked = parent.children.every(function (column) {
            return column.checked;
          });
          parent.halfChecked = !parent.checked && parent.children.some(function (column) {
            return column.checked || column.halfChecked;
          });
          this.handleOptionCheck(parent);
        }
      }
    },
    checkStatus: function checkStatus() {
      var columns = this.storeData.columns;
      this.isAll = columns.every(function (column) {
        return column.disabled || column.checked;
      });
      this.isIndeterminate = !this.isAll && columns.some(function (column) {
        return !column.disabled && (column.checked || column.halfChecked);
      });
    },
    allColumnEvent: function allColumnEvent() {
      var isAll = !this.isAll;

      _ctor.default.eachTree(this.storeData.columns, function (column) {
        if (!column.disabled) {
          column.checked = isAll;
          column.halfChecked = false;
        }
      });

      this.isAll = isAll;
      this.checkStatus();
    },
    showEvent: function showEvent() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.$refs.filename.focus();
      });
      this.checkStatus();
    },
    getExportOption: function getExportOption() {
      var storeData = this.storeData,
          defaultOptions = this.defaultOptions;
      var checkColumns = [];

      _ctor.default.eachTree(storeData.columns, function (column) {
        var isColGroup = column.children && column.children.length;

        if (!isColGroup && column.checked) {
          checkColumns.push(column);
        }
      });

      return Object.assign({
        columns: checkColumns
      }, defaultOptions);
    },
    printEvent: function printEvent() {
      var $xetable = this.$parent;
      this.storeData.visible = false;
      $xetable.print(Object.assign({}, $xetable.printOpts, this.getExportOption()));
    },
    exportEvent: function exportEvent() {
      var _this3 = this;

      var $xetable = this.$parent;
      this.loading = true;
      $xetable.exportData(Object.assign({}, $xetable.exportOpts, this.getExportOption())).then(function () {
        _this3.loading = false;
        _this3.storeData.visible = false;
      });
    }
  }
};
exports.default = _default;