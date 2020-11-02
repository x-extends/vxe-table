"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Grid = void 0;

var _grid = _interopRequireDefault(require("./src/grid"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_grid.default.install = function (Vue) {
  _vXETable.default.Grid = _grid.default;
  Vue.component(_grid.default.name, _grid.default);
};

var Grid = _grid.default;
exports.Grid = Grid;
var _default = _grid.default;
exports.default = _default;