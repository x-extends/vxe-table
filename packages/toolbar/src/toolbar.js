import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

/**
 * 渲染按钮
 */
function renderBtn (h, _vm, compConf) {
  let { _e, $scopedSlots, $grid, $table, extraSlots, buttons = [] } = _vm
  if ($scopedSlots.buttons) {
    return $scopedSlots.buttons.call(_vm, { $grid, $table }, h)
  }
  if (compConf && compConf.renderButtons) {
    return compConf.renderButtons.call(_vm, h, extraSlots, { $grid, $table })
  }
  return buttons.map(item => {
    return item.visible === false ? _e() : h('vxe-button', {
      on: {
        click: evnt => _vm.btnEvent(evnt, item)
      },
      props: {
        icon: item.icon,
        type: item.type,
        disabled: item.disabled,
        loading: item.loading
      },
      scopedSlots: item.dropdowns && item.dropdowns.length ? {
        default: () => UtilTools.getFuncText(item.name),
        dropdowns: () => item.dropdowns.map(child => {
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
    }, UtilTools.getFuncText(item.name))
  })
}

/**
 * 渲染右侧工具
 */
function renderRightTool (h, _vm, compConf) {
  let { $scopedSlots, $grid, $table, extraSlots } = _vm
  if ($scopedSlots.tools) {
    return $scopedSlots.tools.call(_vm, { $grid, $table }, h)
  }
  if (compConf && compConf.renderTools) {
    return compConf.renderTools.call(_vm, h, extraSlots, { $grid, $table })
  }
  return []
}

export default {
  name: 'VxeToolbar',
  props: {
    id: String,
    loading: false,
    resizable: [Boolean, Object],
    refresh: [Boolean, Object],
    import: [Boolean, Object],
    export: [Boolean, Object],
    zoom: [Boolean, Object],
    setting: [Boolean, Object],
    custom: [Boolean, Object],
    buttons: { type: Array, default: () => GlobalConfig.toolbar.buttons },
    size: String,
    extraSlots: Object
  },
  inject: {
    $grid: {
      default: null
    }
  },
  data () {
    return {
      $table: null,
      isRefresh: false,
      tableFullColumn: [],
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
      return Object.assign({ storageKey: 'VXE_TABLE_CUSTOM_COLUMN_HIDDEN' }, GlobalConfig.toolbar.custom || GlobalConfig.toolbar.setting, this.custom || this.setting)
    }
  },
  created () {
    let { customOpts, refresh, resizable, custom, setting, id, refreshOpts } = this
    if (customOpts.storage && !id) {
      return UtilTools.error('vxe.error.toolbarId')
    }
    // 在 v3 中废弃 setting
    if (setting) {
      UtilTools.warn('vxe.error.delProp', ['setting', 'custom'])
    }
    if (!VXETable._export && (this.export || this.import)) {
      UtilTools.error('vxe.error.reqModule', ['Export'])
    }
    this.$nextTick(() => {
      this.updateConf()
      const comp = this.$grid || this.$table
      if (refresh && !this.$grid && !refreshOpts.query) {
        UtilTools.warn('vxe.error.notFunc', ['query'])
      }
      if (comp) {
        comp.connect({ toolbar: this })
      } else {
        if (resizable || custom || setting) {
          throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
        }
      }
      this.restoreCustomStorage()
    })
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
  },
  destroyed () {
    GlobalEvent.off(this, 'keydown')
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
  },
  render (h) {
    let { $grid, extraSlots, loading, customStore, importOpts, exportOpts, refresh, refreshOpts, zoom, zoomOpts, custom, setting, customOpts, vSize, tableFullColumn } = this
    let customBtnOns = {}
    let customWrapperOns = {}
    let compConf = extraSlots ? VXETable.renderer.get(extraSlots.name) : null
    if (custom || setting) {
      if (customOpts.trigger === 'manual') {
        // 手动触发
      } else if (customOpts.trigger === 'hover') {
        // hover 触发
        customBtnOns.mouseenter = this.handleMouseenterSettingEvent
        customBtnOns.mouseleave = this.handleMouseleaveSettingEvent
        customWrapperOns.mouseenter = this.handleWrapperMouseenterEvent
        customWrapperOns.mouseleave = this.handleWrapperMouseleaveEvent
      } else {
        // 点击触发
        customBtnOns.click = this.handleClickSettingEvent
      }
    }
    return h('div', {
      class: ['vxe-toolbar', {
        [`size--${vSize}`]: vSize,
        'is--loading': loading
      }]
    }, [
      h('div', {
        class: 'vxe-button--wrapper'
      }, renderBtn(h, this, compConf)),
      h('div', {
        class: 'vxe-tools--wrapper'
      }, renderRightTool(h, this, compConf)),
      h('div', {
        class: 'vxe-tools--operate'
      }, [
        this.import ? h('div', {
          class: 'vxe-tools--operate-btn',
          attrs: {
            title: GlobalConfig.i18n('vxe.toolbar.import')
          },
          on: {
            click: this.importEvent
          }
        }, [
          h('i', {
            class: importOpts.icon || GlobalConfig.icon.import
          })
        ]) : null,
        this.export ? h('div', {
          class: 'vxe-tools--operate-btn',
          attrs: {
            title: GlobalConfig.i18n('vxe.toolbar.export')
          },
          on: {
            click: this.exportEvent
          }
        }, [
          h('i', {
            class: exportOpts.icon || GlobalConfig.icon.export
          })
        ]) : null,
        refresh ? h('div', {
          class: 'vxe-tools--operate-btn',
          attrs: {
            title: GlobalConfig.i18n('vxe.toolbar.refresh')
          },
          on: {
            click: this.refreshEvent
          }
        }, [
          h('i', {
            class: this.isRefresh ? (refreshOpts.iconLoading || GlobalConfig.icon.refreshLoading) : (refreshOpts.icon || GlobalConfig.icon.refresh)
          })
        ]) : null,
        zoom && $grid ? h('div', {
          class: 'vxe-tools--operate-btn',
          attrs: {
            title: GlobalConfig.i18n(`vxe.toolbar.zoom${$grid.isMaximized() ? 'Out' : 'In'}`)
          },
          on: {
            click: () => $grid.zoom()
          }
        }, [
          h('i', {
            class: $grid.isMaximized() ? (zoomOpts.iconOut || GlobalConfig.icon.zoomOut) : (zoomOpts.iconIn || GlobalConfig.icon.zoomIn)
          })
        ]) : null,
        custom || setting ? h('div', {
          class: ['vxe-custom--wrapper', {
            'is--active': customStore.visible
          }],
          ref: 'customWrapper'
        }, [
          h('div', {
            class: 'vxe-tools--operate-btn',
            attrs: {
              title: GlobalConfig.i18n('vxe.toolbar.custom')
            },
            on: customBtnOns
          }, [
            h('i', {
              class: customOpts.icon || GlobalConfig.icon.custom
            })
          ]),
          h('div', {
            class: 'vxe-custom--option-wrapper'
          }, [
            h('div', {
              class: 'vxe-custom--header'
            }, [
              h('li', {
                class: {
                  'is--checked': customStore.isAll,
                  'is--indeterminate': customStore.isIndeterminate
                },
                attrs: {
                  title: GlobalConfig.i18n('vxe.table.allTitle')
                },
                on: {
                  click: this.allCustomEvent
                }
              }, GlobalConfig.i18n('vxe.toolbar.customAll'))
            ]),
            h('ul', {
              class: 'vxe-custom--body',
              on: customWrapperOns
            }, tableFullColumn.map(column => {
              let colTitle = column.getTitle()
              let colKey = column.getKey()
              let isDisabled = customOpts.checkMethod ? !customOpts.checkMethod({ column }) : false
              return colTitle && colKey ? h('li', {
                class: ['vxe-custom--option', {
                  'is--checked': column.visible,
                  'is--disabled': isDisabled
                }],
                attrs: {
                  title: colTitle
                },
                on: {
                  click: () => {
                    if (!isDisabled) {
                      column.visible = !column.visible
                      if ((custom || setting) && customOpts.immediate) {
                        this.handleCustoms()
                      }
                      this.checkCustomStatus()
                    }
                  }
                }
              }, colTitle) : null
            })),
            customOpts.isFooter === false ? null : h('div', {
              class: 'vxe-custom--footer'
            }, [
              h('button', {
                class: 'btn--confirm',
                on: {
                  click: this.confirmCustomEvent
                }
              }, GlobalConfig.i18n('vxe.toolbar.customConfirm')),
              h('button', {
                class: 'btn--reset',
                on: {
                  click: this.resetCustomEvent
                }
              }, GlobalConfig.i18n('vxe.toolbar.customReset'))
            ])
          ])
        ]) : null
      ])
    ])
  },
  methods: {
    updateConf () {
      let { $children } = this.$parent
      let selfIndex = $children.indexOf(this)
      this.$table = XEUtils.find($children, (comp, index) => comp && comp.refreshColumn && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table')
    },
    openCustom () {
      this.customStore.visible = true
      this.checkCustomStatus()
    },
    closeCustom () {
      let { custom, setting, customStore } = this
      if (customStore.visible) {
        customStore.visible = false
        if ((custom || setting) && !customStore.immediate) {
          this.handleCustoms()
        }
      }
    },
    restoreCustomStorage () {
      let { $grid, $table, id, resizable, custom, setting, resizableOpts, customOpts } = this
      if (resizable || custom || setting) {
        let customMap = {}
        let comp = $grid || $table
        let { fullColumn } = comp.getTableColumn()
        if (resizableOpts.storage) {
          let columnWidthStorage = this.getStorageMap(resizableOpts.storageKey)[id]
          if (columnWidthStorage) {
            XEUtils.each(columnWidthStorage, (resizeWidth, field) => {
              customMap[field] = { field, resizeWidth }
            })
          }
        }
        if (customOpts.storage) {
          let columnHideStorage = this.getStorageMap(customOpts.storageKey)[id]
          if (columnHideStorage) {
            columnHideStorage.split(',').forEach(field => {
              if (customMap[field]) {
                customMap[field].visible = false
              } else {
                customMap[field] = { field, visible: false }
              }
            })
          }
        }
        let keyMap = {}
        fullColumn.forEach(column => {
          let colKey = column.getKey()
          if (colKey) {
            keyMap[colKey] = column
          }
        })
        XEUtils.each(customMap, ({ visible, resizeWidth }, field) => {
          let column = keyMap[field]
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
        this.tableFullColumn = fullColumn
      }
    },
    /**
     * 暴露给 table 调用，用于关联列
     * @param {Array} fullColumn 所有列
     */
    updateColumns (fullColumn) {
      this.tableFullColumn = fullColumn
    },
    getStorageMap (key) {
      let version = GlobalConfig.version
      let rest = XEUtils.toStringJSON(localStorage.getItem(key))
      return rest && rest._v === version ? rest : { _v: version }
    },
    saveColumnHide () {
      let { id, tableFullColumn, customOpts } = this
      let { checkMethod, storage, storageKey } = customOpts
      if (storage) {
        let columnHideStorageMap = this.getStorageMap(storageKey)
        let colHides = []
        tableFullColumn.forEach(column => {
          if (!column.visible && (!checkMethod || checkMethod({ column }))) {
            let colKey = column.getKey()
            if (colKey) {
              colHides.push(colKey)
            }
          }
        })
        columnHideStorageMap[id] = colHides.join(',') || undefined
        localStorage.setItem(storageKey, XEUtils.toJSONString(columnHideStorageMap))
      }
      return this.$nextTick()
    },
    saveColumnWidth (isReset) {
      let { id, tableFullColumn, resizableOpts } = this
      if (resizableOpts.storage) {
        let columnWidthStorageMap = this.getStorageMap(resizableOpts.storageKey)
        let columnWidthStorage
        if (!isReset) {
          columnWidthStorage = XEUtils.isPlainObject(columnWidthStorageMap[id]) ? columnWidthStorageMap[id] : {}
          tableFullColumn.forEach(column => {
            if (column.resizeWidth) {
              let colKey = column.getKey()
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
    hideColumn (column) {
      UtilTools.warn('vxe.error.delFunc', ['hideColumn', 'table.hideColumn'])
      column.visible = false
      return this.handleCustoms()
    },
    showColumn (column) {
      UtilTools.warn('vxe.error.delFunc', ['showColumn', 'table.showColumn'])
      column.visible = true
      return this.handleCustoms()
    },
    resetCustoms () {
      return this.handleCustoms()
    },
    resetResizable () {
      this.updateResizable(this)
    },
    confirmCustomEvent () {
      this.closeCustom()
    },
    resetCustomEvent () {
      let { checkMethod } = this.customOpts
      this.tableFullColumn.forEach(column => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = true
        }
        column.resizeWidth = 0
      })
      this.resetCustoms()
      this.resetResizable()
      this.closeCustom()
    },
    updateResizable (isReset) {
      let comp = this.$grid || this.$table
      this.saveColumnWidth(isReset)
      comp.analyColumnWidth()
      return comp.recalculate(true)
    },
    handleCustoms () {
      (this.$grid || this.$table).refreshColumn()
      return this.saveColumnHide()
    },
    checkCustomStatus () {
      let { checkMethod } = this.customOpts
      let tableFullColumn = this.tableFullColumn
      this.customStore.isAll = tableFullColumn.every(column => (checkMethod ? !checkMethod({ column }) : false) || column.visible)
      this.customStore.isIndeterminate = !this.customStore.isAll && tableFullColumn.some(column => (!checkMethod || checkMethod({ column })) && column.visible)
    },
    allCustomEvent () {
      let { checkMethod } = this.customOpts
      let isAll = !this.customStore.isAll
      this.tableFullColumn.forEach(column => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = isAll
        }
      })
      this.customStore.isAll = isAll
      this.checkCustomStatus()
    },
    handleGlobalKeydownEvent (evnt) {
      let isEsc = evnt.keyCode === 27
      if (isEsc && this.$grid && this.$grid.isMaximized() && this.zoomOpts && this.zoomOpts.escRestore !== false) {
        this.$grid.zoom()
      }
    },
    handleGlobalMousedownEvent (evnt) {
      if (!DomTools.getEventTargetNode(evnt, this.$refs.customWrapper).flag) {
        this.closeCustom()
      }
    },
    handleGlobalBlurEvent (evnt) {
      this.closeCustom()
    },
    handleClickSettingEvent (evnt) {
      this.customStore.visible = !this.customStore.visible
      this.checkCustomStatus()
    },
    handleMouseenterSettingEvent (evnt) {
      this.customStore.activeBtn = true
      this.openCustom()
    },
    handleMouseleaveSettingEvent (evnt) {
      let { customStore } = this
      customStore.activeBtn = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          this.closeCustom()
        }
      }, 300)
    },
    handleWrapperMouseenterEvent (evnt) {
      this.customStore.activeWrapper = true
      this.openCustom()
    },
    handleWrapperMouseleaveEvent (evnt) {
      let { customStore } = this
      customStore.activeWrapper = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          this.closeCustom()
        }
      }, 300)
    },
    refreshEvent () {
      let { $grid, refreshOpts, isRefresh } = this
      if (!isRefresh) {
        if (refreshOpts.query) {
          this.isRefresh = true
          refreshOpts.query().catch(e => e).then(() => {
            this.isRefresh = false
          })
        } else if ($grid) {
          this.isRefresh = true
          $grid.commitProxy('reload').catch(e => e).then(() => {
            this.isRefresh = false
          })
        }
      }
    },
    btnEvent (evnt, item) {
      let { $grid, $table } = this
      let { code } = item
      if (code) {
        if ($grid) {
          $grid.triggerToolbarBtnEvent(item, evnt)
        } else {
          let commandMethod = VXETable.commands.get(code)
          let params = { code, button: item, $grid, $table }
          if (commandMethod) {
            commandMethod.call(this, params, evnt)
          }
          UtilTools.emitEvent(this, 'button-click', [params, evnt])
        }
      }
    },
    importEvent () {
      const comp = this.$grid || this.$table
      if (comp) {
        comp.openImport()
      } else {
        throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
      }
    },
    exportEvent () {
      const comp = this.$grid || this.$table
      if (comp) {
        comp.openExport(this.customOpts)
      } else {
        throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
      }
    }
  }
}
