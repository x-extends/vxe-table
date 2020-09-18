import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

const browse = DomTools.browse
const wheelName = browse.firefox ? 'DOMMouseScroll' : 'mousewheel'

const yearSize = 20
const monthSize = 20

function toStringTime (str) {
  if (str) {
    const rest = new Date()
    let h, m, s
    if (XEUtils.isDate(str)) {
      h = str.getHours()
      m = str.getMinutes()
      s = str.getSeconds()
    } else {
      str = XEUtils.toString(str)
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

function renderDefaultInput (h, _vm) {
  const { inpAttrs, inpEvents, value } = _vm
  return h('input', {
    ref: 'input',
    class: 'vxe-input--inner',
    domProps: {
      value
    },
    attrs: inpAttrs,
    on: inpEvents
  })
}

function renderDateInput (h, _vm) {
  const { inpAttrs, inpEvents, inputValue } = _vm
  return h('input', {
    ref: 'input',
    class: 'vxe-input--inner',
    domProps: {
      value: inputValue
    },
    attrs: inpAttrs,
    on: inpEvents
  })
}

function renderDateLabel (h, _vm, item, label) {
  const festivalMethod = _vm.festivalMethod
  if (festivalMethod) {
    const festivalRest = festivalMethod({ type: _vm.datePanelType, ...item })
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
        }, XEUtils.toString(extraItem.label))
      ] : label)
    ]
    const festivalLabel = festivalItem.label
    if (festivalLabel) {
      // 默认最多支持3个节日重叠
      const festivalLabels = XEUtils.toString(festivalLabel).split(',')
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
  const disabledMethod = _vm.disabledMethod || _vm.dateOpts.disabledMethod
  return disabledMethod && disabledMethod({ type: _vm.type, date: item.date })
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
  const matchFormat = 'yyyy-MM'
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
  const { type, vSize, isDatePicker, transfer, animatVisible, visiblePanel, panelPlacement, panelStyle } = _vm
  const renders = []
  if (isDatePicker) {
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
        'data-placement': panelPlacement
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
  const { $scopedSlots, value, isClearable, disabled, suffixIcon } = _vm
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
      'is--clear': isClearable && !disabled && !(value === '' || XEUtils.eqNull(value))
    }],
    on: {
      click: _vm.clickSuffixEvent
    }
  }, icons) : null
}

function renderExtraSuffixIcon (h, _vm) {
  const { controls, isPassword, isNumber, isDatePicker, isSearch } = _vm
  let icons
  if (controls) {
    if (isPassword) {
      icons = renderPasswordIcon(h, _vm)
    } else if (isNumber) {
      icons = renderNumberIcon(h, _vm)
    } else if (isDatePicker) {
      icons = renderDatePickerIcon(h, _vm)
    } else if (isSearch) {
      icons = renderSearchIcon(h, _vm)
    }
  }
  return icons ? h('span', {
    class: 'vxe-input--extra-suffix'
  }, [icons]) : null
}

export default {
  name: 'VxeInput',
  props: {
    value: [String, Number, Date],
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
    size: { type: String, default: () => GlobalConfig.input.size || GlobalConfig.size },

    // number、integer、float
    min: { type: [String, Number], default: null },
    max: { type: [String, Number], default: null },
    step: [String, Number],

    // number、integer、float、password
    controls: { type: Boolean, default: () => GlobalConfig.input.controls },

    // float
    digits: { type: [String, Number], default: () => GlobalConfig.input.digits },

    // date、week、month、year
    dateConfig: Object,
    minDate: { type: [String, Number, Date], default: () => GlobalConfig.input.minDate },
    maxDate: { type: [String, Number, Date], default: () => GlobalConfig.input.maxDate },
    startWeek: { type: Number, default: () => GlobalConfig.input.startWeek },
    labelFormat: { type: String, default: () => GlobalConfig.input.labelFormat },
    parseFormat: { type: String, default: () => GlobalConfig.input.parseFormat },
    valueFormat: { type: String, default: () => GlobalConfig.input.valueFormat },
    editable: { type: Boolean, default: true },
    festivalMethod: { type: Function, default: () => GlobalConfig.input.festivalMethod },
    disabledMethod: { type: Function, default: () => GlobalConfig.input.disabledMethod },

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
      inputValue: '',
      datetimePanelValue: null,
      datePanelValue: null,
      datePanelLabel: '',
      datePanelType: 'day',
      selectMonth: null,
      currentDate: null
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isNumber () {
      return ['number', 'integer', 'float'].indexOf(this.type) > -1
    },
    isDatePicker () {
      return this.hasTime || ['date', 'week', 'month', 'year'].indexOf(this.type) > -1
    },
    hasTime () {
      const { type } = this
      return type === 'time' || type === 'datetime'
    },
    isPassword () {
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
      return this.clearable && (this.isPassword || this.isNumber || this.isDatePicker || this.type === 'text' || this.type === 'search')
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
      const { value, isDatePicker, type, dateValueFormat } = this
      if (value && isDatePicker) {
        if (type === 'time') {
          return toStringTime(value, dateValueFormat)
        }
        return XEUtils.toStringDate(value, dateValueFormat)
      }
      return null
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
      if (this.isDatePicker) {
        return this.labelFormat || this.dateOpts.labelFormat || GlobalConfig.i18n(`vxe.input.date.labelFormat.${this.type}`)
      }
      return null
    },
    dateValueFormat () {
      const { type } = this
      return type === 'time' ? 'HH:mm:ss' : (this.valueFormat || this.dateOpts.valueFormat || (type === 'datetime' ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'))
    },
    selectDatePanelLabel () {
      if (this.isDatePicker) {
        const { datePanelType, selectMonth, yearList } = this
        let year = ''
        let month
        if (selectMonth) {
          year = selectMonth.getFullYear()
          month = selectMonth.getMonth() + 1
        }
        if (datePanelType === 'month') {
          return XEUtils.template(GlobalConfig.i18n('vxe.input.date.monthLabel'), [year])
        } else if (datePanelType === 'year') {
          return yearList.length ? `${yearList[0].year} - ${yearList[yearList.length - 1].year}` : ''
        }
        return XEUtils.template(GlobalConfig.i18n('vxe.input.date.dayLabel'), [year, month ? GlobalConfig.i18n(`vxe.input.date.m${month}`) : '-'])
      }
      return ''
    },
    weekDatas () {
      const weeks = []
      if (this.isDatePicker) {
        let sWeek = XEUtils.toNumber(XEUtils.isNumber(this.startWeek) ? this.startWeek : this.dateOpts.startWeek)
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
      if (this.isDatePicker) {
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
      if (this.isDatePicker) {
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
    dateOpts () {
      return Object.assign({}, this.dateConfig, GlobalConfig.input.dateConfig)
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
    inpAttrs () {
      const { isDatePicker, isNumber, isPassword, type, name, placeholder, readonly, disabled, maxlength, form, autocomplete, showPwd, editable } = this
      let inputType = type
      if (isDatePicker || isNumber || (isPassword && showPwd) || type === 'number') {
        inputType = 'text'
      }
      const attrs = {
        name,
        form,
        type: inputType,
        placeholder,
        maxlength: isNumber && !XEUtils.toNumber(maxlength) ? 16 : maxlength, // 数值最大长度限制 16 位，包含小数
        readonly: readonly || type === 'week' || !editable || this.dateOpts.editable === false,
        disabled,
        autocomplete
      }
      if (placeholder) {
        attrs.placeholder = UtilTools.getFuncText(placeholder)
      }
      return attrs
    },
    inpEvents () {
      const evnts = {}
      XEUtils.each(this.$listeners, (cb, name) => {
        if (['change', 'clear', 'prefix-click', 'suffix-click'].indexOf(name) === -1) {
          evnts[name] = this.triggerEvent
        }
      })
      if (this.isNumber) {
        evnts.keydown = this.keydownEvent
        evnts[wheelName] = this.mousewheelEvent
      } else if (this.isDatePicker) {
        evnts.click = this.clickEvent
      }
      evnts.input = this.inputEvent
      evnts.focus = this.focusEvent
      evnts.blur = this.blurEvent
      return evnts
    }
  },
  watch: {
    value () {
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
    if (this.isDatePicker) {
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
    const { controls, isDatePicker, visiblePanel, isActivated, vSize, type, align, readonly, disabled } = this
    const childs = []
    const prefix = rendePrefixIcon(h, this)
    const suffix = renderSuffixIcon(h, this)
    // 前缀图标
    if (prefix) {
      childs.push(prefix)
    }
    // 输入框
    childs.push(isDatePicker ? renderDateInput(h, this) : renderDefaultInput(h, this))
    // 后缀图标
    if (suffix) {
      childs.push(suffix)
    }
    // 特殊功能图标
    childs.push(renderExtraSuffixIcon(h, this))
    // 面板容器
    if (isDatePicker) {
      childs.push(renderPanel(h, this))
    }
    return h('div', {
      class: ['vxe-input', `type--${type}`, {
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
      this.$refs.input.focus()
      return this.$nextTick()
    },
    blur () {
      this.$refs.input.blur()
      return this.$nextTick()
    },
    triggerEvent (evnt) {
      const { $refs, value } = this
      this.$emit(evnt.type, { $panel: $refs.panel, value, $event: evnt }, evnt)
    },
    emitUpdate (value, evnt) {
      if (XEUtils.toString(this.value) !== value) {
        this.$emit('input', value)
        this.$emit('change', { value, $event: evnt })
      }
    },
    inputEvent (evnt) {
      const { isDatePicker } = this
      const value = evnt.target.value
      this.inputValue = value
      if (!isDatePicker) {
        this.emitUpdate(value, evnt)
      }
    },
    focusEvent (evnt) {
      this.isActivated = true
      this.triggerEvent(evnt)
    },
    blurEvent (evnt) {
      this.afterCheckValue()
      this.triggerEvent(evnt)
    },
    keydownEvent (evnt) {
      if (this.isNumber) {
        const isCtrlKey = evnt.ctrlKey
        const isShiftKey = evnt.shiftKey
        const isAltKey = evnt.altKey
        const keyCode = evnt.keyCode
        if (!isCtrlKey && !isShiftKey && !isAltKey && (keyCode === 32 || (keyCode >= 65 && keyCode <= 90))) {
          evnt.preventDefault()
        }
        this.numberKeydownEvent(evnt)
      }
      this.triggerEvent(evnt)
    },
    mousewheelEvent (evnt) {
      if (this.isNumber && this.controls) {
        if (this.isActivated) {
          const delta = -evnt.wheelDelta || evnt.detail
          if (delta > 0) {
            this.numberNextEvent(evnt)
          } else if (delta < 0) {
            this.numberPrevEvent(evnt)
          }
          evnt.preventDefault()
        }
      }
    },
    clickEvent (evnt) {
      const { isDatePicker } = this
      if (isDatePicker) {
        this.datePickerOpenEvent(evnt)
      }
      this.triggerEvent(evnt)
    },
    clickPrefixEvent (evnt) {
      const { $refs, disabled, value } = this
      if (!disabled) {
        this.$emit('prefix-click', { $panel: $refs.panel, value, $event: evnt }, evnt)
      }
    },
    clickSuffixEvent (evnt) {
      const { $refs, disabled, value } = this
      if (!disabled) {
        if (DomTools.hasClass(evnt.currentTarget, 'is--clear')) {
          this.emitUpdate('', evnt)
          this.clearValueEvent(evnt, '')
        } else {
          this.$emit('suffix-click', { $panel: $refs.panel, value, $event: evnt }, evnt)
        }
      }
    },
    clearValueEvent (evnt, value) {
      const { $refs, type, isNumber } = this
      if (this.isDatePicker) {
        this.hidePanel()
      }
      if (isNumber || ['text', 'password'].indexOf(type) > -1) {
        this.focus()
      }
      this.$emit('clear', { $panel: $refs.panel, value, $event: evnt }, evnt)
    },
    /**
     * 检查初始值
     */
    initValue () {
      const { type, isDatePicker, value, digitsValue } = this
      if (isDatePicker) {
        this.changeValue()
      } else if (type === 'float') {
        if (value) {
          const validValue = XEUtils.toFixed(XEUtils.floor(value, digitsValue), digitsValue)
          if (value !== validValue) {
            this.emitUpdate(validValue, { type: 'init' })
          }
        }
      }
    },
    /**
     * 值变化时处理
     */
    changeValue () {
      if (this.isDatePicker) {
        this.dateParseValue(this.value)
        this.inputValue = this.datePanelLabel
      }
    },
    afterCheckValue () {
      const { type, inpAttrs, value, inputValue, isDatePicker, isNumber, datetimePanelValue, dateLabelFormat, min, max, digitsValue } = this
      if (!inpAttrs.readonly) {
        if (isNumber) {
          if (value) {
            let inpVal = type === 'integer' ? XEUtils.toInteger(value) : XEUtils.toNumber(value)
            if (!this.vaildMinNum(inpVal)) {
              inpVal = min
            } else if (!this.vaildMaxNum(inpVal)) {
              inpVal = max
            }
            this.emitUpdate(type === 'float' ? XEUtils.toFixed(XEUtils.floor(inpVal, digitsValue), digitsValue) : XEUtils.toString(inpVal), { type: 'check' })
          }
        } else if (isDatePicker) {
          let inpVal = inputValue
          if (inpVal) {
            if (type === 'time') {
              inpVal = toStringTime(inpVal, dateLabelFormat)
            } else {
              inpVal = XEUtils.toStringDate(inpVal, dateLabelFormat)
            }
            if (XEUtils.isValidDate(inpVal)) {
              if (type === 'time') {
                inpVal = XEUtils.toDateString(inpVal, dateLabelFormat)
                if (value !== inpVal) {
                  this.emitUpdate(inpVal, { type: 'check' })
                }
                this.inputValue = inpVal
              } else {
                if (!XEUtils.isDateSame(value, inpVal, dateLabelFormat)) {
                  if (type === 'datetime') {
                    datetimePanelValue.setHours(inpVal.getHours())
                    datetimePanelValue.setMinutes(inpVal.getMinutes())
                    datetimePanelValue.setSeconds(inpVal.getSeconds())
                  }
                  this.dateChange(inpVal)
                } else {
                  this.inputValue = XEUtils.toDateString(value, dateLabelFormat)
                }
              }
            } else {
              this.dateRevert()
            }
          } else {
            this.emitUpdate('', { type: 'check' })
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
      const { type, digitsValue, value, stepValue } = this
      const inputValue = type === 'integer' ? XEUtils.toInteger(value) : XEUtils.toNumber(value)
      const newValue = isPlus ? XEUtils.add(inputValue, stepValue) : XEUtils.subtract(inputValue, stepValue)
      if (this.vaildMinNum(newValue) && this.vaildMaxNum(newValue)) {
        this.emitUpdate(type === 'float' ? XEUtils.toFixed(XEUtils.floor(newValue, digitsValue), digitsValue) : XEUtils.toString(newValue), evnt)
      }
    },
    // 数值

    // 日期
    datePickerOpenEvent (evnt) {
      evnt.preventDefault()
      this.showPanel()
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
      if (datePanelType === 'month') {
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
        } else if (type === 'month') {
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
        } else if (type === 'month') {
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
        this.$emit('date-prev', { type, $event: evnt })
      }
    },
    dateSelectEvent (item) {
      if (!isDateDisabled(this, item)) {
        this.dateSelectItem(item.date)
      }
    },
    dateSelectItem (date) {
      const { type, datePanelType } = this
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
    },
    dateMouseenterEvent (item) {
      if (!isDateDisabled(this, item)) {
        const { datePanelType } = this
        if (datePanelType === 'month') {
          this.dateMoveMonth(item.date)
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
        if (!this.dayList.some(item => XEUtils.isDateSame(item.date, offsetDay, 'yyyy-MM-dd'))) {
          this.dateCheckMonth(offsetDay)
        }
        this.dateParseValue(offsetDay)
      }
    },
    dateMoveMonth (offsetMonth) {
      if (!isDateDisabled(this, { date: offsetMonth })) {
        if (!this.monthList.some(item => XEUtils.isDateSame(item.date, offsetMonth, 'yyyy-MM'))) {
          this.dateCheckMonth(offsetMonth)
        }
        this.dateParseValue(offsetMonth)
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
      const { type, dateLabelFormat, parseFormat } = this
      let dValue = null
      let dLabel = ''
      if (date) {
        if (type === 'time') {
          dValue = toStringTime(date, parseFormat || this.dateOpts.parseFormat)
        } else {
          dValue = XEUtils.toStringDate(date, parseFormat || this.dateOpts.parseFormat)
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
        const sWeek = XEUtils.toNumber(XEUtils.isNumber(this.startWeek) ? this.startWeek : this.dateOpts.startWeek)
        date = XEUtils.getWhatWeek(date, 0, sWeek)
      } else if (this.hasTime) {
        date.setHours(datetimePanelValue.getHours())
        date.setMinutes(datetimePanelValue.getMinutes())
        date.setSeconds(datetimePanelValue.getSeconds())
      }
      const inpVal = XEUtils.toDateString(date, dateValueFormat)
      this.dateCheckMonth(date)
      if (!XEUtils.isEqual(value, inpVal)) {
        this.emitUpdate(inpVal, { type: 'update' })
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
      if (['year', 'month', 'week'].indexOf(type) > -1) {
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
      const { disabled, visiblePanel, isDatePicker } = this
      if (!disabled && !visiblePanel) {
        clearTimeout(this.hidePanelTimeout)
        this.isActivated = true
        this.animatVisible = true
        if (isDatePicker) {
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
          if (this.isDatePicker) {
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
      const { isDatePicker, visiblePanel, clearable, disabled } = this
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
          if (isDatePicker) {
            if (isActivated) {
              if (visiblePanel) {
                this.dateOffsetEvent(evnt)
              } else if (isUpArrow || isDwArrow) {
                evnt.preventDefault()
                this.showPanel()
              }
            }
          }
        } else if (isEnter) {
          if (isDatePicker) {
            if (visiblePanel) {
              if (this.datePanelValue) {
                this.dateSelectItem(this.datePanelValue)
              } else {
                this.hidePanel()
              }
            } else if (isActivated) {
              this.showPanel()
            }
          }
        } else if (isPgUp || isPgDn) {
          if (isDatePicker) {
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
