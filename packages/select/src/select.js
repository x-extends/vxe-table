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
    placement: String,
    size: String
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
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'keydown')
  },
  render (h) {
    const { vSize, isActivated, disabled, clearable, placeholder, selectLabel, showPanel, panelStyle } = this
    return h('div', {
      class: ['vxe-select', {
        'is--visivle': showPanel,
        [`size--${vSize}`]: vSize,
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
              children = children.filter(option => !option.isDisabled && option.$xeselect && option.$xegroup)
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
        const { $refs, placement, panelIndex } = this
        const inputElem = $refs.input.$el
        const panelElem = $refs.panel
        const inputHeight = inputElem.offsetHeight
        const panelHeight = panelElem.offsetHeight
        const panelStyle = {
          zIndex: panelIndex
        }
        const { boundingTop, visibleHeight } = DomTools.getAbsolutePos(inputElem)
        if (placement) {
          if (placement === 'top') {
            if (boundingTop > panelHeight) {
              panelStyle.bottom = `${inputHeight}px`
            }
          }
        } else {
          if (boundingTop + inputHeight + panelHeight > visibleHeight) {
            panelStyle.bottom = `${inputHeight}px`
          }
        }
        this.panelStyle = panelStyle
      })
    }
  }
}
