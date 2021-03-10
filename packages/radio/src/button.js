import { UtilTools } from '../../tools'
import GlobalConfig from '../../v-x-e-table/src/conf'

export default {
  name: 'VxeRadioButton',
  props: {
    value: [String, Number, Boolean],
    label: [String, Number, Boolean],
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
    isDisabled () {
      const { $xeradiogroup } = this
      return this.disabled || ($xeradiogroup && $xeradiogroup.disabled)
    }
  },
  render (h) {
    const { $scopedSlots, $xeradiogroup, isDisabled, title, vSize, value, label, content } = this
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
          name: $xeradiogroup ? $xeradiogroup.name : null,
          disabled: isDisabled
        },
        domProps: {
          checked: $xeradiogroup ? $xeradiogroup.value === label : value === label
        },
        on: {
          change: this.changeEvent
        }
      }),
      h('span', {
        class: 'vxe-radio--label'
      }, $scopedSlots.default ? $scopedSlots.default.call(this, {}) : [UtilTools.getFuncText(content)])
    ])
  },
  methods: {
    changeEvent (evnt) {
      const { $xeradiogroup, isDisabled, label } = this
      if (!isDisabled) {
        const params = { label, $event: evnt }
        if ($xeradiogroup) {
          $xeradiogroup.handleChecked(params)
        } else {
          this.$emit('input', label)
          this.$emit('change', params)
        }
      }
    }
  }
}
