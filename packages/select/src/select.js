import VxeInput from '../../input'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

function findOffsetOption (groupList, optionValue, isUpArrow) {
  let prevOption
  let isMatchOption = false
  for (let gIndex = 0; gIndex < groupList.length; gIndex++) {
    const group = groupList[gIndex]
    if (group.children.length) {
      for (let index = 0; index < group.children.length; index++) {
        const comp = group.children[index]
        if (isUpArrow) {
          if (optionValue === comp.value) {
            return prevOption
          }
        } else {
          if (isMatchOption) {
            return comp
          }
          if (optionValue === comp.value) {
            isMatchOption = true
          }
        }
        prevOption = comp
      }
    } else {
      if (isUpArrow) {
        if (optionValue === group.comp.value) {
          return prevOption
        }
      } else {
        if (isMatchOption) {
          return group.comp
        }
        if (optionValue === group.comp.value) {
          isMatchOption = true
        }
      }
      prevOption = group.comp
    }
  }
}

export default {
  name: 'VxeSelect',
  props: {
    value: [String, Number],
    clearable: Boolean,
    placeholder: String,
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
      showPanel: false
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    selectLabel () {
      const selectValue = this.value
      const groupList = this.getOptions()
      if (this.updateFlag) {
        for (let gIndex = 0; gIndex < groupList.length; gIndex++) {
          const group = groupList[gIndex]
          if (group.children.length) {
            for (let index = 0; index < group.children.length; index++) {
              const comp = group.children[index]
              if (selectValue === comp.value) {
                return comp.label
              }
            }
          } else if (selectValue === group.comp.value) {
            return group.comp.label
          }
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
    const { vSize, clearable, placeholder, selectLabel, showPanel, panelStyle } = this
    return h('div', {
      class: ['vxe-select', {
        'is--visivle': showPanel,
        [`size--${vSize}`]: vSize
      }]
    }, [
      h('vxe-input', {
        ref: 'input',
        props: {
          clearable,
          placeholder,
          readonly: true,
          type: 'text',
          suffixIcon: `vxe-icon--caret-bottom${showPanel ? ' rotate180' : ''}`,
          value: selectLabel
        },
        on: {
          clear: this.clearEvent,
          click: this.togglePanelEvent,
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
      this.$children.forEach(option => {
        if (option.$xeselect) {
          options.push({
            comp: option,
            children: option.$children.filter(option => option.$xeselect)
          })
        }
      })
      return options
    },
    updateStatus () {
      this.updateFlag++
    },
    updateCurrentOption (currentValue) {
      this.currentValue = currentValue
    },
    clearEvent (params, evnt) {
      this.changeOptionEvent(evnt, null)
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
      if (this.showPanel && !(DomTools.getEventTargetNode(evnt, this.$el).flag || DomTools.getEventTargetNode(evnt, this.$refs.panel).flag)) {
        this.hideOptionPanel()
      }
    },
    handleGlobalKeydownEvent (evnt) {
      const { $refs, showPanel, currentValue } = this
      const keyCode = evnt.keyCode
      const isUpArrow = keyCode === 38
      const isDwArrow = keyCode === 40
      if (showPanel) {
        if (keyCode === 13) {
          this.changeOptionEvent(evnt, this.currentValue)
        } else if (isUpArrow || isDwArrow) {
          evnt.preventDefault()
          const groupList = this.getOptions()
          const offsetOption = findOffsetOption(groupList, currentValue, isUpArrow)
          if (offsetOption) {
            this.currentOptionEvent(evnt, offsetOption.value)
            this.$nextTick(() => {
              DomTools.toView($refs.panel.querySelector(`[data-option-id='${offsetOption.id}']`))
            })
          }
        }
      }
    },
    updateZindex () {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex()
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
      this.showPanel = true
      this.updateCurrentOption(this.value)
      this.updateZindex()
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
    },
    hideOptionPanel () {
      this.showPanel = false
    }
  }
}
