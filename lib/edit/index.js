"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Edit = void 0;

var _table = _interopRequireDefault(require("../table"));

var _methods = _interopRequireDefault(require("./src/methods"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Edit = {
  install: function install() {
    _vXETable.default._edit = 1;
    Object.assign(_table.default.methods, _methods.default);
  }
};
exports.Edit = Edit;
var _default = Edit;
exports.default = _default;