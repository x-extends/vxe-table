"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Export = void 0;

var _table = _interopRequireDefault(require("../table"));

var _conf = _interopRequireDefault(require("../conf"));

var _methods = _interopRequireDefault(require("./src/methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Export = {
  install: function install() {
    _conf.default._export = 1;
    Object.assign(_table.default.methods, _methods.default);
  }
};
exports.Export = Export;
var _default = Export;
exports.default = _default;