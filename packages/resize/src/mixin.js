import Resize from './resize'

export default {
  methods: {
    bindResize () {
      const resizeObserver = new Resize(() => this.recalculate(true))
      resizeObserver.observe(this.$el)
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
}
