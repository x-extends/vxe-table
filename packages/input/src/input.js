import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

const yearSize = 20
const monthSize = 20
const quarterSize = 8

function toStringTimeDate (str) {
  if (str) {
    const rest = new Date()
    let h, m, s
    if (XEUtils.isDate(str)) {
      h = str.getHours()
      m = str.getMinutes()
      s = str.getSeconds()
    } else {
      str = XEUtils.toValueString(str)
      const parses = str.match(/^(\d{1,2})(:(\d{1,2}))?(:(\d{1,2}))?/)
      if (parses) {
        h = parses[1]
        m = parses[3]
        s = parses[5]
      }
    }
    rest.setHours(h || 0)
    rest.setMinutes(m || 0)
    rest.setSeconds(s || 0)
    return rest
  }
  return new Date('')
}

function getDateQuarter (date) {
  const month = date.getMonth()
  if (month < 3) {
    return 1
  } else if (month < 6) {
    return 2
  } else if (month < 9) {
    return 3
  }
  return 4
}

function getNumberValue (_vm, val) {
  const { type, exponential, digitsValue, inpMaxlength } = _vm
  const restVal = (type === 'float' ? XEUtils.toFixed(XEUtils.floor(val, digitsValue), digitsValue) : XEUtils.toValueString(val))
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
  const { datePanelType, dateValue, datePanelValue, dateHeaders, dayDatas } = _vm
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
              'is--selected': XEUtils.isDateSame(dateValue, item.date, matchFormat),
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
  const { datePanelType, dateValue, datePanelValue, weekHeaders, weekDates } = _vm
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
        const isSelected = rows.some(item => XEUtils.isDateSame(dateValue, item.date, matchFormat))
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
  const { dateValue, datePanelType, monthDatas, datePanelValue } = _vm
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
              'is--selected': XEUtils.isDateSame(dateValue, item.date, matchFormat),
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
  const { dateValue, datePanelType, quarterDatas, datePanelValue } = _vm
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
              'is--selected': XEUtils.isDateSame(dateValue, item.date, matchFormat),
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
  const { dateValue, datePanelType, yearDatas, datePanelValue } = _vm
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
              'is--disabled': isDateDisabled(_vm, item),
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--selected': XEUtils.isDateSame(dateValue, item.date, matchFormat),
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
  const { datePanelType, selectDatePanelLabel, isDisabledPrevDateBtn, isDisabledNextDateBtn } = _vm
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
            class: 'vxe-icon--caret-left'
          })
        ]),
        h('span', {
          class: 'vxe-input--date-picker-btn vxe-input--date-picker-current-btn',
          on: {
            click: _vm.dateTodayMonthEvent
          }
        }, [
          h('i', {
            class: 'vxe-icon--dot'
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
            class: 'vxe-icon--caret-right'
          })
        ])
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
      class: 'vxe-input--number-prev is--prev',
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
      class: 'vxe-input--number-next is--next',
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
    minDate: { type: [String, Number, Date], default: () => GlobalConfig.input.minDate },
    maxDate: { type: [String, Number, Date], default: () => GlobalConfig.input.maxDate },
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
      return this.hasTime || ['date', 'week', 'month', 'quarter', 'year'].indexOf(this.type) > -1
    },
    hasTime () {
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
      const { selectMonth, dateMinTime } = this
      if (selectMonth) {
        return selectMonth <= dateMinTime
      }
      return false
    },
    isDisabledNextDateBtn () {
      const { selectMonth, dateMaxTime } = this
      if (selectMonth) {
        return selectMonth >= dateMaxTime
      }
      return false
    },
    dateMinTime () {
      return this.minDate ? XEUtils.toStringDate(this.minDate) : null
    },
    dateMaxTime () {
      return this.maxDate ? XEUtils.toStringDate(this.maxDate) : null
    },
    dateValue () {
      const { value, isDatePickerType, type, dateValueFormat } = this
      let val = null
      if (value && isDatePickerType) {
        let date
        if (type === 'time') {
          date = toStringTimeDate(value)
        } else {
          date = XEUtils.toStringDate(value, dateValueFormat)
        }
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
      return dateValue && (this.hasTime) ? (dateValue.getHours() * 3600 + dateValue.getMinutes() * 60 + dateValue.getSeconds()) * 1000 : 0
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
    weekDatas () {
      const weeks = []
      if (this.isDatePickerType) {
        const { startDay, startWeek } = this
        let sWeek = XEUtils.toNumber(XEUtils.isNumber(startDay) || XEUtils.isString(startDay) ? startDay : startWeek)
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
        const startYear = new Date(('' + selectMonth.getFullYear()).replace(/\d{1}$/, '0'), 0, 1)
        for (let index = -10; index < yearSize - 10; index++) {
          const date = XEUtils.getWhatYear(startYear, index, 'first')
          const itemFullYear = date.getFullYear()
          months.push({
            date,
            isCurrent: true,
            isNow: currFullYear === itemFullYear,
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
        const startDate = new Date(XEUtils.getWhatDay(selectMonth, prevOffsetDate).getTime() + hmsTime)
        for (let index = 0; index < 42; index++) {
          const date = XEUtils.getWhatDay(startDate, index)
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
      return this.dayDatas.map(list => {
        const firstItem = list[0]
        const item = {
          date: firstItem.date,
          isWeekNumber: true,
          isPrev: false,
          isCurrent: false,
          isNow: false,
          isNext: false,
          label: XEUtils.getYearWeek(firstItem.date)
        }
        return [item].concat(list)
      })
    },
    hourList () {
      const list = []
      if (this.hasTime) {
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
      if (this.hasTime) {
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
        return UtilTools.getFuncText(placeholder)
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
      const { type, readonly, editable } = this
      return readonly || !editable || (type === 'week' || type === 'quarter')
    }
  },
  watch: {
    value (val) {
      this.inputValue = val
      this.changeValue()
    },
    dateLabelFormat () {
      this.dateParseValue(this.datePanelValue)
      this.inputValue = this.datePanelLabel
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
      UtilTools.warn('vxe.error.removeProp', ['date-config'])
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
    /**
     * 检查初始值
     */
    initValue () {
      const { type, isDatePickerType, inputValue, digitsValue } = this
      if (isDatePickerType) {
        this.changeValue()
      } else if (type === 'float') {
        if (inputValue) {
          const validValue = XEUtils.toFixed(XEUtils.floor(inputValue, digitsValue), digitsValue)
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
        this.inputValue = this.datePanelLabel
      }
    },
    afterCheckValue () {
      const { type, exponential, inpReadonly, inputValue, isDatePickerType, isNumType, datetimePanelValue, dateLabelFormat, min, max } = this
      if (!inpReadonly) {
        if (isNumType) {
          if (inputValue) {
            let inpNumVal = type === 'integer' ? XEUtils.toInteger(inputValue) : XEUtils.toNumber(inputValue)
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
              let inpDateVal
              if (type === 'time') {
                inpDateVal = toStringTimeDate(inputValue)
              } else {
                inpDateVal = XEUtils.toStringDate(inputValue, dateLabelFormat)
              }
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
                  this.inputValue = XEUtils.toDateString(inpDateVal, dateLabelFormat)
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
      const { disabled, readonly } = this
      clearTimeout(this.downbumTimeout)
      if (!disabled && !readonly) {
        this.numberChange(true, evnt)
      }
      this.$emit('prev-number', { $event: evnt })
    },
    numberNextEvent (evnt) {
      const { disabled, readonly } = this
      clearTimeout(this.downbumTimeout)
      if (!disabled && !readonly) {
        this.numberChange(false, evnt)
      }
      this.$emit('next-number', { $event: evnt })
    },
    numberChange (isPlus, evnt) {
      const { min, max, type, inputValue, stepValue } = this
      const numValue = type === 'integer' ? XEUtils.toInteger(inputValue) : XEUtils.toNumber(inputValue)
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
      this.dateChange(this.currentDate)
      this.hidePanel()
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
      const { type, datePanelType } = this
      const isWeekType = type === 'week'
      if (type === 'month') {
        if (datePanelType === 'year') {
          this.datePanelType = 'month'
          this.dateCheckMonth(date)
        } else {
          this.dateChange(date)
          this.hidePanel()
        }
      } else if (type === 'year') {
        this.hidePanel()
        this.dateChange(date)
      } else if (type === 'quarter') {
        if (datePanelType === 'year') {
          this.datePanelType = 'quarter'
          this.dateCheckMonth(date)
        } else {
          this.dateChange(date)
          this.hidePanel()
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
          this.hidePanel()
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
      this.dateChange(this.dateValue || this.currentDate)
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
      const { type, dateLabelFormat, valueFormat } = this
      let dValue = null
      let dLabel = ''
      if (date) {
        if (type === 'time') {
          dValue = toStringTimeDate(date)
        } else {
          dValue = XEUtils.toStringDate(date, valueFormat)
        }
      }
      if (XEUtils.isValidDate(dValue)) {
        dLabel = XEUtils.toDateString(dValue, dateLabelFormat)
      } else {
        dValue = null
      }
      this.datePanelValue = dValue
      this.datePanelLabel = dLabel
    },
    dateOffsetEvent (evnt) {
      const { isActivated, datePanelValue, datePanelType } = this
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
            offsetDay = XEUtils.getWhatWeek(offsetDay, -1)
          } else if (isRightArrow) {
            offsetDay = XEUtils.getWhatDay(offsetDay, 1)
          } else if (isDwArrow) {
            offsetDay = XEUtils.getWhatWeek(offsetDay, 1)
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
      const { value, datetimePanelValue, dateValueFormat } = this
      if (this.type === 'week') {
        const sWeek = XEUtils.toNumber(this.selectDay)
        date = XEUtils.getWhatWeek(date, 0, sWeek)
      } else if (this.hasTime) {
        date.setHours(datetimePanelValue.getHours())
        date.setMinutes(datetimePanelValue.getMinutes())
        date.setSeconds(datetimePanelValue.getSeconds())
      }
      const inpVal = XEUtils.toDateString(date, dateValueFormat)
      this.dateCheckMonth(date)
      if (!XEUtils.isEqual(value, inpVal)) {
        this.emitModel(inpVal, { type: 'update' })
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
      if (this.hasTime) {
        this.datetimePanelValue = this.datePanelValue || XEUtils.getWhatDay(Date.now(), 0, 'first')
        this.$nextTick(() => {
          XEUtils.arrayEach(this.$refs.timeBody.querySelectorAll('li.is--selected'), this.updateTimePos)
        })
      }
    },
    dateRevert () {
      this.inputValue = this.datePanelLabel
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
        this.updatePlacement()
      }
    },
    hidePanel () {
      this.visiblePanel = false
      this.hidePanelTimeout = setTimeout(() => {
        this.animatVisible = false
      }, 350)
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
