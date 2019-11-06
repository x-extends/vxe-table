"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Interceptor = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toType(type) {
  return _xeUtils.default.toString(type).replace('_', '').toLowerCase();
}

var eventTypes = 'created,mounted,activated,beforeDestroy,destroyed,event.clearActived,event.clearFilter,event.showMenu,event.keydown,event.export,event.import'.split(',').map(toType);
var _storeMap = {};
var Interceptor = {
  mixin: function mixin(map) {
    _xeUtils.default.each(map, function (callback, type) {
      return Interceptor.add(type, callback);
    });

    return Interceptor;
  },
  get: function get(type) {
    return _storeMap[toType(type)] || [];
  },
  add: function add(type, callback) {
    type = toType(type);

    if (callback && eventTypes.includes(type)) {
      var eList = _storeMap[type];

      if (!eList) {
        eList = _storeMap[type] = [];
      }

      eList.push(callback);
    }

    return Interceptor;
  },
  delete: function _delete(type, callback) {
    var eList = _storeMap[toType(type)];

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