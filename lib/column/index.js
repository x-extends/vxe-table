"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Column = void 0;

var _column = _interopRequireDefault(require("./src/column"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_column.default.install = function (Vue) {
  Vue.component(_column.default.name, _column.default);
};

var Column = _column.default;
exports.Column = Column;
var _default = _column.default;
exports.default = _default;