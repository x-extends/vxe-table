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
    type: {
      type: String,
      default: 'modal'
    },
    status: String,
    top: {
      type: [Number, String],
      default: 15
    },
    title: String,
    duration: {
      type: [Number, String],
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
    lockScroll: Boolean,
    mask: {
      type: Boolean,
      default: function _default() {
        return _conf.default.message.mask;
      }
    },
    maskClosable: Boolean,
    escClosable: Boolean,
    resize: Boolean,
    width: [Number, String],
    height: [Number, String],
    zIndex: {
      type: [Number, String],
      default: function _default() {
        return _conf.default.message.zIndex;
      }
    },
    marginSize: {
      type: [Number, String],
      default: _conf.default.message.marginSize
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
      modalTop: 0
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
    var _ref,
        _this = this;

    var vSize = this.vSize,
        type = this.type,
        resize = this.resize,
        animat = this.animat,
        width = this.width,
        height = this.height,
        zIndex = this.zIndex,
        status = this.status,
        modalTop = this.modalTop,
        contentVisible = this.contentVisible,
        visible = this.visible,
        title = this.title,
        message = this.message,
        lockScroll = this.lockScroll,
        lockView = this.lockView,
        mask = this.mask,
        isMsg = this.isMsg;
    return h('div', {
      class: ['vxe-modal--wrapper', "type--".concat(type), (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "status--".concat(status), status), _defineProperty(_ref, 'is--animat', animat), _defineProperty(_ref, 'lock--scroll', lockScroll), _defineProperty(_ref, 'lock--view', lockView), _defineProperty(_ref, 'is--mask', mask), _defineProperty(_ref, 'is--visible', contentVisible), _defineProperty(_ref, "active", visible), _ref)],
      style: {
        zIndex: zIndex,
        top: modalTop ? "".concat(modalTop, "px") : null
      },
      on: {
        click: this.selfClickEvent
      }
    }, [h('div', {
      class: 'vxe-modal--box',
      style: {
        width: width ? isNaN(width) ? width : "".concat(width, "px") : null,
        height: height ? isNaN(height) ? height : "".concat(height, "px") : null
      },
      ref: 'modalBox'
    }, [!isMsg ? h('div', {
      class: 'vxe-modal--header',
      on: {
        mousedown: this.mousedownEvent
      }
    }, [h('span', {
      class: 'vxe-modal--title'
    }, title ? _tools.UtilTools.getFuncText(title) : _conf.default.i18n('vxe.alert.title')), h('i', {
      class: ['vxe-modal--close-btn', _conf.default.icon.modalClose],
      on: {
        click: this.closeEvent
      }
    })]) : null, h('div', {
      class: 'vxe-modal--body'
    }, [status ? h('div', {
      class: 'vxe-modal--status-wrapper'
    }, [h('i', {
      class: ['vxe-modal--status-icon', _conf.default.icon["modal".concat(status.replace(/\b(\w)/, function (word) {
        return word.toUpperCase();
      }))]]
    })]) : null, h('div', {
      class: 'vxe-modal--content'
    }, this.$slots.default || (_xeUtils.default.isFunction(message) ? message.call(this, h) : message))]), !isMsg ? h('div', {
      class: 'vxe-modal--footer'
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
    }, _conf.default.i18n('vxe.button.confirm'))]) : null, !isMsg && resize ? h('span', {
      class: 'vxe-modal--resize'
    }, ['wl', 'wr', 'swlb', 'selb', 'bs'].map(function (type) {
      return h('span', {
        class: "".concat(type, "-resize"),
        on: {
          mousedown: _this["".concat(type, "MousedownEvent")]
        }
      });
    })) : null])]);
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
      var _this2 = this;

      var duration = this.duration,
          visible = this.visible,
          _handleCustom = this._handleCustom,
          isMsg = this.isMsg;

      if (!visible) {
        this.visible = true;
        this.contentVisible = false;
        setTimeout(function () {
          _this2.contentVisible = true;
        }, 10);

        if (!_handleCustom) {
          this.$emit('input', true);
          this.$emit('show');
        }

        if (isMsg) {
          this.addMsgQueue();
          setTimeout(this.close, _xeUtils.default.toNumber(duration));
        } else {
          this.$nextTick(function () {
            var $refs = _this2.$refs,
                marginSize = _this2.marginSize;
            var modalBoxElem = $refs.modalBox;
            var clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
            var clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
            modalBoxElem.style.left = "".concat(clientVisibleWidth / 2 - modalBoxElem.offsetWidth / 2, "px");

            if (modalBoxElem.offsetHeight + modalBoxElem.offsetTop + marginSize > clientVisibleHeight) {
              modalBoxElem.style.top = "".concat(marginSize, "px");
            }
          });
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
      var _this3 = this;

      if (_queue.default.indexOf(this) > -1) {
        _xeUtils.default.remove(_queue.default, function (comp) {
          return comp === _this3;
        });
      }

      this.updateStyle();
    },
    updateStyle: function updateStyle() {
      this.$nextTick(function () {
        var offsetTop = 0;

        _queue.default.forEach(function (comp) {
          offsetTop += _xeUtils.default.toNumber(comp.top);
          comp.modalTop = offsetTop;
          offsetTop += comp.$refs.modalBox.clientHeight;
        });
      });
    },
    close: function close(type) {
      var _this4 = this;

      var visible = this.visible,
          isMsg = this.isMsg;

      if (visible) {
        if (isMsg) {
          this.removeMsgQueue();
        }

        this.contentVisible = false;
        setTimeout(function () {
          _this4.visible = false;

          if (_this4._handleCustom) {
            _this4._handleCustom(type);
          } else {
            _this4.$emit('input', false);

            _this4.$emit('hide', type);
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
      var _this5 = this;

      if (evnt.button === 0) {
        evnt.preventDefault();
        var $refs = this.$refs,
            marginSize = this.marginSize;
        var modalBoxElem = $refs.modalBox;
        var demMousemove = document.onmousemove;
        var demMouseup = document.onmouseup;
        var disX = evnt.clientX - modalBoxElem.offsetLeft;
        var disY = evnt.clientY - modalBoxElem.offsetTop;

        document.onmousemove = function (evnt) {
          evnt.preventDefault();
          var clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
          var clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
          var offsetWidth = modalBoxElem.offsetWidth;
          var offsetHeight = modalBoxElem.offsetHeight;
          var minX = marginSize;
          var maxX = clientVisibleWidth - offsetWidth - marginSize;
          var minY = marginSize;
          var maxY = clientVisibleHeight - offsetHeight - marginSize;
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

          modalBoxElem.style.left = "".concat(left, "px");
          modalBoxElem.style.top = "".concat(top, "px");
          modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + " is--drag";
        };

        document.onmouseup = function (evnt) {
          document.onmousemove = demMousemove;
          document.onmouseup = demMouseup;

          _this5.$nextTick(function () {
            modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '');
          });
        };
      }
    },
    resizeWinEvent: function resizeWinEvent(type, evnt) {
      evnt.preventDefault();
      var clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
      var clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
      var minWidth = 340;
      var maxWidth = clientVisibleWidth - 20;
      var minHeight = 200;
      var maxHeight = clientVisibleHeight - 20;
      var modalBoxElem = this.$refs.modalBox;
      var demMousemove = document.onmousemove;
      var demMouseup = document.onmouseup;
      var clientWidth = modalBoxElem.clientWidth;
      var clientHeight = modalBoxElem.clientHeight;
      var disX = evnt.clientX;
      var disY = evnt.clientY;

      switch (type) {
        case 'l-w':
        case 'lb-sw':
          modalBoxElem.style.right = "".concat(clientVisibleWidth - clientWidth - modalBoxElem.offsetLeft, "px");
          modalBoxElem.style.left = 'auto';
          break;

        case 'r-w':
        case 'lb-se':
          modalBoxElem.style.left = "".concat(modalBoxElem.offsetLeft, "px");
          modalBoxElem.style.right = 'auto';
          break;
      }

      document.onmousemove = function (evnt) {
        evnt.preventDefault();
        var offsetLeft;
        var offsetTop;
        var width;
        var height;

        switch (type) {
          case 'l-w':
            offsetLeft = disX - evnt.clientX;
            width = offsetLeft + clientWidth;
            modalBoxElem.style.width = "".concat(width > minWidth ? width < maxWidth ? width : maxWidth : minWidth, "px");
            break;

          case 'lb-sw':
            offsetLeft = disX - evnt.clientX;
            offsetTop = evnt.clientY - disY;
            width = offsetLeft + clientWidth;
            height = offsetTop + clientHeight;
            modalBoxElem.style.width = "".concat(width > minWidth ? width < maxWidth ? width : maxWidth : minWidth, "px");
            modalBoxElem.style.height = "".concat(height > minHeight ? height < maxHeight ? height : maxHeight : minHeight, "px");
            break;

          case 'r-w':
            offsetLeft = evnt.clientX - disX;
            width = offsetLeft + clientWidth;
            modalBoxElem.style.width = "".concat(width > minWidth ? width < maxWidth ? width : maxWidth : minWidth, "px");
            break;

          case 'lb-se':
            offsetLeft = evnt.clientX - disX;
            offsetTop = evnt.clientY - disY;
            width = offsetLeft + clientWidth;
            height = offsetTop + clientHeight;
            modalBoxElem.style.width = "".concat(width > minWidth ? width < maxWidth ? width : maxWidth : minWidth, "px");
            modalBoxElem.style.height = "".concat(height > minHeight ? height < maxHeight ? height : maxHeight : minHeight, "px");
            break;

          case 'b-s':
            offsetTop = evnt.clientY - disY;
            height = offsetTop + clientHeight;
            modalBoxElem.style.height = "".concat(height > minHeight ? height < maxHeight ? height : maxHeight : minHeight, "px");
            break;
        }

        modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + " is--drag";
      };

      document.onmouseup = function (evnt) {
        document.onmousemove = demMousemove;
        document.onmouseup = demMouseup;
        setTimeout(function () {
          modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '');
        }, 50);
      };
    },
    wlMousedownEvent: function wlMousedownEvent(evnt) {
      this.resizeWinEvent('l-w', evnt);
    },
    wrMousedownEvent: function wrMousedownEvent(evnt) {
      this.resizeWinEvent('r-w', evnt);
    },
    swlbMousedownEvent: function swlbMousedownEvent(evnt) {
      this.resizeWinEvent('lb-sw', evnt);
    },
    selbMousedownEvent: function selbMousedownEvent(evnt) {
      this.resizeWinEvent('lb-se', evnt);
    },
    bsMousedownEvent: function bsMousedownEvent(evnt) {
      this.resizeWinEvent('b-s', evnt);
    }
  }
};
exports.default = _default2;