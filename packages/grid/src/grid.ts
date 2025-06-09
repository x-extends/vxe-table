import { CreateElement, VNode } from 'vue'
import XEUtils from 'xe-utils'
import { getLastZIndex, nextZIndex, isEnableConf } from '../../ui/src/utils'
import { getOffsetHeight, getPaddingTopBottomSize, getDomNode, toCssUnit } from '../../ui/src/dom'
import { VxeUI } from '../../ui'
import VxeTableComponent from '../../table/src/table'
import VxeToolbarComponent from '../../toolbar/src/toolbar'
import tableComponentProps from '../../table/src/props'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'

import type { VxeFormComponent, VxePagerComponent, VxeComponentStyleType } from 'vxe-pc-ui'
import type{ GridReactData, VxeGridConstructor, VxeGridPropTypes, VxeGridPrivateMethods, VxePagerDefines, VxeTableConstructor, VxeTableDefines, VxeTablePrivateMethods } from '../../../types'

const { getConfig, getI18n, commands, globalEvents, globalMixins, renderEmptyElement } = VxeUI

const methods: any = {}
const propKeys = Object.keys(tableComponentProps)

const defaultLayouts: VxeGridPropTypes.Layouts = [['Form'], ['Toolbar', 'Top', 'Table', 'Bottom', 'Pager']]

function initPages ($xeGrid: VxeGridConstructor & VxeGridPrivateMethods, propKey?: 'currentPage' | 'pageSize' | 'total') {
  const props = $xeGrid
  const reactData = $xeGrid as unknown as GridReactData

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
        tablePage.pageSize = total
      }
    }
  }
}

function renderDefaultForm (h: CreateElement, $xeGrid: any) {
  const VxeUIFormComponent = VxeUI.getComponent<VxeFormComponent>('VxeForm')
  const props = $xeGrid
  const slots = $xeGrid.$scopedSlots

  const { proxyConfig, formConfig } = props
  const { proxyOpts, formData, formOpts } = $xeGrid
  if (isEnableConf(formConfig) && formOpts.items && formOpts.items.length) {
    const formSlots: any = {}
    if (!formOpts.inited) {
      formOpts.inited = true
      const beforeItem = proxyOpts.beforeItem
      if (proxyOpts && beforeItem) {
        formOpts.items.forEach((item: any) => {
          beforeItem.call($xeGrid, { $grid: $xeGrid, item })
        })
      }
    }
    // 处理插槽
    formOpts.items.forEach((item: any) => {
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
          props: Object.assign({}, formOpts, {
            data: proxyConfig && proxyOpts.form ? formData : formOpts.data
          }),
          on: {
            submit: $xeGrid.submitEvent,
            reset: $xeGrid.resetEvent,
            collapse: $xeGrid.collapseEvent,
            'submit-invalid': $xeGrid.submitInvalidEvent
          },
          scopedSlots: formSlots
        })
        : renderEmptyElement($xeGrid)
    ]
  }
  return []
}

function getFuncSlot ($xeGrid: VxeGridConstructor & VxeGridPrivateMethods, optSlots: any, slotKey: any) {
  const slots = $xeGrid.$scopedSlots

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

const getConfigSlot = ($xeGrid: VxeGridConstructor & VxeGridPrivateMethods, slotConfigs?: Record<string, any>) => {
  const slots = $xeGrid.$scopedSlots

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

function getToolbarSlots (_vm: any) {
  const { $scopedSlots, toolbarOpts } = _vm
  const toolbarOptSlots = toolbarOpts.slots
  let buttonsSlot
  let toolsSlot
  const slots: any = {}
  if ($scopedSlots.buttons && (!toolbarOptSlots || toolbarOptSlots.buttons !== 'buttons')) {
    warnLog('vxe.error.reqProp', ['toolbar-config.slots.buttons'])
  }
  if ($scopedSlots.tools && (!toolbarOptSlots || toolbarOptSlots.tools !== 'tools')) {
    warnLog('vxe.error.reqProp', ['toolbar-config.slots.tools'])
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
    }
    if (proxyOpts.filter) {
      ons['filter-change'] = _vm.filterChangeEvent
    }
  }
  return ons
}

function pageChangeEvent ($xeGrid: VxeGridConstructor & VxeGridPrivateMethods, params: VxePagerDefines.PageChangeEventParams) {
  const props = $xeGrid
  const reactData = $xeGrid as unknown as GridReactData

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
}

/**
 * 渲染表单
 */
function renderForm (h: CreateElement, _vm: any) {
  const { _e, $scopedSlots, formConfig } = _vm
  const formSlot = $scopedSlots.form
  const hasForm = !!(formSlot || isEnableConf(formConfig))

  if (hasForm) {
    return h('div', {
      key: 'form',
      ref: 'refFormWrapper',
      class: 'vxe-grid--form-wrapper'
    }, formSlot ? formSlot.call(_vm, { $grid: _vm }, h) : renderDefaultForm(h, _vm))
  }
  return _e()
}

/**
 * 渲染工具栏
 */
function renderToolbar (h: CreateElement, _vm: any) {
  const { _e, $scopedSlots, toolbarConfig, toolbar } = _vm
  const toolbarSlot = $scopedSlots.toolbar
  const hasToolbar = !!(toolbarSlot || isEnableConf(toolbarConfig) || toolbar)

  if (hasToolbar) {
    return h('div', {
      key: 'toolbar',
      ref: 'refToolbarWrapper',
      class: 'vxe-grid--toolbar-wrapper'
    }, toolbarSlot
      ? toolbarSlot.call(_vm, { $grid: _vm }, h)
      : [
          h(VxeToolbarComponent, {
            props: Object.assign({}, _vm.toolbarOpts, { slots: undefined }),
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
function renderTop (h: CreateElement, _vm: any) {
  const { _e, $scopedSlots } = _vm
  const topSlot = $scopedSlots.top

  return topSlot
    ? h('div', {
      key: 'top',
      ref: 'refTopWrapper',
      class: 'vxe-grid--top-wrapper'
    }, topSlot.call(_vm, { $grid: _vm }, h))
    : _e()
}

function renderTableLeft (h: CreateElement, _vm: any) {
  const { _e, $scopedSlots } = _vm
  const leftSlot = $scopedSlots.left
  if (leftSlot) {
    return h('div', {
      class: 'vxe-grid--left-wrapper'
    }, leftSlot({ $grid: _vm }))
  }
  return _e()
}

function renderTableRight (h: CreateElement, _vm: any) {
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
function renderTable (h: CreateElement, _vm: any) {
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
function renderBottom (h: CreateElement, _vm: any) {
  const { _e, $scopedSlots } = _vm
  const bottomSlot = $scopedSlots.bottom

  return bottomSlot
    ? h('div', {
      key: 'bottom',
      ref: 'refBottomWrapper',
      class: 'vxe-grid--bottom-wrapper'
    }, bottomSlot.call(_vm, { $grid: _vm }, h))
    : _e()
}

/**
 * 渲染分页
 */
function renderPager (h: CreateElement, $xeGrid: VxeGridConstructor & VxeGridPrivateMethods) {
  const VxeUIPagerComponent = VxeUI.getComponent<VxePagerComponent>('VxePager')
  const props = $xeGrid
  const slots = $xeGrid.$scopedSlots
  const reactData = $xeGrid as unknown as GridReactData

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
      ? pagerSlot.call($xeGrid, { $grid: $xeGrid })
      : [
          VxeUIPagerComponent
            ? h(VxeUIPagerComponent, {
              ref: 'refPager',
              props: {
                ...pagerOpts,
                ...(proxyConfig && isEnableConf(proxyOpts) ? reactData.tablePage : {})
              },
              on: {
                'page-change' (params: any) {
                  pageChangeEvent($xeGrid, params)
                }
              },
              scopedSlots: getConfigSlot($xeGrid, pagerOpts.slots)
            })
            : renderEmptyElement($xeGrid)
        ])
  }
  return renderEmptyElement($xeGrid)
}

function renderChildLayout (h: CreateElement, $xeGrid: VxeGridConstructor & VxeGridPrivateMethods, layoutKeys: VxeGridPropTypes.LayoutKey[]) {
  const childVNs: VNode[] = []
  layoutKeys.forEach(key => {
    switch (key) {
      case 'Form':
        childVNs.push(renderForm(h, $xeGrid))
        break
      case 'Toolbar':
        childVNs.push(renderToolbar(h, $xeGrid))
        break
      case 'Top':
        childVNs.push(renderTop(h, $xeGrid))
        break
      case 'Table':
        childVNs.push(
          h('div', {
            key: 'table',
            class: 'vxe-grid--table-container'
          }, [
            renderTableLeft(h, $xeGrid),
            renderTable(h, $xeGrid),
            renderTableRight(h, $xeGrid)
          ])
        )
        break
      case 'Bottom':
        childVNs.push(renderBottom(h, $xeGrid))
        break
      case 'Pager':
        childVNs.push(renderPager(h, $xeGrid))
        break
      default:
        errLog('vxe.error.notProp', [`layouts -> ${key}`])
        break
    }
  })
  return childVNs
}

function renderLayout (h: CreateElement, $xeGrid: VxeGridConstructor & VxeGridPrivateMethods) {
  const slots = $xeGrid.$scopedSlots

  const currLayoutConf = ($xeGrid as any).computeCurrLayoutConf as {
    headKeys: VxeGridPropTypes.LayoutKey[]
    bodyKeys: VxeGridPropTypes.LayoutKey[]
    footKeys: VxeGridPropTypes.LayoutKey[]
  }
  const { headKeys, bodyKeys, footKeys } = currLayoutConf
  const asideLeftSlot = slots.asideLeft || slots['aside-left']
  const asideRightSlot = slots.asideRight || slots['aside-right']
  return [
    h('div', {
      class: 'vxe-grid--layout-header-wrapper'
    }, renderChildLayout(h, $xeGrid, headKeys)),
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
      }, renderChildLayout(h, $xeGrid, bodyKeys)),
      asideRightSlot
        ? h('div', {
          class: 'vxe-grid--layout-aside-right-wrapper'
        }, asideRightSlot({}))
        : renderEmptyElement($xeGrid)
    ]),
    h('div', {
      class: 'vxe-grid--layout-footer-wrapper'
    }, renderChildLayout(h, $xeGrid, footKeys))
  ]
}

Object.keys(VxeTableComponent.methods).forEach((name: any) => {
  methods[name] = function (this: any, ...args: any[]) {
    return this.$refs.xTable && this.$refs.xTable[name](...args)
  }
})

export default {
  name: 'VxeGrid',
  mixins: [
    globalMixins.sizeMixin
  ],
  props: {
    ...tableComponentProps,
    layouts: Array,
    columns: Array,
    pagerConfig: [Boolean, Object],
    proxyConfig: Object,
    toolbar: [Boolean, Object],
    toolbarConfig: [Boolean, Object],
    formConfig: [Boolean, Object],
    zoomConfig: Object,
    size: { type: String, default: () => getConfig().grid.size || getConfig().size }
  },
  provide () {
    return {
      $xeGrid: this
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
        pageSize: getConfig().pager?.pageSize || 10,
        currentPage: 1
      }
    }
  },
  computed: {
    isRespMsg () {
      const { proxyOpts } = this
      return XEUtils.isBoolean(proxyOpts.message) ? proxyOpts.message : proxyOpts.showResponseMsg
    },
    isActiveMsg () {
      return this.proxyOpts.showActiveMsg
    },
    proxyOpts () {
      return this.computeProxyOpts
    },
    computeProxyOpts () {
      return XEUtils.merge({}, XEUtils.clone(getConfig().grid.proxyConfig, true), this.proxyConfig)
    },
    pagerOpts () {
      return this.computePagerOpts
    },
    computePagerOpts () {
      return Object.assign({}, getConfig().grid.pagerConfig, this.pagerConfig)
    },
    formOpts () {
      return this.computeFormOpts
    },
    computeFormOpts () {
      return Object.assign({}, getConfig().grid.formConfig, this.formConfig)
    },
    toolbarOpts () {
      return this.computeToolbarOpts
    },
    computeToolbarOpts () {
      return Object.assign({}, getConfig().grid.toolbarConfig, this.toolbarConfig || this.toolbar)
    },
    zoomOpts () {
      return this.computeZoomOpts
    },
    computeZoomOpts () {
      return Object.assign({}, getConfig().grid.zoomConfig, this.zoomConfig)
    },
    computeStyles () {
      const $xeGrid = this
      const props = $xeGrid
      const reactData = $xeGrid as GridReactData

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
    tableExtendProps () {
      const rest: any = {}
      propKeys.forEach(key => {
        rest[key] = this[key]
      })
      return rest
    },
    computeTableProps () {
      const { isZMax, seqConfig, pagerConfig, loading, editConfig, proxyConfig, proxyOpts, tableExtendProps, tableLoading, tablePage } = this
      const tProps = Object.assign({}, tableExtendProps)
      if (isZMax) {
        if (tableExtendProps.maxHeight) {
          tProps.maxHeight = '100%'
        } else {
          tProps.height = '100%'
        }
      }
      if (proxyConfig) {
        tProps.loading = loading || tableLoading
        if (proxyOpts.seq && isEnableConf(pagerConfig)) {
          tProps.seqConfig = Object.assign({}, seqConfig, { startIndex: (tablePage.currentPage - 1) * tablePage.pageSize })
        }
      }
      if (editConfig) {
        tProps.editConfig = Object.assign({}, editConfig)
      }
      return tProps
    },
    tableProps () {
      return this.computeTableProps
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
    },
    computeCustomCurrentPageFlag () {
      const $xeGrid = this

      const pagerOpts = $xeGrid.computePagerOpts
      return pagerOpts.currentPage
    },
    computeCustomPageSizeFlag () {
      const $xeGrid = this

      const pagerOpts = $xeGrid.computePagerOpts
      return pagerOpts.pageSize
    },
    computeCustomTotalFlag () {
      const $xeGrid = this

      const pagerOpts = $xeGrid.computePagerOpts
      return pagerOpts.total
    }
  } as any,
  watch: {
    columns (value: any) {
      this.$nextTick(() => this.loadColumn(value))
    },
    toolbar (value: any) {
      if (value) {
        this.initToolbar()
      }
    },
    toolbarConfig (value: any) {
      if (value) {
        this.initToolbar()
      }
    },
    proxyConfig () {
      this.initProxy()
    },
    computeCustomCurrentPageFlag () {
      const $xeGrid = this as VxeGridConstructor & VxeGridPrivateMethods

      initPages($xeGrid, 'currentPage')
    },
    computeCustomPageSizeFlag () {
      const $xeGrid = this as VxeGridConstructor & VxeGridPrivateMethods

      initPages($xeGrid, 'pageSize')
    },
    computeCustomTotalFlag () {
      const $xeGrid = this as VxeGridConstructor & VxeGridPrivateMethods

      initPages($xeGrid, 'total')
    }
  } as any,
  created (this: any) {
    const $xeGrid = this
    const props = $xeGrid

    // const { data, formOpts, proxyOpts, proxyConfig } = this
    // if (proxyConfig && (data || (proxyOpts.form && formOpts.data))) {
    //   errLog('vxe.error.errConflicts', ['grid.data', 'grid.proxy-config'])
    // }

    if (this.toolbar) {
      warnLog('vxe.error.delProp', ['grid.toolbar', 'grid.toolbar-config'])
    }
    if (this.toolbarConfig && !XEUtils.isObject(this.toolbarConfig)) {
      warnLog('vxe.error.errProp', [`grid.toolbar-config=${this.toolbarConfig}`, 'grid.toolbar-config={}'])
    }
    // if (proxyOpts.props) {
    //   warnLog('vxe.error.delProp', ['proxy-config.props', 'proxy-config.response'])
    // }

    // 使用已安装的组件，如果未安装则不渲染
    const VxeUIFormComponent = VxeUI.getComponent<VxeFormComponent>('VxeForm')
    const VxeUIPagerComponent = VxeUI.getComponent<VxePagerComponent>('VxePager')

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

    initPages($xeGrid)
    globalEvents.on(this, 'keydown', this.handleGlobalKeydownEvent)
  },
  mounted (this: any) {
    if (this.columns && this.columns.length) {
      this.loadColumn(this.columns)
    }
    this.initToolbar()
    this.initProxy()
  },
  destroyed (this: any) {
    globalEvents.off(this, 'keydown')
  },
  render (this: any, h: CreateElement) {
    const $xeGrid = this
    const props = $xeGrid
    const reactData = $xeGrid as GridReactData

    const vSize = $xeGrid.computeSize
    const styles = $xeGrid.computeStyles
    return h('div', {
      ref: 'refElem',
      class: ['vxe-grid', {
        [`size--${vSize}`]: vSize,
        'is--animat': !!this.animat,
        'is--round': this.round,
        'is--maximize': reactData.isZMax,
        'is--loading': props.loading || reactData.tableLoading
      }],
      style: styles
    }, renderLayout(h, $xeGrid))
  },
  methods: {
    ...methods,
    callSlot (slotFunc: any, params: any, h: any, vNodes: any) {
      const $xeGrid = this
      const slots = $xeGrid.$scopedSlots

      if (slotFunc) {
        if (XEUtils.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null
        }
        if (XEUtils.isFunction(slotFunc)) {
          return getSlotVNs(slotFunc.call(this, params, h, vNodes))
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
      const reactData = $xeGrid as GridReactData

      const { isZMax } = reactData
      const el = $xeGrid.$refs.refElem as HTMLDivElement
      if (el) {
        const formWrapper = $xeGrid.$refs.refFormWrapper as HTMLDivElement
        const toolbarWrapper = $xeGrid.$refs.refToolbarWrapper as HTMLDivElement
        const topWrapper = $xeGrid.$refs.refTopWrapper as HTMLDivElement
        const bottomWrapper = $xeGrid.$refs.refBottomWrapper as HTMLDivElement
        const pagerWrapper = $xeGrid.$refs.refPagerWrapper as HTMLDivElement
        const parentEl = el.parentElement as HTMLElement
        const parentPaddingSize = isZMax ? 0 : (parentEl ? getPaddingTopBottomSize(parentEl) : 0)
        return parentPaddingSize + getPaddingTopBottomSize(el) + getOffsetHeight(formWrapper) + getOffsetHeight(toolbarWrapper) + getOffsetHeight(topWrapper) + getOffsetHeight(bottomWrapper) + getOffsetHeight(pagerWrapper)
      }
      return 0
    },
    getParentHeight () {
      const $xeGrid = this as VxeGridConstructor & VxeGridPrivateMethods
      const reactData = $xeGrid as unknown as GridReactData

      const el = $xeGrid.$refs.refElem as HTMLDivElement
      if (el) {
        const parentEl = el.parentElement as HTMLElement
        return (reactData.isZMax ? getDomNode().visibleHeight : (parentEl ? XEUtils.toNumber(getComputedStyle(parentEl).height) : 0)) - $xeGrid.getExcludeHeight()
      }
      return 0
    },
    initToolbar () {
      this.$nextTick(() => {
        const { xTable, xToolbar } = this.$refs
        if (xTable && xToolbar) {
          xTable.connect(xToolbar)
        }
      })
    },
    initProxy () {
      const { proxyInited, proxyConfig, proxyOpts, formConfig, formOpts } = this
      if (proxyConfig) {
        if (isEnableConf(formConfig) && proxyOpts.form && formOpts.items) {
          const fData: any = {}
          formOpts.items.forEach((item: any) => {
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
              fData[field] = itemValue
            }
          })
          this.formData = fData
        }
        if (!proxyInited && proxyOpts.autoLoad !== false) {
          this.proxyInited = true
          this.$nextTick().then(() => this.commitProxy('_init')).then((rest: any) => {
            this.$emit('proxy-query', { ...rest, isInited: true, $grid: this, $event: new Event('init') })
          })
        }
      }
    },
    handleGlobalKeydownEvent (evnt: any) {
      const isEsc = evnt.keyCode === 27
      if (isEsc && this.isZMax && this.zoomOpts.escRestore !== false) {
        this.triggerZoomEvent(evnt)
      }
    },
    /**
     * 提交指令，支持 code 或 button
     * @param {String/Object} code 字符串或对象
     */
    commitProxy (proxyTarget: any, ...args: any[]) {
      const $xeGrid = this as VxeGridConstructor & VxeGridPrivateMethods
      const reactData = $xeGrid as unknown as GridReactData

      const { $refs, toolbar, toolbarConfig, toolbarOpts, proxyOpts, tablePage, pagerConfig, editRules, isRespMsg, isActiveMsg, validConfig, pagerOpts } = this
      const { beforeQuery, afterQuery, beforeDelete, afterDelete, beforeSave, afterSave, ajax = {} } = proxyOpts
      const resConfigs = proxyOpts.response || proxyOpts.props || {}
      const $xeTable = $refs.xTable as VxeTableConstructor & VxeTablePrivateMethods
      const formData = this.getFormData()
      let button: any
      let code: string
      if (XEUtils.isString(proxyTarget)) {
        const matchObj = toolbarConfig || toolbar ? XEUtils.findTree(toolbarOpts.buttons, (item: any) => item.code === proxyTarget, { children: 'dropdowns' }) : null
        code = proxyTarget
        button = matchObj ? matchObj.item : null
      } else {
        button = proxyTarget
        code = button.code
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
          this.triggerPendingEvent(code)
          break
        case 'remove':
          return this.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', () => this.removeCheckboxRow())
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
        case '_init':
        case 'reload':
        case 'query': {
          const ajaxMethods = ajax.query
          const querySuccessMethods = ajax.querySuccess
          const queryErrorMethods = ajax.queryError
          if (ajaxMethods) {
            const isInited = code === '_init'
            const isReload = code === 'reload'
            if (!isInited && reactData.tableLoading) {
              return $xeGrid.$nextTick()
            }
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
              let defaultSort = null
              if ($xeTable) {
                const { sortOpts } = $xeTable
                defaultSort = sortOpts.defaultSort
              }
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
              if ($xeTable) {
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
            const applyArgs = [commitParams].concat(args)
            return Promise.resolve((beforeQuery || ajaxMethods)(...applyArgs))
              .then(rest => {
                let tableData: any[] = []
                this.tableLoading = false
                if (rest) {
                  if (pagerConfig && isEnableConf(pagerOpts)) {
                    const totalProp = resConfigs.total
                    const total = (XEUtils.isFunction(totalProp) ? totalProp({ data: rest, $grid: this }) : XEUtils.get(rest, totalProp || 'page.total')) || 0
                    tablePage.total = XEUtils.toNumber(total)
                    const resultProp = resConfigs.result
                    tableData = (XEUtils.isFunction(resultProp) ? resultProp({ data: rest, $grid: this }) : XEUtils.get(rest, resultProp || 'result')) || []
                    // 检验当前页码，不能超出当前最大页数
                    const pageCount = Math.max(Math.ceil(total / tablePage.pageSize), 1)
                    if (tablePage.currentPage > pageCount) {
                      tablePage.currentPage = pageCount
                    }
                  } else {
                    const listProp = resConfigs.list
                    tableData = (listProp ? (XEUtils.isFunction(listProp) ? listProp({ data: rest, $grid: this }) : XEUtils.get(rest, listProp)) : rest) || []
                  }
                }
                if ($xeTable as any) {
                  $xeTable.loadData(tableData)
                } else {
                  $xeTable.$nextTick(() => {
                    if ($xeTable) {
                      $xeTable.loadData(tableData)
                    }
                  })
                }
                if (afterQuery) {
                  afterQuery(...applyArgs)
                }
                if (querySuccessMethods) {
                  querySuccessMethods({ ...commitParams, response: rest })
                }
                return { status: true }
              }).catch((rest) => {
                this.tableLoading = false
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
            const selectRecords = $xeTable.getCheckboxRecords()
            const removeRecords = selectRecords.filter((row) => !$xeTable.isInsertByRow(row))
            const body = { removeRecords }
            const commitParams = { $grid: this, code, button, body, form: formData, options: ajaxMethods }
            const applyArgs = [commitParams].concat(args)
            if (selectRecords.length) {
              return this.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', () => {
                if (!removeRecords.length) {
                  return $xeTable.remove(selectRecords)
                }
                this.tableLoading = true
                return Promise.resolve((beforeDelete || ajaxMethods)(...applyArgs))
                  .then(rest => {
                    this.tableLoading = false
                    $xeTable.setPendingRow(removeRecords, false)
                    if (isRespMsg) {
                      // 检测弹窗模块
                      if (!VxeUI.modal) {
                        errLog('vxe.error.reqModule', ['Modal'])
                      }
                      VxeUI.modal.message({ content: this.getRespMsg(rest, 'vxe.grid.delSuccess'), status: 'success' })
                    }
                    if (afterDelete) {
                      afterDelete(...applyArgs)
                    } else {
                      this.commitProxy('query')
                    }
                    if (deleteSuccessMethods) {
                      deleteSuccessMethods({ ...commitParams, response: rest })
                    }
                    return { status: true }
                  })
                  .catch(rest => {
                    this.tableLoading = false
                    if (isRespMsg) {
                      // 检测弹窗模块
                      if (!VxeUI.modal) {
                        errLog('vxe.error.reqModule', ['Modal'])
                      }
                      VxeUI.modal.message({ id: code, content: this.getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                    }
                    if (deleteErrorMethods) {
                      deleteErrorMethods({ ...commitParams, response: rest })
                    }
                    return { status: false }
                  })
              })
            } else {
              if (isActiveMsg) {
                // 检测弹窗模块
                if (!VxeUI.modal) {
                  errLog('vxe.error.reqModule', ['Modal'])
                }
                VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.selectOneRecord'), status: 'warning' })
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
            const body = this.getRecordset()
            const { insertRecords, removeRecords, updateRecords, pendingRecords } = body
            const commitParams = { $grid: this, code, button, body, form: formData, options: ajaxMethods }
            const applyArgs = [commitParams].concat(args)
            // 排除掉新增且标记为删除的数据
            if (insertRecords.length) {
              body.pendingRecords = pendingRecords.filter((row: any) => insertRecords.indexOf(row) === -1)
            }
            // 排除已标记为删除的数据
            if (pendingRecords.length) {
              body.insertRecords = insertRecords.filter((row: any) => pendingRecords.indexOf(row) === -1)
            }
            let restPromise = Promise.resolve()
            if (editRules) {
              // 只校验新增和修改的数据
              restPromise = this[validConfig && validConfig.msgMode === 'full' ? 'fullValidate' : 'validate'](body.insertRecords.concat(updateRecords))
            }
            return restPromise.then((errMap: any) => {
              if (errMap) {
                // 如果校验不通过
                return
              }
              if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                this.tableLoading = true
                return Promise.resolve((beforeSave || ajaxMethods)(...applyArgs))
                  .then(rest => {
                    this.tableLoading = false
                    $xeTable.clearPendingRow()
                    if (isRespMsg) {
                      // 检测弹窗模块
                      if (!VxeUI.modal) {
                        errLog('vxe.error.reqModule', ['Modal'])
                      }
                      VxeUI.modal.message({ content: this.getRespMsg(rest, 'vxe.grid.saveSuccess'), status: 'success' })
                    }
                    if (afterSave) {
                      afterSave(...applyArgs)
                    } else {
                      this.commitProxy('query')
                    }
                    if (saveSuccessMethods) {
                      saveSuccessMethods({ ...commitParams, response: rest })
                    }
                    return { status: true }
                  })
                  .catch(rest => {
                    this.tableLoading = false
                    if (isRespMsg) {
                      // 检测弹窗模块
                      if (!VxeUI.modal) {
                        errLog('vxe.error.reqModule', ['Modal'])
                      }
                      VxeUI.modal.message({ id: code, content: this.getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                    }
                    if (saveErrorMethods) {
                      saveErrorMethods({ ...commitParams, response: rest })
                    }
                    return { status: false }
                  })
              } else {
                if (isActiveMsg) {
                  // 检测弹窗模块
                  if (!VxeUI.modal) {
                    errLog('vxe.error.reqModule', ['Modal'])
                  }
                  VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.dataUnchanged'), status: 'info' })
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
            if (gCommandOpts.commandMethod) {
              gCommandOpts.commandMethod({ code, button, $grid: this, $table: $xeTable }, ...args)
            } else {
              errLog('vxe.error.notCommands', [code])
            }
          }
        }
      }
      return this.$nextTick()
    },
    getRespMsg (rest: any, defaultMsg: any) {
      const { proxyOpts } = this
      const resConfigs = proxyOpts.response || proxyOpts.props || {}
      let msg: any
      if (rest && resConfigs.message) {
        msg = XEUtils.get(rest, resConfigs.message)
      }
      return msg || getI18n(defaultMsg)
    },
    handleDeleteRow (code: any, alertKey: any, callback: any) {
      const selectRecords = this.getCheckboxRecords()
      if (this.isActiveMsg) {
        if (selectRecords.length) {
          return VxeUI.modal.confirm({ id: `cfm_${code}`, content: getI18n(alertKey), escClosable: true }).then(type => {
            if (type === 'confirm') {
              return callback()
            }
          })
        } else {
          // 检测弹窗模块
          if (!VxeUI.modal) {
            errLog('vxe.error.reqModule', ['Modal'])
          }
          VxeUI.modal.message({ id: `msg_${code}`, content: getI18n('vxe.grid.selectOneRecord'), status: 'warning' })
        }
      } else {
        if (selectRecords.length) {
          callback()
        }
      }
      return Promise.resolve()
    },
    getFormData () {
      const { proxyConfig, proxyOpts, formOpts, formData } = this
      return proxyConfig && isEnableConf(proxyOpts) && proxyOpts.form ? formData : formOpts.data
    },
    getFormItems (itemIndex: any) {
      const { formConfig, formOpts } = this
      const itemList: any[] = []
      XEUtils.eachTree(isEnableConf(formConfig) && formOpts.items ? formOpts.items : [], item => {
        itemList.push(item)
      }, { children: 'children' })
      return XEUtils.isUndefined(itemIndex) ? itemList : itemList[itemIndex]
    },
    triggerToolbarCommitEvent (params: any, evnt: any) {
      const { code } = params
      return this.commitProxy(params, evnt).then((rest: any) => {
        if (code && rest && rest.status && ['query', 'reload', 'delete', 'save'].includes(code)) {
          this.$emit(code === 'delete' || code === 'save' ? `proxy-${code}` : 'proxy-query', { ...rest, isReload: code === 'reload', $grid: this, $event: evnt })
        }
      })
    },
    triggerToolbarBtnEvent (button: any, evnt: any) {
      this.triggerToolbarCommitEvent(button, evnt)
      this.$emit('toolbar-button-click', { code: button.code, button, $grid: this, $event: evnt })
    },
    triggerToolbarTolEvent (tool: any, evnt: any) {
      this.triggerToolbarCommitEvent(tool, evnt)
      this.$emit('toolbar-tool-click', { code: tool.code, tool, $grid: this, $event: evnt })
    },
    triggerPendingEvent (code: any) {
      const { isActiveMsg } = this
      const selectRecords = this.getCheckboxRecords()
      if (selectRecords.length) {
        this.togglePendingRow(selectRecords)
        this.clearCheckboxRow()
      } else {
        if (isActiveMsg) {
          // 检测弹窗模块
          if (!VxeUI.modal) {
            errLog('vxe.error.reqModule', ['Modal'])
          }
          VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.selectOneRecord'), status: 'warning' })
        }
      }
    },
    sortChangeEvent (params: any) {
      const { $table, column, sortList } = params
      const isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : $table.sortOpts.remote
      // 如果是服务端排序
      if (isRemote) {
        this.sortData = sortList
        if (this.proxyConfig) {
          this.tablePage.currentPage = 1
          this.commitProxy('query').then((rest: any) => {
            this.$emit('proxy-query', { ...rest, $grid: this, $event: params.$event })
          })
        }
      }
      this.$emit('sort-change', Object.assign({ $grid: this }, params))
    },
    filterChangeEvent (params: any) {
      const { $table, filterList } = params
      // 如果是服务端过滤
      if ($table.filterOpts.remote) {
        this.filterData = filterList
        if (this.proxyConfig) {
          this.tablePage.currentPage = 1
          this.commitProxy('query').then((rest: any) => {
            this.$emit('proxy-query', { ...rest, $grid: this, $event: params.$event })
          })
        }
      }
      this.$emit('filter-change', Object.assign({ $grid: this }, params))
    },
    submitEvent (params: any) {
      const $xeGrid = this
      const reactData = $xeGrid

      const { proxyConfig } = this
      if (reactData.tableLoading) {
        return
      }
      if (proxyConfig) {
        this.commitProxy('reload').then((rest: any) => {
          this.$emit('proxy-query', { ...rest, isReload: true, $grid: this, $event: params.$event })
        })
      }
      this.$emit('form-submit', Object.assign({ $grid: this }, params))
    },
    resetEvent (params: any) {
      const { proxyConfig } = this
      const $xeTable = this.$refs.xTable
      if (proxyConfig) {
        $xeTable.clearScroll()
        this.commitProxy('reload').then((rest: any) => {
          this.$emit('proxy-query', { ...rest, isReload: true, $grid: this, $event: params.$event })
        })
      }
      this.$emit('form-reset', Object.assign({ $grid: this }, params))
    },
    submitInvalidEvent (params: any) {
      this.$emit('form-submit-invalid', Object.assign({ $grid: this }, params))
    },
    collapseEvent (params: any) {
      this.$nextTick(() => this.recalculate(true))
      this.$emit('form-toggle-collapse', Object.assign({ $grid: this }, params))
      this.$emit('form-collapse', Object.assign({ $grid: this }, params))
    },
    triggerZoomEvent (evnt: any) {
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
    handleZoom (isMax: any) {
      const { isZMax } = this
      if (isMax ? !isZMax : isZMax) {
        this.isZMax = !isZMax
        if (this.tZindex < getLastZIndex()) {
          this.tZindex = nextZIndex()
        }
      }
      return this.$nextTick()
        .then(() => this.recalculate(true))
        .then(() => {
          setTimeout(() => this.recalculate(true), 15)
          return this.isZMax
        })
    },
    getProxyInfo () {
      const $xeGrid = this
      const $xeTable = $xeGrid.$refs.xTable as VxeTableConstructor & VxeTablePrivateMethods

      const { sortData, proxyConfig } = this
      if (proxyConfig) {
        return {
          data: $xeTable ? $xeTable.getFullData() : [],
          filter: this.filterData,
          form: this.getFormData(),
          sort: sortData.length ? sortData[0] : {},
          sorts: sortData,
          pager: this.tablePage,
          pendingRecords: $xeTable ? $xeTable.getPendingRecords() : []
        }
      }
      return null
    },
    loadColumn (columns: any[]) {
      const $xeGrid = this
      const $xeTable = $xeGrid.$refs.xTable as VxeTableConstructor & VxeTablePrivateMethods

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
      return $xeTable.loadColumn(columns)
    },
    reloadColumn (columns: any[]) {
      const $xeGrid = this

      $xeGrid.clearAll()
      return $xeGrid.loadColumn(columns)
    }
  } as any
}
