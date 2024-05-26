import { defineComponent, h, PropType, ref, Ref, computed, provide, resolveComponent, reactive, onUnmounted, watch, nextTick, VNode, ComponentPublicInstance, onMounted } from 'vue'
import XEUtils from 'xe-utils'
import { getLastZIndex, nextZIndex, isEnableConf } from '../../ui/src/utils'
import { getOffsetHeight, getPaddingTopBottomSize, getDomNode } from '../../ui/src/dom'
import { VxeUI, getConfig, getI18n, commands, hooks, log, createEvent, globalEvents, GLOBAL_EVENT_KEYS, useSize } from '@vxe-ui/core'
import VxeTableComponent from '../../table'
import VxeToolbarComponent from '../../toolbar'
import tableComponentProps from '../../table/src/props'
import tableComponentEmits from '../../table/src/emits'
import { getSlotVNs } from '../../ui/src/vn'

import type { VxePagerComponent, VxeFormComponent, VxeFormEvents, VxeFormInstance, VxePagerEvents, VxeFormItemProps, VxePagerInstance } from 'vxe-pc-ui'
import type { VxeTableMethods, VxeGridConstructor, VxeGridEmits, GridReactData, VxeGridPropTypes, VxeToolbarPropTypes, GridMethods, GridPrivateMethods, VxeGridPrivateComputed, VxeGridPrivateMethods, VxeToolbarInstance, GridPrivateRef, VxeTableProps, VxeTableConstructor, VxeTablePrivateMethods, VxeTableEvents, VxeTableDefines, VxeTableEventProps, VxeGridProps } from '../../../types'

const tableComponentPropKeys = Object.keys(tableComponentProps as any)

const tableComponentMethodKeys: (keyof VxeTableMethods)[] = ['clearAll', 'syncData', 'updateData', 'loadData', 'reloadData', 'reloadRow', 'loadColumn', 'reloadColumn', 'getRowNode', 'getColumnNode', 'getRowIndex', 'getVTRowIndex', 'getVMRowIndex', 'getColumnIndex', 'getVTColumnIndex', 'getVMColumnIndex', 'createData', 'createRow', 'revertData', 'clearData', 'isInsertByRow', 'isUpdateByRow', 'getColumns', 'getColumnById', 'getColumnByField', 'getTableColumn', 'getData', 'getCheckboxRecords', 'getParentRow', 'getRowSeq', 'getRowById', 'getRowid', 'getTableData', 'setColumnFixed', 'clearColumnFixed', 'setColumnWidth', 'getColumnWidth', 'hideColumn', 'showColumn', 'resetColumn', 'refreshColumn', 'refreshScroll', 'recalculate', 'closeTooltip', 'isAllCheckboxChecked', 'isAllCheckboxIndeterminate', 'getCheckboxIndeterminateRecords', 'setCheckboxRow', 'isCheckedByCheckboxRow', 'isIndeterminateByCheckboxRow', 'toggleCheckboxRow', 'setAllCheckboxRow', 'getRadioReserveRecord', 'clearRadioReserve', 'getCheckboxReserveRecords', 'clearCheckboxReserve', 'toggleAllCheckboxRow', 'clearCheckboxRow', 'setCurrentRow', 'isCheckedByRadioRow', 'setRadioRow', 'clearCurrentRow', 'clearRadioRow', 'getCurrentRecord', 'getRadioRecord', 'getCurrentColumn', 'setCurrentColumn', 'clearCurrentColumn', 'setPendingRow', 'togglePendingRow', 'getPendingRecords', 'clearPendingRow', 'sort', 'clearSort', 'isSort', 'getSortColumns', 'closeFilter', 'isFilter', 'isActiveFilterByColumn', 'isRowExpandLoaded', 'clearRowExpandLoaded', 'reloadRowExpand', 'reloadRowExpand', 'toggleRowExpand', 'setAllRowExpand', 'setRowExpand', 'isExpandByRow', 'isRowExpandByRow', 'clearRowExpand', 'clearRowExpandReserve', 'getRowExpandRecords', 'getTreeExpandRecords', 'isTreeExpandLoaded', 'clearTreeExpandLoaded', 'reloadTreeExpand', 'reloadTreeChilds', 'toggleTreeExpand', 'setAllTreeExpand', 'setTreeExpand', 'isTreeExpandByRow', 'clearTreeExpand', 'clearTreeExpandReserve', 'getScroll', 'scrollTo', 'scrollToRow', 'scrollToColumn', 'clearScroll', 'updateFooter', 'updateStatus', 'setMergeCells', 'removeInsertRow', 'removeMergeCells', 'getMergeCells', 'clearMergeCells', 'setMergeFooterItems', 'removeMergeFooterItems', 'getMergeFooterItems', 'clearMergeFooterItems', 'openTooltip', 'focus', 'blur', 'connect']

const gridComponentEmits: VxeGridEmits = [
  ...tableComponentEmits,
  'page-change',
  'form-submit',
  'form-submit-invalid',
  'form-reset',
  'form-collapse',
  'form-toggle-collapse',
  'proxy-query',
  'proxy-delete',
  'proxy-save',
  'toolbar-button-click',
  'toolbar-tool-click',
  'zoom'
]

export default defineComponent({
  name: 'VxeGrid',
  props: {
    ...tableComponentProps,
    layouts: Array as PropType<VxeGridPropTypes.Layouts>,
    columns: Array as PropType<VxeGridPropTypes.Columns<any>>,
    pagerConfig: Object as PropType<VxeGridPropTypes.PagerConfig>,
    proxyConfig: Object as PropType<VxeGridPropTypes.ProxyConfig<any>>,
    toolbarConfig: Object as PropType<VxeGridPropTypes.ToolbarConfig>,
    formConfig: Object as PropType<VxeGridPropTypes.FormConfig>,
    zoomConfig: Object as PropType<VxeGridPropTypes.ZoomConfig>,
    size: { type: String as PropType<VxeGridPropTypes.Size>, default: () => getConfig().grid.size || getConfig().size }
  },
  emits: gridComponentEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive({
      tableLoading: false,
      proxyInited: false,
      isZMax: false,
      tableData: [],
      filterData: [],
      formData: {},
      sortData: [],
      tZindex: 0,
      tablePage: {
        total: 0,
        pageSize: getConfig().pager?.pageSize || 10,
        currentPage: 1
      }
    } as GridReactData<any>)

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
          const $xeTable: any = refTable.value
          if ($xeTable && $xeTable[name]) {
            return $xeTable[name](...args)
          }
        }
      })
      return funcs
    }

    const gridExtendTableMethods = extendTableMethods(tableComponentMethodKeys) as VxeTableMethods

    tableComponentMethodKeys.forEach(name => {
      gridExtendTableMethods[name] = (...args: any[]) => {
        const $xeTable: any = refTable.value
        if ($xeTable && $xeTable[name]) {
          return $xeTable && $xeTable[name](...args)
        }
      }
    })

    const computeProxyOpts = computed(() => {
      return Object.assign({}, getConfig().grid.proxyConfig, props.proxyConfig) as VxeGridPropTypes.ProxyConfig
    })

    const computeIsMsg = computed(() => {
      const proxyOpts = computeProxyOpts.value
      return proxyOpts.message !== false
    })

    const computePagerOpts = computed(() => {
      return Object.assign({}, getConfig().grid.pagerConfig, props.pagerConfig) as VxeGridPropTypes.PagerConfig
    })

    const computeFormOpts = computed(() => {
      return Object.assign({}, getConfig().grid.formConfig, props.formConfig) as VxeGridPropTypes.FormOpts
    })

    const computeToolbarOpts = computed(() => {
      return Object.assign({}, getConfig().grid.toolbarConfig, props.toolbarConfig) as VxeGridPropTypes.ToolbarOpts
    })

    const computeZoomOpts = computed(() => {
      return Object.assign({}, getConfig().grid.zoomConfig, props.zoomConfig)
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

    const $xeGrid = {
      xID,
      props: props as VxeGridProps,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as VxeGridConstructor & VxeGridPrivateMethods

    const computeTableProps = computed(() => {
      const { seqConfig, pagerConfig, loading, editConfig, proxyConfig } = props
      const { isZMax, tableLoading, tablePage, tableData } = reactData
      const tableExtendProps = computeTableExtendProps.value
      const proxyOpts = computeProxyOpts.value
      const pagerOpts = computePagerOpts.value
      const tableProps = Object.assign({}, tableExtendProps)
      if (isZMax) {
        if (tableExtendProps.maxHeight) {
          tableProps.maxHeight = 'auto'
        } else {
          tableProps.height = 'auto'
        }
      }
      if (proxyConfig && isEnableConf(proxyOpts)) {
        tableProps.loading = loading || tableLoading
        tableProps.data = tableData
        if (pagerConfig && proxyOpts.seq && isEnableConf(pagerOpts)) {
          tableProps.seqConfig = Object.assign({}, seqConfig, { startIndex: (tablePage.currentPage - 1) * tablePage.pageSize })
        }
      }
      if (editConfig) {
        tableProps.editConfig = Object.assign({}, editConfig)
      }
      return tableProps
    })

    const initToolbar = () => {
      const toolbarOpts = computeToolbarOpts.value
      if (props.toolbarConfig && isEnableConf(toolbarOpts)) {
        nextTick(() => {
          const $xeTable = refTable.value
          const $xeToolbar = refToolbar.value
          if ($xeTable && $xeToolbar) {
            $xeTable.connect($xeToolbar)
          }
        })
      }
    }

    const initPages = () => {
      const { tablePage } = reactData
      const { pagerConfig } = props
      const pagerOpts = computePagerOpts.value
      const { currentPage, pageSize } = pagerOpts
      if (pagerConfig && isEnableConf(pagerOpts)) {
        if (currentPage) {
          tablePage.currentPage = currentPage
        }
        if (pageSize) {
          tablePage.pageSize = pageSize
        }
      }
    }

    const triggerPendingEvent = (code: string) => {
      const isMsg = computeIsMsg.value
      const $xeTable = refTable.value
      const selectRecords = $xeTable.getCheckboxRecords()
      if (selectRecords.length) {
        $xeTable.togglePendingRow(selectRecords)
        gridExtendTableMethods.clearCheckboxRow()
      } else {
        if (isMsg) {
          if (VxeUI.modal) {
            VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.selectOneRecord'), status: 'warning' })
          }
        }
      }
    }

    const getRespMsg = (rest: any, defaultMsg: string) => {
      const proxyOpts = computeProxyOpts.value
      const resConfigs = proxyOpts.response || proxyOpts.props || {}
      const messageProp = resConfigs.message
      let msg
      if (rest && messageProp) {
        msg = XEUtils.isFunction(messageProp) ? messageProp({ data: rest, $grid: $xeGrid }) : XEUtils.get(rest, messageProp)
      }
      return msg || getI18n(defaultMsg)
    }

    const handleDeleteRow = (code: string, alertKey: string, callback: () => void): Promise<void> => {
      const isMsg = computeIsMsg.value
      const selectRecords = gridExtendTableMethods.getCheckboxRecords()
      if (isMsg) {
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
    }

    const pageChangeEvent: VxePagerEvents.PageChange = (params) => {
      const { proxyConfig } = props
      const { tablePage } = reactData
      const { $event, currentPage, pageSize } = params
      const proxyOpts = computeProxyOpts.value
      tablePage.currentPage = currentPage
      tablePage.pageSize = pageSize
      gridMethods.dispatchEvent('page-change', params, $event)
      if (proxyConfig && isEnableConf(proxyOpts)) {
        gridMethods.commitProxy('query').then((rest) => {
          gridMethods.dispatchEvent('proxy-query', rest, $event)
        })
      }
    }

    const sortChangeEvent: VxeTableEvents.SortChange = (params) => {
      const $xeTable = refTable.value
      const { proxyConfig } = props
      const { computeSortOpts } = $xeTable.getComputeMaps()
      const proxyOpts = computeProxyOpts.value
      const sortOpts = computeSortOpts.value
      // 如果是服务端排序
      if (sortOpts.remote) {
        reactData.sortData = params.sortList
        if (proxyConfig && isEnableConf(proxyOpts)) {
          reactData.tablePage.currentPage = 1
          gridMethods.commitProxy('query').then((rest) => {
            gridMethods.dispatchEvent('proxy-query', rest, params.$event)
          })
        }
      }
      gridMethods.dispatchEvent('sort-change', params, params.$event)
    }

    const filterChangeEvent: VxeTableEvents.FilterChange = (params) => {
      const $xeTable = refTable.value
      const { proxyConfig } = props
      const { computeFilterOpts } = $xeTable.getComputeMaps()
      const proxyOpts = computeProxyOpts.value
      const filterOpts = computeFilterOpts.value
      // 如果是服务端过滤
      if (filterOpts.remote) {
        reactData.filterData = params.filterList
        if (proxyConfig && isEnableConf(proxyOpts)) {
          reactData.tablePage.currentPage = 1
          gridMethods.commitProxy('query').then((rest) => {
            gridMethods.dispatchEvent('proxy-query', rest, params.$event)
          })
        }
      }
      gridMethods.dispatchEvent('filter-change', params, params.$event)
    }

    const submitFormEvent: VxeFormEvents.Submit = (params) => {
      const { proxyConfig } = props
      const proxyOpts = computeProxyOpts.value
      if (proxyConfig && isEnableConf(proxyOpts)) {
        gridMethods.commitProxy('reload').then((rest) => {
          gridMethods.dispatchEvent('proxy-query', { ...rest, isReload: true }, params.$event)
        })
      }
      gridMethods.dispatchEvent('form-submit', params, params.$event)
    }

    const resetFormEvent: VxeFormEvents.Reset = (params) => {
      const { proxyConfig } = props
      const { $event } = params
      const proxyOpts = computeProxyOpts.value
      if (proxyConfig && isEnableConf(proxyOpts)) {
        gridMethods.commitProxy('reload').then((rest) => {
          gridMethods.dispatchEvent('proxy-query', { ...rest, isReload: true }, $event)
        })
      }
      gridMethods.dispatchEvent('form-reset', params, $event)
    }

    const submitInvalidEvent: VxeFormEvents.SubmitInvalid = (params) => {
      gridMethods.dispatchEvent('form-submit-invalid', params, params.$event)
    }

    const collapseEvent: VxeFormEvents.Collapse = (params) => {
      const { $event } = params
      nextTick(() => gridExtendTableMethods.recalculate(true))
      gridMethods.dispatchEvent('form-toggle-collapse', params, $event)
      gridMethods.dispatchEvent('form-collapse', params, $event)
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
            if (process.env.VUE_APP_VXE_ENV === 'development') {
              log.err('vxe.error.notSlot', [funcSlot])
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
      const restVNs: VNode[] = []
      if ((formConfig && isEnableConf(formOpts)) || slots.form) {
        let slotVNs: VNode[] = []
        if (slots.form) {
          slotVNs = slots.form({ $grid: $xeGrid })
        } else {
          if (formOpts.items) {
            const formSlots: { [key: string]: () => VNode[] } = {}
            if (!formOpts.inited) {
              formOpts.inited = true
              const beforeItem = proxyOpts.beforeItem
              if (proxyOpts && beforeItem) {
                formOpts.items.forEach((item) => {
                  beforeItem({ $grid: $xeGrid, item })
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
              h(resolveComponent('vxe-form') as VxeFormComponent, {
                ref: refForm,
                ...Object.assign({}, formOpts, {
                  data: proxyConfig && isEnableConf(proxyOpts) && proxyOpts.form ? formData : formOpts.data
                }),
                onSubmit: submitFormEvent,
                onReset: resetFormEvent,
                onSubmitInvalid: submitInvalidEvent,
                onCollapse: collapseEvent
              }, formSlots)
            )
          }
        }
        restVNs.push(
          h('div', {
            ref: refFormWrapper,
            key: 'form',
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
      const restVNs: VNode[] = []
      if ((toolbarConfig && isEnableConf(toolbarOpts)) || slots.toolbar) {
        let slotVNs: VNode[] = []
        if (slots.toolbar) {
          slotVNs = slots.toolbar({ $grid: $xeGrid })
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
            h(VxeToolbarComponent, {
              ref: refToolbar,
              ...toolbarOpts
            }, toolbarSlots)
          )
        }
        restVNs.push(
          h('div', {
            ref: refToolbarWrapper,
            key: 'toolbar',
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
            key: 'top',
            class: 'vxe-grid--top-wrapper'
          }, slots.top({ $grid: $xeGrid }))
        ]
      }
      return []
    }

    const defaultLayouts = ['Form', 'Toolbar', 'Top', 'Table', 'Bottom', 'Pager']

    const renderLayout = () => {
      const { layouts } = props
      const vns: any[] = []
      const currLayouts = (layouts && layouts.length ? layouts : (getConfig().grid.layouts || defaultLayouts))
      currLayouts.forEach(name => {
        switch (name) {
          case 'Form':
            vns.push(renderForms())
            break
          case 'Toolbar':
            vns.push(renderToolbars())
            break
          case 'Top':
            vns.push(renderTops())
            break
          case 'Table':
            vns.push(renderTables())
            break
          case 'Bottom':
            vns.push(renderBottoms())
            break
          case 'Pager':
            vns.push(renderPagers())
            break
          default:
            if (process.env.VUE_APP_VXE_ENV === 'development') {
              log.err('vxe.error.notProp', [`layouts -> ${name}`])
            }
            break
        }
      })
      return vns
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
      const loadingSlot = slots.loading
      if (proxyConfig && isEnableConf(proxyOpts)) {
        if (proxyOpts.sort) {
          tableOns.onSortChange = sortChangeEvent
        }
        if (proxyOpts.filter) {
          tableOns.onFilterChange = filterChangeEvent
        }
      }
      const slotObj: {
        empty?(params: any): any
        loading?(params: any): any
      } = {}
      if (emptySlot) {
        slotObj.empty = () => emptySlot({})
      }
      if (loadingSlot) {
        slotObj.loading = () => loadingSlot({})
      }
      return [
        h(VxeTableComponent, {
          ref: refTable,
          key: 'table',
          ...tableProps,
          ...tableOns
        }, slotObj)
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
            key: 'bottom',
            class: 'vxe-grid--bottom-wrapper'
          }, slots.bottom({ $grid: $xeGrid }))
        ]
      }
      return []
    }

    /**
     * 渲染分页
     */
    const renderPagers = () => {
      const { proxyConfig, pagerConfig } = props
      const proxyOpts = computeProxyOpts.value
      const pagerOpts = computePagerOpts.value
      const restVNs: VNode[] = []
      if ((pagerConfig && isEnableConf(pagerOpts)) || slots.pager) {
        let slotVNs: VNode[] = []
        if (slots.pager) {
          slotVNs = slots.pager({ $grid: $xeGrid })
        } else {
          const pagerOptSlots = pagerOpts.slots
          const pagerSlots: { [key: string]: () => VNode[] } = {}
          let leftSlot: any
          let rightSlot: any
          if (pagerOptSlots) {
            leftSlot = getFuncSlot(pagerOptSlots, 'left')
            rightSlot = getFuncSlot(pagerOptSlots, 'right')
            if (leftSlot) {
              pagerSlots.left = leftSlot
            }
            if (rightSlot) {
              pagerSlots.right = rightSlot
            }
          }
          slotVNs.push(
            h(resolveComponent('vxe-pager') as VxePagerComponent, {
              ref: refPager,
              ...pagerOpts,
              ...(proxyConfig && isEnableConf(proxyOpts) ? reactData.tablePage : {}),
              onPageChange: pageChangeEvent
            }, pagerSlots)
          )
        }
        restVNs.push(
          h('div', {
            ref: refPagerWrapper,
            key: 'pager',
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
      if (proxyConfig && isEnableConf(proxyOpts)) {
        if (formConfig && isEnableConf(formOpts) && proxyOpts.form && formOpts.items) {
          const formData: any = {}
          formOpts.items.forEach(item => {
            const { field, itemRender } = item
            if (field) {
              let itemValue: any = null
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
          reactData.formData = formData
        }
        if (!proxyInited) {
          reactData.proxyInited = true
          if (proxyOpts.autoLoad !== false) {
            nextTick().then(() => gridMethods.commitProxy('_init')).then((rest) => {
              gridMethods.dispatchEvent('proxy-query', { ...rest, isInited: true }, new Event('init'))
            })
          }
        }
      }
    }

    const gridMethods: GridMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, createEvent(evnt, { $grid: $xeGrid }, params))
      },
      /**
       * 提交指令，支持 code 或 button
       * @param {String/Object} code 字符串或对象
       */
      commitProxy (proxyTarget: string | VxeToolbarPropTypes.ButtonConfig, ...args: any[]) {
        const { toolbarConfig, pagerConfig, editRules, validConfig } = props
        const { tablePage, formData } = reactData
        const isMsg = computeIsMsg.value
        const proxyOpts = computeProxyOpts.value
        const pagerOpts = computePagerOpts.value
        const toolbarOpts = computeToolbarOpts.value
        const { beforeQuery, afterQuery, beforeDelete, afterDelete, beforeSave, afterSave, ajax = {} } = proxyOpts
        const resConfigs = proxyOpts.response || proxyOpts.props || {}
        const $xeTable = refTable.value
        let button: VxeToolbarPropTypes.ButtonConfig | null = null
        let code: string | null = null
        if (XEUtils.isString(proxyTarget)) {
          const { buttons } = toolbarOpts
          const matchObj = toolbarConfig && isEnableConf(toolbarOpts) && buttons ? XEUtils.findTree(buttons, (item) => item.code === proxyTarget, { children: 'dropdowns' }) : null
          button = matchObj ? matchObj.item : null
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
            return $xeTable.insert({}).then(({ row }) => $xeTable.setEditRow(row))

            // 已废弃
          case 'insert_actived':
            return $xeTable.insert({}).then(({ row }) => $xeTable.setEditRow(row))
            // 已废弃

          case 'mark_cancel':
            triggerPendingEvent(code)
            break
          case 'remove':
            return handleDeleteRow(code, 'vxe.grid.removeSelectRecord', () => $xeTable.removeCheckboxRow())
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
            return $xeTable.resetColumn(true)
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
                if (isEnableConf(pagerOpts)) {
                  pageParams = { ...tablePage }
                }
              }
              if (isInited) {
                const { computeSortOpts } = $xeTable.getComputeMaps()
                const sortOpts = computeSortOpts.value
                let defaultSort = sortOpts.defaultSort
                // 如果使用默认排序
                if (defaultSort) {
                  if (!XEUtils.isArray(defaultSort)) {
                    defaultSort = [defaultSort]
                  }
                  sortList = defaultSort.map((item: any) => {
                    return {
                      field: item.field,
                      property: item.field,
                      order: item.order
                    }
                  })
                }
                filterList = $xeTable.getCheckedFilters()
              } else {
                if (isReload) {
                  $xeTable.clearAll()
                } else {
                  sortList = $xeTable.getSortColumns()
                  filterList = $xeTable.getCheckedFilters()
                }
              }
              const commitParams = {
                code,
                button,
                isInited,
                isReload,
                $grid: $xeGrid,
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
              const applyArgs = [commitParams].concat(args)
              return Promise.resolve((beforeQuery || ajaxMethods)(...applyArgs))
                .then(rest => {
                  reactData.tableLoading = false
                  if (rest) {
                    if (pagerConfig && isEnableConf(pagerOpts)) {
                      const totalProp = resConfigs.total
                      const total = (XEUtils.isFunction(totalProp) ? totalProp({ data: rest, $grid: $xeGrid }) : XEUtils.get(rest, totalProp || 'page.total')) || 0
                      tablePage.total = XEUtils.toNumber(total)
                      const resultProp = resConfigs.result
                      reactData.tableData = (XEUtils.isFunction(resultProp) ? resultProp({ data: rest, $grid: $xeGrid }) : XEUtils.get(rest, resultProp || 'result')) || []
                      // 检验当前页码，不能超出当前最大页数
                      const pageCount = Math.max(Math.ceil(total / tablePage.pageSize), 1)
                      if (tablePage.currentPage > pageCount) {
                        tablePage.currentPage = pageCount
                      }
                    } else {
                      const listProp = resConfigs.list
                      reactData.tableData = (listProp ? (XEUtils.isFunction(listProp) ? listProp({ data: rest, $grid: $xeGrid }) : XEUtils.get(rest, listProp)) : rest) || []
                    }
                  } else {
                    reactData.tableData = []
                  }
                  if (afterQuery) {
                    afterQuery(...applyArgs)
                  }
                  return { status: true }
                }).catch(() => {
                  reactData.tableLoading = false
                  return { status: false }
                })
            } else {
              if (process.env.VUE_APP_VXE_ENV === 'development') {
                log.err('vxe.error.notFunc', ['proxy-config.ajax.query'])
              }
            }
            break
          }
          case 'delete': {
            const ajaxMethods = ajax.delete
            if (ajaxMethods) {
              const selectRecords = gridExtendTableMethods.getCheckboxRecords()
              const removeRecords = selectRecords.filter(row => !$xeTable.isInsertByRow(row))
              const body = { removeRecords }
              const commitParams = { $grid: $xeGrid, code, button, body, form: formData, options: ajaxMethods }
              const applyArgs = [commitParams].concat(args)
              if (selectRecords.length) {
                return handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', () => {
                  if (!removeRecords.length) {
                    return $xeTable.remove(selectRecords)
                  }
                  reactData.tableLoading = true
                  return Promise.resolve((beforeDelete || ajaxMethods)(...applyArgs))
                    .then(rest => {
                      reactData.tableLoading = false
                      $xeTable.setPendingRow(removeRecords, false)
                      if (isMsg) {
                        if (VxeUI.modal) {
                          VxeUI.modal.message({ content: getRespMsg(rest, 'vxe.grid.delSuccess'), status: 'success' })
                        }
                      }
                      if (afterDelete) {
                        afterDelete(...applyArgs)
                      } else {
                        gridMethods.commitProxy('query')
                      }
                      return { status: true }
                    })
                    .catch(rest => {
                      reactData.tableLoading = false
                      if (isMsg) {
                        if (VxeUI.modal) {
                          VxeUI.modal.message({ id: code, content: getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                        }
                      }
                      return { status: false }
                    })
                })
              } else {
                if (isMsg) {
                  if (VxeUI.modal) {
                    VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.selectOneRecord'), status: 'warning' })
                  }
                }
              }
            } else {
              if (process.env.VUE_APP_VXE_ENV === 'development') {
                log.err('vxe.error.notFunc', ['proxy-config.ajax.delete'])
              }
            }
            break
          }
          case 'save': {
            const ajaxMethods = ajax.save
            if (ajaxMethods) {
              const body = $xeTable.getRecordset()
              const { insertRecords, removeRecords, updateRecords, pendingRecords } = body
              const commitParams = { $grid: $xeGrid, code, button, body, form: formData, options: ajaxMethods }
              const applyArgs = [commitParams].concat(args)
              // 排除掉新增且标记为删除的数据
              if (insertRecords.length) {
                body.pendingRecords = pendingRecords.filter((row) => $xeTable.findRowIndexOf(insertRecords, row) === -1)
              }
              // 排除已标记为删除的数据
              if (pendingRecords.length) {
                body.insertRecords = insertRecords.filter((row) => $xeTable.findRowIndexOf(pendingRecords, row) === -1)
              }
              let restPromise: Promise<any> = Promise.resolve()
              if (editRules) {
                // 只校验新增和修改的数据
                restPromise = $xeTable[validConfig && validConfig.msgMode === 'full' ? 'fullValidate' : 'validate'](body.insertRecords.concat(updateRecords))
              }
              return restPromise.then((errMap) => {
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
                      if (isMsg) {
                        if (VxeUI.modal) {
                          VxeUI.modal.message({ content: getRespMsg(rest, 'vxe.grid.saveSuccess'), status: 'success' })
                        }
                      }
                      if (afterSave) {
                        afterSave(...applyArgs)
                      } else {
                        gridMethods.commitProxy('query')
                      }
                      return { status: true }
                    })
                    .catch(rest => {
                      reactData.tableLoading = false
                      if (isMsg) {
                        if (VxeUI.modal) {
                          VxeUI.modal.message({ id: code, content: getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                        }
                      }
                      return { status: false }
                    })
                } else {
                  if (isMsg) {
                    if (VxeUI.modal) {
                      VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.dataUnchanged'), status: 'info' })
                    }
                  }
                }
              })
            } else {
              if (process.env.VUE_APP_VXE_ENV === 'development') {
                log.err('vxe.error.notFunc', ['proxy-config.ajax.save'])
              }
            }
            break
          }
          default: {
            const gCommandOpts = commands.get(code)
            if (gCommandOpts) {
              if (gCommandOpts.commandMethod) {
                gCommandOpts.commandMethod({ code, button, $grid: $xeGrid, $table: $xeTable }, ...args)
              } else {
                if (process.env.VUE_APP_VXE_ENV === 'development') {
                  log.err('vxe.error.notCommands', [code])
                }
              }
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
        XEUtils.eachTree(formConfig && isEnableConf(formOpts) && items ? items : [], item => {
          itemList.push(item)
        }, { children: 'children' })
        return XEUtils.isUndefined(itemIndex) ? itemList : itemList[itemIndex]
      },
      getProxyInfo () {
        const $xeTable = refTable.value
        if (props.proxyConfig) {
          const { sortData } = reactData
          return {
            data: reactData.tableData,
            filter: reactData.filterData,
            form: reactData.formData,
            sort: sortData.length ? sortData[0] : {},
            sorts: sortData,
            pager: reactData.tablePage,
            pendingRecords: $xeTable ? $xeTable.getPendingRecords() : []
          }
        }
        return null
      }
      // setProxyInfo (options) {
      //   if (props.proxyConfig && options) {
      //     const { pager, form } = options
      //     const proxyOpts = computeProxyOpts.value
      //     if (pager) {
      //       if (pager.currentPage) {
      //         reactData.tablePage.currentPage = Number(pager.currentPage)
      //       }
      //       if (pager.pageSize) {
      //         reactData.tablePage.pageSize = Number(pager.pageSize)
      //       }
      //     }
      //     if (proxyOpts.form && form) {
      //       Object.assign(reactData.formData, form)
      //     }
      //   }
      //   return nextTick()
      // }
    }

    // 检查插槽
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      (gridMethods as any).loadColumn = (columns: any[]): Promise<any> => {
        const $xeTable = refTable.value
        XEUtils.eachTree(columns, (column) => {
          if (column.slots) {
            XEUtils.each(column.slots, (func) => {
              if (!XEUtils.isFunction(func)) {
                if (!slots[func]) {
                  log.err('vxe.error.notSlot', [func])
                }
              }
            })
          }
        })
        if ($xeTable) {
          return $xeTable.loadColumn(columns)
        }
        return nextTick()
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
            return getSlotVNs(slotFunc(params))
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
        if (el) {
          return (reactData.isZMax ? getDomNode().visibleHeight : XEUtils.toNumber(getComputedStyle(el.parentNode as HTMLElement).height)) - gridPrivateMethods.getExcludeHeight()
        }
        return 0
      },
      triggerToolbarCommitEvent (params, evnt) {
        const { code } = params
        return gridMethods.commitProxy(params, evnt).then((rest) => {
          if (code && rest && rest.status && ['query', 'reload', 'delete', 'save'].includes(code)) {
            gridMethods.dispatchEvent(code === 'delete' || code === 'save' ? `proxy-${code as 'delete' | 'save'}` : 'proxy-query', { ...rest, isReload: code === 'reload' }, evnt)
          }
        })
      },
      triggerToolbarBtnEvent (button, evnt) {
        gridPrivateMethods.triggerToolbarCommitEvent(button, evnt)
        gridMethods.dispatchEvent('toolbar-button-click', { code: button.code, button }, evnt)
      },
      triggerToolbarTolEvent (tool, evnt) {
        gridPrivateMethods.triggerToolbarCommitEvent(tool, evnt)
        gridMethods.dispatchEvent('toolbar-tool-click', { code: tool.code, tool }, evnt)
      },
      triggerZoomEvent (evnt) {
        gridMethods.zoom()
        gridMethods.dispatchEvent('zoom', { type: reactData.isZMax ? 'max' : 'revert' }, evnt)
      }
    }

    Object.assign($xeGrid, gridExtendTableMethods, gridMethods, gridPrivateMethods)

    const columnFlag = ref(0)
    watch(() => props.columns ? props.columns.length : -1, () => {
      columnFlag.value++
    })
    watch(() => props.columns, () => {
      columnFlag.value++
    })
    watch(columnFlag, () => {
      nextTick(() => $xeGrid.loadColumn(props.columns || []))
    })

    watch(() => props.toolbarConfig, () => {
      initToolbar()
    })

    watch(() => props.pagerConfig, () => {
      initPages()
    })

    watch(() => props.proxyConfig, () => {
      initProxy()
    })

    const handleGlobalKeydownEvent = (evnt: any) => {
      const zoomOpts = computeZoomOpts.value
      const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
      if (isEsc && reactData.isZMax && zoomOpts.escRestore !== false) {
        gridPrivateMethods.triggerZoomEvent(evnt)
      }
    }

    hooks.forEach((options) => {
      const { setupGrid } = options
      if (setupGrid) {
        const hookRest = setupGrid($xeGrid)
        if (hookRest && XEUtils.isObject(hookRest)) {
          Object.assign($xeGrid, hookRest)
        }
      }
    })

    initPages()

    onMounted(() => {
      nextTick(() => {
        const { data, columns, proxyConfig } = props
        const proxyOpts = computeProxyOpts.value
        const formOpts = computeFormOpts.value
        if (isEnableConf(proxyConfig) && (data || (proxyOpts.form && formOpts.data))) {
          log.err('vxe.error.errConflicts', ['grid.data', 'grid.proxy-config'])
        }

        // if (process.env.VUE_APP_VXE_ENV === 'development') {
        //   if (proxyOpts.props) {
        //     warnLog('vxe.error.delProp', ['proxy-config.props', 'proxy-config.response'])
        //   }
        // }

        if (columns && columns.length) {
          $xeGrid.loadColumn(columns)
        }
        initToolbar()
      })
      globalEvents.on($xeGrid, 'keydown', handleGlobalKeydownEvent)
    })

    onUnmounted(() => {
      globalEvents.off($xeGrid, 'keydown')
    })

    nextTick(() => {
      initProxy()
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
      }, renderLayout())
    }

    $xeGrid.renderVN = renderVN

    provide('$xeGrid', $xeGrid)

    return $xeGrid
  },
  render () {
    return this.renderVN()
  }
})
