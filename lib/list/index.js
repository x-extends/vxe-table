"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.List = void 0;

var _list = _interopRequireDefault(require("./src/list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_list.default.install = function (Vue) {
  Vue.component(_list.default.name, _list.default);
};

var List = _list.default;
exports.List = List;
var _default = _list.default;
exports.default = _default;