"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'VxeFormItem',
  props: {
    title: String,
    field: String,
    itemRender: Object
  },
  inject: {
    $vxeform: {
      default: null
    }
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  render: function render(h) {
    var $vxeform = this.$vxeform,
        title = this.title,
        field = this.field,
        itemRender = this.itemRender;
    var compConf = itemRender ? _vXETable.default.renderer.get(itemRender.name) : null;
    return h('div', {
      class: 'vxe-form--item'
    }, [title ? h('div', {
      class: 'vxe-form--item-title'
    }, _tools.UtilTools.getFuncText(title)) : null, h('div', {
      class: 'vxe-form--item-content'
    }, compConf && compConf.renderItem ? compConf.renderItem.call(this, h, itemRender, {
      data: $vxeform ? $vxeform.data : null,
      field: field,
      property: field
    }, {
      $form: $vxeform
    }) : this.$slots.default)]);
  }
};
exports.default = _default;