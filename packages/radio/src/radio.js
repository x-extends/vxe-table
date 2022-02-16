import { getFuncText } from '../../tools/utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'

export default {
  name: 'VxeRadio',
  mixins: [vSize],
  props: {
    value: [String, Number, Boolean],
    label: [String, Number, Boolean],
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    name: String,
    strict: { type: Boolean, default: () => GlobalConfig.radio.strict },
    size: { type: String, default: () => GlobalConfig.radio.size || GlobalConfig.size }
  },
  inject: {
    $xeradiogroup: {
      default: null
    }
  },
  computed: {
    isDisabled () {
      const { $xeradiogroup } = this
      return this.disabled || ($xeradiogroup && $xeradiogroup.disabled)
    },
    isStrict () {
      const { $xeradiogroup } = this
      return $xeradiogroup ? $xeradiogroup.strict : this.strict
    }
  },
  render (h) {
    const { $scopedSlots, $xeradiogroup, isDisabled, title, vSize, value, label, name, content } = this
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
          name: $xeradiogroup ? $xeradiogroup.name : name,
          disabled: isDisabled
        },
        domProps: {
          checked: $xeradiogroup ? $xeradiogroup.value === label : value === label
        },
        on: {
          change: this.changeEvent,
          click: this.clickEvent
        }
      }),
      h('span', {
        class: 'vxe-radio--icon'
      }),
      h('span', {
        class: 'vxe-radio--label'
      }, $scopedSlots.default ? $scopedSlots.default.call(this, {}) : [getFuncText(content)])
    ])
  },
  methods: {
    handleValue (label, evnt) {
      const { $xeradiogroup } = this
      const params = { label, $event: evnt }
      if ($xeradiogroup) {
        $xeradiogroup.handleChecked(params)
      } else {
        this.$emit('input', label)
        this.$emit('change', params)
      }
    },
    changeEvent (evnt) {
      const { isDisabled } = this
      if (!isDisabled) {
        this.handleValue(this.label, evnt)
      }
    },
    clickEvent (evnt) {
      const { $xeradiogroup, isDisabled, isStrict } = this
      if (!isDisabled && !isStrict) {
        if (this.label === ($xeradiogroup ? $xeradiogroup.value : this.value)) {
          this.handleValue(null, evnt)
        }
      }
    }
  }
}
