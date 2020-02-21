import XEUtils from 'xe-utils/methods/xe-utils'
import { UtilTools } from '../../tools'

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
      const { $listeners, value, type, vSize, placeholder, disabled, clearable } = this
      const isClearable = clearable && (type === 'text' || type === 'search')
      const attrs = getAttrs(this)
      if (placeholder) {
        attrs.placeholder = UtilTools.getFuncText(placeholder)
      }
      return h('div', {
        class: [`vxe-${compName}`, {
          [`size--${vSize}`]: vSize,
          'is--suffix': isClearable,
          'is--disabled': disabled
        }]
      }, [
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
        isClearable ? h('span', {
          class: [`vxe-${compName}--suffix`, {
            'is--active': !(value === '' || XEUtils.eqNull(value))
          }],
          on: {
            click: this.clearValue
          }
        }, [
          h('i', {
            class: [`vxe-${compName}--suffix-icon`, 'vxe-icon--close']
          })
        ]) : null
      ])
    },
    methods: {
      clearValue (evnt) {
        this.$emit('input', '')
        this.$emit('clear', {}, evnt)
      }
    }
  }
}
