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
  var icon = _conf.default.icon,
      menu = _conf.default.menu;

  if (options.menu) {
    Object.assign(menu, options.menu);
  }

  if (options.icon) {
    Object.assign(icon, options.icon);
  }

  Object.assign(_conf.default, options, {
    icon: icon
  });
}

var _default = setup;
exports.default = _default;