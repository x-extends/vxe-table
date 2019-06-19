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
      return this.proxyConfig && this.proxyConfig.message !== false
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
    let props = Object.assign({}, tableProps, {
      optimization: Object.assign({}, GlobalConfig.optimization, optimization)
    })
    let tableOns = Object.assign({}, $listeners)
    if (proxyConfig) {
      Object.assign(props, {
        loading: loading || tableLoading,
        data: tableData,
        rowClassName: this.handleRowClassName
      })
      if (proxyConfig.index && pagerConfig) {
        props.startIndex = (tablePage.currentPage - 1) * tablePage.pageSize
      }
      if (proxyConfig.sort) {
        tableOns['sort-change'] = this.sortChangeEvent
      }
      if (proxyConfig.filter) {
        tableOns['filter-change'] = this.filterChangeEvent
      }
    }
    if (toolbar) {
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
        props: toolbar
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
                  if (isAlert && !selectRecords.length) {
                    this.$XMsg.alert(GlobalConfig.i18n('vxe.grid.selectOneRecord')).catch(e => e)
                  }
                }
              })
            }
            break
          }
          case 'save': {
            if (ajax.save) {
              let body = Object.assign({ pendingRecords: this.pendingRecords }, this.getAllRecords())
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
                          this.tableLoading = false
                        }).catch(e => {
                          this.tableLoading = false
                        }).then(() => this.commitProxy('reload'))
                      )
                    } else {
                      if (isAlert) {
                        // 直接移除未保存且标记为删除的数据
                        if (pendingRecords.length) {
                          this.remove(pendingRecords)
                        } else {
                          this.$XMsg.alert(GlobalConfig.i18n('vxe.grid.dataUnchanged')).catch(e => e)
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
          this.pendingRecords = pendingRecords.filter(item => minus.indexOf(item) === -1).concat(plus)
        } else if (plus.length) {
          this.pendingRecords = pendingRecords.concat(plus)
        }
        this.clearSelection()
      } else {
        if (isAlert) {
          this.$XMsg.alert(GlobalConfig.i18n('vxe.grid.selectOneRecord')).catch(e => e)
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
