export default {
  name: 'VxeLoading',
  props: {
    visible: Boolean
  },
  render (h) {
    return h('div', {
      class: 'vxe-loading',
      style: {
        display: this.visible ? 'block' : 'none'
      }
    }, [
      h('div', {
        class: 'vxe-loading--spinner'
      })
    ])
  }
}
