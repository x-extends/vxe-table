export default {
  name: 'VxeRadio',
  props: {
    value: [String, Number],
    label: [String, Number],
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
    let { $slots, disabled, vSize, value, label, name } = this
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
          checked: value === label
        },
        on: {
          change: evnt => {
            if (!disabled) {
              this.$emit('input', label)
              this.$emit('change', label, evnt)
            }
          }
        }
      }),
      h('span', {
        class: 'vxe-radio--icon'
      }),
      $slots.default ? h('span', {
        class: 'vxe-radio--label'
      }, $slots.default) : null
    ])
  }
}
