"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  computed: {
    vSize: function vSize() {
      var $parent = this.$parent,
          size = this.size;
      return size || $parent && ($parent.size || $parent.vSize);
    }
  }
};
exports.default = _default;