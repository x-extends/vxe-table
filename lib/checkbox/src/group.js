"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  name: 'VxeCheckboxGroup',
  props: {
    value: Array,
    disabled: Boolean,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.checkbox.size || _conf.default.size;
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
  render: function render(h) {
    return h('div', {
      class: 'vxe-checkbox-group'
    }, this.$slots.default);
  },
  methods: {
    handleChecked: function handleChecked(params) {
      var checked = params.checked,
          label = params.label;
      var checklist = this.value || [];
      var checkIndex = checklist.indexOf(label);

      if (checked) {
        if (checkIndex === -1) {
          checklist.push(label);
        }
      } else {
        checklist.splice(checkIndex, 1);
      }

      this.$emit('input', checklist);
      this.$emit('change', Object.assign({
        checklist: checklist
      }, params));
    }
  }
};
exports.default = _default2;