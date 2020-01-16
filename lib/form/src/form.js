"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'VxeForm',
  props: {
    data: Object,
    size: String,
    span: [String, Number],
    align: String,
    titleAlign: String,
    titleWidth: [String, Number]
  },
  data: function data() {
    return {
      collapseAll: true,
      sourceData: null
    };
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
  watch: {
    data: function data() {
      this.loadForm();
    }
  },
  created: function created() {
    this.loadForm();
  },
  render: function render(h) {
    return h('form', {
      class: ['vxe-form', 'vxe-row', _defineProperty({}, "size--".concat(this.vSize), this.vSize)],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, this.$slots.default);
  },
  methods: {
    loadForm: function loadForm() {
      if (this.data) {
        this.sourceData = _xeUtils.default.clone(this.data, true);
      }
    },
    toggleCollapse: function toggleCollapse() {
      this.collapseAll = !this.collapseAll;
      return this.$nextTick();
    },
    submitEvent: function submitEvent(evnt) {
      evnt.preventDefault();
      this.$emit('submit', {
        data: this.data
      }, evnt);
    },
    resetEvent: function resetEvent(evnt) {
      evnt.preventDefault();
      var data = this.data,
          sourceData = this.sourceData;

      if (data) {
        this.$children.forEach(function (_ref2) {
          var field = _ref2.field;

          if (field) {
            _xeUtils.default.set(data, field, _xeUtils.default.get(sourceData, field, null));
          }
        });
      }

      this.$emit('reset', {
        data: data
      }, evnt);
    }
  }
};
exports.default = _default;