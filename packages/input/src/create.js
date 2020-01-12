import XEUtils from 'xe-utils'
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
  return {
    name: XEUtils.camelCase(`Vxe-${compName}`),
    props: {
      value: [String, Number],
      name: String,
      type: { type: String, default: 'text' },
      autocomplete: String,
      readonly: Boolean,
      disabled: Boolean,
      placeholder: String,
      maxlength: [String, Number],
      rows: { type: [String, Number], default: 2 },
      form: String,
      size: String
    },
    computed: {
      vSize () {
        return this.size || this.$parent.size || this.$parent.vSize
      }
    },
    render (h) {
      let { $listeners, value, vSize, placeholder } = this
      let attrs = getAttrs(this)
      if (placeholder) {
        attrs.placeholder = UtilTools.getFuncText(placeholder)
      }
      return h('div', {
        class: [`vxe-${compName}`, {
          [`size--${vSize}`]: vSize,
          'is--disabled': this.disabled
        }]
      }, [
        h(compName, {
          class: `vxe-${compName}--inner`,
          domProps: {
            value
          },
          attrs,
          on: XEUtils.objectMap($listeners, (cb, type) => evnt => {
            let value = evnt.target.value
            let params = type === 'input' ? value : { value }
            this.$emit(type, params, evnt)
          })
        })
      ])
    }
  }
}
