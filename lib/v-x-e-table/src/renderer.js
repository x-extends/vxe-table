"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.renderStore = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return _xeUtils.default.assign({}, _xeUtils.default.objectMap(events, function (cb) {
      return function () {
        cb.apply(null, [params].concat.apply(params, arguments));
      };
    }), on);
  }

  return on;
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
        selected: item[valueProp] === _tools.UtilTools.getCellValue(row, column)
      },
      key: index
    }, item[labelProp]);
  });
}

function getFilterEvents(item, renderOpts, params, context) {
  var _params = params,
      column = _params.column;
  var events = renderOpts.events;
  var type = name === 'select' ? 'change' : 'input';

  var on = _defineProperty({}, type, function (evnt) {
    item.data = evnt.target.value;
    handleConfirmFilter(context, column, !!item.data, item);

    if (events && events[type]) {
      events[type](Object.assign({
        context: context
      }, params), evnt);
    }
  });

  if (events) {
    return _xeUtils.default.assign({}, _xeUtils.default.objectMap(events, function (cb) {
      return function () {
        params = Object.assign({
          context: context
        }, params);
        cb.apply(null, [params].concat.apply(params, arguments));
      };
    }), on);
  }

  return on;
}

function defaultFilterRender(h, renderOpts, params, context) {
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
      on: getFilterEvents(item, renderOpts, params, context)
    })]);
  });
}

function handleConfirmFilter(context, column, checked, item) {
  context[column.filterMultiple ? 'changeMultipleOption' : 'changeRadioOption']({}, checked, item);
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

var renderMap = {
  input: {
    autofocus: 'input',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: defaultFilterMethod
  },
  select: {
    renderEdit: renderSelectEdit,
    renderDefault: renderSelectEdit,
    renderCell: function renderCell(h, renderOpts, params) {
      var options = renderOpts.options,
          optionGroups = renderOpts.optionGroups,
          _renderOpts$optionPro2 = renderOpts.optionProps,
          optionProps = _renderOpts$optionPro2 === void 0 ? {} : _renderOpts$optionPro2,
          _renderOpts$optionGro2 = renderOpts.optionGroupProps,
          optionGroupProps = _renderOpts$optionGro2 === void 0 ? {} : _renderOpts$optionGro2;
      var row = params.row,
          column = params.column;

      var cellValue = _xeUtils.default.get(row, column.property);

      var selectItem;
      var labelProp = optionProps.label || 'label';
      var valueProp = optionProps.value || 'value';

      if (optionGroups) {
        var groupOptions = optionGroupProps.options || 'options';

        for (var index = 0; index < optionGroups.length; index++) {
          selectItem = _xeUtils.default.find(optionGroups[index][groupOptions], function (item) {
            return item[valueProp] === cellValue;
          });

          if (selectItem) {
            break;
          }
        }

        return selectItem ? selectItem[labelProp] : cellValue;
      } else {
        selectItem = _xeUtils.default.find(options, function (item) {
          return item[valueProp] === cellValue;
        });
        return selectItem ? selectItem[labelProp] : cellValue;
      }
    },
    renderFilter: function renderFilter(h, renderOpts, params, context) {
      var column = params.column;
      return column.filters.map(function (item) {
        return h('select', {
          class: 'vxe-default-select',
          attrs: getAttrs(renderOpts),
          on: getFilterEvents(item, renderOpts, params, context)
        }, renderOpts.optionGroups ? renderOptgroups(h, renderOpts, params) : renderOptions(h, renderOpts.options, renderOpts, params));
      });
    },
    filterMethod: defaultFilterMethod
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