"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Export = void 0;

var _table = _interopRequireDefault(require("../table"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

var _exportPanel = _interopRequireDefault(require("./src/export-panel"));

var _importPanel = _interopRequireDefault(require("./src/import-panel"));

var _mixin = _interopRequireWildcard(require("./src/mixin"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function print(options) {
  var opts = Object.assign({}, options, {
    type: 'html'
  });
  (0, _mixin.handlePrint)(null, opts, opts.content);
}

var Export = {
  install: function install(Vue) {
    _vXETable.default.reg('export');

    _vXETable.default.print = print;
    Object.assign(_vXETable.default.types, {
      csv: 1,
      html: 1,
      xml: 1,
      txt: 1
    });

    _table.default.mixins.push(_mixin.default);

    Vue.component(_exportPanel.default.name, _exportPanel.default);
    Vue.component(_importPanel.default.name, _importPanel.default);
  }
};
exports.Export = Export;
var _default = Export;
exports.default = _default;