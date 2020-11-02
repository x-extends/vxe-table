"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Filter = void 0;

var _table = _interopRequireDefault(require("../table"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

var _panel = _interopRequireDefault(require("./src/panel"));

var _mixin = _interopRequireDefault(require("./src/mixin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_panel.default.install = function (Vue) {
  _vXETable.default.reg('filter');

  _table.default.mixins.push(_mixin.default);

  Vue.component(_panel.default.name, _panel.default);
};

var Filter = _panel.default;
exports.Filter = Filter;
var _default = _panel.default;
exports.default = _default;