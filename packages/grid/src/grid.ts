import { h, PropType, ref, Ref, computed, provide, reactive, onUnmounted, watch, nextTick, VNode, ComponentPublicInstance, onMounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getLastZIndex, nextZIndex, isEnableConf } from '../../ui/src/utils'
import { getOffsetHeight, getPaddingTopBottomSize, getDomNode, toCssUnit } from '../../ui/src/dom'
import { VxeUI } from '../../ui'
import VxeTableComponent from '../../table/src/table'
import VxeToolbarComponent from '../../toolbar/src/toolbar'
import tableComponentProps from '../../table/src/props'
import tableComponentEmits from '../../table/src/emits'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'

import type { ValueOf, VxeFormEvents, VxeFormInstance, VxePagerEvents, VxeFormItemProps, VxePagerInstance, VxeComponentStyleType } from 'vxe-pc-ui'
import type { VxeTableMethods, VxeGridConstructor, VxeGridEmits, GridReactData, VxeGridPropTypes, VxeToolbarPropTypes, GridMethods, GridPrivateMethods, VxeGridPrivateComputed, VxeGridPrivateMethods, VxeToolbarInstance, GridPrivateRef, VxeTableProps, VxeTableConstructor, VxeTablePrivateMethods, VxeTableEvents, VxeTableDefines, VxeTableEventProps, VxeGridProps } from '../../../types'

const { getConfig, getI18n, commands, hooks, useFns, createEvent, globalEvents, GLOBAL_EVENT_KEYS, renderEmptyElement } = VxeUI

const tableComponentPropKeys = Object.keys(tableComponentProps as any)

const tableComponentMethodKeys: (keyof VxeTableMethods)[] = ['clearAll', 'syncData', 'updateData', 'loadData', 'reloadData', 'reloadRow', 'loadColumn', 'reloadColumn', 'getRowNode', 'getColumnNode', 'getRowIndex', 'getVTRowIndex', 'getVMRowIndex', 'getColumnIndex', 'getVTColumnIndex', 'getVMColumnIndex', 'setRow', 'createData', 'createRow', 'revertData', 'clearData', 'isRemoveByRow', 'isInsertByRow', 'isUpdateByRow', 'getColumns', 'getColumnById', 'getColumnByField', 'getTableColumn', 'getFullColumns', 'getData', 'getCheckboxRecords', 'getParentRow', 'getTreeRowChildren', 'getTreeParentRow', 'getRowSeq', 'getRowById', 'getRowid', 'getTableData', 'getFullData', 'setColumnFixed', 'clearColumnFixed', 'setColumnWidth', 'getColumnWidth', 'setRowHeightConf', 'getRowHeightConf', 'setRowHeight', 'getRowHeight', 'hideColumn', 'showColumn', 'resetColumn', 'refreshColumn', 'refreshScroll', 'recalculate', 'closeTooltip', 'isAllCheckboxChecked', 'isAllCheckboxIndeterminate', 'getCheckboxIndeterminateRecords', 'setCheckboxRow', 'setCheckboxRowKey', 'isCheckedByCheckboxRow', 'isCheckedByCheckboxRowKey', 'isIndeterminateByCheckboxRow', 'isIndeterminateByCheckboxRowKey', 'toggleCheckboxRow', 'setAllCheckboxRow', 'getRadioReserveRecord', 'clearRadioReserve', 'getCheckboxReserveRecords', 'clearCheckboxReserve', 'toggleAllCheckboxRow', 'clearCheckboxRow', 'setCurrentRow', 'isCheckedByRadioRow', 'isCheckedByRadioRowKey', 'setRadioRow', 'setRadioRowKey', 'clearCurrentRow', 'clearRadioRow', 'getCurrentRecord', 'getRadioRecord', 'getCurrentColumn', 'setCurrentColumn', 'clearCurrentColumn', 'setPendingRow', 'togglePendingRow', 'hasPendingByRow', 'isPendingByRow', 'getPendingRecords', 'clearPendingRow', 'sort', 'setSort', 'clearSort', 'clearSortByEvent', 'isSort', 'getSortColumns', 'closeFilter', 'isFilter', 'clearFilterByEvent', 'isActiveFilterByColumn', 'isRowExpandLoaded', 'clearRowExpandLoaded', 'reloadRowExpand', 'reloadRowExpand', 'toggleRowExpand', 'setAllRowExpand', 'setRowExpand', 'isExpandByRow', 'isRowExpandByRow', 'clearRowExpand', 'clearRowExpandReserve', 'getRowExpandRecords', 'getTreeExpandRecords', 'isTreeExpandLoaded', 'clearTreeExpandLoaded', 'reloadTreeExpand', 'reloadTreeChilds', 'toggleTreeExpand', 'setAllTreeExpand', 'setTreeExpand', 'isTreeExpandByRow', 'clearTreeExpand', 'clearTreeExpandReserve', 'getScroll', 'scrollTo', 'scrollToRow', 'scrollToColumn', 'clearScroll', 'updateFooter', 'updateStatus', 'setMergeCells', 'removeInsertRow', 'removeMergeCells', 'getMergeCells', 'clearMergeCells', 'setMergeFooterItems', 'removeMergeFooterItems', 'getMergeFooterItems', 'clearMergeFooterItems', 'getCustomStoreData', 'setRowGroupExpand', 'setAllRowGroupExpand', 'clearRowGroupExpand', 'isRowGroupExpandByRow', 'isRowGroupRecord', 'isAggregateRecord', 'isAggregateExpandByRow', 'getAggregateContentByRow', 'getAggregateRowChildren', 'setRowGroups', 'clearRowGroups', 'openTooltip', 'moveColumnTo', 'moveRowTo', 'getCellLabel', 'getCellElement', 'focus', 'blur', 'connect']

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

export default defineVxeComponent({
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
    size: {
      type: String as PropType<VxeGridPropTypes.Size>,
      default: () => getConfig().grid.size || getConfig().size
    }
  },
  emits: gridComponentEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    // 使用已安装的组件，如果未安装则不渲染
    const VxeUIFormComponent = VxeUI.getComponent('VxeForm')
    const VxeUIPagerComponent = VxeUI.getComponent('VxePager')

    const defaultLayouts: VxeGridPropTypes.Layouts = [['Form'], ['Toolbar', 'Top', 'Table', 'Bottom', 'Pager']]

    const { computeSize } = useFns.useSize(props)

    const reactData = reactive<GridReactData>({
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
    })

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
      return XEUtils.merge({}, XEUtils.clone(getConfig().grid.proxyConfig, true), props.proxyConfig)
    })

    const computeIsRespMsg = computed(() => {
      const proxyOpts = computeProxyOpts.value
      return !!(XEUtils.isBoolean(proxyOpts.message) ? proxyOpts.message : proxyOpts.showResponseMsg)
    })

    const computeIsActiveMsg = computed(() => {
      const proxyOpts = computeProxyOpts.value
      return XEUtils.isBoolean(proxyOpts.showActionMsg) ? proxyOpts.showActionMsg : !!proxyOpts.showActiveMsg
    })

    const computePagerOpts = computed(() => {
      return Object.assign({}, getConfig().grid.pagerConfig, props.pagerConfig)
    })

    const computeFormOpts = computed(() => {
      return Object.assign({}, getConfig().grid.formConfig, props.formConfig)
    })

    const computeToolbarOpts = computed(() => {
      return Object.assign({}, getConfig().grid.toolbarConfig, props.toolbarConfig)
    })

    const computeZoomOpts = computed(() => {
      return Object.assign({}, getConfig().grid.zoomConfig, props.zoomConfig)
    })

    const computeStyles = computed(() => {
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
    })

    const computeTableExtendProps = computed(() => {
      const rest: any = {}
      const gridProps: any = props
      tableComponentPropKeys.forEach((key) => {
        rest[key] = gridProps[key]
      })
      return rest
    })

    const computeTableProps = computed(() => {
      const { seqConfig, pagerConfig, editConfig, proxyConfig } = props
      const { isZMax, tablePage } = reactData
      const tableExtendProps = computeTableExtendProps.value
      const proxyOpts = computeProxyOpts.value
      const pagerOpts = computePagerOpts.value
      const isLoading = computeIsLoading.value
      const tProps = Object.assign({}, tableExtendProps)
      if (isZMax) {
        if (tableExtendProps.maxHeight) {
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
    })

    const computeCurrLayoutConf = computed(() => {
      const { layouts } = props
      let confs: VxeGridPropTypes.Layouts = []
      if (layouts && layouts.length) {
        confs = layouts
      } else {
        confs = getConfig().grid.layouts || defaultLayouts
      }
      let headKeys: VxeGridPropTypes.LayoutKey[] = []
      let bodyKeys: VxeGridPropTypes.LayoutKey[] = []
      let footKeys: VxeGridPropTypes.LayoutKey[] = []
      if (confs.length) {
        if (XEUtils.isArray(confs[0])) {
          headKeys = confs[0] as VxeGridPropTypes.LayoutKey[]
          bodyKeys = (confs[1] || []) as VxeGridPropTypes.LayoutKey[]
          footKeys = (confs[2] || []) as VxeGridPropTypes.LayoutKey[]
        } else {
          bodyKeys = confs as VxeGridPropTypes.LayoutKey[]
        }
      }
      return {
        headKeys,
        bodyKeys,
        footKeys
      }
    })

    const computeCustomCurrentPageFlag = computed(() => {
      const pagerOpts = computePagerOpts.value
      return pagerOpts.currentPage
    })

    const computeCustomPageSizeFlag = computed(() => {
      const pagerOpts = computePagerOpts.value
      return pagerOpts.pageSize
    })

    const computeCustomTotalFlag = computed(() => {
      const pagerOpts = computePagerOpts.value
      return pagerOpts.total
    })

    const computeIsLoading = computed(() => {
      const { loading, proxyConfig } = props
      const { tableLoading } = reactData
      const proxyOpts = computeProxyOpts.value
      const { showLoading } = proxyOpts
      return loading || (tableLoading && showLoading && proxyConfig && isEnableConf(proxyOpts))
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

    const getFormData = () => {
      const { proxyConfig } = props
      const { formData } = reactData
      const proxyOpts = computeProxyOpts.value
      const formOpts = computeFormOpts.value
      return proxyConfig && isEnableConf(proxyOpts) && proxyOpts.form ? formData : formOpts.data
    }

    const initPages = (propKey?: 'currentPage' | 'pageSize' | 'total') => {
      const { tablePage } = reactData
      const { pagerConfig } = props
      const pagerOpts = computePagerOpts.value
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
            tablePage.pageSize = total
          }
        }
      }
    }

    const triggerPendingEvent = (code: string) => {
      const isActiveMsg = computeIsActiveMsg.value
      const $xeTable = refTable.value
      const selectRecords = $xeTable.getCheckboxRecords()
      if (selectRecords.length) {
        $xeTable.togglePendingRow(selectRecords)
        gridExtendTableMethods.clearCheckboxRow()
      } else {
        if (isActiveMsg) {
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
      const isActiveMsg = computeIsActiveMsg.value
      const selectRecords = gridExtendTableMethods.getCheckboxRecords()
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
    }

    const pageChangeEvent: VxePagerEvents.PageChange = (params) => {
      const { proxyConfig } = props
      const { tablePage } = reactData
      const { $event, currentPage, pageSize } = params
      const proxyOpts = computeProxyOpts.value
      tablePage.currentPage = currentPage
      tablePage.pageSize = pageSize
      $xeGrid.dispatchEvent('page-change', params, $event)
      if (proxyConfig && isEnableConf(proxyOpts)) {
        $xeGrid.commitProxy('query').then((rest) => {
          $xeGrid.dispatchEvent('proxy-query', rest, $event)
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
          $xeGrid.commitProxy('query').then((rest) => {
            $xeGrid.dispatchEvent('proxy-query', rest, params.$event)
          })
        }
      }
      $xeGrid.dispatchEvent('sort-change', params, params.$event)
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
          $xeGrid.commitProxy('query').then((rest) => {
            $xeGrid.dispatchEvent('proxy-query', rest, params.$event)
          })
        }
      }
      $xeGrid.dispatchEvent('filter-change', params, params.$event)
    }

    const submitFormEvent: VxeFormEvents.Submit = (params) => {
      const { proxyConfig } = props
      const proxyOpts = computeProxyOpts.value
      if (reactData.tableLoading) {
        return
      }
      if (proxyConfig && isEnableConf(proxyOpts)) {
        $xeGrid.commitProxy('reload').then((rest) => {
          $xeGrid.dispatchEvent('proxy-query', { ...rest, isReload: true }, params.$event)
        })
      }
      $xeGrid.dispatchEvent('form-submit', params, params.$event)
    }

    const resetFormEvent: VxeFormEvents.Reset = (params) => {
      const $xeTable = refTable.value
      const { proxyConfig } = props
      const { $event } = params
      const proxyOpts = computeProxyOpts.value
      if (proxyConfig && isEnableConf(proxyOpts)) {
        $xeTable.clearScroll()
        $xeGrid.commitProxy('reload').then((rest) => {
          $xeGrid.dispatchEvent('proxy-query', { ...rest, isReload: true }, $event)
        })
      }
      $xeGrid.dispatchEvent('form-reset', params, $event)
    }

    const submitInvalidEvent: VxeFormEvents.SubmitInvalid = (params) => {
      $xeGrid.dispatchEvent('form-submit-invalid', params, params.$event)
    }

    const collapseEvent: VxeFormEvents.Collapse = (params) => {
      const { $event } = params
      $xeGrid.dispatchEvent('form-toggle-collapse', params, $event)
      $xeGrid.dispatchEvent('form-collapse', params, $event)
    }

    const handleZoom = (isMax?: boolean) => {
      const { isZMax } = reactData
      if (isMax ? !isZMax : isZMax) {
        reactData.isZMax = !isZMax
        if (reactData.tZindex < getLastZIndex()) {
          reactData.tZindex = nextZIndex()
        }
      }
      return nextTick()
        .then(() => $xeGrid.recalculate(true))
        .then(() => {
          setTimeout(() => $xeGrid.recalculate(true), 15)
          return reactData.isZMax
        })
    }

    const getFuncSlot = (optSlots: any, slotKey: string) => {
      const funcSlot = optSlots[slotKey]
      if (funcSlot) {
        if (XEUtils.isString(funcSlot)) {
          if (slots[funcSlot]) {
            return slots[funcSlot]
          } else {
            errLog('vxe.error.notSlot', [funcSlot])
          }
        } else {
          return funcSlot
        }
      }
      return null
    }

    const getConfigSlot = (slotConfigs?: Record<string, any>) => {
      const slotConf: Record<string, any> = {}
      XEUtils.objectMap(slotConfigs, (slotFunc, slotKey) => {
        if (slotFunc) {
          if (XEUtils.isString(slotFunc)) {
            if (slots[slotFunc]) {
              slotConf[slotKey] = slots[slotFunc]
            } else {
              errLog('vxe.error.notSlot', [slotFunc])
            }
          } else {
            slotConf[slotKey] = slotFunc
          }
        }
      })
      return slotConf
    }

    /**
     * 渲染表单
     */
    const renderForm = () => {
      const { formConfig, proxyConfig } = props
      const { formData } = reactData
      const proxyOpts = computeProxyOpts.value
      const formOpts = computeFormOpts.value
      if ((formConfig && isEnableConf(formOpts)) || slots.form) {
        let slotVNs: VNode[] = []
        if (slots.form) {
          slotVNs = slots.form({ $grid: $xeGrid })
        } else {
          if (formOpts.items) {
            const formSlots: { [key: string]: () => VNode[] } = {}
            if (!(formOpts as any).inited) {
              (formOpts as any).inited = true
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
            if (VxeUIFormComponent) {
              slotVNs.push(
                h(VxeUIFormComponent, {
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
        }
        return h('div', {
          ref: refFormWrapper,
          key: 'form',
          class: 'vxe-grid--form-wrapper'
        }, slotVNs)
      }
      return renderEmptyElement($xeGrid)
    }

    /**
     * 渲染工具栏
     */
    const renderToolbar = () => {
      const { toolbarConfig } = props
      const toolbarOpts = computeToolbarOpts.value
      if ((toolbarConfig && isEnableConf(toolbarOpts)) || slots.toolbar) {
        let slotVNs: VNode[] = []
        if (slots.toolbar) {
          slotVNs = slots.toolbar({ $grid: $xeGrid })
        } else {
          const toolbarOptSlots = toolbarOpts.slots
          const toolbarSlots: {
            buttons?(params: any): any
            buttonPrefix?(params: any): any
            buttonSuffix?(params: any): any
            tools?(params: any): any
            toolPrefix?(params: any): any
            toolSuffix?(params: any): any
           } = {}
          if (toolbarOptSlots) {
            const buttonsSlot = getFuncSlot(toolbarOptSlots, 'buttons')
            const buttonPrefixSlot = getFuncSlot(toolbarOptSlots, 'buttonPrefix')
            const buttonSuffixSlot = getFuncSlot(toolbarOptSlots, 'buttonSuffix')
            const toolsSlot = getFuncSlot(toolbarOptSlots, 'tools')
            const toolPrefixSlot = getFuncSlot(toolbarOptSlots, 'toolPrefix')
            const toolSuffixSlot = getFuncSlot(toolbarOptSlots, 'toolSuffix')
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
          slotVNs.push(
            h(VxeToolbarComponent, {
              ref: refToolbar,
              ...toolbarOpts,
              slots: undefined
            }, toolbarSlots)
          )
        }
        return h('div', {
          ref: refToolbarWrapper,
          key: 'toolbar',
          class: 'vxe-grid--toolbar-wrapper'
        }, slotVNs)
      }
      return renderEmptyElement($xeGrid)
    }

    /**
     * 渲染表格顶部区域
     */
    const renderTop = () => {
      const topSlot = slots.top
      if (topSlot) {
        return h('div', {
          ref: refTopWrapper,
          key: 'top',
          class: 'vxe-grid--top-wrapper'
        }, topSlot({ $grid: $xeGrid }))
      }
      return renderEmptyElement($xeGrid)
    }

    const renderTableLeft = () => {
      const leftSlot = slots.left
      if (leftSlot) {
        return h('div', {
          class: 'vxe-grid--left-wrapper'
        }, leftSlot({ $grid: $xeGrid }))
      }
      return renderEmptyElement($xeGrid)
    }

    const renderTableRight = () => {
      const rightSlot = slots.right
      if (rightSlot) {
        return h('div', {
          class: 'vxe-grid--right-wrapper'
        }, rightSlot({ $grid: $xeGrid }))
      }
      return renderEmptyElement($xeGrid)
    }

    /**
     * 渲染表格
     */
    const renderTable = () => {
      const { proxyConfig } = props
      const tableProps = computeTableProps.value
      const proxyOpts = computeProxyOpts.value
      const tableOns = Object.assign({}, tableCompEvents)
      const emptySlot = slots.empty
      const loadingSlot = slots.loading
      const rowDragIconSlot = slots.rowDragIcon || slots['row-drag-icon']
      const columnDragIconSlot = slots.columnDragIcon || slots['column-drag-icon']
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
        rowDragIcon?(params: any): any
        columnDragIcon?(params: any): any
      } = {}
      if (emptySlot) {
        slotObj.empty = emptySlot
      }
      if (loadingSlot) {
        slotObj.loading = loadingSlot
      }
      if (rowDragIconSlot) {
        slotObj.rowDragIcon = rowDragIconSlot
      }
      if (columnDragIconSlot) {
        slotObj.columnDragIcon = columnDragIconSlot
      }
      return h('div', {
        class: 'vxe-grid--table-wrapper'
      }, [
        h(VxeTableComponent, {
          ref: refTable,
          ...tableProps,
          ...tableOns
        }, slotObj)
      ])
    }

    /**
     * 渲染表格底部区域
     */
    const renderBottom = () => {
      if (slots.bottom) {
        return h('div', {
          ref: refBottomWrapper,
          key: 'bottom',
          class: 'vxe-grid--bottom-wrapper'
        }, slots.bottom({ $grid: $xeGrid }))
      }
      return renderEmptyElement($xeGrid)
    }

    /**
     * 渲染分页
     */
    const renderPager = () => {
      const { proxyConfig, pagerConfig } = props
      const proxyOpts = computeProxyOpts.value
      const pagerOpts = computePagerOpts.value
      const pagerSlot = slots.pager
      if ((pagerConfig && isEnableConf(pagerOpts)) || slots.pager) {
        return h('div', {
          ref: refPagerWrapper,
          key: 'pager',
          class: 'vxe-grid--pager-wrapper'
        }, pagerSlot
          ? pagerSlot({ $grid: $xeGrid })
          : [
              VxeUIPagerComponent
                ? h(VxeUIPagerComponent, {
                  ref: refPager,
                  ...pagerOpts,
                  ...(proxyConfig && isEnableConf(proxyOpts) ? reactData.tablePage : {}),
                  onPageChange: pageChangeEvent
                }, getConfigSlot(pagerOpts.slots))
                : renderEmptyElement($xeGrid)
            ])
      }
      return renderEmptyElement($xeGrid)
    }

    const renderChildLayout = (layoutKeys: VxeGridPropTypes.LayoutKey[]) => {
      const childVNs: VNode[] = []
      layoutKeys.forEach(key => {
        switch (key) {
          case 'Form':
            childVNs.push(renderForm())
            break
          case 'Toolbar':
            childVNs.push(renderToolbar())
            break
          case 'Top':
            childVNs.push(renderTop())
            break
          case 'Table':
            childVNs.push(
              h('div', {
                key: 'table',
                class: 'vxe-grid--table-container'
              }, [
                renderTableLeft(),
                renderTable(),
                renderTableRight()
              ])
            )
            break
          case 'Bottom':
            childVNs.push(renderBottom())
            break
          case 'Pager':
            childVNs.push(renderPager())
            break
          default:
            errLog('vxe.error.notProp', [`layouts -> ${key}`])
            break
        }
      })
      return childVNs
    }

    const renderLayout = () => {
      const currLayoutConf = computeCurrLayoutConf.value
      const { headKeys, bodyKeys, footKeys } = currLayoutConf
      const asideLeftSlot = slots.asideLeft || slots['aside-left']
      const asideRightSlot = slots.asideRight || slots['aside-right']
      return [
        h('div', {
          class: 'vxe-grid--layout-header-wrapper'
        }, renderChildLayout(headKeys)),
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
          }, renderChildLayout(bodyKeys)),
          asideRightSlot
            ? h('div', {
              class: 'vxe-grid--layout-aside-right-wrapper'
            }, asideRightSlot({}))
            : renderEmptyElement($xeGrid)
        ]),
        h('div', {
          class: 'vxe-grid--layout-footer-wrapper'
        }, renderChildLayout(footKeys))
      ]
    }

    const tableCompEvents: VxeTableEventProps = {}
    tableComponentEmits.forEach(name => {
      const type = XEUtils.camelCase(`on-${name}`) as keyof VxeTableEventProps
      tableCompEvents[type] = (...args: any[]) => emit(name, ...args)
    })

    const getDefaultFormData = () => {
      const formOpts = computeFormOpts.value
      if (formOpts.items) {
        const fData: any = {}
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
            fData[field] = itemValue
          }
        })
        return fData
      }
      return {}
    }

    const initProxy = () => {
      const { proxyConfig, formConfig } = props
      const { proxyInited } = reactData
      const proxyOpts = computeProxyOpts.value
      const formOpts = computeFormOpts.value
      if (proxyConfig && isEnableConf(proxyOpts)) {
        if (formConfig && isEnableConf(formOpts) && proxyOpts.form && formOpts.items) {
          reactData.formData = getDefaultFormData()
        }
        if (!proxyInited) {
          reactData.proxyInited = true
          if (proxyOpts.autoLoad !== false) {
            nextTick().then(() => gridMethods.commitProxy('initial')).then((rest) => {
              gridMethods.dispatchEvent('proxy-query', { ...rest, isInited: true }, new Event('initial'))
            })
          }
        }
      }
    }

    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      const zoomOpts = computeZoomOpts.value
      const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
      if (isEsc && reactData.isZMax && zoomOpts.escRestore !== false) {
        $xeGrid.triggerZoomEvent(evnt)
      }
    }

    const dispatchEvent = (type: ValueOf<VxeGridEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $grid: $xeGrid }, params))
    }

    const gridMethods: GridMethods = {
      dispatchEvent,
      getEl () {
        return refElem.value
      },
      /**
       * 提交指令，支持 code 或 button
       * @param {String/Object} code 字符串或对象
       */
      commitProxy (proxyTarget: string | VxeToolbarPropTypes.ButtonConfig, ...args: any[]) {
        const { proxyConfig, toolbarConfig, pagerConfig, editRules, validConfig } = props
        const { tablePage } = reactData
        const isActiveMsg = computeIsActiveMsg.value
        const isRespMsg = computeIsRespMsg.value
        const proxyOpts = computeProxyOpts.value
        const pagerOpts = computePagerOpts.value
        const toolbarOpts = computeToolbarOpts.value
        const { beforeQuery, afterQuery, beforeDelete, afterDelete, beforeSave, afterSave, ajax = {} } = proxyOpts
        const resConfigs = proxyOpts.response || proxyOpts.props || {}
        const $xeTable = refTable.value
        let formData = getFormData()
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
            return $xeTable.insert({}).then(({ row }) => $xeTable.setEditRow(row, true))

            // 已废弃
          case 'insert_actived':
            return $xeTable.insert({}).then(({ row }) => $xeTable.setEditRow(row, true))
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
            return $xeTable.resetCustom(true)
          case 'initial':
          case 'reload':
          case 'query': {
            const ajaxMethods = ajax.query
            const querySuccessMethods = ajax.querySuccess
            const queryErrorMethods = ajax.queryError
            if (ajaxMethods) {
              const isInited = code === 'initial'
              const isReload = code === 'reload'
              if (!isInited && reactData.tableLoading) {
                return nextTick()
              }
              let sortList: any[] = []
              let filterList: VxeTableDefines.FilterCheckedParams[] = []
              let pageParams: any = {}
              if (pagerConfig) {
                if (isInited || isReload) {
                  // 重置分页
                  tablePage.currentPage = 1
                }
                if (isEnableConf(pagerOpts)) {
                  pageParams = { ...tablePage }
                }
              }
              if (isInited) {
                // 重置代理表单数据
                if (proxyConfig && isEnableConf(proxyOpts) && proxyOpts.form) {
                  formData = getDefaultFormData()
                  reactData.formData = formData
                }
                if ($xeTable) {
                  const tableInternalData = $xeTable.internalData
                  const { tableFullColumn, fullColumnFieldData } = tableInternalData
                  const { computeSortOpts } = $xeTable.getComputeMaps()
                  const sortOpts = computeSortOpts.value
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
                    $xeTable.clearAll()
                  } else {
                    sortList = $xeTable.getSortColumns()
                    filterList = $xeTable.getCheckedFilters()
                  }
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
              return Promise.resolve((beforeQuery || ajaxMethods)(commitParams, ...args))
                .then(rest => {
                  let tableData: any[] = []
                  reactData.tableLoading = false
                  if (rest) {
                    if (pagerConfig && isEnableConf(pagerOpts)) {
                      const totalProp = resConfigs.total
                      const total = (XEUtils.isFunction(totalProp) ? totalProp({ data: rest, $grid: $xeGrid }) : XEUtils.get(rest, totalProp || 'page.total')) || 0
                      tablePage.total = XEUtils.toNumber(total)
                      const resultProp = resConfigs.result
                      tableData = (XEUtils.isFunction(resultProp) ? resultProp({ data: rest, $grid: $xeGrid }) : XEUtils.get(rest, resultProp || 'result')) || []
                      // 检验当前页码，不能超出当前最大页数
                      const pageCount = Math.max(Math.ceil(total / tablePage.pageSize), 1)
                      if (tablePage.currentPage > pageCount) {
                        tablePage.currentPage = pageCount
                      }
                    } else {
                      const listProp = resConfigs.list
                      tableData = (listProp ? (XEUtils.isFunction(listProp) ? listProp({ data: rest, $grid: $xeGrid }) : XEUtils.get(rest, listProp)) : rest) || []
                    }
                  }
                  if ($xeTable as any) {
                    $xeTable.loadData(tableData)
                  } else {
                    nextTick(() => {
                      if ($xeTable) {
                        $xeTable.loadData(tableData)
                      }
                    })
                  }
                  if (afterQuery) {
                    afterQuery(commitParams, ...args)
                  }
                  if (querySuccessMethods) {
                    querySuccessMethods({ ...commitParams, response: rest })
                  }
                  return { status: true }
                }).catch((rest) => {
                  reactData.tableLoading = false
                  if (queryErrorMethods) {
                    queryErrorMethods({ ...commitParams, response: rest })
                  }
                  return { status: false }
                })
            } else {
              errLog('vxe.error.notFunc', ['proxy-config.ajax.query'])
            }
            break
          }
          case 'delete': {
            const ajaxMethods = ajax.delete
            const deleteSuccessMethods = ajax.deleteSuccess
            const deleteErrorMethods = ajax.deleteError
            if (ajaxMethods) {
              const selectRecords = gridExtendTableMethods.getCheckboxRecords()
              const removeRecords = selectRecords.filter(row => !$xeTable.isInsertByRow(row))
              const body = { removeRecords }
              const commitParams = { $grid: $xeGrid, code, button, body, form: formData, options: ajaxMethods }
              if (selectRecords.length) {
                return handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', () => {
                  if (!removeRecords.length) {
                    return $xeTable.remove(selectRecords)
                  }
                  reactData.tableLoading = true
                  return Promise.resolve((beforeDelete || ajaxMethods)(commitParams, ...args))
                    .then(rest => {
                      reactData.tableLoading = false
                      $xeTable.setPendingRow(removeRecords, false)
                      if (isRespMsg) {
                        if (VxeUI.modal) {
                          VxeUI.modal.message({ content: getRespMsg(rest, 'vxe.grid.delSuccess'), status: 'success' })
                        }
                      }
                      if (afterDelete) {
                        afterDelete(commitParams, ...args)
                      } else {
                        gridMethods.commitProxy('query')
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
                          VxeUI.modal.message({ id: code, content: getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
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
              errLog('vxe.error.notFunc', ['proxy-config.ajax.delete'])
            }
            break
          }
          case 'save': {
            const ajaxMethods = ajax.save
            const saveSuccessMethods = ajax.saveSuccess
            const saveErrorMethods = ajax.saveError
            if (ajaxMethods) {
              const body = $xeTable.getRecordset()
              const { insertRecords, removeRecords, updateRecords, pendingRecords } = body
              const commitParams = { $grid: $xeGrid, code, button, body, form: formData, options: ajaxMethods }
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
                  return Promise.resolve((beforeSave || ajaxMethods)(commitParams, ...args))
                    .then(rest => {
                      reactData.tableLoading = false
                      $xeTable.clearPendingRow()
                      if (isRespMsg) {
                        if (VxeUI.modal) {
                          VxeUI.modal.message({ content: getRespMsg(rest, 'vxe.grid.saveSuccess'), status: 'success' })
                        }
                      }
                      if (afterSave) {
                        afterSave(commitParams, ...args)
                      } else {
                        gridMethods.commitProxy('query')
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
                          VxeUI.modal.message({ id: code, content: getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
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
              errLog('vxe.error.notFunc', ['proxy-config.ajax.save'])
            }
            break
          }
          default: {
            const gCommandOpts = commands.get(code)
            if (gCommandOpts) {
              const tCommandMethod = gCommandOpts.tableCommandMethod || gCommandOpts.commandMethod
              if (tCommandMethod) {
                tCommandMethod({ code, button, $grid: $xeGrid, $table: $xeTable }, ...args)
              } else {
                errLog('vxe.error.notCommands', [code])
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
      getFormData,
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
            data: $xeTable ? $xeTable.getFullData() : [],
            filter: reactData.filterData,
            form: getFormData(),
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
        const { isZMax } = reactData
        const el = refElem.value
        if (el) {
          const formWrapper = refFormWrapper.value
          const toolbarWrapper = refToolbarWrapper.value
          const topWrapper = refTopWrapper.value
          const bottomWrapper = refBottomWrapper.value
          const pagerWrapper = refPagerWrapper.value
          const parentEl = el.parentElement as HTMLElement
          const parentPaddingSize = isZMax ? 0 : (parentEl ? getPaddingTopBottomSize(parentEl) : 0)
          return parentPaddingSize + getPaddingTopBottomSize(el) + getOffsetHeight(formWrapper) + getOffsetHeight(toolbarWrapper) + getOffsetHeight(topWrapper) + getOffsetHeight(bottomWrapper) + getOffsetHeight(pagerWrapper)
        }
        return 0
      },
      getParentHeight () {
        const el = refElem.value
        if (el) {
          const parentEl = el.parentElement as HTMLElement
          return (reactData.isZMax ? getDomNode().visibleHeight : (parentEl ? XEUtils.toNumber(getComputedStyle(parentEl).height) : 0)) - gridPrivateMethods.getExcludeHeight()
        }
        return 0
      },
      triggerToolbarCommitEvent (params, evnt) {
        const { code } = params
        return $xeGrid.commitProxy(params, evnt).then((rest) => {
          if (code && rest && rest.status && ['query', 'reload', 'delete', 'save'].includes(code)) {
            $xeGrid.dispatchEvent(code === 'delete' || code === 'save' ? `proxy-${code as 'delete' | 'save'}` : 'proxy-query', { ...rest, isReload: code === 'reload' }, evnt)
          }
        })
      },
      triggerToolbarBtnEvent (button, evnt) {
        $xeGrid.triggerToolbarCommitEvent(button, evnt)
        $xeGrid.dispatchEvent('toolbar-button-click', { code: button.code, button }, evnt)
      },
      triggerToolbarTolEvent (tool, evnt) {
        $xeGrid.triggerToolbarCommitEvent(tool, evnt)
        $xeGrid.dispatchEvent('toolbar-tool-click', { code: tool.code, tool }, evnt)
      },
      triggerZoomEvent (evnt) {
        $xeGrid.zoom()
        $xeGrid.dispatchEvent('zoom', { type: reactData.isZMax ? 'max' : 'revert' }, evnt)
      }
    }

    Object.assign($xeGrid, gridExtendTableMethods, gridMethods, gridPrivateMethods, {
      // 检查插槽
      loadColumn (columns: any[]) {
        const $xeTable = refTable.value
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
        if ($xeTable) {
          return $xeTable.loadColumn(columns)
        }
        return nextTick()
      },
      reloadColumn (columns: any[]) {
        $xeGrid.clearAll()
        return $xeGrid.loadColumn(columns)
      }
    })

    const renderVN = () => {
      const vSize = computeSize.value
      const styles = computeStyles.value
      const isLoading = computeIsLoading.value
      return h('div', {
        ref: refElem,
        class: ['vxe-grid', {
          [`size--${vSize}`]: vSize,
          'is--animat': !!props.animat,
          'is--round': props.round,
          'is--maximize': reactData.isZMax,
          'is--loading': isLoading
        }],
        style: styles
      }, renderLayout())
    }

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

    watch(computeCustomCurrentPageFlag, () => {
      initPages('currentPage')
    })

    watch(computeCustomPageSizeFlag, () => {
      initPages('pageSize')
    })

    watch(computeCustomTotalFlag, () => {
      initPages('total')
    })

    watch(() => props.proxyConfig, () => {
      initProxy()
    })

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
        const { columns } = props
        const proxyOpts = computeProxyOpts.value

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

        // const { data, columns, proxyConfig } = props
        // const formOpts = computeFormOpts.value
        // if (isEnableConf(proxyConfig) && (data || (proxyOpts.form && formOpts.data))) {
        //   errLog('vxe.error.errConflicts', ['grid.data', 'grid.proxy-config'])
        // }

        if (proxyOpts.props) {
          warnLog('vxe.error.delProp', ['proxy-config.props', 'proxy-config.response'])
        }

        if (columns && columns.length) {
          $xeGrid.loadColumn(columns)
        }
        initToolbar()
        initProxy()
      })
      globalEvents.on($xeGrid, 'keydown', handleGlobalKeydownEvent)
    })

    onUnmounted(() => {
      globalEvents.off($xeGrid, 'keydown')
    })

    $xeGrid.renderVN = renderVN

    provide('$xeGrid', $xeGrid)

    return $xeGrid
  },
  render () {
    return this.renderVN()
  }
})
