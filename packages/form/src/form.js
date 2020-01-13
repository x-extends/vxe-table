import XEUtils from 'xe-utils'

export default {
  name: 'VxeForm',
  props: {
    data: Object,
    titleWidth: [Number, String]
  },
  provide () {
    return {
      $vxeform: this
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    return h('form', {
      class: ['vxe-form', {
        [`size--${this.vSize}`]: this.vSize
      }],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, this.$slots.default)
  },
  methods: {
    submitEvent (evnt) {
      evnt.preventDefault()
      this.$emit('submit')
    },
    resetEvent (evnt) {
      const data = this.data
      if (data) {
        this.$children.forEach(({ field }) => {
          if (field) {
            XEUtils.set(data, field, null)
          }
        })
      }
      this.$emit('reset')
    }
  }
}
