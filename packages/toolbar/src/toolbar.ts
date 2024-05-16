import { defineComponent, h, ref, Ref, computed, inject, createCommentVNode, VNode, reactive, nextTick, PropType } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VxeButtonComponent from '../../button'
import { VXETable } from '../../v-x-e-table'
import { useSize } from '../../hooks/size'
import { warnLog, errLog } from '../../tools/log'
import { getSlotVNs } from '../../tools/vn'

import { VxeGridConstructor, GridPrivateMethods, ToolbarMethods, VxeToolbarConstructor, VxeToolbarEmits, VxeToolbarPropTypes, VxeTableConstructor, ToolbarPrivateRef, VxeTableMethods, VxeTablePrivateMethods, ToolbarReactData } from '../../../types/all'

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
    buttons: { type: Array as PropType<VxeToolbarPropTypes.Buttons>, default: () => GlobalConfig.toolbar.buttons },
    tools: { type: Array as PropType<VxeToolbarPropTypes.Tools>, default: () => GlobalConfig.toolbar.tools },
    perfect: { type: Boolean as PropType<VxeToolbarPropTypes.Perfect>, default: () => GlobalConfig.toolbar.perfect },
    size: { type: String as PropType<VxeToolbarPropTypes.Size>, default: () => GlobalConfig.toolbar.size || GlobalConfig.size },
    className: [String, Function] as PropType<VxeToolbarPropTypes.ClassName>
  },
  emits: [
    'button-click',
    'tool-click'
  ] as VxeToolbarEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const reactData = reactive<ToolbarReactData>({
      isRefresh: false,
      columns: []
    })

    const refElem = ref() as Ref<HTMLDivElement>

    const refMaps: ToolbarPrivateRef = {
      refElem
    }

    const $xetoolbar = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    } as unknown as VxeToolbarConstructor

    let toolbarMethods = {} as ToolbarMethods

    const $xegrid = inject('$xegrid', null as (VxeGridConstructor & GridPrivateMethods) | null)
    let $xetable: VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods

    const connectFlag = ref(0)

    const computeRefreshOpts = computed(() => {
      return Object.assign({}, GlobalConfig.toolbar.refresh, props.refresh) as VxeToolbarPropTypes.RefreshOpts
    })

    const computeImportOpts = computed(() => {
      return Object.assign({}, GlobalConfig.toolbar.import, props.import) as VxeToolbarPropTypes.ImportOpts
    })

    const computeExportOpts = computed(() => {
      return Object.assign({}, GlobalConfig.toolbar.export, props.export) as VxeToolbarPropTypes.ExportOpts
    })

    const computePrintOpts = computed(() => {
      return Object.assign({}, GlobalConfig.toolbar.print, props.print) as VxeToolbarPropTypes.PrintOpts
    })

    const computeZoomOpts = computed(() => {
      return Object.assign({}, GlobalConfig.toolbar.zoom, props.zoom) as VxeToolbarPropTypes.ZoomOpts
    })

    const computeCustomOpts = computed(() => {
      return Object.assign({}, GlobalConfig.toolbar.custom, props.custom) as VxeToolbarPropTypes.CustomOpts
    })

    const computeTableCustomOpts = computed(() => {
      if (connectFlag.value || $xetable) {
        if ($xetable) {
          const { computeCustomOpts } = $xetable.getComputeMaps()
          return computeCustomOpts.value
        }
      }
      return {}
    })

    const computeTrigger = computed(() => {
      const tableCustomOpts = computeTableCustomOpts.value
      return tableCustomOpts.trigger
    })

    const checkTable = () => {
      if ($xetable) {
        return true
      }
      errLog('vxe.error.barUnableLink')
    }

    const handleClickSettingEvent = ({ $event }: any) => {
      if ($xetable) {
        if ($xetable.triggerCustomEvent) {
          $xetable.triggerCustomEvent($event)
        } else {
          errLog('vxe.error.reqModule', ['VxeTableCustomModule'])
        }
      }
    }

    const handleMouseenterSettingEvent = ({ $event }: any) => {
      if ($xetable) {
        $xetable.customOpenEvent($event)
      } else {
        errLog('vxe.error.reqModule', ['VxeTableCustomModule'])
      }
    }

    const handleMouseleaveSettingEvent = ({ $event }: any) => {
      const { customStore } = $xetable.reactData
      customStore.activeBtn = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          $xetable.customColseEvent($event)
        }
      }, 350)
    }

    const refreshEvent = (evnt: KeyboardEvent) => {
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
        } else if ($xegrid) {
          reactData.isRefresh = true
          $xegrid.triggerToolbarCommitEvent({ code: refreshOpts.code || 'reload' }, evnt).catch((e) => e).then(() => {
            reactData.isRefresh = false
          })
        }
      }
    }

    const zoomEvent = (evnt: Event) => {
      if ($xegrid) {
        $xegrid.triggerZoomEvent(evnt)
      }
    }

    const btnEvent = (evnt: Event, item: VxeToolbarPropTypes.ButtonConfig) => {
      const { code } = item
      if (code) {
        if ($xegrid) {
          $xegrid.triggerToolbarBtnEvent(item, evnt)
        } else {
          const gCommandOpts = VXETable.commands.get(code)
          const params = { code, button: item, $table: $xetable, $grid: $xegrid, $event: evnt }
          if (gCommandOpts) {
            if (gCommandOpts.commandMethod) {
              gCommandOpts.commandMethod(params)
            } else {
              if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                errLog('vxe.error.notCommands', [code])
              }
            }
          }
          $xetoolbar.dispatchEvent('button-click', params, evnt)
        }
      }
    }

    const tolEvent = (evnt: Event, item: VxeToolbarPropTypes.ButtonConfig) => {
      const { code } = item
      if (code) {
        if ($xegrid) {
          $xegrid.triggerToolbarTolEvent(item, evnt)
        } else {
          const gCommandOpts = VXETable.commands.get(code)
          const params = { code, tool: item, $table: $xetable, $grid: $xegrid, $event: evnt }
          if (gCommandOpts) {
            if (gCommandOpts.commandMethod) {
              gCommandOpts.commandMethod(params)
            } else {
              if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                errLog('vxe.error.notCommands', [code])
              }
            }
          }
          $xetoolbar.dispatchEvent('tool-click', params, evnt)
        }
      }
    }

    const importEvent = () => {
      if (checkTable()) {
        $xetable.openImport()
      }
    }

    const exportEvent = () => {
      if (checkTable()) {
        $xetable.openExport()
      }
    }

    const printEvent = () => {
      if (checkTable()) {
        $xetable.openPrint()
      }
    }

    const renderDropdowns = (item: VxeToolbarPropTypes.ButtonConfig, isBtn: boolean) => {
      const { dropdowns } = item
      const downVNs: VNode[] = []
      if (dropdowns) {
        return dropdowns.map((child, index) => {
          if (child.visible === false) {
            return createCommentVNode()
          }
          return h(VxeButtonComponent, {
            key: index,
            disabled: child.disabled,
            loading: child.loading,
            type: child.type,
            icon: child.icon,
            circle: child.circle,
            round: child.round,
            status: child.status,
            content: child.name,
            onClick: (evnt: Event) => isBtn ? btnEvent(evnt, child) : tolEvent(evnt, child)
          })
        })
      }
      return downVNs
    }

    /**
     * 渲染按钮
     */
    const renderBtns = () => {
      const { buttons } = props
      const buttonsSlot = slots.buttons
      if (buttonsSlot) {
        return getSlotVNs(buttonsSlot({ $grid: $xegrid, $table: $xetable }))
      }
      const btnVNs: VNode[] = []
      if (buttons) {
        buttons.forEach((item) => {
          const { dropdowns, buttonRender } = item
          if (item.visible !== false) {
            const compConf = buttonRender ? VXETable.renderer.get(buttonRender.name) : null
            if (buttonRender && compConf && compConf.renderToolbarButton) {
              const toolbarButtonClassName = compConf.toolbarButtonClassName
              const params = { $grid: $xegrid, $table: $xetable, button: item }
              btnVNs.push(
                h('span', {
                  class: ['vxe-button--item', toolbarButtonClassName ? (XEUtils.isFunction(toolbarButtonClassName) ? toolbarButtonClassName(params) : toolbarButtonClassName) : '']
                }, getSlotVNs(compConf.renderToolbarButton(buttonRender, params)))
              )
            } else {
              btnVNs.push(
                h(VxeButtonComponent, {
                  disabled: item.disabled,
                  loading: item.loading,
                  type: item.type,
                  icon: item.icon,
                  circle: item.circle,
                  round: item.round,
                  status: item.status,
                  content: item.name,
                  destroyOnClose: item.destroyOnClose,
                  placement: item.placement,
                  transfer: item.transfer,
                  onClick: (evnt: Event) => btnEvent(evnt, item)
                }, dropdowns && dropdowns.length ? {
                  dropdowns: () => renderDropdowns(item, true)
                } : {})
              )
            }
          }
        })
      }
      return btnVNs
    }

    /**
     * 渲染右侧工具
     */
    const renderRightTools = () => {
      const { tools } = props
      const toolsSlot = slots.tools
      if (toolsSlot) {
        return getSlotVNs(toolsSlot({ $grid: $xegrid, $table: $xetable }))
      }
      const btnVNs: VNode[] = []
      if (tools) {
        tools.forEach((item, tIndex) => {
          const { dropdowns, toolRender } = item
          if (item.visible !== false) {
            const rdName = toolRender ? toolRender.name : null
            const compConf = toolRender ? VXETable.renderer.get(rdName) : null
            if (toolRender && compConf && compConf.renderToolbarTool) {
              const toolbarToolClassName = compConf.toolbarToolClassName
              const params = { $grid: $xegrid, $table: $xetable, tool: item }
              btnVNs.push(
                h('span', {
                  key: rdName as string,
                  class: ['vxe-tool--item', toolbarToolClassName ? (XEUtils.isFunction(toolbarToolClassName) ? toolbarToolClassName(params) : toolbarToolClassName) : '']
                }, getSlotVNs(compConf.renderToolbarTool(toolRender, params)))
              )
            } else {
              btnVNs.push(
                h(VxeButtonComponent, {
                  key: tIndex,
                  disabled: item.disabled,
                  loading: item.loading,
                  type: item.type,
                  icon: item.icon,
                  circle: item.circle,
                  round: item.round,
                  status: item.status,
                  content: item.name,
                  destroyOnClose: item.destroyOnClose,
                  placement: item.placement,
                  transfer: item.transfer,
                  onClick: (evnt: Event) => tolEvent(evnt, item)
                }, dropdowns && dropdowns.length ? {
                  dropdowns: () => renderDropdowns(item, false)
                } : {})
              )
            }
          }
        })
      }
      return btnVNs
    }

    const renderToolImport = () => {
      const importOpts = computeImportOpts.value
      return h(VxeButtonComponent, {
        key: 'import',
        circle: true,
        icon: importOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_IMPORT,
        title: GlobalConfig.i18n('vxe.toolbar.import'),
        onClick: importEvent
      })
    }

    const renderToolExport = () => {
      const exportOpts = computeExportOpts.value
      return h(VxeButtonComponent, {
        key: 'export',
        circle: true,
        icon: exportOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_EXPORT,
        title: GlobalConfig.i18n('vxe.toolbar.export'),
        onClick: exportEvent
      })
    }

    const renderToolPrint = () => {
      const printOpts = computePrintOpts.value
      return h(VxeButtonComponent, {
        key: 'print',
        circle: true,
        icon: printOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_PRINT,
        title: GlobalConfig.i18n('vxe.toolbar.print'),
        onClick: printEvent
      })
    }

    const renderToolRefresh = () => {
      const refreshOpts = computeRefreshOpts.value
      return h(VxeButtonComponent, {
        key: 'refresh',
        circle: true,
        icon: reactData.isRefresh ? (refreshOpts.iconLoading || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH_LOADING) : (refreshOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH),
        title: GlobalConfig.i18n('vxe.toolbar.refresh'),
        onClick: refreshEvent
      })
    }

    const renderToolZoom = () => {
      const zoomOpts = computeZoomOpts.value
      return $xegrid ? h(VxeButtonComponent, {
        key: 'zoom',
        circle: true,
        icon: $xegrid.isMaximized() ? (zoomOpts.iconOut || GlobalConfig.icon.TOOLBAR_TOOLS_MINIMIZE) : (zoomOpts.iconIn || GlobalConfig.icon.TOOLBAR_TOOLS_FULLSCREEN),
        title: GlobalConfig.i18n(`vxe.toolbar.zoom${$xegrid.isMaximized() ? 'Out' : 'In'}`),
        onClick: zoomEvent
      }) : createCommentVNode()
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
      return h(VxeButtonComponent, {
        key: 'custom',
        circle: true,
        icon: customOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_CUSTOM,
        title: GlobalConfig.i18n('vxe.toolbar.custom'),
        className: 'vxe-toolbar-custom-target',
        ...customBtnOns
      })
    }

    toolbarMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $toolbar: $xetoolbar, $event: evnt }, params))
      },
      syncUpdate (params) {
        const { collectColumn } = params
        $xetable = params.$table
        reactData.columns = collectColumn
        connectFlag.value++
      }
    }

    Object.assign($xetoolbar, toolbarMethods)

    nextTick(() => {
      const { refresh } = props
      const refreshOpts = computeRefreshOpts.value
      const queryMethod = refreshOpts.queryMethod || refreshOpts.query
      if (refresh && !$xegrid && !queryMethod) {
        warnLog('vxe.error.notFunc', ['queryMethod'])
      }
      const customOpts = computeCustomOpts.value
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
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
      }
    })

    const renderVN = () => {
      const { perfect, loading, refresh, zoom, custom, className } = props
      const vSize = computeSize.value
      return h('div', {
        ref: refElem,
        class: ['vxe-toolbar', className ? (XEUtils.isFunction(className) ? className({ $toolbar: $xetoolbar }) : className) : '', {
          [`size--${vSize}`]: vSize,
          'is--perfect': perfect,
          'is--loading': loading
        }]
      }, [
        h('div', {
          class: 'vxe-buttons--wrapper'
        }, renderBtns()),
        h('div', {
          class: 'vxe-tools--wrapper'
        }, renderRightTools()),
        h('div', {
          class: 'vxe-tools--operate'
        }, [
          props.import ? renderToolImport() : createCommentVNode(),
          props.export ? renderToolExport() : createCommentVNode(),
          props.print ? renderToolPrint() : createCommentVNode(),
          refresh ? renderToolRefresh() : createCommentVNode(),
          zoom && $xegrid ? renderToolZoom() : createCommentVNode(),
          custom ? renderToolCustom() : createCommentVNode()
        ])
      ])
    }

    $xetoolbar.renderVN = renderVN

    return $xetoolbar
  },
  render () {
    return this.renderVN()
  }
})
