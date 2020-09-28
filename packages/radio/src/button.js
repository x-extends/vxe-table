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
    $xeradiogroup: {
      default: null
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isGroup () {
      return this.$xeradiogroup
    },
    isDisabled () {
      return this.disabled || (this.isGroup && this.$xeradiogroup.disabled)
    }
  },
  render (h) {
    const { $slots, $xeradiogroup, isGroup, isDisabled, title, vSize, label, content } = this
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
          name: isGroup ? $xeradiogroup.name : null,
          disabled: isDisabled
        },
        domProps: {
          checked: isGroup && $xeradiogroup.value === label
        },
        on: {
          change: this.changeEvent
        }
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
        if (isGroup) {
          $xeradiogroup.handleChecked({ label, $event: evnt })
        }
      }
    }
  }
}
