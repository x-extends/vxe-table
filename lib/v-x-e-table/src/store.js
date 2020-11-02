"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 创建数据仓库
 */
var Store = /*#__PURE__*/function () {
  function Store() {
    _classCallCheck(this, Store);

    this.store = {};
  }

  _createClass(Store, [{
    key: "mixin",
    value: function mixin(map) {
      Object.assign(this.store, map);
      return Store;
    }
  }, {
    key: "get",
    value: function get(type) {
      return this.store[type];
    }
  }, {
    key: "add",
    value: function add(type, render) {
      this.store[type] = render;
      return Store;
    }
  }, {
    key: "delete",
    value: function _delete(type) {
      delete this.store[type];
      return Store;
    }
  }]);

  return Store;
}();

var _default = Store;
exports.default = _default;