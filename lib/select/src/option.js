"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("./util");

var props = {
  value: null,
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  visible: {
    type: Boolean,
    default: null
  },
  disabled: Boolean
};
var watch = {};
Object.keys(props).forEach(function (name) {
  watch[name] = function (value) {
    this.optionConfig.update(name, value);
  };
});
var _default = {
  name: 'VxeOption',
  props: props,
  inject: {
    $xeselect: {
      default: null
    },
    $xeoptgroup: {
      default: null
    }
  },
  watch: watch,
  mounted: function mounted() {
    (0, _util.assemOption)(this);
  },
  created: function created() {
    this.optionConfig = (0, _util.createOption)(this.$xeselect, this);
  },
  destroyed: function destroyed() {
    (0, _util.destroyOption)(this);
  },
  render: function render(h) {
    return h('div');
  }
};
exports.default = _default;