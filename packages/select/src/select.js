import VxeInput from '../../input'
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
    value: [String, Number],
    clearable: Boolean,
    placeholder: String,
    disabled: Boolean,
    prefixIcon: String,
    placement: String,
    size: String,
    transfer: Boolean
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
      currentValue: null,
      showPanel: false,
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
    this.panelIndex = UtilTools.nextZIndex()
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
    const { vSize, transfer, isActivated, disabled, clearable, placeholder, selectLabel, showPanel, panelStyle, prefixIcon } = this
    return h('div', {
      class: ['vxe-select', {
        [`size--${vSize}`]: vSize,
        'is--visivle': showPanel,
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
          suffixIcon: `vxe-icon--caret-bottom${showPanel ? ' rotate180' : ''}`,
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
        class: ['vxe-select-option--panel', {
          [`size--${vSize}`]: vSize,
          'is--transfer': transfer,
          'is--visivle': showPanel
        }],
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
    updateCurrentOption (currentValue) {
      this.currentValue = currentValue
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
    currentOptionEvent (evnt, currentValue) {
      this.currentValue = currentValue
    },
    changeOptionEvent (evnt, selectValue) {
      this.changeEvent(evnt, selectValue)
      this.hideOptionPanel()
    },
    handleGlobalMousedownEvent (evnt) {
      if (!this.disabled) {
        if (this.showPanel && !(DomTools.getEventTargetNode(evnt, this.$el).flag || DomTools.getEventTargetNode(evnt, this.$refs.panel).flag)) {
          this.hideOptionPanel()
        }
        this.isActivated = DomTools.getEventTargetNode(evnt, this.$el).flag || DomTools.getEventTargetNode(evnt, this.$refs.panel).flag
      }
    },
    handleGlobalKeydownEvent (evnt) {
      const { $refs, showPanel, currentValue, clearable, disabled } = this
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
        if (showPanel) {
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
            if (offsetOption) {
              this.currentOptionEvent(evnt, offsetOption.value)
              this.$nextTick(() => {
                DomTools.toView($refs.panel.querySelector(`[data-option-id='${offsetOption.id}']`))
              })
            }
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
      if (this.showPanel) {
        this.hideOptionPanel()
      } else {
        this.showOptionPanel()
      }
    },
    showOptionPanel () {
      if (!this.disabled) {
        this.showPanel = true
        this.isActivated = true
        this.updateCurrentOption(this.value)
        this.updateZindex()
        this.updatePlacement()
      }
    },
    hideOptionPanel () {
      this.showPanel = false
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
        if (transfer) {
          const left = boundingLeft
          let top = boundingTop + inputHeight
          if (placement !== 'top') {
            // 如果下面不够放，则向上
            if (top + panelHeight > visibleHeight) {
              top = boundingTop - panelHeight
            }
            // 如果上面不够放，则向下（优先）
            if (top < 0) {
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
            panelStyle.bottom = `${inputHeight}px`
          } else {
            // 如果下面不够放，则向上
            if (boundingTop + inputHeight + panelHeight > visibleHeight) {
              panelStyle.bottom = `${inputHeight}px`
            }
          }
        }
        this.panelStyle = panelStyle
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
