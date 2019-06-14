"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TableFooter = void 0;

var _footer = _interopRequireDefault(require("./src/footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_footer.default.install = function (Vue) {
  Vue.component(_footer.default.name, _footer.default);
};

var TableFooter = _footer.default;
exports.TableFooter = TableFooter;
var _default = _footer.default;
exports.default = _default;