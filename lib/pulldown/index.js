"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Pulldown = void 0;

var _pulldown = _interopRequireDefault(require("./src/pulldown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pulldown.default.install = function (Vue) {
  Vue.component(_pulldown.default.name, _pulldown.default);
};

var Pulldown = _pulldown.default;
exports.Pulldown = Pulldown;
var _default = _pulldown.default;
exports.default = _default;