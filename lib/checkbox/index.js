"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Checkbox = void 0;

var _checkbox = _interopRequireDefault(require("./src/checkbox"));

var _group = _interopRequireDefault(require("./src/group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkbox.default.install = function (Vue) {
  Vue.component(_checkbox.default.name, _checkbox.default);
  Vue.component(_group.default.name, _group.default);
};

var Checkbox = _checkbox.default;
exports.Checkbox = Checkbox;
var _default = _checkbox.default;
exports.default = _default;