import VxeInput from '../../input/src/input'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

function findOffsetOption (groupList, optionValue, isUpArrow) {
  let prevOption
  let firstOption
  let isMatchOption = false
  for (let gIndex = 0; gIndex < groupList.length; gIndex++) {
    const group = groupList[gIndex]
    if (group.children.length) {
      for (let index = 0; index < group.children.length; index++) {
        const comp = group.children[index]
        if (!firstOption) {
          firstOption = comp
        }
        if (isUpArrow) {
          if (optionValue === comp.value) {
            return { offsetOption: prevOption, firstOption }
          }
        } else {
          if (isMatchOption) {
            return { offsetOption: comp, firstOption }
          }
          if (optionValue === comp.value) {
            isMatchOption = true
          }
        }
        prevOption = comp
      }
    } else {
      const comp = group.comp
      if (!firstOption) {
        firstOption = comp
      }
      if (isUpArrow) {
        if (optionValue === comp.value) {
          return { offsetOption: prevOption, firstOption }
        }
      } else {
        if (isMatchOption) {
          return { offsetOption: comp, firstOption }
        }
        if (optionValue === comp.value) {
          isMatchOption = true
        }
      }
      prevOption = comp
    }
  }
  return { firstOption }
}

function findOption (groupList, optionValue) {
  for (let gIndex = 0; gIndex < groupList.length; gIndex++) {
    const group = groupList[gIndex]
    if (group.children.length) {
      for (let index = 0; index < group.children.length; index++) {
        const comp = group.children[index]
        if (optionValue === comp.value) {
          return comp
        }
      }
    } else {
      if (optionValue === group.comp.value) {
        return group.comp
      }
    }
  }
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
      // 使用技巧去更新视图
      updateFlag: 0,
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
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    selectLabel () {
      if (this.updateFlag) {
        const selectOption = findOption(this.getOptions(), this.value)
        if (selectOption) {
          return selectOption.label
        }
      }
      return ''
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
    const { vSize, transfer, isActivated, disabled, clearable, placeholder, selectLabel, animatVisible, visiblePanel, panelStyle, prefixIcon, panelPlacement } = this
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
        }, this.$slots.default)
      ])
    ])
  },
  methods: {
    getOptions () {
      const options = []
      if (!this.disabled) {
        this.$children.forEach(option => {
          if (!option.isDisabled && option.$xeselect) {
            let children = option.$children
            if (children.length) {
              children = children.filter(option => !option.isDisabled && option.$xeselect && option.$xeoptgroup)
              if (children.length) {
                options.push({ comp: option, children })
              }
            } else {
              options.push({ comp: option, children })
            }
          }
        })
      }
      return options
    },
    updateStatus () {
      this.updateFlag++
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
      this.$emit('clear', { value: selectValue }, evnt)
    },
    changeEvent (evnt, selectValue) {
      if (selectValue !== this.value) {
        this.$emit('input', selectValue)
        this.$emit('change', { value: selectValue }, evnt)
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
        const isUpArrow = keyCode === 38
        const isDwArrow = keyCode === 40
        const isDel = keyCode === 46
        if (isTab) {
          this.isActivated = false
        }
        if (visiblePanel) {
          if (isTab) {
            this.hideOptionPanel()
          } else if (isEnter) {
            this.changeOptionEvent(evnt, currentValue)
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault()
            const groupList = this.getOptions()
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
          this.setCurrentOption(findOption(this.getOptions(), this.value))
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
