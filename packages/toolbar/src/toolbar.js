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
    const { name, visible, icon, type, disabled, loading, dropdowns, buttonRender } = item
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
  let { $scopedSlots, $xegrid, $xetable } = _vm
  if ($scopedSlots.tools) {
    return $scopedSlots.tools.call(_vm, { $grid: $xegrid, $table: $xetable }, h)
  }
  return []
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
    size: String,
    data: Object
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
      return Object.assign({ storageKey: 'VXE_TABLE_CUSTOM_COLUMN_VISIBLE' }, GlobalConfig.toolbar.custom || GlobalConfig.toolbar.setting, this.custom || this.setting)
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
      const comp = this.$xegrid || this.$xetable
      if (refresh && !this.$xegrid && !refreshOpts.query) {
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
    let { $xegrid, loading, customStore, importOpts, exportOpts, refresh, refreshOpts, zoom, zoomOpts, custom, setting, customOpts, vSize, tableFullColumn } = this
    let customBtnOns = {}
    let customWrapperOns = {}
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
      }, renderBtns(h, this)),
      h('div', {
        class: 'vxe-tools--wrapper'
      }, renderRightTools(h, this)),
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
        zoom && $xegrid ? h('div', {
          class: 'vxe-tools--operate-btn',
          attrs: {
            title: GlobalConfig.i18n(`vxe.toolbar.zoom${$xegrid.isMaximized() ? 'Out' : 'In'}`)
          },
          on: {
            click: () => $xegrid.zoom()
          }
        }, [
          h('i', {
            class: $xegrid.isMaximized() ? (zoomOpts.iconOut || GlobalConfig.icon.zoomOut) : (zoomOpts.iconIn || GlobalConfig.icon.zoomIn)
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
                class: ['vxe-custom--option', {
                  'is--checked': customStore.isAll,
                  'is--indeterminate': customStore.isIndeterminate
                }],
                attrs: {
                  title: GlobalConfig.i18n('vxe.table.allTitle')
                },
                on: {
                  click: this.allCustomEvent
                }
              }, [
                h('i', {
                  class: 'vxe-checkbox--icon'
                }),
                GlobalConfig.i18n('vxe.toolbar.customAll')
              ])
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
              }, [
                h('i', {
                  class: 'vxe-checkbox--icon'
                }),
                colTitle
              ]) : null
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
              }, GlobalConfig.i18n('vxe.toolbar.customRestore'))
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
      this.$xetable = XEUtils.find($children, (comp, index) => comp && comp.refreshColumn && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table')
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
      let { $xegrid, $xetable, id, resizable, custom, setting, resizableOpts, customOpts } = this
      if (resizable || custom || setting) {
        let customMap = {}
        let comp = $xegrid || $xetable
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
          let columnVisibleStorage = this.getStorageMap(customOpts.storageKey)[id]
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
    saveColumnVisible () {
      let { id, tableFullColumn, customOpts } = this
      let { checkMethod, storage, storageKey } = customOpts
      if (storage) {
        let columnVisibleStorageMap = this.getStorageMap(storageKey)
        let colHides = []
        let colShows = []
        tableFullColumn.forEach(column => {
          if (!checkMethod || checkMethod({ column })) {
            if (!column.visible && column.defaultVisible) {
              let colKey = column.getKey()
              if (colKey) {
                colHides.push(colKey)
              }
            } else if (column.visible && !column.defaultVisible) {
              let colKey = column.getKey()
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
          column.visible = column.defaultVisible
        }
        column.resizeWidth = 0
      })
      this.resetCustoms()
      this.resetResizable()
      this.closeCustom()
    },
    updateResizable (isReset) {
      let comp = this.$xegrid || this.$xetable
      this.saveColumnWidth(isReset)
      comp.analyColumnWidth()
      return comp.recalculate(true)
    },
    handleCustoms () {
      let comp = this.$xegrid || this.$xetable
      comp.refreshColumn()
      return this.saveColumnVisible()
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
      if (isEsc && this.$xegrid && this.$xegrid.isMaximized() && this.zoomOpts && this.zoomOpts.escRestore !== false) {
        this.$xegrid.zoom()
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
      let { $xegrid, refreshOpts, isRefresh } = this
      if (!isRefresh) {
        if (refreshOpts.query) {
          this.isRefresh = true
          let qRest = refreshOpts.query()
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
      let { $xegrid, $xetable } = this
      let { code } = item
      if (code) {
        if ($xegrid) {
          $xegrid.triggerToolbarBtnEvent(item, evnt)
        } else {
          let commandMethod = VXETable.commands.get(code)
          let params = { code, button: item, $xegrid, $table: $xetable }
          if (commandMethod) {
            commandMethod.call(this, params, evnt)
          }
          UtilTools.emitEvent(this, 'button-click', [params, evnt])
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
