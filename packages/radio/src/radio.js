import { UtilTools } from '../../tools'
import GlobalConfig from '../../conf'
import vSize from '../../mixins/size'

export default {
  name: 'VxeRadio',
  mixins: [vSize],
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
    $xeradiogroup: {
      default: null
    }
  },
  computed: {
    isGroup () {
      return this.$xeradiogroup
    },
    isDisabled () {
      return this.disabled || (this.isGroup && this.$xeradiogroup.disabled)
    }
  },
  render (h) {
    const { $slots, $xeradiogroup, isGroup, isDisabled, title, vSize, value, label, name, content } = this
    const attrs = {}
    if (title) {
      attrs.title = title
    }
    return h('label', {
      class: ['vxe-radio', {
        [`size--${vSize}`]: vSize,
        'is--disabled': isDisabled
      }],
      attrs
    }, [
      h('input', {
        class: 'vxe-radio--input',
        attrs: {
          type: 'radio',
          name: isGroup ? $xeradiogroup.name : name,
          disabled: isDisabled
        },
        domProps: {
          checked: isGroup ? $xeradiogroup.value === label : value === label
        },
        on: {
          change: evnt => {
            if (!isDisabled) {
              const params = { label, $event: evnt }
              if (isGroup) {
                $xeradiogroup.handleChecked(params)
              } else {
                this.$emit('input', label)
                this.$emit('change', params)
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
  },
  methods: {
    changeEvent (evnt) {
      const { $xeradiogroup, isGroup, isDisabled, label } = this
      if (!isDisabled) {
        const params = { label, $event: evnt }
        if (isGroup) {
          $xeradiogroup.handleChecked(params)
        } else {
          this.$emit('input', label)
          this.$emit('change', params)
        }
      }
    }
  }
}
