export default {
  name: 'VxeIcon',
  props: {
    name: String,
    roll: Boolean
  },
  render (h) {
    return h('i', {
      class: [`vxe-icon-${this.name}`, this.roll ? 'roll' : ''],
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
