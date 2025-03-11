import { defineComponent, h, ref, Ref, computed, inject, createCommentVNode, VNode, reactive, nextTick, PropType } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'

import type { ValueOf, VxeButtonComponent, VxeButtonEvents, VxeComponentSlotType } from 'vxe-pc-ui'
import type { VxeGridConstructor, GridPrivateMethods, ToolbarMethods, ToolbarInternalData, VxeToolbarConstructor, VxeToolbarEmits, VxeToolbarPropTypes, ToolbarPrivateRef, ToolbarReactData, VxeTableConstructor, VxeTablePrivateMethods } from '../../../types'

const { getConfig, getIcon, getI18n, renderer, commands, createEvent, useFns } = VxeUI

export default defineComponent({
  name: 'VxeToolbar',
  props: {
    loading: Boolean,
    refresh: [Boolean, Object] as PropType<VxeToolbarPropTypes.Refresh>,
    import: [Boolean, Object] as PropType<VxeToolbarPropTypes.Import>,
    export: [Boolean, Object] as PropType<VxeToolbarPropTypes.Export>,
    print: [Boolean, Object] as PropType<VxeToolbarPropTypes.Print>,
    zoom: [Boolean, Object] as PropType< VxeToolbarPropTypes.Zoom>,
    custom: [Boolean, Object] as PropType<VxeToolbarPropTypes.Custom>,
    buttons: {
      type: Array as PropType<VxeToolbarPropTypes.Buttons>,
      default: () => getConfig().toolbar.buttons
    },
    tools: {
      type: Array as PropType<VxeToolbarPropTypes.Tools>,
      default: () => getConfig().toolbar.tools
    },
    perfect: {
      type: Boolean as PropType<VxeToolbarPropTypes.Perfect>,
      default: () => getConfig().toolbar.perfect
    },
    size: {
      type: String as PropType<VxeToolbarPropTypes.Size>,
      default: () => getConfig().toolbar.size || getConfig().size
    },
    className: [String, Function] as PropType<VxeToolbarPropTypes.ClassName>
  },
  emits: [
    'button-click',
    'tool-click'
  ] as VxeToolbarEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    // 使用已安装的组件，如果未安装则不渲染
    const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

    const { computeSize } = useFns.useSize(props)

    const reactData = reactive<ToolbarReactData>({
      isRefresh: false,
      connectFlag: 0,
      columns: []
    })

    const internalData: ToolbarInternalData = {
      connectTable: null
    }

    const refElem = ref() as Ref<HTMLDivElement>

    const refMaps: ToolbarPrivateRef = {
      refElem
    }

    const $xeToolbar = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    } as unknown as VxeToolbarConstructor

    let toolbarMethods = {} as ToolbarMethods

    const $xeGrid = inject<(VxeGridConstructor & GridPrivateMethods) | null>('$xeGrid', null)

    const computeRefreshOpts = computed(() => {
      return Object.assign({}, XEUtils.clone(getConfig().toolbar.refresh, true), props.refresh) as VxeToolbarPropTypes.RefreshOpts
    })

    const computeImportOpts = computed(() => {
      return Object.assign({}, XEUtils.clone(getConfig().toolbar.import, true), props.import) as VxeToolbarPropTypes.ImportOpts
    })

    const computeExportOpts = computed(() => {
      return Object.assign({}, XEUtils.clone(getConfig().toolbar.export, true), props.export) as VxeToolbarPropTypes.ExportOpts
    })

    const computePrintOpts = computed(() => {
      return Object.assign({}, XEUtils.clone(getConfig().toolbar.print, true), props.print) as VxeToolbarPropTypes.PrintOpts
    })

    const computeZoomOpts = computed(() => {
      return Object.assign({}, XEUtils.clone(getConfig().toolbar.zoom, true), props.zoom) as VxeToolbarPropTypes.ZoomOpts
    })

    const computeCustomOpts = computed(() => {
      return Object.assign({}, XEUtils.clone(getConfig().toolbar.custom, true), props.custom) as VxeToolbarPropTypes.CustomOpts
    })

    const computeTableCustomOpts = computed(() => {
      const { connectTable } = internalData
      const $table = connectTable
      if (reactData.connectFlag || $table) {
        if ($table) {
          const { computeCustomOpts } = $table.getComputeMaps()
          return computeCustomOpts.value
        }
      }
      return { trigger: '' }
    })

    const computeTrigger = computed(() => {
      const tableCustomOpts = computeTableCustomOpts.value
      return tableCustomOpts.trigger
    })

    const checkTable = () => {
      const { connectTable } = internalData
      const $table = connectTable
      if ($table) {
        return true
      }
      errLog('vxe.error.barUnableLink')
    }

    const handleClickSettingEvent = ({ $event }: any) => {
      const { connectTable } = internalData
      const $table = connectTable
      if ($table) {
        if ($table.triggerCustomEvent) {
          $table.triggerCustomEvent($event)
        } else {
          errLog('vxe.error.reqModule', ['VxeTableCustomModule'])
        }
      }
    }

    const handleMouseenterSettingEvent = ({ $event }: any) => {
      const { connectTable } = internalData
      const $table = connectTable
      if ($table) {
        $table.customOpenEvent($event)
      } else {
        errLog('vxe.error.reqModule', ['VxeTableCustomModule'])
      }
    }

    const handleMouseleaveSettingEvent = ({ $event }: any) => {
      const { connectTable } = internalData
      const $table = connectTable
      if ($table) {
        const { customStore } = $table.reactData
        customStore.activeBtn = false
        setTimeout(() => {
          if (!customStore.activeBtn && !customStore.activeWrapper) {
            $table.customCloseEvent($event)
          }
        }, 350)
      }
    }

    const refreshEvent: VxeButtonEvents.Click = ({ $event }) => {
      const { isRefresh } = reactData
      const refreshOpts = computeRefreshOpts.value
      if (!isRefresh) {
        const queryMethod = refreshOpts.queryMethod || refreshOpts.query
        if (queryMethod) {
          reactData.isRefresh = true
          try {
            Promise.resolve(queryMethod({})).catch((e) => e).then(() => {
              reactData.isRefresh = false
            })
          } catch (e) {
            reactData.isRefresh = false
          }
        } else if ($xeGrid) {
          reactData.isRefresh = true
          $xeGrid.triggerToolbarCommitEvent({ code: refreshOpts.code || 'reload' }, $event).catch((e) => e).then(() => {
            reactData.isRefresh = false
          })
        }
      }
    }

    const zoomEvent: VxeButtonEvents.Click = ({ $event }) => {
      if ($xeGrid) {
        $xeGrid.triggerZoomEvent($event)
      }
    }

    const btnEvent = (evnt: Event, item: VxeToolbarPropTypes.ButtonConfig) => {
      const { connectTable } = internalData
      const $table = connectTable
      const { code } = item
      if (code) {
        if ($xeGrid) {
          $xeGrid.triggerToolbarBtnEvent(item, evnt)
        } else {
          const gCommandOpts = commands.get(code)
          const params = { code, button: item, $table: $table!, $grid: $xeGrid, $event: evnt }
          if (gCommandOpts) {
            const tCommandMethod = gCommandOpts.tableCommandMethod || gCommandOpts.commandMethod
            if (tCommandMethod) {
              tCommandMethod(params)
            } else {
              errLog('vxe.error.notCommands', [code])
            }
          }
          $xeToolbar.dispatchEvent('button-click', params, evnt)
        }
      }
    }

    const tolEvent = (evnt: Event, item: VxeToolbarPropTypes.ButtonConfig) => {
      const { connectTable } = internalData
      const $table = connectTable
      const { code } = item
      if (code) {
        if ($xeGrid) {
          $xeGrid.triggerToolbarTolEvent(item, evnt)
        } else {
          const gCommandOpts = commands.get(code)
          const params = { code, tool: item, $table: $table!, $grid: $xeGrid, $event: evnt }
          if (gCommandOpts) {
            const tCommandMethod = gCommandOpts.tableCommandMethod || gCommandOpts.commandMethod
            if (tCommandMethod) {
              tCommandMethod(params)
            } else {
              errLog('vxe.error.notCommands', [code])
            }
          }
          $xeToolbar.dispatchEvent('tool-click', params, evnt)
        }
      }
    }

    const importEvent = () => {
      if (checkTable()) {
        const { connectTable } = internalData
        const $table = connectTable
        if ($table) {
          $table.openImport()
        }
      }
    }

    const exportEvent = () => {
      if (checkTable()) {
        const { connectTable } = internalData
        const $table = connectTable
        if ($table) {
          $table.openExport()
        }
      }
    }

    const printEvent = () => {
      if (checkTable()) {
        const { connectTable } = internalData
        const $table = connectTable
        if ($table) {
          $table.openPrint()
        }
      }
    }

    const dispatchEvent = (type: ValueOf<VxeToolbarEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $toolbar: $xeToolbar }, params))
    }

    toolbarMethods = {
      dispatchEvent,
      syncUpdate (params) {
        internalData.connectTable = params.$table as (VxeTableConstructor & VxeTablePrivateMethods)
        reactData.columns = params.collectColumn
        reactData.connectFlag++
      }
    }

    Object.assign($xeToolbar, toolbarMethods)

    const renderDropdowns = (item: VxeToolbarPropTypes.ButtonConfig, isBtn: boolean) => {
      const { dropdowns } = item
      const downVNs: VNode[] = []
      if (dropdowns) {
        return dropdowns.map((child, index) => {
          if (child.visible === false) {
            return createCommentVNode()
          }
          return VxeUIButtonComponent
            ? h(VxeUIButtonComponent, {
              key: index,
              disabled: child.disabled,
              loading: child.loading,
              type: child.type,
              mode: child.mode,
              icon: child.icon,
              circle: child.circle,
              round: child.round,
              status: child.status,
              content: child.name,
              title: child.title,
              routerLink: child.routerLink,
              permissionCode: child.permissionCode,
              prefixTooltip: child.prefixTooltip,
              suffixTooltip: child.suffixTooltip,
              onClick: ({ $event }) => isBtn ? btnEvent($event, child) : tolEvent($event, child)
            })
            : createCommentVNode()
        })
      }
      return downVNs
    }

    /**
     * 渲染按钮
     */
    const renderLeftBtns = () => {
      const { buttons } = props
      const { connectTable } = internalData
      const $table = connectTable
      const buttonPrefixSlot = slots.buttonPrefix || slots['button-prefix']
      const buttonSuffixSlot = slots.buttonSuffix || slots['button-suffix']
      const btnVNs: VxeComponentSlotType[] = []
      if (buttonPrefixSlot) {
        btnVNs.push(...getSlotVNs(buttonPrefixSlot({ buttons: buttons || [], $grid: $xeGrid, $table: $table })))
      }
      if (buttons) {
        buttons.forEach((item, index) => {
          const { dropdowns, buttonRender } = item
          if (item.visible !== false) {
            const compConf = buttonRender ? renderer.get(buttonRender.name) : null
            if (buttonRender && compConf && compConf.renderToolbarButton) {
              const toolbarButtonClassName = compConf.toolbarButtonClassName
              const params = { $grid: $xeGrid, $table: $table!, button: item }
              btnVNs.push(
                h('span', {
                  key: `br${item.code || index}`,
                  class: ['vxe-button--item', toolbarButtonClassName ? (XEUtils.isFunction(toolbarButtonClassName) ? toolbarButtonClassName(params) : toolbarButtonClassName) : '']
                }, getSlotVNs(compConf.renderToolbarButton(buttonRender, params)))
              )
            } else {
              if (VxeUIButtonComponent) {
                btnVNs.push(
                  h(VxeUIButtonComponent, {
                    key: `bd${item.code || index}`,
                    disabled: item.disabled,
                    loading: item.loading,
                    type: item.type,
                    mode: item.mode,
                    icon: item.icon,
                    circle: item.circle,
                    round: item.round,
                    status: item.status,
                    content: item.name,
                    title: item.title,
                    routerLink: item.routerLink,
                    permissionCode: item.permissionCode,
                    prefixTooltip: item.prefixTooltip,
                    suffixTooltip: item.suffixTooltip,
                    destroyOnClose: item.destroyOnClose,
                    placement: item.placement,
                    transfer: item.transfer,
                    onClick: ({ $event }) => btnEvent($event, item)
                  }, dropdowns && dropdowns.length
                    ? {
                        dropdowns: () => renderDropdowns(item, true)
                      }
                    : {})
                )
              }
            }
          }
        })
      }
      if (buttonSuffixSlot) {
        btnVNs.push(...getSlotVNs(buttonSuffixSlot({ buttons: buttons || [], $grid: $xeGrid, $table: $table })))
      }
      return btnVNs
    }

    /**
     * 渲染右侧工具
     */
    const renderRightTools = () => {
      const { tools } = props
      const { connectTable } = internalData
      const $table = connectTable
      const toolPrefixSlot = slots.toolPrefix || slots['tool-prefix']
      const toolSuffixSlot = slots.toolSuffix || slots['tool-suffix']
      const btnVNs: VxeComponentSlotType[] = []
      if (toolPrefixSlot) {
        btnVNs.push(...getSlotVNs(toolPrefixSlot({ tools: tools || [], $grid: $xeGrid, $table: $table })))
      }
      if (tools) {
        tools.forEach((item, tIndex) => {
          const { dropdowns, toolRender } = item
          if (item.visible !== false) {
            const rdName = toolRender ? toolRender.name : null
            const compConf = toolRender ? renderer.get(rdName) : null
            if (toolRender && compConf && compConf.renderToolbarTool) {
              const toolbarToolClassName = compConf.toolbarToolClassName
              const params = { $grid: $xeGrid, $table: $table!, tool: item }
              btnVNs.push(
                h('span', {
                  key: rdName as string,
                  class: ['vxe-tool--item', toolbarToolClassName ? (XEUtils.isFunction(toolbarToolClassName) ? toolbarToolClassName(params) : toolbarToolClassName) : '']
                }, getSlotVNs(compConf.renderToolbarTool(toolRender, params)))
              )
            } else {
              if (VxeUIButtonComponent) {
                btnVNs.push(
                  h(VxeUIButtonComponent, {
                    key: tIndex,
                    disabled: item.disabled,
                    loading: item.loading,
                    type: item.type,
                    mode: item.mode,
                    icon: item.icon,
                    circle: item.circle,
                    round: item.round,
                    status: item.status,
                    content: item.name,
                    title: item.title,
                    routerLink: item.routerLink,
                    permissionCode: item.permissionCode,
                    prefixTooltip: item.prefixTooltip,
                    suffixTooltip: item.suffixTooltip,
                    destroyOnClose: item.destroyOnClose,
                    placement: item.placement,
                    transfer: item.transfer,
                    onClick: ({ $event }) => tolEvent($event, item)
                  }, dropdowns && dropdowns.length
                    ? {
                        dropdowns: () => renderDropdowns(item, false)
                      }
                    : {})
                )
              }
            }
          }
        })
      }
      if (toolSuffixSlot) {
        btnVNs.push(...getSlotVNs(toolSuffixSlot({ tools: tools || [], $grid: $xeGrid, $table: $table })))
      }
      return btnVNs
    }

    const renderToolImport = () => {
      const importOpts = computeImportOpts.value
      return VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'import',
          circle: true,
          icon: importOpts.icon || getIcon().TOOLBAR_TOOLS_IMPORT,
          title: getI18n('vxe.toolbar.import'),
          onClick: importEvent
        })
        : createCommentVNode()
    }

    const renderToolExport = () => {
      const exportOpts = computeExportOpts.value
      return VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'export',
          circle: true,
          icon: exportOpts.icon || getIcon().TOOLBAR_TOOLS_EXPORT,
          title: getI18n('vxe.toolbar.export'),
          onClick: exportEvent
        })
        : createCommentVNode()
    }

    const renderToolPrint = () => {
      const printOpts = computePrintOpts.value
      return VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'print',
          circle: true,
          icon: printOpts.icon || getIcon().TOOLBAR_TOOLS_PRINT,
          title: getI18n('vxe.toolbar.print'),
          onClick: printEvent
        })
        : createCommentVNode()
    }

    const renderToolRefresh = () => {
      const refreshOpts = computeRefreshOpts.value
      return VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'refresh',
          circle: true,
          icon: reactData.isRefresh ? (refreshOpts.iconLoading || getIcon().TOOLBAR_TOOLS_REFRESH_LOADING) : (refreshOpts.icon || getIcon().TOOLBAR_TOOLS_REFRESH),
          title: getI18n('vxe.toolbar.refresh'),
          onClick: refreshEvent
        })
        : createCommentVNode()
    }

    const renderToolZoom = () => {
      const zoomOpts = computeZoomOpts.value
      return $xeGrid && VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'zoom',
          circle: true,
          icon: $xeGrid.isMaximized() ? (zoomOpts.iconOut || getIcon().TOOLBAR_TOOLS_MINIMIZE) : (zoomOpts.iconIn || getIcon().TOOLBAR_TOOLS_FULLSCREEN),
          title: getI18n(`vxe.toolbar.zoom${$xeGrid.isMaximized() ? 'Out' : 'In'}`),
          onClick: zoomEvent
        })
        : createCommentVNode()
    }

    const renderToolCustom = () => {
      const customOpts = computeCustomOpts.value
      const btnTrigger = computeTrigger.value
      const customBtnOns: {
        onClick?: typeof handleClickSettingEvent;
        onMouseenter?: typeof handleMouseenterSettingEvent;
        onMouseleave?: typeof handleMouseleaveSettingEvent;
      } = {}
      if (btnTrigger === 'manual') {
        // 手动触发
      } else if (btnTrigger === 'hover') {
        // hover 触发
        customBtnOns.onMouseenter = handleMouseenterSettingEvent
        customBtnOns.onMouseleave = handleMouseleaveSettingEvent
      } else {
        // 点击触发
        customBtnOns.onClick = handleClickSettingEvent
      }
      return VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'custom',
          circle: true,
          icon: customOpts.icon || getIcon().TOOLBAR_TOOLS_CUSTOM,
          title: getI18n('vxe.toolbar.custom'),
          className: 'vxe-toolbar-custom-target',
          ...customBtnOns
        })
        : createCommentVNode()
    }

    const renderVN = () => {
      const { perfect, loading, refresh, zoom, custom, className } = props
      const { connectTable } = internalData
      const vSize = computeSize.value
      const toolsSlot = slots.tools
      const buttonsSlot = slots.buttons
      const $table = connectTable

      return h('div', {
        ref: refElem,
        class: ['vxe-toolbar', className ? (XEUtils.isFunction(className) ? className({ $toolbar: $xeToolbar }) : className) : '', {
          [`size--${vSize}`]: vSize,
          'is--perfect': perfect,
          'is--loading': loading
        }]
      }, [
        h('div', {
          class: 'vxe-buttons--wrapper'
        }, buttonsSlot ? buttonsSlot({ $grid: $xeGrid, $table: $table }) : renderLeftBtns()),
        h('div', {
          class: 'vxe-tools--wrapper'
        }, toolsSlot ? toolsSlot({ $grid: $xeGrid, $table: $table }) : renderRightTools()),
        h('div', {
          class: 'vxe-tools--operate'
        }, [
          props.import ? renderToolImport() : createCommentVNode(),
          props.export ? renderToolExport() : createCommentVNode(),
          props.print ? renderToolPrint() : createCommentVNode(),
          refresh ? renderToolRefresh() : createCommentVNode(),
          zoom && $xeGrid ? renderToolZoom() : createCommentVNode(),
          custom ? renderToolCustom() : createCommentVNode()
        ])
      ])
    }

    $xeToolbar.renderVN = renderVN

    nextTick(() => {
      const { refresh } = props
      const refreshOpts = computeRefreshOpts.value
      const queryMethod = refreshOpts.queryMethod || refreshOpts.query
      if (refresh && !$xeGrid && !queryMethod) {
        warnLog('vxe.error.notFunc', ['queryMethod'])
      }
      const customOpts = computeCustomOpts.value
      if (customOpts.isFooter) {
        warnLog('vxe.error.delProp', ['toolbar.custom.isFooter', 'table.custom-config.showFooter'])
      }
      if (customOpts.showFooter) {
        warnLog('vxe.error.delProp', ['toolbar.custom.showFooter', 'table.custom-config.showFooter'])
      }
      if (customOpts.immediate) {
        warnLog('vxe.error.delProp', ['toolbar.custom.immediate', 'table.custom-config.immediate'])
      }
      if (customOpts.trigger) {
        warnLog('vxe.error.delProp', ['toolbar.custom.trigger', 'table.custom-config.trigger'])
      }
      if (props.refresh || props.import || props.export || props.print || props.zoom) {
        if (!VxeUIButtonComponent) {
          errLog('vxe.error.reqComp', ['vxe-button'])
        }
      }
    })

    return $xeToolbar
  },
  render () {
    return this.renderVN()
  }
})
