"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interceptor = _interopRequireDefault(require("./interceptor"));

var _renderer = _interopRequireDefault(require("./renderer"));

var _setup = _interopRequireDefault(require("./setup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var installedPlugins = [];

function use(Plugin, options) {
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install({
        setup: _setup.default,
        interceptor: _interceptor.default,
        renderer: _renderer.default
      }, options);
      installedPlugins.push(Plugin);
    }
  }
}

var _default = use;
exports.default = _default;