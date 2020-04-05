import { UtilTools } from '../../tools'
import GlobalConfig from '../../conf'

export default {
  name: 'VxeCheckbox',
  props: {
    value: Boolean,
    label: [String, Number],
    indeterminate: Boolean,
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    size: { type: String, default: () => GlobalConfig.checkbox.size || GlobalConfig.size }
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
    const { $slots, $xegroup, isGroup, disabled, title, vSize, indeterminate, value, label, content } = this
    const attrs = {}
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
              const checked = evnt.target.checked
              const params = { checked, label, $event: evnt }
              if (isGroup) {
                $xegroup.handleChecked(params, evnt)
              } else {
                this.$emit('input', checked)
                this.$emit('change', params, evnt)
              }
            }
          }
        }
      }),
      h('span', {
        class: 'vxe-checkbox--icon'
      }),
      h('span', {
        class: 'vxe-checkbox--label'
      }, $slots.default || [UtilTools.getFuncText(content)])
    ])
  }
}
