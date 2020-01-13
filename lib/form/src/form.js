"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'VxeForm',
  props: {
    data: Object,
    titleWidth: [Number, String]
  },
  provide: function provide() {
    return {
      $vxeform: this
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  render: function render(h) {
    return h('form', {
      class: ['vxe-form', _defineProperty({}, "size--".concat(this.vSize), this.vSize)],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, this.$slots.default);
  },
  methods: {
    submitEvent: function submitEvent(evnt) {
      evnt.preventDefault();
      this.$emit('submit', {}, evnt);
    },
    resetEvent: function resetEvent(evnt) {
      var data = this.data;

      if (data) {
        this.$children.forEach(function (_ref2) {
          var field = _ref2.field;

          if (field) {
            _xeUtils.default.set(data, field, null);
          }
        });
      }

      this.$emit('reset', {}, evnt);
    }
  }
};
exports.default = _default;