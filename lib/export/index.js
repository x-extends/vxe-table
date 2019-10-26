"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Export = void 0;

var _table = _interopRequireDefault(require("../table"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

var _mixin = _interopRequireDefault(require("./src/mixin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Export = {
  install: function install() {
    _vXETable.default.reg('export');

    _table.default.mixins.push(_mixin.default);
  }
};
exports.Export = Export;
var _default = Export;
exports.default = _default;