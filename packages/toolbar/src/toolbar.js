import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VXETable from '../../v-x-e-table'
import vSize from '../../mixins/size'
import { getSlotVNs } from '../../tools/vn'
import { warnLog, errLog } from '../../tools/log'

const renderDropdowns = (h, _vm, item, isBtn) => {
  const { _e } = _vm
  const { dropdowns } = item
  if (dropdowns) {
    return dropdowns.map(child => {
      return child.visible === false ? _e() : h('vxe-button', {
        on: {
          click: evnt => isBtn ? _vm.btnEvent(evnt, child) : _vm.tolEvent(evnt, child)
        },
        props: {
          disabled: child.disabled,
          loading: child.loading,
          type: child.type,
          icon: child.icon,
          circle: child.circle,
          round: child.round,
          status: child.status,
          content: child.name
        }
      })
    })
  }
  return []
}

/**
 * 渲染按钮
 */
function renderBtns (h, _vm) {
  const { _e, $scopedSlots, $xegrid, $xetable, buttons = [] } = _vm
  const buttonsSlot = $scopedSlots.buttons
  if (buttonsSlot) {
    return buttonsSlot.call(_vm, { $grid: $xegrid, $table: $xetable }, h)
  }
  return buttons.map(item => {
    const { dropdowns, buttonRender } = item
    const compConf = buttonRender ? VXETable.renderer.get(buttonRender.name) : null
    if (item.visible === false) {
      return _e()
    }
    if (compConf) {
      const renderToolbarButton = compConf.renderToolbarButton || compConf.renderButton
      const toolbarButtonClassName = compConf.toolbarButtonClassName
      const params = { $grid: $xegrid, $table: $xetable, button: item }
      if (renderToolbarButton) {
        return h('span', {
          class: ['vxe-button--item', toolbarButtonClassName ? (XEUtils.isFunction(toolbarButtonClassName) ? toolbarButtonClassName(params) : toolbarButtonClassName) : '']
        }, getSlotVNs(renderToolbarButton.call(_vm, h, buttonRender, params)))
      }
    }
    return h('vxe-button', {
      on: {
        click: evnt => _vm.btnEvent(evnt, item)
      },
      props: {
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
        transfer: item.transfer
      },
      scopedSlots: dropdowns && dropdowns.length ? {
        dropdowns: () => renderDropdowns(h, _vm, item, true)
      } : null
    })
  })
}

/**
 * 渲染右侧工具
 */
function renderRightTools (h, _vm) {
  const { _e, $scopedSlots, $xetable, $xegrid, tools = [] } = _vm
  const toolsSlot = $scopedSlots.tools
  if (toolsSlot) {
    return toolsSlot.call(_vm, { $table: $xetable, $grid: $xegrid }, h)
  }
  return tools.map(item => {
    const { dropdowns, toolRender } = item
    const compConf = toolRender ? VXETable.renderer.get(toolRender.name) : null
    if (item.visible === false) {
      return _e()
    }
    if (compConf) {
      const { renderToolbarTool } = compConf
      if (renderToolbarTool) {
        const toolbarToolClassName = compConf.toolbarToolClassName
        const params = { $table: $xetable, $grid: $xegrid, tool: item }
        return h('span', {
          class: ['vxe-tool--item', toolbarToolClassName ? (XEUtils.isFunction(toolbarToolClassName) ? toolbarToolClassName(params) : toolbarToolClassName) : '']
        }, getSlotVNs(renderToolbarTool.call(_vm, h, toolRender, params)))
      }
    }
    return h('vxe-button', {
      on: {
        click: evnt => _vm.tolEvent(evnt, item)
      },
      props: {
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
        transfer: item.transfer
      },
      scopedSlots: dropdowns && dropdowns.length ? {
        dropdowns: () => renderDropdowns(h, _vm, item, false)
      } : null
    })
  })
}

function renderToolImport (h, _vm) {
  const { importOpts } = _vm
  return h('vxe-button', {
    props: {
      circle: true,
      title: GlobalConfig.i18n('vxe.toolbar.import'),
      icon: importOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_IMPORT
    },
    on: {
      click: _vm.importEvent
    }
  })
}

function renderToolExport (h, _vm) {
  const { exportOpts } = _vm
  return h('vxe-button', {
    props: {
      circle: true,
      title: GlobalConfig.i18n('vxe.toolbar.export'),
      icon: exportOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_EXPORT
    },
    on: {
      click: _vm.exportEvent
    }
  })
}

function renderToolPrint (h, _vm) {
  const { printOpts } = _vm
  return h('vxe-button', {
    props: {
      circle: true,
      title: GlobalConfig.i18n('vxe.toolbar.print'),
      icon: printOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_PRINT
    },
    on: {
      click: _vm.printEvent
    }
  })
}

function renderToolRefresh (h, _vm) {
  const { refreshOpts, isRefresh } = _vm
  return h('vxe-button', {
    props: {
      circle: true,
      title: GlobalConfig.i18n('vxe.toolbar.refresh'),
      icon: isRefresh ? (refreshOpts.iconLoading || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH_LOADING) : (refreshOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH)
    },
    on: {
      click: _vm.refreshEvent
    }
  })
}

function renderToolZoom (h, _vm) {
  const { _e, $xegrid, zoomOpts } = _vm
  return $xegrid ? h('vxe-button', {
    props: {
      circle: true,
      title: GlobalConfig.i18n(`vxe.toolbar.zoom${$xegrid.isMaximized() ? 'Out' : 'In'}`),
      icon: $xegrid.isMaximized() ? (zoomOpts.iconOut || GlobalConfig.icon.TOOLBAR_TOOLS_MINIMIZE) : (zoomOpts.iconIn || GlobalConfig.icon.TOOLBAR_TOOLS_FULLSCREEN)
    },
    on: {
      click: $xegrid.triggerZoomEvent
    }
  }) : _e()
}

function renderToolCustom (h, _vm) {
  const { customOpts } = _vm
  const customBtnOns = {}
  if (customOpts.trigger === 'manual') {
    // 手动触发
  } else if (customOpts.trigger === 'hover') {
    // hover 触发
    customBtnOns.mouseenter = _vm.handleMouseenterSettingEvent
    customBtnOns.mouseleave = _vm.handleMouseleaveSettingEvent
  } else {
    // 点击触发
    customBtnOns.click = _vm.handleClickSettingEvent
  }
  return h('vxe-button', {
    props: {
      circle: true,
      title: GlobalConfig.i18n('vxe.toolbar.custom'),
      icon: customOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_CUSTOM
    },
    on: customBtnOns
  })
}

export default {
  name: 'VxeToolbar',
  mixins: [vSize],
  props: {
    loading: Boolean,
    refresh: [Boolean, Object],
    import: [Boolean, Object],
    export: [Boolean, Object],
    print: [Boolean, Object],
    zoom: [Boolean, Object],
    custom: [Boolean, Object],
    buttons: { type: Array, default: () => GlobalConfig.toolbar.buttons },
    tools: { type: Array, default: () => GlobalConfig.toolbar.tools },
    perfect: { type: Boolean, default: () => GlobalConfig.toolbar.perfect },
    size: { type: String, default: () => GlobalConfig.toolbar.size || GlobalConfig.size },
    className: [String, Function]
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  data () {
    return {
      $xetable: null,
      isRefresh: false,
      columns: [],
      customStore: {
        isAll: false,
        isIndeterminate: false,
        visible: false
      }
    }
  },
  computed: {
    refreshOpts () {
      return Object.assign({}, GlobalConfig.toolbar.refresh, this.refresh)
    },
    importOpts () {
      return Object.assign({}, GlobalConfig.toolbar.import, this.import)
    },
    exportOpts () {
      return Object.assign({}, GlobalConfig.toolbar.export, this.export)
    },
    printOpts () {
      return Object.assign({}, GlobalConfig.toolbar.print, this.print)
    },
    zoomOpts () {
      return Object.assign({}, GlobalConfig.toolbar.zoom, this.zoom)
    },
    customOpts () {
      return Object.assign({}, GlobalConfig.toolbar.custom, this.custom)
    }
  },
  created () {
    const { refresh, refreshOpts, customOpts } = this
    this.$nextTick(() => {
      const $xetable = this.fintTable()
      const queryMethod = refreshOpts.queryMethod || refreshOpts.query
      if (refresh && !this.$xegrid && !queryMethod) {
        warnLog('vxe.error.notFunc', ['queryMethod'])
      }
      if ($xetable) {
        $xetable.connect(this)
      }
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (customOpts.isFooter) {
          warnLog('vxe.error.delProp', ['custom.isFooter', 'custom-config.showFooter'])
        }
        if (customOpts.showFooter) {
          warnLog('vxe.error.delProp', ['custom.showFooter', 'custom-config.showFooter'])
        }
        if (customOpts.immediate) {
          warnLog('vxe.error.delProp', ['custom.immediate', 'custom-config.immediate'])
        }
        if (customOpts.trigger) {
          warnLog('vxe.error.delProp', ['custom.trigger', 'custom-config.trigger'])
        }
        if (this.buttons) {
          this.buttons.forEach(item => {
            const { buttonRender } = item
            const compConf = buttonRender ? VXETable.renderer.get(buttonRender.name) : null
            if (compConf && compConf.renderButton) {
              warnLog('vxe.error.delFunc', ['renderButton', 'renderToolbarButton'])
            }
          })
        }
      }
    })
  },
  render (h) {
    const { _e, $xegrid, perfect, loading, refresh, zoom, custom, vSize, className } = this
    return h('div', {
      class: ['vxe-toolbar', className ? (XEUtils.isFunction(className) ? className({ $toolbar: this }) : className) : '', {
        [`size--${vSize}`]: vSize,
        'is--perfect': perfect,
        'is--loading': loading
      }]
    }, [
      h('div', {
        class: 'vxe-buttons--wrapper'
      }, renderBtns(h, this)),
      h('div', {
        class: 'vxe-tools--wrapper'
      }, renderRightTools(h, this)),
      h('div', {
        class: 'vxe-tools--operate'
      }, [
        this.import ? renderToolImport(h, this) : _e(),
        this.export ? renderToolExport(h, this) : _e(),
        this.print ? renderToolPrint(h, this) : _e(),
        refresh ? renderToolRefresh(h, this) : _e(),
        zoom && $xegrid ? renderToolZoom(h, this) : _e(),
        custom ? renderToolCustom(h, this) : _e()
      ])
    ])
  },
  methods: {
    syncUpdate (params) {
      const { collectColumn, $table } = params
      this.$xetable = $table
      this.columns = collectColumn
    },
    fintTable () {
      const { $children } = this.$parent
      const selfIndex = $children.indexOf(this)
      return XEUtils.find($children, (comp, index) => comp && comp.loadData && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table')
    },
    checkTable () {
      if (this.$xetable) {
        return true
      }
      errLog('vxe.error.barUnableLink')
    },
    handleClickSettingEvent ({ $event }) {
      const { $xetable } = this
      if ($xetable) {
        $xetable.triggerCustomEvent($event)
      }
    },
    handleMouseenterSettingEvent ({ $event }) {
      const { $xetable } = this
      if ($xetable) {
        $xetable.customOpenEvent($event)
      }
    },
    handleMouseleaveSettingEvent ({ $event }) {
      const { $xetable, customStore } = this
      customStore.activeBtn = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          $xetable.customColseEvent($event)
        }
      }, 350)
    },
    refreshEvent (evnt) {
      const { $xegrid, refreshOpts, isRefresh } = this
      if (!isRefresh) {
        const queryMethod = refreshOpts.queryMethod || refreshOpts.query
        if (queryMethod) {
          this.isRefresh = true
          try {
            Promise.resolve(queryMethod({})).catch(e => e).then(() => {
              this.isRefresh = false
            })
          } catch (e) {
            this.isRefresh = false
          }
        } else if ($xegrid) {
          this.isRefresh = true
          $xegrid.triggerToolbarCommitEvent({ code: refreshOpts.code || 'reload' }, evnt).catch(e => e).then(() => {
            this.isRefresh = false
          })
        }
      }
    },
    btnEvent (evnt, item) {
      const { $xegrid, $xetable } = this
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
          this.$emit('button-click', params)
        }
      }
    },
    tolEvent (evnt, item) {
      const { $xegrid, $xetable } = this
      const { code } = item
      if (code) {
        if ($xegrid) {
          $xegrid.triggerToolbarTolEvent(item, evnt)
        } else {
          const gCommandOpts = VXETable.commands.get(code)
          const params = { code, tool: item, $xegrid, $table: $xetable, $event: evnt }
          if (gCommandOpts) {
            if (gCommandOpts.commandMethod) {
              gCommandOpts.commandMethod(params)
            } else {
              if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
                errLog('vxe.error.notCommands', [code])
              }
            }
          }
          this.$emit('tool-click', params)
        }
      }
    },
    importEvent () {
      if (this.checkTable()) {
        this.$xetable.openImport(this.importOpts)
      }
    },
    exportEvent () {
      if (this.checkTable()) {
        this.$xetable.openExport(this.exportOpts)
      }
    },
    printEvent () {
      if (this.checkTable()) {
        this.$xetable.openPrint(this.printOpts)
      }
    }
  }
}
