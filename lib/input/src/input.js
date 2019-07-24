"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'VxeInput',
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    disabled: Boolean,
    placeholder: String,
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

    var $listeners = this.$listeners,
        value = this.value,
        type = this.type,
        vSize = this.vSize,
        placeholder = this.placeholder,
        disabled = this.disabled;
    return h('div', {
      class: ['vxe-input--wrapper', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', this.disabled), _ref)]
    }, [h('input', {
      class: "vxe-input",
      domProps: {
        value: value
      },
      attrs: {
        type: type,
        placeholder: placeholder,
        disabled: disabled
      },
      on: _xeUtils.default.objectMap($listeners, function (cb, type) {
        return function (evnt) {
          var params = type === 'input' ? evnt.target.value : {
            value: evnt.target.value
          };

          _this.$emit(type, params, evnt);
        };
      })
    })]);
  }
};
exports.default = _default;