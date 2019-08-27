"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'VxeTableLoading',
  props: {
    visible: Boolean
  },
  render: function render(h) {
    return h('div', {
      class: 'vxe-table--loading',
      style: {
        display: this.visible ? 'block' : 'none'
      }
    }, [h('div', {
      class: 'vxe-table--spinner'
    })]);
  }
};
exports.default = _default;