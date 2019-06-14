"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Interceptor = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _storeMap = {
  // 清除激活单元格之前触发拦截（当渲染其他组件时，存在事件冲突时，可以通过该拦截器阻止单元格被自动关闭问题）
  'event.clear_actived': []
};
var Interceptor = {
  get: function get(type) {
    return _storeMap[type] || [];
  },
  add: function add(type, callback) {
    var eList = _storeMap[type];

    if (eList && callback && eList.indexOf(callback) === -1) {
      eList.push(callback);
    }
  },
  delete: function _delete(type, callback) {
    var eList = _storeMap[type];

    if (eList) {
      _xeUtils.default.remove(eList, function (cb) {
        return cb === callback;
      });
    }
  }
};
exports.Interceptor = Interceptor;
var _default = Interceptor;
exports.default = _default;