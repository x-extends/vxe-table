import { defineComponent, h, PropType, ref, Ref, computed, provide, getCurrentInstance, resolveComponent, ComponentOptions, reactive, onUnmounted, watch, nextTick, VNode, ComponentPublicInstance } from 'vue'
import XEUtils from 'xe-utils'
import { errLog, getLastZIndex, nextZIndex, isEnableConf } from '../../tools/utils'
import { getOffsetHeight, getPaddingTopBottomSize, getDomNode } from '../../tools/dom'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { VXETable } from '../../v-x-e-table'
import tableComponentProps from '../../table/src/props'
import tableComponentEmits from '../../table/src/emits'
import { useSize } from '../../hooks/size'
import { GlobalEvent } from '../../tools/event'

import { TableMethods, VxeGridConstructor, VxeGridEmits, GridReactData, VxeGridPropTypes, VxeToolbarPropTypes, GridMethods, GridPrivateMethods, VxeGridPrivateComputed, VxeGridPrivateMethods, VxePagerInstance, VxeToolbarInstance, GridPrivateRef, VxeFormInstance, VxeTableProps, VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods, VxeTableEvents, VxePagerEvents, VxeFormEvents, VxeTableDefines, VxeTableEventProps, VxeFormItemProps } from '../../../types/all'

const tableComponentPropKeys = Object.keys(tableComponentProps as any)

const tableComponentMethodKeys: (keyof TableMethods)[] = ['clearAll', 'syncData', 'updateData', 'loadData', 'reloadData', 'reloadRow', 'loadColumn', 'reloadColumn', 'getRowNode', 'getColumnNode', 'getRowIndex', 'getVTRowIndex', 'getVMRowIndex', 'getColumnIndex', 'getVTColumnIndex', 'getVMColumnIndex', 'createData', 'createRow', 'revertData', 'clearData', 'isInsertByRow', 'isUpdateByRow', 'getColumns', 'getColumnById', 'getColumnByField', 'getTableColumn', 'getData', 'getCheckboxRecords', 'getRowById', 'getRowid', 'getTableData', 'hideColumn', 'showColumn', 'resetColumn', 'refreshColumn', 'refreshScroll', 'recalculate', 'closeTooltip', 'isAllCheckboxChecked', 'isCheckboxIndeterminate', 'getCheckboxIndeterminateRecords', 'setCheckboxRow', 'isCheckedByCheckboxRow', 'toggleCheckboxRow', 'setAllCheckboxRow', 'getRadioReserveRecord', 'clearRadioReserve', 'getCheckboxReserveRecords', 'clearCheckboxReserve', 'toggleAllCheckboxRow', 'clearCheckboxRow', 'setCurrentRow', 'isCheckedByRadioRow', 'setRadioRow', 'clearCurrentRow', 'clearRadioRow', 'getCurrentRecord', 'getRadioRecord', 'getCurrentColumn', 'setCurrentColumn', 'clearCurrentColumn', 'sort', 'clearSort', 'isSort', 'getSortColumns', 'closeFilter', 'isFilter', 'isRowExpandLoaded', 'clearRowExpandLoaded', 'reloadExpandContent', 'toggleRowExpand', 'setAllRowExpand', 'setRowExpand', 'isExpandByRow', 'clearRowExpand', 'clearRowExpandReserve', 'getRowExpandRecords', 'getTreeExpandRecords', 'isTreeExpandLoaded', 'clearTreeExpandLoaded', 'reloadTreeChilds', 'toggleTreeExpand', 'setAllTreeExpand', 'setTreeExpand', 'isTreeExpandByRow', 'clearTreeExpand', 'clearTreeExpandReserve', 'getScroll', 'scrollTo', 'scrollToRow', 'scrollToColumn', 'clearScroll', 'updateFooter', 'updateStatus', 'setMergeCells', 'removeMergeCells', 'getMergeCells', 'clearMergeCells', 'setMergeFooterItems', 'removeMergeFooterItems', 'getMergeFooterItems', 'clearMergeFooterItems', 'focus', 'blur', 'connect']

const gridComponentEmits: VxeGridEmits = [
  ...tableComponentEmits,
  'page-change',
  'form-submit',
  'form-submit-invalid',
  'form-reset',
  'form-toggle-collapse',
  'toolbar-button-click',
  'toolbar-tool-click',
  'zoom'
]

export default defineComponent({
  name: 'VxeGrid',
  props: {
    ...tableComponentProps,
    columns: Array as PropType<VxeGridPropTypes.Columns>,
    pagerConfig: Object as PropType<VxeGridPropTypes.PagerConfig>,
    proxyConfig: Object as PropType<VxeGridPropTypes.ProxyConfig>,
    toolbarConfig: Object as PropType<VxeGridPropTypes.ToolbarConfig>,
    formConfig: Object as PropType<VxeGridPropTypes.FormConfig>,
    zoomConfig: Object as PropType<VxeGridPropTypes.ZoomConfig>,
    size: { type: String as PropType<VxeGridPropTypes.Size>, default: () => GlobalConfig.grid.size || GlobalConfig.size }
  },
  emits: gridComponentEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const instance = getCurrentInstance()

    const computeSize = useSize(props)

    const reactData = reactive({
      tableLoading: false,
      proxyInited: false,
      isZMax: false,
      tableData: [],
      pendingRecords: [],
      filterData: [],
      formData: {},
      sortData: [],
      tZindex: 0,
      tablePage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    } as GridReactData)

    const refElem = ref() as Ref<HTMLDivElement>
    const refTable = ref() as Ref<ComponentPublicInstance<VxeTableProps, VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods>>
    const refForm = ref() as Ref<VxeFormInstance>
    const refToolbar = ref() as Ref<VxeToolbarInstance>
    const refPager = ref() as Ref<VxePagerInstance>

    const refFormWrapper = ref() as Ref<HTMLDivElement>
    const refToolbarWrapper = ref() as Ref<HTMLDivElement>
    const refTopWrapper = ref() as Ref<HTMLDivElement>
    const refBottomWrapper = ref() as Ref<HTMLDivElement>
    const refPagerWrapper = ref() as Ref<HTMLDivElement>

    const extendTableMethods = <T>(methodKeys: T[]) => {
      const funcs: any = {}
      methodKeys.forEach(name => {
        funcs[name] = (...args: any[]) => {
          const $xetable: any = refTable.value
          return $xetable && $xetable[name](...args)
        }
      })
      return funcs
    }

    const gridExtendTableMethods = extendTableMethods(tableComponentMethodKeys) as TableMethods

    tableComponentMethodKeys.forEach(name => {
      gridExtendTableMethods[name] = (...args: any[]) => {
        const $xetable: any = refTable.value
        return $xetable && $xetable[name](...args)
      }
    })

    const computeProxyOpts = computed(() => {
      return Object.assign({}, GlobalConfig.grid.proxyConfig, props.proxyConfig) as VxeGridPropTypes.ProxyConfig
    })

    const computeIsMsg = computed(() => {
      const proxyOpts = computeProxyOpts.value
      return proxyOpts.message !== false
    })

    const computePagerOpts = computed(() => {
      return Object.assign({}, GlobalConfig.grid.pagerConfig, props.pagerConfig) as VxeGridPropTypes.PagerConfig
    })

    const computeFormOpts = computed(() => {
      return Object.assign({}, GlobalConfig.grid.formConfig, props.formConfig) as VxeGridPropTypes.FormOpts
    })

    const computeToolbarOpts = computed(() => {
      return Object.assign({}, GlobalConfig.grid.toolbarConfig, props.toolbarConfig) as VxeGridPropTypes.ToolbarOpts
    })

    const computeZoomOpts = computed(() => {
      return Object.assign({}, GlobalConfig.grid.zoomConfig, props.zoomConfig)
    })

    const computeStyles = computed(() => {
      return reactData.isZMax ? { zIndex: reactData.tZindex } : null
    })

    const computeTableExtendProps = computed(() => {
      const rest: any = {}
      const gridProps: any = props
      tableComponentPropKeys.forEach((key) => {
        rest[key] = gridProps[key]
      })
      return rest
    })

    const refMaps: GridPrivateRef = {
      refElem,
      refTable,
      refForm,
      refToolbar,
      refPager
    }

    const computeMaps: VxeGridPrivateComputed = {
      computeProxyOpts,
      computePagerOpts,
      computeFormOpts,
      computeToolbarOpts,
      computeZoomOpts
    }

    const $xegrid = {
      xID,
      props,
      context,
      instance,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as VxeGridConstructor & VxeGridPrivateMethods

    let gridMethods = {} as GridMethods

    const handleRowClassName = (params: any) => {
      const { pendingRecords } = reactData
      const rowClassName = props.rowClassName
      const clss = []
      if (pendingRecords.some((item) => item === params.row)) {
        clss.push('row--pending')
      }
      clss.push(rowClassName ? (XEUtils.isFunction(rowClassName) ? rowClassName(params) : rowClassName) : '')
      return clss
    }

    const handleActiveMethod = (params: any) => {
      const { editConfig } = props
      const { pendingRecords } = reactData
      const $xetable = refTable.value
      const activeMethod = editConfig ? editConfig.activeMethod : null
      return $xetable.findRowIndexOf(pendingRecords, params.row) === -1 && (!activeMethod || activeMethod(params))
    }

    const computeTableProps = computed(() => {
      const { seqConfig, pagerConfig, loading, editConfig, proxyConfig } = props
      const { isZMax, tableLoading, tablePage, tableData } = reactData
      const tableExtendProps = computeTableExtendProps.value
      const proxyOpts = computeProxyOpts.value
      const tableProps = Object.assign({}, tableExtendProps)
      if (isZMax) {
        if (tableExtendProps.maxHeight) {
          tableProps.maxHeight = 'auto'
        } else {
          tableProps.height = 'auto'
        }
      }
      if (proxyConfig) {
        tableProps.loading = loading || tableLoading
        tableProps.data = tableData
        tableProps.rowClassName = handleRowClassName
        if (proxyOpts.seq && isEnableConf(pagerConfig)) {
          tableProps.seqConfig = Object.assign({}, seqConfig, { startIndex: (tablePage.currentPage - 1) * tablePage.pageSize })
        }
      }
      if (editConfig) {
        tableProps.editConfig = Object.assign({}, editConfig, { activeMethod: handleActiveMethod })
      }
      return tableProps
    })

    const initToolbar = () => {
      nextTick(() => {
        const $xetable = refTable.value
        const $xetoolbar = refToolbar.value
        if ($xetable && $xetoolbar) {
          $xetable.connect($xetoolbar)
        }
      })
    }

    const initPages = () => {
      const { pagerConfig } = props
      const { tablePage } = reactData
      const pagerOpts = computePagerOpts.value
      const { currentPage, pageSize } = pagerOpts
      if (pagerConfig) {
        if (currentPage) {
          tablePage.currentPage = currentPage
        }
        if (pageSize) {
          tablePage.pageSize = pageSize
        }
      }
    }

    const triggerPendingEvent = (code: string) => {
      const { pendingRecords } = reactData
      const isMsg = computeIsMsg.value
      const $xetable = refTable.value
      const selectRecords = $xetable.getCheckboxRecords()
      if (selectRecords.length) {
        const plus: any[] = []
        const minus: any[] = []
        selectRecords.forEach((data) => {
          if (pendingRecords.some((item) => data === item)) {
            minus.push(data)
          } else {
            plus.push(data)
          }
        })
        if (minus.length) {
          reactData.pendingRecords = pendingRecords.filter((item) => $xetable.findRowIndexOf(minus, item) === -1).concat(plus)
        } else if (plus.length) {
          reactData.pendingRecords = pendingRecords.concat(plus)
        }
        gridExtendTableMethods.clearCheckboxRow()
      } else {
        if (isMsg) {
          VXETable.modal.message({ id: code, content: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
        }
      }
    }

    const getRespMsg = (rest: any, defaultMsg: string) => {
      const proxyOpts = computeProxyOpts.value
      const { props: proxyProps = {} } = proxyOpts
      let msg
      if (rest && proxyProps.message) {
        msg = XEUtils.get(rest, proxyProps.message)
      }
      return msg || GlobalConfig.i18n(defaultMsg)
    }

    const handleDeleteRow = (code: string, alertKey: string, callback: () => void): Promise<void> => {
      const isMsg = computeIsMsg.value
      const selectRecords = gridExtendTableMethods.getCheckboxRecords()
      if (isMsg) {
        if (selectRecords.length) {
          return VXETable.modal.confirm({ id: `cfm_${code}`, content: GlobalConfig.i18n(alertKey), escClosable: true }).then((type) => {
            if (type === 'confirm') {
              callback()
            }
          })
        } else {
          VXETable.modal.message({ id: `msg_${code}`, content: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
        }
      } else {
        if (selectRecords.length) {
          callback()
        }
      }
      return Promise.resolve()
    }

    const pageChangeEvent: VxePagerEvents.PageChange = (params) => {
      const { proxyConfig } = props
      const { tablePage } = reactData
      const { currentPage, pageSize } = params
      tablePage.currentPage = currentPage
      tablePage.pageSize = pageSize
      gridMethods.dispatchEvent('page-change', params)
      if (proxyConfig) {
        gridMethods.commitProxy('query')
      }
    }

    const sortChangeEvent: VxeTableEvents.SortChange = (params) => {
      const $xetable = refTable.value
      const { proxyConfig } = props
      const { computeSortOpts } = $xetable.getComputeMaps()
      const sortOpts = computeSortOpts.value
      // 如果是服务端排序
      if (sortOpts.remote) {
        reactData.sortData = params.sortList
        if (proxyConfig) {
          reactData.tablePage.currentPage = 1
          gridMethods.commitProxy('query')
        }
      }
      gridMethods.dispatchEvent('sort-change', params)
    }

    const filterChangeEvent: VxeTableEvents.FilterChange = (params) => {
      const $xetable = refTable.value
      const { proxyConfig } = props
      const { computeFilterOpts } = $xetable.getComputeMaps()
      const filterOpts = computeFilterOpts.value
      // 如果是服务端过滤
      if (filterOpts.remote) {
        reactData.filterData = params.filterList
        if (proxyConfig) {
          reactData.tablePage.currentPage = 1
          gridMethods.commitProxy('query')
        }
      }
      gridMethods.dispatchEvent('filter-change', params)
    }

    const submitFormEvent: VxeFormEvents.Submit = (params) => {
      const { proxyConfig } = props
      if (proxyConfig) {
        gridMethods.commitProxy('reload')
      }
      gridMethods.dispatchEvent('form-submit', params)
    }

    const resetFormEvent: VxeFormEvents.Reset = (params) => {
      const { proxyConfig } = props
      if (proxyConfig) {
        gridMethods.commitProxy('reload')
      }
      gridMethods.dispatchEvent('form-reset', params)
    }

    const submitInvalidEvent: VxeFormEvents.SubmitInvalid = (params) => {
      gridMethods.dispatchEvent('form-submit-invalid', params)
    }

    const togglCollapseEvent: VxeFormEvents.ToggleCollapse = (params) => {
      nextTick(() => gridExtendTableMethods.recalculate(true))
      gridMethods.dispatchEvent('form-toggle-collapse', params)
    }

    const handleZoom = (isMax?: boolean) => {
      const { isZMax } = reactData
      if (isMax ? !isZMax : isZMax) {
        reactData.isZMax = !isZMax
        if (reactData.tZindex < getLastZIndex()) {
          reactData.tZindex = nextZIndex()
        }
      }
      return nextTick().then(() => gridExtendTableMethods.recalculate(true)).then(() => reactData.isZMax)
    }

    const getFuncSlot = (optSlots: any, slotKey: string) => {
      const funcSlot = optSlots[slotKey]
      if (funcSlot) {
        if (XEUtils.isString(funcSlot)) {
          if (slots[funcSlot]) {
            return slots[funcSlot]
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

    /**
     * 渲染表单
     */
    const renderForms = () => {
      const { formConfig, proxyConfig } = props
      const { formData } = reactData
      const proxyOpts = computeProxyOpts.value
      const formOpts = computeFormOpts.value
      const restVNs = []
      if (isEnableConf(formConfig) || slots.form) {
        let slotVNs = []
        if (slots.form) {
          slotVNs = slots.form({ $grid: $xegrid })
        } else {
          if (formOpts.items) {
            const formSlots: { [key: string]: () => VNode[] } = {}
            if (!formOpts.inited) {
              formOpts.inited = true
              const beforeItem = proxyOpts.beforeItem
              if (proxyOpts && beforeItem) {
                formOpts.items.forEach((item) => {
                  beforeItem({ $grid: $xegrid, item })
                })
              }
            }
            // 处理插槽
            formOpts.items.forEach((item) => {
              XEUtils.each(item.slots, (func) => {
                if (!XEUtils.isFunction(func)) {
                  if (slots[func]) {
                    formSlots[func] = slots[func] as any
                  }
                }
              })
            })
            slotVNs.push(
              h(resolveComponent('vxe-form') as ComponentOptions, {
                ref: refForm,
                ...Object.assign({}, formOpts, {
                  data: proxyConfig && proxyOpts.form ? formData : formOpts.data
                }),
                onSubmit: submitFormEvent,
                onReset: resetFormEvent,
                onSubmitInvalid: submitInvalidEvent,
                onToggleCollapse: togglCollapseEvent
              }, formSlots)
            )
          }
        }
        restVNs.push(
          h('div', {
            ref: refFormWrapper,
            class: 'vxe-grid--form-wrapper'
          }, slotVNs)
        )
      }
      return restVNs
    }

    /**
     * 渲染工具栏
     */
    const renderToolbars = () => {
      const { toolbarConfig } = props
      const toolbarOpts = computeToolbarOpts.value
      const restVNs = []
      if (isEnableConf(toolbarConfig) || slots.toolbar) {
        let slotVNs = []
        if (slots.toolbar) {
          slotVNs = slots.toolbar({ $grid: $xegrid })
        } else {
          const toolbarOptSlots = toolbarOpts.slots
          let buttonsSlot: any
          let toolsSlot: any
          const toolbarSlots: { [key: string]: () => VNode[] } = {}
          if (toolbarOptSlots) {
            buttonsSlot = getFuncSlot(toolbarOptSlots, 'buttons')
            toolsSlot = getFuncSlot(toolbarOptSlots, 'tools')
            if (buttonsSlot) {
              toolbarSlots.buttons = buttonsSlot
            }
            if (toolsSlot) {
              toolbarSlots.tools = toolsSlot
            }
          }
          slotVNs.push(
            h(resolveComponent('vxe-toolbar') as ComponentOptions, {
              ref: refToolbar,
              ...toolbarOpts
            }, toolbarSlots)
          )
        }
        restVNs.push(
          h('div', {
            ref: refToolbarWrapper,
            class: 'vxe-grid--toolbar-wrapper'
          }, slotVNs)
        )
      }
      return restVNs
    }

    /**
     * 渲染表格顶部区域
     */
    const renderTops = () => {
      if (slots.top) {
        return [
          h('div', {
            ref: refTopWrapper,
            class: 'vxe-grid--top-wrapper'
          }, slots.top({ $grid: $xegrid }))
        ]
      }
      return []
    }

    const tableCompEvents: VxeTableEventProps = {}
    tableComponentEmits.forEach(name => {
      const type = XEUtils.camelCase(`on-${name}`) as keyof VxeTableEventProps
      tableCompEvents[type] = (...args: any[]) => emit(name, ...args)
    })

    /**
     * 渲染表格
     */
    const renderTables = () => {
      const { proxyConfig } = props
      const tableProps = computeTableProps.value
      const proxyOpts = computeProxyOpts.value
      const tableOns = Object.assign({}, tableCompEvents)
      const emptySlot = slots.empty
      if (proxyConfig) {
        if (proxyOpts.sort) {
          tableOns.onSortChange = sortChangeEvent
        }
        if (proxyOpts.filter) {
          tableOns.onFilterChange = filterChangeEvent
        }
      }
      return [
        h(resolveComponent('vxe-table') as ComponentOptions, {
          ref: refTable,
          ...tableProps,
          ...tableOns
        }, emptySlot ? {
          empty: () => emptySlot({})
        } : {})
      ]
    }

    /**
     * 渲染表格底部区域
     */
    const renderBottoms = () => {
      if (slots.bottom) {
        return [
          h('div', {
            ref: refBottomWrapper,
            class: 'vxe-grid--bottom-wrapper'
          }, slots.bottom({ $grid: $xegrid }))
        ]
      }
      return []
    }

    /**
     * 渲染分页
     */
    const renderPagers = () => {
      const { pagerConfig } = props
      const pagerOpts = computePagerOpts.value
      const restVNs = []
      if (isEnableConf(pagerConfig) || slots.pager) {
        let slotVNs = []
        if (slots.pager) {
          slotVNs = slots.pager({ $grid: $xegrid })
        } else {
          const pagerOptSlots = pagerOpts.slots
          const pagerSlots: { [key: string]: () => VNode[] } = {}
          let leftSlot: any
          let rightSlot: any
          if (pagerOptSlots) {
            leftSlot = getFuncSlot(pagerOptSlots, 'left')
            rightSlot = getFuncSlot(pagerOptSlots, 'right')
            if (leftSlot) {
              pagerSlots.buttons = leftSlot
            }
            if (rightSlot) {
              pagerSlots.tools = rightSlot
            }
          }
          slotVNs.push(
            h(resolveComponent('vxe-pager') as ComponentOptions, {
              ref: refPager,
              ...pagerOpts,
              ...(props.proxyConfig ? reactData.tablePage : {}),
              onPageChange: pageChangeEvent
            }, pagerSlots)
          )
        }
        restVNs.push(
          h('div', {
            ref: refPagerWrapper,
            class: 'vxe-grid--pager-wrapper'
          }, slotVNs)
        )
      }
      return restVNs
    }

    const initProxy = () => {
      const { proxyConfig, formConfig } = props
      const { proxyInited } = reactData
      const proxyOpts = computeProxyOpts.value
      const formOpts = computeFormOpts.value
      if (proxyConfig) {
        if (isEnableConf(formConfig) && proxyOpts.form && formOpts.items) {
          const formData: any = {}
          formOpts.items.forEach(({ field, itemRender }) => {
            if (field) {
              formData[field] = itemRender && !XEUtils.isUndefined(itemRender.defaultValue) ? itemRender.defaultValue : undefined
            }
          })
          reactData.formData = formData
        }
        if (!proxyInited && proxyOpts.autoLoad !== false) {
          reactData.proxyInited = true
          nextTick(() => gridMethods.commitProxy('_init'))
        }
      }
    }

    gridMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $grid: $xegrid, $event: evnt }, params))
      },
      /**
       * 提交指令，支持 code 或 button
       * @param {String/Object} code 字符串或对象
       */
      commitProxy (proxyTarget: string | VxeToolbarPropTypes.ButtonConfig, ...args: any[]) {
        const { toolbarConfig, pagerConfig } = props
        const { tablePage, formData } = reactData
        const isMsg = computeIsMsg.value
        const proxyOpts = computeProxyOpts.value
        const toolbarOpts = computeToolbarOpts.value
        const { beforeQuery, afterQuery, beforeDelete, afterDelete, beforeSave, afterSave, ajax = {}, props: proxyProps = {} } = proxyOpts
        const $xetable = refTable.value
        let button: VxeToolbarPropTypes.ButtonConfig | null = null
        let code: string | null = null
        if (XEUtils.isString(proxyTarget)) {
          const { buttons } = toolbarOpts
          const matchObj = toolbarConfig && buttons ? XEUtils.findTree(buttons, (item) => item.code === proxyTarget, { children: 'dropdowns' }) : null
          button = matchObj ? matchObj.item : null
          code = proxyTarget
        } else {
          button = proxyTarget
          code = button.code as string
        }
        const btnParams = button ? button.params : null
        switch (code) {
          case 'insert':
            $xetable.insert({})
            break
          case 'insert_actived':
            $xetable.insert({}).then(({ row }) => $xetable.setActiveRow(row))
            break
          case 'mark_cancel':
            triggerPendingEvent(code)
            break
          case 'remove':
            return handleDeleteRow(code, 'vxe.grid.removeSelectRecord', () => $xetable.removeCheckboxRow())
          case 'import':
            $xetable.importData(btnParams)
            break
          case 'open_import':
            $xetable.openImport(btnParams)
            break
          case 'export':
            $xetable.exportData(btnParams)
            break
          case 'open_export':
            $xetable.openExport(btnParams)
            break
          case 'reset_custom':
            $xetable.resetColumn(true)
            break
          case '_init':
          case 'reload':
          case 'query': {
            const ajaxMethods = ajax.query
            if (ajaxMethods) {
              const isInited = code === '_init'
              const isReload = code === 'reload'
              let sortList: any[] = []
              let filterList: VxeTableDefines.FilterCheckedParams[] = []
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
                const { computeSortOpts } = $xetable.getComputeMaps()
                const sortOpts = computeSortOpts.value
                let defaultSort = sortOpts.defaultSort
                // 如果使用默认排序
                if (defaultSort) {
                  if (!XEUtils.isArray(defaultSort)) {
                    defaultSort = [defaultSort]
                  }
                  sortList = defaultSort.map((item) => {
                    return {
                      property: item.field,
                      order: item.order
                    }
                  })
                }
                filterList = $xetable.getCheckedFilters()
              } else {
                if (isReload) {
                  reactData.pendingRecords = []
                  $xetable.clearAll()
                } else {
                  sortList = $xetable.getSortColumns()
                  filterList = $xetable.getCheckedFilters()
                }
              }
              const params: any = {
                code,
                button,
                $grid: $xegrid,
                page: pageParams,
                sort: sortList.length ? sortList[0] : {},
                sorts: sortList,
                filters: filterList,
                form: formData,
                options: ajaxMethods
              }
              reactData.sortData = sortList
              reactData.filterData = filterList
              reactData.tableLoading = true
              const applyArgs = [params].concat(args)
              return Promise.resolve((beforeQuery || ajaxMethods)(...applyArgs))
                .catch(e => e)
                .then(rest => {
                  reactData.tableLoading = false
                  if (rest) {
                    if (isEnableConf(pagerConfig)) {
                      const total = XEUtils.get(rest, proxyProps.total || 'page.total') || 0
                      tablePage.total = total
                      reactData.tableData = XEUtils.get(rest, proxyProps.result || 'result') || []
                      // 检验当前页码，不能超出当前最大页数
                      const pageCount = Math.max(Math.ceil(total / tablePage.pageSize), 1)
                      if (tablePage.currentPage > pageCount) {
                        tablePage.currentPage = pageCount
                      }
                    } else {
                      reactData.tableData = (proxyProps.list ? XEUtils.get(rest, proxyProps.list) : rest) || []
                    }
                  } else {
                    reactData.tableData = []
                  }
                  if (afterQuery) {
                    afterQuery(...applyArgs)
                  }
                })
            } else {
              errLog('vxe.error.notFunc', ['query'])
            }
            break
          }
          case 'delete': {
            const ajaxMethods = ajax.delete
            if (ajaxMethods) {
              const removeRecords = gridExtendTableMethods.getCheckboxRecords()
              const body = { removeRecords }
              const applyArgs = [{ $grid: $xegrid, code, button, body, options: ajaxMethods }].concat(args)
              if (removeRecords.length) {
                return handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', () => {
                  reactData.tableLoading = true
                  return Promise.resolve((beforeDelete || ajaxMethods)(...applyArgs))
                    .then(rest => {
                      reactData.tableLoading = false
                      reactData.pendingRecords = reactData.pendingRecords.filter((row) => $xetable.findRowIndexOf(removeRecords, row) === -1)
                      if (isMsg) {
                        VXETable.modal.message({ content: getRespMsg(rest, 'vxe.grid.delSuccess'), status: 'success' })
                      }
                      if (afterDelete) {
                        afterDelete(...applyArgs)
                      } else {
                        gridMethods.commitProxy('query')
                      }
                    })
                    .catch(rest => {
                      reactData.tableLoading = false
                      if (isMsg) {
                        VXETable.modal.message({ id: code, content: getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                      }
                    })
                })
              } else {
                if (isMsg) {
                  VXETable.modal.message({ id: code, content: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
                }
              }
            } else {
              errLog('vxe.error.notFunc', [code])
            }
            break
          }
          case 'save': {
            const ajaxMethods = ajax.save
            if (ajaxMethods) {
              const body = Object.assign({ pendingRecords: reactData.pendingRecords }, $xetable.getRecordset())
              const { insertRecords, removeRecords, updateRecords, pendingRecords } = body
              const applyArgs = [{ $grid: $xegrid, code, button, body, options: ajaxMethods }].concat(args)
              // 排除掉新增且标记为删除的数据
              if (insertRecords.length) {
                body.pendingRecords = pendingRecords.filter((row) => $xetable.findRowIndexOf(insertRecords, row) === -1)
              }
              // 排除已标记为删除的数据
              if (pendingRecords.length) {
                body.insertRecords = insertRecords.filter((row) => $xetable.findRowIndexOf(pendingRecords, row) === -1)
              }
              // 只校验新增和修改的数据
              return $xetable.validate(body.insertRecords.concat(updateRecords)).then(() => {
                if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                  reactData.tableLoading = true
                  return Promise.resolve((beforeSave || ajaxMethods)(...applyArgs))
                    .then(rest => {
                      reactData.tableLoading = false
                      reactData.pendingRecords = []
                      if (isMsg) {
                        VXETable.modal.message({ content: getRespMsg(rest, 'vxe.grid.saveSuccess'), status: 'success' })
                      }
                      if (afterSave) {
                        afterSave(...applyArgs)
                      } else {
                        gridMethods.commitProxy('query')
                      }
                    })
                    .catch(rest => {
                      reactData.tableLoading = false
                      if (isMsg) {
                        VXETable.modal.message({ id: code, content: getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                      }
                    })
                } else {
                  if (isMsg) {
                    VXETable.modal.message({ id: code, content: GlobalConfig.i18n('vxe.grid.dataUnchanged'), status: 'info' })
                  }
                }
              }).catch((errMap: any) => errMap)
            } else {
              errLog('vxe.error.notFunc', [code])
            }
            break
          }
          default: {
            const btnMethod = VXETable.commands.get(code)
            if (btnMethod) {
              btnMethod({ code, button, $grid: $xegrid, $table: $xetable }, ...args)
            }
          }
        }
        return nextTick()
      },
      zoom () {
        if (reactData.isZMax) {
          return gridMethods.revert()
        }
        return gridMethods.maximize()
      },
      isMaximized () {
        return reactData.isZMax
      },
      maximize () {
        return handleZoom(true)
      },
      revert () {
        return handleZoom()
      },
      getFormItems (itemIndex?: number): any {
        const formOpts = computeFormOpts.value
        const { formConfig } = props
        const { items } = formOpts
        const itemList: VxeFormItemProps[] = []
        XEUtils.eachTree(isEnableConf(formConfig) && items ? items : [], item => {
          itemList.push(item)
        }, { children: 'children' })
        return XEUtils.isUndefined(itemIndex) ? itemList : itemList[itemIndex]
      },
      getPendingRecords () {
        return reactData.pendingRecords
      },
      getProxyInfo () {
        if (props.proxyConfig) {
          const { sortData } = reactData
          return {
            data: reactData.tableData,
            filter: reactData.filterData,
            form: reactData.formData,
            sort: sortData.length ? sortData[0] : {},
            sorts: sortData,
            pager: reactData.tablePage,
            pendingRecords: reactData.pendingRecords
          }
        }
        return null
      }
    }

    // 检查插槽
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      (gridMethods as any).loadColumn = (columns: any[]): Promise<any> => {
        const $xetable = refTable.value
        XEUtils.eachTree(columns, (column) => {
          if (column.slots) {
            XEUtils.each(column.slots, (func) => {
              if (!XEUtils.isFunction(func)) {
                if (!slots[func]) {
                  errLog('vxe.error.notSlot', [func])
                }
              }
            })
          }
        })
        return $xetable.loadColumn(columns)
      }
      (gridMethods as any).reloadColumn = (columns: any[]): Promise<any> => {
        gridExtendTableMethods.clearAll()
        return (gridMethods as any).loadColumn(columns)
      }
    }

    const gridPrivateMethods: GridPrivateMethods = {
      extendTableMethods,
      callSlot (slotFunc, params) {
        if (slotFunc) {
          if (XEUtils.isString(slotFunc)) {
            slotFunc = slots[slotFunc] || null
          }
          if (XEUtils.isFunction(slotFunc)) {
            return slotFunc(params)
          }
        }
        return []
      },
      /**
       * 获取需要排除的高度
       */
      getExcludeHeight () {
        const { height } = props
        const { isZMax } = reactData
        const el = refElem.value
        const formWrapper = refFormWrapper.value
        const toolbarWrapper = refToolbarWrapper.value
        const topWrapper = refTopWrapper.value
        const bottomWrapper = refBottomWrapper.value
        const pagerWrapper = refPagerWrapper.value
        const parentPaddingSize = isZMax || height !== 'auto' ? 0 : getPaddingTopBottomSize(el.parentNode as HTMLElement)
        return parentPaddingSize + getPaddingTopBottomSize(el) + getOffsetHeight(formWrapper) + getOffsetHeight(toolbarWrapper) + getOffsetHeight(topWrapper) + getOffsetHeight(bottomWrapper) + getOffsetHeight(pagerWrapper)
      },
      getParentHeight () {
        const el = refElem.value
        return (reactData.isZMax ? getDomNode().visibleHeight : XEUtils.toNumber(getComputedStyle(el.parentNode as HTMLElement).height)) - gridPrivateMethods.getExcludeHeight()
      },
      triggerToolbarBtnEvent (button, evnt) {
        gridMethods.commitProxy(button, evnt)
        gridMethods.dispatchEvent('toolbar-button-click', { code: button.code, button }, evnt)
      },
      triggerToolbarTolEvent (tool, evnt) {
        gridMethods.commitProxy(tool, evnt)
        gridMethods.dispatchEvent('toolbar-tool-click', { code: tool.code, tool, $event: evnt })
      },
      triggerZoomEvent (evnt) {
        gridMethods.zoom()
        gridMethods.dispatchEvent('zoom', { type: reactData.isZMax ? 'max' : 'revert' }, evnt)
      }
    }

    Object.assign($xegrid, gridExtendTableMethods, gridMethods, gridPrivateMethods)

    watch(() => props.columns, (value) => {
      nextTick(() => $xegrid.loadColumn(value || []))
    })

    watch(() => props.toolbarConfig, (value) => {
      if (value) {
        initToolbar()
      }
    })

    watch(() => props.proxyConfig, () => {
      initProxy()
    })

    watch(() => props.pagerConfig, () => {
      initPages()
    })

    const handleGlobalKeydownEvent = (evnt: any) => {
      const zoomOpts = computeZoomOpts.value
      const isEsc = evnt.keyCode === 27
      if (isEsc && reactData.isZMax && zoomOpts.escRestore !== false) {
        gridPrivateMethods.triggerZoomEvent(evnt)
      }
    }

    VXETable.hooks.forEach((options) => {
      const { setupGrid } = options
      if (setupGrid) {
        const hookRest = setupGrid($xegrid)
        if (hookRest && XEUtils.isObject(hookRest)) {
          Object.assign($xegrid, hookRest)
        }
      }
    })

    nextTick(() => {
      const { data, columns, proxyConfig } = props
      const proxyOpts = computeProxyOpts.value
      const formOpts = computeFormOpts.value
      if (proxyConfig && (data || (proxyOpts.form && formOpts.data))) {
        errLog('errConflicts', ['grid.data', 'grid.proxy-config'])
      }
      if (columns && columns.length) {
        $xegrid.loadColumn(columns)
      }
      initToolbar()
      initPages()
      initProxy()
      GlobalEvent.on($xegrid, 'keydown', handleGlobalKeydownEvent)
    })

    onUnmounted(() => {
      GlobalEvent.off($xegrid, 'keydown')
    })

    const renderVN = () => {
      const vSize = computeSize.value
      const styles = computeStyles.value
      return h('div', {
        ref: refElem,
        class: ['vxe-grid', {
          [`size--${vSize}`]: vSize,
          'is--animat': !!props.animat,
          'is--round': props.round,
          'is--maximize': reactData.isZMax,
          'is--loading': props.loading || reactData.tableLoading
        }],
        style: styles
      }, renderForms().concat(renderToolbars(), renderTops(), renderTables(), renderBottoms(), renderPagers()))
    }

    $xegrid.renderVN = renderVN

    provide('$xegrid', $xegrid)

    return $xegrid
  },
  render () {
    return this.renderVN()
  }
})
