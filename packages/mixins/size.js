export default {
  computed: {
    vSize () {
      const { $parent, size } = this
      return size || ($parent && ($parent.size || $parent.vSize))
    }
  }
}
