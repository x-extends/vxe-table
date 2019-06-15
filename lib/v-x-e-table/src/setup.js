"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 全局参数设置
 */
function setup() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var iconMap = _conf.default.iconMap;

  if (options.iconMap) {
    Object.assign(iconMap, options.iconMap);
  }

  Object.assign(_conf.default, options, {
    iconMap: iconMap
  });
}

var _default = setup;
exports.default = _default;