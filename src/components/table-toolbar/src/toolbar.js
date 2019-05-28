export default {
  name: 'VxeTableToolbar',
  props: {
    setting: Boolean,
    buttons: Array,
    size: String
  },
  inject: [
    '$grid'
  ],
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    let { buttons, vSize, btnEvent } = this
    return h('div', {
      class: ['vxe-table-toolbar', {
        [`size--${vSize}`]: vSize
      }]
    }, buttons.map(item => {
      return h('vxe-button', {
        on: {
          click: evnt => btnEvent(item, evnt)
        }
      }, item.name)
    }))
  },
  methods: {
    btnEvent (item, evnt) {
      let { $grid } = this
      switch (item.code) {
        case 'insert':
          $grid.insert()
          break
        case 'insert_actived':
          $grid.insert().then(({ row }) => $grid.setActiveRow(row))
          break
        case 'delete_pending':
          $grid.triggerPendingEvent(evnt)
          break
        case 'delete_selection':
          $grid.commitProxy('delete')
          break
        case 'delete_rows':
          $grid.removeSelecteds()
          break
        case 'save':
          $grid.commitProxy('save')
          break
        case 'reload':
          $grid.commitProxy('reload')
          break
        case 'export':
          $grid.exportCsv()
          break
      }
    }
  }
}
