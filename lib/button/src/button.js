"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxeButton',
  mixins: [_size.default],
  props: {
    type: String,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.button.size || _conf.default.size;
      }
    },
    name: [String, Number],
    content: String,
    placement: String,
    status: String,
    icon: String,
    round: Boolean,
    circle: Boolean,
    disabled: Boolean,
    loading: Boolean,
    destroyOnClose: Boolean,
    transfer: {
      type: Boolean,
      default: function _default() {
        return _conf.default.button.transfer;
      }
    }
  },
  data: function data() {
    return {
      inited: false,
      showPanel: false,
      animatVisible: false,
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null
    };
  },
  computed: {
    isText: function isText() {
      return this.type === 'text';
    },
    isFormBtn: function isFormBtn() {
      return ['submit', 'reset', 'button'].indexOf(this.type) > -1;
    },
    btnType: function btnType() {
      return this.isText ? this.type : 'button';
    },
    btnStatus: function btnStatus() {
      return this.status;
    }
  },
  created: function created() {
    _tools.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);
  },
  beforeDestroy: function beforeDestroy() {
    var panelElem = this.$refs.panel;

    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem);
    }
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'mousewheel');
  },
  render: function render(h) {
    var _ref,
        _ref2,
        _this = this,
        _ref3,
        _ref4;

    var $scopedSlots = this.$scopedSlots,
        $listeners = this.$listeners,
        inited = this.inited,
        type = this.type,
        destroyOnClose = this.destroyOnClose,
        isFormBtn = this.isFormBtn,
        btnStatus = this.btnStatus,
        btnType = this.btnType,
        vSize = this.vSize,
        name = this.name,
        disabled = this.disabled,
        loading = this.loading,
        showPanel = this.showPanel,
        animatVisible = this.animatVisible,
        panelPlacement = this.panelPlacement;
    var downsSlot = $scopedSlots.dropdowns;
    return downsSlot ? h('div', {
      class: ['vxe-button--dropdown', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--active', showPanel), _ref)]
    }, [h('button', {
      ref: 'btn',
      class: ['vxe-button', "type--".concat(btnType), (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, "theme--".concat(btnStatus), btnStatus), _defineProperty(_ref2, 'is--round', this.round), _defineProperty(_ref2, 'is--circle', this.circle), _defineProperty(_ref2, 'is--disabled', disabled || loading), _defineProperty(_ref2, 'is--loading', loading), _ref2)],
      attrs: {
        name: name,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading
      },
      on: Object.assign({
        mouseenter: this.mouseenterEvent,
        mouseleave: this.mouseleaveEvent
      }, _ctor.default.objectMap($listeners, function (cb, type) {
        return function (evnt) {
          return _this.$emit(type, {
            $event: evnt
          });
        };
      }))
    }, this.renderContent(h).concat([h('i', {
      class: "vxe-button--dropdown-arrow ".concat(_conf.default.icon.BUTTON_DROPDOWN)
    })])), h('div', {
      ref: 'panel',
      class: ['vxe-button--dropdown-panel', (_ref3 = {}, _defineProperty(_ref3, "size--".concat(vSize), vSize), _defineProperty(_ref3, 'animat--leave', animatVisible), _defineProperty(_ref3, 'animat--enter', showPanel), _ref3)],
      attrs: {
        'data-placement': panelPlacement
      },
      style: this.panelStyle
    }, inited ? [h('div', {
      class: 'vxe-button--dropdown-wrapper',
      on: {
        click: this.clickDropdownEvent,
        mouseenter: this.mouseenterEvent,
        mouseleave: this.mouseleaveEvent
      }
    }, destroyOnClose && !showPanel ? [] : downsSlot.call(this, {}, h))] : null)]) : h('button', {
      ref: 'btn',
      class: ['vxe-button', "type--".concat(btnType), (_ref4 = {}, _defineProperty(_ref4, "size--".concat(vSize), vSize), _defineProperty(_ref4, "theme--".concat(btnStatus), btnStatus), _defineProperty(_ref4, 'is--round', this.round), _defineProperty(_ref4, 'is--circle', this.circle), _defineProperty(_ref4, 'is--disabled', disabled || loading), _defineProperty(_ref4, 'is--loading', loading), _ref4)],
      attrs: {
        name: name,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading
      },
      on: _ctor.default.objectMap($listeners, function (cb, type) {
        return function (evnt) {
          return _this.$emit(type, {
            $event: evnt
          });
        };
      })
    }, this.renderContent(h));
  },
  methods: {
    renderContent: function renderContent(h) {
      var $scopedSlots = this.$scopedSlots,
          content = this.content,
          icon = this.icon,
          loading = this.loading;
      var contents = [];

      if (loading) {
        contents.push(h('i', {
          class: ['vxe-button--loading-icon', _conf.default.icon.BUTTON_LOADING]
        }));
      } else if (icon) {
        contents.push(h('i', {
          class: ['vxe-button--icon', icon]
        }));
      }

      if ($scopedSlots.default) {
        contents.push(h('span', {
          class: 'vxe-button--content'
        }, $scopedSlots.default.call(this)));
      } else if (content) {
        contents.push(h('span', {
          class: 'vxe-button--content'
        }, [_tools.UtilTools.getFuncText(content)]));
      }

      return contents;
    },
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      if (this.showPanel && !_tools.DomTools.getEventTargetNode(evnt, this.$refs.panel).flag) {
        this.updatePlacement();
      }
    },
    updateZindex: function updateZindex() {
      if (this.panelIndex < _tools.UtilTools.getLastZIndex()) {
        this.panelIndex = _tools.UtilTools.nextZIndex();
      }
    },
    clickDropdownEvent: function clickDropdownEvent(evnt) {
      var _this2 = this;

      var dropdownElem = evnt.currentTarget;
      var panelElem = this.$refs.panel;

      var _DomTools$getEventTar = _tools.DomTools.getEventTargetNode(evnt, dropdownElem, 'vxe-button'),
          flag = _DomTools$getEventTar.flag,
          targetElem = _DomTools$getEventTar.targetElem;

      if (flag) {
        panelElem.dataset.active = 'N';
        this.showPanel = false;
        setTimeout(function () {
          if (panelElem.dataset.active !== 'Y') {
            _this2.animatVisible = false;
          }
        }, 350);
        this.$emit('dropdown-click', {
          name: targetElem.getAttribute('name'),
          $event: evnt
        });
      }
    },
    mouseenterEvent: function mouseenterEvent() {
      var _this3 = this;

      var panelElem = this.$refs.panel;

      if (!this.inited) {
        this.inited = true;

        if (this.transfer) {
          document.body.appendChild(panelElem);
        }
      }

      panelElem.dataset.active = 'Y';
      this.animatVisible = true;
      setTimeout(function () {
        if (panelElem.dataset.active === 'Y') {
          _this3.showPanel = true;

          _this3.updateZindex();

          _this3.updatePlacement();
        }
      }, 10);
    },
    mouseleaveEvent: function mouseleaveEvent() {
      var _this4 = this;

      var panelElem = this.$refs.panel;
      panelElem.dataset.active = 'N';
      setTimeout(function () {
        if (panelElem.dataset.active !== 'Y') {
          _this4.showPanel = false;
          setTimeout(function () {
            if (panelElem.dataset.active !== 'Y') {
              _this4.animatVisible = false;
            }
          }, 350);
        }
      }, 100);
    },
    updatePlacement: function updatePlacement() {
      var _this5 = this;

      return this.$nextTick().then(function () {
        var $refs = _this5.$refs,
            transfer = _this5.transfer,
            placement = _this5.placement,
            panelIndex = _this5.panelIndex;
        var targetElem = $refs.btn;
        var panelElem = $refs.panel;

        if (panelElem && targetElem) {
          var targetHeight = targetElem.offsetHeight;
          var targetWidth = targetElem.offsetWidth;
          var panelHeight = panelElem.offsetHeight;
          var panelWidth = panelElem.offsetWidth;
          var marginSize = 5;
          var panelStyle = {
            zIndex: panelIndex
          };

          var _DomTools$getAbsolute = _tools.DomTools.getAbsolutePos(targetElem),
              boundingTop = _DomTools$getAbsolute.boundingTop,
              boundingLeft = _DomTools$getAbsolute.boundingLeft,
              visibleHeight = _DomTools$getAbsolute.visibleHeight,
              visibleWidth = _DomTools$getAbsolute.visibleWidth;

          var panelPlacement = 'bottom';

          if (transfer) {
            var left = boundingLeft;
            var top = boundingTop + targetHeight;

            if (placement === 'top') {
              panelPlacement = 'top';
              top = boundingTop - panelHeight;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top';
                top = boundingTop - panelHeight;
              } // 如果上面不够放，则向下（优先）


              if (top < marginSize) {
                panelPlacement = 'bottom';
                top = boundingTop + targetHeight;
              }
            } // 如果溢出右边


            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth;
            } // 如果溢出左边


            if (left < marginSize) {
              left = marginSize;
            }

            Object.assign(panelStyle, {
              left: "".concat(left, "px"),
              top: "".concat(top, "px"),
              minWidth: "".concat(targetWidth, "px")
            });
          } else {
            if (placement === 'top') {
              panelPlacement = 'top';
              panelStyle.bottom = "".concat(targetHeight, "px");
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top';
                  panelStyle.bottom = "".concat(targetHeight, "px");
                }
              }
            }
          }

          _this5.panelStyle = panelStyle;
          _this5.panelPlacement = panelPlacement;
          return _this5.$nextTick();
        }
      });
    },
    focus: function focus() {
      this.$el.focus();
      return this.$nextTick();
    },
    blur: function blur() {
      this.$el.blur();
      return this.$nextTick();
    }
  }
};
exports.default = _default2;