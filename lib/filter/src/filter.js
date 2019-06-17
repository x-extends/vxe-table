"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'VxeTableFilter',
  props: {
    filterStore: Object,
    optimizeOpts: Object
  },
  render: function render(h) {
    var $table = this.$parent;
    var filterStore = this.filterStore,
        optimizeOpts = this.optimizeOpts,
        filterCheckAllEvent = this.filterCheckAllEvent,
        filterOptionRadioEvent = this.filterOptionRadioEvent,
        filterOptionCheckEvent = this.filterOptionCheckEvent;
    var multiple = filterStore.multiple;
    var filterRens = [h('li', {
      class: ['vxe-table--filter-option', {
        'is--active': !filterStore.options.some(function (item) {
          return item.checked;
        })
      }]
    }, [multiple ? h('label', {
      class: ['vxe-checkbox', {
        'is--indeterminate': filterStore.isIndeterminate
      }]
    }, [h('input', {
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: filterStore.isAllSelected
      },
      on: {
        change: function change(evnt) {
          filterCheckAllEvent(evnt, evnt.target.checked);
        }
      }
    }), h('span', {
      class: ['checkbox--icon']
    }), h('span', {
      class: ['checkbox--label']
    }, _conf.default.i18n('vxe.table.allFilter'))]) : h('span', {
      class: 'vxe-table--filter-label',
      on: {
        click: $table.resetFilterEvent
      }
    }, _conf.default.i18n('vxe.table.allFilter'))])];
    filterStore.options.forEach(function (item, index) {
      filterRens.push(h('li', {
        class: ['vxe-table--filter-option', {
          'is--active': item.checked
        }],
        key: index
      }, [multiple ? h('label', {
        class: 'vxe-checkbox'
      }, [h('input', {
        attrs: {
          type: 'checkbox'
        },
        domProps: {
          checked: item.checked
        },
        on: {
          change: function change(evnt) {
            filterOptionCheckEvent(evnt, evnt.target.checked, item);
          }
        }
      }), h('span', {
        class: ['checkbox--icon']
      }), h('span', {
        class: ['checkbox--label']
      }, item.label)]) : h('span', {
        class: 'vxe-table--filter-label',
        on: {
          click: function click(evnt) {
            filterOptionRadioEvent(evnt, !item.checked, item);
          }
        }
      }, item.label)]));
    });
    return h('div', {
      class: ['vxe-table--filter-wrapper', {
        't--animat': optimizeOpts.animat,
        'filter--active': filterStore.visible
      }],
      style: filterStore.style
    }, filterStore.visible ? [h('ul', {
      class: ['vxe-table--filter-body']
    }, filterRens), multiple ? h('div', {
      class: ['vxe-table--filter-footer']
    }, [h('button', {
      class: {
        'is--disabled': !filterStore.isAllSelected && !filterStore.isIndeterminate
      },
      attrs: {
        disabled: !filterStore.isAllSelected && !filterStore.isIndeterminate
      },
      on: {
        click: $table.confirmFilterEvent
      }
    }, _conf.default.i18n('vxe.table.confirmFilter')), h('button', {
      on: {
        click: $table.resetFilterEvent
      }
    }, _conf.default.i18n('vxe.table.resetFilter'))]) : null] : []);
  },
  methods: {
    // 全部筛选事件
    filterCheckAllEvent: function filterCheckAllEvent(evnt, value) {
      var filterStore = this.filterStore;
      filterStore.options.forEach(function (item) {
        item.checked = value;
      });
      filterStore.isAllSelected = value;
      filterStore.isIndeterminate = false;
    },
    // 筛选选项勾选事件
    filterOptionCheckEvent: function filterOptionCheckEvent(evnt, value, item) {
      item.checked = value;
      this.checkOptions();
    },
    // 筛选选项单选事件
    filterOptionRadioEvent: function filterOptionRadioEvent(evnt, value, item) {
      this.filterStore.options.forEach(function (item) {
        item.checked = false;
      });
      item.checked = value;
      this.checkOptions();
      this.$parent.confirmFilterEvent();
    },
    checkOptions: function checkOptions() {
      var filterStore = this.filterStore;
      filterStore.isAllSelected = filterStore.options.every(function (item) {
        return item.checked;
      });
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(function (item) {
        return item.checked;
      });
    }
  }
};
exports.default = _default;