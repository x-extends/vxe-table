export default {
  name: 'VxeIcon',
  props: {
    name: String,
    roll: Boolean,
    status: String
  },
  render (h) {
    const { name, roll, status } = this
    return h('i', {
      class: [`vxe-icon-${name}`, roll || '', status ? [`theme--${status}`] : ''],
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
