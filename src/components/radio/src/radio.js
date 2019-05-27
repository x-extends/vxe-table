export default {
  name: 'VxeRadio',
  prpos: {
    value: Boolean,
    disabled: Boolean,
    name: String,
    size: String
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    let { $slots, disabled, vSize, value, name } = this
    return h('label', {
      class: ['vxe-radio', {
        [`size--${vSize}`]: vSize,
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
      $slots.default ? h('span', {
        class: ['checkbox--label']
      }, $slots.default) : null
    ])
  }
}
