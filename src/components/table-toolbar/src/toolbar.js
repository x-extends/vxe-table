import XEUtils from 'xe-utils'

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
  data () {
    return {
      btnList: [
        {
          code: 'insert',
          name: '新增'
        },
        {
          code: 'pending',
          name: '标记/取消'
        },
        {
          code: 'delete',
          name: '删除'
        },
        {
          code: 'save',
          name: '保存'
        },
        {
          code: 'reload',
          name: '刷新'
        },
        {
          code: 'query',
          name: '查询'
        },
        {
          code: 'export',
          name: '导出'
        }
      ]
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    btnConfig () {
      let { btnList, buttons } = this
      return buttons.map(code => Object.assign({}, XEUtils.isString(code) ? btnList.find(item => item.code === code) : code))
    }
  },
  render (h) {
    let { btnConfig, vSize, btnEvent } = this
    return h('div', {
      class: ['vxe-table-toolbar', {
        [`size--${vSize}`]: vSize
      }]
    }, btnConfig.map(item => {
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
          $grid.insert().then(({ row }) => $grid.setActiveRow(row))
          break
        case 'pending':
          $grid.triggerPendingEvent(evnt)
          break
        case 'delete':
          $grid.commitProxy('delete')
          break
        case 'save':
          $grid.commitProxy('save')
          break
        case 'query':
          $grid.commitProxy('query')
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
