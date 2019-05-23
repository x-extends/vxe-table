export default {
  name: 'VxeRadio',
  prpos: {
    value: Boolean,
    disabled: Boolean,
    name: String,
    size: String
  },
  render (h) {
    let { disabled, size, value, name } = this
    return h('label', {
      class: ['vxe-radio', size ? `size--${size}` : '', {
        'is--disabled': disabled
      }]
    }, [
      h('input', {
        attrs: {
          type: 'radio',
          name,
          disabled
        },
        domProps: {
          checked: value
        },
        on: {
          change: evnt => {
            if (!disabled) {
              let checked = evnt.target.checked
              this.$emit('input', checked)
              this.$emit('change', checked, evnt)
            }
          }
        }
      }),
      h('span', {
        class: ['radio--icon']
      }),
      this.$slots.default ? h('span', {
        class: ['checkbox--label']
      }, this.$slots.default) : this._e()
    ])
  }
}
