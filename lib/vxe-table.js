"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _vXETable = _interopRequireWildcard(require("./v-x-e-table"));

Object.keys(_vXETable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _vXETable[key];
    }
  });
});

var _table = _interopRequireWildcard(require("./table"));

Object.keys(_table).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _table[key];
    }
  });
});

var _column = _interopRequireWildcard(require("./column"));

Object.keys(_column).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _column[key];
    }
  });
});

var _header = _interopRequireWildcard(require("./header"));

Object.keys(_header).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _header[key];
    }
  });
});

var _footer = _interopRequireWildcard(require("./footer"));

Object.keys(_footer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _footer[key];
    }
  });
});

var _filter = _interopRequireWildcard(require("./filter"));

Object.keys(_filter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _filter[key];
    }
  });
});

var _loading = _interopRequireWildcard(require("./loading"));

Object.keys(_loading).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loading[key];
    }
  });
});

var _grid = _interopRequireWildcard(require("./grid"));

Object.keys(_grid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _grid[key];
    }
  });
});

var _menu = _interopRequireWildcard(require("./menu"));

Object.keys(_menu).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _menu[key];
    }
  });
});

var _toolbar = _interopRequireWildcard(require("./toolbar"));

Object.keys(_toolbar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toolbar[key];
    }
  });
});

var _pager = _interopRequireWildcard(require("./pager"));

Object.keys(_pager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pager[key];
    }
  });
});

var _checkbox = _interopRequireWildcard(require("./checkbox"));

Object.keys(_checkbox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _checkbox[key];
    }
  });
});

var _radio = _interopRequireWildcard(require("./radio"));

Object.keys(_radio).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _radio[key];
    }
  });
});

var _input = _interopRequireWildcard(require("./input"));

Object.keys(_input).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _input[key];
    }
  });
});

var _button = _interopRequireWildcard(require("./button"));

Object.keys(_button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _button[key];
    }
  });
});

var _modal = _interopRequireWildcard(require("./modal"));

Object.keys(_modal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _modal[key];
    }
  });
});

var _tooltip = _interopRequireWildcard(require("./tooltip"));

Object.keys(_tooltip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tooltip[key];
    }
  });
});

var _form = _interopRequireWildcard(require("./form"));

Object.keys(_form).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _form[key];
    }
  });
});

var _edit = _interopRequireWildcard(require("./edit"));

Object.keys(_edit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _edit[key];
    }
  });
});

var _export = _interopRequireWildcard(require("./export"));

Object.keys(_export).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _export[key];
    }
  });
});

var _keyboard = _interopRequireWildcard(require("./keyboard"));

Object.keys(_keyboard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _keyboard[key];
    }
  });
});

var _validator = _interopRequireWildcard(require("./validator"));

Object.keys(_validator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validator[key];
    }
  });
});

var _resize = _interopRequireWildcard(require("./resize"));

Object.keys(_resize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _resize[key];
    }
  });
});

var _zhCN = _interopRequireDefault(require("./locale/lang/zh-CN"));

var _body = require("./body");

Object.keys(_body).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _body[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 按需加载的组件
var components = [// 模块
_column.default, _header.default, _footer.default, _filter.default, _loading.default, _grid.default, _menu.default, _toolbar.default, _pager.default, _checkbox.default, _radio.default, _input.default, _button.default, _modal.default, _tooltip.default, _form.default, _edit.default, _export.default, _keyboard.default, _validator.default, _resize.default, // 核心
_table.default]; // 默认安装

function install(Vue, options) {
  if (_xeUtils.default.isPlainObject(options)) {
    _vXETable.default.setup(options);
  }

  components.map(function (component) {
    return component.install(Vue);
  });
} // 默认中文


_vXETable.default.setup({
  i18n: function i18n(key) {
    return _xeUtils.default.get(_zhCN.default, key);
  }
});

_vXETable.default.install = install;

if (typeof window !== 'undefined' && window.Vue && window.Vue.use) {
  window.Vue.use(_vXETable.default);
}

var _default = _vXETable.default;
exports.default = _default;