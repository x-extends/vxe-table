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
    $vxegroup: {
      default: null
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isGroup () {
      return this.$vxegroup
    }
  },
  render (h) {
    let { $slots, $vxegroup, isGroup, disabled, title, vSize, value, label, name } = this
    let attrs = {}
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
          name: isGroup ? $vxegroup.name : name,
          disabled
        },
        domProps: {
          checked: isGroup ? $vxegroup.value === label : value === label
        },
        on: {
          change: evnt => {
            if (!disabled) {
              if (isGroup) {
                $vxegroup.handleChecked({ label }, evnt)
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
