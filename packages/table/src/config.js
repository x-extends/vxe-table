import VxeTable from './table'
import VxeTableColumn from './column'
import TableProps from './props'

function buildColumns (h, columns) {
  return columns ? columns.map(props => h('vxe-table-column', { props }, buildColumns(h, props.children))) : []
}

export default {
  name: 'VxeTableConfig',
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
      on: this.$listeners
    }, buildColumns(h, this.columns))
  }
}
