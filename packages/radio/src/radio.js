export default {
  name: 'VxeRadio',
  prpos: {
    value: Boolean,
    disabled: Boolean,
    name: String,
    size: String
  },
  render (h) {
    return h('label', {
      class: ['vxe-radio', this.size ? `size--${this.size}` : '']
    }, [
      h('input', {
        attrs: {
          type: 'radio',
          name: this.name
        },
        domProps: {
          checked: this.value
        },
        on: {
          change: evnt => {
            let value = evnt.target.checked
            this.$emit('input', value)
            this.$emit('change', value, evnt)
          }
        }
      }),
      h('span', {
        class: ['radio--icon']
      }),
      this.$slots.default ? h('span', {
        class: ['checkbox--label']
      }, this.$slots.default) : null
    ])
  }
}
