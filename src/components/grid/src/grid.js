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
      filterData: {},
      sortData: {
        prop: '',
        order: ''
      },
      tablePage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      tableAlert: {
        visible: false,
        message: ''
      }
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
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
    let { $slots, $listeners, pageConfig, vSize, loading, toolbar, editConfig, proxyConfig, tableProps, tableLoading, tablePage, tableData, tableCustoms, optimization, tableAlert } = this
    let props = Object.assign({}, tableProps)
    let tableOns = Object.assign({}, $listeners)
    let toolbarProps = Object.assign({
      customs: tableCustoms,
      optimization: Object.assign({}, GlobalConfig.optimization, optimization)
    }, toolbar)
    let alertProps = null
    if (proxyConfig) {
      Object.assign(props, {
        loading: tableLoading,
        data: tableData,
        rowClassName: this.handleRowClassName
      })
      if (proxyConfig.alert) {
        alertProps = Object.assign({}, proxyConfig.alert, {
          value: tableAlert.visible,
          message: tableAlert.message
        })
      }
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
      toolbar ? h('vxe-table-toolbar', {
        ref: 'toolbar',
        props: toolbarProps
      }) : null,
      h('vxe-table', {
        props,
        on: tableOns,
        ref: 'xTable'
      }, $slots.default),
      pageConfig ? h('vxe-pagination', {
        class: ['vxe-grid--pagination', {
          'is--loading': loading
        }],
        props: Object.assign({ size: vSize }, proxyConfig ? tablePage : {}, pageConfig),
        on: {
          'current-change': this.currentChangeEvent,
          'size-change': this.sizeChangeEvent
        }
      }) : null,
      proxyConfig && proxyConfig.alert ? h('vxe-alert', {
        props: alertProps,
        on: {
          close: this.closeAlertEvent
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
      let { proxyConfig = {}, tablePage, pageConfig, sortData, filterData, tableAlert } = this
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
                  tableAlert.message = GlobalConfig.i18n('vxe.grid.selectOneRecord')
                  tableAlert.visible = true
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
                  tableAlert.message = GlobalConfig.i18n('vxe.grid.dataUnchanged')
                  tableAlert.visible = true
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
      let { pendingRecords, tableAlert } = this
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
        tableAlert.message = GlobalConfig.i18n('vxe.grid.selectOneRecord')
        tableAlert.visible = true
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
    },
    closeAlertEvent () {
      this.tableAlert.visible = false
    }
  }
}
