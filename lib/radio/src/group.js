"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'VxeRadioGroup',
  props: {
    value: [String, Number],
    size: String
  },
  provide: function provide() {
    return {
      $xegroup: this
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  data: function data() {
    return {
      name: _xeUtils.default.uniqueId('xegroup_')
    };
  },
  render: function render(h) {
    return h('div', {
      class: 'vxe-radio-group'
    }, this.$slots.default);
  },
  methods: {
    handleChecked: function handleChecked(params, evnt) {
      this.$emit('input', params.label);
      this.$emit('change', params, evnt);
    }
  }
};
exports.default = _default;