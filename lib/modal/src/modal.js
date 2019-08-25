"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _queue = _interopRequireDefault(require("./queue"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxeModal',
  props: {
    value: Boolean,
    id: String,
    type: String,
    status: String,
    top: {
      type: Number,
      default: 15
    },
    title: String,
    duration: {
      type: Number,
      default: function _default() {
        return _conf.default.message.duration;
      }
    },
    message: [String, Function],
    lockView: {
      type: Boolean,
      default: function _default() {
        return _conf.default.message.lockView;
      }
    },
    lockScroll: {
      type: Boolean,
      default: function _default() {
        return _conf.default.message.lockScroll;
      }
    },
    mask: {
      type: Boolean,
      default: function _default() {
        return _conf.default.message.mask;
      }
    },
    maskClosable: Boolean,
    escClosable: Boolean,
    zIndex: {
      type: Number,
      default: function _default() {
        return _conf.default.message.zIndex;
      }
    },
    animat: {
      type: Boolean,
      default: function _default() {
        return _conf.default.message.animat;
      }
    }
  },
  data: function data() {
    return {
      visible: false,
      contentVisible: false,
      beforeLockStyle: null,
      msgTop: 0
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent && (this.$parent.size || this.$parent.vSize);
    },
    isMsg: function isMsg() {
      return this.type === 'message';
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
    if (this.escClosable) {
      _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);
    }

    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    _tools.GlobalEvent.off(this, 'keydown');

    this.removeMsgQueue();
    this.$el.parentNode.removeChild(this.$el);
  },
  render: function render(h) {
    var _ref;

    var vSize = this.vSize,
        type = this.type,
        animat = this.animat,
        zIndex = this.zIndex,
        status = this.status,
        msgTop = this.msgTop,
        contentVisible = this.contentVisible,
        visible = this.visible,
        title = this.title,
        message = this.message,
        lockView = this.lockView,
        mask = this.mask,
        isMsg = this.isMsg;
    return h('div', {
      class: ['vxe-msg--wrapper', "type--".concat(type), (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "msg--".concat(status), status), _defineProperty(_ref, 'is--animat', animat), _defineProperty(_ref, 'lock--view', lockView), _defineProperty(_ref, 'is--mask', mask), _defineProperty(_ref, 'is--visible', contentVisible), _defineProperty(_ref, "active", visible), _ref)],
      style: {
        zIndex: zIndex,
        top: msgTop ? "".concat(msgTop, "px") : null
      },
      on: {
        click: this.selfClickEvent
      }
    }, [h('div', {
      class: 'vxe-msg--box',
      ref: 'msgBox'
    }, [!isMsg ? h('div', {
      class: 'vxe-msg--header',
      on: {
        mousedown: this.mousedownEvent
      }
    }, [h('span', {
      class: 'vxe-msg--title'
    }, title ? _tools.UtilTools.getFuncText(title) : _conf.default.i18n('vxe.alert.title')), h('i', {
      class: ['vxe-msg--close-btn', _conf.default.icon.msgClose],
      on: {
        click: this.closeEvent
      }
    })]) : null, h('div', {
      class: 'vxe-msg--body'
    }, [status ? h('div', {
      class: 'vxe-msg--status-wrapper'
    }, [h('i', {
      class: ['vxe-msg--status-icon', _conf.default.icon["msg".concat(status.replace(/\b(\w)/, function (word) {
        return word.toUpperCase();
      }))]]
    })]) : null, h('div', {
      class: 'vxe-msg--content'
    }, this.$slots.default || (_xeUtils.default.isFunction(message) ? message.call(this, h) : message))]), !isMsg ? h('div', {
      class: 'vxe-msg--footer'
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
    }, _conf.default.i18n('vxe.button.confirm'))]) : null])]);
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

      var duration = this.duration,
          visible = this.visible,
          lockScroll = this.lockScroll,
          _handleCustom = this._handleCustom,
          isMsg = this.isMsg;

      if (!visible) {
        this.visible = true;
        this.contentVisible = false;
        setTimeout(function () {
          _this.contentVisible = true;
        }, 10);

        if (lockScroll) {
          var bodyElem = document.body;
          this.beforeLockStyle = {
            paddingRight: bodyElem.style.paddingRight,
            overflow: bodyElem.style.overflow
          };
          bodyElem.style.paddingRight = "".concat(window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth), "px");
          bodyElem.style.overflow = 'hidden';
        }

        if (!_handleCustom) {
          this.$emit('input', true);
          this.$emit('show');
        }

        if (isMsg) {
          this.addMsgQueue();
          setTimeout(this.close, duration);
        }
      }
    },
    addMsgQueue: function addMsgQueue() {
      if (_queue.default.indexOf(this) === -1) {
        _queue.default.push(this);
      }

      this.updateStyle();
    },
    removeMsgQueue: function removeMsgQueue() {
      var _this2 = this;

      if (_queue.default.indexOf(this) > -1) {
        _xeUtils.default.remove(_queue.default, function (comp) {
          return comp === _this2;
        });
      }

      this.updateStyle();
    },
    updateStyle: function updateStyle() {
      this.$nextTick(function () {
        var offsetTop = 0;

        _queue.default.forEach(function (comp) {
          offsetTop += comp.top;
          comp.msgTop = offsetTop;
          offsetTop += comp.$refs.msgBox.clientHeight;
        });
      });
    },
    close: function close(type) {
      var _this3 = this;

      var visible = this.visible,
          lockScroll = this.lockScroll,
          beforeLockStyle = this.beforeLockStyle,
          isMsg = this.isMsg;

      if (visible) {
        if (isMsg) {
          this.removeMsgQueue();
        }

        this.contentVisible = false;
        setTimeout(function () {
          _this3.visible = false;

          if (lockScroll) {
            Object.assign(document.body.style, beforeLockStyle);
          }

          if (_this3._handleCustom) {
            _this3._handleCustom(type);
          } else {
            _this3.$emit('input', false);

            _this3.$emit('hide', type);
          }
        }, 200);
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      if (evnt.keyCode === 27) {
        this.close();
      }
    },
    mousedownEvent: function mousedownEvent(evnt) {
      var _this4 = this;

      if (evnt.button === 0) {
        evnt.preventDefault();
        var msgBoxElem = this.$refs.msgBox;
        var demMousemove = document.onmousemove;
        var demMouseup = document.onmouseup;
        var disX = evnt.clientX - msgBoxElem.offsetLeft;
        var disY = evnt.clientY - msgBoxElem.offsetTop;

        document.onmousemove = function (evnt) {
          evnt.preventDefault();
          var clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
          var clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
          var offsetWidth = msgBoxElem.offsetWidth;
          var offsetHeight = msgBoxElem.offsetHeight;
          var minX = offsetWidth / 2;
          var maxX = clientVisibleWidth - offsetWidth / 2;
          var minY = 0;
          var maxY = clientVisibleHeight - offsetHeight;
          var left = evnt.clientX - disX;
          var top = evnt.clientY - disY;

          if (left > maxX) {
            left = maxX;
          }

          if (left < minX) {
            left = minX;
          }

          if (top > maxY) {
            top = maxY;
          }

          if (top < minY) {
            top = minY;
          }

          msgBoxElem.style.left = "".concat(left, "px");
          msgBoxElem.style.top = "".concat(top, "px");
          msgBoxElem.className = msgBoxElem.className.replace(/\s?drag-move/, '') + " drag-move";
        };

        document.onmouseup = function (evnt) {
          document.onmousemove = demMousemove;
          document.onmouseup = demMouseup;

          _this4.$nextTick(function () {
            msgBoxElem.className = msgBoxElem.className.replace(/\s?drag-move/, '');
          });
        };
      }
    }
  }
};
exports.default = _default2;