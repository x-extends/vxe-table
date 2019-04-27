import Tools from '../../../src/tools'

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
        'is--indeterminate': this.indeterminate
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
            let value = evnt.target.checked
            this.$emit('input', value)
            Tools.emitEvent(this, 'change', [value, evnt])
          }
        }
      }),
      h('span', {
        class: ['checkbox--icon']
      }),
      this.$slots.default ? h('span', {
        class: ['checkbox--label']
      }, this.$slots.default) : null
    ])
  }
}
