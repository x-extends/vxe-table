"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Menus = void 0;
// 全局的快捷菜单
var _storeMap = {};
var Menus = {
  mixin: function mixin(map) {
    Object.assign(_storeMap, map);
    return Menus;
  },
  get: function get(type) {
    return _storeMap[type];
  },
  add: function add(type, callback) {
    _storeMap[type] = callback;
    return Menus;
  },
  delete: function _delete(type) {
    delete _storeMap[type];
    return Menus;
  }
};
exports.Menus = Menus;
var _default = Menus;
exports.default = _default;