export default {
  name: 'VxeIcon',
  props: {
    name: String
  },
  render (h) {
    return h('i', {
      class: `vxe-icon-${this.name}`,
      on: {
        click: this.clickEvent
      }
    })
  },
  methods: {
    clickEvent (evnt) {
      this.$emit('click', { $event: evnt })
    }
  }
}
