import { CreateElement, VNode, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getLastZIndex, nextZIndex, isEnableConf } from '../../ui/src/utils'
import { getOffsetHeight, getPaddingTopBottomSize, getDomNode, toCssUnit } from '../../ui/src/dom'
import { VxeUI } from '../../ui'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'
import { tableProps } from '../../table/src/props'
import VxeTableComponent from '../../table/src/table'
import VxeToolbarComponent from '../../toolbar/src/toolbar'

import type { VxeFormItemProps, VxeFormDefines, VxeComponentStyleType, VxeComponentSizeType, ValueOf, VxeFormInstance, VxeFormItemPropTypes, VxePagerInstance } from 'vxe-pc-ui'
import type { GridReactData, VxeTablePropTypes, VxeGridConstructor, VxeToolbarPropTypes, VxeToolbarInstance, VxeGridPropTypes, VxeTableMethods, GridInternalData, VxeGridEmits, VxePagerDefines, VxeTableConstructor, VxeTableDefines, VxeTablePrivateMethods, TableInternalData, VxeTableProps, VxeGridDefines } from '../../../types'

const { getConfig, getI18n, commands, globalEvents, globalMixins, createEvent, GLOBAL_EVENT_KEYS, renderEmptyElement } = VxeUI

const tableMethods: VxeTableMethods = {} as VxeTableMethods
const propKeys = Object.keys(tableProps) as (keyof VxeTableProps)[]

const defaultLayouts: VxeGridPropTypes.Layouts = [['Form'], ['Toolbar', 'Top', 'Table', 'Bottom', 'Pager']]

function getTableOns (_vm: any) {
  const { $listeners, proxyConfig, proxyOpts } = _vm
  const ons: any = {}
  XEUtils.each($listeners, (cb: any, type: any) => {
    ons[type] = (...args: any[]) => {
      _vm.$emit(type, ...args)
    }
  })
  if (proxyConfig) {
    if (proxyOpts.sort) {
      ons['sort-change'] = _vm.sortChangeEvent
      ons['clear-all-sort'] = _vm.clearAllSortEvent
    }
    if (proxyOpts.filter) {
      ons['filter-change'] = _vm.filterChangeEvent
      ons['clear-all-filter'] = _vm.clearAllFilterEvent
    }
  }
  return ons
}

XEUtils.each(VxeTableComponent.methods, (fn, name) => {
  tableMethods[name as keyof VxeTableMethods] = function (this: any, ...args: any[]) {
    const $xeGrid = this
    const $xeTable = $xeGrid.$refs.refTable

    return $xeTable && $xeTable[name](...args)
  }
})

function createReactData (): GridReactData {
  return {
    tableLoading: false,
    proxyInited: false,
    isZMax: false,
    tableData: [],
    filterData: [],
    formData: {},
    sortData: [],
    footerData: [],
    tZindex: 0,
    tablePage: {
      total: 0,
      pageSize: getConfig().pager?.pageSize || 10,
      currentPage: 1
    }
  }
}

function createInternalData (): GridInternalData {
  return {
    uFoot: false
  }
}

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeGrid',
  mixins: [
    globalMixins.sizeMixin
  ],
  props: {
    ...(tableProps as unknown as {
      border: PropType<VxeTablePropTypes.Border>
      round: PropType<VxeTablePropTypes.Round>
      loading: PropType<VxeTablePropTypes.Loading>
      height: PropType<VxeTablePropTypes.Height>
      minHeight: PropType<VxeTablePropTypes.MinHeight>
      maxHeight: PropType<VxeTablePropTypes.MaxHeight>
      seqConfig: PropType<VxeTablePropTypes.SeqConfig>
      editConfig: PropType<VxeTablePropTypes.EditConfig>
      sortConfig: PropType<VxeTablePropTypes.SortConfig>
      filterConfig: PropType<VxeTablePropTypes.FilterConfig>
      validConfig: PropType<VxeTablePropTypes.ValidConfig>
      editRules: PropType<VxeTablePropTypes.EditRules>
      animat: PropType<VxeTablePropTypes.Animat>
      scrollbarConfig: PropType<VxeTablePropTypes.ScrollbarConfig>
      showFooter: PropType<VxeTablePropTypes.ShowFooter>
      params: PropType<VxeTablePropTypes.Params>
    }),

    layouts: Array as PropType<VxeGridPropTypes.Layouts>,
    columns: Array as PropType<VxeGridPropTypes.Columns<any>>,
    pagerConfig: Object as PropType<VxeGridPropTypes.PagerConfig>,
    proxyConfig: Object as PropType<VxeGridPropTypes.ProxyConfig<any>>,
    toolbarConfig: Object as PropType<VxeGridPropTypes.ToolbarConfig>,
    formConfig: Object as PropType<VxeGridPropTypes.FormConfig>,
    zoomConfig: Object as PropType<VxeGridPropTypes.ZoomConfig>,
    size: {
      type: String as PropType<VxeGridPropTypes.Size>,
      default: () => getConfig().grid.size || getConfig().size
    }
  },
  provide () {
    const $xeGrid = this
    const $xeGantt = null

    return {
      $xeGrid,
      $xeGantt
    }
  },
  data () {
    const xID = XEUtils.uniqueId()

    const reactData = createReactData()
    const internalData = createInternalData()

    return {
      xID,
      reactData,
      internalData
    }
  },
  computed: {
    ...({} as {
      computeSize(): VxeComponentSizeType
    }),
    isRespMsg () {
      const $xeGrid = this

      return $xeGrid.computeIsRespMsg
    },
    computeIsRespMsg () {
      const $xeGrid = this

      const proxyOpts = $xeGrid.computeProxyOpts as VxeGridPropTypes.ProxyConfig
      return !!(XEUtils.isBoolean(proxyOpts.message) ? proxyOpts.message : proxyOpts.showResponseMsg)
    },
    isActiveMsg () {
      const $xeGrid = this

      return $xeGrid.computeIsActiveMsg
    },
    computeIsActiveMsg () {
      const $xeGrid = this

      const proxyOpts = $xeGrid.computeProxyOpts as VxeGridPropTypes.ProxyConfig
      return XEUtils.isBoolean(proxyOpts.showActionMsg) ? proxyOpts.showActionMsg : !!proxyOpts.showActiveMsg
    },
    proxyOpts () {
      const $xeGrid = this

      return $xeGrid.computeProxyOpts
    },
    computeProxyOpts () {
      const $xeGrid = this
      const props = $xeGrid

      return XEUtils.merge({}, XEUtils.clone(getConfig().grid.proxyConfig, true), props.proxyConfig) as VxeGridPropTypes.ProxyConfig
    },
    pagerOpts () {
      const $xeGrid = this

      return $xeGrid.computePagerOpts
    },
    computePagerOpts () {
      const $xeGrid = this
      const props = $xeGrid

      return Object.assign({}, getConfig().grid.pagerConfig, props.pagerConfig)
    },
    formOpts () {
      const $xeGrid = this

      return $xeGrid.computeFormOpts
    },
    computeFormOpts () {
      const $xeGrid = this
      const props = $xeGrid

      return Object.assign({}, getConfig().grid.formConfig, props.formConfig)
    },
    toolbarOpts () {
      const $xeGrid = this

      return $xeGrid.computeToolbarOpts
    },
    computeToolbarOpts () {
      const $xeGrid = this
      const props = $xeGrid

      return Object.assign({}, getConfig().grid.toolbarConfig, props.toolbarConfig)
    },
    zoomOpts () {
      const $xeGrid = this

      return $xeGrid.computeZoomOpts
    },
    computeZoomOpts () {
      const $xeGrid = this
      const props = $xeGrid

      return Object.assign({}, getConfig().grid.zoomConfig, props.zoomConfig)
    },
    computeStyles () {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData

      const { height, maxHeight } = props
      const { isZMax, tZindex } = reactData
      const stys: VxeComponentStyleType = {}
      if (isZMax) {
        stys.zIndex = tZindex
      } else {
        if (height) {
          stys.height = height === 'auto' || height === '100%' ? '100%' : toCssUnit(height)
        }
        if (maxHeight) {
          stys.maxHeight = maxHeight === 'auto' || maxHeight === '100%' ? '100%' : toCssUnit(maxHeight)
        }
      }
      return stys
    },
    computeTableExtendProps () {
      const $xeGrid = this
      const props = $xeGrid

      const rest: any = {}
      const gridProps: any = props
      propKeys.forEach(key => {
        if (gridProps[key] !== undefined) {
          rest[key] = gridProps[key]
        }
      })
      return rest
    },
    computeTableProps () {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData

      const { showFooter, seqConfig, pagerConfig, editConfig, proxyConfig } = props
      const { isZMax, tablePage, footerData } = reactData
      const tableExtendProps = $xeGrid.computeTableExtendProps as any
      const proxyOpts = $xeGrid.computeProxyOpts as VxeGridPropTypes.ProxyConfig
      const pagerOpts = $xeGrid.computePagerOpts as VxeGridPropTypes.PagerConfig
      const isLoading = $xeGrid.computeIsLoading as boolean
      const tProps = Object.assign({}, tableExtendProps)
      if (showFooter && !tProps.footerData) {
        // 如果未设置自己的标位数据，则使用代理的
        tProps.footerData = footerData
      } else if (proxyOpts.footer && footerData.length) {
        // 如果代理标为数据，且未请求到数据，则用自己的
        tProps.footerData = footerData
      }
      if (isZMax) {
        if (tProps.maxHeight) {
          tProps.maxHeight = '100%'
        } else {
          tProps.height = '100%'
        }
      }
      if (proxyConfig && isEnableConf(proxyOpts)) {
        tProps.loading = isLoading
        if (pagerConfig && proxyOpts.seq && isEnableConf(pagerOpts)) {
          tProps.seqConfig = Object.assign({}, seqConfig, { startIndex: (tablePage.currentPage - 1) * tablePage.pageSize })
        }
      }
      if (editConfig) {
        tProps.editConfig = Object.assign({}, editConfig)
      }
      return tProps
    },
    tableProps () {
      const $xeGrid = this

      return $xeGrid.computeTableProps
    },
    computeCurrLayoutConf () {
      const $xeGrid = this
      const props = $xeGrid

      const { layouts } = props
      let confs: VxeGridPropTypes.Layouts = []
      if (layouts && layouts.length) {
        confs = layouts
      } else {
        confs = getConfig().grid.layouts || defaultLayouts
      }
      let headKeys: VxeGridDefines.LayoutKey[] = []
      let bodyKeys: VxeGridDefines.LayoutKey[] = []
      let footKeys: VxeGridDefines.LayoutKey[] = []
      if (confs.length) {
        if (XEUtils.isArray(confs[0])) {
          headKeys = confs[0] as VxeGridDefines.LayoutKey[]
          bodyKeys = (confs[1] || []) as VxeGridDefines.LayoutKey[]
          footKeys = (confs[2] || []) as VxeGridDefines.LayoutKey[]
        } else {
          bodyKeys = confs as VxeGridDefines.LayoutKey[]
        }
      }
      return {
        headKeys,
        bodyKeys,
        footKeys
      }
    },
    computeCustomCurrentPageFlag () {
      const $xeGrid = this

      const pagerOpts = $xeGrid.computePagerOpts as VxeGridPropTypes.PagerConfig
      return pagerOpts.currentPage
    },
    computeCustomPageSizeFlag () {
      const $xeGrid = this

      const pagerOpts = $xeGrid.computePagerOpts as VxeGridPropTypes.PagerConfig
      return pagerOpts.pageSize
    },
    computeCustomTotalFlag () {
      const $xeGrid = this

      const pagerOpts = $xeGrid.computePagerOpts as VxeGridPropTypes.PagerConfig
      return pagerOpts.total
    },
    computePageCount () {
      const $xeGrid = this
      const reactData = ($xeGrid as any).reactData as GridReactData

      const { tablePage } = reactData
      return Math.max(Math.ceil(tablePage.total / tablePage.pageSize), 1)
    },
    computeIsLoading () {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = ($xeGrid as any).reactData as GridReactData

      const { loading, proxyConfig } = props
      const { tableLoading } = reactData
      const proxyOpts = $xeGrid.computeProxyOpts as VxeGridPropTypes.ProxyConfig
      const { showLoading } = proxyOpts
      return loading || (tableLoading && showLoading && proxyConfig && isEnableConf(proxyOpts))
    }
  },
  watch: {
    columns (value: any) {
      const $xeGrid = this

      $xeGrid.$nextTick(() => $xeGrid.loadColumn(value))
    },
    toolbar (value: any) {
      const $xeGrid = this

      if (value) {
        $xeGrid.initToolbar()
      }
    },
    toolbarConfig (value: any) {
      const $xeGrid = this

      if (value) {
        $xeGrid.initToolbar()
      }
    },
    proxyConfig () {
      const $xeGrid = this

      $xeGrid.initProxy()
    },
    computeCustomCurrentPageFlag () {
      const $xeGrid = this

      $xeGrid.initPages('currentPage')
    },
    computeCustomPageSizeFlag () {
      const $xeGrid = this

      $xeGrid.initPages('pageSize')
    },
    computeCustomTotalFlag () {
      const $xeGrid = this

      $xeGrid.initPages('total')
    }
  },
  methods: {
    ...tableMethods,
    dispatchEvent (type: ValueOf<VxeGridEmits>, params: Record<string, any>, evnt: Event | null) {
      const $xeGrid = this
      $xeGrid.$emit(type, createEvent(evnt, { $grid: $xeGrid, $gantt: null }, params))
    },
    initPages (propKey?: 'currentPage' | 'pageSize' | 'total') {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData

      const { tablePage } = reactData
      const { pagerConfig } = props
      const pagerOpts = $xeGrid.computePagerOpts
      if (pagerConfig && isEnableConf(pagerOpts)) {
        if (propKey) {
          if (pagerOpts[propKey]) {
            tablePage[propKey] = XEUtils.toNumber(pagerOpts[propKey])
          }
        } else {
          const { currentPage, pageSize, total } = pagerOpts
          if (currentPage) {
            tablePage.currentPage = currentPage
          }
          if (pageSize) {
            tablePage.pageSize = pageSize
          }
          if (total) {
            tablePage.total = total
          }
        }
      }
    },
    callSlot (slotFunc: any, params: any, h: CreateElement) {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots

      if (slotFunc) {
        if (XEUtils.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null
        }
        if (XEUtils.isFunction(slotFunc)) {
          return getSlotVNs(slotFunc.call(this, params, h))
        }
      }
      return []
    },
    getEl () {
      const $xeGrid = this

      return $xeGrid.$refs.refElem as HTMLDivElement
    },
    /**
     * 获取需要排除的高度
     */
    getExcludeHeight () {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData

      const { height } = props
      const { isZMax } = reactData
      const el = $xeGrid.$refs.refElem as HTMLDivElement
      if (el) {
        const formWrapper = $xeGrid.$refs.refFormWrapper as HTMLDivElement
        const toolbarWrapper = $xeGrid.$refs.refToolbarWrapper as HTMLDivElement
        const topWrapper = $xeGrid.$refs.refTopWrapper as HTMLDivElement
        const bottomWrapper = $xeGrid.$refs.refBottomWrapper as HTMLDivElement
        const pagerWrapper = $xeGrid.$refs.refPagerWrapper as HTMLDivElement
        const parentEl = el.parentElement as HTMLElement
        let parentPaddingSize = 0
        if (parentEl && (height === '100%' || height === 'auto')) {
          parentPaddingSize = isZMax ? 0 : getPaddingTopBottomSize(parentEl)
        }
        return parentPaddingSize + getPaddingTopBottomSize(el) + getOffsetHeight(formWrapper) + getOffsetHeight(toolbarWrapper) + getOffsetHeight(topWrapper) + getOffsetHeight(bottomWrapper) + getOffsetHeight(pagerWrapper)
      }
      return 0
    },
    getParentHeight () {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      const el = $xeGrid.$refs.refElem as HTMLDivElement
      if (el) {
        const parentEl = el.parentElement as HTMLElement
        return (reactData.isZMax ? getDomNode().visibleHeight : (parentEl ? XEUtils.toNumber(getComputedStyle(parentEl).height) : 0)) - $xeGrid.getExcludeHeight()
      }
      return 0
    },
    initToolbar () {
      const $xeGrid = this

      $xeGrid.$nextTick(() => {
        const $xeTable = $xeGrid.$refs.refTable as VxeTableConstructor & VxeTablePrivateMethods
        const $xeToolbar = $xeGrid.$refs.refToolbar as VxeToolbarInstance
        if ($xeTable && $xeToolbar) {
          $xeTable.connectToolbar($xeToolbar)
        }
      })
    },
    getDefaultFormData () {
      const $xeGrid = this

      const formOpts = $xeGrid.computeFormOpts
      if (formOpts.items) {
        const fData: any = {}
        formOpts.items.forEach(item => {
          const { field, itemRender } = item
          if (field) {
            let itemValue: any = null
            if (itemRender) {
              const { startField, endField, defaultValue } = itemRender
              if (XEUtils.isFunction(defaultValue)) {
                itemValue = defaultValue({ item })
              } else if (!XEUtils.isUndefined(defaultValue)) {
                itemValue = defaultValue
              }
              if (startField && endField) {
                XEUtils.set(fData, startField, null)
                XEUtils.set(fData, endField, null)
              }
            }
            fData[field] = itemValue
          }
        })
        return fData
      }
      return {}
    },
    initProxy () {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData
      const internalData = $xeGrid.internalData

      const { proxyConfig, formConfig } = props
      const { proxyInited } = reactData
      const proxyOpts = $xeGrid.computeProxyOpts
      const formOpts = $xeGrid.computeFormOpts
      if (proxyConfig) {
        if (isEnableConf(formConfig) && proxyOpts.form && formOpts.items) {
          reactData.formData = $xeGrid.getDefaultFormData()
        }
        if (!proxyInited) {
          reactData.proxyInited = true
          if (proxyOpts.autoLoad !== false) {
            $xeGrid.$nextTick().then(() => {
              internalData.uFoot = true
              const rest = $xeGrid.commitProxy('initial')
              internalData.uFoot = false
              $xeGrid.updateQueryFooter()
              return rest
            }).then((rest) => {
              $xeGrid.dispatchEvent('proxy-query', { ...rest, isInited: true }, new Event('initial'))
            })
          }
        }
      }
    },
    updateQueryFooter () {
      const $xeGrid = this

      const proxyOpts = $xeGrid.computeProxyOpts
      const { ajax } = proxyOpts
      if (ajax && ajax.queryFooter) {
        return $xeGrid.commitProxy('queryFooter')
      }
    },
    handleGlobalKeydownEvent (evnt: KeyboardEvent) {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      const zoomOpts = $xeGrid.computeZoomOpts
      const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
      if (isEsc && reactData.isZMax && zoomOpts.escRestore !== false) {
        $xeGrid.triggerZoomEvent(evnt)
      }
    },
    getRespMsg (rest: any, defaultMsg: string) {
      const $xeGrid = this

      const proxyOpts = $xeGrid.computeProxyOpts
      const resConfigs = proxyOpts.response || proxyOpts.props || {}
      const messageProp = resConfigs.message
      const $xeTable = $xeGrid.$refs.refTable as VxeTableConstructor & VxeTablePrivateMethods
      let msg
      if (rest && messageProp) {
        msg = XEUtils.isFunction(messageProp) ? messageProp({ data: rest, $table: $xeTable, $grid: $xeGrid as VxeGridConstructor, $gantt: null }) : XEUtils.get(rest, messageProp)
      }
      return msg || getI18n(defaultMsg)
    },
    handleDeleteRow (code: string, alertKey: string, callback: () => void): Promise<void> {
      const $xeGrid = this

      const isActiveMsg = $xeGrid.computeIsActiveMsg
      const selectRecords = $xeGrid.getCheckboxRecords()
      if (isActiveMsg) {
        if (selectRecords.length) {
          if (VxeUI.modal) {
            return VxeUI.modal.confirm({ id: `cfm_${code}`, content: getI18n(alertKey), escClosable: true }).then((type) => {
              if (type === 'confirm') {
                return callback()
              }
            })
          }
        } else {
          if (VxeUI.modal) {
            VxeUI.modal.message({ id: `msg_${code}`, content: getI18n('vxe.grid.selectOneRecord'), status: 'warning' })
          }
        }
      } else {
        if (selectRecords.length) {
          callback()
        }
      }
      return Promise.resolve()
    },
    triggerPendingEvent (code: string) {
      const $xeGrid = this

      const isActiveMsg = $xeGrid.computeIsActiveMsg
      const $xeTable = $xeGrid.$refs.refTable as VxeTableConstructor & VxeTablePrivateMethods
      const selectRecords = $xeTable.getCheckboxRecords()
      if (selectRecords.length) {
        $xeTable.togglePendingRow(selectRecords)
        $xeGrid.clearCheckboxRow()
      } else {
        if (isActiveMsg) {
          if (VxeUI.modal) {
            VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.selectOneRecord'), status: 'warning' })
          }
        }
      }
    },
    /**
     * 提交指令，支持 code 或 button
     * @param {String/Object} code 字符串或对象
     */
    commitProxy (proxyTarget: string | VxeToolbarPropTypes.ButtonConfig, ...args: any[]): Promise<any> {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData
      const internalData = $xeGrid.internalData

      /**
       * 已废弃
       * @deprecated
       */
      const toolbar = (props as any).toolbar

      const { showFooter, proxyConfig, toolbarConfig, pagerConfig, editRules, validConfig } = props
      const { tablePage } = reactData
      const isActiveMsg = $xeGrid.computeIsActiveMsg
      const isRespMsg = $xeGrid.computeIsRespMsg
      const proxyOpts = $xeGrid.computeProxyOpts
      const pagerOpts = $xeGrid.computePagerOpts
      const toolbarOpts = $xeGrid.computeToolbarOpts
      const { beforeQuery, afterQuery, beforeQueryFooter, afterQueryFooter, beforeDelete, afterDelete, beforeSave, afterSave, ajax = {} } = proxyOpts
      const resConfigs = (proxyOpts.response || proxyOpts.props || {}) as VxeGridDefines.ProxyConfigResponseConfig
      const $xeTable = $xeGrid.$refs.refTable as VxeTableConstructor & VxeTablePrivateMethods
      let formData = $xeGrid.getFormData()
      let button: VxeToolbarPropTypes.ButtonConfig | null = null
      let code: string | null = null
      if (XEUtils.isString(proxyTarget)) {
        const { buttons } = toolbarOpts
        const matchObj = (toolbarConfig || toolbar) && isEnableConf(toolbarOpts) && buttons ? XEUtils.findTree(buttons, (item) => item.code === proxyTarget, { children: 'dropdowns' }) : null
        button = matchObj ? matchObj.item as any : null
        code = proxyTarget
      } else {
        button = proxyTarget
        code = button.code as string
      }
      const btnParams = button ? button.params : null
      switch (code) {
        case 'insert':
          return $xeTable.insert({})
        case 'insert_edit':
          return $xeTable.insert({}).then(({ row }) => $xeTable.setEditRow(row, true))

          // 已废弃
        case 'insert_actived':
          return $xeTable.insert({}).then(({ row }) => $xeTable.setEditRow(row, true))
          // 已废弃

        case 'mark_cancel':
          $xeGrid.triggerPendingEvent(code)
          break
        case 'remove':
          return $xeGrid.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', () => $xeTable.removeCheckboxRow())
        case 'import':
          $xeTable.importData(btnParams)
          break
        case 'open_import':
          $xeTable.openImport(btnParams)
          break
        case 'export':
          $xeTable.exportData(btnParams)
          break
        case 'open_export':
          $xeTable.openExport(btnParams)
          break
        case 'reset_custom':
          $xeTable.resetCustom(true)
          break
        case 'initial':
        case 'reload':
        case 'query': {
          const qMethods = ajax.query
          const qsMethods = ajax.querySuccess
          const qeMethods = ajax.queryError
          if (qMethods) {
            const isInited = code === 'initial'
            const isReload = code === 'reload'
            if (!isInited && reactData.tableLoading) {
              return $xeGrid.$nextTick()
            }
            let operPromise = null
            let sortList: any[] = []
            let filterList: VxeTableDefines.FilterCheckedParams[] = []
            let pageParams: any = {}
            if (pagerConfig) {
              if (isInited || isReload) {
                tablePage.currentPage = 1
              }
              if (isEnableConf(pagerConfig)) {
                pageParams = { ...tablePage }
              }
            }
            if (isInited) {
              // 重置代理表单数据
              if (proxyConfig && isEnableConf(proxyOpts) && proxyOpts.form) {
                formData = $xeGrid.getDefaultFormData()
                reactData.formData = formData
              }
              if ($xeTable) {
                const tableInternalData = $xeTable as unknown as TableInternalData
                const { tableFullColumn, fullColumnFieldData } = tableInternalData
                const sortOpts = $xeTable.computeSortOpts
                let defaultSort = sortOpts.defaultSort
                tableFullColumn.forEach((column) => {
                  column.order = null
                })
                // 如果使用默认排序
                if (defaultSort) {
                  if (!XEUtils.isArray(defaultSort)) {
                    defaultSort = [defaultSort]
                  }
                  sortList = defaultSort.map((item) => {
                    const { field, order } = item
                    const colRest = fullColumnFieldData[field]
                    if (colRest) {
                      const column = colRest.column
                      if (column) {
                        column.order = order
                      }
                    }
                    return {
                      field,
                      property: field,
                      order
                    }
                  })
                }
                filterList = $xeTable.getCheckedFilters()
              }
            } else {
              if ($xeTable) {
                if (isReload) {
                  operPromise = $xeTable.clearAll()
                } else {
                  sortList = $xeTable.getSortColumns()
                  filterList = $xeTable.getCheckedFilters()
                }
              }
            }
            const commitParams = {
              $table: $xeTable,
              $grid: $xeGrid as VxeGridConstructor,
              $gantt: null,
              code,
              button,
              isInited,
              isReload,
              page: pageParams,
              sort: sortList.length ? sortList[0] : {},
              sorts: sortList,
              filters: filterList,
              form: formData,
              options: qMethods
            }
            reactData.sortData = sortList
            reactData.filterData = filterList
            reactData.tableLoading = true
            return Promise.all([
              Promise.resolve((beforeQuery || qMethods)(commitParams, ...args)),
              operPromise
            ]).then(([rest]) => {
              let tableData: any[] = []
              reactData.tableLoading = false
              if (rest) {
                const reParams = { data: rest, $table: $xeTable, $grid: $xeGrid as VxeGridConstructor, $gantt: null }
                if (pagerConfig && isEnableConf(pagerOpts)) {
                  const totalProp = resConfigs.total
                  const total = (XEUtils.isFunction(totalProp) ? totalProp(reParams) : XEUtils.get(rest, totalProp || 'page.total')) || 0
                  tablePage.total = XEUtils.toNumber(total)
                  const resultProp = resConfigs.result
                  tableData = (XEUtils.isFunction(resultProp) ? resultProp(reParams) : XEUtils.get(rest, resultProp || 'result')) || []
                  // 检验当前页码，不能超出当前最大页数
                  const pageCount = Math.max(Math.ceil(total / tablePage.pageSize), 1)
                  if (tablePage.currentPage > pageCount) {
                    tablePage.currentPage = pageCount
                  }
                } else {
                  const listProp = resConfigs.list
                  if (XEUtils.isArray(rest)) {
                    tableData = rest
                  } else if (listProp) {
                    tableData = (XEUtils.isFunction(listProp) ? listProp(reParams) : XEUtils.get(rest, listProp)) || []
                  }
                }
                if (showFooter) {
                  const fdProp = resConfigs.footerData
                  const footerList = fdProp ? (XEUtils.isFunction(fdProp) ? fdProp(reParams) : XEUtils.get(rest, fdProp)) : []
                  if (XEUtils.isArray(footerList)) {
                    reactData.footerData = footerList
                  }
                }
              }
              if ($xeTable) {
                $xeTable.loadData(tableData)
              } else {
                $xeGrid.$nextTick(() => {
                  const $xeTable = $xeGrid.$refs.refTable as VxeTableConstructor & VxeTablePrivateMethods
                  if ($xeTable) {
                    $xeTable.loadData(tableData)
                  }
                })
              }
              if (afterQuery) {
                afterQuery(commitParams, ...args)
              }
              if (qsMethods) {
                qsMethods({ ...commitParams, response: rest })
              }
              return { status: true }
            }).catch((rest) => {
              reactData.tableLoading = false
              if (qeMethods) {
                qeMethods({ ...commitParams, response: rest })
              }
              return { status: false }
            })
          } else {
            errLog('vxe.error.notFunc', ['[grid] proxy-config.ajax.query'])
          }
          break
        }
        case 'queryFooter': {
          const qfMethods = ajax.queryFooter
          const qfSuccessMethods = ajax.queryFooterSuccess
          const qfErrorMethods = ajax.queryFooterError
          if (qfMethods) {
            let filterList: VxeTableDefines.FilterCheckedParams[] = []
            if ($xeTable) {
              filterList = $xeTable.getCheckedFilters()
            }
            const commitParams = {
              $table: $xeTable,
              $grid: $xeGrid,
              $gantt: null,
              code,
              button,
              filters: filterList,
              form: formData,
              options: qfMethods
            }
            return Promise.resolve((beforeQueryFooter || qfMethods)(commitParams, ...args)).then(rest => {
              reactData.footerData = XEUtils.isArray(rest) ? rest : []
              if (afterQueryFooter) {
                afterQueryFooter(commitParams, ...args)
              }
              if (qfSuccessMethods) {
                qfSuccessMethods({ ...commitParams, response: rest })
              }
              return { status: true }
            }).catch((rest) => {
              if (qfErrorMethods) {
                qfErrorMethods({ ...commitParams, response: rest })
              }
              return { status: false }
            })
          } else {
            errLog('vxe.error.notFunc', ['[grid] proxy-config.ajax.queryFooter'])
          }
          break
        }
        case 'delete': {
          const dMethods = ajax.delete
          const deleteSuccessMethods = ajax.deleteSuccess
          const deleteErrorMethods = ajax.deleteError
          if (dMethods) {
            const selectRecords = $xeTable.getCheckboxRecords()
            const removeRecords = selectRecords.filter((row) => !$xeTable.isInsertByRow(row))
            const body = { removeRecords }
            const commitParams = {
              $table: $xeTable,
              $grid: $xeGrid as VxeGridConstructor,
              $gantt: null,
              code,
              button,
              body,
              form: formData,
              options: dMethods
            }
            const applyArgs = [commitParams].concat(args)
            if (selectRecords.length) {
              return $xeGrid.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', () => {
                if (!removeRecords.length) {
                  return $xeTable.remove(selectRecords)
                }
                reactData.tableLoading = true
                return Promise.resolve((beforeDelete || dMethods)(...applyArgs))
                  .then(rest => {
                    reactData.tableLoading = false
                    $xeTable.setPendingRow(removeRecords, false)
                    if (isRespMsg) {
                      if (VxeUI.modal) {
                        VxeUI.modal.message({ content: $xeGrid.getRespMsg(rest, 'vxe.grid.delSuccess'), status: 'success' })
                      }
                    }
                    if (afterDelete) {
                      afterDelete(...applyArgs)
                    } else {
                      internalData.uFoot = true
                      $xeGrid.commitProxy('query')
                      internalData.uFoot = false
                      $xeGrid.updateQueryFooter()
                    }
                    if (deleteSuccessMethods) {
                      deleteSuccessMethods({ ...commitParams, response: rest })
                    }
                    return { status: true }
                  })
                  .catch(rest => {
                    reactData.tableLoading = false
                    if (isRespMsg) {
                      if (VxeUI.modal) {
                        VxeUI.modal.message({ id: code, content: $xeGrid.getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                      }
                    }
                    if (deleteErrorMethods) {
                      deleteErrorMethods({ ...commitParams, response: rest })
                    }
                    return { status: false }
                  })
              })
            } else {
              if (isActiveMsg) {
                if (VxeUI.modal) {
                  VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.selectOneRecord'), status: 'warning' })
                }
              }
            }
          } else {
            errLog('vxe.error.notFunc', ['[grid] proxy-config.ajax.delete'])
          }
          break
        }
        case 'save': {
          const ajaxMethods = ajax.save
          const saveSuccessMethods = ajax.saveSuccess
          const saveErrorMethods = ajax.saveError
          if (ajaxMethods) {
            const body = $xeGrid.getRecordset()
            const { insertRecords, removeRecords, updateRecords, pendingRecords } = body
            const commitParams = {
              $table: $xeTable,
              $grid: $xeGrid as VxeGridConstructor,
              $gantt: null,
              code,
              button,
              body,
              form: formData,
              options: ajaxMethods
            }
            const applyArgs = [commitParams].concat(args)
            // 排除掉新增且标记为删除的数据
            if (insertRecords.length) {
              body.pendingRecords = pendingRecords.filter((row) => insertRecords.indexOf(row) === -1)
            }
            // 排除已标记为删除的数据
            if (pendingRecords.length) {
              body.insertRecords = insertRecords.filter((row) => pendingRecords.indexOf(row) === -1)
            }
            let restPromise: Promise<any> = Promise.resolve()
            if (editRules) {
              // 只校验新增和修改的数据
              restPromise = $xeGrid[validConfig && validConfig.msgMode === 'full' ? 'fullValidate' : 'validate'](body.insertRecords.concat(updateRecords))
            }
            return restPromise.then((errMap: any) => {
              if (errMap) {
                // 如果校验不通过
                return
              }
              if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                reactData.tableLoading = true
                return Promise.resolve((beforeSave || ajaxMethods)(...applyArgs))
                  .then(rest => {
                    reactData.tableLoading = false
                    $xeTable.clearPendingRow()
                    if (isRespMsg) {
                      if (VxeUI.modal) {
                        VxeUI.modal.message({ content: $xeGrid.getRespMsg(rest, 'vxe.grid.saveSuccess'), status: 'success' })
                      }
                    }
                    if (afterSave) {
                      afterSave(...applyArgs)
                    } else {
                      internalData.uFoot = true
                      $xeGrid.commitProxy('query')
                      internalData.uFoot = false
                      $xeGrid.updateQueryFooter()
                    }
                    if (saveSuccessMethods) {
                      saveSuccessMethods({ ...commitParams, response: rest })
                    }
                    return { status: true }
                  })
                  .catch(rest => {
                    reactData.tableLoading = false
                    if (isRespMsg) {
                      if (VxeUI.modal) {
                        VxeUI.modal.message({ id: code, content: $xeGrid.getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                      }
                    }
                    if (saveErrorMethods) {
                      saveErrorMethods({ ...commitParams, response: rest })
                    }
                    return { status: false }
                  })
              } else {
                if (isActiveMsg) {
                  if (VxeUI.modal) {
                    VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.dataUnchanged'), status: 'info' })
                  }
                }
              }
            })
          } else {
            errLog('vxe.error.notFunc', ['[grid] proxy-config.ajax.save'])
          }
          break
        }
        default: {
          const gCommandOpts = commands.get(code)
          if (gCommandOpts) {
            const tCommandMethod = gCommandOpts.tableCommandMethod || gCommandOpts.commandMethod
            if (tCommandMethod) {
              tCommandMethod({ code, button, $grid: $xeGrid as VxeGridConstructor, $table: $xeTable, $gantt: null }, ...args)
            } else {
              errLog('vxe.error.notCommands', [`[grid] ${code}`])
            }
          }
        }
      }
      return $xeGrid.$nextTick()
    },
    getFormData () {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData

      const { proxyConfig } = props
      const { formData } = reactData
      const proxyOpts = $xeGrid.computeProxyOpts
      const formOpts = $xeGrid.computeFormOpts
      return proxyConfig && isEnableConf(proxyOpts) && proxyOpts.form ? formData : formOpts.data
    },
    getFormItems (itemIndex?: number): any {
      const $xeGrid = this
      const props = $xeGrid

      const formOpts = $xeGrid.computeFormOpts
      const { formConfig } = props
      const { items } = formOpts
      const itemList: VxeFormItemProps[] = []
      XEUtils.eachTree(formConfig && isEnableConf(formOpts) && items ? items : [], item => {
        itemList.push(item)
      }, { children: 'children' })
      return XEUtils.isUndefined(itemIndex) ? itemList : itemList[itemIndex]
    },
    resetForm () {
      const $xeGrid = this

      const $form = $xeGrid.$refs.refForm as VxeFormInstance
      if ($form) {
        return $form.reset()
      }
      return $xeGrid.$nextTick()
    },
    validateForm () {
      const $xeGrid = this

      const $form = $xeGrid.$refs.refForm as VxeFormInstance
      if ($form) {
        return $form.validate()
      }
      return $xeGrid.$nextTick() as unknown as Promise<VxeFormDefines.ValidateErrorMapParams>
    },
    validateFormField (field: VxeFormItemPropTypes.Field | VxeFormItemPropTypes.Field[] | VxeFormDefines.ItemInfo | VxeFormDefines.ItemInfo[] | null) {
      const $xeGrid = this

      const $form = $xeGrid.$refs.refForm as VxeFormInstance
      if ($form) {
        return $form.validateField(field)
      }
      return $xeGrid.$nextTick() as unknown as Promise<VxeFormDefines.ValidateErrorMapParams>
    },
    clearFormValidate (field?: VxeFormItemPropTypes.Field | VxeFormItemPropTypes.Field[] | VxeFormDefines.ItemInfo | VxeFormDefines.ItemInfo[] | null) {
      const $xeGrid = this

      const $form = $xeGrid.$refs.refForm as VxeFormInstance
      if ($form) {
        return $form.clearValidate(field)
      }
      return $xeGrid.$nextTick()
    },
    homePage () {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      const { tablePage } = reactData
      tablePage.currentPage = 1
      return $xeGrid.$nextTick()
    },
    homePageByEvent (evnt: Event) {
      const $xeGrid = this

      const $pager = $xeGrid.$refs.refPager as VxePagerInstance
      if ($pager) {
        $pager.homePageByEvent(evnt)
      }
    },
    endPage () {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      const { tablePage } = reactData
      const pageCount = $xeGrid.computePageCount
      tablePage.currentPage = pageCount
      return $xeGrid.$nextTick()
    },
    endPageByEvent (evnt: Event) {
      const $xeGrid = this

      const $pager = $xeGrid.$refs.refPager as VxePagerInstance
      if ($pager) {
        $pager.endPageByEvent(evnt)
      }
    },
    getCurrentPage () {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      const { tablePage } = reactData
      return tablePage.currentPage
    },
    setCurrentPage (currentPage: number | string | null | undefined) {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      const { tablePage } = reactData
      const pageCount = $xeGrid.computePageCount
      tablePage.currentPage = Math.min(pageCount, Math.max(1, XEUtils.toNumber(currentPage)))
      return $xeGrid.$nextTick()
    },
    setCurrentPageByEvent (evnt: Event, currentPage: number | string | null | undefined) {
      const $xeGrid = this

      const $pager = $xeGrid.$refs.refPager as VxePagerInstance
      if ($pager) {
        $pager.setCurrentPageByEvent(evnt, currentPage)
      }
    },
    getPageSize () {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      const { tablePage } = reactData
      return tablePage.pageSize
    },
    setPageSize (pageSize: number | string | null | undefined) {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      const { tablePage } = reactData
      tablePage.pageSize = Math.max(1, XEUtils.toNumber(pageSize))
      return $xeGrid.$nextTick()
    },
    setPageSizeByEvent (evnt: Event, pageSize: number | string | null | undefined) {
      const $xeGrid = this

      const $pager = $xeGrid.$refs.refPager as VxePagerInstance
      if ($pager) {
        $pager.setPageSizeByEvent(evnt, pageSize)
      }
    },
    triggerToolbarCommitEvent (params: any, evnt: any) {
      const $xeGrid = this
      const internalData = $xeGrid.internalData

      const { code } = params
      if (code) {
        const isUf = ['reload', 'delete', 'save'].includes(code)
        if (isUf) {
          internalData.uFoot = true
        }
        const rest = $xeGrid.commitProxy(params, evnt).then((rest) => {
          if (code && rest && rest.status && ['query', 'reload', 'delete', 'save'].includes(code)) {
            $xeGrid.dispatchEvent(code === 'delete' || code === 'save' ? `proxy-${code as 'delete' | 'save'}` : 'proxy-query', { ...rest, isReload: code === 'reload' }, evnt)
          }
        })
        if (isUf) {
          $xeGrid.updateQueryFooter()
        }
        internalData.uFoot = false
        return rest
      }
      return $xeGrid.$nextTick()
    },
    triggerToolbarBtnEvent (button: any, evnt: any) {
      const $xeGrid = this

      $xeGrid.triggerToolbarCommitEvent(button, evnt)
      $xeGrid.dispatchEvent('toolbar-button-click', { code: button.code, button }, evnt)
    },
    triggerToolbarTolEvent (tool: any, evnt: any) {
      const $xeGrid = this

      $xeGrid.triggerToolbarCommitEvent(tool, evnt)
      $xeGrid.dispatchEvent('toolbar-tool-click', { code: tool.code, tool }, evnt)
    },
    pageChangeEvent (params: VxePagerDefines.PageChangeEventParams) {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData

      const { proxyConfig } = props
      const { tablePage } = reactData
      const { $event, currentPage, pageSize } = params
      const proxyOpts = $xeGrid.computeProxyOpts
      tablePage.currentPage = currentPage
      tablePage.pageSize = pageSize
      $xeGrid.dispatchEvent('page-change', params, $event)
      if (proxyConfig && isEnableConf(proxyOpts)) {
        $xeGrid.commitProxy('query').then((rest) => {
          $xeGrid.dispatchEvent('proxy-query', rest, $event)
        })
      }
    },
    handleSortEvent (params: VxeTableDefines.SortChangeEventParams) {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData
      const $xeTable = $xeGrid.$refs.refTable as VxeTableConstructor & VxeTablePrivateMethods

      const { proxyConfig } = props
      const proxyOpts = $xeGrid.computeProxyOpts
      const sortOpts = $xeTable.computeSortOpts
      // 如果是服务端排序
      if (sortOpts.remote) {
        reactData.sortData = params.sortList
        if (proxyConfig && isEnableConf(proxyOpts)) {
          reactData.tablePage.currentPage = 1
          $xeGrid.commitProxy('query').then((rest) => {
            $xeGrid.dispatchEvent('proxy-query', rest, params.$event)
          })
        }
      }
    },
    sortChangeEvent (params: VxeTableDefines.SortChangeEventParams) {
      const $xeGrid = this

      $xeGrid.handleSortEvent(params)
      $xeGrid.dispatchEvent('sort-change', params, params.$event)
    },
    clearAllSortEvent (params: VxeTableDefines.SortChangeEventParams) {
      const $xeGrid = this

      $xeGrid.handleSortEvent(params)
      $xeGrid.dispatchEvent('clear-all-sort', params, params.$event)
    },
    handleFilterEvent (params: VxeTableDefines.ClearAllFilterEventParams) {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData
      const internalData = $xeGrid.internalData
      const $xeTable = $xeGrid.$refs.refTable as VxeTableConstructor & VxeTablePrivateMethods

      const { proxyConfig } = props
      const proxyOpts = $xeGrid.computeProxyOpts
      const filterOpts = $xeTable.computeFilterOpts
      // 如果是服务端过滤
      if (filterOpts.remote) {
        reactData.filterData = params.filterList
        if (proxyConfig && isEnableConf(proxyOpts)) {
          reactData.tablePage.currentPage = 1
          internalData.uFoot = true
          $xeGrid.commitProxy('query').then((rest) => {
            $xeGrid.dispatchEvent('proxy-query', rest, params.$event)
          })
          internalData.uFoot = false
          $xeGrid.updateQueryFooter()
        }
      }
    },
    filterChangeEvent (params: VxeTableDefines.ClearAllFilterEventParams) {
      const $xeGrid = this

      $xeGrid.handleFilterEvent(params)
      $xeGrid.dispatchEvent('filter-change', params, params.$event)
    },
    clearAllFilterEvent (params: VxeTableDefines.ClearAllFilterEventParams) {
      const $xeGrid = this

      $xeGrid.handleFilterEvent(params)
      $xeGrid.dispatchEvent('clear-all-filter', params, params.$event)
    },
    submitFormEvent (params: VxeFormDefines.SubmitEventParams) {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData
      const internalData = $xeGrid.internalData

      const { proxyConfig } = props
      const proxyOpts = $xeGrid.computeProxyOpts
      if (reactData.tableLoading) {
        return
      }
      if (proxyConfig && isEnableConf(proxyOpts)) {
        internalData.uFoot = true
        $xeGrid.commitProxy('reload').then((rest) => {
          $xeGrid.dispatchEvent('proxy-query', { ...rest, isReload: true }, params.$event)
        })
        internalData.uFoot = false
        $xeGrid.updateQueryFooter()
      }
      $xeGrid.dispatchEvent('form-submit', params, params.$event)
    },
    resetFormEvent (params: VxeFormDefines.ResetEventParams) {
      const $xeGrid = this
      const props = $xeGrid
      const internalData = $xeGrid.internalData

      const $xeTable = $xeGrid.$refs.refTable as VxeTableConstructor & VxeTablePrivateMethods
      const { proxyConfig } = props
      const { $event } = params
      const proxyOpts = $xeGrid.computeProxyOpts
      if (proxyConfig && isEnableConf(proxyOpts)) {
        $xeTable.clearScroll()
        internalData.uFoot = true
        $xeGrid.commitProxy('reload').then((rest) => {
          $xeGrid.dispatchEvent('proxy-query', { ...rest, isReload: true }, $event)
        })
        internalData.uFoot = false
        $xeGrid.updateQueryFooter()
      }
      $xeGrid.dispatchEvent('form-reset', params, $event)
    },
    submitInvalidEvent (params: VxeFormDefines.SubmitInvalidEventParams) {
      const $xeGrid = this

      $xeGrid.dispatchEvent('form-submit-invalid', params, params.$event)
    },
    collapseEvent (params: VxeFormDefines.CollapseEventParams) {
      const $xeGrid = this

      const { $event } = params
      $xeGrid.dispatchEvent('form-toggle-collapse', params, $event)
      $xeGrid.dispatchEvent('form-collapse', params, $event)
    },
    triggerZoomEvent (evnt: Event) {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      $xeGrid.zoom()
      $xeGrid.dispatchEvent('zoom', { type: reactData.isZMax ? 'max' : 'revert' }, evnt)
    },
    getParams () {
      const $xeGrid = this
      const props = $xeGrid

      return (props as any).params
    },
    zoom () {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      if (reactData.isZMax) {
        return $xeGrid.revert()
      }
      return $xeGrid.maximize()
    },
    isMaximized () {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      return reactData.isZMax
    },
    maximize () {
      const $xeGrid = this

      return $xeGrid.handleZoom(true)
    },
    revert () {
      const $xeGrid = this

      return $xeGrid.handleZoom()
    },
    handleZoom (isMax?: boolean) {
      const $xeGrid = this
      const reactData = $xeGrid.reactData

      const { isZMax } = reactData
      if (isMax ? !isZMax : isZMax) {
        reactData.isZMax = !isZMax
        if (reactData.tZindex < getLastZIndex()) {
          reactData.tZindex = nextZIndex()
        }
      }
      return $xeGrid.$nextTick()
        .then(() => $xeGrid.recalculate(true))
        .then(() => {
          setTimeout(() => $xeGrid.recalculate(true), 15)
          return reactData.isZMax
        })
    },
    getProxyInfo () {
      const $xeGrid = this
      const props = $xeGrid
      const $xeTable = $xeGrid.$refs.refTable as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeGrid.reactData

      if (props.proxyConfig) {
        const { sortData } = reactData
        return {
          data: $xeTable ? $xeTable.getFullData() : [],
          filter: reactData.filterData,
          form: $xeGrid.getFormData(),
          sort: sortData.length ? sortData[0] : {},
          sorts: sortData,
          pager: reactData.tablePage,
          pendingRecords: $xeTable ? $xeTable.getPendingRecords() : []
        }
      }
      return null
    },
    loadColumn (columns: any[]) {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots
      const $xeTable = $xeGrid.$refs.refTable as VxeTableConstructor & VxeTablePrivateMethods

      XEUtils.eachTree(columns, column => {
        if (column.slots) {
          XEUtils.each(column.slots, (func) => {
            if (!XEUtils.isFunction(func)) {
              if (!slots[func]) {
                errLog('vxe.error.notSlot', [`[grid] ${func}`])
              }
            }
          })
        }
      })
      return $xeTable.loadColumn(columns)
    },
    reloadColumn (columns: any[]) {
      const $xeGrid = this

      $xeGrid.clearAll()
      return $xeGrid.loadColumn(columns)
    },
    getConfigSlot (slotConfigs?: Record<string, any>) {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots

      const slotConf: Record<string, any> = {}
      XEUtils.objectMap(slotConfigs, (slotFunc, slotKey) => {
        if (slotFunc) {
          if (XEUtils.isString(slotFunc)) {
            if (slots[slotFunc]) {
              slotConf[slotKey] = slots[slotFunc]
            } else {
              errLog('vxe.error.notSlot', [`[grid] ${slotFunc}`])
            }
          } else {
            slotConf[slotKey] = slotFunc
          }
        }
      })
      return slotConf
    },
    getToolbarSlots () {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots

      const toolbarOpts = $xeGrid.computeToolbarOpts
      const toolbarOptSlots = toolbarOpts.slots
      const toolbarSlots: {
        buttons?(params: any): any
        buttonPrefix?(params: any): any
        buttonSuffix?(params: any): any
        tools?(params: any): any
        toolPrefix?(params: any): any
        toolSuffix?(params: any): any
      } = {}
      if (slots.buttons && (!toolbarOptSlots || toolbarOptSlots.buttons !== 'buttons')) {
        warnLog('vxe.error.reqProp', ['[grid] toolbar-config.slots.buttons'])
      }
      if (slots.tools && (!toolbarOptSlots || toolbarOptSlots.tools !== 'tools')) {
        warnLog('vxe.error.reqProp', ['[grid] toolbar-config.slots.tools'])
      }
      if (toolbarOptSlots) {
        const buttonsSlot = $xeGrid.getFuncSlot(toolbarOptSlots, 'buttons')
        const buttonPrefixSlot = $xeGrid.getFuncSlot(toolbarOptSlots, 'buttonPrefix')
        const buttonSuffixSlot = $xeGrid.getFuncSlot(toolbarOptSlots, 'buttonSuffix')
        const toolsSlot = $xeGrid.getFuncSlot(toolbarOptSlots, 'tools')
        const toolPrefixSlot = $xeGrid.getFuncSlot(toolbarOptSlots, 'toolPrefix')
        const toolSuffixSlot = $xeGrid.getFuncSlot(toolbarOptSlots, 'toolSuffix')
        if (buttonsSlot) {
          toolbarSlots.buttons = buttonsSlot
        }
        if (buttonPrefixSlot) {
          toolbarSlots.buttonPrefix = buttonPrefixSlot
        }
        if (buttonSuffixSlot) {
          toolbarSlots.buttonSuffix = buttonSuffixSlot
        }
        if (toolsSlot) {
          toolbarSlots.tools = toolsSlot
        }
        if (toolPrefixSlot) {
          toolbarSlots.toolPrefix = toolPrefixSlot
        }
        if (toolSuffixSlot) {
          toolbarSlots.toolSuffix = toolSuffixSlot
        }
      }
      return toolbarSlots
    },
    getFuncSlot (optSlots: any, slotKey: any) {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots

      const funcSlot = optSlots[slotKey]
      if (funcSlot) {
        if (XEUtils.isString(funcSlot)) {
          if (slots[funcSlot]) {
            return slots[funcSlot]
          } else {
            errLog('vxe.error.notSlot', [`[grid] ${funcSlot}`])
          }
        } else {
          return funcSlot
        }
      }
      return null
    },

    //
    // Render
    //
    renderDefaultForm (h: CreateElement) {
      const VxeUIFormComponent = VxeUI.getComponent('VxeForm')

      const $xeGrid = this
      const props = $xeGrid
      const slots = $xeGrid.$scopedSlots
      const reactData = $xeGrid.reactData

      const { proxyConfig, formConfig } = props
      const { formData } = reactData
      const proxyOpts = $xeGrid.computeProxyOpts
      const formOpts = $xeGrid.computeFormOpts
      if (isEnableConf(formConfig) && formOpts.items && formOpts.items.length) {
        const formSlots: any = {}
        if (!(formOpts as any).inited) {
          (formOpts as any).inited = true
          const beforeItem = proxyOpts.beforeItem
          if (proxyOpts && beforeItem) {
            formOpts.items.forEach((item) => {
              beforeItem.call($xeGrid, { $grid: $xeGrid, $gantt: null, item })
            })
          }
        }
        // 处理插槽
        formOpts.items.forEach((item) => {
          XEUtils.each(item.slots, (func) => {
            if (!XEUtils.isFunction(func)) {
              if (slots[func]) {
                formSlots[func] = slots[func]
              }
            }
          })
        })
        return [
          VxeUIFormComponent
            ? h(VxeUIFormComponent, {
              ref: 'refForm',
              props: Object.assign({}, formOpts, {
                data: proxyConfig && proxyOpts.form ? formData : formOpts.data
              }),
              on: {
                submit: $xeGrid.submitFormEvent,
                reset: $xeGrid.resetFormEvent,
                collapse: $xeGrid.collapseEvent,
                'submit-invalid': $xeGrid.submitInvalidEvent
              },
              scopedSlots: formSlots
            })
            : renderEmptyElement($xeGrid)
        ]
      }
      return []
    },
    renderForm (h: CreateElement) {
      const $xeGrid = this
      const props = $xeGrid
      const slots = $xeGrid.$scopedSlots

      const { formConfig } = props
      const formSlot = slots.form
      const hasForm = !!(formSlot || isEnableConf(formConfig))

      if (hasForm) {
        return h('div', {
          key: 'form',
          ref: 'refFormWrapper',
          class: 'vxe-grid--form-wrapper'
        }, formSlot ? formSlot.call($xeGrid, { $grid: $xeGrid, $gantt: null }) : $xeGrid.renderDefaultForm(h))
      }
      return renderEmptyElement($xeGrid)
    },
    renderToolbar (h: CreateElement) {
      const $xeGrid = this
      const props = $xeGrid
      const slots = $xeGrid.$scopedSlots

      const { toolbarConfig } = props
      const toolbarSlot = slots.toolbar
      const toolbarOpts = $xeGrid.computeToolbarOpts

      if ((toolbarConfig && isEnableConf(toolbarOpts)) || toolbarSlot) {
        return h('div', {
          key: 'toolbar',
          ref: 'refToolbarWrapper',
          class: 'vxe-grid--toolbar-wrapper'
        }, toolbarSlot
          ? toolbarSlot.call($xeGrid, { $grid: $xeGrid, $gantt: null })
          : [
              h(VxeToolbarComponent, {
                props: Object.assign({}, toolbarOpts, { slots: undefined }),
                ref: 'refToolbar',
                scopedSlots: $xeGrid.getToolbarSlots()
              })
            ]
        )
      }
      return renderEmptyElement($xeGrid)
    },
    renderTop (h: CreateElement) {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots

      const topSlot = slots.top
      return topSlot
        ? h('div', {
          key: 'top',
          ref: 'refTopWrapper',
          class: 'vxe-grid--top-wrapper'
        }, topSlot.call($xeGrid, { $grid: $xeGrid, $gantt: null }))
        : renderEmptyElement($xeGrid)
    },
    renderTableLeft (h: CreateElement) {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots

      const leftSlot = slots.left
      if (leftSlot) {
        return h('div', {
          class: 'vxe-grid--left-wrapper'
        }, leftSlot({ $grid: $xeGrid, $gantt: null }))
      }
      return renderEmptyElement($xeGrid)
    },
    renderTableRight (h: CreateElement) {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots

      const rightSlot = slots.right
      if (rightSlot) {
        return h('div', {
          class: 'vxe-grid--right-wrapper'
        }, rightSlot({ $grid: $xeGrid, $gantt: null }))
      }
      return renderEmptyElement($xeGrid)
    },
    renderTable (h: CreateElement) {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots

      const tableProps = $xeGrid.computeTableProps
      return h('div', {
        class: 'vxe-grid--table-wrapper'
      }, [
        h(VxeTableComponent, {
          key: 'table',
          props: tableProps,
          on: getTableOns($xeGrid),
          scopedSlots: slots,
          ref: 'refTable'
        })
      ])
    },
    renderBottom (h: CreateElement) {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots

      const bottomSlot = slots.bottom
      return bottomSlot
        ? h('div', {
          key: 'bottom',
          ref: 'refBottomWrapper',
          class: 'vxe-grid--bottom-wrapper'
        }, bottomSlot.call($xeGrid, { $grid: $xeGrid, $gantt: null }))
        : renderEmptyElement($xeGrid)
    },
    renderPager (h: CreateElement) {
      const VxeUIPagerComponent = VxeUI.getComponent('VxePager')

      const $xeGrid = this
      const props = $xeGrid
      const slots = $xeGrid.$scopedSlots
      const reactData = $xeGrid.reactData

      const { proxyConfig, pagerConfig } = props
      const proxyOpts = $xeGrid.computeProxyOpts
      const pagerOpts = $xeGrid.computePagerOpts
      const pagerSlot = slots.pager
      if ((pagerConfig && isEnableConf(pagerOpts)) || slots.pager) {
        return h('div', {
          ref: 'refPagerWrapper',
          key: 'pager',
          class: 'vxe-grid--pager-wrapper'
        }, pagerSlot
          ? pagerSlot.call($xeGrid, { $grid: $xeGrid, $gantt: null })
          : [
              VxeUIPagerComponent
                ? h(VxeUIPagerComponent, {
                  ref: 'refPager',
                  props: {
                    ...pagerOpts,
                    ...(proxyConfig && isEnableConf(proxyOpts) ? reactData.tablePage : {})
                  },
                  on: {
                    'page-change': $xeGrid.pageChangeEvent
                  },
                  scopedSlots: $xeGrid.getConfigSlot(pagerOpts.slots)
                })
                : renderEmptyElement($xeGrid)
            ])
      }
      return renderEmptyElement($xeGrid)
    },
    renderChildLayout (h: CreateElement, layoutKeys: VxeGridDefines.LayoutKey[]) {
      const $xeGrid = this

      const childVNs: VNode[] = []
      layoutKeys.forEach(key => {
        switch (key) {
          case 'Form':
            childVNs.push($xeGrid.renderForm(h))
            break
          case 'Toolbar':
            childVNs.push($xeGrid.renderToolbar(h))
            break
          case 'Top':
            childVNs.push($xeGrid.renderTop(h))
            break
          case 'Table':
            childVNs.push(
              h('div', {
                key: 'table',
                class: 'vxe-grid--table-container'
              }, [
                $xeGrid.renderTableLeft(h),
                $xeGrid.renderTable(h),
                $xeGrid.renderTableRight(h)
              ])
            )
            break
          case 'Bottom':
            childVNs.push($xeGrid.renderBottom(h))
            break
          case 'Pager':
            childVNs.push($xeGrid.renderPager(h))
            break
          default:
            errLog('vxe.error.notProp', [`[grid] layouts -> ${key}`])
            break
        }
      })
      return childVNs
    },
    renderLayout (h: CreateElement) {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots

      const currLayoutConf = $xeGrid.computeCurrLayoutConf
      const { headKeys, bodyKeys, footKeys } = currLayoutConf
      const asideLeftSlot = slots.asideLeft || slots['aside-left']
      const asideRightSlot = slots.asideRight || slots['aside-right']
      return [
        h('div', {
          class: 'vxe-grid--layout-header-wrapper'
        }, $xeGrid.renderChildLayout(h, headKeys)),
        h('div', {
          class: 'vxe-grid--layout-body-wrapper'
        }, [
          asideLeftSlot
            ? h('div', {
              class: 'vxe-grid--layout-aside-left-wrapper'
            }, asideLeftSlot({}))
            : renderEmptyElement($xeGrid),
          h('div', {
            class: 'vxe-grid--layout-body-content-wrapper'
          }, $xeGrid.renderChildLayout(h, bodyKeys)),
          asideRightSlot
            ? h('div', {
              class: 'vxe-grid--layout-aside-right-wrapper'
            }, asideRightSlot({}))
            : renderEmptyElement($xeGrid)
        ]),
        h('div', {
          class: 'vxe-grid--layout-footer-wrapper'
        }, $xeGrid.renderChildLayout(h, footKeys)),
        h('div', {
          ref: 'refPopupContainerElem'
        })
      ]
    },
    renderVN (h: CreateElement): VNode {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid.reactData

      const vSize = $xeGrid.computeSize
      const styles = $xeGrid.computeStyles
      const isLoading = $xeGrid.computeIsLoading
      return h('div', {
        ref: 'refElem',
        class: ['vxe-grid', {
          [`size--${vSize}`]: vSize,
          'is--animat': !!props.animat,
          'is--round': props.round,
          'is--maximize': reactData.isZMax,
          'is--loading': isLoading
        }],
        style: styles
      }, $xeGrid.renderLayout(h))
    }
  },
  created () {
    // 使用已安装的组件，如果未安装则不渲染
    const VxeUIFormComponent = VxeUI.getComponent('VxeForm')
    const VxeUIPagerComponent = VxeUI.getComponent('VxePager')

    const $xeGrid = this
    const props = $xeGrid

    const proxyOpts = $xeGrid.computeProxyOpts

    // const { data, formOpts, proxyOpts, proxyConfig } = this
    // if (proxyConfig && (data || (proxyOpts.form && formOpts.data))) {
    //   errLog('vxe.error.errConflicts', ['[grid] data', 'proxy-config'])
    // }

    if ((props as any).toolbar) {
      errLog('vxe.error.delProp', ['[grid] toolbar', 'toolbar-config'])
    }
    if (props.toolbarConfig && !XEUtils.isObject(props.toolbarConfig)) {
      errLog('vxe.error.errProp', [`[grid] toolbar-config=${props.toolbarConfig}`, 'toolbar-config={}'])
    }
    if (proxyOpts.props) {
      warnLog('vxe.error.delProp', ['[grid] proxy-config.props', 'proxy-config.response'])
    }

    $xeGrid.$nextTick(() => {
      if (props.formConfig) {
        if (!VxeUIFormComponent) {
          errLog('vxe.error.reqComp', ['vxe-form'])
        }
      }
      if (props.pagerConfig) {
        if (!VxeUIPagerComponent) {
          errLog('vxe.error.reqComp', ['vxe-pager'])
        }
      }
    })

    $xeGrid.initPages()
    globalEvents.on($xeGrid, 'keydown', $xeGrid.handleGlobalKeydownEvent)
  },
  mounted () {
    const $xeGrid = this
    const props = $xeGrid

    const { columns } = props
    if (columns && columns.length) {
      $xeGrid.loadColumn(columns)
    }
    $xeGrid.initToolbar()
    $xeGrid.initProxy()
  },
  beforeDestroy () {
    const $xeGrid = this
    const reactData = $xeGrid.reactData
    const internalData = $xeGrid.internalData

    globalEvents.off($xeGrid, 'keydown')

    XEUtils.assign(reactData, createReactData())
    XEUtils.assign(internalData, createInternalData())
  },
  render (this: any, h) {
    return this.renderVN(h)
  }
}) /* define-vxe-component end */
