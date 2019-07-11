"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Renderer = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 内置渲染器
 * 只支持 input 和 textarea
 */
function defaultRenderer(h, attrs, editRender, params) {
  var $table = params.$table,
      column = params.column;
  var name = editRender.name;
  var model = column.model;
  return [h(name, {
    class: "vxe-default-".concat(name),
    attrs: attrs,
    domProps: {
      value: model.value
    },
    on: {
      input: function input(evnt) {
        var cellValue = evnt.target.value;
        model.update = true;
        model.value = cellValue;
        $table.updateStatus(params, cellValue);
      }
    }
  })];
}

var _storeMap = {
  input: {
    autofocus: 'input',
    renderEdit: function renderEdit(h, editRender, params) {
      return defaultRenderer(h, {
        type: 'text'
      }, editRender, params);
    }
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: function renderEdit(h, editRender, params) {
      return defaultRenderer(h, {}, editRender, params);
    }
  }
  /**
   * 全局渲染器
   */

};
var Renderer = {
  mixin: function mixin(map) {
    _xeUtils.default.each(map, function (options, name) {
      return Renderer.add(name, options);
    });

    return Renderer;
  },
  get: function get(name) {
    return _storeMap[name] || null;
  },
  add: function add(name, options) {
    if (name && options) {
      var renders = _storeMap[name];

      if (renders) {
        Object.assign(renders, options);
      } else {
        _storeMap[name] = options;
      }
    }

    return Renderer;
  },
  delete: function _delete(name) {
    delete _storeMap[name];
    return Renderer;
  }
};
exports.Renderer = Renderer;
var _default = Renderer;
exports.default = _default;