"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

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
        escClosable: true,
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
    }, [h('i', {
      class: 'vxe-checkbox--icon'
    }), _conf.default.i18n('vxe.toolbar.expAllColumn')])]), h('ul', {
      class: 'vxe-export--panel-column-body'
    }, storeData.columns.map(function (column) {
      var headerTitle = column.getTitle();
      return h('li', {
        class: ['vxe-export--panel-column-option', {
          'is--checked': column.checked,
          'is--disabled': column.disabled
        }],
        attrs: {
          title: headerTitle
        },
        on: {
          click: function click() {
            if (!column.disabled) {
              column.checked = !column.checked;

              _this.checkStatus();
            }
          }
        }
      }, [h('i', {
        class: 'vxe-checkbox--icon'
      }), headerTitle]);
    }))])])]), h('tr', [h('td', _conf.default.i18n('vxe.toolbar.expOpts')), h('td', [h('vxe-checkbox', {
      props: {
        title: _conf.default.i18n('vxe.toolbar.expHeaderTitle')
      },
      model: {
        value: defaultOptions.isHeader,
        callback: function callback(value) {
          defaultOptions.isHeader = value;
        }
      }
    }, _conf.default.i18n('vxe.toolbar.expOptHeader')), h('vxe-checkbox', {
      props: {
        disabled: !storeData.hasFooter,
        title: _conf.default.i18n('vxe.toolbar.expFooterTitle')
      },
      model: {
        value: defaultOptions.isFooter,
        callback: function callback(value) {
          defaultOptions.isFooter = value;
        }
      }
    }, _conf.default.i18n('vxe.toolbar.expOptFooter')), h('vxe-checkbox', {
      props: {
        title: _conf.default.i18n('vxe.toolbar.expOriginalTitle')
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
        status: 'primary'
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
        return column.disabled || column.checked;
      });
      this.isIndeterminate = !this.isAll && columns.some(function (column) {
        return !column.disabled && column.checked;
      });
    },
    allColumnEvent: function allColumnEvent() {
      var isAll = !this.isAll;
      this.storeData.columns.forEach(function (column) {
        if (!column.disabled) {
          column.checked = isAll;
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
      var _this$$parent = this.$parent,
          $xegrid = _this$$parent.$xegrid,
          $xetable = _this$$parent.$xetable;
      var comp = $xegrid || $xetable;
      var selectRecords = storeData.selectRecords;
      var opts = Object.assign({
        columns: storeData.columns.filter(function (column) {
          return column.checked;
        })
      }, defaultOptions);

      if (storeData.mode === 'selected') {
        if (['html', 'pdf'].indexOf(defaultOptions.type) > -1 && comp.treeConfig) {
          opts.data = _xeUtils.default.searchTree(comp.getTableData().fullData, function (item) {
            return selectRecords.indexOf(item) > -1;
          }, comp.getTreeStatus().config);
        } else {
          opts.data = selectRecords;
        }
      }

      return opts;
    },
    printEvent: function printEvent() {
      this.storeData.visible = false;
      this.$emit('print', this.getExportOption());
    },
    exportEvent: function exportEvent() {
      this.storeData.visible = false;
      this.$emit('export', this.getExportOption());
    }
  }
};
exports.default = _default;