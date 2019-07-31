"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'VxeButton',
  props: {
    type: String,
    size: String,
    disabled: Boolean
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
        type = this.type,
        vSize = this.vSize,
        disabled = this.disabled;
    var isText = type === 'text';
    return h('button', {
      class: ['vxe-button', "type--".concat(isText ? type : 'button'), (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "theme--".concat(type), type && !isText), _ref)],
      attrs: {
        disabled: disabled
      },
      on: _xeUtils.default.objectMap($listeners, function (cb, type) {
        return function (evnt) {
          return _this.$emit(type, evnt);
        };
      })
    }, _tools.UtilTools.getFuncText(this.$slots.default));
  }
};
exports.default = _default;