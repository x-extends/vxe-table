import GlobalConfig from '../../v-x-e-table/src/conf'

export default {
  name: 'VxeCheckboxGroup',
  props: {
    value: Array,
    disabled: Boolean,
    size: { type: String, default: () => GlobalConfig.checkbox.size || GlobalConfig.size }
  },
  provide () {
    return {
      $xecheckboxgroup: this
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    const { $scopedSlots } = this
    return h('div', {
      class: 'vxe-checkbox-group'
    }, $scopedSlots.default ? $scopedSlots.default.call(this, {}) : [])
  },
  methods: {
    handleChecked (params) {
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
    }
  }
}
