"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("./util");

var props = {
  title: String,
  field: String,
  size: String,
  span: [String, Number],
  align: String,
  titleAlign: String,
  titleWidth: [String, Number],
  titlePrefix: Object,
  titleSuffix: Object,
  resetValue: {
    default: null
  },
  visibleMethod: Function,
  folding: Boolean,
  collapseNode: Boolean,
  itemRender: Object
};
var watch = {};
Object.keys(props).forEach(function (name) {
  watch[name] = function (value) {
    this.itemConfig.update(name, value);
  };
});
var _default = {
  name: 'VxeFormItem',
  props: props,
  inject: {
    $xeform: {
      default: null
    }
  },
  watch: watch,
  mounted: function mounted() {
    (0, _util.assemItem)(this);
  },
  created: function created() {
    this.itemConfig = (0, _util.createItem)(this.$xeform, this);
  },
  destroyed: function destroyed() {
    (0, _util.destroyItem)(this);
  },
  render: function render(h) {
    return h('div');
  }
};
exports.default = _default;