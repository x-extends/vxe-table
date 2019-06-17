"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Header = void 0;

var _header = _interopRequireDefault(require("./src/header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_header.default.install = function (Vue) {
  Vue.component(_header.default.name, _header.default);
};

var Header = _header.default;
exports.Header = Header;
var _default = _header.default;
exports.default = _default;