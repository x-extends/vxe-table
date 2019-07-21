import Table from '../../table'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools } from '../../tools'

const methods = {}
const propKeys = Object.keys(Table.props)

Object.keys(Table.methods).forEach(name => {
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
    ...Table.props
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
      filterData: [],
      sortData: {
        field: '',
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
    isMsg () {
      return this.proxyOpts.message !== false
    },
    proxyOpts () {
      return Object.assign({}, GlobalConfig.grid.proxyConfig, this.proxyConfig)
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
    },
    tableCustoms () {
      let { $refs, toolbar } = this
      if (toolbar && $refs.toolbar) {
        $refs.toolbar.loadStorage()
      }
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
    let { columns, proxyConfig, proxyOpts } = this
    if (columns && columns.length) {
      this.loadColumn(this.columns)
    }
    if (proxyConfig && proxyOpts.autoLoad !== false) {
      this.commitProxy('query')
    }
  },
  render (h) {
    let { $slots, $scopedSlots, $listeners, pagerConfig, vSize, loading, toolbar, editConfig, proxyConfig, proxyOpts, tableProps, tableLoading, tablePage, tableData, tableCustoms, optimization } = this
    let props = Object.assign({}, tableProps, {
      optimization: Object.assign({}, GlobalConfig.optimization, optimization)
    })
    let tableOns = Object.assign({}, $listeners)
    let $buttons = $scopedSlots.buttons
    if (proxyConfig) {
      Object.assign(props, {
        loading: loading || tableLoading,
        data: tableData,
        rowClassName: this.handleRowClassName
      })
      if (proxyOpts.index && pagerConfig) {
        props.startIndex = (tablePage.currentPage - 1) * tablePage.pageSize
      }
      if (proxyOpts.sort) {
        tableOns['sort-change'] = this.sortChangeEvent
      }
      if (proxyOpts.filter) {
        tableOns['filter-change'] = this.filterChangeEvent
      }
    }
    if (toolbar) {
      if (toolbar.slots) {
        $buttons = toolbar.slots.buttons || $buttons
      }
      if (!(toolbar.setting && toolbar.setting.storage)) {
        props.customs = tableCustoms
      }
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
        't--animat': props.optimization.animat
      }]
    }, [
      toolbar ? h('vxe-toolbar', {
        ref: 'toolbar',
        props: toolbar,
        scopedSlots: $buttons ? {
          buttons: $buttons
        } : null
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
          'page-change': this.pageChangeEvent
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
      let { proxyOpts, tablePage, pagerConfig, sortData, filterData, isMsg } = this
      let { ajax, props = {} } = proxyOpts
      if (ajax) {
        switch (code) {
          case 'insert':
            this.insert()
            break
          case 'insert_actived':
            this.insert().then(({ row }) => this.setActiveRow(row))
            break
          case 'mark_cancel':
            this.triggerPendingEvent(code)
            break
          case 'delete_selection':
            this.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', () => this.commitProxy('delete'))
            break
          case 'remove_selection':
            this.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', () => this.removeSelecteds())
            break
          case 'export':
            this.exportCsv()
            break
          case 'reload':
          case 'query': {
            if (ajax.query) {
              let params = {
                sort: sortData,
                filters: filterData
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
              return ajax.query(params).then(rest => {
                if (rest) {
                  if (pagerConfig) {
                    // （v3.0 废弃 data）
                    tablePage.total = XEUtils.get(rest, props.total || 'page.total') || 0
                    this.tableData = XEUtils.get(rest, props.result || props.data || 'result') || []
                  } else {
                    this.tableData = (props.list ? XEUtils.get(rest, props.list) : rest) || []
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
              let selectRecords = this.getSelectRecords()
              this.remove(selectRecords).then(() => {
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
                  if (isMsg && !selectRecords.length) {
                    this.$XMsg.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
                  }
                }
              })
            }
            break
          }
          case 'save': {
            if (ajax.save) {
              let body = Object.assign({ pendingRecords: this.pendingRecords }, this.getRecordset())
              let { insertRecords, removeRecords, updateRecords, pendingRecords } = body
              // 排除掉新增且标记为删除的数据
              if (insertRecords.length) {
                body.pendingRecords = pendingRecords.filter(row => insertRecords.indexOf(row) === -1)
              }
              // 排除已标记为删除的数据
              if (pendingRecords.length) {
                body.insertRecords = insertRecords.filter(row => pendingRecords.indexOf(row) === -1)
              }
              // 只校验新增和修改的数据
              return new Promise(resolve => {
                this.validate(body.insertRecords.concat(updateRecords), vaild => {
                  if (vaild) {
                    if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                      this.tableLoading = true
                      resolve(
                        ajax.save({ body }).then(() => {
                          this.$XMsg.message({ id: code, message: GlobalConfig.i18n('vxe.grid.saveSuccess'), status: 'success' })
                          this.tableLoading = false
                        }).catch(e => {
                          this.tableLoading = false
                        }).then(() => this.commitProxy('reload'))
                      )
                    } else {
                      if (isMsg) {
                        // 直接移除未保存且标记为删除的数据
                        if (pendingRecords.length) {
                          this.remove(pendingRecords)
                        } else {
                          this.$XMsg.message({ id: code, message: GlobalConfig.i18n('vxe.grid.dataUnchanged'), status: 'info' })
                        }
                      }
                      resolve()
                    }
                  } else {
                    resolve(vaild)
                  }
                })
              })
            }
            break
          }
        }
      }
      return this.$nextTick()
    },
    handleDeleteRow (code, alertKey, callback) {
      let selectRecords = this.getSelectRecords()
      if (this.isMsg) {
        if (selectRecords.length) {
          this.$XMsg.confirm(GlobalConfig.i18n(alertKey)).then(callback).catch(e => e)
        } else {
          this.$XMsg.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
        }
      } else {
        if (selectRecords.length) {
          callback()
        }
      }
    },
    getPendingRecords () {
      return this.pendingRecords
    },
    triggerPendingEvent (code, evnt) {
      let { pendingRecords, isMsg } = this
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
          this.pendingRecords = pendingRecords.filter(item => minus.indexOf(item) === -1).concat(plus)
        } else if (plus.length) {
          this.pendingRecords = pendingRecords.concat(plus)
        }
        this.clearSelection()
      } else {
        if (isMsg) {
          this.$XMsg.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
        }
      }
    },
    pageChangeEvent (params) {
      let { tablePage } = this
      let { currentPage, pageSize } = params
      tablePage.currentPage = currentPage
      tablePage.pageSize = pageSize
      if (params.type === 'current-change') {
        UtilTools.emitEvent(this, 'current-page-change', [currentPage])
      } else {
        UtilTools.emitEvent(this, 'page-size-change', [pageSize])
      }
      UtilTools.emitEvent(this, 'page-change', [params])
      this.commitProxy('query')
    },
    sortChangeEvent (params) {
      let { remoteSort, sortData } = this
      let { column, field, order } = params
      let isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort
      // 如果是服务端排序
      if (isRemote) {
        sortData.field = field
        sortData.order = order
        this.commitProxy('query')
      } else {
        UtilTools.emitEvent(this, 'sort-change', [params])
      }
    },
    filterChangeEvent (params) {
      let { remoteFilter } = this
      let { filters } = params
      // 如果是服务端过滤
      if (remoteFilter) {
        this.filterData = filters
        this.commitProxy('reload')
      } else {
        UtilTools.emitEvent(this, 'filter-change', [params])
      }
    }
  }
}
