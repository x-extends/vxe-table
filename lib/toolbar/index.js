"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Toolbar = void 0;

var _toolbar = _interopRequireDefault(require("./src/toolbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_toolbar.default.install = function (Vue) {
  Vue.component(_toolbar.default.name, _toolbar.default);
};

var Toolbar = _toolbar.default;
exports.Toolbar = Toolbar;
var _default = _toolbar.default;
exports.default = _default;