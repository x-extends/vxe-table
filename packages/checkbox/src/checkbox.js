export default {
  name: 'VxeCheckbox',
  props: {
    value: Boolean,
    indeterminate: Boolean,
    disabled: Boolean,
    name: String,
    size: String
  },
  render (h) {
    return h('label', {
      class: ['vxe-checkbox', this.size ? `size--${this.size}` : '', {
        'is--indeterminate': this.indeterminate,
        'is--disabled': this.disabled
      }]
    }, [
      h('input', {
        attrs: {
          type: 'checkbox'
        },
        domProps: {
          checked: this.value
        },
        on: {
          change: evnt => {
            if (!this.disabled) {
              let value = evnt.target.checked
              this.$emit('input', value)
              this.$emit('change', value, evnt)
            }
          }
        }
      }),
      h('span', {
        class: ['checkbox--icon']
      }),
      this.$slots.default ? h('span', {
        class: ['checkbox--label']
      }, this.$slots.default) : this._e()
    ])
  }
}
