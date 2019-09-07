import Resize from './resize'

export default {
  bindResize () {
    const resizeObserver = new Resize(this.recalculate)
    resizeObserver.observe(this.$el.parentNode)
    this.$resize = resizeObserver
  },
  unbindResize () {
    const $resize = this.$resize
    if ($resize) {
      $resize.disconnect()
    }
  }
}
