import XEUtils from 'xe-utils'

export default {
  name: 'VxeInput',
  props: {
    value: [String, Number],
    type: { type: String, default: 'text' },
    disabled: Boolean,
    placeholder: String,
    size: String
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    let { $listeners, value, type, vSize, placeholder, disabled } = this
    return h('div', {
      class: ['vxe-input--wrapper', {
        [`size--${vSize}`]: vSize,
        'is--disabled': this.disabled
      }]
    }, [
      h('input', {
        class: `vxe-input`,
        domProps: {
          value
        },
        attrs: {
          type,
          placeholder,
          disabled
        },
        on: XEUtils.objectMap($listeners, (cb, type) => evnt => {
          let params = type === 'input' ? evnt.target.value : { value: evnt.target.value }
          this.$emit(type, params, evnt)
        })
      })
    ])
  }
}
