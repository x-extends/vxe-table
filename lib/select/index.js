"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Select = void 0;

var _select = _interopRequireDefault(require("./src/select"));

var _option = _interopRequireDefault(require("./src/option"));

var _optgroup = _interopRequireDefault(require("./src/optgroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_select.default.install = function (Vue) {
  Vue.component(_select.default.name, _select.default);
  Vue.component(_option.default.name, _option.default);
  Vue.component(_optgroup.default.name, _optgroup.default);
};

var Select = _select.default;
exports.Select = Select;
var _default = _select.default;
exports.default = _default;