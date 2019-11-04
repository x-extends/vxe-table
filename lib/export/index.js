"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Export = void 0;

var _export = _interopRequireDefault(require("./src/export"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

var _panel = _interopRequireDefault(require("./src/panel"));

var _tools = require("../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_export.default.install = function (Vue) {
  _vXETable.default._export = 1;
  Object.assign(_vXETable.default.types, {
    csv: 1,
    html: 1,
    xml: 1,
    txt: 1
  });
  Object.assign(_tools.ExportTools, _export.default);
  Vue.component(_panel.default.name, _panel.default);
};

var Export = _export.default;
exports.Export = Export;
var _default = _export.default;
exports.default = _default;