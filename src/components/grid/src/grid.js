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
    pagerConfig: Object,
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
      filterData: {},
      sortData: {
        prop: '',
        order: ''
      },
      tablePage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isAlert () {
      return this.proxyConfig && this.proxyConfig.alert !== false
    },
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
      this.loadColumn(value)
    }
  },
  created () {
    let { customs, pagerConfig } = this
    if (customs) {
      this.tableCustoms = customs
    }
    if (pagerConfig && pagerConfig.pageSize) {
      this.tablePage.pageSize = pagerConfig.pageSize
    }
  },
  mounted () {
    let { columns, proxyConfig } = this
    if (columns && columns.length) {
      this.loadColumn(this.columns)
    }
    if (proxyConfig && proxyConfig.autoLoad !== false) {
      this.commitProxy('query')
    }
  },
  render (h) {
    let { $slots, $listeners, pagerConfig, vSize, loading, toolbar, editConfig, proxyConfig, tableProps, tableLoading, tablePage, tableData, tableCustoms, optimization } = this
    let props = Object.assign({}, tableProps)
    let tableOns = Object.assign({}, $listeners)
    let toolbarProps = Object.assign({
      customs: tableCustoms,
      optimization: Object.assign({}, GlobalConfig.optimization, optimization)
    }, toolbar)
    if (proxyConfig) {
      Object.assign(props, {
        loading: loading || tableLoading,
        data: tableData,
        rowClassName: this.handleRowClassName
      })
      if (proxyConfig.sort) {
        tableOns['sort-change'] = this.sortChangeEvent
      }
      if (proxyConfig.filter) {
        tableOns['filter-change'] = this.filterChangeEvent
      }
    }
    if (toolbar) {
      props.customs = tableCustoms
      tableOns['update:customs'] = value => {
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
        [`size--${vSize}`]: vSize,
        't--animat': toolbarProps.optimization.animat
      }]
    }, [
      toolbar ? h('vxe-toolbar', {
        ref: 'toolbar',
        props: toolbarProps
      }) : null,
      h('vxe-table', {
        props,
        on: tableOns,
        ref: 'xTable'
      }, $slots.default),
      pagerConfig ? h('vxe-pager', {
        props: Object.assign({
          size: vSize,
          loading: loading || tableLoading
        }, pagerConfig, proxyConfig ? tablePage : {}),
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
      let { proxyConfig = {}, tablePage, pagerConfig, sortData, filterData, isAlert } = this
      let { ajax, props = {} } = proxyConfig
      if (ajax) {
        switch (code) {
          case 'reload':
          case 'query': {
            if (ajax.query) {
              let params = {
                sort: sortData,
                filter: filterData
              }
              this.tableLoading = true
              if (pagerConfig) {
                params.page = tablePage
              }
              if (code === 'reload') {
                if (pagerConfig) {
                  tablePage.currentPage = 1
                }
                this.pendingRecords = []
              }
              return ajax.query(params).then(result => {
                if (result) {
                  if (pagerConfig) {
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
                  if (isAlert) {
                    this.$XTool.alert(GlobalConfig.i18n('vxe.grid.selectOneRecord')).catch(e => e)
                  }
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
                  if (isAlert) {
                    this.$XTool.alert(GlobalConfig.i18n('vxe.grid.dataUnchanged')).catch(e => e)
                  }
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
      let { pendingRecords, isAlert } = this
      let selectRecords = this.getSelectRecords()
      if (selectRecords.length) {
        let plus = []
        let minus = []
        selectRecords.forEach(data => {
          if (pendingRecords.some(item => data === item)) {
            minus.push(data)
          } else {
            plus.push(data)
          }
        })
        if (minus.length) {
          this.pendingRecords = pendingRecords.filter(item => minus.some(data => data !== item)).concat(plus)
        } else if (plus) {
          this.pendingRecords = pendingRecords.concat(plus)
        }
        this.clearSelection()
      } else {
        if (isAlert) {
          this.$XTool.alert(GlobalConfig.i18n('vxe.grid.selectOneRecord')).catch(e => e)
        }
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
    },
    sortChangeEvent ({ column, prop, order }) {
      let { sortData } = this
      // 如果是服务端排序
      if (column.remoteSort) {
        sortData.prop = prop
        sortData.order = order
        this.commitProxy('query')
      } else {
        UtilTools.emitEvent(this, 'sort-change', [column, prop, order])
      }
    },
    filterChangeEvent ({ column, prop, values }) {
      // 如果是服务端过滤
      if (column.remoteFilter) {
        this.filterData[prop] = values
        this.commitProxy('reload')
      } else {
        UtilTools.emitEvent(this, 'filter-change', [column, prop, values])
      }
    }
  }
}
