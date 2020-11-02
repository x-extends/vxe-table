"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 全局参数设置
 */
function setup(options) {
  return _ctor.default.merge(_conf.default, options);
}

var _default = setup;
exports.default = _default;