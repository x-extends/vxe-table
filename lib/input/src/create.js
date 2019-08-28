"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(compName) {
  var isInput = compName === 'input';
  var getAttrs = isInput ? function (_ref) {
    var type = _ref.type,
        name = _ref.name,
        readonly = _ref.readonly,
        disabled = _ref.disabled,
        maxlength = _ref.maxlength,
        autocomplete = _ref.autocomplete;
    return {
      type: type,
      name: name,
      readonly: readonly,
      disabled: disabled,
      maxlength: maxlength,
      autocomplete: autocomplete
    };
  } : function (_ref2) {
    var name = _ref2.name,
        readonly = _ref2.readonly,
        disabled = _ref2.disabled,
        maxlength = _ref2.maxlength,
        autocomplete = _ref2.autocomplete,
        rows = _ref2.rows,
        form = _ref2.form;
    return {
      name: name,
      readonly: readonly,
      disabled: disabled,
      maxlength: maxlength,
      autocomplete: autocomplete,
      rows: rows,
      form: form
    };
  };
  return {
    name: _xeUtils.default.camelCase("Vxe-".concat(compName)),
    props: {
      value: [String, Number],
      name: String,
      type: {
        type: String,
        default: 'text'
      },
      autocomplete: String,
      readonly: Boolean,
      disabled: Boolean,
      placeholder: String,
      maxlength: [String, Number],
      rows: {
        type: [String, Number],
        default: 2
      },
      form: String,
      size: String
    },
    computed: {
      vSize: function vSize() {
        return this.size || this.$parent.size || this.$parent.vSize;
      }
    },
    render: function render(h) {
      var _ref3,
          _this = this;

      var $listeners = this.$listeners,
          value = this.value,
          vSize = this.vSize,
          placeholder = this.placeholder;
      var attrs = getAttrs(this);

      if (placeholder) {
        attrs.placeholder = _tools.UtilTools.getFuncText(placeholder);
      }

      return h('div', {
        class: ['vxe-input--wrapper', "type--".concat(compName), (_ref3 = {}, _defineProperty(_ref3, "size--".concat(vSize), vSize), _defineProperty(_ref3, 'is--disabled', this.disabled), _ref3)]
      }, [h(compName, {
        class: "vxe-".concat(compName),
        domProps: {
          value: value
        },
        attrs: attrs,
        on: _xeUtils.default.objectMap($listeners, function (cb, type) {
          return function (evnt) {
            var value = evnt.target.value;
            var params = type === 'input' ? value : {
              value: value
            };

            _this.$emit(type, params, evnt);
          };
        })
      })]);
    }
  };
}