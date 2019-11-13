import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import VXETable, { Buttons } from '../../v-x-e-table'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

export default {
  name: 'VxeToolbar',
  props: {
    id: String,
    loading: false,
    resizable: { type: [Boolean, Object], default: () => GlobalConfig.toolbar.resizable },
    refresh: { type: [Boolean, Object], default: () => GlobalConfig.toolbar.refresh },
    import: { type: [Boolean, Object], default: () => GlobalConfig.toolbar.import },
    export: { type: [Boolean, Object], default: () => GlobalConfig.toolbar.export },
    setting: { type: [Boolean, Object], default: () => GlobalConfig.toolbar.setting },
    buttons: { type: Array, default: () => GlobalConfig.toolbar.buttons },
    size: String,
    data: Array,
    customs: Array
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
        visible: false
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
      settingStore: {
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
    settingOpts () {
      return Object.assign({ storageKey: 'VXE_TABLE_CUSTOM_COLUMN_HIDDEN' }, GlobalConfig.toolbar.setting, this.setting)
    }
  },
  created () {
    let { settingOpts, id, customs } = this
    if (customs) {
      this.tableFullColumn = customs
    }
    if (settingOpts.storage && !id) {
      return UtilTools.error('vxe.error.toolbarId')
    }
    if (!VXETable._export && (this.export || this.import)) {
      UtilTools.error('vxe.error.reqModule', ['Export'])
    }
    this.$nextTick(() => {
      this.updateConf()
      this.loadStorage()
    })
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
  },
  render (h) {
    let { _e, $scopedSlots, $grid, $table, loading, settingStore, refresh, setting, settingOpts, buttons = [], vSize, tableFullColumn, importStore, importParams, exportStore, exportParams } = this
    let customBtnOns = {}
    let customWrapperOns = {}
    let $buttons = $scopedSlots.buttons
    let $tools = $scopedSlots.tools
    if (setting) {
      if (settingOpts.trigger === 'manual') {
        // 手动触发
      } else if (settingOpts.trigger === 'hover') {
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
                  disabled: child.disabled
                }
              }, UtilTools.getFuncText(child.name))
            })
          } : null
        }, UtilTools.getFuncText(item.name))
      })),
      h('div', {
        class: 'vxe-tools--operate'
      }, [
        this.import ? h('vxe-button', {
          class: 'vxe-export--btn',
          props: {
            type: 'text',
            icon: GlobalConfig.icon.import
          },
          on: {
            click: this.importEvent
          }
        }) : null,
        this.export ? h('vxe-button', {
          class: 'vxe-export--btn',
          props: {
            type: 'text',
            icon: GlobalConfig.icon.export
          },
          on: {
            click: this.exportEvent
          }
        }) : null,
        refresh ? h('vxe-button', {
          class: 'vxe-refresh--btn',
          props: {
            type: 'text',
            icon: GlobalConfig.icon.refresh,
            loading: this.isRefresh
          },
          on: {
            click: this.refreshEvent
          }
        }) : null,
        setting ? h('div', {
          class: ['vxe-custom--wrapper', {
            'is--active': settingStore.visible
          }],
          ref: 'customWrapper'
        }, [
          h('div', {
            class: 'vxe-custom--setting-btn',
            on: customBtnOns
          }, [
            h('i', {
              class: GlobalConfig.icon.custom
            })
          ]),
          h('div', {
            class: 'vxe-custom--option-wrapper'
          }, [
            h('div', {
              class: 'vxe-custom--option',
              on: customWrapperOns
            }, tableFullColumn.map(column => {
              let { property, visible, own } = column
              let headerTitle = UtilTools.getFuncText(own.title || own.label)
              return property && headerTitle ? h('vxe-checkbox', {
                props: {
                  value: visible
                },
                attrs: {
                  title: headerTitle
                },
                on: {
                  change: value => {
                    column.visible = value
                    if (setting && settingOpts.immediate) {
                      this.updateSetting()
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
      }) : _e(),
      $tools ? h('div', {
        class: 'vxe-tools--wrapper'
      }, $tools.call(this, { $grid, $table }, h)) : null
    ])
  },
  methods: {
    updateConf () {
      let { $parent, data } = this
      let { $children } = $parent
      let selfIndex = $children.indexOf(this)
      this.$table = $children.find((comp, index) => comp && comp.refreshColumn && index > selfIndex && (data ? comp.data === data : comp.$vnode.componentOptions.tag === 'vxe-table'))
    },
    openSetting () {
      this.settingStore.visible = true
    },
    closeSetting () {
      let { setting, settingStore } = this
      if (settingStore.visible) {
        settingStore.visible = false
        if (setting && !settingStore.immediate) {
          this.updateSetting()
        }
      }
    },
    loadStorage () {
      let { $grid, $table, id, refresh, resizable, setting, refreshOpts, resizableOpts, settingOpts } = this
      if (refresh && !$grid) {
        if (!refreshOpts.query) {
          UtilTools.warn('vxe.error.notFunc', ['query'])
        }
      }
      if ($grid || $table) {
        ($grid || $table).connect({ toolbar: this })
      } else {
        if (resizable || setting) {
          throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
        }
      }
      if (resizable || setting) {
        let customMap = {}
        if (resizableOpts.storage) {
          let columnWidthStorage = this.getStorageMap(resizableOpts.storageKey)[id]
          if (columnWidthStorage) {
            XEUtils.each(columnWidthStorage, (resizeWidth, field) => {
              customMap[field] = { field, resizeWidth }
            })
          }
        }
        if (settingOpts.storage) {
          let columnHideStorage = this.getStorageMap(settingOpts.storageKey)[id]
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
      let { $grid, $table } = this
      let comp = $grid || $table
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
      let { id, tableFullColumn, settingOpts } = this
      if (settingOpts.storage) {
        let columnHideStorageMap = this.getStorageMap(settingOpts.storageKey)
        let colHides = tableFullColumn.filter(column => column.property && !column.visible)
        columnHideStorageMap[id] = colHides.length ? colHides.map(column => column.property).join(',') : undefined
        localStorage.setItem(settingOpts.storageKey, XEUtils.toJSONString(columnHideStorageMap))
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
      return this.updateSetting()
    },
    showColumn (column) {
      UtilTools.warn('vxe.error.delFunc', ['showColumn', 'table.showColumn'])
      column.visible = true
      return this.updateSetting()
    },
    resetCustoms () {
      return this.updateSetting()
    },
    resetResizable () {
      this.updateResizable(this)
    },
    updateResizable (isReset) {
      let { $grid, $table } = this
      let comp = $grid || $table
      this.saveColumnWidth(isReset)
      comp.analyColumnWidth()
      return comp.recalculate(true)
    },
    updateSetting () {
      (this.$grid || this.$table).refreshColumn()
      return this.saveColumnHide()
    },
    handleGlobalMousedownEvent (evnt) {
      if (!DomTools.getEventTargetNode(evnt, this.$refs.customWrapper).flag) {
        this.closeSetting()
      }
    },
    handleGlobalBlurEvent (evnt) {
      this.closeSetting()
    },
    handleClickSettingEvent (evnt) {
      let { settingStore } = this
      settingStore.visible = !settingStore.visible
    },
    handleMouseenterSettingEvent (evnt) {
      this.settingStore.activeBtn = true
      this.openSetting()
    },
    handleMouseleaveSettingEvent (evnt) {
      let { settingStore } = this
      settingStore.activeBtn = false
      setTimeout(() => {
        if (!settingStore.activeBtn && !settingStore.activeWrapper) {
          this.closeSetting()
        }
      }, 300)
    },
    handleWrapperMouseenterEvent (evnt) {
      this.settingStore.activeWrapper = true
      this.openSetting()
    },
    handleWrapperMouseleaveEvent (evnt) {
      let { settingStore } = this
      settingStore.activeWrapper = false
      setTimeout(() => {
        if (!settingStore.activeBtn && !settingStore.activeWrapper) {
          this.closeSetting()
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
      this.openImport()
    },
    openImport (options) {
      const { importParams, importStore, importOpts } = this
      const defOpts = Object.assign({ mode: 'covering', message: true }, options, importOpts)
      Object.assign(importStore, {
        file: null,
        type: '',
        filename: '',
        visible: true
      })
      Object.assign(importParams, defOpts)
    },
    confirmImportEvent (options) {
      const { $grid, $table } = this
      const comp = $grid || $table
      comp.importByFile(this.importStore.file, options)
    },
    exportEvent () {
      this.openExport()
    },
    openExport (options) {
      const { $grid, $table, exportOpts, exportStore, exportParams } = this
      const comp = $grid || $table
      const { fullColumn } = comp.getTableColumn()
      const { footerData } = comp.getTableData()
      const selectRecords = comp.getSelectRecords()
      const virtualScroller = comp.getVirtualScroller()
      const exportColumns = fullColumn.filter(column => column.type === 'index' || (column.property && ['checkbox', 'selection', 'radio'].indexOf(column.type) === -1))
      const treeStatus = comp.getTreeStatus()
      const forceOriginal = !!treeStatus || virtualScroller.scrollX || virtualScroller.scrollY
      const hasFooter = !!footerData.length
      const defOpts = Object.assign({ original: true, message: true }, exportOpts, options)
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
        column.checked = column.type !== 'index'
      })
      // 更新条件
      Object.assign(exportStore, {
        columns: exportColumns,
        selectRecords: selectRecords,
        mode: selectRecords.length ? 'selected' : 'all',
        forceOriginal: !!treeStatus || virtualScroller.scrollX || virtualScroller.scrollY,
        hasFooter: !!footerData.length,
        visible: true
      })
      // 重置参数
      Object.assign(exportParams, {
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
