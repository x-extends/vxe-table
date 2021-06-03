import { UtilTools } from '../../tools'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'

export default {
  name: 'VxeCheckbox',
  mixins: [vSize],
  props: {
    value: [String, Number, Boolean],
    label: [String, Number],
    indeterminate: Boolean,
    title: [String, Number],
    content: [String, Number],
    checkedValue: { type: [String, Number, Boolean], default: true },
    uncheckedValue: { type: [String, Number, Boolean], default: false },
    disabled: Boolean,
    size: { type: String, default: () => GlobalConfig.checkbox.size || GlobalConfig.size }
  },
  inject: {
    $xecheckboxgroup: {
      default: null
    }
  },
  computed: {
    isGroup () {
      return this.$xecheckboxgroup
    },
    isDisabled () {
      return this.disabled || (this.isGroup && this.$xecheckboxgroup.disabled)
    }
  },
  render (h) {
    const { $scopedSlots, $xecheckboxgroup, isGroup, isDisabled, title, vSize, indeterminate, value, label, content, checkedValue } = this
    const attrs = {}
    if (title) {
      attrs.title = title
    }
    return h('label', {
      class: ['vxe-checkbox', {
        [`size--${vSize}`]: vSize,
        'is--indeterminate': indeterminate,
        'is--disabled': isDisabled
      }],
      attrs
    }, [
      h('input', {
        class: 'vxe-checkbox--input',
        attrs: {
          type: 'checkbox',
          disabled: isDisabled
        },
        domProps: {
          checked: isGroup ? XEUtils.includes($xecheckboxgroup.value, label) : value === checkedValue
        },
        on: {
          change: this.changeEvent
        }
      }),
      h('span', {
        class: 'vxe-checkbox--icon'
      }),
      h('span', {
        class: 'vxe-checkbox--label'
      }, $scopedSlots.default ? $scopedSlots.default.call(this, {}) : [UtilTools.getFuncText(content)])
    ])
  },
  methods: {
    changeEvent (evnt) {
      const { $xecheckboxgroup, isGroup, isDisabled, label, checkedValue, uncheckedValue } = this
      if (!isDisabled) {
        const checked = evnt.target.checked
        const value = checked ? checkedValue : uncheckedValue
        const params = { checked, value, label, $event: evnt }
        if (isGroup) {
          $xecheckboxgroup.handleChecked(params)
        } else {
          this.$emit('input', value)
          this.$emit('change', params)
        }
      }
    }
  }
}
