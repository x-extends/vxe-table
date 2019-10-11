"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Buttons = void 0;
// 全局的工具栏按钮
var _storeMap = {};
var Buttons = {
  mixin: function mixin(map) {
    Object.assign(_storeMap, map);
    return Buttons;
  },
  get: function get(type) {
    return _storeMap[type];
  },
  add: function add(type, callback) {
    _storeMap[type] = callback;
    return Buttons;
  },
  delete: function _delete(type) {
    delete _storeMap[type];
    return Buttons;
  }
};
exports.Buttons = Buttons;
var _default = Buttons;
exports.default = _default;