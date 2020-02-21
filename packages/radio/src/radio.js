export default {
  name: 'VxeRadio',
  props: {
    value: [String, Number],
    label: [String, Number],
    title: [String, Number],
    disabled: Boolean,
    name: String,
    size: String
  },
  inject: {
    $xegroup: {
      default: null
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isGroup () {
      return this.$xegroup
    }
  },
  render (h) {
    const { $slots, $xegroup, isGroup, disabled, title, vSize, value, label, name } = this
    const attrs = {}
    if (title) {
      attrs.title = title
    }
    return h('label', {
      class: ['vxe-radio', {
        [`size--${vSize}`]: vSize,
        'is--disabled': disabled
      }],
      attrs
    }, [
      h('input', {
        attrs: {
          type: 'radio',
          name: isGroup ? $xegroup.name : name,
          disabled
        },
        domProps: {
          checked: isGroup ? $xegroup.value === label : value === label
        },
        on: {
          change: evnt => {
            if (!disabled) {
              if (isGroup) {
                $xegroup.handleChecked({ label }, evnt)
              } else {
                this.$emit('input', label)
                this.$emit('change', label, evnt)
              }
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
