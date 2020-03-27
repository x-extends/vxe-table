import VxeInput from '../../input/src/input'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

function findOffsetOption (groupList, optionValue, isUpArrow) {
  let prevOption
  let firstOption
  let isMatchOption = false
  for (let gIndex = 0; gIndex < groupList.length; gIndex++) {
    const group = groupList[gIndex]
    if (group.options) {
      for (let index = 0; index < group.options.length; index++) {
        const option = group.options[index]
        if (!firstOption) {
          firstOption = option
        }
        if (isUpArrow) {
          if (optionValue === option.value) {
            return { offsetOption: prevOption, firstOption }
          }
        } else {
          if (isMatchOption) {
            return { offsetOption: option, firstOption }
          }
          if (optionValue === option.value) {
            isMatchOption = true
          }
        }
        prevOption = option
      }
    } else {
      if (!firstOption) {
        firstOption = group
      }
      if (isUpArrow) {
        if (optionValue === group.value) {
          return { offsetOption: prevOption, firstOption }
        }
      } else {
        if (isMatchOption) {
          return { offsetOption: group, firstOption }
        }
        if (optionValue === group.value) {
          isMatchOption = true
        }
      }
      prevOption = group
    }
  }
  return { firstOption }
}

function findOption (groupList, optionValue) {
  for (let gIndex = 0; gIndex < groupList.length; gIndex++) {
    const group = groupList[gIndex]
    if (group.options) {
      for (let index = 0; index < group.options.length; index++) {
        const option = group.options[index]
        if (optionValue === option.value) {
          return option
        }
      }
    } else {
      if (optionValue === group.value) {
        return group
      }
    }
  }
}

function renderOption (h, _vm, options) {
  const { optionProps = {} } = _vm
  const labelProp = optionProps.label || 'label'
  const valueProp = optionProps.value || 'value'
  const disabledProp = optionProps.disabled || 'disabled'
  return options ? options.map((option, cIndex) => {
    return h('vxe-option', {
      key: cIndex,
      props: {
        label: option[labelProp],
        value: option[valueProp],
        disabled: option[disabledProp]
      }
    })
  }) : []
}

function renderOptgroup (h, _vm) {
  const { optionGroups, optionGroupProps = {} } = _vm
  const groupOptions = optionGroupProps.options || 'options'
  const groupLabel = optionGroupProps.label || 'label'
  return optionGroups ? optionGroups.map((group, gIndex) => {
    return h('vxe-optgroup', {
      key: gIndex,
      props: {
        label: group[groupLabel]
      }
    }, renderOption(h, _vm, group[groupOptions]))
  }) : []
}

export default {
  name: 'VxeSelect',
  props: {
    value: null,
    clearable: Boolean,
    placeholder: String,
    disabled: Boolean,
    prefixIcon: String,
    placement: String,
    options: Array,
    optionProps: Object,
    optionGroups: Array,
    optionGroupProps: Object,
    size: String,
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
      updateFlag: 0,
      panelIndex: 0,
      optionList: [],
      allOptList: [],
      panelStyle: null,
      panelPlacement: null,
      currentValue: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    selectLabel () {
      const selectOption = findOption(this.allOptList, this.value)
      if (selectOption) {
        return selectOption.label
      }
      return ''
    }
  },
  watch: {
    updateFlag () {
      this.updateOptComps()
    }
  },
  created () {
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
  },
  mounted () {
    if (this.transfer) {
      document.body.appendChild(this.$refs.panel)
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
    const { vSize, transfer, isActivated, disabled, clearable, placeholder, selectLabel, animatVisible, visiblePanel, panelStyle, prefixIcon, panelPlacement, optionGroups } = this
    return h('div', {
      class: ['vxe-select', {
        [`size--${vSize}`]: vSize,
        'is--visivle': visiblePanel,
        'is--disabled': disabled,
        'is--active': isActivated
      }]
    }, [
      h('vxe-input', {
        ref: 'input',
        props: {
          clearable,
          placeholder,
          readonly: true,
          disabled: disabled,
          type: 'text',
          prefixIcon: prefixIcon,
          suffixIcon: visiblePanel ? GlobalConfig.icon.selectOpen : GlobalConfig.icon.selectClose,
          value: selectLabel
        },
        on: {
          clear: this.clearEvent,
          click: this.togglePanelEvent,
          focus: this.focusEvent,
          'suffix-click': this.togglePanelEvent
        }
      }),
      h('div', {
        ref: 'panel',
        class: ['vxe-dropdown--panel vxe-select--panel', {
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
          class: 'vxe-select-option--wrapper'
        }, this.$slots.default || (optionGroups ? renderOptgroup(h, this) : renderOption(h, this, this.options)))
      ])
    ])
  },
  methods: {
    updateOptions () {
      this.updateFlag++
    },
    updateOptComps () {
      return this.$nextTick().then(() => {
        const oList = []
        const allList = []
        this.$children.forEach(group => {
          if (group.$xeselect) {
            const optChilds = []
            const allOptChilds = []
            const isGroup = group.$children.length
            group.$children.forEach(option => {
              if (option.$xeselect && option.$xeoptgroup) {
                if (!option.isDisabled) {
                  optChilds.push({ label: option.label, value: option.value, disabled: option.isDisabled, id: option.id })
                }
                allOptChilds.push({ label: option.label, value: option.value, disabled: option.isDisabled, id: option.id })
              }
            })
            if (isGroup) {
              if (optChilds.length) {
                oList.push({ label: group.label, disabled: group.disabled, options: optChilds })
              }
              if (allOptChilds.length) {
                allList.push({ label: group.label, disabled: group.disabled, options: allOptChilds })
              }
            } else {
              if (!group.disabled) {
                oList.push({ label: group.label, value: group.value, disabled: group.disabled, id: group.id })
              }
              allList.push({ label: group.label, value: group.value, disabled: group.disabled, id: group.id })
            }
          }
        })
        this.optionList = oList
        this.allOptList = allList
      })
    },
    setCurrentOption (option) {
      if (option) {
        this.currentValue = option.value
        this.$nextTick(() => {
          DomTools.toView(this.$refs.panel.querySelector(`[data-option-id='${option.id}']`))
        })
      }
    },
    clearEvent (params, evnt) {
      this.clearValueEvent(evnt, null)
      this.hideOptionPanel()
    },
    clearValueEvent (evnt, selectValue) {
      this.changeEvent(evnt, selectValue)
      this.$emit('clear', { value: selectValue, $event: evnt }, evnt)
    },
    changeEvent (evnt, selectValue) {
      if (selectValue !== this.value) {
        this.$emit('input', selectValue)
        this.$emit('change', { value: selectValue, $event: evnt }, evnt)
      }
    },
    changeOptionEvent (evnt, selectValue) {
      this.changeEvent(evnt, selectValue)
      this.hideOptionPanel()
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
        if (isTab) {
          this.isActivated = false
        }
        if (visiblePanel) {
          if (isEsc || isTab) {
            this.hideOptionPanel()
          } else if (isEnter) {
            this.changeOptionEvent(evnt, currentValue)
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault()
            const groupList = this.optionList
            let { offsetOption, firstOption } = findOffsetOption(groupList, currentValue, isUpArrow)
            if (!offsetOption && !findOption(groupList, currentValue)) {
              offsetOption = firstOption
            }
            this.setCurrentOption(offsetOption)
          }
        } else if (isEnter && this.isActivated) {
          this.showOptionPanel()
        }
        if (isDel && clearable && this.isActivated) {
          this.clearValueEvent(evnt, null)
        }
      }
    },
    handleGlobalMousewheelEvent (evnt) {
      if (!DomTools.getEventTargetNode(evnt, this.$el).flag && !DomTools.getEventTargetNode(evnt, this.$refs.panel).flag) {
        this.hideOptionPanel()
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
    togglePanelEvent (params, evnt) {
      evnt.preventDefault()
      if (this.visiblePanel) {
        this.hideOptionPanel()
      } else {
        this.showOptionPanel()
      }
    },
    showOptionPanel () {
      if (!this.disabled) {
        clearTimeout(this.hidePanelTimeout)
        this.isActivated = true
        this.animatVisible = true
        setTimeout(() => {
          this.visiblePanel = true
          this.setCurrentOption(findOption(this.allOptList, this.value))
        }, 10)
        this.updateZindex()
        this.updatePlacement()
      }
    },
    hideOptionPanel () {
      this.visiblePanel = false
      this.hidePanelTimeout = setTimeout(() => {
        this.animatVisible = false
      }, 200)
    },
    updatePlacement () {
      this.$nextTick(() => {
        const { $refs, transfer, placement, panelIndex } = this
        const inputElem = $refs.input.$el
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
    focus () {
      this.showOptionPanel()
      return this.$nextTick()
    },
    blur () {
      this.hideOptionPanel()
      return this.$nextTick()
    }
  }
}
