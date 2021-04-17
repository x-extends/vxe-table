import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VXETable from '../../v-x-e-table'
import vSize from '../../mixins/size'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

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
      if (renderToolbarButton) {
        return h('span', {
          class: 'vxe-button--item'
        }, renderToolbarButton.call(_vm, h, buttonRender, { $grid: $xegrid, $table: $xetable, button: item }))
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
  const { _e, $scopedSlots, $xegrid, $xetable, tools = [] } = _vm
  const toolsSlot = $scopedSlots.tools
  if (toolsSlot) {
    return toolsSlot.call(_vm, { $grid: $xegrid, $table: $xetable }, h)
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
        return h('span', {
          class: 'vxe-tool--item'
        }, renderToolbarTool.call(_vm, h, toolRender, { $grid: $xegrid, $table: $xetable, tool: item }))
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

function renderCustoms (h, _vm) {
  const { $xetable, customStore, customOpts, columns } = _vm
  const cols = []
  const customBtnOns = {}
  const customWrapperOns = {}
  const checkMethod = $xetable ? $xetable.customOpts.checkMethod : null
  if (customOpts.trigger === 'manual') {
    // 手动触发
  } else if (customOpts.trigger === 'hover') {
    // hover 触发
    customBtnOns.mouseenter = _vm.handleMouseenterSettingEvent
    customBtnOns.mouseleave = _vm.handleMouseleaveSettingEvent
    customWrapperOns.mouseenter = _vm.handleWrapperMouseenterEvent
    customWrapperOns.mouseleave = _vm.handleWrapperMouseleaveEvent
  } else {
    // 点击触发
    customBtnOns.click = _vm.handleClickSettingEvent
  }
  XEUtils.eachTree(columns, (column) => {
    const colTitle = UtilTools.formatText(column.getTitle(), 1)
    const colKey = column.getKey()
    const isColGroup = column.children && column.children.length
    const isDisabled = checkMethod ? !checkMethod({ column }) : false
    if (isColGroup || colKey) {
      cols.push(
        h('li', {
          class: ['vxe-custom--option', `level--${column.level}`, {
            'is--group': isColGroup,
            'is--checked': column.visible,
            'is--indeterminate': column.halfVisible,
            'is--disabled': isDisabled
          }],
          attrs: {
            title: colTitle
          },
          on: {
            click: () => {
              if (!isDisabled) {
                _vm.changeCustomOption(column)
              }
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
    ref: 'customWrapper'
  }, [
    h('vxe-button', {
      props: {
        circle: true,
        icon: customOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_CUSTOM
      },
      attrs: {
        title: GlobalConfig.i18n('vxe.toolbar.custom')
      },
      on: customBtnOns
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
          attrs: {
            title: GlobalConfig.i18n('vxe.table.allTitle')
          },
          on: {
            click: _vm.allCustomEvent
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
          }, GlobalConfig.i18n('vxe.toolbar.customAll'))
        ])
      ]),
      h('ul', {
        class: 'vxe-custom--body',
        on: customWrapperOns
      }, cols),
      customOpts.isFooter === false ? null : h('div', {
        class: 'vxe-custom--footer'
      }, [
        h('button', {
          class: 'btn--confirm',
          on: {
            click: _vm.confirmCustomEvent
          }
        }, GlobalConfig.i18n('vxe.toolbar.customConfirm')),
        h('button', {
          class: 'btn--reset',
          on: {
            click: _vm.resetCustomEvent
          }
        }, GlobalConfig.i18n('vxe.toolbar.customRestore'))
      ])
    ])
  ])
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
    const { refresh, refreshOpts } = this
    this.$nextTick(() => {
      const $xetable = this.fintTable()
      if (refresh && !this.$xegrid && !refreshOpts.query) {
        UtilTools.warn('vxe.error.notFunc', ['query'])
      }
      if ($xetable) {
        $xetable.connect(this)
      }
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (this.buttons) {
          this.buttons.forEach(item => {
            const { buttonRender } = item
            const compConf = buttonRender ? VXETable.renderer.get(buttonRender.name) : null
            if (compConf && compConf.renderButton) {
              UtilTools.warn('vxe.error.delFunc', ['renderButton', 'renderToolbarButton'])
            }
          })
        }
      }
    })
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
  },
  render (h) {
    const { _e, $xegrid, perfect, loading, importOpts, exportOpts, refresh, refreshOpts, zoom, zoomOpts, custom, vSize, className } = this
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
        this.import ? h('vxe-button', {
          props: {
            circle: true,
            icon: importOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_IMPORT
          },
          attrs: {
            title: GlobalConfig.i18n('vxe.toolbar.import')
          },
          on: {
            click: this.importEvent
          }
        }) : _e(),
        this.export ? h('vxe-button', {
          props: {
            circle: true,
            icon: exportOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_EXPORT
          },
          attrs: {
            title: GlobalConfig.i18n('vxe.toolbar.export')
          },
          on: {
            click: this.exportEvent
          }
        }) : _e(),
        this.print ? h('vxe-button', {
          props: {
            circle: true,
            icon: this.printOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_PRINT
          },
          attrs: {
            title: GlobalConfig.i18n('vxe.toolbar.print')
          },
          on: {
            click: this.printEvent
          }
        }) : _e(),
        refresh ? h('vxe-button', {
          props: {
            circle: true,
            icon: this.isRefresh ? (refreshOpts.iconLoading || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH_LOADING) : (refreshOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH)
          },
          attrs: {
            title: GlobalConfig.i18n('vxe.toolbar.refresh')
          },
          on: {
            click: this.refreshEvent
          }
        }) : _e(),
        zoom && $xegrid ? h('vxe-button', {
          props: {
            circle: true,
            icon: $xegrid.isMaximized() ? (zoomOpts.iconOut || GlobalConfig.icon.TOOLBAR_TOOLS_ZOOM_OUT) : (zoomOpts.iconIn || GlobalConfig.icon.TOOLBAR_TOOLS_ZOOM_IN)
          },
          attrs: {
            title: GlobalConfig.i18n(`vxe.toolbar.zoom${$xegrid.isMaximized() ? 'Out' : 'In'}`)
          },
          on: {
            click: $xegrid.triggerZoomEvent
          }
        }) : _e(),
        custom ? renderCustoms(h, this) : _e()
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
      UtilTools.error('vxe.error.barUnableLink')
    },
    showCustom () {
      this.customStore.visible = true
      this.checkCustomStatus()
    },
    closeCustom () {
      const { custom, customStore } = this
      if (customStore.visible) {
        customStore.visible = false
        if (custom && !customStore.immediate) {
          this.handleTableCustom()
        }
      }
    },
    confirmCustomEvent (evnt) {
      this.closeCustom()
      this.emitCustomEvent('confirm', evnt)
    },
    customOpenEvent (evnt) {
      const { customStore } = this
      if (this.checkTable()) {
        if (!customStore.visible) {
          this.showCustom()
          this.emitCustomEvent('open', evnt)
        }
      }
    },
    customColseEvent (evnt) {
      const { customStore } = this
      if (customStore.visible) {
        this.closeCustom()
        this.emitCustomEvent('close', evnt)
      }
    },
    resetCustomEvent (evnt) {
      const { $xetable, columns } = this
      const checkMethod = $xetable.customOpts.checkMethod
      XEUtils.eachTree(columns, column => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = column.defaultVisible
          column.halfVisible = false
        }
        column.resizeWidth = 0
      })
      $xetable.saveCustomResizable(true)
      this.closeCustom()
      this.emitCustomEvent('reset', evnt)
    },
    emitCustomEvent (type, evnt) {
      const { $xetable, $xegrid } = this
      const comp = $xegrid || $xetable
      comp.$emit('custom', { type, $table: $xetable, $grid: $xegrid, $event: evnt })
    },
    changeCustomOption (column) {
      const isChecked = !column.visible
      XEUtils.eachTree([column], (item) => {
        item.visible = isChecked
        item.halfVisible = false
      })
      this.handleOptionCheck(column)
      if (this.custom && this.customOpts.immediate) {
        this.handleTableCustom()
      }
      this.checkCustomStatus()
    },
    handleOptionCheck (column) {
      const matchObj = XEUtils.findTree(this.columns, item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every(column => column.visible)
          parent.halfVisible = !parent.visible && parent.children.some(column => column.visible || column.halfVisible)
          this.handleOptionCheck(parent)
        }
      }
    },
    handleTableCustom () {
      const { $xetable } = this
      $xetable.handleCustom()
    },
    checkCustomStatus () {
      const { $xetable, columns } = this
      const checkMethod = $xetable.customOpts.checkMethod
      this.customStore.isAll = columns.every(column => (checkMethod ? !checkMethod({ column }) : false) || column.visible)
      this.customStore.isIndeterminate = !this.customStore.isAll && columns.some(column => (!checkMethod || checkMethod({ column })) && (column.visible || column.halfVisible))
    },
    allCustomEvent () {
      const { $xetable, columns, customStore } = this
      const checkMethod = $xetable.customOpts.checkMethod
      const isAll = !customStore.isAll
      XEUtils.eachTree(columns, column => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = isAll
          column.halfVisible = false
        }
      })
      customStore.isAll = isAll
      this.checkCustomStatus()
    },
    handleGlobalMousedownEvent (evnt) {
      if (!DomTools.getEventTargetNode(evnt, this.$refs.customWrapper).flag) {
        this.customColseEvent(evnt)
      }
    },
    handleGlobalBlurEvent (evnt) {
      this.customColseEvent(evnt)
    },
    handleClickSettingEvent (evnt) {
      if (this.customStore.visible) {
        this.customColseEvent(evnt)
      } else {
        this.customOpenEvent(evnt)
      }
    },
    handleMouseenterSettingEvent (evnt) {
      this.customStore.activeBtn = true
      this.customOpenEvent(evnt)
    },
    handleMouseleaveSettingEvent (evnt) {
      const { customStore } = this
      customStore.activeBtn = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          this.customColseEvent(evnt)
        }
      }, 300)
    },
    handleWrapperMouseenterEvent (evnt) {
      this.customStore.activeWrapper = true
      this.customOpenEvent(evnt)
    },
    handleWrapperMouseleaveEvent (evnt) {
      const { customStore } = this
      customStore.activeWrapper = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          this.customColseEvent(evnt)
        }
      }, 300)
    },
    refreshEvent () {
      const { $xegrid, refreshOpts, isRefresh } = this
      if (!isRefresh) {
        if (refreshOpts.query) {
          this.isRefresh = true
          try {
            Promise.resolve(refreshOpts.query()).catch(e => e).then(() => {
              this.isRefresh = false
            })
          } catch (e) {
            this.isRefresh = false
          }
        } else if ($xegrid) {
          this.isRefresh = true
          $xegrid.commitProxy('reload').catch(e => e).then(() => {
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
          const commandMethod = VXETable.commands.get(code)
          const params = { code, button: item, $xegrid, $table: $xetable, $event: evnt }
          if (commandMethod) {
            commandMethod.call(this, params, evnt)
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
          const commandMethod = VXETable.commands.get(code)
          const params = { code, tool: item, $xegrid, $table: $xetable, $event: evnt }
          if (commandMethod) {
            commandMethod.call(this, params, evnt)
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
