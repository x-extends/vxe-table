"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Excel = void 0;

var _excel = _interopRequireDefault(require("./src/excel"));

var _cells = _interopRequireDefault(require("./src/cells"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_excel.default.install = function (Vue) {
  _vXETable.default.renderer.mixin(_cells.default);

  Vue.component(_excel.default.name, _excel.default);
};

var Excel = _excel.default;
exports.Excel = Excel;
var _default = _excel.default;
exports.default = _default;