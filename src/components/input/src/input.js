export default {
  name: 'VxeInput',
  props: {
    value: [String, Number],
    type: { type: String, default: 'text' },
    disabled: Boolean,
    placeholder: String,
    size: String
  },
  render (h) {
    let { $listeners, value, type, size, placeholder, disabled } = this
    let on = {
      input: evnt => this.$emit('input', evnt.target.value)
    }
    if ($listeners.change) {
      on.change = evnt => this.$emit('change', evnt.target.value, evnt)
    }
    return h('div', {
      class: ['vxe-input--wrapper', {
        [`size--${size}`]: size,
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
        on
      })
    ])
  }
}
