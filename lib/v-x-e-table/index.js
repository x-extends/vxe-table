"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  VXETable: true
};
exports.default = exports.VXETable = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _interceptor = _interopRequireWildcard(require("./src/interceptor"));

Object.keys(_interceptor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interceptor[key];
    }
  });
});

var _renderer = _interopRequireWildcard(require("./src/renderer"));

Object.keys(_renderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _renderer[key];
    }
  });
});

var _setup = _interopRequireDefault(require("./src/setup"));

var _use = _interopRequireDefault(require("./src/use"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VXETable = {
  t: _xeUtils.default.get,
  use: _use.default,
  setup: _setup.default,
  interceptor: _interceptor.default,
  renderer: _renderer.default
};
exports.VXETable = VXETable;
var _default = VXETable;
exports.default = _default;