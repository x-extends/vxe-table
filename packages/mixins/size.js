export default {
  computed: {
    vSize () {
      const { $parent, size } = this
      return size || ($parent && ($parent.size || $parent.vSize)) || this.xesize
    }
  },
  inject: {
    xesize: {
      default: null
    }
  },
  provide () {
    return {
      xesize: this.vSize
    }
  }
}
