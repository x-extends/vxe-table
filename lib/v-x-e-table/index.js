"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VXETable = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../conf"));

var _interceptor = _interopRequireDefault(require("./src/interceptor"));

var _renderer = _interopRequireDefault(require("./src/renderer"));

var _commands = _interopRequireDefault(require("./src/commands"));

var _menus = _interopRequireDefault(require("./src/menus"));

var _formats = _interopRequireDefault(require("./src/formats"));

var _setup = _interopRequireDefault(require("./src/setup"));

var _tools = require("../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var installedPlugins = [];

function use(Plugin, options) {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install(VXETable, options);
      installedPlugins.push(Plugin);
    }
  }

  return VXETable;
}
/**
 * 检测模块的安装顺序是否正确
 */


function reg(key) {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (VXETable.Table) {
    _tools.UtilTools.error('vxe.error.useErr', [key]);
  }

  VXETable["_".concat(key)] = 1;
}

var VXETable = {
  t: function t(key) {
    return _conf.default.i18n(key);
  },
  v: 'v3',
  reg: reg,
  use: use,
  types: {},
  setup: _setup.default,
  interceptor: _interceptor.default,
  renderer: _renderer.default,
  commands: _commands.default,
  formats: _formats.default,
  menus: _menus.default
};
/**
 * 获取当前的 zIndex
 */

exports.VXETable = VXETable;
Object.defineProperty(VXETable, 'zIndex', {
  get: _tools.UtilTools.getLastZIndex
});
/**
 * 获取下一个 zIndex
 */

Object.defineProperty(VXETable, 'nextZIndex', {
  get: _tools.UtilTools.nextZIndex
});
/**
 * 获取所有导出类型
 */

Object.defineProperty(VXETable, 'exportTypes', {
  get: function get() {
    return Object.keys(VXETable.types);
  }
});
/**
 * 获取所有导入类型
 */

Object.defineProperty(VXETable, 'importTypes', {
  get: function get() {
    var rest = [];

    _ctor.default.each(VXETable.types, function (flag, type) {
      if (flag) {
        rest.push(type);
      }
    });

    return rest;
  }
});
var _default = VXETable;
exports.default = _default;