"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxePulldown',
  mixins: [_size.default],
  props: {
    disabled: Boolean,
    placement: String,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.size;
      }
    },
    destroyOnClose: Boolean,
    transfer: Boolean
  },
  data: function data() {
    return {
      inited: false,
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null,
      currentValue: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false
    };
  },
  created: function created() {
    _tools.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  beforeDestroy: function beforeDestroy() {
    var panelElem = this.$refs.panel;

    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem);
    }
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'mousewheel');

    _tools.GlobalEvent.off(this, 'mousedown');

    _tools.GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref, _ref2;

    var $scopedSlots = this.$scopedSlots,
        inited = this.inited,
        vSize = this.vSize,
        destroyOnClose = this.destroyOnClose,
        transfer = this.transfer,
        isActivated = this.isActivated,
        disabled = this.disabled,
        animatVisible = this.animatVisible,
        visiblePanel = this.visiblePanel,
        panelStyle = this.panelStyle,
        panelPlacement = this.panelPlacement;
    var defaultSlot = $scopedSlots.default;
    var downSlot = $scopedSlots.dropdown;
    return h('div', {
      class: ['vxe-pulldown', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--visivle', visiblePanel), _defineProperty(_ref, 'is--disabled', disabled), _defineProperty(_ref, 'is--active', isActivated), _ref)]
    }, [h('div', {
      ref: 'content',
      class: 'vxe-pulldown--content'
    }, defaultSlot ? defaultSlot.call(this, {
      $pulldown: this
    }, h) : []), h('div', {
      ref: 'panel',
      class: ['vxe-table--ignore-clear vxe-pulldown--panel', (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, 'is--transfer', transfer), _defineProperty(_ref2, 'animat--leave', animatVisible), _defineProperty(_ref2, 'animat--enter', visiblePanel), _ref2)],
      attrs: {
        'data-placement': panelPlacement
      },
      style: panelStyle
    }, downSlot ? !inited || destroyOnClose && !visiblePanel && !animatVisible ? [] : downSlot.call(this, {
      $pulldown: this
    }, h) : [])]);
  },
  methods: {
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        if (visiblePanel) {
          if (_tools.DomTools.getEventTargetNode(evnt, $refs.panel).flag) {
            this.updatePlacement();
          } else {
            this.hidePanel();
            this.$emit('hide-panel', {
              $event: evnt
            });
          }
        }
      }
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var $refs = this.$refs,
          $el = this.$el,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        this.isActivated = _tools.DomTools.getEventTargetNode(evnt, $el).flag || _tools.DomTools.getEventTargetNode(evnt, $refs.panel).flag;

        if (visiblePanel && !this.isActivated) {
          this.hidePanel();
          this.$emit('hide-panel', {
            $event: evnt
          });
        }
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
      if (this.visiblePanel) {
        this.hidePanel();
        this.$emit('hide-panel', {
          $event: evnt
        });
      }
    },
    updateZindex: function updateZindex() {
      if (this.panelIndex < _tools.UtilTools.getLastZIndex()) {
        this.panelIndex = _tools.UtilTools.nextZIndex();
      }
    },
    isPanelVisible: function isPanelVisible() {
      return this.visiblePanel;
    },

    /**
     * 切换下拉面板
     */
    togglePanel: function togglePanel() {
      if (this.visiblePanel) {
        return this.hidePanel();
      }

      return this.showPanel();
    },

    /**
     * 显示下拉面板
     */
    showPanel: function showPanel() {
      var _this = this;

      if (!this.inited) {
        this.inited = true;

        if (this.transfer) {
          document.body.appendChild(this.$refs.panel);
        }
      }

      return new Promise(function (resolve) {
        if (!_this.disabled) {
          clearTimeout(_this.hidePanelTimeout);
          _this.isActivated = true;
          _this.animatVisible = true;
          setTimeout(function () {
            _this.visiblePanel = true;

            _this.updatePlacement();

            setTimeout(function () {
              resolve(_this.updatePlacement());
            }, 40);
          }, 10);

          _this.updateZindex();
        } else {
          resolve(_this.$nextTick());
        }
      });
    },

    /**
     * 隐藏下拉面板
     */
    hidePanel: function hidePanel() {
      var _this2 = this;

      this.visiblePanel = false;
      return new Promise(function (resolve) {
        if (_this2.animatVisible) {
          _this2.hidePanelTimeout = setTimeout(function () {
            _this2.animatVisible = false;
            resolve(_this2.$nextTick());
          }, 350);
        } else {
          resolve(_this2.$nextTick());
        }
      });
    },

    /**
     * 手动更新位置
     */
    updatePlacement: function updatePlacement() {
      var _this3 = this;

      return this.$nextTick().then(function () {
        var $refs = _this3.$refs,
            transfer = _this3.transfer,
            placement = _this3.placement,
            panelIndex = _this3.panelIndex,
            visiblePanel = _this3.visiblePanel;

        if (visiblePanel) {
          var panelElem = $refs.panel;
          var targetElem = $refs.content;

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

            _this3.panelStyle = panelStyle;
            _this3.panelPlacement = panelPlacement;
          }
        }

        return _this3.$nextTick();
      });
    }
  }
};
exports.default = _default2;