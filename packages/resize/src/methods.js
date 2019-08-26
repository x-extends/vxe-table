import Resize from './resize'

export default {
  bindResize () {
    Resize.on(this, this.$el.parentNode, this.recalculate)
  },
  unbindResize () {
    Resize.off(this, this.$el.parentNode)
  }
}
