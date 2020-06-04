import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

const browse = DomTools.browse
const wheelName = browse.firefox ? 'DOMMouseScroll' : 'mousewheel'

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

function isDateDisabled (_vm, item) {
  const disabledMethod = _vm.disabledMethod || _vm.dateOpts.disabledMethod
  return disabledMethod && disabledMethod({ date: item.date, $input: _vm })
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
              'is--today': item.isToday,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(_vm, item),
              'is--selected': XEUtils.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
            },
            on: {
              click: () => _vm.dateSelectEvent(item),
              mouseenter: () => _vm.dateMouseenterEvent(item)
            }
          }, item.label)
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
              'is--today': item.isToday,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(_vm, item),
              'is--selected': isSelected,
              'is--hover': isHover
            },
            on: {
              click: () => _vm.dateSelectEvent(item),
              mouseenter: () => _vm.dateMouseenterEvent(item)
            }
          }, item.label)
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
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(_vm, item),
              'is--selected': XEUtils.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
            },
            on: {
              click: () => _vm.dateSelectEvent(item),
              mouseenter: () => _vm.dateMouseenterEvent(item)
            }
          }, GlobalConfig.i18n(`vxe.input.date.months.m${item.month}`))
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
              'is--selected': XEUtils.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
            },
            on: {
              click: () => _vm.dateSelectEvent(item),
              mouseenter: () => _vm.dateMouseenterEvent(item)
            }
          }, item.year)
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

function rendeDatePanel (h, _vm) {
  const { datePanelType, selectDatePanelLabel } = _vm
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
          class: 'vxe-input--date-picker-btn vxe-input--date-picker-prev-btn',
          attrs: {
            title: GlobalConfig.i18n('vxe.input.date.prevMonth')
          },
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
          attrs: {
            title: GlobalConfig.i18n('vxe.input.date.today')
          },
          on: {
            click: _vm.dateTodayMonthEvent
          }
        }, [
          h('i', {
            class: 'vxe-icon--dot'
          })
        ]),
        h('span', {
          class: 'vxe-input--date-picker-btn vxe-input--date-picker-next-btn',
          attrs: {
            title: GlobalConfig.i18n('vxe.input.date.nextMonth')
          },
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

function rendeTimePanel (h, _vm) {
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
  return isDatePicker ? h('div', {
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
  }, [
    type === 'datetime' ? h('div', {
      class: 'vxe-input--panel-layout-wrapper'
    }, [
      h('div', {
        class: 'vxe-input--panel-left-wrapper'
      }, rendeDatePanel(h, _vm)),
      h('div', {
        class: 'vxe-input--panel-right-wrapper'
      }, rendeTimePanel(h, _vm))
    ]) : h('div', {
      class: 'vxe-input--panel-wrapper'
    }, rendeDatePanel(h, _vm))
  ]) : null
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

function renderPasswordIcon (h, _vm) {
  const { showPwd } = _vm
  return h('span', {
    class: 'vxe-input--password-suffix',
    on: {
      click: _vm.passwordToggleEvent
    }
  }, [
    h('i', {
      class: ['vxe-input--pwd-icon', showPwd ? GlobalConfig.icon.INPUT_SHOW_PWD : GlobalConfig.icon.INPUT_PWD]
    })
  ])
}

function rendePrefixIcon (h, _vm) {
  const { prefixIcon } = _vm
  return prefixIcon ? h('span', {
    class: 'vxe-input--prefix',
    on: {
      click: _vm.clickPrefixEvent
    }
  }, [
    h('i', {
      class: ['vxe-input--prefix-icon', prefixIcon]
    })
  ]) : null
}

function renderSuffixIcon (h, _vm) {
  const { value, isClearable, disabled, suffixIcon } = _vm
  return isClearable || suffixIcon ? h('span', {
    class: ['vxe-input--suffix', {
      'is--clear': isClearable && !disabled && !(value === '' || XEUtils.eqNull(value))
    }],
    on: {
      click: _vm.clickSuffixEvent
    }
  }, [
    suffixIcon ? h('i', {
      class: ['vxe-input--suffix-icon', suffixIcon]
    }) : null,
    isClearable ? h('i', {
      class: ['vxe-input--clear-icon', GlobalConfig.icon.INPUT_CLEAR]
    }) : null
  ]) : null
}

function renderExtraSuffixIcon (h, _vm) {
  const { isPassword, isNumber, isDatePicker } = _vm
  return isPassword || isNumber || isDatePicker ? h('span', {
    class: 'vxe-input--extra-suffix'
  }, [
    isPassword ? renderPasswordIcon(h, _vm) : null,
    isNumber ? renderNumberIcon(h, _vm) : null,
    isDatePicker ? renderDatePickerIcon(h, _vm) : null
  ]) : null
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
    form: String,
    size: { type: String, default: () => GlobalConfig.input.size || GlobalConfig.size },

    // number、integer、float
    min: { type: [String, Number], default: null },
    max: { type: [String, Number], default: null },
    step: [String, Number],

    // float
    digits: { type: [String, Number], default: () => GlobalConfig.input.digits },

    // date、week、month、year
    dateConfig: Object,
    startWeek: { type: Number, default: () => GlobalConfig.input.startWeek },
    labelFormat: { type: String, default: () => GlobalConfig.input.labelFormat },
    parseFormat: { type: String, default: () => GlobalConfig.input.parseFormat },
    valueFormat: { type: String, default: () => GlobalConfig.input.valueFormat },
    editable: { type: Boolean, default: true },
    disabledMethod: Function,

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
      return ['date', 'datetime', 'week', 'month', 'year'].indexOf(this.type) > -1
    },
    isPassword () {
      return this.type === 'password'
    },
    stepValue () {
      const { type, step } = this
      if (type === 'integer') {
        return XEUtils.toInteger(step) || 1
      } else if (type === 'float') {
        return XEUtils.toNumber(step) || (1 / Math.pow(10, XEUtils.toInteger(this.digits) || 1))
      }
      return XEUtils.toNumber(step) || 1
    },
    isClearable () {
      return this.clearable && (this.isPassword || this.isNumber || this.isDatePicker || this.type === 'text' || this.type === 'search')
    },
    dateValue () {
      const { value } = this
      return value ? XEUtils.toStringDate(value, this.dateValueFormat) : null
    },
    dateTimeLabel () {
      const { datetimePanelValue } = this
      if (datetimePanelValue) {
        return XEUtils.toDateString(datetimePanelValue, 'HH:mm:ss')
      }
      return ''
    },
    hmsTime () {
      const { type, dateValue } = this
      return dateValue && type === 'datetime' ? (dateValue.getHours() * 3600 + dateValue.getMinutes() * 60 + dateValue.getSeconds()) * 1000 : 0
    },
    dateLabelFormat () {
      if (this.isDatePicker) {
        return this.labelFormat || this.dateOpts.labelFormat || GlobalConfig.i18n(`vxe.input.date.labelFormat.${this.type}`)
      }
      return null
    },
    dateValueFormat () {
      return this.valueFormat || this.dateOpts.valueFormat || (this.type === 'datetime' ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd')
    },
    selectDatePanelLabel () {
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
    },
    weekDatas () {
      let sWeek = XEUtils.toNumber(XEUtils.isNumber(this.startWeek) ? this.startWeek : this.dateOpts.startWeek)
      const weeks = [sWeek]
      for (let index = 0; index < 6; index++) {
        if (sWeek >= 6) {
          sWeek = 0
        } else {
          sWeek++
        }
        weeks.push(sWeek)
      }
      return weeks
    },
    dateHeaders () {
      return this.weekDatas.map(day => {
        return {
          value: day,
          label: GlobalConfig.i18n(`vxe.input.date.weeks.w${day}`)
        }
      })
    },
    weekHeaders () {
      return [{ label: GlobalConfig.i18n('vxe.input.date.weeks.w') }].concat(this.dateHeaders)
    },
    yearList () {
      const { selectMonth } = this
      const months = []
      if (selectMonth) {
        for (let index = 0; index < 16; index++) {
          const date = XEUtils.getWhatYear(selectMonth, index, 'first')
          months.push({
            date,
            year: date.getFullYear()
          })
        }
      }
      return months
    },
    yearDatas () {
      return XEUtils.chunk(this.yearList, 4)
    },
    monthList () {
      const { selectMonth } = this
      const months = []
      if (selectMonth) {
        const currFullYear = XEUtils.getWhatYear(selectMonth, 0, 'first').getFullYear()
        for (let index = 0; index < 16; index++) {
          const date = XEUtils.getWhatYear(selectMonth, 0, index)
          const month = date.getMonth()
          const fullYear = date.getFullYear()
          const isPrev = fullYear < currFullYear
          months.push({
            date,
            isPrev,
            isCurrent: fullYear === currFullYear,
            isNext: !isPrev && fullYear > currFullYear,
            month
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
        const currentMonth = selectMonth.getMonth()
        const selectDay = selectMonth.getDay()
        const prevOffsetDay = -weekDatas.indexOf(selectDay)
        const startDay = new Date(XEUtils.getWhatDay(selectMonth, prevOffsetDay).getTime() + hmsTime)
        for (let index = 0; index < 42; index++) {
          const date = XEUtils.getWhatDay(startDay, index)
          const isPrev = date < selectMonth
          days.push({
            date,
            isPrev,
            isCurrent: date.getFullYear() === selectMonth.getFullYear() && date.getMonth() === selectMonth.getMonth(),
            isToday: date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate(),
            isNext: !isPrev && currentMonth !== date.getMonth(),
            label: date.getDate()
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
          isPrev: false,
          isCurrent: false,
          isToday: false,
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
      for (let index = 0; index < 24; index++) {
        list.push({
          value: index,
          label: ('' + index).padStart(2, 0)
        })
      }
      return list
    },
    minuteList () {
      const list = []
      for (let index = 0; index < 60; index++) {
        list.push({
          value: index,
          label: ('' + index).padStart(2, 0)
        })
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
        maxlength: isNumber ? 16 : maxlength, // 数值最大长度限制 16 位，包含小数
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
    const { isClearable, isDatePicker, visiblePanel, isActivated, vSize, type, readonly, disabled, prefixIcon, suffixIcon } = this
    return h('div', {
      class: ['vxe-input', `type--${type}`, {
        [`size--${vSize}`]: vSize,
        'is--prefix': prefixIcon,
        'is--suffix': isClearable || suffixIcon,
        'is--readonly': readonly,
        'is--visivle': visiblePanel,
        'is--disabled': disabled,
        'is--active': isActivated
      }]
    }, [
      rendePrefixIcon(h, this),
      isDatePicker ? renderDateInput(h, this) : renderDefaultInput(h, this),
      renderSuffixIcon(h, this),
      renderExtraSuffixIcon(h, this),
      renderPanel(h, this)
    ])
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
      this.$emit('input', value)
      if (this.value !== value) {
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
    keydownEvent (evnt) {
      if (this.isNumber) {
        const isCtrlKey = evnt.ctrlKey
        const isShiftKey = evnt.shiftKey
        const isAltKey = evnt.altKey
        const keyCode = evnt.keyCode
        const value = evnt.target.value
        if (value && !isCtrlKey && !isShiftKey && !isAltKey && (keyCode === 32 || (keyCode >= 65 && keyCode <= 90))) {
          evnt.preventDefault()
        }
        this.numberKeydownEvent(evnt)
      }
      this.triggerEvent(evnt)
    },
    mousewheelEvent (evnt) {
      if (this.isNumber) {
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
      const { type, isDatePicker, value, digits } = this
      if (isDatePicker) {
        this.changeValue()
      } else if (type === 'float') {
        if (value) {
          const validValue = XEUtils.toFixedString(value, XEUtils.toNumber(digits))
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
      const { type, inpAttrs, value, isDatePicker, isNumber, datetimePanelValue, dateLabelFormat, min, max, digits } = this
      if (!inpAttrs.readonly) {
        if (isNumber) {
          if (value) {
            let inpVal = type === 'integer' ? XEUtils.toInteger(value) : XEUtils.toNumber(value)
            if (!this.vaildMinNum(inpVal)) {
              inpVal = min
            } else if (!this.vaildMaxNum(inpVal)) {
              inpVal = max
            }
            this.emitUpdate(type === 'float' ? XEUtils.toFixedString(inpVal, XEUtils.toNumber(digits)) : '' + inpVal, { type: 'check' })
          }
        } else if (isDatePicker) {
          let inpVal = this.inputValue
          if (inpVal) {
            inpVal = XEUtils.toStringDate(inpVal, dateLabelFormat)
            if (XEUtils.isDate(inpVal)) {
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
    passwordToggleEvent () {
      const { disabled, readonly, showPwd } = this
      if (!disabled && !readonly) {
        this.showPwd = !showPwd
      }
    },
    // 密码

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
    },
    numberNextEvent (evnt) {
      const { disabled, readonly } = this
      clearTimeout(this.downbumTimeout)
      if (!disabled && !readonly) {
        this.numberChange(false, evnt)
      }
    },
    numberChange (isPlus, evnt) {
      const { type, digits, value, stepValue } = this
      const inputValue = type === 'integer' ? XEUtils.toInteger(value) : XEUtils.toNumber(value)
      const newValue = isPlus ? XEUtils.add(inputValue, stepValue) : XEUtils.subtract(inputValue, stepValue)
      if (this.vaildMinNum(newValue) && this.vaildMaxNum(newValue)) {
        this.emitUpdate(type === 'float' ? XEUtils.toFixedString(newValue, XEUtils.toNumber(digits)) : '' + newValue, evnt)
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
    datePrevEvent () {
      const { type, datePanelType } = this
      if (type === 'year') {
        this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -16, 'first')
      } else if (type === 'month') {
        if (datePanelType === 'year') {
          this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -16, 'first')
        } else {
          this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -1, 'first')
        }
      } else {
        if (datePanelType === 'year') {
          this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -16, 'first')
        } else if (datePanelType === 'month') {
          this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -1, 'first')
        } else {
          this.selectMonth = XEUtils.getWhatMonth(this.selectMonth, -1, 'first')
        }
      }
    },
    dateTodayMonthEvent () {
      this.dateNowHandle()
      this.dateChange(this.currentDate)
      this.hidePanel()
    },
    dateNextEvent () {
      const { type, datePanelType } = this
      if (type === 'year') {
        this.selectMonth = XEUtils.getWhatYear(this.selectMonth, 16, 'first')
      } else if (type === 'month') {
        if (datePanelType === 'year') {
          this.selectMonth = XEUtils.getWhatYear(this.selectMonth, 16, 'first')
        } else {
          this.selectMonth = XEUtils.getWhatYear(this.selectMonth, 1, 'first')
        }
      } else {
        if (datePanelType === 'year') {
          this.selectMonth = XEUtils.getWhatYear(this.selectMonth, 16, 'first')
        } else if (datePanelType === 'month') {
          this.selectMonth = XEUtils.getWhatYear(this.selectMonth, 1, 'first')
        } else {
          this.selectMonth = XEUtils.getWhatMonth(this.selectMonth, 1, 'first')
        }
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
        liElem.parentNode.scrollTop = liElem.offsetTop - height * 3
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
      const { dateLabelFormat, parseFormat } = this
      let dValue = date ? XEUtils.toStringDate(date, parseFormat || this.dateOpts.parseFormat) : null
      let dLabel = ''
      if (XEUtils.isDate(dValue)) {
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
      const { value, type, datetimePanelValue, dateValueFormat } = this
      if (type === 'week') {
        const sWeek = XEUtils.toNumber(XEUtils.isNumber(this.startWeek) ? this.startWeek : this.dateOpts.startWeek)
        date = XEUtils.getWhatWeek(date, 0, sWeek)
      } else if (type === 'datetime') {
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
      if (type === 'datetime') {
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
      }, 250)
    },
    updatePlacement () {
      return this.$nextTick().then(() => {
        const { $refs, transfer, placement, panelIndex } = this
        const targetElem = $refs.input
        const panelElem = $refs.panel
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
          } else {
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
          } else {
            // 如果下面不够放，则向上
            if (boundingTop + targetHeight + panelHeight > visibleHeight) {
              panelPlacement = 'top'
              panelStyle.bottom = `${targetHeight}px`
            }
          }
        }
        this.panelStyle = panelStyle
        this.panelPlacement = panelPlacement
        return this.$nextTick()
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
      const { $refs, $el, disabled, visiblePanel } = this
      if (!disabled) {
        if (visiblePanel) {
          const hasSlef = DomTools.getEventTargetNode(evnt, $el).flag
          if (hasSlef || DomTools.getEventTargetNode(evnt, $refs.panel).flag) {
            if (hasSlef) {
              this.updatePlacement()
            }
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
