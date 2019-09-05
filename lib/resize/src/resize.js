"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 监听 resize 事件
 * 如果项目中已使用了 resize-observer-polyfill，那么只需要将方法定义全局，该组件就会自动使用
 */
var resizeTimeout;
var eventStore = [];
var defaultInterval = 250;

var ResizeObserverPolyfill =
/*#__PURE__*/
function () {
  function ResizeObserverPolyfill(callback) {
    _classCallCheck(this, ResizeObserverPolyfill);

    this.callback = callback;
  }

  _createClass(ResizeObserverPolyfill, [{
    key: "observe",
    value: function observe(target) {
      if (target) {
        this.target = target;

        if (!eventStore.length) {
          eventListener();
        }

        if (!eventStore.some(function (item) {
          return item.target === target;
        })) {
          this.width = target.clientWidth;
          this.heighe = target.clientHeight;
          eventStore.push(this);
        }
      }
    }
  }, {
    key: "unobserve",
    value: function unobserve(target) {
      if (target) {
        _xeUtils.default.remove(eventStore, function (item) {
          return item.target === target;
        });
      }
    }
  }]);

  return ResizeObserverPolyfill;
}();

var Resize = window.ResizeObserver || ResizeObserverPolyfill;

function eventListener() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(eventHandle, _conf.default.resizeInterval || defaultInterval);
}

function eventHandle() {
  if (eventStore.length) {
    eventStore.forEach(function (observer) {
      var target = observer.target,
          width = observer.width,
          heighe = observer.heighe;
      var clientWidth = target.clientWidth;
      var clientHeight = target.clientHeight;
      var rWidth = clientWidth && width !== clientWidth;
      var rHeight = clientHeight && heighe !== clientHeight;

      if (rWidth || rHeight) {
        observer.width = clientWidth;
        observer.heighe = clientHeight;
        observer.callback();
      }
    });
    eventListener();
  }
}

var _default = Resize;
exports.default = _default;