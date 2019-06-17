"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventStore = [];
var defaultInterval = 250;
var resizeTimeout = null;

function addListener() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(eventHandle, _conf.default.resizeInterval || defaultInterval);
}

function eventHandle() {
  console.log(111);

  if (eventStore.length) {
    eventStore.forEach(function (item) {
      var comp = item.comp,
          target = item.target,
          cb = item.cb,
          width = item.width,
          heighe = item.heighe;
      var clientWidth = target.clientWidth;
      var clientHeight = target.clientHeight;
      var rWidth = clientWidth && width !== clientWidth;
      var rHeight = clientHeight && heighe !== clientHeight;

      if (rWidth || rHeight) {
        item.width = clientWidth;
        item.heighe = clientHeight;
        cb.call(comp, {
          type: 'resize',
          target: target,
          rWidth: rWidth,
          rHeight: rHeight,
          currentTarget: target
        });
      }
    });
    resizeTimeout = setTimeout(eventHandle, _conf.default.resizeInterval || defaultInterval);
  }
}

var _default = {
  on: function on(comp, target, cb) {
    if (!eventStore.length) {
      addListener();
    }

    if (!eventStore.some(function (item) {
      return item.comp === comp && item.target === target;
    })) {
      eventStore.push({
        comp: comp,
        target: target,
        cb: cb,
        width: target.clientWidth,
        heighe: target.clientWidth
      });
    }
  },
  off: function off(comp, target) {
    _xeUtils.default.remove(eventStore, function (item) {
      return item.comp === comp && item.target === target;
    });
  }
};
exports.default = _default;