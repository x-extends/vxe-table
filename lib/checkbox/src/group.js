"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'VxeCheckboxGroup',
  props: {
    value: Array,
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
  render: function render(h) {
    return h('div', {
      class: 'vxe-checkbox-group'
    }, this.$slots.default);
  },
  methods: {
    handleChecked: function handleChecked(params, evnt) {
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
      }, params), evnt);
    }
  }
};
exports.default = _default;