"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Body = void 0;

var _body = _interopRequireDefault(require("./src/body"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_body.default.install = function (Vue) {
  Vue.component(_body.default.name, _body.default);
};

var Body = _body.default;
exports.Body = Body;
var _default = _body.default;
exports.default = _default;