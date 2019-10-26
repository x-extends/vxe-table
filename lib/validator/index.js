"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Validator = void 0;

var _table = _interopRequireDefault(require("../table"));

var _mixin = _interopRequireDefault(require("./src/mixin"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validator = {
  install: function install() {
    _vXETable.default.reg('valid');

    _table.default.mixins.push(_mixin.default);
  }
};
exports.Validator = Validator;
var _default = Validator;
exports.default = _default;