"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VXETable = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _interceptor = _interopRequireDefault(require("./src/interceptor"));

var _renderer = _interopRequireDefault(require("./src/renderer"));

var _setup = _interopRequireDefault(require("./src/setup"));

var _conf = _interopRequireDefault(require("../conf"));

var _tools = require("../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
 * 创建数据仓库
 */


var VXEStore =
/*#__PURE__*/
function () {
  function VXEStore() {
    _classCallCheck(this, VXEStore);

    this.store = {};
  }

  _createClass(VXEStore, [{
    key: "mixin",
    value: function mixin(map) {
      Object.assign(this.store, map);
      return VXEStore;
    }
  }, {
    key: "get",
    value: function get(type) {
      return this.store[type];
    }
  }, {
    key: "add",
    value: function add(type, callback) {
      this.store[type] = callback;
      return VXEStore;
    }
  }, {
    key: "delete",
    value: function _delete(type) {
      delete this.store[type];
      return VXEStore;
    }
  }]);

  return VXEStore;
}();

var commands = new VXEStore();
var menus = new VXEStore();
var VXETable = {
  t: function t(key) {
    return _conf.default.i18n(key);
  },
  v: 'v1',
  use: use,
  types: {},
  setup: _setup.default,
  interceptor: _interceptor.default,
  renderer: _renderer.default,
  commands: commands,
  menus: menus
}; // v3.0 中废弃 buttons

exports.VXETable = VXETable;
Object.defineProperty(VXETable, 'buttons', {
  get: function get() {
    _tools.UtilTools.warn('vxe.error.delProp', ['buttons', 'commands']);

    return commands;
  }
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