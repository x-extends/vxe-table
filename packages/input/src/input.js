import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

export default {
  name: 'VxeInput',
  props: {
    value: [String, Number],
    name: String,
    type: { type: String, default: 'text' },
    clearable: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    autocomplete: { type: String, default: 'off' },
    form: String,
    size: String,
    step: [String, Number],
    prefixIcon: String,
    suffixIcon: String
  },
  data () {
    return {
      showPwd: false
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isNumber () {
      return this.type === 'number'
    },
    isPwd () {
      return this.type === 'password'
    },
    stepNum () {
      return XEUtils.toNumber(this.step) || 1
    },
    defaultEvents () {
      const evnts = {}
      XEUtils.each(this.$listeners, (cb, name) => {
        if (['clear', 'prefix-click', 'suffix-click'].indexOf(name) === -1) {
          evnts[name] = this.triggerEvent
        }
      })
      if (this.isNumber) {
        evnts.keydown = this.keydownEvent
        evnts.blur = this.blurEvent
      }
      evnts.input = this.inputEvent
      return evnts
    }
  },
  render (h) {
    const { defaultEvents, isPwd, isNumber, vSize, value, type, name, placeholder, readonly, disabled, maxlength, form, autocomplete, clearable, prefixIcon, suffixIcon, showPwd } = this
    const isClearable = clearable && (isPwd || isNumber || type === 'text' || type === 'search')
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
    if (isNumber || (isPwd && showPwd)) {
      attrs.type = 'text'
    }
    if (placeholder) {
      attrs.placeholder = UtilTools.getFuncText(placeholder)
    }
    return h('div', {
      class: ['vxe-input', `type--${type}`, {
        [`size--${vSize}`]: vSize,
        'is--prefix': prefixIcon,
        'is--suffix': isClearable || suffixIcon,
        'is--extra': isPwd,
        'is--readonly': readonly,
        'is--disabled': disabled
      }]
    }, [
      prefixIcon ? h('span', {
        class: 'vxe-input--prefix',
        on: {
          click: this.clickPrefixEvent
        }
      }, [
        h('i', {
          class: ['vxe-input--prefix-icon', prefixIcon]
        })
      ]) : null,
      h('input', {
        ref: 'input',
        class: 'vxe-input--inner',
        domProps: {
          value
        },
        attrs,
        on: defaultEvents
      }),
      isClearable || suffixIcon ? h('span', {
        class: ['vxe-input--suffix', {
          'is--clear': isClearable && !disabled && !(value === '' || XEUtils.eqNull(value))
        }],
        on: {
          click: this.clickSuffixEvent
        }
      }, [
        suffixIcon ? h('i', {
          class: ['vxe-input--suffix-icon', suffixIcon]
        }) : null,
        isClearable ? h('i', {
          class: ['vxe-input--clear-icon', GlobalConfig.icon.inputClear]
        }) : null
      ]) : null,
      isPwd || isNumber ? h('span', {
        class: 'vxe-input--extra'
      }, [
        isPwd ? h('span', {
          class: 'vxe-input--pwd',
          on: {
            click: this.togglePwdEvent
          }
        }, [
          h('i', {
            class: ['vxe-input--pwd-icon', showPwd ? GlobalConfig.icon.inputShowPwd : GlobalConfig.icon.inputPwd]
          })
        ]) : null,
        isNumber ? h('span', {
          class: 'vxe-input--number'
        }, [
          h('span', {
            class: 'vxe-input--number-prev'
          }, [
            h('i', {
              class: ['vxe-input--number-prev-icon', 'vxe-icon--caret-top'],
              on: {
                click: this.prevNumEvent
              }
            })
          ]),
          h('span', {
            class: 'vxe-input--number-next'
          }, [
            h('i', {
              class: ['vxe-input--number-next-icon', 'vxe-icon--caret-bottom'],
              on: {
                click: this.nextNumEvent
              }
            })
          ])
        ]) : null
      ]) : null
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
      this.$emit(evnt.type, {}, evnt)
    },
    emitUpdate (value) {
      this.$emit('input', value)
    },
    inputEvent (evnt) {
      this.emitUpdate(evnt.target.value)
    },
    keydownEvent (evnt) {
      const { keyCode } = evnt
      const isUpArrow = keyCode === 38
      const isDwArrow = keyCode === 40
      if (isUpArrow || isDwArrow) {
        evnt.preventDefault()
        if (isUpArrow) {
          this.prevNumEvent(evnt)
        } else {
          this.nextNumEvent(evnt)
        }
      }
      this.triggerEvent(evnt)
    },
    blurEvent (evnt) {
      let value = evnt.target.value
      if (value && isNaN(value)) {
        value = XEUtils.toNumber(value)
        evnt.target.value = value
        this.emitUpdate(value)
      }
      this.triggerEvent(evnt)
    },
    clickPrefixEvent (evnt) {
      const { disabled, readonly } = this
      if (!disabled && !readonly) {
        this.$emit('prefix-click', { value: this.value }, evnt)
      }
    },
    clickSuffixEvent (evnt) {
      const { disabled, readonly } = this
      if (!disabled && !readonly) {
        if (DomTools.hasClass(evnt.currentTarget, 'is--clear')) {
          this.emitUpdate('')
          this.$emit('clear', { value: '' }, evnt)
        } else {
          this.$emit('suffix-click', { value: this.value }, evnt)
        }
      }
    },
    togglePwdEvent () {
      const { disabled, readonly, showPwd } = this
      if (!disabled && !readonly) {
        this.showPwd = !showPwd
      }
    },
    prevNumEvent () {
      const { disabled, readonly } = this
      if (!disabled && !readonly) {
        this.updateNum(true)
      }
    },
    nextNumEvent () {
      const { disabled, readonly } = this
      if (!disabled && !readonly) {
        this.updateNum(false)
      }
    },
    updateNum (isPlus) {
      const { value, stepNum } = this
      const offsetNumber = isPlus ? stepNum : -stepNum
      this.emitUpdate(XEUtils.toNumber(value) + offsetNumber)
    }
  }
}
