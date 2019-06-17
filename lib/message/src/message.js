"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxeTableMessage',
  props: {
    value: Boolean,
    type: String,
    title: {
      type: String,
      default: function _default() {
        return _conf.default.i18n('vxe.alert.title');
      }
    },
    message: String,
    lockView: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    animat: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      visible: false,
      contentVisible: false,
      beforeLockStyle: null
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent && (this.$parent.size || this.$parent.vSize);
    }
  },
  watch: {
    value: function value(visible) {
      this[visible ? 'open' : 'close']();
    }
  },
  created: function created() {
    if (this.value) {
      this.open();
    }
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.parentNode.removeChild(this.$el);
  },
  render: function render(h) {
    var _ref;

    var vSize = this.vSize,
        type = this.type,
        animat = this.animat,
        contentVisible = this.contentVisible,
        visible = this.visible,
        title = this.title,
        message = this.message,
        lockView = this.lockView,
        mask = this.mask;
    return h('div', {
      class: ['vxe-alert--wrapper', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--animat', animat), _defineProperty(_ref, 'lock--view', lockView), _defineProperty(_ref, 'is--mask', mask), _defineProperty(_ref, 'is--visible', contentVisible), _defineProperty(_ref, "active", visible), _ref)],
      on: {
        click: this.selfClickEvent
      }
    }, [h('div', {
      class: 'vxe-alert--box'
    }, [h('div', {
      class: 'vxe-alert--header'
    }, [h('span', {
      class: 'vxe-alert--title'
    }, title), h('i', {
      class: 'vxe-alert--close-icon',
      on: {
        click: this.closeEvent
      }
    })]), h('div', {
      class: 'vxe-alert--body'
    }, [h('span', {
      class: 'vxe-alert--content'
    }, this.$slots.default || message)]), h('div', {
      class: 'vxe-alert--footer'
    }, [type === 'confirm' ? h('vxe-button', {
      on: {
        click: this.cancelEvent
      }
    }, _conf.default.i18n('vxe.button.cancel')) : null, h('vxe-button', {
      props: {
        type: 'primary'
      },
      on: {
        click: this.confirmEvent
      }
    }, _conf.default.i18n('vxe.button.confirm'))])])]);
  },
  methods: {
    selfClickEvent: function selfClickEvent(evnt) {
      if (this.maskClosable && evnt.target === this.$el) {
        var type = 'mask';
        this.close(type);
      }
    },
    closeEvent: function closeEvent(evnt) {
      var type = 'close';
      this.$emit(type, evnt);
      this.close(type);
    },
    confirmEvent: function confirmEvent(evnt) {
      var type = 'confirm';
      this.$emit(type, evnt);
      this.close(type);
    },
    cancelEvent: function cancelEvent(evnt) {
      var type = 'cancel';
      this.$emit(type, evnt);
      this.close(type);
    },
    open: function open() {
      var _this = this;

      if (!this.visible) {
        this.visible = true;
        this.contentVisible = false;
        setTimeout(function () {
          _this.contentVisible = true;
        }, 10);

        if (this.lockScroll) {
          var bodyElem = document.body;
          this.beforeLockStyle = {
            paddingRight: bodyElem.style.paddingRight,
            overflow: bodyElem.style.overflow
          };
          bodyElem.style.paddingRight = "".concat(window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth), "px");
          bodyElem.style.overflow = 'hidden';
        }

        if (!this._handleCustom) {
          this.$emit('input', true);
          this.$emit('show');
        }
      }
    },
    close: function close(type) {
      var _this2 = this;

      var visible = this.visible,
          lockScroll = this.lockScroll,
          beforeLockStyle = this.beforeLockStyle;

      if (visible) {
        this.contentVisible = false;
        setTimeout(function () {
          _this2.visible = false;

          if (lockScroll) {
            Object.assign(document.body.style, beforeLockStyle);
          }

          if (_this2._handleCustom) {
            _this2._handleCustom(type);
          } else {
            _this2.$emit('input', false);

            _this2.$emit('hide', type);
          }
        }, 200);
      }
    }
  }
};
exports.default = _default2;