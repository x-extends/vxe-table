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
  const { customStore, customOpts, collectColumn } = _vm
  const cols = []
  const customBtnOns = {}
  const customWrapperOns = {}
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
    const isDisabled = customOpts.checkMethod ? !customOpts.checkMethod({ column }) : false
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
    resizableOpts () {
      return Object.assign({ storageKey: 'VXE_TABLE_CUSTOM_COLUMN_WIDTH' }, GlobalConfig.toolbar.resizable, this.resizable)
    },
    zoomOpts () {
      return Object.assign({}, GlobalConfig.toolbar.zoom, this.zoom)
    },
    customOpts () {
      return Object.assign({ storageKey: 'VXE_TABLE_CUSTOM_COLUMN_VISIBLE' }, GlobalConfig.toolbar.custom, this.custom)
    }
  },
  created () {
    const { customOpts, refresh, resizable, custom, id, refreshOpts } = this
    if (customOpts.storage && !id) {
      return UtilTools.error('vxe.error.toolbarId')
    }
    if (!VXETable._export && (this.export || this.import)) {
      UtilTools.error('vxe.error.reqModule', ['Export'])
    }
    this.$nextTick(() => {
      this.updateConf()
      const comp = this.$xegrid || this.$xetable
      if (refresh && !this.$xegrid && !refreshOpts.query) {
        UtilTools.warn('vxe.error.notFunc', ['query'])
      }
      if (comp) {
        comp.connect({ toolbar: this })
      } else {
        if (resizable || custom) {
          throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
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
    const { $xegrid, perfect, loading, importOpts, exportOpts, refresh, refreshOpts, zoom, zoomOpts, custom, vSize } = this
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
        custom ? renderCustoms(h, this) : null
      ])
    ])
  },
  methods: {
    updateConf () {
      const { $children } = this.$parent
      const selfIndex = $children.indexOf(this)
      this.$xetable = XEUtils.find($children, (comp, index) => comp && comp.refreshColumn && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table')
    },
    openCustom () {
      this.customStore.visible = true
      this.checkCustomStatus()
    },
    closeCustom () {
      const { custom, customStore } = this
      if (customStore.visible) {
        customStore.visible = false
        if (custom && !customStore.immediate) {
          this.handleCustoms()
        }
      }
    },
    restoreCustomStorage () {
      const { $xegrid, $xetable, id, resizable, custom, resizableOpts, customOpts } = this
      if (resizable || custom) {
        const customMap = {}
        const comp = $xegrid || $xetable
        const { collectColumn } = comp.getTableColumn()
        if (resizableOpts.storage) {
          const columnWidthStorage = this.getStorageMap(resizableOpts.storageKey)[id]
          if (columnWidthStorage) {
            XEUtils.each(columnWidthStorage, (resizeWidth, field) => {
              customMap[field] = { field, resizeWidth }
            })
          }
        }
        if (customOpts.storage) {
          const columnVisibleStorage = this.getStorageMap(customOpts.storageKey)[id]
          if (columnVisibleStorage) {
            const colVisibles = columnVisibleStorage.split('|')
            const colHides = colVisibles[0] ? colVisibles[0].split(',') : []
            const colShows = colVisibles[1] ? colVisibles[1].split(',') : []
            colHides.forEach(field => {
              if (customMap[field]) {
                customMap[field].visible = false
              } else {
                customMap[field] = { field, visible: false }
              }
            })
            colShows.forEach(field => {
              if (customMap[field]) {
                customMap[field].visible = true
              } else {
                customMap[field] = { field, visible: true }
              }
            })
          }
        }
        const keyMap = {}
        collectColumn.forEach(column => {
          const colKey = column.getKey()
          if (colKey) {
            keyMap[colKey] = column
          }
        })
        XEUtils.each(customMap, ({ visible, resizeWidth }, field) => {
          const column = keyMap[field]
          if (column) {
            if (XEUtils.isNumber(resizeWidth)) {
              column.resizeWidth = resizeWidth
            }
            if (XEUtils.isBoolean(visible)) {
              column.visible = visible
            }
          }
        })
        comp.refreshColumn()
        this.collectColumn = collectColumn
      }
    },
    /**
     * 暴露给 table 调用，用于关联列
     * @param {Array} collectColumn 列分组配置
     */
    updateColumns (collectColumn) {
      this.collectColumn = collectColumn
      this.restoreCustomStorage()
    },
    getStorageMap (key) {
      const version = GlobalConfig.version
      const rest = XEUtils.toStringJSON(localStorage.getItem(key))
      return rest && rest._v === version ? rest : { _v: version }
    },
    saveColumnVisible () {
      const { id, collectColumn, customOpts } = this
      const { checkMethod, storage, storageKey } = customOpts
      if (storage) {
        const columnVisibleStorageMap = this.getStorageMap(storageKey)
        const colHides = []
        const colShows = []
        XEUtils.eachTree(collectColumn, column => {
          if (!checkMethod || checkMethod({ column })) {
            if (!column.visible && column.defaultVisible) {
              const colKey = column.getKey()
              if (colKey) {
                colHides.push(colKey)
              }
            } else if (column.visible && !column.defaultVisible) {
              const colKey = column.getKey()
              if (colKey) {
                colShows.push(colKey)
              }
            }
          }
        })
        columnVisibleStorageMap[id] = [colHides.join(',')].concat(colShows.length ? [colShows.join(',')] : []).join('|') || undefined
        localStorage.setItem(storageKey, XEUtils.toJSONString(columnVisibleStorageMap))
      }
      return this.$nextTick()
    },
    saveColumnWidth (isReset) {
      const { id, collectColumn, resizableOpts } = this
      if (resizableOpts.storage) {
        const columnWidthStorageMap = this.getStorageMap(resizableOpts.storageKey)
        let columnWidthStorage
        if (!isReset) {
          columnWidthStorage = XEUtils.isPlainObject(columnWidthStorageMap[id]) ? columnWidthStorageMap[id] : {}
          XEUtils.eachTree(collectColumn, column => {
            if (column.resizeWidth) {
              const colKey = column.getKey()
              if (colKey) {
                columnWidthStorage[colKey] = column.renderWidth
              }
            }
          })
        }
        columnWidthStorageMap[id] = XEUtils.isEmpty(columnWidthStorage) ? undefined : columnWidthStorage
        localStorage.setItem(resizableOpts.storageKey, XEUtils.toJSONString(columnWidthStorageMap))
      }
      return this.$nextTick()
    },
    resetCustoms () {
      return this.handleCustoms()
    },
    resetResizable () {
      this.updateResizable(true)
    },
    confirmCustomEvent (evnt) {
      this.closeCustom()
      this.emitCustomEvent('confirm', evnt)
    },
    customOpenEvent (evnt) {
      const { customStore } = this
      if (!customStore.visible) {
        this.openCustom()
        this.emitCustomEvent('open', evnt)
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
      const { collectColumn, customOpts } = this
      const { checkMethod } = customOpts
      XEUtils.eachTree(collectColumn, column => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = column.defaultVisible
          column.halfVisible = false
        }
        column.resizeWidth = 0
      })
      this.resetCustoms()
      this.resetResizable()
      this.closeCustom()
      this.emitCustomEvent('reset', evnt)
    },
    emitCustomEvent (type, evnt) {
      const { $xetable, $xegrid } = this
      const comp = $xegrid || $xetable
      comp.$emit('custom', { type, $table: $xetable, $grid: $xegrid, $event: evnt })
    },
    updateResizable (isReset) {
      const comp = this.$xegrid || this.$xetable
      this.saveColumnWidth(isReset)
      comp.analyColumnWidth()
      return comp.recalculate(true)
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
      const comp = this.$xegrid || this.$xetable
      comp.refreshColumn()
      return this.saveColumnVisible()
    },
    checkCustomStatus () {
      const { collectColumn, customOpts } = this
      const { checkMethod } = customOpts
      this.customStore.isAll = collectColumn.every(column => (checkMethod ? !checkMethod({ column }) : false) || column.visible)
      this.customStore.isIndeterminate = !this.customStore.isAll && collectColumn.some(column => (!checkMethod || checkMethod({ column })) && (column.visible || column.halfVisible))
    },
    allCustomEvent () {
      const { collectColumn, customOpts, customStore } = this
      const { checkMethod } = customOpts
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
          const qRest = refreshOpts.query()
          try {
            qRest.catch(e => e).then(() => {
              this.isRefresh = false
            })
          } catch (e) {
            UtilTools.error('vxe.error.typeErr', ['refresh.query', 'Promise', typeof qRest])
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
    importEvent () {
      const comp = this.$xegrid || this.$xetable
      if (comp) {
        comp.openImport(this.importOpts)
      } else {
        throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
      }
    },
    exportEvent () {
      const comp = this.$xegrid || this.$xetable
      if (comp) {
        comp.openExport(this.exportOpts)
      } else {
        throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
      }
    }
  }
}
