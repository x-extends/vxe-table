import Table from '../../table'
import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools } from '../../tools'

const methods = {}
const propKeys = Object.keys(Table.props)

function renderFormContent (h, _vm) {
  const { $scopedSlots, proxyConfig, proxyOpts, formData, formConfig, formOpts, formRender } = _vm
  if ($scopedSlots.form) {
    return $scopedSlots.form.call(_vm, { $grid: _vm }, h)
  }
  const compConf = formRender ? VXETable.renderer.get(formRender.name) : null
  if (compConf && compConf.renderForm) {
    return compConf.renderForm.call(_vm, h, formRender, { data: proxyConfig && proxyOpts.form ? formData : formConfig.data }, { $grid: _vm })
  }
  if (formOpts.items) {
    return [
      h('vxe-form', {
        props: Object.assign({}, formOpts, {
          data: proxyConfig && proxyOpts.form ? formData : formConfig.data
        }),
        on: {
          submit: _vm.submitEvent,
          reset: _vm.resetEvent
        },
        ref: 'form'
      }, formOpts.items.map(item => {
        return h('vxe-form-item', {
          props: item
        })
      }))
    ]
  }
  return []
}

Object.keys(Table.methods).forEach(name => {
  methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments)
  }
})

export default {
  name: 'VxeGrid',
  props: {
    columns: Array,
    pagerConfig: [Boolean, Object],
    proxyConfig: Object,
    toolbar: [Boolean, Object],
    toolbarRender: Object,
    formConfig: [Boolean, Object],
    formRender: Object,
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
      pendingRecords: [],
      filterData: [],
      formData: {},
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
    pagerOpts () {
      return Object.assign({}, GlobalConfig.grid.pagerConfig, this.pagerConfig)
    },
    formOpts () {
      return Object.assign({}, GlobalConfig.grid.formConfig, this.formConfig)
    },
    toolbarOpts () {
      return Object.assign({}, GlobalConfig.grid.toolbar, this.toolbar, { rConfig: this.toolbarRender })
    },
    toolbarSlots () {
      let { $scopedSlots, toolbar, toolbarOpts } = this
      let $buttons = $scopedSlots.buttons
      let $tools = $scopedSlots.tools
      let slots = {}
      if (toolbar) {
        if (toolbarOpts.slots) {
          $buttons = toolbarOpts.slots.buttons || $buttons
          $tools = toolbarOpts.slots.tools || $tools
        }
      }
      if ($buttons) {
        slots.buttons = $buttons
      }
      if ($tools) {
        slots.tools = $tools
      }
      return slots
    },
    renderClass () {
      const { tableProps, vSize, maximize } = this
      return [ 'vxe-grid', {
        [`size--${vSize}`]: vSize,
        't--animat': tableProps.optimization.animat,
        'is--maximize': maximize
      }]
    },
    renderStyle () {
      return this.maximize ? { zIndex: this.tZindex } : null
    },
    tableExtendProps () {
      let rest = {}
      propKeys.forEach(key => {
        rest[key] = this[key]
      })
      return rest
    },
    tableProps () {
      const { maximize, seqConfig, pagerConfig, loading, editConfig, proxyConfig, proxyOpts, tableExtendProps, tableLoading, tablePage, tableData, optimization } = this
      let props = Object.assign({}, tableExtendProps, {
        optimization: Object.assign({}, GlobalConfig.optimization, optimization)
      })
      if (maximize) {
        if (tableExtendProps.maxHeight) {
          props.maxHeight = 'auto'
        } else {
          props.height = 'auto'
        }
      }
      if (proxyConfig) {
        Object.assign(props, {
          loading: loading || tableLoading,
          data: tableData,
          rowClassName: this.handleRowClassName
        })
        if ((proxyOpts.seq || proxyOpts.index) && pagerConfig) {
          props.seqConfig = Object.assign({}, seqConfig, { startIndex: (tablePage.currentPage - 1) * tablePage.pageSize })
        }
      }
      if (editConfig) {
        props.editConfig = Object.assign({}, editConfig, { activeMethod: this.handleActiveMethod })
      }
      return props
    },
    tableOns () {
      let { $listeners, proxyConfig, proxyOpts } = this
      let ons = Object.assign({}, $listeners)
      if (proxyConfig) {
        if (proxyOpts.sort) {
          ons['sort-change'] = this.sortChangeEvent
        }
        if (proxyOpts.filter) {
          ons['filter-change'] = this.filterChangeEvent
        }
      }
      return ons
    },
    toolbarProps () {
      return Object.assign({
        loading: this.loading || this.tableLoading
      }, this.toolbarOpts)
    },
    pagerProps () {
      return Object.assign({
        size: this.vSize,
        loading: this.loading || this.tableLoading
      }, this.pagerOpts, this.proxyConfig ? this.tablePage : {})
    }
  },
  watch: {
    columns (value) {
      this.$nextTick(() => this.loadColumn(value))
    },
    proxyConfig () {
      this.initProxy()
    },
    pagerConfig () {
      this.initPages()
    }
  },
  created () {
    let { customs, data, proxyConfig, proxyOpts } = this
    let { props } = proxyOpts
    if (customs) {
      UtilTools.warn('vxe.error.removeProp', ['customs'])
    }
    if (data && proxyConfig) {
      console.warn('[vxe-grid] There is a conflict between the props proxy-config and data.')
    }
    // v3.0 中废弃 proxy-config.index
    if (proxyOpts.index) {
      UtilTools.warn('vxe.error.delProp', ['proxy-config.index', 'proxy-config.seq'])
    }
    // （v3.0 中废弃 proxyConfig.props.data）
    if (props && props.data) {
      UtilTools.warn('vxe.error.delProp', ['proxy-config.props.data', 'proxy-config.props.result'])
    }
  },
  mounted () {
    if (this.columns && this.columns.length) {
      this.loadColumn(this.columns)
    }
    this.initPages()
    this.initProxy()
  },
  render (h) {
    const $scopedSlots = this.$scopedSlots
    return h('div', {
      class: this.renderClass,
      style: this.renderStyle
    }, [
      /**
       * 渲染表单
       */
      this.formConfig ? h('div', {
        ref: 'form',
        class: ['vxe-form--wrapper', {
          'is--loading': this.loading || this.tableLoading
        }]
      }, renderFormContent(h, this)) : null,
      /**
       * 渲染工具栏
       */
      this.toolbar ? h('vxe-toolbar', {
        ref: 'toolbar',
        props: this.toolbarProps,
        scopedSlots: this.toolbarSlots
      }) : null,
      /**
       * 渲染表格
       */
      h('vxe-table', {
        props: this.tableProps,
        on: this.tableOns,
        scopedSlots: $scopedSlots,
        ref: 'xTable'
      }, this.$slots.default),
      /**
       * 渲染分页
       */
      this.pagerConfig ? ($scopedSlots.pager ? $scopedSlots.pager.call(this, { $grid: this }, h) : h('vxe-pager', {
        props: this.pagerProps,
        on: {
          'page-change': this.pageChangeEvent
        },
        ref: 'pager'
      })) : null
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
      let { form: formElem, toolbar, pager } = this.$refs
      return (formElem ? formElem.offsetHeight : 0) + (toolbar && toolbar.$el ? toolbar.$el.offsetHeight : 0) + (pager && pager.$el ? pager.$el.offsetHeight : 0)
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
    loadColumn (columns) {
      const $scopedSlots = this.$scopedSlots
      columns.forEach(column => {
        if (column.slots) {
          XEUtils.each(column.slots, (func, name, slots) => {
            if (!XEUtils.isFunction(func)) {
              if ($scopedSlots[func]) {
                slots[name] = $scopedSlots[func]
              } else {
                slots[name] = null
                UtilTools.error('vxe.error.notSlot', [func])
              }
            }
          })
        }
      })
      this.$refs.xTable.loadColumn(columns)
    },
    reloadColumn (columns) {
      this.clearAll()
      return this.loadColumn(columns)
    },
    initPages () {
      if (this.pagerConfig && this.pagerOpts.pageSize) {
        this.tablePage.pageSize = this.pagerOpts.pageSize
      }
    },
    initProxy () {
      const { proxyInited, proxyConfig, proxyOpts, formConfig, formOpts } = this
      if (proxyConfig) {
        if (!proxyInited && proxyOpts.autoLoad !== false) {
          this.proxyInited = true
          this.$nextTick(() => this.commitProxy('reload'))
        }
        if (formConfig && proxyOpts.form && formOpts.items) {
          const formData = {}
          formOpts.items.forEach(({ field }) => {
            if (field) {
              formData[field] = null
            }
          })
          this.formData = formData
        }
      }
    },
    /**
     * 提交指令，支持 code 或 button
     * @param {String/Object} code 字符串或对象
     */
    commitProxy (code) {
      const { $refs, toolbar, toolbarOpts, proxyOpts, tablePage, pagerConfig, sortData, filterData, formData, isMsg } = this
      const { beforeQuery, beforeDelete, afterDelete, beforeSave, afterSave, ajax = {}, props = {} } = proxyOpts
      const $table = $refs.xTable
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
          let ajaxMethods = ajax.query
          if (ajaxMethods) {
            let params = {
              code,
              button,
              $grid: this,
              sort: sortData,
              filters: filterData,
              form: formData,
              options: ajaxMethods
            }
            this.tableLoading = true
            if (pagerConfig) {
              params.page = tablePage
            }
            if (code === 'reload') {
              let defaultSort = $table.sortOpts.defaultSort
              let sortParams = {}
              if (pagerConfig) {
                tablePage.currentPage = 1
              }
              // 如果使用默认排序
              if (defaultSort) {
                sortParams = {
                  property: defaultSort.field,
                  field: defaultSort.field,
                  // v3 废弃 prop
                  prop: defaultSort.field,
                  order: defaultSort.order
                }
              }
              this.sortData = params.sort = sortParams
              this.filterData = params.filters = []
              this.pendingRecords = []
              this.clearAll()
            }
            let qRest = (beforeQuery || ajaxMethods).apply(this, [params].concat(args))
            try {
              return qRest.then(rest => {
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
                console.error(e)
              })
            } catch (e) {
              UtilTools.error('vxe.error.typeErr', ['proxy-config.ajax.query', 'Promise', typeof qRest])
            }
          } else {
            UtilTools.error('vxe.error.notFunc', [code])
          }
          break
        }
        case 'delete': {
          let ajaxMethods = ajax.delete
          if (ajaxMethods) {
            let selectRecords = this.getCheckboxRecords()
            this.remove(selectRecords).then(() => {
              let removeRecords = this.getRemoveRecords()
              let body = { removeRecords }
              let applyArgs = [{ $grid: this, code, button, body, options: ajaxMethods }].concat(args)
              if (removeRecords.length) {
                this.tableLoading = true
                let dRest = (beforeDelete || ajaxMethods).apply(this, applyArgs)
                try {
                  return dRest.then(result => {
                    this.tableLoading = false
                  }).catch(e => {
                    this.tableLoading = false
                    console.error(e)
                  }).then(() => {
                    if (afterDelete) {
                      afterDelete.apply(this, applyArgs)
                    } else {
                      this.commitProxy('reload')
                    }
                  })
                } catch (e) {
                  UtilTools.error('vxe.error.typeErr', ['proxy-config.ajax.delete', 'Promise', typeof dRest])
                }
              } else {
                if (isMsg && !selectRecords.length) {
                  VXETable.$modal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
                }
              }
            })
          } else {
            UtilTools.error('vxe.error.notFunc', [code])
          }
          break
        }
        case 'save': {
          let ajaxMethods = ajax.save
          if (ajaxMethods) {
            let body = Object.assign({ pendingRecords: this.pendingRecords }, this.getRecordset())
            let { insertRecords, removeRecords, updateRecords, pendingRecords } = body
            let applyArgs = [{ $grid: this, code, button, body, options: ajaxMethods }].concat(args)
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
                    let sRest = (beforeSave || ajaxMethods).apply(this, applyArgs)
                    try {
                      resolve(
                        sRest.then(() => {
                          VXETable.$modal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.saveSuccess'), status: 'success' })
                          this.tableLoading = false
                        }).catch(e => {
                          this.tableLoading = false
                          console.error(e)
                        }).then(() => {
                          if (afterSave) {
                            afterSave.apply(this, applyArgs)
                          } else {
                            this.commitProxy('reload')
                          }
                        })
                      )
                    } catch (e) {
                      UtilTools.error('vxe.error.typeErr', ['proxy-config.ajax.save', 'Promise', typeof sRest])
                    }
                  } else {
                    if (isMsg) {
                      // 直接移除未保存且标记为删除的数据
                      if (pendingRecords.length) {
                        this.remove(pendingRecords)
                      } else {
                        VXETable.$modal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.dataUnchanged'), status: 'info' })
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
          let btnMethod = VXETable.commands.get(code)
          if (btnMethod) {
            btnMethod.apply(this, [{ code, button, $grid: this, $table }].concat(args))
          }
      }
      return this.$nextTick()
    },
    handleDeleteRow (code, alertKey, callback) {
      let selectRecords = this.getCheckboxRecords()
      if (this.isMsg) {
        if (selectRecords.length) {
          VXETable.$modal.confirm(GlobalConfig.i18n(alertKey)).then(type => {
            if (type === 'confirm') {
              callback()
            }
          })
        } else {
          VXETable.$modal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
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
      let selectRecords = this.getCheckboxRecords()
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
        this.clearCheckboxRow()
      } else {
        if (isMsg) {
          VXETable.$modal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
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
      let { $table, column } = params
      let isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : ($table.sortOpts.remote || remoteSort)
      // 如果是服务端排序
      if (isRemote) {
        this.sortData = {
          property: params.property,
          field: params.property,
          // v3 废弃 prop
          prop: params.property,
          order: params.order
        }
        if (proxyConfig) {
          this.commitProxy('query')
        }
      }
      UtilTools.emitEvent(this, 'sort-change', [Object.assign({ $grid: this }, params)])
    },
    filterChangeEvent (params) {
      let { remoteFilter } = this
      let { $table, filters } = params
      // 如果是服务端过滤
      if ($table.filterOpts.remote || remoteFilter) {
        this.filterData = filters
        this.commitProxy('query')
      }
      UtilTools.emitEvent(this, 'filter-change', [Object.assign({ $grid: this }, params)])
    },
    submitEvent (params, evnt) {
      let { proxyConfig } = this
      if (proxyConfig) {
        this.commitProxy('reload')
      }
      UtilTools.emitEvent(this, 'form-submit', [Object.assign({ $grid: this }, params), evnt])
    },
    resetEvent (params, evnt) {
      UtilTools.emitEvent(this, 'form-reset', [Object.assign({ $grid: this }, params), evnt])
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
