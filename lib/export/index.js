"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Export = void 0;

var _table = _interopRequireDefault(require("../table"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

var _panel = _interopRequireDefault(require("./src/panel"));

var _mixin = _interopRequireDefault(require("./src/mixin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Export = {
  install: function install(Vue) {
    _vXETable.default.reg('export');

    Object.assign(_vXETable.default.types, {
      csv: 1,
      html: 1,
      xml: 1,
      txt: 1
    });

    _table.default.mixins.push(_mixin.default);

    Vue.component(_panel.default.name, _panel.default);
  }
};
exports.Export = Export;
var _default = Export;
exports.default = _default;