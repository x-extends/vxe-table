"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _queue = _interopRequireDefault(require("./queue"));

var _activities = _interopRequireDefault(require("./activities"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var activeModals = [];
var _default2 = {
  name: 'VxeModal',
  mixins: [_size.default],
  props: {
    value: Boolean,
    id: String,
    type: {
      type: String,
      default: 'modal'
    },
    loading: {
      type: Boolean,
      default: null
    },
    status: String,
    iconStatus: String,
    className: String,
    top: {
      type: [Number, String],
      default: 15
    },
    position: [String, Object],
    title: String,
    duration: {
      type: [Number, String],
      default: function _default() {
        return _conf.default.modal.duration;
      }
    },
    message: [String, Function],
    cancelButtonText: String,
    confirmButtonText: String,
    lockView: {
      type: Boolean,
      default: function _default() {
        return _conf.default.modal.lockView;
      }
    },
    lockScroll: Boolean,
    mask: {
      type: Boolean,
      default: function _default() {
        return _conf.default.modal.mask;
      }
    },
    maskClosable: Boolean,
    escClosable: Boolean,
    resize: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: Boolean,
    dblclickZoom: {
      type: Boolean,
      default: function _default() {
        return _conf.default.modal.dblclickZoom;
      }
    },
    width: [Number, String],
    height: [Number, String],
    minWidth: {
      type: [Number, String],
      default: function _default() {
        return _conf.default.modal.minWidth;
      }
    },
    minHeight: {
      type: [Number, String],
      default: function _default() {
        return _conf.default.modal.minHeight;
      }
    },
    zIndex: Number,
    marginSize: {
      type: [Number, String],
      default: _conf.default.modal.marginSize
    },
    fullscreen: Boolean,
    remember: {
      type: Boolean,
      default: function _default() {
        return _conf.default.modal.remember;
      }
    },
    destroyOnClose: Boolean,
    showTitleOverflow: {
      type: Boolean,
      default: function _default() {
        return _conf.default.modal.showTitleOverflow;
      }
    },
    transfer: {
      type: Boolean,
      default: function _default() {
        return _conf.default.modal.transfer;
      }
    },
    storage: {
      type: Boolean,
      default: function _default() {
        return _conf.default.modal.storage;
      }
    },
    storageKey: {
      type: String,
      default: function _default() {
        return _conf.default.modal.storageKey;
      }
    },
    animat: {
      type: Boolean,
      default: function _default() {
        return _conf.default.modal.animat;
      }
    },
    size: {
      type: String,
      default: function _default() {
        return _conf.default.modal.size || _conf.default.size;
      }
    },
    slots: Object,
    events: Object
  },
  data: function data() {
    return {
      inited: false,
      visible: false,
      contentVisible: false,
      modalTop: 0,
      modalZindex: 0,
      zoomLocat: null,
      firstOpen: false
    };
  },
  computed: {
    isMsg: function isMsg() {
      return this.type === 'message';
    }
  },
  watch: {
    width: function width() {
      this.recalculate();
    },
    height: function height() {
      this.recalculate();
    },
    value: function value(visible) {
      this[visible ? 'open' : 'close']();
    }
  },
  created: function created() {
    if (this.storage && !this.id) {
      _tools.UtilTools.error('vxe.error.reqProp', ['modal.id']);
    }

    activeModals.push(this);
  },
  mounted: function mounted() {
    var $listeners = this.$listeners,
        _this$events = this.events,
        events = _this$events === void 0 ? {} : _this$events;

    if (this.value) {
      this.open();
    }

    this.recalculate();

    if (this.escClosable) {
      _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);
    } // 触发 inserted 事件


    var type = 'inserted';
    var params = {
      type: type,
      $modal: this,
      $event: {
        type: type
      }
    };

    if ($listeners.inserted) {
      this.$emit('inserted', params);
    } else if (events.inserted) {
      events.inserted.call(this, params);
    }
  },
  beforeDestroy: function beforeDestroy() {
    var _this = this;

    var $el = this.$el;

    _tools.GlobalEvent.off(this, 'keydown');

    this.removeMsgQueue();

    if ($el.parentNode === document.body) {
      $el.parentNode.removeChild($el);
    }

    _ctor.default.remove(activeModals, function ($modal) {
      return $modal === _this;
    });
  },
  render: function render(h) {
    var _ref,
        _this2 = this;

    var $scopedSlots = this.$scopedSlots,
        _this$slots = this.slots,
        slots = _this$slots === void 0 ? {} : _this$slots,
        inited = this.inited,
        vSize = this.vSize,
        className = this.className,
        type = this.type,
        resize = this.resize,
        animat = this.animat,
        loading = this.loading,
        status = this.status,
        iconStatus = this.iconStatus,
        showFooter = this.showFooter,
        zoomLocat = this.zoomLocat,
        modalTop = this.modalTop,
        dblclickZoom = this.dblclickZoom,
        contentVisible = this.contentVisible,
        visible = this.visible,
        title = this.title,
        message = this.message,
        lockScroll = this.lockScroll,
        lockView = this.lockView,
        mask = this.mask,
        isMsg = this.isMsg,
        showTitleOverflow = this.showTitleOverflow,
        destroyOnClose = this.destroyOnClose;
    var defaultSlot = $scopedSlots.default || slots.default;
    var footerSlot = $scopedSlots.footer || slots.footer;
    var headerSlot = $scopedSlots.header || slots.header;
    var titleSlot = $scopedSlots.title || slots.title;
    var headerOns = {
      mousedown: this.mousedownEvent
    };

    if (resize && dblclickZoom && type === 'modal') {
      headerOns.dblclick = this.toggleZoomEvent;
    }

    return h('div', {
      class: ['vxe-modal--wrapper', "type--".concat(type), className || '', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "status--".concat(status), status), _defineProperty(_ref, 'is--animat', animat), _defineProperty(_ref, 'lock--scroll', lockScroll), _defineProperty(_ref, 'lock--view', lockView), _defineProperty(_ref, 'is--mask', mask), _defineProperty(_ref, 'is--maximize', zoomLocat), _defineProperty(_ref, 'is--visible', contentVisible), _defineProperty(_ref, 'is--active', visible), _defineProperty(_ref, 'is--loading', loading), _ref)],
      style: {
        zIndex: this.modalZindex,
        top: modalTop ? "".concat(modalTop, "px") : null
      },
      on: {
        click: this.selfClickEvent
      }
    }, [h('div', {
      class: 'vxe-modal--box',
      on: {
        mousedown: this.boxMousedownEvent
      },
      ref: 'modalBox'
    }, [this.showHeader ? h('div', {
      class: ['vxe-modal--header', !isMsg && showTitleOverflow ? 'is--ellipsis' : ''],
      on: headerOns
    }, headerSlot ? !inited || destroyOnClose && !visible ? [] : headerSlot.call(this, {
      $modal: this
    }, h) : [titleSlot ? titleSlot.call(this, {
      $modal: this
    }, h) : h('span', {
      class: 'vxe-modal--title'
    }, title ? _tools.UtilTools.getFuncText(title) : _conf.default.i18n('vxe.alert.title')), resize ? h('i', {
      class: ['vxe-modal--zoom-btn', 'trigger--btn', zoomLocat ? _conf.default.icon.MODAL_ZOOM_OUT : _conf.default.icon.MODAL_ZOOM_IN],
      attrs: {
        title: _conf.default.i18n("vxe.modal.zoom".concat(zoomLocat ? 'Out' : 'In'))
      },
      on: {
        click: this.toggleZoomEvent
      }
    }) : null, h('i', {
      class: ['vxe-modal--close-btn', 'trigger--btn', _conf.default.icon.MODAL_CLOSE],
      attrs: {
        title: _conf.default.i18n('vxe.modal.close')
      },
      on: {
        click: this.closeEvent
      }
    })]) : null, h('div', {
      class: 'vxe-modal--body'
    }, [status ? h('div', {
      class: 'vxe-modal--status-wrapper'
    }, [h('i', {
      class: ['vxe-modal--status-icon', iconStatus || _conf.default.icon["MODAL_".concat(status).toLocaleUpperCase()]]
    })]) : null, h('div', {
      class: 'vxe-modal--content'
    }, defaultSlot ? !inited || destroyOnClose && !visible ? [] : defaultSlot.call(this, {
      $modal: this
    }, h) : _tools.UtilTools.getFuncText(message)), !isMsg ? h('div', {
      class: ['vxe-loading', {
        'is--visible': loading
      }]
    }, [h('div', {
      class: 'vxe-loading--spinner'
    })]) : null]), showFooter ? h('div', {
      class: 'vxe-modal--footer'
    }, footerSlot ? !inited || destroyOnClose && !visible ? [] : footerSlot.call(this, {
      $modal: this
    }, h) : [type === 'confirm' ? h('vxe-button', {
      ref: 'cancelBtn',
      on: {
        click: this.cancelEvent
      }
    }, this.cancelButtonText || _conf.default.i18n('vxe.button.cancel')) : null, h('vxe-button', {
      ref: 'confirmBtn',
      props: {
        status: 'primary'
      },
      on: {
        click: this.confirmEvent
      }
    }, this.confirmButtonText || _conf.default.i18n('vxe.button.confirm'))]) : null, !isMsg && resize ? h('span', {
      class: 'vxe-modal--resize'
    }, ['wl', 'wr', 'swst', 'sest', 'st', 'swlb', 'selb', 'sb'].map(function (type) {
      return h('span', {
        class: "".concat(type, "-resize"),
        attrs: {
          'data-type': type
        },
        on: {
          mousedown: _this2.dragEvent
        }
      });
    })) : null])]);
  },
  methods: {
    recalculate: function recalculate() {
      var width = this.width,
          height = this.height;
      var modalBoxElem = this.getBox();
      modalBoxElem.style.width = width ? isNaN(width) ? width : "".concat(width, "px") : null;
      modalBoxElem.style.height = height ? isNaN(height) ? height : "".concat(height, "px") : null;
      return this.$nextTick();
    },
    selfClickEvent: function selfClickEvent(evnt) {
      if (this.maskClosable && evnt.target === this.$el) {
        var type = 'mask';
        this.close(type);
      }
    },
    updateZindex: function updateZindex() {
      var zIndex = this.zIndex,
          modalZindex = this.modalZindex;

      if (zIndex) {
        this.modalZindex = zIndex;
      } else if (modalZindex < _tools.UtilTools.getLastZIndex()) {
        this.modalZindex = _tools.UtilTools.nextZIndex();
      }
    },
    closeEvent: function closeEvent(evnt) {
      var type = 'close';
      this.$emit(type, {
        type: type,
        $modal: this,
        $event: evnt
      });
      this.close(type);
    },
    confirmEvent: function confirmEvent(evnt) {
      var type = 'confirm';
      this.$emit(type, {
        type: type,
        $modal: this,
        $event: evnt
      });
      this.close(type);
    },
    cancelEvent: function cancelEvent(evnt) {
      var type = 'cancel';
      this.$emit(type, {
        type: type,
        $modal: this,
        $event: evnt
      });
      this.close(type);
    },
    open: function open() {
      var _this3 = this;

      var $refs = this.$refs,
          _this$events2 = this.events,
          events = _this$events2 === void 0 ? {} : _this$events2,
          inited = this.inited,
          duration = this.duration,
          visible = this.visible,
          isMsg = this.isMsg,
          remember = this.remember,
          showFooter = this.showFooter;

      if (!inited) {
        this.inited = true;

        if (this.transfer) {
          document.body.appendChild(this.$el);
        }
      }

      if (!visible) {
        var type = 'show';
        var params = {
          type: type,
          $modal: this,
          $event: {
            type: type
          }
        };

        if (!remember) {
          this.recalculate();
        }

        this.visible = true;
        this.contentVisible = false;
        this.updateZindex();

        _activities.default.push(this);

        this.$emit('activated', params);
        setTimeout(function () {
          _this3.contentVisible = true;

          _this3.$nextTick(function () {
            if (showFooter) {
              var operBtn = $refs.confirmBtn || $refs.cancelBtn;

              if (operBtn) {
                operBtn.focus();
              }
            }

            if (events.show) {
              events.show.call(_this3, params);
            } else {
              _this3.$emit('input', true);

              _this3.$emit('show', params);
            }
          });
        }, 10);

        if (isMsg) {
          this.addMsgQueue();

          if (duration !== -1) {
            setTimeout(this.close, _ctor.default.toNumber(duration));
          }
        } else {
          this.$nextTick(function () {
            var firstOpen = _this3.firstOpen,
                fullscreen = _this3.fullscreen;

            if (!remember || !firstOpen) {
              _this3.updatePosition().then(function () {
                setTimeout(function () {
                  return _this3.updatePosition();
                }, 20);
              });
            }

            if (!firstOpen) {
              _this3.firstOpen = true;

              if (_this3.hasPosStorage()) {
                _this3.restorePosStorage();
              } else if (fullscreen) {
                _this3.$nextTick(function () {
                  return _this3.maximize();
                });
              }
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
      var _this4 = this;

      if (_queue.default.indexOf(this) > -1) {
        _ctor.default.remove(_queue.default, function (comp) {
          return comp === _this4;
        });
      }

      this.updateStyle();
    },
    updateStyle: function updateStyle() {
      this.$nextTick(function () {
        var offsetTop = 0;

        _queue.default.forEach(function (comp) {
          offsetTop += _ctor.default.toNumber(comp.top);
          comp.modalTop = offsetTop;
          offsetTop += comp.$refs.modalBox.clientHeight;
        });
      });
    },
    updatePosition: function updatePosition() {
      var _this5 = this;

      return this.$nextTick().then(function () {
        var marginSize = _this5.marginSize,
            position = _this5.position;

        var modalBoxElem = _this5.getBox();

        var clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var isPosCenter = position === 'center';

        var _ref2 = isPosCenter ? {
          top: position,
          left: position
        } : Object.assign({}, position),
            top = _ref2.top,
            left = _ref2.left;

        var topCenter = isPosCenter || top === 'center';
        var leftCenter = isPosCenter || left === 'center';
        var posTop = '';
        var posLeft = '';

        if (left && !leftCenter) {
          posLeft = isNaN(left) ? left : "".concat(left, "px");
        } else {
          posLeft = "".concat(Math.max(marginSize, clientVisibleWidth / 2 - modalBoxElem.offsetWidth / 2), "px");
        }

        if (top && !topCenter) {
          posTop = isNaN(top) ? top : "".concat(top, "px");
        } else {
          posTop = "".concat(Math.max(marginSize, clientVisibleHeight / 2 - modalBoxElem.offsetHeight / 2), "px");
        }

        modalBoxElem.style.top = posTop;
        modalBoxElem.style.left = posLeft;
      });
    },
    close: function close(type) {
      var _this6 = this;

      var _this$events3 = this.events,
          events = _this$events3 === void 0 ? {} : _this$events3,
          remember = this.remember,
          visible = this.visible,
          isMsg = this.isMsg;
      var params = {
        type: type,
        $modal: this,
        $event: {
          type: type
        }
      };

      if (visible) {
        if (isMsg) {
          this.removeMsgQueue();
        }

        this.contentVisible = false;

        if (!remember) {
          this.zoomLocat = null;
        }

        this.$emit('deactivated', params);

        _ctor.default.remove(_activities.default, function (item) {
          return item === _this6;
        });

        setTimeout(function () {
          _this6.visible = false;

          if (events.hide) {
            events.hide.call(_this6, params);
          } else {
            _this6.$emit('input', false);

            _this6.$emit('hide', params);
          }
        }, 200);
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var _this7 = this;

      if (evnt.keyCode === 27) {
        var lastModal = _ctor.default.max(_activities.default, function (item) {
          return item.modalZindex;
        }); // 多个时，只关掉最上层的窗口


        if (lastModal) {
          setTimeout(function () {
            if (lastModal === _this7 && lastModal.escClosable) {
              _this7.close();
            }
          }, 10);
        }
      }
    },
    getBox: function getBox() {
      return this.$refs.modalBox;
    },
    isMaximized: function isMaximized() {
      return !!this.zoomLocat;
    },
    maximize: function maximize() {
      var _this8 = this;

      return this.$nextTick().then(function () {
        if (_this8.resize && !_this8.zoomLocat) {
          var marginSize = _this8.marginSize;

          var modalBoxElem = _this8.getBox();

          var _DomTools$getDomNode = _tools.DomTools.getDomNode(),
              visibleHeight = _DomTools$getDomNode.visibleHeight,
              visibleWidth = _DomTools$getDomNode.visibleWidth;

          _this8.zoomLocat = {
            top: modalBoxElem.offsetTop,
            left: modalBoxElem.offsetLeft,
            width: modalBoxElem.offsetWidth + (modalBoxElem.style.width ? 0 : 1),
            height: modalBoxElem.offsetHeight + (modalBoxElem.style.height ? 0 : 1)
          };
          Object.assign(modalBoxElem.style, {
            top: "".concat(marginSize, "px"),
            left: "".concat(marginSize, "px"),
            width: "".concat(visibleWidth - marginSize * 2, "px"),
            height: "".concat(visibleHeight - marginSize * 2, "px")
          });

          _this8.savePosStorage();
        }
      });
    },
    revert: function revert() {
      var _this9 = this;

      return this.$nextTick().then(function () {
        var zoomLocat = _this9.zoomLocat;

        if (zoomLocat) {
          var modalBoxElem = _this9.getBox();

          _this9.zoomLocat = null;
          Object.assign(modalBoxElem.style, {
            top: "".concat(zoomLocat.top, "px"),
            left: "".concat(zoomLocat.left, "px"),
            width: "".concat(zoomLocat.width, "px"),
            height: "".concat(zoomLocat.height, "px")
          });

          _this9.savePosStorage();
        }
      });
    },
    zoom: function zoom() {
      var _this10 = this;

      return this[this.zoomLocat ? 'revert' : 'maximize']().then(function () {
        return _this10.isMaximized();
      });
    },
    toggleZoomEvent: function toggleZoomEvent(evnt) {
      var _this11 = this;

      var $listeners = this.$listeners,
          zoomLocat = this.zoomLocat,
          _this$events4 = this.events,
          events = _this$events4 === void 0 ? {} : _this$events4;
      var params = {
        type: zoomLocat ? 'revert' : 'max',
        $modal: this,
        $event: evnt
      };
      return this.zoom().then(function () {
        if ($listeners.zoom) {
          _this11.$emit('zoom', params);
        } else if (events.zoom) {
          events.zoom.call(_this11, params);
        }
      });
    },
    getPosition: function getPosition() {
      if (!this.isMsg) {
        var modalBoxElem = this.getBox();

        if (modalBoxElem) {
          return {
            top: modalBoxElem.offsetTop,
            left: modalBoxElem.offsetLeft
          };
        }
      }

      return null;
    },
    setPosition: function setPosition(top, left) {
      if (!this.isMsg) {
        var modalBoxElem = this.getBox();

        if (_ctor.default.isNumber(top)) {
          modalBoxElem.style.top = "".concat(top, "px");
        }

        if (_ctor.default.isNumber(left)) {
          modalBoxElem.style.left = "".concat(left, "px");
        }
      }

      return this.$nextTick();
    },
    boxMousedownEvent: function boxMousedownEvent() {
      var modalZindex = this.modalZindex;

      if (activeModals.some(function (_vm) {
        return _vm.visible && _vm.modalZindex > modalZindex;
      })) {
        this.updateZindex();
      }
    },
    mousedownEvent: function mousedownEvent(evnt) {
      var _this12 = this;

      var remember = this.remember,
          storage = this.storage,
          marginSize = this.marginSize,
          zoomLocat = this.zoomLocat;
      var modalBoxElem = this.getBox();

      if (!zoomLocat && evnt.button === 0 && !_tools.DomTools.getEventTargetNode(evnt, modalBoxElem, 'trigger--btn').flag) {
        evnt.preventDefault();
        var domMousemove = document.onmousemove;
        var domMouseup = document.onmouseup;
        var disX = evnt.clientX - modalBoxElem.offsetLeft;
        var disY = evnt.clientY - modalBoxElem.offsetTop;

        var _DomTools$getDomNode2 = _tools.DomTools.getDomNode(),
            visibleHeight = _DomTools$getDomNode2.visibleHeight,
            visibleWidth = _DomTools$getDomNode2.visibleWidth;

        document.onmousemove = function (evnt) {
          evnt.preventDefault();
          var offsetWidth = modalBoxElem.offsetWidth;
          var offsetHeight = modalBoxElem.offsetHeight;
          var minX = marginSize;
          var maxX = visibleWidth - offsetWidth - marginSize - 1;
          var minY = marginSize;
          var maxY = visibleHeight - offsetHeight - marginSize - 1;
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
        };

        document.onmouseup = function () {
          document.onmousemove = domMousemove;
          document.onmouseup = domMouseup;

          if (remember && storage) {
            _this12.$nextTick(function () {
              _this12.savePosStorage();
            });
          }
        };
      }
    },
    dragEvent: function dragEvent(evnt) {
      var _this13 = this;

      evnt.preventDefault();
      var $listeners = this.$listeners,
          marginSize = this.marginSize,
          _this$events5 = this.events,
          events = _this$events5 === void 0 ? {} : _this$events5,
          remember = this.remember,
          storage = this.storage;

      var _DomTools$getDomNode3 = _tools.DomTools.getDomNode(),
          visibleHeight = _DomTools$getDomNode3.visibleHeight,
          visibleWidth = _DomTools$getDomNode3.visibleWidth;

      var type = evnt.target.dataset.type;

      var minWidth = _ctor.default.toNumber(this.minWidth);

      var minHeight = _ctor.default.toNumber(this.minHeight);

      var maxWidth = visibleWidth;
      var maxHeight = visibleHeight;
      var modalBoxElem = this.getBox();
      var domMousemove = document.onmousemove;
      var domMouseup = document.onmouseup;
      var clientWidth = modalBoxElem.clientWidth;
      var clientHeight = modalBoxElem.clientHeight;
      var disX = evnt.clientX;
      var disY = evnt.clientY;
      var offsetTop = modalBoxElem.offsetTop;
      var offsetLeft = modalBoxElem.offsetLeft;
      var params = {
        type: 'resize',
        $modal: this
      };

      document.onmousemove = function (evnt) {
        evnt.preventDefault();
        var dragLeft;
        var dragTop;
        var width;
        var height;

        switch (type) {
          case 'wl':
            dragLeft = disX - evnt.clientX;
            width = dragLeft + clientWidth;

            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
                modalBoxElem.style.left = "".concat(offsetLeft - dragLeft, "px");
              }
            }

            break;

          case 'swst':
            dragLeft = disX - evnt.clientX;
            dragTop = disY - evnt.clientY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;

            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
                modalBoxElem.style.left = "".concat(offsetLeft - dragLeft, "px");
              }
            }

            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
                modalBoxElem.style.top = "".concat(offsetTop - dragTop, "px");
              }
            }

            break;

          case 'swlb':
            dragLeft = disX - evnt.clientX;
            dragTop = evnt.clientY - disY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;

            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
                modalBoxElem.style.left = "".concat(offsetLeft - dragLeft, "px");
              }
            }

            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
              }
            }

            break;

          case 'st':
            dragTop = disY - evnt.clientY;
            height = clientHeight + dragTop;

            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
                modalBoxElem.style.top = "".concat(offsetTop - dragTop, "px");
              }
            }

            break;

          case 'wr':
            dragLeft = evnt.clientX - disX;
            width = dragLeft + clientWidth;

            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
              }
            }

            break;

          case 'sest':
            dragLeft = evnt.clientX - disX;
            dragTop = disY - evnt.clientY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;

            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
              }
            }

            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
                modalBoxElem.style.top = "".concat(offsetTop - dragTop, "px");
              }
            }

            break;

          case 'selb':
            dragLeft = evnt.clientX - disX;
            dragTop = evnt.clientY - disY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;

            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                modalBoxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
              }
            }

            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
              }
            }

            break;

          case 'sb':
            dragTop = evnt.clientY - disY;
            height = dragTop + clientHeight;

            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                modalBoxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
              }
            }

            break;
        }

        modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + ' is--drag';

        if (remember && storage) {
          _this13.savePosStorage();
        }

        if ($listeners.zoom) {
          _this13.$emit('zoom', params);
        } else if (events.zoom) {
          events.zoom.call(_this13, params);
        }
      };

      document.onmouseup = function () {
        _this13.zoomLocat = null;
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        setTimeout(function () {
          modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '');
        }, 50);
      };
    },
    getStorageMap: function getStorageMap(key) {
      var version = _conf.default.version;

      var rest = _ctor.default.toStringJSON(localStorage.getItem(key));

      return rest && rest._v === version ? rest : {
        _v: version
      };
    },
    hasPosStorage: function hasPosStorage() {
      var id = this.id,
          remember = this.remember,
          storage = this.storage,
          storageKey = this.storageKey;
      return !!(remember && storage && this.getStorageMap(storageKey)[id]);
    },
    restorePosStorage: function restorePosStorage() {
      var id = this.id,
          remember = this.remember,
          storage = this.storage,
          storageKey = this.storageKey;

      if (remember && storage) {
        var posStorage = this.getStorageMap(storageKey)[id];

        if (posStorage) {
          var modalBoxElem = this.getBox();

          var _posStorage$split = posStorage.split(','),
              _posStorage$split2 = _slicedToArray(_posStorage$split, 8),
              left = _posStorage$split2[0],
              top = _posStorage$split2[1],
              width = _posStorage$split2[2],
              height = _posStorage$split2[3],
              zoomLeft = _posStorage$split2[4],
              zoomTop = _posStorage$split2[5],
              zoomWidth = _posStorage$split2[6],
              zoomHeight = _posStorage$split2[7];

          if (left) {
            modalBoxElem.style.left = "".concat(left, "px");
          }

          if (top) {
            modalBoxElem.style.top = "".concat(top, "px");
          }

          if (width) {
            modalBoxElem.style.width = "".concat(width, "px");
          }

          if (height) {
            modalBoxElem.style.height = "".concat(height, "px");
          }

          if (zoomLeft && zoomTop) {
            this.zoomLocat = {
              left: zoomLeft,
              top: zoomTop,
              width: zoomWidth,
              height: zoomHeight
            };
          }
        }
      }
    },
    savePosStorage: function savePosStorage() {
      var id = this.id,
          remember = this.remember,
          storage = this.storage,
          storageKey = this.storageKey,
          zoomLocat = this.zoomLocat;

      if (remember && storage) {
        var modalBoxElem = this.getBox();
        var posStorageMap = this.getStorageMap(storageKey);
        posStorageMap[id] = [modalBoxElem.style.left, modalBoxElem.style.top, modalBoxElem.style.width, modalBoxElem.style.height].concat(zoomLocat ? [zoomLocat.left, zoomLocat.top, zoomLocat.width, zoomLocat.height] : []).map(function (val) {
          return val ? _ctor.default.toNumber(val) : '';
        }).join(',');
        localStorage.setItem(storageKey, _ctor.default.toJSONString(posStorageMap));
      }
    }
  }
};
exports.default = _default2;