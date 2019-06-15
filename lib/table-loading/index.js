"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TableLoading = void 0;

var _loading = _interopRequireDefault(require("./src/loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_loading.default.install = function (Vue) {
  Vue.component(_loading.default.name, _loading.default);
};

var TableLoading = _loading.default;
exports.TableLoading = TableLoading;
var _default = _loading.default;
exports.default = _default;