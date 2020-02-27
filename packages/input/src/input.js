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
    }
  },
  render (h) {
    const { $listeners, vSize, value, type, name, placeholder, readonly, disabled, maxlength, form, autocomplete, clearable, prefixIcon, suffixIcon, showPwd } = this
    const isPwd = type === 'password'
    const isNumber = type === 'number'
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
        class: 'vxe-input--inner',
        domProps: {
          value
        },
        attrs,
        on: XEUtils.objectMap($listeners, (cb, type) => evnt => {
          const typeInput = type === 'input'
          const value = evnt.target.value
          const params = { value }
          this.$emit(type, typeInput ? value : params, evnt)
          if (typeInput) {
            this.$emit('change', params, evnt)
          }
        })
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
        isPwd ? h('i', {
          class: ['vxe-input--pwd-icon', showPwd ? GlobalConfig.icon.inputShowPwd : GlobalConfig.icon.inputPwd],
          on: {
            click: this.togglePwdEvent
          }
        }) : null,
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
    clickPrefixEvent (evnt) {
      if (!this.disabled) {
        this.$emit('prefix-click', { value: this.value }, evnt)
      }
    },
    clickSuffixEvent (evnt) {
      if (!this.disabled) {
        if (DomTools.hasClass(evnt.currentTarget, 'is--clear')) {
          this.$emit('input', '')
          this.$emit('clear', { value: '' }, evnt)
        } else {
          this.$emit('suffix-click', { value: this.value }, evnt)
        }
      }
    },
    togglePwdEvent () {
      const { disabled, showPwd } = this
      if (!disabled) {
        this.showPwd = !showPwd
      }
    },
    prevNumEvent () {
      const { disabled } = this
      if (!disabled) {
        this.updateNum(1)
      }
    },
    nextNumEvent () {
      const { disabled } = this
      if (!disabled) {
        this.updateNum(-1)
      }
    },
    updateNum (offsetNumber) {
      this.$emit('input', XEUtils.toNumber(this.value) + offsetNumber)
    }
  }
}
