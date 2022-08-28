import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'

export default {
  name: 'VxeCheckboxGroup',
  props: {
    value: Array,
    disabled: Boolean,
    max: [String, Number],
    size: { type: String, default: () => GlobalConfig.checkbox.size || GlobalConfig.size }
  },
  inject: {
    $xeform: {
      default: null
    },
    $xeformiteminfo: {
      default: null
    }
  },
  provide () {
    return {
      $xecheckboxgroup: this
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isMaximize () {
      const { value, max } = this
      if (max) {
        return value.length >= XEUtils.toNumber(max)
      }
      return false
    }
  },
  render (h) {
    const { $scopedSlots } = this
    return h('div', {
      class: 'vxe-checkbox-group'
    }, $scopedSlots.default ? $scopedSlots.default.call(this, {}) : [])
  },
  methods: {
    handleChecked (params, evnt) {
      const { checked, label } = params
      const checklist = this.value || []
      const checkIndex = checklist.indexOf(label)
      if (checked) {
        if (checkIndex === -1) {
          checklist.push(label)
        }
      } else {
        checklist.splice(checkIndex, 1)
      }
      this.$emit('input', checklist)
      this.$emit('change', Object.assign({ checklist }, params))
      // 自动更新校验状态
      if (this.$xeform && this.$xeformiteminfo) {
        this.$xeform.triggerItemEvent(evnt, this.$xeformiteminfo.itemConfig.field, checklist)
      }
    }
  }
}
