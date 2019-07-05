"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Radio = void 0;

var _radio = _interopRequireDefault(require("./src/radio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_radio.default.install = function (Vue) {
  Vue.component(_radio.default.name, _radio.default);
};

var Radio = _radio.default;
exports.Radio = Radio;
var _default = _radio.default;
exports.default = _default;