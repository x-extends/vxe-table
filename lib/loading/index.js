"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Loading = void 0;

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

var _loading = _interopRequireDefault(require("./src/loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_loading.default.install = function (Vue) {
  _vXETable.default.reg('loading');

  Vue.component(_loading.default.name, _loading.default);
};

var Loading = _loading.default;
exports.Loading = Loading;
var _default = _loading.default;
exports.default = _default;