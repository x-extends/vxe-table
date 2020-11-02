"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  name: 'VxeRadioGroup',
  props: {
    value: [String, Number],
    disabled: Boolean,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.radio.size || _conf.default.size;
      }
    }
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
      name: _ctor.default.uniqueId('xegroup_')
    };
  },
  render: function render(h) {
    return h('div', {
      class: 'vxe-radio-group'
    }, this.$slots.default);
  },
  methods: {
    handleChecked: function handleChecked(params) {
      this.$emit('input', params.label);
      this.$emit('change', params);
    }
  }
};
exports.default = _default2;