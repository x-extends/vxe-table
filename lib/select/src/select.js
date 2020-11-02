"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderOption = renderOption;
exports.renderOptgroup = renderOptgroup;
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _input = _interopRequireDefault(require("../../input/src/input"));

var _conf = _interopRequireDefault(require("../../conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isOptionVisible(option) {
  return option.visible !== false;
}

function getOptUniqueId() {
  return _ctor.default.uniqueId('opt_');
}

function getOptkey(_vm) {
  return _vm.optId || '_XID';
}

function getOptid(_vm, option) {
  var optid = option[getOptkey(_vm)];
  return optid ? encodeURIComponent(optid) : '';
}

function findOffsetOption(_vm, optionValue, isUpArrow) {
  var isGroup = _vm.isGroup,
      visibleOptionList = _vm.visibleOptionList,
      visibleGroupList = _vm.visibleGroupList,
      valueField = _vm.valueField,
      groupOptionsField = _vm.groupOptionsField;
  var firstOption;
  var prevOption;
  var nextOption;
  var currOption;

  if (isGroup) {
    for (var gIndex = 0; gIndex < visibleGroupList.length; gIndex++) {
      var group = visibleGroupList[gIndex];
      var groupOptionList = group[groupOptionsField];
      var isGroupDisabled = group.disabled;

      if (groupOptionList) {
        for (var index = 0; index < groupOptionList.length; index++) {
          var option = groupOptionList[index];
          var isVisible = isOptionVisible(option);
          var isDisabled = isGroupDisabled || option.disabled;

          if (!firstOption && !isDisabled) {
            firstOption = option;
          }

          if (currOption) {
            if (isVisible && !isDisabled) {
              nextOption = option;

              if (!isUpArrow) {
                return {
                  offsetOption: nextOption
                };
              }
            }
          }

          if (optionValue === option[valueField]) {
            currOption = option;

            if (isUpArrow) {
              return {
                offsetOption: prevOption
              };
            }
          } else {
            if (isVisible && !isDisabled) {
              prevOption = option;
            }
          }
        }
      }
    }
  } else {
    for (var _index = 0; _index < visibleOptionList.length; _index++) {
      var _option = visibleOptionList[_index];
      var _isDisabled = _option.disabled;

      if (!firstOption && !_isDisabled) {
        firstOption = _option;
      }

      if (currOption) {
        if (!_isDisabled) {
          nextOption = _option;

          if (!isUpArrow) {
            return {
              offsetOption: nextOption
            };
          }
        }
      }

      if (optionValue === _option[valueField]) {
        currOption = _option;

        if (isUpArrow) {
          return {
            offsetOption: prevOption
          };
        }
      } else {
        if (!_isDisabled) {
          prevOption = _option;
        }
      }
    }
  }

  return {
    firstOption: firstOption
  };
}

function findOption(_vm, optionValue) {
  var isGroup = _vm.isGroup,
      fullOptionList = _vm.fullOptionList,
      fullGroupList = _vm.fullGroupList,
      valueField = _vm.valueField;

  if (isGroup) {
    for (var gIndex = 0; gIndex < fullGroupList.length; gIndex++) {
      var group = fullGroupList[gIndex];

      if (group.options) {
        for (var index = 0; index < group.options.length; index++) {
          var option = group.options[index];

          if (optionValue === option[valueField]) {
            return option;
          }
        }
      }
    }
  }

  return fullOptionList.find(function (item) {
    return optionValue === item[valueField];
  });
}

function getSelectLabel(_vm, value) {
  var item = findOption(_vm, value);
  return _ctor.default.toString(item ? item[_vm.labelField] : value);
}

function renderOption(h, _vm, list, group) {
  var isGroup = _vm.isGroup,
      labelField = _vm.labelField,
      valueField = _vm.valueField,
      optkey = _vm.optkey,
      value = _vm.value,
      multiple = _vm.multiple,
      currentValue = _vm.currentValue;
  return list.map(function (option, cIndex) {
    var isVisible = !isGroup || isOptionVisible(option);
    var isDisabled = group && group.disabled || option.disabled;
    var optionValue = option[valueField];
    var optid = getOptid(_vm, option);
    return isVisible ? h('div', {
      key: optkey ? optid : cIndex,
      class: ['vxe-select-option', {
        'is--disabled': isDisabled,
        'is--selected': multiple ? value && value.indexOf(optionValue) > -1 : value === optionValue,
        'is--hover': currentValue === optionValue
      }],
      attrs: {
        'data-optid': optid
      },
      on: {
        click: function click(evnt) {
          if (!isDisabled) {
            _vm.changeOptionEvent(evnt, optionValue);
          }
        },
        mouseenter: function mouseenter() {
          if (!isDisabled) {
            _vm.setCurrentOption(option);
          }
        }
      }
    }, _tools.UtilTools.formatText(_tools.UtilTools.getFuncText(option[labelField]))) : null;
  });
}

function renderOptgroup(h, _vm) {
  var optkey = _vm.optkey,
      visibleGroupList = _vm.visibleGroupList,
      groupLabelField = _vm.groupLabelField,
      groupOptionsField = _vm.groupOptionsField;
  return visibleGroupList.map(function (group, gIndex) {
    var optid = getOptid(_vm, group);
    var isGroupDisabled = group.disabled;
    return h('div', {
      key: optkey ? optid : gIndex,
      class: ['vxe-optgroup', {
        'is--disabled': isGroupDisabled
      }],
      attrs: {
        'data-optid': optid
      }
    }, [h('div', {
      class: 'vxe-optgroup--title'
    }, _tools.UtilTools.getFuncText(group[groupLabelField])), h('div', {
      class: 'vxe-optgroup--wrapper'
    }, renderOption(h, _vm, group[groupOptionsField], group))]);
  });
}

function renderOpts(h, _vm) {
  var isGroup = _vm.isGroup,
      visibleGroupList = _vm.visibleGroupList,
      visibleOptionList = _vm.visibleOptionList;

  if (isGroup) {
    if (visibleGroupList.length) {
      return renderOptgroup(h, _vm);
    }
  } else {
    if (visibleOptionList.length) {
      return renderOption(h, _vm, visibleOptionList);
    }
  }

  return [h('div', {
    class: 'vxe-select--empty-placeholder'
  }, _vm.emptyText || _conf.default.i18n('vxe.select.emptyText'))];
}

var _default2 = {
  name: 'VxeSelect',
  mixins: [_size.default],
  props: {
    value: null,
    clearable: Boolean,
    placeholder: String,
    disabled: Boolean,
    multiple: Boolean,
    multiCharOverflow: {
      type: [Number, String],
      default: function _default() {
        return _conf.default.select.multiCharOverflow;
      }
    },
    prefixIcon: String,
    placement: String,
    options: Array,
    optionProps: Object,
    optionGroups: Array,
    optionGroupProps: Object,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.select.size || _conf.default.size;
      }
    },
    emptyText: String,
    optId: {
      type: String,
      default: function _default() {
        return _conf.default.select.optId;
      }
    },
    optKey: Boolean,
    transfer: {
      type: Boolean,
      default: function _default() {
        return _conf.default.select.transfer;
      }
    }
  },
  components: {
    VxeInput: _input.default
  },
  provide: function provide() {
    return {
      $xeselect: this
    };
  },
  data: function data() {
    return {
      inited: false,
      collectOption: [],
      fullGroupList: [],
      fullOptionList: [],
      visibleGroupList: [],
      visibleOptionList: [],
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null,
      currentValue: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false
    };
  },
  computed: {
    propsOpts: function propsOpts() {
      return this.optionProps || {};
    },
    groupPropsOpts: function groupPropsOpts() {
      return this.optionGroupProps || {};
    },
    labelField: function labelField() {
      return this.propsOpts.label || 'label';
    },
    valueField: function valueField() {
      return this.propsOpts.value || 'value';
    },
    groupLabelField: function groupLabelField() {
      return this.groupPropsOpts.label || 'label';
    },
    groupOptionsField: function groupOptionsField() {
      return this.groupPropsOpts.options || 'options';
    },
    isGroup: function isGroup() {
      return this.fullGroupList.some(function (item) {
        return item.options && item.options.length;
      });
    },
    multiMaxCharNum: function multiMaxCharNum() {
      return _ctor.default.toNumber(this.multiCharOverflow);
    },
    selectLabel: function selectLabel() {
      var _this = this;

      var value = this.value,
          multiple = this.multiple,
          multiMaxCharNum = this.multiMaxCharNum;

      if (value && multiple) {
        return value.map(function (val) {
          var label = getSelectLabel(_this, val);

          if (multiMaxCharNum > 0 && label.length > multiMaxCharNum) {
            return "".concat(label.substring(0, multiMaxCharNum), "...");
          }

          return label;
        }).join(', ');
      }

      return getSelectLabel(this, value);
    }
  },
  watch: {
    collectOption: function collectOption(value) {
      if (value.some(function (item) {
        return item.options && item.options.length;
      })) {
        this.fullOptionList = [];
        this.fullGroupList = value;
      } else {
        this.fullGroupList = [];
        this.fullOptionList = value;
      }

      this.updateCache();
    },
    options: function options(value) {
      this.fullGroupList = [];
      this.fullOptionList = value;
      this.updateCache();
    },
    optionGroups: function optionGroups(value) {
      this.fullOptionList = [];
      this.fullGroupList = value;
      this.updateCache();
    }
  },
  created: function created() {
    var options = this.options,
        optionGroups = this.optionGroups;

    if (optionGroups) {
      this.fullGroupList = optionGroups;
    } else if (options) {
      this.fullOptionList = options;
    }

    this.updateCache();

    _tools.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  beforeDestroy: function beforeDestroy() {
    var panelElem = this.$refs.panel;

    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem);
    }
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'mousewheel');

    _tools.GlobalEvent.off(this, 'mousedown');

    _tools.GlobalEvent.off(this, 'keydown');

    _tools.GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref, _ref2;

    var vSize = this.vSize,
        inited = this.inited,
        isActivated = this.isActivated,
        disabled = this.disabled,
        visiblePanel = this.visiblePanel;
    return h('div', {
      class: ['vxe-select', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--visivle', visiblePanel), _defineProperty(_ref, 'is--disabled', disabled), _defineProperty(_ref, 'is--active', isActivated), _ref)]
    }, [h('div', {
      class: 'vxe-select-slots',
      ref: 'hideOption'
    }, this.$slots.default), h('vxe-input', {
      ref: 'input',
      props: {
        clearable: this.clearable,
        placeholder: this.placeholder,
        readonly: true,
        disabled: disabled,
        type: 'text',
        prefixIcon: this.prefixIcon,
        suffixIcon: visiblePanel ? _conf.default.icon.SELECT_OPEN : _conf.default.icon.SELECT_CLOSE,
        value: this.selectLabel
      },
      on: {
        clear: this.clearEvent,
        click: this.togglePanelEvent,
        focus: this.focusEvent,
        blur: this.blurEvent,
        'suffix-click': this.togglePanelEvent
      }
    }), h('div', {
      ref: 'panel',
      class: ['vxe-table--ignore-clear vxe-select--panel', (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, 'is--transfer', this.transfer), _defineProperty(_ref2, 'animat--leave', this.animatVisible), _defineProperty(_ref2, 'animat--enter', visiblePanel), _ref2)],
      attrs: {
        'data-placement': this.panelPlacement
      },
      style: this.panelStyle
    }, inited ? [h('div', {
      ref: 'optWrapper',
      class: 'vxe-select-option--wrapper'
    }, renderOpts(h, this))] : null)]);
  },
  methods: {
    updateCache: function updateCache() {
      var _this2 = this;

      var fullOptionList = this.fullOptionList,
          fullGroupList = this.fullGroupList,
          groupOptionsField = this.groupOptionsField;
      var optkey = getOptkey(this);

      var handleOptis = function handleOptis(item) {
        if (!getOptid(_this2, item)) {
          item[optkey] = getOptUniqueId();
        }
      };

      if (fullGroupList.length) {
        fullGroupList.forEach(function (group) {
          handleOptis(group);

          if (group[groupOptionsField]) {
            group[groupOptionsField].forEach(handleOptis);
          }
        });
      } else if (fullOptionList.length) {
        fullOptionList.forEach(handleOptis);
      }

      this.refreshOption();
    },

    /**
     * 刷新选项，当选项被动态显示/隐藏时可能会用到
     */
    refreshOption: function refreshOption() {
      var isGroup = this.isGroup,
          fullOptionList = this.fullOptionList,
          fullGroupList = this.fullGroupList;

      if (isGroup) {
        this.visibleGroupList = fullGroupList.filter(isOptionVisible);
      } else {
        this.visibleOptionList = fullOptionList.filter(isOptionVisible);
      }

      return this.$nextTick();
    },
    setCurrentOption: function setCurrentOption(option) {
      if (option) {
        this.currentValue = option[this.valueField];
      }
    },
    scrollToOption: function scrollToOption(option, isAlignBottom) {
      var _this3 = this;

      return this.$nextTick().then(function () {
        if (option) {
          var $refs = _this3.$refs;
          var optWrapperElem = $refs.optWrapper;
          var optElem = $refs.panel.querySelector("[data-optid='".concat(getOptid(_this3, option), "']"));

          if (optWrapperElem && optElem) {
            var wrapperHeight = optWrapperElem.offsetHeight;
            var offsetPadding = 5;

            if (isAlignBottom) {
              if (optElem.offsetTop + optElem.offsetHeight - optWrapperElem.scrollTop > wrapperHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop + optElem.offsetHeight - wrapperHeight;
              }
            } else {
              if (optElem.offsetTop + offsetPadding < optWrapperElem.scrollTop || optElem.offsetTop + offsetPadding > optWrapperElem.scrollTop + optWrapperElem.clientHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop - offsetPadding;
              }
            }
          }
        }
      });
    },
    clearEvent: function clearEvent(params, evnt) {
      this.clearValueEvent(evnt, null);
      this.hideOptionPanel();
    },
    clearValueEvent: function clearValueEvent(evnt, selectValue) {
      this.changeEvent(evnt, selectValue);
      this.$emit('clear', {
        value: selectValue,
        $event: evnt
      });
    },
    changeEvent: function changeEvent(evnt, selectValue) {
      if (selectValue !== this.value) {
        this.$emit('input', selectValue);
        this.$emit('change', {
          value: selectValue,
          $event: evnt
        });
      }
    },
    changeOptionEvent: function changeOptionEvent(evnt, selectValue) {
      var value = this.value,
          multiple = this.multiple;

      if (multiple) {
        var multipleValue;

        if (value) {
          if (value.indexOf(selectValue) === -1) {
            multipleValue = value.concat([selectValue]);
          } else {
            multipleValue = value.filter(function (val) {
              return val !== selectValue;
            });
          }
        } else {
          multipleValue = [selectValue];
        }

        this.changeEvent(evnt, multipleValue);
      } else {
        this.changeEvent(evnt, selectValue);
        this.hideOptionPanel();
      }
    },
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        if (visiblePanel) {
          if (_tools.DomTools.getEventTargetNode(evnt, $refs.panel).flag) {
            this.updatePlacement();
          } else {
            this.hideOptionPanel();
          }
        }
      }
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var $refs = this.$refs,
          $el = this.$el,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel;

      if (!disabled) {
        this.isActivated = _tools.DomTools.getEventTargetNode(evnt, $el).flag || _tools.DomTools.getEventTargetNode(evnt, $refs.panel).flag;

        if (visiblePanel && !this.isActivated) {
          this.hideOptionPanel();
        }
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var visiblePanel = this.visiblePanel,
          currentValue = this.currentValue,
          clearable = this.clearable,
          disabled = this.disabled;

      if (!disabled) {
        var keyCode = evnt.keyCode;
        var isTab = keyCode === 9;
        var isEnter = keyCode === 13;
        var isEsc = keyCode === 27;
        var isUpArrow = keyCode === 38;
        var isDwArrow = keyCode === 40;
        var isDel = keyCode === 46;
        var isSpacebar = keyCode === 32;

        if (isTab) {
          this.isActivated = false;
        }

        if (visiblePanel) {
          if (isEsc || isTab) {
            this.hideOptionPanel();
          } else if (isEnter) {
            this.changeOptionEvent(evnt, currentValue);
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault();

            var _findOffsetOption = findOffsetOption(this, currentValue, isUpArrow),
                firstOption = _findOffsetOption.firstOption,
                offsetOption = _findOffsetOption.offsetOption;

            if (!offsetOption && !findOption(this, currentValue)) {
              offsetOption = firstOption;
            }

            this.setCurrentOption(offsetOption);
            this.scrollToOption(offsetOption, isDwArrow);
          } else if (isSpacebar) {
            evnt.preventDefault();
          }
        } else if ((isUpArrow || isDwArrow || isEnter || isSpacebar) && this.isActivated) {
          evnt.preventDefault();
          this.showOptionPanel();
        }

        if (this.isActivated) {
          if (isDel && clearable) {
            this.clearValueEvent(evnt, null);
          }
        }
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent() {
      this.hideOptionPanel();
    },
    updateZindex: function updateZindex() {
      if (this.panelIndex < _tools.UtilTools.getLastZIndex()) {
        this.panelIndex = _tools.UtilTools.nextZIndex();
      }
    },
    focusEvent: function focusEvent() {
      if (!this.disabled) {
        this.isActivated = true;
      }
    },
    blurEvent: function blurEvent() {
      this.isActivated = false;
    },
    togglePanelEvent: function togglePanelEvent(params) {
      var $event = params.$event;
      $event.preventDefault();

      if (this.visiblePanel) {
        this.hideOptionPanel();
      } else {
        this.showOptionPanel();
      }
    },
    showOptionPanel: function showOptionPanel() {
      var _this4 = this;

      if (!this.disabled) {
        clearTimeout(this.hidePanelTimeout);

        if (!this.inited) {
          this.inited = true;

          if (this.transfer) {
            document.body.appendChild(this.$refs.panel);
          }
        }

        this.isActivated = true;
        this.animatVisible = true;
        setTimeout(function () {
          var value = _this4.value,
              multiple = _this4.multiple;
          var currOption = findOption(_this4, multiple && value ? value[0] : value);
          _this4.visiblePanel = true;

          if (currOption) {
            _this4.setCurrentOption(currOption);

            _this4.scrollToOption(currOption);
          }
        }, 10);
        this.updateZindex();
        this.updatePlacement();
      }
    },
    hideOptionPanel: function hideOptionPanel() {
      var _this5 = this;

      this.visiblePanel = false;
      this.hidePanelTimeout = setTimeout(function () {
        _this5.animatVisible = false;
      }, 350);
    },
    updatePlacement: function updatePlacement() {
      var _this6 = this;

      return this.$nextTick().then(function () {
        var $refs = _this6.$refs,
            transfer = _this6.transfer,
            placement = _this6.placement,
            panelIndex = _this6.panelIndex;
        var targetElem = $refs.input.$el;
        var panelElem = $refs.panel;

        if (panelElem && targetElem) {
          var targetHeight = targetElem.offsetHeight;
          var targetWidth = targetElem.offsetWidth;
          var panelHeight = panelElem.offsetHeight;
          var panelWidth = panelElem.offsetWidth;
          var marginSize = 5;
          var panelStyle = {
            zIndex: panelIndex
          };

          var _DomTools$getAbsolute = _tools.DomTools.getAbsolutePos(targetElem),
              boundingTop = _DomTools$getAbsolute.boundingTop,
              boundingLeft = _DomTools$getAbsolute.boundingLeft,
              visibleHeight = _DomTools$getAbsolute.visibleHeight,
              visibleWidth = _DomTools$getAbsolute.visibleWidth;

          var panelPlacement = 'bottom';

          if (transfer) {
            var left = boundingLeft;
            var top = boundingTop + targetHeight;

            if (placement === 'top') {
              panelPlacement = 'top';
              top = boundingTop - panelHeight;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top';
                top = boundingTop - panelHeight;
              } // 如果上面不够放，则向下（优先）


              if (top < marginSize) {
                panelPlacement = 'bottom';
                top = boundingTop + targetHeight;
              }
            } // 如果溢出右边


            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth;
            } // 如果溢出左边


            if (left < marginSize) {
              left = marginSize;
            }

            Object.assign(panelStyle, {
              left: "".concat(left, "px"),
              top: "".concat(top, "px"),
              minWidth: "".concat(targetWidth, "px")
            });
          } else {
            if (placement === 'top') {
              panelPlacement = 'top';
              panelStyle.bottom = "".concat(targetHeight, "px");
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top';
                  panelStyle.bottom = "".concat(targetHeight, "px");
                }
              }
            }
          }

          _this6.panelStyle = panelStyle;
          _this6.panelPlacement = panelPlacement;
          return _this6.$nextTick();
        }
      });
    },
    focus: function focus() {
      this.showOptionPanel();
      return this.$nextTick();
    },
    blur: function blur() {
      this.hideOptionPanel();
      return this.$nextTick();
    }
  }
};
exports.default = _default2;