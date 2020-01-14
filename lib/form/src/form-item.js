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
    span: [String, Number],
    titleAlign: String,
    titleWidth: [String, Number],
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
    var span = this.span || $vxeform.span;
    var titleAlign = this.titleAlign || $vxeform.titleAlign;
    var titleWidth = this.titleWidth || $vxeform.titleWidth;
    return h('div', {
      class: ['vxe-form--item', titleAlign ? "align--".concat(titleAlign) : null, span ? "vxe-col--".concat(span, " is--span") : null, title ? "is--title" : null]
    }, [h('div', {
      class: 'vxe-form--item-inner'
    }, [title ? h('div', {
      class: 'vxe-form--item-title',
      style: titleWidth ? {
        width: isNaN(titleWidth) ? titleWidth : "".concat(titleWidth, "px")
      } : null
    }, _tools.UtilTools.getFuncText(title)) : null, h('div', {
      class: 'vxe-form--item-content'
    }, compConf && compConf.renderItem ? compConf.renderItem.call(this, h, itemRender, {
      data: $vxeform ? $vxeform.data : null,
      field: field,
      property: field
    }, {
      $form: $vxeform
    }) : this.$slots.default)])]);
  }
};
exports.default = _default;