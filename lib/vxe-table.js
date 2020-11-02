"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _vXETable = _interopRequireWildcard(require("./v-x-e-table"));

Object.keys(_vXETable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _vXETable[key]) return;
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
  if (key in exports && exports[key] === _table[key]) return;
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
  if (key in exports && exports[key] === _column[key]) return;
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
  if (key in exports && exports[key] === _header[key]) return;
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
  if (key in exports && exports[key] === _footer[key]) return;
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
  if (key in exports && exports[key] === _filter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _filter[key];
    }
  });
});

var _grid = _interopRequireWildcard(require("./grid"));

Object.keys(_grid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _grid[key]) return;
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
  if (key in exports && exports[key] === _menu[key]) return;
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
  if (key in exports && exports[key] === _toolbar[key]) return;
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
  if (key in exports && exports[key] === _pager[key]) return;
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
  if (key in exports && exports[key] === _checkbox[key]) return;
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
  if (key in exports && exports[key] === _radio[key]) return;
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
  if (key in exports && exports[key] === _input[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _input[key];
    }
  });
});

var _textarea = _interopRequireWildcard(require("./textarea"));

Object.keys(_textarea).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _textarea[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _textarea[key];
    }
  });
});

var _button = _interopRequireWildcard(require("./button"));

Object.keys(_button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _button[key]) return;
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
  if (key in exports && exports[key] === _modal[key]) return;
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
  if (key in exports && exports[key] === _tooltip[key]) return;
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
  if (key in exports && exports[key] === _form[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _form[key];
    }
  });
});

var _select = _interopRequireWildcard(require("./select"));

Object.keys(_select).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _select[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _select[key];
    }
  });
});

var _switch = _interopRequireWildcard(require("./switch"));

Object.keys(_switch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _switch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _switch[key];
    }
  });
});

var _list = _interopRequireWildcard(require("./list"));

Object.keys(_list).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _list[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _list[key];
    }
  });
});

var _pulldown = _interopRequireWildcard(require("./pulldown"));

Object.keys(_pulldown).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _pulldown[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pulldown[key];
    }
  });
});

var _edit = _interopRequireWildcard(require("./edit"));

Object.keys(_edit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _edit[key]) return;
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
  if (key in exports && exports[key] === _export[key]) return;
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
  if (key in exports && exports[key] === _keyboard[key]) return;
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
  if (key in exports && exports[key] === _validator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validator[key];
    }
  });
});

var _zhCN = _interopRequireDefault(require("./locale/lang/zh-CN"));

var _body = require("./body");

Object.keys(_body).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _body[key]) return;
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
_column.default, _header.default, _footer.default, _filter.default, _grid.default, _menu.default, _toolbar.default, _pager.default, _checkbox.default, _radio.default, _input.default, _textarea.default, _button.default, _modal.default, _tooltip.default, _form.default, _select.default, _switch.default, _list.default, _pulldown.default, _edit.default, _export.default, _keyboard.default, _validator.default, // 核心
_table.default]; // 默认安装

function install(Vue, options) {
  if (_ctor.default.isPlainObject(options)) {
    _vXETable.default.setup(options);
  }

  components.map(function (component) {
    return component.install(Vue);
  });
} // 默认中文


_vXETable.default.setup({
  i18n: function i18n(key) {
    return _ctor.default.get(_zhCN.default, key);
  }
});

_vXETable.default.install = install;

if (typeof window !== 'undefined' && window.Vue && window.Vue.use) {
  window.Vue.use(_vXETable.default);
}

var _default = _vXETable.default;
exports.default = _default;