"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.interceptorStore = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toType(type) {
  return _xeUtils.default.toString(type).replace('_', '').toLowerCase();
}

var eventTypes = 'created,mounted,activated,beforeDestroy,destroyed,event.clearActived,event.clearFilter,event.showMenu,event.keydown,event.export,event.import'.split(',').map(toType);
var storeMap = {};
var interceptorStore = {
  mixin: function mixin(map) {
    _xeUtils.default.each(map, function (callback, type) {
      return interceptorStore.add(type, callback);
    });

    return interceptorStore;
  },
  get: function get(type) {
    return storeMap[toType(type)] || [];
  },
  add: function add(type, callback) {
    type = toType(type);

    if (callback && eventTypes.indexOf(type) > -1) {
      var eList = storeMap[type];

      if (!eList) {
        eList = storeMap[type] = [];
      }

      eList.push(callback);
    }

    return interceptorStore;
  },
  delete: function _delete(type, callback) {
    var eList = storeMap[toType(type)];

    if (eList) {
      _xeUtils.default.remove(eList, function (cb) {
        return cb === callback;
      });
    }

    return interceptorStore;
  }
};
exports.interceptorStore = interceptorStore;
var _default = interceptorStore;
exports.default = _default;