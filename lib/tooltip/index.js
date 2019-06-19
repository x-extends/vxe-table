"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Tooltip = void 0;

var _tooltip = _interopRequireDefault(require("./src/tooltip"));

var _conf = _interopRequireDefault(require("../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tooltip.default.install = function (Vue) {
  _conf.default._tip = 1;
  Vue.component(_tooltip.default.name, _tooltip.default);
};

var Tooltip = _tooltip.default;
exports.Tooltip = Tooltip;
var _default = _tooltip.default;
exports.default = _default;