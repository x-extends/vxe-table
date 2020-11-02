"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("./util");

var props = {
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
  name: 'VxeOptgroup',
  props: props,
  provide: function provide() {
    return {
      $xeoptgroup: this
    };
  },
  inject: {
    $xeselect: {
      default: null
    }
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
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
    return h('div', this.$slots.default);
  }
};
exports.default = _default;