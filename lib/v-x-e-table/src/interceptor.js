"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Interceptor = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _storeMap = {
  // 清除激活单元格之前触发，允许返回 false 阻止默认行为
  'event.clear_actived': [],
  // 清除筛选面板之前触发，允许返回 false 阻止默认行为
  'event.clear_filter': [],
  // 显示快捷菜单之前触发
  'event.show_menu': [],
  // 键盘按下时触发
  'event.keydown': []
};
var Interceptor = {
  mixin: function mixin(map) {
    _xeUtils.default.each(map, function (callback, type) {
      return Interceptor.add(type, callback);
    });

    return Interceptor;
  },
  get: function get(type) {
    return _storeMap[type] || [];
  },
  add: function add(type, callback) {
    var eList = _storeMap[type];

    if (eList && callback && eList.indexOf(callback) === -1) {
      eList.push(callback);
    }

    return Interceptor;
  },
  delete: function _delete(type, callback) {
    var eList = _storeMap[type];

    if (eList) {
      _xeUtils.default.remove(eList, function (cb) {
        return cb === callback;
      });
    }

    return Interceptor;
  }
};
exports.Interceptor = Interceptor;
var _default = Interceptor;
exports.default = _default;