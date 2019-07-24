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
    return h(type === 'text' ? 'a' : 'button', {
      class: ['vxe-button', {
        [`size--${vSize}`]: vSize,
        [`type--${type}`]: type
      }],
      on: XEUtils.objectMap($listeners, (cb, type) => evnt => this.$emit(type, evnt))
    }, this.$slots.default)
  }
}
