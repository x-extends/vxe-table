"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Resize = void 0;

var _resize = _interopRequireDefault(require("./src/resize"));

var _tools = require("../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_resize.default.install = function () {
  Object.assign(_tools.ResizeEvent, _resize.default);
};

var Resize = _resize.default;
exports.Resize = Resize;
var _default = _resize.default;
exports.default = _default;