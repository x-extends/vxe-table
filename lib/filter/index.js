"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Filter = void 0;

var _filter = _interopRequireDefault(require("./src/filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_filter.default.install = function (Vue) {
  Vue.component(_filter.default.name, _filter.default);
};

var Filter = _filter.default;
exports.Filter = Filter;
var _default = _filter.default;
exports.default = _default;