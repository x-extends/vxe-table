"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

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
  var props = {
    value: [String, Number],
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    size: String
  };

  if (isInput) {
    props.clearable = Boolean;
    props.form = String;
  } else {
    props.autocomplete = String;
    props.rows = {
      type: [String, Number],
      default: 2
    };
  }

  return {
    name: _xeUtils.default.camelCase("Vxe-".concat(compName)),
    props: props,
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
          type = this.type,
          vSize = this.vSize,
          placeholder = this.placeholder,
          disabled = this.disabled,
          clearable = this.clearable;
      var isClearable = clearable && (type === 'text' || type === 'search');
      var attrs = getAttrs(this);

      if (placeholder) {
        attrs.placeholder = _tools.UtilTools.getFuncText(placeholder);
      }

      return h('div', {
        class: ["vxe-".concat(compName), (_ref3 = {}, _defineProperty(_ref3, "size--".concat(vSize), vSize), _defineProperty(_ref3, 'is--suffix', isClearable), _defineProperty(_ref3, 'is--disabled', disabled), _ref3)]
      }, [h(compName, {
        class: "vxe-".concat(compName, "--inner"),
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
      }), isClearable ? h('span', {
        class: ["vxe-".concat(compName, "--suffix"), {
          'is--active': !(value === '' || _xeUtils.default.eqNull(value))
        }],
        on: {
          click: this.clearValue
        }
      }, [h('i', {
        class: ["vxe-".concat(compName, "--suffix-icon"), 'vxe-icon--close']
      })]) : null]);
    },
    methods: {
      clearValue: function clearValue(evnt) {
        this.$emit('input', '');
        this.$emit('clear', {}, evnt);
      }
    }
  };
}