"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toType(type) {
  return _ctor.default.toString(type).replace('_', '').toLowerCase();
}

var eventTypes = 'created,mounted,activated,beforeDestroy,destroyed,event.clearActived,event.clearFilter,event.showMenu,event.keydown,event.export,event.import'.split(',').map(toType);
var storeMap = {};
var interceptor = {
  mixin: function mixin(map) {
    _ctor.default.each(map, function (evntFn, type) {
      return interceptor.add(type, evntFn);
    });

    return interceptor;
  },
  get: function get(type) {
    return storeMap[toType(type)] || [];
  },
  add: function add(type, evntFn) {
    type = toType(type);

    if (evntFn && eventTypes.indexOf(type) > -1) {
      var eList = storeMap[type];

      if (!eList) {
        eList = storeMap[type] = [];
      }

      eList.push(evntFn);
    }

    return interceptor;
  },
  delete: function _delete(type, evntFn) {
    var eList = storeMap[toType(type)];

    if (eList) {
      _ctor.default.remove(eList, function (fn) {
        return fn === evntFn;
      });
    }

    return interceptor;
  }
};
var _default = interceptor;
exports.default = _default;