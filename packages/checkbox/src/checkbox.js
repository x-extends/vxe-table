import { getFuncText } from '../../tools/utils'
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
    },
    $xeform: {
      default: null
    },
    $xeformiteminfo: {
      default: null
    }
  },
  computed: {
    isGroup () {
      return this.$xecheckboxgroup
    },
    isMaximize () {
      return this.isGroup && this.$xecheckboxgroup.props.isMaximize
    },
    isDisabled () {
      if (this.disabled) {
        return true
      }
      if (this.isGroup) {
        const { disabled, isMaximize } = this.$xecheckboxgroup
        return disabled || (isMaximize && !this.isChecked)
      }
      return false
    },
    isChecked () {
      return this.isGroup ? XEUtils.includes(this.$xecheckboxgroup.value, this.label) : this.value === this.checkedValue
    }
  },
  render (h) {
    const { $scopedSlots, isDisabled, title, vSize, indeterminate, content, isChecked } = this
    const attrs = {}
    if (title) {
      attrs.title = title
    }
    return h('label', {
      class: ['vxe-checkbox', {
        [`size--${vSize}`]: vSize,
        'is--indeterminate': indeterminate,
        'is--disabled': isDisabled,
        'is--checked': isChecked
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
          checked: isChecked
        },
        on: {
          change: this.changeEvent
        }
      }),
      h('span', {
        class: ['vxe-checkbox--icon', indeterminate ? 'vxe-icon-checkbox-indeterminate' : (isChecked ? 'vxe-icon-checkbox-checked' : 'vxe-icon-checkbox-unchecked')]
      }),
      h('span', {
        class: 'vxe-checkbox--label'
      }, $scopedSlots.default ? $scopedSlots.default.call(this, {}) : [getFuncText(content)])
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
          $xecheckboxgroup.handleChecked(params, evnt)
        } else {
          this.$emit('input', value)
          this.$emit('change', params)
          // 自动更新校验状态
          if (this.$xeform && this.$xeformiteminfo) {
            this.$xeform.triggerItemEvent(evnt, this.$xeformiteminfo.itemConfig.field, value)
          }
        }
      }
    }
  }
}
