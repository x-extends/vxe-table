"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  VXETable: true
};
exports.default = exports.VXETable = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _interceptor = _interopRequireWildcard(require("./src/interceptor"));

Object.keys(_interceptor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interceptor[key];
    }
  });
});

var _renderer = _interopRequireWildcard(require("./src/renderer"));

Object.keys(_renderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _renderer[key];
    }
  });
});

var _buttons = _interopRequireWildcard(require("./src/buttons"));

Object.keys(_buttons).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _buttons[key];
    }
  });
});

var _menus = _interopRequireWildcard(require("./src/menus"));

Object.keys(_menus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _menus[key];
    }
  });
});

var _setup = _interopRequireDefault(require("./src/setup"));

var _conf = _interopRequireDefault(require("../conf"));

var _tools = require("../tools");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var installedPlugins = [];

function use(Plugin, options) {
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
  if (VXETable.Table) {
    _tools.UtilTools.error('vxe.error.useErr', [key]);
  }

  VXETable["_".concat(key)] = 1;
}

var VXETable = {
  t: function t(key) {
    return _conf.default.i18n(key);
  },
  v: 'v2',
  reg: reg,
  use: use,
  types: {},
  setup: _setup.default,
  interceptor: _interceptor.default,
  renderer: _renderer.default,
  buttons: _buttons.default,
  menus: _menus.default
  /**
   * 获取当前的 zIndex
   */

};
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

    _xeUtils.default.each(VXETable.types, function (flag, type) {
      if (flag) {
        rest.push(type);
      }
    });

    return rest;
  }
});
var _default = VXETable;
exports.default = _default;