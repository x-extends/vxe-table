import VxeTable from './table'
import VxeTableColumn from './column'
import TableProps from './props'
import funs from './func'

const methods = {}

function buildColumns (h, columns) {
  return columns ? columns.map(props => h('vxe-table-column', { props }, buildColumns(h, props.children))) : []
}

funs.forEach(name => {
  methods[name] = function () {
    this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments)
  }
})

export default {
  name: 'VxeGrid',
  props: {
    columns: Array,
    ...TableProps
  },
  components: {
    VxeTable,
    VxeTableColumn
  },
  render (h) {
    return h('vxe-table', {
      props: this.$props,
      on: this.$listeners,
      ref: 'xTable'
    }, buildColumns(h, this.columns))
  },
  methods
}
