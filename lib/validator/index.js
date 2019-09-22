"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Validator = void 0;

var _table = _interopRequireDefault(require("../table"));

var _methods = _interopRequireDefault(require("./src/methods"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validator = {
  install: function install() {
    _vXETable.default._valid = 1;
    Object.assign(_table.default.methods, _methods.default);
  }
};
exports.Validator = Validator;
var _default = Validator;
exports.default = _default;