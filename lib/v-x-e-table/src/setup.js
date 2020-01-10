"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergeOpts(data1, data2) {
  if (data1 && _xeUtils.default.isObject(data2)) {
    _xeUtils.default.objectEach(data2, function (val, key) {
      data1[key] = data1[key] && val ? mergeOpts(data1[key], val) : val;
    });

    return data1;
  }

  return data2;
}
/**
 * 全局参数设置
 */


function setup() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // 在 v3.0 中废弃 setup.menu
  if (options.menu && !options.contextMenu) {
    options.contextMenu = options.menu;
    console.warn('[vxe-table] parameter "menu" has been replaced by "contextMenu"');
  }

  mergeOpts(_conf.default, options);
  return _conf.default;
}

var _default = setup;
exports.default = _default;