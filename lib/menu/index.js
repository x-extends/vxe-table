"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TableContextMenu = void 0;

var _menu = _interopRequireDefault(require("./src/menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_menu.default.install = function (Vue) {
  Vue.component(_menu.default.name, _menu.default);
};

var TableContextMenu = _menu.default;
exports.TableContextMenu = TableContextMenu;
var _default = _menu.default;
exports.default = _default;