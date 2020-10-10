import { UtilTools } from '../../tools'
import GlobalConfig from '../../conf'

export default {
  name: 'VxeRadioButton',
  props: {
    label: [String, Number],
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    size: { type: String, default: () => GlobalConfig.radio.size || GlobalConfig.size }
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
    },
    isDisabled () {
      return this.disabled || (this.isGroup && this.$xegroup.disabled)
    }
  },
  render (h) {
    const { $slots, $xegroup, isGroup, isDisabled, title, vSize, label, content } = this
    const attrs = {}
    if (title) {
      attrs.title = title
    }
    return h('label', {
      class: ['vxe-radio', 'vxe-radio-button', {
        [`size--${vSize}`]: vSize,
        'is--disabled': isDisabled
      }],
      attrs
    }, [
      h('input', {
        class: 'vxe-radio--input',
        attrs: {
          type: 'radio',
          name: isGroup ? $xegroup.name : null,
          disabled: isDisabled
        },
        domProps: {
          checked: isGroup && $xegroup.value === label
        },
        on: {
          change: evnt => {
            if (!isDisabled) {
              if (isGroup) {
                $xegroup.handleChecked({ label, $event: evnt })
              }
            }
          }
        }
      }),
      h('span', {
        class: 'vxe-radio--label'
      }, $slots.default || [UtilTools.getFuncText(content)])
    ])
  }
}
