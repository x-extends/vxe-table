import VxeTable from './table'
import VxeTableColumn from './column'
import TableProps from './props'
import funs from './func'
import UtilTools from '../../../tools/utils'

const methods = {}

function buildColumns (h, columns) {
  return columns ? columns.map(props => h('vxe-table-column', { props }, buildColumns(h, props.children))) : []
}

funs.forEach(name => {
  methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments)
  }
})

export default {
  name: 'VxeGrid',
  props: {
    columns: Array,
    pages: Object,
    ...TableProps
  },
  components: {
    VxeTable,
    VxeTableColumn
  },
  render (h) {
    let { $listeners, $props, columns, pages, size } = this
    return h('div', {
      class: 'vxe-grid'
    }, [
      h('vxe-table', {
        props: $props,
        on: $listeners,
        ref: 'xTable'
      }, buildColumns(h, columns)),
      pages ? h('vxe-pagination', {
        props: Object.assign({ size }, pages),
        on: {
          'current-change': this.currentChangeEvent,
          'size-change': this.sizeChangeEvent
        }
      }) : null
    ])
  },
  methods: {
    ...methods,
    currentChangeEvent (currentPage) {
      UtilTools.emitEvent(this, 'current-page-change', [currentPage])
    },
    sizeChangeEvent (pageSize) {
      UtilTools.emitEvent(this, 'page-size-change', [pageSize])
    }
  }
}
