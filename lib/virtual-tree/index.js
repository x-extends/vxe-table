"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VirtualTree = void 0;

var _virtualTree = _interopRequireDefault(require("./src/virtual-tree"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_virtualTree.default.install = function (Vue) {
  Vue.component(_virtualTree.default.name, _virtualTree.default);
};

var VirtualTree = _virtualTree.default;
exports.VirtualTree = VirtualTree;
var _default = _virtualTree.default;
exports.default = _default;