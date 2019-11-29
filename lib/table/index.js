"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Table = void 0;

var _table = _interopRequireDefault(require("./src/table"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_table.default.install = function (Vue) {
  _vXETable.default.Vue = Vue;
  _vXETable.default.Table = _table.default;
  Vue.component(_table.default.name, _table.default);
};

var Table = _table.default;
exports.Table = Table;
var _default = _table.default;
exports.default = _default;