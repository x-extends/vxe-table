import TableProps from '../../table/src/props'
import funs from '../../table/src/func'
import UtilTools from '../../../tools/utils'
import XEUtils from 'xe-utils'

const methods = {}
const propKeys = Object.keys(TableProps)

funs.forEach(name => {
  methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments)
  }
})

export default {
  name: 'VxeGrid',
  props: {
    columns: Array,
    pageConfig: Object,
    proxyConfig: Object,
    toolbar: Object,
    ...TableProps
  },
  provide () {
    return {
      $grid: this
    }
  },
  data () {
    return {
      tableLoading: false,
      tableData: [],
      tablePage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  computed: {
    tableProps () {
      let rest = {}
      propKeys.forEach(key => {
        rest[key] = this[key]
      })
      return rest
    }
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
    this.commitProxy('query')
  },
  render (h) {
    let { $slots, $listeners, pageConfig, size, loading, toolbar, proxyConfig, tableProps, tableLoading, tablePage, tableData } = this
    return h('div', {
      class: 'vxe-grid'
    }, [
      toolbar ? h('vxe-table-toolbar', {
        ref: 'toolbar',
        props: toolbar
      }) : null,
      h('vxe-table', {
        props: proxyConfig ? Object.assign({}, tableProps, { loading: tableLoading, data: tableData }) : tableProps,
        on: $listeners,
        ref: 'xTable'
      }, $slots.default),
      pageConfig ? h('vxe-pagination', {
        class: ['vxe-grid--pagination', {
          'is--loading': loading
        }],
        props: Object.assign({ size }, proxyConfig ? tablePage : pageConfig),
        on: {
          'current-change': this.currentChangeEvent,
          'size-change': this.sizeChangeEvent
        }
      }) : null
    ])
  },
  methods: {
    ...methods,
    commitProxy (code) {
      let { proxyConfig = {}, tablePage } = this
      let { ajax, props = {} } = proxyConfig
      if (ajax) {
        switch (code) {
          case 'reload':
          case 'query':
            if (ajax.query) {
              this.tableLoading = true
              if (code === 'reload') {
                tablePage.currentPage = 1
              }
              return ajax.query({ page: tablePage }).then(result => {
                tablePage.total = XEUtils.get(result, props.total || 'page.total')
                this.tableData = XEUtils.get(result, props.data || 'result')
                this.tableLoading = false
              }).catch(e => {
                this.tableLoading = false
              })
            }
            break
          case 'delete':
          case 'save':
            if (ajax.save) {
              return this.validate().then(() => {
                let body = code === 'delete' ? { removeRecords: this.getSelectRecords() } : Object.assign({ pendingRecords: [] }, this.getAllRecords())
                let { insertRecords, removeRecords, updateRecords, pendingRecords } = body
                if (insertRecords.length || removeRecords.length || updateRecords.length || pendingRecords.length) {
                  this.tableLoading = true
                  return ajax.save({ body }).then(result => {
                    this.tableLoading = false
                  }).catch(e => {
                    this.tableLoading = false
                  }).then(() => this.reload(true))
                }
              })
            }
            break
        }
      }
      return this.$nextTick()
    },
    currentChangeEvent (currentPage) {
      this.tablePage.currentPage = currentPage
      this.commitProxy('query')
      UtilTools.emitEvent(this, 'current-page-change', [currentPage])
    },
    sizeChangeEvent (pageSize) {
      this.tablePage.currentPage = 1
      this.tablePage.pageSize = pageSize
      this.commitProxy('reload')
      UtilTools.emitEvent(this, 'page-size-change', [pageSize])
    }
  }
}
