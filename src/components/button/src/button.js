import XEUtils from 'xe-utils'

export default {
  name: 'VxeButton',
  props: {
    type: String,
    size: String
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    let { $listeners, type, vSize } = this
    let on = null
    if ($listeners) {
      on = XEUtils.objectMap($listeners, (cb, type) => evnt => this.$emit(type, evnt))
    }
    return h(type === 'text' ? 'a' : 'button', {
      class: ['vxe-button', {
        [`size--${vSize}`]: vSize
      }],
      on
    }, this.$slots.default)
  }
}
