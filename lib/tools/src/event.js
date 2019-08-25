"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GlobalEvent = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 监听全局事件
var wheelName = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel';
var eventStore = [];
var GlobalEvent = {
  on: function on(comp, type, cb) {
    if (cb) {
      eventStore.push({
        comp: comp,
        type: type,
        cb: cb
      });
    }
  },
  off: function off(comp, type) {
    _xeUtils.default.remove(eventStore, function (item) {
      return item.comp === comp && item.type === type;
    });
  },
  trigger: function trigger(evnt) {
    eventStore.forEach(function (_ref) {
      var comp = _ref.comp,
          type = _ref.type,
          cb = _ref.cb;

      if (type === evnt.type || type === 'mousewheel' && evnt.type === wheelName) {
        cb.call(comp, evnt);
      }
    });
  }
};
exports.GlobalEvent = GlobalEvent;
document.addEventListener('keydown', GlobalEvent.trigger, false);
document.addEventListener('contextmenu', GlobalEvent.trigger, false); // document.addEventListener('mouseover', GlobalEvent.trigger, false)
// document.addEventListener('mouseout', GlobalEvent.trigger, false)

window.addEventListener('mousedown', GlobalEvent.trigger, false);
window.addEventListener('blur', GlobalEvent.trigger, false);
window.addEventListener('resize', GlobalEvent.trigger, false);
window.addEventListener(wheelName, GlobalEvent.trigger, false);
var _default = GlobalEvent;
exports.default = _default;