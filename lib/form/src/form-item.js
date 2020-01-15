"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

var _conf = _interopRequireDefault(require("../../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'VxeFormItem',
  props: {
    title: String,
    field: String,
    size: String,
    span: [String, Number],
    align: String,
    titleAlign: String,
    titleWidth: [String, Number],
    folding: Boolean,
    collapseNode: Boolean,
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
    var $scopedSlots = this.$scopedSlots,
        $vxeform = this.$vxeform,
        title = this.title,
        folding = this.folding,
        field = this.field,
        collapseNode = this.collapseNode,
        itemRender = this.itemRender;
    var compConf = itemRender ? _vXETable.default.renderer.get(itemRender.name) : null;
    var span = this.span || $vxeform.span;
    var align = this.align || $vxeform.align;
    var titleAlign = this.titleAlign || $vxeform.titleAlign;
    var titleWidth = this.titleWidth || $vxeform.titleWidth;
    var collapseAll = $vxeform.collapseAll;
    return h('div', {
      class: ['vxe-form--item', span ? "vxe-col--".concat(span, " is--span") : null, {
        'is--title': title,
        'is--hidden': folding && collapseAll
      }]
    }, [h('div', {
      class: 'vxe-form--item-inner'
    }, [title ? h('div', {
      class: ['vxe-form--item-title', titleAlign ? "align--".concat(titleAlign) : null],
      style: titleWidth ? {
        width: isNaN(titleWidth) ? titleWidth : "".concat(titleWidth, "px")
      } : null
    }, _tools.UtilTools.getFuncText(title)) : null, h('div', {
      class: ['vxe-form--item-content', align ? "align--".concat(align) : null]
    }, (compConf && compConf.renderItem ? compConf.renderItem.call(this, h, itemRender, {
      data: $vxeform.data,
      field: field,
      property: field
    }, {
      $form: $vxeform
    }) : $scopedSlots.default ? $scopedSlots.default.call(this) : []).concat(collapseNode ? [h('div', {
      class: 'vxe-form--item-trigger-node',
      on: {
        click: this.toggleCollapseEvent
      }
    }, [h('span', {
      class: 'vxe-form--item-trigger-text'
    }, collapseAll ? _conf.default.i18n('vxe.form.unfolding') : _conf.default.i18n('vxe.form.folding')), h('i', {
      class: ['vxe-form--item-trigger-icon', collapseAll ? _conf.default.icon.formFolding : _conf.default.icon.formUnfolding]
    })])] : []))])]);
  },
  methods: {
    toggleCollapseEvent: function toggleCollapseEvent(evnt) {
      this.$vxeform.$emit('toggle-collapse', {
        data: this.$vxeform.data
      }, evnt);
      this.$vxeform.toggleCollapse();
    }
  }
};
exports.default = _default;