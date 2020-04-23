import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

/**
 * 渲染按钮
 */
function renderBtns (h, _vm) {
  const { _e, $scopedSlots, $xegrid, $xetable, buttons = [] } = _vm
  if ($scopedSlots.buttons) {
    return $scopedSlots.buttons.call(_vm, { $grid: $xegrid, $table: $xetable }, h)
  }
  return buttons.map(item => {
    const { name, visible, icon, type, status, disabled, loading, dropdowns, buttonRender } = item
    const compConf = buttonRender ? VXETable.renderer.get(buttonRender.name) : null
    if (visible === false) {
      return _e()
    }
    if (compConf && compConf.renderButton) {
      return h('span', {
        class: 'vxe-button--item'
      }, compConf.renderButton.call(_vm, h, buttonRender, { $grid: $xegrid, $table: $xetable, button: item }, { $grid: $xegrid, $table: $xetable }))
    }
    return h('vxe-button', {
      on: {
        click: evnt => _vm.btnEvent(evnt, item)
      },
      props: {
        icon,
        type,
        status,
        disabled,
        loading
      },
      scopedSlots: dropdowns && dropdowns.length ? {
        default: () => UtilTools.getFuncText(name),
        dropdowns: () => dropdowns.map(child => {
          return child.visible === false ? _e() : h('vxe-button', {
            on: {
              click: evnt => _vm.btnEvent(evnt, child)
            },
            props: {
              icon: child.icon,
              type: child.type,
              disabled: child.disabled,
              loading: child.loading
            }
          }, UtilTools.getFuncText(child.name))
        })
      } : null
    }, UtilTools.getFuncText(name))
  })
}

/**
 * 渲染右侧工具
 */
function renderRightTools (h, _vm) {
  const { $scopedSlots, $xegrid, $xetable } = _vm
  if ($scopedSlots.tools) {
    return $scopedSlots.tools.call(_vm, { $grid: $xegrid, $table: $xetable }, h)
  }
  return []
}

function renderCustoms (h, _vm) {
  const { $xetable, customStore, customOpts, collectColumn } = _vm
  const cols = []
  const customBtnOns = {}
  const customWrapperOns = {}
  const checkMethod = ($xetable && $xetable.customOpts ? $xetable.customOpts.checkMethod : null) || customOpts.checkMethod
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
  XEUtils.eachTree(collectColumn, (column) => {
    const colTitle = column.getTitle()
    const colKey = column.getKey()
    const isColGroup = column.children && column.children.length
    const isDisabled = checkMethod ? !checkMethod({ column }) : false
    if (isColGroup || (colTitle && colKey)) {
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
    h('div', {
      class: 'vxe-tools--operate-btn vxe-tools--operate-custom-btn',
      attrs: {
        title: GlobalConfig.i18n('vxe.toolbar.custom')
      },
      on: customBtnOns
    }, [
      h('i', {
        class: customOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_CUSTOM
      })
    ]),
    h('div', {
      class: 'vxe-custom--option-wrapper'
    }, [
      h('div', {
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
  props: {
    id: String,
    loading: Boolean,
    resizable: [Boolean, Object],
    refresh: [Boolean, Object],
    import: [Boolean, Object],
    export: [Boolean, Object],
    zoom: [Boolean, Object],
    setting: [Boolean, Object],
    custom: [Boolean, Object],
    buttons: { type: Array, default: () => GlobalConfig.toolbar.buttons },
    perfect: { type: Boolean, default: () => GlobalConfig.toolbar.perfect },
    size: { type: String, default: () => GlobalConfig.toolbar.size || GlobalConfig.size }
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
      collectColumn: [],
      customStore: {
        isAll: false,
        isIndeterminate: false,
        visible: false
      }
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    refreshOpts () {
      return Object.assign({}, GlobalConfig.toolbar.refresh, this.refresh)
    },
    importOpts () {
      return Object.assign({}, GlobalConfig.toolbar.import, this.import)
    },
    exportOpts () {
      return Object.assign({}, GlobalConfig.toolbar.export, this.export)
    },
    // 在 v3.0 中废弃 toolbar.resizable
    resizableOpts () {
      return Object.assign({}, GlobalConfig.toolbar.resizable, this.resizable)
    },
    zoomOpts () {
      return Object.assign({}, GlobalConfig.toolbar.zoom, this.zoom)
    },
    // 在 v3.0 中废弃 toolbar.custom
    customOpts () {
      return Object.assign({}, GlobalConfig.toolbar.custom, this.custom)
    }
  },
  created () {
    const { customOpts, refresh, resizable, setting, id, refreshOpts } = this
    if (customOpts.storage && !id) {
      return UtilTools.error('vxe.error.reqProp', ['toolbar.id'])
    }
    if (id) {
      UtilTools.warn('vxe.error.removeProp', ['toolbar.id'])
    }
    // 在 v3 中废弃 setting
    if (setting) {
      UtilTools.warn('vxe.error.delProp', ['toolbar.setting', 'toolbar.custom'])
    }
    if (!VXETable._export && (this.export || this.import)) {
      UtilTools.error('vxe.error.reqModule', ['Export'])
    }
    if (resizable) {
      UtilTools.warn('vxe.error.delProp', ['toolbar.resizable', 'custom-config.storage'])
    }
    if (customOpts.storage) {
      UtilTools.warn('vxe.error.delProp', ['toolbar.custom.storage', 'custom-config.storage'])
    }
    this.$nextTick(() => {
      const $xetable = this.fintTable()
      if (refresh && !this.$xegrid && !refreshOpts.query) {
        UtilTools.warn('vxe.error.notFunc', ['query'])
      }
      if ($xetable) {
        $xetable.connect(this)
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
    const { $xegrid, perfect, loading, importOpts, exportOpts, refresh, refreshOpts, zoom, zoomOpts, custom, setting, vSize } = this
    return h('div', {
      class: ['vxe-toolbar', {
        [`size--${vSize}`]: vSize,
        'is--perfect': perfect,
        'is--loading': loading
      }]
    }, [
      h('div', {
        class: 'vxe-button--wrapper'
      }, renderBtns(h, this)),
      h('div', {
        class: 'vxe-tools--wrapper'
      }, renderRightTools(h, this)),
      h('div', {
        class: 'vxe-tools--operate'
      }, [
        this.import ? h('div', {
          class: 'vxe-tools--operate-btn vxe-tools--operate-import-btn',
          attrs: {
            title: GlobalConfig.i18n('vxe.toolbar.import')
          },
          on: {
            click: this.importEvent
          }
        }, [
          h('i', {
            class: importOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_IMPORT
          })
        ]) : null,
        this.export ? h('div', {
          class: 'vxe-tools--operate-btn vxe-tools--operate-export-btn',
          attrs: {
            title: GlobalConfig.i18n('vxe.toolbar.export')
          },
          on: {
            click: this.exportEvent
          }
        }, [
          h('i', {
            class: exportOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_EXPORT
          })
        ]) : null,
        refresh ? h('div', {
          class: 'vxe-tools--operate-btn vxe-tools--operate-refresh-btn',
          attrs: {
            title: GlobalConfig.i18n('vxe.toolbar.refresh')
          },
          on: {
            click: this.refreshEvent
          }
        }, [
          h('i', {
            class: this.isRefresh ? (refreshOpts.iconLoading || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH_LOADING) : (refreshOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH)
          })
        ]) : null,
        zoom && $xegrid ? h('div', {
          class: 'vxe-tools--operate-btn vxe-tools--operate-zoom-btn',
          attrs: {
            title: GlobalConfig.i18n(`vxe.toolbar.zoom${$xegrid.isMaximized() ? 'Out' : 'In'}`)
          },
          on: {
            click: $xegrid.triggerZoomEvent
          }
        }, [
          h('i', {
            class: $xegrid.isMaximized() ? (zoomOpts.iconOut || GlobalConfig.icon.TOOLBAR_TOOLS_ZOOM_OUT) : (zoomOpts.iconIn || GlobalConfig.icon.TOOLBAR_TOOLS_ZOOM_IN)
          })
        ]) : null,
        custom || setting ? renderCustoms(h, this) : null
      ])
    ])
  },
  methods: {
    syncUpdate (params) {
      const { collectColumn, $table } = params
      this.$xetable = $table
      this.collectColumn = collectColumn
    },
    fintTable () {
      const { $children } = this.$parent
      const selfIndex = $children.indexOf(this)
      return XEUtils.find($children, (comp, index) => comp && comp.refreshColumn && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table')
    },
    checkTable () {
      if (this.$xetable) {
        return true
      }
      UtilTools.error('vxe.error.barUnableLink')
    },
    openCustom () {
      this.customStore.visible = true
      this.checkCustomStatus()
    },
    closeCustom () {
      const { custom, setting, customStore } = this
      if (customStore.visible) {
        customStore.visible = false
        if ((custom || setting) && !customStore.immediate) {
          this.handleCustoms()
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
          this.openCustom()
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
      const { $xetable, collectColumn, customOpts } = this
      const checkMethod = $xetable.customOpts.checkMethod || customOpts.checkMethod
      XEUtils.eachTree(collectColumn, column => {
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
      comp.$emit('custom', { type, $table: $xetable, $grid: $xegrid, $event: evnt }, evnt)
    },
    changeCustomOption (column) {
      const isChecked = !column.visible
      XEUtils.eachTree([column], (item) => {
        item.visible = isChecked
        item.halfVisible = false
      })
      this.handleOptionCheck(column)
      if (this.custom && this.customOpts.immediate) {
        this.handleCustoms()
      }
      this.checkCustomStatus()
    },
    handleOptionCheck (column) {
      const matchObj = XEUtils.findTree(this.collectColumn, item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every(column => column.visible)
          parent.halfVisible = !parent.visible && parent.children.some(column => column.visible || column.halfVisible)
          this.handleOptionCheck(parent)
        }
      }
    },
    handleCustoms () {
      const { $xetable } = this
      $xetable.saveCustomVisible()
      $xetable.analyColumnWidth()
      $xetable.refreshColumn()
    },
    checkCustomStatus () {
      const { $xetable, collectColumn, customOpts } = this
      const checkMethod = $xetable.customOpts.checkMethod || customOpts.checkMethod
      this.customStore.isAll = collectColumn.every(column => (checkMethod ? !checkMethod({ column }) : false) || column.visible)
      this.customStore.isIndeterminate = !this.customStore.isAll && collectColumn.some(column => (!checkMethod || checkMethod({ column })) && (column.visible || column.halfVisible))
    },
    allCustomEvent () {
      const { $xetable, collectColumn, customOpts, customStore } = this
      const checkMethod = $xetable.customOpts.checkMethod || customOpts.checkMethod
      const isAll = !customStore.isAll
      XEUtils.eachTree(collectColumn, column => {
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
          this.$emit('button-click', params, evnt)
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
    }
  }
}
