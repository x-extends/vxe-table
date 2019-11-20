"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _resize = _interopRequireDefault(require("./resize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  methods: {
    bindResize: function bindResize() {
      var _this = this;

      var resizeObserver = new _resize.default(function () {
        return _this.recalculate(true);
      });
      resizeObserver.observe(this.getParentElem());
      this.$resize = resizeObserver;
    },
    unbindResize: function unbindResize() {
      var $resize = this.$resize;

      if ($resize) {
        $resize.disconnect();
      }
    }
  }
};
exports.default = _default;