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

function updateTipStyle(_vm) {
  var wrapperElem = _vm.$el,
      tipTarget = _vm.tipTarget,
      tipStore = _vm.tipStore;

  var _DomTools$getDomNode = _tools.DomTools.getDomNode(),
      scrollTop = _DomTools$getDomNode.scrollTop,
      scrollLeft = _DomTools$getDomNode.scrollLeft,
      visibleWidth = _DomTools$getDomNode.visibleWidth;

  var _DomTools$getAbsolute = _tools.DomTools.getAbsolutePos(tipTarget),
      top = _DomTools$getAbsolute.top,
      left = _DomTools$getAbsolute.left;

  var marginSize = 6;
  var offsetHeight = wrapperElem.offsetHeight;
  var offsetWidth = wrapperElem.offsetWidth;
  var tipLeft = left;
  var tipTop = top - offsetHeight - marginSize;
  tipLeft = Math.max(marginSize, left + Math.floor((tipTarget.offsetWidth - offsetWidth) / 2));

  if (tipLeft + offsetWidth + marginSize > scrollLeft + visibleWidth) {
    tipLeft = scrollLeft + visibleWidth - offsetWidth - marginSize;
  }

  if (top - offsetHeight < scrollTop + marginSize) {
    tipStore.placement = 'bottom';
    tipTop = top + tipTarget.offsetHeight + marginSize;
  }

  tipStore.style.top = "".concat(tipTop, "px");
  tipStore.style.left = "".concat(tipLeft, "px");
  tipStore.arrowStyle.left = "".concat(left - tipLeft + tipTarget.offsetWidth / 2, "px");
}

var _default2 = {
  name: 'VxeTooltip',
  mixins: [_size.default],
  props: {
    value: Boolean,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.tooltip.size || _conf.default.size;
      }
    },
    trigger: {
      type: String,
      default: function _default() {
        return _conf.default.tooltip.trigger;
      }
    },
    theme: {
      type: String,
      default: function _default() {
        return _conf.default.tooltip.theme;
      }
    },
    content: [String, Function],
    zIndex: [String, Number],
    isArrow: {
      type: Boolean,
      default: true
    },
    enterable: Boolean,
    leaveDelay: {
      type: Number,
      default: _conf.default.tooltip.leaveDelay
    }
  },
  data: function data() {
    return {
      isUpdate: false,
      isHover: false,
      visible: false,
      message: '',
      tipTarget: null,
      tipZindex: 0,
      tipStore: {
        style: {},
        placement: '',
        arrowStyle: null
      }
    };
  },
  watch: {
    content: function content(value) {
      this.message = value;
    },
    value: function value(_value) {
      if (!this.isUpdate) {
        this[_value ? 'show' : 'close']();
      }

      this.isUpdate = false;
    }
  },
  mounted: function mounted() {
    var $el = this.$el,
        trigger = this.trigger,
        content = this.content,
        value = this.value;
    var parentNode = $el.parentNode;
    var target;
    this.message = content;
    this.tipZindex = _tools.UtilTools.nextZIndex();

    _ctor.default.arrayEach($el.children, function (elem, index) {
      if (index > 1) {
        parentNode.insertBefore(elem, $el);

        if (!target) {
          target = elem;
        }
      }
    });

    parentNode.removeChild($el);
    this.target = target;

    if (target) {
      if (trigger === 'hover') {
        target.onmouseleave = this.targetMouseleaveEvent;
        target.onmouseenter = this.targetMouseenterEvent;
      } else if (trigger === 'click') {
        target.onclick = this.clickEvent;
      }
    }

    if (value) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy() {
    var $el = this.$el,
        target = this.target,
        trigger = this.trigger;
    var parentNode = $el.parentNode;

    if (parentNode) {
      parentNode.removeChild($el);
    }

    if (target) {
      if (trigger === 'hover') {
        target.onmouseenter = null;
        target.onmouseleave = null;
      } else if (trigger === 'click') {
        target.onclick = null;
      }
    }
  },
  render: function render(h) {
    var _ref;

    var vSize = this.vSize,
        theme = this.theme,
        message = this.message,
        isHover = this.isHover,
        isArrow = this.isArrow,
        visible = this.visible,
        tipStore = this.tipStore,
        enterable = this.enterable;
    var on;

    if (enterable) {
      on = {
        mouseenter: this.wrapperMouseenterEvent,
        mouseleave: this.wrapperMouseleaveEvent
      };
    }

    return h('div', {
      class: ['vxe-table--tooltip-wrapper', "theme--".concat(theme), "placement--".concat(tipStore.placement), (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--enterable', enterable), _defineProperty(_ref, 'is--visible', visible), _defineProperty(_ref, 'is--arrow', isArrow), _defineProperty(_ref, 'is--hover', isHover), _ref)],
      style: tipStore.style,
      ref: 'tipWrapper',
      on: on
    }, [h('div', {
      class: 'vxe-table--tooltip-content'
    }, this.$slots.content || message), h('div', {
      class: 'vxe-table--tooltip-arrow',
      style: tipStore.arrowStyle
    })].concat(this.$slots.default));
  },
  methods: {
    show: function show() {
      return this.toVisible(this.target);
    },
    close: function close() {
      this.tipTarget = null;
      Object.assign(this.tipStore, {
        style: {},
        placement: '',
        arrowStyle: null
      });
      this.update(false);
      return this.$nextTick();
    },
    update: function update(value) {
      if (value !== this.visible) {
        this.visible = value;
        this.isUpdate = true;

        if (this.$listeners.input) {
          this.$emit('input', this.visible);
        }
      }
    },
    updateZindex: function updateZindex() {
      if (this.tipZindex < _tools.UtilTools.getLastZIndex()) {
        this.tipZindex = _tools.UtilTools.nextZIndex();
      }
    },
    toVisible: function toVisible(target, message) {
      this.targetActive = true;

      if (target) {
        var $el = this.$el,
            tipStore = this.tipStore,
            zIndex = this.zIndex;
        var parentNode = $el.parentNode;

        if (!parentNode) {
          document.body.appendChild($el);
        }

        if (message) {
          this.message = message;
        }

        this.tipTarget = target;
        this.update(true);
        this.updateZindex();
        tipStore.placement = 'top';
        tipStore.style = {
          width: 'auto',
          left: 0,
          top: 0,
          zIndex: zIndex || this.tipZindex
        };
        tipStore.arrowStyle = {
          left: '50%'
        };
        return this.updatePlacement();
      }

      return this.$nextTick();
    },
    updatePlacement: function updatePlacement() {
      var _this = this;

      return this.$nextTick().then(function () {
        var wrapperElem = _this.$el,
            tipTarget = _this.tipTarget;

        if (tipTarget && wrapperElem) {
          updateTipStyle(_this);
          return _this.$nextTick().then(function () {
            return updateTipStyle(_this);
          });
        }
      });
    },
    clickEvent: function clickEvent() {
      this[this.visible ? 'close' : 'show']();
    },
    targetMouseenterEvent: function targetMouseenterEvent() {
      this.show();
    },
    targetMouseleaveEvent: function targetMouseleaveEvent() {
      var _this2 = this;

      var trigger = this.trigger,
          enterable = this.enterable,
          leaveDelay = this.leaveDelay;
      this.targetActive = false;

      if (enterable && trigger === 'hover') {
        setTimeout(function () {
          if (!_this2.isHover) {
            _this2.close();
          }
        }, leaveDelay);
      } else {
        this.close();
      }
    },
    wrapperMouseenterEvent: function wrapperMouseenterEvent() {
      this.isHover = true;
    },
    wrapperMouseleaveEvent: function wrapperMouseleaveEvent(evnt) {
      var _this3 = this;

      var $listeners = this.$listeners,
          trigger = this.trigger,
          enterable = this.enterable,
          leaveDelay = this.leaveDelay;
      this.isHover = false;

      if ($listeners.leave) {
        this.$emit('leave', {
          $event: evnt
        });
      } else if (enterable && trigger === 'hover') {
        setTimeout(function () {
          if (!_this3.targetActive) {
            _this3.close();
          }
        }, leaveDelay);
      }
    }
  }
};
exports.default = _default2;