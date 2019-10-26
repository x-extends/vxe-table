"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Keyboard = void 0;

var _table = _interopRequireDefault(require("../table"));

var _mixin = _interopRequireDefault(require("./src/mixin"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Keyboard = {
  install: function install() {
    _vXETable.default.reg('keyboard');

    _table.default.mixins.push(_mixin.default);
  }
};
exports.Keyboard = Keyboard;
var _default = Keyboard;
exports.default = _default;