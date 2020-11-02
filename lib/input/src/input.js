"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var browse = _tools.DomTools.browse;
var wheelName = browse.firefox ? 'DOMMouseScroll' : 'mousewheel';
var yearSize = 20;
var monthSize = 20;

function toStringTime(str) {
  if (str) {
    var rest = new Date();
    var h, m, s;

    if (_ctor.default.isDate(str)) {
      h = str.getHours();
      m = str.getMinutes();
      s = str.getSeconds();
    } else {
      str = _ctor.default.toString(str);
      var parses = str.match(/^(\d{1,2})(:(\d{1,2}))?(:(\d{1,2}))?/);

      if (parses) {
        h = parses[1];
        m = parses[3];
        s = parses[5];
      }
    }

    rest.setHours(h || 0);
    rest.setMinutes(m || 0);
    rest.setSeconds(s || 0);
    return rest;
  }

  return new Date('');
}

function renderDefaultInput(h, _vm) {
  var inpAttrs = _vm.inpAttrs,
      inpEvents = _vm.inpEvents,
      value = _vm.value;
  return h('input', {
    ref: 'input',
    class: 'vxe-input--inner',
    domProps: {
      value: value
    },
    attrs: inpAttrs,
    on: inpEvents
  });
}

function renderDateInput(h, _vm) {
  var inpAttrs = _vm.inpAttrs,
      inpEvents = _vm.inpEvents,
      inputValue = _vm.inputValue;
  return h('input', {
    ref: 'input',
    class: 'vxe-input--inner',
    domProps: {
      value: inputValue
    },
    attrs: inpAttrs,
    on: inpEvents
  });
}

function renderDateLabel(h, _vm, item, label) {
  var festivalMethod = _vm.festivalMethod;

  if (festivalMethod) {
    var festivalRest = festivalMethod(_objectSpread({
      type: _vm.datePanelType
    }, item));
    var festivalItem = festivalRest ? _ctor.default.isString(festivalRest) ? {
      label: festivalRest
    } : festivalRest : {};
    var extraItem = festivalItem.extra ? _ctor.default.isString(festivalItem.extra) ? {
      label: festivalItem.extra
    } : festivalItem.extra : null;
    var labels = [h('span', {
      class: ['vxe-input--date-label', {
        'is-notice': festivalItem.notice
      }]
    }, extraItem && extraItem.label ? [h('span', label), h('span', {
      class: ['vxe-input--date-label--extra', extraItem.important ? 'is-important' : '', extraItem.className],
      style: extraItem.style
    }, _ctor.default.toString(extraItem.label))] : label)];
    var festivalLabel = festivalItem.label;

    if (festivalLabel) {
      // 默认最多支持3个节日重叠
      var festivalLabels = _ctor.default.toString(festivalLabel).split(',');

      labels.push(h('span', {
        class: ['vxe-input--date-festival', festivalItem.important ? 'is-important' : '', festivalItem.className],
        style: festivalItem.style
      }, [festivalLabels.length > 1 ? h('span', {
        class: ['vxe-input--date-festival--overlap', "overlap--".concat(festivalLabels.length)]
      }, festivalLabels.map(function (label) {
        return h('span', label.substring(0, 3));
      })) : h('span', {
        class: 'vxe-input--date-festival--label'
      }, festivalLabels[0].substring(0, 3))]));
    }

    return labels;
  }

  return label;
}

function isDateDisabled(_vm, item) {
  var disabledMethod = _vm.disabledMethod || _vm.dateOpts.disabledMethod;
  return disabledMethod && disabledMethod({
    type: _vm.type,
    date: item.date
  });
}

function renderDateDayTable(h, _vm) {
  var datePanelType = _vm.datePanelType,
      dateValue = _vm.dateValue,
      datePanelValue = _vm.datePanelValue,
      dateHeaders = _vm.dateHeaders,
      dayDatas = _vm.dayDatas;
  var matchFormat = 'yyyy-MM-dd';
  return [h('table', {
    class: "vxe-input--date-".concat(datePanelType, "-view"),
    attrs: {
      cellspacing: 0,
      cellpadding: 0,
      border: 0
    }
  }, [h('thead', [h('tr', dateHeaders.map(function (item) {
    return h('th', item.label);
  }))]), h('tbody', dayDatas.map(function (rows) {
    return h('tr', rows.map(function (item) {
      return h('td', {
        class: {
          'is--prev': item.isPrev,
          'is--current': item.isCurrent,
          'is--now': item.isNow,
          'is--next': item.isNext,
          'is--disabled': isDateDisabled(_vm, item),
          'is--selected': _ctor.default.isDateSame(dateValue, item.date, matchFormat),
          'is--hover': _ctor.default.isDateSame(datePanelValue, item.date, matchFormat)
        },
        on: {
          click: function click() {
            return _vm.dateSelectEvent(item);
          },
          mouseenter: function mouseenter() {
            return _vm.dateMouseenterEvent(item);
          }
        }
      }, renderDateLabel(h, _vm, item, item.label));
    }));
  }))])];
}

function renderDateWeekTable(h, _vm) {
  var datePanelType = _vm.datePanelType,
      dateValue = _vm.dateValue,
      datePanelValue = _vm.datePanelValue,
      weekHeaders = _vm.weekHeaders,
      weekDates = _vm.weekDates;
  var matchFormat = 'yyyy-MM-dd';
  return [h('table', {
    class: "vxe-input--date-".concat(datePanelType, "-view"),
    attrs: {
      cellspacing: 0,
      cellpadding: 0,
      border: 0
    }
  }, [h('thead', [h('tr', weekHeaders.map(function (item) {
    return h('th', item.label);
  }))]), h('tbody', weekDates.map(function (rows) {
    var isSelected = rows.some(function (item) {
      return _ctor.default.isDateSame(dateValue, item.date, matchFormat);
    });
    var isHover = rows.some(function (item) {
      return _ctor.default.isDateSame(datePanelValue, item.date, matchFormat);
    });
    return h('tr', rows.map(function (item) {
      return h('td', {
        class: {
          'is--prev': item.isPrev,
          'is--current': item.isCurrent,
          'is--now': item.isNow,
          'is--next': item.isNext,
          'is--disabled': isDateDisabled(_vm, item),
          'is--selected': isSelected,
          'is--hover': isHover
        },
        on: {
          click: function click() {
            return _vm.dateSelectEvent(item);
          },
          mouseenter: function mouseenter() {
            return _vm.dateMouseenterEvent(item);
          }
        }
      }, renderDateLabel(h, _vm, item, item.label));
    }));
  }))])];
}

function renderDateMonthTable(h, _vm) {
  var dateValue = _vm.dateValue,
      datePanelType = _vm.datePanelType,
      monthDatas = _vm.monthDatas,
      datePanelValue = _vm.datePanelValue;
  var matchFormat = 'yyyy-MM';
  return [h('table', {
    class: "vxe-input--date-".concat(datePanelType, "-view"),
    attrs: {
      cellspacing: 0,
      cellpadding: 0,
      border: 0
    }
  }, [h('tbody', monthDatas.map(function (rows) {
    return h('tr', rows.map(function (item) {
      return h('td', {
        class: {
          'is--prev': item.isPrev,
          'is--current': item.isCurrent,
          'is--now': item.isNow,
          'is--next': item.isNext,
          'is--disabled': isDateDisabled(_vm, item),
          'is--selected': _ctor.default.isDateSame(dateValue, item.date, matchFormat),
          'is--hover': _ctor.default.isDateSame(datePanelValue, item.date, matchFormat)
        },
        on: {
          click: function click() {
            return _vm.dateSelectEvent(item);
          },
          mouseenter: function mouseenter() {
            return _vm.dateMouseenterEvent(item);
          }
        }
      }, renderDateLabel(h, _vm, item, _conf.default.i18n("vxe.input.date.months.m".concat(item.month))));
    }));
  }))])];
}

function renderDateYearTable(h, _vm) {
  var dateValue = _vm.dateValue,
      datePanelType = _vm.datePanelType,
      yearDatas = _vm.yearDatas,
      datePanelValue = _vm.datePanelValue;
  var matchFormat = 'yyyy';
  return [h('table', {
    class: "vxe-input--date-".concat(datePanelType, "-view"),
    attrs: {
      cellspacing: 0,
      cellpadding: 0,
      border: 0
    }
  }, [h('tbody', yearDatas.map(function (rows) {
    return h('tr', rows.map(function (item) {
      return h('td', {
        class: {
          'is--disabled': isDateDisabled(_vm, item),
          'is--current': item.isCurrent,
          'is--now': item.isNow,
          'is--selected': _ctor.default.isDateSame(dateValue, item.date, matchFormat),
          'is--hover': _ctor.default.isDateSame(datePanelValue, item.date, matchFormat)
        },
        on: {
          click: function click() {
            return _vm.dateSelectEvent(item);
          },
          mouseenter: function mouseenter() {
            return _vm.dateMouseenterEvent(item);
          }
        }
      }, renderDateLabel(h, _vm, item, item.year));
    }));
  }))])];
}

function renderDateTable(h, _vm) {
  var datePanelType = _vm.datePanelType;

  switch (datePanelType) {
    case 'week':
      return renderDateWeekTable(h, _vm);

    case 'month':
      return renderDateMonthTable(h, _vm);

    case 'year':
      return renderDateYearTable(h, _vm);
  }

  return renderDateDayTable(h, _vm);
}

function renderDatePanel(h, _vm) {
  var datePanelType = _vm.datePanelType,
      selectDatePanelLabel = _vm.selectDatePanelLabel,
      isDisabledPrevDateBtn = _vm.isDisabledPrevDateBtn,
      isDisabledNextDateBtn = _vm.isDisabledNextDateBtn;
  return [h('div', {
    class: 'vxe-input--date-picker-header'
  }, [h('div', {
    class: 'vxe-input--date-picker-type-wrapper'
  }, [datePanelType === 'year' ? h('span', {
    class: 'vxe-input--date-picker-label'
  }, selectDatePanelLabel) : h('span', {
    class: 'vxe-input--date-picker-btn',
    on: {
      click: _vm.dateToggleTypeEvent
    }
  }, selectDatePanelLabel)]), h('div', {
    class: 'vxe-input--date-picker-btn-wrapper'
  }, [h('span', {
    class: ['vxe-input--date-picker-btn vxe-input--date-picker-prev-btn', {
      'is--disabled': isDisabledPrevDateBtn
    }],
    on: {
      click: _vm.datePrevEvent
    }
  }, [h('i', {
    class: 'vxe-icon--caret-left'
  })]), h('span', {
    class: 'vxe-input--date-picker-btn vxe-input--date-picker-current-btn',
    on: {
      click: _vm.dateTodayMonthEvent
    }
  }, [h('i', {
    class: 'vxe-icon--dot'
  })]), h('span', {
    class: ['vxe-input--date-picker-btn vxe-input--date-picker-next-btn', {
      'is--disabled': isDisabledNextDateBtn
    }],
    on: {
      click: _vm.dateNextEvent
    }
  }, [h('i', {
    class: 'vxe-icon--caret-right'
  })])])]), h('div', {
    class: 'vxe-input--date-picker-body'
  }, renderDateTable(h, _vm))];
}

function renderTimePanel(h, _vm) {
  var dateTimeLabel = _vm.dateTimeLabel,
      datetimePanelValue = _vm.datetimePanelValue,
      hourList = _vm.hourList,
      minuteList = _vm.minuteList,
      secondList = _vm.secondList;
  return [h('div', {
    class: 'vxe-input--time-picker-header'
  }, [h('span', {
    class: 'vxe-input--time-picker-title'
  }, dateTimeLabel), h('button', {
    class: 'vxe-input--time-picker-confirm',
    attrs: {
      type: 'button'
    },
    on: {
      click: _vm.dateConfirmEvent
    }
  }, _conf.default.i18n('vxe.button.confirm'))]), h('div', {
    ref: 'timeBody',
    class: 'vxe-input--time-picker-body'
  }, [h('ul', {
    class: 'vxe-input--time-picker-hour-list'
  }, hourList.map(function (item, index) {
    return h('li', {
      key: index,
      class: {
        'is--selected': datetimePanelValue && datetimePanelValue.getHours() === item.value
      },
      on: {
        click: function click(evnt) {
          return _vm.dateHourEvent(evnt, item);
        }
      }
    }, item.label);
  })), h('ul', {
    class: 'vxe-input--time-picker-minute-list'
  }, minuteList.map(function (item, index) {
    return h('li', {
      key: index,
      class: {
        'is--selected': datetimePanelValue && datetimePanelValue.getMinutes() === item.value
      },
      on: {
        click: function click(evnt) {
          return _vm.dateMinuteEvent(evnt, item);
        }
      }
    }, item.label);
  })), h('ul', {
    class: 'vxe-input--time-picker-second-list'
  }, secondList.map(function (item, index) {
    return h('li', {
      key: index,
      class: {
        'is--selected': datetimePanelValue && datetimePanelValue.getSeconds() === item.value
      },
      on: {
        click: function click(evnt) {
          return _vm.dateSecondEvent(evnt, item);
        }
      }
    }, item.label);
  }))])];
}

function renderPanel(h, _vm) {
  var type = _vm.type,
      vSize = _vm.vSize,
      isDatePicker = _vm.isDatePicker,
      transfer = _vm.transfer,
      animatVisible = _vm.animatVisible,
      visiblePanel = _vm.visiblePanel,
      panelPlacement = _vm.panelPlacement,
      panelStyle = _vm.panelStyle;
  var renders = [];

  if (isDatePicker) {
    var _ref;

    if (type === 'datetime') {
      renders.push(h('div', {
        class: 'vxe-input--panel-layout-wrapper'
      }, [h('div', {
        class: 'vxe-input--panel-left-wrapper'
      }, renderDatePanel(h, _vm)), h('div', {
        class: 'vxe-input--panel-right-wrapper'
      }, renderTimePanel(h, _vm))]));
    } else if (type === 'time') {
      renders.push(h('div', {
        class: 'vxe-input--panel-wrapper'
      }, renderTimePanel(h, _vm)));
    } else {
      renders.push(h('div', {
        class: 'vxe-input--panel-wrapper'
      }, renderDatePanel(h, _vm)));
    }

    return h('div', {
      ref: 'panel',
      class: ['vxe-table--ignore-clear vxe-input--panel', "type--".concat(type), (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--transfer', transfer), _defineProperty(_ref, 'animat--leave', animatVisible), _defineProperty(_ref, 'animat--enter', visiblePanel), _ref)],
      attrs: {
        'data-placement': panelPlacement
      },
      style: panelStyle
    }, renders);
  }

  return null;
}

function renderNumberIcon(h, _vm) {
  return h('span', {
    class: 'vxe-input--number-suffix'
  }, [h('span', {
    class: 'vxe-input--number-prev is--prev',
    on: {
      mousedown: _vm.numberMousedownEvent,
      mouseup: _vm.numberStopDown,
      mouseleave: _vm.numberStopDown
    }
  }, [h('i', {
    class: ['vxe-input--number-prev-icon', _conf.default.icon.INPUT_PREV_NUM]
  })]), h('span', {
    class: 'vxe-input--number-next is--next',
    on: {
      mousedown: _vm.numberMousedownEvent,
      mouseup: _vm.numberStopDown,
      mouseleave: _vm.numberStopDown
    }
  }, [h('i', {
    class: ['vxe-input--number-next-icon', _conf.default.icon.INPUT_NEXT_NUM]
  })])]);
}

function renderDatePickerIcon(h, _vm) {
  return h('span', {
    class: 'vxe-input--date-picker-suffix',
    on: {
      click: _vm.datePickerOpenEvent
    }
  }, [h('i', {
    class: ['vxe-input--date-picker-icon', _conf.default.icon.INPUT_DATE]
  })]);
}

function renderSearchIcon(h, _vm) {
  return h('span', {
    class: 'vxe-input--search-suffix',
    on: {
      click: _vm.searchEvent
    }
  }, [h('i', {
    class: ['vxe-input--search-icon', _conf.default.icon.INPUT_SEARCH]
  })]);
}

function renderPasswordIcon(h, _vm) {
  var showPwd = _vm.showPwd;
  return h('span', {
    class: 'vxe-input--password-suffix',
    on: {
      click: _vm.passwordToggleEvent
    }
  }, [h('i', {
    class: ['vxe-input--password-icon', showPwd ? _conf.default.icon.INPUT_SHOW_PWD : _conf.default.icon.INPUT_PWD]
  })]);
}

function rendePrefixIcon(h, _vm) {
  var $scopedSlots = _vm.$scopedSlots,
      prefixIcon = _vm.prefixIcon;
  var icons = [];

  if ($scopedSlots.prefix) {
    icons.push(h('span', {
      class: 'vxe-input--prefix-icon'
    }, $scopedSlots.prefix.call(this, {}, h)));
  } else if (prefixIcon) {
    icons.push(h('i', {
      class: ['vxe-input--prefix-icon', prefixIcon]
    }));
  }

  return icons.length ? h('span', {
    class: 'vxe-input--prefix',
    on: {
      click: _vm.clickPrefixEvent
    }
  }, icons) : null;
}

function renderSuffixIcon(h, _vm) {
  var $scopedSlots = _vm.$scopedSlots,
      value = _vm.value,
      isClearable = _vm.isClearable,
      disabled = _vm.disabled,
      suffixIcon = _vm.suffixIcon;
  var icons = [];

  if ($scopedSlots.suffix) {
    icons.push(h('span', {
      class: 'vxe-input--suffix-icon'
    }, $scopedSlots.suffix.call(this, {}, h)));
  } else if (suffixIcon) {
    icons.push(h('i', {
      class: ['vxe-input--suffix-icon', suffixIcon]
    }));
  }

  if (isClearable) {
    icons.push(h('i', {
      class: ['vxe-input--clear-icon', _conf.default.icon.INPUT_CLEAR]
    }));
  }

  return icons.length ? h('span', {
    class: ['vxe-input--suffix', {
      'is--clear': isClearable && !disabled && !(value === '' || _ctor.default.eqNull(value))
    }],
    on: {
      click: _vm.clickSuffixEvent
    }
  }, icons) : null;
}

function renderExtraSuffixIcon(h, _vm) {
  var controls = _vm.controls,
      isPassword = _vm.isPassword,
      isNumber = _vm.isNumber,
      isDatePicker = _vm.isDatePicker,
      isSearch = _vm.isSearch;
  var icons;

  if (controls) {
    if (isPassword) {
      icons = renderPasswordIcon(h, _vm);
    } else if (isNumber) {
      icons = renderNumberIcon(h, _vm);
    } else if (isDatePicker) {
      icons = renderDatePickerIcon(h, _vm);
    } else if (isSearch) {
      icons = renderSearchIcon(h, _vm);
    }
  }

  return icons ? h('span', {
    class: 'vxe-input--extra-suffix'
  }, [icons]) : null;
}

var _default2 = {
  name: 'VxeInput',
  mixins: [_size.default],
  props: {
    value: [String, Number, Date],
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    clearable: {
      type: Boolean,
      default: function _default() {
        return _conf.default.input.clearable;
      }
    },
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    autocomplete: {
      type: String,
      default: 'off'
    },
    align: String,
    form: String,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.input.size || _conf.default.size;
      }
    },
    // number、integer、float
    min: {
      type: [String, Number],
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    step: [String, Number],
    // number、integer、float、password
    controls: {
      type: Boolean,
      default: function _default() {
        return _conf.default.input.controls;
      }
    },
    // float
    digits: {
      type: [String, Number],
      default: function _default() {
        return _conf.default.input.digits;
      }
    },
    // date、week、month、year
    dateConfig: Object,
    minDate: {
      type: [String, Number, Date],
      default: function _default() {
        return _conf.default.input.minDate;
      }
    },
    maxDate: {
      type: [String, Number, Date],
      default: function _default() {
        return _conf.default.input.maxDate;
      }
    },
    startWeek: {
      type: Number,
      default: function _default() {
        return _conf.default.input.startWeek;
      }
    },
    labelFormat: {
      type: String,
      default: function _default() {
        return _conf.default.input.labelFormat;
      }
    },
    parseFormat: {
      type: String,
      default: function _default() {
        return _conf.default.input.parseFormat;
      }
    },
    valueFormat: {
      type: String,
      default: function _default() {
        return _conf.default.input.valueFormat;
      }
    },
    editable: {
      type: Boolean,
      default: true
    },
    festivalMethod: {
      type: Function,
      default: function _default() {
        return _conf.default.input.festivalMethod;
      }
    },
    disabledMethod: {
      type: Function,
      default: function _default() {
        return _conf.default.input.disabledMethod;
      }
    },
    prefixIcon: String,
    suffixIcon: String,
    placement: String,
    transfer: {
      type: Boolean,
      default: function _default() {
        return _conf.default.input.transfer;
      }
    }
  },
  data: function data() {
    return {
      panelIndex: 0,
      showPwd: false,
      visiblePanel: false,
      animatVisible: false,
      panelStyle: null,
      panelPlacement: null,
      isActivated: false,
      inputValue: '',
      datetimePanelValue: null,
      datePanelValue: null,
      datePanelLabel: '',
      datePanelType: 'day',
      selectMonth: null,
      currentDate: null
    };
  },
  computed: {
    isNumber: function isNumber() {
      return ['number', 'integer', 'float'].indexOf(this.type) > -1;
    },
    isDatePicker: function isDatePicker() {
      return this.hasTime || ['date', 'week', 'month', 'year'].indexOf(this.type) > -1;
    },
    hasTime: function hasTime() {
      var type = this.type;
      return type === 'time' || type === 'datetime';
    },
    isPassword: function isPassword() {
      return this.type === 'password';
    },
    isSearch: function isSearch() {
      return this.type === 'search';
    },
    stepValue: function stepValue() {
      var type = this.type,
          step = this.step;

      if (type === 'integer') {
        return _ctor.default.toInteger(step) || 1;
      } else if (type === 'float') {
        return _ctor.default.toNumber(step) || 1 / Math.pow(10, this.digitsValue);
      }

      return _ctor.default.toNumber(step) || 1;
    },
    digitsValue: function digitsValue() {
      return _ctor.default.toInteger(this.digits) || 1;
    },
    isClearable: function isClearable() {
      return this.clearable && (this.isPassword || this.isNumber || this.isDatePicker || this.type === 'text' || this.type === 'search');
    },
    isDisabledPrevDateBtn: function isDisabledPrevDateBtn() {
      var selectMonth = this.selectMonth,
          dateMinTime = this.dateMinTime;

      if (selectMonth) {
        return selectMonth <= dateMinTime;
      }

      return false;
    },
    isDisabledNextDateBtn: function isDisabledNextDateBtn() {
      var selectMonth = this.selectMonth,
          dateMaxTime = this.dateMaxTime;

      if (selectMonth) {
        return selectMonth >= dateMaxTime;
      }

      return false;
    },
    dateMinTime: function dateMinTime() {
      return this.minDate ? _ctor.default.toStringDate(this.minDate) : null;
    },
    dateMaxTime: function dateMaxTime() {
      return this.maxDate ? _ctor.default.toStringDate(this.maxDate) : null;
    },
    dateValue: function dateValue() {
      var value = this.value,
          isDatePicker = this.isDatePicker,
          type = this.type,
          dateValueFormat = this.dateValueFormat;

      if (value && isDatePicker) {
        if (type === 'time') {
          return toStringTime(value, dateValueFormat);
        }

        return _ctor.default.toStringDate(value, dateValueFormat);
      }

      return null;
    },
    dateTimeLabel: function dateTimeLabel() {
      var datetimePanelValue = this.datetimePanelValue;

      if (datetimePanelValue) {
        return _ctor.default.toDateString(datetimePanelValue, 'HH:mm:ss');
      }

      return '';
    },
    hmsTime: function hmsTime() {
      var dateValue = this.dateValue;
      return dateValue && this.hasTime ? (dateValue.getHours() * 3600 + dateValue.getMinutes() * 60 + dateValue.getSeconds()) * 1000 : 0;
    },
    dateLabelFormat: function dateLabelFormat() {
      if (this.isDatePicker) {
        return this.labelFormat || this.dateOpts.labelFormat || _conf.default.i18n("vxe.input.date.labelFormat.".concat(this.type));
      }

      return null;
    },
    dateValueFormat: function dateValueFormat() {
      var type = this.type;
      return type === 'time' ? 'HH:mm:ss' : this.valueFormat || this.dateOpts.valueFormat || (type === 'datetime' ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd');
    },
    selectDatePanelLabel: function selectDatePanelLabel() {
      if (this.isDatePicker) {
        var datePanelType = this.datePanelType,
            selectMonth = this.selectMonth,
            yearList = this.yearList;
        var year = '';
        var month;

        if (selectMonth) {
          year = selectMonth.getFullYear();
          month = selectMonth.getMonth() + 1;
        }

        if (datePanelType === 'month') {
          return _ctor.default.template(_conf.default.i18n('vxe.input.date.monthLabel'), [year]);
        } else if (datePanelType === 'year') {
          return yearList.length ? "".concat(yearList[0].year, " - ").concat(yearList[yearList.length - 1].year) : '';
        }

        return _ctor.default.template(_conf.default.i18n('vxe.input.date.dayLabel'), [year, month ? _conf.default.i18n("vxe.input.date.m".concat(month)) : '-']);
      }

      return '';
    },
    weekDatas: function weekDatas() {
      var weeks = [];

      if (this.isDatePicker) {
        var sWeek = _ctor.default.toNumber(_ctor.default.isNumber(this.startWeek) ? this.startWeek : this.dateOpts.startWeek);

        weeks.push(sWeek);

        for (var index = 0; index < 6; index++) {
          if (sWeek >= 6) {
            sWeek = 0;
          } else {
            sWeek++;
          }

          weeks.push(sWeek);
        }
      }

      return weeks;
    },
    dateHeaders: function dateHeaders() {
      if (this.isDatePicker) {
        return this.weekDatas.map(function (day) {
          return {
            value: day,
            label: _conf.default.i18n("vxe.input.date.weeks.w".concat(day))
          };
        });
      }

      return [];
    },
    weekHeaders: function weekHeaders() {
      if (this.isDatePicker) {
        return [{
          label: _conf.default.i18n('vxe.input.date.weeks.w')
        }].concat(this.dateHeaders);
      }

      return [];
    },
    yearList: function yearList() {
      var selectMonth = this.selectMonth,
          currentDate = this.currentDate;
      var months = [];

      if (selectMonth && currentDate) {
        var currFullYear = currentDate.getFullYear();
        var startYear = new Date(('' + selectMonth.getFullYear()).replace(/\d{1}$/, '0'), 0, 1);

        for (var index = -10; index < yearSize - 10; index++) {
          var date = _ctor.default.getWhatYear(startYear, index, 'first');

          var itemFullYear = date.getFullYear();
          months.push({
            date: date,
            isCurrent: true,
            isNow: currFullYear === itemFullYear,
            year: itemFullYear
          });
        }
      }

      return months;
    },
    yearDatas: function yearDatas() {
      return _ctor.default.chunk(this.yearList, 4);
    },
    monthList: function monthList() {
      var selectMonth = this.selectMonth,
          currentDate = this.currentDate;
      var months = [];

      if (selectMonth && currentDate) {
        var currFullYear = currentDate.getFullYear();
        var currMonth = currentDate.getMonth();

        var selFullYear = _ctor.default.getWhatYear(selectMonth, 0, 'first').getFullYear();

        for (var index = -4; index < monthSize - 4; index++) {
          var date = _ctor.default.getWhatYear(selectMonth, 0, index);

          var itemFullYear = date.getFullYear();
          var itemMonth = date.getMonth();
          var isPrev = itemFullYear < selFullYear;
          months.push({
            date: date,
            isPrev: isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth,
            isNext: !isPrev && itemFullYear > selFullYear,
            month: itemMonth
          });
        }
      }

      return months;
    },
    monthDatas: function monthDatas() {
      return _ctor.default.chunk(this.monthList, 4);
    },
    dayList: function dayList() {
      var weekDatas = this.weekDatas,
          selectMonth = this.selectMonth,
          currentDate = this.currentDate,
          hmsTime = this.hmsTime;
      var days = [];

      if (selectMonth && currentDate) {
        var currFullYear = currentDate.getFullYear();
        var currMonth = currentDate.getMonth();
        var currDate = currentDate.getDate();
        var selFullYear = selectMonth.getFullYear();
        var selMonth = selectMonth.getMonth();
        var selDay = selectMonth.getDay();
        var prevOffsetDate = -weekDatas.indexOf(selDay);
        var startDate = new Date(_ctor.default.getWhatDay(selectMonth, prevOffsetDate).getTime() + hmsTime);

        for (var index = 0; index < 42; index++) {
          var date = _ctor.default.getWhatDay(startDate, index);

          var itemFullYear = date.getFullYear();
          var itemMonth = date.getMonth();
          var itemDate = date.getDate();
          var isPrev = date < selectMonth;
          days.push({
            date: date,
            isPrev: isPrev,
            isCurrent: itemFullYear === selFullYear && itemMonth === selMonth,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth && itemDate === currDate,
            isNext: !isPrev && selMonth !== itemMonth,
            label: itemDate
          });
        }
      }

      return days;
    },
    dayDatas: function dayDatas() {
      return _ctor.default.chunk(this.dayList, 7);
    },
    weekDates: function weekDates() {
      return this.dayDatas.map(function (list) {
        var firstItem = list[0];
        var item = {
          date: firstItem.date,
          isWeekNumber: true,
          isPrev: false,
          isCurrent: false,
          isNow: false,
          isNext: false,
          label: _ctor.default.getYearWeek(firstItem.date)
        };
        return [item].concat(list);
      });
    },
    dateOpts: function dateOpts() {
      return Object.assign({}, this.dateConfig, _conf.default.input.dateConfig);
    },
    hourList: function hourList() {
      var list = [];

      if (this.hasTime) {
        for (var index = 0; index < 24; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, 0)
          });
        }
      }

      return list;
    },
    minuteList: function minuteList() {
      var list = [];

      if (this.hasTime) {
        for (var index = 0; index < 60; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, 0)
          });
        }
      }

      return list;
    },
    secondList: function secondList() {
      return this.minuteList;
    },
    inpAttrs: function inpAttrs() {
      var isDatePicker = this.isDatePicker,
          isNumber = this.isNumber,
          isPassword = this.isPassword,
          type = this.type,
          name = this.name,
          placeholder = this.placeholder,
          readonly = this.readonly,
          disabled = this.disabled,
          maxlength = this.maxlength,
          form = this.form,
          autocomplete = this.autocomplete,
          showPwd = this.showPwd,
          editable = this.editable;
      var inputType = type;

      if (isDatePicker || isNumber || isPassword && showPwd || type === 'number') {
        inputType = 'text';
      }

      var attrs = {
        name: name,
        form: form,
        type: inputType,
        placeholder: placeholder,
        maxlength: isNumber && !_ctor.default.toNumber(maxlength) ? 16 : maxlength,
        // 数值最大长度限制 16 位，包含小数
        readonly: readonly || type === 'week' || !editable || this.dateOpts.editable === false,
        disabled: disabled,
        autocomplete: autocomplete
      };

      if (placeholder) {
        attrs.placeholder = _tools.UtilTools.getFuncText(placeholder);
      }

      return attrs;
    },
    inpEvents: function inpEvents() {
      var _this = this;

      var evnts = {};

      _ctor.default.each(this.$listeners, function (cb, name) {
        if (['change', 'clear', 'prefix-click', 'suffix-click'].indexOf(name) === -1) {
          evnts[name] = _this.triggerEvent;
        }
      });

      if (this.isNumber) {
        evnts.keydown = this.keydownEvent;
        evnts[wheelName] = this.mousewheelEvent;
      } else if (this.isDatePicker) {
        evnts.click = this.clickEvent;
      }

      evnts.input = this.inputEvent;
      evnts.focus = this.focusEvent;
      evnts.blur = this.blurEvent;
      return evnts;
    }
  },
  watch: {
    value: function value() {
      this.changeValue();
    },
    dateLabelFormat: function dateLabelFormat() {
      this.dateParseValue(this.datePanelValue);
      this.inputValue = this.datePanelLabel;
    }
  },
  created: function created() {
    this.initValue();

    _tools.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  mounted: function mounted() {
    if (this.dateConfig) {
      _tools.UtilTools.warn('vxe.error.removeProp', ['date-config']);
    }

    if (this.isDatePicker) {
      if (this.transfer) {
        document.body.appendChild(this.$refs.panel);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    var panelElem = this.$refs.panel;

    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem);
    }
  },
  destroyed: function destroyed() {
    this.numberStopDown();

    _tools.GlobalEvent.off(this, 'mousewheel');

    _tools.GlobalEvent.off(this, 'mousedown');

    _tools.GlobalEvent.off(this, 'keydown');

    _tools.GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref2;

    var controls = this.controls,
        isDatePicker = this.isDatePicker,
        visiblePanel = this.visiblePanel,
        isActivated = this.isActivated,
        vSize = this.vSize,
        type = this.type,
        align = this.align,
        readonly = this.readonly,
        disabled = this.disabled;
    var childs = [];
    var prefix = rendePrefixIcon(h, this);
    var suffix = renderSuffixIcon(h, this); // 前缀图标

    if (prefix) {
      childs.push(prefix);
    } // 输入框


    childs.push(isDatePicker ? renderDateInput(h, this) : renderDefaultInput(h, this)); // 后缀图标

    if (suffix) {
      childs.push(suffix);
    } // 特殊功能图标


    childs.push(renderExtraSuffixIcon(h, this)); // 面板容器

    if (isDatePicker) {
      childs.push(renderPanel(h, this));
    }

    return h('div', {
      class: ['vxe-input', "type--".concat(type), (_ref2 = {}, _defineProperty(_ref2, "size--".concat(vSize), vSize), _defineProperty(_ref2, "is--".concat(align), align), _defineProperty(_ref2, 'is--controls', controls), _defineProperty(_ref2, 'is--prefix', !!prefix), _defineProperty(_ref2, 'is--suffix', !!suffix), _defineProperty(_ref2, 'is--readonly', readonly), _defineProperty(_ref2, 'is--visivle', visiblePanel), _defineProperty(_ref2, 'is--disabled', disabled), _defineProperty(_ref2, 'is--active', isActivated), _ref2)]
    }, childs);
  },
  methods: {
    focus: function focus() {
      this.$refs.input.focus();
      return this.$nextTick();
    },
    blur: function blur() {
      this.$refs.input.blur();
      return this.$nextTick();
    },
    triggerEvent: function triggerEvent(evnt) {
      var $refs = this.$refs,
          value = this.value;
      this.$emit(evnt.type, {
        $panel: $refs.panel,
        value: value,
        $event: evnt
      });
    },
    emitUpdate: function emitUpdate(value, evnt) {
      if (_ctor.default.toString(this.value) !== value) {
        this.$emit('input', value);
        this.$emit('change', {
          value: value,
          $event: evnt
        });
      }
    },
    inputEvent: function inputEvent(evnt) {
      var isDatePicker = this.isDatePicker;
      var value = evnt.target.value;
      this.inputValue = value;

      if (!isDatePicker) {
        this.emitUpdate(value, evnt);
      }
    },
    focusEvent: function focusEvent(evnt) {
      this.isActivated = true;
      this.triggerEvent(evnt);
    },
    blurEvent: function blurEvent(evnt) {
      this.afterCheckValue();
      this.triggerEvent(evnt);
    },
    keydownEvent: function keydownEvent(evnt) {
      if (this.isNumber) {
        var isCtrlKey = evnt.ctrlKey;
        var isShiftKey = evnt.shiftKey;
        var isAltKey = evnt.altKey;
        var keyCode = evnt.keyCode;

        if (!isCtrlKey && !isShiftKey && !isAltKey && (keyCode === 32 || keyCode >= 65 && keyCode <= 90)) {
          evnt.preventDefault();
        }

        this.numberKeydownEvent(evnt);
      }

      this.triggerEvent(evnt);
    },
    mousewheelEvent: function mousewheelEvent(evnt) {
      if (this.isNumber && this.controls) {
        if (this.isActivated) {
          var delta = -evnt.wheelDelta || evnt.detail;

          if (delta > 0) {
            this.numberNextEvent(evnt);
          } else if (delta < 0) {
            this.numberPrevEvent(evnt);
          }

          evnt.preventDefault();
        }
      }
    },
    clickEvent: function clickEvent(evnt) {
      var isDatePicker = this.isDatePicker;

      if (isDatePicker) {
        this.datePickerOpenEvent(evnt);
      }

      this.triggerEvent(evnt);
    },
    clickPrefixEvent: function clickPrefixEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          value = this.value;

      if (!disabled) {
        this.$emit('prefix-click', {
          $panel: $refs.panel,
          value: value,
          $event: evnt
        });
      }
    },
    clickSuffixEvent: function clickSuffixEvent(evnt) {
      var $refs = this.$refs,
          disabled = this.disabled,
          value = this.value;

      if (!disabled) {
        if (_tools.DomTools.hasClass(evnt.currentTarget, 'is--clear')) {
          this.emitUpdate('', evnt);
          this.clearValueEvent(evnt, '');
        } else {
          this.$emit('suffix-click', {
            $panel: $refs.panel,
            value: value,
            $event: evnt
          });
        }
      }
    },
    clearValueEvent: function clearValueEvent(evnt, value) {
      var $refs = this.$refs,
          type = this.type,
          isNumber = this.isNumber;

      if (this.isDatePicker) {
        this.hidePanel();
      }

      if (isNumber || ['text', 'password'].indexOf(type) > -1) {
        this.focus();
      }

      this.$emit('clear', {
        $panel: $refs.panel,
        value: value,
        $event: evnt
      });
    },

    /**
     * 检查初始值
     */
    initValue: function initValue() {
      var type = this.type,
          isDatePicker = this.isDatePicker,
          value = this.value,
          digitsValue = this.digitsValue;

      if (isDatePicker) {
        this.changeValue();
      } else if (type === 'float') {
        if (value) {
          var validValue = _ctor.default.toFixed(_ctor.default.floor(value, digitsValue), digitsValue);

          if (value !== validValue) {
            this.emitUpdate(validValue, {
              type: 'init'
            });
          }
        }
      }
    },

    /**
     * 值变化时处理
     */
    changeValue: function changeValue() {
      if (this.isDatePicker) {
        this.dateParseValue(this.value);
        this.inputValue = this.datePanelLabel;
      }
    },
    afterCheckValue: function afterCheckValue() {
      var type = this.type,
          inpAttrs = this.inpAttrs,
          value = this.value,
          inputValue = this.inputValue,
          isDatePicker = this.isDatePicker,
          isNumber = this.isNumber,
          datetimePanelValue = this.datetimePanelValue,
          dateLabelFormat = this.dateLabelFormat,
          min = this.min,
          max = this.max,
          digitsValue = this.digitsValue;

      if (!inpAttrs.readonly) {
        if (isNumber) {
          if (value) {
            var inpVal = type === 'integer' ? _ctor.default.toInteger(value) : _ctor.default.toNumber(value);

            if (!this.vaildMinNum(inpVal)) {
              inpVal = min;
            } else if (!this.vaildMaxNum(inpVal)) {
              inpVal = max;
            }

            this.emitUpdate(type === 'float' ? _ctor.default.toFixed(_ctor.default.floor(inpVal, digitsValue), digitsValue) : _ctor.default.toString(inpVal), {
              type: 'check'
            });
          }
        } else if (isDatePicker) {
          var _inpVal = inputValue;

          if (_inpVal) {
            if (type === 'time') {
              _inpVal = toStringTime(_inpVal, dateLabelFormat);
            } else {
              _inpVal = _ctor.default.toStringDate(_inpVal, dateLabelFormat);
            }

            if (_ctor.default.isValidDate(_inpVal)) {
              if (type === 'time') {
                _inpVal = _ctor.default.toDateString(_inpVal, dateLabelFormat);

                if (value !== _inpVal) {
                  this.emitUpdate(_inpVal, {
                    type: 'check'
                  });
                }

                this.inputValue = _inpVal;
              } else {
                if (!_ctor.default.isDateSame(value, _inpVal, dateLabelFormat)) {
                  if (type === 'datetime') {
                    datetimePanelValue.setHours(_inpVal.getHours());
                    datetimePanelValue.setMinutes(_inpVal.getMinutes());
                    datetimePanelValue.setSeconds(_inpVal.getSeconds());
                  }

                  this.dateChange(_inpVal);
                } else {
                  this.inputValue = _ctor.default.toDateString(value, dateLabelFormat);
                }
              }
            } else {
              this.dateRevert();
            }
          } else {
            this.emitUpdate('', {
              type: 'check'
            });
          }
        }
      }
    },
    // 密码
    passwordToggleEvent: function passwordToggleEvent(evnt) {
      var disabled = this.disabled,
          readonly = this.readonly,
          showPwd = this.showPwd;

      if (!disabled && !readonly) {
        this.showPwd = !showPwd;
      }

      this.$emit('toggle-visible', {
        visible: this.showPwd,
        $event: evnt
      });
    },
    // 密码
    // 搜索
    searchEvent: function searchEvent(evnt) {
      this.$emit('search-click', {
        $event: evnt
      });
    },
    // 搜索
    // 数值
    vaildMinNum: function vaildMinNum(num) {
      return this.min === null || num >= _ctor.default.toNumber(this.min);
    },
    vaildMaxNum: function vaildMaxNum(num) {
      return this.max === null || num <= _ctor.default.toNumber(this.max);
    },
    numberStopDown: function numberStopDown() {
      clearTimeout(this.downbumTimeout);
    },
    numberDownPrevEvent: function numberDownPrevEvent(evnt) {
      var _this2 = this;

      this.downbumTimeout = setTimeout(function () {
        _this2.numberPrevEvent(evnt);

        _this2.numberDownPrevEvent(evnt);
      }, 60);
    },
    numberDownNextEvent: function numberDownNextEvent(evnt) {
      var _this3 = this;

      this.downbumTimeout = setTimeout(function () {
        _this3.numberNextEvent(evnt);

        _this3.numberDownNextEvent(evnt);
      }, 60);
    },
    numberKeydownEvent: function numberKeydownEvent(evnt) {
      var keyCode = evnt.keyCode;
      var isUpArrow = keyCode === 38;
      var isDwArrow = keyCode === 40;

      if (isUpArrow || isDwArrow) {
        evnt.preventDefault();

        if (isUpArrow) {
          this.numberPrevEvent(evnt);
        } else {
          this.numberNextEvent(evnt);
        }
      }
    },
    numberMousedownEvent: function numberMousedownEvent(evnt) {
      var _this4 = this;

      this.numberStopDown();

      if (evnt.button === 0) {
        var isPrevNumber = _tools.DomTools.hasClass(evnt.currentTarget, 'is--prev');

        if (isPrevNumber) {
          this.numberPrevEvent(evnt);
        } else {
          this.numberNextEvent(evnt);
        }

        this.downbumTimeout = setTimeout(function () {
          if (isPrevNumber) {
            _this4.numberDownPrevEvent(evnt);
          } else {
            _this4.numberDownNextEvent(evnt);
          }
        }, 500);
      }
    },
    numberPrevEvent: function numberPrevEvent(evnt) {
      var disabled = this.disabled,
          readonly = this.readonly;
      clearTimeout(this.downbumTimeout);

      if (!disabled && !readonly) {
        this.numberChange(true, evnt);
      }

      this.$emit('prev-number', {
        $event: evnt
      });
    },
    numberNextEvent: function numberNextEvent(evnt) {
      var disabled = this.disabled,
          readonly = this.readonly;
      clearTimeout(this.downbumTimeout);

      if (!disabled && !readonly) {
        this.numberChange(false, evnt);
      }

      this.$emit('next-number', {
        $event: evnt
      });
    },
    numberChange: function numberChange(isPlus, evnt) {
      var type = this.type,
          digitsValue = this.digitsValue,
          value = this.value,
          stepValue = this.stepValue;
      var inputValue = type === 'integer' ? _ctor.default.toInteger(value) : _ctor.default.toNumber(value);
      var newValue = isPlus ? _ctor.default.add(inputValue, stepValue) : _ctor.default.subtract(inputValue, stepValue);

      if (this.vaildMinNum(newValue) && this.vaildMaxNum(newValue)) {
        this.emitUpdate(type === 'float' ? _ctor.default.toFixed(_ctor.default.floor(newValue, digitsValue), digitsValue) : _ctor.default.toString(newValue), evnt);
      }
    },
    // 数值
    // 日期
    datePickerOpenEvent: function datePickerOpenEvent(evnt) {
      evnt.preventDefault();
      this.showPanel();
    },
    dateMonthHandle: function dateMonthHandle(date, offsetMonth) {
      this.selectMonth = _ctor.default.getWhatMonth(date, offsetMonth, 'first');
    },
    dateNowHandle: function dateNowHandle() {
      var currentDate = _ctor.default.getWhatDay(Date.now(), 0, 'first');

      this.currentDate = currentDate;
      this.dateMonthHandle(currentDate, 0);
    },
    dateToggleTypeEvent: function dateToggleTypeEvent() {
      var datePanelType = this.datePanelType;

      if (datePanelType === 'month') {
        datePanelType = 'year';
      } else {
        datePanelType = 'month';
      }

      this.datePanelType = datePanelType;
    },
    datePrevEvent: function datePrevEvent(evnt) {
      var isDisabledPrevDateBtn = this.isDisabledPrevDateBtn,
          type = this.type,
          datePanelType = this.datePanelType;

      if (!isDisabledPrevDateBtn) {
        if (type === 'year') {
          this.selectMonth = _ctor.default.getWhatYear(this.selectMonth, -yearSize, 'first');
        } else if (type === 'month') {
          if (datePanelType === 'year') {
            this.selectMonth = _ctor.default.getWhatYear(this.selectMonth, -yearSize, 'first');
          } else {
            this.selectMonth = _ctor.default.getWhatYear(this.selectMonth, -1, 'first');
          }
        } else {
          if (datePanelType === 'year') {
            this.selectMonth = _ctor.default.getWhatYear(this.selectMonth, -yearSize, 'first');
          } else if (datePanelType === 'month') {
            this.selectMonth = _ctor.default.getWhatYear(this.selectMonth, -1, 'first');
          } else {
            this.selectMonth = _ctor.default.getWhatMonth(this.selectMonth, -1, 'first');
          }
        }

        this.$emit('date-prev', {
          type: type,
          $event: evnt
        });
      }
    },
    dateTodayMonthEvent: function dateTodayMonthEvent(evnt) {
      this.dateNowHandle();
      this.dateChange(this.currentDate);
      this.hidePanel();
      this.$emit('date-today', {
        type: this.type,
        $event: evnt
      });
    },
    dateNextEvent: function dateNextEvent(evnt) {
      var isDisabledNextDateBtn = this.isDisabledNextDateBtn,
          type = this.type,
          datePanelType = this.datePanelType;

      if (!isDisabledNextDateBtn) {
        if (type === 'year') {
          this.selectMonth = _ctor.default.getWhatYear(this.selectMonth, yearSize, 'first');
        } else if (type === 'month') {
          if (datePanelType === 'year') {
            this.selectMonth = _ctor.default.getWhatYear(this.selectMonth, yearSize, 'first');
          } else {
            this.selectMonth = _ctor.default.getWhatYear(this.selectMonth, 1, 'first');
          }
        } else {
          if (datePanelType === 'year') {
            this.selectMonth = _ctor.default.getWhatYear(this.selectMonth, yearSize, 'first');
          } else if (datePanelType === 'month') {
            this.selectMonth = _ctor.default.getWhatYear(this.selectMonth, 1, 'first');
          } else {
            this.selectMonth = _ctor.default.getWhatMonth(this.selectMonth, 1, 'first');
          }
        }

        this.$emit('date-prev', {
          type: type,
          $event: evnt
        });
      }
    },
    dateSelectEvent: function dateSelectEvent(item) {
      if (!isDateDisabled(this, item)) {
        this.dateSelectItem(item.date);
      }
    },
    dateSelectItem: function dateSelectItem(date) {
      var type = this.type,
          datePanelType = this.datePanelType;

      if (type === 'month') {
        if (datePanelType === 'year') {
          this.datePanelType = 'month';
          this.dateCheckMonth(date);
        } else {
          this.dateChange(date);
          this.hidePanel();
        }
      } else if (type === 'year') {
        this.hidePanel();
        this.dateChange(date);
      } else {
        if (datePanelType === 'month') {
          this.datePanelType = type === 'week' ? type : 'day';
          this.dateCheckMonth(date);
        } else if (datePanelType === 'year') {
          this.datePanelType = 'month';
          this.dateCheckMonth(date);
        } else {
          this.dateChange(date);
          this.hidePanel();
        }
      }
    },
    dateMouseenterEvent: function dateMouseenterEvent(item) {
      if (!isDateDisabled(this, item)) {
        var datePanelType = this.datePanelType;

        if (datePanelType === 'month') {
          this.dateMoveMonth(item.date);
        } else if (datePanelType === 'year') {
          this.dateMoveYear(item.date);
        } else {
          this.dateMoveDay(item.date);
        }
      }
    },
    dateHourEvent: function dateHourEvent(evnt, item) {
      this.datetimePanelValue.setHours(item.value);
      this.dateTimeChangeEvent(evnt);
    },
    dateConfirmEvent: function dateConfirmEvent() {
      this.dateChange(this.dateValue || this.currentDate);
      this.hidePanel();
    },
    dateMinuteEvent: function dateMinuteEvent(evnt, item) {
      this.datetimePanelValue.setMinutes(item.value);
      this.dateTimeChangeEvent(evnt);
    },
    dateSecondEvent: function dateSecondEvent(evnt, item) {
      this.datetimePanelValue.setSeconds(item.value);
      this.dateTimeChangeEvent(evnt);
    },
    dateTimeChangeEvent: function dateTimeChangeEvent(evnt) {
      this.datetimePanelValue = new Date(this.datetimePanelValue.getTime());
      this.updateTimePos(evnt.currentTarget);
    },
    updateTimePos: function updateTimePos(liElem) {
      if (liElem) {
        var height = liElem.offsetHeight;
        liElem.parentNode.scrollTop = liElem.offsetTop - height * 4;
      }
    },
    dateMoveDay: function dateMoveDay(offsetDay) {
      if (!isDateDisabled(this, {
        date: offsetDay
      })) {
        if (!this.dayList.some(function (item) {
          return _ctor.default.isDateSame(item.date, offsetDay, 'yyyy-MM-dd');
        })) {
          this.dateCheckMonth(offsetDay);
        }

        this.dateParseValue(offsetDay);
      }
    },
    dateMoveMonth: function dateMoveMonth(offsetMonth) {
      if (!isDateDisabled(this, {
        date: offsetMonth
      })) {
        if (!this.monthList.some(function (item) {
          return _ctor.default.isDateSame(item.date, offsetMonth, 'yyyy-MM');
        })) {
          this.dateCheckMonth(offsetMonth);
        }

        this.dateParseValue(offsetMonth);
      }
    },
    dateMoveYear: function dateMoveYear(offsetYear) {
      if (!isDateDisabled(this, {
        date: offsetYear
      })) {
        if (!this.yearList.some(function (item) {
          return _ctor.default.isDateSame(item.date, offsetYear, 'yyyy');
        })) {
          this.dateCheckMonth(offsetYear);
        }

        this.dateParseValue(offsetYear);
      }
    },
    dateParseValue: function dateParseValue(date) {
      var type = this.type,
          dateLabelFormat = this.dateLabelFormat,
          parseFormat = this.parseFormat;
      var dValue = null;
      var dLabel = '';

      if (date) {
        if (type === 'time') {
          dValue = toStringTime(date, parseFormat || this.dateOpts.parseFormat);
        } else {
          dValue = _ctor.default.toStringDate(date, parseFormat || this.dateOpts.parseFormat);
        }
      }

      if (_ctor.default.isValidDate(dValue)) {
        dLabel = _ctor.default.toDateString(dValue, dateLabelFormat);
      } else {
        dValue = null;
      }

      this.datePanelValue = dValue;
      this.datePanelLabel = dLabel;
    },
    dateOffsetEvent: function dateOffsetEvent(evnt) {
      var isActivated = this.isActivated,
          datePanelValue = this.datePanelValue,
          datePanelType = this.datePanelType;

      if (isActivated) {
        evnt.preventDefault();
        var keyCode = evnt.keyCode;
        var isLeftArrow = keyCode === 37;
        var isUpArrow = keyCode === 38;
        var isRightArrow = keyCode === 39;
        var isDwArrow = keyCode === 40;

        if (datePanelType === 'year') {
          var offsetYear = _ctor.default.getWhatYear(datePanelValue || Date.now(), 0, 'first');

          if (isLeftArrow) {
            offsetYear = _ctor.default.getWhatYear(offsetYear, -1);
          } else if (isUpArrow) {
            offsetYear = _ctor.default.getWhatYear(offsetYear, -4);
          } else if (isRightArrow) {
            offsetYear = _ctor.default.getWhatYear(offsetYear, 1);
          } else if (isDwArrow) {
            offsetYear = _ctor.default.getWhatYear(offsetYear, 4);
          }

          this.dateMoveYear(offsetYear);
        } else if (datePanelType === 'month') {
          var offsetMonth = _ctor.default.getWhatMonth(datePanelValue || Date.now(), 0, 'first');

          if (isLeftArrow) {
            offsetMonth = _ctor.default.getWhatMonth(offsetMonth, -1);
          } else if (isUpArrow) {
            offsetMonth = _ctor.default.getWhatMonth(offsetMonth, -4);
          } else if (isRightArrow) {
            offsetMonth = _ctor.default.getWhatMonth(offsetMonth, 1);
          } else if (isDwArrow) {
            offsetMonth = _ctor.default.getWhatMonth(offsetMonth, 4);
          }

          this.dateMoveMonth(offsetMonth);
        } else {
          var offsetDay = datePanelValue || _ctor.default.getWhatDay(Date.now(), 0, 'first');

          if (isLeftArrow) {
            offsetDay = _ctor.default.getWhatDay(offsetDay, -1);
          } else if (isUpArrow) {
            offsetDay = _ctor.default.getWhatWeek(offsetDay, -1);
          } else if (isRightArrow) {
            offsetDay = _ctor.default.getWhatDay(offsetDay, 1);
          } else if (isDwArrow) {
            offsetDay = _ctor.default.getWhatWeek(offsetDay, 1);
          }

          this.dateMoveDay(offsetDay);
        }
      }
    },
    datePgOffsetEvent: function datePgOffsetEvent(evnt) {
      var isActivated = this.isActivated;

      if (isActivated) {
        var isPgUp = evnt.keyCode === 33;
        evnt.preventDefault();

        if (isPgUp) {
          this.datePrevEvent(evnt);
        } else {
          this.dateNextEvent(evnt);
        }
      }
    },
    dateChange: function dateChange(date) {
      var value = this.value,
          datetimePanelValue = this.datetimePanelValue,
          dateValueFormat = this.dateValueFormat;

      if (this.type === 'week') {
        var sWeek = _ctor.default.toNumber(_ctor.default.isNumber(this.startWeek) ? this.startWeek : this.dateOpts.startWeek);

        date = _ctor.default.getWhatWeek(date, 0, sWeek);
      } else if (this.hasTime) {
        date.setHours(datetimePanelValue.getHours());
        date.setMinutes(datetimePanelValue.getMinutes());
        date.setSeconds(datetimePanelValue.getSeconds());
      }

      var inpVal = _ctor.default.toDateString(date, dateValueFormat);

      this.dateCheckMonth(date);

      if (!_ctor.default.isEqual(value, inpVal)) {
        this.emitUpdate(inpVal, {
          type: 'update'
        });
      }
    },
    dateCheckMonth: function dateCheckMonth(date) {
      var month = _ctor.default.getWhatMonth(date, 0, 'first');

      if (!_ctor.default.isEqual(month, this.selectMonth)) {
        this.selectMonth = month;
      }
    },
    dateOpenPanel: function dateOpenPanel() {
      var _this5 = this;

      var type = this.type,
          dateValue = this.dateValue;

      if (['year', 'month', 'week'].indexOf(type) > -1) {
        this.datePanelType = type;
      } else {
        this.datePanelType = 'day';
      }

      this.currentDate = _ctor.default.getWhatDay(Date.now(), 0, 'first');

      if (dateValue) {
        this.dateMonthHandle(dateValue, 0);
        this.dateParseValue(dateValue);
      } else {
        this.dateNowHandle();
      }

      if (this.hasTime) {
        this.datetimePanelValue = this.datePanelValue || _ctor.default.getWhatDay(Date.now(), 0, 'first');
        this.$nextTick(function () {
          _ctor.default.arrayEach(_this5.$refs.timeBody.querySelectorAll('li.is--selected'), _this5.updateTimePos);
        });
      }
    },
    dateRevert: function dateRevert() {
      this.inputValue = this.datePanelLabel;
    },
    // 日期
    // 弹出面板
    updateZindex: function updateZindex() {
      if (this.panelIndex < _tools.UtilTools.getLastZIndex()) {
        this.panelIndex = _tools.UtilTools.nextZIndex();
      }
    },
    showPanel: function showPanel() {
      var _this6 = this;

      var disabled = this.disabled,
          visiblePanel = this.visiblePanel,
          isDatePicker = this.isDatePicker;

      if (!disabled && !visiblePanel) {
        clearTimeout(this.hidePanelTimeout);
        this.isActivated = true;
        this.animatVisible = true;

        if (isDatePicker) {
          this.dateOpenPanel();
        }

        setTimeout(function () {
          _this6.visiblePanel = true;
        }, 10);
        this.updateZindex();
        this.updatePlacement();
      }
    },
    hidePanel: function hidePanel() {
      var _this7 = this;

      this.visiblePanel = false;
      this.hidePanelTimeout = setTimeout(function () {
        _this7.animatVisible = false;
      }, 350);
    },
    updatePlacement: function updatePlacement() {
      var _this8 = this;

      return this.$nextTick().then(function () {
        var $refs = _this8.$refs,
            transfer = _this8.transfer,
            placement = _this8.placement,
            panelIndex = _this8.panelIndex;
        var targetElem = $refs.input;
        var panelElem = $refs.panel;

        if (targetElem && panelElem) {
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

          _this8.panelStyle = panelStyle;
          _this8.panelPlacement = panelPlacement;
          return _this8.$nextTick();
        }
      });
    },
    // 弹出面板
    // 全局事件
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var $refs = this.$refs,
          $el = this.$el,
          disabled = this.disabled,
          visiblePanel = this.visiblePanel,
          isActivated = this.isActivated;

      if (!disabled && isActivated) {
        this.isActivated = _tools.DomTools.getEventTargetNode(evnt, $el).flag || _tools.DomTools.getEventTargetNode(evnt, $refs.panel).flag;

        if (!this.isActivated) {
          // 如果是日期类型
          if (this.isDatePicker) {
            if (visiblePanel) {
              this.hidePanel();
              this.afterCheckValue();
            }
          } else {
            this.afterCheckValue();
          }
        }
      }
    },
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var isDatePicker = this.isDatePicker,
          visiblePanel = this.visiblePanel,
          clearable = this.clearable,
          disabled = this.disabled;

      if (!disabled) {
        var keyCode = evnt.keyCode;
        var isTab = keyCode === 9;
        var isDel = keyCode === 46;
        var isEsc = keyCode === 27;
        var isEnter = keyCode === 13;
        var isLeftArrow = keyCode === 37;
        var isUpArrow = keyCode === 38;
        var isRightArrow = keyCode === 39;
        var isDwArrow = keyCode === 40;
        var isPgUp = keyCode === 33;
        var isPgDn = keyCode === 34;
        var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
        var isActivated = this.isActivated;

        if (isTab) {
          if (isActivated) {
            this.afterCheckValue();
          }

          isActivated = false;
          this.isActivated = isActivated;
        } else if (operArrow) {
          if (isDatePicker) {
            if (isActivated) {
              if (visiblePanel) {
                this.dateOffsetEvent(evnt);
              } else if (isUpArrow || isDwArrow) {
                evnt.preventDefault();
                this.showPanel();
              }
            }
          }
        } else if (isEnter) {
          if (isDatePicker) {
            if (visiblePanel) {
              if (this.datePanelValue) {
                this.dateSelectItem(this.datePanelValue);
              } else {
                this.hidePanel();
              }
            } else if (isActivated) {
              this.showPanel();
            }
          }
        } else if (isPgUp || isPgDn) {
          if (isDatePicker) {
            if (isActivated) {
              this.datePgOffsetEvent(evnt);
            }
          }
        }

        if (isTab || isEsc) {
          if (visiblePanel) {
            this.hidePanel();
          }
        } else if (isDel && clearable) {
          if (isActivated) {
            this.clearValueEvent(evnt, null);
          }
        }
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
            this.hidePanel();
            this.afterCheckValue();
          }
        }
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent() {
      var isActivated = this.isActivated,
          visiblePanel = this.visiblePanel;

      if (visiblePanel) {
        this.hidePanel();
        this.afterCheckValue();
      } else if (isActivated) {
        this.afterCheckValue();
      }
    } // 全局事件

  }
};
exports.default = _default2;