import TableProps from '../../table/src/props'
import funs from '../../table/src/func'
import UtilTools from '../../../tools/utils'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../../conf'

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
      tableCustoms: [],
      pendingRecords: [],
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
  created () {
    let { customs } = this
    if (customs) {
      this.tableCustoms = customs
    }
  },
  mounted () {
    let { columns, proxyConfig } = this
    if (columns && columns.length) {
      this.$refs.xTable.loadColumn(this.columns)
    }
    if (proxyConfig && proxyConfig.autoLoad !== false) {
      this.commitProxy('query')
    }
  },
  render (h) {
    let { $slots, $listeners, pageConfig, size, loading, toolbar, editConfig, proxyConfig, tableProps, tableLoading, tablePage, tableData, tableCustoms, optimization } = this
    let props = Object.assign({}, tableProps)
    let on = Object.assign({}, $listeners)
    let toolbarProps = Object.assign({
      tableCustoms,
      optimization: Object.assign({}, GlobalConfig.optimization, optimization)
    }, toolbar)
    if (proxyConfig) {
      Object.assign(props, {
        loading: tableLoading,
        data: tableData,
        rowClassName: this.handleRowClassName
      })
    }
    if (toolbar) {
      props.customs = tableCustoms
      on['update:customs'] = value => {
        this.tableCustoms = value
      }
    }
    if (editConfig) {
      props.editConfig = Object.assign({}, editConfig, {
        activeMethod: this.handleActiveMethod
      })
    }
    return h('div', {
      class: [ 'vxe-grid', {
        't--animat': toolbarProps.optimization.animat
      }]
    }, [
      toolbar ? h('vxe-table-toolbar', {
        ref: 'toolbar',
        props: toolbarProps
      }) : null,
      h('vxe-table', {
        props,
        on,
        ref: 'xTable'
      }, $slots.default),
      pageConfig ? h('vxe-pagination', {
        class: ['vxe-grid--pagination', {
          'is--loading': loading
        }],
        props: Object.assign({ size }, proxyConfig ? tablePage : {}, pageConfig),
        on: {
          'current-change': this.currentChangeEvent,
          'size-change': this.sizeChangeEvent
        }
      }) : null
    ])
  },
  methods: {
    ...methods,
    handleRowClassName ({ row }) {
      if (this.pendingRecords.some(item => item === row)) {
        return 'row--pending'
      }
      return ''
    },
    handleActiveMethod ({ row }) {
      return this.pendingRecords.indexOf(row) === -1
    },
    commitProxy (code) {
      let { proxyConfig = {}, tablePage, pageConfig } = this
      let { ajax, props = {} } = proxyConfig
      if (ajax) {
        switch (code) {
          case 'reload':
          case 'query': {
            if (ajax.query) {
              let params = {}
              this.tableLoading = true
              if (pageConfig) {
                params.page = tablePage
              }
              if (code === 'reload') {
                if (pageConfig) {
                  tablePage.currentPage = 1
                }
                this.pendingRecords = []
              }
              return ajax.query(params).then(result => {
                if (result) {
                  if (pageConfig) {
                    tablePage.total = XEUtils.get(result, props.total || 'page.total')
                    this.tableData = XEUtils.get(result, props.data || 'result')
                  } else {
                    this.tableData = props.data ? XEUtils.get(result, props.data) : result
                  }
                } else {
                  this.tableData = []
                }
                this.tableLoading = false
              }).catch(e => {
                this.tableLoading = false
              })
            }
            break
          }
          case 'delete': {
            if (ajax.delete) {
              this.removeSelecteds()
              return this.validate().then(() => {
                let removeRecords = this.getRemoveRecords()
                let body = { removeRecords }
                if (removeRecords.length) {
                  this.tableLoading = true
                  return ajax.delete({ body }).then(result => {
                    this.tableLoading = false
                  }).catch(e => {
                    this.tableLoading = false
                  }).then(() => this.commitProxy('reload'))
                } else {
                  // 请至少选择一条数据！
                }
              })
            }
            break
          }
          case 'save': {
            if (ajax.save) {
              return this.validate().then(() => {
                let body = Object.assign({ pendingRecords: this.pendingRecords }, this.getAllRecords())
                let { insertRecords, removeRecords, updateRecords, pendingRecords } = body
                if (insertRecords.length || removeRecords.length || updateRecords.length || pendingRecords.length) {
                  this.tableLoading = true
                  return ajax.save({ body }).then(result => {
                    this.tableLoading = false
                  }).catch(e => {
                    this.tableLoading = false
                  }).then(() => this.commitProxy('reload'))
                } else {
                  // 数据未更改！
                }
              })
            }
            break
          }
        }
      }
      return this.$nextTick()
    },
    getPendingRecords () {
      return this.pendingRecords
    },
    triggerPendingEvent (evnt) {
      let selectRecords = this.getSelectRecords()
      if (selectRecords.length) {
        let plus = []
        let minus = []
        selectRecords.forEach(data => {
          if (this.pendingRecords.some(item => data === item)) {
            minus.push(data)
          } else {
            plus.push(data)
          }
        })
        if (minus.length) {
          this.pendingRecords = this.pendingRecords.filter(item => minus.some(data => data !== item)).concat(plus)
        } else if (plus) {
          this.pendingRecords = this.pendingRecords.concat(plus)
        }
        this.clearSelection()
      } else {
        // 请至少选择一条数据！
      }
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
