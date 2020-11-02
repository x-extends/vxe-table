"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputEventTypes = ['input', 'textarea', '$input', '$textarea'];
var defaultCompProps = {
  transfer: true
};

function isEmptyValue(cellValue) {
  return cellValue === null || cellValue === undefined || cellValue === '';
}

function getChangeEvent(renderOpts) {
  return inputEventTypes.indexOf(renderOpts.name) > -1 ? 'input' : 'change';
}

function parseDate(value, props) {
  return value && props.valueFormat ? _ctor.default.toStringDate(value, props.valueFormat) : value;
}

function getFormatDate(value, props, defaultFormat) {
  var _props$dateConfig = props.dateConfig,
      dateConfig = _props$dateConfig === void 0 ? {} : _props$dateConfig;
  return _ctor.default.toDateString(parseDate(value, props), dateConfig.labelFormat || defaultFormat);
}

function getLabelFormatDate(value, props) {
  return getFormatDate(value, props, _conf.default.i18n("vxe.input.date.labelFormat.".concat(props.type)));
}

function getDefaultComponentName(_ref) {
  var name = _ref.name;
  return "vxe-".concat(name.replace('$', ''));
}

function handleConfirmFilter(params, checked, option) {
  var $panel = params.$panel;
  $panel.changeOption({}, checked, option);
}

function getNativeAttrs(_ref2) {
  var name = _ref2.name,
      attrs = _ref2.attrs;

  if (name === 'input') {
    attrs = Object.assign({
      type: 'text'
    }, attrs);
  }

  return attrs;
}

function getCellEditFilterProps(renderOpts, params, value, defaultProps) {
  var vSize = params.$table.vSize;
  return _ctor.default.assign(vSize ? {
    size: vSize
  } : {}, defaultCompProps, defaultProps, renderOpts.props, {
    value: value
  });
}

function getItemProps(renderOpts, params, value, defaultProps) {
  var vSize = params.$form.vSize;
  return _ctor.default.assign(vSize ? {
    size: vSize
  } : {}, defaultCompProps, defaultProps, renderOpts.props, {
    value: value
  });
}

function getNativeOns(renderOpts, params) {
  var nativeEvents = renderOpts.nativeEvents;
  var nativeOns = {};

  _ctor.default.objectEach(nativeEvents, function (func, key) {
    nativeOns[key] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      func.apply(void 0, [params].concat(args));
    };
  });

  return nativeOns;
}

function getOns(renderOpts, params, inputFunc, changeFunc) {
  var events = renderOpts.events;
  var modelEvent = 'input';
  var changeEvent = getChangeEvent(renderOpts);
  var isSameEvent = changeEvent === modelEvent;
  var ons = {};

  _ctor.default.objectEach(events, function (func, key) {
    ons[key] = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      func.apply(void 0, [params].concat(args));
    };
  });

  if (inputFunc) {
    ons[modelEvent] = function (targetEvnt) {
      inputFunc(targetEvnt);

      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvnt);
      }

      if (isSameEvent && changeFunc) {
        changeFunc(targetEvnt);
      }
    };
  }

  if (!isSameEvent && changeFunc) {
    ons[changeEvent] = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      changeFunc.apply(void 0, args);

      if (events && events[changeEvent]) {
        events[changeEvent].apply(events, [params].concat(args));
      }
    };
  }

  return ons;
}

function getEditOns(renderOpts, params) {
  var $table = params.$table,
      row = params.row,
      column = params.column;
  return getOns(renderOpts, params, function (value) {
    // 处理 model 值双向绑定
    _ctor.default.set(row, column.property, value);
  }, function () {
    // 处理 change 事件相关逻辑
    $table.updateStatus(params);
  });
}

function getFilterOns(renderOpts, params, option) {
  return getOns(renderOpts, params, function (value) {
    // 处理 model 值双向绑定
    option.data = value;
  }, function () {
    handleConfirmFilter(params, !_ctor.default.eqNull(option.data), option);
  });
}

function getItemOns(renderOpts, params) {
  var $form = params.$form,
      data = params.data,
      property = params.property;
  return getOns(renderOpts, params, function (value) {
    // 处理 model 值双向绑定
    _ctor.default.set(data, property, value);
  }, function () {
    // 处理 change 事件相关逻辑
    $form.updateStatus(params);
  });
}

function isSyncCell(renderOpts, params) {
  return renderOpts.immediate || params.$type === 'cell';
}

function getNativeEditOns(renderOpts, params) {
  var $table = params.$table,
      row = params.row,
      column = params.column;
  var model = column.model;
  return getOns(renderOpts, params, function (evnt) {
    // 处理 model 值双向绑定
    var cellValue = evnt.target.value;

    if (isSyncCell(renderOpts, params)) {
      _tools.UtilTools.setCellValue(row, column, cellValue);
    } else {
      model.update = true;
      model.value = cellValue;
    }
  }, function (evnt) {
    // 处理 change 事件相关逻辑
    var cellValue = evnt.target.value;
    $table.updateStatus(params, cellValue);
  });
}

function getNativeFilterOns(renderOpts, params, option) {
  return getOns(renderOpts, params, function (evnt) {
    // 处理 model 值双向绑定
    option.data = evnt.target.value;
  }, function () {
    handleConfirmFilter(params, !_ctor.default.eqNull(option.data), option);
  });
}

function getNativeItemOns(renderOpts, params) {
  var $form = params.$form,
      data = params.data,
      property = params.property;
  return getOns(renderOpts, params, function (evnt) {
    // 处理 model 值双向绑定
    var itemValue = evnt.target.value;

    _ctor.default.set(data, property, itemValue);
  }, function () {
    // 处理 change 事件相关逻辑
    $form.updateStatus(params);
  });
}
/**
 * 单元格可编辑渲染-原生的标签
 * input、textarea、select
 */


function nativeEditRender(h, renderOpts, params) {
  var row = params.row,
      column = params.column;
  var name = renderOpts.name;
  var attrs = getNativeAttrs(renderOpts);
  var cellValue = isSyncCell(renderOpts, params) ? _tools.UtilTools.getCellValue(row, column) : column.model.value;
  return [h(name, {
    class: "vxe-default-".concat(name),
    attrs: attrs,
    domProps: {
      value: cellValue
    },
    on: getNativeEditOns(renderOpts, params)
  })];
}

function defaultEditRender(h, renderOpts, params) {
  var row = params.row,
      column = params.column;

  var cellValue = _tools.UtilTools.getCellValue(row, column);

  return [h(getDefaultComponentName(renderOpts), {
    props: getCellEditFilterProps(renderOpts, params, cellValue),
    on: getEditOns(renderOpts, params),
    nativeOn: getNativeOns(renderOpts, params)
  })];
}

function defaultButtonEditRender(h, renderOpts, params) {
  return [h('vxe-button', {
    props: getCellEditFilterProps(renderOpts, params),
    on: getOns(renderOpts, params),
    nativeOn: getNativeOns(renderOpts, params)
  })];
}

function defaultButtonsEditRender(h, renderOpts, params) {
  return renderOpts.children.map(function (childRenderOpts) {
    return defaultButtonEditRender(h, childRenderOpts, params)[0];
  });
}

function renderNativeOptgroups(h, renderOpts, params, renderOptionsMethods) {
  var optionGroups = renderOpts.optionGroups,
      _renderOpts$optionGro = renderOpts.optionGroupProps,
      optionGroupProps = _renderOpts$optionGro === void 0 ? {} : _renderOpts$optionGro;
  var groupOptions = optionGroupProps.options || 'options';
  var groupLabel = optionGroupProps.label || 'label';
  return optionGroups.map(function (group, gIndex) {
    return h('optgroup', {
      key: gIndex,
      domProps: {
        label: group[groupLabel]
      }
    }, renderOptionsMethods(h, group[groupOptions], renderOpts, params));
  });
}
/**
 * 渲染原生的 option 标签
 */


function renderNativeOptions(h, options, renderOpts, params) {
  var _renderOpts$optionPro = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro === void 0 ? {} : _renderOpts$optionPro;
  var row = params.row,
      column = params.column;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';
  var cellValue = isSyncCell(renderOpts, params) ? _tools.UtilTools.getCellValue(row, column) : column.model.value;
  return options.map(function (option, oIndex) {
    return h('option', {
      key: oIndex,
      attrs: {
        value: option[valueProp],
        disabled: option[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: option[valueProp] == cellValue
      }
    }, option[labelProp]);
  });
}

function nativeFilterRender(h, renderOpts, params) {
  var column = params.column;
  var name = renderOpts.name;
  var attrs = getNativeAttrs(renderOpts);
  return column.filters.map(function (option, oIndex) {
    return h(name, {
      key: oIndex,
      class: "vxe-default-".concat(name),
      attrs: attrs,
      domProps: {
        value: option.data
      },
      on: getNativeFilterOns(renderOpts, params, option)
    });
  });
}

function defaultFilterRender(h, renderOpts, params) {
  var column = params.column;
  return column.filters.map(function (option, oIndex) {
    var optionValue = option.data;
    return h(getDefaultComponentName(renderOpts), {
      key: oIndex,
      props: getCellEditFilterProps(renderOpts, renderOpts, optionValue),
      on: getFilterOns(renderOpts, params, option)
    });
  });
}

function handleFilterMethod(_ref3) {
  var option = _ref3.option,
      row = _ref3.row,
      column = _ref3.column;
  var data = option.data;

  var cellValue = _ctor.default.get(row, column.property);
  /* eslint-disable eqeqeq */


  return cellValue == data;
}

function nativeSelectEditRender(h, renderOpts, params) {
  return [h('select', {
    class: 'vxe-default-select',
    attrs: getNativeAttrs(renderOpts),
    on: getNativeEditOns(renderOpts, params)
  }, renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeOptions) : renderNativeOptions(h, renderOpts.options, renderOpts, params))];
}

function defaultSelectEditRender(h, renderOpts, params) {
  var row = params.row,
      column = params.column;
  var options = renderOpts.options,
      optionProps = renderOpts.optionProps,
      optionGroups = renderOpts.optionGroups,
      optionGroupProps = renderOpts.optionGroupProps;

  var cellValue = _tools.UtilTools.getCellValue(row, column);

  return [h(getDefaultComponentName(renderOpts), {
    props: getCellEditFilterProps(renderOpts, params, cellValue, {
      options: options,
      optionProps: optionProps,
      optionGroups: optionGroups,
      optionGroupProps: optionGroupProps
    }),
    on: getEditOns(renderOpts, params)
  })];
}

function getSelectCellValue(renderOpts, _ref4) {
  var row = _ref4.row,
      column = _ref4.column;
  var _renderOpts$props = renderOpts.props,
      props = _renderOpts$props === void 0 ? {} : _renderOpts$props,
      options = renderOpts.options,
      optionGroups = renderOpts.optionGroups,
      _renderOpts$optionPro2 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro2 === void 0 ? {} : _renderOpts$optionPro2,
      _renderOpts$optionGro2 = renderOpts.optionGroupProps,
      optionGroupProps = _renderOpts$optionGro2 === void 0 ? {} : _renderOpts$optionGro2;

  var cellValue = _ctor.default.get(row, column.property);

  var selectItem;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';

  if (!isEmptyValue(cellValue)) {
    return _ctor.default.map(props.multiple ? cellValue : [cellValue], optionGroups ? function (value) {
      var groupOptions = optionGroupProps.options || 'options';

      for (var index = 0; index < optionGroups.length; index++) {
        /* eslint-disable eqeqeq */
        selectItem = _ctor.default.find(optionGroups[index][groupOptions], function (item) {
          return item[valueProp] == value;
        });

        if (selectItem) {
          break;
        }
      }

      return selectItem ? selectItem[labelProp] : value;
    } : function (value) {
      /* eslint-disable eqeqeq */
      selectItem = _ctor.default.find(options, function (item) {
        return item[valueProp] == value;
      });
      return selectItem ? selectItem[labelProp] : value;
    }).join(', ');
  }

  return null;
}
/**
 * 渲染表单-项
 * 用于渲染原生的标签
 */


function nativeItemRender(h, renderOpts, params) {
  var data = params.data,
      property = params.property;
  var name = renderOpts.name;
  var attrs = getNativeAttrs(renderOpts);

  var itemValue = _ctor.default.get(data, property);

  return [h(name, {
    class: "vxe-default-".concat(name),
    attrs: attrs,
    domProps: attrs && name === 'input' && (attrs.type === 'submit' || attrs.type === 'reset') ? null : {
      value: itemValue
    },
    on: getNativeItemOns(renderOpts, params)
  })];
}

function defaultItemRender(h, renderOpts, params) {
  var data = params.data,
      property = params.property;

  var itemValue = _ctor.default.get(data, property);

  return [h(getDefaultComponentName(renderOpts), {
    props: getItemProps(renderOpts, params, itemValue),
    on: getItemOns(renderOpts, params),
    nativeOn: getNativeOns(renderOpts, params)
  })];
}

function defaultButtonItemRender(h, renderOpts, params) {
  return [h('vxe-button', {
    props: getItemProps(renderOpts, params),
    on: getOns(renderOpts, params),
    nativeOn: getNativeOns(renderOpts, params)
  })];
}

function defaultButtonsItemRender(h, renderOpts, params) {
  return renderOpts.children.map(function (childRenderOpts) {
    return defaultButtonItemRender(h, childRenderOpts, params)[0];
  });
}
/**
 * 渲染原生的 select 标签
 */


function renderNativeFormOptions(h, options, renderOpts, params) {
  var data = params.data,
      property = params.property;
  var _renderOpts$optionPro3 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro3 === void 0 ? {} : _renderOpts$optionPro3;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';

  var cellValue = _ctor.default.get(data, property);

  return options.map(function (item, oIndex) {
    return h('option', {
      key: oIndex,
      attrs: {
        value: item[valueProp],
        disabled: item[disabledProp]
      },
      domProps: {
        /* eslint-disable eqeqeq */
        selected: item[valueProp] == cellValue
      }
    }, item[labelProp]);
  });
}

function handleExportSelectMethod(params) {
  var column = params.column;
  return getSelectCellValue(column.editRender || column.cellRender, params);
}
/**
 * 渲染表单-项中
 * 单选框和复选框
 */


function defaultFormItemRadioAndCheckboxRender(h, renderOpts, params) {
  var options = renderOpts.options,
      _renderOpts$optionPro4 = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro4 === void 0 ? {} : _renderOpts$optionPro4;
  var data = params.data,
      property = params.property;
  var labelProp = optionProps.label || 'label';
  var valueProp = optionProps.value || 'value';
  var disabledProp = optionProps.disabled || 'disabled';

  var itemValue = _ctor.default.get(data, property);

  var name = getDefaultComponentName(renderOpts);
  return [h("".concat(name, "-group"), {
    props: getItemProps(renderOpts, params, itemValue),
    on: getItemOns(renderOpts, params),
    nativeOn: getNativeOns(renderOpts, params)
  }, options.map(function (item, index) {
    return h(name, {
      key: index,
      props: {
        label: item[valueProp],
        content: item[labelProp],
        disabled: item[disabledProp]
      }
    });
  }))];
}
/**
 * 内置的组件渲染
 */


var renderMap = {
  input: {
    autofocus: 'input',
    renderEdit: nativeEditRender,
    renderDefault: nativeEditRender,
    renderFilter: nativeFilterRender,
    filterMethod: handleFilterMethod,
    renderItem: nativeItemRender
  },
  textarea: {
    autofocus: 'textarea',
    renderEdit: nativeEditRender,
    renderItem: nativeItemRender
  },
  select: {
    renderEdit: nativeSelectEditRender,
    renderDefault: nativeSelectEditRender,
    renderCell: function renderCell(h, renderOpts, params) {
      return getSelectCellValue(renderOpts, params);
    },
    renderFilter: function renderFilter(h, renderOpts, params) {
      var column = params.column;
      return column.filters.map(function (option, oIndex) {
        return h('select', {
          key: oIndex,
          class: 'vxe-default-select',
          attrs: getNativeAttrs(renderOpts),
          on: getNativeFilterOns(renderOpts, params, option)
        }, renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeOptions) : renderNativeOptions(h, renderOpts.options, renderOpts, params));
      });
    },
    filterMethod: handleFilterMethod,
    renderItem: function renderItem(h, renderOpts, params) {
      return [h('select', {
        class: 'vxe-default-select',
        attrs: getNativeAttrs(renderOpts),
        on: getNativeItemOns(renderOpts, params)
      }, renderOpts.optionGroups ? renderNativeOptgroups(h, renderOpts, params, renderNativeFormOptions) : renderNativeFormOptions(h, renderOpts.options, renderOpts, params))];
    },
    cellExportMethod: handleExportSelectMethod
  },
  $input: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultEditRender,
    renderCell: function renderCell(h, renderOpts, params) {
      var _renderOpts$props2 = renderOpts.props,
          props = _renderOpts$props2 === void 0 ? {} : _renderOpts$props2;
      var row = params.row,
          column = params.column;
      var digits = props.digits || _conf.default.input.digits;

      var cellValue = _ctor.default.get(row, column.property);

      if (cellValue) {
        switch (props.type) {
          case 'date':
          case 'week':
          case 'month':
          case 'year':
            cellValue = getLabelFormatDate(cellValue, props);
            break;

          case 'float':
            cellValue = _ctor.default.toFixed(_ctor.default.floor(cellValue, digits), digits);
            break;
        }
      }

      return cellValue;
    },
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    filterMethod: handleFilterMethod,
    renderItem: defaultItemRender
  },
  $textarea: {
    autofocus: '.vxe-textarea--inner',
    renderItem: defaultItemRender
  },
  $button: {
    renderDefault: defaultButtonEditRender,
    renderItem: defaultButtonItemRender
  },
  $buttons: {
    renderDefault: defaultButtonsEditRender,
    renderItem: defaultButtonsItemRender
  },
  $select: {
    autofocus: '.vxe-input--inner',
    renderEdit: defaultSelectEditRender,
    renderDefault: defaultSelectEditRender,
    renderCell: function renderCell(h, renderOpts, params) {
      return getSelectCellValue(renderOpts, params);
    },
    renderFilter: function renderFilter(h, renderOpts, params) {
      var column = params.column;
      var options = renderOpts.options,
          optionProps = renderOpts.optionProps,
          optionGroups = renderOpts.optionGroups,
          optionGroupProps = renderOpts.optionGroupProps;
      var nativeOn = getNativeOns(renderOpts, params);
      return column.filters.map(function (option, oIndex) {
        var optionValue = option.data;
        return h(getDefaultComponentName(renderOpts), {
          key: oIndex,
          props: getCellEditFilterProps(renderOpts, params, optionValue, {
            options: options,
            optionProps: optionProps,
            optionGroups: optionGroups,
            optionGroupProps: optionGroupProps
          }),
          on: getFilterOns(renderOpts, params, option),
          nativeOn: nativeOn
        });
      });
    },
    filterMethod: handleFilterMethod,
    renderItem: function renderItem(h, renderOpts, params) {
      var data = params.data,
          property = params.property;
      var options = renderOpts.options,
          optionProps = renderOpts.optionProps,
          optionGroups = renderOpts.optionGroups,
          optionGroupProps = renderOpts.optionGroupProps;

      var itemValue = _ctor.default.get(data, property);

      return [h(getDefaultComponentName(renderOpts), {
        props: getItemProps(renderOpts, params, itemValue, {
          options: options,
          optionProps: optionProps,
          optionGroups: optionGroups,
          optionGroupProps: optionGroupProps
        }),
        on: getItemOns(renderOpts, params),
        nativeOn: getNativeOns(renderOpts, params)
      })];
    },
    cellExportMethod: handleExportSelectMethod
  },
  $radio: {
    autofocus: '.vxe-radio--input',
    renderItem: defaultFormItemRadioAndCheckboxRender
  },
  $checkbox: {
    autofocus: '.vxe-checkbox--input',
    renderItem: defaultFormItemRadioAndCheckboxRender
  },
  $switch: {
    autofocus: '.vxe-switch--button',
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderItem: defaultItemRender
  }
};
/**
 * 全局渲染器
 */

var renderer = {
  mixin: function mixin(map) {
    _ctor.default.each(map, function (options, name) {
      return renderer.add(name, options);
    });

    return renderer;
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

    return renderer;
  },
  delete: function _delete(name) {
    delete renderMap[name];
    return renderer;
  }
};
var _default = renderer;
exports.default = _default;