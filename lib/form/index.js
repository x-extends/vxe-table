"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Form = void 0;

var _form = _interopRequireDefault(require("./src/form"));

var _formItem = _interopRequireDefault(require("./src/form-item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_form.default.install = function (Vue) {
  Vue.component(_form.default.name, _form.default);
  Vue.component(_formItem.default.name, _formItem.default);
};

var Form = _form.default;
exports.Form = Form;
var _default = _form.default;
exports.default = _default;