import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import UtilTools, { getFuncText } from '../../tools/utils'
import DomTools from '../../tools/dom'
import { GlobalEvent } from '../../tools/event'
import { toStringTimeDate, getDateQuarter } from './date'
import { handleNumber, toFloatValueFixed } from './number'
import { warnLog } from '../../tools/log'

const yearSize = 12
const monthSize = 20
const quarterSize = 8

function getNumberValue (_vm, val) {
  const { type, exponential, digitsValue, inpMaxlength } = _vm
  const restVal = (type === 'float' ? toFloatValueFixed(val, digitsValue) : XEUtils.toValueString(val))
  if (exponential && (val === restVal || XEUtils.toValueString(val).toLowerCase() === XEUtils.toNumber(restVal).toExponential())) {
    return val
  }
  return restVal.slice(0, inpMaxlength)
}

function renderDateLabel (h, _vm, item, label) {
  const festivalMethod = _vm.festivalMethod
  if (festivalMethod) {
    const festivalRest = festivalMethod({ $input: _vm, type: _vm.datePanelType, viewType: _vm.datePanelType, ...item })
    const festivalItem = festivalRest ? (XEUtils.isString(festivalRest) ? { label: festivalRest } : festivalRest) : {}
    const extraItem = festivalItem.extra ? (XEUtils.isString(festivalItem.extra) ? { label: festivalItem.extra } : festivalItem.extra) : null
    const labels = [
      h('span', {
        class: ['vxe-input--date-label', {
          'is-notice': festivalItem.notice
        }]
      }, extraItem && extraItem.label ? [
        h('span', label),
        h('span', {
          class: ['vxe-input--date-label--extra', extraItem.important ? 'is-important' : '', extraItem.className],
          style: extraItem.style
        }, XEUtils.toValueString(extraItem.label))
      ] : label)
    ]
    const festivalLabel = festivalItem.label
    if (festivalLabel) {
      // 默认最多支持3个节日重叠
      const festivalLabels = XEUtils.toValueString(festivalLabel).split(',')
      labels.push(
        h('span', {
          class: ['vxe-input--date-festival', festivalItem.important ? 'is-important' : '', festivalItem.className],
          style: festivalItem.style
        }, [
          festivalLabels.length > 1 ? h('span', {
            class: ['vxe-input--date-festival--overlap', `overlap--${festivalLabels.length}`]
          }, festivalLabels.map(label => h('span', label.substring(0, 3)))) : h('span', {
            class: 'vxe-input--date-festival--label'
          }, festivalLabels[0].substring(0, 3))
        ])
      )
    }
    return labels
  }
  return label
}

function isDateDisabled (_vm, item) {
  const disabledMethod = _vm.disabledMethod
  return disabledMethod && disabledMethod({ $input: _vm, type: _vm.datePanelType, viewType: _vm.datePanelType, date: item.date })
}

function renderDateDayTable (h, _vm) {
  const { datePanelType, dateValue, datePanelValue, dateHeaders, dayDatas, multiple, dateListValue } = _vm
  const matchFormat = 'yyyy-MM-dd'
  return [
    h('table', {
      class: `vxe-input--date-${datePanelType}-view`,
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }
    }, [
      h('thead', [
        h('tr', dateHeaders.map(item => {
          return h('th', item.label)
        }))
      ]),
      h('tbody', dayDatas.map(rows => {
        return h('tr', rows.map(item => {
          return h('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(_vm, item),
              'is--selected': multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
            },
            on: {
              click: () => _vm.dateSelectEvent(item),
              mouseenter: () => _vm.dateMouseenterEvent(item)
            }
          }, renderDateLabel(h, _vm, item, item.label))
        }))
      }))
    ])
  ]
}

function renderDateWeekTable (h, _vm) {
  const { datePanelType, dateValue, datePanelValue, weekHeaders, weekDates, multiple, dateListValue } = _vm
  const matchFormat = 'yyyyMMdd'
  return [
    h('table', {
      class: `vxe-input--date-${datePanelType}-view`,
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }
    }, [
      h('thead', [
        h('tr', weekHeaders.map(item => {
          return h('th', item.label)
        }))
      ]),
      h('tbody', weekDates.map(rows => {
        const isSelected = multiple ? rows.some((item) => dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat))) : rows.some(item => XEUtils.isDateSame(dateValue, item.date, matchFormat))
        const isHover = rows.some(item => XEUtils.isDateSame(datePanelValue, item.date, matchFormat))
        return h('tr', rows.map(item => {
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
              click: () => _vm.dateSelectEvent(item),
              mouseenter: () => _vm.dateMouseenterEvent(item)
            }
          }, renderDateLabel(h, _vm, item, item.label))
        }))
      }))
    ])
  ]
}

function renderDateMonthTable (h, _vm) {
  const { dateValue, datePanelType, monthDatas, datePanelValue, multiple, dateListValue } = _vm
  const matchFormat = 'yyyyMM'
  return [
    h('table', {
      class: `vxe-input--date-${datePanelType}-view`,
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }
    }, [
      h('tbody', monthDatas.map(rows => {
        return h('tr', rows.map(item => {
          return h('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(_vm, item),
              'is--selected': multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
            },
            on: {
              click: () => _vm.dateSelectEvent(item),
              mouseenter: () => _vm.dateMouseenterEvent(item)
            }
          }, renderDateLabel(h, _vm, item, GlobalConfig.i18n(`vxe.input.date.months.m${item.month}`)))
        }))
      }))
    ])
  ]
}

function renderDateQuarterTable (h, _vm) {
  const { dateValue, datePanelType, quarterDatas, datePanelValue, multiple, dateListValue } = _vm
  const matchFormat = 'yyyyq'
  return [
    h('table', {
      class: `vxe-input--date-${datePanelType}-view`,
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }
    }, [
      h('tbody', quarterDatas.map(rows => {
        return h('tr', rows.map(item => {
          return h('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(_vm, item),
              'is--selected': multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
            },
            on: {
              click: () => _vm.dateSelectEvent(item),
              mouseenter: () => _vm.dateMouseenterEvent(item)
            }
          }, renderDateLabel(h, _vm, item, GlobalConfig.i18n(`vxe.input.date.quarters.q${item.quarter}`)))
        }))
      }))
    ])
  ]
}

function renderDateYearTable (h, _vm) {
  const { dateValue, datePanelType, yearDatas, datePanelValue, multiple, dateListValue } = _vm
  const matchFormat = 'yyyy'
  return [
    h('table', {
      class: `vxe-input--date-${datePanelType}-view`,
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }
    }, [
      h('tbody', yearDatas.map(rows => {
        return h('tr', rows.map(item => {
          return h('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
            },
            on: {
              click: () => _vm.dateSelectEvent(item),
              mouseenter: () => _vm.dateMouseenterEvent(item)
            }
          }, renderDateLabel(h, _vm, item, item.year))
        }))
      }))
    ])
  ]
}

function renderDateTable (h, _vm) {
  const { datePanelType } = _vm
  switch (datePanelType) {
    case 'week' :
      return renderDateWeekTable(h, _vm)
    case 'month' :
      return renderDateMonthTable(h, _vm)
    case 'quarter' :
      return renderDateQuarterTable(h, _vm)
    case 'year' :
      return renderDateYearTable(h, _vm)
  }
  return renderDateDayTable(h, _vm)
}

function renderDatePanel (h, _vm) {
  const { datePanelType, selectDatePanelLabel, isDisabledPrevDateBtn, isDisabledNextDateBtn, multiple, supportMultiples } = _vm
  return [
    h('div', {
      class: 'vxe-input--date-picker-header'
    }, [
      h('div', {
        class: 'vxe-input--date-picker-type-wrapper'
      }, [
        datePanelType === 'year' ? h('span', {
          class: 'vxe-input--date-picker-label'
        }, selectDatePanelLabel) : h('span', {
          class: 'vxe-input--date-picker-btn',
          on: {
            click: _vm.dateToggleTypeEvent
          }
        }, selectDatePanelLabel)
      ]),
      h('div', {
        class: 'vxe-input--date-picker-btn-wrapper'
      }, [
        h('span', {
          class: ['vxe-input--date-picker-btn vxe-input--date-picker-prev-btn', {
            'is--disabled': isDisabledPrevDateBtn
          }],
          on: {
            click: _vm.datePrevEvent
          }
        }, [
          h('i', {
            class: 'vxe-icon-caret-left'
          })
        ]),
        h('span', {
          class: 'vxe-input--date-picker-btn vxe-input--date-picker-current-btn',
          on: {
            click: _vm.dateTodayMonthEvent
          }
        }, [
          h('i', {
            class: 'vxe-icon-dot'
          })
        ]),
        h('span', {
          class: ['vxe-input--date-picker-btn vxe-input--date-picker-next-btn', {
            'is--disabled': isDisabledNextDateBtn
          }],
          on: {
            click: _vm.dateNextEvent
          }
        }, [
          h('i', {
            class: 'vxe-icon-caret-right'
          })
        ]),
        multiple && supportMultiples ? h('span', {
          class: 'vxe-input--date-picker-btn vxe-input--date-picker-confirm-btn'
        }, [
          h('button', {
            class: 'vxe-input--date-picker-confirm',
            attrs: {
              type: 'button'
            },
            on: {
              click: _vm.dateConfirmEvent
            }
          }, GlobalConfig.i18n('vxe.button.confirm'))
        ]) : null
      ])
    ]),
    h('div', {
      class: 'vxe-input--date-picker-body'
    }, renderDateTable(h, _vm))
  ]
}

function renderTimePanel (h, _vm) {
  const { dateTimeLabel, datetimePanelValue, hourList, minuteList, secondList } = _vm
  return [
    h('div', {
      class: 'vxe-input--time-picker-header'
    }, [
      h('span', {
        class: 'vxe-input--time-picker-title'
      }, dateTimeLabel),
      h('button', {
        class: 'vxe-input--time-picker-confirm',
        attrs: {
          type: 'button'
        },
        on: {
          click: _vm.dateConfirmEvent
        }
      }, GlobalConfig.i18n('vxe.button.confirm'))
    ]),
    h('div', {
      ref: 'timeBody',
      class: 'vxe-input--time-picker-body'
    }, [
      h('ul', {
        class: 'vxe-input--time-picker-hour-list'
      }, hourList.map((item, index) => {
        return h('li', {
          key: index,
          class: {
            'is--selected': datetimePanelValue && datetimePanelValue.getHours() === item.value
          },
          on: {
            click: (evnt) => _vm.dateHourEvent(evnt, item)
          }
        }, item.label)
      })),
      h('ul', {
        class: 'vxe-input--time-picker-minute-list'
      }, minuteList.map((item, index) => {
        return h('li', {
          key: index,
          class: {
            'is--selected': datetimePanelValue && datetimePanelValue.getMinutes() === item.value
          },
          on: {
            click: (evnt) => _vm.dateMinuteEvent(evnt, item)
          }
        }, item.label)
      })),
      h('ul', {
        class: 'vxe-input--time-picker-second-list'
      }, secondList.map((item, index) => {
        return h('li', {
          key: index,
          class: {
            'is--selected': datetimePanelValue && datetimePanelValue.getSeconds() === item.value
          },
          on: {
            click: (evnt) => _vm.dateSecondEvent(evnt, item)
          }
        }, item.label)
      }))
    ])
  ]
}

function renderPanel (h, _vm) {
  const { type, vSize, isDatePickerType, transfer, animatVisible, visiblePanel, panelPlacement, panelStyle } = _vm
  const renders = []
  if (isDatePickerType) {
    if (type === 'datetime') {
      renders.push(
        h('div', {
          class: 'vxe-input--panel-layout-wrapper'
        }, [
          h('div', {
            class: 'vxe-input--panel-left-wrapper'
          }, renderDatePanel(h, _vm)),
          h('div', {
            class: 'vxe-input--panel-right-wrapper'
          }, renderTimePanel(h, _vm))
        ])
      )
    } else if (type === 'time') {
      renders.push(
        h('div', {
          class: 'vxe-input--panel-wrapper'
        }, renderTimePanel(h, _vm))
      )
    } else {
      renders.push(
        h('div', {
          class: 'vxe-input--panel-wrapper'
        }, renderDatePanel(h, _vm))
      )
    }
    return h('div', {
      ref: 'panel',
      class: ['vxe-table--ignore-clear vxe-input--panel', `type--${type}`, {
        [`size--${vSize}`]: vSize,
        'is--transfer': transfer,
        'animat--leave': animatVisible,
        'animat--enter': visiblePanel
      }],
      attrs: {
        placement: panelPlacement
      },
      style: panelStyle
    }, renders)
  }
  return null
}

function renderNumberIcon (h, _vm) {
  return h('span', {
    class: 'vxe-input--number-suffix'
  }, [
    h('span', {
      class: ['vxe-input--number-prev is--prev', {
        'is--disabled': _vm.isDisabledAddNumber
      }],
      on: {
        mousedown: _vm.numberMousedownEvent,
        mouseup: _vm.numberStopDown,
        mouseleave: _vm.numberStopDown
      }
    }, [
      h('i', {
        class: ['vxe-input--number-prev-icon', GlobalConfig.icon.INPUT_PREV_NUM]
      })
    ]),
    h('span', {
      class: ['vxe-input--number-next is--next', {
        'is--disabled': _vm.isDisabledSubtractNumber
      }],
      on: {
        mousedown: _vm.numberMousedownEvent,
        mouseup: _vm.numberStopDown,
        mouseleave: _vm.numberStopDown
      }
    }, [
      h('i', {
        class: ['vxe-input--number-next-icon', GlobalConfig.icon.INPUT_NEXT_NUM]
      })
    ])
  ])
}

function renderDatePickerIcon (h, _vm) {
  return h('span', {
    class: 'vxe-input--date-picker-suffix',
    on: {
      click: _vm.datePickerOpenEvent
    }
  }, [
    h('i', {
      class: ['vxe-input--date-picker-icon', GlobalConfig.icon.INPUT_DATE]
    })
  ])
}

function renderSearchIcon (h, _vm) {
  return h('span', {
    class: 'vxe-input--search-suffix',
    on: {
      click: _vm.searchEvent
    }
  }, [
    h('i', {
      class: ['vxe-input--search-icon', GlobalConfig.icon.INPUT_SEARCH]
    })
  ])
}

function renderPasswordIcon (h, _vm) {
  const { showPwd } = _vm
  return h('span', {
    class: 'vxe-input--password-suffix',
    on: {
      click: _vm.passwordToggleEvent
    }
  }, [
    h('i', {
      class: ['vxe-input--password-icon', showPwd ? GlobalConfig.icon.INPUT_SHOW_PWD : GlobalConfig.icon.INPUT_PWD]
    })
  ])
}

function rendePrefixIcon (h, _vm) {
  const { $scopedSlots, prefixIcon } = _vm
  const icons = []
  if ($scopedSlots.prefix) {
    icons.push(
      h('span', {
        class: 'vxe-input--prefix-icon'
      }, $scopedSlots.prefix.call(this, {}, h))
    )
  } else if (prefixIcon) {
    icons.push(
      h('i', {
        class: ['vxe-input--prefix-icon', prefixIcon]
      })
    )
  }
  return icons.length ? h('span', {
    class: 'vxe-input--prefix',
    on: {
      click: _vm.clickPrefixEvent
    }
  }, icons) : null
}

function renderSuffixIcon (h, _vm) {
  const { $scopedSlots, inputValue, isClearable, disabled, suffixIcon } = _vm
  const icons = []
  if ($scopedSlots.suffix) {
    icons.push(
      h('span', {
        class: 'vxe-input--suffix-icon'
      }, $scopedSlots.suffix.call(this, {}, h))
    )
  } else if (suffixIcon) {
    icons.push(
      h('i', {
        class: ['vxe-input--suffix-icon', suffixIcon]
      })
    )
  }
  if (isClearable) {
    icons.push(
      h('i', {
        class: ['vxe-input--clear-icon', GlobalConfig.icon.INPUT_CLEAR]
      })
    )
  }
  return icons.length ? h('span', {
    class: ['vxe-input--suffix', {
      'is--clear': isClearable && !disabled && !(inputValue === '' || XEUtils.eqNull(inputValue))
    }],
    on: {
      click: _vm.clickSuffixEvent
    }
  }, icons) : null
}

function renderExtraSuffixIcon (h, _vm) {
  const { controls, isPawdType, isNumType, isDatePickerType, isSearch } = _vm
  let icons
  if (isPawdType) {
    icons = renderPasswordIcon(h, _vm)
  } else if (isNumType) {
    if (controls) {
      icons = renderNumberIcon(h, _vm)
    }
  } else if (isDatePickerType) {
    icons = renderDatePickerIcon(h, _vm)
  } else if (isSearch) {
    icons = renderSearchIcon(h, _vm)
  }
  return icons ? h('span', {
    class: 'vxe-input--extra-suffix'
  }, [icons]) : null
}

export default {
  name: 'VxeInput',
  mixins: [vSize],
  model: {
    prop: 'value',
    event: 'modelValue'
  },
  props: {
    value: [String, Number, Date],
    immediate: { type: Boolean, default: true },
    name: String,
    type: { type: String, default: 'text' },
    clearable: { type: Boolean, default: () => GlobalConfig.input.clearable },
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    autocomplete: { type: String, default: 'off' },
    align: String,
    form: String,
    className: String,
    size: { type: String, default: () => GlobalConfig.input.size || GlobalConfig.size },
    multiple: Boolean,

    // number、integer、float
    min: { type: [String, Number], default: null },
    max: { type: [String, Number], default: null },
    step: [String, Number],
    exponential: { type: Boolean, default: () => GlobalConfig.input.exponential },

    // number、integer、float、password
    controls: { type: Boolean, default: () => GlobalConfig.input.controls },

    // float
    digits: { type: [String, Number], default: () => GlobalConfig.input.digits },

    // date、week、month、year
    dateConfig: Object,
    startDate: { type: [String, Number, Date], default: () => GlobalConfig.input.startDate },
    endDate: { type: [String, Number, Date], default: () => GlobalConfig.input.endDate },
    minDate: [String, Number, Date],
    maxDate: [String, Number, Date],
    // 已废弃 startWeek，被 startDay 替换
    startWeek: Number,
    startDay: { type: [String, Number], default: () => GlobalConfig.input.startDay },
    labelFormat: { type: String, default: () => GlobalConfig.input.labelFormat },
    valueFormat: { type: String, default: () => GlobalConfig.input.valueFormat },
    editable: { type: Boolean, default: true },
    festivalMethod: { type: Function, default: () => GlobalConfig.input.festivalMethod },
    disabledMethod: { type: Function, default: () => GlobalConfig.input.disabledMethod },

    // week
    selectDay: { type: Number, default: () => GlobalConfig.input.selectDay },

    prefixIcon: String,
    suffixIcon: String,
    placement: String,
    transfer: { type: Boolean, default: () => GlobalConfig.input.transfer }
  },
  inject: {
    $xeform: {
      default: null
    },
    $xeformiteminfo: {
      default: null
    }
  },
  data () {
    return {
      panelIndex: 0,
      showPwd: false,
      visiblePanel: false,
      animatVisible: false,
      panelStyle: null,
      panelPlacement: null,
      isActivated: false,
      inputValue: this.value,
      datetimePanelValue: null,
      datePanelValue: null,
      datePanelLabel: '',
      datePanelType: 'day',
      selectMonth: null,
      currentDate: null
    }
  },
  computed: {
    isNumType () {
      return ['number', 'integer', 'float'].indexOf(this.type) > -1
    },
    isDatePickerType () {
      return this.isDateTimeType || ['date', 'week', 'month', 'quarter', 'year'].indexOf(this.type) > -1
    },
    isDateTimeType () {
      const { type } = this
      return type === 'time' || type === 'datetime'
    },
    isPawdType () {
      return this.type === 'password'
    },
    isSearch () {
      return this.type === 'search'
    },
    stepValue () {
      const { type, step } = this
      if (type === 'integer') {
        return XEUtils.toInteger(step) || 1
      } else if (type === 'float') {
        return XEUtils.toNumber(step) || (1 / Math.pow(10, this.digitsValue))
      }
      return XEUtils.toNumber(step) || 1
    },
    digitsValue () {
      return XEUtils.toInteger(this.digits) || 1
    },
    isClearable () {
      return this.clearable && (this.isPawdType || this.isNumType || this.isDatePickerType || this.type === 'text' || this.type === 'search')
    },
    isDisabledPrevDateBtn () {
      const { selectMonth, dateStartTime } = this
      if (selectMonth) {
        return selectMonth <= dateStartTime
      }
      return false
    },
    isDisabledNextDateBtn () {
      const { selectMonth, dateEndTime } = this
      if (selectMonth) {
        return selectMonth >= dateEndTime
      }
      return false
    },
    dateStartTime () {
      return this.startDate ? XEUtils.toStringDate(this.startDate) : null
    },
    dateEndTime () {
      return this.endDate ? XEUtils.toStringDate(this.endDate) : null
    },
    supportMultiples () {
      return ['date', 'week', 'month', 'quarter', 'year'].includes(this.type)
    },
    dateListValue () {
      const { value, multiple, isDatePickerType, dateValueFormat } = this
      if (multiple && value && isDatePickerType) {
        return XEUtils.toValueString(value).split(',').map(item => {
          const date = this.parseDate(item, dateValueFormat)
          if (XEUtils.isValidDate(date)) {
            return date
          }
          return null
        })
      }
      return []
    },
    dateMultipleValue () {
      const { dateListValue, dateValueFormat } = this
      return dateListValue.map(date => XEUtils.toDateString(date, dateValueFormat))
    },
    dateMultipleLabel () {
      const { dateListValue, dateLabelFormat } = this
      return dateListValue.map(date => XEUtils.toDateString(date, dateLabelFormat)).join(', ')
    },
    dateValue () {
      const { value, isDatePickerType, dateValueFormat } = this
      let val = null
      if (value && isDatePickerType) {
        const date = this.parseDate(value, dateValueFormat)
        if (XEUtils.isValidDate(date)) {
          val = date
        }
      }
      return val
    },
    dateTimeLabel () {
      const { datetimePanelValue } = this
      if (datetimePanelValue) {
        return XEUtils.toDateString(datetimePanelValue, 'HH:mm:ss')
      }
      return ''
    },
    hmsTime () {
      const { dateValue } = this
      return dateValue && (this.isDateTimeType) ? (dateValue.getHours() * 3600 + dateValue.getMinutes() * 60 + dateValue.getSeconds()) * 1000 : 0
    },
    dateLabelFormat () {
      if (this.isDatePickerType) {
        return this.labelFormat || GlobalConfig.i18n(`vxe.input.date.labelFormat.${this.type}`)
      }
      return null
    },
    dateValueFormat () {
      const { type } = this
      return type === 'time' ? 'HH:mm:ss' : (this.valueFormat || (type === 'datetime' ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'))
    },
    selectDatePanelLabel () {
      if (this.isDatePickerType) {
        const { datePanelType, selectMonth, yearList } = this
        let year = ''
        let month
        if (selectMonth) {
          year = selectMonth.getFullYear()
          month = selectMonth.getMonth() + 1
        }
        if (datePanelType === 'quarter') {
          return GlobalConfig.i18n('vxe.input.date.quarterLabel', [year])
        } else if (datePanelType === 'month') {
          return GlobalConfig.i18n('vxe.input.date.monthLabel', [year])
        } else if (datePanelType === 'year') {
          return yearList.length ? `${yearList[0].year} - ${yearList[yearList.length - 1].year}` : ''
        }
        return GlobalConfig.i18n('vxe.input.date.dayLabel', [year, month ? GlobalConfig.i18n(`vxe.input.date.m${month}`) : '-'])
      }
      return ''
    },
    firstDayOfWeek () {
      const { startDay, startWeek } = this
      return XEUtils.toNumber(XEUtils.isNumber(startDay) || XEUtils.isString(startDay) ? startDay : startWeek)
    },
    weekDatas () {
      const weeks = []
      if (this.isDatePickerType) {
        let { firstDayOfWeek: sWeek } = this
        weeks.push(sWeek)
        for (let index = 0; index < 6; index++) {
          if (sWeek >= 6) {
            sWeek = 0
          } else {
            sWeek++
          }
          weeks.push(sWeek)
        }
      }
      return weeks
    },
    dateHeaders () {
      if (this.isDatePickerType) {
        return this.weekDatas.map(day => {
          return {
            value: day,
            label: GlobalConfig.i18n(`vxe.input.date.weeks.w${day}`)
          }
        })
      }
      return []
    },
    weekHeaders () {
      if (this.isDatePickerType) {
        return [{ label: GlobalConfig.i18n('vxe.input.date.weeks.w') }].concat(this.dateHeaders)
      }
      return []
    },
    yearList () {
      const { selectMonth, currentDate } = this
      const months = []
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear()
        const selectFullYear = selectMonth.getFullYear()
        const startYearDate = new Date(selectFullYear - selectFullYear % yearSize, 0, 1)
        for (let index = -4; index < yearSize + 4; index++) {
          const date = XEUtils.getWhatYear(startYearDate, index, 'first')
          const itemFullYear = date.getFullYear()
          months.push({
            date,
            isCurrent: true,
            isPrev: index < 0,
            isNow: currFullYear === itemFullYear,
            isNext: index >= yearSize,
            year: itemFullYear
          })
        }
      }
      return months
    },
    yearDatas () {
      return XEUtils.chunk(this.yearList, 4)
    },
    quarterList () {
      const { selectMonth, currentDate } = this
      const quarters = []
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear()
        const currQuarter = getDateQuarter(currentDate)
        const firstYear = XEUtils.getWhatYear(selectMonth, 0, 'first')
        const selFullYear = firstYear.getFullYear()
        for (let index = -2; index < quarterSize - 2; index++) {
          const date = XEUtils.getWhatQuarter(firstYear, index)
          const itemFullYear = date.getFullYear()
          const itemQuarter = getDateQuarter(date)
          const isPrev = itemFullYear < selFullYear
          quarters.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemQuarter === currQuarter,
            isNext: !isPrev && itemFullYear > selFullYear,
            quarter: itemQuarter
          })
        }
      }
      return quarters
    },
    quarterDatas () {
      return XEUtils.chunk(this.quarterList, 2)
    },
    monthList () {
      const { selectMonth, currentDate } = this
      const months = []
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear()
        const currMonth = currentDate.getMonth()
        const selFullYear = XEUtils.getWhatYear(selectMonth, 0, 'first').getFullYear()
        for (let index = -4; index < monthSize - 4; index++) {
          const date = XEUtils.getWhatYear(selectMonth, 0, index)
          const itemFullYear = date.getFullYear()
          const itemMonth = date.getMonth()
          const isPrev = itemFullYear < selFullYear
          months.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth,
            isNext: !isPrev && itemFullYear > selFullYear,
            month: itemMonth
          })
        }
      }
      return months
    },
    monthDatas () {
      return XEUtils.chunk(this.monthList, 4)
    },
    dayList () {
      const { weekDatas, selectMonth, currentDate, hmsTime } = this
      const days = []
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear()
        const currMonth = currentDate.getMonth()
        const currDate = currentDate.getDate()
        const selFullYear = selectMonth.getFullYear()
        const selMonth = selectMonth.getMonth()
        const selDay = selectMonth.getDay()
        const prevOffsetDate = -weekDatas.indexOf(selDay)
        const startDayDate = new Date(XEUtils.getWhatDay(selectMonth, prevOffsetDate).getTime() + hmsTime)
        for (let index = 0; index < 42; index++) {
          const date = XEUtils.getWhatDay(startDayDate, index)
          const itemFullYear = date.getFullYear()
          const itemMonth = date.getMonth()
          const itemDate = date.getDate()
          const isPrev = date < selectMonth
          days.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear && itemMonth === selMonth,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth && itemDate === currDate,
            isNext: !isPrev && selMonth !== itemMonth,
            label: itemDate
          })
        }
      }
      return days
    },
    dayDatas () {
      return XEUtils.chunk(this.dayList, 7)
    },
    weekDates () {
      const { dayDatas, firstDayOfWeek } = this
      return dayDatas.map(list => {
        const firstItem = list[0]
        const item = {
          date: firstItem.date,
          isWeekNumber: true,
          isPrev: false,
          isCurrent: false,
          isNow: false,
          isNext: false,
          label: XEUtils.getYearWeek(firstItem.date, firstDayOfWeek)
        }
        return [item].concat(list)
      })
    },
    hourList () {
      const list = []
      if (this.isDateTimeType) {
        for (let index = 0; index < 24; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, 0)
          })
        }
      }
      return list
    },
    minuteList () {
      const list = []
      if (this.isDateTimeType) {
        for (let index = 0; index < 60; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, 0)
          })
        }
      }
      return list
    },
    secondList () {
      return this.minuteList
    },
    inpImmediate () {
      const { type, immediate } = this
      return immediate || !(type === 'text' || type === 'number' || type === 'integer' || type === 'float')
    },
    inpPlaceholder () {
      const { placeholder } = this
      if (placeholder) {
        return getFuncText(placeholder)
      }
      return ''
    },
    inputType () {
      const { isDatePickerType, isNumType, isPawdType, type, showPwd } = this
      if (isDatePickerType || isNumType || (isPawdType && showPwd) || type === 'number') {
        return 'text'
      }
      return type
    },
    inpMaxlength () {
      const { isNumType, maxlength } = this
      // 数值最大长度限制 16 位，包含小数
      return isNumType && !XEUtils.toNumber(maxlength) ? 16 : maxlength
    },
    inpReadonly () {
      const { type, readonly, editable, multiple } = this
      return readonly || multiple || !editable || (type === 'week' || type === 'quarter')
    },
    numValue () {
      const { type, isNumType, inputValue } = this
      if (isNumType) {
        return type === 'integer' ? XEUtils.toInteger(handleNumber(inputValue)) : XEUtils.toNumber(handleNumber(inputValue))
      }
      return 0
    },
    isDisabledSubtractNumber () {
      const { min, isNumType, inputValue, numValue } = this
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && isNumType && min !== null) {
        return numValue <= XEUtils.toNumber(min)
      }
      return false
    },
    isDisabledAddNumber () {
      const { max, isNumType, inputValue, numValue } = this
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && isNumType && max !== null) {
        return numValue >= XEUtils.toNumber(max)
      }
      return false
    }
  },
  watch: {
    value (val) {
      this.inputValue = val
      this.changeValue()
    },
    type () {
      // 切换类型是重置内置变量
      Object.assign(this, {
        inputValue: this.value,
        datetimePanelValue: null,
        datePanelValue: null,
        datePanelLabel: '',
        datePanelType: 'day',
        selectMonth: null,
        currentDate: null
      })
      this.initValue()
    },
    dateLabelFormat () {
      if (this.isDatePickerType) {
        this.dateParseValue(this.datePanelValue)
        this.inputValue = this.multiple ? this.dateMultipleLabel : this.datePanelLabel
      }
    }
  },
  created () {
    this.initValue()
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
  },
  mounted () {
    if (this.dateConfig) {
      warnLog('vxe.error.removeProp', ['date-config'])
    }
    if (this.isDatePickerType) {
      if (this.transfer) {
        document.body.appendChild(this.$refs.panel)
      }
    }
  },
  beforeDestroy () {
    const panelElem = this.$refs.panel
    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem)
    }
  },
  destroyed () {
    this.numberStopDown()
    GlobalEvent.off(this, 'mousewheel')
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'keydown')
    GlobalEvent.off(this, 'blur')
  },
  render (h) {
    const { name, form, inputType, inpPlaceholder, inpMaxlength, inpReadonly, className, controls, inputValue, isDatePickerType, visiblePanel, isActivated, vSize, type, align, readonly, disabled, autocomplete } = this
    const childs = []
    const prefix = rendePrefixIcon(h, this)
    const suffix = renderSuffixIcon(h, this)
    // 前缀图标
    if (prefix) {
      childs.push(prefix)
    }
    // 输入框
    childs.push(
      h('input', {
        ref: 'input',
        class: 'vxe-input--inner',
        domProps: {
          value: inputValue
        },
        attrs: {
          name,
          form,
          type: inputType,
          placeholder: inpPlaceholder,
          maxlength: inpMaxlength,
          readonly: inpReadonly,
          disabled,
          autocomplete
        },
        on: {
          keydown: this.keydownEvent,
          keyup: this.triggerEvent,
          wheel: this.wheelEvent,
          click: this.clickEvent,
          input: this.inputEvent,
          change: this.changeEvent,
          focus: this.focusEvent,
          blur: this.blurEvent
        }
      })
    )
    // 后缀图标
    if (suffix) {
      childs.push(suffix)
    }
    // 特殊功能图标
    childs.push(renderExtraSuffixIcon(h, this))
    // 面板容器
    if (isDatePickerType) {
      childs.push(renderPanel(h, this))
    }
    return h('div', {
      class: ['vxe-input', `type--${type}`, className, {
        [`size--${vSize}`]: vSize,
        [`is--${align}`]: align,
        'is--controls': controls,
        'is--prefix': !!prefix,
        'is--suffix': !!suffix,
        'is--readonly': readonly,
        'is--visivle': visiblePanel,
        'is--disabled': disabled,
        'is--active': isActivated
      }]
    }, childs)
  },
  methods: {
    focus () {
      this.isActivated = true
      this.$refs.input.focus()
      return this.$nextTick()
    },
    blur () {
      this.$refs.input.blur()
      this.isActivated = false
      return this.$nextTick()
    },
    triggerEvent (evnt) {
      const { $refs, inputValue } = this
      this.$emit(evnt.type, { $panel: $refs.panel, value: inputValue, $event: evnt })
    },
    emitModel (value, evnt) {
      this.inputValue = value
      this.$emit('modelValue', value)
      this.$emit('input', { value, $event: evnt })
      if (XEUtils.toValueString(this.value) !== value) {
        this.$emit('change', { value, $event: evnt })
        // 自动更新校验状态
        if (this.$xeform && this.$xeformiteminfo) {
          this.$xeform.triggerItemEvent(evnt, this.$xeformiteminfo.itemConfig.field, value)
        }
      }
    },
    emitInputEvent (value, evnt) {
      const { inpImmediate, isDatePickerType } = this
      this.inputValue = value
      if (!isDatePickerType) {
        if (inpImmediate) {
          this.emitModel(value, evnt)
        } else {
          this.$emit('input', { value, $event: evnt })
        }
      }
    },
    inputEvent (evnt) {
      const value = evnt.target.value
      this.emitInputEvent(value, evnt)
    },
    changeEvent (evnt) {
      const { inpImmediate } = this
      if (!inpImmediate) {
        this.triggerEvent(evnt)
      }
    },
    focusEvent (evnt) {
      this.isActivated = true
      this.triggerEvent(evnt)
    },
    blurEvent (evnt) {
      const { inputValue, inpImmediate } = this
      const value = inputValue
      if (!inpImmediate) {
        this.emitModel(value, evnt)
      }
      this.afterCheckValue()
      if (!this.visiblePanel) {
        this.isActivated = false
      }
      this.$emit('blur', { value, $event: evnt })
    },
    keydownEvent (evnt) {
      const { exponential, controls, isNumType } = this
      if (isNumType) {
        const isCtrlKey = evnt.ctrlKey
        const isShiftKey = evnt.shiftKey
        const isAltKey = evnt.altKey
        const keyCode = evnt.keyCode
        if (!isCtrlKey && !isShiftKey && !isAltKey && (keyCode === 32 || ((!exponential || keyCode !== 69) && (keyCode >= 65 && keyCode <= 90)) || (keyCode >= 186 && keyCode <= 188) || keyCode >= 191)) {
          evnt.preventDefault()
        }
        if (controls) {
          this.numberKeydownEvent(evnt)
        }
      }
      this.triggerEvent(evnt)
    },
    wheelEvent (evnt) {
      if (this.isNumType && this.controls) {
        if (this.isActivated) {
          const delta = evnt.deltaY
          if (delta > 0) {
            this.numberNextEvent(evnt)
          } else if (delta < 0) {
            this.numberPrevEvent(evnt)
          }
          evnt.preventDefault()
        }
      }
      this.triggerEvent(evnt)
    },
    clickEvent (evnt) {
      const { isDatePickerType } = this
      if (isDatePickerType) {
        this.datePickerOpenEvent(evnt)
      }
      this.triggerEvent(evnt)
    },
    clickPrefixEvent (evnt) {
      const { $refs, disabled, inputValue } = this
      if (!disabled) {
        this.$emit('prefix-click', { $panel: $refs.panel, value: inputValue, $event: evnt })
      }
    },
    clickSuffixEvent (evnt) {
      const { $refs, disabled, inputValue } = this
      if (!disabled) {
        if (DomTools.hasClass(evnt.currentTarget, 'is--clear')) {
          this.emitModel('', evnt)
          this.clearValueEvent(evnt, '')
        } else {
          this.$emit('suffix-click', { $panel: $refs.panel, value: inputValue, $event: evnt })
        }
      }
    },
    clearValueEvent (evnt, value) {
      const { $refs, type, isNumType } = this
      if (this.isDatePickerType) {
        this.hidePanel()
      }
      if (isNumType || ['text', 'search', 'password'].indexOf(type) > -1) {
        this.focus()
      }
      this.$emit('clear', { $panel: $refs.panel, value, $event: evnt })
    },
    parseDate (value, format) {
      const { type } = this
      if (type === 'time') {
        return toStringTimeDate(value)
      }
      return XEUtils.toStringDate(value, format)
    },
    /**
     * 检查初始值
     */
    initValue () {
      const { type, isDatePickerType, inputValue, digitsValue } = this
      if (isDatePickerType) {
        this.changeValue()
      } else if (type === 'float') {
        if (inputValue) {
          const validValue = toFloatValueFixed(inputValue, digitsValue)
          if (inputValue !== validValue) {
            this.emitModel(validValue, { type: 'init' })
          }
        }
      }
    },
    /**
     * 值变化时处理
     */
    changeValue () {
      if (this.isDatePickerType) {
        this.dateParseValue(this.inputValue)
        this.inputValue = this.multiple ? this.dateMultipleLabel : this.datePanelLabel
      }
    },
    afterCheckValue () {
      const { type, exponential, inpReadonly, inputValue, isDatePickerType, isNumType, datetimePanelValue, dateLabelFormat, min, max, firstDayOfWeek } = this
      if (!inpReadonly) {
        if (isNumType) {
          if (inputValue) {
            let inpNumVal = type === 'integer' ? XEUtils.toInteger(handleNumber(inputValue)) : XEUtils.toNumber(handleNumber(inputValue))
            if (!this.vaildMinNum(inpNumVal)) {
              inpNumVal = min
            } else if (!this.vaildMaxNum(inpNumVal)) {
              inpNumVal = max
            }
            if (exponential) {
              const inpStringVal = XEUtils.toValueString(inputValue).toLowerCase()
              if (inpStringVal === XEUtils.toNumber(inpNumVal).toExponential()) {
                inpNumVal = inpStringVal
              }
            }
            this.emitModel(getNumberValue(this, inpNumVal), { type: 'check' })
          }
        } else if (isDatePickerType) {
          if (inputValue) {
            if (type === 'week' || type === 'quarter') {
              // 周和季度选择器不支持解析，无需处理
            } else {
              let inpDateVal = this.parseDate(inputValue, dateLabelFormat)
              if (XEUtils.isValidDate(inpDateVal)) {
                if (type === 'time') {
                  inpDateVal = toStringTimeDate(inpDateVal)
                  if (inputValue !== inpDateVal) {
                    this.emitModel(inpDateVal, { type: 'check' })
                  }
                  this.inputValue = inpDateVal
                } else {
                  let isChange = false
                  if (type === 'datetime') {
                    if (inputValue !== XEUtils.toDateString(this.dateValue, dateLabelFormat) || inputValue !== XEUtils.toDateString(inpDateVal, dateLabelFormat)) {
                      isChange = true
                      datetimePanelValue.setHours(inpDateVal.getHours())
                      datetimePanelValue.setMinutes(inpDateVal.getMinutes())
                      datetimePanelValue.setSeconds(inpDateVal.getSeconds())
                    }
                  } else {
                    isChange = true
                  }
                  this.inputValue = XEUtils.toDateString(inpDateVal, dateLabelFormat, { firstDay: firstDayOfWeek })
                  if (isChange) {
                    this.dateChange(inpDateVal)
                  }
                }
              } else {
                this.dateRevert()
              }
            }
          } else {
            this.emitModel('', { type: 'check' })
          }
        }
      }
    },

    // 密码
    passwordToggleEvent (evnt) {
      const { disabled, readonly, showPwd } = this
      if (!disabled && !readonly) {
        this.showPwd = !showPwd
      }
      this.$emit('toggle-visible', { visible: this.showPwd, $event: evnt })
    },
    // 密码

    // 搜索
    searchEvent (evnt) {
      this.$emit('search-click', { $event: evnt })
    },
    // 搜索

    // 数值
    vaildMinNum (num) {
      return this.min === null || num >= XEUtils.toNumber(this.min)
    },
    vaildMaxNum (num) {
      return this.max === null || num <= XEUtils.toNumber(this.max)
    },
    numberStopDown () {
      clearTimeout(this.downbumTimeout)
    },
    numberDownPrevEvent (evnt) {
      this.downbumTimeout = setTimeout(() => {
        this.numberPrevEvent(evnt)
        this.numberDownPrevEvent(evnt)
      }, 60)
    },
    numberDownNextEvent (evnt) {
      this.downbumTimeout = setTimeout(() => {
        this.numberNextEvent(evnt)
        this.numberDownNextEvent(evnt)
      }, 60)
    },
    numberKeydownEvent (evnt) {
      const { keyCode } = evnt
      const isUpArrow = keyCode === 38
      const isDwArrow = keyCode === 40
      if (isUpArrow || isDwArrow) {
        evnt.preventDefault()
        if (isUpArrow) {
          this.numberPrevEvent(evnt)
        } else {
          this.numberNextEvent(evnt)
        }
      }
    },
    numberMousedownEvent (evnt) {
      this.numberStopDown()
      if (evnt.button === 0) {
        const isPrevNumber = DomTools.hasClass(evnt.currentTarget, 'is--prev')
        if (isPrevNumber) {
          this.numberPrevEvent(evnt)
        } else {
          this.numberNextEvent(evnt)
        }
        this.downbumTimeout = setTimeout(() => {
          if (isPrevNumber) {
            this.numberDownPrevEvent(evnt)
          } else {
            this.numberDownNextEvent(evnt)
          }
        }, 500)
      }
    },
    numberPrevEvent (evnt) {
      const { disabled, readonly, isDisabledAddNumber } = this
      clearTimeout(this.downbumTimeout)
      if (!disabled && !readonly && !isDisabledAddNumber) {
        this.numberChange(true, evnt)
      }
      this.$emit('prev-number', { $event: evnt })
    },
    numberNextEvent (evnt) {
      const { disabled, readonly, isDisabledSubtractNumber } = this
      clearTimeout(this.downbumTimeout)
      if (!disabled && !readonly && !isDisabledSubtractNumber) {
        this.numberChange(false, evnt)
      }
      this.$emit('next-number', { $event: evnt })
    },
    numberChange (isPlus, evnt) {
      const { min, max, type, inputValue, stepValue } = this
      const numValue = type === 'integer' ? XEUtils.toInteger(handleNumber(inputValue)) : XEUtils.toNumber(handleNumber(inputValue))
      const newValue = isPlus ? XEUtils.add(numValue, stepValue) : XEUtils.subtract(numValue, stepValue)
      let restNum
      if (!this.vaildMinNum(newValue)) {
        restNum = min
      } else if (!this.vaildMaxNum(newValue)) {
        restNum = max
      } else {
        restNum = newValue
      }
      this.emitInputEvent(getNumberValue(this, restNum), evnt)
    },
    // 数值

    // 日期
    datePickerOpenEvent (evnt) {
      const { readonly } = this
      if (!readonly) {
        evnt.preventDefault()
        this.showPanel()
      }
    },
    dateMonthHandle (date, offsetMonth) {
      this.selectMonth = XEUtils.getWhatMonth(date, offsetMonth, 'first')
    },
    dateNowHandle () {
      const currentDate = XEUtils.getWhatDay(Date.now(), 0, 'first')
      this.currentDate = currentDate
      this.dateMonthHandle(currentDate, 0)
    },
    dateToggleTypeEvent () {
      let { datePanelType } = this
      if (datePanelType === 'month' || datePanelType === 'quarter') {
        datePanelType = 'year'
      } else {
        datePanelType = 'month'
      }
      this.datePanelType = datePanelType
    },
    datePrevEvent (evnt) {
      const { isDisabledPrevDateBtn, type, datePanelType } = this
      if (!isDisabledPrevDateBtn) {
        if (type === 'year') {
          this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -yearSize, 'first')
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -yearSize, 'first')
          } else {
            this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -1, 'first')
          }
        } else {
          if (datePanelType === 'year') {
            this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -yearSize, 'first')
          } else if (datePanelType === 'month') {
            this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -1, 'first')
          } else {
            this.selectMonth = XEUtils.getWhatMonth(this.selectMonth, -1, 'first')
          }
        }
        this.$emit('date-prev', { type, $event: evnt })
      }
    },
    dateTodayMonthEvent (evnt) {
      this.dateNowHandle()
      if (!this.multiple) {
        this.dateChange(this.currentDate)
        this.hidePanel()
      }
      this.$emit('date-today', { type: this.type, $event: evnt })
    },
    dateNextEvent (evnt) {
      const { isDisabledNextDateBtn, type, datePanelType } = this
      if (!isDisabledNextDateBtn) {
        if (type === 'year') {
          this.selectMonth = XEUtils.getWhatYear(this.selectMonth, yearSize, 'first')
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            this.selectMonth = XEUtils.getWhatYear(this.selectMonth, yearSize, 'first')
          } else {
            this.selectMonth = XEUtils.getWhatYear(this.selectMonth, 1, 'first')
          }
        } else {
          if (datePanelType === 'year') {
            this.selectMonth = XEUtils.getWhatYear(this.selectMonth, yearSize, 'first')
          } else if (datePanelType === 'month') {
            this.selectMonth = XEUtils.getWhatYear(this.selectMonth, 1, 'first')
          } else {
            this.selectMonth = XEUtils.getWhatMonth(this.selectMonth, 1, 'first')
          }
        }
        this.$emit('date-next', { type, $event: evnt })
      }
    },
    dateSelectEvent (item) {
      if (!isDateDisabled(this, item)) {
        this.dateSelectItem(item.date)
      }
    },
    dateSelectItem (date) {
      const { type, datePanelType, multiple } = this
      const isWeekType = type === 'week'
      if (type === 'month') {
        if (datePanelType === 'year') {
          this.datePanelType = 'month'
          this.dateCheckMonth(date)
        } else {
          this.dateChange(date)
          if (!multiple) {
            this.hidePanel()
          }
        }
      } else if (type === 'year') {
        this.dateChange(date)
        if (!multiple) {
          this.hidePanel()
        }
      } else if (type === 'quarter') {
        if (datePanelType === 'year') {
          this.datePanelType = 'quarter'
          this.dateCheckMonth(date)
        } else {
          this.dateChange(date)
          if (!multiple) {
            this.hidePanel()
          }
        }
      } else {
        if (datePanelType === 'month') {
          this.datePanelType = type === 'week' ? type : 'day'
          this.dateCheckMonth(date)
        } else if (datePanelType === 'year') {
          this.datePanelType = 'month'
          this.dateCheckMonth(date)
        } else {
          this.dateChange(date)
          if (!multiple) {
            this.hidePanel()
          }
        }
      }
      if (isWeekType) {
        this.changeValue()
      }
    },
    dateMouseenterEvent (item) {
      if (!isDateDisabled(this, item)) {
        const { datePanelType } = this
        if (datePanelType === 'month') {
          this.dateMoveMonth(item.date)
        } else if (datePanelType === 'quarter') {
          this.dateMoveQuarter(item.date)
        } else if (datePanelType === 'year') {
          this.dateMoveYear(item.date)
        } else {
          this.dateMoveDay(item.date)
        }
      }
    },
    dateHourEvent (evnt, item) {
      this.datetimePanelValue.setHours(item.value)
      this.dateTimeChangeEvent(evnt)
    },
    dateConfirmEvent () {
      if (this.isDateTimeType || this.multiple) {
        this.dateChange(this.dateValue || this.currentDate)
      }
      this.hidePanel()
    },
    dateMinuteEvent (evnt, item) {
      this.datetimePanelValue.setMinutes(item.value)
      this.dateTimeChangeEvent(evnt)
    },
    dateSecondEvent (evnt, item) {
      this.datetimePanelValue.setSeconds(item.value)
      this.dateTimeChangeEvent(evnt)
    },
    dateTimeChangeEvent (evnt) {
      this.datetimePanelValue = new Date(this.datetimePanelValue.getTime())
      this.updateTimePos(evnt.currentTarget)
    },
    updateTimePos (liElem) {
      if (liElem) {
        const height = liElem.offsetHeight
        liElem.parentNode.scrollTop = liElem.offsetTop - height * 4
      }
    },
    dateMoveDay (offsetDay) {
      if (!isDateDisabled(this, { date: offsetDay })) {
        if (!this.dayList.some(item => XEUtils.isDateSame(item.date, offsetDay, 'yyyyMMdd'))) {
          this.dateCheckMonth(offsetDay)
        }
        this.dateParseValue(offsetDay)
      }
    },
    dateMoveMonth (offsetMonth) {
      if (!isDateDisabled(this, { date: offsetMonth })) {
        if (!this.monthList.some(item => XEUtils.isDateSame(item.date, offsetMonth, 'yyyyMM'))) {
          this.dateCheckMonth(offsetMonth)
        }
        this.dateParseValue(offsetMonth)
      }
    },
    dateMoveQuarter (offsetQuarter) {
      if (!isDateDisabled(this, { date: offsetQuarter })) {
        if (!this.quarterList.some(item => XEUtils.isDateSame(item.date, offsetQuarter, 'yyyyq'))) {
          this.dateCheckMonth(offsetQuarter)
        }
        this.dateParseValue(offsetQuarter)
      }
    },
    dateMoveYear (offsetYear) {
      if (!isDateDisabled(this, { date: offsetYear })) {
        if (!this.yearList.some(item => XEUtils.isDateSame(item.date, offsetYear, 'yyyy'))) {
          this.dateCheckMonth(offsetYear)
        }
        this.dateParseValue(offsetYear)
      }
    },
    dateParseValue (date) {
      const { type, dateLabelFormat, valueFormat, firstDayOfWeek } = this
      let dValue = null
      let dLabel = ''
      if (date) {
        dValue = this.parseDate(date, valueFormat)
      }
      if (XEUtils.isValidDate(dValue)) {
        dLabel = XEUtils.toDateString(dValue, dateLabelFormat, { firstDay: firstDayOfWeek })
        // 由于年份和第几周是冲突的行为，所以需要特殊处理，判断是否跨年
        if (dateLabelFormat && type === 'week') {
          const firstWeekDate = XEUtils.getWhatWeek(dValue, 0, firstDayOfWeek, firstDayOfWeek)
          if (firstWeekDate.getFullYear() < dValue.getFullYear()) {
            const yyIndex = dateLabelFormat.indexOf('yyyy')
            if (yyIndex > -1) {
              const yyNum = Number(dLabel.substring(yyIndex, yyIndex + 4))
              if (yyNum && !isNaN(yyNum)) {
                dLabel = dLabel.replace(`${yyNum}`, `${yyNum - 1}`)
              }
            }
          }
        }
      } else {
        dValue = null
      }
      this.datePanelValue = dValue
      this.datePanelLabel = dLabel
    },
    dateOffsetEvent (evnt) {
      const { isActivated, datePanelValue, datePanelType, firstDayOfWeek } = this
      if (isActivated) {
        evnt.preventDefault()
        const keyCode = evnt.keyCode
        const isLeftArrow = keyCode === 37
        const isUpArrow = keyCode === 38
        const isRightArrow = keyCode === 39
        const isDwArrow = keyCode === 40
        if (datePanelType === 'year') {
          let offsetYear = XEUtils.getWhatYear(datePanelValue || Date.now(), 0, 'first')
          if (isLeftArrow) {
            offsetYear = XEUtils.getWhatYear(offsetYear, -1)
          } else if (isUpArrow) {
            offsetYear = XEUtils.getWhatYear(offsetYear, -4)
          } else if (isRightArrow) {
            offsetYear = XEUtils.getWhatYear(offsetYear, 1)
          } else if (isDwArrow) {
            offsetYear = XEUtils.getWhatYear(offsetYear, 4)
          }
          this.dateMoveYear(offsetYear)
        } else if (datePanelType === 'quarter') {
          let offsetQuarter = XEUtils.getWhatQuarter(datePanelValue || Date.now(), 0, 'first')
          if (isLeftArrow) {
            offsetQuarter = XEUtils.getWhatQuarter(offsetQuarter, -1)
          } else if (isUpArrow) {
            offsetQuarter = XEUtils.getWhatQuarter(offsetQuarter, -2)
          } else if (isRightArrow) {
            offsetQuarter = XEUtils.getWhatQuarter(offsetQuarter, 1)
          } else if (isDwArrow) {
            offsetQuarter = XEUtils.getWhatQuarter(offsetQuarter, 2)
          }
          this.dateMoveQuarter(offsetQuarter)
        } else if (datePanelType === 'month') {
          let offsetMonth = XEUtils.getWhatMonth(datePanelValue || Date.now(), 0, 'first')
          if (isLeftArrow) {
            offsetMonth = XEUtils.getWhatMonth(offsetMonth, -1)
          } else if (isUpArrow) {
            offsetMonth = XEUtils.getWhatMonth(offsetMonth, -4)
          } else if (isRightArrow) {
            offsetMonth = XEUtils.getWhatMonth(offsetMonth, 1)
          } else if (isDwArrow) {
            offsetMonth = XEUtils.getWhatMonth(offsetMonth, 4)
          }
          this.dateMoveMonth(offsetMonth)
        } else {
          let offsetDay = datePanelValue || XEUtils.getWhatDay(Date.now(), 0, 'first')
          if (isLeftArrow) {
            offsetDay = XEUtils.getWhatDay(offsetDay, -1)
          } else if (isUpArrow) {
            offsetDay = XEUtils.getWhatWeek(offsetDay, -1, firstDayOfWeek)
          } else if (isRightArrow) {
            offsetDay = XEUtils.getWhatDay(offsetDay, 1)
          } else if (isDwArrow) {
            offsetDay = XEUtils.getWhatWeek(offsetDay, 1, firstDayOfWeek)
          }
          this.dateMoveDay(offsetDay)
        }
      }
    },
    datePgOffsetEvent (evnt) {
      const { isActivated } = this
      if (isActivated) {
        const isPgUp = evnt.keyCode === 33
        evnt.preventDefault()
        if (isPgUp) {
          this.datePrevEvent(evnt)
        } else {
          this.dateNextEvent(evnt)
        }
      }
    },
    dateChange (date) {
      const { value, datetimePanelValue, dateValueFormat, firstDayOfWeek, isDateTimeType, multiple } = this
      if (this.type === 'week') {
        const sWeek = XEUtils.toNumber(this.selectDay)
        date = XEUtils.getWhatWeek(date, 0, sWeek, firstDayOfWeek)
      } else if (isDateTimeType) {
        date.setHours(datetimePanelValue.getHours())
        date.setMinutes(datetimePanelValue.getMinutes())
        date.setSeconds(datetimePanelValue.getSeconds())
      }
      const inpVal = XEUtils.toDateString(date, dateValueFormat, { firstDay: firstDayOfWeek })
      this.dateCheckMonth(date)
      if (multiple) {
        // 如果为多选
        const { dateMultipleValue } = this
        if (isDateTimeType) {
          // 如果是datetime特殊类型
          const { dateListValue } = this
          const datetimeRest = []
          dateListValue.forEach(item => {
            if (item && !XEUtils.isDateSame(date, item, 'yyyyMMdd')) {
              item.setHours(datetimePanelValue.getHours())
              item.setMinutes(datetimePanelValue.getMinutes())
              item.setSeconds(datetimePanelValue.getSeconds())
              datetimeRest.push(item)
            }
          })
          datetimeRest.push(date)
          this.emitModel(datetimeRest.map(date => XEUtils.toDateString(date, dateValueFormat)).join(','), { type: 'update' })
        } else {
          // 如果是日期类型
          if (dateMultipleValue.some(val => XEUtils.isEqual(val, inpVal))) {
            this.emitModel(dateMultipleValue.filter(val => !XEUtils.isEqual(val, inpVal)).join(','), { type: 'update' })
          } else {
            this.emitModel(dateMultipleValue.concat([inpVal]).join(','), { type: 'update' })
          }
        }
      } else {
        // 如果为单选
        if (!XEUtils.isEqual(value, inpVal)) {
          this.emitModel(inpVal, { type: 'update' })
        }
      }
    },
    dateCheckMonth (date) {
      const month = XEUtils.getWhatMonth(date, 0, 'first')
      if (!XEUtils.isEqual(month, this.selectMonth)) {
        this.selectMonth = month
      }
    },
    dateOpenPanel () {
      const { type, dateValue } = this
      if (['year', 'quarter', 'month', 'week'].indexOf(type) > -1) {
        this.datePanelType = type
      } else {
        this.datePanelType = 'day'
      }
      this.currentDate = XEUtils.getWhatDay(Date.now(), 0, 'first')
      if (dateValue) {
        this.dateMonthHandle(dateValue, 0)
        this.dateParseValue(dateValue)
      } else {
        this.dateNowHandle()
      }
      if (this.isDateTimeType) {
        this.datetimePanelValue = this.datePanelValue || XEUtils.getWhatDay(Date.now(), 0, 'first')
        this.$nextTick(() => {
          XEUtils.arrayEach(this.$refs.timeBody.querySelectorAll('li.is--selected'), this.updateTimePos)
        })
      }
    },
    dateRevert () {
      this.inputValue = this.multiple ? this.dateMultipleLabel : this.datePanelLabel
    },
    // 日期

    // 弹出面板
    updateZindex () {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex()
      }
    },
    showPanel () {
      const { disabled, visiblePanel, isDatePickerType } = this
      if (!disabled && !visiblePanel) {
        clearTimeout(this.hidePanelTimeout)
        this.isActivated = true
        this.animatVisible = true
        if (isDatePickerType) {
          this.dateOpenPanel()
        }
        setTimeout(() => {
          this.visiblePanel = true
        }, 10)
        this.updateZindex()
        return this.updatePlacement()
      }
      return this.$nextTick()
    },
    hidePanel () {
      return new Promise(resolve => {
        this.visiblePanel = false
        this.hidePanelTimeout = setTimeout(() => {
          this.animatVisible = false
          resolve()
        }, 350)
      })
    },
    updatePlacement () {
      return this.$nextTick().then(() => {
        const { $refs, transfer, placement, panelIndex } = this
        const targetElem = $refs.input
        const panelElem = $refs.panel
        if (targetElem && panelElem) {
          const targetHeight = targetElem.offsetHeight
          const targetWidth = targetElem.offsetWidth
          const panelHeight = panelElem.offsetHeight
          const panelWidth = panelElem.offsetWidth
          const marginSize = 5
          const panelStyle = {
            zIndex: panelIndex
          }
          const { boundingTop, boundingLeft, visibleHeight, visibleWidth } = DomTools.getAbsolutePos(targetElem)
          let panelPlacement = 'bottom'
          if (transfer) {
            let left = boundingLeft
            let top = boundingTop + targetHeight
            if (placement === 'top') {
              panelPlacement = 'top'
              top = boundingTop - panelHeight
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top'
                top = boundingTop - panelHeight
              }
              // 如果上面不够放，则向下（优先）
              if (top < marginSize) {
                panelPlacement = 'bottom'
                top = boundingTop + targetHeight
              }
            }
            // 如果溢出右边
            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth
            }
            // 如果溢出左边
            if (left < marginSize) {
              left = marginSize
            }
            Object.assign(panelStyle, {
              left: `${left}px`,
              top: `${top}px`,
              minWidth: `${targetWidth}px`
            })
          } else {
            if (placement === 'top') {
              panelPlacement = 'top'
              panelStyle.bottom = `${targetHeight}px`
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top'
                  panelStyle.bottom = `${targetHeight}px`
                }
              }
            }
          }
          this.panelStyle = panelStyle
          this.panelPlacement = panelPlacement
          return this.$nextTick()
        }
      })
    },
    // 弹出面板

    // 全局事件
    handleGlobalMousedownEvent (evnt) {
      const { $refs, $el, disabled, visiblePanel, isActivated } = this
      if (!disabled && isActivated) {
        this.isActivated = DomTools.getEventTargetNode(evnt, $el).flag || DomTools.getEventTargetNode(evnt, $refs.panel).flag
        if (!this.isActivated) {
          // 如果是日期类型
          if (this.isDatePickerType) {
            if (visiblePanel) {
              this.hidePanel()
              this.afterCheckValue()
            }
          } else {
            this.afterCheckValue()
          }
        }
      }
    },
    handleGlobalKeydownEvent (evnt) {
      const { isDatePickerType, visiblePanel, clearable, disabled } = this
      if (!disabled) {
        const keyCode = evnt.keyCode
        const isTab = keyCode === 9
        const isDel = keyCode === 46
        const isEsc = keyCode === 27
        const isEnter = keyCode === 13
        const isLeftArrow = keyCode === 37
        const isUpArrow = keyCode === 38
        const isRightArrow = keyCode === 39
        const isDwArrow = keyCode === 40
        const isPgUp = keyCode === 33
        const isPgDn = keyCode === 34
        const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
        let isActivated = this.isActivated
        if (isTab) {
          if (isActivated) {
            this.afterCheckValue()
          }
          isActivated = false
          this.isActivated = isActivated
        } else if (operArrow) {
          if (isDatePickerType) {
            if (isActivated) {
              if (visiblePanel) {
                this.dateOffsetEvent(evnt)
              } else if (isUpArrow || isDwArrow) {
                this.datePickerOpenEvent(evnt)
              }
            }
          }
        } else if (isEnter) {
          if (isDatePickerType) {
            if (visiblePanel) {
              if (this.datePanelValue) {
                this.dateSelectItem(this.datePanelValue)
              } else {
                this.hidePanel()
              }
            } else if (isActivated) {
              this.datePickerOpenEvent(evnt)
            }
          }
        } else if (isPgUp || isPgDn) {
          if (isDatePickerType) {
            if (isActivated) {
              this.datePgOffsetEvent(evnt)
            }
          }
        }
        if (isTab || isEsc) {
          if (visiblePanel) {
            this.hidePanel()
          }
        } else if (isDel && clearable) {
          if (isActivated) {
            this.clearValueEvent(evnt, null)
          }
        }
      }
    },
    handleGlobalMousewheelEvent (evnt) {
      const { $refs, disabled, visiblePanel } = this
      if (!disabled) {
        if (visiblePanel) {
          if (DomTools.getEventTargetNode(evnt, $refs.panel).flag) {
            this.updatePlacement()
          } else {
            this.hidePanel()
            this.afterCheckValue()
          }
        }
      }
    },
    handleGlobalBlurEvent () {
      const { isActivated, visiblePanel } = this
      if (visiblePanel) {
        this.hidePanel()
        this.afterCheckValue()
      } else if (isActivated) {
        this.afterCheckValue()
      }
    }
    // 全局事件
  }
}
