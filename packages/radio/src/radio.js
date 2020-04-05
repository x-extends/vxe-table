import { UtilTools } from '../../tools'
import GlobalConfig from '../../conf'

export default {
  name: 'VxeRadio',
  props: {
    value: [String, Number],
    label: [String, Number],
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    name: String,
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
    }
  },
  render (h) {
    const { $slots, $xegroup, isGroup, disabled, title, vSize, value, label, name, content } = this
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
              const params = { label, $event: evnt }
              if (isGroup) {
                $xegroup.handleChecked(params, evnt)
              } else {
                this.$emit('input', label)
                this.$emit('change', params, evnt)
              }
            }
          }
        }
      }),
      h('span', {
        class: 'vxe-radio--icon'
      }),
      h('span', {
        class: 'vxe-radio--label'
      }, $slots.default || [UtilTools.getFuncText(content)])
    ])
  }
}
