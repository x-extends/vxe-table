"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'VxeCheckbox',
  props: {
    value: Boolean,
    indeterminate: Boolean,
    disabled: Boolean,
    name: String,
    size: String
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var disabled = this.disabled,
        vSize = this.vSize,
        indeterminate = this.indeterminate,
        value = this.value;
    return h('label', {
      class: ['vxe-checkbox', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--indeterminate', indeterminate), _defineProperty(_ref, 'is--disabled', disabled), _ref)]
    }, [h('input', {
      attrs: {
        type: 'checkbox',
        disabled: disabled
      },
      domProps: {
        checked: value
      },
      on: {
        change: function change(evnt) {
          if (!_this.disabled) {
            var checked = evnt.target.checked;

            _this.$emit('input', checked);

            _this.$emit('change', checked, evnt);
          }
        }
      }
    }), h('span', {
      class: 'vxe-checkbox--icon'
    }), this.$slots.default ? h('span', {
      class: 'vxe-checkbox--label'
    }, this.$slots.default) : null]);
  }
};
exports.default = _default;