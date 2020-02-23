import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

export default function (compName) {
  const isInput = compName === 'input'
  const getAttrs = isInput ? ({ type, name, readonly, disabled, maxlength, autocomplete }) => {
    return {
      type,
      name,
      readonly,
      disabled,
      maxlength,
      autocomplete
    }
  } : ({ name, readonly, disabled, maxlength, autocomplete, rows, form }) => {
    return {
      name,
      readonly,
      disabled,
      maxlength,
      autocomplete,
      rows,
      form
    }
  }
  const props = {
    value: [String, Number],
    name: String,
    type: { type: String, default: 'text' },
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    size: String
  }
  if (isInput) {
    props.clearable = Boolean
    props.prefixIcon = String
    props.suffixIcon = String
    props.form = String
  } else {
    props.autocomplete = String
    props.rows = { type: [String, Number], default: 2 }
  }
  return {
    name: XEUtils.camelCase(`Vxe-${compName}`),
    props,
    computed: {
      vSize () {
        return this.size || this.$parent.size || this.$parent.vSize
      }
    },
    render (h) {
      const { $listeners, value, type, vSize, placeholder, disabled, clearable, prefixIcon, suffixIcon } = this
      const isClearable = clearable && (type === 'text' || type === 'search')
      const attrs = getAttrs(this)
      if (placeholder) {
        attrs.placeholder = UtilTools.getFuncText(placeholder)
      }
      return h('div', {
        class: [`vxe-${compName}`, {
          [`size--${vSize}`]: vSize,
          'is--prefix': prefixIcon,
          'is--suffix': isClearable || suffixIcon,
          'is--disabled': disabled
        }]
      }, [
        prefixIcon ? h('span', {
          class: `vxe-${compName}--prefix`,
          on: {
            click: this.clickPrefixEvent
          }
        }, [
          h('i', {
            class: [`vxe-${compName}--prefix-icon`, prefixIcon]
          })
        ]) : null,
        h(compName, {
          class: `vxe-${compName}--inner`,
          domProps: {
            value
          },
          attrs,
          on: XEUtils.objectMap($listeners, (cb, type) => evnt => {
            const value = evnt.target.value
            const params = type === 'input' ? value : { value }
            this.$emit(type, params, evnt)
          })
        }),
        isClearable || suffixIcon ? h('span', {
          class: [`vxe-${compName}--suffix`, {
            'is--clear': isClearable && !disabled && !(value === '' || XEUtils.eqNull(value))
          }],
          on: {
            click: this.clickSuffixEvent
          }
        }, [
          suffixIcon ? h('i', {
            class: [`vxe-${compName}--suffix-icon`, suffixIcon]
          }) : null,
          isClearable ? h('i', {
            class: [`vxe-${compName}--clear-icon`, GlobalConfig.icon.inputClear]
          }) : null
        ]) : null
      ])
    },
    methods: {
      clickPrefixEvent (evnt) {
        if (!this.disabled) {
          this.$emit('prefix-click', {}, evnt)
        }
      },
      clickSuffixEvent (evnt) {
        if (!this.disabled) {
          if (DomTools.hasClass(evnt.currentTarget, 'is--clear')) {
            this.$emit('input', '')
            this.$emit('clear', {}, evnt)
          } else {
            this.$emit('suffix-click', {}, evnt)
          }
        }
      }
    }
  }
}
