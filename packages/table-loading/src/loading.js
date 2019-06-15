export default {
  name: 'VxeTableLoading',
  props: {
    visible: Boolean
  },
  render (h) {
    return h('div', {
      class: ['vxe-table--loading'],
      style: {
        display: this.visible ? 'block' : 'none'
      }
    }, [
      h('div', {
        class: 'vxe-table--spinner'
      })
    ])
  }
}
