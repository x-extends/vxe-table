import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import VXETable, { Buttons } from '../../v-x-e-table'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

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
    size: String
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
      importStore: {
        file: null,
        type: '',
        filename: '',
        visible: false
      },
      importParams: {
        mode: '',
        types: null,
        message: true
      },
      exportStore: {
        name: '',
        mode: '',
        columns: [],
        selectRecords: [],
        hasFooter: false,
        forceOriginal: false,
        visible: false,
        isTree: false
      },
      exportParams: {
        filename: '',
        sheetName: '',
        type: '',
        types: [],
        original: false,
        message: true,
        isHeader: false,
        isFooter: false
      },
      customStore: {
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
    let { customOpts, setting, id } = this
    if (customOpts.storage && !id) {
      return UtilTools.error('vxe.error.toolbarId')
    }
    if (setting) {
      UtilTools.warn('vxe.error.delProp', ['setting', 'custom'])
    }
    if (!VXETable._export && (this.export || this.import)) {
      UtilTools.error('vxe.error.reqModule', ['Export'])
    }
    this.$nextTick(() => {
      this.updateConf()
      this.loadStorage()
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
    let { _e, $scopedSlots, $grid, $table, loading, customStore, importOpts, exportOpts, refresh, refreshOpts, zoom, zoomOpts, custom, setting, customOpts, buttons = [], vSize, tableFullColumn, importStore, importParams, exportStore, exportParams } = this
    let customBtnOns = {}
    let customWrapperOns = {}
    let $buttons = $scopedSlots.buttons
    let $tools = $scopedSlots.tools
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
      }, $buttons ? $buttons.call(this, { $grid, $table }, h) : buttons.map(item => {
        return item.visible === false ? _e() : h('vxe-button', {
          on: {
            click: evnt => this.btnEvent(evnt, item)
          },
          props: {
            icon: item.icon,
            disabled: item.disabled
          },
          scopedSlots: item.dropdowns && item.dropdowns.length ? {
            default: () => UtilTools.getFuncText(item.name),
            dropdowns: () => item.dropdowns.map(child => {
              return child.visible === false ? _e() : h('vxe-button', {
                on: {
                  click: evnt => this.btnEvent(evnt, child)
                },
                props: {
                  icon: child.icon,
                  disabled: child.disabled
                }
              }, UtilTools.getFuncText(child.name))
            })
          } : null
        }, UtilTools.getFuncText(item.name))
      })),
      $tools ? h('div', {
        class: 'vxe-tools--wrapper'
      }, $tools.call(this, { $grid, $table }, h)) : null,
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
        zoom && this.$grid ? h('div', {
          class: 'vxe-tools--operate-btn',
          attrs: {
            title: GlobalConfig.i18n(`vxe.toolbar.zoom${this.$grid.isMaximized() ? 'Out' : 'In'}`)
          },
          on: {
            click: () => this.$grid.zoom()
          }
        }, [
          h('i', {
            class: this.$grid.isMaximized() ? (zoomOpts.iconOut || GlobalConfig.icon.zoomOut) : (zoomOpts.iconIn || GlobalConfig.icon.zoomIn)
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
              class: 'vxe-custom--option',
              on: customWrapperOns
            }, tableFullColumn.map(column => {
              let { visible, own } = column
              let headerTitle = UtilTools.getFuncText(own.title || own.label)
              return headerTitle ? h('vxe-checkbox', {
                props: {
                  value: visible,
                  disabled: customOpts.checkMethod ? !customOpts.checkMethod({ column }) : false
                },
                attrs: {
                  title: headerTitle
                },
                on: {
                  change: value => {
                    column.visible = value
                    if ((custom || setting) && customOpts.immediate) {
                      this.handleCustoms()
                    }
                  }
                }
              }, headerTitle) : null
            }))
          ])
        ]) : null
      ]),
      VXETable._export ? h('vxe-import-panel', {
        props: {
          defaultOptions: importParams,
          storeData: importStore
        },
        on: {
          import: this.confirmImportEvent
        }
      }) : _e(),
      VXETable._export ? h('vxe-export-panel', {
        props: {
          defaultOptions: exportParams,
          storeData: exportStore
        },
        on: {
          print: this.confirmPrintEvent,
          export: this.confirmExportEvent
        }
      }) : _e()
    ])
  },
  methods: {
    updateConf () {
      let { $children } = this.$parent
      let selfIndex = $children.indexOf(this)
      this.$table = XEUtils.find($children, (comp, index) => comp && comp.refreshColumn && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table')
    },
    openSetting () {
      this.customStore.visible = true
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
    loadStorage () {
      let { $grid, $table, id, refresh, resizable, custom, setting, refreshOpts, resizableOpts, customOpts } = this
      if (refresh && !$grid) {
        if (!refreshOpts.query) {
          UtilTools.warn('vxe.error.notFunc', ['query'])
        }
      }
      if ($grid || $table) {
        ($grid || $table).connect({ toolbar: this })
      } else {
        if (resizable || custom || setting) {
          throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
        }
      }
      if (resizable || custom || setting) {
        let customMap = {}
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
        let customList = Object.values(customMap)
        this.updateCustoms(customList.length ? customList : this.tableFullColumn)
      }
    },
    updateColumn (fullColumn) {
      this.tableFullColumn = fullColumn
    },
    updateCustoms (customs) {
      let comp = this.$grid || this.$table
      if (comp) {
        comp.reloadCustoms(customs).then(fullColumn => {
          this.tableFullColumn = fullColumn
        })
      }
    },
    getStorageMap (key) {
      let version = GlobalConfig.version
      let rest = XEUtils.toStringJSON(localStorage.getItem(key))
      return rest && rest._v === version ? rest : { _v: version }
    },
    saveColumnHide () {
      let { id, tableFullColumn, customOpts } = this
      if (customOpts.storage) {
        let columnHideStorageMap = this.getStorageMap(customOpts.storageKey)
        let colHides = tableFullColumn.filter(column => column.property && !column.visible)
        columnHideStorageMap[id] = colHides.length ? colHides.map(column => column.property).join(',') : undefined
        localStorage.setItem(customOpts.storageKey, XEUtils.toJSONString(columnHideStorageMap))
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
          tableFullColumn.forEach(({ property, resizeWidth, renderWidth }) => {
            if (property && resizeWidth) {
              columnWidthStorage[property] = renderWidth
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
    },
    handleMouseenterSettingEvent (evnt) {
      this.customStore.activeBtn = true
      this.openSetting()
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
      this.openSetting()
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
          let btnMethod = Buttons.get(code)
          let params = { code, button: item, $grid, $table }
          if (btnMethod) {
            btnMethod.call(this, params, evnt)
          }
          UtilTools.emitEvent(this, 'button-click', [params, evnt])
        }
      }
    },
    importEvent () {
      if (this.$grid || this.$table) {
        this.openImport()
      } else {
        throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
      }
    },
    openImport (options) {
      const comp = this.$grid || this.$table
      const defOpts = Object.assign({ mode: 'covering', message: true }, options, this.importOpts)
      const isTree = !!comp.getTreeStatus()
      if (isTree) {
        if (defOpts.message) {
          this.$XModal.message({ message: GlobalConfig.i18n('vxe.error.treeNotImp'), status: 'error' })
        }
        return
      }
      Object.assign(this.importStore, {
        file: null,
        type: '',
        filename: '',
        visible: true
      })
      Object.assign(this.importParams, defOpts)
    },
    confirmImportEvent (options) {
      const comp = this.$grid || this.$table
      comp.importByFile(this.importStore.file, options)
    },
    exportEvent () {
      if (this.$grid || this.$table) {
        this.openExport()
      } else {
        throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
      }
    },
    openExport (options) {
      const comp = this.$grid || this.$table
      const { fullColumn } = comp.getTableColumn()
      const { footerData } = comp.getTableData()
      const selectRecords = comp.getSelectRecords()
      const virtualScroller = comp.getVirtualScroller()
      // v3.0 废弃 type=index
      const exportColumns = fullColumn.filter(column => (column.type === 'seq' || column.type === 'index') || (column.property && ['checkbox', 'selection', 'radio'].indexOf(column.type) === -1))
      const treeStatus = comp.getTreeStatus()
      const isTree = !!treeStatus
      const forceOriginal = isTree || virtualScroller.scrollX || virtualScroller.scrollY
      const hasFooter = !!footerData.length
      const defOpts = Object.assign({ message: true }, this.exportOpts, options)
      const types = defOpts.types || VXETable.exportTypes
      // 处理类型
      defOpts.types = types.map(value => {
        return {
          value,
          label: `vxe.types.${value}`
        }
      })
      // 索引列默认不选中
      exportColumns.forEach(column => {
        column.checked = (column.type !== 'seq' && column.type !== 'index')
      })
      // 更新条件
      Object.assign(this.exportStore, {
        columns: exportColumns,
        selectRecords: selectRecords,
        mode: selectRecords.length ? 'selected' : 'all',
        forceOriginal: !!treeStatus || virtualScroller.scrollX || virtualScroller.scrollY,
        hasFooter: hasFooter,
        visible: true,
        isTree
      })
      // 重置参数
      Object.assign(this.exportParams, {
        filename: defOpts.filename || '',
        sheetName: defOpts.sheetName || '',
        type: defOpts.type || defOpts.types[0].value,
        types: defOpts.types,
        original: forceOriginal || defOpts.original,
        message: defOpts.message,
        isHeader: true,
        isFooter: hasFooter
      })
      return this.$nextTick()
    },
    confirmPrintEvent (options) {
      (this.$grid || this.$table).print(options)
    },
    confirmExportEvent (options) {
      (this.$grid || this.$table).exportData(options)
    }
  }
}
