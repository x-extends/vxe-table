import Table from '../../table'
import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools } from '../../tools'

const methods = {}
const propKeys = Object.keys(Table.props)

function getOffsetHeight (elem) {
  return elem ? elem.offsetHeight : 0
}

function getRefHeight (comp) {
  return getOffsetHeight(comp ? comp.$el : null)
}

function renderFormContent (h, _vm) {
  const { $scopedSlots, proxyConfig, proxyOpts, formData, formConfig, formOpts } = _vm
  if ($scopedSlots.form) {
    return $scopedSlots.form.call(_vm, { $grid: _vm }, h)
  }
  if (formOpts.items && formOpts.items.length) {
    if (!formOpts.inited) {
      formOpts.inited = true
      if (proxyOpts && proxyOpts.beforeItem) {
        formOpts.items.forEach(item => {
          proxyOpts.beforeItem.apply(_vm, [{ $grid: _vm, item }])
        })
      }
    }
    return [
      h('vxe-form', {
        props: Object.assign({}, formOpts, {
          data: proxyConfig && proxyOpts.form ? formData : formConfig.data
        }),
        on: {
          submit: _vm.submitEvent,
          reset: _vm.resetEvent,
          'submit-invalid': _vm.submitInvalidEvent,
          'toggle-collapse': _vm.togglCollapseEvent
        },
        ref: 'form'
      })
    ]
  }
  return []
}

Object.keys(Table.methods).forEach(name => {
  methods[name] = function (...args) {
    return this.$refs.xTable && this.$refs.xTable[name](...args)
  }
})

export default {
  name: 'VxeGrid',
  props: {
    columns: Array,
    pagerConfig: [Boolean, Object],
    proxyConfig: Object,
    toolbar: [Boolean, Object],
    formConfig: [Boolean, Object],
    ...Table.props
  },
  provide () {
    return {
      $xegrid: this
    }
  },
  data () {
    return {
      isCloak: false,
      tableLoading: false,
      isZMax: false,
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
    optimizeOpts () {
      return Object.assign({}, GlobalConfig.optimization, this.optimization)
    },
    toolbarOpts () {
      return Object.assign({}, GlobalConfig.grid.toolbar, this.toolbar)
    },
    toolbarSlots () {
      const { $scopedSlots, toolbar, toolbarOpts } = this
      let $buttons = $scopedSlots.buttons
      let $tools = $scopedSlots.tools
      const slots = {}
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
      const { vSize, isZMax, optimizeOpts } = this
      return ['vxe-grid', {
        [`size--${vSize}`]: vSize,
        't--animat': !!optimizeOpts.animat,
        'is--maximize': isZMax,
        'is--loading': this.isCloak || this.loading || this.tableLoading
      }]
    },
    renderStyle () {
      return this.isZMax ? { zIndex: this.tZindex } : null
    },
    tableExtendProps () {
      const rest = {}
      propKeys.forEach(key => {
        rest[key] = this[key]
      })
      return rest
    },
    tableProps () {
      const { isZMax, seqConfig, pagerConfig, loading, isCloak, editConfig, proxyConfig, proxyOpts, tableExtendProps, tableLoading, tablePage, tableData, optimizeOpts } = this
      const props = Object.assign({}, tableExtendProps, {
        optimization: optimizeOpts
      })
      if (isZMax) {
        if (tableExtendProps.maxHeight) {
          props.maxHeight = 'auto'
        } else {
          props.height = 'auto'
        }
      }
      if (proxyConfig) {
        Object.assign(props, {
          loading: isCloak || loading || tableLoading,
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
      const { $listeners, proxyConfig, proxyOpts } = this
      const ons = Object.assign({}, $listeners)
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
    pagerProps () {
      return Object.assign({}, this.pagerOpts, this.proxyConfig ? this.tablePage : {})
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
    const { data, formOpts, proxyOpts, proxyConfig } = this
    if (proxyConfig && (data || (proxyOpts.form && formOpts.data))) {
      console.error('[vxe-grid] There is a conflict between the props proxy-config and data.')
    }
    if (this.optimizeOpts.cloak) {
      this.isCloak = true
      setTimeout(() => {
        this.isCloak = false
      }, DomTools.browse ? 500 : 300)
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
        class: 'vxe-form--wrapper'
      }, renderFormContent(h, this)) : null,
      /**
       * 渲染工具栏
       */
      this.toolbar ? h('vxe-toolbar', {
        ref: 'toolbar',
        props: this.toolbarOpts,
        scopedSlots: this.toolbarSlots
      }) : null,
      /**
       * 渲染表格顶部区域
       */
      $scopedSlots.top ? h('div', {
        ref: 'top',
        class: 'vxe-top--wrapper'
      }, $scopedSlots.top.call(this, { $grid: this }, h)) : null,
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
       * 渲染表格底部区域
       */
      $scopedSlots.bottom ? h('div', {
        ref: 'bottom',
        class: 'vxe-bottom--wrapper'
      }, $scopedSlots.bottom.call(this, { $grid: this }, h)) : null,
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
      return (this.isZMax ? DomTools.getDomNode().visibleHeight : this.$el.parentNode.clientHeight) - this.getExcludeHeight()
    },
    /**
     * 获取需要排除的高度
     */
    getExcludeHeight () {
      const { $refs, $el } = this
      const { form: formElem, toolbar, top, bottom, pager } = $refs
      let paddingTop = 0
      let paddingBottom = 0
      if ($el) {
        const computedStyle = getComputedStyle($el)
        paddingTop = XEUtils.toNumber(computedStyle.paddingTop)
        paddingBottom = XEUtils.toNumber(computedStyle.paddingBottom)
      }
      return paddingTop + paddingBottom + getOffsetHeight(formElem) + getRefHeight(toolbar) + getOffsetHeight(top) + getOffsetHeight(bottom) + getRefHeight(pager)
    },
    handleRowClassName (params) {
      const rowClassName = this.rowClassName
      const clss = []
      if (this.pendingRecords.some(item => item === params.row)) {
        clss.push('row--pending')
      }
      return clss.concat(rowClassName ? rowClassName(params) : [])
    },
    handleActiveMethod (params) {
      const activeMethod = this.editConfig.activeMethod
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
          formOpts.items.forEach(({ field, itemRender }) => {
            if (field) {
              formData[field] = itemRender && !XEUtils.isUndefined(itemRender.defaultValue) ? itemRender.defaultValue : null
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
    commitProxy (code, ...args) {
      const { $refs, toolbar, toolbarOpts, proxyOpts, tablePage, pagerConfig, sortData, filterData, formData, isMsg } = this
      const { beforeQuery, beforeDelete, afterDelete, beforeSave, afterSave, ajax = {}, props = {} } = proxyOpts
      const $xetable = $refs.xTable
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
          this.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', () => this.commitProxy(...(['delete'].concat(args))))
          break
        case 'remove_selection':
          this.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', () => this.removeCheckboxRow())
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
          const ajaxMethods = ajax.query
          if (ajaxMethods) {
            const params = {
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
              const defaultSort = $xetable.sortOpts.defaultSort
              let sortParams = {}
              if (pagerConfig) {
                tablePage.currentPage = 1
              }
              // 如果使用默认排序
              if (defaultSort) {
                sortParams = {
                  property: defaultSort.field,
                  order: defaultSort.order
                }
              }
              this.sortData = params.sort = sortParams
              this.filterData = params.filters = []
              this.pendingRecords = []
              this.clearAll()
            }
            const qRest = (beforeQuery || ajaxMethods).apply(this, [params].concat(args))
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
            UtilTools.error('vxe.error.notFunc', ['query'])
          }
          break
        }
        case 'delete': {
          const ajaxMethods = ajax.delete
          if (ajaxMethods) {
            const selectRecords = this.getCheckboxRecords()
            this.remove(selectRecords).then(() => {
              const removeRecords = this.getRemoveRecords()
              const body = { removeRecords }
              const applyArgs = [{ $grid: this, code, button, body, options: ajaxMethods }].concat(args)
              if (removeRecords.length) {
                this.tableLoading = true
                const dRest = (beforeDelete || ajaxMethods).apply(this, applyArgs)
                try {
                  return dRest.then(() => {
                    this.tableLoading = false
                  }).catch(e => {
                    this.tableLoading = false
                    console.error(e)
                  }).then(() => {
                    if (afterDelete) {
                      afterDelete.apply(this, applyArgs)
                    } else {
                      this.commitProxy('query')
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
          const ajaxMethods = ajax.save
          if (ajaxMethods) {
            const body = Object.assign({ pendingRecords: this.pendingRecords }, this.getRecordset())
            const { insertRecords, removeRecords, updateRecords, pendingRecords } = body
            const applyArgs = [{ $grid: this, code, button, body, options: ajaxMethods }].concat(args)
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
                    const sRest = (beforeSave || ajaxMethods).apply(this, applyArgs)
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
                            this.commitProxy('query')
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
        default: {
          const btnMethod = VXETable.commands.get(code)
          if (btnMethod) {
            btnMethod.apply(this, [{ code, button, $grid: this, $table: $xetable }].concat(args))
          }
        }
      }
      return this.$nextTick()
    },
    handleDeleteRow (code, alertKey, callback) {
      const selectRecords = this.getCheckboxRecords()
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
      this.$emit('toolbar-button-click', { code: button.code, button, $grid: this }, evnt)
    },
    triggerPendingEvent (code) {
      const { pendingRecords, isMsg } = this
      const selectRecords = this.getCheckboxRecords()
      if (selectRecords.length) {
        const plus = []
        const minus = []
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
      const { proxyConfig, tablePage } = this
      const { currentPage, pageSize } = params
      tablePage.currentPage = currentPage
      tablePage.pageSize = pageSize
      this.$emit('page-change', Object.assign({ $grid: this }, params))
      if (proxyConfig) {
        this.commitProxy('query')
      }
    },
    sortChangeEvent (params) {
      const { proxyConfig, remoteSort } = this
      const { $table, column } = params
      const isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : ($table.sortOpts.remote || remoteSort)
      const property = params.order ? params.property : null
      // 如果是服务端排序
      if (isRemote) {
        this.sortData = {
          property,
          order: params.order
        }
        if (proxyConfig) {
          this.commitProxy('query')
        }
      }
      this.$emit('sort-change', Object.assign({ $grid: this }, params))
    },
    filterChangeEvent (params) {
      const { remoteFilter } = this
      const { $table, filters } = params
      // 如果是服务端过滤
      if ($table.filterOpts.remote || remoteFilter) {
        this.filterData = filters
        this.commitProxy('query')
      }
      this.$emit('filter-change', Object.assign({ $grid: this }, params))
    },
    submitEvent (params, evnt) {
      const { proxyConfig } = this
      if (proxyConfig) {
        this.commitProxy('reload')
      }
      this.$emit('form-submit', Object.assign({ $grid: this }, params), evnt)
    },
    resetEvent (params, evnt) {
      const { proxyConfig } = this
      if (proxyConfig) {
        this.commitProxy('reload')
      }
      this.$emit('form-reset', Object.assign({ $grid: this }, params), evnt)
    },
    submitInvalidEvent (params, evnt) {
      this.$emit('form-submit-invalid', Object.assign({ $grid: this }, params), evnt)
    },
    togglCollapseEvent (params, evnt) {
      this.recalculate(true)
      this.$emit('form-toggle-collapse', Object.assign({ $grid: this }, params), evnt)
    },
    zoom () {
      return this[this.isZMax ? 'revert' : 'maximize']()
    },
    isMaximized () {
      return this.isZMax
    },
    maximize () {
      return this.handleZoom(true)
    },
    revert () {
      return this.handleZoom()
    },
    handleZoom (isMax) {
      const { isZMax } = this
      if (isMax ? !isZMax : isZMax) {
        this.isZMax = !isZMax
        if (this.tZindex < UtilTools.getLastZIndex()) {
          this.tZindex = UtilTools.nextZIndex()
        }
      }
      return this.$nextTick().then(() => this.recalculate(true)).then(() => this.isZMax)
    },
    getProxyInfo () {
      return this.proxyConfig ? {
        data: this.tableData,
        filter: this.filterData,
        form: this.formData,
        sort: this.sortData,
        pager: this.tablePage,
        pendingRecords: this.pendingRecords
      } : null
    }
  }
}
