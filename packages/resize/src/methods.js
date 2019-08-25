import Resize from './resize'

const resizeMethods = {
  bindResize () {
    Resize.on(this, this.$el.parentNode, this.recalculate)
  },
  unbindResize () {
    Resize.off(this, this.$el.parentNode)
  }
}

export default resizeMethods
