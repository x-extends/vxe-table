"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _resize = _interopRequireDefault(require("./resize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resizeMethods = {
  bindResize: function bindResize() {
    _resize.default.on(this, this.$el.parentNode, this.recalculate);
  },
  unbindResize: function unbindResize() {
    _resize.default.off(this, this.$el.parentNode);
  }
};
var _default = resizeMethods;
exports.default = _default;