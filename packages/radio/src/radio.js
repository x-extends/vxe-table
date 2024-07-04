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
    },
    $xeform: {
      default: null
    },
    $xeformiteminfo: {
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
    },
    isChecked () {
      return this.$xeradiogroup ? this.$xeradiogroup.value === this.label : this.value === this.label
    }
  },
  render (h) {
    const { $scopedSlots, $xeradiogroup, isDisabled, isChecked, title, vSize, name, content } = this
    const attrs = {}
    if (title) {
      attrs.title = title
    }
    return h('label', {
      class: ['vxe-radio', {
        [`size--${vSize}`]: vSize,
        'is--checked': isChecked,
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
          checked: isChecked
        },
        on: {
          change: this.changeEvent,
          click: this.clickEvent
        }
      }),
      h('span', {
        class: ['vxe-radio--icon', isChecked ? 'vxe-icon-radio-checked' : 'vxe-icon-radio-unchecked']
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
        $xeradiogroup.handleChecked(params, evnt)
      } else {
        this.$emit('input', label)
        this.$emit('change', params)
        // 自动更新校验状态
        if (this.$xeform && this.$xeformiteminfo) {
          this.$xeform.triggerItemEvent(evnt, this.$xeformiteminfo.itemConfig.field, label)
        }
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
