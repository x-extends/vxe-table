import GlobalConfig from '../../conf'

export default {
  name: 'VxeCheckboxGroup',
  props: {
    value: Array,
    disabled: Boolean,
    size: { type: String, default: () => GlobalConfig.checkbox.size || GlobalConfig.size }
  },
  provide () {
    return {
      $xegroup: this
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    return h('div', {
      class: 'vxe-checkbox-group'
    }, this.$slots.default)
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
      this.$emit('change', Object.assign({ checklist }, params), evnt)
    }
  }
}
