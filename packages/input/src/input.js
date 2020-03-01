import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

function getNumberDecimal (num) {
  return (('' + num).split('.')[1] || '').length
}

function addition (num1, num2) {
  const ratio = Math.pow(10, Math.max(getNumberDecimal(num1), getNumberDecimal(num2)))
  return (num1 * ratio + num2 * ratio) / ratio
}

function subtraction (num1, num2) {
  const digit1 = getNumberDecimal(num1)
  const digit2 = getNumberDecimal(num2)
  const ratio = Math.pow(10, Math.max(digit1, digit2))
  const precision = (digit1 >= digit2) ? digit1 : digit2
  return parseFloat(((num1 * ratio - num2 * ratio) / ratio).toFixed(precision))
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

function renderDateDayTable (h, _vm) {
  const { datePanelType, dateValue, datePanelValue, weekDatas, dayDatas } = _vm
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
        h('tr', weekDatas.map(day => {
          return h('th', GlobalConfig.i18n(`vxe.input.date.weeks.w${day}`))
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
              'is--selected': XEUtils.isDateSame(dateValue, item.date, 'yyyy-MM-dd'),
              'is--hover': XEUtils.isDateSame(datePanelValue, item.date, 'yyyy-MM-dd')
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
  const { datePanelType, monthDatas, datePanelValue } = _vm
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
              'is--hover': XEUtils.isDateSame(datePanelValue, item.date, 'MM')
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
  const { datePanelType, yearDatas, datePanelValue } = _vm
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
              'is--hover': XEUtils.isDateSame(datePanelValue, item.date, 'yyyy')
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
  if (datePanelType === 'month') {
    return renderDateMonthTable(h, _vm)
  } else if (datePanelType === 'year') {
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
            click: _vm.datePrevMonthEvent
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
            click: _vm.dateNextMonthEvent
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

function renderPanel (h, _vm) {
  const { type, vSize, isDatePicker, transfer, animatVisible, visiblePanel, panelPlacement, panelStyle } = _vm
  return isDatePicker ? h('div', {
    ref: 'panel',
    class: ['vxe-dropdown--panel vxe-input--panel', `type--${type}`, {
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
    h('div', {
      class: 'vxe-input--panel-wrapper'
    }, rendeDatePanel(h, _vm))
  ]) : null
}

function renderNumberIcon (h, _vm) {
  return h('span', {
    class: 'vxe-input--number'
  }, [
    h('span', {
      class: 'vxe-input--number-prev',
      on: {
        click: _vm.numberPrevEvent
      }
    }, [
      h('i', {
        class: ['vxe-input--number-prev-icon', GlobalConfig.icon.inputPrevNum]
      })
    ]),
    h('span', {
      class: 'vxe-input--number-next',
      on: {
        click: _vm.numberNextEvent
      }
    }, [
      h('i', {
        class: ['vxe-input--number-next-icon', GlobalConfig.icon.inputNextNum]
      })
    ])
  ])
}

function renderPasswordIcon (h, _vm) {
  const { showPwd } = _vm
  return h('span', {
    class: 'vxe-input--password',
    on: {
      click: _vm.passwordToggleEvent
    }
  }, [
    h('i', {
      class: ['vxe-input--pwd-icon', showPwd ? GlobalConfig.icon.inputShowPwd : GlobalConfig.icon.inputPwd]
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
      class: ['vxe-input--clear-icon', GlobalConfig.icon.inputClear]
    }) : null
  ]) : null
}

function renderExtraPrefixIcon (h, _vm) {
  const { isDatePicker } = _vm
  return isDatePicker ? h('span', {
    class: 'vxe-input--extra-prefix'
  }, [
    h('span', {
      class: 'vxe-input--date-picker'
    }, [
      h('i', {
        class: ['vxe-input--date-picker-icon', GlobalConfig.icon.inputDate]
      })
    ])
  ]) : null
}

function renderExtraSuffixIcon (h, _vm) {
  const { isPassword, isNumber, isDatePicker } = _vm
  return isPassword || isNumber || isDatePicker ? h('span', {
    class: 'vxe-input--extra-suffix'
  }, [
    isPassword ? renderPasswordIcon(h, _vm) : null,
    isNumber ? renderNumberIcon(h, _vm) : null
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
    labelFormat: { type: String, default: () => GlobalConfig.input.labelFormat },
    parseFormat: { type: String, default: () => GlobalConfig.input.parseFormat },
    valueFormat: { type: String, default: () => GlobalConfig.input.valueFormat },
    startWeek: { type: [Number, String], default: () => GlobalConfig.input.startWeek },
    size: String,
    step: [String, Number],
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
      return ['number', 'integer'].indexOf(this.type) > -1
    },
    isDatePicker () {
      return ['date', 'month', 'year'].indexOf(this.type) > -1
    },
    isPassword () {
      return this.type === 'password'
    },
    stepValue () {
      return (this.type === 'integer' ? XEUtils.toInteger(this.step) : XEUtils.toNumber(this.step)) || 1
    },
    isClearable () {
      return this.clearable && (this.isPassword || this.isNumber || this.type === 'text' || this.type === 'search')
    },
    dateValue () {
      const { value } = this
      return value ? XEUtils.toStringDate(value, this.dateLabelFormat) : null
    },
    dateLabelFormat () {
      const { labelFormat } = this
      if (labelFormat) {
        return labelFormat
      }
      return 'yyyy-MM-dd'
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
      let startWeek = XEUtils.toNumber(this.startWeek)
      const weeks = [startWeek]
      for (let index = 0; index < 6; index++) {
        if (startWeek >= 6) {
          startWeek = 0
        } else {
          startWeek++
        }
        weeks.push(startWeek)
      }
      return weeks
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
        for (let index = 0; index < 12; index++) {
          const date = XEUtils.getWhatYear(selectMonth, 0, index)
          months.push({
            date,
            month: index
          })
        }
      }
      return months
    },
    monthDatas () {
      return XEUtils.chunk(this.monthList, 4)
    },
    dayList () {
      const { weekDatas, selectMonth, currentDate } = this
      const days = []
      if (selectMonth && currentDate) {
        const currentMonth = selectMonth.getMonth()
        const selectDay = selectMonth.getDay()
        const prevOffsetDay = -weekDatas.indexOf(selectDay)
        const prevDaySize = Math.abs(prevOffsetDay)
        const startDay = XEUtils.getWhatDay(selectMonth, prevOffsetDay)
        for (let index = 0; index < 42; index++) {
          const date = XEUtils.getWhatDay(startDay, index)
          const isPrev = index < prevDaySize
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
    inpAttrs () {
      const { isDatePicker, isPassword, type, name, placeholder, readonly, disabled, maxlength, form, autocomplete, showPwd } = this
      const attrs = {
        name,
        form,
        type,
        placeholder,
        maxlength,
        readonly,
        disabled,
        autocomplete
      }
      if (isDatePicker || (isPassword && showPwd)) {
        attrs.type = 'text'
      }
      if (placeholder) {
        attrs.placeholder = UtilTools.getFuncText(placeholder)
      }
      return attrs
    },
    inpEvents () {
      const evnts = {}
      XEUtils.each(this.$listeners, (cb, name) => {
        if (['clear', 'prefix-click', 'suffix-click'].indexOf(name) === -1) {
          evnts[name] = this.triggerEvent
        }
      })
      if (this.isNumber) {
        evnts.keydown = this.keydownEvent
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
    }
  },
  created () {
    this.changeValue()
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
  },
  mounted () {
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
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'keydown')
    GlobalEvent.off(this, 'mousewheel')
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
      renderExtraPrefixIcon(h, this),
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
      this.$emit(evnt.type, { $panel: $refs.panel, value }, evnt)
    },
    emitUpdate (value) {
      this.$emit('input', value)
    },
    inputEvent (evnt) {
      const { isDatePicker } = this
      const value = evnt.target.value
      this.inputValue = value
      if (!isDatePicker) {
        this.emitUpdate(value)
      }
    },
    focusEvent (evnt) {
      this.isActivated = true
      this.triggerEvent(evnt)
    },
    keydownEvent (evnt) {
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
      this.triggerEvent(evnt)
    },
    clickEvent (evnt) {
      const { isDatePicker } = this
      if (isDatePicker) {
        evnt.preventDefault()
        this.showPanel()
      }
      this.triggerEvent(evnt)
    },
    clickPrefixEvent (evnt) {
      const { $refs, disabled, value } = this
      if (!disabled) {
        this.$emit('prefix-click', { $panel: $refs.panel, value }, evnt)
      }
    },
    clickSuffixEvent (evnt) {
      const { $refs, disabled, value } = this
      if (!disabled) {
        if (DomTools.hasClass(evnt.currentTarget, 'is--clear')) {
          this.emitUpdate('')
          this.clearValueEvent(evnt, '')
        } else {
          this.$emit('suffix-click', { $panel: $refs.panel, value }, evnt)
        }
      }
    },
    clearValueEvent (evnt, value) {
      const { $refs } = this
      this.$emit('clear', { $panel: $refs.panel, value }, evnt)
    },
    changeValue () {
      if (this.isDatePicker) {
        this.dateParseValue(this.value)
        this.inputValue = this.datePanelLabel
      }
    },
    afterCheckValue () {
      const { type, value, isDatePicker, isNumber, dateLabelFormat } = this
      let inpVal = this.inputValue
      if (isNumber) {
        if (inpVal) {
          if (type === 'integer') {
            inpVal = XEUtils.toInteger(inpVal)
          } else {
            inpVal = XEUtils.toNumber(inpVal)
          }
          if (!XEUtils.isEqual(value, inpVal)) {
            this.emitUpdate(inpVal)
          }
        }
      } else if (isDatePicker) {
        if (inpVal) {
          inpVal = XEUtils.toStringDate(inpVal, dateLabelFormat)
          if (XEUtils.isDate(inpVal)) {
            if (!XEUtils.isEqual(value, inpVal)) {
              this.dateChangeValue(inpVal)
            }
          } else {
            this.dateRevertValue()
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
    numberPrevEvent () {
      const { disabled, readonly } = this
      if (!disabled && !readonly) {
        this.numberChange(true)
      }
    },
    numberNextEvent () {
      const { disabled, readonly } = this
      if (!disabled && !readonly) {
        this.numberChange(false)
      }
    },
    numberChange (isPlus) {
      const { value, stepValue } = this
      const num = this.type === 'integer' ? XEUtils.toInteger(value) : XEUtils.toNumber(value)
      this.emitUpdate(isPlus ? addition(num, stepValue) : subtraction(num, stepValue))
    },
    // 数值

    // 日期
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
    datePrevMonthEvent () {
      const { type } = this
      if (type === 'year') {
        this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -16, 'first')
      } else if (type === 'month') {
        this.selectMonth = XEUtils.getWhatYear(this.selectMonth, -1, 'first')
      } else {
        this.selectMonth = XEUtils.getWhatMonth(this.selectMonth, -1, 'first')
      }
    },
    dateTodayMonthEvent () {
      this.dateNowHandle()
      this.dateChangeValue(this.currentDate)
      this.hidePanel()
    },
    dateNextMonthEvent () {
      const { type } = this
      if (type === 'year') {
        this.selectMonth = XEUtils.getWhatYear(this.selectMonth, 16, 'first')
      } else if (type === 'month') {
        this.selectMonth = XEUtils.getWhatYear(this.selectMonth, 1, 'first')
      } else {
        this.selectMonth = XEUtils.getWhatMonth(this.selectMonth, 1, 'first')
      }
    },
    dateSelectEvent (item) {
      this.dateSelectItem(item.date)
    },
    dateSelectItem (date) {
      const { type, datePanelType } = this
      if (type === 'month') {
        if (datePanelType === 'year') {
          this.datePanelType = 'month'
        } else {
          this.dateChangeValue(date)
          this.hidePanel()
        }
      } else if (type === 'year') {
        this.dateChangeValue(date)
        this.hidePanel()
      } else {
        if (datePanelType === 'month') {
          this.datePanelType = 'day'
        } else if (datePanelType === 'year') {
          this.datePanelType = 'month'
        } else {
          this.dateChangeValue(date)
          this.hidePanel()
        }
      }
    },
    dateMouseenterEvent (item) {
      const { datePanelType } = this
      if (datePanelType === 'month') {
        this.dateMoveMonth(item.date)
      } else if (datePanelType === 'year') {
        this.dateMoveYear(item.date)
      } else {
        this.dateMoveDay(item.date)
      }
    },
    dateMoveDay (offsetDay) {
      if (!this.dayList.some(item => XEUtils.isDateSame(item.date, offsetDay, 'yyyy-MM-dd'))) {
        this.dateCheckMonth(offsetDay)
      }
      this.dateParseValue(offsetDay)
    },
    dateMoveMonth (offsetMonth) {
      this.dateCheckMonth(offsetMonth)
      this.dateParseValue(offsetMonth)
    },
    dateMoveYear (offsetYear) {
      if (!this.yearList.some(item => XEUtils.isDateSame(item.date, offsetYear, 'yyyy'))) {
        this.dateCheckMonth(offsetYear)
      }
      this.dateParseValue(offsetYear)
    },
    dateParseValue (date) {
      const { dateLabelFormat, parseFormat } = this
      let dValue = date ? XEUtils.toStringDate(date, parseFormat) : null
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
      const keyCode = evnt.keyCode
      const isLeftArrow = keyCode === 37
      const isUpArrow = keyCode === 38
      const isRightArrow = keyCode === 39
      const isDwArrow = keyCode === 40
      if (isActivated) {
        evnt.preventDefault()
        if (datePanelType === 'month') {
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
        } else if (datePanelType === 'year') {
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
    dateChangeValue (date) {
      const { value, valueFormat } = this
      const inpVal = valueFormat ? XEUtils.toDateString(date, valueFormat) : date
      this.dateCheckMonth(date)
      if (!XEUtils.isEqual(value, inpVal)) {
        this.emitUpdate(inpVal)
      }
    },
    dateCheckMonth (date) {
      const month = XEUtils.getWhatMonth(date, 0, 'first')
      if (!XEUtils.isEqual(month, this.selectMonth)) {
        this.selectMonth = month
      }
    },
    dateOpenPanel () {
      const { dateValue } = this
      this.currentDate = XEUtils.getWhatDay(Date.now(), 0, 'first')
      if (dateValue) {
        this.dateMonthHandle(dateValue, 0)
      } else {
        this.dateNowHandle()
      }
    },
    dateRevertValue () {
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
      const { type, disabled, visiblePanel, isDatePicker } = this
      if (!disabled && !visiblePanel) {
        clearTimeout(this.hidePanelTimeout)
        this.isActivated = true
        this.animatVisible = true
        if (isDatePicker) {
          if (['year', 'month'].indexOf(type) > -1) {
            this.datePanelType = type
          } else {
            this.datePanelType = 'day'
          }
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
      this.$nextTick(() => {
        const { $refs, transfer, placement, panelIndex } = this
        const inputElem = $refs.input
        const panelElem = $refs.panel
        const inputHeight = inputElem.offsetHeight
        const inputWidth = inputElem.offsetWidth
        const panelHeight = panelElem.offsetHeight
        const panelStyle = {
          zIndex: panelIndex
        }
        const { boundingTop, boundingLeft, visibleHeight } = DomTools.getAbsolutePos(inputElem)
        let panelPlacement = 'bottom'
        if (transfer) {
          const left = boundingLeft
          let top = boundingTop + inputHeight
          if (placement === 'top') {
            panelPlacement = 'top'
            top = boundingTop - panelHeight
          } else {
            // 如果下面不够放，则向上
            if (top + panelHeight > visibleHeight) {
              panelPlacement = 'top'
              top = boundingTop - panelHeight
            }
            // 如果上面不够放，则向下（优先）
            if (top < 0) {
              panelPlacement = 'bottom'
              top = boundingTop + inputHeight
            }
          }
          Object.assign(panelStyle, {
            left: `${left}px`,
            top: `${top}px`,
            minWidth: `${inputWidth}px`
          })
        } else {
          if (placement === 'top') {
            panelPlacement = 'top'
            panelStyle.bottom = `${inputHeight}px`
          } else {
            // 如果下面不够放，则向上
            if (boundingTop + inputHeight + panelHeight > visibleHeight) {
              panelPlacement = 'top'
              panelStyle.bottom = `${inputHeight}px`
            }
          }
        }
        this.panelStyle = panelStyle
        this.panelPlacement = panelPlacement
      })
    },
    // 弹出面板

    // 全局事件
    handleGlobalMousedownEvent (evnt) {
      const { $refs, $el, disabled, visiblePanel, isActivated } = this
      if (!disabled && isActivated) {
        this.isActivated = DomTools.getEventTargetNode(evnt, $el).flag || DomTools.getEventTargetNode(evnt, $refs.panel).flag
        if (!this.isActivated) {
          if (visiblePanel) {
            this.hidePanel()
          }
          this.afterCheckValue()
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
        const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
        let isActivated = this.isActivated
        if (isTab) {
          isActivated = false
          if (this.isActivated) {
            this.afterCheckValue()
          }
          this.isActivated = isActivated
        } else if (operArrow) {
          if (isDatePicker) {
            this.dateOffsetEvent(evnt)
          }
        }
        if (isEnter) {
          if (isDatePicker) {
            if (visiblePanel) {
              this.dateSelectItem(this.datePanelValue)
            } else if (isActivated) {
              this.showPanel()
            }
          }
        } else if (isTab || isEsc) {
          if (visiblePanel) {
            this.hidePanel()
          }
        }
        if (isDel && clearable) {
          if (isActivated) {
            this.clearValueEvent(evnt, null)
          }
        }
      }
    },
    handleGlobalMousewheelEvent (evnt) {
      const { $refs, $el, visiblePanel } = this
      if (!DomTools.getEventTargetNode(evnt, $el).flag && !DomTools.getEventTargetNode(evnt, $refs.panel).flag) {
        if (visiblePanel) {
          this.hidePanel()
        }
        this.afterCheckValue()
      }
    },
    handleGlobalBlurEvent () {
      const { visiblePanel } = this
      if (visiblePanel) {
        this.hidePanel()
      }
      this.afterCheckValue()
    }
    // 全局事件
  }
}
