import VxeTable from './table'
import VxeTableColumn from './column'
import TableProps from './props'
import funs from './func'
import UtilTools from '../../../tools/utils'

const methods = {}

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
  watch: {
    columns (value) {
      this.$refs.xTable.loadColumn(value)
    }
  },
  mounted () {
    if (this.columns && this.columns.length) {
      this.$refs.xTable.loadColumn(this.columns)
    }
  },
  render (h) {
    let { $slots, $listeners, $props, pages, size, loading } = this
    return h('div', {
      class: 'vxe-grid'
    }, [
      h('vxe-table', {
        props: $props,
        on: $listeners,
        ref: 'xTable'
      }, $slots.default),
      pages ? h('vxe-pagination', {
        class: ['vxe-grid--pagination', {
          'is--loading': loading
        }],
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
