export default {
  name: 'VxeCheckboxGroup',
  props: {
    value: Array,
    size: String
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
      let { checked, label } = params
      let checklist = this.value || []
      let checkIndex = checklist.indexOf(label)
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
