"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Export = void 0;

var _export = _interopRequireDefault(require("./src/export"));

var _tools = require("../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_export.default.install = function () {
  Object.assign(_tools.ExportTools, _export.default);
};

var Export = _export.default;
exports.Export = Export;
var _default = _export.default;
exports.default = _default;