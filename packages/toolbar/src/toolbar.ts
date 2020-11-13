import { defineComponent, h, ref, Ref, computed, inject, createCommentVNode, resolveComponent, VNode, ComponentOptions, reactive, nextTick, onUnmounted, PropType } from 'vue'
import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'
import { useSize } from '../../hooks/size'

import { VxeGridConstructor, GridPrivateMethods, ToolbarMethods, VxeToolbarConstructor, VxeToolbarEmits, VxeToolbarPropTypes, VxeTableConstructor, ToolbarPrivateRef, VxeTableMethods, VxeTablePrivateMethods, ToolbarReactData } from '../../../types/vxe-table'

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
    perfect: { type: Boolean as PropType<VxeToolbarPropTypes.Perfect>, default: () => GlobalConfig.toolbar.perfect },
    size: { type: String as PropType<VxeToolbarPropTypes.Size>, default: () => GlobalConfig.toolbar.size || GlobalConfig.size }
  },
  emits: [
    'button-click'
  ] as VxeToolbarEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const reactData = reactive({
      isRefresh: false,
      columns: []
    } as ToolbarReactData)

    const refElem = ref() as Ref<HTMLDivElement>
    const refCustomWrapper = ref() as Ref<HTMLDivElement>

    const customStore = reactive({
      isAll: false,
      isIndeterminate: false,
      activeBtn: false,
      activeWrapper: false,
      visible: false
    })

    const refMaps: ToolbarPrivateRef = {
      refElem
    }

    const $xetoolbar = {
      xID,
      props,
      context,
      reactData,
      refMaps
    } as VxeToolbarConstructor

    let toolbarMethods = {} as ToolbarMethods

    const $xegrid = inject('$xegrid', null as (VxeGridConstructor & GridPrivateMethods) | null)
    let $xetable: VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods

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

    const checkTable = () => {
      if ($xetable) {
        return true
      }
      UtilTools.error('vxe.error.barUnableLink')
    }

    const checkCustomStatus = () => {
      const { columns } = reactData
      const { computeMaps: tableComputeMaps } = $xetable
      const { computeCustomOpts: computeTableCustomOpts } = tableComputeMaps
      const tableCustomOpts = computeTableCustomOpts.value
      const { checkMethod } = tableCustomOpts
      customStore.isAll = columns.every((column) => (checkMethod ? !checkMethod({ column }) : false) || column.visible)
      customStore.isIndeterminate = !customStore.isAll && columns.some((column) => (!checkMethod || checkMethod({ column })) && (column.visible || column.halfVisible))
    }

    const showCustom = () => {
      customStore.visible = true
      checkCustomStatus()
    }

    const handleCustoms = () => {
      $xetable.saveCustomVisible()
      $xetable.analyColumnWidth()
      $xetable.refreshColumn()
    }

    const closeCustom = () => {
      const { custom } = props
      const customOpts = computeCustomOpts.value
      if (customStore.visible) {
        customStore.visible = false
        if (custom && !customOpts.immediate) {
          handleCustoms()
        }
      }
    }

    const emitCustomEvent = (type: string, evnt: Event) => {
      const comp = $xegrid || $xetable
      comp.dispatchEvent('custom', { type }, evnt)
    }

    const confirmCustomEvent = (evnt: Event) => {
      closeCustom()
      emitCustomEvent('confirm', evnt)
    }

    const customOpenEvent = (evnt: Event) => {
      if (checkTable()) {
        if (!customStore.visible) {
          showCustom()
          emitCustomEvent('open', evnt)
        }
      }
    }

    const customColseEvent = (evnt: Event) => {
      if (customStore.visible) {
        closeCustom()
        emitCustomEvent('close', evnt)
      }
    }

    const resetCustomEvent = (evnt: Event) => {
      const { columns } = reactData
      const { computeMaps: tableComputeMaps } = $xetable
      const { computeCustomOpts: computeTableCustomOpts } = tableComputeMaps
      const tableCustomOpts = computeTableCustomOpts.value
      const { checkMethod } = tableCustomOpts
      XEUtils.eachTree(columns, (column) => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = column.defaultVisible
          column.halfVisible = false
        }
        column.resizeWidth = 0
      })
      $xetable.saveCustomResizable(true)
      closeCustom()
      emitCustomEvent('reset', evnt)
    }

    const handleOptionCheck = (column: any) => {
      const { columns } = reactData
      const matchObj = XEUtils.findTree(columns, item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every((column: any) => column.visible)
          parent.halfVisible = !parent.visible && parent.children.some((column: any) => column.visible || column.halfVisible)
          handleOptionCheck(parent)
        }
      }
    }

    const changeCustomOption = (column: any) => {
      const isChecked = !column.visible
      const customOpts = computeCustomOpts.value
      XEUtils.eachTree([column], (item) => {
        item.visible = isChecked
        item.halfVisible = false
      })
      handleOptionCheck(column)
      if (props.custom && customOpts.immediate) {
        handleCustoms()
      }
      checkCustomStatus()
    }

    const allCustomEvent = () => {
      const { columns } = reactData
      const { computeMaps: tableComputeMaps } = $xetable
      const { computeCustomOpts: computeTableCustomOpts } = tableComputeMaps
      const tableCustomOpts = computeTableCustomOpts.value
      const { checkMethod } = tableCustomOpts
      const isAll = !customStore.isAll
      XEUtils.eachTree(columns, (column) => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = isAll
          column.halfVisible = false
        }
      })
      customStore.isAll = isAll
      checkCustomStatus()
    }

    const handleGlobalMousedownEvent = (evnt: MouseEvent) => {
      const customWrapperElem = refCustomWrapper.value
      if (!DomTools.getEventTargetNode(evnt, customWrapperElem).flag) {
        customColseEvent(evnt)
      }
    }

    const handleGlobalBlurEvent = (evnt: Event) => {
      customColseEvent(evnt)
    }

    const handleClickSettingEvent = (evnt: Event) => {
      if (customStore.visible) {
        customColseEvent(evnt)
      } else {
        customOpenEvent(evnt)
      }
    }

    const handleMouseenterSettingEvent = (evnt: Event) => {
      customStore.activeBtn = true
      customOpenEvent(evnt)
    }

    const handleMouseleaveSettingEvent = (evnt: Event) => {
      customStore.activeBtn = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          customColseEvent(evnt)
        }
      }, 300)
    }

    const handleWrapperMouseenterEvent = (evnt: Event) => {
      customStore.activeWrapper = true
      customOpenEvent(evnt)
    }

    const handleWrapperMouseleaveEvent = (evnt: Event) => {
      customStore.activeWrapper = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          customColseEvent(evnt)
        }
      }, 300)
    }

    const refreshEvent = () => {
      const { isRefresh } = reactData
      const refreshOpts = computeRefreshOpts.value
      if (!isRefresh) {
        const { query } = refreshOpts
        if (query) {
          reactData.isRefresh = true
          try {
            Promise.resolve(query({})).catch((e) => e).then(() => {
              reactData.isRefresh = false
            })
          } catch (e) {
            reactData.isRefresh = false
          }
        } else if ($xegrid) {
          reactData.isRefresh = true
          $xegrid.commitProxy('reload').catch((e) => e).then(() => {
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
          const commandMethod = VXETable.commands.get(code)
          const params = { code, button: item, $table: $xetable, $event: evnt }
          if (commandMethod) {
            commandMethod(params, evnt)
          }
          $xetoolbar.dispatchEvent('button-click', params, evnt)
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

    const renderDropdowns = (item: VxeToolbarPropTypes.ButtonConfig) => {
      const { dropdowns } = item
      const downVNs: VNode[] = []
      const ButtonComponent = resolveComponent('vxe-button') as ComponentOptions
      if (dropdowns) {
        dropdowns.forEach((child: any, index: number) => {
          if (child.visible !== false) {
            downVNs.push(
              h(ButtonComponent, {
                key: index,
                disabled: child.disabled,
                loading: child.loading,
                type: child.type,
                icon: child.icon,
                circle: child.circle,
                round: child.round,
                status: child.status,
                content: UtilTools.getFuncText(child.name),
                onClick: (evnt: Event) => btnEvent(evnt, child)
              })
            )
          }
        })
      }
      return downVNs
    }

    /**
     * 渲染按钮
     */
    const renderBtns = () => {
      const { buttons } = props
      if (slots.buttons) {
        return slots.buttons({ $grid: $xegrid, $table: $xetable })
      }
      const VxeButtonConstructor = resolveComponent('vxe-button') as ComponentOptions
      const btnVNs: VNode[] = []
      if (buttons) {
        buttons.forEach((item) => {
          const { dropdowns, buttonRender } = item
          if (item.visible !== false) {
            const compConf = buttonRender ? VXETable.renderer.get(buttonRender.name) : null
            if (buttonRender && compConf && compConf.renderButton) {
              btnVNs.push(
                h('span', {
                  class: 'vxe-button--item'
                }, compConf.renderButton(buttonRender, { $grid: $xegrid, $table: $xetable, button: item }))
              )
            } else {
              btnVNs.push(
                h(VxeButtonConstructor, {
                  disabled: item.disabled,
                  loading: item.loading,
                  type: item.type,
                  icon: item.icon,
                  circle: item.circle,
                  round: item.round,
                  status: item.status,
                  content: UtilTools.getFuncText(item.name),
                  destroyOnClose: item.destroyOnClose,
                  placement: item.placement,
                  transfer: item.transfer,
                  onClick: (evnt: Event) => btnEvent(evnt, item)
                }, dropdowns && dropdowns.length ? {
                  dropdowns: () => renderDropdowns(item)
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
      if (slots.tools) {
        return slots.tools({ $grid: $xegrid, $table: $xetable })
      }
      return []
    }

    const renderCustoms = () => {
      const { columns } = reactData
      const customOpts = computeCustomOpts.value
      const VxeButtonConstructor = resolveComponent('vxe-button') as ComponentOptions
      const colVNs: VNode[] = []
      const customBtnOns: any = {}
      const customWrapperOns: any = {}
      let checkMethod: any
      if ($xetable) {
        const { computeMaps: tableComputeMaps } = $xetable
        const { computeCustomOpts: computeTableCustomOpts } = tableComputeMaps
        const tableCustomOpts = computeTableCustomOpts.value
        checkMethod = tableCustomOpts.checkMethod
      }
      if (customOpts.trigger === 'manual') {
        // 手动触发
      } else if (customOpts.trigger === 'hover') {
        // hover 触发
        customBtnOns.onMouseenter = handleMouseenterSettingEvent
        customBtnOns.onMouseleave = handleMouseleaveSettingEvent
        customWrapperOns.onMouseenter = handleWrapperMouseenterEvent
        customWrapperOns.onMouseleave = handleWrapperMouseleaveEvent
      } else {
        // 点击触发
        customBtnOns.onClick = handleClickSettingEvent
      }
      XEUtils.eachTree(columns, (column) => {
        const colTitle = UtilTools.formatText(column.getTitle(), 1)
        const colKey = column.getKey()
        const isColGroup = column.children && column.children.length
        const isDisabled = checkMethod ? !checkMethod({ column }) : false
        if (isColGroup || colKey) {
          colVNs.push(
            h('li', {
              class: ['vxe-custom--option', `level--${column.level}`, {
                'is--group': isColGroup,
                'is--checked': column.visible,
                'is--indeterminate': column.halfVisible,
                'is--disabled': isDisabled
              }],
              title: colTitle,
              onClick: () => {
                if (!isDisabled) {
                  changeCustomOption(column)
                }
              }
            }, [
              h('span', {
                class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
              }),
              h('span', {
                class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
              }),
              h('span', {
                class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
              }),
              h('span', {
                class: 'vxe-checkbox--label'
              }, colTitle)
            ])
          )
        }
      })
      return h('div', {
        class: ['vxe-custom--wrapper', {
          'is--active': customStore.visible
        }],
        ref: refCustomWrapper
      }, [
        h(VxeButtonConstructor, {
          circle: true,
          icon: customOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_CUSTOM,
          title: GlobalConfig.i18n('vxe.toolbar.custom'),
          ...customBtnOns
        }),
        h('div', {
          class: 'vxe-custom--option-wrapper'
        }, [
          h('ul', {
            class: 'vxe-custom--header'
          }, [
            h('li', {
              class: ['vxe-custom--option', {
                'is--checked': customStore.isAll,
                'is--indeterminate': customStore.isIndeterminate
              }],
              title: GlobalConfig.i18n('vxe.table.allTitle'),
              onClick: allCustomEvent
            }, [
              h('span', {
                class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
              }),
              h('span', {
                class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
              }),
              h('span', {
                class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
              }),
              h('span', {
                class: 'vxe-checkbox--label'
              }, GlobalConfig.i18n('vxe.toolbar.customAll'))
            ])
          ]),
          h('ul', {
            class: 'vxe-custom--body',
            ...customWrapperOns
          }, colVNs),
          customOpts.isFooter === false ? null : h('div', {
            class: 'vxe-custom--footer'
          }, [
            h('button', {
              class: 'btn--confirm',
              onClick: confirmCustomEvent
            }, GlobalConfig.i18n('vxe.toolbar.customConfirm')),
            h('button', {
              class: 'btn--reset',
              onClick: resetCustomEvent
            }, GlobalConfig.i18n('vxe.toolbar.customRestore'))
          ])
        ])
      ])
    }

    toolbarMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $toolbar: $xetoolbar, $event: evnt }, params))
      },
      syncUpdate (params) {
        const { collectColumn } = params
        $xetable = params.$table
        reactData.columns = collectColumn
      }
    }

    Object.assign($xetoolbar, toolbarMethods)

    nextTick(() => {
      GlobalEvent.on($xetoolbar, 'mousedown', handleGlobalMousedownEvent)
      GlobalEvent.on($xetoolbar, 'blur', handleGlobalBlurEvent)
    })

    onUnmounted(() => {
      GlobalEvent.off($xetoolbar, 'mousedown')
      GlobalEvent.off($xetoolbar, 'blur')
    })

    nextTick(() => {
      const { refresh } = props
      const refreshOpts = computeRefreshOpts.value
      if (refresh && !$xegrid && !refreshOpts.query) {
        UtilTools.warn('vxe.error.notFunc', ['query'])
      }
    })

    const renderVN = () => {
      const ButtonComponent = resolveComponent('vxe-button') as ComponentOptions
      const { perfect, loading, refresh, zoom, custom } = props
      const vSize = computeSize.value
      const refreshOpts = computeRefreshOpts.value
      const importOpts = computeImportOpts.value
      const exportOpts = computeExportOpts.value
      const printOpts = computePrintOpts.value
      const zoomOpts = computeZoomOpts.value
      return h('div', {
        ref: refElem,
        class: ['vxe-toolbar', {
          [`size--${vSize}`]: vSize,
          'is--perfect': perfect,
          'is--loading': loading
        }]
      }, [
        h('div', {
          class: 'vxe-button--wrapper'
        }, renderBtns()),
        h('div', {
          class: 'vxe-tools--wrapper'
        }, renderRightTools()),
        h('div', {
          class: 'vxe-tools--operate'
        }, [
          props.import ? h(ButtonComponent, {
            circle: true,
            icon: importOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_IMPORT,
            title: GlobalConfig.i18n('vxe.toolbar.import'),
            onClick: importEvent
          }) : createCommentVNode(),
          props.export ? h(ButtonComponent, {
            circle: true,
            icon: exportOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_EXPORT,
            title: GlobalConfig.i18n('vxe.toolbar.export'),
            onClick: exportEvent
          }) : createCommentVNode(),
          props.print ? h(ButtonComponent, {
            circle: true,
            icon: printOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_PRINT,
            title: GlobalConfig.i18n('vxe.toolbar.print'),
            onClick: printEvent
          }) : createCommentVNode(),
          refresh ? h(ButtonComponent, {
            circle: true,
            icon: reactData.isRefresh ? (refreshOpts.iconLoading || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH_LOADING) : (refreshOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH),
            title: GlobalConfig.i18n('vxe.toolbar.refresh'),
            onClick: refreshEvent
          }) : createCommentVNode(),
          zoom && $xegrid ? h(ButtonComponent, {
            circle: true,
            icon: $xegrid.isMaximized() ? (zoomOpts.iconOut || GlobalConfig.icon.TOOLBAR_TOOLS_ZOOM_OUT) : (zoomOpts.iconIn || GlobalConfig.icon.TOOLBAR_TOOLS_ZOOM_IN),
            title: GlobalConfig.i18n(`vxe.toolbar.zoom${$xegrid.isMaximized() ? 'Out' : 'In'}`),
            onClick: zoomEvent
          }) : createCommentVNode(),
          custom ? renderCustoms() : createCommentVNode()
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
