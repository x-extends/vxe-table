"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  name: 'VxeTooltip',
  props: {
    value: Boolean,
    theme: {
      type: String,
      default: function _default() {
        return _conf.default.tooltip.theme;
      }
    },
    content: String,
    zIndex: {
      type: Number,
      default: function _default() {
        return _conf.default.tooltip.zIndex;
      }
    },
    isArrow: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      isUpdate: false,
      visible: false,
      tipStore: {
        style: null,
        placement: '',
        arrowStyle: null
      }
    };
  },
  watch: {
    value: function value(_value) {
      if (!this.isUpdate) {
        this[_value ? 'show' : 'close']();
      }

      this.isUpdate = false;
    }
  },
  mounted: function mounted() {
    var _this = this;

    var $el = this.$el,
        value = this.value;
    var parentNode = $el.parentNode;
    Array.from($el.children).forEach(function (elem, index) {
      if (index > 1) {
        parentNode.insertBefore(elem, $el);
        _this.target = elem;
      }
    });
    parentNode.removeChild($el);

    if (value) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy() {
    var $el = this.$el;
    var parentNode = $el.parentNode;

    if (parentNode) {
      parentNode.removeChild($el);
    }
  },
  render: function render(h) {
    var theme = this.theme,
        content = this.content,
        isArrow = this.isArrow,
        visible = this.visible,
        tipStore = this.tipStore;
    return h('div', {
      class: ['vxe-table--tooltip-wrapper', "theme--".concat(theme), "placement--".concat(tipStore.placement), {
        'is--visible': visible,
        'is--arrow': isArrow
      }],
      style: tipStore.style,
      ref: 'tipWrapper'
    }, [h('div', {
      class: ['vxe-table--tooltip-content']
    }, this.$slots.content || content), h('div', {
      class: ['vxe-table--tooltip-arrow'],
      style: tipStore.arrowStyle
    })].concat(this.$slots.default));
  },
  methods: {
    show: function show() {
      return this.toVisible(this.target);
    },
    close: function close() {
      Object.assign(this.tipStore, {
        style: null,
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
        this.$emit('input', this.visible);
      }
    },
    toVisible: function toVisible(target) {
      var _this2 = this;

      if (target) {
        var $el = this.$el,
            tipStore = this.tipStore,
            zIndex = this.zIndex;

        var _DomTools$getAbsolute = _tools.DomTools.getAbsolutePos(target),
            top = _DomTools$getAbsolute.top,
            left = _DomTools$getAbsolute.left;

        var _DomTools$getDomNode = _tools.DomTools.getDomNode(),
            scrollTop = _DomTools$getDomNode.scrollTop,
            scrollLeft = _DomTools$getDomNode.scrollLeft,
            visibleWidth = _DomTools$getDomNode.visibleWidth;

        var parentNode = $el.parentNode;
        var tipLeft = left;
        tipStore.placement = 'top';
        tipStore.arrowStyle = {
          left: '50%'
        };

        if (!parentNode) {
          document.body.appendChild($el);
        }

        this.update(true);
        return this.$nextTick().then(function () {
          var wrapperElem = $el;

          if (wrapperElem) {
            tipLeft = left + Math.floor((target.offsetWidth - wrapperElem.offsetWidth) / 2);
            tipStore.style = {
              zIndex: zIndex,
              width: "".concat(wrapperElem.offsetWidth, "px"),
              top: "".concat(top - wrapperElem.offsetHeight - 6, "px"),
              left: "".concat(tipLeft, "px")
            };
            return _this2.$nextTick();
          }
        }).then(function () {
          var wrapperElem = $el;

          if (wrapperElem) {
            var offsetHeight = wrapperElem.offsetHeight;
            var offsetWidth = wrapperElem.offsetWidth;

            if (top - offsetHeight < scrollTop + 6) {
              tipStore.placement = 'bottom';
              tipStore.style.top = "".concat(top + target.offsetHeight + 6, "px");
            }

            if (tipLeft < scrollLeft + 6) {
              // 超出左边界
              tipLeft = scrollLeft + 6;
              tipStore.arrowStyle.left = "".concat(left > tipLeft + 16 ? left - tipLeft + 16 : 16, "px");
              tipStore.style.left = "".concat(tipLeft, "px");
            } else if (left + offsetWidth > scrollLeft + visibleWidth) {
              // 超出右边界
              tipLeft = scrollLeft + visibleWidth - offsetWidth - 6;
              tipStore.arrowStyle.left = "".concat(offsetWidth - Math.max(Math.floor((tipLeft + offsetWidth - left) / 2), 22), "px");
              tipStore.style.left = "".concat(tipLeft, "px");
            }
          }
        });
      }

      return this.$nextTick();
    }
  }
};
exports.default = _default2;