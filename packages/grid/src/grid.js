import Table from '../../table'
import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'
import { Buttons } from '../../v-x-e-table'

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
    toolbar: [Boolean, Object],
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
      maximize: false,
      tableData: [],
      tableCustoms: [],
      pendingRecords: [],
      filterData: [],
      sortData: {},
      tZindex: 0,
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
    toolbarOpts () {
      return Object.assign({}, GlobalConfig.grid.toolbar, this.toolbar)
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
    let { customs, data, proxyConfig, proxyOpts, pagerConfig } = this
    let { props } = proxyOpts
    if (customs) {
      this.tableCustoms = customs
    }
    if (pagerConfig && pagerConfig.pageSize) {
      this.tablePage.pageSize = pagerConfig.pageSize
    }
    if (data && proxyConfig) {
      console.warn('[vxe-grid] There is a conflict between the props proxy-config and data.')
    }
    // （v3.0 中废弃 proxyConfig.props.data）
    if (props && props.data) {
      UtilTools.warn('vxe.error.delProp', ['proxy-config.props.data', 'proxy-config.props.result'])
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
    let { $slots, $scopedSlots, $listeners, maximize, pagerConfig, vSize, loading, toolbar, toolbarOpts, editConfig, proxyConfig, proxyOpts, tableProps, tableLoading, tablePage, tableData, tableCustoms, optimization } = this
    let props = Object.assign({}, tableProps, {
      optimization: Object.assign({}, GlobalConfig.optimization, optimization)
    })
    let tableOns = Object.assign({}, $listeners)
    let $buttons = $scopedSlots.buttons
    let $tools = $scopedSlots.tools
    if (this.maximize) {
      if (tableProps.height) {
        props.height = 'auto'
      } else if (tableProps.maxHeight) {
        props.maxHeight = 'auto'
      }
    }
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
      if (toolbarOpts.slots) {
        $buttons = toolbarOpts.slots.buttons || $buttons
        $tools = toolbarOpts.slots.tools || $tools
      }
      if (!(toolbarOpts.setting && toolbarOpts.setting.storage)) {
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
    let tbScopedSlots = {}
    if ($buttons) {
      tbScopedSlots.buttons = $buttons
    }
    if ($tools) {
      tbScopedSlots.tools = $tools
    }
    return h('div', {
      class: [ 'vxe-grid', {
        [`size--${vSize}`]: vSize,
        't--animat': props.optimization.animat,
        'is--maximize': maximize
      }],
      style: maximize ? {
        zIndex: this.tZindex
      } : null
    }, [
      toolbar ? h('vxe-toolbar', {
        ref: 'toolbar',
        props: Object.assign({
          loading: loading || tableLoading
        }, toolbarOpts),
        scopedSlots: tbScopedSlots
      }) : null,
      h('vxe-table', {
        props,
        on: tableOns,
        scopedSlots: $scopedSlots,
        ref: 'xTable'
      }, $slots.default),
      pagerConfig ? h('vxe-pager', {
        props: Object.assign({
          size: vSize,
          loading: loading || tableLoading
        }, pagerConfig, proxyConfig ? tablePage : {}),
        on: {
          'page-change': this.pageChangeEvent
        },
        ref: 'pager'
      }) : null
    ])
  },
  methods: {
    ...methods,
    getParentHeight () {
      return (this.maximize ? DomTools.getDomNode().visibleHeight : this.$el.parentNode.clientHeight) - this.getExcludeHeight()
    },
    /**
     * 获取需要排除的高度
     */
    getExcludeHeight () {
      let { toolbar, pager } = this.$refs
      return (toolbar && toolbar.$el ? toolbar.$el.offsetHeight : 0) + (pager && pager.$el ? pager.$el.offsetHeight : 0)
    },
    handleRowClassName (params) {
      let rowClassName = this.rowClassName
      let clss = []
      if (this.pendingRecords.some(item => item === params.row)) {
        clss.push('row--pending')
      }
      return clss.concat(rowClassName ? rowClassName(params) : [])
    },
    handleActiveMethod (params) {
      let activeMethod = this.editConfig.activeMethod
      return this.pendingRecords.indexOf(params.row) === -1 && (!activeMethod || activeMethod(params))
    },
    /**
     * 提交指令，支持 code 或 button
     * @param {String/Object} code 字符串或对象
     */
    commitProxy (code) {
      const { toolbar, toolbarOpts, proxyOpts, tablePage, pagerConfig, sortData, filterData, isMsg } = this
      const { ajax = {}, props = {} } = proxyOpts
      const args = XEUtils.slice(arguments, 1)
      let button
      if (XEUtils.isString(code)) {
        const matchObj = toolbar ? XEUtils.findTree(toolbarOpts.buttons, item => item.code === code, { children: 'dropdowns' }) : null
        button = matchObj ? matchObj.item : null
      } else {
        button = code
        code = button.code
      }
      const btnParams = button ? button.params : null
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
          this.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', () => this.commitProxy.apply(this, ['delete'].concat(args)))
          break
        case 'remove_selection':
          this.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', () => this.removeSelecteds())
          break
        case 'import':
          this.importData(btnParams)
          break
        case 'open_import':
          this.openImport(btnParams)
          break
        case 'export':
          this.exportData(btnParams)
          break
        case 'open_export':
          this.openExport(btnParams)
          break
        case 'reset_custom':
          this.resetAll()
          break
        case 'reload':
        case 'query': {
          if (ajax.query) {
            let params = {
              $grid: this,
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
              this.sortData = params.sort = {}
              this.filterData = params.filters = []
              this.pendingRecords = []
              this.clearAll()
            }
            return ajax.query.apply(this, [params].concat(args)).then(rest => {
              if (rest) {
                if (pagerConfig) {
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
          } else {
            UtilTools.error('vxe.error.notFunc', [code])
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
                return ajax.delete.apply(this, [{ $grid: this, body }].concat(args)).then(result => {
                  this.tableLoading = false
                }).catch(e => {
                  this.tableLoading = false
                }).then(() => this.commitProxy('reload'))
              } else {
                if (isMsg && !selectRecords.length) {
                  this.$XModal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
                }
              }
            })
          } else {
            UtilTools.error('vxe.error.notFunc', [code])
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
                      ajax.save.apply(this, [{ $grid: this, body }].concat(args)).then(() => {
                        this.$XModal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.saveSuccess'), status: 'success' })
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
                        this.$XModal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.dataUnchanged'), status: 'info' })
                      }
                    }
                    resolve()
                  }
                } else {
                  resolve(vaild)
                }
              })
            })
          } else {
            UtilTools.error('vxe.error.notFunc', [code])
          }
          break
        }
        default:
          let btnMethod = Buttons.get(code)
          if (btnMethod) {
            btnMethod.apply(this, [{ code, button, $grid: this, $table: this.$refs.xTable }].concat(args))
          }
      }
      return this.$nextTick()
    },
    handleDeleteRow (code, alertKey, callback) {
      let selectRecords = this.getSelectRecords()
      if (this.isMsg) {
        if (selectRecords.length) {
          this.$XModal.confirm(GlobalConfig.i18n(alertKey)).then(type => {
            if (type === 'confirm') {
              callback()
            }
          })
        } else {
          this.$XModal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
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
    triggerToolbarBtnEvent (button, evnt) {
      this.commitProxy(button, evnt)
      UtilTools.emitEvent(this, 'toolbar-button-click', [{ code: button.code, button, $grid: this }, evnt])
    },
    triggerPendingEvent (code) {
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
          this.$XModal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
        }
      }
    },
    pageChangeEvent (params) {
      let { proxyConfig, tablePage } = this
      let { currentPage, pageSize } = params
      tablePage.currentPage = currentPage
      tablePage.pageSize = pageSize
      if (params.type === 'current-change') {
        UtilTools.emitEvent(this, 'current-page-change', [currentPage])
      } else {
        UtilTools.emitEvent(this, 'page-size-change', [pageSize])
      }
      UtilTools.emitEvent(this, 'page-change', [Object.assign({ $grid: this }, params)])
      if (proxyConfig) {
        this.commitProxy('query')
      }
    },
    sortChangeEvent (params) {
      let { proxyConfig, remoteSort } = this
      let { column } = params
      let isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort
      // 如果是服务端排序
      if (isRemote) {
        this.sortData = params
        if (proxyConfig) {
          this.commitProxy('query')
        }
      }
      UtilTools.emitEvent(this, 'sort-change', [Object.assign({ $grid: this }, params)])
    },
    filterChangeEvent (params) {
      let { remoteFilter } = this
      let { filters } = params
      // 如果是服务端过滤
      if (remoteFilter) {
        this.filterData = filters
        this.commitProxy('query')
      }
      UtilTools.emitEvent(this, 'filter-change', [Object.assign({ $grid: this }, params)])
    },
    zoom () {
      this.maximize = !this.maximize
      if (this.maximize) {
        if (this.tZindex < UtilTools.getLastZIndex()) {
          this.tZindex = UtilTools.nextZIndex()
        }
      }
      return this.$nextTick().then(() => this.recalculate(true)).then(() => this.maximize)
    },
    isMaximized () {
      return this.maximize
    }
  }
}
