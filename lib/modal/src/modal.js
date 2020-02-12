"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _queue = _interopRequireDefault(require("./queue"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    loading: {
      type: Boolean,
      default: null
    },
    status: String,
    iconStatus: String,
    top: {
      type: [Number, String],
      default: 15
    },
    title: String,
    duration: {
      type: [Number, String],
      default: function _default() {
        return _conf.default.modal.duration;
      }
    },
    message: [String, Function],
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
    size: String,
    slots: Object,
    events: Object
  },
  data: function data() {
    return {
      visible: false,
      isLoading: false,
      contentVisible: false,
      modalTop: 0,
      modalZindex: this.zIndex || _tools.UtilTools.nextZIndex(),
      zoomLocat: null,
      inited: false
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
    width: function width() {
      this.recalculate();
    },
    height: function height() {
      this.recalculate();
    },
    value: function value(visible) {
      this[visible ? 'open' : 'close']();
    },
    loading: function loading() {
      if (!this.isLoading) {
        this.isLoading = true;
      }
    }
  },
  created: function created() {
    // 是否加载过 Loading 模块
    this.isLoading = this.loading;

    if (!_vXETable.default._loading && _xeUtils.default.isBoolean(this.loading)) {
      throw new Error(_tools.UtilTools.getLog('vxe.error.reqModule', ['Loading']));
    }

    if (this.storage && !this.id) {
      _tools.UtilTools.error('vxe.error.reqProp', ['id']);
    }
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
    }

    document.body.appendChild(this.$el); // 触发 inserted 事件

    var params = {
      type: 'inserted',
      $modal: this
    };

    if ($listeners.inserted) {
      this.$emit('inserted', params);
    } else if (events.inserted) {
      events.inserted.call(this, params);
    }
  },
  beforeDestroy: function beforeDestroy() {
    _tools.GlobalEvent.off(this, 'keydown');

    this.removeMsgQueue();
    this.$el.parentNode.removeChild(this.$el);
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var $scopedSlots = this.$scopedSlots,
        _this$slots = this.slots,
        slots = _this$slots === void 0 ? {} : _this$slots,
        vSize = this.vSize,
        type = this.type,
        resize = this.resize,
        animat = this.animat,
        loading = this.loading,
        isLoading = this.isLoading,
        status = this.status,
        iconStatus = this.iconStatus,
        showHeader = this.showHeader,
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
      class: ['vxe-modal--wrapper', "type--".concat(type), (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, "status--".concat(status), status), _defineProperty(_ref, 'is--animat', animat), _defineProperty(_ref, 'lock--scroll', lockScroll), _defineProperty(_ref, 'lock--view', lockView), _defineProperty(_ref, 'is--mask', mask), _defineProperty(_ref, 'is--maximize', zoomLocat), _defineProperty(_ref, 'is--visible', contentVisible), _defineProperty(_ref, 'is--active', visible), _defineProperty(_ref, 'is--loading', loading), _ref)],
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
        mousedown: this.updateZindex
      },
      ref: 'modalBox'
    }, [showHeader ? h('div', {
      class: ['vxe-modal--header', !isMsg && showTitleOverflow ? 'is--ellipsis' : ''],
      on: headerOns
    }, headerSlot ? headerSlot.call(this, {
      $modal: this
    }, h) : [titleSlot ? titleSlot.call(this, {
      $modal: this
    }, h) : h('span', {
      class: 'vxe-modal--title'
    }, title ? _tools.UtilTools.getFuncText(title) : _conf.default.i18n('vxe.alert.title')), resize ? h('i', {
      class: ['vxe-modal--zoom-btn', 'trigger--btn', zoomLocat ? _conf.default.icon.modalZoomOut : _conf.default.icon.modalZoomIn],
      attrs: {
        title: _conf.default.i18n("vxe.modal.zoom".concat(zoomLocat ? 'Out' : 'In'))
      },
      on: {
        click: this.toggleZoomEvent
      }
    }) : null, h('i', {
      class: ['vxe-modal--close-btn', 'trigger--btn', _conf.default.icon.modalClose],
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
      class: ['vxe-modal--status-icon', iconStatus || _conf.default.icon["modal".concat(status.replace(/\b(\w)/, function (word) {
        return word.toUpperCase();
      }))]]
    })]) : null, h('div', {
      class: 'vxe-modal--content'
    }, destroyOnClose && !visible ? [] : defaultSlot ? defaultSlot.call(this, {
      $modal: this
    }, h) : _xeUtils.default.isFunction(message) ? message.call(this, h) : message), _vXETable.default._loading && isLoading && !isMsg ? h('vxe-loading', {
      props: {
        visible: loading
      }
    }) : null]), showFooter ? h('div', {
      class: 'vxe-modal--footer'
    }, destroyOnClose && !visible ? [] : footerSlot ? footerSlot.call(this, {
      $modal: this
    }, h) : [type === 'confirm' ? h('vxe-button', {
      on: {
        click: this.cancelEvent
      }
    }, _conf.default.i18n('vxe.button.cancel')) : null, h('vxe-button', {
      props: {
        status: 'primary'
      },
      on: {
        click: this.confirmEvent
      }
    }, _conf.default.i18n('vxe.button.confirm'))]) : null, !isMsg && resize ? h('span', {
      class: 'vxe-modal--resize'
    }, ['wl', 'wr', 'swst', 'sest', 'st', 'swlb', 'selb', 'sb'].map(function (type) {
      return h('span', {
        class: "".concat(type, "-resize"),
        attrs: {
          'data-type': type
        },
        on: {
          mousedown: _this.dragEvent
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
      if (this.modalZindex < _tools.UtilTools.getLastZIndex()) {
        this.modalZindex = _tools.UtilTools.nextZIndex();
      }
    },
    closeEvent: function closeEvent(evnt) {
      var type = 'close';
      this.$emit(type, {
        type: type,
        $modal: this
      }, evnt);
      this.close(type);
    },
    confirmEvent: function confirmEvent(evnt) {
      var type = 'confirm';
      this.$emit(type, {
        type: type,
        $modal: this
      }, evnt);
      this.close(type);
    },
    cancelEvent: function cancelEvent(evnt) {
      var type = 'cancel';
      this.$emit(type, {
        type: type,
        $modal: this
      }, evnt);
      this.close(type);
    },
    open: function open() {
      var _this2 = this;

      var $listeners = this.$listeners,
          _this$events2 = this.events,
          events = _this$events2 === void 0 ? {} : _this$events2,
          duration = this.duration,
          visible = this.visible,
          isMsg = this.isMsg,
          remember = this.remember;

      if (!visible) {
        var params = {
          type: 'show',
          $modal: this
        };

        if (!remember) {
          this.recalculate();
        }

        this.visible = true;
        this.contentVisible = false;
        this.updateZindex();
        this.$emit('activated', params);
        setTimeout(function () {
          _this2.contentVisible = true;

          _this2.$nextTick(function () {
            if (!events.show) {
              _this2.$emit('input', true);

              _this2.$emit('show', params);
            }

            if (!$listeners.show && events.show) {
              events.show.call(_this2, params);
            }
          });
        }, 10);

        if (isMsg) {
          this.addMsgQueue();
          setTimeout(this.close, _xeUtils.default.toNumber(duration));
        } else {
          this.$nextTick(function () {
            var inited = _this2.inited,
                marginSize = _this2.marginSize,
                fullscreen = _this2.fullscreen;

            if (!remember || !inited) {
              var modalBoxElem = _this2.getBox();

              var clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
              var clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
              modalBoxElem.style.top = '';
              modalBoxElem.style.left = "".concat(clientVisibleWidth / 2 - modalBoxElem.offsetWidth / 2, "px");

              if (modalBoxElem.offsetHeight + modalBoxElem.offsetTop + marginSize > clientVisibleHeight) {
                modalBoxElem.style.top = "".concat(marginSize, "px");
              }
            }

            if (!inited) {
              _this2.inited = true;

              if (_this2.hasPosStorage()) {
                _this2.restorePosStorage();
              } else if (fullscreen) {
                _this2.$nextTick(_this2.maximize);
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

      var _this$events3 = this.events,
          events = _this$events3 === void 0 ? {} : _this$events3,
          visible = this.visible,
          isMsg = this.isMsg;
      var params = {
        type: type,
        $modal: this
      };

      if (visible) {
        if (isMsg) {
          this.removeMsgQueue();
        }

        this.contentVisible = false;

        if (events.hide) {
          events.hide.call(this, params);
        } else {
          this.$emit('hide', params);
        }

        setTimeout(function () {
          _this4.visible = false;

          if (!events.hide) {
            _this4.$emit('input', false);
          }

          _this4.$emit('deactivated', params);
        }, 200);
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      if (evnt.keyCode === 27) {
        this.close();
      }
    },
    getBox: function getBox() {
      return this.$refs.modalBox;
    },
    maximize: function maximize() {
      var _this5 = this;

      return this.$nextTick().then(function () {
        if (!_this5.zoomLocat) {
          var marginSize = _this5.marginSize;

          var modalBoxElem = _this5.getBox();

          var _DomTools$getDomNode = _tools.DomTools.getDomNode(),
              visibleHeight = _DomTools$getDomNode.visibleHeight,
              visibleWidth = _DomTools$getDomNode.visibleWidth;

          _this5.zoomLocat = {
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

          _this5.savePosStorage();
        }
      });
    },
    revert: function revert() {
      var _this6 = this;

      return this.$nextTick().then(function () {
        var zoomLocat = _this6.zoomLocat;

        if (zoomLocat) {
          var modalBoxElem = _this6.getBox();

          _this6.zoomLocat = null;
          Object.assign(modalBoxElem.style, {
            top: "".concat(zoomLocat.top, "px"),
            left: "".concat(zoomLocat.left, "px"),
            width: "".concat(zoomLocat.width, "px"),
            height: "".concat(zoomLocat.height, "px")
          });

          _this6.savePosStorage();
        }
      });
    },
    toggleZoomEvent: function toggleZoomEvent(evnt) {
      var _this7 = this;

      var $listeners = this.$listeners,
          zoomLocat = this.zoomLocat,
          _this$events4 = this.events,
          events = _this$events4 === void 0 ? {} : _this$events4;
      var params = {
        type: zoomLocat ? 'min' : 'max',
        $modal: this
      };
      return this[zoomLocat ? 'revert' : 'maximize']().then(function () {
        if ($listeners.zoom) {
          _this7.$emit('zoom', params, evnt);
        } else if (events.zoom) {
          events.zoom.call(_this7, params, evnt);
        }
      });
    },
    mousedownEvent: function mousedownEvent(evnt) {
      var _this8 = this;

      var remember = this.remember,
          storage = this.storage,
          marginSize = this.marginSize,
          zoomLocat = this.zoomLocat;
      var modalBoxElem = this.getBox();

      if (!zoomLocat && evnt.button === 0 && !_tools.DomTools.getEventTargetNode(evnt, modalBoxElem, 'trigger--btn').flag) {
        evnt.preventDefault();
        var demMousemove = document.onmousemove;
        var demMouseup = document.onmouseup;
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
          var maxX = visibleWidth - offsetWidth - marginSize;
          var minY = marginSize;
          var maxY = visibleHeight - offsetHeight - marginSize;
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

          _this8.$nextTick(function () {
            modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '');

            if (remember && storage) {
              _this8.savePosStorage();
            }
          });
        };
      }
    },
    dragEvent: function dragEvent(evnt) {
      var _this9 = this;

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

      var minWidth = _xeUtils.default.toNumber(this.minWidth);

      var minHeight = _xeUtils.default.toNumber(this.minHeight);

      var maxWidth = visibleWidth - 20;
      var maxHeight = visibleHeight - 20;
      var modalBoxElem = this.getBox();
      var demMousemove = document.onmousemove;
      var demMouseup = document.onmouseup;
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

        modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + " is--drag";

        if (remember && storage) {
          _this9.savePosStorage();
        }

        if ($listeners.zoom) {
          _this9.$emit('zoom', params, evnt);
        } else if (events.zoom) {
          events.zoom.call(_this9, params, evnt);
        }
      };

      document.onmouseup = function (evnt) {
        _this9.zoomLocat = null;
        document.onmousemove = demMousemove;
        document.onmouseup = demMouseup;
        setTimeout(function () {
          modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '');
        }, 50);
      };
    },
    getStorageMap: function getStorageMap(key) {
      var version = _conf.default.version;

      var rest = _xeUtils.default.toStringJSON(localStorage.getItem(key));

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
          return val ? _xeUtils.default.toNumber(val) : '';
        }).join(',');
        localStorage.setItem(storageKey, _xeUtils.default.toJSONString(posStorageMap));
      }
    }
  }
};
exports.default = _default2;