import { PropType, CreateElement, VNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'

import type { ValueOf, VxeButtonComponent, VxeComponentSizeType } from 'vxe-pc-ui'
import type { VxeGridConstructor, GridPrivateMethods, ToolbarInternalData, VxeTablePrivateMethods, VxeTableDefines, VxeToolbarEmits, VxeToolbarPropTypes, VxeTableConstructor, VxeTablePropTypes, ToolbarReactData } from '../../../types'

const { getConfig, getIcon, getI18n, renderer, commands, createEvent, globalMixins, renderEmptyElement } = VxeUI

export default defineVxeComponent({
  name: 'VxeToolbar',
  mixins: [
    globalMixins.sizeMixin
  ],
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
  inject: {
    $xeGrid: {
      default: null
    }
  },
  data () {
    const xID = XEUtils.uniqueId()
    const reactData: ToolbarReactData = {
      isRefresh: false,
      connectFlag: 0,
      columns: []
    }
    const internalData: ToolbarInternalData = {
      connectTable: null
    }
    return {
      xID,
      reactData,
      internalData
    }
  },
  computed: {
    ...({} as {
      computeSize(): VxeComponentSizeType
      $xeGrid(): (VxeGridConstructor & GridPrivateMethods) | null
    }),
    computeRefreshOpts () {
      const $xeToolbar = this
      const props = $xeToolbar

      return Object.assign({}, getConfig().toolbar.refresh, props.refresh) as VxeToolbarPropTypes.RefreshOpts
    },
    computeImportOpts () {
      const $xeToolbar = this
      const props = $xeToolbar

      return Object.assign({}, getConfig().toolbar.import, props.import) as VxeToolbarPropTypes.ImportOpts
    },
    computeExportOpts () {
      const $xeToolbar = this
      const props = $xeToolbar

      return Object.assign({}, getConfig().toolbar.export, props.export) as VxeToolbarPropTypes.ExportOpts
    },
    computePrintOpts () {
      const $xeToolbar = this
      const props = $xeToolbar

      return Object.assign({}, getConfig().toolbar.print, props.print) as VxeToolbarPropTypes.PrintOpts
    },
    computeZoomOpts () {
      const $xeToolbar = this
      const props = $xeToolbar

      return Object.assign({}, getConfig().toolbar.zoom, props.zoom) as VxeToolbarPropTypes.ZoomOpts
    },
    computeCustomOpts () {
      const $xeToolbar = this
      const props = $xeToolbar

      return Object.assign({}, getConfig().toolbar.custom, props.custom) as VxeToolbarPropTypes.CustomOpts
    },
    computeTableCustomOpts (this: any) {
      const $xeToolbar = this
      const reactData = $xeToolbar.reactData
      const internalData = $xeToolbar.internalData

      const { connectTable } = internalData
      const $table = connectTable
      if (reactData.connectFlag || $table) {
        if ($table) {
          return $table.computeCustomOpts
        }
      }
      return { trigger: '' } as VxeTablePropTypes.CustomOpts
    },
    computeTrigger () {
      const $xeToolbar = this

      const tableCustomOpts = $xeToolbar.computeTableCustomOpts as VxeTablePropTypes.CustomOpts
      return tableCustomOpts.trigger
    }
  },
  methods: {
    //
    // Method
    //
    dispatchEvent (type: ValueOf<VxeToolbarEmits>, params: Record<string, any>, evnt: Event | null) {
      const $xeToolbar = this
      $xeToolbar.$emit(type, createEvent(evnt, { $toolbar: $xeToolbar }, params))
    },
    fintTable () {
      const { $children } = this.$parent
      const selfIndex = $children.indexOf(this)
      return XEUtils.find($children, (comp: any, index) => comp && comp.loadData && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table')
    },
    syncUpdate (params: {
      collectColumn: VxeTableDefines.ColumnInfo<any>[]
      $table: VxeTableConstructor<any> & VxeTablePrivateMethods<any>
    }) {
      const $xeToolbar = this
      const reactData = $xeToolbar.reactData
      const internalData = $xeToolbar.internalData

      internalData.connectTable = params.$table
      reactData.columns = params.collectColumn
      reactData.connectFlag++
    },
    checkTable  () {
      const $xeToolbar = this
      const internalData = $xeToolbar.internalData

      const { connectTable } = internalData
      const $table = connectTable
      if ($table) {
        return true
      }
      errLog('vxe.error.barUnableLink')
    },
    handleClickSettingEvent ({ $event }: any) {
      const $xeToolbar = this
      const internalData = $xeToolbar.internalData

      const { connectTable } = internalData
      const $table: any = connectTable
      if ($table) {
        if ($table.triggerCustomEvent) {
          $table.triggerCustomEvent($event)
        } else {
          errLog('vxe.error.reqModule', ['VxeTableCustomModule'])
        }
      }
    },
    handleMouseenterSettingEvent  ({ $event }: any) {
      const $xeToolbar = this
      const internalData = $xeToolbar.internalData

      const { connectTable } = internalData
      const $table: any = connectTable
      if ($table) {
        $table.customOpenEvent($event)
      } else {
        errLog('vxe.error.reqModule', ['VxeTableCustomModule'])
      }
    },
    handleMouseleaveSettingEvent  ({ $event }: any) {
      const $xeToolbar = this
      const internalData = $xeToolbar.internalData

      const { connectTable } = internalData
      const $table: any = connectTable
      if ($table) {
        const { customStore } = $table.reactData
        customStore.activeBtn = false
        setTimeout(() => {
          if (!customStore.activeBtn && !customStore.activeWrapper) {
            $table.customCloseEvent($event)
          }
        }, 350)
      }
    },
    refreshEvent ({ $event }: any) {
      const $xeToolbar = this
      const reactData = $xeToolbar.reactData
      const $xeGrid = $xeToolbar.$xeGrid

      const { isRefresh } = reactData
      const refreshOpts = $xeToolbar.computeRefreshOpts
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
    },
    zoomEvent ({ $event }: any) {
      const $xeToolbar = this
      const $xeGrid = $xeToolbar.$xeGrid

      if ($xeGrid) {
        $xeGrid.triggerZoomEvent($event)
      }
    },
    btnEvent  (evnt: Event, item: VxeToolbarPropTypes.ButtonConfig) {
      const $xeToolbar = this
      const internalData = $xeToolbar.internalData
      const $xeGrid = $xeToolbar.$xeGrid

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
              if (process.env.VUE_APP_VXE_ENV === 'development') {
                errLog('vxe.error.notCommands', [code])
              }
            }
          }
          $xeToolbar.dispatchEvent('button-click', params, evnt)
        }
      }
    },
    tolEvent  (evnt: Event, item: VxeToolbarPropTypes.ButtonConfig) {
      const $xeToolbar = this
      const internalData = $xeToolbar.internalData
      const $xeGrid = $xeToolbar.$xeGrid

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
              if (process.env.VUE_APP_VXE_ENV === 'development') {
                errLog('vxe.error.notCommands', [code])
              }
            }
          }
          $xeToolbar.dispatchEvent('tool-click', params, evnt)
        }
      }
    },
    importEvent () {
      const $xeToolbar = this
      const internalData = $xeToolbar.internalData

      if ($xeToolbar.checkTable()) {
        const { connectTable } = internalData
        const $table: any = connectTable
        if ($table) {
          $table.openImport()
        }
      }
    },
    exportEvent () {
      const $xeToolbar = this
      const internalData = $xeToolbar.internalData

      if ($xeToolbar.checkTable()) {
        const { connectTable } = internalData as any
        const $table = connectTable
        if ($table) {
          $table.openExport()
        }
      }
    },
    printEvent  () {
      const $xeToolbar = this
      const internalData = $xeToolbar.internalData

      if ($xeToolbar.checkTable()) {
        const { connectTable } = internalData as any
        const $table = connectTable
        if ($table) {
          $table.openPrint()
        }
      }
    },

    //
    // Render
    //
    renderDropdowns (h: CreateElement, item: VxeToolbarPropTypes.ButtonConfig, isBtn: boolean) {
      // 使用已安装的组件，如果未安装则不渲染
      const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

      const $xeToolbar = this

      const { dropdowns } = item
      const downVNs: VNode[] = []
      if (dropdowns) {
        return dropdowns.map((child, index) => {
          if (child.visible === false) {
            return renderEmptyElement($xeToolbar)
          }
          return VxeUIButtonComponent
            ? h(VxeUIButtonComponent, {
              key: index,
              props: {
                disabled: child.disabled,
                loading: child.loading,
                type: child.type,
                mode: child.mode,
                icon: child.icon,
                circle: child.circle,
                round: child.round,
                status: child.status,
                content: child.name,
                routerLink: item.routerLink,
                permissionCode: item.permissionCode
              },
              on: {
                click: ({ $event }: any) => isBtn ? $xeToolbar.btnEvent($event, child) : $xeToolbar.tolEvent($event, child)
              }
            })
            : renderEmptyElement($xeToolbar)
        })
      }
      return downVNs
    },
    /**
     * 渲染按钮
     */
    renderBtns  (h: CreateElement): VNode[] {
      // 使用已安装的组件，如果未安装则不渲染
      const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

      const $xeToolbar = this
      const props = $xeToolbar
      const internalData = $xeToolbar.internalData
      const $xeGrid = $xeToolbar.$xeGrid

      const { buttons } = props
      const { connectTable } = internalData
      const $table = connectTable
      const btnVNs: VNode[] = []
      if (buttons) {
        buttons.forEach((item) => {
          const { dropdowns, buttonRender } = item
          if (item.visible !== false) {
            const compConf = buttonRender ? renderer.get(buttonRender.name) : null
            if (buttonRender && compConf && compConf.renderToolbarButton) {
              const toolbarButtonClassName = compConf.toolbarButtonClassName
              const params = { $grid: $xeGrid, $table: $table!, button: item }
              btnVNs.push(
                h('span', {
                  class: ['vxe-button--item', toolbarButtonClassName ? (XEUtils.isFunction(toolbarButtonClassName) ? toolbarButtonClassName(params) : toolbarButtonClassName) : '']
                }, getSlotVNs(compConf.renderToolbarButton(h, buttonRender, params)))
              )
            } else {
              if (VxeUIButtonComponent) {
                btnVNs.push(
                  h(VxeUIButtonComponent, {
                    props: {
                      disabled: item.disabled,
                      loading: item.loading,
                      type: item.type,
                      mode: item.mode,
                      icon: item.icon,
                      circle: item.circle,
                      round: item.round,
                      status: item.status,
                      content: item.name,
                      routerLink: item.routerLink,
                      permissionCode: item.permissionCode,
                      destroyOnClose: item.destroyOnClose,
                      placement: item.placement,
                      transfer: item.transfer
                    },
                    on: {
                      click: ({ $event }: any) => this.btnEvent($event, item)
                    },
                    scopedSlots: dropdowns && dropdowns.length
                      ? {
                          dropdowns: () => this.renderDropdowns(h, item, true)
                        }
                      : {}
                  })
                )
              }
            }
          }
        })
      }
      return btnVNs
    },
    /**
     * 渲染右侧工具
     */
    renderRightTools (h: CreateElement) {
      // 使用已安装的组件，如果未安装则不渲染
      const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

      const $xeToolbar = this
      const props = $xeToolbar
      const internalData = $xeToolbar.internalData
      const $xeGrid = $xeToolbar.$xeGrid

      const { tools } = props
      const { connectTable } = internalData
      const $table = connectTable
      const btnVNs: VNode[] = []
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
                }, getSlotVNs(compConf.renderToolbarTool(h, toolRender, params)))
              )
            } else {
              if (VxeUIButtonComponent) {
                btnVNs.push(
                  h(VxeUIButtonComponent, {
                    key: tIndex,
                    props: {
                      disabled: item.disabled,
                      loading: item.loading,
                      type: item.type,
                      mode: item.mode,
                      icon: item.icon,
                      circle: item.circle,
                      round: item.round,
                      status: item.status,
                      content: item.name,
                      routerLink: item.routerLink,
                      permissionCode: item.permissionCode,
                      destroyOnClose: item.destroyOnClose,
                      placement: item.placement,
                      transfer: item.transfer
                    },
                    on: {
                      click: ({ $event }: any) => $xeToolbar.tolEvent($event, item)
                    },
                    scopedSlots: dropdowns && dropdowns.length
                      ? {
                          dropdowns: () => $xeToolbar.renderDropdowns(h, item, false)
                        }
                      : {}
                  })
                )
              }
            }
          }
        })
      }
      return btnVNs
    },
    renderToolImport  (h: CreateElement) {
      // 使用已安装的组件，如果未安装则不渲染
      const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

      const $xeToolbar = this

      const importOpts = $xeToolbar.computeImportOpts
      return VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'import',
          props: {
            circle: true,
            icon: importOpts.icon || getIcon().TOOLBAR_TOOLS_IMPORT,
            title: getI18n('vxe.toolbar.import')
          },
          on: {
            click: $xeToolbar.importEvent
          }
        })
        : renderEmptyElement($xeToolbar)
    },
    renderToolExport  (h: CreateElement) {
      // 使用已安装的组件，如果未安装则不渲染
      const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

      const $xeToolbar = this

      const exportOpts = $xeToolbar.computeExportOpts
      return VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'export',
          props: {
            circle: true,
            icon: exportOpts.icon || getIcon().TOOLBAR_TOOLS_EXPORT,
            title: getI18n('vxe.toolbar.export')
          },
          on: {
            click: $xeToolbar.exportEvent
          }
        })
        : renderEmptyElement($xeToolbar)
    },
    renderToolPrint (h: CreateElement) {
      // 使用已安装的组件，如果未安装则不渲染
      const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

      const $xeToolbar = this

      const printOpts = $xeToolbar.computePrintOpts
      return VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'print',
          props: {
            circle: true,
            icon: printOpts.icon || getIcon().TOOLBAR_TOOLS_PRINT,
            title: getI18n('vxe.toolbar.print')
          },
          on: {
            click: $xeToolbar.printEvent
          }
        })
        : renderEmptyElement($xeToolbar)
    },
    renderToolRefresh  (h: CreateElement) {
      // 使用已安装的组件，如果未安装则不渲染
      const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

      const $xeToolbar = this
      const reactData = $xeToolbar.reactData

      const refreshOpts = $xeToolbar.computeRefreshOpts
      return VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'refresh',
          props: {
            circle: true,
            icon: reactData.isRefresh ? (refreshOpts.iconLoading || getIcon().TOOLBAR_TOOLS_REFRESH_LOADING) : (refreshOpts.icon || getIcon().TOOLBAR_TOOLS_REFRESH),
            title: getI18n('vxe.toolbar.refresh')
          },
          on: {
            click: $xeToolbar.refreshEvent
          }
        })
        : renderEmptyElement($xeToolbar)
    },
    renderToolZoom  (h: CreateElement) {
      // 使用已安装的组件，如果未安装则不渲染
      const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

      const $xeToolbar = this
      const $xeGrid = $xeToolbar.$xeGrid

      const zoomOpts = $xeToolbar.computeZoomOpts
      return $xeGrid && VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'zoom',
          props: {
            circle: true,
            icon: $xeGrid.isMaximized() ? (zoomOpts.iconOut || getIcon().TOOLBAR_TOOLS_MINIMIZE) : (zoomOpts.iconIn || getIcon().TOOLBAR_TOOLS_FULLSCREEN),
            title: getI18n(`vxe.toolbar.zoom${$xeGrid.isMaximized() ? 'Out' : 'In'}`)
          },
          on: {
            click: $xeToolbar.zoomEvent
          }
        })
        : renderEmptyElement($xeToolbar)
    },
    renderToolCustom (h: CreateElement) {
      // 使用已安装的组件，如果未安装则不渲染
      const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

      const $xeToolbar = this

      const customOpts = $xeToolbar.computeCustomOpts
      const btnTrigger = $xeToolbar.computeTrigger
      const customBtnOns: {
        click?: typeof $xeToolbar.handleClickSettingEvent;
        mouseenter?: typeof $xeToolbar.handleMouseenterSettingEvent;
        mouseleave?: typeof $xeToolbar.handleMouseleaveSettingEvent;
      } = {}
      if (btnTrigger === 'manual') {
        // 手动触发
      } else if (btnTrigger === 'hover') {
        // hover 触发
        customBtnOns.mouseenter = $xeToolbar.handleMouseenterSettingEvent
        customBtnOns.mouseleave = $xeToolbar.handleMouseleaveSettingEvent
      } else {
        // 点击触发
        customBtnOns.click = $xeToolbar.handleClickSettingEvent
      }
      return VxeUIButtonComponent
        ? h(VxeUIButtonComponent, {
          key: 'custom',
          props: {
            circle: true,
            icon: customOpts.icon || getIcon().TOOLBAR_TOOLS_CUSTOM,
            title: getI18n('vxe.toolbar.custom'),
            className: 'vxe-toolbar-custom-target'
          },
          on: customBtnOns
        })
        : renderEmptyElement($xeToolbar)
    },
    renderVN  (h: CreateElement): VNode {
      const $xeToolbar = this
      const props = $xeToolbar
      const slots = $xeToolbar.$scopedSlots
      const internalData = $xeToolbar.internalData
      const $xeGrid = $xeToolbar.$xeGrid

      const { perfect, loading, refresh, zoom, custom, className } = props
      const { connectTable } = internalData
      const $table = connectTable
      const toolsSlot = slots.tools
      const buttonsSlot = slots.buttons
      const vSize = $xeToolbar.computeSize
      return h('div', {
        ref: 'refElem',
        class: ['vxe-toolbar', className ? (XEUtils.isFunction(className) ? className({ $toolbar: $xeToolbar }) : className) : '', {
          [`size--${vSize}`]: vSize,
          'is--perfect': perfect,
          'is--loading': loading
        }]
      }, [
        h('div', {
          class: 'vxe-buttons--wrapper'
        }, buttonsSlot ? buttonsSlot({ $grid: $xeGrid, $table: $table }) : $xeToolbar.renderBtns(h)),
        h('div', {
          class: 'vxe-tools--wrapper'
        }, toolsSlot ? toolsSlot({ $grid: $xeGrid, $table: $table }) : $xeToolbar.renderRightTools(h)),
        h('div', {
          class: 'vxe-tools--operate'
        }, [
          props.import ? $xeToolbar.renderToolImport(h) : renderEmptyElement($xeToolbar),
          props.export ? $xeToolbar.renderToolExport(h) : renderEmptyElement($xeToolbar),
          props.print ? $xeToolbar.renderToolPrint(h) : renderEmptyElement($xeToolbar),
          refresh ? $xeToolbar.renderToolRefresh(h) : renderEmptyElement($xeToolbar),
          zoom && $xeGrid ? $xeToolbar.renderToolZoom(h) : renderEmptyElement($xeToolbar),
          custom ? $xeToolbar.renderToolCustom(h) : renderEmptyElement($xeToolbar)
        ])
      ])
    }
  },
  created () {
    const $xeToolbar = this
    const props = $xeToolbar
    const $xeGrid = $xeToolbar.$xeGrid

    $xeToolbar.$nextTick(() => {
      const { refresh } = props
      const refreshOpts = $xeToolbar.computeRefreshOpts
      const $xetable = this.fintTable() as any
      const queryMethod = refreshOpts.queryMethod || refreshOpts.query
      if (refresh && !$xeGrid && !queryMethod) {
        warnLog('vxe.error.notFunc', ['queryMethod'])
      }
      if ($xetable) {
        $xetable.connect(this)
      }
      const customOpts = $xeToolbar.computeCustomOpts
      if (process.env.VUE_APP_VXE_ENV === 'development') {
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

    if (process.env.VUE_APP_VXE_ENV === 'development') {
      // 使用已安装的组件，如果未安装则不渲染
      const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

      if (props.refresh || props.import || props.export || props.print || props.zoom) {
        if (!VxeUIButtonComponent) {
          errLog('vxe.error.reqComp', ['vxe-button'])
        }
      }
    }
  },
  render (this: any, h) {
    return this.renderVN(h)
  }
})
