import Resize from './resize'

export default {
  bindResize () {
    const resizeObserver = new Resize(this.recalculate)
    resizeObserver.observe(this.getParentElem())
    this.$resize = resizeObserver
  },
  unbindResize () {
    const $resize = this.$resize
    if ($resize) {
      $resize.disconnect()
    }
  }
}
