"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TableHeader = void 0;

var _header = _interopRequireDefault(require("./src/header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_header.default.install = function (Vue) {
  Vue.component(_header.default.name, _header.default);
};

var TableHeader = _header.default;
exports.TableHeader = TableHeader;
var _default = _header.default;
exports.default = _default;