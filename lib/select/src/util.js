"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOption = isOption;
exports.getOptionConfig = getOptionConfig;
exports.createOption = createOption;
exports.destroyOption = destroyOption;
exports.assemOption = assemOption;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OptionConfig = /*#__PURE__*/function () {
  function OptionConfig($xeselect, _vm) {
    _classCallCheck(this, OptionConfig);

    Object.assign(this, {
      value: _vm.value,
      label: _vm.label,
      visible: _vm.visible,
      disabled: _vm.disabled
    });
  }

  _createClass(OptionConfig, [{
    key: "update",
    value: function update(name, value) {
      this[name] = value;
    }
  }]);

  return OptionConfig;
}();

function isOption(option) {
  return option instanceof OptionConfig;
}

function getOptionConfig($xeselect, _vm, options) {
  return isOption(_vm) ? _vm : new OptionConfig($xeselect, _vm, options);
}

function createOption($xeselect, _vm) {
  return getOptionConfig($xeselect, _vm);
}

function destroyOption(_vm) {
  var $xeselect = _vm.$xeselect,
      optionConfig = _vm.optionConfig;

  var matchObj = _ctor.default.findTree($xeselect.collectOption, function (option) {
    return option === optionConfig;
  });

  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
}

function assemOption(_vm) {
  var $el = _vm.$el,
      $xeselect = _vm.$xeselect,
      $xeoptgroup = _vm.$xeoptgroup,
      optionConfig = _vm.optionConfig;
  var groupConfig = $xeoptgroup ? $xeoptgroup.optionConfig : null;
  optionConfig.slots = _vm.$scopedSlots;

  if (groupConfig) {
    if (!groupConfig.options) {
      groupConfig.options = [];
    }

    groupConfig.options.splice([].indexOf.call($xeoptgroup.$el.children, $el), 0, optionConfig);
  } else {
    $xeselect.collectOption.splice([].indexOf.call($xeselect.$refs.hideOption.children, $el), 0, optionConfig);
  }
}