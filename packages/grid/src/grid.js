import Table from '../../table'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import VXETable from '../../v-x-e-table'
import UtilTools, { isEnableConf } from '../../tools/utils'
import DomTools, { getOffsetHeight, getPaddingTopBottomSize } from '../../tools/dom'
import { GlobalEvent } from '../../tools/event'
import { warnLog, errLog } from '../../tools/log'
import { getSlotVNs } from '../../tools/vn'

const methods = {}
const propKeys = Object.keys(Table.props)

function renderDefaultForm (h, _vm) {
  const { $scopedSlots, proxyConfig, proxyOpts, formData, formConfig, formOpts } = _vm
  if (isEnableConf(formConfig) && formOpts.items && formOpts.items.length) {
    const formSlots = {}
    if (!formOpts.inited) {
      formOpts.inited = true
      const beforeItem = proxyOpts.beforeItem
      if (proxyOpts && beforeItem) {
        formOpts.items.forEach(item => {
          beforeItem.call(_vm, { $grid: _vm, item })
        })
      }
    }
    // 处理插槽
    formOpts.items.forEach((item) => {
      XEUtils.each(item.slots, (func) => {
        if (!XEUtils.isFunction(func)) {
          if ($scopedSlots[func]) {
            formSlots[func] = $scopedSlots[func]
          }
        }
      })
    })
    return [
      h('vxe-form', {
        props: Object.assign({}, formOpts, {
          data: proxyConfig && proxyOpts.form ? formData : formOpts.data
        }),
        on: {
          submit: _vm.submitEvent,
          reset: _vm.resetEvent,
          collapse: _vm.collapseEvent,
          'submit-invalid': _vm.submitInvalidEvent
        },
        scopedSlots: formSlots
      })
    ]
  }
  return []
}

function getFuncSlot (_vm, optSlots, slotKey) {
  const { $scopedSlots } = _vm
  const funcSlot = optSlots[slotKey]
  if (funcSlot) {
    if (XEUtils.isString(funcSlot)) {
      if ($scopedSlots[funcSlot]) {
        return $scopedSlots[funcSlot]
      } else {
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          errLog('vxe.error.notSlot', [funcSlot])
        }
      }
    } else {
      return funcSlot
    }
  }
  return null
}

function getToolbarSlots (_vm) {
  const { $scopedSlots, toolbarOpts } = _vm
  const toolbarOptSlots = toolbarOpts.slots
  let buttonsSlot
  let toolsSlot
  const slots = {}
  if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
    if ($scopedSlots.buttons && (!toolbarOptSlots || toolbarOptSlots.buttons !== 'buttons')) {
      warnLog('vxe.error.reqProp', ['toolbar-config.slots.buttons'])
    }
    if ($scopedSlots.tools && (!toolbarOptSlots || toolbarOptSlots.tools !== 'tools')) {
      warnLog('vxe.error.reqProp', ['toolbar-config.slots.tools'])
    }
  }
  if (toolbarOptSlots) {
    buttonsSlot = getFuncSlot(_vm, toolbarOptSlots, 'buttons')
    toolsSlot = getFuncSlot(_vm, toolbarOptSlots, 'tools')
    if (buttonsSlot) {
      slots.buttons = buttonsSlot
    }
    if (toolsSlot) {
      slots.tools = toolsSlot
    }
  }
  return slots
}

function getPagerSlots (_vm) {
  const { pagerOpts } = _vm
  const pagerOptSlots = pagerOpts.slots
  const slots = {}
  let leftSlot
  let rightSlot
  if (pagerOptSlots) {
    leftSlot = getFuncSlot(_vm, pagerOptSlots, 'left')
    rightSlot = getFuncSlot(_vm, pagerOptSlots, 'right')
    if (leftSlot) {
      slots.left = leftSlot
    }
    if (rightSlot) {
      slots.right = rightSlot
    }
  }
  return slots
}

function getTableOns (_vm) {
  const { $listeners, proxyConfig, proxyOpts } = _vm
  const ons = {}
  XEUtils.each($listeners, (cb, type) => {
    ons[type] = (...args) => {
      _vm.$emit(type, ...args)
    }
  })
  if (proxyConfig) {
    if (proxyOpts.sort) {
      ons['sort-change'] = _vm.sortChangeEvent
    }
    if (proxyOpts.filter) {
      ons['filter-change'] = _vm.filterChangeEvent
    }
  }
  return ons
}

/**
 * 渲染表单
 */
function renderForm (h, _vm) {
  const { _e, $scopedSlots, formConfig } = _vm
  const formSlot = $scopedSlots.form
  const hasForm = !!(formSlot || isEnableConf(formConfig))

  if (hasForm) {
    return h('div', {
      key: 'form',
      ref: 'formWrapper',
      class: 'vxe-grid--form-wrapper'
    }, formSlot ? formSlot.call(_vm, { $grid: _vm }, h) : renderDefaultForm(h, _vm))
  }
  return _e()
}

/**
 * 渲染工具栏
 */
function renderToolbar (h, _vm) {
  const { _e, $scopedSlots, toolbarConfig, toolbar } = _vm
  const toolbarSlot = $scopedSlots.toolbar
  const hasToolbar = !!(toolbarSlot || isEnableConf(toolbarConfig) || toolbar)

  if (hasToolbar) {
    return h('div', {
      key: 'toolbar',
      ref: 'toolbarWrapper',
      class: 'vxe-grid--toolbar-wrapper'
    }, toolbarSlot
      ? toolbarSlot.call(_vm, { $grid: _vm }, h)
      : [
          h('vxe-toolbar', {
            props: _vm.toolbarOpts,
            ref: 'xToolbar',
            scopedSlots: getToolbarSlots(_vm)
          })
        ]
    )
  }
  return _e()
}

/**
 * 渲染表格顶部区域
 */
function renderTop (h, _vm) {
  const { _e, $scopedSlots } = _vm
  const topSlot = $scopedSlots.top

  return topSlot ? h('div', {
    key: 'top',
    ref: 'topWrapper',
    class: 'vxe-grid--top-wrapper'
  }, topSlot.call(_vm, { $grid: _vm }, h)) : _e()
}

function renderTableLeft (h, _vm) {
  const { _e, $scopedSlots } = _vm
  const leftSlot = $scopedSlots.left
  if (leftSlot) {
    return h('div', {
      class: 'vxe-grid--left-wrapper'
    }, leftSlot({ $grid: _vm }))
  }
  return _e()
}

function renderTableRight (h, _vm) {
  const { _e, $scopedSlots } = _vm
  const rightSlot = $scopedSlots.right
  if (rightSlot) {
    return h('div', {
      class: 'vxe-grid--right-wrapper'
    }, rightSlot({ $grid: _vm }))
  }
  return _e()
}

/**
 * 渲染表格
 */
function renderTable (h, _vm) {
  const { $scopedSlots, tableProps } = _vm

  return h('div', {
    class: 'vxe-grid--table-wrapper'
  }, [
    h('vxe-table', {
      key: 'table',
      props: tableProps,
      on: getTableOns(_vm),
      scopedSlots: $scopedSlots,
      ref: 'xTable'
    })
  ])
}

/**
 * 渲染表格底部区域
 */
function renderBottom (h, _vm) {
  const { _e, $scopedSlots } = _vm
  const bottomSlot = $scopedSlots.bottom

  return bottomSlot ? h('div', {
    key: 'bottom',
    ref: 'bottomWrapper',
    class: 'vxe-grid--bottom-wrapper'
  }, bottomSlot.call(_vm, { $grid: _vm }, h)) : _e()
}

/**
 * 渲染分页
 */
function renderPager (h, _vm) {
  const { _e, $scopedSlots, pagerConfig, proxyConfig, tablePage } = _vm
  const pagerSlot = $scopedSlots.pager
  const hasPager = !!(pagerSlot || isEnableConf(pagerConfig))

  if (hasPager) {
    return h('div', {
      key: 'pager',
      ref: 'pagerWrapper',
      class: 'vxe-grid--pager-wrapper'
    }, pagerSlot
      ? pagerSlot.call(_vm, { $grid: _vm }, h)
      : [
          h('vxe-pager', {
            props: { ..._vm.pagerOpts, ...(proxyConfig ? tablePage : {}) },
            on: {
              'page-change': _vm.pageChangeEvent
            },
            scopedSlots: getPagerSlots(_vm)
          })
        ]
    )
  }
  return _e()
}

const defaultLayouts = ['Form', 'Toolbar', 'Top', 'Table', 'Bottom', 'Pager']

function renderLayout (h, _vm) {
  const { layouts } = _vm
  const vns = []
  const currLayouts = (layouts && layouts.length ? layouts : (GlobalConfig.grid.layouts || defaultLayouts))
  currLayouts.forEach(name => {
    switch (name) {
      case 'Form':
        vns.push(renderForm(h, _vm))
        break
      case 'Toolbar':
        vns.push(renderToolbar(h, _vm))
        break
      case 'Top':
        vns.push(renderTop(h, _vm))
        break
      case 'Table':
        vns.push(
          h('div', {
            key: 'table',
            class: 'vxe-grid--table-container'
          }, [
            renderTableLeft(h, _vm),
            renderTable(h, _vm),
            renderTableRight(h, _vm)
          ])
        )
        break
      case 'Bottom':
        vns.push(renderBottom(h, _vm))
        break
      case 'Pager':
        vns.push(renderPager(h, _vm))
        break
      default:
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          errLog('vxe.error.notProp', [`layouts -> ${name}`])
        }
        break
    }
  })
  return vns
}

Object.keys(Table.methods).forEach(name => {
  methods[name] = function (...args) {
    return this.$refs.xTable && this.$refs.xTable[name](...args)
  }
})

export default {
  name: 'VxeGrid',
  mixins: [vSize],
  props: {
    ...Table.props,
    layouts: Array,
    columns: Array,
    pagerConfig: [Boolean, Object],
    proxyConfig: Object,
    toolbar: [Boolean, Object],
    toolbarConfig: [Boolean, Object],
    formConfig: [Boolean, Object],
    zoomConfig: Object,
    size: { type: String, default: () => GlobalConfig.grid.size || GlobalConfig.size }
  },
  provide () {
    return {
      $xegrid: this
    }
  },
  data () {
    return {
      tableLoading: false,
      isZMax: false,
      tableData: [],
      filterData: [],
      formData: {},
      sortData: [],
      tZindex: 0,
      tablePage: {
        total: 0,
        pageSize: GlobalConfig.pager.pageSize || 10,
        currentPage: 1
      }
    }
  },
  computed: {
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
      return Object.assign({}, GlobalConfig.grid.toolbarConfig, this.toolbarConfig || this.toolbar)
    },
    zoomOpts () {
      return Object.assign({}, GlobalConfig.grid.zoomConfig, this.zoomConfig)
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
      const { isZMax, seqConfig, pagerConfig, loading, editConfig, proxyConfig, proxyOpts, tableExtendProps, tableLoading, tablePage, tableData } = this
      const tableProps = Object.assign({}, tableExtendProps)
      if (isZMax) {
        if (tableExtendProps.maxHeight) {
          tableProps.maxHeight = '100%'
        } else {
          tableProps.height = '100%'
        }
      }
      if (proxyConfig) {
        tableProps.loading = loading || tableLoading
        tableProps.data = tableData
        if (proxyOpts.seq && isEnableConf(pagerConfig)) {
          tableProps.seqConfig = Object.assign({}, seqConfig, { startIndex: (tablePage.currentPage - 1) * tablePage.pageSize })
        }
      }
      if (editConfig) {
        tableProps.editConfig = Object.assign({}, editConfig)
      }
      return tableProps
    }
  },
  watch: {
    columns (value) {
      this.$nextTick(() => this.loadColumn(value))
    },
    toolbar (value) {
      if (value) {
        this.initToolbar()
      }
    },
    toolbarConfig (value) {
      if (value) {
        this.initToolbar()
      }
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
      errLog('vxe.error.errConflicts', ['grid.data', 'grid.proxy-config'])
    }

    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      if (this.toolbar) {
        warnLog('vxe.error.delProp', ['grid.toolbar', 'grid.toolbar-config'])
      }
      if (this.toolbarConfig && !XEUtils.isObject(this.toolbarConfig)) {
        warnLog('vxe.error.errProp', [`grid.toolbar-config=${this.toolbarConfig}`, 'grid.toolbar-config={}'])
      }
      // if (proxyOpts.props) {
      //   warnLog('vxe.error.delProp', ['proxy-config.props', 'proxy-config.response'])
      // }
    }
    this.initPages()
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
  },
  mounted () {
    if (this.columns && this.columns.length) {
      this.loadColumn(this.columns)
    }
    this.initToolbar()
    this.initProxy()
  },
  destroyed () {
    GlobalEvent.off(this, 'keydown')
  },
  render (h) {
    const { vSize, isZMax } = this
    return h('div', {
      class: ['vxe-grid', {
        [`size--${vSize}`]: vSize,
        'is--animat': !!this.animat,
        'is--round': this.round,
        'is--maximize': isZMax,
        'is--loading': this.loading || this.tableLoading
      }],
      style: this.renderStyle
    }, renderLayout(h, this))
  },
  methods: {
    ...methods,
    callSlot (slotFunc, params, h, vNodes) {
      if (slotFunc) {
        const { $scopedSlots } = this
        if (XEUtils.isString(slotFunc)) {
          slotFunc = $scopedSlots[slotFunc] || null
        }
        if (XEUtils.isFunction(slotFunc)) {
          return getSlotVNs(slotFunc.call(this, params, h, vNodes))
        }
      }
      return []
    },
    getParentHeight () {
      const { $el, isZMax } = this
      return (isZMax ? DomTools.getDomNode().visibleHeight : XEUtils.toNumber(getComputedStyle($el.parentNode).height)) - this.getExcludeHeight()
    },
    /**
     * 获取需要排除的高度
     */
    getExcludeHeight () {
      const { $refs, $el, isZMax, height } = this
      const { formWrapper, toolbarWrapper, topWrapper, bottomWrapper, pagerWrapper } = $refs
      const parentPaddingSize = isZMax || !(height === 'auto' || height === '100%') ? 0 : getPaddingTopBottomSize($el.parentNode)
      return parentPaddingSize + getPaddingTopBottomSize($el) + getOffsetHeight(formWrapper) + getOffsetHeight(toolbarWrapper) + getOffsetHeight(topWrapper) + getOffsetHeight(bottomWrapper) + getOffsetHeight(pagerWrapper)
    },
    initToolbar () {
      this.$nextTick(() => {
        const { xTable, xToolbar } = this.$refs
        if (xTable && xToolbar) {
          xTable.connect(xToolbar)
        }
      })
    },
    initPages () {
      const { tablePage, pagerConfig, pagerOpts } = this
      const { currentPage, pageSize } = pagerOpts
      if (pagerConfig) {
        if (currentPage) {
          tablePage.currentPage = currentPage
        }
        if (pageSize) {
          tablePage.pageSize = pageSize
        }
      }
    },
    initProxy () {
      const { proxyInited, proxyConfig, proxyOpts, formConfig, formOpts } = this
      if (proxyConfig) {
        if (isEnableConf(formConfig) && proxyOpts.form && formOpts.items) {
          const formData = {}
          formOpts.items.forEach(item => {
            const { field, itemRender } = item
            if (field) {
              let itemValue = null
              if (itemRender) {
                const { defaultValue } = itemRender
                if (XEUtils.isFunction(defaultValue)) {
                  itemValue = defaultValue({ item })
                } else if (!XEUtils.isUndefined(defaultValue)) {
                  itemValue = defaultValue
                }
              }
              formData[field] = itemValue
            }
          })
          this.formData = formData
        }
        if (!proxyInited && proxyOpts.autoLoad !== false) {
          this.proxyInited = true
          this.$nextTick().then(() => this.commitProxy('_init')).then((rest) => {
            this.$emit('proxy-query', { ...rest, isInited: true, $grid: this, $event: new Event('init') })
          })
        }
      }
    },
    handleGlobalKeydownEvent (evnt) {
      const isEsc = evnt.keyCode === 27
      if (isEsc && this.isZMax && this.zoomOpts.escRestore !== false) {
        this.triggerZoomEvent(evnt)
      }
    },
    /**
     * 提交指令，支持 code 或 button
     * @param {String/Object} code 字符串或对象
     */
    commitProxy (proxyTarget, ...args) {
      const { $refs, toolbar, toolbarConfig, toolbarOpts, proxyOpts, tablePage, pagerConfig, editRules, formData, isMsg, validConfig, pagerOpts } = this
      const { beforeQuery, afterQuery, beforeDelete, afterDelete, beforeSave, afterSave, ajax = {} } = proxyOpts
      const resConfigs = proxyOpts.response || proxyOpts.props || {}
      const $xetable = $refs.xTable
      let button
      let code
      if (XEUtils.isString(proxyTarget)) {
        const matchObj = toolbarConfig || toolbar ? XEUtils.findTree(toolbarOpts.buttons, item => item.code === proxyTarget, { children: 'dropdowns' }) : null
        code = proxyTarget
        button = matchObj ? matchObj.item : null
      } else {
        button = proxyTarget
        code = button.code
      }
      const btnParams = button ? button.params : null
      switch (code) {
        case 'insert':
          return this.insert()
        case 'insert_edit':
          return this.insert().then(({ row }) => this.setEditRow(row))

          // 已废弃
        case 'insert_actived':
          return this.insert().then(({ row }) => this.setEditRow(row))
          // 已废弃

        case 'mark_cancel':
          this.triggerPendingEvent(code)
          break
        case 'remove':
          return this.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', () => this.removeCheckboxRow())
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
          this.resetColumn(true)
          break
        case '_init':
        case 'reload':
        case 'query': {
          const ajaxMethods = ajax.query
          if (ajaxMethods) {
            const isInited = code === '_init'
            const isReload = code === 'reload'
            let sortList = []
            let filterList = []
            let pageParams = {}
            if (pagerConfig) {
              if (isInited || isReload) {
                tablePage.currentPage = 1
              }
              if (isEnableConf(pagerConfig)) {
                pageParams = { ...tablePage }
              }
            }
            if (isInited) {
              const { sortOpts } = $xetable
              let defaultSort = sortOpts.defaultSort
              // 如果使用默认排序
              if (defaultSort) {
                if (!XEUtils.isArray(defaultSort)) {
                  defaultSort = [defaultSort]
                }
                sortList = defaultSort.map((item) => {
                  return {
                    field: item.field,
                    property: item.field,
                    order: item.order
                  }
                })
              }
              filterList = $xetable.getCheckedFilters()
            } else {
              if (isReload) {
                $xetable.clearAll()
              } else {
                sortList = $xetable.getSortColumns()
                filterList = $xetable.getCheckedFilters()
              }
            }
            const params = {
              code,
              button,
              isInited,
              isReload,
              $grid: this,
              page: pageParams,
              sort: sortList.length ? sortList[0] : {},
              sorts: sortList,
              filters: filterList,
              form: formData,
              options: ajaxMethods
            }
            this.sortData = sortList
            this.filterData = filterList
            this.tableLoading = true
            const applyArgs = [params].concat(args)
            return Promise.resolve((beforeQuery || ajaxMethods)(...applyArgs))
              .then(rest => {
                this.tableLoading = false
                if (rest) {
                  if (pagerConfig && isEnableConf(pagerOpts)) {
                    const totalProp = resConfigs.total
                    const total = (XEUtils.isFunction(totalProp) ? totalProp({ data: rest, $grid: this }) : XEUtils.get(rest, totalProp || 'page.total')) || 0
                    tablePage.total = XEUtils.toNumber(total)
                    const resultProp = resConfigs.result
                    this.tableData = (XEUtils.isFunction(resultProp) ? resultProp({ data: rest, $grid: this }) : XEUtils.get(rest, resultProp || 'result')) || []
                    // 检验当前页码，不能超出当前最大页数
                    const pageCount = Math.max(Math.ceil(total / tablePage.pageSize), 1)
                    if (tablePage.currentPage > pageCount) {
                      tablePage.currentPage = pageCount
                    }
                  } else {
                    const listProp = resConfigs.list
                    this.tableData = (listProp ? (XEUtils.isFunction(listProp) ? listProp({ data: rest, $grid: this }) : XEUtils.get(rest, listProp)) : rest) || []
                  }
                } else {
                  this.tableData = []
                }
                if (afterQuery) {
                  afterQuery(...applyArgs)
                }
                return { status: true }
              }).catch(() => {
                this.tableLoading = false
                return { status: false }
              })
          } else {
            if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
              errLog('vxe.error.notFunc', ['proxy-config.ajax.query'])
            }
          }
          break
        }
        case 'delete': {
          const ajaxMethods = ajax.delete
          if (ajaxMethods) {
            const selectRecords = $xetable.getCheckboxRecords()
            const removeRecords = selectRecords.filter(row => !$xetable.isInsertByRow(row))
            const body = { removeRecords }
            const applyArgs = [{ $grid: this, code, button, body, form: formData, options: ajaxMethods }].concat(args)
            if (selectRecords.length) {
              return this.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', () => {
                if (!removeRecords.length) {
                  return $xetable.remove(selectRecords)
                }
                this.tableLoading = true
                return Promise.resolve((beforeDelete || ajaxMethods)(...applyArgs))
                  .then(rest => {
                    this.tableLoading = false
                    $xetable.setPendingRow(removeRecords, false)
                    if (isMsg) {
                      // 检测弹窗模块
                      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                        if (!VXETable.modal) {
                          errLog('vxe.error.reqModule', ['Modal'])
                        }
                      }
                      VXETable.modal.message({ content: this.getRespMsg(rest, 'vxe.grid.delSuccess'), status: 'success' })
                    }
                    if (afterDelete) {
                      afterDelete(...applyArgs)
                    } else {
                      this.commitProxy('query')
                    }
                    return { status: true }
                  })
                  .catch(rest => {
                    this.tableLoading = false
                    if (isMsg) {
                      // 检测弹窗模块
                      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                        if (!VXETable.modal) {
                          errLog('vxe.error.reqModule', ['Modal'])
                        }
                      }
                      VXETable.modal.message({ id: code, content: this.getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                    }
                    return { status: false }
                  })
              })
            } else {
              if (isMsg) {
                // 检测弹窗模块
                if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                  if (!VXETable.modal) {
                    errLog('vxe.error.reqModule', ['Modal'])
                  }
                }
                VXETable.modal.message({ id: code, content: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
              }
            }
          } else {
            if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
              errLog('vxe.error.notFunc', ['proxy-config.ajax.delete'])
            }
          }
          break
        }
        case 'save': {
          const ajaxMethods = ajax.save
          if (ajaxMethods) {
            const body = this.getRecordset()
            const { insertRecords, removeRecords, updateRecords, pendingRecords } = body
            const applyArgs = [{ $grid: this, code, button, body, form: formData, options: ajaxMethods }].concat(args)
            // 排除掉新增且标记为删除的数据
            if (insertRecords.length) {
              body.pendingRecords = pendingRecords.filter(row => insertRecords.indexOf(row) === -1)
            }
            // 排除已标记为删除的数据
            if (pendingRecords.length) {
              body.insertRecords = insertRecords.filter(row => pendingRecords.indexOf(row) === -1)
            }
            let restPromise = Promise.resolve()
            if (editRules) {
              // 只校验新增和修改的数据
              restPromise = this[validConfig && validConfig.msgMode === 'full' ? 'fullValidate' : 'validate'](body.insertRecords.concat(updateRecords))
            }
            return restPromise.then((errMap) => {
              if (errMap) {
                // 如果校验不通过
                return
              }
              if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                this.tableLoading = true
                return Promise.resolve((beforeSave || ajaxMethods)(...applyArgs))
                  .then(rest => {
                    this.tableLoading = false
                    $xetable.clearPendingRow()
                    if (isMsg) {
                      // 检测弹窗模块
                      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                        if (!VXETable.modal) {
                          errLog('vxe.error.reqModule', ['Modal'])
                        }
                      }
                      VXETable.modal.message({ content: this.getRespMsg(rest, 'vxe.grid.saveSuccess'), status: 'success' })
                    }
                    if (afterSave) {
                      afterSave(...applyArgs)
                    } else {
                      this.commitProxy('query')
                    }
                    return { status: true }
                  })
                  .catch(rest => {
                    this.tableLoading = false
                    if (isMsg) {
                      // 检测弹窗模块
                      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                        if (!VXETable.modal) {
                          errLog('vxe.error.reqModule', ['Modal'])
                        }
                      }
                      VXETable.modal.message({ id: code, content: this.getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                    }
                    return { status: false }
                  })
              } else {
                if (isMsg) {
                  // 检测弹窗模块
                  if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                    if (!VXETable.modal) {
                      errLog('vxe.error.reqModule', ['Modal'])
                    }
                  }
                  VXETable.modal.message({ id: code, content: GlobalConfig.i18n('vxe.grid.dataUnchanged'), status: 'info' })
                }
              }
            })
          } else {
            if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
              errLog('vxe.error.notFunc', ['proxy-config.ajax.save'])
            }
          }
          break
        }
        default: {
          const gCommandOpts = VXETable.commands.get(code)
          if (gCommandOpts) {
            if (gCommandOpts.commandMethod) {
              gCommandOpts.commandMethod({ code, button, $grid: this, $table: $xetable }, ...args)
            } else {
              if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                errLog('vxe.error.notCommands', [code])
              }
            }
          }
        }
      }
      return this.$nextTick()
    },
    getRespMsg (rest, defaultMsg) {
      const { proxyOpts } = this
      const resConfigs = proxyOpts.response || proxyOpts.props || {}
      let msg
      if (rest && resConfigs.message) {
        msg = XEUtils.get(rest, resConfigs.message)
      }
      return msg || GlobalConfig.i18n(defaultMsg)
    },
    handleDeleteRow (code, alertKey, callback) {
      const selectRecords = this.getCheckboxRecords()
      if (this.isMsg) {
        if (selectRecords.length) {
          return VXETable.modal.confirm({ id: `cfm_${code}`, content: GlobalConfig.i18n(alertKey), escClosable: true }).then(type => {
            if (type === 'confirm') {
              return callback()
            }
          })
        } else {
          // 检测弹窗模块
          if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
            if (!VXETable.modal) {
              errLog('vxe.error.reqModule', ['Modal'])
            }
          }
          VXETable.modal.message({ id: `msg_${code}`, content: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
        }
      } else {
        if (selectRecords.length) {
          callback()
        }
      }
      return Promise.resolve()
    },
    getFormItems (itemIndex) {
      const { formConfig, formOpts } = this
      const itemList = []
      XEUtils.eachTree(isEnableConf(formConfig) && formOpts.items ? formOpts.items : [], item => {
        itemList.push(item)
      }, { children: 'children' })
      return XEUtils.isUndefined(itemIndex) ? itemList : itemList[itemIndex]
    },
    triggerToolbarCommitEvent (params, evnt) {
      const { code } = params
      return this.commitProxy(params, evnt).then((rest) => {
        if (code && rest && rest.status && ['query', 'reload', 'delete', 'save'].includes(code)) {
          this.$emit(code === 'delete' || code === 'save' ? `proxy-${code}` : 'proxy-query', { ...rest, isReload: code === 'reload', $grid: this, $event: evnt })
        }
      })
    },
    triggerToolbarBtnEvent (button, evnt) {
      this.triggerToolbarCommitEvent(button, evnt)
      this.$emit('toolbar-button-click', { code: button.code, button, $grid: this, $event: evnt })
    },
    triggerToolbarTolEvent (tool, evnt) {
      this.triggerToolbarCommitEvent(tool, evnt)
      this.$emit('toolbar-tool-click', { code: tool.code, tool, $grid: this, $event: evnt })
    },
    triggerPendingEvent (code) {
      const { isMsg } = this
      const selectRecords = this.getCheckboxRecords()
      if (selectRecords.length) {
        this.togglePendingRow(selectRecords)
        this.clearCheckboxRow()
      } else {
        if (isMsg) {
          // 检测弹窗模块
          if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
            if (!VXETable.modal) {
              errLog('vxe.error.reqModule', ['Modal'])
            }
          }
          VXETable.modal.message({ id: code, content: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
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
        this.commitProxy('query').then((rest) => {
          this.$emit('proxy-query', { ...rest, $grid: this, $event: params.$event })
        })
      }
    },
    sortChangeEvent (params) {
      const { $table, column, sortList } = params
      const isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : $table.sortOpts.remote
      // 如果是服务端排序
      if (isRemote) {
        this.sortData = sortList
        if (this.proxyConfig) {
          this.tablePage.currentPage = 1
          this.commitProxy('query').then((rest) => {
            this.$emit('proxy-query', { ...rest, $grid: this, $event: params.$event })
          })
        }
      }
      this.$emit('sort-change', Object.assign({ $grid: this }, params))
    },
    filterChangeEvent (params) {
      const { $table, filterList } = params
      // 如果是服务端过滤
      if ($table.filterOpts.remote) {
        this.filterData = filterList
        if (this.proxyConfig) {
          this.tablePage.currentPage = 1
          this.commitProxy('query').then((rest) => {
            this.$emit('proxy-query', { ...rest, $grid: this, $event: params.$event })
          })
        }
      }
      this.$emit('filter-change', Object.assign({ $grid: this }, params))
    },
    submitEvent (params) {
      const { proxyConfig } = this
      if (proxyConfig) {
        this.commitProxy('reload').then((rest) => {
          this.$emit('proxy-query', { ...rest, isReload: true, $grid: this, $event: params.$event })
        })
      }
      this.$emit('form-submit', Object.assign({ $grid: this }, params))
    },
    resetEvent (params) {
      const { proxyConfig } = this
      if (proxyConfig) {
        this.commitProxy('reload').then((rest) => {
          this.$emit('proxy-query', { ...rest, isReload: true, $grid: this, $event: params.$event })
        })
      }
      this.$emit('form-reset', Object.assign({ $grid: this }, params))
    },
    submitInvalidEvent (params) {
      this.$emit('form-submit-invalid', Object.assign({ $grid: this }, params))
    },
    collapseEvent (params) {
      this.$nextTick(() => this.recalculate(true))
      this.$emit('form-toggle-collapse', Object.assign({ $grid: this }, params))
      this.$emit('form-collapse', Object.assign({ $grid: this }, params))
    },
    triggerZoomEvent (evnt) {
      this.zoom()
      this.$emit('zoom', { $grid: this, type: this.isZMax ? 'max' : 'revert', $event: evnt })
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
      const { $refs, sortData, proxyConfig } = this
      const $xetable = $refs.xTable
      if (proxyConfig) {
        return {
          data: this.tableData,
          filter: this.filterData,
          form: this.formData,
          sort: sortData.length ? sortData[0] : {},
          sorts: sortData,
          pager: this.tablePage,
          pendingRecords: $xetable ? $xetable.getPendingRecords() : []
        }
      }
      return null
    },
    // 检查插槽
    ...(process.env.VUE_APP_VXE_TABLE_ENV === 'development' ? {
      loadColumn (columns) {
        const { $scopedSlots } = this
        XEUtils.eachTree(columns, column => {
          if (column.slots) {
            XEUtils.each(column.slots, (func) => {
              if (!XEUtils.isFunction(func)) {
                if (!$scopedSlots[func]) {
                  errLog('vxe.error.notSlot', [func])
                }
              }
            })
          }
        })
        return this.$refs.xTable.loadColumn(columns)
      },
      reloadColumn (columns) {
        this.clearAll()
        return this.loadColumn(columns)
      }
    } : null)
  }
}
