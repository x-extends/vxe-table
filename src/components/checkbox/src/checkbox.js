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
    let { disabled, size, indeterminate, value } = this
    return h('label', {
      class: ['vxe-checkbox', size ? `size--${size}` : '', {
        'is--indeterminate': indeterminate,
        'is--disabled': disabled
      }]
    }, [
      h('input', {
        attrs: {
          type: 'checkbox',
          disabled
        },
        domProps: {
          checked: value
        },
        on: {
          change: evnt => {
            if (!this.disabled) {
              let checked = evnt.target.checked
              this.$emit('input', checked)
              this.$emit('change', checked, evnt)
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
