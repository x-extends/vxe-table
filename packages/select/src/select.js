import XEUtils from 'xe-utils'
import VxeInput from '../../input/src/input'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

function isOptionVisible (option) {
  return option.visible !== false
}

function getOptUniqueId () {
  return XEUtils.uniqueId('opt_')
}

function getOptkey (_vm) {
  return _vm.optionId || '_XID'
}

function getOptid (_vm, option) {
  const optid = option[getOptkey(_vm)]
  return optid ? encodeURIComponent(optid) : ''
}

function findOffsetOption (_vm, optionValue, isUpArrow) {
  const { isGroup, visibleOptionList, visibleGroupList, valueField, groupOptionsField } = _vm
  let firstOption
  let prevOption
  let nextOption
  let currOption
  if (isGroup) {
    for (let gIndex = 0; gIndex < visibleGroupList.length; gIndex++) {
      const group = visibleGroupList[gIndex]
      const groupOptionList = group[groupOptionsField]
      const isGroupDisabled = group.disabled
      if (groupOptionList) {
        for (let index = 0; index < groupOptionList.length; index++) {
          const option = groupOptionList[index]
          const isVisible = isOptionVisible(option)
          const isDisabled = isGroupDisabled || option.disabled
          if (!firstOption && !isDisabled) {
            firstOption = option
          }
          if (currOption) {
            if (isVisible && !isDisabled) {
              nextOption = option
              if (!isUpArrow) {
                return { offsetOption: nextOption }
              }
            }
          }
          if (optionValue === option[valueField]) {
            currOption = option
            if (isUpArrow) {
              return { offsetOption: prevOption }
            }
          } else {
            if (isVisible && !isDisabled) {
              prevOption = option
            }
          }
        }
      }
    }
  } else {
    for (let index = 0; index < visibleOptionList.length; index++) {
      const option = visibleOptionList[index]
      const isDisabled = option.disabled
      if (!firstOption && !isDisabled) {
        firstOption = option
      }
      if (currOption) {
        if (!isDisabled) {
          nextOption = option
          if (!isUpArrow) {
            return { offsetOption: nextOption }
          }
        }
      }
      if (optionValue === option[valueField]) {
        currOption = option
        if (isUpArrow) {
          return { offsetOption: prevOption }
        }
      } else {
        if (!isDisabled) {
          prevOption = option
        }
      }
    }
  }
  return { firstOption }
}

function findOption (_vm, optionValue) {
  const { isGroup, fullOptionList, fullGroupList, valueField } = _vm
  if (isGroup) {
    for (let gIndex = 0; gIndex < fullGroupList.length; gIndex++) {
      const group = fullGroupList[gIndex]
      if (group.options) {
        for (let index = 0; index < group.options.length; index++) {
          const option = group.options[index]
          if (optionValue === option[valueField]) {
            return option
          }
        }
      }
    }
  }
  return fullOptionList.find(item => optionValue === item[valueField])
}

function getSelectLabel (_vm, value) {
  const item = findOption(_vm, value)
  return XEUtils.toValueString(item ? item[_vm.labelField] : value)
}

export function renderOption (h, _vm, list, group) {
  const { isGroup, labelField, valueField, optionKey, value, multiple, currentValue } = _vm
  return list.map((option, cIndex) => {
    const { slots } = option
    const isVisible = !isGroup || isOptionVisible(option)
    const isDisabled = (group && group.disabled) || option.disabled
    const optionValue = option[valueField]
    const optid = getOptid(_vm, option)
    const defaultSlot = slots ? slots.default : null
    return isVisible ? h('div', {
      key: optionKey ? optid : cIndex,
      class: ['vxe-select-option', option.className, {
        'is--disabled': isDisabled,
        'is--selected': multiple ? (value && value.indexOf(optionValue) > -1) : value === optionValue,
        'is--hover': currentValue === optionValue
      }],
      attrs: {
        optid: optid
      },
      on: {
        mousedown: _vm.mousedownOptionEvent,
        click: (evnt) => {
          if (!isDisabled) {
            _vm.changeOptionEvent(evnt, optionValue)
          }
        },
        mouseenter: () => {
          if (!isDisabled) {
            _vm.setCurrentOption(option)
          }
        }
      }
    }, defaultSlot ? _vm.callSlot(defaultSlot, { option, $select: _vm }, h) : UtilTools.formatText(UtilTools.getFuncText(option[labelField]))) : null
  })
}

export function renderOptgroup (h, _vm) {
  const { optionKey, visibleGroupList, groupLabelField, groupOptionsField } = _vm
  return visibleGroupList.map((group, gIndex) => {
    const { slots } = group
    const optid = getOptid(_vm, group)
    const isGroupDisabled = group.disabled
    const defaultSlot = slots ? slots.default : null
    return h('div', {
      key: optionKey ? optid : gIndex,
      class: ['vxe-optgroup', group.className, {
        'is--disabled': isGroupDisabled
      }],
      attrs: {
        optid: optid
      }
    }, [
      h('div', {
        class: 'vxe-optgroup--title'
      }, defaultSlot ? _vm.callSlot(defaultSlot, { option: group, $select: _vm }, h) : UtilTools.getFuncText(group[groupLabelField])),
      h('div', {
        class: 'vxe-optgroup--wrapper'
      }, renderOption(h, _vm, group[groupOptionsField], group))
    ])
  })
}

function renderOpts (h, _vm) {
  const { isGroup, visibleGroupList, visibleOptionList } = _vm
  if (isGroup) {
    if (visibleGroupList.length) {
      return renderOptgroup(h, _vm)
    }
  } else {
    if (visibleOptionList.length) {
      return renderOption(h, _vm, visibleOptionList)
    }
  }
  return [
    h('div', {
      class: 'vxe-select--empty-placeholder'
    }, _vm.emptyText || GlobalConfig.i18n('vxe.select.emptyText'))
  ]
}

export default {
  name: 'VxeSelect',
  mixins: [vSize],
  props: {
    value: null,
    clearable: Boolean,
    placeholder: String,
    loading: Boolean,
    disabled: Boolean,
    multiple: Boolean,
    multiCharOverflow: { type: [Number, String], default: () => GlobalConfig.select.multiCharOverflow },
    prefixIcon: String,
    placement: String,
    options: Array,
    optionProps: Object,
    optionGroups: Array,
    optionGroupProps: Object,
    className: [String, Function],
    size: { type: String, default: () => GlobalConfig.select.size || GlobalConfig.size },
    emptyText: String,
    optionId: { type: String, default: () => GlobalConfig.select.optionId },
    optionKey: Boolean,
    transfer: { type: Boolean, default: () => GlobalConfig.select.transfer }
  },
  components: {
    VxeInput
  },
  provide () {
    return {
      $xeselect: this
    }
  },
  data () {
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
    }
  },
  computed: {
    propsOpts () {
      return this.optionProps || {}
    },
    groupPropsOpts () {
      return this.optionGroupProps || {}
    },
    labelField () {
      return this.propsOpts.label || 'label'
    },
    valueField () {
      return this.propsOpts.value || 'value'
    },
    groupLabelField () {
      return this.groupPropsOpts.label || 'label'
    },
    groupOptionsField () {
      return this.groupPropsOpts.options || 'options'
    },
    isGroup () {
      return this.fullGroupList.some(item => item.options && item.options.length)
    },
    multiMaxCharNum () {
      return XEUtils.toNumber(this.multiCharOverflow)
    },
    selectLabel () {
      const { value, multiple, multiMaxCharNum } = this
      if (value && multiple) {
        return (XEUtils.isArray(value) ? value : [value]).map(val => {
          const label = getSelectLabel(this, val)
          if (multiMaxCharNum > 0 && label.length > multiMaxCharNum) {
            return `${label.substring(0, multiMaxCharNum)}...`
          }
          return label
        }).join(', ')
      }
      return getSelectLabel(this, value)
    }
  },
  watch: {
    collectOption (value) {
      if (value.some(item => item.options && item.options.length)) {
        this.fullOptionList = []
        this.fullGroupList = value
      } else {
        this.fullGroupList = []
        this.fullOptionList = value
      }
      this.updateCache()
    },
    options (value) {
      this.fullGroupList = []
      this.fullOptionList = value
      this.updateCache()
    },
    optionGroups (value) {
      this.fullOptionList = []
      this.fullGroupList = value
      this.updateCache()
    }
  },
  created () {
    const { options, optionGroups } = this
    if (optionGroups) {
      this.fullGroupList = optionGroups
    } else if (options) {
      this.fullOptionList = options
    }
    this.updateCache()
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
  },
  beforeDestroy () {
    const panelElem = this.$refs.panel
    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem)
    }
  },
  destroyed () {
    GlobalEvent.off(this, 'mousewheel')
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'keydown')
    GlobalEvent.off(this, 'blur')
  },
  render (h) {
    const { $scopedSlots, vSize, className, inited, isActivated, loading, disabled, visiblePanel } = this
    const prefixSlot = $scopedSlots.prefix
    return h('div', {
      class: ['vxe-select', className ? (XEUtils.isFunction(className) ? className({ $select: this }) : className) : '', {
        [`size--${vSize}`]: vSize,
        'is--visivle': visiblePanel,
        'is--disabled': disabled,
        'is--loading': loading,
        'is--active': isActivated
      }]
    }, [
      h('div', {
        class: 'vxe-select-slots',
        ref: 'hideOption'
      }, this.$slots.default),
      h('vxe-input', {
        ref: 'input',
        props: {
          clearable: this.clearable,
          placeholder: this.placeholder,
          readonly: true,
          disabled: disabled,
          type: 'text',
          prefixIcon: this.prefixIcon,
          suffixIcon: loading ? GlobalConfig.icon.SELECT_LOADED : (visiblePanel ? GlobalConfig.icon.SELECT_OPEN : GlobalConfig.icon.SELECT_CLOSE),
          value: this.selectLabel
        },
        on: {
          clear: this.clearEvent,
          click: this.togglePanelEvent,
          focus: this.focusEvent,
          blur: this.blurEvent,
          'suffix-click': this.togglePanelEvent
        },
        scopedSlots: prefixSlot ? {
          prefix: () => prefixSlot({})
        } : {}
      }),
      h('div', {
        ref: 'panel',
        class: ['vxe-table--ignore-clear vxe-select--panel', {
          [`size--${vSize}`]: vSize,
          'is--transfer': this.transfer,
          'animat--leave': !loading && this.animatVisible,
          'animat--enter': !loading && visiblePanel
        }],
        attrs: {
          placement: this.panelPlacement
        },
        style: this.panelStyle
      }, inited ? [
        h('div', {
          ref: 'optWrapper',
          class: 'vxe-select-option--wrapper'
        }, renderOpts(h, this))
      ] : null)
    ])
  },
  methods: {
    callSlot (slotFunc, params, h) {
      if (slotFunc) {
        const { $scopedSlots } = this
        if (XEUtils.isString(slotFunc)) {
          slotFunc = $scopedSlots[slotFunc] || null
        }
        if (XEUtils.isFunction(slotFunc)) {
          return slotFunc.call(this, params, h)
        }
      }
      return []
    },
    updateCache () {
      const { fullOptionList, fullGroupList, groupOptionsField } = this
      const optkey = getOptkey(this)
      const handleOptis = (item) => {
        if (!getOptid(this, item)) {
          item[optkey] = getOptUniqueId()
        }
      }
      if (fullGroupList.length) {
        fullGroupList.forEach(group => {
          handleOptis(group)
          if (group[groupOptionsField]) {
            group[groupOptionsField].forEach(handleOptis)
          }
        })
      } else if (fullOptionList.length) {
        fullOptionList.forEach(handleOptis)
      }
      this.refreshOption()
    },
    /**
     * 刷新选项，当选项被动态显示/隐藏时可能会用到
     */
    refreshOption () {
      const { isGroup, fullOptionList, fullGroupList } = this
      if (isGroup) {
        this.visibleGroupList = fullGroupList.filter(isOptionVisible)
      } else {
        this.visibleOptionList = fullOptionList.filter(isOptionVisible)
      }
      return this.$nextTick()
    },
    setCurrentOption (option) {
      if (option) {
        this.currentValue = option[this.valueField]
      }
    },
    scrollToOption (option, isAlignBottom) {
      return this.$nextTick().then(() => {
        if (option) {
          const { $refs } = this
          const optWrapperElem = $refs.optWrapper
          const optElem = $refs.panel.querySelector(`[optid='${getOptid(this, option)}']`)
          if (optWrapperElem && optElem) {
            const wrapperHeight = optWrapperElem.offsetHeight
            const offsetPadding = 5
            if (isAlignBottom) {
              if (optElem.offsetTop + optElem.offsetHeight - optWrapperElem.scrollTop > wrapperHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop + optElem.offsetHeight - wrapperHeight
              }
            } else {
              if (optElem.offsetTop + offsetPadding < optWrapperElem.scrollTop || optElem.offsetTop + offsetPadding > optWrapperElem.scrollTop + optWrapperElem.clientHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop - offsetPadding
              }
            }
          }
        }
      })
    },
    clearEvent (params, evnt) {
      this.clearValueEvent(evnt, null)
      this.hideOptionPanel()
    },
    clearValueEvent (evnt, selectValue) {
      this.changeEvent(evnt, selectValue)
      this.$emit('clear', { value: selectValue, $event: evnt })
    },
    changeEvent (evnt, selectValue) {
      if (selectValue !== this.value) {
        this.$emit('input', selectValue)
        this.$emit('change', { value: selectValue, $event: evnt })
      }
    },
    mousedownOptionEvent (evnt) {
      const isLeftBtn = evnt.button === 0
      if (isLeftBtn) {
        evnt.stopPropagation()
      }
    },
    changeOptionEvent (evnt, selectValue) {
      const { value, multiple } = this
      if (multiple) {
        let multipleValue
        if (value) {
          if (value.indexOf(selectValue) === -1) {
            multipleValue = value.concat([selectValue])
          } else {
            multipleValue = value.filter(val => val !== selectValue)
          }
        } else {
          multipleValue = [selectValue]
        }
        this.changeEvent(evnt, multipleValue)
      } else {
        this.changeEvent(evnt, selectValue)
        this.hideOptionPanel()
      }
    },
    handleGlobalMousewheelEvent (evnt) {
      const { $refs, disabled, visiblePanel } = this
      if (!disabled) {
        if (visiblePanel) {
          if (DomTools.getEventTargetNode(evnt, $refs.panel).flag) {
            this.updatePlacement()
          } else {
            this.hideOptionPanel()
          }
        }
      }
    },
    handleGlobalMousedownEvent (evnt) {
      const { $refs, $el, disabled, visiblePanel } = this
      if (!disabled) {
        this.isActivated = DomTools.getEventTargetNode(evnt, $el).flag || DomTools.getEventTargetNode(evnt, $refs.panel).flag
        if (visiblePanel && !this.isActivated) {
          this.hideOptionPanel()
        }
      }
    },
    handleGlobalKeydownEvent (evnt) {
      const { visiblePanel, currentValue, clearable, disabled } = this
      if (!disabled) {
        const keyCode = evnt.keyCode
        const isTab = keyCode === 9
        const isEnter = keyCode === 13
        const isEsc = keyCode === 27
        const isUpArrow = keyCode === 38
        const isDwArrow = keyCode === 40
        const isDel = keyCode === 46
        const isSpacebar = keyCode === 32
        if (isTab) {
          this.isActivated = false
        }
        if (visiblePanel) {
          if (isEsc || isTab) {
            this.hideOptionPanel()
          } else if (isEnter) {
            evnt.preventDefault()
            evnt.stopPropagation()
            this.changeOptionEvent(evnt, currentValue)
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault()
            let { firstOption, offsetOption } = findOffsetOption(this, currentValue, isUpArrow)
            if (!offsetOption && !findOption(this, currentValue)) {
              offsetOption = firstOption
            }
            this.setCurrentOption(offsetOption)
            this.scrollToOption(offsetOption, isDwArrow)
          } else if (isSpacebar) {
            evnt.preventDefault()
          }
        } else if ((isUpArrow || isDwArrow || isEnter || isSpacebar) && this.isActivated) {
          evnt.preventDefault()
          this.showOptionPanel()
        }
        if (this.isActivated) {
          if (isDel && clearable) {
            this.clearValueEvent(evnt, null)
          }
        }
      }
    },
    handleGlobalBlurEvent () {
      this.hideOptionPanel()
    },
    updateZindex () {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex()
      }
    },
    focusEvent () {
      if (!this.disabled) {
        this.isActivated = true
      }
    },
    blurEvent () {
      this.isActivated = false
    },
    isPanelVisible () {
      return this.visiblePanel
    },
    togglePanel () {
      if (this.visiblePanel) {
        this.hideOptionPanel()
      } else {
        this.showOptionPanel()
      }
      this.$nextTick()
    },
    hidePanel () {
      if (this.visiblePanel) {
        this.hideOptionPanel()
      }
      this.$nextTick()
    },
    showPanel () {
      if (!this.visiblePanel) {
        this.showOptionPanel()
      }
      this.$nextTick()
    },
    togglePanelEvent (params) {
      const { $event } = params
      $event.preventDefault()
      if (this.visiblePanel) {
        this.hideOptionPanel()
      } else {
        this.showOptionPanel()
      }
    },
    showOptionPanel () {
      const { loading, disabled } = this
      if (!loading && !disabled) {
        clearTimeout(this.hidePanelTimeout)
        if (!this.inited) {
          this.inited = true
          if (this.transfer) {
            document.body.appendChild(this.$refs.panel)
          }
        }
        this.isActivated = true
        this.animatVisible = true
        setTimeout(() => {
          const { value, multiple } = this
          const currOption = findOption(this, multiple && value ? value[0] : value)
          this.visiblePanel = true
          if (currOption) {
            this.setCurrentOption(currOption)
            this.scrollToOption(currOption)
          }
        }, 10)
        this.updateZindex()
        this.updatePlacement()
      }
    },
    hideOptionPanel () {
      this.visiblePanel = false
      this.hidePanelTimeout = setTimeout(() => {
        this.animatVisible = false
      }, 350)
    },
    updatePlacement () {
      return this.$nextTick().then(() => {
        const { $refs, transfer, placement, panelIndex } = this
        const targetElem = $refs.input.$el
        const panelElem = $refs.panel
        if (panelElem && targetElem) {
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
    focus () {
      this.isActivated = true
      this.$refs.input.focus()
      return this.$nextTick()
    },
    blur () {
      this.hideOptionPanel()
      this.$refs.input.blur()
      return this.$nextTick()
    }
  }
}
