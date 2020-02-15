export default {
  name: 'VxeCheckbox',
  props: {
    value: Boolean,
    label: [String, Number],
    indeterminate: Boolean,
    title: [String, Number],
    disabled: Boolean,
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
    let { $xegroup, isGroup, disabled, title, vSize, indeterminate, value, label } = this
    let attrs = {}
    if (title) {
      attrs.title = title
    }
    return h('label', {
      class: ['vxe-checkbox', {
        [`size--${vSize}`]: vSize,
        'is--indeterminate': indeterminate,
        'is--disabled': disabled
      }],
      attrs
    }, [
      h('input', {
        attrs: {
          type: 'checkbox',
          disabled
        },
        domProps: {
          checked: isGroup ? ($xegroup.value && $xegroup.value.some(item => item === label)) : value
        },
        on: {
          change: evnt => {
            if (!this.disabled) {
              let checked = evnt.target.checked
              if (isGroup) {
                $xegroup.handleChecked({ checked, label }, evnt)
              } else {
                this.$emit('input', checked)
                this.$emit('change', checked, evnt)
              }
            }
          }
        }
      }),
      h('span', {
        class: 'vxe-checkbox--icon'
      }),
      this.$slots.default ? h('span', {
        class: 'vxe-checkbox--label'
      }, this.$slots.default) : null
    ])
  }
}
