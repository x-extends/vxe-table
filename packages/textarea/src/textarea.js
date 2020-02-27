import XEUtils from 'xe-utils'
import { UtilTools } from '../../tools'

export default {
  name: 'VxeTextarea',
  props: {
    value: [String, Number],
    name: String,
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
    const { $listeners, value, vSize, name, form, placeholder, readonly, disabled, maxlength } = this
    const attrs = {
      name,
      form,
      placeholder,
      maxlength,
      readonly,
      disabled
    }
    if (placeholder) {
      attrs.placeholder = UtilTools.getFuncText(placeholder)
    }
    return h('div', {
      class: ['vxe-textarea', {
        [`size--${vSize}`]: vSize,
        'is--disabled': disabled
      }]
    }, [
      h('textarea', {
        class: 'vxe-textarea--inner',
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
      })
    ])
  }
}
