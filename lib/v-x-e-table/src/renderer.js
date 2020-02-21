"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.renderStore = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getAttrs(_ref) {
  var name = _ref.name,
      attrs = _ref.attrs;

  if (name === 'input') {
    attrs = Object.assign({
      type: 'text'
    }, attrs);
  }

  return attrs;
}

function getEvents(renderOpts, params) {
  var name = renderOpts.name,
      events = renderOpts.events;
  var $table = params.$table,
      row = params.row,
      column = params.column;
  var type = name === 'select' ? 'change' : 'input';

  var on = _defineProperty({}, type, function (evnt) {
    var cellValue = evnt.target.value;

    _tools.UtilTools.setCellValue(row, column, cellValue);

    $table.updateStatus(params, cellValue);

    if (events && events[type]) {
      events[type](params, evnt);
    }
  });

  if (events) {
    return _xeUtils.default.assign({}, _xeUtils.default.objectMap(events, function (evntFn) {
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        args = [params].concat(args);
        evntFn.apply(void 0, _toConsumableArray(args));
      };
    }), on);
  }

  return on;
}
/**
 * 内置渲染器
 * 支持原生的 input、textarea、select
 */


function defaultEditRender(h, renderOpts, params) {
  var row = params.row,
      column = params.column;
  var name = renderOpts.name;
  var attrs = getAttrs(renderOpts);
  return [h('div', {
    class: "vxe-".concat(name)
  }, [h(name, {
    class: "vxe-".concat(name, "--inner"),
    attrs: attrs,
    domProps: {
      value: _tools.UtilTools.getCellValue(row, column)
    },
    on: getEvents(renderOpts, params)
  })])];
}

function renderOptgroups(h, renderOpts, params) {
  var optionGroups = renderOpts.optionGroups,
      _renderOpts$optionGro = renderOpts.optionGroupProps,
      optionGroupProps = _renderOpts$optionGro === void 0 ? {} : _renderOpts$optionGro;
  var groupOptions = optionGroupProps.options || 'options';
  var groupLabel = optionGroupProps.label || 'label';
  return optionGroups.map(function (group, gIndex) {
    return h('optgroup', {
      domProps: {
        label: group[groupLabel]
      },
      key: gIndex
    }, renderOptions(h, group[groupOptions], renderOpts, params));
  });
}

function renderOptions(h, options, renderOpts, params) {
  var _renderOpts$optionPro = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro === void 0 ? {} : _renderOpts$optionPro;
  var row = params.row,
      column = params.column;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';
  return options.map(function (item, index) {
    return h('option', {
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: item[valueProp] == _tools.UtilTools.getCellValue(row, column)
      },
      key: index
    }, item[labelProp]);
  });
}

function getFilterEvents(item, renderOpts, params) {
  var column = params.column;
  var events = renderOpts.events;
  var type = name === 'select' ? 'change' : 'input';

  var on = _defineProperty({}, type, function (evnt) {
    item.data = evnt.target.value;
    handleConfirmFilter(params, column, !!item.data, item);

    if (events && events[type]) {
      events[type](params, evnt);
    }
  });

  if (events) {
    return _xeUtils.default.assign({}, _xeUtils.default.objectMap(events, function (evntFn) {
      return function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        args = [params].concat(args);
        evntFn.apply(void 0, _toConsumableArray(args));
      };
    }), on);
  }

  return on;
}

function defaultFilterRender(h, renderOpts, params) {
  var column = params.column;
  var name = renderOpts.name;
  var attrs = getAttrs(renderOpts);
  return column.filters.map(function (item) {
    return h('div', {
      class: 'vxe-input--wrapper'
    }, [h(name, {
      class: "vxe-".concat(name),
      attrs: attrs,
      domProps: {
        value: item.data
      },
      on: getFilterEvents(item, renderOpts, params)
    })]);
  });
}

function handleConfirmFilter(params, column, checked, item) {
  var $panel = params.$panel;
  $panel[column.filterMultiple ? 'changeMultipleOption' : 'changeRadioOption']({}, checked, item);
}

function defaultFilterMethod(_ref2) {
  var option = _ref2.option,
      row = _ref2.row,
      column = _ref2.column;
  var data = option.data;

  var cellValue = _xeUtils.default.get(row, column.property);
  /* eslint-disable eqeqeq */


  return cellValue == data;
}

function renderSelectEdit(h, renderOpts, params) {
  return [h('select', {
    class: 'vxe-default-select',
    attrs: getAttrs(renderOpts),
    on: getEvents(renderOpts, params)
  }, renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params) : renderOptions(h, renderOpts.options, renderOpts, params))];
}

function getSelectCellValue(renderOpts, _ref3) {
  var row = _ref3.row,
      column = _ref3.column;
  var options = renderOpts.options,
      optionGroups = renderOpts.optionGroups,
      _renderOpts$optionPro2 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro2 === void 0 ? {} : _renderOpts$optionPro2,
      _renderOpts$optionGro2 = renderOpts.optionGroupProps,
      optionGroupProps = _renderOpts$optionGro2 === void 0 ? {} : _renderOpts$optionGro2;

  var cellValue = _xeUtils.default.get(row, column.property);

  var selectItem;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';

  if (optionGroups) {
    var groupOptions = optionGroupProps.options || 'options';

    for (var index = 0; index < optionGroups.length; index++) {
      /* eslint-disable eqeqeq */
      selectItem = _xeUtils.default.find(optionGroups[index][groupOptions], function (item) {
        return item[valueProp] == cellValue;
      });

      if (selectItem) {
        break;
      }
    }

    return selectItem ? selectItem[labelProp] : cellValue;
  }
  /* eslint-disable eqeqeq */


  selectItem = _xeUtils.default.find(options, function (item) {
    return item[valueProp] == cellValue;
  });
  return selectItem ? selectItem[labelProp] : cellValue;
}
/**
 * 表单渲染器
 */


function defaultItemRender(h, renderOpts, params) {
  var data = params.data,
      property = params.property;
  var name = renderOpts.name;
  var attrs = getAttrs(renderOpts);

  var cellValue = _xeUtils.default.get(data, property);

  return [h(name, {
    class: "vxe-default-".concat(name),
    attrs: attrs,
    domProps: attrs && name === 'input' && (attrs.type === 'submit' || attrs.type === 'reset') ? null : {
      value: cellValue
    },
    on: getFormEvents(renderOpts, params)
  })];
}

function getFormEvents(renderOpts, params) {
  var $form = params.$form,
      data = params.data,
      property = params.property;
  var events = renderOpts.events;
  var type = name === 'select' ? 'change' : 'input';

  var on = _defineProperty({}, type, function (evnt) {
    var itemValue = evnt.target.value;

    _xeUtils.default.set(data, property, itemValue);

    $form.updateStatus(params, itemValue);

    if (events && events[type]) {
      events[type](params, evnt);
    }
  });

  if (events) {
    return _xeUtils.default.assign({}, _xeUtils.default.objectMap(events, function (evntFn) {
      return function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        args = [params].concat(args);
        evntFn.apply(void 0, _toConsumableArray(args));
      };
    }), on);
  }

  return on;
}

function renderFormOptions(h, options, renderOpts, params) {
  var data = params.data,
      property = params.property;
  var _renderOpts$optionPro3 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro3 === void 0 ? {} : _renderOpts$optionPro3;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';

  var cellValue = _xeUtils.default.get(data, property);

  return options.map(function (item, index) {
    return h('option', {
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: item[valueProp] == cellValue
      },
      key: index
    }, item[labelProp]);
  });
}

function createExportMethod(valueMethod, isEdit) {
  var renderProperty = isEdit ? 'editRender' : 'cellRender';
  return function (params) {
    return valueMethod(params.column[renderProperty], params);
  };
}

var renderMap = {
  input: {
    autofocus: 'input',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod,
    renderItem: defaultItemRender
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod,
    renderItem: defaultItemRender
  },
  select: {
    renderEdit: renderSelectEdit,
    renderDefault: renderSelectEdit,
    renderCell: function renderCell(h, renderOpts, params) {
      getSelectCellValue(renderOpts, params);
    },
    renderFilter: function renderFilter(h, renderOpts, params) {
      var column = params.column;
      return column.filters.map(function (item) {
        return h('select', {
          class: 'vxe-default-select',
          attrs: getAttrs(renderOpts),
          on: getFilterEvents(item, renderOpts, params)
        }, renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params) : renderOptions(h, renderOpts.options, renderOpts, params));
      });
    },
    filterMethod: defaultFilterMethod,
    renderItem: function renderItem(h, renderOpts, params) {
      return [h('select', {
        class: 'vxe-default-select',
        attrs: getAttrs(renderOpts),
        on: getFormEvents(renderOpts, params)
      }, renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params, renderFormOptions) : renderFormOptions(h, renderOpts.options, renderOpts, params))];
    },
    editCellExportMethod: createExportMethod(getSelectCellValue, true),
    cellExportMethod: createExportMethod(getSelectCellValue)
  }
};
/**
 * 全局渲染器
 */

var renderStore = {
  mixin: function mixin(map) {
    _xeUtils.default.each(map, function (options, name) {
      return renderStore.add(name, options);
    });

    return renderStore;
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

    return renderStore;
  },
  delete: function _delete(name) {
    delete renderMap[name];
    return renderStore;
  }
};
exports.renderStore = renderStore;
var _default = renderStore;
exports.default = _default;