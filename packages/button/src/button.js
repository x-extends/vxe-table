import XEUtils from 'xe-utils'

export default {
  name: 'VxeButton',
  props: {
    type: String,
    size: String,
    disabled: Boolean
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    let { $listeners, type, vSize, disabled } = this
    let isText = type === 'text'
    return h('button', {
      class: ['vxe-button', `type--${isText ? type : 'button'}`, {
        [`size--${vSize}`]: vSize,
        [`theme--${type}`]: type && !isText
      }],
      attrs: {
        disabled: disabled
      },
      on: XEUtils.objectMap($listeners, (cb, type) => evnt => this.$emit(type, evnt))
    }, this.$slots.default)
  }
}
