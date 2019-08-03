"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Renderer = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 内置渲染器
 * 只支持 input 和 textarea
 */
function defaultRenderer(h, attrs, editRender, params) {
  var row = params.row,
      column = params.column;
  var name = editRender.name;
  return [h('div', {
    class: 'vxe-input--wrapper'
  }, [h(name, {
    class: "vxe-".concat(name),
    attrs: attrs,
    domProps: {
      value: _tools.UtilTools.getCellValue(row, column)
    },
    on: getEvents(editRender, params)
  })])];
}

function getEvents(editRender, params) {
  var name = editRender.name,
      events = editRender.events;
  var $table = params.$table,
      row = params.row,
      column = params.column;
  var type = name === 'select' ? 'change' : 'input';

  var on = _defineProperty({}, type, function (evnt) {
    var cellValue = evnt.target.value;

    _tools.UtilTools.setCellValue(row, column, cellValue);

    $table.updateStatus(params, cellValue);
  });

  if (events) {
    _xeUtils.default.assign(on, _xeUtils.default.objectMap(events, function (cb) {
      return function () {
        cb.apply(null, [params].concat.apply(params, arguments));
      };
    }));
  }

  return on;
}

function renderOptgroups(h, editRender, params) {
  var optionGroups = editRender.optionGroups,
      _editRender$optionGro = editRender.optionGroupProps,
      optionGroupProps = _editRender$optionGro === void 0 ? {} : _editRender$optionGro;
  var groupOptions = optionGroupProps.options || 'options';
  var groupLabel = optionGroupProps.label || 'label';
  return optionGroups.map(function (group, gIndex) {
    return h('optgroup', {
      domProps: {
        label: group[groupLabel]
      },
      key: gIndex
    }, renderOptions(h, group[groupOptions], editRender, params));
  });
}

function renderOptions(h, options, editRender, params) {
  var _editRender$optionPro = editRender.optionProps,
      optionProps = _editRender$optionPro === void 0 ? {} : _editRender$optionPro;
  var row = params.row,
      column = params.column;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  return options.map(function (item, index) {
    return h('option', {
      domProps: {
        value: item[valueProp],
        selected: item.value === _tools.UtilTools.getCellValue(row, column)
      },
      key: index
    }, item[labelProp]);
  });
}

var renderMap = {
  input: {
    autofocus: '.vxe-input',
    renderEdit: function renderEdit(h, editRender, params) {
      return defaultRenderer(h, {
        type: 'text'
      }, editRender, params);
    }
  },
  textarea: {
    autofocus: '.vxe-textarea',
    renderEdit: function renderEdit(h, editRender, params) {
      return defaultRenderer(h, null, editRender, params);
    }
  },
  select: {
    renderEdit: function renderEdit(h, editRender, params) {
      return [h('select', {
        class: 'vxe-default-select',
        on: getEvents(editRender, params)
      }, editRender.optionGroups ? renderOptgroups(h, editRender, params) : renderOptions(h, editRender.options, editRender, params))];
    },
    renderCell: function renderCell(h, editRender, params) {
      var options = editRender.options,
          optionGroups = editRender.optionGroups,
          _editRender$optionPro2 = editRender.optionProps,
          optionProps = _editRender$optionPro2 === void 0 ? {} : _editRender$optionPro2,
          _editRender$optionGro2 = editRender.optionGroupProps,
          optionGroupProps = _editRender$optionGro2 === void 0 ? {} : _editRender$optionGro2;
      var row = params.row,
          column = params.column;

      var cellValue = _xeUtils.default.get(row, column.property);

      if (!(cellValue === null || cellValue === undefined || cellValue === '')) {
        var _ret = function () {
          var selectItem;
          var labelProp = optionProps.label || 'label';
          var valueProp = optionProps.value || 'value';

          if (optionGroups) {
            var groupOptions = optionGroupProps.options || 'options';

            for (var index = 0; index < optionGroups.length; index++) {
              selectItem = optionGroups[index][groupOptions].find(function (item) {
                return item[valueProp] === cellValue;
              });

              if (selectItem) {
                break;
              }
            }

            return {
              v: selectItem ? selectItem[labelProp] : null
            };
          } else {
            selectItem = options.find(function (item) {
              return item[valueProp] === cellValue;
            });
            return {
              v: selectItem ? selectItem[labelProp] : null
            };
          }
        }();

        if (_typeof(_ret) === "object") return _ret.v;
      }

      return '';
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
    return renderMap[name] || null;
  },
  add: function add(name, options) {
    if (name && options) {
      var renders = renderMap[name];

      if (renders) {
        Object.assign(renders, options);
      } else {
        renderMap[name] = options;
      }
    }

    return Renderer;
  },
  delete: function _delete(name) {
    delete renderMap[name];
    return Renderer;
  }
};
exports.Renderer = Renderer;
var _default = Renderer;
exports.default = _default;